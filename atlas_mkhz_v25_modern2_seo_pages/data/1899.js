// data/1899.js — 1899년 사건 데이터
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1899.js"></script> 로 불립니다.

const EVENTS_1899 = [

  { id:'policy_1899_01', year:1899, visible_from:1899, visible_until:1904,
    month:7, day:null, type:'policy', priority:1,
    title_ko:'대한국 국제 반포 — 황제 중심 체제',
    title_en:'Promulgation of the Constitution of the Korean Empire',
    title_ja:'大韓国国制の頒布',
    place_ko:'한성',
    lat:37.566, lng:126.975,
    people:['고종'],
    summary_ko:'1899년 대한제국은 대한국 국제를 반포해, 황제가 군사·입법·행정·외교의 모든 권한을 갖는 전제군주제를 헌법적으로 명문화했다. 독립협회와 만민공동회가 요구하던 의회·민권의 길 대신, 황제권을 절대화하는 방향이 선택된 것이다. 이는 곧 원수부 설치와 광무개혁으로 이어지는 위로부터의 근대화, 그 체제적 토대가 되었다. 대한제국이 어떤 방식으로 근대 국가를 세우려 했는지를 규정한, 짧지만 결정적인 문서였다.',
    video:null,
    connections:['political_1897_01','political_1898_01','policy_1900_01'],
    tags:['policy','경성','대한국국제','고종','전제군주','광무'],
    sources:['한국민족문화대백과사전 대한국국제','위키백과 대한제국'] },

  { id:'policy_1899_02', year:1899, visible_from:1899, visible_until:1901,
    month:8, day:null, type:'policy', priority:2,
    title_ko:'경인선 개통 — 첫 철도',
    title_en:'Opening of the Gyeongin Railway',
    title_ja:'京仁線の開通',
    place_ko:'제물포~노량진',
    lat:37.515, lng:126.910,
    people:[],
    summary_ko:'1899년 9월 제물포와 노량진을 잇는 경인선이 개통됐다. 한반도 최초의 철도였다. 걸어서 열두 시간 걸리던 길이 몇 시간으로 줄어들면서, 사람들은 처음으로 근대적 속도를 몸으로 체감했다. 같은 해 한성에는 전차가 다니기 시작했다. 철길과 전차는 대한제국이 추진한 근대화의 가장 눈에 보이는 성과였지만, 그 부설권과 운영의 상당 부분이 외국 자본과 얽혀 있었다는 점에서, 근대의 빛과 그늘을 함께 품고 있었다.',
    video:null,
    connections:['policy_1900_04'],
    tags:['policy','경기도','경인선','철도','근대화','교통'],
    sources:['한국민족문화대백과사전 경인선','위키백과 경인선'] },

  { id:'political_1899_01', year:1899, visible_from:1899, visible_until:1905,
    month:9, day:11, type:'political', priority:2,
    title_ko:'한청통상조약 — 대등하게 마주 선 두 제국',
    title_en:'The Korea–China Treaty of Commerce',
    title_ja:'韓清通商条約',
    place_ko:'한성',
    lat:37.566, lng:126.978,
    people:['박제순'],
    summary_ko:'1899년 9월 11일 대한제국 외부대신 박제순과 청 전권대신 서수붕이 한청통상조약을 맺었다. 청일전쟁으로 청과 조선의 전통적 사대 관계가 깨진 뒤 무조약 상태로 4년을 보낸 두 나라가, 처음으로 황제와 황제가 대등하게 서명하는 근대적 조약을 체결한 것이다. 1882년 조청상민수륙무역장정이 조선을 청의 속방으로 규정했던 것과 달리, 이번엔 종속의 언어 없이 쌍무적 권리와 의무만을 담았다. 중화 중심의 사대질서에서 완전히 벗어났음을 국제적으로 공인받은 사건이었지만, 그 대등함은 청이 약해진 결과일 뿐, 대한제국을 둘러싼 더 큰 제국들의 그림자는 그대로 남아 있었다.',
    video:null,
    connections:['policy_1899_01'],
    tags:['political','경성','한청통상조약','박제순','대한제국','청'],
    sources:['한국민족문화대백과사전 한청통상조약','위키백과 대한국·대청국통상조약','나무위키 한청통상조약'],
    content:{ hero:{"url": "assets/images/entity/person/person_park_je_sun_desk_01.webp", "alt": "박제순", "caption": "", "credit": "AI 생성 이미지", "is_ai": true, "source_type": "generated", "image_type": "portrait"}, gallery:[] } }

];
