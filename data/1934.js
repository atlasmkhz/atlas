// data/1934.js — 1934도 사건 데이타 (4개)
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1934.js"></script> 로 불리웴니다.

const EVENTS_1934 = [

  // ══ 임시정부 — 군사력 재건의 시도 ══
  { id:'political_1934_01', year:1934, visible_from:1934, visible_until:1935,
    month:1, day:null, type:'political', priority:1,
    title_ko:'낙양군관학교 한인특별반 개설',
    title_en:'Korean Special Class at Luoyang Military Academy',
    title_ja:'洛陽軍官学校韓人特別班開設',
    place_ko:'낙양 (허난성)',
    lat:34.62, lng:112.45,
    people:['김구'],
    summary_ko:'윤봉길 의거로 장제스의 신뢰를 얻은 김구는 1933년 5월 난징에서 장제스를 만나 낙양군관학교에 한인특별반 설치를 합의했다. 1934년 2월 한국인 청년 92명이 제1기생으로 선발돼 군사훈련을 시작했다. 1919년 상하이 육군무관학교 이래 무산됐던 임시정부의 자체 군사간부 양성이, 중국의 지원으로 비로소 실현된 것이다. 만주 무장투쟁이 막을 내린 그해, 새로운 군사력의 싹이 중국 관내에서 움트기 시작했다.',
    video:null,
    connections:['righteous_1932_02','political_1933_01'],
    tags:['political','중국','낙양군관학교','군사양성'],
    sources:['우리역사넷 한국광복군','한국민족문화대백과사전 낙양군관학교'] },

  { id:'person_1934_01', year:1934, visible_from:1934, visible_until:1934,
    month:2, day:null, type:'person', priority:2,
    title_ko:'지청천 — 낙양군관학교 총교도관',
    title_en:'Yi Cheong-cheon — Chief Instructor at Luoyang',
    title_ja:'李青天 — 洛陽軍官学校総教導官',
    place_ko:'낙양',
    lat:34.62, lng:112.45,
    people:['지청천'],
    summary_ko:'만주를 떠나 관내로 이동한 지청천은 1934년 3월 낙양군관학교 한인특별반의 총교도관으로 부임했다. 청산리의 전장에서 대전자령의 매복으로, 이제는 강의실로 — 그의 무대가 바뀌었다. 그러나 학교 운영을 둘러싸고 김구·김원봉과 노선 갈등이 벌어졌고, 김구가 자기 계열 학생들을 철수시키자 지청천도 불만을 품고 교관직을 떠나게 된다. 통합을 향한 또 한 번의 시도가 내부 갈등으로 흔들리는 모습이었다.',
    video:null,
    connections:['political_1934_01','person_1933_01'],
    tags:['person','중국','지청천','낙양군관학교'],
    sources:['우리역사넷 지청천','독립운동인명사전'],
    content:{ hero:{"url": "assets/images/entity/person/person_ji_cheong_cheon_01.webp", "alt": "지청천", "caption": "", "credit": "AI 생성 이미지", "is_ai": true, "source_type": "generated", "image_type": "portrait"}, gallery:[] } },

  { id:'person_1934_02', year:1934, visible_from:1934, visible_until:1934,
    month:9, day:19, type:'person', priority:1,
    title_ko:'양세봉 — 남만주 최후의 사령관, 밀정의 총탄에 지다',
    title_en:'Yang Se-bong — The Last Commander in South Manchuria',
    title_ja:'梁世奉 — 南満州最後の司令官、密偵の銃弾に倒れる',
    place_ko:'환인현 소황구',
    lat:41.27, lng:125.36,
    people:['양세봉'],
    summary_ko:'만주사변 이후 독립군이 좌우로 갈라져 만주를 떠날 때, 남만주에 남아 일제와 싸운 무장 세력은 양세봉의 조선혁명군뿐이었다. 평북 철산의 소작농 아들로 태어나 3·1운동 이후 무장투쟁에 뛰어든 그는 1932년 초 조선혁명군 총사령이 되어 중국의용군과 한중연합군을 편성했고, 영릉가성 탈환과 흥경성 전투 등에서 승리를 거듭했다 — 연구자들은 그가 이끈 전투를 5년간 80여 차례로 추산한다. 승전은 역으로 일제의 제거 공작을 불렀다. 1934년 9월 19일 밤, 밀정 박창해는 혁명군을 후원하던 중국인을 매수해 한중 합작 논의를 구실로 그를 환인현 소황구 골짜기로 유인했고, 수수밭 매복 속에서 피격된 양세봉은 다음 날 숨을 거두었다. 향년 38세. 일제는 가매장된 그의 묘를 파헤쳐 목을 잘라 통화 시내에 효수했고, 부대원들은 끝내 그의 수급을 찾지 못했다.',
    video:'sXfwsXNtiHE',
    connections:['battle_1932_03','battle_1933_03'],
    tags:['person','남만주','양세봉','조선혁명군','밀정'],
    sources:['한국독립운동인명사전 양세봉','한국민족문화대백과사전 양세봉'] },

  // ══ 독립운동 세력의 재통합 모색 ══
  { id:'political_1934_02', year:1934, visible_from:1932, visible_until:1935,
    month:0, day:null, type:'political', priority:2,
    title_ko:'한국대일전선통일동맹의 모색',
    title_en:'Korean Anti-Japan United Front League',
    title_ja:'韓国対日戦線統一同盟',
    place_ko:'상하이 / 난징',
    lat:31.21, lng:121.46,
    people:['김규식'],
    summary_ko:'1932년 11월 의열단·한국독립당·조선혁명당 등 중국 관내 독립운동단체와 미주 동포단체들이 한국대일전선통일동맹을 결성했다. 신간회 해체 이후 국내에서 좌우합작이 사라진 자리를, 중국 관내의 여러 단체들이 다시 한 번 통합을 모색하는 시도로 채웠다. 그러나 단체 간 이해관계가 복잡하게 얽혀 통합은 더디게 진행됐다. 1935년 이 동맹을 모체로 민족혁명당이 결성되는 밑거름이 된다.',
    video:null,
    connections:['political_1931_03','political_1931_01'],
    tags:['political','상하이','통일동맹','독립운동통합'],
    sources:['위키백과 대한민국임시정부'] },

  // ══ 식민통치 — 일본어 강제와 동화정책 강화 ══
  { id:'policy_1934_01', year:1934, visible_from:1934, visible_until:1945,
    month:0, day:null, type:'policy', priority:2,
    title_ko:'농촌진흥운동과 식민 동화의 심화',
    title_en:'Rural Revitalization Movement and Deepening Assimilation',
    title_ja:'農村振興運動と植民地同化の深化',
    place_ko:'조선총독부 (경성)',
    lat:37.593, lng:126.975,
    people:[],
    summary_ko:'대공황으로 농촌이 피폐해지자 일제는 1932년부터 농촌진흥운동을 펼쳤다. 자력갱생을 내세웠지만 실제로는 소작쟁의를 무마하고 농민을 식민지 체제 안으로 더 깊이 끌어들이려는 통치술이었다. 1934년에는 이 흐름과 맞물려 관청 민원의 일본어 사용을 강제하고 사립학교의 한국어 교육을 더욱 옥죄기 시작했다. 문화통치의 가면이 벗겨지고, 본격적인 동화정책으로 향하는 길목이었다.',
    video:null,
    connections:['policy_1920_01'],
    tags:['policy','조선국내','경성','농촌진흥운동','동화정책'],
    sources:['한국민족문화대백과사전 일제강점기'] }

,

  { id:'culture_1934_01', year:1934, visible_from:1934, visible_until:1934,
    month:5, day:7, type:'culture', priority:2,
    title_ko:'진단학회 창립 — 실증사학의 결집',
    title_en:'Founding of the Jindan Society — The Positivist School of History',
    title_ja:'震檀学会創立 — 実証史学の結集',
    place_ko:'경성',
    lat:37.5665, lng:126.9780,
    people:['이병도','손진태'],
    summary_ko:'이병도·손진태·이윤재 등 국내외에서 근대 역사학을 공부한 학자들은 일본 관학자들의 식민사관에 맞서면서도, 신채호 등 민족주의 사학의 논리적 서술 방식과는 다른 길을 걷고자 진단학회를 창립했다. 이들은 사료 고증에 기반한 실증적 방법론으로 한국사와 인접 지역사를 연구해 학술지 《진단학보》를 발간했으며, 이는 이후 한국 역사학계 주류를 이루는 실증사학의 토대가 됐다. 신채호·박은식의 민족주의 사학, 백남운의 사회경제사학과 더불어 진단학회의 실증사학은 일제강점기 한국사 연구의 세 갈래 흐름 중 하나로 꼽힌다.',
    video:null,
    connections:[],
    tags:['culture','경성','진단학회','이병도','실증사학'],
    sources:['한국민족문화대백과사전 진단학회'] }

];
