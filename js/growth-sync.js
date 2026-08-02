// js/growth-sync.js — 「나의 서재」 서버 동기화 (2026-08-02)
//
// growth.js가 localStorage(atlas_growth_v1)에 쌓는 서재 데이터를,
// 로그인한 사용자에 한해 Supabase의 user_growth 테이블에도 저장한다.
//
// 범위: 지금은 namu.html(나의 서재 페이지)에서만 동작한다. 다른
// 페이지(지도·자료실)에는 Supabase SDK를 아직 넣지 않았다 — 영향
// 범위를 좁게 유지하기 위해서다. 나중에 필요해지면 이 파일을
// 그대로 다른 페이지에도 로드하면 된다.
//
// 흐름:
//   1) 로그인 세션 확인
//   2) 비로그인 → 지금처럼 localStorage만 사용. 로그인 안내만 보여준다.
//   3) 로그인 → 서버 데이터를 가져와 AtlasGrowth.merge(로컬, 서버)로
//      합집합 병합 → 병합 결과를 로컬(replaceData)과 서버 양쪽에 반영
//   4) 이후 5분마다, 그리고 탭을 벗어날 때 조용히 재동기화
//
// 실패 처리: 네트워크 오류, 로그인 안 됨, Supabase 오류 등 어떤
// 경우에도 이 파일의 실패가 서재 화면 자체를 막아서는 안 된다.
// growth.js와 동일한 원칙 — 모두 try/catch로 감싼다.

(function () {
  'use strict';

  var SUPABASE_URL = 'https://qichxmrgfvjglkshopzm.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_fIIGCb62yz482OA6Q0kF4w_Ou1_1hRq';
  var SYNC_INTERVAL_MS = 5 * 60 * 1000; // 5분마다 조용히 재동기화

  var G = window.AtlasGrowth;
  if (!G || !window.supabase) return;

  var sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  window.agSb = window.agSb || sb; // 다른 스크립트가 재사용할 수 있게

  var session = null;
  var syncTimer = null;
  var syncing = false;

  // ── 서버 fetch/저장 ────────────────────────────────────────
  async function fetchServerData(userId) {
    try {
      var res = await sb.from('user_growth').select('data').eq('user_id', userId).maybeSingle();
      if (res.error) { console.warn('[growth-sync] fetch error', res.error); return null; }
      return res.data ? res.data.data : null;
    } catch (e) {
      console.warn('[growth-sync] fetch exception', e);
      return null;
    }
  }

  async function pushServerData(userId, data) {
    try {
      var res = await sb.from('user_growth').upsert({
        user_id: userId, data: data, updated_at: new Date().toISOString()
      });
      if (res.error) console.warn('[growth-sync] push error', res.error);
      return !res.error;
    } catch (e) {
      console.warn('[growth-sync] push exception', e);
      return false;
    }
  }

  // ── 병합 동기화 한 사이클 ──────────────────────────────────
  async function syncOnce(isFirstSync) {
    if (!session || syncing) return;
    syncing = true;
    try {
      var userId = session.user.id;
      var local = G.getData();
      var server = await fetchServerData(userId);

      var merged = server ? G.merge(local, server) : local;

      // 첫 동기화(로그인 직후)에는 로컬과 병합 결과가 다를 수 있으므로
      // 반영 + 화면 재렌더까지 해준다. 이후 주기 동기화는 조용히
      // 서버에 반영만 한다.
      if (isFirstSync) {
        G.replaceData(merged);
        if (typeof window.AtlasSeogaRender === 'function') {
          try { window.AtlasSeogaRender(); } catch (e) {}
        }
      } else {
        // 그 사이 로컬에 새로 쌓인 게 있을 수 있으니, 최신 로컬 기준으로
        // 다시 한번 병합해서 올린다(로컬 쪽이 항상 최신 진행 상황).
        merged = G.merge(G.getData(), server || {});
      }

      await pushServerData(userId, merged);
      renderSyncStatus();
    } catch (e) {
      console.warn('[growth-sync] cycle failed', e);
    } finally {
      syncing = false;
    }
  }

  function startPeriodicSync() {
    if (syncTimer) clearInterval(syncTimer);
    syncTimer = setInterval(function () { syncOnce(false); }, SYNC_INTERVAL_MS);
    // 탭을 벗어나거나 닫을 때도 한 번 더 반영
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) syncOnce(false);
    });
    window.addEventListener('pagehide', function () { syncOnce(false); });
  }

  // ── 로그인 UI ──────────────────────────────────────────────
  function wireLoginButtons() {
    var box = document.getElementById('growthLoginActions');
    if (!box) return;
    Array.prototype.forEach.call(box.querySelectorAll('[data-provider]'), function (btn) {
      btn.addEventListener('click', function () {
        var provider = btn.getAttribute('data-provider');
        var providerId = (provider === 'naver') ? 'custom:naver' : provider;
        var opts = { redirectTo: window.location.origin + window.location.pathname };
        if (provider === 'kakao') opts.scopes = 'profile_nickname';
        sb.auth.signInWithOAuth({ provider: providerId, options: opts });
      });
    });
  }

  function renderSyncStatus() {
    var box = document.getElementById('growthSyncBox');
    if (!box) return;
    if (session) {
      box.innerHTML =
        '<p>이 서재는 계정에 저장되어, 다른 기기에서도 로그인하면 이어서 볼 수 있습니다.</p>' +
        '<p class="namu-tiny" id="growthSyncTime"></p>' +
        '<div class="namu-actions"><button type="button" class="namu-btn" id="growthLogoutBtn">로그아웃</button></div>';
      var t = document.getElementById('growthSyncTime');
      if (t) t.textContent = '방금 동기화됨';
      var logoutBtn = document.getElementById('growthLogoutBtn');
      if (logoutBtn) logoutBtn.addEventListener('click', async function () {
        try { await sb.auth.signOut(); } catch (e) {}
        location.reload();
      });
    } else {
      box.innerHTML =
        '<p>이 기록은 지금 쓰는 브라우저에만 저장됩니다. 서버로 보내지 않고, 누구와도 공유되지 않습니다.</p>' +
        '<p>광장에서 로그인하면 이 서재가 계정에 저장되어, 다른 기기에서도 이어서 볼 수 있습니다. 지금까지 쌓인 기록은 그대로 가져갑니다.</p>' +
        '<div class="namu-actions" id="growthLoginActions">' +
          '<button type="button" class="namu-btn" data-provider="kakao">카카오로 로그인</button>' +
          '<button type="button" class="namu-btn" data-provider="google">구글로 로그인</button>' +
          '<button type="button" class="namu-btn" data-provider="naver">네이버로 로그인</button>' +
        '</div>';
      wireLoginButtons();
    }
  }

  // ── 초기화 ─────────────────────────────────────────────────
  async function init() {
    wireLoginButtons();
    try {
      sb.auth.onAuthStateChange(function (event, sessNew) {
        var wasLoggedIn = !!session;
        session = sessNew;
        renderSyncStatus();
        if (session && !wasLoggedIn) {
          syncOnce(true);
          startPeriodicSync();
        }
      });
      var immediate = await sb.auth.getSession();
      if (immediate && immediate.data && immediate.data.session) {
        session = immediate.data.session;
        renderSyncStatus();
        syncOnce(true);
        startPeriodicSync();
      }
    } catch (e) {
      console.warn('[growth-sync] init failed', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
