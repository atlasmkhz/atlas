#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
audit_connections.py — 지도↔자료실↔유튜브 3중 연결 상태 전수 검수 도구.

배경 (2026-07-17): 양세봉 편 작업에서 "지도 카드·자료실 글·유튜브 영상이
서로 얼마나 이어져 있는가"를 수작업으로 확인하다가, 이걸 매번 사람이
훑는 건 불가능하니 상시 실행 가능한 검수 도구로 만들었다 (두목님 지적:
"일일이 검수가 가능한지 모르겠네"). 빌드를 망가뜨리는 검사가 아니라
현황 리포트다 — 실패 코드를 반환하지 않고, 공백 목록을 사람이 읽고
판단할 수 있게 보여주는 것이 목적이다.

검수 항목:
  ① 자료실 글 → 지도: card_ref 유무 (시리즈별 집계)
     - card_ref가 없는 것이 반드시 결함은 아니다. 세계사·사료비판처럼
       대응 카드가 없는 게 자연스러운 시리즈가 있다. 그래서 시리즈별로
       묶어 보여주고 판단은 사람이 한다.
  ② 자료실 card_ref → 실존 검증: 가리키는 이벤트가 해당 지도에 실제로
     있는지 (죽은 참조 탐지 — 이건 명백한 결함이다)
  ③ 유튜브 영상 → 지도: related_events*/related_routes 유무
  ④ 지도 카드 video 필드 → 유튜브 갤러리 등록 여부 교차 검증:
     카드에 박힌 youtube_id가 content/youtube_videos.js에 없으면 갤러리
     쪽 메타데이터(제목·연결)가 관리되지 않는 고아 영상이다.
  ⑤ 인물 교차 검수: 자료실 인물열전(biographies)의 각 인물이 지도
     카드·유튜브에도 존재하는지 이름 기준으로 확인.

