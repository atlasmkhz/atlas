// ═══════════════════════════════════════════════════════
// timeline.js — 연도 슬라이더, 시대(ERA) 서사, 색조 전환
// 의존: app.js (getGanji, DATA), map.js (map), renderer.js (safeRender)
// ═══════════════════════════════════════════════════════

// ── 연도별 시대 부제·설명 (현대, 1994~2025) ──
// 슬라이더를 옮길 때마다 updateEra()가 이 객체에서 텍스트를 가져와 표시한다.
// updateEra()는 desc가 빈 문자열일 때 eraCard를 열지 않도록 가드돼 있으니
// (eraDesc.textContent.trim() 체크), 빈 값이어도 안전하게 "아무것도 안 뜸"
// 으로 동작한다. 지금은 1994~1997(김영삼 정부)만 채워져 있고 나머지는
// 콘텐츠가 확정되는 대로 채울 자리다(docs/contemporary_map_design.md 참고).
const ERA = {
  1994:{ text:'외환위기 전야 — 성장의 그늘', desc:'성수대교가 무너지고 김일성이 사망했다. 고도성장의 관성 속에 안전 불감증이 쌓여갔고, 냉전의 마지막 축이었던 북한 체제는 김정일 시대로 넘어갔다.' },
  1995:{ text:'역사바로세우기와 삼풍의 붕괴', desc:'전두환·노태우가 구속되고 조선총독부 건물 철거가 시작되며 "역사바로세우기"가 본격화됐다. 그러나 같은 해 삼풍백화점이 무너지며, 압축성장의 청구서가 도착했다.' },
  1996:{ text:'자신감과 균열 — OECD 가입과 날치기', desc:'선진국 클럽 OECD에 가입하며 자신감이 절정에 달했지만, 노동법·안기부법 날치기 처리로 정치는 다시 파국으로 치달았다. 위기는 소리 없이 다가오고 있었다.' },
  1997:{ text:'IMF, 대한민국을 덮치다', desc:'한보 사태로 시작된 부실이 눈덩이처럼 불어나며 외환위기가 터졌다. 반세기 만의 여야 정권교체와 함께, 나라는 국제통화기금의 관리 아래 놓였다.' },
  1998:{ text:'', desc:'' },
  1999:{ text:'', desc:'' },
  2000:{ text:'', desc:'' },
  2001:{ text:'', desc:'' },
  2002:{ text:'', desc:'' },
  2003:{ text:'', desc:'' },
  2004:{ text:'', desc:'' },
  2005:{ text:'', desc:'' },
  2006:{ text:'', desc:'' },
  2007:{ text:'', desc:'' },
  2008:{ text:'', desc:'' },
  2009:{ text:'', desc:'' },
  2010:{ text:'', desc:'' },
  2011:{ text:'', desc:'' },
  2012:{ text:'', desc:'' },
  2013:{ text:'', desc:'' },
  2014:{ text:'', desc:'' },
  2015:{ text:'', desc:'' },
  2016:{ text:'', desc:'' },
  2017:{ text:'', desc:'' },
  2018:{ text:'', desc:'' },
  2019:{ text:'', desc:'' },
  2020:{ text:'', desc:'' },
  2021:{ text:'', desc:'' },
  2022:{ text:'', desc:'' },
  2023:{ text:'', desc:'' },
  2024:{ text:'', desc:'' },
  2025:{ text:'', desc:'' }
};

