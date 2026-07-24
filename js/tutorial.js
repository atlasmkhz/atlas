// js/tutorial.js — 진묘수가 안내하는 첫 방문 튜토리얼
//
// 2026-07-24. ATLAS는 지도 7개, 루트 56개, 자료실 205편에 서재 시스템까지
// 있어서 첫 방문자가 어디부터 봐야 할지 알기 어렵다. 게임의 NPC 튜토리얼처럼
// 진묘수가 한 단계씩 안내한다.
//
// ── 설계 방침 ────────────────────────────────────────────────
// 1) 데이터 주도. STEPS 배열에 항목을 넣고 빼는 것만으로 단계가 바뀐다.
//    퀴즈·배지·낱말퍼즐이 나중에 완성되면 슬라이드 하나만 추가하면 되고,
//    그때 이 파일의 로직은 건드릴 필요가 없다.
//
// 2) 페이지마다 있는 것이 다르다. 포털에는 슬라이더가 없고, 선사~조선
//    지도는 챕터 방식이라 연도 슬라이더가 없다. 각 단계에 when() 조건을
//    두어 해당 페이지에 없는 기능은 건너뛴다.
//
// 3) 하이라이트는 "구멍 뚫기" 방식. 화면 전체를 어둡게 덮되 설명 중인
//    요소만 구멍을 내어 밝게 보여준다. box-shadow로 만들기 때문에
//    실제 요소를 복제하거나 z-index를 조작하지 않는다 — 지도 UI를
//    건드리지 않아 부작용이 없다.
//
// 4) 강제하지 않는다. 언제든 건너뛸 수 있고, 한 번 본 뒤에는 다시 뜨지
//    않는다. 도움말에서 수동으로 다시 열 수 있다(window.openTutorial).

