// ═══════════════════════════════════════════════════════
// renderer.js — 지도 렌더링 엔진
// 의존: app.js (COLORS, TYPE_LABEL, DATA), map.js (map),
//       validator.js (getVisibleEvents, getImportance)
// 호출 흐름: safeRender(year) → renderYear(year) →
//            clearLayers() → drawConnections() → 마커 생성 → declutterMarkers()
// ═══════════════════════════════════════════════════════

// 현재 화면에 그려진 레이어(마커/선/원) 전체. clearLayers()로 매 렌더 전 초기화.
let layers = [];
// declutterMarkers()의 겹침 계산 대상이 되는 사건 마커만 별도 추적.
let eventMarkers = [];

// ── 세계의 흐름(World Atmosphere) 배경 레이어 ──
// 한국사 layers/eventMarkers와 철저히 분리된 독립 배열. 세계 사건은 마커가
// 아니라 "흐름"이므로, 지도 위에 아주 약한(저채도·고명도·반투명) 비대화형
// 번짐만 그린다. 클릭·연결선·declutter 대상에서 제외된다.
let worldLayers = [];

// 세계 사건 type → 흐름 색(저채도·고명도 보조 팔레트). 한국사 마커 색과
// 경쟁하지 않도록 일부러 탁하고 옅게 잡았다(dust blue / slate / muted 계열).
const WORLD_ATMO_COLOR = {
  WAR:'#8a7a72', REVOLUTION:'#9a8aa6', EMPIRE:'#9a8f7a',
  POLITICS:'#8593a6', ECONOMY:'#7f9690', TECH:'#8a93a0',
  CULTURE:'#a0927e', IDEA:'#94889c'
};

function clearWorldLayers(){
  worldLayers.forEach(layer=>{
    try { if(map.hasLayer(layer)) map.removeLayer(layer); } catch(_){}
  });
  worldLayers.length = 0;
}

