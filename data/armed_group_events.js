// data/armed_group_events.js — 항일무장단체 연표 사건
//
// 2026-07-30 신설.
//
// ══════════════════════════════════════════════════════════════
// ■ 왜 파일을 나눴는가 — 100개까지 가기 위해서
// ══════════════════════════════════════════════════════════════
// 처음에는 부대별로 routes/*.js를 하나씩 만들었다. 잘못된 설계였다.
// 왕두목 지적: "무장독립단체가 16개가 전부가 아니잖아? 100여개쯤 된다고
// 들었다."
//
// 부대마다 루트 파일을 만들면 100개일 때 루트 파일 100개 + 등록 400회가
// 된다. 감당이 안 된다. 그래서 구조를 뒤집었다.
//
//   단체 하나 = 데이터 한 덩어리 (armed_groups.js의 기본정보·계보
//                               + 이 파일의 연표 사건)
//   뷰어는 하나 (routes 카테고리의 「항일무장투쟁」)
//
// 100번째 단체를 추가할 때 할 일은 두 파일에 각각 한 덩어리를 넣는 것뿐이다.
// 새 파일도, 새 등록도 없다.
//
// ■ 이 데이터는 '동선'이 아니라 '시간'이다  ★중요★
// 왕두목 확정: "이번 루트는 동선이 중요한 루트가 아니야."
// 기존 루트(홍범도·김구)는 한 주체가 순서대로 이동한 경로다. 이 데이터는
// 다르다 — 그 해에 무엇이 존재했고 무슨 일이 있었는가를 담는다.
// 그래서 waypoint(순서 있는 지점)가 아니라 event(연도가 붙은 사건)다.
//
// ■ type
//   'founding'     창설
//   'reorg'        개편·개칭
//   'training'     양성기관 설치
//   'battle'       전투
//   'merger'       통합 (다른 조직으로 흡수·합류)
//   'split'        분열 (갈라져 나감)
//   'tragedy'      참변·피살
//   'political'    정세 변화
//   'dissolution'  해체·소멸
//
// ■ precision — 좌표 정밀도. 만주 지명은 현재 중국 행정구역과 대응이
//   완전하지 않은 경우가 있어, 확실하지 않은 것을 site로 올리지 않는다.
//   'site' 전적지 수준 / 'county' 현 단위 근사 / 'city' 도시 근사

