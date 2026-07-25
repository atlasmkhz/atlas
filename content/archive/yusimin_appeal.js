// content/archive/yusimin_appeal.js
// 자료실(Archive) > 역사(history) > 사료읽기(primary_sources)
// 시리즈: 유시민 항소이유서 — 법이 아니라 양심의 이름으로
//
// 원래 source_readings(원문으로 읽는 역사) 통합 시리즈 안에 있던
// 이 7편을, 훈민정음·기미독립선언서·조선혁명선언이 각각 독립
// 시리즈로 분리된 데 맞춰 마지막으로 독립시킨 것이다(2026-07-25
// 두목님 요청). source_readings 시리즈 자체는 이제 폐기됐다 —
// hwandan_gogi·hunminjeongeum_haerye·hunminjeongeum_eonhae·
// march_first_declaration·joseon_revolution_declaration과 같은
// 레벨의 독립 시리즈로 완전히 재편됐다.
//
// format: 'source_reading' — 이 시리즈를 위해 새로 추가한 형식.
//   original_ko(원문 발췌, \n 줄바꿈은 CSS white-space:pre-line로 보존)
//   + original_note(출전·판본 표기)
//   + translation_ko(현대어 풀이)
//   + commentary_ko(해설 — "왜 이 문장인가")
// 렌더링: build/generate_archive_pages.py render_post_body()의
//   source_reading 분기 + css/archive-article.css의 .post-original/
//   .post-translation/.post-commentary. nav.js 목록 요약은 commentary_ko.
//
// 저작권 유의: 이 문서(1985년 유시민 항소이유서)는 저작자가 생존해
// 있어 저작권이 만료되지 않았다. 훈민정음·기미독립선언서·조선혁명
// 선언과 달리 전문을 싣지 않는다 — 단락당 핵심 문장 1~2개(15단어
// 내외)만 인용하며, 나머지는 원저자의 표현을 다른 말로 바꿔 쓰지
// 않고 그 단락의 논리 전개 "구조"만 설명한다(2026-07-25 두목님과
// 저작권 관련 논의 후 확정). translation_ko는 비워둔다.
//
// 출처 확인(2026-07-25): 이 항소이유서는 저자 유시민이 자신의 저서
// 《아침으로 가는 길》에 직접 수록해 정식 출판했고, 현재도 전자책
// 형태로 상업 유통되고 있다(2018년 리디북스 등). 즉 이 저작물은
// 저작권이 만료되지 않았을 뿐 아니라, 저자가 지금도 그 권리를 실제
// 행사하며 상업적으로 유통시키고 있는 대상이다 — 전문 게재를 하지
// 않는 판단의 근거를 강화한다. sources 필드에 이 서지 정보를
// 반영했다.
//
// type:'document'는 이 시리즈에서 새로 쓰는 값 — nav.js들의
// ARCHIVE_TYPE_LABEL에 'document: 사료' 라벨을 함께 추가했다.

