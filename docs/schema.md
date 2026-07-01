# Schema — Event 객체 정의

`data/*.js`의 `EVENTS_XXXX` 배열에 들어가는 모든 사건은 아래 필드를 따른다.
새 사건을 추가할 때는 이 스키마를 기준으로 검증한다(`validator.js`가 일부 필드를 자동 검사한다).

---

## 전체 필드 정의

```javascript
{
  // ── 식별자 ──
  id:               String,   // 필수. 형식: "{type}_{year}_{순번}" (예: 'battle_1920_01')
                               // 같은 연도·유형 내에서 2자리 순번(01, 02, ...)을 사용.
                               // 전체 DATA 범위에서 고유해야 함 (validateDuplicateIds 검사 대상).

  // ── 시간 ──
  year:             Number,   // 필수. 사건이 "발생"한 연도 (예: 1920)
  visible_from:     Number,   // 필수. 지도에 표시되기 시작하는 연도. 보통 year와 동일.
  visible_until:    Number,   // 필수. 지도에서 사라지는 연도.
                               //   - 단발 사건(전투, 의거, 순국 등): year와 동일하거나 +1~2년의 짧은 여운만.
                               //   - 장기 지속 사건(정책, 단체 존속): 실제 지속 기간 전체.
                               //   - 인물 스냅샷: "그 시점에 그 인물이 거기 있었다"는 기간만 (생애 전체 X).
                               //   ⚠ 흔한 실수: 사상적 영향력이 길게 갔다고 visible_until을 길게 잡는 것.
                               //     "조선혁명선언"(1923년 집필)을 1945까지 잡는 식의 오류 — 사건의 지속과
                               //     사상의 영향력은 다른 문제다.
  month:            Number,   // 0~11 (0-based: 1월=0, 12월=11). 정보가 없으면 생략 가능(undefined)
                               // 또는 null로 명시(day와 같은 관례를 따름).
                               // ⚠ 흔한 실수: 사람이 읽는 달(12월)을 그대로 12로 적는 것 —
                               //   이 경우 12월 사건이 13번째 달처럼 처리되어 timeline.js의
                               //   월별 계산이 어긋난다. 반드시 "사람이 말하는 달 − 1"로 변환할 것
                               //   (예: 실제 12월 4일 사건 → month:11, day:4).
  day:              Number,   // 1~31 또는 null. 정보가 없으면 null.

  // ── 분류 ──
  type:             String,   // 필수. 아래 10종 중 하나:
                               //   'battle'       전투 (빨강 #c44536)
                               //   'righteous'    의열투쟁 (보라 #8367a8)
                               //   'political'    정치·언론 (초록 #3a8261)
                               //   'plot'         일제 공작/조작사건 (황토 #b5762a)
                               //   'policy'       식민 정책 (남색 #5a6b8c)
                               //   'massacre'     학살 — 집단살해·즉결처형 등 직접적 살인에 한정.
                               //     검거·투옥·고문·재판처럼 절차를 거친 탄압은 massacre가 아니라
                               //     policy(식민 당국의 정책적 탄압 집행)로 분류한다.
                               //     (예: 조선어학회 사건은 검거·옥사이지 현장 집단살해가 아니므로 policy)
                               //   'person'       인물 위치/스냅샷 (하늘색 #4a9cc8)
                               //   'movement'     민중운동 (황금 #c8a827)
                               //   'migration'    이동·망명 (남청 #6d8db4)
                               //   'organization' 조직 결성/재편 (청동 #7a8471)
                               //     ⚠ 무장단체의 "결성"은 organization, 그 단체가 실제로 벌인
                               //       "전투"는 battle로 분리할 것 (예: 신민부 결성=organization,
                               //       쌍성보 전투=battle). 결성·창설·재편·해산·파견처럼 조직의
                               //       구조 변화를 다루는 사건은 전부 organization이며, ID가
                               //       'battle_'로 시작하더라도 내용이 결성이라면 type은
                               //       organization을 쓴다 (ID와 type이 항상 1:1은 아님 — 아래
                               //       "ID prefix와 type" 항목 참고).
                               //   'international' 국제정세/외교 — 조선이 주체가 아니거나 외세
                               //     간의 직접적 충돌·교섭이 핵심인 사건 (거문도 사건, 조사시찰단
                               //     파견 등). 한국 내부의 정치 행위는 political을 쓴다.
                               //
                               // ── ID prefix와 type ──
                               // id 필드의 접두사({type}_{year}_{순번})는 命名 시점에 붙이는
                               // 1차 분류 의도일 뿐, 최종 근거는 항상 type 필드다. 운영 중
                               // 다른 사건의 connections가 이 id를 참조하게 되면, 나중에 분류를
                               // 재검토해 type을 바꾸더라도 id는 그대로 두는 것이 안전하다
                               // (id를 바꾸면 다른 파일에 있는 connections 배열도 전부 찾아
                               // 같이 고쳐야 하고, 누락 시 끊어진 링크가 생긴다). 즉 id prefix와
                               // type이 다른 사건이 존재할 수 있으며, 이는 오류가 아니라
                               // "명명 시점의 가제목이 최종 분류와 달라진 것"으로 이해한다.
                               // 신규 사건을 추가할 때는 가능하면 id prefix와 type을 처음부터
                               // 일치시키되, 이미 존재하는 사건의 id는 분류가 바뀌어도 유지한다.
  priority:         Number,   // 필수. 1 또는 2.
                               //   1 = 핵심 사건. 누적 감쇠 대상에서 제외, importance='global' 기본값.
                               //   2 = 배경 사건. 3년 지나면 자동으로 화면에서 사라짐
                               //       (단, type이 policy/migration이면 예외 — 시대 배경으로 유지).
  importance:       String,   // 선택. 'global' | 'regional' | 'local'.
                               // 명시하지 않으면 getImportance()가 priority/type으로 자동 추론.
                               // 줌 레벨 필터에 사용 (zoom<5: global만, zoom<6: local 숨김).

  // ── 제목 (다국어) ──
  title_ko:         String,   // 필수. 한국어 제목. connections 매칭에는 더 이상 사용하지 않지만
                               // (과거 호환을 위해) 팝업 표시와 validator의 사람이 읽는 로그에 사용.
  title_en:         String,   // 필수. 영어 제목. 아포스트로피(') 사용 주의 — 문자열 이스케이프가
                               // 깨져 전체 스크립트 파싱이 실패한 사례가 있었음. 가능하면 피할 것
                               // (예: "Japan's" → "Japans" 또는 다른 표현으로).
  title_ja:         String,   // 필수. 일본어 제목.

  // ── 위치 ──
  place_ko:         String,   // 필수. 한국어 지명.
  lat:              Number,   // 필수. 위도. null 금지 (validateCoordinates 검사 대상).
  lng:              Number,   // 필수. 경도. null 금지.
  area:             Boolean,  // 선택. true면 점이 아닌 원형 영역으로 표시 (주로 massacre에 사용).
  areaRadius:       Number,   // area:true일 때만. 반경(미터). 기본값 50000(50km).

  // ── 인물 ──
  people:           Array,    // 필수(빈 배열 허용). 관련 인물 이름 문자열 배열.
                               // 예: ['김구','이봉창']. 정책/국제정세 사건은 빈 배열 []도 정상.

  // ── 서술 ──
  summary_ko:       String,   // 필수. 250~500자 권장. 원인→사건→결과→다음 사건 연결을 담는다.
                               // 논쟑이 있는 사실(피해 규모, 배후, 책임 소재 등)은 단정하지 말고
                               // "다수 연구는 ~로 보지만 이견이 있다" 식으로 층위화해서 서술.

  // ── 미디어 ──
  image:            String,   // 선택. 대표 이미지 경로 (예: 'assets/images/events/1919_31movement.jpg').
                               // 없으면 팝업 카드에 이미지 영역이 그냥 안 보인다 — 필수 아님.
                               // 파일명 규칙: {연도}_{영문이름}.jpg, 공백 금지, 소문자+언더스코어.
                               // 폴더 구분: assets/images/events/ (사건), people/ (인물), places/ (장소/학살현장 등).
                               // 사진은 자료사진·역사사진·지도·삽화·문서이미지만 허용 — 저작권 확인 필수.
  video:            String,   // 선택. YouTube 영상 ID 또는 null. 인물 단위로 일관되게 연결
                               // (예: 홍범도가 등장하는 모든 사건에 같은 영상 ID).

  // ── 관계 ──
  connections:      Array,    // 필수(빈 배열 허용). 다른 사건의 id 문자열 배열.
                               // 지도 위 점선 연결선뿐 아니라, 팝업 카드에도 "관련 사건"으로
                               // 클릭 가능한 링크가 노출된다(클릭 시 해당 연도로 이동·팝업 오픈).
                               // ⚠ title_ko가 아니라 id로만 작성할 것.
                               // 아직 데이터에 없는 미래 연도의 id를 미리 적어둘 수 있음
                               // ("다음 연도의 씨앗") — 그 해 데이터가 추가되면 자동으로 연결됨.

  // ── 메타 ──
  tags:             Array,    // 필수(빈 배열 허용). 검색/필터용 키워드 문자열 배열.
                               // 관례: [type, 지역구분, 주요키워드...] 순서.
                               // 지역구분 예: '조선국내','만주·간도','연해주','상하이','베이징','일본','중국','국제','러시아'
  sources:          Array,    // 필수(빈 배열 허용). 참고한 출처 이름 문자열 배열.
                               // 예: ['한국민족문화대백과사전 홍범도','우리역사넷']
  source_type:      String,   // 선택. 명시하지 않으면 'fact'로 간주.
                               //   'fact'           학계 통설이 정립된 사실. 별도 표시 불필요.
                               //   'interpretation' 사실 자체는 분명하나 해석·평가에 이견이
                               //     있는 경우 (예: "승리의 의의를 어떻게 평가하는가").
                               //   'disputed'       피해 규모, 배후, 주체 등 사실관계 자체에
                               //     학계 이견이 있는 경우 (예: 봉오동 전투 일본군 사상자 수,
                               //     훈춘사건의 배후, 자유시참변 희생자 수). summary_ko 안에서도
                               //     "다수 연구는 ~로 보지만 이견이 있다" 식으로 단정하지 않는
                               //     서술을 유지해야 하며, source_type='disputed'는 그 사실을
                               //     데이터 레벨에서도 표시해 향후 필터/배지 UI에 활용할 수 있게
                               //     한다. (현재 UI에는 아직 반영되지 않음 — 6번 미구현 기능 참고)
  impact_type:      String,   // 선택. 사건이 누구/무엇에 작용했는지의 축. 2026-06 "식민지
                               // 폭력 축 보강" 작업에서 도입. 아래 6종 중 하나(복수 성격을
                               // 띠는 사건은 가장 핵심적인 축 하나만 선택):
                               //   'military'    군사 행동(전투, 출병, 토벌)
                               //   'repression'  감시·검속·투옥·고문 등 직접적 국가폭력
                               //   'cultural'    언어·교육·종교·이름 등 문화·정체성 통제
                               //   'labor'       노동·동원(징용·징병·위안부 동원 등)
                               //   'civilian'    민간인을 향한 생활 통제·피해(학살 포함)
                               //   'resistance'  독립운동·저항 행위 자체
                               // 현재는 신규 추가/보강된 일부 사건에만 시범 적용되어 있고,
                               // 기존 사건 전체로의 일괄 적용은 후속 작업으로 남겨두었다.
  violence_level:   Number,   // 선택. 0~5. 사건이 내포한 국가폭력의 강도.
                               //   0  없음 (조직 결성, 외교 행위 등)
                               //   1  제도적 압박 (차별적 법령, 허가제 등 — 신체적 강제는 없음)
                               //   2  체계적 억압 (감시체제, 검속, 노동조합 탄압 등)
                               //   3  강제·폭력 (태형, 강제동원, 고문 등 신체에 직접 가해짐)
                               //   4  대규모 피해 (다수의 사상자·이재민이 발생한 사건)
                               //   5  학살급 (대량 살해, 의도적 집단 가해)
                               // 등급 판단은 보수적으로: 사실관계가 불확실하면 낮은 등급을
                               // 매기고 summary_ko에서 불확실성을 설명한다.
  victim_group:     Array,    // 선택. 사건의 피해/대상이 된 집단. 복수 가능.
                               // 'civilians' | 'workers' | 'students' | 'women' | 'children'
                               // | 'prisoners' | 'activists' | 'mixed'(특정하기 어려운 경우)
}
```

