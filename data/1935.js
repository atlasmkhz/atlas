// data/1935.js — 1935도 사건 데이타 (5개)
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1935.js"></script> 로 불리웴니다.

const EVENTS_1935 = [

  // ══ 또 한 번의 통합 — 민족혁명당 ══
  { id:'political_1935_01', year:1935, visible_from:1935, visible_until:1937,
    month:6, day:5, type:'political', priority:1,
    title_ko:'민족혁명당 결성',
    title_en:'Founding of the Korean Revolutionary Party',
    title_ja:'民族革命党結成',
    place_ko:'난징',
    lat:32.06, lng:118.79,
    people:['김원봉','김규식','지청천'],
    summary_ko:'1935년 6월 29일부터 7월 4일까지 난징에서 한국독립당·의열단·신한독립당·조선혁명당·대한독립당 5개 단체가 통합대회를 열어 민족혁명당을 결성했다. 신간회 해체 이후 국내에서 사라진 좌우합작의 꿈이 중국 관내에서 되살아난 것이다. 임시정부 국무위원 다수가 참여해 한때 중국 내 최대 정당이 됐다. 그러나 임시정부 해산까지 주장하는 통합론에 김구 계열이 반발해 참여하지 않았다. 통합의 규모는 커졌지만, 그 틀 밖에 임시정부의 핵심이 남는 균열을 안고 출발했다.',
    video:null,
    connections:['political_1934_02','political_1933_01'],
    tags:['political','중국','민족혁명당','통합'],
    sources:['우리역사넷 조선민족혁명당','위키백과'],
    content:{ hero:{"url": "assets/images/entity/person/person_kim_gyu_sik_01.webp", "alt": "김규식", "caption": "", "credit": "AI 생성 이미지", "is_ai": true, "source_type": "generated", "image_type": "portrait"}, gallery:[] } },

  { id:'political_1935_02', year:1935, visible_from:1935, visible_until:1940,
    month:10, day:null, type:'political', priority:2,
    title_ko:'한국독립당 재건과 한국국민당 창립 — 갈라진 두 길',
    title_en:'Reconstruction of KIP and Founding of Korean National Party',
    title_ja:'韓国独立党再建と韓国国民党創立',
    place_ko:'항저우 / 상하이',
    lat:30.27, lng:120.16,
    people:['조소앙','김구','이동녕'],
    summary_ko:'민족혁명당 통합 시도가 임시정부 해산론으로 흐르자, 조소앙은 항저우에서 한국독립당을 재건해 탈당했고, 신한독립당 계열도 뒤따라 떠났다. 김구는 1935년 이동녕과 함께 임시정부를 옹호하는 한국국민당을 따로 세웠다. 1927년 신간회처럼, 1935년 민족혁명당도 결국 임시정부 고수파와 해산론 사이의 균열을 메우지 못한 것이다. 1920년대부터 거듭된 통합과 분열의 순환이, 중국 관내에서도 똑같이 되풀이됐다.',
    video:null,
    connections:['political_1935_01'],
    tags:['political','중국','임정','분열'],
    sources:['위키백과 조선민족혁명당'],
    content:{ hero:{"url": "assets/images/entity/person/person_yi_dong_nyeong_01.webp", "alt": "이동녕", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "portrait"}, gallery:[] } },

  // ══ 식민통치 — 신앙과 양심에 대한 강제 ══
  { id:'policy_1935_01', year:1935, visible_from:1935, visible_until:1945,
    month:0, day:null, type:'policy', priority:1,
    title_ko:'신사참배 강요의 시작',
    title_en:'Beginning of Forced Shinto Shrine Worship',
    title_ja:'神社参拝強要の始まり',
    place_ko:'평양',
    lat:39.02, lng:125.74,
    people:['주기철'],
    summary_ko:'1935년부터 조선총독부는 각급 학교 학생들에게 신사참배를 강제하기 시작했다. 기독교계 학교들은 우상숭배를 거부하며 맞섰고, 평양 숭실학교·숭의학교는 끝내 폐교를 당했다. 학생·선교사·목사들의 반대운동이 이어졌고, 평양 산정현교회 주기철 목사는 적극적으로 반대하다 투옥돼 순교하는 길을 걷는다. 1937년 중일전쟁 이후 더욱 강경해질 이 정책은, 신앙의 자유라는 가장 사적인 영역까지 식민권력이 침범하기 시작했음을 보여줬다.',
    video:null,
    connections:['policy_1934_01'],
    tags:['policy','조선국내','평양','신사참배','종교탄압'],
    sources:['위키백과 신사참배 강요'] },

  // ══ 인물 스냅샷 ══
  { id:'person_1935_01', year:1935, visible_from:1935, visible_until:1938,
    month:6, day:null, type:'person', priority:2,
    title_ko:'김원봉 — 민족혁명당 총서기',
    title_en:'Kim Won-bong — Secretary-General of the Revolutionary Party',
    title_ja:'金元鳳 — 民族革命党総書記',
    place_ko:'난징',
    lat:32.05, lng:118.78,
    people:['김원봉'],
    summary_ko:'1935년 김원봉은 민족혁명당 총서기에 올랐다. 1919년 의열단을 만들어 박재혁·김상옥·나석주 같은 영웅들의 거사를 이끌었던 그가, 이제는 5개 단체가 합친 거대 정당의 수장이 된 것이다. 개별 의열투쟁에서 조직적 정당정치로, 그의 노선은 완전히 바뀌어 있었다. 그러나 정작 그가 세운 의열단은 이 통합 속에서 소수파로 전락했다. 지청천과의 갈등도 이미 씨앗을 품고 있었다.',
    video:null,
    connections:['political_1935_01','person_1924_01'],
    tags:['person','중국','김원봉','민족혁명당'],
    sources:['나무위키 김원봉','한국민족문화대백과사전'],
    content:{ hero:{"url": "assets/images/entity/person/person_kim_won_bong_01.webp", "alt": "김원봉", "caption": "", "credit": "AI 생성 이미지", "is_ai": true, "source_type": "generated", "image_type": "portrait"}, gallery:[] } },

  { id:'person_1935_02', year:1935, visible_from:1935, visible_until:1944,
    month:0, day:null, type:'person', priority:2,
    title_ko:'주기철 — 신앙으로 맞선 저항',
    title_en:'Ju Gi-cheol — Resistance Through Faith',
    title_ja:'朱基徹 — 信仰で立ち向かう抵抗',
    place_ko:'평양 산정현교회',
    lat:39.005, lng:125.755,
    people:['주기철'],
    summary_ko:'평양 산정현교회 목사 주기철은 1935년 신사참배 강요가 시작되자 이를 우상숭배로 규정하고 단호히 거부했다. "주일은 성수하고 신사에는 참배하지 않는다"는 그의 설교는 신앙 양심의 저항이 곧 또 다른 형태의 항일임을 보여줬다. 거듭된 투옥과 고문에도 신념을 굽히지 않았고, 1944년 평양형무소에서 옥사로 순교했다. 총칼이 아닌 강단에서, 그는 식민권력이 가장 사적인 영역까지 침범하는 데 맞선 저항의 한 얼굴이었다.',
    video:null,
    connections:['policy_1935_01'],
    tags:['person','조선국내','평양','주기철','신앙저항'],
    sources:['위키백과 신사참배 강요'],
    content:{ hero:{"url": "assets/images/entity/person/person_ju_gi_cheol_01.webp", "alt": "주기철", "caption": "주기철 목사", "credit": "", "is_ai": false, "source_type": "historical", "image_type": "portrait"}, gallery:[] } }

];
