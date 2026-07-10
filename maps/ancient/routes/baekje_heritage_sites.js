// routes/baekje_heritage_sites.js — 백제 문화유산 순례
// 오늘날 남아있는 백제 유적을 한성→웅진→사비 순서로 엮은 답사 루트
//
// 웨이포인트 유형: 'political'(도성·왕궁), 'life'(고분·사찰)
//
// 검증 메모: 백제역사유적지구는 2015년 유네스코 세계유산에 등재된
// 8개 유적의 공식 묶음 이름으로, 공주 2곳(공산성, 송산리 고분군),
// 부여 4곳(관북리 유적과 부소산성, 정림사지, 부여 왕릉원/능산리
// 고분군, 부여 나성), 익산 2곳(왕궁리 유적, 미륵사지)으로 구성된다.
// 웅진(475~538)·사비(538~660) 시기 유적만 대상이라, 백제 700년
// 역사의 절반을 차지하는 한성 시기(기원전 18~475년, 오늘날 서울
// 풍납토성·몽촌토성·석촌동 고분군)는 등재에서 빠져 있다 — 서울시가
// 추가 등재를 여러 차례 시도했지만 아직 진전이 없는 상태다. 이
// 루트는 등재 여부와 무관하게 한성 시기부터 순서대로 다뤘다.
//
// card_ref 메모: 무령왕의 중흥(policy_501_01)과 백제 불교미술·
// 미륵사지(culture_600_01)는 이미 이 지도에 카드로 있어 연결된다.
// 나머지는 전부 루트 전용으로 새로 썼다.

