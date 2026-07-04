# -*- coding: utf-8 -*-
"""
generate_new_cards_2026_07.py (근현대 / modern2, 1945~1993)

2026-07 세션에서 경제·기업 축 보강으로 새로 추가된 카드 3건
(economic_1993_01, person_1968_02, person_1980_09)의 event 정적
페이지만 생성하는 1회용 스크립트. 기존 406개 페이지는 건드리지 않는다.

modern2/build/generate_event_pages.py가 의존하던 generate_slugs.py/
era_breadcrumb.py(세션 임시 경로)가 이 zip에는 없어 그 스크립트를
그대로 실행할 수 없으므로, 동일한 출력 스타일(브레드크럼 "ATLAS ›
대한민국 › {유형} › 제목", 슬러그 규칙)을 이 파일에 자체적으로
재현했다.
"""
import glob
import html as html_module
import json
import os
import re

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # .../maps/modern2
SITE_ROOT = 'https://atlas.mkhz.kr'
PATH_PREFIX = '/maps/modern2'
DATA_DIR = os.path.join(PROJECT_ROOT, 'data')
OUT_DIR = os.path.join(PROJECT_ROOT, 'event')

TYPE_LABELS = {'economic': '경제·산업', 'person': '인물'}
ERA_LABEL = '대한민국'

TARGET_IDS = ['economic_1993_01', 'person_1968_02', 'person_1980_09']

STOPWORDS = {'a', 'an', 'the', 'of', 'in', 'at', 'to', 'and', 'for', 'on',
             'by', 'with', 'is', 'was', 'as', 'from', 'into', 'over'}


def esc(s):
    return html_module.escape(s or '', quote=True)


