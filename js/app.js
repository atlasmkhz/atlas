// ═══════════════════════════════════════════════════════
// app.js — 기억의 연대기 (Chronicle of Memory)
// 앱 진입점: 상수 정의, 干支 계산, 연도별 데이터 자동 등록
// 로드 순서: data/*.js → app.js → map.js → validator.js
//           → renderer.js → timeline.js → ui.js
// ═══════════════════════════════════════════════════════

// Leaflet 로드 확인 가드 — CDN 로딩 실패 시 안내 메시지 표시
if (typeof L === 'undefined') {
  document.body.innerHTML = '<div style="padding:40px;color:#e8e0d0;font-family:sans-serif;text-align:center;line-height:1.8;">지도 라이브러리를 불러오지 못했습니다.<br>인터넷 연결을 확인하고 새로고침해 주세요.<br><br><small style="opacity:0.6;">(Leaflet 로드 실패)</small></div>';
  throw new Error('Leaflet 라이브러리 로드 실패');
}

// ── 사건 유형별 색상 (지도 마커 + 범례에서 공통 사용) ──
const COLORS = {
  battle:'#c44536', righteous:'#8367a8', political:'#3a8261',
  plot:'#b5762a', policy:'#5a6b8c', massacre:'#7a1f1f',
  person:'#4a9cc8', movement:'#c8a827', migration:'#6d8db4', organization:'#7a8471',
  // 2026-07-23 추가 — 데이터에는 쓰이는데 여기 정의가 없어서 마커가 색 없이
  // 흰 원으로만 그려지던 유형들이다(조사시찰단·거문도사건·731부대 면책거래는
  // international로, 독도 기록은 diplomacy로, 진단학회는 culture로 되어 있었다).
  // international 타입은 다른 지도에 없는 표기라 diplomacy로 통일했고,
  // 색상값은 다른 6개 시대 지도와 동일하게 맞춘다.
  diplomacy:'#2d6a8f', culture:'#a8568f'
};

// ── 사건 유형별 한글 라벨 (팝업 + 범례에서 공통 사용) ──
const TYPE_LABEL = {
  battle:'전투', righteous:'의열투쟁', political:'정치·언론',
  plot:'일제 공작', policy:'식민 정책', massacre:'학살',
  person:'인물 위치', movement:'민중운동', migration:'이동·망명', organization:'조직 결성',
  diplomacy:'외교', culture:'문화'
};

// ── 干支(육십갑자) 자동 계산 (1864년 甲子년 기준) ──
// 연도를 입력받아 해당 연도의 干支를 자동으로 산출한다.
// 새 연도를 추가할 때 干支를 수동으로 입력할 필요가 없도록 설계됨.
const GAN = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const JI  = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
function getGanji(year){
  const offset = (year - 1864) % 60;
  const idx = ((offset % 60) + 60) % 60;
  return GAN[idx % 10] + JI[idx % 12] + '年';
}

// ── 연도별 데이터 자동 등록 ──
// 새 연도를 추가할 때는 이 배열에 EVENTS_XXXX 한 줄만 추가하면 된다.
// DATA[year] 키는 각 배열의 첫 항목의 year 필드에서 자동으로 추출된다.
const DATA = {};
[
  EVENTS_1876, EVENTS_1880, EVENTS_1881, EVENTS_1882, EVENTS_1883, EVENTS_1884, EVENTS_1885,
  EVENTS_1886, EVENTS_1887, EVENTS_1888, EVENTS_1889, EVENTS_1892, EVENTS_1893,
  EVENTS_1894, EVENTS_1895, EVENTS_1896, EVENTS_1897, EVENTS_1898, EVENTS_1899,
  EVENTS_1900, EVENTS_1901, EVENTS_1902, EVENTS_1903, EVENTS_1904, EVENTS_1905,
  EVENTS_1906, EVENTS_1907, EVENTS_1908, EVENTS_1909,
  EVENTS_1910, EVENTS_1911, EVENTS_1912, EVENTS_1913, EVENTS_1914, EVENTS_1915,
  EVENTS_1916, EVENTS_1917, EVENTS_1918, EVENTS_1919,
  EVENTS_1920, EVENTS_1921, EVENTS_1922, EVENTS_1923, EVENTS_1924, EVENTS_1925,
  EVENTS_1926, EVENTS_1927, EVENTS_1928, EVENTS_1929, EVENTS_1930, EVENTS_1931,
  EVENTS_1932, EVENTS_1933, EVENTS_1934, EVENTS_1935, EVENTS_1936, EVENTS_1937,
  EVENTS_1938, EVENTS_1939, EVENTS_1940, EVENTS_1941, EVENTS_1942, EVENTS_1943,
  EVENTS_1944, EVENTS_1945
  // 새 시대(고려·조선 등)를 추가할 경우, 여기에 EVENTS_GORYEO 같은 식으로
  // 이어 붙이고 data/ 폴더에 해당 파일을 추가하면 된다.
  // 단, year 필드가 정수가 아닌 시대 데이터는 DATA 키 충돌에 주의할 것.
].forEach(arr => {
  if (!arr?.length) return;
  DATA[arr[0].year] = arr;
});

