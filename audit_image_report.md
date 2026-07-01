# ATLAS 이미지 시스템 안정화 v2.0 — 최종 검증 보고서

작업 범위: 구조 정리만 수행 (이미지 재추출/재생성/재매핑 없음, Numbers 재파싱 없음)
대상 프로젝트: chronicle_731_gando_update.zip (731부대/간도특설대 데이터 7건 포함, 1876~1945, 총 350카드)

---

## 1. 핵심 지표

| 항목 | 수치 |
|---|---|
| total_cards | 350 |
| hero_count | 145 |
| gallery_count | 21 (4개 카드에 분포) |
| cards_without_image (의도된 정상 상태) | 205 |
| missing_files (data가 가리키는데 디스크에 없는 파일) | 0 |
| unused_files (assets/images 안의 미참조 파일) | 2 — 둘 다 정상(.gitkeep, og-image.jpg) |
| mobile_render_fail | 0 |
| desktop_render_fail | 0 |
| legacy 중복 파일 (이동 완료, 더 이상 assets/images에 없음) | 146 |

---

## 2. 감사(Audit) 결과 — 무엇이 실제 문제였는가

### 발견 1: assets/images/people, assets/images/events — 순수 중복 디렉토리
`assets/images/entity/person`(63개)과 `assets/images/entity/event`(83개)와
**파일명·바이트까지 완전히 동일한 사본**이 `assets/images/people`,
`assets/images/events`에 따로 존재했다. `data/*.js`는 전부 `entity/` 경로만
참조하므로 이 146개(약 22MB)는 어디서도 읽히지 않는 죽은 파일이었다.

→ 사용자 확정 방침에 따라 **삭제하지 않고** `assets/legacy_unused/people`,
`assets/legacy_unused/events`로 이동. 참조 코드는 처음부터 없었으므로
이동 후 깨진 링크 0건.

### 발견 2: `.pop-gallery`가 정보창(infoPanel) 좌우 여백 규칙에서 빠져 있었음
`.info-scroll > .pop-type/.pop-title/...` 목록에 `.pop-gallery`만 빠져 있어
정보창(Bottom Sheet/Right Panel) 안에서 갤러리 그리드가 패널 가장자리까지
붙어 표시되는 비일관성이 있었다(이미지가 "안 보이는" 것은 아니고, 다른
섹션과 여백이 다른 시각적 비일관성).

→ 다른 형제 요소와 동일하게 margin-left/right:18px를 적용해 통일.
(처음 시도에서 padding+width:100%를 추가로 더해 패널 밖으로 넘치는 회귀가
발생했고, Playwright 재검증으로 즉시 발견·롤백해 margin만 쓰는 형태로 고정함.)

### 발견 3: `related_content` 필드 — 이미지가 아니라 영상 링크였음
7개 카드(policy_1905_01, policy_1907_01, policy_1910_01, person_1927_02,
policy_1931_01, policy_1938_01, policy_1939_01)에 `related_content` 필드가
있었으나, 내용은 이미지가 아니라 `category:'creator_commentary'` 형태의
유튜브 해설 영상 링크였다. 렌더러는 이 필드를 읽지 않으므로 현재 화면에
노출되지 않는다. **이미지 파이프라인과는 무관**하지만, 죽은 데이터로
남아 있다는 점은 참고용으로 기록한다(이번 작업 범위 밖, 별도 처리 필요시
안내 요청).

