# SEO 정적 페이지 생성기 (중세2 / 조선 전용)

`generate_event_pages.py` — data/*.js(왕 파일 단위)를 읽어
`maps/medieval2/event/{slug}.html`을 만든다.

## 근대 지도 생성기(`build/generate_event_pages.py`)와 다른 점

근대(1876~1945)는 "연도 파일 하나씩"(data/1876.js 등) 구조를 가정하지만,
이 지도는 "왕 파일 하나씩"(data/01_taejo.js → EVENTS_TAEJO 등) 구조라
그대로 재사용할 수 없어서 별도 스크립트로 분리했다.

또한 근대 생성기가 의존하는 `generate_slugs.py` / `era_breadcrumb.py`는
이 프로젝트 배포본에 포함돼 있지 않다(별도 빌드 환경에만 존재). 그래서
이 스크립트는 슬러그 생성과 브레드크럼 로직을 **자체 내장**해 완전히
독립적으로 실행된다 — `maps/medieval2/build/` 밖의 어떤 파일에도
의존하지 않는다.

## 새 콘텐츠를 추가했을 때 할 일 (이게 핵심)

1. `data/NN_이름.js` 파일 추가 또는 기존 파일에 카드 추가
2. (새 파일이면) `index.html`에 `<script src="data/NN_이름.js">` 한 줄,
   `js/app.js`의 DATA 조립 배열에 `EVENTS_이름` 한 줄 추가 — 이건 지도
   자체를 위한 필수 작업이고 SEO와 무관하게 항상 해야 한다.
3. `cd maps/medieval2/build && python3 generate_event_pages.py` 실행
   — data/ 폴더와 js/reigns.js를 다시 스캔해서 event/ 전체를
   재생성한다(기존 파일은 지우고 새로 씀 — 삭제된 카드의 낡은 페이지가
   안 남는다).
4. `cd build && python3 generate_unified_sitemap.py` 실행 (사이트
   루트의 build/) — medieval2/event/의 최신 상태를 sitemap.xml에 반영.
5. ZIP 패키징(ATLAS ZIP 규칙대로 루트 폴더명은 `atlas`).

**왕대(REIGNS) 자체를 새로 추가/변경할 때**는 `js/reigns.js`의 REIGNS
배열만 정확하면 된다 — 이 생성기는 그 배열을 런타임에 파싱해서
브레드크럼("{왕대}({기간})")을 만들기 때문에, 별도로 손댈 코드가 없다.

## 지도 하이드레이션(mapShell.js)과의 연결

`js/mapShell.js`(사이트 루트, 모든 지도가 공유)는 v64부터 `shellUrl`
파라미터를 받는다. 이 생성기가 만드는 각 이벤트 페이지는
`window.ATLAS_loadMapShell({ shellUrl: '/maps/medieval2/index.html' })`
형태로 호출하도록 하드코딩돼 있다 — 근대 이벤트 페이지가 쓰는 기본값
(`/map.html`)과 다른 지도이기 때문이다. mapShell.js 자체는 절대 고칠
필요가 없다(어떤 지도든 그 지도의 `<head>`/`<body>`/`<script>`를 그대로
읽어와 재생성하는 범용 로직이라서).

## 상태 (2026-07)

data/ 26개 왕 파일, 카드 126건, event/ 126개 정적 페이지 생성 완료.
sitemap.xml에 진입점 1개 + Event 126개 반영됨. 루트(route) 기능은
아직 없음 — 필요해지면 근대 지도의 `generate_route_pages.py`를
참고해 이 폴더에 별도로 만들 것(마찬가지로 왕 파일 구조에 맞게).