// ── 시대 국면(PHASE) — 정권 띠 레이어 ──
// 근현대(modern2) 지도와 같은 방식으로 정권 단위를 표시한다. 날짜는
// 전부 검색으로 검증했다(docs/contemporary_map_design.md 2장 참고).
// 연 단위 슬라이더라 한 해 안에 정권이 바뀌는 경우(2017, 2025)는
// 여러 PHASE가 겹치고, getPhase()가 "마지막 매치 우선"으로 그 해의
// 더 진전된(그 해 대부분을 차지하는) 상태를 보여준다 — modern2의
// 1960년 처리 방식과 동일한 관례.
// 2024년은 예외적으로 부정확함을 감수했다 — 실제로는 2024년 대부분이
// 윤석열 정부 정상 국정 운영 기간이었고 "탄핵 정국"은 마지막 2주뿐이지만,
// 12·3 비상계엄이라는 초대형 사건이 그 해를 정의하는 전환점이라
// 뒤 항목(탄핵 정국)이 우선 표시되도록 뒀다. 정확한 시점은 개별
// 사건 카드에서 확인할 수 있다.
const PHASES = [
  { from:1994, to:1998, label:'김영삼 (문민정부)',        detail:'금융실명제 정착, OECD 가입~외환위기' },
  { from:1998, to:2003, label:'김대중 (국민의 정부)',      detail:'외환위기 극복, 헌정사 최초의 여야 정권교체' },
  { from:2003, to:2008, label:'노무현 (참여정부)',         detail:'2004년 탄핵소추 가결 → 헌재 기각, 직무 복귀(파면 아님)' },
  { from:2008, to:2013, label:'이명박',                   detail:'글로벌 금융위기, 4대강 사업' },
  { from:2013, to:2017, label:'박근혜',                   detail:'2016.12 탄핵소추 가결 → 2017.3.10 헌재 파면' },
  { from:2017, to:2017, label:'황교안 대통령 권한대행',    detail:'박근혜 파면(3.10)~문재인 취임(5.10) 사이' },
  { from:2017, to:2022, label:'문재인',                   detail:'촛불정부 출범, 코로나19 팬데믹' },
  { from:2022, to:2024, label:'윤석열',                   detail:'2024.12.3 심야 비상계엄 선포로 사실상 종료' },
  { from:2024, to:2025, label:'탄핵 정국·권한대행 체제',   detail:'탄핵소추 가결(24.12.14) → 헌재 파면(25.4.4) → 이재명 취임(25.6.4) 전까지, 한덕수 등 권한대행' },
  { from:2025, to:2025, label:'이재명 (제21대)',           detail:'조기대선(2025.6.3)으로 개표 직후 즉시 임기 개시' }
];
// 2017년·2025년처럼 한 해 안에 정권이 바뀌는 경우, 연 단위 슬라이더라
// 월 구분은 못 하므로 여러 PHASE 중 그 해 대부분을 차지하는(또는
// 그 해를 정의하는) 마지막 것을 우선 표시한다(getPhase 참고, 위
// PHASES 선언부 주석의 2024년 예외 설명도 함께 참고).
function getPhase(year){
  let match = null;
  for (const p of PHASES) {
    if (year >= p.from && year <= p.to) match = p; // 뒤에서 찾은 것으로 덮어써 마지막 매치 우선
  }
  return match || { label:'', detail:'' };
}


// [연도, R, G, B, A] 키프레임 사이를 선형 보간한다.
// 현대(1994~2025)의 색조 서사는 아직 설계하지 않았다. 지금은 1994
// (외환위기 전, 차분한 회청)에서 2025(현재, 옅은 금빛)까지 단순
// 보간만 해두는 임시값이다 — IMF의 어둠, 촛불의 빛 같은 구간별 색조는
// 콘텐츠를 채울 때 근대 지도의 ERA_TINT_KEYS와 같은 방식으로 다시 짤 것.
const ERA_TINT_KEYS = [
  [1994, 90, 95, 110, 0.20],
  [2025, 184, 152, 96, 0.16]
];
function getEraTint(year){
  const keys = ERA_TINT_KEYS;
  if(year <= keys[0][0]) { const k=keys[0]; return `rgba(${k[1]},${k[2]},${k[3]},${k[4]})`; }
  if(year >= keys[keys.length-1][0]) { const k=keys[keys.length-1]; return `rgba(${k[1]},${k[2]},${k[3]},${k[4]})`; }
  for(let i=0;i<keys.length-1;i++){
    const a=keys[i], b=keys[i+1];
    if(year>=a[0] && year<=b[0]){
      const t=(year-a[0])/(b[0]-a[0]);
      const r=Math.round(a[1]+(b[1]-a[1])*t);
      const g=Math.round(a[2]+(b[2]-a[2])*t);
      const bl=Math.round(a[3]+(b[3]-a[3])*t);
      const al=(a[4]+(b[4]-a[4])*t).toFixed(3);
      return `rgba(${r},${g},${bl},${al})`;
    }
  }
  return `rgba(123,30,30,0.30)`;
}

