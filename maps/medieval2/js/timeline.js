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
// 챕터 버튼 폭을 재위기간에 비례하게 만든다 — 예전 버전(연도 슬라이더가
// 있던 시절)에는 이걸 하면 슬라이더와 어긋나는 버그가 있었지만, 지금은
// 슬라이더 자체가 없고 그냥 가로 스크롤 버튼 목록이라 맞출 대상이 없다.
// 그래서 다시 비례폭으로 돌려도 안전하다. 극단적으로 짧은 재위(인종
// 8개월 등)만 최소폭으로 보호한다 — 이번엔 그 최소폭을 다른 왕에게서
// "빌려오지" 않는다(전체 폭이 슬라이더처럼 고정된 100%가 아니라 그냥
// 옆으로 늘어나면 되므로), 그래서 다른 챕터에 전혀 영향을 주지 않는다.
const PX_PER_YEAR = 4;       // 왕조 띠에서 1년당 대략적인 폭(px)
const MIN_CHAPTER_WIDTH = 52; // 탭 가능한 최소 폭(px)

function renderChapterNav(){
  const nav = document.getElementById('reignBand');
  if (!nav) return;
  nav.innerHTML = REIGNS.map((r, i) => {
    const displayEnd = r.display_end_year ?? r.end_year;
    const label = r.segment ? `${r.name}(${r.segment})` : r.name;
    const continuesNote = r.continues_in ? ' data-continues="1"' : '';
    const span = Math.max(displayEnd - r.start_year, 0);
    const width = Math.max(MIN_CHAPTER_WIDTH, Math.round(span * PX_PER_YEAR));
    return `<button type="button" class="reign-chapter-btn" data-index="${i}"${continuesNote}
      style="width:${width}px; flex:0 0 ${width}px;">
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
// ERA는 reign.order(1~26, 고유값)로 찾는다 — 왕조가 26명뿐이라 지금은
// start_year 충돌이 없지만, 중세1(고려)처럼 같은 해에 왕이 바뀌는
// 경우에 대비해 항상 고유한 order 기준으로 통일해뒀다.
const ERA = {
  1:{ text:'이성계, 새 왕조를 열다', desc:'위화도 회군으로 실권을 잡은 이성계가 고려를 무너뜨리고 조선을 세웠다. 정도전과 함께 한양 천도와 유교 통치이념을 확립했으나, 후계를 둘러싼 아들들의 골육상쟁(1차 왕자의 난)으로 왕위에서 물러나야 했다.' },
  2:{ text:'형제의 난 속 임시 왕', desc:'1차 왕자의 난으로 정도전 등이 제거된 뒤, 이방원(태종)의 형 정종이 잠시 왕위에 올랐다. 실권은 이미 이방원에게 있었고, 2차 왕자의 난 이후 정종은 스스로 왕위를 동생에게 넘겼다.' },
  3:{ text:'피로 왕권을 다진 군주', desc:'두 차례 왕자의 난으로 정적을 제거하고 즉위한 태종은 사병을 혁파하고 육조직계제로 왕권을 강화했다. 호패법을 시행하고, 아들 세종에게 안정된 왕조를 물려주기 위해 외척과 공신 세력까지 가차없이 숙청했다.' },
  4:{ text:'조선의 최전성기', desc:'훈민정음 창제, 4군 6진 개척, 측우기·해시계 등 과학기술 발전으로 조선 역사상 최고의 성군으로 꼽힌다. 집현전으로 인재를 길러내고 백성을 위한 정치를 표방했다.' },
  5:{ text:'짧았던 학자 군주', desc:'세종의 뒤를 이은 문종은 학문에 밝고 인품이 훌륭했으나 병약해 2년여 만에 세상을 떠났다. 그의 이른 죽음은 어린 아들 단종의 비극적인 즉위로 이어졌다.' },
  6:{ text:'숙부에게 왕위를 빼앗긴 소년', desc:'12세에 즉위한 단종은 숙부 수양대군(세조)이 계유정난을 일으켜 김종서 등을 제거하고 실권을 장악하면서 힘을 잃었다. 결국 왕위를 빼앗기고 강봉된 뒤, 사육신의 복위 시도가 발각되며 유배지 영월에서 죽임을 당했다.' },
  7:{ text:'계유정난으로 얻은 왕위', desc:'조카 단종을 몰아내고 왕위에 오른 세조는 사육신의 반발을 피의 숙청으로 진압했다. 그러나 육조직계제를 부활시키고 경국대전 편찬에 착수하는 등 통치체제 정비에도 힘썼다.' },
  8:{ text:'1년여의 짧은 재위', desc:'세조의 둘째 아들로 즉위했으나 병약해 1년여 만에 세상을 떠났다. 남이의 옥사 등 짧은 재위 기간에도 정치적 격변이 이어졌다.' },
  9:{ text:'경국대전, 법과 제도의 완성', desc:'어린 나이에 즉위해 한동안 대비의 수렴청정을 받았으나, 친정 이후 경국대전을 완성해 반포하며 조선의 법과 제도를 정비했다. 사림파를 등용해 훈구파를 견제하기 시작한 것도 이 시기다.' },
  10:{ text:'폭정과 두 차례의 사화', desc:'생모 폐비 윤씨의 죽음에 얽힌 갑자사화와 무오사화를 일으켜 신하들을 대거 숙청했다. 사냥과 향락에 탐닉하며 폭정을 거듭하다 중종반정으로 폐위됐다.' },
  11:{ text:'반정으로 세워진 왕, 조광조의 좌절', desc:'연산군을 몰아낸 반정공신들에 의해 옹립돼 한동안 신하들에게 눌려 지냈다. 조광조를 등용해 급진 개혁(현량과, 위훈삭제)을 추진했으나 훈구파의 반발로 기묘사화가 일어나 조광조는 죽임을 당했다.' },
  12:{ text:'여덟 달의 효자 왕', desc:'중종의 뒤를 이었으나 즉위 8개월 만에 세상을 떠났다. 계모 문정왕후와의 갈등 속에서도 효성이 지극했던 왕으로 전해진다.' },
  13:{ text:'문정왕후의 수렴청정과 을사사화', desc:'어린 나이에 즉위해 어머니 문정왕후가 오랫동안 수렴청정했다. 외척 윤원형이 을사사화를 일으켜 반대파를 숙청했고, 임꺽정의 난 등 사회 혼란도 이어졌다.' },
  14:{ text:'임진왜란, 나라가 무너질 뻔하다', desc:'사림이 본격적으로 정계에 진출했으나 동인·서인으로 붕당이 갈라지기 시작했다. 1592년 임진왜란이 일어나 의주까지 피난했고, 이순신과 의병의 활약으로 7년 전쟁 끝에 나라를 지켜냈다.' },
  15:{ text:'중립외교와 반정으로의 몰락', desc:'명과 후금 사이에서 실리를 추구하는 중립외교를 펼쳤으나, 명에 대한 의리를 저버렸다는 서인의 반발을 샀다. 인목대비 폐위 등 왕권 강화 과정의 무리수도 겹쳐 인조반정으로 폐위됐다.' },
  16:{ text:'호란의 굴욕', desc:'반정으로 즉위했으나 친명배금 정책이 정묘호란과 병자호란을 불러왔다. 남한산성에서 항전하다 결국 삼전도에서 청 황제에게 항복하는 조선 역사상 가장 치욕적인 순간을 겪었다.' },
  17:{ text:'북벌의 꿈', desc:'병자호란 때 청에 볼모로 끌려갔던 경험으로, 즉위 후 청에 대한 복수를 다짐하며 북벌을 추진했다. 실제 북벌은 이뤄지지 못했지만 군비 확충과 나선정벌(러시아 정벌 파병) 등의 성과를 남겼다.' },
  18:{ text:'예송논쟁의 시대', desc:'효종의 상례를 둘러싸고 서인과 남인이 두 차례 예송논쟁을 벌이며 붕당 간 대립이 격화됐다. 경신대기근 등 자연재해로 백성들의 고통도 컸던 시기다.' },
  19:{ text:'환국정치와 왕권 강화', desc:'서인과 남인을 번갈아 등용하며 정국을 주도하는 환국을 반복해 왕권을 강화했다. 장희빈을 둘러싼 궁중 암투와 대동법 전국 확대, 백두산정계비 건립 등 다양한 사건이 이어진 46년의 긴 재위였다.' },
  20:{ text:'노론과 소론의 격돌', desc:'장희빈의 아들로 즉위했으나 병약했고 후사가 없어, 이복동생 연잉군(영조)의 대리청정을 둘러싸고 노론과 소론이 극심하게 대립했다(신임옥사).' },
  21:{ text:'탕평과 임오화변', desc:'조선 역대 최장 52년 재위 동안 탕평책으로 붕당 대립을 조정하려 했다. 그러나 아들 사도세자를 뒤주에 가둬 죽게 한 임오화변이라는 비극을 겪었다.' },
  22:{ text:'개혁군주와 규장각', desc:'할아버지 영조의 탕평을 이어받아 규장각을 통해 인재를 길렀고, 수원 화성을 건설해 아버지 사도세자를 신원하려 했다. 실학을 장려하며 조선 후기 문예부흥을 이끌었으나 갑작스러운 죽음으로 개혁은 미완에 그쳤다.' },
  23:{ text:'세도정치의 시작', desc:'어린 나이에 즉위해 정순왕후의 수렴청정을 받았고, 이후 왕비 집안인 안동 김씨가 권력을 독점하는 세도정치가 시작됐다. 홍경래의 난 등 민란이 잇따르며 조선 후기 사회 모순이 본격적으로 드러났다.' },
  24:{ text:'세도정치의 심화', desc:'8세에 즉위해 순원왕후가 수렴청정했다. 안동 김씨에 이어 풍양 조씨 세력까지 가세하며 세도정치가 더욱 굳어졌고, 삼정의 문란으로 민생이 피폐해졌다.' },
  25:{ text:'강화도령, 허수아비 왕', desc:'농사짓던 시골에서 갑자기 왕위에 오른 철종은 안동 김씨의 꼭두각시에 지나지 않았다. 삼정의 문란이 극에 달해 임술농민봉기가 전국으로 번졌다.' },
  26:{ text:'흥선대원군의 집권과 쇄국', desc:'12세에 즉위해 생부 흥선대원군이 10년간 실권을 쥐었다. 세도정치를 무너뜨리고 경복궁을 중건했으며, 병인양요·신미양요를 겪으며 강경한 쇄국정책으로 서양 열강에 맞섰다. (이 지도는 1875년에서 끊고, 고종의 나머지 재위는 근대 지도에서 이어진다.)' },
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
  updateEra(r.order);

  if (!silent && window.trackTimelineMove) {
    window.trackTimelineMove(r.segment ? `${r.name}(${r.segment})` : r.name);
  }
}

renderChapterNav();
