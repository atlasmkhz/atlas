# 정합성 작업 보고서 (report.md)

세션 작업 범위: README 정합화 → 코드/문서 점검 → 스키마 정규화 → 1920년 source 보강.
상세 변경 내역은 `CHANGELOG.md` 참고. 이 문서는 수치 검증 결과만 모은 것이다.

---

## 1. 수정 파일 목록

| 파일 | 변경 내용 |
|---|---|
| `README.md` | 기간/사건수/연도수 표기, World Layer 반영, MAP_MODE 상태 기술, 검증 통계 문구 갱신 |
| `js/map.js` | 주석/description만 수정 (코드 동작 변경 없음) — MAP_MODE 실태 반영 |
| `docs/schema.md` | type 10종 갱신, ID prefix 설명 추가, month 0-base 강조, `source_type` 필드 정의, 검증표 갱신 |
| `js/validator.js` | `validateMissingYears()` 기본값 수정, `validateEventTypes()`/`validateMonthRange()` 신규 추가 |
| `data/1880.js` | `institution_1880_01` type 수정 |
| `data/1884.js` | `plot_1884_01` month 정규화 (12→11) |
| `data/1920.js` | `righteous_1920_02`/`policy_1920_01` month 정규화, 31건 source 보강, 2건 `source_type` 부여 |
| `data/1921.js` | `policy_1921_02` month 정규화, 1건 `source_type` 부여 |
| `data/1923.js` | 1건 `source_type` 부여 |
| `data/1926.js` | `righteous_1926_01`/`person_1926_02` month 정규화 |
| `data/1928.js` | 1건 `source_type` 부여 |
| `data/1930.js` | 1건 `source_type` 부여 |
| `data/1931.js` | 1건 `source_type` 부여 |
| `data/1938.js` | 1건 `source_type` 부여 |
| `data/1942.js` | `policy_1942_01` type 수정 (massacre→policy), tags 동기화 |
| `data/1945.js` | 1건 `source_type` 부여 |
| `CHANGELOG.md` | 신규 생성 (이번 세션 변경 내역) |
| `report.md` | 신규 생성 (본 문서) |

변경 없는 파일: `index.html`, `css/style.css`, `js/app.js`, `js/renderer.js`, `js/timeline.js`,
`js/ui.js`, `js/historicalLabels.js`, `places/places_min.js`, `data/world_events.js`,
`data/world_context.js`, `docs/architecture.md`, `docs/changelog.md`, `docs/roadmap.md`,
나머지 62개 연도 데이터 파일.

---

## 2. 변경 전/후 수치

| 항목 | 변경 전 | 변경 후 |
|---|---|---|
| README 표기 기간 | 1920~1945 (26년) | 1876~1945 (70년) |
| README 표기 사건 수 | 197개 | 338개 |
| 실제 데이터 사건 수 | 338개 (변동 없음) | 338개 |
| 실제 연도 파일 수 | 64개 (변동 없음) | 64개 |
| 스키마 정의 type 수 | 9종 | 10종 (`international` 추가) |
| 스키마 외 type 사용 | 3건 (`institution`×1, `international`×2) | 0건 |
| ID prefix ≠ type | 23건 | 22건 (1건만 실오류로 판명되어 수정, 나머지는 의도된 명명임을 schema.md에 문서화) |
| month 범위 오류(12 사용) | 6건 | 0건 |
| `validateMissingYears` 기본 검사 범위 | 1900~1945 (실제 범위와 불일치) | 1876~1945 (일치) |
| 1920년 source 보유 | 3/34 (9%) | 34/34 (100%) |
| 전체 source 보유 | 307/338 (90.8%) | 338/338 (100%) |
| `source_type` 필드 | 없음 | 9건에 `'disputed'` 부여, schema.md에 정의 |
| 끊어진 connections | 0건 (변동 없음) | 0건 |
| 중복 ID | 0건 (변동 없음) | 0건 |
| 고유 인물 수 | 147명 (변동 없음) | 147명 |
| MAP_MODE 코드-주석 일치 여부 | 불일치 (코드는 world, 주석은 legacy라 기술) | 일치 (world 활성화·미검증으로 통일 기술) |

---

## 3. 검증 결과 (수정 후 재실행)

```
총 사건 수: 338
스키마 외 type: 없음
month 범위 밖(0~11): 없음
연도 범위: 1876 ~ 1945
source 보유: 338/338 (100.0%)
1920년 source 보유: 34/34 (100%)
source_type='disputed' 표시된 사건: 9건
중복 ID: 없음
끊어진 connections: 0건
고유 인물 수: 147명 (삭제 없음)
64개 연도 파일 전체 구문(node --check) 통과
```

---

## 4. 남은 이슈 (다음 작업으로 미룬 것)

1. **MAP_MODE world 모드의 브라우저 실측 미검증** — cartocdn.com 네트워크 제약으로
   이 작업 환경에서 `dark_nolabels` 타일이 실제로 깨끗하게 렌더링되는지 확인하지 못함.
   README 7번에 정확히 "활성화됨, 미검증"으로 기록해 두었으나, 실사용 전 직접 브라우저에서
   줌 레벨 2~11 전체를 한 번 확인하는 것을 권장.

2. **ID prefix와 type 불일치 22건은 의도적으로 유지** — 참조 무결성(connections) 보호를
   위해 ID를 바꾸지 않기로 결정했고, schema.md에 그 근거를 설명해 두었다. 다만 신규
   사건을 추가할 때는 ID를 정할 때 type과 일치시키는 습관이 필요하다(스키마에 명시함).

3. **`source_type='disputed'`는 데이터에만 존재, UI에는 아직 미반영** — 현재 팝업/필터
   UI는 이 필드를 읽지 않는다. README 6번(미구현 기능)에 "사실/해석/논쟁 4단 분리 구조"
   항목으로 이미 기록되어 있던 것과 같은 계열의 작업이며, 이번 세션에서는 데이터 레벨
   준비만 했다. 향후 배지·필터 UI를 추가하려면 `validator.js`나 `renderer.js`에 새 로직이
   필요하다.

4. **1920년 source 보강 31건의 출처는 모두 사건명 단위 검증**이며, 문장 단위 인용 대조는
   하지 않았다. 즉 "이 사건이 실재하고 이 출처들이 그 사건을 다룬다"는 확인이지,
   summary_ko 문장 하나하나가 그 출처와 정확히 일치하는지까지 대조한 것은 아니다.
   추가로 엄밀한 검증이 필요하면 사건별로 별도 작업이 필요하다.

5. **다른 연도(1920·1921·1923·1928·1930·1931·1938·1945 외)에도 미표시 disputed 사건이
   있을 수 있음** — 이번 세션에서는 summary_ko 텍스트에 "논쟁/이견/학계" 등 명시적 키워드가
   있는 사건만 스캔했다. 키워드 없이 암묵적으로 논쟁적인 사건(예: 특정 인물의 친일/항일
   경계가 불분명한 경우 등)은 포함되지 않았을 수 있다.
