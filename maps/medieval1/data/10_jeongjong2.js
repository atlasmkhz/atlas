// data/10_jeongjong2.js — 정종(靖宗) 재위 (1034~1046)
// 주의: 3대 정종(定宗, 945~949)과 이름 발음이 같은 다른 왕(10대, 靖宗).
// 변수명을 EVENTS_JEONGJONG2로 구분해 03_jeongjong.js(定宗)와 충돌을 피한다.
const EVENTS_JEONGJONG2 = [
  { id:'political_1034_01', year:1034, visible_from:1034, visible_until:1034,
    month:9, day:null, type:'political', priority:2,
    title_ko:'정종(靖宗) 즉위',
    title_en:'Enthronement of King Jeongjong (Jeongjong II)',
    title_ja:'靖宗即位',
    place_ko:'개경',
    lat:37.9707, lng:126.5615,
    people:['정종','덕종'],
    summary_ko:'덕종이 후사 없이 일찍 세상을 떠나자 동생이 뒤를 이어 정종(靖宗)으로 즉위했다. 3대 왕 정종(定宗)과 한글 발음은 같지만 한자가 다른 별개의 인물로, 형이 시작한 천리장성 축조 사업을 이어받아 완성하는 것이 그의 치세의 가장 중요한 과제가 됐다.',
    video:null,
    connections:['political_1031_01'],
    tags:['political','개경','정종','즉위','덕종'],
    sources:['한국민족문화대백과사전 정종(고려, 靖宗)'] },

  { id:'policy_1044_01', year:1044, visible_from:1044, visible_until:1046,
    month:null, day:null, type:'policy', priority:1,
    title_ko:'천리장성 완성',
    title_en:'Completion of the Cheolli Jangseong Wall',
    title_ja:'千里長城完成',
    place_ko:'함경 도련포',
    lat:41.0, lng:129.5,
    people:['정종'],
    summary_ko:'덕종 대에 시작된 천리장성 축조는 정종(靖宗) 대에 이르러 압록강 하구에서 동해안 도련포까지 이어지는 전 구간이 완성됐다. 10여 년에 걸친 이 대역사로 고려는 북방 국경 전체를 아우르는 항구적인 방어선을 확보했고, 이는 이후 한 세기 가까이 북방의 안정을 지키는 데 크게 기여했다. 천리장성 완성은 거란과의 강화, 여진에 대한 회유·강경책과 더불어 11세기 고려가 누린 대외적 안정의 물리적 기반이 됐다.',
    video:null,
    connections:['policy_1033_01'],
    tags:['policy','함경','천리장성','정종','완성'],
    sources:['한국민족문화대백과사전 천리장성'] }
];
