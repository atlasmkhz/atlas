#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
generate_archive_pages.py (contemporary)
archive/*.js 를 읽어 자료실 정적 페이지를 생성한다:
  (1) 시리즈 랜딩 페이지  /archive/{series-slug}/index.html
  (2) 글 페이지          /archive/{series-slug}/{post_id}.html

maps/modern2/build/generate_archive_pages.py를 이식한 것이다. 이식하며
바뀐 부분만 적는다(나머지는 원본과 동일한 원칙):

1. PATH_PREFIX/CARD_MAP_PREFIX — modern2 기준('/maps/modern2'가 자기
   자신)이었던 걸 contemporary 기준('/maps/contemporary'가 자기 자신)
   으로 뒤집었다.
2. format:'case_tracking' 지원 추가 — 원본은 claim_rebuttal(주장/반박)과
   기본값(body_ko 서술)만 알았다. docs/power_accountability_roadmap.md
   §3에서 설계한 "권력과 책임" 사건카드 포맷(body_ko + stages[] + legacy_ko)
   은 원본 스크립트로 빌드하면 stages/legacy_ko가 통째로 사라지고
   body_ko만 나왔을 것 — render_post_body()에 분기를 추가하고,
   render_stages_section()을 새로 만들어 해결했다.
3. 이식 과정에서 archive/power_accountability.js의 데이터 버그 2건도
   함께 발견해 고쳤다(파일 자체 주석 참고): sources[]가
   title/kind/date라는 임의 필드명을 썼던 것 → 이 스크립트가 실제로
   읽는 type/name/author/publisher/year/url로 수정, related.people/
   events가 문자열 배열이었던 것(render_related_section이 .get()을
   호출하므로 실제 빌드하면 AttributeError) → {title,url} 객체로 수정.
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
PATH_PREFIX = '/maps/contemporary' if os.path.basename(PROJECT_ROOT) == 'contemporary' else ''

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
    """자료실 정적 페이지용 GA4 스니펫. analytics.js 경로는 PATH_PREFIX
    기준 절대경로다 — contemporary는 /maps/contemporary/js/analytics.js에
    있다(각 지도가 자기 js/ 폴더를 갖는 기존 관례와 동일)."""
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


def render_stages_section(stages):
    """format:'case_tracking' 전용 — 수사~판결~사면 등 절차를 순서대로
    보여준다. stage/date/institution/detail/result 중 없는 필드는
    조용히 생략한다(로드맵 §3: 단계마다 필드가 다 채워지지 않을 수 있다,
    예: 수사개시 단계엔 result가 보통 없음)."""
    if not stages:
        return ''
    items = []
    for s in stages:
        stage_name = esc(s.get('stage', ''))
        date = esc(s.get('date', '') or '')
        institution = esc(s.get('institution', '') or '')
        detail = s.get('detail')
        result = s.get('result')
        head = f'<span class="stage-date">{date}</span><span class="stage-name">{stage_name}</span>'
        if institution:
            head += f' <span class="stage-institution">— {institution}</span>'
        detail_html = f'<span class="stage-detail">{esc(detail)}</span>' if detail else ''
        result_html = f'<span class="stage-result">{esc(result)}</span>' if result else ''
        items.append(f'<li>{head}{detail_html}{result_html}</li>')
    return f'<section class="post-stages"><h2>사법·행정 처리 경과</h2><ol>{"".join(items)}</ol></section>'


def render_legacy_section(legacy_ko):
    """format:'case_tracking' 전용 — body_ko(사실관계)와 분리된 역사적
    평가. 로드맵 §0 원칙(사실과 평가를 분리한다)을 페이지 레벨에서
    시각적으로도 분리한다(.post-legacy는 옅은 배경색 박스로 렌더링,
    css/archive-article.css 참고)."""
    if not legacy_ko:
        return ''
    return f'<section class="post-legacy"><h2>역사적 평가</h2><p>{esc(legacy_ko)}</p></section>'


def render_post_body(post):
    """format에 따라 (1) 주장/반박, (2) 사실관계+처리경과+평가(case_tracking),
    (3) 서술(body_ko) 한 블록 중 하나를 만든다."""
    fmt = post.get('format')
    if fmt == 'claim_rebuttal':
        return (
            f'<section class="post-claim"><h2>주장</h2><p>{esc(post.get("claim_ko",""))}</p></section>'
            f'<section class="post-rebuttal"><h2>반박</h2><p>{esc(post.get("rebuttal_ko",""))}</p></section>'
        )
    if fmt == 'case_tracking':
        body_html = f'<section class="post-body"><p>{esc(post.get("body_ko",""))}</p></section>'
        stages_html = render_stages_section(post.get('stages'))
        legacy_html = render_legacy_section(post.get('legacy_ko'))
        return body_html + stages_html + legacy_html
    return f'<section class="post-body"><p>{esc(post.get("body_ko",""))}</p></section>'


def post_plain_summary(post):
    """meta description/JSON-LD용 — claim_ko 또는 body_ko 중 있는 것.
    case_tracking도 body_ko를 쓴다(사실관계 요약이 설명문으로 적합,
    legacy_ko는 평가라 메타 설명엔 안 쓴다)."""
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
    # navigateToEvent 딥링크 재사용). card_map으로 어느 지도 소속인지
    # 표시한다: 'root'는 근대(1876~1945), 'modern2'는 근현대(1945~1993),
    # 없으면 기본값은 자기 자신(자료실이 있는 현대/contemporary).
    # card_ref가 아예 없으면 ?lat=&lng=&year=로 좌표와 연도만 넘겨
    # 지도를 그 위치·시점으로 이동만 시킨다.
    CARD_MAP_PREFIX = {
        'root': '',
        'modern2': '/maps/modern2',
        'contemporary': PATH_PREFIX,
    }
    map_cta_html = ''
    if post.get('card_ref'):
        map_prefix = CARD_MAP_PREFIX.get(post.get('card_map'), PATH_PREFIX)
        map_cta_url = f"{SITE_ROOT}{map_prefix}/?event={post['card_ref']}"
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
