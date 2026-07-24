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
  // target: 하이라이트할 요소(없으면 화면 중앙에 말풍선만)
  // when:   이 단계를 보여줄 조건. 없으면 항상 표시
  const STEPS = [
    {
      id: 'hello',
      title: '반갑습니다',
      body: '저는 진묘수입니다. 천오백 년 전 무령왕릉에서 왕의 잠을 지키던 수호수였지요.\n이제는 이곳에서 당신의 기록을 지킵니다. 잠깐 둘러보실까요?',
      target: null,
    },
    {
      id: 'era',
      title: '일곱 개의 시대',
      body: '선사시대부터 현대까지, 시대마다 다른 지도가 있습니다.\n여기를 누르면 다른 시대로 건너갈 수 있어요.',
      target: '#eraBtn, [data-nav="map"]',
    },
    {
      id: 'slider',
      title: '연도를 움직여 보세요',
      body: '아래 막대를 좌우로 움직이면 그 해에 무슨 일이 있었는지 지도가 바뀝니다.',
      target: '#slider',
      when: () => has('#slider'),
    },
    {
      id: 'marker',
      title: '표식을 눌러 보세요',
      body: '지도 위의 작은 표식 하나하나가 그날의 사건입니다.\n누르면 무슨 일이 있었는지, 누가 있었는지 이야기가 열립니다.',
      target: '#map',
      when: () => has('#map'),
      // 지도 전체를 하이라이트하면 의미가 없으므로 말풍선만 띄운다
      noHole: true,
    },
    {
      id: 'archive',
      title: '자료실',
      body: '지도가 사건의 좌표라면, 자료실은 그 사건을 깊이 읽는 곳입니다.\n문학·인물·세계사까지 200편이 넘는 글이 있어요.',
      target: '[data-nav="archive"], #portalQuickArchive',
    },
    {
      id: 'route',
      title: '루트 — 이야기를 따라 걷기',
      body: '흩어진 사건을 하나의 여정으로 묶은 것이 루트입니다.\n이순신의 바닷길, 의열단의 발자취처럼요.',
      target: '[data-nav="route"]',
      when: () => has('[data-nav="route"]'),
    },
    {
      id: 'library',
      title: '나의 서재',
      body: '읽으신 만큼 서재의 책이 채워집니다.\n일곱 권 모두 그 시대의 기록으로만 채워지니, 골고루 읽으실수록 서가가 온전해집니다.',
      target: '[data-nav="library"], .atlas-namu-badge',
    },
    {
      id: 'end',
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
    highlight(step);
    placePanel(step);
  }

  function open() {
    if (!root) build();
    steps = STEPS.filter(s => !s.when || s.when());
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
