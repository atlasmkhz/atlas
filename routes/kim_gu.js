// routes/kim_gu.js
// 백범 김구 루트 — 상놈의 아들에서 임시정부의 얼굴로, 그리고 흉탄 앞에서
// 1876(황해도 해주 출생) ~ 1949(경교장 피격), 73년의 여정
//
// 웨이포인트 유형:
//   'birth'    출생
//   'life'     생활·거주·노동
//   'battle'   전투·의거·무장조직 창설
//   'tragedy'  비극 (투옥·사형선고·피격 등)
//   'exile'    망명·탈옥·강제이동
//   'political' 정치·외교적 사건
//   'death'    사망
//   'repatriation' 귀환 (김구의 경우 유해가 아니라 27년 만의 '살아 있는 귀환')
//
// card_ref: 기존 data/*.js 카드 id — 클릭 시 해당 카드 팝업이 열린다
// card_ref가 null이면 루트 전용 웨이포인트로 요약 팝업을 자체 생성한다
//
// 날짜 메모: 상하이 임시정부 시기(1919~) 이후의 연·월·일은 실제 역사적으로
// 널리 확인되는 날짜(예: 임정 수립 1919.4.11, 이봉창 의거 1932.1.8, 윤봉길
// 의거 1932.4.29, 남목청 사건 1938.5.7, 광복군 창설 1940.9.17, 개헌
// 1944.4.22, 8·15 광복, 독수리작전 1945.8.18, 임정요인 환국 1945.11)을
// 우선 사용했다. 카드 자체의 month 필드는 프로젝트 내에서도 0-indexed와
// 1-indexed가 혼재돼 있어(예: 박재혁 항목과 최수봉 항목이 서로 다른 규칙을
// 따름) 신뢰하지 않고, 별도로 검증된 날짜를 이 루트 파일에 직접 기입했다.

