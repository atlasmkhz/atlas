// ═══════════════════════════════════════════════════════
// markerIcons.js — 유형(type) 기반 SVG 아이콘 마커
// 의존: app.js (COLORS)
// 원칙 (지시서 그대로):
//   - 새 데이터 필드를 만들지 않는다. 아이콘은 오직 기존 e.type에서 결정.
//   - 이모지 직접 사용 금지 → 인라인 SVG path로만 그린다.
//   - 형태(실루엣)로 의미를 구분한다. 색은 기존 다크테마 COLORS를 유지하되
//     보조 역할 — 줌 아웃이나 색맹 상황에서도 형태로 식별되도록 단순하게.
//   - 인물 얼굴/건물 일러스트 금지 → 전부 단색 픽토그램.
//   - SVG 문자열은 이 파일 로드 시 한 번만 정의된다(캐싱). 마커마다 새로
//     만드는 건 24×24 path 한 줄을 색만 바꿔 문자열 조립하는 수준이라
//     266개 기준 성능 문제 없음.
// ═══════════════════════════════════════════════════════

// 각 type의 24x24 viewBox 안에 그릴 SVG 내부 path(들).
// currentColor를 쓰면 바깥 div의 color를 상속받아 한 번에 색을 입힐 수 있다.
// 모든 도형은 (12,12) 중심 기준으로 시각 무게를 맞췄다.
const MARKER_SVG = {
  // 전투 — 교차된 두 칼
  battle: '<path d="M5 5l9 9m0-9l-9 9" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" fill="none"/><circle cx="17" cy="17" r="1.6" fill="currentColor"/>',
  // 정치·언론 — 깃대 위 깃발
  political: '<path d="M7 4v16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M7 5h9l-2.2 3L16 11H7z" fill="currentColor"/>',
  // 학살 — 불꽃
  massacre: '<path d="M12 3c1 3.5 4.5 4.5 4.5 8.5A4.5 4.5 0 0 1 12 16a4.5 4.5 0 0 1-4.5-4.5C7.5 8 10 7 12 3z" fill="currentColor"/><path d="M12 21v-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  // 인물 — 사람 픽토그램 (얼굴 아님)
  person: '<circle cx="12" cy="8" r="3.4" fill="currentColor"/><path d="M5.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6z" fill="currentColor"/>',
  // 민중운동 — 군중(여러 점)
  movement: '<circle cx="8" cy="8.5" r="2.3" fill="currentColor"/><circle cx="16" cy="8.5" r="2.3" fill="currentColor"/><circle cx="12" cy="13" r="2.3" fill="currentColor"/><path d="M4.5 19c0-2.3 1.7-3.6 3.5-3.6M19.5 19c0-2.3-1.7-3.6-3.5-3.6M8 20c0-2.4 1.8-3.8 4-3.8s4 1.4 4 3.8" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/>',
  // 이동 — 경로 화살표 (망명뿐 아니라 한국전쟁의 군대 이동·피난민 행렬도 포괄)
  migration: '<path d="M4 16c3-7 9-9 14-9" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M14 4l4 3-4 3" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="4" cy="16" r="1.8" fill="currentColor"/>',
  // 조직 결성 — 마름모 결정체
  organization: '<path d="M12 3l7 9-7 9-7-9z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M12 8l3.2 4-3.2 4-3.2-4z" fill="currentColor"/>',
  // 정책 — 문서 위 도장(공식 행정·제도)
  policy: '<rect x="5" y="3.5" width="11" height="14" rx="1" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M7.5 7h6M7.5 10h6M7.5 13h3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="17" cy="17" r="4" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M15.3 17l1.2 1.2 2.2-2.4" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  // 공작·조작 — 가려진 눈(은밀한 감시·날조)
  plot: '<path d="M3 12c2.6-4 6-6 9-6s6.4 2 9 6c-2.6 4-6 6-9 6s-6.4-2-9-6z" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="12" cy="12" r="2.6" fill="currentColor"/><path d="M4 6l16 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  // 외교 — 악수(두 호가 맞닿는 형태, 양국 관계)
  diplomacy: '<path d="M4 13l5-1 3 2 3-2 5 1" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6" cy="8" r="2.2" fill="currentColor"/><circle cx="18" cy="8" r="2.2" fill="currentColor"/><path d="M6 10.2v2.4M18 10.2v2.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  // 경제·산업 — 위로 향하는 막대그래프(성장)
  economic: '<rect x="4.5" y="14" width="3.6" height="6" fill="currentColor"/><rect x="10.2" y="9.5" width="3.6" height="10.5" fill="currentColor"/><rect x="15.9" y="4.5" width="3.6" height="15.5" fill="currentColor"/>',
  // 과학기술 — 원자 궤도(공유 결합·연구를 상징)
  science: '<circle cx="12" cy="12" r="2.2" fill="currentColor"/><ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" stroke-width="1.6" fill="none"/><ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" stroke-width="1.6" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" stroke-width="1.6" fill="none" transform="rotate(120 12 12)"/>',
  // 문화 — 무대 마스크/음표 대신 별 모양(대중문화·예술의 산뜻한 상징)
  culture: '<path d="M12 3.5l2.4 5.2 5.6.6-4.2 3.8 1.2 5.6-4.8-3-4.8 3 1.2-5.6-4.2-3.8 5.6-.6z" fill="currentColor"/>'
};

// 알 수 없는 type을 위한 기본 도형(점). 데이터에 없는 type이 들어와도
// 마커가 사라지지 않게 안전망을 둔다.
const MARKER_SVG_FALLBACK = '<circle cx="12" cy="12" r="6" fill="currentColor"/>';

