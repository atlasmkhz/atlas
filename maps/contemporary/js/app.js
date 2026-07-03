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
// 근현대(modern2) 지도의 13개 타입을 그대로 물려받고, 이 지도(현대,
// 1994~2025) 고유의 성격을 반영해 disaster(대형참사) 타입을 추가했다
// — 성수대교·삼풍백화점·세월호처럼 국가 책임 논란이 있는 참사도
// 포함하지만, massacre(국가폭력에 의한 학살)와는 인과관계가 뚜렷이
// 다르므로 별도 타입으로 구분한다(docs/contemporary_map_design.md
// 3장 참고). 카드 스키마에는 party(정당 소속)·allegation_status
// (의혹→확정 단계) 필드도 추가된다 — 이 두 필드는 COLORS/TYPE_LABEL과
// 무관하게 카드 객체 안에서 직접 쓰면 된다.
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

// ── 연도별 데이터 자동 등록 ──
// 새 연도를 추가할 때는 이 배열에 EVENTS_XXXX 한 줄만 추가하면 된다.
// DATA[year] 키는 각 배열의 첫 항목의 year 필드에서 자동으로 추출된다.
// 현대(1994~2025) — 1994~1997만 실제 카드가 있고 나머지는 아직 빈
// 배열(EVENTS_XXXX = [])이라 DATA에 등록되는 연도가 그만큼만 있다
// (아래 forEach의 길이 체크 때문). 데이터를 채우면 그 연도부터
// 자동으로 지도에 나타난다.
const DATA = {};
[
  EVENTS_1994, EVENTS_1995, EVENTS_1996, EVENTS_1997, EVENTS_1998, EVENTS_1999,
  EVENTS_2000, EVENTS_2001, EVENTS_2002, EVENTS_2003, EVENTS_2004, EVENTS_2005,
  EVENTS_2006, EVENTS_2007, EVENTS_2008, EVENTS_2009,
  EVENTS_2010, EVENTS_2011, EVENTS_2012, EVENTS_2013, EVENTS_2014, EVENTS_2015,
  EVENTS_2016, EVENTS_2017, EVENTS_2018, EVENTS_2019,
  EVENTS_2020, EVENTS_2021, EVENTS_2022, EVENTS_2023, EVENTS_2024, EVENTS_2025,
  EVENTS_2026
].forEach(arr => {
  if (!arr?.length) return;
  DATA[arr[0].year] = arr;
});

// ── 앱 초기화 (모든 모듈 로드 완료 후 실행) ──
// 첫 화면 연도. 슬라이더 시작 위치(index.html의 #slider value)와 반드시
// 같은 값으로 맞춰야 한다 — 둘이 어긋나면 지도/슬라이더는 맞는데 좌상단
// 큰 연도 숫자·干支·시대부제만 다른 값으로 보이는 버그가 재발한다.
// 1994~1997(김영삼 정부)만 데이터가 있어 시작점인 1994로 고정해둔다 —
// 데이터가 더 채워지면 적절한 대표 연도(예: 1997 외환위기, 2016
// 촛불집회)로 바꿀 것.
const INITIAL_YEAR = 1994;
window.onload = () => {
  requestAnimationFrame(() => {
    map.invalidateSize();
    setTimeout(() => {
      // ── SEO 페이지 → 지도 진입 (2026-06 추가) ──
      // /maps/modern2/event/{slug} 페이지의 "지도에서 보기" 버튼이
      // atlas.mkhz.kr/maps/modern2/?event={id} 형태로 링크한다. 쿼리에
      // event가 있으면 기본 진입(INITIAL_YEAR 고정 + 자동 프롤로그)을
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
      // 관련 지역 보기" 버튼용). 자료실 글은 특정 사건 카드(card_ref)에
      // 연결되지 않은 경우가 많아 ?event=처럼 특정 id로 이동할 수 없다
      // — 대신 ?lat=&lng=로 좌표만 넘어오면 그 위치로 지도만 이동시킨다
      // (팝업은 열지 않는다 — 열 사건이 없다). ?year=가 함께 오면 그
      // 글의 실제 연도로 슬라이더를 맞추되, 이 지도의 유효 범위
      // (1994~2025) 밖이면 가장 가까운 경계 연도로 clamp한다. 지금
      // 이 지도에 이 방식으로 링크를 보내는 곳은 없지만(자료실은 아직
      // modern2에만 있음), 같은 패턴을 유지해 나중에 이 지도용 자료실이
      // 생기면 그대로 재사용할 수 있게 해둔다. year가 없으면 기존처럼
      // INITIAL_YEAR로 진입한다.
      const latFromUrl = parseFloat(params.get('lat'));
      const lngFromUrl = parseFloat(params.get('lng'));
      if (!Number.isNaN(latFromUrl) && !Number.isNaN(lngFromUrl)) {
        const yearFromUrl = parseInt(params.get('year'), 10);
        const clampedYear = Number.isNaN(yearFromUrl)
          ? INITIAL_YEAR
          : Math.min(2026, Math.max(1994, yearFromUrl));
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
