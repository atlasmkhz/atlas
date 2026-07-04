# -*- coding: utf-8 -*-
"""
generate_event_pages.py (현대 / contemporary, 1994~2025)

ATLAS 현대 지도의 data/*.js 카드를 읽어 /maps/contemporary/event/{slug}.html
정적 페이지를 생성한다. 근대(build/generate_event_pages.py)·근현대
(maps/modern2/build/generate_event_pages.py)와 같은 원칙을 따르되, 그
두 스크립트가 의존하던 generate_slugs.py/era_breadcrumb.py(이전 세션의
임시 작업 경로에만 있던 모듈)가 이 프로젝트 zip에는 포함되어 있지
않으므로, 슬러그 생성과 브레드크럼 구성을 이 파일 안에 자체적으로
내장했다 — 외부 모듈이나 절대경로에 의존하지 않는다.

원칙:
- 특정 연도를 하드코딩하지 않고 data/ 폴더를 동적으로 순회한다.
- 기존 지도 엔진(js/*, index.html)은 건드리지 않는다.
- 데이터는 data/*.js를 Source of Truth로 그대로 사용한다(중복 관리 없음).
- 각 페이지는 자기 자신을 canonical로 가진다.
- JSON-LD는 Event + BreadcrumbList.
- 슬러그는 "최소 충분 고유성" 원칙 — title_en에서 의미어만 추출해
  짧게 시작하고, 같은 연도 내 충돌이 있으면 단어를 하나씩 늘려간다.
"""
import glob
import html as html_module
import json
import os
import re

BUILD_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BUILD_DIR)          # .../maps/contemporary
SITE_ROOT = 'https://atlas.mkhz.kr'
PATH_PREFIX = '/maps/contemporary'
DATA_DIR = os.path.join(PROJECT_ROOT, 'data')
OUT_DIR = os.path.join(PROJECT_ROOT, 'event')

TYPE_LABELS = {
    'political': '정치', 'diplomacy': '외교', 'disaster': '재해',
    'economic': '경제', 'culture': '문화', 'movement': '사회운동',
    'organization': '조직·기관', 'policy': '정책', 'battle': '군사',
}
ERA_LABEL = '현대(1994–2025)'

STOPWORDS = {
    'a', 'an', 'the', 'of', 'in', 'at', 'to', 'and', 'for', 'on', 'by',
    'with', 'is', 'was', 'as', 'from', 'into', 'over', 'its', 'that',
    'this', 'or', 'vs', 'vs.',
}


def esc(s):
    return html_module.escape(s or '', quote=True)


