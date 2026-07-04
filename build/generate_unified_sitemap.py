# -*- coding: utf-8 -*-
"""
generate_unified_sitemap.py
메인 ATLAS(1876~1945)와 modern2(1945~1993) Event 페이지를 모두 포함하는
통합 sitemap.xml을 생성한다. 둘 다 같은 도메인(atlas.mkhz.kr) 하위
경로이므로 검색엔진에는 하나의 sitemap으로 제출하는 것이 자연스럽다.

연도/시대를 하드코딩하지 않고, 각 event/·route/ 디렉토리를 실제로
스캔해서 존재하는 파일만 포함한다. event/ 안에는 일반 사건 페이지와
루트 전용 웨이포인트 페이지(route-{slug}--{wp_id}.html, 이름으로
구분되지 않고 그냥 같이 스캔됨 — 둘 다 실제 페이지이므로 구분할
필요가 없다)가 함께 들어있다.
"""
import glob
import os

BUILD_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BUILD_DIR)

SITE_ROOT = 'https://atlas.mkhz.kr'
MAIN_EVENT_DIR = os.path.join(PROJECT_ROOT, 'event')
MAIN_ROUTE_DIR = os.path.join(PROJECT_ROOT, 'route')
MODERN2_EVENT_DIR = os.path.join(PROJECT_ROOT, 'maps', 'modern2', 'event')
MODERN2_ROUTE_DIR = os.path.join(PROJECT_ROOT, 'maps', 'modern2', 'route')
# 자료실은 더 이상 지도별로 나뉘어 있지 않다 — content/archive/*.js가
# 근대·근현대·현대 모든 지도에 공유되고(content/youtube_videos.js와
# 같은 패턴), 정적 출력도 사이트 루트의 archive/ 하나로 통합됐다
# (docs/power_accountability_roadmap.md §0-6). 예전엔 이 경로가
# maps/modern2/archive였다 — 통합 이전 흔적이라 고쳤다.
ARCHIVE_DIR = os.path.join(PROJECT_ROOT, 'archive')
OUT_PATH = os.path.join(PROJECT_ROOT, 'sitemap.xml')

