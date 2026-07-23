// js/namuBadge.js — 모든 페이지 우하단에 뜨는 「나의 나무」 진입 버튼
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

  function iconFor(stageKey) {
    // 단계별 초소형 아이콘. tree.js의 축약판이라 별도로 그린다
    // (tree.js는 200x165 캔버스 기준이라 44px 버튼에 그대로 쓰기엔 크다).
    switch (stageKey) {
      case 'grown':
        return `<path d="M12 21V12" stroke="#8a6f52" stroke-width="2.2" stroke-linecap="round"/>
          <circle cx="12" cy="8" r="6" fill="#6b9b7a"/>
          <circle cx="7.5" cy="10.5" r="3.4" fill="#8fc0a0"/>
          <circle cx="16.5" cy="10.5" r="3.4" fill="#8fc0a0"/>`;
      case 'young':
        return `<path d="M12 21V13" stroke="#8a6f52" stroke-width="2" stroke-linecap="round"/>
          <circle cx="12" cy="9" r="5" fill="#6b9b7a"/>
          <circle cx="8.5" cy="11.5" r="2.6" fill="#8fc0a0"/>`;
      case 'sapling':
        return `<path d="M12 21V11" stroke="#8a6f52" stroke-width="1.8" stroke-linecap="round"/>
          <circle cx="12" cy="8" r="4.2" fill="#6b9b7a"/>`;
      case 'sprout':
        return `<path d="M12 21v-7" stroke="#8a6f52" stroke-width="1.8" stroke-linecap="round"/>
          <ellipse cx="8.4" cy="13" rx="3.6" ry="2.3" fill="#7d9b6a" transform="rotate(-18 8.4 13)"/>
          <ellipse cx="15.6" cy="13" rx="3.6" ry="2.3" fill="#a8b894" transform="rotate(18 15.6 13)"/>`;
      default: // seed
        return `<ellipse cx="12" cy="16" rx="3.6" ry="4.8" fill="#8a6f52"/>
          <path d="M12 12.5q1.6-2 1-3.6" stroke="#7d9b6a" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
    }
  }

  function mount() {
    const G = window.AtlasGrowth;
    if (!G) return;
    if (document.querySelector('.atlas-namu-badge')) return;

    let stageKey = 'seed';
    try { stageKey = G.summary().stage.key; } catch (e) { /* 기본값 유지 */ }

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
    a.title = '나의 역사 나무';
    a.setAttribute('aria-label', '나의 역사 나무 보기');
    a.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${iconFor(stageKey)}</svg>`;
    document.body.appendChild(a);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
