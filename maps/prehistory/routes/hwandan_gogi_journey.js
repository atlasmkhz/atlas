// routes/hwandan_gogi_journey.js — 환단고기 대장정 루트
// 자료실 「환단고기, 어떻게 읽을 것인가」(hwandan_gogi) 시리즈와 연동되는
// 선사시대 지도 두 번째 루트. 2026-07-12, 왕두목 요청으로 신설 —
// "자료실은 진입 경로가 약하니, 루트를 미끼로 자료실 글까지 이어지게
// 하자"는 방향에 따라 만들었다 (양자역학 100년 루트와 같은 패턴).
//
// 웨이포인트 선정 기준: 시리즈 16편 중 메타/서지 성격의 글
// (hd_01 프롤로그, hd_02 편찬 경위, hd_12~14 위서 논쟁, hd_16 에필로그)은
// "책 자체에 대한 논의"라 지리적 여정에 넣기 어색해 제외했다. 실제
// 기록상 강역·도읍을 따라가는 hd_03~hd_10과, "이 전승이 실제 역사에
// 남긴 흔적"을 보여주는 hd_15(대종교·청산리)만 골라 9개 지점의
// 시간순 여정으로 엮었다.
//
// 정확성 메모: 이 루트가 다루는 모든 지점·연대는 환단고기 기록상의
// 전승이며, 학계 다수설은 이 책을 20세기 저작(위서)으로 본다. 위서
// 논쟁 자체는 자료실 hd_12~hd_14에서 별도로 깊이 다루므로, 이 루트의
// 각 웨이포인트 설명에도 "기록상"·"전승"이라는 표현을 일관되게 붙여
// 사실과 전승을 흐리지 않도록 했다. 좌표는 각 지명의 기록상 비정지를
// 그대로 따랐으며(연구자마다 이견이 있는 비정도 있음), 학계가 사실로
// 인정하는 지점(hd_15의 청산리)만 통상적 역사 좌표를 썼다.

