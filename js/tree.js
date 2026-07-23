// js/tree.js — 「나의 역사 나무」 SVG 렌더러
//
// 2026-07-22. growth.js가 모은 기록을 나무 그림으로 그린다.
//
// ── 왕두목 확정 설계 ─────────────────────────────────────────
//   키(줄기) = 총 체류 시간 → 성장 4단계 (씨앗/새싹/묘목/어린나무/큰나무)
//   가지 7개 = 시대별 체류 시간 → 굵기와 길이가 달라진다
//   잎       = 이벤트 카드 열람 수
//   꽃       = 자료실 글 + 루트
//   열매     = 배지 (3단계에서 연결)
//
// ── 새싹 7종 ─────────────────────────────────────────────────
// 첫 주에 가장 오래 머문 시대에 따라 새싹 모양이 다르다.
// "역사는 내가 관심 갖는 지점에서 시작된다"는 왕두목의 기획 의도를
// 형태로 옮긴 것이다. 알아차리기 어려운 디테일이지만, 나중에 발견하는
// 사람에게는 이 사이트를 아끼는 계기가 된다.
//
// 자라면서 공통 형태로 수렴한다 — 처음엔 달라도 결국 하나의 나무가 된다.
// 그래서 시대별 분기는 sprout 단계에만 있고, 그 이후로는 흔적(줄기 곡률,
// 잎 색조)만 남는다.
//
// ── 그림 방침 ────────────────────────────────────────────────
// 왕두목 요청: "귀엽게". 사실적 묘사 대신 둥글고 단순한 형태로 그린다.
// 외부 이미지 없이 SVG path로만 그려서 로딩이 가볍고 크기 조절이 자유롭다.

