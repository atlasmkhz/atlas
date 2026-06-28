// data/1887.js — 1887년 사건 데이터
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1887.js"></script> 로 불립니다.

const EVENTS_1887 = [

  { id:'policy_1887_01', year:1887, visible_from:1887, visible_until:1893,
    month:2, day:6, type:'policy', priority:1,
    title_ko:'경복궁의 전등 — 들어온 근대의 빛',
    title_en:'Electric Light at Gyeongbokgung',
    title_ja:'景福宮の電灯',
    place_ko:'한성 (경복궁 건청궁)',
    lat:37.582, lng:126.977,
    people:['고종'],
    summary_ko:'1887년 3월, 경복궁 건청궁에 전등이 켜졌다. 에디슨이 백열등을 발명한 지 8년 만의 일로, 중국 자금성과 일본 궁성보다도 이른 동아시아 최초였다. 보빙사로 미국을 다녀온 민영익의 주선으로 에디슨 전등회사 설비가 들어왔고, 향원정 물을 끌어 발전기를 돌렸다. 발전이 자주 멈춰 "건달불"이라 불리고, 비용을 비판하는 상소도 올라왔다. 그러나 깊은 궁궐에 가장 먼저 들어온 이 불빛은, 위로부터 받아들여진 근대가 어떤 모습이었는지를 상징적으로 보여준다.',
    video:null,
    connections:['policy_1887_02'],
    tags:['policy','경성','전등','경복궁','근대기술','고종'],
    sources:['우리역사넷 근대적 우정·전신·전기시설','한국전력 전기박물관'] },

  { id:'policy_1887_02', year:1887, visible_from:1885, visible_until:1893,
    month:0, day:null, type:'policy', priority:2,
    title_ko:'전신망의 확장 — 이어지는 선들',
    title_en:'The Spread of the Telegraph',
    title_ja:'電信網の拡張',
    place_ko:'한성·인천·의주·원산',
    lat:37.8, lng:126.5,
    people:[],
    summary_ko:'1885년 서울과 인천·의주를 잇는 서로전선이 개통된 데 이어, 조선은 한글 전신부호와 독자적 전보장정을 마련하며 통신망을 넓혀갔다. 1888년 남로전선, 1891년 서울∼원산 북로전선이 차례로 가설됐다. 전신은 행정과 외교의 속도를 바꾼 근대 기반시설이었지만, 그 부설을 둘러싸고 청과 일본이 각축했다는 점에서 자주성과 외세 의존이 얽힌 시대의 단면이기도 했다. 보이지 않는 선들이 한반도를 가로지르며, 정보가 사람보다 빨리 움직이는 시대가 열리고 있었다.',
    video:null,
    connections:['policy_1887_01'],
    tags:['policy','전신','통신','근대기술','서로전선'],
    sources:['우리역사넷 근대적 우정·전신·전기시설'] }

];
