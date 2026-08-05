#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
gen_memorial_series.py — 「기억의 뜰」 자료실 시리즈 생성기.

data/memorial_garden_events.js(단일 원본)를 읽어
content/archive/memorial_garden.js를 생성한다.

왜 생성 방식인가: 명패 문안(요약·규모·기억의 현재·헌사)이 분포도와
자료실 두 곳에 있는데, 손으로 두 벌을 관리하면 반드시 어긋난다.
이 주제에서 문안의 어긋남은 단순 버그가 아니라 결례다. 그래서
원본은 하나(data/), 자료실은 파생물로 둔다.

문안을 고칠 때: data/memorial_garden_events.js를 고치고
  python3 build/gen_memorial_series.py
  python3 build/generate_archive_pages.py
  python3 build/generate_unified_sitemap.py
순서로 다시 돌린다.

주의: 이 시리즈에는 updated 필드를 넣지 않는다 — 기억의 뜰 원칙에
따라 NEW 배지를 포함한 게임화 요소를 전부 제외하기 때문이다.
"""
import json
import os
import subprocess

BUILD_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(BUILD_DIR)
SRC = os.path.join(ROOT, 'data', 'memorial_garden_events.js')
OUT = os.path.join(ROOT, 'content', 'archive', 'memorial_garden.js')

ZONE_NUM = {'struggle': 1, 'duty': 2, 'violence': 3, 'disaster': 4}

def load_data():
    node = (
        "global.window = {};"
        f"require({json.dumps(SRC)});"
        "process.stdout.write(JSON.stringify(window.MEMORIAL_GARDEN));"
    )
    out = subprocess.run(['node', '-e', node], capture_output=True, text=True, check=True)
    return json.loads(out.stdout)

def js_str(s):
    return json.dumps(s, ensure_ascii=False)

def main():
    D = load_data()
    zones, events = D['zones'], D['events']

    posts = []
    for ev in events:
        z = zones[ev['zone']]
        zone_label = f"제{ZONE_NUM[ev['zone']]}구역 · {z['label']}"
        body = (
            f"{ev['summary']}\\n\\n"
            f"【규모】 {ev['scale']}\\n\\n"
            f"【기억의 현재】 {ev['memory']}\\n\\n"
            f"【헌사】 {ev['tribute']}"
        )
        related_events = [
            "          { title:'기억의 뜰 분포도 — 지도에서 시간을 끌어 보기', url:'../../memorial_garden.html' },"
        ]
        if ev.get('archive_link'):
            al = ev['archive_link']
            related_events.append(
                f"          {{ title:{js_str(al['title'])}, url:{js_str('../../' + al['url'])} }},"
            )
        src = ev.get('source') or {}
        posts.append(f"""
    // ── {zone_label} ─ {ev['name']} ─
    {{
      id: {js_str(ev['id'])},
      type: 'event',
      format: 'narrative',
      year: {ev['year']}, month: null, day: null,
      title_ko: {js_str(ev['name'] + ' (' + ev['period'] + ')')},
      place_ko: {js_str(ev['place'])},
      lat: {ev['lat']}, lng: {ev['lng']},
      card_ref: null, card_map: null,
      body_ko: {js_str(body)},
      claim_ko: null,
      rebuttal_ko: null,
      sources: [
        {{ type:'government', name:{js_str(src.get('name', ''))}, publisher:{js_str(src.get('name', ''))}, author:'', year:'', url:{js_str(src.get('url', ''))} }},
      ],
      related: {{
        events: [
{chr(10).join(related_events)}
        ],
      }},
    }},""")

    header = """// content/archive/memorial_garden.js
// 자료실(Archive) > 역사(history) > 기억의 뜰(memorial_garden)
//
// ⚠️ 이 파일은 손으로 고치지 않는다.
// 원본은 data/memorial_garden_events.js이며, 이 파일은
// build/gen_memorial_series.py가 생성한다. 명패 문안을 고칠 때는
// 반드시 원본을 고치고 생성 스크립트를 다시 돌릴 것 — 분포도와
// 자료실의 문안이 어긋나는 것은 이 공간에서는 결례이기 때문이다.
//
// 이 시리즈의 예외 규칙: updated 필드를 두지 않는다(NEW 배지 제외).
// 명패는 조용해야 한다.

const ARCHIVE_SERIES_MEMORIAL_GARDEN = {
  id: 'memorial_garden',
  name: '기억의 뜰',
  full_name: '기억의 뜰 — 이 땅에서 목숨을 잃은 분들을 기억합니다',
  category: 'history',
  subcategory: 'memorial_garden',
  period: '1894~현재',
  tagline: '항쟁과 순직과 국가폭력과 참사 — 네 개의 구역, 서른여덟 개의 명패. 감사라는 말은 스스로 바치신 분들께만 쓰고, 빼앗기신 분들께는 애도와 진실의 기록을 남긴다',
  color: '#b89860',
  hero_image: null,

  posts: ["""

    footer = """
  ],
};

if (typeof window !== 'undefined' && typeof window.registerArchiveSeries === 'function') {
  window.registerArchiveSeries(ARCHIVE_SERIES_MEMORIAL_GARDEN);
}
"""

    with open(OUT, 'w', encoding='utf-8') as f:
        f.write(header + ''.join(posts) + footer)
    print(f'기억의 뜰 시리즈 생성 완료: 명패 {len(posts)}개 -> {OUT}')

if __name__ == '__main__':
    main()
