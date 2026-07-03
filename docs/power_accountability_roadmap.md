# power_accountability_roadmap.md — "권력과 책임" 축 & 지식그래프 확장 로드맵 (설계 문서, 미적용)

이 문서는 2026년 7월 대화에서 합의된 "권력과 책임(Power & Accountability)" 축의 설계와,
그 과정에서 나온 ATLAS 전체의 지식그래프 확장 비전을 정리한다. **이 문서는 설계
문서이며, 아래 스키마 확장은 아직 코드/데이터에 반영되지 않았다.** 기존
`docs/schema.md`(v1), `docs/schema_v2.md`(콘텐츠 확장)는 변경하지 않는다.

이 문서를 별도로 둔 이유는 `docs/roadmap.md`와 같다 — 장기 비전과 지금 당장 할 일을
섞으면 둘 다 제대로 끝내지 못한다. 그래서 이 문서는 처음부터 "North Star(지향점)"와
"MVP(지금 만드는 것)"를 명확히 나눠서 쓴다.

---

## 0. 설계 원칙

1. **기존 필드를 깨지 않는다.** `connections`, `tags`, `summary_ko`, `allegation_status`
   등 기존 이벤트 카드 필드는 그대로 유지한다. 아래 확장은 전부 추가이지 교체가
   아니다. 기존 카드는 새 필드 없이도 계속 정상 렌더링돼야 한다.
2. **부정부패 강조가 아니라 권력감시.** 여야·진영을 가리지 않고 모든 인물·사건에
   동일한 카드 형식과 동일한 검증 기준을 적용한다. 이게 깨지면 ATLAS 전체의
   신뢰도가 깨진다.
3. **사실과 평가를 분리한다.** "의혹 제기 → 수사 진행 → 법원 판결 → 역사적 평가"
   4단계를 필드 수준에서 분리한다(§3 참고). 진행 중인 사안은 확정판결 난 사건과
   같은 문장 구조로 서술하지 않는다.
4. **Route vs Archive 판단 기준은 이미 코드에 있다.** `archive/historical_revisionism.js`
   주석에 명시된 선례를 그대로 따른다 — 실제 장소·시간을 이동하는 사건의 연쇄는
   Route, 주장-반박·법적 절차 중심 콘텐츠는 Archive. "권력과 책임"은 이번 대화
   막판에 Route로 재분류됐다(§4 참고).
5. **스키마는 콘텐츠 볼륨을 앞서가지 않는다.** 6-엔티티 모델(§6)은 지향점으로
   문서화하되, 지금은 Event·Person·Route 3개만 실제로 만든다. Organization은
   특정 참조 빈도를 넘을 때만 분리한다. Place·Document는 당분간 독립 엔티티화
   하지 않는다.
6. **자료실 category/subcategory는 새로 만들지 않는다.** `generate_archive_pages.py`에
   이미 `CATEGORY_LABELS`(history/literature/philosophy/art/architecture/religion)와
   `SUBCATEGORY_LABELS`(revisionism/era_study/people_study/primary_sources)가
   정의돼 있다. 지금 콘텐츠가 있는 건 `history`뿐이고, 다른 5개 카테고리는
   그릇만 파여 있고 비어 있는 상태다. 한국사(고대·중세·근대·현대)와 세계사가
   채워지기 전까지 문학·철학·예술·건축·종교 카테고리에는 콘텐츠를 만들지
   않는다. "권력과 책임"류 사건카드(§3)는 `subcategory: 'era_study'`(시대연구)
   에 속한다 — 인물의 전체 생애사가 아니라 "권력형 사건의 사법처리"라는
   반복되는 시대적 패턴을 다루기 때문이다. `subcategory: 'people_study'`
   (인물연구)는 §5의 인물카드(대통령·고위공직자·재벌총수 프로필) 전용으로
   남겨둔다 — 인물의 전체 궤적을 이미 Route가 다루는 경우(예: 전두환은
   modern2의 `routes/chun_doo_hwan.js`), 자료실 사건카드가 그걸 다시
   프로필화할 필요는 없다.

---

## 1. Theme — Route 상위 분류

