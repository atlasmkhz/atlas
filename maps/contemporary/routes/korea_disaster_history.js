// routes/korea_disaster_history.js — 대한민국 재난사 루트
// 1994~2024, 압축 성장의 그늘에서 반복된 대형 참사와, 그때마다
// 제기됐던 "안전 불감증"이라는 지적을 시대순으로 잇는 루트.
//
// card_ref 메모: 이 루트의 여섯 사건 모두 이미 카드가 있어 연결했다
// (성수대교 disaster_1994_01, 삼풍백화점 disaster_1995_02, 씨랜드
// disaster_1999_01, 대구지하철 disaster_2003_01, 세월호
// disaster_2014_01, 이태원 disaster_2022_01). 이 루트는 새 서술을
// 추가하기보다, 이미 서술된 참사들을 하나의 흐름으로 연결하는 데
// 초점을 맞췄다.
//
// 서술 원칙: 각 사건의 구체적 피해 양상을 자극적으로 묘사하지 않고,
// 사건의 배경·원인·이후 제도적 변화를 중심으로 간결하게 서술했다.
// 유가족과 생존자를 고려해 통계와 사실관계 위주로 접근했다.

const ROUTE_KOREA_DISASTER_HISTORY = {
  id: 'korea_disaster_history',
  name: '대한민국 재난사 루트',
  subject_type: 'event',
  period: '1994~2024',
  tagline: '반복된 참사, 그때마다 물었던 "왜 막지 못했는가"',
  color: '#4a4a4a',
  total_waypoints: 9,
  hero_image: 'assets/images/route/route_korea_disaster_history_hero.webp',

  card_refs: ['disaster_1994_01', 'disaster_1995_02', 'disaster_1999_01', 'disaster_2003_01', 'disaster_2014_01', 'disaster_2022_01', 'disaster_2023_01', 'disaster_2024_01'],

  waypoints: [

    {
      id: 'wp_01',
      type: 'political',
      year: 1994, month: null, day: null,
      title_ko: '압축성장의 그늘 — 왜 하필 1990년대인가',
      place_ko: '서울',
      lat: 37.5665, lng: 126.9780,
      stay: null,
      summary_ko: '한국전쟁 이후 폐허에서 세계 10위권 경제로 성장하기까지, 속도를 앞세운 건설·안전 관행이 겉으로 드러나지 않은 채 누적돼 있었다. 1994년부터 이어지는 일련의 대형 참사는 우연히 겹친 사고가 아니라, 압축 성장기에 쌓인 부실 시공·관리 부실·안전 규정 미비가 한꺼번에 드러난 결과였다는 것이 사회적으로 공유된 반성이다.',
      card_ref: null,
    },

    {
      id: 'wp_02',
      type: 'political',
      year: 1994, month: 10, day: 21,
      title_ko: '성수대교 붕괴',
      place_ko: '서울(한강)',
      lat: 37.5308, lng: 127.0198,
      stay: null,
      summary_ko: '출근길 한강 다리 상판이 무너지며 등교하던 학생들을 포함한 시민들이 희생됐다. 부실 시공과 오랜 기간 방치된 유지·보수 부실이 원인으로 드러나며, 사회 전체에 "우리가 딛고 선 기반 시설이 안전하다는 전제 자체가 흔들렸다"는 충격을 안겼다.',
      card_ref: 'disaster_1994_01',
    },

    {
      id: 'wp_03',
      type: 'political',
      year: 1995, month: 6, day: 29,
      title_ko: '삼풍백화점 붕괴',
      place_ko: '서울(서초구)',
      lat: 37.5041, lng: 127.0161,
      stay: null,
      summary_ko: '설계 변경과 부실 시공, 안전 경고 무시가 겹치며 대형 백화점 건물이 통째로 무너졌다. 성수대교 붕괴 8개월 만에 벌어진 이 참사로, 한국 사회에서 "안전 불감증"이라는 말이 본격적으로 쓰이기 시작했다.',
      card_ref: 'disaster_1995_02',
    },

    {
      id: 'wp_04',
      type: 'death',
      year: 1999, month: 6, day: 30,
      title_ko: '씨랜드 청소년수련원 화재',
      place_ko: '경기 화성',
      lat: 37.1996, lng: 126.8312,
      stay: null,
      summary_ko: '유치원생들이 참가한 여름캠프 숙소에서 화재가 발생해 어린 생명들이 희생됐다. 소방·안전 점검이 제대로 이뤄지지 않은 가설 건축물에서 벌어진 이 참사는, 성인 중심으로 진행되던 안전 논의가 아동·청소년 시설로까지 확대되는 계기가 됐다.',
      card_ref: 'disaster_1999_01',
    },

    {
      id: 'wp_05',
      type: 'death',
      year: 2003, month: 2, day: 18,
      title_ko: '대구 지하철 참사',
      place_ko: '대구',
      lat: 35.8714, lng: 128.6014,
      stay: null,
      summary_ko: '한 개인의 방화로 시작된 불이 지하철 객차의 가연성 내장재를 타고 급속히 번지며 다수의 인명 피해로 이어졌다. 이 사건 이후 지하철 차량 내장재를 불연성 소재로 교체하는 등 전국 도시철도의 화재 안전 기준이 전면적으로 강화됐다.',
      card_ref: 'disaster_2003_01',
    },

    {
      id: 'wp_06',
      type: 'death',
      year: 2014, month: 4, day: 16,
      title_ko: '세월호 참사',
      place_ko: '전남 진도(맹골수도)',
      lat: 34.0219, lng: 125.9489,
      stay: null,
      summary_ko: '수학여행길에 오른 단원고 학생들을 포함해 수백 명이 탄 여객선이 전복돼 침몰했다. 과적과 무리한 구조 변경이라는 선박 자체의 문제에 더해, 초기 구조 실패와 컨트롤타워 부재라는 국가 재난 대응 시스템의 총체적 부실이 함께 드러나며 한국 사회 전반에 깊은 성찰을 요구한 사건으로 남았다. 이후 국민안전처 신설 등 재난 대응 체계 개편으로 이어졌다.',
      card_ref: 'disaster_2014_01',
    },

    {
      id: 'wp_07',
      type: 'death',
      year: 2022, month: 10, day: 29,
      title_ko: '이태원 참사',
      place_ko: '서울(용산구 이태원)',
      lat: 37.5347, lng: 126.9945,
      stay: null,
      summary_ko: '핼러윈을 맞아 좁은 골목에 인파가 대거 몰리며 다중 인파 밀집 사고가 발생했다. 대형 건축물이나 교통수단의 구조적 결함이 아니라 축제성 인파 관리 부재가 원인이었다는 점에서, 이전의 참사들과는 다른 유형의 재난 관리 공백을 드러냈다. 이는 대형 인파가 예상되는 행사에 대한 국가·지자체의 안전관리 책임 범위를 어디까지로 볼 것인가라는 논쟁으로 이어졌다.',
      card_ref: 'disaster_2022_01',
    },

    {
      id: 'wp_08',
      type: 'death',
      year: 2023, month: 7, day: 15,
      title_ko: '오송 지하차도 참사',
      place_ko: '충북 청주(오송)',
      lat: 36.6247, lng: 127.3132,
      stay: null,
      summary_ko: '집중호우로 인근 미호강의 임시 제방이 무너지며 지하차도가 순식간에 침수돼 차량에 타고 있던 시민들이 희생됐다. 홍수경보에도 도로가 통제되지 않았고 신고가 잇따랐음에도 기관 간 대응이 엇갈렸다는 점에서, 기후위기 시대의 극한호우 앞에 재난 대응 체계의 연결고리가 어디서 끊어지는지를 드러낸 사건이었다. 이후 지하차도 진입 차단시설 설치 등 침수 대비 기준이 강화됐다.',
      card_ref: 'disaster_2023_01',
    },

    {
      id: 'wp_09',
      type: 'death',
      year: 2024, month: 12, day: 29,
      title_ko: '무안 제주항공 참사',
      place_ko: '전남 무안(무안국제공항)',
      lat: 34.9914, lng: 126.3828,
      stay: null,
      summary_ko: '방콕발 여객기가 조류 충돌 뒤 동체착륙을 시도하다 활주로 끝의 콘크리트 둔덕과 충돌해, 국내에서 발생한 항공 사고 가운데 최대 인명 피해를 낳았다. 조류 충돌이라는 촉발 원인 못지않게 "부서지기 쉬운 구조여야 할 시설이 왜 콘크리트 둔덕이었는가"라는 물음이 제기되며, 30년 재난사가 반복해 물어온 질문 — 사고는 우연이라도 피해의 규모는 제도가 결정한다 — 이 다시 확인됐다. 전국 공항의 항행안전시설 개선이 뒤따랐다.',
      card_ref: 'disaster_2024_01',
    },

  ],
};

window.registerRoute(ROUTE_KOREA_DISASTER_HISTORY);
