// ═══════════════════════════════════════════════════════
// mapShell.js — 정적 SEO 페이지(/event/*, /route/*, /maps/{era}/event/*)에서
// 지도 앱을 "이식(hydrate)"하기 위한 공유 부트 스크립트.
// 모든 지도(근대 map.html, 중세2 maps/medieval2/index.html, 이후 추가될
// 다른 시대 지도)에서 동일하게 재사용한다 — 파일은 하나뿐이다.
//
// 설계 원칙(v63, v64에서 다중 지도 지원으로 일반화):
// - 대상 지도 파일(map.html 등)은 그대로 둔다. mapShell.js는 그 <head>
//   stylesheet 목록과 <body> 마크업·<script> 목록을 "그대로" 읽어와
//   현재 문서 위에 재생성한다. 즉 대상 지도의 스크립트 목록이 바뀌어도
//   (추가/제거, 캐시버스팅 파라미터 변경 등) mapShell.js는 손댈 필요가
//   없다 — 런타임에 다시 읽어오기 때문에 항상 최신 상태를 따라간다.
// - location.href / location.replace를 쓰지 않는다. 페이지 이동이
//   전혀 일어나지 않으므로 canonical·JSON-LD·URL이 전부 그대로
//   유지된다 — SEO 페이지의 자산이 지도 파일의 범용 메타로 대체되는
//   일이 없다.
// - 호출하는 쪽(event 페이지)이 CTA 클릭 시에만 이 스크립트를
//   실행하므로, "정보만 보고 이탈하는" 방문자는 이 페이로드를
//   전혀 받지 않는다.
//
// 사용법 (호출 측 페이지):
//   <script src="/js/mapShell.js"></script>
//   ...
//   // shellUrl을 안 넘기면 기본값 '/map.html'(근대 지도) — 기존
//   // 366개 이벤트 페이지는 이 기본값에 의존하므로 절대 바꾸지 않는다.
//   window.ATLAS_loadMapShell({ shellUrl: '/maps/medieval2/index.html' })
//     .then(() => {
//       map.invalidateSize();
//       navigateToEvent(eventId);   // 또는 openRoute(routeId) 등
//     });
//
// 새 시대 지도를 추가할 때 이 파일에서 고칠 것은 없다 — 각 지도의
// generate_event_pages.py가 만드는 하이드레이션 스니펫에서 그 지도의
// shellUrl만 정확히 넘기면 된다.
//
// 중복 초기화 방지: shellUrl별로 로드 상태를 캐싱한다(같은 페이지가
// 이론상 여러 shellUrl을 순차적으로 열 가능성까지 대비). 이미 로드가
// 끝난 shellUrl이면 즉시 resolve, 진행 중이면 같은 프로미스를
// 반환한다 — 버튼 연타·재호출로 스크립트가 두 번 삽입되거나 지도
// 파일이 두 번 fetch되는 일은 없다.
// ═══════════════════════════════════════════════════════
(function () {
  'use strict';

  const DEFAULT_SHELL_URL = '/map.html';

  // shellUrl(절대경로 문자열) → { promise, loaded } 캐시.
  window.__atlasMapShells = window.__atlasMapShells || {};

  function resolveUrl(attrValue, baseUrl) {
    return new URL(attrValue, baseUrl).href;
  }

  function injectStylesheets(headEl, baseUrl) {
    const already = new Set(
      [...document.querySelectorAll('link[rel="stylesheet"]')]
        .map(l => l.href)
    );
    headEl.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      const href = resolveUrl(link.getAttribute('href'), baseUrl);
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
    return [...headEl.querySelectorAll('script'), ...bodyEl.querySelectorAll('script')];
  }

  function loadScriptsInOrder(scriptEls, baseUrl) {
    const promises = scriptEls.map(orig => new Promise((resolve) => {
      const tag = document.createElement('script');
      const src = orig.getAttribute('src');
      if (src) {
        tag.src = resolveUrl(src, baseUrl);
        tag.async = false;
        tag.onload = () => resolve();
        tag.onerror = () => {
          console.warn('[mapShell] 스크립트 로드 실패(무시하고 계속): ' + tag.src);
          resolve();
        };
        document.body.appendChild(tag);
      } else {
        tag.textContent = orig.textContent;
        document.body.appendChild(tag);
        resolve();
      }
    }));
    return Promise.all(promises);
  }

  function ensureBaseHref() {
    if (document.querySelector('base')) return;
    const base = document.createElement('base');
    base.href = new URL('/', location.origin).href;
    document.head.insertBefore(base, document.head.firstChild);
  }

  async function loadMapShell(opts) {
    const shellUrl = new URL((opts && opts.shellUrl) || DEFAULT_SHELL_URL, location.origin).href;
    const mountId = (opts && opts.mountId) || 'mapShellRoot';

    const cache = window.__atlasMapShells[shellUrl] || (window.__atlasMapShells[shellUrl] = {});

    if (cache.loaded) {
      return Promise.resolve(document.getElementById(mountId));
    }
    if (cache.promise) return cache.promise;

    cache.promise = (async () => {
      ensureBaseHref();
      const res = await fetch(shellUrl, { credentials: 'same-origin' });
      if (!res.ok) throw new Error('지도 파일 로드 실패: HTTP ' + res.status + ' (' + shellUrl + ')');
      const html = await res.text();
      const parsed = new DOMParser().parseFromString(html, 'text/html');

      injectStylesheets(parsed.head, shellUrl);
      const mount = injectMarkup(parsed.body, mountId);

      await loadScriptsInOrder(collectScripts(parsed.head, parsed.body), shellUrl);

      if (typeof window.L === 'undefined') {
        throw new Error('필수 리소스(Leaflet) 로드에 실패했습니다.');
      }

      cache.loaded = true;
      return mount;
    })();

    cache.promise.catch(() => {
      cache.promise = null;
    });

    return cache.promise;
  }

  window.ATLAS_loadMapShell = loadMapShell;
})();