const ROUTE_KIM_GU = {
  id: 'kim_gu',
  name: '백범 김구 — 상놈의 아들에서 임시정부의 얼굴로',
  subject_type: 'person',
  period: '1876~1949',
  tagline: '동학 접주에서 사형수로, 승려로, 임시정부 주석으로, 그리고 광복된 조국의 흉탄 앞으로 — 73년의 여정',
  color: '#3a5a8c',
  total_waypoints: 33,
  hero_image: 'assets/images/entity/person/person_kim_gu_01.webp',

  card_refs: [
    'person_1919_02', 'person_1920_01', 'person_1921_02',
    'political_1926_06', 'person_1926_02', 'righteous_1926_01',
    'political_1931_02', 'righteous_1932_01', 'righteous_1932_02', 'person_1932_01',
    'political_1934_01', 'political_1935_02', 'political_1937_01',
    'plot_1938_01', 'person_1939_01', 'political_1940_01', 'battle_1940_01',
    'political_1941_01', 'political_1944_02', 'battle_1945_01', 'person_1945_01',
  ],

  waypoints: [

    // ── 1. 출생 ──────────────────────────────────────────────────
    {
      id: 'wp_01',
      type: 'birth',
      year: 1876, month: null, day: null,
      title_ko: '출생 — 해주 텃골, 상놈의 아들',
      place_ko: '황해도 해주 백운방 텃골',
      lat: 38.03, lng: 125.71,
      stay: null,
      summary_ko: '1876년 황해도 해주의 가난한 상민(常民) 집안에서 태어났다. 아명은 창암(昌巖). 몰락한 양반가의 후예였던 아버지 김순영은 신분제의 벽 앞에서 늘 억눌려 살았고, 어린 김구는 그런 아버지를 보며 신분 차별에 대한 분노를 키웠다. "왜 우리는 상놈으로 태어났는가"라는 물음이 훗날 그를 동학으로 이끈 첫걸음이었다.',
      card_ref: null,
    },

    // ── 2. 동학 입도 — 접주가 되다 ─────────────────────────────────
    {
      id: 'wp_02',
      type: 'life',
      year: 1893, month: null, day: null,
      title_ko: '동학 입도 — 열여덟에 접주가 되다',
      place_ko: '황해도 해주',
      lat: 38.03, lng: 125.71,
      stay: null,
      summary_ko: '신분 차별이 없다는 동학의 가르침에 이끌려 열일곱 나이에 입도했다. 총명함과 언변을 인정받아 이듬해 팔봉접주(接主)에 올랐다. 상민의 아들이 하루아침에 수백 명을 이끄는 접주가 된 것은, 그가 태어나며 품었던 물음에 대한 첫 번째 응답이었다.',
      card_ref: null,
    },

    // ── 3. 해주성 전투 ──────────────────────────────────────────
    {
      id: 'wp_03',
      type: 'battle',
      year: 1894, month: 9, day: null,
      title_ko: '해주성 공략 — 동학군 선봉장',
      place_ko: '황해도 해주성',
      lat: 38.03, lng: 125.71,
      stay: null,
      summary_ko: '동학농민운동 2차 봉기 때 황해도 동학군을 이끌고 해주성 공략에 선봉으로 나섰다. 그러나 관군과 일본군의 화력 앞에 참패했다. 열아홉 살 접주는 전투에서 패했지만, 이 경험은 훗날 그가 무장 투쟁의 필요성을 절감하는 원점이 됐다.',
      card_ref: null,
    },

    // ── 4. 치하포 사건 ──────────────────────────────────────────
    {
      id: 'wp_04',
      type: 'battle',
      year: 1896, month: 3, day: 9,
      title_ko: '치하포 사건 — 국모의 원수를 갚다',
      place_ko: '황해도 안악 치하포',
      lat: 38.20, lng: 125.30,
      stay: null,
      summary_ko: '명성황후 시해(을미사변)에 대한 분노가 가시지 않은 채, 치하포 나루터 주막에서 일본인 상인으로 위장한 육군 중위 쓰치다 조스케를 국모의 원수로 지목해 맨손으로 처단했다. 스물한 살, 아무 조직의 지시도 없이 홀로 내린 결단이었다. 그는 현장에 "국모보수(國母報讐)"라 써 붙이고 유유히 집으로 돌아가 체포를 기다렸다.',
      card_ref: null,
    },

    // ── 5. 인천 감옥 — 사형선고와 고종의 전화 ──────────────────────
    {
      id: 'wp_05',
      type: 'tragedy',
      year: 1896, month: 8, day: 26,
      title_ko: '인천 감옥 — 사형 확정, 궁에서 온 전화',
      place_ko: '인천 감리서',
      lat: 37.4563, lng: 126.7052,
      stay: '1896~1898',
      summary_ko: '체포돼 인천 감리서에 갇힌 뒤 사형이 확정됐다. 형 집행을 앞둔 날, 마침 인천까지 개통된 전화선을 통해 고종의 특사 전보가 도착해 형 집행이 정지됐다. 극적으로 살아남았지만 석방은 아니었다. 옥중에서도 그는 죄수들에게 글을 가르치며 2년을 버텼다.',
      card_ref: null,
    },

    // ── 6. 탈옥 ──────────────────────────────────────────────────
    {
      id: 'wp_06',
      type: 'exile',
      year: 1898, month: 3, day: 19,
      title_ko: '탈옥 — 인천 감옥을 벗어나다',
      place_ko: '인천 감리서',
      lat: 37.4563, lng: 126.7052,
      stay: null,
      summary_ko: '사형 집행이 다시 논의되던 정황을 감지하고 1898년 3월 19일 감옥을 탈출했다. 이후 전국을 떠돌며 쫓기는 몸이 됐다. 스물두 살, 나라에도 법에도 기댈 곳이 없던 그가 선택한 것은 도피가 아니라 스스로 살길을 만드는 것이었다.',
      card_ref: null,
    },

    // ── 7. 마곡사 — 승려 원종 ──────────────────────────────────────
    {
      id: 'wp_07',
      type: 'life',
      year: 1898, month: 9, day: null,
      title_ko: '마곡사 — 승려 원종이 되다',
      place_ko: '충청도 공주 마곡사',
      lat: 36.508, lng: 127.021,
      stay: '1898~1899',
      summary_ko: '쫓기는 몸으로 전국을 떠돌다 충청도 공주 마곡사에 몸을 의탁하고 출가해 법명 원종(圓宗)을 받았다. 사형수에서 접주로, 다시 승려로 — 그의 삶은 매번 완전히 다른 이름으로 다시 시작됐다. 그러나 채 1년을 채우지 못하고 환속했다. 산문 안의 평온이 그의 길은 아니었다.',
      card_ref: null,
    },

    // ── 8. 환속 — 교육운동과 신민회 ──────────────────────────────
    {
      id: 'wp_08',
      type: 'life',
      year: 1907, month: null, day: null,
      title_ko: '환속 — 교육운동과 신민회',
      place_ko: '황해도 안악',
      lat: 38.10, lng: 125.58,
      stay: '1903~1911',
      summary_ko: '환속 후 황해도로 돌아와 학교를 세우고 신교육 운동에 뛰어들었다. 1907년에는 안창호·양기탁 등이 조직한 비밀결사 신민회에 가입해 황해도 지회를 이끌었다. 총과 칼 대신 붓과 교단을 택한 시기였지만, 총독부는 이 조용한 활동조차 위험하게 여겼다.',
      card_ref: null,
    },

    // ── 9. 안악사건·105인 사건 ──────────────────────────────────
    {
      id: 'wp_09',
      type: 'tragedy',
      year: 1911, month: 1, day: null,
      title_ko: '안악사건·105인 사건 — 서대문형무소',
      place_ko: '경성 서대문형무소',
      lat: 37.5744, lng: 126.9560,
      stay: '1911~1915',
      summary_ko: '데라우치 총독 암살 미수를 조작한 이른바 105인 사건에 안악사건 관련자로 엮여 체포됐다. 서대문형무소에서 혹독한 고문을 받으며 4년 넘게 복역했다. 신민회는 이 사건으로 사실상 와해됐다. 감옥에서 그는 "이름이 곧 신분이 되는 세상을 벗어나겠다"며 스스로 호를 백범(白凡) — 평범한 백성도 나라를 사랑할 자격이 있다는 뜻으로 지었다.',
      card_ref: null,
    },

    // ── 10. 상하이 망명 — 임시정부에 투신 ──────────────────────────
    {
      id: 'wp_10',
      type: 'exile',
      year: 1919, month: 4, day: 11,
      title_ko: '상하이 망명 — 임시정부에 투신하다',
      place_ko: '상하이',
      lat: 31.226, lng: 121.452,
      stay: '1919~1932',
      summary_ko: '3·1운동 직후 국내를 탈출해 상하이로 망명, 갓 수립된 대한민국 임시정부에 합류했다. 마흔셋, 접주도 승려도 아닌 임시정부의 문지기(경무국장)로 새로운 삶을 시작했다. 그는 초라한 직책도 마다하지 않았다 — "누가 시키든 나는 문지기부터 하겠다"는 것이 그의 자세였다.',
      card_ref: 'person_1919_02',
    },

    // ── 11. 임시정부 경무국장 ──────────────────────────────────
    {
      id: 'wp_11',
      type: 'political',
      year: 1920, month: null, day: null,
      title_ko: '임시정부 경무국장 — 문지기를 자처하다',
      place_ko: '상하이',
      lat: 31.255, lng: 121.43,
      stay: null,
      summary_ko: '임시정부의 경찰 조직인 경무국의 책임자로 일했다. 일제의 밀정을 색출하고 임시정부 요인들의 신변을 지키는 궂은일이었다. 화려한 자리가 아니었지만, 그는 이 시기를 통해 임시정부 내부의 신뢰를 차곡차곡 쌓아갔다.',
      card_ref: 'person_1920_01',
    },

    // ── 12. 임정 수습 ──────────────────────────────────────────
    {
      id: 'wp_12',
      type: 'political',
      year: 1921, month: null, day: null,
      title_ko: '임정 수습 — 흔들리는 배를 붙잡다',
      place_ko: '상하이',
      lat: 31.18, lng: 121.47,
      stay: null,
      summary_ko: '독립운동 노선을 둘러싼 내분과 자유시 참변의 충격으로 임시정부가 흔들리던 시기, 김구는 조직을 지탱하는 실무를 도맡았다. 화려한 이념 논쟁보다 매일의 살림을 챙기는 사람이 필요했고, 그 역할을 그가 맡았다.',
      card_ref: 'person_1921_02',
    },

    // ── 13. 국무령제 개헌 ──────────────────────────────────────
    {
      id: 'wp_13',
      type: 'political',
      year: 1926, month: 6, day: 3,
      title_ko: '임시정부 — 국무령제로 개헌',
      place_ko: '상하이',
      lat: 31.218, lng: 121.458,
      stay: null,
      summary_ko: '내분으로 대통령제가 사실상 무너진 임시정부는 국무령 중심의 내각제로 개헌했다. 안창호를 비롯한 여러 인사가 국무령을 고사하며 임시정부는 한동안 지도부 공백 상태에 빠졌다. 아무도 나서지 않으려 하는 자리였다.',
      card_ref: 'political_1926_06',
    },

    // ── 14. 국무령 취임 ──────────────────────────────────────
    {
      id: 'wp_14',
      type: 'political',
      year: 1926, month: 12, day: null,
      title_ko: '임시정부 국무령에 오르다',
      place_ko: '상하이',
      lat: 31.224, lng: 121.452,
      stay: null,
      summary_ko: '아무도 맡으려 하지 않던 국무령 자리를 결국 김구가 맡았다. 상민의 아들, 사형수, 승려, 문지기였던 그가 임시정부 최고 책임자에 올랐다. "가장 낮은 자리부터 시작해 가장 무거운 자리까지" — 그의 상하이 13년은 이 한 문장으로 요약된다.',
      card_ref: 'person_1926_02',
    },

    // ── 15. 나석주 의거 ──────────────────────────────────────
    {
      id: 'wp_15',
      type: 'battle',
      year: 1926, month: 12, day: 28,
      title_ko: '나석주 — 동양척식회사에 폭탄을',
      place_ko: '경성 동양척식주식회사·식산은행',
      lat: 37.5605, lng: 126.9815,
      stay: null,
      summary_ko: '의열단 출신 나석주가 조선 경제 수탈의 심장부인 동양척식주식회사와 식산은행에 폭탄을 던지고 일본 경찰과 총격전 끝에 스스로 목숨을 끊었다. 김구가 직접 지휘한 거사는 아니었지만, 임시정부와 의열 투쟁 세력이 여전히 국내를 겨누고 있음을 보여준 사건이었다.',
      card_ref: 'righteous_1926_01',
    },

    // ── 16. 한인애국단 결성 ──────────────────────────────────────
    {
      id: 'wp_16',
      type: 'political',
      year: 1931, month: 10, day: null,
      title_ko: '한인애국단 결성 — 다시 폭탄을 들다',
      place_ko: '상하이',
      lat: 31.225, lng: 121.452,
      stay: null,
      summary_ko: '만주사변으로 독립운동의 활로가 막히자, 김구는 임시정부 밑에 비밀 의열 조직 한인애국단을 직접 결성했다. 국무령의 자리에서 스스로 폭탄과 총을 든 조직의 배후가 된 것이다. "이제는 내가 나서야 한다"는 결심이었다.',
      card_ref: 'political_1931_02',
    },

    // ── 17. 이봉창 의거 ──────────────────────────────────────
    {
      id: 'wp_17',
      type: 'battle',
      year: 1932, month: 1, day: 8,
      title_ko: '이봉창 — 도쿄, 일왕 행렬에 수류탄을',
      place_ko: '도쿄 사쿠라다몬',
      lat: 35.679, lng: 139.752,
      stay: null,
      summary_ko: '한인애국단 첫 단원 이봉창이 도쿄 사쿠라다몬에서 일왕 행렬에 수류탄을 던졌다. 명중하지는 못했지만, 일왕의 목숨을 겨눈 사건은 전 세계에 충격을 안겼다. 거사 직전 김구와 이봉창이 함께 태극기 앞에서 찍은 사진은 오늘날까지 전해진다.',
      card_ref: 'righteous_1932_01',
    },

    // ── 18. 윤봉길 의거 ──────────────────────────────────────
    {
      id: 'wp_18',
      type: 'battle',
      year: 1932, month: 4, day: 29,
      title_ko: '윤봉길 — 훙커우공원, 단상 위로 물통 폭탄',
      place_ko: '상하이 훙커우공원',
      lat: 31.265, lng: 121.485,
      stay: null,
      summary_ko: '일왕의 생일 겸 상하이사변 승전 축하식이 열리던 훙커우공원 단상에 윤봉길이 물통 폭탄을 던졌다. 일본군 상하이 파견군 사령관 등 요인 다수가 죽거나 다쳤다. 김구가 직접 기획하고 윤봉길과 마지막 시계를 맞바꾼 이 거사는 임시정부의 존재를 세계에 각인시켰고, 동시에 상하이 시절의 종언을 알렸다.',
      card_ref: 'righteous_1932_02',
    },

    // ── 19. 자싱 피신 ──────────────────────────────────────
    {
      id: 'wp_19',
      type: 'exile',
      year: 1932, month: 5, day: null,
      title_ko: '자싱으로 — 현상금 걸린 도피자',
      place_ko: '저장성 자싱',
      lat: 30.7522, lng: 120.7555,
      stay: '1932~1933',
      summary_ko: '윤봉길 의거 직후 일본은 김구에게 거액의 현상금을 걸었다. 그는 변장을 하고 상하이를 탈출해 저장성 자싱의 뱃사공 집과 사찰을 전전하며 은신했다. 중국인 여성 주애보의 도움으로 뱃놀이하는 부부처럼 위장해 목숨을 부지했다 — 임시정부 국무령이 뱃사공 행세로 하루하루를 버틴 시기였다.',
      card_ref: 'person_1932_01',
    },

    // ── 20. 낙양군관학교 ──────────────────────────────────────
    {
      id: 'wp_20',
      type: 'political',
      year: 1934, month: 2, day: null,
      title_ko: '낙양군관학교 — 한인특별반을 열다',
      place_ko: '허난성 낙양',
      lat: 34.62, lng: 112.45,
      stay: null,
      summary_ko: '중국 국민당 정부의 지원을 얻어 낙양군관학교에 한인 청년들을 위한 특별반을 개설했다. 폭탄 한두 개로 벌이는 개별 의거를 넘어, 정식 군사 훈련을 받은 독립군을 길러내겠다는 구상이었다. 의열 투쟁의 시대에서 군사 조직의 시대로 넘어가는 전환점이었다.',
      card_ref: 'political_1934_01',
    },

    // ── 21. 한국국민당 창립 ──────────────────────────────────────
    {
      id: 'wp_21',
      type: 'political',
      year: 1935, month: 11, day: null,
      title_ko: '한국국민당 창립 — 갈라진 두 길',
      place_ko: '항저우 / 상하이',
      lat: 30.27, lng: 120.16,
      stay: null,
      summary_ko: '김원봉 등이 좌우 통합을 내세운 민족혁명당을 결성하자, 임시정부 고수를 주장한 김구는 조소앙·이동녕 등과 함께 별도로 한국국민당을 창립했다. 하나의 독립운동이 임시정부를 축으로 한 세력과 통합 정당을 지향한 세력, 두 갈래로 갈라선 순간이었다.',
      card_ref: 'political_1935_02',
    },

    // ── 22. 한국광복운동단체연합회 ──────────────────────────────
    {
      id: 'wp_22',
      type: 'political',
      year: 1937, month: 8, day: null,
      title_ko: '한국광복운동단체연합회 결성',
      place_ko: '난징',
      lat: 32.05, lng: 118.78,
      stay: null,
      summary_ko: '중일전쟁이 본격화되자 김구는 우파 계열 독립운동 단체들을 규합해 한국광복운동단체연합회를 결성했다. 좌파 계열의 조선민족전선연맹과 대치하는 우파 연합의 축이었다. 독립운동은 하나이면서도 둘로 나뉜 채 전쟁의 소용돌이 속으로 들어갔다.',
      card_ref: 'political_1937_01',
    },

    // ── 23. 남목청 사건 ──────────────────────────────────────
    {
      id: 'wp_23',
      type: 'tragedy',
      year: 1938, month: 5, day: 7,
      title_ko: '남목청 사건 — 동지의 총에 쓰러지다',
      place_ko: '창사 남목청',
      lat: 28.23, lng: 112.94,
      stay: null,
      summary_ko: '정당 통합을 논의하던 회의장인 창사 남목청에서 같은 독립운동 진영이었던 이운한의 총격을 받아 중상을 입었다. 가슴에 총알이 박힌 채 생사를 넘나들었다. 일본군의 총이 아니라 동족의 총에 쓰러질 뻔했다는 사실은 독립운동 내부 갈등이 얼마나 깊었는지를 보여준다.',
      card_ref: 'plot_1938_01',
    },

    // ── 24. 총탄에서 살아나다 ──────────────────────────────────
    {
      id: 'wp_24',
      type: 'life',
      year: 1939, month: null, day: null,
      title_ko: '총탄에서 살아나다 — 광저우를 거쳐 류저우로',
      place_ko: '창사 → 광저우 → 류저우',
      lat: 23.13, lng: 113.27,
      stay: '1938~1939',
      summary_ko: '가슴에 박힌 총알을 완전히 빼내지 못한 채 기적적으로 회복했다. 일본군의 진격을 피해 임시정부 요인들과 가족들을 이끌고 창사에서 광저우, 다시 류저우로 피난했다. 국가도 없이 총알까지 몸에 지닌 채 떠도는 임시정부의 행렬이었다.',
      card_ref: 'person_1939_01',
    },

    // ── 25. 한국독립당 통합 ──────────────────────────────────────
    {
      id: 'wp_25',
      type: 'political',
      year: 1940, month: 5, day: 9,
      title_ko: '한국독립당 통합 — 마침내 하나로',
      place_ko: '치장',
      lat: 28.97, lng: 106.5,
      stay: null,
      summary_ko: '우파 계열 세 정당(한국국민당·한국독립당·조선혁명당)을 하나로 통합해 새로운 한국독립당을 창당하고 그 중심에 섰다. 완전한 좌우 통합은 아니었지만, 적어도 우파 진영만큼은 하나의 깃발 아래 모았다. 오랜 분열 끝에 얻은 작은 통합이었다.',
      card_ref: 'political_1940_01',
    },

    // ── 26. 한국광복군 창설 ──────────────────────────────────────
    {
      id: 'wp_26',
      type: 'battle',
      year: 1940, month: 9, day: 17,
      title_ko: '한국광복군 창설 — 마침내 정규군을',
      place_ko: '충칭',
      lat: 29.56, lng: 106.55,
      stay: '1940~1945',
      summary_ko: '임시정부의 정규 군대인 한국광복군을 충칭에서 창설했다. 지청천을 총사령관으로 세우고, 흩어져 있던 무장 세력들을 임시정부 산하로 결집하려 했다. 폭탄 한 개로 시작했던 그의 무장 투쟁은 이제 정규군 창설이라는 결실을 맺었다.',
      card_ref: 'battle_1940_01',
    },

    // ── 27. 대일선전포고 ──────────────────────────────────────
    {
      id: 'wp_27',
      type: 'political',
      year: 1941, month: 12, day: 10,
      title_ko: '대한민국 임시정부, 대일 선전포고',
      place_ko: '충칭',
      lat: 29.56, lng: 106.55,
      stay: null,
      summary_ko: '태평양전쟁이 발발하자 임시정부는 일본에 정식으로 선전포고했다. 국제법상 승인받은 정부는 아니었지만, 연합국의 일원으로서 싸우겠다는 의지의 선언이었다. 김구는 이 전쟁이 곧 독립을 되찾을 마지막 기회라고 믿었다.',
      card_ref: 'political_1941_01',
    },

    // ── 28. 주석·부주석제 개헌 ──────────────────────────────────
    {
      id: 'wp_28',
      type: 'political',
      year: 1944, month: 4, day: 22,
      title_ko: '임시정부 개헌 — 주석에 오르다',
      place_ko: '충칭',
      lat: 29.56, lng: 106.55,
      stay: null,
      summary_ko: '임시정부 마지막 개헌으로 주석·부주석제가 도입됐고, 김구가 주석에 올랐다. 좌파 진영의 김원봉도 광복군 부사령관 겸 군무부장으로 합류하며, 오랜 분열 끝에 좌우가 한 정부 안에서 마주 앉았다. 문지기로 시작한 지 25년 만에 임시정부의 얼굴이 됐다.',
      card_ref: 'political_1944_02',
    },

    // ── 29. 독수리작전 — 그러나 하늘이 무너지다 ──────────────────
    {
      id: 'wp_29',
      type: 'battle',
      year: 1945, month: 8, day: 18,
      title_ko: '독수리작전 — 그러나 하늘이 무너지다',
      place_ko: '시안',
      lat: 34.27, lng: 108.95,
      stay: null,
      summary_ko: '미군 OSS와 협력해 광복군을 국내로 침투시키는 독수리작전을 준비하고 시안에서 국내정진군을 편성했다. 그러나 작전 개시를 며칠 앞두고 일본이 항복했다. 김구는 이 소식을 듣고 기뻐하기보다 탄식했다고 전해진다 — "우리 힘으로 이 전쟁에 참여하지 못한 것이 후일 국제 사회에서 발언권을 잃게 될까 두렵다"는 그의 우려는 곧 현실이 됐다.',
      card_ref: 'battle_1945_01',
    },

    // ── 30. 개인 자격으로 돌아온 주석 ──────────────────────────────
    {
      id: 'wp_30',
      type: 'repatriation',
      year: 1945, month: 11, day: 23,
      title_ko: '개인 자격으로 돌아온 주석 — 27년 만의 귀국',
      place_ko: '경성',
      lat: 37.566, lng: 126.978,
      stay: null,
      summary_ko: '미군정이 대한민국 임시정부를 정부로 인정하지 않아, 임시정부 주석 김구는 "개인 자격"으로만 입국이 허용됐다. 1919년 상하이로 떠난 지 27년 만에 고국 땅을 밟았지만, 그를 맞은 것은 자신이 이끌던 정부에 대한 승인이 아니라 미군정의 통치였다. 환대와 냉대가 함께한 귀국이었다.',
      card_ref: 'person_1945_01',
    },

    // ── 31. 남북협상 — 38선을 넘다 ──────────────────────────────
    {
      id: 'wp_31',
      type: 'political',
      year: 1948, month: 4, day: 19,
      title_ko: '남북협상 — 38선을 넘다',
      place_ko: '평양',
      lat: 39.0194, lng: 125.7381,
      stay: null,
      summary_ko: '남한 단독정부 수립이 굳어지자, 김구는 분단을 막기 위해 마지막 승부수로 38선을 넘어 평양으로 향했다. "38선을 베고 쓰러질지언정 단독정부는 세울 수 없다"는 말을 남긴 채였다. 김일성과의 회담은 성과 없이 끝났고, 그는 이 남북협상으로 정치적 입지마저 크게 잃었다. 그러나 그는 분단이 확정되는 순간까지 통일을 놓지 않은 마지막 지도자였다.',
      card_ref: null,
    },

    // ── 32. 경교장 흉탄 ──────────────────────────────────────────
    {
      id: 'wp_32',
      type: 'death',
      year: 1949, month: 6, day: 26,
      title_ko: '경교장 흉탄 — 광복된 조국에서 쓰러지다',
      place_ko: '서울 경교장',
      lat: 37.5695, lng: 126.9668,
      stay: null,
      summary_ko: '1949년 6월 26일, 서울 경교장 자택에서 육군 소위 안두희의 총에 맞아 숨졌다. 일본 헌병도, 상하이 밀정도, 남목청의 흉탄도 넘어섰던 그가 광복된 조국의 군인이 쏜 총에 쓰러졌다. 향년 73세. 접주에서 사형수로, 승려로, 임시정부 주석으로 이어진 파란만장한 삶이 여기서 끝났다.',
      card_ref: null,
    },

    // ── 33. 안두희, 그리고 풀리지 않은 진실 ──────────────────────
    {
      id: 'wp_33',
      type: 'political',
      year: 1996, month: null, day: null,
      title_ko: '안두희, 그리고 풀리지 않은 진실',
      place_ko: '대한민국',
      lat: 37.55, lng: 126.99,
      stay: null,
      summary_ko: '안두희는 1949년 종신형을 선고받았으나 한국전쟁 중 슬그머니 풀려나 군에 복귀했고, 이후 각계의 비호 속에 천수를 누리는 듯했다. 1990년대 들어 자신이 권력 기관의 사주를 받았다고 여러 차례 암시했지만 배후를 명확히 밝히지 않은 채, 1996년 버스 기사 박기서에게 정의봉으로 맞아 숨졌다. 누가, 왜 백범을 죽였는가라는 질문은 그렇게 미완으로 남았다.',
      card_ref: null,
    },

  ],

  // ── 이동 경로 선 ──────────────────────────────────────────────
  segments: [
    { from:'wp_01', to:'wp_02', move_type:'overland', line_style:'solid', note:'동학 입도' },
    { from:'wp_02', to:'wp_03', move_type:'overland', line_style:'solid', note:'해주성 공략' },
    { from:'wp_03', to:'wp_04', move_type:'overland', line_style:'dashed', note:'황해도 내 이동 (경로 미상)' },
    { from:'wp_04', to:'wp_05', move_type:'overland', line_style:'solid', note:'체포 후 압송' },
    { from:'wp_05', to:'wp_06', move_type:'overland', line_style:'solid', note:'동일 장소 — 탈옥' },
    { from:'wp_06', to:'wp_07', move_type:'overland', line_style:'dashed', note:'도피 (정확한 경로 미상)' },
    { from:'wp_07', to:'wp_08', move_type:'overland', line_style:'dashed', note:'환속 후 귀향' },
    { from:'wp_08', to:'wp_09', move_type:'overland', line_style:'solid', note:'체포·압송' },
    { from:'wp_09', to:'wp_10', move_type:'sea', line_style:'solid', note:'국내 탈출 — 상하이 망명' },
    { from:'wp_10', to:'wp_11', move_type:'overland', line_style:'solid', note:'동일 지역' },
    { from:'wp_11', to:'wp_12', move_type:'overland', line_style:'solid', note:'동일 지역' },
    { from:'wp_12', to:'wp_13', move_type:'overland', line_style:'solid', note:'동일 지역' },
    { from:'wp_13', to:'wp_14', move_type:'overland', line_style:'solid', note:'동일 지역' },
    { from:'wp_14', to:'wp_15', move_type:'overland', line_style:'dashed', note:'국내 거사 지휘 (원격)' },
    { from:'wp_15', to:'wp_16', move_type:'overland', line_style:'solid', note:'상하이 복귀' },
    { from:'wp_16', to:'wp_17', move_type:'sea', line_style:'dashed', note:'도쿄 거사 지휘 (원격)' },
    { from:'wp_17', to:'wp_18', move_type:'overland', line_style:'solid', note:'상하이 복귀 — 거사 준비' },
    { from:'wp_18', to:'wp_19', move_type:'overland', line_style:'solid', note:'현상금 피해 탈출' },
    { from:'wp_19', to:'wp_20', move_type:'overland', line_style:'solid', note:'낙양으로 이동' },
    { from:'wp_20', to:'wp_21', move_type:'overland', line_style:'solid', note:'항저우·상하이로 이동' },
    { from:'wp_21', to:'wp_22', move_type:'overland', line_style:'solid', note:'난징으로 이동' },
    { from:'wp_22', to:'wp_23', move_type:'overland', line_style:'solid', note:'전쟁을 피해 창사로 이동' },
    { from:'wp_23', to:'wp_24', move_type:'overland', line_style:'solid', note:'피격 후 피난' },
    { from:'wp_24', to:'wp_25', move_type:'overland', line_style:'solid', note:'치장으로 이동' },
    { from:'wp_25', to:'wp_26', move_type:'overland', line_style:'solid', note:'충칭으로 이동' },
    { from:'wp_26', to:'wp_27', move_type:'overland', line_style:'solid', note:'동일 지역' },
    { from:'wp_27', to:'wp_28', move_type:'overland', line_style:'solid', note:'동일 지역' },
    { from:'wp_28', to:'wp_29', move_type:'overland', line_style:'solid', note:'시안 국내정진군 준비' },
    { from:'wp_29', to:'wp_30', move_type:'sea', line_style:'solid', note:'27년 만의 귀국' },
    { from:'wp_30', to:'wp_31', move_type:'overland', line_style:'solid', note:'38선을 넘어 평양으로' },
    { from:'wp_31', to:'wp_32', move_type:'overland', line_style:'solid', note:'서울로 귀환 — 최후' },
    { from:'wp_32', to:'wp_33', move_type:'overland', line_style:'dashed', note:'사후의 진실 공방' },
  ],
};

if (typeof window !== 'undefined' && window.registerRoute) {
  window.registerRoute(ROUTE_KIM_GU);
}
