// ═══════════════════════════════════════════════════════
// validator.js — 데이터 무결성 검증 및 진단 도구
// 의존: app.js (DATA, COLORS, TYPE_LABEL)
// 콘솔에서 직접 호출 가능: validateAll(), auditYear(1931), auditNarrative(1926) 등
// ═══════════════════════════════════════════════════════

// ── 데이터 조작 함수 (런타임에서 사건 추가/삭제/수정) ──
function addEvent(year, event) {
  if (!DATA[year]) DATA[year] = [];
  DATA[year].push(event);
}
function removeEvent(year, title) {
  if (!DATA[year]) return;
  DATA[year] = DATA[year].filter(e => e.title_ko !== title);
}
function updateEvent(year, title, newData) {
  if (!DATA[year]) return;
  const idx = DATA[year].findIndex(e => e.title_ko === title);
  if (idx > -1) DATA[year][idx] = { ...DATA[year][idx], ...newData };
}

// ── importance 자동 분류 (명시값 없으면 priority/type으로 추론) ──
// 줌 레벨에 따른 표시 밀도 제어(renderer.js)에서 사용.
function getImportance(e){
  if(e.importance) return e.importance;
  if(e.priority === 1) return 'global';
  if(e.type === 'person' || e.type === 'policy') return 'regional';
  return 'regional';
}

// ── 생명주기 기반 이벤트 조회 ──
// visible_from ~ visible_until 범위 안의 사건을 반환.
// 누적 감쇠: 3년 이상 지난 priority 2 사건은 자연 소멸시켜 화면 밀도를 제어.
// 단, 구조적 사건(정책·이동)은 시대 배경이므로 감쇠 대상에서 제외.
function getVisibleEvents(year) {
  return Object.values(DATA)
    .flat()
    .filter(e => {
      const from  = e.visible_from  ?? e.year;
      const until = e.visible_until ?? e.year;
      if (year < from || year > until) return false;
      const structuralTypes = ['policy','migration'];
      if (year - e.year >= 3 && e.priority === 2 && !structuralTypes.includes(e.type)) return false;
      return true;
    });
}

function getVisibleEventsInRange(startYear, endYear) {
  return Object.values(DATA)
    .flat()
    .filter(e => e.year >= startYear && e.year <= endYear);
}

// ═══════════════════════════════════════════════════════
// 검증 항목 1 — 연결(connections) 무결성
// ═══════════════════════════════════════════════════════
function validateConnections() {
  const ids = new Set(Object.values(DATA).flat().map(e => e.id));
  let issues = 0;
  Object.values(DATA).flat().forEach(e => {
    (e.connections || []).forEach(c => {
      if (!ids.has(c)) {
        console.warn('🔗 연결 누락:', e.title_ko, '→', c);
        issues++;
      }
    });
  });
  if (issues === 0) console.log('✓ 모든 연결 정상 (ID 기반)');
  else console.warn(`⚠ 연결 누락 ${issues}건 발견`);
  return issues;
}

// ═══════════════════════════════════════════════════════
// 검증 항목 2 — 중복 ID
// ═══════════════════════════════════════════════════════
function validateDuplicateIds() {
  const all = Object.values(DATA).flat();
  const seen = new Map();
  const dups = [];
  all.forEach(e => {
    if (seen.has(e.id)) {
      dups.push({ id: e.id, titles: [seen.get(e.id), e.title_ko] });
    } else {
      seen.set(e.id, e.title_ko);
    }
  });
  if (dups.length === 0) console.log('✓ 중복 ID 없음');
  else dups.forEach(d => console.warn(`⚠ 중복 ID "${d.id}":`, d.titles));
  return dups;
}

// ═══════════════════════════════════════════════════════
// 검증 항목 3 — 좌표 유효성
// (누락, 0/0, 한반도·동아시아 권역 밖 이상치 등)
// ═══════════════════════════════════════════════════════
function validateCoordinates() {
  const all = Object.values(DATA).flat();
  const issues = [];
  all.forEach(e => {
    if (e.lat == null || e.lng == null) {
      issues.push({ id: e.id, title: e.title_ko, problem: '좌표 누락' });
      return;
    }
    if (e.lat === 0 && e.lng === 0) {
      issues.push({ id: e.id, title: e.title_ko, problem: '좌표가 (0,0) — 입력 누락 의심' });
      return;
    }
    if (e.lat < -90 || e.lat > 90 || e.lng < -180 || e.lng > 180) {
      issues.push({ id: e.id, title: e.title_ko, problem: `좌표 범위 초과 (${e.lat},${e.lng})` });
    }
  });
  if (issues.length === 0) console.log('✓ 모든 좌표 유효');
  else issues.forEach(i => console.warn(`⚠ ${i.problem}:`, i.title, `(${i.id})`));
  return issues;
}

