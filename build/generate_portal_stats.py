#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
generate_portal_stats.py — 포털(atlas/index.html)의 "구축 현황" 숫자를
집계해 content/portal_stats.js로 뽑아낸다.

added_at 필드 없이 "최근 업데이트"를 만드는 대신(로드맵 논의 참고),
전체 규모를 보여주는 쪽을 택했다 — 이 숫자들은 세 지도의 data/*.js,
routes/*.js, content/archive/*.js를 정규식으로 세어서 만든다(실제 JS를
실행하지 않는다 — Node 없이도 돌아가게 하기 위해서다. event 카드
객체는 항상 `{ id:'...'` 로 시작하는 게 관례라 이 패턴 카운트만으로도
충분히 정확하다).

실행: python3 build/generate_portal_stats.py
카드/루트/자료를 추가한 뒤 포털 숫자를 갱신하려면 이 스크립트를
다시 실행하면 된다 — 수동으로 숫자를 고칠 필요 없음.
"""
import glob
import os
import re

BUILD_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BUILD_DIR)

EVENT_ID_RE = re.compile(r"\bid\s*:\s*'[a-zA-Z0-9_]+'\s*,\s*year\s*:")
ROUTE_WAYPOINT_RE = re.compile(r"\btype\s*:\s*'(?:birth|life|political|battle|tragedy|exile|death|massacre|plot|policy)'")


def count_events(data_dir):
    total = 0
    for f in glob.glob(os.path.join(data_dir, '*.js')):
        text = open(f, encoding='utf-8').read()
        total += len(EVENT_ID_RE.findall(text))
    return total


def count_routes(routes_dir):
    if not os.path.isdir(routes_dir):
        return 0
    return len(glob.glob(os.path.join(routes_dir, '*.js')))


def count_archive_posts(archive_dir):
    total = 0
    series = 0
    for f in glob.glob(os.path.join(archive_dir, '*.js')):
        text = open(f, encoding='utf-8').read()
        series += 1
        total += len(re.findall(r"\bid\s*:\s*'[a-zA-Z0-9_]+'\s*,\s*\n?\s*type\s*:", text))
    return series, total


def main():
    events_root = count_events(os.path.join(PROJECT_ROOT, 'data'))
    events_modern2 = count_events(os.path.join(PROJECT_ROOT, 'maps', 'modern2', 'data'))
    events_contemporary = count_events(os.path.join(PROJECT_ROOT, 'maps', 'contemporary', 'data'))
    total_events = events_root + events_modern2 + events_contemporary

    routes_root = count_routes(os.path.join(PROJECT_ROOT, 'routes'))
    routes_modern2 = count_routes(os.path.join(PROJECT_ROOT, 'maps', 'modern2', 'routes'))
    routes_contemporary = count_routes(os.path.join(PROJECT_ROOT, 'maps', 'contemporary', 'routes'))
    total_routes = routes_root + routes_modern2 + routes_contemporary

    archive_series, total_archive_posts = count_archive_posts(os.path.join(PROJECT_ROOT, 'content', 'archive'))

    stats = {
        'events': total_events,
        'events_by_era': {'root': events_root, 'modern2': events_modern2, 'contemporary': events_contemporary},
        'routes': total_routes,
        'archive_series': archive_series,
        'archive_posts': total_archive_posts,
        'generated_at': None,  # 아래에서 실제 실행 시각으로 채운다
    }

    import datetime
    stats['generated_at'] = datetime.date.today().isoformat()

    out_path = os.path.join(PROJECT_ROOT, 'content', 'portal_stats.js')
    js_out = (
        "// content/portal_stats.js — build/generate_portal_stats.py가 자동 생성한다.\n"
        "// 직접 수정하지 말 것 — 카드/루트/자료 추가 후 스크립트를 다시 실행할 것.\n"
        f"window.PORTAL_STATS = {stats!r}".replace("'", '"') + ";\n"
    )
    # Python dict repr은 큰따옴표가 아니라 작은따옴표를 쓰므로, 위에서
    # 전체를 큰따옴표로 바꿔치기했다 — JSON과 동일한 형태가 되어 안전하다.
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(js_out)

    print(f'events: {total_events} (근대 {events_root} / 근현대 {events_modern2} / 현대 {events_contemporary})')
    print(f'routes: {total_routes} (근대 {routes_root} / 근현대 {routes_modern2} / 현대 {routes_contemporary})')
    print(f'archive: 시리즈 {archive_series} / 글 {total_archive_posts}')
    print(f'-> {out_path}')


if __name__ == '__main__':
    main()
