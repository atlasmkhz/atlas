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
    { key:'contemporary',name:'현대',    period:'1994–현재', ready:true, url:'maps/contemporary/index.html' }
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

  // ── 자료실(Archive) 레지스트리 ──────────────────────────────
  // content/archive/*.js가 window.registerArchiveSeries로 스스로 등록한다.
  // init() 밖(IIFE 최상단)에서 즉시 정의해야 한다 — index.html에서 이
  // nav.js를 content/archive/*.js보다 앞에 로드하기 때문이다.
  const ARCHIVE_REGISTRY = {};
  window.registerArchiveSeries = function (seriesObj) {
    ARCHIVE_REGISTRY[seriesObj.id] = seriesObj;
  };
  window.ARCHIVE_REGISTRY = ARCHIVE_REGISTRY;

  // ── 자료실 카테고리 ──────────────────────────────────────────
  // 자료실은 근대·근현대·현대(그리고 앞으로 생길 선사·고대·중세1·
  // 중세2까지) 지도 구분 없이 하나로 운영된다 — content/archive/*.js가
  // 모든 지도에 공유되고(content/youtube_videos.js와 같은 패턴),
  // 이 ARCHIVE_CATEGORIES/ARCHIVE_SUBCATEGORIES 블록은 모든 지도의
  // nav.js에 동일하게 복사돼 있어야 한다(다르면 지도마다 다른 자료실이
  // 보이는 버그가 생긴다 — 실제로 한 번 이렇게 어긋나서 문제가 됐었다).
  // 장기적으로 문학/철학/예술/건축/종교까지 아우르는 라이브러리가
  // 목표지만(docs/power_accountability_roadmap.md §0-6), 한국사와
  // 세계사가 채워지기 전까진 메뉴에서 숨긴다.
  const ARCHIVE_CATEGORIES = [
    { key: 'history', name: '역사', ready: true },
    { key: 'world_history', name: '세계사', ready: false },
  ];

  // 카테고리 안의 하위 주제(subcategory) 카드. seriesId가 있고
  // ARCHIVE_REGISTRY에 실제로 등록돼 있어야 "입장 가능"으로 뜬다.
  const ARCHIVE_SUBCATEGORIES = {
    history: [
      { subcat: 'revisionism', name: '역사왜곡', seriesId: 'historical_revisionism' },
      { subcat: 'era_study', name: '시대연구', seriesId: 'power_accountability' },
      { subcat: 'people_study', name: '인물연구', seriesId: null },
      { subcat: 'primary_sources', name: '사료읽기', seriesId: null },
    ],
  };

  const ARCHIVE_TYPE_LABEL = { political: '주장·반박', tragedy: '피해 사실', life: '조직·활동' };

  // 정적 글 페이지 경로 — 지도 구분 없이 사이트 루트의 archive/ 하나다.
  // 이 파일은 atlas/js/nav.js(사이트 루트)이므로 접두사가 필요 없다.
  const ARCHIVE_ROOT_PREFIX = '';
  function archivePostUrl(series, post){
    const slug = series.id.replace(/_/g, '-');
    return `${ARCHIVE_ROOT_PREFIX}archive/${slug}/${post.id}.html`;
  }

  function renderArchiveCategoryCard(item){
    const statusClass = item.ready ? 'ready' : 'soon';
    const statusText = item.ready ? '입장 가능' : '준비 중';
    const disabledClass = item.ready ? '' : ' disabled';
    return `
      <button type="button" class="era-card-item${disabledClass}" data-archive-category="${item.key}">
        <span class="era-card-name">${item.name}</span>
        <span class="era-card-status ${statusClass}">${statusText}</span>
      </button>`;
  }

  function renderArchiveSubcatCard(item){
    const ready = !!item.seriesId && !!ARCHIVE_REGISTRY[item.seriesId];
    const statusClass = ready ? 'ready' : 'soon';
    const statusText = ready ? '입장 가능' : '준비 중';
    const disabledClass = ready ? '' : ' disabled';
    return `
      <button type="button" class="era-card-item${disabledClass}" data-archive-subcat="${item.subcat}" data-series-id="${item.seriesId || ''}">
        <span class="era-card-name">${item.name}</span>
        <span class="era-card-status ${statusClass}">${statusText}</span>
      </button>`;
  }

  function renderArchivePostRow(post, series){
    const typeLabel = ARCHIVE_TYPE_LABEL[post.type] || post.type;
    const dateStr = post.year + (post.month ? `.${String(post.month).padStart(2, '0')}` : '');
    const bodyText = post.format === 'narrative' ? (post.body_ko || '') : (post.claim_ko || '');
    const shortSummary = bodyText.length > 72 ? bodyText.slice(0, 72) + '…' : bodyText;
    const href = archivePostUrl(series, post);
    return `
      <a class="archive-list-item" href="${href}">
        <span class="archive-item-badge">${typeLabel}</span>
        <span class="archive-item-body">
          <span class="archive-item-title">${post.title_ko}</span>
          <span class="archive-item-meta">${dateStr} · ${post.place_ko || ''}</span>
          <span class="archive-item-summary">${shortSummary}</span>
        </span>
      </a>`;
  }

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

    // ── 자료실 허브 (archiveHub) ── era-hub와 같은 scrim+lockBodyScroll
    // 패턴을 재사용하되, 카테고리 → 하위주제 → 글 목록 3단계로 들어간다.
    // modern2/contemporary와 완전히 같은 구조다 — 자료실이 지도 구분
    //없이 하나로 운영되므로, 이 로직 자체도 모든 지도 nav.js에 동일하게
    // 있어야 한다.
    const archiveHub = document.getElementById('archiveHub');
    const archiveHubScrim = document.getElementById('archiveHubScrim');
    const archiveHubClose = document.getElementById('archiveHubClose');
    const archiveHubBack = document.getElementById('archiveHubBack');
    const archiveHubGrid = document.getElementById('archiveHubGrid');
    const archiveHubList = document.getElementById('archiveHubList');
    const archiveHubTitle = document.getElementById('archiveHubTitle');
    const archiveHubSub = document.getElementById('archiveHubSub');

    // level: 'category' | 'subcategory' | 'postlist'
    let archiveState = { level: 'category', categoryKey: null, seriesId: null };

    function renderArchiveLevel(){
      if (!archiveHubGrid || !archiveHubList) return;

      if (archiveState.level === 'category') {
        if (archiveHubBack) archiveHubBack.hidden = true;
        if (archiveHubTitle) archiveHubTitle.textContent = '자료실';
        if (archiveHubSub) archiveHubSub.textContent = '대한민국 역사와 세계사를 기록하는 라이브러리';
        archiveHubGrid.hidden = false;
        archiveHubList.hidden = true;
        archiveHubGrid.innerHTML = ARCHIVE_CATEGORIES.map(renderArchiveCategoryCard).join('');

      } else if (archiveState.level === 'subcategory') {
        const cat = ARCHIVE_CATEGORIES.find(c => c.key === archiveState.categoryKey);
        if (archiveHubBack) archiveHubBack.hidden = false;
        if (archiveHubTitle) archiveHubTitle.textContent = cat ? cat.name : '자료실';
        if (archiveHubSub) archiveHubSub.textContent = '주제를 선택하세요';
        archiveHubGrid.hidden = false;
        archiveHubList.hidden = true;
        const subs = ARCHIVE_SUBCATEGORIES[archiveState.categoryKey] || [];
        archiveHubGrid.innerHTML = subs.map(renderArchiveSubcatCard).join('');

      } else if (archiveState.level === 'postlist') {
        const series = ARCHIVE_REGISTRY[archiveState.seriesId];
        if (archiveHubBack) archiveHubBack.hidden = false;
        if (archiveHubTitle) archiveHubTitle.textContent = series ? series.name : '자료실';
        if (archiveHubSub) archiveHubSub.textContent = series ? (series.tagline || '') : '';
        archiveHubGrid.hidden = true;
        archiveHubList.hidden = false;
        archiveHubList.innerHTML = series
          ? series.posts.map(p => renderArchivePostRow(p, series)).join('')
          : '<div class="archive-empty">아직 준비된 글이 없습니다.</div>';
      }
    }

    window.openArchiveHub = function(){
      if (!archiveHub) return;
      archiveState = { level: 'category', categoryKey: null, seriesId: null };
      renderArchiveLevel();
      archiveHub.classList.add('open');
      archiveHub.setAttribute('aria-hidden', 'false');
      archiveHubScrim?.classList.add('open');
      lockBodyScroll(true);
      if (window.trackPageView) window.trackPageView('archive_hub', 'root');
    };
    window.closeArchiveHub = function(){
      if (!archiveHub) return;
      archiveHub.classList.remove('open');
      archiveHub.setAttribute('aria-hidden', 'true');
      archiveHubScrim?.classList.remove('open');
      lockBodyScroll(false);
    };

    archiveHubClose?.addEventListener('click', window.closeArchiveHub);
    archiveHubScrim?.addEventListener('click', window.closeArchiveHub);

    archiveHubBack?.addEventListener('click', () => {
      if (archiveState.level === 'postlist') {
        archiveState = { level: 'subcategory', categoryKey: archiveState.categoryKey, seriesId: null };
      } else if (archiveState.level === 'subcategory') {
        archiveState = { level: 'category', categoryKey: null, seriesId: null };
      }
      renderArchiveLevel();
    });

    // 카테고리 카드 클릭 → 하위주제 단계로.
    archiveHubGrid?.addEventListener('click', (e) => {
      const btn = e.target.closest('.era-card-item');
      if (!btn || btn.classList.contains('disabled')) return;

      if (archiveState.level === 'category') {
        const item = ARCHIVE_CATEGORIES.find(it => it.key === btn.dataset.archiveCategory);
        if (!item || !item.ready) return;
        archiveState = { level: 'subcategory', categoryKey: item.key, seriesId: null };
        renderArchiveLevel();

      } else if (archiveState.level === 'subcategory') {
        const seriesId = btn.dataset.seriesId;
        if (!seriesId || !ARCHIVE_REGISTRY[seriesId]) return; // 콘텐츠 없는 "준비 중" 카드
        archiveState = { level: 'postlist', categoryKey: archiveState.categoryKey, seriesId };
        if (window.trackPageView) window.trackPageView('archive', seriesId);
        renderArchiveLevel();
      }
    });

    // 글 목록 항목은 <a href="archive/...">라 클릭 시 그냥 정적 페이지로
    // 이동한다(별도 핸들러 불필요) — SPA 오버레이는 "찾아가는 목록"까지만.

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
        // 예전엔 이 지도(근대)에 자료실 콘텐츠가 아예 없어서 modern2로
        // 페이지 자체를 이동시켰다 — 그러면 지금 보던 화면 상태가 다
        // 날아가고, modern2가 기본 연도(1945)로 열려 "느닷없이 1945로
        // 이동했다"는 인상을 줬다. 지금은 이 지도(근대)에도 로컬
        // archiveHub가 있으므로 그걸 연다 — 페이지 이동이 없다.
        if (eraHub.classList.contains('open')) window.closeEraHub();
        if (routeHub && routeHub.classList.contains('open')) window.closeRouteHub();
        if (introPage && introPage.classList.contains('open')) window.closeIntroPage();
        window.openArchiveHub();
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