const ARCHIVE_SERIES_YUSIMIN_APPEAL = {
  id: 'yusimin_appeal',
  name: '유시민 항소이유서',
  full_name: '유시민 항소이유서 — 법이 아니라 양심의 이름으로',
  category: 'history',
  subcategory: 'primary_sources',
  period: '1985',
  tagline: '1985년 5월 27일, 26살 서울대 복학생 유시민이 서울대 프락치 사건 항소심에 제출한 항소이유서 — 40년이 지난 지금도 1980년대 학생운동을 대표하는 문서로 읽힌다',
  color: '#6e5524',
  hero_image: null,

  posts: [

    // ── 1~7. 유시민 항소이유서 7부작 (1985) ──────────────────
    // 저작권 유의: 이 문서는 훈민정음(1446)·기미독립선언서(1919)·
    // 조선혁명선언(1923)과 달리 저작자가 생존해 있어 저작권이
    // 만료되지 않았다. 따라서 이 7편은 시리즈의 다른 글과 형식이
    // 다르다 — original_ko에는 단락당 15단어 내외의 핵심 문장
    // 1~2개만 담고(그마저도 없는 편도 있다), translation_ko는 아예
    // 비워둔다(이미 현대 한글이라 불필요하기도 하고, 원문을 다른
    // 말로 바꿔 쓰는 2차가공 자체를 하지 않기 위해서다).
    // commentary_ko는 원저자의 표현을 변형해 옮기지 않고, 그
    // 단락에서 어떤 논리가 어떤 순서로 전개되는지 "구조"만 설명한다
    // — 문장을 대신 풀어써주는 게 아니라 지도를 그려주는 방식.
    // 전문은 별도 공식/공개 출처가 없어(작가 개인 사이트나
    // 공공저작물 게시 없음) 원문 링크를 제공하지 않는다.
    // (2026-07-25 두목님과 저작권 관련 논의 후 이 방식으로 확정)

    {
      id: 'yusimin_appeal_01_purpose',
      type: 'document',
      format: 'source_reading',
      year: 1985, month: 5, day: 27,
      title_ko: '유시민 항소이유서 ① 법이 아니라 양심의 이름으로',
      place_ko: '서울형사지방법원',
      lat: null, lng: null,
      card_ref: null,
      card_map: null,
      original_ko: '본 피고인은 우선 이 항소의 목적이 자신의 무죄를 주장하거나 1심 선고형량의 과중함을 호소하는데 있지 않다는 점을 분명히 밝혀두고자 합니다.',
      original_note: '1985년 5월 27일 유시민(당시 이름 류시민)이 서울형사지방법원 항소 제5부에 제출한 항소이유서 서두. 이 문서는 저작자가 생존해 있어 저작권이 만료되지 않았으므로, 다른 편의 전문 발췌와 달리 이 시리즈에서는 핵심 문장만 짧게 인용한다.',
      translation_ko: '',
      commentary_ko: '이 항소이유서는 감형이나 무죄를 다투는 통상의 항소이유서와 다른 지점에서 출발한다. 첫 문단이 그 목적부터 부인하고 시작한다는 점이 이례적이다 — 무죄 주장도, 형량 완화 호소도 아니라고 스스로 밝힌다. 이어지는 문단들은 자신의 판단 기준이 "인간이 만든 법률"이 아니라 "양심"이라는 점을 밝히고, 폭력행위가 그 사회의 정치·사회·도덕적 수준을 비추는 거울이라는 전제를 세운다. 마지막 문단에서는 이 글에서 정권 대신 "현정권"이라는 단어를 쓰는 이유(제5공화국이 합법성·정통성을 갖추지 못했다고 보기 때문)를 미리 밝혀둔다 — 이는 뒤이은 6개 장 전체가 이 정의 위에서 전개된다는 예고다. 요컨대 이 서두는 항소이유서의 장르 자체를 재정의한다: 이것은 형량을 다투는 글이 아니라, 이 사건이 비추는 시대를 법정에 묻는 글이라는 선언이다.',
      body_ko: null, claim_ko: null, rebuttal_ko: null,
      sources: [
        { type:'archive', name:'항소이유서 (1985년 5월 27일, 서울형사지방법원 항소 제5부 제출)', publisher:'', author:'유시민(류시민)', year:'1985', url:'' },
        { type:'book', name:'아침으로 가는 길 — 항소이유서 수록', publisher:'', author:'유시민', year:'', url:'' },
      ],
      related: {
        events: [], people: [ { title:'유시민', url:'' } ],
        archives: [], books: [], videos: [], artworks: [], films: [], music: [],
      },
    },

    {
      id: 'yusimin_appeal_02_regime',
      type: 'document',
      format: 'source_reading',
      year: 1985, month: 5, day: 27,
      title_ko: '유시민 항소이유서 ② "새시대"라는 이름의 신유신',
      place_ko: '서울형사지방법원',
      lat: null, lng: null,
      card_ref: null,
      card_map: null,
      original_ko: '현정권은 정식출범조차 하기 전에 도덕적으로는 이미 파산한 권력입니다.',
      original_note: '항소이유서 2편(전체 구성상 두 번째 장) 중 정권 규정 대목의 핵심 문장.',
      translation_ko: '',
      commentary_ko: '이 장은 사건의 배경이 되는 "정권과 학원간의 상호적대적 긴장상태"를 설명하기 위해, 12·12 군사쿠데타와 5·17 광주 진압을 짚은 뒤 곧바로 정권 자체의 정통성 문제로 넘어간다. 제5공화국이 내세운 "새시대"라는 표현을 유신헌법에 형식적 합법성만 덧씌운 것이라 규정하고, "정의"는 소수 군부세력의 강권통치를, "복지"는 있는 자의 쾌락을 뜻하는 말로 재정의한다. 이어 나치 독일·파시스트 이탈리아·군국주의 일본과, 스페인 프랑코 정권, 칠레·아르헨티나 군사정권, 그리고 당시 무너지고 있던 필리핀 마르코스 정권까지 나란히 세워 파시즘 체제의 두 가지 말로(대외 전쟁으로 인한 붕괴, 또는 내부 투쟁으로 인한 자멸)를 제시한다. 마지막으로 12·12 이후 4년간의 구체적 수치(구속 1,300여명, 제적 1,400여명, 강제징집 500명 이상)를 들어 학원탄압의 규모를 밝히고, 1982년 여학생 강제추행 사건 당시 치안 당국자의 국회 답변을 짧게 인용하며 정권의 상습적 거짓말이 학생들의 불신을 낳았다는 결론으로 이 장을 맺는다.',
      body_ko: null, claim_ko: null, rebuttal_ko: null,
      sources: [
        { type:'archive', name:'항소이유서 (1985년 5월 27일, 서울형사지방법원 항소 제5부 제출)', publisher:'', author:'유시민(류시민)', year:'1985', url:'' },
        { type:'book', name:'아침으로 가는 길 — 항소이유서 수록', publisher:'', author:'유시민', year:'', url:'' },
      ],
      related: {
        events: [], people: [ { title:'유시민', url:'' } ],
        archives: [], books: [], videos: [], artworks: [], films: [], music: [],
      },
    },

    {
      id: 'yusimin_appeal_03_dilemma',
      type: 'document',
      format: 'source_reading',
      year: 1985, month: 5, day: 27,
      title_ko: '유시민 항소이유서 ③ 법과 양심 사이, 빠져나갈 곳 없는 딜레마',
      place_ko: '서울형사지방법원',
      lat: null, lng: null,
      card_ref: null,
      card_map: null,
      original_ko: '그 누구도 이 상황에서 법과 양심 모두를 지키기란 불가능합니다.',
      original_note: '항소이유서 3편(사건의 정의와 성격을 다룬 장)의 결론 문장.',
      translation_ko: '',
      commentary_ko: '이 장은 사건 자체를 정의하는 데서 시작한다 — 학생들 사이에서는 "서울대 학원 프락치사건", 정권과 매스컴에서는 "서울대 외부인 폭행사건" 또는 "서울대 린치사건"으로 불렸다는 명칭의 차이를 짚고, 정권과 학원 간의 "상호적대적 긴장상태"가 형성된 배경(5·16 이후 학생운동사, 6·3사태·민청학련·부마항쟁 등)을 간략히 스케치한다. 이어 이솝우화의 양치기 소년과 중국 주 유왕의 봉화 고사를 나란히 인용해, 정권의 반복된 거짓말이 어떻게 학생들의 근원적 불신을 낳았는지 비유로 설명한다. 그 다음 "정보원 혐의를 받고 있는 자"라는 표현을 통해, 학생들이 실제 정보원이 아니라 그 혐의를 받은 이들을 조사한 것이며, 이는 정보원 여부와 별개로 폭력의 정당성 문제와는 구분해야 한다는 논리를 세운다. 캠퍼스에 상주한 "가짜학생"들의 반사회적 행태를 구체적으로 서술한 뒤, 이 장은 "부도덕한 학원탄압에 대한 저항은 윤리적으로 정당하지만 법률적으로는 침해"라는 근본적 모순으로 수렴한다 — 법과 양심이 상호적대적으로 부딪히는 상황에서는 그 누구도 둘 다를 지킬 수 없다는 이 장의 결론은, 다음 장에서 그가 어느 쪽을 선택했는지에 대한 논거가 된다.',
      body_ko: null, claim_ko: null, rebuttal_ko: null,
      sources: [
        { type:'archive', name:'항소이유서 (1985년 5월 27일, 서울형사지방법원 항소 제5부 제출)', publisher:'', author:'유시민(류시민)', year:'1985', url:'' },
        { type:'book', name:'아침으로 가는 길 — 항소이유서 수록', publisher:'', author:'유시민', year:'', url:'' },
      ],
      related: {
        events: [], people: [ { title:'유시민', url:'' } ],
        archives: [], books: [], videos: [], artworks: [], films: [], music: [],
      },
    },

    {
      id: 'yusimin_appeal_04_responsibility',
      type: 'document',
      format: 'source_reading',
      year: 1985, month: 5, day: 27,
      title_ko: '유시민 항소이유서 ④ 인정할 것과 부인할 것 — 자신의 책임을 가른 선',
      place_ko: '서울형사지방법원',
      lat: null, lng: null,
      card_ref: null,
      card_map: null,
      original_ko: '법은 인간이 만든 것이지만 양심은 하느님이 주신 것입니다.',
      original_note: '항소이유서 4편(사건 경과와 경찰 발표 반박을 다룬 장) 중 핵심 문장.',
      translation_ko: '',
      commentary_ko: '이 장은 앞 장에서 세운 법과 양심의 대립 구도를 "그래서 본 피고인은 양심을 따랐다"는 선택으로 잇는다. 이어 1984년 9월의 10일간 사건 경과를 시간순으로 서술한다 — 민한당사 농성, 총학생회 간부 4명 제명, 자신의 강제연행과 구속, 그리고 10월 4일 서울시경국장의 수사결과 발표까지. 이 발표가 사건을 "복학생협의회 대표 및 학생대표들의 합의 아래 의도적이고 조직적으로 만들어진 것"으로 규정했다는 점을 짚고, 정작 그 이전에 연행된 학생들 중 누구도 이를 뒷받침하는 진술을 하지 않았다는 사실관계를 근거로 이 발표를 "견강부회·침소봉대·날조왜곡"이라 반박한다. 그 목적이 학생운동 전체를 폭력적 이미지로 중상모략하는 데 있었다고 주장하며, 총학생회장·학도호국단장·프락치사건 대책위원장 등 대표자들이 "선전을 위한 가장 손쉬운 희생물"이 되어야 했다는 논리로 이 장을 맺는다.',
      body_ko: null, claim_ko: null, rebuttal_ko: null,
      sources: [
        { type:'archive', name:'항소이유서 (1985년 5월 27일, 서울형사지방법원 항소 제5부 제출)', publisher:'', author:'유시민(류시민)', year:'1985', url:'' },
        { type:'book', name:'아침으로 가는 길 — 항소이유서 수록', publisher:'', author:'유시민', year:'', url:'' },
      ],
      related: {
        events: [], people: [ { title:'유시민', url:'' } ],
        archives: [], books: [], videos: [], artworks: [], films: [], music: [],
      },
    },

    {
      id: 'yusimin_appeal_05_torture',
      type: 'document',
      format: 'source_reading',
      year: 1985, month: 5, day: 27,
      title_ko: '유시민 항소이유서 ⑤ 고문으로 짜낸 자백, 날조된 공소사실',
      place_ko: '서울형사지방법원',
      lat: null, lng: null,
      card_ref: null,
      card_map: null,
      original_ko: '경찰은 본 피고인들이 폭행법을 위반하였다는 증거를 바로 그 폭행법을 위반하여 짜낸 것입니다.',
      original_note: '항소이유서 5편(경찰·검찰 수사 비판 장) 중 고문 수사를 지적한 대목.',
      translation_ko: '',
      commentary_ko: '이 장은 검찰이 경찰 발표를 뒷받침하는 데만 급급했다는 지적으로 시작해, 사건 발생 한 달 뒤 관악경찰서 수사관들이 두 학생(김도형·손택만)에게 가혹행위를 가해 공소사실에 부합하는 허위자백을 얻어냈다는 사실을 구체적으로 적시한다. 폭력행위처벌법 위반 혐의의 증거 자체가 그 법을 위반한 고문으로 만들어졌다는 역설을 지적한 뒤, "법 앞의 평등" 문제로 논의를 확장한다 — 학생을 고문한 경찰관이 처벌받은 사례는 들어본 적이 없다는 점과, 1984년 5월 광주항쟁 추모집회 후 귀가하던 임산부가 경찰의 발길질에 태아를 사산했음에도 검찰이 수사조차 개시하지 않은 사례를 대비시킨다. 다만 이 장은 정권 비판에 머무르지 않는다 — 후반부에서는 학생들의 폭행 자체는 "비폭력주의에서 명백히 이탈한 행위"라 규정하고, 폭행 당사자들이 스스로 책임지지 않은 점도 "윤리적 결함"이라 인정한다. 그러면서 폭행과 무관한 총학생회장 이정우가 스스로 모든 책임을 떠안고 항소를 포기한 일을 "아름다운 행위"로 평가하며, 자신이 감금에 찬동하고 직접 조사에 관여한 부분은 "법률을 어긴 것은 틀림없는 사실이며 그에 따른 책임이라면 흔쾌히 감수할 것"이라 밝힌다 — 인정할 책임과 부인할 책임의 경계를 스스로 정밀하게 긋는 대목이다.',
      body_ko: null, claim_ko: null, rebuttal_ko: null,
      sources: [
        { type:'archive', name:'항소이유서 (1985년 5월 27일, 서울형사지방법원 항소 제5부 제출)', publisher:'', author:'유시민(류시민)', year:'1985', url:'' },
        { type:'book', name:'아침으로 가는 길 — 항소이유서 수록', publisher:'', author:'유시민', year:'', url:'' },
      ],
      related: {
        events: [], people: [ { title:'유시민', url:'' } ],
        archives: [], books: [], videos: [], artworks: [], films: [], music: [],
      },
    },

    {
      id: 'yusimin_appeal_06_court',
      type: 'document',
      format: 'source_reading',
      year: 1985, month: 5, day: 27,
      title_ko: '유시민 항소이유서 ⑥ "하늘이 무너져도 정의를 세우는" 법정을 향한 요구',
      place_ko: '서울형사지방법원',
      lat: null, lng: null,
      card_ref: null,
      card_map: null,
      original_ko: '법정이 신성한 것은 그곳에서만은 진실의 참모습을 만날 수 있기 때문입니다.',
      original_note: '항소이유서 6편(사법부에 대한 요구를 다룬 장) 중 핵심 문장.',
      translation_ko: '',
      commentary_ko: '이 장은 학생들의 행위 전부에 대한 무죄를 요구하는 것이 아니라, 부도덕에는 도덕적 경고를, 위법에는 법적 제재를 가하되 사태의 책임소재를 분명히 해야 한다는 요구로 시작한다. 이어 긴급조치 시대를 소환한다 — 당시 투옥된 1,500여 명의 양심수들도 모두 "신성한 법정"에서 유죄를 선고받았지만, 지금은 그 법이 정의로웠다고 주장하는 사람이 거의 없다는 사실을 상기시키며, 오늘의 판결도 훗날 같은 잣대로 재평가될 것이라는 경고를 던진다. "사법부가 정의를 외면해 왔다"는 말과 "정의를 세워왔다"는 말이 실제로 무엇을 뜻하는지 대구를 이루는 두 문장으로 풀어낸 뒤, 이어지는 부분에서는 1심 판결문의 구체적 오류를 짚는다 — 존재를 증명할 수 없는 "성명불상 학생"에게 지시를 내렸다는 형식논리적 모순, 손형구 본인의 법정진술과 배치되는 폭행 서술 등을 조목조목 짚으며, 판결문 대부분이 10월 4일 경찰발표문을 "토씨 하나 바꾸지 않고" 그대로 옮긴 것이라 결론짓는다.',
      body_ko: null, claim_ko: null, rebuttal_ko: null,
      sources: [
        { type:'archive', name:'항소이유서 (1985년 5월 27일, 서울형사지방법원 항소 제5부 제출)', publisher:'', author:'유시민(류시민)', year:'1985', url:'' },
        { type:'book', name:'아침으로 가는 길 — 항소이유서 수록', publisher:'', author:'유시민', year:'', url:'' },
      ],
      related: {
        events: [], people: [ { title:'유시민', url:'' } ],
        archives: [], books: [], videos: [], artworks: [], films: [], music: [],
      },
    },

    {
      id: 'yusimin_appeal_07_life',
      type: 'document',
      format: 'source_reading',
      year: 1985, month: 5, day: 27,
      title_ko: '유시민 항소이유서 ⑦ 열아홉 촌뜨기 소년에서 "폭력 과격 학생"까지',
      place_ko: '서울형사지방법원',
      lat: null, lng: null,
      card_ref: null,
      card_map: null,
      original_ko: '슬픔도 노여움도 없이 살아가는 자는 조국을 사랑하고 있지 않다.',
      original_note: '항소이유서 마지막 장의 맺음말. 러시아 시인 네크라소프의 시구를 인용한 부분.',
      translation_ko: '',
      commentary_ko: '가장 개인적인 마지막 장이다. 법관을 지망하며 1978년 상경한 열아홉 살 소년 시절부터 서술이 시작된다 — 유신 체제라는 말에 아무 위화감을 느끼지 못했던 신입생이, 최루탄 속에 머리채를 붙잡혀 끌려가는 여학생을 목격한 5월의 어느 날 이후 조금씩 변해간 과정을 담담하게 그린다. 경제학과 대표 선출, 10·26 이후 총학생회 부활운동 참여, 1980년 5·17 이후의 첫 구속과 두 달간의 조사, 그 과정에서 김대중 관련 허위진술을 강요받은 일, 40시간 만의 변칙 입대, 32개월간 "특변자"로서 받은 감시, 그리고 1983년 이른바 "녹화사업"(관제 프락치 공작)과 그 과정에서 스스로 목숨을 끊은 동료 학우 6명에 대한 언급이 이어진다. 1983년 제적학생 복교추진위원회 결성과 복학, 그리고 복학 보름 만에 다시 이 사건으로 제적·구속되기까지의 7년을 "이 시대가 가장 온순한 인간들 중에서 가장 열렬한 투사를 만들어 내는 부정한 시대이기 때문"이라는 문장으로 정리한다. 글을 쓴 날짜(5월 27일)가 서울대 학생 김태훈이 목숨을 끊은 날과 겹친다는 사실을 스스로 밝히며, 러시아 시인 네크라소프의 시구로 항소이유서를 맺는다. 이 항소는 이후에도 유죄로 확정됐지만, 이 글은 40년이 지난 지금까지 1980년대 학생운동을 대표하는 문서 중 하나로 거론된다.',
      body_ko: null, claim_ko: null, rebuttal_ko: null,
      sources: [
        { type:'archive', name:'항소이유서 (1985년 5월 27일, 서울형사지방법원 항소 제5부 제출)', publisher:'', author:'유시민(류시민)', year:'1985', url:'' },
        { type:'book', name:'아침으로 가는 길 — 항소이유서 수록', publisher:'', author:'유시민', year:'', url:'' },
      ],
      related: {
        events: [], people: [ { title:'유시민', url:'' } ],
        archives: [], books: [], videos: [], artworks: [], films: [], music: [],
      },
    },

  ],
};

window.registerArchiveSeries(ARCHIVE_SERIES_YUSIMIN_APPEAL);