Route가 늘어날 걸 대비해 상위 분류 레이어를 둔다. 지도 UI를 새로 만들 필요는
없고, 각 Route 정의 객체에 `theme` 필드 하나만 추가하면 된다.

```
theme: 'politics' | 'economy' | 'society' | 'culture' | 'science' | 'security'
```

| Theme | 하위 Route 예시 |
|---|---|
| politics (정치) | 민주화, 권력과 책임, 정당사, 지방자치 |
| economy (경제) | 산업화, 금융위기, 재벌 |
| society (사회) | 노동, 교육정책, 여성 |
| culture (문화) | 영화, 음악, 스포츠, K-문화 |
| science (과학기술) | 우주, 원자력, 반도체, AI |
| security (외교안보) | 남북관계, 한미동맹, 북핵 |

지금 6개로 시작하고, 7번째가 필요해지면 그때 추가한다 — 처음부터 완전한
분류체계를 만들려고 하지 않는다.

---

## 2. 권력감시 태그체계 (기존 이벤트 `tags[]` 확장)

새 marker type을 만들지 않고 기존 `tags[]`에 소급 적용한다(2026년 7월 초
뉴라이트/온라인혐오 카드 작업 때 확립한 것과 같은 원칙 — type은 아이콘·색상·범례가
고정된 닫힌 시스템이라 함부로 늘리지 않는다).

```
권력과 책임
├── 부정부패    (뇌물, 횡령, 배임, 비자금, 탈세, 불법후원, 특혜)
├── 정치자금
├── 선거범죄
├── 권한남용    (직권남용, 불법사찰, 감청, 인권침해, 군사동원, 계엄, 긴급조치)
├── 국정농단
├── 사법        (수사, 압수수색, 기소, 무죄, 유죄, 상고, 재심, 헌법재판, 특검)
├── 감사
├── 탄핵
├── 사면
├── 내부고발
└── 제도개혁
```

적용 대상 예시(기존 이벤트에 소급): 한보사태, 전두환·노태우 구속, BBK,
국정농단, 대장동, 조국 사태 등.

---

## 3. 사건카드 스키마 확장

기존 `allegation_status`(alleged/indicted/convicted/acquitted/null)는 유지하되
`pardoned`를 추가한다. 고정된 "수사→기소→재판→판결" 대신 가변 길이 배열을 쓴다
— 한국 현대사는 파기환송·재상고가 흔해서 고정 필드로는 표현이 안 된다.

```js
allegation_status: 'alleged' | 'indicted' | 'convicted' | 'acquitted' | 'pardoned' | null,

stages: [
  { stage:'수사개시', date:'2016-10', institution:'검찰', detail:'...' },
  { stage:'기소',     date:'2017-04', institution:'검찰', detail:'...' },
  { stage:'1심',      date:'2018-02', institution:'서울중앙지법', result:'유죄' },
  { stage:'2심',      date:'2018-08', institution:'서울고법',     result:'일부 감형' },
  { stage:'대법원',    date:'2019-08', institution:'대법원',       result:'파기환송' },
  { stage:'파기환송심', date:'2021-01', institution:'서울고법',    result:'유죄' },
  { stage:'사면',      date:null,      institution:'대통령',       result:null }
],

body_ko: '...',      // 사실관계 서술 (기존 summary_ko와 동일 역할, 사건카드에서는 이 이름 사용)
legacy_ko: '...',    // 역사적 평가·해석 — body_ko와 명확히 분리된 필드

sources: [
  { title:'...', kind:'court' },       // 판결문·결정문 (법원, 헌법재판소)
  { title:'...', kind:'government' },  // 감사원, 선관위 등 정부·공공기관 자료
  { title:'...', kind:'newspaper' },
  { title:'...', kind:'interview' },   // 회고록·증언
  { title:'...', kind:'paper' }        // 학술연구
]
```

`kind` 값은 임의로 지은 게 아니라 `maps/modern2/build/generate_archive_pages.py`의
`SOURCE_TYPE_LABELS`에 이미 정의돼 있던 걸 그대로 쓴다(government/court/paper/
book/newspaper/interview/video/museum/archive, 총 9종). 이 문서 초안에는
한동안 1차사료/공공기관자료 같은 임의 한글 값이 적혀 있었는데, 실제 빌드
스크립트가 인식 못 하는 값이라 파일럿 카드(박근혜 국정농단) 작업 중 발견해
수정했다 — 새 스키마를 설계할 때는 반드시 기존 빌드 스크립트의 상수부터
먼저 확인한다.

