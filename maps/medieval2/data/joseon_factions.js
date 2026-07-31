// maps/medieval2/data/joseon_factions.js — 조선 붕당 총람
//
// 2026-07-31 신설. 왕두목 기획.
//
// ══════════════════════════════════════════════════════════════
// ■ 왜 사건이 아니라 세력인가
// ══════════════════════════════════════════════════════════════
// 조선 지도에는 무오사화부터 세도정치까지 사건 카드가 이미 다 있다.
// 없는 것은 그 사건들을 관통하는 세력의 계보였다 — 항일무장단체
// 총람(data/armed_groups.js)에서 겪은 것과 같은 공백이다.
//
// 붕당은 사건과 성격이 다르다.
//   · 시점이 아니라 기간을 가진다 (서인 1575~1683)
//   · 서로 관계를 가진다 (분화·통합·소멸)
//   · 그리고 집권과 실각을 반복한다 ★
//
// 마지막 항목이 무장단체와 결정적으로 다른 지점이다. 무장단체는
// 존재하거나 사라지거나였지만, 붕당은 같은 세력이 집권했다 실각했다를
// 되풀이한다. 숙종 대에만 14년에 세 번 뒤집혔다(경신·기사·갑술환국).
// 그래서 phases[] 배열로 시기별 상태를 따로 담는다.
//
// ■ 계보를 지도 위 선으로 긋지 않는 이유  ★중요★
// armed_struggle.html은 계보선을 지도 위 폴리라인으로 그렸다. 무장단체는
// 계보가 곧 부대의 지리적 이동 경로였기 때문에 그것이 맞았다
// (삼원포→환인→집안→신빈).
//
// 붕당은 다르다. 서인이 노론과 소론으로 갈린 것은 회니시비라는 입장
// 차이지 어디로 이동한 것이 아니다. 지도에 선을 그으면 존재하지 않는
// 이동을 그리게 된다. 그래서 계보는 시간축 다이어그램으로 그리고,
// 지역 기반은 별도 필드(base)로만 표시한다.
//
// ■ base — 향촌·학맥 기반이지 지배 영역이 아니다
// 붕당의 실제 권력은 한양 조정 한 곳에 있었다. 영남·기호 같은 기반은
// 학맥과 서원의 인적 네트워크이지 그 지역을 통치한 것이 아니다.
// 좌표는 그 학맥의 중심지를 가리킬 뿐이며, 이 구분을 UI 범례에도
// 명시한다(선사 지도에서 coordPrecision을 명시한 것과 같은 정직성).
//
// ■ status
//   'ruling'   집권 — 정국 주도
//   'sharing'  참여 — 조정에 있으나 주도권은 상대에게
//   'out'      실각 — 축출되었으나 세력은 남아 있음
//   (소멸은 dissolved로 표시하고 phases를 끊는다)
//
// ■ archive / card_ref
//   자료실 「조선 붕당사」 글과 조선 지도 사건 카드로 각각 연결된다.
//   3자 연결(지도 카드 ↔ 루트 ↔ 자료실)의 루트 축이 이 필드다.