(function () {
  'use strict';

  // 시대별 색 — 각 지도의 성격에 맞춘 색조.
  // 새싹 색과 그 시대 가지의 잎 색으로 쓴다.
  const ERA_STYLE = {
    prehistory:   { leaf: '#7d9b6a', accent: '#a8b894', label: '선사' },
    ancient:      { leaf: '#6b9b7a', accent: '#8fc0a0', label: '고대' },
    medieval1:    { leaf: '#5f9490', accent: '#8ab8b4', label: '고려' },
    medieval2:    { leaf: '#6a8caa', accent: '#94b4cc', label: '조선' },
    modern:       { leaf: '#8a7fa8', accent: '#b0a6c8', label: '근대' },
    modern2:      { leaf: '#a87f8a', accent: '#c8a6b0', label: '근현대' },
    contemporary: { leaf: '#a89070', accent: '#c8b494', label: '현대' },
  };

  const TRUNK = '#8a6f52';
  const TRUNK_DARK = '#6d573f';
  const SOIL = '#9c8464';

  // 새싹 7종 — 시대별로 떡잎 모양이 다르다.
  // seed(씨앗) 상태에서는 시대가 아직 정해지지 않았으므로 흙 속의 씨앗만.
  function sproutPath(eraKey) {
    const s = ERA_STYLE[eraKey] || ERA_STYLE.ancient;
    switch (eraKey) {
      case 'prehistory':
        // 선사 — 두껍고 낮게 벌어진 떡잎 (원시적, 땅에 가까운)
        return `<path d="M100 150 Q100 128 100 118" stroke="${TRUNK}" stroke-width="5" fill="none" stroke-linecap="round"/>
          <ellipse cx="82" cy="122" rx="17" ry="10" fill="${s.leaf}" transform="rotate(-18 82 122)"/>
          <ellipse cx="118" cy="122" rx="17" ry="10" fill="${s.accent}" transform="rotate(18 118 122)"/>`;
      case 'ancient':
        // 고대 — 위로 곧게 뻗은 뾰족한 떡잎 (삼국의 상승)
        return `<path d="M100 150 Q100 125 100 110" stroke="${TRUNK}" stroke-width="5" fill="none" stroke-linecap="round"/>
          <path d="M100 116 Q78 104 72 84 Q92 88 100 112 Z" fill="${s.leaf}"/>
          <path d="M100 116 Q122 104 128 84 Q108 88 100 112 Z" fill="${s.accent}"/>`;
      case 'medieval1':
        // 고려 — 부드럽게 말린 떡잎 (청자의 곡선)
        return `<path d="M100 150 Q98 126 100 112" stroke="${TRUNK}" stroke-width="5" fill="none" stroke-linecap="round"/>
          <path d="M100 118 Q74 116 76 94 Q96 100 100 116 Z" fill="${s.leaf}"/>
          <path d="M100 118 Q126 116 124 94 Q104 100 100 116 Z" fill="${s.accent}"/>`;
      case 'medieval2':
        // 조선 — 좌우 대칭의 단정한 떡잎 (유교적 질서)
        return `<path d="M100 150 L100 112" stroke="${TRUNK}" stroke-width="5" fill="none" stroke-linecap="round"/>
          <ellipse cx="84" cy="112" rx="16" ry="11" fill="${s.leaf}"/>
          <ellipse cx="116" cy="112" rx="16" ry="11" fill="${s.accent}"/>`;
      case 'modern':
        // 근대 — 한쪽이 꺾인 떡잎 (수난의 시대)
        return `<path d="M100 150 Q103 128 99 112" stroke="${TRUNK}" stroke-width="5" fill="none" stroke-linecap="round"/>
          <path d="M99 118 Q76 110 70 92 Q92 94 99 114 Z" fill="${s.leaf}"/>
          <path d="M99 118 Q120 114 126 100 Q108 100 99 116 Z" fill="${s.accent}"/>`;
      case 'modern2':
        // 근현대 — 둘로 갈라진 떡잎 (분단)
        return `<path d="M100 150 L100 116" stroke="${TRUNK}" stroke-width="5" fill="none" stroke-linecap="round"/>
          <path d="M100 120 Q80 112 74 92 Q94 96 99 118 Z" fill="${s.leaf}"/>
          <path d="M101 120 Q122 112 128 92 Q108 96 102 118 Z" fill="${s.accent}"/>
          <path d="M100 120 L100 100" stroke="#f4efe6" stroke-width="2.5" stroke-linecap="round"/>`;
      case 'contemporary':
        // 현대 — 넓게 펼쳐진 떡잎 (열린 시대)
        return `<path d="M100 150 Q100 128 100 114" stroke="${TRUNK}" stroke-width="5" fill="none" stroke-linecap="round"/>
          <ellipse cx="78" cy="116" rx="20" ry="9" fill="${s.leaf}" transform="rotate(-12 78 116)"/>
          <ellipse cx="122" cy="116" rx="20" ry="9" fill="${s.accent}" transform="rotate(12 122 116)"/>
          <circle cx="100" cy="108" r="4" fill="${s.accent}"/>`;
      default:
        return `<path d="M100 150 L100 116" stroke="${TRUNK}" stroke-width="5" fill="none" stroke-linecap="round"/>
          <ellipse cx="86" cy="118" rx="15" ry="10" fill="${s.leaf}"/>
          <ellipse cx="114" cy="118" rx="15" ry="10" fill="${s.accent}"/>`;
    }
  }

  // 씨앗 — 아직 시대가 정해지지 않은 상태
  function seedShape() {
    return `<ellipse cx="100" cy="146" rx="9" ry="12" fill="#8a6f52"/>
      <path d="M100 138 Q104 132 102 128" stroke="#7d9b6a" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  }

  // 땅
  function ground() {
    return `<ellipse cx="100" cy="152" rx="62" ry="9" fill="${SOIL}" opacity="0.35"/>`;
  }

  // 가지 7개 배치 — 좌우 번갈아, 아래에서 위로.
  // ratio(그 시대 체류 시간의 상대값)에 따라 길이와 굵기가 달라진다.
  // 방문하지 않은 시대는 가지가 나지 않는다 → 나무가 한쪽으로 기운다.
  function branches(branchData, scale, stageKey) {
    if (stageKey === 'seed' || stageKey === 'sprout') return '';
    const maxLen = stageKey === 'sapling' ? 26 : (stageKey === 'young' ? 40 : 52);
    let out = '';
    branchData.forEach((b, i) => {
      if (!b.visited) return;
      const side = i % 2 === 0 ? -1 : 1;
      // 아래에서 위로 순서대로 배치
      const t = i / (branchData.length - 1 || 1);
      const y = 126 - t * (stageKey === 'sapling' ? 34 : (stageKey === 'young' ? 56 : 74));
      const len = 10 + b.ratio * maxLen;
      const w = 2 + b.ratio * (stageKey === 'grown' ? 4.5 : 3);
      const x2 = 100 + side * len;
      const y2 = y - len * 0.42;
      const st = ERA_STYLE[b.key] || ERA_STYLE.ancient;
      out += `<path d="M100 ${y.toFixed(1)} Q${(100 + side * len * 0.55).toFixed(1)} ${(y - len * 0.14).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}"
        stroke="${TRUNK}" stroke-width="${w.toFixed(1)}" fill="none" stroke-linecap="round"/>`;
      // 가지 끝의 잎 뭉치 — 그 시대 색
      const r = 6 + b.ratio * (stageKey === 'grown' ? 12 : 8);
      out += `<circle cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" r="${r.toFixed(1)}" fill="${st.leaf}" opacity="0.9"/>`;
      out += `<circle cx="${(x2 + side * r * 0.4).toFixed(1)}" cy="${(y2 - r * 0.35).toFixed(1)}" r="${(r * 0.62).toFixed(1)}" fill="${st.accent}" opacity="0.85"/>`;
    });
    return out;
  }

  // 줄기 — 단계에 따라 높이와 굵기가 달라진다
  function trunk(stageKey) {
    switch (stageKey) {
      case 'sapling':
        return `<path d="M100 152 Q97 130 99 96" stroke="${TRUNK}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
      case 'young':
        return `<path d="M100 152 Q96 124 99 72" stroke="${TRUNK}" stroke-width="10" fill="none" stroke-linecap="round"/>
          <path d="M100 152 Q97 130 99 100" stroke="${TRUNK_DARK}" stroke-width="3" fill="none" opacity="0.35" stroke-linecap="round"/>`;
      case 'grown':
        return `<path d="M100 152 Q94 118 99 52" stroke="${TRUNK}" stroke-width="14" fill="none" stroke-linecap="round"/>
          <path d="M100 152 Q96 124 99 86" stroke="${TRUNK_DARK}" stroke-width="4" fill="none" opacity="0.35" stroke-linecap="round"/>`;
      default:
        return '';
    }
  }

  // 수관(잎 무리) — 잎 개수(카드 열람 수)에 따라 풍성해진다
  function canopy(stageKey, leaves, seedEra) {
    if (stageKey === 'seed' || stageKey === 'sprout') return '';
    const st = ERA_STYLE[seedEra] || ERA_STYLE.ancient;
    const density = Math.min(1, leaves / 300);
    if (stageKey === 'sapling') {
      const r = 16 + density * 8;
      return `<circle cx="99" cy="92" r="${r.toFixed(1)}" fill="${st.leaf}" opacity="0.55"/>`;
    }
    if (stageKey === 'young') {
      const r = 26 + density * 12;
      return `<circle cx="99" cy="66" r="${r.toFixed(1)}" fill="${st.leaf}" opacity="0.5"/>
        <circle cx="86" cy="74" r="${(r * 0.6).toFixed(1)}" fill="${st.accent}" opacity="0.45"/>
        <circle cx="113" cy="74" r="${(r * 0.6).toFixed(1)}" fill="${st.accent}" opacity="0.45"/>`;
    }
    const r = 34 + density * 16;
    return `<circle cx="99" cy="44" r="${r.toFixed(1)}" fill="${st.leaf}" opacity="0.45"/>
      <circle cx="78" cy="58" r="${(r * 0.66).toFixed(1)}" fill="${st.accent}" opacity="0.4"/>
      <circle cx="121" cy="58" r="${(r * 0.66).toFixed(1)}" fill="${st.accent}" opacity="0.4"/>
      <circle cx="99" cy="30" r="${(r * 0.55).toFixed(1)}" fill="${st.accent}" opacity="0.35"/>`;
  }

  // 꽃 — 자료실 글 + 루트. 수관 위에 흩뿌린다.
  function flowers(count, stageKey) {
    if (stageKey === 'seed' || stageKey === 'sprout') return '';
    const n = Math.min(14, Math.floor(count / 3));
    if (n <= 0) return '';
    const baseY = stageKey === 'sapling' ? 92 : (stageKey === 'young' ? 66 : 44);
    const spread = stageKey === 'sapling' ? 18 : (stageKey === 'young' ? 30 : 44);
    let out = '';
    for (let i = 0; i < n; i++) {
      // 고정 시드 배치 — 새로고침해도 같은 자리에 피게 한다
      const a = (i * 137.5) * Math.PI / 180;
      const rr = spread * Math.sqrt((i + 1) / n);
      const x = 99 + Math.cos(a) * rr;
      const y = baseY + Math.sin(a) * rr * 0.7;
      out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="#f6e7c8"/>
        <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.1" fill="#e8b96a"/>`;
    }
    return out;
  }

  // 열매 — 배지. 3단계에서 배지가 생기면 자동으로 달린다.
  function fruits(count, stageKey) {
    if (stageKey === 'seed' || stageKey === 'sprout' || count <= 0) return '';
    const n = Math.min(10, count);
    const baseY = stageKey === 'sapling' ? 96 : (stageKey === 'young' ? 72 : 50);
    const spread = stageKey === 'sapling' ? 16 : (stageKey === 'young' ? 28 : 40);
    let out = '';
    for (let i = 0; i < n; i++) {
      const a = (i * 99 + 40) * Math.PI / 180;
      const rr = spread * Math.sqrt((i + 1) / n);
      const x = 99 + Math.cos(a) * rr;
      const y = baseY + Math.abs(Math.sin(a)) * rr * 0.6;
      out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="#c2603f"/>
        <circle cx="${(x - 1.2).toFixed(1)}" cy="${(y - 1.4).toFixed(1)}" r="1.3" fill="#e0906f" opacity="0.8"/>`;
    }
    return out;
  }

  // 전체 렌더 — summary()의 결과를 받아 SVG 문자열을 만든다
  function render(sum, opts) {
    opts = opts || {};
    const stageKey = sum.stage.key;
    // 씨앗 시대가 아직 정해지지 않았으면 중립 색으로 그린다
    const era = sum.seedEra || null;

    let body = ground();

    if (stageKey === 'seed') {
      body += seedShape();
    } else if (stageKey === 'sprout') {
      body += era ? sproutPath(era) : sproutPath('ancient');
    } else {
      body += trunk(stageKey);
      body += branches(sum.branches, 1, stageKey);
      body += canopy(stageKey, sum.leaves, era);
      body += flowers(sum.flowers, stageKey);
      body += fruits(sum.fruits, stageKey);
    }

    return `<svg viewBox="0 0 200 165" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="${stageKey} 단계의 나의 역사 나무" class="atlas-tree-svg">${body}</svg>`;
  }

  window.AtlasTree = {
    render: render,
    ERA_STYLE: ERA_STYLE,
  };
})();
