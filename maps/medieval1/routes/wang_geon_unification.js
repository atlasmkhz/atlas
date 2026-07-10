// routes/wang_geon_unification.js — 왕건통일루트
// 875(왕건 출생) ~ 943(훈요십조), 후삼국시대의 시작과 끝
//
// 웨이포인트 유형: 'birth'(출생), 'political'(건국·즉위·항복·유훈),
//   'battle'(전투), 'exile'(유폐·귀순)
//
// card_ref: 기존 data/01_taejo.js 카드 id — 클릭 시 해당 카드 팝업이
// 열린다. card_ref가 null이면 루트 전용 웨이포인트로 요약 팝업을
// 자체 생성한다.
//
// 데이터 메모: 고려 지도(medieval1)에는 아직 카드가 4개뿐이다(고려
// 건국·후삼국통일·훈요십조·역분전) — 이 프로젝트에서 가장 최근에
// 손댄 시대라 콘텐츠가 얇다. 그래서 이 루트의 절반 이상(궁예의
// 후고구려 건국, 견훤의 후백제 건국, 공산·고창·운주성 세 전투, 신라
// 항복, 견훤의 유폐와 귀순)은 전부 루트 전용으로 새로 썼다 — 후삼국
// 통일 전쟁의 뼈대를 이루는 사건들인데 아직 이 지도에 카드로 존재하지
// 않았기 때문이다. 나중에 궁예·견훤을 다루는 별도 루트나 카드를
// 만들게 되면, 여기서 새로 쓴 요약들이 좋은 출발점이 될 것이다.
//
// 좌표 메모: 공산전투는 대구 팔공산, 고창전투는 안동, 운주성전투는
// 홍성, 견훤의 후백제 건국지는 완산주(전주), 신라 항복은 경주,
// 견훤의 탈출·귀순 경로는 금산사(김제)에서 나주를 거쳐 개경으로
// 이어지는 것으로 알려져 있어 나주를 대표 지점으로 잡았다.

