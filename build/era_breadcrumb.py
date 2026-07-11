# -*- coding: utf-8 -*-
"""
era_breadcrumb.py (root build/)
event 페이지 JSON-LD BreadcrumbList의 4단 구조를 만든다:
["ATLAS", 시대구분, 타입라벨, 카드제목]

시대 경계와 타입 라벨은 기존에 생성돼 있던 452개 event/*.html의
BreadcrumbList를 역으로 스캔해 복원한 값이다(2026-07 생성기 복구
작업). 신규 카드가 이 표에 없는 type을 쓰면 KeyError 대신 type 문자열
자체를 라벨로 폴백한다 — 페이지 생성이 막히는 것보다는 낫다.
"""

TYPE_LABELS = {
    'battle': '전투',
    'culture': '문화',
    'international': '외교',
    'massacre': '학살',
    'migration': '이동',
    'movement': '운동',
    'organization': '조직',
    'person': '인물',
    'plot': '공작',
    'policy': '정책',
    'political': '정치',
    'righteous': '의열투쟁',
    'economic': '경제·산업',
    'science': '과학기술',
    'diplomacy': '외교',
}

# (시작연도, 끝연도, 라벨) — 오름차순. 마지막 구간이 이후 연도를 모두 흡수한다.
ERA_TABLE = [
    (-100000, 1875, '조선 (朝鮮)'),
    (1876, 1896, '조선 (朝鮮)'),
    (1897, 1909, '대한제국 (大韓帝國)'),
    (1910, 1944, '조선총독부 통치하'),
    (1945, 9999, '해방'),
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
