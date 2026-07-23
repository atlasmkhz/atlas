#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
generate_archive_pages.py (통합/루트)
content/archive/*.js 를 읽어 자료실 정적 페이지를 생성한다:
  (1) 시리즈 랜딩 페이지  /archive/{series-slug}/index.html
  (2) 글 페이지          /archive/{series-slug}/{post_id}.html

이 스크립트는 원래 maps/modern2/build/에 있다가 maps/contemporary/build/에
이식됐던 두 버전을 통합해 루트로 옮긴 것이다. 자료실은 근대·근현대·현대
(그리고 앞으로 생길 선사·고대·중세1·중세2까지) 어느 지도 구분도 없이
하나로 운영된다 — content/youtube_videos.js(유튜브 갤러리)가 이미 이
방식으로 모든 지도에 공유되고 있는 것과 같은 패턴이다.

지도별 버전과 달라진 점:
- ARCHIVE_DIR이 content/archive(공유 소스)를 가리킨다. 더 이상 각
  지도 폴더 밑 archive/가 소스가 아니다.
- ARCHIVE_OUT_DIR이 사이트 루트의 archive/ 하나다. PATH_PREFIX 개념이
  없다 — 모든 페이지가 항상 도메인 루트 기준 경로다.
- card_ref/card_map CTA는 여전히 유효하다: 어느 지도의 사건인지에 따라
  ROOT_MAP_PREFIX로 그 지도의 절대경로를 만든다(이건 "이 시리즈가 어느
  지도 소속인가"가 아니라 "이 글이 어느 지도의 사건카드를 가리키는가"
  이므로 시리즈 통합과는 별개 개념 — 계속 필요하다).
- format:'case_tracking' 지원(stages[]/legacy_ko)을 포함한다
  (docs/power_accountability_roadmap.md §3).

content/archive/ 아래에 새 시리즈 파일을 추가하면(반드시 파일 끝에서
window.registerArchiveSeries(...)를 호출해야 한다) 이 스크립트를 다시
실행하는 것만으로 자동 반영된다 — 코드를 고칠 필요 없음.
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
PROJECT_ROOT = os.path.dirname(BUILD_DIR)  # atlas/
ARCHIVE_DIR = os.path.join(PROJECT_ROOT, 'content', 'archive')
ARCHIVE_OUT_DIR = os.path.join(PROJECT_ROOT, 'archive')
EXTRACT_SCRIPT = os.path.join(BUILD_DIR, 'extract_archive.js')

SITE_ROOT = 'https://atlas.mkhz.kr'

CATEGORY_LABELS = {
    'history': '역사', 'world_history': '세계사', 'literature': '문학',
    'philosophy': '철학', 'art': '예술', 'architecture': '건축', 'religion': '종교',
    'biographies': '인물열전',
}
SUBCATEGORY_LABELS = {
    'revisionism': '역사왜곡', 'era_study': '시대연구',
    'people_study': '인물연구', 'primary_sources': '사료읽기',
    # 세계사(world_history) 카테고리 — 2026-07-16 3갈래 재편(B안)
    # 문명사(만든 것)·정신사(믿고 사유한 것)·격변사(겨루고 뒤엎은 것).
    # 구 키(science_history/art_history/war_history)는 이제 갈래가 아니라
    # 각 갈래 안의 개별 시리즈 주제로 내려간다.
    'civilization_history': '문명사', 'spirit_history': '정신사',
    'upheaval_history': '격변사', 'world_routes': '세계사 루트',
    # 인물열전(biographies) 카테고리 — 2026-07-16 오픈
    'korea_figures': '한국사 인물', 'world_figures': '세계사 인물',
    # 문학(literature) 카테고리 — 2026-07-22 오픈. 한국 고전문학사 시대순 5갈래.
    'ancient_literature': '상고·삼국', 'silla_literature': '통일신라',
    'goryeo_literature': '고려', 'joseon_early_literature': '조선전기',
    'joseon_late_literature': '조선후기',
    'hanmun_literature': '한문학',
    # (구 라벨 — 하위호환용으로 남겨둠)
    'science_history': '과학사', 'art_history': '미술사', 'war_history': '전쟁사',
}
SOURCE_TYPE_LABELS = {
    'government': '정부·공공기관', 'court': '판결', 'paper': '논문',
    'book': '단행본', 'newspaper': '언론보도', 'interview': '인터뷰',
    'video': '영상', 'museum': '박물관·기념관', 'archive': '기록보존소',
}
RELATED_SECTION_LABELS = [
    ('events', '관련 사건'), ('people', '관련 인물'),
    # 2026-07-22: 'routes' 추가. 고전문학사 시리즈(문학 카테고리 5갈래)와
    # 기존 근현대문학 루트 3부작을 상호 연결하기 위한 섹션이다.
    # 고전 자료실 글 → 근현대 문학 루트로 나가는 통로가 되고,
    # 루트 쪽에서는 각 루트 파일의 related_archives가 반대 방향을 담당한다.
    ('routes', '관련 루트'),
    ('archives', '관련 사료'), ('books', '추천 도서'),
    ('videos', '관련 영상'), ('artworks', '관련 미술작품'),
    ('films', '관련 영화'), ('music', '관련 음악'),
]

# 자료실 정적 페이지는 항상 정확히 사이트 루트에서 2단계 아래
# (archive/{series-slug}/{file})에 생성된다 — 그래서 루트까지 돌아가는
# 상대경로가 고정값이다. 예전엔 절대경로(/css/..., https://atlas.mkhz.kr/...)
# 를 썼는데, 이러면 file://로 로컬에서 열었을 때 CSS는 컴퓨터의 실제
# 파일시스템 루트를 찾다 실패하고(그래서 꾸며지지 않은 "개발자 페이지"
# 처럼 보임), breadcrumb의 "ATLAS" 링크는 진짜 배포된 라이브 사이트로
# 이동해버린다("예전 버전으로 돌아간다"는 증상의 정체). 배포 후에도
# 상대경로는 똑같이 정확하게 동작하므로, 로컬/배포 두 경우 다 되는
# 상대경로로 통일한다. canonical/og:url/JSON-LD의 "url"처럼 메타데이터
# 성격이라 사람이 클릭하지 않는 곳만 SITE_ROOT 절대경로를 유지한다
# (그게 SEO 정석이기도 하다).
ROOT_PREFIX = '../../'

# 사건카드(card_ref)가 속한 지도별 상대경로 prefix. archive 페이지
# 기준(ROOT_PREFIX)에서 각 지도의 index.html까지 가는 경로다.
CARD_MAP_PREFIX = {
    'root': f'{ROOT_PREFIX}map.html',
    'prehistory': f'{ROOT_PREFIX}maps/prehistory/index.html',
    'ancient': f'{ROOT_PREFIX}maps/ancient/index.html',
    'medieval1': f'{ROOT_PREFIX}maps/medieval1/index.html',
    'medieval2': f'{ROOT_PREFIX}maps/medieval2/index.html',
    'modern2': f'{ROOT_PREFIX}maps/modern2/index.html',
    'contemporary': f'{ROOT_PREFIX}maps/contemporary/index.html',
}

GA_MEASUREMENT_ID = 'G-9C05WN48C4'  # ATLAS GA4 속성 Measurement ID — index.html과 동일

# ── 연작 시리즈 묶음 ──────────────────────────────────────────
# "권력과 책임" 4부작(처벌의 기록·권력과 시간·잣대의 비대칭·수술대 위의
# 검찰)은 서로 인용하며 하나의 서사를 이루지만, 자료실 목록에서는 다른
# 독립 시리즈들과 같은 층위에 흩어져 보여 몰입이 끊긴다는 지적이 있었다
# (2026-07 두목님 피드백). 이를 보완하기 위해 이 그룹에 속한 시리즈의
# 모든 페이지(글+랜딩)에 "이 시리즈는 N부작입니다" 내비게이션 바를 자동
# 삽입한다. 새 시리즈를 이 서사에 추가하려면 아래 리스트에 (id, slug,
# 짧은이름)만 추가하면 된다 — 다른 코드는 손댈 필요 없다.
STORY_GROUP_HUB_SLUG = 'power-and-accountability'
STORY_GROUP_HUB_NAME = '책임의 계보'
STORY_GROUP = [
    ('punishment_records',       'punishment-records',        '1부 · 처벌의 기록'),
    ('power_and_time',           'power-and-time',            '2부 · 권력과 시간'),
    ('unequal_measures',         'unequal-measures',          '3부 · 잣대의 비대칭'),
    ('prosecutorial_reckoning',  'prosecutorial-reckoning',    '4부 · 수술대 위의 검찰'),
]
STORY_GROUP_IDS = {sid for sid, _, _ in STORY_GROUP}


def render_story_group_nav(current_series_id):
    """current_series_id가 STORY_GROUP에 속하면 4부작 내비게이션 바 HTML을
    반환하고, 아니면 빈 문자열을 반환한다. 이 함수를 호출하는 모든 페이지
    (글 페이지·시리즈 랜딩 페이지)는 전부 archive/{series_slug}/ 아래에
    있으므로, 형제 시리즈 폴더로 가려면 한 단계만 올라가면 된다
    ('../{other_slug}/index.html') — ROOT_PREFIX(사이트 루트까지)와는
    다른 깊이다."""
    if current_series_id not in STORY_GROUP_IDS:
        return ''
    items = []
    items.append(f'<a href="../{STORY_GROUP_HUB_SLUG}/index.html">{esc(STORY_GROUP_HUB_NAME)} 전체보기</a>')
    for sid, slug, label in STORY_GROUP:
        href = f'../{slug}/index.html'
        if sid == current_series_id:
            items.append(f'<strong>{esc(label)}</strong>')
        else:
            items.append(f'<a href="{href}">{esc(label)}</a>')
    return '<nav class="story-group-nav"><p>' + ' · '.join(items) + '</p></nav>'


def ga4_snippet():
    """자료실 정적 페이지용 GA4 스니펫. analytics.js는 상대경로로 연결한다
    (위 ROOT_PREFIX 설명 참고)."""
    return f'''<script async src="https://www.googletagmanager.com/gtag/js?id={GA_MEASUREMENT_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){{ dataLayer.push(arguments); }}
  gtag('js', new Date());
  gtag('config', '{GA_MEASUREMENT_ID}');
</script>
<script src="{ROOT_PREFIX}js/analytics.js"></script>'''


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
        print(f'  (content/archive/ 디렉토리 없음 — 건너뜀: {ARCHIVE_DIR})')
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
    # 같은 시리즈의 다른 글로 가는 링크는 항상 같은 디렉토리 안이라
    # 파일명만으로 충분하다(디렉토리 자체가 이미 시리즈 단위다).
    return f'{post_id}.html'


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
    if not legacy_ko:
        return ''
    return f'<section class="post-legacy"><h2>역사적 평가</h2><p>{esc(legacy_ko)}</p></section>'


def render_paragraphs(text):
    """본문 문자열을 실제 개행(\\n\\n) 기준 단락으로 나눠 <p> 여러 개로 렌더링한다.
    단락 구분이 없는 문자열은 기존과 동일하게 <p> 하나로 나온다."""
    text = text or ''
    paras = [p.strip() for p in text.split('\n\n') if p.strip()]
    if not paras:
        return f'<p>{esc(text)}</p>'
    return ''.join(f'<p>{esc(p)}</p>' for p in paras)


def render_post_body(post):
    fmt = post.get('format')
    if fmt == 'claim_rebuttal':
        return (
            f'<section class="post-claim"><h2>주장</h2>{render_paragraphs(post.get("claim_ko",""))}</section>'
            f'<section class="post-rebuttal"><h2>반박</h2>{render_paragraphs(post.get("rebuttal_ko",""))}</section>'
        )
    if fmt == 'case_tracking':
        body_html = f'<section class="post-body">{render_paragraphs(post.get("body_ko",""))}</section>'
        stages_html = render_stages_section(post.get('stages'))
        legacy_html = render_legacy_section(post.get('legacy_ko'))
        return body_html + stages_html + legacy_html
    if fmt == 'source_reading':
        # 사료읽기: 원문 발췌(세로쓰기 아님, pre-line로 행 보존) →
        # 현대어 풀이 → 해설("왜 이 문장인가") 3단 구조.
        # original_ko의 \n은 CSS white-space:pre-line로 줄바꿈이 살아난다.
        parts = []
        if post.get('original_ko'):
            note_html = (f'<p class="source-note">{esc(post.get("original_note",""))}</p>'
                         if post.get('original_note') else '')
            parts.append(
                f'<section class="post-original"><h2>원문</h2>'
                f'<blockquote><p>{esc(post.get("original_ko",""))}</p></blockquote>{note_html}</section>'
            )
        if post.get('translation_ko'):
            parts.append(f'<section class="post-translation"><h2>현대어로 읽기</h2><p>{esc(post.get("translation_ko",""))}</p></section>')
        if post.get('commentary_ko'):
            parts.append(f'<section class="post-commentary"><h2>왜 이 문장인가</h2><p>{esc(post.get("commentary_ko",""))}</p></section>')
        return ''.join(parts)
    if fmt == 'character_sheet':
        return render_character_sheet(post)
    return f'<section class="post-body">{render_paragraphs(post.get("body_ko",""))}</section>'


def render_character_sheet(post):
    """그리스·로마 신화 인물 사전 카드. 재사용 가능한 범용 인물 시트.
    필드: roman_name, domain, symbols[], epithets[], sanctuaries[],
    lineage{parents,consorts,children,siblings}, stories[], legacy_ko."""
    parts = []

    # 상단 정보 테이블 (로마명·관장·별칭)
    info_rows = []
    if post.get('roman_name'):
        info_rows.append(('로마 이름', esc(post['roman_name'])))
    if post.get('domain'):
        info_rows.append(('관장 영역', esc(post['domain'])))
    if post.get('epithets'):
        info_rows.append(('별칭·수식어', esc(', '.join(post['epithets']))))
    if post.get('symbols'):
        info_rows.append(('상징물', esc(', '.join(post['symbols']))))
    if post.get('sanctuaries'):
        info_rows.append(('주요 성역·숭배지', esc(', '.join(post['sanctuaries']))))
    if info_rows:
        rows = ''.join(
            f'<tr><th>{k}</th><td>{v}</td></tr>' for k, v in info_rows
        )
        parts.append(f'<section class="char-info"><table class="char-table">{rows}</table></section>')

    # 계보
    lin = post.get('lineage') or {}
    lin_rows = []
    for label, key in [('부모', 'parents'), ('형제자매', 'siblings'),
                       ('배우자·연인', 'consorts'), ('주요 자녀', 'children')]:
        vals = lin.get(key)
        if vals:
            lin_rows.append(f'<tr><th>{label}</th><td>{esc(", ".join(vals))}</td></tr>')
    if lin_rows:
        parts.append(
            f'<section class="char-lineage"><h2>계보</h2>'
            f'<table class="char-table">{"".join(lin_rows)}</table></section>'
        )

    # 소개 본문
    if post.get('body_ko'):
        parts.append(f'<section class="post-body">{render_paragraphs(post.get("body_ko",""))}</section>')

    # 주요 일화 (제목+내용 목록)
    stories = post.get('stories') or []
    if stories:
        items = []
        for s in stories:
            title = esc(s.get('title', ''))
            text = esc(s.get('text', ''))
            items.append(f'<div class="char-story"><h3>{title}</h3><p>{text}</p></div>')
        parts.append(f'<section class="char-stories"><h2>주요 일화</h2>{"".join(items)}</section>')

    # 오늘 우리 곁에 (문화적 흔적)
    if post.get('legacy_ko'):
        parts.append(
            f'<section class="char-legacy"><h2>오늘 우리 곁에</h2>'
            f'<p>{esc(post.get("legacy_ko",""))}</p></section>'
        )

    return ''.join(parts)


def post_plain_summary(post):
    if post.get('format') == 'claim_rebuttal':
        return post.get('claim_ko') or ''
    if post.get('format') == 'source_reading':
        return post.get('commentary_ko') or post.get('translation_ko') or ''
    if post.get('format') == 'character_sheet':
        return post.get('tagline_ko') or post.get('domain') or post.get('body_ko') or ''
    return post.get('body_ko') or ''


def render_post_page(series, post, series_slug, prev_post, next_post, out_path):
    category_label = CATEGORY_LABELS.get(series.get('category'), series.get('category') or '')
    subcat_label = SUBCATEGORY_LABELS.get(series.get('subcategory'), series.get('subcategory') or '')
    title = f"{post['title_ko']} — {series['name']} | ATLAS by MKHZ"
    description = make_description(post_plain_summary(post))
    page_url = f"{SITE_ROOT}/archive/{series_slug}/{post['id']}"
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
            {"@type": "ListItem", "position": 2, "name": "자료실", "item": f"{SITE_ROOT}/?nav=archive"},
            {"@type": "ListItem", "position": 3, "name": category_label},
            {"@type": "ListItem", "position": 4, "name": series['name'], "item": f"{SITE_ROOT}/archive/{series_slug}"},
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
    # ?event=로 그 사건 카드로 정확히 이동시킨다. card_map으로 어느
    # 지도 소속인지 표시한다: 'root'는 근대(1876~1945), 'modern2'는
    # 근현대(1945~1993), 'contemporary'는 현대(1994~2025).
    # 2026-07-18: card_ref(한국 지도 사건카드)와 world_route(세계사 루트)는
    # 상호배타가 아니다 — 길가메시 시리즈처럼 "그때 한반도는" 연결(card_ref)과
    # 세계사 루트 웨이포인트(world_route)를 동시에 가진 글은 두 CTA를 모두
    # 보여준다. elif 체인이라 card_ref가 world_route를 가리던 것을 고쳤다.
    map_cta_parts = []
    if post.get('card_ref'):
        map_prefix = CARD_MAP_PREFIX.get(post.get('card_map'), CARD_MAP_PREFIX['root'])
        map_cta_url = f"{map_prefix}?event={post['card_ref']}"
        map_cta_parts.append(f'<p class="map-cta"><a href="{map_cta_url}">지도에서 관련 사건 보기</a></p>')
    if post.get('world_route'):
        # 세계사 인물/사건은 한국 지도(root)가 아니라 자료실 내 세계사 루트 페이지로
        # 보내야 한다. world_route는 archive/world-routes/{slug}.html의 slug이고,
        # ?point=post['id']로 해당 웨이포인트에 바로 진입시킨다.
        map_cta_url = f"../world-routes/{post['world_route']}.html?point={post['id']}"
        map_cta_parts.append(f'<p class="map-cta"><a href="{map_cta_url}">세계지도 루트에서 이 장면 보기</a></p>')
    map_cta_html = ''.join(map_cta_parts)
    if not map_cta_html and post.get('lat') is not None and post.get('lng') is not None:
        year_qs = f"&year={post['year']}" if post.get('year') is not None else ''
        map_prefix = CARD_MAP_PREFIX.get(post.get('card_map'), CARD_MAP_PREFIX['root'])
        map_cta_url = f"{map_prefix}?lat={post['lat']}&lng={post['lng']}{year_qs}"
        map_cta_html = f'<p class="map-cta"><a href="{map_cta_url}">지도에서 관련 지역 보기</a></p>'

    # 「나의 역사 나무」용 식별자 — JS 문자열 리터럴로 안전하게 넘긴다
    series_id_js = json.dumps(series.get('id', ''), ensure_ascii=False)
    post_id_js = json.dumps(post.get('id', ''), ensure_ascii=False)

    html_out = f'''<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#f7f4ef">
<link rel="stylesheet" href="{ROOT_PREFIX}css/archive-article.css">
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
<nav class="breadcrumb"><a href="{ROOT_PREFIX}index.html">ATLAS</a> &rsaquo; 자료실 &rsaquo; {esc(category_label)} &rsaquo; <a href="index.html">{esc(series['name'])}</a> &rsaquo; {esc(post['title_ko'])}</nav>
{render_story_group_nav(series['id'])}
<article>
<h1>{esc(post['title_ko'])}</h1>
<p class="event-meta">{esc(date_str)}{' · ' + esc(post['place_ko']) if post.get('place_ko') else ''}</p>
{body_html}
{sources_html}
{related_html}
<section class="series-context"><p>이 글은 <a href="index.html">{esc(series['name'])}</a> 시리즈의 한 편입니다.</p></section>
{f'<nav class="wp-pager">{" | ".join(nav_links)}</nav>' if nav_links else ''}
{map_cta_html}
</article>
<link rel="stylesheet" href="{ROOT_PREFIX}css/namu.css">
<script src="{ROOT_PREFIX}js/growth.js"></script>
<script src="{ROOT_PREFIX}js/tree.js"></script>
<script src="{ROOT_PREFIX}js/namuBadge.js"></script>
<script>
// 2026-07-22 「나의 역사 나무」 — 자료실 글은 꽃이 된다.
// 다만 열자마자 세지 않는다. 실제로 읽었을 때만 꽃이 피어야 하므로
// (1) 글 끝까지 스크롤했거나 (2) 40초 이상 머문 경우에만 기록한다.
// 짧은 글은 스크롤이 없을 수 있어 두 조건을 OR로 둔다.
(function(){{
  var SERIES = {series_id_js};
  var POST = {post_id_js};
  var done = false;
  function mark(){{
    if (done) return;
    done = true;
    try {{ window.AtlasGrowth && window.AtlasGrowth.recordArchive(SERIES, POST); }} catch(e){{}}
  }}
  function nearBottom(){{
    var st = window.scrollY || document.documentElement.scrollTop;
    var vh = window.innerHeight;
    var dh = document.documentElement.scrollHeight;
    return (st + vh) >= (dh - 120);
  }}
  window.addEventListener('scroll', function(){{ if (nearBottom()) mark(); }}, {{passive:true}});
  setTimeout(mark, 40000);
  if (document.documentElement.scrollHeight <= window.innerHeight + 120) setTimeout(mark, 8000);
}})();
</script>
</body>
</html>'''

    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(html_out)


def render_series_landing_page(series, series_slug, out_path):
    category_label = CATEGORY_LABELS.get(series.get('category'), series.get('category') or '')
    title = f"{series['name']} | ATLAS by MKHZ 자료실"
    description = make_description(series.get('tagline', ''))
    page_url = f"{SITE_ROOT}/archive/{series_slug}"

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
            "url": f"{SITE_ROOT}/archive/{series_slug}/{post['id']}",
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
            {"@type": "ListItem", "position": 2, "name": "자료실", "item": f"{SITE_ROOT}/?nav=archive"},
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
<link rel="stylesheet" href="{ROOT_PREFIX}css/archive-article.css">
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
<nav class="breadcrumb"><a href="{ROOT_PREFIX}index.html">ATLAS</a> &rsaquo; 자료실 &rsaquo; {esc(category_label)} &rsaquo; {esc(series['name'])}</nav>
{render_story_group_nav(series['id'])}
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


def render_story_hub_page(all_series, out_path):
    """STORY_GROUP에 속한 시리즈들을 순서대로 소개하는 허브 랜딩 페이지를
    만든다. 개별 시리즈처럼 posts 목록이 아니라, 시리즈 자체를 목록으로
    보여준다 — "이게 하나의 4부작 프로젝트다"라는 인상을 주기 위함
    (2026-07 두목님 피드백: 시대연구 목록에 흩어져 몰입이 끊긴다는 지적)."""
    series_by_id = {s['id']: s for s in all_series}
    title = f"{STORY_GROUP_HUB_NAME} | ATLAS by MKHZ 자료실"
    tagline = "같은 기준으로 여야를 가리지 않고 — 검찰과 사법부가 신뢰를 얻고 잃어온 과정을 네 편으로 나눠 기록한다"
    description = make_description(tagline)
    page_url = f"{SITE_ROOT}/archive/{STORY_GROUP_HUB_SLUG}"

    parts_html = []
    ld_list_items = []
    for i, (sid, slug, label) in enumerate(STORY_GROUP, start=1):
        s = series_by_id.get(sid)
        if not s:
            continue  # 아직 만들지 않은 부는 건너뛴다 — 허브가 깨지지 않게
        href = f"{slug}/index.html"
        n_posts = len(s['posts'])
        parts_html.append(
            f'<li class="story-part">'
            f'<a href="{href}"><strong>{esc(label)}</strong></a>'
            f'<p class="summary">{esc(s.get("tagline",""))}</p>'
            f'<p class="wp-date">{n_posts}편 · {esc(s.get("period",""))}</p>'
            f'</li>'
        )
        ld_list_items.append({
            "@type": "ListItem", "position": i, "name": s['name'],
            "url": f"{SITE_ROOT}/archive/{slug}",
        })

    ld_itemlist = {
        "@context": "https://schema.org", "@type": "ItemList",
        "name": STORY_GROUP_HUB_NAME, "description": description,
        "url": page_url, "numberOfItems": len(ld_list_items),
        "itemListElement": ld_list_items,
    }
    ld_breadcrumb = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "ATLAS", "item": SITE_ROOT + "/"},
            {"@type": "ListItem", "position": 2, "name": "자료실", "item": f"{SITE_ROOT}/?nav=archive"},
            {"@type": "ListItem", "position": 3, "name": "역사"},
            {"@type": "ListItem", "position": 4, "name": STORY_GROUP_HUB_NAME, "item": page_url},
        ],
    }

    html_out = f'''<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#f7f4ef">
<link rel="stylesheet" href="{ROOT_PREFIX}css/archive-article.css">
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
<nav class="breadcrumb"><a href="{ROOT_PREFIX}index.html">ATLAS</a> &rsaquo; 자료실 &rsaquo; 역사 &rsaquo; {esc(STORY_GROUP_HUB_NAME)}</nav>
<article>
<h1>{esc(STORY_GROUP_HUB_NAME)}</h1>
<p class="summary">{esc(tagline)}</p>
<p class="event-meta">이 넷은 서로를 인용하며 하나의 서사를 이룹니다. 순서대로 읽기를 권합니다.</p>
<section class="series-list"><h2>{len(parts_html)}부작</h2><ol class="wp-list story-parts">{''.join(parts_html)}</ol></section>
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

    # ── 연작 허브 페이지 ──
    hub_dir = os.path.join(ARCHIVE_OUT_DIR, STORY_GROUP_HUB_SLUG)
    os.makedirs(hub_dir, exist_ok=True)
    render_story_hub_page(all_series, os.path.join(hub_dir, 'index.html'))
    total_landing += 1
    print(f'  ✓ {STORY_GROUP_HUB_SLUG}(허브): 랜딩 1개')

    print(f'\n자료실 페이지 생성 완료: 랜딩 {total_landing}개, 글 {total_post_pages}개')


if __name__ == '__main__':
    main()
