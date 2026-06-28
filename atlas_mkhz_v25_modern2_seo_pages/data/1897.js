// data/1897.js — 1897년 사건 데이터
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1897.js"></script> 로 불립니다.

const EVENTS_1897 = [

  { id:'political_1897_01', year:1897, visible_from:1897, visible_until:1900,
    month:9, day:12, type:'political', priority:1,
    title_ko:'대한제국 선포 — 황제의 나라',
    title_en:'Proclamation of the Korean Empire',
    title_ja:'大韓帝国の宣布',
    place_ko:'한성 (환구단)',
    lat:37.564, lng:126.979,
    people:['고종'],
    summary_ko:'1년간 머물던 러시아공사관을 나와 경운궁으로 환궁한 고종은, 1897년 10월 환구단에서 하늘에 제사를 올리고 황제로 즉위했다. 국호를 대한제국으로, 연호를 광무로 정했다(칭제건원). 더 이상 청의 제후국이 아니라 자주독립의 제국임을 안팎에 선포한 것이다. 비록 열강에 둘러싸인 현실은 엄혹했지만, 이 선언은 곧 광무개혁이라는 자주적 근대화의 출발점이 되었다. 무너지던 왕조가 제국이라는 이름으로 다시 한 번 일어서려 한 순간이었다.',
    video:null,
    connections:['political_1896_01','policy_1899_01','policy_1900_01'],
    tags:['political','경성','대한제국','고종','칭제건원','광무'],
    sources:['한국민족문화대백과사전 대한제국','위키백과 대한제국'] },

  { id:'organization_1897_01', year:1897, visible_from:1897, visible_until:1898,
    month:10, day:null, type:'organization', priority:2,
    title_ko:'독립문 완공',
    title_en:'Completion of the Independence Gate',
    title_ja:'独立門の竣工',
    place_ko:'한성 (서대문)',
    lat:37.572, lng:126.959,
    people:[],
    summary_ko:'독립협회가 추진한 독립문이 1897년 완공됐다. 청 사신을 맞이하던 영은문을 헐어낸 자리에 세운 이 문은, 대한제국 선포와 같은 해에 자주독립의 상징으로 도성 서쪽에 우뚝 섰다. 사대(事大)의 흔적을 지운 자리에 독립의 표지를 세운다는 발상 자체가, 이 시기 조선이 스스로를 어떻게 새로 정의하려 했는지를 보여준다. 제국의 선포가 궁궐에서 이뤄졌다면, 독립의 의지는 거리의 석조물로도 새겨졌다.',
    video:null,
    connections:['organization_1896_01'],
    tags:['organization','경성','독립문','독립협회','자주독립'],
    sources:['우리역사넷 열강의 이권침탈과 독립협회','위키백과 독립문'],
    content:{ hero:{"url": "assets/images/entity/event/event_organization_1897_01_01.webp", "alt": "독립문 완공", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "event"}, gallery:[] } }

];