// ── 세계 사건 마커 (World Event Markers, 지시문 v5) ──
// 세계사는 한국사처럼 점이 아니라 "사건 단위 마커"로 표시한다:
//   WAR(spread)      → 면 + 중심 마커
//   REVOLUTION(radiate)→ 원형 확산 + 중심점
//   ECONOMY(wave)    → 다중 파동(동심원) + 중심점
//   EMPIRE(expand)   → 영역 음영 + 중심점
//   POLITICS/flow 등 → 면 + 중심점
// 표시 조건: start ≤ Y ≤ end. 기간 내 강도 변화 허용.
// 클릭 허용 — 클릭 시 세계 사건 정보창(worldPanelHtml)을 연다.
// 단, 한국사 마커보다 항상 약하게(크고·투명·저채도) 유지하고, renderYear에서
// 한국 마커보다 먼저 그려 한국 마커가 위에 오게 한다(우선순위 보장).
function renderWorldEvents(year){
  clearWorldLayers();
  if (typeof WORLD_EVENTS === 'undefined') return;
  // 너무 확대되면 세계 면이 화면을 덮어 한국사를 가리므로 광역에서만 표시.
  if (typeof map !== 'undefined' && map.getZoom && map.getZoom() > 6) return;

  Object.values(WORLD_EVENTS).forEach(w=>{
    if (!w.location) return;
    if (year < w.start || year > w.end) return;       // 기간 밖이면 표시 안 함

    const color = WORLD_ATMO_COLOR[w.type] || '#8a8a8a';

    // 기간 내 위치 → 삼각형 곡선 강도(시작·종료 약함, 중간 강함).
    const dur = Math.max(0, w.end - w.start);
    const t = dur === 0 ? 0.5 : (year - w.start) / dur;
    const ramp = 1 - Math.abs(t - 0.5) * 2;            // 0(끝)~1(중간)
    const intensity = 0.5 + 0.5 * ramp;                // 0.5~1.0

    // 한국사보다 항상 약하게: 면 투명도는 낮게 유지.
    const baseFill = (w.priority === 1 ? 0.12 : w.priority === 2 ? 0.09 : 0.07) * intensity;

    const radiusByVisual = {
      spread: 520000, radiate: 460000, wave: 600000, expand: 520000, flow: 440000
    };
    const radius = (radiusByVisual[w.visual] || 460000) * (0.85 + 0.15 * ramp);

    const openThis = ()=>{
      if (window.trackPageView) window.trackPageView('world_event', w.title_ko || w.title_en || w.id);
      if (window.trackEventOpen) window.trackEventOpen(w);
      if (window.openInfoPanel) openInfoPanel(worldPanelHtml(w, currentDisplayYear()));
    };

    // ── 사건 영역(면) ──
    // 클릭 가능. 형태별로 면 구성이 달라진다.
    const areaOpts = (r, fill)=>({
      radius:r, color, fillColor:color, fillOpacity:fill,
      weight:0, opacity:0, className:'world-area'
    });

    if (w.visual === 'wave'){
      // ECONOMY: 다중 파동(동심원 3겹) — 바깥일수록 옅게.
      [1.0, 0.66, 0.36].forEach((k, i)=>{
        const ring = L.circle(w.location, areaOpts(radius*k, baseFill*(0.5 + i*0.28))).addTo(map);
        ring.on('click', openThis);
        worldLayers.push(ring);
      });
    } else if (w.visual === 'radiate'){
      // REVOLUTION: 원형 확산 + 안쪽 코어.
      const halo = L.circle(w.location, areaOpts(radius, baseFill*0.7)).addTo(map);
      const core = L.circle(w.location, areaOpts(radius*0.5, baseFill*1.25)).addTo(map);
      halo.on('click', openThis); core.on('click', openThis);
      worldLayers.push(halo, core);
    } else if (w.visual === 'expand'){
      // EMPIRE: 완만한 영역 음영(넓고 균일하게 옅음).
      const shade = L.circle(w.location, areaOpts(radius, baseFill*0.85)).addTo(map);
      shade.on('click', openThis);
      worldLayers.push(shade);
    } else {
      // WAR(spread) / POLITICS(flow): 면 하나.
      const area = L.circle(w.location, areaOpts(radius, baseFill)).addTo(map);
      area.on('click', openThis);
      worldLayers.push(area);
    }

    // ── 중심 마커(◉) ──
    // 한국 마커보다 크지만 채도 낮고 반투명한 보조 마커. 클릭 시 정보창.
    if (typeof makeWorldMarkerIcon === 'function'){
      const m = L.marker(w.location, {
        icon: makeWorldMarkerIcon(color, intensity),
        zIndexOffset: -500,            // 한국 마커보다 항상 아래
        keyboard: false
      }).addTo(map);
      m.on('click', openThis);
      worldLayers.push(m);
    } else {
      // 폴백: 작은 반투명 원형 중심점.
      const dot = L.circleMarker(w.location, {
        radius:6, color, fillColor:color, fillOpacity:0.5*intensity,
        weight:1, opacity:0.5*intensity, className:'world-center'
      }).addTo(map);
      dot.on('click', openThis);
      worldLayers.push(dot);
    }
  });
}

function clearLayers(){
  layers.forEach(layer=>{
    try {
      if(map.hasLayer(layer)) map.removeLayer(layer);
    } catch(e){ console.warn('레이어 제거 오류:', e); }
  });
  layers.length = 0;
}

// id로 사건을 찾는다. 매번 DATA를 펼쳐 찾지만(별도 인덱스 없음),
// 현재 데이터 규모(수백 건)에서는 성능 문제가 없다 — search.js의
// getAllEvents()와 동일한 원칙(매번 최신 DATA를 그대로 조회).
function findEventById(id){
  for (const arr of Object.values(DATA)) {
    for (const e of arr) { if (e.id === id) return e; }
  }
  return null;
}

