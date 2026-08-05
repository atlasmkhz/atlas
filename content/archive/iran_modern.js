// content/archive/iran_modern.js
// 자료실(Archive) > 세계사(world_history) > 격변사(upheaval_history)
//   — "겨루고 뒤엎은 것". 자원과 주권을 둘러싼 100년의 충돌사다.
//
// 시리즈: 이란 현대사 — 호르무즈를 둘러싼 100년
//
// 기획 의도(2026-08-02): 2025~2026년 호르무즈 해협 봉쇄로 한국의
// 원유·가스 수급이 직접 흔들렸다. 뉴스는 매일 나오지만 "왜 하필
// 이란인가, 왜 하필 그 해협인가"를 시간 축으로 설명하는 자료는
// 드물다. 이 시리즈는 1901년 한 장의 채굴권 계약에서 시작해 오늘의
// 봉쇄까지를 하나의 선으로 잇는다.
//
// 시리즈 원칙:
// - ATLAS 편집 기준을 따른다: 확인된 사실만 쓰고, 평가가 갈리는
//   지점은 양쪽 해석을 함께 적는다. 단정하지 않는다.
// - 진행 중인 사건(2025~2026)은 확정된 사실만 쓰고 전망은 쓰지 않는다.
//   상황이 바뀌면 해당 글을 갱신한다.
// - 한국사와 잇는다. 이란 현대사는 한국 근현대사와 구조가 겹치는
//   대목이 많다 — 외세의 자원 이권, 쿠데타로 무너진 민주정부, 그
//   후유증. 또한 오일쇼크·중동건설붐처럼 실제로 한국사에 직접
//   작용한 접점이 있다. 매 글의 related에 그 다리를 놓는다.
// - 종교(시아파 이슬람)를 이국적 소재로 다루지 않는다. 정치적
//   맥락 안에서 필요한 만큼만 설명한다.
// - 세계사 루트(archive/world-routes/iran-hormuz.html)와 짝을 이룬다.
//   글은 깊이, 루트는 흐름.
//
// sources[] 필드명은 generate_archive_pages.py의
// render_sources_section()이 읽는 type/name/author/publisher/year/url.

