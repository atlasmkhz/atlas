# media-policy.md — 미디어 정책 통합본 (ATLAS by MKHZ)

이 문서는 기존 `docs/image-policy.md`(사진 전용 정책)와 `docs/schema_v2.md`의
콘텐츠 구조 설계를 통합해, **사진(내부 자산)과 영상(외부 링크)을 분리하는 최종
정책**을 정의한다. `image-policy.md`는 폐기하지 않고 이 문서로 승격 통합한다 —
파일은 남겨두되, 신규 작업은 이 문서를 기준으로 한다(문서 하단 "image-policy.md와의
관계" 참고).

**이번 문서는 정책/구조 정의이며, 실제 사진 수집·다운로드·영상 연결은 하지 않는다.**
`assets/images/` 폴더 구조 변경, 데이터 파일(`data/*.js`) 수정도 이번 세션에서는
수행하지 않는다 — 모두 다음 세션의 실제 마이그레이션 작업으로 남긴다.

---

## 0. 핵심 원칙

> 사진은 프로젝트 자산으로 보관한다. 영상은 외부 링크로 연결한다.

| | 사진 | 영상 |
|---|---|---|
| 저장 위치 | `assets/images/` 하위 (이 프로젝트가 직접 보유) | 저장하지 않음. 유튜브 등 외부 플랫폼의 링크(ID)만 저장 |
| 오프라인 가능 여부 | 가능 | 불가능(항상 외부 네트워크 필요) |
| 썸네일 생성 | 가능 | 유튜브가 제공하는 썸네일을 그대로 사용 |
| 여러 카드 재사용 | 가능(같은 파일을 여러 사건이 참조) | 가능(같은 video_id를 여러 사건이 참조) |
| 카드 내 위치 | 본문 안(상단, 본문 흐름) | 항상 본문 하단(아래 3번 "렌더링 우선순위" 참고) |

---

## 1. 사진 — 내부 자산 (`assets/images/`)

### 1-1. 폴더 구조 (3대 분류 + 7개 하위 폴더)

```
assets/images/
  entity/              ← 실제 역사 대상을 찍은/그린 사진
    person/             인물
    event/              사건 현장
    place/              장소

  archive/             ← 기록 자산(문서류)
    document/           공문서, 판결문 등
    poster/             선전물, 포스터
    newspaper/           신문 지면

  system/              ← 자동 생성되는 파생 이미지
    thumb/              썸네일(원본으로부터 자동 생성, 수동 업로드 없음)
```

**`entity`**는 "실제로 존재했던 사람·사건·장소"를 직접 담은 1차 자료 성격의
사진이고, **`archive`**는 "그 시대가 남긴 기록물"(문서·포스터·신문)을 찍은
사진이다. 둘을 구분하는 기준은 "사진의 대상이 사람/사건/장소 자체인가, 아니면
종이 위의 기록인가"다. **`system`**은 사람이 직접 올리는 폴더가 아니라, 위
6개 폴더의 원본으로부터 빌드 과정에서 자동 생성되는 파생물(섬네일 등)만 들어간다
— 즉 `system/thumb/`에 수동으로 파일을 넣는 일은 없어야 한다.

### 1-2. 파일명 규칙

```
assets/images/person/person_1919_01_01.webp
assets/images/event/event_1920_03_01.webp
assets/images/document/doc_1910_01.webp
assets/images/newspaper/news_1919_01.webp
```

형식: `{접두사}_{연도}_{사건/인물 일련번호}_{사진 일련번호}.webp`
- 접두사는 폴더와 매칭: `person`, `event`, `place`, `document`(축약 `doc`),
  `poster`, `newspaper`(축약 `news`)
- 확장자는 `.webp`로 통일(용량 효율 — 1,000장 단위 확장을 고려한 선택)
- 공백 금지, 소문자, 단어 구분은 언더스코어. 이 규칙은 기존
  `image-policy.md`의 파일명 규칙과 동일한 원칙을 유지한다.

### 1-3. 저작권 — 기존 image-policy.md 원칙 유지 (변경 없음)
- 출처가 불명확한 사진은 쓰지 않는다.
- 우선 고려: 국가기록원·국립중앙박물관·독립기념관 등 공공기관 공개자료,
  위키미디어 공용의 퍼블릭도메인/CC 라이선스 자료, 저작권 보호기간이 끝난 자료.
- 사용한 사진마다 `sources` 배열에 출처를 같이 적는다.
- **2026-06 추가**: 어떤 출처를 어떤 순서로 탐색할지(A~E 우선순위), 민감한
  역사적 폭력을 어떻게 표현할지(잔혹 장면 표현 조건, 대표 이미지 규칙)는
  `docs/image-sourcing-policy.md`를 따른다. 이 절의 "우선 고려" 목록은
  그 문서의 A·B 단계와 같은 출처를 가리키는 것이다.

### 1-4. 데이터 연결 — schema_v2.md의 content.gallery/hero/archives 사용
사진은 `content.hero`(대표 1장) 또는 `content.gallery`(여러 장), 문서류는
`content.archives.documents/posters/newspapers`(아래 2번 참고)에 연결한다.
기존 v1의 단일 `image` 필드는 deprecated 유지(제거하지 않음, `schema_v2.md`
5번 표와 동일한 방침).

---

## 2. 영상 — 외부 참조 (저장 금지)

### 2-1. 원칙
영상 파일 자체는 절대 이 프로젝트에 저장하지 않는다. 유튜브에 올라간 영상의
ID와 메타데이터만 저장한다. (기존 `image-policy.md`의 "영상은 사이트 안에
저장하지 않는다" 원칙을 그대로 계승·구체화한 것이다.)

### 2-2. 데이터 구조
```js
content: {
  hero: null,
  gallery: [],
  archives: {
    documents: [],
    posters: [],
    newspapers: []
  },
  videos: []   // 아래 youtube 객체들의 배열
}
```

영상 1개당 구조:
```js
{
  platform: 'youtube',
  video_id: '',
  title: '',
  channel: '',
  approved: true,     // 4번 채널 규칙을 통과했는지 여부 (수동 검토 후 표시)
  start_time: null     // 초 단위. 영상의 특정 구간부터 재생하고 싶을 때(선택)
}
```

`approved` 필드는 "이 영상이 4번 채널 규칙(공식 기관/방송사/박물관/기록관/교육
채널)을 통과했음을 사람이 확인했다"는 표시다. `approved:false`(또는 누락)인
영상은 카드에 노출하지 않는 것을 렌더링 규칙으로 둔다 — 즉 이 필드는 영상이
실제로 화면에 보일지 말지를 가르는 게이트 역할을 한다.

### 2-3. 카드당 영상 개수 제한
- **대표 영상 최대 1개** (`content.videos[0]`을 대표로 취급)
- **추가 영상 포함 총 최대 5개** (`content.videos.length <= 5`)
- 6개 이상을 추가하려는 시도는 데이터 검증 단계(`validator.js`, 다음 세션
  반영 예정)에서 경고로 잡아야 한다 — 이번 세션에서는 규칙만 정의하고 검증
  로직 구현은 하지 않는다.

### 2-4. 채널 화이트리스트 / 블랙리스트

| 허용 | 금지 |
|---|---|
| 공식 기관(정부, 공공기관) | 쇼츠(Shorts) |
| 방송사 | 반응 영상(reaction) |
| 박물관·기록관 | 요약 영상(recap/summary) |
| 교육 채널 | 출처 불명 채널 |

이 판단도 사람이 직접 확인하며(이 작업 환경은 유튜브 API 접근이 막혀 있어
자동 판별이 불가능하다), 확인 후 `approved:true`로 표시한다. 판단 기준이
애매한 경우(예: 개인 채널이지만 박물관 공식 협력 콘텐츠인 경우)는 보류하고
다음 세션에서 결정.

### 2-5. 재생 규칙
- 자동재생 금지
- 항상 썸네일만 노출(유튜브가 제공하는 썸네일, 즉 `https://img.youtube.com/vi/{video_id}/hqdefault.jpg`
  형태 — 기존 `renderer.js`의 `popupHtml()`이 이미 이 방식을 쓰고 있어 신규
  영상도 동일한 패턴을 따른다)
- 클릭 시 유튜브로 이동(외부 탭, `target="_blank"`) — 사이트 안에서 직접
  재생하지 않는다(임베드 플레이어 금지). 기존 코드의 동작과 동일.

---

## 3. 카드 렌더링 우선순위 (영상은 항상 아래)

```
① 대표사진 (hero)
       ↓
② 설명 (summary_short → summary_ko)
       ↓
③ 관련 인물 (people)
       ↓
④ 관련 사건 (connections)
       ↓
⑤ 관련 사진 (gallery)
       ↓
⑥ 관련 영상 — 유튜브 (videos)
       ↓
⑦ 출처 (sources)
```

`content_model.md`(이전 세션 설계)의 ①~⑦ 영역과 비교하면 순서가 일부
재배치됐다 — 특히 "콘텐츠"로 묶여 있던 사진/문서/영상이 분리되어, **사진(⑤)이
영상(⑥)보다 항상 먼저 나온다.** 문서(`archives`)는 사진과 영상 사이, 더
정확히는 "관련 사진" 영역 안에서 사진 다음에 이어지는 하위 섹션으로 배치한다
(아래 3-1 참고). `content_model.md`는 폐기하지 않되, 이 순서 규칙이 최종
기준이며 다음 세션에서 `content_model.md`에도 역으로 반영해 두 문서를
일치시켜야 한다(5번 "다음 세션 체크리스트" 참고).

### 3-1. ⑤ "관련 사진" 영역의 내부 순서
```
gallery (entity 사진: 인물/사건/장소)
   ↓
archives.documents (문서)
   ↓
archives.posters (포스터)
   ↓
archives.newspapers (신문)
```
이 네 종류는 전부 "사진(이미지)"이라는 공통점이 있어 ⑤ 영역 하나에 묶이고,
영상(⑥)과는 분리된다. 즉 "관련 사진"과 "archives"는 화면상 같은 영역의
하위 탭/섹션이지 서로 다른 카드 영역이 아니다.

---

## 4. 렌더링 규칙 (빈 상태 처리)

| 조건 | 동작 |
|---|---|
| 영상이 0개 | ⑥ 영역 전체를 숨김 (플레이스홀더 없음) |
| 사진(hero/gallery/archives 전체)이 0개 | ①·⑤ 영역을 숨김. **플레이스홀더(빈 이미지 칸, 회색 박스 등) 금지** — 그 자리에 아무것도 그리지 않고, 다음 영역이 바로 이어진다 |
| 텍스트(②③④⑦)만 있는 경우 | 그 상태로 완전한 카드로 취급한다. "콘텐츠가 부족하다"는 표시를 사용자에게 보여주지 않는다 |

이 표는 `content_model.md` 4번(6단계 UI 검증)의 답변과 같은 원칙이며, 이번
문서에서 "플레이스홀더 금지"를 명시적으로 확정했다(`content_model.md`는 이
부분을 "결정 필요"로 미정 상태로 남겨뒀던 항목이었다 — 이번 지시로 확정됨).

---

## 5. 마이그레이션 — 폴더/필드 경로 변경

### 5-1. 폴더명 변경 (복수형 → entity 하위 단수형)
| 기존 (`image-policy.md`, 실제 존재하는 빈 폴더) | 신규 |
|---|---|
| `assets/images/events/` | `assets/images/entity/event/` |
| `assets/images/people/` | `assets/images/entity/person/` |
| `assets/images/places/` | `assets/images/entity/place/` |
| `assets/thumbnails/` (최상위 별도 폴더) | `assets/images/system/thumb/` |

**자동 이동 + 기존 경로 alias 허용**: 다음 세션에서 실제 폴더를 옮길 때,
구 경로(`events/`, `people/`, `places/`)를 즉시 삭제하지 않고 심볼릭 링크
또는 리다이렉트 형태로 일정 기간 유지하는 것을 권장한다 — 이미 `image` 필드에
구 경로가 박혀 있는 데이터가 생기더라도(현재는 0건이지만) 깨지지 않게 하기
위함이다. 다만 이번 세션에서는 실제 폴더 이동도, alias 설정도 수행하지 않는다
— 현재 `events/`, `people/`, `places/` 폴더는 비어 있는 상태이므로(1-건도
사용 중인 파일 없음) 실제 위험 없이 다음 세션에서 한 번에 정리 가능하다.

### 5-2. 금지 폴더명
다음 이름의 폴더는 만들지 않는다 — 분류 기준이 모호해지는 것을 막기 위함:
- `images/videos/` (영상은 애초에 이미지 폴더 하위에 두지 않는다)
- `media/` (너무 포괄적인 이름 — entity/archive/system 분류를 무력화함)
- `mixed/` (애매한 사진을 임시로 몰아넣는 용도로 쓰일 위험)
- 기타 위 7개 하위 폴더(person/event/place/document/poster/newspaper/thumb)
  분류에 들어가지 않는 통합 폴더 일체

---

## 6. schema_v2.md와의 관계 (필드 구조 갱신)

`docs/schema_v2.md`의 `content` 객체 정의는 이번 정책으로 아래와 같이 갱신된다
(schema_v2.md 본문은 이번 세션에서 직접 수정하지 않았다 — 이 문서가 최신
기준이며, 다음 세션에서 schema_v2.md를 이 내용에 맞춰 갱신하는 것을 권장한다):

```js
content: {
  hero: null,
  gallery: [],
  archives: {
    documents: [],
    posters: [],
    newspapers: []
  },
  videos: []
}
```

**`schema_v2.md`(이전 세션 설계)와의 차이점:**
- 기존 `content.documents`(독립 배열)가 `content.archives.documents`로 한 단계
  더 들어감. `posters`/`newspapers`도 같은 방식으로 `archives` 하위로 통합.
- 기존 `content.maps`, `content.audio`, `content.related`는 **이번 정책
  지시서에 명시되지 않았다** — 폐기된 것은 아니지만, 이번 "영상 링크 방식
  반영"이라는 좁은 범위의 정책 수정에서는 다루지 않는다. 다음 세션에서
  `schema_v2.md`를 갱신할 때 maps/audio/related를 그대로 유지할지, 이번
  `archives` 패턴처럼 재구조화할지 결정이 필요하다(8번 참고).
- 영상 객체 필드가 `{id, url, youtube_id, video_type, title, caption, credit,
  duration_sec}`(schema_v2.md)에서 `{platform, video_id, title, channel,
  approved, start_time}`(이번 정책)로 더 단순해짐. `video_type`(archive/
  youtube/animation/documentary 4분류)이 빠지고 대신 `approved`(채널 검증
  여부)가 추가된 것이 핵심 차이다 — 분류보다 "신뢰할 수 있는 채널인가"를
  우선하는 방향으로 정책이 바뀌었다고 해석.

---

## 7. image-policy.md와의 관계

`docs/image-policy.md`는 **삭제하지 않는다.** 다만 이 문서(`media-policy.md`)가
사진+영상을 함께 다루는 상위 정책이 되고, `image-policy.md`는 "사진만 다루던
이전 버전의 정책 문서"로 남는다. 두 문서의 관계:

- 저작권 확인 절차, 작업 순서(두목님이 직접 진행하는 부분)는
  `image-policy.md`에 이미 잘 정리되어 있어 **그대로 유효**하다. 이 문서는
  해당 내용을 다시 베껴쓰지 않고 참조만 한다(1-3절).
- 폴더 구조(`events/people/places` 3개 복수형)는 이번 문서의 7개 단수형
  구조로 **대체**된다 — `image-policy.md` 16~23행의 폴더 구조 설명은 이제
  구버전이다.
- 다음 세션에서 `image-policy.md` 상단에 "이 문서의 폴더 구조 부분은
  `media-policy.md`로 대체되었음" 안내를 추가하는 것을 권장하되, 본문 삭제는
  하지 않는다(지시서 "기존 image-policy.md 폐기 금지" 원칙).

---

## 8. 다음 세션 체크리스트

1. `schema_v2.md`의 `content` 객체 정의를 이 문서 6번 내용으로 갱신(특히
   `archives` 중첩 구조 반영)
2. `schema_v2.md`/`content_model.md`에서 빠진 `maps`/`audio`/`related`의
   존속 여부 결정
3. `content_model.md`의 ①~⑦ 영역 순서를 이 문서 3번의 순서(사진이 영상보다
   항상 먼저)에 맞춰 재정렬
4. 실제 폴더 구조 변경: `assets/images/entity/{person,event,place}/`,
   `assets/images/archive/{document,poster,newspaper}/`,
   `assets/images/system/thumb/` 생성 + 기존 빈 폴더(`events/people/places`,
   최상위 `thumbnails/`) 정리(alias 또는 삭제 — 현재 전부 빈 폴더라 위험 없음)
5. `image-policy.md`에 "폴더 구조는 media-policy.md로 대체" 안내 추가
6. `js/validator.js`에 영상 개수(최대 5개) 검증, `approved` 필드 게이트
   로직 추가
7. `js/renderer.js`의 `popupHtml()`을 이 문서 3번 순서로 리팩토링(이전
   세션의 `content_model.md` 작업과 통합)