// ── 세계의 흐름(World Context) 섹션 ──
// 한국 사건 정보창 "하단에만" 덧붙이는 보조 맥락. 기존 popupHtml 구조는
// 그대로 두고, 반환 HTML 끝에 이 블록을 이어 붙인다(정보창 구조 유지 원칙).
// WORLD_CONTEXT[한국id] → 세계 사건 id들(최대 3개) → WORLD_EVENTS에서 조회.
// 세계사는 점이 아니라 흐름이므로, 여기서는 '읽는 맥락'만 제공하고
// 클릭 탐색·인물 상세·연표 같은 추가 동작은 일절 만들지 않는다.
const WORLD_TYPE_LABEL = {
  WAR:'전쟁', REVOLUTION:'혁명', EMPIRE:'제국', POLITICS:'국제질서',
  ECONOMY:'경제', TECH:'기술', CULTURE:'문화', IDEA:'사상'
};

// 현재 화면에 표시 중인 연도. 마커 클릭은 그 연도 화면에서 일어나므로,
// 슬라이더 값(없으면 yearNum 텍스트)을 신뢰원으로 삼는다.
function currentDisplayYear(){
  const s = document.getElementById('slider');
  if (s && s.value !== '') return parseInt(s.value, 10);
  const yn = document.getElementById('yearNum');
  if (yn) { const n = parseInt(yn.textContent, 10); if (!isNaN(n)) return n; }
  return null;
}

// phases[]에서 현재 연도가 속한 구간의 진행 메모를 고른다(없으면 빈 문자열).
function worldPhaseNote(w, year){
  if (!w.phases || year == null) return '';
  const p = w.phases.find(ph => year >= ph.from && year <= ph.to);
  return p ? p.note : '';
}

// 한 세계 사건의 정보창 블록을 만든다 — 기간 표시 + 진행 상태 + 3단 설명 + 인물.
function worldEventCardHtml(w, year){
  const label = WORLD_TYPE_LABEL[w.type] || '';
  const periodStr = (w.start === w.end) ? `${w.start}` : `${w.start}~${w.end}`;
  // 기간 사건이고 아직 종료 전이면 "진행 중"을, 종료 해이면 "종결"을 덧붙인다.
  let stateTag = '';
  if (w.end > w.start && year != null){
    if (year >= w.start && year < w.end) stateTag = `<span class="world-state">진행 중</span>`;
    else if (year === w.end) stateTag = `<span class="world-state">종결</span>`;
  }
  const phaseNote = worldPhaseNote(w, year);
  const phaseHtml = phaseNote
    ? `<div class="world-phase"><span class="world-phase-year">${year}</span> ${phaseNote}</div>`
    : '';

  const s = w.summary || {};
  let bodyHtml = '';
  if (typeof s === 'string'){
    // 구버전 호환(혹시 문자열 summary가 남아 있을 때)
    bodyHtml = `<div class="world-summary">${s}</div>`;
  } else {
    bodyHtml = `
      ${s.what    ? `<div class="world-block"><span class="world-q">무슨 일이 있었는가</span><p>${s.what}</p></div>` : ''}
      ${s.why     ? `<div class="world-block"><span class="world-q">왜 중요한가</span><p>${s.why}</p></div>` : ''}
      ${s.changed ? `<div class="world-block"><span class="world-q">세계가 어떻게 달라졌는가</span><p>${s.changed}</p></div>` : ''}`;
  }

  let figuresHtml = '';
  if (w.figures && w.figures.length){
    const items = w.figures.slice(0, 3).map(f =>     // 인물 사건당 최대 3명
      `<li><b>${f.name}</b>${f.role ? ' — <span>'+f.role+'</span>' : ''}</li>`
    ).join('');
    figuresHtml = `<div class="world-figures-wrap"><div class="world-figures-label">대표 인물</div><ul class="world-figures">${items}</ul></div>`;
  }

  return `
    <div class="world-event">
      <div class="world-event-head">
        <span class="world-type" data-type="${w.type}">${label}</span>
        <span class="world-title">${w.title}</span>
        <span class="world-period">${periodStr}</span>
        ${stateTag}
      </div>
      ${phaseHtml}
      ${bodyHtml}
      ${figuresHtml}
    </div>`;
}

