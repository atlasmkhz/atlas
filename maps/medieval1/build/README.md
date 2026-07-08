# SEO 정적 페이지 생성기 (중세1 / 고려 전용)

`generate_event_pages.py` — data/*.js(왕 파일 단위)를 읽어
`maps/medieval1/event/{slug}.html`을 만든다. medieval2(조선)의
생성기와 로직이 동일하며(같은 왕조 파일 구조를 쓰는 지도라 그대로
복제됨), 차이는 상수(경로·왕조 이름 "고려 (高麗)")뿐이다. 자세한 설계
배경은 `maps/medieval2/build/README.md` 참고 — 여기서 반복하지 않는다.

## 새 콘텐츠를 추가했을 때 할 일

1. `data/NN_이름.js` 파일 추가 또는 기존 파일에 카드 추가
2. (새 파일이면) `index.html`에 `<script>` 한 줄, `js/app.js`의 DATA
   조립 배열에 `EVENTS_이름` 한 줄 추가
3. `cd maps/medieval1/build && python3 generate_event_pages.py` 실행
4. `cd build && python3 generate_unified_sitemap.py` 실행 (사이트 루트)
5. ZIP 패키징

## 고려 특유의 주의사항 — 복위한 왕

충렬왕·충선왕·충숙왕·충혜왕은 폐위됐다가 복위해 재위가 두 구간으로
나뉜다. `js/reigns.js`의 REIGNS 배열엔 이런 왕이 `order`가 다른 별도
항목(1차/2차)으로 두 번 들어있고 `dynasty_no`로 동일 인물임을 표시해둔
것뿐이라, 이 생성기의 `find_reign()`은 손댈 필요가 없다 — 사건의
`year`가 어느 구간에 속하는지만 보고 자동으로 맞는 왕대를 찾는다.

같은 이유로 데이터 파일의 `EVENTS_*` 변수명도 동명이인(정종定宗/靖宗
등) 왕이 있을 때 `_GORYEO`, `2` 같은 접미사로 구분해뒀다 — 새로
추가할 때도 이 관례를 따를 것.

## 상태 (2026-07)

data/ 15개 왕 파일(REIGNS 38개 항목 중 15개 커버, 복위 세그먼트
포함), 카드 38건, event/ 38개 정적 페이지 생성 완료. sitemap.xml에
진입점 1개 + Event 38개 반영됨. "고려 전기"(태조~문종, 1~11번)까지
채워졌고, 무신정권 이후(12~24번: 순종~원종)와 원간섭기(25~34번:
충렬왕~공양왕, 일부만 시드 있음)가 남아있음. 루트(route) 기능은
아직 없음.
