// infoPanel.js — 정보창 (Bottom Sheet / Right Side Panel)
// 의존: index.html의 #infoPanel/#infoScroll/#infoGrabber/#infoClose/#infoScrim,
//       renderer.js (openInfoPanel 호출 — bindPopup 대체)
//
// 철학: "지도 = 주인공, 정보창 = 펼쳐지는 역사 기록".
//   모바일(<1024px): 화면 하단에서 올라오는 Bottom Sheet. 드래그로 높이 조절.
//     상태: collapsed(35%) ↔ expanded(85%) ↔ closed. 정보창 열림 동안 범례·레이어
//     자동 숨김(설정 가능), 검색창 축소, 슬라이더 흐리게, 지도 이동 잠금.
//   데스크탑(>=1024px): 우측 고정 Side Panel(420px). 드래그 없음, 스크롤만.
//     지도는 계속 조작 가능. 범례·레이어는 숨기지 않고 패널 폭만큼 옆으로 비킨다.
//
// 화면 폭 분기는 CSS(@media)가 외형을, 이 파일이 동작(드래그/잠금)을 담당한다.

(function(){
  const DESKTOP_MIN = 1024;          // 이 폭 이상이면 데스크탑(Right Panel)
  const PANEL_WIDTH = 420;           // 데스크탑 패널 기본 폭(px). CSS와 일치해야 함
  const LS_AUTOHIDE = 'atlas_autohide_controls'; // 모바일 자동숨김 설정 저장 키

  const panel   = document.getElementById('infoPanel');
  const scroll  = document.getElementById('infoScroll');
  const grabber = document.getElementById('infoGrabber');
  const closeBtn= document.getElementById('infoClose');
  const scrim   = document.getElementById('infoScrim');
  if(!panel || !scroll) return;

  function isDesktop(){ return window.innerWidth >= DESKTOP_MIN; }

  // ── 자동 숨김 설정 (모바일 전용) ──
  function autoHideEnabled(){
    try{
      const v = localStorage.getItem(LS_AUTOHIDE);
      return v === null ? true : v === '1'; // 기본 ON
    }catch(_){ return true; }
  }
  function setAutoHide(on){
    try{ localStorage.setItem(LS_AUTOHIDE, on ? '1' : '0'); }catch(_){}
  }

  // ── 패널 상태 ──
  // closed | collapsed(모바일 35%) | expanded(모바일 85%) | open(데스크탑)
  let state = 'closed';

  function applyMobileHeight(){
    // collapsed=35vh, expanded=88vh. translateY로 등장.
    if(state === 'collapsed') panel.style.transform = 'translateY(calc(100% - 35vh))';
    else if(state === 'expanded') panel.style.transform = 'translateY(calc(100% - 88vh))';
    else panel.style.transform = 'translateY(100%)';
  }

  // 정보창이 열리는 동안 다른 컨트롤들의 상태를 바꾼다.
  // 2026-07-28: 자동 숨김을 데스크탑까지 확대. 이전에는 데스크탑에서
  // 범례·레이어를 숨기지 않고 옆으로 비키기만 해서, 정보창을 열어도
  // 화면 오른쪽이 계속 컨트롤로 덮여 있었다. 두목님 요청으로 7개 시대
  // 전부, 화면 폭과 무관하게 자동 숨김이 걸리도록 통일했다.
  // (설정 체크박스 autoHideControls로 끌 수 있는 것은 그대로 유지.)
  function syncControlsForOpen(open){
    document.body.classList.toggle('info-open', open);
    const hide = open && autoHideEnabled();
    document.body.classList.toggle('controls-hidden', hide);
    if(isDesktop()){
      // 데스크탑은 패널이 우측에 고정되므로, 숨기지 않기로 설정한
      // 경우에도 남은 컨트롤이 패널에 가리지 않도록 옆으로 비킨다.
      document.body.classList.toggle('info-open-desktop', open);
      document.body.classList.toggle('controls-shift', open);
      return;
    }
    document.body.classList.remove('info-open-desktop');
    document.body.classList.remove('controls-shift');
  }

  // 모바일에서 정보창 열림 동안 지도 드래그/줌을 잠근다(지도 위 탐험 충돌 방지).
  // 데스크탑은 지도 조작을 계속 허용한다(지시서: "지도 계속 조작 가능").
  function lockMap(lock){
    if(typeof map === 'undefined' || !map) return;
    const doLock = lock && !isDesktop();
    try{
      if(doLock){
        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
      }else{
        map.dragging.enable();
        map.touchZoom.enable();
        map.doubleClickZoom.enable();
        map.scrollWheelZoom.enable();
      }
    }catch(_){}
  }

  // ── 열기 ──
  function open(html){
    scroll.innerHTML = html;
    scroll.scrollTop = 0;
    panel.setAttribute('aria-hidden', 'false');

    if(isDesktop()){
      state = 'open';
      panel.dataset.state = 'open';
      panel.style.transform = '';           // CSS가 translateX 담당
      document.body.classList.add('info-panel-active');
      syncControlsForOpen(true);
      lockMap(false);
      if(scrim) scrim.hidden = true;         // 데스크탑은 스크림 없음(지도 조작 유지)
    }else{
      // ── 모바일: 중앙 Modal (개선됨) ──
      // 기존 Bottom Sheet(translateY 드래그) 대신, 화면 중앙에 뜨는 읽기 전용
      // 모달로 표시한다. 높이/스크롤은 CSS(@media)가 담당하고, 여기서는 인라인
      // transform을 비워(드래그 잔재 제거) data-state만 'modal'로 둔다.
      state = 'expanded';                 // 내부 상태값은 '열림'으로 취급
      panel.dataset.state = 'modal';
      panel.style.transform = '';         // 인라인 translateY 제거 → CSS가 위치 결정
      document.body.classList.add('info-panel-active');
      requestAnimationFrame(()=>{ panel.classList.add('modal-show'); });
      syncControlsForOpen(true);
      lockMap(true);
      if(scrim){ scrim.hidden = false; }
    }
    // 포커스를 닫기 버튼으로(접근성). 단 지도 조작을 막지 않도록 가볍게.
    if(closeBtn) closeBtn.focus({preventScroll:true});
  }

  // ── 닫기 ──
  function close(){
    if(state === 'closed') return;
    state = 'closed';
    panel.dataset.state = 'closed';
    panel.setAttribute('aria-hidden', 'true');
    panel.classList.remove('modal-show');     // 모바일 모달 페이드아웃 해제
    if(!isDesktop()){ panel.style.transform = ''; } // 인라인 transform 잔재 제거
    document.body.classList.remove('info-panel-active');
    syncControlsForOpen(false);
    lockMap(false);
    if(scrim) scrim.hidden = true;
    // 선택 링 해제(있으면)
    if(typeof clearSelectRing === 'function'){ try{ clearSelectRing(); }catch(_){} }
  }

  // ── 모바일 드래그 (grabber + 헤더 영역) ──
  let dragStartY = 0, dragStartTransform = 0, dragging = false, panelH = 0;
  function currentTranslateY(){
    // 현재 transform의 px 값을 계산(collapsed/expanded 기준)
    const vh = window.innerHeight;
    if(state === 'expanded') return vh - vh*0.88;
    return vh - vh*0.35;
  }
  function onDragStart(clientY){
    if(isDesktop()) return;
    dragging = true;
    dragStartY = clientY;
    dragStartTransform = currentTranslateY();
    panelH = window.innerHeight;
    panel.style.transition = 'none';
  }
  function onDragMove(clientY){
    if(!dragging) return;
    const delta = clientY - dragStartY;
    let y = dragStartTransform + delta;
    const minY = panelH - panelH*0.90;  // 최대 확장 한계(90vh)
    const maxY = panelH;                // 완전히 내림 = 닫힘
    y = Math.max(minY, Math.min(maxY, y));
    panel.style.transform = 'translateY(' + y + 'px)';
  }
  function onDragEnd(clientY){
    if(!dragging) return;
    dragging = false;
    panel.style.transition = '';
    const delta = clientY - dragStartY;
    // 아래로 충분히 끌면 닫기, 위로 끌면 확장, 아래로 조금이면 collapsed
    if(state === 'collapsed' && delta > 80){ close(); return; }
    if(state === 'expanded' && delta > 120){ state='collapsed'; panel.dataset.state='collapsed'; applyMobileHeight(); return; }
    if(delta < -60){ state='expanded'; panel.dataset.state='expanded'; }
    else if(state==='expanded'){ /* 유지 */ }
    else { state='collapsed'; panel.dataset.state='collapsed'; }
    applyMobileHeight();
  }

  if(grabber){
    grabber.addEventListener('touchstart', e=>{ onDragStart(e.touches[0].clientY); }, {passive:true});
    grabber.addEventListener('touchmove',  e=>{ onDragMove(e.touches[0].clientY); }, {passive:true});
    grabber.addEventListener('touchend',   e=>{ onDragEnd(e.changedTouches[0].clientY); });
    // 마우스(데스크탑 축소창 테스트용)
    grabber.addEventListener('mousedown', e=>{
      onDragStart(e.clientY);
      const mv = ev=>onDragMove(ev.clientY);
      const up = ev=>{ onDragEnd(ev.clientY); document.removeEventListener('mousemove',mv); document.removeEventListener('mouseup',up); };
      document.addEventListener('mousemove', mv);
      document.addEventListener('mouseup', up);
    });
    // grabber 탭(드래그 아님)으로 collapsed↔expanded 토글
    grabber.addEventListener('click', ()=>{
      if(isDesktop() || dragging) return;
      if(state==='collapsed'){ state='expanded'; panel.dataset.state='expanded'; }
      else if(state==='expanded'){ state='collapsed'; panel.dataset.state='collapsed'; }
      applyMobileHeight();
    });
  }

  if(closeBtn) closeBtn.addEventListener('click', close);
  if(scrim) scrim.addEventListener('click', close);

  // ── 지도 바탕 클릭으로 닫기 (2026-07-28) ──────────────
  // 이전에는 × 버튼(또는 모바일 scrim/ESC)으로만 닫을 수 있었다.
  // Leaflet의 map 'click'은 마커·팝업 등 인터랙티브 레이어를 클릭한
  // 경우에는 발생하지 않고 빈 바탕을 눌렀을 때만 발생하므로, 이걸
  // 그대로 닫기 신호로 쓰면 "다른 마커를 눌러 카드를 갈아타는" 동작을
  // 방해하지 않는다. 데스크탑은 정보창이 열려도 지도를 계속 조작할 수
  // 있으니 특히 이 경로가 자연스럽고, 모바일은 지도가 잠겨 있어
  // 실질적으로 scrim이 먼저 받는다(중복 호출돼도 close는 멱등).
  if(typeof map !== 'undefined' && map && typeof map.on === 'function'){
    map.on('click', ()=>{
      if(state !== 'closed') close();
    });
  }

  // ESC로 닫기(접근성)
  document.addEventListener('keydown', e=>{
    if(e.key === 'Escape' && state !== 'closed') close();
  });

  // 화면 회전/리사이즈 시 모바일↔데스크탑 전환 처리
  let resizeTimer = null;
  window.addEventListener('resize', ()=>{
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(()=>{
      if(state === 'closed') return;
      // 열린 상태에서 분기점을 넘나들면 현재 내용을 유지한 채 모드만 전환
      const html = scroll.innerHTML;
      close();
      open(html);
    }, 150);
  });

  // ── 자동숨김 설정 토글 연결 ──
  const autoHideBox = document.getElementById('autoHideControls');
  if(autoHideBox){
    autoHideBox.checked = autoHideEnabled();
    autoHideBox.addEventListener('change', ()=>{
      setAutoHide(autoHideBox.checked);
      // 정보창이 열려 있으면 즉시 반영 (2026-07-28: 데스크탑 포함)
      if(state !== 'closed'){
        document.body.classList.toggle('controls-hidden', autoHideBox.checked);
      }
    });
  }

  // ── 스크랩 버튼 위임 처리 (2026-07-28) ────────────────
  // 카드 HTML은 마커를 누를 때마다 새로 그려지므로, 버튼마다 리스너를
  // 붙이면 계속 새로 쌓인다. 정보창 컨테이너 한 곳에서 위임으로 받는다.
  scroll.addEventListener('click', (ev)=>{
    const btn = ev.target.closest('.scrap-btn');
    if(!btn) return;
    ev.preventDefault();
    const G = window.AtlasGrowth;
    if(!G || !G.toggleScrap) return;
    const url = btn.dataset.scrapUrl;
    const on = G.toggleScrap({
      url: url,
      title: btn.dataset.scrapTitle || url,
      kind: btn.dataset.scrapKind || 'card',
    });
    btn.classList.toggle('is-on', on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.textContent = on ? '📚 서재에 담김' : '🔖 서재에 담기';
  });

  // 전역 공개 — renderer.js가 마커 클릭에서 호출
  window.openInfoPanel = open;
  window.closeInfoPanel = close;
  window.isInfoPanelOpen = ()=> state !== 'closed';
})();
