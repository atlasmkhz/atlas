# -*- coding: utf-8 -*-
"""
generate_search_index.py — 7개 지도 전체를 아우르는 경량 통합 검색 인덱스를
빌드타임에 생성한다.

배경 (2026-07-25): 검색이 "현재 로드된 지도의 DATA"만 훑기 때문에, 시대를
모르고 검색하면(예: 현대 지도에서 "안종삼" 검색 → 실제로는 근현대/modern2
소속) 결과 없음으로 나오는 문제가 있었다. 7개 지도가 완전히 독립된 정적
페이지(별도 DATA)라 런타임에 서로의 데이터를 로드할 수 없으므로, 빌드타임에
전체를 훑어 최소 필드만 담은 인덱스 하나를 만들고 이를 7개 지도 모두에
동일하게 복사한다 — archive_backlinks.js와 동일한 배포 패턴.

원칙:
  - 각 지도의 data/*.js를 Source of Truth로 그대로 사용(중복 관리 없음).
    이 스크립트는 파생 인덱스만 만들고, 원본 데이터는 건드리지 않는다.
  - 슬러그는 새로 계산하지 않는다 — 이미 생성된 event/*.html 파일명을
    id -> slug 매핑으로 그대로 사용한다(각 지도마다 슬러그 알고리즘이
    조금씩 달라 여기서 재계산하면 어긋날 위험이 있다). event 페이지가
    아직 없는 카드(신규 추가 직후 등)는 인덱스에서 제외한다 — 링크가
    깨지는 것보다 그 카드가 통합검색에 한 박자 늦게 나타나는 편이 낫다.
  - 인덱스 필드는 통합검색 UI가 필요로 하는 최소 집합만: id, title_ko,
    people, year, mapKey, mapLabel, url. summary_ko 등 무거운 필드는
    담지 않는다(각 지도 자체 검색은 여전히 그 지도의 DATA를 그대로 써서
    상세 필드에 접근하므로 문제 없음. 이 인덱스는 "다른 시대에도 있다"는
    안내 + 링크 용도로만 쓰인다).

출력: 각 지도의 data/search_index.js 에
  const SEARCH_INDEX = [ {id, title_ko, people, year, mapKey, mapLabel, url}, ... ];
7개 지도 모두에 동일한 파일을 복사한다(루트는 data/, 나머지는 maps/{name}/data/).
"""
import re
import os
import glob
import json

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# (mapKey, data_dir, event_dir, entry_url_prefix, mapLabel)
# entry_url_prefix: 이벤트 상세가 아니라 "지도 진입점"의 상대 URL 베이스.
# 통합검색에서 다른 지도로 넘어갈 때는 event/{slug}.html(정적 SEO 페이지)이
# 아니라 지도 진입점(map.html 또는 index.html)에 ?event=ID 쿼리를 붙여
# 이동한다 — 그래야 그 지도 안에서 navigateToEvent()가 슬라이더/챕터까지
# 자동으로 맞춰준다(정적 event 페이지는 지도 UI 자체가 없다).
MAPS = [
    ('modern1',       'data',                    'event',                    '/map.html',                    '근대 (1876~1945)'),
    ('prehistory',    'maps/prehistory/data',    'maps/prehistory/event',    '/maps/prehistory/index.html',    '선사시대'),
    ('ancient',       'maps/ancient/data',       'maps/ancient/event',       '/maps/ancient/index.html',       '고대'),
    ('medieval1',     'maps/medieval1/data',     'maps/medieval1/event',     '/maps/medieval1/index.html',     '중세1 (고려)'),
    ('medieval2',     'maps/medieval2/data',     'maps/medieval2/event',     '/maps/medieval2/index.html',     '중세2 (조선)'),
    ('modern2',       'maps/modern2/data',       'maps/modern2/event',       '/maps/modern2/index.html',       '근현대 (1945~1993)'),
    ('contemporary',  'maps/contemporary/data',  'maps/contemporary/event',  '/maps/contemporary/index.html',  '현대 (1994~)'),
]

