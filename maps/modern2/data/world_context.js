// data/world_context.js — 한국 사건 ↔ 세계 사건 연결 맵
// WORLD_CONTEXT[한국사건id] = [세계사건id, ...] (최대 3개)
// renderer.js의 popupHtml()이 한국 카드 정보창 하단에 이 연결을 읽어
// "세계는 같은 시기" 섹션으로 보여준다. 세계사는 점이 아니라 흐름이므로,
// 여기서는 '읽는 맥락'만 제공한다 — 클릭 탐색은 세계 마커 자체를 눌러야 한다.

const WORLD_CONTEXT = {

  // ── 8·15 해방, 일본 항복 ──
  political_1945_01: ['japan_surrender_1945'],
  political_1945_02: ['japan_surrender_1945'],

  // ── 6·25전쟁 ──
  political_1948_01: ['chinese_civil_war_1946_49'],
  battle_1950_01: ['chinese_civil_war_1946_49'],
  battle_1950_04: ['chinese_civil_war_1946_49'], // 중공군 참전
  migration_1951_01: ['chinese_civil_war_1946_49'],
  battle_1951_01: ['stalin_death_1953'],
  political_1951_01: ['berlin_blockade_1948_49'], // 휴전회담 개시 — 냉전 협상의 동시대성
  political_1953_02: ['stalin_death_1953'], // 정전협정 — 스탈린 사후 협상 진전

  // ── 한미상호방위조약 ──
  political_1953_03: ['san_francisco_treaty_1951_52'],

  // ── 진보당 사건, 평화통일론 탄압 ──
  plot_1958_01: ['khrushchev_thaw_1956'],

  // ── 5·16 군사정변, 경제개발계획 ──
  policy_1962_01: ['great_leap_forward_1958_61'], // 국가주도 경제개발의 대비
  organization_1962_01: ['great_leap_forward_1958_61'],

  // ── 한일협정, 베트남파병 ──
  political_1964_01: ['vietnam_war_end_1975'],
  movement_1964_01: ['san_francisco_treaty_1951_52'], // 한일협정의 기원
  political_1966_02: ['vietnam_war_end_1975'], // 브라운각서

  // ── 닉슨독트린, 자주국방 ──
  plot_1969_01: ['nixon_doctrine_guam_1969'],
  political_1969_01: ['nixon_doctrine_guam_1969'],
  policy_1969_01: ['nixon_doctrine_guam_1969'],

  // ── 7·4남북공동성명, 유신 ──
  political_1972_01: ['nixon_china_visit_1972', 'sino_soviet_split_1969'],
  political_1972_02: ['nixon_china_visit_1972'],
  organization_1972_01: ['nixon_china_visit_1972'],
  person_1972_01: ['nixon_china_visit_1972'],

  // ── 8·10성남민권운동 시기 — 자주국방 외교 흐름 ──
  political_1971_01: ['nixon_china_visit_1972'],

  // ── 6·23선언, 석유파동 ──
  movement_1973_02: ['nixon_doctrine_guam_1969'],
  political_1973_02: ['vietnam_war_end_1975'],

  // ── 인혁당, 베트남패망, 학도호국단 ──
  plot_1975_01: ['vietnam_war_end_1975'],
  movement_1975_01: ['vietnam_war_end_1975'],
  political_1975_01: ['vietnam_war_end_1975'],
  organization_1975_01: ['vietnam_war_end_1975'],

  // ── 10·26, 12·12 — 데탕트 이후 권력 재편 ──
  movement_1979_01: ['mao_death_gang_of_four_1976'],
  person_1979_01: ['mao_death_gang_of_four_1976'],

  // ── 중화학공업 과잉투자, 부가가치세 ──
  political_1978_02: ['deng_reform_opening_1978'], // 산업화 노선의 대비

  // ── 5공 출범, 88올림픽 ──
  organization_1988_01: ['soviet_collapse_1991'], // 탈냉전 전조
  political_1988_01: ['deng_reform_opening_1978'],
  movement_1988_01: ['deng_reform_opening_1978', 'tiananmen_square_1989'],
  policy_1988_01: ['tiananmen_square_1989'],

  // ── 북방외교, 헝가리수교 ──
  political_1989_01: ['tiananmen_square_1989', 'soviet_collapse_1991'],
  organization_1989_01: ['tiananmen_square_1989'], // 전교조 — 동시대 민주화 열기
  person_1989_01: ['tiananmen_square_1989'],
  person_1989_02: ['tiananmen_square_1989'],
  policy_1989_01: ['deng_reform_opening_1978'],

  // ── 3당합당, 한소수교 ──
  political_1990_01: ['soviet_collapse_1991'],
  organization_1990_01: ['soviet_collapse_1991'],
  political_1990_02: ['soviet_collapse_1991'],
  policy_1990_01: ['soviet_collapse_1991'],
  political_1990_03: ['soviet_collapse_1991'],

  // ── 분신정국, 남북기본합의서 ──
  person_1991_01: ['soviet_collapse_1991'],
  political_1991_01: ['soviet_collapse_1991'],
  political_1991_02: ['soviet_collapse_1991'],
  organization_1991_01: ['soviet_collapse_1991'],
  political_1991_03: ['soviet_collapse_1991'],

  // ── 한중수교 ──
  political_1992_02: ['deng_reform_opening_1978', 'soviet_collapse_1991'],

  // ── 2026-06 보강: 외교·경제·과기 카드의 세계사 연결 ──
  diplomacy_1969_01: ['nixon_doctrine_guam_1969'],
  diplomacy_1971_02: ['nixon_doctrine_guam_1969'],
  diplomacy_1978_03: ['sino_soviet_split_1969'], // 데탕트 이후 안보체제 재정비의 동시대성
  economic_1973_04: ['nixon_china_visit_1972'], // 닉슨독트린 이후 자주국방·중화학공업 노선
  diplomacy_1988_02: ['deng_reform_opening_1978'], // 북방외교와 개혁개방의 동시대성
  diplomacy_1991_04: ['soviet_collapse_1991'],
  science_1990_02: ['soviet_collapse_1991'] // 냉전 해체기 우주기술 경쟁 완화 속 소형위성 개발

};
