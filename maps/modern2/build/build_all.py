#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_all.py (modern2) — ATLAS 근현대 지도 SEO 빌드 파이프라인.

⚠️ 2026-07 기준 상태: generate_slugs.py 등 근현대 전용 slug 모듈이 이
프로젝트 안에 없어서 generate_event_pages.py(연도 카드 → event/*.html)는
지금 이 환경에서 실행할 수 없다. 이미 생성된 327개 event/*.html은 그대로
유효하니 건드리지 않는다 — 이 파이프라인은 그 위에 "루트" 페이지만
추가로 쌓고, 메인 앱과 합쳐 통합 sitemap.xml을 갱신한다.

실행 순서:
1. generate_route_pages.py : routes/*.js 동적 순회 -> route/*.html +
   (card_ref 없는 웨이포인트용) event/route-*--*.html 생성
2. (메인 앱의) generate_unified_sitemap.py : event/·route/ 두 앱 전체를
   스캔해 sitemap.xml 재생성 (메인 + modern2 통합, 도메인이 같으므로
   sitemap 파일도 하나로 합친다)

새 라우트 파일을 routes/ 아래 추가하기만 하면(수정할 스크립트 없음)
이 스크립트를 다시 실행하는 것만으로 전체가 갱신된다.
"""
import subprocess
import sys
import os

BUILD_DIR = os.path.dirname(os.path.abspath(__file__))
MODERN2_ROOT = os.path.dirname(BUILD_DIR)
MAIN_ROOT = os.path.dirname(os.path.dirname(MODERN2_ROOT))
MAIN_BUILD_DIR = os.path.join(MAIN_ROOT, 'build')

STEPS = [
    ('1/2 루트 페이지 생성 (modern2)', ['python3', os.path.join(BUILD_DIR, 'generate_route_pages.py')]),
    ('2/2 통합 Sitemap 재생성 (메인+modern2)', ['python3', os.path.join(MAIN_BUILD_DIR, 'generate_unified_sitemap.py')]),
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
