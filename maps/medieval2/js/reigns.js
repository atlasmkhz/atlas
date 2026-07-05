// ═══════════════════════════════════════════════════════
// reigns.js — 조선왕조 왕 재위 목록 (중세2, 1392~1875)
// 하단 슬라이더를 연도가 아니라 "왕의 재위기간" 단위로 표시하기 위한
// 데이터. timeline.js가 이 배열을 읽어 비례 폭(+최소폭) 세그먼트를
// 그리고, 현재 연도가 어느 왕의 재위기간에 속하는지 찾아 "세종
// (1418~1450)" 형태의 라벨을 만든다.
//
// 범위 주의: 조선 왕조의 전통적 계보는 태조~철종(27대 중 26대)까지지만,
// 실제 재위는 철종의 다음 왕인 고종(1863~1907)까지 이어진다. 이 지도
// (중세2)는 근대 지도(1876~1945)와 시간축을 공유하므로, 고종 재위 중
// 1876년 이후는 근대 지도가 담당한다 — 여기서는 고종의 즉위(1863)부터
// 1875년까지만 다루고, continues_in 필드로 다음 지도를 안내한다.
//
// end_year는 실제 역사적 재위 종료년, display_end_year는 이 지도에서
// 표시할 종료년(고종만 다르다).
const REIGNS = [
  { order:1,  name:'태조',   hanja:'太祖',   start_year:1392, end_year:1398 },
  { order:2,  name:'정종',   hanja:'定宗',   start_year:1398, end_year:1400 },
  { order:3,  name:'태종',   hanja:'太宗',   start_year:1400, end_year:1418 },
  { order:4,  name:'세종',   hanja:'世宗',   start_year:1418, end_year:1450 },
  { order:5,  name:'문종',   hanja:'文宗',   start_year:1450, end_year:1452 },
  { order:6,  name:'단종',   hanja:'端宗',   start_year:1452, end_year:1455 },
  { order:7,  name:'세조',   hanja:'世祖',   start_year:1455, end_year:1468 },
  { order:8,  name:'예종',   hanja:'睿宗',   start_year:1468, end_year:1469 },
  { order:9,  name:'성종',   hanja:'成宗',   start_year:1469, end_year:1494 },
  { order:10, name:'연산군', hanja:'燕山君', start_year:1494, end_year:1506 },
  { order:11, name:'중종',   hanja:'中宗',   start_year:1506, end_year:1544 },
  { order:12, name:'인종',   hanja:'仁宗',   start_year:1544, end_year:1545 },
  { order:13, name:'명종',   hanja:'明宗',   start_year:1545, end_year:1567 },
  { order:14, name:'선조',   hanja:'宣祖',   start_year:1567, end_year:1608 },
  { order:15, name:'광해군', hanja:'光海君', start_year:1608, end_year:1623 },
  { order:16, name:'인조',   hanja:'仁祖',   start_year:1623, end_year:1649 },
  { order:17, name:'효종',   hanja:'孝宗',   start_year:1649, end_year:1659 },
  { order:18, name:'현종',   hanja:'顯宗',   start_year:1659, end_year:1674 },
  { order:19, name:'숙종',   hanja:'肅宗',   start_year:1674, end_year:1720 },
  { order:20, name:'경종',   hanja:'景宗',   start_year:1720, end_year:1724 },
  { order:21, name:'영조',   hanja:'英祖',   start_year:1724, end_year:1776 },
  { order:22, name:'정조',   hanja:'正祖',   start_year:1776, end_year:1800 },
  { order:23, name:'순조',   hanja:'純祖',   start_year:1800, end_year:1834 },
  { order:24, name:'헌종',   hanja:'憲宗',   start_year:1834, end_year:1849 },
  { order:25, name:'철종',   hanja:'哲宗',   start_year:1849, end_year:1863 },
  { order:26, name:'고종',   hanja:'高宗',   start_year:1863, end_year:1907,
    display_end_year:1875,
    continues_in:{ label:'근대 지도(1876~)에서 계속', url:'../../map.html' } },
];

// 이 지도가 실제로 표시하는 연도 범위(고종은 1875에서 끊는다).
const REIGNS_MIN_YEAR = REIGNS[0].start_year;
const REIGNS_MAX_YEAR = REIGNS[REIGNS.length - 1].display_end_year ?? REIGNS[REIGNS.length - 1].end_year;

// 세그먼트 최소 시각 폭은 CSS(.reign-seg{min-width:3px})에서 처리한다 —
// JS에서 폭을 재분배하지 않아야 슬라이더와 항상 정확히 일치한다
// (자세한 설명은 js/timeline.js의 renderReignBand 주석 참고).
