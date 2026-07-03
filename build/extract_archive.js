#!/usr/bin/env node
// extract_archive.js
// archive/*.js 를 전부 로드해 registerArchiveSeries로 등록된 시리즈를
// JSON으로 출력한다. generate_archive_pages.py가 이 JSON을 읽어 정적
// 페이지를 만든다.
//
// extract_routes.js와 완전히 같은 패턴이다 — archive/*.js도 브라우저
// 전역(window.registerArchiveSeries)에 의존하는 순수 데이터 파일이라
// Node에서 직접 require할 수 없어, vm 모듈로 최소한의 window 스텁만
// 채운 샌드박스에서 실행해 등록된 시리즈를 모은다.
//
// 사용법: node extract_archive.js <archive디렉토리> > archive.json
// 새 시리즈 파일을 archive/ 아래에 추가하기만 하면 다음 빌드에서 자동
// 포함된다 — 이 스크립트를 고칠 필요가 없다.

const fs = require('fs');
const vm = require('vm');
const path = require('path');

const archiveDir = process.argv[2];
if (!archiveDir) {
  console.error('사용법: node extract_archive.js <archive디렉토리>');
  process.exit(1);
}

const series = [];
const sandboxWindow = {
  registerArchiveSeries: (seriesObj) => { series.push(seriesObj); },
};
const sandbox = { window: sandboxWindow, console };
vm.createContext(sandbox);

const files = fs.existsSync(archiveDir)
  ? fs.readdirSync(archiveDir).filter(f => f.endsWith('.js')).sort()
  : [];

for (const f of files) {
  const code = fs.readFileSync(path.join(archiveDir, f), 'utf8');
  try {
    vm.runInContext(code, sandbox, { filename: f });
  } catch (e) {
    console.error(`ERROR loading ${f}: ${e.message}`);
    process.exit(1);
  }
}

process.stdout.write(JSON.stringify(series, null, 2));
