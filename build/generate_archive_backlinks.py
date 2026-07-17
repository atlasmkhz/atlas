#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
generate_archive_backlinks.py — 자료실 → 지도 card_ref를 역으로 뒤집어
"지도 사건 카드 → 자료실 글" 역링크 인덱스를 자동 생성한다.

배경 (2026-07-17): 자료실 글은 card_ref/card_map으로 지도 사건 카드에
연결되지만(자료실→지도 방향), 그 반대 방향 — 지도에서 사건 카드 팝업을
열었을 때 "이 사건을 깊게 다룬 자료실 글"로 가는 길 — 은 없었다.
백백교 쇼츠 작업 중 두목님이 이 비대칭을 지적해서, 카드마다 수동으로
링크를 다는 대신(A안) 이미 있는 card_ref 데이터를 빌드 타임에 자동으로
뒤집는 방식(B안)으로 구현한다. 자료실에 card_ref만 정확히 걸면 이
스크립트 재실행만으로 지도 쪽 역링크까지 저절로 생긴다.

동작:
  1. content/archive/*.js 전체를 스캔해 card_ref+card_map이 있는 글 수집.
  2. 각 지도의 data/*.js에서 실존하는 이벤트 id 목록 수집.
  3. card_ref가 그 지도에 실존하는 것만 역인덱스에 담는다 — 존재하지
     않는 참조(아직 카드가 안 만들어진 경우 등)는 경고만 찍고 건너뛴다.
     그래서 이 스크립트는 죽은 링크를 만들지 않는다 (검증 겸용).
  4. 지도마다 {지도}/data/archive_backlinks.js 를 생성한다. 역링크가
     하나도 없는 지도에도 빈 객체 파일을 만든다 — 스크립트 태그 등록을
     7개 지도에서 동일하게 유지하기 위해서다.

출력 형식 (각 지도의 data/archive_backlinks.js):
  const ARCHIVE_BACKLINKS = {
    "political_1937_03": [
      { "url": "archive/cult-and-power/cp_02.html",
        "series": "교주와 권력",
        "title": "백백교 — 수백 명을 암매장한 일제강점기의 사교" }
    ],
    ...
  };

url은 그 지도 페이지 기준 상대경로다: 루트(map.html)는 'archive/...',
maps/{era}/index.html 은 '../../archive/...'.

renderer.js 쪽은 이 파일 끝에 붙인 popupHtml 후위 패치가
ARCHIVE_BACKLINKS[e.id]를 읽어 "자료실에서 자세히 보기" 영역을 그린다.

실행: python3 build/generate_archive_backlinks.py  (프로젝트 루트에서)
자료실에 card_ref를 새로 걸거나 시리즈를 추가했으면 반드시 재실행한다.
"""

import glob
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 지도 키 → (데이터 폴더, 출력 파일, 그 지도 페이지 기준 archive 상대경로 prefix)
MAPS = {
    'root':         ('data',                       'data/archive_backlinks.js',                       'archive/'),
    'prehistory':   ('maps/prehistory/data',       'maps/prehistory/data/archive_backlinks.js',       '../../archive/'),
    'ancient':      ('maps/ancient/data',          'maps/ancient/data/archive_backlinks.js',          '../../archive/'),
    'medieval1':    ('maps/medieval1/data',        'maps/medieval1/data/archive_backlinks.js',        '../../archive/'),
    'medieval2':    ('maps/medieval2/data',        'maps/medieval2/data/archive_backlinks.js',        '../../archive/'),
    'modern2':      ('maps/modern2/data',          'maps/modern2/data/archive_backlinks.js',          '../../archive/'),
    'contemporary': ('maps/contemporary/data',     'maps/contemporary/data/archive_backlinks.js',     '../../archive/'),
}


def slugify(series_id):
    # generate_archive_pages.py 와 동일한 규칙을 쓴다.
    return series_id.replace('_', '-')


def collect_map_event_ids():
    """지도별로 data/*.js 에 실존하는 이벤트 id 집합을 수집한다."""
    ids = {}
    for map_key, (data_dir, _, _) in MAPS.items():
        found = set()
        for fp in glob.glob(os.path.join(ROOT, data_dir, '*.js')):
            if os.path.basename(fp) == 'archive_backlinks.js':
                continue  # 자기 자신(이전 실행 산출물)은 제외
            text = open(fp, encoding='utf-8').read()
            for m in re.finditer(r"id:\s*'([^']+)'", text):
                found.add(m.group(1))
        ids[map_key] = found
    return ids


def parse_archive_posts():
    """자료실 전 시리즈에서 card_ref가 있는 글을 (지도별로) 수집한다.

    글 블록 단위로 잘라 파싱해서, 정규식이 블록 경계를 넘어 다른 글의
    필드를 잘못 짝짓는 일이 없게 한다.
    """
    by_map = {k: {} for k in MAPS}
    warnings = []
    for fp in sorted(glob.glob(os.path.join(ROOT, 'content/archive/*.js'))):
        text = open(fp, encoding='utf-8').read()
        # 라인 주석(//...)을 제거하고 파싱한다. 주석 안에 "card_map: 'root'"
        # 같은 설명 텍스트가 들어 있으면(wp_06이 실제 그런 사례) 블록 분할과
        # 필드 추출이 오염되기 때문이다. 문자열 리터럴 안의 //는 이 데이터
        # 파일들에선 URL 정도인데, URL은 필드 추출 대상이 아니라 무해하다.
        text = re.sub(r"^\s*//[^\n]*$", "", text, flags=re.M)
        sid_m = re.search(r"^\s*id:\s*'([^']+)'", text, re.M)
        if not sid_m:
            continue
        series_id = sid_m.group(1)
        name_m = re.search(r"^\s*name:\s*'([^']+)'", text, re.M)
        series_name = name_m.group(1) if name_m else series_id
        slug = slugify(series_id)

        # posts 배열 내부의 글 블록들: "    {" 들여쓰기로 시작하는 블록 단위 분할
        blocks = re.split(r"\n\s{4,6}\{", text)
        for b in blocks[1:]:
            pid_m = re.search(r"id:\s*'([^']+)'", b)
            ref_m = re.search(r"card_ref:\s*'([^']+)'", b)
            map_m = re.search(r"card_map:\s*'([^']+)'", b)
            title_m = re.search(r"title_ko:\s*'((?:[^'\\]|\\.)*)'", b)
            if not (pid_m and ref_m):
                continue
            pid, ref = pid_m.group(1), ref_m.group(1)
            cmap = map_m.group(1) if map_m else 'root'
            title = title_m.group(1).replace("\\'", "'") if title_m else pid
            if cmap not in MAPS:
                warnings.append(f"[경고] {series_id}/{pid}: 알 수 없는 card_map '{cmap}' — 건너뜀")
                continue
            by_map[cmap].setdefault(ref, []).append({
                'post_id': pid,
                'series': series_name,
                'slug': slug,
                'title': title,
            })
    return by_map, warnings


