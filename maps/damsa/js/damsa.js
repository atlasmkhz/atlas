// maps/damsa/js/damsa.js
// ─────────────────────────────────────────────────────────────
// 답사 — 지금 갈 수 있는 역사의 현장
// ─────────────────────────────────────────────────────────────
//
// ■ 시대 지도와 갈라지는 지점 (중요)
//   1) maxZoom: 시대 지도는 11에서 멈춘다. 도시가 점으로 보이는 배율이라
//      진입로도 주차장도 안 보인다. 답사는 18까지 열어야 한다.
//   2) 타일: 시대 지도는 dark_nolabels를 쓰고 historicalLabels.js가 지명을
//      직접 그린다 — "일본해" 같은 외부 표기를 원천 차단하기 위해서다.
//      답사에는 그 설계가 정확히 반대로 작동한다. 현장을 찾아가는 사람에게는
//      현대 도로명과 마을 이름이 보여야 한다. 그래서 라벨 있는 타일(voyager)을
//      쓰고 historicalLabels.js는 아예 불러오지 않는다.
//   3) 초기 뷰만 한반도 남부로 잡고 maxBounds는 걸지 않는다. 나중에 간도·
//      연해주·일본 내 강제동원 현장 같은 테마가 나왔을 때 문을 닫지 않기 위해서다.

