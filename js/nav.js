// ═══════════════════════════════════════════════════════
// nav.js — 상단 포털 내비게이션 (ATLAS 메뉴 + 시대 선택 허브 + 소개 페이지)
//
// 지금 index.html 자체가 "근대(1876~1945)" 지도다. 이 파일은 그 위에
// 얇은 포털 껍데기를 씌운다:
//   - 상단 .site-nav: 소개/지도/자료실/루트/프로젝트 5개 메뉴
//   - "지도" 클릭 → .era-hub(6개 시대 카드)가 열린다
//       · 근대 카드 클릭 → 허브를 닫고 지금 화면(이 페이지)으로 복귀
//       · 다른 시대 카드 → 아직 별도 페이지가 없으므로 비활성(.disabled)
//   - "소개" 클릭 → .intro-page(소개 글)가 열린다. 본문은 index.html에
//     정적으로 박혀 있다(이 파일은 열기/닫기만 담당).
//   - 나머지 메뉴(자료실/루트/프로젝트) 클릭 → "준비 중" 토스트
//
// 다른 시대 지도가 실제로 만들어지면, ERA_HUB_ITEMS의 해당 항목에서
// ready:true와 url을 채우는 것만으로 이 허브가 그 페이지로 안내한다.
// 즉 이 파일은 시대가 늘어나도 다시 설계할 필요 없는 "포털 입구"다.
// ═══════════════════════════════════════════════════════

