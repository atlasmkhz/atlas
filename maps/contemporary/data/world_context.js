// data/world_context.js — 한국 사건 ↔ 세계 사건 연결 맵 (현대, 1994~2025)
// WORLD_CONTEXT[한국사건id] = [세계사건id, ...] (최대 3개)
// renderer.js의 popupHtml()이 한국 카드 정보창 하단에 이 연결을 읽어
// "세계는 같은 시기" 섹션으로 보여준다. 세계사는 점이 아니라 흐름이므로,
// 여기서는 '읽는 맥락'만 제공한다 — 클릭 탐색은 세계 마커 자체를 눌러야 한다.

const WORLD_CONTEXT = {

  // ── IMF 외환위기 ──
  economic_1997_01: ['asian_financial_crisis_1997_98'], // 한보사태
  economic_1997_03: ['asian_financial_crisis_1997_98', 'wto_launch_1995'], // IMF 구제금융
  economic_1998_01: ['asian_financial_crisis_1997_98'], // IMF 관리체제
  economic_2001_01: ['asian_financial_crisis_1997_98'], // 차입금 조기 상환

  // ── 파병 — 테러와의 전쟁 ──
  diplomacy_2003_01: ['nine_eleven_2001'], // 이라크 파병 동의안
  diplomacy_2004_01: ['nine_eleven_2001'], // 자이툰부대 파병

  // ── 글로벌 금융위기 ──
  economic_2008_01: ['global_financial_crisis_2008'],

  // ── 스마트폰·플랫폼 ──
  science_2009_01: ['smartphone_revolution_2007'], // 아이폰 국내 출시
  organization_2010_02: ['smartphone_revolution_2007'], // 카카오톡 출시

  // ── 반도체 — 미중 경쟁과 AI ──
  economic_2012_01: ['china_rise_2001'], // SK 하이닉스 인수
  economic_2026_01: ['generative_ai_2022', 'us_china_rivalry_2018'], // 코스피 9000 — 반도체 슈퍼사이클

  // ── 코로나19 ──
  disaster_2020_01: ['covid_pandemic_2020_22'],
  disaster_2021_01: ['covid_pandemic_2020_22'], // 백신 접종

  // ── 후쿠시마 오염수 ──
  diplomacy_2023_01: ['fukushima_2011'], // 오염수 방류 논란

  // ── 12·3 비상계엄 — 세계적 민주주의 후퇴의 맥락 ──
  political_2024_02: ['global_democracy_recession_2020s'],
  political_2024_03: ['global_democracy_recession_2020s'], // 탄핵소추 가결

};