function getMarkerSvgInner(type){
  return MARKER_SVG[type] || MARKER_SVG_FALLBACK;
}

// 마커 한 개의 HTML 문자열을 만든다.
//   type    : 사건 유형 (아이콘 모양 결정)
//   color   : 채움색 (기존 COLORS[type]을 그대로 넘김)
//   opacity : 생명주기 감쇠 등으로 흐리게 (기본 1)
//   pulse   : 당해 연도/검색 결과 강조용 펄스 링 (기본 false)
// 반환 HTML은 L.divIcon의 html로 들어간다. .atlas-marker 래퍼에 CSS가
// hover 확대·선택 링·펄스를 입힌다.
function buildMarkerHtml(type, { color, opacity = 1, pulse = false } = {}){
  const inner = getMarkerSvgInner(type);
  const pulseDiv = pulse
    ? `<span class="atlas-marker-pulse" style="background:${color};"></span>`
    : '';
  return `<div class="atlas-marker" style="color:${color};opacity:${opacity};">`
       + pulseDiv
       + `<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">${inner}</svg>`
       + `</div>`;
}

// ── 세계 사건 중심 마커(◉) — 지시문 v5 ──
// 한국 마커(단색 픽토그램, 선명)와 시각적으로 구분되는 보조 마커.
// 더 크고(◉ 이중 링), 채도 낮은 보조색을 그대로 받아 반투명하게 그린다.
// intensity(0~1)는 기간 내 강도(시작·종료 약함, 중간 강함)를 반영해
// 투명도를 조절한다. 한국 마커를 가리지 않도록 항상 옅게 유지한다.
function makeWorldMarkerIcon(color, intensity = 1){
  const op = (0.35 + 0.4 * Math.max(0, Math.min(1, intensity))).toFixed(2); // 0.35~0.75
  const html =
    `<div class="world-marker" style="color:${color};opacity:${op};">`
    + `<svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">`
    +   `<circle cx="20" cy="20" r="15" fill="currentColor" fill-opacity="0.12"/>`
    +   `<circle cx="20" cy="20" r="11" stroke="currentColor" stroke-width="1.6" fill="none" opacity="0.7"/>`
    +   `<circle cx="20" cy="20" r="3.4" fill="currentColor"/>`
    + `</svg>`
    + `</div>`;
  return L.divIcon({
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    html
  });
}

// L.divIcon 생성 헬퍼 — renderer.js / search.js 양쪽에서 동일하게 사용.
function makeMarkerIcon(type, opts){
  return L.divIcon({
    className: '',          // Leaflet 기본 클래스 제거 (우리 .atlas-marker로 대체)
    iconSize: [28, 28],
    iconAnchor: [14, 14],   // 중심 정렬
    popupAnchor: [0, -12],
    html: buildMarkerHtml(type, opts)
  });
}

// 마커에 "선택 외곽 링" 동작을 붙인다. 팝업이 열리면 그 마커의 .atlas-marker
// 요소에 .atlas-selected를 토글한다. declutter가 마커 위치를 옮겨도, 이
// 핸들러는 이벤트 발생 시점에 m._icon을 새로 읽으므로 안전하다.
// renderer.js / search.js 양쪽 마커 생성 직후에 호출한다.
// ── 선택 링 ──
// 정보창(infoPanel)이 열린 마커를 강조한다. 예전엔 popupopen/close 이벤트에
// 의존했지만, 정보창 도입 후엔 renderer가 직접 setSelectRing/clearSelectRing을
// 호출한다. 현재 선택된 마커를 모듈 변수로 추적해 한 번에 하나만 강조한다.
let _selectedMarker = null;
function setSelectRing(m){
  clearSelectRing();
  _selectedMarker = m;
  const el = m && m._icon && m._icon.querySelector('.atlas-marker');
  if(el) el.classList.add('atlas-selected');
}
function clearSelectRing(){
  if(_selectedMarker){
    const el = _selectedMarker._icon && _selectedMarker._icon.querySelector('.atlas-marker');
    if(el) el.classList.remove('atlas-selected');
    _selectedMarker = null;
  }
}
// 하위호환: 기존 호출부가 남아 있어도 안전하도록 빈 함수로 유지.
function attachSelectRing(m){ /* 정보창 방식에서는 클릭 시 setSelectRing으로 처리 */ }

// ── 범례 자동 생성 ──
// 범례 항목을 정적 HTML로 박아두지 않고, 마커와 똑같은 MARKER_SVG·COLORS·
// TYPE_LABEL(app.js)에서 그대로 읽어 만든다. 이렇게 하면 아이콘 모양이나
// 색이 바뀔 때 범례를 따로 손볼 필요가 없다 — 항상 실제 마커와 일치한다.
// COLORS 객체 선언 순서(app.js)가 그대로 범례 표시 순서가 된다.
function renderLegend(){
  const el = document.getElementById('legendItems');
  if(!el || typeof COLORS === 'undefined' || typeof TYPE_LABEL === 'undefined') return;
  el.innerHTML = Object.keys(COLORS).map(type=>{
    const color = COLORS[type];
    const label = TYPE_LABEL[type] || type;
    const inner = getMarkerSvgInner(type);
    return `<div class="legend-item">`
         + `<span class="legend-icon" style="color:${color};"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">${inner}</svg></span>`
         + `${label}</div>`;
  }).join('');
}
// app.js(COLORS/TYPE_LABEL)는 이 스크립트보다 먼저 로드되므로 즉시 호출해도 안전.
renderLegend();
