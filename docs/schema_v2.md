# schema_v2.md — 콘텐츠 확장 스키마 (설계 문서, 미적용)

이 문서는 사진·영상·문서·지도·음성을 안정적으로 수용하기 위한 **차세대 데이터 구조
설계**다. 이번 작업은 구조 설계만 수행하며, 사진 수집·영상 연결·콘텐츠 다운로드는
하지 않는다. 기존 `docs/schema.md`(v1)는 변경하지 않고 그대로 둔다 — v2는 신규
문서로, v1과 병행 검토 후 합의되면 다음 세션에서 v1에 통합한다.

---

## 0. 설계 원칙

1. **기존 필드를 깨지 않는다.** `title_ko`, `summary_ko`, `people`, `connections`,
   `tags`, `sources` 등 v1의 핵심 필드는 그대로 유지한다. v2는 추가이지 교체가
   아니다.
2. **콘텐츠가 0개여도 정상이다.** `content` 객체의 모든 하위 배열은 빈 배열
   `[]`이 기본값이며, 비어 있어도 카드가 정상적으로 렌더링되어야 한다(현재
   343건 전부가 이 상태다). "콘텐츠 없음"은 예외가 아니라 기본 상태다.
3. **개수 제한을 코드에 박지 않는다.** `gallery`가 3장이든 1,000장이든 같은
   배열 구조로 표현되어야 하며, "사진 N장까지"처럼 배열 길이에 의존하는 분기를
   렌더링 로직에 넣지 않는다(레이아웃 단의 페이지네이션/지연로딩은 6단계에서
   별도로 다룬다).
4. **미디어 파일 자체는 스키마에 포함하지 않는다.** 이 문서는 "어떤 필드에
   무엇이 들어갈 자리가 있는가"만 정의한다. 실제 이미지 URL, 파일 업로드,
   CDN 경로 결정은 사진 작업 단계(이후 세션)의 몫이다.

---

## 1. content 객체 — 신규 최상위 필드

기존 이벤트 객체에 `content` 필드 하나를 추가한다. 모든 미디어가 이 객체 하위로
모인다 — 즉 이벤트 객체 최상위에 `image2`, `gallery2` 같은 필드를 산발적으로
추가하지 않는다.

```js
{
  // ...기존 v1 필드 전부 그대로 (title_ko, summary_ko, people, connections, ...)

  content: {
    hero: null,        // 대표 이미지 1개 (아래 1-1)
    gallery: [],        // 사진 모음 (아래 1-2)
    documents: [],       // 신문·공문·포스터 등 문서류 이미지 (아래 1-3)
    videos: [],         // 관련 영상 (아래 1-4)
    maps: [],          // 현장 지도/지리 자료 (아래 1-5)
    audio: [],          // 나레이션·음성 (아래 1-6)
    related: []         // 콘텐츠 레벨에서의 연결 (아래 1-7, connections와 다름)
  }
}
```

`content` 필드 자체가 없는 이벤트(즉 마이그레이션 이전 상태)는 "미정의"가 아니라
"전부 빈 배열인 것과 동등하다"로 취급한다 — 렌더링 코드는 `e.content?.gallery ?? []`
형태로 항상 안전하게 읽어야 한다.

### 1-1. hero (대표 이미지)
```js
hero: null
// 또는
hero: {
  id: 'img_xxxx',          // 자산 ID (사진 작업 단계에서 부여)
  url: null,                // 실제 경로 — 이번 단계에서는 항상 null
  alt: '',                 // 대체 텍스트(시각장애 접근성)
  caption: '',              // 화면에 표시할 짧은 설명
  credit: '',               // 출처/저작권 표기
  image_type: 'event'        // 2-1절 이미지 타입 중 하나
}
```
하나의 사건에 대표 이미지는 최대 1개. 카드 최상단(① 대표 영역)에 쓰인다.

### 1-2. gallery (사진 모음)
```js
gallery: [
  { id:'img_xxxx', url:null, alt:'', caption:'', credit:'', image_type:'event' },
  // ...개수 제한 없음
]
```
hero를 gallery에도 중복으로 넣을지는 렌더링 단에서 결정(보통은 hero는 gallery에서
제외하고 별도 슬롯으로 보여준다 — 6단계 참고).

