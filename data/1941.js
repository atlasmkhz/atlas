// data/1941.js — 1941도 사건 데이타 (4개)
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1941.js"></script> 로 불리웴니다.

const EVENTS_1941 = [

  { id:'policy_1941_01', year:1941, visible_from:1941, visible_until:1941,
    month:11, day:7, type:'policy', priority:1,
    title_ko:'진주만 공격 — 태평양전쟁 발발',
    title_en:'Attack on Pearl Harbor — Outbreak of the Pacific War',
    title_ja:'真珠湾攻撃 — 太平洋戦争勃発',
    place_ko:'진주만 (하와이)',
    lat:21.35, lng:-157.95,
    people:[],
    summary_ko:'1941년 12월 7일 일본이 선전포고 없이 미국 태평양 함대 기지 진주만을 기습 공격했다. 8대의 전함이 파괴되고 2,400여 명의 미국인이 숨졌다. 다음날 미국·영국 등이 일본에 전쟁을 선포하며 태평양전쟁이 시작됐다. 1931년 만주사변, 1937년 중일전쟁으로 이어진 일본의 침략이 이제 세계대전의 한 축으로 번진 것이다. 멀리 하와이에서 터진 이 전쟁은, 사흘 뒤 임시정부의 대일선전포고로 이어진다.',
    video:null,
    connections:['plot_1937_01'],
    tags:['policy','국제','진주만','태평양전쟁'],
    sources:['위키백과 태평양 전쟁'] },

  { id:'political_1941_01', year:1941, visible_from:1941, visible_until:1941,
    month:11, day:10, type:'political', priority:1,
    title_ko:'임시정부 대일선전포고',
    title_en:'Provisional Government Declares War on Japan',
    title_ja:'臨時政府対日宣戦布告',
    place_ko:'충칭',
    lat:29.56, lng:106.55,
    people:['김구'],
    summary_ko:'진주만 공격 사흘 뒤인 1941년 12월 10일, 대한민국 임시정부는 일본에 정식으로 선전포고를 발표했다. 1919년 수립 이래 22년 만에, 임시정부가 국제법적 주체로서 일본과의 전쟁 상태를 공식 선언한 것이다. 연합국의 일원으로 동참하겠다는 이 선언은 외교적 실효성은 제한적이었지만, 단순한 망명정부가 아니라 독립을 위해 싸우는 교전단체임을 세계에 알리는 상징적 의미가 컸다. 한국광복군의 활동에도 국제적 정당성을 더했다.',
    video:null,
    connections:['policy_1941_01','battle_1940_01'],
    tags:['political','중국','임정','선전포고'],
    sources:['한국민족문화대백과사전 한국광복군'],
    content:{ hero:{"url": "assets/images/entity/event/event_political_1941_01_01.webp", "alt": "임시정부 대일선전포고", "caption": "", "credit": "AI 생성 이미지", "is_ai": true, "source_type": "generated", "image_type": "event"}, gallery:[] } },

  { id:'battle_1941_01', year:1941, visible_from:1941, visible_until:1942,
    month:6, day:7, type:'organization', priority:2,
    title_ko:'조선의용대 화북지대 결성',
    title_en:'Formation of the Korean Volunteer Corps North China Detachment',
    title_ja:'朝鮮義勇隊華北支隊結成',
    place_ko:'타이항산 (산시성)',
    lat:36.8, lng:113.5,
    people:['박효삼','윤세주'],
    summary_ko:'국민당 지구에서 활동하던 조선의용대 주력 대원의 80%가 1941년 봄 비밀리에 황하를 건너 중국공산당 팔로군의 근거지 타이항산으로 이동했다. 국민당 통치구의 반공 분위기에 거리를 둔 사회주의 성향 대원들이었다. 이들은 이미 그곳에 있던 화북조선청년연합회와 합쳐 1941년 7월 7일 조선의용대 화북지대를 결성했다. 충칭의 김원봉 본부와는 별개로, 화북의 의용대는 이제 중국공산당과 함께 싸우는 길로 들어섰다. 이 분리가 훗날 조선의용군과 연안파의 뿌리가 된다.',
    video:'NHwoPJJwEXQ',
    connections:['battle_1938_01','political_1937_02'],
    tags:['organization','중국','조선의용대','화북지대'],
    sources:['우리역사넷 조선 의용군','한국민족문화대백과사전 조선의용대 화북지대'] },

  { id:'battle_1941_02', year:1941, visible_from:1941, visible_until:1941,
    month:11, day:12, type:'battle', priority:2,
    title_ko:'호가장 전투',
    title_en:'Battle of Hujiazhuang',
    title_ja:'胡家荘戦闘',
    place_ko:'허베이성 호가장',
    lat:37.0, lng:114.2,
    people:['윤세주'],
    summary_ko:'1941년 12월 12일 하북성 호가장에서 주민들을 상대로 선전활동을 벌이던 조선의용대 화북지대 제2대가 일본군의 기습을 받았다. 격전 속에서 적지 않은 희생이 났지만 대원들은 끝까지 싸워 포위를 뚫었다. 화북의 산악지대에서 무장 선전과 실제 전투를 병행하던 의용대의 위험한 일상을 보여준 전투로, 이듬해 타이항산 반소탕전의 더 큰 희생을 예고하는 전초전이었다.',
    video:null,
    connections:['battle_1941_01'],
    tags:['battle','중국','호가장','조선의용대'],
    sources:['한국민족문화대백과사전 조선의용대 화북지대'] }

];
