// data/2025.js — 2025년 사건 데이터
// 현대 지도 (1994~2025)
// 참고: 2025년 하반기부터 검찰개혁·사법개혁을 둘러싼 여야·검찰·법원 간
// 갈등("3대 특검", 대법원 증원, 내란특별재판부 설치 논의 등)이 격화되고
// 있으나, 이 글 작성 시점 기준 사실관계가 계속 유동적이고 정치적으로도
// 첨예하게 갈려 있어 이번 카드 작업에서는 다루지 않았다 — 사안이 어느
// 정도 정리된 뒤 별도로 판단해 추가하는 것이 안전하다고 봤다.

const EVENTS_2025 = [

  { id:'political_2025_01', year:2025, visible_from:2025, visible_until:2025,
    month:4, day:4, type:'political', priority:1,
    title_ko:'헌법재판소, 윤석열 대통령 파면',
    title_en:"Constitutional Court Removes President Yoon Suk-yeol",
    title_ja:'憲法裁判所 尹錫悦大統領罷免',
    place_ko:'서울 (헌법재판소)',
    lat:37.5701, lng:126.9756,
    people:['윤석열'],
    party:'국민의힘',
    allegation_status:'convicted',
    summary_ko:'헌법재판소가 4월 4일 오전 11시 22분, 재판관 8명 전원일치로 윤석열 대통령 탄핵을 인용해 파면을 선고했다. 12·3 비상계엄 선포가 헌법상 요건을 갖추지 못한 채 국회의 계엄 해제 권한 행사를 방해하려 한 위헌·위법 행위였다는 것이 요지였다. 박근혜(2017)에 이어 헌정사상 두 번째 대통령 파면이다. 파면과 별개로 내란 혐의에 대한 형사재판은 이 글 작성 시점 기준 계속 진행 중이다.',
    video:null,
    connections:['political_2024_03'],
    tags:['political','서울','윤석열','파면','헌법재판소'],
    sources:['위키백과 윤석열 대통령 탄핵소추','한국민족문화대백과사전 윤석열 대통령 탄핵사건'] },

  { id:'political_2025_02', year:2025, visible_from:2025, visible_until:2025,
    month:6, day:3, type:'political', priority:1,
    title_ko:'제21대 대통령 선거 — 이재명 당선',
    title_en:'2025 Presidential Election — Lee Jae-myung Elected',
    title_ja:'第21代大統領選挙 李在明当選',
    place_ko:'전국',
    lat:36.5, lng:127.8,
    people:['이재명'],
    party:'더불어민주당',
    allegation_status:null,
    summary_ko:'윤석열 파면으로 치러진 조기 대선에서 더불어민주당 이재명 후보가 당선됐다 — 2022년 대선에서 0.73%포인트 차이로 낙선한 지 3년 만의 재도전이었다. 12·3 비상계엄 사태에 대한 심판 성격이 강했던 이 선거로, 정권은 다시 진보 진영으로 넘어갔다.',
    video:null,
    connections:['political_2025_01'],
    tags:['political','전국','대선','이재명','조기대선'],
    sources:['한국민족문화대백과사전 제21대 대통령선거','위키백과 2025년 대한민국 대통령 선거'] },

  { id:'political_2025_03', year:2025, visible_from:2025, visible_until:2025,
    month:6, day:4, type:'political', priority:1,
    title_ko:'이재명 대통령 취임',
    title_en:'Inauguration of President Lee Jae-myung',
    title_ja:'李在明大統領就任',
    place_ko:'서울 (국회의사당)',
    lat:37.5326, lng:126.9139,
    people:['이재명'],
    party:'더불어민주당',
    allegation_status:null,
    summary_ko:'개표 완료 직후인 6월 4일 오전 6시 21분, 이재명이 제21대 대통령으로 즉시 취임했다 — 조기대선 특성상 별도의 인수위원회나 취임식 준비 기간 없이 곧바로 임기가 시작된 것이다. 대장동 개발 특혜 의혹 등 본인 관련 여러 재판이 진행 중인 상태에서 대통령이 됐다는 점에서, 임기 내내 사법 리스크와 국정 운영을 어떻게 병행할지가 최대 관전 포인트로 꼽혔다.',
    video:null,
    connections:['political_2025_02'],
    tags:['political','서울','이재명','대통령취임'],
    sources:['한국민족문화대백과사전 이재명','위키백과 이재명'] }

];
