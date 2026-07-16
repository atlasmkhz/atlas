// content/archive/erased_names.js
// 자료실(Archive) > 인물열전(biographies) > 한국사 인물(korea_figures)
//
// 2026-07-16: 기존 역사(history) > 인물연구(people_study) 서브카테고리에서
// 독립된 최상위 카테고리 "인물열전"으로 이전했다(두목님 결정 — 사기의
// 열전처럼 인물을 1급 탐색 축으로 분리). 시리즈 id/slug(erased_names)는
// 그대로 유지해 기존 URL(archive/erased-names/...)이 안 깨진다 — 바뀐 건
// category/subcategory 소속뿐이다. 앞으로 추가되는 인물(정약용, 김홍도·
// 신윤복 등)은 이 시리즈에 새 포스트로 넣거나, 규모가 커지면 이 카테고리
// 아래 새 시리즈로 분리한다. 세계사 인물(양자역학 백주년의 과학자들 등)은
// 아직 이 카테고리로 옮기지 않는다 — "세계사 열전"으로 별도 확장은 추후
// 과제(두목님 결정, 2026-07-16).
//
// 스키마는 historical_revisionism.js(narrative 형식)를 따른다.
//
// 시리즈 원칙:
// - 이 시리즈의 주제는 인물의 위인전이 아니라 "지워짐" 자체다 — 누가,
//   왜, 어떤 방식으로 이 이름들을 기억에서 밀어냈는가.
// - 인물 미화 금지. 논쟁적 대목(김원봉의 월북과 북한 정권 참여,
//   여운형에 대한 좌우 양쪽의 비판, 신채호의 위폐 사건)은 회피하지
//   않고 사실대로 쓴다 — 입체적 인물이 이 프로젝트의 원칙이다.
// - body_ko는 사실관계 중심 서술, 평가·논쟁은 말미에 "~라는 논쟁이
//   이어지고 있다" 형태로 현재진행형임을 명시한다.
// - sources[] 필드명은 generate_archive_pages.py의
//   render_sources_section()이 읽는 type/name/author/publisher/year/url.
// - related.events의 url은 archive/{slug}/ 페이지 기준 상대경로
//   ('../../map.html?event=ID' 또는 '../../maps/{era}/index.html?event=ID').
// - type:'person'은 이 시리즈에서 새로 쓰는 값 — nav.js들의
//   ARCHIVE_TYPE_LABEL에 'person: 인물' 라벨을 함께 추가했다(8개 사본 동일).

