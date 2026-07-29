// build/generate_damsa_seo.js
// ─────────────────────────────────────────────────────────────
// 답사 테마 페이지의 JSON-LD 구조화 데이터를 themes.js에서 자동 생성한다.
//
// 왜 손으로 안 쓰는가: 장소가 11곳 → 7곳으로 재편되는 일이 실제로 있었다.
// JSON-LD를 HTML에 손으로 박아두면 데이터와 어긋난 채 배포된다.
// 데이터가 단일 출처여야 한다.
//
// 사용법: node build/generate_damsa_seo.js
// ─────────────────────────────────────────────────────────────

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DAMSA = path.join(ROOT, 'maps', 'damsa');
const SITE = 'https://atlas.mkhz.kr';

// 테마별 랜딩 파일명
const THEME_PAGES = { dolmen: 'dolmen.html' };

function loadThemes() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(DAMSA, 'data', 'themes.js'), 'utf8'), sandbox);
  return sandbox.window.DAMSA_THEMES || [];
}

// sights의 성격에 따라 schema.org 타입을 고른다.
// 전시관만 있으면 Museum, 유적이 있으면 TouristAttraction.
function schemaType(place) {
  const kinds = new Set((place.sights || []).map((s) => s.survival));
  if (kinds.size === 1 && kinds.has('museum')) return 'Museum';
  return 'TouristAttraction';
}

function buildJsonLd(theme) {
  const page = THEME_PAGES[theme.id];
  const url = `${SITE}/maps/damsa/${page}`;

  const items = theme.places.map((p, i) => {
    const item = {
      '@type': schemaType(p),
      name: p.name,
      address: p.address,
      geo: { '@type': 'GeoCoordinates', latitude: p.lat, longitude: p.lng }
    };
    if (p.phone) item.telephone = p.phone;
    // 사진 — 2026-07-30 추가. schema.org의 image는 절대 URL을 요구한다.
    // themes.js는 페이지 기준 상대경로('photos/x.jpg')를 담고 있으므로
    // 여기서 사이트 루트를 붙인다. 검색 결과에 썸네일이 붙는 것은 답사처럼
    // "가보고 싶게 만들어야 하는" 콘텐츠에서 클릭률 차이가 크다.
    if (p.photo && p.photo.src) {
      item.image = `${SITE}/maps/damsa/${p.photo.src}`;
    }
    // 주차장 단위 카드이므로 그 지점에서 볼 수 있는 유적을 함께 노출한다.
    if (p.sights && p.sights.length) {
      item.containsPlace = p.sights.map((s) => ({ '@type': 'LandmarksOrHistoricalBuildings', name: s.name }));
    }
    return { '@type': 'ListItem', position: i + 1, item };
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: `${theme.title} 답사 — ${theme.regions.map((r) => r.name).join('·')}`,
    url,
    description: theme.summary.split('. ').slice(0, 2).join('. ') + '.',
    touristType: '역사 답사',
    inLanguage: 'ko',
    isPartOf: { '@type': 'WebSite', name: 'ATLAS by MKHZ', url: `${SITE}/` },
    ...(theme.photo && theme.photo.src
        ? { image: `${SITE}/maps/damsa/${theme.photo.src}` } : {}),
    itinerary: { '@type': 'ItemList', numberOfItems: items.length, itemListElement: items }
  };
}

function patchPage(theme) {
  const page = THEME_PAGES[theme.id];
  const file = path.join(DAMSA, page);
  let html = fs.readFileSync(file, 'utf8');

  const json = JSON.stringify(buildJsonLd(theme), null, 0);
  const block = `<script type="application/ld+json">\n${json}\n</script>`;

  // 기존 JSON-LD 블록을 통째로 교체한다.
  const re = /<script type="application\/ld\+json">[\s\S]*?<\/script>/;
  if (re.test(html)) {
    html = html.replace(re, block);
  } else {
    html = html.replace('</head>', block + '\n</head>');
  }

  fs.writeFileSync(file, html, 'utf8');
  return { page, count: theme.places.length };
}

function main() {
  const themes = loadThemes();
  const done = [];
  themes.forEach((t) => {
    if (!THEME_PAGES[t.id]) {
      console.warn(`  ! 테마 "${t.id}"에 대응하는 랜딩 페이지가 THEME_PAGES에 없다 — 건너뜀`);
      return;
    }
    done.push(patchPage(t));
  });
  console.log('답사 JSON-LD 생성 완료:', done.map((d) => `${d.page} (진입 지점 ${d.count}곳)`).join(', '));
}

main();
