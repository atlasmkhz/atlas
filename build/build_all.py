#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_all.py — ATLAS SEO 빌드 전체 파이프라인.

⚠️ 2026-07 기준 상태: generate_slugs.py / era_breadcrumb.py /
manual_slug_overrides.py 세 모듈이 이 프로젝트 안에 없어서
generate_event_pages.py(연도 카드 → event/*.html)는 지금 이 환경에서
실행할 수 없다. 이미 생성된 366+327개 event/*.html은 그대로 유효하니
건드리지 않는다 — 이 파이프라인은 그 위에 "루트" 페이지만 추가로
쌓는다.

실행 순서:
1. generate_route_pages.py : routes/*.js 동적 순회 -> route/*.html +
   (card_ref 없는 웨이포인트용) event/route-*--*.html 생성
2. generate_unified_sitemap.py : event/·route/ 디렉토리 실제 스캔 ->
   sitemap.xml 생성 (메인 + modern2 통합)

새 라우트 파일을 routes/ 아래 추가하기만 하면(수정할 스크립트 없음)
이 스크립트를 다시 실행하는 것만으로 전체가 갱신된다. modern2 쪽은
maps/modern2/build/build_all.py를 별도로 실행한다(경로가 다른 앱이므로).
"""
import subprocess
import sys
import os

BUILD_DIR = os.path.dirname(os.path.abspath(__file__))

STEPS = [
    ('1/2 루트 페이지 생성', ['python3', os.path.join(BUILD_DIR, 'generate_route_pages.py')]),
    ('2/2 통합 Sitemap 생성', ['python3', os.path.join(BUILD_DIR, 'generate_unified_sitemap.py')]),
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