### 발견 4: 731부대/간도특설대 7개 신규 카드 — 의도적으로 이미지 없음
organization_1936_01, organization_1938_01, massacre_1939_01/02,
person_1943_01/02, international_1945_01 — `content` 필드 자체가 없는
상태(이전 작업 리포트인 `report_731_gando.md`에 "사용자 제공 이미지가
없으므로 비워 두었다"고 명시됨). 사용자 확정에 따라 **이번 작업에서도
이미지를 추가하지 않고 현재 상태 유지**. 렌더러 검증 결과 빈 이미지
박스나 placeholder 없이, 곧바로 타입 배지부터 정상 표시됨.

---

## 3. 수행한 변경 사항 (구조 정리만, 이미지 자체는 무변경)

1. `css/style.css` — `.info-scroll` 안 마진 규칙에 `.pop-gallery` 추가,
   `margin-bottom:16px; overflow:hidden` 보강 (다른 형제 요소와 동일하게
   margin만 사용, padding/width 중복 추가 없음 — 1차 시도에서 발견된
   overflow 회귀를 반영해 최종본에서 제거함).
2. `assets/images/people/`, `assets/images/events/` →
   `assets/legacy_unused/people/`, `assets/legacy_unused/events/` 이동
   (146개 파일, 약 22MB). 참조 코드 없었으므로 이동 후 영향 없음.
3. `assets/images/places/` (빈 디렉토리, 참조 0건) 제거.
4. 데이터(`data/*.js`), 렌더러(`js/renderer.js`), `infoPanel.js`,
   이미지 파일 자체는 변경하지 않음.

renderer.js의 우선순위(`content.hero → content.gallery → e.image →
legacy fallback`), AI 표기 방식(작은 회색 글씨, 배지/아이콘 없음),
onerror 시 조용히 숨김, object-fit:contain 크롭 금지 원칙은 이미
기존 코드가 작업지시서 v2.0 요구사항을 충족하고 있어 **수정 불필요**.

---

## 4. 검증 방법 및 결과

Playwright(Chromium)로 1440×900(데스크톱), 390×844(모바일) 두 뷰포트에서
hero 또는 gallery를 가진 145개 카드 전체를 `navigateToEvent()`로 열어
`<img>.complete && naturalWidth > 0`를 확인.

| 뷰포트 | 성공 | 전체 |
|---|---|---|
| 데스크톱 (1440×900) | 145 | 145 |
| 모바일 (390×844) | 145 | 145 |

같은 카드(policy_1905_01, 을사늑약)를 두 뷰포트에서 열어 비교한 결과:
- hero 이미지 1장, gallery 4장(을사오적 인물 사진) — 양쪽 동일
- AI 생성 표기("※ AI 생성 이미지") — 양쪽 동일 위치·문구
- 카드 섹션 순서(대표사진→설명→인물→관련사건→갤러리→영상) — 양쪽 동일
- 갤러리 영역이 패널 좌우 경계를 벗어나는지(overflow) — 양쪽 모두 벗어나지 않음(수정 후)

※ 검증 환경 네트워크 제약으로 Leaflet/지도 타일(CDN)을 로컬로 임시
대체해 검증했으며, 이는 검증용 사본(`/home/claude/work/verify_copy`)에만
적용했고 실제 제출 프로젝트(`chronicle/`)의 `index.html`은 원본 CDN
경로를 그대로 유지함.

---

## 5. 완료 조건 충족 여부

| 완료 조건(v2.0) | 충족 |
|---|---|
| 같은 카드를 데스크톱/모바일에서 열었을 때 이미지 개수·순서·AI 표기가 전부 동일 | ✅ |
| 이미지 자체(파일)는 변경하지 않음 | ✅ — 294개 원본 파일 전부 무변경, 해시 동일 |
| Numbers 재파싱 없음 | ✅ |
| content 삭제/교체, gallery 삭제, 경로 재생성, 파일명 변경, webp 재인코딩 없음 | ✅ |
| 731부대/간도특설대 카드 이미지 임의 생성 없음 | ✅ — 현재 상태(이미지 없음) 그대로 유지 |
| 레거시(people/events) 삭제하지 않고 legacy_unused로 이동 | ✅ |

---

## 6. 참고 — 이번 작업 범위에 포함하지 않은 사항

- `related_content`(영상 링크, 7건)는 렌더러가 읽지 않는 죽은 데이터.
  이미지와 무관하므로 이번 작업에서 손대지 않았음. 필요 시 별도 작업으로
  진행 가능.
- `assets/images/entity/place`는 현재 빈 폴더(place 타입 이미지 없음).
  구조 자체는 유지했으며, 향후 place 이미지 추가 시 그대로 사용 가능.
