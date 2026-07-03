// archive/power_accountability.js
// 자료실(Archive) > 역사(history) > 시대연구(era_study)
// docs/power_accountability_roadmap.md §3~5 스키마의 첫 파일럿 사건카드.
//
// category/subcategory는 maps/modern2/build/generate_archive_pages.py의
// CATEGORY_LABELS/SUBCATEGORY_LABELS를 그대로 따른다. subcategory는
// 'people_study'(인물연구)가 아니라 'era_study'(시대연구)다 — 이 시리즈는
// 인물의 전체 생애사 프로필이 아니라 "권력형 사건의 사법처리 과정"이라는
// 반복되는 시대적 패턴을 다룬다. 인물 자체의 전체 궤적(예: 전두환의 출생~
// 12·12~5·18~재임~사법처리~사망)은 이미 modern2 Route(routes/chun_doo_hwan.js)
// 가 담당하고 있고, 앞으로 만들 §5 인물카드(대통령·고위공직자·재벌총수 프로필:
// 재임기간·정책·업적·논란·사면여부)가 'people_study'를 쓴다 — 이 둘을
// 섞지 않는다.
//
// 이 시리즈는 historical_revisionism.js와 형식은 같지만(ARCHIVE_SERIES 구조,
// 3단계 계층), format이 다르다 — claim_rebuttal/narrative 대신 새 값
// 'case_tracking'을 쓴다. 법적 절차가 여러 단계(1심→2심→대법원→파기환송심→
// 재상고심→사면)를 거치는 사건이라 고정된 필드가 아니라 stages[] 배열로
// 표현한다(로드맵 §3 참고).
//
// 원칙(로드맵 §0):
// - body_ko(사실관계)와 legacy_ko(역사적 평가)를 명확히 분리한다. body_ko에는
//   "~로 평가된다", "~라는 비판을 받았다" 같은 해석성 문장을 넣지 않는다.
// - 여야·진영 구분 없이 동일 기준 적용 — 이 사건카드의 stages/sources 구조는
//   이후 만들 모든 카드에도 동일하게 적용된다.
// - sources[]는 generate_archive_pages.py의 render_sources_section()이
//   실제로 읽는 필드명(type/name/author/publisher/year/url)을 그대로
//   쓴다. 초안에서는 title/kind/date라는 임의 필드명을 썼는데, 실제
//   렌더러가 읽는 필드와 달라 빌드해도 출처가 안 나왔을 것 — 이식 작업
//   중 발견해 수정함.
// - related.people/events는 render_related_section()이 {title,url} 객체를
//   기대한다(it.get("title","")). 초안에서는 문자열 배열('박근혜' 같은)을
//   썼는데, 문자열엔 .get()이 없어 실제로 빌드하면 AttributeError로
//   죽었을 것 — 이식 작업 중 발견해 {title,url} 객체로 수정함
//   (url은 people은 인물카드가 없어 빈 문자열, events는 지도 딥링크로 채움).
// - 파일 끝에서 window.registerArchiveSeries(...)를 호출해야
//   extract_archive.js가 이 시리즈를 인식한다 — 초안에서 빠져 있던 걸
//   이식 작업 중 발견해 추가함.
//
// TODO(왕두목 확인): 판결문 원문 링크(대법원 종합법률정보, 헌재 결정문 검색)는
// 아직 url을 못 붙였다 — 실제 링크로 교체 필요. namuwiki/위키백과 출처
// 몇 건은 court/newspaper 어디에도 정확히 안 맞는 2차 정리자료라 임시로
// 'newspaper'에 넣어뒀다 — 원 기사(연합뉴스 등)로 교체하는 게 맞다.
// TODO(스키마): related.institutions는 RELATED_SECTION_LABELS(이벤트/인물/
// 사료/도서/영상/미술/영화/음악 8종)에 없는 새 필드라, 지금 빌드 스크립트는
// 이 값을 렌더링하지 않는다(단, 크래시도 안 난다 — 그냥 조용히 무시됨).
// 로드맵 §5(인물카드 related_institutions)와 함께 나중에 빌드 스크립트를
// 확장해야 한다.
// TODO(스키마): format:'case_tracking'(stages[]/legacy_ko)은
// contemporary/build/generate_archive_pages.py에 렌더링 로직을 새로
// 추가해서 지원한다(포팅 작업의 일부, 아래 커밋에서 처리).

