// data/1886.js — 1886년 사건 데이터
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1886.js"></script> 로 불립니다.

const EVENTS_1886 = [

  { id:'policy_1886_01', year:1886, visible_from:1886, visible_until:1893,
    month:8, day:23, type:'policy', priority:1,
    title_ko:'육영공원 — 첫 관립 근대학교',
    title_en:'Yugyeong Gongwon: The First Modern Government School',
    title_ja:'育英公院 — 最初の官立近代学校',
    place_ko:'한성 (정동)',
    lat:37.566, lng:126.974,
    people:[],
    summary_ko:'1886년 9월, 조선 정부는 정동에 육영공원을 세웠다. 헐버트를 비롯한 미국인 교사 세 명을 초빙해 영어와 함께 수학·지리·천문·만국사·정치학을 가르친, 국가가 직접 세운 첫 근대식 학교였다. 외교와 내치에 쓸 신지식을 갖춘 인재를 길러 외세에 대응하려는 조선의 의지가 담겨 있었다. 현직 관료의 좌원과 양반 자제의 우원으로 나뉜 이 학교는 신분의 한계와 재정난으로 1894년 문을 닫았지만, 근대 공교육과 외국어 교육의 출발점이 되었다.',
    video:null,
    connections:['policy_1886_02'],
    tags:['policy','경성','육영공원','근대교육','개화','헐버트'],
    sources:['한국민족문화대백과사전 육영공원','우리역사넷 육영공원'] },

  { id:'policy_1886_02', year:1886, visible_from:1885, visible_until:1893,
    month:5, day:null, type:'policy', priority:2,
    title_ko:'배재학당과 이화학당 — 사립 근대교육',
    title_en:'Baejae and Ewha: Private Modern Schools',
    title_ja:'培材学堂と梨花学堂',
    place_ko:'한성 (정동)',
    lat:37.564, lng:126.972,
    people:[],
    summary_ko:'관립학교가 세워지던 무렵, 개신교 선교사들도 잇따라 근대 사립학교를 열었다. 1885년 아펜젤러가 배재학당을, 1886년 스크랜튼이 이화학당을, 언더우드가 경신학당을 세웠다. 특히 이화학당은 유교적 관습에 갇혀 있던 여성에게 처음으로 배움의 문을 열었다. 관(官)이 위에서 인재를 기르려 했다면, 이 학교들은 신분과 성별의 벽을 넘어 아래로 교육을 넓혔다. 훗날 독립운동과 사회 변화를 이끌 사람들이, 이 작은 교실에서 길러지기 시작했다.',
    video:null,
    connections:['policy_1886_01'],
    tags:['policy','경성','배재학당','이화학당','근대교육','선교'],
    sources:['서울시 근대 교육의 시작','한국민족문화대백과사전 이화학당'] },

  { id:'policy_1886_03', year:1886, visible_from:1886, visible_until:1894,
    month:1, day:6, type:'policy', priority:2,
    title_ko:'노비세습제 폐지 — 신분의 벽에 낸 첫 틈',
    title_en:'Abolition of Hereditary Slave Status',
    title_ja:'奴婢世襲制の廃止',
    place_ko:'한성',
    lat:37.575, lng:126.977,
    people:['고종'],
    summary_ko:'1886년 2월 고종은 사가노비절목(私家奴婢節目)을 공포해 노비의 신분이 자손에게 세습되는 것을 금지했다. 이미 노비 신분인 부모는 그대로 노비로 남았지만, 그 자녀는 태어나면서부터 양인이 될 수 있었다. 1801년 공노비 해방에 이어 신분제의 벽에 낸 또 하나의 틈이었다. 그러나 사노비 제도 자체는 여전히 존속했고, 완전한 노비제 폐지는 8년 뒤 갑오개혁(1894)에서야 이뤄진다. 위로부터의 점진적 개혁이 가진 한계와, 그럼에도 조금씩 허물어져 가던 낡은 신분질서를 함께 보여주는 사건이다.',
    video:null,
    connections:['policy_1894_01'],
    tags:['policy','경성','노비세습제','신분제','고종','사가노비절목'],
    sources:['한국민족문화대백과사전 노비','나무위키 노비','충청투데이 노비세습제 폐지'] }

];
