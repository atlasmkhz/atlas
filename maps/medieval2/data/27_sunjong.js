// data/27_sunjong.js — 순종 재위(1907~1910) 시드 데이터
// 조선(대한제국) 왕조 계보를 완결하기 위해 마지막 왕인 순종의 챕터를
// 이 지도(중세2)에 추가한다. 이 시기(1876~1910)의 상세 사건은 원래
// 근대 지도(map.html)가 담당하는 영역이므로, 여기서는 순종의 재위를
// 규정하는 핵심 사건 위주로 구성하고 reigns.js의 continues_in으로
// 근대 지도의 전체 서사(data/1907.js~1910.js)로 안내한다.
const EVENTS_SUNJONG = [
  { id:'political_1907_02b', year:1907, visible_from:1907, visible_until:1910,
    month:7, day:20, type:'political', priority:1,
    title_ko:'순종 즉위 — 허수아비 황제',
    title_en:'Enthronement of Emperor Sunjong',
    title_ja:'純宗即位',
    place_ko:'한성 (경운궁 중화전)',
    lat:37.566, lng:126.975,
    people:['순종','고종','이토 히로부미'],
    summary_ko:'헤이그 특사 사건을 빌미로 일본이 부친 고종을 강제 퇴위시키자, 순종이 그 뒤를 이어 대한제국 제2대 황제로 즉위했다. 그러나 즉위 직후 정미7조약으로 통치권 대부분이 통감부로 넘어갔고, 곧이어 군대마저 해산되면서 순종은 처음부터 실권 없는 황제였다. 500년 조선 왕조의 마지막 임금이자, 13년 대한제국의 마지막 황제라는 자리를 그는 스스로 선택하지 못한 채 떠안았다.',
    video:null,
    connections:[],
    tags:['political','한양','순종','고종','즉위'],
    sources:['한국민족문화대백과사전 순종','위키백과 한일신협약'] },

  { id:'policy_1907_01b', year:1907, visible_from:1907, visible_until:1910,
    month:6, day:24, type:'policy', priority:1,
    title_ko:'정미7조약과 군대 해산',
    title_en:'The Japan–Korea Treaty of 1907 and the Disbandment of the Army',
    title_ja:'丁未七条約と軍隊解散',
    place_ko:'한성',
    lat:37.566, lng:126.975,
    people:['순종','이토 히로부미'],
    summary_ko:'정미7조약으로 대한제국의 법령 제정과 관리 임면권까지 통감부가 쥐게 됐고, 뒤이어 군대 해산이 단행됐다. 해산에 반발한 군인들이 무기를 들고 봉기하며 정미의병으로 이어졌다. 순종의 재위는 처음부터 형식만 남은 통치권 위에서 시작됐다.',
    video:null,
    connections:['political_1907_02b'],
    tags:['policy','정미7조약','군대해산','순종'],
    sources:['위키백과 한일신협약','나무위키 정미 7조약'] },

  { id:'political_1910_01b', year:1910, visible_from:1910, visible_until:1910,
    month:8, day:29, type:'political', priority:1,
    title_ko:'한일병합 — 대한제국의 멸망',
    title_en:'The Japan–Korea Annexation Treaty',
    title_ja:'韓国併合',
    place_ko:'한성',
    lat:37.566, lng:126.975,
    people:['순종','이완용','데라우치 마사타케'],
    summary_ko:'1910년 8월 29일 한일병합조약이 공포되며 대한제국이 멸망했다. 순종은 형식상 마지막 황제로 통치권 이전 문서에 서명했고, 일본 천황이 내린 "이왕(李王)"이라는 격하된 칭호 아래 창덕궁에 사실상 유폐됐다. 500년 조선 왕조와 13년 대한제국의 역사가 그의 대에서 끝났고, 35년의 일제강점이 시작됐다.',
    video:null,
    connections:['policy_1907_01b'],
    tags:['political','한일병합','순종','국치'],
    sources:['한국민족문화대백과사전 순종','위키백과 순종'] }
];
