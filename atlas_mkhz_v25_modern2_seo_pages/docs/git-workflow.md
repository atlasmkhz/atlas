# Git 워크플로우 (ATLAS by MKHZ)

이 문서는 `atlas-history` 저장소를 어떻게 다루는지에 대한 운영 규칙이다.
**핵심 원칙: 수정은 Git에 남고, 공개는 자동으로 이루어진다.** ZIP을 만들어 수동으로 업로드하던 방식은 이 시점부터 폐기한다.

---

## 1. 전체 구조

```
Claude가 로컬에서 수정
        ↓
   git commit
        ↓
   (두목님) git push
        ↓
Cloudflare Pages가 GitHub 변경을 감지
        ↓
   자동 Build (빌드 명령 없음 — 정적 사이트 그대로 서빙)
        ↓
   atlas.mkhz.kr 자동 갱신
```

**클로드가 직접 할 수 있는 것**: 로컬 작업 디렉터리에서 파일 수정 + `git commit`까지.
**두목님이 직접 해야 하는 것**: 최초 GitHub 저장소 생성·연결, 그리고 매번의 `git push`. 클로드는 GitHub 인증 토큰을 다루지 않는다 — 이건 보안 원칙상 클로드가 입력받아서는 안 되는 정보다.

---

## 2. 커밋 규칙

형식: `type: 설명` (영문 소문자 type + 콜론 + 한 줄 설명, 한글 가능)

| type | 용도 | 예시 |
|---|---|---|
| `data` | 연도/인물/사건 데이터 추가·수정 | `data: add 1919 regional movements` |
| `feature` | 새 기능 추가 | `feature: add search UI` |
| `fix` | 버그 수정 | `fix: adjust world map view` |
| `seo` | SEO/메타데이터 | `seo: update metadata` |
| `content` | 콘텐츠성 보강(데이터와 겹칠 수 있으나 서술·태그 보강 위주일 때) | `content: add 제주 항일운동` |
| `deploy` | 배포·인프라 관련 | `deploy: release update` |
| `docs` | 문서만 변경 | `docs: update deployment guide` |
| `style` | 동작 변화 없는 CSS/레이아웃 조정 | `style: tighten right-stack spacing` |

하나의 커밋은 하나의 의미 단위로 묶는다 — "여러 작업을 한 커�밋에 다 때려넣기" 금지.

---

## 3. 브랜치 전략

- **`main`**: 운영(atlas.mkhz.kr에 자동 배포되는 브랜치). 직접 수정 금지.
- **`develop`**: 작업 브랜치. 클로드의 모든 변경은 기본적으로 여기에 커밋된다.

```
작업 → develop 커밋 → (두목님 검수) → main으로 merge → 자동 배포
```

긴급 수정이 아닌 한, `develop`에서 충분히 확인한 뒤 `main`으로 merge하는 흐름을 따른다. Cloudflare Pages는 `main` 브랜치를 운영 배포 대상으로 추적하도록 설정한다(Preview 배포로 `develop`도 별도 미리보기 URL을 받을 수 있다 — Cloudflare Pages 기본 기능).

---

## 4. push 이후 자동/수동 확인

push(정확히는 `main`에 merge)가 일어나면 Cloudflare가 자동으로 빌드·배포한다. 그 직후 **두목님이 직접** 확인해야 하는 것 (클로드는 실제 배포된 atlas.mkhz.kr을 브라우저로 볼 수 없다):

- [ ] Cloudflare 대시보드에서 Build 성공 표시
- [ ] 사이트가 정상적으로 열리는지
- [ ] 검색 정상 동작
- [ ] 지도 정상 동작
- [ ] 브라우저 콘솔에 에러 없는지
- [ ] 404 페이지 정상

**Build가 실패하면 자동 배포가 중단되고 이전 버전이 계속 운영된다** (Cloudflare Pages의 기본 동작 — 실패한 빌드가 운영을 덮어쓰지 않는다). 실패 시 Cloudflare 빌드 로그를 클로드에게 붙여주면 원인을 같이 진단할 수 있다.

---

## 5. 데이터 추가 원칙

새 연도/인물/사건을 추가하는 흐름은 지금까지와 동일하다 — Git이 그 위에 얹히는 것일 뿐, 데이터 작업 방식 자체는 바뀌지 않는다.

```
data/1876.js 작성
   ↓
index.html에 <script> 태그 추가, app.js의 DATA 조립 배열에 한 줄 추가
   ↓
헤드리스 검증 (문법, 중복 ID, 끊긴 connections, lifecycle, 좌표)
   ↓
git commit (data: ...)
   ↓
(두목님) git push → main 자동 배포
   ↓
검색은 자동으로 새 데이터를 반영한다 (js/search.js가 매번 DATA를 통째로
훑으므로, 별도 인덱스를 다시 만들 필요가 없다 — 검색 로직 자체는
수정하지 않는다)
```

**검색 로직 수정 금지** — 데이터가 늘어나도 `js/search.js`의 매칭 함수는 그대로 둔다. 데이터 규모가 수만 건 단위로 커지면(예: 세계사 전체 편입) 그때 가서 인덱싱을 재검토한다.

---

## 6. 운영 원칙

- 사용자는 `atlas.mkhz.kr`에 접속만 한다.
- 관리자(두목님)는 GitHub 저장소를 통해서만 변경한다.
- **운영 중인 사이트 파일을 Cloudflare 대시보드에서 직접 고치지 않는다** — 그렇게 하면 Git 기록과 실제 운영 상태가 어긋나, 다음 push 때 그 수정이 통째로 덮어써져 사라진다.
- 모든 변경은 반드시 Git 커밋으로 남는다. "급해서 그냥 고쳤다"는 예외를 만들지 않는다.

---

## 7. 미래 확장과의 관계

선사~현대, 세계사, 다국어로 확장되더라도 이 워크플로우 자체는 바뀌지 않는다. 예정된 데이터 구조 확장(`data/korea/`, `data/world/`, `data/person/`, `data/event/` 등)이 오더라도, "Claude 수정 → commit → push → 자동 배포"라는 흐름은 그대로 유지된다. 이게 이번에 Git 구조로 전환하는 이유다 — 데이터가 커질수록 ZIP 수동 업로드는 점점 더 비효율적이고 실수하기 쉬워지기 때문이다.
