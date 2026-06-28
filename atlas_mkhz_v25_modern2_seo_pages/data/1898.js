// data/1898.js — 1898년 사건 데이터
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1898.js"></script> 로 불립니다.

const EVENTS_1898 = [

  { id:'movement_1898_01', year:1898, visible_from:1898, visible_until:1898,
    month:2, day:null, type:'movement', priority:1,
    title_ko:'만민공동회 — 광장의 정치',
    title_en:'The Mass Assembly (Manmin Gongdonghoe)',
    title_ja:'万民共同会',
    place_ko:'한성 (종로)',
    lat:37.570, lng:126.983,
    people:['서재필','윤치호'],
    summary_ko:'1898년 독립협회는 종로에서 만민공동회를 열어, 관리와 백성이 한자리에서 국정을 논하는 전례 없는 광장을 만들었다. 신분과 직업을 가리지 않은 사람들이 단상에 올라 외세의 이권 침탈과 관리의 부패를 공개적으로 비판했고, 나아가 의회 설립까지 요구했다. 백성이 직접 정치의 주체로 나선 이 실험은 근대적 시민정치의 첫 싹이었다. 그러나 황제권과 정면으로 부딪히면서, 이 광장은 그해를 넘기지 못하고 강제로 해산당했다. 만민공동회는 시민의 폭넓은 참여를 이끌어냈고, 정부 대신들이 참여한 관민공동회로 이어지며 헌의6조라는 개혁안을 끌어냈다.',
    video:null,
    connections:['organization_1896_01','political_1898_01','political_1898_02'],
    tags:['movement','경성','만민공동회','독립협회','민권','광장'],
    sources:['우리역사넷 열강의 이권침탈과 독립협회','위키백과 만민공동회'] },

  { id:'political_1898_02', year:1898, visible_from:1898, visible_until:1898,
    month:9, day:null, type:'political', priority:1,
    title_ko:'헌의6조',
    title_en:'The Six Articles of Petition',
    title_ja:'献議六条',
    place_ko:'한성',
    lat:37.567, lng:126.977,
    people:['고종','서재필','윤치호'],
    summary_ko:'만민공동회의 열기가 높아지자 고종은 정부 대신과 독립협회 대표가 함께하는 관민공동회를 열게 했고, 그 자리에서 헌의6조가 채택됐다. 외국에 의존하지 않는 자주권 확립, 중추원을 개편해 의회와 같은 기능을 갖추는 것, 재정의 일원화, 그리고 백성의 의견을 국정에 반영하는 민권 확대 등을 담은 개혁안이었다. 고종은 한때 이를 받아들여 중추원 개편을 약속하기도 했다. 그러나 황제권을 제약할 수 있다는 우려가 커지자 고종은 곧 약속을 철회했고, 개혁은 실행되지 못한 채 독립협회 해산으로 이어졌다.',
    video:null,
    connections:['movement_1898_01','political_1898_01'],
    tags:['political','경성','헌의6조','관민공동회','중추원','민권'],
    sources:['우리역사넷 열강의 이권침탈과 독립협회','한국민족문화대백과사전 헌의6조'] },

  { id:'political_1898_01', year:1898, visible_from:1898, visible_until:1898,
    month:11, day:null, type:'political', priority:2,
    title_ko:'독립협회 해산',
    title_en:'Dissolution of the Independence Club',
    title_ja:'独立協会の解散',
    place_ko:'한성',
    lat:37.566, lng:126.978,
    people:[],
    summary_ko:'만민공동회가 의회 설립과 국정 개혁을 요구하며 영향력을 키우자, 황제권을 위협으로 본 정부는 보부상 단체 황국협회를 동원해 충돌을 일으키고 독립협회를 강제로 해산시켰다. 자주독립과 민권을 외치던 조직은 결성 2년 만에 문을 닫았다. 광장의 정치와 황제의 체제가 끝내 양립하지 못한 것이다. 이 좌절은 곧 황제권을 절대화하는 대한국 국제(1899)로 이어지며, 위로부터의 근대화라는 대한제국의 길을 결정짓는다.',
    video:null,
    connections:['movement_1898_01','political_1898_02','organization_1896_01','policy_1899_01'],
    tags:['political','경성','독립협회','해산','황국협회','황제권'],
    sources:['우리역사넷 열강의 이권침탈과 독립협회','위키백과 독립협회'] },

  { id:'person_1898_01', year:1898, visible_from:1898, visible_until:1898,
    month:1, day:null, type:'person', priority:2,
    title_ko:'흥선대원군 별세',
    title_en:'Death of the Heungseon Daewongun',
    title_ja:'興宣大院君の死去',
    place_ko:'한성 (운현궁)',
    lat:37.575, lng:126.986,
    people:['흥선대원군'],
    summary_ko:'1898년, 한 시대를 호령하던 흥선대원군이 세상을 떠났다. 쇄국과 개혁, 척화와 권력투쟁의 한가운데서 19세기 후반 조선의 향방을 좌우했던 그였다. 임오군란과 갑신정변, 동학농민운동의 격동마다 다시 정치 전면에 불려 나왔던 노정객의 죽음은, 위정척사와 외척정치로 점철된 한 시대가 저물고 있음을 알리는 표지였다. 대한제국이라는 새로운 체제가 자리를 잡아가던 그 길목에서, 구시대의 마지막 상징이 사라졌다.',
    video:null,
    connections:[],
    tags:['person','경성','흥선대원군','운현궁'],
    sources:['한국민족문화대백과사전 흥선대원군','위키백과 흥선대원군'],
    content:{ hero:{"url": "assets/images/entity/person/person_heungseon_daewongun_01.webp", "alt": "흥선대원군", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "portrait"}, gallery:[] } }

];
