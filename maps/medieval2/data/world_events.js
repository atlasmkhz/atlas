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
  }

};