`stages[]` 하나로 두 가지 시각화가 파생된다 — 날짜순 정렬하면 타임라인,
기관별로 묶으면 기관 네트워크 흐름도. 둘 다 손으로 따로 만들지 않는다(§7).

---

## 4. "권력과 책임" Route

최종 합의: Archive가 아니라 **Route**로 분류한다(대화 초반엔 Archive로
판단했으나, 실제 사건이 실제 기관·장소를 순차적으로 거치는 연쇄라는 점이
명확해지면서 "학살의 기록" Route와 같은 패턴으로 재분류됨).

```
전두환 → 노태우 → 한보사태 → 차떼기 대선자금 → BBK → 국정농단
→ 조국 사태 → 대장동 → 채상병 특검 → 명태균 게이트
```

각 waypoint는 해당 사건카드(§3 스키마)를 `card_ref`로 참조한다. 진행 중인
사안(명태균 게이트 등)은 `allegation_status`를 정확히 반영하고, 확정판결
사건과 같은 어조로 서술하지 않는다.

---

## 5. 인물카드 (Archive, 신규 카테고리)

대통령뿐 아니라 고위공직자·재벌총수까지 **동일 스키마**로 포함한다(공직자라는
공적 성격 때문에 검증 기준을 낮추지 않는다는 원칙). Archive 안에서
role_type을 카테고리 분리가 아니라 필터로 둔다 — 카테고리를 쪼개면 "대통령은
크게, 재벌총수는 부록으로" 취급한다는 인상을 줄 수 있다.

```js
{
  name: '...',
  role_type: '대통령' | '국회의원' | '검찰총장' | '재벌총수' | '고위공직자',
  affiliation: '...',        // 정당 또는 기업
  tenure: '...',             // 재임기간/재직기간/총수기간 — role_type에 따라 라벨만 다르게 표시
  achievements_ko: '...',    // 대통령/국회의원/검찰총장: 주요 정책·업적, 재벌총수: 경영성과·지배구조 변화
  controversies_ko: '...',   // 주요 논란 — 사실관계만, 평가 배제
  stages: [ /* §3과 동일 구조 재사용 */ ],
  pardoned: true | false | null,
  related_events: [ 'event_id', ... ],
  related_institutions: [ '청와대', '검찰', '삼성', '국회', '헌법재판소', ... ],
  legacy_ko: '...'
}
```

---

## 6. North Star — 지식그래프 지향점 (지금 구현 안 함)

장기적으로 ATLAS의 데이터는 6개 엔티티로 수렴한다:

```
Event · Person · Organization · Place · Document · Route
```

이 문서 작성 시점 판단: **Event, Person, Route만 지금 만든다.**

| 엔티티 | 지금 | 나중 |
|---|---|---|
| Event | 독립 (기존) | — |
| Person | 독립 (§5, 지금 착수) | — |
| Route | 독립 (기존) | — |
| Organization | 사건카드 안에 문자열로만 | 한 기관이 **5회 이상** 참조되면 그때 독립 엔티티로 분리(예: 삼성, 검찰, 헌법재판소) |
| Place | 분리 안 함 | 기존 `lat/lng/place_ko`로 충분 — 장소 엔티티화는 지도 자체가 이미 그 역할을 하므로 우선순위 낮음 |
| Document | 분리 안 함 | `sources[].kind`(§3)로 성격만 태깅, 문서 자체의 엔티티화는 콘텐츠가 훨씬 쌓인 뒤 |

이유: 그래프 데이터베이스 없이 손으로 쓰는 JS 파일 + 정적 생성기 구조에서
6개 엔티티를 한꺼번에 분리하면, 참조 무결성(오타로 인한 끊어진 링크)을
잡아줄 도구가 없어 콘텐츠가 늘수록 그래프가 조용히 깨진다. 대신 §8의
validator 확장으로 안전망을 먼저 깔고, 참조 빈도가 실제로 분리를 정당화할
때만 엔티티를 늘린다.

