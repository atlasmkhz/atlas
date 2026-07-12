// content/archive/quantum_century.js
// 자료실(Archive) > 세계사(world_history) > 과학사(science_history)
// 시리즈: 양자역학 100년 — 신은 주사위를 던지는가
//
// 자료실 세계사 카테고리의 첫 시리즈. 2025~2027년은 양자역학 탄생
// 100주년 시기다(1925 하이젠베르크 행렬역학 → 1926 슈뢰딩거 파동방정식
// → 1927 불확정성 원리·제5차 솔베이 회의). UN은 2025년을 "국제
// 양자과학기술의 해"로 선포했다.
//
// 시리즈 원칙:
// - 세계사는 인물사 위주로 쓴다 — 이론 해설이 아니라 "그 사람이 그
//   순간 무엇을 붙들고 있었는가"를 이야기로 쓴다.
// - 수식은 쓰지 않는다. E=hν, E=mc² 정도의 상징적 표기만 허용.
// - 과학적 사실관계는 주류 과학사 서술을 따른다. 일화(헬골란트,
//   아로자 등)는 본인 회고나 표준 전기에 근거한 것만 쓰고, 극화된
//   전설은 "~라고 전해진다"로 층위를 구분한다.
// - 마지막 글은 오늘의 한국 양자과학까지 연결한다 — 이 시리즈의
//   목적은 "세계사가 남의 이야기가 아니라 오늘의 우리로 이어지는
//   흐름"임을 보여주는 것이다.
// - 관련 링크로 근대 지도의 같은 해 한국사 카드를 연결한다
//   (한국은 깊게, 세계는 넓게 — 두 층을 잇는 다리가 이 시리즈다).
// - 세계사 루트(archive/world-routes/quantum-mechanics.html)와 짝을
//   이룬다. 글은 깊이, 루트는 흐름.
//
// sources[] 필드명은 generate_archive_pages.py의
// render_sources_section()이 읽는 type/name/author/publisher/year/url.

