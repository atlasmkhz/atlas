// data/1906.js — 1906년 사건 데이터
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1906.js"></script> 로 불립니다.

const EVENTS_1906 = [

  { id:'policy_1906_01', year:1906, visible_from:1906, visible_until:1910,
    month:1, day:1, type:'policy', priority:1,
    title_ko:'통감부 설치 — 이토 히로부미 초대 통감',
    title_en:'Establishment of the Japanese Residency-General',
    title_ja:'統監府の設置',
    place_ko:'한성 (남산)',
    lat:37.551, lng:126.988,
    people:['이토 히로부미'],
    summary_ko:'을사늑약에 따라 1906년 2월 한성에 통감부가 설치되고, 이토 히로부미가 초대 통감으로 부임했다. 통감부는 명목상 외교를 관할한다고 했지만, 실제로는 대한제국의 내정 전반을 장악하는 식민 통치의 사령탑이었다. 이토는 "보호와 지도"를 내세웠으나 그 실체는 단계적 병합을 위한 준비였다 — 재정·경찰·사법을 차례로 일본 손에 넘기고, 한국인의 저항을 탄압했다. 통감부는 4년 뒤 조선총독부로 이름을 바꿔 본격적인 식민 지배 기구가 된다. 대한제국이라는 나라가 형식만 남긴 채 속을 비워가던 시기, 그 침탈을 집행한 중심 기구였다.',
    video:null,
    connections:['policy_1905_01','person_1910_02'],
    tags:['policy','조선국내','경성','통감부','이토히로부미','보호국'],
    sources:['위키백과 을사조약','나무위키 대한제국'],
    content:{ hero:{"url": "assets/images/entity/person/person_ito_hirobumi_01.webp", "alt": "이토 히로부미", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "portrait"}, gallery:[] } },

  { id:'righteous_1906_01', year:1906, visible_from:1906, visible_until:1907,
    month:5, day:null, type:'righteous', priority:1,
    title_ko:'최익현 의병 봉기와 순국',
    title_en:'Choe Ik-hyeon\u2019s Uprising and Death',
    title_ja:'崔益鉉の義兵蜂起と殉国',
    place_ko:'전북 태인 · 순창',
    lat:35.62, lng:127.03,
    people:['최익현'],
    summary_ko:'위정척사의 거유(巨儒) 최익현은 을사늑약에 분개해, 1906년 6월 74세의 노구를 이끌고 전북 태인에서 의병을 일으켰다. "내 나이 일흔넷, 죽음을 두려워하랴"며 제자들과 함께 일어선 그는 순창에서 관군·일본군과 맞섰으나, "같은 동포끼리 싸울 수 없다"며 무기를 버리고 체포됐다. 일본은 그를 쓰시마(대마도)로 끌고 갔고, 최익현은 적이 주는 음식을 거부하다 1907년 1월 그곳에서 순국했다. 그의 유해가 부산에 닿자 수많은 백성이 통곡하며 맞이했다. 이미 노쇠한 유학자가 목숨으로 보여준 항거는, 을사의병의 정신적 상징이 되어 이후 정미의병으로 이어지는 항일 의병전쟁에 큰 울림을 남겼다.',
    video:null,
    connections:['policy_1905_01','movement_1907_05'],
    tags:['righteous','조선국내','전라도','최익현','을사의병','순국'],
    sources:['우리역사넷 군대해산','한국민족문화대백과사전 최익현'],
    content:{ hero:{"url": "assets/images/entity/event/event_righteous_1906_01_01.webp", "alt": "최익현 의병 봉기와 순국", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "event"}, gallery:[] } }

];
