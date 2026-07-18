// ═══════════════════════════════════════════════════════
// js/territoryLayer.js — 세력 분포 레이어 (중세1·고려 지도 전용, 재위 챕터형)
//
// 고대 지도 v2를 이식하며 두 가지를 개조했다:
//  1) kind 'annexed'(원 직할령 — 쌍성총관부·동녕부) 태그 추가.
//  2) 이 지도는 왕 재위 단위 챕터라 구간이 짧다 — 구간에 스냅샷이
//     없으면 재위 중간값에 가장 가까운 스냅샷을 자동 선택하고,
//     캡션에 기준 연도를 그대로 노출한다(왜곡 방지).
//
// 2026-07-18 v2: 폴리곤 → 수채화 그라데이션(캔버스) 전면 전환.
// 각 세력은 여러 개의 방사형 그라데이션 blob의 조합으로 그려진다 —
// 중심부는 진하고 주변으로 갈수록 옅어지며, 세력끼리 넓게 겹친다.
// 경계선은 그리지 않는다. 경계선이 없던 시대이기 때문이다.
//
// 동작(스냅샷 칩 UI는 v1과 동일):
//  - renderRange(start,end) 끝에서 renderTerritoryForRange(start,end).
//  - 챕터에 걸치는 스냅샷들을 칩으로 노출, 칩 클릭으로 시점 전환.
//  - 캔버스는 overlayPane에 얹혀 지도와 함께 이동하고,
//    moveend/zoomend/resize 때 다시 그린다.
//
// 의존: Leaflet(map), data/territory_snapshots.js(TERRITORY_SNAPSHOTS)
// ═══════════════════════════════════════════════════════

// 2026-07-18: 색이 흐려 알아보기 어렵다는 피드백 → 전역 강도 보정.
// blob의 a값을 일괄 증폭하되 0.62를 넘지 않게 눌러서 수채화 느낌은 유지한다.
const GRADIENT_INTENSITY = 2.3;
function _boostAlpha(a){ return Math.min(a * GRADIENT_INTENSITY, 0.8); }

let territoryObjs = [];            // 라벨 마커들
let _territoryLastRange = null;
let _territoryActiveYear = null;
let _territoryActiveFields = null; // 현재 그리는 스냅샷의 fields
let _tCanvas = null;

function isTerritoryLayerOn() {
  const el = document.getElementById('layerTerritory');
  return el ? el.checked : true;
}

// ── 캔버스 준비 ──────────────────────────────────────
function _territoryEnsureCanvas() {
  if (_tCanvas) return _tCanvas;
  _tCanvas = L.DomUtil.create('canvas', 'territory-canvas');
  _tCanvas.style.pointerEvents = 'none';
  map.getPanes().overlayPane.appendChild(_tCanvas);
  map.on('moveend zoomend resize', _territoryRedrawCanvas);
  return _tCanvas;
}

function _hexToRgba(hex, a) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

// km → 현재 줌의 픽셀 반경 (해당 위도의 경도 픽셀 밀도로 환산)
function _kmToPx(lat, lng, rKm) {
  const p1 = map.latLngToContainerPoint([lat, lng]);
  const p2 = map.latLngToContainerPoint([lat, lng + 0.5]);
  const pxPerDegLng = Math.abs(p2.x - p1.x) / 0.5;
  const kmPerDegLng = 111.32 * Math.cos(lat * Math.PI / 180);
  return (rKm / kmPerDegLng) * pxPerDegLng;
}