const ROUTE_BAEKJE_HERITAGE_SITES = {
  id: 'baekje_heritage_sites',
  name: '고대 문화유산 순례 ② 백제',
  subject_type: 'movement',
  period: '오늘날 남아있는 유적들',
  tagline: '한성에서 웅진, 사비까지 — 세 번 도읍을 옮기며 700년을 이어간 백제가 남긴 왕성·왕릉·사찰터를 찾아가는 답사 루트',
  color: '#2e6b4a',
  total_waypoints: 13,
  hero_image: null,

  card_refs: ['policy_501_01', 'culture_600_01'],

  waypoints: [

    {
      id: 'wp_01',
      type: 'political',
      year: -18, month: null, day: null,
      title_ko: '풍납토성 — 백제 첫 도읍 한성의 유력 후보지',
      place_ko: '서울 송파구',
      lat: 37.5306, lng: 127.1237,
      stay: null,
      summary_ko: '둘레 3.5km에 이르는 대형 토성으로, 백제 첫 도읍 한성의 왕성으로 가장 유력하게 꼽힌다. 발굴 조사에서 중국제 도자기 등 국제적 위상을 보여주는 유물이 다수 출토됐다. 도심 한복판에 있는 탓에 오랫동안 주거지와 겹쳐 있었고, 백제역사유적지구(웅진·사비 시기 중심)에는 포함되지 못했다 — 서울시가 한성백제 유적의 추가 세계유산 등재를 시도해왔지만 아직 진전은 없다.',
      card_ref: null,
    },

    {
      id: 'wp_02',
      type: 'political',
      year: -18, month: null, day: null,
      title_ko: '몽촌토성 — 한성 시기 방어 거점',
      place_ko: '서울 송파구(올림픽공원 내)',
      lat: 37.5155, lng: 127.1128,
      stay: null,
      summary_ko: '풍납토성과 함께 한성 시기 백제의 핵심 방어시설로 꼽히는 토성이다. 자연 지형을 활용한 방어 구조가 특징이며, 현재는 올림픽공원 안에 있어 시민들이 산책로로도 즐겨 찾는다 — 유적과 도심 공원이 공존하는 드문 사례다.',
      card_ref: null,
    },

    {
      id: 'wp_03',
      type: 'life',
      year: -18, month: null, day: null,
      title_ko: '석촌동 고분군 — 한성 시기 왕족의 무덤',
      place_ko: '서울 송파구',
      lat: 37.5044, lng: 127.1027,
      stay: null,
      summary_ko: '고구려식 돌무지무덤(적석총)과 흙무지무덤이 함께 발견된 고분군으로, 백제 왕실이 고구려에서 남하한 계통이라는 건국 설화를 뒷받침하는 물증으로 자주 언급된다. 근초고왕 등 한성 시기 왕들의 무덤으로 추정되지만 확정된 것은 아니다.',
      card_ref: null,
    },

    {
      id: 'wp_04',
      type: 'political',
      year: 475, month: null, day: null,
      title_ko: '공산성 — 웅진 시기 왕성',
      place_ko: '충남 공주시',
      lat: 36.4522, lng: 127.1231,
      stay: null,
      summary_ko: '한성이 고구려에 함락된 뒤 급히 옮긴 새 수도 웅진(공주)의 왕성이다. 둘레 약 2.7km의 산성으로 석축과 토축이 함께 쓰였다. 2015년 유네스코 세계유산 "백제역사유적지구"에 포함된 8개 유적 가운데 하나다.',
      card_ref: null,
    },

    {
      id: 'wp_05',
      type: 'life',
      year: 525, month: null, day: null,
      title_ko: '무령왕릉 — 도굴되지 않은 유일한 백제 왕릉',
      place_ko: '공주 송산리 고분군',
      lat: 36.4592, lng: 127.1189,
      stay: null,
      summary_ko: '1971년 우연히 발견될 때까지 단 한 번도 도굴되지 않아, 무덤 주인의 이름이 새겨진 지석과 함께 금제 관식·귀걸이 등 수천 점의 부장품이 고스란히 출토됐다. 삼국시대 왕릉 가운데 주인이 누구인지 명확히 밝혀진 몇 안 되는 사례로, 백제 문화의 국제성과 예술성을 보여주는 대표 유적이다. 공산성과 함께 백제역사유적지구에 포함됐다.',
      card_ref: 'policy_501_01',
    },

    {
      id: 'wp_06',
      type: 'political',
      year: 538, month: null, day: null,
      title_ko: '부소산성·관북리 유적 — 사비 시기 왕궁',
      place_ko: '충남 부여군',
      lat: 36.2757, lng: 126.9108,
      stay: null,
      summary_ko: '성왕이 사비(부여)로 천도한 뒤 백제 멸망까지 120년 넘게 왕궁을 지킨 산성이다. 백마강과 부소산의 지형을 활용했으며, 660년 백제 멸망 당시 궁녀들이 뛰어내렸다는 전설이 전하는 낙화암도 이 안에 있다. 인근 관북리 유적에서는 왕궁 관련 건물터가 확인됐다. 두 곳 모두 백제역사유적지구에 포함됐다.',
      card_ref: null,
    },

    {
      id: 'wp_07',
      type: 'life',
      year: 600, month: null, day: null,
      title_ko: '정림사지 — 사비 시기를 대표하는 사찰터',
      place_ko: '충남 부여군',
      lat: 36.2764, lng: 126.9095,
      stay: null,
      summary_ko: '탑-금당-강당이 일직선으로 배치된 백제 전형적인 가람 구조가 남아 있는 절터로, 오층석탑이 원형 그대로 보존돼 있다. 이 배치 양식은 이후 일본 사찰 건축에도 영향을 미친 것으로 평가된다. 백제역사유적지구에 포함됐다.',
      card_ref: null,
    },

    {
      id: 'wp_08',
      type: 'life',
      year: 567, month: null, day: null,
      title_ko: '부여 왕릉원(능산리 고분군) — 사비 시기 왕실 묘역',
      place_ko: '충남 부여군',
      lat: 36.2822, lng: 126.9314,
      stay: null,
      summary_ko: '사비 시기 백제 왕과 왕족들의 무덤이 모여 있는 곳으로, 인근에서 발굴된 백제 금동대향로(국보)는 백제 금속공예의 정수로 꼽힌다. 백제역사유적지구에 포함됐다.',
      card_ref: null,
    },

    {
      id: 'wp_09',
      type: 'political',
      year: 538, month: null, day: null,
      title_ko: '부여 나성 — 사비 도성을 감싼 방어성곽',
      place_ko: '충남 부여군',
      lat: 36.28, lng: 126.92,
      stay: null,
      summary_ko: '왕도 사비를 둘러싼 약 8km 길이의 방어 성곽으로, 내부에 왕궁·관청·민가·사찰이 모두 들어선 계획도시였음을 보여준다. 지금은 일부 구간만 발굴·복원돼 있다. 백제역사유적지구에 포함됐다.',
      card_ref: null,
    },

    {
      id: 'wp_10',
      type: 'political',
      year: 600, month: null, day: null,
      title_ko: '왕궁리 유적 — 사비 후기, 익산으로 확장된 왕도',
      place_ko: '전북 익산시',
      lat: 35.9930, lng: 127.0844,
      stay: null,
      summary_ko: '무왕 시기 왕궁이 있었던 것으로 추정되는 유적으로, 왕궁이 후대에 사찰로 바뀐 독특한 이력을 지녔다. 백제 후기 익산이 사비와 함께 또 하나의 중심지로 개발됐음을 보여준다. 백제역사유적지구에 포함됐다.',
      card_ref: null,
    },

    {
      id: 'wp_11',
      type: 'life',
      year: 601, month: null, day: null,
      title_ko: '미륵사지 — 백제 최대의 사찰',
      place_ko: '전북 익산시',
      lat: 36.0089, lng: 126.9578,
      stay: null,
      summary_ko: '무왕이 세운 백제 최대 사찰로, 가운데 목탑을 두고 좌우에 석탑을 배치한 독특한 1탑 3금당 구조를 지녔다. 현재 남은 미륵사지 석탑은 목탑 양식을 돌로 옮긴 한국에서 가장 오래되고 큰 석탑이다. 백제역사유적지구에 포함됐다.',
      card_ref: 'culture_600_01',
    },

    {
      id: 'wp_12',
      type: 'life',
      year: 600, month: null, day: null,
      title_ko: '서산 마애삼존불 — 백제의 미소',
      place_ko: '충남 서산시',
      lat: 36.6975, lng: 126.4547,
      stay: null,
      summary_ko: '절벽에 새긴 마애불로, 부드러운 미소가 인상적이라 "백제의 미소"라는 별칭으로 불린다. 백제역사유적지구에는 포함되지 않았지만, 국보로 지정돼 있으며 백제 불교 조각의 대표작으로 꼽힌다.',
      card_ref: null,
    },

    {
      id: 'wp_13',
      type: 'political',
      year: 2026, month: null, day: null,
      title_ko: '백제 유물은 어디서 볼 수 있나',
      place_ko: '국립공주박물관',
      lat: 36.4614, lng: 127.1257,
      stay: null,
      summary_ko: '무령왕릉에서 나온 금제 관식·귀걸이·지석 등 핵심 유물은 국립공주박물관에서 상설 전시 중이다. 부여 지역 출토품은 국립부여박물관(백제 금동대향로 포함)에, 익산 지역 출토품은 국립익산박물관에 나뉘어 있다 — 백제는 세 도읍을 거친 나라답게, 유물을 보려면 박물관도 세 곳을 돌아야 하는 셈이다.',
      card_ref: null,
    },

  ],
};

window.registerRoute(ROUTE_BAEKJE_HERITAGE_SITES);
