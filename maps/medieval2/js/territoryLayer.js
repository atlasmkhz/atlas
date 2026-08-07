// ═══════════════════════════════════════════════════════
// js/territoryLayer.js — 세력 분포 레이어 v2 (조선(medieval2) 지도 — 세계사 세력 스냅샷, 챕터형)
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
  influence: '<span class="territory-kind">해상 네트워크·활동권</span>',
  steppe: '<span class="territory-kind">초원·북방 세력</span>',
  china: '<span class="territory-kind">중원 왕조</span>',
  native: '<span class="territory-kind">원주민 세계</span>',
  commandery: '<span class="territory-kind">거점 · 학계 논쟁 있음</span>',
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
      `<span class="territory-caveat">지도를 축소하면 세계 전체의 분포가 보입니다. ` +
      `짙을수록 중심부이며, 세력의 겹침은 오류가 아니라 당대의 실상입니다.</span>`;
    capEl.style.display = 'block';
  }
}

function _snapshotsInRange(startYear, endYear) {
  if (typeof TERRITORY_SNAPSHOTS === 'undefined') return [];
  // medieval2 변경(2026-08-07): 왕대 챕터가 짧아(10~40년) 점 매칭으로는
  // 스냅샷이 특정 왕 챕터에서만 보인다. yearStart~yearEnd 구간과 챕터가
  // 겹치면 노출한다. (yearStart/End가 없으면 year 한 점으로 동작 — 고대 호환)
  return TERRITORY_SNAPSHOTS.filter(s => {
    const s0 = (s.yearStart != null) ? s.yearStart : s.year;
    const s1 = (s.yearEnd   != null) ? s.yearEnd   : s.year;
    return s1 >= startYear && s0 <= endYear;
  });
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

  // 2026-08-07 버그 수정: 스냅샷이 없는 왕대에서 토글을 켜면 아무
  // 반응이 없어 "고장난 것처럼" 보였다(왕두목 리포트 — 기본 챕터가
  // 태조라 첫 화면에서 켜면 반드시 이 경로였다). 침묵 대신 어느
  // 왕대로 가야 보이는지 안내한다.
  if (isTerritoryLayerOn() && !snaps.length) {
    if (capEl) {
      capEl.innerHTML =
        '<strong>세계 세력</strong> — 이 왕대에는 아직 세력 스냅샷이 없습니다. ' +
        '현재는 16세기 파일럿 한 장으로, <b>연산군~선조</b> 챕터에서 표시됩니다. ' +
        '<span class="territory-caveat">검증 후 15·17·18·19세기로 확장 예정입니다.</span>';
      capEl.style.display = 'block';
    }
    _renderChips([], null);
    return;
  }

  if (!isTerritoryLayerOn() || !snaps.length) {
    if (capEl) capEl.style.display = 'none';
    _renderChips([], null);
    return;
  }

  let active = snaps.find(s => s.year === _territoryActiveYear) || snaps[0];
  _territoryActiveYear = active.year;
  _renderSnapshot(active);
  _renderChips(snaps, active.year);
}

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('layerTerritory');
  if (el) el.addEventListener('change', () => {
    if (_territoryLastRange) renderTerritoryForRange(_territoryLastRange[0], _territoryLastRange[1]);
  });
});
