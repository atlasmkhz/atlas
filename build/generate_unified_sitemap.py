# -*- coding: utf-8 -*-
"""
generate_unified_sitemap.py
메인 ATLAS(1876~1945)와 modern2(1945~1993) Event 페이지를 모두 포함하는
통합 sitemap.xml을 생성한다. 둘 다 같은 도메인(atlas.mkhz.kr) 하위
경로이므로 검색엔진에는 하나의 sitemap으로 제출하는 것이 자연스럽다.

연도/시대를 하드코딩하지 않고, 각 event/ 디렉토리를 실제로 스캔해서
존재하는 파일만 포함한다.
"""
import glob
import os

SITE_ROOT = 'https://atlas.mkhz.kr'
MAIN_EVENT_DIR = '/home/claude/work/photos_zip/event'
MODERN2_EVENT_DIR = '/home/claude/work/photos_zip/maps/modern2/event'
OUT_PATH = '/home/claude/work/photos_zip/sitemap.xml'

def main():
    main_slugs = sorted(os.path.basename(f)[:-5] for f in glob.glob(os.path.join(MAIN_EVENT_DIR, '*.html')))
    modern2_slugs = sorted(os.path.basename(f)[:-5] for f in glob.glob(os.path.join(MODERN2_EVENT_DIR, '*.html')))

    lines = []
    lines.append('<?xml version="1.0" encoding="UTF-8"?>')
    lines.append('<!--')
    lines.append('  ATLAS by MKHZ — sitemap.xml (통합)')
    lines.append(f'  메인 페이지 1개 + 1876~1945 Event {len(main_slugs)}개 + ')
    lines.append(f'  근현대(1945~1993) 진입점 1개 + Event {len(modern2_slugs)}개를 포함한다.')
    lines.append('  이 파일은 build/generate_unified_sitemap.py가 두 event/ 디렉토리를')
    lines.append('  스캔해 자동 생성한다. 직접 수정하지 말 것 — 각 시기의')
    lines.append('  generate_event_pages.py 실행 후 이 스크립트를 다시 실행할 것.')
    lines.append('  실제로 존재하지 않는 URL은 절대 포함하지 않는다.')
    lines.append('-->')
    lines.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

    # 메인 페이지
    lines.append('  <url>')
    lines.append(f'    <loc>{SITE_ROOT}/</loc>')
    lines.append('    <changefreq>weekly</changefreq>')
    lines.append('    <priority>1.0</priority>')
    lines.append('  </url>')

    # 1876~1945 Event
    for slug in main_slugs:
        lines.append('  <url>')
        lines.append(f'    <loc>{SITE_ROOT}/event/{slug}</loc>')
        lines.append('    <changefreq>monthly</changefreq>')
        lines.append('    <priority>0.7</priority>')
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

    lines.append('</urlset>')

    with open(OUT_PATH, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines) + '\n')

    total = 2 + len(main_slugs) + len(modern2_slugs)
    print(f'통합 sitemap.xml 생성 완료: 메인 1 + 1876-1945 Event {len(main_slugs)} + '
          f'modern2 진입점 1 + modern2 Event {len(modern2_slugs)} = 총 {total}건')

if __name__ == '__main__':
    main()
