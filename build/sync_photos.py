# -*- coding: utf-8 -*-
"""build/sync_photos.py — 답사 사진 자동 동기화

2026-07-30 왕두목 확정. 「반자동보다 자동으로 사진 동기화 프로세스를
만들어주고, 최종 짚 패키징해서 내가 검토하며 팩트체크를 해서 필요하다면
그때 수정해도 늦지 않는다」

════════════════════════════════════════════════════════════════
■ 왕두목 논지의 정확한 부분과, 그것이 덮지 못하는 부분
════════════════════════════════════════════════════════════════

왕두목 지적: "이미 공공 포털에서 검증된 사진을 파일명으로 잘 올려
놓았을 거라는 믿음이 있어야 한다. 만약 그게 틀렸다면 내가 검색하더라도
결국 틀린 정보를 검색해서 본 꼴이다."

맞다. 다만 오류가 두 종류다.

  (A) 출처 자체의 라벨 오류
      국가유산포털이 사진 제목을 잘못 붙여둔 경우.
      → 사람이 골라도 똑같이 틀린다. 왕두목 논지가 정확히 맞는 영역이고,
        자동/수동의 차이가 없다. 그래서 이건 자동화의 반대 사유가 아니다.

  (B) 매칭 오류
      출처는 정확한데, 스크립트가 그 중에서 엉뚱한 것을 골라온 경우.
      "화순 고인돌"로 검색하면 화순적벽·운주사가 섞여 온다. 라벨은
      정확하지만 우리 카드에 맞는 사진은 아니다.
      → 이건 사람이 보면 즉시 걸러진다. 실제 실패의 대부분이 여기다.

그래서 이 스크립트의 설계 원칙은 하나다:

  ★ 확신이 없으면 붙이지 않고 비워둔다. 추측해서 채우지 않는다. ★

(B)를 자동으로 없애는 방법은 "잘 고르기"가 아니라 "애매하면 포기하기"다.
빈 자리는 '사진 준비 중' 띠로 표시되고 audit 보고서에 이유가 남는다.
없는 것은 눈에 보이지만, 틀린 것은 눈에 안 보인다 — 잔존도 4단계를
만든 것과 같은 논리다(갔는데 아무것도 없는 게 최악이라면, 사진이
틀린 것도 없는 것보다 나쁘다).

■ 팩트체크를 5분으로 줄이는 장치
  붙인 사진마다 photo_sources.json에 출처·원본 제목·촬영자·라이선스·
  검색어·신뢰점수를 남기고, photo_audit.md로 사람이 읽을 표를 만든다.
  왕두목이 볼 것은 딱 한 열이다 — 「카드 이름 vs 원본 제목」.
  이 둘이 어긋나면 그게 (B)이고, 한눈에 보인다.

════════════════════════════════════════════════════════════════
■ 사용법
════════════════════════════════════════════════════════════════

  # 인증키 (data.go.kr — 무료, 개발계정 자동승인)
  export DATA_GO_KR_KEY="발급받은_일반_인증키"

  python3 build/sync_photos.py --dry-run    # 무엇을 받을지만 확인
  python3 build/sync_photos.py              # 실제 동기화
  python3 build/sync_photos.py --force      # 이미 있는 파일도 다시 받기
  python3 build/sync_photos.py --self-test  # 네트워크 없이 매칭 로직 검증

  필요 패키지: pip3 install requests pillow

■ 출처 (우선순위 순)
  1. TourAPI 국문 관광정보 (data.go.kr 15101578)
     장소명 검색 → contentId → 그 장소의 이미지 목록.
     "키워드로 사진 찾기"가 아니라 "이 장소의 사진"이라 (B) 위험이 가장 낮다.
  2. 포토코리아 관광사진 (data.go.kr 15101914)
     공공누리 1유형. 촬영자를 주므로 credit 자동 기입이 된다.
  3. 위키미디어 커먼즈 (인증키 불필요)
     파일별 라이선스·저작자를 함께 준다. 폴백.

  ※ 국가유산청 Open API는 XML 전용이고 클라이언트 직접 호출이 막혀
    있어 서버/스크립트에서만 된다. 지정 국가유산 커버리지가 좋으므로
    2차로 붙일 후보다(SOURCES에 자리를 비워뒀다).
"""

import argparse
import io
import json
import os
import re
import sys
import unicodedata
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DAMSA = os.path.join(ROOT, 'maps', 'damsa')
PHOTO_DIR = os.path.join(DAMSA, 'photos')
THEMES_JS = os.path.join(DAMSA, 'data', 'themes.js')
MANIFEST = os.path.join(PHOTO_DIR, 'photo_sources.json')
AUDIT = os.path.join(PHOTO_DIR, 'photo_audit.md')

MAX_WIDTH = 1600          # 카드는 16:9로 잘라 쓴다. 그 이상은 모바일 낭비.
JPEG_QUALITY = 82
ACCEPT_SCORE = 5          # 이 점수 미만이면 붙이지 않는다

# ── 토큰 분류 ────────────────────────────────────────────────
# 지명 토큰만 신뢰한다. 아래 일반명사는 어느 후보에나 들어 있어서
# 변별력이 없다.
GENERIC = {
    '고인돌', '지석묘', '유적', '유적지', '공원', '박물관', '전시관', '기념관',
    '입구', '주차장', '안내소', '세계유산', '문화공원', '군', '리', '면', '읍',
    '발굴지', '보호각', '코스', '테마파크', '체험장', '역사', '자연사',
}
# 같은 대상을 가리키는 표현 — 하나라도 있으면 주제 점수를 준다.
SUBJECT_SYNONYMS = ['고인돌', '지석묘', 'дольмен', 'dolmen', 'Dolmen']


def nfc(s):
    """한글 파일명·비교용 정규화. NFC/NFD 섞임은 이 프로젝트에서 실제로
    사고를 낸 적이 있다(맥에서 만든 파일명이 NFD로 저장되는 문제)."""
    return unicodedata.normalize('NFC', s or '')


def norm(s):
    """포함 검사용 — 공백·괄호·문장부호를 지운다."""
    s = nfc(s)
    return re.sub(r'[\s\(\)\[\]·,\.\-_/]', '', s)


def tokens_of(*texts):
    """지명 토큰 집합을 뽑는다."""
    out = set()
    for t in texts:
        for w in re.split(r'[\s·,\(\)\[\]/]+', nfc(t or '')):
            w = w.strip()
            if len(w) < 2 or w in GENERIC:
                continue
            out.add(w)
    return out


