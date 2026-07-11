# -*- coding: utf-8 -*-
"""
generate_slugs.py (root build/)
event/{slug}.html 슬러그를 카드 id에 배정한다.

핵심 원칙 — 기존 슬러그 보존:
이 모듈은 한 차례 소실됐다가(원본 절대경로 /home/claude/seo_build 등이
사라짐) 재구축됐다. 알고리즘을 다시 돌리면 룰이 조금만 달라져도 이미
검색엔진에 색인된 URL이 통째로 바뀌는 대참사가 나므로, event/ 아래
기존 HTML 파일에서 `event=카드id` 마커를 파싱해 id→슬러그 매핑을
그대로 복원하고, 그 목록에 없는 신규 카드에 대해서만 아래 알고리즘으로
새 슬러그를 계산한다. (2026-07 root/modern2 이벤트 페이지 생성기 복구
작업에서 확정된 방침 — maps/ancient/build/generate_event_pages.py의
자체 내장 알고리즘을 그대로 포팅했다.)
"""
import re
import os
import glob
import unicodedata

BUILD_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BUILD_DIR)
DATA_DIR = os.path.join(PROJECT_ROOT, 'data')
EVENT_DIR = os.path.join(PROJECT_ROOT, 'event')


def load_cards():
    """SEO 슬러그 계산에 필요한 최소 필드(id, year, title_en)만 추출한다."""
    cards = []
    for path in sorted(glob.glob(os.path.join(DATA_DIR, '*.js'))):
        if 'world_' in os.path.basename(path):
            continue
        content = open(path, encoding='utf-8').read()
        starts = [m.start() for m in re.finditer(r"^\s*\{\s*id:'", content, re.M)]
        for i, s in enumerate(starts):
            e = starts[i + 1] if i + 1 < len(starts) else len(content)
            block = content[s:e]
            m_id = re.search(r"id:'([a-zA-Z0-9_]+)'", block)
            m_year = re.search(r'year:(-?\d+)', block)
            m_ten = re.search(r'''title_en:(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")''', block)
            if not (m_id and m_year and m_ten):
                continue
            title_en = (m_ten.group(1) if m_ten.group(1) is not None else m_ten.group(2))
            cards.append({
                'id': m_id.group(1),
                'year': int(m_year.group(1)),
                'title_en': title_en.replace("\\'", "'"),
            })
    return cards


def slugify(text, max_len=42):
    """title_en에서 URL 슬러그를 만든다. em dash(—)나 콜론이 있으면
    그 앞부분(보통 사건의 핵심 제목)만 사용해 슬러그를 짧게 유지한다."""
    text = re.split(r'[—:]', text)[0].strip()
    text = unicodedata.normalize('NFKD', text)
    text = text.encode('ascii', 'ignore').decode('ascii')
    text = text.lower()
    text = re.sub(r"[’']", '', text)
    text = re.sub(r'[^a-z0-9]+', '-', text).strip('-')
    text = re.sub(r'-+', '-', text)
    if len(text) > max_len:
        truncated = text[:max_len]
        last_dash = truncated.rfind('-')
        text = truncated[:last_dash] if last_dash > 10 else truncated
    return text


def format_year_for_slug(year):
    """음수(기원전) 연도는 id 표기 관례(political_bc37_01 등)와 맞춰
    'bc37' 형태로 슬러그에 반영한다. 기원후는 그대로 숫자."""
    return f'bc{abs(year)}' if year < 0 else str(year)


def _existing_slug_map():
    """event/ 아래 기존 HTML에서 `event=카드id` 마커를 파싱해
    id -> slug(파일명) 매핑을 복원한다. 파일이 없으면 빈 dict."""
    existing = {}
    if not os.path.isdir(EVENT_DIR):
        return existing
    for path in glob.glob(os.path.join(EVENT_DIR, '*.html')):
        slug = os.path.splitext(os.path.basename(path))[0]
        content = open(path, encoding='utf-8').read()
        m = re.search(r'[?&]event=([a-zA-Z0-9_]+)', content)
        if m:
            existing[m.group(1)] = slug
    return existing


def assign_slugs(cards):
    """{year}-{slug} 형태로 슬러그를 만들되, 기존 페이지에서 복원한
    슬러그를 최우선으로 보존한다. 신규 카드만 새로 계산하고, 충돌 시
    -2, -3 … 접미를 붙인다. (slug_map, None) 튜플을 반환한다 — 호출부가
    이 튜플 형태를 기대한다."""
    existing = _existing_slug_map()
    used = {}
    slug_map = {}

    for cid, slug in existing.items():
        used[slug] = cid
        slug_map[cid] = slug

    for c in cards:
        if c['id'] in slug_map:
            continue
        base = f"{format_year_for_slug(c['year'])}-{slugify(c['title_en'])}"
        slug = base
        n = 2
        while slug in used and used[slug] != c['id']:
            slug = f"{base}-{n}"
            n += 1
        used[slug] = c['id']
        slug_map[c['id']] = slug

    return slug_map, None
