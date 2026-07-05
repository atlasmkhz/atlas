// ═══════════════════════════════════════════════════════
// map.js — 지도 초기화 및 동해/독도 표기 보정
// 의존: Leaflet (CDN), app.js (safeRender 호출용 — 단, 실행 순서상
//       safeRender는 renderer.js에서 나중에 정의되므로 zoomend
//       콜백 내부에서만 참조한다. 클로저로 안전하게 동작함.)
// ═══════════════════════════════════════════════════════

// ── MAP_MODE: 지도 운용 방식 선언 ──
// legacy: 라벨 포함 래스터 타일(Carto dark_all) + 위경도 고정 가리개로 일본해
//         표기를 덮는 임시 방식. maxBounds/noWrap도 "세계지도 wrap 문제"를
//         해결한 것이 아니라 동아시아 권역으로 시야를 제한해 버그가 드러나지
//         않게 만든 임시 회피다.
// world:  라벨 없는 타일(dark_nolabels) + 모든 지명(도시명 포함)을 우리가
//         직접 렌더링하는 방식. 일본해 표기 자체가 발생하지 않으며, 세계
//         전역으로 시야를 넓혀도 wrap 문제에 안전하게 대응할 수 있는 구조.
//
// 현재 활성 모드: world (MAP_MODE.current = 'world'). dark_nolabels 타일
// URL은 CARTO의 표준 공개 타일 스타일(light_all/dark_all/dark_nolabels 등)
// 패턴과 일치하나, 이 작업 환경의 네트워크가 cartocdn.com 접근을 차단해
// 실제 브라우저에서 타일이 정상 응답하는지 이 세션에서 직접 검증하지는
// 못했다. 즉 "코드 분기는 world로 전환되어 적용 중"이지만 "브라우저
// 렌더링 결과까지 실측 확인됨"은 아니다 — 실사용 전 직접 브라우저에서
// 여러 줌 레벨로 확인 권장 (자세한 내용은 7번 "알려진 버그/한계" 참고).
const MAP_MODE = {
  current: 'world',
  legacy: {
    description: '래스터 타일(Carto dark_all, 라벨 포함) + 가리개 방식. 동아시아 권역 한정.',
    tile: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    boundsRestricted: true   // maxBounds로 세계 전체를 다루지 않음 — wrap 버그 회피용
  },
  world: {
    description: '활성화됨(코드 분기 적용 중). 라벨 없는 타일(dark_nolabels) + 직접 라벨링 구조. 브라우저 렌더링 실측은 미검증 — 위 주석 참고.',
    tile: 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
    boundsRestricted: false
  }
};
// const activeTile = MAP_MODE[MAP_MODE.current].tile; 형태로 실제 분기됨
// (아래 L.tileLayer 호출부에서 activeTileUrl로 사용 — 하드코딩 아님).

