// ═══════════════════════════════════════════════════════
// timeline.js — 사건 단위 블록 내비게이션 (고대, 기원전 37 ~ 936)
// 중세1·2(왕조 챕터)와 같은 UI 패턴이지만, "왕" 대신 "역사적 전환점
//으로 나눈 시기(블록)"가 챕터 단위다. 블록 하나를 열면 그 시기 모든
// 나라의 사건이 한번에 표시된다 — 여러 나라가 같은 시공간에 있었다는
// 이 지도의 핵심 철학. 자세한 설명은 js/blocks.js 주석 참고.
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

// 챕터 버튼 폭을 블록 길이에 비례하게 만든다(중세1·2와 동일한 이유로
// 안전 — 슬라이더가 없어 맞출 대상이 없다).
const PX_PER_YEAR = 0.85; // 350년짜리 블록이 눈에 보이게 넓어지도록(298px)
const MIN_CHAPTER_WIDTH = 128; // 블록명이 왕 이름보다 훨씬 길어서(예: "고구려 멸망과 나당전쟁")
// 최소폭을 넉넉하게 잡아야 한다 — CSS에서 줄바꿈을 허용해도, 폭이 너무
// 좁으면 여전히 이웃 버튼과 겹쳐 보인다(스크린샷으로 확인된 문제).

function renderChapterNav(){
  const nav = document.getElementById('reignBand');
  if (!nav) return;
  nav.innerHTML = BLOCKS.map((b, i) => {
    const span = Math.max(b.end_year - b.start_year, 0);
    const width = Math.max(MIN_CHAPTER_WIDTH, Math.round(span * PX_PER_YEAR));
    return `<button type="button" class="reign-chapter-btn" data-index="${i}"
      style="width:${width}px; flex:0 0 ${width}px;">
      <span class="reign-chapter-name">${b.name}</span>
      <span class="reign-chapter-years">${formatYearShort(b.start_year)}~${formatYearShort(b.end_year)}</span>
    </button>`;
  }).join('');

  nav.querySelectorAll('.reign-chapter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectBlock(parseInt(btn.dataset.index, 10));
    });
  });
}

// ── 연도 → 블록 인덱스 매핑 ──
// 경계 연도는 마지막 블록이 아니면 [start, end) 반열림 구간으로 취급해
// 항상 하나의 블록에만 속하게 한다(중세1·2와 동일한 원칙).
function blockIndexForYear(year){
  for (let i = 0; i < BLOCKS.length; i++){
    const b = BLOCKS[i];
    const isLast = (i === BLOCKS.length - 1);
    if (year >= b.start_year && (isLast ? year <= b.end_year : year < b.end_year)) return i;
  }
  return year < BLOCKS[0].start_year ? 0 : BLOCKS.length - 1;
}

// ── 시대개요 — 블록 단위로 채운다(order로 찾는다, 고유값). ──
const ERA = {
  1:{ text:'삼국, 나란히 일어서다', desc:'기원전 1세기 무렵 고구려·백제·신라가 각각 압록강·한강·경주 유역에서 나라의 틀을 세웠다. 여전히 한반도 북부에는 한나라가 설치한 낙랑군 등 군현이 남아 있었으나, 313년 고구려가 낙랑군을 몰아내며 한반도 안의 중국 군현 시대가 막을 내렸다.' },
  2:{ text:'광개토대왕과 장수왕, 대륙을 호령하다', desc:'광개토대왕이 요동·만주와 한반도 북부까지 영토를 크게 넓혔고, 그 뒤를 이은 장수왕은 평양으로 천도하며 국력을 다졌다. 장수왕이 남쪽으로 밀고 내려와 백제의 수도 한성을 함락시키고 개로왕을 전사시키며(475), 삼국 항쟁의 무게중심이 남쪽으로 옮겨갔다.' },
  3:{ text:'한강을 둘러싼 각축', desc:'수도를 잃은 백제는 웅진(공주)으로 천도해 재기를 노렸고, 신라와 손잡은 나제동맹으로 고구려에 맞섰다. 그러나 553년 신라가 동맹을 깨고 한강 유역을 독차지하면서, 삼국의 세력균형은 신라 쪽으로 크게 기울기 시작했다.' },
  4:{ text:'신라의 결단, 나당동맹', desc:'한강을 빼앗긴 백제 성왕이 관산성에서 신라를 공격했다가 전사하며(554) 백제·신라의 반목이 굳어졌다. 위기에 몰린 신라는 김춘추를 앞세워 당과 동맹을 맺었고, 나당연합군은 결국 660년 백제를 무너뜨렸다.' },
  5:{ text:'고구려도 무너지고, 당군까지 몰아내다', desc:'수·당의 거듭된 침공을 막아냈던 고구려도 지배층 내분과 국력 소진 속에 668년 결국 멸망했다. 그러나 한반도 전체를 차지하려는 당의 의도가 드러나자 신라는 당군과 정면으로 맞서, 매소성·기벌포 전투에서 승리하며(676) 당의 세력을 몰아냈다.' },
  6:{ text:'남쪽엔 신라, 북쪽엔 발해', desc:'전쟁이 끝난 신라는 삼국을 아우른 통일 왕조로서 150년 가까운 안정과 번영을 누렸다. 고구려 유민과 말갈족이 세운 발해는 북쪽에서 독자적으로 성장해 "해동성국"이라 불릴 만큼 강성한 나라로 자리잡아, 이 시기 한반도와 만주는 신라·발해 두 나라가 양분하는 남북국시대를 이뤘다.' },
  7:{ text:'신라의 균열, 새 나라들의 태동', desc:'해상무역을 장악했던 장보고가 피살된 뒤 신라 왕실의 권력 다툼이 격화되며 지방 통제력이 급격히 약해졌다. 지방 호족과 초적들이 세력을 키우는 가운데, 견훤이 후백제를(900), 궁예가 태봉(후고구려)을(901) 잇달아 세우며 후삼국시대가 열렸다.' },
  8:{ text:'후삼국, 그리고 하나로', desc:'북쪽의 발해가 거란에 멸망하며(926) 대씨 왕조의 발해 유민 다수가 고려로 남하했다. 궁예를 몰아내고 태봉을 이어받은 왕건은 신라의 자발적 항복(935)과 후백제 정벌(936)로 반세기 만에 후삼국을 다시 하나로 통일했다.' },
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
    label.textContent = `${b.name} (${formatYearShort(b.start_year)}~${formatYearShort(b.end_year)})`;
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

// 중세1·2의 selectReign/currentReignRange/reignIndexForYear와 이름이
// 다르면 app.js의 window.onload 등 공유 패턴을 옮겨 쓰기 어려워지므로,
// 별칭을 만들어 그대로 재사용할 수 있게 한다.
function selectReign(index, opts){ return selectBlock(index, opts); }
function reignIndexForYear(year){ return blockIndexForYear(year); }
function currentReignRange(){ return currentBlockRange(); }

renderChapterNav();