ID_RE = re.compile(r"^\s*\{\s*id:'([a-zA-Z0-9_]+)'", re.M)


def load_cards(data_dir):
    """id, title_ko, people, year만 추출. world_*.js, archive_backlinks.js,
    search_index.js(이전 빌드 산출물) 등 이벤트 카드가 아닌 파일은 건너뛴다."""
    cards = []
    path = os.path.join(PROJECT_ROOT, data_dir)
    for fp in sorted(glob.glob(os.path.join(path, '*.js'))):
        base = os.path.basename(fp)
        if base.startswith('world_') or base in ('archive_backlinks.js', 'search_index.js', 'china_dynasties.js', 'artifact_zones.js'):
            continue
        content = open(fp, encoding='utf-8').read()
        starts = [m.start() for m in ID_RE.finditer(content)]
        for i, s in enumerate(starts):
            e = starts[i + 1] if i + 1 < len(starts) else len(content)
            block = content[s:e]
            m_id = ID_RE.search(block)
            if not m_id:
                continue
            m_title = re.search(r"""title_ko:(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")""", block)
            m_year = re.search(r'year:(-?\d+)', block)
            m_people = re.search(r'people:\[(.*?)\]', block, re.S)
            if not (m_title and m_year):
                continue
            title_ko = (m_title.group(1) if m_title.group(1) is not None else m_title.group(2))
            title_ko = title_ko.replace("\\'", "'").replace('\\"', '"')
            people = []
            if m_people:
                people = re.findall(r"""'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)\"""", m_people.group(1))
                people = [(a or b).replace("\\'", "'") for a, b in people if (a or b)]
            cards.append({
                'id': m_id.group(1),
                'title_ko': title_ko,
                'people': people,
                'year': int(m_year.group(1)),
            })
    return cards


def build():
    all_entries = {}  # mapKey -> list of entries (통합 인덱스는 전체를 하나로 합침)
    total = 0
    for mapKey, data_dir, event_dir, url_prefix, mapLabel in MAPS:
        cards = load_cards(data_dir)
        entries = []
        for c in cards:
            entries.append({
                'id': c['id'],
                'title_ko': c['title_ko'],
                'people': c['people'],
                'year': c['year'],
                'mapKey': mapKey,
                'mapLabel': mapLabel,
                'url': f"{url_prefix}?event={c['id']}",
            })
        all_entries[mapKey] = entries
        total += len(entries)
        print(f"  {mapKey}: 카드 {len(cards)}개 인덱싱")

    # 통합 리스트(모든 맵의 항목을 하나로 합친 것) — 각 지도 배포본에
    # 동일하게 이 전체 리스트를 담는다. 필터링(현재 맵 제외)은 런타임에
    # search.js가 mapKey로 비교해서 한다.
    merged = []
    for mapKey, _, _, _, _ in MAPS:
        merged.extend(all_entries[mapKey])

    js_content = (
        "// data/search_index.js — 7개 지도 통합 검색 인덱스 (자동 생성, 직접 수정 금지)\n"
        "// build/generate_search_index.py 로 재생성한다.\n"
        "// 용도: 현재 지도에서 검색했을 때 결과가 없거나 부족하면, 이 인덱스에서\n"
        "// '다른 시대에 있음' 안내를 위해 참조한다. 상세 필드는 없다 — 안내+링크 전용.\n"
        "const SEARCH_INDEX = " + json.dumps(merged, ensure_ascii=False, indent=2) + ";\n"
    )

    written = []
    for mapKey, data_dir, event_dir, url_prefix, mapLabel in MAPS:
        out_path = os.path.join(PROJECT_ROOT, data_dir, 'search_index.js')
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(js_content)
        written.append(os.path.relpath(out_path, PROJECT_ROOT))

    print(f"\n통합 검색 인덱스 생성 완료: 총 {total}건")
    for w in written:
        print(f"  -> {w}")


if __name__ == '__main__':
    build()
