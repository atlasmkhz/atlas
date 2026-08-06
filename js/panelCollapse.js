// ═══════════════════════════════════════════════════════
// js/panelCollapse.js — 범례·레이어 박스 접기 (전 시대 지도 공통)
//
// 2026-08-06 신설 (왕두목: "범례 팝업과 레이어 팝업이 전 시대에 걸쳐
// 조금은 거슬린다 — 확대 축소하던가 자동축소하던가").
//
// 동작:
//  - 두 박스 모두 기본은 접힘(제목 줄만 남는 칩 상태).
//  - 제목을 누르면 펼쳐지고, 상태는 localStorage에 저장되어
//    다른 시대 지도에서도 유지된다(한 번 펼쳐두면 계속 펼침).
//  - 마크업은 7개 지도가 동일(.legend-title / .toggle-title)하므로
//    이 파일 하나를 각 지도에 복사해 쓴다. 수정 시 7곳 동기화할 것.
// ═══════════════════════════════════════════════════════
(function(){
  var PANELS = [
    { box: '.legend',       title: '.legend-title', key: 'atlasPanelOpen_legend' },
    { box: '.layer-toggle', title: '.toggle-title', key: 'atlasPanelOpen_layers' },
  ];
  function get(k){ try { return localStorage.getItem(k); } catch(e){ return null; } }
  function set(k,v){ try { localStorage.setItem(k,v); } catch(e){} }

  PANELS.forEach(function(p){
    var box = document.querySelector(p.box);
    var title = box && box.querySelector(p.title);
    if (!box || !title) return;
    var arrow = document.createElement('span');
    arrow.className = 'pc-arrow';
    title.appendChild(arrow);

    function apply(open){
      box.classList.toggle('pc-collapsed', !open);
      arrow.textContent = open ? '▾' : '▸';
      title.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    var open = get(p.key) === '1';   // 기본값: 접힘
    apply(open);
    title.addEventListener('click', function(){
      open = !open;
      apply(open);
      set(p.key, open ? '1' : '0');
    });
  });
})();