---

## 예시 — 단발 사건 (전투)

```javascript
{ id:'battle_1920_01', year:1920, visible_from:1920, visible_until:1920,
  month:6, type:'battle', priority:1,
  title_ko:'봉오동 전투', title_en:'Battle of Bongoudong', title_ja:'鳳梧洞戦闘',
  place_ko:'화룡현 봉오동', lat:42.93, lng:129.52,
  people:['홍범도','최진동','안무'],
  summary_ko:'홍범도·최진동·안무의 대한북로독군부 연합부대가 일본군 제19사단 월강추격대(남양수비대와 합류, 약 270명)를 봉오동 골짜기로 유인해 격파했다. 독립군이 일본 정규군을 상대로 거둔 첫 대규모 승리. 일본군 전사자는 임시정부 발표 기준 157명이며, 정확한 규모를 두고는 지금도 학계의 논쟁이 있다.',
  video:'IthyNGuvybk',
  connections:['battle_1920_04','battle_1920_02','battle_1920_03'],
  tags:['battle','만주·간도'],
  sources:[] }
```

## 예시 — 장기 지속 정책

```javascript
{ id:'policy_1925_01', year:1925, visible_from:1925, visible_until:1931,
  month:6, day:11, type:'policy', priority:1,
  title_ko:'미쓰야 협정', title_en:'Mitsuya Agreement', title_ja:'三矢協定',
  place_ko:'펑톈 (만주)', lat:41.8, lng:123.43,
  people:[],
  summary_ko:'1925년 6월 조선총독부 경무국장 미쓰야와 만주 군벌 장쭤린이 협정을 맺었다. ...',
  video:null,
  connections:['battle_1925_01','battle_1924_01'],
  tags:['policy','만주·간도','일제탄압','미쓰야협정'],
  sources:['한국민족문화대백과사전 미쓰야협정'] }
```