# ── 한글 → 로마자 ────────────────────────────────────────────
# 왕두목님 첫 실행에서 한국 유적 전부 "후보 0장"이 나왔다. 원인은
# 위키미디어 커먼즈가 한국 유적 사진을 로마자 제목으로 저장하기
# 때문이다 — "Ganghwa Dolmen", "Bugeunri Dolmen" 식이다. 한글로
# 검색하면 하나도 안 걸린다.
#
# 그래서 (1) 검색어를 로마자로도 만들고, (2) 신원 확인 토큰도 로마자로
# 대조한다. 표를 손으로 관리하지 않고 변환기를 두는 이유는, 앞으로
# 「기억의 현장」·「조선 왕릉」이 붙어도 그대로 동작해야 하기 때문이다.
#
# 문화체육관광부 국어의 로마자 표기법을 음절 단위로만 적용한다.
# 자음 동화(죽림리 → Jungnim-ri)까지는 반영하지 않는다 — 검색어
# 용도라 대부분 맞으면 충분하고, 규칙을 다 넣으면 오히려 깨지기 쉽다.
_RR_INITIAL = ['g','kk','n','d','tt','r','m','b','pp','s','ss','','j','jj',
               'ch','k','t','p','h']
_RR_MEDIAL = ['a','ae','ya','yae','eo','e','yeo','ye','o','wa','wae','oe',
              'yo','u','wo','we','wi','yu','eu','ui','i']
_RR_FINAL = ['','k','k','k','n','n','n','t','l','k','m','l','l','l','p','l',
             'm','p','p','t','t','ng','t','t','k','t','p','h']


