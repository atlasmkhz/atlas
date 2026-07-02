// routes/kim_dae_jung.js
// 김대중 루트 — 하의도 소작농의 아들에서 노벨평화상까지, 85년
// 1924(전남 신안 하의도 출생) ~ 2009(서울, 서거), 85년
//
// 박정희 루트가 쿠데타로 권력을 잡고 헌정을 파괴한 인물의 궤적이라면,
// 이 루트는 그 국가폭력을 온몸으로 맞으며 살아남은 인물의 궤적이다.
// 납치·사형선고·망명·가택연금을 반복해서 겪고도 끝내 대통령이 됐고,
// 헌정사 최초의 평화적 여야 정권교체를 이뤘으며, 임기 중 외환위기
// 극복과 남북정상회담, 노벨평화상까지 이르렀다. 박정희 루트와 나란히
// 놓고 보면 같은 시대를 정반대의 자리에서 통과한 두 사람이 보인다.
//
// 웨이포인트 유형:
//   'birth'    출생
//   'political' 정치적 결정·사건
//   'tragedy'  그가 겪은 국가폭력(납치·사형선고 등)
//   'exile'    망명·해외 체류
//   'death'    사망
//
// card_ref: 이 지도(modern2)는 1945~1993년만 다루므로, 그의 대통령
// 재임기(1998~2003)와 그 이후 사건은 전부 이 지도의 DATA에 없다 —
// card_ref: null로 자체 요약만 제공한다. 1993년 이전은 이 지도 자체
// 카드를 연결한다.
//
// 날짜는 카드 자체의 month 필드를 신뢰하지 않고 별도로 검증된 날짜를
// 직접 기입했다(단, 검증 결과 이 데이터셋의 김대중 관련 카드 다수는
// 0-indexed 월 값 +1 규칙이 실제 날짜와 정확히 일치했다 — 예: 납치
// 사건 8월 8일, 민추협 결성 5월 18일 등. 그럼에도 개별적으로 다시
// 확인해 신뢰도를 높였다).

