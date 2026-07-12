// ═══════════════════════════════════════════════════════
// js/chinaLayer.js — 중국 왕조 라벨 레이어 (챕터형 + 슬라이더형 공용)
//
// 이 지도의 철학("여러 나라가 같은 시공간에 있었다")을 인접국까지 확장한다.
// 한반도 사건 위에, 같은 시기 중국 땅에 어떤 왕조가 있었는지를 라벨로
// 얹어 보여준다.
//
// 두 종류의 지도를 모두 지원한다:
//   - 챕터형(고대·중세1·중세2): renderRange 끝에서 renderChinaDynasties(start,end)
//   - 슬라이더형(선사·근대·근현대·현대): renderYear 끝에서
//     renderChinaDynastiesAtYear(year) — 그 해를 포함하는 왕조만 표시.
//     슬라이더를 움직이면 중국 왕조도 실시간으로 바뀐다.
//
// 의존: Leaflet(map), data/china_dynasties.js(CHINA_DYNASTIES)
// 로드 시점: map.js 다음, data/china_dynasties.js 다음.
//
// 표시 규칙:
//   - 왕조의 [from,until]이 대상 구간(또는 그 해)과 겹치면 표시.
//   - 'unified'(통일왕조)/'divided'(분열기)/'nomad'(북방 정복왕조)를 색으로 구분.
//   - pointer-events:none — 라벨은 클릭 대상이 아니라 배경 맥락이다.
//   - "중국사 보기" 체크박스(layerChina)로 끌 수 있다. 기본 ON.
// ═══════════════════════════════════════════════════════

let chinaLabelMarkers = [];

// 마지막으로 그린 구간을 기억 — 체크박스 토글 시 다시 그릴 때 사용.
// [start,end] 형태로 저장(슬라이더는 [year,year]로 저장).
let _chinaLastRange = null;

/** 왕조 존속기간이 [startYear,endYear] 구간과 겹치는가 */
function dynastyOverlaps(d, startYear, endYear) {
  const from = (d.from == null) ? -Infinity : d.from;
  const until = (d.until == null) ? Infinity : d.until;
  return from <= endYear && until >= startYear;
}

/** 체크박스 상태 — 없으면 기본 ON */
function isChinaLayerOn() {
  const el = document.getElementById('layerChina');
  return el ? el.checked : true;
}

/** 라벨 일괄 제거 */
function clearChinaLabels() {
  chinaLabelMarkers.forEach(m => { try { map.removeLayer(m); } catch (_) {} });
  chinaLabelMarkers = [];
}

/** 왕조 하나를 지도에 라벨로 그린다(내부 공용 헬퍼) */
function _drawChinaLabel(d) {
  if (d.lat == null || d.lng == null) return;

  const tierClass =
    d.tier === 'unified' ? 'china-label-unified' :
    d.tier === 'nomad'   ? 'china-label-nomad'   :
                           'china-label-divided';

  const hanja = d.hanja ? `<span class="china-label-hanja">${d.hanja}</span>` : '';
  const html =
    `<div class="china-label ${tierClass}">` +
      `<span class="china-label-name">${d.name}</span>${hanja}` +
    `</div>`;

  const icon = L.divIcon({
    className: 'china-label-wrap',
    html,
    iconSize: null,      // 내용 크기에 맞춤
    iconAnchor: [0, 0],
  });

  const marker = L.marker([d.lat, d.lng], {
    icon,
    interactive: false,   // 배경 맥락 — 클릭 대상 아님
    keyboard: false,
    zIndexOffset: -500,   // 사건 마커보다 뒤에 깔린다
  }).addTo(map);

  chinaLabelMarkers.push(marker);
}

/** 공용 렌더 코어 — 구간 [startYear,endYear]와 겹치는 왕조를 그린다 */
function _renderChinaRange(startYear, endYear) {
  _chinaLastRange = [startYear, endYear];
  clearChinaLabels();
  if (!isChinaLayerOn()) return;
  if (typeof CHINA_DYNASTIES === 'undefined') return;
  CHINA_DYNASTIES
    .filter(d => dynastyOverlaps(d, startYear, endYear))
    .forEach(_drawChinaLabel);
}

/**
 * [챕터형] 현재 챕터 범위와 겹치는 중국 왕조 라벨을 그린다.
 * 고대·중세1·중세2의 renderRange 끝에서 호출.
 */
function renderChinaDynasties(startYear, endYear) {
  _renderChinaRange(startYear, endYear);
}

/**
 * [슬라이더형] 현재 연도를 포함하는 중국 왕조 라벨을 그린다.
 * 선사·근대·근현대·현대의 renderYear 끝에서 호출.
 * 슬라이더가 특정 '한 해'를 가리키므로 [year,year] 구간으로 처리한다.
 */
function renderChinaDynastiesAtYear(year) {
  _renderChinaRange(year, year);
}

/** 체크박스 토글 시 마지막 구간으로 다시 그린다 */
function refreshChinaDynasties() {
  if (_chinaLastRange) {
    _renderChinaRange(_chinaLastRange[0], _chinaLastRange[1]);
  }
}

// 체크박스 이벤트 바인딩 (DOM 로드 후)
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('layerChina');
  if (el) el.addEventListener('change', refreshChinaDynasties);
});