def rr(text):
    """한글을 로마자로 옮긴다. 한글이 아닌 글자는 그대로 둔다."""
    out = []
    for ch in nfc(text or ''):
        code = ord(ch) - 0xAC00
        if 0 <= code < 11172:
            out.append(_RR_INITIAL[code // 588])
            out.append(_RR_MEDIAL[(code % 588) // 28])
            out.append(_RR_FINAL[code % 28])
        else:
            out.append(ch)
    return ''.join(out).lower()


# 음절 단위 변환으로는 안 맞는 지명들. 자음 동화가 일어나는 경우다.
# 누락된 유적이 생기면 여기에 한 줄 추가하면 된다.
RR_ALIASES = {
    '죽림리': ['jungnimri', 'jungnim'],
    '효산리': ['hyosanri', 'hyosan'],
    '대신리': ['daesinri', 'daesin'],
    '부근리': ['bugeunri', 'bugeun'],
    '오상리': ['osangri', 'osang'],
    '도산리': ['dosanri', 'dosan'],
    '지석묘': ['dolmen'],
    '고인돌': ['dolmen'],
}

# 검색어로 쓸 가치가 낮은 토큰 — 시설명은 사진 제목에 거의 안 쓰인다.
# (첫 실행에서 '강화자연사박물관 dolmen', '133기 dolmen' 같은 무의미한
#  검색어가 만들어졌다. 정작 필요한 '부근리'는 뒤로 밀려 있었다.)
LOW_VALUE = ('박물관', '안내소', '테마파크', '문화공원', '체험장', '공원',
             '열차', '모로모로', '코스', '유적지')


def rr_all(token):
    """토큰의 로마자 표기 후보들."""
    out = [rr(token)]
    for a in RR_ALIASES.get(nfc(token), []):
        if a not in out:
            out.append(a)
    return out


def search_rank(token):
    """검색어로서의 가치. 낮을수록 먼저 쓴다.

    지명(…리·…골·…바위)이 사진 제목에 실제로 등장하는 단어다.
    숫자가 든 토큰('133기')과 시설명은 뒤로 보낸다.
    """
    t = nfc(token)
    if re.search(r'[0-9~]', t):
        return 90
    if any(w in t for w in LOW_VALUE):
        return 50
    if t.endswith(('리', '골', '바위', '동')):
        return 0
    return 20 + abs(len(t) - 3)


def in_hay(token, hay, hay_rr):
    """토큰이 후보 제목에 있는지 — 한글과 로마자 양쪽으로 본다."""
    if norm(token) in hay:
        return True
    for t in rr_all(token):
        if len(t) >= 4 and t in hay_rr:
            return True
    return False


# ── 한국 유적인지 ─────────────────────────────────────────────
# 첫 실행에서 테마 대표 사진으로 스페인 갈리시아의 고인돌
# ("Dolmen.001 - Castelo de San Antón.jpg")이 채택됐다. 제목에
# "Dolmen"만 있으면 통과하도록 기준을 풀어놨던 탓이다.
# 고인돌은 전 세계에 있으므로 주제어만으로는 부족하다 — 한국이라는
# 증거를 반드시 요구한다.
KOREA_MARKS = ['한국', '대한민국', 'korea', 'korean', 'joseon',
               'ganghwa', 'gochang', 'hwasun', 'incheon', 'jeolla',
               'jeollabuk', 'jeollanam', 'gyeonggi']


def looks_korean(cand, extra_marks=()):
    hay = norm(' '.join(filter(None, [cand.get('title'), cand.get('place'),
                                      cand.get('keyword')])))
    low = hay.lower()
    if re.search(r'[\uac00-\ud7a3]', hay):     # 한글이 들어 있으면 통과
        return True
    for m in list(KOREA_MARKS) + list(extra_marks):
        if m.lower() in low:
            return True
    return False


# ════════════════════════════════════════════════════════════
# 대상 목록 — themes.js가 단일 출처다
# ════════════════════════════════════════════════════════════
def _js_str(block, field):
    """블록 안에서  field: '값'  형태를 하나 뽑는다."""
    m = re.search(r"\b%s\s*:\s*'((?:[^'\\\\]|\\\\.)*)'" % re.escape(field), block)
    if not m:
        return ''
    return m.group(1).replace("\\'", "'").replace('\\\\', '\\')


def _js_num(block, field):
    m = re.search(r"\b%s\s*:\s*(-?[\d.]+)" % re.escape(field), block)
    return float(m.group(1)) if m else None


def _slice_balanced(text, start, open_ch, close_ch):
    """start 위치의 여는 괄호부터 짝이 맞는 닫는 괄호까지 잘라낸다.
    문자열 리터럴 안의 괄호는 세지 않는다."""
    depth = 0
    i = start
    quote = None
    while i < len(text):
        c = text[i]
        if quote:
            if c == '\\':
                i += 2
                continue
            if c == quote:
                quote = None
        elif c in ("'", '"'):
            quote = c
        elif c == open_ch:
            depth += 1
        elif c == close_ch:
            depth -= 1
            if depth == 0:
                return text[start:i + 1]
        i += 1
    return text[start:]


def load_targets():
    """themes.js에서 사진이 필요한 자리 목록을 읽는다.

    ── 왜 파이썬으로 직접 읽는가 ────────────────────────────────
    처음에는 `node -e`로 themes.js를 실제로 평가해서 JSON으로 받았다.
    데이터가 단일 출처여야 한다는 원칙에는 그게 가장 깔끔하다.

    그런데 왕두목님 맥북에는 Node가 없었고(FileNotFoundError: 'node'),
    사진 몇 장 받으려고 Node를 설치하게 만드는 건 말이 안 된다.
    이 프로젝트의 다른 node 스크립트들은 전부 Claude 쪽에서 돌려
    ZIP으로 넘기므로, 왕두목님 환경에 Node가 있어야 할 이유가 없다.

    그래서 파이썬만으로 읽는다. themes.js의 형식은 이 프로젝트가
    직접 정한 것이라(photo 블록도 여기서 생성했다) 구조가 안정적이다.
    파서를 두 개 두는 셈이라 원칙에서는 후퇴지만, 읽는 항목이
    id·name·navQuery·좌표·photo.src·sights 이름 여섯 개뿐이라
    어긋날 여지가 작다.
    ─────────────────────────────────────────────────────────────
    """
    src = io.open(THEMES_JS, encoding='utf-8').read()
    out = []

    # 테마 단위로 자른다. 최상위 배열의 요소마다 `id: '...'`가 하나씩 있다.
    arr_start = src.index('[', src.index('window.DAMSA_THEMES'))
    body = _slice_balanced(src, arr_start, '[', ']')

    for m in re.finditer(r"\n\s{2,4}\{\s*\n\s*id:\s*'([a-z0-9_\-]+)'", body):
        theme_id = m.group(1)
        block = _slice_balanced(body, body.index('{', m.start()), '{', '}')

        theme_photo = ''
        pm = re.search(r'photo:\s*\{', block)
        if pm:
            pblock = _slice_balanced(block, block.index('{', pm.start()), '{', '}')
            theme_photo = _js_str(pblock, 'src')
        title = _js_str(block, 'title')
        if theme_photo:
            out.append({'id': theme_id + '__theme', 'theme': theme_id,
                        'name': title, 'nav': title, 'photo': theme_photo,
                        'isTheme': True, 'sights': []})

        # places 배열만 떼어낸다 — regions에도 id가 있으므로 반드시 필요하다.
        pl = re.search(r'\n\s*places:\s*\[', block)
        if not pl:
            continue
        places_block = _slice_balanced(block, block.index('[', pl.start()), '[', ']')

        # 각 place는 `id: '...'`로 시작한다. sights 안에는 id가 없다.
        marks = [pm2.start() for pm2 in re.finditer(r"\bid:\s*'[a-z0-9_\-]+'", places_block)]
        for i, pos in enumerate(marks):
            nxt = marks[i + 1] if i + 1 < len(marks) else len(places_block)
            pb = places_block[pos:nxt]
            pid = _js_str(pb, 'id')

            photo = ''
            pm3 = re.search(r'photo:\s*\{', pb)
            if pm3:
                photo = _js_str(_slice_balanced(pb, pb.index('{', pm3.start()),
                                                '{', '}'), 'src')
            if not photo:
                continue      # 사진 자리가 없는 카드는 대상이 아니다

            sights = []
            sm = re.search(r'sights:\s*\[', pb)
            if sm:
                sb = _slice_balanced(pb, pb.index('[', sm.start()), '[', ']')
                sights = re.findall(r"\bname:\s*'((?:[^'\\\\]|\\\\.)*)'", sb)

            # place의 name은 sights보다 앞에 있다. sights 이름과 섞이지
            # 않도록 sights 블록 이전 구간에서만 찾는다.
            head = pb[:sm.start()] if sm else pb
            out.append({
                'id': pid, 'theme': theme_id,
                'name': _js_str(head, 'name'),
                'nav': _js_str(head, 'navQuery') or _js_str(head, 'name'),
                'address': _js_str(head, 'address'),
                'lat': _js_num(head, 'lat'), 'lng': _js_num(head, 'lng'),
                'photo': photo, 'sights': sights, 'isTheme': False,
            })
    return out


def add_distinctive(targets):
    """각 대상의 '변별 토큰'을 계산한다.  ★매칭 정확도의 핵심★

    같은 테마 안에서 그 대상만 가진 토큰이 변별 토큰이다.
      점골  → 점골     (다른 대상엔 없음)
      부근리 → 강화 고인돌공원과 점골이 공유 → 변별 토큰 아님

    이걸 쓰면 교차 오염을 자동으로 막는다. '점골' 카드에 후보 제목이
    "강화 부근리 지석묘"로 오면, 자기 변별 토큰(점골)이 없고 남의 변별
    토큰이 있으므로 탈락한다. 지명 목록을 손으로 관리할 필요가 없다.
    """
    by_theme = {}
    for t in targets:
        # ★ sights를 반드시 포함해야 한다 (자체 검증이 잡아낸 버그)
        #
        # 처음엔 name+nav만 썼다. 그러자 '부근리'가 점골 카드에만 있는
        # 것으로 계산돼 점골의 변별 토큰이 됐고, "강화 부근리 지석묘"
        # 사진이 점골 카드에 붙었다. 실제로 부근리 지석묘는 강화
        # 고인돌공원 카드의 대표 유적이다 — 그 정보가 name이 아니라
        # sights에 들어 있었다.
        #
        # 카드 단위가 주차장이므로, 그 주차장에서 볼 수 있는 유적 이름이
        # 곧 그 카드의 신원이다. 그걸 빼고 세면 안 된다.
        t['tokens'] = tokens_of(t['name'], t.get('nav'), *(t.get('sights') or []))
        by_theme.setdefault(t['theme'], []).append(t)
    for theme, group in by_theme.items():
        counts = {}
        for t in group:
            for tok in t['tokens']:
                counts[tok] = counts.get(tok, 0) + 1
        for t in group:
            t['distinctive'] = {tok for tok in t['tokens'] if counts[tok] == 1}
            t['others_distinctive'] = set()
        for t in group:
            for other in group:
                if other is t:
                    continue
                t['others_distinctive'] |= other['distinctive']
    return targets


# ════════════════════════════════════════════════════════════
# 매칭 — 순수 함수. --self-test로 네트워크 없이 검증한다.
# ════════════════════════════════════════════════════════════
def score_candidate(target, cand):
    """후보 사진 하나를 채점한다. (점수, 사유목록) 반환.

    cand = {'title':..., 'url':..., 'source':..., 'author':..., 'place':...}
    """
    hay = norm(' '.join(filter(None, [cand.get('title'), cand.get('place'),
                                      cand.get('keyword')])))
    hay_rr = hay.lower()      # 이미 로마자인 제목은 그대로 대조된다
    reasons = []
    score = 0

    # 지명 토큰 — 한글·로마자 양쪽으로 본다
    hit = [tok for tok in target['tokens'] if in_hay(tok, hay, hay_rr)]
    score += 3 * len(hit)
    if hit:
        reasons.append('지명 일치 %s' % '·'.join(sorted(hit)))

    # 주제어
    if any(norm(w) in hay for w in SUBJECT_SYNONYMS):
        score += 2
        reasons.append('주제어 일치')
    else:
        score -= 3
        reasons.append('주제어 없음(-3)')

    # ★ 자기 변별 토큰은 감점이 아니라 '통과 조건'이다  ★핵심★
    #
    # 감점(-5)으로 두면 다른 점수가 쌓여 문턱을 넘는 일이 생긴다.
    # 자체 검증에서 실제로 그랬다 — '강화'(+3)와 '부근리'(+3)와 주제어(+2)를
    # 합쳐 정확히 기준점에 닿아, 신원이 확인되지 않은 사진이 통과했다.
    #
    # 신원 확인은 다른 증거로 상쇄될 수 있는 항목이 아니다. 그래서 하드
    # 게이트로 바꿨다: 그 카드만 가진 토큰이 후보 제목에 없으면 탈락.
    # 이 때문에 맞는 사진도 더러 놓친다(예: 부근리는 점골과 지번을 공유해
    # 어느 쪽으로도 확정할 수 없어 양쪽 다 보류된다). 그건 감수한다 —
    # 빈 자리는 audit에 남아 눈에 보이지만, 틀린 사진은 안 보인다.
    own = [tok for tok in target['distinctive'] if in_hay(tok, hay, hay_rr)]
    if target['distinctive']:
        if own:
            score += 4
            reasons.append('신원 확인 %s' % '·'.join(sorted(own)))
        else:
            reasons.append('신원 확인 실패 — 이 답사지만의 토큰이 제목에 없음')
            return -99, reasons

    # ★ 남의 변별 토큰이 있으면 즉시 탈락시킨다
    intruder = [tok for tok in target['others_distinctive']
                if in_hay(tok, hay, hay_rr)]
    if intruder:
        score -= 10
        reasons.append('다른 답사지 토큰 %s(-10)' % '·'.join(sorted(intruder)))

    # 출처 신뢰도 — TourAPI는 contentId로 그 장소에 묶인 사진이라 가산점
    if cand.get('source') == 'tourapi_detail':
        score += 2
        reasons.append('장소 귀속 사진(+2)')

    return score, reasons


def pick_best(target, candidates):
    """가장 좋은 후보 하나를 고른다. 문턱 미달이면 None.

    ★ 테마 대표 사진은 판정 기준이 다르다 (dry-run에서 발견한 구멍)
      테마 이름은 '고인돌' 하나뿐이라 지명 토큰이 0개다. 그래서 아무리
      좋은 후보가 와도 점수가 2점(주제어만)에서 멈추고, theme-dolmen.jpg는
      영원히 비어 있게 된다.
      그런데 테마 카드에 필요한 건 '특정 유적의 사진'이 아니라 '대표성 있는
      고인돌 사진'이다 — 신원 확인이 애초에 필요 없는 자리다. 그래서
      테마는 주제어만 확인하고, 권역 이름(강화·고창·화순)이 붙어 있으면
      가산점을 준다.
    """
    scored = []
    for c in candidates:
        s, why = score_candidate(target, c)
        if target.get('isTheme'):
            hay = norm(' '.join(filter(None, [c.get('title'), c.get('place')])))
            low = hay.lower()
            has_subject = any(norm(w) in hay for w in SUBJECT_SYNONYMS) or \
                'dolmen' in low
            if not has_subject:
                s, why = -99, ['주제어 없음']
            elif not looks_korean(c):
                # ★ 첫 실행에서 스페인 고인돌이 채택된 지점이다.
                s, why = -99, ['한국 유적이라는 증거 없음 — 해외 고인돌로 보임']
            else:
                s = 5 + sum(1 for rg, en in (('강화', 'ganghwa'), ('고창', 'gochang'),
                                             ('화순', 'hwasun'))
                            if norm(rg) in hay or en in low)
                why = ['테마 대표 — 한국 고인돌 확인']
        scored.append((s, why, c))
    scored.sort(key=lambda x: -x[0])
    if not scored:
        return None, [], '후보 없음'
    top_score, top_why, top = scored[0]
    # 테마는 동점이어도 무방하다 — 어느 고인돌 사진이든 대표가 된다.
    if target.get('isTheme'):
        return ((top, top_score, top_why), scored, None) if top_score >= 5 \
            else (None, scored, '주제어가 확인되는 후보 없음')
    if top_score < ACCEPT_SCORE:
        return None, scored, ('최고점 %d < 기준 %d — 확신 부족으로 건너뜀'
                              % (top_score, ACCEPT_SCORE))
    # ★ "동점이면 무조건 보류"는 너무 거칠었다 (첫 실행 로그에서 드러남)
    #
    # 커먼즈는 위키미디어 카테고리 단위로 검색되므로, 같은 유적을 다른
    # 각도에서 찍은 사진 여러 장이 똑같은 토큰을 맞혀 나란히 동점을
    # 받는 일이 흔하다. 이건 위험한 동점이 아니라 "어느 걸 써도 맞는"
    # 동점이다. 오상리·죽림리·효산리·대신리가 전부 이 이유로 멀쩡한
    # 사진을 놓치고 보류됐다.
    #
    # 위험한 동점은 따로 있다 — 서로 다른 답사지를 가리키는 후보 두 개가
    # 우연히 같은 점수를 받는 경우(부근리처럼 두 카드가 지번을 공유할 때).
    # 그래서 "동점인가"가 아니라 "동점인 후보들이 서로 다른 곳을 말하고
    # 있는가"를 본다 — 제목에서 서로 안 겹치는 변별 토큰이 있으면 위험한
    # 동점, 실질적으로 같은 대상(제목이 겹치거나 변별 토큰이 없음)이면
    # 그냥 최고점을 채택한다.
    if len(scored) > 1 and scored[1][0] >= top_score:
        tied = [c for sc, _, c in scored if sc >= top_score]
        own_hit_titles = set()
        for c in tied:
            hay = norm(' '.join(filter(None, [c.get('title'), c.get('place')])))
            hay_rr = hay.lower()
            hit = tuple(sorted(tok for tok in target['distinctive']
                               if in_hay(tok, hay, hay_rr)))
            own_hit_titles.add(hit)
        if len(own_hit_titles) > 1:
            return None, scored, '동점 후보들이 서로 다른 곳을 가리켜 판단 보류'
        # 실질적으로 같은 대상 — 최고점 하나를 그냥 쓴다.
    return (top, top_score, top_why), scored, None


# ════════════════════════════════════════════════════════════
# 출처별 후보 수집 (네트워크)
# ════════════════════════════════════════════════════════════
DEBUG = False


# ── 인증키 처리 ───────────────────────────────────────────────
# data.go.kr은 인증키를 두 형태로 준다.
#   · 일반 인증키(Decoding) : 원본.  예)  abc+de/fg==
#   · 일반 인증키(Encoding) : URL 인코딩본. 예) abc%2Bde%2Ffg%3D%3D
#
# requests는 params로 넘긴 값을 자동으로 URL 인코딩한다. 그래서 Encoding
# 키를 그대로 넘기면 이중 인코딩이 되어 401(SERVICE_KEY_IS_NOT_REGISTERED)이
# 난다. 반대로 어떤 API는 Encoding만 받는다고 알려져 있다.
#
# 왕두목님이 "둘 중 뭘 복사해야 하지"로 헤매지 않도록, 어느 쪽을 넣어도
# 되게 만든다: %가 보이면 원본으로 되돌려 놓는다.
def normalize_key(raw):
    import urllib.parse
    k = (raw or '').strip().strip('"').strip("'")
    if '%' in k:
        dec = urllib.parse.unquote(k)
        if dec != k:
            return dec, True
    return k, False


def check_key(raw):
    """인증키가 실제로 동작하는지 한 번만 호출해서 확인한다.

    비개발자에게 401 원문을 보여주는 건 도움이 안 된다. 되는지 안 되는지,
    안 되면 무엇을 하면 되는지만 한국말로 알려준다.
    """
    key, was_encoded = normalize_key(raw)
    if not key:
        print('✘ 인증키가 설정되지 않았습니다.')
        print('  터미널에 이렇게 넣어주세요:')
        print('    export DATA_GO_KR_KEY="복사한_인증키"')
        return 1
    print('인증키 확인 중… (앞 6자리: %s…, 길이 %d)' % (key[:6], len(key)))
    if was_encoded:
        print('  · Encoding 키를 넣으신 것 같아 원본 형태로 되돌렸습니다. 괜찮습니다.')

    ok = []
    for name, url, params in (
        ('국문 관광정보(장소 검색)',
         'http://apis.data.go.kr/B551011/KorService2/searchKeyword2',
         {'keyword': '강화 고인돌'}),
        ('관광사진(포토코리아)',
         'http://apis.data.go.kr/B551011/PhotoGalleryService1/galleryList1',
         {'keyword': '고인돌', 'arrange': 'A'}),
    ):
        base = {'serviceKey': key, 'MobileOS': 'ETC', 'MobileApp': 'ATLAS',
                '_type': 'json', 'numOfRows': 3, 'pageNo': 1}
        base.update(params)
        try:
            r = _get(url, base, timeout=20)
            txt = r.text
            if 'SERVICE_KEY_IS_NOT_REGISTERED' in txt or 'SERVICE ACCESS DENIED' in txt:
                print('  ✘ %-22s 인증키가 아직 등록되지 않았습니다.' % name)
                continue
            if 'LIMITED_NUMBER_OF_SERVICE' in txt:
                print('  ✘ %-22s 오늘 호출 한도를 넘겼습니다. 내일 다시.' % name)
                continue
            try:
                body = r.json().get('response', {}).get('body', {})
                cnt = body.get('totalCount', '?')
            except Exception:
                print('  ? %-22s 응답을 읽지 못했습니다. --debug로 확인 필요.' % name)
                continue
            print('  ✔ %-22s 정상 (검색 결과 %s건)' % (name, cnt))
            ok.append(name)
        except Exception as e:
            print('  ✘ %-22s 연결 실패: %s' % (name, e))

    print()
    if len(ok) == 2:
        print('두 창구 모두 정상입니다. 이제 이걸 실행하세요:')
        print('  python3 build/sync_photos.py --dry-run')
        return 0
    if ok:
        print('한 곳만 됩니다. 안 되는 쪽은 활용신청이 아직 안 된 것일 수 있습니다.')
        print('그래도 진행은 가능합니다:  python3 build/sync_photos.py --dry-run')
        return 0
    print('둘 다 실패했습니다. 아래를 확인해 주세요.')
    print('  1) 발급 직후에는 1시간쯤 활성화가 안 될 수 있습니다. 기다려 보세요.')
    print('  2) data.go.kr 마이페이지 > 데이터활용 > 오픈API >')
    print('     활용신청 현황에서 두 API가 "승인" 상태인지 확인하세요.')
    print('  3) 인증키를 다시 복사해 붙여 보세요(앞뒤 공백 주의).')
    return 1


def _get(url, params=None, timeout=20):
    import requests
    r = requests.get(url, params=params, timeout=timeout,
                     headers={'User-Agent': 'ATLAS-by-MKHZ/1.0 (https://atlas.mkhz.kr; photo sync)'})
    if DEBUG:
        # ★ 왕두목님 환경에서만 실제 API를 부를 수 있으므로, 응답 모양이
        #   내 예상과 다를 때 이 출력을 그대로 붙여주시면 한 번에 고칠 수
        #   있다. TourAPI는 버전이 오르며 필드·오퍼레이션명이 바뀌어 왔다.
        print('    [debug] %s → HTTP %s' % (url.rsplit('/', 1)[-1], r.status_code))
        body = r.text[:900].replace('\n', ' ')
        print('    [debug] %s' % body)
    r.raise_for_status()
    return r


def cands_tourapi(target, key):
    """TourAPI: 장소명 검색 → contentId → 그 장소의 이미지 목록.

    정확한 오퍼레이션 이름·버전은 공공데이터포털 Swagger UI에서 확인해
    맞춰야 한다(버전이 올라가며 searchKeyword1/2 처럼 접미가 바뀌어 왔다).
    실패하면 조용히 빈 목록을 돌려주고 다음 출처로 넘어간다.
    """
    out = []
    base = 'http://apis.data.go.kr/B551011/KorService2'
    common = {'serviceKey': key, 'MobileOS': 'ETC', 'MobileApp': 'ATLAS',
              '_type': 'json', 'numOfRows': 10, 'pageNo': 1}
    try:
        r = _get(base + '/searchKeyword2',
                 dict(common, keyword=target['nav']))
        items = (r.json().get('response', {}).get('body', {})
                 .get('items') or {}).get('item') or []
        if isinstance(items, dict):
            items = [items]
        for it in items[:3]:
            cid = it.get('contentid')
            if not cid:
                continue
            try:
                ri = _get(base + '/detailImage2',
                          dict(common, contentId=cid, imageYN='Y'))
                imgs = (ri.json().get('response', {}).get('body', {})
                        .get('items') or {}).get('item') or []
                if isinstance(imgs, dict):
                    imgs = [imgs]
            except Exception:
                imgs = []
            for im in imgs:
                url = im.get('originimgurl') or im.get('smallimageurl')
                if not url:
                    continue
                out.append({
                    'title': it.get('title', ''),
                    'place': it.get('addr1', ''),
                    'url': url,
                    'source': 'tourapi_detail',
                    'source_id': str(cid),
                    'author': '',
                    'license': '한국관광공사 TourAPI (자유 활용 선별 개방)',
                    'credit': 'ⓒ한국관광공사',
                })
    except Exception as e:
        print('    ! TourAPI 실패: %s' % e)
    return out


def cands_phoko(target, key):
    """포토코리아 관광사진 — 공공누리 1유형. 촬영자를 주므로 credit 자동화."""
    out = []
    try:
        r = _get('http://apis.data.go.kr/B551011/PhotoGalleryService1/galleryList1',
                 {'serviceKey': key, 'MobileOS': 'ETC', 'MobileApp': 'ATLAS',
                  '_type': 'json', 'numOfRows': 20, 'pageNo': 1,
                  'arrange': 'A', 'keyword': target['nav']})
        items = (r.json().get('response', {}).get('body', {})
                 .get('items') or {}).get('item') or []
        if isinstance(items, dict):
            items = [items]
        for it in items:
            url = it.get('galWebImageUrl') or it.get('galOriginImgUrl')
            if not url:
                continue
            author = it.get('galPhotographer', '') or ''
            out.append({
                'title': it.get('galTitle', ''),
                'place': it.get('galPhotographyLocation', ''),
                'keyword': it.get('galSearchKeyword', ''),
                'url': url,
                'source': 'phoko',
                'source_id': str(it.get('galContentId', '')),
                'author': author,
                'license': '공공누리 제1유형 (출처표시)',
                'credit': ('ⓒ한국관광공사 포토코리아 – %s' % author) if author
                          else 'ⓒ한국관광공사 포토코리아',
            })
    except Exception as e:
        print('    ! 포토코리아 실패: %s' % e)
    return out


def commons_queries(target):
    """커먼즈에 던질 검색어들을 만든다.

    한글 검색어만으로는 0장이 나온다(왕두목님 첫 실행에서 확인).
    커먼즈의 한국 유적 파일은 로마자 제목이 대부분이므로 로마자
    조합을 함께 던진다. 여러 검색어의 결과는 뒤에서 합쳐서 채점한다.
    """
    qs = [target['nav']]                       # 한글 원문도 남긴다
    toks = sorted(target.get('distinctive') or target['tokens'],
                  key=lambda t: (search_rank(t), -len(t)))
    region = None
    for rg in ('강화', '고창', '화순'):
        if rg in nfc(target['name']) or rg in nfc(target.get('nav') or ''):
            region = rg
            break
    for tok in toks[:2]:
        if search_rank(tok) >= 50:      # 시설명·숫자는 검색어로 쓰지 않는다
            continue
        for r in rr_all(tok)[:2]:
            if len(r) < 4:
                continue
            qs.append('%s dolmen' % r)
            if region:
                qs.append('%s %s dolmen' % (rr(region), r))
    if region:
        qs.append('%s dolmen' % rr(region))
        qs.append('%s dolmen site' % rr(region))
    if target.get('isTheme'):
        qs += ['Korea dolmen', 'Korean dolmen site', 'Ganghwa dolmen',
               'Gochang dolmen', 'Hwasun dolmen']
    seen, out = set(), []
    for q in qs:
        if q and q not in seen:
            seen.add(q)
            out.append(q)
    return out[:6]          # 너무 많이 던지면 느리고 커먼즈에도 실례다


def cands_commons(target):
    """위키미디어 커먼즈 — 인증키 불필요. 라이선스·저작자를 함께 받는다."""
    out, seen = [], set()
    for q in commons_queries(target):
        try:
            r = _get('https://commons.wikimedia.org/w/api.php', {
                'action': 'query', 'format': 'json', 'generator': 'search',
                'gsrnamespace': 6, 'gsrsearch': q, 'gsrlimit': 15,
                'prop': 'imageinfo', 'iiprop': 'url|extmetadata',
                'iiurlwidth': MAX_WIDTH,
            })
            pages = (r.json().get('query') or {}).get('pages') or {}
        except Exception as e:
            print('    ! 커먼즈 실패(%s): %s' % (q, e))
            continue
        for pg in pages.values():
            title = pg.get('title', '')
            if title in seen:
                continue
            seen.add(title)
            info = (pg.get('imageinfo') or [{}])[0]
            meta = info.get('extmetadata') or {}

            def mv(k):
                return re.sub(r'<[^>]+>', '',
                              (meta.get(k) or {}).get('value', '') or '')
            lic = mv('LicenseShortName')
            # 상업적 이용 금지·변경 금지는 걸러낸다 — ATLAS는 웹 서비스이고,
            # 사진을 16:9로 자르므로 '변경 금지'도 위반이 된다.
            lic_tokens = set(re.split(r'[\s\-/,]+', lic.upper()))
            if lic_tokens & {'NC', 'ND', 'NONCOMMERCIAL', 'NODERIVS',
                             'NODERIVATIVES'}:
                continue
            if not lic:      # 라이선스를 못 읽은 것도 버린다
                continue
            url = info.get('thumburl') or info.get('url')
            if not url:
                continue
            author = mv('Artist')
            out.append({
                'title': title.replace('File:', ''),
                'place': mv('ObjectName'),
                'keyword': q,
                'url': url,
                'source': 'commons',
                'source_id': title,
                'author': author,
                'license': lic,
                'credit': ('%s / Wikimedia Commons (%s)' % (author, lic)).strip(' /'),
            })
    return out


# ════════════════════════════════════════════════════════════
# 내려받기 + 가공
# ════════════════════════════════════════════════════════════
def download(url, dest):
    from PIL import Image
    r = _get(url, timeout=45)
    img = Image.open(io.BytesIO(r.content))
    if img.mode not in ('RGB', 'L'):
        img = img.convert('RGB')
    if img.width > MAX_WIDTH:
        h = round(img.height * MAX_WIDTH / img.width)
        # Pillow 10에서 상수가 Image.Resampling으로 옮겨졌다.
        # 구버전·신버전 모두에서 동작하도록 안전하게 집는다.
        resample = getattr(getattr(Image, 'Resampling', Image), 'LANCZOS', 1)
        img = img.resize((MAX_WIDTH, h), resample)
    img.save(dest, 'JPEG', quality=JPEG_QUALITY, optimize=True,
             progressive=True)
    return img.size, os.path.getsize(dest)


def patch_credit(place_id, credit):
    """themes.js의 해당 photo.credit 칸을 채운다.

    사람이 쓴 파일을 스크립트가 고치는 일이라 범위를 최대한 좁혔다 —
    그 place의 photo 블록 안에 있는 credit: '' 하나만 바꾼다.
    실패하면 False를 돌려주고 audit에 남겨 수동 처리하게 한다.
    """
    s = io.open(THEMES_JS, encoding='utf-8').read()
    anchor = "id: '%s'," % place_id
    i = s.find(anchor)
    if i < 0:
        return False
    j = s.find("credit: ''", i)
    if j < 0 or j - i > 1200:      # photo 블록을 벗어나면 손대지 않는다
        return False
    esc = credit.replace('\\', '\\\\').replace("'", "\\'")
    s = s[:j] + ("credit: '%s'" % esc) + s[j + len("credit: ''"):]
    io.open(THEMES_JS, 'w', encoding='utf-8').write(s)
    return True


# ════════════════════════════════════════════════════════════
def sync(args):
    key, was_encoded = normalize_key(os.environ.get('DATA_GO_KR_KEY', ''))
    if key:
        print('인증키 사용 (앞 6자리 %s…)%s'
              % (key[:6], ' — Encoding 키를 원본으로 되돌렸습니다' if was_encoded else ''))
    else:
        print('! 인증키가 없어 위키미디어 커먼즈만 사용합니다.')
        print('  한국관광공사 사진을 쓰려면 아래를 먼저 실행해 확인하세요:')
        print('    export DATA_GO_KR_KEY="발급받은_인증키"')
        print('    python3 build/sync_photos.py --check-key')

    targets = add_distinctive(load_targets())
    os.makedirs(PHOTO_DIR, exist_ok=True)
    manifest = {}
    if os.path.exists(MANIFEST):
        try:
            manifest = json.load(io.open(MANIFEST, encoding='utf-8'))
        except Exception:
            manifest = {}

    rows = []
    for t in targets:
        fname = nfc(os.path.basename(t['photo']))
        dest = os.path.join(PHOTO_DIR, fname)
        print('\n▶ %s  (%s)' % (t['name'], fname))
        print('    변별 토큰: %s' % (', '.join(sorted(t['distinctive'])) or '(없음)'))

        if os.path.exists(dest) and not args.force:
            print('    이미 있음 — 건너뜀')
            rows.append(dict(target=t, status='skip_exists'))
            continue

        cands = []
        if key:
            cands += cands_tourapi(t, key)
            cands += cands_phoko(t, key)
        cands += cands_commons(t)
        print('    후보 %d장' % len(cands))

        best, scored, why = pick_best(t, cands)
        if not best:
            print('    → 붙이지 않음: %s' % why)
            rows.append(dict(target=t, status='no_confident_match', why=why,
                             scored=scored[:5]))
            continue

        cand, score, reasons = best
        print('    → 채택(%d점): %s [%s]' % (score, cand['title'], cand['source']))
        print('       사유: %s' % '; '.join(reasons))
        if args.dry_run:
            rows.append(dict(target=t, status='dry_run', cand=cand,
                             score=score, reasons=reasons))
            continue

        try:
            size, bytes_ = download(cand['url'], dest)
        except Exception as e:
            print('    ! 내려받기 실패: %s' % e)
            rows.append(dict(target=t, status='download_failed', why=str(e)))
            continue

        ok = patch_credit(t['id'], cand['credit']) if not t['isTheme'] else False
        manifest[t['id']] = {
            'file': fname, 'card_name': t['name'],
            'source': cand['source'], 'source_id': cand.get('source_id', ''),
            'source_title': cand['title'], 'source_place': cand.get('place', ''),
            'author': cand.get('author', ''), 'license': cand.get('license', ''),
            'credit': cand['credit'], 'credit_written': ok,
            'query': t['nav'], 'score': score, 'reasons': reasons,
            'url': cand['url'], 'px': list(size), 'bytes': bytes_,
            'fetched': date.today().isoformat(),
        }
        rows.append(dict(target=t, status='ok', cand=cand, score=score,
                         reasons=reasons, px=size, bytes=bytes_,
                         credit_written=ok))
        print('       저장 %dx%d, %.0fKB, credit %s'
              % (size[0], size[1], bytes_ / 1024,
                 '기입됨' if ok else '수동 필요'))

    if not args.dry_run:
        json.dump(manifest, io.open(MANIFEST, 'w', encoding='utf-8'),
                  ensure_ascii=False, indent=2)
        write_audit(rows, manifest)
    summarize(rows)


def write_audit(rows, manifest):
    """사람이 읽는 팩트체크 표. ★왕두목이 볼 것은 마지막 열이다★"""
    L = []
    L.append('# 답사 사진 동기화 감사 보고서\n')
    L.append('생성 %s · `build/sync_photos.py`\n' % date.today().isoformat())
    L.append('\n## 팩트체크 방법\n')
    L.append('\n아래 표에서 **「카드 이름」과 「원본 제목」을 나란히 읽으세요.**\n')
    L.append('이 둘이 가리키는 곳이 다르면 매칭 오류입니다. 해당 파일을\n')
    L.append('`maps/damsa/photos/`에서 지우고 직접 넣으시면 됩니다.\n')
    L.append('\n라이선스 열이 공공누리 제1유형이면 출처표시가 의무입니다 —\n')
    L.append('`credit` 열이 "기입됨"인지 확인하세요.\n')
    L.append('\n## 붙은 사진\n\n')
    L.append('| 카드 이름 | 원본 제목 | 출처 | 라이선스 | credit | 점수 |\n')
    L.append('|---|---|---|---|---|---|\n')
    any_ok = False
    for r in rows:
        if r['status'] != 'ok':
            continue
        any_ok = True
        c = r['cand']
        L.append('| %s | **%s** | %s | %s | %s | %d |\n' % (
            r['target']['name'], c['title'] or '(제목 없음)', c['source'],
            c.get('license', ''), '기입됨' if r['credit_written'] else '수동 필요',
            r['score']))
    if not any_ok:
        L.append('| — | (없음) | | | | |\n')

    L.append('\n## 붙이지 않은 자리 — 확신이 부족해 비워둔 것\n\n')
    L.append('추측해서 채우는 대신 비워뒀습니다. 카드에는 「사진 준비 중」\n')
    L.append('띠가 표시되며, 직접 넣으시면 즉시 반영됩니다.\n\n')
    gaps = [r for r in rows if r['status'] in
            ('no_confident_match', 'download_failed')]
    if not gaps:
        L.append('없습니다 — 모든 자리가 채워졌습니다.\n')
    for r in gaps:
        L.append('\n### %s\n' % r['target']['name'])
        L.append('- 필요 파일: `%s`\n' % os.path.basename(r['target']['photo']))
        L.append('- 이유: %s\n' % r.get('why', ''))
        for s, why, c in (r.get('scored') or [])[:3]:
            L.append('  - 탈락 후보 %d점 — %s (%s)\n'
                     % (s, c.get('title', ''), '; '.join(why)))
    io.open(AUDIT, 'w', encoding='utf-8').writelines(L)
    print('\n감사 보고서: maps/damsa/photos/photo_audit.md')


def summarize(rows):
    from collections import Counter
    c = Counter(r['status'] for r in rows)
    print('\n' + '=' * 56)
    print('완료 — 채택 %d · 확신부족 %d · 기존유지 %d · 실패 %d'
          % (c.get('ok', 0) + c.get('dry_run', 0),
             c.get('no_confident_match', 0), c.get('skip_exists', 0),
             c.get('download_failed', 0)))
    print('=' * 56)


# ════════════════════════════════════════════════════════════
# 자체 검증 — 네트워크 없이 매칭 로직만 시험한다
# ════════════════════════════════════════════════════════════
def self_test():
    targets = add_distinctive(load_targets())
    by_id = {t['id']: t for t in targets}

    print('■ 변별 토큰 계산 결과\n')
    for t in targets:
        if t['isTheme']:
            continue
        print('  %-38s → %s' % (t['name'][:36],
              ', '.join(sorted(t['distinctive'])) or '(없음)'))

    # 실제 API가 흔히 돌려주는 모양을 흉내낸 후보들
    MOCK = [
        {'title': '강화 부근리 지석묘', 'source': 'tourapi_detail', 'url': 'x'},
        {'title': '강화 점골 고인돌', 'source': 'phoko', 'url': 'x'},
        {'title': '화순 고인돌 유적 핑매바위', 'source': 'phoko', 'url': 'x'},
        {'title': '화순적벽', 'source': 'phoko', 'url': 'x'},
        {'title': '고창읍성 성곽', 'source': 'phoko', 'url': 'x'},
        {'title': '고창 죽림리 지석묘군', 'source': 'tourapi_detail', 'url': 'x'},
        {'title': '운주사 와불', 'source': 'phoko', 'url': 'x'},
        {'title': '강화 오상리 고인돌군', 'source': 'commons', 'url': 'x'},
    ]

    CASES = [
        ('dolmen-ganghwa-jeomgol', '강화 점골 고인돌'),
        # 부근리는 점골과 지번을 공유한다(둘 다 하점면 부근리). 어느
        # 카드로도 확정할 수 없으므로 보류가 정답이다.
        ('dolmen-ganghwa-park', None),
        ('dolmen-gochang-museum', '고창 죽림리 지석묘군'),
        ('dolmen-hwasun-daesin', '화순 고인돌 유적 핑매바위'),
        ('dolmen-ganghwa-osangri', '강화 오상리 고인돌군'),
        # 테마 대표 — 특정 유적이 아니라 '고인돌 사진이면 무엇이든' 정답이다.
        # 그래서 기대값을 집합으로 둔다(어느 것이 뽑혀도 통과).
        ('dolmen__theme', {'강화 부근리 지석묘', '강화 점골 고인돌',
                           '고창 죽림리 지석묘군', '강화 오상리 고인돌군',
                           '화순 고인돌 유적 핑매바위'}),
    ]

    print('\n■ 매칭 시험 — 오염 후보(화순적벽·고창읍성·운주사)를 섞어 넣었다\n')
    fails = 0
    for pid, expect in CASES:
        t = by_id[pid]
        best, scored, why = pick_best(t, MOCK)
        got = best[0]['title'] if best else None
        ok = (got in expect) if isinstance(expect, set) else (got == expect)
        if not ok:
            fails += 1
        print('  %s %-36s' % ('✔' if ok else '✘', t['name'][:34]))
        print('      기대: %s' % ('고인돌 사진 아무것이나' if isinstance(expect, set)
                                 else (expect or '(보류)')))
        print('      결과: %s%s' % (got or '(보류)',
              '' if best else ' — %s' % why))

    print('\n■ 오염 후보가 채택되지 않는지 전수 확인')
    bad = {'화순적벽', '고창읍성 성곽', '운주사 와불'}
    leaked = 0
    for t in targets:
        if t['isTheme']:
            continue
        best, _, _ = pick_best(t, MOCK)
        if best and best[0]['title'] in bad:
            print('  ✘ %s ← %s' % (t['name'], best[0]['title']))
            leaked += 1
    print('  오염 채택 %d건 %s' % (leaked, '✔' if leaked == 0 else '← 문제'))

    print('\n%s' % ('자체 검증 통과' if fails == 0 and leaked == 0
                    else '자체 검증 실패 %d건' % (fails + leaked)))
    return 0 if (fails == 0 and leaked == 0) else 1


def main():
    ap = argparse.ArgumentParser(description='답사 사진 자동 동기화')
    ap.add_argument('--dry-run', action='store_true', help='내려받지 않고 판정만')
    ap.add_argument('--force', action='store_true', help='기존 파일도 교체')
    ap.add_argument('--self-test', action='store_true', help='네트워크 없이 매칭 검증')
    ap.add_argument('--check-key', action='store_true',
                    help='인증키가 동작하는지만 확인한다')
    ap.add_argument('--debug', action='store_true',
                    help='API 원문 응답을 출력한다(필드명이 바뀌었을 때 진단용)')
    args = ap.parse_args()
    global DEBUG
    DEBUG = args.debug
    if args.self_test:
        sys.exit(self_test())
    if args.check_key:
        sys.exit(check_key(os.environ.get('DATA_GO_KR_KEY', '')))
    sync(args)


if __name__ == '__main__':
    main()
