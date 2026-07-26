// archive/local_debt_chronicle.js
// 자료실(Archive) > 역사(history) > 시대연구(era_study)
//
// 「지방부채 연대기」— 1995년 민선 지방자치 전면 실시 이후 2026년까지,
// 광역·기초자치단체에서 반복된 지방부채 급증 사례를 정당·성향 병기와 함께
// 시기순으로 정리한 시리즈. power_accountability.js와 형식(case_tracking,
// stages[]/legacy_ko)은 같지만 주제 축이 다르다 — 이 시리즈는 "사법처리"가
// 아니라 "정책결정 → 재정수치 변화 → 후임 전가"라는 반복 패턴을 다룬다.
// stages[]는 재판 단계가 아니라 정책·예산·행정 이벤트 타임라인으로 쓴다.
//
// 원칙:
// - 모든 단체장 최초 언급 시 소속 정당과 통상적 성향 표기를 병기한다.
//   예: "안상수(한나라당·보수)". 정당명은 각 시기의 실제 당명(합당·개명 이력
//   포함)을 쓴다 — 예: 새정치민주연합/더불어민주당, 한나라당/새누리당/
//   국민의힘 등. 성향은 진보/보수로만 단순화해 병기한다.
// - body_ko(사실관계)와 legacy_ko(패턴 평가)를 분리한다. body_ko에는
//   "~로 평가된다" 같은 해석성 문장을 넣지 않는다.
// - 부채 수치는 출처(행정안전부/국회예산정책처/지자체 발표/언론)와 기준
//   시점을 함께 표기하고, 본청 채무(D1)와 공기업 포함 통합부채(D2/D3)를
//   구분해서 쓴다 — 하나로 뭉뚱그리면 정치적 왜곡의 소지가 크다.
// - 레고랜드 사태는 이미 power_accountability.js에 사법추적 카드(전체
//   경과·기소·재판)로 있으므로, 여기서는 재정 관점(부채 수치·D1/D2/D3)
//   축약카드로만 다루고 related.events로 원본 카드를 링크한다.
// - sources[]는 generate_archive_pages.py의 render_sources_section()이
//   읽는 필드명(type/name/author/publisher/year/url)을 그대로 쓴다.
// - related.people/events는 {title,url} 객체 형식을 쓴다.
//
// TODO(왕두목 확인): 다수 출처의 url이 비어 있다(원본 리서치가 언론사명·
// 제목까지는 확보했으나 개별 기사 URL을 전부 못 붙임) — 실제 기사 링크로
// 교체 필요. 행정안전부/국회예산정책처(NABO) 공식 통계 원본 링크도 추가 권장.
// TODO(스키마): fiscal_data 필드(연도별 부채 수치 배열, 그래프용)는 아직
// 렌더 스크립트가 인식하지 않는 신규 필드 — 향후 시각화 확장 시 사용.