def main():
    main_slugs = sorted(os.path.basename(f)[:-5] for f in glob.glob(os.path.join(MAIN_EVENT_DIR, '*.html')))
    modern2_slugs = sorted(os.path.basename(f)[:-5] for f in glob.glob(os.path.join(MODERN2_EVENT_DIR, '*.html')))
    main_route_slugs = sorted(os.path.basename(f)[:-5] for f in glob.glob(os.path.join(MAIN_ROUTE_DIR, '*.html')))
    modern2_route_slugs = sorted(os.path.basename(f)[:-5] for f in glob.glob(os.path.join(MODERN2_ROUTE_DIR, '*.html')))
    # archive/는 시리즈별 하위 폴더(archive/{series-slug}/*.html)라
    # event·route와 달리 2단계로 스캔한다. index.html(시리즈 랜딩)과
    # 글 페이지를 구분해서 각각 다른 URL 패턴으로 담는다.
    archive_landing = []   # [series_slug, ...]
    archive_posts = []     # [(series_slug, post_slug), ...]
    if os.path.isdir(ARCHIVE_DIR):
        for series_dir in sorted(glob.glob(os.path.join(ARCHIVE_DIR, '*'))):
            if not os.path.isdir(series_dir):
                continue
            series_slug = os.path.basename(series_dir)
            if os.path.isfile(os.path.join(series_dir, 'index.html')):
                archive_landing.append(series_slug)
            for f in sorted(glob.glob(os.path.join(series_dir, '*.html'))):
                post_slug = os.path.basename(f)[:-5]
                if post_slug == 'index':
                    continue
                archive_posts.append((series_slug, post_slug))

    lines = []
    lines.append('<?xml version="1.0" encoding="UTF-8"?>')
    lines.append('<!--')
    lines.append('  ATLAS by MKHZ — sitemap.xml (통합)')
    lines.append(f'  메인 페이지 1개 + 1876~1945 Event {len(main_slugs)}개 + 루트 {len(main_route_slugs)}개 + ')
    lines.append(f'  근현대(1945~1993) 진입점 1개 + Event {len(modern2_slugs)}개 + 루트 {len(modern2_route_slugs)}개를 포함한다.')
    lines.append('  이 파일은 build/generate_unified_sitemap.py가 event/·route/ 디렉토리를')
    lines.append('  스캔해 자동 생성한다. 직접 수정하지 말 것 — 각 시기의')
    lines.append('  generate_event_pages.py, generate_route_pages.py 실행 후 이 스크립트를')
    lines.append('  다시 실행할 것. 실제로 존재하지 않는 URL은 절대 포함하지 않는다.')
    lines.append('-->')
    lines.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

    # 메인 페이지 (포털/Home)
    lines.append('  <url>')
    lines.append(f'    <loc>{SITE_ROOT}/</loc>')
    lines.append('    <changefreq>weekly</changefreq>')
    lines.append('    <priority>1.0</priority>')
    lines.append('  </url>')

    # 근대(1876~1945) 지도 — index.html이 포털이 되면서 map.html로 분리됐다.
    lines.append('  <url>')
    lines.append(f'    <loc>{SITE_ROOT}/map.html</loc>')
    lines.append('    <changefreq>weekly</changefreq>')
    lines.append('    <priority>0.9</priority>')
    lines.append('  </url>')

    # 1876~1945 Event
    for slug in main_slugs:
        lines.append('  <url>')
        lines.append(f'    <loc>{SITE_ROOT}/event/{slug}</loc>')
        lines.append('    <changefreq>monthly</changefreq>')
        lines.append('    <priority>0.7</priority>')
        lines.append('  </url>')

    # 1876~1945 루트 랜딩
    for slug in main_route_slugs:
        lines.append('  <url>')
        lines.append(f'    <loc>{SITE_ROOT}/route/{slug}</loc>')
        lines.append('    <changefreq>monthly</changefreq>')
        lines.append('    <priority>0.75</priority>')
        lines.append('  </url>')

    # modern2 진입점
    lines.append('  <url>')
    lines.append(f'    <loc>{SITE_ROOT}/maps/modern2/</loc>')
    lines.append('    <changefreq>weekly</changefreq>')
    lines.append('    <priority>0.9</priority>')
    lines.append('  </url>')

    # modern2 Event
    for slug in modern2_slugs:
        lines.append('  <url>')
        lines.append(f'    <loc>{SITE_ROOT}/maps/modern2/event/{slug}</loc>')
        lines.append('    <changefreq>monthly</changefreq>')
        lines.append('    <priority>0.7</priority>')
        lines.append('  </url>')

    # modern2 루트 랜딩
    for slug in modern2_route_slugs:
        lines.append('  <url>')
        lines.append(f'    <loc>{SITE_ROOT}/maps/modern2/route/{slug}</loc>')
        lines.append('    <changefreq>monthly</changefreq>')
        lines.append('    <priority>0.75</priority>')
        lines.append('  </url>')

    # 자료실 시리즈 랜딩 (지도 구분 없이 통합)
    for series_slug in archive_landing:
        lines.append('  <url>')
        lines.append(f'    <loc>{SITE_ROOT}/archive/{series_slug}</loc>')
        lines.append('    <changefreq>monthly</changefreq>')
        lines.append('    <priority>0.75</priority>')
        lines.append('  </url>')

    # 자료실 글 (지도 구분 없이 통합)
    for series_slug, post_slug in archive_posts:
        lines.append('  <url>')
        lines.append(f'    <loc>{SITE_ROOT}/archive/{series_slug}/{post_slug}</loc>')
        lines.append('    <changefreq>monthly</changefreq>')
        lines.append('    <priority>0.7</priority>')
        lines.append('  </url>')

    lines.append('</urlset>')

    with open(OUT_PATH, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines) + '\n')

    total = (3 + len(main_slugs) + len(modern2_slugs) + len(main_route_slugs) + len(modern2_route_slugs)
             + len(archive_landing) + len(archive_posts))
    print(f'통합 sitemap.xml 생성 완료: 메인 1 + map.html 1 + 1876-1945 Event {len(main_slugs)} + 루트 {len(main_route_slugs)} + '
          f'modern2 진입점 1 + modern2 Event {len(modern2_slugs)} + modern2 루트 {len(modern2_route_slugs)} + '
          f'자료실 랜딩 {len(archive_landing)} + 자료실 글 {len(archive_posts)} = 총 {total}건')

if __name__ == '__main__':
    main()
