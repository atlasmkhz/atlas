// play/crossroads/crossroads.js — "역사의 갈림길" 시뮬레이션
// 성격 검사가 아니라 역사 시뮬레이션이다: 열두 개의 실제 딜레마 앞에
// 사용자를 세우고, 답할 때마다 "실제 역사에서는"을 열어 지도 카드로
// 잇는다. 결과는 심리 유형이 아니라 "당신의 선택 패턴이 어떤 인물의
// 선택들과 겹치는가"다.
//
// 축(History DNA): W 무인 / S 학자 / R 개혁가 / D 조율가 / P 개척자
// 각 선택지는 주축 +2, 부축 +1. 인물 벡터와 코사인 유사도로 매칭.
// 딥링크는 play/crossroads/ 기준 상대경로.

'use strict';

const AXES = [
  { key: 'w', icon: '⚔️', name: '무인',   en: 'Warrior',  desc: '정면으로 맞서 결단한다' },
  { key: 's', icon: '📚', name: '학자',   en: 'Scholar',  desc: '기록하고 탐구해 원리로 이긴다' },
  { key: 'r', icon: '🏛️', name: '개혁가', en: 'Reformer', desc: '판 자체의 구조를 바꾼다' },
  { key: 'd', icon: '🤝', name: '조율가', en: 'Diplomat', desc: '설득하고 연대해 길을 연다' },
  { key: 'p', icon: '🧭', name: '개척자', en: 'Pioneer',  desc: '아무도 가지 않은 길을 낸다' },
];

