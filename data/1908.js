// data/1908.js — 1908년 사건 데이터
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1908.js"></script> 로 불립니다.

const EVENTS_1908 = [

  { id:'movement_1908_01', year:1908, visible_from:1908, visible_until:1908,
    month:0, day:null, type:'movement', priority:1,
    title_ko:'13도창의군 서울진공작전',
    title_en:'The Thirteen-Province Righteous Army\u2019s March on Seoul',
    title_ja:'十三道倡義軍のソウル進攻作戦',
    place_ko:'경기 양주 · 한성 동대문 밖',
    lat:37.62, lng:127.06,
    people:['이인영','허위'],
    summary_ko:'정미의병이 전국으로 번지자, 1907년 말 각지의 의병부대가 경기도 양주에 집결해 13도창의군이라는 전국연합부대를 결성했다. 총대장 이인영, 군사장 허위 아래 약 1만 명이 모였다. 이들은 1908년 1월 서울로 진격해 통감부를 무너뜨리고 국권을 되찾는 "서울진공작전"을 감행했다. 허위가 이끄는 선발대 300명이 동대문 밖 30리 지점까지 진격했으나, 화력의 열세와 후속 부대의 도착 지연으로 일본군에 밀려 후퇴했다. 설상가상 총대장 이인영이 부친상으로 귀향하면서 작전은 중단됐다. 비록 실패했지만, 흩어진 의병이 하나의 군대로 뭉쳐 수도를 직접 치려 한 이 작전은 한말 의병전쟁의 최대 규모이자 정점이었다 — 이후 의병은 만주·연해주로 이동해 독립군으로 이어진다.',
    video:null,
    connections:['movement_1907_05'],
    tags:['movement','조선국내','경기','13도창의군','서울진공작전','정미의병'],
    sources:['위키백과 정미의병','나무위키 정미의병'] },

  { id:'righteous_1908_01', year:1908, visible_from:1908, visible_until:1908,
    month:2, day:23, type:'righteous', priority:1,
    title_ko:'전명운·장인환 스티븐스 저격',
    title_en:'The Assassination of Stevens by Jeon Myeong-un and Jang In-hwan',
    title_ja:'スティーブンス狙撃事件',
    place_ko:'샌프란시스코',
    lat:37.795, lng:-122.40,
    people:['전명운','장인환'],
    summary_ko:'대한제국의 외교고문이던 친일 미국인 스티븐스는 1908년 미국에서 "일본의 한국 지배는 한국에 유익하다"는 망언을 공공연히 늘어놓았다. 이에 분노한 재미 한인 전명운과 장인환이 1908년 3월 23일 샌프란시스코 부두에서 각각 그를 저격했다. 전명운의 권총이 불발되자 두 사람이 몸싸움을 벌이는 사이 장인환이 쏜 총탄에 스티븐스는 이틀 뒤 사망했다. 서로 모르는 사이였던 두 청년이 같은 목표를 향해 동시에 의거를 일으킨 것이다. 이 사건은 미주 한인사회를 각성시켜 대한인국민회 결성의 계기가 됐고, 무엇보다 이듬해 안중근의 하얼빈 의거로 이어지는 의열투쟁의 흐름을 열었다 — 친일 부역의 대가가 무엇인지, 약소민족의 분노가 어디까지 닿는지를 세계에 알린 사건이었다.',
    video:null,
    connections:['policy_1904_02','righteous_1909_01'],
    tags:['righteous','미주','전명운','장인환','스티븐스','의열투쟁'],
    sources:['우리역사넷 이토 히로부미 사살 배경','한국민족문화대백과사전'],
    content:{ hero:{"url": "assets/images/entity/event/event_righteous_1908_01_01.webp", "alt": "전명운·장인환 스티븐스 저격", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "event"}, gallery:[{"url": "assets/images/entity/person/person_jeon_myeong_un_01.webp", "alt": "전명운", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "portrait"}, {"url": "assets/images/entity/person/person_jang_in_hwan_01.webp", "alt": "장인환", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "portrait"}] } }

];
