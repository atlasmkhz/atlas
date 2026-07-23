// js/seoga.js — 「나의 서재」 페이지 컨트롤러
//
// 2026-07-24. growth.js(기록)와 library.js(그림)를 받아 namu.html을 채운다.
// 기존 namu.js(나무 버전)를 대체한다.
//
// 핵심 원칙: 퍼센트를 절대 표시하지 않는다.
// 왕두목 확정 — "97%를 보여주면 사람은 나머지 3%를 찾아 헤매고,
// 탐험이 숙제가 된다." 잉크 높이와 문장으로만 상태를 전한다.

(function () {
  'use strict';

  const G = window.AtlasGrowth;
  const L = window.AtlasLibrary;
  if (!G || !L) return;

  function fmtDuration(seconds) {
    const s = Math.max(0, Math.floor(seconds));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    if (h > 0) return m > 0 ? `${h}시간 ${m}분` : `${h}시간`;
    if (m > 0) return `${m}분`;
    return '1분 미만';
  }

  function fmtDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // 진묘수 한마디 — 서재의 상태에 따라. 정보 전달 + 가벼운 온기 정도로
  // 잡는다(관계 시뮬레이션이 되지 않도록 절제한다).
  function guideLine(lib) {
    const n = lib.openedCount;
    if (n === 0) return '아직 펼친 책이 없습니다. 지도를 둘러보시면 첫 책이 열립니다.';
    if (n === 1) return '첫 책이 열렸습니다. 다른 시대의 책도 기다리고 있어요.';
    if (n === lib.books.length) return '일곱 권이 모두 서가에 꽂혔습니다. 이제 각 책을 더 깊이 읽을 차례입니다.';
    return `${n}권의 책이 펼쳐졌습니다. 비어 있는 자리가 ${lib.books.length - n}칸 남았어요.`;
  }

  function render() {
    const lib = G.library();
    const pages = G.myHistory();

    // 서가
    document.getElementById('shelfBox').innerHTML =
      L.render(lib, { myPages: pages.length });

    document.getElementById('guideLine').textContent = guideLine(lib);

    // 오늘의 변화 — 있을 때만 표시한다
    const changes = G.changes();
    const cbox = document.getElementById('changesBox');
    if (changes.length) {
      document.getElementById('changesList').innerHTML =
        changes.map(c => `<li>${esc(c)}</li>`).join('');
      cbox.hidden = false;
    } else {
      cbox.hidden = true;
    }

    // 시대별 책 목록 — 퍼센트 대신 잉크 막대와 문장
    const ORN = ['', '금선', '문양', '금박'];
    document.getElementById('bookList').innerHTML = lib.books.map(b => {
      const c = L.BOOK[b.key] || {};
      const w = Math.round(b.ink * 100);              // 표시용 막대 폭(숫자는 노출 안 함)
      const op = (0.5 + b.depth * 0.5).toFixed(2);
      const tags = [];
      if (b.ornament) tags.push(ORN[b.ornament]);
      if (b.patina > 0.25) tags.push('손때');
      return `<li class="lib-book${b.opened ? '' : ' is-closed'}">
        <span class="lib-book-dot" style="background:${c.base || '#666'}"></span>
        <span class="lib-book-name">${esc(b.name)}</span>
        <span class="lib-book-bar" aria-hidden="true">
          <i style="width:${w}%;background:${c.ink || '#444'};opacity:${op}"></i>
        </span>
        <span class="lib-book-meta">${tags.length ? esc(tags.join(' · ')) : ''}</span>
        <span class="lib-book-line">${esc(b.line)}</span>
      </li>`;
    }).join('');

    // 나의 한국사
    const ml = document.getElementById('myHistoryList');
    ml.innerHTML = pages.map(p => `<li class="lib-page">
      ${p.date ? `<span class="lib-page-date">${esc(p.date)}</span>` : ''}
      <span class="lib-page-text">${esc(p.text)}</span>
    </li>`).join('');

    // 스크랩
    const data = G.getData();
    const scraps = (data.scraps || []).slice().reverse();
    document.getElementById('scrapCount').textContent = scraps.length ? `(${scraps.length})` : '';
    const list = document.getElementById('scrapList');
    const empty = document.getElementById('scrapEmpty');
    if (!scraps.length) {
      list.innerHTML = '';
      empty.hidden = false;
    } else {
      empty.hidden = true;
      const KIND = { card: '사건 카드', archive: '자료실', route: '루트', page: '페이지' };
      list.innerHTML = scraps.map(s => `<li class="namu-scrap">
        <a href="${esc(s.url)}" class="namu-scrap-link">
          <span class="namu-scrap-kind">${esc(KIND[s.kind] || '페이지')}</span>
          <span class="namu-scrap-title">${esc(s.title)}</span>
        </a>
        <button type="button" class="namu-scrap-del" data-url="${esc(s.url)}" aria-label="스크랩 삭제">×</button>
      </li>`).join('');
    }

    const fv = document.getElementById('firstVisitLine');
    fv.textContent = data.firstVisit
      ? `처음 오신 날: ${fmtDate(data.firstVisit)} · 함께한 시간 ${fmtDuration(lib.totalSeconds)}`
      : '';
  }

  document.addEventListener('click', function (e) {
    const del = e.target.closest('.namu-scrap-del');
    if (del) {
      G.removeScrap(del.dataset.url);
      render();
    }
  });

  document.getElementById('exportBtn').addEventListener('click', function () {
    const blob = new Blob([JSON.stringify(G.getData(), null, 2)],
      { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const d = new Date();
    a.download = `atlas-seoga-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  });

  // 병합 규칙은 growth.js의 merge()를 그대로 쓴다. 나중에 계정으로
  // 옮길 때도 같은 함수를 쓰므로, 여기서 미리 검증되는 셈이다.
  document.getElementById('importFile').addEventListener('change', function (e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function () {
      try {
        const incoming = JSON.parse(reader.result);
        const merged = G.merge(G.getData(), incoming);
        localStorage.setItem('atlas_growth_v1', JSON.stringify(merged));
        location.reload();
      } catch (err) {
        alert('파일을 읽지 못했습니다. ATLAS에서 내보낸 파일이 맞는지 확인해 주세요.');
      }
    };
    reader.readAsText(file);
  });

  document.getElementById('resetBtn').addEventListener('click', function () {
    if (!confirm('서재와 스크랩이 모두 사라집니다. 정말 처음부터 다시 시작할까요?')) return;
    G._reset();
    location.reload();
  });

  render();
  // 「오늘의 변화」를 본 시점을 기록한다 — 다음 방문 때 비교 기준.
  // render() 뒤에 호출해야 이번 변화가 화면에 보인 뒤 스냅샷이 갱신된다.
  setTimeout(() => { try { G.markSeen(); } catch (e) {} }, 1500);

  // 페이지를 열어둔 채로도 시간이 쌓이므로 주기적으로 갱신
  setInterval(render, 30000);
})();
