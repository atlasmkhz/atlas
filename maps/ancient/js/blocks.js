// ═══════════════════════════════════════════════════════
// blocks.js — 고대시대 사건 단위 블록 (기원전 37 ~ 936)
// 중세1·2의 reigns.js(왕조 재위기간)와 같은 역할을 하지만, 고대는
// 여러 나라가 동시에 존재해 "왕 하나 = 챕터 하나"가 성립하지 않는다.
// 그래서 "왕"이 아니라 "역사적 전환점으로 나눈 시기"를 챕터 단위로
// 쓴다 — 블록 하나를 열면 그 시기의 고구려·백제·신라·가야·발해 등
// 모든 나라의 사건이 함께 표시된다(같은 시공간에 여러 나라가 있었다는
// 이 지도의 핵심 철학).
//
// 고정 연수(10/20/50년)로 자르지 않고, 실제 역사적 전환점에서 끊는다
// — 블록 경계 자체가 "이 시기에 무슨 일이 있었길래 여기서 끊었는가"에
// 대한 답이 되도록. 블록 길이가 들쭉날쭉한 건 의도된 것이다(중세1·2도
// 왕마다 재위기간이 다 다른 것과 같은 이유).
const BLOCKS = [
  { order:1, name:'삼국 정립기', start_year:-37, end_year:313,
    desc_hint:'고구려·백제·신라 건국부터, 고구려의 낙랑군 축출로 한반도 내 중국 군현이 소멸하기까지' },
  { order:2, name:'삼국 항쟁 1기', start_year:313, end_year:475,
    desc_hint:'광개토대왕·장수왕의 전성기부터, 장수왕 남진으로 한성이 함락되고 개로왕이 전사하기까지' },
  { order:3, name:'한강 쟁탈전', start_year:475, end_year:553,
    desc_hint:'백제의 웅진 천도부터, 나제동맹이 깨지고 신라가 한강 유역을 독점하기까지' },
  { order:4, name:'삼국 항쟁 2기', start_year:553, end_year:660,
    desc_hint:'관산성 전투부터, 나당동맹이 성립하고 백제가 멸망하기까지' },
  { order:5, name:'고구려 멸망과 나당전쟁', start_year:660, end_year:676,
    desc_hint:'고구려 멸망부터, 매소성·기벌포 전투로 당군을 몰아내기까지' },
  { order:6, name:'남북국 전성기', start_year:676, end_year:828,
    desc_hint:'신라 중대의 안정과 발해 건국·해동성국 시기' },
  { order:7, name:'신라 하대와 후삼국 성립', start_year:828, end_year:900,
    desc_hint:'장보고 피살 이후 왕위쟁탈전 심화부터, 후백제·태봉 건국까지' },
  { order:8, name:'후삼국과 고려 통일', start_year:900, end_year:936,
    desc_hint:'발해 멸망을 포함해, 고려가 후삼국을 최종 통일하기까지' },
];

const BLOCKS_MIN_YEAR = BLOCKS[0].start_year;
const BLOCKS_MAX_YEAR = BLOCKS[BLOCKS.length - 1].end_year;

// app.js가 중세1·2와 같은 패턴(REIGNS_MIN_YEAR/MAX_YEAR)을 그대로 쓰므로
// 별칭을 만들어 그 코드를 고치지 않고 재사용한다.
const REIGNS_MIN_YEAR = BLOCKS_MIN_YEAR;
const REIGNS_MAX_YEAR = BLOCKS_MAX_YEAR;