const ROUTE_KIM_DAE_JUNG = {
  id: 'kim_dae_jung',
  name: '김대중 — 하의도에서 노벨평화상까지',
  subject_type: 'person',
  period: '1924~2009',
  tagline: '납치되고, 사형선고를 받고, 두 번 쫓겨나고도 끝내 대통령이 된 사람 — 국가폭력의 최대 피해자가 헌정사 최초의 평화적 정권교체를 이루기까지',
  color: '#2e4a6b',
  total_waypoints: 29,
  hero_image: null,

  card_refs: [
    'political_1971_01', 'person_1973_01', 'movement_1976_02', 'political_1980_01',
    'plot_1981_01', 'organization_1984_01', 'person_1984_01', 'person_1985_01',
    'organization_1985_01', 'policy_1985_01', 'political_1987_02', 'political_1990_01',
    'political_1990_03', 'political_1992_01', 'political_1992_03',
  ],

  waypoints: [

    {
      id: 'wp_01',
      type: 'birth',
      year: 1924, month: 1, day: 6,
      title_ko: '출생 — 하의도의 소작농 집안',
      place_ko: '전남 신안 하의도',
      lat: 34.72, lng: 126.09,
      stay: null,
      summary_ko: '전남 신안군의 작은 섬 하의도에서 소작농의 아들로 태어났다. 육지에서도 멀리 떨어진 섬 소작농 집안 출신이 훗날 대통령이 되기까지는, 정치적 격동과 국가폭력을 온몸으로 통과해야 하는 긴 여정이 기다리고 있었다.',
      card_ref: null,
    },

    {
      id: 'wp_02',
      type: 'political',
      year: 1961, month: 5, day: 13,
      title_ko: '국회의원 당선 — 그러나 이틀 만에 취임 좌절',
      place_ko: '전남 목포',
      lat: 34.81, lng: 126.39,
      stay: null,
      summary_ko: '목포에서 치러진 보궐선거에서 당선돼 처음으로 국회의원 배지를 달게 됐다. 그러나 국회의원 선서도 하기 전, 이틀 뒤인 5월 16일 박정희의 군사정변으로 국회 자체가 해산됐다. 그의 첫 국회의원직은 단 한 번의 등원도 못 해본 채 사라졌다 — 그와 박정희의 오랜 악연은 이렇게 시작부터 어긋나 있었다.',
      card_ref: null,
    },

    {
      id: 'wp_03',
      type: 'political',
      year: 1971, month: 4, day: 27,
      title_ko: '제7대 대통령 선거 — 박정희 대 김대중',
      place_ko: '전국',
      lat: 36.5, lng: 127.8,
      stay: null,
      summary_ko: '신민당 후보로 대통령 선거에 출마해 "이번에 정권교체를 못 하면 총통제가 실시될 것"이라 경고했다. 94만 표 차라는, 당시로선 이례적으로 근소한 표차까지 몰아붙였다. 이 선거는 그를 전국구 정치인으로 각인시켰지만, 동시에 박정희 정권에게는 제거해야 할 최대 정적으로 낙인찍은 선거이기도 했다.',
      card_ref: 'political_1971_01',
    },

    {
      id: 'wp_04',
      type: 'tragedy',
      year: 1971, month: 9, day: null,
      title_ko: '의문의 교통사고 — 첫 번째 위협',
      place_ko: '전남 지역 유세길',
      lat: 34.9, lng: 126.9,
      stay: null,
      summary_ko: '지방 유세 이동 중 정체불명의 대형 트럭과 충돌하는 교통사고를 당했다. 사고 경위를 둘러싸고 정치적 테러였다는 의혹이 꾸준히 제기됐다. 이 사고로 얻은 고관절 부상의 후유증으로, 그는 평생 다리를 절며 살아야 했다.',
      card_ref: null,
    },

    {
      id: 'wp_05',
      type: 'exile',
      year: 1972, month: 10, day: 17,
      title_ko: '일본 체류 중 유신 선포 — 귀국할 수 없게 되다',
      place_ko: '일본 도쿄',
      lat: 35.68, lng: 139.75,
      stay: null,
      summary_ko: '신병 치료차 일본에 머물던 중 박정희가 10월유신을 선포했다는 소식을 들었다. 귀국하면 신변이 위험하다고 판단해 그대로 일본에 남아 해외에서 유신 반대 활동을 시작했다. 원치 않았던 첫 번째 망명이었다.',
      card_ref: null,
    },

    {
      id: 'wp_06',
      type: 'tragedy',
      year: 1973, month: 8, day: 8,
      title_ko: '김대중 납치사건 — 현해탄 한복판에서',
      place_ko: '도쿄 → 현해탄 → 서울',
      lat: 35.68, lng: 139.75,
      stay: null,
      summary_ko: '도쿄의 한 호텔에서 중앙정보부 요원들에게 납치됐다. 배에 실려 현해탄 한복판으로 끌려가 수장당하기 직전, 미국 정보기관의 개입으로 목숨을 건졌다는 것이 정설이다. 129시간 만에 서울 자택 앞에서 풀려났다. 국가기관이 해외에서 야당 정치인을 납치해 살해하려 한 이 사건은 한일 외교 문제로까지 번졌다.',
      card_ref: 'person_1973_01',
    },

    {
      id: 'wp_07',
      type: 'political',
      year: 1976, month: 3, day: 1,
      title_ko: '3·1 민주구국선언 — 명동사건',
      place_ko: '서울 명동성당',
      lat: 37.5633, lng: 126.9873,
      stay: null,
      summary_ko: '재야인사들과 함께 명동성당에서 유신체제 철폐와 민주 회복을 요구하는 선언문을 발표했다. 이 일로 다시 구속돼 실형을 선고받았다. 납치 사건 이후에도 그는 침묵하지 않았다.',
      card_ref: 'movement_1976_02',
    },

    {
      id: 'wp_08',
      type: 'political',
      year: 1980, month: 5, day: 17,
      title_ko: '5·17 비상계엄 전국확대 — 예비검속으로 체포되다',
      place_ko: '서울',
      lat: 37.566, lng: 126.978,
      stay: null,
      summary_ko: '신군부가 비상계엄을 전국으로 확대하며 정치인·재야인사를 대거 예비검속했고, 김대중도 이때 체포됐다. 바로 다음 날 광주에서 5·18민주화운동이 시작되는데, 신군부는 이를 "김대중의 배후 조종에 의한 내란"으로 몰아갈 명분으로 그의 체포를 이용한다.',
      card_ref: 'political_1980_01',
    },

    {
      id: 'wp_09',
      type: 'tragedy',
      year: 1980, month: 9, day: 17,
      title_ko: '내란음모 조작사건 — 사형을 선고받다',
      place_ko: '서울(계엄보통군법회의)',
      lat: 37.566, lng: 126.978,
      stay: null,
      summary_ko: '광주민주화운동의 배후 주동자로 몰려 내란음모 등의 혐의로 계엄보통군법회의에서 사형을 선고받았다. 5·18 당시 그는 이미 서울에서 구금돼 있어 광주 현장에 있지도 않았다. 국내외에서 구명 운동이 즉각 일어났고, 미국을 비롯한 각국 정부가 전두환 정권에 사형 집행 반대 입장을 전달했다.',
      card_ref: null,
    },

    {
      id: 'wp_10',
      type: 'tragedy',
      year: 1981, month: 1, day: 23,
      title_ko: '대법원 사형 확정 — 그리고 바로 무기징역으로 감형',
      place_ko: '서울',
      lat: 37.566, lng: 126.978,
      stay: null,
      summary_ko: '대법원에서 사형이 확정됐지만, 국내외의 거센 구명 여론과 미국 레이건 행정부의 압박 속에 전두환 정권은 곧바로 무기징역으로 감형했다. 죽음의 문턱까지 갔다가 살아 돌아온 순간이었다.',
      card_ref: 'plot_1981_01',
    },

    {
      id: 'wp_11',
      type: 'exile',
      year: 1982, month: 12, day: 23,
      title_ko: '미국 망명 — 하버드에서 보낸 시간',
      place_ko: '미국 보스턴(하버드대)',
      lat: 42.374, lng: -71.118,
      stay: '1982~1985',
      summary_ko: '형 집행정지로 석방된 뒤 신병 치료를 명목으로 미국으로 출국해 하버드대 국제문제연구소 객원연구원으로 지냈다. 사실상의 두 번째 망명이었다. 이 시기 미국 각지를 다니며 한국 민주화를 위한 국제 여론을 조직했다.',
      card_ref: null,
    },

    {
      id: 'wp_12',
      type: 'political',
      year: 1984, month: 5, day: 18,
      title_ko: '민주화추진협의회(민추협) 결성',
      place_ko: '서울',
      lat: 37.566, lng: 126.978,
      stay: null,
      summary_ko: '김영삼과 함께 민주화추진협의회를 결성했다. 광주항쟁 4주기에 맞춰 결성일을 잡은 것으로 알려져 있다. 오랜 라이벌이자 동지였던 두 사람이 민주화라는 대의 아래 손을 잡은 순간이었다.',
      card_ref: 'organization_1984_01',
    },

    {
      id: 'wp_13',
      type: 'political',
      year: 1984, month: 8, day: 20,
      title_ko: '귀국 시도와 좌절',
      place_ko: '서울',
      lat: 37.566, lng: 126.978,
      stay: null,
      summary_ko: '민추협 활동을 위해 귀국을 시도했으나 정부의 방해로 무산됐다. 완전한 귀국까지는 몇 달을 더 기다려야 했다.',
      card_ref: 'person_1984_01',
    },

    {
      id: 'wp_14',
      type: 'political',
      year: 1985, month: 1, day: 18,
      title_ko: '신한민주당(신민당) 창당',
      place_ko: '서울',
      lat: 37.566, lng: 126.978,
      stay: null,
      summary_ko: '민추협을 모체로 신한민주당이 창당됐다. 그해 2월 총선에서 신민당은 돌풍을 일으키며 제1야당으로 도약해, 이듬해 이어질 개헌 정국의 주역이 된다.',
      card_ref: 'organization_1985_01',
    },

    {
      id: 'wp_15',
      type: 'political',
      year: 1985, month: 2, day: 8,
      title_ko: '귀국 — 그리고 곧바로 가택연금',
      place_ko: '서울(김포공항 → 동교동)',
      lat: 37.556, lng: 126.925,
      stay: null,
      summary_ko: '2년 2개월의 미국 체류를 끝내고 마침내 귀국했다. 공항에는 그를 지지하는 인파와 이를 막으려는 경찰이 뒤엉켰다. 귀국 즉시 자택으로 압송돼 가택연금에 처해졌다 — 조국에 돌아왔지만 자유의 몸은 아니었다.',
      card_ref: 'person_1985_01',
    },

    {
      id: 'wp_16',
      type: 'political',
      year: 1985, month: 11, day: 30,
      title_ko: '정치인 해금 조치',
      place_ko: '서울',
      lat: 37.566, lng: 126.978,
      stay: null,
      summary_ko: '정부가 정치활동 규제 대상자 대부분을 해금했다. 그러나 김대중은 이때도 해금 대상에서 제외돼, 정치 활동의 자유를 얻기까지는 좀 더 시간이 필요했다.',
      card_ref: 'policy_1985_01',
    },

    {
      id: 'wp_17',
      type: 'political',
      year: 1987, month: 6, day: 29,
      title_ko: '6·29 선언 — 마침내 대통령 직선제로',
      place_ko: '서울',
      lat: 37.566, lng: 126.978,
      stay: null,
      summary_ko: '6월항쟁의 열기에 밀려 노태우 민정당 대표위원이 대통령 직선제 개헌을 받아들이는 6·29 선언을 발표했다. 15년 만에 국민이 직접 대통령을 뽑을 수 있게 된 순간이었다.',
      card_ref: 'political_1987_02',
    },

    {
      id: 'wp_18',
      type: 'political',
      year: 1987, month: 12, day: 16,
      title_ko: '제13대 대통령 선거 — 후보 단일화 실패로 낙선',
      place_ko: '전국',
      lat: 36.5, lng: 127.8,
      stay: null,
      summary_ko: '직선제로 치러진 첫 대선에서 김영삼과 후보 단일화에 끝내 실패하고 각자 출마했다. 민주화 세력의 표가 갈리며 여당의 노태우가 어부지리로 당선됐다. 독재에 맞서 함께 싸웠던 두 사람의 분열이 정권교체의 기회를 놓치게 만들었다는 비판이 오래도록 따라다녔다.',
      card_ref: null,
    },

    {
      id: 'wp_19',
      type: 'political',
      year: 1990, month: 1, day: 22,
      title_ko: '3당 합당 — 정치 지형이 뒤바뀌다',
      place_ko: '서울',
      lat: 37.566, lng: 126.978,
      stay: null,
      summary_ko: '노태우의 민정당, 김영삼의 통일민주당, 김종필의 신민주공화당이 전격 합당해 거대 여당 민주자유당이 탄생했다. 김영삼은 여당으로 들어가 대선 후보 자격을 얻었지만, 김대중의 평화민주당은 하루아침에 고립된 소수 야당이 됐다.',
      card_ref: 'political_1990_01',
    },

    {
      id: 'wp_20',
      type: 'political',
      year: 1990, month: 1, day: 23,
      title_ko: '호남 대 비호남 구도의 고착',
      place_ko: '전국',
      lat: 36.5, lng: 127.8,
      stay: null,
      summary_ko: '3당 합당으로 정치 지형이 영남 중심 여당과 호남 기반 야당으로 단순화되면서, 이후 한국 정치를 오래 지배하게 되는 지역주의 구도가 굳어졌다. 그의 정치 인생 전체가 이 구도 속에서 "호남의 대표"라는 프레임과 씨름해야 했다.',
      card_ref: 'political_1990_03',
    },

    {
      id: 'wp_21',
      type: 'political',
      year: 1992, month: 3, day: 24,
      title_ko: '제14대 국회의원 선거',
      place_ko: '전국',
      lat: 36.5, lng: 127.8,
      stay: null,
      summary_ko: '민주당을 이끌고 총선에 임했으나 거대 여당 민자당의 벽을 넘지 못했다. 같은 해 말 있을 대선을 앞두고 야권의 세 결집이 절실한 상황이었다.',
      card_ref: 'political_1992_01',
    },

    {
      id: 'wp_22',
      type: 'political',
      year: 1992, month: 12, day: 18,
      title_ko: '제14대 대통령 선거 낙선 — 정계 은퇴를 선언하다',
      place_ko: '전국',
      lat: 36.5, lng: 127.8,
      stay: null,
      summary_ko: '김영삼에게 다시 한번 패했다. 낙선 다음 날, 그는 "국민 여러분의 마음을 잘 알고 있다. 정계를 은퇴하겠다"며 정계 은퇴를 선언했다. 세 번째 대권 도전의 실패였다 — 그러나 이것이 그의 마지막 도전은 아니었다.',
      card_ref: 'political_1992_03',
    },

    {
      id: 'wp_23',
      type: 'political',
      year: 1995, month: 7, day: 18,
      title_ko: '정계 복귀 선언',
      place_ko: '서울',
      lat: 37.566, lng: 126.978,
      stay: null,
      summary_ko: '영국 유학과 아태평화재단 활동으로 잠시 정치와 거리를 뒀던 그가 정계 복귀를 선언하며 새정치국민회의를 창당했다. 네 번째 대권 도전이 시작되는 순간이었다.',
      card_ref: null,
    },

    {
      id: 'wp_24',
      type: 'political',
      year: 1997, month: 12, day: 18,
      title_ko: '제15대 대통령 당선 — 헌정사 최초의 평화적 정권교체',
      place_ko: '전국',
      lat: 36.5, lng: 127.8,
      stay: null,
      summary_ko: '외환위기가 터진 직후 치러진 선거에서 이회창을 근소한 표차로 누르고 당선됐다. 네 번째 도전 만의 승리였다. 무엇보다 선거를 통한 여야 간 평화적 정권교체가 대한민국 헌정사에서 처음으로 이뤄진 순간이었다 — 납치되고 사형선고를 받았던 야당 정치인이, 마침내 그 나라의 대통령이 됐다.',
      card_ref: null,
    },

    {
      id: 'wp_25',
      type: 'political',
      year: 1998, month: 2, day: 25,
      title_ko: '대통령 취임 — 외환위기의 한복판에서',
      place_ko: '서울',
      lat: 37.586, lng: 126.974,
      stay: null,
      summary_ko: '국가 부도 위기 속에 대통령에 취임했다. 국민들이 자발적으로 금붙이를 내놓는 금모으기운동이 전국에서 벌어졌고, 정부는 대대적인 구조조정과 노사정 대타협을 통해 IMF 구제금융 체제에서 예정보다 이르게 벗어났다. 다만 이 과정에서 대량 실업과 비정규직 확산이라는 깊은 사회적 상처도 함께 남았다.',
      card_ref: null,
    },

    {
      id: 'wp_26',
      type: 'political',
      year: 2000, month: 6, day: 15,
      title_ko: '6·15 남북공동선언 — 첫 남북정상회담',
      place_ko: '평양',
      lat: 39.0194, lng: 125.7381,
      stay: null,
      summary_ko: '평양을 방문해 김정일 국방위원장과 분단 이후 첫 남북정상회담을 갖고 6·15 남북공동선언을 발표했다. 오랫동안 추진해 온 햇볕정책의 정점이었다. 이 회담을 위해 현대그룹을 통한 거액의 대북 송금이 있었다는 사실이 훗날 드러나며 "대가성 정상회담" 논란도 함께 남겼다.',
      card_ref: null,
    },

    {
      id: 'wp_27',
      type: 'political',
      year: 2000, month: 12, day: 10,
      title_ko: '노벨평화상 수상',
      place_ko: '노르웨이 오슬로',
      lat: 59.91, lng: 10.75,
      stay: null,
      summary_ko: '한국과 동아시아 민주주의 발전, 그리고 남북 화해를 위한 노력을 인정받아 한국인 최초로 노벨평화상을 수상했다. 납치와 사형선고, 두 차례의 망명을 겪었던 정치인이 세계 최고 권위의 평화상을 받기까지, 30년에 가까운 시간이 흘러 있었다.',
      card_ref: null,
    },

    {
      id: 'wp_28',
      type: 'political',
      year: 2003, month: 2, day: 24,
      title_ko: '대통령 퇴임',
      place_ko: '서울',
      lat: 37.586, lng: 126.974,
      stay: null,
      summary_ko: '5년의 임기를 마치고 대통령직에서 물러났다. 퇴임 후에도 서거 직전까지 남북관계와 한반도 평화에 대한 발언을 이어갔다.',
      card_ref: null,
    },

    {
      id: 'wp_29',
      type: 'death',
      year: 2009, month: 8, day: 18,
      title_ko: '서거',
      place_ko: '서울(신촌 세브란스병원)',
      lat: 37.562, lng: 126.941,
      stay: null,
      summary_ko: '폐렴 합병증으로 세상을 떠났다. 향년 85세. 국장으로 치러진 영결식에는 각계각층의 추모 인파가 이어졌다. 하의도의 소작농 아들로 태어나 납치·사형선고·두 번의 망명을 겪고도 끝내 대통령이 되고 노벨평화상까지 받은 85년의 생애가, 이렇게 막을 내렸다.',
      card_ref: null,
    },

  ],

  segments: [],
};

if (typeof window !== 'undefined' && window.registerRoute) {
  window.registerRoute(ROUTE_KIM_DAE_JUNG);
}