const SCENARIOS = [
  {
    id: 'salsu_612', year: '612년', place: '고구려, 압록수 북쪽',
    situation: '수나라 30만 별동대가 평양성을 향해 밀려옵니다. 병력은 열세, 그러나 적은 먼 길에 지쳐 있고 보급은 위태롭습니다. 총사령관인 당신의 선택은?',
    options: [
      { text: '지금 정면 결전을 건다 — 사기가 남아있을 때', axes: { w: 2 },        frag: '나는 물러서지 않고 정면 결전을 준비했다' },
      { text: '거짓 항복 사신으로 적진에 들어가 적의 허실부터 살핀다', axes: { s: 2, d: 1 }, frag: '나는 적진 한가운데로 걸어 들어가 허실을 읽었다' },
      { text: '화친 조건을 협상하며 철군을 유도한다', axes: { d: 2 },        frag: '나는 칼 대신 말로 철군의 길을 열려 했다' },
      { text: '소부대로 적 보급로를 끊는 작전에 나선다', axes: { p: 2, w: 1 }, frag: '나는 적의 숨통인 보급로를 노렸다' },
    ],
    reveal: '을지문덕은 스스로 거짓 항복 사신이 되어 적진을 살피고, 일곱 번 싸워 일곱 번 져주며 적을 지치게 한 뒤 — 살수에서 철군하는 30만을 쳤습니다. 살아 돌아간 자는 2,700명이었습니다.',
    link: '../../maps/ancient/index.html?event=battle_612_01', link_label: '살수대첩 — 지도에서 보기',
  },
  {
    id: 'seohui_993', year: '993년', place: '고려, 안융진',
    situation: '거란 80만 대군이 국경을 넘었습니다. 조정에서는 항복하자는 논의와 서경 이북 땅을 떼어주자는 할지론이 우세합니다. 당신의 선택은?',
    options: [
      { text: '결사항전을 상소한다 — 싸워보지도 않고 땅을 내줄 수는 없다', axes: { w: 2 },        frag: '나는 싸워보지도 않은 항복을 거부했다' },
      { text: '적장과의 담판을 자청한다 — 적이 진짜 원하는 것을 읽어낸다', axes: { d: 2, s: 1 }, frag: '나는 홀로 적장의 장막으로 들어갔다' },
      { text: '국경의 실상을 정리해 조정의 판단 근거부터 바로잡는다', axes: { s: 2 },        frag: '나는 사실을 정리해 공포에 맞섰다' },
      { text: '방어 체계를 뜯어고쳐 장기전 기반을 만든다', axes: { r: 2 },        frag: '나는 무너진 방어의 구조부터 다시 세웠다' },
    ],
    reveal: '서희는 적장 소손녕과의 담판에서 거란의 진짜 목적이 송과의 전쟁임을 읽어냈고 — 싸우지 않고 오히려 강동 6주를 얻어냈습니다. 한국사에서 가장 성공한 외교로 꼽힙니다.',
    link: '../../maps/medieval1/index.html?event=battle_0993_01', link_label: '서희의 담판 — 지도에서 보기',
  },
  {
    id: 'hangeul_1443', year: '1446년', place: '조선, 경복궁',
    situation: '당신은 백성을 위한 새 문자를 만들었습니다. 그러나 집현전 원로들이 "중화를 버리고 오랑캐가 되려는 일"이라며 반포를 정면 반대합니다. 당신의 선택은?',
    options: [
      { text: '왕권으로 반포를 강행한다 — 옳은 일은 미루지 않는다', axes: { r: 2, w: 1 }, frag: '나는 반대를 뚫고 옳은 일을 관철했다' },
      { text: '문자의 원리를 낱낱이 밝힌 해설서로 정면 논증한다', axes: { s: 2 },        frag: '나는 반박이 불가능한 논증으로 답했다' },
      { text: '반대파와 끝장 토론을 벌여 명분에서 이긴다', axes: { d: 2 },        frag: '나는 토론의 한복판으로 걸어 들어갔다' },
      { text: '불경·노래 번역 등 쓰임새부터 만들어 스며들게 한다', axes: { p: 2 },        frag: '나는 논쟁 대신 쓰임새로 증명했다' },
    ],
    reveal: '세종은 최만리와 직접 논쟁하는 한편, 창제 원리를 밝힌 해례본을 펴내 논증으로 답하고 반포를 관철했습니다. 그 해례본은 1997년 유네스코 세계기록유산이 됐습니다.',
    link: '../../maps/medieval2/index.html?event=culture_1443_01', link_label: '훈민정음 창제 — 지도에서 보기',
  },
  {
    id: 'uibyeong_1592', year: '1592년', place: '조선, 경상도 의령',
    situation: '왜군이 파죽지세로 북상하고 왕은 도성을 버리고 피난했습니다. 관군은 무너졌고, 당신의 고을에도 곧 적이 들이닥칩니다. 당신의 선택은?',
    options: [
      { text: '집안 재산을 풀어 의병을 일으킨다', axes: { w: 2, p: 1 }, frag: '나는 붓 대신 칼을 들고 일어섰다' },
      { text: '백성들의 피난과 구휼을 조직한다 — 사람부터 살린다', axes: { d: 2 },        frag: '나는 싸움보다 먼저 사람을 살렸다' },
      { text: '이 전쟁의 참상과 교훈을 기록으로 남긴다', axes: { s: 2 },        frag: '나는 다음 세대를 위해 이 전쟁을 기록했다' },
      { text: '산성으로 근거지를 옮겨 장기 항전의 기반을 만든다', axes: { p: 2 },        frag: '나는 오래 싸울 수 있는 땅부터 찾았다' },
    ],
    reveal: '곽재우는 임진왜란 최초로 재산을 풀어 의병을 일으켰고, 붉은 옷의 홍의장군으로 낙동강 보급로를 끊었습니다. 전국에서 유생·농민·승려가 뒤를 이었습니다.',
    link: '../../maps/medieval2/index.html?event=movement_1592_04', link_label: '전국 의병의 봉기 — 지도에서 보기',
  },
  {
    id: 'myeongnyang_1597', year: '1597년', place: '조선, 진도 울돌목',
    situation: '칠천량에서 수군이 궤멸했습니다. 남은 배는 12척. 조정은 수군을 해체하고 육군에 합류하라 명합니다. 그러나 바다를 내주면 적의 보급이 뚫립니다. 당신의 선택은?',
    options: [
      { text: '"신에게는 아직 열두 척이 있습니다" — 바다를 지킨다', axes: { w: 2 },        frag: '나는 열두 척으로 바다에 남았다' },
      { text: '물길과 조류를 연구해 이길 수 있는 단 하나의 장소를 찾는다', axes: { s: 2, w: 1 }, frag: '나는 이길 수 있는 단 한 곳을 찾아냈다' },
      { text: '명 수군과의 연합을 교섭해 전력부터 복원한다', axes: { d: 2 },        frag: '나는 연대로 부족한 힘을 메웠다' },
      { text: '일단 함대를 보존해 훗날을 도모한다', axes: { p: 2 },        frag: '나는 오늘을 접고 내일을 준비했다' },
    ],
    reveal: '이순신은 명령을 거부하고 울돌목의 좁은 물길과 조류를 승부처로 골랐습니다 — 13척이 133척을 막아낸 명량대첩입니다. 결단과 치밀함이 하나였던 싸움이었습니다.',
    link: '../../maps/medieval2/index.html?event=battle_1597_01', link_label: '명량대첩 — 지도에서 보기',
  },
  {
    id: 'daedong_1608', year: '1608년', place: '조선, 한양',
    situation: '특산물 공납의 폐단으로 백성이 무너지고 있습니다. 쌀로 통일해 걷는 대동법이 답이지만, 부담이 커지는 지주와 방납 이권 세력의 반발이 거셉니다. 당신의 선택은?',
    options: [
      { text: '전국 일괄 시행 — 개혁은 속도가 생명이다', axes: { r: 2, w: 1 }, frag: '나는 개혁의 칼을 단번에 뽑았다' },
      { text: '경기도 한 곳부터 시범 시행해 증명하며 넓힌다', axes: { p: 2, r: 1 }, frag: '나는 작게 시작해 크게 증명했다' },
      { text: '반대 세력을 설득할 연합부터 만든다', axes: { d: 2 },        frag: '나는 개혁의 편부터 늘렸다' },
      { text: '조세 실태를 전수 조사해 반박 불가능한 근거를 쌓는다', axes: { s: 2 },        frag: '나는 숫자로 반대를 무너뜨렸다' },
    ],
    reveal: '광해군과 이원익은 경기도부터 시범 시행하는 길을 택했습니다 — 옳은 개혁이 전국에 뿌리내리기까지 꼭 100년이 걸렸습니다. 개혁의 속도에 대한 오래된 질문입니다.',
    link: '../../maps/medieval2/index.html?event=policy_1608_02', link_label: '대동법 시행 — 지도에서 보기',
  },
  {
    id: 'hwaseong_1794', year: '1794년', place: '조선, 수원',
    situation: '왕이 새로운 정치의 무대가 될 신도시 화성 축조를 명했습니다. 예정 공기는 10년, 그러나 정국은 그 시간을 기다려주지 않습니다. 공사를 총괄하는 당신의 선택은?',
    options: [
      { text: '무거운 돌을 들어올릴 새로운 기계를 설계한다', axes: { s: 2, p: 1 }, frag: '나는 문제를 기술로 풀었다' },
      { text: '강제 부역 대신 일한 만큼 임금을 준다 — 사람이 달라진다', axes: { r: 2 },        frag: '나는 일하는 사람의 조건부터 바꿨다' },
      { text: '반대 신료들을 설득해 예산과 명분을 확보한다', axes: { d: 2 },        frag: '나는 곳간과 명분을 함께 열었다' },
      { text: '군사 요새를 넘어 상업 도시로 판을 키운다', axes: { p: 2 },        frag: '나는 성이 아니라 도시의 미래를 설계했다' },
    ],
    reveal: '정약용은 거중기를 설계했고, 정조는 부역 대신 임금을 지급했습니다 — 기술과 제도가 만나 10년 예정 공사가 2년 9개월에 끝났습니다. 화성은 유네스코 세계유산이 됐습니다.',
    link: '../../maps/medieval2/index.html?event=culture_1794_01', link_label: '수원화성 축성 — 지도에서 보기',
  },
  {
    id: 'gaehang_1876', year: '1876년', place: '조선, 강화도',
    situation: '일본 군함이 무력시위 끝에 개항을 요구합니다. 나라 밖에서는 서구 열강의 시대가 열렸고, 안에서는 척화의 목소리가 높습니다. 조정의 판단에 참여한 당신의 선택은?',
    options: [
      { text: '문호를 열되 준비된 개방을 설계한다 — 세계로 나간다', axes: { p: 2 },        frag: '나는 두려움보다 넓은 세계를 택했다' },
      { text: '지금은 척화 — 힘을 기른 뒤에 연다', axes: { w: 2 },        frag: '나는 준비 없는 개방을 거부했다' },
      { text: '개항하되 불평등 조항만은 끝까지 협상한다', axes: { d: 2, s: 1 }, frag: '나는 조약문의 한 줄 한 줄과 싸웠다' },
      { text: '서양의 제도와 기술부터 시찰하고 연구한다', axes: { s: 2 },        frag: '나는 문을 열기 전에 바깥을 공부했다' },
    ],
    reveal: '조선은 강화도조약으로 문을 열었습니다 — 최초의 근대 조약이자, 해안측량권과 치외법권을 내준 불평등 조약이었습니다. "어떻게 열 것인가"를 준비하지 못한 개방의 대가는 길었습니다.',
    link: '../../map.html?event=political_1876_01', link_label: '강화도조약 — 지도에서 보기',
  },
  {
    id: 'manmin_1898', year: '1898년', place: '대한제국, 종로',
    situation: '열강의 이권 침탈이 노골화되자 종로 광장에 만민공동회가 열렸습니다. 백정부터 대신까지 한자리에 모인, 이 땅 최초의 광장 정치입니다. 당신의 선택은?',
    options: [
      { text: '연단에 올라 대중을 설득한다', axes: { d: 2 },        frag: '나는 광장의 연단에 올랐다' },
      { text: '신문을 만들어 이 목소리를 전국에 싣는다', axes: { s: 2, p: 1 }, frag: '나는 광장의 목소리를 활자에 실었다' },
      { text: '요구를 제도로 — 의회 설립과 개혁안을 밀어붙인다', axes: { r: 2 },        frag: '나는 함성을 제도로 바꾸려 했다' },
      { text: '탄압에 맞서 광장을 지키는 최전선에 선다', axes: { w: 2 },        frag: '나는 광장의 맨 앞줄에 섰다' },
    ],
    reveal: '만민공동회는 헌의 6조로 요구를 제도화하며 의회 설립 직전까지 갔지만, 고종의 탄압으로 해산됐습니다 — 그러나 광장에서 정치를 말하는 전통은 여기서 시작됐습니다.',
    link: '../../map.html?event=movement_1898_01', link_label: '만민공동회 — 지도에서 보기',
  },
  {
    id: 'samil_1919', year: '1919년', place: '식민지 조선, 경성',
    situation: '무단통치 10년. 고종의 죽음으로 민심이 끓어오르고, 도쿄에서는 유학생들이 먼저 독립을 선언했습니다. 거사가 준비되고 있습니다. 당신의 선택은?',
    options: [
      { text: '거리로 나간다 — 맨몸의 만세가 총칼보다 크다', axes: { w: 2, d: 1 }, frag: '나는 맨몸으로 거리에 나섰다' },
      { text: '세계를 향한 외교전 — 열강과 강화회의에 독립을 알린다', axes: { d: 2 },        frag: '나는 세계를 향해 조선을 변호했다' },
      { text: '선언문을 쓴다 — 이 운동의 언어를 만든다', axes: { s: 2 },        frag: '나는 운동의 언어를 벼렸다' },
      { text: '만세 이후를 준비한다 — 정부를 세운다', axes: { r: 2, p: 1 }, frag: '나는 함성 다음의 조직을 준비했다' },
    ],
    reveal: '수백만이 거리로 나섰고, 그 함성은 한 달 뒤 상하이 임시정부 수립으로 이어졌습니다 — 대한민국 헌법 전문은 지금도 3·1운동에서 시작합니다.',
    link: '../../map.html?event=movement_1919_02', link_label: '3·1운동 — 지도에서 보기',
  },
  {
    id: 'haebang_1945', year: '1945년', place: '해방된 서울',
    situation: '해방의 감격도 잠시, 나라 세우기를 놓고 좌우가 갈라서고 있습니다. 신탁통치 논쟁으로 거리는 둘로 쪼개졌습니다. 당신의 선택은?',
    options: [
      { text: '좌우 사이의 다리가 된다 — 분단만은 막아야 한다', axes: { d: 2 },        frag: '나는 갈라진 양쪽 사이에 다리를 놓으려 했다' },
      { text: '새 나라의 뼈대가 될 조직부터 세운다', axes: { r: 2 },        frag: '나는 새 나라의 뼈대를 먼저 세웠다' },
      { text: '친일 청산부터 — 정의 없는 건국은 모래성이다', axes: { w: 2 },        frag: '나는 청산 없는 건국을 거부했다' },
      { text: '교육과 언론을 다시 세운다 — 나라의 기초는 사람이다', axes: { s: 2, p: 1 }, frag: '나는 사람을 기르는 일부터 시작했다' },
    ],
    reveal: '여운형은 좌우합작으로 분단을 막으려다 양쪽 모두의 표적이 되어 암살당했습니다 — 중간지대에 섰던 이름들의 이야기는 자료실 "지워진 이름들"에서 이어집니다.',
    link: '../../map.html?event=political_1945_01', link_label: '건국준비위원회 — 지도에서 보기',
  },
  {
    id: 'today', year: '오늘', place: '당신의 자리',
    situation: '마지막 질문입니다. 당신이 속한 조직에서 모두가 알지만 아무도 말하지 않는 오래된 부조리를 발견했습니다. 당신의 선택은?',
    options: [
      { text: '공개적으로 문제를 제기한다 — 누군가는 말해야 한다', axes: { w: 2 },        frag: '나는 모두가 침묵할 때 입을 열었다' },
      { text: '규정과 구조를 바꾸는 개선안을 만든다', axes: { r: 2 },        frag: '나는 사람이 아니라 구조를 바꾸려 했다' },
      { text: '동료들의 공감대부터 넓혀 함께 바꾼다', axes: { d: 2 },        frag: '나는 혼자가 아니라 함께 바꾸는 길을 골랐다' },
      { text: '판을 떠나 아예 새로운 판을 만든다', axes: { p: 2 },        frag: '나는 낡은 판 대신 새 판을 짰다' },
    ],
    reveal: '천 년 전의 갈림길과 오늘의 갈림길은 닮아 있습니다 — 역사는 결국, 이런 순간마다 누군가가 내린 선택들의 기록입니다.',
    link: null, link_label: null,
  },
];