// ── 지도 본체 초기화 [2026-06 재작업: 동서 wrap 실제 허용] ──
// 과거(legacy_mode) 주석: maxBounds/worldCopyJump/noWrap 조합은 "세계지도를
// 가로로 한 바퀴 돌리면 마커가 사라지는 버그"를 근본적으로 고친 것이 아니라,
// 지도가 그 상황에 도달하지 못하도록 동아시아~태평양 권역으로 시야를 미리
// 제한해 버그가 드러날 조건 자체를 차단한 회피였다.
//
// 1차 작업(시야 확장)에서는 이 회피를 그대로 둔 채 maxBounds만 풀었다 —
// 그 결과 서쪽(유럽 방향)은 충분히 열렸지만 동쪽(태평양 건너 미주 방향)은
// noWrap:true가 막고 있어 여전히 끊겼다. 두목님 피드백으로 이 부분을
// 재작업했다.
//
// 이번 재작업에서 실제로 바꾼 것:
//   - L.tileLayer의 noWrap:true 제거 → Leaflet 기본 동작인 타일 가로 반복을
//     켰다. 이제 한국에서 동쪽으로 계속 이동하면 일본 → 태평양 → 미주
//     순서로 타일이 끊김 없이 이어진다 (서쪽도 마찬가지로 끊김 없음).
//   - worldCopyJump:false → true로 변경. Leaflet 공식 문서상 이 옵션이
//     "지도를 반복된 세계의 다른 '사본'으로 이동했을 때 원래 사본으로
//     매끄럽게 되돌려, 마커 등 모든 오버레이가 계속 보이게" 만드는 정식
//     해결책이다. 즉 이번 재작업은 "버그를 피해 다니기"가 아니라 Leaflet이
//     제공하는 정식 기능으로 "버그 자체를 해결"하는 방향이다.
//   - 이 변경이 안전한 이유: 동해/독도 가리개(seaLabelMask)는 MAP_MODE가
//     'legacy'일 때만 생성되는 고정좌표 사각형 오버레이인데, 현재
//     MAP_MODE.current는 'world'라 이 오버레이가 만들어지지 않는다.
//     historicalLabels.js의 사건/인물 마커들도 일반 L.marker라 좌표 기반으로
//     렌더링되며 wrap 여부와 무관하게 동작한다. 즉 wrap을 막던 두 설정
//     (noWrap, worldCopyJump:false)을 풀어도 충돌할 고정좌표 오버레이가
//     없다는 것을 코드 전체에서 확인했다.
//   - minZoom 4→2, 초기 zoom은 4로 유지 (1차 작업에서 두목님 피드백대로
//     5→3→4로 조정한 값을 그대로 둔다). 현재 데이터가 1910~1945·동아시아
//     중심이므로 첫 화면은 한국·중국·일본·연해주·동남아 일부가 자연스럽게
//     보이고, 사용자가 드래그·축소하면 세계 어디로든(포르투갈도 뉴욕도)
//     끊김 없이 도달할 수 있다.
//   - center는 한국 좌표를 그대로 유지했다.
const INITIAL_MAP_VIEW = { center:[39.5, 128.5], zoom:4 };

const map = L.map('map', {
  center: INITIAL_MAP_VIEW.center, zoom: INITIAL_MAP_VIEW.zoom,
  tap:true, touchZoom:true, dragging:true, zoomControl:false,
  attributionControl:false, minZoom:2, maxZoom:11,
  worldCopyJump:true
  // maxBounds/maxBoundsViscosity 제거됨 — 세계 전체로 자유롭게 이동 가능.
  // worldCopyJump:true — 반복된 세계 사본으로 이동해도 마커가 사라지지 않게
  // 원래 사본으로 매끄럽게 되돌리는 Leaflet 정식 기능.
});

// 줌 컨트롤을 좌측 하단에 직접 추가한다 (zoomControl:false로 기본값을 끄고
// 이걸로 대체). 기존엔 기본 위치(topleft)를 CSS로 우측 상단 쪽으로 강제
// 이동시켰는데(top:300px right:12px !important), 검색 UI 개선으로 범례·
// 레이어 토글이 우측 상단에 세로로 길게 쌓이게 되면서 그 자리와 겹칠
// 위험이 생겼다. CSS 강제 대신 Leaflet 네이티브 위치 옵션을 써서, 우측
// 컬럼과 완전히 분리된 좌측 하단에 둔다 — 충돌 가능성을 구조적으로 없앤다.
L.control.zoom({ position:'bottomleft' }).addTo(map);

// 검색 등으로 특정 영역에 초점을 맞춘 뒤(map.fitBounds(...)), 검색을 해제하면
// 이 초기 시야로 되돌리기 위한 헬퍼.
// ── 다음 단계(검색 기능 구현 시) 권장 사용법 ──
//   검색 결과가 있을 때:  map.fitBounds(결과 마커들의 LatLngBounds)
//     예) "뉴욕" 검색 → 뉴욕 좌표 중심으로 이동
//         "태평양전쟁" 검색 → 동아시아~태평양을 포함하는 LatLngBounds로 fitBounds
//   검색을 해제할 때:    resetToInitialView()
// 즉 "초기 화면 = 역사 아틀라스 / 검색 화면 = 데이터 중심 자동 이동"을
// 명확히 분리한다. 검색 기능 자체는 아직 구현돼 있지 않다.
function resetToInitialView(){
  map.setView(INITIAL_MAP_VIEW.center, INITIAL_MAP_VIEW.zoom);
}

