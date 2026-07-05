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
// 근현대(modern2)·현대(contemporary) 지도의 타입 체계를 그대로 물려받았다
// — 조선시대에도 political/battle/diplomacy/culture/economic/person 등
// 기존 유형으로 충분히 분류 가능해 markerIcons.js를 건드리지 않았다.
const COLORS = {
  battle:'#c44536', political:'#3a8261', massacre:'#7a1f1f',
  person:'#4a9cc8', movement:'#c8a827', migration:'#6d8db4', organization:'#7a8471',
  policy:'#8a7456', plot:'#7a4a8a',
  diplomacy:'#2d6a8f', economic:'#b8762e', science:'#3d8b8b', culture:'#a8568f',
  disaster:'#b03a2e'
};

// ── 사건 유형별 한글 라벨 (팝업 + 범례에서 공통 사용) ──
const TYPE_LABEL = {
  battle:'전투', political:'정치·언론', massacre:'학살',
  person:'인물 위치', movement:'민중운동', migration:'이동', organization:'조직 결성',
  policy:'정책', plot:'공작·조작',
  diplomacy:'외교', economic:'경제·산업', science:'과학기술', culture:'문화',
  disaster:'대형참사'
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

// ── 사건 데이터 자동 등록 (왕 단위 파일 → 연도별로 재편성) ──
// 근대/근현대/현대 지도는 "연도 파일 하나씩"이지만, 조선(1392~1875,
// 483년)은 데이터가 희소해서 그 방식이 맞지 않는다. 대신 data/*.js가
// "왕(재위기간) 단위"로 사건 배열(EVENTS_TAEJO 등)을 내보내고, 여기서
// 그 배열들을 전부 모아 각 사건의 실제 year 필드를 기준으로 DATA[year]에
// 재편성한다 — renderer.js/validator.js는 Object.values(DATA).flat()만
// 쓰므로 DATA의 키가 연도든 왕 이름이든 상관없이 그대로 동작한다.
// 새 왕의 데이터 파일을 추가할 때는: (1) data/NN_이름.js 파일 생성,
// (2) index.html에 <script> 추가, (3) 아래 배열에 그 EVENTS_* 변수명 추가.
const DATA = {};
[
  (typeof EVENTS_TAEJO !== 'undefined' ? EVENTS_TAEJO : []),
  (typeof EVENTS_SEJONG !== 'undefined' ? EVENTS_SEJONG : []),
  (typeof EVENTS_SEONJO !== 'undefined' ? EVENTS_SEONJO : []),
  (typeof EVENTS_INJO !== 'undefined' ? EVENTS_INJO : []),
  (typeof EVENTS_YEONGJO !== 'undefined' ? EVENTS_YEONGJO : []),
  (typeof EVENTS_GOJONG_BOUNDARY !== 'undefined' ? EVENTS_GOJONG_BOUNDARY : []),
].forEach(arr => {
  arr.forEach(e => {
    if (!DATA[e.year]) DATA[e.year] = [];
    DATA[e.year].push(e);
  });
});

// ── 앱 초기화 (모든 모듈 로드 완료 후 실행) ──
// 챕터 방식이라 "초기 연도" 개념이 없다 — window.onload는 그냥
// selectReign(0)으로 첫 챕터(태조)부터 시작한다(아래 참고).
window.onload = () => {
  requestAnimationFrame(() => {
    map.invalidateSize();
    setTimeout(() => {
      // ── SEO 페이지 → 지도 진입 (2026-06 추가) ──
      // /maps/modern2/event/{slug} 페이지의 "지도에서 보기" 버튼이
      // atlas.mkhz.kr/maps/modern2/?event={id} 형태로 링크한다. 쿼리에
      // event가 있으면 기본 진입(첫 챕터 + 자동 프롤로그)을
      // 건너뛰고, 이미 renderer.js에 구현되어 있던 navigateToEvent(id)를
      // 그대로 호출해 그 사건의 연도·위치로 직접 이동한다. 기존 동작
      // (쿼리가 없는 일반 진입)은 한 글자도 바뀌지 않는다 — 이 분기가
      // 없으면 항상 아래의 기존 코드 그대로 실행된다. (1876~1945 메인
      // 지도의 js/app.js에 추가한 것과 동일한 패턴)
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
      // ── 자료실 글 페이지 → 지도 진입 (archive/**/*.html의 "지도에서
      // 관련 지역 보기" 버튼용). ?lat=&lng=로 좌표만 넘어오면 그 위치로
      // 지도만 이동시킨다(팝업은 열지 않는다 — 열 사건이 없다). ?year=가
      // 함께 오면 그 연도가 속한 챕터(왕조)를 선택하되, 이 지도의 유효
      // 범위(1392~1875) 밖이면 가장 가까운 경계 연도로 clamp한다.
      const latFromUrl = parseFloat(params.get('lat'));
      const lngFromUrl = parseFloat(params.get('lng'));
      if (!Number.isNaN(latFromUrl) && !Number.isNaN(lngFromUrl)) {
        const yearFromUrl = parseInt(params.get('year'), 10);
        const clampedYear = Number.isNaN(yearFromUrl)
          ? REIGNS_MIN_YEAR
          : Math.min(REIGNS_MAX_YEAR, Math.max(REIGNS_MIN_YEAR, yearFromUrl));
        selectReign(reignIndexForYear(clampedYear), { silent: true });
        window.setTimeout(() => { map.setView([latFromUrl, lngFromUrl], 7, { animate: true }); }, 350);
        return;
      }
      // 기본 진입: 첫 챕터(태조)부터 시작.
      selectReign(0);
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