// 세계 사건 마커를 클릭했을 때 여는 독립 정보창 HTML.
// 기존 한국 정보창과 같은 컨테이너(openInfoPanel)에 들어가되, 내용은
// 세계 사건 전용(🌍 헤더 + v4 3단 설명)으로 구성한다. 한국 데이터·popupHtml은
// 건드리지 않는다.
function worldPanelHtml(w, year){
  // 클릭한 세계 사건의 설명만 보여준다. 다른 지역 요약·연표·추천은 두지 않는다.
  // (세계는 지도 위에서 스스로 발견 → 클릭 → 설명 확인. 강제 노출 없음.)
  return `
    <div class="world-panel">
      <div class="pop-type world-pop-type" data-type="${w.type}">🌍 세계 사건</div>
      ${worldEventCardHtml(w, year)}
    </div>`;
}

// regionKey → 한글 라벨. WORLD_REGIONS(데이터)에서 읽고, 없으면 키 그대로.
// (세계 요약/지역 개요/맥락 섹션 함수는 제거되었다 — 최종 원칙상 세계 정보는
//  정보창에 표시하지 않고, 오직 지도 위 세계 마커 클릭으로만 설명을 연다.
//  worldPanelHtml + worldEventCardHtml만 그 클릭 경로에 쓰인다.)

