// ═══════════════════════════════════════════════════════
// maps/medieval2/data/world_events.js — 세계의 흐름 (World Layer)
// 조선시대(1392~1875)와 같은 시간대의 세계. 스키마는 고대 지도와 동일.
// ═══════════════════════════════════════════════════════

const WORLD_REGIONS = [
  { key:'europe',     label:'유럽' },
  { key:'east_asia',  label:'동아시아' },
  { key:'mideast',    label:'중동' },
  { key:'south_asia', label:'남아시아' },
  { key:'sea',        label:'동남아시아' },
  { key:'africa',     label:'아프리카' },
  { key:'north_america', label:'북아메리카' },
  { key:'south_america', label:'남아메리카' },
  { key:'oceania',    label:'오세아니아' },
  { key:'eurasia',    label:'유라시아' },
  { key:'global',     label:'전 세계' }
];

const WORLD_EVENTS = {

  world_1405_zhenghe: {
    id:'world_1405_zhenghe', title:'정화의 대항해', start:1405, end:1433,
    regionKey:'east_asia', region:'동아시아~아프리카 (명)', location:[31.2304, 121.4737],
    type:'ECONOMY', visual:'expand', priority:2,
    summary:{
      what:'명 영락제의 명으로 환관 정화가 대함대를 이끌고 동남아시아·인도를 거쳐 아프리카 동해안까지 일곱 차례 항해했다.',
      why:'명 중심의 국제 조공 질서를 아시아·아프리카까지 확장하려는 목적이었다.',
      changed:'유럽의 대항해시대보다 반세기 이상 앞섰지만, 이후 명이 해금 정책으로 돌아서며 원양 항해는 중단된다.'
    },
    figures:[{name:'정화', role:'대항해 지휘'}]
  },

  world_1453_constantinople: {
    id:'world_1453_constantinople', title:'비잔티움 제국의 멸망', start:1453, end:1453,
    regionKey:'mideast', region:'중동·유럽 접경 (콘스탄티노폴리스)', location:[41.0082, 28.9784],
    type:'WAR', visual:'radiate', priority:2,
    summary:{
      what:'오스만 제국의 메흐메트 2세가 천년 도시 콘스탄티노폴리스를 함락시켰다.',
      why:'동로마 제국이 완전히 사라지고 도시는 이스탄불로 이름이 바뀌어 오스만의 수도가 됐다.',
      changed:'비잔티움의 학자들이 이탈리아로 피신하며 그리스 고전 연구가 유럽에 퍼져 르네상스를 자극한다.'
    },
    figures:[{name:'메흐메트 2세', role:'콘스탄티노폴리스 정복'}]
  },

  world_1455_gutenberg: {
    id:'world_1455_gutenberg', title:'구텐베르크의 활판 인쇄술', start:1450, end:1455,
    regionKey:'europe', region:'유럽 (독일)', location:[49.9929, 8.2473],
    type:'TECH', visual:'spread', priority:2,
    summary:{
      what:'독일의 구텐베르크가 금속활자 인쇄기로 성서를 대량으로 찍어냈다.',
      why:'고려의 직지심체요절(1377)보다는 뒤지지만, 유럽에서는 책값을 크게 낮춰 지식 보급을 혁신적으로 앞당겼다.',
      changed:'인쇄술의 확산은 훗날 르네상스와 종교개혁 사상이 빠르게 퍼지는 결정적 매개가 된다.'
    },
    figures:[{name:'구텐베르크', role:'금속활자 인쇄기'}]
  },

  world_1492_columbus: {
    id:'world_1492_columbus', title:'콜럼버스의 아메리카 도달과 신항로 개척', start:1487, end:1522,
    regionKey:'global', region:'대서양~아메리카·아시아', location:[9.5, -80.0],
    type:'ECONOMY', visual:'expand', priority:1,
    summary:{
      what:'포르투갈·에스파냐가 인도로 가는 새 항로를 찾던 중, 콜럼버스는 아메리카에 도달했고 바스쿠 다가마는 인도 항로를, 마젤란 일행은 세계 일주를 이뤘다.',
      why:'이슬람·이탈리아 상인이 독점하던 향신료 무역을 우회하려는 경제적 동기가 컸다.',
      changed:'유럽·아메리카·아프리카를 잇는 대서양 삼각무역이 성립하고, 아메리카의 은이 세계 교역망을 하나로 묶는다.'
    },
    figures:[{name:'콜럼버스', role:'아메리카 도달'}, {name:'바스쿠 다가마', role:'인도항로 개척'}]
  },

  world_1517_reformation: {
    id:'world_1517_reformation', title:'루터의 종교개혁', start:1517, end:1555,
    regionKey:'europe', region:'유럽 (독일)', location:[51.8, 12.65],
    type:'IDEA', visual:'spread', priority:1,
    summary:{
      what:'교황이 성당 증축 비용을 위해 면벌부를 팔자, 성직자 루터가 95개조 반박문을 내걸고 이를 비판했다.',
      why:'인간의 구원은 오직 믿음에 달려 있다는 그의 주장은 인쇄술의 확산에 힘입어 유럽 전역으로 빠르게 퍼졌다.',
      changed:'유럽 크리스트교는 가톨릭과 신교로 갈라졌고, 이후 각지에서 종교전쟁이 잇달아 일어난다.'
    },
    figures:[{name:'마르틴 루터', role:'95개조 반박문'}]
  },

  world_1526_mughal: {
    id:'world_1526_mughal', title:'인도 무굴 제국의 성립', start:1526, end:1707,
    regionKey:'south_asia', region:'남아시아 (인도)', location:[27.1767, 78.0081],
    type:'EMPIRE', visual:'expand', priority:2,
    summary:{
      what:'티무르의 후예 바부르가 델리 술탄 왕조를 무너뜨리고 무굴 제국을 세웠다.',
      why:'아크바르 황제는 힌두교와 이슬람교의 화합 정책을 펴 제국을 안정시켰다.',
      changed:'페르시아·인도 문화가 융합된 무굴 회화와 타지마할 같은 건축이 이 시기에 꽃핀다.'
    },
    figures:[{name:'아크바르', role:'무굴 전성기'}]
  },

  world_1588_armada: {
    id:'world_1588_armada', title:'에스파냐 무적함대의 패배와 영국의 부상', start:1588, end:1603,
    regionKey:'europe', region:'유럽 (영국·에스파냐)', location:[50.5, -3.5],
    type:'WAR', visual:'radiate', priority:2,
    summary:{
      what:'절대왕정의 전성기를 구가하던 에스파냐의 무적함대가 영국 해군에 패했다.',
      why:'엘리자베스 1세의 영국이 해상 세력으로 떠오르는 결정적 계기가 됐다.',
      changed:'이후 영국·네덜란드가 동인도회사를 세워 아시아 무역과 식민지 경쟁에 본격적으로 뛰어든다.'
    },
    figures:[{name:'엘리자베스 1세', role:'영국 절대왕정'}]
  },

  world_1600_edo: {
    id:'world_1600_edo', title:'일본 에도 막부의 성립과 쇄국', start:1603, end:1853,
    regionKey:'east_asia', region:'동아시아 (일본)', location:[35.6762, 139.6503],
    type:'POLITICS', visual:'flow', priority:1,
    summary:{
      what:'도쿠가와 이에야스가 세키가하라 전투에서 승리해 에도 막부를 열고 약 260년간 이어질 통치를 시작했다.',
      why:'산킨코타이 제도로 다이묘를 통제하며 병농분리·쇄국 정책으로 사회를 안정시켰다.',
      changed:'크리스트교와 통상을 엄격히 제한하되 나가사키 데지마를 통해 네덜란드와만 교역하며 난학을 받아들인다.'
    },
    figures:[{name:'도쿠가와 이에야스', role:'에도 막부 개창'}]
  },

  world_1618_thirty_years: {
    id:'world_1618_thirty_years', title:'30년 전쟁과 베스트팔렌 조약', start:1618, end:1648,
    regionKey:'europe', region:'유럽 (독일)', location:[51.0, 10.0],
    type:'WAR', visual:'expand', priority:1,
    summary:{
      what:'신성로마제국의 신교 탄압에서 시작된 종교전쟁이 유럽 여러 나라가 뒤섞인 국제전으로 커졌다.',
      why:'가톨릭과 신교 진영을 넘어 각국이 자국의 이해관계에 따라 전쟁에 가담했다.',
      changed:'전쟁 후 베스트팔렌 조약으로 신성로마제국은 사실상 유명무실해지고, 주권국가 중심의 근대 유럽 질서가 싹튼다.'
    },
    figures:[]
  },

  world_1636_qing: {
    id:'world_1636_qing', title:'청의 건국과 명의 멸망', start:1616, end:1644,
    regionKey:'east_asia', region:'동아시아 (만주·베이징)', location:[39.9042, 116.4074],
    type:'EMPIRE', visual:'expand', priority:1,
    summary:{
      what:'만주족을 통일한 누르하치가 후금을 세웠고, 그 아들 홍타이지가 국호를 청으로 바꿨으며 조선을 침략(병자호란)했다.',
      why:'이자성의 농민반란으로 명이 무너지자 청은 팔기군을 앞세워 베이징을 점령해 중원의 새 주인이 됐다.',
      changed:'조선은 명에 대한 의리와 청에 대한 사대 사이에서 큰 충격을 받았고, 이는 북벌론·북학론 논쟁으로 이어진다.'
    },
    figures:[{name:'누르하치', role:'후금 건국'}, {name:'홍타이지', role:'국호 청으로 개칭'}]
  },

  world_1642_english_civil_war: {
    id:'world_1642_english_civil_war', title:'영국 청교도혁명과 명예혁명', start:1642, end:1689,
    regionKey:'europe', region:'유럽 (영국)', location:[51.5074, -0.1278],
    type:'REVOLUTION', visual:'radiate', priority:1,
    summary:{
      what:'왕권신수설을 고수한 찰스 1세와 의회가 충돌해 내전 끝에 왕이 처형되고 공화정이 들어섰다(청교도혁명).',
      why:'왕정복고 후에도 전제정치가 되풀이되자 의회는 1688년 유혈 없이 제임스 2세를 몰아냈다(명예혁명).',
      changed:'권리장전이 승인되며 왕이 의회 안에 있다는 원칙이 확립돼, 이후 내각책임제로 이어지는 입헌군주제의 틀이 잡힌다.'
    },
    figures:[{name:'크롬웰', role:'청교도혁명 주도'}]
  },

  world_1687_newton: {
    id:'world_1687_newton', title:'뉴턴과 과학혁명', start:1543, end:1687,
    regionKey:'europe', region:'유럽', location:[52.2, 0.12],
    type:'TECH', visual:'spread', priority:1,
    summary:{
      what:'코페르니쿠스의 지동설에서 시작해 갈릴레이·케플러를 거쳐 뉴턴이 만유인력의 법칙으로 우주의 운동을 수학적으로 설명했다.',
      why:'관찰과 실험에 기반한 합리적 사고방식이 신학 중심의 중세적 세계관을 대체해 갔다.',
      changed:'이 합리주의는 이후 계몽사상으로 이어져 절대왕정을 비판하는 사상적 무기가 된다.'
    },
    figures:[{name:'뉴턴', role:'만유인력의 법칙'}]
  },

  world_1689_absolutism: {
    id:'world_1689_absolutism', title:'루이 14세와 절대왕정의 전성기', start:1643, end:1715,
    regionKey:'europe', region:'유럽 (프랑스)', location:[48.8566, 2.3522],
    type:'POLITICS', visual:'radiate', priority:2,
    summary:{
      what:'"짐이 곧 국가"라 칭한 루이 14세가 베르사유 궁전을 짓고 왕권신수설에 기반한 절대왕정의 절정을 이뤘다.',
      why:'상비군·관료제를 정비하고 콜베르를 등용해 중상주의 정책을 강력히 추진했다.',
      changed:'유럽 각국 군주들이 베르사유를 본떠 왕권을 과시했지만, 잦은 전쟁과 재정 낭비는 훗날 프랑스혁명의 배경이 된다.'
    },
    figures:[{name:'루이 14세', role:'프랑스 절대왕정'}]
  },

  world_1740_qianlong: {
    id:'world_1740_qianlong', title:'청 건륭제와 중화제국의 최대 판도', start:1735, end:1796,
    regionKey:'east_asia', region:'동아시아 (베이징)', location:[39.9042, 116.4074],
    type:'EMPIRE', visual:'expand', priority:1,
    summary:{
      what:'청의 전성기를 이끈 건륭제는 티베트·신장·몽골을 정복해 오늘날 중국 영토의 대부분을 확보했다.',
      why:'만주족·한족·몽골족을 아우르는 다민족 제국을 이루며 조공·책봉 질서로 동아시아 국제관계를 주도했다.',
      changed:'서양에는 광저우 한 곳만 개방하며 자신감을 보였지만, 이는 훗날 서양과의 충돌에서 뒤처지는 배경이 된다.'
    },
    figures:[{name:'건륭제', role:'청 최대 판도'}]
  },

  world_1776_enlightenment: {
    id:'world_1776_enlightenment', title:'계몽사상과 미국독립혁명', start:1690, end:1783,
    regionKey:'europe', region:'유럽·북아메리카', location:[38.9072, -77.0369],
    type:'REVOLUTION', visual:'spread', priority:1,
    summary:{
      what:'로크·몽테스키외·루소 등 계몽사상가들이 자유·평등과 사회계약론을 내세워 절대왕정을 비판했고, 북아메리카 13개 식민지는 이를 바탕으로 독립을 선언했다.',
      why:'영국의 과도한 세금 부과에 "대표 없는 곳에 과세 없다"며 반발한 것이 독립전쟁으로 번졌다.',
      changed:'1783년 독립을 승인받은 미국은 삼권분립에 기초한 최초의 근대 공화국이 되며, 그 이념은 프랑스혁명에도 큰 영향을 준다.'
    },
    figures:[{name:'루소', role:'사회계약론'}, {name:'워싱턴', role:'미국 초대 대통령'}]
  },

  world_1789_french_rev: {
    id:'world_1789_french_rev', title:'프랑스 혁명', start:1789, end:1799,
    regionKey:'europe', region:'유럽 (프랑스)', location:[48.8566, 2.3522],
    type:'REVOLUTION', visual:'radiate', priority:1,
    summary:{
      what:'재정 위기 속에 소집된 삼부회에서 제3신분이 국민의회를 결성했고, 파리 시민의 바스티유 습격을 계기로 혁명이 전국으로 번졌다.',
      why:'인권선언으로 자유·평등·국민주권을 천명했지만, 루이 16세 처형 후 로베스피에르의 공포정치를 거치며 급진화됐다.',
      changed:'혁명의 자유·평등 이념은 나폴레옹의 정복 전쟁을 통해 유럽 전역에 퍼지며 근대 시민사회의 토대를 놓는다.'
    },
    figures:[{name:'루이 16세', role:'혁명 중 처형'}, {name:'나폴레옹', role:'혁명 이후 집권'}]
  },

  world_1840_opium_war: {
    id:'world_1840_opium_war', title:'아편전쟁과 중국의 개항', start:1840, end:1860,
    regionKey:'east_asia', region:'동아시아 (중국)', location:[23.1291, 113.2644],
    type:'WAR', visual:'radiate', priority:1,
    summary:{
      what:'차·비단 무역으로 은이 유출되자 영국이 인도산 아편을 밀수출했고, 청이 이를 단속하자 영국이 전쟁을 일으켜 승리했다.',
      why:'패배한 청은 난징조약으로 5개 항구를 개방하고 홍콩을 넘겨주는 등 불평등 조약 체제에 편입됐다.',
      changed:'중화 질서의 중심이던 청의 위신이 크게 흔들리며, 이는 동아시아 전체가 서양 열강 앞에 문호를 개방하는 신호탄이 된다.'
    },
    figures:[]
  },

  world_1853_perry: {
    id:'world_1853_perry', title:'페리 제독과 일본의 개항', start:1853, end:1868,
    regionKey:'east_asia', region:'동아시아 (일본)', location:[35.6762, 139.6503],
    type:'POLITICS', visual:'radiate', priority:1,
    summary:{
      what:'미국의 페리 제독이 군함을 이끌고 일본에 개항을 요구해, 에도 막부는 미일화친조약을 맺어야 했다.',
      why:'청이 아편전쟁에서 패했다는 소식에 위기감을 느끼던 일본은 결국 문호를 열었다.',
      changed:'막부에 대한 불만이 커지며 1868년 메이지 유신으로 이어져, 일본은 동아시아에서 가장 먼저 근대화에 나선다.'
    },
    figures:[{name:'페리', role:'일본 개항 압박'}]
  },

  // ═══════════════════════════════════════════════════════
  // 2026-08-06 세계사 역설계 1차 (왕두목 확정) — 조선 파일럿.
  // 기존 18건이 유럽(9)·동아시아(6)에 쏠려 있어, 비어 있던 지역 슬롯
  // (중동·이슬람 / 남아시아 / 동남아 / 아메리카 / 아프리카 / 오세아니아)을
  // 세기당 굵직한 앵커 중심으로 채웠다. 원칙:
  //   - 지도엔 굵은 앵커만, 깊이는 자료실 (루트·시리즈는 후속 작업)
  //   - 원주민·무문자 지역은 빈칸이 아니라 배경 카드로 (world_bg_*)
  //   - 기록 없는 지역 ≠ 아무 일 없던 지역 — 편집원칙의 세계사 적용
  // ═══════════════════════════════════════════════════════

  // ── 15세기 ──
  world_1392_timur: {
    id:'world_1392_timur', title:'티무르 제국과 사마르칸트', start:1392, end:1507,
    regionKey:'eurasia', region:'중앙아시아 (사마르칸트)', location:[39.6547, 66.9758],
    type:'EMPIRE', visual:'expand', priority:2,
    summary:{
      what:'몽골 제국의 후계자를 자처한 티무르가 중앙아시아에서 인도·서아시아까지 정복하고, 수도 사마르칸트를 학문과 건축의 중심지로 키웠다.',
      why:'조선이 건국되던 바로 그 시절, 유라시아 내륙의 최강자는 명도 유럽도 아닌 티무르였다.',
      changed:'티무르의 손자 울루그 베그가 세운 천문대는 세종 시대 조선 천문학과 같은 시대에, 서로 모른 채 같은 하늘을 계산하고 있었다.'
    },
    figures:[{name:'티무르', role:'제국 건설'},{name:'울루그 베그', role:'천문학자 군주'}]
  },

  world_1400_melaka: {
    id:'world_1400_melaka', title:'믈라카 술탄국 — 바다 실크로드의 관문', start:1400, end:1511,
    regionKey:'sea', region:'동남아시아 (말레이반도)', location:[2.1896, 102.2501],
    type:'ECONOMY', visual:'flow', priority:2,
    summary:{
      what:'말레이반도의 작은 항구 믈라카가 인도양과 남중국해를 잇는 해상 무역의 중심으로 성장했다.',
      why:'정화의 함대가 기착하며 명의 보호를 받았고, 이슬람을 받아들여 동남아시아 이슬람화의 거점이 됐다.',
      changed:'1511년 포르투갈에 함락되며 유럽 세력이 아시아 바다에 발을 딛는 첫 교두보가 된다.'
    },
    figures:[]
  },

  world_1428_aztec: {
    id:'world_1428_aztec', title:'아스테카 — 호수 위의 대도시 테노치티틀란', start:1428, end:1521,
    regionKey:'north_america', region:'아메리카 (멕시코 고원)', location:[19.4326, -99.1332],
    type:'EMPIRE', visual:'expand', priority:2,
    summary:{
      what:'멕시코 고원의 아스테카가 삼각동맹을 맺고 주변을 아우르는 제국으로 성장했다. 호수 위에 세운 수도 테노치티틀란은 인구 20만을 헤아리는 당대 세계 최대급 도시였다.',
      why:'세종이 한글을 만들던 시대의 아메리카는 비어 있는 땅이 아니라, 거대한 도시 문명이 돌아가는 대륙이었다.',
      changed:'1521년 에스파냐의 코르테스에게 정복당하며 아메리카 식민 지배의 출발점이 된다.'
    },
    figures:[{name:'코르테스', role:'에스파냐 정복자'}]
  },

  world_1438_inca: {
    id:'world_1438_inca', title:'잉카 제국 — 안데스를 잇는 길의 제국', start:1438, end:1533,
    regionKey:'south_america', region:'아메리카 (안데스)', location:[-13.5320, -71.9675],
    type:'EMPIRE', visual:'expand', priority:2,
    summary:{
      what:'파차쿠티 황제 아래 쿠스코의 잉카가 안데스 산맥을 따라 남북 4천 킬로미터에 이르는 제국을 세웠다.',
      why:'문자는 없었지만 매듭 기록(키푸)과 총연장 수만 킬로미터의 도로망으로 광대한 영토를 운영했다 — 기록 방식이 다를 뿐, 기록이 없던 것이 아니다.',
      changed:'1533년 피사로의 에스파냐군에게 무너지고, 안데스의 은이 곧 세계 경제를 뒤흔들게 된다.'
    },
    figures:[{name:'파차쿠티', role:'제국 확장'},{name:'피사로', role:'에스파냐 정복자'}]
  },

  world_1464_songhai: {
    id:'world_1464_songhai', title:'송가이 제국과 학문 도시 팀북투', start:1464, end:1591,
    regionKey:'africa', region:'아프리카 (서아프리카)', location:[16.7735, -3.0074],
    type:'CULTURE', visual:'spread', priority:2,
    summary:{
      what:'니제르강 유역의 송가이가 서아프리카 최대 제국으로 성장했고, 팀북투는 수만 권의 필사본과 수천 명의 학생이 모이는 학문 도시로 번영했다.',
      why:'세조에서 선조에 이르는 시대, 사하라 남쪽에는 금 무역과 이슬람 학문이 결합한 문명이 융성하고 있었다.',
      changed:'1591년 모로코군의 총포 앞에 무너졌지만, 팀북투의 필사본 수십만 장은 지금도 남아 "아프리카에는 기록이 없다"는 통념을 반박한다.'
    },
    figures:[{name:'아스키아 무함마드', role:'전성기의 통치자'}]
  },

  // ── 16세기 ──
  world_1501_safavid: {
    id:'world_1501_safavid', title:'사파비 왕조 — 시아파 이란의 성립', start:1501, end:1736,
    regionKey:'mideast', region:'중동 (이란)', location:[32.6539, 51.6660],
    type:'POLITICS', visual:'flow', priority:2,
    summary:{
      what:'사파비 왕조가 이란을 통일하고 시아파 이슬람을 국교로 삼았다. 수도 이스파한은 "세계의 절반"이라 불릴 만큼 번영했다.',
      why:'수니파 오스만과의 대립 구도가 이때 굳어져, 오늘날까지 이어지는 중동 종파 지형의 원형이 된다.',
      changed:'이란 현대사 루트에서 다루는 이란의 정체성 — 그 뿌리가 조선 연산군~중종 시대에 놓였다.'
    },
    figures:[{name:'이스마일 1세', role:'왕조 창건'},{name:'아바스 1세', role:'전성기의 통치자'}]
  },

  world_1520_suleiman: {
    id:'world_1520_suleiman', title:'오스만 제국의 전성기 — 술레이만 1세', start:1520, end:1566,
    regionKey:'mideast', region:'중동·유럽 접경 (이스탄불)', location:[41.0082, 28.9784],
    type:'EMPIRE', visual:'expand', priority:2,
    summary:{
      what:'술레이만 1세의 오스만 제국이 헝가리에서 북아프리카·페르시아만까지 세 대륙에 걸친 최대 판도를 이뤘고, 1529년에는 빈을 포위해 유럽을 떨게 했다.',
      why:'종교개혁으로 갈라진 유럽에게 오스만은 최대의 외부 압력이었다 — 루터의 개혁이 살아남은 데는 이 압력도 한몫했다.',
      changed:'법전을 정비해 "입법자"로 불린 그의 시대는 중종~명종 시대와 겹친다. 같은 시기 조선도 경국대전 체제를 다듬고 있었다.'
    },
    figures:[{name:'술레이만 1세', role:'최대 판도와 법전 정비'}]
  },

  world_1502_slave_trade: {
    id:'world_1502_slave_trade', title:'대서양 노예무역 — 360년의 강제 이주', start:1502, end:1867,
    regionKey:'africa', region:'아프리카~아메리카 (대서양)', location:[14.6672, -17.3980],
    type:'ECONOMY', visual:'flow', priority:2,
    summary:{
      what:'아프리카에서 아메리카로 사람을 사고파는 무역이 시작돼 360여 년간 이어졌다. 강제로 실려 간 사람은 학계 추산 1,200만 명이 넘는다.',
      why:'아메리카의 은광과 사탕수수·면화 농장이 요구한 노동력을, 유럽 상인들이 아프리카인의 몸으로 채운 것이다 — 근대 세계경제의 번영 아래 놓인 토대였다.',
      changed:'조선의 전 시대와 나란히 흐른 이 강제 이주는 아메리카의 인구·문화 지형을 바꿨고, 그 상처와 저항의 기록은 아이티 혁명으로 이어진다.'
    },
    figures:[]
  },

  world_1545_potosi: {
    id:'world_1545_potosi', title:'포토시 은광 — 세계를 하나로 묶은 은', start:1545, end:1650,
    regionKey:'south_america', region:'아메리카 (안데스)', location:[-19.5836, -65.7531],
    type:'ECONOMY', visual:'wave', priority:1,
    summary:{
      what:'안데스 고원 포토시에서 사상 최대의 은광이 발견됐다. 원주민의 강제 노동으로 캐낸 은이 유럽과 마닐라를 거쳐 명으로 흘러들었다.',
      why:'명이 세금을 은으로 걷기 시작하면서 세계의 은이 중국으로 빨려 들어갔고, 처음으로 지구 전체가 하나의 경제로 연결됐다.',
      changed:'일본 은과 아메리카 은이 함께 명으로 흐르던 이 은의 시대 한가운데에서 임진왜란이 터진다 — 조선의 전쟁은 세계 경제와 무관하지 않았다.'
    },
    figures:[]
  },

  world_1571_manila: {
    id:'world_1571_manila', title:'마닐라 갈레온 — 태평양을 건넌 무역선', start:1571, end:1815,
    regionKey:'sea', region:'동남아시아 (필리핀)', location:[14.5995, 120.9842],
    type:'ECONOMY', visual:'flow', priority:2,
    summary:{
      what:'에스파냐가 마닐라를 세우고, 멕시코 아카풀코와 마닐라를 잇는 갈레온 무역선을 240여 년간 운항했다.',
      why:'아메리카의 은과 중국의 비단·도자기가 태평양 위에서 맞바뀌었다 — 태평양이 처음으로 세계 무역의 바다가 된 것이다.',
      changed:'선조 시대에 열린 이 항로로 아메리카의 고추·감자·옥수수가 아시아로 퍼졌고, 그중 고추는 조선의 밥상을 영원히 바꾼다.'
    },
    figures:[]
  },

  // ── 17세기 ──
  world_1602_voc: {
    id:'world_1602_voc', title:'네덜란드 동인도회사(VOC)와 바타비아', start:1602, end:1799,
    regionKey:'sea', region:'동남아시아 (자바)', location:[-6.2088, 106.8456],
    type:'ECONOMY', visual:'flow', priority:2,
    summary:{
      what:'네덜란드가 세계 최초의 주식회사인 동인도회사를 세우고, 자바의 바타비아(자카르타)를 거점으로 아시아 향신료 무역을 장악했다.',
      why:'국가가 아닌 회사가 군대와 식민지를 가진 첫 사례로, 이후 영국 동인도회사와 함께 회사가 제국이 되는 시대를 연다.',
      changed:'효종 4년(1653) 제주에 표류한 하멜이 바로 이 회사의 선원이었다 — 조선이 서양과 마주친 통로도 이 무역망이었다.'
    },
    figures:[{name:'하멜', role:'VOC 선원, 제주 표류'}]
  },

  // ── 18세기 ──
  world_1757_plassey: {
    id:'world_1757_plassey', title:'플라시 전투 — 회사가 인도를 지배하다', start:1757, end:1857,
    regionKey:'south_asia', region:'남아시아 (벵골)', location:[23.8036, 88.2529],
    type:'WAR', visual:'spread', priority:2,
    summary:{
      what:'영국 동인도회사가 플라시 전투에서 벵골 태수를 꺾고, 인도에서 가장 부유한 벵골의 징세권을 손에 넣었다.',
      why:'전투 자체보다 매수와 배신이 승부를 갈랐다. 이후 100년간 인도는 국가가 아닌 회사의 지배를 받는다.',
      changed:'영조가 탕평책을 펴던 시대, 무굴 제국의 해체와 함께 아시아 최대의 부가 영국으로 흐르기 시작했다 — 산업혁명의 밑천 중 하나였다.'
    },
    figures:[{name:'클라이브', role:'동인도회사 지휘관'}]
  },

  world_1770_cook: {
    id:'world_1770_cook', title:'쿡의 태평양 항해와 오스트레일리아 식민화', start:1768, end:1788,
    regionKey:'oceania', region:'오세아니아', location:[-33.8688, 151.2093],
    type:'POLITICS', visual:'flow', priority:2,
    summary:{
      what:'영국의 쿡 선장이 태평양을 세 차례 항해하며 뉴질랜드와 오스트레일리아 동해안을 지도에 올렸고, 1788년 영국은 시드니에 유형 식민지를 세웠다.',
      why:'유럽에게는 "발견"이었지만, 그 땅에는 6만 년을 살아온 사람들이 있었다 — 영국은 이를 "주인 없는 땅"이라 선언하고 지웠다.',
      changed:'정조가 규장각을 키우던 시대, 지구 반대편에서는 한 대륙 원주민의 세계가 뿌리째 흔들리기 시작했다.'
    },
    figures:[{name:'제임스 쿡', role:'태평양 항해'}]
  },

  world_1791_haiti: {
    id:'world_1791_haiti', title:'아이티 혁명 — 노예들이 세운 첫 공화국', start:1791, end:1804,
    regionKey:'north_america', region:'아메리카 (카리브)', location:[18.5392, -72.3364],
    type:'REVOLUTION', visual:'radiate', priority:1,
    summary:{
      what:'프랑스 식민지 생도맹그의 노예들이 봉기해 나폴레옹의 군대까지 물리치고, 1804년 세계 최초의 흑인 공화국 아이티를 세웠다.',
      why:'"모든 인간은 자유롭다"는 프랑스 혁명의 선언을, 정작 그 선언에서 배제됐던 노예들이 끝까지 밀어붙인 사건이다.',
      changed:'노예제 위에 선 대서양 세계 전체를 뒤흔들었고, 이후 아메리카 각국의 노예제 폐지에 불씨가 된다.'
    },
    figures:[{name:'투생 루베르튀르', role:'혁명 지도자'}]
  },

  // ── 19세기 ──
  world_1839_tanzimat: {
    id:'world_1839_tanzimat', title:'오스만 탄지마트 — 제국의 개혁 실험', start:1839, end:1876,
    regionKey:'mideast', region:'중동·유럽 접경 (이스탄불)', location:[41.0082, 28.9784],
    type:'POLITICS', visual:'flow', priority:2,
    summary:{
      what:'서구 열강의 압박에 밀리던 오스만 제국이 법 앞의 평등과 행정·군사 개혁을 내건 위로부터의 개혁, 탄지마트를 단행했다.',
      why:'전통 제국이 서구식 근대를 이식해 살아남으려 한 최초의 대규모 실험이었다 — 성과와 반발이 함께 쌓였다.',
      changed:'같은 압박 앞에서 청은 양무운동을, 일본은 메이지 유신을, 조선은 개화 논쟁을 시작한다. 흥선대원군과 고종의 시대는 이 세계적 물음의 한국판이었다.'
    },
    figures:[]
  },

  world_1857_sepoy: {
    id:'world_1857_sepoy', title:'세포이 항쟁 — 인도, 회사 지배에 맞서다', start:1857, end:1858,
    regionKey:'south_asia', region:'남아시아 (델리)', location:[28.6139, 77.2090],
    type:'WAR', visual:'radiate', priority:2,
    summary:{
      what:'동인도회사의 인도인 용병(세포이)들이 봉기해 델리를 점령하고 무굴 황제를 다시 세웠으나, 1년여 만에 진압됐다.',
      why:'종교 관습을 무시한 탄약 문제가 도화선이었지만, 바탕에는 100년 회사 지배에 쌓인 분노가 있었다.',
      changed:'영국은 회사를 해산하고 인도를 국왕 직할로 바꿨다. 철종 말년의 이 사건은 훗날 인도 독립운동이 기억을 길어 올리는 첫 우물이 된다.'
    },
    figures:[]
  },

  // ── 지역 배경 카드 ──
  // 사건 단위 기록이 성기게 남은 지역을 빈칸으로 두지 않기 위한 상설
  // 카드. 쿡 항해(1768) 카드가 켜지는 시점에 꺼지도록 end를 맞췄다.
  world_bg_oceania: {
    id:'world_bg_oceania', title:'오세아니아 — 6만 년의 대륙, 별을 읽는 항해자들', start:1392, end:1768,
    regionKey:'oceania', region:'오세아니아', location:[-25.0, 133.0],
    type:'CULTURE', visual:'spread', priority:3,
    summary:{
      what:'조선 오백 년 내내 오스트레일리아에는 6만 년을 이어온 애버리지니의 세계가, 태평양에는 별과 해류를 읽으며 카누로 대양을 건너온 폴리네시아인의 섬 세계가 있었다.',
      why:'문자 기록이 없다는 이유로 "역사 없는 땅"으로 불려 왔지만, 노래와 지형에 새긴 기억(송라인)과 항해술은 그 자체로 정교한 지식 체계였다.',
      changed:'이 세계는 1768년 쿡의 항해 이후 격변을 맞는다 — 기록이 없던 것이 아니라, 기록의 방식이 달랐을 뿐이다.'
    },
    figures:[]
  }

};
