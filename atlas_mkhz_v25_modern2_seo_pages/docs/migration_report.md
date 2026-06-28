# migration_report.md — v1 → v2 마이그레이션 시뮬레이션

**이번 세션에서는 343건의 실제 데이터 파일(`data/*.js`)을 수정하지 않았다.** 이
문서는 "v2 스키마를 실제로 적용하면 어떤 일이 벌어지는가"를 사전에 시뮬레이션한
결과이며, 다음 세션에서 실제 마이그레이션을 수행할 때의 작업 계획서 역할을 한다.
(지시서 7단계 "사건 추가 금지 / 인물 추가 금지"와 "구조 설계만 수행"을 지키기 위해,
실 데이터 파일에는 어떤 수정도 가하지 않았다 — `data/` 폴더는 1차·2차 작업 시점
그대로다.)

---

## 1. 현재 데이터의 미디어 필드 사용 현황 (343건 전수 조사)

| v1 필드 | 사용 건수 | 비고 |
|---|---|---|
| `image` | 0건 | 코드(`renderer.js`)에는 지원 로직이 있으나 실제 데이터에는 단 1건도 채워진 적이 없다 |
| `video` (단일 유튜브 ID 문자열) | 43건 | 가장 많이 쓰인 미디어 필드 |
| `related_content` (영상 배열, `category:'creator_commentary'`) | 7건 | 전부 영상이고, 전부 같은 유튜브 영상(`9xFuCmdf1Mk` 등 4개 영상)을 여러 사건에서 재사용 |

→ **결론: 지금 당장 마이그레이션해야 할 실제 미디어 자산은 영상 43+7=50건 뿐이고,
이미지는 0건이다.** 이는 "사진 작업이 아직 시작되지 않았다"는 프로젝트 현황과
정확히 일치하며, 이번 구조 개편이 시점상 적절했음을 보여준다.

## 2. media_status 시뮬레이션 (v1 → v2 필드 계산 적용)

`schema_v2.md` 4단계의 계산 규칙을 343건 전체에 적용한 결과:

| media_status | 건수 | 비율 |
|---|---|---|
| `empty` | 296건 | 86.3% |
| `ready_image` | 0건 | 0% |
| `ready_video` | 47건 | 13.7% |
| `complete` | 0건 | 0% |

type별 분포(상세):

| type | empty | ready_video |
|---|---|---|
| political | 65 | 4 |
| person | 57 | 14 |
| policy | 57 | 9 |
| movement | 37 | 2 |
| organization | 26 | 7 |
| righteous | 18 | 0 |
| battle | 12 | 6 |
| plot | 11 | 0 |
| migration | 6 | 3 |
| massacre | 5 | 2 |
| international | 2 | 0 |

`person` 타입이 영상 보유 비율이 가장 높다(57+14건 중 14건, 약 20%) — 인물 해설
영상이 상대적으로 많이 연결되어 있다는 뜻이다.

## 3. 필드별 마이그레이션 규칙 (다음 세션 적용 예정, 이번 세션 미적용)

### 3-1. `image` (0건) → `content.hero`
영향받는 사건 없음(데이터가 없으므로). 코드 레벨에서 `content.hero` 읽기 로직을
추가할 때 `e.image`도 fallback으로 같이 읽도록 하면 하위호환이 유지된다.

### 3-2. `video` (43건) → `content.videos[0]`
```js
// 변환 전 (v1)
{ video: 'IthyNGuvybk', ... }

// 변환 후 (v2, 시뮬레이션)
{
  video: 'IthyNGuvybk',  // v1 필드는 deprecated 표시만, 제거하지 않음
  content: {
    videos: [
      { id:'vid_auto_001', youtube_id:'IthyNGuvybk', video_type:'archive',
        title:'', caption:'', credit:'', duration_sec:null }
    ]
  }
}
```
`video_type` 기본값을 `archive`로 둘지 `youtube`로 둘지는 영상의 실제 성격에
따라 건별로 검토가 필요하다(예: 봉오동 전투의 `IthyNGuvybk`가 제작자 자체 콘텐츠인지
아카이브 영상인지는 이번 세션에서 확인하지 않았다 — 다음 세션 작업 항목).

### 3-3. `related_content` (7건, 전부 `creator_commentary`) → `content.videos`
```js
// 변환 전 (v1)
related_content: [
  { type:'video', category:'creator_commentary',
    title:'관련 영상 — 제작자 해설: 친일 인물과 국권 상실',
    url:'https://youtu.be/9xFuCmdf1Mk' }
]

// 변환 후 (v2, 시뮬레이션)
content: {
  videos: [
    { id:'vid_auto_002', youtube_id:'9xFuCmdf1Mk', video_type:'youtube',
      title:'관련 영상 — 제작자 해설: 친일 인물과 국권 상실',
      caption:'', credit:'제작자 해설', duration_sec:null }
  ]
}
```
`category:'creator_commentary'` → `video_type:'youtube'` 매핑은 `schema_v2.md`
5번 표에 정의된 그대로다.

