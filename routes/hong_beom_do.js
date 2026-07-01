// routes/hong_beom_do.js
// 홍범도 루트 — 포수에서 영웅으로, 극장 수위에서 현충원으로
// 1868(평양 출생) ~ 2021(대전현충원 봉환), 153년의 여정
//
// 웨이포인트 유형:
//   'birth'    출생
//   'life'     생활·거주·노동 (포수, 제지공장, 절, 극장 수위 등)
//   'battle'   전투
//   'tragedy'  비극 (가족 사망, 참변 등)
//   'exile'    망명·강제이주
//   'political' 정치·외교적 사건
//   'death'    사망
//   'repatriation' 유해 봉환
//
// card_ref: 기존 data/*.js 카드 id — 클릭 시 해당 카드 팝업이 열린다
// card_ref가 null이면 루트 전용 웨이포인트로 요약 팝업을 자체 생성한다

const ROUTE_HONG_BEOM_DO = {
  id: 'hong_beom_do',
  name: '홍범도 — 포수에서 현충원까지',
  subject_type: 'person',
  period: '1868~2021',
  tagline: '함경도 산포수에서 봉오동·청산리의 영웅으로, 카자흐스탄 극장 수위로, 그리고 75년 만의 귀환',
  color: '#c8a827',
  total_waypoints: 26,

  // 기존 카드 중 이 루트와 연결되는 것들 (지도 렌더러가 강조 표시)
  card_refs: [
    'battle_1920_01',    // 봉오동 전투
    'battle_1920_02',    // 청산리 대첩
    'massacre_1921_01',  // 자유시 참변
    'migration_1937_01', // 연해주 한인 강제이주
  ],

  waypoints: [

    // ── 1. 출생 ──────────────────────────────────────────────────
    {
      id: 'wp_01',
      type: 'birth',
      year: 1868, month: null, day: null,
      title_ko: '출생 — 평양 어느 가난한 집',
      place_ko: '평양',
      lat: 39.03, lng: 125.75,
      stay: null,
      summary_ko: '1868년 평양에서 태어났다. 어머니는 홍범도를 낳고 곧 세상을 떠났고, 아버지도 일찍 사망했다. 고아나 다름없는 처지로 머슴살이를 하며 어린 시절을 보냈다. 훗날 그는 회고록에서 "나는 세상에서 가장 가난하게 태어났다"고 썼다.',
      card_ref: null,
    },

    // ── 2. 성장기 — 평양 감영 나팔수 ──────────────────────────────
    {
      id: 'wp_02',
      type: 'life',
      year: 1883, month: null, day: null,
      title_ko: '평양 감영 나팔수 — 첫 번째 직업',
      place_ko: '평양 감영',
      lat: 39.02, lng: 125.76,
      stay: '1883~1885',
      summary_ko: '10대 초반 평양 감영(관청)의 나팔수로 일했다. 신분제 사회에서 머슴 출신이 할 수 있는 몇 안 되는 관청 일자리였다. 이 시기 군사 분위기에 익숙해졌고, 총기에도 처음 접하게 됐다.',
      card_ref: null,
    },

    // ── 3. 황해도 — 제지공장 노동자 ──────────────────────────────
    {
      id: 'wp_03',
      type: 'life',
      year: 1885, month: null, day: null,
      title_ko: '황해도 제지공장 노동자',
      place_ko: '황해도',
      lat: 38.45, lng: 125.60,
      stay: '1885~1890',
      summary_ko: '나팔수 생활을 마치고 황해도로 내려가 제지공장에서 일했다. 당시 조선의 제지 노동은 고된 중노동이었으나, 그는 이곳에서 아내 이순이를 만나 결혼했다. 두 아들 양순과 용환이 태어났다. 가난했지만 처음으로 가정이 생겼다.',
      card_ref: null,
    },

    // ── 4. 함경도 — 산포수의 삶 시작 ──────────────────────────────
    {
      id: 'wp_04',
      type: 'life',
      year: 1895, month: null, day: null,
      title_ko: '함경도 산포수 — 총을 잡다',
      place_ko: '함경도 갑산',
      lat: 41.10, lng: 128.19,
      stay: '1895~1907',
      summary_ko: '가족을 데리고 함경도 갑산으로 이주해 산포수(산악 사냥꾼) 생활을 시작했다. 호랑이·멧돼지를 잡는 뛰어난 사격 실력을 갖추게 됐고, 함경도 포수 조직에서 두각을 나타냈다. 이 12년간의 포수 생활이 훗날 독립군 전술의 기반이 됐다 — 산지 지형 활용, 매복, 정확한 사격.',
      card_ref: null,
    },

    // ── 5. 단발령 항거 — 의병의 눈뜸 ──────────────────────────────
    {
      id: 'wp_05',
      type: 'life',
      year: 1896, month: null, day: null,
      title_ko: '단발령 항거 — 의병에 눈뜨다',
      place_ko: '함경도 북청',
      lat: 40.70, lng: 128.29,
      stay: null,
      summary_ko: '을미사변(1895)과 단발령에 분노한 함경도 포수들이 들고 일어날 때 홍범도도 합류했다. 정식 의병 봉기는 아니었지만 반일 감정이 처음으로 행동으로 표출된 시기였다. 이때부터 포수 조직과 항일 의식이 연결되기 시작했다.',
      card_ref: null,
    },

    // ── 6. 의병 봉기 ──────────────────────────────────────────
    {
      id: 'wp_06',
      type: 'battle',
      year: 1907, month: 11, day: null,
      title_ko: '차도선과 의병 봉기 — 일본 수비대 공격',
      place_ko: '함경도 삼수·갑산',
      lat: 41.47, lng: 128.19,
      stay: '1907~1908',
      summary_ko: '군대해산(1907) 직후 차도선과 함께 포수 부대를 이끌고 함경도 삼수·갑산 일대에서 일본 수비대를 공격했다. 일본 측 기록에 "홍범도"라는 이름이 처음 등장한 것이 이 시기다. 게릴라 전술로 일본군을 여러 차례 격파하며 "날으는 홍범도"라는 별명을 얻었다.',
      card_ref: null,
    },

    // ── 7. 아내 이순이 사망 ──────────────────────────────────────
    {
      id: 'wp_07',
      type: 'tragedy',
      year: 1908, month: null, day: null,
      title_ko: '아내 이순이 — 일본군에 고문당해 사망',
      place_ko: '함경도',
      lat: 40.90, lng: 128.30,
      stay: null,
      summary_ko: '일본군은 홍범도를 잡기 위해 그의 아내 이순이를 체포해 고문했다. 이순이는 남편의 행방을 끝내 말하지 않았고, 고문 후유증으로 사망했다. 홍범도는 이 소식을 피신처에서 전해 들었다. 아내의 죽음은 그에게 돌아올 수 없는 길에 들어섰음을 확인시켜 주었다.',
      card_ref: null,
    },

    // ── 8. 아들 양순 전사 ──────────────────────────────────────
    {
      id: 'wp_08',
      type: 'tragedy',
      year: 1908, month: null, day: null,
      title_ko: '장남 양순 — 전투 중 전사',
      place_ko: '함경도 북청 일대',
      lat: 40.70, lng: 128.28,
      stay: null,
      summary_ko: '큰아들 양순이 아버지와 함께 의병 활동을 하다 전투 중 전사했다. 같은 해 아내까지 잃은 홍범도에게 1908년은 가장 잔혹한 해였다. 아내와 장남을 모두 잃었으나 그는 싸움을 멈추지 않았다.',
      card_ref: null,
    },

    // ── 9. 두만강 이북 — 간도로 망명 ──────────────────────────────
    {
      id: 'wp_09',
      type: 'exile',
      year: 1909, month: null, day: null,
      title_ko: '두만강 이북 — 간도로 망명',
      place_ko: '북간도 (두만강 이북)',
      lat: 42.40, lng: 129.30,
      stay: '1909~1910',
      summary_ko: '일본군의 포위가 좁혀오자 두만강을 건너 북간도(지금의 중국 연변)로 망명했다. 함경도 의병전쟁은 사실상 끝났지만, 북간도에는 이미 이주한 조선인 공동체와 의병 세력이 있었다. 홍범도는 이곳에서 전열을 재정비했다.',
      card_ref: null,
    },

    // ── 10. 연해주 — 블라디보스토크 망명 ──────────────────────────
    {
      id: 'wp_10',
      type: 'exile',
      year: 1910, month: null, day: null,
      title_ko: '연해주 망명 — 블라디보스토크',
      place_ko: '러시아 블라디보스토크',
      lat: 43.12, lng: 131.89,
      stay: '1910~1920',
      summary_ko: '경술국치(1910) 이후 러시아 연해주 블라디보스토크로 이동했다. 이곳에서 10년간 머물며 부두·농장 일을 하면서 독립군 재건을 준비했다. 신한촌(조선인 마을)을 거점으로 이동하며 군사 자금을 모으고 청년들을 훈련시켰다. 차남 용환과 함께 살았다.',
      card_ref: null,
    },

    // ── 11. 차남 용환 전사 ──────────────────────────────────────
    {
      id: 'wp_11',
      type: 'tragedy',
      year: 1919, month: null, day: null,
      title_ko: '차남 용환 — 독립운동 중 전사',
      place_ko: '연해주',
      lat: 43.12, lng: 131.88,
      stay: null,
      summary_ko: '3·1운동 직후 독립운동에 참여했던 차남 용환이 전사했다. 아내·장남에 이어 마지막 남은 가족마저 잃었다. 홍범도에게 이제 돌아갈 가정은 없었다. 그는 이후 오직 독립운동만을 위해 살았다.',
      card_ref: null,
    },

    // ── 12. 대한독립군 편성 ──────────────────────────────────────
    {
      id: 'wp_12',
      type: 'battle',
      year: 1919, month: null, day: null,
      title_ko: '대한독립군 편성 — 북간도로 귀환',
      place_ko: '북간도 봉오동 일대',
      lat: 42.93, lng: 129.51,
      stay: '1919~1920',
      summary_ko: '3·1운동 이후 독립 의지가 다시 타오르자 연해주에서 북간도로 넘어와 대한독립군을 편성했다. 포수 시절부터 쌓은 사격술과 산악 전술을 바탕으로 수백 명의 독립군을 훈련시켰다. 봉오동 계곡을 거점 삼아 일본군의 국경 침범에 맞설 준비를 마쳤다.',
      card_ref: null,
    },

    // ── 13. 봉오동 전투 ──────────────────────────────────────
    {
      id: 'wp_13',
      type: 'battle',
      year: 1920, month: 6, day: null,
      title_ko: '봉오동 전투 — 일본 정규군 첫 대패',
      place_ko: '화룡현 봉오동',
      lat: 42.93, lng: 129.52,
      stay: null,
      summary_ko: '독립군이 일본 정규군을 상대로 거둔 첫 대규모 승리. 봉오동 골짜기로 일본군을 유인해 격파했다. 홍범도·최진동·안무의 연합부대가 산악 지형을 완벽하게 활용한 전술의 승리였다.',
      card_ref: 'battle_1920_01',  // 기존 카드 연결
    },

    // ── 14. 청산리 대첩 ──────────────────────────────────────
    {
      id: 'wp_14',
      type: 'battle',
      year: 1920, month: 10, day: null,
      title_ko: '청산리 대첩 — 독립전쟁 최대 승전',
      place_ko: '화룡현 청산리',
      lat: 42.55, lng: 129.00,
      stay: null,
      summary_ko: '김좌진·홍범도 연합부대가 청산리 일대에서 6일간 10여 차례 교전 끝에 일본군에 큰 타격을 입혔다. 독립전쟁사 최대의 승전. 그러나 이 승리 직후 일본군의 간도참변이 시작됐고, 독립군은 만주를 떠나야 했다.',
      card_ref: 'battle_1920_02',  // 기존 카드 연결
    },

    // ── 15. 밀산 집결 ──────────────────────────────────────
    {
      id: 'wp_15',
      type: 'exile',
      year: 1920, month: 12, day: null,
      title_ko: '밀산 집결 — 자유시로 향하다',
      place_ko: '만주 밀산',
      lat: 45.85, lng: 133.45,
      stay: '1920.12~1921.1',
      summary_ko: '청산리 승전 직후 일본군의 보복 학살(간도참변)을 피해 독립군 연합부대 약 3500명이 밀산에 집결했다. 소련 러시아에 기대 재기를 도모하자는 결의 아래 자유시(알렉세예프스크)로 이동하기로 했다. 이것이 비극의 시작이었다.',
      card_ref: null,
    },

    // ── 16. 자유시 참변 ──────────────────────────────────────
    {
      id: 'wp_16',
      type: 'tragedy',
      year: 1921, month: 6, day: 28,
      title_ko: '자유시 참변 — 동족의 총에 쓰러진 독립군',
      place_ko: '러시아 자유시 (알렉세예프스크)',
      lat: 51.40, lng: 128.35,
      stay: '1921.1~1921.6',
      summary_ko: '소련 적색군의 지원을 받는 이르쿠츠크파가 상해파(홍범도 부대 포함)를 무장해제하려다 충돌이 일어났다. 독립군 수백 명이 동족의 총에 사살되거나 수장됐다. 홍범도는 살아남았으나 그가 이끌던 독립군 부대는 사실상 해체됐다. 봉오동·청산리의 영웅들이 이렇게 무너졌다.',
      card_ref: 'massacre_1921_01',  // 기존 카드 연결
    },

    // ── 17. 이르쿠츠크파에 억류 ──────────────────────────────
    {
      id: 'wp_17',
      type: 'exile',
      year: 1921, month: 7, day: null,
      title_ko: '이르쿠츠크 — 억류와 조사',
      place_ko: '러시아 이르쿠츠크',
      lat: 52.29, lng: 104.30,
      stay: '1921.7~1921.12',
      summary_ko: '자유시 참변 이후 이르쿠츠크파에 의해 이르쿠츠크로 이송돼 한동안 억류됐다. 심문을 받았지만 홍범도의 명성 덕에 처형은 면했다. 아이러니하게도 이 시기 레닌이 그의 이름을 직접 알게 됐다는 기록이 있다.',
      card_ref: null,
    },

    // ── 18. 모스크바 — 레닌 접견 ──────────────────────────────
    {
      id: 'wp_18',
      type: 'political',
      year: 1922, month: null, day: null,
      title_ko: '모스크바 — 레닌 접견',
      place_ko: '러시아 모스크바',
      lat: 55.75, lng: 37.62,
      stay: '1922',
      summary_ko: '소련의 극동 민족 정책의 일환으로 고려인 독립운동 대표단이 모스크바를 방문했고, 홍범도도 포함됐다. 레닌을 만나 권총 한 자루와 금화를 선물 받았다는 일화가 전해진다. 이 방문이 훗날 뉴라이트 계열의 "홍범도 공산주의자" 공격의 빌미가 됐지만, 당시는 독립운동을 위해 소련과 연대를 모색하는 현실적 선택이었다.',
      card_ref: null,
    },

    // ── 19. 연해주 재정착 — 집단농장 생활 ──────────────────────
    {
      id: 'wp_19',
      type: 'life',
      year: 1923, month: null, day: null,
      title_ko: '연해주 — 집단농장과 고려인 공동체',
      place_ko: '러시아 연해주 스파스크',
      lat: 44.60, lng: 132.82,
      stay: '1923~1937',
      summary_ko: '모스크바 방문 이후 연해주로 돌아와 고려인 집단농장(콜호즈)에서 생활했다. 농사를 지으며 고려인 공동체와 함께 살았다. 독립군 사령관이었던 사람이 이제 농부로 하루하루를 버텼다. 그는 이 14년을 연해주에서 보내며 조용히 늙어갔다.',
      card_ref: null,
    },

    // ── 20. 강제이주 — 카자흐스탄으로 ──────────────────────────
    {
      id: 'wp_20',
      type: 'exile',
      year: 1937, month: 9, day: null,
      title_ko: '강제이주 — 화물열차에 실려 카자흐스탄으로',
      place_ko: '카자흐스탄 크질오르다',
      lat: 44.84, lng: 65.51,
      stay: '1937~1943',
      summary_ko: '스탈린의 고려인 강제이주령으로 17만여 명의 연해주 고려인이 화물열차에 실려 중앙아시아로 추방됐다. 홍범도도 예외가 없었다. 먹을 것도 변변치 않은 화물칸에서 한 달을 넘게 이동해 카자흐스탄 크질오르다에 내려졌다. 나이 69세였다.',
      card_ref: 'migration_1937_01',  // 기존 카드 연결
    },

    // ── 21. 크질오르다 — 극장 수위 ──────────────────────────────
    {
      id: 'wp_21',
      type: 'life',
      year: 1939, month: null, day: null,
      title_ko: '크질오르다 — 고려극장 수위',
      place_ko: '카자흐스탄 크질오르다',
      lat: 44.84, lng: 65.51,
      stay: '1939~1943',
      summary_ko: '강제이주 후 카자흐스탄 크질오르다의 고려인 극장(카자흐스탄 고려극장)에서 수위로 일했다. 봉오동·청산리의 영웅이 극장 문을 열고 닫는 일을 하며 노년을 보냈다. 그를 알아보는 사람들은 영웅에게 경의를 표했지만, 소련 당국은 그를 그저 이주민 노인으로 취급했다.',
      card_ref: null,
    },

    // ── 22. 사망 ──────────────────────────────────────────────
    {
      id: 'wp_22',
      type: 'death',
      year: 1943, month: 10, day: 25,
      title_ko: '사망 — 조국의 해방을 보지 못하고',
      place_ko: '카자흐스탄 크질오르다',
      lat: 44.84, lng: 65.51,
      stay: null,
      summary_ko: '1943년 10월 25일, 카자흐스탄 크질오르다에서 향년 75세로 사망했다. 조국 해방을 불과 2년 앞두고 눈을 감았다. 아내도 아들도 없이 타향에서 홀로 죽었다. 그는 마지막 순간까지 자신이 죽기 전에 고국을 밟겠다는 말을 했다고 전해진다.',
      card_ref: null,
    },

    // ── 23. 독립 후 잊혀짐 ──────────────────────────────────────
    {
      id: 'wp_23',
      type: 'political',
      year: 1962, month: null, day: null,
      title_ko: '건국훈장 추서 — 뒤늦은 국가의 인정',
      place_ko: '대한민국 서울',
      lat: 37.57, lng: 126.98,
      stay: null,
      summary_ko: '사망 후 19년이 지난 1962년 대한민국 정부는 홍범도에게 건국훈장 대통령장을 추서했다. 그러나 소련 국적자였고 공산당에 가입한 이력이 있다는 이유로 오랫동안 반공 국가에서 온전히 기념받지 못했다. 봉오동·청산리의 영웅은 냉전의 이념 갈등 속에서 반쪽짜리 평가를 받았다.',
      card_ref: null,
    },

    // ── 24. 뉴라이트 논쟁 ──────────────────────────────────────
    {
      id: 'wp_24',
      type: 'political',
      year: 2023, month: 8, day: null,
      title_ko: '흉상 철거 논란 — 역사 왜곡과 싸우다',
      place_ko: '대한민국 서울 (육군사관학교)',
      lat: 37.65, lng: 127.04,
      stay: null,
      summary_ko: '2023년 국방부가 육군사관학교 내 홍범도 흉상 철거를 지시하면서 큰 논란이 일었다. "소련 공산당원이었다"는 이유였다. 역사학계와 시민사회는 독립운동의 현실적 선택과 냉전 이데올로기를 혼동한 역사 왜곡이라고 반발했다. 그는 죽은 뒤에도 이념의 이름으로 공격받았다.',
      card_ref: null,
    },

    // ── 25. 유해 봉환 ──────────────────────────────────────────
    {
      id: 'wp_25',
      type: 'repatriation',
      year: 2021, month: 8, day: 15,
      title_ko: '유해 봉환 — 78년 만에 고국으로',
      place_ko: '카자흐스탄 크질오르다 → 대한민국 서울',
      lat: 44.84, lng: 65.51,
      stay: null,
      summary_ko: '2021년 광복절, 홍범도의 유해가 카자흐스탄에서 대한민국으로 봉환됐다. 1943년 크질오르다에서 눈을 감은 지 78년 만이었다. 그가 평생 꿈꾸던 고국 땅을 마침내 밟았다. 공군 수송기로 귀국한 유해는 국민의 애도 속에 서울 동작동 국립현충원에 임시 안장됐다.',
      card_ref: null,
    },

    // ── 26. 대전현충원 안장 ────────────────────────────────────
    {
      id: 'wp_26',
      type: 'repatriation',
      year: 2021, month: 9, day: null,
      title_ko: '대전현충원 영원한 안장 — 153년 여정의 끝',
      place_ko: '대전현충원',
      lat: 36.27, lng: 127.34,
      stay: null,
      summary_ko: '봉환 후 대전 국립현충원 독립유공자 묘역에 영구 안장됐다. 1868년 평양에서 태어나 함경도 포수로, 의병 대장으로, 봉오동·청산리 영웅으로, 자유시의 생존자로, 카자흐스탄 극장 수위로 살다 간 한 인간의 153년 여정이 여기서 끝났다. 그는 끝내 고국에 돌아왔다.',
      card_ref: null,
    },

  ],

  // ── 이동 경로 선 ──────────────────────────────────────────────
  // line_style: 'solid' = 확실한 이동 경로 | 'dashed' = 추정 경로
  // move_type: 'overland' | 'sea' | 'train' | 'forced'
  segments: [
    { from:'wp_01', to:'wp_02', move_type:'overland', line_style:'dashed', note:'유년기 이동 (정확한 경로 미상)' },
    { from:'wp_02', to:'wp_03', move_type:'overland', line_style:'dashed', note:'황해도 이주 (추정)' },
    { from:'wp_03', to:'wp_04', move_type:'overland', line_style:'solid', note:'함경도 이주' },
    { from:'wp_04', to:'wp_05', move_type:'overland', line_style:'solid', note:'의병 활동 이동' },
    { from:'wp_05', to:'wp_06', move_type:'overland', line_style:'solid', note:'의병 봉기 거점 이동' },
    { from:'wp_06', to:'wp_07', move_type:'overland', line_style:'solid', note:'전투 지역 이동' },
    { from:'wp_07', to:'wp_08', move_type:'overland', line_style:'solid', note:'동일 지역' },
    { from:'wp_08', to:'wp_09', move_type:'overland', line_style:'solid', note:'두만강 월경 — 간도 망명' },
    { from:'wp_09', to:'wp_10', move_type:'overland', line_style:'solid', note:'연해주 망명' },
    { from:'wp_10', to:'wp_11', move_type:'overland', line_style:'solid', note:'동일 지역' },
    { from:'wp_11', to:'wp_12', move_type:'overland', line_style:'solid', note:'북간도 귀환' },
    { from:'wp_12', to:'wp_13', move_type:'overland', line_style:'solid', note:'봉오동으로 이동' },
    { from:'wp_13', to:'wp_14', move_type:'overland', line_style:'solid', note:'청산리로 이동' },
    { from:'wp_14', to:'wp_15', move_type:'overland', line_style:'solid', note:'간도참변 피해 밀산 집결' },
    { from:'wp_15', to:'wp_16', move_type:'overland', line_style:'solid', note:'자유시로 이동' },
    { from:'wp_16', to:'wp_17', move_type:'train', line_style:'solid', note:'이르쿠츠크 이송 (억류)' },
    { from:'wp_17', to:'wp_18', move_type:'train', line_style:'solid', note:'모스크바 방문' },
    { from:'wp_18', to:'wp_19', move_type:'train', line_style:'solid', note:'연해주 귀환' },
    { from:'wp_19', to:'wp_20', move_type:'forced', line_style:'solid', note:'강제이주 — 화물열차 1937.9' },
    { from:'wp_20', to:'wp_21', move_type:'overland', line_style:'solid', note:'크질오르다 정착' },
    { from:'wp_21', to:'wp_22', move_type:'overland', line_style:'solid', note:'동일 지역 — 사망' },
    { from:'wp_25', to:'wp_26', move_type:'overland', line_style:'solid', note:'대전현충원 최종 안장' },
  ],
};

// 루트 렌더러에 등록 — routeRenderer.js가 로드된 뒤 실행됨
if (typeof window !== 'undefined' && window.registerRoute) {
  window.registerRoute(ROUTE_HONG_BEOM_DO);
}