const ARCHIVE_SERIES_LOCAL_DEBT_CHRONICLE = {
  id: 'local_debt_chronicle',
  name: '지방부채 연대기',
  full_name: '지방부채 연대기 — 1995년 이후 대한민국 지자체 재정의 그림자',
  category: 'history',
  subcategory: 'era_study',
  period: '1995~2026',
  tagline: '정당을 가리지 않고 반복된 패턴 — 대형 개발사업이 있는 곳에 부채가 있었다',
  color: '#6b4a35',
  hero_image: null,

  posts: [

    // ── 1. 인천광역시 (안상수·송영길·유정복) ──────────────────
    {
      id: 'incheon_debt_songdo_asiad',
      type: 'political',
      format: 'case_tracking',
      year: 2006, month: null, day: null,
      title_ko: '인천광역시 — 송도·아시안게임발 부채, 전국 최고 오명',
      title_en: 'Incheon — Debt from Songdo and the Asian Games, the Nation\'s Highest',
      place_ko: '인천',
      lat: 37.4563, lng: 126.7052,

      card_ref: 'economic_2010_02',
      card_map: 'contemporary',

      allegation_status: null,

      body_ko: '2002년 취임한 안상수(한나라당·보수) 인천시장 임기 동안 송도·청라·영종 경제자유구역 개발, 2014 인천 아시안게임 유치·주경기장 신설, 도시철도 2호선 착공이 동시에 진행됐다. 2008년 세계 금융위기로 송도·청라 등의 택지 분양이 지연되면서 인천도시공사(iH)의 미분양 부담이 커졌고, 안상수 임기말인 2010년 인천시 장부상 부채는 7.4조 원, 인천시 자체는 미상환 숨은부채를 포함하면 실질 9.7조 원 규모라고 밝혔다.\\n\\n2010년 지방선거로 취임한 송영길(민주당·진보) 시장 임기에도 아시안게임 준비와 도시철도 공사가 계속되면서 부채는 계속 늘었다 — 지방공기업 부채를 포함한 총부채는 2010년 9.4조 원에서 2013년(송영길 임기말) 12.6조 원까지 늘었다. 본청 채무만 놓고 보면 2010년 2.7조 원에서 2014년 3.2조 원으로 늘었다. 2015년 7월, 행정자치부는 부산·대구·태백과 함께 인천을 채무비율 39.9%(심각단체 기준 40%에 0.1%포인트 차이)로 \'지방재정위기 주의단체\'로 지정했다.',

      stages: [
        { stage:'경제자유구역·아시안게임 동시 추진', date:'2006', institution:'안상수(한나라당·보수, 인천시장)', detail:'송도·청라·영종 개발 + 2014 아시안게임 유치', result:null },
        { stage:'글로벌 금융위기로 택지분양 지연', date:'2008', institution:'인천도시공사(iH)', detail:'미분양 누적, 차입 부담 확대', result:null },
        { stage:'안상수 임기말 부채 발표', date:'2010', institution:'인천광역시', detail:'장부상 7.4조 원, 숨은부채 포함 실질 9.7조 원(시 자체 발표)', result:null },
        { stage:'시장 교체', date:'2010-07', institution:'인천광역시', detail:'송영길(민주당·진보) 취임', result:null },
        { stage:'통합부채(공기업 포함) 확대', date:'2013', institution:'인천광역시·iH', detail:'2010년 9.4조 원 → 2013년 12.6조 원', result:null },
        { stage:'재정위기 주의단체 지정', date:'2015-07', institution:'행정자치부', detail:'채무비율 39.9%(본청 3조2,581억 원), 심각단체 기준 40%', result:'주의단체 지정' },
      ],

      legacy_ko: '인천 사례는 특정 정당의 문제가 아니라 \'경제자유구역 개발 + 국제행사 유치 + 도시철도\'가 겹칠 때 부채가 구조적으로 급증한다는 것을 보여준다. 한나라당(안상수)과 민주당(송영길) 시기 모두 부채가 늘었고, 이후 유정복(새누리당·보수) 시기의 긴축으로 감소했다가 유정복 재선(민선8기) 들어 iH 부채를 포함한 공기업 부채가 다시 증가하는 등, 본청 채무만 보느냐 공기업까지 포함하느냐(D1 vs D2/D3)가 부채 논쟁의 핵심 쟁점으로 반복됐다.',

      sources: [
        { type:'archive', name:'인천광역시/재정 — 나무위키', publisher:'', author:'', year:'', url:'' },
        { type:'newspaper', name:'인천시 2024년 결산기준 지방채 2조원, 채무비율 11% 재정 \'양호\'', publisher:'인천투데이', author:'', year:'2026', url:'' },
      ],

      related: {
        people: [
          { title:'안상수', url:'' }, { title:'송영길', url:'' }, { title:'유정복', url:'' }
        ],
        events: [],
        institutions: ['인천광역시청','인천도시공사(iH)','행정자치부'],
        archives: [], books: [], videos: [], artworks: [], films: [], music: []
      },
      connections: []
    },

    // ── 2. 용인시 (용인경전철) ──────────────────────────────
    {
      id: 'yongin_light_rail_debt',
      type: 'political',
      format: 'case_tracking',
      year: 2004, month: null, day: null,
      title_ko: '용인시 — 용인경전철, 12년 소송 끝에 확정된 배상 책임',
      title_en: 'Yongin — The Light Rail That Took 12 Years of Litigation to Resolve',
      place_ko: '경기 용인',
      lat: 37.2411, lng: 127.1776,

      card_ref: 'economic_2025_02',
      card_map: 'contemporary',

      allegation_status: 'confirmed',

      body_ko: '2004년 이정문(한나라당·보수) 용인시장 재임 중 착수된 용인경전철 민자사업(BTO 방식)은 하루 이용객 13만9,000명이라는 수요예측으로 추진됐으나, 실제 개통(2013년) 후 이용객은 예상치의 10분의 1에도 못 미치는 1만 명 안팎에 그쳤다. 최소운영수입보장(MRG) 비율은 최초 90%에서 79.9%로 재협약됐지만, 시행사 봄바디어와의 계약분쟁으로 국제중재에서 용인시가 패소해 이자 포함 약 8,500억 원을 물어야 했고, 2013~2022년 MRG 손실보전으로 약 4,293억 원이 추가 지출됐다.\\n\\n주민들은 2013년 10월 이정문 등 관련자를 상대로 약 1조232억 원 규모의 주민소송을 제기했다. 12년에 걸친 소송 끝에 2025년 7월 16일 대법원 2부(주심 엄상필 대법관)가 이정문 전 시장 등과 한국교통연구원에 총 214억6,000만 원의 배상 책임을 확정했다. 이는 2005년 주민소송 제도 도입 이후, 선출직 단체장이 민자사업 실패에 대해 개인 배상 책임을 지게 된 최초 사례로 꼽힌다.',

      stages: [
        { stage:'경전철 민자사업 착수', date:'2004', institution:'이정문(한나라당·보수, 용인시장)', detail:'BTO 방식, 수요예측 1일 13만9,000명', result:null },
        { stage:'MRG 재협약', date:'2004~2009', institution:'용인시·시행사', detail:'최소운영수입보장 90%→79.9%로 조정', result:null },
        { stage:'개통', date:'2013-04', institution:'용인시', detail:'봄바디어와 계약분쟁으로 준공 후 개통 지연', result:'실제 이용객 1만 명 안팎(예측 대비 10분의 1 이하)' },
        { stage:'국제중재 패소', date:'2013', institution:'국제중재기구', detail:null, result:'이자 포함 약 8,500억 원 배상' },
        { stage:'주민소송 제기', date:'2013-10', institution:'용인시 주민', detail:'이정문 등 상대, 약 1조232억 원 청구', result:null },
        { stage:'대법원 확정판결', date:'2025-07-16', institution:'대법원 2부(주심 엄상필)', detail:'이정문 전 시장 등 + 한국교통연구원', result:'총 214억6,000만 원 배상 확정' },
      ],

      legacy_ko: '용인경전철은 수요예측 실패와 MRG 계약이 결합했을 때 지자체 재정에 얼마나 큰 부담을 남기는지 보여주는 대표 사례이자, 정당(한나라당)이나 개인의 부패가 아니라 \'정책 판단의 실패\'에 대해 사법적으로 개인 배상 책임을 물은 드문 선례다. 이후 다른 지자체의 도시철도·경전철 사업에서 수요예측 재검증이 강화되는 계기가 됐다.',

      sources: [
        { type:'newspaper', name:'12년 끈 용인경전철 주민소송… 대법원 "당시 시장 등 214억 배상해야"', publisher:'서울신문', author:'', year:'2025', url:'https://www.seoul.co.kr/news/society/2025/07/16/20250716500248' },
        { type:'newspaper', name:'대법 "용인경전철 당시 시장 등 214억 물어야"', publisher:'서울신문', author:'', year:'2025', url:'https://www.seoul.co.kr/news/society/law/2025/07/17/20250717001004' },
      ],

      related: {
        people: [{ title:'이정문', url:'' }],
        events: [],
        institutions: ['용인시청','한국교통연구원','대법원'],
        archives: [], books: [], videos: [], artworks: [], films: [], music: []
      },
      connections: []
    },

    // ── 3. 성남시 (모라토리엄) ──────────────────────────────
    {
      id: 'seongnam_moratorium',
      type: 'political',
      format: 'case_tracking',
      year: 2010, month: 7, day: 12,
      title_ko: '성남시 — 이재명의 모라토리엄 선언, 진실공방의 시작',
      title_en: 'Seongnam — Lee Jae-myung\'s Moratorium Declaration and the Ongoing Dispute',
      place_ko: '경기 성남',
      lat: 37.4201, lng: 127.1268,

      card_ref: 'economic_2010_03',
      card_map: 'contemporary',

      allegation_status: 'disputed',

      body_ko: '전임 이대엽(한나라당·보수) 시장 재임 중 판교택지개발 특별회계 자금이 일반회계로 전용됐다. 뒤이어 취임한 이재명(민주당 계열·진보) 성남시장은 2010년 7월 12일 기자회견에서 채무지불유예(모라토리엄)를 선언했다 — 한국토지주택공사(LH)·국토해양부에 내야 할 공동공공사업비 2,300억 원과 초과수익부담금 2,900억 원(합계 5,200억 원)에 비해 판교특별회계 가용재원이 681억 원에 불과하다는 것이 근거였다. 판교특별회계 전입금 5,400억 원과 시청사 부지 잔금 등 미편성 법적의무금 1,885억 원을 더해 비공식부채 7,285억 원으로 계산됐다.\\n\\n성남시는 2014년 1월 27일, 3년 6개월간의 초긴축 재정 끝에 모라토리엄 졸업을 선언했다.',

      stages: [
        { stage:'판교특별회계 자금 전용', date:'2004~2010', institution:'이대엽(한나라당·보수, 성남시장)', detail:'판교택지개발 특별회계를 일반회계로 전용', result:null },
        { stage:'시장 교체', date:'2010-07', institution:'성남시', detail:'이재명(민주당 계열·진보) 취임', result:null },
        { stage:'모라토리엄(지급유예) 선언', date:'2010-07-12', institution:'이재명(성남시장)', detail:'LH·국토해양부 대상 5,200억 원 채무 대비 가용재원 681억 원', result:null },
        { stage:'긴축재정 실시', date:'2010~2014', institution:'성남시', detail:'3년 6개월간 초긴축', result:null },
        { stage:'모라토리엄 졸업 선언', date:'2014-01-27', institution:'성남시', detail:null, result:'졸업 선언' },
      ],

      legacy_ko: '이 사건은 확정된 사법적 결론이 아니라 진행 중인 진실공방으로 다뤄야 한다. 성남시(이재명)는 감사원 「지방행정 감사백서」(2013.1)를 근거로 모라토리엄의 정당성을 주장해왔다. 반면 국토해양부 실무자와 감사원 담당자는 "조기정산 공문이나 일시상환 요구가 없었고, 백서는 성남시측 주장을 인용했을 뿐"이라고 밝혔으며, 원희룡(당시 국토해양부 관계) 등 야당 측은 "정치적 퍼포먼스에 가까웠다"고 주장한다. 5,400억 원 조달 과정에서 발행된 지방채의 연간 이자 부담(약 47억 원)이 실제로 발생한 비용이라는 점은 양측 모두 인정하는 사실관계다. 모라토리엄이 실제 법적 파산 상태였는지, 정치적 상징 행위였는지는 이 자료실 카드에서 결론을 내리지 않고 양측 주장을 병기한다.',

      sources: [
        { type:'archive', name:'성남시 모라토리엄 — 나무위키', publisher:'', author:'', year:'', url:'' },
      ],

      related: {
        people: [{ title:'이대엽', url:'' }, { title:'이재명', url:'' }],
        events: [],
        institutions: ['성남시청','한국토지주택공사(LH)','국토해양부','감사원'],
        archives: [], books: [], videos: [], artworks: [], films: [], music: []
      },
      connections: []
    },

    // ── 4. 서울특별시 (이명박~오세훈~박원순~오세훈) ──────────
    {
      id: 'seoul_debt_three_mayors',
      type: 'political',
      format: 'case_tracking',
      year: 2002, month: null, day: null,
      title_ko: '서울특별시 — 세 시장에 걸친 부채 증감 공방, D1과 D2의 싸움',
      title_en: 'Seoul — Debt Swings Across Three Mayors, a Fight Over Accounting Standards',
      place_ko: '서울',
      lat: 37.5665, lng: 126.9780,

      card_ref: 'economic_2010_04',
      card_map: 'contemporary',

      allegation_status: 'disputed',

      body_ko: '이명박(한나라당·보수, 2002~2006)·오세훈(한나라당·보수, 2006~2011) 시기 한강르네상스, 뉴타운 사업, 지하철 9호선 건설, SH공사의 마곡·은평 신도시 선투자가 동시에 진행되며 서울시의회 연구용역(김용석 시의원)에 따르면 통합부채(본청+SH공사+지하철 양공사)는 2002년 8.5조 원에서 2010년 25.5조 원으로 최고치에 이르렀다. 2010년 6월에는 일시차입 돌려막기로 시금고 잔액이 51억 원까지 경색된 적도 있었다.\\n\\n2011년 10월 취임한 박원순(무소속 출마·민주당 계열·진보) 시장은 통합채무를 20.0조 원(취임 시)에서 2014년 12.9조 원까지(7.0조 원 감축) 줄였다고 발표했다. 다만 감축분의 대부분(약 6.8조 원)이 SH공사의 택지·주택 분양 대금 회수에 따른 것이어서, "부동산 시장 회복에 따른 자연적 회수를 치적으로 과대포장했다"는 비판도 있었다.\\n\\n2021년 재선한 오세훈(국민의힘·보수) 시장 3기 들어 본청 채무는 2020년 8.1조 원에서 2022년 11.9조 원(최고치)으로 늘었다가 2024년 11.3조 원으로 다소 줄었다(채무비율 21.53%, 광역시 2위). 서울시는 2021~22년 증가가 서울교통공사 채무 이관(약 8,000억 원)과 코로나19 대응 지방채(약 5,000억 원) 때문이라고 설명하며 2023~24년 총 5,605억 원을 감축했다고 밝힌 반면, 야당과 나라살림연구소 등은 "취임 후 약 3조 원(39%) 증가"라는 수치를 제시하며 공방이 이어지고 있다.',

      stages: [
        { stage:'한강르네상스·뉴타운·9호선 추진', date:'2002~2011', institution:'이명박(한나라당·보수)·오세훈(한나라당·보수)', detail:'SH공사 마곡·은평 선투자 포함', result:null },
        { stage:'통합부채 최고치', date:'2010', institution:'서울특별시·SH공사·지하철공사', detail:'서울시의회 연구용역(김용석 시의원) 추산', result:'통합부채 25.5조 원' },
        { stage:'일시차입 유동성 경색', date:'2010-06', institution:'서울특별시', detail:null, result:'시금고 잔액 51억 원까지 감소' },
        { stage:'시장 교체', date:'2011-10', institution:'서울특별시', detail:'박원순(민주당 계열·진보) 취임', result:null },
        { stage:'통합채무 감축 발표', date:'2014', institution:'서울특별시', detail:'대부분 SH공사 택지·주택 분양 회수분', result:'20.0조 원 → 12.9조 원(7.0조 원 감축)' },
        { stage:'시장 재교체', date:'2021-04', institution:'서울특별시', detail:'오세훈(국민의힘·보수) 재선', result:null },
        { stage:'본청 채무 증가', date:'2020~2022', institution:'서울특별시', detail:'교통공사 채무이관 약 8,000억 원 + 코로나 지방채 약 5,000억 원', result:'8.1조 원 → 11.9조 원(최고치)' },
        { stage:'채무 일부 감축', date:'2023~2024', institution:'서울특별시', detail:null, result:'11.3조 원(채무비율 21.53%), 2년간 5,605억 원 감축' },
      ],

      legacy_ko: '서울시 사례는 \'채무를 어느 범위까지 셀 것인가\'(본청 단독 vs SH공사·지하철공사 등 산하기관 포함)에 따라 같은 시기의 부채가 전혀 다른 숫자로 보일 수 있다는 것을 잘 보여준다. 이명박·오세훈 1기 vs 박원순, 박원순 vs 오세훈 3기 사이의 부채 공방 모두 이 산정기준 차이가 핵심 쟁점이며, 어느 한쪽의 수치만으로 재정 건전성을 판단하기는 어렵다.',

      sources: [
        { type:'newspaper', name:'서울시 채무감축 7조원… SH공사 회수분 논란', publisher:'', author:'', year:'', url:'' },
        { type:'archive', name:'서울시 채무감축 7조원 달성!!', publisher:'서울시', author:'', year:'', url:'https://news.seoul.go.kr/gov/archives/224846' },
      ],

      related: {
        people: [{ title:'이명박', url:'' }, { title:'오세훈', url:'' }, { title:'박원순', url:'' }],
        events: [],
        institutions: ['서울특별시청','서울주택도시공사(SH공사)','서울교통공사'],
        archives: [], books: [], videos: [], artworks: [], films: [], music: []
      },
      connections: []
    },

    // ── 5. 강원도 (레고랜드, 재정 관점 축약카드) ─────────────
    {
      id: 'gangwon_legoland_fiscal_summary',
      type: 'political',
      format: 'case_tracking',
      year: 2011, month: null, day: null,
      title_ko: '강원도 — 평창올림픽과 레고랜드, 재정 관점 요약',
      title_en: 'Gangwon — Pyeongchang Olympics and Legoland, a Fiscal Summary',
      place_ko: '강원 춘천·평창',
      lat: 37.8228, lng: 127.6672,

      card_ref: 'economic_2022_03',
      card_map: 'contemporary',

      allegation_status: 'indicted',

      body_ko: '이 카드는 레고랜드 사태의 재정·부채 측면만 축약해 다룬다. 사건의 전체 경과(도의회 거짓 정보 제공 의혹, 검찰 수사, 재판)는 「권력과 책임」 시리즈의 별도 카드에서 상세히 다룬다.\\n\\n최문순(민주당 계열·진보, 2011~2022) 강원도지사 재임 중 2018 평창 동계올림픽 시설 투자로 강원도 채무는 2015년경 8,451억 원까지 늘었고, 알펜시아 리조트는 올림픽 유치 이전부터의 과잉투자로 대규모 적자를 안았다. 별도로 추진된 레고랜드 코리아 사업을 위해 강원도는 강원중도개발공사(GJC)가 발행한 자산유동화기업어음(ABCP) 2,050억 원에 지급보증을 섰다.\\n\\n2022년 6월 지방선거로 취임한 김진태(국민의힘·보수) 지사는 취임 3개월 만인 9월 28일 이 지급보증 이행을 거부하고 GJC 기업회생 신청을 발표했다. 금액 자체는 크지 않았지만 "지자체 보증도 못 믿는다"는 우려가 전국 채권시장으로 번져 부동산 PF·단기자금시장이 얼어붙었고, 정부와 한국은행은 채권시장안정펀드 등으로 수십조 원 규모의 유동성을 긴급 투입해야 했다. 여론의 비판 속에 강원도는 그해 12월 보증채무 전액을 상환하고 회생신청을 철회했다. 강원도 채무는 2020년 4,915억 원에서 2021년 6,568억 원(코로나 지방채 3,169억 원 포함), 2022년 8,193억 원(지급보증 포함 시 약 1조 원)으로 늘었다.',

      stages: [
        { stage:'평창올림픽 시설투자로 채무 증가', date:'2011~2018', institution:'최문순(민주당 계열·진보, 강원도지사)', detail:'알펜시아 리조트 포함', result:'채무 8,451억 원(2015년경)' },
        { stage:'레고랜드 ABCP 지급보증', date:'2020', institution:'강원도·강원중도개발공사(GJC)', detail:'2,050억 원 규모', result:null },
        { stage:'지사 교체', date:'2022-06', institution:'강원도', detail:'김진태(국민의힘·보수) 취임', result:null },
        { stage:'지급보증 이행거부·회생신청 발표', date:'2022-09-28', institution:'김진태(강원도지사)', detail:'전국 채권시장 신용경색 촉발', result:null },
        { stage:'정부·한은 긴급 유동성 투입', date:'2022-10', institution:'기획재정부·한국은행', detail:'채권시장안정펀드 등', result:null },
        { stage:'보증채무 전액 상환', date:'2022-12', institution:'강원도', detail:null, result:'상환 완료, 회생신청 철회' },
      ],

      legacy_ko: '평창올림픽발 채무는 진보 성향 지사(최문순) 시기에, 그 채무를 시장 전체로 확산시킨 지급보증 거부는 보수 성향 지사(김진태) 시기에 발생했다는 점에서, 이 사례 역시 정당보다 개별 정책 판단이 재정 리스크를 좌우한다는 것을 보여준다. 사법적 책임(배임 등 기소)은 최문순에게, 정책적 파장(전국 신용경색)은 김진태의 결정에서 비롯됐다는 비대칭은 「권력과 책임」 카드에서 더 상세히 다룬다.',

      sources: [
        { type:'newspaper', name:'세금으로 갚은 레고랜드 2,050억 원...최문순 전 강원지사 첫 재판', publisher:'YTN', author:'', year:'2025', url:'' },
      ],

      related: {
        people: [{ title:'최문순', url:'' }, { title:'김진태', url:'' }],
        events: [
          { title:'레고랜드 사태 — 최문순의 추진과 김진태의 보증거부(권력과 책임)', url:'power_accountability_legoland_choi_moon_soon.html' }
        ],
        institutions: ['강원도청','강원중도개발공사(GJC)','기획재정부','한국은행'],
        archives: [], books: [], videos: [], artworks: [], films: [], music: []
      },
      connections: []
    },

    // ── 6. 충청북도 (김영환 민선8기) ─────────────────────────
    {
      id: 'chungbuk_debt_kim_young_hwan',
      type: 'political',
      format: 'case_tracking',
      year: 2022, month: null, day: null,
      title_ko: '충청북도 — 민선8기 4년, 부채 3.8배 증가 논란',
      title_en: 'Chungbuk — A 3.8x Debt Increase Over One Governor\'s Term',
      place_ko: '충북 청주',
      lat: 36.6357, lng: 127.4917,

      card_ref: 'economic_2026_02',
      card_map: 'contemporary',

      allegation_status: 'disputed',

      body_ko: '김영환(국민의힘·보수, 2022~2026) 충북지사 재임 중 도청 청사 공사에 949억5,000만 원이 투입됐다(후생복지관 473억 원, 옛 의회동 리모델링 184억 원, 본관 복합문화공간 104억 원 등 — 충북참여자치시민연대의 2026년 6월 24일 정보공개청구 결과, 직전 민선7기인 2019~2022년 청사 관련 지출 19억8,000만 원의 약 48배). 신청사·복지사업·기반시설 투자가 겹치며 3년간 발행·예정된 지방채는 4,360억 원에 이르렀다.\\n\\n2026년 6월 30일, 차기 지사 당선인 신용한(국민의힘, 소속 정당 동일)측 인수위원회는 기금 등 내부채를 포함한 총부채가 1조3,866억 원(민선7기 말 3,606억 원의 약 3.8배, 1조260억 원 증가)에 이른다고 발표했다.',

      stages: [
        { stage:'도청사 공사 지출', date:'2022~2026', institution:'김영환(국민의힘·보수, 충북지사)', detail:'후생복지관·의회동 리모델링·본관 복합문화공간 등', result:'949억5,000만 원(민선7기 대비 48배)' },
        { stage:'지방채 발행', date:'2022~2026', institution:'충청북도', detail:null, result:'3년간 4,360억 원' },
        { stage:'인수위 부채 발표', date:'2026-06-30', institution:'신용한 지사직 인수위원회', detail:'기금 등 내부채 포함', result:'총부채 1조3,866억 원(민선7기 말 대비 3.8배)' },
      ],

      legacy_ko: '충북 사례는 2026년 현재 진행 중인 논란으로, 인수위 발표 수치는 정치적 국면(선거 직후) 속에서 나온 것이라는 점을 감안해야 한다. 다만 신청사·복지·기반시설 투자로 인한 부채 증가라는 패턴 자체는 인천(안상수)·강원(최문순)·서울(이명박·오세훈) 사례와 동일한 축에 속한다. 사업 대부분이 자산으로 남는 시설투자인 만큼 단순한 부채 증가만으로 재정 실패를 단정하기는 어렵고, 향후 상환 능력(2026~2030년 원리금 상환액 총 6,911억 원, 매년 1,000억 원 이상)이 실제 재정 부담으로 이어질지 지켜봐야 한다.',

      sources: [
        { type:'newspaper', name:'"충북도청은 오늘도 공사 중?"…충북도 재정위기 우려', publisher:'굿모닝충청', author:'', year:'2026', url:'https://www.goodmorningcc.com/news/articleView.html?idxno=447994' },
        { type:'newspaper', name:'충북도 부채 1조3천866억…민선9기 재정 대수술 예고', publisher:'충청매일', author:'', year:'2026', url:'https://www.ccdn.co.kr/news/articleView.html?idxno=1085955' },
      ],

      related: {
        people: [{ title:'김영환', url:'' }, { title:'신용한', url:'' }],
        events: [],
        institutions: ['충청북도청','충북참여자치시민연대'],
        archives: [], books: [], videos: [], artworks: [], films: [], music: []
      },
      connections: []
    },

    // ── 7. 광주광역시 ───────────────────────────────────────
    {
      id: 'gwangju_debt_kang_gi_jung',
      type: 'political',
      format: 'case_tracking',
      year: 2022, month: null, day: null,
      title_ko: '광주광역시 — 전국 특·광역시 중 채무비율 최고',
      title_en: 'Gwangju — The Highest Debt Ratio Among Metropolitan Cities',
      place_ko: '광주',
      lat: 35.1595, lng: 126.8526,

      card_ref: 'economic_2024_03',
      card_map: 'contemporary',

      allegation_status: null,

      body_ko: '강기정(민주당·진보, 2022~) 광주시장 취임 직전인 2021년 말 광주시의 채무비율은 15.2%(전국 5위)였으나, 도시철도 2호선 건설, AI(인공지능)단지 조성, 도로 확장, 호남고속도로 확장 매칭사업 부담이 겹치며 3년 만에 7.9%포인트 급등해 2024년 결산 기준 채무비율 21.93%로 전국 특·광역시 중 최고치를 기록했다. 지방채 규모는 2020년 1조 원을 넘어선 데 이어 2024년 2조700억 원으로 5년 만에 2조 원을 돌파했다. 2020~2024년 이자 비용만 1,195억 원에 이른다.\\n\\n광주시는 장기미집행 도시공원 조성을 위해 발행한 지방채를 지방재정법상 별도 한도로 분리해 계산하면 실질 채무비율이 18.79%로 낮아진다고 반박한다.',

      stages: [
        { stage:'시장 취임 직전 채무비율', date:'2021', institution:'광주광역시', detail:null, result:'15.2%(전국 5위)' },
        { stage:'도시철도2호선·AI단지 등 투자', date:'2022~2024', institution:'강기정(민주당·진보, 광주시장)', detail:'도로 확장·호남고속도로 매칭 포함', result:null },
        { stage:'채무비율 급등', date:'2024', institution:'광주광역시', detail:'지방채 2조700억 원, 이자 5년간 1,195억 원', result:'채무비율 21.93%(특·광역시 최고)' },
      ],

      legacy_ko: '광주 사례는 진보 성향 시장 재임 중 나타난 것이지만, 원인(도시철도·산업단지·도로 인프라)은 인천·서울·부산의 보수 성향 단체장 시기 사례와 본질적으로 같은 패턴이다. 다만 도시공원 조성 지방채를 채무비율 계산에 포함할지를 둘러싼 광주시의 반론은 충북 사례와 마찬가지로 \'무엇을 채무로 잡을 것인가\'의 산정 기준 논쟁을 다시 보여준다.',

      sources: [
        { type:'newspaper', name:'광주광역시 빚 2조원 돌파 채무비율 23% 전국 최고', publisher:'아주경제', author:'', year:'2025', url:'https://www.ajunews.com/view/20250609132929201' },
        { type:'newspaper', name:'광주시, 지방채 2조 돌파…채무비율 전국 특·광역시 중 \'최고\'', publisher:'겟뉴스', author:'', year:'2025', url:'https://www.getnews.co.kr/news/articleView.html?idxno=825036' },
      ],

      related: {
        people: [{ title:'강기정', url:'' }],
        events: [],
        institutions: ['광주광역시청'],
        archives: [], books: [], videos: [], artworks: [], films: [], music: []
      },
      connections: []
    },

    // ── 8. 대구광역시 ───────────────────────────────────────
    {
      id: 'daegu_debt_hong_joon_pyo',
      type: 'political',
      format: 'case_tracking',
      year: 2022, month: null, day: null,
      title_ko: '대구광역시 — "부채제로" 선언 이후의 재증가',
      title_en: 'Daegu — Debt Rises Again After a "Zero Debt" Declaration',
      place_ko: '대구',
      lat: 35.8714, lng: 128.6014,

      card_ref: 'economic_2024_04',
      card_map: 'contemporary',

      allegation_status: null,

      body_ko: '홍준표(국민의힘·보수, 2022~2025) 대구시장은 취임 직후 7개 기금을 폐지하고 채무 제로화를 선언했으나, 이후 세수 부진과 복지지출 증가로 채무가 다시 늘었다. 2024년 말 기준 자치단체 채무는 2조3,384억 원(지방공기업 부채 2,600억 원을 포함하면 2조5,984억 원)으로, 채무비율은 19.1%다. TK신공항 건설, 신청사 이전 등 대형사업이 예정돼 있어 재정주의단체 지정 기준(25%)에 근접할 수 있다는 우려가 제기된다.',

      stages: [
        { stage:'7개 기금 폐지·채무제로 선언', date:'2022', institution:'홍준표(국민의힘·보수, 대구시장)', detail:null, result:'채무제로 선언' },
        { stage:'세수 부진·복지지출 증가로 재증가', date:'2022~2024', institution:'대구광역시', detail:null, result:'채무 2조3,384억 원(공기업 포함 2조5,984억 원), 채무비율 19.1%' },
      ],

      legacy_ko: '대구 사례는 취임 초 강한 긴축 선언(채무제로)이 이후 대형사업(TK신공항·신청사)과 세수 여건 변화 앞에서 지속되기 어렵다는 것을 보여준다. 서울 박원순 시기의 통합채무 감축이 부동산 경기 회복에 크게 의존했던 것처럼, 정치적 선언과 실제 재정 여건 사이의 간극이 반복되는 패턴이다.',

      sources: [
        { type:'newspaper', name:'광주광역시 채무비율 24% 육박…시의회 시정질의 질타', publisher:'ikbc', author:'', year:'2025', url:'https://news.ikbc.co.kr/article/view/kbc202510220062' },
      ],

      related: {
        people: [{ title:'홍준표', url:'' }],
        events: [],
        institutions: ['대구광역시청'],
        archives: [], books: [], videos: [], artworks: [], films: [], music: []
      },
      connections: []
    },

    // ── 9. 부산광역시 ───────────────────────────────────────
    {
      id: 'busan_debt_urban_infra',
      type: 'political',
      format: 'case_tracking',
      year: 2015, month: null, day: null,
      title_ko: '부산광역시 — 도시철도·북항 재개발발 부채',
      title_en: 'Busan — Debt from Subway Lines and Port Redevelopment',
      place_ko: '부산',
      lat: 35.1796, lng: 129.0756,

      card_ref: 'economic_2015_02',
      card_map: 'contemporary',

      allegation_status: null,

      body_ko: '부산 도시철도 1호선은 1994년 부산교통공단으로 이관됐다가 2006년 부산시로 재이관되는 등 자체예산으로 감당하기 어려운 대형 인프라 사업이었다. 이후 산성터널, 에코델타시티, 북항 재개발 등이 이어지며 2015년 채무비율 28.1%로 인천·태백·대구와 함께 재정위기 주의단체로 지정된 바 있다. 2022년 말 총 채무는 3조1,586억 원(전년 대비 689억 원 감소)이었고, 2024년경 채무비율은 약 18.8%로 낮아졌다.',

      stages: [
        { stage:'도시철도 1호선 재정 부담', date:'1994~2006', institution:'부산광역시·부산교통공단', detail:'공단 이관 후 재이관', result:null },
        { stage:'재정위기 주의단체 지정', date:'2015', institution:'행정자치부', detail:'인천·태백·대구와 함께', result:'채무비율 28.1%' },
        { stage:'채무 감소 추세', date:'2022~2024', institution:'부산광역시', detail:null, result:'총채무 3조1,586억 원, 채무비율 약 18.8%' },
      ],

      legacy_ko: '부산 사례는 특정 단체장 한 명의 정책보다 도시철도라는 장기 인프라 사업 자체가 수십 년에 걸쳐 재정 부담을 남긴다는 것을 보여주는 사례로, 이후 점진적 감축이 이뤄지고 있다.',

      sources: [
        { type:'archive', name:'부산광역시 재정 현황', publisher:'', author:'', year:'', url:'' },
      ],

      related: {
        people: [],
        events: [],
        institutions: ['부산광역시청','부산교통공사'],
        archives: [], books: [], videos: [], artworks: [], films: [], music: []
      },
      connections: []
    },

    // ── 10. 태백시 (오투리조트) ────────────────────────────
    {
      id: 'taebaek_o2resort_debt',
      type: 'political',
      format: 'case_tracking',
      year: 2004, month: null, day: null,
      title_ko: '태백시 — 오투리조트, 지방공기업 최초 법정관리',
      title_en: 'Taebaek — O2 Resort, the First Court Receivership for a Local Public Enterprise',
      place_ko: '강원 태백',
      lat: 37.1641, lng: 128.9856,

      card_ref: 'economic_2014_02',
      card_map: 'contemporary',

      allegation_status: null,

      body_ko: '석탄산업 쇠퇴에 따른 대체산업으로, 태백관광개발공사가 총사업비 4,424억 원 규모의 오투리조트 건설을 추진했다. 그러나 회원권 미분양과 경영난이 겹치며 2014년 8월 지방공기업으로는 최초로 법정관리(회생절차)에 들어갔다(서울중앙지법). 태백시는 공적자금 약 1,000억 원과 보증채무 약 1,700~2,000억 원(누적 손실 2,700억 원)을 부담해야 했다. 2016년 2월, 시공비의 약 5분의 1 수준인 800억 원에 부영그룹에 매각됐다.',

      stages: [
        { stage:'오투리조트 건설 착수', date:'2004', institution:'태백관광개발공사', detail:'석탄산업 쇠퇴 대체사업, 총사업비 4,424억 원', result:null },
        { stage:'회원권 미분양·경영난', date:'2008~2014', institution:'태백관광개발공사', detail:null, result:null },
        { stage:'지방공기업 최초 법정관리', date:'2014-08', institution:'서울중앙지방법원', detail:'회생절차 개시', result:null },
        { stage:'태백시 부담', date:'2014', institution:'태백시', detail:null, result:'공적자금 약 1,000억 원 + 보증채무 약 1,700~2,000억 원' },
        { stage:'부영그룹에 매각', date:'2016-02', institution:'태백관광개발공사', detail:'시공비의 약 5분의 1 수준', result:'800억 원에 매각' },
      ],

      legacy_ko: '태백 오투리조트는 지자체가 관광개발공사 형태로 직접 리조트 사업을 벌였을 때의 리스크를 극명하게 보여주는 사례로, 2015년 인천·부산·대구와 함께 재정위기 주의단체가 지정되던 시기의 배경이 된 대표 실패 사례 중 하나다.',

      sources: [
        { type:'archive', name:'오투리조트 — 나무위키', publisher:'', author:'', year:'', url:'' },
      ],

      related: {
        people: [],
        events: [],
        institutions: ['태백시청','태백관광개발공사','서울중앙지방법원'],
        archives: [], books: [], videos: [], artworks: [], films: [], music: []
      },
      connections: []
    }

  ]
};

if (typeof window !== 'undefined' && window.registerArchiveSeries) {
  window.registerArchiveSeries(ARCHIVE_SERIES_LOCAL_DEBT_CHRONICLE);
}