function _territoryRedrawCanvas() {
  if (!_tCanvas) return;
  const size = map.getSize();
  _tCanvas.width = size.x;
  _tCanvas.height = size.y;
  // 캔버스를 현재 뷰포트 좌상단(레이어 좌표)에 고정
  const topLeft = map.containerPointToLayerPoint([0, 0]);
  L.DomUtil.setPosition(_tCanvas, topLeft);

  const ctx = _tCanvas.getContext('2d');
  ctx.clearRect(0, 0, size.x, size.y);
  if (!_territoryActiveFields || !isTerritoryLayerOn()) return;

  // fields 순서대로(배경 세력 먼저) — 자연스러운 알파 블렌딩으로 겹침 표현
  _territoryActiveFields.forEach(f => {
    (f.blobs || []).forEach(b => {
      const p = map.latLngToContainerPoint([b.lat, b.lng]);
      const rPx = _kmToPx(b.lat, b.lng, b.r);
      if (rPx < 1) return;
      // 화면 밖 멀리 있는 blob은 스킵 (반경 여유 포함)
      // 타원(sx: 진행 방향 늘림 배율, rot: 회전 라디안) — 원형 탈피의 핵심.
      // 여러 개의 기울어진 타원 워시가 겹치며 수채화 같은 유기적 형상을 만든다.
      const sx = b.sx || 1, rot = b.rot || 0;
      const rMax = rPx * Math.max(sx, 1);
      if (p.x < -rMax || p.y < -rMax || p.x > size.x + rMax || p.y > size.y + rMax) return;
      ctx.save();
      ctx.translate(p.x, p.y);
      if (rot) ctx.rotate(rot);
      if (sx !== 1) ctx.scale(sx, 1);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rPx);
      g.addColorStop(0.0, _hexToRgba(f.color, _boostAlpha(b.a)));
      g.addColorStop(0.45, _hexToRgba(f.color, _boostAlpha(b.a) * 0.6));
      g.addColorStop(0.75, _hexToRgba(f.color, _boostAlpha(b.a) * 0.26));
      g.addColorStop(1.0, _hexToRgba(f.color, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, rPx, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  });
}

// ── 라벨 ─────────────────────────────────────────────
function clearTerritory() {
  territoryObjs.forEach(o => { try { map.removeLayer(o); } catch (_) {} });
  territoryObjs = [];
  _territoryActiveFields = null;
  if (_tCanvas) {
    const ctx = _tCanvas.getContext('2d');
    ctx.clearRect(0, 0, _tCanvas.width, _tCanvas.height);
  }
}

const _TERRITORY_KIND_TAG = {
  polity: '',
  influence: '<span class="territory-kind">활동권</span>',
  steppe: '<span class="territory-kind">초원·북방 세력</span>',
  china: '<span class="territory-kind">중원 왕조</span>',
  commandery: '<span class="territory-kind">거점 · 학계 논쟁 있음</span>',
  annexed: '<span class="territory-kind">원 직할령</span>',
};

function _drawFieldLabel(f) {
  const kindTag = _TERRITORY_KIND_TAG[f.kind] || '';
  const html =
    `<div class="territory-label territory-label-${f.kind}" style="--polity-color:${f.color}">` +
      `<span class="territory-name">${f.name}</span>${kindTag}` +
    `</div>`;
  const icon = L.divIcon({
    className: 'territory-label-wrap',
    html,
    iconSize: null,
    iconAnchor: [0, 0],
  });
  const marker = L.marker(f.label, {
    icon,
    interactive: true,
    keyboard: false,
    zIndexOffset: -450,
  }).addTo(map);
  marker.bindPopup(
    `<div class="territory-popup"><strong>${f.name}</strong>` +
    `<p>${f.note}</p>` +
    `<p class="territory-popup-caveat">그라데이션은 활동·영향 범위의 개략적 표현이며 경계선이 아닙니다. 당대에는 국경·민족의 구분이 없거나 희미했고, 세력의 범위는 넓게 겹쳐 있었습니다.</p></div>`,
    { maxWidth: 300 }
  );
  territoryObjs.push(marker);
}

function _renderSnapshot(snap) {
  clearTerritory();
  _territoryEnsureCanvas();
  _territoryActiveFields = snap.fields;
  _territoryRedrawCanvas();
  snap.fields.forEach(_drawFieldLabel);
  const capEl = document.getElementById('territoryCaption');
  if (capEl) {
    capEl.innerHTML =
      `<strong>${snap.label} 기준</strong> — ${snap.caption} ` +
      `<span class="territory-caveat">짙을수록 중심부이며, 세력의 겹침은 오류가 아니라 당대의 실상입니다.</span>`;
    capEl.style.display = 'block';
  }
}

function _snapshotsInRange(startYear, endYear) {
  if (typeof TERRITORY_SNAPSHOTS === 'undefined') return [];
  return TERRITORY_SNAPSHOTS.filter(s => s.year >= startYear && s.year <= endYear);
}

function _renderChips(snaps, activeYear) {
  const chipWrap = document.getElementById('territoryChips');
  if (!chipWrap) return;
  chipWrap.innerHTML = '';
  if (!snaps.length || !isTerritoryLayerOn()) { chipWrap.style.display = 'none'; return; }
  chipWrap.style.display = 'flex';
  snaps.forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'territory-chip' + (s.year === activeYear ? ' active' : '');
    btn.textContent = s.label;
    btn.addEventListener('click', () => {
      _territoryActiveYear = s.year;
      _renderSnapshot(s);
      _renderChips(snaps, s.year);
    });
    chipWrap.appendChild(btn);
  });
}

/** 챕터형 진입점 */
function renderTerritoryForRange(startYear, endYear) {
  _territoryLastRange = [startYear, endYear];
  clearTerritory();
  const capEl = document.getElementById('territoryCaption');
  const snaps = _snapshotsInRange(startYear, endYear);

  if (!isTerritoryLayerOn()) {
    if (capEl) capEl.style.display = 'none';
    _renderChips([], null);
    return;
  }
  if (!snaps.length) {
    // 재위 구간에 스냅샷이 없으면 가장 가까운 시점으로 폴백
    const near = _nearestSnapshot(startYear, endYear);
    if (!near) { if (capEl) capEl.style.display = 'none'; _renderChips([], null); return; }
    _territoryActiveYear = near.year;
    _renderSnapshot(near);
    _renderChips([near], near.year);
    return;
  }

  let active = snaps.find(s => s.year === _territoryActiveYear) || snaps[0];
  _territoryActiveYear = active.year;
  _renderSnapshot(active);
  _renderChips(snaps, active.year);
}

// 구간에 스냅샷이 없을 때: 재위 중간값에 가장 가까운 스냅샷으로 폴백
function _nearestSnapshot(startYear, endYear) {
  if (typeof TERRITORY_SNAPSHOTS === 'undefined' || !TERRITORY_SNAPSHOTS.length) return null;
  const mid = (startYear + endYear) / 2;
  let best = TERRITORY_SNAPSHOTS[0];
  TERRITORY_SNAPSHOTS.forEach(s => {
    if (Math.abs(s.year - mid) < Math.abs(best.year - mid)) best = s;
  });
  return best;
}

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('layerTerritory');
  if (el) el.addEventListener('change', () => {
    if (_territoryLastRange) renderTerritoryForRange(_territoryLastRange[0], _territoryLastRange[1]);
  });
});
