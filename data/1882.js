// data/1882.js — 1882년 사건 데이터
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1882.js"></script> 로 불립니다.

const EVENTS_1882 = [

  { id:'political_1882_03', year:1882, visible_from:1882, visible_until:1882,
    month:6, day:null, type:'political', priority:2,
    title_ko:'선혜청의 부패와 민겸호 — 군란의 불씨',
    title_en:'Corruption at the Sonhyecheong and Min Gyeom-ho',
    title_ja:'宣惠庁の腐敗と閔謙鎬',
    place_ko:'한성 (선혜청)',
    lat:37.566, lng:126.975,
    people:['민겸호'],
    summary_ko:'구식 군인의 급료를 관리하던 선혜청의 책임자는 민씨 척족의 핵심 인물 민겸호였다. 13개월이나 밀린 급료를 겨우 한 달치 쌀로 지급하면서도, 그 쌀에 겨와 모래를 섞어 무게만 채운 것은 선혜청 창고지기의 횡령이었지만, 그 구조를 방치하고 묵인한 책임은 민겸호에게 있었다. 별기군에는 풍족한 대우를 베풀면서 구식 군인은 굶기는 차별이 같은 시기 한 손에서 결정되고 있었다. 분노한 군인들은 민겸호의 집으로 몰려가 그를 죽이고 집을 불태웠다. 매관매직과 척족 정치가 켜켜이 쌓아온 부패가, 가장 가까운 권력자의 목숨을 거두며 터져 나온 순간이었다.',
    video:null,
    connections:['political_1880_02','political_1882_01'],
    tags:['political','경성','선혜청','민겸호','임오군란','부정부패','민씨척족'],
    sources:['한국민족문화대백과사전 임오군란','우리역사넷 임오군란'] },

  { id:'political_1882_01', year:1882, visible_from:1882, visible_until:1884,
    month:6, day:null, type:'movement', priority:1,
    title_ko:'임오군란 — 구식 군인의 봉기',
    title_en:'The Imo Mutiny',
    title_ja:'壬午軍乱',
    place_ko:'한성',
    lat:37.566, lng:126.978,
    people:['흥선대원군'],
    summary_ko:'1882년 6월, 13개월이나 급료가 밀린 구식 군인들에게 지급된 쌀에 겨와 모래가 섞여 있었다. 별기군과의 차별에 쌓인 분노가 폭발해, 구식 군인들이 봉기했다. 이들은 별기군 일본인 교관을 죽이고 일본공사관과 궁궐을 습격했으며, 명성황후는 피신했다. 위정척사파와 군인들의 추대로 흥선대원군이 다시 권력을 잡았다. 그러나 명성황후가 청에 도움을 청하자, 청군이 들어와 대원군을 톈진으로 압송하고 군란을 진압했다. 이 사건으로 조선의 내정은 청의 노골적인 간섭 아래 놓이게 되었다.',
    video:null,
    connections:['organization_1881_01','political_1882_02','political_1882_03','political_1882_04','plot_1884_01'],
    tags:['movement','경성','임오군란','흥선대원군','구식군인','청'],
    sources:['우리역사넷 임오군란','위키백과 갑신정변'],
    content:{ hero:{"url": "assets/images/entity/event/event_political_1882_01_01.webp", "alt": "임오군란 — 구식 군인의 봉기", "caption": "", "credit": "AI 생성 이미지", "is_ai": true, "source_type": "generated", "image_type": "event"}, gallery:[] } },

  { id:'political_1882_04', year:1882, visible_from:1882, visible_until:1884,
    month:7, day:null, type:'political', priority:2,
    title_ko:'청군의 개입과 민씨 정권의 재집권',
    title_en:'Qing Intervention and the Restoration of the Min Regime',
    title_ja:'清軍の介入と閔氏政権の復権',
    place_ko:'한성 / 톈진',
    lat:37.566, lng:126.978,
    people:['명성황후'],
    summary_ko:'임오군란으로 흥선대원군이 잠시 권력을 되찾았지만, 명성황후의 요청으로 들어온 청군이 그를 톈진으로 압송하면서 권력은 다시 민씨 척족에게 돌아갔다. 그러나 이번에는 청의 군대가 한성에 상주하고 위안스카이가 조선의 내정에 직접 간여하는, 한층 더 굴욕적인 형태의 복귀였다. 민씨 정권은 권력을 되찾는 대가로 청에 대한 의존을 한층 심화시켰고, 이는 곧 청의 그늘에서 벗어나려는 급진 개화파의 반발을 키워 1884년 갑신정변으로 이어지는 불씨가 되었다. 척족 정치의 생존이, 나라의 자주성과 점점 더 멀어지는 방식으로 이어지고 있었다.',
    video:null,
    connections:['political_1882_01','plot_1884_01'],
    tags:['political','경성','민씨척족','청','위안스카이','임오군란'],
    sources:['한국민족문화대백과사전 임오군란','위키백과 임오군란'] },

  { id:'political_1882_02', year:1882, visible_from:1882, visible_until:1884,
    month:4, day:null, type:'political', priority:2,
    title_ko:'조미수호통상조약 — 서양과의 첫 수교',
    title_en:'The Korea–US Treaty of 1882',
    title_ja:'米朝修好通商条約',
    place_ko:'제물포 (화도진)',
    lat:37.467, lng:126.617,
    people:['김홍집'],
    summary_ko:'1882년 4월(음력), 조선은 청의 주선으로 미국과 조미수호통상조약을 맺었다. 강화도조약이 일본을 통한 간접적 편입이었다면, 이 조약은 조선이 서양 국가와 처음으로 직접 수교한 사건이었다. 『조선책략』의 연미론이 현실이 된 것이다. 관세 조항이 처음으로 설정되고, 한쪽이 어려울 때 돕는다는 거중조정 조항도 담겼다. 이를 시작으로 영국·독일 등과도 잇따라 조약이 맺어지며, 조선은 본격적으로 근대 국제질서에 편입되었다. 고종은 신미양요 때 세웠던 척화비를 거두라 명했다.',
    video:null,
    connections:['political_1882_01','policy_1880_01'],
    tags:['political','인천','조미수호통상조약','수교','개항','연미론'],
    sources:['우리역사넷 김홍집','위키백과 강화도 조약'] }

];
