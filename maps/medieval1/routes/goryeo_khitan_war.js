// routes/goryeo_khitan_war.js — 고려거란전쟁
// 942(만부교 사건) ~ 1044(천리장성 완공), 30년 전쟁과 그 여파
//
// 웨이포인트 유형: 'political'(외교·건축), 'battle'(전투), 'tragedy'(양규 전사),
//   'exile'(피난)
//
// card_ref: 기존 data/06_seongjong.js, 07_mokjong.js, 08_hyeonjong.js
// 카드 id — 클릭 시 해당 카드 팝업이 열린다. card_ref가 null이면 루트
// 전용 웨이포인트로 요약 팝업을 자체 생성한다.
//
// 데이터 메모: 이 루트는 운이 좋았다 — 고려거란전쟁의 뼈대를 이루는
// 4개 사건(거란 1차 침입과 서희의 담판, 강조의 정변, 거란 2차 침입과
// 나주 피난, 거란 3차 침입과 귀주대첩)이 이미 이 지도에 상세한 카드로
// 존재해서, 다른 루트들보다 훨씬 적은 분량만 새로 쓰면 됐다. 새로 쓴
// 것은 전쟁의 뿌리가 된 942년 만부교 사건, 2차 침입 후 양규의 유격전,
// 그리고 전쟁이 남긴 결과물(나성·천리장성) 세 곳뿐이다.
//
// 좌표 메모: 흥화진은 오늘날 평안북도 의주 일대, 천리장성의 동쪽
// 끝점은 함경남도 도련포로 비정된다.

