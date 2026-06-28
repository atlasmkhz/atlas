// data/1940.js — 1940도 사건 데이타 (3개)
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1940.js"></script> 로 불리웴니다.

const EVENTS_1940 = [

  { id:'political_1940_01', year:1940, visible_from:1940, visible_until:1940,
    month:4, day:9, type:'political', priority:1,
    title_ko:'한국독립당 통합 — 마침내 하나로',
    title_en:'Unification of the Korean Independence Party',
    title_ja:'韓国独立党統合',
    place_ko:'치장',
    lat:28.97, lng:106.50,
    people:['김구','조소앙','지청천'],
    summary_ko:'1939년 7당 통일회의가 좌절된 지 9개월 만인 1940년 5월 9일, 김구의 한국국민당, 조소앙의 재건 한국독립당, 지청천의 조선혁명당 3당이 마침내 통합해 한국독립당을 결성했다. 1935년 갈라졌던 우익 세 정당이 5년 만에 다시 하나가 된 것이다. 거듭된 분열의 역사 끝에 임시정부를 지지하는 우익 진영이 단일 정당으로 정비되며, 곧 창설될 정규군 한국광복군의 정치적 토대가 마련됐다.',
    video:null,
    connections:['political_1939_01','political_1935_02'],
    tags:['political','중국','한국독립당','통합'],
    sources:['나무위키 한국독립당(1940년)'] },

  { id:'battle_1940_01', year:1940, visible_from:1940, visible_until:1945,
    month:8, day:17, type:'organization', priority:1,
    title_ko:'한국광복군 창설',
    title_en:'Founding of the Korean Liberation Army',
    title_ja:'韓国光復軍創設',
    place_ko:'충칭',
    lat:29.56, lng:106.55,
    people:['김구','지청천','이범석','조소앙'],
    summary_ko:'1940년 9월 17일 충칭에서 한국광복군 총사령부 성립 전례식이 열렸다. 1919년부터 21년간 꿈꿔온 임시정부의 정규군이 마침내 현실이 된 것이다. 총사령은 만주에서 청산리·대전자령을 누볐던 지청천, 참모장은 신흥무관학교 출신 이범석이 맡았다. 임시정부 외무부장 조소앙은 미국 OSS 등 연합국과의 합작을 추진해 광복군이 국제적 승인을 받는 군사 조직으로 자리잡도록 힘썼다. 중국 국민당의 지휘 아래 둔다는 조건이 붙었지만, 임시정부는 비로소 자신의 군대를 갖게 됐다. 자유시참변으로 무너졌던 무장투쟁의 꿈이, 20년의 유랑과 좌절을 거쳐 다시 군대의 형태로 일어선 순간이었다. 이 군대는 1945년 국내진공을 준비하다 일본의 갑작스러운 항복으로 그 꿈을 끝내 이루지 못한다.',
    video:'NHwoPJJwEXQ',
    connections:['political_1940_01','political_1939_02','person_1933_01','battle_1945_02'],
    tags:['organization','중국','한국광복군','지청천'],
    sources:['한국민족문화대백과사전 한국광복군','위키백과'],
    content:{ hero:{"url": "assets/images/entity/event/event_battle_1940_01_01.webp", "alt": "한국광복군 창설", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "event"}, gallery:[] } },

  { id:'policy_1940_01', year:1940, visible_from:1940, visible_until:1940,
    month:7, day:10, type:'policy', priority:1,
    title_ko:'창씨개명 시행과 동아·조선일보 폐간',
    title_en:'Enforcement of Name Change and Closure of Korean Newspapers',
    title_ja:'創氏改名施行と東亜・朝鮮日報廃刊',
    place_ko:'경성',
    lat:37.566, lng:126.978,
    people:[],
    summary_ko:'1940년 2월 11일부터 창씨개명이 본격 시행됐다. 강한 반발 속에서도 일제는 취업·진학·배급에서 불이익을 주는 식으로 사실상 강제했다. 같은 해 8월에는 1920년 창간 이래 식민지 조선의 목소리를 대변해온 동아일보와 조선일보가 총독부의 압박으로 폐간됐다. 1936년 일장기를 지웠던 그 신문이, 4년 뒤 완전히 사라진 것이다. 이름도, 말도, 글도 — 민족의 정체성을 이루는 모든 것이 빠르게 지워지고 있었다.',
    video:null,
    connections:['policy_1939_01','movement_1936_02','political_1920_01'],
    tags:['policy','조선국내','경성','창씨개명','언론폐간'],
    sources:['우리역사넷 창씨개명','위키백과 조선일보에 대한 비판'] }

];
