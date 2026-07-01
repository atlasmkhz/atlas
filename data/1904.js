// data/1904.js — 1904년 사건 데이터
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1904.js"></script> 로 불립니다.

const EVENTS_1904 = [

  { id:'battle_1904_01', year:1904, visible_from:1904, visible_until:1905,
    month:1, day:8, type:'battle', priority:1,
    title_ko:'러일전쟁 발발 — 한반도를 건 제국의 충돌',
    title_en:'Outbreak of the Russo-Japanese War',
    title_ja:'日露戦争の勃発',
    place_ko:'인천 앞바다 · 제물포',
    lat:37.452, lng:126.597,
    people:[],
    summary_ko:'1904년 2월 8일, 일본이 뤼순의 러시아 함대를 기습하고 제물포 앞바다에서 러시아 군함을 공격하면서 러일전쟁이 터졌다. 만주와 한반도의 지배권을 놓고 벌인 두 제국의 전쟁이었다. 대한제국은 1월에 국외중립을 선언했지만, 일본은 이를 무시하고 인천·부산·원산에 군대를 상륙시켜 서울을 점령했다. 전쟁은 한반도를 전장이자 병참기지로 삼았다. 1905년 일본의 승리로 끝난 이 전쟁은 곧 대한제국의 운명을 결정지었다 — 미국은 가쓰라·태프트 밀약으로, 영국은 영일동맹으로 일본의 한국 지배를 묵인했고, 그 길은 곧장 을사늑약으로 이어졌다. 한국인의 의사와 무관하게 한국의 운명이 강대국들 사이에서 결정되던 시대의 서막이었다.',
    video:null,
    connections:['policy_1904_01','policy_1905_01'],
    tags:['battle','국제','러일전쟁','제물포','대한제국'],
    sources:['위키백과 대한제국','나무위키 대한제국','우리역사넷 군대해산'] },

  { id:'policy_1904_01', year:1904, visible_from:1904, visible_until:1905,
    month:1, day:23, type:'policy', priority:1,
    title_ko:'한일의정서 — 중립선언을 짓밟다',
    title_en:'The Japan–Korea Protocol',
    title_ja:'日韓議定書',
    place_ko:'한성',
    lat:37.566, lng:126.978,
    people:[],
    summary_ko:'러일전쟁을 일으킨 일본은 1904년 2월 23일 대한제국을 압박해 한일의정서를 강제로 체결했다. 대한제국의 국외중립 선언을 무력화하고, 일본이 군사상 필요한 지점을 마음대로 사용할 수 있도록 한 것이다. 이로써 한반도는 일본의 전쟁 수행을 위한 병참기지가 됐다. 일본은 이 의정서를 발판으로 한국의 내정에 본격 간섭하기 시작했다. 자주적 근대화를 꿈꾸던 광무개혁은 사실상 여기서 멈췄다 — 대한제국의 주권이 한 꺼풀씩 벗겨지는 첫 단계였다.',
    video:null,
    connections:['battle_1904_01','policy_1904_02'],
    tags:['policy','조선국내','경성','한일의정서','러일전쟁'],
    sources:['나무위키 대한제국','위키백과 대한제국'] },

  { id:'policy_1904_02', year:1904, visible_from:1904, visible_until:1905,
    month:7, day:22, type:'policy', priority:1,
    title_ko:'제1차 한일협약 — 고문정치의 시작',
    title_en:'The First Japan–Korea Convention',
    title_ja:'第一次日韓協約',
    place_ko:'한성',
    lat:37.566, lng:126.978,
    people:[],
    summary_ko:'1904년 8월 22일 체결된 제1차 한일협약으로, 일본은 대한제국에 일본이 추천하는 재정·외교 고문을 두도록 강제했다. 재정고문에 일본인 메가타, 외교고문에 친일 미국인 스티븐스가 임명됐다. 명목은 "고문(顧問)"이었지만, 실제로는 이들이 대한제국의 재정과 외교를 장악하는 고문정치(顧問政治)의 시작이었다. 메가타는 화폐정리사업을 단행해 대한제국의 경제를 일본에 종속시켰고, 스티븐스는 일본의 한국 침략을 미화하다 1908년 미국에서 전명운·장인환에게 저격당한다. 광무개혁의 자주적 개혁은 끝나고, 대한제국의 내정이 외부의 손에 넘어가기 시작한 결정적 전환점이었다.',
    video:null,
    connections:['policy_1900_01','policy_1904_01','righteous_1908_01'],
    tags:['policy','조선국내','경성','한일협약','고문정치','스티븐스'],
    sources:['나무위키 대한제국','위키백과 대한제국'] }

];