window.ARMED_GROUP_EVENTS = {

  // ── 1919~1921 북간도 ──────────────────────────────────────
  'ag-daehan-dongnipgun': [
    { year:1919, month:8, type:'founding', title:'대한독립군 창설',
      place:'북간도 왕청·연길 일대', lat:42.91, lng:129.51, precision:'county',
      desc:'홍범도가 의병 출신과 한인 청년을 모아 부대를 편성했다. 3·1운동 직후 '
         + '만주 각지에서 무장단체가 우후죽순 생겨나던 흐름의 하나다.' },
    { year:1920, month:5, type:'merger', title:'대한북로독군부 연합 참여',
      place:'북간도 왕청현 봉오동', lat:42.95, lng:129.65, precision:'county',
      desc:'군무도독부·국민회군과 함께 연합 지휘부를 구성했다. 통합되어 사라진 것이 '
         + '아니라 작전 단위로 합친 것이며, 이후에도 독자 부대로 존속한다.' },
    { year:1920, month:6, type:'battle', title:'봉오동 전투',
      place:'북간도 왕청현 봉오동', lat:42.95, lng:129.65, precision:'county',
      desc:'일본군 추격대를 봉오동 골짜기로 유인해 타격했다. 독립군이 일본 정규군을 '
         + '상대로 거둔 첫 대규모 승리로 기록된다.' },
    { year:1920, month:10, type:'battle', title:'청산리 전투 협동',
      place:'북간도 화룡현 청산리 일대', lat:42.45, lng:128.85, precision:'county',
      desc:'북로군정서군과 협동해 싸웠다. 봉오동과 청산리 두 전투에 모두 이름이 오르는 '
         + '거의 유일한 부대다.' },
    { year:1920, month:12, type:'merger', title:'대한독립군단 합류',
      place:'북만주 밀산', lat:45.55, lng:131.87, precision:'county',
      desc:'경신참변으로 근거지를 잃고 북만으로 이동해 통합군단에 합류했다.' },
  ],

  'ag-gunmudodokbu': [
    { year:1919, month:8, type:'founding', title:'군무도독부 창설',
      place:'북간도 왕청현 봉오동', lat:42.95, lng:129.65, precision:'county',
      desc:'최진동 형제의 재력을 기반으로 봉오동에 자리 잡았다. 봉오동이 전장이 된 것은 '
         + '이곳이 이들의 근거지였기 때문이다.' },
    { year:1920, month:5, type:'merger', title:'대한북로독군부로 통합',
      place:'북간도 왕청현 봉오동', lat:42.95, lng:129.65, precision:'county',
      desc:'대한독립군·국민회군과 연합 지휘부를 구성했다.' },
    { year:1920, month:6, type:'battle', title:'봉오동 전투',
      place:'북간도 왕청현 봉오동', lat:42.95, lng:129.65, precision:'county',
      desc:'자기 근거지에서 방어전을 치렀다.' },
  ],

  'ag-bukro-dokgunbu': [
    { year:1920, month:5, type:'founding', title:'대한북로독군부 편성',
      place:'북간도 왕청현 봉오동', lat:42.95, lng:129.65, precision:'county',
      desc:'봉오동 방어를 위해 세 부대가 만든 연합 지휘부. 단일 부대가 아니라 '
         + '연합체였다는 점이 \'봉오동 전투는 누가 싸웠나\'를 흐리게 만든다.' },
    { year:1920, month:6, type:'battle', title:'봉오동 전투',
      place:'북간도 왕청현 봉오동', lat:42.95, lng:129.65, precision:'site',
      desc:'연합 지휘부의 이름으로 치른 전투. 이후 각 부대는 다시 독자적으로 움직인다.' },
    { year:1920, month:7, type:'dissolution', title:'연합 해소',
      place:'북간도 왕청현', lat:42.95, lng:129.65, precision:'county',
      desc:'작전 목적이 끝나면서 각 부대가 분리 이동했다.' },
  ],

  'ag-bukro-gunjeongseo': [
    { year:1911, month:null, type:'founding', title:'중광단 결성',
      place:'북간도 왕청현', lat:43.32, lng:129.75, precision:'county',
      desc:'서일이 대종교 신도를 중심으로 만든 결사. 처음에는 무장단체가 아니라 '
         + '교육·계몽 조직이었다. 북로군정서의 뿌리가 종교 결사였다는 점은 자주 흐려진다.' },
    { year:1919, month:3, type:'reorg', title:'대한정의단으로 개편',
      place:'북간도 왕청현', lat:43.32, lng:129.75, precision:'county',
      desc:'3·1운동 소식이 전해진 뒤 무장을 준비하며 성격이 바뀌었다. 교육 조직에서 '
         + '군사 조직으로 넘어간 분기점이다.' },
    { year:1919, month:12, type:'reorg', title:'대한군정서로 개칭',
      place:'북간도 왕청현 서대파', lat:43.38, lng:129.88, precision:'county',
      desc:'\'군정부\'는 정부를 자칭하는 것이어서 상해 임시정부가 개칭을 요구했다. '
         + '북쪽에 있다는 뜻으로 북로군정서라 통칭됐다. 널리 도는 목록이 '
         + '\'북로군정서\'와 \'대한군정서\'를 별개로 적는 일이 있는데 같은 조직이다.' },
    { year:1920, month:3, type:'training', title:'사관연성소 설치',
      place:'북간도 왕청현 서대파 십리평', lat:43.40, lng:129.92, precision:'county',
      desc:'김좌진이 사령관을 맡아 간부를 양성했다. 몇 달 뒤 청산리에서 싸운 병력의 '
         + '뼈대가 여기서 나왔다. 무장투쟁이 즉흥적 봉기가 아니었음을 보여준다.' },
    { year:1920, month:10, type:'battle', title:'청산리 전투',
      place:'북간도 화룡현 삼도구 청산리 일대', lat:42.45, lng:128.85, precision:'county',
      desc:'엿새간 백운평·완루구·어랑촌 등에서 벌어진 연속 교전의 총칭이다. '
         + '단일 전투가 아니었다는 점이 \'대첩\'이라는 말에 가려지곤 한다.' },
    { year:1920, month:12, type:'merger', title:'대한독립군단 합류',
      place:'북만주 밀산', lat:45.55, lng:131.87, precision:'county',
      desc:'경신참변으로 근거지가 초토화되자 북만으로 이동했다.' },
  ],

  'ag-daehan-dongnipgundan': [
    { year:1920, month:12, type:'founding', title:'대한독립군단 결성',
      place:'북만주 밀산', lat:45.55, lng:131.87, precision:'county',
      desc:'간도의 근거지를 잃은 부대들이 밀산에 모여 통합군단을 만들었다. 만주 '
         + '무장세력이 하나의 지휘체계로 묶인 거의 유일한 순간이다.' },
    { year:1921, month:1, type:'reorg', title:'연해주 이만으로 이동',
      place:'연해주 이만(현 달네레첸스크)', lat:45.87, lng:133.42, precision:'city',
      desc:'추격과 보급 문제로 러시아령으로 넘어갔다. 당시 연해주는 러시아 내전의 '
         + '전장이었고, 독립군은 적군 세력과의 협력에서 활로를 찾으려 했다.' },
    { year:1921, month:3, type:'reorg', title:'자유시 집결',
      place:'자유시(스보보드니)', lat:51.38, lng:128.13, precision:'city',
      desc:'여러 한인 무장세력이 모였으나 지휘권 통합을 두고 계열 간 대립이 격화됐다.' },
    { year:1921, month:6, type:'tragedy', title:'자유시참변',
      place:'자유시(스보보드니)', lat:51.38, lng:128.13, precision:'city',
      desc:'무장해제를 거부한 부대에 대한 무력 진압으로 다수가 희생됐다. 희생 규모와 '
         + '책임 소재는 자료에 따라 서술이 크게 다르다. 확실한 것은 이 사건 이후 '
         + '만주·연해주 무장세력이 회복하지 못했다는 결과다.' },
    { year:1921, month:9, type:'dissolution', title:'해체, 잔여 세력 북만 귀환',
      place:'북만주 목릉·영안 방면', lat:44.92, lng:130.53, precision:'county',
      desc:'살아남은 세력 일부가 북만으로 돌아왔고, 1925년 신민부 결성으로 이어진다.' },
  ],

  // ── 서간도 ────────────────────────────────────────────────
  'ag-seoro-gunjeongseo': [
    { year:1911, month:null, type:'founding', title:'경학사·신흥강습소 설립',
      place:'서간도 유하현 삼원포', lat:42.60, lng:125.90, precision:'county',
      desc:'이회영 형제와 이상룡 등이 재산을 팔아 건너와 한인 자치조직과 교육기관을 '
         + '세웠다. 총을 들기 전에 사람과 마을을 먼저 만들었다는 점이 이 계열의 특징이다.' },
    { year:1914, month:null, type:'training', title:'백서농장 — 농장으로 위장한 병영',
      place:'서간도 통화현 일대', lat:41.72, lng:125.94, precision:'county',
      desc:'감시를 피하려 \'농장\'이라 불렀지만 실제로는 군사훈련 기지였다. 열악한 '
         + '조건에서 질병과 굶주림으로 희생도 컸다. 정확한 위치는 자료마다 다르다.' },
    { year:1919, month:4, type:'reorg', title:'한족회 결성과 서로군정서 편성',
      place:'서간도 유하현', lat:42.60, lng:125.90, precision:'county',
      desc:'행정(한족회)과 군사(군정서)를 나눈 구조를 갖췄다. 북간도의 북로군정서와 '
         + '대응해 \'서쪽의 군정서\'라 불렸다.' },
    { year:1919, month:5, type:'training', title:'신흥무관학교 확대',
      place:'서간도 유하현 고산자 일대', lat:42.70, lng:125.80, precision:'county',
      desc:'3·1운동 후 국내에서 청년들이 몰려들어 짧은 기간에 대규모 졸업생을 냈다. '
         + '이들이 북로군정서·대한독립군·의열단·뒷날 광복군까지 흘러 들어간다. '
         + '만주 무장투쟁의 인적 저수지였다.' },
    { year:1920, month:10, type:'tragedy', title:'경신참변 — 폐교와 근거지 상실',
      place:'서간도 유하현 → 안도 방면', lat:42.53, lng:128.24, precision:'county',
      desc:'일본군의 간도 출병으로 한인사회가 초토화되며 학교도 문을 닫았다. 기반이 '
         + '한인 마을이었기 때문에, 마을을 없애는 것이 곧 부대를 없애는 것이었다.' },
    { year:1922, month:8, type:'merger', title:'대한통의부로 통합',
      place:'서간도 환인현', lat:41.27, lng:125.36, precision:'county',
      desc:'흩어진 서간도 무장단체들이 하나로 뭉쳤다.' },
  ],

  'ag-daehan-dongnipdan': [
    { year:1919, month:4, type:'founding', title:'대한독립단 결성',
      place:'서간도 유하현 일대', lat:42.60, lng:125.90, precision:'county',
      desc:'의병 계열 인물들이 중심이 됐다. 복벽주의 성향이 강해 뒤에 공화주의 세력과 '
         + '갈등을 빚었고, 이 갈등이 통의부 분열의 배경이 된다.' },
    { year:1922, month:8, type:'merger', title:'대한통의부로 통합',
      place:'서간도 환인현', lat:41.27, lng:125.36, precision:'county',
      desc:'노선이 다른 세력과 한 조직에 묶였다.' },
  ],

  'ag-gwangbokgun-chongyeong': [
    { year:1920, month:6, type:'founding', title:'대한광복군총영 편성',
      place:'서간도 관전현 일대', lat:40.73, lng:124.78, precision:'county',
      desc:'임시정부 직할 무장조직으로 편성됐다. 임정이 만주 무장세력을 직접 통솔하려 '
         + '한 시도의 사례다.' },
    { year:1922, month:8, type:'merger', title:'대한통의부로 통합',
      place:'서간도 환인현', lat:41.27, lng:125.36, precision:'county',
      desc:'서간도 통합 흐름에 합류했다.' },
  ],

  // ── 1922~1929 통합과 분열 ─────────────────────────────────
  'ag-daehan-tonguibu': [
    { year:1922, month:8, type:'founding', title:'대한통의부 결성',
      place:'서간도 환인현', lat:41.27, lng:125.36, precision:'county',
      desc:'서간도 무장단체 대부분을 묶은 통합체. 행정과 군사를 함께 맡았다.' },
    { year:1923, month:8, type:'split', title:'참의부 분리',
      place:'서간도 집안현', lat:41.12, lng:126.19, precision:'county',
      desc:'복벽주의와 공화주의의 노선 대립으로 임정 직할을 택한 세력이 갈라져 나갔다.' },
    { year:1924, month:11, type:'split', title:'정의부 분리',
      place:'서간도 화전현', lat:42.98, lng:126.75, precision:'county',
      desc:'남은 세력이 정의부로 재편되며 통의부는 사실상 해체된다. 결성 2년 만이다. '
         + '독립운동 진영의 통합이 왜 어려웠는지를 보여주는 대표 사례다.' },
  ],

  'ag-chamuibu': [
    { year:1923, month:8, type:'founding', title:'육군주만참의부 결성',
      place:'서간도 집안현', lat:41.12, lng:126.19, precision:'county',
      desc:'임시정부 직할을 택한 세력이 세웠다. 이름에 \'육군\'이 들어간 것은 임정 '
         + '정규군 편제를 지향했기 때문이다.' },
    { year:1924, month:null, type:'battle', title:'국내 진입 작전 전개',
      place:'압록강 접경 일대', lat:41.00, lng:126.50, precision:'county',
      desc:'압록강을 건너 국내 일제 기관을 습격하는 작전을 여러 차례 벌였다. '
         + '접경에 자리 잡은 이유가 여기 있다.' },
    { year:1929, month:4, type:'merger', title:'국민부로 통합',
      place:'남만주 신빈현', lat:41.73, lng:125.04, precision:'county',
      desc:'3부 통합운동의 결과 국민부에 합류했다.' },
  ],

  'ag-jeonguibu': [
    { year:1924, month:11, type:'founding', title:'정의부 결성',
      place:'서간도 화전현', lat:42.98, lng:126.75, precision:'county',
      desc:'3부 가운데 관할 한인 인구와 조직 규모가 가장 컸다. 자치행정·교육·재판까지 '
         + '맡은 사실상의 자치정부였고 그 산하에 군사조직을 두었다. 무장단체를 '
         + '\'군대\'로만 보면 놓치는 성격이다.' },
    { year:1926, month:null, type:'reorg', title:'본부 유하현 방면 이동',
      place:'서간도 유하현', lat:42.60, lng:125.90, precision:'county',
      desc:'관할 구역 조정과 일제 압박에 따라 본부를 옮겼다. 자치기관이므로 \'이동\'은 '
         + '부대의 행군이 아니라 행정 중심의 이전이다.' },
    { year:1929, month:4, type:'merger', title:'국민부로 통합',
      place:'남만주 신빈현', lat:41.73, lng:125.04, precision:'county',
      desc:'3부 통합운동에 참여했다.' },
  ],

  'ag-sinminbu': [
    { year:1925, month:3, type:'founding', title:'신민부 결성',
      place:'북만주 목릉·영안 일대', lat:44.92, lng:130.53, precision:'county',
      desc:'자유시참변 이후 북만으로 돌아온 대종교·군정서 계열이 중심이 됐다.' },
    { year:1929, month:4, type:'split', title:'분화 — 일부 국민부 참여',
      place:'북만주', lat:44.92, lng:130.53, precision:'county',
      desc:'3부 통합운동에 일부가 참여했으나 완전 통합은 이루지 못했다.' },
    { year:1930, month:1, type:'tragedy', title:'김좌진 피살',
      place:'북만주 영안 일대', lat:44.34, lng:129.47, precision:'county',
      desc:'중심 지휘관을 잃으며 세력이 크게 약화됐다. 잔여 세력이 한국독립당·'
         + '한국독립군으로 이어진다.' },
  ],

  'ag-gukminbu': [
    { year:1929, month:4, type:'founding', title:'국민부 결성',
      place:'남만주 신빈현', lat:41.73, lng:125.04, precision:'county',
      desc:'3부 통합운동의 결과로 성립했다. 다만 완전 통합은 이루지 못했고, 참여하지 '
         + '않은 세력은 따로 남았다.' },
    { year:1929, month:12, type:'reorg', title:'조선혁명당·조선혁명군 편성',
      place:'남만주 신빈현', lat:41.73, lng:125.04, precision:'county',
      desc:'자치기관(국민부) → 정당(조선혁명당) → 군대(조선혁명군)의 3층 구조를 갖췄다.' },
  ],

  // ── 1929~1945 만주사변 이후, 그리고 관내로 ────────────────
  'ag-joseon-hyeokmyeonggun': [
    { year:1929, month:12, type:'founding', title:'조선혁명군 창설',
      place:'남만주 신빈현', lat:41.73, lng:125.04, precision:'county',
      desc:'국민부 산하 군사조직으로 편성됐다.' },
    { year:1932, month:3, type:'battle', title:'영릉가 전투',
      place:'남만주 신빈현 영릉가', lat:41.75, lng:124.80, precision:'county',
      desc:'만주사변 후 중국의용군과 연합해 싸웠다. 양세봉이 지휘했다. 1930년대 '
         + '남만주 한중 연합작전의 대표 사례다.' },
    { year:1933, month:null, type:'battle', title:'흥경성 전투',
      place:'남만주 흥경(현 신빈)', lat:41.73, lng:125.04, precision:'county',
      desc:'중국의용군과 함께 성을 공격했으나 전과를 오래 유지하지 못했다. 정규군을 '
         + '상대하는 유격부대의 한계가 드러난다.' },
    { year:1934, month:9, type:'tragedy', title:'양세봉 피살',
      place:'남만주 환인현 방면', lat:41.30, lng:125.40, precision:'county',
      desc:'일제의 공작으로 유인당해 피살됐다. 일제가 무력 토벌만이 아니라 공작을 '
         + '병행했음을 보여준다.' },
    { year:1938, month:null, type:'dissolution', title:'소멸',
      place:'남만주 일대', lat:41.60, lng:125.20, precision:'county',
      desc:'지도부 상실과 대규모 토벌, 근거지 한인사회 해체가 겹쳤다. 소멸 시점은 '
         + '자료마다 1937~1938년으로 다르게 서술된다. 만주에 남은 민족주의 계열 '
         + '무장투쟁이 여기서 막을 내린다.' },
  ],

  'ag-hanguk-dongnipgun': [
    { year:1930, month:7, type:'founding', title:'한국독립당·한국독립군 결성',
      place:'북만주 위허·아성 방면', lat:45.30, lng:128.10, precision:'county',
      desc:'김좌진 피살 후 북만 세력이 재편되는 과정에서 나왔다. 지청천이 사령관을 맡았다.' },
    { year:1931, month:9, type:'political', title:'만주사변 — 한중 연합의 계기',
      place:'만주 전역(봉천 기점)', lat:41.80, lng:123.43, precision:'city',
      desc:'중국인 무장세력도 일본군과 싸우게 되면서 연합작전의 길이 열렸다. 연합은 '
         + '이념보다 공동의 적에서 나왔고, 그래서 이해가 갈리면 쉽게 흔들렸다.' },
    { year:1932, month:9, type:'battle', title:'쌍성보 전투',
      place:'북만주 쌍성현', lat:45.38, lng:126.32, precision:'county',
      desc:'중국 호로군과 함께 공격해 점령했으나 반격으로 물러났다. 한 번의 교전이 '
         + '아니라 여러 차례의 공방전이었다.' },
    { year:1933, month:6, type:'battle', title:'대전자령 전투',
      place:'북만주 왕청·동녕 사이 대전자령', lat:43.60, lng:130.20, precision:'county',
      desc:'험한 고갯길에 매복해 일본군 수송부대를 습격했다. 1930년대 만주 무장투쟁 '
         + '최대 전과로 꼽힌다.' },
    { year:1933, month:11, type:'political', title:'중국군과 결별',
      place:'북만주 일대', lat:44.00, lng:129.50, precision:'county',
      desc:'노획 물자 분배와 지휘권을 둘러싼 마찰로 연합이 깨졌다. 승리가 곧 결별의 '
         + '계기가 된 셈이다. 연합에 의존한 무장투쟁의 구조적 취약점이 드러났다.' },
    { year:1934, month:null, type:'merger', title:'중국 관내로 이동',
      place:'중국 관내(난징·뤄양 방면)', lat:32.06, lng:118.80, precision:'city',
      desc:'만주를 떠났다. 지청천 등은 뒤에 임시정부와 결합해 1940년 한국광복군 창설로 '
         + '이어진다. 무장투쟁의 무대가 만주에서 관내로 옮겨가는 전환점이다.' },
  ],

  'ag-joseon-uiyongdae': [
    { year:1938, month:10, type:'founding', title:'조선의용대 창설',
      place:'중국 한커우', lat:30.58, lng:114.28, precision:'city',
      desc:'조선민족혁명당을 기반으로 중국 관내에서 창설됐다. 중국군과 함께 선전·정보 '
         + '활동을 맡았다.' },
    { year:1941, month:null, type:'split', title:'화북 이동 — 분화의 시작',
      place:'중국 화북(태항산 방면)', lat:36.60, lng:113.70, precision:'city',
      desc:'주력 일부가 화북으로 이동해 뒤에 조선의용군으로 이어진다. 충칭에 남은 '
         + '세력과 갈라지는 지점이며, 해방 후 남북 분단과 겹치는 분기다.' },
    { year:1942, month:5, type:'merger', title:'한국광복군 제1지대 편입',
      place:'중국 충칭', lat:29.56, lng:106.55, precision:'city',
      desc:'김원봉과 잔류 세력이 광복군에 편입됐다. 좌우 세력이 한 부대에 모인다.' },
  ],

  'ag-hanguk-gwangbokgun': [
    { year:1940, month:9, type:'founding', title:'한국광복군 창설',
      place:'중국 충칭', lat:29.56, lng:106.55, precision:'city',
      desc:'대한민국임시정부의 정규군으로 출범했다. 지청천이 총사령을 맡았다.' },
    { year:1942, month:5, type:'merger', title:'조선의용대 편입',
      place:'중국 충칭', lat:29.56, lng:106.55, precision:'city',
      desc:'좌우 세력이 한 부대에 모였다. 김원봉이 부사령에 올랐다.' },
    { year:1943, month:8, type:'battle', title:'인도·버마 전선 파견',
      place:'인도·버마 전선', lat:24.80, lng:93.94, precision:'city',
      desc:'영국군과 협조해 대적 선전·포로 심문 등을 맡은 공작대를 파견했다. '
         + '광복군이 연합군의 일원으로 활동한 사례다.' },
    { year:1945, month:5, type:'training', title:'OSS 합작 — 국내정진군 편성',
      place:'중국 시안 방면', lat:34.34, lng:108.94, precision:'city',
      desc:'미국 OSS와 함께 독수리작전을 준비했다. 국내 침투 후 봉기를 유도한다는 '
         + '구상이었다. 널리 도는 목록이 \'국내정진군\'과 \'OSS 합동 국내침투공작대\'를 '
         + '별개로 적는 일이 있는데 같은 것이다.' },
    { year:1945, month:8, type:'political', title:'국내진공 무산',
      place:'중국 시안 방면', lat:34.34, lng:108.94, precision:'city',
      desc:'실행 직전 일본이 항복하면서 작전은 이루어지지 못했다. 해방을 우리 손으로 '
         + '맞이하지 못했다는 아쉬움이 여기서 나온다.' },
  ],

};