const ARCHIVE_SERIES_IRAN_MODERN = {
  id: 'iran_modern',
  name: '이란 현대사',
  full_name: '이란 현대사 — 호르무즈를 둘러싼 100년',
  category: 'world_history',
  subcategory: 'upheaval_history',
  period: '1901~현재',
  tagline: '한 장의 석유 채굴권에서 시작해 쿠데타와 혁명을 지나 오늘의 해협 봉쇄까지 — 자원과 주권은 누구의 것인가',
  color: '#5c3a2f',
  hero_image: null,
  // NEW 배지(7일 규칙). 시리즈 생성일 — 처음부터 빠뜨려서 배지가 한 번도
  // 뜨지 않았던 것을 2026-08-05에 발견해 소급 기입.
  updated: '2026-08-02',

  posts: [

    // ── 1. 다시 채굴권과 최초의 유전 (1901~1908) ────────────────
    {
      id: 'darcy_1901',
      type: 'event',
      format: 'narrative',
      year: 1901, month: 5, day: 28,
      title_ko: '한 장의 계약서 — 다시 채굴권과 중동 최초의 유전',
      place_ko: '이란 테헤란 · 마스제드솔레이만',
      lat: 35.6892, lng: 51.3890,
      card_ref: null, card_map: null,
      world_route: 'iran-hormuz',
      body_ko: '1901년, 카자르 왕조의 국왕 모자파르 앗딘 샤가 영국인 사업가 윌리엄 녹스 다시에게 이란 전역의 석유 탐사·채굴 독점권을 넘겼다. 기간은 60년, 대상은 북부 다섯 개 주를 제외한 사실상 전 국토였다. 재정난에 시달리던 왕실이 받은 대가는 선불금과 지분 일부, 그리고 순이익의 16%였다. 당시 이란에서 석유가 나올지조차 확실하지 않았으므로 이 계약은 도박에 가까웠지만, 도박의 판돈은 이란의 땅이었고 도박꾼은 외국인이었다.\n\n다시는 7년을 허탕 쳤다. 자금이 바닥나 채굴권을 영국 정부 지분이 들어간 버마 석유회사에 넘긴 뒤인 1908년, 남서부 마스제드솔레이만에서 마침내 상업 유전이 터졌다. 중동 최초였다. 이듬해 앵글로-페르시안 석유회사(APOC)가 설립되었고, 1914년에는 해군 연료를 석탄에서 석유로 바꾸려던 영국 정부가 과반 지분을 인수했다. 이란의 지하자원이 대영제국 해군의 전략 자산이 된 것이다.\n\n문제는 배분이었다. 계약상 이란이 받기로 한 몫은 "순이익의 16%"였는데, 그 순이익을 산정하는 장부는 회사가 관리했고 이란 정부에는 감사 권한이 없었다. 영국 본국에 내는 세금은 비용으로 먼저 빠져나갔다. 훗날 이란이 회사 장부를 열어보려 했을 때 회사가 이를 거부한 것이 1951년 국유화의 직접적 도화선이 된다.\n\n이 계약이 왜 100년의 출발점인가. 자원 자체가 갈등을 만든 것이 아니라, 자원에 대한 결정권이 그 땅에 사는 사람들 바깥에 놓였다는 사실이 갈등을 만들었기 때문이다. 이후 이란 현대사에서 반복되는 물음 — 이 석유는 누구의 것인가 — 은 1901년 그 서명에서 시작되었다.',
      claim_ko: null,
      rebuttal_ko: null,
      sources: [
        { type:'book', name:'All the Shah\'s Men: An American Coup and the Roots of Middle East Terror', publisher:'John Wiley & Sons', author:'Stephen Kinzer', year:'2003', url:'' },
        { type:'book', name:'황금의 샘(The Prize) — 석유가 만든 20세기의 역사', publisher:'라의눈', author:'대니얼 예긴', year:'2017', url:'' },
        { type:'archive', name:'Iran — Encyclopædia Britannica, History section', publisher:'Britannica', author:'', year:'', url:'https://www.britannica.com/place/Iran' },
      ],
      related: {
        events: [
          { title:'이란 현대사 루트 — 지도에서 흐름 보기', url:'../world-routes/iran-hormuz.html' },
        ],
      },
    },

    // ── 2. 모사데크와 석유 국유화 (1951) ────────────────────────
    {
      id: 'mosaddegh_1951',
      type: 'person',
      format: 'narrative',
      year: 1951, month: 4, day: 28,
      title_ko: '모사데크 — 반세기 만에 되찾으려 한 석유',
      place_ko: '이란 테헤란 의회',
      lat: 35.6944, lng: 51.4215,
      card_ref: null, card_map: null,
      world_route: 'iran-hormuz',
      body_ko: '2차 대전이 끝나고 영국의 힘이 예전 같지 않자, 이란 정계에서 석유를 되찾아야 한다는 목소리가 커졌다. 그 중심에 법학 박사 출신의 노정객 모하마드 모사데크가 있었다. 1882년 고위 관료 집안에서 태어나 스위스에서 법학을 공부한 그는, 1905년 입헌혁명 이후 의회 정치의 한복판에서 정치 인생을 보낸 인물이었다. 그가 이끄는 국민전선의 요구는 단순했다 — 앵글로-이란 석유회사(AIOC, 옛 APOC)의 장부를 열어보게 하고, 계약대로 받아야 할 몫을 받자는 것이었다.\n\n회사가 감사를 거부하자 의회는 더 나아갔다. 1951년 4월 28일 이란 의회는 석유 산업 국유화를 의결했고, 며칠 뒤 모사데크가 총리에 취임했다. 1901년 이후 반세기 만에 이란이 자국 석유의 주인이 되겠다고 선언한 것이다. 테헤란 거리는 환호했다. 이란 밖에서도, 식민 지배에서 막 벗어나던 아시아·아프리카의 신생국들이 이 소식을 주목했다.\n\n그러나 국유화는 기대만큼의 성과를 내지 못했다. 영국 기술 인력이 철수하면서 정유시설 운영 능력이 떨어졌고, 영국은 해군력을 동원해 이란산 원유의 국제 판로를 사실상 봉쇄했다. 이란 경제는 급격히 나빠졌다. 고립을 벗어나려 모사데크가 소련과의 협력 가능성을 타진하자, 이는 그를 공산주의자로 낙인찍으려는 쪽에 좋은 빌미가 되었다.\n\n모사데크에 대한 평가는 지금도 갈린다. 자원 주권을 처음으로 실행에 옮긴 민족주의 지도자로 보는 시각이 있는 한편, 봉쇄에 대한 대비 없이 국유화를 밀어붙였고 후반에는 의회를 우회하는 통치로 스스로 지지 기반을 좁혔다는 비판도 있다. 다만 그가 선거로 선출된 총리였다는 사실, 그리고 그를 무너뜨린 것이 이란 내부의 표가 아니었다는 사실만큼은 다투어지지 않는다.',
      claim_ko: null,
      rebuttal_ko: null,
      sources: [
        { type:'book', name:'All the Shah\'s Men: An American Coup and the Roots of Middle East Terror', publisher:'John Wiley & Sons', author:'Stephen Kinzer', year:'2003', url:'' },
        { type:'book', name:'The Coup: 1953, The CIA, and The Roots of Modern U.S.-Iranian Relations', publisher:'The New Press', author:'Ervand Abrahamian', year:'2013', url:'' },
        { type:'archive', name:'Mohammad Mosaddegh — Encyclopædia Britannica', publisher:'Britannica', author:'', year:'', url:'https://www.britannica.com/biography/Mohammad-Mosaddegh' },
      ],
      related: {
        events: [
          { title:'이란 현대사 루트 — 지도에서 흐름 보기', url:'../world-routes/iran-hormuz.html' },
        ],
      },
    },

    // ── 3. 아약스 작전 (1953) ───────────────────────────────────
    {
      id: 'ajax_1953',
      type: 'event',
      format: 'narrative',
      year: 1953, month: 8, day: 19,
      title_ko: '아약스 작전 — 선출된 정부가 무너진 날',
      place_ko: '이란 테헤란',
      lat: 35.7000, lng: 51.4000,
      card_ref: null, card_map: null,
      world_route: 'iran-hormuz',
      body_ko: '1953년 8월 19일, 모사데크 정부가 무너졌다. 미국 CIA(작전명 TP-AJAX)와 영국 MI6(작전명 부트)가 공모해 실행한 쿠데타였다. 매수된 군 지휘부와 거리 시위대, 언론 공작이 동원되었다. 한 차례 실패해 국왕 모하마드 레자 팔라비가 국외로 피신하기까지 했으나, 사흘 만에 판이 뒤집혔다. 모사데크는 체포되어 재판을 받고 여생을 가택연금 상태로 보냈다.\n\n동기를 두고는 두 가지 설명이 경합해 왔다. 당시 미국이 내세운 명분은 냉전이었다 — 이란이 소련 쪽으로 넘어가는 것을 막아야 한다는 것이다. 반면 이란 근현대사 연구자 에르반드 아브라하미안 등은 문서 공개 이후의 연구를 근거로, 핵심은 공산화 저지가 아니라 영·미의 석유 이권 보호였다고 본다. 실제로 쿠데타 이후 이란 석유는 국제 컨소시엄이 운영하게 되었고, 영국이 독점하던 자리에 미국 회사들이 40%를 나눠 가졌다.\n\n미국 정부는 오랫동안 개입을 공식 인정하지 않았다. 2000년 올브라이트 국무장관이 미국의 역할을 사실상 시인했고, 2013년 CIA가 관련 문서 일부를 공개하며 개입 사실이 공식 기록으로 확인되었다.\n\n이 사건이 남긴 것은 정권 교체 그 자체보다 길다. 이란 사회에서 1953년은 "우리가 스스로 뽑은 정부를 외국이 없앴다"는 기억으로 남았고, 1979년 혁명기의 반미 구호와 미국 대사관 점거는 이 기억을 직접 호출했다. 한편 미국 정책 결정 과정에서는 이 작전이 "값싸게 성공한 비밀공작"의 선례로 받아들여져, 이후 여러 나라에서 유사한 개입이 시도되는 배경이 되었다는 평가가 있다.\n\n한국 독자에게 이 대목은 낯설지 않다. 선거로 세운 정부가 외부의 힘과 내부의 협력자에 의해 무너지고, 그 후유증이 수십 년간 정치의 밑바닥에 깔리는 구조 — 20세기 여러 나라가 통과한 경로이고, 우리 현대사에도 형태를 달리한 판본이 있다.',
      claim_ko: null,
      rebuttal_ko: null,
      sources: [
        { type:'book', name:'The Coup: 1953, The CIA, and The Roots of Modern U.S.-Iranian Relations', publisher:'The New Press', author:'Ervand Abrahamian', year:'2013', url:'' },
        { type:'archive', name:'CIA Confirms Role in 1953 Iran Coup — National Security Archive, Electronic Briefing Book No. 435', publisher:'National Security Archive (GWU)', author:'', year:'2013', url:'https://nsarchive2.gwu.edu/NSAEBB/NSAEBB435/' },
        { type:'book', name:'All the Shah\'s Men', publisher:'John Wiley & Sons', author:'Stephen Kinzer', year:'2003', url:'' },
      ],
      related: {
        events: [
          { title:'이란 현대사 루트 — 지도에서 흐름 보기', url:'../world-routes/iran-hormuz.html' },
        ],
      },
    },

    // ── 4. 백색혁명에서 이슬람 혁명까지 (1963~1979) ─────────────
    {
      id: 'revolution_1979',
      type: 'event',
      format: 'narrative',
      year: 1979, month: 2, day: 11,
      title_ko: '백색혁명에서 이슬람 혁명까지 — 왕정이 무너지기까지의 16년',
      place_ko: '이란 테헤란',
      lat: 35.7219, lng: 51.3347,
      card_ref: null, card_map: null,
      world_route: 'iran-hormuz',
      body_ko: '1953년 이후 팔라비 국왕은 미국의 지원 아래 권력을 굳혔다. 1963년부터는 "백색혁명"이라 불린 위로부터의 근대화를 밀어붙였다 — 토지개혁, 국영기업 민영화, 여성 참정권, 문맹 퇴치. 성과가 없지 않았으나 방식은 일방적이었고, 토지를 잃은 지주층과 종교계, 그리고 개혁의 과실에서 밀려난 도시 빈민이 동시에 등을 돌렸다.\n\n1963년 백색혁명 국민투표에 반대하며 국왕을 정면으로 규탄한 성직자 루홀라 호메이니가 이때 전국적 인물이 되었다. 그는 체포와 석방을 거쳐 1964년 미군 지위 관련 협정 — 미군과 그 관계자에게 외교관에 준하는 특권을 인정하는 내용 — 에 항의하다 국외로 추방되었다. 튀르키예와 이라크 나자프, 마지막에는 파리에서 15년 가까이 망명 생활을 하며 그는 자신의 통치 이론을 정리했고, 카세트테이프에 담긴 설교가 이란 안으로 흘러 들어갔다.\n\n국왕의 통치는 비밀경찰 사바크(SAVAK)의 감시와 고문에 기대고 있었고, 오일 붐이 만든 급격한 빈부 격차가 불만을 키웠다. 1978년 시위가 전국으로 번졌다. 이슬람 세력만의 운동이 아니었다 — 좌파, 자유주의자, 학생, 상인 계층이 함께했다. 1979년 1월 국왕이 "요양"을 명분으로 출국했고, 2월 1일 호메이니가 귀국했다. 테헤란 거리를 메운 인파는 수백만으로 추산된다. 2월 11일 군이 중립을 선언하며 왕정은 끝났다.\n\n혁명 이후의 전개는 함께 싸운 세력들의 기대와 갈라졌다. 4월 국민투표로 이슬람 공화국이 선포되었고, 최고지도자가 선출 권력 위에 서는 체제가 헌법에 담겼다. 혁명에 참여했던 좌파와 자유주의 계열, 그리고 여성 운동은 이후 강도 높은 탄압을 받았다. 하나의 억압이 다른 억압으로 대체되었다는 평가가 나오는 이유다.\n\n그리고 이 혁명은 한국 경제를 직접 흔들었다. 이란의 원유 생산이 급감하며 1978~1980년 2차 오일쇼크가 왔고, 이는 유신 말기 한국 경제에 큰 타격을 주어 1980년대 초까지 이어지는 침체의 한 원인이 되었다. 지구 반대편의 혁명이 한국의 물가와 성장률에 곧바로 나타난 것이다.',
      claim_ko: null,
      rebuttal_ko: null,
      sources: [
        { type:'book', name:'A History of Modern Iran', publisher:'Cambridge University Press', author:'Ervand Abrahamian', year:'2008', url:'' },
        { type:'archive', name:'이란 혁명 — 위키백과', publisher:'위키백과', author:'', year:'', url:'https://ko.wikipedia.org/wiki/%EC%9D%B4%EB%9E%80_%ED%98%81%EB%AA%85' },
        { type:'archive', name:'1970년대 석유파동 — 우리역사넷', publisher:'국사편찬위원회', author:'', year:'', url:'https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_i500270&code=kc_age_50' },
      ],
      related: {
        events: [
          { title:'이란 현대사 루트 — 지도에서 흐름 보기', url:'../world-routes/iran-hormuz.html' },
        ],
      },
    },

    // ── 5. 인질 사건과 단절 (1979~1981) ─────────────────────────
    {
      id: 'hostage_1979',
      type: 'event',
      format: 'narrative',
      year: 1979, month: 11, day: 4,
      title_ko: '444일 — 대사관 점거와 끊어진 관계',
      place_ko: '이란 테헤란 미국 대사관',
      lat: 35.7050, lng: 51.4245,
      card_ref: null, card_map: null,
      world_route: 'iran-hormuz',
      body_ko: '1979년 11월 4일, 이란 학생 시위대가 테헤란의 미국 대사관을 점거하고 외교관과 직원들을 인질로 잡았다. 직접적 계기는 망명한 팔라비 전 국왕이 암 치료를 이유로 미국에 입국한 일이었다. 점거자들의 요구는 국왕의 신병 인도였다. 그 밑에는 1953년의 기억이 있었다 — 미국이 국왕을 다시 앉히려 한다는 의심이 이란 사회에 실재했고, 26년 전의 전례가 그 의심에 근거를 제공했다.\n\n인질 52명의 억류는 444일간 이어졌다. 미국은 1980년 4월 군사 구출 작전을 시도했으나 사막에서 헬기 사고로 미군 8명이 숨지며 실패했다. 이 실패는 카터 대통령의 재선 실패에 결정적으로 작용했다는 평가를 받는다. 1980년 9월 이라크가 이란을 침공하면서 이란 쪽에서도 사태를 끝낼 유인이 커졌고, 알제리 중재로 미국이 동결했던 이란 자산을 반환하기로 하면서 1981년 1월 20일 인질 전원이 풀려났다.\n\n외교 공관의 불가침은 국제법의 오랜 원칙이며, 국제사법재판소는 1980년 이란의 행위가 국제법 위반이라고 판결했다. 이 점에서 인질 사건은 정당화되기 어렵다. 동시에 이 사건이 왜 이란 안에서 광범위한 지지를 받았는지를 설명하려면 1953년으로 돌아가야 한다는 것 또한 사실이다. 두 가지는 양립한다 — 원인을 이해하는 일과 행위를 정당화하는 일은 다르다.\n\n결과는 길었다. 미국과 이란의 국교는 이때 끊어져 지금까지 회복되지 않았다. 이후 40여 년의 제재와 대립은 모두 이 단절 위에서 전개된다.',
      claim_ko: null,
      rebuttal_ko: null,
      sources: [
        { type:'archive', name:'주이란 미국 대사관 인질 사건 — 위키백과', publisher:'위키백과', author:'', year:'', url:'https://ko.wikipedia.org/wiki/%EC%A3%BC%EC%9D%B4%EB%9E%80_%EB%AF%B8%EA%B5%AD_%EB%8C%80%EC%82%AC%EA%B4%80_%EC%9D%B8%EC%A7%88_%EC%82%AC%EA%B1%B4' },
        { type:'court', name:'United States Diplomatic and Consular Staff in Tehran (United States of America v. Iran), Judgment', publisher:'International Court of Justice', author:'', year:'1980', url:'https://www.icj-cij.org/case/64' },
        { type:'book', name:'A History of Modern Iran', publisher:'Cambridge University Press', author:'Ervand Abrahamian', year:'2008', url:'' },
      ],
      related: {
        events: [
          { title:'이란 현대사 루트 — 지도에서 흐름 보기', url:'../world-routes/iran-hormuz.html' },
        ],
      },
    },

    // ── 6. 이란-이라크 전쟁과 탱커 전쟁 (1980~1988) ─────────────
    {
      id: 'iran_iraq_war',
      type: 'event',
      format: 'narrative',
      year: 1980, month: 9, day: 22,
      title_ko: '8년 전쟁 — 그리고 호르무즈가 인질이 되다',
      place_ko: '이라크·이란 국경 샤트알아랍 · 페르시아만',
      lat: 30.4500, lng: 48.1800,
      card_ref: null, card_map: null,
      world_route: 'iran-hormuz',
      body_ko: '1980년 9월 22일, 이라크의 사담 후세인이 혁명 직후의 혼란을 틈타 이란을 침공했다. 국경 수로 샤트알아랍의 통제권과 유전 지대가 걸려 있었고, 시아파 혁명이 이라크로 번지는 것을 막으려는 계산도 있었다. 전쟁은 8년을 끌었다. 참호전, 소년병, 화학무기가 동원되었고 양측 사망자는 백만 명 안팎으로 추산된다. 1988년 유엔 중재로 휴전했을 때 국경선은 전쟁 전과 거의 같았다.\n\n이 전쟁이 세계 경제와 만난 지점이 이른바 "탱커 전쟁"이다. 양측이 상대의 석유 수출을 막으려 페르시아만의 유조선을 서로 공격하면서, 세계 원유의 상당 부분이 지나는 이 좁은 바다가 처음으로 국제 분쟁의 직접적 무대가 되었다. 쿠웨이트 유조선이 미국 국적으로 재등록해 미 해군의 호위를 받는 상황까지 벌어졌다. 호르무즈 해협이 "봉쇄 가능한 급소"라는 인식이 이때 국제사회에 각인되었다.\n\n1988년 7월 3일에는 미 해군 순양함 빈센스호가 호르무즈 해협 상공에서 이란항공 655편 여객기를 격추해 탑승자 290명 전원이 사망했다. 미국은 전투기로 오인한 사고라고 밝혔고 유족에게 배상금을 지급했으나, 공식 사과는 하지 않았다. 이란에서 이 사건은 오늘까지 미국에 대한 불신의 상징으로 남아 있다.\n\n한국은 이 전쟁의 관찰자가 아니었다. 1970년대 중동 건설 붐으로 수많은 한국 노동자와 건설사가 이 지역에 나가 있었고, 이란과 이라크 양국 모두에 한국 기업의 공사 현장이 있었다. 전쟁은 그 현장을 직접 위협했고, 1980년대 중동 건설 붐 퇴조의 한 배경이 되었다. 지금도 서울 강남의 테헤란로와 테헤란의 서울로는 그 시절 두 나라가 맺었던 관계의 흔적이다.',
      claim_ko: null,
      rebuttal_ko: null,
      sources: [
        { type:'book', name:'A History of Modern Iran', publisher:'Cambridge University Press', author:'Ervand Abrahamian', year:'2008', url:'' },
        { type:'archive', name:'중동 건설 붐 1973~1982 — 우리역사넷', publisher:'국사편찬위원회', author:'', year:'', url:'https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_i503200&code=kc_age_50' },
        { type:'archive', name:'Iran Air Flight 655 — Encyclopædia Britannica', publisher:'Britannica', author:'', year:'', url:'https://www.britannica.com/event/Iran-Air-flight-655' },
      ],
      related: {
        events: [
          { title:'이란 현대사 루트 — 지도에서 흐름 보기', url:'../world-routes/iran-hormuz.html' },
        ],
      },
    },

    // ── 7. 핵합의와 파기 (2002~2018) ────────────────────────────
    {
      id: 'jcpoa_2015',
      type: 'event',
      format: 'narrative',
      year: 2015, month: 7, day: 14,
      title_ko: '핵합의 — 잠시 열렸다 닫힌 문',
      place_ko: '오스트리아 빈',
      lat: 48.2082, lng: 16.3738,
      card_ref: null, card_map: null,
      world_route: 'iran-hormuz',
      body_ko: '2002년 이란의 미신고 핵시설이 드러나면서 핵 문제가 국제 의제가 되었다. 이란은 핵확산금지조약(NPT) 당사국으로서 평화적 이용 권리를 주장했고, 미국과 유럽은 군사 전용 가능성을 문제 삼았다. 유엔 안보리 제재가 누적되며 이란 경제는 원유 수출과 국제 금융에서 차단되었다.\n\n2015년 7월 14일, 이란과 미국·영국·프랑스·독일·러시아·중국이 포괄적 공동행동계획(JCPOA)에 합의했다. 이란은 농축 우라늄 재고와 농축 수준을 대폭 제한하고 국제원자력기구(IAEA)의 강도 높은 사찰을 받아들이는 대신, 핵 관련 제재를 해제받았다. 수십 년 만의 외교적 돌파구였고, 이란 안에서는 경제 회복에 대한 기대가 컸다.\n\n2018년 5월 미국이 일방적으로 합의를 탈퇴하고 제재를 복원했다. 트럼프 행정부는 합의가 미사일 프로그램과 역내 무장세력 지원을 다루지 않았고 제한 기간에 만료 시점이 있다는 점을 이유로 들었다. 반대편에서는 IAEA가 이란의 합의 이행을 반복적으로 확인해 왔다는 점, 그리고 일방 탈퇴가 향후 어떤 합의에 대한 신뢰도 무너뜨린다는 점을 지적했다.\n\n제재가 돌아오자 이란은 단계적으로 농축 수준을 다시 올렸다. 합의를 되살리려는 협상이 몇 차례 시도되었으나 성과를 내지 못했고, 이 교착이 2025년 이후 군사 충돌로 이어지는 배경이 된다. 한 번 닫힌 문을 다시 여는 일이 처음 여는 일보다 어렵다는 것을, 이 10년이 보여준다.',
      claim_ko: null,
      rebuttal_ko: null,
      sources: [
        { type:'government', name:'Joint Comprehensive Plan of Action (JCPOA) — 전문', publisher:'European Union External Action', author:'', year:'2015', url:'https://www.eeas.europa.eu/eeas/joint-comprehensive-plan-action_en' },
        { type:'government', name:'IAEA and Iran — Verification and monitoring reports', publisher:'International Atomic Energy Agency', author:'', year:'', url:'https://www.iaea.org/newscenter/focus/iran' },
        { type:'archive', name:'이란 핵 협정 — 위키백과', publisher:'위키백과', author:'', year:'', url:'https://ko.wikipedia.org/wiki/%EC%9D%B4%EB%9E%80_%ED%95%B5_%ED%98%91%EC%A0%95' },
      ],
      related: {
        events: [
          { title:'이란 현대사 루트 — 지도에서 흐름 보기', url:'../world-routes/iran-hormuz.html' },
        ],
      },
    },

    // ── 8. 호르무즈, 다시 닫히다 (2025~현재) ────────────────────
    {
      id: 'hormuz_today',
      type: 'event',
      format: 'narrative',
      year: 2026, month: 2, day: 28,
      title_ko: '호르무즈, 다시 닫히다 — 그리고 한국의 배들',
      place_ko: '호르무즈 해협',
      lat: 26.6000, lng: 56.4000,
      card_ref: null, card_map: null,
      world_route: 'iran-hormuz',
      body_ko: '※ 이 글은 진행 중인 사건을 다룬다. 확인된 사실만 적고 전망은 쓰지 않는다. 상황이 바뀌면 갱신한다. (최종 갱신: 2026년 8월)\n\n2025년 6월, 이스라엘과 이란의 분쟁이 격화되는 가운데 미국이 이란 본토의 핵시설을 폭격했다. 6월 22일 이란 의회는 호르무즈 해협 봉쇄를 의결했다. 세계 석유 물동량의 약 5분의 1이 지나는 이 해협은 가장 좁은 곳의 폭이 수십 킬로미터에 불과해, 적은 수단으로도 통항을 방해할 수 있다.\n\n2026년 2월 28일 미국과 이스라엘이 이란 전역에 대규모 공습을 감행해 최고지도자 알리 하메네이를 포함한 수뇌부가 사망했다. 이란은 역내 미군 기지와 이스라엘 본토를 향한 미사일 공격, 그리고 호르무즈 해협 봉쇄로 대응했다. 국제 유가는 3월 초 배럴당 110달러를 넘어섰다. 한국 국적 선박 26척이 해협 안에 발이 묶였고, 정부는 청해부대를 비상 대기시켰다. 한국은 가스 수입의 약 20%를 이 해협에 의존한다.\n\n4월 7일 파키스탄의 중재로 2주간의 휴전에 합의했고, 4월 10일 이슬라마바드에서 회담이 열렸다. 그러나 휴전 이후에도 선박 피격과 공습이 반복되었다. 7월에는 다국적 공동해양정보센터(JMIC)가 해협 통항 선박의 위험 등급을 상향했다.\n\n2026년 8월 현재, 이란은 오만과 해협 관리 방안을 협의하며 "해협이 과거의 상태로 돌아가는 일은 없다"는 입장을 밝히고 있다. 미국은 이란이 통제하지 않는 항로를 요구하고, 이란은 이를 거부한다. 협상은 계속되고 있다.\n\n1901년 한 장의 채굴권 계약에서 시작된 물음이 125년째 답을 얻지 못했다. 이 자원과 이 바닷길은 누구의 것인가. 그리고 그 답이 정해지는 자리에, 그 결과를 함께 감당해야 하는 나라들 — 원유의 대부분을 이 길로 들여오는 한국을 포함해 — 은 얼마나 참여하고 있는가.',
      claim_ko: null,
      rebuttal_ko: null,
      sources: [
        { type:'archive', name:'2026년 이란 전쟁 — 위키백과', publisher:'위키백과', author:'', year:'2026', url:'https://ko.wikipedia.org/wiki/2026%EB%85%84_%EC%9D%B4%EB%9E%80_%EC%A0%84%EC%9F%81' },
        { type:'newspaper', name:'미국·이란 충돌 재개에 호르무즈 또다시 흔들…에너지 수송 차질 불가피', publisher:'서울신문', author:'', year:'2026', url:'https://www.seoul.co.kr/news/international/middleeast-africa/2026/07/08/20260708500109' },
        { type:'newspaper', name:'이란 외무부 "오만과 호르무즈 해협 관리 협의 막바지"', publisher:'MBC', author:'', year:'2026', url:'https://imnews.imbc.com/news/2026/world/article/6841891_36926.html' },
      ],
      related: {
        events: [
          { title:'이란 현대사 루트 — 지도에서 흐름 보기', url:'../world-routes/iran-hormuz.html' },
        ],
      },
    },

  ],
};

if (typeof window !== 'undefined' && typeof window.registerArchiveSeries === 'function') {
  window.registerArchiveSeries(ARCHIVE_SERIES_IRAN_MODERN);
}
