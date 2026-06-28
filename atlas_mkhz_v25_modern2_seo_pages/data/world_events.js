// ═══════════════════════════════════════════════════════
// data/world_events.js — 세계의 흐름 (World Layer)
// 기억의 연대기 (Chronicle of Memory)
//
// <script src="data/world_events.js"></script> 로 로드된다.
//
// 철학(지시문 v4~v6):
//   · 한국은 깊게, 세계는 "넓고 얕게" 본다. 특정 연도를 누르면 조선뿐 아니라
//     유럽·동아시아·중동·남아시아·동남아시아·아프리카·미주·오세아니아에서
//     그 순간 무슨 흐름이 있었는지를 개요 수준으로 함께 본다.
//   · 세계 사건은 단일 연도가 아니라 기간을 가진 "상태(State)"다.
//     표시 조건: start ≤ 현재연도 ≤ end. 지속 사건은 기간 내내 표시.
//   · 클릭 가능 — 클릭 시 세계 사건 정보창(3단 설명 + 대표 인물)을 연다.
//   · 한국사 데이터(DATA/EVENTS_XXXX/렌더·마커·정보창)는 절대 수정하지 않는다.
//   · 금지: 국가별 전체 역사 구축, 세계 인물 탐색, 세계 연표 분기, 세계 전용 화면.
//
// 필드:
//   id        : 세계 사건 고유 id
//   title     : 사건명
//   start,end : 지속 기간(정수 연도). start ≤ Y ≤ end 인 연도에만 표시.
//   regionKey : 지역 분류축(정보창 그룹·범위 관리용). 아래 WORLD_REGIONS의 키.
//   region    : 표시용 상세 지역 문자열
//   location  : [lat, lng] — 지도에 약하게 표시할 중심 좌표
//   type      : WAR | REVOLUTION | EMPIRE | ECONOMY | POLITICS | TECH | CULTURE | IDEA
//   visual    : spread | radiate | wave | expand | flow
//   priority  : 1(핵심)~3(보조)
//   summary   : { what, why, changed } — ①무슨 일 ②왜 중요 ③어떻게 달라졌나
//   phases    : (선택) [{from,to,note}] — 현재 연도별 진행 상태 한 줄
//   figures   : [{name, role}] 최대 3, role 20자 이내(보조 요소)
// ═══════════════════════════════════════════════════════

// 지역 분류축 — 정보창에서 이 순서대로 그룹을 묶어 "넓게" 보여준다.
const WORLD_REGIONS = [
  { key:'europe',     label:'유럽' },
  { key:'east_asia',  label:'동아시아' },
  { key:'mideast',    label:'중동' },
  { key:'south_asia', label:'남아시아' },
  { key:'sea',        label:'동남아시아' },
  { key:'africa',     label:'아프리카' },
  { key:'north_america', label:'북아메리카' },
  { key:'south_america', label:'남아메리카' },
  { key:'oceania',    label:'오세아니아' },
  { key:'eurasia',    label:'유라시아' },
  { key:'global',     label:'전 세계' }
];

