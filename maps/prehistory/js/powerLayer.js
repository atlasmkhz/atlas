// ═══════════════════════════════════════════════════════
// js/powerLayer.js — 세력 분포 레이어 (선사 지도 전용, 슬라이더형)
//
// 2026-07-18 신설. 고대 지도 territoryLayer의 수채화 캔버스 방식을
// 슬라이더형으로 옮긴 것. renderYear(year) 끝에서
// renderPowerFieldsAtYear(year) 호출 — 그 해에 존재하는 세력만 그린다.
// 유물 분포(artifactLayer)와 별도 캔버스·별도 체크박스(layerPower).
// ═══════════════════════════════════════════════════════

const POWER_GRADIENT_INTENSITY = 2.3;
function _powerBoostAlpha(a){ return Math.min(a * POWER_GRADIENT_INTENSITY, 0.8); }

let powerLayerObjs = [];
let _powerLastYear = null;
let _powerActiveFields = null;
let _pCanvas = null;

function isPowerLayerOn() {
  const el = document.getElementById('layerPower');
  return el ? el.checked : true;
}

function _powerEnsureCanvas() {
  if (_pCanvas) return _pCanvas;
  _pCanvas = L.DomUtil.create('canvas', 'power-canvas');
  _pCanvas.style.pointerEvents = 'none';
  map.getPanes().overlayPane.appendChild(_pCanvas);
  map.on('moveend zoomend resize', _powerRedrawCanvas);
  return _pCanvas;
}

function _powerHexToRgba(hex, a) {
  const h = hex.replace('#', '');
  return `rgba(${parseInt(h.substring(0,2),16)},${parseInt(h.substring(2,4),16)},${parseInt(h.substring(4,6),16)},${a})`;
}

function _powerKmToPx(lat, lng, rKm) {
  const p1 = map.latLngToContainerPoint([lat, lng]);
  const p2 = map.latLngToContainerPoint([lat, lng + 0.5]);
  const pxPerDegLng = Math.abs(p2.x - p1.x) / 0.5;
  const kmPerDegLng = 111.32 * Math.cos(lat * Math.PI / 180);
  return (rKm / kmPerDegLng) * pxPerDegLng;
}

function _powerRedrawCanvas() {
  if (!_pCanvas) return;
  const size = map.getSize();
  _pCanvas.width = size.x;
  _pCanvas.height = size.y;
  const topLeft = map.containerPointToLayerPoint([0, 0]);
  L.DomUtil.setPosition(_pCanvas, topLeft);

  const ctx = _pCanvas.getContext('2d');
  ctx.clearRect(0, 0, size.x, size.y);
  if (!_powerActiveFields || !isPowerLayerOn()) return;

  _powerActiveFields.forEach(f => {
    (f.blobs || []).forEach(b => {
      const p = map.latLngToContainerPoint([b.lat, b.lng]);
      const rPx = _powerKmToPx(b.lat, b.lng, b.r);
      if (rPx < 1) return;
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
      g.addColorStop(0.0, _powerHexToRgba(f.color, _powerBoostAlpha(b.a)));
      g.addColorStop(0.45, _powerHexToRgba(f.color, _powerBoostAlpha(b.a) * 0.6));
      g.addColorStop(0.75, _powerHexToRgba(f.color, _powerBoostAlpha(b.a) * 0.26));
      g.addColorStop(1.0, _powerHexToRgba(f.color, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, rPx, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  });
}

function clearPowerFields() {
  powerLayerObjs.forEach(o => { try { map.removeLayer(o); } catch (_) {} });
  powerLayerObjs = [];
  _powerActiveFields = null;
  if (_pCanvas) {
    const ctx = _pCanvas.getContext('2d');
    ctx.clearRect(0, 0, _pCanvas.width, _pCanvas.height);
  }
}

const _POWER_KIND_TAG = {
  polity: '',
  influence: '<span class="territory-kind">연맹·활동권</span>',
  steppe: '<span class="territory-kind">초원·북방 세력</span>',
  china: '<span class="territory-kind">중원 왕조</span>',
  commandery: '<span class="territory-kind">거점 · 학계 논쟁 있음</span>',
};

function _drawPowerLabel(f) {
  const kindTag = _POWER_KIND_TAG[f.kind] || '';
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
  powerLayerObjs.push(marker);
}

/** 슬라이더형 진입점 */
function renderPowerFieldsAtYear(year) {
  _powerLastYear = year;
  clearPowerFields();
  if (!isPowerLayerOn()) return;
  if (typeof POWER_FIELDS === 'undefined') return;

  _powerEnsureCanvas();
  const active = POWER_FIELDS.filter(f => year >= f.from && year <= f.until);
  _powerActiveFields = active;
  _powerRedrawCanvas();
  active.forEach(_drawPowerLabel);
  window._atlasLayerEmpty = window._atlasLayerEmpty || {};
  window._atlasLayerEmpty.power = (!_powerActiveFields || _powerActiveFields.length === 0);
  if (window._atlasUpdateLayerHint) window._atlasUpdateLayerHint();
}

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('layerPower');
  if (el) el.addEventListener('change', () => {
    if (_powerLastYear !== null) renderPowerFieldsAtYear(_powerLastYear);
  });
});
