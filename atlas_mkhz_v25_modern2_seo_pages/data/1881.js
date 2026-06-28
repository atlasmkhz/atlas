// data/1881.js — 1881년 사건 데이터
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1881.js"></script> 로 불립니다.

const EVENTS_1881 = [

  { id:'organization_1881_01', year:1881, visible_from:1881, visible_until:1882,
    month:4, day:null, type:'organization', priority:1,
    title_ko:'별기군 창설 — 신식 군대의 등장',
    title_en:'Creation of the Byeolgigun Special Force',
    title_ja:'別技軍の創設',
    place_ko:'한성',
    lat:37.571, lng:126.978,
    people:[],
    summary_ko:'강화도조약 이후 조선은 통리기무아문을 두고 개화정책을 본격화했다. 1881년에는 일본인 교관에게 근대식 훈련을 받는 신식 군대 별기군을 창설하고, 일본에 조사시찰단을, 청에 영선사를 보내 근대 문물과 무기 제조법을 배워오게 했다. 그러나 양반 자제로 꾸려진 별기군이 후한 대우를 받는 사이, 오랜 구식 군인들은 급료조차 제대로 받지 못한 채 홀대당했다. 자강을 위한 군 근대화가, 동시에 구식 군인들의 깊은 불만을 쌓아갔다. 이 차별이 이듬해 임오군란의 불씨가 된다.',
    video:null,
    connections:['policy_1880_01','political_1882_01','institution_1880_01'],
    tags:['organization','경성','별기군','통리기무아문','개화정책','군대'],
    sources:['우리역사넷 임오군란','한국민족문화대백과사전 개화정책'] },

  { id:'international_1881_01', year:1881, visible_from:1881, visible_until:1882,
    month:null, day:null, type:'international', priority:1,
    title_ko:'조사시찰단 파견',
    title_en:'Dispatch of the Gentlemen\'s Observation Mission',
    title_ja:'朝士視察団の派遣',
    place_ko:'한성 / 일본',
    lat:37.571, lng:126.978,
    people:['홍영식','어윤중','박정양'],
    summary_ko:'1880년 통리기무아문을 세워 개화정책을 추진하던 조선은 1881년 일본의 발전상을 직접 확인하기 위해 조사시찰단을 보냈다. 홍영식·어윤중·박정양 등 젊은 관료들은 위정척사의 거센 반발을 피해 암행어사의 형식으로 비밀리에 출발했다. 이들은 약 넉 달간 일본에 머물며 정부 각 부처의 행정 제도와 근대 기술, 산업 시설을 두루 조사하고 방대한 보고서를 작성해 올렸다. 앞서 일본에 다녀온 수신사가 외교 사절의 성격이 강했다면, 조사시찰단은 근대 문물과 제도를 체계적으로 배워오는 데 목적이 있었다. 이들이 가져온 견문은 이후 조선 개화정책의 중요한 밑거름이 되었다.',
    video:null,
    connections:['institution_1880_01'],
    tags:['international','경성','조사시찰단','개화정책','일본'],
    sources:['한국민족문화대백과사전 조사시찰단','우리역사넷 개화정책'],
    content:{ hero:{"url": "assets/images/entity/person/person_hong_yeong_sik_01.webp", "alt": "홍영식", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "portrait"}, gallery:[] } }

];