실행: python3 build/audit_connections.py  (프로젝트 루트에서)
"""

import glob
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MAPS = {
    'root': 'data',
    'prehistory': 'maps/prehistory/data',
    'ancient': 'maps/ancient/data',
    'medieval1': 'maps/medieval1/data',
    'medieval2': 'maps/medieval2/data',
    'modern2': 'maps/modern2/data',
    'contemporary': 'maps/contemporary/data',
}


def strip_comments(text):
    return re.sub(r"^\s*//[^\n]*$", "", text, flags=re.M)


def collect_map_events():
    """지도별 {event_id: set(사람이름들)} + 전체 id 집합."""
    ids = {}
    people_by_id = {}
    for mk, d in MAPS.items():
        s = set()
        for fp in glob.glob(os.path.join(ROOT, d, '*.js')):
            if fp.endswith('archive_backlinks.js'):
                continue
            t = open(fp, encoding='utf-8').read()
            for m in re.finditer(r"id:'([^']+)'[^{]*?(?:people:\[([^\]]*)\])?", t):
                s.add(m.group(1))
                if m.group(2):
                    people_by_id[m.group(1)] = re.findall(r"'([^']+)'", m.group(2))
        ids[mk] = s
    return ids, people_by_id


def parse_archive():
    """시리즈별 posts: (post_id, title, card_ref, card_map, category)."""
    series = {}
    for fp in sorted(glob.glob(os.path.join(ROOT, 'content/archive/*.js'))):
        t = strip_comments(open(fp, encoding='utf-8').read())
        sid_m = re.search(r"^\s*id:\s*'([^']+)'", t, re.M)
        if not sid_m:
            continue
        sid = sid_m.group(1)
        cat_m = re.search(r"category:\s*'([^']+)'", t)
        cat = cat_m.group(1) if cat_m else '?'
        posts = []
        for b in re.split(r"\n\s{4,6}\{", t)[1:]:
            pid = re.search(r"id:\s*'([^']+)'", b)
            title = re.search(r"title_ko:\s*'((?:[^'\\]|\\.)*)'", b)
            if not (pid and title):
                continue
            ref = re.search(r"card_ref:\s*'([^']+)'", b)
            cmap = re.search(r"card_map:\s*'([^']+)'", b)
            posts.append({
                'id': pid.group(1),
                'title': title.group(1)[:38],
                'ref': ref.group(1) if ref else None,
                'map': cmap.group(1) if cmap else None,
            })
        series[sid] = {'category': cat, 'posts': posts}
    return series


def parse_videos():
    t = strip_comments(open(os.path.join(ROOT, 'content/youtube_videos.js'), encoding='utf-8').read())
    vids = []
    for b in re.split(r"\n\s{2}\{", t)[1:]:
        idm = re.search(r"id:\s*'(v_[^']+)'", b)
        if not idm:
            continue
        vids.append({
            'id': idm.group(1),
            'youtube_id': (re.search(r"youtube_id:\s*'([^']+)'", b) or [None, None])[1] if re.search(r"youtube_id:\s*'([^']+)'", b) else None,
            'title': (re.search(r"title:\s*'([^']+)'", b).group(1)[:40] if re.search(r"title:\s*'([^']+)'", b) else '?'),
            'linked': bool(re.search(r"related_(events[a-z_0-9]*|routes):\s*\[\s*'", b)),
            'tags': re.findall(r"'([^']+)'", (re.search(r"tags:\s*\[([^\]]*)\]", b) or [None, ''])[1] if re.search(r"tags:\s*\[([^\]]*)\]", b) else ''),
        })
    return vids


def collect_card_videos():
    """지도 카드에 박힌 video 필드의 youtube id 전수."""
    out = []
    for mk, d in MAPS.items():
        for fp in glob.glob(os.path.join(ROOT, d, '*.js')):
            if fp.endswith('archive_backlinks.js'):
                continue
            t = open(fp, encoding='utf-8').read()
            for m in re.finditer(r"id:'([^']+)'[^{]*?video:'([^']+)'", t):
                out.append((mk, m.group(1), m.group(2)))
    return out


def main():
    os.chdir(ROOT)
    map_ids, people_by_id = collect_map_events()
    all_ids = set().union(*map_ids.values())
    series = parse_archive()
    vids = parse_videos()

    print('=' * 62)
    print('① 자료실 → 지도 (card_ref) — 시리즈별')
    print('=' * 62)
    dead_refs = []
    for sid, s in series.items():
        n = len(s['posts'])
        linked = [p for p in s['posts'] if p['ref']]
        print(f"  [{s['category']:>13}] {sid:<28} {len(linked):>2}/{n}")
        for p in linked:
            target_map = p['map'] or 'root'
            if target_map in map_ids and p['ref'] not in map_ids[target_map]:
                dead_refs.append((sid, p['id'], p['ref'], target_map))

    print()
    print('=' * 62)
    print('② 죽은 card_ref (명백한 결함 — 즉시 수정 대상)')
    print('=' * 62)
    if dead_refs:
        for sid, pid, ref, mk in dead_refs:
            print(f"  ✗ {sid}/{pid} → {ref} ({mk} 지도에 없음)")
    else:
        print('  ✓ 없음 — 모든 card_ref가 실존 이벤트를 가리킴')

    print()
    print('=' * 62)
    print('③ 유튜브 → 지도 미연결 영상')
    print('=' * 62)
    un = [v for v in vids if not v['linked']]
    if un:
        for v in un:
            print(f"  - {v['id']} — {v['title']}")
    else:
        print('  ✓ 없음 — 전 영상이 이벤트 또는 루트에 연결됨')

    print()
    print('=' * 62)
    print('④ 지도 카드 video ↔ 유튜브 갤러리 교차 검증')
    print('=' * 62)
    gallery_ids = {v['youtube_id'] for v in vids if v['youtube_id']}
    card_videos = collect_card_videos()
    orphans = [(mk, eid, yid) for mk, eid, yid in card_videos if yid not in gallery_ids]
    print(f"  카드에 영상이 걸린 이벤트: {len(card_videos)}건")
    if orphans:
        print('  갤러리(youtube_videos.js)에 등록 안 된 고아 영상:')
        for mk, eid, yid in orphans:
            print(f"    - [{mk}] {eid} → {yid}")
    else:
        print('  ✓ 카드의 모든 영상이 갤러리에 등록돼 있음')

    print()
    print('=' * 62)
    print('⑤ 인물열전 인물 3중 연결 현황')
    print('=' * 62)
    for sid, s in series.items():
        if s['category'] != 'biographies':
            continue
        for p in s['posts']:
            # 글 제목 첫 어절을 인물 이름으로 간주 (제목 규칙: "이름 — ...")
            name = p['title'].split(' —')[0].split('—')[0].strip()
            on_map = '✓' if p['ref'] and p['ref'] in all_ids else '✗'
            in_yt = '✓' if any(name in v['tags'] or name in v['title'] for v in vids) else '✗'
            print(f"  {name:<8} 자료실 ✓ / 지도 {on_map} / 유튜브 {in_yt}")

    print()
    print('요약: ①은 시리즈 성격에 따라 판단(세계사·사료비판은 미연결이')
    print('자연스러움). ②와 ④는 발견 즉시 수정 대상. ③⑤는 콘텐츠 보강 과제.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