const ROUTE_GORYEO_KHITAN_WAR = {
  id: 'goryeo_khitan_war',
  name: '고려거란전쟁',
  subject_type: 'movement',
  period: '942~1044',
  tagline: '낙타를 굶겨 죽인 그날부터 귀주대첩까지 — 거란과 30년에 걸쳐 세 차례 맞붙으며 고려가 자기 몫의 평화를 지켜낸 이야기',
  color: '#5c2f2f',
  total_waypoints: 8,
  hero_image: "assets/images/route/route_goryeo_khitan_war_hero.webp",

  card_refs: ['battle_0993_01', 'plot_1009_01', 'battle_1010_01', 'battle_1018_01'],

  waypoints: [

    {
      id: 'wp_01',
      type: 'political',
      year: 942, month: null, day: null,
      title_ko: '만부교 사건 — 낙타 50필을 굶겨 죽이다',
      place_ko: '개경',
      lat: 37.9707, lng: 126.5615,
      stay: null,
      summary_ko: '태조 왕건은 발해를 멸망시킨 거란이 사신과 함께 낙타 50필을 보내오자, 발해를 무너뜨린 무도한 나라와는 국교를 맺을 수 없다며 사신 30명을 섬으로 유배 보내고 낙타는 만부교 다리 아래 묶어 굶겨 죽였다. 발해 유민을 적극적으로 받아들였던 고려의 대외 노선을 단적으로 보여주는 이 사건은, 이후 반세기 동안 이어지는 고려·거란 갈등의 씨앗이 됐다.',
      card_ref: null,
    },

    {
      id: 'wp_02',
      type: 'battle',
      year: 993, month: 10, day: null,
      title_ko: '거란 1차 침입과 서희의 담판',
      place_ko: '평안 안융진',
      lat: 39.6, lng: 125.6,
      stay: null,
      summary_ko: '거란(요)이 고려·송의 친선을 문제 삼아 소손녕의 대군으로 침입해오자, 서희는 직접 적진으로 가 담판을 벌였다. 고려가 고구려를 계승한 나라임을 내세워 거란과의 국교 수립을 조건으로, 오히려 강동 6주를 고려 영토로 확보하는 데 성공했다 — 외교 협상만으로 영토를 넓힌 이례적인 사례로, 고려는 이 담판 덕분에 압록강까지 국경을 넓혔다.',
      card_ref: 'battle_0993_01',
    },

    {
      id: 'wp_03',
      type: 'political',
      year: 1009, month: 2, day: null,
      title_ko: '강조의 정변 — 거란에게 명분을 주다',
      place_ko: '개경',
      lat: 37.9707, lng: 126.5615,
      stay: null,
      summary_ko: '서북면도순검사 강조가 군사를 이끌고 개경으로 들어와 목종을 폐위·시해하고 현종을 새 왕으로 옹립했다. 신하가 왕을 시해했다는 사실은, 거란이 "군신의 의리를 어겼다"는 명분을 내세워 대규모로 침입할 구실이 됐다 — 내부 정변이 외침의 빌미가 된 사례다.',
      card_ref: 'plot_1009_01',
    },

    {
      id: 'wp_04',
      type: 'exile',
      year: 1010, month: 11, day: null,
      title_ko: '거란 2차 침입 — 개경 함락, 현종의 나주 피난',
      place_ko: '전남 나주',
      lat: 35.0160, lng: 126.7108,
      stay: null,
      summary_ko: '거란 성종이 강조 시해를 문책한다는 명분으로 40만 대군을 직접 이끌고 침입했다. 강조는 통주에서 크게 패해 죽었고, 거란군은 파죽지세로 남하해 결국 개경까지 함락시켰다. 현종은 멀리 전라도 나주까지 피난했다 — 국왕이 도성을 버리고 국토 남쪽 끝까지 피난해야 했던, 고려 건국 이래 최대의 국난이었다.',
      card_ref: 'battle_1010_01',
    },

    {
      id: 'wp_05',
      type: 'tragedy',
      year: 1011, month: 1, day: null,
      title_ko: '양규의 유격전 — 퇴각하는 거란군을 물고 늘어지다',
      place_ko: '흥화진(평북 의주)',
      lat: 40.15, lng: 124.95,
      stay: null,
      summary_ko: '개경까지 함락시킨 거란군이었지만, 보급선이 길어지고 흥화진 장군 양규의 끈질긴 유격전에 시달리며 결국 강화를 조건으로 철군하기로 했다. 양규는 퇴각하는 거란군을 뒤쫓으며 일곱 차례나 싸워 포로로 잡혀가던 고려 백성 수만 명을 구해냈지만, 마지막 전투에서 전사했다 — 거란군을 국경 밖으로 완전히 몰아내는 데 결정적으로 기여한 희생이었다.',
      card_ref: null,
    },

    {
      id: 'wp_06',
      type: 'battle',
      year: 1018, month: 12, day: null,
      title_ko: '거란 3차 침입과 귀주대첩',
      place_ko: '평북 귀주',
      lat: 39.9333, lng: 125.2333,
      stay: null,
      summary_ko: '강동 6주 반환을 요구하며 거란이 세 번째로 침입해오자, 고려는 강감찬을 상원수로 삼아 맞섰다. 강감찬은 흥화진에서 강물을 막았다가 터뜨려 거란군에 큰 타격을 입힌 데 이어, 퇴각하는 거란군을 귀주에서 완전히 포위해 섬멸하다시피 했다. 이 대승으로 거란은 이후 고려를 다시는 대규모로 침공하지 못했다.',
      card_ref: 'battle_1018_01',
    },

    {
      id: 'wp_07',
      type: 'political',
      year: 1029, month: null, day: null,
      title_ko: '나성 축조 — 도성을 다시는 내주지 않기 위해',
      place_ko: '개경',
      lat: 37.9707, lng: 126.5615,
      stay: null,
      summary_ko: '개경이 함락당했던 뼈아픈 기억을 되풀이하지 않기 위해, 도성 전체를 둘러싸는 나성을 쌓았다. 둘레 약 23km에 이르는 이 성곽은 개경을 명실상부한 방어 도성으로 완성시켰다 — 전쟁이 남긴 가장 실용적인 유산이었다.',
      card_ref: null,
    },

    {
      id: 'wp_08',
      type: 'political',
      year: 1044, month: null, day: null,
      title_ko: '천리장성 완공 — 30년 전쟁이 남긴 국경선',
      place_ko: '도련포(함경남도)',
      lat: 39.75, lng: 127.5,
      stay: null,
      summary_ko: '압록강 하구에서 동해안 도련포까지 이어지는 천리장성이 완공됐다. 거란과의 세 차례 전쟁, 그리고 이후 여진의 위협에 대비해 착공한 지 10여 년 만에 완성된 이 성벽은, 고려가 30년 전쟁 끝에 확보한 국경을 물리적으로 확정 짓는 상징이었다 — 이후 고려·거란·송 사이에는 오랜 세력 균형과 평화가 자리 잡는다.',
      card_ref: null,
    },

  ],
};

window.registerRoute(ROUTE_GORYEO_KHITAN_WAR);