function popupHtml(e){
  const color = COLORS[e.type];

  // 대표 이미지 — content.hero(신규)를 우선 사용하고, 없으면 e.image(구버전
  // 단일 필드, 하위호환용으로 유지)를 사용한다. 둘 다 없으면 그 영역 자체가
  // 생성되지 않는다 — 빈 이미지 칸이나 "이미지 없음" placeholder를 보여주지
  // 않고 조용히 다음 영역으로 넘어간다(media-policy.md "플레이스홀더 금지"
  // 원칙). 경로가 깨져 로드에 실패해도 onerror가 영역을 숨겨 콘솔에러만
  // 남고 화면은 깨지지 않는다.
  let imageHtml = '';
  const heroImg = e.content && e.content.hero;
  if(heroImg && heroImg.url){
    const aiNote = (heroImg.is_ai || heroImg.source_type === 'generated')
      ? `<div class="pop-ai-note">※ AI 생성 이미지</div>` : '';
    imageHtml = `<div class="pop-image"><img src="${heroImg.url}" alt="${heroImg.alt || e.title_ko}" loading="lazy" onerror="this.closest('.pop-image').style.display='none';">${aiNote}</div>`;
  } else if(e.image){
    imageHtml = `<div class="pop-image"><img src="${e.image}" alt="${e.title_ko}" loading="lazy" onerror="this.closest('.pop-image').style.display='none';"></div>`;
  }

  // 관련 사진 — content.gallery(신규). 여러 장이어도 같은 구조의 썸네일
  // 그리드로 표시하고, 클릭하면 큰 화면으로 확대(라이트박스 함수는 이미
  // 있다면 그대로 쓰고, 없으면 새 탭으로 원본을 연다). 비어 있으면 영역
  // 자체를 만들지 않는다.
  let galleryHtml = '';
  const gallery = (e.content && e.content.gallery) || [];
  if(gallery.length){
    const items = gallery.map(g => {
      if(!g.url) return '';
      const aiNote = (g.is_ai || g.source_type === 'generated')
        ? `<div class="pop-ai-note">※ AI 생성 이미지</div>` : '';
      return `<div class="pop-gallery-item">
        <a href="${g.url}" target="_blank" rel="noopener">
          <img src="${g.url}" alt="${g.alt || ''}" loading="lazy" onerror="this.closest('.pop-gallery-item').style.display='none';">
        </a>
        ${aiNote}
      </div>`;
    }).filter(Boolean);
    if(items.length){
      galleryHtml = `<div class="pop-gallery">${items.join('')}</div>`;
    }
  }

  let peopleHtml = '';
  if(e.people && e.people.length){
    peopleHtml = `<div class="pop-people"><b>관련 인물</b> · ${e.people.join(' · ')}</div>`;
  }

  // 관련 사건 — connections(id 배열)를 사람이 읽는 제목으로 바꿔 클릭 가능한
  // 링크로 보여준다. 클릭하면 navigateToEvent()가 그 사건의 연도로 슬라이더를
  // 옮기고 지도를 그 위치로 이동시켜 팝업을 연다 — "지도 위에서 탐험한다"는
  // 프로젝트 철학에 맞춰, 점선 연결선만으로 끝나지 않고 실제로 따라가 볼 수
  // 있게 했다.
  let connectionsHtml = '';
  if(e.connections && e.connections.length){
    const links = e.connections.map(cid=>{
      const target = findEventById(cid);
      if(!target) return '';
      return `<a href="#" class="pop-conn-link" onclick="navigateToEvent('${cid}'); return false;">${target.title_ko}</a>`;
    }).filter(Boolean);
    if(links.length){
      // 관련 사건: 아코디언(details). 기본은 펼침(open) — 긴 사건에서도 연결
      // 탐색이 바로 보이도록. 관련 사건이 4개를 넘으면 접어서 공간을 아낀다.
      const openAttr = links.length <= 4 ? ' open' : '';
      connectionsHtml = `<details class="pop-connections"${openAttr}><summary><b>관련 사건</b> <span class="pop-conn-count">${links.length}</span></summary><div class="pop-conn-list">${links.join('')}</div></details>`;
    }
  }

  let videoHtml = '';
  if(e.video){
    videoHtml = `<div class="pop-video">
      <a href="https://www.youtube.com/watch?v=${e.video}" target="_blank" rel="noopener">
        <img src="https://img.youtube.com/vi/${e.video}/hqdefault.jpg" alt="영상 미리보기" loading="lazy">
        <span class="play-badge"></span>
      </a>
      <div class="cap">▶ 관련 영상 · 누르면 유튜브로 재생</div>
    </div>`;
  }
  // 지속 기간 배지: visible 범위가 발생연도보다 길면 표시
  let durationHtml = '';
  const vf = e.visible_from ?? e.year;
  const vu = e.visible_until ?? e.year;
  if(vu > vf){
    durationHtml = `<div class="pop-duration">${vf} – ${vu} 지속</div>`;
  }

  // ── 세계의 흐름(World Context) — 정보창 맨 끝에만 덧붙는 보조 맥락 ──
  // WORLD_CONTEXT[e.id] → 세계 사건 id 배열(최대 3개) → WORLD_EVENTS에서 조회.
  // 두 데이터(world_events.js, world_context.js)가 아직 로드되지 않았거나
  // 이 한국 카드에 연결이 없으면 조용히 빈 문자열로 건너뛴다 — 플레이스홀더 없음.
  // 여기서는 '읽는 맥락'만 제공한다: 펼치면 worldEventCardHtml과 동일한 3단
  // 설명(무슨 일/왜 중요/무엇이 달라졌는가)이 보이지만, 별도 클릭 탐색·인물
  // 상세·연표 이동 같은 추가 동작은 만들지 않는다(세계 마커를 직접 눌러야 함).
  let worldContextHtml = '';
  if(typeof WORLD_CONTEXT !== 'undefined' && typeof WORLD_EVENTS !== 'undefined'){
    const wids = WORLD_CONTEXT[e.id] || [];
    const cards = wids.map(wid => WORLD_EVENTS[wid]).filter(Boolean).slice(0, 3);
    if(cards.length){
      const items = cards.map(w => {
        const label = WORLD_TYPE_LABEL[w.type] || '';
        return `<div class="world-context-item">
          <div class="world-context-head" data-type="${w.type}">🌍 ${label} · ${w.title}</div>
          ${worldEventCardHtml(w, e.year)}
        </div>`;
      }).join('');
      worldContextHtml = `<details class="pop-world-context"><summary><b>세계는 같은 시기</b></summary>${items}</details>`;
    }
  }

  return `
    ${imageHtml}
    <div class="pop-type" style="background:${color}">${TYPE_LABEL[e.type]}</div>
    <div class="pop-title">${e.title_ko}</div>
    <div class="pop-date">${e.year}년${e.month!=null?' '+(e.month+1)+'월':''}${e.day?' '+e.day+'일':''} · ${e.place_ko}</div>
    ${durationHtml}
    ${peopleHtml}
    <div class="pop-summary">${e.summary_ko}</div>
    ${connectionsHtml}
    ${galleryHtml}
    ${videoHtml}
    ${worldContextHtml}
  `;
}

