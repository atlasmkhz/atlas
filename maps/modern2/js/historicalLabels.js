// ═══════════════════════════════════════════════════════
// js/historicalLabels.js — 프로젝트 직접 지명 렌더링 레이어
//
// 이번 스프린트의 목적: "지도가 외부 지명 없이 동작 가능한 구조인가"를
// 검증하는 것. 이 파일은 인터페이스와 최소 동작을 제공하며, 시대별
// 전체 지명 데이터 제작은 범위 밖이다 (places/places_min.js의 3개만 사용).
//
// 의존: app.js(없음 — 독립 모듈), map.js(map, MAP_MODE), places/places_min.js
// 로드 시점: map.js 다음, renderer.js 이전 어디든 가능 (renderer.js와
//           직접 상호작용하지 않음 — 완전히 분리된 레이어이기 때문).
// ═══════════════════════════════════════════════════════

// 현재 화면에 그려진 라벨 마커 추적 (clearLabels에서 일괄 제거용)
let historicalLabelMarkers = [];

/**
 * 지명 하나를 현재 연도 기준으로 표시해야 하는지 판정.
 * from/until이 둘 다 null이면 "시대 무관, 항상 표시" (예: 동해, 독도).
 * @param {Object} place - places 스키마 객체
 * @param {number} year - 현재 슬라이더 연도
 * @returns {boolean}
 */
function isPlaceVisible(place, year) {
  if (place.from == null && place.until == null) return true; // 시대 무관
  const from = place.from ?? -Infinity;
  const until = place.until ?? Infinity;
  return year >= from && year <= until;
}

/**
 * 지명 하나를 현재 줌 레벨 기준으로 표시해야 하는지 판정.
 * minZoom이 없으면(undefined/null) 줌과 무관하게 항상 표시 가능.
 * 있으면 그 값 이상일 때만 표시 — 전체 화면에서는 숨기고, 충분히
 * 확대했을 때만 드러나는 지명(예: 독도)에 사용한다.
 * @param {Object} place
 * @param {number} zoom - 현재 지도 줌 레벨
 * @returns {boolean}
 */
function isPlaceVisibleAtZoom(place, zoom) {
  if (place.minZoom == null) return true;
  return zoom >= place.minZoom;
}

/**
 * 특정 연도·줌에 표시되어야 할 지명 목록을 반환한다.
 * 현재는 PLACES_MIN(3개)만 대상. 향후 places_1910.js 등을 추가하면
 * 이 함수가 참조하는 데이터 소스를 배열로 확장하면 된다 (DATA 조립 방식과 동일 패턴).
 * @param {number} year
 * @param {number} zoom
 * @returns {Array}
 */
function getVisiblePlaces(year, zoom) {
  // 향후 확장 지점: [PLACES_MIN, PLACES_1910, PLACES_1940, ...].flat()
  // 지금은 검증 범위가 PLACES_MIN 3개로 한정되어 있으므로 단일 소스만 참조.
  const source = (typeof PLACES_MIN !== 'undefined') ? PLACES_MIN : [];
  return source.filter(p => isPlaceVisible(p, year) && isPlaceVisibleAtZoom(p, zoom));
}

/**
 * 지명 라벨을 지도에 렌더링한다.
 * ⚠ 성능 노트: 지금은 L.marker(divIcon) 방식이며 3개 수준에서만 검증되었다.
 *   "1000개 이상 대응"이나 Canvas/SVG 가상화는 이번 스프린트 범위 밖이며
 *   구현되어 있지 않다. 데이터가 places_1940.js 등으로 확장되어 수십~수백
 *   개가 되면 이 구현은 그대로 쓸 수 없고 별도 성능 작업이 필요하다.
 * @param {number} year
 * @param {number} zoom - 현재 지도 줌 레벨 (minZoom 필터에 사용)
 */
function renderLabels(year, zoom) {
  clearLabels();
  const places = getVisiblePlaces(year, zoom);
  places.forEach(place => {
    const isSeaOrIsland = place.category === 'sea' || place.category === 'island';
    // minZoom이 있는 지명(예: 독도)은 줌인했을 때만 보이는 "찾아낸" 표시이므로
    // 작은 점 + 한글 단독 라벨로만 표시한다 — 전체 화면 동해처럼 영문 alias를
    // 같이 부각시키지 않는다.
    const isZoomRevealOnly = place.minZoom != null;
    const html = isZoomRevealOnly
      ? `<div class="hist-label hist-label-pin"><span class="hist-pin-dot"></span><span class="hist-label-city">${place.display_name}</span></div>`
      : (isSeaOrIsland
        ? `<div class="hist-label hist-label-sea">${place.display_name}${place.aliases?.length ? ' ' + place.aliases[0] : ''}</div>`
        : `<div class="hist-label hist-label-city">${place.display_name}</div>`);

    const marker = L.marker([place.lat, place.lng], {
      icon: L.divIcon({ className: '', iconSize: [0,0], html }),
      interactive: !!place.current_name,
      zIndexOffset: 60
    });

    if (place.current_name && place.current_name !== place.display_name) {
      marker.bindTooltip(`${place.display_name} (현 ${place.current_name})`, {
        permanent: false, direction: 'top', offset: [0,-6]
      });
    }

    marker.addTo(map);
    historicalLabelMarkers.push(marker);
  });
}

/**
 * 현재 표시된 모든 역사 라벨을 제거한다.
 */
function clearLabels() {
  historicalLabelMarkers.forEach(m => map.removeLayer(m));
  historicalLabelMarkers = [];
}

/**
 * 연도가 바뀌었을 때 호출. 현재는 renderLabels를 다시 호출하는 것과
 * 동일하지만, 향후 "변경된 지명만 갱신"하는 최적화가 필요해질 경우
 * 이 함수 내부만 바꾸면 되도록 외부 호출 지점(timeline.js)과 분리해둔다.
 * @param {number} year
 * @param {number} [zoom] - 생략 시 현재 map.getZoom() 값을 사용.
 */
function updateHistoricalLabels(year, zoom) {
  renderLabels(year, zoom ?? map.getZoom());
}

// ── feature flag: 이 레이어를 켤지 끌지 ──
// false인 동안은 historicalLabels 자체가 아무것도 그리지 않는다.
// MAP_MODE.current가 'world'로 전환되고 이 플래그도 true가 되어야
// 실제로 동작한다 — 두 스위치를 분리한 이유는, "지명 레이어 코드는
// 완성됐지만 아직 켜고 싶지 않다" 같은 중간 상태를 표현하기 위함.
const HISTORICAL_LABELS_ENABLED = true;

/**
 * 외부에서 호출하는 진입점. ENABLED 플래그를 거쳐 실제 렌더링 여부를 결정.
 * @param {number} year
 * @param {number} [zoom] - 생략 시 현재 map.getZoom() 값을 사용 (zoomend 콜백에서
 *                          연도 없이 줌만 바뀌었을 때 호출하기 쉽게 하기 위함).
 */
function renderHistoricalLabels(year, zoom) {
  if (!HISTORICAL_LABELS_ENABLED) return;
  updateHistoricalLabels(year, zoom);
}
