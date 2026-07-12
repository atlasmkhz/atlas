// ═══════════════════════════════════════════════════════
// data/world_context.js — 한국사 ↔ 세계의 흐름 연결
// 기억의 연대기 (Chronicle of Memory)
//
// 이 파일은 index.html에서 <script src="data/world_context.js"></script> 로 불린다.
// (world_events.js 이후에 로드되어야 한다.)
//
// 구조:
//   WORLD_CONTEXT = { "한국_사건_id": ["세계_사건_id", ...] }
//
// 원칙(지시문 v3):
//   · 한국사 데이터는 절대 수정하지 않는다 — 연결은 오직 이 파일에서만 관리한다.
//   · 한 한국 사건에 매핑하는 세계 사건은 최대 3개.
//   · "원인 설명"이 아니라 "같은 시대의 세계"를 보여주는 맥락 연결이다.
//     (예: 3·1운동 ↔ 베르사유 체제 — 3·1운동이 그 때문에 일어났다는 인과가
//      아니라, 같은 시기 세계가 어떤 공기였는지를 함께 느끼게 하는 연결.)
//
// 세계 사건은 한국 사건과 직접 연관이 없어도 WORLD_EVENTS에 존재할 수 있으며,
// 여기에 매핑된 것만 해당 한국 사건 정보창 하단에 '같은 시대의 세계'로 나타난다.
// ═══════════════════════════════════════════════════════

const WORLD_CONTEXT = {

  // ── 1873~1882 — 궁중 권력투쟁의 시대 ──
  'political_1876_02': ['world_1881_assassinations'],
  'political_1880_02': ['world_1882_triple_alliance'],
  'political_1882_03': ['world_1881_assassinations'],

  // ── 1884 갑신정변 — 제국주의 분할의 시대 ──
  'plot_1884_01': ['world_1884_africa', 'world_1889_mayerling'],
  'political_1884_02': ['world_1888_three_emperors'],

  // ── 1885~1889 — 같은 시대 동아시아·유럽의 인물극 ──
  'policy_1883_01': ['world_1885_meiji_politics'],

  // ── 1894 동학·청일전쟁기 ──
  'battle_1894_01': ['world_1894_sino_japanese'],
  'political_1894_01': ['world_1894_sino_japanese'],
  'movement_1894_00': ['world_1894_dreyfus'],
  'movement_1894_03': ['world_1894_dreyfus'],

  // ── 1904 러일전쟁 ──
  'battle_1904_01': ['world_1904_russo_japanese'],
  'policy_1904_01': ['world_1904_russo_japanese'],

  // ── 1911 — 동아시아 공화 혁명의 물결 ──
  'organization_1911_01': ['world_1911_xinhai'],
  'plot_1911_01': ['world_1911_xinhai'],

  // ── 1914 — 제1차 세계대전 발발 ──
  'organization_1914_01': ['world_1914_wwi'],
  'organization_1914_02': ['world_1914_wwi'],

  // ── 1917 — 혁명과 주권 사상 ──
  'political_1917_01': ['world_1917_bolshevik'],
  'person_1917_01': ['world_1917_bolshevik'],

  // ── 1919 — 전후 국제질서와 만세의 해 ──
  'movement_1919_02': ['world_1919_versailles', 'world_1918_german_rev'],
  'movement_1919_01': ['world_1919_versailles'],

  // ── 1929 — 대공황의 그늘 ──
  'movement_1929_02': ['world_1929_depression'],
  'policy_1929_01': ['world_1929_depression'],

  // ── 1931 — 만주사변 ──
  'policy_1931_01': ['world_1931_manchuria'],
  'plot_1931_02': ['world_1931_manchuria'],
  'political_1931_01': ['world_1931_manchuria', 'world_1929_depression'],

  // ── 1937 — 중일전쟁 ──
  'plot_1937_01': ['world_1937_sino_japanese2', 'world_1936_spanish_civil'],
  'battle_1937_01': ['world_1937_sino_japanese2'],

  // ── 1939 — 제2차 세계대전 ──
  'political_1939_01': ['world_1939_wwii'],
  'policy_1939_01': ['world_1939_wwii'],

  // ── 1945 — 전쟁의 끝과 새 질서 ──
  'policy_1945_01': ['world_1939_wwii', 'world_1945_un'],
  'policy_1945_03': ['world_1945_un'],

  // ── 양자역학 100년 — 같은 시대의 과학 ──
  // (자료실 > 세계사 > 「양자역학 100년」 시리즈와 짝을 이룬다.
  //  인과가 아니라 "같은 해 세계의 공기"를 보여주는 대비 연결.)
  'policy_1900_01': ['world_1900_planck'],          // 대한제국 ↔ 플랑크 양자 가설
  'policy_1905_01': ['world_1905_einstein'],        // 을사늑약 ↔ 아인슈타인 기적의 해
  'political_1927_01': ['world_1927_solvay5']       // 신간회 창립 ↔ 제5차 솔베이 회의

};

if (typeof window !== 'undefined') window.WORLD_CONTEXT = WORLD_CONTEXT;
