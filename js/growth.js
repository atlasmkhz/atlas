// js/growth.js — 「나의 역사 나무」 기록 수집 모듈
//
// 2026-07-22 왕두목 기획. 사용자가 ATLAS에서 무엇을 얼마나 읽었는지
// 기록하고, 그것을 나무의 성장으로 시각화하기 위한 데이터 계층이다.
//
// ── 나무의 구성 (왕두목 확정) ────────────────────────────────
//   키(줄기) = 총 체류 시간      — 얼마나 오래 함께했나
//   가지 7개 = 시대별 체류 시간  — 어느 시대를 깊이 봤나
//   잎       = 이벤트 카드 열람  — 얼마나 촘촘히 봤나
//   꽃       = 자료실 글 + 루트  — 깊이 읽었나
//   열매     = 배지              — 무엇을 이뤘나 (3단계에서 구현)
//
// ── 설계 원칙 ────────────────────────────────────────────────
// 1) 지금은 localStorage만 쓴다. 서버도 계정도 없다. 다만 나중에
//    소셜 로그인(카카오/구글)을 붙일 때 이 데이터를 그대로 서버로
//    올려야 하므로, 처음부터 "합집합 병합"이 가능한 구조로 짠다.
//    - 누적값(체류 시간)은 더하면 된다
//    - 집합값(읽은 카드 id)은 중복 제거해 합치면 된다
//    - 최초값(첫 방문일, 씨앗 시대)은 더 이른 쪽을 남긴다
//    이 세 가지 규칙으로 어떤 기기 조합이든 손실 없이 병합된다.
//
// 2) 체류 시간은 "실제로 보고 있던 시간"만 센다. 탭을 열어두고
//    딴짓하는 경우를 거르기 위해 두 가지 장치를 둔다.
//    - Page Visibility API: 탭이 화면에 안 보이면 계측 중단
//    - 유휴 감지: IDLE_LIMIT_MS 동안 아무 조작이 없으면 중단
//    (조작 = 마우스 이동/클릭/키 입력/스크롤/터치)
//
// 3) 시대(era) 판별은 경로로 한다. 루트 index.html은 근대(modern)
//    지도이고, maps/{era}/ 아래는 그 era다. 자료실·루트 페이지처럼
//    시대에 속하지 않는 곳은 era를 null로 두고 총 시간에만 더한다.
//
// 4) 이 파일은 모든 페이지에서 로드된다. 무거우면 안 되고, 오류가
//    나도 본 기능(지도·자료실)을 망가뜨리면 안 된다. 그래서 모든
//    저장/읽기를 try/catch로 감싼다 — 시크릿 모드나 스토리지 차단
//    환경에서도 사이트 자체는 정상 동작해야 한다.

