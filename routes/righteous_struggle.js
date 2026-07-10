// routes/righteous_struggle.js
// 의열투쟁 루트 — 조선의 심장을 겨누다
// 1908(장인환·전명운, 샌프란시스코) ~ 1932(윤봉길, 상하이), 24년의 기록
//
// 김원봉 루트(routes/kim_won_bong.js)가 의열단장 한 사람의 인생 여정이라면,
// 이 루트는 "누가 이끌었는가"가 아니라 "어디서, 누가, 무엇을 던졌는가"를
// 따라간다. 의열단원만이 아니다 — 소속 조직도, 시대도 조금씩 다른 이들이
// 있다: 미주의 전명운·장인환, 단독으로 나선 안중근과 강우규, 대한광복회의
// 박상진, 의열단의 여러 단원들, 사상을 세운 신채호, 그리고 의열단과는 결이
// 다른 김구의 한인애국단(이봉창·윤봉길)까지. 이들을 하나로 묶는 것은
// 조직이 아니라 방법 — 폭탄과 총, 그리고 자신의 목숨을 건 단독 거사였다.
//
// 웨이포인트 유형:
//   'battle'    의거(투탄·저격) 그 자체
//   'political' 조직 결성·이념 정립 등 의거를 뒷받침한 사건
//   'tragedy'   의거의 여파로 겪은 고문·불구 등
//   'death'     순국·처형
//
// card_ref: 기존 data/*.js 카드 id — 클릭 시 해당 카드 팝업이 열린다
// card_ref가 null이면 루트 전용 웨이포인트로 요약 팝업을 자체 생성한다
//
// 날짜는 카드 자체의 month 필드를 신뢰하지 않고(프로젝트 내 0-indexed·
// 1-indexed 혼재 문제는 routes/kim_gu.js, routes/kim_won_bong.js 상단 메모
// 참고) 별도로 검증된 날짜를 직접 기입했다.