// 겹친 마커를 화면 픽셀 기준으로 감지해 작은 원형으로 펼침
function declutterMarkers(){
  if(!eventMarkers.length) return;
  const threshold = 22; // 픽셀: 이보다 가까우면 겹침으로 판단
  // 화면 좌표 계산
  const pts = eventMarkers.map(m => {
    const p = map.latLngToLayerPoint(L.latLng(m._origLatLng[0], m._origLatLng[1]));
    return { marker:m, x:p.x, y:p.y, orig:p };
  });
  // 충돌 그룹 찾기 (단순 클러스터링)
  const used = new Array(pts.length).fill(false);
  for(let i=0;i<pts.length;i++){
    if(used[i]) continue;
    const group = [i];
    for(let j=i+1;j<pts.length;j++){
      if(used[j]) continue;
      const dx = pts[i].x - pts[j].x;
      const dy = pts[i].y - pts[j].y;
      if(Math.sqrt(dx*dx+dy*dy) < threshold){
        group.push(j);
        used[j] = true;
      }
    }
    used[i] = true;
    // 그룹이 2개 이상이면 원형으로 펼침
    if(group.length > 1){
      const cx = pts[i].x, cy = pts[i].y;
      const radius = Math.max(18, group.length * 7); // 개수에 비례
      group.forEach((idx, k) => {
        const angle = (2*Math.PI*k)/group.length - Math.PI/2;
        const nx = cx + radius*Math.cos(angle);
        const ny = cy + radius*Math.sin(angle);
        const newLatLng = map.layerPointToLatLng(L.point(nx, ny));
        pts[idx].marker.setLatLng(newLatLng);
        // 펼쳐진 마커임을 표시하는 가는 연결선
        const leg = L.polyline(
          [map.layerPointToLatLng(L.point(cx,cy)), newLatLng],
          { color:pts[idx].marker._eventColor||'#b89860', weight:1, opacity:0.4, interactive:false }
        ).addTo(map);
        layers.push(leg);
      });
    } else {
      // 단독 마커는 원위치 유지
      pts[i].marker.setLatLng(L.latLng(pts[i].marker._origLatLng[0], pts[i].marker._origLatLng[1]));
    }
  }
}

function drawConnections(events){
  const renderedEdges = new Set();
  const idMap = Object.fromEntries(events.map(v=>[v.id, v]));
  events.forEach(e=>{
    (e.connections||[]).forEach(c=>{
      const target = idMap[c];
      if(!target) return;
      // 좌표 기반 dedupe (양방향·중복 모두 차단)
      const key = [[e.lat,e.lng].join(','), [target.lat,target.lng].join(',')].sort().join('|');
      if(renderedEdges.has(key)) return;
      renderedEdges.add(key);
      const line = L.polyline(
        [[e.lat,e.lng],[target.lat,target.lng]],
        { color:'#b89860', weight:1, opacity:0.22, dashArray:'4 6', interactive:false }
      ).addTo(map);
      layers.push(line);
    });
  });
}

