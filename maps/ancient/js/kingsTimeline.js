// ═══════════════════════════════════════════════════════
// js/kingsTimeline.js — 연도 슬라이더 + 왕대 연표 (고대 지도 전용)
//
// 2026-08-05 신설 (왕두목 지시): "백년 단위 하단 슬라이드 + 우측 연표".
//
// ■ 해상도 분리 원칙 — 이 모듈의 핵심 설계
//   왕의 재위는 『삼국사기』에 연 단위 기록이 있지만, 영토는 그런 기록이
//   없다. 그래서 슬라이더는 연 단위로 움직이되:
//     - 우측 연표(왕)는 그 해에 정확히 맞춰 갱신하고
//     - 수채화 세력도는 가장 가까운 스냅샷을 띄우며 "◯◯년경 기준"을
//       명시한다 (백년마다 지도를 "정확히" 그리는 것은 거짓 정밀성이다)
//
// ■ 기존 시스템과의 관계
//   - 세력도 렌더링은 territoryLayer.js의 _renderSnapshot()을 그대로
//     사용한다 (수채화 스타일 유지 — 왕두목 지시).
//   - 스냅샷 칩(#territoryChips)은 슬라이더가 대체하므로 CSS로 숨긴다.
//   - 챕터 전환(renderTerritoryForRange)이 스냅샷을 바꾸면 슬라이더와
//     연표를 그쪽에 동기화한다 (아래 래핑 참고).
//   - 왕 이름 클릭 → 기존 검색(runSearch)으로 연결. 인물 카드가 있는
//     왕은 카드가, 없는 왕은 관련 사건이 뜬다 — 별도 매핑표를 만들지
//     않아 카드가 늘어나면 저절로 연결이 풍부해진다.
//
// 의존: data/kings_timeline.js(KINGS_TIMELINE),
//       data/territory_snapshots.js, js/territoryLayer.js, js/search.js
// ═══════════════════════════════════════════════════════

