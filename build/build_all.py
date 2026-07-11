#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_all.py — ATLAS SEO 빌드 전체 파이프라인.

⚠️ 2026-07 기준 상태: generate_slugs.py / era_breadcrumb.py /
manual_slug_overrides.py 세 모듈이 이 프로젝트 안에 없어서
generate_event_pages.py(연도 카드 → event/*.html)는 지금 이 환경에서
실행할 수 없다. 이미 생성된 event/*.html은 그대로 유효하니 건드리지
않는다 — 이 파이프라인은 그 위에 "루트" 페이지만 추가로 쌓는다.

2026-07-10 갱신: 지금까지 루트 SEO 정적 페이지(generate_route_pages.py)가
근대(포털)·근현대(modern2) 두 지도에만 있고, 고대·고려·조선에는
아예 인프라 자체가 없어서 그 지도들에 만든 루트가 전부 구글에
색인되지 않는 상태였다 — 뒤늦게 발견해서 세 지도 모두에
generate_route_pages.py·extract_routes.js를 이식하고, 이제부터는
"새 루트를 만들면 반드시 이 스크립트를 돌린다"를 표준 규칙으로 삼는다.

━━ 새 루트/자료실 글을 추가한 뒤 반드시 지킬 SEO 규칙 ━━
1. 루트(routes/*.js)를 새로 추가하거나 수정했으면, 그 지도의
   maps/{era}/build/generate_route_pages.py를 반드시 실행한다.
   (근대/포털은 build/generate_route_pages.py, 즉 이 파일과 같은
   위치 — 아래 STEPS에 이미 포함돼 있다.)
2. 카드(data/*.js)의 좌표·제목 등을 고쳤으면 해당 지도의
   generate_event_pages.py도 다시 돌린다(가능한 지도에 한함 — 위
   경고 참고).
3. 위 두 단계가 끝나면 최종적으로 이 프로젝트 루트의
   build/generate_unified_sitemap.py를 한 번 더 돌려서 sitemap.xml을
   갱신한다 — 모든 지도의 event/·route/ 디렉토리를 실제로 스캔해서
   존재하는 페이지만 담으므로, 이 순서(각 지도 생성 → 마지막에
   sitemap)를 지키기만 하면 절대 깨진 URL이 sitemap에 들어가지
   않는다.
4. portal_stats.js(홈 화면 "아틀라스 현황")도 build/generate_portal_stats.py로
   같이 갱신해준다 — SEO는 아니지만 항상 세트로 돌리는 게 자연스럽다.

실행 순서(이 스크립트 하나로 근대·근현대·고대·고려·조선 루트 페이지를
전부 생성한 뒤 통합 sitemap까지 만든다):
1. 근대(포털) 루트 페이지 생성
2. 근현대(modern2) 루트 페이지 생성
3. 고대(ancient) 루트 페이지 생성
4. 고려(medieval1) 루트 페이지 생성
5. 조선(medieval2) 루트 페이지 생성
6. 통합 Sitemap 생성 (프로젝트 루트 build/generate_unified_sitemap.py)

새 라우트 파일을 routes/ 아래 추가하기만 하면(수정할 스크립트 없음)
이 스크립트를 다시 실행하는 것만으로 전체가 갱신된다. 현대(contemporary)는
아직 루트 자체가 없어 이 목록에서 빠져 있다 — 루트가 생기면
maps/contemporary/build/에도 같은 방식으로 이식하고 이 STEPS에 추가하면
된다.
"""
import subprocess
import sys
import os

BUILD_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BUILD_DIR)

STEPS = [
    ('1/8 근대(포털) 루트 페이지 생성', ['python3', os.path.join(BUILD_DIR, 'generate_route_pages.py')]),
    ('2/8 근현대(modern2) 루트 페이지 생성', ['python3', os.path.join(PROJECT_ROOT, 'maps', 'modern2', 'build', 'generate_route_pages.py')]),
    ('3/8 고대(ancient) 루트 페이지 생성', ['python3', os.path.join(PROJECT_ROOT, 'maps', 'ancient', 'build', 'generate_route_pages.py')]),
    ('4/8 고려(medieval1) 루트 페이지 생성', ['python3', os.path.join(PROJECT_ROOT, 'maps', 'medieval1', 'build', 'generate_route_pages.py')]),
    ('5/8 조선(medieval2) 루트 페이지 생성', ['python3', os.path.join(PROJECT_ROOT, 'maps', 'medieval2', 'build', 'generate_route_pages.py')]),
    ('6/8 현대(contemporary) 루트 페이지 생성', ['python3', os.path.join(PROJECT_ROOT, 'maps', 'contemporary', 'build', 'generate_route_pages.py')]),
    ('7/8 선사(prehistory) 루트 페이지 생성', ['python3', os.path.join(PROJECT_ROOT, 'maps', 'prehistory', 'build', 'generate_route_pages.py')]),
    ('8/8 통합 Sitemap 생성', ['python3', os.path.join(BUILD_DIR, 'generate_unified_sitemap.py')]),
]

def main():
    for label, cmd in STEPS:
        print(f'\n=== {label} ===')
        result = subprocess.run(cmd, capture_output=True, text=True)
        print(result.stdout)
        if result.returncode != 0:
            print(f'❌ 실패: {label}')
            print(result.stderr)
            sys.exit(1)
    print('\n✅ 전체 빌드 파이프라인 완료')

if __name__ == '__main__':
    main()