// ═══════════════════════════════════════════════════════
// 검증 항목 4 — visible_from / visible_until 오류
// (visible_until < visible_from, year가 범위 밖인 경우 등)
// ═══════════════════════════════════════════════════════
function validateLifecycle() {
  const all = Object.values(DATA).flat();
  const issues = [];
  all.forEach(e => {
    const from = e.visible_from ?? e.year;
    const until = e.visible_until ?? e.year;
    if (until < from) {
      issues.push({ id: e.id, title: e.title_ko, problem: `visible_until(${until}) < visible_from(${from})` });
    }
    if (e.year < from || e.year > until) {
      issues.push({ id: e.id, title: e.title_ko, problem: `발생연도(${e.year})가 visible 범위(${from}~${until}) 밖` });
    }
  });
  if (issues.length === 0) console.log('✓ 생명주기 필드 정상');
  else issues.forEach(i => console.warn(`⚠ ${i.problem}:`, i.title, `(${i.id})`));
  return issues;
}

// ═══════════════════════════════════════════════════════
// 검증 항목 5 — 고아 이벤트 (connections가 비어 있고,
// 다른 어떤 사건으로부터도 참조되지 않는 완전히 단절된 사건)
// ═══════════════════════════════════════════════════════
function validateOrphans() {
  const all = Object.values(DATA).flat();
  const referencedIds = new Set();
  all.forEach(e => (e.connections || []).forEach(c => referencedIds.add(c)));

  const orphans = all.filter(e => {
    const hasOutgoing = (e.connections || []).length > 0;
    const hasIncoming = referencedIds.has(e.id);
    return !hasOutgoing && !hasIncoming;
  });

  if (orphans.length === 0) console.log('✓ 고아 이벤트 없음');
  else {
    console.warn(`⚠ 고아 이벤트 ${orphans.length}건 (연결 완전히 없음):`);
    orphans.forEach(o => console.warn(`  · ${o.title_ko} (${o.id})`));
  }
  return orphans;
}

// ═══════════════════════════════════════════════════════
// 검증 항목 6 — 순환 참조 (A→B→A 또는 더 긴 순환 고리)
// ═══════════════════════════════════════════════════════
function validateCircularRefs() {
  const all = Object.values(DATA).flat();
  const byId = Object.fromEntries(all.map(e => [e.id, e]));
  const cycles = [];

  function dfs(startId, currentId, visited, path) {
    if (path.length > 0 && currentId === startId) {
      cycles.push([...path]);
      return;
    }
    if (visited.has(currentId) || path.length > 8) return; // 깊이 제한으로 무한루프 방지
    visited.add(currentId);
    const node = byId[currentId];
    if (!node) return;
    (node.connections || []).forEach(nextId => {
      dfs(startId, nextId, new Set(visited), [...path, nextId]);
    });
  }

  all.forEach(e => dfs(e.id, e.id, new Set(), []));

  // 중복 순환(같은 고리를 여러 시작점에서 탐지) 제거
  const uniqueCycles = [];
  const seenSets = new Set();
  cycles.forEach(c => {
    const key = [...c].sort().join(',');
    if (!seenSets.has(key)) { seenSets.add(key); uniqueCycles.push(c); }
  });

  if (uniqueCycles.length === 0) console.log('✓ 순환 참조 없음');
  else uniqueCycles.forEach(c => console.warn('⚠ 순환 참조:', c.join(' → ')));
  return uniqueCycles;
}

// ═══════════════════════════════════════════════════════
// 검증 항목 7 — 빈 사람 배열 (people: [] 인 사건 집계)
// 오류는 아니지만(정책/국제정세 사건은 인물이 없을 수 있음) 비율 확인용.
// ═══════════════════════════════════════════════════════
function auditEmptyPeople() {
  const all = Object.values(DATA).flat();
  const empty = all.filter(e => !e.people || e.people.length === 0);
  console.log(`ℹ people 빈 배열: ${empty.length}/${all.length}건 (${Math.round(empty.length/all.length*100)}%)`);
  return empty;
}

// 검증 항목 8 — 누락 연도 (1994~2025 중 데이터가 없는 해)
function validateMissingYears(startYear = 1994, endYear = 2025) {
  const missing = [];
  for (let y = startYear; y <= endYear; y++) {
    if (!DATA[y] || DATA[y].length === 0) missing.push(y);
  }
  if (missing.length === 0) console.log(`✓ ${startYear}~${endYear} 연도 누락 없음`);
  else console.warn(`⚠ 누락 연도:`, missing);
  return missing;
}

