# Architecture — 기억의 연대기

이 문서는 코드를 처음 보는 사람(또는 다른 AI)이 "데이터가 어디서 와서 어떻게 화면에 그려지는가"를 빠르게 파악할 수 있도록 작성되었다.

---

## 1. 전체 데이터 흐름도

```
data/1920.js ~ 1945.js
  │  (각 파일: const EVENTS_XXXX = [ {...}, {...}, ... ];)
  ▼
app.js
  │  [EVENTS_1920, EVENTS_1921, ...].forEach(arr => DATA[arr[0].year] = arr)
  │  → DATA = { 1920: [...], 1921: [...], ..., 1945: [...] }
  ▼
validator.js
  │  getVisibleEvents(year)
  │  → DATA의 모든 사건을 펼친 뒤(flat), visible_from~visible_until 범위로 필터링
  │  → 누적 감쇠 규칙(3년 이상 지난 priority:2 사건 제거, 단 policy/migration은 예외) 적용
  ▼
renderer.js
  │  safeRender(year) → renderYear(year)
  │  1. clearLayers()        — 이전 프레임의 마커/선 전부 제거
  │  2. getVisibleEvents(year) 호출 → 그 해에 보여야 할 사건 목록 확보
  │  3. 레이어 토글 상태(체크박스)로 한 번 더 필터링
  │  4. drawConnections()    — 살아있는 사건들 사이의 connections를 점선으로 그림
  │  5. 사건 하나씩 순회하며 L.marker 또는 L.circle(학살) 생성 + popupHtml() 바인딩
  │  6. declutterMarkers()   — 화면 좌표가 겹치는 마커들을 부채꼴로 펼침
  ▼
지도 화면 (Leaflet)
```

데이터는 항상 한 방향으로만 흐른다: **data/ → app.js의 DATA → validator.js의 필터 → renderer.js의 화면 출력**. 역방향 의존(예: renderer.js가 data 파일을 직접 import)은 없다.

---

## 2. 지도 렌더링 구조

### 2.1 초기화 시점 (map.js)

```
L.map('map', { ... })           ← Leaflet 인스턴스 생성, 전역 변수 `map`
  → setTimeout(invalidateSize, 800ms)   ← iOS 컨테이너 크기 0×0 버그 대응
  → map.on('zoomend', safeRender(...))  ← 줌 변경 시 importance 기반 밀도 재계산
  → L.tileLayer(Carto dark_all)         ← 배경 타일
  → seaLabelMask (L.rectangle)          ← 동해 표기 보정용 가리개
  → dongHaeLabel (L.marker, 빈 아이콘)   ← "동해 East Sea" 텍스트
  → dokdoMarker (L.marker)              ← 독도 점 + 툴팁
```

### 2.2 매 렌더링 시점 (renderer.js의 renderYear)

각 사건(`e`)에 대해:

1. **좌표 방어**: `e.lat == null || e.lng == null` → 건너뛰고 콘솔 경고.
2. **줌 레벨 필터**: `getImportance(e)`가 `'global'`이 아니면 줌 5 미만에서는 숨김. `'local'`이면 줌 6 미만에서도 숨김.
3. **레이어 토글 필터**: `type`이 `person`/`policy`/그 외로 분기해 체크박스 상태 확인.
4. **불투명도 계산**: 사건 발생연도와의 거리에 비례해 점점 흐려짐 (최소 0.15).
5. **마커 또는 원 생성**:
   - `e.area === true`인 경우(학살): `L.circle`로 반경(`areaRadius`, 기본 50km)을 가진 영역 표시.
   - 그 외: `L.divIcon` 기반 점 마커. 그 해 발생한 사건(`isCurrentYear`)에는 펄스 애니메이션(`pulse-ring`) 추가.
6. **팝업 바인딩**: `popupHtml(e)`가 생성한 HTML을 붙임. `autoPan:true`로 화면 잘림 방지.

### 2.3 마커 겹침 해소 (declutterMarkers)

같은 도시(예: 경성)에 여러 사건이 몰리면 화면 좌표 기준 22px 이내의 마커들을 그룹으로 묶어, 그룹 중심에서 부채꼴로 펼쳐 재배치한다. 펼쳐진 마커에는 원래 위치를 가리키는 가는 선(`leg`)이 함께 그려진다. 이 재배치는 **위경도 좌표 자체를 바꾸지 않고** 화면 표시 위치(`marker.setLatLng`)만 바꾸므로, 데이터의 역사적 정확성은 그대로 유지된다. 원본 좌표는 `marker._origLatLng`에 보존되어 매 렌더링마다 원위치 기준으로 재계산된다.