**주의**: `video`와 `related_content`가 동시에 존재하는 사건이 있는지 확인 필요.
조사 결과 동시 보유 사건 0건(아래 4번 교차 확인) — 즉 한 사건에 영상이 최대
1개씩만 연결되어 있어, `content.videos` 배열에는 항목이 최대 1개씩만 들어가는
상태로 마이그레이션이 시작된다(향후 추가는 자유롭게 가능).

## 4. 교차 확인 (데이터 무결성 사전 점검)

```
video와 related_content를 동시에 가진 사건: 0건
image를 가진 사건: 0건
```
→ 필드 간 충돌이나 중복 데이터가 없어, 마이그레이션 시 별도의 충돌 해소 로직이
필요하지 않다.

## 5. 신규 필드 기본값 적용 시뮬레이션

### content_priority — 참조 빈도 기반 제안값
`connections` 배열에서 다른 사건이 얼마나 자주 이 사건을 참조하는지(=서사적
허브 정도)를 기준으로 `content_priority=1`(최우선) 후보를 산출했다. 실제 가치
판단(예: 사진이 풍부할 것 같은 사건 우선)은 다음 세션에서 사람이 검토해야 하며,
아래는 참고용 정량 지표다.

**참조 5회 이상 — content_priority=1 제안 (실제 23건, 상위 10건만 예시):**
| ID | 제목 | 참조 횟수 |
|---|---|---|
| `movement_1919_02` | 3·1운동 — 거족적 독립만세운동 | 17 |
| `battle_1920_02` | 청산리 대첩 | 8 |
| `massacre_1921_01` | 자유시 참변 (흑하사변) | 8 |
| `policy_1900_01` | 대한제국 — 자주의 마지막 빛 | 7 |
| `policy_1905_01` | 을사늑약 — 외교권을 빼앗기다 | 7 |
| `policy_1910_01` | 경술국치 — 한일병합조약 공포 | 7 |
| `political_1927_01` | 신간회 창립 — 민족유일당 | 7 |
| `organization_1896_01` | 독립협회 창립 | 6 |
| `political_1919_01` | 대한민국 임시정부 수립 | 6 |
| `battle_1920_05` | 독립군 밀산 집결 | 6 |

전체 23건 목록과 정렬은 `content_status_report.md` 2번 표 참고.

나머지 320건은 `content_priority=2`(보통)를 기본값으로 제안하고, `content_priority=3`
(낮음)은 이번 세션에서 별도 산정 기준을 마련하지 않았다 — 사진 작업 단계에서
"이 사건은 사진을 구하기 어렵다/중요도가 낮다"는 실제 판단이 쌓이면 그때 낮춰가는
방식을 권장한다(처음부터 낮음으로 분류해 소외시키지 않기 위함).

### subtitle, summary_short, estimated_assets
이번 세션에서는 343건 중 어느 것에도 실제 값을 채우지 않았다. 채우는 작업 자체가
"콘텐츠 작성"에 해당해 구조 설계 범위를 넘어선다고 판단했다. 다만 `summary_short`의
fallback 로직(스키마 문서 3번 참고: 없으면 `summary_ko`의 첫 1~2문장을 자동 추출)은
설계해 두었으므로, 필드가 비어 있는 상태로도 카드는 정상 작동한다.

## 6. 이번 세션에서 실제로 변경한 파일

**없음.** `data/*.js` 64개 파일은 1차·2차 작업 종료 시점 그대로 보존했다. 이번
세션에서 새로 생성한 파일은 다음 4개뿐이다:
- `docs/schema_v2.md`
- `docs/content_model.md`
- `docs/migration_report.md` (본 문서)
- `docs/content_status_report.md`

---

## 7. 다음 세션에서 해야 할 일 (체크리스트)

1. `docs/schema_v2.md`, `docs/content_model.md` 검토·합의
2. 합의되면 `docs/schema.md`(v1)에 v2 필드 정의를 통합(v1/v2 문서 일원화)
3. 343건 전체에 `content: {hero:null, gallery:[], documents:[], videos:[], maps:[],
   audio:[], related:[]}` 빈 객체를 일괄 추가(데이터 추가가 아니라 빈 구조 추가이므로
   "사건 추가 금지" 원칙에 위배되지 않음)
4. 43+7건의 기존 영상 데이터를 `content.videos`로 실제 이전(3번 규칙 적용)
5. `js/renderer.js`의 `popupHtml()`을 `content_model.md`의 ①~⑦ 구조로 리팩토링
6. `js/contentStatus.js`(신규) 작성 — `media_status` 자동 계산, `validator.js`에 연결
7. CSS에 ⑥ 콘텐츠 영역(그리드 갤러리 등) 스타일 추가
8. 위 작업 완료 후에만 실제 사진/영상 자산 수집 시작
