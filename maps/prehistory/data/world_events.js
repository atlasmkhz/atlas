// ═══════════════════════════════════════════════════════
// maps/prehistory/data/world_events.js — 세계의 흐름 (World Layer)
// 선사시대~고조선(약 70만 년 전~기원전 100년)과 같은 시간대의 세계.
// 스키마는 고대 지도 data/world_events.js와 동일.
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

  world_erectus: {
    id:'world_erectus', title:'호모 에렉투스와 불의 사용', start:-1800000, end:-200000,
    regionKey:'eurasia', region:'아프리카~아시아 전역', location:[0.0236, 37.9062],
    type:'CULTURE', visual:'spread', priority:2,
    summary:{
      what:'약 180만 년 전 아프리카에서 출현한 호모 에렉투스가 유럽·아시아 각지로 퍼져나갔다.',
      why:'불과 도구를 사용하고 집단 사냥을 하며 간단한 언어로 의사소통했다.',
      changed:'베이징인·자와인 등으로 불리는 이들의 확산은 인류가 아프리카를 벗어난 첫 이동이었다.'
    },
    figures:[]
  },

  world_neanderthal: {
    id:'world_neanderthal', title:'네안데르탈인과 매장 풍습', start:-400000, end:-28000,
    regionKey:'europe', region:'유럽·지중해 일대', location:[43.2, 2.3],
    type:'CULTURE', visual:'spread', priority:3,
    summary:{
      what:'약 40만 년 전 등장한 네안데르탈인은 뇌 용량이 현생 인류와 비슷했고 다양한 뗀석기를 사용했다.',
      why:'시신을 매장한 흔적이 발견돼 사후 세계에 대한 관념이 있었으리라 추정된다.',
      changed:'호모사피엔스와 오랫동안 공존하다가 약 2만 8천 년 전 멸종했다.'
    },
    figures:[]
  },

  world_sapiens: {
    id:'world_sapiens', title:'호모사피엔스의 출현과 전 세계 확산', start:-200000, end:-10000,
    regionKey:'global', region:'아프리카에서 전 세계로', location:[9.145, 40.4897],
    type:'CULTURE', visual:'spread', priority:1,
    summary:{
      what:'약 20만 년 전 아프리카에서 등장한 호모사피엔스(현생 인류)가 전 세계 각지로 퍼져나갔다.',
      why:'정교한 도구로 사냥·채집을 하며 각지의 자연환경에 적응해 갔다.',
      changed:'유럽의 크로마뇽인, 중국의 상동인 등 각지에 정착하며 오늘날 인류의 직접 조상이 됐다.'
    },
    figures:[]
  },

  world_cave_art: {
    id:'world_cave_art', title:'라스코·알타미라 동굴벽화와 구석기 예술', start:-30000, end:-15000,
    regionKey:'europe', region:'유럽 (프랑스·스페인)', location:[45.05, 1.17],
    type:'CULTURE', visual:'spread', priority:3,
    summary:{
      what:'프랑스 라스코와 스페인 알타미라 동굴에 매머드·들소 등을 그린 벽화가 남겨졌다.',
      why:'사냥의 성공과 풍요를 기원하는 주술적 의미를 담았을 것으로 추정된다.',
      changed:'오스트리아의 빌렌도르프의 비너스 같은 여인상도 같은 시기 다산과 풍요를 기원하며 만들어졌다.'
    },
    figures:[]
  },

  world_neolithic_revolution: {
    id:'world_neolithic_revolution', title:'신석기 혁명 — 농경과 목축의 시작', start:-10000, end:-8000,
    regionKey:'mideast', region:'서아시아 (비옥한 초승달 지대)', location:[36.9, 39.0],
    type:'ECONOMY', visual:'expand', priority:1,
    summary:{
      what:'터키 차탈회위크, 예리코 등지에서 사람들이 정착해 농사를 짓고 가축을 기르기 시작했다.',
      why:'자연에서 그대로 얻던 수렵·채집 단계에서 벗어나 식량을 직접 생산하는 단계로 접어들었다.',
      changed:'정착 생활로 인구가 늘고 촌락이 형성되며, 이 흐름은 한반도를 포함해 전 세계로 퍼진다.'
    },
    figures:[]
  },

  world_stonehenge: {
    id:'world_stonehenge', title:'스톤헨지와 거석 문화', start:-3000, end:-2000,
    regionKey:'europe', region:'유럽 (영국)', location:[51.1789, -1.8262],
    type:'CULTURE', visual:'radiate', priority:3,
    summary:{
      what:'영국 솔즈베리 평원에 거대한 돌기둥을 원형으로 세운 스톤헨지가 만들어졌다.',
      why:'천문 관측과 종교 의식의 장소였을 것으로 추정되며, 유럽 곳곳에 비슷한 거석 기념물이 있다.',
      changed:'거석문화는 같은 시기 동아시아의 고인돌 문화와 더불어 청동기 시대 지배층의 권위를 보여주는 세계적 현상이었다.'
    },
    figures:[]
  },

  world_sumer: {
    id:'world_sumer', title:'수메르 문명과 최초의 도시국가', start:-3500, end:-2000,
    regionKey:'mideast', region:'메소포타미아 (티그리스·유프라테스강)', location:[31.32, 45.64],
    type:'EMPIRE', visual:'expand', priority:1,
    summary:{
      what:'티그리스·유프라테스강 사이 메소포타미아에서 수메르인이 여러 도시국가를 세워 인류 최초의 도시 문명을 열었다.',
      why:'왕이 신의 대리인으로서 신권 정치를 폈고, 쐐기문자로 기록을 남겼다.',
      changed:'이후 아카드·바빌로니아로 이어지며 태음력·60진법 등 후대 문명의 토대를 놓았다.'
    },
    figures:[]
  },

  world_egypt: {
    id:'world_egypt', title:'이집트 통일왕국과 파라오', start:-3000, end:-30,
    regionKey:'africa', region:'아프리카 (나일강)', location:[26.8206, 30.8025],
    type:'EMPIRE', visual:'flow', priority:2,
    summary:{
      what:'나일강 유역의 도시국가들이 기원전 3천년경 통일 왕국을 이뤘고, 왕은 태양신의 아들 파라오로 숭배됐다.',
      why:'사막과 바다로 둘러싸인 폐쇄적 지형 덕에 이민족 침입이 적어 오랫동안 통일 국가를 유지했다.',
      changed:'태양력·상형문자·피라미드 등 독자적 문명을 이루며 3천 년 가까이 지속된다.'
    },
    figures:[]
  },

  world_indus: {
    id:'world_indus', title:'인더스 문명 — 계획도시 하라파와 모헨조다로', start:-2500, end:-1800,
    regionKey:'south_asia', region:'남아시아 (인더스강)', location:[27.3294, 68.1382],
    type:'CULTURE', visual:'expand', priority:2,
    summary:{
      what:'인더스강 유역에서 드라비다인이 하라파·모헨조다로 같은 바둑판식 계획도시를 건설했다.',
      why:'배수 시설과 공중목욕탕을 갖춘 정교한 도시였지만 왕궁 같은 절대 권력의 상징물은 발견되지 않았다.',
      changed:'기원전 1800년경 기후 변화 등으로 쇠퇴한 뒤, 이주해온 아리아인이 새로운 문화를 형성한다.'
    },
    figures:[]
  },

  world_shang: {
    id:'world_shang', title:'상 왕조와 갑골문자', start:-1600, end:-1046,
    regionKey:'east_asia', region:'동아시아 (황허강)', location:[34.75, 113.65],
    type:'EMPIRE', visual:'expand', priority:1,
    summary:{
      what:'황허강 중류에서 일어난 상은 중국 역사상 실존이 확인된 최초의 왕조다.',
      why:'점을 쳐 국가 정책을 결정하는 제정일치 사회로, 그 내용을 갑골에 새긴 갑골문자는 오늘날 한자의 원형이 됐다.',
      changed:'무기와 제기를 청동으로 만들었고, 기원전 11세기 주에게 멸망한다.'
    },
    figures:[]
  },

  world_hammurabi: {
    id:'world_hammurabi', title:'바빌로니아와 함무라비 법전', start:-1800, end:-1530,
    regionKey:'mideast', region:'메소포타미아 (바빌론)', location:[32.5364, 44.4208],
    type:'POLITICS', visual:'radiate', priority:2,
    summary:{
      what:'아모르인이 세운 바빌로니아가 함무라비 왕 때 메소포타미아 전역을 통일했다.',
      why:'282개 조항의 함무라비 법전을 반포해 신분에 따라 형벌을 달리하는 동해보복법 원칙을 성문화했다.',
      changed:'기원전 1530년경 철제 무기로 무장한 히타이트의 침입으로 멸망한다.'
    },
    figures:[{name:'함무라비', role:'바빌로니아 전성기'}]
  },

  world_hittite: {
    id:'world_hittite', title:'히타이트와 철기 문화의 확산', start:-1800, end:-1200,
    regionKey:'mideast', region:'중동 (아나톨리아반도)', location:[39.9, 32.85],
    type:'TECH', visual:'spread', priority:2,
    summary:{
      what:'아나톨리아반도(오늘날 튀르키예)의 히타이트가 철제 무기와 전차를 앞세워 강국으로 성장했다.',
      why:'풍부한 철광을 바탕으로 철기 제작 기술을 독점하다시피 했다.',
      changed:'기원전 12세기 멸망 이후 철기 문화가 서아시아와 유럽 전역으로 퍼져나가는 계기가 됐다.'
    },
    figures:[]
  },

  world_phoenicia_alphabet: {
    id:'world_phoenicia_alphabet', title:'페니키아와 알파벳의 기원', start:-1200, end:-800,
    regionKey:'mideast', region:'지중해 동부 연안', location:[33.8547, 35.8623],
    type:'CULTURE', visual:'spread', priority:2,
    summary:{
      what:'지중해 동부 연안의 페니키아인은 해상 무역으로 번성하며 표음 문자를 고안했다.',
      why:'쐐기문자나 상형문자와 달리 적은 수의 기호만 익히면 쓸 수 있어 지식의 대중화에 기여했다.',
      changed:'이 표음 문자는 그리스 문자를 거쳐 오늘날 알파벳의 기원이 된다.'
    },
    figures:[]
  },

  world_zhou: {
    id:'world_zhou', title:'주나라의 봉건제와 천명사상', start:-1046, end:-256,
    regionKey:'east_asia', region:'동아시아 (황허강)', location:[34.26, 108.93],
    type:'POLITICS', visual:'expand', priority:2,
    summary:{
      what:'상을 무너뜨린 주는 넓어진 영토를 다스리기 위해 왕족·공신에게 땅을 나눠주는 봉건제를 시행했다.',
      why:'하늘이 덕 있는 자에게 권력을 준다는 천명사상으로 왕조 교체를 정당화했다.',
      changed:'이 천명·덕치 사상은 이후 유교를 통해 동아시아 통치 이념의 뿌리가 된다.'
    },
    figures:[]
  },

  world_assyria_persia: {
    id:'world_assyria_persia', title:'아시리아에서 아케메네스 페르시아까지', start:-900, end:-330,
    regionKey:'mideast', region:'중동 (서아시아)', location:[35.5, 45.4],
    type:'EMPIRE', visual:'expand', priority:1,
    summary:{
      what:'철제 무기로 무장한 아시리아가 서아시아를 통일했다가, 이후 페르시아의 키루스·다리우스가 더 큰 제국을 세웠다.',
      why:'아시리아가 정복지를 가혹하게 통치해 각지 반란으로 무너진 반면, 페르시아는 정복지의 종교·관습을 존중하는 관용책을 폈다.',
      changed:'왕의 길·역참제를 정비한 페르시아 제국은 이집트에서 인더스강까지 아우르는 최초의 대제국이 된다.'
    },
    figures:[{name:'다리우스 1세', role:'페르시아 전성기'}]
  },

  world_greek_polis: {
    id:'world_greek_polis', title:'그리스 폴리스와 아테네 민주정', start:-800, end:-338,
    regionKey:'europe', region:'유럽 (그리스)', location:[37.9838, 23.7275],
    type:'POLITICS', visual:'radiate', priority:1,
    summary:{
      what:'산이 많은 그리스에서는 통일 국가 대신 아테네·스파르타 같은 독립 도시국가(폴리스)들이 발달했다.',
      why:'아테네는 페르시아 전쟁 승리 후 클레이스테네스·페리클레스를 거치며 시민이 직접 정치에 참여하는 민주정을 완성했다.',
      changed:'다만 여성·외국인·노예는 제외된 제한적 민주주의였고, 이후 마케도니아에 정복되며 폴리스 시대는 저문다.'
    },
    figures:[{name:'페리클레스', role:'아테네 민주정 전성기'}]
  },

  world_buddha: {
    id:'world_buddha', title:'석가모니와 불교의 성립', start:-600, end:-400,
    regionKey:'south_asia', region:'남아시아 (갠지스강 유역)', location:[27.5, 83.0],
    type:'IDEA', visual:'spread', priority:1,
    summary:{
      what:'카스트제와 브라만교의 형식화된 제사를 비판하며 석가모니가 인간 평등과 해탈을 강조하는 불교를 창시했다.',
      why:'철제 농기구 보급으로 성장한 크샤트리아·바이샤 계층이 브라만 중심 질서에 반발하던 배경에서 나왔다.',
      changed:'불교는 이후 마우리아 왕조 아소카왕의 후원으로 크게 확산되고, 훗날 동아시아 전역에 전해진다.'
    },
    figures:[]
  },

  world_spring_autumn_warring: {
    id:'world_spring_autumn_warring', title:'춘추전국시대와 제자백가', start:-770, end:-221,
    regionKey:'east_asia', region:'동아시아 (중국)', location:[34.75, 113.65],
    type:'IDEA', visual:'spread', priority:1,
    summary:{
      what:'주 왕실의 권위가 무너지며 여러 제후국이 패권을 다투는 약육강식의 시대가 500여 년간 이어졌다.',
      why:'철제 농기구와 우경 보급으로 생산력이 늘고 신분에 관계없이 능력 있는 인재가 등용되며, 공자·노자·한비자 등 제자백가가 앞다퉈 해법을 제시했다.',
      changed:'유가·법가·도가 사상은 이후 동아시아 정치사상의 뼈대가 되고, 마침내 가장 서쪽의 진이 혼란을 통일한다.'
    },
    figures:[{name:'공자', role:'유가 사상의 시조'}]
  },

  world_alexander_hellenism: {
    id:'world_alexander_hellenism', title:'알렉산드로스의 원정과 헬레니즘 세계', start:-334, end:-30,
    regionKey:'mideast', region:'그리스~인더스강', location:[36.2, 36.15],
    type:'EMPIRE', visual:'expand', priority:1,
    summary:{
      what:'마케도니아의 알렉산드로스가 페르시아와 이집트를 정복하고 인더스강까지 진출해 대제국을 세웠다.',
      why:'그는 정복지의 제도와 종교를 존중하며 그리스 문화와 오리엔트 문화를 융합하려 했다.',
      changed:'그의 사후 제국은 분열됐지만, 그리스와 동방 문화가 섞인 헬레니즘 문화가 지중해에서 인도까지 퍼진다.'
    },
    figures:[{name:'알렉산드로스', role:'대제국 건설'}]
  },

  world_qin_han: {
    id:'world_qin_han', title:'진의 통일과 한 제국', start:-221, end:220,
    regionKey:'east_asia', region:'동아시아 (중국)', location:[34.3416, 108.9398],
    type:'EMPIRE', visual:'expand', priority:1,
    summary:{
      what:'진왕 정이 전국시대를 끝내고 중국 최초로 통일해 시황제를 칭했고, 군현제·문자·도량형을 통일했다.',
      why:'진 멸망 후 한 고조 유방이 다시 통일했고, 한 무제는 유교를 통치 이념으로 삼으며 고조선을 정복하고 흉노를 압박했다.',
      changed:'군현제와 유교적 통치 이념은 이후 중국 왕조는 물론 한반도에도 깊은 영향을 남긴다.'
    },
    figures:[{name:'진시황제', role:'중국 최초 통일'}, {name:'한 무제', role:'유교 국교화·고조선 정복'}]
  },

  world_rome_republic: {
    id:'world_rome_republic', title:'로마 공화정과 지중해 제패', start:-509, end:-27,
    regionKey:'europe', region:'유럽 (로마)', location:[41.9028, 12.4964],
    type:'POLITICS', visual:'expand', priority:2,
    summary:{
      what:'왕을 몰아낸 로마는 원로원과 집정관이 다스리는 공화정을 세우고 평민의 권리 확대를 거쳐 이탈리아반도를 통일했다.',
      why:'카르타고와의 포에니 전쟁에서 승리해 서지중해 일대를 장악하며 대제국의 기반을 다졌다.',
      changed:'대외 팽창의 부작용으로 빈부격차가 커지며 공화정은 서서히 흔들리고, 결국 카이사르와 아우구스투스를 거쳐 제정으로 넘어간다.'
    },
    figures:[]
  },

  world_maurya_ashoka: {
    id:'world_maurya_ashoka', title:'마우리아 왕조와 아소카왕의 불교 포교', start:-322, end:-185,
    regionKey:'south_asia', region:'남아시아 (인도)', location:[25.6, 85.1],
    type:'EMPIRE', visual:'expand', priority:2,
    summary:{
      what:'찬드라굽타 마우리아가 인도 최초로 북인도를 통일했고, 손자 아소카왕 때 남부를 뺀 인도 대부분을 아울렀다.',
      why:'아소카왕은 정복 전쟁의 참상을 반성하며 불교의 가르침으로 나라를 다스리고자 돌기둥에 포고문을 새겼다.',
      changed:'상좌부 불교가 스리랑카·동남아시아로 퍼져나가는 계기가 됐다.'
    },
    figures:[{name:'아소카왕', role:'불교 포교'}]
  }

};
