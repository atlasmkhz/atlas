// ═══════════════════════════════════════════════════════
// maps/ancient/data/world_context.js — 한국사 ↔ 세계의 흐름 연결
// (world_events.js 이후에 로드되어야 한다.)
//
// 원칙: 한국사 데이터는 절대 수정하지 않는다 — 연결은 이 파일에서만 관리한다.
// 한 한국 사건에 매핑하는 세계 사건은 최대 3개. "원인"이 아니라 "같은 시대".
// ═══════════════════════════════════════════════════════

const WORLD_CONTEXT = {

  // ── 삼국 건국기 — 로마 제정 초기 ──
  'political_bc57_01': ['world_bc44_caesar'],
  'political_bc37_01': ['world_bc27_augustus'],
  'political_bc18_01': ['world_bc27_augustus'],
  'political_42_01':   ['world_bc27_augustus'],

  // ── 4세기 — 고구려 낙랑축출과 크리스트교 공인 ──
  'political_313_01': ['world_313_edict_milan'],
  'political_356_01': ['world_320_gupta'],
  'political_371_01': ['world_320_gupta'],
  'policy_372_01':    ['world_320_gupta'],
  'policy_384_01':    ['world_395_rome_split'],

  // ── 5세기 — 광개토대왕·장수왕과 서로마 멸망 ──
  'political_391_01': ['world_395_rome_split'],
  'battle_400_01':    ['world_395_rome_split', 'world_486_franks'],
  'political_427_01': ['world_320_gupta'],
  'battle_475_01':    ['world_476_fall_rome'],
  'culture_500_01':   ['world_527_justinian'],
  'culture_500_02':   ['world_527_justinian'],

  // ── 6세기 — 신라 팽창과 비잔티움 전성기 ──
  'political_532_01': ['world_527_justinian'],
  'policy_538_01':    ['world_527_justinian'],
  'political_553_01': ['world_527_justinian'],
  'battle_554_01':    ['world_527_justinian'],
  'political_562_01': ['world_527_justinian'],

  // ── 7세기 — 수당 교체기와 삼국통일 전쟁 ──
  'culture_600_01':   ['world_581_sui'],
  'battle_612_01':    ['world_581_sui', 'world_610_muhammad'],
  'plot_642_01':      ['world_618_tang', 'world_610_muhammad'],
  'battle_645_01':    ['world_618_tang'],
  'culture_632_01':   ['world_618_tang'],
  'diplomacy_648_01': ['world_618_tang'],
  'battle_660_01':    ['world_618_tang'],
  'battle_668_01':    ['world_618_tang', 'world_661_umayyad'],
  'battle_675_01':    ['world_661_umayyad'],
  'political_681_01': ['world_661_umayyad'],
  'policy_685_01':    ['world_661_umayyad'],
  'culture_686_01':   ['world_661_umayyad'],
  'political_698_01': ['world_661_umayyad'],

  // ── 8세기 — 발해·통일신라 전성기와 아바스·프랑크 ──
  'political_719_01': ['world_750_abbasid'],
  'policy_722_01':    ['world_750_abbasid'],
  'culture_751_01':   ['world_750_abbasid'],
  'policy_756_01':    ['world_750_abbasid', 'world_800_charlemagne'],

  // ── 9세기 — 남북국 전성기와 헤이안 시대 ──
  'political_818_01': ['world_794_heian'],
  'policy_819_01':    ['world_794_heian'],
  'economic_828_01':  ['world_794_heian'],
  'plot_846_01':      ['world_794_heian'],
  'culture_885_01':   ['world_794_heian'],
  'movement_889_01':  ['world_794_heian'],

  // ── 10세기 — 후삼국과 발해 멸망 ──
  'political_900_01': ['world_794_heian'],
  'political_901_01': ['world_794_heian'],
  'political_926_01': ['world_794_heian'],
  'battle_927_01':    ['world_794_heian'],
  'battle_930_01':    ['world_794_heian'],
  'political_935_01': ['world_794_heian']

};
