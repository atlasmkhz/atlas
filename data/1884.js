// data/1884.js — 1884년 사건 데이터
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1884.js"></script> 로 불립니다.

const EVENTS_1884 = [

  { id:'political_1884_02', year:1884, visible_from:1883, visible_until:1884,
    month:null, day:null, type:'political', priority:2,
    title_ko:'민씨 척족의 요직 독점 — 갑신정변의 동기',
    title_en:'The Min Clan\'s Monopoly on High Office',
    title_ja:'閔氏一族による要職独占',
    place_ko:'한성',
    lat:37.575, lng:126.978,
    people:['명성황후','민영익','민태호'],
    summary_ko:'임오군란 이후 청의 후원을 등에 업은 민씨 척족은 군권과 재정, 외교를 가리지 않고 요직을 독점했다. 민영익은 보빙사로 미국에 다녀온 뒤에도 친청 노선을 고수하며 척족 권력의 중심에 섰고, 민태호 등 다른 민씨 인사들도 조정 곳곳을 채웠다. 김옥균·박영효 등 급진 개화파는 같은 개화 노선을 걷는다고 자처했지만, 인사와 정책의 실권은 끝내 척족의 손에 있었다. 자주적 근대화를 향한 길이 한 가문의 권력 독점에 막혀 있다는 인식이 깊어지면서, 급진 개화파는 점차 정변이라는 극단적 수단을 모색하게 되었다.',
    video:null,
    connections:['political_1882_04','plot_1884_01'],
    tags:['political','경성','민씨척족','민영익','갑신정변','개화파'],
    sources:['한국민족문화대백과사전 갑신정변','위키백과 갑신정변'] },

  { id:'plot_1884_01', year:1884, visible_from:1884, visible_until:1884,
    month:11, day:4, type:'plot', priority:1,
    title_ko:'갑신정변 — 사흘 천하',
    title_en:'The Gapsin Coup',
    title_ja:'甲申政変',
    place_ko:'한성 (우정총국)',
    lat:37.572, lng:126.985,
    people:['김옥균','박영효','서재필','명성황후'],
    summary_ko:'임오군란 이후 청의 간섭이 심해지자, 김옥균·박영효·서광범·서재필 등 급진 개화파는 청의 그늘에서 벗어나 자주적 근대 국가를 세우려 했다. 1884년 12월 4일, 이들은 우정총국 개국 축하연을 틈타 정변을 일으키고 새 정부를 세워 신분제 폐지·조세 개혁 등을 담은 14개조 정령을 내걸었다. 그러나 의지했던 일본의 지원은 약했고, 명성황후의 요청으로 출동한 청군 앞에 정변은 사흘 만에 무너졌다. 김옥균 등은 일본으로 망명했다. 위로부터의 급진 개혁이 외세에 기댄 채 좌절되면서, 개화의 길은 더욱 험난해졌다. 이들은 위로부터의 급진적 개화를 단숨에 밀어붙이려 했으나, 일본에 의존한 개혁은 그 자체로 한계를 안고 있었다. 또한 백성과 보수 세력의 폭넓은 지지를 얻지 못한 급진 노선은 거센 정치적 반발에 부딪혔다.',
    video:null,
    connections:['political_1882_01','policy_1883_01','political_1885_01','political_1884_02'],
    tags:['plot','경성','갑신정변','김옥균','박영효','급진개화파'],
    sources:['위키백과 갑신정변','금성출판사 갑신정변'],
    content:{ hero:{"url": "assets/images/entity/event/event_plot_1884_01_01.webp", "alt": "갑신정변 — 사흘 천하", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "event"}, gallery:[{"url": "assets/images/entity/person/person_park_yeong_hyo_01.webp", "alt": "박영효", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "portrait"}, {"url": "assets/images/entity/person/person_kim_ok_gyun_01.webp", "alt": "김옥균", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "portrait"}] } }

];
