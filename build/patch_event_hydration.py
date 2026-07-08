# -*- coding: utf-8 -*-
"""
patch_event_hydration.py
이미 생성되어 있는 event/{slug}.html 365개(웨이포인트 제외)에 대해,
generate_event_pages.py를 처음부터 다시 돌리지 않고 CTA 섹션만
정확히 치환한다.

왜 재생성이 아니라 패치인가:
generate_event_pages.py는 slug 배정·breadcrumb 산출을 위해
generate_slugs.py / era_breadcrumb.py / manual_slug_overrides.py에
의존하는데, 이 모듈들은 이번 업로드(zip)에 포함되어 있지 않다(이전
빌드 환경에만 존재). 반면 이번 변경은 CTA 섹션 하나만 바꾸는 것이므로,
title/description/JSON-LD/breadcrumb/related 등 나머지 전부를 100%
그대로 보존하려면 "정확히 일치하는 패턴만" 치환하는 게 더 안전하다.
패턴이 일치하지 않는 파일은 건드리지 않고 목록만 보고한다(수동 확인용).
"""
import glob
import os
import re
import sys

EVENT_DIR = sys.argv[1] if len(sys.argv) > 1 else 'event'

OLD_PATTERN = re.compile(
    r'<p class="map-cta"><a href="(https://atlas\.mkhz\.kr/map\.html\?event=[a-zA-Z0-9_]+)">지도에서 보기</a></p>\n'
    r'</article>\n'
    r'</body>\n'
    r'</html>$'
)

def hydration_block(cta_href):
    return f"""<script src="/js/mapShell.js"></script>
<script>
(function () {{
  var cta = document.getElementById('mapCta');
  var article = document.querySelector('article');
  if (!cta) return;

  cta.addEventListener('click', function (ev) {{
    if (typeof window.ATLAS_loadMapShell !== 'function') return; // 폴백: 원래 링크 그대로 이동
    ev.preventDefault();

    var eventId = new URL(cta.href, location.href).searchParams.get('event');

    var overlay = document.createElement('div');
    overlay.id = 'mapLoadingOverlay';
    overlay.setAttribute('style',
      'position:fixed;inset:0;background:#1a1612;color:#e8e0d0;' +
      'display:flex;align-items:center;justify-content:center;' +
      'font-family:-apple-system,BlinkMacSystemFont,"Malgun Gothic",sans-serif;' +
      'font-size:16px;z-index:9999;text-align:center;padding:24px;');
    overlay.textContent = '지도를 불러오는 중입니다…';
    document.body.appendChild(overlay);
    if (article) article.style.display = 'none';

    window.ATLAS_loadMapShell().then(function () {{
      if (typeof map !== 'undefined' && map.invalidateSize) map.invalidateSize();
      if (typeof navigateToEvent === 'function' && eventId) navigateToEvent(eventId);
      overlay.remove();
    }}).catch(function (err) {{
      console.error('지도 로드 실패:', err);
      overlay.innerHTML = '';
      var msg = document.createElement('div');
      msg.textContent = '지도를 불러오지 못했습니다.';
      var retry = document.createElement('a');
      retry.href = cta.href;
      retry.textContent = '지도 페이지로 이동';
      retry.style.cssText = 'display:inline-block;margin-top:16px;color:#c8a827;';
      overlay.appendChild(msg);
      overlay.appendChild(retry);
      if (article) article.style.display = '';
    }});
  }});
}})();
</script>
</body>
</html>"""

def new_block(href):
    return (
        f'<p class="map-cta"><a id="mapCta" href="{href}">이 사건을 지도에서 보기</a></p>\n'
        f'</article>\n\n'
        f'{hydration_block(href)}'
    )

def main():
    paths = sorted(
        p for p in glob.glob(os.path.join(EVENT_DIR, '*.html'))
        if not os.path.basename(p).startswith('route-')
    )
    patched, skipped_already, skipped_nomatch = [], [], []

    for path in paths:
        content = open(path, encoding='utf-8').read()
        m = OLD_PATTERN.search(content)
        if not m:
            if 'id="mapCta"' in content:
                skipped_already.append(path)
            else:
                skipped_nomatch.append(path)
            continue
        href = m.group(1)
        new_content = content[:m.start()] + new_block(href)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        patched.append(path)

    print(f"패치 완료: {len(patched)}건")
    print(f"이미 패치됨(건너뜀): {len(skipped_already)}건")
    print(f"패턴 불일치(건너뜀, 수동 확인 필요): {len(skipped_nomatch)}건")
    if skipped_nomatch:
        for p in skipped_nomatch[:20]:
            print("  -", p)

if __name__ == '__main__':
    main()