window.JOSEON_FACTIONS = {

  // ── 학맥 계통 ────────────────────────────────────────────────
  lineages: {
    hungu:    { label: '훈구 (공신 계열)',      color: '#7a7266' },
    sarim:    { label: '사림 (성리학 사족)',    color: '#8a7a4b' },
    yihwang:  { label: '이황 학맥 (영남)',      color: '#7a9a4b' },
    josik:    { label: '조식 학맥 (남명)',      color: '#b5544a' },
    yiyi:     { label: '이이·성혼 학맥 (기호)', color: '#c8963c' },
    songsi:   { label: '송시열 계 (노론)',      color: '#8b3a3a' },
    yunjeung: { label: '윤증 계 (소론)',        color: '#3f7fbf' },
    sedo:     { label: '외척 세도 (붕당 아님)', color: '#4a4a52' },
  },

  // ── 붕당 ─────────────────────────────────────────────────────
  factions: [

    {
      id: 'fc_hungu', name: '훈구', lineage: 'hungu',
      founded: 1455, dissolved: 1567,
      foundedNote: '세조 즉위 공신 집단으로 형성',
      dissolvedNote: '선조 즉위 무렵 정치 세력으로 소멸',
      base: '한양 중앙 관료·대토지 소유층',
      lat: 37.5796, lng: 126.9770,
      leaders: ['한명회', '신숙주', '윤원형'],
      predecessors: [], successors: [],
      // 을사사화(1545) 이후 문정왕후 사후(1565)까지는 외척 윤원형이
      // 정국을 쥐었다. 붕당 이전이라 '훈구'로 뭉뚱그리는 데 한계가
      // 있으나, 사림 대 기성 관료라는 축에서는 이쪽에 놓는 것이 맞다.
      phases: [{ from: 1455, until: 1565, status: 'ruling' },
               { from: 1565, until: 1567, status: 'out' }],
      summary: '세조의 왕위 찬탈에 공을 세워 공신전과 대토지를 받은 기득권 집단. 성종이 이들을 견제하려 사림을 등용하면서 반세기에 걸친 충돌이 시작됐고, 네 번의 사화로 사림을 도륙했으나 결국 선조 대에 정치 세력으로서는 사라진다.',
      archive: 'bd_01_sarim', card_ref: 'massacre_1498_01',
      verify: false,
    },

    {
      id: 'fc_sarim', name: '사림', lineage: 'sarim',
      founded: 1470, dissolved: 1575,
      foundedNote: '성종 대 삼사에 본격 등용',
      dissolvedNote: '동인·서인으로 분화',
      base: '영남·기호의 지방 사족, 서원과 향약',
      lat: 36.5684, lng: 128.7294,
      leaders: ['김종직', '조광조', '이황', '이이'],
      predecessors: [], successors: ['fc_dongin', 'fc_seoin'],
      phases: [{ from: 1470, until: 1545, status: 'sharing' },
               { from: 1545, until: 1565, status: 'out' },
               { from: 1565, until: 1575, status: 'ruling' }],
      summary: '지방 사족 출신으로 성리학의 명분과 도덕을 앞세운 집단. 훈구를 견제하라고 왕이 불러들였으나 무오·갑자·기묘·을사 네 차례 사화로 대거 희생됐다. 그때마다 지방으로 물러나 서원과 향약으로 후학을 길렀고, 선조 즉위와 함께 조정을 장악한다. 그리고 공동의 적이 사라진 바로 그 순간 둘로 갈라졌다.',
      archive: 'bd_01_sarim', card_ref: 'massacre_1519_01',
      verify: false,
    },

    {
      id: 'fc_dongin', name: '동인', lineage: 'yihwang',
      founded: 1575, dissolved: 1591,
      foundedNote: '김효원의 집이 한양 동쪽 건천동에 있어 동인',
      dissolvedNote: '남인·북인으로 분화',
      base: '영남 (안동·상주·진주)',
      lat: 36.5684, lng: 128.7294,
      leaders: ['김효원', '유성룡', '이산해', '이발'],
      predecessors: ['fc_sarim'], successors: ['fc_namin', 'fc_bugin'],
      phases: [{ from: 1575, until: 1589, status: 'ruling' },
               { from: 1589, until: 1591, status: 'out' }],
      summary: '이조전랑 자리를 두고 김효원을 지지한 쪽. 이황과 조식의 문인이 주축이었고 영남에 기반이 두터웠다. 외척은 정치에서 배제되어야 한다는 원칙론을 폈다. 기축옥사로 큰 타격을 입은 뒤, 서인 처벌의 수위를 두고 강경한 북인과 온건한 남인으로 갈라진다.',
      archive: 'bd_02_dongseo', card_ref: 'political_1575_01',
      verify: false,
    },

    {
      id: 'fc_seoin', name: '서인', lineage: 'yiyi',
      founded: 1575, dissolved: 1683,
      foundedNote: '심의겸의 집이 한양 서쪽 정동에 있어 서인',
      dissolvedNote: '노론·소론으로 분화 (회니시비)',
      base: '기호 (서울·경기·충청)',
      lat: 36.7845, lng: 127.0043,
      leaders: ['심의겸', '정철', '김장생', '송시열', '김수항'],
      predecessors: ['fc_sarim'], successors: ['fc_noron', 'fc_soron'],
      phases: [{ from: 1575, until: 1589, status: 'out' },
               { from: 1589, until: 1591, status: 'ruling' },
               { from: 1591, until: 1623, status: 'out' },
               { from: 1623, until: 1674, status: 'ruling' },
               { from: 1674, until: 1680, status: 'out' },
               { from: 1680, until: 1683, status: 'ruling' }],
      summary: '심의겸을 지지한 쪽. 이이와 성혼의 문인이 주축으로 기호에 기반을 두었다. 사람을 출신이 아니라 행적으로 판단해야 한다는 입장이었다. 인조반정으로 집권한 뒤 조선이 망할 때까지 이어지는 장기 집권의 뿌리가 되며, 예송과 환국을 거치며 남인과 정권을 주고받다가 회니시비로 노론과 소론으로 갈라진다.',
      archive: 'bd_02_dongseo', card_ref: 'political_1575_01',
      verify: false,
    },

    {
      id: 'fc_namin', name: '남인', lineage: 'yihwang',
      founded: 1591, dissolved: 1801,
      foundedNote: '우성전의 집이 남산 아래에 있어 남인',
      dissolvedNote: '신유박해로 사실상 소멸',
      base: '영남 안동 일대, 근기(near 한양) 실학 계열',
      lat: 36.5684, lng: 128.7294,
      leaders: ['유성룡', '허목', '윤휴', '허적', '채제공'],
      predecessors: ['fc_dongin'], successors: [],
      phases: [{ from: 1591, until: 1608, status: 'ruling' },
               { from: 1608, until: 1623, status: 'out' },
               { from: 1623, until: 1674, status: 'sharing' },
               { from: 1674, until: 1680, status: 'ruling' },
               { from: 1680, until: 1689, status: 'out' },
               { from: 1689, until: 1694, status: 'ruling' },
               { from: 1694, until: 1776, status: 'out' },
               { from: 1776, until: 1800, status: 'sharing' },
               { from: 1800, until: 1801, status: 'out' }],
      summary: '기축옥사 이후 서인 처벌에 온건했던 동인. 이황 학맥을 이어 안동을 중심으로 한 영남 남인과, 한양 근교의 실학 계열로 나뉘어 발전했다. 예송에서 왕은 사대부와 다르다는 왕권 특수론을 폈다. 갑술환국 이후 백 년 가까이 야당으로 밀려 있다가 정조 대에 채제공 등이 등용되며 잠시 복귀했으나, 정조 사후 신유박해로 천주교와 엮여 처형되면서 사실상 소멸한다.',
      archive: 'bd_03_nambuk', card_ref: 'political_1674_01',
      verify: false,
    },

    {
      id: 'fc_bugin', name: '북인', lineage: 'josik',
      founded: 1591, dissolved: 1623,
      foundedNote: '이산해의 집이 북악 아래에 있어 북인',
      dissolvedNote: '인조반정으로 완전 축출 — 재기하지 못함',
      base: '경상우도 (진주·합천), 조식 학맥',
      lat: 35.2372, lng: 128.6920,
      leaders: ['이산해', '정인홍', '이이첨'],
      predecessors: ['fc_dongin'], successors: [],
      phases: [{ from: 1591, until: 1608, status: 'sharing' },
               { from: 1608, until: 1623, status: 'ruling' }],
      summary: '서인을 엄히 처벌해야 한다고 주장한 강경파 동인. 조식의 실천 중심 학풍을 이어 임진왜란 때 의병장을 다수 배출했다. 광해군을 옹립해 집권했고 대동법 시행과 실리 외교를 폈으나, 폐모살제와 명에 대한 배신을 명분으로 한 인조반정으로 무너졌다. 조선 붕당 가운데 가장 철저히 소멸해 다시는 정치 세력으로 복원되지 못한 유일한 경우다.',
      archive: 'bd_04_gwanghae', card_ref: 'political_1613_01',
      verify: false,
    },

    {
      id: 'fc_noron', name: '노론', lineage: 'songsi',
      founded: 1683, dissolved: 1863,
      foundedNote: '송시열을 주로 하는 노장파',
      dissolvedNote: '세도정치에 흡수되어 붕당으로서 기능 상실',
      base: '기호 (충청 회덕·연산, 서울·경기)',
      lat: 36.3504, lng: 127.3845,
      leaders: ['송시열', '권상하', '김창집', '김조순'],
      predecessors: ['fc_seoin'], successors: ['fc_byeokpa', 'fc_sipa'],
      // 1762년 이후 노론은 시파·벽파로 갈려 그쪽이 정국의 전면에 서고,
      // 19세기에는 실체가 외척 가문으로 옮겨간다. 이 구간까지 노론을
      // '집권'으로 두면 갈라져 나간 세력과 늘 겹쳐 판독이 흐려진다.
      phases: [{ from: 1683, until: 1689, status: 'ruling' },
               { from: 1689, until: 1694, status: 'out' },
               { from: 1694, until: 1721, status: 'ruling' },
               { from: 1721, until: 1724, status: 'out' },
               { from: 1724, until: 1762, status: 'ruling' },
               { from: 1762, until: 1863, status: 'sharing' }],
      summary: '회니시비에서 송시열을 지지한 쪽. 주자학의 절대적 권위와 대의명분을 내세웠고 충청 기호 지역에 기반이 두터웠다. 경종 대 신임옥사로 4대신이 처형되는 타격을 입었으나 영조 즉위로 되살아났고, 이후 조선이 망할 때까지 사실상의 집권 세력으로 남는다. 다만 19세기에 이르면 그 실체는 붕당이 아니라 몇몇 외척 가문으로 옮겨간다.',
      archive: 'bd_08_noso', card_ref: 'political_1684_01',
      verify: false,
    },

    {
      id: 'fc_soron', name: '소론', lineage: 'yunjeung',
      founded: 1683, dissolved: 1800,
      foundedNote: '윤증·박세채를 주로 하는 소장파',
      dissolvedNote: '이인좌의 난 이후 쇠퇴, 정조 사후 소멸',
      base: '충청 이산(논산), 강화 (양명학 수용)',
      lat: 36.1872, lng: 127.0987,
      leaders: ['윤증', '박세채', '남구만', '조태구'],
      predecessors: ['fc_seoin'], successors: [],
      phases: [{ from: 1683, until: 1721, status: 'sharing' },
               { from: 1721, until: 1724, status: 'ruling' },
               { from: 1724, until: 1728, status: 'out' },
               { from: 1728, until: 1800, status: 'sharing' }],
      summary: '회니시비에서 윤증을 지지한 쪽. 주자 해석에 이견을 낼 수 있다는 상대적으로 유연한 학풍을 지녔고, 훗날 강화 지역에서 양명학 수용에도 개방적이었다. 경종을 지지해 신임옥사로 잠시 집권했으나 영조 즉위로 역전됐고, 1728년 이인좌의 난에 일부가 가담하면서 결정적으로 약화된다.',
      archive: 'bd_09_sinim', card_ref: 'plot_1721_01',
      verify: false,
    },

    {
      id: 'fc_sipa', name: '시파', lineage: 'songsi',
      founded: 1762, dissolved: 1806,
      foundedNote: '사도세자의 처분을 동정하는 입장',
      dissolvedNote: '세도정치기에 흡수',
      base: '노론 내 온건파 + 남인 일부',
      lat: 37.5796, lng: 126.9770,
      leaders: ['채제공', '김조순'],
      predecessors: ['fc_noron'], successors: ['fc_sedo'],
      phases: [{ from: 1762, until: 1776, status: 'out' },
               { from: 1776, until: 1800, status: 'ruling' },
               { from: 1800, until: 1806, status: 'out' }],
      summary: '사도세자의 죽음을 지나쳤다고 보아 동정하는 쪽. 정조가 즉위하면서 정국의 주도권을 잡았고 남인 일부도 함께 등용됐다. 그러나 정조 사후 벽파에게 밀렸다가, 순조의 장인 김조순을 매개로 안동 김씨 세도정치로 이어진다 — 붕당이 가문 권력으로 변질되는 통로였다.',
      archive: 'bd_11_imo', card_ref: 'plot_1762_01',
      verify: false,
    },

    {
      id: 'fc_byeokpa', name: '벽파', lineage: 'songsi',
      founded: 1762, dissolved: 1806,
      foundedNote: '영조의 처분이 정당했다는 입장',
      dissolvedNote: '순조 대 김조순 집권으로 축출',
      base: '노론 강경파',
      lat: 37.5796, lng: 126.9770,
      leaders: ['김귀주', '심환지', '정순왕후'],
      predecessors: ['fc_noron'], successors: [],
      phases: [{ from: 1762, until: 1776, status: 'ruling' },
               { from: 1776, until: 1800, status: 'sharing' },
               { from: 1800, until: 1806, status: 'ruling' }],
      summary: '사도세자에 대한 영조의 처분이 정당했다고 본 노론 강경파. 정조 재위 중에는 견제를 받았으나 완전히 제거되지는 않았다. 정조가 죽자 정순왕후의 수렴청정과 함께 정권을 잡아 신유박해로 남인계 천주교 신자들을 대거 처형하고 장용영을 혁파했다.',
      archive: 'bd_12_jeongjo', card_ref: 'massacre_1801_01',
      verify: false,
    },

    {
      id: 'fc_sedo', name: '세도 가문', lineage: 'sedo',
      founded: 1804, dissolved: 1863,
      foundedNote: '순조 친정과 함께 안동 김씨 권력 독점',
      dissolvedNote: '흥선대원군 집권으로 종결',
      base: '안동 김씨·풍양 조씨 — 혈연 집단',
      lat: 37.5796, lng: 126.9770,
      leaders: ['김조순', '조만영', '김좌근'],
      predecessors: ['fc_sipa'], successors: [],
      phases: [{ from: 1804, until: 1863, status: 'ruling' }],
      summary: '붕당이 아니라 혈연 집단이다. 학맥도 정치 노선도 필요 없었고 왕실과의 혼인만이 권력의 근거였다. 견제할 세력이 사라지자 매관매직이 공공연해지고 삼정이 문란해졌으며, 홍경래의 난과 임술민란으로 통치 체제가 지방부터 무너졌다. 조선이 가장 심하게 무너진 시기가 붕당이 치열하던 때가 아니라 붕당이 사라진 때였다는 사실이, 당파성론을 정면으로 반박한다.',
      archive: 'bd_13_sedo', card_ref: 'political_1804_01',
      verify: false,
    },

  ],

  // ── 계보 위의 분기 사건 ──────────────────────────────────────
  // 갈라지고 합쳐진 지점에 붙는 표식. 다이어그램에서 분기선의
  // 라벨이 되고, 클릭하면 자료실·지도 카드로 간다.
  events: [
    { year: 1498, label: '무오사화',   kind: 'purge', targets: ['fc_sarim'],
      archive: 'bd_01_sarim', card_ref: 'massacre_1498_01' },
    { year: 1519, label: '기묘사화',   kind: 'purge', targets: ['fc_sarim'],
      archive: 'bd_01_sarim', card_ref: 'massacre_1519_01' },
    { year: 1545, label: '을사사화',   kind: 'purge', targets: ['fc_sarim'],
      archive: 'bd_01_sarim', card_ref: 'massacre_1545_01' },
    { year: 1575, label: '동서분당',   kind: 'split', from: 'fc_sarim', to: ['fc_dongin', 'fc_seoin'],
      archive: 'bd_02_dongseo', card_ref: 'political_1575_01' },
    { year: 1589, label: '기축옥사',   kind: 'purge', targets: ['fc_dongin'],
      archive: 'bd_03_nambuk', card_ref: 'massacre_1589_01' },
    { year: 1591, label: '남북분당',   kind: 'split', from: 'fc_dongin', to: ['fc_namin', 'fc_bugin'],
      archive: 'bd_03_nambuk', card_ref: 'massacre_1589_01' },
    { year: 1623, label: '인조반정',   kind: 'purge', targets: ['fc_bugin'],
      archive: 'bd_05_injo', card_ref: 'plot_1623_01' },
    { year: 1659, label: '기해예송',   kind: 'clash', targets: ['fc_seoin', 'fc_namin'],
      archive: 'bd_06_yesong', card_ref: 'political_1659_02' },
    { year: 1674, label: '갑인예송',   kind: 'clash', targets: ['fc_seoin', 'fc_namin'],
      archive: 'bd_06_yesong', card_ref: 'political_1674_01' },
    { year: 1680, label: '경신환국',   kind: 'clash', targets: ['fc_namin'],
      archive: 'bd_07_hwanguk', card_ref: 'plot_1680_01' },
    { year: 1683, label: '노소분당',   kind: 'split', from: 'fc_seoin', to: ['fc_noron', 'fc_soron'],
      archive: 'bd_08_noso', card_ref: 'political_1684_01' },
    { year: 1689, label: '기사환국',   kind: 'clash', targets: ['fc_noron'],
      archive: 'bd_07_hwanguk', card_ref: 'plot_1689_01' },
    { year: 1694, label: '갑술환국',   kind: 'clash', targets: ['fc_namin'],
      archive: 'bd_07_hwanguk', card_ref: 'plot_1694_01' },
    { year: 1721, label: '신임옥사',   kind: 'purge', targets: ['fc_noron'],
      archive: 'bd_09_sinim', card_ref: 'plot_1721_01' },
    { year: 1725, label: '탕평책',     kind: 'policy', targets: ['fc_noron', 'fc_soron'],
      archive: 'bd_10_tangpyeong', card_ref: 'policy_1725_01' },
    { year: 1728, label: '이인좌의 난', kind: 'purge', targets: ['fc_soron'],
      archive: 'bd_09_sinim', card_ref: 'battle_1728_01' },
    { year: 1762, label: '임오화변 — 시파·벽파 분기', kind: 'split', from: 'fc_noron', to: ['fc_sipa', 'fc_byeokpa'],
      archive: 'bd_11_imo', card_ref: 'plot_1762_01' },
    { year: 1801, label: '신유박해',   kind: 'purge', targets: ['fc_namin'],
      archive: 'bd_12_jeongjo', card_ref: 'massacre_1801_01' },
    { year: 1804, label: '세도정치 시작', kind: 'end', targets: ['fc_sedo'],
      archive: 'bd_13_sedo', card_ref: 'political_1804_01' },
  ],
};
