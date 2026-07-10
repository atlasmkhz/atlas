// js/portal.js — atlas/index.html(포털) 전용 스크립트.
// index.html이 더 이상 근대(1876~1945) 지도가 아니라 별도 포털이 되면서
// 새로 만들었다 — 지도 페이지들의 app.js/map.js와는 무관하다.
//
// 지도 페이지들의 js/nav.js를 그대로 불러오지 않는 이유: nav.js의
// ERA_HUB_ITEMS에서 "근대" 항목은 url:'.'(자기참조 — "지금 이 페이지가
// 이미 근대 지도이니 허브만 닫는다")를 쓴다. 포털은 근대 지도가
// 아니므로 이 자기참조가 성립하지 않는다 — 포털에서 "근대" 카드를
// 누르면 항상 실제로 map.html로 이동해야 한다. 그래서 이 파일에
// 자료실(archiveHub)·시대선택(eraHub) 로직을 포털 전용으로 다시
// 구현했다 — 자료실 부분은 taxonomy(ARCHIVE_CATEGORIES/SUBCATEGORIES)를
// 지도들의 nav.js와 반드시 동일하게 유지해야 한다(다르면 포털과 지도가
// 서로 다른 자료실을 보여주는 버그가 생긴다).
//
// 이 파일이 하는 일 네 가지:
// 1. "오늘의 특집" 로테이션
// 2. 구축 현황(PORTAL_STATS) 렌더링
// 3. 시대 선택 허브(eraHub)
// 4. 자료실 허브(archiveHub) — 카테고리→하위주제→글 목록 3단계