function renderYear(year){
  clearLayers();
  eventMarkers = [];

  // 세계 사건 마커를 먼저 그린다 — 한국 마커보다 아래(z-order)에 깔려
  // 한국사를 가리지 않는다(우선순위: 한국 마커 > 세계 사건 마커 > 세계 분위기).
  renderWorldEvents(year);

  const showEvent = document.getElementById('layerEvent')?.checked ?? true;
  const showPerson = document.getElementById('layerPerson')?.checked ?? false;
  const showPolicy = document.getElementById('layerPolicy')?.checked ?? true;

  const visible = getVisibleEvents(year);
  console.log('렌더 시작', year, '· 표시 사건', visible.length);

  // 레이어 필터를 통과한 사건만 연결선 대상으로
  const showEvent2 = document.getElementById('layerEvent')?.checked ?? true;
  const showPerson2 = document.getElementById('layerPerson')?.checked ?? false;
  const showPolicy2 = document.getElementById('layerPolicy')?.checked ?? true;
  const connectable = visible.filter(e=>{
    if(e.type === 'person') return showPerson2;
    if(e.type === 'policy') return showPolicy2;
    return showEvent2;
  });
  drawConnections(connectable);

  // ④ 사건 수 표시 (표시 / 전체)
  const ec = document.getElementById('eventCount');
  if(ec){
    const totalThisYear = Object.values(DATA).flat().filter(ev=>{
      const f = ev.visible_from ?? ev.year, u = ev.visible_until ?? ev.year;
      return year >= f && year <= u;
    }).length;
    ec.textContent = '표시 ' + connectable.length + ' / ' + totalThisYear;
  }

  visible.forEach((e, index)=>{
   try {
    // 좌표 방어
    if(e.lat == null || e.lng == null){ console.warn('좌표 없음:', index, e.title_ko); return; }
    // 줌 레벨 기반 importance 필터: 축소 시 핵심만, 확대 시 전부
    const z = map.getZoom();
    const imp = getImportance(e);
    if(z < 5 && imp !== 'global') return;
    if(z < 6 && imp === 'local') return;
    // 레이어 필터
    if(e.type === 'person' && !showPerson) return;
    if(e.type === 'policy' && !showPolicy) return;
    if(e.type !== 'person' && e.type !== 'policy' && !showEvent) return;

    // 생명주기에 따른 투명도: 사건 당해는 100%, 이후 연도는 점차 흐려짐
    const eventYear = e.year;
    const until = e.visible_until ?? e.year;
    let opacity = 1.0;
    if(year > eventYear){
      const elapsed = year - eventYear;
      const total = until - eventYear || 1;
      opacity = Math.max(0.15, 1 - (elapsed / total) * 0.85);
    }
    const color = COLORS[e.type];

    // 학살: 영역(수채화 느낌 원)
    if(e.area){
      const circle = L.circle([e.lat,e.lng], {radius:e.areaRadius||50000, color:color, fillColor:color, fillOpacity:0.28, weight:1, opacity:0.5}).addTo(map);
      circle.on('click', ()=>{
        if(window.trackPageView) window.trackPageView('card', e.title_ko || e.title_en || e.id);
        if(window.trackEventOpen) window.trackEventOpen(e);
        if(window.openInfoPanel) openInfoPanel(popupHtml(e));
      });
      layers.push(circle);
    }

    // 점 → 유형 기반 SVG 아이콘 (markerIcons.js)
    // 펄스 애니메이션: 당해 연도 사건에만
    const isCurrentYear = (e.year === year);
    const icon = makeMarkerIcon(e.type, { color, opacity, pulse:isCurrentYear });
    const m = L.marker([e.lat,e.lng], {icon}).addTo(map);
    m.on('click', ()=>{
      if(window.trackPageView) window.trackPageView('card', e.title_ko || e.title_en || e.id);
      if(window.trackEventOpen) window.trackEventOpen(e);
      if(window.openInfoPanel) openInfoPanel(popupHtml(e));
      // 선택 링 표시
      if(typeof setSelectRing === 'function'){ try{ setSelectRing(m); }catch(_){} }
    });
    attachSelectRing(m);
    m._origLatLng = [e.lat, e.lng];
    m._eventColor = color;
    m._eventId = e.id;
    eventMarkers.push(m);
    layers.push(m);
   } catch(err){
    console.error('이벤트 렌더 오류:', e.title_ko, err);
   }
  });
  declutterMarkers();
  // 중국 왕조 라벨 레이어도 현재 연도로 갱신 (js/chinaLayer.js)
  if (typeof renderChinaDynastiesAtYear === 'function') { try { renderChinaDynastiesAtYear(year); } catch(_){} }
}

