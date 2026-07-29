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
import subprocess
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


# ════════════════════════════════════════════════════════════
# 대상 목록 — themes.js가 단일 출처다
# ════════════════════════════════════════════════════════════
def load_targets():
    """themes.js를 node로 평가해 JSON으로 받는다.

    themes.js를 파이썬 정규식으로 파싱하지 않는 이유: 데이터가 단일
    출처여야 한다는 원칙(generate_damsa_seo.js 주석 참고). 파서를 두 개
    두면 언젠가 어긋난다.
    """
    script = (
        'global.window={};'
        'require(%s);'
        'const out=[];'
        'for (const t of window.DAMSA_THEMES){'
        '  if(t.photo&&t.photo.src) out.push({id:t.id+"__theme",theme:t.id,'
        '    name:t.title,nav:t.title,photo:t.photo.src,isTheme:true});'
        '  for(const p of t.places||[]){'
        '    if(!p.photo||!p.photo.src) continue;'
        '    out.push({id:p.id,theme:t.id,name:p.name,nav:p.navQuery||p.name,'
        '      address:p.address||"",lat:p.lat,lng:p.lng,photo:p.photo.src,'
        '      sights:(p.sights||[]).map(s=>s.name),isTheme:false});'
        '  }'
        '}'
        'console.log(JSON.stringify(out));'
    ) % json.dumps(THEMES_JS)
    raw = subprocess.check_output(['node', '-e', script], cwd=ROOT)
    return json.loads(raw.decode('utf-8'))


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
    reasons = []
    score = 0

    # 지명 토큰
    hit = [tok for tok in target['tokens'] if norm(tok) in hay]
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
    own = [tok for tok in target['distinctive'] if norm(tok) in hay]
    if target['distinctive']:
        if own:
            score += 4
            reasons.append('신원 확인 %s' % '·'.join(sorted(own)))
        else:
            reasons.append('신원 확인 실패 — 이 답사지만의 토큰이 제목에 없음')
            return -99, reasons

    # ★ 남의 변별 토큰이 있으면 즉시 탈락시킨다
    intruder = [tok for tok in target['others_distinctive'] if norm(tok) in hay]
    if intruder:
        score -= 10
        reasons.append('다른 답사지 토큰 %s(-10)' % '·'.join(sorted(intruder)))

    # 출처 신뢰도 — TourAPI는 contentId로 그 장소에 묶인 사진이라 가산점
    if cand.get('source') == 'tourapi_detail':
        score += 2
        reasons.append('장소 귀속 사진(+2)')

    return score, reasons


def pick_best(target, candidates):
    """가장 좋은 후보 하나를 고른다. ACCEPT_SCORE 미달이면 None."""
    scored = []
    for c in candidates:
        s, why = score_candidate(target, c)
        scored.append((s, why, c))
    scored.sort(key=lambda x: -x[0])
    if not scored:
        return None, [], '후보 없음'
    top_score, top_why, top = scored[0]
    if top_score < ACCEPT_SCORE:
        return None, scored, ('최고점 %d < 기준 %d — 확신 부족으로 건너뜀'
                              % (top_score, ACCEPT_SCORE))
    # 1·2위가 붙어 있으면 사람이 봐야 한다(둘 중 뭘 골라도 위험)
    if len(scored) > 1 and scored[1][0] >= top_score:
        return None, scored, '동점 후보가 있어 판단 보류'
    return (top, top_score, top_why), scored, None


# ════════════════════════════════════════════════════════════
# 출처별 후보 수집 (네트워크)
# ════════════════════════════════════════════════════════════
def _get(url, params=None, timeout=20):
    import requests
    r = requests.get(url, params=params, timeout=timeout,
                     headers={'User-Agent': 'ATLAS-by-MKHZ/1.0 (photo sync)'})
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


def cands_commons(target):
    """위키미디어 커먼즈 — 인증키 불필요. 라이선스·저작자를 함께 받는다."""
    out = []
    try:
        r = _get('https://commons.wikimedia.org/w/api.php', {
            'action': 'query', 'format': 'json', 'generator': 'search',
            'gsrnamespace': 6, 'gsrsearch': target['nav'], 'gsrlimit': 20,
            'prop': 'imageinfo', 'iiprop': 'url|extmetadata',
            'iiurlwidth': MAX_WIDTH,
        })
        pages = (r.json().get('query') or {}).get('pages') or {}
        for pg in pages.values():
            info = (pg.get('imageinfo') or [{}])[0]
            meta = info.get('extmetadata') or {}

            def mv(k):
                return re.sub(r'<[^>]+>', '',
                              (meta.get(k) or {}).get('value', '') or '')
            lic = mv('LicenseShortName')
            # 상업적 이용 금지·변경 금지는 걸러낸다 — ATLAS는 웹 서비스다
            if 'NoDeriv' in lic or 'ND' == lic or 'NonCommercial' in lic or 'NC' in lic:
                continue
            url = info.get('thumburl') or info.get('url')
            if not url:
                continue
            author = mv('Artist')
            out.append({
                'title': pg.get('title', '').replace('File:', ''),
                'place': mv('ObjectName'),
                'url': url,
                'source': 'commons',
                'source_id': pg.get('title', ''),
                'author': author,
                'license': lic or 'Wikimedia Commons',
                'credit': ('%s / Wikimedia Commons (%s)' % (author, lic)).strip(' /'),
            })
    except Exception as e:
        print('    ! 커먼즈 실패: %s' % e)
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
        img = img.resize((MAX_WIDTH, h), Image.LANCZOS)
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
    key = os.environ.get('DATA_GO_KR_KEY', '').strip()
    if not key and not args.dry_run:
        print('! DATA_GO_KR_KEY 환경변수가 없습니다. 커먼즈만 사용합니다.')

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
    ]

    print('\n■ 매칭 시험 — 오염 후보(화순적벽·고창읍성·운주사)를 섞어 넣었다\n')
    fails = 0
    for pid, expect in CASES:
        t = by_id[pid]
        best, scored, why = pick_best(t, MOCK)
        got = best[0]['title'] if best else None
        ok = (got == expect)
        if not ok:
            fails += 1
        print('  %s %-36s' % ('✔' if ok else '✘', t['name'][:34]))
        print('      기대: %s' % (expect or '(보류)'))
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
    args = ap.parse_args()
    if args.self_test:
        sys.exit(self_test())
    sync(args)


if __name__ == '__main__':
    main()
