// js/newBadge.js — NEW 배지 수명 관리
//
// 2026-07-30 왕두목 기획.
//
// ── 왜 시간이 아니라 조회 횟수인가 ──────────────────────────────
// 처음엔 "출시 후 N일" 방식을 검토했다. 왕두목 지적으로 뒤집혔다:
//   "새로운 콘텐츠 업로드 주기가 빠른 편이다. 14일은 길다.
//    한번 방문 시 바로 사라지는 것도 놓치기가 쉽다.
//    최소 3~5회 보면 없어지는 걸로."
//
// 정확한 판단이다. 배지의 임무는 "이게 있는 걸 모르실 겁니다"인데,
//   - 시간 기준은 그 사람이 실제로 봤는지와 무관하다. 2주 뒤에 처음 온
//     사람은 배지를 한 번도 못 보고 지나간다.
//   - 한 번 보고 사라지는 것도 실패다. 상단 내비는 눈이 잘 안 가는
//     영역이라 한 번 노출로는 인지가 안 된다.
// 그래서 기준은 "몇 번 노출됐는가"다. 사람마다 자기 속도로 N번 보고,
// 봤으면 사라진다. 이게 배지의 임무에 정확히 대응한다.
//
// ── 세션 중복 제거가 핵심이다  ★함정★ ────────────────────────
// 페이지 로드마다 세면 안 된다. 지도 → 서재 → 뒤로 → 자료실만 눌러도
// 4회가 찍힌다. 90초 만에 배지가 사라지고, 그 사람은 배지를 "본" 적이
// 없다. 조회 횟수 방식이 시간 방식보다 나쁜 결과를 낼 수 있는 지점이
// 바로 여기다.
//
// 그래서 한 세션에 1회만 센다(SESSION_GAP_MS 이상 간격이 벌어지면 새
// 세션). 결과적으로 4회 = 서로 다른 4번의 방문이 된다.
//
// ── 바깥 울타리 ────────────────────────────────────────────────
// 1년에 두 번 오는 사람에게 3년 뒤에도 NEW가 보이면 거짓말이 된다.
// 그래서 maxDays를 넘기면 횟수와 무관하게 접는다. 안전망일 뿐이고,
// 대부분은 횟수로 먼저 끝난다.
//
// ── 동시 노출 상한 ────────────────────────────────────────────
// 하루 한두 개씩 올리는 속도라면 명세가 금방 쌓인다. 빨간 배지가 세 개
// 이상 뜨면 "새것"이라는 신호 자체가 죽는다. 그래서 살아 있는 항목이
// 여러 개여도 최신 MAX_CONCURRENT개만 보여준다. 나머지는 조용히 숨는다.
//
// ── 이 배지는 "갈래"에 붙인다. "콘텐츠"에는 붙이지 않는다 ─────
// 답사·기억의 현장처럼 새 메뉴가 생겼을 때가 대상이다. 자료실 글
// 한 편, 카드 하나에는 붙이지 않는다 — 그건 「오늘의 특집」과 최신
// 목록이 할 일이고, 상단 내비까지 매일 빨개지면 크리스마스트리가 된다.