### relation 타입 (connections 업그레이드)

`connections: ['id1','id2']` (문자열 배열, 기존)을 아래 구조로 점진 확장한다.
**기존 카드는 문자열 배열 그대로 둬도 정상 동작해야 한다** — 마이그레이션은
카드를 수정할 때마다 자연스럽게 진행한다.

```js
connections: [
  { to:'choi_soon_sil', relation:'associated_with' },
  { to:'saenuri_party',  relation:'member_of' }
]
```

통제어휘는 처음부터 크게 벌리지 않는다(10개 이내로 시작, 필요할 때 추가):

```
member_of, led, appointed_by, investigated_by, indicted_by,
convicted_in, overturned_by, succeeded_by, occurred_at, caused
```

---

## 7. 파생 시각화 (콘텐츠 쌓인 뒤 자동 생성 — 지금 안 만듦)

- **AI 분석 비교표**: 인물카드 `stages[]`/`pardoned` 필드를 build 파이프라인이
  취합해 자동 생성 (예: "역대 대통령 형사사건 기소/유죄/무죄/사면" 표)
- **사건 진행 타임라인**: `stages[]`를 날짜순 정렬해 자동 생성
- **권력 네트워크 흐름도**: `stages[].institution` + `connections`를 기관별로
  묶어 자동 생성 (기존에 논의했던 "부정부패 지도"와 동일 기능, 손으로 안 그림)

세 기능 다 별도 콘텐츠 제작이 필요 없다 — §3, §6의 스키마가 채워지면
파생되는 뷰(view)다.

---

## 8. 검증 (validator.js 확장)

기존 `js/validator.js`에 이미 `validateConnections()`가 있다(끊어진
connections id를 잡아내는 용도, root 지도 기준). 이 패턴을 확장한다:

- `connections`가 `{to, relation}` 구조일 때 `to`가 실존 id인지 검증
- `relation`이 통제어휘(§6) 안의 값인지 검증
- 인물카드 `related_events[]`, 사건카드 `stages[].institution`이 향후
  Organization 엔티티로 분리될 경우 그 id도 검증 대상에 포함

새 검증 도구를 따로 만들지 않고 기존 validator.js를 확장하는 이유: 이미
콘솔에서 `validateAll()`로 호출하는 워크플로우가 있고, 이걸 그대로 쓰는 게
새 도구를 배우는 것보다 낫다.

---

## 9. 백로그 (지금 착수 안 함)

- **민주화 루트**: 4·19 → 5·18 → 6월항쟁 → 문민정부 → 지방자치제 → 촛불집회 → 탄핵.
  Route 작업 트랙 착수 시점에 진행, 지금은 보류(사용자 명시적 요청).
- **진보정치 루트**: 민주노동당 → 진보신당 → 정의당. 노회찬·심상정·권영길 등
  관련 인물 리서치 필요.
- **교육정책 루트**: 평준화 → 7차 교육과정 → 수능 개편. 이해찬·안병영·이주호
  등 교육부 장관 인물카드와 연동.
- **이념 스펙트럼(Ideology Spectrum) Explorer**: Route가 아니라 별도 탐색
  기능. "ATLAS가 좌표를 임의로 부여하지 않는다"는 원칙 — 정당 소속, 공개
  정책, 학계 분류 등 출처 있는 근거만 사용하고, 인물별 출처를 함께 표시.
  단일 축이 아니라 경제/사회/외교 등 다축 표현도 검토. 우선순위 낮음 —
  리스크 대비 효용이 다른 항목보다 낮다고 판단해 뒤로 미룸.

---

## 10. 다음 단계

1. **파일럿 사건카드** — 박근혜 국정농단, §3 스키마로 실제 작성 (다음 작업)
2. 파일럿 검증 후 §2 태그체계를 기존 이벤트에 소급 적용
3. 인물카드(§5) 파일럿 1~2건 — 박근혜·최순실·이재용 중 사건카드에서 자연스럽게
   연결되는 인물부터
4. validator.js 확장(§8)은 카드 수가 늘어나 수동 검증이 부담스러워지는
   시점에 진행 — 지금 카드 1~2개 단계에서는 우선순위 낮음
