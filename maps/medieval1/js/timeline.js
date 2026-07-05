// ═══════════════════════════════════════════════════════
// timeline.js — 왕조(재위기간) 슬라이더 (중세1, 고려 918~1392)
// 의존: js/reigns.js (REIGNS, REIGNS_MIN_YEAR/MAX_YEAR),
//       app.js (getGanji, DATA), map.js (map), renderer.js (safeRender)
//
// 근대/근현대/현대 지도의 연도 슬라이더는 최소~최대가 균일한 연 단위라
// 그대로 왕조 슬라이더에 쓸 수 없다 — 왕마다 재위기간이 크게 달라서
// (영조 52년 vs 인종 8개월), 균일한 연도 슬라이더 위에 "왕조 띠"를
// 얹어 비례 폭(+최소폭 보장)으로 왕의 재위기간을 시각화한다.
//
// 슬라이더 자체(#slider)는 여전히 연도값을 그대로 쓴다(min/max/value가
// 실제 연도) — 오히려 이 편이 좋다: 1년 = 1단위 폭이므로 "왕조 비례"가
// 슬라이더 트랙 자체에서 이미 자동으로 성립한다. 이 파일이 추가하는 건
// (1) 왕 경계를 표시하는 시각적 띠(#reignBand, 최소폭 보장을 위해 순수
// %비율이 아니라 flex-basis로 렌더링), (2) 현재 연도가 속한 왕을 찾아
// "세종 (1418~1450)" 라벨을 표시하는 로직이다.
// ═══════════════════════════════════════════════════════

// ── 왕조 띠 렌더링 — 최초 1회만 DOM을 만든다(연도 이동마다 다시 그리지
// 않는다 — 활성 세그먼트 표시는 CSS 클래스 토글만으로 처리) ──
function renderReignBand(){
  const band = document.getElementById('reignBand');
  if (!band) return;

  const totalYears = REIGNS_MAX_YEAR - REIGNS_MIN_YEAR;
  // 절대좌표 + 슬라이더와 완전히 동일한 선형 공식으로 위치를 계산한다
  // (flex-basis 재분배 방식은 오차가 누적돼 슬라이더와 어긋났다 —
  // 자세한 설명은 중세2/조선의 timeline.js 주석 참고, 같은 수정을 적용).
  function pctFormula(year){
    return ((year - REIGNS_MIN_YEAR) / totalYears) * 100;
  }

  band.innerHTML = REIGNS.map((r, i) => {
    const displayEnd = r.display_end_year ?? r.end_year;
    const startPct = pctFormula(r.start_year);
    const endPct = pctFormula(displayEnd);
    const label = r.segment ? `${r.name}(${r.segment})` : r.name;
    const continuesNote = r.continues_in ? ' data-continues="1"' : '';
    return `<button type="button" class="reign-seg" data-start="${r.start_year}" data-end="${displayEnd}"
      style="left:calc((100% - 24px) * ${(startPct / 100).toFixed(6)} + 12px);
             width:calc((100% - 24px) * ${((endPct - startPct) / 100).toFixed(6)});"
      title="${label} ${r.start_year}~${displayEnd}"${continuesNote}>
      <span class="reign-seg-label">${label}</span>
    </button>`;
  }).join('');

  band.querySelectorAll('.reign-seg').forEach(btn => {
    btn.addEventListener('click', () => {
      const y = parseInt(btn.dataset.start, 10);
      slider.value = y;
      syncToYear(y);
    });
  });
}

// ── 현재 연도가 속한 왕(재위기간) 찾기 ──
// ── 현재 연도가 속한 왕(재위기간) 찾기 ──
// 경계 연도 처리: 마지막 왕이 아니면 [start, displayEnd) 반열림 구간으로
// 취급해 경계년이 "다음 왕"에게만 속하게 한다 — 라벨과 띠 활성 표시가
// 항상 같은 왕 하나만 가리키도록 하기 위함(중세2/조선과 동일한 로직).
function getReign(year){
  for (let i = 0; i < REIGNS.length; i++){
    const r = REIGNS[i];
    const displayEnd = r.display_end_year ?? r.end_year;
    const isLast = (i === REIGNS.length - 1);
    if (year >= r.start_year && (isLast ? year <= displayEnd : year < displayEnd)) return r;
  }
  return REIGNS[REIGNS.length - 1] || null;
}

// ── 왕조 라벨 갱신 + 활성 세그먼트 표시 ──
let _lastTrackedReignLabel = null;
function updateReignLabel(year){
  const reign = getReign(year);
  const label = document.getElementById('reignLabel');
  if (label) {
    if (reign) {
      const displayEnd = reign.display_end_year ?? reign.end_year;
      const nm = reign.segment ? `${reign.name}(${reign.segment})` : reign.name;
      label.textContent = `${nm} (${reign.start_year}~${displayEnd})`;
    } else {
      label.textContent = '';
    }
  }

  const band = document.getElementById('reignBand');
  if (band) {
    const segButtons = Array.from(band.querySelectorAll('.reign-seg'));
    segButtons.forEach((btn, i) => {
      const s = parseInt(btn.dataset.start, 10), e = parseInt(btn.dataset.end, 10);
      const isLast = (i === segButtons.length - 1);
      const inRange = isLast ? (year >= s && year <= e) : (year >= s && year < e);
      btn.classList.toggle('active', inRange);
    });
  }

  if (reign && reign.name !== _lastTrackedReignLabel) {
    _lastTrackedReignLabel = reign.name;
    if (window.trackTimelineMove) window.trackTimelineMove(reign.name);
  }
}

// ── 연도별 시대 부제·설명 — 콘텐츠가 채워지는 대로 이 객체에 추가한다.
// 비어 있는 연도는 updateEra()가 안전하게 아무것도 표시하지 않는다. ──
const ERA = {
  918:{ text:'고려 건국', desc:'궁예의 신하였던 왕건이 정변으로 왕위에 올라 국호를 고려로 정했다.' },
};

function updateEra(year){
  const era = ERA[year] || {text:'', desc:''};
  const eraText = document.getElementById('eraText');
  const eraDesc = document.getElementById('eraDesc');
  if (eraText) eraText.textContent = era.text;
  if (eraDesc) eraDesc.textContent = era.desc;
  const eraCard = document.getElementById('eraCard');
  if (eraCard) eraCard.setAttribute('data-era-title', era.text || '');
}

// ── 연도 확정 로직(슬라이더 input/최초 로드 공용) ──
function syncToYear(y){
  const yearNum = document.getElementById('yearNum');
  if (yearNum) yearNum.textContent = y;
  const ganji = document.getElementById('ganji');
  if (ganji) ganji.textContent = getGanji(y);
  if (window.closeInfoPanel) closeInfoPanel();
  safeRender(y);
  updateEra(y);
  updateReignLabel(y);
  if (typeof renderHistoricalLabels === 'function') renderHistoricalLabels(y, map.getZoom());
}

const slider = document.getElementById('slider');
slider.addEventListener('input', function(){
  if (typeof isSearchActive === 'function' && isSearchActive() && typeof clearSearch === 'function') {
    clearSearch();
  }
  syncToYear(parseInt(this.value, 10));
});

slider.addEventListener('change', function(){
  if (window.trackYearChange) window.trackYearChange(parseInt(this.value, 10));
  if (window.innerWidth < 1024) return;
  const eraDesc = document.getElementById('eraDesc');
  if (eraDesc?.textContent?.trim()) {
    if (typeof window.openEraCard === 'function') {
      window.openEraCard();
    } else {
      document.getElementById('eraCard')?.classList.add('open');
    }
  }
});

renderReignBand();