// 삽입 시나리오 2건(2026-07-11 인물 보강 및 수정과 함께 추가) ───────────
// 배열 마지막 'today' 앞에 시간순으로 끼워 넣는다: 1907(정미의병) →
// 1938(문화로 저항하기) → today. 두 신설 카드 모두 인물카드
// (신돌석·윤희순·손기정·박차정·전형필)로 실제 역사를 연결한다.
//
// 2026-07-12 수정: 'culture_1938' reveal에 있던 최승희를 손기정으로
// 교체했다. 최승희는 2002년 발표된 친일반민족행위 106인 명단에
// 포함된 인물로(전시체제기 일본군 위문공연 이력), "문화로 맞서
// 저항한 사례"로 소개하기에는 부적절하다 — 이 게임의 reveal은
// 저항의 상징으로만 서술하고 협력 행적을 언급하지 않는 압축된
// 형태라, 균형 서술이 가능한 자료실/맵 카드(data/1938.js person_1938_02,
// routes/modern_art_history.js)와 달리 여기서는 아예 다른 인물로
// 대체하는 것이 맞다고 판단했다. 손기정(1936 베를린올림픽 마라톤
// 우승, 동아일보 일장기 말소사건)으로 교체 — "몸으로 세계 무대에
// 서서 조선의 존재를 증명한 저항"이라는 같은 결의 실화이며 협력
// 논란이 없다.
SCENARIOS.splice(SCENARIOS.length - 1, 0,
  {
    id: 'righteous_1907', year: '1907년', place: '조선, 전국 각지',
    situation: '군대가 강제 해산되고 정미의병이 전국으로 번집니다. 그러나 의병 지휘부는 여전히 양반 출신 위주라, 평민 의병장들이 서울진공작전 지휘 대열에서 밀려나고 있습니다. 당신의 선택은?',
    options: [
      { text: '신분에 개의치 않고 직접 부대를 이끌고 유격전에 나선다', axes: { w: 2, p: 1 }, frag: '나는 누구의 허락도 없이 직접 부대를 이끌었다' },
      { text: '전선의 뒤에서 조직과 병참, 자금을 맡아 싸움을 떠받친다', axes: { d: 2 },        frag: '나는 총 대신 조직으로 싸움을 떠받쳤다' },
      { text: '신분 차별에 항의해 지휘 체계 자체를 바꾸자고 요구한다', axes: { r: 2 },        frag: '나는 싸우는 방식보다 싸우는 구조를 먼저 문제 삼았다' },
      { text: '국내가 한계라 보고 국외로 건너가 장기 항전을 준비한다', axes: { p: 2 },        frag: '나는 오늘의 싸움보다 내일의 근거지를 골랐다' },
    ],
    reveal: '평민 출신 신돌석은 태백산맥을 무대로 3천 병력을 이끌었지만 정작 서울진공작전 지휘부에서는 신분을 이유로 배제됐습니다. 같은 시기 윤희순은 안사람 의병가를 지어 여성들을 조직하고 병참을 맡으며 후방에서 의병을 떠받쳤습니다 — 신분과 성별의 벽 안에서도 의병의 주역은 이미 민중으로 넓어지고 있었습니다.',
    link: '../../map.html?event=person_1906_01', link_label: '신돌석 — 지도에서 보기',
  },
  {
    id: 'culture_1938', year: '1938년', place: '식민지 조선, 경성 · 상하이',
    situation: '전시총동원 체제가 조선어와 조선의 문화를 옥죄어 옵니다. 당신에게는 지키고 싶은 것이 있습니다. 무엇으로 맞서겠습니까?',
    options: [
      { text: '조선인의 이름을 걸고 세계 무대에 올라 존재를 증명한다', axes: { p: 2, s: 1 }, frag: '나는 억압 속에서도 조선의 이름을 세계에 알렸다' },
      { text: '무장투쟁 조직에 합류해 총을 든다', axes: { w: 2 },        frag: '나는 붓을 내려놓고 총을 들었다' },
      { text: '전 재산을 걸고 빼앗기는 문화재를 사들여 지킨다', axes: { r: 1, s: 2 },  frag: '나는 곳간을 열어 사라질 것들을 지켰다' },
      { text: '동지들과 연대해 조직을 넓히는 데 힘을 쏟는다', axes: { d: 2 },        frag: '나는 혼자보다 함께 버티는 쪽을 골랐다' },
    ],
    reveal: '1936년 베를린올림픽 마라톤에서 손기정은 일본 대표로 가슴에 일장기를 달고 뛸 수밖에 없었지만, 세계신기록으로 결승선을 끊으며 세계에 조선인의 존재를 증명했습니다 — 보름 뒤 동아일보가 시상대 사진에서 일장기를 지워 보도한 일장기 말소사건으로 신문은 무기 정간을 당했습니다. 박차정은 근우회의 여성운동가에서 조선의용대의 전사로 나섰고, 같은 시기 전형필은 전 재산을 들여 훈민정음 해례본 등 문화재를 사들여 지켜냈습니다 — 총이 아닌 방식의 저항이 이렇게도 있었습니다.',
    link: '../../map.html?event=person_1936_01', link_label: '손기정 — 지도에서 보기',
  }
);