// ── 앱 초기화 (모든 모듈 로드 완료 후 실행) ──
// 첫 화면 연도. 슬라이더 시작 위치(index.html의 #slider value)와 반드시
// 같은 값으로 맞춰야 한다 — 둘이 어긋나면 지도/슬라이더는 맞는데 좌상단
// 큰 연도 숫자·干支·시대부제만 다른 값으로 보이는 버그가 재발한다.
const INITIAL_YEAR = 1920;
window.onload = () => {
  requestAnimationFrame(() => {
    map.invalidateSize();
    setTimeout(() => {
      // ── SEO 페이지 → 지도 진입 (2026-06 추가) ──
      // /event/{slug} 페이지의 "지도에서 보기" 버튼이
      // atlas.mkhz.kr/?event={id} 형태로 링크한다. 쿼리에 event가 있으면
      // 기본 진입(INITIAL_YEAR 고정 + 자동 프롤로그)을 건너뛰고, 이미
      // renderer.js에 구현되어 있던 navigateToEvent(id)를 그대로 호출해
      // 그 사건의 연도·위치로 직접 이동한다. 기존 동작(쿼리가 없는 일반
      // 진입)은 한 글자도 바뀌지 않는다 — 이 분기가 없으면 항상 아래의
      // 기존 코드 그대로 실행된다.
      const params = new URLSearchParams(window.location.search);
      const eventIdFromUrl = params.get('event');
      if (eventIdFromUrl && typeof navigateToEvent === 'function') {
        navigateToEvent(eventIdFromUrl);
        return;
      }
      // ── SEO 루트 페이지 → 지도 진입 (route/*.html의 "지도에서 루트
      // 보기" 버튼용). ?route={routeId} 형태로 오면 openRoute를 호출한다.
      // 웨이포인트 전용 페이지는 ?route={routeId}&wp={wpId}까지 넘어와,
      // 루트를 연 뒤 그 지점으로 바로 포커스한다.
      const routeIdFromUrl = params.get('route');
      if (routeIdFromUrl && typeof window.openRoute === 'function') {
        window.openRoute(routeIdFromUrl);
        const wpIdFromUrl = params.get('wp');
        if (wpIdFromUrl && typeof window.focusRouteWaypoint === 'function') {
          window.setTimeout(() => window.focusRouteWaypoint(routeIdFromUrl, wpIdFromUrl), 400);
        }
        return;
      }
      // ── 자료실 글 페이지 → 지도 진입 (archive/**/*.html의 \"지도에서
      // 관련 지역 보기\" 버튼용). 자료실 글은 특정 사건 카드(card_ref)에
      // 연결되지 않은 경우가 많아 ?event=처럼 특정 id로 이동할 수 없다
      // — 대신 ?lat=&lng=로 좌표만 넘어오면 그 위치로 지도만 이동시킨다
      // (팝업은 열지 않는다 — 열 사건이 없다). ?year=가 함께 오면 그
      // 글의 실제 연도로 슬라이더를 맞추되, 이 지도의 유효 범위
      // (1876~1945) 밖이면 가장 가까운 경계 연도로 clamp한다. year가
      // 없으면 기존처럼 INITIAL_YEAR로 진입한다.
      // (다른 6개 지도의 js/app.js에는 이미 있던 분기인데 이 파일에만
      // 빠져 있었다 — 2026-07-12 버그 수정: 이 분기가 없으면 자료실의
      // "지도에서 관련 지역 보기" 링크가 lat/lng을 그냥 무시하고 항상
      // INITIAL_YEAR(1920) 기본 화면으로 떨어졌다.)
      const latFromUrl = parseFloat(params.get('lat'));
      const lngFromUrl = parseFloat(params.get('lng'));
      if (!Number.isNaN(latFromUrl) && !Number.isNaN(lngFromUrl)) {
        const yearFromUrl = parseInt(params.get('year'), 10);
        const clampedYear = Number.isNaN(yearFromUrl)
          ? INITIAL_YEAR
          : Math.min(1945, Math.max(1876, yearFromUrl));
        syncToYear(clampedYear);
        window.setTimeout(() => { map.setView([latFromUrl, lngFromUrl], 7, { animate: true }); }, 350);
        return;
      }
      // syncToYear(timeline.js)가 #yearNum·干支·지도 렌더·시대부제·
      // occTag·비네트 색조를 한 번에 전부 맞춘다 — 슬라이더를 직접 움직일
      // 때와 똑같은 경로이므로 둘 사이에 어긋남이 생길 수 없다.
      syncToYear(INITIAL_YEAR);
      // 첫 진입 자동 프롤로그도 데스크탑(>=1024px)에서만. 모바일은 지도를
      // 그대로 보여주고, ⓘ 버튼으로만 시대 개요를 연다.
      if (window.innerWidth >= 1024) {
        const eraDesc = document.getElementById('eraDesc');
        if (eraDesc?.textContent?.trim()) {
          if (typeof window.openEraCard === 'function') window.openEraCard();
          else document.getElementById('eraCard').classList.add('open');
        }
      }
    }, 300);
  });
};
