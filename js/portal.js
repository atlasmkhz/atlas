// js/portal.js — atlas/index.html(포털) 전용 스크립트.
// index.html이 더 이상 근대(1876~1945) 지도가 아니라 별도 포털이 되면서
// 새로 만들었다 — 지도 페이지들의 app.js/map.js와는 무관하다.
//
// 지도 페이지들의 js/nav.js를 그대로 불러오지 않는 이유: nav.js의
// ERA_HUB_ITEMS에서 "근대" 항목은 url:'.'(자기참조 — "지금 이 페이지가
// 이미 근대 지도이니 허브만 닫는다")를 쓴다. 포털은 근대 지도가
// 아니므로 이 자기참조가 성립하지 않는다 — 포털에서 "근대" 카드를
// 누르면 항상 실제로 map.html로 이동해야 한다. 그래서 이 파일에
// 자료실(archiveHub)·시대선택(eraHub) 로직을 포털 전용으로 다시
// 구현했다 — 자료실 부분은 taxonomy(ARCHIVE_CATEGORIES/SUBCATEGORIES)를
// 지도들의 nav.js와 반드시 동일하게 유지해야 한다(다르면 포털과 지도가
// 서로 다른 자료실을 보여주는 버그가 생긴다).
//
// 이 파일이 하는 일 네 가지:
// 1. "오늘의 특집" 로테이션
// 2. 구축 현황(PORTAL_STATS) 렌더링
// 3. 시대 선택 허브(eraHub)
// 4. 자료실 허브(archiveHub) — 카테고리→하위주제→글 목록 3단계