const ARCHIVE_SERIES_POWER_ACCOUNTABILITY = {
  id: 'power_accountability',
  name: '권력과 책임',
  full_name: '권력과 책임 — 대한민국 권력감시의 역사',
  category: 'history',
  subcategory: 'era_study',
  period: '1988~현재',
  tagline: '누가 권력을 쥐었고, 그 권력은 어떻게 감시받았는가 — 진영을 가리지 않는 동일한 기준으로',
  color: '#5a3d2b',
  hero_image: null,

  posts: [

    // ── 1. 박근혜-최순실 국정농단 사건 ──────────────────────
    {
      id: 'park_geun_hye_gukjeongnongdan',
      type: 'political',
      format: 'case_tracking',
      year: 2016, month: 10, day: 24,
      title_ko: '박근혜-최순실 국정농단 사건',
      title_en: 'The Park Geun-hye–Choi Soon-sil Influence-Peddling Scandal',
      place_ko: '서울',
      lat: 37.5665, lng: 126.9780,

      // 지도(2016.js)의 발각 시점 이벤트카드와 연결 — 이 자료실 카드가
      // 대체하는 게 아니라 사건 전체(수사~사면까지)를 깊게 다루는 확장판.
      card_ref: 'political_2016_01',
      card_map: 'contemporary',

      allegation_status: 'pardoned',

      // ── 사실관계 (평가 배제) ──
      body_ko: '2016년 10월 24일 JTBC가 최순실 소유로 추정되는 태블릿PC에서 대통령 연설문 등 청와대 문건이 발견됐다고 보도하며 사건이 시작됐다. 검찰 특별수사본부가 최순실·안종범 전 정책조정수석 등을 수사하는 사이, 박근혜 대통령은 미르재단·K스포츠재단 설립 과정에서 대기업들에 출연을 강요하고 삼성으로부터 정유라 승마 지원 등 뇌물을 받은 혐의를 받았다. 12월 9일 국회가 탄핵소추안을 가결했고, 박영수 특별검사팀의 수사를 거쳐 2017년 3월 10일 헌법재판소가 재판관 전원일치로 대통령을 파면했다. 검찰은 4월 17일 박근혜를 특정범죄가중처벌법상 뇌물수수 등 18개 혐의로 구속기소했다. 2018년 4월 6일 서울중앙지법 1심은 징역 24년·벌금 180억원을, 8월 24일 서울고법 2심은 징역 25년·벌금 200억원을 선고했다. 2019년 8월 29일 대법원 전원합의체는 뇌물 혐의를 다른 혐의와 분리 선고하지 않은 절차상 오류를 이유로 유죄 부분을 파기환송하고 무죄 부분만 확정했다. 국정원 특수활동비 상납 사건과 병합된 파기환송심은 2020년 7월 10일 징역 20년·벌금 180억원·추징금 35억원을 선고했고, 2021년 1월 14일 대법원 재상고심이 상고를 기각하며 형이 최종 확정됐다(국정농단 15년+특활비 상납 5년). 별도로 진행된 새누리당 공천개입 사건에서도 징역 2년이 확정돼 총 형기는 22년이었다. 2021년 12월 24일 문재인 대통령은 국민 통합과 건강 악화를 이유로 박근혜를 특별사면·복권한다고 발표했고, 12월 31일자로 석방됐다. 2017년 3월 31일 구속부터 사면까지 수감 기간은 총 1,737일이었다.',

      stages: [
        { stage:'의혹 보도', date:'2016-10-24', institution:'언론(JTBC)', detail:'최순실 태블릿PC 보도로 청와대 문건 유출 의혹 제기', result:null },
        { stage:'수사개시', date:'2016-10', institution:'검찰 특별수사본부', detail:'최순실·안종범 등 수사 착수', result:null },
        { stage:'탄핵소추', date:'2016-12-09', institution:'국회', detail:null, result:'가결' },
        { stage:'특검수사', date:'2017-02', institution:'박영수 특별검사팀', detail:null, result:null },
        { stage:'헌재 파면', date:'2017-03-10', institution:'헌법재판소', detail:'재판관 전원일치', result:'파면' },
        { stage:'구속기소', date:'2017-04-17', institution:'검찰', detail:'특가법상 뇌물수수 등 18개 혐의', result:null },
        { stage:'1심', date:'2018-04-06', institution:'서울중앙지방법원', detail:null, result:'징역 24년·벌금 180억원 (18개 혐의 중 16개 유죄)' },
        { stage:'2심', date:'2018-08-24', institution:'서울고등법원', detail:null, result:'징역 25년·벌금 200억원' },
        { stage:'대법원(파기환송)', date:'2019-08-29', institution:'대법원 전원합의체', detail:'뇌물 혐의 분리선고 원칙 위반', result:'유죄 부분 파기환송, 무죄 부분 확정' },
        { stage:'파기환송심', date:'2020-07-10', institution:'서울고등법원', detail:'국정원 특활비 상납 사건과 병합', result:'징역 20년·벌금 180억원·추징금 35억원' },
        { stage:'재상고심(확정)', date:'2021-01-14', institution:'대법원', detail:'국정농단 15년+특활비 상납 5년', result:'상고기각, 징역 20년 확정' },
        { stage:'사면', date:'2021-12-31', institution:'대통령(문재인)', detail:'국민 통합·건강 악화 사유', result:'특별사면·복권' }
      ],

      // ── 역사적 평가 (body_ko와 분리) ──
      legacy_ko: '이 사건은 현직 대통령이 헌법재판소 결정으로 파면된 헌정사 첫 사례이자, 매주 대규모로 열린 촛불집회가 제도적 탄핵으로 이어진 시민권력 행사의 상징으로 꼽힌다. 재벌 총수(이재용)가 뇌물공여자로 함께 처벌받으면서 정경유착 구조에 대한 사법적 심판이라는 의미도 얻었다. 그러나 구속 4년 9개월 만의 특별사면은 평가가 크게 갈렸다 — "촛불정신의 배신"이라는 비판과 "국민 화합을 위한 결단"이라는 옹호가 첨예하게 대립했고, 사면에 앞서 당사자의 공개 사과나 반성 표명이 없었다는 점이 특히 논란이 됐다. "지지하는 정치 성향에 따라 봐주기·안 봐주기를 가른다면 처벌받을 권력자는 없다"는 지적처럼, 권력형 범죄에 대한 사법 처리와 그 이후의 사면권 행사가 어떻게 조화돼야 하는지는 이 사건 이후에도 한국 사회의 미해결 과제로 남아 있다.',

      sources: [
        { type:'court', name:'헌법재판소 2016헌나1 대통령(박근혜) 탄핵 결정', publisher:'헌법재판소', author:'', year:'2017', url:'' },
        { type:'court', name:'대법원 2019도17879 판결(파기환송)', publisher:'대법원', author:'', year:'2019', url:'' },
        { type:'court', name:'대법원 2020도16401 판결(재상고심 확정)', publisher:'대법원', author:'', year:'2021', url:'' },
        { type:'newspaper', name:'"대법원, 박근혜 전 대통령 2심 판결 파기환송"', publisher:'경향신문', author:'', year:'2019', url:'' },
        { type:'newspaper', name:'"[朴 선고 후폭풍] 4년 끈 세기의 재판 어떻게 달라졌나"', publisher:'시사저널', author:'', year:'2021', url:'' },
        { type:'newspaper', name:'"박근혜 사면 결단한 문 대통령, 두 가지 이유 있었다"', publisher:'SBS뉴스', author:'', year:'2021', url:'' },
        { type:'newspaper', name:'"박근혜 사면 명분 국민 화합... 이명박과 박근혜는 다르다"', publisher:'오마이뉴스', author:'', year:'2021', url:'' },
        { type:'newspaper', name:'박근혜/재판, 박근혜-최순실 게이트/재판 (사건 일지 정리 — 1차사료 아님, 원 기사로 교체 필요)', publisher:'나무위키', author:'', year:'', url:'' }
      ],

      related: {
        people: [
          { title:'박근혜', url:'' }, { title:'최순실', url:'' }, { title:'이재용', url:'' },
          { title:'안종범', url:'' }, { title:'정호성', url:'' }, { title:'조원동', url:'' }
        ],
        events: [
          { title:'박근혜-최순실 국정농단 사건 발각 (2016)', url:'../../maps/contemporary/index.html?event=political_2016_01' },
          { title:'촛불집회 시작 (2016)', url:'../../maps/contemporary/index.html?event=movement_2016_01' },
          { title:'박근혜 대통령 탄핵소추안 가결 (2016)', url:'../../maps/contemporary/index.html?event=political_2016_02' },
          { title:'헌법재판소, 박근혜 대통령 파면 (2017)', url:'../../maps/contemporary/index.html?event=political_2017_01' },
          { title:'박근혜 전 대통령 구속 (2017)', url:'../../maps/contemporary/index.html?event=political_2017_02' }
        ],
        institutions: ['헌법재판소','대법원','서울중앙지방법원','서울고등법원','검찰 특별수사본부','박영수 특검팀','청와대','국회'],
        archives: [], books: [], videos: [], artworks: [], films: [], music: []
      },

      // relation-typed connections (로드맵 §6 실험 적용 — 기존 카드들은
      // 여전히 문자열 배열 connections를 쓰고, 이 필드가 그걸 대체하지
      // 않는다. 이 파일럿에서만 새 구조를 시범 사용한다.)
      connections: [
        { to:'political_2017_01', relation:'caused' },
        { to:'political_2017_02', relation:'caused' },
        { to:'movement_2016_01',  relation:'caused' }
      ]
    },

    // ── 2. 전두환 비자금 사건 ──────────────────────
    {
      id: 'chun_doo_hwan_bijageum',
      type: 'political',
      format: 'case_tracking',
      year: 1995, month: 12, day: 3,
      title_ko: '전두환 비자금 사건',
      title_en: 'Chun Doo-hwan Slush Fund Case',
      place_ko: '서울',
      lat: 37.5665, lng: 126.9780,

      card_ref: 'political_1995_02',
      card_map: 'contemporary',

      allegation_status: 'pardoned',

      // ── 사실관계 (평가 배제) ──
      body_ko: '1995년 10월 19일 민주당 박계동 의원이 노태우 전 대통령의 4000억원대 비자금 은닉 계좌를 국회에서 폭로하며 수사가 시작됐다. 검찰이 노태우를 구속(11월 16일)한 데 이어, 헌정질서 파괴범죄의 공소시효 특례법 제정(12월 21일)에 힘입어 전두환도 12·12 군사반란 및 5·18 내란 혐의, 그리고 재임 중 재벌들로부터 조성한 비자금(뇌물수수) 혐의로 12월 3일 구속됐다. 검찰은 이듬해 1월 두 사람을 반란수괴·내란목적살인·특정범죄가중처벌법상 뇌물수수 등 혐의로 구속기소했다. 1996년 8월 26일 서울지방법원 1심은 전두환에게 사형, 노태우에게 징역 22년 6개월과 함께 각각 거액의 추징금을 선고했다. 12월 16일 서울고법 2심은 전두환을 무기징역, 노태우를 징역 17년으로 감형하고 추징금도 일부 줄였다. 1997년 4월 17일 대법원 전원합의체는 상고를 모두 기각하고 전두환에게 무기징역과 추징금 2205억원을, 노태우에게 징역 17년과 추징금 2628억원을 확정했다. 그해 12월 22일 김영삼 대통령은 김대중 대통령 당선인과의 협의를 거쳐 "국민 대화합"을 명분으로 두 사람을 특별사면·복권했다 — 다만 추징금은 사면 대상에서 제외됐고, 검찰은 추징 시효를 연장해 계속 추징하기로 했다. 노태우는 이후 추징금을 완납했지만, 전두환은 재판정에서 "전 재산이 29만원"이라고 말하는 등 비협조로 일관했다. 2013년 국회는 추징 시효를 3년에서 10년으로 늘리고 제3자 명의 재산까지 추징할 수 있도록 하는 일명 "전두환 추징법"(공무원범죄에 관한 몰수특례법 개정안)을 통과시켰다. 2021년 11월 23일 전두환이 사망할 때까지 검찰은 추징금 2205억원 중 1249억원(약 57%)을 환수했지만, 형사소송법상 미납 추징금은 상속되지 않아 집행이 중단되면서 나머지 956억원(약 43%)은 사실상 추징이 불가능해졌다.',

      stages: [
        { stage:'수사개시', date:'1995-10', institution:'대검찰청 중앙수사부', detail:'노태우 비자금 국회 폭로(박계동 의원, 10.19) 이후 수사 착수', result:null },
        { stage:'구속', date:'1995-12-03', institution:'검찰', detail:'전두환 구속(노태우는 11월 16일 먼저 구속)', result:null },
        { stage:'구속기소', date:'1996-01', institution:'검찰', detail:'반란수괴·내란목적살인·특정범죄가중처벌법상 뇌물수수 등 혐의', result:null },
        { stage:'1심', date:'1996-08-26', institution:'서울지방법원', detail:null, result:'전두환 사형, 노태우 징역 22년 6개월, 각각 거액 추징금' },
        { stage:'2심', date:'1996-12-16', institution:'서울고등법원', detail:null, result:'전두환 무기징역, 노태우 징역 17년으로 감형, 추징금도 일부 감액' },
        { stage:'대법원(확정)', date:'1997-04-17', institution:'대법원 전원합의체', detail:'상고 전부 기각', result:'전두환 무기징역·추징금 2205억원, 노태우 징역17년·추징금 2628억원 확정' },
        { stage:'사면', date:'1997-12-22', institution:'대통령(김영삼)', detail:'김대중 대통령 당선인과 협의, "국민 대화합" 명분. 추징금은 사면 대상에서 제외', result:'특별사면·복권 (형 집행 면제, 추징금 의무는 유지)' },
        { stage:'추징시효 연장', date:'2013-06-27', institution:'국회', detail:'공무원범죄에 관한 몰수특례법 개정(일명 "전두환 추징법") — 추징시효 3→10년, 제3자 명의 재산도 추징 대상 확대', result:'국회 통과' },
        { stage:'추징 절차 사실상 종결', date:'2021-11-23', institution:'검찰(서울중앙지검 범죄수익환수부)', detail:'전두환 사망 — 형사소송법상 미납 추징금은 상속되지 않아 집행 중단', result:'2205억원 중 1249억원(약 57%) 환수, 956억원(약 43%) 미납 상태로 사실상 종결' }
      ],

      // ── 역사적 평가 (body_ko와 분리) ──
      legacy_ko: '이 사건은 "성공한 쿠데타도 처벌할 수 있다"는 원칙을 헌정사에 처음 세운 사례로 평가된다 — 이전까지 한국 사회에는 군사정권의 집권 과정 자체를 사후에 형사처벌한 전례가 없었다. 그러나 결말은 두 갈래로 엇갈렸다. 노태우는 추징금을 완납해 법적 책임을 끝까지 이행한 반면, 전두환은 사면으로 형 집행은 면제받았으면서도 재산형(추징금)에는 16년 넘게 비협조로 일관하다 결국 미납 상태로 사망했다. 형사처벌(무기징역)에 대한 사면과 재산환수(추징금) 의무가 서로 다른 절차라는 점, 그리고 사면이 모든 법적 책임의 종결을 의미하지는 않는다는 점을 보여주는 대표적 사례다. 법정에서 나온 "전 재산이 29만원"이라는 발언은 이후 한국 사회에서 권력형 재산 은닉을 상징하는 표현으로 자리 잡았다. 미납 추징금 문제는 2021년 그의 사망 이후에도 관련 법 개정 논의로 이어지며 현재진행형 과제로 남아 있다.',

      sources: [
        { type:'court', name:'대법원 1997.4.17. 선고 96도3377 전원합의체 판결', publisher:'대법원', author:'', year:'1997', url:'' },
        { type:'court', name:'서울지방법원 1996.8.26. 선고 95고합1228 판결', publisher:'서울지방법원', author:'', year:'1996', url:'' },
        { type:'court', name:'서울고등법원 1996.12.16. 선고 96노1893 판결', publisher:'서울고등법원', author:'', year:'1996', url:'' },
        { type:'newspaper', name:'"군인 전두환…대통령 전두환, 그리고… \'전두환 추징법\'"', publisher:'경향신문', author:'', year:'2013', url:'' },
        { type:'newspaper', name:'"전두환, 추징금 956억원 안 내고 유죄 판결 안 받고 사망"', publisher:'경향신문', author:'', year:'2021', url:'' },
        { type:'newspaper', name:'"검찰, 전두환 추징금 1235억 추징…미납액 970억"', publisher:'헤럴드경제', author:'', year:'2021', url:'' },
        { type:'newspaper', name:'전두환·노태우 전 대통령 구속 사건 (사건 일지 정리 — 1차사료 아님, 원 기사로 교체 필요)', publisher:'위키백과', author:'', year:'', url:'' },
        { type:'newspaper', name:'전두환/추징금 환수 (사건 일지 정리 — 1차사료 아님, 원 기사로 교체 필요)', publisher:'나무위키', author:'', year:'', url:'' }
      ],

      related: {
        people: [
          { title:'전두환', url:'' }, { title:'노태우', url:'' }, { title:'김영삼', url:'' },
          { title:'김대중', url:'' }, { title:'전재국', url:'' }
        ],
        events: [
          { title:'전두환·노태우 구속 — 역사바로세우기 (1995)', url:'../../maps/contemporary/index.html?event=political_1995_02' }
        ],
        institutions: ['서울지방법원','서울고등법원','대법원','검찰(서울중앙지검 범죄수익환수부)','국회','청와대'],
        archives: [], books: [], videos: [], artworks: [], films: [], music: []
      },

      connections: []
    },

    // ── 3. 이재용 삼성 부당합병·회계부정 사건 ──────────────────────
    {
      id: 'lee_jae_yong_bujeonghappyeong',
      type: 'political',
      format: 'case_tracking',
      year: 2020, month: 9, day: 1,
      title_ko: '이재용 삼성물산·제일모직 부당합병 및 회계부정 사건',
      title_en: 'Lee Jae-yong Samsung Merger and Accounting Fraud Case',
      place_ko: '서울',
      lat: 37.5665, lng: 126.9780,

      // 삼성물산-제일모직 합병(2015) 자체를 다루는 이벤트카드가 지도에
      // 아직 없다 — chun_doo_hwan.js 루트가 지도에 없는 웨이포인트를
      // card_ref: null로 남겨둔 것과 같은 방식으로 처리한다.
      card_ref: null,
      card_map: 'contemporary',

      allegation_status: 'acquitted',

      // ── 사실관계 (평가 배제) ──
      body_ko: '2015년 삼성물산과 제일모직 합병 과정에서 이재용 삼성전자 부회장(현 회장)의 경영권 승계를 위한 것이라는 의혹이 제기됐다. 검찰은 삼성물산 주가를 낮추고 제일모직 가치를 부풀리기 위해 삼성바이오로직스가 자회사 삼성바이오에피스의 회계처리 기준을 고의로 변경해 4조8000억원 규모의 평가이익을 반영하는 등, 미래전략실이 조직적으로 부정거래·시세조종·회계부정에 관여했다고 판단해 2018년 말부터 서울중앙지검이 별도 수사팀을 꾸려 수사에 착수했다. 검찰은 2020년 9월 1일 이재용 등을 자본시장법상 부정거래행위·시세조종, 주식회사의 외부감사에 관한 법률 위반, 업무상 배임 등 혐의로 불구속기소했다. 2024년 2월 5일 서울중앙지방법원 1심은 19개 혐의 전부에 무죄를 선고했다. 검찰이 항소하며 추가 공소사실을 제기했으나, 2025년 2월 3일 서울고등법원 2심은 늘어난 23개 혐의에 대해서도 모두 무죄를 선고했다. 검찰이 상고했지만 2025년 7월 17일 대법원 3부(주심 오석준 대법관)는 검찰이 제시한 핵심 증거(삼성바이오로직스·삼성바이오에피스 서버, 장충기 전 사장 휴대전화 등) 상당수가 위법하게 수집돼 증거능력이 없다고 본 원심 판단을 그대로 인정하며 상고를 기각, 무죄를 확정했다(2025도2805). 이재용은 이 사건과는 별개로 박근혜 국정농단 사건(삼성의 정유라 승마 지원 등 뇌물공여 혐의)에서는 2021년 1월 파기환송심 유죄가 확정된 바 있다(징역 2년 6개월, 집행유예 4년) — 두 사건은 기소 시기와 혐의 내용이 다른 별개 재판이다.',

      stages: [
        { stage:'수사개시', date:'2018-12', institution:'서울중앙지검 특수2부', detail:'삼성물산-제일모직 합병·삼성바이오로직스 회계처리 관련 별도 수사팀 구성', result:null },
        { stage:'불구속기소', date:'2020-09-01', institution:'검찰', detail:'자본시장법상 부정거래행위·시세조종, 외부감사법 위반, 업무상 배임 등', result:null },
        { stage:'1심', date:'2024-02-05', institution:'서울중앙지방법원', detail:'19개 혐의', result:'전부 무죄' },
        { stage:'2심', date:'2025-02-03', institution:'서울고등법원', detail:'검찰 항소로 늘어난 23개 혐의', result:'전부 무죄' },
        { stage:'대법원(확정)', date:'2025-07-17', institution:'대법원 3부', detail:'2025도2805, 검찰 상고기각 — 핵심 증거의 위법수집 판단(원심) 인정', result:'무죄 확정' }
      ],

      // ── 역사적 평가 (body_ko와 분리) ──
      legacy_ko: '검찰 기소 후 4년 10개월 만에 나온 이 무죄 확정은 재벌의 경영권 승계 방식에 대한 사법적 판단이 첨예하게 엇갈린 결과로 평가된다. 참여연대 등 시민단체는 "자본시장 교란 행위에 대한 잘못된 선례"라며 판결을 강하게 비판했고, 검찰의 기소와 공소유지 자체에 대한 비판도 뒤따랐다. 반면 재계와 일부 법조계에서는 위법하게 수집된 증거를 배제한 원칙에 따른 정당한 판결이라는 평가도 있었다. 같은 인물(이재용)이 국정농단 사건(뇌물공여)에서는 유죄가 확정됐지만 이 사건(부당합병·회계부정)에서는 무죄가 확정됐다는 사실은, 하나의 재벌 총수를 둘러싼 여러 의혹이 서로 다른 법적 결론에 이를 수 있음을 보여준다 — 사건 단위로 판결을 정확히 구분해 기록해야 하는 이유이기도 하다.',

      sources: [
        { type:'court', name:'대법원 2025.7.17. 선고 2025도2805 판결', publisher:'대법원', author:'', year:'2025', url:'' },
        { type:'court', name:'서울중앙지방법원 2024.2.5. 선고 판결 (사건번호 확인 필요)', publisher:'서울중앙지방법원', author:'', year:'2024', url:'' },
        { type:'court', name:'서울고등법원 2025.2.3. 선고 판결 (사건번호 확인 필요)', publisher:'서울고등법원', author:'', year:'2025', url:'' },
        { type:'newspaper', name:'"대법, 이재용 \'부당합병·회계부정\' 무죄 확정...檢 상고기각"', publisher:'아주경제', author:'', year:'2025', url:'' },
        { type:'newspaper', name:'"이재용 9년 사법 족쇄 풀렸다… \'부당합병·분식회계\' 무죄 확정"', publisher:'서울신문', author:'', year:'2025', url:'' },
        { type:'paper', name:'[판결비평] 뒤틀린 이재용 무죄 판결이 남긴 사회적 해악들 (시민단체 비평 — court/newspaper 어디에도 정확히 안 맞음, 분류 재검토 필요)', publisher:'참여연대 사법감시센터', author:'', year:'', url:'' }
      ],

      related: {
        people: [
          { title:'이재용', url:'' }, { title:'박근혜', url:'' }, { title:'장충기', url:'' }
        ],
        events: [],
        institutions: ['서울중앙지방법원','서울고등법원','대법원','검찰(서울중앙지검)','삼성물산','제일모직','삼성바이오로직스'],
        archives: [], books: [], videos: [], artworks: [], films: [], music: []
      },

      connections: []
    },

    // ── 4. 이명박 BBK·다스 사건 ──────────────────────
    {
      id: 'lee_myung_bak_bbk_das',
      type: 'political',
      format: 'case_tracking',
      year: 2007, month: null, day: null,
      title_ko: '이명박 BBK·다스 실소유주 사건',
      title_en: 'Lee Myung-bak BBK/DAS Ownership and Bribery Case',
      place_ko: '서울',
      lat: 37.5665, lng: 126.9780,

      card_ref: 'political_2007_02',
      card_map: 'contemporary',

      allegation_status: 'pardoned',

      // ── 사실관계 (평가 배제) ──
      body_ko: '2007년 대선 한나라당 경선 국면에서 이명박 후보가 주가조작 혐의로 기소된 김경준의 BBK 투자자문회사를 실소유했다는 의혹이 제기됐다. 대선을 앞두고 정호영 특별검사팀이 수사했으나 그해 12월 관련 의혹에 대해 무혐의 처분했고, 이명박은 같은 달 대선에서 당선됐다. 잠잠하던 의혹은 2018년 3월 서울중앙지검이 자동차부품업체 다스의 실소유주 문제를 중심으로 재수사에 착수하며 다시 불거졌다. 검찰은 이명박이 1991년부터 2007년까지 다스를 실소유하며 비자금 조성 등 목적으로 약 349억원을 횡령하고, 삼성이 BBK 투자금 회수 관련 다스 소송비 약 67억7000만원(2심에서 94억원으로 확대 인정)을 대납하도록 하는 등 국정원 특수활동비 상납을 포함해 16개 혐의를 적용, 3월 22일 구속한 뒤 4월 9일 구속기소했다. 2018년 10월 5일 서울중앙지법 1심은 16개 혐의 중 7개(횡령 약246억원, 뇌물 약85억원)를 유죄로 인정해 징역 15년·벌금 130억원·추징금 82억원을 선고했다(국정원 특활비는 국고손실로만 인정, 뇌물 혐의는 무죄). 이명박은 2019년 3월 6일 보석으로 석방돼 자택에서 2심을 받았다. 2020년 2월 19일 서울고법 2심은 검찰이 추가 기소한 삼성 소송비 대납분을 뇌물로 인정하며 1심보다 2년 늘어난 징역 17년·벌금 130억원·추징금 57억8000만원을 선고했고, 이에 따라 보석도 취소돼 재구속됐다. 양측 모두 상고했으나 2020년 10월 29일 대법원 2부는 상고를 모두 기각하고 원심을 그대로 확정했다(2020도3972). 확정된 추징금 57억8000만원은 2021년 논현동 사저가 공매로 처분되며 완납됐다. 2022년 6월 윤석열 정부 검찰이 건강 문제를 이유로 형집행을 정지했고, 그해 8·15 광복절 특사 명단에는 여론의 반대로 제외됐다가, 12월 27일 신년 특별사면 대상에 포함돼 12월 28일 0시부로 사면·복권됐다 — 남은 형기 약 14년과 미납 벌금 약 82억원은 집행 없이 그대로 면제됐다.',

      stages: [
        { stage:'의혹 제기', date:'2007', institution:'한나라당 경선·언론', detail:'BBK 주가조작 관련 실소유주 의혹 제기(김경준)', result:null },
        { stage:'1차 특검 수사', date:'2007-12', institution:'정호영 특별검사팀', detail:null, result:'무혐의 처분' },
        { stage:'재수사 개시', date:'2018-03', institution:'서울중앙지검', detail:'다스 실소유주 의혹 재수사 착수', result:null },
        { stage:'구속', date:'2018-03-22', institution:'검찰', detail:null, result:null },
        { stage:'구속기소', date:'2018-04-09', institution:'검찰', detail:'다스 자금 횡령·삼성 뇌물수수 등 16개 혐의', result:null },
        { stage:'1심', date:'2018-10-05', institution:'서울중앙지방법원', detail:'16개 혐의 중 7개 유죄, 국정원 특활비는 국고손실만 인정(뇌물 무죄)', result:'징역15년·벌금130억원·추징금82억원' },
        { stage:'보석 석방', date:'2019-03-06', institution:'법원', detail:'2심 진행 중 보석(구속 349일 만)', result:null },
        { stage:'2심', date:'2020-02-19', institution:'서울고등법원', detail:'검찰 추가기소한 삼성 소송비 대납분을 뇌물로 인정, 보석 취소·재구속', result:'징역17년(1심 대비 2년 가중)·벌금130억원·추징금57억8000만원' },
        { stage:'대법원(확정)', date:'2020-10-29', institution:'대법원 2부', detail:'2020도3972, 검찰·이명박 양측 상고 모두 기각', result:'징역17년·벌금130억원·추징금57억8000만원 확정' },
        { stage:'추징금 완납', date:'2021', institution:'서울중앙지검', detail:'논현동 사저 공매 처분', result:'추징금 57억8000만원 완납' },
        { stage:'사면', date:'2022-12-28', institution:'대통령(윤석열)', detail:'신년 특별사면·복권', result:'잔여형기 약14년·미납벌금 약82억원 면제' }
      ],

      // ── 역사적 평가 (body_ko와 분리) ──
      legacy_ko: '이 사건은 두 갈래로 나눠 평가된다. 하나는 2007년 대선 검증 국면에서 특검이 내린 무혐의 처분과 2018년 재수사·유죄 확정 사이의 간극이다 — 대선 직전 부실 수사였다는 비판과, 당시 확보 가능했던 증거의 한계였다는 반론이 맞선다. 다른 하나는 사면을 둘러싼 논쟁으로, 박근혜 전 대통령과 함께 이뤄진 이 사면은 "정치 보복의 사슬을 끊기 위한 국민 통합"이라는 명분과 "재벌 뇌물·횡령에 대한 면죄부"라는 비판이 맞섰다. 확정판결 후 실제 수감 기간이 약 2년(2020.11~2022.12)에 그쳤다는 점, 그리고 벌금 82억원이 완납 없이 사면으로 소멸됐다는 점은 전두환 사례(추징금 미납 상태로 사망)와는 다른 방식으로 "형사처벌의 완결성"에 의문을 남긴 사례로 꼽힌다.',

      sources: [
        { type:'court', name:'대법원 2020.10.29. 선고 2020도3972 판결', publisher:'대법원', author:'', year:'2020', url:'' },
        { type:'court', name:'서울중앙지방법원 2018.10.5. 선고 판결 (1심, 사건번호 확인 필요)', publisher:'서울중앙지방법원', author:'', year:'2018', url:'' },
        { type:'court', name:'서울고등법원 2020.2.19. 선고 판결 (2심, 사건번호 확인 필요)', publisher:'서울고등법원', author:'', year:'2020', url:'' },
        { type:'newspaper', name:'"[속보] 이명박 \'자유의 몸\'…징역 15년·벌금 82억 면제"', publisher:'서울신문', author:'', year:'2022', url:'' },
        { type:'newspaper', name:'"MB, 4년9개월 만에 석방...박근혜 前대통령과 수감 기간 같아"', publisher:'뉴시스', author:'', year:'2022', url:'' },
        { type:'newspaper', name:'"[판결] 대법원, 이명박 前 대통령 \'징역 17년\' 확정"', publisher:'법률신문', author:'', year:'2020', url:'' },
        { type:'newspaper', name:'"[속보] 이명박 징역 17년 확정…대법원, 다스 횡령·삼성 뇌물죄 인정"', publisher:'아주경제', author:'', year:'2020', url:'' },
        { type:'newspaper', name:'이명박/재판 (사건 일지 정리 — 1차사료 아님, 원 기사로 교체 필요)', publisher:'나무위키', author:'', year:'', url:'' }
      ],

      related: {
        people: [
          { title:'이명박', url:'' }, { title:'김경준', url:'' }, { title:'박근혜', url:'' }
        ],
        events: [
          { title:'BBK 주가조작 의혹 (2007)', url:'../../maps/contemporary/index.html?event=political_2007_02' },
          { title:'제17대 대통령 선거 — 이명박 당선 (2007)', url:'../../maps/contemporary/index.html?event=political_2007_01' }
        ],
        institutions: ['서울중앙지방법원','서울고등법원','대법원','검찰(서울중앙지검)','삼성','다스'],
        archives: [], books: [], videos: [], artworks: [], films: [], music: []
      },

      connections: []
    },

    // ── 5. 김건희 도이치모터스 주가조작 사건 ──────────────────────
    {
      id: 'kim_keon_hee_deutsch_motors',
      type: 'political',
      format: 'case_tracking',
      year: 2009, month: 12, day: null,
      title_ko: '김건희 도이치모터스 주가조작 사건',
      title_en: 'Kim Keon-hee Deutsch Motors Stock Manipulation Case',
      place_ko: '서울',
      lat: 37.566, lng: 126.978,

      card_ref: 'political_2025_05',
      card_map: 'contemporary',

      allegation_status: 'convicted',

      body_ko: '2009년 12월부터 2012년 12월까지 세 차례("0차~2차 작전")에 걸쳐 도이치모터스 권오수 회장 등이 주가조작을 벌였고, 윤석열 대통령의 배우자 김건희와 모친 최은순도 차명계좌를 통해 시세조종에 가담해 각각 약 13억9천만원, 9억원 이상의 수익을 올렸다는 의혹이 제기됐다. 2020년 2월 탐사매체 뉴스타파가 2013년 경찰 내사보고서를 인용해 김건희 연루 의혹을 처음 보도했다. 검찰은 공범 권오수 등 9명을 먼저 기소해 2023년 2월 1심에서 징역형의 집행유예를 이끌어냈으나(검찰·피고인 양측 항소), 정작 김건희 본인에 대해서는 오랫동안 기소 여부를 결정하지 않아 "봐주기 수사" 비판이 이어졌다. 2024년 10월 17일 서울중앙지검은 김건희를 대통령경호처 부속 청사에서 비공개로 조사하고 수사심의위원회도 거치지 않은 채 불기소 처분했다. 국회는 이 수사를 지휘한 이창수 서울중앙지검장·조상원 4차장검사·최재훈 반부패수사2부장검사 3인이 부실 수사·허위사실 유포로 헌법과 법률을 위반했다며 12월 5일 탄핵소추안을 가결했으나, 헌법재판소는 2025년 3월 13일 재판관 전원일치로 이를 기각했다(2024헌나3·4·5). 판이 바뀐 것은 2025년 12·3 내란 사태 이후 출범한 3대 특검 중 하나인 김건희 특검(특별검사 민중기)이었다 — 특검은 도이치모터스 주가조작에 정치자금법 위반(명태균·건진법사 관련 알선수재 등) 혐의를 더해 수사했고, 2025년 8월 12일 김건희에 대한 구속영장을 발부받았다 — 헌정사상 최초로 전직 대통령 배우자가 구속됐고, 남편 윤석열과 부부가 동시에 구속된 것도 최초였다. 특검은 12월 3일 징역 15년을 구형했다. 2026년 1월 28일 서울중앙지법 형사27부(재판장 우인성)는 대부분의 혐의를 무죄로 판단해 징역 1년 8개월에 그치는 판결을 내렸으나, 검찰(특검)이 항소한 2심에서는 여론조사 무상 제공 혐의를 제외한 대부분이 유죄로 인정되며 징역 4년·벌금 5천만원으로 형이 크게 늘었다. 상고심이 진행 중이다.',

      stages: [
        { stage:'시세조종 발생', date:'2009-12', institution:'도이치모터스(권오수 등)', detail:'0차~2차 작전, 2012년 12월까지 세 차례에 걸쳐 진행. 김건희·최은순 차명계좌 가담 의혹', result:null },
        { stage:'최초 의혹 보도', date:'2020-02', institution:'언론(뉴스타파)', detail:'2013년 경찰 내사보고서 인용', result:null },
        { stage:'공범 1심', date:'2023-02-10', institution:'서울중앙지법', detail:'권오수 등 9명', result:'징역형의 집행유예, 양측 항소' },
        { stage:'불기소 처분(김건희)', date:'2024-10-17', institution:'서울중앙지검', detail:'비공개 조사, 수사심의위 미개최', result:'불기소' },
        { stage:'담당 검사 3인 탄핵소추', date:'2024-12-05', institution:'국회', detail:'이창수·조상원·최재훈 부실수사·허위사실 유포 사유', result:'가결' },
        { stage:'헌재 탄핵 기각', date:'2025-03-13', institution:'헌법재판소', detail:'2024헌나3·4·5', result:'재판관 전원일치 기각' },
        { stage:'특검 구속', date:'2025-08-12', institution:'김건희 특검(민중기)', detail:'자본시장법위반·정치자금법위반·알선수재 등', result:'구속(부부 동시 구속 최초)' },
        { stage:'구형', date:'2025-12-03', institution:'김건희 특검', detail:null, result:'징역 15년 구형' },
        { stage:'1심', date:'2026-01-28', institution:'서울중앙지법 형사27부', detail:'재판장 우인성', result:'대부분 무죄, 징역 1년 8개월' },
        { stage:'2심', date:null, institution:'서울고등법원', detail:'검찰(특검) 항소, 여론조사 무상제공 혐의 제외', result:'대부분 유죄, 징역 4년·벌금 5천만원(상고심 진행 중)' }
      ],

      legacy_ko: '이 사건은 2020년 첫 보도부터 김건희 본인에 대한 기소까지 5년 넘게 걸렸다는 점에서, 현직 대통령 배우자를 상대로 한 수사가 얼마나 지연·왜곡될 수 있는지를 보여주는 사례로 꼽힌다. 담당 검사들의 탄핵이 헌재에서 기각된 것을 두고는 "정치적 탄핵 남발"이라는 평가와 "그럼에도 불기소 처분 자체의 문제는 남는다"는 평가가 엇갈렸다. 정권교체 후 특검 수사로 비로소 기소·구속에 이르렀다는 사실은, 수사기관의 독립성이 정치적 상황에 따라 흔들릴 수 있다는 우려를 남겼다. 1심과 2심의 형량이 1년 8개월에서 4년으로 크게 벌어진 것은 같은 증거를 두고도 법원의 판단이 크게 갈릴 수 있음을 보여주며, 상고심 결과가 최종적으로 어떻게 정리될지는 아직 지켜봐야 한다.',

      sources: [
        { type:'newspaper', name:'"검찰, \'도이치모터스 주가조작\' 권오수 집행유예에 항소"', publisher:'나무위키(도이치모터스 주가조작 사건 정리 — 1차사료 아님, 원 기사로 교체 필요)', author:'', year:'', url:'' },
        { type:'newspaper', name:'"검찰, \\"김건희 모녀 도이치로 23억 수익\\""', publisher:'뉴스타파', author:'', year:'2023', url:'' },
        { type:'government', name:'헌법재판소 2024헌나3·4·5 결정(검사 이창수·조상원·최재훈 탄핵심판)', publisher:'헌법재판소', author:'', year:'2025', url:'' },
        { type:'newspaper', name:'"법원, 내일 김건희 도이치모터스 주가조작 선고 생중계"', publisher:'법률신문', author:'', year:'2026', url:'' },
        { type:'newspaper', name:'나무위키 김건희 구속 사건 (사건 일지 정리 — 1차사료 아님, 원 기사로 교체 필요)', publisher:'나무위키', author:'', year:'', url:'' }
      ],

      related: {
        people: [
          { title:'김건희', url:'' }, { title:'윤석열', url:'' }, { title:'권오수', url:'' }, { title:'최은순', url:'' }
        ],
        events: [
          { title:'김건희 구속 — 전직 대통령 배우자 최초 (2025)', url:'../../maps/contemporary/index.html?event=political_2025_05' }
        ],
        institutions: ['서울중앙지방법원','서울고등법원','헌법재판소','서울중앙지검','국회','김건희 특검(민중기)'],
        archives: [], books: [], videos: [], artworks: [], films: [], music: []
      },

      connections: [
        { to:'political_2025_05', relation:'caused' }
      ]
    },

    // ── 6. 김건희 디올백·매관매직 사건 ──────────────────────
    {
      id: 'kim_keon_hee_dior_bag',
      type: 'political',
      format: 'case_tracking',
      year: 2022, month: 9, day: null,
      title_ko: '김건희 디올백·매관매직 사건',
      title_en: 'Kim Keon-hee Dior Bag and Influence-Peddling Case',
      place_ko: '서울',
      lat: 37.566, lng: 126.978,

      card_ref: 'political_2026_02',
      card_map: 'contemporary',

      allegation_status: 'convicted',

      body_ko: '2022년 6월과 9월, 최재영 목사가 김건희에게 각각 179만원 상당 샤넬 화장품 세트와 300만원 상당 디올백을 건넸다. 2023년 11월 인터넷 매체 서울의소리가 이 장면이 담긴 영상을 공개하며 파문이 일었고, 시민단체들이 청탁금지법 위반 등 혐의로 김건희를 고발했다. 서울중앙지검은 초기에 사건을 형사1부에 배당했다가 2024년 5월 이원석 검찰총장 지시로 전담수사팀을 꾸렸으나, 팀 구성 2주 만에 지휘부가 교체되고 이후 대검찰청과 수사팀 사이에 조사 방식·처분 방향을 둘러싼 갈등이 이어졌다. 2024년 7월 김건희를 대통령경호처 보안청사에서 비공개 조사한 사실이 알려지며 "황제 조사" 논란이, 이원석 총장이 관련 사실을 사전 보고받지 못한 사실이 알려지며 "총장 패싱" 논란이 잇따라 불거졌다. 검찰 수사팀과 대검 지휘부 판단이 엇갈리자 이원석 총장은 2024년 9월 직권으로 수사심의위원회를 열었고, 위원회는 8일 김건희에 대해 청탁금지법 위반 등 6개 혐의 모두에 만장일치로 불기소를 권고했다(24일 열린 최재영 관련 수사심의위원회는 8대7로 기소를 권고, 엇갈린 결론이었다). 검찰은 이 권고를 따라 그해 10월 김건희를 "직무 관련성·대가성이 없다"며 불기소 처분했다 — 압수수색 한 번 없이, 통신 내역 확인도 없이 내려진 결론이었다. 판단은 2025년 12·3 내란 사태 이후 출범한 김건희 특검(특별검사 민중기)에서 뒤집혔다. 특검은 디올백 수수 의혹에 반클리프아펠 목걸이·금거북이·고가 그림 등을 받고 인사·이권 청탁을 받은 정황("매관매직")까지 수사를 확대해, 2025년 12월 김건희를 특정범죄가중처벌법상 알선수재 등 혐의로 기소했다. 2026년 6월 26일 서울중앙지법 형사21부(재판장 조순표)는 최재영의 선물이 "대통령의 고유권한이거나 대통령실 내부 운영 업무와 밀접한 관련이 있는" 청탁의 대가였다며 매관매직 혐의를 모두 유죄로 인정해 김건희에게 징역 7년을 선고했다. 한편 경찰은 2026년 6월, 김건희의 디올백 수수 사실을 알고도 감사원 등에 신고하지 않은 혐의(청탁금지법 위반)로 윤석열을 검찰에 송치했다 — 부부 공모에 의한 뇌물수수 혐의는 증거 불충분으로 불송치됐다.',

      stages: [
        { stage:'금품 수수', date:'2022-09', institution:'최재영(목사)', detail:'샤넬 화장품 세트(2022.6)·디올백 300만원 상당(2022.9)', result:null },
        { stage:'폭로', date:'2023-11', institution:'서울의소리', detail:'수수 장면 영상 공개', result:null },
        { stage:'시민단체 고발', date:'2023-11', institution:'시민단체', detail:'청탁금지법 위반 등 혐의', result:null },
        { stage:'전담수사팀 구성', date:'2024-05', institution:'서울중앙지검', detail:'이원석 검찰총장 지시, 2주 만에 지휘부 교체', result:null },
        { stage:'비공개 조사', date:'2024-07', institution:'검찰', detail:'대통령경호처 보안청사, "황제 조사"·"총장 패싱" 논란', result:null },
        { stage:'수사심의위(김건희)', date:'2024-09-08', institution:'대검 수사심의위원회', detail:'6개 혐의 전부', result:'만장일치 불기소 권고' },
        { stage:'수사심의위(최재영)', date:'2024-09-24', institution:'대검 수사심의위원회', detail:null, result:'8대7 기소 권고' },
        { stage:'불기소 처분', date:'2024-10', institution:'서울중앙지검', detail:'"직무 관련성·대가성 없음", 압수수색·통신조회 없이 결론', result:'혐의없음' },
        { stage:'특검 기소', date:'2025-12', institution:'김건희 특검(민중기)', detail:'반클리프아펠 목걸이·금거북이·고가 그림 등 매관매직 정황 추가', result:'특정범죄가중처벌법상 알선수재 등 기소' },
        { stage:'1심', date:'2026-06-26', institution:'서울중앙지법 형사21부', detail:'재판장 조순표', result:'매관매직 혐의 전부 유죄, 징역 7년' },
        { stage:'윤석열 미신고 혐의 송치', date:'2026-06', institution:'경찰', detail:'디올백 수수를 알고도 감사원 등에 미신고(청탁금지법 위반). 부부 공모 뇌물수수는 증거불충분 불송치', result:'검찰 송치' }
      ],

      legacy_ko: '이 사건은 검찰의 불기소 처분과 법원의 유죄 판결이 정반대로 갈린 대표 사례로 남는다 — 같은 사실관계를 두고 검찰은 "직무 관련성이 없다"고 봤지만, 법원은 "대통령의 고유권한과 밀접한 관련이 있는 청탁의 대가"라고 정반대로 판단했다. 압수수색도, 통신 조회도, 대통령에 대한 서면조사조차 없었던 2024년 검찰 수사는 이후 "면죄부"라는 비판을 받았고, 정권교체 후 특검이 재수사에 나서 3년 만에 유죄를 이끌어낸 경위 자체가 수사기관의 독립성과 정치적 중립성에 대한 근본적 물음을 남긴다. 월스트리트저널이 이 사건을 "2200달러 디올백이 여당을 뒤흔들었다"고 보도했을 만큼 국제적으로도 주목받았다. 검찰이 애초 왜 무혐의로 판단했는지, 그 과정에 외압이 있었는지는 별도로 진행 중인 특검의 "수사 무마 의혹" 수사에서 밝혀질 부분으로 남아 있다.',

      sources: [
        { type:'newspaper', name:'"김건희 \'디올백\' 무혐의 뒤집은 법원…특검 \'검찰 수사 무마\' 수사 힘받나"', publisher:'경향신문', author:'', year:'2026', url:'' },
        { type:'newspaper', name:'"김건희 \'디올백\' 고발 3년만에 결국 유죄…종합특검 \'검찰 무마 의혹\' 수사 속도 낼까"', publisher:'경향신문', author:'', year:'2026', url:'' },
        { type:'newspaper', name:'"경찰, \'김건희 디올백 수수\' 윤석열 송치…\\"직무 관련성 알아\\" 청탁금지법 적용"', publisher:'경향신문', author:'', year:'2026', url:'' },
        { type:'newspaper', name:'"檢 수심위, 김건희 여사 디올백 사건 최재영 목사 기소 권고"', publisher:'매일일보', author:'', year:'2024', url:'' },
        { type:'newspaper', name:'김건희 명품백 수수 사건 (사건 일지 정리 — 1차사료 아님, 원 기사로 교체 필요)', publisher:'나무위키', author:'', year:'', url:'' }
      ],

      related: {
        people: [
          { title:'김건희', url:'' }, { title:'윤석열', url:'' }, { title:'최재영', url:'' }
        ],
        events: [
          { title:'김건희 도이치모터스 주가조작 사건', url:'kim_keon_hee_deutsch_motors.html' }
        ],
        institutions: ['서울중앙지방법원','서울중앙지검','대검찰청 수사심의위원회','경찰청','김건희 특검(민중기)'],
        archives: [], books: [], videos: [], artworks: [], films: [], music: []
      },

      connections: [
        { to:'political_2026_02', relation:'caused' }
      ]
    }

  ]
};

if (typeof window !== 'undefined' && window.registerArchiveSeries) {
  window.registerArchiveSeries(ARCHIVE_SERIES_POWER_ACCOUNTABILITY);
}
