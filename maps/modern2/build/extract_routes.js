#!/usr/bin/env node
// extract_routes.js
// routes/*.js 를 전부 로드해 등록된 라우트를 JSON으로 출력한다.
// generate_route_pages.py가 이 JSON을 읽어 정적 페이지를 만든다.
//
// routes/*.js 는 브라우저 전역(window.registerRoute)에 의존하는 순수
// 데이터 파일이라 Node에서 직접 require할 수 없다 — vm 모듈로 최소한의
// window 스텁만 채운 샌드박스에서 실행해 등록된 라우트를 모은다.
//
// 사용법: node extract_routes.js <routes디렉토리> > routes.json
// 새 라우트 파일을 routes/ 아래에 추가하기만 하면 다음 빌드에서 자동
// 포함된다 — 이 스크립트를 고칠 필요가 없다.

const fs = require('fs');
const vm = require('vm');
const path = require('path');

const routesDir = process.argv[2];
if (!routesDir) {
  console.error('사용법: node extract_routes.js <routes디렉토리>');
  process.exit(1);
}

const routes = [];
const sandboxWindow = {
  registerRoute: (routeObj) => { routes.push(routeObj); },
};
const sandbox = { window: sandboxWindow, console };
vm.createContext(sandbox);

const files = fs.existsSync(routesDir)
  ? fs.readdirSync(routesDir).filter(f => f.endsWith('.js')).sort()
  : [];

for (const f of files) {
  const code = fs.readFileSync(path.join(routesDir, f), 'utf8');
  try {
    vm.runInContext(code, sandbox, { filename: f });
  } catch (e) {
    console.error(`ERROR loading ${f}: ${e.message}`);
    process.exit(1);
  }
}

process.stdout.write(JSON.stringify(routes, null, 2));
