// js/library.js — 「내 서재」 SVG 렌더러
//
// 2026-07-24 최초 작성 / 같은 날 시각 개선.
// growth.js의 library()가 계산한 값을 받아 서가와 책을 그린다.
//
// ── 왜 나무에서 서재로 바뀌었나 ──────────────────────────────
// 나무는 이미지 제작에서 막혔다. "같은 나무가 5단계로 자라는" 연속성을
// AI 이미지 생성이 못 맞췄고, 가지 7개를 그림에 고정하면 방문한 시대
// 수를 표현할 수 없다는 설계상 한계도 있었다.
//
// 서재는 그 두 문제를 동시에 푼다. 책은 직사각형이라 SVG로 그려도
// 어색하지 않고, 채워지는 양은 사각형 안을 아래에서 위로 칠하면 된다.
// 무엇보다 「고양이서가」를 하는 사람이 만든 역사 프로젝트에서
// 사용자가 자기 서재를 채운다는 설정이 브랜드와 그대로 이어진다.
//
// ── 표현 규칙 (왕두목 확정) ──────────────────────────────────
//   잉크 높이 = 그 시대를 얼마나 읽었나. 숫자는 절대 보여주지 않는다.
//   잉크 농도 = 계속 깊어진다. 상한이 없어 "다 채웠다"가 존재하지 않는다.
//   책등 장식 = 자료실·루트·배지 누적 → 금선 → 문양 → 금박 제목
//   손때     = 그 시대를 처음 연 날로부터의 경과. 시간이 지나야만 얻는다.
//
// ── 시각 처리 방침 ───────────────────────────────────────────
// 외부 이미지 없이 SVG만으로 최대한 질감을 낸다. AI 이미지 생성에
// 의존하지 않으므로 실패 위험이 없고, 사용자 데이터에 따라 자유롭게
// 변형된다. 구체적으로는 다음을 쓴다.
//   - linearGradient: 책등의 원통형 음영(가운데 밝고 양끝 어두움)
//   - feTurbulence: 종이·가죽의 미세한 결
//   - 상단 조명 그라데이션: 위에서 빛이 내려오는 느낌
//   - 책마다 미세한 기울기와 높이 차이: 실제 서가의 불규칙함
// 모든 난수는 인덱스 기반 결정적 값이라 새로고침해도 같은 모습이다.