(function () {

  // ── 시대 카드 정의 — 시대가 추가될 때마다 이 배열에 한 항목만 늘리면 된다.
  // ready:false인 항목은 카드가 비활성 처리되고 클릭이 막힌다.
  // url은 ready:true일 때만 사용 — 같은 사이트 내 다른 경로(예: /maps/medieval/)를
  // 가리키게 될 자리다. 지금은 근대·근현대 두 곳이 ready다. 근대는 지금 이
  // 페이지이므로 url:'.'(허브만 닫음), 근현대는 하위 디렉토리를 가리킨다.
  // file:// 환경(로컬 더블클릭)에서는 디렉토리 경로만 주면 브라우저가
  // index.html을 자동으로 찾아주지 않고 폴더 목록을 보여준다 — 그래서
  // 디렉토리를 가리키는 url은 전부 'index.html'까지 명시했다(웹서버에
  // 올렸을 때도 동일하게 동작하니 손해가 없다).
  const ERA_HUB_ITEMS = [
    { key:'prehistory', name:'선사시대', period:'고조선', ready:false, url:null },
    { key:'ancient',    name:'고대',     period:'고구려·백제·신라·발해', ready:false, url:null },
    { key:'medieval1',  name:'중세 1',   period:'고려', ready:false, url:null },
    { key:'medieval2',  name:'중세 2',   period:'조선', ready:false, url:null },
    { key:'modern',     name:'근대',     period:'1876–1945', ready:true, url:'.' },
    { key:'modern2',    name:'근현대',   period:'1945–1993', ready:true, url:'maps/modern2/index.html' },
    { key:'contemporary',name:'현대',    period:'1993–현재', ready:false, url:null }
  ];

  // ── 루트 목록 — 루트가 늘어날 때마다 이 배열에 항목 하나만 추가한다.
  // routeId는 routes/*.js가 registerRoute()로 등록하는 route.id와 같아야
  // 한다. ready:false 카드는 회색 처리되고 클릭이 막힌다(era-hub와 동일
  // 규칙). thumbnail은 카드 배경 이미지 — 없으면 카드 색상만 표시.
  const ROUTE_HUB_ITEMS = [
    { routeId:'hong_beom_do',       name:'홍범도',      period:'1868–2021', tagline:'포수에서 현충원까지', ready:true, thumbnail:null },
    { routeId:'kim_gu',             name:'백범 김구',    period:'1876–1949', tagline:'상놈의 아들에서 임시정부의 얼굴로', ready:true, thumbnail:null },
    { routeId:'kim_won_bong',       name:'김원봉',      period:'1898–1958', tagline:'의열단을 만든 사람, 두 번 지워진 이름', ready:true, thumbnail:null },
    { routeId:'righteous_struggle', name:'의열투쟁',    period:'1908–1932', tagline:'조선의 심장을 겨누다', ready:true, thumbnail:null },
    { routeId:'japanese_atrocities',name:'일제 만행',   period:'1895–1945', tagline:'50년의 가해 기록', ready:true, thumbnail:null },
    { routeId:'donghak',            name:'동학',        period:'1860–1919', tagline:'득도에서 우금치까지, 그리고 3·1운동으로', ready:true, thumbnail:null },
  ];

  const NAV_LABELS = { intro:'소개', map:'지도', archive:'자료실', route:'루트', project:'프로젝트' };

  document.addEventListener('DOMContentLoaded', init);
  if (document.readyState === 'complete' || document.readyState === 'interactive') init();

  function init(){
    const siteNav = document.getElementById('siteNav');
    const eraHub = document.getElementById('eraHub');
    const eraHubScrim = document.getElementById('eraHubScrim');
    const eraHubClose = document.getElementById('eraHubClose');
    const eraHubGrid = document.getElementById('eraHubGrid');
    if (!siteNav || !eraHub) return; // 마크업이 없으면 조용히 종료(다른 페이지 보호)

    if (eraHubGrid && !eraHubGrid.dataset.built) {
      eraHubGrid.dataset.built = '1';
      eraHubGrid.innerHTML = ERA_HUB_ITEMS.map(renderEraCard).join('');
    }

    function lockBodyScroll(lock){
      document.body.classList.toggle('era-modal-open', lock); // ui.js와 동일한 락 클래스 공유
    }

    window.openEraHub = function(){
      eraHub.classList.add('open');
      eraHub.setAttribute('aria-hidden', 'false');
      eraHubScrim.classList.add('open');
      lockBodyScroll(true);
    };
    window.closeEraHub = function(){
      eraHub.classList.remove('open');
      eraHub.setAttribute('aria-hidden', 'true');
      eraHubScrim.classList.remove('open');
      lockBodyScroll(false);
    };

    eraHubClose?.addEventListener('click', window.closeEraHub);
    eraHubScrim?.addEventListener('click', window.closeEraHub);

    // ── 루트 선택 허브 (routeHub) ── era-hub와 완전히 같은 패턴을
    // 재사용한다. 카드를 누르면 허브를 닫고 routeRenderer.js의
    // window.openRoute(routeId)를 호출한다.
    const routeHub = document.getElementById('routeHub');
    const routeHubScrim = document.getElementById('routeHubScrim');
    const routeHubClose = document.getElementById('routeHubClose');
    const routeHubGrid = document.getElementById('routeHubGrid');

    if (routeHubGrid && !routeHubGrid.dataset.built) {
      routeHubGrid.dataset.built = '1';
      routeHubGrid.innerHTML = ROUTE_HUB_ITEMS.map(renderRouteCard).join('');
    }

    window.openRouteHub = function(){
      if (!routeHub) return;
      routeHub.classList.add('open');
      routeHub.setAttribute('aria-hidden', 'false');
      routeHubScrim?.classList.add('open');
      lockBodyScroll(true);
    };
    window.closeRouteHub = function(){
      if (!routeHub) return;
      routeHub.classList.remove('open');
      routeHub.setAttribute('aria-hidden', 'true');
      routeHubScrim?.classList.remove('open');
      lockBodyScroll(false);
    };

    routeHubClose?.addEventListener('click', window.closeRouteHub);
    routeHubScrim?.addEventListener('click', window.closeRouteHub);

    routeHubGrid?.addEventListener('click', (e) => {
      const btn = e.target.closest('.era-card-item');
      if (!btn || btn.classList.contains('disabled')) return;
      const item = ROUTE_HUB_ITEMS.find(it => it.routeId === btn.dataset.routeId);
      if (!item || !item.ready) return;
      window.closeRouteHub();
      if (typeof window.openRoute === 'function') window.openRoute(item.routeId);
    });

    // ── 소개 페이지 (introPage) ── era-hub와 같은 scrim+lockBodyScroll
    // 패턴을 재사용한다. 첫 진입 자동 노출은 없고, 오직 "소개" 메뉴를
    // 직접 눌러야만 열린다.
    const introPage = document.getElementById('introPage');
    const introScrim = document.getElementById('introScrim');
    const introClose = document.getElementById('introClose');

    window.openIntroPage = function(){
      if (!introPage) return;
      introPage.classList.add('open');
      introPage.setAttribute('aria-hidden', 'false');
      introScrim.classList.add('open');
      lockBodyScroll(true);
    };
    window.closeIntroPage = function(){
      if (!introPage) return;
      introPage.classList.remove('open');
      introPage.setAttribute('aria-hidden', 'true');
      introScrim.classList.remove('open');
      lockBodyScroll(false);
    };
    introClose?.addEventListener('click', window.closeIntroPage);
    introScrim?.addEventListener('click', window.closeIntroPage);

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (eraHub.classList.contains('open')) window.closeEraHub();
      else if (routeHub && routeHub.classList.contains('open')) window.closeRouteHub();
      else if (introPage && introPage.classList.contains('open')) window.closeIntroPage();
    });

    eraHubGrid?.addEventListener('click', (e) => {
      const btn = e.target.closest('.era-card-item');
      if (!btn || btn.classList.contains('disabled')) return;
      const item = ERA_HUB_ITEMS.find(it => it.key === btn.dataset.eraKey);
      if (!item || !item.ready) return;
      if (window.trackPageView) window.trackPageView('era', item.key);
      if (item.url === '.') {
        // 지금 페이지가 곧 "근대" 지도이므로 허브만 닫는다.
        window.closeEraHub();
      } else if (item.url) {
        window.location.href = item.url;
      }
    });

    // ── 상단 메뉴 클릭 ──
    // map/intro는 풀스크린 오버레이라 서로 동시에 열려 있으면 안 된다 —
    // 다른 쪽을 먼저 닫고 새로 연다.
    siteNav.addEventListener('click', (e) => {
      const btn = e.target.closest('.site-nav-item');
      if (!btn) return;
      const key = btn.dataset.nav;
      siteNav.querySelectorAll('.site-nav-item').forEach(b => b.classList.toggle('active', b === btn));
      if (key === 'map') {
        if (introPage && introPage.classList.contains('open')) window.closeIntroPage();
        window.openEraHub();
      } else if (key === 'intro') {
        if (eraHub.classList.contains('open')) window.closeEraHub();
        window.openIntroPage();
      } else if (key === 'archive') {
        // 자료실 콘텐츠는 지금 근현대(modern2) 지도 쪽에만 있다 — 시대
        // 구분 없이 자료실이 "열려야" 한다는 요구를 이 페이지 자체에
        // 자료실 UI를 복제하지 않고, 실제 콘텐츠가 있는 곳으로 안내하는
        // 방식으로 해결했다(ERA_HUB_ITEMS가 시대 간 이동을 다루는 것과
        // 같은 방식 — 페이지 자체가 다르면 이동한다). modern2의 nav.js가
        // ?nav=archive 쿼리를 보고 로드 직후 자동으로 자료실 허브를 연다.
        window.location.href = 'maps/modern2/index.html?nav=archive';
      } else if (key === 'route') {
        // 루트 허브 — era-hub와 동일한 패턴으로 먼저 선택 화면을 보여준다.
        if (eraHub.classList.contains('open')) window.closeEraHub();
        if (introPage && introPage.classList.contains('open')) window.closeIntroPage();
        window.openRouteHub();
      } else if (key === 'project') {
        if (eraHub.classList.contains('open')) window.closeEraHub();
        if (introPage && introPage.classList.contains('open')) window.closeIntroPage();
        if (typeof window.openProjectHub === 'function') window.openProjectHub();
        else showComingSoon(NAV_LABELS[key] || key);
      } else {
        showComingSoon(NAV_LABELS[key] || key);
      }
    });
  }

  function renderEraCard(item){
    const statusClass = item.ready ? 'ready' : 'soon';
    const statusText = item.ready ? '입장 가능' : '준비 중';
    const disabledClass = item.ready ? '' : ' disabled';
    return `
      <button type="button" class="era-card-item${disabledClass}" data-era-key="${item.key}">
        <span class="era-card-period">${item.period}</span>
        <span class="era-card-name">${item.name}</span>
        <span class="era-card-status ${statusClass}">${statusText}</span>
      </button>`;
  }

  function renderRouteCard(item){
    const statusClass = item.ready ? 'ready' : 'soon';
    const statusText = item.ready ? '탐험하기' : '준비 중';
    const disabledClass = item.ready ? '' : ' disabled';
    const thumbStyle = item.thumbnail ? ` style="background-image:url('${item.thumbnail}');"` : '';
    return `
      <button type="button" class="era-card-item route-card-item${disabledClass}"
              data-route-id="${item.routeId}"${thumbStyle}>
        <span class="era-card-period">${item.period}</span>
        <span class="era-card-name">${item.name}</span>
        <span class="era-card-tagline">${item.tagline || ''}</span>
        <span class="era-card-status ${statusClass}">${statusText}</span>
      </button>`;
  }

  // ── "준비 중" 토스트 — 별도 마크업 없이 가볍게 동적으로 띄운다.
  // 자료실/루트/프로젝트/소개 페이지가 실제로 생기면, 이 분기를
  // window.location.href = ... 로 교체하면 된다.
  let toastTimer = null;
  function showComingSoon(label){
    let toast = document.getElementById('navComingSoonToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'navComingSoonToast';
      toast.style.cssText = [
        'position:fixed', 'top:calc(var(--top-nav-height) + 10px)', 'left:50%',
        'transform:translateX(-50%)', 'z-index:1302',
        'background:rgba(20,17,12,0.94)', 'color:#e8e0d0',
        'font-size:12.5px', 'letter-spacing:0.5px',
        'padding:9px 16px', 'border-radius:9px',
        'border:1px solid rgba(184,152,96,0.3)',
        'transition:opacity 0.25s', 'opacity:0', 'pointer-events:none'
      ].join(';');
      document.body.appendChild(toast);
    }
    toast.textContent = `「${label}」은 아직 준비 중입니다.`;
    toast.style.opacity = '1';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.style.opacity = '0'; }, 1800);
  }

})();