// iOS Safari/WebView에서 지도 컨테이너 크기가 0×0으로 계산되는 문제 방지.
// app.js의 window.onload에서도 한 번 더 호출되며, 여기서는 1차 보정.
setTimeout(()=>{ map.invalidateSize(); }, 800);

// ── GA4: 지도 조작(줌·드래그) 트래킹 ──
// 기존 zoomend 리스너(아래, 밀도 재계산용)와는 독립된 별도 리스너다 —
// Leaflet은 같은 이벤트에 리스너를 여러 개 등록해도 서로 간섭하지
// 않으므로, 기존 로직은 한 글자도 건드리지 않고 트래킹만 얹었다.
(function () {
  let lastZoom = map.getZoom();
  map.on('zoomend', () => {
    const z = map.getZoom();
    if (window.trackMapInteraction) {
      window.trackMapInteraction(z > lastZoom ? 'zoom_in' : (z < lastZoom ? 'zoom_out' : 'zoom_end'));
    }
    lastZoom = z;
  });
  map.on('dragend', () => {
    if (window.trackMapInteraction) window.trackMapInteraction('drag');
  });
})();

// 줌 레벨에 따른 사건 밀도 제어 (importance 연동 — validator.js의 getImportance 참고)
// renderer.js 로드가 끝난 뒤에야 safeRender가 존재하므로, 실제 호출은 항상
// 사용자 인터랙션(줌 변경) 이후에 일어나 안전하다.
map.on('zoomend', ()=>{
  // 검색이 활성 상태일 때는 챕터 렌더로 되돌리지 않는다 — 검색 결과를
  // fitBounds/setView로 화면에 맞추는 과정에서도 zoomend가 발생하는데,
  // 이때 renderCurrentChapter()를 그대로 부르면 검색 결과가 즉시 사라진다.
  // 루트가 열려있을 때도 동일한 이유로 제외한다.
  const routeActive = typeof getActiveRouteId === 'function' && getActiveRouteId();
  if (!routeActive && !(typeof isSearchActive === 'function' && isSearchActive())) {
    if (typeof renderCurrentChapter === 'function') renderCurrentChapter();
  }
  // 줌 레벨 변화로 minZoom 기준 지명(예: 독도)의 표시 여부가 바뀔 수 있으므로
  // 라벨도 같이 갱신한다. renderHistoricalLabels는 HISTORICAL_LABELS_ENABLED가
  // false면 내부에서 즉시 반환되어 무해하다.
  if (typeof renderHistoricalLabels === 'function' && typeof currentReignRange === 'function') {
    renderHistoricalLabels(currentReignRange()[0], map.getZoom());
  }
});

// ── 배경 타일 — MAP_MODE.current에 따라 실제로 분기 ──
// legacy: dark_all(라벨 포함) + 가리개 + 직접 라벨 2개(동해/독도)
// world:  dark_nolabels(라벨 없음) + 가리개 없음 — 지명은 historicalLabels.js가 전담
// ⚠ world 모드는 이번 스프린트에서 "전환 가능한 구조"만 검증 대상이다.
//   dark_nolabels 타일이 실제 브라우저에서 정상 응답하는지는 이 작업
//   환경(cartocdn.com 네트워크 차단)에서 확인하지 못했다. MAP_MODE.current를
//   'world'로 바꿔 실행하는 것은 사용자가 직접 브라우저에서 시도해야 한다.
const activeTileUrl = MAP_MODE[MAP_MODE.current].tile;
L.tileLayer(activeTileUrl, {
  maxZoom:11,
  subdomains:'abcd',
  crossOrigin:true,
  errorTileUrl:''
  // noWrap 제거됨 — Leaflet 기본 세계 wrap 사용. 가로로 계속 이동하면 타일이
  // 자연스럽게 반복되어 동/서 양방향 모두 끊김 없이 이동 가능하다.
}).addTo(map);

