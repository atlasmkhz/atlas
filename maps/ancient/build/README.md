# SEO 정적 페이지 생성기 (고대 / 삼국~남북국시대 전용)

`generate_event_pages.py` — data/block*.js(블록 단위)를 읽어
`maps/ancient/event/{slug}.html`을 만든다. medieval1·2 생성기와
로직은 거의 동일하지만(자체 내장·독립 실행 방식 포함), 이 지도만의
차이가 두 가지 있다:

1. **왕대(REIGNS) 대신 블록(BLOCKS)** — 고대는 고구려·백제·신라·가야·
   발해 등 여러 나라가 동시에 존재해 "왕 하나 = 챕터 하나"가 성립하지
   않는다. 그래서 `js/blocks.js`의 BLOCKS 배열("역사적 전환점으로
   나눈 시기")을 파싱해 브레드크럼을 만든다.
2. **기원전 연도** — id는 `political_bc37_01`처럼 `bc` 접두사, 실제
   `year` 필드는 음수(-37)를 쓴다. 슬러그도 `bc37-founding-of-goguryeo`
   형태로 맞춰서 만든다(`format_year_for_slug()`). 브레드크럼·본문
   날짜 표기는 "기원전 37년"처럼 사람이 읽기 좋게 변환한다
   (`format_year_display()`).

## 새 콘텐츠를 추가했을 때 할 일

1. `data/blockN.js` 파일 추가(또는 기존 파일에 카드 추가). 카드에는
   다른 지도에 없는 `nation` 필드(goguryeo/baekje/silla/gaya/balhae/
   hubaekje/taebong/goryeo 중 하나, `js/app.js`의 NATION_LABEL 참고)가
   반드시 있어야 한다.
2. (새 파일이면) `index.html`에 `<script>` 한 줄 — `js/app.js`의 DATA
   조립 배열엔 이미 block1~8 전부가 `typeof` 방어 코드로 등록돼
   있으므로(비어있는 블록도 빈 배열로 처리됨) 보통 이 단계는 필요
   없다.
3. `cd maps/ancient/build && python3 generate_event_pages.py` 실행
4. `cd build && python3 generate_unified_sitemap.py` 실행 (사이트 루트)
5. ZIP 패키징

## 상태 (2026-07)

data/ 8개 블록 파일(block1~8 전부 존재), 카드 35건, event/ 35개 정적
페이지 생성 완료. sitemap.xml에 진입점 1개 + Event 35개 반영됨.
블록6(남북국 전성기, 676~828)이 152년으로 가장 길고 카드도 가장
많다(8건) — 신라 중대 전성기와 발해 무왕·문왕·선왕을 아우름.
루트(route) 기능은 아직 없음.

## 발견한 기존 데이터 오류 (수정함)

block2.js의 장수왕 카드가 존재하지 않는 카드 ID(`political_475_01`)를
참조하고 있었다 — 실제로는 `battle_475_01`(한성 함락)이어야 했다.
이번에 바로잡았다. 앞으로 데이터를 추가할 때도 `connections` 필드는
반드시 실제 존재하는 카드 ID를 참조하는지 확인할 것 — 이 생성기는
끊긴 링크를 자동으로 검증하지 않으므로(사이트 자체의 `validator.js`가
런타임에 검증한다), 배포 전 `python3 -c "..."` 같은 간단한 스크립트로
전체 data/ 폴더를 스캔해 확인하는 습관을 들이는 게 안전하다.
