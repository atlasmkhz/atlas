// ═══════════════════════════════════════════════════════
// places/places_min.js — 최소 검증용 지명 데이터
// 목적: "지도가 외부 지명 없이 동작 가능한 구조인가"를 검증하기 위한
//       최소 샘플 3개. 시대별 전체 지명 데이터가 아니다.
// 금지된 범위: 1940년대 전체 고증, 줌레벨별 수백 개 지명 — 이번 스프린트
//             대상 아님. docs/roadmap.md 참고.
// ═══════════════════════════════════════════════════════

const PLACES_MIN = [
  {
    id: 'east_sea',
    lat: 39.8, lng: 131.5,
    display_name: '동해',
    current_name: '동해',
    aliases: ['East Sea'],
    from: null, until: null,     // 시대 무관 — 항상 표시
    category: 'sea',
    importance: 'major',
    notes: '외부 타일(Carto 등)이 "日本海/Sea of Japan"으로 표기하는 문제에 대한 프로젝트 직접 렌더링 사례. 시대와 무관하게 항상 이 명칭만 사용한다.'
  },
  {
    id: 'dokdo',
    lat: 37.2417, lng: 131.8639,
    display_name: '독도',
    current_name: '독도',
    aliases: ['Liancourt Rocks', 'Dokdo'],
    from: null, until: null,
    minZoom: 8,                  // 줌 8 미만(전체 동아시아 시야)에서는 숨김.
                                  // 줌 8 이상(울릉도 인근까지 확대)에서만 작은 점 + "독도" 한글만 표시.
                                  // 전체 화면에서 크게 떠 있는 라벨로 부각시키지 않고,
                                  // 실제 위치를 찾아 확대했을 때 보이는 방식으로 표현한다.
    category: 'island',
    importance: 'major',
    notes: '대한민국 국토지리정보원 공식 좌표. 외부 타일에 표기되지 않으므로 항상 직접 렌더링. 단, 전체 화면에서는 노출하지 않고 줌인 시에만 표시(minZoom).'
  },
  {
    id: 'gyeongseong',
    lat: 37.5665, lng: 126.9780,
    display_name: '경성',
    current_name: '서울',
    aliases: ['漢城', 'Keijo', 'Hanseong'],
    from: 1910, until: 1945,     // 일제강점기 한정 — 이 기간 밖에서는 표시 안 함 (구조 검증용 예시)
    category: 'city',
    importance: 'major',
    notes: '시대별 지명 전환의 예시 1건. 1910~1945 범위 안에서만 "경성"으로 표시되도록 from/until을 둔다는 스키마 설계 검증용. 이번 스프린트는 이 1건만 구현하며, 1940년대 전체 도시 고증은 범위 밖이다.'
  }
];

if (typeof module !== 'undefined') module.exports = PLACES_MIN;