---

## 3. 이벤트 연결(connections) 구조

### 3.1 ID 체계

모든 사건은 `id` 필드를 가진다. 형식: `{type}_{year}_{순번}` (예: `battle_1920_01`, `person_1921_05`).

```javascript
{ id:'battle_1920_01', year:1920, ..., connections:['massacre_1920_01','battle_1920_02'] }
```

`connections`는 **제목 문자열이 아니라 ID로만** 참조한다 (과거에는 한글 제목으로 참조했으나, 제목이 수정되면 연결이 깨지는 문제가 있어 ID 기반으로 전환했다). 이 원칙은 절대 되돌리지 말 것.

### 3.2 연결선 렌더링 (drawConnections)

```javascript
function drawConnections(events){
  const renderedEdges = new Set();          // 중복선 방지용
  const idMap = Object.fromEntries(events.map(v=>[v.id, v]));
  events.forEach(e=>{
    (e.connections||[]).forEach(c=>{
      const target = idMap[c];               // 화면에 없는 ID는 자동 무시
      if(!target) return;
      const key = [...].sort().join('|');    // 좌표 기반 dedupe 키
      if(renderedEdges.has(key)) return;
      renderedEdges.add(key);
      L.polyline([...], {...}).addTo(map);
    });
  });
}
```

연결 대상이 그 해 화면에 없으면(`idMap`에 없으면) 조용히 무시된다 — 이건 의도된 동작이다. 예를 들어 1931년 사건이 1933년 사건을 미리 가리키는 "다음 연도의 씨앗" 연결은, 1933년 데이터가 추가되기 전까지는 그려지지 않고 `validateConnections()`가 경고만 띄운다.

### 3.3 무결성 검증

`validator.js`의 `validateConnections()`가 전체 DATA를 대상으로, 모든 `connections` 항목이 실제로 존재하는 `id`를 가리키는지 검사한다. 페이지 로드 시 자동 실행되며, 콘솔에 누락 건을 출력한다.

---

## 4. 연도 전환 구조

```
사용자가 슬라이더를 움직임 (input 이벤트, timeline.js)
  ▼
1. yearNum, ganji(干支) 텍스트 갱신
2. map.closePopup()              — 열려 있던 팝업 닫기
3. safeRender(y)                 — 지도 재렌더링 (renderer.js)
4. updateEra(y)                  — 시대 부제/설명 갱신 (timeline.js, ERA 객체 조회)
5. 1945년 이상이면:
     - 화면 가장자리 비네트(occupation-vignette) 투명도 0으로 (식민 통치 표시 해제)
     - "광복 · 해방" 텍스트로 전환
   1945년 미만이면:
     - getEraTint(y)로 계산한 색을 비네트에 적용 (1920 핏빛 → 1945 금빛 점진 전환)
     - "조선총독부 통치하" 텍스트 유지
```

干支 계산(`getGanji`)은 app.js에 있으며 1864년 갑자년을 기준으로 60갑자 순환을 계산하므로, 1920~1945 범위를 벗어난 연도를 슬라이더 범위에 추가해도 자동으로 맞는 干支가 나온다.

---

## 5. 레이어 구조

세 가지 레이어가 독립적으로 토글된다 (`ui.js`에서 체크박스 이벤트 등록):

| 레이어 | 대상 type | 기본값 |
|---|---|---|
| 사건 | `battle`, `righteous`, `political`, `plot`, `massacre`, `movement`, `migration`, `organization` (즉 person/policy를 제외한 전체) | ON |
| 인물 | `person` | OFF |
| 배경·정책 | `policy` | ON |

레이어 필터는 `renderer.js`의 `renderYear()` 안에서 **마커 렌더링**과 **연결선 렌더링** 양쪽에 동일하게 적용된다 (`showEvent`/`showPerson`/`showPolicy`와 `showEvent2`/`showPerson2`/`showPolicy2`로 변수명은 분리되어 있으나 로직은 동일 — 이는 리팩토링 시 하나의 헬퍼 함수로 통합할 수 있는 부분이다).

`importance`(`global`/`regional`/`local`) 기반 줌 필터는 레이어 토글과는 별개의 축으로, `getImportance()`가 명시적 `importance` 필드가 없으면 `priority`와 `type`으로 자동 추론한다.

---

## 7. 지도 계층 구조 — Base / Overlay / Labels 분리 (전환 진행 중)

### 7.1 가리개와 라벨 분리의 차이 — 반드시 구분할 것