// 인물 벡터 [w, s, r, d, p] 0~10 — 생애의 대표적 선택 패턴 기준.
const FIGURES = [
  { id:'yi_sun_sin',   name:'이순신',     era:'조선', years:'1545~1598', vec:[9,7,4,3,5],
    tag:'스물세 번 싸워 스물세 번 이긴 결단의 제독',
    desc:'물러설 수 없는 자리에서 물러서지 않되, 이길 수 있는 조건을 끝까지 계산했던 사람. 난중일기라는 기록을 남긴 기록자이기도 했습니다.',
    link:'../../maps/medieval2/index.html?event=battle_1597_01', link_label:'명량대첩' },
  { id:'sejong',       name:'세종',       era:'조선', years:'1397~1450', vec:[3,9,8,6,6],
    tag:'앎으로 다스리고 백성의 일상을 바꾼 군주',
    desc:'문자·과학·음악·조세까지, 지식으로 통치의 구조를 다시 설계한 사람. 반대는 힘이 아니라 논증으로 넘었습니다.',
    link:'../../maps/medieval2/index.html?event=culture_1443_01', link_label:'훈민정음 창제' },
  { id:'jeong_yak_yong', name:'정약용',   era:'조선', years:'1762~1836', vec:[2,9,7,4,5],
    tag:'유배지에서도 500권을 쓴 구조의 설계자',
    desc:'분노 대신 분석을, 한탄 대신 설계를 택한 사람. 목민심서부터 거중기까지, 세상을 고치는 도면을 그렸습니다.',
    link:'../../maps/medieval2/index.html?event=culture_1750_02', link_label:'실학과 토지개혁론' },
  { id:'jang_yeong_sil', name:'장영실',   era:'조선', years:'15세기',    vec:[2,9,4,3,8],
    tag:'신분의 벽을 기술로 넘은 발명가',
    desc:'관노 출신으로 궁정 과학의 정점에 오른 사람. 자격루·앙부일구·측우기 — 문제를 만나면 기계를 만들었습니다.',
    link:'../../maps/medieval2/index.html?event=science_1434_02', link_label:'장영실의 발명' },
  { id:'sin_saimdang', name:'신사임당',   era:'조선', years:'1504~1551', vec:[2,8,3,6,5],
    tag:'자기 세계를 끝까지 지킨 예술가',
    desc:'시·글씨·그림으로 자기만의 세계를 세운 사람. 시대의 틀 안에서도 재능을 꺾지 않는 길이 있음을 보여줬습니다.',
    link:'../../maps/medieval2/index.html?event=culture_1560_01', link_label:'조선의 여성 예술가들' },
  { id:'heo_jun',      name:'허준',       era:'조선', years:'1539~1615', vec:[2,9,4,5,4],
    tag:'전쟁통에도 붓을 놓지 않은 의학자',
    desc:'전란과 유배 속에서 25년에 걸쳐 동의보감을 완성한 사람. 지식을 백성이 쓸 수 있는 형태로 정리하는 데 생을 걸었습니다.',
    link:'../../maps/medieval2/index.html?event=culture_1610_01', link_label:'동의보감 완성' },
  { id:'seo_hui',      name:'서희',       era:'고려', years:'942~998',   vec:[4,6,4,9,3],
    tag:'말로 강동 6주를 얻어낸 협상가',
    desc:'80만 대군 앞에서 적이 진짜 원하는 것을 읽어낸 사람. 싸우지 않고 이기는 길이 실제로 존재함을 증명했습니다.',
    link:'../../maps/medieval1/index.html?event=battle_0993_01', link_label:'서희의 담판' },
  { id:'gwanggaeto',   name:'광개토대왕', era:'고구려', years:'374~412', vec:[9,3,5,3,8],
    tag:'지도를 다시 그린 정복 군주',
    desc:'열여덟에 즉위해 사방으로 강역을 넓힌 사람. 머뭇거림 없는 결단과 미지의 땅으로 나아가는 추진력의 화신입니다.',
    link:'../../maps/ancient/index.html?event=political_391_01', link_label:'광개토대왕 즉위' },
  { id:'eulji',        name:'을지문덕',   era:'고구려', years:'6~7세기', vec:[8,8,3,4,4],
    tag:'적진에 홀로 들어간 지장(智將)',
    desc:'용맹과 계산이 하나였던 사람. 거짓 항복, 유인, 그리고 살수 — 싸움을 시로 조롱할 만큼의 여유까지 갖췄습니다.',
    link:'../../maps/ancient/index.html?event=battle_612_01', link_label:'살수대첩' },
  { id:'gwak_jae_u',   name:'곽재우',     era:'조선', years:'1552~1617', vec:[8,4,3,4,7],
    tag:'가장 먼저 일어선 홍의장군',
    desc:'나라가 무너질 때 관직도 없이 재산을 풀어 일어선 사람. 남이 시키기 전에 움직이는 자발성의 상징입니다.',
    link:'../../maps/medieval2/index.html?event=movement_1592_04', link_label:'전국 의병의 봉기' },
  { id:'jeongjo',      name:'정조',       era:'조선', years:'1752~1800', vec:[4,7,9,5,4],
    tag:'제도와 도시로 개혁을 밀어붙인 군주',
    desc:'규장각·장용영·화성 — 사람을 바꾸는 대신 판을 새로 깐 사람. 개혁이 시스템의 문제임을 알았던 통치자입니다.',
    link:'../../maps/medieval2/index.html?event=culture_1796_01', link_label:'수원화성 완공' },
  { id:'yu_gwan_sun',  name:'유관순',     era:'근대', years:'1902~1920', vec:[8,4,5,6,4],
    tag:'열여덟의 신념, 감옥에서도 꺾이지 않은',
    desc:'고향으로 내려가 만세운동을 조직하고, 옥중에서도 만세를 외친 사람. 신념 앞에서 나이도 감옥도 변수가 아니었습니다.',
    link:'../../map.html?event=righteous_1920_04', link_label:'유관순 순국' },
  { id:'an_chang_ho',  name:'안창호',     era:'근대', years:'1878~1938', vec:[3,7,7,9,5],
    tag:'사람을 기르는 것이 독립이라 믿은 조직가',
    desc:'흥사단·대성학교 — 분열된 진영 사이에서 끝까지 통합을 설득한 사람. 힘은 총이 아니라 인격과 조직에서 나온다고 믿었습니다.',
    link:'../../map.html?event=organization_1913_01', link_label:'흥사단 창립' },
  { id:'lee_hoe_yeong', name:'이회영',    era:'근대', years:'1867~1932', vec:[6,5,6,5,9],
    tag:'전 재산을 팔아 만주로 간 명문가',
    desc:'조선 최고 갑부 집안 여섯 형제가 전 재산을 처분해 망명, 신흥무관학교를 세운 사람. 가진 것을 전부 걸고 새 판을 짰습니다.',
    link:'../../map.html?event=person_1920_05', link_label:'이회영의 망명' },
  { id:'seondeok',     name:'선덕여왕',   era:'신라', years:'?~647',     vec:[3,6,6,8,6],
    tag:'첨성대를 세운 최초의 여왕',
    desc:'안팎의 반발 속에서 인재를 알아보고 쓰는 것으로 답한 사람. 김유신과 김춘추를 중용해 통일의 초석을 놓았습니다.',
    link:'../../maps/ancient/index.html?event=culture_632_01', link_label:'선덕여왕과 첨성대' },
  { id:'yeo_un_hyung', name:'여운형',     era:'현대', years:'1886~1947', vec:[4,6,6,9,5],
    tag:'갈라진 시대의 다리가 되려 했던 사람',
    desc:'해방 정국에서 좌우 사이에 다리를 놓다 양쪽 모두의 표적이 된 사람. 중간지대의 외로움을 끝까지 감당했습니다.',
    link:'../../maps/modern2/index.html?event=movement_1946_01', link_label:'좌우합작운동' },

  // ── 2026-07 인물 보강분에서 추가 (8명) ──────────────────────
  { id:'gyebaek',      name:'계백',       era:'백제', years:'?~660',     vec:[10,3,2,3,3],
    tag:'오천 결사대의 마지막 지휘관',
    desc:'가족을 제 손으로 정리하고 황산벌로 나가 네 번을 이긴 뒤 스러진 사람. 순수한 결사의 각오가 무엇인지 보여줍니다.',
    link:'../../maps/ancient/index.html?event=battle_660_02', link_label:'계백 — 황산벌' },
  { id:'yang_gyu',     name:'양규',       era:'고려', years:'?~1011',    vec:[9,4,3,3,5],
    tag:'포로 3만을 구하고 마지막 화살까지 싸운 장수',
    desc:'거란 40만 대군의 퇴로에서 일곱 번 싸워 끌려가던 백성을 구해낸 사람. 이기는 싸움이 아니라 버티는 싸움의 가치를 보여줍니다.',
    link:'../../maps/medieval1/index.html?event=battle_1011_01', link_label:'양규 — 흥화진의 사수' },
  { id:'jinul',        name:'지눌',       era:'고려', years:'1158~1210', vec:[2,8,8,4,5],
    tag:'타락한 종교를 산으로 데려간 개혁가',
    desc:'권력과 결탁한 불교를 등지고 근본으로 돌아가자는 정혜결사를 일으킨 사람. 조직 개혁이 늘 밖이 아니라 안에서 시작됨을 보여줍니다.',
    link:'../../maps/medieval1/index.html?event=culture_1200_02', link_label:'지눌 — 정혜결사' },
  { id:'kim_man_deok', name:'김만덕',     era:'조선', years:'1739~1812', vec:[2,4,5,7,7],
    tag:'전 재산으로 섬을 살린 제주의 거상',
    desc:'상업으로 신분과 섬이라는 이중의 벽을 넘고, 정작 위기의 순간엔 그 재산을 전부 사람들에게 돌려준 사람입니다.',
    link:'../../maps/medieval2/index.html?event=economic_1795_01', link_label:'김만덕 — 제주의 거상' },
  { id:'yun_hui_sun',  name:'윤희순',     era:'근대', years:'1860~1935', vec:[6,5,4,8,5],
    tag:'노래로 조직하고 화약으로 싸운 여성 의병장',
    desc:'안사람 의병가로 여성들을 조직해 병참을 떠받치고, 나라가 망하자 만주로 건너가 3대에 걸쳐 항일을 이어간 사람입니다.',
    link:'../../map.html?event=person_1907_01', link_label:'윤희순 — 최초의 여성 의병 지도자' },
  { id:'nam_ja_hyeon', name:'남자현',     era:'근대', years:'1872~1933', vec:[9,3,3,5,6],
    tag:'손가락을 잘라 조선의 뜻을 세계에 전한 사람',
    desc:'마흔일곱에 만주로 건너가 독립군의 어머니로 불리며, 국제사회를 향해 몸으로 증언한 사람입니다.',
    link:'../../map.html?event=person_1933_02', link_label:'남자현 — 독립군의 어머니' },
  { id:'jeong_seon',   name:'정선',       era:'조선', years:'1676~1759', vec:[2,5,4,4,10],
    tag:'조선의 산천을 조선의 눈으로 그린 화가',
    desc:'중국 화보를 베끼던 관습을 버리고 직접 발로 밟은 산과 강을 그려 진경산수라는 새 화풍을 완성한 사람. 일흔 넘어서도 붓을 놓지 않았습니다.',
    link:'../../maps/medieval2/index.html?event=culture_1751_01', link_label:'정선 — 인왕제색도' },
  { id:'jeon_hyeong_pil', name:'전형필', era:'근대', years:'1906~1962', vec:[2,7,6,4,5],
    tag:'총 대신 곳간으로 문화재를 지킨 사람',
    desc:'물려받은 전 재산을 문화재 수호에 바쳐, 훈민정음 해례본을 비롯한 국보급 유산을 지켜낸 사람입니다.',
    link:'../../map.html?event=person_1943_03', link_label:'전형필 — 간송, 문화재를 지키다' },
];

