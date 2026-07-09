// ═══════════════════════════════════════════════════════
// maps/medieval1/data/world_context.js — 한국사 ↔ 세계의 흐름 연결
// (world_events.js 이후에 로드되어야 한다.)
// 한국사 데이터는 절대 수정하지 않는다 — 연결은 이 파일에서만 관리한다.
// ═══════════════════════════════════════════════════════

const WORLD_CONTEXT = {

  // ── 918~960 — 후삼국통일과 거란 ──
  'political_0918_01': ['world_916_liao'],
  'political_0936_01': ['world_916_liao'],
  'policy_0940_01':    ['world_916_liao'],
  'political_0960_01': ['world_960_song'],

  // ── 975~998 — 성종의 체제정비와 거란 1차침입 ──
  'political_0975_01': ['world_960_song'],
  'political_0981_01': ['world_960_song'],
  'policy_0992_01':    ['world_960_song'],
  'battle_0993_01':    ['world_916_liao'],
  'policy_0995_01':    ['world_960_song'],
  'policy_0996_02':    ['world_960_song'],
  'economic_0998_01':  ['world_960_song'],

  // ── 1009~1033 — 거란 2·3차 침입과 귀주대첩 ──
  'plot_1009_01':      ['world_916_liao'],
  'battle_1010_01':    ['world_916_liao'],
  'battle_1018_01':    ['world_916_liao'],
  'policy_1029_01':    ['world_916_liao'],
  'policy_1033_01':    ['world_1054_schism'],

  // ── 1046~1076 — 문종의 전성기와 노르만정복 ──
  'political_1046_01': ['world_1066_norman'],
  'culture_1055_01':   ['world_1066_norman'],
  'culture_1067_01':   ['world_1066_norman'],
  'economic_1076_01':  ['world_1066_norman'],
  'policy_1076_02':    ['world_1066_norman'],

  // ── 1083~1109 — 여진정벌·별무반과 십자군 ──
  'political_1094_01': ['world_1096_crusades'],
  'political_1095_02': ['world_1096_crusades'],
  'economic_1100_01':  ['world_1096_crusades'],
  'policy_1104_01':    ['world_1096_crusades'],
  'battle_1107_01':    ['world_1096_crusades'],
  'policy_1109_01':    ['world_1096_crusades'],

  // ── 1115~1135 — 금의 흥기와 이자겸·묘청 ──
  'political_1122_01': ['world_1115_jin'],
  'plot_1126_01':      ['world_1115_jin'],
  'diplomacy_1126_02': ['world_1115_jin'],
  'movement_1135_01':  ['world_1115_jin'],

  // ── 1145~1170 — 김부식과 무신정변, 남송 ──
  'culture_1145_01':   ['world_1127_southern_song'],
  'political_1146_01': ['world_1127_southern_song'],
  'culture_1150_01':   ['world_1127_southern_song'],
  'culture_1157_01':   ['world_1127_southern_song'],
  'plot_1170_01':      ['world_1127_southern_song'],
  'battle_1174_01':    ['world_1127_southern_song'],
  'movement_1176_01':  ['world_1127_southern_song'],

  // ── 1196~1204 — 최충헌 집권과 가마쿠라 막부 ──
  'plot_1196_01':      ['world_1185_kamakura'],
  'political_1197_01': ['world_1185_kamakura'],
  'movement_1198_01':  ['world_1185_kamakura'],
  'culture_1200_01':   ['world_1185_kamakura'],
  'political_1204_01': ['world_1185_kamakura'],

  // ── 1215~1236 — 몽골 침입과 마그나카르타 ──
  'plot_1219_01':      ['world_1206_mongol'],
  'battle_1231_01':    ['world_1206_mongol', 'world_1215_magna_carta'],
  'policy_1232_01':    ['world_1206_mongol'],
  'battle_1232_02':    ['world_1206_mongol'],
  'organization_1232_03': ['world_1206_mongol'],
  'culture_1236_01':   ['world_1206_mongol'],

  // ── 1258~1275 — 아바스멸망·삼별초와 몽골의 평화 ──
  'diplomacy_1259_01': ['world_1258_abbasid_fall'],
  'political_1259_02': ['world_1258_abbasid_fall'],
  'policy_1270_01':    ['world_1206_mongol'],
  'battle_1270_02':    ['world_1206_mongol'],
  'political_1274_01': ['world_1271_yuan'],
  'battle_1274_02':    ['world_1271_yuan'],
  'policy_1275_01':    ['world_1271_yuan'],

  // ── 1280~1298 — 원간섭기와 델리술탄시대 ──
  'organization_1280_01': ['world_1271_yuan'],
  'battle_1281_01':    ['world_1271_yuan'],
  'culture_1281_01':   ['world_1271_yuan'],
  'movement_1285_01':  ['world_1206_delhi'],
  'culture_1290_01':   ['world_1206_delhi'],
  'policy_1298_01':    ['world_1206_delhi'],

  // ── 1308~1351 — 충선왕·공민왕 이전과 오스만·흑사병 ──
  'policy_1308_01':    ['world_1299_ottoman'],
  'political_1313_01': ['world_1299_ottoman'],
  'culture_1314_01':   ['world_1299_ottoman'],
  'political_1330_01': ['world_1299_ottoman'],
  'political_1339_01': ['world_1299_ottoman'],
  'political_1343_01': ['world_1299_ottoman'],
  'political_1344_01': ['world_1347_black_death'],
  'policy_1347_01':    ['world_1347_black_death'],
  'political_1349_01': ['world_1347_black_death'],
  'battle_1350_01':    ['world_1347_black_death'],
  'political_1351_01': ['world_1347_black_death'],

  // ── 1356~1392 — 공민왕 개혁부터 조선건국과 백년전쟁·명 건국 ──
  'political_1356_01': ['world_1337_hundred_years'],
  'policy_1365_01':    ['world_1337_hundred_years'],
  'plot_1374_01':      ['world_1337_hundred_years'],
  'political_1374_02': ['world_1337_hundred_years'],
  'battle_1376_01':    ['world_1337_hundred_years'],
  'culture_1377_01':   ['world_1337_hundred_years'],
  'battle_1380_01':    ['world_1368_ming'],
  'political_1388_01': ['world_1368_ming'],
  'plot_1388_02':      ['world_1368_ming'],
  'political_1388_03': ['world_1368_ming'],
  'policy_1388_04':    ['world_1368_ming'],
  'plot_1389_01':      ['world_1368_ming'],
  'policy_1391_01':    ['world_1368_ming'],
  'plot_1392_04':      ['world_1368_ming'],
  'political_1392_03': ['world_1368_ming']

};
