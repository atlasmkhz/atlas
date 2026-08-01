// maps/medieval2/data/joseon_thinkers.js — 조선 사상가 분포도
//
// 2026-08-01 신설. 왕두목 기획.
//
// ══════════════════════════════════════════════════════════════
// ■ 이 데이터는 '동선'이 아니라 '분포'다
// ══════════════════════════════════════════════════════════════
// 왕두목 지시: "루트를 만드는데 이건 이동 동선을 알기 위함이 아닌
// 전국 지도에서 누가 어디에서 살았는지를 한눈에 보고자 하기 위함이야.
// 물론 유배살이를 했던 인물들은 유배 동선도 함께 넣어주면 좋고."
//
// 그래서 두 층으로 나눈다.
//   base   — 그 사람이 나고 자라고 가르친 곳(점). 이게 주된 층이다.
//   exiles — 유배를 간 사람만 갖는 선. 강제 이동이므로 점선·붉은 계열로
//            구분한다. 자발적 낙향은 선이 아니라 base 추가로 처리한다.
//
// ■ 왜 별도 페이지인가
// 조선 지도의 routeRenderer.js는 웨이포인트 사이 경로선을 더 이상
// 그리지 않는다("화면이 어지럽다"는 피드백, 파일 상단 주석 참조).
// 분포도에는 그 편이 오히려 맞지만 유배 동선은 선이 필요하다.
// 그래서 붕당 계보도와 같이 독립 페이지(joseon_thinkers.html)로 만든다.
//
// ■ 좌표의 정직성
// 생가터가 확인되는 인물(정여립 완주 상관면, 정약용 남양주 조안 등)은
// 그 지점을, 확인되지 않으면 활동 근거지의 중심을 찍고 precise:false로
// 표시한다. 선사 지도에서 coordPrecision을 명시한 것과 같은 원칙이다.
//
// ■ school — 학파/계보
// 사상사를 지역으로만 보면 학맥이 안 보이고, 학맥으로만 보면 지역색이
// 안 보인다. 두 축을 함께 두어야 "영남은 왜 남인인가" 같은 질문이
// 데이터로 풀린다.