## 예시 — 학살 (영역 표시)

```javascript
{ id:'massacre_1923_01', year:1923, visible_from:1923, visible_until:1925,
  month:9, day:1, type:'massacre', priority:1, area:true, areaRadius:40000,
  title_ko:'관동대지진 조선인 학살', title_en:'Kanto Massacre of Koreans', title_ja:'関東大震災朝鮮人虐殺',
  place_ko:'도쿄·요코하마 일대', lat:35.68, lng:139.75,
  people:[],
  summary_ko:'1923년 9월 1일 진도 7.9의 대지진이 도쿄와 관동 일대를 강타했다. ... 희생자 수는 정확히 알 수 없으나 최소 수천 명에 이른다.',
  video:null,
  connections:['policy_1922_01'],
  tags:['massacre','일본','관동대지진','학살'],
  sources:['우리역사넷 관동대지진과 조선인학살'] }
```

## 예시 — 인물 스냅샷 (생애 전체가 아닌 특정 시점)

```javascript
{ id:'person_1925_01', year:1925, visible_from:1924, visible_until:1925,
  month:0, day:null, type:'person', priority:1,
  title_ko:'권기옥 — 한국 최초의 여성 비행사', title_en:'Kwon Gi-ok — First Korean Woman Aviator', title_ja:'権基玉 — 韓国初の女性飛行士',
  place_ko:'윈난 항공학교 (쿤밍)', lat:25.04, lng:102.71,
  people:['권기옥'],
  summary_ko:'평양 출신의 독립운동가 권기옥이 1925년 중국 윈난육군항공학교를 졸업하고 한국 최초의 여성 비행사가 됐다. ...',
  video:null,
  connections:[],
  tags:['person','중국','권기옥','여성','항공'],
  sources:['한국민족문화대백과사전 권기옥'] }
```

