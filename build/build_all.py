#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_all.py — ATLAS SEO 빌드 전체 파이프라인.

순서:
1. generate_slugs.py    : data/*.js 동적 순회 -> slug 배정 (충돌 0 보장)
2. generate_event_pages.py : slug + breadcrumb + JSON-LD -> event/*.html 생성
3. generate_sitemap.py  : event/ 디렉토리 실제 스캔 -> sitemap.xml 생성

연도/시대를 하드코딩하지 않고 매 단계 data/, event/ 디렉토리를 동적으로
스캔한다. 새 연도 데이터 파일이 추가되면 이 스크립트를 다시 실행하는
것만으로 전체가 갱신된다.
"""
import subprocess
import sys

STEPS = [
    ('1/3 Slug 생성', ['python3', '/home/claude/seo_build/generate_slugs.py']),
    ('2/3 Event HTML 생성', ['python3', '/home/claude/work/photos_zip/build/generate_event_pages.py']),
    ('3/3 Sitemap 생성', ['python3', '/home/claude/work/photos_zip/build/generate_sitemap.py']),
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
