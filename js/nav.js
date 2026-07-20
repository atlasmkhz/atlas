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
    { key:'prehistory', name:'선사시대', period:'신화시대~고조선', ready:true, url:'maps/prehistory/index.html' },
    { key:'ancient',    name:'고대',     period:'고구려·백제·신라·발해 (기원전 37–936)', ready:true, url:'maps/ancient/index.html' },
    { key:'medieval1',  name:'중세 1',   period:'고려 918–1392', ready:true, url:'maps/medieval1/index.html' },
    { key:'medieval2',  name:'중세 2',   period:'조선 1392–1875', ready:true, url:'maps/medieval2/index.html' },
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
    { routeId:'daegu_gyeongbuk_independence', name:'대구경북 독립운동가', period:'1909–1944', tagline:'"조선의 모스크바"의 시작', ready:true, thumbnail:null },
    { routeId:'provisional_government', name:'임시정부', period:'1919–1945', tagline:'27년, 다섯 번의 이동, 그리고 끝내 지켜낸 이름', ready:true, thumbnail:null },
    { routeId:'modern_art_history', name:'근대예술사', period:'1915–1945', tagline:'식민지라는 현실과 새로운 예술 사이', ready:true, thumbnail:null },
    { routeId:'modern_literature',  name:'근대문학 기행', period:'1908–1945', tagline:'신체시에서 옥중의 시인까지 — 문학사 3부작 1부', ready:true, thumbnail:null },
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
    { key: 'world_history', name: '세계사', ready: true },
    { key: 'biographies', name: '인물열전', ready: true },
  ];

  // 카테고리 안의 하위 주제(subcategory) 카드. seriesId가 있고
  // ARCHIVE_REGISTRY에 실제로 등록돼 있어야 "입장 가능"으로 뜬다.
  const ARCHIVE_SUBCATEGORIES = {
    history: [
      { subcat: 'revisionism', name: '역사왜곡', seriesIds: ['historical_revisionism', 'geonguk_jeonjaeng', 'dokdo_records'] },
      { subcat: 'era_study', name: '시대연구', seriesIds: ['power_accountability', 'punishment_records', 'power_and_time', 'unequal_measures', 'prosecutorial_reckoning', 'hyeonchungwon_paradox', 'cult_and_power'] },
      { subcat: 'primary_sources', name: '사료읽기', seriesIds: ['source_readings', 'hwandan_gogi'] },
    ],
    // ── 세계사 카테고리 (2026-07-16 재편, B안: 3갈래 구조) ──────────
    // ATLAS의 근본 철학: 세계사는 한국사와 분리된 별도 코너가 아니라,
    // 한국사와 "거미줄처럼" 얽히기 위해 들어온다. 프랑스혁명↔3·1운동,
    // 이순신↔세계사의 대응 인물, 12·3 내란↔역사 속 친위쿠데타,
    // E=mc²↔한반도의 나비효과 — 상호작용과 역사의 반복성을 축으로,
    // 인물·사건·세계사·루트·자료실·유튜브가 하나로 이어지는 것이 목표다
    // (왕두목 철학, 2026-07-16). 그래서 세계사 콘텐츠는 가급적 한국사
    // 사건/인물 카드와 related로 연결하고, "그때 우리나라는?" 관점을
    // 적극적으로 넣는다.
    //
    // 3갈래(문명사/정신사/격변사)는 seriesIds를 여러 개 담는 큰 그릇이다.
    // 새 주제는 성격에 맞는 갈래의 seriesIds에 추가하면 된다:
    //   - 문명사: 인간이 만든 것 (과학사·미술사·건축·기술·의학…)
    //   - 정신사: 인간이 믿고 사유한 것 (신화·서사시·종교·경전·철학…)
    //   - 격변사: 인간이 겨루고 뒤엎은 것 (전쟁사·혁명사·제국·전염병…)
    // '세계사 루트'는 한국 지도 위 루트가 아니라 archive/world-routes/
    // 아래 독립 세계지도 페이지로 운영하는 href 직행 링크다(2026-07-12 결정).
    // 세계사 인물은 이 카테고리가 아니라 biographies(인물열전)로 뺀다
    // — 인물은 문명/정신/격변 전체를 가로지르는 축이기 때문(한국사 인물과
    // 동일한 논리).
    world_history: [
      { subcat: 'civilization_history', name: '문명사', seriesIds: ['quantum_century'] },
      { subcat: 'spirit_history', name: '정신사', seriesIds: ['homer_epics', 'gilgamesh_epic', 'greek_myth', 'greek_characters'] },
      { subcat: 'upheaval_history', name: '격변사', seriesIds: [] },
      { subcat: 'world_routes', name: '세계사 루트', href: 'archive/world-routes/index.html' },
    ],
    biographies: [
      { subcat: 'korea_figures', name: '한국사 인물', seriesIds: ['erased_names'] },
      { subcat: 'world_figures', name: '세계사 인물', seriesIds: [] },
    ],
  };

  const ARCHIVE_TYPE_LABEL = { political: '주장·반박', tragedy: '피해 사실', life: '조직·활동', person: '인물', document: '사료' };

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
    if (item.href) { // 직행 링크 카드(세계사 루트 등) — 시리즈 개수 대신 바로가기로 표시
      return `
      <button type="button" class="era-card-item" data-archive-subcat="${item.subcat}">
        <span class="era-card-name">${item.name}</span>
        <span class="era-card-status ready">바로가기</span>
      </button>`;
    }
    const readyCount = (item.seriesIds || []).filter(id => !!ARCHIVE_REGISTRY[id]).length;
    const ready = readyCount > 0;
    const statusClass = ready ? 'ready' : 'soon';
    const statusText = ready ? `${readyCount}개 시리즈` : '준비 중';
    const disabledClass = ready ? '' : ' disabled';
    return `
      <button type="button" class="era-card-item${disabledClass}" data-archive-subcat="${item.subcat}">
        <span class="era-card-name">${item.name}</span>
        <span class="era-card-status ${statusClass}">${statusText}</span>
      </button>`;
  }

  function renderArchiveSeriesCard(seriesId){
    const series = ARCHIVE_REGISTRY[seriesId];
    const ready = !!series;
    const statusClass = ready ? 'ready' : 'soon';
    const statusText = ready ? `${series.posts.length}편` : '준비 중';
    const disabledClass = ready ? '' : ' disabled';
    const name = series ? series.name : seriesId;
    return `
      <button type="button" class="era-card-item${disabledClass}" data-series-id="${seriesId}">
        <span class="era-card-name">${name}</span>
        <span class="era-card-status ${statusClass}">${statusText}</span>
      </button>`;
  }

  // ── 연작 시리즈 그룹핑: "권력과 책임" 4부작 ──────────────────
  // 2026-07 두목님 피드백: 시대연구 목록에 4개 시리즈가 개별 카드로
  // 흩어져 있어 몰입이 끊긴다는 지적. era_study의 seriesIds에서 이
  // 4개를 만나면 개별 카드 대신 그룹 카드 하나로 묶어 보여주고, 클릭하면
  // 4부작만 모아 보여주는 중간 단계(storygroup)를 거치게 한다.
  const STORY_GROUP_IDS = ['punishment_records', 'power_and_time', 'unequal_measures', 'prosecutorial_reckoning'];
  const STORY_GROUP_KEY = 'power_and_accountability_story';
  const STORY_GROUP_LABEL = '책임의 계보 (4부작)';

  function renderStoryGroupCard(){
    const readyCount = STORY_GROUP_IDS.filter(id => !!ARCHIVE_REGISTRY[id]).length;
    const totalPosts = STORY_GROUP_IDS.reduce((sum, id) => sum + (ARCHIVE_REGISTRY[id] ? ARCHIVE_REGISTRY[id].posts.length : 0), 0);
    const statusText = readyCount ? `${totalPosts}편 · ${readyCount}부작` : '준비 중';
    const disabledClass = readyCount ? '' : ' disabled';
    return `
      <button type="button" class="era-card-item${disabledClass}" data-story-group="${STORY_GROUP_KEY}">
        <span class="era-card-name">${STORY_GROUP_LABEL}</span>
        <span class="era-card-status ${readyCount ? 'ready' : 'soon'}">${statusText}</span>
      </button>`;
  }

  // seriesIds 배열을 카드 HTML로 바꾸되, STORY_GROUP_IDS에 속한 항목은
  // 개별 카드 대신 그룹 카드 하나로(처음 등장할 때 한 번만) 치환한다.
  function renderSeriesGridWithGroups(seriesIds){
    let groupInserted = false;
    return seriesIds.map(id => {
      if (STORY_GROUP_IDS.includes(id)) {
        if (groupInserted) return '';
        groupInserted = true;
        return renderStoryGroupCard();
      }
      return renderArchiveSeriesCard(id);
    }).join('');
  }

  function renderArchivePostRow(post, series){
    const typeLabel = ARCHIVE_TYPE_LABEL[post.type] || post.type;
    const dateStr = post.year + (post.month ? `.${String(post.month).padStart(2, '0')}` : '');
    const bodyText = post.format === 'narrative' ? (post.body_ko || '') : post.format === 'source_reading' ? (post.commentary_ko || '') : post.format === 'character_sheet' ? (post.tagline_ko || post.domain || post.body_ko || '') : (post.claim_ko || '');
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

    // level: 'category' | 'subcategory' | 'serieslist' | 'postlist'
    let archiveState = { level: 'category', categoryKey: null, subcat: null, seriesId: null };

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

      } else if (archiveState.level === 'serieslist') {
        const subs = ARCHIVE_SUBCATEGORIES[archiveState.categoryKey] || [];
        const sub = subs.find(s => s.subcat === archiveState.subcat);
        if (archiveHubBack) archiveHubBack.hidden = false;
        if (archiveHubTitle) archiveHubTitle.textContent = sub ? sub.name : '자료실';
        if (archiveHubSub) archiveHubSub.textContent = '시리즈를 선택하세요';
        archiveHubGrid.hidden = false;
        archiveHubList.hidden = true;
        const seriesIds = sub ? (sub.seriesIds || []) : [];
        archiveHubGrid.innerHTML = seriesIds.length
          ? renderSeriesGridWithGroups(seriesIds)
          : '<div class="archive-empty">아직 준비된 시리즈가 없습니다.</div>';

      } else if (archiveState.level === 'storygroup') {
        if (archiveHubBack) archiveHubBack.hidden = false;
        if (archiveHubTitle) archiveHubTitle.textContent = STORY_GROUP_LABEL;
        if (archiveHubSub) archiveHubSub.textContent = '같은 기준으로 여야를 가리지 않고 — 순서대로 읽으시면 좋습니다';
        archiveHubGrid.hidden = false;
        archiveHubList.hidden = true;
        archiveHubGrid.innerHTML = STORY_GROUP_IDS.map(renderArchiveSeriesCard).join('');

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
      archiveState = { level: 'category', categoryKey: null, subcat: null, seriesId: null };
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
        archiveState = archiveState.viaGroup
          ? { level: 'storygroup', categoryKey: archiveState.categoryKey, subcat: archiveState.subcat, seriesId: null, viaGroup: true }
          : { level: 'serieslist', categoryKey: archiveState.categoryKey, subcat: archiveState.subcat, seriesId: null };
      } else if (archiveState.level === 'storygroup') {
        archiveState = { level: 'serieslist', categoryKey: archiveState.categoryKey, subcat: archiveState.subcat, seriesId: null };
      } else if (archiveState.level === 'serieslist') {
        archiveState = { level: 'subcategory', categoryKey: archiveState.categoryKey, subcat: null, seriesId: null };
      } else if (archiveState.level === 'subcategory') {
        archiveState = { level: 'category', categoryKey: null, subcat: null, seriesId: null };
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
        archiveState = { level: 'subcategory', categoryKey: item.key, subcat: null, seriesId: null };
        renderArchiveLevel();

      } else if (archiveState.level === 'subcategory') {
        const subs = ARCHIVE_SUBCATEGORIES[archiveState.categoryKey] || [];
        const item = subs.find(it => it.subcat === btn.dataset.archiveSubcat);
        if (item && item.href) { window.location.href = ARCHIVE_ROOT_PREFIX + item.href; return; }
        const readyCount = item ? (item.seriesIds || []).filter(id => !!ARCHIVE_REGISTRY[id]).length : 0;
        if (!item || readyCount === 0) return; // 콘텐츠 없는 "준비 중" 카드
        archiveState = { level: 'serieslist', categoryKey: archiveState.categoryKey, subcat: item.subcat, seriesId: null };
        renderArchiveLevel();

      } else if (archiveState.level === 'serieslist') {
        if (btn.dataset.storyGroup) {
          archiveState = { level: 'storygroup', categoryKey: archiveState.categoryKey, subcat: archiveState.subcat, seriesId: null };
          renderArchiveLevel();
          return;
        }
        const seriesId = btn.dataset.seriesId;
        if (!seriesId || !ARCHIVE_REGISTRY[seriesId]) return; // 콘텐츠 없는 "준비 중" 카드
        archiveState = { level: 'postlist', categoryKey: archiveState.categoryKey, subcat: archiveState.subcat, seriesId };
        if (window.trackPageView) window.trackPageView('archive', seriesId);
        renderArchiveLevel();

      } else if (archiveState.level === 'storygroup') {
        const seriesId = btn.dataset.seriesId;
        if (!seriesId || !ARCHIVE_REGISTRY[seriesId]) return;
        archiveState = { level: 'postlist', categoryKey: archiveState.categoryKey, subcat: archiveState.subcat, seriesId, viaGroup: true };
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
