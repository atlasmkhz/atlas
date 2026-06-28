// data/1915.js — 1915년 사건 데이터
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1915.js"></script> 로 불립니다.

const EVENTS_1915 = [

  { id:'organization_1915_01', year:1915, visible_from:1915, visible_until:1918,
    month:7, day:null, type:'organization', priority:1,
    title_ko:'대한광복회 결성 — 1910년대 최대 비밀결사',
    title_en:'Founding of the Korean Restoration Association',
    title_ja:'大韓光復会の結成',
    place_ko:'대구 (달성공원)',
    lat:35.873, lng:128.585,
    people:['박상진','김좌진'],
    summary_ko:'1915년 7월 대구에서 박상진을 총사령으로 대한광복회가 결성됐다. 1913년 풍기에서 조직된 광복단과 1915년 대구의 조선국권회복단이 합쳐진 단체로, 한말 의병 계열과 계몽운동 계열이 손을 잡았다. 이념으로는 공화주의를, 방략으로는 무장혁명을 표방했다 — 고종 복위를 노린 복벽주의 단체들과 결정적으로 갈린 지점이다. 각지에 곡물상을 차려 군자금을 모으고, 친일 부호를 처단하며, 만주에 무관학교를 세워 독립군을 기르려 했다. 1917년부터 김좌진이 부사령을 맡아 전국 조직으로 키웠으나, 1918년 조직이 발각되고 박상진 등이 검거되면서 큰 타격을 입었다. 1910년대 국내 최대의 독립군 단체였다.',
    video:null,
    connections:['organization_1912_01'],
    tags:['organization','조선국내','대구','대한광복회','박상진','김좌진','공화주의'],
    sources:['한국민족문화대백과사전 대한광복회','우리역사넷 대한광복회'],
    content:{ hero:{"url": "assets/images/entity/event/event_organization_1915_01_01.webp", "alt": "대한광복회 결성 — 1910년대 최대 비밀결사", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "event"}, gallery:[{"url": "assets/images/entity/person/person_park_sang_jin_01.webp", "alt": "박상진", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "portrait"}] } },

  // ══ 인물 스냅샷 ══
  { id:'person_1915_01', year:1915, visible_from:1915, visible_until:1918,
    month:7, day:null, type:'person', priority:2,
    title_ko:'박상진 — 대한광복회 총사령',
    title_en:'Park Sang-jin — Commander of the Korean Restoration Association',
    title_ja:'朴尚鎮 — 大韓光復会総司令',
    place_ko:'대구',
    lat:35.871, lng:128.601,
    people:['박상진'],
    summary_ko:'판사 시험에 합격하고도 일제의 관리가 되기를 거부한 박상진은, 대구에 상덕태상회라는 곡물상을 차려 독립운동의 연락 거점으로 삼았다. 1915년 그는 대한광복회를 조직해 총사령에 올랐고, 공화주의를 이념으로 무장혁명을 방략으로 내건 1910년대 국내 최대의 비밀결사를 이끌었다. 전국에 곡물상 거점을 두어 군자금을 모으고, 만주에 무관학교를 세워 독립군을 기르려 했으며, 친일 부호를 처단하는 의협투쟁도 벌였다. 1918년 조직이 발각되어 체포된 그는 사형을 선고받고 1921년 순국했다.',
    video:null,
    connections:['organization_1915_01'],
    tags:['person','조선국내','대구','박상진','대한광복회','공화주의'],
    sources:['한국민족문화대백과사전 박상진','우리역사넷 대한광복회'],
    content:{ hero:{"url": "assets/images/entity/person/person_park_sang_jin_02.webp", "alt": "박상진", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "portrait"}, gallery:[] } }

];
