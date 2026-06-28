// data/1917.js — 1917년 사건 데이터
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1917.js"></script> 로 불립니다.

const EVENTS_1917 = [

  { id:'political_1917_01', year:1917, visible_from:1917, visible_until:1919,
    month:6, day:null, type:'political', priority:1,
    title_ko:'대동단결선언 — 국민주권의 첫 선언',
    title_en:'The Declaration of Grand Unity',
    title_ja:'大同団結宣言',
    place_ko:'상하이',
    lat:31.23, lng:121.47,
    people:['신규식','조소앙'],
    summary_ko:'1917년 신규식·조소앙 등 상하이의 독립운동가 14명이 대동단결선언을 발표했다. 핵심은 "융희황제(순종)가 1910년 주권을 포기한 그 순간, 주권은 황제에게서 우리 국민에게 넘어왔다"는 논리였다 — 군주주권을 국민주권으로 전환하는, 한국 독립운동사에서 획기적인 선언이었다. 흩어진 독립운동 세력이 하나의 통일된 임시정부로 결집하자고 호소했다. 비록 곧바로 정부 수립으로 이어지지는 못했지만, 2년 뒤 공화제 대한민국 임시정부가 탄생하는 사상적 토대를 놓았다.',
    video:null,
    connections:['organization_1914_01'],
    tags:['political','상하이','대동단결선언','국민주권','조소앙','공화주의'],
    sources:['우리역사넷 정부수립운동과 대동단결선언'],
    content:{ hero:{"url": "assets/images/entity/event/event_political_1917_01_01.webp", "alt": "대동단결선언 — 국민주권의 첫 선언", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "event"}, gallery:[] } },

  // ══ 인물 스냅샷 ══
  { id:'person_1917_01', year:1917, visible_from:1917, visible_until:1919,
    month:6, day:null, type:'person', priority:2,
    title_ko:'신규식 — 상하이 독립운동의 개척자',
    title_en:'Sin Gyu-sik — Pioneer of the Shanghai Independence Movement',
    title_ja:'申圭植 — 上海独立運動の開拓者',
    place_ko:'상하이',
    lat:31.23, lng:121.47,
    people:['신규식'],
    summary_ko:'대한제국 군인 출신으로 망국에 비분강개해 음독을 시도했다 한쪽 눈을 잃은 신규식은, 1911년 상하이로 망명해 중국 혁명세력과 손잡고 독립운동의 거점을 닦았다. 그는 동제사(同濟社)를 조직해 한인 청년들을 결집하고, 박은식·신채호·조소앙 등을 길렀다. 1917년에는 대동단결선언을 주도해 국민주권에 기초한 통일 임시정부 수립을 호소했다. 그가 상하이에 다진 인적·외교적 기반은 2년 뒤 대한민국 임시정부가 그곳에 세워지는 토대가 됐다. 임시정부 초대 법무총장·국무총리 대리를 지낸, 상하이 독립운동의 개척자였다.',
    video:null,
    connections:['political_1917_01','political_1919_01'],
    tags:['person','상하이','신규식','동제사','대동단결선언'],
    sources:['한국민족문화대백과사전 신규식','위키백과 신규식'],
    content:{ hero:{"url": "assets/images/entity/person/person_sin_gyu_sik_01.webp", "alt": "신규식", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "portrait"}, gallery:[] } }

];
