#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
generate_route_pages.py
routes/*.js 를 읽어 (1) 루트 랜딩 페이지 /route/{slug}.html 과
(2) card_ref가 없는(=기존 event 페이지가 없는) 웨이포인트 전용 페이지를
생성한다.

기존 generate_event_pages.py와 같은 원칙을 따른다:
- 특정 루트를 하드코딩하지 않고 routes/ 폴더를 동적으로 순회한다
  (extract_routes.js가 routes/*.js를 전부 로드해 JSON으로 넘긴다).
- 각 페이지는 자기 자신을 canonical로 가진다.
- JSON-LD는 이벤트류 페이지에 Event + BreadcrumbList를 적용.
- 실제로 존재하지 않는 링크는 만들지 않는다.

card_ref가 있는 웨이포인트는 이미 /event/{slug}.html이 존재하므로 새
페이지를 만들지 않고, 그 기존 페이지로 바로 링크한다. 이 매핑은
event/*.html을 스캔해 각 파일의 map-cta 링크(?event={id})에서
역으로 추출한다 — 별도의 slug 데이터베이스가 없어도 항상 실제 상태와
일치한다.

card_ref가 없는(루트 전용) 웨이포인트는 이 스크립트가 새로 페이지를
만든다. 기존 event/ 디렉토리 안에 `route-{route_slug}--{wp_id}.html`
이름으로 넣는다 — 별도 디렉토리를 만들지 않는 이유는, 기존
generate_unified_sitemap.py가 event/*.html을 통째로 스캔하는 방식이라
여기 넣기만 하면 sitemap에도 별도 코드 수정 없이 자동으로 잡히기
때문이다.

새 라우트가 추가되면(routes/xxx.js 파일 하나만 추가) 이 스크립트를
다시 실행하는 것만으로 전체가 갱신된다 — 라우트별로 이 스크립트를
고칠 필요가 없다.
"""
import glob
import html as html_module
import json
import os
import re
import subprocess
import sys

# ── 경로 ──────────────────────────────────────────────────────────
# 이 스크립트 파일 위치를 기준으로 프로젝트 루트를 잡는다(절대경로
# 하드코딩 금지 — 이전 파이프라인이 이 부분에서 이식성이 깨져 있었다).
BUILD_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BUILD_DIR)
ROUTES_DIR = os.path.join(PROJECT_ROOT, 'routes')
EVENT_DIR = os.path.join(PROJECT_ROOT, 'event')
ROUTE_OUT_DIR = os.path.join(PROJECT_ROOT, 'route')
EXTRACT_SCRIPT = os.path.join(BUILD_DIR, 'extract_routes.js')

SITE_ROOT = 'https://atlas.mkhz.kr'
# 이 스크립트가 근대(메인) 앱용인지 근현대(modern2)용인지에 따라
# URL 경로 접두사가 달라진다. PROJECT_ROOT 안에 'modern2'가 있으면
# 그쪽으로 판단한다(하드코딩 대신 실제 폴더 구조로 판별).
PATH_PREFIX = '/maps/' + os.path.basename(PROJECT_ROOT) if os.path.basename(PROJECT_ROOT) in ('modern2', 'ancient', 'medieval1', 'medieval2', 'contemporary', 'prehistory') else ''


def esc(s):
    return html_module.escape(s or '', quote=True)


def slugify_route_id(route_id):
    """route.id('kim_won_bong') → URL 슬러그('kim-won-bong')."""
    return route_id.replace('_', '-')


def make_description(text, max_len=155):
    if not text:
        return ''
    if len(text) <= max_len:
        return text
    truncated = text[:max_len]
    for sep in ['다. ', '. ']:
        idx = truncated.rfind(sep)
        if idx > 40:
            return truncated[:idx + 1]
    idx = truncated.rfind(' ')
    return (truncated[:idx] if idx > 40 else truncated) + '…'


def load_routes():
    """extract_routes.js를 실행해 routes/*.js를 JSON으로 받는다."""
    if not os.path.isdir(ROUTES_DIR):
        print(f'  (routes/ 디렉토리 없음 — 건너뜀: {ROUTES_DIR})')
        return []
    result = subprocess.run(
        ['node', EXTRACT_SCRIPT, ROUTES_DIR],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        print('❌ extract_routes.js 실패:', result.stderr)
        sys.exit(1)
    return json.loads(result.stdout)


def build_event_id_to_slug_map():
    """
    이미 생성된 event/*.html을 스캔해 event id → slug 매핑을 만든다.
    각 페이지의 "지도에서 보기" 링크(?event={id})에서 id를 역추출한다.
    별도 slug DB가 없어도, 실제 존재하는 페이지 상태와 항상 일치하는
    매핑을 얻을 수 있다.
    """
    mapping = {}
    if not os.path.isdir(EVENT_DIR):
        return mapping
    pattern = re.compile(r'\?event=([A-Za-z0-9_]+)"')
    for filepath in glob.glob(os.path.join(EVENT_DIR, '*.html')):
        slug = os.path.splitext(os.path.basename(filepath))[0]
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
        except OSError:
            continue
        m = pattern.search(content)
        if m:
            mapping[m.group(1)] = slug
    return mapping


def waypoint_page_filename(route_slug, wp_id):
    return f'route-{route_slug}--{wp_id}'


def waypoint_date_str(wp):
    parts = [str(wp.get('year'))]
    if wp.get('month'):
        parts.append(f"{wp['month']}월")
        if wp.get('day'):
            parts[-1] = f"{wp['month']}월 {wp['day']}일"
    return ' '.join(parts)


def event_href(slug):
    prefix = (PATH_PREFIX.strip('/') + '/') if PATH_PREFIX else ''
    return f'/{prefix}event/{slug}'


def render_waypoint_page(route, wp, route_slug, prev_wp, next_wp, out_path, event_id_to_slug=None):
    """card_ref가 없는 웨이포인트 전용 페이지 생성 (event 페이지와 같은 톤)."""
    title = f"{wp['title_ko']} — {route['name']} | ATLAS by MKHZ"
    description = make_description(wp.get('summary_ko', ''))
    page_slug = waypoint_page_filename(route_slug, wp['id'])
    page_url = f"{SITE_ROOT}{PATH_PREFIX}/event/{page_slug}"
    map_cta_url = f"{SITE_ROOT}{PATH_PREFIX}/?route={route['id']}&wp={wp['id']}"
    date_str = waypoint_date_str(wp)

    ld_event = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": wp['title_ko'],
        "description": description,
        "startDate": str(wp.get('year')),
        "location": {
            "@type": "Place",
            "name": wp.get('place_ko', ''),
            "geo": {"@type": "GeoCoordinates", "latitude": wp.get('lat'), "longitude": wp.get('lng')},
        },
        "url": page_url,
    }
    ld_breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "ATLAS", "item": SITE_ROOT + "/"},
            {"@type": "ListItem", "position": 2, "name": "루트", "item": f"{SITE_ROOT}{PATH_PREFIX}/route/{route_slug}"},
            {"@type": "ListItem", "position": 3, "name": route['name']},
            {"@type": "ListItem", "position": 4, "name": wp['title_ko'], "item": page_url},
        ],
    }

    # 이웃 웨이포인트 링크 — 랜딩 페이지와 같은 해석 규칙을 쓴다:
    # card_ref의 event 페이지가 실재하면 그쪽으로, 아니면(선사처럼
    # event 페이지가 없는 지도 포함) 웨이포인트 전용 페이지로 잇는다.
    mapping = event_id_to_slug or {}
    def _wp_href(w):
        if w.get('card_ref') and w['card_ref'] in mapping:
            return event_href(mapping[w['card_ref']])
        return event_href(waypoint_page_filename(route_slug, w['id']))
    nav_links = []
    if prev_wp:
        nav_links.append(f'<a href="{_wp_href(prev_wp)}" rel="prev">← {esc(prev_wp["title_ko"])}</a>')
    if next_wp:
        nav_links.append(f'<a href="{_wp_href(next_wp)}" rel="next">{esc(next_wp["title_ko"])} →</a>')

    html_out = f'''<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#1a1612">
<title>{esc(title)}</title>
<meta name="description" content="{esc(description)}">
<link rel="canonical" href="{page_url}">
<meta property="og:type" content="article">
<meta property="og:url" content="{page_url}">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(description)}">
<meta property="og:locale" content="ko_KR">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="{esc(title)}">
<meta name="twitter:description" content="{esc(description)}">
<script type="application/ld+json">{json.dumps(ld_event, ensure_ascii=False)}</script>
<script type="application/ld+json">{json.dumps(ld_breadcrumb, ensure_ascii=False)}</script>
</head>
<body>
<nav class="breadcrumb"><a href="{SITE_ROOT}/">ATLAS</a> &rsaquo; <a href="{SITE_ROOT}{PATH_PREFIX}/route/{route_slug}">{esc(route['name'])}</a> &rsaquo; {esc(wp['title_ko'])}</nav>
<article>
<h1>{esc(wp['title_ko'])}</h1>
<p class="event-meta">{esc(date_str)} · {esc(wp.get('place_ko', ''))}</p>
<p class="summary">{esc(wp.get('summary_ko', ''))}</p>
<section class="route-context"><p>이 사건은 <a href="{SITE_ROOT}{PATH_PREFIX}/route/{route_slug}">{esc(route['name'])}</a> 루트의 한 장면입니다.</p></section>
{f'<p class="archive-cta"><a href="{SITE_ROOT}/archive/{wp.get("archive_series", route.get("archive_series",""))}/{wp["archive_post"]}">자료실에서 더 읽기</a></p>' if wp.get('archive_post') else ''}
{f'<nav class="wp-pager">{" | ".join(nav_links)}</nav>' if nav_links else ''}
<p class="map-cta"><a href="{map_cta_url}">지도에서 보기</a></p>
</article>
<link rel="stylesheet" href="/css/namu.css">
<script src="/js/growth.js"></script>
<script src="/js/library.js"></script>
<script src="/js/namuBadge.js"></script>
</body>
</html>'''

    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(html_out)


def render_route_landing_page(route, route_slug, event_id_to_slug, out_path):
    """루트 전체를 소개하고 모든 웨이포인트로 링크하는 랜딩 페이지."""
    title = f"{route['name']} | ATLAS by MKHZ"
    description = make_description(route.get('tagline', ''))
    page_url = f"{SITE_ROOT}{PATH_PREFIX}/route/{route_slug}"
    map_cta_url = f"{SITE_ROOT}{PATH_PREFIX}/?route={route['id']}"

    items = []
    ld_list_items = []
    for i, wp in enumerate(route['waypoints'], start=1):
        if wp.get('card_ref') and wp['card_ref'] in event_id_to_slug:
            href = event_href(event_id_to_slug[wp['card_ref']])
        else:
            href = event_href(waypoint_page_filename(route_slug, wp['id']))
        date_str = waypoint_date_str(wp)
        items.append(
            f'<li><a href="{href}">{esc(wp["title_ko"])}</a> '
            f'<span class="wp-date">({esc(date_str)} · {esc(wp.get("place_ko",""))})</span></li>'
        )
        ld_list_items.append({
            "@type": "ListItem", "position": i, "name": wp['title_ko'],
            "url": f"{SITE_ROOT}{href}",
        })

    ld_itemlist = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": route['name'],
        "description": description,
        "url": page_url,
        "numberOfItems": len(route['waypoints']),
        "itemListElement": ld_list_items,
    }
    ld_breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "ATLAS", "item": SITE_ROOT + "/"},
            {"@type": "ListItem", "position": 2, "name": "루트", "item": f"{SITE_ROOT}{PATH_PREFIX}/?nav=route"},
            {"@type": "ListItem", "position": 3, "name": route['name'], "item": page_url},
        ],
    }

    html_out = f'''<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#1a1612">
<title>{esc(title)}</title>
<meta name="description" content="{esc(description)}">
<link rel="canonical" href="{page_url}">
<meta property="og:type" content="article">
<meta property="og:url" content="{page_url}">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(description)}">
<meta property="og:locale" content="ko_KR">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="{esc(title)}">
<meta name="twitter:description" content="{esc(description)}">
<script type="application/ld+json">{json.dumps(ld_itemlist, ensure_ascii=False)}</script>
<script type="application/ld+json">{json.dumps(ld_breadcrumb, ensure_ascii=False)}</script>
</head>
<body>
<nav class="breadcrumb"><a href="{SITE_ROOT}/">ATLAS</a> &rsaquo; 루트 &rsaquo; {esc(route['name'])}</nav>
<article>
<h1>{esc(route['name'])}</h1>
<p class="event-meta">{esc(route.get('period',''))}</p>
<p class="summary">{esc(route.get('tagline',''))}</p>
<section class="route-timeline"><h2>타임라인 ({len(route['waypoints'])}개 지점)</h2><ol class="route-wp-list">{''.join(items)}</ol></section>
<p class="map-cta"><a href="{map_cta_url}">지도에서 루트 보기</a></p>
</article>
<link rel="stylesheet" href="/css/namu.css">
<script src="/js/growth.js"></script>
<script src="/js/library.js"></script>
<script src="/js/namuBadge.js"></script>
</body>
</html>'''

    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(html_out)


def main():
    routes = load_routes()
    if not routes:
        print('생성할 라우트가 없습니다.')
        return

    os.makedirs(ROUTE_OUT_DIR, exist_ok=True)
    os.makedirs(EVENT_DIR, exist_ok=True)
    event_id_to_slug = build_event_id_to_slug_map()

    total_landing = 0
    total_wp_pages = 0

    for route in routes:
        route_slug = slugify_route_id(route['id'])
        waypoints = route['waypoints']

        # card_ref가 있어도 대응하는 event 페이지가 실제로 존재할 때만
        # 건너뛴다 — event 페이지 생성을 보류한 지도(선사 등)에서는
        # card_ref 웨이포인트도 전용 페이지를 만들어야 랜딩의 링크가
        # 깨지지 않는다(랜딩 링크 로직과 같은 조건).
        null_wps = [w for w in waypoints
                    if not (w.get('card_ref') and w['card_ref'] in event_id_to_slug)]
        for idx, wp in enumerate(waypoints):
            if wp.get('card_ref') and wp['card_ref'] in event_id_to_slug:
                continue
            prev_wp = waypoints[idx - 1] if idx > 0 else None
            next_wp = waypoints[idx + 1] if idx < len(waypoints) - 1 else None
            out_path = os.path.join(EVENT_DIR, waypoint_page_filename(route_slug, wp['id']) + '.html')
            render_waypoint_page(route, wp, route_slug, prev_wp, next_wp, out_path, event_id_to_slug)
            total_wp_pages += 1

        out_path = os.path.join(ROUTE_OUT_DIR, route_slug + '.html')
        render_route_landing_page(route, route_slug, event_id_to_slug, out_path)
        total_landing += 1

        print(f'  ✓ {route["id"]}: 랜딩 1개, 전용 웨이포인트 {len(null_wps)}개')

    print(f'\n루트 페이지 생성 완료: 랜딩 {total_landing}개, 웨이포인트 전용 페이지 {total_wp_pages}개')


if __name__ == '__main__':
    main()
