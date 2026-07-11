# -*- coding: utf-8 -*-
"""
era_breadcrumb.py (maps/modern2/build/)
event 페이지 JSON-LD BreadcrumbList의 4단 구조를 만든다:
["ATLAS", 시대구분, 타입라벨, 카드제목]

시대 경계와 타입 라벨은 기존에 생성돼 있던 340여 개
maps/modern2/event/*.html의 BreadcrumbList를 역으로 스캔해 복원한
값이다(2026-07 생성기 복구 작업).
"""

TYPE_LABELS = {
    'battle': '전투',
    'culture': '문화',
    'diplomacy': '외교',
    'economic': '경제·산업',
    'massacre': '학살',
    'migration': '이동',
    'movement': '운동',
    'organization': '조직',
    'person': '인물',
    'plot': '공작',
    'policy': '정책',
    'political': '정치',
    'science': '과학기술',
    'international': '외교',
    'righteous': '의열투쟁',
}

# (시작연도, 끝연도, 라벨) — 오름차순.
ERA_TABLE = [
    (-100000, 1945, '해방'),
    (1946, 1947, '미군정·소군정기'),
    (1948, 9999, '대한민국'),
]


def get_era_label(year):
    for start, end, label in ERA_TABLE:
        if start <= year <= end:
            return label
    return ERA_TABLE[-1][2]


def get_breadcrumb_type(type_key):
    return TYPE_LABELS.get(type_key, type_key or '')


def build_breadcrumb(card):
    era = get_era_label(card['year'])
    tlabel = get_breadcrumb_type(card.get('type'))
    return ['ATLAS', era, tlabel, card['title_ko']]
