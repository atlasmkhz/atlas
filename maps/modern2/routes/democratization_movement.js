// routes/democratization_movement.js — 민주화운동 루트
// 1960~1993, 이승만 독재의 몰락부터 문민정부 출범까지, 33년에 걸친
// 한국 민주화운동의 큰 흐름을 담은 루트.
//
// 범위에 대한 메모: 이미 "대구경북 민주화의 열망"(daegu_gyeongbuk_
// democracy, 대구경북 지역 중심), 김대중·박정희·전두환 루트(개별
// 인물 중심)가 이 시기를 각자의 관점에서 다루고 있다. 이 루트는
// 특정 지역이나 인물이 아니라 전국 단위의 사건 흐름 자체를 시대순
// 으로 훑는 데 초점을 맞췄다.
//
// card_ref 메모: 2·28 대구 학생의거(movement_1960_00), 4·19
// 혁명(movement_1960_01), 부마항쟁(movement_1979_02), 5·18
// (massacre_1980_01), 6월 민주항쟁(movement_1987_01), 6·29
// 선언(political_1987_02)은 이미 카드가 있어 연결했다.

const ROUTE_DEMOCRATIZATION_MOVEMENT = {
  id: 'democratization_movement',
  name: '민주화운동 루트',
  subject_type: 'movement',
  period: '1960~1993',
  tagline: '독재에 맞선 33년, 거리에서 헌법으로',
  color: '#5c2f2f',
  total_waypoints: 9,
  hero_image: 'assets/images/route/route_democratization_movement_hero.webp',

  card_refs: ['movement_1960_00', 'movement_1960_01', 'movement_1979_02', 'massacre_1980_01', 'movement_1987_01', 'political_1987_02'],

  waypoints: [

    {
      id: 'wp_01',
      type: 'political',
      year: 1960, month: 3, day: 15,
      title_ko: '3·15 부정선거 — 독재의 균열이 시작되다',
      place_ko: '경남 마산',
      lat: 35.2196, lng: 128.5814,
      stay: null,
      summary_ko: '이승만 정권이 4선을 위해 개표 조작·투표함 바꿔치기 등 노골적인 부정선거를 자행하자, 마산에서 시민들이 대규모 항의 시위를 벌였다. 이 시위 중 실종됐던 고등학생 김주열의 시신이 최루탄이 눈에 박힌 채 마산 앞바다에서 발견되며 전국적인 분노에 불을 붙였다.',
      card_ref: null,
    },

    {
      id: 'wp_02',
      type: 'movement',
      year: 1960, month: 2, day: 28,
      title_ko: '2·28 대구 학생의거 — 첫 신호탄',
      place_ko: '대구',
      lat: 35.8714, lng: 128.6014,
      stay: null,
      summary_ko: '3·15 부정선거보다 두 주 앞서, 대구에서 고등학생들이 일요일 등교 지시(야당 유세 참여를 막기 위한 조치였다)에 항의해 거리로 나섰다. 학생들이 자발적으로 조직한 이 시위는 이후 이어지는 전국적 저항의 첫 신호탄으로 평가받는다.',
      card_ref: 'movement_1960_00',
    },

    {
      id: 'wp_03',
      type: 'movement',
      year: 1960, month: 4, day: 19,
      title_ko: '4·19 혁명 — 대통령을 몰아낸 첫 시민 항쟁',
      place_ko: '서울',
      lat: 37.5665, lng: 126.9780,
      stay: null,
      summary_ko: '김주열의 죽음이 알려지며 전국 대학생과 시민들이 대규모로 봉기했다. 경찰의 발포로 다수의 사상자가 발생했지만 시위는 오히려 확산됐고, 결국 이승만은 대통령직에서 물러나 하와이로 망명했다. 헌법에 명시된 절차 없이 시민의 힘으로 대통령을 끌어내린 최초의 사례로, 이후 대한민국 헌법 전문에 "4·19민주이념을 계승"한다는 문구로 남았다.',
      card_ref: 'movement_1960_01',
    },

    {
      id: 'wp_04',
      type: 'movement',
      year: 1979, month: 10, day: 16,
      title_ko: '부마항쟁 — 유신체제 말기, 저항이 다시 불붙다',
      place_ko: '부산·마산',
      lat: 35.1796, lng: 129.0756,
      stay: null,
      summary_ko: '박정희 유신체제 아래 극심한 통제가 이어지던 가운데, 부산과 마산에서 학생과 시민들이 대규모 반정부 시위를 벌였다. 정부는 부산에 계엄령을, 마산에 위수령을 선포하며 강경 진압에 나섰지만, 이 저항은 열흘 뒤 벌어진 10·26 사건(박정희 피살)으로 이어지는 유신체제 붕괴의 직접적 배경이 됐다.',
      card_ref: 'movement_1979_02',
    },

    {
      id: 'wp_05',
      type: 'political',
      year: 1979, month: 12, day: 12,
      title_ko: '12·12 군사반란 — 다시 찾아온 군부독재',
      place_ko: '서울',
      lat: 37.5665, lng: 126.9780,
      stay: null,
      summary_ko: '박정희 사망 이후 찾아온 "서울의 봄"이라 불리던 민주화 기대는, 전두환을 중심으로 한 신군부 세력이 군사 반란을 일으켜 실권을 장악하며 꺾이기 시작했다. 신군부는 이듬해 5월 비상계엄을 전국으로 확대하며 민주화 요구를 전면적으로 억누른다.',
      card_ref: null,
    },

    {
      id: 'wp_06',
      type: 'battle',
      year: 1980, month: 5, day: 18,
      title_ko: '5·18 광주 — 계엄군, 시민을 향해 발포하다',
      place_ko: '광주',
      lat: 35.1595, lng: 126.8526,
      stay: null,
      summary_ko: '전국 계엄 확대에 항의하는 광주 시민들의 시위를 신군부는 공수부대를 투입해 무력 진압했다. 계엄군의 과잉 진압과 발포로 다수의 시민이 희생됐고, 광주 시민들은 시민군을 조직해 열흘 가까이 자체적으로 도시를 지켜냈다. 신군부에 의해 오랫동안 "폭동"으로 왜곡됐던 이 항쟁은, 이후 진상규명 노력을 거쳐 한국 민주화운동사에서 가장 뼈아픈 희생과 저항의 상징으로 재평가됐다.',
      card_ref: 'massacre_1980_01',
    },

    {
      id: 'wp_07',
      type: 'death',
      year: 1987, month: 1, day: 14,
      title_ko: '박종철 고문치사 — "책상을 탁 치니 억 하고"',
      place_ko: '서울(남영동 대공분실)',
      lat: 37.5384, lng: 126.9705,
      stay: null,
      summary_ko: '서울대생 박종철이 경찰의 물고문으로 사망하는 사건이 발생했다. 경찰이 "책상을 탁 치니 억 하고 쓰러졌다"며 사인을 조작하려 했지만 언론 보도와 부검을 통해 고문치사 사실이 드러났고, 이 사건은 이후 6월 민주항쟁을 촉발하는 결정적 계기가 됐다.',
      card_ref: null,
    },

    {
      id: 'wp_08',
      type: 'movement',
      year: 1987, month: 6, day: 10,
      title_ko: '6월 민주항쟁 — 넥타이 부대까지 거리로 나서다',
      place_ko: '서울',
      lat: 37.5665, lng: 126.9780,
      stay: null,
      summary_ko: '전두환 정권이 대통령 직선제 개헌 요구를 거부하는 4·13 호헌조치를 발표하고 이한열이 최루탄에 맞아 사망하는 사건까지 겹치며, 학생을 넘어 회사원("넥타이 부대")과 중산층까지 대규모로 거리 시위에 동참했다. 전국적으로 확산된 이 항쟁은 유례없는 규모의 시민 저항으로, 결국 정권의 항복을 이끌어냈다.',
      card_ref: 'movement_1987_01',
    },

    {
      id: 'wp_09',
      type: 'political',
      year: 1987, month: 6, day: 29,
      title_ko: '6·29 선언 — 대통령 직선제를 쟁취하다',
      place_ko: '서울',
      lat: 37.5665, lng: 126.9780,
      stay: null,
      summary_ko: '여당 대표 노태우가 대통령 직선제 개헌을 비롯한 민주화 조치를 전격 수용하는 6·29 선언을 발표했다. 이로써 1972년 유신헌법 이후 15년 만에 국민이 직접 대통령을 뽑는 헌법 개정이 이뤄졌다. 27년 전 4·19가 거리의 힘으로 대통령을 끌어냈다면, 이번에는 그 힘이 헌법 조문 자체를 바꿔낸 것이었다 — 이후 1993년 김영삼 정부의 출범으로 32년 만에 군인 출신이 아닌 민간인 대통령 시대(문민정부)가 열리며 한국의 민주화 이행은 제도적으로 일단락된다.',
      card_ref: 'political_1987_02',
    },

  ],
};

window.registerRoute(ROUTE_DEMOCRATIZATION_MOVEMENT);
