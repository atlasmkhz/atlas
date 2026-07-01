# 이미지 정책 (ATLAS by MKHZ)

> **2026-06 안내**: 폴더 구조(아래 "폴더 구조" 절)는 `docs/media-policy.md`의
> `entity/archive/system` 구조로 대체되었다. 어떤 이미지를 수집할 가치가
> 있는지, 민감한 역사적 폭력을 어떻게 표현할지는 `docs/image-sourcing-policy.md`
> 를 따른다. 이 문서는 폐기하지 않고 그대로 두지만, 폴더 경로는
> `media-policy.md`, 수집 가치판단은 `image-sourcing-policy.md`를 기준으로
> 한다. 저작권 확인 절차와 작업 순서(아래 두 절)는 이 문서가 여전히 기준
> 문서다.

## 허용 / 금지

**허용**: 자료 사진, 역사 사진, 지도, 삽화, 문서 이미지
**금지**: 영상 직접 업로드, 웹 내부 영상 저장, 대용량 미디어 구축

영상은 사이트 안에 저장하지 않는다. 유튜브에 올리고 `video` 필드(영상 ID)로 연결한다 — `docs/schema.md`의 `video` 필드, 그리고 향후 유튜브 운영 계획을 따른다.

## 저작권 — 사진을 넣기 전에 항상 확인할 것

- 출처가 불명확한 사진은 쓰지 않는다.
- 우선 고려: 국가기록원·국립중앙박물관·독립기념관 등 공공기관 공개자료, 위키미디어 공용(Wikimedia Commons)의 퍼블릭도메인/CC 라이선스 자료, 저작권 보호기간이 끝난(저작자 사후 70년 경과 등) 자료.
- 사용한 사진마다 데이터의 `sources` 배열에 출처를 같이 적어둔다.

## 폴더 구조

```
assets/images/
  events/   사건 대표 이미지 (예: 3·1운동, 제암리 학살)
  people/   인물 사진
  places/   장소·유적·현장 사진 (사건과 별개로 장소 자체를 보여줄 때)
```

## 파일명 규칙

`{연도}_{영문이름}.jpg` — 공백 금지, 소문자, 단어 구분은 언더스코어(`_`).

| 좋은 예 | 잘못된 예 |
|---|---|
| `assets/images/events/1919_31movement.jpg` | `assets/images/events/3.1운동 사진.jpg` |
| `assets/images/people/kim_gu.jpg` | `assets/images/people/김구 사진(1).jpg` |
| `assets/images/events/jeamri.jpg` | `assets/images/events/Jeamri Massacre.JPG` |

인물처럼 사건이 명확하지 않은 경우 연도 없이 이름만 써도 된다(`kim_gu.jpg`). 같은 인물의 사진이 여러 장이면 `kim_gu_01.jpg`, `kim_gu_02.jpg` 식으로 순번을 붙인다.

## 데이터에 연결하는 법

해당 사건/인물 객체에 `image` 필드만 추가하면 된다 (선택 필드, 없으면 카드에 이미지 영역이 그냥 안 보인다):

```javascript
{ id:'movement_1919_02', ...,
  image: 'assets/images/events/1919_31movement.jpg',
  ... }
```

## 작업 순서 (두목님이 직접 진행)

1. 적합한 사진을 구한다 (저작권 확인 — 클로드는 후보 출처를 찾아 링크로 제안할 수 있지만, 실제 다운로드·저작권 최종 확인은 두목님이 해야 한다 — 이 작업 환경은 일반 이미지 사이트 접근이 막혀 있다)
2. 위 명명 규칙에 맞춰 파일명을 정하고 `assets/images/{events|people|places}/`에 넣는다
3. 해당 데이터 객체에 `image` 필드를 추가한다
4. 헤드리스 검증(문법, 좌표 등 기존 검증 루틴) 통과 확인
5. ZIP으로 묶어 Cloudflare에 업로드
