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

// 2026-07-18: 색이 흐려 알아보기 어렵다는 피드백 → 전역 강도 보정.
// blob의 a값을 일괄 증폭하되 0.62를 넘지 않게 눌러서 수채화 느낌은 유지한다.
const GRADIENT_INTENSITY = 2.3;
function _boostAlpha(a){ return Math.min(a * GRADIENT_INTENSITY, 0.8); }


// ── 빈 시기 안내 ────────────────────────────────────
// 유물 분포는 기원전 6000년부터, 세력 분포는 기원전 400년부터만
// 존재한다. 그보다 이른 시기(신화·구석기)에 레이어가 "안 보이는" 것은
// 정상 동작이지만, 사용자에게는 고장으로 보일 수 있어 안내를 띄운다.
window._atlasLayerEmpty = window._atlasLayerEmpty || {};
window._atlasUpdateLayerHint = function () {
  const el = document.getElementById('layerEmptyHint');
  if (!el) return;
  const st = window._atlasLayerEmpty;
  const anyOn = (document.getElementById('layerArtifact')?.checked) || (document.getElementById('layerPower')?.checked);
  el.style.display = (anyOn && st.artifact && st.power) ? 'block' : 'none';
};

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

  // 존/필드별로 별도 오프스크린 캔버스에 lighten(최대값) 합성으로 블롭을
  // 그린 뒤, 그 결과만 메인 캔버스에 얹는다. 이렇게 하면 같은 존 안에서
  // 블롭이 겹쳐도 알파가 누적돼 색이 하얗게 뜨지 않고(최대값만 취함),
  // 서로 다른 존끼리는 메인 캔버스에서 자연스럽게 겹친다.
  _artifactActiveZones.forEach(z => {
    const blobs = z.blobs || [];
    if (!blobs.length) return;
    const off = document.createElement('canvas');
    off.width = size.x; off.height = size.y;
    const octx = off.getContext('2d');
    octx.globalCompositeOperation = 'lighten';
    let drew = false;
    blobs.forEach(b => {
      const p = map.latLngToContainerPoint([b.lat, b.lng]);
      const rPx = _artifactKmToPx(b.lat, b.lng, b.r);
      if (rPx < 1) return;
      const sx = b.sx || 1, rot = b.rot || 0;
      const rMax = rPx * Math.max(sx, 1);
      if (p.x < -rMax || p.y < -rMax || p.x > size.x + rMax || p.y > size.y + rMax) return;
      octx.save();
      octx.translate(p.x, p.y);
      if (rot) octx.rotate(rot);
      if (sx !== 1) octx.scale(sx, 1);
      const g = octx.createRadialGradient(0, 0, 0, 0, 0, rPx);
      g.addColorStop(0.0, _artifactHexToRgba(z.color, _boostAlpha(b.a)));
      g.addColorStop(0.45, _artifactHexToRgba(z.color, _boostAlpha(b.a) * 0.6));
      g.addColorStop(0.75, _artifactHexToRgba(z.color, _boostAlpha(b.a) * 0.26));
      g.addColorStop(1.0, _artifactHexToRgba(z.color, 0));
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
      `<span class="artifact-zone-kind">${z.kind_label || '고고학적 분포권 · 정치적 영토 아님'}</span>` +
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
// 챕터(구간) 진입점 — 구간 [startYear,endYear]과 겹치는 모든 존을 표시.
// 선사 지도의 실제 진입점이다(renderRange). 존이 [from,until]로 정의되므로
// 구간과 조금이라도 겹치면 그린다 — 예: 신석기 챕터 어디를 눌러도
// 빗살무늬토기권이 나온다.
function renderArtifactZonesForRange(startYear, endYear) {
  _artifactLastYear = endYear;
  clearArtifactZones();
  if (!isArtifactLayerOn()) return;
  if (typeof ARTIFACT_ZONES === 'undefined') return;
  _artifactEnsureCanvas();
  // 경계만 맞닿는 인접 시대 존은 제외한다(예: 신석기 챕터 끝 -1500에
  // 청동기 존이 딱 걸리는 것 방지). 실제 구간이 겹칠 때만 표시.
  const _span = endYear - startYear;
  const active = ARTIFACT_ZONES.filter(z => {
    if (_span <= 0) return z.from <= endYear && z.until >= startYear;
    return z.from < endYear && z.until > startYear;
  });
  _artifactActiveZones = active;
  _artifactRedrawCanvas();
  active.forEach(_drawArtifactZoneLabelAndSites);
  window._atlasLayerEmpty = window._atlasLayerEmpty || {};
  window._atlasLayerEmpty.artifact = (active.length === 0);
  if (window._atlasUpdateLayerHint) window._atlasUpdateLayerHint();
}

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
  window._atlasLayerEmpty.artifact = (active.length === 0);
  if (window._atlasUpdateLayerHint) window._atlasUpdateLayerHint();
}

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('layerArtifact');
  if (el) el.addEventListener('change', () => {
    if (_artifactLastYear !== null) renderArtifactZonesAtYear(_artifactLastYear);
  });
});