// ── 시대 부제 갱신 ──
function updateEra(year){
  const era = ERA[year] || {text:'', desc:''};
  document.getElementById('eraText').textContent = era.text;
  document.getElementById('eraDesc').textContent = era.desc;
  // 모바일 모달 헤더용(시대명) — 데스크탑에서는 ::after를 렌더하지 않으므로
  // 이 속성은 무시된다. 데스크탑 표시·동작에는 아무 영향이 없다.
  document.getElementById('eraCard').setAttribute('data-era-title', era.text || '');
  // 주의: 시대 부제 카드 자동 오픈은 여기서 하지 않는다.
  // updateEra는 슬라이더 'input'마다(드래그 중 매 틱) 호출되므로, 여기서
  // 카드를 열면 드래그 도중 계속 열리고 손을 놓는 순간의 click과 타이밍이
  // 어긋나 "떴다 즉시 닫힘"이 재발한다. 자동 오픈은 '연도 확정' 시점,
  // 즉 슬라이더 'change'(아래)와 최초 load 시점에서만 openEraCard()로 연다.
}

// ── 정권 띠(PHASE) 갱신 ──
// occTag(국체: 해방/미군정/대한민국)보다 한 단계 세분화된 정권 단위를
// #phaseTag에 표시한다. index.html에 #phaseTag가 없는 빌드에서도 에러가
// 나지 않도록 가드한다(점진적 배포 대비).
// 슬라이더 'input'마다 계속 불리므로, label이 실제로 바뀔 때만
// timeline_move를 보내기 위한 dedupe 기준값.
let _lastTrackedPhaseLabel = null;

function updatePhase(year){
  const phaseTag = document.getElementById('phaseTag');
  const phase = getPhase(year);
  // ── GA4: 시대(정권) 이동 트래킹 ──
  // #phaseTag가 없는 빌드에서도(위 가드와 별개로) 트래킹은 계속 동작해야
  // 하므로 phaseTag 존재 여부와 무관하게 먼저 계산한다.
  if (phase.label && phase.label !== _lastTrackedPhaseLabel) {
    _lastTrackedPhaseLabel = phase.label;
    if (window.trackTimelineMove) window.trackTimelineMove(phase.label);
  }
  if (!phaseTag) return;
  phaseTag.textContent = phase.label || '';
  phaseTag.title = phase.detail || '';
  phaseTag.classList.toggle('empty', !phase.label);
}

