# content_status_report.md — 콘텐츠 준비 상태 보고서

이 보고서는 343건 전체 사건의 현재 `media_status`를 계산한 결과다.
계산 규칙은 `schema_v2.md` 4단계 참고. **이 보고서 생성을 위해 실제
데이터 파일은 수정하지 않았다** — `events.json`(이번 세션에서 추출한
읽기 전용 스냅샷)을 기준으로 계산한 결과만 보여준다.

## 1. 전체 요약

| media_status | 건수 | 비율 |
|---|---|---|
| empty | 296 | 86.3% |
| ready_image | 0 | 0.0% |
| ready_video | 47 | 13.7% |
| complete | 0 | 0.0% |
| **합계** | **343** | 100% |

## 2. content_priority=1 제안 (참조 5회 이상, 콘텐츠 작업 최우선 후보)

총 23건

| ID | 연도 | 유형 | 제목 | 현재 상태 | 참조 횟수 |
|---|---|---|---|---|---|
| movement_1919_02 | 1919 | movement | 3·1운동 — 거족적 독립만세운동 | ready_video | 17 |
| battle_1920_02 | 1920 | battle | 청산리 대첩 | ready_video | 8 |
| massacre_1921_01 | 1921 | massacre | 자유시 참변 (흑하사변) | ready_video | 8 |
| policy_1900_01 | 1900 | policy | 대한제국 — 자주의 마지막 빛 | empty | 7 |
| policy_1905_01 | 1905 | policy | 을사늑약 — 외교권을 빼앗기다 | ready_video | 7 |
| policy_1910_01 | 1910 | policy | 경술국치 — 한일병합조약 공포 | ready_video | 7 |
| political_1927_01 | 1927 | political | 신간회 창립 — 민족유일당 | empty | 7 |
| organization_1896_01 | 1896 | organization | 독립협회 창립 | empty | 6 |
| political_1919_01 | 1919 | political | 대한민국 임시정부 수립 | empty | 6 |
| battle_1920_05 | 1920 | battle | 독립군 밀산 집결 | ready_video | 6 |
| policy_1920_01 | 1920 | policy | 산미증식계획 시작 | empty | 6 |
| political_1923_03 | 1923 | political | 국민대표회의 결렬 | empty | 6 |
| policy_1938_01 | 1938 | policy | 국가총동원법 시행 | ready_video | 6 |
| policy_1945_01 | 1945 | policy | 일본 무조건 항복 — 8·15 광복 | empty | 6 |
| political_1882_01 | 1882 | movement | 임오군란 — 구식 군인의 봉기 | empty | 5 |
| massacre_1919_01 | 1919 | massacre | 제암리 학살 사건 | ready_video | 5 |
| battle_1920_01 | 1920 | battle | 봉오동 전투 | ready_video | 5 |
| massacre_1920_01 | 1920 | massacre | 간도 참변 (경신참변) | empty | 5 |
| person_1920_02 | 1920 | person | 김원봉 — 의열단 결성·지휘 | empty | 5 |
| political_1921_01 | 1921 | political | 임정 내분 — 이동휘 사임 | empty | 5 |
| political_1923_01 | 1923 | political | 조선혁명선언 발표 | ready_video | 5 |
| policy_1939_01 | 1939 | policy | 창씨개명령 공포 | ready_video | 5 |
| battle_1940_01 | 1940 | organization | 한국광복군 창설 | ready_video | 5 |

## 3. type별 분포

| type | empty | ready_image | ready_video | complete | 합계 |
|---|---|---|---|---|---|
| battle | 12 | 0 | 6 | 0 | 18 |
| international | 2 | 0 | 0 | 0 | 2 |
| massacre | 5 | 0 | 2 | 0 | 7 |
| migration | 6 | 0 | 3 | 0 | 9 |
| movement | 37 | 0 | 2 | 0 | 39 |
| organization | 26 | 0 | 7 | 0 | 33 |
| person | 57 | 0 | 14 | 0 | 71 |
| plot | 11 | 0 | 0 | 0 | 11 |
| policy | 57 | 0 | 9 | 0 | 66 |
| political | 65 | 0 | 4 | 0 | 69 |
| righteous | 18 | 0 | 0 | 0 | 18 |

## 4. 연도별 empty 비율 (콘텐츠 공백이 큰 구간 파악용)

| 연대 | empty | 전체 | empty 비율 |
|---|---|---|---|
| 1870s | 1 | 1 | 100% |
| 1880s | 15 | 15 | 100% |
| 1890s | 22 | 22 | 100% |
| 1900s | 28 | 30 | 93% |
| 1910s | 47 | 53 | 89% |
| 1920s | 107 | 129 | 83% |
| 1930s | 54 | 60 | 90% |
| 1940s | 22 | 33 | 67% |

## 5. 결론 및 다음 단계

- 현재 전체의 86.3%(296건)가 `empty` 상태 — 이는 "문제"가 아니라
  "사진 작업이 아직 시작되지 않은 정상 상태"를 보여준다.
- `ready_video` 47건은 이미 v1의 `video`/`related_content` 필드로 영상이
  연결되어 있던 사건들이다. v2 마이그레이션 시 이 47건이 그대로
  `content.videos`로 옮겨지면 즉시 "영상 자산이 있는 상태"를 유지한다.
- `ready_image`/`complete`가 0건인 것은 이미지 자산이 전무하다는 사실과
  정확히 일치 — 사진 작업이 시작되면 이 수치가 채워지기 시작할 것이다.
- content_priority=1 제안 10건은 사진/영상 작업을 시작할 때 가장 먼저
  검토할 후보 목록으로 활용 가능하다.