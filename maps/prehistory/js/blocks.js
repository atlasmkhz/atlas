// ═══════════════════════════════════════════════════════
// blocks.js — 선사시대 블록 (신화시대 ~ 고조선 성립)
// 고대(ancient) 지도의 blocks.js와 같은 역할이지만, 여기는 왕조·정치체
// 기준으로 나눌 수조차 없는 시기다 — 구석기시대(수십만 년)와 고조선
// 성립기(수백 년)를 같은 "재위기간 비례폭" 방식으로 다루면 스케일이
// 완전히 깨진다(구석기 블록이 화면을 다 차지하고 나머지는 점처럼
// 사라진다). 그래서 이 지도만큼은 블록 폭을 시간 비례가 아니라
// 동일 폭(내용 단위)으로 간다 — timeline.js의 PX_PER_YEAR를 0으로
// 두고 MIN_CHAPTER_WIDTH만 쓰는 방식.
//
// year_label: 실제 "시작~끝" 연도로 표시하면 이상한 블록(신화시대는
// 애초에 calendar year가 없다)을 위한 표시용 문자열 오버라이드.
// 지정하면 챕터 버튼·상단 라벨 모두 이 문자열을 그대로 쓴다.
const BLOCKS = [
  { order:1, name:'신화시대', start_year:-1000000, end_year:-700000,
    year_label:'아득한 옛날',
    desc_hint:'단군신화(삼국유사·제왕운기) — 실제 연표에 묶이지 않는 건국 서사' },
  { order:2, name:'구석기시대', start_year:-700000, end_year:-8000,
    desc_hint:'약 70만 년 전부터 기원전 8000년경까지 — 뗀석기와 이동 생활' },
  { order:3, name:'신석기시대', start_year:-8000, end_year:-1500,
    desc_hint:'기원전 8000~1500년경 — 빗살무늬토기, 정착 생활, 홍산문화·요하문명' },
  { order:4, name:'청동기시대', start_year:-1500, end_year:-400,
    desc_hint:'기원전 1500~400년경 — 고인돌, 비파형동검, 계급 사회의 등장' },
  { order:5, name:'초기 부족사회', start_year:-400, end_year:-300,
    desc_hint:'국가·민족 개념 이전, 부여·읍루·숙신·예맥 등이 만주·한반도 북부에 느슨하게 거주' },
  { order:6, name:'고조선의 성립과 발전', start_year:-300, end_year:-37,
    desc_hint:'신화상 건국연대(기원전 2333)와 고고학적 실체 확인 연대(대략 기원전 4세기)를 구분 — 위만조선까지, 기원전 108년 한에 의한 멸망' },
];

const BLOCKS_MIN_YEAR = BLOCKS[0].start_year;
const BLOCKS_MAX_YEAR = BLOCKS[BLOCKS.length - 1].end_year;
const REIGNS_MIN_YEAR = BLOCKS_MIN_YEAR;
const REIGNS_MAX_YEAR = BLOCKS_MAX_YEAR;
