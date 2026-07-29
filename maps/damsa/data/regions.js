// maps/damsa/data/regions.js
// 답사 거리 계산의 "출발지" 기준점 — 17개 시도 청사 좌표.
//
// 왜 브라우저 위치 권한(geolocation)을 쓰지 않는가:
//   1) 거절률이 높고, 거절당하면 기능이 통째로 죽는다.
//   2) 여행은 "지금 있는 곳"이 아니라 "갈 곳" 기준으로 짠다.
//      서울 사람이 "다음 달 전주 가는데 근처 뭐 있지"를 찾는다.
//   3) 좌표 조합이 (17 × 답사지)로 줄어 계산이 즉시 끝난다.
// 나중에 "현재 위치 사용" 버튼을 선택지로 하나 더 얹는 것은 가능하다.
//
// isIsland: 육로로 연결되지 않는 지역. 제주가 유일하다.
//   이 값이 true면 자동차 소요시간을 계산하지 않고 "항공/선박" 안내로
//   대체한다 — 없으면 "제주 → 강화 4시간 30분" 같은 거짓말이 나온다.

window.DAMSA_REGIONS = [
  { id: 'seoul',    name: '서울',   lat: 37.5665, lng: 126.9780 },
  { id: 'incheon',  name: '인천',   lat: 37.4563, lng: 126.7052 },
  { id: 'gyeonggi', name: '경기',   lat: 37.2636, lng: 127.0286, note: '수원 기준' },
  { id: 'gangwon',  name: '강원',   lat: 37.8813, lng: 127.7300, note: '춘천 기준' },
  { id: 'daejeon',  name: '대전',   lat: 36.3504, lng: 127.3845 },
  { id: 'sejong',   name: '세종',   lat: 36.4801, lng: 127.2890 },
  { id: 'chungbuk', name: '충북',   lat: 36.6424, lng: 127.4890, note: '청주 기준' },
  { id: 'chungnam', name: '충남',   lat: 36.6009, lng: 126.6650, note: '홍성 기준' },
  { id: 'jeonbuk',  name: '전북',   lat: 35.8242, lng: 127.1480, note: '전주 기준' },
  { id: 'gwangju',  name: '광주',   lat: 35.1595, lng: 126.8526 },
  { id: 'jeonnam',  name: '전남',   lat: 34.8161, lng: 126.4630, note: '무안 도청 기준' },
  { id: 'daegu',    name: '대구',   lat: 35.8714, lng: 128.6014 },
  { id: 'gyeongbuk',name: '경북',   lat: 36.5684, lng: 128.7294, note: '안동 기준' },
  { id: 'busan',    name: '부산',   lat: 35.1796, lng: 129.0756 },
  { id: 'ulsan',    name: '울산',   lat: 35.5384, lng: 129.3114 },
  { id: 'gyeongnam',name: '경남',   lat: 35.2280, lng: 128.6811, note: '창원 기준' },
  { id: 'jeju',     name: '제주',   lat: 33.4996, lng: 126.5312, isIsland: true }
];
