// data/1912.js — 1912년 사건 데이터
// 기억의 연대기 (Chronicle of Memory)
// 이 파일은 index.html에서 <script src="data/1912.js"></script> 로 불립니다.

const EVENTS_1912 = [

  { id:'policy_1912_01', year:1912, visible_from:1912, visible_until:1912,
    month:7, day:13, type:'policy', priority:2,
    title_ko:'토지조사령 공포',
    title_en:'Promulgation of the Land Survey Ordinance',
    title_ja:'土地調査令公布',
    place_ko:'조선총독부 (경성)',
    lat:37.575, lng:126.977,
    people:[],
    summary_ko:'1912년 8월 일제는 토지조사령을 공포해 1910년부터 진행해온 토지조사사업에 법적 틀을 부여했다. 토지 소유자가 조선총독이 정한 기간 내에 주소·성명과 토지 소재·지목·면적 등을 임시토지조사국장에게 직접 신고하도록 의무화한 것이다. 이 기한부 신고제 아래에서 지주의 근대적 소유권은 강화된 반면, 농민들이 대대로 누려온 관습적 경작권은 인정되지 않았다. 신고 절차를 모르거나 놓친 농민의 땅은 합법의 외피를 쓴 채 수탈됐다.',
    video:null,
    connections:['policy_1910_03'],
    tags:['policy','조선국내','경성','토지조사령','경제수탈'],
    sources:['한국사 토지조사사업','한국민족문화대백과사전 일제강점기'] },

  { id:'policy_1912_02', year:1912, visible_from:1912, visible_until:1920,
    month:2, day:18, type:'policy', priority:1,
    impact_type:'repression', violence_level:3, victim_group:['civilians'],
    title_ko:'조선태형령 시행 — 일상 속의 신체형',
    title_en:'The Joseon Flogging Ordinance',
    title_ja:'朝鮮笞刑令の施行',
    place_ko:'조선총독부 (경성)',
    lat:37.575, lng:126.977,
    people:[],
    summary_ko:'1912년 3월 18일 공포되고 4월 1일부터 시행된 조선태형령은 조선인에게만 적용된 신체형 제도였다. 3개월 이하의 징역이나 구류에 처할 자는 그 정상에 따라 매로 볼기를 치는 태형으로 대신할 수 있게 했는데, 일본 국내에서는 이미 폐지된 형벌이 식민지 조선에만 남겨진 것이었다. 헌병경찰의 즉결처분권과 결합해, 정식 재판이나 변호 절차 없이 헌병분대·경찰서에서 그 자리에서 매질이 집행되는 경우가 많았다. 가벼운 위반(도박, 행상 무허가, 산림 훼손 등)에도 태형이 부과돼, 식민지 조선인의 일상은 언제든 매를 맞을 수 있다는 공포 아래 놓였다. 3·1운동의 폭발적 저항에 부딪힌 일제는 1920년 4월 1일 이 제도를 폐지하지만, 그 폐지조차 "문화정치"로의 전환을 선전하기 위한 명분에 가까웠다.',
    video:null,
    connections:['policy_1910_04'],
    tags:['policy','조선국내','경성','조선태형령','무단통치','신체형'],
    sources:['우리역사넷 조선태형령','나무위키 조선태형령'] },
  { id:'organization_1912_01', year:1912, visible_from:1912, visible_until:1914,
    month:8, day:null, type:'organization', priority:2,
    title_ko:'대한독립의군부 조직',
    title_en:'Formation of the Korean Restoration Army Government',
    title_ja:'大韓独立義軍府の組織',
    place_ko:'조선 국내 (전라도 일대)',
    lat:35.82, lng:127.15,
    people:['임병찬'],
    summary_ko:'고종의 밀명을 받은 의병장 임병찬은 1912년 전국의 의병과 유생을 규합해 대한독립의군부를 조직했다. 이들은 일본 정부와 총독에게 국권 반환을 요구하는 서신을 보내고 전국적 의병 봉기를 계획했다. 그러나 빼앗긴 나라를 되찾되 대한제국과 고종의 복위를 목표로 한 복벽주의(復辟主義) 노선이었다는 점에서, 공화제를 지향한 후대의 독립운동과 구별된다. 1914년 조직이 발각되어 임병찬이 체포되면서 와해됐지만, 1910년대 국내 비밀결사 운동의 한 갈래로 기록된다.',
    video:null,
    connections:[],
    tags:['organization','조선국내','전라도','대한독립의군부','임병찬','복벽주의'],
    sources:['나무위키 대한광복회','한국민족문화대백과사전'],
    content:{ hero:{"url": "assets/images/entity/person/person_im_byeong_chan_01.webp", "alt": "임병찬", "caption": "", "credit": "", "is_ai": false, "source_type": "archive", "image_type": "portrait"}, gallery:[] } }

];