// ═══════════════════════════════════════════════════════
// 동해/독도 표기 보정 — MAP_MODE에 따라 구현 방식이 갈린다.
// ═══════════════════════════════════════════════════════
// legacy 모드: 타일에 라벨이 있으므로 가리개(seaLabelMask)가 필요하다.
//   이 가리개의 좌표 범위(39.0~41.0°N, 129.8~133.2°E)는 스크린샷 1장을
//   보고 역산한 값이며, 모든 줌 레벨에서 검증되지 않았다 — 여전히
//   "회피"이지 "해결"이 아니다.
// world 모드: 타일에 라벨이 없으므로(검증 전 가정) 가리개 자체가 불필요.
//   동해/독도 표시는 js/historicalLabels.js의 PLACES_MIN(east_sea, dokdo)이
//   전담하며, 이 파일(map.js)은 더 이상 라벨을 직접 그리지 않는다.
//
// feature flag로 분리한 이유: MAP_MODE를 'world'로 바꿔도 historicalLabels.js
// 쪽의 HISTORICAL_LABELS_ENABLED가 false이면 동해/독도가 아예 안 그려지는
// 상태가 될 수 있다. 이 경우를 대비해 legacy 전용 코드는 MAP_MODE가
// 'legacy'일 때만 실행되도록 명확히 분기해, "world로 바꿨는데 가리개도
// 없고 라벨도 없어서 일본해가 그대로 노출되는" 사고를 방지한다.
// ═══════════════════════════════════════════════════════

let seaLabelMask = null;
let dongHaeLabel = null;
let dokdoMarker = null;

if (MAP_MODE.current === 'legacy') {
  seaLabelMask = L.rectangle(
    [[39.0, 129.8], [41.0, 133.2]],
    { color: 'transparent', weight: 0, fillColor: '#3a3f42', fillOpacity: 1, interactive: false }
  ).addTo(map);

  dongHaeLabel = L.marker([39.8, 131.5], {
    icon: L.divIcon({
      className: '',
      iconSize: [0,0],
      html: '<div style="white-space:nowrap; transform:translate(-50%,-50%); font-size:13px; letter-spacing:4px; color:rgba(180,200,220,0.85); text-shadow:0 0 6px rgba(10,20,30,0.9), 0 0 3px rgba(10,20,30,0.9); pointer-events:none; font-weight:500;">동해 East Sea</div>'
    }),
    interactive: false,
    zIndexOffset: 50
  }).addTo(map);

  dokdoMarker = L.marker([37.2417, 131.8639], {
    icon: L.divIcon({
      className: '',
      iconSize: [10,10],
      iconAnchor: [5,5],
      html: '<div style="width:6px;height:6px;border-radius:50%;background:#e8e0d0;border:1px solid rgba(0,0,0,0.4);box-shadow:0 0 4px rgba(232,224,208,0.8);"></div>'
    }),
    zIndexOffset: 100
  }).addTo(map);
  dokdoMarker.bindTooltip('독도 Dokdo', {
    permanent: false, direction: 'top', offset: [0,-6],
    className: 'dokdo-tooltip'
  });
}
// MAP_MODE.current === 'world'인 경우 위 블록은 실행되지 않는다.
// 이때 동해/독도 표시 책임은 historicalLabels.js로 완전히 넘어간다.
// 단, 그쪽의 HISTORICAL_LABELS_ENABLED가 false인 채로 두면 아무것도
// 그려지지 않으므로, world 모드로 전환할 때는 반드시 그 플래그도
// true로 같이 바꿔야 한다 — 이 의존관계는 자동으로 강제되지 않는다 (기술 부채).
