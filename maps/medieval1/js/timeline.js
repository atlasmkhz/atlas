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

// 챕터 버튼 폭을 재위기간에 비례하게 만든다 — 슬라이더가 없는 지금은
// 안전하다(자세한 이유는 중세2/조선의 timeline.js 주석 참고).
const PX_PER_YEAR = 4;
const MIN_CHAPTER_WIDTH = 52;

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

function reignIndexForYear(year){
  for (let i = 0; i < REIGNS.length; i++){
    const r = REIGNS[i];
    const displayEnd = r.display_end_year ?? r.end_year;
    const isLast = (i === REIGNS.length - 1);
    if (year >= r.start_year && (isLast ? year <= displayEnd : year < displayEnd)) return i;
  }
  return REIGNS.length - 1;
}

// ERA는 reign.order(1~38, 고유값)로 찾는다 — start_year로 찾으면
// 순종/선종(둘 다 1083년 즉위), 충선왕 1차/충렬왕 2차(둘 다 1298년)처럼
// 같은 해에 왕이 바뀐 경우 하나의 키를 공유해버려 뒤엣것이 앞엣것을
// 덮어써 버린다. order는 REIGNS 배열 안에서 항상 고유하므로 이 문제가
// 없다.
const ERA = {
  1:{ text:'왕건, 새 나라를 세우다', desc:'궁예의 신하였던 왕건이 정변으로 왕위에 올라 국호를 고려로 정했다. 지방 호족과의 혼인·포섭 정책으로 세력을 넓혀 936년 후삼국을 통일했다.' },
  2:{ text:'불안 속의 짧은 치세', desc:'태조의 뒤를 이었으나 왕규 등 호족들의 노골적인 암살 시도에 시달리다, 신변의 위협 속에 병을 얻어 세상을 떠났다.' },
  3:{ text:'서경 세력을 등에 업은 즉위', desc:'서경의 왕식렴 세력을 등에 업고 왕규를 제거하며 즉위했다. 즉위 과정의 유혈사태에 대한 참회로 불교에 깊이 의지했고, 서경 천도를 추진했으나 실현하지 못한 채 병으로 죽었다.' },
  4:{ text:'피의 숙청으로 세운 왕권', desc:'노비안검법과 과거제를 도입해 호족 세력을 누르고 독자적인 왕권 기반을 확립했다. 그러나 말년에는 의심이 지나쳐 골육과 공신들까지 대거 숙청하는 공포정치를 폈다.' },
  5:{ text:'복수법의 시행착오', desc:'아버지 광종 때 숙청된 이들의 복수를 허용하는 복수법을 시행했다가 부작용이 커지자 곧 폐지했다. 광종의 공포정치로 흐트러진 민심을 수습하려 했으나 6년의 짧은 재위로 마감했다.' },
  6:{ text:'유교 통치체제의 확립', desc:'최승로의 시무 28조를 받아들여 유교 이념에 따른 중앙집권 체제를 정비했다. 지방에 12목을 설치하고 국자감을 세우는 등 고려 통치제도의 기틀을 놓았다.' },
  7:{ text:'강조의 정변으로 시해된 왕', desc:'어머니 헌애왕후(천추태후)와 김치양의 전횡 속에 왕권이 흔들렸다. 강조가 정변을 일으켜 그를 폐위하고 시해하니, 고려 역사상 신하에 의해 살해된 첫 왕이 됐다.' },
  8:{ text:'거란의 침입을 이겨내다', desc:'강조의 정변으로 갑작스럽게 즉위했으나, 거란의 2·3차 침입이라는 건국 이래 최대 위기 속에 남쪽으로 피난했다. 강감찬의 귀주대첩(1019)으로 전쟁을 승리로 이끌었고, 이후 인종 대까지 130년 넘게 이어지는 고려의 황금기를 열었다.' },
  9:{ text:'천리장성을 시작하다', desc:'현종의 뒤를 이어 거란·여진의 침입에 대비해 국경에 천리장성을 쌓기 시작했다. 재위 3년 만에 요절해 동생 정종이 뒤를 이었다.' },
  10:{ text:'천리장성을 완성하다', desc:'형 덕종의 뒤를 이어 즉위해 거란의 침입을 받았으나 이후 북방 경비에 주력, 덕종이 시작한 천리장성을 완성했다. 노비종모법과 장자상속법을 제정해 사회 제도를 정비했다.' },
  11:{ text:'해동천하, 고려의 황금기', desc:'37년의 치세 동안 사회·경제·외교·문화 모든 면에서 눈부신 발전을 이뤄 고려의 최전성기를 이끌었다. 다만 이 시기 문벌귀족의 힘이 지나치게 커지면서, 훗날 무신정변의 씨앗도 함께 자랐다.' },
  12:{ text:'석 달의 재위', desc:'문종의 맏아들로 즉위했으나 지병이 악화돼 3개월 만에 세상을 떠났다.' },
  13:{ text:'형의 뒤를 이어', desc:'형 순종이 즉위 직후 급서하자 왕위를 이어받았다. 요와 송 사이에서 실리외교를 펼치며 문종 대의 안정을 이어가려 했으나, 아들 헌종의 이른 즉위와 함께 정국은 다시 불안해졌다.' },
  14:{ text:'이자의의 난과 삼촌에게 넘긴 왕위', desc:'어린 나이에 즉위했으나 외척 이자의가 자신의 외손자를 왕으로 세우려 난을 일으켰다. 숙부 계림공(숙종)이 이를 진압하며 실권을 장악하자, 결국 왕위를 넘기고 물러났다.' },
  15:{ text:'조카의 왕위를 이어받다', desc:'조카 헌종으로부터 왕위를 물려받는 과정에 정변적 성격이 있었다는 평가를 받는다. 화폐(주전) 유통을 추진하고 별무반을 창설해 여진 정벌을 준비하는 등 부국강병 정책을 폈다.' },
  16:{ text:'윤관의 여진 정벌', desc:'아버지 숙종이 준비한 별무반을 동원해 윤관으로 하여금 여진을 정벌하고 동북 9성을 쌓게 했다. 청연각·보문각을 세워 학문을 진흥시키기도 했다.' },
  17:{ text:'이자겸의 난과 묘청의 서경천도운동', desc:'외척 이자겸이 왕권을 위협하는 난을 일으켰다가 진압됐고, 뒤이어 묘청이 서경 천도와 칭제건원을 주장하며 반란을 일으켰으나 김부식에게 진압됐다. 두 차례의 큰 정치적 위기 속에 문벌귀족 사회의 모순이 드러났다.' },
  18:{ text:'향락에 빠진 왕, 무신정변으로 폐위', desc:'문신들과의 유흥을 즐기며 무신을 천시한 결과 1170년 무신정변이 일어나 폐위됐고, 끝내 무신 권력자에게 죽임을 당했다. 그의 몰락과 함께 100년에 걸친 무신정권 시대가 시작됐다.' },
  19:{ text:'무신정권 아래 놓인 허수아비 왕', desc:'무신정변으로 옹립된 왕이지만 실권은 정중부·경대승·이의민 등 무신 권력자들에게 있었다. 27년의 재위 동안 각지에서 농민·천민의 봉기(망이·망소이의 난 등)가 잇따랐다.' },
  20:{ text:'최충헌이 세운 왕', desc:'최충헌이 명종을 폐위하고 새로 세운 왕으로, 역시 실권은 최충헌에게 있었다. 만적의 난 등 신분 해방을 요구하는 봉기가 이 시기에 일어났다.' },
  21:{ text:'최충헌 암살 시도로 폐위', desc:'즉위 초에는 최충헌에게 은혜를 베풀며 관계가 원만했으나, 최충헌을 암살하려던 시도가 발각되며 강제로 폐위당했다.' },
  22:{ text:'환갑에 즉위한 왕', desc:'최충헌에 의해 강화도로 유폐됐다가 다시 개경으로 불려와 환갑의 나이에 왕위에 올랐다. 즉위 1년 8개월 만에 세상을 떠났다.' },
  23:{ text:'몽골과의 40년 항쟁', desc:'무신정권 아래 즉위해 오랫동안 실권이 없었으나, 1231년 몽골의 침입이 시작되자 최우의 결정으로 강화도로 천도해 40년 가까운 대몽항쟁을 이끌었다. 고려 왕 중 가장 긴 46년을 재위했으나 그 대부분을 전쟁과 무신정권의 그늘 아래 보냈다.' },
  24:{ text:'무신정권의 종식과 개경 환도', desc:'몽골과의 강화를 추진해 태자 시절 몽골에 다녀왔고, 즉위 후에는 무신 집정자 김준·임연을 잇달아 제거하며 100년 무신정권에 마침표를 찍었다. 1270년 강화도에서 개경으로 환도하며 고려는 몽골(원)의 부마국 체제로 들어섰다.' },
  25:{ text:'원 공주와 혼인한 첫 부마국 왕', desc:'원 세조 쿠빌라이의 딸과 혼인해 고려 최초의 부마국 왕이 됐다. 두 차례의 일본 원정(여몽연합군)에 동원되며 원의 내정 간섭이 본격화됐다.' },
  26:{ text:'개혁을 시도했으나 곧 폐위', desc:'부왕 충렬왕으로부터 왕위를 물려받아 개혁을 시도했으나, 8개월 만에 원에 의해 폐위되고 충렬왕이 복위했다.' },
  27:{ text:'복위 후의 말년', desc:'아들 충선왕에게 왕위를 넘겼다가 원의 결정으로 다시 복위했다. 부자간의 갈등 속에 노쇠한 말년을 보내다 세상을 떠났다.' },
  28:{ text:'원에 머물며 다스린 왕', desc:'부왕 사후 복위했으나 대부분의 재위 기간을 원의 수도 대도에 머물며 전지(傳旨)로 고려를 통치했다. 만권당을 세워 고려와 원의 학자들이 교류하게 했다.' },
  29:{ text:'심양왕과의 왕위 다툼', desc:'원이 심양왕(충선왕의 조카) 왕고를 내세워 왕위를 위협하는 등, 원 간섭기 특유의 정치적 불안정에 시달렸다. 부자·형제 간 갈등이 겹치며 재위 내내 어려움을 겪었다.' },
  30:{ text:'황음과 폐위', desc:'방탕한 행실로 원에 의해 폐위되고 부왕 충숙왕이 복위했다.' },
  31:{ text:'다시 왕위에 오르다', desc:'아들 충혜왕이 폐위되자 다시 왕위에 올랐으나 정국의 혼란은 계속됐다.' },
  32:{ text:'다시 왕위에, 그러나 원에 끌려가 죽다', desc:'부왕 사후 복위했으나 황음무도한 행실이 거듭되자 결국 원에 압송돼 귀양 가던 도중 세상을 떠났다.' },
  33:{ text:'여덟 살의 어린 왕', desc:'8세에 즉위해 개혁을 시도했으나, 어린 나이와 짧은 재위(4년) 탓에 큰 성과를 내지 못하고 세상을 떠났다.' },
  34:{ text:'두 번째 어린 왕', desc:'충목왕에 이어 역시 어린 나이에 즉위했으나 정치적 혼란이 계속되자 원에 의해 폐위되고 강화도로 유배돼 그곳에서 죽었다.' },
  35:{ text:'반원 개혁과 시해', desc:'기철 등 부원배를 숙청하고 쌍성총관부를 무력으로 되찾는 등 반원 자주 개혁을 단행했다. 그러나 신돈에게 지나치게 권력을 위임한 데다 홍건적의 침입까지 겹쳤고, 끝내 측근에게 시해당하는 비극으로 생을 마쳤다.' },
  36:{ text:'위화도 회군으로 폐위되다', desc:'공민왕의 뒤를 이었으나 이인임 등 권신들에게 휘둘렸다. 요동정벌을 명령했다가 이성계의 위화도 회군으로 폐위됐다.' },
  37:{ text:'아버지에 이어 폐위된 소년 왕', desc:'우왕의 아들로 옹립됐으나, 이성계 일파가 우왕·창왕 부자가 왕씨가 아니라는 폐가입진론을 내세워 1년 만에 폐위됐다.' },
  38:{ text:'고려의 마지막 왕', desc:'이성계 세력에 의해 왕위에 올랐으나 실권은 전혀 없었다. 정몽주가 이방원에게 살해된 뒤 마지막 걸림돌이 사라지자, 1392년 폐위되며 474년 고려 왕조의 막을 내렸다.' },
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
  updateEra(r.order);

  if (!silent && window.trackTimelineMove) {
    window.trackTimelineMove(r.segment ? `${r.name}(${r.segment})` : r.name);
  }
}

renderChapterNav();