def main():
    os.chdir(ROOT)
    map_ids = collect_map_event_ids()
    by_map, warnings = parse_archive_posts()

    total_links = 0
    skipped = 0
    for map_key, (data_dir, out_path, prefix) in MAPS.items():
        index = {}
        for ref, posts in sorted(by_map[map_key].items()):
            if ref not in map_ids[map_key]:
                for p in posts:
                    warnings.append(
                        f"[경고] {p['slug']}/{p['post_id']}: card_ref '{ref}' 가 "
                        f"{map_key} 지도 데이터에 없음 — 역링크 생략")
                skipped += len(posts)
                continue
            index[ref] = [
                {
                    'url': f"{prefix}{p['slug']}/{p['post_id']}.html",
                    'series': p['series'],
                    'title': p['title'],
                }
                for p in posts
            ]
            total_links += len(posts)

        body = json.dumps(index, ensure_ascii=False, indent=2)
        content = (
            "// data/archive_backlinks.js — 지도 사건 카드 → 자료실 글 역링크 인덱스.\n"
            "// ⚠️ 자동 생성 파일: build/generate_archive_backlinks.py 가 만든다.\n"
            "// 직접 편집하지 말 것 — 자료실(content/archive/*.js)의 card_ref를\n"
            "// 수정한 뒤 스크립트를 재실행하면 갱신된다.\n"
            f"const ARCHIVE_BACKLINKS = {body};\n"
        )
        full_out = os.path.join(ROOT, out_path)
        os.makedirs(os.path.dirname(full_out), exist_ok=True)
        with open(full_out, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ {map_key}: 이벤트 {len(index)}개에 역링크 {sum(len(v) for v in index.values())}건 → {out_path}")

    for w in warnings:
        print(w)
    print(f"\n역링크 생성 완료: 총 {total_links}건 (실존 검증 실패로 생략 {skipped}건)")
    return 0


if __name__ == '__main__':
    sys.exit(main())
