// ═══════════════════════════════════════════════════════
// timeline.js — 왕조 챕터 내비게이션 (중세1, 고려 918~1392)
// 조선(중세2)과 완전히 동일한 구조 — 자세한 설명은 그쪽 timeline.js
// 주석 참고. 연도 슬라이더 없음, 왕 재위기간 하나가 챕터 하나.
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

function renderCurrentChapter(){
  const [start, end] = currentReignRange();
  safeRenderRange(start, end);
}

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

function reignIndexForYear(year){
  for (let i = 0; i < REIGNS.length; i++){
    const r = REIGNS[i];
    const displayEnd = r.display_end_year ?? r.end_year;
    const isLast = (i === REIGNS.length - 1);
    if (year >= r.start_year && (isLast ? year <= displayEnd : year < displayEnd)) return i;
  }
  return REIGNS.length - 1;
}

const ERA = {
  918:{ text:'고려 건국', desc:'궁예의 신하였던 왕건이 정변으로 왕위에 올라 국호를 고려로 정했다.' },
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
