# -*- coding: utf-8 -*-
"""
generate_sitemap.py

⚠️ 이 스크립트는 더 이상 쓰지 않는다(2026-07 기준). generate_unified_sitemap.py
가 이 스크립트가 하던 일(메인 event/ 스캔)을 포함해 modern2 event/·두
route/ 디렉토리까지 전부 스캔해 sitemap.xml 하나로 합쳐 만든다. 이 스크립트를
따로 실행하면 route 페이지와 modern2 페이지가 빠진 불완전한 sitemap.xml로
덮어써 버리니 실행하지 말 것 — build_all.py도 이제 이 스크립트를 부르지
않는다. 과거 참고용으로만 남겨둔다.

sitemap.xml을 생성한다. 메인 페이지 1건 + 실제로 생성된 모든 Event
페이지를 포함한다. 존재하지 않는 URL은 절대 포함하지 않는다(404 방지
원칙 — 기존 sitemap.xml 주석에 명시된 정책을 그대로 따른다).

연도/시대를 하드코딩하지 않고, event/*.html 디렉토리를 그대로 스캔해서
실제로 생성된 파일만 sitemap에 올린다 — 이렇게 해야 빌드 스크립트가
실패해서 일부 페이지가 안 만들어진 경우에도 sitemap이 거짓말을 하지 않는다.
"""
import glob
import os

BUILD_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BUILD_DIR)

SITE_ROOT = 'https://atlas.mkhz.kr'
EVENT_DIR = os.path.join(PROJECT_ROOT, 'event')
OUT_PATH = os.path.join(PROJECT_ROOT, 'sitemap.xml')

def main():
    event_files = sorted(glob.glob(os.path.join(EVENT_DIR, '*.html')))
    slugs = [os.path.basename(f)[:-5] for f in event_files]

    lines = []
    lines.append('<?xml version="1.0" encoding="UTF-8"?>')
    lines.append('<!--')
    lines.append('  ATLAS by MKHZ — sitemap.xml')
    lines.append(f'  메인 페이지 1개 + Event 페이지 {len(slugs)}개를 포함한다(1876~1945, 1차 SEO 작업).')
    lines.append('  이 파일은 build/generate_sitemap.py가 event/ 디렉토리를 스캔해 자동 생성한다.')
    lines.append('  실제로 존재하지 않는 URL은 포함하지 않는다 — 직접 수정하지 말고')
    lines.append('  build/generate_event_pages.py 실행 후 이 스크립트를 다시 실행할 것.')
    lines.append('-->')
    lines.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    lines.append('  <url>')
    lines.append(f'    <loc>{SITE_ROOT}/</loc>')
    lines.append('    <changefreq>weekly</changefreq>')
    lines.append('    <priority>1.0</priority>')
    lines.append('  </url>')
    for slug in slugs:
        lines.append('  <url>')
        lines.append(f'    <loc>{SITE_ROOT}/event/{slug}</loc>')
        lines.append('    <changefreq>monthly</changefreq>')
        lines.append('    <priority>0.7</priority>')
        lines.append('  </url>')
    lines.append('</urlset>')

    with open(OUT_PATH, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines) + '\n')

    print(f'sitemap.xml 생성 완료: 메인 1건 + Event {len(slugs)}건 = 총 {len(slugs)+1}건')

if __name__ == '__main__':
    main()
