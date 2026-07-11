# -*- coding: utf-8 -*-
"""
generate_event_pages.py
ATLAS Event 데이터를 읽어 /event/{slug}.html 정적 페이지를 생성한다.

원칙(작업지시서 기준):
- 특정 연도·시대를 하드코딩하지 않고 data/ 폴더를 동적으로 순회한다.
- 기존 지도 엔진(js/*, index.html)은 건드리지 않는다.
- 데이터는 data/*.js를 Source of Truth로 그대로 사용한다(중복 관리 없음).
- 각 페이지는 자기 자신을 canonical로 가진다.
- JSON-LD는 HistoricalEvent + BreadcrumbList만 적용(1차 작업 범위).
"""
import re
import os
import sys
import json
import html as html_module

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from generate_slugs import load_cards, assign_slugs
from era_breadcrumb import build_breadcrumb, get_era_label, get_breadcrumb_type
try:
    from manual_slug_overrides import MANUAL_SLUG_OVERRIDES
except ImportError:
    MANUAL_SLUG_OVERRIDES = {}

SITE_ROOT = 'https://atlas.mkhz.kr'
PATH_PREFIX = '/maps/modern2'
BUILD_DIR = os.path.dirname(os.path.abspath(__file__))
MAP_DIR = os.path.dirname(BUILD_DIR)
OUT_DIR = os.path.join(MAP_DIR, 'event')
DATA_DIR = os.path.join(MAP_DIR, 'data')

def esc(s):
    """HTML 출력용 escape. None은 빈 문자열로."""
    return html_module.escape(s or '', quote=True)

def make_description(summary_ko, max_len=155, min_len=60):
    """summary_ko에서 meta description을 만든다. max_len 안에서 끝나는
    마지막 완전한 문장까지를 사용한다(문장 중간 절단 방지).
    그 결과가 min_len보다 짧으면(첫 문장이 매우 짧은 경우) max_len을
    한 단계 늘려 재시도해, 가능하면 두 번째 문장까지 포함시킨다.
    문장 경계를 전혀 못 찾으면(첫 문장 자체가 너무 길다) 단어 경계에서
    자르고 … 를 붙인다."""
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
    # 첫 시도 결과가 목표 길이(max_len)에 한참 못 미치면, 더 넓은 한도로
    # 다시 찾아본다(원문 문장 사이에 — 같은 구두점이 끼어 마침표가 늦게
    # 나오는 경우 대응). "충분히 길다"의 기준은 max_len의 70% 이상으로 둔다
    # — min_len(60자)은 "완전히 빈 결과"를 막는 최후 방어선일 뿐, 적당히
    # 짧다고 더 채우는 것을 막는 기준으로 쓰면 안 된다.
    target = max_len * 0.7
    for wider_limit in (max_len + 60, max_len + 120, max_len + 200):
        if end != -1 and end + 1 >= target:
            break
        wider_end = find_at(wider_limit)
        if wider_end > end:
            end = wider_end

    if end > 0:
        return summary_ko[:end+1]
    truncated = summary_ko[:max_len]
    last_space = truncated.rfind(' ')
    return (truncated[:last_space] if last_space > 0 else truncated) + '…'

def load_all_cards_with_content():
    """generate_slugs.load_cards()는 SEO에 필요한 핵심 필드만 추출한다.
    HTML 생성에는 connections, content(hero/gallery), sources 등 더 많은
    필드가 필요하므로 이 함수에서 추가로 파싱한다."""
    cards = []
    for path in sorted(__import__('glob').glob(os.path.join(DATA_DIR, '[0-9]*.js'))):
        content = open(path, encoding='utf-8').read()
        starts = [m.start() for m in re.finditer(r"^  \{ id:'", content, re.M)]
        blocks = []
        for i, s in enumerate(starts):
            e = starts[i+1] if i+1 < len(starts) else len(content)
            blocks.append(content[s:e])
        for b in blocks:
            m_id = re.search(r"id:'([a-z_0-9]+)'", b)
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
            m_hero = re.search(r'hero:\{[^}]*"url":\s*"([^"]+)"[^}]*\}', b)
            m_month = re.search(r'month:(\d+|null)', b)
            m_day = re.search(r'day:(\d+|null)', b)
            if not (m_id and m_ten and m_year):
                continue

            def dec(text):
                return re.sub(r'\\u([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1),16)), text)

            cards.append({
                'id': m_id.group(1),
                'type': m_type.group(1) if m_type else '?',
                'title_ko': dec((m_tko.group(1) if m_tko else '').replace("\\'", "'")),
                'title_en': dec(m_ten.group(1).replace("\\'", "'")),
                'year': int(m_year.group(1)),
                'month': (None if not m_month or m_month.group(1)=='null' else int(m_month.group(1))),
                'day': (None if not m_day or m_day.group(1)=='null' else int(m_day.group(1))),
                'summary_ko': dec((m_summary.group(1) if m_summary else '').replace("\\'", "'")),
                'people': re.findall(r"'([^']*)'", m_people.group(1)) if m_people else [],
                'place_ko': dec((m_place.group(1) if m_place else '').replace("\\'", "'")),
                'lat': float(m_lat.group(1)) if m_lat else None,
                'lng': float(m_lng.group(1)) if m_lng else None,
                'connections': re.findall(r"'([^']*)'", m_conn.group(1)) if m_conn else [],
                'sources': re.findall(r"'([^']*)'", m_sources.group(1)) if m_sources else [],
                'hero_image': m_hero.group(1) if m_hero else None,
            })
    return cards

def render_html(card, slug, breadcrumb, related_cards, slug_map):
    url = f'{SITE_ROOT}{PATH_PREFIX}/event/{slug}'
    title_tag = f"{card['title_ko']} ({card['year']}) | ATLAS by MKHZ"
    description = make_description(card['summary_ko'])
    hero_url = f"{SITE_ROOT}{PATH_PREFIX}/{card['hero_image']}" if card['hero_image'] else f'{SITE_ROOT}/assets/images/og-image.jpg'

    # JSON-LD: HistoricalEvent + BreadcrumbList
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
    # None 값 제거(JSON-LD 깔끔하게)
    def clean(d):
        if isinstance(d, dict):
            return {k: clean(v) for k, v in d.items() if v is not None}
        return d
    json_ld_event = clean(json_ld_event)

    json_ld_breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": i+1, "name": name,
             "item": (SITE_ROOT if i == 0 else None)}
            for i, name in enumerate(breadcrumb)
        ]
    }
    # 마지막 항목(현재 페이지)은 item URL을 자기 자신으로
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
{f'<section class="people"><h2>관련 인물</h2>{people_html}</section>' if people_html else ''}
{f'<section class="related"><h2>관련 사건</h2>{related_html}</section>' if related_html else ''}
{f'<section class="sources"><h2>참고 자료</h2>{sources_html}</section>' if sources_html else ''}
<p class="map-cta"><a href="{SITE_ROOT}{PATH_PREFIX}/?event={card['id']}">지도에서 보기</a></p>
</article>
</body>
</html>"""

def main():
    cards = load_all_cards_with_content()
    print(f"총 {len(cards)}건 로드(상세 필드 포함)")

    slug_cards = load_cards()  # generate_slugs용 경량 카드
    slug_map, _ = assign_slugs(slug_cards)
    for cid, override in MANUAL_SLUG_OVERRIDES.items():
        if cid in slug_map:
            slug_map[cid] = override

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
