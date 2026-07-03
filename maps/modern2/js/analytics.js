// ═══════════════════════════════════════════════════════
// analytics.js — GA4 SPA 트래킹 헬퍼
//
// ATLAS는 SPA(오버레이 기반)라 URL이 바뀌지 않는다. index.html의
// gtag 부트스트랩에서 send_page_view:false로 자동 페이지뷰를 꺼뒀으므로,
// 화면이 실질적으로 바뀌는 시점마다 이 파일의 trackPageView()를
// 명시적으로 호출해야 GA4에 방문 흐름이 잡힌다.
//
// 호출 시점(작업지시서 v56 기준 4곳):
//   - 시대 이동   : nav.js, era-hub 카드 클릭
//   - 자료실 이동 : nav.js, 자료실 허브에서 시리즈(글 목록) 진입
//   - 루트 이동   : routeRenderer.js, renderRoute()
//   - 사건 카드   : renderer.js, openInfoPanel(popupHtml(e)) 직전
//
// 이 파일은 GA4 관련 코드를 한 곳에서 관리하기 위한 자리다 — 나중에
// Measurement ID를 바꾸거나 커스텀 이벤트를 늘릴 때 여기만 보면 된다.
// (단, gtag.js 로더 스크립트와 dataLayer 초기화 자체는 index.html의
//  <head>에 그대로 둔다 — 최대한 빨리 로드되어야 하는 스크립트라서
//  다른 js 파일들과 같은 자리(</body> 직전)로 옮기지 않았다.)
// ═══════════════════════════════════════════════════════

(function () {

  function gtagReady() {
    return typeof window.gtag === 'function';
  }

  // page_type 예: 'era' | 'route' | 'archive_hub' | 'archive' | 'card' | 'world_event'
  // page_name 예: 'modern2', 'kim_won_bong', 'historical_revisionism', '식민지 근대화론'
  window.trackPageView = function (pageType, pageName) {
    if (!gtagReady()) return;
    window.gtag('event', 'page_view', {
      page_title: pageName || pageType,
      page_location: window.location.href,
      // SPA라 실제 URL은 안 바뀌므로, GA4 리포트에서 화면을 구분할 수 있게
      // page_path에 화면 종류를 붙여넣는다(실제 네트워크 요청 경로는 아님).
      page_path: window.location.pathname + '#' + pageType + (pageName ? ':' + pageName : ''),
      atlas_page_type: pageType,
    });
  };

  window.trackEvent = function (name, params) {
    if (!gtagReady()) return;
    window.gtag('event', name, params || {});
  };

  // ── 향후 확장용 스텁 (Atlas Analytics) ──────────────────────────
  // 작업지시서 v56 · 작업10: 지금은 아무 데서도 호출하지 않는다.
  // 추천도서/자료실 카드 클릭/영상/AI 질문 기능이 실제로 생기면,
  // 해당 클릭 핸들러에서 이 함수들을 호출하기만 하면 되도록 이름과
  // 파라미터 형태만 미리 잡아둔 것 — 지금 당장 동작을 바꾸지 않는다.
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
