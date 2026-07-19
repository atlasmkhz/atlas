// ═══════════════════════════════════════════════════════
// search.js — 검색 기능: 기존 지도 데이터를 인물·사건 관점으로 다시 그린다
// 의존: app.js (DATA, COLORS, TYPE_LABEL), map.js (map, resetToInitialView,
//       INITIAL_MAP_VIEW), renderer.js (clearLayers, layers, eventMarkers,
//       popupHtml, declutterMarkers, safeRender)
//
// 원칙 (지시서 그대로):
//   - 검색용 데이터셋·인덱스를 새로 만들지 않는다. 매번 DATA를 그대로
//     펼쳐서(allMapData) filter() 한 결과만 그린다. 데이터가 늘어나도
//     (연도·시대 확장) 이 파일은 손댈 필요가 없다.
//   - 검색은 "연도를 나누는 기능"이 아니라 "주제를 모으는 기능"이다.
//     visible_from/visible_until 같은 연도 생명주기 필터를 적용하지 않고,
//     매칭된 사건을 시대와 무관하게 전부 보여준다.
//   - 검색 결과에는 연결선(drawConnections)을 그리지 않는다.
//   - 마커 모양·팝업(popupHtml)·클릭 UI는 기존 것을 그대로 재사용한다.
// ═══════════════════════════════════════════════════════

let searchActive = false;
function isSearchActive(){ return searchActive; }

// 매번 DATA에서 새로 펼친다 — 별도 인덱스를 캐싱하지 않음.
// (이번 작업의 데이터 규모(수백 건)에서는 매 검색마다 펼쳐도 300ms 목표에
// 문제없다. 데이터가 수만 건 단위로 커지면 캐싱을 재검토할 것.)
function getAllEvents(){
  return Object.values(DATA).flat();
}

// 검색 매칭 기준: 제목(title_ko) 부분일치 OR 인물(people[]) 부분일치.
// 장소·연도·태그는 지시서에서 명시적으로 검색 범위 밖이므로 보지 않는다.
// (지시서의 의사코드는 people.includes(query)로 "정확히 일치"하는 항목만
// 찾지만, 실사용에서는 "김"만 입력해도 "김구"가 걸리는 게 자연스러우므로
// people 배열 각 이름에 대해서도 부분일치로 완화했다.)
//
// 공백 제거 비교도 함께 한다 — 지시서 예시 자체가 "봉오동전투"(붙여쓰기)인데
// 실제 데이터의 제목은 "봉오동 전투"(띄어쓰기)다. 띄어쓰기 한 칸 때문에
// 검색이 안 되면 사용자에게는 버그처럼 보이므로, 공백을 무시한 비교를
// 추가로 시도한다. (헤드리스 테스트 중 실제로 이 사례를 발견해 반영함.)
function normalize(s){ return (s||'').toLowerCase().replace(/\s+/g,''); }
function matchEvent(e, query){
  const q = query.trim().toLowerCase();
  if(!q) return false;
  const qNorm = normalize(q);
  if(e.title_ko){
    const t = e.title_ko.toLowerCase();
    if(t.includes(q) || normalize(t).includes(qNorm)) return true;
  }
  if(Array.isArray(e.people) && e.people.some(name => {
    if(!name) return false;
    const n = name.toLowerCase();
    return n.includes(q) || normalize(n).includes(qNorm);
  })) return true;
  return false;
}

function searchEvents(query){
  return getAllEvents().filter(e => matchEvent(e, query));
}

// 검색 결과 렌더링. renderYear()와의 차이:
//   - 연도 필터 없음 (전 시대 동시 표시)
//   - 레이어 토글(인물/사건/정책) 무시 — 검색은 그 토글들이 통제하는
//     "연도별 밀도"와 별개의 모드이므로, 매칭된 것은 토글 상태와 무관하게
//     전부 보여준다.
//   - 줌 단위 importance 축소 없음 — 검색 결과는 보통 소수이므로 전부 표시.
//   - 생명주기 기반 opacity 계산 없음 — "당해 연도"라는 개념이 없으므로
//     모든 결과를 동일한 진하기로 표시.
//   - drawConnections() 호출하지 않음 — 점들을 선으로 잇지 않는다.
//   - 마커 아이콘 모양·팝업 내용(popupHtml)·declutter(겹침 펼치기)는
//     기존 로직을 그대로 재사용한다.
function renderSearchResults(results){
  clearLayers();
  eventMarkers = [];

  results.forEach(e=>{
    if(e.lat == null || e.lng == null) return;
    const color = COLORS[e.type];

    // areaRadius 원형 제거 (2026-07-19): 수채화 분포·세력권 레이어와 중복. 사건 접근은 일반 마커가 담당.

    const icon = makeMarkerIcon(e.type, { color, opacity:1, pulse:true });
    const m = L.marker([e.lat,e.lng], {icon}).addTo(map);
    m.on('click', ()=>{
      if(window.openInfoPanel) openInfoPanel(popupHtml(e));
      if(typeof setSelectRing === 'function'){ try{ setSelectRing(m); }catch(_){} }
    });
    attachSelectRing(m);
    m._origLatLng = [e.lat, e.lng];
    m._eventColor = color;
    m._eventId = e.id;
    eventMarkers.push(m);
    layers.push(m);
  });

  declutterMarkers();
}

