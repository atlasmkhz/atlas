// ═══════════════════════════════════════════════════════
// mapShell.js — 정적 SEO 페이지(/event/*, /route/*)에서 지도 앱을
// "이식(hydrate)"하기 위한 공유 부트 스크립트.
//
// 설계 원칙(v63):
// - map.html은 그대로 둔다. mapShell.js는 map.html의 <head>
//   stylesheet 목록과 <body> 마크업·<script> 목록을 "그대로" 읽어와
//   현재 문서 위에 재생성한다. 즉 map.html이 바뀌면(스크립트 추가/제거,
//   CSS 캐시버스팅 파라미터 변경 등) mapShell.js는 손댈 필요가 없다 —
//   런타임에 map.html을 다시 읽어오기 때문에 항상 최신 상태를 따라간다.
// - location.href / location.replace를 쓰지 않는다. 페이지 이동이
//   전혀 일어나지 않으므로 canonical·JSON-LD·URL이 전부 그대로
//   유지된다 — /event/{slug}의 SEO 자산이 map.html의 범용 메타로
//   대체되는 일이 없다.
// - 호출하는 쪽(event 페이지)이 CTA 클릭 시에만 이 스크립트를
//   실행하므로, "정보만 보고 이탈하는" 방문자는 이 페이로드를
//   전혀 받지 않는다.
//
// 사용법 (호출 측 페이지):
//   <script src="/js/mapShell.js"></script>
//   ...
//   window.ATLAS_loadMapShell().then(() => {
//     map.invalidateSize();
//     navigateToEvent(eventId);   // 또는 openRoute(routeId) 등
//   });
//
// 중복 초기화 방지: 이미 로드가 끝났으면(window.__atlasMapLoaded===true)
// 또는 로드가 진행 중이면(내부 loadingPromise) 같은 프로미스/즉시
// resolve를 반환한다 — 버튼 연타·재호출로 스크립트가 두 번 삽입되거나
// map.html이 두 번 fetch되는 일은 없다.
// ═══════════════════════════════════════════════════════
(function () {
  'use strict';

  const MAP_SHELL_URL = new URL('/map.html', location.origin).href;

  // 여러 번 호출되어도(예: 사용자가 버튼을 연타) 네트워크 요청과
  // 스크립트 재실행이 한 번만 일어나도록 프로미스를 캐싱한다.
  let loadingPromise = null;

  function resolveUrl(attrValue) {
    // map.html 안의 상대경로("js/app.js" 등)는 반드시 map.html 위치
    // 기준으로 풀어야 한다 — 호출 측 페이지(/event/{slug})의 경로
    // 깊이가 달라도(추후 시대별 /maps/{era}/event/{slug} 등으로
    // 확장되어도) 항상 올바른 절대경로가 나오게 하기 위함이다.
    return new URL(attrValue, MAP_SHELL_URL).href;
  }

  function injectStylesheets(headEl) {
    const already = new Set(
      [...document.querySelectorAll('link[rel="stylesheet"]')]
        .map(l => l.href)
    );
    headEl.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      const href = resolveUrl(link.getAttribute('href'));
      if (already.has(href)) return;
      const clone = document.createElement('link');
      clone.rel = 'stylesheet';
      clone.href = href;
      document.head.appendChild(clone);
    });
  }

  function injectMarkup(bodyEl, mountId) {
    let mount = document.getElementById(mountId);
    if (!mount) {
      mount = document.createElement('div');
      mount.id = mountId;
      document.body.appendChild(mount);
    }
    const clone = bodyEl.cloneNode(true);
    clone.querySelectorAll('script').forEach(s => s.remove());
    mount.innerHTML = clone.innerHTML;
    return mount;
  }

  function collectScripts(headEl, bodyEl) {
    // map.html의 실제 로드 순서(<head> 스크립트 → <body> 스크립트)를
    // 그대로 보존한다. app.js가 window.onload에 의존하는 초기화 로직을
    // 갖고 있지만, 이 시점엔 호출 측 문서의 load 이벤트가 이미 오래
    // 전에 끝난 뒤이므로 그 핸들러는 실행되지 않는다 — 그래서 호출
    // 측에서 스크립트 로드가 끝난 뒤 map.invalidateSize()·
    // navigateToEvent()를 직접 호출해야 한다.
    return [...headEl.querySelectorAll('script'), ...bodyEl.querySelectorAll('script')];
  }

  function loadScriptsInOrder(scriptEls) {
    // 동적으로 만든 <script>는 기본적으로 async라 로드 완료 순서가
    // 뒤섞일 수 있다. async=false로 지정하면 "병렬로 내려받되 원래
    // 순서대로 실행"이 보장된다(HTML 표준 동작) — data/*.js가 app.js
    // 보다 먼저 실행돼야 하는 이 프로젝트에 필수적인 지점이다.
    //
    // 개별 스크립트 실패는 reject하지 않고 warning만 남긴다 — 예를
    // 들어 광고 차단기가 googletagmanager.com을 막아도(실사용자
    // 환경에서 흔함) 지도 자체는 정상적으로 뜨는 게 맞다. 진짜
    // 치명적인 실패(예: Leaflet 자체 로드 실패)는 loadMapShell()의
    // 후처리 검증에서 별도로 걸러 에러로 올린다.
    const promises = scriptEls.map(orig => new Promise((resolve) => {
      const tag = document.createElement('script');
      const src = orig.getAttribute('src');
      if (src) {
        tag.src = resolveUrl(src);
        tag.async = false;
        tag.onload = () => resolve();
        tag.onerror = () => {
          console.warn('[mapShell] 스크립트 로드 실패(무시하고 계속): ' + tag.src);
          resolve();
        };
        document.body.appendChild(tag);
      } else {
        // 인라인 스크립트(GA 초기화 등)는 즉시 실행하고 바로 resolve.
        // async=false 순서 보장은 src가 있는 스크립트에만 적용되므로,
        // 인라인 스크립트는 만나는 즉시 동기 실행해 순서를 지킨다.
        tag.textContent = orig.textContent;
        document.body.appendChild(tag);
        resolve();
      }
    }));
    return Promise.all(promises);
  }

  function ensureBaseHref() {
    // renderer.js의 popupHtml() 등은 heroImg.url("assets/images/...")
    // 같은 "상대경로"를 그대로 <img src="...">에 꽂아 넣는다. map.html이
    // 루트(/)에서 정상 로드될 땐 문제없지만, 이 문서(/event/{slug})는
    // 경로 깊이가 달라 그 상대경로가 /event/ 기준으로 풀려 404가 난다.
    // renderer.js를 고치는 대신(= map.html 쪽은 손대지 않는다는 원칙
    // 유지) <base>로 문서의 URL 해석 기준 자체를 사이트 루트로
    // 맞춘다 — CSS의 url()은 스타일시트 자신의 위치 기준으로 풀리는
    // 별도 규칙이라 애초에 영향받지 않는다.
    if (document.querySelector('base')) return;
    const base = document.createElement('base');
    base.href = new URL('/', location.origin).href;
    document.head.insertBefore(base, document.head.firstChild);
  }

  async function loadMapShell(opts) {
    const mountId = (opts && opts.mountId) || 'mapShellRoot';

    // 전역 플래그(window.__atlasMapLoaded) — 클로저 내부의 loadingPromise
    // 캐싱이 정상 케이스(같은 mapShell.js 인스턴스에서 버튼 연타)를
    // 이미 막아주지만, 이 플래그는 window 레벨의 명시적 이중 방어선이다
    // (예: 스크립트 태그가 실수로 두 번 삽입되는 경우에도 안전).
    if (window.__atlasMapLoaded) {
      return Promise.resolve(document.getElementById(mountId));
    }
    if (loadingPromise) return loadingPromise;

    loadingPromise = (async () => {
      ensureBaseHref();
      const res = await fetch(MAP_SHELL_URL, { credentials: 'same-origin' });
      if (!res.ok) throw new Error('map.html 로드 실패: HTTP ' + res.status);
      const html = await res.text();
      const parsed = new DOMParser().parseFromString(html, 'text/html');

      injectStylesheets(parsed.head);
      const mount = injectMarkup(parsed.body, mountId);

      // async=false 트릭은 <script>가 순서대로 "실행"되는 것만
      // 보장하지, 인라인 스크립트를 별도 배열로 만들면 그 실행이
      // src 스크립트들의 실행 완료를 기다려주지 않는다. 그래서
      // collectScripts()가 head→body 순서로 만든 배열을 그대로
      // document 순서에 맞게 하나씩 append한다(위 loadScriptsInOrder
      // 안에서 이미 원본 순서를 유지한 채 append됨).
      await loadScriptsInOrder(collectScripts(parsed.head, parsed.body));

      // 개별 스크립트 실패는 위에서 무시했지만, 지도 자체를 띄우는 데
      // 필수적인 Leaflet만은 별도로 확인한다 — 이게 없으면 이후
      // app.js/map.js가 전부 조용히 죽어있는 상태가 되므로, 여기서
      // 명확한 에러로 바꿔 호출 측의 catch()가 폴백 UI를 보여주게 한다.
      if (typeof window.L === 'undefined') {
        throw new Error('필수 리소스(Leaflet) 로드에 실패했습니다.');
      }

      window.__atlasMapLoaded = true;
      return mount;
    })();

    loadingPromise.catch(() => {
      // 실패하면 캐시를 비워 다음 시도(재시도 버튼/재클릭)가 처음부터
      // 다시 시도할 수 있게 한다 — 실패한 프로미스를 영구히 캐싱해
      // 재시도를 원천 차단하지 않도록.
      loadingPromise = null;
    });

    return loadingPromise;
  }

  window.ATLAS_loadMapShell = loadMapShell;
})();
