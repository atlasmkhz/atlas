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

// ── BCE 연도 표기 ── 고대는 기원전 연도가 있어(-37 = 기원전 37년),
// year 값을 그대로 화면에 찍으면 "-37년"처럼 보인다. 이 헬퍼로 통일해서
// "기원전 37"/"313" 형태로 항상 표시한다.
function formatYearShort(y){
  return y < 0 ? `기원전 ${-y}` : `${y}`;
}
function formatYear(y){
  return formatYearShort(y) + '년';
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

// ── 나라색 — 사건 유형색(위 COLORS, 아이콘 자체)과는 별개로, 마커 바깥
// 고리색으로 "어느 나라 사건인가"를 나타낸다. 여러 나라가 같은 시공간에
// 동시에 있었다는 이 지도의 핵심 철학을 마커 하나로 보여주기 위함
// (자세한 설명은 markerIcons.js의 buildMarkerHtml 주석 참고). 카드가
// 두 나라 이상과 관련될 때는(나당동맹 등) e.nation에 "주 관점" 국가
// 하나만 적어 링 색도 하나만 쓴다 — 반원 두 개로 쪼개는 것보다 훨씬
// 읽기 쉽고, 실제 관계는 summary_ko 서술로 충분히 전달된다.
const NATION_COLORS = {
  goguryeo:'#3b5ba8',   // 고구려 — 남색
  baekje:'#2f9e8f',     // 백제 — 청록
  silla:'#c9a227',      // 신라(통일신라 포함) — 황금색
  gaya:'#d9772e',       // 가야 — 주황 (①~③ 블록에서만 등장)
  balhae:'#7d4fa0',     // 발해 — 보라
  hubaekje:'#7a7a2e',   // 후백제(견훤) — 올리브
  taebong:'#8a4a3a',    // 태봉(궁예) — 적갈색
  goryeo:'#8a8471',     // 고려(왕건) — 고구려와 혼동되지 않게 별도 색
};
const NATION_LABEL = {
  goguryeo:'고구려', baekje:'백제', silla:'신라', gaya:'가야',
  balhae:'발해', hubaekje:'후백제', taebong:'태봉', goryeo:'고려',
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


// ── 사건 데이터 자동 등록 (블록 단위 파일 → 연도별로 재편성) ──
// 고대는 여러 나라가 동시에 있어 "왕 하나 = 챕터 하나"가 아니라
// "역사적 전환점으로 나눈 시기(블록) 하나 = 챕터 하나"다. data/*.js가
// 블록 단위로 사건 배열(EVENTS_BLOCK1 등)을 내보낸다. 새 블록의 데이터
// 파일을 추가할 때는: (1) data/blockN.js 파일 생성, (2) index.html에
// <script> 추가, (3) 아래 배열에 그 EVENTS_* 변수명 추가.
const DATA = {};
[
  (typeof EVENTS_BLOCK1 !== 'undefined' ? EVENTS_BLOCK1 : []),
  (typeof EVENTS_BLOCK2 !== 'undefined' ? EVENTS_BLOCK2 : []),
  (typeof EVENTS_BLOCK3 !== 'undefined' ? EVENTS_BLOCK3 : []),
  (typeof EVENTS_BLOCK4 !== 'undefined' ? EVENTS_BLOCK4 : []),
  (typeof EVENTS_BLOCK5 !== 'undefined' ? EVENTS_BLOCK5 : []),
  (typeof EVENTS_BLOCK6 !== 'undefined' ? EVENTS_BLOCK6 : []),
  (typeof EVENTS_BLOCK7 !== 'undefined' ? EVENTS_BLOCK7 : []),
  (typeof EVENTS_BLOCK8 !== 'undefined' ? EVENTS_BLOCK8 : []),
].forEach(arr => {
  arr.forEach(e => {
    if (!DATA[e.year]) DATA[e.year] = [];
    DATA[e.year].push(e);
  });
});

// ── 앱 초기화 (모든 모듈 로드 완료 후 실행) ──
// 챕터 방식이라 "초기 연도" 개념이 없다 — window.onload는 그냥
// selectReign(0)으로 첫 챕터(삼국 정립기)부터 시작한다(아래 참고).
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
      // 함께 오면 그 연도가 속한 챕터(블록)를 선택하되, 이 지도의 유효
      // 범위(기원전 37~936) 밖이면 가장 가까운 경계 연도로 clamp한다.
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
      // 기본 진입: 첫 챕터(삼국 정립기)부터 시작. 시대개요 자동 오픈은
      // selectReign() 안에서 처리한다(데스크탑 전용, silent 아닐 때만).
      selectReign(0);
    }, 300);
  });
};