const ARCHIVE_SERIES_QUANTUM_CENTURY = {
  id: 'quantum_century',
  name: '양자역학 100년',
  full_name: '양자역학 100년 — 신은 주사위를 던지는가',
  category: 'world_history',
  subcategory: 'science_history',
  period: '1900~현재',
  tagline: '흑체복사라는 작은 균열에서 시작해 세계관을 뒤집고, 오늘 대전의 실험실까지 이어진 한 세기',
  color: '#2f3f5c',
  hero_image: null,

  posts: [

    // ── 1. 막스 플랑크 — 절망의 행동 (1900) ────────────────────
    {
      id: 'planck_1900',
      type: 'person',
      format: 'narrative',
      year: 1900, month: 12, day: 14,
      title_ko: '막스 플랑크 — "절망의 행동"이 세기를 열다',
      place_ko: '독일 베를린',
      lat: 52.5163, lng: 13.3777,
      card_ref: null, card_map: null,
      body_ko: '1900년 12월 14일, 베를린의 독일물리학회에서 42세의 이론물리학자 막스 플랑크가 흑체복사 공식의 이론적 유도를 발표했다. 뜨겁게 달군 물체가 내는 빛의 스펙트럼 — 용광로 온도를 재려는 산업적 필요와 맞닿아 있던 이 문제는 19세기 물리학이 끝내 풀지 못한 숙제였다. 플랑크는 계산을 맞추기 위해 에너지가 연속적인 흐름이 아니라 hν라는 덩어리, 곧 "양자(Quantum)" 단위로만 주고받아진다고 가정했다. 보수적인 물리학자였던 그에게 이것은 혁명 선언이 아니라 궁여지책이었다 — 훗날 그는 이를 "절망의 행동"이었다고 회고했고, 이후 여러 해 동안 자신의 가설을 고전물리학 안으로 되돌리려 애썼다. 그러나 균열은 되메워지지 않았다. 에너지가 띄엄띄엄하다는 이 가정은 아인슈타인의 광양자, 보어의 원자모형을 거쳐 사반세기 뒤 양자역학이라는 새 물리학으로 자라난다. 플랑크 자신의 삶은 그 세기의 비극을 함께 통과했다 — 첫 부인과 사별했고, 장남은 1차 대전에서 전사했으며, 차남 에르빈은 1944년 히틀러 암살 미수 사건에 연루되어 처형당했다. 나치 시기 독일에 남아 과학계를 지키려 했던 그의 선택은 지금도 평가가 엇갈리지만, 아인슈타인을 베를린으로 불러들이고 유대인 동료들을 옹호하려 했던 기록 또한 남아 있다. 그가 1900년 겨울에 연 문은, 그 자신이 상상한 것보다 훨씬 먼 곳으로 이어졌다.',
      claim_ko: null,
      rebuttal_ko: null,
      sources: [
        { type:'book', name:'양자혁명: 양자물리학 100년사', publisher:'까치', author:'만지트 쿠마르', year:'2014', url:'' },
        { type:'book', name:'퀀텀스토리: 양자역학 100년의 결정적 순간들', publisher:'반니', author:'짐 배거트', year:'2014', url:'' },
        { type:'archive', name:'The Nobel Prize in Physics 1918 — Max Planck', publisher:'nobelprize.org', author:'', year:'', url:'https://www.nobelprize.org/prizes/physics/1918/summary/' },
      ],
      related: {
        events: [
          { title:'양자역학 루트 — 지도에서 흐름 보기', url:'../world-routes/quantum-mechanics.html' },
          { title:'같은 해 한국 — 대한제국, 자주의 마지막 빛 (1900)', url:'../../map.html?event=policy_1900_01' },
        ],
        people: [ { title:'막스 플랑크', url:'' }, { title:'알베르트 아인슈타인', url:'' } ],
        archives: [], books: [], videos: [], artworks: [], films: [], music: [],
      },
    },

    // ── 2. 아인슈타인 — 기적의 해 (1905) ───────────────────────
    {
      id: 'einstein_1905',
      type: 'person',
      format: 'narrative',
      year: 1905, month: 3,
      title_ko: '아인슈타인 — 특허청 3급 심사관의 기적의 해',
      place_ko: '스위스 베른',
      lat: 46.9480, lng: 7.4474,
      card_ref: null, card_map: null,
      body_ko: '1905년의 알베르트 아인슈타인은 대학에 자리를 얻지 못해 베른 특허청에서 3급 기술심사관으로 일하는 26세 청년이었다. 그해 그는 근무 틈틈이 쓴 논문 네 편을 연달아 발표한다. 3월에는 빛이 파동이면서 동시에 에너지 알갱이 — 광양자 — 로 행동한다는 광양자 가설로 광전효과를 설명했고, 5월에는 브라운 운동으로 원자의 실재를 입증했으며, 6월에는 특수상대성이론으로 시간과 공간의 절대성을 무너뜨렸고, 9월에는 E=mc²에 이르렀다. 물리학사는 이 해를 "기적의 해"라 부른다. 흥미로운 것은 그에게 1921년 노벨상을 안긴 업적이 상대성이론이 아니라 광양자 가설이라는 점이다 — 플랑크의 양자를 "계산의 편법"이 아니라 "빛의 실제 성질"로 밀어붙인 것은 플랑크 본인조차 지나치다고 여긴 급진적 주장이었고, 그래서 양자역학의 진짜 첫 걸음은 아인슈타인이 내디뎠다고 평가된다. 그러나 역사의 아이러니는 여기서 시작된다. 양자의 문을 연 그가, 사반세기 뒤 그 문에서 걸어 나온 확률의 물리학을 끝내 받아들이지 못하고 평생의 반대자가 된 것이다. 1905년 같은 해, 지구 반대편의 대한제국은 을사늑약으로 외교권을 빼앗기고 있었다 — 한 청년이 우주의 시간을 다시 쓰던 해, 한 나라의 시간은 멈춰 서고 있었다.',
      claim_ko: null,
      rebuttal_ko: null,
      sources: [
        { type:'book', name:'아인슈타인: 삶과 우주', publisher:'까치', author:'월터 아이작슨', year:'2007', url:'' },
        { type:'book', name:'양자혁명: 양자물리학 100년사', publisher:'까치', author:'만지트 쿠마르', year:'2014', url:'' },
        { type:'archive', name:'The Nobel Prize in Physics 1921 — Albert Einstein', publisher:'nobelprize.org', author:'', year:'', url:'https://www.nobelprize.org/prizes/physics/1921/summary/' },
      ],
      related: {
        events: [
          { title:'양자역학 루트 — 지도에서 흐름 보기', url:'../world-routes/quantum-mechanics.html' },
          { title:'같은 해 한국 — 을사늑약, 외교권을 빼앗기다 (1905)', url:'../../map.html?event=policy_1905_01' },
        ],
        people: [ { title:'알베르트 아인슈타인', url:'' }, { title:'막스 플랑크', url:'' } ],
        archives: [], books: [], videos: [], artworks: [], films: [], music: [],
      },
    },

    // ── 3. 제1차 솔베이 회의 (1911) ────────────────────────────
    {
      id: 'solvay_1911',
      type: 'life',
      format: 'narrative',
      year: 1911, month: 10, day: 30,
      title_ko: '제1차 솔베이 회의 — 물리학, 처음으로 한 방에 모이다',
      place_ko: '벨기에 브뤼셀 메트로폴 호텔',
      lat: 50.8514, lng: 4.3556,
      card_ref: null, card_map: null,
      body_ko: '1911년 10월 말, 벨기에의 화학 기업가 에르네스트 솔베이가 사재를 들여 유럽 최고의 물리학자들을 브뤼셀 메트로폴 호텔로 초청했다. 주제는 "복사 이론과 양자" — 플랑크의 양자 가설이 열어놓은 균열을 어떻게 할 것인가를 놓고, 로런츠가 의장을 맡고 플랑크, 마리 퀴리, 러더퍼드, 푸앵카레 등이 둘러앉았다. 32세의 아인슈타인은 최연소급 참석자였다. 특정 국가나 대학이 아니라 "문제 하나"를 놓고 각국의 정상급 학자들이 모여 며칠씩 토론하는 이런 형식의 국제 학술회의는 당시로서는 새로운 발명이었고, 이후 솔베이 회의는 20세기 물리학의 정상회담으로 자리 잡는다. 이 첫 회의는 답을 내지 못했다 — 오히려 참석자 대부분이 "고전물리학으로는 안 된다"는 불편한 진실을 공유하게 된 자리에 가까웠다. 그러나 문제를 공유하는 것이야말로 과학이 전진하는 방식이었다. 회의의 유일한 여성 참석자였던 마리 퀴리는 바로 이 무렵 두 번째 노벨상(화학상) 수상 소식을 들었다. 16년 뒤 같은 호텔에서 열릴 제5차 회의에서 양자역학의 운명을 건 세기의 논쟁이 벌어지리라는 것을, 이때는 아무도 알지 못했다.',
      claim_ko: null,
      rebuttal_ko: null,
      sources: [
        { type:'book', name:'양자혁명: 양자물리학 100년사', publisher:'까치', author:'만지트 쿠마르', year:'2014', url:'' },
        { type:'book', name:'퀀텀스토리: 양자역학 100년의 결정적 순간들', publisher:'반니', author:'짐 배거트', year:'2014', url:'' },
        { type:'archive', name:'International Solvay Institutes — History', publisher:'solvayinstitutes.be', author:'', year:'', url:'https://www.solvayinstitutes.be' },
      ],
      related: {
        events: [
          { title:'양자역학 루트 — 지도에서 흐름 보기', url:'../world-routes/quantum-mechanics.html' },
        ],
        people: [ { title:'마리 퀴리', url:'' }, { title:'헨드릭 로런츠', url:'' }, { title:'에르네스트 솔베이', url:'' } ],
        archives: [], books: [], videos: [], artworks: [], films: [], music: [],
      },
    },

    // ── 4. 닐스 보어 — 원자의 건축가 (1913) ────────────────────
    {
      id: 'bohr_1913',
      type: 'person',
      format: 'narrative',
      year: 1913,
      title_ko: '닐스 보어 — 원자 속에 양자를 들여놓다',
      place_ko: '덴마크 코펜하겐',
      lat: 55.6805, lng: 12.5714,
      card_ref: null, card_map: null,
      body_ko: '1913년, 덴마크의 27세 물리학자 닐스 보어가 세 편의 연작 논문으로 새로운 원자 모형을 내놓았다. 그는 영국 맨체스터의 러더퍼드 연구실에서 배운 "태양계형 원자" — 원자핵 둘레를 전자가 도는 그림 — 의 치명적 결함에서 출발했다. 고전물리학대로라면 궤도를 도는 전자는 빛을 내며 순식간에 핵으로 추락해야 했다. 원자는 존재할 수 없어야 했다. 보어의 해법은 대담했다: 전자는 아무 궤도나 돌 수 없고 띄엄띄엄 정해진 궤도만 허용되며, 한 궤도에서 다른 궤도로 "건너뛸" 때만 그 차이만큼의 빛을 낸다. 플랑크와 아인슈타인의 양자를 원자의 구조 속에 정면으로 들여놓은 것이다. 이 모형은 수소가 내는 빛의 스펙트럼 선들을 놀라운 정밀도로 설명해냈고, "양자 도약"이라는 말을 물리학에 새겨 넣었다. 보어는 1921년 코펜하겐에 이론물리연구소를 세웠고, 이곳은 이후 하이젠베르크, 파울리, 디랙 등 젊은 천재들이 거쳐 가는 양자역학의 수도가 된다. 끝없이 웅얼거리며 문장을 고치는 느린 말투, 상대가 지칠 때까지 계속되는 토론 — 보어는 명쾌한 계산가라기보다 집요한 대화자였고, 바로 그 집요함이 코펜하겐을 새 물리학의 심장으로 만들었다.',
      claim_ko: null,
      rebuttal_ko: null,
      sources: [
        { type:'book', name:'퀀텀스토리: 양자역학 100년의 결정적 순간들', publisher:'반니', author:'짐 배거트', year:'2014', url:'' },
        { type:'book', name:'양자혁명: 양자물리학 100년사', publisher:'까치', author:'만지트 쿠마르', year:'2014', url:'' },
        { type:'archive', name:'The Nobel Prize in Physics 1922 — Niels Bohr', publisher:'nobelprize.org', author:'', year:'', url:'https://www.nobelprize.org/prizes/physics/1922/summary/' },
      ],
      related: {
        events: [
          { title:'양자역학 루트 — 지도에서 흐름 보기', url:'../world-routes/quantum-mechanics.html' },
        ],
        people: [ { title:'닐스 보어', url:'' }, { title:'어니스트 러더퍼드', url:'' } ],
        archives: [], books: [], videos: [], artworks: [], films: [], music: [],
      },
    },

    // ── 5. 드브로이 — 물질도 파동이다 (1924) ───────────────────
    {
      id: 'de_broglie_1924',
      type: 'person',
      format: 'narrative',
      year: 1924, month: 11,
      title_ko: '루이 드브로이 — 공작 가문의 박사논문, 물질의 파동을 말하다',
      place_ko: '프랑스 파리 소르본',
      lat: 48.8489, lng: 2.3435,
      card_ref: null, card_map: null,
      body_ko: '루이 드브로이는 프랑스의 유서 깊은 공작 가문에서 태어나 역사학을 공부하다 물리학으로 전향한 늦깎이였다. 1924년 그가 소르본에 제출한 박사논문의 핵심 발상은 단순하고도 전복적이었다: 아인슈타인이 "파동인 줄 알았던 빛이 입자이기도 하다"는 것을 보였다면, 그 반대도 성립해야 하지 않는가 — 입자인 줄 알았던 전자도 파동이어야 하지 않는가. 심사위원들은 이 대담한 대칭 논리를 어떻게 평가해야 할지 몰라 논문을 아인슈타인에게 보냈고, 아인슈타인은 "그는 거대한 장막의 한 귀퉁이를 들어올렸다"며 지지했다. 물질파 가설은 곧 실험으로 확인된다 — 1927년 미국의 데이비슨과 저머가 니켈 결정에 전자를 쏘아 파동만이 보일 수 있는 회절 무늬를 얻어낸 것이다. 전자가 파동이라면 그 파동을 지배하는 방정식이 있어야 했고, 바로 이 질문이 슈뢰딩거를 파동방정식으로 이끈다. 드브로이는 1929년 노벨상을 받았다 — 박사논문 하나로 노벨상을 받은 드문 사례였다. 역사를 공부하던 귀족 청년이 물질의 본성에 관한 인류의 상식을 바꾼 것인데, 그의 논문이 보여주듯 과학의 결정적 진보는 때로 방대한 계산이 아니라 "왜 반대는 안 되는가"라는 한 줄의 질문에서 나온다.',
      claim_ko: null,
      rebuttal_ko: null,
      sources: [
        { type:'book', name:'양자혁명: 양자물리학 100년사', publisher:'까치', author:'만지트 쿠마르', year:'2014', url:'' },
        { type:'archive', name:'The Nobel Prize in Physics 1929 — Louis de Broglie', publisher:'nobelprize.org', author:'', year:'', url:'https://www.nobelprize.org/prizes/physics/1929/summary/' },
      ],
      related: {
        events: [
          { title:'양자역학 루트 — 지도에서 흐름 보기', url:'../world-routes/quantum-mechanics.html' },
        ],
        people: [ { title:'루이 드브로이', url:'' }, { title:'알베르트 아인슈타인', url:'' } ],
        archives: [], books: [], videos: [], artworks: [], films: [], music: [],
      },
    },

    // ── 6. 하이젠베르크 — 헬골란트의 새벽 (1925) ───────────────
    {
      id: 'heisenberg_1925',
      type: 'person',
      format: 'narrative',
      year: 1925, month: 6,
      title_ko: '하이젠베르크 — 헬골란트 섬에서 양자역학이 태어나다',
      place_ko: '독일 헬골란트 섬',
      lat: 54.1833, lng: 7.8833,
      card_ref: null, card_map: null,
      body_ko: '1925년 6월, 극심한 꽃가루 알레르기에 시달리던 23세의 베르너 하이젠베르크는 풀 한 포기 없는 북해의 바위섬 헬골란트로 요양을 떠났다. 괴팅겐의 보른 밑에서 씨름하던 문제 — 보어의 원자모형이 수소 너머에서 자꾸 무너지는 문제 — 를 싸들고서였다. 섬에서 그는 발상을 뒤집었다. 전자의 "궤도"는 아무도 본 적이 없다. 관측할 수 없는 그림을 버리고, 실제로 측정되는 것 — 원자가 내는 빛의 진동수와 세기 — 만으로 역학을 다시 세우자. 그렇게 만든 계산 규칙에서는 곱하는 순서를 바꾸면 답이 달라지는 기묘한 수학이 튀어나왔고, 어느 새벽 에너지 보존이 맞아떨어지는 것을 확인한 그는 흥분을 가라앉히지 못해 바위산에 올라 해가 뜨기를 기다렸다고 회고록 《부분과 전체》에 적었다. 괴팅겐으로 돌아온 그의 계산은 보른과 요르단에 의해 행렬이라는 수학으로 정비되어 최초의 완결된 양자역학 — 행렬역학이 된다. 2년 뒤인 1927년 그는 코펜하겐에서 불확정성 원리에 도달한다: 입자의 위치와 운동량은 동시에 정확히 알 수 없으며, 이것은 측정 기술의 한계가 아니라 자연 자체의 성질이라는 것. 2025년 세계가 "양자 100주년"을 기념한 기준점이 바로 이 헬골란트의 여름이다. 훗날 그가 나치 독일의 원자폭탄 계획에 관여한 일은 지금까지도 논쟁으로 남아 있다 — 천재의 물리학과 시대 앞의 선택은 별개의 문제였다.',
      claim_ko: null,
      rebuttal_ko: null,
      sources: [
        { type:'book', name:'부분과 전체', publisher:'서커스', author:'베르너 하이젠베르크', year:'2016', url:'' },
        { type:'book', name:'불확정성: 양자물리학 혁명의 순간', publisher:'시스테마', author:'데이비드 린들리', year:'2009', url:'' },
        { type:'archive', name:'The Nobel Prize in Physics 1932 — Werner Heisenberg', publisher:'nobelprize.org', author:'', year:'', url:'https://www.nobelprize.org/prizes/physics/1932/summary/' },
      ],
      related: {
        events: [
          { title:'양자역학 루트 — 지도에서 흐름 보기', url:'../world-routes/quantum-mechanics.html' },
        ],
        people: [ { title:'베르너 하이젠베르크', url:'' }, { title:'막스 보른', url:'' }, { title:'닐스 보어', url:'' } ],
        archives: [], books: [], videos: [], artworks: [], films: [], music: [],
      },
    },

    // ── 7. 슈뢰딩거 — 파동방정식 (1926) ────────────────────────
    {
      id: 'schrodinger_1926',
      type: 'person',
      format: 'narrative',
      year: 1926, month: 1,
      title_ko: '슈뢰딩거 — 알프스의 겨울, 파동방정식을 쓰다',
      place_ko: '스위스 취리히',
      lat: 47.3744, lng: 8.5486,
      card_ref: null, card_map: null,
      body_ko: '1925년 겨울, 취리히 대학의 38세 교수 에르빈 슈뢰딩거는 드브로이의 물질파 논문을 세미나에서 소개하다 동료에게서 "파동이라면 파동방정식이 있어야 하지 않소"라는 지적을 받는다. 크리스마스 휴가를 알프스의 아로자에서 보낸 그는 해를 넘긴 1926년 1월부터 여섯 달 동안 연작 논문을 쏟아내며 그 방정식을 세웠다 — 오늘날 물리학과 학생이 가장 먼저 배우는 슈뢰딩거 방정식이다. 젊은 세대의 낯선 행렬역학과 달리, 파동방정식은 물리학자들에게 익숙한 파동의 언어로 쓰여 있어 열광적으로 받아들여졌고, 곧 두 이론이 수학적으로 동등하다는 것도 증명되었다. 같은 산을 반대편에서 오른 셈이었다. 그러나 슈뢰딩거 자신은 자기 방정식의 해석 — 파동함수가 실재하는 물결이 아니라 "확률의 진폭"이라는 보른의 해석 — 을 끝내 못마땅해했다. 그 불만을 담아 1935년에 내놓은 사고실험이 그 유명한 "슈뢰딩거의 고양이"다: 관측 전에는 살아 있으면서 동시에 죽어 있는 고양이라니, 이 얼마나 터무니없는가 — 라고 그는 양자역학의 표준 해석을 조롱하려 했지만, 아이러니하게도 이 고양이는 양자역학의 가장 유명한 홍보대사가 되어버렸다. 1933년 그는 디랙과 함께 노벨상을 받았고, 나치를 피해 아일랜드 더블린에 정착해서는 《생명이란 무엇인가》라는 강연으로 훗날 DNA 발견자들에게 영감을 주었다.',
      claim_ko: null,
      rebuttal_ko: null,
      sources: [
        { type:'book', name:'양자혁명: 양자물리학 100년사', publisher:'까치', author:'만지트 쿠마르', year:'2014', url:'' },
        { type:'book', name:'퀀텀스토리: 양자역학 100년의 결정적 순간들', publisher:'반니', author:'짐 배거트', year:'2014', url:'' },
        { type:'archive', name:'The Nobel Prize in Physics 1933 — Schrödinger, Dirac', publisher:'nobelprize.org', author:'', year:'', url:'https://www.nobelprize.org/prizes/physics/1933/summary/' },
      ],
      related: {
        events: [
          { title:'양자역학 루트 — 지도에서 흐름 보기', url:'../world-routes/quantum-mechanics.html' },
        ],
        people: [ { title:'에르빈 슈뢰딩거', url:'' }, { title:'루이 드브로이', url:'' }, { title:'막스 보른', url:'' } ],
        archives: [], books: [], videos: [], artworks: [], films: [], music: [],
      },
    },

    // ── 8. 괴팅겐 — 확률 해석과 젊은 천재들 (1926) ─────────────
    {
      id: 'gottingen_1926',
      type: 'person',
      format: 'narrative',
      year: 1926, month: 7,
      title_ko: '보른·파울리·디랙 — 확률의 물리학과 괴팅겐의 젊은 천재들',
      place_ko: '독일 괴팅겐',
      lat: 51.5413, lng: 9.9158,
      card_ref: null, card_map: null,
      body_ko: '양자역학은 한 사람의 발명품이 아니다. 하이젠베르크의 착상을 행렬이라는 수학으로 완성한 것은 괴팅겐의 스승 막스 보른과 동료 파스쿠알 요르단이었고, 1926년 보른은 여기에 가장 심오한 한 걸음을 보탠다 — 슈뢰딩거의 파동함수는 실재하는 물결이 아니라 "그 자리에서 입자가 발견될 확률"을 말해준다는 확률 해석이다. 자연의 근본 법칙이 확정된 미래가 아니라 확률만을 말해준다는 이 선언이야말로 아인슈타인이 "신은 주사위를 던지지 않는다"며 평생 거부한 지점이었다. 보른의 이 업적은 오랫동안 제대로 인정받지 못하다가 1954년에야 노벨상으로 보상받는다. 한편 빈 출신의 독설가 볼프강 파울리는 1925년 배타원리 — 한 원자 안에서 두 전자는 같은 상태에 있을 수 없다 — 를 세워 주기율표가 왜 그런 모양인지, 물질이 왜 붕괴하지 않고 버티는지를 설명했고, 케임브리지의 과묵한 폴 디랙은 1928년 양자역학과 특수상대성이론을 결합한 디랙 방정식에서 반물질의 존재를 순수하게 수학으로 예측해냈다 — 4년 뒤 우주선(宇宙線) 사진 속에서 양전자가 실제로 발견된다. 1920년대 중반의 이 몇 해 동안, 20대의 젊은이들이 괴팅겐·코펜하겐·케임브리지를 오가며 물리학을 통째로 다시 썼다. 사람들은 이 시기를 "소년 물리학(Knabenphysik)의 시대"라 불렀다.',
      claim_ko: null,
      rebuttal_ko: null,
      sources: [
        { type:'book', name:'양자혁명: 양자물리학 100년사', publisher:'까치', author:'만지트 쿠마르', year:'2014', url:'' },
        { type:'book', name:'퀀텀스토리: 양자역학 100년의 결정적 순간들', publisher:'반니', author:'짐 배거트', year:'2014', url:'' },
        { type:'archive', name:'The Nobel Prize in Physics 1954 — Max Born', publisher:'nobelprize.org', author:'', year:'', url:'https://www.nobelprize.org/prizes/physics/1954/summary/' },
      ],
      related: {
        events: [
          { title:'양자역학 루트 — 지도에서 흐름 보기', url:'../world-routes/quantum-mechanics.html' },
        ],
        people: [ { title:'막스 보른', url:'' }, { title:'볼프강 파울리', url:'' }, { title:'폴 디랙', url:'' } ],
        archives: [], books: [], videos: [], artworks: [], films: [], music: [],
      },
    },

    // ── 9. 제5차 솔베이 회의 — 세기의 논쟁 (1927) ──────────────
    {
      id: 'solvay_1927',
      type: 'life',
      format: 'narrative',
      year: 1927, month: 10, day: 24,
      title_ko: '제5차 솔베이 회의 — "신은 주사위를 던지지 않는다"',
      place_ko: '벨기에 브뤼셀',
      lat: 50.8467, lng: 4.3720,
      card_ref: null, card_map: null,
      body_ko: '1927년 10월, 브뤼셀에서 열린 제5차 솔베이 회의의 주제는 "전자와 광자" — 갓 태어난 양자역학을 어떻게 이해할 것인가였다. 참석자 29명 가운데 17명이 노벨상 수상자(당시 또는 이후)였던 이 회의의 단체 사진은 "물리학 역사상 가장 지적인 사진"으로 불린다. 앞줄 중앙에 아인슈타인, 그 곁에 마리 퀴리와 플랑크와 로런츠, 뒷줄에 하이젠베르크와 파울리, 그리고 보어와 슈뢰딩거와 디랙과 보른. 공식 일정보다 유명해진 것은 호텔 조찬장에서 벌어진 아인슈타인과 보어의 논쟁이었다. 아침마다 아인슈타인은 불확정성 원리를 무너뜨릴 사고실험을 하나씩 고안해 내밀었고, 보어는 하루 종일 고민한 끝에 저녁이면 그 허점을 찾아 반박했다. "신은 주사위를 던지지 않는다"는 아인슈타인의 항변에 보어가 "아인슈타인, 신더러 이래라저래라 하지 마시오"라고 받아쳤다는 일화가 이 논쟁을 상징한다. 대결은 1930년 제6차 회의까지 이어졌다 — 아인슈타인이 내민 "빛 상자" 사고실험을 보어가 다름 아닌 아인슈타인의 일반상대성이론을 사용해 반박한 장면은 논쟁의 절정으로 꼽힌다. 승부는 보어의 판정승으로 기울었지만 아인슈타인은 승복하지 않았고, 이 위대한 불복이 8년 뒤 EPR 논문으로, 그리고 반세기 뒤 양자정보과학이라는 새 학문으로 이어진다. 같은 해 조선에서는 좌우가 손을 잡은 신간회가 창립되고 있었다 — 브뤼셀의 물리학자들이 실재의 본성을 놓고 다투던 그 가을의 이야기다.',
      claim_ko: null,
      rebuttal_ko: null,
      sources: [
        { type:'book', name:'양자혁명: 양자물리학 100년사', publisher:'까치', author:'만지트 쿠마르', year:'2014', url:'' },
        { type:'book', name:'불확정성: 양자물리학 혁명의 순간', publisher:'시스테마', author:'데이비드 린들리', year:'2009', url:'' },
        { type:'archive', name:'International Solvay Institutes — 1927 Conference', publisher:'solvayinstitutes.be', author:'', year:'', url:'https://www.solvayinstitutes.be' },
      ],
      related: {
        events: [
          { title:'양자역학 루트 — 지도에서 흐름 보기', url:'../world-routes/quantum-mechanics.html' },
          { title:'같은 해 한국 — 신간회 창립 (1927)', url:'../../map.html?event=political_1927_01' },
        ],
        people: [ { title:'알베르트 아인슈타인', url:'' }, { title:'닐스 보어', url:'' }, { title:'마리 퀴리', url:'' } ],
        archives: [], books: [], videos: [], artworks: [], films: [], music: [],
      },
    },

    // ── 10. EPR와 고양이 — 위대한 불복 (1935) ──────────────────
    {
      id: 'epr_1935',
      type: 'document',
      format: 'narrative',
      year: 1935, month: 5,
      title_ko: 'EPR 역설과 슈뢰딩거의 고양이 — 아인슈타인의 마지막 반격',
      place_ko: '미국 프린스턴',
      lat: 40.3431, lng: -74.6551,
      card_ref: null, card_map: null,
      body_ko: '나치를 피해 미국 프린스턴에 정착한 아인슈타인은 1935년, 포돌스키·로젠과 함께 훗날 세 사람의 머리글자를 따 "EPR 논문"으로 불리게 될 반격을 내놓는다. 논리는 이렇다 — 양자역학에 따르면 한 번 상호작용한 두 입자는 아무리 멀리 떨어져도 한쪽을 측정하는 순간 다른 쪽의 상태가 즉시 정해지는 "얽힘" 상태에 놓인다. 그러나 어떤 신호도 빛보다 빠를 수 없으니, 이런 "유령 같은 원격작용"은 불가능하다. 그러므로 양자역학은 틀린 것이 아니라 불완전하다 — 우리가 아직 모르는 숨은 변수가 있을 것이다. 같은 해 슈뢰딩거는 이 논문에 화답하며 "얽힘"이라는 이름을 지었고, 상자 속에서 살아 있으면서 동시에 죽어 있는 고양이의 사고실험으로 표준 해석의 기괴함을 꼬집었다. 보어는 곧장 반박문을 냈지만, 이 논쟁은 실험으로 판가름할 방법이 없어 보였기에 물리학의 주류는 "계산은 잘 되니 철학은 접어두자"는 실용주의로 흘러갔고 EPR은 수십 년간 변방의 문제로 밀려나 있었다. 그러나 죽은 질문이 아니었다. 1964년 CERN의 존 벨이 이 철학 논쟁을 실험 가능한 수학 — 벨 부등식 — 으로 바꿔놓으면서, 아인슈타인의 마지막 반격은 20세기 후반 물리학의 가장 심오한 실험들을 낳는 씨앗이 된다.',
      claim_ko: null,
      rebuttal_ko: null,
      sources: [
        { type:'book', name:'얽힘의 시대: 대화로 재구성한 20세기 양자물리학의 역사', publisher:'부키', author:'루이자 길더', year:'2012', url:'' },
        { type:'paper', name:'Can Quantum-Mechanical Description of Physical Reality Be Considered Complete?', publisher:'Physical Review 47', author:'A. Einstein, B. Podolsky, N. Rosen', year:'1935', url:'' },
      ],
      related: {
        events: [
          { title:'양자역학 루트 — 지도에서 흐름 보기', url:'../world-routes/quantum-mechanics.html' },
        ],
        people: [ { title:'알베르트 아인슈타인', url:'' }, { title:'에르빈 슈뢰딩거', url:'' }, { title:'닐스 보어', url:'' } ],
        archives: [], books: [], videos: [], artworks: [], films: [], music: [],
      },
    },

    // ── 11. 벨과 아스페 — 논쟁, 실험이 되다 (1964·1982) ────────
    {
      id: 'bell_aspect',
      type: 'person',
      format: 'narrative',
      year: 1964,
      title_ko: '존 벨과 알랭 아스페 — 30년 철학 논쟁을 실험대에 올리다',
      place_ko: '스위스 제네바 CERN',
      lat: 46.2330, lng: 6.0557,
      card_ref: null, card_map: null,
      body_ko: '제네바의 유럽입자물리연구소(CERN)에서 가속기 설계를 본업으로 하던 북아일랜드 출신 물리학자 존 벨은, 휴가 중이던 1964년 짬을 내 쓴 짧은 논문 하나로 아인슈타인-보어 논쟁의 운명을 바꿔놓았다. 그는 "숨은 변수가 있는 세계"와 "양자역학의 세계"가 실험에서 서로 다른 숫자를 내놓을 수밖에 없는 지점을 수학으로 짚어냈다 — 벨 부등식이다. 30년간 검증 불가능한 철학으로 취급되던 문제가 하루아침에 실험 물리학의 질문이 된 것이다. 1970년대 미국의 존 클라우저가 첫 실험에 나섰고, 1982년 파리 근교 오르세의 알랭 아스페가 광자가 날아가는 도중에 측정 방향을 바꾸는 정교한 실험으로 빈틈을 메웠으며, 1990년대 이후 오스트리아의 안톤 차일링거가 남은 허점들을 하나씩 봉쇄했다. 결과는 매번 같았다 — 자연은 벨 부등식을 깬다. 얽힘은 실재하며, 아인슈타인이 기대한 숨은 변수의 세계는 없었다. 세 실험가는 2022년 노벨물리학상을 받았다. 그러나 이것은 아인슈타인의 패배담이 아니다 — 그의 집요한 반론이 없었다면 EPR도, 벨도, 얽힘의 실험도 없었을 것이고, 얽힘이 "철학"에서 "자원"으로 바뀌며 열린 양자암호와 양자컴퓨터의 시대도 없었을 것이다. 위대한 반대자가 새 학문의 아버지가 된 셈이다.',
      claim_ko: null,
      rebuttal_ko: null,
      sources: [
        { type:'book', name:'얽힘의 시대: 대화로 재구성한 20세기 양자물리학의 역사', publisher:'부키', author:'루이자 길더', year:'2012', url:'' },
        { type:'archive', name:'The Nobel Prize in Physics 2022 — Aspect, Clauser, Zeilinger', publisher:'nobelprize.org', author:'', year:'', url:'https://www.nobelprize.org/prizes/physics/2022/summary/' },
      ],
      related: {
        events: [
          { title:'양자역학 루트 — 지도에서 흐름 보기', url:'../world-routes/quantum-mechanics.html' },
        ],
        people: [ { title:'존 벨', url:'' }, { title:'알랭 아스페', url:'' }, { title:'안톤 차일링거', url:'' } ],
        archives: [], books: [], videos: [], artworks: [], films: [], music: [],
      },
    },

    // ── 12. 오늘 — 2차 양자혁명과 한국 (현재) ──────────────────
    {
      id: 'korea_quantum_today',
      type: 'life',
      format: 'narrative',
      year: 2025,
      title_ko: '2차 양자혁명 — 그리고 대전의 실험실까지',
      place_ko: '대한민국 대전',
      lat: 36.3888, lng: 127.3720,
      card_ref: null, card_map: null,
      body_ko: '1세기 전의 양자역학이 "자연을 이해하는" 혁명이었다면, 지금 진행 중인 2차 양자혁명은 중첩과 얽힘을 "직접 부려 쓰는" 혁명이다. 1980년대 초 리처드 파인만이 "자연은 양자니까, 자연을 제대로 시뮬레이션하려면 컴퓨터도 양자여야 한다"고 제안한 이래, 1994년 쇼어의 소인수분해 알고리즘이 양자컴퓨터의 파괴력을 예고했고, 2019년 구글이 양자 프로세서로 "양자 우월성" 달성을 주장하며 경쟁에 불을 붙였다. 초전도 회로, 이온트랩, 광자 — 어느 방식이 이길지 아직 아무도 모르는 이 경주에 한국도 뛰어들어 있다. 이온트랩 방식의 대표 주자인 미국 IonQ의 공동창업자가 한국 출신 물리학자 김정상 듀크대 교수라는 사실은 잘 알려져 있고, 대전의 한국표준과학연구원(KRISS)은 국산 초전도 양자컴퓨터를 개발해 큐비트 수를 늘려가고 있으며, 2023년에는 양자과학기술을 국가 전략기술로 육성하기 위한 양자과학기술산업법이 제정되었다. UN은 하이젠베르크의 헬골란트로부터 100년이 되는 2025년을 "국제 양자과학기술의 해"로 선포했다. 플랑크의 베를린에서 시작해 브뤼셀의 논쟁과 제네바의 실험을 거쳐 대전의 극저온 실험실까지 — 이 지도의 다른 페이지들이 보여주듯 한국의 20세기가 나라를 되찾고 세우는 시간이었다면, 그 세기 동안 세계가 쌓아온 이 학문에 한국이 당당한 참가자로 합류한 것은 그 자체로 하나의 역사다. 100년 전 브뤼셀의 조찬장에서 시작된 질문들은 아직 다 답해지지 않았고, 그 답의 일부는 이제 한국어로 쓰일 것이다.',
      claim_ko: null,
      rebuttal_ko: null,
      sources: [
        { type:'government', name:'양자과학기술 및 양자산업 육성에 관한 법률', publisher:'국가법령정보센터', author:'', year:'2023', url:'https://www.law.go.kr' },
        { type:'government', name:'한국표준과학연구원(KRISS) 양자컴퓨팅 연구 소개', publisher:'KRISS', author:'', year:'', url:'https://www.kriss.re.kr' },
        { type:'archive', name:'International Year of Quantum Science and Technology 2025', publisher:'quantum2025.org', author:'', year:'2025', url:'https://quantum2025.org' },
        { type:'book', name:'나 없이는 존재하지 않는 세상', publisher:'쌤앤파커스', author:'카를로 로벨리', year:'2023', url:'' },
      ],
      related: {
        events: [
          { title:'양자역학 루트 — 지도에서 흐름 보기', url:'../world-routes/quantum-mechanics.html' },
        ],
        people: [ { title:'리처드 파인만', url:'' }, { title:'김정상', url:'' } ],
        archives: [], books: [], videos: [], artworks: [], films: [], music: [],
      },
    },

  ],
};

if (typeof window !== 'undefined' && typeof window.registerArchiveSeries === 'function') {
  window.registerArchiveSeries(ARCHIVE_SERIES_QUANTUM_CENTURY);
}