window.JOSEON_THINKERS = {

  schools: {
    goryeo_neo:  { label: '고려말 성리학 도입', color: '#7a7266' },
    founding:    { label: '조선 건국 설계',     color: '#8b5a3a' },
    sarim_early: { label: '초기 사림·도학',     color: '#8a7a4b' },
    gi:          { label: '기(氣) 중심 — 서경덕 계', color: '#3f7fbf' },
    yeongnam:    { label: '영남학파 — 이황 계',  color: '#7a9a4b' },
    nammyeong:   { label: '남명학파 — 조식 계',  color: '#b5544a' },
    giho:        { label: '기호학파 — 이이 계',  color: '#c8963c' },
    dissent:     { label: '이단으로 몰린 사상',  color: '#9a4fa0' },
    yangming:    { label: '양명학 — 강화학파',   color: '#4aa39a' },
    silhak:      { label: '실학 — 경세치용·이용후생', color: '#6b8fd4' },
    china:       { label: '중국 사상 (비교축)',  color: '#6b6455' },
  },

  thinkers: [

    // ── 고려말 — 성리학의 도입 ────────────────────────────────
    {
      id: 'tk_anhyang', name: '안향', years: '1243~1306', school: 'goryeo_neo',
      base: '경상도 순흥 (영주)', lat: 36.9430, lng: 128.5310, precise: true,
      one_line: '원에서 주자서를 베껴 와 성리학을 처음 들여왔다.',
      archive: 'th_01_anhyang', card_ref: null, exiles: [],
    },
    {
      id: 'tk_ijehyeon', name: '이제현', years: '1287~1367', school: 'goryeo_neo',
      base: '개경 · 원 연경 왕래', lat: 37.9700, lng: 126.5550, precise: false,
      one_line: '원의 만권당에서 중국 학자들과 교유하며 성리학을 심화했다.',
      archive: 'th_01_anhyang', card_ref: null, exiles: [],
    },
    {
      id: 'tk_isaek', name: '이색', years: '1328~1396', school: 'goryeo_neo',
      base: '충청도 한산 (서천)', lat: 36.1080, lng: 126.7690, precise: true,
      one_line: '성균관을 다시 세워 정몽주·정도전을 함께 길러낸 스승.',
      archive: 'th_02_isaek', card_ref: null,
      exiles: [{ to: '경기도 여주', lat: 37.2980, lng: 127.6370, year: 1391, note: '조선 건국 직전 유배' }],
    },
    {
      id: 'tk_jeongmongju', name: '정몽주', years: '1337~1392', school: 'goryeo_neo',
      base: '경상도 영천', lat: 35.9730, lng: 128.9380, precise: true,
      one_line: '고려를 고쳐 쓰자던 온건개혁파. 선죽교에서 죽었다.',
      archive: 'th_02_isaek', card_ref: null, exiles: [],
    },
    {
      id: 'tk_jeongdojeon', name: '정도전', years: '1342~1398', school: 'founding',
      base: '한양 (경복궁 설계)', lat: 37.5796, lng: 126.9770, precise: true,
      one_line: '왕이 아니라 재상이 다스리는 나라를 설계했다.',
      archive: 'th_03_jeongdojeon', card_ref: 'political_1394_02',
      exiles: [{ to: '전라도 나주 회진', lat: 34.9560, lng: 126.6790, year: 1375, note: '친원 정책에 반대하다 유배 — 이곳의 농민 생활이 그의 사상을 바꿨다' }],
    },

    // ── 15~16세기 — 사림과 도학 ──────────────────────────────
    {
      id: 'tk_kimjongjik', name: '김종직', years: '1431~1492', school: 'sarim_early',
      base: '경상도 밀양', lat: 35.5040, lng: 128.7470, precise: true,
      one_line: '사림의 종조. 그가 쓴 조의제문이 무오사화를 불렀다.',
      archive: 'th_04_dohak', card_ref: 'massacre_1498_01', exiles: [],
    },
    {
      id: 'tk_jogwangjo', name: '조광조', years: '1482~1519', school: 'sarim_early',
      base: '한양 · 경기 용인', lat: 37.2410, lng: 127.1780, precise: false,
      one_line: '도학정치를 밀어붙이다 4년 만에 사약을 받았다.',
      archive: 'th_04_dohak', card_ref: 'massacre_1519_01',
      exiles: [{ to: '전라도 능주 (화순)', lat: 35.0140, lng: 126.9860, year: 1519, note: '기묘사화로 유배, 한 달 만에 사사' }],
    },

    // ── 16세기 — 학파의 분화 ─────────────────────────────────
    {
      id: 'tk_seogyeongdeok', name: '서경덕', years: '1489~1546', school: 'gi',
      base: '개성 화담', lat: 37.9720, lng: 126.5540, precise: true,
      one_line: '벼슬을 마다하고 기(氣)로 세계를 설명한 독학자.',
      archive: 'th_05_seogyeongdeok', card_ref: 'culture_1530_01', exiles: [],
    },
    {
      id: 'tk_yihwang', name: '이황', years: '1501~1570', school: 'yeongnam',
      base: '경상도 예안 (안동 도산)', lat: 36.7280, lng: 128.8450, precise: true,
      one_line: '이(理)의 우위와 수양을 세워 영남학파의 뿌리가 되었다.',
      archive: 'th_06_yihwang_josik', card_ref: 'culture_1568_01', exiles: [],
    },
    {
      id: 'tk_josik', name: '조식', years: '1501~1572', school: 'nammyeong',
      base: '경상도 삼가·산청 덕산', lat: 35.3720, lng: 127.8000, precise: true,
      one_line: '칼을 차고 다닌 선비. 실천하지 않는 학문을 거부했다.',
      archive: 'th_06_yihwang_josik', card_ref: 'culture_1555_01', exiles: [],
    },
    {
      id: 'tk_yiyi', name: '이이', years: '1536~1584', school: 'giho',
      base: '강원도 강릉 · 황해도 해주 석담', lat: 37.7790, lng: 128.8780, precise: true,
      one_line: '고치지 않으면 망한다며 경장(更張)을 외쳤다.',
      archive: 'th_07_yiyi', card_ref: 'political_1575_01', exiles: [],
    },

    {
      id: 'tk_gidaeseung', name: '기대승', years: '1527~1572', school: 'giho',
      base: '전라도 광주 (고봉)', lat: 35.1600, lng: 126.8510, precise: true,
      one_line: '이황과 8년간 편지를 주고받으며 사단칠정 논쟁을 만들었다.',
      archive: 'th_06_yihwang_josik', card_ref: 'culture_1568_01', exiles: [],
    },
    {
      id: 'tk_seonghon', name: '성혼', years: '1535~1598', school: 'giho',
      base: '경기도 파주 우계', lat: 37.8600, lng: 126.8000, precise: true,
      one_line: '이이의 벗이자 논적. 서인 학맥의 또 하나의 뿌리가 되었다.',
      archive: 'th_07_yiyi', card_ref: 'political_1575_01', exiles: [],
    },

    // ── 16~17세기 — 이단으로 몰린 사상 ───────────────────────
    {
      id: 'tk_jeongingong', name: '정인홍', years: '1536~1623', school: 'nammyeong',
      base: '경상도 합천', lat: 35.5660, lng: 128.1660, precise: true,
      one_line: '남명의 제자이자 의병장. 북인 정권의 기둥이었다가 처형됐다.',
      archive: 'th_08_jeongingong', card_ref: 'political_1613_01', exiles: [],
    },
    {
      id: 'tk_jeongyeorip', name: '정여립', years: '1546~1589', school: 'dissent',
      base: '전라도 전주 (완주 상관면 생가터)', lat: 35.7580, lng: 127.1900, precise: true,
      one_line: '천하는 공물이라 했다. 조선 최대의 옥사가 그의 죽음에서 시작됐다.',
      archive: 'th_09_jeongyeorip', card_ref: 'massacre_1589_01',
      exiles: [{ to: '진안 죽도', lat: 35.7917, lng: 127.4250, year: 1589, note: '관군 포위 중 사망 — 자결로 기록되었으나 사인은 불분명', kind: 'death' }],
    },
    {
      id: 'tk_heogyun', name: '허균', years: '1569~1618', school: 'dissent',
      base: '강원도 강릉 사천', lat: 37.8210, lng: 128.8760, precise: true,
      one_line: '호민을 말하고 서얼을 옹호했다. 능지처참으로 죽었다.',
      archive: 'th_10_heogyun', card_ref: 'massacre_1618_01',
      exiles: [{ to: '전라도 함열 (익산)', lat: 36.0700, lng: 126.9800, year: 1611, note: '유배 중 홍길동전과 성소부부고를 썼다고 전한다' }],
    },

    // ── 중국 사상 — 비교축 ───────────────────────────────────
    {
      id: 'tk_wangyangming', name: '왕양명', years: '1472~1529', school: 'china',
      base: '중국 절강 여요', lat: 30.0380, lng: 121.1540, precise: false,
      one_line: '마음이 곧 이치라 했다. 조선에서는 이단으로 배척됐다.',
      archive: 'th_11_yangming', card_ref: null, exiles: [],
    },
    {
      id: 'tk_yiji', name: '이지 (이탁오)', years: '1527~1602', school: 'china',
      base: '중국 복건 천주', lat: 24.8740, lng: 118.6750, precise: false,
      one_line: '동심설로 유교의 위선을 찔렀다. 옥에서 스스로 목숨을 끊었다.',
      archive: 'th_11_yangming', card_ref: null, exiles: [],
    },

    // ── 17세기 — 주자를 넘어서려는 시도 ──────────────────────
    {
      id: 'tk_yunhyu', name: '윤휴', years: '1617~1680', school: 'dissent',
      base: '경기도 여주 · 충청도 공주', lat: 37.2980, lng: 127.6370, precise: false,
      one_line: '주자의 주석을 고쳐 썼다가 사문난적이 되었고, 끝내 사약을 받았다.',
      archive: 'th_12_yunhyu', card_ref: 'massacre_1680_02', exiles: [],
    },
    {
      id: 'tk_baksedang', name: '박세당', years: '1629~1703', school: 'dissent',
      base: '경기도 양주 석천동 (의정부)', lat: 37.7380, lng: 127.0470, precise: true,
      one_line: '사변록으로 또 한 번 사문난적이 되었다.',
      archive: 'th_12_yunhyu', card_ref: null, exiles: [],
    },
    {
      id: 'tk_jeongjedu', name: '정제두', years: '1649~1736', school: 'yangming',
      base: '강화 하곡', lat: 37.7470, lng: 126.4850, precise: true,
      one_line: '조선에서 유일하게 양명학을 학파로 세웠다 — 강화학파.',
      archive: 'th_13_gangwha', card_ref: 'culture_1709_01', exiles: [],
    },

    {
      id: 'tk_kimjangsaeng', name: '김장생', years: '1548~1631', school: 'giho',
      base: '충청도 연산 (논산)', lat: 36.2010, lng: 127.1990, precise: true,
      one_line: '조선 예학(禮學)의 종장. 그의 예론이 예송논쟁의 토대가 되었다.',
      archive: 'th_18_songsiyeol', card_ref: null, exiles: [],
    },
    {
      id: 'tk_songsiyeol', name: '송시열', years: '1607~1689', school: 'giho',
      base: '충청도 회덕 (대전) · 괴산 화양동', lat: 36.3504, lng: 127.3845, precise: true,
      one_line: '주자를 절대화하고 북벌을 내걸었다. 조선 후기를 가장 오래 지배한 사상.',
      archive: 'th_18_songsiyeol', card_ref: 'massacre_1689_02',
      exiles: [
        { to: '제주', lat: 33.4996, lng: 126.5312, year: 1689, note: '기사환국으로 유배' },
        { to: '전라도 정읍', lat: 35.5699, lng: 126.8560, year: 1689, note: '국문을 위해 압송되던 중 사약을 받았다', kind: 'death' },
      ],
    },
    {
      id: 'tk_heomok', name: '허목', years: '1595~1682', school: 'yeongnam',
      base: '경기도 연천 · 한양', lat: 38.0960, lng: 127.0750, precise: false,
      one_line: '남인의 영수. 예송에서 왕은 사대부와 다르다고 맞섰다.',
      archive: 'th_18_songsiyeol', card_ref: 'political_1659_02', exiles: [],
    },
    {
      id: 'tk_yunseondo', name: '윤선도', years: '1587~1671', school: 'yeongnam',
      base: '전라도 해남 녹우당', lat: 34.5730, lng: 126.6000, precise: true,
      one_line: '어부사시사의 시인이자 남인 논객. 세 차례 유배를 살았다.',
      archive: 'th_18_songsiyeol', card_ref: null,
      exiles: [
        { to: '함경도 삼수', lat: 41.3000, lng: 128.1000, year: 1660, note: '예송에서 서인을 공격하다 유배' },
        { to: '전라도 보길도', lat: 34.1490, lng: 126.5390, year: 1667, note: '해배 후 은거하며 어부사시사를 지었다' },
      ],
    },

    // ── 17~18세기 — 실학의 태동 ──────────────────────────────
    {
      id: 'tk_yuhyeongwon', name: '유형원', years: '1622~1673', school: 'silhak',
      base: '전라도 부안 우반동', lat: 35.6420, lng: 126.6790, precise: true,
      one_line: '20년 은거하며 반계수록을 썼다. 토지에서 답을 찾았다.',
      archive: 'th_14_land', card_ref: 'culture_1750_02', exiles: [],
    },
    {
      id: 'tk_yiik', name: '이익', years: '1681~1763', school: 'silhak',
      base: '경기도 안산 첨성리', lat: 37.3210, lng: 126.8310, precise: true,
      one_line: '한전론과 붕당론. 제도로 세상을 설명하려 했다.',
      archive: 'th_14_land', card_ref: 'culture_1750_02', exiles: [],
    },

    // ── 18세기 — 북학 ────────────────────────────────────────
    {
      id: 'tk_hongdaeyong', name: '홍대용', years: '1731~1783', school: 'silhak',
      base: '충청도 천안 수신면', lat: 36.7900, lng: 127.2470, precise: true,
      one_line: '지구가 돈다고 했고, 중화와 오랑캐의 구분을 무너뜨렸다.',
      archive: 'th_15_bukhak', card_ref: 'culture_1778_02', exiles: [],
    },
    {
      id: 'tk_bakjiwon', name: '박지원', years: '1737~1805', school: 'silhak',
      base: '황해도 연암협 · 한양', lat: 38.0130, lng: 126.4400, precise: false,
      one_line: '열하일기로 청을 보고 왔고, 문체로 조정과 부딪쳤다.',
      archive: 'th_15_bukhak', card_ref: 'culture_joseonlate_05', exiles: [],
    },
    {
      id: 'tk_bakjega', name: '박제가', years: '1750~1805', school: 'silhak',
      base: '한양 (규장각 검서관)', lat: 37.5820, lng: 126.9910, precise: true,
      one_line: '서얼 출신 검서관. 쓰지 않으면 가난해진다는 소비론을 폈다.',
      archive: 'th_15_bukhak', card_ref: 'policy_1776_02',
      exiles: [{ to: '함경도 종성', lat: 42.7500, lng: 129.8500, year: 1801, note: '신유박해에 연루되어 유배' }],
    },

    // ── 18~19세기 — 집대성 ───────────────────────────────────
    {
      id: 'tk_jeongyagyong', name: '정약용', years: '1762~1836', school: 'silhak',
      base: '경기도 남양주 마재 (조안면)', lat: 37.5390, lng: 127.3070, precise: true,
      one_line: '18년 유배지에서 500여 권을 썼다. 조선 실학의 집대성.',
      archive: 'th_16_jeongyagyong', card_ref: 'massacre_1801_01',
      exiles: [
        { to: '경상도 장기 (포항)', lat: 35.9350, lng: 129.5310, year: 1801, note: '신유박해로 첫 유배' },
        { to: '전라도 강진', lat: 34.6420, lng: 126.7670, year: 1801, note: '황사영 백서 사건으로 이배 — 18년을 머물며 저술' },
        { to: '경기도 남양주 마재', lat: 37.5390, lng: 127.3070, year: 1818, note: '해배, 고향으로 돌아와 저술을 정리' },
      ],
    },
    {
      id: 'tk_jeongyakjeon', name: '정약전', years: '1758~1816', school: 'silhak',
      base: '경기도 남양주 마재', lat: 37.5390, lng: 127.3070, precise: true,
      one_line: '흑산도에서 자산어보를 썼다. 정약용의 형.',
      archive: 'th_16_jeongyagyong', card_ref: null,
      exiles: [{ to: '전라도 흑산도', lat: 34.6810, lng: 125.4340, year: 1801, note: '유배지에서 죽을 때까지 돌아오지 못했다' }],
    },
    {
      id: 'tk_choehangi', name: '최한기', years: '1803~1877', school: 'silhak',
      base: '한양', lat: 37.5700, lng: 126.9800, precise: false,
      one_line: '기(氣)로 서양 과학까지 끌어안으려 한 마지막 종합.',
      archive: 'th_17_choehangi', card_ref: 'culture_1857_01', exiles: [],
    },

    {
      id: 'tk_imseongju', name: '임성주', years: '1711~1788', school: 'gi',
      base: '충청도 청주 · 공주', lat: 36.6420, lng: 127.4890, precise: false,
      one_line: '서경덕의 기(氣) 철학을 조선 후기에 다시 세웠다.',
      archive: 'th_17_choehangi', card_ref: null, exiles: [],
    },
    {
      id: 'tk_kimjeonghui', name: '김정희', years: '1786~1856', school: 'silhak',
      base: '충청도 예산 (추사고택)', lat: 36.7060, lng: 126.8420, precise: true,
      one_line: '금석문을 실증으로 읽어냈다. 추사체와 세한도의 학예일치.',
      archive: 'th_17_choehangi', card_ref: null,
      exiles: [
        { to: '제주 대정', lat: 33.2280, lng: 126.2540, year: 1840, note: '9년 유배 — 이 시기에 추사체가 완성되고 세한도가 나왔다' },
        { to: '함경도 북청', lat: 40.2260, lng: 128.5330, year: 1851, note: '두 번째 유배' },
      ],
    },
  ],
};