const ARCHIVE_SERIES_ERASED_NAMES = {
  id: 'erased_names',
  name: '지워진 이름들',
  full_name: '지워진 이름들 — 기억의 정치가 지운 독립운동가들',
  category: 'biographies',
  subcategory: 'korea_figures',
  period: '1880~현재',
  tagline: '싸운 기록은 남았는데 이름은 지워졌다 — 남과 북, 좌와 우가 각자의 이유로 잊어버린 사람들',
  color: '#3d4a5c',
  hero_image: null,

  posts: [

    // ── 1. 신채호 — 서류상 존재하지 않았던 역사가 ──────────────
    {
      id: 'shin_chae_ho',
      type: 'person',
      format: 'narrative',
      year: 1936, month: 2, day: 21,
      title_ko: '신채호 — 나라를 지킨 역사가는 서류상 없는 사람이었다',
      place_ko: '뤼순 감옥',
      lat: 38.8511, lng: 121.2622,
      card_ref: 'person_1928_01',
      card_map: 'root',
      body_ko: '단재 신채호는 황성신문과 대한매일신보의 주필로 붓을 들었고, 1908년 독사신론에서 왕조 중심의 역사를 민족 중심의 역사로 다시 쓰자고 선언해 근대 민족주의 사학의 문을 열었다. 1910년 망명한 뒤에는 임시정부에 참여했으나 이승만의 위임통치 청원을 정면 비판하며 결별했고, 1923년 의열단의 요청으로 쓴 조선혁명선언에서 "민중 직접 혁명"을 외치며 타협 노선과 실력양성론을 통렬히 배격했다. 만년에는 무정부주의 운동에 투신해 1928년 동방연맹의 자금을 마련하려 외국환 위조 사건에 연루된 채 타이완 지룽에서 체포됐고 — 독립운동 자금 조달이었으나 죄명은 사기·위조였다 — 10년형을 받고 뤼순감옥에서 복역하다 1936년 2월 뇌일혈로 옥사했다. 안중근이 순국한 바로 그 감옥이었다. 그런데 그의 지워짐은 죽음 이전에 이미 서류에서 시작돼 있었다. 신채호는 일제의 호적 제도(조선민사령)에 이름 올리기를 끝내 거부했다 — 일본 신민으로 등록되느니 무국적자로 살겠다는 선택이었고, 그 대가로 그는 법적으로 존재하지 않는 사람이 됐다. 유해가 고향 청주로 돌아왔을 때도 호적이 없어 매장 허가가 나오지 않아 암장하듯 묻어야 했다. 1962년 건국훈장 대통령장이 추서됐지만 정작 대한민국의 호적은 여전히 없었고, 2009년 독립유공자 가족관계등록 창설 특례가 시행되고서야 — 순국 73년 만에 — 그의 이름이 대한민국의 공부(公簿)에 올랐다. 역사를 지키려던 역사가가 두 나라의 서류 어디에도 없는 사람으로 한 세기 가까이 남아 있었던 것이다.',
      claim_ko: null,
      rebuttal_ko: null,
      sources: [
        { type:'government', name:'독립유공자 공적조서 — 신채호', publisher:'국가보훈부 공훈전자사료관', author:'', year:'', url:'' },
        { type:'book', name:'조선상고사', publisher:'', author:'신채호', year:'1931', url:'' },
        { type:'newspaper', name:'"신채호 선생, 사후 73년 만에 국적 회복"', publisher:'연합뉴스', author:'', year:'2009', url:'' },
        { type:'archive', name:'한국민족문화대백과사전 — 신채호', publisher:'한국학중앙연구원', author:'', year:'', url:'' },
      ],
      related: {
        events: [
          { title:'조선혁명선언 발표 (1923)', url:'../../map.html?event=political_1923_01' },
          { title:'신채호 — 무정부주의 동방연맹 (1927)', url:'../../map.html?event=person_1927_01' },
          { title:'신채호 — 동방연맹 활동과 체포 직전 (1928)', url:'../../map.html?event=person_1928_01' },
          { title:'안중근 순국 — 뤼순 감옥의 마지막 (1910)', url:'../../map.html?event=person_1910_04' },
        ],
        people: [
          { title:'신채호', url:'' }, { title:'이승만', url:'' }, { title:'김원봉', url:'' }
        ],
        archives: [], books: [], videos: [{ title:'단재 신채호 | 일제강점기 독립운동과 『조선상고사』 AI 복원', url:'https://www.youtube.com/watch?v=Aecqgxg_gro' }], artworks: [], films: [], music: [],
      },
    },

    // ── 2. 여운형 — 중간지대와 함께 사라진 이름 ────────────────
    {
      id: 'yeo_un_hyung',
      type: 'person',
      format: 'narrative',
      year: 1947, month: 7, day: 19,
      title_ko: '여운형 — 중간지대가 사라질 때 함께 지워진 이름',
      place_ko: '서울 혜화동',
      lat: 37.5862, lng: 127.0016,
      card_ref: 'person_1947_01',
      card_map: 'modern2',
      body_ko: '몽양 여운형은 1918년 상하이에서 신한청년당을 만들어 파리강화회의에 김규식을 파견했다 — 3·1운동의 도화선 가운데 하나가 된 외교전이었다. 임시정부에 참여했고, 국내로 압송돼 복역한 뒤에는 조선중앙일보 사장으로서 1936년 손기정 선수의 가슴에서 일장기를 지운 사진을 실었다가 신문 문을 닫았다. 일제 패망을 내다보고 1944년 비밀결사 건국동맹을 조직했던 그는 1945년 8월 15일 아침 조선총독부 정무총감과 마주 앉아 치안권 이양을 교섭했고, 그날로 건국준비위원회를 세워 해방 정국의 첫 질서를 만들었다. 그러나 미군정은 건준도, 뒤이은 조선인민공화국도 인정하지 않았다. 좌우 대립이 격화되자 그는 1946년 김규식과 좌우합작위원회를 꾸려 분단을 막을 마지막 다리를 놓으려 했다 — 그 대가는 양쪽 모두의 증오였다. 우익에게는 공산주의자로, 좌익에게는 기회주의자로 몰리며 열 차례가 넘는 테러를 당했고, 1947년 7월 19일 혜화동 로터리에서 열아홉 살 청년의 총에 숨졌다. 배후는 끝내 밝혀지지 않았다. 장례에는 수십만 인파가 몰렸지만, 분단이 굳어진 뒤 그의 이름은 남에서도 북에서도 온전히 기념되지 못했다 — 중간지대에 섰던 사람은 어느 쪽의 역사에도 주인공으로 초대받지 못한 것이다. 대한민국이 그에게 건국훈장 대통령장을 추서한 것은 사후 58년 만인 2005년이었고, 등급이 낮다는 유족과 학계의 문제 제기 끝에 2008년 최고 등급인 대한민국장이 다시 추서됐다. 훈장의 등급을 두 번 매겨야 했던 그 머뭇거림 자체가, 이 이름을 어디에 둘지 한국 사회가 오래 정하지 못했다는 기록이다.',
      claim_ko: null,
      rebuttal_ko: null,
      sources: [
        { type:'government', name:'독립유공자 공적조서 — 여운형', publisher:'국가보훈부 공훈전자사료관', author:'', year:'', url:'' },
        { type:'book', name:'몽양 여운형 평전', publisher:'한울', author:'이기형', year:'2004', url:'' },
        { type:'newspaper', name:'"여운형 선생에 건국훈장 대한민국장 추서"', publisher:'연합뉴스', author:'', year:'2008', url:'' },
        { type:'archive', name:'한국민족문화대백과사전 — 여운형', publisher:'한국학중앙연구원', author:'', year:'', url:'' },
      ],
      related: {
        events: [
          { title:'건국준비위원회 결성 (1945)', url:'../../map.html?event=political_1945_01' },
          { title:'건국준비위원회와 조선인민공화국 (1945)', url:'../../maps/modern2/index.html?event=organization_1945_01' },
          { title:'좌우합작운동 (1946)', url:'../../maps/modern2/index.html?event=movement_1946_01' },
          { title:'여운형 피살 (1947)', url:'../../maps/modern2/index.html?event=person_1947_01' },
        ],
        people: [
          { title:'여운형', url:'' }, { title:'김규식', url:'' }, { title:'손기정', url:'' }
        ],
        archives: [], books: [], videos: [], artworks: [], films: [], music: [],
      },
    },

    // ── 3. 김원봉 — 두 번 지워진 이름 ──────────────────────────
    {
      id: 'kim_won_bong',
      type: 'person',
      format: 'narrative',
      year: 1948, month: 4, day: null,
      title_ko: '김원봉 — 남과 북이 한 번씩, 두 번 지워진 이름',
      place_ko: '밀양 → 서울 → 평양',
      lat: 35.5038, lng: 128.7467,
      card_ref: 'person_1920_02',
      card_map: 'root',
      body_ko: '약산 김원봉은 1919년 겨울 지린에서 열두 명의 동지와 의열단을 결성하고 의백(단장)이 됐다 — 일제가 그의 목에 건 현상금은 김구보다 높았다는 이야기가 전해질 만큼, 1920년대 조선총독부가 가장 두려워한 이름이었다. 폭탄과 총으로 싸우던 그는 개별 의거의 한계를 깨닫고 황푸군관학교에서 군사교육을 받은 뒤 조직 투쟁으로 노선을 바꿨고, 1938년 중국 우한에서 조선의용대를 창설해 중국 관내 최초의 조선인 무장부대를 이끌었다. 1942년에는 조선의용대를 광복군에 편입시키며 임시정부에 합류해 군무부장까지 지냈다. 그러나 해방된 조국은 그를 환영하지 않았다. 1947년 그는 일제 때 독립운동가를 고문하던 친일 경찰 노덕술에게 체포돼 수모를 겪었고 — 사흘을 통곡했다는 증언이 남아 있다 — 좌익 인사 검거 선풍과 여운형 암살로 신변 위협이 커지자 1948년 4월 남북연석회의 참석차 평양으로 간 뒤 돌아오지 않았다. 북에서 그는 국가검열상과 노동상 등 요직을 지냈지만, 그 선택이 두 번째 지워짐의 시작이었다. 1958년 연안파 숙청의 회오리 속에서 그는 모든 직위를 잃고 숙청됐다 — 정확한 사망 시점과 경위조차 확인되지 않는다. 북한의 공식 역사는 항일 무장투쟁의 서사를 김일성 중심으로 다시 쓰며 의열단과 조선의용대의 이름을 지웠고, 남한은 월북과 북한 정권 참여를 이유로 그를 독립유공자 서훈에서 배제해왔다. 의열단 결성 100년이 지난 지금도 서훈 논쟁은 현재진행형이다 — 항일 투쟁 경력과 북한 정권 수립 기여를 어떻게 함께 놓고 판단할 것인가라는, 분단이 남긴 가장 곤란한 질문 하나가 이 이름 위에 그대로 얹혀 있다.',
      claim_ko: null,
      rebuttal_ko: null,
      sources: [
        { type:'book', name:'약산 김원봉 평전', publisher:'시대의창', author:'김삼웅', year:'2008', url:'' },
        { type:'book', name:'김원봉 연구', publisher:'창작과비평사', author:'염인호', year:'1993', url:'' },
        { type:'newspaper', name:'"김원봉 서훈 논란, 쟁점은 무엇인가"', publisher:'한겨레', author:'', year:'2019', url:'' },
        { type:'archive', name:'한국민족문화대백과사전 — 김원봉', publisher:'한국학중앙연구원', author:'', year:'', url:'' },
      ],
      related: {
        events: [
          { title:'김원봉 — 의열단 결성·지휘 (1920)', url:'../../map.html?event=person_1920_02' },
          { title:'의열단의 노선 전환 (1927)', url:'../../map.html?event=political_1927_03' },
          { title:'조선의용대 창설 (1938)', url:'../../map.html?event=battle_1938_01' },
          { title:'조선의용대의 광복군 편입과 김원봉의 임정 합류 (1942)', url:'../../map.html?event=political_1942_01' },
        ],
        people: [
          { title:'김원봉', url:'' }, { title:'김구', url:'' }, { title:'노덕술', url:'' }
        ],
        archives: [], books: [], videos: [], artworks: [], films: [], music: [],
      },
    },

    // ── 4. 최재형 — 연해주 항일운동의 대부, 유해조차 못 찾은 죽음 ──
    {
      id: 'choi_jae_hyung',
      type: 'person',
      format: 'narrative',
      year: 1920, month: 4, day: null,
      title_ko: '최재형 — 연해주 항일운동의 대부, 유해조차 찾지 못했다',
      place_ko: '러시아 우수리스크',
      lat: 43.8000, lng: 131.9500,
      card_ref: 'person_1914_04',
      card_map: 'root',
      body_ko: '최재형은 노비인 아버지와 기생인 어머니 사이에서 함경북도 경원의 극빈한 소작농 집안에 태어났다(출생연도는 자료마다 1858년과 1860년으로 엇갈린다). 아홉 살 되던 해 가족과 함께 기근을 피해 연해주로 이주했고, 열한 살에는 형수의 학대를 피해 집을 나와 포시예트 부두를 전전하다 러시아 선원들에게 발탁돼 견습수부로 세계를 돌며 러시아어와 실무를 익혔다. 이후 무역업과 군납업으로 거부를 쌓은 그는 동포들을 직원으로 고용해 절대빈곤에 시달리던 한인들이 스스로 돈을 벌 길을 열어주었고, 한인 마을에 정교회 학교 32개를 세워 교포 유학생을 매년 페테르부르크로 유학 보냈다 — 사람들은 그를 "페치카(따뜻한 난로)"라 불렀다. 연추 한인사회에서 도헌(군수급 공직)에까지 선출될 만큼 러시아 사회 안에서 입지를 다진 그는, 그 부와 지위를 항일운동에 쏟아부었다. 1908년 러시아 지역 항일의병 세력을 통합한 동의회를 조직해 총장을 맡았고, 안중근의 국내진공작전과 하얼빈 의거를 자금·무기·정보로 뒷받침했다 — 안중근이 거사 전 사격 연습을 한 곳이 최재형의 집이었다는 막내딸의 회고가 남아 있다. 1911년에는 권업회를 세워 독립운동을 이어갔으나 일본의 간첩 모함으로 체포됐다가 무혐의로 풀려났고, 이후 러시아 당국이 그와의 거래를 끊으면서 경제적으로도 궁핍해졌다. 1919년 대한민국 임시정부 초대 재무총장으로 선임됐지만 상하이로 부임하지 않고 연해주에 남아 현지 독립운동을 이끌었다. 1920년 4월, 일본군이 연해주 한인사회를 짓밟은 4월참변 당시 우수리스크에서 체포된 그는 재판 없이 총살당했고, 일본 헌병대가 시신을 수습하지 않아 유해는 끝내 찾지 못했다. 1962년 건국훈장 독립장이 추서됐지만 소련 체제 아래 묻혀 있던 그의 활동은 1990년대 후반에야 본격적으로 조명되기 시작했다. 그가 살던 우수리스크의 벽돌집은 2014년 한국 정부가 매입해 2019년 최재형기념관으로 문을 열었다.',
      claim_ko: null,
      rebuttal_ko: null,
      sources: [
        { type:'archive', name:'한국민족문화대백과사전 — 최재형', publisher:'한국학중앙연구원', author:'', year:'', url:'' },
        { type:'archive', name:'위키백과 — 최재형(독립운동가)', publisher:'', author:'', year:'', url:'' },
        { type:'book', name:'최재형 — 시베리아 한인민족운동의 대부', publisher:'역사공간', author:'박환', year:'2008', url:'' },
        { type:'newspaper', name:'연해주 한국독립운동의 대부 최재형 순국 100년을 소환하다', publisher:'국가보훈부', author:'', year:'2021', url:'' },
      ],
      related: {
        events: [
          { title:'최재형 — 연해주 한인사회의 페치카 (1914)', url:'../../map.html?event=person_1914_04' },
          { title:'동의단지회 — 안중근의 단지동맹 (1909)', url:'../../map.html?event=organization_1909_01' },
          { title:'연해주 4월참변 — 신한촌 사건 (1920)', url:'../../map.html?event=massacre_1920_02' },
        ],
        people: [
          { title:'최재형', url:'' }, { title:'안중근', url:'' }
        ],
        archives: [], books: [], videos: [], artworks: [], films: [], music: [],
      },
    },

  ],
};

window.registerArchiveSeries(ARCHIVE_SERIES_ERASED_NAMES);
