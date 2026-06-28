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
// 근현대(1945~1993) 데이터 특성에 맞춰 정리한 타입이다. 처음엔 7개로
// 시작해 righteous(의열투쟁)만 일제강점기 고유 맥락이라 제외했었지만,
// 245건의 데이터를 채우는 과정에서 policy(정책)·plot(공작·조작) 두
// 타입을 실제로 다수 사용하게 됐다 — 새마을운동·금융실명제 같은 정부
// 정책과, 진보당 조작사건·인혁당 사건·동백림 사건 같은 국가기관의
// 공작·날조 사건은 분량도 많고 성격도 뚜렷이 달라 둘 다 별도 마커가
// 필요하다고 판단해 추가했다. migration(이동)은 라벨을 "이동·망명"에서
// "이동"으로 넓혔다 — 독립운동가의 망명뿐 아니라 한국전쟁의 국군·인민군·
// 중공군 이동, 피난민 행렬 같은 군사·민간 이동까지 포괄해야 하기 때문이다.
// 데이터를 채우면서 필요한 타입이 더 생기면(예: 산업화 시기의 economic,
// 또는 외교 관련 diplomacy) 이 두 객체에 함께 추가할 것 — 범례는
// markerIcons.js가 이 객체들에서 자동으로 그려준다.
// → 2026-06 외교사·경제산업사·과학기술사·문화사 보강 작업에서 실제로
//   diplomacy(외교)·economic(경제·산업)·science(과학기술)·culture(문화)
//   4개 타입을 추가했다. 정치사·민주화 중심이었던 기존 9타입과 성격이
//   뚜렷이 달라 별도 마커가 필요하다고 판단함.
const COLORS = {
  battle:'#c44536', political:'#3a8261', massacre:'#7a1f1f',
  person:'#4a9cc8', movement:'#c8a827', migration:'#6d8db4', organization:'#7a8471',
  policy:'#8a7456', plot:'#7a4a8a',
  diplomacy:'#2d6a8f', economic:'#b8762e', science:'#3d8b8b', culture:'#a8568f'
};

// ── 사건 유형별 한글 라벨 (팝업 + 범례에서 공통 사용) ──
const TYPE_LABEL = {
  battle:'전투', political:'정치·언론', massacre:'학살',
  person:'인물 위치', movement:'민중운동', migration:'이동', organization:'조직 결성',
  policy:'정책', plot:'공작·조작',
  diplomacy:'외교', economic:'경제·산업', science:'과학기술', culture:'문화'
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
// 근현대(1945~1993) — 지금은 모든 연도가 빈 배열(EVENTS_XXXX = [])이라
// DATA에 등록되는 연도가 하나도 없다(아래 forEach의 길이 체크 때문).
// 데이터를 채우면 그 연도부터 자동으로 지도에 나타난다.
const DATA = {};
[
  EVENTS_1945, EVENTS_1946, EVENTS_1947, EVENTS_1948, EVENTS_1949,
  EVENTS_1950, EVENTS_1951, EVENTS_1952, EVENTS_1953, EVENTS_1954, EVENTS_1955,
  EVENTS_1956, EVENTS_1957, EVENTS_1958, EVENTS_1959,
  EVENTS_1960, EVENTS_1961, EVENTS_1962, EVENTS_1963, EVENTS_1964, EVENTS_1965,
  EVENTS_1966, EVENTS_1967, EVENTS_1968, EVENTS_1969,
  EVENTS_1970, EVENTS_1971, EVENTS_1972, EVENTS_1973, EVENTS_1974, EVENTS_1975,
  EVENTS_1976, EVENTS_1977, EVENTS_1978, EVENTS_1979,
  EVENTS_1980, EVENTS_1981, EVENTS_1982, EVENTS_1983, EVENTS_1984, EVENTS_1985,
  EVENTS_1986, EVENTS_1987, EVENTS_1988, EVENTS_1989,
  EVENTS_1990, EVENTS_1991, EVENTS_1992, EVENTS_1993
].forEach(arr => {
  if (!arr?.length) return;
  DATA[arr[0].year] = arr;
});

// ── 앱 초기화 (모든 모듈 로드 완료 후 실행) ──
// 첫 화면 연도. 슬라이더 시작 위치(index.html의 #slider value)와 반드시
// 같은 값으로 맞춰야 한다 — 둘이 어긋나면 지도/슬라이더는 맞는데 좌상단
// 큰 연도 숫자·干支·시대부제만 다른 값으로 보이는 버그가 재발한다.
// 지금은 데이터가 전혀 없으므로 1945(시작점)로 고정해둔다 — 데이터가
// 채워지면 적절한 대표 연도(예: 1950 한국전쟁, 1987 민주화)로 바꿀 것.
const INITIAL_YEAR = 1945;
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
      const eventIdFromUrl = new URLSearchParams(window.location.search).get('event');
      if (eventIdFromUrl && typeof navigateToEvent === 'function') {
        navigateToEvent(eventIdFromUrl);
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
