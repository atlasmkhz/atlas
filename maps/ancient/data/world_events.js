// ═══════════════════════════════════════════════════════
// maps/ancient/data/world_events.js — 세계의 흐름 (World Layer)
// 삼국~남북국시대(기원전 57~935)와 같은 시간대의 세계.
// 스키마와 철학은 루트(map.html) data/world_events.js와 동일:
// "한국은 깊게, 세계는 넓고 얕게" — 인과 설명이 아니라 같은 시대의 공기.
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

  world_bc44_caesar: {
    id:'world_bc44_caesar', title:'카이사르 암살과 로마 공화정의 종말', start:-44, end:-44,
    regionKey:'europe', region:'유럽 (로마)', location:[41.9028, 12.4964],
    type:'POLITICS', visual:'radiate', priority:2,
    summary:{
      what:'갈리아를 정복하며 권력을 키운 카이사르가 원로원파에게 암살당했다.',
      why:'공화정의 전통을 지키려던 암살이었지만 오히려 내전을 촉발했다.',
      changed:'이후 옥타비아누스가 승리하며 로마는 황제가 다스리는 제정으로 넘어간다.'
    },
    figures:[{name:'카이사르', role:'1차 삼두정치 주도'}]
  },

  world_bc27_augustus: {
    id:'world_bc27_augustus', title:'로마 제정의 시작과 팍스 로마나', start:-27, end:180,
    regionKey:'europe', region:'유럽 (로마)', location:[41.9028, 12.4964],
    type:'EMPIRE', visual:'expand', priority:1,
    summary:{
      what:'옥타비아누스가 아우구스투스 칭호를 받아 사실상 첫 황제가 됐고, 이후 5현제까지 약 200년간 로마는 정치적 안정을 누렸다.',
      why:'공화정의 형식은 유지하면서도 군통수권·재정권을 독점해 황제와 다름없는 권력을 행사했다.',
      changed:'지중해 전역이 하나의 정치·경제권으로 묶이며 도로망·법률·도시가 표준화됐다.'
    },
    figures:[{name:'아우구스투스', role:'초대 황제'}]
  },

  world_313_edict_milan: {
    id:'world_313_edict_milan', title:'밀라노 칙령 — 크리스트교 공인', start:313, end:313,
    regionKey:'europe', region:'유럽 (로마)', location:[45.4642, 9.1900],
    type:'IDEA', visual:'spread', priority:2,
    summary:{
      what:'콘스탄티누스 대제가 밀라노 칙령을 내려 그동안 박해받던 크리스트교를 합법 종교로 인정했다.',
      why:'다신교 제국이던 로마가 유일신 신앙을 받아들이는 전환점이었다.',
      changed:'테오도시우스 대에는 국교로까지 격상되며 이후 유럽 문명의 정신적 기반이 된다.'
    },
    figures:[{name:'콘스탄티누스', role:'로마 황제'}]
  },

  world_395_rome_split: {
    id:'world_395_rome_split', title:'로마 제국, 동서로 갈라지다', start:395, end:395,
    regionKey:'europe', region:'유럽 (로마)', location:[41.9028, 12.4964],
    type:'EMPIRE', visual:'flow', priority:1,
    summary:{
      what:'테오도시우스 황제가 죽으며 로마 제국이 서로마와 동로마로 완전히 나뉘었다.',
      why:'광대해진 제국을 한 사람이 다스리기 어려워졌고 게르만족의 압박도 커지고 있었다.',
      changed:'서로마는 이후 80여 년 만에 무너지지만, 동로마(비잔티움)는 천 년을 더 이어간다.'
    },
    figures:[{name:'테오도시우스', role:'로마 황제'}]
  },

  world_476_fall_rome: {
    id:'world_476_fall_rome', title:'서로마 제국 멸망', start:476, end:476,
    regionKey:'europe', region:'유럽 (로마)', location:[41.9028, 12.4964],
    type:'WAR', visual:'radiate', priority:1,
    summary:{
      what:'게르만족 출신 용병대장 오도아케르가 마지막 서로마 황제를 폐위시켰다.',
      why:'인구 증가로 남하하던 게르만족의 이동이 4세기 말 훈족의 압박으로 더욱 거세졌다.',
      changed:'서유럽은 이후 여러 게르만 왕국으로 재편되며 중세가 시작된다.'
    },
    figures:[{name:'오도아케르', role:'게르만 용병대장'}]
  },

  world_486_franks: {
    id:'world_486_franks', title:'클로비스와 프랑크 왕국 건국', start:486, end:511,
    regionKey:'europe', region:'유럽 (갈리아)', location:[48.8566, 2.3522],
    type:'EMPIRE', visual:'expand', priority:2,
    summary:{
      what:'게르만족의 일파인 프랑크족이 클로비스의 지휘 아래 갈리아 지방에 왕국을 세웠다.',
      why:'클로비스가 로마 가톨릭으로 개종하면서 현지 로마계 주민과의 마찰을 피할 수 있었다.',
      changed:'프랑크 왕국은 서유럽에서 가장 오래 번영한 게르만 국가로 자리잡는다.'
    },
    figures:[{name:'클로비스', role:'메로베우스 왕조 개창'}]
  },

  world_527_justinian: {
    id:'world_527_justinian', title:'유스티니아누스와 비잔티움의 전성기', start:527, end:565,
    regionKey:'europe', region:'유럽 (콘스탄티노폴리스)', location:[41.0082, 28.9784],
    type:'EMPIRE', visual:'expand', priority:1,
    summary:{
      what:'동로마 황제 유스티니아누스가 북아프리카·이탈리아를 되찾고 로마법을 집대성했다.',
      why:'옛 로마 제국의 영광을 되살리려는 시도로 지중해를 다시 손에 넣고자 했다.',
      changed:'유스티니아누스 법전은 훗날 유럽 각국 법체계의 뿌리가 되고, 성소피아 성당이 이 시기에 세워졌다.'
    },
    figures:[{name:'유스티니아누스', role:'비잔티움 황제'}]
  },

  world_581_sui: {
    id:'world_581_sui', title:'수, 남북조를 통일하다', start:581, end:618,
    regionKey:'east_asia', region:'동아시아 (중국)', location:[34.3416, 108.9398],
    type:'EMPIRE', visual:'expand', priority:1,
    summary:{
      what:'양견(수 문제)이 약 400년간 갈라져 있던 중국 남북조를 통일했다.',
      why:'과거제를 도입하고 균전제·조용조·부병제를 정비해 강력한 중앙집권 국가를 세웠다.',
      changed:'뒤이은 양제의 무리한 대운하 건설과 고구려 원정 실패로 수는 곧 무너지지만, 그 제도는 당에 그대로 이어진다.'
    },
    figures:[{name:'수 문제', role:'중국 재통일'}]
  },

  world_618_tang: {
    id:'world_618_tang', title:'당의 건국과 동아시아 국제질서', start:618, end:907,
    regionKey:'east_asia', region:'동아시아 (장안)', location:[34.3416, 108.9398],
    type:'EMPIRE', visual:'expand', priority:1,
    summary:{
      what:'이연이 수를 이어 당을 세웠고, 태종의 정관지치를 거쳐 국제적인 대제국으로 성장했다.',
      why:'율령 체제와 3성6부제를 기반으로 신라·발해·일본 등 주변국에 제도와 문화를 전파했다.',
      changed:'장안은 세계적 국제도시로 번영했고, 8세기 안사의 난 이후 당은 서서히 지방 절도사 중심으로 흔들린다.'
    },
    figures:[{name:'당 태종', role:'정관의 치'}]
  },

  world_610_muhammad: {
    id:'world_610_muhammad', title:'무함마드와 이슬람교의 창시', start:610, end:632,
    regionKey:'mideast', region:'중동 (메카·메디나)', location:[21.4225, 39.8262],
    type:'IDEA', visual:'spread', priority:1,
    summary:{
      what:'메카의 상인 무함마드가 유일신 알라를 믿는 이슬람교를 창시하고 아라비아 반도를 통일했다.',
      why:'부족마다 다른 신을 섬기며 빈부 격차가 심하던 아라비아 사회에서 만민 평등을 내세워 큰 지지를 얻었다.',
      changed:'그의 사후 칼리프가 이끄는 이슬람 세력은 한 세기 만에 서아시아~북아프리카를 아우르는 대제국으로 성장한다.'
    },
    figures:[{name:'무함마드', role:'이슬람교 창시'}]
  },

  world_661_umayyad: {
    id:'world_661_umayyad', title:'우마이야 왕조와 이슬람 세계의 확장', start:661, end:750,
    regionKey:'mideast', region:'중동 (다마스쿠스)', location:[33.5138, 36.2765],
    type:'EMPIRE', visual:'expand', priority:2,
    summary:{
      what:'칼리프 계승 분쟁 끝에 무아위야가 다마스쿠스를 수도로 우마이야 왕조를 열었다.',
      why:'칼리프직이 세습되기 시작하면서 이슬람 공동체는 정통성을 둘러싸고 순니파와 시아파로 갈라졌다.',
      changed:'우마이야 왕조는 중앙아시아부터 이베리아반도까지 뻗은 대제국을 건설했다.'
    },
    figures:[{name:'무아위야', role:'우마이야 왕조 개창'}]
  },

  world_750_abbasid: {
    id:'world_750_abbasid', title:'아바스 왕조와 바그다드의 번영', start:750, end:935,
    regionKey:'mideast', region:'중동 (바그다드)', location:[33.3152, 44.3661],
    type:'CULTURE', visual:'flow', priority:1,
    summary:{
      what:'아바스 가문이 우마이야 왕조를 무너뜨리고 바그다드를 수도로 새 왕조를 열었다.',
      why:'아랍인 우대 정책에 반발한 비아랍 이슬람교도들의 지지를 얻어, 이후 인종을 초월한 이슬람 제국을 지향했다.',
      changed:'바그다드는 동서 문물이 모이는 국제도시로 성장했고, 수학·천문학·의학 등 이슬람 학문이 크게 꽃핀다.'
    },
    figures:[{name:'아부 알아바스', role:'아바스 왕조 개창'}]
  },

  world_800_charlemagne: {
    id:'world_800_charlemagne', title:'카롤루스 대제, 서로마 황제로 대관', start:800, end:800,
    regionKey:'europe', region:'유럽 (로마)', location:[41.9028, 12.4964],
    type:'POLITICS', visual:'radiate', priority:2,
    summary:{
      what:'프랑크 왕국의 카롤루스 대제가 교황으로부터 서로마 황제의 관을 받았다.',
      why:'동로마의 간섭에서 벗어나려던 교황과, 권위를 세우려던 프랑크 왕의 이해가 맞아떨어졌다.',
      changed:'그리스·로마 문화와 게르만 전통, 크리스트교가 융합된 중세 서유럽 문화의 기틀이 마련됐다.'
    },
    figures:[{name:'카롤루스 대제', role:'프랑크 국왕'}]
  },

  world_320_gupta: {
    id:'world_320_gupta', title:'굽타 왕조와 인도 고전문화의 전성기', start:320, end:550,
    regionKey:'south_asia', region:'남아시아 (인도)', location:[25.4358, 81.8463],
    type:'CULTURE', visual:'expand', priority:2,
    summary:{
      what:'찬드라굽타 1세가 갠지스강 유역에 굽타 왕조를 세웠고, 찬드라굽타 2세 때 북·중부 인도를 아우르는 대제국이 됐다.',
      why:'정치적 안정 속에 학문과 예술을 적극 후원해 산스크리트 문학, 굽타 양식 미술이 함께 발달했다.',
      changed:'브라만교와 불교·민간신앙이 융합된 힌두교가 이 시기에 성립해 인도 사회의 뼈대가 된다.'
    },
    figures:[{name:'찬드라굽타 2세', role:'굽타 전성기'}]
  },

  world_250_maya: {
    id:'world_250_maya', title:'마야 문명의 전성기', start:250, end:900,
    regionKey:'north_america', region:'중앙아메리카 (멕시코만 연안)', location:[17.2151, -89.6237],
    type:'CULTURE', visual:'flow', priority:3,
    summary:{
      what:'멕시코만 연안에서 마야인들이 피라미드형 신전을 세우고 독자적인 천문학·달력을 발전시켰다.',
      why:'영(0)의 개념과 20진법을 사용할 만큼 수학·천문 지식이 정교했다.',
      changed:'10세기 무렵 인구 증가에 따른 토지 부족과 기후 변화로 점차 쇠퇴한다.'
    },
    figures:[]
  },

  world_300_yamato: {
    id:'world_300_yamato', title:'일본 야마토 정권과 아스카 문화', start:300, end:700,
    regionKey:'east_asia', region:'동아시아 (일본)', location:[34.6851, 135.8048],
    type:'EMPIRE', visual:'expand', priority:2,
    summary:{
      what:'4세기 무렵 일본 열도에서 야마토 정권이 여러 소국을 통합해 통일 국가로 성장했다.',
      why:'6세기 쇼토쿠 태자가 중국·한반도의 유교·불교를 적극 받아들여 중앙집권 체제를 정비했다.',
      changed:'백제 등 한반도 문물의 영향을 받은 일본 최초의 불교 문화인 아스카 문화가 꽃핀다.'
    },
    figures:[{name:'쇼토쿠 태자', role:'아스카 문화 후원'}]
  },

  world_794_heian: {
    id:'world_794_heian', title:'일본 헤이안 시대의 개막', start:794, end:935,
    regionKey:'east_asia', region:'동아시아 (교토)', location:[35.0116, 135.7681],
    type:'CULTURE', visual:'flow', priority:2,
    summary:{
      what:'귀족·불교 세력의 정치 개입을 피하려 수도를 헤이안쿄(교토)로 옮기며 약 400년간의 헤이안 시대가 시작됐다.',
      why:'당·신라·발해가 차례로 쇠퇴·멸망하자 일본은 견당사를 폐지하고 독자적인 문화로 눈을 돌렸다.',
      changed:'가나 문자가 만들어지고 와카·모노가타리 같은 일본 고유의 국풍문화가 발달한다.'
    },
    figures:[]
  }

};
