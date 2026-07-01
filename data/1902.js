// data/1902.js — 1902년 사건 데이터
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1902.js"></script> 로 불립니다.

const EVENTS_1902 = [

  { id:'political_1902_01', year:1902, visible_from:1902, visible_until:1905,
    month:0, day:null, type:'political', priority:2,
    title_ko:'간도관리사 이범윤 파견',
    title_en:'Dispatch of Yi Beom-yun as Gando Administrator',
    title_ja:'間島管理使李範允の派遣',
    place_ko:'북간도 (옌지)',
    lat:42.91, lng:129.51,
    people:['이범윤'],
    summary_ko:'대한제국은 간도가 자국 영토임을 주장하며, 1902년 이범윤을 간도시찰사로, 이듬해 간도관리사로 파견했다. 이미 두만강을 건너 간도에 정착해 살던 수만 명의 조선인 이주민을 보호하고 행정·치안을 관할하기 위해서였다. 이범윤은 사포대(私砲隊)라는 무장조직을 꾸려 청의 마적과 관헌으로부터 한인을 지켰다. 그러나 1905년 을사늑약으로 대한제국이 외교권을 잃자, 일본은 1909년 간도협약으로 간도 영유권을 청에 넘겨버린다. 이범윤은 이후 연해주로 망명해 의병을 이끌며 항일운동을 이어갔다. 간도 한인사회를 국가가 공식 관할하려 한 마지막 시도이자, 훗날 만주 독립운동의 한 배경이 된 사건이다.',
    video:null,
    connections:['migration_1910_03'],
    tags:['political','만주·간도','이범윤','간도관리사','대한제국'],
    sources:['위키백과 대한제국','한국민족문화대백과사전 이범윤'] },

  { id:'policy_1902_01', year:1902, visible_from:1902, visible_until:1905,
    month:2, day:null, type:'policy', priority:3,
    title_ko:'한성~인천 전화 개통 — 목소리가 선을 타고',
    title_en:'Telephone Line Opens between Hanseong and Incheon',
    title_ja:'漢城~仁川間電話開通',
    place_ko:'한성~인천',
    lat:37.54, lng:126.85,
    people:[],
    summary_ko:'1902년 3월 통신원이 한성과 인천 사이에 공중전화를 개설하면서, 일반인이 이용할 수 있는 장거리 전화 시대가 열렸다. 1896년 궁내부에 처음 전화가 놓인 지 6년, 1898년 한성전기회사가 설립되고 전차가 다니기 시작한 지 3년 만이었다. 같은 해 6월에는 한성전화소가 문을 열어 시내 전화 업무도 시작됐다. 말이 선을 타고 흐른다는 사실 자체가 낯선 충격이었던 시절, 전차의 굉음과 전화의 목소리는 대한제국의 거리와 일상에 "근대"라는 단어를 체감 가능한 감각으로 새겨 넣었다.',
    video:null,
    connections:['policy_1900_04'],
    tags:['policy','경기도','전화','한성전기회사','근대화','통신'],
    sources:['전기신문 전기의 역사','우리역사넷 한성전기회사'] },

  { id:'person_1902_01', year:1902, visible_from:1902, visible_until:1905,
    month:0, day:null, type:'person', priority:1,
    title_ko:'이용익 — 황실 재정을 틀어쥔 고종의 금고지기',
    title_en:'Yi Yong-ik — Keeper of the Imperial Treasury',
    title_ja:'李容翊 — 皇室財政を握った高宗の金庫番',
    place_ko:'한성 (내장원·탁지부)',
    lat:37.575, lng:126.977,
    people:['이용익'],
    summary_ko:'함경도 보부상 출신으로 단천 금광 정보를 고종에게 제공해 출세한 이용익은, 전환국장·내장원경·탁지부대신을 두루 거치며 대한제국 황실 재정을 한 손에 틀어쥐었다. 화폐 주조 이익으로 국가 재정을 떠받쳤지만, 백동화 남발은 물가 폭등을 불러 독립협회의 비판을 받기도 했다. 1902년 탁지부대신으로 이준·민영환·이상재 등과 개혁당을 조직했고, 친러 노선으로 일본의 침투를 견제하려 애썼다. 보부상에서 황실 재정의 실세로, 그리고 보성전문학교(현 고려대) 설립자로 — 그의 행로는 신분과 출신을 뛰어넘은 입신의 드라마이자, 대한제국 자강 노력의 한계와 가능성을 함께 보여준다.',
    video:null,
    connections:['policy_1899_01','policy_1902_01'],
    tags:['person','경성','이용익','내장원','탁지부','화폐개혁','광무개혁'],
    sources:['한국민족문화대백과사전 이용익','위키백과 이용익','우리역사넷 이용익'],
    content:{ hero:{"url": "assets/images/entity/person/person_yi_yong_ik_01.webp", "alt": "이용익", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "portrait"}, gallery:[] } }

];
