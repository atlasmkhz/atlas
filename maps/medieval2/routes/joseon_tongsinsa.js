// routes/joseon_tongsinsa.js — 조선통신사 루트
// 1607~1811, 임진왜란 이후 단절된 조일 관계를 회복하고 200년 가까이
// 이어진 평화 외교의 역사를 담은 루트.
//
// card_ref 메모: 통신사 파견과 기유약조(diplomacy_1609_01)는 이미
// 카드가 있어 연결했다. 나머지는 루트 전용으로 새로 작성했다.

const ROUTE_JOSEON_TONGSINSA = {
  id: 'joseon_tongsinsa',
  name: '조선통신사 루트',
  subject_type: 'movement',
  period: '1607~1811',
  tagline: '전쟁의 상처를 넘어, 200년 가까이 이어진 평화 외교',
  color: '#2e6b6b',
  total_waypoints: 8,
  hero_image: 'assets/images/route/route_joseon_tongsinsa_hero.webp',

  card_refs: ['diplomacy_1609_01'],

  waypoints: [

    {
      id: 'wp_01',
      type: 'diplomacy',
      year: 1607, month: null, day: null,
      title_ko: '첫 통신사 파견 — 전쟁을 끝내고 국교를 다시 잇다',
      place_ko: '일본 교토',
      lat: 35.0116, lng: 135.7681,
      stay: null,
      summary_ko: '임진왜란이 끝난 지 9년, 새로 들어선 에도 막부의 도쿠가와 이에야스가 쇼군의 권위를 국제적으로 인정받고자 조선에 국교 재개를 요청했다. 조선은 일본의 재침 가능성을 경계하면서도, 전쟁 중 끌려간 포로 송환을 우선 과제로 삼아 이를 받아들여 첫 통신사를 파견했다. 이후 1811년까지 총 12차례에 걸쳐 통신사가 오가며 200년 가까운 평화 관계의 틀이 마련됐다.',
      card_ref: 'diplomacy_1609_01',
    },

    {
      id: 'wp_02',
      type: 'diplomacy',
      year: 1609, month: null, day: null,
      title_ko: '기유약조 — 부산 왜관, 제한된 창구를 열다',
      place_ko: '부산',
      lat: 35.1796, lng: 129.0756,
      stay: null,
      summary_ko: '조선은 부산에 왜관을 다시 설치하고 대마도(쓰시마)를 매개로 한 제한적 무역을 허용하는 기유약조를 체결했다. 일본에 파견되는 배(세견선)의 수를 엄격히 제한해 교역 규모를 통제했는데, 이는 전면적 개방이 아니라 안전판을 갖춘 관리된 교류였다는 점에서 이후 통신사 외교의 성격을 잘 보여준다.',
      card_ref: null,
    },

    {
      id: 'wp_03',
      type: 'life',
      year: 1636, month: null, day: null,
      title_ko: '통신사 행렬 — 500명 규모의 대이동',
      place_ko: '부산',
      lat: 35.1796, lng: 129.0756,
      stay: null,
      summary_ko: '통신사 일행은 정사·부사·종사관을 중심으로 한 삼사(三使)를 필두로 통역관·의원·화원·악공까지 아우르는 400~500명 규모의 대규모 사절단이었다. 부산에서 배로 대마도를 거쳐 일본 각지를 육로로 이동해 에도(도쿄)까지 왕복하는 데 반년 가까이 걸리는 대장정이었으며, 연도의 일본 백성들에게는 이국 문물을 접하는 큰 구경거리이기도 했다.',
      card_ref: null,
    },

    {
      id: 'wp_04',
      type: 'life',
      year: 1682, month: null, day: null,
      title_ko: '문화 교류의 현장 — 필담과 시문 창화',
      place_ko: '일본 오사카',
      lat: 34.6937, lng: 135.5023,
      stay: null,
      summary_ko: '통신사가 머무는 숙소마다 일본의 유학자·문인들이 몰려들어 한문 필담으로 대화하고 시를 주고받는 "시문 창화"가 성행했다. 조선 문사의 글씨와 시를 받는 것이 일본 지식인 사회에서는 대단한 영예로 여겨졌으며, 이 과정에서 조선의 성리학과 문예가 일본 학계에 실질적인 영향을 끼쳤다.',
      card_ref: null,
    },

    {
      id: 'wp_05',
      type: 'life',
      year: 1711, month: null, day: null,
      title_ko: '아라이 하쿠세키와 대우 논쟁 — 대등한 외교를 향한 신경전',
      place_ko: '일본 에도(도쿄)',
      lat: 35.6762, lng: 139.6503,
      stay: null,
      summary_ko: '에도 막부의 유학자 아라이 하쿠세키는 통신사에 대한 과도한 접대 비용을 줄이고 국서(國書) 형식에서 쇼군의 격을 조선 국왕과 대등하게 조정하려 했다. 이는 통신사가 단순한 의례가 아니라, 조선과 일본 두 나라가 서로의 위상을 놓고 끊임없이 조율하는 실질적 외교의 장이었음을 보여주는 사례다.',
      card_ref: null,
    },

    {
      id: 'wp_06',
      type: 'life',
      year: 1748, month: null, day: null,
      title_ko: '조선 문물의 일본 전파 — 의학·회화·인쇄술',
      place_ko: '일본 각지',
      lat: 35.6762, lng: 139.6503,
      stay: null,
      summary_ko: '통신사에 동행한 의원들은 일본 의사들과 처방을 교환하며 조선 한의학의 지식을 전했고, 수행 화원들의 그림은 일본 화단에 영향을 끼쳤다. 통신사가 가져간 서적과 인쇄 기술도 일본의 학문 발전에 기여해, 통신사행은 외교 사절이자 동시에 대규모 문화 교류 프로젝트였다.',
      card_ref: null,
    },

    {
      id: 'wp_07',
      type: 'political',
      year: 1811, month: null, day: null,
      title_ko: '마지막 통신사 — 대마도까지만 간 역지통신',
      place_ko: '대마도(쓰시마)',
      lat: 34.2, lng: 129.3,
      stay: null,
      summary_ko: '재정난에 시달리던 에도 막부는 통신사 접대 비용을 줄이고자, 사행 장소를 에도가 아닌 대마도로 옮기는 "역지통신(易地通信)"을 요청했다. 12번째이자 마지막 통신사는 결국 대마도까지만 가는 데 그쳤는데, 이는 200년 가까이 이어진 통신사 제도가 사실상 축소·종료되는 신호였다.',
      card_ref: null,
    },

    {
      id: 'wp_08',
      type: 'political',
      year: 1876, month: null, day: null,
      title_ko: '통신사 시대의 종언 — 강화도조약과 다른 시대의 시작',
      place_ko: '강화도',
      lat: 37.7466, lng: 126.4874,
      stay: null,
      summary_ko: '1811년 이후 정식 통신사 파견은 재개되지 못한 채, 65년 뒤 조선은 일본 군함의 무력시위 앞에서 불평등조약인 강화도조약을 맺게 된다. 대등한 외교 사절을 주고받던 통신사 시대와 달리, 이때의 일본은 이미 메이지유신을 거쳐 근대 국민국가이자 제국주의 세력으로 탈바꿈해 있었다. 200년 가까이 이어진 평화 교류의 역사는 그렇게 막을 내리고, 조선은 전혀 다른 힘의 질서 앞에 서게 된다.',
      card_ref: null,
    },

  ],
};

window.registerRoute(ROUTE_JOSEON_TONGSINSA);