const ROUTE_RIGHTEOUS_STRUGGLE = {
  id: 'righteous_struggle',
  name: '의열투쟁 — 조선의 심장을 겨누다',
  subject_type: 'movement',
  period: '1908~1932',
  tagline: '의열단원만이 아니었다 — 스티븐스에서 윤봉길까지, 조직도 이름도 달랐던 이들이 던진 폭탄과 총알의 기록',
  color: '#b8632f',
  total_waypoints: 21,
  hero_image: 'assets/images/route/route_righteous_struggle_hero.webp',

  card_refs: [
    'righteous_1908_01', 'organization_1909_01', 'righteous_1909_01', 'person_1910_04',
    'person_1915_01', 'righteous_1920_01', 'righteous_1920_02', 'righteous_1920_03',
    'righteous_1921_02', 'righteous_1921_03', 'righteous_1922_01', 'political_1923_01',
    'righteous_1923_01', 'righteous_1924_01', 'righteous_1926_01', 'righteous_1927_01',
    'righteous_1928_01', 'political_1931_02', 'righteous_1932_01', 'righteous_1932_02',
  ],

  waypoints: [

    // ── 1. 전명운·장인환 — 스티븐스 저격 ──────────────────────────
    {
      id: 'wp_01',
      type: 'battle',
      year: 1908, month: 3, day: 23,
      title_ko: '전명운·장인환 — 미국 땅에서 첫 총성',
      place_ko: '샌프란시스코',
      lat: 37.795, lng: -122.40,
      stay: null,
      summary_ko: '대한제국 외교 고문으로 일제의 조선 지배를 옹호해 온 미국인 스티븐스가 샌프란시스코에서 기자회견을 열자, 전명운이 먼저 그를 저지하려다 몸싸움을 벌였고 뒤이어 장인환이 총을 쏘아 처단했다. 국권을 이미 반쯤 빼앗긴 시점, 국내가 아닌 미주 땅에서 터진 첫 총성이었다. 훗날 의열단·한인애국단으로 이어지는 개인 결단형 무장 투쟁의 원형이 여기서 시작됐다.',
      card_ref: 'righteous_1908_01',
    },

    // ── 2. 안중근 — 단지동맹 ──────────────────────────────
    {
      id: 'wp_02',
      type: 'political',
      year: 1909, month: 1, day: null,
      title_ko: '안중근 — 단지동맹, 손가락을 끊어 맹세하다',
      place_ko: '연해주 연추(크라스키노)',
      lat: 42.43, lng: 130.8,
      stay: null,
      summary_ko: '동지 11명과 함께 왼손 넷째 손가락 한 마디씩을 잘라 그 피로 태극기에 "대한독립"이라 쓰고 목숨을 건 투쟁을 맹세했다. 개인의 결단이 아니라 동지들과 함께한 서약이었다는 점에서, 이후 벌어질 하얼빈 의거는 충동적 거사가 아닌 오랜 준비의 결실이었다.',
      card_ref: 'organization_1909_01',
    },

    // ── 3. 안중근 — 하얼빈 의거 ──────────────────────────────
    {
      id: 'wp_03',
      type: 'battle',
      year: 1909, month: 10, day: 26,
      title_ko: '안중근 — 하얼빈역, 이토 히로부미를 쏘다',
      place_ko: '하얼빈역',
      lat: 45.77, lng: 126.63,
      stay: null,
      summary_ko: '러시아 재무장관과 회담하러 온 이토 히로부미를 하얼빈역에서 저격해 처단했다. 대한제국 통감을 지내며 조선 침탈을 설계한 최고 책임자였다. 안중근은 현장에서 스스로 "코레아 우라(대한 만세)"를 외치며 태극기를 흔들었고, 이후 재판정에서 이는 개인적 살인이 아닌 대한의군 참모중장으로서의 정당한 전쟁 행위라고 당당히 주장했다.',
      card_ref: 'righteous_1909_01',
    },

    // ── 4. 안중근 — 뤼순 순국 ──────────────────────────────
    {
      id: 'wp_04',
      type: 'death',
      year: 1910, month: 3, day: 26,
      title_ko: '안중근 — 뤼순 감옥, 동양평화론을 남기고',
      place_ko: '뤼순(여순) 감옥',
      lat: 38.81, lng: 121.27,
      stay: null,
      summary_ko: '뤼순 감옥에서 사형이 집행됐다. 옥중에서 완성하지 못한 채 남긴 《동양평화론》은 일본이 조선을 침탈하는 대신 한·중·일이 대등하게 협력해야 한다는 구상을 담고 있었다. 서른한 살, 국권 상실을 눈앞에 둔 시점에 그가 남긴 마지막 말은 "내가 죽거든 뼈를 하얼빈 공원 곁에 묻어 두었다가, 국권이 회복되거든 고국으로 옮겨 달라"였다. 그 유해는 지금도 찾지 못했다.',
      card_ref: 'person_1910_04',
    },

    // ── 5. 박상진 — 대한광복회 총사령 ──────────────────────────
    {
      id: 'wp_05',
      type: 'political',
      year: 1915, month: 7, day: null,
      title_ko: '박상진 — 대한광복회, 국내 최대 비밀결사',
      place_ko: '대구',
      lat: 35.871, lng: 128.601,
      stay: null,
      summary_ko: '판사 시험까지 합격했던 엘리트 박상진은 법관의 길 대신 무장투쟁을 택해 대한광복회 총사령을 맡았다. 만주에 사관학교를 세워 독립군을 기르고, 부호들에게 군자금을 걷고, 친일 부호를 처단하는 국내 최대 규모의 비밀결사였다. 의열단이 등장하기 4년 전, 이미 국내에서 조직적 의열 투쟁의 토대가 마련되고 있었다.',
      card_ref: 'person_1915_01',
    },

    // ── 6. 강우규 — 남대문역 투탄 ──────────────────────────────
    {
      id: 'wp_06',
      type: 'battle',
      year: 1919, month: 9, day: 2,
      title_ko: '강우규 — 예순다섯 노인, 신임 총독에게 폭탄을',
      place_ko: '경성 남대문역(현 서울역)',
      lat: 37.5547, lng: 126.9707,
      stay: null,
      summary_ko: '3·1운동이 유혈 진압된 지 반년, 새로 부임하는 사이토 마코토 총독을 남대문역에서 노인동맹단 소속 예순다섯 노인 강우규가 폭탄으로 저격했다. 총독은 옷에 파편만 스쳤을 뿐 무사했지만, 37명이 다치고 그중 3명이 목숨을 잃었다. 3·1운동 이후 국내에서 벌어진 첫 무장 의열 투쟁이었다 — 이 소식은 두 달 뒤 지린에서 김원봉이 의열단을 결성하는 데도 직접적인 자극이 됐다.',
      card_ref: null,
    },

    // ── 7. 박재혁 — 부산경찰서 투탄 ──────────────────────────────
    {
      id: 'wp_07',
      type: 'battle',
      year: 1920, month: 9, day: 14,
      title_ko: '박재혁 — 의열단, 첫 성공한 거사',
      place_ko: '부산',
      lat: 35.1, lng: 129.04,
      stay: null,
      summary_ko: '중국 고서상으로 위장한 박재혁이 부산경찰서장에게 폭탄을 던졌다. 그해 초 시도된 의열단의 1차 국내 거사 계획이 발각돼 실패한 직후였기에, 이 한 번의 성공이 의열단의 존재를 국내외에 처음으로 각인시켰다.',
      card_ref: 'righteous_1920_01',
    },

    // ── 8. 강우규 순국 ──────────────────────────────────────
    {
      id: 'wp_08',
      type: 'death',
      year: 1920, month: 11, day: 29,
      title_ko: '강우규, 서대문형무소에서 순국하다',
      place_ko: '서대문형무소',
      lat: 37.5745, lng: 126.956,
      stay: null,
      summary_ko: '체포 후 재판 내내 당당히 자신의 행위를 주장했던 강우규가 서대문형무소에서 교수형으로 순국했다. 예순다섯의 나이로 폭탄을 든 그의 마지막 말은 "내 육신은 여기서 사라지지만, 정신은 자유 조선의 하늘에 남을 것"이었다고 전해진다.',
      card_ref: 'righteous_1920_03',
    },

    // ── 9. 최수봉 — 밀양경찰서 투탄 ──────────────────────────────
    {
      id: 'wp_09',
      type: 'battle',
      year: 1920, month: 12, day: 27,
      title_ko: '최수봉 — 고향 밀양경찰서에 폭탄을',
      place_ko: '밀양',
      lat: 35.5, lng: 128.75,
      stay: null,
      summary_ko: '박재혁의 성공에 고무된 최수봉이 자신의 고향인 밀양경찰서에 폭탄을 던졌다. 불발과 미약한 폭발로 인명 피해는 크지 않았지만, 현장에서 자결을 시도할 만큼 죽음을 각오한 거사였다. 이듬해 사형이 집행됐다.',
      card_ref: 'righteous_1920_02',
    },

    // ── 10. 박상진 순국 ──────────────────────────────────────
    {
      id: 'wp_10',
      type: 'death',
      year: 1921, month: 8, day: 11,
      title_ko: '박상진, 대구형무소에서 순국하다',
      place_ko: '대구형무소',
      lat: 35.87, lng: 128.6,
      stay: null,
      summary_ko: '친일 부호 처단과 군자금 모집 활동이 발각돼 체포된 박상진이 대구형무소에서 사형이 집행됐다. 판사가 될 수도 있었던 엘리트가 총사령이 되어 조직을 이끌다 형장의 이슬로 사라졌다. 대한광복회는 그의 순국 이후 사실상 와해됐다.',
      card_ref: 'righteous_1921_02',
    },

    // ── 11. 김익상 — 조선총독부 투탄 ──────────────────────────────
    {
      id: 'wp_11',
      type: 'battle',
      year: 1921, month: 9, day: 12,
      title_ko: '김익상 — 총독부 청사 한복판에 폭탄을',
      place_ko: '경성 조선총독부',
      lat: 37.5759, lng: 126.9772,
      stay: null,
      summary_ko: '전기 수리공으로 위장한 김익상이 식민통치의 심장부인 조선총독부 청사에 잠입해 폭탄을 던졌다. 총독 암살에는 이르지 못했지만, 백주 대낮 총독부 내부까지 뚫렸다는 사실 자체가 일제에 큰 충격이었다.',
      card_ref: 'righteous_1921_03',
    },

    // ── 12. 황포탄 의거 ──────────────────────────────────────
    {
      id: 'wp_12',
      type: 'battle',
      year: 1922, month: 3, day: 28,
      title_ko: '황포탄 의거 — 세 사람, 한 명의 육군대장',
      place_ko: '상하이 황포탄',
      lat: 31.24, lng: 121.49,
      stay: null,
      summary_ko: '일본 육군대장 다나카 기이치가 상하이에 도착하자 김익상·오성륜·이종암 세 단원이 잇따라 저격에 나섰다. 총알은 빗나가고 폭탄은 불발됐으며, 안타깝게도 현장의 서양인 여성이 총에 맞아 숨졌다. 목표를 이루지 못한 실패한 거사였지만, 의열단의 활동이 국제적 이목을 끌 만큼 대담해졌음을 보여줬다.',
      card_ref: 'righteous_1922_01',
    },

    // ── 13. 신채호 — 조선혁명선언 ──────────────────────────────
    {
      id: 'wp_13',
      type: 'political',
      year: 1923, month: 1, day: null,
      title_ko: '신채호 — 폭탄에 논리를 쥐여주다',
      place_ko: '상하이 / 베이징',
      lat: 31.245, lng: 121.47,
      stay: null,
      summary_ko: '김원봉의 요청으로 사학자 신채호가 조선혁명선언을 집필했다. "민중은 우리 혁명의 대본영이다", "폭력은 우리 혁명의 유일한 무기"라는 문장으로, 개별 폭탄 투쟁을 단순 테러가 아닌 민중 혁명의 정당한 수단으로 자리매김했다. 그는 단 한 번도 직접 폭탄을 던진 적이 없지만, 이 선언문 한 편으로 의열 투쟁 전체에 사상적 뼈대를 세운 사람이 됐다.',
      card_ref: 'political_1923_01',
    },

    // ── 14. 김상옥 — 종로경찰서 의거 ──────────────────────────────
    {
      id: 'wp_14',
      type: 'battle',
      year: 1923, month: 1, day: 12,
      title_ko: '김상옥 — 종로경찰서, 그리고 마지막 총격전',
      place_ko: '경성 종로경찰서',
      lat: 37.5705, lng: 126.9869,
      stay: null,
      summary_ko: '종로경찰서에 폭탄을 던진 뒤 은신하던 김상옥은 포위망이 좁혀오자 일본 경찰 수백 명을 상대로 총격전을 벌였다. 여러 명을 사살하며 저항하다 마지막 남은 한 발로 스스로 목숨을 끊었다. 의열단 거사 가운데 가장 극적인 최후로 꼽힌다.',
      card_ref: 'righteous_1923_01',
    },

    // ── 15. 김지섭 — 도쿄 이중교 의거 ──────────────────────────────
    {
      id: 'wp_15',
      type: 'battle',
      year: 1924, month: 1, day: 5,
      title_ko: '김지섭 — 일왕의 궁성 문 앞에 폭탄을',
      place_ko: '도쿄 궁성 이중교',
      lat: 35.6805, lng: 139.7545,
      stay: null,
      summary_ko: '관동대지진 직후 조선인 대학살에 대한 보복으로 김지섭이 일본 왕궁 정문인 이중교에 폭탄 세 개를 던졌다. 모두 불발됐지만, 일왕의 거처 코앞까지 폭탄이 날아든 사건은 일본 사회에 큰 충격을 안겼다. 의열 투쟁의 무대가 식민지 조선을 넘어 제국의 심장부까지 넓어졌음을 보여줬다.',
      card_ref: 'righteous_1924_01',
    },

    // ── 16. 나석주 — 동양척식회사 의거 ──────────────────────────
    {
      id: 'wp_16',
      type: 'battle',
      year: 1926, month: 12, day: 28,
      title_ko: '나석주 — 동양척식회사, 마지막 개별 거사',
      place_ko: '경성 동양척식주식회사·식산은행',
      lat: 37.5605, lng: 126.9815,
      stay: null,
      summary_ko: '조선 경제 수탈의 상징인 동양척식주식회사와 식산은행에 나석주가 폭탄을 던지고 일본 경찰과 총격전 끝에 스스로 목숨을 끊었다. 이 거사를 끝으로 의열단은 개별 폭탄 투쟁의 한계를 인정하고 조직적 군사 노선으로 방향을 크게 틀게 된다 — 한 시대를 마감한 거사였다.',
      card_ref: 'righteous_1926_01',
    },

    // ── 17. 김창숙 체포 — 나석주 의거의 여파 ──────────────────────
    {
      id: 'wp_17',
      type: 'tragedy',
      year: 1927, month: null, day: null,
      title_ko: '김창숙 체포 — 의열단의 자금줄이 끊기다',
      place_ko: '상하이 (공동조계 병원)',
      lat: 31.235, lng: 121.475,
      stay: null,
      summary_ko: '나석주 의거의 자금을 댔던 유림 출신 독립운동가 김창숙이 병원에서 요양하던 중 일본 경찰에 체포됐다. 국내로 압송돼 혹독한 고문을 받았고, 그 후유증으로 평생 다리를 저는 불구가 됐다. 폭탄을 던진 사람만이 아니라, 그 뒤에서 돈과 조직을 대던 사람들 역시 같은 대가를 치렀다.',
      card_ref: 'righteous_1927_01',
    },

    // ── 18. 조명하 — 타이중 의거 ──────────────────────────────
    {
      id: 'wp_18',
      type: 'battle',
      year: 1928, month: 5, day: 14,
      title_ko: '조명하 — 대만에서, 일왕의 장인을 찌르다',
      place_ko: '대만 타이중',
      lat: 24.145, lng: 120.685,
      stay: null,
      summary_ko: '일본군 장교로 복무하던 조명하가 대만을 순시하던 일왕의 장인 구니노미야 구니히코 육군대장을 단도로 찔러 처단했다. 만주도 상하이도 아닌 대만에서, 그것도 일본군 내부에서 벌어진 의거였다. 조선의 의열 투쟁이 얼마나 넓은 범위에서, 예상치 못한 곳에서도 계속되고 있었는지를 보여준다.',
      card_ref: 'righteous_1928_01',
    },

    // ── 19. 한인애국단 결성 ──────────────────────────────────
    {
      id: 'wp_19',
      type: 'political',
      year: 1931, month: 10, day: null,
      title_ko: '한인애국단 결성 — 김구, 다른 길로 폭탄을 들다',
      place_ko: '상하이',
      lat: 31.225, lng: 121.452,
      stay: null,
      summary_ko: '의열단과는 별개로, 임시정부 국무령 김구가 산하에 비밀 의열 조직 한인애국단을 결성했다. 만주사변으로 독립운동의 활로가 막힌 상황에서, 임시정부 스스로 다시 개별 의거라는 방식을 꺼내 든 것이다. 의열단이 조직 노선으로 전환한 지 몇 년 지나지 않아, 이번엔 임시정부가 그 반대의 길을 걷기 시작했다.',
      card_ref: 'political_1931_02',
    },

    // ── 20. 이봉창 — 도쿄 의거 ──────────────────────────────
    {
      id: 'wp_20',
      type: 'battle',
      year: 1932, month: 1, day: 8,
      title_ko: '이봉창 — 도쿄, 일왕 행렬에 수류탄을',
      place_ko: '도쿄 사쿠라다몬',
      lat: 35.679, lng: 139.752,
      stay: null,
      summary_ko: '한인애국단 첫 단원 이봉창이 도쿄 사쿠라다몬에서 일왕 행렬에 수류탄을 던졌다. 명중하지는 못했지만, 일왕의 목숨을 직접 겨눈 사건은 전 세계에 충격을 안겼다. 강우규가 남대문역에서, 김지섭이 이중교에서 실패했던 목표에 다시 한번 다가선 거사였다.',
      card_ref: 'righteous_1932_01',
    },

    // ── 21. 윤봉길 — 훙커우공원 의거 ──────────────────────────────
    {
      id: 'wp_21',
      type: 'battle',
      year: 1932, month: 4, day: 29,
      title_ko: '윤봉길 — 훙커우공원, 단상 위로 물통 폭탄',
      place_ko: '상하이 훙커우공원',
      lat: 31.265, lng: 121.485,
      stay: null,
      summary_ko: '일왕의 생일 겸 상하이사변 승전 축하식이 열리던 훙커우공원 단상에 윤봉길이 물통 폭탄을 던져 일본군 사령관 등 요인 다수를 죽거나 다치게 했다. 스티븐스 저격(1908)부터 24년, 이 한 번의 거사는 임시정부의 존재를 세계에 각인시키며 개별 의열 투쟁사의 정점이자 사실상의 마지막 장을 장식했다. 이후 독립운동의 무게중심은 개별 거사에서 광복군 같은 정규 군사 조직으로 넘어간다.',
      card_ref: 'righteous_1932_02',
    },

  ],

  // ── 이동 경로 선 ──────────────────────────────────────────────
  // 이 루트는 한 사람의 이동 경로가 아니라 서로 다른 사람들의 거사를
  // 시간순으로 잇는다. 따라서 대부분의 구간은 "같은 사람의 이동"이
  // 아니라 "시간 속에서 다음 의거로 넘어감"을 나타내는 점선으로 표시한다.
  segments: [
    { from:'wp_01', to:'wp_02', move_type:'overland', line_style:'dashed', note:'다른 인물 — 시간순 연결' },
    { from:'wp_02', to:'wp_03', move_type:'overland', line_style:'solid', note:'단지동맹에서 하얼빈으로' },
    { from:'wp_03', to:'wp_04', move_type:'overland', line_style:'solid', note:'체포 후 압송' },
    { from:'wp_04', to:'wp_05', move_type:'overland', line_style:'dashed', note:'다른 인물 — 시간순 연결' },
    { from:'wp_05', to:'wp_06', move_type:'overland', line_style:'dashed', note:'다른 인물 — 시간순 연결' },
    { from:'wp_06', to:'wp_07', move_type:'overland', line_style:'dashed', note:'다른 인물 — 시간순 연결' },
    { from:'wp_07', to:'wp_08', move_type:'overland', line_style:'solid', note:'강우규 순국 (체포 후 압송)' },
    { from:'wp_08', to:'wp_09', move_type:'overland', line_style:'dashed', note:'다른 인물 — 시간순 연결' },
    { from:'wp_09', to:'wp_10', move_type:'overland', line_style:'dashed', note:'다른 인물 — 시간순 연결' },
    { from:'wp_10', to:'wp_11', move_type:'overland', line_style:'dashed', note:'다른 인물 — 시간순 연결' },
    { from:'wp_11', to:'wp_12', move_type:'overland', line_style:'dashed', note:'같은 인물(김익상) 포함 — 베이징 거쳐 상하이로' },
    { from:'wp_12', to:'wp_13', move_type:'overland', line_style:'dashed', note:'다른 인물 — 시간순 연결' },
    { from:'wp_13', to:'wp_14', move_type:'overland', line_style:'dashed', note:'다른 인물 — 시간순 연결' },
    { from:'wp_14', to:'wp_15', move_type:'overland', line_style:'dashed', note:'다른 인물 — 시간순 연결' },
    { from:'wp_15', to:'wp_16', move_type:'overland', line_style:'dashed', note:'다른 인물 — 시간순 연결' },
    { from:'wp_16', to:'wp_17', move_type:'overland', line_style:'solid', note:'나석주 의거의 여파' },
    { from:'wp_17', to:'wp_18', move_type:'overland', line_style:'dashed', note:'다른 인물 — 시간순 연결' },
    { from:'wp_18', to:'wp_19', move_type:'overland', line_style:'dashed', note:'다른 인물·다른 조직 — 시간순 연결' },
    { from:'wp_19', to:'wp_20', move_type:'overland', line_style:'solid', note:'한인애국단 첫 거사' },
    { from:'wp_20', to:'wp_21', move_type:'overland', line_style:'solid', note:'한인애국단 두 번째 거사' },
  ],
};

if (typeof window !== 'undefined' && window.registerRoute) {
  window.registerRoute(ROUTE_RIGHTEOUS_STRUGGLE);
}
