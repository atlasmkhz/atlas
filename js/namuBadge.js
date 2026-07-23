// js/namuBadge.js — 모든 페이지 우하단에 뜨는 「나의 서재」 진입 버튼
//
// 2026-07-22. 나무 시스템이 있다는 걸 알리는 유일한 장치다(1단계 기준).
// 본격 튜토리얼은 4단계에서 진묘수가 맡고, 지금은 이 버튼 하나로
// "무언가 자라고 있다"는 신호만 준다.
//
// 버튼 안의 아이콘은 현재 성장 단계에 따라 바뀐다 — 씨앗이면 씨앗,
// 큰나무면 큰나무. 지도를 보다가 문득 우하단을 봤을 때 아이콘이
// 달라져 있으면 그것 자체가 재방문 동기가 된다.

(function () {
  'use strict';

  // namu.html 자기 자신에는 띄우지 않는다
  if (/\/namu\.html$/.test(location.pathname)) return;

  // 서재 아이콘 — 펼친 책 권수에 따라 채워진다.
  // 지도를 보다 문득 우하단을 봤을 때 아이콘이 달라져 있으면
  // 그것 자체가 재방문 동기가 된다.
  function iconFor(openedCount) {
    const n = Math.max(0, Math.min(7, openedCount || 0));
    // 책등 5개를 그리되, 펼친 권수에 비례해 채운다
    let out = '<rect x="3" y="18.5" width="18" height="2.2" rx="1" fill="#5b4634"/>';
    const total = 5;
    const filled = Math.round((n / 7) * total);
    for (let i = 0; i < total; i++) {
      const x = 4 + i * 3.4;
      const h = 9 + ((i * 5) % 4);
      const y = 18.5 - h;
      if (i < filled) {
        out += `<rect x="${x}" y="${y}" width="2.6" height="${h}" rx=".7" fill="#b89860"/>`;
      } else {
        out += `<rect x="${x}" y="${y}" width="2.6" height="${h}" rx=".7"
          fill="none" stroke="rgba(255,255,255,.28)" stroke-width=".8"/>`;
      }
    }
    return out;
  }

  function mount() {
    const G = window.AtlasGrowth;
    if (!G) return;
    if (document.querySelector('.atlas-namu-badge')) return;

    let opened = 0;
    try { opened = G.library().openedCount; } catch (e) { /* 기본값 유지 */ }

    // 경로 깊이에 따라 namu.html까지의 상대 경로를 계산한다.
    // maps/{era}/ 아래면 ../../, 사이트 루트면 ./
    const depth = (location.pathname.match(/\//g) || []).length - 1;
    const inSub = /\/(maps|archive|route|event|world-routes)\//.test(location.pathname);
    let prefix = '';
    if (inSub) {
      const seg = location.pathname.split('/').filter(Boolean);
      const idx = seg.findIndex(s => ['maps', 'archive', 'route', 'event', 'world-routes'].includes(s));
      const up = seg.length - idx - 1;
      prefix = '../'.repeat(Math.max(1, up));
    }

    const a = document.createElement('a');
    a.className = 'atlas-namu-badge';
    a.href = prefix + 'namu.html';
    a.title = '나의 서재';
    a.setAttribute('aria-label', '나의 서재 보기');
    a.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${iconFor(opened)}</svg>`;
    document.body.appendChild(a);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