// ── 안전 렌더링 래퍼 ──
// 데이터 오류로 렌더링이 죽어도 전체 앱이 멈추지 않도록 감싼다.
function safeRender(year) {
  try {
    renderYear(year);
  } catch(err) {
    console.error('렌더링 오류:', err);
    alert('오류: ' + err.message);
  }
}

// ── 관련 사건 클릭 이동 ──
// popupHtml()의 "관련 사건" 링크와 routeRenderer.js의 마커 클릭에서
// 호출된다. 다른 연도의 사건일 수도 있으므로: (검색 중이면 먼저 해제) →
// 슬라이더를 그 사건의 연도로 옮기고 다시 렌더링 → 지도를 그 위치로
// 이동 → 마커를 찾아 팝업을 연다.
// opts.openPanel = false 로 호출하면 정보창은 열지 않고 지도 이동만 한다
// (루트 사이드 패널 항목 클릭 등, 이미 텍스트로 정보가 충분한 경우 용도).
function navigateToEvent(id, opts){
  const openPanel = !(opts && opts.openPanel === false);
  const target = findEventById(id);
  if(!target){ console.warn('관련 사건을 찾을 수 없음:', id); return; }

  // 검색 결과를 보다가 관련 사건을 누른 경우, 연도별 화면으로 돌아가야
  // 자연스럽다 — 검색 결과 집합 안에 그 사건이 없을 수도 있기 때문.
  if (typeof isSearchActive === 'function' && isSearchActive() && typeof clearSearch === 'function') {
    clearSearch();
  }

  // 루트가 열려있는 동안에는 슬라이더/연도 렌더링을 건드리지 않는다 —
  // safeRender(year)를 호출하면 그 연도의 모든 일반 사건 마커가 루트
  // 마커 위에 겹쳐 그려지는 문제가 있었다(루트는 routeLayers[]로 독립
  // 관리되어 clearLayers() 대상이 아니므로, 새로 그려진 layers[]가
  // 그대로 남아 루트와 뒤섞여 보인다).
  const routeActive = typeof getActiveRouteId === 'function' && getActiveRouteId();

  if (!routeActive) {
    const slider = document.getElementById('slider');
    if(slider){
      slider.value = target.year;
      const yearNumEl = document.getElementById('yearNum');
      if(yearNumEl) yearNumEl.textContent = target.year;
      const ganjiEl = document.getElementById('ganji');
      if(ganjiEl && typeof getGanji === 'function') ganjiEl.textContent = getGanji(target.year);
      safeRender(target.year);
      if (typeof updateEra === 'function') updateEra(target.year);
    }
  }

  map.setView([target.lat, target.lng], Math.max(map.getZoom(), 7));
  // 새 사건의 정보창을 연다(기존 팝업 방식 대체). 마커 선택 링도 갱신.
  if(openPanel && window.trackPageView) window.trackPageView('card', target.title_ko || target.title_en || target.id);
  if(openPanel && window.trackEventOpen) window.trackEventOpen(target);
  if(openPanel && window.openInfoPanel) openInfoPanel(popupHtml(target));
  const marker = eventMarkers.find(m => m._eventId === id);
  if(marker && typeof setSelectRing === 'function') setSelectRing(marker);
}