def dec(text):
    return re.sub(r'\\u([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1), 16)), text)


def extract_list_items(bracket_content):
    """'a', "b\\'s", ... 형태의 배열 내부 문자열을 이스케이프까지
    고려해 안전하게 추출한다(단순 split은 문자열 안에 이스케이프된
    따옴표가 있으면 깨진다 — sources 배열에 흔함)."""
    if not bracket_content:
        return []
    items = re.findall(r"'((?:[^'\\]|\\.)*)'", bracket_content)
    if not items:
        items = re.findall(r'"((?:[^"\\]|\\.)*)"', bracket_content)
    cleaned = []
    for it in items:
        it = it.replace("\\'", "'").replace('\\"', '"')
        cleaned.append(dec(it))
    return cleaned


def make_description(summary_ko, max_len=155, min_len=60):
    if not summary_ko:
        return ''
    if len(summary_ko) <= max_len:
        return summary_ko

    def find_at(limit):
        truncated = summary_ko[:limit]
        end = truncated.rfind('. ')
        if end == -1:
            end = truncated.rfind('.')
        return end

    end = find_at(max_len)
    target = max_len * 0.7
    for wider_limit in (max_len + 60, max_len + 120, max_len + 200):
        if end != -1 and end + 1 >= target:
            break
        wider_end = find_at(wider_limit)
        if wider_end > end:
            end = wider_end

    if end > 0:
        return summary_ko[:end + 1]
    truncated = summary_ko[:max_len]
    last_space = truncated.rfind(' ')
    return (truncated[:last_space] if last_space > 0 else truncated) + '…'


def load_all_cards():
    """data/[0-9]*.js 만 스캔한다 — world_context.js(세계사 배경 레이어)는
    이벤트 카드가 아니므로 제외된다."""
    cards = []
    for path in sorted(glob.glob(os.path.join(DATA_DIR, '[0-9]*.js'))):
        content = open(path, encoding='utf-8').read()
        starts = [m.start() for m in re.finditer(r"^\s*\{\s*id:'", content, re.M)]
        blocks = []
        for i, s in enumerate(starts):
            e = starts[i + 1] if i + 1 < len(starts) else len(content)
            blocks.append(content[s:e])
        for b in blocks:
            m_id = re.search(r"id:'([a-zA-Z_0-9]+)'", b)
            m_type = re.search(r"type:'([a-z_]+)'", b)
            m_tko = re.search(r"title_ko:'((?:[^'\\]|\\.)*)'", b) or \
                    re.search(r'title_ko:"((?:[^"\\]|\\.)*)"', b)
            m_ten = re.search(r"title_en:'((?:[^'\\]|\\.)*)'", b) or \
                    re.search(r'title_en:"((?:[^"\\]|\\.)*)"', b)
            m_year = re.search(r'year:(\d+)', b)
            m_summary = re.search(r"summary_ko:'((?:[^'\\]|\\.)*)'", b)
            m_people = re.search(r'people:\[(.*?)\]', b)
            m_place = re.search(r"place_ko:'((?:[^'\\]|\\.)*)'", b)
            m_lat = re.search(r'lat:([\d.\-]+)', b)
            m_lng = re.search(r'lng:([\d.\-]+)', b)
            m_conn = re.search(r'connections:\[(.*?)\]', b)
            m_sources = re.search(r'sources:\[(.*?)\]', b, re.S)
            m_month = re.search(r'month:(\d+|null)', b)
            m_day = re.search(r'day:(\d+|null)', b)
            m_alleg = re.search(r"allegation_status:'([a-z]+)'", b)
            if not (m_id and m_ten and m_year):
                continue

            cards.append({
                'id': m_id.group(1),
                'type': m_type.group(1) if m_type else '?',
                'title_ko': dec((m_tko.group(1) if m_tko else '').replace("\\'", "'")),
                'title_en': dec(m_ten.group(1).replace("\\'", "'")),
                'year': int(m_year.group(1)),
                'month': (None if not m_month or m_month.group(1) == 'null' else int(m_month.group(1))),
                'day': (None if not m_day or m_day.group(1) == 'null' else int(m_day.group(1))),
                'summary_ko': dec((m_summary.group(1) if m_summary else '').replace("\\'", "'")),
                'people': extract_list_items(m_people.group(1)) if m_people else [],
                'place_ko': dec((m_place.group(1) if m_place else '').replace("\\'", "'")),
                'lat': float(m_lat.group(1)) if m_lat else None,
                'lng': float(m_lng.group(1)) if m_lng else None,
                'connections': extract_list_items(m_conn.group(1)) if m_conn else [],
                'sources': extract_list_items(m_sources.group(1)) if m_sources else [],
                'allegation_status': m_alleg.group(1) if m_alleg else None,
                'hero_image': None,  # 현대 지도 카드는 현재 hero 이미지가 없음
            })
    return cards


def slug_words(title_en):
    words = re.findall(r"[A-Za-z0-9]+", title_en.lower())
    meaningful = [w for w in words if w not in STOPWORDS]
    return meaningful or words


def assign_slugs(cards):
    """연도별로 그룹핑해 "최소 충분 고유성" 슬러그를 만든다:
    처음엔 의미어 2개로 시작하고, 같은 연도 안에서 충돌하면 단어를
    하나씩 늘린다. 그래도 충돌하면 카드 id를 덧붙여 반드시 고유하게
    만든다."""
    by_year = {}
    for c in cards:
        by_year.setdefault(c['year'], []).append(c)

    slug_map = {}
    for year, year_cards in by_year.items():
        for n in range(3, 8):
            candidate = {}
            collision = False
            seen = {}
            for c in year_cards:
                words = slug_words(c['title_en'])[:n]
                base = '-'.join(words) if words else c['id']
                slug = f"{year}-{base}"
                seen.setdefault(slug, []).append(c['id'])
            if all(len(ids) == 1 for ids in seen.values()):
                for c in year_cards:
                    words = slug_words(c['title_en'])[:n]
                    base = '-'.join(words) if words else c['id']
                    slug_map[c['id']] = f"{year}-{base}"
                collision = False
                break
            collision = True
        if collision:
            # 그래도 충돌하면 id 접미사를 붙여 무조건 고유하게 만든다.
            for c in year_cards:
                if c['id'] in slug_map:
                    continue
                words = slug_words(c['title_en'])[:5]
                base = '-'.join(words) if words else c['id']
                slug_map[c['id']] = f"{year}-{base}-{c['id']}"
    return slug_map


def build_breadcrumb(card):
    type_label = TYPE_LABELS.get(card['type'], card['type'])
    return ['ATLAS', ERA_LABEL, type_label, card['title_ko']]


def render_html(card, slug, breadcrumb, related_cards, slug_map):
    url = f'{SITE_ROOT}{PATH_PREFIX}/event/{slug}'
    title_tag = f"{card['title_ko']} ({card['year']}) | ATLAS by MKHZ"
    description = make_description(card['summary_ko'])
    hero_url = f'{SITE_ROOT}/assets/images/og-image.jpg'

    json_ld_event = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": card['title_ko'],
        "description": description,
        "startDate": str(card['year']),
        "location": {
            "@type": "Place",
            "name": card['place_ko'] or '',
            "geo": ({"@type": "GeoCoordinates", "latitude": card['lat'], "longitude": card['lng']}
                    if card['lat'] is not None else None)
        } if card['place_ko'] else None,
        "url": url,
    }

    def clean(d):
        if isinstance(d, dict):
            return {k: clean(v) for k, v in d.items() if v is not None}
        return d
    json_ld_event = clean(json_ld_event)

    json_ld_breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": i + 1, "name": name,
             "item": (SITE_ROOT if i == 0 else None)}
            for i, name in enumerate(breadcrumb)
        ]
    }
    json_ld_breadcrumb["itemListElement"][-1]["item"] = url
    json_ld_breadcrumb["itemListElement"] = [
        {k: v for k, v in item.items() if v is not None}
        for item in json_ld_breadcrumb["itemListElement"]
    ]

    people_html = ''
    if card['people']:
        people_html = '<ul class="related-people">' + ''.join(
            f'<li>{esc(p)}</li>' for p in card['people']
        ) + '</ul>'

    related_html = ''
    if related_cards:
        items = []
        for rc in related_cards:
            r_slug = slug_map.get(rc['id'])
            if not r_slug:
                continue
            items.append(f'<li><a href="{PATH_PREFIX}/event/{r_slug}">{esc(rc["title_ko"])} ({rc["year"]})</a></li>')
        if items:
            related_html = '<ul class="related-events">' + ''.join(items) + '</ul>'

    sources_html = ''
    if card['sources']:
        sources_html = '<ul class="sources">' + ''.join(
            f'<li>{esc(s)}</li>' for s in card['sources']
        ) + '</ul>'

    breadcrumb_html = ' &rsaquo; '.join(
        f'<a href="{SITE_ROOT}/">{esc(b)}</a>' if i == 0 else esc(b)
        for i, b in enumerate(breadcrumb)
    )

    date_str = f"{card['year']}년"
    if card['month'] is not None:
        date_str += f" {card['month']}월"
        if card['day'] is not None:
            date_str += f" {card['day']}일"

    allegation_note = ''
    if card['allegation_status'] == 'alleged':
        allegation_note = '<p class="allegation-note">※ 이 사건에는 아직 확정되지 않은 의혹이 포함되어 있으며, 향후 수사·재판 결과에 따라 사실관계가 달라질 수 있습니다.</p>'
    elif card['allegation_status'] == 'indicted':
        allegation_note = '<p class="allegation-note">※ 기소된 혐의를 다루고 있으며, 최종 판결 전까지는 무죄추정의 원칙이 적용됩니다.</p>'

    return f"""<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#1a1612">
<title>{esc(title_tag)}</title>
<meta name="description" content="{esc(description)}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="article">
<meta property="og:url" content="{url}">
<meta property="og:title" content="{esc(title_tag)}">
<meta property="og:description" content="{esc(description)}">
<meta property="og:locale" content="ko_KR">
<meta property="og:image" content="{hero_url}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{esc(title_tag)}">
<meta name="twitter:description" content="{esc(description)}">
<meta name="twitter:image" content="{hero_url}">
<script type="application/ld+json">{json.dumps(json_ld_event, ensure_ascii=False)}</script>
<script type="application/ld+json">{json.dumps(json_ld_breadcrumb, ensure_ascii=False)}</script>
</head>
<body>
<nav class="breadcrumb">{breadcrumb_html}</nav>
<article>
<h1>{esc(card['title_ko'])}</h1>
<p class="event-meta">{esc(date_str)} · {esc(card['place_ko'] or '')}</p>
<p class="summary">{esc(card['summary_ko'])}</p>
{allegation_note}
{f'<section class="people"><h2>관련 인물</h2>{people_html}</section>' if people_html else ''}
{f'<section class="related"><h2>관련 사건</h2>{related_html}</section>' if related_html else ''}
{f'<section class="sources"><h2>참고 자료</h2>{sources_html}</section>' if sources_html else ''}
<p class="map-cta"><a href="{SITE_ROOT}{PATH_PREFIX}/?event={card['id']}">지도에서 보기</a></p>
</article>
</body>
</html>"""


def main():
    cards = load_all_cards()
    print(f"총 {len(cards)}건 로드")

    slug_map = assign_slugs(cards)
    cards_by_id = {c['id']: c for c in cards}

    os.makedirs(OUT_DIR, exist_ok=True)
    generated = 0
    for c in cards:
        slug = slug_map.get(c['id'])
        if not slug:
            print(f"⚠ slug 없음, 스킵: {c['id']}")
            continue
        breadcrumb = build_breadcrumb(c)
        related = [cards_by_id[cid] for cid in c['connections'] if cid in cards_by_id]
        html_out = render_html(c, slug, breadcrumb, related, slug_map)
        out_path = os.path.join(OUT_DIR, f'{slug}.html')
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(html_out)
        generated += 1

    print(f"생성 완료: {generated}건 -> {OUT_DIR}")


if __name__ == '__main__':
    main()
