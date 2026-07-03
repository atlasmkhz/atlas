#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
generate_archive_pages.py
archive/*.js 를 읽어 자료실 정적 페이지를 생성한다:
  (1) 시리즈 랜딩 페이지  /archive/{series-slug}/index.html
  (2) 글 페이지          /archive/{series-slug}/{post_id}.html

generate_route_pages.py와 같은 원칙을 따른다(자매 스크립트):
- 특정 시리즈를 하드코딩하지 않고 archive/ 폴더를 동적으로 순회한다
  (extract_archive.js가 archive/*.js를 전부 로드해 JSON으로 넘긴다).
- 각 페이지는 자기 자신을 canonical로 가진다.
- 외부 의존 모듈 없음(generate_event_pages.py와 달리 완전히 독립적) —
  PROJECT_ROOT를 __file__ 기준으로 동적으로 잡는다.

generate_route_pages.py와의 차이:
- JSON-LD가 Event가 아니라 Article이다(지리적 사건이 아니라 해설글).
- 본문이 summary_ko 하나가 아니라 claim_ko/rebuttal_ko(주장·반박) 또는
  body_ko(narrative, 맥락 서술) 중 하나로 구성된다.
- sources(출처), related(관련 콘텐츠) 섹션이 추가된다 — 값이 없는 항목은
  아예 섹션 자체를 생략한다(빈 헤더만 뜨는 것을 방지).
- "지도에서 보기" CTA는 lat/lng가 있을 때만 나온다(자료실 글 대부분은
  좌표가 상징적이거나 없을 수 있다).
- 출력 위치가 event/가 아니라 archive/{series-slug}/ 전용 디렉토리다 —
  "지도 사건"과 "자료실 글"의 URL 체계를 분리해둔다.
"""
import glob
import html as html_module
import json
import os
import re
import subprocess
import sys

# ── 경로 ──────────────────────────────────────────────────────────
BUILD_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BUILD_DIR)
ARCHIVE_DIR = os.path.join(PROJECT_ROOT, 'archive')
ARCHIVE_OUT_DIR = os.path.join(PROJECT_ROOT, 'archive')  # 데이터 폴더와 출력 폴더를 같은 이름으로 공유(정적 사이트라 무관 — .js와 .html 확장자로 구분됨)
EXTRACT_SCRIPT = os.path.join(BUILD_DIR, 'extract_archive.js')

SITE_ROOT = 'https://atlas.mkhz.kr'
PATH_PREFIX = '/maps/modern2' if os.path.basename(PROJECT_ROOT) == 'modern2' else ''

CATEGORY_LABELS = {
    'history': '역사', 'literature': '문학', 'philosophy': '철학',
    'art': '예술', 'architecture': '건축', 'religion': '종교',
}
SUBCATEGORY_LABELS = {
    'revisionism': '역사왜곡', 'era_study': '시대연구',
    'people_study': '인물연구', 'primary_sources': '사료읽기',
}
SOURCE_TYPE_LABELS = {
    'government': '정부·공공기관', 'court': '판결', 'paper': '논문',
    'book': '단행본', 'newspaper': '언론보도', 'interview': '인터뷰',
    'video': '영상', 'museum': '박물관·기념관', 'archive': '기록보존소',
}
RELATED_SECTION_LABELS = [
    ('events', '관련 사건'), ('people', '관련 인물'),
    ('archives', '관련 사료'), ('books', '추천 도서'),
    ('videos', '관련 영상'), ('artworks', '관련 미술작품'),
    ('films', '관련 영화'), ('music', '관련 음악'),
]


GA_MEASUREMENT_ID = 'G-9C05WN48C4'  # ATLAS GA4 속성 Measurement ID — index.html과 동일


def ga4_snippet():
    """자료실 정적 페이지용 GA4 스니펫. SPA(index.html)와 달리 이 페이지는
    실제로 새로 로드되는 독립된 페이지라 send_page_view를 끌 이유가
    없다 — 기본값(자동 페이지뷰)을 그대로 쓴다. analytics.js는 SPA 쪽
    trackEvent 등을 이 페이지에서도 재사용할 수 있게 함께 로드하되,
    지금 이 페이지 자체에서 그 함수를 호출하지는 않는다(추천도서·관련
    콘텐츠 클릭 트래킹은 다음 단계).
    analytics.js 경로는 PATH_PREFIX 기준 절대경로다 — modern2는
    /maps/modern2/js/analytics.js에 있고, 루트(근대)의 /js/analytics.js
    와는 다른 파일이다(각 지도가 자기 js/ 폴더를 갖는 기존 관례와 동일)."""
    analytics_src = f'{PATH_PREFIX}/js/analytics.js'
    return f'''<script async src="https://www.googletagmanager.com/gtag/js?id={GA_MEASUREMENT_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){{ dataLayer.push(arguments); }}
  gtag('js', new Date());
  gtag('config', '{GA_MEASUREMENT_ID}');
</script>
<script src="{analytics_src}"></script>'''


def esc(s):
    return html_module.escape(s or '', quote=True)


def slugify(series_id):
    return series_id.replace('_', '-')


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


def load_series():
    if not os.path.isdir(ARCHIVE_DIR):
        print(f'  (archive/ 디렉토리 없음 — 건너뜀: {ARCHIVE_DIR})')
        return []
    result = subprocess.run(
        ['node', EXTRACT_SCRIPT, ARCHIVE_DIR],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        print('❌ extract_archive.js 실패:', result.stderr)
        sys.exit(1)
    return json.loads(result.stdout)


def post_date_str(post):
    parts = [str(post.get('year'))]
    if post.get('month'):
        parts.append(f"{post['month']}월")
        if post.get('day'):
            parts[-1] = f"{post['month']}월 {post['day']}일"
    return ' '.join(parts)


def post_page_filename(post):
    return f"{post['id']}.html"


def post_href(series_slug, post_id):
    prefix = (PATH_PREFIX.strip('/') + '/') if PATH_PREFIX else ''
    return f'/{prefix}archive/{series_slug}/{post_id}'


def render_sources_section(sources):
    if not sources:
        return ''
    items = []
    for s in sources:
        type_label = SOURCE_TYPE_LABELS.get(s.get('type'), s.get('type') or '')
        name = s.get('name') or ''
        bits = [esc(name)]
        author = s.get('author')
        year = s.get('year')
        publisher = s.get('publisher')
        meta = ', '.join(x for x in [esc(author) if author else '', esc(publisher) if publisher else '', esc(str(year)) if year else ''] if x)
        if meta:
            bits.append(f'<span class="source-meta">({meta})</span>')
        label = f'<span class="source-type">[{esc(type_label)}]</span> ' if type_label else ''
        inner = label + ' '.join(bits)
        if s.get('url'):
            items.append(f'<li>{label}<a href="{esc(s["url"])}">{esc(name)}</a> {bits[1] if len(bits) > 1 else ""}</li>')
        else:
            items.append(f'<li>{inner}</li>')
    return f'<section class="post-sources"><h2>출처</h2><ul>{"".join(items)}</ul></section>'


def render_book_item(book):
    """books는 다른 related 카테고리와 달리 {isbn,title,author,publisher,
    affiliate_url,direct_url} 객체다 — 나중에 추천 링크→제휴 판매→직접
    판매로 이어질 것을 고려한 구조(지금은 두 url 다 비어있어도 된다).
    direct_url이 있으면 그쪽을 우선 링크, 없으면 affiliate_url, 둘 다
    없으면 링크 없이 텍스트만 표시한다."""
    title = book.get('title', '')
    author = book.get('author')
    publisher = book.get('publisher')
    meta = ', '.join(x for x in [author, publisher] if x)
    meta_html = f' <span class="book-meta">({esc(meta)})</span>' if meta else ''
    url = book.get('direct_url') or book.get('affiliate_url')
    label = f'<a href="{esc(url)}">{esc(title)}</a>' if url else esc(title)
    return f'<li>{label}{meta_html}</li>'


def render_related_section(related):
    if not related:
        return ''
    blocks = []
    for key, label in RELATED_SECTION_LABELS:
        items = related.get(key) or []
        if not items:
            continue
        if key == 'books':
            lis = ''.join(render_book_item(b) for b in items)
        else:
            lis = ''.join(
                f'<li><a href="{esc(it.get("url",""))}">{esc(it.get("title",""))}</a></li>' if it.get('url')
                else f'<li>{esc(it.get("title",""))}</li>'
                for it in items
            )
        blocks.append(f'<div class="related-group"><h3>{esc(label)}</h3><ul>{lis}</ul></div>')
    if not blocks:
        return ''
    return f'<section class="post-related"><h2>관련 콘텐츠</h2>{"".join(blocks)}</section>'


def render_post_body(post):
    """format에 따라 주장/반박 두 블록, 또는 서술(body_ko) 한 블록을 만든다."""
    if post.get('format') == 'claim_rebuttal':
        return (
            f'<section class="post-claim"><h2>주장</h2><p>{esc(post.get("claim_ko",""))}</p></section>'
            f'<section class="post-rebuttal"><h2>반박</h2><p>{esc(post.get("rebuttal_ko",""))}</p></section>'
        )
    return f'<section class="post-body"><p>{esc(post.get("body_ko",""))}</p></section>'


def post_plain_summary(post):
    """meta description/JSON-LD용 — claim_ko 또는 body_ko 중 있는 것."""
    if post.get('format') == 'claim_rebuttal':
        return post.get('claim_ko') or ''
    return post.get('body_ko') or ''


def render_post_page(series, post, series_slug, prev_post, next_post, out_path):
    category_label = CATEGORY_LABELS.get(series.get('category'), series.get('category') or '')
    subcat_label = SUBCATEGORY_LABELS.get(series.get('subcategory'), series.get('subcategory') or '')
    title = f"{post['title_ko']} — {series['name']} | ATLAS by MKHZ"
    description = make_description(post_plain_summary(post))
    page_url = f"{SITE_ROOT}{PATH_PREFIX}/archive/{series_slug}/{post['id']}"
    date_str = post_date_str(post)

    ld_article = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post['title_ko'],
        "description": description,
        "datePublished": str(post.get('year')),
        "articleSection": f"{category_label} · {subcat_label}".strip(' ·'),
        "url": page_url,
    }
    ld_breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "ATLAS", "item": SITE_ROOT + "/"},
            {"@type": "ListItem", "position": 2, "name": "자료실", "item": f"{SITE_ROOT}{PATH_PREFIX}/?nav=archive"},
            {"@type": "ListItem", "position": 3, "name": category_label},
            {"@type": "ListItem", "position": 4, "name": series['name'], "item": f"{SITE_ROOT}{PATH_PREFIX}/archive/{series_slug}"},
            {"@type": "ListItem", "position": 5, "name": post['title_ko'], "item": page_url},
        ],
    }

    nav_links = []
    if prev_post:
        nav_links.append(f'<a href="{post_href(series_slug, prev_post["id"])}" rel="prev">← {esc(prev_post["title_ko"])}</a>')
    if next_post:
        nav_links.append(f'<a href="{post_href(series_slug, next_post["id"])}" rel="next">{esc(next_post["title_ko"])} →</a>')

    body_html = render_post_body(post)
    sources_html = render_sources_section(post.get('sources'))
    related_html = render_related_section(post.get('related'))

    # card_ref(같은 사건이 이미 지도 데이터에 실존하는 경우)가 있으면
    # ?event=로 그 사건 카드로 정확히 이동시킨다(app.js의 기존
    # navigateToEvent 딥링크 재사용). card_map이 'root'면 그 카드가
    # 근대(1876~1945) 지도 쪽 데이터라는 뜻이므로 링크도 그쪽 사이트
    # 루트로 보낸다(자료실 자신은 근현대/modern2 쪽에 있다) — 기본값은
    # 자기 자신(modern2). card_ref가 아예 없으면(자료실 글 대부분이
    # 여기 해당) ?lat=&lng=&year=로 좌표와 연도를 함께 넘겨 지도를 그
    # 위치·시점으로 이동만 시킨다(app.js가 연도를 근현대 유효 범위
    # 1945~1993으로 clamp해서 처리 — 자료실 글은 대부분 1993년 이후라
    # 그대로 넘기면 범위 밖이라서다).
    map_cta_html = ''
    if post.get('card_ref'):
        if post.get('card_map') == 'root':
            map_cta_url = f"{SITE_ROOT}/?event={post['card_ref']}"
        else:
            map_cta_url = f"{SITE_ROOT}{PATH_PREFIX}/?event={post['card_ref']}"
        map_cta_html = f'<p class="map-cta"><a href="{map_cta_url}">지도에서 관련 사건 보기</a></p>'
    elif post.get('lat') is not None and post.get('lng') is not None:
        year_qs = f"&year={post['year']}" if post.get('year') is not None else ''
        map_cta_url = f"{SITE_ROOT}{PATH_PREFIX}/?lat={post['lat']}&lng={post['lng']}{year_qs}"
        map_cta_html = f'<p class="map-cta"><a href="{map_cta_url}">지도에서 관련 지역 보기</a></p>'

    html_out = f'''<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#f7f4ef">
<link rel="stylesheet" href="{PATH_PREFIX}/css/archive-article.css">
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
<script type="application/ld+json">{json.dumps(ld_article, ensure_ascii=False)}</script>
<script type="application/ld+json">{json.dumps(ld_breadcrumb, ensure_ascii=False)}</script>
{ga4_snippet()}
</head>
<body>
<nav class="breadcrumb"><a href="{SITE_ROOT}/">ATLAS</a> &rsaquo; 자료실 &rsaquo; {esc(category_label)} &rsaquo; <a href="{SITE_ROOT}{PATH_PREFIX}/archive/{series_slug}">{esc(series['name'])}</a> &rsaquo; {esc(post['title_ko'])}</nav>
<article>
<h1>{esc(post['title_ko'])}</h1>
<p class="event-meta">{esc(date_str)}{' · ' + esc(post['place_ko']) if post.get('place_ko') else ''}</p>
{body_html}
{sources_html}
{related_html}
<section class="series-context"><p>이 글은 <a href="{SITE_ROOT}{PATH_PREFIX}/archive/{series_slug}">{esc(series['name'])}</a> 시리즈의 한 편입니다.</p></section>
{f'<nav class="wp-pager">{" | ".join(nav_links)}</nav>' if nav_links else ''}
{map_cta_html}
</article>
</body>
</html>'''

    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(html_out)


def render_series_landing_page(series, series_slug, out_path):
    category_label = CATEGORY_LABELS.get(series.get('category'), series.get('category') or '')
    title = f"{series['name']} | ATLAS by MKHZ 자료실"
    description = make_description(series.get('tagline', ''))
    page_url = f"{SITE_ROOT}{PATH_PREFIX}/archive/{series_slug}"

    items = []
    ld_list_items = []
    for i, post in enumerate(series['posts'], start=1):
        href = post_href(series_slug, post['id'])
        date_str = post_date_str(post)
        items.append(
            f'<li><a href="{href}">{esc(post["title_ko"])}</a> '
            f'<span class="wp-date">({esc(date_str)})</span></li>'
        )
        ld_list_items.append({
            "@type": "ListItem", "position": i, "name": post['title_ko'],
            "url": f"{SITE_ROOT}{href}",
        })

    ld_itemlist = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": series['name'],
        "description": description,
        "url": page_url,
        "numberOfItems": len(series['posts']),
        "itemListElement": ld_list_items,
    }
    ld_breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "ATLAS", "item": SITE_ROOT + "/"},
            {"@type": "ListItem", "position": 2, "name": "자료실", "item": f"{SITE_ROOT}{PATH_PREFIX}/?nav=archive"},
            {"@type": "ListItem", "position": 3, "name": category_label},
            {"@type": "ListItem", "position": 4, "name": series['name'], "item": page_url},
        ],
    }

    html_out = f'''<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#f7f4ef">
<link rel="stylesheet" href="{PATH_PREFIX}/css/archive-article.css">
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
{ga4_snippet()}
</head>
<body>
<nav class="breadcrumb"><a href="{SITE_ROOT}/">ATLAS</a> &rsaquo; 자료실 &rsaquo; {esc(category_label)} &rsaquo; {esc(series['name'])}</nav>
<article>
<h1>{esc(series['name'])}</h1>
<p class="event-meta">{esc(series.get('period',''))}</p>
<p class="summary">{esc(series.get('tagline',''))}</p>
<section class="series-list"><h2>글 목록 ({len(series['posts'])}편)</h2><ol class="wp-list">{''.join(items)}</ol></section>
</article>
</body>
</html>'''

    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(html_out)


def main():
    all_series = load_series()
    if not all_series:
        print('생성할 자료실 시리즈가 없습니다.')
        return

    total_landing = 0
    total_post_pages = 0

    for series in all_series:
        series_slug = slugify(series['id'])
        out_dir = os.path.join(ARCHIVE_OUT_DIR, series_slug)
        os.makedirs(out_dir, exist_ok=True)

        posts = series['posts']
        for idx, post in enumerate(posts):
            prev_post = posts[idx - 1] if idx > 0 else None
            next_post = posts[idx + 1] if idx < len(posts) - 1 else None
            out_path = os.path.join(out_dir, post_page_filename(post))
            render_post_page(series, post, series_slug, prev_post, next_post, out_path)
            total_post_pages += 1

        out_path = os.path.join(out_dir, 'index.html')
        render_series_landing_page(series, series_slug, out_path)
        total_landing += 1

        print(f'  ✓ {series["id"]}: 랜딩 1개, 글 {len(posts)}개')

    print(f'\n자료실 페이지 생성 완료: 랜딩 {total_landing}개, 글 {total_post_pages}개')


if __name__ == '__main__':
    main()
