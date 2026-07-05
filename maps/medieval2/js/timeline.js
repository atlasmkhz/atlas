// ═══════════════════════════════════════════════════════
// timeline.js — 왕조 챕터 내비게이션 (중세2, 조선 1392~1875)
// 의존: js/reigns.js (REIGNS, REIGNS_MIN_YEAR/MAX_YEAR),
//       app.js (getGanji — 더는 안 쓰지만 로드 순서상 있어도 무해),
//       map.js (map), renderer.js (safeRenderRange)
//
// ── 왜 연도 슬라이더를 통째로 걷어냈는가 ──
// 500년(고려는 474년)을 연 단위로 미세 조정하는 건 애초에 무리였다.
// 왕 하나하나가 "한 챕터"이지, 왕 재위 중 어느 한 해로 더 세밀하게
// 파고들 필요가 없다 — 그 왕 때 있었던 일들은 전부 그 챕터에서 한번에
// 보여주고, 정확한 연도는 각 사건 카드(정보창) 안에서만 표시한다.
// 모바일에서는 어차피 촘촘한 슬라이더 미세조정이 잘 안 됐던 것도
// 이 결정을 뒷받침한다 — 챕터 버튼은 그냥 가로로 스크롤하며 탭하면
// 끝이라, 터치 환경에서 훨씬 자연스럽다.
//
// 왕조 띠(비례폭 세그먼트)도 함께 걷어냈다 — 그 비례폭은 "슬라이더
// 위에서 어느 왕 구간인지 보여주는" 용도였는데, 슬라이더 자체가
// 없어졌으니 더 이상 필요 없다. 지금은 왕 이름이 적힌 버튼을 순서대로
// 나열한 챕터 내비게이션 하나만 있다.
// ═══════════════════════════════════════════════════════

let currentReignIndex = 0;

function currentReign(){
  return REIGNS[currentReignIndex] || REIGNS[0];
}

function currentReignRange(){
  const r = currentReign();
  const end = r.display_end_year ?? r.end_year;
  return [r.start_year, end];
}

// 다른 파일(map.js의 zoomend, ui.js의 레이어 토글, search.js의 검색
// 해제 등)이 "지금 보고 있는 챕터를 다시 그려라"라고 요청할 때 쓰는
// 진입점 — 예전에는 다들 slider.value를 읽어 safeRender(year)를
// 불렀는데, 이제 슬라이더가 없으니 이 함수로 통일했다.
function renderCurrentChapter(){
  const [start, end] = currentReignRange();
  safeRenderRange(start, end);
}

// ── 챕터 내비게이션 렌더링(최초 1회) ──
function renderChapterNav(){
  const nav = document.getElementById('reignBand');
  if (!nav) return;
  nav.innerHTML = REIGNS.map((r, i) => {
    const displayEnd = r.display_end_year ?? r.end_year;
    const label = r.segment ? `${r.name}(${r.segment})` : r.name;
    const continuesNote = r.continues_in ? ' data-continues="1"' : '';
    return `<button type="button" class="reign-chapter-btn" data-index="${i}"${continuesNote}>
      <span class="reign-chapter-name">${label}</span>
      <span class="reign-chapter-years">${r.start_year}~${displayEnd}</span>
    </button>`;
  }).join('');

  nav.querySelectorAll('.reign-chapter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectReign(parseInt(btn.dataset.index, 10));
    });
  });
}

// ── 연도 → 챕터 인덱스 매핑 ──
// 경계 연도는 마지막 왕이 아니면 [start, displayEnd) 반열림 구간으로
// 취급해 항상 하나의 챕터에만 속하게 한다.
function reignIndexForYear(year){
  for (let i = 0; i < REIGNS.length; i++){
    const r = REIGNS[i];
    const displayEnd = r.display_end_year ?? r.end_year;
    const isLast = (i === REIGNS.length - 1);
    if (year >= r.start_year && (isLast ? year <= displayEnd : year < displayEnd)) return i;
  }
  return REIGNS.length - 1;
}

// ── 시대 부제·설명 — 챕터(왕) 단위로 채운다. 비어 있으면 아무것도
// 표시하지 않는다(콘텐츠가 채워지는 대로 이 객체에 추가). ──
const ERA = {
  1392:{ text:'조선 건국', desc:'위화도 회군으로 권력을 잡은 이성계가 공양왕을 폐위하고 새 왕조를 열었다.' },
};

function updateEra(startYear){
  const era = ERA[startYear] || {text:'', desc:''};
  const eraText = document.getElementById('eraText');
  const eraDesc = document.getElementById('eraDesc');
  if (eraText) eraText.textContent = era.text;
  if (eraDesc) eraDesc.textContent = era.desc;
  const eraCard = document.getElementById('eraCard');
  if (eraCard) eraCard.setAttribute('data-era-title', era.text || '');
}

// ── 챕터 선택 ── 라벨 갱신 + 활성 버튼 표시 + 지도 렌더 한 번에 처리.
function selectReign(index, opts){
  const silent = opts && opts.silent;
  currentReignIndex = Math.max(0, Math.min(REIGNS.length - 1, index));
  const r = currentReign();
  const displayEnd = r.display_end_year ?? r.end_year;

  const label = document.getElementById('reignLabel');
  if (label) {
    const nm = r.segment ? `${r.name}(${r.segment})` : r.name;
    label.textContent = `${nm} (${r.start_year}~${displayEnd})`;
  }

  const nav = document.getElementById('reignBand');
  if (nav) {
    nav.querySelectorAll('.reign-chapter-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.index, 10) === currentReignIndex);
    });
    // 활성 버튼이 스크롤 영역 안에 보이도록.
    const activeBtn = nav.querySelector('.reign-chapter-btn.active');
    if (activeBtn && activeBtn.scrollIntoView) {
      activeBtn.scrollIntoView({ behavior: silent ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  if (window.closeInfoPanel) closeInfoPanel();
  renderCurrentChapter();
  updateEra(r.start_year);

  if (!silent && window.trackTimelineMove) {
    window.trackTimelineMove(r.segment ? `${r.name}(${r.segment})` : r.name);
  }
}

renderChapterNav();
