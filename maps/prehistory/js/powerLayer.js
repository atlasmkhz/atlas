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

  // 존/필드별로 별도 오프스크린 캔버스에 lighten(최대값) 합성으로 블롭을
  // 그린 뒤, 그 결과만 메인 캔버스에 얹는다. 이렇게 하면 같은 존 안에서
  // 블롭이 겹쳐도 알파가 누적돼 색이 하얗게 뜨지 않고(최대값만 취함),
  // 서로 다른 존끼리는 메인 캔버스에서 자연스럽게 겹친다.
  _powerActiveFields.forEach(f => {
    const blobs = f.blobs || [];
    if (!blobs.length) return;
    const off = document.createElement('canvas');
    off.width = size.x; off.height = size.y;
    const octx = off.getContext('2d');
    octx.globalCompositeOperation = 'lighten';
    let drew = false;
    blobs.forEach(b => {
      const p = map.latLngToContainerPoint([b.lat, b.lng]);
      const rPx = _powerKmToPx(b.lat, b.lng, b.r);
      if (rPx < 1) return;
      const sx = b.sx || 1, rot = b.rot || 0;
      const rMax = rPx * Math.max(sx, 1);
      if (p.x < -rMax || p.y < -rMax || p.x > size.x + rMax || p.y > size.y + rMax) return;
      octx.save();
      octx.translate(p.x, p.y);
      if (rot) octx.rotate(rot);
      if (sx !== 1) octx.scale(sx, 1);
      const g = octx.createRadialGradient(0, 0, 0, 0, 0, rPx);
      g.addColorStop(0.0, _powerHexToRgba(f.color, _powerBoostAlpha(b.a)));
      g.addColorStop(0.45, _powerHexToRgba(f.color, _powerBoostAlpha(b.a) * 0.6));
      g.addColorStop(0.75, _powerHexToRgba(f.color, _powerBoostAlpha(b.a) * 0.26));
      g.addColorStop(1.0, _powerHexToRgba(f.color, 0));
      octx.fillStyle = g;
      octx.beginPath();
      octx.arc(0, 0, rPx, 0, Math.PI * 2);
      octx.fill();
      octx.restore();
      drew = true;
    });
    if (drew) ctx.drawImage(off, 0, 0);
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

// 발전단계론(엘만 서비스) 부제 — f.stage가 있으면 이름 아래 작게 표시한다.
// 군장사회 → 초기국가 → 정복국가 → 성숙 고대국가로 이어지는 단계 개념.
// "선사에는 국가·민족이 없거나 미약했으나, 부족연맹보다 한 단계 위의
// 느슨한 정치체(군장사회·초기국가)는 존재했다"는 관점을 시각화한다.
const _POWER_STAGE_LABEL = {
  chiefdom:    '군장사회',
  early_state: '초기국가',
  conquest_state: '정복국가',
};

function _drawPowerLabel(f) {
  const kindTag = _POWER_KIND_TAG[f.kind] || '';
  const stageTag = f.stage && _POWER_STAGE_LABEL[f.stage]
    ? `<span class="territory-stage">${_POWER_STAGE_LABEL[f.stage]}</span>` : '';
  const html =
    `<div class="territory-label territory-label-${f.kind}" style="--polity-color:${f.color}">` +
      `<span class="territory-name">${f.name}</span>${stageTag}${kindTag}` +
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
// 챕터(구간) 진입점 — 구간과 겹치는 모든 필드를 표시 (선사 실제 진입점).
function renderPowerFieldsForRange(startYear, endYear) {
  _powerLastYear = endYear;
  clearPowerFields();
  if (!isPowerLayerOn()) return;
  if (typeof POWER_FIELDS === 'undefined') return;
  _powerEnsureCanvas();
  // 경계만 맞닿는 인접 시대 존은 제외한다(예: 신석기 챕터 끝 -1500에
  // 청동기 존이 딱 걸리는 것 방지). 실제 구간이 겹칠 때만 표시.
  const _span = endYear - startYear;
  const active = POWER_FIELDS.filter(f => {
    if (_span <= 0) return f.from <= endYear && f.until >= startYear;
    return f.from < endYear && f.until > startYear;
  });
  _powerActiveFields = active;
  _powerRedrawCanvas();
  active.forEach(_drawPowerLabel);
  window._atlasLayerEmpty = window._atlasLayerEmpty || {};
  window._atlasLayerEmpty.power = (!_powerActiveFields || _powerActiveFields.length === 0);
  if (window._atlasUpdateLayerHint) window._atlasUpdateLayerHint();
}

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
