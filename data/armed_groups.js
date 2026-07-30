// data/armed_groups.js — 항일무장단체 총람
//
// 2026-07-30 신설. 왕두목 기획.
//
// ══════════════════════════════════════════════════════════════
// ■ 이 파일은 ATLAS에 처음 들어오는 '사건이 아닌' 데이터다
// ══════════════════════════════════════════════════════════════
// 지금까지 ATLAS의 데이터는 모두 사건(event)이었다 — 특정 시점에 특정
// 장소에서 일어난 일. 그런데 무장단체는 성격이 다르다.
//
//   · 시점이 아니라 기간을 가진다 (1922~1929)
//   · 점이 아니라 영역을 가진다 (서간도 일대)
//   · 그리고 결정적으로, 서로 관계를 가진다 (통합·분열·개편)
//
// 마지막 항목이 이 총람의 존재 이유다. 단체 이름 목록은 이미 여러 곳에
// 있지만, "통의부가 갈라져 참의부가 나왔고 정의부·신민부와 다시 합쳐
// 국민부가 되었다"는 계보를 한눈에 보여주는 자료는 드물다.
//
// ■ 지도에서 계보가 루트가 된다
// 왕두목 요청: "전체 계보를 지도 위에서 마치 루트처럼 한눈에 다 보길
// 원했다." 이 데이터 구조가 그것을 가능하게 한다 — successors/predecessors
// 를 좌표와 함께 이으면, 계보도가 곧 부대의 지리적 이동 경로가 된다.
// 삼원포(1919) → 환인(1922) → 집안·화전(1923~24) → 신빈(1929)은
// 계보이면서 동시에 실제로 부대가 움직인 길이다.
//
// ══════════════════════════════════════════════════════════════
// ■ 편집 기준
// ══════════════════════════════════════════════════════════════
// 1. GPT가 제시한 목록을 그대로 쓰지 않았다. 검증에서 걸러낸 것:
//    · 북로군정서와 '대한군정서'를 별개로 본 것 → 같은 조직이다.
//      중광단 → 대한정의단 → 대한군정회 → 대한군정부 → (임정 요구로
//      개칭) 대한군정서. 통칭이 북로군정서다. 하나로 합쳤다.
//    · '광복군 국내정진군'과 'OSS 합동 국내침투공작대' → 같은 것이다.
//      독수리작전(Eagle Project). 한국광복군 항목 안에서 다룬다.
//    · '서로독립군단', '서로군정서 특공대', '북만독립군' → 표준
//      조직명으로 확인되지 않는다. 넣지 않았다.
//
// 2. 1차 범위는 계보 연결이 명확한 16개다. 33개를 한 번에 담으면
//    검증이 부실해진다. 확실한 뼈대를 먼저 세우고 붙여 나간다.
//
// 3. 2차로 미룬 것 — 동북항일연군, 사할린의용대.
//    전자는 김일성 부대를 포함한 중국공산당 주도 연합군이고, 후자는
//    자유시참변과 직결된다. 둘 다 해석이 갈리는 축이어서, 건국전쟁
//    팩트체크 시리즈에 적용한 기준(확인된 사실만, 양측 제시)에 맞춰
//    별도로 다뤄야 한다. 급하게 끼워 넣지 않는다.
//
// ■ 좌표 정밀도 — coordPrecision
//   'site'   실제 유적·전적지 수준 (봉오동·청산리 등 전투 지점)
//   'county' 현(縣) 중심 근사치 — 단체의 '거점'은 대개 이 수준이다
//   'city'   도시 중심
// 단체 거점은 대부분 county 근사치다. 전투 지점과 달리 사령부 위치가
// 정확히 특정되지 않거나 여러 차례 옮겨 다닌 경우가 많다. 지도에
// 점으로 찍되, 정밀도를 데이터에 명시해 과장하지 않는다.
//
// ■ verify
//   true로 표시된 항목은 왕두목 검토가 필요한 지점이다. 연도·인물은
//   비교적 확실하지만 세부(정확한 해체 시점, 지휘관 교체 등)는
//   자료마다 차이가 있는 경우가 있다.