const ROUTE_HWANDAN_GOGI_JOURNEY = {
  id: 'hwandan_gogi_journey',
  name: '환단고기 대장정',
  subject_type: 'narrative',
  period: '기록상 기원전 7197~기원전 238, 그리고 1920년의 청산리',
  tagline: '환국에서 북부여까지 — 환단고기가 전하는 상고사의 강역을 따라가는 여정, 그리고 이 책이 실제로 남긴 흔적',
  color: '#8a6d3b',
  total_waypoints: 9,
  hero_image: 'assets/images/route/route_hwandan_gogi_journey_hero.webp',

  // 이 루트 전체가 자료실 hwandan_gogi 시리즈 한 편에 연동된다.
  archive_series: 'hwandan_gogi',
  archive_series_name: '「환단고기, 어떻게 읽을 것인가」',

  card_refs: [],

  waypoints: [

    {
      id: 'wp_01',
      type: 'political',
      year: -7197, month: null, day: null,
      title_ko: '환국 — "우리 환의 건국이 가장 오래되었다"',
      place_ko: '천산·바이칼 일대 (기록상 강역)',
      lat: 53.5000, lng: 108.0000,
      stay: null,
      summary_ko: '환단고기 삼성기가 전하는 가장 오래된 나라 환국(桓國)의 기록상 자리다. 천산에서 바이칼에 이르는 광대한 강역을 다스렸다는 전승으로, 학계 다수설은 이를 후대에 구성된 서사로 본다 — 위서 논쟁 자체는 자료실 본편에서 다룬다. 이 루트는 그 시비를 판정하기보다, 이 책이 그려낸 상고사의 지리를 있는 그대로 따라가 본다.',
      archive_post: 'hd_03',
    },

    {
      id: 'wp_02',
      type: 'life',
      year: -7197, month: null, day: null,
      title_ko: '나반과 아만, 그리고 수밀이국이라는 수수께끼',
      place_ko: '바이칼 호수 (아이사타 비정설)',
      lat: 53.2000, lng: 107.3000,
      stay: null,
      summary_ko: '환국의 시조 전승에 등장하는 나반과 아만, 그리고 "수밀이국"이라는 이름을 둘러싼 기록상의 수수께끼다. 바이칼 호수 인근이 그 무대로 비정되며, 이 지명 비정 자체가 연구자마다 갈리는 지점이기도 하다.',
      archive_post: 'hd_04',
    },

    {
      id: 'wp_03',
      type: 'life',
      year: -3897, month: null, day: null,
      title_ko: '배달국 — 환웅의 동방 개척과 신시 개천',
      place_ko: '태백산 신시 (기록상 도읍)',
      lat: 41.9000, lng: 127.5000,
      stay: null,
      summary_ko: '환웅이 동방으로 내려와 신시를 열었다는 배달국의 기록상 도읍이다. 곰과 호랑이 설화의 원형이 여기서 갈라져 나오며, 삼국유사 고조선조의 기록과 어떻게 같고 다른지가 자료실 본편의 비교 지점이다.',
      archive_post: 'hd_05',
    },

    {
      id: 'wp_04',
      type: 'battle',
      year: -2707, month: null, day: null,
      title_ko: '치우천왕 — 탁록의 10년 전쟁',
      place_ko: '탁록 (허베이성 줘루현)',
      lat: 40.3800, lng: 115.2200,
      stay: null,
      summary_ko: '치우와 황제(黃帝)가 10년에 걸쳐 맞붙었다는 탁록의 전장. 사마천 사기는 치우의 패배로, 환단고기는 정반대로 기록한다 — 같은 전쟁을 두고 정확히 엇갈리는 두 기록이 나란히 존재하는 드문 사례다.',
      archive_post: 'hd_06',
    },

    {
      id: 'wp_05',
      type: 'political',
      year: -2333, month: null, day: null,
      title_ko: '단군세기 — 47명의 단군과 삼한관경제',
      place_ko: '아사달 (기록상 도읍)',
      lat: 45.7500, lng: 126.6500,
      stay: null,
      summary_ko: '"나라는 형체요 역사는 혼이다" — 단군세기가 여는 첫 문장이다. 단군 한 사람이 아니라 47대에 걸친 단군과, 진한·마한·번한으로 나눠 다스렸다는 삼한관경제를 전한다.',
      archive_post: 'hd_07',
    },

    {
      id: 'wp_06',
      type: 'life',
      year: -1733, month: null, day: null,
      title_ko: '가림토 38자와 오성취루 — 검증대에 오른 두 기록',
      place_ko: '백악산 아사달 (기록상 도읍)',
      lat: 44.0000, lng: 125.5000,
      stay: null,
      summary_ko: '훈민정음보다 앞선 문자 가림토 38자, 그리고 다섯 행성이 한 줄로 늘어섰다는 천문 기록 오성취루. 후자는 박창범·라대일의 1993년 과학적 검증 대상이 된 만큼, 위서 논쟁에서 가장 구체적으로 다뤄지는 대목이다.',
      archive_post: 'hd_08',
    },

    {
      id: 'wp_07',
      type: 'political',
      year: -238, month: null, day: null,
      title_ko: '대부여로의 개칭 — 옥새를 내려놓은 마지막 단군',
      place_ko: '장당경 아사달 (기록상 도읍)',
      lat: 42.0000, lng: 123.8000,
      stay: null,
      summary_ko: '고열가가 옥새를 내려놓고 6년의 공화정(共和政)이 이어졌다는 기록상의 마지막 장면. 연나라 진개의 침입을 전하는 위략의 기록과 대조되는 지점이기도 하다.',
      archive_post: 'hd_09',
    },

    {
      id: 'wp_08',
      type: 'life',
      year: -239, month: null, day: null,
      title_ko: '북부여기 — 해모수에서 주몽까지, 교과서가 건너뛴 180년',
      place_ko: '웅심산 (기록상 기병지)',
      lat: 43.8000, lng: 126.5500,
      stay: null,
      summary_ko: '고조선과 고구려 사이, 정규 교육과정이 대개 건너뛰는 180년의 공백을 북부여기가 메운다. 광개토대왕릉비의 "出自北夫餘" 구절이 이 계보의 실존을 뒷받침하는 물증으로 함께 다뤄진다.',
      archive_post: 'hd_10',
    },

    {
      id: 'wp_09',
      type: 'life',
      year: 1920, month: 10, day: null,
      title_ko: '이 책이 실제로 한 일 — 대종교, 그리고 청산리로 간 청년들',
      place_ko: '만주 청산리',
      lat: 42.6500, lng: 128.9500,
      stay: null,
      summary_ko: '위서냐 아니냐를 떠나, 이 상고사 전승을 받든 대종교가 실제로 무장독립운동의 정신적 기반이 됐다는 사실은 남는다. 청산리로 간 청년들의 이야기로 이 여정을 맺는다 — 전승이 신화에 머무르지 않고 근대사에 남긴 실제 흔적이다.',
      archive_post: 'hd_15',
    },

  ],
};

window.registerRoute(ROUTE_HWANDAN_GOGI_JOURNEY);
