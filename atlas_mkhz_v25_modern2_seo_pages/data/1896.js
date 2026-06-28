// data/1896.js — 1896년 사건 데이터
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1896.js"></script> 로 불립니다.

const EVENTS_1896 = [

  { id:'political_1896_01', year:1896, visible_from:1896, visible_until:1897,
    month:1, day:11, type:'political', priority:1,
    title_ko:'아관파천 — 러시아 공사관으로',
    title_en:'The Royal Refuge at the Russian Legation',
    title_ja:'露館播遷',
    place_ko:'한성 (정동 러시아공사관)',
    lat:37.566, lng:126.972,
    people:['고종','이범진'],
    summary_ko:'을미사변 이후 신변에 위협을 느낀 고종은 1896년 2월 11일 비밀리에 경복궁을 빠져나와 러시아공사관으로 거처를 옮겼다. 이범진 등 친러파와 러시아공사 베베르가 이를 도왔다. 임금이 외국 공사관으로 피신하자 친일 내각은 무너지고, 거리에서는 김홍집 등 개화파 대신들이 군중에게 피살됐다. 일본의 영향력은 일단 꺾였지만, 그 대가로 임금이 외국 공사관에 1년간 머무는 초유의 상황이 시작됐다. 가장 위태로운 방식으로 균형을 되찾은 셈이었다.',
    video:null,
    connections:['plot_1895_01','political_1896_02','organization_1896_01'],
    tags:['political','경성','아관파천','고종','이범진','러시아'],
    sources:['한국민족문화대백과사전 아관파천','위키백과 아관파천'] },

  { id:'political_1896_02', year:1896, visible_from:1896, visible_until:1898,
    month:0, day:null, type:'policy', priority:2,
    title_ko:'열강의 이권 침탈',
    title_en:'The Scramble for Concessions',
    title_ja:'列強の利権侵奪',
    place_ko:'전국',
    lat:38.3, lng:127.5,
    people:[],
    summary_ko:'고종이 러시아공사관에 머무는 동안, 열강은 신변 보장을 약속하며 앞다투어 이권을 가져갔다. 러시아·미국·일본·독일·프랑스·영국이 광산·철도·삼림·전선·어장의 권리를 차지했고, 한 나라가 이권을 얻으면 다른 나라가 최혜국 조항을 내세워 같은 것을 요구했다. 임금의 피신이 가져온 일시적 안정의 이면에서, 나라의 자원이 조각조각 외세의 손에 넘어가고 있었다. 이 고삐 풀린 침탈이 곧 자주독립을 외치는 새로운 운동을 불러온다.',
    video:null,
    connections:['political_1896_01','organization_1896_01'],
    tags:['policy','이권침탈','열강','광산','철도'],
    sources:['우리역사넷 열강의 이권침탈과 독립협회','한국민족문화대백과사전 아관파천'] },

  { id:'political_1896_03', year:1896, visible_from:1896, visible_until:1899,
    month:3, day:7, type:'political', priority:2,
    title_ko:'독립신문 창간',
    title_en:'Founding of The Independent (Tongnip Sinmun)',
    title_ja:'独立新聞の創刊',
    place_ko:'한성',
    lat:37.567, lng:126.983,
    people:['서재필'],
    summary_ko:'1896년 4월 서재필과 개화파가 한글 전용 신문인 독립신문을 창간했다. 누구나 읽을 수 있는 한글로 국정을 알리고 자주독립과 민권을 외친 이 신문은, 백성을 계몽의 대상이 아니라 나라의 주체로 호명했다. 관리는 백성의 종이라는 그 논조는 당시로선 낯설고 급진적인 것이었다. 임금이 외국 공사관에 머무는 가장 약해진 시기에, 가장 새로운 목소리가 활자를 타고 퍼져 나갔다.',
    video:null,
    connections:['organization_1896_01'],
    tags:['political','경성','독립신문','서재필','언론','계몽'],
    sources:['우리역사넷 열강의 이권침탈과 독립협회','위키백과 독립신문'] },

  { id:'organization_1896_01', year:1896, visible_from:1896, visible_until:1898,
    month:6, day:2, type:'organization', priority:1,
    title_ko:'독립협회 창립',
    title_en:'Founding of the Independence Club',
    title_ja:'独立協会の創立',
    place_ko:'한성',
    lat:37.567, lng:126.959,
    people:['서재필','윤치호'],
    summary_ko:'독립신문 창간에 이어 1896년 7월 서재필과 개화파가 독립협회를 세웠다. 첫 사업은 청 사신을 맞던 모화관과 영은문 자리에 독립문을 세우는 일이었다 — 더 이상 어느 나라의 제후국도 아니라는 선언이었다. 각계각층이 보조금을 내며 호응했고, 독립협회는 이권 침탈에 맞서 자주독립과 내정 개혁을 요구하는 구심점으로 성장했다. 아관파천이라는 가장 낮은 자리에서, 백성이 스스로 나라의 권익을 지키려는 움직임이 조직으로 결실을 맺었다. 윤치호 등이 합류하며 독립협회는 자주독립과 민권 신장을 함께 내세우는 공론장으로 자리를 넓혀갔다.',
    video:null,
    connections:['political_1896_01','political_1896_03','political_1898_01'],
    tags:['organization','경성','독립협회','서재필','독립문','자주독립'],
    sources:['우리역사넷 열강의 이권침탈과 독립협회','위키백과 독립협회'],
    content:{ hero:{"url": "assets/images/entity/person/person_seo_jae_pil_01.webp", "alt": "서재필", "caption": "", "credit": "AI 생성 이미지", "is_ai": true, "source_type": "generated", "image_type": "portrait"}, gallery:[] } }

];
