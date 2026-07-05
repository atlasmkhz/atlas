// ═══════════════════════════════════════════════════════
// reigns.js — 고려왕조 왕 재위 목록 (중세1, 918~1392)
// timeline.js가 이 배열로 왕조 비례(+최소폭) 슬라이더를 그린다.
// 중세2(조선)의 reigns.js와 같은 구조를 쓴다.
//
// 복위(중조 반복)한 왕(충렬왕·충숙왕·충혜왕)은 1차·2차 재위 사이에
// 공백이 있지만, 슬라이더 세그먼트는 단순화를 위해 "첫 즉위년~최종
// 퇴위년"을 하나의 연속 구간으로 표시한다(restored:true로 표시만
// 해둔다). 실제 사건 카드는 정확한 연도를 그대로 쓰면 되므로 이
// 단순화가 데이터 정확성에 영향을 주지 않는다.
const REIGNS = [
  { order:1,  name:'태조',   hanja:'太祖',   start_year:918,  end_year:943  },
  { order:2,  name:'혜종',   hanja:'惠宗',   start_year:943,  end_year:945  },
  { order:3,  name:'정종',   hanja:'定宗',   start_year:945,  end_year:949  },
  { order:4,  name:'광종',   hanja:'光宗',   start_year:949,  end_year:975  },
  { order:5,  name:'경종',   hanja:'景宗',   start_year:975,  end_year:981  },
  { order:6,  name:'성종',   hanja:'成宗',   start_year:981,  end_year:997  },
  { order:7,  name:'목종',   hanja:'穆宗',   start_year:997,  end_year:1009 },
  { order:8,  name:'현종',   hanja:'顯宗',   start_year:1009, end_year:1031 },
  { order:9,  name:'덕종',   hanja:'德宗',   start_year:1031, end_year:1034 },
  { order:10, name:'정종',   hanja:'靖宗',   start_year:1034, end_year:1046 },
  { order:11, name:'문종',   hanja:'文宗',   start_year:1046, end_year:1083 },
  { order:12, name:'순종',   hanja:'順宗',   start_year:1083, end_year:1083 },
  { order:13, name:'선종',   hanja:'宣宗',   start_year:1083, end_year:1094 },
  { order:14, name:'헌종',   hanja:'獻宗',   start_year:1094, end_year:1095 },
  { order:15, name:'숙종',   hanja:'肅宗',   start_year:1095, end_year:1105 },
  { order:16, name:'예종',   hanja:'睿宗',   start_year:1105, end_year:1122 },
  { order:17, name:'인종',   hanja:'仁宗',   start_year:1122, end_year:1146 },
  { order:18, name:'의종',   hanja:'毅宗',   start_year:1146, end_year:1170 },
  { order:19, name:'명종',   hanja:'明宗',   start_year:1170, end_year:1197 },
  { order:20, name:'신종',   hanja:'神宗',   start_year:1197, end_year:1204 },
  { order:21, name:'희종',   hanja:'熙宗',   start_year:1204, end_year:1211 },
  { order:22, name:'강종',   hanja:'康宗',   start_year:1211, end_year:1213 },
  { order:23, name:'고종',   hanja:'高宗',   start_year:1213, end_year:1259 },
  { order:24, name:'원종',   hanja:'元宗',   start_year:1259, end_year:1274 },
  { order:25, name:'충렬왕', hanja:'忠烈王', start_year:1274, end_year:1298, dynasty_no:25, segment:'1차' },
  { order:26, name:'충선왕', hanja:'忠宣王', start_year:1298, end_year:1298, dynasty_no:26, segment:'1차' },
  { order:27, name:'충렬왕', hanja:'忠烈王', start_year:1298, end_year:1308, dynasty_no:25, segment:'2차(복위)' },
  { order:28, name:'충선왕', hanja:'忠宣王', start_year:1308, end_year:1313, dynasty_no:26, segment:'2차(복위)' },
  { order:29, name:'충숙왕', hanja:'忠肅王', start_year:1313, end_year:1330, dynasty_no:27, segment:'1차' },
  { order:30, name:'충혜왕', hanja:'忠惠王', start_year:1330, end_year:1332, dynasty_no:28, segment:'1차' },
  { order:31, name:'충숙왕', hanja:'忠肅王', start_year:1332, end_year:1339, dynasty_no:27, segment:'2차(복위)' },
  { order:32, name:'충혜왕', hanja:'忠惠王', start_year:1339, end_year:1344, dynasty_no:28, segment:'2차(복위)' },
  { order:33, name:'충목왕', hanja:'忠穆王', start_year:1344, end_year:1348, dynasty_no:29 },
  { order:34, name:'충정왕', hanja:'忠定王', start_year:1349, end_year:1351, dynasty_no:30 },
  { order:35, name:'공민왕', hanja:'恭愍王', start_year:1351, end_year:1374, dynasty_no:31 },
  { order:36, name:'우왕',   hanja:'禑王',   start_year:1374, end_year:1388, dynasty_no:32 },
  { order:37, name:'창왕',   hanja:'昌王',   start_year:1388, end_year:1389, dynasty_no:33 },
  { order:38, name:'공양왕', hanja:'恭讓王', start_year:1389, end_year:1392, dynasty_no:34 },
];

const REIGNS_MIN_YEAR = REIGNS[0].start_year;
const REIGNS_MAX_YEAR = REIGNS[REIGNS.length - 1].end_year;
// 세그먼트 최소 시각 폭은 CSS(.reign-seg{min-width:3px})에서 처리한다 —
// JS에서 폭을 재분배하지 않아야 슬라이더와 항상 정확히 일치한다.