(function () {
  'use strict';

  const G = () => window.AtlasGrowth;

  // 진묘수 이미지 경로 — 페이지 깊이에 맞춰 계산한다
  function rootPrefix() {
    const seg = location.pathname.split('/').filter(Boolean);
    const dirs = (seg.length && seg[seg.length - 1].indexOf('.') !== -1)
      ? seg.slice(0, -1) : seg.slice();
    return dirs.length ? '../'.repeat(dirs.length) : '';
  }

  const has = (sel) => !!document.querySelector(sel);

  // ── 단계 정의 ──────────────────────────────────────────────
  // 두 갈래로 나뉜다. 포털(index.html)과 지도는 화면 구성이 완전히 달라서
  // 한 벌의 단계로는 맞출 수 없다 — 포털에는 슬라이더도 마커도 없다.
  //
  // target: 하이라이트할 요소(없으면 화면 중앙에 말풍선만)
  // when:   이 단계를 보여줄 조건. 없으면 항상 표시
  // noHole: 대상이 너무 커서 구멍을 내면 의미가 없을 때(지도 전체 등)
  // scroll: 하이라이트 전에 그 요소로 스크롤할지(포털은 세로로 길다)

  // 포털이 지금 문서인지 판별한다. 지도에는 #map이 있고 포털에는 없다.
  const isPortal = () => !document.getElementById('map')
                      && !!document.querySelector('.portal-hero, .portal-quick');

  // ── 포털용 ──
  // 왕두목 요청: "포털의 화면 구성 구석구석을 모두 설명해줬으면 좋겠다".
  // 위에서 아래로 화면 순서를 따라간다 — 히어로 → 시대 선택 → 자료실
  // 둘러보기 → 오늘의 특집 → 현황 → 추천 루트 → 빠른 접근 → 상단 메뉴.
  const PORTAL_STEPS = [
    {
      id: 'p_hello',
      title: '반갑습니다',
      body: '저는 진묘수입니다. 천오백 년 전 무령왕릉에서 왕의 잠을 지키던 수호수였지요.\n이제는 이곳에서 당신의 기록을 지킵니다. 이 첫 화면부터 함께 둘러볼까요?',
      target: null,
    },
    {
      id: 'p_cta',
      title: '지도로 들어가기',
      body: '망설여지신다면 여기부터 누르세요.\n1876년부터 오늘까지, 근현대의 지도가 바로 열립니다.',
      target: '#portalOpenMap',
      scroll: true,
    },
    {
      id: 'p_era',
      title: '시대를 골라 시작하기',
      body: '선사시대부터 현대까지 일곱 개의 지도가 있습니다.\n관심 가는 시대가 있다면 여기서 바로 건너뛰셔도 좋아요.',
      target: '.portal-era-grid',
      scroll: true,
    },
    {
      id: 'p_explore',
      title: '자료실 둘러보기',
      body: '지도가 사건이 일어난 자리라면, 자료실은 그 사건을 깊이 읽는 곳입니다.\n역사·세계사·인물열전·문학까지 200편이 넘는 글이 쌓여 있어요.',
      target: '.portal-explore',
      scroll: true,
    },
    {
      id: 'p_featured',
      title: '오늘의 특집',
      body: '날마다 다른 이야기를 골라 올려둡니다.\n무엇을 볼지 정하기 어려운 날엔 여기서 시작하셔도 좋습니다.',
      target: '.featured-card',
      scroll: true,
    },
    {
      id: 'p_stats',
      title: '아틀라스 현황',
      body: '지금까지 쌓인 사건과 글, 루트의 수입니다.\n이 숫자는 계속 늘어납니다 — 이곳은 완성되는 곳이 아니라 자라는 곳이니까요.',
      target: '.stats-card',
      scroll: true,
    },
    {
      id: 'p_routes',
      title: '추천 루트',
      body: '흩어진 사건을 하나의 여정으로 묶은 것이 루트입니다.\n이순신의 바닷길, 의열단의 발자취처럼 따라 걸으실 수 있어요.',
      target: '.portal-routes',
      scroll: true,
    },
    {
      id: 'p_quick',
      title: '빠른 접근',
      body: '지도 탐험, 자료실, 역사 시뮬레이션, 그리고 프로젝트.\n프로젝트에는 유튜브 갤러리와 앞으로 열릴 퀴즈·게임이 모여 있습니다.',
      target: '.portal-quick-grid',
      scroll: true,
    },
    {
      id: 'p_nav',
      title: '언제든 여기로',
      body: '화면 맨 위의 자료실과 ATLAS 소개는 어느 화면에서든 열 수 있습니다.\n안내를 다시 보고 싶으시면 ATLAS 소개 안에서 저를 불러주세요.',
      target: '.portal-nav-menu',
      scroll: true,
    },
    {
      id: 'p_library',
      title: '나의 서재',
      body: '읽으신 만큼 서재의 책이 채워집니다.\n일곱 권 모두 그 시대의 기록으로만 채워지니, 골고루 읽으실수록 서가가 온전해집니다.',
      target: '.atlas-namu-badge',
      when: () => has('.atlas-namu-badge'),
    },
    {
      id: 'p_end',
      title: '그럼, 시작하실까요',
      body: '천천히 둘러보세요. 서두를 것 없습니다.\n제가 여기서 기다리고 있겠습니다.',
      target: null,
    },
  ];

  // ── 지도용 ──
  const MAP_STEPS = [
    {
      id: 'm_hello',
      title: '지도에 오셨군요',
      body: '저는 진묘수입니다. 이 지도를 어떻게 읽는지 잠깐 알려드릴게요.',
      target: null,
    },
    {
      id: 'm_era',
      title: '일곱 개의 시대',
      body: '선사시대부터 현대까지, 시대마다 다른 지도가 있습니다.\n여기를 누르면 다른 시대로 건너갈 수 있어요.',
      target: '#eraBtn, [data-nav="map"]',
    },
    {
      id: 'm_slider',
      title: '연도를 움직여 보세요',
      body: '아래 막대를 좌우로 움직이면 그 해에 무슨 일이 있었는지 지도가 바뀝니다.',
      target: '#slider',
      when: () => has('#slider'),
    },
    {
      id: 'm_marker',
      title: '표식을 눌러 보세요',
      body: '지도 위의 작은 표식 하나하나가 그날의 사건입니다.\n누르면 무슨 일이 있었는지, 누가 있었는지 이야기가 열립니다.',
      target: '#map',
      when: () => has('#map'),
      noHole: true,
    },
    {
      id: 'm_search',
      title: '찾으시는 것이 있다면',
      body: '사람 이름이나 사건, 지명으로 바로 찾을 수 있습니다.',
      target: '#searchWidget, #searchToggleBtn',
      when: () => has('#searchWidget') || has('#searchToggleBtn'),
    },
    {
      id: 'm_archive',
      title: '자료실',
      body: '지도가 사건의 좌표라면, 자료실은 그 사건을 깊이 읽는 곳입니다.\n문학·인물·세계사까지 200편이 넘는 글이 있어요.',
      target: '[data-nav="archive"]',
      when: () => has('[data-nav="archive"]'),
    },
    {
      id: 'm_route',
      title: '루트 — 이야기를 따라 걷기',
      body: '흩어진 사건을 하나의 여정으로 묶은 것이 루트입니다.\n이순신의 바닷길, 의열단의 발자취처럼요.',
      target: '[data-nav="route"]',
      when: () => has('[data-nav="route"]'),
    },
    {
      id: 'm_library',
      title: '나의 서재',
      body: '읽으신 만큼 서재의 책이 채워집니다.\n일곱 권 모두 그 시대의 기록으로만 채워지니, 골고루 읽으실수록 서가가 온전해집니다.',
      target: '[data-nav="library"], .atlas-namu-badge',
    },
    {
      id: 'm_end',
      title: '그럼, 시작하실까요',
      body: '천천히 둘러보세요. 서두를 것 없습니다.\n제가 여기서 기다리고 있겠습니다.',
      target: null,
    },
  ];

  let steps = [];
  let idx = 0;
  let root = null;

  // ── DOM 만들기 ─────────────────────────────────────────────
  function build() {
    root = document.createElement('div');
    root.className = 'tut-root';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-label', '튜토리얼');
    root.innerHTML = `
      <div class="tut-scrim" id="tutScrim"></div>
      <div class="tut-hole" id="tutHole" hidden></div>
      <div class="tut-panel" id="tutPanel">
        <img class="tut-guide" id="tutGuide" src="${rootPrefix()}assets/images/jinmyosu.png"
             alt="진묘수" onerror="this.style.display='none'">
        <div class="tut-bubble">
          <div class="tut-title" id="tutTitle"></div>
          <p class="tut-body" id="tutBody"></p>
          <div class="tut-dots" id="tutDots"></div>
          <div class="tut-actions">
            <button type="button" class="tut-skip" id="tutSkip">건너뛰기</button>
            <div class="tut-nav">
              <button type="button" class="tut-btn tut-prev" id="tutPrev">이전</button>
              <button type="button" class="tut-btn tut-next" id="tutNext">다음</button>
            </div>
          </div>
        </div>
      </div>`;
    document.body.appendChild(root);

    document.getElementById('tutSkip').addEventListener('click', finish);
    document.getElementById('tutScrim').addEventListener('click', finish);
    document.getElementById('tutPrev').addEventListener('click', () => go(idx - 1));
    document.getElementById('tutNext').addEventListener('click', () => {
      if (idx >= steps.length - 1) finish(); else go(idx + 1);
    });
    document.addEventListener('keydown', onKey);
  }

  function onKey(e) {
    if (!root || !root.classList.contains('open')) return;
    if (e.key === 'Escape') finish();
    else if (e.key === 'ArrowRight') { if (idx < steps.length - 1) go(idx + 1); else finish(); }
    else if (e.key === 'ArrowLeft') go(idx - 1);
  }

  // ── 하이라이트 ─────────────────────────────────────────────
  // 화면을 덮은 어두운 층에 구멍을 뚫어 해당 요소만 밝게 보인다.
  function highlight(step) {
    const hole = document.getElementById('tutHole');
    if (!step.target || step.noHole) {
      hole.hidden = true;
      root.classList.remove('has-hole');
      return;
    }
    const el = document.querySelector(step.target);
    if (!el) { hole.hidden = true; root.classList.remove('has-hole'); return; }
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) {
      hole.hidden = true; root.classList.remove('has-hole'); return;
    }
    const pad = 8;
    hole.hidden = false;
    root.classList.add('has-hole');
    hole.style.left = (r.left - pad) + 'px';
    hole.style.top = (r.top - pad) + 'px';
    hole.style.width = (r.width + pad * 2) + 'px';
    hole.style.height = (r.height + pad * 2) + 'px';
  }

  // 말풍선 위치 — 하이라이트한 요소를 가리지 않게 위/아래로 피한다
  function placePanel(step) {
    const panel = document.getElementById('tutPanel');
    panel.classList.remove('at-top', 'at-bottom');
    if (!step.target || step.noHole) { panel.classList.add('at-bottom'); return; }
    const el = document.querySelector(step.target);
    if (!el) { panel.classList.add('at-bottom'); return; }
    const r = el.getBoundingClientRect();
    // 대상이 화면 위쪽에 있으면 말풍선을 아래로, 아래쪽이면 위로
    panel.classList.add(r.top < window.innerHeight / 2 ? 'at-bottom' : 'at-top');
  }

  // 포털은 세로로 길어서 설명할 요소가 화면 밖에 있는 경우가 많다.
  // 하이라이트 전에 그 요소를 화면 가운데로 가져온다. 스크롤이 끝난 뒤에
  // 위치를 재야 정확하므로, 이동 거리에 따라 대기 시간을 준다.
  function scrollToTarget(step, done) {
    if (!step.scroll || !step.target) { done(); return; }
    const el = document.querySelector(step.target);
    if (!el) { done(); return; }
    const r = el.getBoundingClientRect();
    const centered = r.top + r.height / 2;
    const delta = Math.abs(centered - window.innerHeight / 2);
    // 이미 화면 중앙 근처면 굳이 움직이지 않는다(불필요한 흔들림 방지)
    if (delta < window.innerHeight * 0.22) { done(); return; }
    // 튜토리얼 중에는 body에 overflow:hidden이 걸려 있으므로 잠시 푼다
    document.body.classList.remove('tut-lock');
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      document.body.classList.add('tut-lock');
      done();
    }, 420);
  }

  function go(n) {
    idx = Math.max(0, Math.min(steps.length - 1, n));
    const step = steps[idx];
    document.getElementById('tutTitle').textContent = step.title;
    document.getElementById('tutBody').textContent = step.body;
    document.getElementById('tutPrev').disabled = idx === 0;
    document.getElementById('tutNext').textContent =
      idx >= steps.length - 1 ? '시작하기' : '다음';
    document.getElementById('tutDots').innerHTML =
      steps.map((_, i) => `<i class="${i === idx ? 'on' : ''}"></i>`).join('');
    scrollToTarget(step, () => {
      highlight(step);
      placePanel(step);
    });
  }

  function open() {
    if (!root) build();
    const source = isPortal() ? PORTAL_STEPS : MAP_STEPS;
    steps = source.filter(s => !s.when || s.when());
    idx = 0;
    root.classList.add('open');
    document.body.classList.add('tut-lock');
    go(0);
  }

  function finish() {
    if (!root) return;
    root.classList.remove('open');
    document.body.classList.remove('tut-lock');
    try {
      const g = G();
      if (g) {
        const d = g.getData();
        d.tutorialSeen = true;
        // growth.js는 자체 저장 주기를 갖지만, 여기서는 즉시 남겨야
        // 새로고침해도 다시 뜨지 않는다.
        localStorage.setItem('atlas_growth_v1', JSON.stringify(d));
      }
    } catch (e) { /* 저장 실패해도 튜토리얼 자체는 닫힌다 */ }
  }

  // 창 크기가 바뀌면 하이라이트 위치를 다시 잡는다
  window.addEventListener('resize', () => {
    if (root && root.classList.contains('open')) go(idx);
  }, { passive: true });

  // ── 공개 API ───────────────────────────────────────────────
  window.openTutorial = open;
  window.closeTutorial = finish;

  // ── 자동 실행 ──────────────────────────────────────────────
  // 첫 방문자에게만. 이미 본 사람에게는 뜨지 않는다.
  function autoStart() {
    try {
      const g = G();
      if (!g) return;
      const d = g.getData();
      if (d.tutorialSeen) return;
      // 페이지가 자리를 잡은 뒤 띄운다(지도 렌더링과 겹치지 않게)
      setTimeout(open, 1200);
    } catch (e) { /* 조용히 넘어간다 */ }
  }

  // 「다시 보기」 버튼 연결 — 소개 페이지 안에 있다.
  // 튜토리얼을 열기 전에 소개 오버레이를 닫아야 가려지지 않는다.
  function bindReplay() {
    const btn = document.getElementById('introTutBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (typeof window.closeIntroPage === 'function') window.closeIntroPage();
      setTimeout(open, 260);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { bindReplay(); autoStart(); });
  } else {
    bindReplay(); autoStart();
  }
})();
