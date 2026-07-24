// data/search_index.js — 7개 지도 통합 검색 인덱스 (자동 생성, 직접 수정 금지)
// build/generate_search_index.py 로 재생성한다.
// 용도: 현재 지도에서 검색했을 때 결과가 없거나 부족하면, 이 인덱스에서
// '다른 시대에 있음' 안내를 위해 참조한다. 상세 필드는 없다 — 안내+링크 전용.
const SEARCH_INDEX = [
  {
    "id": "political_1876_02",
    "title_ko": "흥선대원군의 하야와 민씨 척족의 부상",
    "people": [
      "흥선대원군",
      "고종",
      "명성황후"
    ],
    "year": 1876,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1876_02"
  },
  {
    "id": "political_1876_01",
    "title_ko": "강화도조약 — 닫힌 문이 열리다",
    "people": [],
    "year": 1876,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1876_01"
  },
  {
    "id": "diplomacy_1877_02",
    "title_ko": "독도, 기록의 섬 — 태정관지령에서 강치의 절멸까지",
    "people": [],
    "year": 1877,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=diplomacy_1877_02"
  },
  {
    "id": "policy_1880_01",
    "title_ko": "조선책략과 영남만인소 — 갈라진 길",
    "people": [
      "김홍집"
    ],
    "year": 1880,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1880_01"
  },
  {
    "id": "institution_1880_01",
    "title_ko": "통리기무아문 설치",
    "people": [
      "고종",
      "김홍집"
    ],
    "year": 1880,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=institution_1880_01"
  },
  {
    "id": "political_1880_02",
    "title_ko": "매관매직의 만연 — 돈으로 사는 관직",
    "people": [
      "명성황후"
    ],
    "year": 1880,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1880_02"
  },
  {
    "id": "organization_1881_01",
    "title_ko": "별기군 창설 — 신식 군대의 등장",
    "people": [],
    "year": 1881,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=organization_1881_01"
  },
  {
    "id": "international_1881_01",
    "title_ko": "조사시찰단 파견",
    "people": [
      "홍영식",
      "어윤중",
      "박정양"
    ],
    "year": 1881,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=international_1881_01"
  },
  {
    "id": "political_1882_03",
    "title_ko": "선혜청의 부패와 민겸호 — 군란의 불씨",
    "people": [
      "민겸호"
    ],
    "year": 1882,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1882_03"
  },
  {
    "id": "political_1882_01",
    "title_ko": "임오군란 — 구식 군인의 봉기",
    "people": [
      "흥선대원군"
    ],
    "year": 1882,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1882_01"
  },
  {
    "id": "political_1882_04",
    "title_ko": "청군의 개입과 민씨 정권의 재집권",
    "people": [
      "명성황후"
    ],
    "year": 1882,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1882_04"
  },
  {
    "id": "political_1882_02",
    "title_ko": "조미수호통상조약 — 서양과의 첫 수교",
    "people": [
      "김홍집"
    ],
    "year": 1882,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1882_02"
  },
  {
    "id": "policy_1883_01",
    "title_ko": "박문국과 한성순보 — 첫 근대 신문",
    "people": [
      "박영효"
    ],
    "year": 1883,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1883_01"
  },
  {
    "id": "political_1883_01",
    "title_ko": "보빙사 — 서양에 보낸 첫 사절단",
    "people": [
      "민영익",
      "홍영식",
      "서광범",
      "유길준"
    ],
    "year": 1883,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1883_01"
  },
  {
    "id": "political_1884_02",
    "title_ko": "민씨 척족의 요직 독점 — 갑신정변의 동기",
    "people": [
      "명성황후",
      "민영익",
      "민태호"
    ],
    "year": 1884,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1884_02"
  },
  {
    "id": "plot_1884_01",
    "title_ko": "갑신정변 — 사흘 천하",
    "people": [
      "김옥균",
      "박영효",
      "서재필",
      "명성황후"
    ],
    "year": 1884,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=plot_1884_01"
  },
  {
    "id": "political_1885_01",
    "title_ko": "톈진조약 — 두 제국의 약속",
    "people": [],
    "year": 1885,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1885_01"
  },
  {
    "id": "international_1885_02",
    "title_ko": "거문도 사건",
    "people": [],
    "year": 1885,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=international_1885_02"
  },
  {
    "id": "policy_1886_01",
    "title_ko": "육영공원 — 첫 관립 근대학교",
    "people": [],
    "year": 1886,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1886_01"
  },
  {
    "id": "policy_1886_02",
    "title_ko": "배재학당과 이화학당 — 사립 근대교육",
    "people": [],
    "year": 1886,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1886_02"
  },
  {
    "id": "policy_1886_03",
    "title_ko": "노비세습제 폐지 — 신분의 벽에 낸 첫 틈",
    "people": [
      "고종"
    ],
    "year": 1886,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1886_03"
  },
  {
    "id": "policy_1887_01",
    "title_ko": "경복궁의 전등 — 들어온 근대의 빛",
    "people": [
      "고종"
    ],
    "year": 1887,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1887_01"
  },
  {
    "id": "policy_1887_02",
    "title_ko": "전신망의 확장 — 이어지는 선들",
    "people": [],
    "year": 1887,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1887_02"
  },
  {
    "id": "political_1888_01",
    "title_ko": "한로육로통상장정 — 러시아와의 첫 약속",
    "people": [
      "조병식"
    ],
    "year": 1888,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1888_01"
  },
  {
    "id": "political_1889_01",
    "title_ko": "방곡령 — 곡물을 둘러싼 마찰",
    "people": [],
    "year": 1889,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1889_01"
  },
  {
    "id": "movement_1892_01",
    "title_ko": "교조신원운동 — 동학의 첫 집회",
    "people": [
      "최시형"
    ],
    "year": 1892,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1892_01"
  },
  {
    "id": "movement_1893_01",
    "title_ko": "보은집회 — 척왜양창의",
    "people": [
      "최시형"
    ],
    "year": 1893,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1893_01"
  },
  {
    "id": "movement_1894_00",
    "title_ko": "고부 민란 — 조병갑의 수탈과 사발통문",
    "people": [
      "전봉준",
      "조병갑"
    ],
    "year": 1894,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1894_00"
  },
  {
    "id": "movement_1894_01",
    "title_ko": "동학농민운동 — 제1차 봉기",
    "people": [
      "전봉준"
    ],
    "year": 1894,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1894_01"
  },
  {
    "id": "battle_1894_02",
    "title_ko": "황토현·황룡촌 전투 — 농민군의 첫 승리",
    "people": [
      "전봉준"
    ],
    "year": 1894,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1894_02"
  },
  {
    "id": "movement_1894_02",
    "title_ko": "전주화약과 집강소 — 농민의 자치",
    "people": [
      "전봉준"
    ],
    "year": 1894,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1894_02"
  },
  {
    "id": "political_1894_01",
    "title_ko": "일본군의 경복궁 점령과 청일전쟁",
    "people": [],
    "year": 1894,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1894_01"
  },
  {
    "id": "policy_1894_01",
    "title_ko": "갑오개혁 — 위로부터의 근대화",
    "people": [],
    "year": 1894,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1894_01"
  },
  {
    "id": "movement_1894_03",
    "title_ko": "동학농민운동 — 제2차 봉기, 척왜의 깃발",
    "people": [
      "전봉준",
      "손병희"
    ],
    "year": 1894,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1894_03"
  },
  {
    "id": "battle_1894_01",
    "title_ko": "우금치 전투 — 동학농민군의 최후",
    "people": [
      "전봉준"
    ],
    "year": 1894,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1894_01"
  },
  {
    "id": "person_1895_01",
    "title_ko": "전봉준의 체포와 처형",
    "people": [
      "전봉준"
    ],
    "year": 1895,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1895_01"
  },
  {
    "id": "political_1895_01",
    "title_ko": "시모노세키조약과 삼국간섭",
    "people": [],
    "year": 1895,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1895_01"
  },
  {
    "id": "plot_1895_01",
    "title_ko": "을미사변 — 명성황후 시해",
    "people": [
      "명성황후"
    ],
    "year": 1895,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=plot_1895_01"
  },
  {
    "id": "policy_1895_01",
    "title_ko": "을미개혁과 단발령",
    "people": [],
    "year": 1895,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1895_01"
  },
  {
    "id": "movement_1895_01",
    "title_ko": "을미의병 — 첫 항일 의병",
    "people": [],
    "year": 1895,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1895_01"
  },
  {
    "id": "political_1896_01",
    "title_ko": "아관파천 — 러시아 공사관으로",
    "people": [
      "고종",
      "이범진"
    ],
    "year": 1896,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1896_01"
  },
  {
    "id": "political_1896_02",
    "title_ko": "열강의 이권 침탈",
    "people": [],
    "year": 1896,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1896_02"
  },
  {
    "id": "political_1896_03",
    "title_ko": "독립신문 창간",
    "people": [
      "서재필"
    ],
    "year": 1896,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1896_03"
  },
  {
    "id": "organization_1896_01",
    "title_ko": "독립협회 창립",
    "people": [
      "서재필",
      "윤치호"
    ],
    "year": 1896,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=organization_1896_01"
  },
  {
    "id": "political_1897_01",
    "title_ko": "대한제국 선포 — 황제의 나라",
    "people": [
      "고종"
    ],
    "year": 1897,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1897_01"
  },
  {
    "id": "organization_1897_01",
    "title_ko": "독립문 완공",
    "people": [],
    "year": 1897,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=organization_1897_01"
  },
  {
    "id": "movement_1898_01",
    "title_ko": "만민공동회 — 광장의 정치",
    "people": [
      "서재필",
      "윤치호"
    ],
    "year": 1898,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1898_01"
  },
  {
    "id": "political_1898_02",
    "title_ko": "헌의6조",
    "people": [
      "고종",
      "서재필",
      "윤치호"
    ],
    "year": 1898,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1898_02"
  },
  {
    "id": "political_1898_01",
    "title_ko": "독립협회 해산",
    "people": [],
    "year": 1898,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1898_01"
  },
  {
    "id": "person_1898_01",
    "title_ko": "흥선대원군 별세",
    "people": [
      "흥선대원군"
    ],
    "year": 1898,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1898_01"
  },
  {
    "id": "policy_1899_01",
    "title_ko": "대한국 국제 반포 — 황제 중심 체제",
    "people": [
      "고종"
    ],
    "year": 1899,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1899_01"
  },
  {
    "id": "policy_1899_02",
    "title_ko": "경인선 개통 — 첫 철도",
    "people": [],
    "year": 1899,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1899_02"
  },
  {
    "id": "political_1899_01",
    "title_ko": "한청통상조약 — 대등하게 마주 선 두 제국",
    "people": [
      "박제순"
    ],
    "year": 1899,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1899_01"
  },
  {
    "id": "policy_1900_01",
    "title_ko": "대한제국 — 자주의 마지막 빛",
    "people": [
      "고종"
    ],
    "year": 1900,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1900_01"
  },
  {
    "id": "policy_1900_02",
    "title_ko": "양전사업과 지계 발급",
    "people": [
      "이용익"
    ],
    "year": 1900,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1900_02"
  },
  {
    "id": "policy_1900_03",
    "title_ko": "원수부와 대한제국군",
    "people": [
      "고종"
    ],
    "year": 1900,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1900_03"
  },
  {
    "id": "policy_1900_04",
    "title_ko": "전차가 달리기 시작한 수도",
    "people": [],
    "year": 1900,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1900_04"
  },
  {
    "id": "political_1900_01",
    "title_ko": "폭풍 전야 — 두 제국 사이의 대한제국",
    "people": [
      "민영환",
      "이범진"
    ],
    "year": 1900,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1900_01"
  },
  {
    "id": "movement_1901_01",
    "title_ko": "제주의 격랑 — 이재수의 난",
    "people": [
      "이재수"
    ],
    "year": 1901,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1901_01"
  },
  {
    "id": "policy_1901_01",
    "title_ko": "지계 사업 확대",
    "people": [
      "이용익"
    ],
    "year": 1901,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1901_01"
  },
  {
    "id": "policy_1901_02",
    "title_ko": "전차와 전등의 시대",
    "people": [],
    "year": 1901,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1901_02"
  },
  {
    "id": "political_1901_01",
    "title_ko": "흔들리는 균형 외교",
    "people": [],
    "year": 1901,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1901_01"
  },
  {
    "id": "political_1902_01",
    "title_ko": "간도관리사 이범윤 파견",
    "people": [
      "이범윤"
    ],
    "year": 1902,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1902_01"
  },
  {
    "id": "policy_1902_01",
    "title_ko": "한성~인천 전화 개통 — 목소리가 선을 타고",
    "people": [],
    "year": 1902,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1902_01"
  },
  {
    "id": "person_1902_01",
    "title_ko": "이용익 — 황실 재정을 틀어쥔 고종의 금고지기",
    "people": [
      "이용익"
    ],
    "year": 1902,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1902_01"
  },
  {
    "id": "organization_1903_01",
    "title_ko": "황성기독교청년회(YMCA) 창립",
    "people": [],
    "year": 1903,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=organization_1903_01"
  },
  {
    "id": "battle_1904_01",
    "title_ko": "러일전쟁 발발 — 한반도를 건 제국의 충돌",
    "people": [],
    "year": 1904,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1904_01"
  },
  {
    "id": "policy_1904_01",
    "title_ko": "한일의정서 — 중립선언을 짓밟다",
    "people": [],
    "year": 1904,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1904_01"
  },
  {
    "id": "policy_1904_02",
    "title_ko": "제1차 한일협약 — 고문정치의 시작",
    "people": [],
    "year": 1904,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1904_02"
  },
  {
    "id": "policy_1905_01",
    "title_ko": "을사늑약 — 외교권을 빼앗기다",
    "people": [
      "이토 히로부미",
      "이완용",
      "박제순",
      "이근택",
      "이지용",
      "권중현",
      "민영환",
      "장지연"
    ],
    "year": 1905,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1905_01"
  },
  {
    "id": "person_1905_01",
    "title_ko": "민영환 자결 — 죽어도 죽지 않는다",
    "people": [
      "민영환"
    ],
    "year": 1905,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1905_01"
  },
  {
    "id": "policy_1905_02",
    "title_ko": "경부선 철도 개통",
    "people": [],
    "year": 1905,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1905_02"
  },
  {
    "id": "policy_1906_01",
    "title_ko": "통감부 설치 — 이토 히로부미 초대 통감",
    "people": [
      "이토 히로부미"
    ],
    "year": 1906,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1906_01"
  },
  {
    "id": "righteous_1906_01",
    "title_ko": "최익현 의병 봉기와 순국",
    "people": [
      "최익현"
    ],
    "year": 1906,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=righteous_1906_01"
  },
  {
    "id": "person_1906_01",
    "title_ko": "신돌석 — 태백산 호랑이, 최초의 평민 의병장",
    "people": [
      "신돌석"
    ],
    "year": 1906,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1906_01"
  },
  {
    "id": "movement_1907_01",
    "title_ko": "국채보상운동 — 나라 빚을 백성이 갚자",
    "people": [
      "서상돈",
      "김광제"
    ],
    "year": 1907,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1907_01"
  },
  {
    "id": "political_1907_01",
    "title_ko": "헤이그 특사 — 만국평화회의의 호소",
    "people": [
      "고종",
      "이준",
      "이상설",
      "이위종"
    ],
    "year": 1907,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1907_01"
  },
  {
    "id": "political_1907_02",
    "title_ko": "고종 강제퇴위",
    "people": [
      "고종",
      "순종",
      "이토 히로부미"
    ],
    "year": 1907,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1907_02"
  },
  {
    "id": "policy_1907_01",
    "title_ko": "정미7조약 — 차관정치와 통치권 장악",
    "people": [
      "이완용",
      "이토 히로부미"
    ],
    "year": 1907,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1907_01"
  },
  {
    "id": "movement_1907_05",
    "title_ko": "대한제국 군대해산과 정미의병",
    "people": [
      "박승환"
    ],
    "year": 1907,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1907_05"
  },
  {
    "id": "organization_1907_01",
    "title_ko": "신민회 결성 — 비밀결사의 시작",
    "people": [
      "안창호",
      "양기탁"
    ],
    "year": 1907,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=organization_1907_01"
  },
  {
    "id": "person_1907_01",
    "title_ko": "윤희순 — 안사람 의병가, 최초의 여성 의병 지도자",
    "people": [
      "윤희순"
    ],
    "year": 1907,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1907_01"
  },
  {
    "id": "movement_1908_01",
    "title_ko": "13도창의군 서울진공작전",
    "people": [
      "이인영",
      "허위"
    ],
    "year": 1908,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1908_01"
  },
  {
    "id": "righteous_1908_01",
    "title_ko": "전명운·장인환 스티븐스 저격",
    "people": [
      "전명운",
      "장인환"
    ],
    "year": 1908,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=righteous_1908_01"
  },
  {
    "id": "organization_1909_01",
    "title_ko": "동의단지회 — 안중근의 단지동맹",
    "people": [
      "안중근",
      "최재형"
    ],
    "year": 1909,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=organization_1909_01"
  },
  {
    "id": "righteous_1909_01",
    "title_ko": "안중근 하얼빈 의거 — 이토 히로부미 처단",
    "people": [
      "안중근",
      "이토 히로부미",
      "우덕순"
    ],
    "year": 1909,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=righteous_1909_01"
  },
  {
    "id": "policy_1909_01",
    "title_ko": "기유각서 — 사법권마저 빼앗기다",
    "people": [],
    "year": 1909,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1909_01"
  },
  {
    "id": "policy_1910_01",
    "title_ko": "경술국치 — 한일병합조약 공포",
    "people": [
      "순종",
      "이완용",
      "데라우치 마사타케"
    ],
    "year": 1910,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1910_01"
  },
  {
    "id": "policy_1910_02",
    "title_ko": "회사령 공포 — 민족자본 억압",
    "people": [],
    "year": 1910,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1910_02"
  },
  {
    "id": "policy_1910_03",
    "title_ko": "토지조사사업 시작",
    "people": [
      "데라우치 마사타케"
    ],
    "year": 1910,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1910_03"
  },
  {
    "id": "policy_1910_04",
    "title_ko": "헌병경찰제 시행 — 무단통치의 일상적 통제",
    "people": [
      "데라우치 마사타케"
    ],
    "year": 1910,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1910_04"
  },
  {
    "id": "person_1910_01",
    "title_ko": "순종 — 대한제국 마지막 황제",
    "people": [
      "순종"
    ],
    "year": 1910,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1910_01"
  },
  {
    "id": "person_1910_02",
    "title_ko": "데라우치 마사타케 — 초대 조선총독",
    "people": [
      "데라우치 마사타케"
    ],
    "year": 1910,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1910_02"
  },
  {
    "id": "person_1910_03",
    "title_ko": "이완용 — 병합을 체결한 매국의 얼굴",
    "people": [
      "이완용"
    ],
    "year": 1910,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1910_03"
  },
  {
    "id": "person_1910_04",
    "title_ko": "안중근 순국 — 뤼순 감옥의 마지막",
    "people": [
      "안중근"
    ],
    "year": 1910,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1910_04"
  },
  {
    "id": "migration_1910_01",
    "title_ko": "하와이 한인 이주 — 사탕수수밭의 첫 디아스포라",
    "people": [],
    "year": 1910,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=migration_1910_01"
  },
  {
    "id": "migration_1910_02",
    "title_ko": "멕시코 애니깽 — 속아서 건너간 노예 이민",
    "people": [],
    "year": 1910,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=migration_1910_02"
  },
  {
    "id": "migration_1910_03",
    "title_ko": "중국 조선족 — 간도에 뿌리내린 공동체",
    "people": [],
    "year": 1910,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=migration_1910_03"
  },
  {
    "id": "person_1910_05",
    "title_ko": "주시경 — 한글이라는 이름을 짓다",
    "people": [
      "주시경"
    ],
    "year": 1910,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1910_05"
  },
  {
    "id": "plot_1911_01",
    "title_ko": "105인 사건 — 신민회 와해",
    "people": [
      "윤치호",
      "양기탁",
      "안명근",
      "이승훈"
    ],
    "year": 1911,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=plot_1911_01"
  },
  {
    "id": "policy_1911_01",
    "title_ko": "제1차 조선교육령 공포 — 차별 학제의 시작",
    "people": [
      "데라우치 마사타케"
    ],
    "year": 1911,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1911_01"
  },
  {
    "id": "organization_1911_01",
    "title_ko": "신흥강습소 설립 — 서간도 독립군 기지",
    "people": [
      "이회영",
      "이상룡"
    ],
    "year": 1911,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=organization_1911_01"
  },
  {
    "id": "policy_1912_01",
    "title_ko": "토지조사령 공포",
    "people": [],
    "year": 1912,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1912_01"
  },
  {
    "id": "policy_1912_02",
    "title_ko": "조선태형령 시행 — 일상 속의 신체형",
    "people": [],
    "year": 1912,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1912_02"
  },
  {
    "id": "organization_1912_01",
    "title_ko": "대한독립의군부 조직",
    "people": [
      "임병찬"
    ],
    "year": 1912,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=organization_1912_01"
  },
  {
    "id": "organization_1913_01",
    "title_ko": "흥사단 창립 — 안창호의 인격수양운동",
    "people": [
      "안창호"
    ],
    "year": 1913,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=organization_1913_01"
  },
  {
    "id": "organization_1913_02",
    "title_ko": "송죽회 결성 — 여성 비밀결사",
    "people": [],
    "year": 1913,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=organization_1913_02"
  },
  {
    "id": "person_1913_01",
    "title_ko": "안창호 — 미주 한인사회의 지도자",
    "people": [
      "안창호"
    ],
    "year": 1913,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1913_01"
  },
  {
    "id": "organization_1914_01",
    "title_ko": "대한광복군정부 수립",
    "people": [
      "이상설",
      "이동휘"
    ],
    "year": 1914,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=organization_1914_01"
  },
  {
    "id": "organization_1914_02",
    "title_ko": "대조선국민군단 — 하와이의 군사 양성",
    "people": [
      "박용만"
    ],
    "year": 1914,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=organization_1914_02"
  },
  {
    "id": "person_1914_01",
    "title_ko": "이상설 — 연해주 독립운동의 구심",
    "people": [
      "이상설"
    ],
    "year": 1914,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1914_01"
  },
  {
    "id": "person_1914_02",
    "title_ko": "이동휘 — 무장투쟁과 사회주의의 길",
    "people": [
      "이동휘"
    ],
    "year": 1914,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1914_02"
  },
  {
    "id": "person_1914_03",
    "title_ko": "박용만 — 하와이 무장투쟁의 기수",
    "people": [
      "박용만"
    ],
    "year": 1914,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1914_03"
  },
  {
    "id": "person_1914_04",
    "title_ko": "최재형 — 연해주 한인사회의 페치카",
    "people": [
      "최재형"
    ],
    "year": 1914,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1914_04"
  },
  {
    "id": "organization_1915_01",
    "title_ko": "대한광복회 결성 — 1910년대 최대 비밀결사",
    "people": [
      "박상진",
      "김좌진"
    ],
    "year": 1915,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=organization_1915_01"
  },
  {
    "id": "person_1915_01",
    "title_ko": "박상진 — 대한광복회 총사령",
    "people": [
      "박상진"
    ],
    "year": 1915,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1915_01"
  },
  {
    "id": "organization_1916_01",
    "title_ko": "원불교 개교 — 민중 속의 자력 신앙",
    "people": [
      "박중빈"
    ],
    "year": 1916,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=organization_1916_01"
  },
  {
    "id": "person_1916_01",
    "title_ko": "서일 — 북간도 대종교 무장운동의 총재",
    "people": [
      "서일"
    ],
    "year": 1916,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1916_01"
  },
  {
    "id": "political_1917_01",
    "title_ko": "대동단결선언 — 국민주권의 첫 선언",
    "people": [
      "신규식",
      "조소앙"
    ],
    "year": 1917,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1917_01"
  },
  {
    "id": "person_1917_01",
    "title_ko": "신규식 — 상하이 독립운동의 개척자",
    "people": [
      "신규식"
    ],
    "year": 1917,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1917_01"
  },
  {
    "id": "political_1918_01",
    "title_ko": "무오독립선언 — 해외 39인의 독립선언",
    "people": [
      "조소앙"
    ],
    "year": 1918,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1918_01"
  },
  {
    "id": "policy_1918_01",
    "title_ko": "토지조사사업 완료 — 수탈의 마무리",
    "people": [],
    "year": 1918,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1918_01"
  },
  {
    "id": "organization_1918_01",
    "title_ko": "한인사회당 결성 — 한국 최초의 사회주의 정당",
    "people": [
      "이동휘",
      "김알렉산드라"
    ],
    "year": 1918,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=organization_1918_01"
  },
  {
    "id": "person_1918_01",
    "title_ko": "김알렉산드라 — 한인 최초의 볼셰비키",
    "people": [
      "김알렉산드라"
    ],
    "year": 1918,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1918_01"
  },
  {
    "id": "movement_1919_01",
    "title_ko": "2·8 독립선언 — 도쿄 유학생들의 외침",
    "people": [],
    "year": 1919,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1919_01"
  },
  {
    "id": "movement_1919_02",
    "title_ko": "3·1운동 — 거족적 독립만세운동",
    "people": [
      "한용운",
      "손병희",
      "유관순",
      "최남선",
      "이승훈"
    ],
    "year": 1919,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1919_02"
  },
  {
    "id": "movement_1919_03",
    "title_ko": "아우내 장터 만세운동",
    "people": [
      "유관순"
    ],
    "year": 1919,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1919_03"
  },
  {
    "id": "movement_1919_04",
    "title_ko": "평양 만세운동",
    "people": [],
    "year": 1919,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1919_04"
  },
  {
    "id": "movement_1919_05",
    "title_ko": "대구 만세운동",
    "people": [],
    "year": 1919,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1919_05"
  },
  {
    "id": "movement_1919_06",
    "title_ko": "원산 만세운동",
    "people": [],
    "year": 1919,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1919_06"
  },
  {
    "id": "movement_1919_07",
    "title_ko": "조천 만세운동 — 제주의 독립선언",
    "people": [],
    "year": 1919,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1919_07"
  },
  {
    "id": "movement_1919_08",
    "title_ko": "발안 장날 만세시위 — 제암리 학살의 전조",
    "people": [],
    "year": 1919,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1919_08"
  },
  {
    "id": "massacre_1919_01",
    "title_ko": "제암리 학살 사건",
    "people": [],
    "year": 1919,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=massacre_1919_01"
  },
  {
    "id": "massacre_1919_02",
    "title_ko": "수촌리 학살 사건",
    "people": [],
    "year": 1919,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=massacre_1919_02"
  },
  {
    "id": "political_1919_01",
    "title_ko": "대한민국 임시정부 수립",
    "people": [
      "이승만",
      "안창호",
      "이동휘",
      "김구"
    ],
    "year": 1919,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1919_01"
  },
  {
    "id": "person_1919_01",
    "title_ko": "손병희 — 3·1운동 민족대표의 영수",
    "people": [
      "손병희"
    ],
    "year": 1919,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1919_01"
  },
  {
    "id": "person_1919_02",
    "title_ko": "김구 — 임시정부에 투신하다",
    "people": [
      "김구"
    ],
    "year": 1919,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1919_02"
  },
  {
    "id": "person_1919_03",
    "title_ko": "이승만 — 외교독립론과 초대 임시대통령",
    "people": [
      "이승만"
    ],
    "year": 1919,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1919_03"
  },
  {
    "id": "person_1919_04",
    "title_ko": "하세가와 요시미치 — 3·1운동을 진압한 총독",
    "people": [
      "하세가와 요시미치"
    ],
    "year": 1919,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1919_04"
  },
  {
    "id": "person_1919_05",
    "title_ko": "스코필드 — 3·1운동의 서른네 번째 민족대표",
    "people": [
      "스코필드"
    ],
    "year": 1919,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1919_05"
  },
  {
    "id": "person_1919_06",
    "title_ko": "오동진 — 서간도 망명과 무장투쟁의 시작",
    "people": [
      "오동진"
    ],
    "year": 1919,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1919_06"
  },
  {
    "id": "person_1919_07",
    "title_ko": "김마리아 — 2·8의 불씨를 품고 현해탄을 건너다",
    "people": [
      "김마리아"
    ],
    "year": 1919,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1919_07"
  },
  {
    "id": "battle_1920_01",
    "title_ko": "봉오동 전투",
    "people": [
      "홍범도",
      "최진동",
      "안무"
    ],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1920_01"
  },
  {
    "id": "battle_1920_02",
    "title_ko": "청산리 대첩",
    "people": [
      "김좌진",
      "홍범도",
      "이범석",
      "나중소",
      "서일"
    ],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1920_02"
  },
  {
    "id": "massacre_1920_01",
    "title_ko": "간도 참변 (경신참변)",
    "people": [],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=massacre_1920_01"
  },
  {
    "id": "plot_1920_01",
    "title_ko": "훈춘 사건",
    "people": [],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=plot_1920_01"
  },
  {
    "id": "righteous_1920_01",
    "title_ko": "부산경찰서 투탄 (박재혁)",
    "people": [
      "박재혁",
      "김원봉"
    ],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=righteous_1920_01"
  },
  {
    "id": "battle_1920_03",
    "title_ko": "신흥무관학교",
    "people": [
      "이회영",
      "이시영",
      "지청천",
      "신팔균"
    ],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1920_03"
  },
  {
    "id": "battle_1920_04",
    "title_ko": "삼둔자 전투",
    "people": [
      "홍범도",
      "최진동"
    ],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1920_04"
  },
  {
    "id": "righteous_1920_02",
    "title_ko": "밀양경찰서 투탄 (최수봉)",
    "people": [
      "최수봉",
      "김원봉"
    ],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=righteous_1920_02"
  },
  {
    "id": "political_1920_01",
    "title_ko": "동아·조선일보 창간",
    "people": [
      "김성수",
      "장덕준"
    ],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1920_01"
  },
  {
    "id": "battle_1920_05",
    "title_ko": "독립군 밀산 집결",
    "people": [
      "홍범도",
      "김좌진"
    ],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1920_05"
  },
  {
    "id": "policy_1920_01",
    "title_ko": "산미증식계획 시작",
    "people": [],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1920_01"
  },
  {
    "id": "policy_1920_02",
    "title_ko": "일본·국제 정세",
    "people": [],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1920_02"
  },
  {
    "id": "righteous_1920_03",
    "title_ko": "강우규 순국",
    "people": [
      "강우규"
    ],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=righteous_1920_03"
  },
  {
    "id": "righteous_1920_04",
    "title_ko": "유관순 순국",
    "people": [
      "유관순"
    ],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=righteous_1920_04"
  },
  {
    "id": "person_1920_01",
    "title_ko": "김구 — 임시정부 경무국장",
    "people": [
      "김구"
    ],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1920_01"
  },
  {
    "id": "person_1920_02",
    "title_ko": "김원봉 — 의열단 결성·지휘",
    "people": [
      "김원봉"
    ],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1920_02"
  },
  {
    "id": "person_1920_03",
    "title_ko": "안창호 — 임정 내무총장·흥사단",
    "people": [
      "안창호"
    ],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1920_03"
  },
  {
    "id": "person_1920_04",
    "title_ko": "신채호 — 보합단 조직",
    "people": [
      "신채호"
    ],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1920_04"
  },
  {
    "id": "person_1920_05",
    "title_ko": "이회영 — 베이징 망명 활동",
    "people": [
      "이회영"
    ],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1920_05"
  },
  {
    "id": "person_1920_06",
    "title_ko": "윤봉길 — 농촌계몽운동",
    "people": [
      "윤봉길"
    ],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1920_06"
  },
  {
    "id": "person_1920_07",
    "title_ko": "이봉창 — 오사카에서 노동",
    "people": [
      "이봉창"
    ],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1920_07"
  },
  {
    "id": "person_1920_08",
    "title_ko": "양세봉 — 남만주 무장투쟁 시작",
    "people": [
      "양세봉"
    ],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1920_08"
  },
  {
    "id": "massacre_1920_02",
    "title_ko": "연해주 4월참변 (신한촌 사건)",
    "people": [
      "최재형"
    ],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=massacre_1920_02"
  },
  {
    "id": "plot_1920_02",
    "title_ko": "니콜라옙스크 사건 (니항사건)",
    "people": [],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=plot_1920_02"
  },
  {
    "id": "political_1920_02",
    "title_ko": "영친왕-이방자 결혼과 폭탄 미수",
    "people": [
      "영친왕 이은"
    ],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1920_02"
  },
  {
    "id": "political_1920_03",
    "title_ko": "민원식 — 친일단체 국민협회 조직",
    "people": [
      "민원식"
    ],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1920_03"
  },
  {
    "id": "movement_1920_01",
    "title_ko": "조선물산장려운동 발족",
    "people": [
      "조만식"
    ],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1920_01"
  },
  {
    "id": "movement_1920_02",
    "title_ko": "조선노동공제회 창립",
    "people": [],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1920_02"
  },
  {
    "id": "battle_1920_06",
    "title_ko": "천마산대 — 국내 무장유격전",
    "people": [
      "최시흥"
    ],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1920_06"
  },
  {
    "id": "battle_1920_07",
    "title_ko": "보합단 — 평북 무장조직",
    "people": [
      "김중량"
    ],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1920_07"
  },
  {
    "id": "battle_1920_08",
    "title_ko": "구월산대 — 황해도 무장조직",
    "people": [],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1920_08"
  },
  {
    "id": "battle_1920_09",
    "title_ko": "블라디보스토크 무기 조달 루트",
    "people": [],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1920_09"
  },
  {
    "id": "policy_1920_03",
    "title_ko": "회사령 폐지",
    "people": [],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1920_03"
  },
  {
    "id": "person_1920_09",
    "title_ko": "박헌영 — 상하이에서 공산주의와 만나다",
    "people": [
      "박헌영"
    ],
    "year": 1920,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1920_09"
  },
  {
    "id": "migration_1921_01",
    "title_ko": "대한독립군단 자유시 이동",
    "people": [
      "홍범도",
      "서일"
    ],
    "year": 1921,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=migration_1921_01"
  },
  {
    "id": "massacre_1921_01",
    "title_ko": "자유시 참변 (흑하사변)",
    "people": [
      "홍범도",
      "서일"
    ],
    "year": 1921,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=massacre_1921_01"
  },
  {
    "id": "person_1921_01",
    "title_ko": "서일 순국 (자유시 참변 충격)",
    "people": [
      "서일"
    ],
    "year": 1921,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1921_01"
  },
  {
    "id": "political_1921_01",
    "title_ko": "임정 내분 — 이동휘 사임",
    "people": [
      "이동휘",
      "이승만",
      "안창호"
    ],
    "year": 1921,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1921_01"
  },
  {
    "id": "political_1921_02",
    "title_ko": "군사통일주비회 — 임정 해산 요구",
    "people": [
      "박용만",
      "신채호"
    ],
    "year": 1921,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1921_02"
  },
  {
    "id": "political_1921_03",
    "title_ko": "워싱턴 회의 — 외교독립의 좌절",
    "people": [
      "이승만",
      "김규식"
    ],
    "year": 1921,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1921_03"
  },
  {
    "id": "righteous_1921_01",
    "title_ko": "민원식 암살 — 양근환 의거",
    "people": [
      "양근환"
    ],
    "year": 1921,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=righteous_1921_01"
  },
  {
    "id": "righteous_1921_02",
    "title_ko": "박상진 순국",
    "people": [
      "박상진"
    ],
    "year": 1921,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=righteous_1921_02"
  },
  {
    "id": "righteous_1921_03",
    "title_ko": "김익상 — 조선총독부 투탄",
    "people": [
      "김익상",
      "김원봉"
    ],
    "year": 1921,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=righteous_1921_03"
  },
  {
    "id": "policy_1921_01",
    "title_ko": "문화통치 본격화 — 회유와 분열",
    "people": [],
    "year": 1921,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1921_01"
  },
  {
    "id": "policy_1921_02",
    "title_ko": "시베리아 출병 철수 시작",
    "people": [],
    "year": 1921,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1921_02"
  },
  {
    "id": "person_1921_02",
    "title_ko": "김구 — 임정 수습",
    "people": [
      "김구"
    ],
    "year": 1921,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1921_02"
  },
  {
    "id": "person_1921_03",
    "title_ko": "신채호 — 군사통일주비회 주도",
    "people": [
      "신채호"
    ],
    "year": 1921,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1921_03"
  },
  {
    "id": "migration_1921_02",
    "title_ko": "대한독립군단 해체",
    "people": [
      "홍범도",
      "김좌진"
    ],
    "year": 1921,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=migration_1921_02"
  },
  {
    "id": "person_1921_04",
    "title_ko": "홍범도 — 이르쿠츠크 고려혁명군관학교",
    "people": [
      "홍범도"
    ],
    "year": 1921,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1921_04"
  },
  {
    "id": "political_1921_04",
    "title_ko": "고려공산당 분립 — 상해파와 이르쿠츠크파",
    "people": [],
    "year": 1921,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1921_04"
  },
  {
    "id": "movement_1921_01",
    "title_ko": "부산부두 노동자 총파업",
    "people": [],
    "year": 1921,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1921_01"
  },
  {
    "id": "political_1921_05",
    "title_ko": "임정 개조·창조 논쟁의 시작",
    "people": [
      "안창호",
      "신채호"
    ],
    "year": 1921,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1921_05"
  },
  {
    "id": "person_1921_05",
    "title_ko": "여운형 — 고려공산당과 모스크바",
    "people": [
      "여운형"
    ],
    "year": 1921,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1921_05"
  },
  {
    "id": "person_1921_06",
    "title_ko": "나혜석 — 한국 최초 여성 개인전",
    "people": [
      "나혜석"
    ],
    "year": 1921,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1921_06"
  },
  {
    "id": "battle_1922_01",
    "title_ko": "대한통의부 결성",
    "people": [
      "김동삼",
      "채상덕"
    ],
    "year": 1922,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1922_01"
  },
  {
    "id": "battle_1922_02",
    "title_ko": "독립군 만주 귀환",
    "people": [
      "김좌진"
    ],
    "year": 1922,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1922_02"
  },
  {
    "id": "righteous_1922_01",
    "title_ko": "황포탄 의거 (김익상·오성륜·이종암)",
    "people": [
      "김익상",
      "오성륜",
      "이종암",
      "김원봉"
    ],
    "year": 1922,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=righteous_1922_01"
  },
  {
    "id": "political_1922_01",
    "title_ko": "극동민족대회 — 모스크바",
    "people": [
      "김규식",
      "여운형",
      "홍범도"
    ],
    "year": 1922,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1922_01"
  },
  {
    "id": "political_1922_02",
    "title_ko": "국민대표회의 소집 운동",
    "people": [
      "안창호",
      "신채호"
    ],
    "year": 1922,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1922_02"
  },
  {
    "id": "movement_1922_01",
    "title_ko": "조선노동연맹회 결성",
    "people": [],
    "year": 1922,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1922_01"
  },
  {
    "id": "movement_1922_02",
    "title_ko": "형평사 전사(前史) — 백정 차별 철폐 움직임",
    "people": [],
    "year": 1922,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1922_02"
  },
  {
    "id": "policy_1922_01",
    "title_ko": "제2차 조선교육령 공포",
    "people": [],
    "year": 1922,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1922_01"
  },
  {
    "id": "person_1922_01",
    "title_ko": "홍범도 — 연해주 이만에서",
    "people": [
      "홍범도"
    ],
    "year": 1922,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1922_01"
  },
  {
    "id": "person_1922_02",
    "title_ko": "김원봉 — 의열단 본부 베이징",
    "people": [
      "김원봉"
    ],
    "year": 1922,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1922_02"
  },
  {
    "id": "person_1922_03",
    "title_ko": "안창호 — 국민대표회의 준비",
    "people": [
      "안창호"
    ],
    "year": 1922,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1922_03"
  },
  {
    "id": "person_1922_04",
    "title_ko": "박헌영 — 국내 잠입과 체포",
    "people": [
      "박헌영"
    ],
    "year": 1922,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1922_04"
  },
  {
    "id": "person_1922_05",
    "title_ko": "김경천 — 백마 탄 김장군, 연해주의 전설",
    "people": [
      "김경천"
    ],
    "year": 1922,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1922_05"
  },
  {
    "id": "righteous_1923_01",
    "title_ko": "김상옥 — 종로경찰서 의거",
    "people": [
      "김상옥",
      "김원봉"
    ],
    "year": 1923,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=righteous_1923_01"
  },
  {
    "id": "political_1923_01",
    "title_ko": "조선혁명선언 발표",
    "people": [
      "신채호",
      "김원봉",
      "유자명"
    ],
    "year": 1923,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1923_01"
  },
  {
    "id": "massacre_1923_01",
    "title_ko": "관동대지진 조선인 학살",
    "people": [],
    "year": 1923,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=massacre_1923_01"
  },
  {
    "id": "political_1923_02",
    "title_ko": "국민대표회의 개막",
    "people": [
      "안창호",
      "신채호",
      "김동삼"
    ],
    "year": 1923,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1923_02"
  },
  {
    "id": "political_1923_03",
    "title_ko": "국민대표회의 결렬",
    "people": [
      "안창호",
      "신채호"
    ],
    "year": 1923,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1923_03"
  },
  {
    "id": "battle_1923_01",
    "title_ko": "육군주만참의부 결성",
    "people": [],
    "year": 1923,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1923_01"
  },
  {
    "id": "movement_1923_01",
    "title_ko": "조선형평사 창립",
    "people": [],
    "year": 1923,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1923_01"
  },
  {
    "id": "movement_1923_02",
    "title_ko": "암태도 소작쟁의",
    "people": [],
    "year": 1923,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1923_02"
  },
  {
    "id": "policy_1923_01",
    "title_ko": "조선인 도일(渡日) 증가와 차별",
    "people": [],
    "year": 1923,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1923_01"
  },
  {
    "id": "person_1923_01",
    "title_ko": "신채호 — 베이징에서 역사연구로",
    "people": [
      "신채호"
    ],
    "year": 1923,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1923_01"
  },
  {
    "id": "person_1923_02",
    "title_ko": "안창호 — 분열을 끌어안다",
    "people": [
      "안창호"
    ],
    "year": 1923,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1923_02"
  },
  {
    "id": "person_1923_03",
    "title_ko": "강상호 — 양반이 백정과 함께 서다",
    "people": [
      "강상호"
    ],
    "year": 1923,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1923_03"
  },
  {
    "id": "movement_1923_03",
    "title_ko": "방정환과 어린이날 제정",
    "people": [
      "방정환"
    ],
    "year": 1923,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1923_03"
  },
  {
    "id": "righteous_1924_01",
    "title_ko": "김지섭 — 도쿄 이중교 의거",
    "people": [
      "김지섭",
      "김원봉"
    ],
    "year": 1924,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=righteous_1924_01"
  },
  {
    "id": "battle_1924_01",
    "title_ko": "정의부 결성",
    "people": [
      "김동삼"
    ],
    "year": 1924,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1924_01"
  },
  {
    "id": "movement_1924_01",
    "title_ko": "조선노농총동맹 창립",
    "people": [],
    "year": 1924,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1924_01"
  },
  {
    "id": "movement_1924_02",
    "title_ko": "암태도 소작쟁의 승리",
    "people": [],
    "year": 1924,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1924_02"
  },
  {
    "id": "policy_1924_01",
    "title_ko": "경성제국대학 설립",
    "people": [],
    "year": 1924,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1924_01"
  },
  {
    "id": "movement_1924_03",
    "title_ko": "민립대학 설립운동",
    "people": [
      "이상재"
    ],
    "year": 1924,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1924_03"
  },
  {
    "id": "political_1924_01",
    "title_ko": "임시정부 침체와 이승만 탄핵 움직임",
    "people": [
      "이승만",
      "박은식"
    ],
    "year": 1924,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1924_01"
  },
  {
    "id": "person_1924_01",
    "title_ko": "김원봉 — 노선 전환의 고민",
    "people": [
      "김원봉"
    ],
    "year": 1924,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1924_01"
  },
  {
    "id": "person_1924_02",
    "title_ko": "박은식 — 임정을 떠받치다",
    "people": [
      "박은식"
    ],
    "year": 1924,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1924_02"
  },
  {
    "id": "battle_1925_01",
    "title_ko": "신민부 결성",
    "people": [
      "김좌진"
    ],
    "year": 1925,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1925_01"
  },
  {
    "id": "policy_1925_01",
    "title_ko": "미쓰야 협정",
    "people": [],
    "year": 1925,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1925_01"
  },
  {
    "id": "political_1925_01",
    "title_ko": "조선공산당 창당",
    "people": [
      "김재봉",
      "박헌영",
      "조봉암"
    ],
    "year": 1925,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1925_01"
  },
  {
    "id": "policy_1925_02",
    "title_ko": "치안유지법 시행",
    "people": [],
    "year": 1925,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1925_02"
  },
  {
    "id": "political_1925_02",
    "title_ko": "이승만 탄핵과 박은식 대통령 취임",
    "people": [
      "이승만",
      "박은식"
    ],
    "year": 1925,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1925_02"
  },
  {
    "id": "person_1925_01",
    "title_ko": "권기옥 — 한국 최초의 여성 비행사",
    "people": [
      "권기옥"
    ],
    "year": 1925,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1925_01"
  },
  {
    "id": "person_1925_02",
    "title_ko": "김좌진 — 북만주에서 다시 서다",
    "people": [
      "김좌진"
    ],
    "year": 1925,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1925_02"
  },
  {
    "id": "political_1925_03",
    "title_ko": "신의주사건 — 제1차 조선공산당 검거",
    "people": [
      "김재봉"
    ],
    "year": 1925,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1925_03"
  },
  {
    "id": "movement_1925_02",
    "title_ko": "을축년 대홍수",
    "people": [],
    "year": 1925,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1925_02"
  },
  {
    "id": "policy_1925_03",
    "title_ko": "조선사편수회 설치 — 식민사관의 제도화",
    "people": [
      "이병도"
    ],
    "year": 1925,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1925_03"
  },
  {
    "id": "person_1925_03",
    "title_ko": "김소월 — 진달래꽃, 조선의 슬픔에 리듬을 주다",
    "people": [
      "김소월"
    ],
    "year": 1925,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1925_03"
  },
  {
    "id": "political_1926_01",
    "title_ko": "순종 승하 — 대한제국 황실의 종말",
    "people": [
      "순종"
    ],
    "year": 1926,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1926_01"
  },
  {
    "id": "movement_1926_01",
    "title_ko": "6·10 만세운동",
    "people": [
      "권오설"
    ],
    "year": 1926,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1926_01"
  },
  {
    "id": "political_1926_02",
    "title_ko": "제2차 조선공산당 검거",
    "people": [
      "권오설",
      "강달영"
    ],
    "year": 1926,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1926_02"
  },
  {
    "id": "righteous_1926_01",
    "title_ko": "나석주 — 동양척식회사 의거",
    "people": [
      "나석주",
      "김창숙",
      "김구"
    ],
    "year": 1926,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=righteous_1926_01"
  },
  {
    "id": "political_1926_05",
    "title_ko": "정우회 선언 — 민족협동전선의 길",
    "people": [],
    "year": 1926,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1926_05"
  },
  {
    "id": "political_1926_06",
    "title_ko": "임시정부 — 국무령제 전환",
    "people": [
      "안창호",
      "김구"
    ],
    "year": 1926,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1926_06"
  },
  {
    "id": "policy_1926_01",
    "title_ko": "조선총독부 신청사 준공",
    "people": [],
    "year": 1926,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1926_01"
  },
  {
    "id": "person_1926_01",
    "title_ko": "김창숙 — 의열투쟁의 자금줄",
    "people": [
      "김창숙"
    ],
    "year": 1926,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1926_01"
  },
  {
    "id": "person_1926_02",
    "title_ko": "김구 — 임시정부 국무령에 오르다",
    "people": [
      "김구"
    ],
    "year": 1926,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1926_02"
  },
  {
    "id": "person_1926_03",
    "title_ko": "이상화 — \"빼앗긴 들에도 봄은 오는가\"",
    "people": [
      "이상화"
    ],
    "year": 1926,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1926_03"
  },
  {
    "id": "person_1926_04",
    "title_ko": "한용운 — 『님의 침묵』 출간",
    "people": [
      "한용운"
    ],
    "year": 1926,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1926_04"
  },
  {
    "id": "person_1926_06",
    "title_ko": "가네코 후미코 — 옥사한 아나키스트, 대한민국 서훈을 받은 유일한 일본인 여성",
    "people": [
      "가네코후미코",
      "박열"
    ],
    "year": 1926,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1926_06"
  },
  {
    "id": "person_1926_05",
    "title_ko": "나운규 — 아리랑, 조선 영화가 태어난 날",
    "people": [
      "나운규"
    ],
    "year": 1926,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1926_05"
  },
  {
    "id": "political_1927_01",
    "title_ko": "신간회 창립 — 민족유일당",
    "people": [
      "이상재",
      "홍명희",
      "신채호"
    ],
    "year": 1927,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1927_01"
  },
  {
    "id": "movement_1927_01",
    "title_ko": "근우회 창립 — 여성계 민족유일당",
    "people": [
      "김활란",
      "정칠성",
      "박차정",
      "허정숙"
    ],
    "year": 1927,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1927_01"
  },
  {
    "id": "political_1927_02",
    "title_ko": "이상재 별세 — 신간회 초대 회장",
    "people": [
      "이상재"
    ],
    "year": 1927,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1927_02"
  },
  {
    "id": "political_1927_03",
    "title_ko": "의열단의 노선 전환 — 개별투쟁에서 조직투쟁으로",
    "people": [
      "김원봉"
    ],
    "year": 1927,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1927_03"
  },
  {
    "id": "righteous_1927_01",
    "title_ko": "김창숙 체포 — 나석주 의거의 여파",
    "people": [
      "김창숙"
    ],
    "year": 1927,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=righteous_1927_01"
  },
  {
    "id": "political_1927_04",
    "title_ko": "중국 국공분열과 독립운동의 동요",
    "people": [],
    "year": 1927,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1927_04"
  },
  {
    "id": "person_1927_01",
    "title_ko": "신채호 — 무정부주의 동방연맹",
    "people": [
      "신채호"
    ],
    "year": 1927,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1927_01"
  },
  {
    "id": "person_1927_02",
    "title_ko": "김활란 — 근우회와 여성운동",
    "people": [
      "김활란"
    ],
    "year": 1927,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1927_02"
  },
  {
    "id": "person_1927_03",
    "title_ko": "정칠성 — 계급과 여성해방을 함께 외치다",
    "people": [
      "정칠성"
    ],
    "year": 1927,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1927_03"
  },
  {
    "id": "righteous_1928_01",
    "title_ko": "조명하 — 타이중 의거",
    "people": [
      "조명하"
    ],
    "year": 1928,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=righteous_1928_01"
  },
  {
    "id": "political_1928_01",
    "title_ko": "제3차 조선공산당 사건 — 마지막 당대회",
    "people": [
      "차금봉",
      "안광천"
    ],
    "year": 1928,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1928_01"
  },
  {
    "id": "political_1928_02",
    "title_ko": "코민테른 12월테제",
    "people": [],
    "year": 1928,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1928_02"
  },
  {
    "id": "movement_1928_01",
    "title_ko": "신간회 전국 확장과 노선 갈등",
    "people": [
      "홍명희"
    ],
    "year": 1928,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1928_01"
  },
  {
    "id": "person_1928_01",
    "title_ko": "신채호 — 동방연맹 활동과 체포 직전",
    "people": [
      "신채호"
    ],
    "year": 1928,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1928_01"
  },
  {
    "id": "person_1928_02",
    "title_ko": "박용만 — 베이징에서 피살",
    "people": [
      "박용만"
    ],
    "year": 1928,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1928_02"
  },
  {
    "id": "movement_1929_01",
    "title_ko": "나주역 사건 — 광주학생운동의 불씨",
    "people": [],
    "year": 1929,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1929_01"
  },
  {
    "id": "movement_1929_02",
    "title_ko": "광주학생항일운동",
    "people": [
      "장재성"
    ],
    "year": 1929,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1929_02"
  },
  {
    "id": "movement_1929_03",
    "title_ko": "신간회 민중대회 사건",
    "people": [
      "허헌",
      "홍명희"
    ],
    "year": 1929,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1929_03"
  },
  {
    "id": "political_1929_01",
    "title_ko": "당재건운동의 분파적 출발",
    "people": [
      "이동휘"
    ],
    "year": 1929,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1929_01"
  },
  {
    "id": "political_1929_02",
    "title_ko": "신간회 복대표대회 — 사회주의자의 약진",
    "people": [],
    "year": 1929,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1929_02"
  },
  {
    "id": "policy_1929_01",
    "title_ko": "세계 대공황 발발",
    "people": [],
    "year": 1929,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1929_01"
  },
  {
    "id": "person_1929_01",
    "title_ko": "홍명희 — 신간회의 사상가",
    "people": [
      "홍명희"
    ],
    "year": 1929,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1929_01"
  },
  {
    "id": "person_1930_01",
    "title_ko": "김좌진 암살",
    "people": [
      "김좌진"
    ],
    "year": 1930,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1930_01"
  },
  {
    "id": "political_1930_01",
    "title_ko": "신간회 해소론의 부상",
    "people": [],
    "year": 1930,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1930_01"
  },
  {
    "id": "movement_1930_01",
    "title_ko": "광주학생운동의 여진 — 백지동맹과 3차 시위",
    "people": [],
    "year": 1930,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1930_01"
  },
  {
    "id": "movement_1930_02",
    "title_ko": "원산총파업",
    "people": [],
    "year": 1930,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1930_02"
  },
  {
    "id": "person_1930_02",
    "title_ko": "허정숙 — 옌안으로의 길",
    "people": [
      "허정숙"
    ],
    "year": 1930,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1930_02"
  },
  {
    "id": "person_1930_03",
    "title_ko": "강주룡 — 평원고무공장 파업과 을밀대 고공농성",
    "people": [
      "강주룡"
    ],
    "year": 1930,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1930_03"
  },
  {
    "id": "political_1931_01",
    "title_ko": "신간회 해체",
    "people": [],
    "year": 1931,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1931_01"
  },
  {
    "id": "plot_1931_01",
    "title_ko": "만보산 사건",
    "people": [],
    "year": 1931,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=plot_1931_01"
  },
  {
    "id": "massacre_1931_01",
    "title_ko": "평양 화교 학살",
    "people": [],
    "year": 1931,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=massacre_1931_01"
  },
  {
    "id": "plot_1931_02",
    "title_ko": "류탸오후 사건 — 만주사변의 발화점",
    "people": [],
    "year": 1931,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=plot_1931_02"
  },
  {
    "id": "policy_1931_01",
    "title_ko": "만주사변 — 일본의 만주 침략",
    "people": [
      "이시와라 간지"
    ],
    "year": 1931,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1931_01"
  },
  {
    "id": "political_1931_02",
    "title_ko": "한인애국단 결성",
    "people": [
      "김구"
    ],
    "year": 1931,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1931_02"
  },
  {
    "id": "political_1931_03",
    "title_ko": "한국독립당·조선혁명당 창립",
    "people": [
      "안창호",
      "조소앙"
    ],
    "year": 1931,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1931_03"
  },
  {
    "id": "person_1931_01",
    "title_ko": "지청천 — 한중연합의 길",
    "people": [
      "지청천"
    ],
    "year": 1931,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1931_01"
  },
  {
    "id": "movement_1931_02",
    "title_ko": "브나로드 운동 — 동아일보의 문맹퇴치운동",
    "people": [],
    "year": 1931,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1931_02"
  },
  {
    "id": "righteous_1932_01",
    "title_ko": "이봉창 — 도쿄 의거",
    "people": [
      "이봉창",
      "김구"
    ],
    "year": 1932,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=righteous_1932_01"
  },
  {
    "id": "righteous_1932_02",
    "title_ko": "윤봉길 — 훙커우공원 의거",
    "people": [
      "윤봉길",
      "김구"
    ],
    "year": 1932,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=righteous_1932_02"
  },
  {
    "id": "policy_1932_01",
    "title_ko": "만주국 수립",
    "people": [],
    "year": 1932,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1932_01"
  },
  {
    "id": "battle_1932_01",
    "title_ko": "서란현 전투",
    "people": [
      "지청천"
    ],
    "year": 1932,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1932_01"
  },
  {
    "id": "battle_1932_02",
    "title_ko": "쌍성보 전투",
    "people": [
      "지청천"
    ],
    "year": 1932,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1932_02"
  },
  {
    "id": "battle_1932_03",
    "title_ko": "영릉가 전투",
    "people": [
      "양세봉",
      "김학규"
    ],
    "year": 1932,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1932_03"
  },
  {
    "id": "movement_1932_01",
    "title_ko": "제주 해녀 항일운동",
    "people": [],
    "year": 1932,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1932_01"
  },
  {
    "id": "person_1932_01",
    "title_ko": "김구 — 거사 이후의 임시정부",
    "people": [
      "김구"
    ],
    "year": 1932,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1932_01"
  },
  {
    "id": "battle_1933_01",
    "title_ko": "대전자령 전투",
    "people": [
      "지청천"
    ],
    "year": 1933,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1933_01"
  },
  {
    "id": "battle_1933_03",
    "title_ko": "흥경성 전투",
    "people": [
      "양세봉",
      "김학규"
    ],
    "year": 1933,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1933_03"
  },
  {
    "id": "battle_1933_02",
    "title_ko": "동녕현성 전투 — 한중연합의 마지막 불꽃",
    "people": [
      "지청천"
    ],
    "year": 1933,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1933_02"
  },
  {
    "id": "political_1933_01",
    "title_ko": "한국독립군 해체와 임시정부 합류",
    "people": [
      "지청천"
    ],
    "year": 1933,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1933_01"
  },
  {
    "id": "person_1933_01",
    "title_ko": "지청천 — 만주를 떠나 관내로",
    "people": [
      "지청천"
    ],
    "year": 1933,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1933_01"
  },
  {
    "id": "person_1933_02",
    "title_ko": "남자현 — 손가락을 잘라 혈서를 쓴 독립군의 어머니",
    "people": [
      "남자현"
    ],
    "year": 1933,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1933_02"
  },
  {
    "id": "political_1934_01",
    "title_ko": "낙양군관학교 한인특별반 개설",
    "people": [
      "김구"
    ],
    "year": 1934,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1934_01"
  },
  {
    "id": "person_1934_01",
    "title_ko": "지청천 — 낙양군관학교 총교도관",
    "people": [
      "지청천"
    ],
    "year": 1934,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1934_01"
  },
  {
    "id": "person_1934_02",
    "title_ko": "양세봉 — 남만주 최후의 사령관, 밀정의 총탄에 지다",
    "people": [
      "양세봉"
    ],
    "year": 1934,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1934_02"
  },
  {
    "id": "political_1934_02",
    "title_ko": "한국대일전선통일동맹의 모색",
    "people": [
      "김규식"
    ],
    "year": 1934,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1934_02"
  },
  {
    "id": "policy_1934_01",
    "title_ko": "농촌진흥운동과 식민 동화의 심화",
    "people": [],
    "year": 1934,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1934_01"
  },
  {
    "id": "culture_1934_01",
    "title_ko": "진단학회 창립 — 실증사학의 결집",
    "people": [
      "이병도",
      "손진태"
    ],
    "year": 1934,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=culture_1934_01"
  },
  {
    "id": "political_1935_01",
    "title_ko": "민족혁명당 결성",
    "people": [
      "김원봉",
      "김규식",
      "지청천"
    ],
    "year": 1935,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1935_01"
  },
  {
    "id": "political_1935_02",
    "title_ko": "한국독립당 재건과 한국국민당 창립 — 갈라진 두 길",
    "people": [
      "조소앙",
      "김구",
      "이동녕"
    ],
    "year": 1935,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1935_02"
  },
  {
    "id": "policy_1935_01",
    "title_ko": "신사참배 강요의 시작",
    "people": [
      "주기철"
    ],
    "year": 1935,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1935_01"
  },
  {
    "id": "person_1935_01",
    "title_ko": "김원봉 — 민족혁명당 총서기",
    "people": [
      "김원봉"
    ],
    "year": 1935,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1935_01"
  },
  {
    "id": "person_1935_02",
    "title_ko": "주기철 — 신앙으로 맞선 저항",
    "people": [
      "주기철"
    ],
    "year": 1935,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1935_02"
  },
  {
    "id": "battle_1936_01",
    "title_ko": "동북항일연군 결성",
    "people": [
      "김일성"
    ],
    "year": 1936,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1936_01"
  },
  {
    "id": "political_1936_01",
    "title_ko": "조국광복회 결성",
    "people": [
      "오성륜",
      "김일성"
    ],
    "year": 1936,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1936_01"
  },
  {
    "id": "battle_1936_02",
    "title_ko": "조선혁명군의 해체와 동북항일연군 합류",
    "people": [
      "양세봉"
    ],
    "year": 1936,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1936_02"
  },
  {
    "id": "movement_1936_01",
    "title_ko": "손기정 — 베를린올림픽 마라톤 우승",
    "people": [
      "손기정"
    ],
    "year": 1936,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1936_01"
  },
  {
    "id": "movement_1936_02",
    "title_ko": "일장기 말소 사건",
    "people": [
      "이길용",
      "현진건"
    ],
    "year": 1936,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=movement_1936_02"
  },
  {
    "id": "person_1936_01",
    "title_ko": "김일성 — 만주 항일연군의 청년 지휘관",
    "people": [
      "김일성"
    ],
    "year": 1936,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1936_01"
  },
  {
    "id": "organization_1936_01",
    "title_ko": "관동군 방역부 발족 — 731부대의 출발점",
    "people": [
      "이시이 시로"
    ],
    "year": 1936,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=organization_1936_01"
  },
  {
    "id": "plot_1937_01",
    "title_ko": "노구교 사건 — 중일전쟁 발발",
    "people": [],
    "year": 1937,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=plot_1937_01"
  },
  {
    "id": "battle_1937_01",
    "title_ko": "보천보 전투",
    "people": [
      "김일성"
    ],
    "year": 1937,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1937_01"
  },
  {
    "id": "political_1937_01",
    "title_ko": "한국광복운동단체연합회 결성",
    "people": [
      "김구",
      "조소앙",
      "지청천"
    ],
    "year": 1937,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1937_01"
  },
  {
    "id": "political_1937_02",
    "title_ko": "조선민족전선연맹 결성",
    "people": [
      "김원봉"
    ],
    "year": 1937,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1937_02"
  },
  {
    "id": "policy_1937_01",
    "title_ko": "황국신민화 정책의 본격화",
    "people": [],
    "year": 1937,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1937_01"
  },
  {
    "id": "migration_1937_01",
    "title_ko": "연해주 한인 중앙아시아 강제이주",
    "people": [
      "홍범도"
    ],
    "year": 1937,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=migration_1937_01"
  },
  {
    "id": "policy_1937_02",
    "title_ko": "일본군 위안부 동원 본격화",
    "people": [],
    "year": 1937,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1937_02"
  },
  {
    "id": "policy_1937_03",
    "title_ko": "알뜨르 비행장 — 제주 군사화의 시작",
    "people": [],
    "year": 1937,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1937_03"
  },
  {
    "id": "political_1937_03",
    "title_ko": "백백교 사건 — 수백 명을 암매장한 사교 집단의 실체 발각",
    "people": [
      "전용해"
    ],
    "year": 1937,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1937_03"
  },
  {
    "id": "battle_1938_01",
    "title_ko": "조선의용대 창설",
    "people": [
      "김원봉"
    ],
    "year": 1938,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1938_01"
  },
  {
    "id": "policy_1938_01",
    "title_ko": "국가총동원법 시행",
    "people": [
      "미나미 지로"
    ],
    "year": 1938,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1938_01"
  },
  {
    "id": "policy_1938_02",
    "title_ko": "국민정신총동원조선연맹 결성 — 동원이 일상으로 들어오다",
    "people": [],
    "year": 1938,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1938_02"
  },
  {
    "id": "plot_1938_01",
    "title_ko": "남목청 사건 — 김구 피격",
    "people": [
      "김구",
      "현익철",
      "지청천"
    ],
    "year": 1938,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=plot_1938_01"
  },
  {
    "id": "organization_1938_01",
    "title_ko": "간도특설대 창설",
    "people": [
      "이범익"
    ],
    "year": 1938,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=organization_1938_01"
  },
  {
    "id": "person_1938_01",
    "title_ko": "박차정 — 근우회에서 조선의용대까지, 총을 든 페미니스트",
    "people": [
      "박차정",
      "김원봉"
    ],
    "year": 1938,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1938_01"
  },
  {
    "id": "person_1938_02",
    "title_ko": "최승희 — 세계가 환호한 조선의 춤",
    "people": [
      "최승희"
    ],
    "year": 1938,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1938_02"
  },
  {
    "id": "political_1939_01",
    "title_ko": "7당 통일회의 — 또 한 번의 좌절",
    "people": [
      "김구",
      "김원봉"
    ],
    "year": 1939,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1939_01"
  },
  {
    "id": "political_1939_02",
    "title_ko": "한국청년전지공작대 결성",
    "people": [
      "나월환"
    ],
    "year": 1939,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1939_02"
  },
  {
    "id": "policy_1939_01",
    "title_ko": "창씨개명령 공포",
    "people": [
      "미나미 지로"
    ],
    "year": 1939,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1939_01"
  },
  {
    "id": "policy_1939_02",
    "title_ko": "국민징용령 시행",
    "people": [],
    "year": 1939,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1939_02"
  },
  {
    "id": "person_1939_01",
    "title_ko": "김구 — 남목청의 총탄에서 살아나다",
    "people": [
      "김구"
    ],
    "year": 1939,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1939_01"
  },
  {
    "id": "policy_1939_03",
    "title_ko": "사할린 조선인 강제동원 시작",
    "people": [],
    "year": 1939,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1939_03"
  },
  {
    "id": "massacre_1939_01",
    "title_ko": "간도특설대의 항일연군·민간인 살해",
    "people": [],
    "year": 1939,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=massacre_1939_01"
  },
  {
    "id": "massacre_1939_02",
    "title_ko": "731부대 핑팡 시설 완공과 생체실험",
    "people": [
      "이시이 시로"
    ],
    "year": 1939,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=massacre_1939_02"
  },
  {
    "id": "political_1940_01",
    "title_ko": "한국독립당 통합 — 마침내 하나로",
    "people": [
      "김구",
      "조소앙",
      "지청천"
    ],
    "year": 1940,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1940_01"
  },
  {
    "id": "battle_1940_01",
    "title_ko": "한국광복군 창설",
    "people": [
      "김구",
      "지청천",
      "이범석",
      "조소앙"
    ],
    "year": 1940,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1940_01"
  },
  {
    "id": "policy_1940_01",
    "title_ko": "창씨개명 시행과 동아·조선일보 폐간",
    "people": [],
    "year": 1940,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1940_01"
  },
  {
    "id": "policy_1941_01",
    "title_ko": "진주만 공격 — 태평양전쟁 발발",
    "people": [],
    "year": 1941,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1941_01"
  },
  {
    "id": "political_1941_01",
    "title_ko": "임시정부 대일선전포고",
    "people": [
      "김구"
    ],
    "year": 1941,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1941_01"
  },
  {
    "id": "battle_1941_01",
    "title_ko": "조선의용대 화북지대 결성",
    "people": [
      "박효삼",
      "윤세주"
    ],
    "year": 1941,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1941_01"
  },
  {
    "id": "battle_1941_02",
    "title_ko": "호가장 전투",
    "people": [
      "윤세주"
    ],
    "year": 1941,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1941_02"
  },
  {
    "id": "policy_1942_01",
    "title_ko": "조선어학회 사건",
    "people": [
      "이극로",
      "최현배",
      "이윤재",
      "정인승"
    ],
    "year": 1942,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1942_01"
  },
  {
    "id": "political_1942_01",
    "title_ko": "조선의용대의 광복군 편입과 김원봉의 임정 합류",
    "people": [
      "김원봉",
      "김구"
    ],
    "year": 1942,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1942_01"
  },
  {
    "id": "battle_1942_01",
    "title_ko": "조선의용군 — 화북지대의 재편",
    "people": [],
    "year": 1942,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1942_01"
  },
  {
    "id": "political_1943_01",
    "title_ko": "카이로 선언 — 한국 독립의 첫 국제 약속",
    "people": [],
    "year": 1943,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1943_01"
  },
  {
    "id": "battle_1943_01",
    "title_ko": "인면전구공작대 파견",
    "people": [
      "한지성"
    ],
    "year": 1943,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1943_01"
  },
  {
    "id": "policy_1943_01",
    "title_ko": "학병제 시행 — 학생들의 강제 징집",
    "people": [
      "장준하",
      "김준엽"
    ],
    "year": 1943,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1943_01"
  },
  {
    "id": "policy_1943_02",
    "title_ko": "군함도(하시마) 탄광 강제징용",
    "people": [],
    "year": 1943,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1943_02"
  },
  {
    "id": "policy_1943_03",
    "title_ko": "유바리 탄광 강제징용",
    "people": [],
    "year": 1943,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1943_03"
  },
  {
    "id": "person_1943_01",
    "title_ko": "백선엽 — 간도특설대 배속",
    "people": [
      "백선엽"
    ],
    "year": 1943,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1943_01"
  },
  {
    "id": "person_1943_02",
    "title_ko": "김창룡 — 관동군 헌병대 분견 근무",
    "people": [
      "김창룡"
    ],
    "year": 1943,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1943_02"
  },
  {
    "id": "person_1943_03",
    "title_ko": "전형필 — 전 재산으로 훈민정음을 지킨 사람",
    "people": [
      "전형필"
    ],
    "year": 1943,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1943_03"
  },
  {
    "id": "political_1944_01",
    "title_ko": "조선건국동맹 결성",
    "people": [
      "여운형"
    ],
    "year": 1944,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1944_01"
  },
  {
    "id": "person_1944_01",
    "title_ko": "장준하·김준엽 — 학병 탈출과 6천 리 장정",
    "people": [
      "장준하",
      "김준엽"
    ],
    "year": 1944,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1944_01"
  },
  {
    "id": "political_1944_02",
    "title_ko": "임시정부 헌법 개정 — 주석·부주석제",
    "people": [
      "김구",
      "김원봉"
    ],
    "year": 1944,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1944_02"
  },
  {
    "id": "person_1944_02",
    "title_ko": "이육사 — 베이징 감옥에서 순국",
    "people": [
      "이육사"
    ],
    "year": 1944,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1944_02"
  },
  {
    "id": "policy_1944_01",
    "title_ko": "여자정신근로령 공포 — 여자근로정신대 동원",
    "people": [],
    "year": 1944,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1944_01"
  },
  {
    "id": "battle_1945_01",
    "title_ko": "독수리작전 — 광복군 국내정진군 편성",
    "people": [
      "이범석",
      "장준하",
      "김준엽"
    ],
    "year": 1945,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1945_01"
  },
  {
    "id": "policy_1945_04",
    "title_ko": "결7호작전 — 제주의 본토결전 준비",
    "people": [],
    "year": 1945,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1945_04"
  },
  {
    "id": "policy_1945_01",
    "title_ko": "일본 무조건 항복 — 8·15 광복",
    "people": [
      "김구",
      "여운형",
      "이승만"
    ],
    "year": 1945,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1945_01"
  },
  {
    "id": "policy_1945_03",
    "title_ko": "패전 직전 조선은행권 남발 — 마지막 약탈",
    "people": [],
    "year": 1945,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1945_03"
  },
  {
    "id": "battle_1945_02",
    "title_ko": "광복군 여의도 진입",
    "people": [
      "이범석",
      "장준하",
      "김준엽",
      "노능서"
    ],
    "year": 1945,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=battle_1945_02"
  },
  {
    "id": "policy_1945_02",
    "title_ko": "38선 분할 — 또 다른 경계의 시작",
    "people": [],
    "year": 1945,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=policy_1945_02"
  },
  {
    "id": "political_1945_01",
    "title_ko": "건국준비위원회 결성",
    "people": [
      "여운형",
      "안재홍"
    ],
    "year": 1945,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1945_01"
  },
  {
    "id": "person_1945_02",
    "title_ko": "윤동주 — 후쿠오카 형무소에서 옥사",
    "people": [
      "윤동주"
    ],
    "year": 1945,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1945_02"
  },
  {
    "id": "person_1945_01",
    "title_ko": "김구 — 개인 자격으로 돌아온 주석",
    "people": [
      "김구"
    ],
    "year": 1945,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=person_1945_01"
  },
  {
    "id": "migration_1945_01",
    "title_ko": "해외 한인의 귀환과 잔류",
    "people": [],
    "year": 1945,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=migration_1945_01"
  },
  {
    "id": "migration_1945_02",
    "title_ko": "우키시마호 침몰 — 귀국길의 비극",
    "people": [],
    "year": 1945,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=migration_1945_02"
  },
  {
    "id": "migration_1945_03",
    "title_ko": "사할린 한인 — 돌아오지 못한 4만 명",
    "people": [],
    "year": 1945,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=migration_1945_03"
  },
  {
    "id": "political_1945_02",
    "title_ko": "해방 직전 제주 — 끝내 터지지 못한 전장",
    "people": [],
    "year": 1945,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=political_1945_02"
  },
  {
    "id": "international_1945_01",
    "title_ko": "731부대 해체와 미국의 면책 거래",
    "people": [
      "이시이 시로"
    ],
    "year": 1945,
    "mapKey": "modern1",
    "mapLabel": "근대 (1876~1945)",
    "url": "/map.html?event=international_1945_01"
  },
  {
    "id": "culture_myth_01",
    "title_ko": "단군신화 — 환웅과 웅녀, 그리고 단군왕검",
    "people": [
      "환웅",
      "웅녀",
      "단군왕검"
    ],
    "year": -1000000,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=culture_myth_01"
  },
  {
    "id": "organization_myth_02",
    "title_ko": "환단고기와 대종교 — 잃어버린 역사를 되찾으려 한 사람들",
    "people": [
      "나철",
      "이유립"
    ],
    "year": -999999,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=organization_myth_02"
  },
  {
    "id": "science_paleo_02",
    "title_ko": "공주 석장리 유적 — 남한 최초로 공인된 구석기 유적",
    "people": [
      "손보기"
    ],
    "year": -30000,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=science_paleo_02"
  },
  {
    "id": "person_paleo_03",
    "title_ko": "청주 두루봉동굴 흥수아이 — 구석기인의 매장 풍습?",
    "people": [
      "김흥수"
    ],
    "year": -40000,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=person_paleo_03"
  },
  {
    "id": "science_paleo_04",
    "title_ko": "대전 월평동 유적 — 중부지방 구석기 생활상의 기록",
    "people": [],
    "year": -20000,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=science_paleo_04"
  },
  {
    "id": "science_paleo_01",
    "title_ko": "연천 전곡리 유적 — 아슐리안 주먹도끼의 발견",
    "people": [],
    "year": -700000,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=science_paleo_01"
  },
  {
    "id": "science_paleo_05",
    "title_ko": "상원 검은모루동굴 — 한반도에서 가장 오래된 구석기 유적",
    "people": [],
    "year": -600000,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=science_paleo_05"
  },
  {
    "id": "science_paleo_06",
    "title_ko": "덕천 승리산동굴 — 한반도 최초의 인류 화석 발견",
    "people": [],
    "year": -100000,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=science_paleo_06"
  },
  {
    "id": "science_paleo_07",
    "title_ko": "제천 점말동굴 — 남한 내륙의 구석기 동물화석 유적",
    "people": [
      "손보기"
    ],
    "year": -25000,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=science_paleo_07"
  },
  {
    "id": "culture_neo_01",
    "title_ko": "서울 암사동 유적 — 빗살무늬토기와 정착 마을",
    "people": [],
    "year": -4000,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=culture_neo_01"
  },
  {
    "id": "culture_neo_02",
    "title_ko": "홍산문화 — 요하 유역의 옥기와 제단",
    "people": [],
    "year": -4500,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=culture_neo_02"
  },
  {
    "id": "culture_neo_03",
    "title_ko": "부산 동삼동 패총 — 어로 생활과 원시 신앙",
    "people": [],
    "year": -4000,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=culture_neo_03"
  },
  {
    "id": "culture_neo_04",
    "title_ko": "빗살무늬토기권 — 시베리아에서 한반도까지 이어진 신석기 교류망",
    "people": [],
    "year": -5000,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=culture_neo_04"
  },
  {
    "id": "culture_neo_05",
    "title_ko": "신석기 농경의 시작 — 봉산 지탑리 유적의 탄화 좁쌀",
    "people": [],
    "year": -3000,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=culture_neo_05"
  },
  {
    "id": "culture_bronze_01",
    "title_ko": "고인돌 문화 — 거석 무덤과 계급의 등장",
    "people": [],
    "year": -1000,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=culture_bronze_01"
  },
  {
    "id": "culture_bronze_02",
    "title_ko": "비파형동검문화 — 만주와 한반도를 잇는 청동기",
    "people": [],
    "year": -800,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=culture_bronze_02"
  },
  {
    "id": "culture_bronze_03",
    "title_ko": "미송리식토기 — 고조선 문화권을 보여주는 유물",
    "people": [],
    "year": -1000,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=culture_bronze_03"
  },
  {
    "id": "culture_bronze_04",
    "title_ko": "반달돌칼 — 청동기 벼농사의 증거",
    "people": [],
    "year": -700,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=culture_bronze_04"
  },
  {
    "id": "culture_bronze_05",
    "title_ko": "울주 대곡리 반구대 암각화 — 고래잡이를 새긴 바위그림",
    "people": [],
    "year": -1000,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=culture_bronze_05"
  },
  {
    "id": "culture_bronze_06",
    "title_ko": "고령 장기리 암각화 — 동심원과 십자문에 담긴 태양 숭배",
    "people": [],
    "year": -800,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=culture_bronze_06"
  },
  {
    "id": "culture_bronze_07",
    "title_ko": "여주 흔암리·부여 송국리 — 청동기 벼농사와 마을의 증거",
    "people": [],
    "year": -700,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=culture_bronze_07"
  },
  {
    "id": "migration_north_01",
    "title_ko": "부여 — 만주 송화강 유역의 집단",
    "people": [],
    "year": -350,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=migration_north_01"
  },
  {
    "id": "migration_north_02",
    "title_ko": "읍루 — 연해주 숲지대의 수렵 집단",
    "people": [],
    "year": -350,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=migration_north_02"
  },
  {
    "id": "migration_north_03",
    "title_ko": "숙신 — 가장 오래된 기록에 등장하는 만주의 집단",
    "people": [],
    "year": -350,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=migration_north_03"
  },
  {
    "id": "migration_north_05",
    "title_ko": "옥저 — 함경도 동해안의 집단, 민며느리제",
    "people": [],
    "year": -200,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=migration_north_05"
  },
  {
    "id": "migration_north_06",
    "title_ko": "동예 — 강원 동해안의 집단, 무천과 책화",
    "people": [],
    "year": -200,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=migration_north_06"
  },
  {
    "id": "migration_north_04",
    "title_ko": "예맥 — 한반도 북부의 여러 집단",
    "people": [],
    "year": -350,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=migration_north_04"
  },
  {
    "id": "culture_buyeo_01",
    "title_ko": "부여의 건국신화 — 해부루·금와왕·동명왕",
    "people": [
      "해부루",
      "금와왕",
      "동명왕"
    ],
    "year": -200,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=culture_buyeo_01"
  },
  {
    "id": "political_gojoseon_06",
    "title_ko": "『관자』 속의 조선 — 문헌에 처음 등장하다",
    "people": [],
    "year": -300,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=political_gojoseon_06"
  },
  {
    "id": "political_gojoseon_07",
    "title_ko": "조선, 왕을 칭하다 — 연나라와 맞선 조선후",
    "people": [
      "조선후(왕)",
      "대부 예"
    ],
    "year": -320,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=political_gojoseon_07"
  },
  {
    "id": "political_gojoseon_08",
    "title_ko": "진개의 침공 — 서쪽 2천여 리를 잃다",
    "people": [
      "진개"
    ],
    "year": -282,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=political_gojoseon_08"
  },
  {
    "id": "political_gojoseon_09",
    "title_ko": "준왕의 남천 — 고조선과 삼한이 이어지는 순간",
    "people": [
      "준왕",
      "위만"
    ],
    "year": -194,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=political_gojoseon_09"
  },
  {
    "id": "political_jin_01",
    "title_ko": "진국(辰國) — 삼한 이전, 한반도 남부의 정치체",
    "people": [],
    "year": -200,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=political_jin_01"
  },
  {
    "id": "migration_xiongnu_01",
    "title_ko": "흉노 — 초원의 유목제국, 한나라와 각축하다",
    "people": [
      "묵특선우"
    ],
    "year": -209,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=migration_xiongnu_01"
  },
  {
    "id": "political_gojoseon_01",
    "title_ko": "고조선의 성립 — 초기 중심지는 요동이었다",
    "people": [
      "단군왕검"
    ],
    "year": -400,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=political_gojoseon_01"
  },
  {
    "id": "political_gojoseon_02",
    "title_ko": "위만조선 — 철기와 중계무역으로 성장하다",
    "people": [
      "위만",
      "준왕"
    ],
    "year": -194,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=political_gojoseon_02"
  },
  {
    "id": "political_gojoseon_03",
    "title_ko": "고조선 멸망과 한사군 설치",
    "people": [
      "우거왕"
    ],
    "year": -108,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=political_gojoseon_03"
  },
  {
    "id": "political_gojoseon_04",
    "title_ko": "고조선의 8조법 — 사회 질서를 보여주는 세 조항",
    "people": [],
    "year": -200,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=political_gojoseon_04"
  },
  {
    "id": "culture_iron_01",
    "title_ko": "철기의 보급과 독자적 청동기 문화의 발전",
    "people": [],
    "year": -300,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=culture_iron_01"
  },
  {
    "id": "political_gojoseon_05",
    "title_ko": "기자동래설과 기자조선을 둘러싼 논쟁",
    "people": [
      "기자"
    ],
    "year": -1100,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=political_gojoseon_05"
  },
  {
    "id": "culture_literature_01",
    "title_ko": "공무도하가 — 기록에 남은 가장 오래된 노래",
    "people": [
      "여옥",
      "곽리자고"
    ],
    "year": -108,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=culture_literature_01"
  },
  {
    "id": "political_hangun_01",
    "title_ko": "한군현과 토착 사회 — 지배는 정복만큼 쉽지 않았다",
    "people": [],
    "year": -107,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=political_hangun_01"
  },
  {
    "id": "migration_samhan_01",
    "title_ko": "고조선 유민의 남하와 삼한의 형성",
    "people": [],
    "year": -108,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=migration_samhan_01"
  },
  {
    "id": "political_mahan_01",
    "title_ko": "마한 — 목지국을 중심으로 한 54개 소국 연맹",
    "people": [],
    "year": -100,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=political_mahan_01"
  },
  {
    "id": "political_jinhan_01",
    "title_ko": "진한 — 사로국을 중심으로 한 12개 소국 연맹",
    "people": [],
    "year": -100,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=political_jinhan_01"
  },
  {
    "id": "political_byeonhan_01",
    "title_ko": "변한 — 구야국을 중심으로 한 12개 소국 연맹, 철의 나라",
    "people": [],
    "year": -100,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=political_byeonhan_01"
  },
  {
    "id": "culture_iron_02",
    "title_ko": "창원 다호리 유적 — 붓이 말해주는 문자 사용의 흔적",
    "people": [],
    "year": -100,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=culture_iron_02"
  },
  {
    "id": "migration_xianbei_01",
    "title_ko": "선비 — 흉노에 눌려 있던 동호계 집단",
    "people": [],
    "year": -100,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=migration_xianbei_01"
  },
  {
    "id": "political_saro_01",
    "title_ko": "사로국의 등장 — 신라 천 년의 첫 장",
    "people": [
      "혁거세"
    ],
    "year": -57,
    "mapKey": "prehistory",
    "mapLabel": "선사시대",
    "url": "/maps/prehistory/index.html?event=political_saro_01"
  },
  {
    "id": "political_42_01",
    "title_ko": "가야 연맹 건국 — 김수로왕과 구지가",
    "people": [
      "김수로왕",
      "허황옥"
    ],
    "year": 42,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_42_01"
  },
  {
    "id": "political_bc37_01",
    "title_ko": "고구려 건국",
    "people": [
      "주몽"
    ],
    "year": -37,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_bc37_01"
  },
  {
    "id": "political_bc18_01",
    "title_ko": "백제 건국",
    "people": [
      "온조",
      "비류"
    ],
    "year": -18,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_bc18_01"
  },
  {
    "id": "political_bc57_01",
    "title_ko": "신라 건국",
    "people": [
      "박혁거세"
    ],
    "year": -57,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_bc57_01"
  },
  {
    "id": "political_313_01",
    "title_ko": "고구려, 낙랑군을 몰아내다",
    "people": [
      "미천왕"
    ],
    "year": 313,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_313_01"
  },
  {
    "id": "policy_194_01",
    "title_ko": "고국천왕과 진대법 — 부자상속과 빈민구제의 시작",
    "people": [
      "고국천왕",
      "을파소"
    ],
    "year": 194,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=policy_194_01"
  },
  {
    "id": "political_3_01",
    "title_ko": "유리왕과 국내성 천도",
    "people": [
      "유리왕"
    ],
    "year": 3,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_3_01"
  },
  {
    "id": "political_22_01",
    "title_ko": "대무신왕의 정복 — 부여 공격과 낙랑 병합",
    "people": [
      "대무신왕"
    ],
    "year": 22,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_22_01"
  },
  {
    "id": "policy_260_01",
    "title_ko": "고이왕의 체제 정비 — 6좌평제와 16관등제",
    "people": [
      "고이왕"
    ],
    "year": 260,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=policy_260_01"
  },
  {
    "id": "culture_65_01",
    "title_ko": "박·석·김 — 신라 건국설화 속 세 성씨의 시조",
    "people": [
      "석탈해",
      "김알지"
    ],
    "year": 65,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=culture_65_01"
  },
  {
    "id": "culture_literature_02",
    "title_ko": "황조가 — 개인의 감정을 노래하다",
    "people": [
      "유리왕",
      "화희",
      "치희"
    ],
    "year": -17,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=culture_literature_02"
  },
  {
    "id": "political_371_01",
    "title_ko": "근초고왕의 전성기 — 평양성 공격과 마한 통합",
    "people": [
      "근초고왕",
      "고국원왕"
    ],
    "year": 371,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_371_01"
  },
  {
    "id": "political_391_01",
    "title_ko": "광개토대왕 즉위 — 대정복의 시작",
    "people": [
      "광개토대왕"
    ],
    "year": 391,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_391_01"
  },
  {
    "id": "political_427_01",
    "title_ko": "장수왕, 평양으로 천도하다",
    "people": [
      "장수왕"
    ],
    "year": 427,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_427_01"
  },
  {
    "id": "battle_475_01",
    "title_ko": "한성 함락, 개로왕 전사",
    "people": [
      "개로왕",
      "장수왕"
    ],
    "year": 475,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=battle_475_01"
  },
  {
    "id": "policy_372_01",
    "title_ko": "소수림왕의 체제 정비 — 불교·태학·율령",
    "people": [
      "소수림왕",
      "순도"
    ],
    "year": 372,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=policy_372_01"
  },
  {
    "id": "political_356_01",
    "title_ko": "신라 내물왕과 마립간 시대의 시작",
    "people": [
      "내물왕"
    ],
    "year": 356,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_356_01"
  },
  {
    "id": "policy_384_01",
    "title_ko": "백제 침류왕, 불교를 공인하다",
    "people": [
      "침류왕",
      "마라난타"
    ],
    "year": 384,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=policy_384_01"
  },
  {
    "id": "battle_400_01",
    "title_ko": "광개토대왕의 남정 — 호우명그릇이 말해주는 영향력",
    "people": [
      "광개토대왕"
    ],
    "year": 400,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=battle_400_01"
  },
  {
    "id": "policy_400_02",
    "title_ko": "신라의 골품제 — 혈통이 정하는 신분",
    "people": [],
    "year": 400,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=policy_400_02"
  },
  {
    "id": "policy_450_01",
    "title_ko": "신라의 화백회의 — 귀족 합의로 나라를 다스리다",
    "people": [
      "진지왕"
    ],
    "year": 450,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=policy_450_01"
  },
  {
    "id": "political_494_01",
    "title_ko": "문자명왕의 부여 병합",
    "people": [
      "문자명왕"
    ],
    "year": 494,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_494_01"
  },
  {
    "id": "culture_400_01",
    "title_ko": "아직기와 왕인 — 백제 학문의 일본 전파",
    "people": [
      "아직기",
      "왕인"
    ],
    "year": 400,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=culture_400_01"
  },
  {
    "id": "diplomacy_433_01",
    "title_ko": "눌지왕과 나제동맹의 시작",
    "people": [
      "눌지왕"
    ],
    "year": 433,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=diplomacy_433_01"
  },
  {
    "id": "political_418_01",
    "title_ko": "박제상 — 왕제를 구하고 왜에서 순국하다",
    "people": [
      "박제상",
      "눌지왕"
    ],
    "year": 418,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_418_01"
  },
  {
    "id": "political_475_02",
    "title_ko": "백제, 웅진(공주)으로 천도하다",
    "people": [
      "문주왕"
    ],
    "year": 475,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_475_02"
  },
  {
    "id": "policy_500_01",
    "title_ko": "지증왕의 개혁 — 국호·왕호 확정과 우경 실시",
    "people": [
      "지증왕",
      "이사부"
    ],
    "year": 500,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=policy_500_01"
  },
  {
    "id": "policy_517_01",
    "title_ko": "법흥왕의 율령 반포와 불교 공인",
    "people": [
      "법흥왕",
      "이차돈"
    ],
    "year": 517,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=policy_517_01"
  },
  {
    "id": "political_532_01",
    "title_ko": "금관가야, 신라에 병합되다",
    "people": [
      "구형왕",
      "법흥왕"
    ],
    "year": 532,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_532_01"
  },
  {
    "id": "policy_501_01",
    "title_ko": "무령왕의 중흥 — 22담로 설치",
    "people": [
      "무령왕"
    ],
    "year": 501,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=policy_501_01"
  },
  {
    "id": "policy_538_01",
    "title_ko": "성왕, 사비(부여)로 천도하고 국호를 남부여로 고치다",
    "people": [
      "성왕"
    ],
    "year": 538,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=policy_538_01"
  },
  {
    "id": "political_553_01",
    "title_ko": "진흥왕, 한강 유역을 독차지하다",
    "people": [
      "진흥왕"
    ],
    "year": 553,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_553_01"
  },
  {
    "id": "culture_500_01",
    "title_ko": "고구려 고분벽화 — 강서대묘",
    "people": [],
    "year": 500,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=culture_500_01"
  },
  {
    "id": "culture_500_02",
    "title_ko": "고구려 고분벽화 — 무용총·각저총",
    "people": [],
    "year": 500,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=culture_500_02"
  },
  {
    "id": "culture_500_03",
    "title_ko": "신라의 돌무지덧널무덤과 서역 교류",
    "people": [],
    "year": 500,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=culture_500_03"
  },
  {
    "id": "battle_554_01",
    "title_ko": "관산성 전투, 성왕 전사",
    "people": [
      "성왕",
      "진흥왕"
    ],
    "year": 554,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=battle_554_01"
  },
  {
    "id": "battle_612_01",
    "title_ko": "살수대첩 — 을지문덕, 수 양제의 대군을 격파하다",
    "people": [
      "을지문덕",
      "강이식"
    ],
    "year": 612,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=battle_612_01"
  },
  {
    "id": "battle_645_01",
    "title_ko": "안시성 전투 — 양만춘, 당 태종의 침공을 막아내다",
    "people": [
      "양만춘",
      "연개소문",
      "당태종"
    ],
    "year": 645,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=battle_645_01"
  },
  {
    "id": "diplomacy_648_01",
    "title_ko": "김춘추, 당과 동맹을 맺다",
    "people": [
      "김춘추",
      "태종(당)",
      "진덕여왕"
    ],
    "year": 648,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=diplomacy_648_01"
  },
  {
    "id": "battle_660_01",
    "title_ko": "황산벌 전투와 백제 멸망",
    "people": [
      "계백",
      "김유신",
      "의자왕",
      "태종무열왕"
    ],
    "year": 660,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=battle_660_01"
  },
  {
    "id": "political_562_01",
    "title_ko": "대가야의 성장과 멸망",
    "people": [
      "이진아시왕"
    ],
    "year": 562,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_562_01"
  },
  {
    "id": "culture_600_01",
    "title_ko": "백제의 불교 미술 — 미륵사지·서산마애삼존불·칠지도",
    "people": [
      "무왕"
    ],
    "year": 601,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=culture_600_01"
  },
  {
    "id": "culture_632_01",
    "title_ko": "선덕여왕과 첨성대·황룡사 9층 목탑",
    "people": [
      "선덕여왕",
      "자장"
    ],
    "year": 645,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=culture_632_01"
  },
  {
    "id": "plot_642_01",
    "title_ko": "연개소문의 정변과 대당 강경책",
    "people": [
      "연개소문",
      "보장왕",
      "영류왕"
    ],
    "year": 642,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=plot_642_01"
  },
  {
    "id": "culture_610_01",
    "title_ko": "담징 — 고구려 문화의 대외전파",
    "people": [
      "담징"
    ],
    "year": 610,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=culture_610_01"
  },
  {
    "id": "diplomacy_608_01",
    "title_ko": "진평왕과 걸사표 — 수에 군사를 청하다",
    "people": [
      "진평왕",
      "원광"
    ],
    "year": 608,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=diplomacy_608_01"
  },
  {
    "id": "battle_590_01",
    "title_ko": "온달 — 바보 온달, 아단성에서 지다",
    "people": [
      "온달",
      "평강공주"
    ],
    "year": 590,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=battle_590_01"
  },
  {
    "id": "culture_literature_03",
    "title_ko": "정읍사 — 가사가 전하는 유일한 백제 노래",
    "people": [],
    "year": 600,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=culture_literature_03"
  },
  {
    "id": "battle_668_01",
    "title_ko": "고구려 멸망",
    "people": [
      "보장왕",
      "연개소문",
      "연남생",
      "연남건"
    ],
    "year": 668,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=battle_668_01"
  },
  {
    "id": "movement_660_02",
    "title_ko": "백제 부흥운동 — 복신·도침과 백강 전투",
    "people": [
      "복신",
      "도침",
      "흑치상지",
      "부여풍"
    ],
    "year": 660,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=movement_660_02"
  },
  {
    "id": "battle_675_01",
    "title_ko": "매소성·기벌포 전투 — 당군을 몰아내다",
    "people": [
      "문무왕"
    ],
    "year": 675,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=battle_675_01"
  },
  {
    "id": "battle_660_02",
    "title_ko": "계백 — 오천 결사대의 마지막 지휘관",
    "people": [
      "계백",
      "관창"
    ],
    "year": 660,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=battle_660_02"
  },
  {
    "id": "battle_661_01",
    "title_ko": "흑치상지 — 임존성의 부흥군 명장, 당의 장군이 되다",
    "people": [
      "흑치상지",
      "유인궤"
    ],
    "year": 661,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=battle_661_01"
  },
  {
    "id": "political_670_01",
    "title_ko": "검모잠과 안승 — 고구려 부흥의 꿈과 내분",
    "people": [
      "검모잠",
      "안승"
    ],
    "year": 670,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_670_01"
  },
  {
    "id": "culture_692_01",
    "title_ko": "설총 — 이두를 정리하고 화왕계를 짓다",
    "people": [
      "설총",
      "원효",
      "신문왕"
    ],
    "year": 692,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=culture_692_01"
  },
  {
    "id": "political_698_01",
    "title_ko": "발해 건국 — 북쪽의 또 다른 나라",
    "people": [
      "대조영"
    ],
    "year": 698,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_698_01"
  },
  {
    "id": "political_681_01",
    "title_ko": "신문왕, 김흠돌의 난을 진압하고 왕권을 강화하다",
    "people": [
      "신문왕",
      "김흠돌"
    ],
    "year": 681,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_681_01"
  },
  {
    "id": "culture_686_01",
    "title_ko": "원효와 의상 — 통일신라 불교 사상의 정립",
    "people": [
      "원효",
      "의상"
    ],
    "year": 686,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=culture_686_01"
  },
  {
    "id": "political_719_01",
    "title_ko": "발해 무왕의 팽창 — 산둥반도 공격",
    "people": [
      "무왕",
      "대문예"
    ],
    "year": 719,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_719_01"
  },
  {
    "id": "policy_756_01",
    "title_ko": "발해 문왕의 체제 정비 — 상경 천도와 주자감 설치",
    "people": [
      "문왕"
    ],
    "year": 756,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=policy_756_01"
  },
  {
    "id": "culture_751_01",
    "title_ko": "불국사·석굴암 창건",
    "people": [
      "김대성",
      "경덕왕"
    ],
    "year": 751,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=culture_751_01"
  },
  {
    "id": "policy_722_01",
    "title_ko": "성덕왕, 정전을 지급하다",
    "people": [
      "성덕왕"
    ],
    "year": 722,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=policy_722_01"
  },
  {
    "id": "political_818_01",
    "title_ko": "발해 선왕의 전성기 — 해동성국",
    "people": [
      "선왕",
      "대인수"
    ],
    "year": 818,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_818_01"
  },
  {
    "id": "policy_685_01",
    "title_ko": "신문왕의 왕권강화 — 9주 5소경과 녹읍 폐지",
    "people": [
      "신문왕"
    ],
    "year": 685,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=policy_685_01"
  },
  {
    "id": "policy_819_01",
    "title_ko": "발해의 통치체제 — 3성 6부와 독자성",
    "people": [],
    "year": 819,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=policy_819_01"
  },
  {
    "id": "culture_727_01",
    "title_ko": "혜초와 왕오천축국전",
    "people": [
      "혜초"
    ],
    "year": 727,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=culture_727_01"
  },
  {
    "id": "culture_750_01",
    "title_ko": "김생 — 해동서성, 신라의 붓이 경지에 오르다",
    "people": [
      "김생"
    ],
    "year": 750,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=culture_750_01"
  },
  {
    "id": "culture_hyangga_01",
    "title_ko": "서동요 — 현존 최고(最古)의 향가",
    "people": [
      "무왕",
      "선화공주"
    ],
    "year": 600,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=culture_hyangga_01"
  },
  {
    "id": "culture_hyangga_02",
    "title_ko": "헌화가와 해가 — 수로부인 설화",
    "people": [
      "수로부인",
      "견우노옹",
      "순정공"
    ],
    "year": 720,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=culture_hyangga_02"
  },
  {
    "id": "culture_hyangga_03",
    "title_ko": "월명사와 제망매가 — 향가 문학의 정점",
    "people": [
      "월명사"
    ],
    "year": 760,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=culture_hyangga_03"
  },
  {
    "id": "culture_hyangga_04",
    "title_ko": "충담사 — 찬기파랑가와 안민가",
    "people": [
      "충담사",
      "경덕왕",
      "기파랑"
    ],
    "year": 765,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=culture_hyangga_04"
  },
  {
    "id": "culture_hyangga_05",
    "title_ko": "처용 설화 — 개운포의 노래",
    "people": [
      "처용",
      "헌강왕"
    ],
    "year": 879,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=culture_hyangga_05"
  },
  {
    "id": "economic_828_01",
    "title_ko": "장보고, 청해진을 설치하다",
    "people": [
      "장보고"
    ],
    "year": 828,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=economic_828_01"
  },
  {
    "id": "plot_846_01",
    "title_ko": "장보고 피살과 왕위쟁탈전",
    "people": [
      "장보고",
      "문성왕"
    ],
    "year": 846,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=plot_846_01"
  },
  {
    "id": "culture_885_01",
    "title_ko": "최치원, 시무10조를 올리다",
    "people": [
      "최치원",
      "진성여왕"
    ],
    "year": 885,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=culture_885_01"
  },
  {
    "id": "movement_889_01",
    "title_ko": "원종·애노의 난 — 농민 봉기의 시작",
    "people": [
      "원종",
      "애노",
      "진성여왕"
    ],
    "year": 889,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=movement_889_01"
  },
  {
    "id": "culture_hanmun_01",
    "title_ko": "최치원 — 한국 한문학의 출발",
    "people": [
      "최치원",
      "최승로"
    ],
    "year": 885,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=culture_hanmun_01"
  },
  {
    "id": "political_900_01",
    "title_ko": "견훤, 후백제를 세우다",
    "people": [
      "견훤"
    ],
    "year": 900,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_900_01"
  },
  {
    "id": "political_901_01",
    "title_ko": "궁예, 태봉(후고구려)을 세우다",
    "people": [
      "궁예",
      "왕건"
    ],
    "year": 901,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_901_01"
  },
  {
    "id": "political_926_01",
    "title_ko": "발해 멸망",
    "people": [
      "대인선"
    ],
    "year": 926,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_926_01"
  },
  {
    "id": "battle_927_01",
    "title_ko": "공산 전투 — 견훤, 왕건을 크게 격파하다",
    "people": [
      "견훤",
      "왕건",
      "신숭겸"
    ],
    "year": 927,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=battle_927_01"
  },
  {
    "id": "battle_930_01",
    "title_ko": "고창 전투 — 전세를 뒤집다",
    "people": [
      "왕건",
      "견훤"
    ],
    "year": 930,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=battle_930_01"
  },
  {
    "id": "political_935_01",
    "title_ko": "신라, 고려에 항복하다",
    "people": [
      "경순왕",
      "왕건"
    ],
    "year": 935,
    "mapKey": "ancient",
    "mapLabel": "고대",
    "url": "/maps/ancient/index.html?event=political_935_01"
  },
  {
    "id": "political_0918_01",
    "title_ko": "고려 건국 — 왕건 즉위",
    "people": [
      "왕건",
      "배현경",
      "복지겸",
      "홍유",
      "신숭겸"
    ],
    "year": 918,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_0918_01"
  },
  {
    "id": "political_0936_01",
    "title_ko": "후삼국 통일",
    "people": [
      "왕건",
      "견훤"
    ],
    "year": 936,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_0936_01"
  },
  {
    "id": "culture_0943_01",
    "title_ko": "훈요십조를 남기다",
    "people": [
      "왕건"
    ],
    "year": 943,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_0943_01"
  },
  {
    "id": "policy_0940_01",
    "title_ko": "역분전 지급 — 고려 최초의 토지제도",
    "people": [
      "왕건"
    ],
    "year": 940,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_0940_01"
  },
  {
    "id": "political_0943_01",
    "title_ko": "혜종 즉위",
    "people": [
      "혜종",
      "왕건"
    ],
    "year": 943,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_0943_01"
  },
  {
    "id": "plot_0945_01",
    "title_ko": "왕규의 난",
    "people": [
      "왕규",
      "혜종",
      "정종"
    ],
    "year": 945,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=plot_0945_01"
  },
  {
    "id": "political_0945_02",
    "title_ko": "정종 즉위",
    "people": [
      "정종",
      "왕식렴"
    ],
    "year": 945,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_0945_02"
  },
  {
    "id": "policy_0947_01",
    "title_ko": "광군 설치",
    "people": [
      "정종"
    ],
    "year": 947,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_0947_01"
  },
  {
    "id": "policy_0949_01",
    "title_ko": "서경 천도 추진과 좌절",
    "people": [
      "정종"
    ],
    "year": 949,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_0949_01"
  },
  {
    "id": "policy_0956_01",
    "title_ko": "노비안검법 시행",
    "people": [
      "광종"
    ],
    "year": 956,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_0956_01"
  },
  {
    "id": "policy_0958_01",
    "title_ko": "과거제 시행",
    "people": [
      "광종",
      "쌍기"
    ],
    "year": 958,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_0958_01"
  },
  {
    "id": "political_0960_01",
    "title_ko": "칭제건원과 공신 세력 숙청",
    "people": [
      "광종"
    ],
    "year": 960,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_0960_01"
  },
  {
    "id": "political_0975_01",
    "title_ko": "경종 즉위",
    "people": [
      "경종",
      "광종"
    ],
    "year": 975,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_0975_01"
  },
  {
    "id": "economic_0976_01",
    "title_ko": "전시과 제정(시정전시과)",
    "people": [
      "경종"
    ],
    "year": 976,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=economic_0976_01"
  },
  {
    "id": "political_0981_01",
    "title_ko": "성종 즉위",
    "people": [
      "성종"
    ],
    "year": 981,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_0981_01"
  },
  {
    "id": "policy_0982_01",
    "title_ko": "최승로의 시무28조 채택",
    "people": [
      "성종",
      "최승로"
    ],
    "year": 982,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_0982_01"
  },
  {
    "id": "policy_0983_01",
    "title_ko": "12목 설치 — 지방관 파견 시작",
    "people": [
      "성종"
    ],
    "year": 983,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_0983_01"
  },
  {
    "id": "policy_0992_01",
    "title_ko": "국자감 설치",
    "people": [
      "성종"
    ],
    "year": 992,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_0992_01"
  },
  {
    "id": "battle_0993_01",
    "title_ko": "거란 1차 침입과 서희의 담판",
    "people": [
      "서희",
      "소손녕",
      "성종"
    ],
    "year": 993,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=battle_0993_01"
  },
  {
    "id": "policy_0995_01",
    "title_ko": "2성6부제 정비",
    "people": [
      "성종"
    ],
    "year": 995,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_0995_01"
  },
  {
    "id": "policy_0993_02",
    "title_ko": "성종의 사회·경제 정책 — 의창·상평창과 건원중보",
    "people": [
      "성종"
    ],
    "year": 993,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_0993_02"
  },
  {
    "id": "policy_0996_02",
    "title_ko": "도병마사와 식목도감 — 고려만의 독자적 회의기구",
    "people": [],
    "year": 996,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_0996_02"
  },
  {
    "id": "policy_0996_03",
    "title_ko": "대간(대성) — 낭사와 어사대의 왕권 견제",
    "people": [],
    "year": 996,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_0996_03"
  },
  {
    "id": "policy_0996_04",
    "title_ko": "2군 6위와 주현군·주진군 — 고려의 군사제도",
    "people": [],
    "year": 996,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_0996_04"
  },
  {
    "id": "political_0997_01",
    "title_ko": "목종 즉위와 천추태후의 섭정",
    "people": [
      "목종",
      "천추태후"
    ],
    "year": 997,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_0997_01"
  },
  {
    "id": "economic_0998_01",
    "title_ko": "목종의 개정전시과",
    "people": [
      "목종"
    ],
    "year": 998,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=economic_0998_01"
  },
  {
    "id": "plot_1009_01",
    "title_ko": "강조의 정변",
    "people": [
      "강조",
      "목종",
      "현종"
    ],
    "year": 1009,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=plot_1009_01"
  },
  {
    "id": "political_1009_02",
    "title_ko": "현종 즉위",
    "people": [
      "현종",
      "강조"
    ],
    "year": 1009,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1009_02"
  },
  {
    "id": "battle_1010_01",
    "title_ko": "거란 2차 침입과 나주 피난",
    "people": [
      "현종",
      "강조"
    ],
    "year": 1010,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=battle_1010_01"
  },
  {
    "id": "battle_1018_01",
    "title_ko": "거란 3차 침입과 귀주대첩",
    "people": [
      "강감찬",
      "현종"
    ],
    "year": 1018,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=battle_1018_01"
  },
  {
    "id": "culture_1011_01",
    "title_ko": "초조대장경 조판 시작",
    "people": [
      "현종"
    ],
    "year": 1011,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_1011_01"
  },
  {
    "id": "policy_1029_01",
    "title_ko": "개경 나성 축조",
    "people": [
      "현종"
    ],
    "year": 1029,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_1029_01"
  },
  {
    "id": "battle_1011_01",
    "title_ko": "양규 — 흥화진의 사수, 포로 3만을 구하고 지다",
    "people": [
      "양규",
      "김숙흥"
    ],
    "year": 1011,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=battle_1011_01"
  },
  {
    "id": "political_1011_01",
    "title_ko": "하공진 — 스스로 인질이 되어 왕을 구하다",
    "people": [
      "하공진",
      "현종"
    ],
    "year": 1011,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1011_01"
  },
  {
    "id": "political_1031_01",
    "title_ko": "덕종 즉위",
    "people": [
      "덕종",
      "현종"
    ],
    "year": 1031,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1031_01"
  },
  {
    "id": "policy_1033_01",
    "title_ko": "천리장성 축조 시작",
    "people": [
      "덕종",
      "유소"
    ],
    "year": 1033,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_1033_01"
  },
  {
    "id": "political_1034_01",
    "title_ko": "정종(靖宗) 즉위",
    "people": [
      "정종",
      "덕종"
    ],
    "year": 1034,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1034_01"
  },
  {
    "id": "policy_1044_01",
    "title_ko": "천리장성 완성",
    "people": [
      "정종"
    ],
    "year": 1044,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_1044_01"
  },
  {
    "id": "political_1046_01",
    "title_ko": "문종 즉위",
    "people": [
      "문종",
      "정종"
    ],
    "year": 1046,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1046_01"
  },
  {
    "id": "economic_1076_01",
    "title_ko": "경정전시과 개정",
    "people": [
      "문종"
    ],
    "year": 1076,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=economic_1076_01"
  },
  {
    "id": "culture_1067_01",
    "title_ko": "흥왕사 창건",
    "people": [
      "문종"
    ],
    "year": 1067,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_1067_01"
  },
  {
    "id": "policy_1069_01",
    "title_ko": "양전보수법 시행",
    "people": [
      "문종"
    ],
    "year": 1069,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_1069_01"
  },
  {
    "id": "diplomacy_1071_01",
    "title_ko": "송과의 국교 재개",
    "people": [
      "문종"
    ],
    "year": 1071,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=diplomacy_1071_01"
  },
  {
    "id": "policy_1076_02",
    "title_ko": "관제 정비 완성 — 문산계·무산계 체계화",
    "people": [
      "문종"
    ],
    "year": 1076,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_1076_02"
  },
  {
    "id": "culture_1055_01",
    "title_ko": "최충의 9재학당과 사학 12도",
    "people": [
      "최충"
    ],
    "year": 1055,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_1055_01"
  },
  {
    "id": "policy_1050_01",
    "title_ko": "고려의 신분제 — 양천제와 중류층, 향·부곡·소",
    "people": [],
    "year": 1050,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_1050_01"
  },
  {
    "id": "culture_1050_02",
    "title_ko": "고려 여성의 지위 — 균분상속과 남귀여가혼",
    "people": [],
    "year": 1050,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_1050_02"
  },
  {
    "id": "political_1083_01",
    "title_ko": "순종 즉위와 3개월 만의 죽음",
    "people": [
      "순종",
      "문종"
    ],
    "year": 1083,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1083_01"
  },
  {
    "id": "political_1083_02",
    "title_ko": "선종 즉위",
    "people": [
      "선종",
      "순종"
    ],
    "year": 1083,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1083_02"
  },
  {
    "id": "culture_1091_01",
    "title_ko": "교장(속장경) 편찬 — 대각국사 의천",
    "people": [
      "의천",
      "선종"
    ],
    "year": 1091,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_1091_01"
  },
  {
    "id": "political_1094_01",
    "title_ko": "선종의 죽음과 어린 헌종의 즉위",
    "people": [
      "선종",
      "헌종"
    ],
    "year": 1094,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1094_01"
  },
  {
    "id": "plot_1095_01",
    "title_ko": "이자의의 난과 헌종 폐위",
    "people": [
      "이자의",
      "계림공",
      "헌종"
    ],
    "year": 1095,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=plot_1095_01"
  },
  {
    "id": "political_1095_02",
    "title_ko": "숙종 즉위",
    "people": [
      "숙종",
      "헌종"
    ],
    "year": 1095,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1095_02"
  },
  {
    "id": "economic_1102_01",
    "title_ko": "해동통보 주조",
    "people": [
      "숙종",
      "의천"
    ],
    "year": 1102,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=economic_1102_01"
  },
  {
    "id": "policy_1104_01",
    "title_ko": "남경(한양) 설치",
    "people": [
      "숙종"
    ],
    "year": 1104,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_1104_01"
  },
  {
    "id": "policy_1104_02",
    "title_ko": "별무반 창설",
    "people": [
      "숙종",
      "윤관"
    ],
    "year": 1104,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_1104_02"
  },
  {
    "id": "culture_1101_01",
    "title_ko": "대각국사 의천의 죽음",
    "people": [
      "의천",
      "숙종"
    ],
    "year": 1101,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_1101_01"
  },
  {
    "id": "economic_1100_01",
    "title_ko": "벽란도와 국제무역 — 코리아라는 이름의 유래",
    "people": [],
    "year": 1100,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=economic_1100_01"
  },
  {
    "id": "political_1105_01",
    "title_ko": "예종 즉위",
    "people": [
      "예종",
      "숙종"
    ],
    "year": 1105,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1105_01"
  },
  {
    "id": "battle_1107_01",
    "title_ko": "여진 정벌과 동북 9성 개척",
    "people": [
      "윤관",
      "예종"
    ],
    "year": 1107,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=battle_1107_01"
  },
  {
    "id": "policy_1109_01",
    "title_ko": "동북 9성 반환",
    "people": [
      "예종",
      "윤관"
    ],
    "year": 1109,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_1109_01"
  },
  {
    "id": "policy_1109_02",
    "title_ko": "국학(국자감) 진흥 — 7재 설치",
    "people": [
      "예종"
    ],
    "year": 1109,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_1109_02"
  },
  {
    "id": "policy_1109_03",
    "title_ko": "구제도감 설치",
    "people": [
      "예종"
    ],
    "year": 1109,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_1109_03"
  },
  {
    "id": "political_1122_01",
    "title_ko": "인종 즉위와 이자겸의 전횡",
    "people": [
      "인종",
      "이자겸"
    ],
    "year": 1122,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1122_01"
  },
  {
    "id": "plot_1126_01",
    "title_ko": "이자겸의 난",
    "people": [
      "이자겸",
      "척준경",
      "인종"
    ],
    "year": 1126,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=plot_1126_01"
  },
  {
    "id": "movement_1135_01",
    "title_ko": "묘청의 서경천도운동(묘청의 난)",
    "people": [
      "묘청",
      "김부식",
      "인종"
    ],
    "year": 1135,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=movement_1135_01"
  },
  {
    "id": "diplomacy_1126_02",
    "title_ko": "금에 대한 사대 외교 채택",
    "people": [
      "이자겸"
    ],
    "year": 1126,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=diplomacy_1126_02"
  },
  {
    "id": "culture_1145_01",
    "title_ko": "삼국사기 편찬",
    "people": [
      "김부식",
      "인종"
    ],
    "year": 1145,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_1145_01"
  },
  {
    "id": "plot_1126_02",
    "title_ko": "척준경 — 고려 최강의 무인, 두 번 역사를 바꾸다",
    "people": [
      "척준경",
      "이자겸",
      "인종"
    ],
    "year": 1126,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=plot_1126_02"
  },
  {
    "id": "political_1146_01",
    "title_ko": "의종 즉위",
    "people": [
      "의종",
      "인종"
    ],
    "year": 1146,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1146_01"
  },
  {
    "id": "culture_1157_01",
    "title_ko": "문신 우대와 잦은 연회·유흥",
    "people": [
      "의종"
    ],
    "year": 1157,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_1157_01"
  },
  {
    "id": "plot_1170_02",
    "title_ko": "보현원 사건 — 무신정변의 도화선",
    "people": [
      "의종",
      "정중부",
      "이의방"
    ],
    "year": 1170,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=plot_1170_02"
  },
  {
    "id": "culture_1150_01",
    "title_ko": "고려청자의 발달 — 순청자에서 상감청자로",
    "people": [],
    "year": 1150,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_1150_01"
  },
  {
    "id": "plot_1170_01",
    "title_ko": "무신정변 — 정중부의 난",
    "people": [
      "의종",
      "정중부"
    ],
    "year": 1170,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=plot_1170_01"
  },
  {
    "id": "battle_1174_01",
    "title_ko": "조위총의 난",
    "people": [
      "조위총",
      "정중부"
    ],
    "year": 1174,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=battle_1174_01"
  },
  {
    "id": "movement_1176_01",
    "title_ko": "망이·망소이의 난",
    "people": [
      "망이",
      "망소이"
    ],
    "year": 1176,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=movement_1176_01"
  },
  {
    "id": "plot_1179_01",
    "title_ko": "경대승의 집권과 도방 설치",
    "people": [
      "경대승",
      "정중부"
    ],
    "year": 1179,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=plot_1179_01"
  },
  {
    "id": "culture_1193_01",
    "title_ko": "이규보 — 동명왕편, 무신의 시대에 서사시를 쓰다",
    "people": [
      "이규보",
      "최충헌"
    ],
    "year": 1193,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_1193_01"
  },
  {
    "id": "plot_1196_01",
    "title_ko": "최충헌의 집권 — 이의민 제거",
    "people": [
      "최충헌",
      "이의민"
    ],
    "year": 1196,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=plot_1196_01"
  },
  {
    "id": "movement_1198_01",
    "title_ko": "만적의 난 — 노비해방운동",
    "people": [
      "만적",
      "최충헌"
    ],
    "year": 1198,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=movement_1198_01"
  },
  {
    "id": "political_1197_01",
    "title_ko": "신종 즉위",
    "people": [
      "신종",
      "최충헌"
    ],
    "year": 1197,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1197_01"
  },
  {
    "id": "culture_1200_01",
    "title_ko": "무신집권기의 불교 결사운동 — 수선사와 백련사",
    "people": [
      "지눌",
      "요세"
    ],
    "year": 1200,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_1200_01"
  },
  {
    "id": "culture_1200_02",
    "title_ko": "지눌 — 정혜결사, 타락한 불교를 산으로 데려가다",
    "people": [
      "지눌"
    ],
    "year": 1200,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_1200_02"
  },
  {
    "id": "political_1204_01",
    "title_ko": "희종 즉위",
    "people": [
      "희종",
      "최충헌"
    ],
    "year": 1204,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1204_01"
  },
  {
    "id": "plot_1211_01",
    "title_ko": "희종의 최충헌 암살 시도와 폐위",
    "people": [
      "희종",
      "최충헌"
    ],
    "year": 1211,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=plot_1211_01"
  },
  {
    "id": "political_1211_02",
    "title_ko": "강종 즉위",
    "people": [
      "강종",
      "최충헌"
    ],
    "year": 1211,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1211_02"
  },
  {
    "id": "battle_1218_01",
    "title_ko": "강동성 전투 — 김취려와 몽골의 첫 접촉",
    "people": [
      "김취려"
    ],
    "year": 1218,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=battle_1218_01"
  },
  {
    "id": "plot_1219_01",
    "title_ko": "최우 집권",
    "people": [
      "최우",
      "최충헌"
    ],
    "year": 1219,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=plot_1219_01"
  },
  {
    "id": "battle_1231_01",
    "title_ko": "몽골의 1차 침입",
    "people": [
      "고종",
      "최우"
    ],
    "year": 1231,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=battle_1231_01"
  },
  {
    "id": "policy_1232_01",
    "title_ko": "강화 천도",
    "people": [
      "최우",
      "고종"
    ],
    "year": 1232,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_1232_01"
  },
  {
    "id": "battle_1232_02",
    "title_ko": "처인성 전투 — 살리타 사살",
    "people": [
      "김윤후"
    ],
    "year": 1232,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=battle_1232_02"
  },
  {
    "id": "culture_1236_01",
    "title_ko": "팔만대장경(재조대장경) 조판",
    "people": [
      "최우",
      "고종"
    ],
    "year": 1236,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_1236_01"
  },
  {
    "id": "organization_1232_03",
    "title_ko": "삼별초 창설",
    "people": [
      "최우"
    ],
    "year": 1232,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=organization_1232_03"
  },
  {
    "id": "culture_goryeosong_05",
    "title_ko": "한림별곡 — 경기체가의 시작",
    "people": [
      "이규보",
      "이인로",
      "금의"
    ],
    "year": 1216,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_goryeosong_05"
  },
  {
    "id": "culture_hanmun_02",
    "title_ko": "이규보와 동명왕편 — 고려 한문학",
    "people": [
      "이규보",
      "이인로",
      "이제현"
    ],
    "year": 1193,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_hanmun_02"
  },
  {
    "id": "diplomacy_1259_01",
    "title_ko": "몽골과의 강화 성립",
    "people": [
      "원종",
      "쿠빌라이"
    ],
    "year": 1259,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=diplomacy_1259_01"
  },
  {
    "id": "political_1259_02",
    "title_ko": "원종 즉위와 무신정권의 쇠퇴",
    "people": [
      "원종",
      "김준"
    ],
    "year": 1259,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1259_02"
  },
  {
    "id": "policy_1270_01",
    "title_ko": "개경 환도",
    "people": [
      "원종"
    ],
    "year": 1270,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_1270_01"
  },
  {
    "id": "battle_1270_02",
    "title_ko": "삼별초의 난",
    "people": [
      "배중손",
      "김통정"
    ],
    "year": 1270,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=battle_1270_02"
  },
  {
    "id": "political_1274_01",
    "title_ko": "충렬왕 즉위 — 원의 부마국화",
    "people": [
      "충렬왕",
      "쿠빌라이"
    ],
    "year": 1274,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1274_01"
  },
  {
    "id": "battle_1274_02",
    "title_ko": "제1차 일본 원정",
    "people": [
      "충렬왕"
    ],
    "year": 1274,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=battle_1274_02"
  },
  {
    "id": "organization_1280_01",
    "title_ko": "정동행성 설치",
    "people": [
      "충렬왕"
    ],
    "year": 1280,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=organization_1280_01"
  },
  {
    "id": "battle_1281_01",
    "title_ko": "제2차 일본 원정",
    "people": [
      "충렬왕"
    ],
    "year": 1281,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=battle_1281_01"
  },
  {
    "id": "movement_1285_01",
    "title_ko": "몽골풍의 유행 — 변발·호복",
    "people": [
      "충렬왕"
    ],
    "year": 1285,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=movement_1285_01"
  },
  {
    "id": "policy_1275_01",
    "title_ko": "응방 설치와 폐해",
    "people": [
      "충렬왕"
    ],
    "year": 1275,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_1275_01"
  },
  {
    "id": "culture_1281_01",
    "title_ko": "무신·원간섭기의 자주적 역사서술 — 동명왕편·삼국유사·제왕운기",
    "people": [
      "이규보",
      "일연",
      "이승휴"
    ],
    "year": 1281,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_1281_01"
  },
  {
    "id": "culture_1290_01",
    "title_ko": "안향, 고려에 성리학을 처음 소개하다",
    "people": [
      "안향"
    ],
    "year": 1290,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_1290_01"
  },
  {
    "id": "culture_goryeosong_01",
    "title_ko": "고려가요 — 민간의 노래가 궁중으로",
    "people": [],
    "year": 1280,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_goryeosong_01"
  },
  {
    "id": "culture_goryeosong_02",
    "title_ko": "청산별곡 — 밀려난 사람들의 노래",
    "people": [],
    "year": 1280,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_goryeosong_02"
  },
  {
    "id": "culture_goryeosong_03",
    "title_ko": "서경별곡 — 대동강의 이별",
    "people": [],
    "year": 1280,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_goryeosong_03"
  },
  {
    "id": "culture_goryeosong_04",
    "title_ko": "동동 — 현전 최고(最古)의 월령체 노래",
    "people": [],
    "year": 1280,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_goryeosong_04"
  },
  {
    "id": "policy_1298_01",
    "title_ko": "충선왕 즉위와 개혁 시도(1차)",
    "people": [
      "충선왕",
      "충렬왕"
    ],
    "year": 1298,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_1298_01"
  },
  {
    "id": "policy_1308_01",
    "title_ko": "충선왕 복위와 전민변정 재추진",
    "people": [
      "충선왕"
    ],
    "year": 1308,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_1308_01"
  },
  {
    "id": "culture_1314_01",
    "title_ko": "만권당 설치 — 원-고려 학술 교류",
    "people": [
      "충선왕",
      "이제현"
    ],
    "year": 1314,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_1314_01"
  },
  {
    "id": "culture_1314_02",
    "title_ko": "이제현 — 만권당의 유학자, 원 제국 한복판의 고려 지성",
    "people": [
      "이제현",
      "충선왕"
    ],
    "year": 1314,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_1314_02"
  },
  {
    "id": "political_1313_01",
    "title_ko": "충숙왕 즉위와 심왕 옹립 책동",
    "people": [
      "충숙왕",
      "왕고"
    ],
    "year": 1313,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1313_01"
  },
  {
    "id": "political_1339_01",
    "title_ko": "충숙왕의 죽음",
    "people": [
      "충숙왕",
      "충혜왕"
    ],
    "year": 1339,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1339_01"
  },
  {
    "id": "political_1330_01",
    "title_ko": "충혜왕 즉위와 방탕한 행실",
    "people": [
      "충혜왕",
      "충숙왕"
    ],
    "year": 1330,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1330_01"
  },
  {
    "id": "political_1343_01",
    "title_ko": "충혜왕의 원 소환과 유배 중 죽음",
    "people": [
      "충혜왕"
    ],
    "year": 1343,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1343_01"
  },
  {
    "id": "political_1344_01",
    "title_ko": "충목왕 즉위 — 8세의 어린 왕",
    "people": [
      "충목왕",
      "충혜왕"
    ],
    "year": 1344,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1344_01"
  },
  {
    "id": "policy_1347_01",
    "title_ko": "정치도감 설치 — 폐정 개혁 시도",
    "people": [
      "충목왕",
      "왕후"
    ],
    "year": 1347,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_1347_01"
  },
  {
    "id": "political_1349_01",
    "title_ko": "충정왕 즉위",
    "people": [
      "충정왕",
      "충목왕"
    ],
    "year": 1349,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1349_01"
  },
  {
    "id": "battle_1350_01",
    "title_ko": "왜구 침입의 본격화(경인년 왜구)",
    "people": [
      "충정왕"
    ],
    "year": 1350,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=battle_1350_01"
  },
  {
    "id": "political_1351_01",
    "title_ko": "충정왕 폐위와 공민왕 즉위",
    "people": [
      "충정왕",
      "공민왕"
    ],
    "year": 1351,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1351_01"
  },
  {
    "id": "political_1356_01",
    "title_ko": "공민왕의 반원 개혁",
    "people": [
      "공민왕"
    ],
    "year": 1356,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1356_01"
  },
  {
    "id": "policy_1365_01",
    "title_ko": "신돈의 등용과 전민변정도감",
    "people": [
      "공민왕",
      "신돈"
    ],
    "year": 1365,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_1365_01"
  },
  {
    "id": "plot_1374_01",
    "title_ko": "공민왕의 시해",
    "people": [
      "공민왕",
      "홍륜"
    ],
    "year": 1374,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=plot_1374_01"
  },
  {
    "id": "battle_1361_01",
    "title_ko": "홍건적의 침입 — 개경 함락과 공민왕의 몽진",
    "people": [
      "공민왕",
      "정세운",
      "안우",
      "이방실",
      "최영",
      "이성계"
    ],
    "year": 1361,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=battle_1361_01"
  },
  {
    "id": "economic_1363_01",
    "title_ko": "문익점의 목화 전래",
    "people": [
      "문익점",
      "정천익"
    ],
    "year": 1363,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=economic_1363_01"
  },
  {
    "id": "political_1374_02",
    "title_ko": "우왕 즉위",
    "people": [
      "우왕",
      "이인임"
    ],
    "year": 1374,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1374_02"
  },
  {
    "id": "battle_1376_01",
    "title_ko": "최영의 홍산대첩",
    "people": [
      "최영"
    ],
    "year": 1376,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=battle_1376_01"
  },
  {
    "id": "science_1380_02",
    "title_ko": "최무선의 화약 무기 개발과 진포대첩",
    "people": [
      "최무선"
    ],
    "year": 1380,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=science_1380_02"
  },
  {
    "id": "battle_1380_01",
    "title_ko": "이성계의 황산대첩",
    "people": [
      "이성계"
    ],
    "year": 1380,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=battle_1380_01"
  },
  {
    "id": "political_1388_01",
    "title_ko": "명의 철령위 설치 통보와 요동정벌 결정",
    "people": [
      "최영",
      "우왕"
    ],
    "year": 1388,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1388_01"
  },
  {
    "id": "plot_1388_02",
    "title_ko": "위화도 회군",
    "people": [
      "이성계",
      "최영",
      "우왕"
    ],
    "year": 1388,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=plot_1388_02"
  },
  {
    "id": "culture_1377_01",
    "title_ko": "직지심체요절 — 세계 최고(最古)의 금속활자본",
    "people": [],
    "year": 1377,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_1377_01"
  },
  {
    "id": "political_1388_03",
    "title_ko": "창왕 즉위",
    "people": [
      "창왕",
      "이성계",
      "우왕"
    ],
    "year": 1388,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1388_03"
  },
  {
    "id": "policy_1388_04",
    "title_ko": "전제개혁 논의 — 사전 혁파 주장",
    "people": [
      "조준",
      "정도전"
    ],
    "year": 1388,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_1388_04"
  },
  {
    "id": "plot_1389_01",
    "title_ko": "창왕 폐위 — 폐가입진",
    "people": [
      "이성계",
      "창왕",
      "공양왕"
    ],
    "year": 1389,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=plot_1389_01"
  },
  {
    "id": "battle_1389_01",
    "title_ko": "박위 — 쓰시마를 치다, 왜구의 소굴 정벌",
    "people": [
      "박위"
    ],
    "year": 1389,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=battle_1389_01"
  },
  {
    "id": "policy_1391_01",
    "title_ko": "과전법 실시",
    "people": [
      "조준",
      "정도전",
      "공양왕"
    ],
    "year": 1391,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=policy_1391_01"
  },
  {
    "id": "plot_1392_04",
    "title_ko": "정몽주, 선죽교에서 피살되다",
    "people": [
      "정몽주",
      "이방원"
    ],
    "year": 1392,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=plot_1392_04"
  },
  {
    "id": "political_1392_03",
    "title_ko": "고려 멸망",
    "people": [
      "공양왕",
      "이성계",
      "정몽주"
    ],
    "year": 1392,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=political_1392_03"
  },
  {
    "id": "culture_1390_01",
    "title_ko": "길재 — 두 왕조를 섬기지 않은 마지막 고려인",
    "people": [
      "길재",
      "정몽주"
    ],
    "year": 1390,
    "mapKey": "medieval1",
    "mapLabel": "중세1 (고려)",
    "url": "/maps/medieval1/index.html?event=culture_1390_01"
  },
  {
    "id": "political_1392_01",
    "title_ko": "조선 건국 — 이성계 즉위",
    "people": [
      "이성계"
    ],
    "year": 1392,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1392_01"
  },
  {
    "id": "economic_1392_02",
    "title_ko": "한양 천도",
    "people": [
      "이성계",
      "정도전"
    ],
    "year": 1394,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=economic_1392_02"
  },
  {
    "id": "political_1394_02",
    "title_ko": "정도전의 재상중심 정치사상과 요동정벌 추진",
    "people": [
      "정도전",
      "태조"
    ],
    "year": 1394,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1394_02"
  },
  {
    "id": "policy_1396_01",
    "title_ko": "한양 도성 축조 — 4대문과 경복궁",
    "people": [
      "정도전",
      "태조"
    ],
    "year": 1396,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1396_01"
  },
  {
    "id": "plot_1398_01",
    "title_ko": "제1차 왕자의 난",
    "people": [
      "이방원",
      "정도전",
      "이방석"
    ],
    "year": 1398,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=plot_1398_01"
  },
  {
    "id": "policy_1399_01",
    "title_ko": "개경 환도",
    "people": [
      "정종"
    ],
    "year": 1399,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1399_01"
  },
  {
    "id": "plot_1400_01",
    "title_ko": "제2차 왕자의 난(방간의 난)과 태종의 세자 책봉",
    "people": [
      "이방원",
      "이방간",
      "정종"
    ],
    "year": 1400,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=plot_1400_01"
  },
  {
    "id": "political_1400_01",
    "title_ko": "태종 즉위",
    "people": [
      "태종",
      "정종"
    ],
    "year": 1400,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1400_01"
  },
  {
    "id": "policy_1400_02",
    "title_ko": "사병 혁파",
    "people": [
      "태종"
    ],
    "year": 1400,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1400_02"
  },
  {
    "id": "economic_1402_01",
    "title_ko": "저화(지폐) 발행",
    "people": [
      "태종"
    ],
    "year": 1402,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=economic_1402_01"
  },
  {
    "id": "policy_1401_01",
    "title_ko": "신문고 설치",
    "people": [
      "태종"
    ],
    "year": 1401,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1401_01"
  },
  {
    "id": "science_1403_01",
    "title_ko": "주자소 설치와 계미자 주조",
    "people": [
      "태종"
    ],
    "year": 1403,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=science_1403_01"
  },
  {
    "id": "policy_1405_01",
    "title_ko": "한양 재천도",
    "people": [
      "태종"
    ],
    "year": 1405,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1405_01"
  },
  {
    "id": "policy_1413_01",
    "title_ko": "호패법 시행",
    "people": [
      "태종"
    ],
    "year": 1413,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1413_01"
  },
  {
    "id": "policy_1414_01",
    "title_ko": "6조 직계제 시행",
    "people": [
      "태종",
      "하륜"
    ],
    "year": 1414,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1414_01"
  },
  {
    "id": "political_1418_02",
    "title_ko": "충녕대군 세자 책봉과 양녕대군 폐세자",
    "people": [
      "태종",
      "양녕대군",
      "충녕대군"
    ],
    "year": 1418,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1418_02"
  },
  {
    "id": "policy_1400_03",
    "title_ko": "승정원과 의금부 — 왕권을 뒷받침하는 직속 기구",
    "people": [],
    "year": 1400,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1400_03"
  },
  {
    "id": "policy_1413_02",
    "title_ko": "조선의 지방행정 — 8도와 수령·향리·유향소",
    "people": [],
    "year": 1413,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1413_02"
  },
  {
    "id": "culture_1413_03",
    "title_ko": "조선왕조실록과 사고 — 기록으로 남긴 왕조",
    "people": [],
    "year": 1413,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1413_03"
  },
  {
    "id": "culture_joseonlit_02",
    "title_ko": "하여가와 단심가 — 왕조 교체기의 시조",
    "people": [
      "정몽주",
      "이방원"
    ],
    "year": 1392,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_joseonlit_02"
  },
  {
    "id": "political_1418_01",
    "title_ko": "세종 즉위",
    "people": [
      "세종",
      "태종"
    ],
    "year": 1418,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1418_01"
  },
  {
    "id": "battle_1419_01",
    "title_ko": "대마도 정벌(기해동정)",
    "people": [
      "이종무",
      "태종"
    ],
    "year": 1419,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=battle_1419_01"
  },
  {
    "id": "policy_1436_01",
    "title_ko": "의정부서사제로 복귀",
    "people": [
      "세종",
      "황희",
      "맹사성"
    ],
    "year": 1436,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1436_01"
  },
  {
    "id": "policy_1434_01",
    "title_ko": "6진 개척 — 김종서",
    "people": [
      "김종서",
      "세종"
    ],
    "year": 1434,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1434_01"
  },
  {
    "id": "policy_1443_02",
    "title_ko": "4군 개척 — 최윤덕",
    "people": [
      "최윤덕",
      "세종"
    ],
    "year": 1443,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1443_02"
  },
  {
    "id": "science_1434_02",
    "title_ko": "장영실의 과학기구 발명 — 자격루·앙부일구·측우기",
    "people": [
      "장영실",
      "세종"
    ],
    "year": 1434,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=science_1434_02"
  },
  {
    "id": "science_1434_03",
    "title_ko": "갑인자 주조",
    "people": [
      "세종",
      "이천"
    ],
    "year": 1434,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=science_1434_03"
  },
  {
    "id": "culture_1431_01",
    "title_ko": "박연의 아악 정리",
    "people": [
      "박연",
      "세종"
    ],
    "year": 1431,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1431_01"
  },
  {
    "id": "culture_1434_04",
    "title_ko": "삼강행실도 편찬",
    "people": [
      "세종",
      "설순"
    ],
    "year": 1434,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1434_04"
  },
  {
    "id": "policy_1444_02",
    "title_ko": "공법 시행 — 전분6등법·연분9등법",
    "people": [
      "세종"
    ],
    "year": 1444,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1444_02"
  },
  {
    "id": "culture_1443_01",
    "title_ko": "훈민정음 창제",
    "people": [
      "세종"
    ],
    "year": 1443,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1443_01"
  },
  {
    "id": "culture_1447_01",
    "title_ko": "안견의 몽유도원도",
    "people": [
      "안견",
      "안평대군"
    ],
    "year": 1447,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1447_01"
  },
  {
    "id": "culture_joseonlit_01",
    "title_ko": "훈민정음 창제와 국문 문학의 시작 — 용비어천가",
    "people": [
      "세종",
      "정인지",
      "권제",
      "안지"
    ],
    "year": 1447,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_joseonlit_01"
  },
  {
    "id": "political_1450_01",
    "title_ko": "문종 즉위",
    "people": [
      "문종",
      "세종"
    ],
    "year": 1450,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1450_01"
  },
  {
    "id": "culture_1451_01",
    "title_ko": "고려사절요 편찬",
    "people": [
      "문종",
      "김종서"
    ],
    "year": 1451,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1451_01"
  },
  {
    "id": "science_1451_02",
    "title_ko": "화차 개발과 동국병감 편찬",
    "people": [
      "문종"
    ],
    "year": 1451,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=science_1451_02"
  },
  {
    "id": "political_1452_01",
    "title_ko": "고명대신 체제 — 김종서·황보인에게 단종을 부탁하다",
    "people": [
      "문종",
      "김종서",
      "황보인",
      "단종"
    ],
    "year": 1452,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1452_01"
  },
  {
    "id": "political_1452_02",
    "title_ko": "단종 즉위",
    "people": [
      "단종",
      "문종"
    ],
    "year": 1452,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1452_02"
  },
  {
    "id": "plot_1453_01",
    "title_ko": "계유정난",
    "people": [
      "수양대군",
      "김종서",
      "황보인",
      "단종",
      "한명회"
    ],
    "year": 1453,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=plot_1453_01"
  },
  {
    "id": "political_1455_01",
    "title_ko": "단종의 선위와 세조 즉위",
    "people": [
      "세조",
      "단종"
    ],
    "year": 1455,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1455_01"
  },
  {
    "id": "plot_1456_01",
    "title_ko": "사육신 사건 — 단종 복위운동의 실패",
    "people": [
      "성삼문",
      "박팽년",
      "세조",
      "단종"
    ],
    "year": 1456,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=plot_1456_01"
  },
  {
    "id": "political_1457_01",
    "title_ko": "단종의 죽음",
    "people": [
      "단종",
      "세조"
    ],
    "year": 1457,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1457_01"
  },
  {
    "id": "policy_1460_01",
    "title_ko": "경국대전 편찬 착수",
    "people": [
      "세조"
    ],
    "year": 1460,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1460_01"
  },
  {
    "id": "policy_1466_01",
    "title_ko": "직전법 시행",
    "people": [
      "세조"
    ],
    "year": 1466,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1466_01"
  },
  {
    "id": "battle_1467_01",
    "title_ko": "이시애의 난",
    "people": [
      "이시애",
      "세조"
    ],
    "year": 1467,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=battle_1467_01"
  },
  {
    "id": "culture_1467_02",
    "title_ko": "원각사지 십층석탑 건립",
    "people": [
      "세조"
    ],
    "year": 1467,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1467_02"
  },
  {
    "id": "policy_1456_02",
    "title_ko": "집현전 폐지와 경연 중단",
    "people": [
      "세조"
    ],
    "year": 1456,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1456_02"
  },
  {
    "id": "policy_1457_02",
    "title_ko": "조선의 군사제도 — 5위와 진관체제·제승방략",
    "people": [],
    "year": 1457,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1457_02"
  },
  {
    "id": "culture_1465_01",
    "title_ko": "김시습 — 생육신의 방랑, 최초의 한문소설을 쓰다",
    "people": [
      "김시습",
      "세조"
    ],
    "year": 1465,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1465_01"
  },
  {
    "id": "culture_hanmun_03",
    "title_ko": "김시습과 금오신화 — 한국 소설의 출발",
    "people": [
      "김시습"
    ],
    "year": 1465,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_hanmun_03"
  },
  {
    "id": "political_1468_01",
    "title_ko": "예종 즉위",
    "people": [
      "예종",
      "세조"
    ],
    "year": 1468,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1468_01"
  },
  {
    "id": "plot_1468_02",
    "title_ko": "남이의 옥",
    "people": [
      "남이",
      "유자광",
      "예종"
    ],
    "year": 1468,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=plot_1468_02"
  },
  {
    "id": "political_1469_01",
    "title_ko": "성종 즉위와 정희왕후의 수렴청정",
    "people": [
      "성종",
      "정희왕후"
    ],
    "year": 1469,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1469_01"
  },
  {
    "id": "economic_1470_01",
    "title_ko": "관수관급제 시행",
    "people": [
      "성종"
    ],
    "year": 1470,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=economic_1470_01"
  },
  {
    "id": "political_1476_01",
    "title_ko": "사림 등용의 시작 — 김종직과 그 문인들",
    "people": [
      "성종",
      "김종직"
    ],
    "year": 1476,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1476_01"
  },
  {
    "id": "policy_1478_01",
    "title_ko": "홍문관 설치",
    "people": [
      "성종"
    ],
    "year": 1478,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1478_01"
  },
  {
    "id": "battle_1479_01",
    "title_ko": "여진 정벌",
    "people": [
      "성종",
      "어유소"
    ],
    "year": 1479,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=battle_1479_01"
  },
  {
    "id": "massacre_1482_01",
    "title_ko": "폐비 윤씨 사사",
    "people": [
      "성종",
      "폐비 윤씨",
      "연산군"
    ],
    "year": 1482,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=massacre_1482_01"
  },
  {
    "id": "culture_1481_01",
    "title_ko": "동국여지승람 편찬",
    "people": [
      "성종"
    ],
    "year": 1481,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1481_01"
  },
  {
    "id": "culture_1493_01",
    "title_ko": "악학궤범 편찬",
    "people": [
      "성종",
      "성현"
    ],
    "year": 1493,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1493_01"
  },
  {
    "id": "culture_1485_02",
    "title_ko": "동국통감 편찬",
    "people": [
      "성종",
      "서거정"
    ],
    "year": 1485,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1485_02"
  },
  {
    "id": "policy_1485_01",
    "title_ko": "경국대전 반포",
    "people": [
      "성종"
    ],
    "year": 1485,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1485_01"
  },
  {
    "id": "policy_1485_02",
    "title_ko": "조선의 신분제 — 양천제에서 반상제로",
    "people": [],
    "year": 1485,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1485_02"
  },
  {
    "id": "culture_1485_03",
    "title_ko": "조선의 과거제와 교육기관 — 성균관·서당·향교",
    "people": [],
    "year": 1485,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1485_03"
  },
  {
    "id": "culture_joseonlit_04",
    "title_ko": "상춘곡 — 가사문학과 강호가도의 시작",
    "people": [
      "정극인"
    ],
    "year": 1470,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_joseonlit_04"
  },
  {
    "id": "political_1494_01",
    "title_ko": "연산군 즉위",
    "people": [
      "연산군",
      "성종"
    ],
    "year": 1494,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1494_01"
  },
  {
    "id": "massacre_1498_01",
    "title_ko": "무오사화",
    "people": [
      "김일손",
      "이극돈",
      "연산군",
      "김종직"
    ],
    "year": 1498,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=massacre_1498_01"
  },
  {
    "id": "massacre_1504_01",
    "title_ko": "갑자사화",
    "people": [
      "연산군"
    ],
    "year": 1504,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=massacre_1504_01"
  },
  {
    "id": "policy_1504_02",
    "title_ko": "언론 탄압과 한글 사용 금지",
    "people": [
      "연산군"
    ],
    "year": 1504,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1504_02"
  },
  {
    "id": "policy_1504_03",
    "title_ko": "채홍사 파견과 국고 낭비",
    "people": [
      "연산군"
    ],
    "year": 1504,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1504_03"
  },
  {
    "id": "plot_1506_01",
    "title_ko": "중종반정",
    "people": [
      "성희안",
      "박원종",
      "연산군",
      "중종"
    ],
    "year": 1506,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=plot_1506_01"
  },
  {
    "id": "political_1506_02",
    "title_ko": "중종 즉위",
    "people": [
      "중종",
      "박원종",
      "성희안"
    ],
    "year": 1506,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1506_02"
  },
  {
    "id": "battle_1510_01",
    "title_ko": "삼포왜란",
    "people": [
      "중종"
    ],
    "year": 1510,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=battle_1510_01"
  },
  {
    "id": "policy_1517_01",
    "title_ko": "비변사 설치",
    "people": [
      "중종"
    ],
    "year": 1517,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1517_01"
  },
  {
    "id": "policy_1518_01",
    "title_ko": "조광조의 개혁정치 — 현량과와 위훈삭제",
    "people": [
      "중종",
      "조광조"
    ],
    "year": 1518,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1518_01"
  },
  {
    "id": "policy_1517_02",
    "title_ko": "향약 시행 — 여씨향약 4대 덕목",
    "people": [
      "조광조",
      "중종"
    ],
    "year": 1517,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1517_02"
  },
  {
    "id": "massacre_1519_01",
    "title_ko": "기묘사화",
    "people": [
      "조광조",
      "중종",
      "남곤",
      "심정"
    ],
    "year": 1519,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=massacre_1519_01"
  },
  {
    "id": "plot_1527_01",
    "title_ko": "작서의 변",
    "people": [
      "중종",
      "경빈 박씨"
    ],
    "year": 1527,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=plot_1527_01"
  },
  {
    "id": "culture_1543_01",
    "title_ko": "백운동서원 설립 — 최초의 서원",
    "people": [
      "주세붕",
      "안향"
    ],
    "year": 1543,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1543_01"
  },
  {
    "id": "battle_1544_01",
    "title_ko": "사량진왜변",
    "people": [
      "중종"
    ],
    "year": 1544,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=battle_1544_01"
  },
  {
    "id": "plot_1531_01",
    "title_ko": "김안로의 권력 농단과 중종 후반의 정국",
    "people": [
      "김안로"
    ],
    "year": 1531,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=plot_1531_01"
  },
  {
    "id": "culture_1530_01",
    "title_ko": "서경덕과 황진이 — 화담의 기철학, 송도의 시인",
    "people": [
      "서경덕",
      "황진이"
    ],
    "year": 1530,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1530_01"
  },
  {
    "id": "culture_joseonlit_03",
    "title_ko": "황진이와 기녀 시조",
    "people": [
      "황진이",
      "서경덕"
    ],
    "year": 1540,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_joseonlit_03"
  },
  {
    "id": "political_1544_02",
    "title_ko": "인종 즉위",
    "people": [
      "인종",
      "중종"
    ],
    "year": 1544,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1544_02"
  },
  {
    "id": "political_1545_01",
    "title_ko": "인종의 승하와 대윤·소윤의 대립",
    "people": [
      "인종",
      "문정왕후",
      "명종"
    ],
    "year": 1545,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1545_01"
  },
  {
    "id": "political_1545_02",
    "title_ko": "명종 즉위와 문정왕후의 수렴청정",
    "people": [
      "명종",
      "문정왕후"
    ],
    "year": 1545,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1545_02"
  },
  {
    "id": "massacre_1545_01",
    "title_ko": "을사사화",
    "people": [
      "윤원형",
      "윤임",
      "문정왕후"
    ],
    "year": 1545,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=massacre_1545_01"
  },
  {
    "id": "movement_1559_01",
    "title_ko": "임꺽정의 난",
    "people": [
      "임꺽정"
    ],
    "year": 1559,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=movement_1559_01"
  },
  {
    "id": "battle_1555_01",
    "title_ko": "을묘왜변",
    "people": [
      "명종"
    ],
    "year": 1555,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=battle_1555_01"
  },
  {
    "id": "economic_1556_01",
    "title_ko": "직전법 폐지와 녹봉제 전환",
    "people": [
      "명종"
    ],
    "year": 1556,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=economic_1556_01"
  },
  {
    "id": "political_1565_01",
    "title_ko": "문정왕후의 죽음과 명종의 친정",
    "people": [
      "명종",
      "문정왕후",
      "윤원형"
    ],
    "year": 1565,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1565_01"
  },
  {
    "id": "culture_1560_01",
    "title_ko": "신사임당과 허난설헌 — 조선의 여성 예술가들",
    "people": [
      "신사임당",
      "허난설헌"
    ],
    "year": 1560,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1560_01"
  },
  {
    "id": "culture_1555_01",
    "title_ko": "조식 — 단성소, 칼을 찬 선비의 직언",
    "people": [
      "조식",
      "명종"
    ],
    "year": 1555,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1555_01"
  },
  {
    "id": "political_1575_01",
    "title_ko": "동인·서인의 분당",
    "people": [
      "김효원",
      "심의겸"
    ],
    "year": 1575,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1575_01"
  },
  {
    "id": "policy_1583_01",
    "title_ko": "이이의 개혁 상소와 십만양병설",
    "people": [
      "이이",
      "선조"
    ],
    "year": 1583,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1583_01"
  },
  {
    "id": "policy_1593_03",
    "title_ko": "훈련도감 설치",
    "people": [
      "유성룡",
      "선조"
    ],
    "year": 1593,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1593_03"
  },
  {
    "id": "battle_1592_01",
    "title_ko": "임진왜란 발발",
    "people": [
      "선조",
      "이순신",
      "신립",
      "도요토미 히데요시"
    ],
    "year": 1592,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=battle_1592_01"
  },
  {
    "id": "battle_1592_02",
    "title_ko": "한산도대첩",
    "people": [
      "이순신"
    ],
    "year": 1592,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=battle_1592_02"
  },
  {
    "id": "battle_1592_03",
    "title_ko": "진주대첩",
    "people": [
      "김시민"
    ],
    "year": 1592,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=battle_1592_03"
  },
  {
    "id": "movement_1592_04",
    "title_ko": "전국 의병의 봉기",
    "people": [
      "곽재우",
      "조헌",
      "휴정",
      "유정",
      "고경명",
      "김천일"
    ],
    "year": 1592,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=movement_1592_04"
  },
  {
    "id": "diplomacy_1593_01",
    "title_ko": "명군 참전과 평양성 탈환",
    "people": [
      "이여송",
      "선조"
    ],
    "year": 1593,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=diplomacy_1593_01"
  },
  {
    "id": "battle_1593_02",
    "title_ko": "행주대첩",
    "people": [
      "권율"
    ],
    "year": 1593,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=battle_1593_02"
  },
  {
    "id": "battle_1597_01",
    "title_ko": "정유재란과 명량대첩",
    "people": [
      "이순신",
      "선조",
      "원균"
    ],
    "year": 1597,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=battle_1597_01"
  },
  {
    "id": "battle_1598_01",
    "title_ko": "노량해전과 이순신 전사, 전쟁 종결",
    "people": [
      "이순신",
      "선조"
    ],
    "year": 1598,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=battle_1598_01"
  },
  {
    "id": "political_1608_01",
    "title_ko": "선조의 죽음과 광해군 즉위",
    "people": [
      "선조",
      "광해군"
    ],
    "year": 1608,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1608_01"
  },
  {
    "id": "culture_1568_01",
    "title_ko": "이황과 이이 — 주리론과 주기론",
    "people": [
      "이황",
      "이이"
    ],
    "year": 1568,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1568_01"
  },
  {
    "id": "battle_1592_05",
    "title_ko": "정기룡 — 육전의 이순신",
    "people": [
      "정기룡"
    ],
    "year": 1592,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=battle_1592_05"
  },
  {
    "id": "culture_1580_01",
    "title_ko": "정철 — 가사문학의 절정, 정치의 그늘",
    "people": [
      "정철",
      "선조"
    ],
    "year": 1580,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1580_01"
  },
  {
    "id": "battle_1592_06",
    "title_ko": "정문부 — 북관대첩, 함경도를 되찾은 의병",
    "people": [
      "정문부",
      "가토 기요마사"
    ],
    "year": 1592,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=battle_1592_06"
  },
  {
    "id": "battle_1596_01",
    "title_ko": "김덕령 — 무등산 의병장, 무고로 스러지다",
    "people": [
      "김덕령",
      "선조"
    ],
    "year": 1596,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=battle_1596_01"
  },
  {
    "id": "battle_1593_03",
    "title_ko": "논개 — 촉석루에서 왜장을 끌어안고 남강에 몸을 던지다",
    "people": [
      "논개"
    ],
    "year": 1593,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=battle_1593_03"
  },
  {
    "id": "political_1600_01",
    "title_ko": "이항복 — 오성대감, 전란의 재상",
    "people": [
      "이항복",
      "이덕형"
    ],
    "year": 1600,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1600_01"
  },
  {
    "id": "culture_joseonlit_05",
    "title_ko": "정철 — 가사문학의 완성",
    "people": [
      "정철",
      "김만중"
    ],
    "year": 1585,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_joseonlit_05"
  },
  {
    "id": "policy_1608_02",
    "title_ko": "대동법 시행(경기도)",
    "people": [
      "광해군",
      "이원익"
    ],
    "year": 1608,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1608_02"
  },
  {
    "id": "culture_1610_01",
    "title_ko": "동의보감 완성",
    "people": [
      "허준",
      "광해군"
    ],
    "year": 1610,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1610_01"
  },
  {
    "id": "diplomacy_1619_01",
    "title_ko": "사르후 전투와 중립외교",
    "people": [
      "광해군",
      "강홍립"
    ],
    "year": 1619,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=diplomacy_1619_01"
  },
  {
    "id": "political_1613_01",
    "title_ko": "계축옥사",
    "people": [
      "광해군",
      "영창대군",
      "김제남"
    ],
    "year": 1613,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1613_01"
  },
  {
    "id": "political_1618_01",
    "title_ko": "인목대비 폐위(폐모살제)",
    "people": [
      "광해군",
      "인목대비"
    ],
    "year": 1618,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1618_01"
  },
  {
    "id": "policy_1620_01",
    "title_ko": "궁궐 중건 사업과 재정 파탄",
    "people": [
      "광해군"
    ],
    "year": 1620,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1620_01"
  },
  {
    "id": "diplomacy_1609_01",
    "title_ko": "통신사 파견과 기유약조 — 임진왜란 이후 대일관계 복원",
    "people": [],
    "year": 1609,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=diplomacy_1609_01"
  },
  {
    "id": "culture_joseonlate_03",
    "title_ko": "홍길동전과 저자 논쟁",
    "people": [
      "허균",
      "홍길동"
    ],
    "year": 1612,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_joseonlate_03"
  },
  {
    "id": "plot_1623_01",
    "title_ko": "인조반정 — 광해군 폐위",
    "people": [
      "인조",
      "광해군"
    ],
    "year": 1623,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=plot_1623_01"
  },
  {
    "id": "plot_1624_01",
    "title_ko": "이괄의 난",
    "people": [
      "이괄",
      "인조"
    ],
    "year": 1624,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=plot_1624_01"
  },
  {
    "id": "battle_1627_01",
    "title_ko": "정묘호란",
    "people": [
      "인조"
    ],
    "year": 1627,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=battle_1627_01"
  },
  {
    "id": "policy_1624_02",
    "title_ko": "어영청·총융청 설치 — 호란 대비 군영 정비",
    "people": [
      "인조"
    ],
    "year": 1624,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1624_02"
  },
  {
    "id": "political_1645_01",
    "title_ko": "소현세자의 귀국과 의문의 죽음",
    "people": [
      "소현세자",
      "인조"
    ],
    "year": 1645,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1645_01"
  },
  {
    "id": "battle_1636_01",
    "title_ko": "병자호란 — 삼전도의 굴욕",
    "people": [
      "인조"
    ],
    "year": 1636,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=battle_1636_01"
  },
  {
    "id": "policy_1635_01",
    "title_ko": "인조의 영정법 — 전세를 정액화하다",
    "people": [
      "인조"
    ],
    "year": 1635,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1635_01"
  },
  {
    "id": "battle_1636_02",
    "title_ko": "임경업 — 백마산성의 명장, 두 제국 사이에서 지다",
    "people": [
      "임경업",
      "김자점"
    ],
    "year": 1636,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=battle_1636_02"
  },
  {
    "id": "political_1649_01",
    "title_ko": "효종 즉위",
    "people": [
      "효종",
      "인조"
    ],
    "year": 1649,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1649_01"
  },
  {
    "id": "policy_1649_02",
    "title_ko": "북벌론 추진",
    "people": [
      "효종",
      "송시열"
    ],
    "year": 1649,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1649_02"
  },
  {
    "id": "policy_1651_01",
    "title_ko": "대동법 충청도 확대",
    "people": [
      "효종",
      "김육"
    ],
    "year": 1651,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1651_01"
  },
  {
    "id": "person_1653_01",
    "title_ko": "하멜 일행의 제주도 표류",
    "people": [
      "하멜"
    ],
    "year": 1653,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=person_1653_01"
  },
  {
    "id": "battle_1654_01",
    "title_ko": "제1차 나선정벌",
    "people": [
      "변급"
    ],
    "year": 1654,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=battle_1654_01"
  },
  {
    "id": "battle_1658_01",
    "title_ko": "제2차 나선정벌",
    "people": [
      "신류"
    ],
    "year": 1658,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=battle_1658_01"
  },
  {
    "id": "culture_1651_01",
    "title_ko": "윤선도 — 어부사시사, 유배와 은둔이 빚은 우리말의 보석",
    "people": [
      "윤선도"
    ],
    "year": 1651,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1651_01"
  },
  {
    "id": "political_1659_01",
    "title_ko": "현종 즉위",
    "people": [
      "현종",
      "효종"
    ],
    "year": 1659,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1659_01"
  },
  {
    "id": "political_1659_02",
    "title_ko": "기해예송(1차 예송)",
    "people": [
      "송시열",
      "윤휴",
      "현종"
    ],
    "year": 1659,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1659_02"
  },
  {
    "id": "disaster_1670_01",
    "title_ko": "경신대기근",
    "people": [
      "현종"
    ],
    "year": 1670,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=disaster_1670_01"
  },
  {
    "id": "policy_1662_01",
    "title_ko": "대동법 호남 확대",
    "people": [
      "현종",
      "김육"
    ],
    "year": 1662,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1662_01"
  },
  {
    "id": "political_1674_01",
    "title_ko": "갑인예송(2차 예송)과 남인 집권",
    "people": [
      "현종",
      "송시열",
      "허목"
    ],
    "year": 1674,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1674_01"
  },
  {
    "id": "political_1674_02",
    "title_ko": "숙종 즉위",
    "people": [
      "숙종",
      "현종"
    ],
    "year": 1674,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1674_02"
  },
  {
    "id": "plot_1680_01",
    "title_ko": "경신환국",
    "people": [
      "숙종",
      "허적",
      "김석주"
    ],
    "year": 1680,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=plot_1680_01"
  },
  {
    "id": "plot_1689_01",
    "title_ko": "기사환국 — 장희빈 왕후 책봉",
    "people": [
      "숙종",
      "장희빈",
      "인현왕후"
    ],
    "year": 1689,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=plot_1689_01"
  },
  {
    "id": "plot_1694_01",
    "title_ko": "갑술환국 — 인현왕후 복위",
    "people": [
      "숙종",
      "인현왕후",
      "장희빈"
    ],
    "year": 1694,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=plot_1694_01"
  },
  {
    "id": "massacre_1701_01",
    "title_ko": "장희빈 사사(무고의 옥)",
    "people": [
      "숙종",
      "장희빈"
    ],
    "year": 1701,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=massacre_1701_01"
  },
  {
    "id": "economic_1678_01",
    "title_ko": "상평통보 주조·유통",
    "people": [
      "숙종"
    ],
    "year": 1678,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=economic_1678_01"
  },
  {
    "id": "policy_1708_01",
    "title_ko": "대동법 전국 시행 완성(황해도)",
    "people": [
      "숙종"
    ],
    "year": 1708,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1708_01"
  },
  {
    "id": "diplomacy_1693_01",
    "title_ko": "안용복, 울릉도·독도를 지키다",
    "people": [
      "안용복"
    ],
    "year": 1693,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=diplomacy_1693_01"
  },
  {
    "id": "diplomacy_1712_01",
    "title_ko": "백두산정계비 건립",
    "people": [
      "숙종"
    ],
    "year": 1712,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=diplomacy_1712_01"
  },
  {
    "id": "culture_joseonlate_02",
    "title_ko": "김만중의 유배와 국문소설 — 구운몽·사씨남정기",
    "people": [
      "김만중"
    ],
    "year": 1689,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_joseonlate_02"
  },
  {
    "id": "political_1720_01",
    "title_ko": "경종 즉위",
    "people": [
      "경종",
      "숙종"
    ],
    "year": 1720,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1720_01"
  },
  {
    "id": "plot_1721_01",
    "title_ko": "신임옥사",
    "people": [
      "경종",
      "노론4대신"
    ],
    "year": 1721,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=plot_1721_01"
  },
  {
    "id": "policy_1725_01",
    "title_ko": "탕평책 실시",
    "people": [
      "영조"
    ],
    "year": 1725,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1725_01"
  },
  {
    "id": "battle_1728_01",
    "title_ko": "이인좌의 난",
    "people": [
      "이인좌",
      "영조"
    ],
    "year": 1728,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=battle_1728_01"
  },
  {
    "id": "policy_1741_01",
    "title_ko": "서원 정리 — 붕당의 근거지를 정비하다",
    "people": [
      "영조"
    ],
    "year": 1741,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1741_01"
  },
  {
    "id": "policy_1750_01",
    "title_ko": "균역법 시행",
    "people": [
      "영조"
    ],
    "year": 1750,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1750_01"
  },
  {
    "id": "policy_1760_01",
    "title_ko": "청계천(개천) 준설",
    "people": [
      "영조"
    ],
    "year": 1760,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1760_01"
  },
  {
    "id": "plot_1762_01",
    "title_ko": "임오화변 — 사도세자의 죽음",
    "people": [
      "영조",
      "사도세자"
    ],
    "year": 1762,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=plot_1762_01"
  },
  {
    "id": "culture_1750_02",
    "title_ko": "중농학파 실학 — 유형원·이익·정약용의 토지개혁론",
    "people": [
      "유형원",
      "이익",
      "정약용"
    ],
    "year": 1750,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1750_02"
  },
  {
    "id": "culture_1751_01",
    "title_ko": "정선 — 인왕제색도, 조선의 산천을 조선의 눈으로 그리다",
    "people": [
      "정선"
    ],
    "year": 1751,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1751_01"
  },
  {
    "id": "culture_joseonlate_01",
    "title_ko": "청구영언 편찬 — 최초의 가집과 사설시조",
    "people": [
      "김천택",
      "김수장"
    ],
    "year": 1728,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_joseonlate_01"
  },
  {
    "id": "political_1776_01",
    "title_ko": "정조 즉위",
    "people": [
      "정조",
      "영조",
      "사도세자"
    ],
    "year": 1776,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1776_01"
  },
  {
    "id": "policy_1776_02",
    "title_ko": "규장각 설치",
    "people": [
      "정조"
    ],
    "year": 1776,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1776_02"
  },
  {
    "id": "policy_1778_01",
    "title_ko": "서얼허통절목 반포",
    "people": [
      "정조"
    ],
    "year": 1778,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1778_01"
  },
  {
    "id": "policy_1785_01",
    "title_ko": "대전통편 편찬",
    "people": [
      "정조"
    ],
    "year": 1785,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1785_01"
  },
  {
    "id": "economic_1791_01",
    "title_ko": "신해통공 — 금난전권 폐지",
    "people": [
      "정조",
      "채제공"
    ],
    "year": 1791,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=economic_1791_01"
  },
  {
    "id": "culture_1794_01",
    "title_ko": "수원화성 축성 시작",
    "people": [
      "정조",
      "정약용"
    ],
    "year": 1794,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1794_01"
  },
  {
    "id": "culture_1796_01",
    "title_ko": "수원화성 완공",
    "people": [
      "정조"
    ],
    "year": 1796,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1796_01"
  },
  {
    "id": "policy_1793_01",
    "title_ko": "장용영 설치 — 국왕 친위부대",
    "people": [
      "정조"
    ],
    "year": 1793,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1793_01"
  },
  {
    "id": "political_1800_01",
    "title_ko": "정조의 죽음",
    "people": [
      "정조"
    ],
    "year": 1800,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1800_01"
  },
  {
    "id": "culture_1778_02",
    "title_ko": "중상학파(북학파) 실학 — 유수원·홍대용·박지원·박제가",
    "people": [
      "유수원",
      "홍대용",
      "박지원",
      "박제가"
    ],
    "year": 1778,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1778_02"
  },
  {
    "id": "culture_1780_01",
    "title_ko": "조선 후기 한글소설과 판소리",
    "people": [
      "허균"
    ],
    "year": 1780,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1780_01"
  },
  {
    "id": "culture_1785_02",
    "title_ko": "김홍도와 신윤복의 풍속화",
    "people": [
      "김홍도",
      "신윤복",
      "장승업"
    ],
    "year": 1785,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1785_02"
  },
  {
    "id": "political_1791_01",
    "title_ko": "신해박해 — 진산사건과 최초의 천주교 순교",
    "people": [
      "윤지충",
      "권상연",
      "정조"
    ],
    "year": 1791,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1791_01"
  },
  {
    "id": "economic_1795_01",
    "title_ko": "김만덕 — 제주의 거상, 전 재산으로 섬을 살리다",
    "people": [
      "김만덕",
      "정조"
    ],
    "year": 1795,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=economic_1795_01"
  },
  {
    "id": "culture_joseonlate_05",
    "title_ko": "박지원과 열하일기 — 북학과 한문단편",
    "people": [
      "박지원",
      "박규수"
    ],
    "year": 1780,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_joseonlate_05"
  },
  {
    "id": "political_1800_02",
    "title_ko": "순조 즉위와 정순왕후 수렴청정",
    "people": [
      "순조",
      "정순왕후"
    ],
    "year": 1800,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1800_02"
  },
  {
    "id": "massacre_1801_01",
    "title_ko": "신유박해",
    "people": [
      "정순왕후",
      "이승훈",
      "정약종"
    ],
    "year": 1801,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=massacre_1801_01"
  },
  {
    "id": "political_1804_01",
    "title_ko": "안동 김씨 세도정치의 시작",
    "people": [
      "순조",
      "김조순"
    ],
    "year": 1804,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1804_01"
  },
  {
    "id": "policy_1801_02",
    "title_ko": "공노비 혁파",
    "people": [
      "순조"
    ],
    "year": 1801,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1801_02"
  },
  {
    "id": "movement_1811_01",
    "title_ko": "홍경래의 난",
    "people": [
      "홍경래"
    ],
    "year": 1811,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=movement_1811_01"
  },
  {
    "id": "culture_1816_01",
    "title_ko": "국학 연구의 발전 — 안정복·유득공·김정희",
    "people": [
      "안정복",
      "유득공",
      "김정희"
    ],
    "year": 1816,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1816_01"
  },
  {
    "id": "political_1834_01",
    "title_ko": "헌종 즉위 — 조선 최연소 국왕",
    "people": [
      "헌종",
      "순조"
    ],
    "year": 1834,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1834_01"
  },
  {
    "id": "massacre_1839_01",
    "title_ko": "기해박해",
    "people": [
      "풍양조씨"
    ],
    "year": 1839,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=massacre_1839_01"
  },
  {
    "id": "massacre_1846_01",
    "title_ko": "병오박해 — 김대건 신부 순교",
    "people": [
      "김대건"
    ],
    "year": 1846,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=massacre_1846_01"
  },
  {
    "id": "political_1849_01",
    "title_ko": "철종 즉위 — 강화도령",
    "people": [
      "철종",
      "순원왕후"
    ],
    "year": 1849,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1849_01"
  },
  {
    "id": "policy_1852_01",
    "title_ko": "삼정 문란의 심화",
    "people": [
      "철종"
    ],
    "year": 1852,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1852_01"
  },
  {
    "id": "movement_1862_01",
    "title_ko": "임술농민봉기(진주민란)",
    "people": [
      "유계춘"
    ],
    "year": 1862,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=movement_1862_01"
  },
  {
    "id": "organization_1860_01",
    "title_ko": "최제우, 동학을 창시하다",
    "people": [
      "최제우"
    ],
    "year": 1860,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=organization_1860_01"
  },
  {
    "id": "policy_1862_02",
    "title_ko": "삼정이정청 설치",
    "people": [
      "철종",
      "박규수"
    ],
    "year": 1862,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=policy_1862_02"
  },
  {
    "id": "culture_1850_01",
    "title_ko": "세도정치기의 사회 불안 — 정감록과 미륵신앙",
    "people": [],
    "year": 1850,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1850_01"
  },
  {
    "id": "science_1861_01",
    "title_ko": "김정호, 대동여지도를 간행하다",
    "people": [
      "김정호",
      "최한기"
    ],
    "year": 1861,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=science_1861_01"
  },
  {
    "id": "culture_1850_02",
    "title_ko": "김삿갓 — 조선을 떠돈 풍자의 붓",
    "people": [
      "김병연"
    ],
    "year": 1850,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_1850_02"
  },
  {
    "id": "culture_joseonlate_04",
    "title_ko": "판소리와 신재효 — 열두 마당의 정리",
    "people": [
      "신재효",
      "진채선"
    ],
    "year": 1870,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=culture_joseonlate_04"
  },
  {
    "id": "political_1863_01",
    "title_ko": "고종 즉위와 흥선대원군의 집권",
    "people": [
      "고종",
      "흥선대원군"
    ],
    "year": 1863,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=political_1863_01"
  },
  {
    "id": "battle_1866_01",
    "title_ko": "병인양요",
    "people": [
      "흥선대원군"
    ],
    "year": 1866,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=battle_1866_01"
  },
  {
    "id": "battle_1871_01",
    "title_ko": "신미양요",
    "people": [
      "흥선대원군"
    ],
    "year": 1871,
    "mapKey": "medieval2",
    "mapLabel": "중세2 (조선)",
    "url": "/maps/medieval2/index.html?event=battle_1871_01"
  },
  {
    "id": "political_1945_01",
    "title_ko": "8·15 해방",
    "people": [],
    "year": 1945,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1945_01"
  },
  {
    "id": "political_1945_02",
    "title_ko": "38선 분할 점령",
    "people": [],
    "year": 1945,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1945_02"
  },
  {
    "id": "organization_1945_01",
    "title_ko": "건국준비위원회와 조선인민공화국",
    "people": [
      "여운형"
    ],
    "year": 1945,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1945_01"
  },
  {
    "id": "organization_1945_02",
    "title_ko": "미군정청 수립",
    "people": [
      "하지"
    ],
    "year": 1945,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1945_02"
  },
  {
    "id": "political_1945_03",
    "title_ko": "모스크바 3상회의 — 신탁통치 결정",
    "people": [],
    "year": 1945,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1945_03"
  },
  {
    "id": "diplomacy_1945_01",
    "title_ko": "포츠담 선언 — 한반도 독립 약속의 단서",
    "people": [],
    "year": 1945,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=diplomacy_1945_01"
  },
  {
    "id": "political_1946_01",
    "title_ko": "제1차 미소공동위원회 결렬",
    "people": [],
    "year": 1946,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1946_01"
  },
  {
    "id": "organization_1946_02",
    "title_ko": "서북청년단(서북청년회) 결성",
    "people": [
      "선우기성",
      "문봉제",
      "한경직"
    ],
    "year": 1946,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1946_02"
  },
  {
    "id": "person_1946_01",
    "title_ko": "이승만의 정읍 발언 — 단독정부론의 등장",
    "people": [
      "이승만"
    ],
    "year": 1946,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1946_01"
  },
  {
    "id": "movement_1946_01",
    "title_ko": "좌우합작운동",
    "people": [
      "여운형",
      "김규식"
    ],
    "year": 1946,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1946_01"
  },
  {
    "id": "movement_1946_02",
    "title_ko": "9월 총파업과 10월 항쟁",
    "people": [],
    "year": 1946,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1946_02"
  },
  {
    "id": "organization_1946_01",
    "title_ko": "남조선과도입법의원 출범",
    "people": [
      "김규식"
    ],
    "year": 1946,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1946_01"
  },
  {
    "id": "massacre_1947_01",
    "title_ko": "제주 3·1절 발포사건",
    "people": [],
    "year": 1947,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1947_01"
  },
  {
    "id": "political_1947_01",
    "title_ko": "제2차 미소공동위원회 재개",
    "people": [],
    "year": 1947,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1947_01"
  },
  {
    "id": "person_1947_01",
    "title_ko": "여운형 피살",
    "people": [
      "여운형"
    ],
    "year": 1947,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1947_01"
  },
  {
    "id": "political_1947_02",
    "title_ko": "한국문제의 유엔 이관",
    "people": [],
    "year": 1947,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1947_02"
  },
  {
    "id": "plot_1947_01",
    "title_ko": "좌익 세력 불법화 — 조선공산당 체포령",
    "people": [
      "박헌영"
    ],
    "year": 1947,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1947_01"
  },
  {
    "id": "diplomacy_1947_02",
    "title_ko": "유엔한국임시위원단(UNTCOK) 구성과 활동",
    "people": [],
    "year": 1947,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=diplomacy_1947_02"
  },
  {
    "id": "person_1947_03",
    "title_ko": "구인회 — LG그룹 창업과 락희화학 설립",
    "people": [
      "구인회"
    ],
    "year": 1947,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1947_03"
  },
  {
    "id": "political_1948_01",
    "title_ko": "대한민국 정부 수립 — 제헌헌법 공포와 초대 대통령 취임",
    "people": [
      "이승만"
    ],
    "year": 1948,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1948_01"
  },
  {
    "id": "massacre_1948_01",
    "title_ko": "제주 4·3사건 — 초토화 작전",
    "people": [],
    "year": 1948,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1948_01"
  },
  {
    "id": "massacre_1948_02",
    "title_ko": "여수·순천 10·19사건",
    "people": [],
    "year": 1948,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1948_02"
  },
  {
    "id": "political_1948_02",
    "title_ko": "반민족행위특별조사위원회(반민특위) 발족",
    "people": [],
    "year": 1948,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1948_02"
  },
  {
    "id": "person_1948_01",
    "title_ko": "김구 — 남북협상을 위한 38선 행",
    "people": [
      "김구"
    ],
    "year": 1948,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1948_01"
  },
  {
    "id": "plot_1948_01",
    "title_ko": "이승만의 여순사건 가담자 색출 담화",
    "people": [
      "이승만"
    ],
    "year": 1948,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1948_01"
  },
  {
    "id": "person_1948_02",
    "title_ko": "제임스 하우스만 — 미군 고문관의 그림자 권력",
    "people": [
      "제임스 하우스만"
    ],
    "year": 1948,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1948_02"
  },
  {
    "id": "person_1948_03",
    "title_ko": "김익렬과 김달삼의 4·28 평화협상",
    "people": [
      "김익렬",
      "김달삼"
    ],
    "year": 1948,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1948_03"
  },
  {
    "id": "person_1948_04",
    "title_ko": "박진경 대령 부임과 암살 — \"30만 희생설\" 논쟁",
    "people": [
      "박진경"
    ],
    "year": 1948,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1948_04"
  },
  {
    "id": "person_1948_05",
    "title_ko": "조병옥 경무부장 — 강경 진압의 설계자",
    "people": [
      "조병옥"
    ],
    "year": 1948,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1948_05"
  },
  {
    "id": "diplomacy_1948_02",
    "title_ko": "5·10 총선거에 대한 유엔 감시단의 승인",
    "people": [],
    "year": 1948,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=diplomacy_1948_02"
  },
  {
    "id": "economic_1948_03",
    "title_ko": "농지개혁법 공포 — 유상매입 유상분배",
    "people": [],
    "year": 1948,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=economic_1948_03"
  },
  {
    "id": "person_1948_06",
    "title_ko": "김성집·한수안 — 광복 후 첫 올림픽, 첫 메달",
    "people": [
      "김성집",
      "한수안"
    ],
    "year": 1948,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1948_06"
  },
  {
    "id": "diplomacy_1948_03",
    "title_ko": "독도, 근현대의 공방 — 칙령에서 다케시마의 날까지",
    "people": [],
    "year": 1948,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=diplomacy_1948_03"
  },
  {
    "id": "person_1949_01",
    "title_ko": "김구 암살",
    "people": [
      "김구"
    ],
    "year": 1949,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1949_01"
  },
  {
    "id": "policy_1949_01",
    "title_ko": "농지개혁법 공포",
    "people": [],
    "year": 1949,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=policy_1949_01"
  },
  {
    "id": "political_1949_01",
    "title_ko": "반민특위 활동 무력화 — 친일 청산의 좌절",
    "people": [],
    "year": 1949,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1949_01"
  },
  {
    "id": "organization_1949_01",
    "title_ko": "국민보도연맹 결성",
    "people": [],
    "year": 1949,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1949_01"
  },
  {
    "id": "massacre_1949_01",
    "title_ko": "제주 4·3사건 — 토벌 소강과 잔여 희생",
    "people": [],
    "year": 1949,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1949_01"
  },
  {
    "id": "battle_1950_01",
    "title_ko": "6·25전쟁 발발 — 북한군의 전면 남침",
    "people": [],
    "year": 1950,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=battle_1950_01"
  },
  {
    "id": "massacre_1950_01",
    "title_ko": "국민보도연맹원 학살",
    "people": [],
    "year": 1950,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1950_01"
  },
  {
    "id": "battle_1950_02",
    "title_ko": "인천상륙작전",
    "people": [],
    "year": 1950,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=battle_1950_02"
  },
  {
    "id": "battle_1950_03",
    "title_ko": "평양 탈환과 북진",
    "people": [],
    "year": 1950,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=battle_1950_03"
  },
  {
    "id": "battle_1950_04",
    "title_ko": "중공군 참전 — 전쟁의 국제전화",
    "people": [],
    "year": 1950,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=battle_1950_04"
  },
  {
    "id": "massacre_1950_02",
    "title_ko": "대전 산내 골령골 학살 — \"세상에서 가장 긴 무덤\"",
    "people": [
      "이관술"
    ],
    "year": 1950,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1950_02"
  },
  {
    "id": "plot_1950_01",
    "title_ko": "이승만 정부, 전국 보도연맹원 처리 지시",
    "people": [
      "이승만",
      "신성모"
    ],
    "year": 1950,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1950_01"
  },
  {
    "id": "massacre_1950_03",
    "title_ko": "경산 코발트광산 학살 — 경북 일대 보도연맹원이 모인 곳",
    "people": [],
    "year": 1950,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1950_03"
  },
  {
    "id": "massacre_1950_04",
    "title_ko": "충북 보도연맹 학살 — 원주에서 문경까지 남하한 처형 행렬",
    "people": [],
    "year": 1950,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1950_04"
  },
  {
    "id": "massacre_1950_05",
    "title_ko": "제주 섯알오름 예비검속 학살",
    "people": [
      "문형순"
    ],
    "year": 1950,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1950_05"
  },
  {
    "id": "massacre_1950_06",
    "title_ko": "거제·통영 국민보도연맹원 학살",
    "people": [],
    "year": 1950,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1950_06"
  },
  {
    "id": "massacre_1950_07",
    "title_ko": "전남 국민보도연맹원 학살",
    "people": [],
    "year": 1950,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1950_07"
  },
  {
    "id": "migration_1951_01",
    "title_ko": "흥남 철수 — 12월 15일부터 24일까지, 열흘간의 탈출",
    "people": [],
    "year": 1950,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=migration_1951_01"
  },
  {
    "id": "massacre_1950_08",
    "title_ko": "노근리 학살 — 미군에 의한 피난민 사살",
    "people": [],
    "year": 1950,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1950_08"
  },
  {
    "id": "diplomacy_1950_01",
    "title_ko": "유엔 안전보장이사회 한국 파병 결의 — 유엔군 창설",
    "people": [],
    "year": 1950,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=diplomacy_1950_01"
  },
  {
    "id": "person_1950_01",
    "title_ko": "백선엽 — 다부동을 지킨 간도특설대 출신 장군",
    "people": [
      "백선엽"
    ],
    "year": 1950,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1950_01"
  },
  {
    "id": "person_1950_02",
    "title_ko": "안종삼 — 480명을 살린 \"한국판 쉰들러\"",
    "people": [
      "안종삼"
    ],
    "year": 1950,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1950_02"
  },
  {
    "id": "battle_1951_01",
    "title_ko": "1·4 후퇴 — 서울 재함락",
    "people": [],
    "year": 1951,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=battle_1951_01"
  },
  {
    "id": "massacre_1951_01",
    "title_ko": "거창 양민 학살 사건",
    "people": [],
    "year": 1951,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1951_01"
  },
  {
    "id": "plot_1951_01",
    "title_ko": "국민방위군 사건",
    "people": [],
    "year": 1951,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1951_01"
  },
  {
    "id": "political_1951_01",
    "title_ko": "휴전회담 개시",
    "people": [],
    "year": 1951,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1951_01"
  },
  {
    "id": "political_1952_01",
    "title_ko": "부산 정치파동",
    "people": [
      "이승만"
    ],
    "year": 1952,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1952_01"
  },
  {
    "id": "political_1952_02",
    "title_ko": "발췌개헌 — 대통령 직선제 도입",
    "people": [],
    "year": 1952,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1952_02"
  },
  {
    "id": "political_1952_03",
    "title_ko": "이승만 제2대 대통령 재선",
    "people": [
      "이승만"
    ],
    "year": 1952,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1952_03"
  },
  {
    "id": "political_1952_04",
    "title_ko": "거제포로수용소 폭동",
    "people": [],
    "year": 1952,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1952_04"
  },
  {
    "id": "battle_1952_01",
    "title_ko": "백마고지 전투",
    "people": [],
    "year": 1952,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=battle_1952_01"
  },
  {
    "id": "political_1953_01",
    "title_ko": "반공포로 일방 석방",
    "people": [
      "이승만"
    ],
    "year": 1953,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1953_01"
  },
  {
    "id": "political_1953_02",
    "title_ko": "한국 군사 정전에 관한 협정 조인",
    "people": [],
    "year": 1953,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1953_02"
  },
  {
    "id": "political_1953_03",
    "title_ko": "한미상호방위조약 체결",
    "people": [
      "이승만"
    ],
    "year": 1953,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1953_03"
  },
  {
    "id": "movement_1953_01",
    "title_ko": "전쟁고아와 피란민 — 폐허 속의 생존",
    "people": [],
    "year": 1953,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1953_01"
  },
  {
    "id": "massacre_1953_01",
    "title_ko": "제주 4·3사건 — 잔여 토벌과 종결을 향한 길",
    "people": [],
    "year": 1953,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1953_01"
  },
  {
    "id": "person_1953_01",
    "title_ko": "황순원, 소나기를 발표하다",
    "people": [
      "황순원"
    ],
    "year": 1953,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1953_01"
  },
  {
    "id": "political_1954_01",
    "title_ko": "제네바 정치회담 — 통일 논의의 마지막 기회",
    "people": [
      "변영태"
    ],
    "year": 1954,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1954_01"
  },
  {
    "id": "political_1954_02",
    "title_ko": "제3대 민의원 선거 — 개헌 의석 확보",
    "people": [
      "이승만"
    ],
    "year": 1954,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1954_02"
  },
  {
    "id": "political_1954_03",
    "title_ko": "사사오입 개헌",
    "people": [
      "이승만"
    ],
    "year": 1954,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1954_03"
  },
  {
    "id": "organization_1954_01",
    "title_ko": "호헌동지회 결성",
    "people": [],
    "year": 1954,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1954_01"
  },
  {
    "id": "organization_1954_02",
    "title_ko": "독도의용수비대",
    "people": [
      "홍순칠"
    ],
    "year": 1954,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1954_02"
  },
  {
    "id": "organization_1954_03",
    "title_ko": "통일교 창립 — 세계기독교통일신령협회",
    "people": [
      "문선명"
    ],
    "year": 1954,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1954_03"
  },
  {
    "id": "movement_1955_01",
    "title_ko": "진보당 추진 — 광릉회합",
    "people": [
      "조봉암"
    ],
    "year": 1955,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1955_01"
  },
  {
    "id": "political_1955_01",
    "title_ko": "이승만 80회 탄신 경축 행사",
    "people": [
      "이승만"
    ],
    "year": 1955,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1955_01"
  },
  {
    "id": "policy_1955_01",
    "title_ko": "한미잉여농산물협정과 원조경제",
    "people": [],
    "year": 1955,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=policy_1955_01"
  },
  {
    "id": "policy_1955_02",
    "title_ko": "영암선 개통과 자립 공업의 시도",
    "people": [
      "이승만"
    ],
    "year": 1955,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=policy_1955_02"
  },
  {
    "id": "movement_1955_02",
    "title_ko": "대한석탄광노동조합연합회 결성과 광부 파업",
    "people": [],
    "year": 1955,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1955_02"
  },
  {
    "id": "movement_1955_03",
    "title_ko": "베이비붐 시작 — 출산율 급증과 인구 구조 변화",
    "people": [],
    "year": 1955,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1955_03"
  },
  {
    "id": "person_1956_01",
    "title_ko": "신익희 급사",
    "people": [
      "신익희"
    ],
    "year": 1956,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1956_01"
  },
  {
    "id": "political_1956_01",
    "title_ko": "제3대 정부통령 선거 — 조봉암의 약진",
    "people": [
      "이승만",
      "조봉암",
      "장면"
    ],
    "year": 1956,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1956_01"
  },
  {
    "id": "organization_1956_01",
    "title_ko": "진보당 창당",
    "people": [
      "조봉암"
    ],
    "year": 1956,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1956_01"
  },
  {
    "id": "person_1956_02",
    "title_ko": "장면 부통령 피격사건",
    "people": [
      "장면"
    ],
    "year": 1956,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1956_02"
  },
  {
    "id": "political_1956_02",
    "title_ko": "자유당의 위기감과 이기붕 체제 강화",
    "people": [
      "이기붕"
    ],
    "year": 1956,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1956_02"
  },
  {
    "id": "person_1956_03",
    "title_ko": "김창룡 암살 — 권력 기구의 사병화와 그 종말",
    "people": [
      "김창룡"
    ],
    "year": 1956,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1956_03"
  },
  {
    "id": "culture_1956_02",
    "title_ko": "HLKZ-TV 개국 — 한국 최초 텔레비전 방송",
    "people": [],
    "year": 1956,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=culture_1956_02"
  },
  {
    "id": "person_1956_04",
    "title_ko": "이중섭 — 소를 그린 화가, 담뱃갑 은지에 남긴 가족",
    "people": [
      "이중섭"
    ],
    "year": 1956,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1956_04"
  },
  {
    "id": "organization_1957_01",
    "title_ko": "자유당 당무위원회 신설 — 이기붕 체제 완성",
    "people": [
      "이기붕"
    ],
    "year": 1957,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1957_01"
  },
  {
    "id": "policy_1957_01",
    "title_ko": "미국 원조의 무상에서 유상 전환",
    "people": [],
    "year": 1957,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=policy_1957_01"
  },
  {
    "id": "movement_1957_01",
    "title_ko": "대한방송(DBC)으로의 경영권 이전",
    "people": [
      "장기영"
    ],
    "year": 1957,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1957_01"
  },
  {
    "id": "movement_1957_02",
    "title_ko": "진보당의 지방 조직 확대",
    "people": [
      "조봉암"
    ],
    "year": 1957,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1957_02"
  },
  {
    "id": "political_1957_01",
    "title_ko": "선거법 협상 — 진보당 견제 움직임",
    "people": [
      "이기붕",
      "조병옥"
    ],
    "year": 1957,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1957_01"
  },
  {
    "id": "economic_1957_01",
    "title_ko": "충주비료공장 준공 — 전후 재건 산업의 상징",
    "people": [],
    "year": 1957,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=economic_1957_01"
  },
  {
    "id": "plot_1958_01",
    "title_ko": "진보당 사건 — 조봉암 체포",
    "people": [
      "조봉암"
    ],
    "year": 1958,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1958_01"
  },
  {
    "id": "political_1958_01",
    "title_ko": "진보당 강제 해산",
    "people": [],
    "year": 1958,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1958_01"
  },
  {
    "id": "political_1958_02",
    "title_ko": "제4대 민의원 선거 — 보수 양당 구도의 고착",
    "people": [],
    "year": 1958,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1958_02"
  },
  {
    "id": "person_1958_01",
    "title_ko": "조봉암 1심 재판 — 사법 파동",
    "people": [
      "조봉암",
      "유병진"
    ],
    "year": 1958,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1958_01"
  },
  {
    "id": "political_1958_03",
    "title_ko": "2·4 보안법 파동",
    "people": [
      "이기붕",
      "조병옥"
    ],
    "year": 1958,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1958_03"
  },
  {
    "id": "person_1958_02",
    "title_ko": "함석헌 — 생각하는 백성이라야 산다",
    "people": [
      "함석헌",
      "장준하"
    ],
    "year": 1958,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1958_02"
  },
  {
    "id": "movement_1959_01",
    "title_ko": "신국가보안법 반대 시위",
    "people": [],
    "year": 1959,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1959_01"
  },
  {
    "id": "plot_1959_01",
    "title_ko": "경향신문 폐간 사건 — 여적 필화",
    "people": [
      "주요한",
      "한창우"
    ],
    "year": 1959,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1959_01"
  },
  {
    "id": "person_1959_01",
    "title_ko": "조봉암 사형 집행",
    "people": [
      "조봉암"
    ],
    "year": 1959,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1959_01"
  },
  {
    "id": "massacre_1959_01",
    "title_ko": "태풍 사라호 — 추석을 덮친 재난",
    "people": [],
    "year": 1959,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1959_01"
  },
  {
    "id": "migration_1959_01",
    "title_ko": "재일교포 북송 시작",
    "people": [],
    "year": 1959,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=migration_1959_01"
  },
  {
    "id": "science_1959_01",
    "title_ko": "원자력연구소 설립과 연구용 원자로 1호 도입",
    "people": [],
    "year": 1959,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=science_1959_01"
  },
  {
    "id": "person_1959_03",
    "title_ko": "최형섭 — 한국 과학기술 행정의 설계자",
    "people": [
      "최형섭"
    ],
    "year": 1959,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1959_03"
  },
  {
    "id": "person_1959_04",
    "title_ko": "우장춘 — 씨 없는 수박이 아니라, 굶주림을 끝내려 한 과학자",
    "people": [
      "우장춘"
    ],
    "year": 1959,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1959_04"
  },
  {
    "id": "movement_1960_00",
    "title_ko": "2·28 대구 학생의거 — 4·19의 도화선",
    "people": [
      "이대우"
    ],
    "year": 1960,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1960_00"
  },
  {
    "id": "plot_1960_01",
    "title_ko": "3·15 부정선거",
    "people": [
      "이승만",
      "이기붕"
    ],
    "year": 1960,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1960_01"
  },
  {
    "id": "massacre_1960_01",
    "title_ko": "김주열의 죽음과 제2차 마산의거",
    "people": [
      "김주열"
    ],
    "year": 1960,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1960_01"
  },
  {
    "id": "movement_1960_01",
    "title_ko": "4·19 혁명",
    "people": [
      "이승만"
    ],
    "year": 1960,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1960_01"
  },
  {
    "id": "political_1960_01",
    "title_ko": "허정 과도정부와 내각책임제 개헌",
    "people": [
      "허정"
    ],
    "year": 1960,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1960_01"
  },
  {
    "id": "organization_1960_01",
    "title_ko": "제2공화국 출범 — 윤보선·장면 체제",
    "people": [
      "윤보선",
      "장면"
    ],
    "year": 1960,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1960_01"
  },
  {
    "id": "movement_1960_05",
    "title_ko": "농촌 인구의 도시 유입 가속 — 이촌향도",
    "people": [],
    "year": 1960,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1960_05"
  },
  {
    "id": "person_1960_06",
    "title_ko": "장면 — 제2공화국 국무총리",
    "people": [
      "장면"
    ],
    "year": 1960,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1960_06"
  },
  {
    "id": "person_1960_07",
    "title_ko": "허정 — 과도정부 수반",
    "people": [
      "허정"
    ],
    "year": 1960,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1960_07"
  },
  {
    "id": "person_1961_01",
    "title_ko": "5·16 군사정변",
    "people": [
      "박정희",
      "장도영"
    ],
    "year": 1961,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1961_01"
  },
  {
    "id": "organization_1961_01",
    "title_ko": "국가재건최고회의 — 군정의 시작",
    "people": [
      "박정희",
      "장도영"
    ],
    "year": 1961,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1961_01"
  },
  {
    "id": "policy_1961_01",
    "title_ko": "정당·사회단체 해산과 정치활동 금지",
    "people": [],
    "year": 1961,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=policy_1961_01"
  },
  {
    "id": "organization_1961_02",
    "title_ko": "중앙정보부 창설",
    "people": [
      "김종필"
    ],
    "year": 1961,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1961_02"
  },
  {
    "id": "political_1961_01",
    "title_ko": "8·12 선언 — 민정이양 로드맵",
    "people": [
      "박정희"
    ],
    "year": 1961,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1961_01"
  },
  {
    "id": "policy_1962_01",
    "title_ko": "제1차 경제개발 5개년 계획 공표",
    "people": [],
    "year": 1962,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=policy_1962_01"
  },
  {
    "id": "policy_1962_02",
    "title_ko": "화폐개혁 — 환에서 원으로",
    "people": [],
    "year": 1962,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=policy_1962_02"
  },
  {
    "id": "policy_1962_03",
    "title_ko": "정치활동정화법 시행",
    "people": [],
    "year": 1962,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=policy_1962_03"
  },
  {
    "id": "political_1962_01",
    "title_ko": "제3공화국 헌법 국민투표",
    "people": [],
    "year": 1962,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1962_01"
  },
  {
    "id": "organization_1962_01",
    "title_ko": "전국경제인연합회 결성과 관민협력체제",
    "people": [
      "이병철"
    ],
    "year": 1962,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1962_01"
  },
  {
    "id": "economic_1962_03",
    "title_ko": "울산공업센터 지정 — 산업화의 첫 전초지",
    "people": [],
    "year": 1962,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=economic_1962_03"
  },
  {
    "id": "policy_1962_04",
    "title_ko": "가족계획사업 시작 — 산아제한 정책",
    "people": [],
    "year": 1962,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=policy_1962_04"
  },
  {
    "id": "organization_1963_01",
    "title_ko": "민주공화당 창당",
    "people": [
      "박정희",
      "김종필"
    ],
    "year": 1963,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1963_01"
  },
  {
    "id": "political_1963_01",
    "title_ko": "제5대 대통령 선거 — 박정희 당선",
    "people": [
      "박정희",
      "윤보선"
    ],
    "year": 1963,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1963_01"
  },
  {
    "id": "organization_1963_02",
    "title_ko": "제3공화국 출범",
    "people": [
      "박정희"
    ],
    "year": 1963,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1963_02"
  },
  {
    "id": "political_1963_02",
    "title_ko": "제6대 국회의원 선거",
    "people": [],
    "year": 1963,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1963_02"
  },
  {
    "id": "person_1963_01",
    "title_ko": "중앙선거관리위원회 창설",
    "people": [],
    "year": 1963,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1963_01"
  },
  {
    "id": "movement_1964_01",
    "title_ko": "대일굴욕외교반대 범국민투쟁위원회 결성",
    "people": [
      "윤보선"
    ],
    "year": 1964,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1964_01"
  },
  {
    "id": "movement_1964_02",
    "title_ko": "민족적 민주주의 장례식",
    "people": [],
    "year": 1964,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1964_02"
  },
  {
    "id": "movement_1964_03",
    "title_ko": "6·3 항쟁 — 비상계엄 선포",
    "people": [
      "박정희"
    ],
    "year": 1964,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1964_03"
  },
  {
    "id": "political_1964_01",
    "title_ko": "베트남 파병 동의안 가결",
    "people": [],
    "year": 1964,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1964_01"
  },
  {
    "id": "plot_1964_01",
    "title_ko": "제1차 인민혁명당 사건",
    "people": [
      "도예종"
    ],
    "year": 1964,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1964_01"
  },
  {
    "id": "economic_1964_01",
    "title_ko": "수출진흥확대회의 신설 — 수출 드라이브의 시작",
    "people": [
      "박정희"
    ],
    "year": 1964,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=economic_1964_01"
  },
  {
    "id": "person_1964_05",
    "title_ko": "이미자, \"동백아가씨\" — 최초의 밀리언셀러와 금지곡 수난",
    "people": [
      "이미자"
    ],
    "year": 1964,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1964_05"
  },
  {
    "id": "movement_1965_01",
    "title_ko": "한일협정 비준반대투쟁",
    "people": [],
    "year": 1965,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1965_01"
  },
  {
    "id": "political_1965_01",
    "title_ko": "한일기본조약 조인",
    "people": [
      "이동원",
      "김종필"
    ],
    "year": 1965,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1965_01"
  },
  {
    "id": "movement_1965_02",
    "title_ko": "한일협정 비준 — 위수령과 무장군인 투입",
    "people": [],
    "year": 1965,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1965_02"
  },
  {
    "id": "political_1965_02",
    "title_ko": "청룡부대 — 최초의 전투부대 파병",
    "people": [],
    "year": 1965,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1965_02"
  },
  {
    "id": "person_1965_01",
    "title_ko": "김중배 사망 — 비준반대투쟁의 첫 희생",
    "people": [
      "김중배"
    ],
    "year": 1965,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1965_01"
  },
  {
    "id": "person_1965_03",
    "title_ko": "이병철 — 삼성그룹과 사업보국",
    "people": [
      "이병철"
    ],
    "year": 1965,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1965_03"
  },
  {
    "id": "person_1965_04",
    "title_ko": "박수근 — 가장 가난한 시대를 가장 따뜻하게 그리다",
    "people": [
      "박수근"
    ],
    "year": 1965,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1965_04"
  },
  {
    "id": "plot_1966_01",
    "title_ko": "한국비료 사카린 밀수 사건",
    "people": [
      "이병철"
    ],
    "year": 1966,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1966_01"
  },
  {
    "id": "political_1966_01",
    "title_ko": "국회 오물투척사건",
    "people": [
      "김두한"
    ],
    "year": 1966,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1966_01"
  },
  {
    "id": "organization_1966_01",
    "title_ko": "신민당 창당",
    "people": [
      "유진오"
    ],
    "year": 1966,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1966_01"
  },
  {
    "id": "political_1966_02",
    "title_ko": "브라운 각서",
    "people": [],
    "year": 1966,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1966_02"
  },
  {
    "id": "political_1966_03",
    "title_ko": "백마부대 추가 파병",
    "people": [],
    "year": 1966,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1966_03"
  },
  {
    "id": "diplomacy_1966_02",
    "title_ko": "브라운 각서 후속 — 베트남 전투부대 추가 파병 협상",
    "people": [],
    "year": 1966,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=diplomacy_1966_02"
  },
  {
    "id": "person_1966_04",
    "title_ko": "김기수 — 한국 최초의 프로복싱 세계챔피언",
    "people": [
      "김기수"
    ],
    "year": 1966,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1966_04"
  },
  {
    "id": "organization_1967_01",
    "title_ko": "신민당 야권 후보 단일화",
    "people": [
      "윤보선",
      "유진오"
    ],
    "year": 1967,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1967_01"
  },
  {
    "id": "political_1967_01",
    "title_ko": "제6대 대통령 선거 — 박정희 재선",
    "people": [
      "박정희",
      "윤보선"
    ],
    "year": 1967,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1967_01"
  },
  {
    "id": "plot_1967_01",
    "title_ko": "6·8 부정선거",
    "people": [],
    "year": 1967,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1967_01"
  },
  {
    "id": "movement_1967_01",
    "title_ko": "6·8부정선거 규탄시위",
    "people": [],
    "year": 1967,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1967_01"
  },
  {
    "id": "plot_1967_02",
    "title_ko": "동백림(東伯林) 사건 — \"동베를린\"을 거점으로 조작된 간첩단",
    "people": [
      "윤이상",
      "이응노",
      "천상병"
    ],
    "year": 1967,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1967_02"
  },
  {
    "id": "person_1967_01",
    "title_ko": "윤이상 — 동백림 사건, 세계적 작곡가를 납치한 나라",
    "people": [
      "윤이상"
    ],
    "year": 1967,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1967_01"
  },
  {
    "id": "person_1968_01",
    "title_ko": "1·21 사태 — 청와대 기습 미수",
    "people": [
      "김신조",
      "박정희"
    ],
    "year": 1968,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1968_01"
  },
  {
    "id": "political_1968_01",
    "title_ko": "푸에블로호 납북 사건",
    "people": [],
    "year": 1968,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1968_01"
  },
  {
    "id": "organization_1968_01",
    "title_ko": "향토예비군 창설",
    "people": [],
    "year": 1968,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1968_01"
  },
  {
    "id": "policy_1968_01",
    "title_ko": "국민교육헌장 선포",
    "people": [
      "박정희"
    ],
    "year": 1968,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=policy_1968_01"
  },
  {
    "id": "massacre_1968_01",
    "title_ko": "울진·삼척 무장공비 침투사건",
    "people": [],
    "year": 1968,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1968_01"
  },
  {
    "id": "plot_1968_02",
    "title_ko": "통일혁명당 사건",
    "people": [
      "김종태"
    ],
    "year": 1968,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1968_02"
  },
  {
    "id": "person_1968_03",
    "title_ko": "신영복 — 통일혁명당 사건 연루와 20년 수감",
    "people": [
      "신영복"
    ],
    "year": 1968,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1968_03"
  },
  {
    "id": "plot_1968_03",
    "title_ko": "남조선해방전략당 사건",
    "people": [
      "권재혁"
    ],
    "year": 1968,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1968_03"
  },
  {
    "id": "massacre_1968_02",
    "title_ko": "베트남 퐁니·퐁넛 학살 — 한국군에 의한 민간인 희생",
    "people": [],
    "year": 1968,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1968_02"
  },
  {
    "id": "economic_1968_03",
    "title_ko": "경부고속도로 기공",
    "people": [
      "박정희"
    ],
    "year": 1968,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=economic_1968_03"
  },
  {
    "id": "economic_1968_04",
    "title_ko": "포항종합제철 기공",
    "people": [
      "박태준"
    ],
    "year": 1968,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=economic_1968_04"
  },
  {
    "id": "person_1968_02",
    "title_ko": "박태준 — \"제철보국\"과 포항제철 신화",
    "people": [
      "박태준"
    ],
    "year": 1968,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1968_02"
  },
  {
    "id": "person_1968_04",
    "title_ko": "김수영 — 풀이 눕고 다시 일어서듯",
    "people": [
      "김수영"
    ],
    "year": 1968,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1968_04"
  },
  {
    "id": "plot_1969_01",
    "title_ko": "국민복지회 사건 — 김종필 제거",
    "people": [
      "김종필"
    ],
    "year": 1969,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1969_01"
  },
  {
    "id": "political_1969_01",
    "title_ko": "3선개헌안 국회 변칙 통과",
    "people": [
      "박정희"
    ],
    "year": 1969,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1969_01"
  },
  {
    "id": "political_1969_02",
    "title_ko": "3선개헌 국민투표 확정",
    "people": [],
    "year": 1969,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1969_02"
  },
  {
    "id": "policy_1969_01",
    "title_ko": "주민등록증 발급제 시행",
    "people": [],
    "year": 1969,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=policy_1969_01"
  },
  {
    "id": "political_1969_03",
    "title_ko": "권오병 문교부장관 해임건의안 가결",
    "people": [
      "권오병",
      "김종필"
    ],
    "year": 1969,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1969_03"
  },
  {
    "id": "diplomacy_1969_01",
    "title_ko": "닉슨 독트린과 주한미군 철수 논의의 시작",
    "people": [
      "닉슨"
    ],
    "year": 1969,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=diplomacy_1969_01"
  },
  {
    "id": "culture_1969_02",
    "title_ko": "컬러텔레비전 국내 연구 착수",
    "people": [],
    "year": 1969,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=culture_1969_02"
  },
  {
    "id": "massacre_1970_01",
    "title_ko": "와우아파트 붕괴 사고",
    "people": [],
    "year": 1970,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1970_01"
  },
  {
    "id": "policy_1970_01",
    "title_ko": "경부고속도로 개통",
    "people": [
      "박정희"
    ],
    "year": 1970,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=policy_1970_01"
  },
  {
    "id": "policy_1970_02",
    "title_ko": "새마을가꾸기 사업 시작",
    "people": [
      "박정희"
    ],
    "year": 1970,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=policy_1970_02"
  },
  {
    "id": "person_1970_01",
    "title_ko": "전태일 분신",
    "people": [
      "전태일",
      "이소선"
    ],
    "year": 1970,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1970_01"
  },
  {
    "id": "movement_1970_01",
    "title_ko": "교련 강화 반대 운동의 시작",
    "people": [],
    "year": 1970,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1970_01"
  },
  {
    "id": "person_1970_02",
    "title_ko": "김환기 — 점화, 뉴욕의 밤하늘에 고국을 찍다",
    "people": [
      "김환기"
    ],
    "year": 1970,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1970_02"
  },
  {
    "id": "political_1971_01",
    "title_ko": "제7대 대통령 선거 — 박정희 대 김대중",
    "people": [
      "박정희",
      "김대중"
    ],
    "year": 1971,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1971_01"
  },
  {
    "id": "political_1971_02",
    "title_ko": "제8대 국회의원 선거 — 야당의 약진",
    "people": [],
    "year": 1971,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1971_02"
  },
  {
    "id": "movement_1971_01",
    "title_ko": "8·10 성남민권운동 (광주대단지 사건)",
    "people": [],
    "year": 1971,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1971_01"
  },
  {
    "id": "movement_1971_02",
    "title_ko": "한진 KAL빌딩 방화사건",
    "people": [
      "강대봉"
    ],
    "year": 1971,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1971_02"
  },
  {
    "id": "movement_1971_03",
    "title_ko": "교련철폐투쟁 격화",
    "people": [],
    "year": 1971,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1971_03"
  },
  {
    "id": "massacre_1971_01",
    "title_ko": "실미도 사건 — 버려진 북파공작원들의 최후",
    "people": [],
    "year": 1971,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1971_01"
  },
  {
    "id": "plot_1971_01",
    "title_ko": "재일교포 유학생 형제 간첩단 조작 — 서승·서준식",
    "people": [
      "서승",
      "서준식"
    ],
    "year": 1971,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1971_01"
  },
  {
    "id": "diplomacy_1971_02",
    "title_ko": "주한미군 제7사단 철수 완료",
    "people": [],
    "year": 1971,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=diplomacy_1971_02"
  },
  {
    "id": "science_1971_03",
    "title_ko": "한국과학원(KAIST) 설립",
    "people": [],
    "year": 1971,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=science_1971_03"
  },
  {
    "id": "political_1972_01",
    "title_ko": "7·4 남북공동성명",
    "people": [],
    "year": 1972,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1972_01"
  },
  {
    "id": "political_1972_02",
    "title_ko": "10·17 비상조치 — 유신 선포",
    "people": [
      "박정희"
    ],
    "year": 1972,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1972_02"
  },
  {
    "id": "political_1972_03",
    "title_ko": "유신헌법 국민투표 — 헌정의 형식적 정당화",
    "people": [],
    "year": 1972,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1972_03"
  },
  {
    "id": "organization_1972_01",
    "title_ko": "통일주체국민회의 출범",
    "people": [],
    "year": 1972,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1972_01"
  },
  {
    "id": "person_1972_01",
    "title_ko": "박정희, 제8대 대통령 재선출",
    "people": [
      "박정희"
    ],
    "year": 1972,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1972_01"
  },
  {
    "id": "economic_1972_03",
    "title_ko": "8·3 조치 — 사채동결과 중화학공업 자금 조성",
    "people": [],
    "year": 1972,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=economic_1972_03"
  },
  {
    "id": "person_1973_01",
    "title_ko": "김대중 납치사건",
    "people": [
      "김대중"
    ],
    "year": 1973,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1973_01"
  },
  {
    "id": "movement_1973_01",
    "title_ko": "유신 반대 학생운동의 시작",
    "people": [],
    "year": 1973,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1973_01"
  },
  {
    "id": "movement_1973_02",
    "title_ko": "개헌청원 100만인 서명운동",
    "people": [
      "장준하",
      "함석헌",
      "백기완"
    ],
    "year": 1973,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1973_02"
  },
  {
    "id": "political_1973_01",
    "title_ko": "6·23 평화통일 선언",
    "people": [
      "박정희"
    ],
    "year": 1973,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1973_01"
  },
  {
    "id": "political_1973_02",
    "title_ko": "제1차 석유파동의 충격",
    "people": [],
    "year": 1973,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1973_02"
  },
  {
    "id": "migration_1973_01",
    "title_ko": "주월한국군 완전 철수 — 8년 6개월 파병의 끝",
    "people": [],
    "year": 1973,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=migration_1973_01"
  },
  {
    "id": "economic_1973_04",
    "title_ko": "중화학공업화 선언",
    "people": [
      "박정희"
    ],
    "year": 1973,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=economic_1973_04"
  },
  {
    "id": "economic_1973_05",
    "title_ko": "포항종합제철 1기 준공 — 일관제철소의 탄생",
    "people": [
      "박태준"
    ],
    "year": 1973,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=economic_1973_05"
  },
  {
    "id": "culture_1973_06",
    "title_ko": "가요 검열 강화와 금지곡 양산",
    "people": [],
    "year": 1973,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=culture_1973_06"
  },
  {
    "id": "political_1974_01",
    "title_ko": "긴급조치 1·2호 선포",
    "people": [
      "박정희"
    ],
    "year": 1974,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1974_01"
  },
  {
    "id": "person_1974_01",
    "title_ko": "장준하·백기완 구속",
    "people": [
      "장준하",
      "백기완"
    ],
    "year": 1974,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1974_01"
  },
  {
    "id": "plot_1974_01",
    "title_ko": "민청학련 사건과 인혁당 재건위 조작",
    "people": [],
    "year": 1974,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1974_01"
  },
  {
    "id": "person_1974_02",
    "title_ko": "8·15 저격사건 — 육영수 서거",
    "people": [
      "박정희",
      "육영수"
    ],
    "year": 1974,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1974_02"
  },
  {
    "id": "movement_1974_01",
    "title_ko": "자유언론실천선언",
    "people": [],
    "year": 1974,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1974_01"
  },
  {
    "id": "culture_1974_02",
    "title_ko": "청년문화 논쟁 — 통기타·생맥주·장발 단속",
    "people": [],
    "year": 1974,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=culture_1974_02"
  },
  {
    "id": "person_1974_03",
    "title_ko": "신중현 — \"한국 록의 대부\"와 금지곡 통째 낙인",
    "people": [
      "신중현"
    ],
    "year": 1974,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1974_03"
  },
  {
    "id": "plot_1975_01",
    "title_ko": "인혁당 재건위 사건 — 사법살인",
    "people": [],
    "year": 1975,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1975_01"
  },
  {
    "id": "movement_1975_01",
    "title_ko": "동아일보 기자 강제 해직과 동아투위 결성",
    "people": [],
    "year": 1975,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1975_01"
  },
  {
    "id": "political_1975_01",
    "title_ko": "남베트남 패망의 충격",
    "people": [],
    "year": 1975,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1975_01"
  },
  {
    "id": "political_1975_02",
    "title_ko": "긴급조치 9호 — 유신체제 최강의 억압",
    "people": [
      "박정희"
    ],
    "year": 1975,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1975_02"
  },
  {
    "id": "organization_1975_01",
    "title_ko": "학도호국단 재창설 — 학원의 병영화",
    "people": [],
    "year": 1975,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1975_01"
  },
  {
    "id": "person_1975_02",
    "title_ko": "장준하 의문사",
    "people": [
      "장준하"
    ],
    "year": 1975,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1975_02"
  },
  {
    "id": "plot_1975_02",
    "title_ko": "형제복지원 — 부랑인 단속이라는 이름의 강제수용소",
    "people": [
      "박인근"
    ],
    "year": 1975,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1975_02"
  },
  {
    "id": "plot_1975_03",
    "title_ko": "11·22 재일교포 유학생 간첩단 조작",
    "people": [
      "김기춘"
    ],
    "year": 1975,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1975_03"
  },
  {
    "id": "movement_1976_01",
    "title_ko": "원주선언 — 교회 일치 운동의 결집",
    "people": [
      "문익환",
      "함세웅"
    ],
    "year": 1976,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1976_01"
  },
  {
    "id": "movement_1976_02",
    "title_ko": "3·1 민주구국선언 — 명동사건",
    "people": [
      "윤보선",
      "김대중",
      "문익환",
      "함석헌"
    ],
    "year": 1976,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1976_02"
  },
  {
    "id": "political_1976_01",
    "title_ko": "3·1민주구국선언 관련자 재판",
    "people": [],
    "year": 1976,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1976_01"
  },
  {
    "id": "battle_1976_01",
    "title_ko": "판문점 도끼 만행 사건",
    "people": [],
    "year": 1976,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=battle_1976_01"
  },
  {
    "id": "plot_1976_01",
    "title_ko": "코리아게이트 — 박동선 로비 스캔들",
    "people": [
      "박동선"
    ],
    "year": 1976,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1976_01"
  },
  {
    "id": "person_1976_03",
    "title_ko": "양정모 — 광복 후 첫 올림픽 금메달",
    "people": [
      "양정모"
    ],
    "year": 1976,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1976_03"
  },
  {
    "id": "political_1977_01",
    "title_ko": "수출 100억 달러 달성",
    "people": [
      "박정희"
    ],
    "year": 1977,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1977_01"
  },
  {
    "id": "movement_1977_01",
    "title_ko": "함평 고구마 사건",
    "people": [
      "서경원"
    ],
    "year": 1977,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1977_01"
  },
  {
    "id": "massacre_1977_01",
    "title_ko": "이리역 폭발사고",
    "people": [],
    "year": 1977,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1977_01"
  },
  {
    "id": "political_1977_02",
    "title_ko": "카터 인권외교와 주한미군 철수 논쟁",
    "people": [],
    "year": 1977,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1977_02"
  },
  {
    "id": "movement_1977_02",
    "title_ko": "동일방직 여성 지부장 재선출과 갈등 심화",
    "people": [
      "이총각"
    ],
    "year": 1977,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1977_02"
  },
  {
    "id": "economic_1977_02",
    "title_ko": "의료보험법 시행 — 직장 의료보험의 첫걸음",
    "people": [],
    "year": 1977,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=economic_1977_02"
  },
  {
    "id": "person_1977_03",
    "title_ko": "이휘소 — 노벨상에 가장 가까웠던 한국인 물리학자, 42세에 숨지다",
    "people": [
      "이휘소"
    ],
    "year": 1977,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1977_03"
  },
  {
    "id": "person_1977_04",
    "title_ko": "리영희 — 우상에 맞선 이성, 필화로 감옥에 간 기자",
    "people": [
      "리영희"
    ],
    "year": 1977,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1977_04"
  },
  {
    "id": "movement_1978_01",
    "title_ko": "동일방직 똥물사건",
    "people": [
      "이총각"
    ],
    "year": 1978,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1978_01"
  },
  {
    "id": "person_1978_01",
    "title_ko": "박정희, 제9대 대통령 당선",
    "people": [
      "박정희"
    ],
    "year": 1978,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1978_01"
  },
  {
    "id": "political_1978_01",
    "title_ko": "제10대 국회의원 선거 — 야당의 득표율 역전",
    "people": [],
    "year": 1978,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1978_01"
  },
  {
    "id": "policy_1978_01",
    "title_ko": "부가가치세 도입",
    "people": [],
    "year": 1978,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=policy_1978_01"
  },
  {
    "id": "political_1978_02",
    "title_ko": "중화학공업 과잉투자와 경제 불안의 그림자",
    "people": [],
    "year": 1978,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1978_02"
  },
  {
    "id": "science_1978_02",
    "title_ko": "고리원자력발전소 1호기 준공 — 최초 상업 원전 가동",
    "people": [],
    "year": 1978,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=science_1978_02"
  },
  {
    "id": "diplomacy_1978_03",
    "title_ko": "한미연합사령부(CFC) 창설",
    "people": [],
    "year": 1978,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=diplomacy_1978_03"
  },
  {
    "id": "person_1978_02",
    "title_ko": "차범근, 분데스리가 데뷔 — 한국 선수 유럽 진출의 시작",
    "people": [
      "차범근"
    ],
    "year": 1978,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1978_02"
  },
  {
    "id": "person_1978_03",
    "title_ko": "조세희 — 난장이가 쏘아올린 작은 공",
    "people": [
      "조세희"
    ],
    "year": 1978,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1978_03"
  },
  {
    "id": "movement_1979_01",
    "title_ko": "YH무역 사건",
    "people": [],
    "year": 1979,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1979_01"
  },
  {
    "id": "movement_1979_02",
    "title_ko": "부마항쟁",
    "people": [
      "김영삼"
    ],
    "year": 1979,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1979_02"
  },
  {
    "id": "person_1979_01",
    "title_ko": "10·26사건 — 박정희 피살",
    "people": [
      "박정희",
      "김재규"
    ],
    "year": 1979,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1979_01"
  },
  {
    "id": "person_1979_02",
    "title_ko": "최규하 권한대행 — 유신 철폐를 향한 짧은 기대",
    "people": [
      "최규하"
    ],
    "year": 1979,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1979_02"
  },
  {
    "id": "person_1979_03",
    "title_ko": "12·12 군사반란",
    "people": [
      "전두환",
      "노태우"
    ],
    "year": 1979,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1979_03"
  },
  {
    "id": "person_1979_04",
    "title_ko": "정승화, 총장 공관에서 강제 연행되다",
    "people": [
      "정승화"
    ],
    "year": 1979,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1979_04"
  },
  {
    "id": "person_1979_05",
    "title_ko": "장태완, 진압을 시도하다 좌절되다",
    "people": [
      "장태완"
    ],
    "year": 1979,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1979_05"
  },
  {
    "id": "person_1979_06",
    "title_ko": "김오랑 — 반란군에 맞서다 숨진 소령",
    "people": [
      "김오랑",
      "정병주"
    ],
    "year": 1979,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1979_06"
  },
  {
    "id": "movement_1980_01",
    "title_ko": "서울의 봄 — 학생운동과 민주화 요구",
    "people": [],
    "year": 1980,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1980_01"
  },
  {
    "id": "political_1980_01",
    "title_ko": "5·17 비상계엄 전국확대",
    "people": [
      "전두환"
    ],
    "year": 1980,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1980_01"
  },
  {
    "id": "massacre_1980_01",
    "title_ko": "5·18 — 공수부대 투입과 초기 진압 (5.18~20)",
    "people": [],
    "year": 1980,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1980_01"
  },
  {
    "id": "massacre_1980_02",
    "title_ko": "5·21 전남도청 앞 집단발포와 헬기사격",
    "people": [],
    "year": 1980,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1980_02"
  },
  {
    "id": "massacre_1980_03",
    "title_ko": "광주 봉쇄와 외곽 지역 학살 (5.22~26)",
    "people": [],
    "year": 1980,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1980_03"
  },
  {
    "id": "massacre_1980_04",
    "title_ko": "5·27 도청 진압작전 — 항쟁의 마지막 새벽",
    "people": [],
    "year": 1980,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1980_04"
  },
  {
    "id": "organization_1980_01",
    "title_ko": "국가보위비상대책위원회(국보위) 설치",
    "people": [
      "전두환"
    ],
    "year": 1980,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1980_01"
  },
  {
    "id": "person_1980_01",
    "title_ko": "전두환 제11대 대통령 취임",
    "people": [
      "전두환"
    ],
    "year": 1980,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1980_01"
  },
  {
    "id": "culture_1980_05",
    "title_ko": "컬러텔레비전 방송 전면 실시",
    "people": [],
    "year": 1980,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=culture_1980_05"
  },
  {
    "id": "person_1980_06",
    "title_ko": "최규하 — 제10대 대통령",
    "people": [
      "최규하"
    ],
    "year": 1980,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1980_06"
  },
  {
    "id": "person_1980_07",
    "title_ko": "정주영 — 현대그룹과 중공업 신화",
    "people": [
      "정주영"
    ],
    "year": 1980,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1980_07"
  },
  {
    "id": "person_1980_08",
    "title_ko": "백인엽 — 선인학원 비리, 특별감사로 드러나다",
    "people": [
      "백인엽"
    ],
    "year": 1980,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1980_08"
  },
  {
    "id": "person_1980_09",
    "title_ko": "최종현 — 선경에서 SK그룹으로, 에너지·통신 진출의 승부수",
    "people": [
      "최종현"
    ],
    "year": 1980,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1980_09"
  },
  {
    "id": "person_1980_10",
    "title_ko": "조용필, \"창밖의 여자\" — \"오빠부대\" 시대의 개막",
    "people": [
      "조용필"
    ],
    "year": 1980,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1980_10"
  },
  {
    "id": "policy_1981_01",
    "title_ko": "삼청교육대",
    "people": [
      "전두환"
    ],
    "year": 1981,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=policy_1981_01"
  },
  {
    "id": "plot_1981_01",
    "title_ko": "김대중 내란음모 조작사건 — 사형 확정과 감형",
    "people": [
      "김대중",
      "전두환"
    ],
    "year": 1981,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1981_01"
  },
  {
    "id": "policy_1981_02",
    "title_ko": "언론통폐합",
    "people": [],
    "year": 1981,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=policy_1981_02"
  },
  {
    "id": "political_1981_01",
    "title_ko": "민주정의당 창당과 제12대 대통령 선거 — 제5공화국 출범",
    "people": [
      "전두환"
    ],
    "year": 1981,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1981_01"
  },
  {
    "id": "person_1981_01",
    "title_ko": "전두환 제12대 대통령 정식 취임",
    "people": [
      "전두환"
    ],
    "year": 1981,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1981_01"
  },
  {
    "id": "plot_1981_02",
    "title_ko": "부림사건 — \"부산의 학림사건\"",
    "people": [
      "노무현",
      "김광일",
      "문재인"
    ],
    "year": 1981,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1981_02"
  },
  {
    "id": "culture_1981_02",
    "title_ko": "국풍81 개최 — 관제 문화축제 논란",
    "people": [],
    "year": 1981,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=culture_1981_02"
  },
  {
    "id": "plot_1982_01",
    "title_ko": "부산 미국문화원 방화사건",
    "people": [
      "문부식"
    ],
    "year": 1982,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1982_01"
  },
  {
    "id": "massacre_1982_01",
    "title_ko": "의령 경찰관 총기난동 사건",
    "people": [],
    "year": 1982,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=massacre_1982_01"
  },
  {
    "id": "policy_1982_01",
    "title_ko": "야간통행금지 해제",
    "people": [],
    "year": 1982,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=policy_1982_01"
  },
  {
    "id": "plot_1982_02",
    "title_ko": "장영자·이철희 어음사기 사건",
    "people": [
      "장영자"
    ],
    "year": 1982,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1982_02"
  },
  {
    "id": "movement_1982_01",
    "title_ko": "한국 프로야구 출범",
    "people": [],
    "year": 1982,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1982_01"
  },
  {
    "id": "science_1982_02",
    "title_ko": "SDN 구축 — 한국 최초 컴퓨터 네트워크 연결",
    "people": [],
    "year": 1982,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=science_1982_02"
  },
  {
    "id": "political_1983_01",
    "title_ko": "중국 민항기 불시착 사건",
    "people": [],
    "year": 1983,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1983_01"
  },
  {
    "id": "political_1983_02",
    "title_ko": "대한항공 007편 격추 사건",
    "people": [],
    "year": 1983,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1983_02"
  },
  {
    "id": "person_1983_01",
    "title_ko": "아웅산 묘소 테러 사건",
    "people": [
      "전두환",
      "서석준",
      "이범석"
    ],
    "year": 1983,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1983_01"
  },
  {
    "id": "movement_1983_01",
    "title_ko": "KBS 이산가족찾기 생방송",
    "people": [],
    "year": 1983,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1983_01"
  },
  {
    "id": "policy_1983_01",
    "title_ko": "학원자율화조치",
    "people": [
      "전두환"
    ],
    "year": 1983,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=policy_1983_01"
  },
  {
    "id": "organization_1984_01",
    "title_ko": "민주화추진협의회(민추협) 결성",
    "people": [
      "김영삼",
      "김대중"
    ],
    "year": 1984,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1984_01"
  },
  {
    "id": "movement_1984_01",
    "title_ko": "대학 총학생회 직선제 부활",
    "people": [],
    "year": 1984,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1984_01"
  },
  {
    "id": "organization_1984_02",
    "title_ko": "민주화추진위원회(깃발) 결성",
    "people": [
      "문용식"
    ],
    "year": 1984,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1984_02"
  },
  {
    "id": "organization_1984_03",
    "title_ko": "민중민주운동협의회 결성과 재야 세력의 결집",
    "people": [],
    "year": 1984,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1984_03"
  },
  {
    "id": "person_1984_01",
    "title_ko": "김대중 귀국 시도와 좌절",
    "people": [
      "김대중"
    ],
    "year": 1984,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1984_01"
  },
  {
    "id": "person_1984_03",
    "title_ko": "백남준 — 비디오 아트와 〈굿모닝 미스터 오웰〉",
    "people": [
      "백남준"
    ],
    "year": 1984,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1984_03"
  },
  {
    "id": "organization_1985_01",
    "title_ko": "신한민주당(신민당) 창당",
    "people": [],
    "year": 1985,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1985_01"
  },
  {
    "id": "person_1985_01",
    "title_ko": "김대중 귀국과 가택연금",
    "people": [
      "김대중"
    ],
    "year": 1985,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1985_01"
  },
  {
    "id": "political_1985_01",
    "title_ko": "2·12 총선 — 신민당의 돌풍",
    "people": [],
    "year": 1985,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1985_01"
  },
  {
    "id": "organization_1985_02",
    "title_ko": "민주통일민중운동연합(민통련) 결성",
    "people": [
      "문익환"
    ],
    "year": 1985,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1985_02"
  },
  {
    "id": "policy_1985_01",
    "title_ko": "정치인 해금 조치",
    "people": [
      "전두환"
    ],
    "year": 1985,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=policy_1985_01"
  },
  {
    "id": "plot_1985_01",
    "title_ko": "이근안 — \"얼굴 없는 고문기술자\"",
    "people": [
      "이근안",
      "김근태"
    ],
    "year": 1985,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1985_01"
  },
  {
    "id": "movement_1986_01",
    "title_ko": "1천만 개헌서명운동",
    "people": [
      "김영삼",
      "김대중"
    ],
    "year": 1986,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1986_01"
  },
  {
    "id": "movement_1986_02",
    "title_ko": "5·3 인천 사태",
    "people": [],
    "year": 1986,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1986_02"
  },
  {
    "id": "plot_1986_01",
    "title_ko": "부천경찰서 성고문 사건",
    "people": [
      "권인숙",
      "문귀동"
    ],
    "year": 1986,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1986_01"
  },
  {
    "id": "plot_1986_02",
    "title_ko": "보도지침 폭로 사건",
    "people": [
      "김태홍",
      "김주언"
    ],
    "year": 1986,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1986_02"
  },
  {
    "id": "movement_1986_03",
    "title_ko": "10·28 건국대학교 항쟁",
    "people": [],
    "year": 1986,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1986_03"
  },
  {
    "id": "economic_1986_03",
    "title_ko": "현대 포니, 미국 첫 자동차 수출",
    "people": [],
    "year": 1986,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=economic_1986_03"
  },
  {
    "id": "science_1986_01",
    "title_ko": "64K DRAM 양산 — 반도체 기술 자립의 발판",
    "people": [],
    "year": 1986,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=science_1986_01"
  },
  {
    "id": "economic_1986_04",
    "title_ko": "3저 호황 — 저유가·저금리·저달러가 겹친 성장",
    "people": [],
    "year": 1986,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=economic_1986_04"
  },
  {
    "id": "plot_1987_01",
    "title_ko": "박종철 고문치사 사건",
    "people": [
      "박종철"
    ],
    "year": 1987,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1987_01"
  },
  {
    "id": "political_1987_01",
    "title_ko": "4·13 호헌조치",
    "people": [
      "전두환"
    ],
    "year": 1987,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1987_01"
  },
  {
    "id": "person_1987_01",
    "title_ko": "이한열 최루탄 피격",
    "people": [
      "이한열"
    ],
    "year": 1987,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1987_01"
  },
  {
    "id": "movement_1987_01",
    "title_ko": "6월 민주항쟁",
    "people": [],
    "year": 1987,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1987_01"
  },
  {
    "id": "political_1987_02",
    "title_ko": "6·29 선언",
    "people": [
      "노태우"
    ],
    "year": 1987,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1987_02"
  },
  {
    "id": "plot_1987_02",
    "title_ko": "오대양 집단 사망 사건",
    "people": [
      "박순자"
    ],
    "year": 1987,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1987_02"
  },
  {
    "id": "organization_1988_01",
    "title_ko": "노태우 취임 — 제6공화국 출범",
    "people": [
      "노태우"
    ],
    "year": 1988,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1988_01"
  },
  {
    "id": "political_1988_01",
    "title_ko": "제13대 국회의원 선거 — 여소야대 정국",
    "people": [],
    "year": 1988,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1988_01"
  },
  {
    "id": "political_1988_02",
    "title_ko": "5공비리 청문회 — 헌정사 최초의 청문회",
    "people": [
      "전두환"
    ],
    "year": 1988,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1988_02"
  },
  {
    "id": "movement_1988_01",
    "title_ko": "서울올림픽 개최",
    "people": [],
    "year": 1988,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1988_01"
  },
  {
    "id": "policy_1988_01",
    "title_ko": "정치 풍자·표현 자유 허용",
    "people": [
      "노태우"
    ],
    "year": 1988,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=policy_1988_01"
  },
  {
    "id": "diplomacy_1988_02",
    "title_ko": "노태우 7·7 선언 — 북방외교의 공식 출발",
    "people": [
      "노태우"
    ],
    "year": 1988,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=diplomacy_1988_02"
  },
  {
    "id": "economic_1988_03",
    "title_ko": "4메가 D램 개발 성공 — 메모리 반도체 자립",
    "people": [],
    "year": 1988,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=economic_1988_03"
  },
  {
    "id": "political_1989_01",
    "title_ko": "한·헝가리 수교 — 북방외교의 시작",
    "people": [
      "노태우"
    ],
    "year": 1989,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1989_01"
  },
  {
    "id": "organization_1989_01",
    "title_ko": "전국교직원노동조합(전교조) 결성",
    "people": [
      "윤영규"
    ],
    "year": 1989,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1989_01"
  },
  {
    "id": "person_1989_01",
    "title_ko": "문익환 목사 방북",
    "people": [
      "문익환"
    ],
    "year": 1989,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1989_01"
  },
  {
    "id": "person_1989_02",
    "title_ko": "임수경 평양축전 참가 사건",
    "people": [
      "임수경"
    ],
    "year": 1989,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1989_02"
  },
  {
    "id": "policy_1989_01",
    "title_ko": "해외여행 전면 자유화",
    "people": [],
    "year": 1989,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=policy_1989_01"
  },
  {
    "id": "person_1989_03",
    "title_ko": "노무현, 명패를 던지다 — \"청문회 스타\"의 탄생",
    "people": [
      "노무현"
    ],
    "year": 1989,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1989_03"
  },
  {
    "id": "economic_1989_03",
    "title_ko": "전국민 의료보험 시대 개막",
    "people": [],
    "year": 1989,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=economic_1989_03"
  },
  {
    "id": "movement_1989_04",
    "title_ko": "주택 200만 가구 건설계획 — 분당·평촌 신도시",
    "people": [],
    "year": 1989,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=movement_1989_04"
  },
  {
    "id": "political_1990_01",
    "title_ko": "3당 합당 선언",
    "people": [
      "노태우",
      "김영삼",
      "김종필"
    ],
    "year": 1990,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1990_01"
  },
  {
    "id": "organization_1990_01",
    "title_ko": "민주자유당(민자당) 창당",
    "people": [
      "노태우",
      "김영삼",
      "김종필"
    ],
    "year": 1990,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1990_01"
  },
  {
    "id": "political_1990_02",
    "title_ko": "한·소 수교",
    "people": [
      "노태우",
      "고르바초프"
    ],
    "year": 1990,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1990_02"
  },
  {
    "id": "policy_1990_01",
    "title_ko": "범죄와의 전쟁 선포",
    "people": [
      "노태우"
    ],
    "year": 1990,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=policy_1990_01"
  },
  {
    "id": "political_1990_03",
    "title_ko": "평화민주당의 고립과 호남 대 비호남 구도",
    "people": [
      "김대중"
    ],
    "year": 1990,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1990_03"
  },
  {
    "id": "science_1990_02",
    "title_ko": "우리별 위성 개발 계획 착수",
    "people": [],
    "year": 1990,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=science_1990_02"
  },
  {
    "id": "culture_1990_03",
    "title_ko": "가요 사전심의제 폐지 논의 — 표현 자유의 확장",
    "people": [],
    "year": 1990,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=culture_1990_03"
  },
  {
    "id": "person_1991_01",
    "title_ko": "강경대 사망과 분신정국",
    "people": [
      "강경대"
    ],
    "year": 1991,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1991_01"
  },
  {
    "id": "political_1991_01",
    "title_ko": "남북 유엔 동시가입",
    "people": [],
    "year": 1991,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1991_01"
  },
  {
    "id": "political_1991_02",
    "title_ko": "남북기본합의서 채택",
    "people": [
      "정원식",
      "연형묵"
    ],
    "year": 1991,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1991_02"
  },
  {
    "id": "organization_1991_01",
    "title_ko": "지방의회 선거 부활",
    "people": [],
    "year": 1991,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1991_01"
  },
  {
    "id": "political_1991_03",
    "title_ko": "한반도 비핵화 공동선언",
    "people": [],
    "year": 1991,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1991_03"
  },
  {
    "id": "diplomacy_1991_04",
    "title_ko": "한·베트남 관계 개선 협상 — 적대국에서 수교국으로",
    "people": [],
    "year": 1991,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=diplomacy_1991_04"
  },
  {
    "id": "political_1992_01",
    "title_ko": "제14대 국회의원 선거",
    "people": [
      "정주영"
    ],
    "year": 1992,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1992_01"
  },
  {
    "id": "political_1992_02",
    "title_ko": "한·중 수교",
    "people": [
      "이상옥",
      "노태우"
    ],
    "year": 1992,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1992_02"
  },
  {
    "id": "plot_1992_01",
    "title_ko": "초원복집 사건",
    "people": [
      "김기춘"
    ],
    "year": 1992,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=plot_1992_01"
  },
  {
    "id": "political_1992_03",
    "title_ko": "제14대 대통령 선거 — 김영삼 당선",
    "people": [
      "김영삼",
      "김대중",
      "정주영"
    ],
    "year": 1992,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1992_03"
  },
  {
    "id": "person_1992_01",
    "title_ko": "정주영의 통일국민당 창당과 대선 도전",
    "people": [
      "정주영"
    ],
    "year": 1992,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1992_01"
  },
  {
    "id": "science_1992_03",
    "title_ko": "우리별 1호 발사 성공 — 첫 국적 인공위성",
    "people": [],
    "year": 1992,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=science_1992_03"
  },
  {
    "id": "culture_1992_04",
    "title_ko": "서태지와 아이들 데뷔 — 대중음악 세대교체",
    "people": [
      "서태지"
    ],
    "year": 1992,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=culture_1992_04"
  },
  {
    "id": "person_1992_02",
    "title_ko": "한경직, 템플턴상 수상과 신사참배 참회",
    "people": [
      "한경직"
    ],
    "year": 1992,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=person_1992_02"
  },
  {
    "id": "organization_1993_01",
    "title_ko": "김영삼 취임 — 문민정부 출범",
    "people": [
      "김영삼"
    ],
    "year": 1993,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=organization_1993_01"
  },
  {
    "id": "policy_1993_01",
    "title_ko": "하나회 해체",
    "people": [
      "김영삼"
    ],
    "year": 1993,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=policy_1993_01"
  },
  {
    "id": "policy_1993_02",
    "title_ko": "공직자 재산 공개",
    "people": [
      "김영삼"
    ],
    "year": 1993,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=policy_1993_02"
  },
  {
    "id": "policy_1993_03",
    "title_ko": "금융실명제 전격 도입",
    "people": [
      "김영삼"
    ],
    "year": 1993,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=policy_1993_03"
  },
  {
    "id": "political_1993_01",
    "title_ko": "5·16을 군사정변으로 규정 — 역사 바로 세우기",
    "people": [
      "김영삼"
    ],
    "year": 1993,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=political_1993_01"
  },
  {
    "id": "science_1993_02",
    "title_ko": "대덕연구단지, 과학기술 클러스터로 성장",
    "people": [],
    "year": 1993,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=science_1993_02"
  },
  {
    "id": "economic_1993_01",
    "title_ko": "이건희 프랑크푸르트 신경영 선언 — \"마누라와 자식 빼고 다 바꿔라\"",
    "people": [
      "이건희"
    ],
    "year": 1993,
    "mapKey": "modern2",
    "mapLabel": "근현대 (1945~1993)",
    "url": "/maps/modern2/index.html?event=economic_1993_01"
  },
  {
    "id": "disaster_1994_01",
    "title_ko": "성수대교 붕괴",
    "people": [],
    "year": 1994,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=disaster_1994_01"
  },
  {
    "id": "political_1994_01",
    "title_ko": "김일성 사망",
    "people": [
      "김일성",
      "김정일"
    ],
    "year": 1994,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_1994_01"
  },
  {
    "id": "political_1994_02",
    "title_ko": "지존파 사건",
    "people": [],
    "year": 1994,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_1994_02"
  },
  {
    "id": "diplomacy_1994_01",
    "title_ko": "북미 제네바 합의 — 1차 북핵위기 봉합",
    "people": [],
    "year": 1994,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_1994_01"
  },
  {
    "id": "person_1994_03",
    "title_ko": "박찬호, 메이저리그 데뷔 — 한국인 최초 빅리거",
    "people": [
      "박찬호"
    ],
    "year": 1994,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=person_1994_03"
  },
  {
    "id": "person_1994_04",
    "title_ko": "박경리, 대하소설 토지를 25년 만에 완간하다",
    "people": [
      "박경리"
    ],
    "year": 1994,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=person_1994_04"
  },
  {
    "id": "disaster_1995_01",
    "title_ko": "대구 지하철 공사장 가스폭발",
    "people": [],
    "year": 1995,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=disaster_1995_01"
  },
  {
    "id": "disaster_1995_02",
    "title_ko": "삼풍백화점 붕괴",
    "people": [],
    "year": 1995,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=disaster_1995_02"
  },
  {
    "id": "political_1995_01",
    "title_ko": "제1회 전국동시지방선거",
    "people": [],
    "year": 1995,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_1995_01"
  },
  {
    "id": "political_1995_02",
    "title_ko": "전두환·노태우 구속 — 역사바로세우기",
    "people": [
      "전두환",
      "노태우"
    ],
    "year": 1995,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_1995_02"
  },
  {
    "id": "economic_1995_01",
    "title_ko": "부동산실명제 시행",
    "people": [],
    "year": 1995,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_1995_01"
  },
  {
    "id": "political_1996_01",
    "title_ko": "제15대 국회의원 총선거",
    "people": [],
    "year": 1996,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_1996_01"
  },
  {
    "id": "movement_1996_01",
    "title_ko": "연세대 사태 — 한총련 통일축전 충돌",
    "people": [],
    "year": 1996,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=movement_1996_01"
  },
  {
    "id": "battle_1996_01",
    "title_ko": "강릉 무장공비 침투사건",
    "people": [],
    "year": 1996,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=battle_1996_01"
  },
  {
    "id": "diplomacy_1996_01",
    "title_ko": "OECD 가입",
    "people": [],
    "year": 1996,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_1996_01"
  },
  {
    "id": "political_1996_02",
    "title_ko": "노동법·안기부법 날치기 처리",
    "people": [],
    "year": 1996,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_1996_02"
  },
  {
    "id": "science_1996_01",
    "title_ko": "CDMA 세계 최초 상용화",
    "people": [],
    "year": 1996,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=science_1996_01"
  },
  {
    "id": "organization_1996_02",
    "title_ko": "H.O.T. 데뷔 — 아이돌 시스템의 시작",
    "people": [],
    "year": 1996,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=organization_1996_02"
  },
  {
    "id": "organization_1996_03",
    "title_ko": "영생교와 아가동산 — 격리 공동체 사건들",
    "people": [
      "조희성",
      "김기순"
    ],
    "year": 1996,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=organization_1996_03"
  },
  {
    "id": "economic_1997_01",
    "title_ko": "한보사태 — 외환위기의 서막",
    "people": [],
    "year": 1997,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_1997_01"
  },
  {
    "id": "economic_1997_02",
    "title_ko": "기아그룹 부도유예",
    "people": [],
    "year": 1997,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_1997_02"
  },
  {
    "id": "disaster_1997_01",
    "title_ko": "대한항공 801편 괌 추락",
    "people": [],
    "year": 1997,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=disaster_1997_01"
  },
  {
    "id": "economic_1997_03",
    "title_ko": "IMF 구제금융 — 국가부도의 날",
    "people": [
      "임창열"
    ],
    "year": 1997,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_1997_03"
  },
  {
    "id": "political_1997_01",
    "title_ko": "제15대 대통령 선거 — 첫 여야 정권교체",
    "people": [
      "김대중",
      "이회창"
    ],
    "year": 1997,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_1997_01"
  },
  {
    "id": "political_1997_02",
    "title_ko": "전두환·노태우 대법원 확정 — 반란과 내란의 사법적 단죄",
    "people": [
      "전두환",
      "노태우"
    ],
    "year": 1997,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_1997_02"
  },
  {
    "id": "political_1998_01",
    "title_ko": "김대중 대통령 취임",
    "people": [
      "김대중"
    ],
    "year": 1998,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_1998_01"
  },
  {
    "id": "political_1998_02",
    "title_ko": "노사정위원회 출범",
    "people": [],
    "year": 1998,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_1998_02"
  },
  {
    "id": "diplomacy_1998_01",
    "title_ko": "정주영 소떼 방북",
    "people": [
      "정주영"
    ],
    "year": 1998,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_1998_01"
  },
  {
    "id": "economic_1998_01",
    "title_ko": "IMF 관리체제 본격화 — 대량실업과 기업 구조조정",
    "people": [],
    "year": 1998,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_1998_01"
  },
  {
    "id": "diplomacy_1998_02",
    "title_ko": "금강산 관광 시작",
    "people": [],
    "year": 1998,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_1998_02"
  },
  {
    "id": "person_1998_03",
    "title_ko": "박세리, US여자오픈 우승 — \"맨발의 투혼\"",
    "people": [
      "박세리"
    ],
    "year": 1998,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=person_1998_03"
  },
  {
    "id": "battle_1999_01",
    "title_ko": "제1연평해전",
    "people": [],
    "year": 1999,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=battle_1999_01"
  },
  {
    "id": "disaster_1999_01",
    "title_ko": "씨랜드 청소년수련원 화재",
    "people": [],
    "year": 1999,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=disaster_1999_01"
  },
  {
    "id": "political_1999_01",
    "title_ko": "옷로비 사건",
    "people": [],
    "year": 1999,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_1999_01"
  },
  {
    "id": "economic_1999_01",
    "title_ko": "대우그룹 해체",
    "people": [],
    "year": 1999,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_1999_01"
  },
  {
    "id": "diplomacy_1999_01",
    "title_ko": "동티모르 상록수부대 파병",
    "people": [],
    "year": 1999,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_1999_01"
  },
  {
    "id": "organization_1999_01",
    "title_ko": "이해진, 네이버컴 창업",
    "people": [
      "이해진"
    ],
    "year": 1999,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=organization_1999_01"
  },
  {
    "id": "science_1999_02",
    "title_ko": "초고속인터넷 세계 최초 ADSL 상용화",
    "people": [],
    "year": 1999,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=science_1999_02"
  },
  {
    "id": "diplomacy_2000_01",
    "title_ko": "6·15 남북정상회담",
    "people": [
      "김대중",
      "김정일"
    ],
    "year": 2000,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2000_01"
  },
  {
    "id": "political_2000_01",
    "title_ko": "김대중, 노벨평화상 수상",
    "people": [
      "김대중"
    ],
    "year": 2000,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2000_01"
  },
  {
    "id": "political_2000_02",
    "title_ko": "제16대 국회의원 총선거",
    "people": [],
    "year": 2000,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2000_02"
  },
  {
    "id": "policy_2000_01",
    "title_ko": "의약분업 시행",
    "people": [],
    "year": 2000,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=policy_2000_01"
  },
  {
    "id": "diplomacy_2000_02",
    "title_ko": "남북 이산가족 상봉 재개",
    "people": [],
    "year": 2000,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2000_02"
  },
  {
    "id": "person_2000_01",
    "title_ko": "김대중, 한국인 최초 노벨평화상 수상",
    "people": [
      "김대중"
    ],
    "year": 2000,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=person_2000_01"
  },
  {
    "id": "policy_2001_01",
    "title_ko": "인천국제공항 개항",
    "people": [],
    "year": 2001,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=policy_2001_01"
  },
  {
    "id": "economic_2001_01",
    "title_ko": "IMF 차입금 전액 조기 상환",
    "people": [],
    "year": 2001,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_2001_01"
  },
  {
    "id": "political_2001_01",
    "title_ko": "여성부 출범",
    "people": [],
    "year": 2001,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2001_01"
  },
  {
    "id": "movement_2001_01",
    "title_ko": "이수현, 일본 지하철 의인 사건",
    "people": [
      "이수현"
    ],
    "year": 2001,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=movement_2001_01"
  },
  {
    "id": "political_2001_02",
    "title_ko": "대통령 아들 비리 의혹 (이용호 게이트 등)",
    "people": [
      "김홍업"
    ],
    "year": 2001,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2001_02"
  },
  {
    "id": "culture_2002_01",
    "title_ko": "2002 한일 월드컵 — 4강 신화",
    "people": [],
    "year": 2002,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=culture_2002_01"
  },
  {
    "id": "battle_2002_01",
    "title_ko": "제2연평해전",
    "people": [],
    "year": 2002,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=battle_2002_01"
  },
  {
    "id": "movement_2002_01",
    "title_ko": "효순·미선 사건과 촛불집회의 시작",
    "people": [],
    "year": 2002,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=movement_2002_01"
  },
  {
    "id": "political_2002_01",
    "title_ko": "제16대 대통령 선거 — 노무현 당선",
    "people": [
      "노무현",
      "이회창"
    ],
    "year": 2002,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2002_01"
  },
  {
    "id": "economic_2002_01",
    "title_ko": "신용카드 남발 — 카드대란의 전조",
    "people": [],
    "year": 2002,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_2002_01"
  },
  {
    "id": "economic_2002_02",
    "title_ko": "서정진, 셀트리온 설립 — 바이오시밀러 신화의 시작",
    "people": [
      "서정진"
    ],
    "year": 2002,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_2002_02"
  },
  {
    "id": "political_2003_01",
    "title_ko": "노무현 대통령 취임",
    "people": [
      "노무현"
    ],
    "year": 2003,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2003_01"
  },
  {
    "id": "disaster_2003_01",
    "title_ko": "대구 지하철 참사",
    "people": [],
    "year": 2003,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=disaster_2003_01"
  },
  {
    "id": "political_2003_02",
    "title_ko": "대북송금 특검",
    "people": [],
    "year": 2003,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2003_02"
  },
  {
    "id": "economic_2003_01",
    "title_ko": "카드대란 — 신용불량자 400만 시대",
    "people": [],
    "year": 2003,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_2003_01"
  },
  {
    "id": "diplomacy_2003_01",
    "title_ko": "이라크 파병 동의안 국회 통과",
    "people": [],
    "year": 2003,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2003_01"
  },
  {
    "id": "diplomacy_2003_02",
    "title_ko": "6자회담 시작 — 북핵 문제의 다자 협상",
    "people": [],
    "year": 2003,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2003_02"
  },
  {
    "id": "political_2004_01",
    "title_ko": "노무현 대통령 탄핵소추 — 헌재 기각",
    "people": [
      "노무현"
    ],
    "year": 2004,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2004_01"
  },
  {
    "id": "political_2004_02",
    "title_ko": "제17대 국회의원 총선거 — 탄핵 역풍",
    "people": [],
    "year": 2004,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2004_02"
  },
  {
    "id": "political_2004_03",
    "title_ko": "김선일 피살 사건",
    "people": [
      "김선일"
    ],
    "year": 2004,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2004_03"
  },
  {
    "id": "policy_2004_01",
    "title_ko": "성매매특별법 시행",
    "people": [],
    "year": 2004,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=policy_2004_01"
  },
  {
    "id": "diplomacy_2004_01",
    "title_ko": "자이툰부대 이라크 파병",
    "people": [],
    "year": 2004,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2004_01"
  },
  {
    "id": "diplomacy_2004_02",
    "title_ko": "나경원 등 국회의원, 일본 자위대 창설 50주년 행사 참석",
    "people": [
      "나경원"
    ],
    "year": 2004,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2004_02"
  },
  {
    "id": "organization_2004_01",
    "title_ko": "자유주의연대 창립 — 뉴라이트 운동의 시작",
    "people": [
      "신지호",
      "홍진표"
    ],
    "year": 2004,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=organization_2004_01"
  },
  {
    "id": "person_2004_04",
    "title_ko": "박찬욱, 〈올드보이〉로 칸 심사위원대상",
    "people": [
      "박찬욱"
    ],
    "year": 2004,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=person_2004_04"
  },
  {
    "id": "person_2004_05",
    "title_ko": "김향안 별세 — 천재들의 빛 속에서 온전히 자신으로 산 여성",
    "people": [
      "김향안",
      "이상",
      "김환기"
    ],
    "year": 2004,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=person_2004_05"
  },
  {
    "id": "political_2005_01",
    "title_ko": "교과서포럼 결성",
    "people": [],
    "year": 2005,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2005_01"
  },
  {
    "id": "political_2005_02",
    "title_ko": "황우석 논문조작 사건",
    "people": [
      "황우석"
    ],
    "year": 2005,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2005_02"
  },
  {
    "id": "diplomacy_2005_01",
    "title_ko": "APEC 정상회의 부산 개최",
    "people": [],
    "year": 2005,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2005_01"
  },
  {
    "id": "policy_2005_01",
    "title_ko": "청계천 복원 완료",
    "people": [
      "이명박"
    ],
    "year": 2005,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=policy_2005_01"
  },
  {
    "id": "policy_2005_02",
    "title_ko": "행정중심복합도시(세종시) 특별법 제정",
    "people": [],
    "year": 2005,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=policy_2005_02"
  },
  {
    "id": "organization_2005_01",
    "title_ko": "뉴라이트전국연합 창립",
    "people": [
      "김진홍"
    ],
    "year": 2005,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=organization_2005_01"
  },
  {
    "id": "diplomacy_2006_01",
    "title_ko": "반기문, UN 사무총장 선출",
    "people": [
      "반기문"
    ],
    "year": 2006,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2006_01"
  },
  {
    "id": "political_2006_02",
    "title_ko": "이승만 국부론과 건국절 논쟁",
    "people": [
      "이승만"
    ],
    "year": 2006,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2006_02"
  },
  {
    "id": "political_2006_01",
    "title_ko": "제4회 전국동시지방선거 — 한나라당 압승",
    "people": [],
    "year": 2006,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2006_01"
  },
  {
    "id": "diplomacy_2006_02",
    "title_ko": "북한 1차 핵실험",
    "people": [],
    "year": 2006,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2006_02"
  },
  {
    "id": "diplomacy_2006_03",
    "title_ko": "한미 FTA 협상 개시",
    "people": [],
    "year": 2006,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2006_03"
  },
  {
    "id": "person_2006_01",
    "title_ko": "백남준 별세 — 비디오아트의 아버지",
    "people": [
      "백남준"
    ],
    "year": 2006,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=person_2006_01"
  },
  {
    "id": "diplomacy_2007_01",
    "title_ko": "반기문, UN 사무총장 취임",
    "people": [
      "반기문"
    ],
    "year": 2007,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2007_01"
  },
  {
    "id": "diplomacy_2007_02",
    "title_ko": "2차 남북정상회담 — 10·4 선언",
    "people": [
      "노무현",
      "김정일"
    ],
    "year": 2007,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2007_02"
  },
  {
    "id": "disaster_2007_01",
    "title_ko": "태안 기름유출 사고",
    "people": [],
    "year": 2007,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=disaster_2007_01"
  },
  {
    "id": "political_2007_01",
    "title_ko": "제17대 대통령 선거 — 이명박 당선",
    "people": [
      "이명박"
    ],
    "year": 2007,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2007_01"
  },
  {
    "id": "political_2007_02",
    "title_ko": "BBK 주가조작 의혹",
    "people": [
      "이명박"
    ],
    "year": 2007,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2007_02"
  },
  {
    "id": "political_2008_01",
    "title_ko": "이명박 대통령 취임",
    "people": [
      "이명박"
    ],
    "year": 2008,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2008_01"
  },
  {
    "id": "disaster_2008_01",
    "title_ko": "숭례문 화재",
    "people": [],
    "year": 2008,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=disaster_2008_01"
  },
  {
    "id": "movement_2008_01",
    "title_ko": "미국산 쇠고기 수입 반대 촛불시위",
    "people": [],
    "year": 2008,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=movement_2008_01"
  },
  {
    "id": "diplomacy_2008_01",
    "title_ko": "금강산 관광객 피격 사망 사건",
    "people": [
      "박왕자"
    ],
    "year": 2008,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2008_01"
  },
  {
    "id": "economic_2008_01",
    "title_ko": "글로벌 금융위기 한국 상륙",
    "people": [],
    "year": 2008,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_2008_01"
  },
  {
    "id": "person_2008_06",
    "title_ko": "박태환, 올림픽 수영 첫 금메달 — \"마린보이\"의 탄생",
    "people": [
      "박태환"
    ],
    "year": 2008,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=person_2008_06"
  },
  {
    "id": "political_2008_07",
    "title_ko": "이명박, 한반도 대운하 백지화 선언 — 그러나 4대강으로 전환",
    "people": [
      "이명박"
    ],
    "year": 2008,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2008_07"
  },
  {
    "id": "person_2009_02",
    "title_ko": "장자연 사건",
    "people": [
      "장자연"
    ],
    "year": 2009,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=person_2009_02"
  },
  {
    "id": "movement_2009_01",
    "title_ko": "용산참사",
    "people": [],
    "year": 2009,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=movement_2009_01"
  },
  {
    "id": "political_2009_01",
    "title_ko": "노무현 전 대통령 서거",
    "people": [
      "노무현"
    ],
    "year": 2009,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2009_01"
  },
  {
    "id": "political_2009_02",
    "title_ko": "김대중 전 대통령 서거",
    "people": [
      "김대중"
    ],
    "year": 2009,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2009_02"
  },
  {
    "id": "policy_2009_01",
    "title_ko": "미디어법 날치기 처리",
    "people": [],
    "year": 2009,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=policy_2009_01"
  },
  {
    "id": "economic_2009_01",
    "title_ko": "4대강 사업 착공",
    "people": [
      "이명박"
    ],
    "year": 2009,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_2009_01"
  },
  {
    "id": "science_2009_01",
    "title_ko": "아이폰 국내 출시 — 스마트폰 시대 개막",
    "people": [],
    "year": 2009,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=science_2009_01"
  },
  {
    "id": "person_2009_03",
    "title_ko": "김수환 추기경 선종 — 바보처럼 살다 간 사제",
    "people": [
      "김수환"
    ],
    "year": 2009,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=person_2009_03"
  },
  {
    "id": "political_2009_03",
    "title_ko": "친일반민족행위진상규명위, 1,005명 공식 발표",
    "people": [],
    "year": 2009,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2009_03"
  },
  {
    "id": "battle_2010_01",
    "title_ko": "천안함 피격 사건",
    "people": [],
    "year": 2010,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=battle_2010_01"
  },
  {
    "id": "battle_2010_02",
    "title_ko": "연평도 포격",
    "people": [],
    "year": 2010,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=battle_2010_02"
  },
  {
    "id": "diplomacy_2010_01",
    "title_ko": "G20 서울 정상회의",
    "people": [],
    "year": 2010,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2010_01"
  },
  {
    "id": "economic_2010_01",
    "title_ko": "저축은행 부실사태 전조",
    "people": [],
    "year": 2010,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_2010_01"
  },
  {
    "id": "culture_2010_01",
    "title_ko": "한류의 확산 — K-POP 아이돌 그룹의 해외 진출",
    "people": [],
    "year": 2010,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=culture_2010_01"
  },
  {
    "id": "organization_2010_01",
    "title_ko": "일베저장소 등장 — 온라인 극우 커뮤니티의 부상",
    "people": [],
    "year": 2010,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=organization_2010_01"
  },
  {
    "id": "organization_2010_02",
    "title_ko": "카카오톡 출시 — 김범수의 두 번째 벤처 신화",
    "people": [
      "김범수"
    ],
    "year": 2010,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=organization_2010_02"
  },
  {
    "id": "person_2010_03",
    "title_ko": "김연아, 밴쿠버올림픽 피겨 금메달 — 세계신기록 우승",
    "people": [
      "김연아"
    ],
    "year": 2010,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=person_2010_03"
  },
  {
    "id": "economic_2011_01",
    "title_ko": "저축은행 영업정지 사태",
    "people": [
      "윤석열"
    ],
    "year": 2011,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_2011_01"
  },
  {
    "id": "movement_2011_01",
    "title_ko": "반값등록금 시위",
    "people": [],
    "year": 2011,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=movement_2011_01"
  },
  {
    "id": "diplomacy_2011_01",
    "title_ko": "한미 FTA 국회 비준 — 날치기 논란",
    "people": [],
    "year": 2011,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2011_01"
  },
  {
    "id": "diplomacy_2011_02",
    "title_ko": "김정일 사망",
    "people": [
      "김정일",
      "김정은"
    ],
    "year": 2011,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2011_02"
  },
  {
    "id": "political_2011_01",
    "title_ko": "서울시장 보궐선거 — 박원순 당선",
    "people": [
      "박원순"
    ],
    "year": 2011,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2011_01"
  },
  {
    "id": "person_2011_01",
    "title_ko": "박완서 별세 — 전쟁과 일상을 함께 증언한 작가",
    "people": [
      "박완서"
    ],
    "year": 2011,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=person_2011_01"
  },
  {
    "id": "political_2012_01",
    "title_ko": "제19대 국회의원 총선거",
    "people": [],
    "year": 2012,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2012_01"
  },
  {
    "id": "culture_2012_01",
    "title_ko": "2012 여수 세계박람회",
    "people": [],
    "year": 2012,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=culture_2012_01"
  },
  {
    "id": "political_2012_02",
    "title_ko": "국가정보원 여론조작 의혹 발각",
    "people": [],
    "year": 2012,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2012_02"
  },
  {
    "id": "political_2012_03",
    "title_ko": "제18대 대통령 선거 — 박근혜 당선",
    "people": [
      "박근혜",
      "문재인"
    ],
    "year": 2012,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2012_03"
  },
  {
    "id": "diplomacy_2012_01",
    "title_ko": "이명박 대통령 독도 방문",
    "people": [
      "이명박"
    ],
    "year": 2012,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2012_01"
  },
  {
    "id": "economic_2012_01",
    "title_ko": "SK, 하이닉스반도체 인수 — \"신의 한 수\"",
    "people": [
      "최태원"
    ],
    "year": 2012,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_2012_01"
  },
  {
    "id": "economic_2012_02",
    "title_ko": "4대강 사업 준공, 그리고 건설사 담합 비리 첫 적발",
    "people": [
      "이명박"
    ],
    "year": 2012,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_2012_02"
  },
  {
    "id": "political_2013_06",
    "title_ko": "김학의 별장 성접대 의혹",
    "people": [
      "김학의"
    ],
    "year": 2013,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2013_06"
  },
  {
    "id": "political_2013_01",
    "title_ko": "박근혜 대통령 취임",
    "people": [
      "박근혜"
    ],
    "year": 2013,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2013_01"
  },
  {
    "id": "political_2013_02",
    "title_ko": "박유하 《제국의 위안부》 출간 논란",
    "people": [
      "박유하"
    ],
    "year": 2013,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2013_02"
  },
  {
    "id": "diplomacy_2013_01",
    "title_ko": "개성공단 잠정 중단",
    "people": [],
    "year": 2013,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2013_01"
  },
  {
    "id": "political_2013_03",
    "title_ko": "윤창중 성추행 사건",
    "people": [
      "윤창중"
    ],
    "year": 2013,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2013_03"
  },
  {
    "id": "political_2013_04",
    "title_ko": "국정원 댓글 사건 국정조사",
    "people": [],
    "year": 2013,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2013_04"
  },
  {
    "id": "science_2013_01",
    "title_ko": "나로호 발사 성공 — 세계 11번째 스페이스클럽 가입",
    "people": [],
    "year": 2013,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=science_2013_01"
  },
  {
    "id": "person_2013_05",
    "title_ko": "류현진, 메이저리그 진출 — KBO 포스팅 시스템 첫 성공 사례",
    "people": [
      "류현진"
    ],
    "year": 2013,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=person_2013_05"
  },
  {
    "id": "political_2013_05",
    "title_ko": "감사원, \"4대강은 대운하 재추진용\" — 보 설계 부실도 확인",
    "people": [
      "이명박"
    ],
    "year": 2013,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2013_05"
  },
  {
    "id": "disaster_2014_01",
    "title_ko": "세월호 참사",
    "people": [],
    "year": 2014,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=disaster_2014_01"
  },
  {
    "id": "movement_2014_02",
    "title_ko": "광화문 폭식 투쟁 논란",
    "people": [],
    "year": 2014,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=movement_2014_02"
  },
  {
    "id": "person_2014_03",
    "title_ko": "가수 신해철 사망 — 의료과실 논란",
    "people": [
      "신해철"
    ],
    "year": 2014,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=person_2014_03"
  },
  {
    "id": "political_2014_01",
    "title_ko": "정윤회 문건 유출 파동",
    "people": [
      "정윤회",
      "최순실"
    ],
    "year": 2014,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2014_01"
  },
  {
    "id": "disaster_2014_02",
    "title_ko": "판교 테크노밸리 환풍구 붕괴 사고",
    "people": [],
    "year": 2014,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=disaster_2014_02"
  },
  {
    "id": "political_2014_02",
    "title_ko": "통합진보당 해산",
    "people": [],
    "year": 2014,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2014_02"
  },
  {
    "id": "political_2014_03",
    "title_ko": "대한항공 땅콩 회항 사건",
    "people": [
      "조현아"
    ],
    "year": 2014,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2014_03"
  },
  {
    "id": "political_2015_01",
    "title_ko": "국정교과서 파동",
    "people": [],
    "year": 2015,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2015_01"
  },
  {
    "id": "disaster_2015_01",
    "title_ko": "메르스(MERS) 사태",
    "people": [],
    "year": 2015,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=disaster_2015_01"
  },
  {
    "id": "political_2015_02",
    "title_ko": "성완종 리스트 파문",
    "people": [
      "성완종"
    ],
    "year": 2015,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2015_02"
  },
  {
    "id": "diplomacy_2015_01",
    "title_ko": "한일 위안부 합의",
    "people": [],
    "year": 2015,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2015_01"
  },
  {
    "id": "policy_2015_01",
    "title_ko": "노동시장 구조개혁 2대 지침",
    "people": [],
    "year": 2015,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=policy_2015_01"
  },
  {
    "id": "organization_2015_01",
    "title_ko": "메갈리아 개설",
    "people": [],
    "year": 2015,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=organization_2015_01"
  },
  {
    "id": "economic_2015_01",
    "title_ko": "삼성물산-제일모직 합병 가결 — 이재용 승계 리스크의 시작",
    "people": [
      "이재용"
    ],
    "year": 2015,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_2015_01"
  },
  {
    "id": "political_2015_03",
    "title_ko": "강기훈 유서대필 사건 — 24년 만의 무죄 확정",
    "people": [
      "강기훈",
      "곽상도"
    ],
    "year": 2015,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2015_03"
  },
  {
    "id": "political_2015_04",
    "title_ko": "한명숙 정치자금법 유죄 확정",
    "people": [
      "한명숙"
    ],
    "year": 2015,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2015_04"
  },
  {
    "id": "political_2016_01",
    "title_ko": "박근혜-최순실 국정농단 사건 발각",
    "people": [
      "박근혜",
      "최순실"
    ],
    "year": 2016,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2016_01"
  },
  {
    "id": "movement_2016_01",
    "title_ko": "촛불집회 시작",
    "people": [],
    "year": 2016,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=movement_2016_01"
  },
  {
    "id": "political_2016_02",
    "title_ko": "박근혜 대통령 탄핵소추안 가결",
    "people": [
      "박근혜"
    ],
    "year": 2016,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2016_02"
  },
  {
    "id": "political_2016_03",
    "title_ko": "제20대 국회의원 총선거 — 여소야대",
    "people": [],
    "year": 2016,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2016_03"
  },
  {
    "id": "diplomacy_2016_01",
    "title_ko": "개성공단 전면 중단",
    "people": [],
    "year": 2016,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2016_01"
  },
  {
    "id": "movement_2016_02",
    "title_ko": "강남역 여성살인사건",
    "people": [],
    "year": 2016,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=movement_2016_02"
  },
  {
    "id": "organization_2016_01",
    "title_ko": "워마드 분리 — 메갈리아 분열 사태",
    "people": [],
    "year": 2016,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=organization_2016_01"
  },
  {
    "id": "science_2016_01",
    "title_ko": "알파고-이세돌 대국 — AI 충격의 시작",
    "people": [
      "이세돌"
    ],
    "year": 2016,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=science_2016_01"
  },
  {
    "id": "plot_2016_05",
    "title_ko": "울산 고래고기 환부 사건",
    "people": [],
    "year": 2016,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=plot_2016_05"
  },
  {
    "id": "person_2016_01",
    "title_ko": "신영복 별세 — 감옥으로부터의 사색, 20년 옥살이가 남긴 성찰",
    "people": [
      "신영복"
    ],
    "year": 2016,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=person_2016_01"
  },
  {
    "id": "political_2017_01",
    "title_ko": "헌법재판소, 박근혜 대통령 파면",
    "people": [
      "박근혜"
    ],
    "year": 2017,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2017_01"
  },
  {
    "id": "political_2017_02",
    "title_ko": "박근혜 전 대통령 구속",
    "people": [
      "박근혜"
    ],
    "year": 2017,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2017_02"
  },
  {
    "id": "political_2017_03",
    "title_ko": "제19대 대통령 선거 — 문재인 당선",
    "people": [
      "문재인"
    ],
    "year": 2017,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2017_03"
  },
  {
    "id": "political_2017_04",
    "title_ko": "문재인 대통령 취임",
    "people": [
      "문재인"
    ],
    "year": 2017,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2017_04"
  },
  {
    "id": "diplomacy_2017_01",
    "title_ko": "북한 6차 핵실험 — 수소폭탄 실험",
    "people": [],
    "year": 2017,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2017_01"
  },
  {
    "id": "culture_2018_01",
    "title_ko": "평창 동계올림픽 — 남북 공동입장",
    "people": [],
    "year": 2018,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=culture_2018_01"
  },
  {
    "id": "movement_2018_01",
    "title_ko": "미투(#MeToo) 운동 확산",
    "people": [
      "안희정",
      "이윤택"
    ],
    "year": 2018,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=movement_2018_01"
  },
  {
    "id": "diplomacy_2018_01",
    "title_ko": "4·27 남북정상회담 — 판문점 선언",
    "people": [
      "문재인",
      "김정은"
    ],
    "year": 2018,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2018_01"
  },
  {
    "id": "diplomacy_2018_02",
    "title_ko": "싱가포르 북미정상회담",
    "people": [
      "김정은"
    ],
    "year": 2018,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2018_02"
  },
  {
    "id": "political_2018_01",
    "title_ko": "제7회 전국동시지방선거 — 더불어민주당 압승",
    "people": [],
    "year": 2018,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2018_01"
  },
  {
    "id": "political_2018_02",
    "title_ko": "감사원 4차 감사 — \"이명박이 직접 지시\", 사업 편익 대비 비용 0.21",
    "people": [
      "이명박"
    ],
    "year": 2018,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2018_02"
  },
  {
    "id": "person_2018_04",
    "title_ko": "원세훈 — 국정원 여론조작, 5년 만에 유죄 확정",
    "people": [
      "원세훈"
    ],
    "year": 2018,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=person_2018_04"
  },
  {
    "id": "political_2019_01",
    "title_ko": "조국 사태",
    "people": [
      "조국",
      "윤석열"
    ],
    "year": 2019,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2019_01"
  },
  {
    "id": "political_2019_02",
    "title_ko": "버닝썬 게이트",
    "people": [],
    "year": 2019,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2019_02"
  },
  {
    "id": "disaster_2019_01",
    "title_ko": "강원 산불",
    "people": [],
    "year": 2019,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=disaster_2019_01"
  },
  {
    "id": "diplomacy_2019_01",
    "title_ko": "하노이 북미정상회담 결렬",
    "people": [
      "김정은"
    ],
    "year": 2019,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2019_01"
  },
  {
    "id": "diplomacy_2019_02",
    "title_ko": "한일 지소미아(GSOMIA) 종료 파동",
    "people": [],
    "year": 2019,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2019_02"
  },
  {
    "id": "culture_2019_01",
    "title_ko": "《반일종족주의》 출간",
    "people": [
      "이영훈"
    ],
    "year": 2019,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=culture_2019_01"
  },
  {
    "id": "science_2019_01",
    "title_ko": "5G 세계 최초 상용화",
    "people": [],
    "year": 2019,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=science_2019_01"
  },
  {
    "id": "policy_2019_03",
    "title_ko": "4대강 조사·평가위, 죽산보 등 일부 보 해체 결정",
    "people": [],
    "year": 2019,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=policy_2019_03"
  },
  {
    "id": "political_2019_03",
    "title_ko": "국회 패스트트랙 충돌 — 선거법·공수처법 지정을 둘러싼 몸싸움",
    "people": [
      "나경원",
      "황교안",
      "채이배"
    ],
    "year": 2019,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2019_03"
  },
  {
    "id": "political_2019_04",
    "title_ko": "최경환 국정원 특활비 뇌물 유죄 확정",
    "people": [
      "최경환"
    ],
    "year": 2019,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2019_04"
  },
  {
    "id": "disaster_2020_01",
    "title_ko": "코로나19(COVID-19) 국내 첫 확진자 발생",
    "people": [],
    "year": 2020,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=disaster_2020_01"
  },
  {
    "id": "political_2020_01",
    "title_ko": "N번방 사건",
    "people": [
      "조주빈"
    ],
    "year": 2020,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2020_01"
  },
  {
    "id": "political_2020_02",
    "title_ko": "제21대 국회의원 총선거",
    "people": [],
    "year": 2020,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2020_02"
  },
  {
    "id": "political_2020_03",
    "title_ko": "박원순 서울시장 사망",
    "people": [
      "박원순"
    ],
    "year": 2020,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2020_03"
  },
  {
    "id": "political_2020_04",
    "title_ko": "진실화해를위한과거사정리위원회 2기 출범",
    "people": [],
    "year": 2020,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2020_04"
  },
  {
    "id": "economic_2020_01",
    "title_ko": "이건희 별세 — 이재용 시대 개막",
    "people": [
      "이건희",
      "이재용"
    ],
    "year": 2020,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_2020_01"
  },
  {
    "id": "person_2020_05",
    "title_ko": "봉준호, 〈기생충〉으로 아카데미 4관왕",
    "people": [
      "봉준호"
    ],
    "year": 2020,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=person_2020_05"
  },
  {
    "id": "organization_2020_06",
    "title_ko": "BTS, 빌보드 핫100 1위 — 한국 가수 최초",
    "people": [],
    "year": 2020,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=organization_2020_06"
  },
  {
    "id": "disaster_2020_02",
    "title_ko": "신천지 대구교회 집단감염 — 확정된 것과 안 된 것",
    "people": [
      "이만희"
    ],
    "year": 2020,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=disaster_2020_02"
  },
  {
    "id": "political_2020_05",
    "title_ko": "전광훈과 정치화된 교회 — 광화문 집회와 사법 처리",
    "people": [
      "전광훈"
    ],
    "year": 2020,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2020_05"
  },
  {
    "id": "political_2020_06",
    "title_ko": "윤미향 기소 — 정의기억연대 후원금 횡령 등 혐의",
    "people": [
      "윤미향"
    ],
    "year": 2020,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2020_06"
  },
  {
    "id": "political_2020_07",
    "title_ko": "나경원 자녀 의혹 13건 전건 불기소",
    "people": [
      "나경원"
    ],
    "year": 2020,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2020_07"
  },
  {
    "id": "disaster_2021_01",
    "title_ko": "코로나19 백신 접종 시작",
    "people": [],
    "year": 2021,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=disaster_2021_01"
  },
  {
    "id": "political_2021_01",
    "title_ko": "LH 직원 부동산 투기 의혹",
    "people": [],
    "year": 2021,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2021_01"
  },
  {
    "id": "political_2021_02",
    "title_ko": "대장동 개발 특혜 의혹",
    "people": [
      "이재명"
    ],
    "year": 2021,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2021_02"
  },
  {
    "id": "culture_2021_01",
    "title_ko": "〈오징어 게임〉 세계적 흥행",
    "people": [],
    "year": 2021,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=culture_2021_01"
  },
  {
    "id": "diplomacy_2021_01",
    "title_ko": "2020 도쿄 올림픽 개최 (2021년 연기 개최)",
    "people": [],
    "year": 2021,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2021_01"
  },
  {
    "id": "economic_2021_01",
    "title_ko": "쿠팡, 뉴욕증권거래소 상장",
    "people": [
      "김범석"
    ],
    "year": 2021,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_2021_01"
  },
  {
    "id": "person_2021_01",
    "title_ko": "전두환·노태우 사망 — 국립묘지에 가지 못한 두 전직 대통령",
    "people": [
      "전두환",
      "노태우"
    ],
    "year": 2021,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=person_2021_01"
  },
  {
    "id": "political_2021_03",
    "title_ko": "드루킹 댓글조작 사건 — 김경수 유죄 확정",
    "people": [
      "김경수"
    ],
    "year": 2021,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2021_03"
  },
  {
    "id": "political_2022_01",
    "title_ko": "제20대 대통령 선거 — 윤석열 당선",
    "people": [
      "윤석열",
      "이재명"
    ],
    "year": 2022,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2022_01"
  },
  {
    "id": "political_2022_02",
    "title_ko": "윤석열 대통령 취임",
    "people": [
      "윤석열"
    ],
    "year": 2022,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2022_02"
  },
  {
    "id": "disaster_2022_01",
    "title_ko": "이태원 참사",
    "people": [],
    "year": 2022,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=disaster_2022_01"
  },
  {
    "id": "political_2022_03",
    "title_ko": "제8회 전국동시지방선거",
    "people": [],
    "year": 2022,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2022_03"
  },
  {
    "id": "economic_2022_01",
    "title_ko": "카카오 먹통 사태",
    "people": [],
    "year": 2022,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_2022_01"
  },
  {
    "id": "economic_2022_02",
    "title_ko": "이재용, 삼성전자 회장 취임",
    "people": [
      "이재용"
    ],
    "year": 2022,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_2022_02"
  },
  {
    "id": "science_2022_01",
    "title_ko": "누리호 발사 성공 — 독자 기술 우주발사체 확보",
    "people": [],
    "year": 2022,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=science_2022_01"
  },
  {
    "id": "science_2022_02",
    "title_ko": "다누리, 달 궤도 진입 성공 — 한국 최초 달 탐사선",
    "people": [],
    "year": 2022,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=science_2022_02"
  },
  {
    "id": "person_2022_03",
    "title_ko": "손흥민, 아시아 최초 EPL 득점왕",
    "people": [
      "손흥민"
    ],
    "year": 2022,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=person_2022_03"
  },
  {
    "id": "person_2022_04",
    "title_ko": "이어령 별세 — 시대의 언어를 만든 지성",
    "people": [
      "이어령"
    ],
    "year": 2022,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=person_2022_04"
  },
  {
    "id": "economic_2022_03",
    "title_ko": "레고랜드 사태 — 지방정부발 신용경색",
    "people": [
      "김진태",
      "최문순"
    ],
    "year": 2022,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_2022_03"
  },
  {
    "id": "political_2022_05",
    "title_ko": "정경심 표창장 위조 유죄 확정 — 그러나 남은 의문",
    "people": [
      "정경심",
      "조국",
      "최성해"
    ],
    "year": 2022,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2022_05"
  },
  {
    "id": "political_2022_06",
    "title_ko": "강원랜드 채용비리 — 염동열 유죄, 권성동 무죄",
    "people": [
      "염동열",
      "권성동"
    ],
    "year": 2022,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2022_06"
  },
  {
    "id": "political_2023_07",
    "title_ko": "쌍방울 대북송금 수사와 \"연어 술파티\" 의혹",
    "people": [
      "이화영",
      "박상용"
    ],
    "year": 2023,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2023_07"
  },
  {
    "id": "disaster_2023_01",
    "title_ko": "오송 지하차도 참사",
    "people": [],
    "year": 2023,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=disaster_2023_01"
  },
  {
    "id": "political_2023_01",
    "title_ko": "새만금 세계스카우트잼버리 파행",
    "people": [],
    "year": 2023,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2023_01"
  },
  {
    "id": "diplomacy_2023_01",
    "title_ko": "후쿠시마 오염수 방류 논란",
    "people": [],
    "year": 2023,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2023_01"
  },
  {
    "id": "diplomacy_2023_02",
    "title_ko": "한미일 캠프데이비드 정상회담",
    "people": [
      "윤석열"
    ],
    "year": 2023,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=diplomacy_2023_02"
  },
  {
    "id": "political_2023_02",
    "title_ko": "육군사관학교 홍범도 흉상 이전 논란",
    "people": [
      "홍범도"
    ],
    "year": 2023,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2023_02"
  },
  {
    "id": "political_2023_03",
    "title_ko": "대장동 \"50억 클럽\" — 곽상도 뇌물 혐의 1심 무죄",
    "people": [
      "곽상도"
    ],
    "year": 2023,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2023_03"
  },
  {
    "id": "economic_2023_01",
    "title_ko": "한화, 대우조선해양 인수 — 한화오션 출범",
    "people": [
      "김승연"
    ],
    "year": 2023,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_2023_01"
  },
  {
    "id": "organization_2023_03",
    "title_ko": "블랙핑크, 아시아 최초 코첼라 헤드라이너",
    "people": [],
    "year": 2023,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=organization_2023_03"
  },
  {
    "id": "political_2023_08",
    "title_ko": "채상병 순직 사건과 수사외압 논란",
    "people": [
      "채수근",
      "박정훈",
      "임성근"
    ],
    "year": 2023,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2023_08"
  },
  {
    "id": "economic_2023_02",
    "title_ko": "전세사기 사태와 전세사기특별법",
    "people": [],
    "year": 2023,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_2023_02"
  },
  {
    "id": "plot_2023_01",
    "title_ko": "JMS 정명석 성범죄 — 재기소와 대법원 확정",
    "people": [
      "정명석"
    ],
    "year": 2023,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=plot_2023_01"
  },
  {
    "id": "political_2023_09",
    "title_ko": "이상직 이스타항공 횡령·배임 유죄 확정",
    "people": [
      "이상직"
    ],
    "year": 2023,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2023_09"
  },
  {
    "id": "political_2023_10",
    "title_ko": "최강욱 허위 인턴확인서 유죄 확정",
    "people": [
      "최강욱",
      "조국"
    ],
    "year": 2023,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2023_10"
  },
  {
    "id": "political_2024_01",
    "title_ko": "제22대 국회의원 총선거 — 여소야대 심화",
    "people": [],
    "year": 2024,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2024_01"
  },
  {
    "id": "policy_2024_01",
    "title_ko": "의대 정원 2000명 증원 발표 — 의정 갈등",
    "people": [],
    "year": 2024,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=policy_2024_01"
  },
  {
    "id": "political_2024_02",
    "title_ko": "12·3 비상계엄",
    "people": [
      "윤석열"
    ],
    "year": 2024,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2024_02"
  },
  {
    "id": "political_2024_03",
    "title_ko": "윤석열 대통령 탄핵소추안 가결",
    "people": [
      "윤석열"
    ],
    "year": 2024,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2024_03"
  },
  {
    "id": "political_2024_04",
    "title_ko": "한덕수 국무총리, 대통령 권한대행 탄핵소추",
    "people": [
      "한덕수"
    ],
    "year": 2024,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2024_04"
  },
  {
    "id": "political_2024_05",
    "title_ko": "이재명 피습(암살미수) 사건",
    "people": [
      "이재명"
    ],
    "year": 2024,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2024_05"
  },
  {
    "id": "economic_2024_01",
    "title_ko": "티몬·위메프 정산 대란",
    "people": [
      "구영배"
    ],
    "year": 2024,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_2024_01"
  },
  {
    "id": "economic_2024_02",
    "title_ko": "김범수 카카오 창업자 구속 — SM엔터 시세조종 의혹",
    "people": [
      "김범수"
    ],
    "year": 2024,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_2024_02"
  },
  {
    "id": "person_2024_06",
    "title_ko": "한강, 한국인 최초 노벨문학상 수상",
    "people": [
      "한강"
    ],
    "year": 2024,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=person_2024_06"
  },
  {
    "id": "disaster_2024_01",
    "title_ko": "무안 제주항공 참사",
    "people": [],
    "year": 2024,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=disaster_2024_01"
  },
  {
    "id": "person_2024_07",
    "title_ko": "김민기 별세 — 아침이슬, 그리고 뒷것의 삶",
    "people": [
      "김민기"
    ],
    "year": 2024,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=person_2024_07"
  },
  {
    "id": "political_2024_08",
    "title_ko": "김혜경 법인카드 유용 의혹 — 1·2심 유죄, 대법원 계류",
    "people": [
      "김혜경"
    ],
    "year": 2024,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2024_08"
  },
  {
    "id": "political_2024_09",
    "title_ko": "이진숙 대전MBC 법인카드 유용 의혹",
    "people": [
      "이진숙"
    ],
    "year": 2024,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2024_09"
  },
  {
    "id": "political_2025_01",
    "title_ko": "헌법재판소, 윤석열 대통령 파면",
    "people": [
      "윤석열"
    ],
    "year": 2025,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2025_01"
  },
  {
    "id": "political_2025_02",
    "title_ko": "제21대 대통령 선거 — 이재명 당선",
    "people": [
      "이재명"
    ],
    "year": 2025,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2025_02"
  },
  {
    "id": "political_2025_03",
    "title_ko": "이재명 대통령 취임",
    "people": [
      "이재명"
    ],
    "year": 2025,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2025_03"
  },
  {
    "id": "political_2025_04",
    "title_ko": "윤석열 구속기소 — 현직 대통령 최초",
    "people": [
      "윤석열"
    ],
    "year": 2025,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2025_04"
  },
  {
    "id": "political_2025_05",
    "title_ko": "김건희 구속 — 전직 대통령 배우자 최초",
    "people": [
      "김건희"
    ],
    "year": 2025,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2025_05"
  },
  {
    "id": "organization_2025_06",
    "title_ko": "리박스쿨 사건 — 극우 역사왜곡 교육과 여론조작 조직 적발",
    "people": [
      "손효숙"
    ],
    "year": 2025,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=organization_2025_06"
  },
  {
    "id": "economic_2025_01",
    "title_ko": "이재용, 삼성물산 합병·삼바 회계부정 의혹 대법원 최종 무죄",
    "people": [
      "이재용"
    ],
    "year": 2025,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_2025_01"
  },
  {
    "id": "political_2025_07",
    "title_ko": "문재인 전 대통령 뇌물 혐의 불구속 기소",
    "people": [
      "문재인",
      "이상직"
    ],
    "year": 2025,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2025_07"
  },
  {
    "id": "political_2026_04",
    "title_ko": "\"조작기소 특검법\" 발의 논란",
    "people": [
      "이재명"
    ],
    "year": 2026,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2026_04"
  },
  {
    "id": "political_2026_01",
    "title_ko": "김병헌 위안부 모욕 시위 사건 — 위안부피해자법 개정과 구속",
    "people": [
      "김병헌"
    ],
    "year": 2026,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2026_01"
  },
  {
    "id": "political_2026_02",
    "title_ko": "김건희 디올백·매관매직 사건 1심 유죄 — 징역 7년",
    "people": [
      "김건희",
      "최재영"
    ],
    "year": 2026,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2026_02"
  },
  {
    "id": "economic_2026_01",
    "title_ko": "코스피, 사상 첫 9000선 돌파 — 반도체 슈퍼사이클과 상반기 롤러코스터",
    "people": [],
    "year": 2026,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=economic_2026_01"
  },
  {
    "id": "culture_2026_01",
    "title_ko": "한국 축구, 2026 북중미 월드컵 조별리그 탈락 — 8년 만의 참사",
    "people": [
      "홍명보",
      "손흥민",
      "정몽규"
    ],
    "year": 2026,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=culture_2026_01"
  },
  {
    "id": "organization_2026_01",
    "title_ko": "스타벅스 \"탱크데이\" 5·18 조롱 논란",
    "people": [
      "정용진"
    ],
    "year": 2026,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=organization_2026_01"
  },
  {
    "id": "organization_2026_02",
    "title_ko": "쿠팡 개인정보 3370만 건 유출 사태",
    "people": [
      "박대준",
      "김범석"
    ],
    "year": 2026,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=organization_2026_02"
  },
  {
    "id": "political_2026_03",
    "title_ko": "제9회 전국동시지방선거 — 민주당 12곳 승리, 서울은 오세훈",
    "people": [
      "오세훈",
      "우상호",
      "전재수"
    ],
    "year": 2026,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2026_03"
  },
  {
    "id": "plot_2026_04",
    "title_ko": "신천지, 국민의힘에 신도 5만여 명 조직적 가입 — 이만희 구속",
    "people": [
      "이만희",
      "고동안"
    ],
    "year": 2026,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=plot_2026_04"
  },
  {
    "id": "plot_2026_05",
    "title_ko": "통일교 금품 사건 — 권성동, 대법원서 징역 2년 확정·의원직 상실",
    "people": [
      "권성동",
      "윤영호",
      "한학자"
    ],
    "year": 2026,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=plot_2026_05"
  },
  {
    "id": "political_2026_05",
    "title_ko": "국립묘지법 개정안 — 20년째 반복되는 발의와 폐기",
    "people": [],
    "year": 2026,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2026_05"
  },
  {
    "id": "political_2026_06",
    "title_ko": "유승민 딸 인천대 채용 특혜 의혹 — 수사 진행 중",
    "people": [
      "유승민",
      "유담"
    ],
    "year": 2026,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=political_2026_06"
  },
  {
    "id": "person_2026_01",
    "title_ko": "이해찬 별세 — \"대통령 4명을 만든 킹메이커\"",
    "people": [
      "이해찬"
    ],
    "year": 2026,
    "mapKey": "contemporary",
    "mapLabel": "현대 (1994~)",
    "url": "/maps/contemporary/index.html?event=person_2026_01"
  }
];