// ═══════════════════════════════════════════════════════
// 연도별 품질 감사 — 필드 누락 및 유형 분포
// ═══════════════════════════════════════════════════════
function auditYear(year) {
  const e = getVisibleEvents(year);
  const byType = {};
  e.forEach(x => { byType[x.type] = (byType[x.type] || 0) + 1; });
  const missing = e.filter(x => !x.summary_ko || x.lat == null || x.lng == null);
  const result = { year, 총사건: e.length, 유형별: byType, 누락: missing.map(m => m.title_ko) };
  console.table ? console.table(byType) : console.log(byType);
  console.log(`${year}년 · 총 ${e.length}개`, missing.length ? `· ⚠누락 ${missing.length}` : '· ✓완전');
  return result;
}

// ═══════════════════════════════════════════════════════
// 서사 균형 검증기 — 특정 연도가 한쪽 축으로 쏠리지 않는지 확인
// ═══════════════════════════════════════════════════════
function auditNarrative(year){
  const e = getVisibleEvents(year).filter(x=>x.year===year); // 그 해 신규 사건만
  const cnt = t => e.filter(x=>x.type===t).length;
  const byType = {};
  e.forEach(x=>{ byType[x.type]=(byType[x.type]||0)+1; });

  const isolated = e.filter(x=>!x.connections || x.connections.length===0).length;
  const isolatedRatio = e.length ? Math.round(isolated/e.length*100) : 0;

  const checks = {
    '전투≥1': cnt('battle')>=1,
    '정치≥1': cnt('political')>=1,
    '정책≥1': cnt('policy')>=1,
    '민중운동≥1': cnt('movement')>=1,
    '인물≥2': cnt('person')>=2,
    '고립≤30%': isolatedRatio<=30
  };
  console.log(`\n[ 서사 검증 · ${year}년 · 신규 ${e.length}개 ]`);
  Object.entries(checks).forEach(([k,v])=>console.log(`  ${v?'✓':'✗'} ${k}`));
  console.log(`  고립 사건: ${isolated}/${e.length} (${isolatedRatio}%)`);
  return { year, byType, isolatedRatio, checks };
}

// ═══════════════════════════════════════════════════════
// 검증 항목 9 — type 값 유효성 (schema.md 10종 외 값 사용 여부)
// ═══════════════════════════════════════════════════════
const VALID_EVENT_TYPES = ['battle','righteous','political','plot','policy',
  'massacre','person','movement','migration','organization','international'];

function validateEventTypes() {
  const all = Object.values(DATA).flat();
  const invalid = all.filter(e => !VALID_EVENT_TYPES.includes(e.type));
  if (invalid.length === 0) console.log('✓ type 값 전부 schema.md 10종 내');
  else console.warn(`⚠ schema.md에 없는 type 사용:`, invalid.map(e => `${e.id}(${e.type})`));
  return invalid;
}

// ═══════════════════════════════════════════════════════
// 검증 항목 10 — month 범위 (0~11, 1-base 혼입 여부)
// ═══════════════════════════════════════════════════════
function validateMonthRange() {
  const all = Object.values(DATA).flat();
  const invalid = all.filter(e => e.month != null && (e.month < 0 || e.month > 11));
  if (invalid.length === 0) console.log('✓ month 값 전부 0~11 범위 내');
  else console.warn(`⚠ month 범위 밖 (1-base 혼입 의심, 12월은 11이어야 함):`, invalid.map(e => `${e.id}(month=${e.month})`));
  return invalid;
}


function validateAll() {
  console.log('═══════════════════════════════════');
  console.log('  기억의 연대기 — 전체 데이터 검증');
  console.log('═══════════════════════════════════');
  const report = {
    duplicateIds:      validateDuplicateIds(),
    brokenConnections:  validateConnections(),
    invalidCoordinates: validateCoordinates(),
    lifecycleErrors:    validateLifecycle(),
    orphanEvents:       validateOrphans(),
    circularRefs:       validateCircularRefs(),
    missingYears:       validateMissingYears(),
    invalidTypes:       validateEventTypes(),
    invalidMonths:      validateMonthRange(),
  };
  auditEmptyPeople();
  console.log('═══════════════════════════════════');
  const totalIssues = (report.duplicateIds.length || 0)
    + (typeof report.brokenConnections === 'number' ? report.brokenConnections : 0)
    + report.invalidCoordinates.length
    + report.lifecycleErrors.length
    + report.orphanEvents.length
    + report.circularRefs.length
    + report.missingYears.length
    + report.invalidTypes.length
    + report.invalidMonths.length;
  console.log(totalIssues === 0 ? '✓✓✓ 전체 검증 통과' : `⚠ 총 ${totalIssues}건의 문제 발견 — 위 로그 확인`);
  return report;
}

// 페이지 로드 시 핵심 검증 자동 실행 (연결 무결성만 — 나머지는 콘솔에서 validateAll() 수동 호출)
validateConnections();
