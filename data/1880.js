// data/1880.js — 1880년 사건 데이터
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1880.js"></script> 로 불립니다.

const EVENTS_1880 = [

  { id:'policy_1880_01', year:1880, visible_from:1880, visible_until:1882,
    month:7, day:null, type:'policy', priority:1,
    title_ko:'조선책략과 영남만인소 — 갈라진 길',
    title_en:'The Korea Strategy and the Yeongnam Petition',
    title_ja:'朝鮮策略と嶺南万人疏',
    place_ko:'한성 / 영남',
    lat:36.2, lng:128.3,
    people:['김홍집'],
    summary_ko:'1880년 제2차 수신사 김홍집이 일본에서 청 외교관 황준헌의 『조선책략』을 들여왔다. "러시아를 막으려면 중국과 친하고, 일본과 맺고, 미국과 이어야 한다"는 이 책은 고종과 개화파가 서양과의 수교를 추진하는 명분이 되었다. 그러나 그 내용이 알려지자 보수 유생들이 격렬히 반발했고, 1881년 이만손을 비롯한 영남 유생 1만여 명이 연명한 영남만인소가 올라왔다. 개화로 가려는 조정과 척사를 외치는 유림이 정면으로 부딪힌 것이다. 나라가 어느 길로 갈 것인가를 두고, 사회 전체가 둘로 갈라지기 시작했다.',
    video:null,
    connections:['political_1876_01','organization_1881_01'],
    tags:['policy','경성','조선책략','영남만인소','위정척사','개화'],
    sources:['우리역사넷 조선책략','규장각 조선책략'],
    content:{ hero:{"url": "assets/images/entity/event/event_policy_1880_01_01.webp", "alt": "조선책략과 영남만인소 — 갈라진 길", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "event"}, gallery:[] } },

  { id:'institution_1880_01', year:1880, visible_from:1880, visible_until:1882,
    month:null, day:null, type:'organization', priority:1,
    title_ko:'통리기무아문 설치',
    title_en:'Establishment of the Tongni Gimu Amun',
    title_ja:'統理機務衙門の設置',
    place_ko:'한성',
    lat:37.571, lng:126.978,
    people:['고종','김홍집'],
    summary_ko:'강화도조약으로 문을 연 조선은 1880년 근대적 행정 개혁의 첫걸음으로 통리기무아문을 설치했다. 청의 총리아문을 본떠 만든 이 기구는 외교·통상·군사 등 개화정책 전반을 총괄하는 새로운 중앙 행정 조직이었다. 일본에 다녀온 수신사와 이듬해 파견될 조사시찰단이 보고 배운 근대 문물과 제도가 이 개혁의 바탕이 되었다. 통리기무아문은 산하에 12사를 두어 업무를 나누었으며, 신식 군대인 별기군 창설의 행정적 기반이 된 것도 이 기구였다. 낡은 행정 체제를 근대적으로 재편하려는 시도가, 비로소 제도의 형태로 나타나기 시작했다.',
    video:null,
    connections:['political_1876_01','organization_1881_01','political_1882_01'],
    tags:['organization','경성','통리기무아문','개화정책','행정개혁'],
    sources:['한국민족문화대백과사전 통리기무아문','우리역사넷 개화정책'],
    content:{ hero:{"url": "assets/images/entity/person/person_kim_hong_jip_01.webp", "alt": "김홍집", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "portrait"}, gallery:[] } },

  { id:'political_1880_02', year:1880, visible_from:1880, visible_until:1894,
    month:null, day:null, type:'political', priority:2,
    title_ko:'매관매직의 만연 — 돈으로 사는 관직',
    title_en:'The Spread of Office-Selling',
    title_ja:'売官売職の蔓延',
    place_ko:'한성 / 전국 지방',
    lat:36.5, lng:127.8,
    people:['명성황후'],
    summary_ko:'민씨 척족이 권력을 장악한 뒤, 한성에서는 관직이 공개적으로 거래되었다. 지방관 자리는 수백 냥에서 수천 냥에 팔렸고, 그 돈을 마련하려 빚을 진 자가 부임하면 본전을 뽑기 위해 백성을 더 가혹하게 수탈하는 악순환이 이어졌다. 매관매직으로 자리를 산 수령들에게 고을은 다스릴 대상이 아니라 회수할 투자가 되었다. 통리기무아문이 근대적 행정 개혁을 추진하는 동안에도, 그 개혁이 실제로 작동해야 할 지방 행정의 기반은 이렇게 안에서부터 썩어가고 있었다. 이 시기 켜켜이 쌓인 수탈의 무게는, 14년 뒤 동학농민운동이라는 거대한 폭발로 이어진다.',
    video:null,
    connections:['institution_1880_01','political_1882_03','movement_1894_01'],
    tags:['political','경성','매관매직','민씨척족','부정부패','세도정치'],
    sources:['한국민족문화대백과사전 매관매직','우리역사넷 동학농민운동의 배경'] }

];
