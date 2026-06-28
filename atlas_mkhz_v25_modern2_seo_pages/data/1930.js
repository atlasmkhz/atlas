// data/1930.js — 1930도 사건 데이타 (5개)
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1930.js"></script> 로 불리웴니다.

const EVENTS_1930 = [

  // ══ 만주 — 무장투쟁 진영의 비극 ══
  { id:'person_1930_01', year:1930, visible_from:1930, visible_until:1930,
    month:0, day:24, type:'plot', priority:1, source_type:'disputed',
    title_ko:'김좌진 암살',
    title_en:'Assassination of Kim Jwa-jin',
    title_ja:'金佐鎮暗殺',
    place_ko:'북만주 산시 (해림)',
    lat:44.58, lng:129.6,
    people:['김좌진'],
    summary_ko:'청산리 대첩의 영웅이자 신민부·한족총연합회를 이끌며 만주 독립운동을 지탱하던 김좌진이 1930년 1월 24일 자신이 운영하던 정미소에서 피살됐다. 정체불명의 청년 노동자가 등 뒤에서 권총을 쐈다. 범인은 고려공산청년회 계열로 알려졌으나, 진짜 신원과 배후를 둘러싸고는 지금도 이견이 많다. 공산주의 세력과의 갈등이 직접 원인이라는 설, 일제가 조선공산당 만주총국에 허위 정보를 흘려 암살을 유도했다는 설이 엇갈린다. "할 일이 너무도 많은 이때에 내가 죽어야 하다니"라는 유언이 전해진다. 민족주의와 사회주의 진영의 반목이 빚어낸, 만주 무장투쟁 시대의 비극적 종막이었다.',
    video:null,
    connections:['battle_1925_01','person_1925_02'],
    tags:['person','만주·간도','김좌진','암살','논쟁'],
    sources:['위키백과 김좌진','한국사데이터베이스 김좌진의 암살에 대한 문제'] },

  // ══ 신간회 — 연대의 종말 ══
  { id:'political_1930_01', year:1930, visible_from:1930, visible_until:1930,
    month:6, day:null, type:'political', priority:1,
    title_ko:'신간회 해소론의 부상',
    title_en:'Rise of the Singanhoe Dissolution Movement',
    title_ja:'新幹会解消論の浮上',
    place_ko:'경성',
    lat:37.5703, lng:126.9838,
    people:[],
    summary_ko:'민중대회 사건으로 민족주의 계열 지도부가 검거되자, 남은 지도부는 자치운동과 가까운 온건·합법 노선으로 기울었다. 코민테른 12월테제의 영향을 받은 사회주의 계열은 이를 기회주의로 규정하며 신간회 해소를 주장하기 시작했다. 노동자·농민을 계급별로 따로 조직해야 한다는 논리였다. 1927년 연대의 출발이었던 단체가, 이제 그 연대를 끝내야 한다는 목소리에 흔들리고 있었다. 광주학생운동·원산총파업 같은 대중투쟁의 고양을 "혁명적 전환기"로 본 사회주의 진영의 낙관이 이 해소론을 더욱 밀어붙였다.',
    video:null,
    connections:['movement_1929_03','political_1929_02'],
    tags:['political','조선국내','경성','신간회','해소론'],
    sources:['우리역사넷 신간회 강령과 규약'] },

  // ══ 광주학생운동의 여진 ══
  { id:'movement_1930_01', year:1930, visible_from:1930, visible_until:1930,
    month:0, day:9, type:'movement', priority:2,
    title_ko:'광주학생운동의 여진 — 백지동맹과 3차 시위',
    title_en:'Aftershocks of the Gwangju Student Movement',
    title_ja:'光州学生運動の余震',
    place_ko:'광주',
    lat:35.155, lng:126.92,
    people:[],
    summary_ko:'1929년 11월 시작된 광주학생운동의 불길은 새해에도 꺼지지 않았다. 1930년 1월 9일 광주고보 학생들이 백지동맹(답안지를 백지로 내는 시험 거부 투쟁)을 일으켜 17명이 퇴학당했고, 16일에는 제3차 시위가 발각돼 48명이 무더기로 퇴학당했다. 거듭된 희생에도 학생들은 굴복하지 않았다. 1930년 3월까지 이어진 이 항쟁에는 결국 전국 320여 개교 5만 4천여 명이 참여했고, 1,400여 명이 퇴학·무기정학 처분을 받았다. 식민지 교육에 대한 가장 끈질긴 저항이었다.',
    video:null,
    connections:['movement_1929_02'],
    tags:['movement','조선국내','광주','학생운동'],
    sources:['우리역사넷 광주학생운동의 전개','나무위키'] },

  // ══ 노동운동 ══
  { id:'movement_1930_02', year:1930, visible_from:1929, visible_until:1930,
    month:0, day:13, type:'movement', priority:1,
    impact_type:'labor', violence_level:2, victim_group:['workers'],
    title_ko:'원산총파업',
    title_en:'Wonsan General Strike',
    title_ja:'元山総罷業',
    place_ko:'원산',
    lat:39.16, lng:127.44,
    people:[],
    summary_ko:'1929년 1월부터 4월까지 원산에서 노동자 2,200여 명이 참여한, 일제강점기 최대 규모의 노동쟁의가 벌어졌다. 발단은 1928년 9월 영국인 소유 문평 라이징선 석유회사의 일본인 감독 고타마가 조선인 노동자를 구타한 사건이었다. 원산노동연합회를 중심으로 80일 가까이 총파업이 지속됐고, 일본군 제19사단 병력이 시내에 무장 행진하며 공포 분위기를 조성하고 일본인 우익단체 국수회가 폭력배를 동원하는 등 경찰·군·자본이 한편이 되어 파업을 압박했다. 4월 1일 노동자 일부가 어용단체 함남노동회를 습격한 것을 빌미로 경찰은 원산노련 소속 노동자 40여 명을 검거했고, 결국 4월 6일 노동자 측의 패배로 파업이 종결됐다. 파업에 참여했던 노동자 다수는 재취업을 거부당해 실업 상태에 빠졌다. 끝내 요구는 대부분 받아들여지지 않았지만, 노동자가 조직적 단결로 일제와 자본에 맞선 역량을 증명한 투쟁이었다. 이후에도 1931년 평원고무공장 파업처럼 탄압은 계속됐고, 1931~1935년 사이 체포된 노동조합 활동가는 1,759명에 달했다.',
    video:null,
    connections:['movement_1924_01','person_1930_03'],
    tags:['movement','조선국내','원산','노동운동','파업','노동탄압'],
    sources:['한국민족문화대백과사전 원산총파업','위키백과 원산 총파업','우리역사넷 원산총파업'] },

  // ══ 인물 스냅샷 ══
  { id:'person_1930_02', year:1930, visible_from:1930, visible_until:1936,
    month:0, day:null, type:'person', priority:2,
    title_ko:'허정숙 — 옌안으로의 길',
    title_en:'Heo Jeong-suk — The Road to Yenan',
    title_ja:'許貞淑 — 延安への道',
    place_ko:'경성',
    lat:37.5645, lng:126.9905,
    people:['허정숙'],
    summary_ko:'근우회 창립의 주역이자 광주학생운동 후속 시위를 배후에서 이끈 혐의로 허정숙은 1930년 거듭 투옥되는 탄압을 받았다. 사회주의 계열 여성운동가로서 그는 민족해방과 여성해방, 계급해방을 함께 추구했다. 거듭된 옥고에도 그의 활동은 멈추지 않았고, 1930년대 중반 그는 끝내 중국 옌안으로 망명해 항일투쟁의 새로운 무대를 찾게 된다. 여성이 단지 보조자가 아니라 독립운동의 전선에 서 있었음을 보여준 생애였다.',
    video:null,
    connections:['movement_1927_01','movement_1929_03'],
    tags:['person','조선국내','경성','허정숙','여성운동'],
    sources:['우리역사넷 광주학생항일운동'] },

  { id:'person_1930_03', year:1930, visible_from:1930, visible_until:1931,
    month:7, day:7, type:'person', priority:2,
    impact_type:'labor', violence_level:2, victim_group:['workers','women'],
    title_ko:'강주룡 — 평원고무공장 파업과 을밀대 고공농성',
    title_en:'Kang Ju-ryong — The Pyongwon Rubber Factory Strike',
    title_ja:'姜周龍 — 平元ゴム工場ストライキ',
    place_ko:'평양 을밀대',
    lat:39.034, lng:125.73,
    people:['강주룡'],
    summary_ko:'1930년 8월 평양고무공업조합이 노동자 임금을 17% 일방 삭감하겠다고 통고하자, 평원고무공장을 비롯한 11개 공장 1,800여 명의 노동자가 동맹파업에 들어갔다. 공장 여공이던 강주룡은 사용자가 단체교섭에 응하지 않는 데 항의해, 지상 12m 높이의 을밀대 지붕에 광목을 찢어 만든 줄을 타고 올라가 8시간 동안 "임금 삭감 반대, 여성 해방, 노동 해방"을 외쳤다 — 한국 노동운동사 최초의 고공시위였다. 강제로 끌려 내려온 뒤에도 단식으로 저항을 이어가 1주일 구류 처분을 받았고, 옥중에서 54시간 단식을 결행했다. 파업은 별다른 성과 없이 끝났고, 신경쇠약과 소화불량으로 보석 출감한 강주룡은 두 달 만인 1931년 8월 13일 평양의 빈민굴에서 30세로 숨졌다.',
    video:null,
    connections:['movement_1930_02'],
    tags:['person','조선국내','평양','강주룡','여성노동','을밀대','고무공장파업'],
    sources:['한국민족문화대백과사전 강주룡','위키백과 강주룡','위키백과 원산총파업'],
    content:{ hero:{"url": "assets/images/entity/person/person_kang_ju_ryong_01.webp", "alt": "강주룡", "caption": "AI로 복원한 이미지", "credit": "AI 복원 이미지", "is_ai": true, "source_type": "generated", "image_type": "portrait"}, gallery:[] } }

];