(function () {
  'use strict';

  // SVG의 id는 문서 전체에서 유일해야 한다. 한 페이지에 서가가 둘 이상
  // 그려지면(미리보기, 나중에 비교 화면 등) 뒤에 그려진 것이 앞의 정의를
  // 덮어써서 그라데이션·클립이 어긋난다. 렌더할 때마다 접두사를 새로 만들어
  // 모든 내부 id에 붙인다.
  let uidSeq = 0;
  let UID = 'lib0';

  // 시대별 책 색 — 각 시대의 성격에 맞춘 색조.
  // base는 책등 바탕, ink는 차오르는 잉크, edge는 책등 모서리 하이라이트.
  const BOOK = {
    prehistory:   { base: '#6f7f60', ink: '#3a4a32', edge: '#8b9a7c', label: '선사' },
    ancient:      { base: '#5f8a6d', ink: '#2e4a37', edge: '#7fa88c', label: '고대' },
    medieval1:    { base: '#4f8480', ink: '#264a47', edge: '#6fa5a0', label: '고려' },
    medieval2:    { base: '#5a7a99', ink: '#2b4058', edge: '#7d9bb8', label: '조선' },
    modern:       { base: '#7a6f96', ink: '#413a57', edge: '#9a8fb5', label: '근대' },
    modern2:      { base: '#96707a', ink: '#563b42', edge: '#b58f98', label: '근현대' },
    contemporary: { base: '#9a8560', ink: '#584a31', edge: '#b8a47e', label: '현대' },
  };

  const GOLD = '#d4b978';
  const GOLD_DIM = '#a68a4e';

  // 레이아웃 상수 — 한곳에서 관리해야 배경 이미지를 얹을 때 좌표를 맞추기 쉽다
  const LAY = {
    padX: 20,
    bookW: 36,
    gap: 5,
    baseY: 196,        // 서가 바닥(책이 서 있는 선)
    shelfTopY: 40,     // 위 선반
    topH: 8,
  };

  // 결정적 유사난수 — 인덱스로만 만들어 새로고침해도 같은 모습
  function jitter(i, span, seed) {
    const v = Math.sin((i + 1) * (seed || 12.9898)) * 43758.5453;
    return ((v - Math.floor(v)) - 0.5) * 2 * span;
  }

  // ── defs: 그라데이션·필터 정의 ──────────────────────────────
  function defs(books) {
    let d = '';

    // 종이/가죽 결 — 아주 옅은 노이즈. 과하면 지저분해지므로 최소로.
    d += `<filter id="${UID}-grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="7" result="n"/>
      <feColorMatrix in="n" type="saturate" values="0" result="g"/>
      <feComponentTransfer in="g" result="a">
        <feFuncA type="linear" slope="0.13"/>
      </feComponentTransfer>
      <feComposite in="a" in2="SourceGraphic" operator="in"/>
    </filter>`;

    // 위에서 내려오는 조명 — 서가 전체에 은은하게
    d += `<linearGradient id="${UID}-roomLight" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fff" stop-opacity=".085"/>
      <stop offset="45%" stop-color="#fff" stop-opacity=".02"/>
      <stop offset="100%" stop-color="#000" stop-opacity=".10"/>
    </linearGradient>`;

    // 나무 선반 결
    d += `<linearGradient id="${UID}-shelfWood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#7a6048"/>
      <stop offset="30%" stop-color="#5f4a37"/>
      <stop offset="100%" stop-color="#3d2f23"/>
    </linearGradient>`;

    // 선반 아래 그림자
    d += `<linearGradient id="${UID}-shelfShadow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000" stop-opacity=".42"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </linearGradient>`;

    // 책마다 원통형 음영 — 책등은 둥글게 말려 있어 가운데가 밝다
    books.forEach((b) => {
      const c = BOOK[b.key] || BOOK.ancient;
      d += `<linearGradient id="${UID}-spine-${b.key}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stop-color="#000" stop-opacity=".34"/>
        <stop offset="14%"  stop-color="#000" stop-opacity=".10"/>
        <stop offset="38%"  stop-color="${c.edge}" stop-opacity=".22"/>
        <stop offset="62%"  stop-color="#fff" stop-opacity=".07"/>
        <stop offset="86%"  stop-color="#000" stop-opacity=".14"/>
        <stop offset="100%" stop-color="#000" stop-opacity=".40"/>
      </linearGradient>`;
      // 잉크 — 아래로 갈수록 진해지는 액체 느낌
      d += `<linearGradient id="${UID}-ink-${b.key}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="${c.ink}" stop-opacity=".72"/>
        <stop offset="18%"  stop-color="${c.ink}" stop-opacity=".92"/>
        <stop offset="100%" stop-color="${c.ink}" stop-opacity="1"/>
      </linearGradient>`;
    });

    return `<defs>${d}</defs>`;
  }

  // ── 책 한 권 ────────────────────────────────────────────────
  function book(b, i) {
    const W = LAY.bookW;
    const x = LAY.padX + i * (W + LAY.gap);
    // 높이·기울기를 미세하게 흔들어 실제 서가처럼 보이게 한다
    const H = 124 + jitter(i, 11, 12.9898);
    const tilt = jitter(i, 1.1, 78.233);
    const baseY = LAY.baseY;
    const top = baseY - H;
    const c = BOOK[b.key] || BOOK.ancient;

    // 손때 — 오래 함께한 책일수록 모서리가 닳아 둥글어지고 채도가 내려간다
    const r = 2.2 + b.patina * 2.6;
    const fade = b.patina * 0.16;

    let g = `<g transform="rotate(${tilt.toFixed(2)} ${(x + W / 2).toFixed(1)} ${baseY})">`;

    // 아직 펼치지 않은 책 — 빈 자리를 점선으로 남긴다.
    // "여기 아직 책이 없다"가 보여야 완독 유도가 된다.
    if (!b.opened) {
      const eh = 108;
      g += `<rect x="${x}" y="${baseY - eh}" width="${W}" height="${eh}" rx="3"
        fill="rgba(255,255,255,.012)"
        stroke="rgba(255,255,255,.10)" stroke-width="1" stroke-dasharray="3 5"/>`;
      const cx = x + W / 2, cy = baseY - eh / 2;
      g += `<text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="middle"
        transform="rotate(-90 ${cx} ${cy})" font-size="10.5"
        fill="rgba(255,255,255,.24)" letter-spacing="2.5"
        font-family="-apple-system, 'Apple SD Gothic Neo', sans-serif">${c.label}</text>`;
      g += `</g>`;
      return g;
    }

    const clip = `${UID}-bk-${b.key}`;
    g += `<clipPath id="${clip}"><rect x="${x}" y="${top}" width="${W}" height="${H}" rx="${r}"/></clipPath>`;

    // 1) 바탕
    g += `<rect x="${x}" y="${top}" width="${W}" height="${H}" rx="${r}"
      fill="${c.base}" opacity="${(0.9 - fade).toFixed(3)}"/>`;

    // 2) 잉크 — 아래에서 위로. 표면을 살짝 곡선으로 그려 액체처럼 보이게 한다.
    const inkH = Math.max(0, Math.min(H - 3, H * b.ink));
    if (inkH > 2) {
      const surfY = baseY - inkH;
      const op = 0.62 + b.depth * 0.38;
      g += `<path d="M${x} ${surfY + 2.2}
        Q${x + W * 0.28} ${surfY - 1.6} ${x + W * 0.5} ${surfY + 0.6}
        Q${x + W * 0.74} ${surfY + 2.6} ${x + W} ${surfY - 0.4}
        L${x + W} ${baseY} L${x} ${baseY} Z"
        fill="url(#${UID}-ink-${b.key})" opacity="${op.toFixed(3)}" clip-path="url(#${clip})"/>`;
      // 잉크 표면의 밝은 선 — 수위가 눈에 띄게
      g += `<path d="M${x} ${surfY + 2.2}
        Q${x + W * 0.28} ${surfY - 1.6} ${x + W * 0.5} ${surfY + 0.6}
        Q${x + W * 0.74} ${surfY + 2.6} ${x + W} ${surfY - 0.4}"
        fill="none" stroke="rgba(255,255,255,.26)" stroke-width="1.1"
        clip-path="url(#${clip})"/>`;
    }

    // 3) 원통형 음영 — 책등이 둥글게 말린 느낌
    g += `<rect x="${x}" y="${top}" width="${W}" height="${H}" rx="${r}"
      fill="url(#${UID}-spine-${b.key})" clip-path="url(#${clip})"/>`;

    // 4) 종이결
    g += `<rect x="${x}" y="${top}" width="${W}" height="${H}" rx="${r}"
      fill="#fff" filter="url(#${UID}-grain)" opacity=".5" clip-path="url(#${clip})"/>`;

    // 5) 책등 장식 — 깊이 읽은 사람의 책이 아름다워진다
    if (b.ornament >= 1) {
      [top + 11, baseY - 11].forEach(yy => {
        g += `<line x1="${x + 5}" y1="${yy}" x2="${x + W - 5}" y2="${yy}"
          stroke="${GOLD}" stroke-width="1.1" opacity=".8"/>`;
        g += `<line x1="${x + 5}" y1="${yy + 2.4}" x2="${x + W - 5}" y2="${yy + 2.4}"
          stroke="${GOLD_DIM}" stroke-width=".6" opacity=".5"/>`;
      });
    }
    if (b.ornament >= 2) {
      const my = top + H * 0.36;
      const cx = x + W / 2;
      // 마름모 문양 — 전통 문양의 단순화
      g += `<path d="M${cx} ${my - 7} l5 5 -5 5 -5 -5 z"
        fill="none" stroke="${GOLD}" stroke-width="1.1" opacity=".85"/>`;
      g += `<path d="M${cx} ${my - 3.4} l2.4 2.4 -2.4 2.4 -2.4 -2.4 z"
        fill="${GOLD}" opacity=".55"/>`;
    }

    // 6) 제목 — 세로쓰기. 금박 단계면 금색.
    const titleColor = b.ornament >= 3 ? GOLD : 'rgba(255,255,255,.82)';
    const cx = x + W / 2, cy = top + H * 0.63;
    if (b.ornament >= 3) {
      // 금박은 살짝 번지는 느낌
      g += `<text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="middle"
        transform="rotate(-90 ${cx} ${cy})" font-size="12.5" fill="${GOLD_DIM}"
        letter-spacing="3" opacity=".5" font-weight="700"
        font-family="-apple-system, 'Apple SD Gothic Neo', sans-serif">${c.label}</text>`;
    }
    g += `<text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="middle"
      transform="rotate(-90 ${cx} ${cy})" font-size="12.5" fill="${titleColor}"
      letter-spacing="3" font-weight="${b.ornament >= 3 ? 700 : 500}"
      font-family="-apple-system, 'Apple SD Gothic Neo', sans-serif">${c.label}</text>`;

    // 7) 테두리
    g += `<rect x="${x + 0.5}" y="${top + 0.5}" width="${W - 1}" height="${H - 1}" rx="${r}"
      fill="none" stroke="rgba(0,0,0,.3)" stroke-width="1"/>`;

    g += `</g>`;
    return g;
  }

  // ── 세계의 서 — 서가 위에 눕혀둔 한 권 ──────────────────────
  function worldBook(w, x, y) {
    const W = 84, H = 17;
    let g = '';
    if (!w.opened) {
      g += `<rect x="${x}" y="${y}" width="${W}" height="${H}" rx="2.5"
        fill="rgba(255,255,255,.012)" stroke="rgba(255,255,255,.10)"
        stroke-width="1" stroke-dasharray="3 5"/>`;
      g += `<text x="${x + W / 2}" y="${y + H / 2}" text-anchor="middle" dominant-baseline="middle"
        font-size="9.5" fill="rgba(255,255,255,.24)" letter-spacing="1.5"
        font-family="-apple-system, sans-serif">세계의 서</text>`;
      return g;
    }
    g += `<clipPath id="${UID}-cw"><rect x="${x}" y="${y}" width="${W}" height="${H}" rx="2.5"/></clipPath>`;
    g += `<rect x="${x}" y="${y}" width="${W}" height="${H}" rx="2.5" fill="#6d6a86" opacity=".9"/>`;
    g += `<rect x="${x}" y="${y}" width="${(W * w.ink).toFixed(1)}" height="${H}"
      fill="#39364f" opacity=".85" clip-path="url(#${UID}-cw)"/>`;
    // 책배(페이지 단면) — 눕혀 있으므로 앞쪽이 보인다
    g += `<rect x="${x}" y="${y + H - 4}" width="${W}" height="4"
      fill="#d8cdb4" opacity=".5" clip-path="url(#${UID}-cw)"/>`;
    g += `<rect x="${x}" y="${y}" width="${W}" height="${H}" rx="2.5"
      fill="url(#${UID}-roomLight)" clip-path="url(#${UID}-cw)"/>`;
    g += `<line x1="${x + 5}" y1="${y + 3.5}" x2="${x + W - 5}" y2="${y + 3.5}"
      stroke="${GOLD}" stroke-width=".8" opacity=".6"/>`;
    g += `<text x="${x + W / 2}" y="${y + H / 2 - 0.5}" text-anchor="middle" dominant-baseline="middle"
      font-size="9.5" fill="rgba(255,255,255,.86)" letter-spacing="1.5"
      font-family="-apple-system, 'Apple SD Gothic Neo', sans-serif">세계의 서</text>`;
    g += `<rect x="${x + 0.5}" y="${y + 0.5}" width="${W - 1}" height="${H - 1}" rx="2.5"
      fill="none" stroke="rgba(0,0,0,.3)" stroke-width="1"/>`;
    return g;
  }

  // ── 나의 한국사 — 서가 옆에 세워둔 책 ───────────────────────
  function myBook(pageCount, complete, x, baseY) {
    const W = 28, H = 96;
    const top = baseY - H;
    let g = `<clipPath id="${UID}-cmy"><rect x="${x}" y="${top}" width="${W}" height="${H}" rx="2.4"/></clipPath>`;
    g += `<rect x="${x}" y="${top}" width="${W}" height="${H}" rx="2.4"
      fill="${complete ? '#8a7340' : '#4e463b'}"/>`;
    g += `<rect x="${x}" y="${top}" width="${W}" height="${H}" rx="2.4"
      fill="url(#${UID}-roomLight)" clip-path="url(#${UID}-cmy)"/>`;
    g += `<rect x="${x}" y="${top}" width="${W}" height="${H}" rx="2.4"
      fill="#fff" filter="url(#${UID}-grain)" opacity=".45" clip-path="url(#${UID}-cmy)"/>`;
    // 책등의 세로 홈
    g += `<line x1="${x + 4}" y1="${top + 4}" x2="${x + 4}" y2="${baseY - 4}"
      stroke="rgba(0,0,0,.22)" stroke-width="1"/>`;
    if (complete) {
      [top + 9, baseY - 9].forEach(yy => {
        g += `<line x1="${x + 4}" y1="${yy}" x2="${x + W - 4}" y2="${yy}"
          stroke="${GOLD}" stroke-width="1.1" opacity=".9"/>`;
      });
    }
    const cx = x + W / 2, cy = top + H * 0.55;
    g += `<text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="middle"
      transform="rotate(-90 ${cx} ${cy})" font-size="10.5"
      fill="${complete ? GOLD : 'rgba(255,255,255,.7)'}" letter-spacing="2"
      font-family="-apple-system, 'Apple SD Gothic Neo', sans-serif">나의 한국사</text>`;
    g += `<rect x="${x + 0.5}" y="${top + 0.5}" width="${W - 1}" height="${H - 1}" rx="2.4"
      fill="none" stroke="rgba(0,0,0,.32)" stroke-width="1"/>`;
    return g;
  }

  // ── 배지 수첩 ───────────────────────────────────────────────
  function notebook(badgeCount, x, baseY) {
    const W = 24, H = 68;
    const top = baseY - H;
    let g = `<clipPath id="${UID}-cnb"><rect x="${x}" y="${top}" width="${W}" height="${H}" rx="2.2"/></clipPath>`;
    g += `<rect x="${x}" y="${top}" width="${W}" height="${H}" rx="2.2" fill="#5c4b3c"/>`;
    g += `<rect x="${x}" y="${top}" width="${W}" height="${H}" rx="2.2"
      fill="url(#${UID}-roomLight)" clip-path="url(#${UID}-cnb)"/>`;
    g += `<rect x="${x}" y="${top}" width="${W}" height="${H}" rx="2.2"
      fill="#fff" filter="url(#${UID}-grain)" opacity=".45" clip-path="url(#${UID}-cnb)"/>`;
    // 수첩 밴드
    g += `<rect x="${x}" y="${top + H * 0.55}" width="${W}" height="4"
      fill="rgba(0,0,0,.3)" clip-path="url(#${UID}-cnb)"/>`;
    // 표지의 작은 원 — 획득한 배지 수만큼 채워진다
    for (let i = 0; i < 3; i++) {
      const filled = i < Math.min(3, badgeCount);
      const cyy = top + 13 + i * 12;
      g += `<circle cx="${x + W / 2}" cy="${cyy}" r="3.6"
        fill="${filled ? GOLD : 'none'}"
        stroke="${filled ? 'none' : 'rgba(255,255,255,.22)'}" stroke-width="1"/>`;
    }
    g += `<rect x="${x + 0.5}" y="${top + 0.5}" width="${W - 1}" height="${H - 1}" rx="2.2"
      fill="none" stroke="rgba(0,0,0,.32)" stroke-width="1"/>`;
    return g;
  }

  // ── 선반 판 ─────────────────────────────────────────────────
  function shelfBoard(x, y, w, thick) {
    let g = `<rect x="${x}" y="${y}" width="${w}" height="${thick}" rx="1.5"
      fill="url(#${UID}-shelfWood)"/>`;
    // 앞면 하이라이트
    g += `<rect x="${x}" y="${y}" width="${w}" height="1.6" rx=".8"
      fill="rgba(255,255,255,.13)"/>`;
    // 아래로 떨어지는 그림자
    g += `<rect x="${x}" y="${y + thick}" width="${w}" height="9"
      fill="url(#${UID}-shelfShadow)"/>`;
    return g;
  }

  // ── 전체 렌더 ───────────────────────────────────────────────
  function render(lib, opts) {
    opts = opts || {};
    UID = 'lib' + (++uidSeq);
    const myPages = opts.myPages || 0;
    const complete = lib.openedCount === lib.books.length;

    const shelfW = LAY.bookW * 7 + LAY.gap * 6;
    const rightX = LAY.padX + shelfW + 16;
    // 오른쪽에 진묘수가 앉을 자리를 비워둔다. 캐릭터 이미지는 CSS로
    // 절대배치되므로 SVG에는 그리지 않지만, 여백이 없으면 「나의 한국사」와
    // 배지 수첩 위에 겹쳐 보인다. 2026-07-24 캐릭터 확정과 함께 조정.
    const guideSpace = 96;
    const VW = rightX + 58 + guideSpace;
    const VH = 216;

    let body = defs(lib.books);

    // 뒷벽 — 아주 옅게. 배경 이미지를 얹을 때 이 레이어를 걷어내면 된다.
    body += `<rect x="0" y="0" width="${VW}" height="${VH}" fill="rgba(255,255,255,.014)"/>`;
    body += `<rect x="0" y="0" width="${VW}" height="${VH}" fill="url(#${UID}-roomLight)"/>`;

    // 위 선반 + 세계의 서
    body += shelfBoard(LAY.padX - 8, LAY.shelfTopY, shelfW + 16, 6);
    body += worldBook(lib.world, LAY.padX + 46, LAY.shelfTopY - 17);

    // 책이 선반에 드리우는 그림자
    body += `<ellipse cx="${LAY.padX + shelfW / 2}" cy="${LAY.baseY + 1}"
      rx="${shelfW / 2}" ry="4" fill="rgba(0,0,0,.28)"/>`;

    // 책 7권
    lib.books.forEach((b, i) => { body += book(b, i); });

    // 아래 선반
    body += shelfBoard(LAY.padX - 8, LAY.baseY, shelfW + 16, 7);

    // 오른쪽 — 나의 한국사 + 배지 수첩
    body += `<ellipse cx="${rightX + 30}" cy="${LAY.baseY + 1}" rx="34" ry="3.6"
      fill="rgba(0,0,0,.26)"/>`;
    body += myBook(myPages, complete, rightX, LAY.baseY);
    body += notebook((lib.badges || []).length, rightX + 34, LAY.baseY);
    body += shelfBoard(rightX - 6, LAY.baseY, 72, 7);

    return `<svg viewBox="0 0 ${VW} ${VH}" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="나의 서재" class="atlas-library-svg">${body}</svg>`;
  }

  window.AtlasLibrary = {
    render: render,
    BOOK: BOOK,
    LAYOUT: LAY,
  };
})();