// 서사 헤드라인 우선순위 — 상징성 높은 시나리오부터.
const FRAG_PRIORITY = ['uibyeong_1592','myeongnyang_1597','samil_1919','salsu_612','haebang_1945','culture_1938','righteous_1907','hangeul_1443','seohui_993','daedong_1608','manmin_1898','hwaseong_1794','gaehang_1876','today'];

// ── 상태 ─────────────────────────────────────────────────────
let step = -1;                 // -1: 인트로, 0..11: 문항, 12: 결과
const answers = [];            // {scenarioId, optionIdx}
const scores = { w:0, s:0, r:0, d:0, p:0 };

const $ = (sel) => document.querySelector(sel);
const app = () => $('#app');

function esc(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

// ── 렌더 ─────────────────────────────────────────────────────
function renderIntro(){
  app().innerHTML = `
    <div class="cr-card cr-intro">
      <div class="cr-kicker">ATLAS 프로젝트</div>
      <h1 class="cr-title">역사의 갈림길</h1>
      <p class="cr-sub">열두 번의 선택 — 당신은 역사 속 누구와 같은 길을 걷습니까?</p>
      <p class="cr-desc">이것은 성격 검사가 아닙니다. 612년 살수부터 1945년 해방 정국까지,
      실제로 있었던 열두 개의 딜레마 앞에 당신을 세웁니다. 답을 고를 때마다
      실제 역사가 내렸던 선택이 열리고, 마지막에는 당신의 선택 패턴과 가장
      닮은 역사 인물을 만나게 됩니다.</p>
      <button class="cr-btn cr-btn-primary" onclick="startGame()">첫 번째 갈림길로 →</button>
      <p class="cr-fineprint">약 3분 · 회원가입 없음 · 결과는 저장되지 않습니다</p>
    </div>`;
}

function renderQuestion(){
  const sc = SCENARIOS[step];
  const opts = sc.options.map((o,i) =>
    `<button class="cr-option" onclick="choose(${i})">${esc(o.text)}</button>`).join('');
  app().innerHTML = `
    <div class="cr-card">
      <div class="cr-progress"><div class="cr-progress-bar" style="width:${(step)/SCENARIOS.length*100}%"></div></div>
      <div class="cr-qmeta">${step+1} / ${SCENARIOS.length} · <b>${esc(sc.year)}</b> · ${esc(sc.place)}</div>
      <p class="cr-situation">${esc(sc.situation)}</p>
      <div class="cr-options">${opts}</div>
    </div>`;
  window.scrollTo({top:0});
}

function renderReveal(optIdx){
  const sc = SCENARIOS[step];
  const linkHtml = sc.link ? `<a class="cr-reveal-link" href="${sc.link}" target="_blank" rel="noopener">🧭 ${esc(sc.link_label)}</a>` : '';
  const last = step === SCENARIOS.length - 1;
  app().innerHTML = `
    <div class="cr-card">
      <div class="cr-progress"><div class="cr-progress-bar" style="width:${(step+1)/SCENARIOS.length*100}%"></div></div>
      <div class="cr-qmeta"><b>${esc(sc.year)}</b> · 당신의 선택</div>
      <p class="cr-mychoice">“${esc(sc.options[optIdx].text)}”</p>
      <div class="cr-reveal">
        <div class="cr-reveal-label">실제 역사에서는</div>
        <p>${esc(sc.reveal)}</p>
        ${linkHtml}
      </div>
      <button class="cr-btn cr-btn-primary" onclick="nextStep()">${last ? '결과 보기 →' : '다음 갈림길 →'}</button>
    </div>`;
  window.scrollTo({top:0});
}

function cosine(a,b){
  let dot=0, na=0, nb=0;
  for(let i=0;i<a.length;i++){ dot+=a[i]*b[i]; na+=a[i]*a[i]; nb+=b[i]*b[i]; }
  return na&&nb ? dot/Math.sqrt(na*nb) : 0;
}

function renderResult(){
  const userVec = ['w','s','r','d','p'].map(k=>scores[k]);
  const ranked = FIGURES.map(f=>({f, sim: cosine(userVec, f.vec)}))
    .sort((a,b)=>b.sim-a.sim);
  const top = ranked[0];
  const pct = (s)=>Math.round(s*100);

  // 서사 헤드라인: 최고 축과 일치하는 선택 중 상징성 우선순위가 높은 것.
  const maxScore = Math.max(...userVec);
  const topAxes = AXES.filter((ax)=>scores[ax.key]===maxScore).map(a=>a.key);
  let headline = null;
  for(const sid of FRAG_PRIORITY){
    const ansIdx = answers.findIndex(a=>a.scenarioId===sid);
    if(ansIdx<0) continue;
    const sc = SCENARIOS.find(s=>s.id===sid);
    const opt = sc.options[answers[ansIdx].optionIdx];
    const primary = Object.entries(opt.axes).sort((a,b)=>b[1]-a[1])[0][0];
    if(topAxes.includes(primary)){ headline = { year: sc.year, frag: opt.frag }; break; }
  }
  if(!headline){
    const sc = SCENARIOS.find(s=>s.id===FRAG_PRIORITY[0]);
    const a = answers.find(x=>x.scenarioId===sc.id);
    headline = { year: sc.year, frag: sc.options[a.optionIdx].frag };
  }

  const maxAxis = Math.max(...userVec, 1);
  const bars = AXES.map((ax,i)=>`
    <div class="cr-dna-row">
      <span class="cr-dna-label">${ax.icon} ${ax.name} <small>${ax.en}</small></span>
      <div class="cr-dna-track"><div class="cr-dna-fill" style="width:${userVec[i]/maxAxis*100}%"></div></div>
      <span class="cr-dna-val">${userVec[i]}</span>
    </div>`).join('');

  const others = ranked.slice(1,3).map(r=>
    `<span class="cr-runner">${esc(r.f.name)} ${pct(r.sim)}%</span>`).join('');

  const shareText = `${headline.year}, ${headline.frag}.\n열두 번의 갈림길 — 내 선택은 ${top.f.name}과(와) ${pct(top.sim)}% 겹쳤다.\n\n역사의 갈림길 · ATLAS\nhttps://atlas.mkhz.kr/play/crossroads/`;

  app().innerHTML = `
    <div class="cr-card cr-result">
      <div class="cr-kicker">당신의 갈림길</div>
      <p class="cr-headline">“${esc(headline.year)}, ${esc(headline.frag)}.”</p>
      <p class="cr-verdict">그 선택은 <b>${esc(top.f.name)}</b>과(와) <b>${pct(top.sim)}%</b> 겹칩니다</p>

      <div class="cr-figure">
        <div class="cr-figure-name">${esc(top.f.name)} <span class="cr-figure-era">${esc(top.f.era)} · ${esc(top.f.years)}</span></div>
        <div class="cr-figure-tag">${esc(top.f.tag)}</div>
        <p class="cr-figure-desc">${esc(top.f.desc)}</p>
        <a class="cr-reveal-link" href="${top.f.link}" target="_blank" rel="noopener">🧭 ${esc(top.f.link_label)} — 지도에서 만나기</a>
      </div>

      <div class="cr-runners">비슷한 선택을 한 인물 — ${others}</div>

      <div class="cr-dna">
        <div class="cr-dna-title">당신의 History DNA</div>
        ${bars}
      </div>

      <div class="cr-actions">
        <button class="cr-btn cr-btn-primary" onclick="shareResult(this)" data-share="${esc(shareText)}">결과 공유하기</button>
        <button class="cr-btn" onclick="restart()">다시 갈림길에 서기</button>
        <a class="cr-btn" href="../../index.html">ATLAS 지도로 →</a>
      </div>
    </div>`;
  window.scrollTo({top:0});
}

// ── 진행 ─────────────────────────────────────────────────────
window.startGame = function(){ step = 0; renderQuestion(); };
window.choose = function(i){
  const sc = SCENARIOS[step];
  answers.push({ scenarioId: sc.id, optionIdx: i });
  for(const [k,v] of Object.entries(sc.options[i].axes)) scores[k]+=v;
  renderReveal(i);
};
window.nextStep = function(){
  step++;
  if(step >= SCENARIOS.length) renderResult(); else renderQuestion();
};
window.restart = function(){
  step = -1; answers.length = 0;
  for(const k of Object.keys(scores)) scores[k]=0;
  renderIntro();
};
window.shareResult = async function(btn){
  const text = btn.dataset.share;
  if(navigator.share){
    try{ await navigator.share({ text }); return; }catch(e){ /* 사용자가 취소 */ }
  }
  try{
    await navigator.clipboard.writeText(text);
    btn.textContent = '복사됐습니다 — SNS에 붙여넣으세요!';
    setTimeout(()=>{ btn.textContent = '결과 공유하기'; }, 2500);
  }catch(e){ alert(text); }
};

renderIntro();