> **가리개는 버그 회피다. 라벨 분리는 구조 해결이다.**

이 둘을 같은 것으로 혼동하면 안 된다.

- **가리개(legacy_mode)**: 라벨이 포함된 타일을 그대로 쓰고, 문제가 되는 라벨 위에 우리 색의 사각형을 덮어 "안 보이게" 만든다. 원본 데이터에는 여전히 일본해 표기가 존재하며, 우리는 그 위에 무언가를 얹어 가리고 있을 뿐이다. 좌표 추정이 틀리거나 타일 스타일이 바뀌면 다시 드러난다. **표시는 발생하지만 화면에서 숨겨지는 구조.**
- **라벨 분리(world_mode)**: 타일 자체에 라벨이 없는 버전(`dark_nolabels`)을 쓴다. 일본해라는 글자가 애초에 그 타일 이미지 안에 존재하지 않는다. 우리는 빈 캔버스 위에 우리가 원하는 지명만 그린다. **표시 자체가 발생하지 않는 구조.**

지도 계층은 세 층으로 나눠 생각한다.

```
┌─────────────────────────────────┐
│  Labels   (우리가 직접 그리는 지명) │  ← L.marker(divIcon), 우리가 전부 제어
├─────────────────────────────────┤
│  Overlay  (사건 마커, 연결선, 가리개 등) │  ← renderer.js가 매 렌더링마다 그림
├─────────────────────────────────┤
│  Base     (배경 타일 이미지)         │  ← L.tileLayer, Carto에서 받아옴
└─────────────────────────────────┘
```

### 7.2 현재 상태 (legacy_mode)

```
Base    = dark_all (라벨 포함 — 일본해 표기가 이 레이어 안에 존재)
Overlay = seaLabelMask (가리개 사각형) + 사건 마커/연결선
Labels  = dongHaeLabel, dokdoMarker (동해/독도 2개만 직접 렌더링)
```

`Base` 레이어 자체가 라벨을 포함하고 있어서, `Overlay`에 가리개를 추가로 얹어야 하는 구조다.

### 7.3 목표 상태 (world_mode, 미적용)

```
Base    = dark_nolabels (라벨 전혀 없음 — 일본해 표기가 원천적으로 존재하지 않음)
Overlay = 사건 마커/연결선 (가리개 불필요 — 가릴 대상이 없으므로)
Labels  = 우리가 필요하다고 판단한 모든 지명을 직접 렌더링
          (동해/독도/서울/도쿄 + 우리 데이터에 등장하는 주요 도시 전체)
```

`Base`가 깨끗한 빈 캔버스이므로 `Overlay`에서 가리개라는 임시조치 자체가 필요 없어진다. 대신 `Labels` 계층이 할 일이 늘어난다 — 지금까지 타일이 공짜로 보여주던 모든 지명을, 이제 우리가 데이터로 만들어 직접 그려야 한다.

### 7.4 구조 전환 진행 상황 (코드 레벨 검증 완료, 화면 검증 미완료)

**이번 스프린트 목표였던 것**: "동해를 해결하는 것"이 아니라 "동해를 해결할 수 있는 구조가 존재하는가"를 검증하는 것. 시대별 전체 지명 제작, 1940년 전체 고증, 성능 최적화, 1000개 라벨 대응은 의도적으로 범위에서 제외했다.

구현된 것:

- **`places/places_min.js`**: 최소 검증용 지명 3개(`east_sea`, `dokdo`, `gyeongseong`). schema에 `id`/`lat`/`lng`/`display_name`/`current_name`/`aliases`/`from`/`until`/`category`/`importance`/`notes` 전체 필드 포함.
- **`js/historicalLabels.js`**: `renderLabels()`, `clearLabels()`, `updateHistoricalLabels()`, `renderHistoricalLabels()`(외부 진입점) 인터페이스 구현. `HISTORICAL_LABELS_ENABLED` feature flag로 기본 비활성.
- **`js/map.js`**: `MAP_MODE.current`를 실제로 읽어 타일 URL을 분기하도록 수정(이전에는 선언만 있고 하드코딩된 URL을 그대로 썼다 — 이번에 실제 분기 연결). `legacy` 모드일 때만 `seaLabelMask`/`dongHaeLabel`/`dokdoMarker`를 생성하도록 조건문으로 감쌌다(이전에는 무조건 생성).

코드 레벨로 검증한 것 (Node.js로 로직만 분리 실행, 결과 전부 통과):

