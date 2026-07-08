# -*- coding: utf-8 -*-
"""
generate_event_pages.py (maps/ancient 전용)
고대(삼국시대~남북국시대, 기원전 37~936) Event 데이터를 읽어
maps/ancient/event/{slug}.html 정적 페이지를 생성한다.

이 지도는 medieval1·2(왕 파일 단위)와도 다르다 — 고대는 여러 나라가
동시에 존재해 "왕 하나 = 챕터 하나"가 성립하지 않으므로, "역사적
전환점으로 나눈 시기"인 블록 단위로 데이터가 조직된다
(data/block1.js → EVENTS_BLOCK1 등, js/blocks.js의 BLOCKS 배열 참고).
카드에는 다른 지도에 없는 `nation` 필드(goguryeo/baekje/silla/gaya/
balhae/hubaekje/taebong/goryeo)가 추가로 있다.
로직 대부분은 medieval1·2 생성기와 동일하되(같은 방식으로 자체
내장·독립 실행), 왕대(REIGNS) 대신 블록(BLOCKS)을 파싱하고, 기원전
연도(음수 year, id의 "bc37" 표기)를 다뤄야 한다는 점만 다르다.

원칙:
- 특정 나라·연도를 하드코딩하지 않고 data/ 폴더와 js/blocks.js를
  동적으로 읽어 처리한다. 새 블록의 데이터 파일을 추가해도 이
  스크립트를 고칠 필요가 없다 — 그냥 다시 실행하면 된다.
- 기존 지도 엔진(js/*, index.html)은 건드리지 않는다.
- 데이터는 data/*.js를 Source of Truth로 그대로 사용한다(중복 관리 없음).
- 각 페이지는 자기 자신을 canonical로 가진다.
- JSON-LD는 Event + BreadcrumbList.
- 지도 하이드레이션(mapShell.js)은 이 지도의 shellUrl
  ('/maps/ancient/index.html')을 명시적으로 넘겨서 호출한다.

사용법:
    cd maps/ancient/build
    python3 generate_event_pages.py
(항상 이 스크립트가 있는 위치를 기준으로 상대경로를 계산하므로, 다른
위치에서 실행해도 무방하다.)
"""
import re
import os
import sys
import json
import glob
import html as html_module
import unicodedata

BUILD_DIR = os.path.dirname(os.path.abspath(__file__))
MAP_DIR = os.path.dirname(BUILD_DIR)               # .../maps/ancient
PROJECT_ROOT = os.path.dirname(os.path.dirname(MAP_DIR))  # 사이트 루트

SITE_ROOT = 'https://atlas.mkhz.kr'
MAP_URL_PATH = '/maps/ancient/index.html'        # 이 지도의 shellUrl
DATA_DIR = os.path.join(MAP_DIR, 'data')
OUT_DIR = os.path.join(MAP_DIR, 'event')
BLOCKS_JS_PATH = os.path.join(MAP_DIR, 'js', 'blocks.js')

DYNASTY_LABEL = '고대 (삼국시대)'


def esc(s):
    return html_module.escape(s or '', quote=True)


# ── 슬러그 생성 (자체 내장 — generate_slugs.py 미사용) ──────────────
def slugify(text, max_len=42):
    """title_en에서 URL 슬러그를 만든다. em dash(—)나 콜론이 있으면
    그 앞부분(보통 사건의 핵심 제목)만 사용해 슬러그를 짧게 유지한다."""
    text = re.split(r'[—:]', text)[0].strip()
    text = unicodedata.normalize('NFKD', text)
    text = text.encode('ascii', 'ignore').decode('ascii')
    text = text.lower()
    text = re.sub(r"[’']", '', text)
    text = re.sub(r'[^a-z0-9]+', '-', text).strip('-')
    text = re.sub(r'-+', '-', text)
    if len(text) > max_len:
        truncated = text[:max_len]
        last_dash = truncated.rfind('-')
        text = truncated[:last_dash] if last_dash > 10 else truncated
    return text


def format_year_for_slug(year):
    """음수(기원전) 연도는 id 표기 관례(political_bc37_01 등)와 맞춰
    'bc37' 형태로 슬러그에 반영한다. 기원후는 그대로 숫자."""
    return f'bc{abs(year)}' if year < 0 else str(year)


def assign_slugs(cards):
    """{year}-{slug} 형태로 슬러그를 만들고, 충돌하면 -2, -3 …을 붙인다."""
    used = {}
    slug_map = {}
    for c in cards:
        base = f"{format_year_for_slug(c['year'])}-{slugify(c['title_en'])}"
        slug = base
        n = 2
        while slug in used and used[slug] != c['id']:
            slug = f"{base}-{n}"
            n += 1
        used[slug] = c['id']
        slug_map[c['id']] = slug
    return slug_map