const WORLD_EVENTS = {

  // ─────────── 유럽 ───────────
  world_1878_berlin: {
    id:'world_1878_berlin', title:'베를린 회의', start:1878, end:1878,
    regionKey:'europe', region:'유럽 (베를린)', location:[52.52, 13.405],
    type:'POLITICS', visual:'flow', priority:2,
    summary:{
      what:'러시아-튀르크 전쟁이 끝난 뒤, 유럽 열강이 베를린에 모여 발칸의 국경을 다시 그었다. 비스마르크가 "정직한 중개인"을 자처하며 영국·러시아·오스트리아의 이해를 조정했다.',
      why:'강대국들이 약소 민족의 운명을 회의 탁자 위에서 분배하는 협조 체제가 분명해진 자리였다.',
      changed:'몇몇 제국의 합의가 곧 세계 질서가 되는 19세기형 국제정치의 전형이 굳어졌다.'
    },
    figures:[{name:'비스마르크', role:'회의 주재'},{name:'디즈레일리', role:'영국 총리'}]
  },

  world_1881_assassinations: {
    id:'world_1881_assassinations', title:'황제와 대통령의 암살 — 알렉산드르 2세·가필드', start:1881, end:1881,
    regionKey:'europe', region:'유럽·북아메리카 (러시아·미국)', location:[55.0, 30.0],
    type:'POLITICS', visual:'spread', priority:2,
    summary:{
      what:'농노 해방으로 개혁가로 불리던 러시아 황제 알렉산드르 2세가 3월 상트페테르부르크에서 인민의 의지파의 폭탄에 암살되었다. 같은 해 7월에는 미국 대통령 가필드가 한 실망한 공직 청탁자의 총에 맞아 9월 사망했다.',
      why:'개혁군주와 신생 강대국 대통령이 같은 해 암살되며, 19세기 후반 정치 폭력이 유럽과 신대륙 모두를 흔들고 있음을 보여주었다.',
      changed:'러시아는 새 황제 알렉산드르 3세 아래 반동적 통치로 돌아섰고, 미국은 가필드의 죽음을 계기로 공직 임용을 실적제로 바꾸는 개혁에 나섰다.'
    },
    figures:[{name:'알렉산드르 2세', role:'러시아 황제'},{name:'제임스 가필드', role:'미국 대통령'}]
  },

  world_1882_triple_alliance: {
    id:'world_1882_triple_alliance', title:'삼국동맹 — 비스마르크의 동맹망', start:1882, end:1882,
    regionKey:'europe', region:'유럽 (독일·오스트리아·이탈리아)', location:[48.2, 12.6],
    type:'POLITICS', visual:'flow', priority:2,
    summary:{
      what:'독일제국 수상 비스마르크가 오스트리아-헝가리, 이탈리아와 삼국동맹을 맺어 프랑스를 외교적으로 고립시켰다.',
      why:'동맹을 정교하게 엮어 유럽의 세력균형을 관리하려 한 비스마르크식 외교의 정점이었다.',
      changed:'이 동맹망은 이후 삼국협상과 맞서며 제1차 세계대전으로 이어지는 양극 체제의 한 축이 되었다.'
    },
    figures:[{name:'비스마르크', role:'독일제국 수상'}]
  },

  world_1885_meiji_politics: {
    id:'world_1885_meiji_politics', title:'메이지 정부의 인물 각축', start:1885, end:1889,
    regionKey:'east_asia', region:'동아시아 (일본)', location:[35.68, 139.77],
    type:'POLITICS', visual:'flow', priority:2,
    summary:{
      what:'이토 히로부미를 중심으로 일본은 1885년 근대적 내각제를 도입하고, 1889년 메이지 헌법을 공포해 입헌군주제의 틀을 갖췄다.',
      why:'조선의 개화파가 모델로 참고했던 같은 시대 동아시아 국가의 제도화 과정을 보여준다.',
      changed:'서구식 헌법과 의회를 가진 동아시아 최초의 근대국가로서, 일본은 곧 대외 팽창의 길로 나아갈 제도적 기반을 갖추었다.'
    },
    figures:[{name:'이토 히로부미', role:'초대 내각총리대신'}]
  },

  world_1888_three_emperors: {
    id:'world_1888_three_emperors', title:'삼제(三帝)의 해와 빌헬름 2세', start:1888, end:1888,
    regionKey:'europe', region:'유럽 (독일제국)', location:[52.52, 13.405],
    type:'POLITICS', visual:'flow', priority:3,
    summary:{
      what:'독일제국에서 한 해 동안 황제가 세 번 바뀌었다. 빌헬름 1세가 노환으로 죽고, 그 아들 프리드리히 3세는 즉위 99일 만에 후두암으로 숨졌으며, 손자 빌헬름 2세가 왕좌에 올랐다.',
      why:'온화한 개혁군주로 기대를 모았던 프리드리히 3세의 단명은 독일 정치의 방향을 크게 바꿔놓았다.',
      changed:'야심 많고 호전적인 빌헬름 2세가 즉위하며, 1890년 비스마르크를 해임하고 독자적인 팽창 외교에 나서는 전환점이 마련되었다.'
    },
    figures:[{name:'빌헬름 2세', role:'신임 독일 황제'},{name:'프리드리히 3세', role:'99일의 황제'}]
  },

  world_1889_mayerling: {
    id:'world_1889_mayerling', title:'마이에르링 사건 — 합스부르크 황태자의 죽음', start:1889, end:1889,
    regionKey:'europe', region:'유럽 (오스트리아-헝가리)', location:[48.05, 16.1],
    type:'POLITICS', visual:'flow', priority:3,
    summary:{
      what:'오스트리아-헝가리 제국의 황태자 루돌프가 1889년 1월 빈 근교 마이에르링 별장에서 연인과 함께 의문의 죽음을 맞았다.',
      why:'자유주의적이고 개혁적이었던 황태자의 갑작스러운 죽음은 합스부르크 왕가에 후계 문제라는 깊은 균열을 남겼다.',
      changed:'황위 계승 순서가 뒤로 밀리며 결국 조카 프란츠 페르디난트가 후계자가 되었고, 그의 1914년 암살이 제1차 세계대전의 발단이 되는 먼 인과가 여기서 시작되었다.'
    },
    figures:[{name:'루돌프 황태자', role:'합스부르크 황태자'}]
  },

  world_1894_dreyfus: {
    id:'world_1894_dreyfus', title:'드레퓌스 사건', start:1894, end:1899,
    regionKey:'europe', region:'유럽 (프랑스)', location:[48.85, 2.35],
    type:'POLITICS', visual:'spread', priority:2,
    summary:{
      what:'유대계 프랑스군 대위 알프레드 드레퓌스가 독일에 군사정보를 넘겼다는 누명을 쓰고 1894년 종신형을 선고받았다. 소설가 에밀 졸라가 "나는 고발한다"는 글로 진실을 요구하며 사건은 전국적 논쟁이 되었다.',
      why:'한 개인의 억울한 누명이 프랑스 사회의 반유대주의, 군부 권위, 언론과 지식인의 역할을 둘러싼 거대한 갈등으로 번졌다.',
      changed:'1899년 재심으로 드레퓌스는 사면됐고(1906년 무죄 확정), 군의 무오류성에 대한 신뢰가 깨지며 프랑스에서 정교분리와 공화주의가 한층 굳어졌다.'
    },
    figures:[{name:'알프레드 드레퓌스', role:'억울한 누명을 쓴 대위'},{name:'에밀 졸라', role:'진실을 요구한 작가'}]
  },

  world_1914_wwi: {
    id:'world_1914_wwi', title:'제1차 세계대전', start:1914, end:1918,
    regionKey:'europe', region:'유럽·중동·아프리카', location:[49.0, 5.5],
    type:'WAR', visual:'spread', priority:1,
    summary:{
      what:'유럽 열강 간 동맹 충돌로 시작된 전쟁이 식민지와 해상을 통해 세계 규모로 확대되었다. 참호와 기관총, 독가스 속에서 수천만 명이 스러졌다.',
      why:'근대 제국 질서를 무너뜨리고 20세기 국제질서의 출발점이 되었다.',
      changed:'오스트리아·독일·러시아·오스만 제국이 붕괴했고, 새로운 국가들과 국제 체제가 등장했다.'
    },
    phases:[
      {from:1914, to:1915, note:'개전 — 서부전선이 참호전으로 굳어지며 장기전에 들어섰다.'},
      {from:1916, to:1917, note:'총력전 — 전쟁이 사회 전체를 삼키고 미국이 참전했다.'},
      {from:1918, to:1918, note:'종결 — 동맹국이 무너지며 휴전, 제국들이 붕괴하기 시작했다.'}
    ],
    figures:[{name:'우드로 윌슨', role:'미국 대통령'},{name:'빌헬름 2세', role:'독일 황제'}]
  },

  world_1917_bolshevik: {
    id:'world_1917_bolshevik', title:'볼셰비키 혁명 (러시아 혁명)', start:1917, end:1917,
    regionKey:'europe', region:'러시아 (페트로그라드)', location:[59.93, 30.34],
    type:'REVOLUTION', visual:'radiate', priority:1,
    summary:{
      what:'세계대전의 패배와 굶주림 속에서 러시아 제국이 무너졌다. 2월 혁명으로 황제가 물러난 뒤, 10월에는 레닌이 이끄는 볼셰비키가 임시정부를 무너뜨리고 정권을 장악했다.',
      why:'역사상 처음으로 사회주의를 국가 이념으로 내건 정권이 탄생했다.',
      changed:'자본주의와 다른 길을 약속하는 사상이 세계의 억압받는 이들에게 강렬한 희망으로 퍼졌고, 이후 냉전과 식민지 해방·혁명 운동의 사상적 기반이 되며 20세기를 둘로 가르는 분기점이 되었다.'
    },
    figures:[{name:'레닌', role:'혁명 지도자'},{name:'트로츠키', role:'혁명군 조직'}]
  },

  world_1918_german_rev: {
    id:'world_1918_german_rev', title:'독일 혁명', start:1918, end:1919,
    regionKey:'europe', region:'독일 (킬·베를린)', location:[52.52, 13.405],
    type:'REVOLUTION', visual:'radiate', priority:2,
    summary:{
      what:'패전이 짙어지자 킬 군항의 수병 반란이 혁명으로 번졌다. 황제가 물러나고 제정이 무너지며 독일은 공화국이 되었다.',
      why:'유럽의 또 다른 군주제가 무너지고, 전후 유럽에 불안한 민주주의가 들어선 사건이다.',
      changed:'바이마르 공화국이 출범했지만 좌우의 충돌 속에서 위태로웠고, 그 불안정이 훗날의 격변으로 이어졌다.'
    },
    figures:[{name:'에베르트', role:'공화국 초대 대통령'},{name:'로자 룩셈부르크', role:'좌파 혁명가'}]
  },

  world_1919_versailles: {
    id:'world_1919_versailles', title:'베르사유 체제', start:1919, end:1920,
    regionKey:'europe', region:'유럽 (파리·베르사유)', location:[48.80, 2.13],
    type:'POLITICS', visual:'flow', priority:1,
    summary:{
      what:'전쟁을 끝낸 강대국들이 파리에 모여 새 국제질서를 설계했다. 윌슨의 민족자결 원칙이 선언되고 국제연맹 창설이 합의되었다.',
      why:'전후 세계가 어떤 원칙 위에 설 것인가를 정한 자리로, 식민지와 약소민족에게 새로운 기대를 불러일으켰다.',
      changed:'그러나 민족자결은 패전국 영토에 국한되었고, 독일에 가혹한 배상이 부과되어 다음 전쟁의 원한이 함께 심겼다.'
    },
    figures:[{name:'우드로 윌슨', role:'민족자결 제창'},{name:'클레망소', role:'프랑스 총리'}]
  },

  world_1933_nazi: {
    id:'world_1933_nazi', title:'나치 독일 체제', start:1933, end:1945,
    regionKey:'europe', region:'독일 (베를린)', location:[52.52, 13.405],
    type:'POLITICS', visual:'expand', priority:1,
    summary:{
      what:'대공황의 혼란 속에서 히틀러가 권력을 잡았다. 의회 민주주의가 빠르게 해체되고 일당독재가 들어섰으며, 인종주의와 팽창주의가 국가 이념이 되었다.',
      why:'유럽 한복판에서 전체주의 국가가 자리 잡으며, 국제 긴장이 급격히 높아졌다.',
      changed:'재무장과 팽창이 이어지며 세계가 또 한 번의 거대한 전쟁을 향해 기울었다.'
    },
    phases:[
      {from:1933, to:1935, note:'장악 — 일당독재가 완성되고 재무장이 시작되었다.'},
      {from:1936, to:1938, note:'팽창 — 라인란트·오스트리아·체코로 손을 뻗쳤다.'},
      {from:1939, to:1945, note:'전쟁 — 침략전쟁과 학살로 치달았다.'}
    ],
    figures:[{name:'히틀러', role:'나치 총통'},{name:'괴벨스', role:'선전 책임자'}]
  },

  world_1936_spanish_civil: {
    id:'world_1936_spanish_civil', title:'스페인 내전', start:1936, end:1939,
    regionKey:'europe', region:'스페인', location:[40.42, -3.70],
    type:'WAR', visual:'spread', priority:2,
    summary:{
      what:'공화파 정부에 맞서 프랑코의 군부가 반란을 일으키자, 스페인은 좌우 이념이 격돌하는 전장이 되었다. 독일·이탈리아와 소련·국제여단이 각각 양편을 지원했다.',
      why:'사실상 세계대전의 전초전으로, 이념 대결이 무력 충돌로 번진 시대의 축소판이었다.',
      changed:'게르니카 폭격은 민간인을 겨냥한 현대 총력전의 참혹함을 예고했고, 유럽의 진영 대립을 굳혔다.'
    },
    phases:[
      {from:1936, to:1937, note:'발발 — 반란과 외세 개입으로 전선이 굳어졌다.'},
      {from:1938, to:1939, note:'종결 — 공화파가 무너지고 프랑코 독재가 들어섰다.'}
    ],
    figures:[{name:'프랑코', role:'반란군 지도자'},{name:'헤밍웨이', role:'국제여단 종군'}]
  },

  world_1939_wwii: {
    id:'world_1939_wwii', title:'제2차 세계대전', start:1939, end:1945,
    regionKey:'europe', region:'유럽·아시아·태평양·아프리카', location:[50.06, 19.94],
    type:'WAR', visual:'spread', priority:1,
    summary:{
      what:'독일의 폴란드 침공으로 시작된 전쟁이 곧 전 대륙과 대양으로 번졌다. 추축국과 연합국이 충돌하며 홀로코스트와 무차별 폭격, 원자폭탄까지 동원되었다.',
      why:'인류사 최대 규모의 총력전으로, 수천만 명이 목숨을 잃었다.',
      changed:'전쟁이 끝났을 때 세계의 힘의 지도는 완전히 새로 그려졌고, 미국과 소련이라는 두 초강대국이 부상했다.'
    },
    phases:[
      {from:1939, to:1940, note:'발발 — 독일이 폴란드·서유럽으로 전격전을 폈다.'},
      {from:1941, to:1942, note:'세계전 확대 — 독소전과 태평양전쟁으로 전선이 전 지구로 번졌다.'},
      {from:1943, to:1944, note:'전환 — 연합국이 반격으로 돌아서며 전세가 기울었다.'},
      {from:1945, to:1945, note:'종결 국면 — 독일이 항복하고 일본의 패전으로 전쟁이 끝났다.'}
    ],
    figures:[{name:'처칠', role:'영국 전시 지도'},{name:'루스벨트', role:'미국 대통령'}]
  },

  // ─────────── 동아시아 ───────────
  world_1894_sino_japanese: {
    id:'world_1894_sino_japanese', title:'청일전쟁', start:1894, end:1895,
    regionKey:'east_asia', region:'동아시아 (한반도·만주·황해)', location:[37.8, 122.5],
    type:'WAR', visual:'spread', priority:1,
    summary:{
      what:'동아시아의 오랜 중심이던 청이 신흥 일본에 패했다. 시모노세키 조약으로 일본은 타이완을 얻고 막대한 배상금을 챙겼다.',
      why:'수백 년 이어진 중화 질서가 무너지고, 동아시아의 힘의 축이 청에서 일본으로 기울었다.',
      changed:'제국으로 발돋움한 일본이 대륙을 향한 야심을 드러내며, 동아시아가 본격적인 열강 각축의 무대가 되었다.'
    },
    phases:[
      {from:1894, to:1894, note:'개전 — 일본이 청을 상대로 빠르게 전선을 넓혔다.'},
      {from:1895, to:1895, note:'종결 — 시모노세키 조약으로 일본의 승리가 굳어졌다.'}
    ],
    figures:[{name:'이홍장', role:'청 강화 대표'},{name:'무쓰 무네미쓰', role:'일본 외상'}]
  },

  world_1904_russo_japanese: {
    id:'world_1904_russo_japanese', title:'러일전쟁', start:1904, end:1905,
    regionKey:'east_asia', region:'만주·동해 (뤼순·쓰시마)', location:[41.0, 132.0],
    type:'WAR', visual:'spread', priority:1,
    summary:{
      what:'만주와 한반도의 주도권을 두고 러시아와 일본이 충돌했다. 일본이 뤼순을 함락하고 쓰시마 해전에서 발트 함대를 격파했다.',
      why:'아시아의 신흥국이 유럽 열강을 꺾었다는 충격이 세계로 퍼졌고, 제국주의 경쟁의 무대가 동아시아로 옮겨졌다.',
      changed:'포츠머스 강화로 일본은 대륙 진출의 발판을 굳혔고, 한반도를 둘러싼 국제적 견제가 사실상 사라졌다.'
    },
    phases:[
      {from:1904, to:1904, note:'개전 — 뤼순 공방과 만주 전선에서 격전이 이어졌다.'},
      {from:1905, to:1905, note:'종결 — 쓰시마 해전 승리 뒤 포츠머스 강화로 마무리되었다.'}
    ],
    figures:[{name:'도고 헤이하치로', role:'일본 해군 제독'},{name:'시어도어 루스벨트', role:'강화 중재'}]
  },

  world_1911_xinhai: {
    id:'world_1911_xinhai', title:'신해혁명', start:1911, end:1912,
    regionKey:'east_asia', region:'중국 (우창·난징)', location:[30.58, 114.30],
    type:'REVOLUTION', visual:'radiate', priority:1,
    summary:{
      what:'우창에서 시작된 봉기가 전국으로 번지며 2천 년 넘게 이어진 황제 체제가 무너졌다. 쑨원이 이끄는 혁명파가 중화민국을 세웠다.',
      why:'아시아에 처음으로 공화국이 들어서며, 왕조의 시대가 끝나고 국민이 주권을 갖는다는 이념이 동아시아로 퍼졌다.',
      changed:'동아시아의 정치 상상력이 군주에서 공화로 옮겨갔고, 주권재민의 사상이 이웃 나라들에 깊은 자극을 주었다.'
    },
    figures:[{name:'쑨원', role:'혁명 지도자'},{name:'위안스카이', role:'청 실권자'}]
  },

  world_1927_chinese_civil: {
    id:'world_1927_chinese_civil', title:'국공내전', start:1927, end:1945,
    regionKey:'east_asia', region:'중국', location:[28.68, 115.89],
    type:'WAR', visual:'spread', priority:2,
    summary:{
      what:'북벌 도중 국민당이 공산당을 무력으로 숙청하면서, 중국은 국민당과 공산당으로 갈라져 긴 내전에 들어섰다. 공산당은 농촌으로 쫓겨 대장정에 올랐다.',
      why:'중국의 진로를 둘러싼 이 대립은 동아시아 정세 전체를 흔든 장기 갈등이었다.',
      changed:'만주·상하이를 무대로 활동하던 한인 독립운동가들의 노선과 연대에도 깊은 영향을 미쳤다.'
    },
    phases:[
      {from:1927, to:1933, note:'분열 — 국공 합작이 깨지고 공산당이 농촌 근거지로 밀려났다.'},
      {from:1934, to:1936, note:'대장정 — 공산당이 포위를 뚫고 서북으로 이동했다.'},
      {from:1937, to:1945, note:'항일 국면 — 일본의 침략 앞에 국공이 다시 손을 잡았다(내전은 잠복).'}
    ],
    figures:[{name:'장제스', role:'국민당 지도자'},{name:'마오쩌둥', role:'공산당 지도자'}]
  },

  world_1931_manchuria: {
    id:'world_1931_manchuria', title:'만주사변과 만주국', start:1931, end:1945,
    regionKey:'east_asia', region:'중국 동북 (만주)', location:[43.80, 125.32],
    type:'EMPIRE', visual:'expand', priority:1,
    summary:{
      what:'일본 관동군이 철도 폭파를 구실로 만주 전역을 점령하고 괴뢰국 만주국을 세웠다. 국제연맹이 침략으로 규정하자 일본은 연맹을 탈퇴했다.',
      why:'집단안보 체제가 처음으로 무력 앞에 무력함을 드러낸 사건이자, 일본의 대륙 지배가 본격화한 출발점이었다.',
      changed:'동아시아가 본격적인 전쟁의 시대로 미끄러졌고, 만주의 한인 사회와 무장투쟁의 조건도 크게 달라졌다.'
    },
    phases:[
      {from:1931, to:1932, note:'점령 — 관동군이 만주를 장악하고 만주국을 세웠다.'},
      {from:1933, to:1936, note:'통치 심화 — 괴뢰 통치와 개발·이민이 본격화되었다.'},
      {from:1937, to:1945, note:'병참기지화 — 대륙 침략의 후방 기지가 되었다.'}
    ],
    figures:[{name:'푸이', role:'만주국 집정·황제'},{name:'이시와라 간지', role:'관동군 참모'}]
  },

  world_1937_sino_japanese2: {
    id:'world_1937_sino_japanese2', title:'중일전쟁', start:1937, end:1945,
    regionKey:'east_asia', region:'중국', location:[39.90, 116.40],
    type:'WAR', visual:'spread', priority:1,
    summary:{
      what:'베이징 인근 노구교의 충돌을 빌미로 일본이 중국 본토를 전면 침공했다. 상하이·난징이 함락되고 대규모 학살이 벌어졌다.',
      why:'동아시아 전체를 전화에 몰아넣은 장기 전면전으로, 곧 제2차 세계대전의 아시아 전선과 맞물렸다.',
      changed:'국공이 항일을 위해 다시 손을 잡았고, 중국 대륙의 한인 독립운동도 이 전쟁의 흐름 속에서 재편되었다.'
    },
    phases:[
      {from:1937, to:1938, note:'전면전 — 상하이·난징이 함락되고 전선이 내륙으로 밀렸다.'},
      {from:1939, to:1941, note:'교착 — 광대한 전선에서 장기 소모전이 이어졌다.'},
      {from:1942, to:1945, note:'세계전 편입 — 태평양전쟁과 맞물려 연합국 전선의 일부가 되었다.'}
    ],
    figures:[{name:'장제스', role:'중국 항전 지도'},{name:'장쉐량', role:'시안사변 주도'}]
  },

  world_1941_pacific: {
    id:'world_1941_pacific', title:'태평양전쟁', start:1941, end:1945,
    regionKey:'east_asia', region:'태평양·동남아시아', location:[14.6, 135.0],
    type:'WAR', visual:'spread', priority:1,
    summary:{
      what:'일본이 진주만을 기습하며 미국·영국과 전면전에 들어섰다. 동남아시아와 태평양 섬들이 순식간에 전장이 되었다.',
      why:'제2차 세계대전이 명실상부한 전 지구적 전쟁이 된 분기점이었다.',
      changed:'미국의 총력이 태평양으로 쏟아졌고, 일본의 패망과 함께 아시아 식민지 질서가 무너지기 시작했다.'
    },
    phases:[
      {from:1941, to:1942, note:'개전 — 일본이 동남아·태평양으로 빠르게 팽창했다.'},
      {from:1943, to:1944, note:'반격 — 미국이 섬을 건너뛰며 일본을 압박했다.'},
      {from:1945, to:1945, note:'종결 — 원폭과 함께 일본이 항복했다.'}
    ],
    figures:[{name:'야마모토 이소로쿠', role:'일본 연합함대'},{name:'맥아더', role:'미군 사령관'}]
  },

  // ─────────── 유라시아 ───────────
  world_1922_ussr: {
    id:'world_1922_ussr', title:'소비에트 연방 성립', start:1922, end:1945,
    regionKey:'eurasia', region:'유라시아 (모스크바)', location:[55.75, 37.62],
    type:'POLITICS', visual:'expand', priority:2,
    summary:{
      what:'내전을 거친 러시아가 여러 소비에트 공화국을 하나로 묶어 소비에트 연방을 세웠다. 이후 스탈린 체제 아래 급속한 공업화와 대숙청이 이어졌다.',
      why:'하나의 거대한 사회주의 국가가 유라시아에 자리 잡으며, 세계가 자본주의와 사회주의 두 축으로 재편되었다.',
      changed:'코민테른을 통해 식민지 해방운동에 이론과 자금을 대는 새로운 중심이 되었고, 세계 좌익·약소민족 운동의 지형을 바꿨다.'
    },
    phases:[
      {from:1922, to:1928, note:'형성 — 연방이 자리 잡고 신경제정책이 시행되었다.'},
      {from:1929, to:1938, note:'스탈린 체제 — 강제 공업화·집단화와 대숙청이 벌어졌다.'},
      {from:1939, to:1945, note:'대조국전쟁 — 독일의 침공을 막아내며 초강대국으로 부상했다.'}
    ],
    figures:[{name:'스탈린', role:'소련 지도자'},{name:'레닌', role:'연방 창설'}]
  },

  // ─────────── 중동 ───────────
  world_1908_ottoman: {
    id:'world_1908_ottoman', title:'오스만 쇠퇴와 청년튀르크', start:1908, end:1918,
    regionKey:'mideast', region:'중동 (오스만 제국)', location:[39.0, 35.0],
    type:'EMPIRE', visual:'expand', priority:2,
    summary:{
      what:'청년튀르크 혁명으로 입헌정이 부활했지만, 오스만 제국은 발칸전쟁과 영토 상실 속에서 빠르게 약해졌다. 제1차 세계대전에서 독일 편에 서며 운명을 걸었다.',
      why:'수백 년 이어진 이슬람 대제국이 무너지는 길목으로, 중동 질서의 대전환을 예고했다.',
      changed:'전후 제국이 해체되고 영국·프랑스가 위임통치로 중동을 분할하며, 오늘날 중동 국경의 틀이 만들어지기 시작했다.'
    },
    figures:[{name:'엔베르 파샤', role:'청년튀르크 지도'},{name:'무스타파 케말', role:'전후 튀르크 건국'}]
  },

  world_1920_mideast_mandate: {
    id:'world_1920_mideast_mandate', title:'중동 위임통치와 석유', start:1920, end:1945,
    regionKey:'mideast', region:'중동 (아랍 지역)', location:[33.3, 44.4],
    type:'EMPIRE', visual:'expand', priority:2,
    summary:{
      what:'오스만 해체 후 영국과 프랑스가 위임통치 이름으로 아랍 지역을 나눠 가졌다. 동시에 페르시아만 일대에서 석유 개발이 본격화되었다.',
      why:'제국이 그은 인공 국경과 석유 이권이 맞물리며, 20세기 중동 갈등의 구조가 형성되었다.',
      changed:'석유가 전략 자원으로 떠오르면서 중동이 세계 강대국 정치의 핵심 무대가 되었다.'
    },
    figures:[{name:'이븐 사우드', role:'사우디 건국'},{name:'로렌스', role:'아랍 반란 관여'}]
  },

  // ─────────── 남아시아 ───────────
  world_1885_india_congress: {
    id:'world_1885_india_congress', title:'인도 독립운동', start:1885, end:1945,
    regionKey:'south_asia', region:'남아시아 (영국령 인도)', location:[21.0, 78.0],
    type:'IDEA', visual:'radiate', priority:2,
    summary:{
      what:'1885년 인도국민회의가 결성되며 식민 지배에 대한 조직적 저항이 시작되었다. 20세기 들어 간디의 비폭력 불복종 운동으로 대중운동으로 발전했다.',
      why:'세계 최대 식민지에서 일어난 이 운동은 비폭력 저항이라는 새로운 정치 방법을 세계에 보여주었다.',
      changed:'식민지도 스스로 독립을 요구할 수 있다는 흐름이 아시아 전역으로 퍼졌고, 한국을 비롯한 약소민족 운동에도 자극을 주었다.'
    },
    phases:[
      {from:1885, to:1918, note:'태동 — 국민회의 중심의 청원·온건 노선이 자리 잡았다.'},
      {from:1919, to:1934, note:'대중화 — 간디의 비폭력 불복종이 전국으로 번졌다.'},
      {from:1935, to:1945, note:'자치 확대 — 자치와 완전 독립 요구가 거세졌다.'}
    ],
    figures:[{name:'간디', role:'비폭력 저항'},{name:'네루', role:'독립운동 지도'}]
  },

  // ─────────── 동남아시아 ───────────
  world_1900_sea_colonial: {
    id:'world_1900_sea_colonial', title:'동남아시아 식민 지배', start:1885, end:1941,
    regionKey:'sea', region:'동남아시아', location:[2.0, 110.0],
    type:'EMPIRE', visual:'expand', priority:3,
    summary:{
      what:'네덜란드령 동인도, 프랑스령 인도차이나, 영국령 말라야·버마 등 동남아시아 대부분이 유럽 열강의 식민지로 편입되었다. 플랜테이션과 자원 수탈이 자리 잡았다.',
      why:'세계 무역의 핵심 자원 산지가 제국 경제에 깊이 묶인 시대를 보여준다.',
      changed:'한편으로 현지 지식인 사이에서 민족주의가 싹트며, 훗날 독립운동의 토대가 마련되었다.'
    },
    figures:[{name:'호찌민', role:'베트남 민족운동'}]
  },

  // ─────────── 아프리카 ───────────
  world_1884_africa: {
    id:'world_1884_africa', title:'아프리카 분할', start:1884, end:1914,
    regionKey:'africa', region:'아프리카', location:[0.0, 18.0],
    type:'EMPIRE', visual:'expand', priority:1,
    summary:{
      what:'베를린 회의를 기점으로 유럽 열강이 아프리카를 지도 위 직선으로 나눠 가졌다. 현지인의 의사와 무관하게 강이 국경이 되고 부족이 갈라졌다.',
      why:'제국주의가 "문명화"를 명분으로 전 지구를 분할하던 시대의 정점이었다.',
      changed:'식민 지배가 예외가 아니라 세계의 기본 질서가 되었고, 그 경계선은 한 세기 뒤까지 갈등의 불씨로 남았다.'
    },
    figures:[{name:'레오폴드 2세', role:'콩고 사유화'},{name:'세실 로즈', role:'영국 팽창 주도'}]
  },

  world_1914_africa_colonial: {
    id:'world_1914_africa_colonial', title:'아프리카 식민 체제', start:1914, end:1945,
    regionKey:'africa', region:'아프리카', location:[6.0, 20.0],
    type:'EMPIRE', visual:'expand', priority:3,
    summary:{
      what:'분할이 끝난 아프리카는 유럽 제국의 통치 아래 자원 수탈과 강제 노동의 시대를 겪었다. 두 차례 세계대전에는 수많은 아프리카인이 동원되었다.',
      why:'식민 지배가 일상이 된 한편, 전쟁 동원과 도시화 속에서 변화의 압력이 쌓여간 시기였다.',
      changed:'전후 아프리카 곳곳에서 독립의 열망이 자라나는 토대가 마련되었다.'
    },
    figures:[]
  },

  // ─────────── 북아메리카 ───────────
  world_1929_depression: {
    id:'world_1929_depression', title:'대공황', start:1929, end:1939,
    regionKey:'north_america', region:'미국에서 전 세계로 확산', location:[40.71, -74.01],
    type:'ECONOMY', visual:'wave', priority:1,
    summary:{
      what:'뉴욕 증시 붕괴로 시작된 공황이 세계 경제를 집어삼켰다. 공장이 멈추고 실업자가 거리로 쏟아졌으며 무역이 얼어붙었다.',
      why:'자유시장에 대한 믿음이 흔들리며, 경제 위기가 곧바로 정치 위기로 번진 시대였다.',
      changed:'각국이 보호무역과 국가 통제로 돌아섰고, 일부는 파시즘과 군국주의에서 출구를 찾으며 다음 전쟁으로 기울었다.'
    },
    phases:[
      {from:1929, to:1930, note:'시작 — 증시 붕괴가 금융·실물로 번지기 시작했다.'},
      {from:1931, to:1934, note:'심화 — 대량 실업과 무역 붕괴가 세계로 확산되었다.'},
      {from:1935, to:1939, note:'장기화 — 일부 회복 속에서도 불안과 진영화가 깊어졌다.'}
    ],
    figures:[{name:'후버', role:'공황 초기 대통령'},{name:'케인스', role:'새 경제이론'}]
  },

  world_1933_newdeal: {
    id:'world_1933_newdeal', title:'뉴딜 정책', start:1933, end:1939,
    regionKey:'north_america', region:'미국', location:[38.9, -77.04],
    type:'ECONOMY', visual:'wave', priority:2,
    summary:{
      what:'대공황에 맞서 루스벨트 정부가 대규모 공공사업과 금융 개혁, 사회보장을 도입했다. 국가가 경제에 적극 개입하는 길을 열었다.',
      why:'자유방임을 대신해 "국가가 시장을 관리한다"는 새로운 경제 모델이 등장했다.',
      changed:'복지국가와 적극적 재정정책의 원형이 마련되며, 전후 자본주의의 방향에 큰 영향을 주었다.'
    },
    figures:[{name:'루스벨트', role:'뉴딜 추진'}]
  },

  // ─────────── 남아메리카 ───────────
  world_1930_latam: {
    id:'world_1930_latam', title:'대공황과 라틴아메리카', start:1930, end:1945,
    regionKey:'south_america', region:'남아메리카', location:[-15.0, -55.0],
    type:'ECONOMY', visual:'wave', priority:3,
    summary:{
      what:'1차 산품 수출에 의존하던 라틴아메리카 경제가 대공황으로 큰 타격을 입었다. 여러 나라에서 군부 쿠데타와 권위주의 정권이 들어섰다.',
      why:'세계 경제 위기가 멀리 떨어진 지역의 정치까지 뒤흔든 사례를 보여준다.',
      changed:'수입대체 공업화와 국가 주도 경제가 시도되며, 지역의 경제·정치 구조가 재편되었다.'
    },
    figures:[{name:'바르가스', role:'브라질 집권'}]
  },

  // ─────────── 오세아니아 ───────────
  world_1901_australia: {
    id:'world_1901_australia', title:'호주 연방과 자치령', start:1901, end:1945,
    regionKey:'oceania', region:'오세아니아 (호주·뉴질랜드)', location:[-25.0, 135.0],
    type:'POLITICS', visual:'flow', priority:3,
    summary:{
      what:'1901년 호주 식민지들이 하나의 연방으로 묶였고, 뉴질랜드와 함께 영연방 자치령으로 발전했다. 두 차례 세계대전에 영국 편으로 참전했다.',
      why:'유럽 밖에서 형성된 영어권 자치 사회가 점차 독자적 정체성을 갖춰가는 흐름을 보여준다.',
      changed:'대공황과 전쟁을 거치며 영국 의존에서 벗어나 태평양 국가로서의 위치를 자각하기 시작했다.'
    },
    figures:[]
  },

  // ─────────── 전 세계 ───────────
  world_1945_un: {
    id:'world_1945_un', title:'국제연합 창설', start:1945, end:1945,
    regionKey:'global', region:'전 세계 (샌프란시스코)', location:[37.77, -122.42],
    type:'POLITICS', visual:'flow', priority:1,
    summary:{
      what:'전쟁의 폐허 위에서 51개국이 모여 국제연합을 세웠다. 실패한 국제연맹의 교훈 위에, 강대국이 주도하는 안전보장이사회를 두었다.',
      why:'전후 세계의 평화를 어떤 틀로 지킬 것인가를 정한 출발점이었다.',
      changed:'동시에 미국과 소련의 대립이 부상하며, 세계는 곧 냉전이라는 새로운 질서로 접어들 참이었다.'
    },
    figures:[{name:'루스벨트', role:'구상 주도'},{name:'스탈린', role:'전후 강대국'}]
  }

};

if (typeof window !== 'undefined'){
  window.WORLD_EVENTS = WORLD_EVENTS;
  window.WORLD_REGIONS = WORLD_REGIONS;
}