(function () {
  'use strict';

  // ── 거리·시간 추정 ────────────────────────────────────────
  //
  // 진짜 등시선(1시간 권역 폴리곤)은 비싸다. 카카오·티맵은 공개 등시선
  // API가 없고, Mapbox급을 쓰면 호출량이 감당이 안 된다.
  // 그래서 여기서는 직선거리 × 도로계수로 추정치를 즉시 보여주고,
  // 정확한 경로는 카카오맵으로 넘긴다. 화면에도 "약"이라고 명시한다.

  const ROAD_FACTOR = 1.35;   // 한국 도로망 평균 우회계수 (직선 → 실제 주행)

  function haversine(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const toRad = (d) => d * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  // 평균 주행속도는 거리 구간에 따라 다르다. 짧으면 시내도로 비중이
  // 커서 느리고, 길면 고속도로 비중이 커서 빨라진다.
  function avgSpeed(km) {
    if (km < 30)  return 38;
    if (km < 80)  return 55;
    if (km < 180) return 72;
    return 85;
  }

  function estimate(origin, place) {
    if (origin.isIsland) return { island: true };
    const straight = haversine(origin.lat, origin.lng, place.lat, place.lng);
    const road = straight * ROAD_FACTOR;
    const minutes = (road / avgSpeed(road)) * 60;
    return { km: Math.round(road), minutes: Math.round(minutes) };
  }

  function fmtTime(minutes) {
    if (minutes < 60) return `약 ${Math.max(5, Math.round(minutes / 5) * 5)}분`;
    const h = Math.floor(minutes / 60);
    const m = Math.round((minutes % 60) / 10) * 10;
    return m === 0 ? `약 ${h}시간` : (m === 60 ? `약 ${h + 1}시간` : `약 ${h}시간 ${m}분`);
  }

  // ── 라벨 사전 ─────────────────────────────────────────────
  const SURVIVAL = {
    intact: { label: '유적 온전', desc: '유구가 그대로 남아 있음' },
    trace:  { label: '터·표지석', desc: '현장은 있으나 실물은 사라짐' },
    museum: { label: '기념관·전시관', desc: '실내 전시' },
    closed: { label: '접근 제한', desc: '사전 허가 필요' }
  };
  // 주차장에서의 도보 부담. 카드의 단위가 주차장이므로 "유적까지 얼마나
  // 걷는가"가 곧 난이도다.
  const WALK = {
    easy:     '주차장 바로 옆 · 평지',
    moderate: '주차장에서 도보 30분~1시간',
    hard:     '산길 1시간 이상'
  };

  // ── 사진 ──────────────────────────────────────────────────
  //
  // 왕두목 확정(2026-07-30): "사진 자료가 있어야겠다. 각 유적의 사진이 필수야."
  // 답사는 가고 싶게 만들어야 하는 갈래다. 글만으로는 그 일이 안 된다.
  //
  // 다만 사진은 데이터와 수명이 다르다 — 텍스트는 지금 완성돼 있어도 사진은
  // 출처를 확인하며 하나씩 채워야 한다. 그래서 파일이 아직 없을 때 카드가
  // 깨지지 않는 것이 이 함수의 유일한 요구사항이다.
  //   · 파일이 있으면  → 카드 맨 위 16:9 사진 + 캡션 + 출처
  //   · 파일이 없으면  → onerror가 .is-missing을 달아 얇은 '사진 준비 중' 띠로 접힌다
  // 이 구조 덕분에 photos/ 폴더에 파일을 넣는 것만으로 사진이 살아난다.
  // 코드를 다시 건드릴 필요가 없다.
  function photoBlock(p) {
    if (!p.photo || !p.photo.src) return '';
    const alt = esc(p.photo.alt || p.name);
    const cap = p.photo.caption ? `<span class="d-photo-cap">${p.photo.caption}</span>` : '';
    const cr  = p.photo.credit  ? `<span class="d-photo-credit">${p.photo.credit}</span>` : '';
    return `
  <figure class="d-photo">
    <img src="${esc(p.photo.src)}" alt="${alt}" loading="lazy" decoding="async"
         onerror="this.closest('.d-photo').classList.add('is-missing')">
    <span class="d-photo-fallback">사진 준비 중</span>
    ${cap || cr ? `<figcaption>${cap}${cr}</figcaption>` : ''}
  </figure>`;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ── 서재 스크랩 ───────────────────────────────────────────
  // 왕두목 확정(2026-07-30): "내 서재에 스크랩(나중 여행과 관심을 위한)".
  // 답사는 지금 당장 가는 것이 아니라 "언젠가 가려고 찜해두는" 성격이 강하다.
  // 기존 루트·자료실 스크랩과 같은 growth.js 저장소를 쓰되 kind를 'damsa'로
  // 구분해서, 서재에서 「가고 싶은 답사지」로 따로 모아 보여준다.
  // extra에 내비 검색어와 좌표를 같이 담아두면 서재에서 바로 길찾기가 된다.
  function scrapItem(p) {
    return {
      url: location.pathname + '#' + p.id,
      title: p.name,
      kind: 'damsa',
      note: (theme ? theme.title + ' · ' : '') + (p.address || ''),
      extra: { nav: p.navQuery || p.name, lat: p.lat, lng: p.lng, theme: theme ? theme.id : '' }
    };
  }

  function paintScrapBtn(btn, on) {
    btn.classList.toggle('is-on', on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.textContent = on ? '📚 서재에 담김' : '🔖 서재에 담기';
  }

  // ── 상태 ──────────────────────────────────────────────────
  // 테마 페이지는 <body data-theme="dolmen">로 자기가 어떤 테마인지 알린다.
  // 2차 테마(기억의 현장·조선 왕릉·개항장 도시)가 붙어도 이 파일은 그대로 쓴다.
  const all = window.DAMSA_THEMES || [];
  const wanted = document.body && document.body.dataset.theme;
  const theme = all.find((t) => t.id === wanted) || all[0];
  const regions = window.DAMSA_REGIONS || [];
  let origin = null;
  let map = null;
  const markers = {};

  // ── 지도 초기화 ───────────────────────────────────────────
  function initMap() {
    map = L.map('damsaMap', {
      center: [36.3, 127.6],   // 한반도 남부 — 초기 뷰일 뿐, 경계는 걸지 않는다
      zoom: 7,
      minZoom: 5,
      maxZoom: 18,             // ← 시대 지도(11)와 갈리는 핵심값
      scrollWheelZoom: false,
      attributionControl: true
    });

    // 라벨 있는 타일. 답사에서는 현대 지명이 반드시 보여야 한다.
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      attribution: '&copy; OpenStreetMap &copy; CARTO'
    }).addTo(map);

    map.on('click', () => { if (!map.scrollWheelZoom.enabled()) map.scrollWheelZoom.enable(); });

    // ── 마커 ──────────────────────────────────────────────
    //
    // 왕두목 지적(2026-07-30): "투명한 원이 들어가 있다보니 가독성이 떨어진다.
    // 눈에 잘 띄지 않아. 색깔을 넣는 게 좋겠어."
    //
    // 원인을 찾아보니 감각의 문제가 아니라 실제 버그였다. ★
    // 예전 코드는 `<div class="d-marker ${p.survival}">`로 색을 붙였는데,
    // survival은 place가 아니라 sights[] 안에 있는 칸이다. 카드 단위를
    // 유적 → 주차장으로 재편할 때(themes.js 상단 설명 참고) survival이
    // sights로 내려갔는데 이 줄만 옛 스키마를 보고 있었다. 그래서 p.survival이
    // 늘 undefined였고, .d-marker에 색 클래스가 하나도 붙지 않아 배경 없는
    // 원 — 왕두목이 본 "투명한 원" — 만 그려지고 있었다.
    //
    // 고치면서 시각적으로도 한 단계 올렸다.
    //   (1) 잔존도를 sights에서 합성해 색을 되살리고, 채도를 올린 4색으로 교체
    //   (2) 형태를 원 → 물방울 핀으로
    //   (3) 핀 안에 번호를 넣었다. 번호는 아래 카드 순서와 같아서
    // "지도의 3번이 어느 카드인가"가 바로 읽힌다. 흰 테두리와 그림자로
    // 어떤 타일 배경에서도 떠 보이게 했다.
    const pts = [];
    theme.places.forEach((p) => {
      const no = p._no;
      const sv = p._sv;
      const icon = L.divIcon({
        className: 'd-marker-wrap',
        html: `<div class="d-marker ${sv}"><span>${no}</span></div>`,
        iconSize: [32, 42],
        iconAnchor: [16, 40],
        popupAnchor: [0, -36]
      });
      const m = L.marker([p.lat, p.lng], { icon, title: p.name, riseOnHover: true }).addTo(map);

      const thumb = (p.photo && p.photo.src)
        ? `<img class="d-pop-thumb" src="${esc(p.photo.src)}" alt="" loading="lazy"
                onerror="this.style.display='none'">` : '';
      m.bindPopup(
        `<div class="d-pop">` +
        thumb +
        `<div class="d-pop-no ${sv}">${no}</div>` +
        `<div class="d-pop-name">${esc(p.name)}</div>` +
        `<div class="d-pop-addr">${esc(p.address)}</div>` +
        `<div class="d-pop-nav">내비: ${esc(p.navQuery || p.name)}</div>` +
        `<div class="d-pop-more"><a href="#${p.id}">자세히 보기 ↓</a></div>` +
        `</div>`
      );

      // 마커에 마우스를 올리면 이름이 뜬다. 상시 라벨은 강화·화순처럼
      // 지점이 붙어 있는 권역에서 서로 겹쳐 오히려 더 안 읽힌다.
      m.bindTooltip(`${no}. ${p.name}`, { direction: 'top', offset: [0, -38] });
      m.on('click', () => { location.hash = p.id; });
      markers[p.id] = m;
      pts.push([p.lat, p.lng]);
    });

    if (pts.length) map.fitBounds(pts, { padding: [40, 40] });
  }

  // ── 출발지 칩 ─────────────────────────────────────────────
  function renderOrigin() {
    const wrap = document.getElementById('originChips');
    wrap.innerHTML = regions.map((r) =>
      `<button type="button" class="d-chip" data-region="${r.id}">${r.name}</button>`
    ).join('');

    wrap.addEventListener('click', (e) => {
      const btn = e.target.closest('.d-chip');
      if (!btn) return;
      origin = regions.find((r) => r.id === btn.dataset.region);
      wrap.querySelectorAll('.d-chip').forEach((b) => b.classList.toggle('active', b === btn));
      try { localStorage.setItem('damsa_origin', origin.id); } catch (err) { /* 무시 */ }
      renderDistances();
    });

    // 이전 선택 복원
    let saved = null;
    try { saved = localStorage.getItem('damsa_origin'); } catch (err) { /* 무시 */ }
    if (saved) {
      const btn = wrap.querySelector(`[data-region="${saved}"]`);
      if (btn) btn.click();
    }
  }

  // ── 거리 표시 갱신 ────────────────────────────────────────
  function renderDistances() {
    if (!origin) return;

    const hint = document.getElementById('originHint');
    if (origin.isIsland) {
      hint.innerHTML =
        '제주에서 이 테마의 답사지까지는 <b>자동차로 갈 수 없습니다.</b> ' +
        '항공편으로 김포·청주·광주 등에 도착한 뒤의 거리를 참고하세요.';
    } else {
      hint.innerHTML =
        `<b>${origin.name}</b>${origin.note ? ` (${origin.note})` : ''} 기준 자동차 예상 거리입니다. ` +
        '직선거리에 도로 우회계수를 적용한 <b>추정치</b>이며, 실제 경로는 카카오맵 버튼으로 확인하세요.';
    }

    // 장소별
    theme.places.forEach((p) => {
      const el = document.querySelector(`[data-dist="${p.id}"]`);
      if (!el) return;
      const est = estimate(origin, p);
      if (est.island) {
        el.innerHTML = '<span class="km" style="font-size:13px">항공·선박</span>';
      } else {
        el.innerHTML = `<span class="km">${est.km}km</span><span class="hr">${fmtTime(est.minutes)}</span>`;
      }
    });

    // 권역별 — 그 권역에서 가장 가까운 지점 기준
    theme.regions.forEach((rg) => {
      const el = document.querySelector(`[data-regiondist="${rg.id}"]`);
      if (!el) return;
      const inRegion = theme.places.filter((p) => p.region === rg.id);
      if (!inRegion.length) return;
      if (origin.isIsland) { el.textContent = '항공·선박 이동'; return; }
      const best = inRegion
        .map((p) => estimate(origin, p))
        .reduce((a, b) => (a.minutes <= b.minutes ? a : b));
      el.textContent = `${origin.name}에서 ${fmtTime(best.minutes)}`;
    });
  }

  // ── 본문 렌더링 ───────────────────────────────────────────
  function field(label, body) {
    if (!body) return '';
    return `<div><div class="d-field-label">${label}</div><div class="d-field-body">${body}</div></div>`;
  }

  function renderPlace(p) {
    // 카드 단위가 주차장이므로, 카드 상단 태그는 그 주차장에서 볼 수 있는
    // 유적들의 잔존도를 합쳐서 보여준다.
    const svSet = [...new Set((p.sights || []).map((s2) => s2.survival))];
    const svTags = svSet.map((k) => {
      const sv = SURVIVAL[k] || SURVIVAL.trace;
      return `<span class="d-tag survival-${k}">${sv.label}</span>`;
    }).join('');

    const tags = [
      svTags,
      `<span class="d-tag">${WALK[p.walk] || ''}</span>`,
      p.duration ? `<span class="d-tag">머무는 시간 ${p.duration}</span>` : '',
      (p.sights || []).length > 1 ? `<span class="d-tag">볼 곳 ${p.sights.length}</span>` : ''
    ].filter(Boolean).join('');

    const sights = (p.sights || []).map((s2) => {
      const sv = SURVIVAL[s2.survival] || SURVIVAL.trace;
      return `<li class="d-sight">
        <span class="d-sight-dot ${s2.survival}" title="${sv.label}"></span>
        <span><b>${s2.name}</b>${s2.note ? ` — ${s2.note}` : ''}</span>
      </li>`;
    }).join('');

    const kakaoTo  = `https://map.kakao.com/link/to/${encodeURIComponent(p.navQuery || p.name)},${p.lat},${p.lng}`;
    const kakaoMap = `https://map.kakao.com/link/map/${encodeURIComponent(p.navQuery || p.name)},${p.lat},${p.lng}`;

    return `
<article class="d-place" id="${p.id}">
  ${photoBlock(p)}
  <div class="d-place-head">
    <div style="min-width:0">
      <h3 class="d-place-name"><span class="d-place-no ${p._sv || ''}">${p._no || ''}</span>${p.name}</h3>
    </div>
    <div class="d-place-dist" data-dist="${p.id}">
      <span class="km" style="font-size:13px;color:#8b857b">출발지 선택</span>
    </div>
  </div>
  <div class="d-tags">${tags}</div>

  <!-- 내비 검색어 — 카드에서 가장 눈에 띄어야 하는 정보.
       주소를 입력하는 사람보다 이름을 검색하는 사람이 훨씬 많다. -->
  <div class="d-nav">
    <div class="d-nav-label">내비에 이렇게 검색하세요</div>
    <div class="d-nav-query">${p.navQuery || p.name}</div>
    <div class="d-nav-park">🅿 ${p.parking || ''}</div>
  </div>

  <div class="d-sights">
    <div class="d-field-label">여기 주차하면 볼 수 있는 곳</div>
    <ul class="d-sight-list">${sights}</ul>
  </div>

  <div class="d-fields">
    ${field('어떤 곳인가', p.what)}
    ${field('둘러보는 방법', p.access)}
    ${field('관람 정보', p.visit)}
    ${field('함께 볼 곳', p.nearby)}
  </div>
  ${p.caution ? `<div class="d-caution"><b>알고 가면 좋은 것</b>${p.caution}</div>` : ''}
  <div class="d-place-foot">
    <span class="d-addr">📍 ${p.address}${p.phone ? ` · ☎ ${p.phone}` : ''}</span>
    <span class="d-actions">
      <button type="button" class="d-btn d-btn-scrap" data-scrap="${p.id}"
              aria-pressed="false">🔖 서재에 담기</button>
      <a class="d-btn" href="${kakaoMap}" target="_blank" rel="noopener">카카오맵에서 보기</a>
      <a class="d-btn d-btn-primary" href="${kakaoTo}" target="_blank" rel="noopener">길찾기</a>
    </span>
  </div>
  <div class="d-verified">정보 확인일 ${p.verified} · 요금과 개관시간은 변경될 수 있으니 방문 전 확인하세요.</div>
</article>`;
  }

  function renderMain() {
    document.getElementById('themeTitle').textContent = `${theme.icon} ${theme.title}`;
    document.getElementById('themeSub').textContent = theme.subtitle;
    document.getElementById('themeSummary').textContent = theme.summary;
    document.getElementById('themeIntro').textContent = theme.intro;

    const main = document.getElementById('damsaMain');
    main.innerHTML = theme.regions.map((rg) => {
      const places = theme.places.filter((p) => p.region === rg.id);
      return `
<section class="d-region">
  <div class="d-region-head">
    <span class="d-region-name">${rg.name}</span>
    <span class="d-region-area">${rg.area} · 진입 지점 ${places.length}곳</span>
    <span class="d-region-dist" data-regiondist="${rg.id}">출발지를 선택하세요</span>
  </div>
  <p class="d-region-pitch">${rg.pitch}</p>
  <div class="d-region-course"><b>추천 동선</b>${rg.course}</div>
  <div class="d-places">${places.map(renderPlace).join('')}</div>
</section>`;
    }).join('');
  }

  // ── 번호·잔존도 도장 ──────────────────────────────────────
  // 지도 핀의 번호와 카드의 번호가 반드시 같아야 한다. 두 곳에서 각자
  // 세면 언젠가 어긋난다 — 그래서 렌더링 전에 한 번만 찍어두고 양쪽이
  // 그 값을 읽는다. 잔존도(_sv)도 같은 이유로 여기서 한 번만 합성한다.
  function stampPlaces() {
    theme.places.forEach((p, i) => {
      p._no = i + 1;
      const kinds = new Set((p.sights || []).map((s) => s.survival));
      p._sv = kinds.has('intact') ? 'intact'
            : kinds.has('trace')  ? 'trace'
            : kinds.has('museum') ? 'museum'
            : kinds.has('closed') ? 'closed' : 'trace';
    });
  }

  // ── 스크랩 버튼 연결 ──────────────────────────────────────
  // growth.js가 없거나(스토리지 차단 등) API가 빠져 있으면 버튼을 숨긴다.
  // 답사 페이지는 야외에서 쓰는 도구다 — 안 되는 버튼을 남겨두면 안 된다.
  function initScrap() {
    const G = window.AtlasGrowth;
    const btns = document.querySelectorAll('.d-btn-scrap');
    if (!G || !G.toggleScrap) {
      btns.forEach((b) => { b.style.display = 'none'; });
      return;
    }
    btns.forEach((btn) => {
      const p = theme.places.find((x) => x.id === btn.dataset.scrap);
      if (!p) return;
      paintScrapBtn(btn, !!(G.isScrapped && G.isScrapped(scrapItem(p).url)));
      btn.addEventListener('click', () => {
        paintScrapBtn(btn, G.toggleScrap(scrapItem(p)));
      });
    });
  }

  // ── 시작 ──────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    if (!theme) return;
    stampPlaces();
    renderMain();
    renderOrigin();
    initMap();
    initScrap();

    // 지도 마커 → 카드 이동
    window.addEventListener('hashchange', () => {
      const el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