(function () {

  // ── 1. 오늘의 특집 로테이션 ──────────────────────────────────
  const RECENT_DAYS = 14; // 이 안에 올라온 영상이 있으면 무조건 그게 특집.

  function getISOWeek(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  }

  function pickFeaturedVideo(videos) {
    if (!videos || !videos.length) return null;
    const now = new Date();
    const recent = videos
      .filter(v => (now - new Date(v.published)) / 86400000 <= RECENT_DAYS)
      .sort((a, b) => new Date(b.published) - new Date(a.published));
    if (recent.length) return recent[0];
    const sorted = [...videos].sort((a, b) => new Date(a.published) - new Date(b.published));
    const week = getISOWeek(now) + now.getFullYear() * 53;
    return sorted[week % sorted.length];
  }

  function relatedLinks(video) {
    const links = [];
    (video.related_events || []).forEach(id =>
      links.push({ label: '관련 사건', href: `map.html?event=${id}` }));
    (video.related_events_modern2 || []).forEach(id =>
      links.push({ label: '관련 사건', href: `maps/modern2/index.html?event=${id}` }));
    (video.related_routes || []).forEach(id =>
      links.push({ label: '관련 루트', href: `maps/modern2/index.html?route=${id}` }));
    return links;
  }

  function renderFeatured() {
    const videos = window.YOUTUBE_VIDEOS || [];
    const featured = pickFeaturedVideo(videos);
    const el = document.getElementById('featuredCard');
    if (!el) return;

    if (!featured || !featured.youtube_id) {
      el.innerHTML = '<p class="featured-empty">오늘의 특집을 준비 중입니다.</p>';
      return;
    }

    const thumb = `https://i.ytimg.com/vi/${featured.youtube_id}/maxresdefault.jpg`;
    const watchUrl = `https://youtu.be/${featured.youtube_id}`;
    const links = relatedLinks(featured);
    const linksHtml = links.length
      ? `<div class="featured-related">
           <div class="featured-related-title">이 영상에서 다루는 내용</div>
           <div class="featured-related-list">${links.map(l =>
             `<a href="${l.href}">${l.label}</a>`).join('')}</div>
         </div>`
      : '';

    el.innerHTML = `
      <span class="featured-badge">최신 영상</span>
      <a class="featured-thumb" href="${watchUrl}" target="_blank" rel="noopener">
        <img src="${thumb}" alt="${featured.title}" loading="lazy">
        <span class="featured-play">▶</span>
      </a>
      <h3 class="featured-title">${featured.title}</h3>
      <p class="featured-desc">${featured.description || ''}</p>
      ${linksHtml}
      <a class="featured-cta" href="${watchUrl}" target="_blank" rel="noopener">▶ 영상 보기</a>
    `;
  }

  // ── 2. 구축 현황 ──────────────────────────────────────────
  function renderStats() {
    const stats = window.PORTAL_STATS;
    const el = document.getElementById('portalStats');
    if (!el || !stats) return;
    el.innerHTML = `
      <div class="stat-item"><span class="stat-num">${stats.events.toLocaleString()}</span><span class="stat-label">사건</span></div>
      <div class="stat-item"><span class="stat-num">${stats.routes.toLocaleString()}</span><span class="stat-label">루트</span></div>
      <div class="stat-item"><span class="stat-num">${stats.archive_posts.toLocaleString()}</span><span class="stat-label">자료</span></div>
    `;
  }

  // ── 3. 시대 선택 허브 ── 포털에서는 모든 항목이 "실제 이동"이다
  // (자기참조 없음 — 이미 지도 위가 아니므로).
  const ERA_ITEMS = [
    { key:'prehistory', name:'선사시대', period:'고조선', ready:false, url:null },
    { key:'ancient',    name:'고대',     period:'고구려·백제·신라·발해', ready:false, url:null },
    { key:'medieval1',  name:'중세 1',   period:'고려', ready:false, url:null },
    { key:'medieval2',  name:'중세 2',   period:'조선', ready:false, url:null },
    { key:'modern',     name:'근대',     period:'1876–1945', ready:true, url:'map.html' },
    { key:'modern2',    name:'근현대',   period:'1945–1993', ready:true, url:'maps/modern2/index.html' },
    { key:'contemporary',name:'현대',    period:'1994–현재', ready:true, url:'maps/contemporary/index.html' }
  ];

  function renderEraHub() {
    const grid = document.getElementById('eraHubGrid');
    if (!grid) return;
    grid.innerHTML = ERA_ITEMS.map(item => {
      const disabledClass = item.ready ? '' : ' disabled';
      const statusText = item.ready ? '입장 가능' : '준비 중';
      const statusClass = item.ready ? 'ready' : 'soon';
      const tag = item.ready ? 'a' : 'button';
      const hrefAttr = item.ready ? `href="${item.url}"` : `type="button"`;
      return `<${tag} class="era-card-item${disabledClass}" ${hrefAttr}>
        <span class="era-card-period">${item.period}</span>
        <span class="era-card-name">${item.name}</span>
        <span class="era-card-status ${statusClass}">${statusText}</span>
      </${tag}>`;
    }).join('');
  }

  function setupEraHub() {
    const eraHub = document.getElementById('eraHub');
    const eraHubScrim = document.getElementById('eraHubScrim');
    const eraHubClose = document.getElementById('eraHubClose');
    if (!eraHub) return;
    renderEraHub();
    window.openEraHub = function () {
      eraHub.classList.add('open');
      eraHubScrim?.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    window.closeEraHub = function () {
      eraHub.classList.remove('open');
      eraHubScrim?.classList.remove('open');
      document.body.style.overflow = '';
    };
    eraHubClose?.addEventListener('click', window.closeEraHub);
    eraHubScrim?.addEventListener('click', window.closeEraHub);
  }

  // ── 4. 자료실 허브 ── 지도들의 nav.js와 반드시 동일한 taxonomy.
  // content/archive/*.js가 window.registerArchiveSeries로 등록한다.
  const ARCHIVE_REGISTRY = {};
  window.registerArchiveSeries = function (seriesObj) {
    ARCHIVE_REGISTRY[seriesObj.id] = seriesObj;
  };

  const ARCHIVE_CATEGORIES = [
    { key: 'history', name: '역사', ready: true },
    { key: 'world_history', name: '세계사', ready: false },
  ];
  const ARCHIVE_SUBCATEGORIES = {
    history: [
      { subcat: 'revisionism', name: '역사왜곡', seriesId: 'historical_revisionism' },
      { subcat: 'era_study', name: '시대연구', seriesId: 'power_accountability' },
      { subcat: 'people_study', name: '인물연구', seriesId: null },
      { subcat: 'primary_sources', name: '사료읽기', seriesId: null },
    ],
  };
  const ARCHIVE_TYPE_LABEL = { political: '주장·반박', tragedy: '피해 사실', life: '조직·활동' };

  function archivePostUrl(series, post) {
    const slug = series.id.replace(/_/g, '-');
    return `archive/${slug}/${post.id}.html`; // 포털은 사이트 루트라 접두사 불필요.
  }

  function setupArchiveHub() {
    const archiveHub = document.getElementById('archiveHub');
    const archiveHubScrim = document.getElementById('archiveHubScrim');
    const archiveHubClose = document.getElementById('archiveHubClose');
    const archiveHubBack = document.getElementById('archiveHubBack');
    const archiveHubGrid = document.getElementById('archiveHubGrid');
    const archiveHubList = document.getElementById('archiveHubList');
    const archiveHubTitle = document.getElementById('archiveHubTitle');
    const archiveHubSub = document.getElementById('archiveHubSub');
    if (!archiveHub) return;

    let state = { level: 'category', categoryKey: null, seriesId: null };

    function renderCategoryCard(item) {
      const statusClass = item.ready ? 'ready' : 'soon';
      const statusText = item.ready ? '입장 가능' : '준비 중';
      const disabledClass = item.ready ? '' : ' disabled';
      return `<button type="button" class="era-card-item${disabledClass}" data-archive-category="${item.key}">
        <span class="era-card-name">${item.name}</span>
        <span class="era-card-status ${statusClass}">${statusText}</span>
      </button>`;
    }
    function renderSubcatCard(item) {
      const ready = !!item.seriesId && !!ARCHIVE_REGISTRY[item.seriesId];
      const statusClass = ready ? 'ready' : 'soon';
      const statusText = ready ? '입장 가능' : '준비 중';
      const disabledClass = ready ? '' : ' disabled';
      return `<button type="button" class="era-card-item${disabledClass}" data-archive-subcat="${item.subcat}" data-series-id="${item.seriesId || ''}">
        <span class="era-card-name">${item.name}</span>
        <span class="era-card-status ${statusClass}">${statusText}</span>
      </button>`;
    }
    function renderPostRow(post, series) {
      const typeLabel = ARCHIVE_TYPE_LABEL[post.type] || post.type;
      const dateStr = post.year + (post.month ? `.${String(post.month).padStart(2, '0')}` : '');
      const bodyText = post.format === 'narrative' ? (post.body_ko || '') : (post.claim_ko || '');
      const shortSummary = bodyText.length > 72 ? bodyText.slice(0, 72) + '…' : bodyText;
      const href = archivePostUrl(series, post);
      return `<a class="archive-list-item" href="${href}">
        <span class="archive-item-badge">${typeLabel}</span>
        <span class="archive-item-body">
          <span class="archive-item-title">${post.title_ko}</span>
          <span class="archive-item-meta">${dateStr} · ${post.place_ko || ''}</span>
          <span class="archive-item-summary">${shortSummary}</span>
        </span>
      </a>`;
    }

    function render() {
      if (state.level === 'category') {
        if (archiveHubBack) archiveHubBack.hidden = true;
        if (archiveHubTitle) archiveHubTitle.textContent = '자료실';
        if (archiveHubSub) archiveHubSub.textContent = '대한민국 역사와 세계사를 기록하는 라이브러리';
        archiveHubGrid.hidden = false; archiveHubList.hidden = true;
        archiveHubGrid.innerHTML = ARCHIVE_CATEGORIES.map(renderCategoryCard).join('');
      } else if (state.level === 'subcategory') {
        const cat = ARCHIVE_CATEGORIES.find(c => c.key === state.categoryKey);
        if (archiveHubBack) archiveHubBack.hidden = false;
        if (archiveHubTitle) archiveHubTitle.textContent = cat ? cat.name : '자료실';
        if (archiveHubSub) archiveHubSub.textContent = '주제를 선택하세요';
        archiveHubGrid.hidden = false; archiveHubList.hidden = true;
        archiveHubGrid.innerHTML = (ARCHIVE_SUBCATEGORIES[state.categoryKey] || []).map(renderSubcatCard).join('');
      } else if (state.level === 'postlist') {
        const series = ARCHIVE_REGISTRY[state.seriesId];
        if (archiveHubBack) archiveHubBack.hidden = false;
        if (archiveHubTitle) archiveHubTitle.textContent = series ? series.name : '자료실';
        if (archiveHubSub) archiveHubSub.textContent = series ? (series.tagline || '') : '';
        archiveHubGrid.hidden = true; archiveHubList.hidden = false;
        archiveHubList.innerHTML = series
          ? series.posts.map(p => renderPostRow(p, series)).join('')
          : '<div class="archive-empty">아직 준비된 글이 없습니다.</div>';
      }
    }

    window.openArchiveHub = function () {
      state = { level: 'category', categoryKey: null, seriesId: null };
      render();
      archiveHub.classList.add('open');
      archiveHubScrim?.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    window.closeArchiveHub = function () {
      archiveHub.classList.remove('open');
      archiveHubScrim?.classList.remove('open');
      document.body.style.overflow = '';
    };
    archiveHubClose?.addEventListener('click', window.closeArchiveHub);
    archiveHubScrim?.addEventListener('click', window.closeArchiveHub);
    archiveHubBack?.addEventListener('click', () => {
      if (state.level === 'postlist') state = { level: 'subcategory', categoryKey: state.categoryKey, seriesId: null };
      else if (state.level === 'subcategory') state = { level: 'category', categoryKey: null, seriesId: null };
      render();
    });
    archiveHubGrid?.addEventListener('click', (e) => {
      const btn = e.target.closest('.era-card-item');
      if (!btn || btn.classList.contains('disabled')) return;
      if (state.level === 'category') {
        const item = ARCHIVE_CATEGORIES.find(it => it.key === btn.dataset.archiveCategory);
        if (!item || !item.ready) return;
        state = { level: 'subcategory', categoryKey: item.key, seriesId: null };
        render();
      } else if (state.level === 'subcategory') {
        const seriesId = btn.dataset.seriesId;
        if (!seriesId || !ARCHIVE_REGISTRY[seriesId]) return;
        state = { level: 'postlist', categoryKey: state.categoryKey, seriesId };
        render();
      }
    });
  }

  // ── 자료실 둘러보기 ── 가짜 예시가 아니라 실제 등록된 글 중 하나를
  // 보여준다(오늘의 특집과 같은 로테이션 원리 — 날짜 시드로 결정론적
  // 순환). 인물카드(§5)·루트 데이터는 포털에 안 로드돼 있어서 지금은
  // 자료실 글만 다룬다 — "추천 사건·인물·루트"까지 채우려면 그 데이터도
  // 포털에 불러와야 하니 다음 단계로 남긴다.
  function renderExplore() {
    const el = document.getElementById('portalExplore');
    if (!el) return;
    const allPosts = [];
    Object.values(ARCHIVE_REGISTRY).forEach(series => {
      series.posts.forEach(post => allPosts.push({ post, series }));
    });
    if (!allPosts.length) { el.innerHTML = ''; return; }
    const week = getISOWeek(new Date()) + new Date().getFullYear() * 53;
    const { post, series } = allPosts[week % allPosts.length];
    const href = archivePostUrl(series, post);
    const summary = (post.body_ko || post.claim_ko || '').slice(0, 90) + '…';
    el.innerHTML = `
      <a class="portal-explore-card" href="${href}">
        <span class="portal-explore-badge">${series.name}</span>
        <div class="portal-explore-title">${post.title_ko}</div>
        <div class="portal-explore-desc">${summary}</div>
      </a>`;
  }

  function setupInfoModal() {
    const modal = document.getElementById('infoModal');
    const scrim = document.getElementById('infoModalScrim');
    const close = document.getElementById('infoModalClose');
    if (!modal) return;
    function open() { modal.classList.add('open'); scrim?.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function shut() { modal.classList.remove('open'); scrim?.classList.remove('open'); document.body.style.overflow = ''; }
    document.getElementById('portalOpenInfo')?.addEventListener('click', open);
    close?.addEventListener('click', shut);
    scrim?.addEventListener('click', shut);
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderFeatured();
    renderStats();
    setupEraHub();
    setupArchiveHub();
    setupInfoModal();
    renderExplore();

    document.getElementById('portalOpenMap')?.addEventListener('click', (e) => {
      e.preventDefault();
      window.openEraHub();
    });
    document.getElementById('portalOpenArchive')?.addEventListener('click', (e) => {
      e.preventDefault();
      window.openArchiveHub();
    });
  });

})();