(function () {
  'use strict';

  // ── 명세 ──────────────────────────────────────────────────
  // 새 갈래가 생기면 여기 한 줄만 추가한다. 상단 내비는 7개 파일에
  // 복제돼 있으므로, 날짜를 HTML에 하드코딩하면 매번 7곳을 고쳐야 한다.
  // 그 반복을 없애는 것이 이 파일의 또 다른 목적이다.
  //
  //   key       : 배지 span의 data-new-key와 맞춘다
  //   label     : 배지에 쓸 글자
  //   launchedAt: 출시일 (YYYY-MM-DD)
  //   views     : 이 횟수만큼 노출되면 사라진다
  //   maxDays   : 횟수를 다 못 채웠어도 이 날수가 지나면 사라진다
  //   selector  : 배지를 붙일 자리. 이미 HTML에 span이 있으면 생략 가능.
  const ENTRIES = [
    {
      key: 'damsa',
      label: 'NEW',
      launchedAt: '2026-07-30',
      views: 4,        // 왕두목 확정 "3~5회" 중간값
      maxDays: 45,
    },
  ];

  const STORAGE_KEY = 'atlas_newbadge_v1';
  const SESSION_GAP_MS = 30 * 60 * 1000;   // 30분 — 이 이상 벌어지면 새 세션
  const MAX_CONCURRENT = 2;

  // ── 저장소 ────────────────────────────────────────────────
  // growth.js와 키를 나눠 쓴다. 배지는 growth.js가 없는 페이지
  // (답사 목록 등)에서도 동작해야 하므로 독립적이어야 한다.
  // 스토리지가 막혀 있으면 배지를 계속 보여주는 쪽으로 실패한다 —
  // 안 보여주는 것보다 계속 보이는 편이 덜 나쁘다.
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) || {}) : {};
    } catch (e) { return {}; }
  }

  function save(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* 무시 */ }
  }

  function daysSince(iso) {
    const t = Date.parse(iso + 'T00:00:00');
    if (isNaN(t)) return 0;
    return (Date.now() - t) / 86400000;
  }

  // ── 판정 ──────────────────────────────────────────────────
  // 노출 횟수를 다 썼거나, 바깥 울타리를 넘었으면 죽은 항목이다.
  function isAlive(entry, rec) {
    if (daysSince(entry.launchedAt) > entry.maxDays) return false;
    return (rec ? rec.views : 0) < entry.views;
  }

  function run() {
    const state = load();
    const now = Date.now();

    // 살아 있는 항목만 남기고, 최신 출시분 MAX_CONCURRENT개로 자른다.
    const alive = ENTRIES
      .filter((e) => isAlive(e, state[e.key]))
      .sort((a, b) => (a.launchedAt < b.launchedAt ? 1 : -1))
      .slice(0, MAX_CONCURRENT);
    const aliveKeys = new Set(alive.map((e) => e.key));

    // 1) 죽은 배지 걷어내기 — HTML에 박혀 있는 span을 제거한다.
    //    JS가 꺼져 있으면 배지가 그냥 남는데, 그건 허용한다(정보가
    //    조금 낡는 것 vs 아예 안 보이는 것 중 전자가 낫다).
    document.querySelectorAll('.nav-new[data-new-key]').forEach((el) => {
      if (!aliveKeys.has(el.dataset.newKey)) el.remove();
    });

    // 2) 살아 있는 항목 처리
    alive.forEach((entry) => {
      // selector가 지정돼 있고 아직 배지가 없으면 만들어 붙인다.
      // 앞으로 생길 갈래는 HTML을 건드리지 않고 명세만으로 처리된다.
      if (entry.selector) {
        document.querySelectorAll(entry.selector).forEach((host) => {
          if (host.querySelector('.nav-new')) return;
          const span = document.createElement('span');
          span.className = 'nav-new';
          span.dataset.newKey = entry.key;
          span.textContent = entry.label || 'NEW';
          host.appendChild(span);
        });
      }

      // 이 페이지에 배지가 실제로 보이지 않으면 세지 않는다.
      // 답사와 무관한 페이지를 돌아다닌 것으로 횟수가 깎이면 안 된다.
      if (!document.querySelector(`.nav-new[data-new-key="${entry.key}"]`)) return;

      const rec = state[entry.key] || { views: 0, lastAt: 0, firstAt: now };
      // ★ 세션 중복 제거 — 같은 세션의 여러 페이지 이동은 1회로 본다.
      if (now - (rec.lastAt || 0) >= SESSION_GAP_MS) {
        rec.views = (rec.views || 0) + 1;
        rec.lastAt = now;
        state[entry.key] = rec;
        save(state);
      }
    });
  }

  // ── 공개 API — 디버그·수동 제어용 ──────────────────────────
  window.AtlasNewBadge = {
    ENTRIES: ENTRIES,
    state: load,
    // 콘솔에서 되돌려 보고 싶을 때: AtlasNewBadge.reset()
    reset: function () { save({}); },
    // 특정 갈래만 즉시 끄고 싶을 때
    dismiss: function (key) {
      const s = load();
      const e = ENTRIES.find((x) => x.key === key);
      if (!e) return false;
      s[key] = { views: e.views, lastAt: Date.now() };
      save(s);
      document.querySelectorAll(`.nav-new[data-new-key="${key}"]`).forEach((el) => el.remove());
      return true;
    },
    _run: run,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
