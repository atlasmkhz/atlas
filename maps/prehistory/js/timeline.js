// ═══════════════════════════════════════════════════════
// timeline.js — 선사시대 블록 내비게이션 (신화시대 ~ 고조선 성립)
// 고대(ancient) 지도와 같은 챕터 UI 패턴이지만, 여기는 블록 폭을
// "동일 폭"으로 그린다 — 구석기(수십만 년)와 고조선 성립기(수백 년)를
// 같은 자로 재면 스케일이 무너진다(자세한 이유는 js/blocks.js 주석
// 참고). year_label이 있는 블록(신화시대)은 "시작~끝" 연도 대신 그
// 문자열을 그대로 라벨에 쓴다.
// ═══════════════════════════════════════════════════════

let currentBlockIndex = 0;

function currentBlock(){
  return BLOCKS[currentBlockIndex] || BLOCKS[0];
}

function currentBlockRange(){
  const b = currentBlock();
  return [b.start_year, b.end_year];
}

function renderCurrentChapter(){
  const [start, end] = currentBlockRange();
  safeRenderRange(start, end);
}

function blockYearLabel(b){
  if (b.year_label) return b.year_label;
  return `${formatYearShort(b.start_year)}~${formatYearShort(b.end_year)}`;
}

// 완전 동일폭에서 로그 스케일로 바꾼다 — 순수 비례(구석기 70만년 vs
// 고조선 263년)는 한쪽이 화면을 다 덮고 한쪽은 점이 되어버리지만,
// 로그를 쓰면 "확실히 더 길게 보인다"는 직관은 살리면서 극단적인
// 비율(수백~수천 배)까지는 가지 않는다. 신화시대는 실제 연표가 없는
// 상징적 구간이라(start/end가 임의값) 로그 계산에서 빼고 기본폭만
// 준다.
const MIN_CHAPTER_WIDTH = 92;
const LOG_SCALE = 34;

function chapterWidth(b){
  if (b.year_label) return MIN_CHAPTER_WIDTH; // 신화시대처럼 실제 연표가 없는 블록
  const span = Math.max(b.end_year - b.start_year, 1);
  // 기준점: 가장 짧은 실측 블록(초기 부족사회, 100년)의 log10이 2 —
  // 그보다 긴 블록만큼 로그 차이에 비례해 폭을 더 준다.
  const extra = Math.max(0, Math.log10(span) - 2) * LOG_SCALE;
  return Math.round(MIN_CHAPTER_WIDTH + extra);
}

function renderChapterNav(){
  const nav = document.getElementById('reignBand');
  if (!nav) return;
  nav.innerHTML = BLOCKS.map((b, i) => {
    const width = chapterWidth(b);
    return `<button type="button" class="reign-chapter-btn" data-index="${i}"
      style="width:${width}px; flex:0 0 ${width}px;">
      <span class="reign-chapter-name">${b.name}</span>
      <span class="reign-chapter-years">${blockYearLabel(b)}</span>
    </button>`;
  }).join('');

  nav.querySelectorAll('.reign-chapter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectBlock(parseInt(btn.dataset.index, 10));
    });
  });
}

// ── 연도 → 블록 인덱스 매핑 ──
function blockIndexForYear(year){
  for (let i = 0; i < BLOCKS.length; i++){
    const b = BLOCKS[i];
    const isLast = (i === BLOCKS.length - 1);
    if (year >= b.start_year && (isLast ? year <= b.end_year : year < b.end_year)) return i;
  }
  return year < BLOCKS[0].start_year ? 0 : BLOCKS.length - 1;
}