// 검색 상태(결과 N개 / 검색 결과가 없습니다)를 입력창 바로 아래 한 줄로
// 표시한다. 이전 버전의 별도 박스+자동소멸 타이머는 제거했다 — 이제
// 입력창이 검색 중 계속 열려 있는 구조라, 상태는 다음 검색/해제 때까지
// 그대로 보여주는 쪽이 더 예측 가능하다.
function setStatus(text, isError){
  const el = document.getElementById('searchStatus');
  if(!el) return;
  el.textContent = text || '';
  el.classList.toggle('no-result', !!isError);
}

// 검색 실행 — Enter, [🔍] 버튼에서 호출.
function runSearch(query){
  const trimmed = (query||'').trim();
  if(!trimmed) return; // 빈 검색어는 무시 (지도 변화 없음)

  const results = searchEvents(trimmed);
  const clearBtn = document.getElementById('searchClearBtn');
  if (window.trackSearch) window.trackSearch(trimmed, results.length);

  if(!results.length){
    // 결과 없음: 지도는 직전 상태 그대로 유지하고 상태 줄에만 표시한다.
    // 입력값은 남아 있으니 ×로 바로 지울 수 있게 둔다.
    setStatus('검색 결과가 없습니다', true);
    if(clearBtn) clearBtn.style.display = 'inline-flex';
    return;
  }

  setStatus(`결과 ${results.length}개`, false);
  searchActive = true;
  if(clearBtn) clearBtn.style.display = 'inline-flex';

  renderSearchResults(results);

  // 자동 줌: 결과가 모두 화면에 들어오도록.
  if(results.length === 1){
    map.setView([results[0].lat, results[0].lng], Math.max(map.getZoom(), 7));
  } else {
    const bounds = L.latLngBounds(results.map(e=>[e.lat, e.lng]));
    map.fitBounds(bounds, { padding:[70,90], maxZoom:9 });
  }
}

// 검색 해제 — 입력행 안의 [×] 버튼.
// "초기 화면 복귀"는 카메라(지도 위치·줌)는 INITIAL_MAP_VIEW로, 내용은
// 현재 타임라인 슬라이더가 가리키는 연도의 평소 화면으로 되돌리는 것으로
// 해석했다 — 이 프로젝트의 메인 화면은 원래 "연도별 보기"이므로, 검색을
// 풀면 그 평소 모드로 돌아가는 것이 자연스럽다. 데스크톱에서는 검색
// 위젯도 다시 접는다(모바일은 CSS가 항상 펼침 상태를 강제하므로 영향 없음).
function clearSearch(){
  searchActive = false;
  setStatus('', false);

  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('searchClearBtn');
  const widget = document.getElementById('searchWidget');
  if(input) input.value = '';
  if(clearBtn) clearBtn.style.display = 'none';
  if(widget) widget.classList.remove('open');

  resetToInitialView();

  if (typeof renderCurrentChapter === 'function') {
    renderCurrentChapter();
  }
}

// ── UI 이벤트 연결 ──
// 이 스크립트는 검색 UI 요소들이 이미 DOM에 존재하는 시점(body 하단)에
// 로드되므로 DOMContentLoaded를 기다릴 필요가 없다.
(function bindSearchUI(){
  const widget = document.getElementById('searchWidget');
  const toggleBtn = document.getElementById('searchToggleBtn');
  const input = document.getElementById('searchInput');
  const runBtn = document.getElementById('searchRunBtn');
  const clearBtn = document.getElementById('searchClearBtn');

  // 접힘 → 펼침. 모바일에서는 toggleBtn 자체가 숨겨져 있어(CSS) 클릭될 일이
  // 없고, 위젯은 이미 항상 펼쳐진 모양으로 보인다.
  if(toggleBtn && widget){
    toggleBtn.addEventListener('click', ()=>{
      widget.classList.add('open');
      if(input) input.focus();
    });
  }

  if(runBtn) runBtn.addEventListener('click', ()=> runSearch(input ? input.value : ''));
  if(input){
    input.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter'){
        e.preventDefault();
        runSearch(input.value);
      }
    });
    // 아무것도 입력하지 않은 채 입력창 밖을 클릭하면 다시 접는다.
    // (데스크톱 전용 동작 — 모바일은 CSS가 항상 펼침을 강제해 영향 없음.)
    input.addEventListener('blur', ()=>{
      setTimeout(()=>{
        if(widget && !searchActive && !input.value.trim()){
          widget.classList.remove('open');
        }
      }, 120); // × 버튼 클릭이 blur보다 먼저 처리되도록 살짝 지연
    });
  }
  if(clearBtn) clearBtn.addEventListener('click', clearSearch);
})();