# ── 블록(BLOCKS) 파싱 — js/blocks.js를 그대로 읽는다(값 복제 없음) ──
def load_blocks():
    content = open(BLOCKS_JS_PATH, encoding='utf-8').read()
    blocks = []
    for m in re.finditer(
        r"\{\s*order:(\d+),\s*name:'([^']*)',"
        r"\s*start_year:(-?\d+),\s*end_year:(-?\d+)", content):
        blocks.append({
            'order': int(m.group(1)),
            'name': m.group(2),
            'start_year': int(m.group(3)),
            'end_year': int(m.group(4)),
        })
    blocks.sort(key=lambda b: b['order'])
    return blocks


def find_block(blocks, year):
    for i, b in enumerate(blocks):
        upper = blocks[i + 1]['start_year'] if i + 1 < len(blocks) else b['end_year'] + 1
        if b['start_year'] <= year < upper:
            return b
    return None


def format_year_display(year):
    """브레드크럼·본문에 쓰는 사람이 읽는 연도 표기. 기원전은
    '기원전 37년', 기원후는 '313년'처럼 표기한다."""
    return f'기원전 {abs(year)}' if year < 0 else str(year)


def build_breadcrumb(card, blocks):
    block = find_block(blocks, card['year'])
    if block:
        block_label = (f"{block['name']}({format_year_display(block['start_year'])}"
                        f"~{format_year_display(block['end_year'])})")
    else:
        block_label = f"{format_year_display(card['year'])}년"
    return ['ATLAS', DYNASTY_LABEL, block_label, card['title_ko']]


# ── 카드 파싱 (근대 생성기와 동일한 정규식 방식 — data/*.js는 두 지도
#    모두 같은 필드 포맷을 쓰므로 로직을 그대로 재사용할 수 있다) ──
def load_all_cards():
    cards = []
    for path in sorted(glob.glob(os.path.join(DATA_DIR, '*.js'))):
        content = open(path, encoding='utf-8').read()
        starts = [m.start() for m in re.finditer(r"^\s*\{\s*id:'", content, re.M)]
        blocks = []
        for i, s in enumerate(starts):
            e = starts[i + 1] if i + 1 < len(starts) else len(content)
            blocks.append(content[s:e])
        for b in blocks:
            m_id = re.search(r"id:'([a-z_0-9]+)'", b)
            m_tko = re.search(r"title_ko:'((?:[^'\\]|\\.)*)'", b)
            m_ten = re.search(r"title_en:'((?:[^'\\]|\\.)*)'", b)
            m_year = re.search(r'year:(-?\d+)', b)
            m_summary = re.search(r"summary_ko:'((?:[^'\\]|\\.)*)'", b)
            m_people = re.search(r'people:\[(.*?)\]', b)
            m_place = re.search(r"place_ko:'((?:[^'\\]|\\.)*)'", b)
            m_lat = re.search(r'lat:([\d.\-]+)', b)
            m_lng = re.search(r'lng:([\d.\-]+)', b)
            m_conn = re.search(r'connections:\[(.*?)\]', b)
            m_sources = re.search(r'sources:\[(.*?)\]', b, re.S)
            m_month = re.search(r'month:(\d+|null)', b)
            m_day = re.search(r'day:(\d+|null)', b)
            if not (m_id and m_ten and m_year):
                continue

            def dec(text):
                return re.sub(r'\\u([0-9a-fA-F]{4})',
                               lambda m: chr(int(m.group(1), 16)), text)

            cards.append({
                'id': m_id.group(1),
                'title_ko': dec((m_tko.group(1) if m_tko else '').replace("\\'", "'")),
                'title_en': dec(m_ten.group(1).replace("\\'", "'")),
                'year': int(m_year.group(1)),
                'month': (None if not m_month or m_month.group(1) == 'null' else int(m_month.group(1))),
                'day': (None if not m_day or m_day.group(1) == 'null' else int(m_day.group(1))),
                'summary_ko': dec((m_summary.group(1) if m_summary else '').replace("\\'", "'")),
                'people': re.findall(r"'([^']*)'", m_people.group(1)) if m_people else [],
                'place_ko': dec((m_place.group(1) if m_place else '').replace("\\'", "'")),
                'lat': float(m_lat.group(1)) if m_lat else None,
                'lng': float(m_lng.group(1)) if m_lng else None,
                'connections': re.findall(r"'([^']*)'", m_conn.group(1)) if m_conn else [],
                'sources': re.findall(r"'([^']*)'", m_sources.group(1)) if m_sources else [],
            })
    return cards


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