### 1-3. documents (문서류)
```js
documents: [
  { id:'doc_xxxx', url:null, alt:'', caption:'', credit:'', image_type:'newspaper',
    transcript:null }   // 문서 내용을 텍스트로 옮긴 경우(선택)
]
```
신문·공문·포스터 등도 결국 이미지 파일이지만, `image_type`이 `gallery`와는 다른
종류(2-1절)이고 `transcript` 같은 문서 전용 필드가 붙을 수 있어 별도 배열로 분리.

### 1-4. videos (영상)
```js
videos: [
  { id:'vid_xxxx', url:null, youtube_id:null, video_type:'archive',
    title:'', caption:'', credit:'', duration_sec:null }
]
```
기존 v1의 `video`(단일 유튜브 ID 문자열) 및 `related_content`(영상 전용 배열,
7건 사용 중)는 이 필드로 흡수된다. 마이그레이션 규칙은 `migration_report.md` 참고.

### 1-5. maps (현장 지도)
```js
maps: [
  { id:'map_xxxx', url:null, map_type:'historical_map', // 'historical_map'|'modern_overlay'|'diagram'
    title:'', caption:'', credit:'' }
]
```
현재 `lat`/`lng`(이벤트의 현재 위치)와는 별개다 — 여기서의 `maps`는 "그 시대에
그려진 지도", "전투 배치도" 같은 별도의 시각 자료를 가리킨다.

### 1-6. audio (음성)
```js
audio: [
  { id:'aud_xxxx', url:null, audio_type:'narration', // 'narration'|'oral_history'|'archive_sound'
    title:'', caption:'', credit:'', duration_sec:null }
]
```

### 1-7. related (콘텐츠 레벨 연결)
```js
related: [
  { event_id:'massacre_1920_01', relation:'same_location' }
  // relation: 'same_location' | 'same_person' | 'thematic' | 'before_after'
]
```
**기존 `connections`(이벤트-이벤트 서사 연결, 지도 위 점선으로 표시)와는 다른
개념이다.** `connections`은 "이 사건이 다른 사건과 인과·서사로 이어진다"는 1차
관계망이고, `content.related`는 "이 콘텐츠를 보다가 다른 콘텐츠도 보고 싶을 때"의
2차 추천 관계다. 예: 사진 갤러리가 풍부한 두 사건이 서로 다른 연도라 `connections`
에는 없지만, 같은 장소를 찍은 사진이라 `content.related`로는 연결될 수 있다.
**v1의 `connections` 필드는 절대 건드리지 않는다** — 지도 위 점선 렌더링은 전적으로
`connections`에 의존하므로, 둘을 혼동해 통합하면 지도 시각화가 깨진다.

---

## 2. 콘텐츠 유형 분류 (5단계 작업 통합)

### 2-1. 이미지 타입 (`image_type`) — hero/gallery/documents 공통
| 값 | 의미 | 비고 |
|---|---|---|
| `portrait` | 인물 초상/사진 | person 타입 이벤트와 자연스럽게 연결 |
| `event` | 사건 현장 사진 | 가장 흔한 유형으로 예상 |
| `document` | 공문서, 판결문 등 | documents 배열 권장 |
| `poster` | 선전물, 포스터 | documents 배열 권장 |
| `newspaper` | 신문 지면 | documents 배열 권장, `transcript` 필드 활용 권장 |
| `map` | 지도 이미지 | maps 배열과 겹칠 수 있음 — "지도 사진"은 gallery, "지도 자료"는 maps로 구분 권장(완전히 배타적이진 않음) |
| `artifact` | 유물, 물건 사진 | |
| `place` | 현재 시점 장소 사진(답사 사진 등) | 역사 당시 사진과 구분하기 위한 용도 |

### 2-2. 영상 타입 (`video_type`)
| 값 | 의미 |
|---|---|
| `archive` | 당대 기록 영상(뉴스릴 등) |
| `youtube` | 제작자 해설 등 유튜브 콘텐츠 (기존 `related_content`의 `creator_commentary`가 이쪽으로 흡수됨) |
| `animation` | 모션그래픽/애니메이션 재현 |
| `documentary` | 다큐멘터리 클립 |

---

## 3. 이벤트 최상위 신규 필드 (3단계 작업 통합)

`content` 객체와는 별개로, 카드 자체의 표시·우선순위·진행상태를 위한 필드를
이벤트 최상위에 추가한다.

