// data/01_taejo.js — 태조(이성계) 재위 (1392~1398) 시드 데이터
// 왕 단위 파일 구조 시범 — 이 파일 하나가 app.js에서 자동으로 연도별로
// 재편성된다. 새 왕의 카드를 추가할 때는 이 파일과 같은 구조로
// data/NN_이름.js를 만들고 index.html에 <script> 한 줄, app.js의
// DATA 조립 배열에 EVENTS_이름 한 줄을 추가하면 된다.
const EVENTS_TAEJO = [
  { id:'political_1392_01', year:1392, visible_from:1392, visible_until:1392,
    month:6, day:17, type:'political', priority:1,
    title_ko:'조선 건국 — 이성계 즉위',
    title_en:'Founding of Joseon — Yi Seong-gye Enthroned',
    title_ja:'朝鮮建国 — 李成桂即位',
    place_ko:'개경(수창궁)',
    lat:37.9707, lng:126.5615,
    people:['이성계'],
    summary_ko:'1388년 위화도 회군으로 실권을 잡은 이성계는 우왕·창왕을 잇달아 폐위시키고 공양왕을 세웠으나, 1392년 7월 17일 개경 수창궁에서 공양왕을 폐위하고 스스로 왕위에 올라 새 왕조를 열었다. 국호는 이듬해 명나라의 승인을 받아 고조선을 잇는다는 뜻의 "조선"으로 정해졌다. 정도전 등 신진 유학자 세력의 지지를 받은 이성계는 불교 중심의 고려 체제를 대신해 유교적 통치 이념을 표방했다.',
    video:null,
    connections:['economic_1392_02'],
    tags:['political','개경','이성계','조선건국','위화도회군'],
    sources:['한국민족문화대백과사전 태조','위키백과 태조(조선)'] },

  { id:'economic_1392_02', year:1394, visible_from:1394, visible_until:1394,
    month:null, day:null, type:'economic', priority:2,
    title_ko:'한양 천도',
    title_en:'Relocation of the Capital to Hanyang',
    title_ja:'漢陽遷都',
    place_ko:'한양(서울)',
    lat:37.5760, lng:126.9769,
    people:['이성계','정도전'],
    summary_ko:'태조는 개경 구세력의 영향에서 벗어나고 풍수적으로도 유리한 새 도읍이 필요하다고 판단해, 1394년 한양(지금의 서울)으로 천도를 결정했다. 정도전이 도성 설계를 주도해 경복궁을 중심으로 종묘·사직을 배치하고 유교적 질서에 따라 도시 구조를 짰다. 이 결정으로 한양은 이후 500년 넘게 조선의 수도로 기능했다.',
    video:null,
    connections:['political_1392_01'],
    tags:['economic','한양','천도','정도전','경복궁'],
    sources:['한국민족문화대백과사전 한양 천도'] }
];