(function(){
  if (typeof KINGS_TIMELINE === 'undefined') return;

  var YEAR_MIN = -60, YEAR_MAX = 936;
  var curYear = 450;   // 초기값 — 첫 챕터 동기화가 곧 덮어쓴다
  var panelOpen = window.innerWidth > 860; // 데스크톱은 펼침, 모바일은 접힘

  function fmtYear(y){ return y < 0 ? '기원전 ' + (-y) + '년' : y + '년'; }
  function fmtYearShort(y){ return y < 0 ? 'BC' + (-y) : String(y); }
  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  // ── 마크업 주입 ─────────────────────────────────────
  // 슬라이더는 기존 하단 타임라인 박스 맨 위에 끼워 넣는다 — 별도
  // 고정 배치보다 기존 레이아웃(모바일 포함)과 충돌하지 않는다.
  function injectSlider(){
    var tl = document.querySelector('.timeline');
    if (!tl) return;
    var bar = document.createElement('div');
    bar.id = 'yearSliderBar';
    bar.innerHTML =
      '<div class="ys-head">' +
        '<span class="ys-year" id="ysYear"></span>' +
        '<span class="ys-snap" id="ysSnap"></span>' +
        '<button type="button" class="ys-kings-toggle" id="ysKingsToggle">왕대 연표</button>' +
      '</div>' +
      '<div class="ys-track">' +
        '<div class="ys-band" id="ysBand"></div>' +
        '<div class="ys-marks" id="ysMarks"></div>' +
        '<input type="range" id="ysRange" min="' + YEAR_MIN + '" max="' + YEAR_MAX + '" step="1" value="' + curYear + '">' +
      '</div>' +
      '<div class="ys-scale" id="ysScale"></div>';
    tl.insertBefore(bar, tl.firstChild);

    var range = bar.querySelector('#ysRange');
    // 드래그 중(input)에는 가벼운 갱신만(연표+수채화), 손을 뗀 순간(change)에
    // 챕터를 동기화한다 — 드래그 프레임마다 사건 마커 전체를 다시 그리면
    // 무겁고, 슬라이더와 하단 챕터 블록이 따로 노는 문제(왕두목 지적)는
    // change 시점 동기화로 해결된다.
    range.addEventListener('input', function(){
      setYear(parseInt(range.value, 10), { renderTerritory: true, fromSlider: true });
    });
    range.addEventListener('change', function(){ syncChapterToYear(); });
    bar.querySelector('#ysKingsToggle').addEventListener('click', function(){
      setPanelOpen(!panelOpen);
    });
    syncTimelineHeight();
    window.addEventListener('resize', syncTimelineHeight);
  }

  // ── 슬라이더 ↔ 챕터 시각 동기화 ──────────────────────
  // 하단 챕터 블록은 균등폭 버튼(350년짜리 시기와 16년짜리 시기를 같은
  // 크기로)이라 시간 비례 배치가 아니다 — 그래서 슬라이더 위치와 블록
  // 위치가 눈으로는 어긋나 보인다(왕두목 지적). 블록 폭을 시간 비례로
  // 바꾸면 16년짜리 '나당전쟁' 블록은 누를 수 없이 좁아지므로, 대신
  // 슬라이더 트랙 쪽에 챕터 경계 눈금을 새기고 현재 챕터 구간을 금색
  // 밴드로 칠해 "지금 어느 블록 구간에 있는지"를 트랙 위에서 보여준다.
  function pct(y){ return ((y - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * 100; }

  function buildScale(){
    var marks = document.getElementById('ysMarks');
    var scale = document.getElementById('ysScale');
    if (!marks || !scale) return;
    if (typeof BLOCKS !== 'undefined'){
      var mh = BLOCKS.map(function(b){
        return '<i style="left:' + pct(b.start_year).toFixed(2) + '%"></i>';
      }).join('') + '<i style="left:100%"></i>';
      marks.innerHTML = mh;
    }
    // 연도 라벨은 실제 위치에 비례 배치한다 — 예전의 균등 분배(space-
    // between)는 450 라벨이 438년 자리에 서는 식으로 눈금과 어긋났다.
    var labels = [-60, 200, 450, 700, 936];
    scale.innerHTML = labels.map(function(y, i){
      var cls = i === 0 ? ' style="transform:none"' :
                i === labels.length - 1 ? ' style="transform:translateX(-100%)"' : '';
      return '<span' + cls + ' data-p="' + pct(y).toFixed(2) + '">' +
             (y < 0 ? '기원전 ' + (-y) : y) + '</span>';
    }).join('');
    Array.prototype.forEach.call(scale.children, function(el){
      el.style.left = el.getAttribute('data-p') + '%';
    });
  }

  function updateBand(){
    var band = document.getElementById('ysBand');
    if (!band || typeof BLOCKS === 'undefined' || typeof blockIndexForYear !== 'function') return;
    var b = BLOCKS[blockIndexForYear(curYear)];
    if (!b) return;
    band.style.left = pct(b.start_year) + '%';
    band.style.width = Math.max(0.6, pct(b.end_year) - pct(b.start_year)) + '%';
  }

  // 범례(.legend)·레이어 박스(.layer-toggle)는 bottom 고정값(110px)으로
  // 타임라인 위에 떠 있었는데, 슬라이더가 끼며 타임라인이 높아져 겹치게
  // 됐다(왕두목 지적). 실제 높이를 재서 CSS 변수로 넘긴다.
  function syncTimelineHeight(){
    var tl = document.querySelector('.timeline');
    if (tl) document.documentElement.style.setProperty('--timeline-h', tl.offsetHeight + 'px');
  }

  // 슬라이더 연도 → 해당 챕터 블록 활성화.
  var _sliderDriven = false;
  function syncChapterToYear(){
    if (typeof blockIndexForYear !== 'function' || typeof selectReign !== 'function') return;
    var idx = blockIndexForYear(curYear);
    if (typeof currentBlockIndex !== 'undefined' && idx === currentBlockIndex) return;
    _sliderDriven = true;
    try { selectReign(idx); } finally { _sliderDriven = false; }
    // 챕터 전환이 세력도를 챕터 기본 스냅샷으로 되돌리므로,
    // 사용자가 고른 연도의 스냅샷으로 복원한다.
    setYear(curYear, { renderTerritory: true });
    syncTimelineHeight();
  }

  function setPanelOpen(v){
    panelOpen = v;
    var p = document.getElementById('kingsPanel');
    if (p) p.classList.toggle('open', panelOpen);
    var t = document.getElementById('ysKingsToggle');
    if (t) t.classList.toggle('panel-closed', !panelOpen);
  }

  function injectPanel(){
    var p = document.createElement('aside');
    p.id = 'kingsPanel';
    p.className = panelOpen ? 'open' : '';
    p.innerHTML =
      '<div class="kp-head">' +
        '<span class="kp-title">왕대 연표 <b id="kpYear"></b></span>' +
        '<button type="button" class="kp-info" id="kpInfoBtn" aria-label="일러두기">ⓘ</button>' +
        '<button type="button" class="kp-close" id="kpCloseBtn" aria-label="닫기">×</button>' +
      '</div>' +
      '<div class="kp-caveat" id="kpCaveat" style="display:none">' + esc(KINGS_TIMELINE.caveat) + '</div>' +
      '<div class="kp-list" id="kpList"></div>' +
      '<div class="kp-foot">이름을 누르면 그 군주를 지도에서 검색합니다</div>';
    document.body.appendChild(p);
    p.querySelector('#kpInfoBtn').addEventListener('click', function(){
      var c = document.getElementById('kpCaveat');
      c.style.display = c.style.display === 'none' ? 'block' : 'none';
    });
    p.querySelector('#kpCloseBtn').addEventListener('click', function(){
      setPanelOpen(false);
    });
    p.addEventListener('click', function(e){
      var btn = e.target.closest('.kp-ruler[data-q]');
      if (!btn) return;
      var q = btn.getAttribute('data-q');
      var widget = document.getElementById('searchWidget');
      var input = document.getElementById('searchInput');
      if (widget) widget.classList.add('open');
      if (input) input.value = q;
      if (typeof runSearch === 'function') runSearch(q);
      if (window.trackPageView) trackPageView('ancient_kings_timeline', 'search_' + q);
    });
  }

  // ── 그 해의 군주 찾기 ───────────────────────────────
  // 즉위·훙거가 같은 해에 겹치는 것(즉위년칭원)은 새 군주를 우선한다.
  function rulerAt(state, y){
    var hit = null;
    for (var i = 0; i < state.rulers.length; i++){
      var r = state.rulers[i];
      if (r.approx) continue;            // 연대 자체가 미상인 단편 기록(대가야)만 제외
      if (r.s <= y && y <= r.e){ hit = r; if (r.s === y) return r; }
    }
    return hit;
  }
  // 대가야처럼 단편 기록만 있는 나라: 그 해 "무렵"의 기록을 보여준다.
  function approxNear(state, y){
    var best = null, bestD = 1e9;
    state.rulers.forEach(function(r){
      if (!r.approx) return;
      var d = Math.abs(r.s - y);
      if (d < bestD){ bestD = d; best = r; }
    });
    return (best && bestD <= 40) ? best : null;
  }

  function renderKings(y){
    var list = document.getElementById('kpList');
    var yEl = document.getElementById('kpYear');
    if (!list) return;
    if (yEl) yEl.textContent = fmtYear(y);

    var html = KINGS_TIMELINE.states.map(function(st){
      if (y < st.from || y > st.to) return '';
      var r = rulerAt(st, y);
      var line, sub = '';
      if (r){
        var disp = r.t ? (r.n + ' ' + r.t) : r.n;
        line = '<button type="button" class="kp-ruler" data-q="' + esc(r.n) + '">' + esc(disp) + '</button>';
        sub = '재위 ' + fmtYearShort(r.s) + '–' + fmtYearShort(r.e) +
              (r.est ? ' (추정)' : '') +
              (r.note ? ' · ' + esc(r.note) : '');
      } else {
        var a = approxNear(st, y);
        if (a){
          line = '<button type="button" class="kp-ruler" data-q="' + esc(a.n) + '">' + esc(a.n) + '</button>';
          sub = (a.note ? esc(a.note) : '연대 미상의 단편 기록');
        } else {
          line = '<span class="kp-ruler kp-norecord">' + esc(st.no_record_text || '왕명 미상') + '</span>';
          sub = '기록이 전하지 않는 구간';
        }
      }
      // 멸망 임박(마지막 10년) 표시 — 시대의 끝이 다가옴을 알린다
      var fall = (st.to - y <= 10 && st.fall_note) ? '<div class="kp-fall">' + esc(st.fall_note) + '</div>' : '';
      return '<div class="kp-state">' +
               '<div class="kp-state-head"><i style="background:' + st.color + '"></i>' + esc(st.name) + '</div>' +
               '<div class="kp-ruler-row">' + line + '</div>' +
               '<div class="kp-sub">' + sub + '</div>' + fall +
             '</div>';
    }).join('');

    list.innerHTML = html || '<div class="kp-empty">이 해에 존속한 나라가 없습니다</div>';
  }

  // ── 세력도 스냅샷 동기화 ────────────────────────────
  function nearestSnapshot(y){
    if (typeof TERRITORY_SNAPSHOTS === 'undefined') return null;
    var best = null, bestD = 1e9;
    TERRITORY_SNAPSHOTS.forEach(function(s){
      var d = Math.abs(s.year - y);
      if (d < bestD){ bestD = d; best = s; }
    });
    return best;
  }

  function setYear(y, opts){
    opts = opts || {};
    curYear = Math.max(YEAR_MIN, Math.min(YEAR_MAX, y));
    var range = document.getElementById('ysRange');
    var yEl = document.getElementById('ysYear');
    var snapEl = document.getElementById('ysSnap');
    if (range && !opts.fromSlider) range.value = curYear;
    if (range){
      var p = ((curYear - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * 100;
      range.style.setProperty('--p', p + '%');
    }
    if (yEl) yEl.textContent = fmtYear(curYear);

    var snap = nearestSnapshot(curYear);
    if (snapEl && snap) snapEl.textContent = '세력도: ' + snap.label + ' 기준';
    if (opts.renderTerritory && snap && typeof _renderSnapshot === 'function' &&
        (typeof isTerritoryLayerOn !== 'function' || isTerritoryLayerOn())){
      if (typeof _territoryActiveYear !== 'undefined' && _territoryActiveYear !== snap.year){
        _territoryActiveYear = snap.year;
        _renderSnapshot(snap);
      } else if (typeof _territoryActiveYear === 'undefined'){
        _renderSnapshot(snap);
      }
    }
    renderKings(curYear);
    updateBand();
  }

  // ── 챕터 전환과의 동기화 ────────────────────────────
  // 챕터가 바뀌면 territoryLayer가 그 범위의 스냅샷을 스스로 고른다.
  // 그때 슬라이더·연표를 그 스냅샷 연도로 따라가게 한다(세력도 재렌더는
  // 하지 않는다 — 이미 그려졌으니까). 함수 선언은 재할당이 가능하므로
  // 원본을 감싸는 방식을 쓴다.
  if (typeof renderTerritoryForRange === 'function'){
    var _origRTR = renderTerritoryForRange;
    renderTerritoryForRange = function(a, b){
      _origRTR(a, b);
      // 사용자가 챕터 버튼을 직접 눌렀을 때만 슬라이더를 따라가게 한다.
      // 슬라이더가 챕터를 끌고 온 경우(_sliderDriven)는 사용자의 연도를
      // 지켜야 하므로 역동기화하지 않는다.
      if (!_sliderDriven &&
          typeof _territoryActiveYear !== 'undefined' && _territoryActiveYear !== null){
        setYear(_territoryActiveYear, { renderTerritory: false });
      }
      syncTimelineHeight();
    };
  }

  // ── 시작 ──
  injectSlider();
  injectPanel();
  buildScale();
  setPanelOpen(panelOpen);
  setYear(curYear, { renderTerritory: false });
})();
