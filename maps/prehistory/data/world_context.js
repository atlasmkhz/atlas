// ═══════════════════════════════════════════════════════
// maps/prehistory/data/world_context.js — 한국사 ↔ 세계의 흐름 연결
// (world_events.js 이후에 로드되어야 한다.)
// 한국사 데이터는 절대 수정하지 않는다 — 연결은 이 파일에서만 관리한다.
// ═══════════════════════════════════════════════════════

const WORLD_CONTEXT = {

  // ── 구석기 — 인류의 확산 ──
  'science_paleo_01': ['world_erectus'],
  'science_paleo_05': ['world_erectus'],
  'science_paleo_06': ['world_neanderthal'],
  'person_paleo_03':  ['world_neanderthal', 'world_sapiens'],
  'science_paleo_02': ['world_sapiens', 'world_cave_art'],
  'science_paleo_07': ['world_sapiens'],
  'science_paleo_04': ['world_cave_art'],

  // ── 신석기 — 농경의 시작 ──
  'culture_neo_04': ['world_neolithic_revolution'],
  'culture_neo_02': ['world_neolithic_revolution', 'world_sumer'],
  'culture_neo_01': ['world_sumer'],
  'culture_neo_03': ['world_sumer'],
  'culture_neo_05': ['world_neolithic_revolution', 'world_egypt'],

  // ── 청동기 — 거석문화·계급사회 ──
  'culture_bronze_01': ['world_stonehenge', 'world_shang'],
  'culture_bronze_03': ['world_shang'],
  'culture_bronze_05': ['world_hammurabi'],
  'culture_bronze_02': ['world_hittite', 'world_zhou'],
  'culture_bronze_06': ['world_zhou'],
  'culture_bronze_04': ['world_zhou'],
  'culture_bronze_07': ['world_phoenicia_alphabet'],

  // ── 초기국가 형성기 — 고조선과 여러나라 ──
  'political_gojoseon_01': ['world_assyria_persia', 'world_greek_polis'],
  'migration_north_01': ['world_greek_polis'],
  'migration_north_02': ['world_greek_polis'],
  'migration_north_03': ['world_buddha'],
  'migration_north_04': ['world_buddha'],
  'culture_iron_01':     ['world_spring_autumn_warring'],
  'migration_xiongnu_01':['world_qin_han'],
  'migration_north_05':  ['world_alexander_hellenism'],
  'migration_north_06':  ['world_alexander_hellenism'],
  'political_jin_01':    ['world_alexander_hellenism', 'world_maurya_ashoka'],
  'political_gojoseon_04':['world_qin_han'],
  'political_gojoseon_02':['world_qin_han'],

  // ── 고조선 멸망과 삼한 — 한 무제와 겹치는 시기 ──
  'migration_samhan_01':  ['world_qin_han'],
  'political_gojoseon_03':['world_qin_han'],
  'political_mahan_01':   ['world_qin_han'],
  'political_jinhan_01':  ['world_qin_han'],
  'political_byeonhan_01':['world_qin_han'],
  'migration_xianbei_01': ['world_qin_han'],
  'culture_iron_02':      ['world_qin_han']

};
