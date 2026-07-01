// data/1913.js — 1913년 사건 데이터
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1913.js"></script> 로 불립니다.

const EVENTS_1913 = [

  { id:'organization_1913_01', year:1913, visible_from:1913, visible_until:1919,
    month:4, day:null, type:'organization', priority:2,
    title_ko:'흥사단 창립 — 안창호의 인격수양운동',
    title_en:'Founding of the Young Korean Academy (Heungsadan)',
    title_ja:'興士団の創立',
    place_ko:'샌프란시스코',
    lat:37.775, lng:-122.42,
    people:['안창호'],
    summary_ko:'105인 사건으로 신민회가 무너진 뒤 미국으로 건너간 안창호는 1913년 5월 샌프란시스코에서 흥사단을 세웠다. 무실(務實)·역행(力行)·충의(忠義)·용감(勇敢)을 강령으로 내걸고, 거짓 없는 인격을 갖춘 인재를 길러 그 힘으로 독립을 이루자는 점진적 실력양성운동을 표방했다. 즉각적 무장투쟁과는 다른 길이었지만, 흥사단은 미주 한인사회의 구심점이 되어 이후 임시정부 활동과 독립운동의 인적·재정적 기반을 떠받쳤다.',
    video:null,
    connections:[],
    tags:['organization','미주','흥사단','안창호','실력양성'],
    sources:['한국민족문화대백과사전 안창호','한국민족문화대백과사전 흥사단'],
    content:{ hero:{"url": "assets/images/entity/event/event_organization_1913_01_01.webp", "alt": "흥사단 창립 — 안창호의 인격수양운동", "caption": "", "credit": "AI 생성 이미지", "is_ai": true, "source_type": "generated", "image_type": "event"}, gallery:[] } },

  { id:'organization_1913_02', year:1913, visible_from:1913, visible_until:1919,
    month:0, day:null, type:'organization', priority:2,
    title_ko:'송죽회 결성 — 여성 비밀결사',
    title_en:'Songjukhoe — A Secret Women\u2019s Society',
    title_ja:'松竹会の結成',
    place_ko:'평양 (숭의여학교)',
    lat:39.02, lng:125.74,
    people:[],
    summary_ko:'1913년 평양 숭의여학교의 교사와 학생들이 송죽회(松竹會)라는 비밀결사를 만들었다. 소나무와 대나무처럼 변치 않는 절개로 독립을 이루자는 뜻이었다. 회원들은 점조직 형태로 비밀을 철저히 지키며 군자금을 모아 해외 독립운동을 지원하고, 망명지사 가족을 돕고, 민족의식을 일깨우는 교육 활동을 폈다. 무단통치의 삼엄한 감시 속에서도 여성들이 주체가 되어 꾸린 이 결사는, 훗날 3·1운동과 여성 독립운동으로 이어지는 흐름의 한 출발점이 됐다.',
    video:null,
    connections:[],
    tags:['organization','조선국내','평양','송죽회','여성','비밀결사'],
    sources:['한국민족문화대백과사전 송죽회'] },

  // ══ 인물 스냅샷 ══
  { id:'person_1913_01', year:1913, visible_from:1913, visible_until:1919,
    month:4, day:null, type:'person', priority:1,
    title_ko:'안창호 — 미주 한인사회의 지도자',
    title_en:'Ahn Chang-ho — Leader of the Korean American Community',
    title_ja:'安昌浩 — 米州韓人社会の指導者',
    place_ko:'샌프란시스코 → 로스앤젤레스',
    lat:37.78, lng:-122.41,
    people:['안창호'],
    summary_ko:'신민회를 이끌다 105인 사건의 칼날을 피해 미국으로 건너간 안창호는, 1913년 흥사단을 세우며 미주 한인사회의 정신적 지도자로 자리 잡았다. 그는 대한인국민회를 통해 흩어진 동포들을 조직하고, 거짓 없는 인격을 갖춘 인재를 길러 그 힘으로 독립을 이루자는 점진적 실력양성운동을 폈다. 즉각적 무장투쟁과는 다른 노선이었지만, 그가 다진 미주의 인적·재정적 기반은 훗날 임시정부를 떠받치는 든든한 기둥이 됐다. 1919년 3·1운동 후 그는 상하이로 건너가 임시정부의 핵심으로 합류한다.',
    video:null,
    connections:['organization_1913_01','political_1919_01'],
    tags:['person','미주','안창호','흥사단','실력양성','대한인국민회'],
    sources:['한국민족문화대백과사전 안창호','위키백과 안창호'],
    content:{ hero:{"url": "assets/images/entity/person/person_ahn_chang_ho_01.webp", "alt": "안창호", "caption": "", "credit": "AI 생성 이미지", "is_ai": true, "source_type": "generated", "image_type": "portrait"}, gallery:[] } }

];