(function () {
  'use strict';

  const STORAGE_KEY = 'atlas_growth_v1';
  const SCHEMA_VERSION = 1;

  // 계측 주기와 유휴 기준. TICK마다 누적하므로 TICK이 짧으면 정확하지만
  // 저장이 잦아진다. 5초면 충분히 정확하고 부담도 없다.
  const TICK_MS = 5000;
  const IDLE_LIMIT_MS = 5 * 60 * 1000;   // 5분간 조작 없으면 유휴로 간주
  const SAVE_DEBOUNCE_MS = 2000;

  // 시대 목록 — nav.js의 ERA_HUB_ITEMS와 순서·키를 맞춘다.
  // 나무의 가지 7개가 이 순서로 배치된다.
  const ERAS = [
    { key: 'prehistory',   name: '선사시대', short: '선사' },
    { key: 'ancient',      name: '고대',     short: '고대' },
    { key: 'medieval1',    name: '중세 1',   short: '고려' },
    { key: 'medieval2',    name: '중세 2',   short: '조선' },
    { key: 'modern',       name: '근대',     short: '근대' },
    { key: 'modern2',      name: '근현대',   short: '근현대' },
    { key: 'contemporary', name: '현대',     short: '현대' },
  ];

  // ── 성장 단계 ──────────────────────────────────────────────
  // 왕두목 확정: "보통, 혹은 그래프가 있으면 조금 더 느려도 됨".
  // 개인 페이지에 진행 그래프가 들어가므로 보통보다 살짝 느리게 잡되,
  // 첫 방문에 씨앗이 트는 체감은 유지한다(20분).
  //
  // 곡선 의도: 초반은 빠르게(첫 방문에 변화가 보여야 시스템을 인지),
  // 뒤로 갈수록 느리게(장기 목표). 큰나무 60시간은 ATLAS 전체 콘텐츠
  // (자료실 205편 + 카드 1,600여 개)를 훑는 데 걸리는 시간과 대략 맞다.
  const STAGES = [
    { key: 'seed',     name: '씨앗',     minMinutes: 0 },
    { key: 'sprout',   name: '새싹',     minMinutes: 20 },
    { key: 'sapling',  name: '묘목',     minMinutes: 3 * 60 },
    { key: 'young',    name: '어린나무', minMinutes: 15 * 60 },
    { key: 'grown',    name: '큰나무',   minMinutes: 60 * 60 },
  ];

  // 씨앗 시대 확정 대기 기간. 첫 방문에 여러 시대를 훑는 사람이 많으므로
  // 바로 정하지 않고 일주일을 지켜본 뒤 "가장 오래 머문 시대"로 정한다.
  // 그 전까지는 씨앗 상태로 두고, 확정되는 순간 새싹이 돋는 연출을 한다.
  // (왕두목 기획: "역사는 내가 관심 갖는 지점에서 시작된다")
  const SEED_DECIDE_DAYS = 7;

  // ── 기본 데이터 구조 ───────────────────────────────────────
  function emptyData() {
    const eraSeconds = {};
    ERAS.forEach(e => { eraSeconds[e.key] = 0; });
    return {
      v: SCHEMA_VERSION,
      firstVisit: null,      // ISO 문자열. 병합 시 더 이른 쪽을 남긴다.
      lastVisit: null,       // ISO 문자열. 병합 시 더 늦은 쪽을 남긴다.
      totalSeconds: 0,       // 누적 — 병합 시 더한다
      eraSeconds: eraSeconds,// 누적 — 병합 시 키별로 더한다
      cards: [],             // 집합 — 본 이벤트 카드 id ("era:cardId")
      archives: [],          // 집합 — 읽은 자료실 글 ("seriesId/postId")
      routes: [],            // 집합 — 방문한 루트 id
      scraps: [],            // 집합(순서 의미 있음) — 스크랩 항목
      badges: [],            // 집합 — 배지 id (3단계에서 사용)
      reflections: [],       // 20번 성찰 문항 답변 (3단계에서 사용)
      seedEra: null,         // 확정된 씨앗 시대. 한번 정해지면 안 바뀐다.
      tutorialSeen: false,   // 4단계 튜토리얼용
    };
  }

  // ── 저장소 접근 ────────────────────────────────────────────
  // 시크릿 모드·스토리지 차단 환경에서도 사이트가 죽지 않아야 하므로
  // 실패하면 메모리에만 들고 조용히 넘어간다.
  let memoryFallback = null;
  let storageAvailable = true;

  function load() {
    if (!storageAvailable) return memoryFallback || (memoryFallback = emptyData());
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyData();
      const parsed = JSON.parse(raw);
      return migrate(parsed);
    } catch (e) {
      storageAvailable = false;
      return memoryFallback || (memoryFallback = emptyData());
    }
  }

  let saveTimer = null;
  function save(data, immediate) {
    memoryFallback = data;
    if (!storageAvailable) return;
    const doWrite = () => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        // 용량 초과 등. 사이트를 멈추지 않는다.
        storageAvailable = false;
      }
    };
    if (immediate) {
      if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
      doWrite();
      return;
    }
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(doWrite, SAVE_DEBOUNCE_MS);
  }

  // 스키마가 올라갈 때를 대비한 자리. 지금은 누락 필드만 채운다.
  function migrate(d) {
    const base = emptyData();
    if (!d || typeof d !== 'object') return base;
    const out = Object.assign(base, d);
    // eraSeconds에 새 시대가 추가됐을 수 있으므로 보정
    ERAS.forEach(e => {
      if (typeof out.eraSeconds[e.key] !== 'number') out.eraSeconds[e.key] = 0;
    });
    ['cards', 'archives', 'routes', 'scraps', 'badges', 'reflections'].forEach(k => {
      if (!Array.isArray(out[k])) out[k] = [];
    });
    out.v = SCHEMA_VERSION;
    return out;
  }

  // ── 현재 페이지가 어느 시대인가 ────────────────────────────
  // 경로로 판별한다. /maps/{era}/ 아래면 그 era, 사이트 루트의
  // index.html/map.html이면 근대(modern), 그 외(자료실·루트 페이지 등)는
  // null — 총 체류 시간에는 더하되 특정 가지를 키우지는 않는다.
  function detectEra() {
    const p = location.pathname;
    const m = p.match(/\/maps\/([a-z0-9_]+)\//i);
    if (m) {
      const key = m[1].toLowerCase();
      if (ERAS.some(e => e.key === key)) return key;
      return null;
    }
    // 사이트 루트의 지도 페이지 = 근대(1876~1945)
    if (/(^|\/)(index\.html|map\.html)?$/.test(p) && !/\/(archive|route|event)\//.test(p)) {
      return 'modern';
    }
    return null;
  }

  // ── 체류 시간 계측 ─────────────────────────────────────────
  let lastActivity = Date.now();
  let tickTimer = null;
  let data = load();
  const currentEra = detectEra();

  function markActivity() { lastActivity = Date.now(); }

  function isEngaged() {
    if (document.hidden) return false;
    if (Date.now() - lastActivity > IDLE_LIMIT_MS) return false;
    return true;
  }

  function tick() {
    if (!isEngaged()) return;
    const secs = TICK_MS / 1000;
    data.totalSeconds += secs;
    if (currentEra && typeof data.eraSeconds[currentEra] === 'number') {
      data.eraSeconds[currentEra] += secs;
    }
    data.lastVisit = new Date().toISOString();
    maybeDecideSeed();
    save(data);
  }

  // 씨앗 시대 확정 — 첫 방문 후 SEED_DECIDE_DAYS가 지났고 아직 정해지지
  // 않았다면, 가장 오래 머문 시대로 확정한다. 한 번 정해지면 바뀌지 않는다.
  function maybeDecideSeed() {
    if (data.seedEra) return;
    if (!data.firstVisit) return;
    const elapsed = Date.now() - new Date(data.firstVisit).getTime();
    if (elapsed < SEED_DECIDE_DAYS * 24 * 60 * 60 * 1000) return;
    let best = null, bestVal = 0;
    ERAS.forEach(e => {
      const v = data.eraSeconds[e.key] || 0;
      if (v > bestVal) { bestVal = v; best = e.key; }
    });
    // 아무 시대도 방문하지 않았다면 아직 정하지 않는다
    if (best && bestVal > 0) data.seedEra = best;
  }

  // ── 기록 API ───────────────────────────────────────────────
  function addToSet(arr, value, cap) {
    if (!value) return false;
    if (arr.indexOf(value) !== -1) return false;
    arr.push(value);
    if (cap && arr.length > cap) arr.shift();
    return true;
  }

  // 이벤트 카드 열람 → 잎
  function recordCard(cardId, eraKey) {
    if (!cardId) return;
    const key = (eraKey || currentEra || 'unknown') + ':' + cardId;
    if (addToSet(data.cards, key, 5000)) save(data);
  }

  // 자료실 글 정독 → 꽃
  function recordArchive(seriesId, postId) {
    if (!seriesId || !postId) return;
    if (addToSet(data.archives, seriesId + '/' + postId, 2000)) save(data);
  }

  // 루트 방문 → 꽃
  function recordRoute(routeId) {
    if (!routeId) return;
    if (addToSet(data.routes, routeId, 500)) save(data);
  }

  // ── 스크랩 (북마크) ────────────────────────────────────────
  // 왕두목 확정: "나중에 다시 보기 위함" — 폴더/메모 없는 단순 북마크.
  // 다만 목록에서 알아볼 수 있어야 하므로 제목과 URL은 같이 저장한다.
  function addScrap(item) {
    if (!item || !item.url) return false;
    if (data.scraps.some(s => s.url === item.url)) return false;
    data.scraps.push({
      url: item.url,
      title: item.title || item.url,
      kind: item.kind || 'page',   // 'card' | 'archive' | 'route' | 'page'
      era: item.era || currentEra || null,
      at: new Date().toISOString(),
    });
    if (data.scraps.length > 1000) data.scraps.shift();
    save(data, true);
    return true;
  }

  function removeScrap(url) {
    const before = data.scraps.length;
    data.scraps = data.scraps.filter(s => s.url !== url);
    if (data.scraps.length !== before) { save(data, true); return true; }
    return false;
  }

  function isScrapped(url) {
    return data.scraps.some(s => s.url === url);
  }

  function toggleScrap(item) {
    if (!item || !item.url) return false;
    if (isScrapped(item.url)) { removeScrap(item.url); return false; }
    addScrap(item);
    return true;
  }

  // ── 성장 계산 ──────────────────────────────────────────────
  function stageOf(totalSeconds) {
    const mins = totalSeconds / 60;
    let cur = STAGES[0];
    for (let i = 0; i < STAGES.length; i++) {
      if (mins >= STAGES[i].minMinutes) cur = STAGES[i];
    }
    return cur;
  }

  function nextStageOf(totalSeconds) {
    const mins = totalSeconds / 60;
    for (let i = 0; i < STAGES.length; i++) {
      if (mins < STAGES[i].minMinutes) return STAGES[i];
    }
    return null; // 최종 단계 도달
  }

  // 개인 페이지의 진행 그래프가 쓰는 요약값.
  // 왕두목 요청: "묘목까지 몇 시간 남았는지" 보이게.
  function summary() {
    const total = data.totalSeconds;
    const stage = stageOf(total);
    const next = nextStageOf(total);
    const curMin = stage.minMinutes;
    const nextMin = next ? next.minMinutes : null;
    let progress = 1;
    let remainSeconds = 0;
    if (next) {
      const span = (nextMin - curMin) * 60;
      const done = total - curMin * 60;
      progress = span > 0 ? Math.min(1, Math.max(0, done / span)) : 0;
      remainSeconds = Math.max(0, nextMin * 60 - total);
    }
    // 가지 굵기 = 시대별 체류 시간의 상대값
    const eraMax = Math.max(1, ...ERAS.map(e => data.eraSeconds[e.key] || 0));
    const branches = ERAS.map(e => ({
      key: e.key,
      name: e.name,
      short: e.short,
      seconds: data.eraSeconds[e.key] || 0,
      ratio: (data.eraSeconds[e.key] || 0) / eraMax,
      visited: (data.eraSeconds[e.key] || 0) > 0,
    }));
    return {
      stage: stage,
      nextStage: next,
      progress: progress,
      remainSeconds: remainSeconds,
      totalSeconds: total,
      branches: branches,
      erasVisited: branches.filter(b => b.visited).length,
      leaves: data.cards.length,
      flowers: data.archives.length + data.routes.length,
      fruits: data.badges.length,
      seedEra: data.seedEra,
      seedPending: !data.seedEra && !!data.firstVisit,
      seedDaysLeft: data.firstVisit
        ? Math.max(0, Math.ceil(SEED_DECIDE_DAYS - (Date.now() - new Date(data.firstVisit).getTime()) / 86400000))
        : SEED_DECIDE_DAYS,
      firstVisit: data.firstVisit,
      scrapCount: data.scraps.length,
    };
  }

  // ── 계정 이전용 병합 (2단계에서 서버가 호출) ────────────────
  // 한 사람이 휴대폰·PC에서 각각 기록을 쌓은 경우를 손실 없이 합친다.
  // 누적값은 더하고, 집합값은 중복 제거해 합치고, 최초값은 이른 쪽을 남긴다.
  function merge(a, b) {
    const out = emptyData();
    out.firstVisit = [a.firstVisit, b.firstVisit].filter(Boolean).sort()[0] || null;
    out.lastVisit = [a.lastVisit, b.lastVisit].filter(Boolean).sort().pop() || null;
    out.totalSeconds = (a.totalSeconds || 0) + (b.totalSeconds || 0);
    ERAS.forEach(e => {
      out.eraSeconds[e.key] = (a.eraSeconds?.[e.key] || 0) + (b.eraSeconds?.[e.key] || 0);
    });
    ['cards', 'archives', 'routes', 'badges'].forEach(k => {
      out[k] = Array.from(new Set([...(a[k] || []), ...(b[k] || [])]));
    });
    const scrapMap = new Map();
    [...(a.scraps || []), ...(b.scraps || [])].forEach(s => {
      if (s && s.url && !scrapMap.has(s.url)) scrapMap.set(s.url, s);
    });
    out.scraps = Array.from(scrapMap.values());
    out.reflections = [...(a.reflections || []), ...(b.reflections || [])];
    // 씨앗 시대는 먼저 정해진 쪽을 존중한다
    out.seedEra = a.seedEra || b.seedEra || null;
    out.tutorialSeen = !!(a.tutorialSeen || b.tutorialSeen);
    return out;
  }

  // ── 초기화 ─────────────────────────────────────────────────
  function init() {
    if (!data.firstVisit) {
      data.firstVisit = new Date().toISOString();
      save(data, true);
    }
    ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'click']
      .forEach(ev => window.addEventListener(ev, markActivity, { passive: true }));

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) markActivity();
      else save(data, true);   // 탭을 떠날 때 즉시 저장
    });
    window.addEventListener('pagehide', () => save(data, true));

    tickTimer = setInterval(tick, TICK_MS);
  }

  // ── 공개 API ───────────────────────────────────────────────
  window.AtlasGrowth = {
    ERAS: ERAS,
    STAGES: STAGES,
    getData: () => data,
    summary: summary,
    recordCard: recordCard,
    recordArchive: recordArchive,
    recordRoute: recordRoute,
    addScrap: addScrap,
    removeScrap: removeScrap,
    isScrapped: isScrapped,
    toggleScrap: toggleScrap,
    merge: merge,
    currentEra: () => currentEra,
    // 개발/디버그용 — 콘솔에서 상태를 초기화할 때 쓴다
    _reset: () => { data = emptyData(); save(data, true); },
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
