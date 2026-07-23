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

    // namu.html까지의 경로.
    // 이 배지는 포털·지도·자료실·루트·이벤트 페이지 등 깊이가 제각각인
    // 곳에 모두 붙으므로, 현재 경로에서 사이트 루트까지 몇 단계 올라가야
    // 하는지 계산한다. 알려진 하위 폴더(maps/archive/route/event/…)를
    // 기준으로 삼고, 그 밖이면 파일이 있는 깊이만큼 올라간다.
    const seg = location.pathname.split('/').filter(Boolean);
    // 마지막 조각이 파일명이면 제외하고 폴더 깊이만 센다.
    // (디렉터리 URL로 접근하는 경우 — 예: /route/donghak/ — 도 처리된다)
    const dirs = (seg.length && seg[seg.length - 1].indexOf('.') !== -1)
      ? seg.slice(0, -1) : seg.slice();
    const prefix = dirs.length ? '../'.repeat(dirs.length) : '';

    const a = document.createElement('a');
    a.className = 'atlas-namu-badge';
    // 지도 페이지 여부를 직접 판별해 클래스를 붙인다.
    // CSS :has()에만 의존하면 구형 브라우저에서 위치 보정이 안 먹는다.
    // 지도에는 하단 전체를 덮는 타임라인이 있어 버튼이 가려지므로 위로 올린다.
    if (document.getElementById('map')) a.classList.add('on-map');
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
