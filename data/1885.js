// data/1885.js — 1885년 사건 데이터
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1885.js"></script> 로 불립니다.

const EVENTS_1885 = [

  { id:'political_1885_01', year:1885, visible_from:1885, visible_until:1886,
    month:4, day:18, type:'political', priority:1,
    title_ko:'톈진조약 — 두 제국의 약속',
    title_en:'The Convention of Tientsin',
    title_ja:'天津条約',
    place_ko:'톈진 / 한성',
    lat:37.566, lng:126.978,
    people:[],
    summary_ko:'갑신정변에서 청과 일본의 군대가 조선 땅에서 충돌하자, 두 나라는 1885년 톈진에서 조약을 맺었다. 양국이 조선에서 군대를 모두 철수하고, 앞으로 조선에 파병할 때는 서로 미리 알린다는 내용이었다. 표면적으로는 충돌을 막는 합의였지만, 실제로는 두 제국이 조선을 공동으로 관리하는 체제를 만든 것이었다. 조선의 운명을 두고 청과 일본이 대등하게 마주 앉은 이 약속은, 9년 뒤 동학농민운동 때 두 나라가 함께 군대를 보내 청일전쟁으로 치닫는 빌미가 된다. 작은 조항 하나에, 다음 전쟁의 씨앗이 심겨 있었다.',
    video:null,
    connections:['plot_1884_01','movement_1893_01','international_1885_02'],
    tags:['political','경성','톈진조약','청일','파병','균형'],
    sources:['금성출판사 갑신정변','위키백과 톈진 조약'] },

  { id:'international_1885_02', year:1885, visible_from:1885, visible_until:1887,
    month:4, day:null, type:'diplomacy', priority:1,
    title_ko:'거문도 사건',
    title_en:'The Geomundo Incident',
    title_ja:'巨文島事件',
    place_ko:'거문도',
    lat:34.028, lng:127.308,
    people:[],
    summary_ko:'1885년 영국 해군이 조선의 허락도 없이 남해의 작은 섬 거문도를 점령했다. 당시 영국은 중앙아시아와 한반도 일대에서 남하하는 러시아를 견제하려 했고, 러시아 함대의 길목에 있는 거문도를 군사 거점으로 삼으려 한 것이다. 영국은 섬에 포대와 병영을 세우고 약 2년간 점령을 이어갔다. 조선은 청을 통해 항의했으나 힘이 없었고, 결국 러시아가 조선 영토를 점령하지 않겠다고 약속하면서 1887년 영국군이 물러났다. 조선의 영토가 조선의 의사와 무관하게 열강의 세력 다툼의 무대가 된 사건으로, 한반도를 둘러싼 제국주의 열강의 경쟁 구조를 적나라하게 드러냈다.',
    video:null,
    connections:['political_1885_01'],
    tags:['international','거문도','영국','러시아','열강'],
    sources:['한국민족문화대백과사전 거문도사건','우리역사넷 거문도사건'] }

];
