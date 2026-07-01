// ═══════════════════════════════════════════════════════
// routeRenderer.js — 루트(Route) 레이어 렌더링 엔진
//
// 의존: app.js (COLORS), map.js (map)
//
// 핵심 원칙:
//   1. 기존 renderer.js / clearLayers()와 완전히 독립 — routeLayers[] 별도 관리
//   2. 루트는 연도가 바뀌어도 유지된다 (연도 슬라이더 영향 받지 않음)
//   3. 마커든 우측 연표(사이드 패널) 항목이든, 클릭하면 정보창을 열지
//      않는다 — 연표 자체에 이미 날짜·장소·제목이 있어 정보창이 중복
//      이라는 판단. 클릭 시에는 지도 이동 + 해당 마커 깜빡임(flash) +
//      연표 항목 강조만 한다.
//   4. 웨이포인트 사이 이동 경로 선(segments)은 더 이상 그리지 않는다
//      (화면을 어지럽힌다는 피드백). route.segments 데이터 자체는
//      남겨뒀다 — 지도에 그리지만 않을 뿐.
//   5. 루트 ON/OFF, 루트 간 전환은 전부 이 파일이 담당
// ═══════════════════════════════════════════════════════

(function () {

  // ── 루트 레이어 독립 배열 ──────────────────────────────────
  // clearLayers()(renderer.js)는 이 배열을 절대 건드리지 않는다.
  let routeLayers = [];
  let activeRouteId = null;
  // wp.id → Leaflet marker. 사이드 패널 항목을 클릭했을 때 지도 위
  // 정확히 어떤 마커로 이동했는지 깜빡임(flash)으로 보여주기 위해 추적한다.
  let routeMarkerById = {};

  // ── 루트 데이터 레지스트리 ─────────────────────────────────
  // routes/*.js 파일이 로드되면 여기에 등록된다.
  // 새 루트를 추가할 때는 routes/xxx.js를 만들고
  // index.html에 <script src="routes/xxx.js"> 한 줄만 추가하면 된다.
  const ROUTE_REGISTRY = {};

  window.registerRoute = function (routeObj) {
    ROUTE_REGISTRY[routeObj.id] = routeObj;
  };

  // ── 루트 모드 UI 전환 ──────────────────────────────────────
  // 루트가 열려있는 동안 슬라이더를 움직이면 renderYear()가 layers[]를
  // 새로 그리면서 루트 마커(routeLayers[], 별도 배열이라 안 지워짐)와
  // 시각적으로 겹친다. 이걸 막기 위해 루트가 열리는 동안은 슬라이더·
  // 헤더·연도표시·범례/레이어 토글을 통째로 숨긴다 — 기존 렌더링 로직
  // (renderYear, clearLayers 등)은 전혀 건드리지 않고, 순수하게 "이
  // UI를 보이지 않게 한다"는 화면 레벨의 조치만 한다.
  const ROUTE_MODE_HIDE_SELECTORS = [
    '.header', '.year-display', '.era-card', '.timeline', '.right-stack'
  ];

  function enterRouteMode() {
    document.body.classList.add('route-mode-active');
    ROUTE_MODE_HIDE_SELECTORS.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => { el.dataset.routeHidden = '1'; });
    });
  }

  function exitRouteMode() {
    document.body.classList.remove('route-mode-active');
    document.querySelectorAll('[data-route-hidden]').forEach(el => {
      delete el.dataset.routeHidden;
    });
  }

  // ── 루트 레이어 전체 제거 ─────────────────────────────────
  function clearRouteLayers() {
    routeLayers.forEach(layer => {
      try { if (map.hasLayer(layer)) map.removeLayer(layer); } catch (_) { }
    });
    routeLayers.length = 0;
    routeMarkerById = {};
  }

  // ── 웨이포인트 타입별 색상 ────────────────────────────────
  // 루트 색상(route.color)이 기본, 비극/죽음/귀환은 별도 강조
  const WP_TYPE_COLOR = {
    birth: '#a8c8a0',        // 연한 초록 — 출생
    life: '#c8b87a',         // 황토 — 일상
    battle: '#c44536',       // 붉은 — 전투
    tragedy: '#7a4a4a',      // 어두운 적갈 — 비극
    exile: '#6d8db4',        // 청회색 — 망명/이동
    political: '#7a6890',    // 보라 — 정치
    death: '#4a4a4a',        // 거의 검정 — 사망
    repatriation: '#4a9cc8', // 하늘색 — 귀환/봉환
  };

  const WP_TYPE_LABEL = {
    birth: '출생',
    life: '생활·노동',
    battle: '전투',
    tragedy: '비극',
    exile: '망명·이동',
    political: '정치·외교',
    death: '사망',
    repatriation: '귀환·봉환',
  };

  // ── 이동 경로 선 스타일 ────────────────────────────────────
  function getSegmentStyle(seg, routeColor) {
    const base = {
      color: routeColor,
      weight: 2.2,
      opacity: 0.72,
    };
    if (seg.move_type === 'forced') {
      // 강제이주 — 붉은 계열 굵은 점선으로 강조
      return { ...base, color: '#c44536', weight: 3, opacity: 0.85, dashArray: '6 5' };
    }
    if (seg.line_style === 'dashed') {
      return { ...base, opacity: 0.45, dashArray: '5 7' };
    }
    if (seg.move_type === 'sea') {
      return { ...base, dashArray: '3 5', opacity: 0.60 };
    }
    return base;
  }

  // ── 웨이포인트 마커 HTML ──────────────────────────────────
  // 기존 .atlas-marker 스타일을 재사용하되 루트 전용 클래스 추가
  function buildWaypointIcon(wp, routeColor) {
    const color = WP_TYPE_COLOR[wp.type] || routeColor;
    // 비극/사망/전투는 좀 더 크게, 나머지는 작게
    const size = ['battle', 'tragedy', 'death', 'repatriation'].includes(wp.type) ? 28 : 22;
    const half = size / 2;

    // 아이콘 SVG — 타입별 간단한 심볼
    const SYMBOLS = {
      birth: '<circle cx="12" cy="12" r="5" fill="currentColor"/>',
      life: '<rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor"/>',
      battle: '<path d="M12 3l2.4 5.5 5.8.5-4.3 4 1.3 5.8L12 16l-5.2 2.8 1.3-5.8-4.3-4 5.8-.5z" fill="currentColor"/>',
      tragedy: '<path d="M12 4l2 5h5l-4 3 1.5 5.5L12 15l-4.5 2.5L9 12 5 9h5z" stroke="currentColor" stroke-width="1.5" fill="none"/><line x1="12" y1="8" x2="12" y2="14" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="16" r="1.5" fill="currentColor"/>',
      exile: '<path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>',
      political: '<circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="12" cy="12" r="2.5" fill="currentColor"/>',
      death: '<line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2.5"/><line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2.5"/>',
      repatriation: '<path d="M12 4l0 12M7 12l5 5 5-5" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    };

    const svgInner = SYMBOLS[wp.type] || SYMBOLS['life'];
    const html =
      `<div class="route-wp-marker" style="color:${color};width:${size}px;height:${size}px;">`
      + `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true">${svgInner}</svg>`
      + `</div>`;

    return L.divIcon({
      className: '',
      iconSize: [size, size],
      iconAnchor: [half, half],
      html,
    });
  }

  // ── 루트 전용 웨이포인트 팝업 HTML ───────────────────────────
  function buildRouteWaypointHtml(wp, routeName) {
    const typeLabel = WP_TYPE_LABEL[wp.type] || wp.type;
    const typeColor = WP_TYPE_COLOR[wp.type] || '#888';
    const dateStr = [wp.year, wp.month != null ? `${wp.month}월` : null]
      .filter(Boolean).join(' ');
    const stayHtml = wp.stay
      ? `<p class="route-wp-stay">체류: ${wp.stay}</p>`
      : '';

    return `
<div class="route-waypoint-popup">
  <div class="route-wp-header">
    <span class="route-wp-badge" style="background:${typeColor};">${typeLabel}</span>
    <span class="route-wp-date">${dateStr}</span>
  </div>
  <h2 class="route-wp-title">${wp.title_ko}</h2>
  <p class="route-wp-place">📍 ${wp.place_ko}</p>
  ${stayHtml}
  <p class="route-wp-summary">${wp.summary_ko || ''}</p>
  <p class="route-wp-from">— ${routeName}</p>
</div>`;
  }

  // ── 루트 패널 사이드바 HTML ───────────────────────────────────
  // 웨이포인트 목록을 세로 타임라인으로 보여준다.
  function buildRoutePanelHtml(route) {
    const wpRows = route.waypoints.map((wp, i) => {
      const typeColor = WP_TYPE_COLOR[wp.type] || route.color;
      const typeLabel = WP_TYPE_LABEL[wp.type] || wp.type;
      const dateStr = wp.year + (wp.month != null ? `년 ${wp.month}월` : '년');
      return `
      <li class="route-panel-wp" data-wp-id="${wp.id}"
          onclick="window.focusRouteWaypoint && window.focusRouteWaypoint('${route.id}','${wp.id}')">
        <span class="route-panel-dot" style="background:${typeColor};"></span>
        <div class="route-panel-wp-body">
          <span class="route-panel-wp-date">${dateStr}</span>
          <span class="route-panel-wp-title">${wp.title_ko}</span>
          <span class="route-panel-wp-place">${wp.place_ko}</span>
        </div>
      </li>`;
    }).join('');

    // 히어로 이미지 — 루트에 지정된 것이 있으면 배경으로, 없으면
    // 텍스트만 있는 대신 은은한 그라디언트 배경을 깔아 "빈 느낌"을 줄인다.
    const heroStyle = route.hero_image
      ? `background-image:linear-gradient(180deg, rgba(20,17,14,0.15), rgba(20,17,14,0.92)), url('${route.hero_image}');`
      : `background:linear-gradient(135deg, ${route.color}22, rgba(20,17,14,0.9));`;

    return `
<div class="route-panel-wrap">
  <div class="route-panel-hero" style="${heroStyle}">
    <span class="route-panel-period">${route.period}</span>
    <h2 class="route-panel-name">${route.name}</h2>
    <p class="route-panel-tagline">${route.tagline || ''}</p>
    <p class="route-panel-hint">지도의 점을 눌러 위치를 확인하세요 · 총 ${route.waypoints.length}개 지점</p>
  </div>
  <ul class="route-panel-list">${wpRows}</ul>
  <button class="route-panel-close-btn" onclick="window.closeRoute && window.closeRoute()">
    루트 닫기
  </button>
</div>`;
  }

  // ── 루트 렌더링 메인 ──────────────────────────────────────────
  function renderRoute(routeId) {
    const route = ROUTE_REGISTRY[routeId];
    if (!route) { console.warn('Route not found:', routeId); return; }

    clearRouteLayers();
    activeRouteId = routeId;
    enterRouteMode();

    // ── 기존 연도별 레이어 제거 ──
    // 루트 레이어(routeLayers[])는 clearLayers()의 영향을 받지 않도록
    // 일부러 독립시켰지만, 그 반대 방향은 막지 않았다 — 루트를 여는
    // "이 순간"에 화면에 떠 있던 일반 연도 마커(layers[])와 세계사
    // 배경(worldLayers[])은 루트와 무관하므로 반드시 지워야 한다.
    // (슬라이더는 route-mode-active로 숨기지만, 데이터 레이어 자체는
    //  안 지우면 루트 마커와 겹쳐 보이는 문제가 있었다.)
    if (typeof clearLayers === 'function') clearLayers();
    if (typeof clearWorldLayers === 'function') clearWorldLayers();

    // 웨이포인트 맵 (id → 객체, 좌표)
    const wpMap = {};
    route.waypoints.forEach(wp => { wpMap[wp.id] = wp; });

    // (이동 경로 선은 더 이상 그리지 않는다 — 웨이포인트가 많은 루트일수록
    // 선이 화면을 어지럽히기만 하고, 정보 가치도 낮다는 피드백에 따라
    // 제거했다. route.segments 데이터 자체는 남겨둔다 — 나중에 다시
    // 쓰고 싶어질 수도 있고, 지우면 각 route 파일에서도 다 들어내야 해서
    // 굳이 지금 손댈 이유가 없다.)

    // ── 웨이포인트 마커 그리기 ──
    route.waypoints.forEach(wp => {
      const icon = buildWaypointIcon(wp, route.color);
      const marker = L.marker([wp.lat, wp.lng], { icon, zIndexOffset: 500 }).addTo(map);

      // 마커를 클릭해도 더 이상 정보창을 열지 않는다 — 우측 연표에 이미
      // 날짜·장소·제목이 있어 정보창이 중복이라는 피드백에 따라, 지도
      // 위 마커 클릭도 연표 항목 클릭과 동일하게 "위치 확인(강조+깜빡임)"
      // 만 하도록 통일했다.
      marker.on('click', () => {
        highlightPanelItem(wp.id);
        flashRouteMarker(wp.id);
      });

      marker._origLatLng = [wp.lat, wp.lng];
      routeMarkerById[wp.id] = marker;
      routeLayers.push(marker);
    });

    // ── 루트 사이드 패널 표시 ──
    showRoutePanel(route);

    // ── 지도 범위를 루트 전체에 맞춤 ──
    const bounds = route.waypoints
      .filter(wp => wp.lat && wp.lng)
      .map(wp => [wp.lat, wp.lng]);
    if (bounds.length > 1) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 5 });
    }

    // ── 겹친 마커 펼치기 ──
    // 상하이·경성처럼 여러 웨이포인트가 같은 도시(거의 같은 좌표)에
    // 몰리면 화면상 한 점으로 겹쳐 보여 클릭하기 어려웠다. fitBounds
    // 이후(줌이 확정된 뒤) 화면 픽셀 기준으로 가까운 마커들을 원형으로
    // 살짝 펼친다.
    map.once('moveend', declutterRouteMarkers);
  }

  // 화면 좌표 기준으로 가까운 마커들을 찾아 작은 원형으로 펼친다.
  // renderer.js의 declutterMarkers()와 같은 접근이지만 routeMarkerById를
  // 대상으로 하고, 원위치는 marker._origLatLng에 저장해 둔 값으로 매번
  // 다시 계산한다(줌이 바뀌어도 누적 오차 없이 정확하게 펼쳐지도록).
  function declutterRouteMarkers() {
    const ids = Object.keys(routeMarkerById);
    if (!ids.length) return;
    const threshold = 26; // 픽셀: 이보다 가까우면 겹침으로 판단
    const pts = ids.map(id => {
      const marker = routeMarkerById[id];
      const p = map.latLngToLayerPoint(L.latLng(marker._origLatLng[0], marker._origLatLng[1]));
      return { id, marker, x: p.x, y: p.y };
    });
    const used = new Array(pts.length).fill(false);
    for (let i = 0; i < pts.length; i++) {
      if (used[i]) continue;
      const group = [i];
      for (let j = i + 1; j < pts.length; j++) {
        if (used[j]) continue;
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < threshold) {
          group.push(j);
          used[j] = true;
        }
      }
      used[i] = true;
      if (group.length > 1) {
        const cx = pts[i].x, cy = pts[i].y;
        const radius = Math.max(16, group.length * 6.5);
        group.forEach((idx, k) => {
          const angle = (2 * Math.PI * k) / group.length - Math.PI / 2;
          const nx = cx + radius * Math.cos(angle);
          const ny = cy + radius * Math.sin(angle);
          pts[idx].marker.setLatLng(map.layerPointToLatLng(L.point(nx, ny)));
        });
      } else {
        // 단독 마커는 원래 좌표 유지
        pts[i].marker.setLatLng(L.latLng(pts[i].marker._origLatLng[0], pts[i].marker._origLatLng[1]));
      }
    }
  }

  // 루트가 열려있는 동안 줌이 바뀌면(예: 사용자가 지역을 확대) 펼침
  // 간격도 다시 계산해야 자연스럽다. map.js의 zoomend 핸들러는 루트
  // 모드일 때 safeRender를 건너뛰도록 이미 되어 있으므로, 여기서
  // 별도로 덧붙여도 서로 간섭하지 않는다.
  if (typeof map !== 'undefined' && map && typeof map.on === 'function') {
    map.on('zoomend', () => { if (activeRouteId) declutterRouteMarkers(); });
  }

  // ── 루트 사이드 패널 ──────────────────────────────────────────
  let routePanel = null;

  function showRoutePanel(route) {
    if (!routePanel) {
      routePanel = document.createElement('div');
      routePanel.id = 'routePanel';
      routePanel.className = 'route-panel';
      document.body.appendChild(routePanel);
    }
    routePanel.innerHTML = buildRoutePanelHtml(route);
    routePanel.classList.add('open');
  }

  function hideRoutePanel() {
    if (routePanel) routePanel.classList.remove('open');
  }

  function highlightPanelItem(wpId) {
    if (!routePanel) return;
    routePanel.querySelectorAll('.route-panel-wp').forEach(el => {
      el.classList.toggle('active', el.dataset.wpId === wpId);
    });
    // 패널에서 해당 항목으로 스크롤
    const active = routePanel.querySelector('.route-panel-wp.active');
    if (active) active.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ── 지도 위 마커 깜빡임 ──────────────────────────────────────
  // 사이드 패널 항목을 클릭하면 지도가 해당 좌표로 이동은 하지만,
  // 점들이 몰려있는 지역(상하이·경성 등)에서는 정확히 "어느 점"인지
  // 구분이 안 되는 문제가 있었다. 대상 마커에 잠깐 확장되는 링 애니메이션을
  // 걸어 시선을 정확히 그 지점으로 모은다.
  function flashRouteMarker(wpId) {
    const marker = routeMarkerById[wpId];
    const el = marker && marker._icon && marker._icon.querySelector('.route-wp-marker');
    if (!el) return;
    // 연속 클릭 시 애니메이션이 재시작되도록 클래스를 한 번 뗐다가 다시 붙인다.
    el.classList.remove('route-wp-marker-flash');
    void el.offsetWidth; // 강제 리플로우 — 같은 클래스를 다시 붙여도 애니메이션이 재생되게 함
    el.classList.add('route-wp-marker-flash');
    window.setTimeout(() => { el.classList.remove('route-wp-marker-flash'); }, 1800);
  }

  // ── 특정 웨이포인트로 지도 이동 ──────────────────────────────
  // 우측 연표(사이드 패널) 항목 클릭 시 호출된다. 지도 이동 + 강조 +
  // 마커 깜빡임만 한다 — 정보창은 열지 않는다(위 marker.on('click')과
  // 동일한 동작으로 통일).
  window.focusRouteWaypoint = function (routeId, wpId) {
    const route = ROUTE_REGISTRY[routeId];
    if (!route) return;
    const wp = route.waypoints.find(w => w.id === wpId);
    if (!wp) return;

    map.setView([wp.lat, wp.lng], Math.max(map.getZoom(), 6), { animate: true });
    highlightPanelItem(wpId);
    // fitBounds/setView 애니메이션이 끝난 뒤 깜빡여야 위치가 확실히 보인다.
    window.setTimeout(() => flashRouteMarker(wpId), 350);
  };

  // ── 루트 닫기 ────────────────────────────────────────────────
  window.closeRoute = function () {
    clearRouteLayers();
    hideRoutePanel();
    exitRouteMode();
    activeRouteId = null;

    // 루트 진입 시 지웠던 연도별 레이어를 다시 그려 정상 화면으로 복귀.
    if (typeof safeRender === 'function' && typeof currentDisplayYear === 'function') {
      const y = currentDisplayYear();
      if (y != null) safeRender(y);
    }
  };

  // ── 루트 열기 (외부 호출용) ──────────────────────────────────
  window.openRoute = function (routeId) {
    if (activeRouteId === routeId) {
      window.closeRoute();
    } else {
      renderRoute(routeId);
    }
  };

  // ── 현재 활성 루트 id 반환 ───────────────────────────────────
  window.getActiveRouteId = function () { return activeRouteId; };

  // ── 레지스트리 공개 ──────────────────────────────────────────
  window.ROUTE_REGISTRY = ROUTE_REGISTRY;

})();