1. `MAP_MODE.current`를 `'legacy'`→`'world'`로 바꾸면 타일 URL이 실제로 `dark_nolabels`로 바뀐다.
2. `PLACES_MIN`에 `display_name: '서울'`인 항목이 없고 `display_name: '경성'`인 항목이 있다 — 즉 외부(현대) 지명이 아니라 프로젝트가 정한 시대 지명만 표시 대상이 된다.
3. `PLACES_MIN`에서 **화면에 렌더링되는 필드**(`display_name`, `aliases`)에는 `"日本海"`/`"Sea of Japan"` 문자열이 존재하지 않는다. 어느 연도(1920·1945·1950)에서도 실제 출력 텍스트는 "동해 East Sea / 독도 / 경성"뿐이다. (주의: `east_sea`의 `notes` 필드에는 "외부 타일이 日本海/Sea of Japan으로 표기하는 문제"를 *서술하는* 문장으로 그 문자열이 포함되어 있다. 그러나 `renderLabels()`는 `notes`를 참조하지 않으므로 화면에 노출되지 않는다 — 이전 판본은 "PLACES_MIN 전체에 존재하지 않는다"고 적었으나 이는 부정확했고, 정확히는 "렌더링 경로에 도달하지 않는다"이다.)
4. `isPlaceVisible()` 함수가 연도 필터를 정확히 적용한다 (경성: 1920년 표시O, 1950년 표시X / 동해: 연도 무관 항상 표시O).

**검증하지 못한 것 (그대로 인정)**:

- 실제 브라우저에서 `dark_nolabels` 타일이 응답하는지 — 이 환경의 네트워크 제약으로 여전히 확인 불가.
- `historicalLabels.js`가 실제 Leaflet 지도 위에 라벨을 그렸을 때 시각적으로 올바르게 보이는지 — `HISTORICAL_LABELS_ENABLED = false`로 기본 비활성 상태이며, 화면 스크린샷은 제출하지 않았다 (요청받은 작업 범위에서 명시적으로 제외됨).

**현재 상태: `MAP_MODE.current = 'legacy'`, `HISTORICAL_LABELS_ENABLED = false` 유지.** 즉 지금 이 코드를 그대로 실행하면 이전과 동일하게 동작한다 — 이번 스프린트는 "전환 가능한 구조를 마련했다"는 것이고 "전환했다"는 것이 아니다. 두 플래그를 모두 켜면 world 모드로 전환되는데, 이것이 실제로 일본해 없이 정상 동작하는지는 다음 단계에서 사용자가 직접 브라우저로 확인해야 한다.

**현재 결론: `MAP_MODE.current`는 여전히 `'legacy'`로 유지한다.** `seaLabelMask`를 제거하는 것은 다음이 모두 확인된 뒤에 진행한다 — (1) 실제 브라우저에서 `dark_nolabels` 접근 가능 여부, (2) 우리 데이터의 주요 지명 라벨셋 구축. 둘 다 미완료 상태이므로, 완료 조건("표시 자체가 발생하지 않는 구조")은 아직 충족되지 않았다.

## 8. 향후 확장 시 지켜야 할 원칙

1. **데이터와 로직을 절대 다시 합치지 말 것.** `data/` 폴더의 파일은 순수 데이터 선언만 담아야 한다.
2. **connections는 항상 ID 기반.** 제목 기반 참조로 되돌리면 리팩토링 비용이 기하급수적으로 커진다.
3. **새 연도/시대 추가 시 `app.js`의 등록 배열과 `index.html`의 `<script>` 태그 양쪽에 추가해야 한다.** (자동화되어 있지 않음 — 향후 `data/index.js`로 파일 목록 자체를 동적 생성하는 방식 고려 가능)
4. **동해/독도 보정 원칙(올바른 명칭 표기)은 시대와 무관하게 항상 유지.** 단, 구현 방식(가리개 vs 라벨분리)은 7번에서 설명한 대로 전환 가능하며, 전환 시 7.4의 검증 절차를 다시 따를 것.
5. **`seaLabelMask`(가리개)를 제거하는 조건**: (a) 실제 브라우저에서 `dark_nolabels` 타일 접근이 정상 확인되고, (b) 우리 데이터의 주요 지명에 대한 라벨셋이 구축되어 `Labels` 계층이 현재 `Base`가 제공하던 정보량을 대체할 수 있을 때. 둘 중 하나라도 미충족이면 가리개를 유지한다 — 라벨 분리가 미완성인 상태에서 가리개를 먼저 지우면 일본해 표기가 그대로 노출되는 더 나쁜 상태로 후퇴한다.
