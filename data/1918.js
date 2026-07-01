// data/1918.js — 1918년 사건 데이터
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1918.js"></script> 로 불립니다.

const EVENTS_1918 = [

  { id:'political_1918_01', year:1918, visible_from:1918, visible_until:1919,
    month:10, day:null, type:'political', priority:1,
    title_ko:'무오독립선언 — 해외 39인의 독립선언',
    title_en:'The Declaration of Korean Independence (Muo Declaration)',
    title_ja:'戊午独立宣言',
    place_ko:'만주 지린(길림)',
    lat:43.84, lng:126.55,
    people:['조소앙'],
    summary_ko:'1918년 말(또는 1919년 2월) 만주 지린에서 해외 독립운동가 39인의 이름으로 대한독립선언서가 발표됐다. 무오년에 작성됐다 하여 무오독립선언으로 불린다. 조소앙이 기초했고, 김교헌·이동녕·이상룡·안창호·박은식·신채호 등 만주·연해주·중국·미주에서 활동하던 지사들이 서명했다. "대한은 완전한 자주독립국이며 민주의 자립국"임을 선포하고, 육탄혈전(肉彈血戰)을 통한 무장투쟁을 독립의 방략으로 명시했다. 2·8독립선언과 3·1운동에 앞선 선구적 선언이었다.',
    video:null,
    connections:['political_1917_01'],
    tags:['political','만주·간도','무오독립선언','대한독립선언','조소앙'],
    sources:['위키백과 대한독립선언서','우리역사넷 무오독립선언서'],
    content:{ hero:{"url": "assets/images/entity/person/person_jo_so_ang_01.webp", "alt": "조소앙", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "portrait"}, gallery:[] } },

  { id:'policy_1918_01', year:1918, visible_from:1918, visible_until:1918,
    month:10, day:null, type:'policy', priority:2, area:true, areaRadius:120000,
    title_ko:'토지조사사업 완료 — 수탈의 마무리',
    title_en:'Completion of the Land Survey Project',
    title_ja:'土地調査事業の完了',
    place_ko:'조선 전역',
    lat:36.5, lng:127.8,
    people:[],
    summary_ko:'1910년 시작된 토지조사사업이 1918년 마무리됐다. 8년에 걸친 조사로 일제는 전국 토지의 소유 관계를 일본식 근대 소유권 제도로 재편했다. 그 결과 막대한 국유지·공유지가 총독부와 동양척식주식회사로 넘어갔고, 신고에서 누락된 농민들은 경작권을 잃고 소작농으로 전락했다. 동양척식회사 등을 통해 일본인 지주가 늘어나는 동안 조선 농민의 삶은 갈수록 피폐해졌으며, 땅을 잃은 이들은 도시 빈민이나 화전민이 되거나 만주·연해주로 떠났다. 식민지 수탈 구조의 토대가 이 사업으로 완성됐다.',
    video:null,
    connections:['policy_1912_01'],
    tags:['policy','조선국내','토지조사사업','경제수탈','동양척식'],
    sources:['한국민족문화대백과사전 일제강점기','한국사 토지조사사업'],
    content:{ hero:{"url": "assets/images/entity/event/event_policy_1918_01_01.webp", "alt": "토지조사사업 완료 — 수탈의 마무리", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "event"}, gallery:[] } },

  { id:'organization_1918_01', year:1918, visible_from:1918, visible_until:1918,
    month:3, day:null, type:'organization', priority:1,
    title_ko:'한인사회당 결성 — 한국 최초의 사회주의 정당',
    title_en:'Founding of the Korean Socialist Party',
    title_ja:'韓人社会党の結成',
    place_ko:'하바롭스크',
    lat:48.48, lng:135.08,
    people:['이동휘','김알렉산드라'],
    summary_ko:'1917년 러시아혁명이 일어나자, 연해주의 한국 독립운동가들은 사회주의에서 독립의 새로운 길을 보았다. 1918년 4월(러시아력) 하바롭스크에서 이동휘를 위원장으로 한국 최초의 사회주의 정당 한인사회당이 결성됐다. 김립이 선전부장, 유동열이 군사부장을 맡았고, 한인 최초의 볼셰비키 김알렉산드라가 창당을 지원하며 중앙위원으로 참여했다. 극동 소비에트 정부의 지원 아래 연해주와 아무르주에 8개 지부를 두었으나, 그해 8월 일본·미국의 시베리아 출병으로 백위군이 하바롭스크를 함락시키면서 와해됐다. 비록 짧았지만, 이후 한국 독립운동이 좌우로 분화하는 큰 분수령이 된 사건이었다.',
    video:null,
    connections:['person_1914_02'],
    tags:['organization','러시아','한인사회당','사회주의','이동휘'],
    sources:['우리역사넷 한인사회당','한국민족문화대백과사전'] },

  // ══ 인물 스냅샷 ══
  { id:'person_1918_01', year:1918, visible_from:1918, visible_until:1918,
    month:8, day:16, type:'person', priority:1,
    title_ko:'김알렉산드라 — 한인 최초의 볼셰비키',
    title_en:'Kim Alexandra — The First Korean Bolshevik',
    title_ja:'金アレクサンドラ — 韓人最初のボルシェビキ',
    place_ko:'하바롭스크',
    lat:48.472, lng:135.057,
    people:['김알렉산드라'],
    summary_ko:'1885년 연해주에서 한인 이주민의 딸로 태어난 김알렉산드라(김 알렉산드라 페트로브나)는 러시아 한인 노동자와 중국인 노동자의 권익을 위해 싸운 한인 최초의 볼셰비키였다. 러시아혁명 후 하바롭스크 극동인민위원회 외무위원을 맡았고, 1918년 한인사회당 창당을 이끌며 망명 한인 혁명가들을 결집했다. 그러나 그해 9월 일본·미국이 지원한 백위군이 하바롭스크를 함락시키자, 그는 탈출을 시도하다 붙잡혀 9월 16일 처형됐다. 전향을 거부한 그는 사형장 아무르강 절벽에서 조선의 13도를 뜻하는 열세 걸음을 떼며 조국의 독립과 해방을 기원했다고 전한다 — 향년 33세였다.',
    video:null,
    connections:['organization_1918_01'],
    tags:['person','러시아','김알렉산드라','한인사회당','사회주의','여성'],
    sources:['나무위키 김알렉산드라','우리역사넷 한인사회당','경향신문 한인 최초 볼셰비키'],
    content:{ hero:{"url": "assets/images/entity/person/person_kim_alexandra_01.webp", "alt": "김알렉산드라", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "portrait"}, gallery:[] } }

];