```js
{
  // ...기존 필드, content 필드...

  subtitle: '',          // 부제 (② 카드 구조의 "제목/부제" 슬롯). 선택, 없으면 미표시
  summary_short: '',      // 3~5줄 요약 (② 개요 슬롯). 선택, 없으면 summary_ko의 첫
                         //  문장 1~2개를 잘라 자동 생성하는 fallback 권장(렌더링 단)
  content_priority: 1,    // 1~3. 콘텐츠 보강 작업 시 어느 사건을 먼저 다룰지 정렬용.
                         //  1=최우선(예: 핵심 허브 사건), 2=보통, 3=낮음.
                         //  기존 v1의 `priority`(마커 표시 우선순위)와는 다른 축이다 —
                         //  혼동 방지를 위해 이름을 다르게 둔다.
  media_status: 'empty',   // 'empty' | 'ready_image' | 'ready_video' | 'complete'.
                         //  4단계에서 자동 계산되는 값 — 수동 입력 금지, 항상
                         //  content 내용으로부터 파생(derived)된다. 값 정의는 4번 참고.
  estimated_assets: 0      // 이 사건에 필요할 것으로 예상되는 자산 개수(정수).
                         //  콘텐츠 기획 단계의 추정치이며 실제 자산 수와 무관하게
                         //  수동으로 적어두는 "목표치" 성격의 필드.
}
```

### 필드 예시 (지시서 원안 반영)
```js
{
  subtitle: '',
  summary_short: '',
  content_priority: 1,
  media_status: 'empty',
  estimated_assets: 0
}
```

---

## 4. media_status 계산 규칙 (4단계 작업)

`media_status`는 수동으로 입력하지 않고 `content` 객체의 실제 내용으로부터
**파생(derive)**한다. 계산 함수는 `js/contentStatus.js`(신규, 7단계 참고)에
구현하고, 빌드/검증 시 `validator.js`에서 호출해 `content_status_report.md`를
생성한다.

```
hasImage  = content.hero != null || content.gallery.length > 0 || content.documents.length > 0
hasVideo  = content.videos.length > 0
hasMap    = content.maps.length > 0
hasAudio  = content.audio.length > 0
hasAnyMedia = hasImage || hasVideo || hasMap || hasAudio

if (!hasAnyMedia):              media_status = 'empty'
else if (hasImage && !hasVideo): media_status = 'ready_image'
else if (hasVideo && !hasImage): media_status = 'ready_video'
else if (hasImage && hasVideo):  media_status = 'complete'
```

| 값 | 의미 |
|---|---|
| `empty` | 텍스트만 존재. content의 모든 배열이 비어 있음 |
| `ready_image` | 이미지류(hero/gallery/documents) 중 1개 이상 존재, 영상은 없음 |
| `ready_video` | 영상 1개 이상 존재, 이미지류는 없음 |
| `complete` | 이미지류와 영상이 모두 1개 이상씩 존재 |

지도(`maps`)·음성(`audio`)은 이 4단계 분류에서는 보조 신호로만 취급하고
`media_status`의 4단계 값 자체에는 반영하지 않는다(지시서가 정의한 4종 상태값을
그대로 따른다). 다만 `content_status_report.md`에는 maps/audio 보유 여부도 별도
열로 함께 보고한다.

---

## 5. 기존 v1 필드와의 관계 정리

| v1 필드 | v2에서의 처리 |
|---|---|
| `image` (단일, 현재 0건 사용) | 폐기하지 않음. `content.hero`로 흡수 마이그레이션. v1 필드 자체는 deprecated 표시만 하고 당장 제거하지 않음(하위 호환) |
| `video` (단일 유튜브 ID, 43건 사용) | `content.videos[0]`로 흡수. v1 필드는 deprecated 표시, 제거하지 않음 |
| `related_content` (영상 배열, 7건 사용) | `content.videos`로 흡수. `category:'creator_commentary'`는 `video_type:'youtube'`로 매핑 |
| `priority` (마커 표시 우선순위) | 변경 없음. `content_priority`(신규)와 별개로 유지 |
| `connections` | 변경 없음. `content.related`(신규)와 명확히 분리해 유지 |

세부 매핑 규칙과 343건 전체에 대한 시뮬레이션 결과는 `migration_report.md` 참고.
