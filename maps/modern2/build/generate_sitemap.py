# -*- coding: utf-8 -*-
"""
generate_sitemap.py (modern2)

참고용 스크립트다 — 실제로 검색엔진에 제출하는 것은 메인 앱의
build/generate_unified_sitemap.py가 만드는 통합 sitemap.xml(메인+
modern2+양쪽 route를 전부 포함)이다. 이 스크립트는 modern2 event만
담은 sitemap-modern2.xml을 별도로 만들어 두는 것뿐이라, 안 돌려도
통합 sitemap.xml에는 영향이 없다.

연도/시대를 하드코딩하지 않고, event/*.html 디렉토리를 그대로 스캔해서
실제로 생성된 파일만 sitemap에 올린다.
"""
import glob
import os

BUILD_DIR = os.path.dirname(os.path.abspath(__file__))
MODERN2_ROOT = os.path.dirname(BUILD_DIR)

SITE_ROOT = 'https://atlas.mkhz.kr'
PATH_PREFIX = '/maps/modern2'
EVENT_DIR = os.path.join(MODERN2_ROOT, 'event')
OUT_PATH = os.path.join(MODERN2_ROOT, 'sitemap-modern2.xml')

def main():
    event_files = sorted(glob.glob(os.path.join(EVENT_DIR, '*.html')))
    slugs = [os.path.basename(f)[:-5] for f in event_files]

    lines = []
    lines.append('<?xml version="1.0" encoding="UTF-8"?>')
    lines.append('<!--')
    lines.append('  ATLAS by MKHZ — sitemap-modern2.xml (참고용 — 실제 제출은 루트의 sitemap.xml 사용)')
    lines.append(f'  근현대(1945~1993) 지도 진입점 1개 + Event 페이지 {len(slugs)}개를 포함한다.')
    lines.append('  이 파일은 build/generate_sitemap.py가 event/ 디렉토리를 스캔해 자동 생성한다.')
    lines.append('  ※ 실제 Search Console 제출용 sitemap은 build/generate_unified_sitemap.py가')
    lines.append('  만드는 루트의 /sitemap.xml이다(메인+modern2 통합). 이 파일은 modern2만')
    lines.append('  따로 점검하고 싶을 때 참고용으로만 쓴다.')
    lines.append('  실제로 존재하지 않는 URL은 포함하지 않는다 — 직접 수정하지 말고')
    lines.append('  build/generate_event_pages.py 실행 후 이 스크립트를 다시 실행할 것.')
    lines.append('-->')
    lines.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    lines.append('  <url>')
    lines.append(f'    <loc>{SITE_ROOT}{PATH_PREFIX}/</loc>')
    lines.append('    <changefreq>weekly</changefreq>')
    lines.append('    <priority>1.0</priority>')
    lines.append('  </url>')
    for slug in slugs:
        lines.append('  <url>')
        lines.append(f'    <loc>{SITE_ROOT}{PATH_PREFIX}/event/{slug}</loc>')
        lines.append('    <changefreq>monthly</changefreq>')
        lines.append('    <priority>0.7</priority>')
        lines.append('  </url>')
    lines.append('</urlset>')

    with open(OUT_PATH, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines) + '\n')

    print(f'sitemap.xml 생성 완료: 메인 1건 + Event {len(slugs)}건 = 총 {len(slugs)+1}건')

if __name__ == '__main__':
    main()
