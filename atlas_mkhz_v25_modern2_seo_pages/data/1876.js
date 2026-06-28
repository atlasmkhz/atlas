// data/1876.js — 1876년 사건 데이터
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1876.js"></script> 로 불립니다.

const EVENTS_1876 = [

  { id:'political_1876_02', year:1876, visible_from:1876, visible_until:1882,
    month:null, day:null, type:'political', priority:2,
    title_ko:'흥선대원군의 하야와 민씨 척족의 부상',
    title_en:'The Fall of the Heungseon Daewongun and the Rise of the Min Clan',
    title_ja:'興宣大院君の失脚と閔氏一族の浮上',
    place_ko:'한성 (운현궁)',
    lat:37.575, lng:126.987,
    people:['흥선대원군','고종','명성황후'],
    summary_ko:'1863년 어린 고종을 대신해 섭정에 오른 흥선대원군은 10년 동안 강력한 쇄국 정책과 경복궁 중건을 밀어붙였다. 그러나 원납전 강제 징수와 당백전 발행으로 민심이 흉흉해지자, 1873년 유생 최익현이 대원군의 실정을 정면으로 비판하는 상소를 올렸다. 성년이 된 고종은 이를 계기로 친정을 선포했고, 대원군은 운현궁으로 물러났다. 권력의 빈자리는 곧 고종의 왕비인 명성황후의 친정, 민씨 일족이 채웠다. 민승호를 비롯한 민씨 척족이 빠르게 요직을 장악하면서, 조선의 권력 구도는 "대원군의 쇄국"에서 "민씨의 척족 정치"로 넘어갔다. 강화도조약으로 나라의 문이 열리기 직전, 궁궐 안에서는 이미 다른 종류의 문이 열리고 있었다.',
    video:null,
    connections:['political_1876_01','political_1882_01'],
    tags:['political','경성','흥선대원군','명성황후','민씨척족','친정','세도정치'],
    sources:['한국민족문화대백과사전 흥선대원군','위키백과 흥선대원군'],
    content:{ hero:{"url": "assets/images/entity/person/person_heungseon_daewongun_01.webp", "alt": "흥선대원군", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "portrait"}, gallery:[] } },

  { id:'political_1876_01', year:1876, visible_from:1876, visible_until:1882,
    month:1, day:27, type:'political', priority:1,
    title_ko:'강화도조약 — 닫힌 문이 열리다',
    title_en:'The Treaty of Ganghwa: The Door Opens',
    title_ja:'江華島条約',
    place_ko:'강화도',
    lat:37.747, lng:126.488,
    people:[],
    summary_ko:'1875년 운요호 사건을 빌미로 일본이 무력을 앞세워 조약을 강요했고, 1876년 2월 조선은 조일수호조규(강화도조약)를 맺었다. 조선이 자주국임을 명시했지만, 부산에 이어 원산·인천을 차례로 개항하고 일본에 해안 측량권과 영사재판권을 내준 불평등 조약이었다. 관세 조항조차 없어 무관세 무역이 강요됐다. 수백 년 닫혀 있던 문이 바깥의 힘에 의해 열린 이 조약은, 조선이 근대 국제질서로 끌려 들어가는 출발점이자, 이후 모든 격동의 첫 단추였다.',
    video:null,
    connections:['policy_1880_01','political_1882_01','political_1876_02'],
    tags:['political','강화도','강화도조약','개항','조일수호조규','문호개방'],
    sources:['위키백과 강화도 조약','우리역사넷 임오군란'],
    content:{ hero:{"url": "assets/images/entity/event/event_political_1876_01_01.webp", "alt": "강화도조약 — 닫힌 문이 열리다", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "event"}, gallery:[] } }

];
