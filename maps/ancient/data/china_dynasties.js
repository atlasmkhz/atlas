// ═══════════════════════════════════════════════════════
// data/china_dynasties.js — 고대(기원전 37 ~ 936) 중국 왕조 라벨
//
// 목적: 한반도 고대사와 "같은 시공간"에 존재한 중국 왕조를 빈 중국 땅에
//       라벨로 표시한다. 챕터(블록)를 넘길 때 그 시기와 겹치는 왕조만
//       자동으로 나타난다(js/chinaLayer.js가 from/until로 필터).
//
// 스키마:
//   name    : 한글 왕조명 (라벨 본문)
//   hanja   : 한자 (보조 표기)
//   lat,lng : 대표 좌표 — 원칙적으로 그 왕조의 도읍지. 분열기에는 각
//             정권의 도읍에 개별 라벨을 둬서 "여러 나라가 동시에 있었음"이
//             시각적으로 드러나게 한다.
//   from,until : 존속 연도(한반도 지도 범위 기준으로 잘라서 표기).
//   capital : 도읍명(라벨 클릭 없이도 note에서 참고).
//   tier    : 'unified'(통일왕조) | 'divided'(분열기 정권) | 'nomad'(북방)
//             — chinaLayer.js가 색/굵기를 살짝 다르게 준다.
//   note    : 한반도사와의 관계를 한 줄로.
//
// 좌표 메모: 장안(西安)≈34.27,108.95 / 낙양(洛陽)≈34.62,112.45 /
//   건업·건강(南京)≈32.06,118.80 / 업(鄴, 河北 臨漳)≈36.30,114.62 /
//   평성(平城, 大同)≈40.09,113.30 / 성도(成都)≈30.66,104.07 /
//   무창(武昌, 武漢)≈30.55,114.30
// ═══════════════════════════════════════════════════════

const CHINA_DYNASTIES = [
  // ── 후한(後漢) — 삼국 정립기와 겹침 ──
  { name:'후한', hanja:'後漢', lat:34.62, lng:112.45, from:-37, until:220,
    capital:'낙양', tier:'unified',
    note:'고구려·백제·신라 건국기의 중국 통일왕조. 한사군을 통해 한반도 북부와 직접 접했다.' },

  // ── 삼국시대(220–280): 위·촉·오 동시 병립 ──
  { name:'위', hanja:'魏', lat:34.62, lng:112.45, from:220, until:265,
    capital:'낙양', tier:'divided',
    note:'조조의 위나라. 관구검이 고구려 동천왕을 공격해 환도성을 함락했다(244).' },
  { name:'촉한', hanja:'蜀漢', lat:30.66, lng:104.07, from:221, until:263,
    capital:'성도', tier:'divided',
    note:'유비의 촉. 삼국 중 가장 서남쪽. 한반도와 직접 접촉은 없었다.' },
  { name:'오', hanja:'吳', lat:32.06, lng:118.80, from:222, until:280,
    capital:'건업', tier:'divided',
    note:'손권의 오. 강남 정권으로, 요동 공손씨·고구려와 바닷길로 교섭을 시도했다.' },

  // ── 서진(西晉): 짧은 통일(280–316) ──
  { name:'서진', hanja:'西晉', lat:34.62, lng:112.45, from:265, until:316,
    capital:'낙양', tier:'unified',
    note:'삼국을 통일했으나 곧 팔왕의 난·영가의 난으로 붕괴. 낙랑·대방군이 이 혼란기에 고구려·백제에 흡수된다.' },

  // ── 5호16국 + 동진(東晉): 남북 분열 ──
  { name:'동진', hanja:'東晉', lat:32.06, lng:118.80, from:317, until:420,
    capital:'건강', tier:'divided',
    note:'서진 멸망 후 강남으로 옮겨간 한족 정권. 백제 근초고왕이 동진과 통교했다(372).' },
  { name:'전진', hanja:'前秦', lat:34.27, lng:108.95, from:351, until:394,
    capital:'장안', tier:'nomad',
    note:'저족의 부견이 화북을 통일. 고구려 소수림왕에게 불교와 승려 순도를 보냈다(372).' },
  { name:'후연', hanja:'後燕', lat:41.30, lng:121.13, from:384, until:407,
    capital:'용성', tier:'nomad',
    note:'선비 모용씨. 광개토대왕이 요동을 두고 후연과 격돌해 요동을 확보했다.' },

  // ── 남북조(南北朝) ──
  { name:'북위', hanja:'北魏', lat:40.09, lng:113.30, from:386, until:534,
    capital:'평성→낙양', tier:'nomad',
    note:'선비 탁발씨가 화북을 통일. 장수왕이 남북조 사이에서 등거리 외교를 폈다.' },
  { name:'유송', hanja:'劉宋', lat:32.06, lng:118.80, from:420, until:479,
    capital:'건강', tier:'divided',
    note:'남조의 첫 왕조. 백제·왜가 유송에 사신을 보내 작호를 받았다.' },
  { name:'남제', hanja:'南齊', lat:32.06, lng:118.80, from:479, until:502,
    capital:'건강', tier:'divided',
    note:'남조 2대 왕조. 백제 동성왕이 통교.' },
  { name:'양', hanja:'梁', lat:32.06, lng:118.80, from:502, until:557,
    capital:'건강', tier:'divided',
    note:'남조의 전성기. 백제 무령왕·성왕이 양과 활발히 교류(무령왕릉이 양식 벽돌무덤).' },
  { name:'동위·북제', hanja:'北齊', lat:36.30, lng:114.62, from:534, until:577,
    capital:'업', tier:'nomad',
    note:'북위가 동서로 갈라진 뒤의 화북 동부 정권.' },
  { name:'서위·북주', hanja:'北周', lat:34.27, lng:108.95, from:535, until:581,
    capital:'장안', tier:'nomad',
    note:'화북 서부 정권. 이 계통에서 훗날 수·당 황실이 나온다.' },
  { name:'진', hanja:'陳', lat:32.06, lng:118.80, from:557, until:589,
    capital:'건강', tier:'divided',
    note:'남조 마지막 왕조. 589년 수에게 멸망하며 남북조가 끝난다.' },

  // ── 수(隋): 재통일(589–618) ──
  { name:'수', hanja:'隋', lat:34.27, lng:108.95, from:581, until:618,
    capital:'대흥(장안)', tier:'unified',
    note:'370년 분열을 끝낸 재통일 왕조. 고구려 원정(살수대첩, 을지문덕 612)에 국력을 소진해 멸망.' },

  // ── 당(唐): 대통일(618–907) ──
  { name:'당', hanja:'唐', lat:34.27, lng:108.95, from:618, until:907,
    capital:'장안', tier:'unified',
    note:'나당연합으로 백제·고구려를 멸망시켰으나, 나당전쟁에서 신라에 밀려 대동강 이남을 내줬다. 이후 발해와 병존.' },

  // ── 오대십국(五代十國): 다시 분열(907–979) ──
  { name:'후량', hanja:'後梁', lat:34.80, lng:114.30, from:907, until:923,
    capital:'개봉', tier:'divided',
    note:'당 멸망 후 화북의 첫 단명 왕조. 오대(五代)의 시작.' },
  { name:'후당', hanja:'後唐', lat:34.62, lng:112.45, from:923, until:936,
    capital:'낙양', tier:'divided',
    note:'오대의 두 번째 왕조. 고려가 후삼국을 통일(936)하던 무렵의 화북 정권.' },
];

if (typeof module !== 'undefined') module.exports = CHINA_DYNASTIES;