// ── 연도 슬라이더 — 앱의 핵심 인터랙션 ──
// 슬라이더를 옮길 때마다: 연도 표시 갱신 → 干支 갱신 → 지도 재렌더링 →
// 시대 부제 갱신 → 1945년 광복 시점에 맞춰 화면 색조와 통치 태그 전환.
//
// syncToYear(y)로 추출한 이유: 이 갱신 로직은 슬라이더의 'input' 이벤트뿐
// 아니라 "페이지를 처음 열었을 때"도 똑같이 필요하다. 예전엔 이 로직이
// 슬라이더 핸들러 안에만 있어서, 최초 로드 시(app.js의 window.onload)는
// safeRender(year)만 호출해 지도는 그려지지만 #yearNum·干支·시대부제·
// occTag·비네트 색은 입력 이벤트가 한 번도 안 일어났으니 index.html의
// 정적 placeholder 텍스트("1910" 등)가 그대로 남아 있었다 — 슬라이더
// 시작 연도를 바꿔도 화면 좌상단 숫자가 안 바뀌는 버그의 원인이었다.
// 이제 app.js의 window.onload와 슬라이더 input 핸들러 둘 다 이 함수
// 하나만 호출하므로, 두 경로가 영구히 어긋날 수 없다.
function syncToYear(y){
  document.getElementById('yearNum').textContent = y;
  document.getElementById('ganji').textContent = getGanji(y);
  if(window.closeInfoPanel) closeInfoPanel();
  safeRender(y);
  updateEra(y);
  updatePhase(y);
  // historicalLabels.js 연동 — HISTORICAL_LABELS_ENABLED가 false인 동안은
  // 이 호출 자체가 내부에서 즉시 반환되어 아무 일도 하지 않는다.
  if (typeof renderHistoricalLabels === 'function') renderHistoricalLabels(y, map.getZoom());

  const vignette = document.getElementById('vignette');
  const occTag = document.getElementById('occTag');
  occTag.classList.remove('liberated', 'imperial');

  // ── 국체 표시(occTag) — 현대(1994~2025) ──
  // 이 시기 전체가 대한민국 정부 수립 이후라 근대·근현대 지도처럼
  // 국체가 바뀌는 분기점이 없다 — occTag는 항상 "대한민국"으로
  // 고정하고, 실제 정권 교체는 updatePhase()의 정권 띠(#phaseTag)가
  // 담당한다(2번 위 참고).
  vignette.style.opacity = '0.5';
  vignette.style.boxShadow = 'inset 0 0 90px 20px ' + getEraTint(y);
  occTag.textContent = '대한민국';
  document.getElementById('eraText').style.color = '';
}

const slider = document.getElementById('slider');
slider.addEventListener('input', function(){
  // 검색 중에 슬라이더를 직접 움직이면, 사용자가 연도별 탐색으로 돌아가려는
  // 의도로 보고 검색을 자동 해제한다. clearSearch()는 카메라를
  // INITIAL_MAP_VIEW로 되돌리지만, 아래 syncToYear(y)가 곧바로 이번
  // 입력값(y) 기준의 평소 화면을 다시 그리므로 결과적으로 사용자가 옮긴
  // 슬라이더 위치가 그대로 반영된다.
  if (typeof isSearchActive === 'function' && isSearchActive() && typeof clearSearch === 'function') {
    clearSearch();
  }
  syncToYear(parseInt(this.value));
});

// ── 슬라이더 'change' — 연도 확정 시점에만 시대 부제 카드 자동 오픈 ──
// 'input'은 드래그 중 연속 발생하지만, 'change'는 사용자가 손을 놓아
// 연도가 확정될 때 한 번만 발생한다. 게다가 'change'는 포인터 release의
// click 처리가 끝난 뒤에 오므로, 바깥 클릭에 의해 곧바로 닫히는 문제도
// 구조적으로 사라진다. (openEraCard 내부 가드는 만일을 위한 이중 안전망.)
slider.addEventListener('change', function(){
  if (window.trackYearChange) window.trackYearChange(parseInt(this.value));
  // 연도 변경 시 자동 프롤로그는 데스크탑(>=1024px)에서만. 모바일은 지도를
  // 그대로 유지하고, 사용자가 ⓘ 버튼을 눌렀을 때만 열리도록 한다.
  if (window.innerWidth < 1024) return;
  const eraDesc = document.getElementById('eraDesc');
  if (eraDesc?.textContent?.trim()) {
    if (typeof window.openEraCard === 'function') {
      window.openEraCard();
    } else {
      document.getElementById('eraCard').classList.add('open');
    }
  }
});
