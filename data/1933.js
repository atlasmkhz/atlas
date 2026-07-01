// data/1933.js — 1933도 사건 데이타 (4개)
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1933.js"></script> 로 불리웴니다.

const EVENTS_1933 = [

  // ══ 한중연합의 정점 ══
  { id:'battle_1933_01', year:1933, visible_from:1933, visible_until:1933,
    month:6, day:3, type:'battle', priority:1,
    title_ko:'대전자령 전투',
    title_en:'Battle of Daedianzi Pass',
    title_ja:'大甸子嶺戦闘',
    place_ko:'대전자령 (왕청현)',
    lat:43.62, lng:129.83,
    people:['지청천'],
    summary_ko:'1933년 6월 30일 한국독립군 약 2,500명과 중국 길림구국군 2,000여 명이 대전자령 계곡에 사흘간 매복했다. 폭우와 굶주림을 견디며 기다린 끝에, 간도에서 한반도로 철수하는 일본군 수송부대가 협곡에 들어선 순간 일제히 사격을 퍼부었다. 4시간의 격전 끝에 일본군 다수가 전사하고 막대한 군수물자가 노획됐다. 봉오동·청산리에 이어 한국 항일무장투쟁사 3대 대첩으로 꼽히는 승리였다. 그러나 노획한 전리품을 둘러싸고 한국독립군과 중국 측 사이에 분배 다툼이 벌어졌고, 이 불화가 한중연합의 균열로 이어진다.',
    video:null,
    connections:['battle_1932_02','policy_1932_01'],
    tags:['battle','만주·간도','대전자령','한중연합','대첩'],
    sources:['위키백과 대전자령전투','나무위키'],
    content:{ hero:{"url": "assets/images/entity/event/event_battle_1933_01_01.webp", "alt": "대전자령 전투", "caption": "", "credit": "AI 생성 이미지", "is_ai": true, "source_type": "generated", "image_type": "event"}, gallery:[] } },

  // ══ 양세봉 노선의 정점 ══
  { id:'battle_1933_03', year:1933, visible_from:1933, visible_until:1933,
    month:4, day:8, type:'battle', priority:1,
    title_ko:'흥경성 전투',
    title_en:'Battle of Xingjing',
    title_ja:'興京城の戦い',
    place_ko:'흥경성 (신빈)',
    lat:41.74, lng:125.04,
    people:['양세봉','김학규'],
    summary_ko:'영릉가 전투(1932) 승리 이후에도 양세봉의 조선혁명군과 중국의용군 연합은 항전을 이어갔다. 1933년 5월 8일 한중연합군은 다시 영릉가에서 일본군을 대파했고, 패전한 일본군은 6월 15일 양대령을 넘어 흥경·청원 방면으로 반격해왔다. 사전에 이 정보를 파악한 양세봉은 1,000명의 조선혁명군으로 청원 지방을 수비하고, 중국군 1만 명은 흥경성을 사수하는 작전을 짰다. 조선혁명군은 비행기까지 동원한 일본군의 공격을 기습으로 저지했으나, 흥경성을 지키던 중국군이 패하면서 연합군 전체가 남산성으로 퇴각했다. 30여 명의 희생자를 낸 이 전투를 끝으로 한중연합의 화력 열세가 분명해지며, 조선혁명군은 이후 점차 수세에 몰린다.',
    video:null,
    connections:['battle_1932_03'],
    tags:['battle','만주·간도','흥경성','한중연합','양세봉'],
    sources:['한국민족문화대백과사전 흥경성전투','세계한민족문화대전'],
    content:{ hero:{"url": "assets/images/entity/event/event_battle_1933_03_01.webp", "alt": "흥경성 전투", "caption": "", "credit": "AI 생성 이미지", "is_ai": true, "source_type": "generated", "image_type": "event"}, gallery:[] } },

  // ══ 연합의 붕괴와 독립군의 해체 ══
  { id:'battle_1933_02', year:1933, visible_from:1933, visible_until:1933,
    month:8, day:6, type:'battle', priority:2,
    title_ko:'동녕현성 전투 — 한중연합의 마지막 불꽃',
    title_en:'Battle of Dongning — Last Flame of Korean-Chinese Cooperation',
    title_ja:'東寧県城戦闘 — 韓中連合最後の灯火',
    place_ko:'동녕현성',
    lat:44.07, lng:131.13,
    people:['지청천'],
    summary_ko:'1933년 9월 6일 밤 한국독립군과 중국 의용군 연합부대가 동녕현성을 포위해 거의 점령하는 데 성공했다. 그러나 만주국군과 일본군이 대포·장갑차 같은 중화기를 동원해 격렬히 반격하면서 한중연합군은 끝내 패퇴했다. 대전자령의 영광 뒤에 찾아온 이 패배는, 화력의 격차가 갈수록 커지는 전쟁에서 의용군 연합만으로는 버티기 어려워지고 있음을 보여줬다. 한중연합 무장투쟁의 마지막 불꽃이었다.',
    video:null,
    connections:['battle_1933_01'],
    tags:['battle','만주·간도','동녕현성','한중연합'],
    sources:['우리역사넷 한국독립군의 해체와 주도세력의 관내 이동'] },

  { id:'political_1933_01', year:1933, visible_from:1933, visible_until:1933,
    month:9, day:null, type:'political', priority:1,
    title_ko:'한국독립군 해체와 임시정부 합류',
    title_en:'Dissolution of the Korean Independence Army',
    title_ja:'韓国独立軍の解体',
    place_ko:'베이징 (이동 경로)',
    lat:39.92, lng:116.40,
    people:['지청천'],
    summary_ko:'동녕현성 전투의 전리품 분배를 둘러싸고 한국독립군과 중국 의용군 사이의 불화가 깊어지자, 김구는 만주 독립군을 임시정부 산하로 끌어들여 군사력을 강화하려 했다. 1933년 10월 한국독립당 당수 홍진과 총사령 지청천을 비롯한 간부 40여 명이 베이징을 거쳐 중국 관내로 이동했다. 사령부가 떠나자 만주에 남은 한국독립군은 사실상 활동을 끝냈다. 일부 병력이 밀산·호림 산악지대에서 항전을 이어갔지만 오래가지 못했다. 1920년대 자유시참변, 1930년대 한중 갈등으로 거듭 흔들린 만주 무장투쟁이, 이로써 임시정부가 있는 중국 관내로 무대를 완전히 옮기게 된다.',
    video:null,
    connections:['battle_1933_02','political_1931_02'],
    tags:['political','베이징','한국독립군','해체'],
    sources:['우리역사넷 한국독립군의 해체와 주도세력의 관내 이동'] },

  // ══ 인물 스냅샷 ══
  { id:'person_1933_01', year:1933, visible_from:1933, visible_until:1940,
    month:9, day:null, type:'person', priority:2,
    title_ko:'지청천 — 만주를 떠나 관내로',
    title_en:'Yi Cheong-cheon — Leaving Manchuria for China Proper',
    title_ja:'李青天 — 満州を離れ関内へ',
    place_ko:'베이징',
    lat:39.90, lng:116.38,
    people:['지청천'],
    summary_ko:'대전자령에서 3대 대첩의 영광을 안았던 지청천은, 같은 해 가을 동녕현성의 패배와 한중연합의 균열을 뒤로하고 만주를 떠났다. 신흥무관학교 졸업생으로 청산리부터 시작된 그의 13년 만주 항전이 이로써 막을 내렸다. 그는 임시정부가 있는 중국 관내로 옮겨가, 이후 한국광복군 총사령으로서 다시 한 번 군대를 이끄는 길을 준비하게 된다.',
    video:null,
    connections:['political_1933_01','person_1931_01'],
    tags:['person','베이징','지청천','만주철수'],
    sources:['한국민족문화대백과사전 지청천'],
    content:{ hero:{"url": "assets/images/entity/person/person_ji_cheong_cheon_01.webp", "alt": "지청천", "caption": "", "credit": "AI 생성 이미지", "is_ai": true, "source_type": "generated", "image_type": "portrait"}, gallery:[] } }

];