이 인물은 1925년 졸업 후 곧 중국군 소속으로 옮겨갔으므로, `visible_until`을 1945가 아니라 1925로 짧게 잡았다 — "그 인물이 평생 그 자리에 있었다"가 아니라 "그 시점에 그 자리에 있었다"를 표현하는 것이 인물 스냅샷의 원칙이다.

---

## 검증 규칙 요약 (validator.js가 자동으로 검사하는 항목)

| 검사 | 함수 | 기준 |
|---|---|---|
| 중복 ID | `validateDuplicateIds()` | 전체 DATA에서 같은 id가 2개 이상 사용되면 오류 |
| 끊어진 연결 | `validateConnections()` | connections의 id가 어떤 사건에도 존재하지 않으면 오류 |
| 잘못된 좌표 | `validateCoordinates()` | lat/lng null, (0,0), 또는 위경도 범위(-90~90, -180~180) 초과 |
| 생명주기 오류 | `validateLifecycle()` | visible_until < visible_from, 또는 year가 그 범위 밖 |
| 고아 이벤트 | `validateOrphans()` | connections가 비어 있고 다른 사건으로부터도 참조되지 않음 |
| 순환 참조 | `validateCircularRefs()` | A→B→...→A 형태의 고리 |
| 누락 연도 | `validateMissingYears()` | 1876~1945 중 데이터가 0건인 해 |
| type 유효성 | `validateEventTypes()` | type이 위 10종(`VALID_EVENT_TYPES`) 외의 값이면 오류 |
| month 범위 | `validateMonthRange()` | month가 0~11 범위 밖이면 오류 (12월을 12로 적는 1-base 혼입 탐지) |
| 빈 사람 배열 비율 | `auditEmptyPeople()` | 오류는 아니지만 비율을 콘솔에 보고 |

`validateAll()`을 호출하면 위 전체를 한 번에 실행한다.