(function () {

  // ── 1. 오늘의 특집 로테이션 ──────────────────────────────────
  const RECENT_DAYS = 14; // 이 안에 올라온 영상이 있으면 무조건 그게 특집.

  function getISOWeek(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  }

  function pickFeaturedVideo(videos) {
    if (!videos || !videos.length) return null;
    // pinned_featured:true가 있으면(수동 지정) 로테이션을 건너뛰고
    // 그 영상을 항상 특집으로 노출한다.
    const pinned = videos.find(v => v.pinned_featured);
    if (pinned) return pinned;
    // 매일 바뀌는 로테이션 — "오늘 날짜(연 단위 일수)"를 영상 개수로
    // 나눈 나머지로 인덱스를 정한다. 발행일 오래된 순으로 정렬해두면
    // 같은 날짜에는 항상 같은 영상이 뜨고(새로고침해도 안 바뀜),
    // 자정이 지나면 다음 영상으로 넘어간다. 영상이 늘어날수록 한 바퀴
    // 도는 데 걸리는 날짜도 길어진다.
    const sorted = [...videos].sort((a, b) => new Date(a.published) - new Date(b.published));
    const now = new Date();
    const dayIndex = Math.floor(now.getTime() / 86400000); // 1970-01-01부터 일수
    return sorted[dayIndex % sorted.length];
  }

  function relatedLinks(video) {
    const links = [];
    (video.related_events || []).forEach(id =>
      links.push({ label: '관련 사건', href: `map.html?event=${id}` }));
    (video.related_events_modern2 || []).forEach(id =>
      links.push({ label: '관련 사건', href: `maps/modern2/index.html?event=${id}` }));
    (video.related_routes || []).forEach(id =>
      links.push({ label: '관련 루트', href: `maps/modern2/index.html?route=${id}` }));
    return links;
  }

  function renderFeatured() {
    const videos = window.YOUTUBE_VIDEOS || [];
    const featured = pickFeaturedVideo(videos);
    const el = document.getElementById('featuredCard');
    if (!el) return;

    if (!featured || !featured.youtube_id) {
      el.innerHTML = '<p class="featured-empty">오늘의 특집을 준비 중입니다.</p>';
      return;
    }

    const thumb = `https://i.ytimg.com/vi/${featured.youtube_id}/maxresdefault.jpg`;
    const watchUrl = `https://youtu.be/${featured.youtube_id}`;
    const links = relatedLinks(featured);
    const linksHtml = links.length
      ? `<div class="featured-related">
           <div class="featured-related-title">이 영상에서 다루는 내용</div>
           <div class="featured-related-list">${links.map(l =>
             `<a href="${l.href}">${l.label}</a>`).join('')}</div>
         </div>`
      : '';

    el.innerHTML = `
      <span class="featured-badge">최신 영상</span>
      <a class="featured-thumb" href="${watchUrl}" target="_blank" rel="noopener">
        <img src="${thumb}" alt="${featured.title}" loading="lazy">
        <span class="featured-play">▶</span>
      </a>
      <h3 class="featured-title">${featured.title}</h3>
      <p class="featured-desc">${featured.description || ''}</p>
      ${linksHtml}
      <a class="featured-cta" href="${watchUrl}" target="_blank" rel="noopener">▶ 영상 보기</a>
    `;
  }

  // ── 2. 구축 현황 ──────────────────────────────────────────
  function renderStats() {
    const stats = window.PORTAL_STATS;
    const el = document.getElementById('portalStats');
    if (!el || !stats) return;
    el.innerHTML = `
      <div class="stat-item"><span class="stat-num">${stats.events.toLocaleString()}</span><span class="stat-label">사건</span></div>
      <div class="stat-item"><span class="stat-num">${stats.routes.toLocaleString()}</span><span class="stat-label">루트</span></div>
      <div class="stat-item"><span class="stat-num">${stats.archive_posts.toLocaleString()}</span><span class="stat-label">자료</span></div>
    `;
  }

  // ── 2.5 추천 루트 ── route/*.html + routes/*.js에 흩어진 메타데이터를
  // 여기 하나로 모았다. 새 루트를 추가하면 이 배열에도 항목을 추가해야
  // 카드가 뜬다(정적 사이트라 디렉터리 목록을 js에서 자동으로 읽을 수 없음).
  // ── 2.5 추천 루트 ── 전체 47개 루트의 마스터 목록. 매일 이 중 6개를
  // 뽑아 보여준다(아래 renderRoutes에서 날짜 기반으로 선택) — 새
  // 루트를 추가하면 이 배열에도 항목을 추가해야 로테이션 대상이 된다
  // (정적 사이트라 디렉터리 목록을 js에서 자동으로 읽을 수 없다).
  const MASTER_ROUTES = [
    // 근대(포털) — map.html
    { path: 'map.html?route=hong_beom_do', name: '홍범도', tagline: '포수에서 현충원까지', period: '1868~2021', waypoints: 26, color: '#c8a827', image: 'assets/images/entity/person/person_hong_beom_do_01.webp' },
    { path: 'map.html?route=righteous_struggle', name: '의열투쟁', tagline: '조선의 심장을 겨누다', period: '1908~1932', waypoints: 21, color: '#b8632f', image: 'assets/images/route/route_righteous_struggle_hero.webp' },
    { path: 'map.html?route=kim_gu', name: '백범 김구', tagline: '상놈의 아들에서 임시정부의 얼굴로', period: '1876~1949', waypoints: 33, color: '#3a5a8c', image: 'assets/images/entity/person/person_kim_gu_01.webp' },
    { path: 'map.html?route=japanese_atrocities', name: '일제 만행 루트', tagline: '50년의 가해 기록', period: '1895~1945', waypoints: 18, color: '#8c1f1f', image: 'assets/images/route/route_japanese_atrocities_hero.webp' },
    { path: 'map.html?route=daegu_gyeongbuk_independence', name: '대구경북 독립운동가', tagline: '"조선의 모스크바"의 시작', period: '1909~1944', waypoints: 14, color: '#8c3a2e', image: 'assets/images/route/route_daegu_gyeongbuk_independence_hero.webp' },
    { path: 'map.html?route=donghak', name: '동학', tagline: '득도에서 우금치까지, 그리고 3·1운동으로', period: '1860~1919', waypoints: 20, color: '#8c6b2e', image: 'assets/images/entity/person/person_jeon_bong_jun_01.webp' },
    { path: 'map.html?route=kim_won_bong', name: '김원봉', tagline: '의열단을 만든 사람, 두 번 지워진 이름', period: '1898~1958', waypoints: 30, color: '#a83232', image: 'assets/images/entity/person/person_kim_won_bong_01.webp' },
    { path: 'map.html?route=provisional_government', name: '임시정부', tagline: '27년, 다섯 번의 이동, 그리고 끝내 지켜낸 이름', period: '1919~1945', waypoints: 9, color: '#8c3a2e', image: 'assets/images/route/route_provisional_government_hero.webp' },
    { path: 'map.html?route=modern_art_history', name: '근대예술사', tagline: '식민지라는 현실과 새로운 예술 사이, 시대를 앓거나 시대에 굴복한 이름들', period: '1915~1945', waypoints: 13, color: '#4a3a5c', image: 'assets/images/route/route_modern_art_history_hero.webp' },

    // 근현대 — maps/modern2/index.html
    { path: 'maps/modern2/index.html?route=syngman_rhee', name: '이승만', tagline: '외교독립론자에서 초대 대통령, 그리고 3·15 부정선거로 쫓겨난 90년', period: '1875~1965', waypoints: 28, color: '#7a5c2e', image: 'maps/modern2/assets/images/entity/person/person_syngman_rhee_01.webp' },
    { path: 'maps/modern2/index.html?route=kim_il_sung', name: '김일성', tagline: '보천보의 유격대원에서 절대권력자로, 82년의 생애', period: '1912~1994', waypoints: 25, color: '#8c2020', image: 'maps/modern2/assets/images/entity/person/person_kim_il_sung_01.webp' },
    { path: 'maps/modern2/index.html?route=park_chung_hee', name: '박정희', tagline: '쿠데타로 권력을 잡고 경제를 일으키는 동시에 헌정을 파괴하다, 62년', period: '1917~1979', waypoints: 36, color: '#4a5a3a', image: 'maps/modern2/assets/images/entity/person/person_park_chung_hee_01.webp' },
    { path: 'maps/modern2/index.html?route=chun_doo_hwan', name: '전두환', tagline: '광주에서 자국민을 향해 총을 쏘라 명령한 사람, 90년', period: '1931~2021', waypoints: 39, color: '#5a3a3a', image: 'maps/modern2/assets/images/entity/person/person_chun_doo_hwan_01.webp' },
    { path: 'maps/modern2/index.html?route=kim_dae_jung', name: '김대중', tagline: '국가폭력의 최대 피해자가 헌정사 최초의 평화적 정권교체를 이루기까지', period: '1924~2009', waypoints: 29, color: '#2e4a6b', image: 'maps/modern2/assets/images/entity/person/person_kim_dae_jung_01.webp' },
    { path: 'maps/modern2/index.html?route=daegu_gyeongbuk_democracy', name: '대구경북 민주화의 열망', tagline: '"조선의 모스크바"라 불렸던 대구경북의 잊힌 얼굴', period: '1946~1975', waypoints: 5, color: '#2e5a8c', image: 'maps/modern2/assets/images/route/route_daegu_gyeongbuk_democracy_hero.webp' },
    { path: 'maps/modern2/index.html?route=korean_war_massacres', name: '학살의 기록', tagline: '이승만 정부기 국가폭력 — 제주 3·1절에서 거창까지', period: '1947~1953', waypoints: 27, color: '#5c1f1f', image: 'assets/images/route/route_korean_war_massacres_hero.webp' },
    { path: 'maps/modern2/index.html?route=korean_war_battles', name: '한국전쟁 주요 전투', tagline: '38선에서 판문점까지, 3년 1개월의 전선', period: '1950~1953', waypoints: 6, color: '#5a6b8c', image: 'assets/images/route/route_korean_war_battles_hero.webp' },
    { path: 'maps/modern2/index.html?route=democratization_movement', name: '민주화운동', tagline: '독재에 맞선 33년, 거리에서 헌법으로', period: '1960~1993', waypoints: 9, color: '#5c2f2f', image: 'maps/modern2/assets/images/route/route_democratization_movement_hero.webp' },

    // 고대 — maps/ancient/index.html
    { path: 'maps/ancient/index.html?route=gwanggaeto_conquest', name: '광개토대왕 정복루트', tagline: '거란·백제·후연·가야·왜를 22년에 걸쳐 굴복시키다', period: '385~414', waypoints: 16, color: '#7a2e2e', image: 'maps/ancient/assets/images/route/route_gwanggaeto_conquest_hero.webp' },
    { path: 'maps/ancient/index.html?route=jang_bogo_maritime', name: '장보고 해상무역루트', tagline: '당나라 무장에서 청해진의 해상왕으로', period: '810년대~846', waypoints: 5, color: '#1f6b6b', image: 'maps/ancient/assets/images/route/route_jang_bogo_maritime_hero.webp' },
    { path: 'maps/ancient/index.html?route=kim_yu_sin_unification', name: '김유신 삼국통일루트', tagline: '단석산의 소년 화랑에서 삼국통일의 설계자로', period: '609년경~676', waypoints: 7, color: '#8c1f3a', image: null },
    { path: 'maps/ancient/index.html?route=hyecho_pilgrimage', name: '혜초 왕오천축국전 루트', tagline: '16세에 출가해 뱃길로 인도에 닿고, 페르시아·아랍의 변경까지', period: '723~780', waypoints: 21, color: '#b8862f', image: 'maps/ancient/assets/images/route/route_hyecho_pilgrimage_hero.webp' },
    { path: 'maps/ancient/index.html?route=ancient_history_debates', name: '고대사 논쟁루트', tagline: '한사군·낙랑군·임나일본부·환단고기·동북공정, 지금도 계속되는 논쟁', period: '신화시대~오늘날', waypoints: 9, color: '#4a3a2e', image: 'maps/ancient/assets/images/route/route_ancient_history_debates_hero.webp' },
    { path: 'maps/ancient/index.html?route=geunchogo_conquest', name: '근초고왕 정복루트', tagline: '가야·마한을 흡수하고 고구려 왕을 전사시키다', period: '346~400', waypoints: 9, color: '#2e6b4a', image: 'maps/ancient/assets/images/route/route_geunchogo_conquest_hero.webp' },
    { path: 'maps/ancient/index.html?route=korea_hegemony_history', name: '한반도를 둘러싼 패권의 역사', tagline: '한사군에서 판문점까지, 2000년 넘는 강대국 각축의 지도', period: '기원전 108~1953', waypoints: 14, color: '#5a3a2e', image: 'maps/ancient/assets/images/route/route_korea_hegemony_history_hero.webp' },
    { path: 'maps/ancient/index.html?route=northern_peoples_history', name: '초원의 후예들', tagline: '흉노에서 발해까지, 그리고 몽골제국과 오스만까지', period: '구석기시대~926', waypoints: 23, color: '#4a5a3a', image: 'maps/ancient/assets/images/route/route_northern_peoples_history_hero.webp' },
    { path: 'maps/ancient/index.html?route=goguryeo_heritage_sites', name: '고대 문화유산 순례 ① 고구려', tagline: '졸본에서 한강까지, 오늘날 남아있는 고구려 유적', period: '오늘날 남아있는 유적들', waypoints: 14, color: '#6b4a2e', image: 'maps/ancient/assets/images/route/route_goguryeo_heritage_sites_hero.webp' },
    { path: 'maps/ancient/index.html?route=baekje_heritage_sites', name: '고대 문화유산 순례 ② 백제', tagline: '한성에서 웅진, 사비까지', period: '오늘날 남아있는 유적들', waypoints: 13, color: '#2e6b4a', image: 'maps/ancient/assets/images/route/route_baekje_heritage_sites_hero.webp' },
    { path: 'maps/ancient/index.html?route=silla_heritage_sites', name: '고대 문화유산 순례 ③ 신라', tagline: '992년 도읍을 옮기지 않은 나라, 경주 전체가 유적', period: '오늘날 남아있는 유적들', waypoints: 12, color: '#8c6b2e', image: 'maps/ancient/assets/images/route/route_silla_heritage_sites_hero.webp' },
    { path: 'maps/ancient/index.html?route=gaya_heritage_sites', name: '고대 문화유산 순례 ④ 가야', tagline: '대등한 소국들의 연맹, 2023년 유네스코가 인정한 7곳', period: '오늘날 남아있는 유적들', waypoints: 8, color: '#5c8c6b', image: 'maps/ancient/assets/images/route/route_gaya_heritage_sites_hero.webp' },
    { path: 'maps/ancient/index.html?route=balhae_heritage_sites', name: '고대 문화유산 순례 ⑤ 발해', tagline: '다섯 나라 중 가장 멀고, 가장 가기 어려운 곳들', period: '오늘날 남아있는 유적들', waypoints: 6, color: '#4a4a6b', image: 'maps/ancient/assets/images/route/route_balhae_heritage_sites_hero.webp' },
    { path: 'maps/ancient/index.html?route=buddhism_introduction', name: '불교의 전래 루트', tagline: '중국을 거쳐 온 새로운 사상이 삼국의 통치 이념이 되기까지', period: '372~8세기', waypoints: 8, color: '#4a5c3a', image: 'maps/ancient/assets/images/route/route_buddhism_introduction_hero.webp' },

    // 고려 — maps/medieval1/index.html
    { path: 'maps/medieval1/index.html?route=wang_geon_unification', name: '왕건통일루트', tagline: '송악 호족의 아들에서 고려의 태조로', period: '875~943', waypoints: 12, color: '#3a5a8c', image: 'maps/medieval1/assets/images/route/route_wang_geon_unification_hero.webp' },
    { path: 'maps/medieval1/index.html?route=goryeo_khitan_war', name: '고려거란전쟁', tagline: '낙타를 굶겨 죽인 그날부터 귀주대첩까지, 30년', period: '942~1044', waypoints: 8, color: '#5c2f2f', image: 'maps/medieval1/assets/images/route/route_goryeo_khitan_war_hero.webp' },
    { path: 'maps/medieval1/index.html?route=goryeo_heritage_sites', name: '고려 문화유산 순례', tagline: '474년 도읍 개경, 그리고 39년의 강화도 항쟁', period: '오늘날 남아있는 유적들', waypoints: 12, color: '#3a5a8c', image: 'maps/medieval1/assets/images/route/route_goryeo_heritage_sites_hero.webp' },
    { path: 'maps/medieval1/index.html?route=goryeo_rebellions', name: '고려시대 민란·반란 루트', tagline: '왕실의 권력 다툼에서 노비의 신분 해방 외침까지 — 고려 500년을 흔든 반란들', period: '945~1273', waypoints: 11, color: '#4a3a5c', image: 'maps/medieval1/assets/images/route/route_goryeo_rebellions_hero.webp' },

    // 조선 — maps/medieval2/index.html
    { path: 'maps/medieval2/index.html?route=yi_sun_sin', name: '이순신 루트', tagline: '두 번의 백의종군과 세 번의 결정적 해전, 나라를 지켜낸 53년', period: '1545~1598', waypoints: 11, color: '#1f4a6b', image: 'maps/medieval2/assets/images/route/route_yi_sun_sin_hero.webp' },
    { path: 'maps/medieval2/index.html?route=imjin_war', name: '임진왜란·정유재란 루트', tagline: '7년의 전쟁, 무너진 관군과 일어선 백성 — 부산진에서 노량까지', period: '1592~1598', waypoints: 24, color: '#7a1f1f', image: 'maps/medieval2/assets/images/route/route_imjin_war_hero.webp' },
    { path: 'maps/medieval2/index.html?route=joseon_rebellions', name: '조선시대 민란·반란 루트', tagline: '수탈에 맞선 백성들, 그리고 체제에 도전한 반란들 — 임꺽정에서 동학까지', period: '1559~1894', waypoints: 10, color: '#5c2f2f', image: 'maps/medieval2/assets/images/route/route_joseon_rebellions_hero.webp' },
    { path: 'maps/medieval2/index.html?route=joseon_heritage_sites', name: '조선 문화유산 순례', tagline: '5대 궁궐과 종묘사직에서 훈민정음 해례본까지', period: '오늘날 남아있는 유적들', waypoints: 14, color: '#8c6b2e', image: 'maps/medieval2/assets/images/route/route_joseon_heritage_sites_hero.webp' },
    { path: 'maps/medieval2/index.html?route=hunminjeongeum', name: '훈민정음 루트', tagline: '스물여덟 글자로 시작된, 지금도 계속되는 문자의 역사', period: '1443~오늘날', waypoints: 12, color: '#2e5a4a', image: 'maps/medieval2/assets/images/route/route_hunminjeongeum_hero.webp' },
    { path: 'maps/medieval2/index.html?route=byeongja_horan', name: '병자호란 루트', tagline: '47일의 항전, 그리고 삼전도의 굴욕', period: '1636~1637', waypoints: 9, color: '#3a4a5c', image: 'maps/medieval2/assets/images/route/route_byeongja_horan_hero.webp' },
    { path: 'maps/medieval2/index.html?route=silhak', name: '실학 루트', tagline: '공리공론을 넘어, 백성의 삶과 나라의 부강을 고민한 학풍', period: '1670~1836', waypoints: 8, color: '#5c6b3a', image: 'maps/medieval2/assets/images/route/route_silhak_hero.webp' },
    { path: 'maps/medieval2/index.html?route=joseon_tongsinsa', name: '조선통신사 루트', tagline: '전쟁의 상처를 넘어, 200년 가까이 이어진 평화 외교', period: '1607~1811', waypoints: 8, color: '#2e6b6b', image: 'maps/medieval2/assets/images/route/route_joseon_tongsinsa_hero.webp' },
    { path: 'maps/medieval2/index.html?route=joseon_geniuses', name: '조선의 천재들 루트', tagline: '신분과 시대의 제약 속에서도 빛난 조선의 재능들', period: '15세기~19세기', waypoints: 8, color: '#6b4a2e', image: 'maps/medieval2/assets/images/route/route_joseon_geniuses_hero.webp' },

    // 현대 — maps/contemporary/index.html
    { path: 'maps/contemporary/index.html?route=korea_disaster_history', name: '대한민국 재난사 루트', tagline: '반복된 참사, 그때마다 물었던 "왜 막지 못했는가"', period: '1994~2022', waypoints: 7, color: '#4a4a4a', image: 'maps/contemporary/assets/images/route/route_korea_disaster_history_hero.webp' },
    { path: 'maps/contemporary/index.html?route=korea_party_history', name: '대한민국 정당사 루트', tagline: '오늘의 여야에서 해방 정국까지, 거꾸로 거슬러 올라가는 두 갈래 계보', period: '1945~오늘날', waypoints: 21, color: '#3a4a6b', image: 'maps/contemporary/assets/images/route/route_korea_party_history_hero.webp' },
  ];

  // 매일 날짜가 바뀌면 다른 6개가 뽑히도록 — "오늘의 일수(1970-01-01
  // 기준)"를 시드로 배열을 섞는다. 같은 날에는 새로고침해도 항상 같은
  // 6개·같은 순서가 나오고, 자정이 지나면 다음 조합으로 넘어간다.
  function dailyRotationPick(items, count, seed) {
    // 아주 단순한 결정론적 셔플(선형합동생성기) — 암호학적으로 강할
    // 필요는 없고, "매일 다른데 하루 안에서는 고정"이라는 조건만
    // 만족하면 된다.
    let s = seed;
    function rand() {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      return s / 0x7fffffff;
    }
    const pool = [...items];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, count);
  }

  function renderRoutes() {
    const el = document.getElementById('portalRoutes');
    if (!el) return;
    const dayIndex = Math.floor(Date.now() / 86400000);
    const todaysRoutes = dailyRotationPick(MASTER_ROUTES, 6, dayIndex);
    el.innerHTML = todaysRoutes.map(r => {
      const bg = r.image
        ? `background-image:linear-gradient(180deg, rgba(21,19,15,0) 38%, rgba(21,19,15,0.94) 100%), url('${r.image}')`
        : `background-image:linear-gradient(160deg, ${r.color}, #15130f)`;
      return `<a class="route-card" href="${r.path}" style="${bg}">
        <span class="route-card-period">${r.period}</span>
        <span class="route-card-name">${r.name}</span>
        <span class="route-card-tagline">${r.tagline}</span>
        <span class="route-card-meta">📍 ${r.waypoints}개 지점</span>
      </a>`;
    }).join('');
  }

  // ── 3. 시대 선택 허브 ── 포털에서는 모든 항목이 "실제 이동"이다
  // (자기참조 없음 — 이미 지도 위가 아니므로).
  const ERA_ITEMS = [
    { key:'prehistory', name:'선사시대', period:'신화시대~고조선', ready:true, url:'maps/prehistory/index.html' },
    { key:'ancient',    name:'고대',     period:'고구려·백제·신라·발해 (기원전 37–936)', ready:true, url:'maps/ancient/index.html' },
    { key:'medieval1',  name:'중세 1',   period:'고려 918–1392', ready:true, url:'maps/medieval1/index.html' },
    { key:'medieval2',  name:'중세 2',   period:'조선 1392–1875', ready:true, url:'maps/medieval2/index.html' },
    { key:'modern',     name:'근대',     period:'1876–1945', ready:true, url:'map.html' },
    { key:'modern2',    name:'근현대',   period:'1945–1993', ready:true, url:'maps/modern2/index.html' },
    { key:'contemporary',name:'현대',    period:'1994–현재', ready:true, url:'maps/contemporary/index.html' }
  ];

  function renderEraHub() {
    const grid = document.getElementById('eraHubGrid');
    if (!grid) return;
    grid.innerHTML = ERA_ITEMS.map(item => {
      const disabledClass = item.ready ? '' : ' disabled';
      const statusText = item.ready ? '입장 가능' : '준비 중';
      const statusClass = item.ready ? 'ready' : 'soon';
      const tag = item.ready ? 'a' : 'button';
      const hrefAttr = item.ready ? `href="${item.url}"` : `type="button"`;
      return `<${tag} class="era-card-item${disabledClass}" ${hrefAttr}>
        <span class="era-card-period">${item.period}</span>
        <span class="era-card-name">${item.name}</span>
        <span class="era-card-status ${statusClass}">${statusText}</span>
      </${tag}>`;
    }).join('');
  }

  function setupEraHub() {
    const eraHub = document.getElementById('eraHub');
    const eraHubScrim = document.getElementById('eraHubScrim');
    const eraHubClose = document.getElementById('eraHubClose');
    if (!eraHub) return;
    renderEraHub();
    window.openEraHub = function () {
      eraHub.classList.add('open');
      eraHubScrim?.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    window.closeEraHub = function () {
      eraHub.classList.remove('open');
      eraHubScrim?.classList.remove('open');
      document.body.style.overflow = '';
    };
    eraHubClose?.addEventListener('click', window.closeEraHub);
    eraHubScrim?.addEventListener('click', window.closeEraHub);
  }

  // ── 4. 자료실 허브 ── 지도들의 nav.js와 반드시 동일한 taxonomy.
  // content/archive/*.js가 window.registerArchiveSeries로 등록한다.
  const ARCHIVE_REGISTRY = {};
  window.registerArchiveSeries = function (seriesObj) {
    ARCHIVE_REGISTRY[seriesObj.id] = seriesObj;
  };

  const ARCHIVE_CATEGORIES = [
    { key: 'history', name: '역사', ready: true },
    { key: 'world_history', name: '세계사', ready: false },
  ];
  const ARCHIVE_SUBCATEGORIES = {
    history: [
      { subcat: 'revisionism', name: '역사왜곡', seriesIds: ['historical_revisionism'] },
      { subcat: 'era_study', name: '시대연구', seriesIds: ['power_accountability'] },
      { subcat: 'people_study', name: '인물연구', seriesIds: [] },
      { subcat: 'primary_sources', name: '사료읽기', seriesIds: [] },
    ],
  };
  const ARCHIVE_TYPE_LABEL = { political: '주장·반박', tragedy: '피해 사실', life: '조직·활동' };

  function archivePostUrl(series, post) {
    const slug = series.id.replace(/_/g, '-');
    return `archive/${slug}/${post.id}.html`; // 포털은 사이트 루트라 접두사 불필요.
  }

  function setupArchiveHub() {
    const archiveHub = document.getElementById('archiveHub');
    const archiveHubScrim = document.getElementById('archiveHubScrim');
    const archiveHubClose = document.getElementById('archiveHubClose');
    const archiveHubBack = document.getElementById('archiveHubBack');
    const archiveHubGrid = document.getElementById('archiveHubGrid');
    const archiveHubList = document.getElementById('archiveHubList');
    const archiveHubTitle = document.getElementById('archiveHubTitle');
    const archiveHubSub = document.getElementById('archiveHubSub');
    if (!archiveHub) return;

    let state = { level: 'category', categoryKey: null, subcat: null, seriesId: null };

    function renderCategoryCard(item) {
      const statusClass = item.ready ? 'ready' : 'soon';
      const statusText = item.ready ? '입장 가능' : '준비 중';
      const disabledClass = item.ready ? '' : ' disabled';
      return `<button type="button" class="era-card-item${disabledClass}" data-archive-category="${item.key}">
        <span class="era-card-name">${item.name}</span>
        <span class="era-card-status ${statusClass}">${statusText}</span>
      </button>`;
    }
    function renderSubcatCard(item) {
      const readyCount = (item.seriesIds || []).filter(id => !!ARCHIVE_REGISTRY[id]).length;
      const ready = readyCount > 0;
      const statusClass = ready ? 'ready' : 'soon';
      const statusText = ready ? `${readyCount}개 시리즈` : '준비 중';
      const disabledClass = ready ? '' : ' disabled';
      return `<button type="button" class="era-card-item${disabledClass}" data-archive-subcat="${item.subcat}">
        <span class="era-card-name">${item.name}</span>
        <span class="era-card-status ${statusClass}">${statusText}</span>
      </button>`;
    }
    function renderSeriesCard(seriesId) {
      const series = ARCHIVE_REGISTRY[seriesId];
      const ready = !!series;
      const statusClass = ready ? 'ready' : 'soon';
      const statusText = ready ? `${series.posts.length}편` : '준비 중';
      const disabledClass = ready ? '' : ' disabled';
      const name = series ? series.name : seriesId;
      return `<button type="button" class="era-card-item${disabledClass}" data-series-id="${seriesId}">
        <span class="era-card-name">${name}</span>
        <span class="era-card-status ${statusClass}">${statusText}</span>
      </button>`;
    }
    function renderPostRow(post, series) {
      const typeLabel = ARCHIVE_TYPE_LABEL[post.type] || post.type;
      const dateStr = post.year + (post.month ? `.${String(post.month).padStart(2, '0')}` : '');
      const bodyText = post.format === 'narrative' ? (post.body_ko || '') : (post.claim_ko || '');
      const shortSummary = bodyText.length > 72 ? bodyText.slice(0, 72) + '…' : bodyText;
      const href = archivePostUrl(series, post);
      return `<a class="archive-list-item" href="${href}">
        <span class="archive-item-badge">${typeLabel}</span>
        <span class="archive-item-body">
          <span class="archive-item-title">${post.title_ko}</span>
          <span class="archive-item-meta">${dateStr} · ${post.place_ko || ''}</span>
          <span class="archive-item-summary">${shortSummary}</span>
        </span>
      </a>`;
    }

    function render() {
      if (state.level === 'category') {
        if (archiveHubBack) archiveHubBack.hidden = true;
        if (archiveHubTitle) archiveHubTitle.textContent = '자료실';
        if (archiveHubSub) archiveHubSub.textContent = '대한민국 역사와 세계사를 기록하는 라이브러리';
        archiveHubGrid.hidden = false; archiveHubList.hidden = true;
        archiveHubGrid.innerHTML = ARCHIVE_CATEGORIES.map(renderCategoryCard).join('');
      } else if (state.level === 'subcategory') {
        const cat = ARCHIVE_CATEGORIES.find(c => c.key === state.categoryKey);
        if (archiveHubBack) archiveHubBack.hidden = false;
        if (archiveHubTitle) archiveHubTitle.textContent = cat ? cat.name : '자료실';
        if (archiveHubSub) archiveHubSub.textContent = '주제를 선택하세요';
        archiveHubGrid.hidden = false; archiveHubList.hidden = true;
        archiveHubGrid.innerHTML = (ARCHIVE_SUBCATEGORIES[state.categoryKey] || []).map(renderSubcatCard).join('');
      } else if (state.level === 'serieslist') {
        const subs = ARCHIVE_SUBCATEGORIES[state.categoryKey] || [];
        const sub = subs.find(s => s.subcat === state.subcat);
        if (archiveHubBack) archiveHubBack.hidden = false;
        if (archiveHubTitle) archiveHubTitle.textContent = sub ? sub.name : '자료실';
        if (archiveHubSub) archiveHubSub.textContent = '시리즈를 선택하세요';
        archiveHubGrid.hidden = false; archiveHubList.hidden = true;
        const seriesIds = sub ? (sub.seriesIds || []) : [];
        archiveHubGrid.innerHTML = seriesIds.length
          ? seriesIds.map(renderSeriesCard).join('')
          : '<div class="archive-empty">아직 준비된 시리즈가 없습니다.</div>';
      } else if (state.level === 'postlist') {
        const series = ARCHIVE_REGISTRY[state.seriesId];
        if (archiveHubBack) archiveHubBack.hidden = false;
        if (archiveHubTitle) archiveHubTitle.textContent = series ? series.name : '자료실';
        if (archiveHubSub) archiveHubSub.textContent = series ? (series.tagline || '') : '';
        archiveHubGrid.hidden = true; archiveHubList.hidden = false;
        archiveHubList.innerHTML = series
          ? series.posts.map(p => renderPostRow(p, series)).join('')
          : '<div class="archive-empty">아직 준비된 글이 없습니다.</div>';
      }
    }

    window.openArchiveHub = function () {
      state = { level: 'category', categoryKey: null, subcat: null, seriesId: null };
      render();
      archiveHub.classList.add('open');
      archiveHubScrim?.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    window.closeArchiveHub = function () {
      archiveHub.classList.remove('open');
      archiveHubScrim?.classList.remove('open');
      document.body.style.overflow = '';
    };
    archiveHubClose?.addEventListener('click', window.closeArchiveHub);
    archiveHubScrim?.addEventListener('click', window.closeArchiveHub);
    archiveHubBack?.addEventListener('click', () => {
      if (state.level === 'postlist') state = { level: 'serieslist', categoryKey: state.categoryKey, subcat: state.subcat, seriesId: null };
      else if (state.level === 'serieslist') state = { level: 'subcategory', categoryKey: state.categoryKey, subcat: null, seriesId: null };
      else if (state.level === 'subcategory') state = { level: 'category', categoryKey: null, subcat: null, seriesId: null };
      render();
    });
    archiveHubGrid?.addEventListener('click', (e) => {
      const btn = e.target.closest('.era-card-item');
      if (!btn || btn.classList.contains('disabled')) return;
      if (state.level === 'category') {
        const item = ARCHIVE_CATEGORIES.find(it => it.key === btn.dataset.archiveCategory);
        if (!item || !item.ready) return;
        state = { level: 'subcategory', categoryKey: item.key, subcat: null, seriesId: null };
        render();
      } else if (state.level === 'subcategory') {
        const subs = ARCHIVE_SUBCATEGORIES[state.categoryKey] || [];
        const item = subs.find(it => it.subcat === btn.dataset.archiveSubcat);
        const readyCount = item ? (item.seriesIds || []).filter(id => !!ARCHIVE_REGISTRY[id]).length : 0;
        if (!item || readyCount === 0) return;
        state = { level: 'serieslist', categoryKey: state.categoryKey, subcat: item.subcat, seriesId: null };
        render();
      } else if (state.level === 'serieslist') {
        const seriesId = btn.dataset.seriesId;
        if (!seriesId || !ARCHIVE_REGISTRY[seriesId]) return;
        state = { level: 'postlist', categoryKey: state.categoryKey, subcat: state.subcat, seriesId };
        render();
      }
    });
  }

  // ── 자료실 둘러보기 ── 가짜 예시가 아니라 실제 등록된 글 중 하나를
  // 보여준다(오늘의 특집과 같은 로테이션 원리 — 날짜 시드로 결정론적
  // 순환). 인물카드(§5)·루트 데이터는 포털에 안 로드돼 있어서 지금은
  // 자료실 글만 다룬다 — "추천 사건·인물·루트"까지 채우려면 그 데이터도
  // 포털에 불러와야 하니 다음 단계로 남긴다.
  function renderExplore() {
    const el = document.getElementById('portalExplore');
    if (!el) return;
    const allPosts = [];
    Object.values(ARCHIVE_REGISTRY).forEach(series => {
      series.posts.forEach(post => allPosts.push({ post, series }));
    });
    if (!allPosts.length) { el.innerHTML = ''; return; }
    // ── 고정 노출(핀) ── 원래는 주차 시드로 전체 글을 순환하는데, 이번에
    // 그 순환이 지금 시점과 안 맞는 글(이명박 관련)을 골라 보여준 게
    // 발견됐다. 완전한 순환 로직을 새로 짜기보다, "5·18 북한군 개입설"
    // (뉴라이트의 역사왜곡을 반박하는 시리즈의 글)을 우선 노출하도록
    // 핀을 걸었다 — 찾으면 그 글을, 못 찾으면(데이터 구조가 바뀌는 등)
    // 기존 주차 순환으로 안전하게 되돌아간다.
    const pinned = allPosts.find(({ post, series }) =>
      series.id === 'historical_revisionism' && post.id === 'wp_05'
    );
    let chosen;
    if (pinned) {
      chosen = pinned;
    } else {
      const week = getISOWeek(new Date()) + new Date().getFullYear() * 53;
      chosen = allPosts[week % allPosts.length];
    }
    const { post, series } = chosen;
    const href = archivePostUrl(series, post);
    const summary = (post.body_ko || post.claim_ko || '').slice(0, 90) + '…';
    el.innerHTML = `
      <a class="portal-explore-card" href="${href}">
        <span class="portal-explore-badge">${series.name}</span>
        <div class="portal-explore-title">${post.title_ko}</div>
        <div class="portal-explore-desc">${summary}</div>
      </a>`;
  }

  function setupInfoModal() {
    const modal = document.getElementById('infoModal');
    const scrim = document.getElementById('infoModalScrim');
    const close = document.getElementById('infoModalClose');
    if (!modal) return;
    function open() { modal.classList.add('open'); scrim?.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function shut() { modal.classList.remove('open'); scrim?.classList.remove('open'); document.body.style.overflow = ''; }
    document.getElementById('portalOpenInfo')?.addEventListener('click', open);
    close?.addEventListener('click', shut);
    scrim?.addEventListener('click', shut);
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderFeatured();
    renderStats();
    renderRoutes();
    setupEraHub();
    setupArchiveHub();
    setupInfoModal();
    renderExplore();

    document.getElementById('portalOpenMap')?.addEventListener('click', (e) => {
      e.preventDefault();
      window.openEraHub();
    });
    document.getElementById('portalOpenArchive')?.addEventListener('click', (e) => {
      e.preventDefault();
      window.openArchiveHub();
    });
    document.getElementById('portalQuickMap')?.addEventListener('click', (e) => {
      e.preventDefault();
      window.openEraHub();
    });
    document.getElementById('portalQuickArchive')?.addEventListener('click', (e) => {
      e.preventDefault();
      window.openArchiveHub();
    });
    document.getElementById('portalQuickInfo')?.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('infoModalScrim')?.classList.add('open');
      document.getElementById('infoModal')?.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

})();

