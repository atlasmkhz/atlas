// ═══════════════════════════════════════════════════════
// analytics.js — GA4 이벤트 트래킹 헬퍼 (v2 — 전체 이벤트 체계)
//
// Measurement ID: G-9C05WN48C4 (index.html의 gtag 부트스트랩에서 이미
// gtag('config', 'G-9C05WN48C4', {send_page_view:false})로 초기화됨 —
// 이 파일은 그 위에서 이벤트만 보낸다. Google Tag(gtag.js) 로더 자체는
// 여기서 다시 로드하지 않는다 — 페이지당 <head>에서 단 한 번만 로드되고,
// 이 파일이 실행되는 시점엔 이미 window.gtag가 준비돼 있다.
//
// 이 파일 하나로 관리하는 것:
//   - trackEvent(name, params)   — 모든 GA4 이벤트의 단일 진입점
//   - trackPageView(type, name)  — "가상 페이지뷰"(오버레이 전환 등)
//   - trackEventOpen / trackSearch / trackTimelineMove / trackYearChange /
//     trackFilterChange / trackMapInteraction — 작업지시서 명시 이벤트
//   - history.pushState/replaceState/popstate 훅 — 실제 URL 라우팅이
//     생기면 자동으로 page_view를 잡는다(지금 ATLAS는 URL을 바꾸지
//     않는 오버레이 기반 SPA라 이 훅 자체는 지금 당장 아무것도 잡지
//     않는다 — 아래 주석 참고)
//   - 디버그 모드(DebugView 연동)
//   - 향후 Atlas Analytics 확장용 스텁(v56에서 추가된 것 그대로 유지)
// ═══════════════════════════════════════════════════════

