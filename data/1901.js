// data/1901.js — 1901년 사건 데이터
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1901.js"></script> 로 불립니다.

const EVENTS_1901 = [

  { id:'movement_1901_01', year:1901, visible_from:1901, visible_until:1901,
    month:4, day:null, type:'movement', priority:1,
    title_ko:'제주의 격랑 — 이재수의 난',
    title_en:'The Lee Jae-su Rebellion in Jeju',
    title_ja:'李在守の乱',
    place_ko:'제주 (제주성)',
    lat:33.513, lng:126.522,
    people:['이재수'],
    summary_ko:'1901년 제주에서 이재수의 난이 일어났다. 봉기의 배경에는 지방 행정의 부담과 과중한 세금 문제, 그리고 천주교가 확산되는 과정에서 누적된 지역 갈등이 있었다. 대한제국이 파견한 봉세관의 가혹한 징세에 더해, 일부 천주교 세력이 그 징세에 가담하고 향촌의 관습을 무시하면서 주민들의 분노가 폭발했다. 관노 출신 이재수를 장두로 한 민군은 제주성을 점령했고, 그 과정에서 수백 명의 천주교도가 희생되는 유혈 사태가 벌어졌다. 프랑스 함대와 정부군이 들어와 봉기는 진압되고 이재수는 처형됐다. 대한제국의 근대화가 한성에서 진행되던 시기, 중앙의 개혁은 변방에서 예상하지 못한 충돌을 낳았다. 변화는 언제나 중심보다 가장 먼 곳에서 먼저 흔들렸다.',
    video:null,
    connections:['policy_1901_01'],
    tags:['movement','제주','이재수','민중운동','신축교안'],
    sources:['한국민족문화대백과사전 신축교안','위키백과 이재수의 난'] },

  { id:'policy_1901_01', year:1901, visible_from:1901, visible_until:1904,
    month:0, day:null, type:'policy', priority:2,
    title_ko:'지계 사업 확대',
    title_en:'Expansion of the Jigye Land Certificate Program',
    title_ja:'地契事業の拡大',
    place_ko:'전국',
    lat:36.5, lng:127.8,
    people:['이용익'],
    summary_ko:'대한제국은 1898년 시작된 토지 측량을 1901년 들어 더 넓은 지역으로 확대하며, 지계 발급을 통해 근대적 조세와 행정 체계를 구축하려 했다. 이는 국가 운영의 기반을 다시 세우려는 시도였지만, 현장에서는 측량 과정의 혼란과 토지 소유 관계를 둘러싼 저항도 함께 나타났다. 재정을 총괄한 이용익이 이 사업을 이끌었다. 제도가 종이 위에서 자리를 잡아가는 동안에도, 그 제도가 실제로 적용되는 땅에서는 크고 작은 충돌이 끊이지 않았다.',
    video:null,
    connections:['movement_1901_01','policy_1900_02'],
    tags:['policy','조선국내','지계','양전사업','이용익','토지제도'],
    sources:['한국민족문화대백과사전 양전·지계사업','위키백과 대한제국'] },

  { id:'policy_1901_02', year:1901, visible_from:1901, visible_until:1901,
    month:0, day:null, type:'policy', priority:2,
    title_ko:'전차와 전등의 시대',
    title_en:'The Age of Streetcars and Streetlights',
    title_ja:'電車と電灯の時代',
    place_ko:'한성',
    lat:37.571, lng:126.967,
    people:[],
    summary_ko:'1899년 개통된 전차는 1901년에도 한성 거리를 가로질러 달리며 도시의 풍경을 바꾸고 있었다. 전등이 밤거리를 밝히고 전화가 가설되는 가운데, 사람들은 제도나 법령보다 먼저 일상 속에서 근대를 체감했다. 한성의 변화는 빠르고 뚜렷했지만, 그 빛이 닿는 범위는 도성 안팎에 머물러 있었다. 같은 해 제주에서 일어난 충돌은, 그 빛이 아직 나라 전체를 비추지는 못했음을 보여준다.',
    video:null,
    connections:['policy_1900_04'],
    tags:['policy','조선국내','경성','전차','전등','도시근대화'],
    sources:['한국민족문화대백과사전 한성전기회사','위키백과 서울 전차'] },

  { id:'political_1901_01', year:1901, visible_from:1901, visible_until:1903,
    month:0, day:null, type:'political', priority:2,
    title_ko:'흔들리는 균형 외교',
    title_en:'A Balancing Act Beginning to Tilt',
    title_ja:'揺れ動く均衡外交',
    place_ko:'한성',
    lat:37.566, lng:126.975,
    people:[],
    summary_ko:'대한제국은 러시아와 일본 사이에서 어느 한쪽에 기울지 않는 자율적 외교 공간을 확보하려 노력했다. 그러나 만주를 두고 러시아와 일본의 이해관계가 점차 정면으로 충돌하면서, 동북아의 균형은 서서히 기울기 시작하고 있었다. 대한제국이 지켜온 줄타기 외교는 1900년부터 이어진 잠정적 안정이었을 뿐, 두 제국의 셈법이 바뀌는 순간 그 토대가 함께 흔들릴 수밖에 없는 구조였다.',
    video:null,
    connections:['political_1900_01'],
    tags:['political','조선국내','경성','외교','러일관계'],
    sources:['한국민족문화대백과사전 한일관계사','위키백과 러일전쟁'] }

];
