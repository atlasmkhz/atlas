// data/1942.js — 1942도 사건 데이타 (3개)
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1942.js"></script> 로 불리웴니다.

const EVENTS_1942 = [

  { id:'policy_1942_01', year:1942, visible_from:1942, visible_until:1942,
    month:9, day:1, type:'policy', priority:1,
    title_ko:'조선어학회 사건',
    title_en:'Korean Language Society Incident',
    title_ja:'朝鮮語学会事件',
    place_ko:'함경남도 홍원',
    lat:40.18, lng:128.0,
    people:['이극로','최현배','이윤재','정인승'],
    summary_ko:'1942년 함흥 여학생이 기차에서 조선어로 대화했다는 이유로 취조받은 사소한 일이, 조선어사전 편찬원 정태진의 체포로 번졌다. 일제는 이를 빌미로 그해 10월부터 이듬해 4월까지 조선어학회 회원과 후원자 33명을 검거해 "치안유지법의 내란죄"로 몰았다. 16만 어휘를 모아온 조선어대사전 원고는 압수돼 행방이 묘연해졌다. 이윤재와 한징은 고문 끝에 옥사했고, 이극로·최현배 등은 해방 직전까지 옥고를 치렀다. 총칼이 아닌 말과 글로 민족을 지키려던 학자들이, 그 사전 한 권 때문에 목숨과 자유를 잃었다.',
    video:null,
    connections:['policy_1938_01','policy_1939_01'],
    tags:['policy','조선국내','홍원','조선어학회','언어말살'],
    sources:['위키백과 조선어학회 사건','한국민족문화대백과사전'],
    content:{ hero:{"url": "assets/images/entity/event/event_policy_1942_01_01.webp", "alt": "조선어학회 사건", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "event"}, gallery:[{"url": "assets/images/entity/person/person_choi_hyeon_bae_01.webp", "alt": "최현배", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "portrait"}] } },

  { id:'political_1942_01', year:1942, visible_from:1942, visible_until:1945,
    month:6, day:null, type:'political', priority:1,
    title_ko:'조선의용대의 광복군 편입과 김원봉의 임정 합류',
    title_en:'Incorporation of the Korean Volunteer Corps into the Liberation Army',
    title_ja:'朝鮮義勇隊の光復軍編入と金元鳳の臨政合流',
    place_ko:'충칭',
    lat:29.56, lng:106.55,
    people:['김원봉','김구'],
    summary_ko:'화북으로 떠난 의용대 주력과 갈라져 충칭에 남았던 조선의용대 본부 병력이 1942년 7월 한국광복군 제1지대로 편입됐다. 김원봉은 광복군 부사령관 겸 임시정부 군무부장에 취임했다. 1919년 의열단을 만들어 임시정부와 거리를 두던 그가, 23년 만에 마침내 임정의 품 안으로 들어온 것이다. 좌익 진영 최대 무장세력의 합류로 임시정부와 광복군의 위상은 한층 높아졌다. 다만 우익 중심의 임정 요인들과 그의 갈등은 해방 때까지 완전히 풀리지 않았다.',
    video:'NHwoPJJwEXQ',
    connections:['battle_1941_01','battle_1940_01','person_1935_01'],
    tags:['political','중국','김원봉','광복군편입'],
    sources:['우리역사넷 조선의용대의 편입','RFA 자유아시아방송'] },

  { id:'battle_1942_01', year:1942, visible_from:1942, visible_until:1945,
    month:6, day:null, type:'organization', priority:2,
    title_ko:'조선의용군 — 화북지대의 재편',
    title_en:'Korean Volunteer Army — Reorganization of the North China Detachment',
    title_ja:'朝鮮義勇軍 — 華北支隊の再編',
    place_ko:'타이항산',
    lat:36.8, lng:113.5,
    people:[],
    summary_ko:'충칭의 의용대 본부가 광복군에 편입되자, 화북에 남아 있던 화북조선청년연합회와 의용대 화북지대는 1942년 7월 각각 조선독립동맹과 조선의용군으로 개편됐다. 중국공산당 팔로군과 함께 타이항산을 근거지로 항일 무장투쟁을 이어간 이들은, 해방 후 다수가 북한으로 들어가 연안파로 불리는 정치세력을 형성한다. 1938년 하나로 출발한 조선의용대가, 이제 충칭의 광복군과 화북의 의용군으로 완전히 갈라진 것이다.',
    video:'NHwoPJJwEXQ',
    connections:['battle_1941_01','political_1942_01'],
    tags:['organization','중국','조선의용군','연안파'],
    sources:['위키백과 조선의용군','우리역사넷 조선 의용군'] },

  // ── 2026-08-01 신설: 「강제동원의 기록」 시리즈 연결 ─────────
  // 일본 본토·사할린 카드는 있었으나 남양군도(태평양)가 비어 있었다.
  { id:'policy_1942_04', year:1942, visible_from:1942, visible_until:1945,
    month:0, day:null, type:'policy', priority:2, area:true, areaRadius:180000,
    title_ko:'남양군도 조선인 강제동원',
    title_en:'Forced Mobilization of Koreans to the South Sea Islands',
    title_ja:'南洋群島への朝鮮人強制動員',
    place_ko:'남양군도 (사이판·티니안·팔라우 일대)',
    lat:15.1900, lng:145.7500,
    people:[],
    summary_ko:'일본이 위임통치하던 태평양의 섬들을 남양군도라 불렀다. 사탕수수 농장과 인광석 채굴에 조선인이 동원됐고, 전황이 급박해지자 비행장과 진지를 만드는 군사 공사에 투입됐다. 1944년 미군이 사이판과 티니안에 상륙하면서 이들은 전투 한복판에 놓였다. 민간인 신분이었으나 피난할 방법이 없었고, 옥쇄를 강요당하거나 전투 중 사망한 이들이 많았다. 살아남은 사람들도 종전 후 귀환이 늦어졌다. 남양군도 동원은 일본 본토나 사할린에 비해 자료가 적고 생환자도 적어 실태 파악이 가장 어려운 영역으로 남아 있다. 강제동원이 한반도와 일본 사이의 문제가 아니라 태평양 전역에 걸친 일이었음을 보여주는 사례다.',
    video:null,
    connections:['policy_1938_01','policy_1939_02'],
    tags:['policy','태평양','남양군도','사이판','강제동원','전시동원'],
    sources:['일제강제동원피해자지원재단 남양군도 관련 자료','대일항쟁기 강제동원 피해조사 위원회 보고서'] }
];