// ── 시대개요 — 블록 단위(order로 찾는다, 고유값). ──
const ERA = {
  1:{ text:'신화시대 — 단군, 하늘의 아들이 나라를 열다', desc:'삼국유사와 제왕운기에 실린 단군신화는 환웅이 하늘에서 내려와 곰에서 사람이 된 웅녀와 혼인해 단군왕검을 낳고, 그가 나라를 열었다는 서사를 전한다. 실제 연표에 묶이지 않는 건국 서사로서, 로마의 로물루스·레무스 신화처럼 한민족 정체성의 핵심으로 다뤄진다.' },
  2:{ text:'구석기시대 — 뗀석기와 이동하는 삶', desc:'한반도에 사람이 살기 시작한 것은 최소 70만 년 전으로 추정된다. 돌을 깨뜨려 만든 뗀석기를 쓰며 사냥과 채집으로 살아갔고, 아직 농경이나 정착 마을은 없었다. 연천 전곡리 등에서 발굴된 아슐리안형 주먹도끼는 이 시기 동아시아 석기 기술 수준을 다시 보게 만든 유적이다.' },
  3:{ text:'신석기시대 — 정착과 토기의 시작', desc:'기원전 8000년경부터 간석기와 빗살무늬토기가 등장하며 강가·해안가에 정착 마을이 생겨났다. 농경과 목축이 시작됐고, 서울 암사동 유적처럼 대규모 마을 흔적이 남아 있다. 같은 시기 요하 유역에서는 옥기·제단 유적으로 유명한 홍산문화가 번성했는데, 이 문명의 민족적 귀속을 둘러싼 논쟁은 별도로 다룬다.' },
  4:{ text:'청동기시대 — 계급과 무덤의 등장', desc:'기원전 1500년경부터 청동 무기·의례용구가 쓰이기 시작했고, 고인돌 같은 대형 무덤이 나타나며 사회 안에 뚜렷한 계급 차이가 생겨났음을 보여준다. 비파형동검(요령식동검)은 만주~한반도 북부에 걸친 독특한 청동기 문화권을 나타내며, 이후 고조선 성립과 밀접하게 연결되는 것으로 논의된다.' },
  5:{ text:'초기 부족사회 — 아직 국가도 민족도 아니었다', desc:'이 시기 만주와 한반도 북부에는 부여·읍루·숙신·예맥 등으로 불리는 집단들이 살고 있었다고 전해지지만, 이들을 지금의 국가나 민족처럼 뚜렷한 경계로 나누기는 어렵다. 언어·혈통이 확정되지 않은 채 서로 인접해 살고 뒤섞였던, 정치체 이전의 느슨한 거주 양상으로 이해하는 것이 정확하다. 다만 이들은 훗날 부여·고구려·옥저·동예 등 여러 국가의 직접적인 모체가 되므로, 단순한 "거주"가 아니라 국가 형성으로 이어지는 초기 부족사회로 보는 것이 더 정확하다.' },
  6:{ text:'고조선의 성립과 발전', desc:'단군신화가 전하는 건국연대(기원전 2333년)와, 고고학적으로 실체가 확인되는 국가 성립 시기(대략 기원전 4세기 무렵 요령~평양 일대) 사이에는 간극이 있다. 이후 위만이 집권한 위만조선 시기에 철기문화와 중계무역으로 크게 성장했으나, 한나라와의 전쟁 끝에 기원전 108년 멸망했다. 이 지점에서 고대(삼국~후삼국) 지도로 이야기가 이어진다.' },
};

function updateEra(order){
  const era = ERA[order] || {text:'', desc:''};
  const eraText = document.getElementById('eraText');
  const eraDesc = document.getElementById('eraDesc');
  if (eraText) eraText.textContent = era.text;
  if (eraDesc) eraDesc.textContent = era.desc;
  const eraCard = document.getElementById('eraCard');
  if (eraCard) eraCard.setAttribute('data-era-title', era.text || '');
}

// ── 블록(챕터) 선택 ──
function selectBlock(index, opts){
  const silent = opts && opts.silent;
  currentBlockIndex = Math.max(0, Math.min(BLOCKS.length - 1, index));
  const b = currentBlock();

  const label = document.getElementById('reignLabel');
  if (label) {
    label.textContent = `${b.name} (${blockYearLabel(b)})`;
  }

  const nav = document.getElementById('reignBand');
  if (nav) {
    nav.querySelectorAll('.reign-chapter-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.index, 10) === currentBlockIndex);
    });
    const activeBtn = nav.querySelector('.reign-chapter-btn.active');
    if (activeBtn && activeBtn.scrollIntoView) {
      activeBtn.scrollIntoView({ behavior: silent ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  if (window.closeInfoPanel) closeInfoPanel();
  renderCurrentChapter();
  updateEra(b.order);

  if (!silent && window.innerWidth >= 1024) {
    const eraDesc = document.getElementById('eraDesc');
    if (eraDesc?.textContent?.trim()) {
      if (typeof window.openEraCard === 'function') {
        window.openEraCard();
      } else {
        document.getElementById('eraCard')?.classList.add('open');
      }
    }
  }

  if (!silent && window.trackTimelineMove) {
    window.trackTimelineMove(b.name);
  }
}

function selectReign(index, opts){ return selectBlock(index, opts); }
function reignIndexForYear(year){ return blockIndexForYear(year); }
function currentReignRange(){ return currentBlockRange(); }

renderChapterNav();
