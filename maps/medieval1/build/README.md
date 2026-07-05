# SEO 정적 페이지 생성기 — 아직 없음

이 지도(중세1, 고려)는 아직 시드 데이터(왕별 몇 건)만 있는 스캐폴드
단계라 SEO 정적 페이지 생성기를 만들지 않았습니다. contemporary/
modern2가 쓰는 generate_event_pages.py는 "연도 파일 하나씩" 구조를
가정하는데, 이 지도는 "왕 파일 하나씩" 구조(data/*.js가 EVENTS_왕이름을
export)라 그대로 재사용할 수 없습니다.

콘텐츠가 어느 정도 쌓이면(대략 왕조당 수십~수백 건 단위), 이 구조에
맞는 새 generate_event_pages.py를 작성하고 통합 sitemap.xml에도
반영해야 합니다 — 지금 시드 카드 6개만으로는 만들 가치가 낮아 보류.