# ── 지도 하이드레이션 블록 (js/mapShell.js 재사용, shellUrl만 이 지도로) ──
def render_map_hydration_block(cta_href):
    return f"""<script src="/js/mapShell.js"></script>
<script>
(function () {{
  var cta = document.getElementById('mapCta');
  var article = document.querySelector('article');
  if (!cta) return;

  cta.addEventListener('click', function (ev) {{
    if (typeof window.ATLAS_loadMapShell !== 'function') return; // 폴백: 원래 링크 그대로 이동
    ev.preventDefault();

    var eventId = new URL(cta.href, location.href).searchParams.get('event');

    var overlay = document.createElement('div');
    overlay.id = 'mapLoadingOverlay';
    overlay.setAttribute('style',
      'position:fixed;inset:0;background:#1a1612;color:#e8e0d0;' +
      'display:flex;align-items:center;justify-content:center;' +
      'font-family:-apple-system,BlinkMacSystemFont,"Malgun Gothic",sans-serif;' +
      'font-size:16px;z-index:9999;text-align:center;padding:24px;');
    overlay.textContent = '지도를 불러오는 중입니다…';
    document.body.appendChild(overlay);
    if (article) article.style.display = 'none';

    window.ATLAS_loadMapShell({{ shellUrl: '{MAP_URL_PATH}' }}).then(function () {{
      if (typeof map !== 'undefined' && map.invalidateSize) map.invalidateSize();
      if (typeof navigateToEvent === 'function' && eventId) navigateToEvent(eventId);
      overlay.remove();
    }}).catch(function (err) {{
      console.error('지도 로드 실패:', err);
      overlay.innerHTML = '';
      var msg = document.createElement('div');
      msg.textContent = '지도를 불러오지 못했습니다.';
      var retry = document.createElement('a');
      retry.href = cta.href;
      retry.textContent = '지도 페이지로 이동';
      retry.style.cssText = 'display:inline-block;margin-top:16px;color:#c8a827;';
      overlay.appendChild(msg);
      overlay.appendChild(retry);
      if (article) article.style.display = '';
    }});
  }});
}})();
</script>"""


def render_html(card, slug, breadcrumb, related_cards, slug_map):
    url = f'{SITE_ROOT}/maps/ancient/event/{slug}'
    title_tag = f"{card['title_ko']} ({card['year']}) | ATLAS by MKHZ"
    description = make_description(card['summary_ko'])
    hero_url = f'{SITE_ROOT}/assets/images/og-image.jpg'
    map_cta_href = f"{SITE_ROOT}{MAP_URL_PATH}?event={card['id']}"

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
            items.append(f'<li><a href="/maps/ancient/event/{r_slug}">{esc(rc["title_ko"])} ({rc["year"]})</a></li>')
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

    date_str = f"{format_year_display(card['year'])}년"
    if card['month'] is not None:
        date_str += f" {card['month']}월"
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
<p class="map-cta"><a id="mapCta" href="{map_cta_href}">이 사건을 지도에서 보기</a></p>
</article>

{render_map_hydration_block(map_cta_href)}
</body>
</html>"""


def main():
    cards = load_all_cards()
    print(f"총 {len(cards)}건 로드")

    blocks = load_blocks()
    print(f"블록 {len(blocks)}개 로드 (js/blocks.js)")

    slug_map = assign_slugs(cards)
    cards_by_id = {c['id']: c for c in cards}

    os.makedirs(OUT_DIR, exist_ok=True)
    # 이전 실행분 정리(삭제된 카드의 낡은 페이지가 남아있지 않도록) —
    # 이 디렉토리는 전적으로 이 스크립트가 관리하므로 안전하다.
    for old in glob.glob(os.path.join(OUT_DIR, '*.html')):
        os.remove(old)

    generated = 0
    for c in cards:
        slug = slug_map[c['id']]
        breadcrumb = build_breadcrumb(c, blocks)
        related = [cards_by_id[cid] for cid in c['connections'] if cid in cards_by_id]
        html_out = render_html(c, slug, breadcrumb, related, slug_map)
        out_path = os.path.join(OUT_DIR, f'{slug}.html')
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(html_out)
        generated += 1

    print(f"생성 완료: {generated}건 -> {OUT_DIR}")


if __name__ == '__main__':
    main()
