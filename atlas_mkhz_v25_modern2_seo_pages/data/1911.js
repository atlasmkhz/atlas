// data/1911.js — 1911년 사건 데이터
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1911.js"></script> 로 불립니다.

const EVENTS_1911 = [

  { id:'plot_1911_01', year:1911, visible_from:1911, visible_until:1911,
    month:8, day:null, type:'plot', priority:1,
    title_ko:'105인 사건 — 신민회 와해',
    title_en:'The 105-Man Incident',
    title_ja:'105人事件 — 新民会の壊滅',
    place_ko:'평안도 (선천·평양 일대)',
    lat:39.05, lng:125.75,
    people:['윤치호','양기탁','안명근','이승훈'],
    summary_ko:'1910년 데라우치 총독 암살 미수 사건이 있었다는 구실로, 일제는 1911년 평안도 일대 기독교 계열 민족운동가들을 대대적으로 검거했다. 안명근이 황해도 일대에서 군자금을 모집하다 적발된 안악 사건에서 시작된 이 조작 사건은 600여 명을 체포해 122명을 기소하고, 그중 105명에게 징역 5~10년의 실형을 선고하면서 "105인 사건"으로 불렸다. 윤치호·양기탁·이승훈·이동휘 등 비밀결사 신민회의 핵심 간부들이 대거 투옥되면서 신민회는 사실상 와해됐다. 일제가 사소한 독립운동 가능성에도 날조와 고문을 서슴지 않는 폭압적 무단통치의 본질을 드러낸 사건이었다. 한일병합으로 식민지배를 시작한 일제가 곧장 펼친 이 탄압은, 이후 민족운동이 비밀결사에서 국외 기지 건설로 재편되는 계기가 됐다.',
    video:null,
    connections:['policy_1910_01','organization_1911_01','movement_1919_02'],
    tags:['plot','조선국내','평안도','105인사건','신민회','무단통치'],
    sources:['한국민족문화대백과사전 105인사건','위키백과 일제강점기'] },

  { id:'policy_1911_01', year:1911, visible_from:1911, visible_until:1922,
    month:7, day:23, type:'policy', priority:1,
    impact_type:'cultural', violence_level:1, victim_group:['students','civilians'],
    title_ko:'제1차 조선교육령 공포 — 차별 학제의 시작',
    title_en:'The First Joseon Education Ordinance',
    title_ja:'第一次朝鮮教育令の公布',
    place_ko:'조선총독부 (경성)',
    lat:37.575, lng:126.977,
    people:['데라우치 마사타케'],
    summary_ko:'1911년 8월 23일 칙령 제229호로 공포된 제1차 조선교육령은 "교육에 관한 칙어의 취지에 기초해 충량한 국민을 육성한다"는 것을 목적으로 내세웠다. 조선인 학생이 다니는 보통학교는 4년제(지역 형편에 따라 3년으로 단축 가능)였던 반면, 일본인 학생의 소학교는 6년제였다 — 같은 나이에 입학해도 교육 연한 자체가 달랐다. 일본어는 "국어"로 불리며 주당 수업시간의 약 38%를 차지했고, 한국어는 "조선어"라는 외국어 취급을 받으며 비중이 줄었다. 중등교육기관인 고등보통학교는 일부러 증설을 억제해, 1915년 기준 한국인 취학연령 아동의 취학률은 1.7%에 불과했다(일본인 거주자 아동은 100%). 사립학교 설립도 총독의 인가를 받아야 했는데, 기독교계 학교 신청 778건은 거의 그대로 인가됐지만 한국인이 세운 사립학교는 1,217건 중 42건만 인가됐다. 1922년 제2차 교육령으로 일부 개정되지만, 식민지 교육의 차별적 골격은 해방까지 이어진다.',
    video:null,
    connections:['policy_1910_04','person_1910_02'],
    tags:['policy','조선국내','경성','조선교육령','교육차별','일본어','문화통제'],
    sources:['한국민족문화대백과사전 조선교육령','우리역사넷 제1차 조선교육령'] },
  { id:'organization_1911_01', year:1911, visible_from:1911, visible_until:1919,
    month:5, day:null, type:'organization', priority:1,
    title_ko:'신흥강습소 설립 — 서간도 독립군 기지',
    title_en:'Founding of the Sinheung Military School',
    title_ja:'新興講習所の設立',
    place_ko:'서간도 류허현 삼원보',
    lat:42.13, lng:125.74,
    people:['이회영','이상룡'],
    summary_ko:'105인 사건으로 국내 활동이 막히자, 이회영·이상룡 등 신민회 인사들은 서간도로 망명해 독립운동 기지를 건설했다. 1911년 봄 류허현 삼원보에 자치기관 경학사를 세우고, 6월에는 독립군 간부를 양성할 신흥강습소를 열었다. 이회영 일가는 막대한 재산을 처분해 이 사업에 바쳤다. 신흥강습소는 훗날 신흥무관학교로 발전해 청산리·봉오동 전투의 주역을 비롯한 수많은 독립군 지휘관을 길러내는, 무장독립운동의 못자리가 됐다.',
    video:'NHwoPJJwEXQ',
    connections:['plot_1911_01'],
    tags:['organization','만주·간도','신흥강습소','경학사','이회영','독립군기지'],
    sources:['한국사 토지조사사업 신흥강습소','한국민족문화대백과사전'],
    content:{ hero:{"url": "assets/images/entity/event/event_organization_1911_01_01.webp", "alt": "신흥강습소 설립 — 서간도 독립군 기지", "caption": "", "credit": "AI 생성 이미지", "is_ai": true, "source_type": "generated", "image_type": "event"}, gallery:[] } }

];