const ROUTE_WANG_GEON_UNIFICATION = {
  id: 'wang_geon_unification',
  name: '왕건통일루트',
  subject_type: 'person',
  period: '875~943',
  tagline: '송악 호족의 아들에서 고려의 태조로 — 궁예를 몰아내고, 견훤을 무릎 꿇리고, 신라의 항복을 받아 후삼국을 하나로 묶기까지',
  color: '#3a5a8c',
  total_waypoints: 12,
  hero_image: "assets/images/route/route_wang_geon_unification_hero.webp",

  card_refs: ['political_0918_01', 'political_0936_01', 'culture_0943_01'],

  waypoints: [

    {
      id: 'wp_01',
      type: 'birth',
      year: 877, month: null, day: null,
      title_ko: '출생 — 송악 호족 가문의 아들',
      place_ko: '송악(개성)',
      lat: 37.9707, lng: 126.5615,
      stay: null,
      summary_ko: '송악(개성) 지역의 유력 호족 가문에서 태어났다. 아버지 왕륭은 해상 무역으로 부를 쌓은 지방 세력가로, 신라 말 혼란기에 궁예에게 귀부하며 왕건이 궁예 정권에 진출할 발판을 마련해줬다.',
      card_ref: null,
    },

    {
      id: 'wp_02',
      type: 'political',
      year: 892, month: null, day: null,
      title_ko: '견훤, 후백제를 세우다',
      place_ko: '완산주(전주)',
      lat: 35.8242, lng: 127.1480,
      stay: null,
      summary_ko: '신라의 장수였던 견훤은 신라 말 극심한 혼란을 틈타 892년 무진주(광주)에서 자립한 뒤, 완산주(전주)를 도읍으로 삼아 후백제를 세웠다. 옛 백제의 영광을 되살린다는 명분을 내걸며 전라·충청 일대에서 세력을 키워갔다 — 신라 하대의 붕괴가 낳은 첫 번째 분열이었다.',
      card_ref: null,
    },

    {
      id: 'wp_03',
      type: 'political',
      year: 901, month: null, day: null,
      title_ko: '궁예, 후고구려를 세우다',
      place_ko: '송악(개성)',
      lat: 37.9707, lng: 126.5615,
      stay: null,
      summary_ko: '신라 왕족 출신이라 자처한 궁예는 양길의 부하로 세력을 키운 뒤 독립해, 901년 송악을 도읍으로 후고구려를 세웠다(훗날 국호를 마진·태봉으로 바꾸고 도읍도 철원으로 옮긴다). 왕건은 이 무렵 궁예 휘하의 장수로 들어가 나주 공략 등에서 전공을 세우며 두각을 나타냈다 — 훗날 궁예를 몰아내는 인물이, 처음엔 궁예의 신하로 경력을 쌓았다는 사실이 이 시대의 아이러니다.',
      card_ref: null,
    },

    {
      id: 'wp_04',
      type: 'political',
      year: 918, month: 5, day: null,
      title_ko: '고려 건국 — 궁예를 몰아내고 왕위에 오르다',
      place_ko: '송악(개성)',
      lat: 37.9707, lng: 126.5615,
      stay: null,
      summary_ko: '갈수록 포악해진 궁예의 통치에 반발한 홍유·배현경·신숭겸·복지겸 등 신하들의 추대를 받아 정변을 일으켜 궁예를 몰아내고 왕위에 올랐다. 국호를 고려로 정하고 연호를 천수라 했으며, 지방 호족들과의 혼인·포섭 정책으로 세력을 넓혀갔다.',
      card_ref: 'political_0918_01',
    },

    {
      id: 'wp_05',
      type: 'battle',
      year: 927, month: null, day: null,
      title_ko: '공산 전투 — 대패, 신숭겸의 희생',
      place_ko: '공산(대구 팔공산)',
      lat: 35.9, lng: 128.65,
      stay: null,
      summary_ko: '견훤이 신라 수도 경주를 기습해 경애왕을 죽이자, 왕건은 신라를 구원하러 나섰다가 공산에서 견훤의 후백제군에게 포위돼 크게 패했다. 장수 신숭겸이 왕건의 옷을 대신 입고 싸우다 전사하며 왕건은 간신히 탈출할 수 있었다 — 통일 전쟁 중 가장 뼈아픈 패배였다.',
      card_ref: null,
    },

    {
      id: 'wp_06',
      type: 'battle',
      year: 930, month: null, day: null,
      title_ko: '고창 전투 — 전세를 뒤집다',
      place_ko: '고창(안동)',
      lat: 36.5684, lng: 128.7294,
      stay: null,
      summary_ko: '공산 전투의 참패 이후 수세에 몰렸던 왕건은 고창(안동)에서 벌어진 전투에서 견훤의 후백제군에게 대승을 거뒀다. 이 승리로 경상도 북부 호족들이 대거 왕건에게 귀부했고, 후삼국 전쟁의 주도권은 이때부터 고려로 넘어가기 시작했다.',
      card_ref: null,
    },

    {
      id: 'wp_07',
      type: 'battle',
      year: 934, month: null, day: null,
      title_ko: '운주성 전투 — 후백제의 몰락을 앞당기다',
      place_ko: '운주(홍성)',
      lat: 36.6009, lng: 126.6608,
      stay: null,
      summary_ko: '운주성에서 벌어진 전투에서 왕건은 견훤의 군대를 크게 격파했다. 이 패배로 후백제 내부의 동요가 심해졌고, 많은 성이 잇달아 고려에 항복했다 — 후백제 붕괴의 결정적 전조였다.',
      card_ref: null,
    },

    {
      id: 'wp_08',
      type: 'exile',
      year: 935, month: 3, day: null,
      title_ko: '견훤의 유폐와 탈출 — 아들에게 왕위를 빼앗기다',
      place_ko: '금산사(김제)에서 나주로',
      lat: 35.0159, lng: 126.7108,
      stay: null,
      summary_ko: '말년에 넷째 아들 금강을 후계자로 삼으려 하자, 장남 신검이 반발해 견훤을 금산사에 유폐하고 스스로 왕위에 올랐다. 석 달 뒤 견훤은 금산사를 탈출해 나주를 거쳐 개경으로 가서 원수였던 왕건에게 투항했다 — 후백제의 창업자가 스스로 후백제를 무너뜨리는 데 앞장서게 되는 역설적인 순간이었다.',
      card_ref: null,
    },

    {
      id: 'wp_09',
      type: 'political',
      year: 935, month: 11, day: null,
      title_ko: '신라의 항복 — 천년 왕국이 문을 닫다',
      place_ko: '경주',
      lat: 35.8356, lng: 129.2193,
      stay: null,
      summary_ko: '더 이상 나라를 지탱할 힘이 없다고 판단한 신라의 마지막 왕 경순왕은 신하들의 반대를 무릅쓰고 스스로 고려에 항복하기로 결정했다. 992년(혁거세 즉위 기준) 가까이 이어진 신라는 이렇게 스스로 문을 닫았고, 왕건은 경순왕을 극진히 예우하며 큰딸을 그와 혼인시켰다.',
      card_ref: null,
    },

    {
      id: 'wp_10',
      type: 'battle',
      year: 936, month: 8, day: null,
      title_ko: '일리천 전투 — 후삼국을 통일하다',
      place_ko: '일리천(경북 선산)',
      lat: 36.2200, lng: 128.3200,
      stay: null,
      summary_ko: '신검이 이끄는 후백제군과 왕건의 고려군이 일리천에서 최후의 결전을 벌였다. 견훤이 직접 아들의 군대를 상대하러 종군한 이 전투에서 신검의 군대는 크게 패했고, 후백제는 멸망했다. 신라 말 이래 분열됐던 한반도는 이로써 고려에 의해 다시 하나가 됐다.',
      card_ref: 'political_0936_01',
    },

    {
      id: 'wp_11',
      type: 'political',
      year: 940, month: null, day: null,
      title_ko: '역분전 — 통일 전쟁의 논공행상',
      place_ko: '개경',
      lat: 37.9707, lng: 126.5615,
      stay: null,
      summary_ko: '통일 전쟁 과정에서 공을 세운 공신과 군인들에게 논공행상 성격으로 토지를 나눠주는 역분전을 시행했다. 관직의 높낮이가 아니라 전쟁에서 세운 공로와 인품을 기준으로 지급했다는 점에서, 호족 연합으로 이룩한 통일 왕조를 안정적으로 다지려는 왕건의 정치적 감각이 드러난다.',
      card_ref: null,
    },

    {
      id: 'wp_12',
      type: 'political',
      year: 943, month: 4, day: null,
      title_ko: '훈요십조 — 후대에 남긴 유훈',
      place_ko: '개경',
      lat: 37.9707, lng: 126.5615,
      stay: null,
      summary_ko: '세상을 떠나기 직전, 후대 왕들이 지켜야 할 열 가지 가르침인 훈요십조를 남겼다. 불교를 숭상하되 지나친 사찰 건립을 경계할 것, 서경(평양)을 중시할 것, 거란을 배척할 것 등을 담은 이 문서는, 호족 연합으로 이룩한 통일 왕조를 안정적으로 이어가려 한 왕건의 통치 철학이 응축된 유산이다.',
      card_ref: 'culture_0943_01',
    },

  ],
};

window.registerRoute(ROUTE_WANG_GEON_UNIFICATION);