window.ARMED_GROUPS = {

  // ── 계통 ──────────────────────────────────────────────────
  // 지도에서 색으로 구분한다. 1920년 만주처럼 단체가 밀집한 구간에서
  // 밀집이 '소음'이 아니라 '결'로 읽히게 하는 장치다.
  lineages: {
    nationalist: { label: '민족주의 계열', color: '#c8963c' },
    kpg:         { label: '임정 직할·연계', color: '#3f7fbf' },
    autonomy:    { label: '자치기관 겸 군사조직', color: '#7a9a4b' },
    socialist:   { label: '사회주의 계열', color: '#b5544a' },
  },

  // ── 권역 ──────────────────────────────────────────────────
  // 단체가 겹칠 때 묶는 단위. 지도 축척이 낮을 때는 권역 배지로 접고,
  // 확대하면 개별 단체로 펼친다.
  regions: {
    bukgando:  { label: '북간도',   lat: 42.90, lng: 129.50 },
    seogando:  { label: '서간도',   lat: 41.60, lng: 125.60 },
    bukman:    { label: '북만주',   lat: 45.20, lng: 129.20 },
    maritime:  { label: '연해주',   lat: 45.50, lng: 133.00 },
    guannei:   { label: '중국 관내', lat: 30.50, lng: 110.00 },
  },

  groups: [

    // ══════════════════════════════════════════════════════
    // 1919~1921 — 3·1운동 직후, 만주·연해주 무장투쟁의 절정기
    // ══════════════════════════════════════════════════════

    {
      id: 'ag-daehan-dongnipgun',
      name: '대한독립군',
      alsoKnown: [],
      lineage: 'nationalist',
      region: 'bukgando',
      founded: 1919, foundedNote: '1919년 8월경',
      dissolved: 1921, dissolvedNote: '대한독립군단으로 통합 후 자유시참변으로 와해',
      base: '북간도 왕청현·연길 일대',
      lat: 42.91, lng: 129.51, coordPrecision: 'county',
      commanders: ['홍범도'],
      battles: ['봉오동 전투(1920.6)', '청산리 전투(1920.10)'],
      predecessors: [],
      successors: ['ag-daehan-dongnipgundan'],
      // 연합 지휘부 참여 — 통합되어 사라진 것이 아니라 작전 단위로 함께
      // 싸운 것이다. successors에 넣으면 봉오동 후 소멸한 것처럼 왜곡된다.
      coalitions: ['ag-bukro-dokgunbu'],
      summary: '홍범도가 이끈 부대. 봉오동에서 대한북로독군부의 한 축으로 싸웠고, '
             + '청산리에서는 북로군정서군과 협동작전을 벌였다. 두 전투 모두에 이름이 '
             + '오르는 거의 유일한 부대다.',
      basis: '한국민족문화대백과사전, 독립기념관 자료',
      verify: false,
    },

    {
      id: 'ag-gunmudodokbu',
      name: '군무도독부',
      alsoKnown: ['대한군무도독부'],
      lineage: 'nationalist',
      region: 'bukgando',
      founded: 1919, foundedNote: '1919년 8월경',
      dissolved: 1920, dissolvedNote: '1920년 5월 대한북로독군부로 통합',
      base: '북간도 왕청현 봉오동',
      lat: 42.95, lng: 129.65, coordPrecision: 'county',
      commanders: ['최진동'],
      battles: ['봉오동 전투(1920.6)'],
      predecessors: [],
      successors: [],
      coalitions: ['ag-bukro-dokgunbu'],
      summary: '최진동 형제의 재력을 기반으로 봉오동에 자리 잡은 부대. 봉오동은 '
             + '이들의 근거지였고, 그래서 일본군이 그곳으로 유인되었다.',
      basis: '한국민족문화대백과사전',
      verify: false,
    },

    {
      id: 'ag-bukro-dokgunbu',
      name: '대한북로독군부',
      alsoKnown: ['북로독군부'],
      lineage: 'nationalist',
      region: 'bukgando',
      founded: 1920, foundedNote: '1920년 5월',
      dissolved: 1920, dissolvedNote: '봉오동 전투 후 부대별로 분리·이동',
      base: '북간도 왕청현 봉오동',
      lat: 42.95, lng: 129.65, coordPrecision: 'site',
      commanders: ['최진동(부장)', '홍범도(북로제1군사령부장)', '안무'],
      battles: ['봉오동 전투(1920.6)'],
      // ★ 계보상의 전신·후신이 아니다. 개별 부대가 각자 존속하면서
      //   작전을 위해 함께 만든 지휘부다. 그래서 kind를 따로 둔다 —
      //   지도에서 계보선(실선)이 아니라 연합선(점선)으로 그린다.
      kind: 'coalition',
      predecessors: [],
      successors: [],
      members: ['ag-gunmudodokbu', 'ag-daehan-dongnipgun'],
      summary: '군무도독부·대한독립군·국민회군이 봉오동 방어를 위해 만든 연합 지휘부. '
             + '봉오동 전투를 치른 실체가 이것이다. 단일 부대가 아니라 연합체였다는 '
             + '점이 자주 흐려진다.',
      basis: '한국민족문화대백과사전',
      verify: true,
      verifyNote: '연합 지휘부의 정확한 편성 시점과 참여 부대 범위는 자료마다 차이가 있다.',
    },

    {
      id: 'ag-bukro-gunjeongseo',
      name: '북로군정서',
      alsoKnown: ['대한군정서', '중광단(전신)', '대한정의단(전신)'],
      lineage: 'nationalist',
      region: 'bukgando',
      founded: 1919, foundedNote: '1919년 12월 대한군정서로 개칭(통칭 북로군정서)',
      dissolved: 1921, dissolvedNote: '대한독립군단 합류 후 자유시참변으로 와해',
      base: '북간도 왕청현 서대파',
      lat: 43.32, lng: 129.75, coordPrecision: 'county',
      commanders: ['서일(총재)', '김좌진(사령관)', '이범석'],
      battles: ['청산리 전투(1920.10)'],
      predecessors: [],
      successors: ['ag-daehan-dongnipgundan'],
      summary: '대종교 계열 중광단에서 출발해 대한정의단·대한군정회를 거쳐 성립. '
             + '임시정부의 요구로 \'군정부\'에서 \'군정서\'로 이름을 바꿨다. '
             + '청산리대첩의 주력이다.',
      basis: '한국민족문화대백과사전, 독립기념관 자료',
      verify: false,
      note: 'GPT 목록은 \'북로군정서\'와 \'대한군정서\'를 별개 단체로 올렸으나 '
          + '같은 조직이다. 이 항목 하나로 통합했다.',
    },

    {
      id: 'ag-daehan-dongnipdan',
      name: '대한독립단',
      alsoKnown: [],
      lineage: 'nationalist',
      region: 'seogando',
      founded: 1919, foundedNote: '1919년 4월',
      dissolved: 1922, dissolvedNote: '대한통의부로 통합',
      base: '서간도 유하현 일대',
      lat: 42.60, lng: 125.90, coordPrecision: 'county',
      commanders: ['박장호', '조맹선'],
      battles: [],
      predecessors: [],
      successors: ['ag-daehan-tonguibu'],
      summary: '의병 계열 인물들이 중심이 된 서간도 무장단체. 복벽주의 성향이 강해 '
             + '뒤에 공화주의 세력과 갈등을 빚었고, 이 갈등이 통의부 분열의 '
             + '배경이 되었다.',
      basis: '한국민족문화대백과사전',
      verify: false,
    },

    {
      id: 'ag-seoro-gunjeongseo',
      name: '서로군정서',
      alsoKnown: ['한족회 군사기관'],
      lineage: 'nationalist',
      region: 'seogando',
      founded: 1919, foundedNote: '1919년 4월경',
      dissolved: 1922, dissolvedNote: '대한통의부로 통합',
      base: '서간도 유하현 삼원포',
      lat: 42.60, lng: 125.90, coordPrecision: 'county',
      commanders: ['이상룡', '여준', '지청천'],
      battles: [],
      predecessors: [],
      successors: ['ag-daehan-tonguibu'],
      summary: '한족회의 군사기관. 신흥무관학교를 운영해 독립군 지휘관을 대량 배출한 '
             + '것이 가장 큰 기여다. 뒷날 여러 부대의 간부가 이곳 출신이다.',
      basis: '한국민족문화대백과사전, 독립기념관 자료',
      verify: false,
    },

    {
      id: 'ag-gwangbokgun-chongyeong',
      name: '대한광복군총영',
      alsoKnown: ['광복군총영'],
      lineage: 'kpg',
      region: 'seogando',
      founded: 1920, foundedNote: '1920년',
      dissolved: 1922, dissolvedNote: '대한통의부로 통합',
      base: '서간도 관전현 일대',
      lat: 40.73, lng: 124.78, coordPrecision: 'county',
      commanders: ['오동진', '이탁'],
      battles: [],
      predecessors: [],
      successors: ['ag-daehan-tonguibu'],
      summary: '대한민국임시정부 직할 무장조직으로 편성된 부대. 국내 진입 작전과 '
             + '일제 기관 습격을 시도했다. 임정이 만주 무장세력을 직접 통솔하려 한 '
             + '시도의 사례다.',
      basis: '한국민족문화대백과사전',
      verify: true,
      verifyNote: '창설 시점과 임정 직할 편입 시점 표기가 자료마다 다르다.',
    },

    {
      id: 'ag-daehan-dongnipgundan',
      name: '대한독립군단',
      alsoKnown: [],
      lineage: 'nationalist',
      region: 'maritime',
      founded: 1920, foundedNote: '1920년 12월경 밀산에서 결성',
      dissolved: 1921, dissolvedNote: '1921년 6월 자유시참변으로 와해',
      base: '밀산 → 연해주 이만·자유시',
      lat: 45.55, lng: 131.87, coordPrecision: 'county',
      commanders: ['서일(총재)', '김좌진', '홍범도'],
      battles: [],
      predecessors: ['ag-bukro-gunjeongseo', 'ag-daehan-dongnipgun'],
      // 자유시참변 후 북만으로 돌아온 잔여 세력이 신민부 결성으로 이어진다.
      successors: ['ag-sinminbu'],
      summary: '경신참변 이후 일본군의 추격을 피해 북만 밀산에 모인 여러 부대가 '
             + '결성한 통합군단. 연해주로 이동했다가 1921년 자유시참변으로 '
             + '사실상 해체됐다. 만주 무장투쟁 1기의 종점이다.',
      basis: '한국민족문화대백과사전',
      verify: true,
      verifyNote: '참여 부대의 범위와 병력 규모는 자료 간 편차가 크다. '
                + '자유시참변 자체는 해석이 갈리는 사안이므로 별도 서술이 필요하다.',
    },

    // ══════════════════════════════════════════════════════
    // 1922~1929 — 통합과 분열, 그리고 3부(참의·정의·신민)
    // ══════════════════════════════════════════════════════

    {
      id: 'ag-daehan-tonguibu',
      name: '대한통의부',
      alsoKnown: ['통의부'],
      lineage: 'autonomy',
      region: 'seogando',
      founded: 1922, foundedNote: '1922년 8월',
      dissolved: 1924, dissolvedNote: '분열 — 참의부·정의부로 갈라짐',
      base: '서간도 환인현',
      lat: 41.27, lng: 125.36, coordPrecision: 'county',
      commanders: ['김동삼', '신팔균', '오동진'],
      battles: [],
      predecessors: ['ag-seoro-gunjeongseo', 'ag-daehan-dongnipdan',
                     'ag-gwangbokgun-chongyeong'],
      successors: ['ag-chamuibu', 'ag-jeonguibu'],
      summary: '서간도 무장단체 대부분을 묶은 통합체. 행정과 군사를 함께 맡았다. '
             + '그러나 복벽주의와 공화주의의 노선 대립으로 2년을 못 넘기고 갈라졌다. '
             + '독립운동 진영의 통합이 왜 어려웠는지를 보여주는 대표 사례다.',
      basis: '한국민족문화대백과사전',
      verify: false,
    },

    {
      id: 'ag-chamuibu',
      name: '참의부',
      alsoKnown: ['육군주만참의부', '대한민국임시정부 육군주만참의부'],
      lineage: 'kpg',
      region: 'seogando',
      founded: 1923, foundedNote: '1923년',
      dissolved: 1929, dissolvedNote: '국민부로 통합',
      base: '서간도 집안현',
      lat: 41.12, lng: 126.19, coordPrecision: 'county',
      commanders: ['백광운(채찬)', '심용준'],
      battles: [],
      predecessors: ['ag-daehan-tonguibu'],
      successors: ['ag-gukminbu'],
      summary: '통의부에서 갈라져 임시정부 직할을 택한 세력. 압록강 접경에 자리 잡아 '
             + '국내 진입 작전을 여러 차례 벌였다. 이름에 \'육군\'이 들어간 것은 '
             + '임정 정규군 편제를 지향했기 때문이다.',
      basis: '한국민족문화대백과사전',
      verify: false,
    },

    {
      id: 'ag-jeonguibu',
      name: '정의부',
      alsoKnown: [],
      lineage: 'autonomy',
      region: 'seogando',
      founded: 1924, foundedNote: '1924년 11월',
      dissolved: 1929, dissolvedNote: '국민부로 통합',
      base: '서간도 화전현·유하현 일대',
      lat: 42.98, lng: 126.75, coordPrecision: 'county',
      commanders: ['오동진', '지청천', '김동삼'],
      battles: [],
      predecessors: ['ag-daehan-tonguibu'],
      successors: ['ag-gukminbu'],
      summary: '3부 가운데 관할 한인 인구와 조직 규모가 가장 컸다. 자치행정·교육·'
             + '재판까지 맡은 사실상의 자치정부였고, 그 산하에 군사조직을 두었다. '
             + '무장단체를 \'군대\'로만 보면 놓치는 성격이다.',
      basis: '한국민족문화대백과사전',
      verify: false,
    },

    {
      id: 'ag-sinminbu',
      name: '신민부',
      alsoKnown: [],
      lineage: 'autonomy',
      region: 'bukman',
      founded: 1925, foundedNote: '1925년 3월',
      dissolved: 1929, dissolvedNote: '분화 — 일부는 국민부, 일부는 한국독립당 계열로',
      base: '북만주 목릉·영안 일대',
      lat: 44.92, lng: 130.53, coordPrecision: 'county',
      commanders: ['김좌진', '김혁', '조성환'],
      battles: [],
      predecessors: ['ag-daehan-dongnipgundan'],
      successors: ['ag-gukminbu', 'ag-hanguk-dongnipgun'],
      summary: '자유시참변 이후 북만으로 돌아온 대종교·군정서 계열이 중심이 됐다. '
             + '김좌진이 1930년 피살된 뒤 세력이 크게 약화되고, 잔여 세력이 '
             + '한국독립당·한국독립군으로 이어진다.',
      basis: '한국민족문화대백과사전',
      verify: true,
      verifyNote: '해체 시점과 잔여 세력의 이동 경로는 자료마다 서술이 다르다.',
    },

    {
      id: 'ag-gukminbu',
      name: '국민부',
      alsoKnown: [],
      lineage: 'autonomy',
      region: 'seogando',
      founded: 1929, foundedNote: '1929년',
      dissolved: 1930, dissolvedNote: '군사조직을 조선혁명군으로 재편',
      base: '남만주 신빈현',
      lat: 41.73, lng: 125.04, coordPrecision: 'county',
      commanders: ['현익철', '고이허'],
      battles: [],
      predecessors: ['ag-chamuibu', 'ag-jeonguibu', 'ag-sinminbu'],
      successors: ['ag-joseon-hyeokmyeonggun'],
      summary: '3부 통합운동의 결과로 성립. 다만 완전 통합은 이루지 못했고, 참여하지 '
             + '않은 세력은 따로 남았다. 산하 조선혁명당·조선혁명군 체계로 '
             + '1930년대 남만주 무장투쟁을 이어간다.',
      basis: '한국민족문화대백과사전',
      verify: false,
    },

    // ══════════════════════════════════════════════════════
    // 1929~1945 — 만주사변 이후, 그리고 중국 관내로
    // ══════════════════════════════════════════════════════

    {
      id: 'ag-joseon-hyeokmyeonggun',
      name: '조선혁명군',
      alsoKnown: [],
      lineage: 'nationalist',
      region: 'seogando',
      founded: 1929, foundedNote: '1929년 말~1930년',
      dissolved: 1938, dissolvedNote: '지도부 상실과 일제 토벌로 사실상 소멸',
      base: '남만주 신빈현 일대',
      lat: 41.73, lng: 125.04, coordPrecision: 'county',
      commanders: ['양세봉', '고이허', '김활석'],
      battles: ['영릉가 전투(1932)', '흥경성 전투(1933)'],
      predecessors: ['ag-gukminbu'],
      successors: [],
      summary: '만주사변 이후 중국의용군과 연합해 남만주에서 싸운 부대. 영릉가·흥경성 '
             + '전투가 대표적이다. 1934년 양세봉이 피살된 뒤 급격히 약화됐다. '
             + '만주에 남아 끝까지 싸운 민족주의 계열 부대다.',
      basis: '한국민족문화대백과사전, 독립기념관 자료',
      verify: true,
      verifyNote: '소멸 시점은 1938년 전후로 자료마다 다르게 서술된다.',
    },

    {
      id: 'ag-hanguk-dongnipgun',
      name: '한국독립군',
      alsoKnown: ['한국독립당 군사조직'],
      lineage: 'nationalist',
      region: 'bukman',
      founded: 1930, foundedNote: '1930년경',
      dissolved: 1934, dissolvedNote: '중국 관내로 이동, 뒤에 한국광복군에 합류',
      base: '북만주 아성·위허 일대',
      lat: 45.54, lng: 126.97, coordPrecision: 'county',
      commanders: ['지청천', '이청천', '홍진'],
      battles: ['쌍성보 전투(1932)', '대전자령 전투(1933)'],
      predecessors: ['ag-sinminbu'],
      successors: ['ag-hanguk-gwangbokgun'],
      summary: '만주사변 후 중국 호로군과 연합해 북만에서 싸웠다. 대전자령에서 큰 '
             + '전과를 올렸으나 전리품 분배 갈등 등으로 중국군과 결별하고 관내로 '
             + '이동했다. 지청천이 뒷날 광복군 총사령이 되는 연결점이다.',
      basis: '한국민족문화대백과사전',
      verify: false,
    },

    {
      id: 'ag-joseon-uiyongdae',
      name: '조선의용대',
      alsoKnown: ['조선의용군(화북 계열의 전신)'],
      lineage: 'socialist',
      region: 'guannei',
      founded: 1938, foundedNote: '1938년 10월 한커우',
      dissolved: 1942, dissolvedNote: '분화 — 일부 한국광복군 편입, 일부 화북으로',
      base: '중국 한커우 → 각 전선',
      lat: 30.58, lng: 114.28, coordPrecision: 'city',
      commanders: ['김원봉', '윤세주', '박효삼'],
      battles: [],
      predecessors: [],
      successors: ['ag-hanguk-gwangbokgun'],
      summary: '조선민족혁명당을 기반으로 중국 관내에서 창설. 중국군과 함께 선전·'
             + '정보 활동을 맡았다. 1940년대 초 화북으로 간 세력과 충칭에 남아 '
             + '광복군에 편입된 세력으로 갈라진다 — 해방 후 남북 분단과 겹치는 '
             + '분기점이다.',
      basis: '한국민족문화대백과사전, 독립기념관 자료',
      verify: true,
      verifyNote: '화북 이동 세력(조선의용군)은 해석이 갈리는 축이므로 2차 확장에서 '
                + '별도 항목으로 다룬다.',
    },

    {
      id: 'ag-hanguk-gwangbokgun',
      name: '한국광복군',
      alsoKnown: ['광복군'],
      lineage: 'kpg',
      region: 'guannei',
      founded: 1940, foundedNote: '1940년 9월 충칭',
      dissolved: 1946, dissolvedNote: '1946년 복원 해산',
      base: '중국 충칭',
      lat: 29.56, lng: 106.55, coordPrecision: 'city',
      commanders: ['지청천(총사령)', '이범석', '김원봉(부사령)'],
      battles: ['인도·버마 전선 파견(1943~)', '국내정진군 편성(1945)'],
      predecessors: ['ag-hanguk-dongnipgun', 'ag-joseon-uiyongdae'],
      successors: [],
      summary: '대한민국임시정부의 정규군. 1942년 조선의용대 일부가 편입되며 '
             + '좌우 세력이 한 부대에 모였다. 1945년 미국 OSS와 합작해 국내진공을 '
             + '준비했으나(독수리작전·국내정진군) 일본 항복으로 실행되지 못했다.',
      basis: '한국민족문화대백과사전, 독립기념관 자료',
      verify: false,
      note: 'GPT 목록의 \'광복군 국내정진군\'과 \'OSS 합동 국내침투공작대\'는 '
          + '같은 것이며, 이 항목 안에서 다룬다.',
    },

  ],
};
