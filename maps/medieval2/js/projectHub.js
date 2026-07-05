// js/projectHub.js
// "프로젝트" 메뉴 — 풀스크린 오버레이(era-hub와 같은 틀) + 탭 4개.
// 지금은 "유튜브 갤러리" 탭만 실제로 동작한다. 나머지 세 탭(퀴즈·
// 미니게임·추리게임)은 project-soon 플레이스홀더만 보여준다 — 실제
// 기능이 생기면 그 탭의 render 함수만 추가하면 된다.
//
// 의존: index.html의 #projectHub 마크업, content/youtube_videos.js
// (window.YOUTUBE_VIDEOS)

(function () {
  const projectHub = document.getElementById('projectHub');
  const projectHubScrim = document.getElementById('projectHubScrim');
  const projectHubClose = document.getElementById('projectHubClose');
  const tabsEl = document.getElementById('projectTabs');
  if (!projectHub) return; // 이 페이지에 프로젝트 허브 마크업이 없으면 조용히 종료

  function lockBodyScroll(lock) {
    document.body.style.overflow = lock ? 'hidden' : '';
  }

  window.openProjectHub = function (initialTab) {
    projectHub.classList.add('open');
    projectHub.setAttribute('aria-hidden', 'false');
    projectHubScrim?.classList.add('open');
    lockBodyScroll(true);
    if (initialTab) switchTab(initialTab);
    if (!panelYoutube.dataset.rendered) renderYoutubeGallery();
  };
  window.closeProjectHub = function () {
    projectHub.classList.remove('open');
    projectHub.setAttribute('aria-hidden', 'true');
    projectHubScrim?.classList.remove('open');
    lockBodyScroll(false);
  };

  projectHubClose?.addEventListener('click', window.closeProjectHub);
  projectHubScrim?.addEventListener('click', window.closeProjectHub);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectHub.classList.contains('open')) window.closeProjectHub();
  });

  // ── 탭 전환 ──────────────────────────────────────────────────
  const panels = {
    youtube: document.getElementById('projectPanelYoutube'),
    quiz: document.getElementById('projectPanelQuiz'),
    minigame: document.getElementById('projectPanelMinigame'),
    mystery: document.getElementById('projectPanelMystery'),
  };
  const panelYoutube = panels.youtube;

  function switchTab(tabKey) {
    if (!panels[tabKey]) return;
    tabsEl.querySelectorAll('.project-tab').forEach(btn => {
      const active = btn.dataset.tab === tabKey;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    Object.keys(panels).forEach(key => {
      if (panels[key]) panels[key].hidden = key !== tabKey;
    });
  }

  tabsEl?.addEventListener('click', (e) => {
    const btn = e.target.closest('.project-tab');
    if (!btn) return;
    switchTab(btn.dataset.tab);
  });

  // ── 유튜브 갤러리 렌더링 ─────────────────────────────────────
  function youtubeThumbUrl(video) {
    if (video.thumbnail_override) return video.thumbnail_override;
    if (video.youtube_id) return `https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`;
    return null;
  }

  function youtubeWatchUrl(video) {
    return video.youtube_id ? `https://www.youtube.com/watch?v=${video.youtube_id}` : null;
  }

  function relatedChipsHtml(video) {
    const chips = [];
    (video.related_routes || []).forEach(routeId => {
      chips.push(`<a class="video-chip video-chip-route" href="?route=${encodeURIComponent(routeId)}">🧭 관련 루트</a>`);
    });
    (video.related_events || []).forEach(eventId => {
      chips.push(`<a class="video-chip video-chip-event" href="?event=${encodeURIComponent(eventId)}">📍 관련 사건</a>`);
    });
    (video.related_events_modern2 || []).forEach(eventId => {
      chips.push(`<a class="video-chip video-chip-event" href="/maps/modern2/?event=${encodeURIComponent(eventId)}">📍 관련 사건(근현대)</a>`);
    });
    return chips.join('');
  }

  function tagsHtml(video) {
    return (video.tags || []).map(t => `<span class="video-tag">#${t}</span>`).join('');
  }

  function videoCardHtml(video) {
    const thumb = youtubeThumbUrl(video);
    const watchUrl = youtubeWatchUrl(video);
    const thumbHtml = thumb
      ? `<img src="${thumb}" alt="${video.title}" loading="lazy">`
      : `<div class="video-thumb-placeholder">영상 연결 대기중</div>`;
    const dateStr = video.published ? video.published.slice(0, 7).replace('-', '.') : '';

    return `
      <div class="video-card">
        <a class="video-thumb${watchUrl ? '' : ' video-thumb-disabled'}" ${watchUrl ? `href="${watchUrl}" target="_blank" rel="noopener"` : ''}>
          ${thumbHtml}
          ${video.duration ? `<span class="video-duration">${video.duration}</span>` : ''}
        </a>
        <div class="video-body">
          <h3 class="video-title">${watchUrl ? `<a href="${watchUrl}" target="_blank" rel="noopener">${video.title}</a>` : video.title}</h3>
          ${dateStr ? `<p class="video-date">${dateStr}</p>` : ''}
          ${video.description ? `<p class="video-desc">${video.description}</p>` : ''}
          <div class="video-tags">${tagsHtml(video)}</div>
          <div class="video-chips">${relatedChipsHtml(video)}</div>
        </div>
      </div>`;
  }

  function renderYoutubeGallery() {
    // 최신 영상이 맨 위에 오도록 published(발행일) 내림차순 정렬 —
    // content/youtube_videos.js 배열 자체의 순서(추가한 순서, 오래된
    // 영상이 앞에 옴)와는 무관하게 항상 최신순으로 보여준다.
    const rawVideos = (typeof window.YOUTUBE_VIDEOS !== 'undefined') ? window.YOUTUBE_VIDEOS : [];
    const videos = [...rawVideos].sort((a, b) => new Date(b.published) - new Date(a.published));
    if (!videos.length) {
      panelYoutube.innerHTML = `<div class="project-soon">아직 등록된 영상이 없습니다.</div>`;
    } else {
      panelYoutube.innerHTML = `<div class="video-grid">${videos.map(videoCardHtml).join('')}</div>`;
    }
    panelYoutube.dataset.rendered = '1';
  }
})();
