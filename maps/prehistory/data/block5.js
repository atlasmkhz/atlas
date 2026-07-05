// data/block5.js — 초기 부족사회 (기원전 400~300년경) 시드 데이터
// 이 시기는 국가·민족 개념 이전이라, 다른 블록처럼 마커+색 고리로
// "이 나라 영토"를 표시하지 않는다. 대신 기존에 있던 area(반경 원)
// 렌더링을 그대로 써서 "이 근방에 이런 집단이 살았다고 알려져 있다"는
// 느슨한 거주권만 흐릿하게 표시한다 — 국경이 아니라 대략적인 위치.
// 서술에도 "~였다"가 아니라 "~로 추정된다/알려져 있다" 같은 헤지
// 표현을 기본으로 쓴다.
const EVENTS_BLOCK5 = [
  { id:'migration_north_01', year:-350, visible_from:-1000, visible_until:200,
    month:null, day:null, type:'migration', priority:2,
    title_ko:'부여 — 만주 송화강 유역의 집단',
    title_en:'Buyeo — A Group in the Songhua River Basin of Manchuria',
    title_ja:'扶余 — 満州松花江流域の集団',
    place_ko:'만주 송화강 유역(농안·장춘 일대로 추정)',
    lat:43.88, lng:125.32,
    area:true, areaRadius:250000,
    people:[],
    summary_ko:'만주 송화강 유역에는 부여라 불린 집단이 거주했다고 전해진다. 이 시기는 아직 뚜렷한 국가 체제 이전으로, 정확한 경계나 통치 구조를 특정하기는 어렵다. 부여는 이후 기원전후 무렵 보다 뚜렷한 정치체로 성장하며, 고구려·백제 왕실이 스스로 부여 계통이라 자처하는 등 이후 삼국 형성에도 영향을 미친 것으로 논의된다.',
    video:null,
    connections:[],
    tags:['migration','만주','부여','북방민족'],
    sources:['한국민족문화대백과사전 부여'] },

  { id:'migration_north_02', year:-350, visible_from:-1000, visible_until:300,
    month:null, day:null, type:'migration', priority:2,
    title_ko:'읍루 — 연해주 숲지대의 수렵 집단',
    title_en:'Yerou — A Hunting Group of the Primorye Forest Region',
    title_ja:'挹婁 — 沿海州森林地帯の狩猟集団',
    place_ko:'연해주 일대(추정)',
    lat:45.0, lng:133.0,
    area:true, areaRadius:300000,
    people:[],
    summary_ko:'연해주 일대 숲지대에는 읍루라 불린 집단이 살았다고 알려져 있다. 활 제작에 능했고 수렵·어로를 주로 했다고 전해지나, 이 시기 기록은 대부분 후대 중국 사서에 단편적으로만 남아 있어 실체를 정확히 재구성하기는 어렵다. 훗날 말갈·여진으로 이어지는 만주 동북부 수렵 문화권의 이른 모습으로 논의되지만, 이를 직계 계승 관계로 단정하기보다는 같은 지역에 연속해서 등장한 집단들로 보는 것이 더 정확하다.',
    video:null,
    connections:[],
    tags:['migration','연해주','읍루','북방민족'],
    sources:['한국민족문화대백과사전 읍루'] },

  { id:'migration_north_03', year:-350, visible_from:-2000, visible_until:0,
    month:null, day:null, type:'migration', priority:2,
    title_ko:'숙신 — 가장 오래된 기록에 등장하는 만주의 집단',
    title_en:'Sushen — A Group Recorded in the Earliest Manchurian Sources',
    title_ja:'肅慎 — 最古の記録に登場する満州の集団',
    place_ko:'만주 동북부(추정)',
    lat:46.0, lng:130.0,
    area:true, areaRadius:300000,
    people:[],
    summary_ko:'중국 고대 문헌에 등장하는 숙신은 만주 동북부에 거주했다고 전해지는, 이 지역에 대한 기록 중 가장 오래된 것으로 꼽힌다. 읍루·말갈과의 관계에 대해서는 "같은 집단이 시대에 따라 다르게 불렸다"는 견해와 "서로 다른 집단"이라는 견해가 함께 있어, 이를 하나의 계보로 단정하기는 어렵다. 국가 이전의 거주 집단이라 정확한 위치나 규모를 특정할 수 없다는 점도 감안해야 한다.',
    video:null,
    connections:[],
    tags:['migration','만주','숙신','북방민족'],
    sources:['한국민족문화대백과사전 숙신'] },

  { id:'migration_north_04', year:-350, visible_from:-1000, visible_until:0,
    month:null, day:null, type:'migration', priority:2,
    title_ko:'예맥 — 한반도 북부의 여러 집단',
    title_en:'Yemaek — Groups of the Northern Korean Peninsula',
    title_ja:'濊貊 — 韓半島北部の諸集団',
    place_ko:'한반도 북부·함경도 일대(추정)',
    lat:40.5, lng:127.5,
    area:true, areaRadius:200000,
    people:[],
    summary_ko:'한반도 북부와 만주 남부에는 예(濊)·맥(貊)으로 불린 집단들이 거주했다고 전해진다. 이들을 하나의 단일한 민족으로 보기보다는, 비슷한 생활양식을 공유하며 인접해 살던 여러 집단을 중국 쪽에서 뭉뚱그려 부른 명칭으로 이해하는 것이 정확하다. 이후 고구려·동예·옥저 등 보다 뚜렷한 정치체로 이어지는 것으로 논의되지만, 이 단계에서는 아직 국가나 민족이라 부를 만한 뚜렷한 경계가 없었다.',
    video:null,
    connections:[],
    tags:['migration','한반도북부','예맥','북방민족'],
    sources:['한국민족문화대백과사전 예맥'] }
];
