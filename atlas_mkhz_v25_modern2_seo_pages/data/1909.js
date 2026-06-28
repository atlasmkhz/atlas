// data/1909.js — 1909년 사건 데이터
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1909.js"></script> 로 불립니다.

const EVENTS_1909 = [

  { id:'organization_1909_01', year:1909, visible_from:1909, visible_until:1909,
    month:1, day:26, type:'organization', priority:1,
    title_ko:'동의단지회 — 안중근의 단지동맹',
    title_en:'The Dongui Danji Society (Finger-Cutting Oath)',
    title_ja:'断指同盟',
    place_ko:'연해주 연추 (크라스키노)',
    lat:42.43, lng:130.80,
    people:['안중근','최재형'],
    summary_ko:'1909년 2월 26일, 안중근을 포함한 12명의 의병 동지가 연해주 연추(크라스키노) 인근 카리(下里) 마을에 모여 비밀결사 동의단지회를 결성했다. 이들은 왼손 약지 첫 마디를 잘라, 그 피로 태극기에 "대한독립(大韓獨立)" 네 글자를 쓰고 조국 독립과 이토 히로부미 처단을 맹세했다 — 단지(斷指)동맹이다. 이 결사가 자리 잡은 연추는 최재형이 일군 한인사회의 중심지였고, 최재형은 안중근에게 활동의 근거지와 자금·무기를 후원한 든든한 배후였다. 안중근은 단지동맹 후 연추 일대에서 교육과 강연으로 의병 재기의 때를 기다렸다. 그 결의가 여덟 달 뒤 하얼빈에서 총성으로 터진다 — 즉흥적 거사가 아니라, 피로 맹세한 조직적 결단의 결과였다.',
    video:null,
    connections:['person_1914_04','righteous_1909_01'],
    tags:['organization','러시아','안중근','단지동맹','동의단지회','최재형','연추'],
    sources:['나무위키 안중근 의사 하얼빈 의거','독립잇다 안중근','우리역사넷'],
    content:{ hero:{"url": "assets/images/entity/event/event_organization_1909_01_01.webp", "alt": "동의단지회 — 안중근의 단지동맹", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "event"}, gallery:[] } },

  { id:'righteous_1909_01', year:1909, visible_from:1909, visible_until:1909,
    month:9, day:26, type:'righteous', priority:1,
    title_ko:'안중근 하얼빈 의거 — 이토 히로부미 처단',
    title_en:'An Jung-geun\u2019s Harbin Operation',
    title_ja:'安重根のハルビン義挙',
    place_ko:'하얼빈역',
    lat:45.77, lng:126.63,
    people:['안중근','이토 히로부미','우덕순'],
    summary_ko:'1909년 10월, 러시아 교민신문 대동공보는 초대 통감을 지낸 이토 히로부미가 러시아 재무대신과 회담하러 하얼빈에 온다는 소식을 전했다. 안중근은 "여러 해 소원하던 목적을 이제야 이루게 되었다"며 동지 우덕순과 함께 블라디보스토크를 떠나 하얼빈으로 향했다. 10월 26일 오전 9시 30분, 하얼빈역에서 러시아 의장대를 사열하던 이토를 향해 안중근이 권총 세 발을 명중시켰고, 이토는 그 자리에서 절명했다. 안중근은 러시아어로 "코레아 우라(대한 만세)"를 세 번 외친 뒤 체포됐다. 그는 자신을 살인범이 아닌 대한의군 참모중장으로서 적장을 처단한 전쟁 포로로 규정하며, 이토의 죄상 15개조를 당당히 밝혔다. 을사늑약과 고종 강제퇴위의 원흉을 응징한 이 의거는 식민 침탈에 신음하던 한국인에게 거대한 자긍심을 안겼고, 이듬해 그의 순국으로 이어진다.',
    video:null,
    connections:['organization_1909_01','policy_1905_01','person_1910_04'],
    tags:['righteous','중국','안중근','하얼빈의거','이토히로부미','의열투쟁'],
    sources:['나무위키 안중근 의사 하얼빈 의거','우리역사넷 이토 히로부미 사살','독립잇다 안중근'],
    content:{ hero:{"url": "assets/images/entity/event/event_righteous_1909_01_01.webp", "alt": "안중근 하얼빈 의거 — 이토 히로부미 처단", "caption": "", "credit": "AI 생성 이미지", "is_ai": true, "source_type": "generated", "image_type": "event"}, gallery:[{"url": "assets/images/entity/person/person_ito_hirobumi_01.webp", "alt": "이토 히로부미", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "portrait"}] } },

  { id:'policy_1909_01', year:1909, visible_from:1909, visible_until:1910,
    month:6, day:null, type:'policy', priority:2,
    title_ko:'기유각서 — 사법권마저 빼앗기다',
    title_en:'The Memorandum of 1909 (Loss of Judicial Power)',
    title_ja:'己酉覚書',
    place_ko:'한성',
    lat:37.566, lng:126.978,
    people:[],
    summary_ko:'1909년 7월 일본은 기유각서를 강제해 대한제국의 사법권과 감옥 사무를 통감부로 넘겼다. 이미 외교권(을사늑약)과 내정·행정권(정미7조약)을 빼앗긴 데 이어, 재판하고 처벌하는 권한마저 일본 손에 들어간 것이다. 한국인은 이제 자국의 법정이 아니라 일본이 장악한 법으로 재판받게 됐다 — 안중근이 하얼빈 의거 후 일본 법정에서 재판받고 처형된 것도 이 구조 때문이었다. 외교·내정·군대·사법이 차례로 무너진 대한제국에 남은 것은 형식뿐인 국호와 황실이었다. 경술국치까지 단 한 단계만을 남겨둔, 국권 침탈의 마지막 수순이었다.',
    video:null,
    connections:['policy_1907_01','person_1910_04'],
    tags:['policy','조선국내','경성','기유각서','사법권','통감부'],
    sources:['위키백과 대한제국','한국민족문화대백과사전'] }

];