def dec(text):
    return re.sub(r'\\u([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1), 16)), text)


def extract_list_items(bracket_content):
    if not bracket_content:
        return []
    items = re.findall(r"'((?:[^'\\]|\\.)*)'", bracket_content)
    if not items:
        items = re.findall(r'"((?:[^"\\]|\\.)*)"', bracket_content)
    return [dec(it.replace("\\'", "'").replace('\\"', '"')) for it in items]


def make_description(summary_ko, max_len=155):
    if not summary_ko or len(summary_ko) <= max_len:
        return summary_ko or ''
    truncated = summary_ko[:max_len]
    end = truncated.rfind('. ')
    if end == -1:
        end = truncated.rfind('.')
    if end > 40:
        return summary_ko[:end + 1]
    last_space = truncated.rfind(' ')
    return (truncated[:last_space] if last_space > 0 else truncated) + '…'


def load_card(card_id):
    for path in sorted(glob.glob(os.path.join(DATA_DIR, '[0-9]*.js'))):
        content = open(path, encoding='utf-8').read()
        starts = [m.start() for m in re.finditer(r"^\s*\{\s*id:'", content, re.M)]
        for i, s in enumerate(starts):
            e = starts[i + 1] if i + 1 < len(starts) else len(content)
            b = content[s:e]
            m_id = re.search(r"id:'([a-zA-Z_0-9]+)'", b)
            if not (m_id and m_id.group(1) == card_id):
                continue
            m_type = re.search(r"type:'([a-z_]+)'", b)
            m_tko = re.search(r"title_ko:'((?:[^'\\]|\\.)*)'", b) or re.search(r'title_ko:"((?:[^"\\]|\\.)*)"', b)
            m_ten = re.search(r"title_en:'((?:[^'\\]|\\.)*)'", b) or re.search(r'title_en:"((?:[^"\\]|\\.)*)"', b)
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
            return {
                'id': card_id, 'path': path,
                'type': m_type.group(1) if m_type else '?',
                'title_ko': dec((m_tko.group(1) if m_tko else '').replace("\\'", "'")),
                'title_en': dec((m_ten.group(1) if m_ten else '').replace("\\'", "'")),
                'year': int(m_year.group(1)) if m_year else None,
                'month': (None if not m_month or m_month.group(1) == 'null' else int(m_month.group(1))),
                'day': (None if not m_day or m_day.group(1) == 'null' else int(m_day.group(1))),
                'summary_ko': dec((m_summary.group(1) if m_summary else '').replace("\\'", "'")),
                'people': extract_list_items(m_people.group(1)) if m_people else [],
                'place_ko': dec((m_place.group(1) if m_place else '').replace("\\'", "'")),
                'lat': float(m_lat.group(1)) if m_lat else None,
                'lng': float(m_lng.group(1)) if m_lng else None,
                'connections': extract_list_items(m_conn.group(1)) if m_conn else [],
                'sources': extract_list_items(m_sources.group(1)) if m_sources else [],
            }
    return None


def slug_words(title_en, n):
    words = re.findall(r"[A-Za-z0-9]+", title_en.lower())
    meaningful = [w for w in words if w not in STOPWORDS] or words
    return meaningful[:n]


def unique_slug(card):
    year = card['year']
    existing = set(os.path.splitext(os.path.basename(f))[0]
                   for f in glob.glob(os.path.join(OUT_DIR, f'{year}-*.html')))
    for n in range(3, 8):
        base = '-'.join(slug_words(card['title_en'], n)) or card['id']
        slug = f'{year}-{base}'
        if slug not in existing:
            return slug
    return f'{year}-{card["id"]}'


def render_html(card, slug):
    url = f'{SITE_ROOT}{PATH_PREFIX}/event/{slug}'
    title_tag = f"{card['title_ko']} ({card['year']}) | ATLAS by MKHZ"
    description = make_description(card['summary_ko'])
    type_label = TYPE_LABELS.get(card['type'], card['type'])
    breadcrumb = ['ATLAS', ERA_LABEL, type_label, card['title_ko']]
    breadcrumb_html = ' &rsaquo; '.join(
        f'<a href="{SITE_ROOT}/">{esc(b)}</a>' if i == 0 else esc(b)
        for i, b in enumerate(breadcrumb)
    )

    ld_event = {"@context": "https://schema.org", "@type": "Event", "name": card['title_ko'],
                "description": description, "startDate": str(card['year']), "url": url}
    if card['place_ko']:
        ld_event["location"] = {"@type": "Place", "name": card['place_ko']}
        if card['lat'] is not None:
            ld_event["location"]["geo"] = {"@type": "GeoCoordinates", "latitude": card['lat'], "longitude": card['lng']}
    ld_breadcrumb = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": i + 1, "name": name, **({"item": SITE_ROOT} if i == 0 else {})}
        for i, name in enumerate(breadcrumb)
    ]}
    ld_breadcrumb["itemListElement"][-1]["item"] = url

    people_html = ''
    if card['people']:
        people_html = '<ul class="related-people">' + ''.join(f'<li>{esc(p)}</li>' for p in card['people']) + '</ul>'
    sources_html = ''
    if card['sources']:
        sources_html = '<ul class="sources">' + ''.join(f'<li>{esc(s)}</li>' for s in card['sources']) + '</ul>'

    date_str = f"{card['year']}년"
    if card['month'] is not None:
        date_str += f" {card['month']+1}월"
        if card['day'] is not None:
            date_str += f" {card['day']}일"

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
<meta property="og:image" content="{SITE_ROOT}/assets/images/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{esc(title_tag)}">
<meta name="twitter:description" content="{esc(description)}">
<script type="application/ld+json">{json.dumps(ld_event, ensure_ascii=False)}</script>
<script type="application/ld+json">{json.dumps(ld_breadcrumb, ensure_ascii=False)}</script>
</head>
<body>
<nav class="breadcrumb">{breadcrumb_html}</nav>
<article>
<h1>{esc(card['title_ko'])}</h1>
<p class="event-meta">{esc(date_str)} · {esc(card['place_ko'] or '')}</p>
<p class="summary">{esc(card['summary_ko'])}</p>
{f'<section class="people"><h2>관련 인물</h2>{people_html}</section>' if people_html else ''}
{f'<section class="sources"><h2>참고 자료</h2>{sources_html}</section>' if sources_html else ''}
<p class="map-cta"><a href="{SITE_ROOT}{PATH_PREFIX}/index.html?event={card['id']}">지도에서 보기</a></p>
</article>
</body>
</html>"""


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    for cid in TARGET_IDS:
        card = load_card(cid)
        if not card:
            print(f'⚠ 카드를 찾지 못함: {cid}')
            continue
        slug = unique_slug(card)
        html_out = render_html(card, slug)
        out_path = os.path.join(OUT_DIR, f'{slug}.html')
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(html_out)
        print(f'✓ {cid} -> {slug}.html')


if __name__ == '__main__':
    main()