(function () {

  function gtagReady() {
    return typeof window.gtag === 'function';
  }

  // ── 디버그 모드 ──
  // localhost/127.0.0.1로 접속했거나 URL에 ?debug=1이 붙으면, 모든
  // 이벤트에 debug_mode:true를 실어서 GA4 DebugView(관리자 > DebugView)
  // 에서 실시간으로 확인할 수 있게 한다. 운영 도메인(atlas.mkhz.kr)에서
  // 일반 방문자에게는 이 플래그가 절대 붙지 않는다.
  const DEBUG_MODE = (function () {
    try {
      const host = window.location.hostname;
      const isLocalHost = host === 'localhost' || host === '127.0.0.1' || host === '';
      const hasDebugParam = new URLSearchParams(window.location.search).get('debug') === '1';
      return isLocalHost || hasDebugParam;
    } catch (_) {
      return false;
    }
  })();

  function withDebug(params) {
    return DEBUG_MODE ? Object.assign({}, params, { debug_mode: true }) : (params || {});
  }

  // ── 공통 진입점 ──
  // 직접 gtag()를 여기저기서 호출하지 않고, 항상 이 함수를 거친다 —
  // 나중에 GA4 외에 자체 Atlas Analytics로도 같은 이벤트를 보내고
  // 싶어지면 이 함수 하나만 고치면 전체에 반영된다.
  window.trackEvent = function (name, params) {
    if (!gtagReady()) return;
    window.gtag('event', name, withDebug(params));
  };

  // page_type 예: 'era' | 'route' | 'archive_hub' | 'archive' | 'card' | 'world_event'
  window.trackPageView = function (pageType, pageName) {
    window.trackEvent('page_view', {
      page_title: pageName || pageType,
      page_location: window.location.href,
      // SPA라 실제 URL은 안 바뀌므로, GA4 리포트에서 화면을 구분할 수
      // 있게 page_path에 화면 종류를 붙여넣는다(실제 네트워크 요청
      // 경로는 아니다).
      page_path: window.location.pathname + '#' + pageType + (pageName ? ':' + pageName : ''),
      atlas_page_type: pageType,
    });
  };

  // ── history.pushState/replaceState/popstate 훅 ──
  // 지금 ATLAS는 실제 클라이언트 라우팅(pushState)을 쓰지 않는다 —
  // 시대/루트/자료실 전환은 전부 풀스크린 오버레이 열기·닫기로
  // 이뤄지고 URL이 그대로다. 그래서 이 훅은 지금 당장 아무 것도
  // 잡아내지 못한다(트리거될 pushState 호출 자체가 코드에 없다).
  // 다만 나중에 실제 URL 라우팅이 추가되더라도 이 파일을 다시 손볼
  // 필요 없이 자동으로 page_view가 잡히도록 지금 걸어둔다(작업지시서
  // 요구사항). 지금 당장의 화면 전환 추적은 아래처럼 각 UI 코드에서
  // trackPageView()를 명시적으로 부르는 방식을 쓴다 — 오버레이 기반
  // 앱에서는 이쪽이 "언제가 실제 화면 전환 순간인지"를 훨씬 정확히
  // 짚어낸다(URL이 안 바뀌니 history 훅만으로는 애초에 알 수 없다).
  (function hookHistory() {
    let lastPath = window.location.pathname + window.location.search;
    function onRouteChange() {
      const path = window.location.pathname + window.location.search;
      if (path === lastPath) return;
      lastPath = path;
      window.trackPageView('url', path);
    }
    try {
      const _pushState = history.pushState;
      history.pushState = function () {
        const ret = _pushState.apply(this, arguments);
        onRouteChange();
        return ret;
      };
      const _replaceState = history.replaceState;
      history.replaceState = function () {
        const ret = _replaceState.apply(this, arguments);
        onRouteChange();
        return ret;
      };
      window.addEventListener('popstate', onRouteChange);
    } catch (_) { /* history API를 못 건드리는 환경이면 조용히 무시 */ }
  })();

  // ── 작업지시서 명시 이벤트 헬퍼 ──

  // 사건 카드 클릭. event 객체(e.id/title_ko/year/type)를 그대로 넘기면
  // 알아서 파라미터를 뽑는다 — 호출부에서 필드명을 매번 신경 쓸 필요 없음.
  window.trackEventOpen = function (event) {
    if (!event) return;
    window.trackEvent('event_open', {
      event_id: event.id || null,
      event_title: event.title_ko || event.title_en || null,
      year: event.year != null ? event.year : null,
      category: event.type || null,
    });
  };

  window.trackSearch = function (searchTerm, resultCount) {
    window.trackEvent('search', {
      search_term: searchTerm,
      result_count: resultCount != null ? resultCount : null,
    });
  };

  // period 예: '개항기'(근대) / '이승만 (제1공화국)'(근현대 정권 띠)
  window.trackTimelineMove = function (period) {
    window.trackEvent('timeline_move', { period: period });
  };

  window.trackYearChange = function (year) {
    window.trackEvent('year_change', { year: year });
  };

  window.trackFilterChange = function (filterName, enabled) {
    window.trackEvent('filter_change', { filter_name: filterName, enabled: !!enabled });
  };

  // action 예: 'zoom_in' | 'zoom_out' | 'drag'
  window.trackMapInteraction = function (action) {
    window.trackEvent('map_interaction', { action: action });
  };

  // ── 향후 확장용 스텁 (Atlas Analytics, v56에서 추가) ──
  // 지금은 어디서도 호출하지 않는다. 실제 기능(추천도서·자료실 카드
  // 클릭·영상·AI질문)이 생기면 해당 클릭 핸들러에서 호출하기만 하면
  // 되도록 이름과 파라미터 형태만 미리 잡아둔 것.
  window.trackBookClick = function (bookId, bookTitle) {
    window.trackEvent('book_click', { book_id: bookId, book_title: bookTitle });
  };
  window.trackArchiveOpen = function (seriesId, postId) {
    window.trackEvent('archive_open', { series_id: seriesId, post_id: postId || null });
  };
  window.trackVideoClick = function (videoId, videoTitle) {
    window.trackEvent('video_click', { video_id: videoId, video_title: videoTitle });
  };
  window.trackAIQuestion = function (question) {
    window.trackEvent('ai_question', { question_length: (question || '').length });
  };
  window.trackCardOpen = function (cardId, cardTitle) {
    window.trackEvent('card_open', { card_id: cardId, card_title: cardTitle });
  };

})();
