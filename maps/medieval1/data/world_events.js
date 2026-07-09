// ═══════════════════════════════════════════════════════
// maps/medieval1/data/world_events.js — 세계의 흐름 (World Layer)
// 고려시대(918~1392)와 같은 시간대의 세계. 스키마는 고대 지도와 동일.
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

  world_916_liao: {
    id:'world_916_liao', title:'거란의 건국과 요의 팽창', start:916, end:1125,
    regionKey:'east_asia', region:'동아시아 (만주·화북)', location:[43.6, 122.3],
    type:'EMPIRE', visual:'expand', priority:1,
    summary:{
      what:'야율아보기가 여러 유목 부족을 통일해 거란을 세우고, 곧 발해를 멸망시킨 뒤 국호를 요로 바꿨다.',
      why:'만리장성 이남의 연운 16주까지 차지하며 송을 압박하는 강력한 정복 왕조로 발전했다.',
      changed:'요는 송과 전연의 맹약을 맺어 매년 막대한 세폐를 받았고, 고려도 여러 차례 침입을 받는다.'
    },
    figures:[{name:'야율아보기', role:'거란 건국'}]
  },

  world_960_song: {
    id:'world_960_song', title:'송의 건국과 문치주의', start:960, end:1127,
    regionKey:'east_asia', region:'동아시아 (카이펑)', location:[34.7986, 114.3072],
    type:'EMPIRE', visual:'expand', priority:1,
    summary:{
      what:'절도사 출신 조광윤이 5대 10국의 혼란을 수습하고 송을 세워, 문신을 우대하는 문치주의로 황제권을 강화했다.',
      why:'절도사의 권한을 회수하고 과거에 전시(황제가 직접 주관하는 시험)를 도입해 황제 독재 체제를 굳혔다.',
      changed:'국방력은 약해져 요·서하에 막대한 세폐를 바쳐야 했지만, 화약·나침반·활판인쇄술이 크게 발달한다.'
    },
    figures:[{name:'조광윤(송 태조)', role:'송 건국'}]
  },

  world_962_hre: {
    id:'world_962_hre', title:'신성로마제국의 성립', start:962, end:962,
    regionKey:'europe', region:'유럽 (독일·이탈리아)', location:[50.1109, 8.6821],
    type:'POLITICS', visual:'radiate', priority:3,
    summary:{
      what:'동프랑크의 오토 1세가 마자르족을 격퇴하고 교황에게서 로마 황제의 관을 받았다.',
      why:'카롤루스 대제의 후예를 자처하며 서유럽 크리스트교 세계의 정치적 권위를 이으려 했다.',
      changed:'이후 신성로마제국 황제는 제후들의 선거로 뽑혀 실권이 약했고, 이탈리아 문제에 매달려 본국 통치는 소홀해진다.'
    },
    figures:[{name:'오토 1세', role:'신성로마제국 초대 황제'}]
  },

  world_1054_schism: {
    id:'world_1054_schism', title:'동서 교회의 분열', start:1054, end:1054,
    regionKey:'europe', region:'유럽 (로마·콘스탄티노폴리스)', location:[41.9, 20.5],
    type:'IDEA', visual:'flow', priority:3,
    summary:{
      what:'성상 숭배를 둘러싼 오랜 갈등 끝에 크리스트교 세계가 로마 가톨릭과 그리스 정교회로 완전히 갈라섰다.',
      why:'로마 교회는 교황을, 콘스탄티노폴리스 교회는 비잔티움 황제를 중심으로 각자의 길을 걸어왔다.',
      changed:'이후 서유럽은 교황권 중심으로, 동유럽·러시아는 정교회 문화권으로 서로 다른 길을 걷는다.'
    },
    figures:[]
  },

  world_1066_norman: {
    id:'world_1066_norman', title:'노르만 정복과 잉글랜드', start:1066, end:1066,
    regionKey:'europe', region:'유럽 (잉글랜드)', location:[51.5074, -0.1278],
    type:'WAR', visual:'radiate', priority:3,
    summary:{
      what:'노르망디 공 윌리엄이 잉글랜드를 정복해 노르만 왕조를 열었다.',
      why:'그는 전국적인 토지 조사(둠즈데이 북)를 실시하는 등 강력한 중앙집권적 봉건제를 이식했다.',
      changed:'프랑스어를 쓰는 지배층과 영어를 쓰는 피지배층이 뒤섞이며 오늘날 영어의 바탕이 만들어진다.'
    },
    figures:[{name:'윌리엄 1세', role:'노르만 왕조 개창'}]
  },

  world_1096_crusades: {
    id:'world_1096_crusades', title:'십자군 전쟁', start:1096, end:1291,
    regionKey:'mideast', region:'중동 (예루살렘)', location:[31.7683, 35.2137],
    type:'WAR', visual:'expand', priority:1,
    summary:{
      what:'셀주크 튀르크에 위협받던 비잔티움의 요청으로 교황이 성지 회복을 호소하며 200년에 걸친 십자군 전쟁이 시작됐다.',
      why:'1차 원정만 예루살렘 탈환에 성공했을 뿐, 이후 원정은 대부분 실패하거나 약탈로 변질됐다.',
      changed:'교황권이 쇠퇴하고 봉건 영주·기사층이 몰락한 반면, 동방과의 교역이 늘며 이탈리아 도시들이 크게 번성한다.'
    },
    figures:[{name:'우르바누스 2세', role:'십자군 호소'}]
  },

  world_1115_jin: {
    id:'world_1115_jin', title:'여진의 금 건국과 정강의 변', start:1115, end:1234,
    regionKey:'east_asia', region:'동아시아 (만주)', location:[45.75, 126.65],
    type:'EMPIRE', visual:'expand', priority:1,
    summary:{
      what:'만주의 여진족을 완옌부의 아구다가 통일해 금을 세우고, 곧 요를 멸망시킨 뒤 송의 수도를 함락해 황제를 사로잡았다(정강의 변).',
      why:'송은 강남으로 밀려나 남송을 세워야 했고, 금은 화북을 차지하는 정복 왕조로 군림했다.',
      changed:'고려도 금에 사대하는 관계를 맺게 되며, 이는 이자겸의 난·묘청의 서경천도운동 등 국내 정치 갈등의 배경이 된다.'
    },
    figures:[{name:'아구다', role:'금 건국'}]
  },

  world_1127_southern_song: {
    id:'world_1127_southern_song', title:'남송과 몽골의 압박', start:1127, end:1279,
    regionKey:'east_asia', region:'동아시아 (임안)', location:[30.2741, 120.1551],
    type:'EMPIRE', visual:'flow', priority:1,
    summary:{
      what:'금에 화북을 빼앗긴 송 황실은 강남으로 옮겨 임안(항저우)을 수도로 남송을 이었다.',
      why:'강남 개발과 해상 무역으로 경제는 크게 번영했지만, 군사력은 약해 금·몽골에 계속 시달렸다.',
      changed:'주희가 성리학을 집대성한 것도 이 시기로, 이 사상은 훗날 고려 말 안향을 통해 한반도에 전해진다.'
    },
    figures:[{name:'주희', role:'성리학 집대성'}]
  },

  world_1185_kamakura: {
    id:'world_1185_kamakura', title:'일본 가마쿠라 막부의 성립', start:1185, end:1333,
    regionKey:'east_asia', region:'동아시아 (일본)', location:[35.3197, 139.5466],
    type:'POLITICS', visual:'radiate', priority:2,
    summary:{
      what:'미나모토노 요리토모가 귀족 세력을 제압하고 일본 최초의 무사 정권인 가마쿠라 막부를 열었다.',
      why:'천황은 상징적 존재로 남고, 쇼군이 무사를 통솔하는 일본 특유의 봉건제가 이때부터 자리잡았다.',
      changed:'13세기 후반 두 차례 몽골의 침입을 막아내지만, 그 과정의 재정 부담으로 막부는 점차 쇠퇴한다.'
    },
    figures:[{name:'미나모토노 요리토모', role:'초대 쇼군'}]
  },

  world_1206_mongol: {
    id:'world_1206_mongol', title:'칭기즈칸과 몽골 제국의 팽창', start:1206, end:1368,
    regionKey:'eurasia', region:'유라시아 전역', location:[47.9, 106.9],
    type:'EMPIRE', visual:'expand', priority:1,
    summary:{
      what:'테무친이 몽골 초원을 통일해 칭기즈칸에 추대되고, 이후 서하·금·중앙아시아를 정복하며 인류 역사상 가장 넓은 제국을 세웠다.',
      why:'천호제라는 군사·행정 조직으로 유목민을 효율적으로 통솔하고, 정복지에는 역참을 설치해 제국을 연결했다.',
      changed:'몽골이 유라시아를 하나로 묶으며 동서 교역과 문물 교류가 크게 활발해지는 몽골의 평화 시대가 열린다.'
    },
    figures:[{name:'칭기즈칸', role:'몽골 제국 건국'}]
  },

  world_1206_delhi: {
    id:'world_1206_delhi', title:'인도 델리 술탄 시대', start:1206, end:1526,
    regionKey:'south_asia', region:'남아시아 (델리)', location:[28.6139, 77.2090],
    type:'EMPIRE', visual:'expand', priority:2,
    summary:{
      what:'아프가니스탄 방면에서 진출한 이슬람 세력이 델리를 수도로 삼아 약 300년간 다섯 왕조가 교체되며 북인도를 지배했다.',
      why:'세금(지지야)만 내면 신앙의 자유를 허용하는 관용책을 폈지만, 카스트제에 지친 힌두교도들이 이슬람으로 개종하기도 했다.',
      changed:'이슬람 문화와 힌두 문화가 뒤섞이며 인도 사회에 새로운 종교·문화적 다양성이 자리잡는다.'
    },
    figures:[]
  },

  world_1215_magna_carta: {
    id:'world_1215_magna_carta', title:'마그나카르타와 의회의 기원', start:1215, end:1215,
    regionKey:'europe', region:'유럽 (잉글랜드)', location:[51.5074, -0.1278],
    type:'POLITICS', visual:'radiate', priority:2,
    summary:{
      what:'과도한 세금에 반발한 귀족들이 존 왕에게 왕권을 제한하는 대헌장(마그나카르타)을 승인하게 했다.',
      why:'국왕이라도 법과 관습을 넘어설 수 없다는 원칙을 문서로 못박은 최초의 사례로 평가된다.',
      changed:'이후 모범의회가 소집되고 14세기에는 양원제 의회의 기틀이 마련되며 영국 입헌주의의 뿌리가 된다.'
    },
    figures:[]
  },

  world_1258_abbasid_fall: {
    id:'world_1258_abbasid_fall', title:'몽골의 바그다드 함락과 아바스 왕조 멸망', start:1258, end:1258,
    regionKey:'mideast', region:'중동 (바그다드)', location:[33.3152, 44.3661],
    type:'WAR', visual:'radiate', priority:2,
    summary:{
      what:'칭기즈칸의 손자 훌라구가 이끄는 몽골군이 바그다드를 함락시키고 500년 이어온 아바스 왕조를 멸망시켰다.',
      why:'몽골의 서아시아 원정으로 이슬람 세계의 정치적 중심이 무너졌다.',
      changed:'훌라구는 이 지역에 일한국을 세웠고, 이후 이슬람교를 받아들여 이슬람 문화를 이어간다.'
    },
    figures:[{name:'훌라구', role:'일한국 건국'}]
  },

  world_1271_yuan: {
    id:'world_1271_yuan', title:'쿠빌라이 칸과 원의 중국 통일', start:1271, end:1368,
    regionKey:'east_asia', region:'동아시아 (대도·베이징)', location:[39.9042, 116.4074],
    type:'EMPIRE', visual:'expand', priority:1,
    summary:{
      what:'칭기즈칸의 손자 쿠빌라이 칸이 대도(베이징)를 수도로 원을 세우고 1279년 남송을 멸망시켜 중국 전역을 지배했다.',
      why:'몽골인을 최상위에 두고 한족을 가장 차별하는 민족별 신분 정책을 시행했다.',
      changed:'교초(지폐)가 널리 유통되고 역참망이 정비되며 마르코 폴로 같은 여행자들이 오갈 만큼 동서 교류가 활발해진다.'
    },
    figures:[{name:'쿠빌라이 칸', role:'원 세조'}]
  },

  world_1299_ottoman: {
    id:'world_1299_ottoman', title:'오스만 제국의 성립', start:1299, end:1392,
    regionKey:'mideast', region:'중동 (아나톨리아)', location:[39.9, 32.85],
    type:'EMPIRE', visual:'expand', priority:2,
    summary:{
      what:'셀주크 튀르크의 지배에서 벗어난 오스만족이 아나톨리아반도를 중심으로 새 왕조를 세웠다.',
      why:'뛰어난 군사력으로 비잔티움 제국의 영토를 잠식하며 발칸반도까지 진출했다.',
      changed:'이후 1453년 콘스탄티노폴리스를 함락시켜 비잔티움 제국을 멸망시키고 대제국으로 성장한다.'
    },
    figures:[]
  },

  world_1337_hundred_years: {
    id:'world_1337_hundred_years', title:'백년전쟁의 발발', start:1337, end:1392,
    regionKey:'europe', region:'유럽 (프랑스·영국)', location:[48.85, 2.35],
    type:'WAR', visual:'radiate', priority:2,
    summary:{
      what:'프랑스 왕위 계승 문제와 플랑드르 지방을 둘러싼 갈등으로 영국과 프랑스 사이에 장기전이 시작됐다.',
      why:'흑사병 유행과 양국의 농민 반란까지 겹치며 전쟁은 100년 넘게 이어지는 소모전이 됐다.',
      changed:'전쟁 과정에서 양국 모두 왕을 중심으로 결속하며 중앙집권적 국민국가로 발돋움하는 계기가 된다.'
    },
    figures:[]
  },

  world_1347_black_death: {
    id:'world_1347_black_death', title:'흑사병의 유행', start:1347, end:1351,
    regionKey:'europe', region:'유럽 전역', location:[45.4642, 9.19],
    type:'CULTURE', visual:'spread', priority:1,
    summary:{
      what:'중앙아시아에서 시작된 흑사병(페스트)이 실크로드와 지중해 무역로를 타고 유럽 전역으로 퍼졌다.',
      why:'불과 몇 년 만에 유럽 인구의 상당수가 목숨을 잃을 정도로 치명적이었다.',
      changed:'노동력이 급격히 귀해지며 농노의 처지가 개선되고 장원제가 흔들려, 봉건제 해체를 앞당기는 계기가 된다.'
    },
    figures:[]
  },

  world_1368_ming: {
    id:'world_1368_ming', title:'명의 건국과 홍무제', start:1368, end:1392,
    regionKey:'east_asia', region:'동아시아 (난징)', location:[32.0603, 118.7969],
    type:'EMPIRE', visual:'expand', priority:1,
    summary:{
      what:'가난한 농민 출신 주원장이 원을 몰아내고 명을 세워 홍무제로 즉위했다.',
      why:'몽골 세력을 만리장성 북쪽으로 몰아내고 한족 왕조를 부활시켜, 재상제를 없애고 황제 중심 체제를 강화했다.',
      changed:'명은 원의 지배에서 벗어난 고려 말~조선 초 한반도의 대외 관계에 새로운 중심축이 된다.'
    },
    figures:[{name:'홍무제', role:'명 건국'}]
  },

  world_1113_angkor: {
    id:'world_1113_angkor', title:'앙코르 와트와 크메르 제국', start:1113, end:1220,
    regionKey:'sea', region:'동남아시아 (캄보디아)', location:[13.4125, 103.8670],
    type:'CULTURE', visual:'radiate', priority:3,
    summary:{
      what:'캄보디아의 크메르 제국이 수리아바르만 2세 때 힌두교 사원 앙코르 와트를 건립했다.',
      why:'인도 문화의 영향을 받으면서도 독자적인 석조 양식을 발전시켰다.',
      changed:'앙코르 와트는 이후 불교 사원으로 바뀌며 오늘날까지 동남아시아를 대표하는 문화유산으로 남는다.'
    },
    figures:[]
  }

};
