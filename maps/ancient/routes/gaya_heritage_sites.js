// routes/gaya_heritage_sites.js — 가야 문화유산 순례
// 가야고분군(2023년 유네스코 등재, 7개 고분군)을 중심으로 오늘날
// 남아있는 가야 유적을 답사 동선으로 엮은 루트
//
// 웨이포인트 유형: 'life'(고분군), 'political'(멸망·병합)
//
// 검증 메모: 가야고분군은 2023년 9월 17일 유네스코 세계유산에 등재된
// 7개 고분군의 연속유산으로, 김해 대성동·함안 말이산·창녕 교동과
// 송현동·고성 송학동·합천 옥전·고령 지산동·남원 유곡리와 두락리로
// 구성된다. 등재 사유는 "주변국과 자율적이고 수평적인 독특한 체계를
// 유지하며 동아시아 고대 문명의 다양성을 보여주는 증거"라는 평가였다
// — 가야가 하나의 중앙집권국가가 아니라 대등한 여러 소국의 연맹이었다는
// 성격이 유산의 핵심 가치로 인정받은 셈이다. 부산 복천동·연산동
// 고분군처럼 이미 도심에 둘러싸여 등재되지 못한 가야 유적도 있다.
//
// card_ref 메모: 금관가야 병합(political_532_01)과 대가야의 성장과
// 멸망(political_562_01)은 이미 이 지도에 카드로 있어 연결된다.
// 나머지 5개 고분군은 전부 루트 전용으로 새로 썼다.

const ROUTE_GAYA_HERITAGE_SITES = {
  id: 'gaya_heritage_sites',
  name: '고대 문화유산 순례 ④ 가야',
  subject_type: 'movement',
  period: '오늘날 남아있는 유적들',
  tagline: '하나의 나라가 아니라 대등한 소국들의 연맹 — 2023년 유네스코가 인정한 가야고분군 7곳을 찾아가는 답사 루트',
  color: '#5c8c6b',
  total_waypoints: 8,
  hero_image: null,

  card_refs: ['political_532_01', 'political_562_01'],

  waypoints: [

    {
      id: 'wp_01',
      type: 'life',
      year: 532, month: null, day: null,
      title_ko: '김해 대성동 고분군 — 금관가야의 심장부',
      place_ko: '경남 김해시',
      lat: 35.2312, lng: 128.8811,
      stay: null,
      summary_ko: '가야 연맹의 첫 맹주였던 금관가야 지배층의 무덤들이다. 풍부한 철 생산과 해상 교역으로 번영했던 금관가야의 국제적 위상을 보여주는 유물들이 다수 출토됐다. 532년 구형왕이 신라에 항복하며 나라는 사라졌지만, 그 후손이 훗날 삼국통일의 주역 김유신이라는 사실이 이 무덤들의 무게를 더한다.',
      card_ref: 'political_532_01',
    },

    {
      id: 'wp_02',
      type: 'life',
      year: 400, month: null, day: null,
      title_ko: '함안 말이산 고분군 — 아라가야의 흔적',
      place_ko: '경남 함안군',
      lat: 35.2686, lng: 128.4067,
      stay: null,
      summary_ko: '가야 연맹의 한 축이었던 아라가야 지배층의 무덤이 능선을 따라 조밀하게 모여 있다. 능선 위에 줄지어 선 고분들의 풍경이 장관을 이뤄, 가야고분군 7곳 가운데서도 특히 상징적인 경관으로 꼽힌다.',
      card_ref: null,
    },

    {
      id: 'wp_03',
      type: 'life',
      year: 500, month: null, day: null,
      title_ko: '창녕 교동과 송현동 고분군 — 비화가야의 무덤',
      place_ko: '경남 창녕군',
      lat: 35.5439, lng: 128.4897,
      stay: null,
      summary_ko: '비화가야 지배층의 무덤이 모인 곳으로, 유네스코 등재 심사에서 고분군 사이를 가로지르는 도로가 유산에 영향을 준다는 지적을 받아 도로 이설이 검토되고 있다 — 세계유산이 된 뒤에도 여전히 현재진행형인 보존 과제를 보여주는 사례다.',
      card_ref: null,
    },

    {
      id: 'wp_04',
      type: 'life',
      year: 500, month: null, day: null,
      title_ko: '고성 송학동 고분군 — 소가야의 흔적',
      place_ko: '경남 고성군',
      lat: 34.9739, lng: 128.3222,
      stay: null,
      summary_ko: '가야 연맹 남해안 쪽 소국이었던 소가야 지배층의 무덤이다. 바다에 가까운 입지는 소가야가 해상 교역에 기반한 세력이었음을 짐작하게 한다.',
      card_ref: null,
    },

    {
      id: 'wp_05',
      type: 'life',
      year: 500, month: null, day: null,
      title_ko: '합천 옥전 고분군 — 다라국의 무덤',
      place_ko: '경남 합천군',
      lat: 35.5628, lng: 128.1697,
      stay: null,
      summary_ko: '문헌 기록이 많지 않은 가야 소국 다라국의 지배층 무덤으로 추정된다. 발굴에서 화려한 금동관과 철제 갑옷 등이 출토돼, 문헌에는 이름만 남은 작은 나라도 상당한 국력을 갖췄음을 보여준다.',
      card_ref: null,
    },

    {
      id: 'wp_06',
      type: 'life',
      year: 562, month: null, day: null,
      title_ko: '고령 지산동 고분군 — 대가야의 마지막 무대',
      place_ko: '경북 고령군',
      lat: 35.7269, lng: 128.2661,
      stay: null,
      summary_ko: '5세기 후반 가야 연맹의 새로운 맹주로 떠오른 대가야 지배층의 무덤이다. 질 좋은 철산지를 바탕으로 한 정교한 금속공예품이 다수 출토됐다. 대가야 출신 우륵이 가야금을 만들어 신라에 전한 일화는, 562년 정치적으로 멸망한 뒤에도 가야 문화가 신라를 통해 이어졌음을 보여준다.',
      card_ref: 'political_562_01',
    },

    {
      id: 'wp_07',
      type: 'life',
      year: 500, month: null, day: null,
      title_ko: '남원 유곡리와 두락리 고분군 — 가야 연맹의 서쪽 끝',
      place_ko: '전북 남원시',
      lat: 35.4453, lng: 127.4756,
      stay: null,
      summary_ko: '가야고분군 7곳 중 유일하게 전라북도에 있는 유적으로, 가야 연맹의 영향력이 오늘날 경상도 경계를 넘어 호남 동부까지 미쳤음을 보여준다. 대가야 양식 유물이 다수 출토돼 대가야와 밀접한 관계에 있던 소국의 무덤으로 추정된다.',
      card_ref: null,
    },

    {
      id: 'wp_08',
      type: 'political',
      year: 2026, month: null, day: null,
      title_ko: '가야 유물은 어디서 볼 수 있나',
      place_ko: '국립김해박물관',
      lat: 35.2249, lng: 128.8886,
      stay: null,
      summary_ko: '가야 유물을 전문으로 다루는 국립김해박물관이 대성동 고분군 인근에 있어, 출토 현장과 전시를 함께 둘러볼 수 있다. 2025년에는 김해에 7개 고분군을 통합 관리하는 센터도 출범했다 — 흩어진 소국들의 연맹이었던 가야가, 세계유산이 되고 나서야 비로소 하나의 통합된 이름으로 관리되기 시작한 셈이다.',
      card_ref: null,
    },

  ],
};

window.registerRoute(ROUTE_GAYA_HERITAGE_SITES);
