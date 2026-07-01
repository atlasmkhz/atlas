// ═══════════════════════════════════════════════════════
// ui.js — 레이어 토글, 시대 카드(ⓘ) 인터랙션
// 의존: app.js, renderer.js (safeRender), timeline.js (updateEra)
// 이 파일은 timeline.js, renderer.js 로드 이후에 실행되어야 한다.
// ═══════════════════════════════════════════════════════

// ── 레이어 토글 (사건 / 인물 / 배경·정책) ──
// 체크박스 상태는 renderer.js의 renderYear()가 직접 읽으므로,
// 여기서는 값이 바뀔 때 재렌더링만 트리거한다.
// 검색이 활성 상태일 때는 무시한다 — 검색 결과는 이 토글들과 무관하게
// 매칭된 항목을 전부 보여주는 별도 모드이므로, 토글을 눌러도 검색 결과가
// 사라지거나 바뀌면 안 된다.
document.getElementById('layerEvent').addEventListener('change', () => {
  if (typeof isSearchActive === 'function' && isSearchActive()) return;
  safeRender(parseInt(document.getElementById('slider').value));
});
document.getElementById('layerPerson').addEventListener('change', () => {
  if (typeof isSearchActive === 'function' && isSearchActive()) return;
  safeRender(parseInt(document.getElementById('slider').value));
});
document.getElementById('layerPolicy').addEventListener('change', () => {
  if (typeof isSearchActive === 'function' && isSearchActive()) return;
  safeRender(parseInt(document.getElementById('slider').value));
});

// ── 시대 부제 설명 카드 (ⓘ 버튼) ──
// 버튼 클릭 시 카드를 열고, 카드 바깥을 클릭하면 닫는다.
// (카드 내부 클릭 시 이벤트 버블링으로 닫히지 않도록 contains 체크)
document.getElementById('eraBtn').addEventListener('click', function(e){
  e.stopPropagation();
  document.getElementById('eraCard').classList.toggle('open');
});

// ── 자동 오픈 직후 outside-close 억제 가드 ──
// 슬라이더 클릭/이동 같은 사용자 입력은 document로 버블링되어 아래 바깥 클릭
// 핸들러를 같은 이벤트 사이클에서 트리거한다. 그 사이클에 카드를 열면
// "떴다가 즉시 닫힘" 현상이 생긴다. openEraCard()로 열 때 한 가드를 세우고,
// requestAnimationFrame을 두 번 거쳐(= 현재 입력 이벤트 사이클이 완전히 끝난
// 다음 프레임) 가드를 풀어, 그 사이클의 바깥 클릭만 무시한다.
// timeline.js의 updateEra()가 이 함수를 호출하므로 window에 노출한다.
let suppressEraClose = false;
window.openEraCard = function(){
  suppressEraClose = true;
  document.getElementById('eraCard').classList.add('open');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      suppressEraClose = false;
    });
  });
};

document.addEventListener('click', (e) => {
  if (suppressEraClose) return;            // 자동 오픈 사이클의 바깥 클릭은 무시
  const card = document.getElementById('eraCard');
  if (!card.contains(e.target) && e.target.id !== 'eraBtn') {
    card.classList.remove('open');
  }
});

// ── 「탐험 시작」 버튼 ──
// 첫 진입 시 자동으로 열려 있는 시대 부제 카드를 닫고 지도 탐색으로 넘어간다.
// 닫기는 기존과 동일하게 .open 클래스를 떼는 방식을 그대로 쓴다.
document.getElementById('eraStartBtn').addEventListener('click', function(e){
  e.stopPropagation();
  document.getElementById('eraCard').classList.remove('open');
});

// 모바일 모달 우측 상단 X — 「탐험 시작」과 동일하게 닫는다.
// (데스크탑에서는 이 버튼이 CSS로 숨겨져 있어 노출되지 않는다.)
document.getElementById('eraCloseBtn').addEventListener('click', function(e){
  e.stopPropagation();
  document.getElementById('eraCard').classList.remove('open');
});

// 시대 부제 카드의 자동 오픈은 timeline.js의 updateEra(year)가 담당한다.
// (연도 변경 기준으로 동작해야 하므로, 앱 1회성 load 시점이 아니라 연도가
//  갱신되는 단일 경로인 updateEra 안에서 여는 것이 맞다.)

// 초기 시대 부제 표시는 app.js의 window.onload → syncToYear(INITIAL_YEAR)가
// 담당한다 (여기서 따로 updateEra()를 호출하면 같은 일을 두 번 하게 되고,
// 이 스크립트 실행 시점은 window.onload보다 이르므로 오히려 더 부정확하다).

// ── [2] 모바일: 모달 열린 동안 배경 스크롤 잠금 ──
// eraCard의 .open 클래스 변화를 관찰해 body에 .era-modal-open을 토글한다.
// 여러 열기/닫기 경로(ⓘ 토글·openEraCard·X·탐험 시작·바깥 클릭)를 한 곳에서
// 일관되게 처리하기 위함이다. CSS는 모바일에서만 스크롤을 막으므로
// 데스크탑 동작에는 영향이 없다.
(function(){
  const card = document.getElementById('eraCard');
  if (!card || typeof MutationObserver === 'undefined') return;
  const sync = () => {
    document.body.classList.toggle('era-modal-open', card.classList.contains('open'));
  };
  new MutationObserver(sync).observe(card, { attributes:true, attributeFilter:['class'] });
  sync();
})();

// ── [3] 모바일 첫 진입 1회성 안내 ──
// 모바일(<1024px)에서만, 'ⓘ 시대 개요' 버튼에 아주 약한 pulse를 2회 준 뒤
// 정지시킨다. 저장 없음·반복 없음. 사용자가 그 전에 버튼을 누르면 즉시 해제.
(function(){
  if (window.innerWidth >= 1024) return;
  const btn = document.getElementById('eraBtn');
  if (!btn) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      btn.classList.add('era-hint');
      const stop = () => btn.classList.remove('era-hint');
      btn.addEventListener('click', stop, { once:true });
      // CSS 애니메이션(1.1s × 2회) 종료 후 클래스 제거 — 이후 완전 정지.
      btn.addEventListener('animationend', () => {
        // animationend는 반복 1회마다 발생하므로, iteration-count(2) 종료 시점에
        // 맞춰 약간의 여유를 두고 제거한다.
        setTimeout(stop, 50);
      });
      setTimeout(stop, 2600);   // 안전망: 애니메이션 총 길이 후 강제 정지
    }, 600);
  });
})();

// ── [제거됨] 소개(시작) 팝업 + 지도 하단 고정 푸터(이메일) + 이메일 표시 팝업 ──
// 첫 진입 시 자동으로 뜨던 소개 팝업과 하단 고정 푸터를 없앴다. 그 안의
// 소개 텍스트와 이메일 주소는 상단 메뉴 "소개" 페이지(nav.js의 era-hub와
// 같은 풀스크린 오버레이 패턴)로 옮겼다. localStorage/sessionStorage로
// 관리하던 "오늘 하루 열지 않기" 노출 제어도 더 이상 필요 없다 — 소개
// 페이지는 사용자가 직접 메뉴를 눌러야 열리므로 자동 노출 자체가 없다.

