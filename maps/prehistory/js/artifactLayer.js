// ═══════════════════════════════════════════════════════
// js/artifactLayer.js — 유물 분포권 레이어 v2 (선사 지도 전용, 슬라이더형)
//
// 2026-07-18 v2: 폴리곤 → 수채화 그라데이션(캔버스) 전환.
// territoryLayer.js(고대)와 같은 캔버스 방식 — blob 조합의 방사형
// 그라데이션으로 "출토 밀도"를 표현한다. 경계선은 그리지 않는다.
//
// renderYear(year) 끝에서 renderArtifactZonesAtYear(year) 호출.
// 대표 출토지 마커(다이아몬드)와 분포권 라벨은 v1과 동일하게 유지.
//
// 의존: Leaflet(map), data/artifact_zones.js(ARTIFACT_ZONES)
// ═══════════════════════════════════════════════════════

let artifactLayerObjs = [];       // 라벨·출토지 마커
let _artifactLastYear = null;
let _artifactActiveZones = null;  // 현재 그리는 존들
let _aCanvas = null;

function isArtifactLayerOn() {
  const el = document.getElementById('layerArtifact');
  return el ? el.checked : true;
}

function _artifactEnsureCanvas() {
  if (_aCanvas) return _aCanvas;
  _aCanvas = L.DomUtil.create('canvas', 'artifact-canvas');
  _aCanvas.style.pointerEvents = 'none';
  map.getPanes().overlayPane.appendChild(_aCanvas);
  map.on('moveend zoomend resize', _artifactRedrawCanvas);
  return _aCanvas;
}

function _artifactHexToRgba(hex, a) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function _artifactKmToPx(lat, lng, rKm) {
  const p1 = map.latLngToContainerPoint([lat, lng]);
  const p2 = map.latLngToContainerPoint([lat, lng + 0.5]);
  const pxPerDegLng = Math.abs(p2.x - p1.x) / 0.5;
  const kmPerDegLng = 111.32 * Math.cos(lat * Math.PI / 180);
  return (rKm / kmPerDegLng) * pxPerDegLng;
}

function _artifactRedrawCanvas() {
  if (!_aCanvas) return;
  const size = map.getSize();
  _aCanvas.width = size.x;
  _aCanvas.height = size.y;
  const topLeft = map.containerPointToLayerPoint([0, 0]);
  L.DomUtil.setPosition(_aCanvas, topLeft);

  const ctx = _aCanvas.getContext('2d');
  ctx.clearRect(0, 0, size.x, size.y);
  if (!_artifactActiveZones || !isArtifactLayerOn()) return;

  _artifactActiveZones.forEach(z => {
    (z.blobs || []).forEach(b => {
      const p = map.latLngToContainerPoint([b.lat, b.lng]);
      const rPx = _artifactKmToPx(b.lat, b.lng, b.r);
      if (rPx < 1) return;
      if (p.x < -rPx || p.y < -rPx || p.x > size.x + rPx || p.y > size.y + rPx) return;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rPx);
      g.addColorStop(0.0, _artifactHexToRgba(z.color, b.a));
      g.addColorStop(0.45, _artifactHexToRgba(z.color, b.a * 0.55));
      g.addColorStop(0.75, _artifactHexToRgba(z.color, b.a * 0.22));
      g.addColorStop(1.0, _artifactHexToRgba(z.color, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, rPx, 0, Math.PI * 2);
      ctx.fill();
    });
  });
}

function clearArtifactZones() {
  artifactLayerObjs.forEach(o => { try { map.removeLayer(o); } catch (_) {} });
  artifactLayerObjs = [];
  _artifactActiveZones = null;
  if (_aCanvas) {
    const ctx = _aCanvas.getContext('2d');
    ctx.clearRect(0, 0, _aCanvas.width, _aCanvas.height);
  }
}

function _drawArtifactZoneLabelAndSites(z) {
  // 분포권 라벨
  const labelHtml =
    `<div class="artifact-zone-label" style="--zone-color:${z.color}">` +
      `<span class="artifact-zone-name">${z.name}</span>` +
      `<span class="artifact-zone-kind">고고학적 분포권 · 정치적 영토 아님</span>` +
    `</div>`;
  const labelIcon = L.divIcon({
    className: 'artifact-zone-label-wrap',
    html: labelHtml,
    iconSize: null,
    iconAnchor: [0, 0],
  });
  const labelMarker = L.marker([z.label.lat, z.label.lng], {
    icon: labelIcon,
    interactive: true,
    keyboard: false,
    zIndexOffset: -400,
  }).addTo(map);
  labelMarker.bindPopup(
    `<div class="artifact-zone-popup"><strong>${z.name}</strong><p>${z.note}</p>` +
    `<p class="artifact-zone-caveat">그라데이션은 출토 밀도의 개략적 표현입니다. 짙을수록 출토가 집중되는 지역입니다.</p></div>`,
    { maxWidth: 300 }
  );
  artifactLayerObjs.push(labelMarker);

  // 대표 출토지 마커
  (z.sites || []).forEach(s => {
    const siteIcon = L.divIcon({
      className: 'artifact-site-wrap',
      html: `<div class="artifact-site" style="--zone-color:${z.color}"></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });
    const m = L.marker([s.lat, s.lng], {
      icon: siteIcon,
      keyboard: false,
      zIndexOffset: -300,
    }).addTo(map);

    if (s.card) {
      m.bindTooltip(`${s.name} — 클릭하면 사건 카드로`, { direction: 'top', offset: [0, -6] });
      m.on('click', () => {
        try {
          const url = new URL(window.location.href);
          url.searchParams.set('event', s.card);
          window.location.href = url.toString();
        } catch (_) {}
      });
    } else {
      m.bindTooltip(`${s.name} (대표 출토지)`, { direction: 'top', offset: [0, -6] });
    }
    artifactLayerObjs.push(m);
  });
}

/** 슬라이더형 진입점 — 그 해에 해당하는 분포권만 그린다 */
function renderArtifactZonesAtYear(year) {
  _artifactLastYear = year;
  clearArtifactZones();
  if (!isArtifactLayerOn()) return;
  if (typeof ARTIFACT_ZONES === 'undefined') return;

  _artifactEnsureCanvas();
  const active = ARTIFACT_ZONES.filter(z => year >= z.from && year <= z.until);
  _artifactActiveZones = active;
  _artifactRedrawCanvas();
  active.forEach(_drawArtifactZoneLabelAndSites);
}

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('layerArtifact');
  if (el) el.addEventListener('change', () => {
    if (_artifactLastYear !== null) renderArtifactZonesAtYear(_artifactLastYear);
  });
});
