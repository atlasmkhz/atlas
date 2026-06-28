// data/1951.js — 1951년 사건 데이터
// 근현대 (Modern-Contemporary, 1945~1993)
// 이 파일은 index.html에서 <script src="data/1951.js"></script> 로 불립니다.
// 아직 데이터가 채워지지 않은 빈 골격 파일이다 — 연도 레이아웃만 먼저 잡아둔 상태.

const EVENTS_1951 = [

  { id:'battle_1951_01', year:1951, visible_from:1951, visible_until:1951,
    month:0, day:4, type:'battle', priority:1,
    title_ko:'1·4 후퇴 — 서울 재함락',
    title_en:'The January 4th Retreat',
    title_ja:'一・四後退',
    place_ko:'서울',
    lat:37.566, lng:126.978,
    people:[],
    summary_ko:'중공군의 2·3차 공세에 밀린 국군과 유엔군은 1951년 1월 4일 서울을 다시 내주고 평택-삼척선까지 전략적으로 후퇴했다. 시민들도 다시 한번 피란길에 올라야 했다 — 9월 28일 수복의 기쁨이 채 넉 달도 가지 않아 서울은 또 적의 손에 들어갔다. 이후 국군과 유엔군은 1월 25일부터 반격에 나서 서서히 전선을 끌어올렸고, 3월 중순 서울을 재수복했다. 전쟁은 이 시점부터 38선 부근에서 일진일퇴를 거듭하는 장기 소모전 양상으로 굳어가기 시작했다.',
    video:null,
    connections:['battle_1950_04'],
    tags:['battle','서울','1·4후퇴','피란'],
    sources:['국가기록원 6·25전쟁 연표'] },

  { id:'massacre_1951_01', year:1951, visible_from:1951, visible_until:1951,
    month:1, day:9, type:'massacre', priority:1, area:true, areaRadius:15000,
    title_ko:'거창 양민 학살 사건',
    title_en:'Geochang Civilian Massacre',
    title_ja:'居昌良民虐殺事件',
    place_ko:'경남 거창군 신원면',
    lat:35.68, lng:127.79,
    people:[],
    summary_ko:'1951년 2월, 거창 신원면 일대에서 빨치산 토벌 작전을 수행한 국군 제11사단 9연대가 주민 수백 명을 빨치산 협력자로 몰아 집단 사살했다. 희생자 다수는 노인과 어린이를 포함한 일반 민간인이었다. 사건은 국회에서 거론되며 진상조사단이 파견됐지만, 군은 한동안 책임 소재를 흐리는 데 주력했고 관련자 처벌도 가벼운 수준에 머물렀다. 전선이 아닌 후방에서, "토벌"이라는 명분 아래 민간인이 희생된 6·25전쟁의 대표적 비극 가운데 하나로 남았다.',
    video:null,
    connections:['massacre_1950_01','person_1948_05'],
    tags:['massacre','거창','거창양민학살','빨치산토벌'],
    sources:['한국민족문화대백과사전 거창사건'] },

  { id:'plot_1951_01', year:1951, visible_from:1951, visible_until:1951,
    month:0, day:null, type:'plot', priority:2,
    title_ko:'국민방위군 사건',
    title_en:'National Defense Corps Scandal',
    title_ja:'国民防衛軍事件',
    place_ko:'경상남도·경상북도 일대',
    lat:36.0, lng:128.3,
    people:[],
    summary_ko:'1·4후퇴를 앞두고 정부는 만 17~40세 남성 약 50만 명을 국민방위군으로 편성해 후방으로 이동시켰다. 그러나 지휘부 간부들이 보급 예산과 식량을 빼돌려 횡령하면서, 제대로 먹지도 입지도 못한 장정들이 행군 중 굶주림과 동상으로 대거 사망했다 — 정확한 사망자 수는 불확실하나 수만 명에 이른다는 추정이 있다. 1951년 국회 조사로 실태가 드러나 사령관 등 책임자들이 사형을 선고받았다. 전쟁 수행 능력보다 부패가 먼저 신생 군대의 약점을 드러낸 사건이었다.',
    video:null,
    connections:[],
    tags:['plot','경상남도','국민방위군사건','부패'],
    sources:['한국민족문화대백과사전 국민방위군사건'] },

  { id:'political_1951_01', year:1951, visible_from:1951, visible_until:1953,
    month:6, day:10, type:'political', priority:1,
    title_ko:'휴전회담 개시',
    title_en:'Start of the Korean Armistice Negotiations',
    title_ja:'休戦会談開始',
    place_ko:'개성 → 판문점',
    lat:38.0, lng:126.55,
    people:[],
    summary_ko:'전선이 38선 부근에서 교착되자 1951년 7월 10일 개성에서 유엔군과 공산군 측의 휴전회담이 시작됐다(이후 판문점으로 장소를 옮겨 계속된다). 군사적 승패가 아닌 정치적 타협으로 전쟁을 끝내기로 한 결정이었지만, 군사분계선 설정과 포로 송환 방식을 둘러싼 줄다리기가 이어지며 회담은 2년을 더 끌었다. 회담이 진행되는 동안에도 백마고지·단장의 능선 같은 고지 쟁탈전이 계속돼, 협상 테이블 밖에서는 여전히 많은 사상자가 발생했다. 전쟁이 "끝"이 아니라 "휴전"으로 봉인되는 과정이 이때부터 시작됐다.',
    video:null,
    connections:['battle_1951_01'],
    tags:['political','개성','판문점','휴전회담'],
    sources:['한국민족문화대백과사전 휴전회담'] }

];
