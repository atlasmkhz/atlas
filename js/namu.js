// js/namu.js — 「나의 역사 나무」 개인 페이지 컨트롤러
//
// 2026-07-22. growth.js(기록)와 tree.js(그림)를 받아 namu.html을 채운다.

(function () {
  'use strict';

  const G = window.AtlasGrowth;
  const T = window.AtlasTree;
  if (!G || !T) return;

  // ── 유틸 ───────────────────────────────────────────────────
  function fmtDuration(seconds) {
    const s = Math.max(0, Math.floor(seconds));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    if (h > 0) return m > 0 ? `${h}시간 ${m}분` : `${h}시간`;
    if (m > 0) return `${m}분`;
    return '1분 미만';
  }

  function fmtDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ── 진묘수 대사 ────────────────────────────────────────────
  // 상태에 따라 한마디씩. 3단계에서 표정 이미지가 추가되면 그에 맞춰
  // 이미지도 함께 바뀌게 한다.
  function guideLine(sum) {
    if (sum.stage.key === 'seed') {
      if (sum.seedPending && sum.seedDaysLeft > 0) {
        return `씨앗을 심었습니다. 어느 시대에서 싹이 틀지는 아직 정해지지 않았어요. 앞으로 ${sum.seedDaysLeft}일 동안 가장 오래 머문 시대에서 싹이 돋습니다.`;
      }
      return '씨앗을 심었습니다. 지도를 둘러보시면 곧 싹이 틉니다.';
    }
    if (sum.stage.key === 'sprout') {
      const era = (G.ERAS.find(e => e.key === sum.seedEra) || {}).name;
      return era
        ? `${era}에서 싹이 텄습니다. 당신의 역사는 여기서 시작되었네요.`
        : '싹이 텄습니다.';
    }
    if (sum.erasVisited <= 2) {
      return '한 시대를 깊이 보고 계시는군요. 다른 시대에도 가지를 뻗어보시면 나무가 균형을 잡습니다.';
    }
    if (sum.erasVisited >= 6) {
      return '일곱 시대를 두루 다니셨군요. 가지가 사방으로 뻗은 나무가 되었습니다.';
    }
    return '잘 자라고 있습니다. 오래 머무를수록 나무는 높아집니다.';
  }

  // ── 렌더 ───────────────────────────────────────────────────
  function render() {
    const sum = G.summary();

    // 나무
    document.getElementById('treeBox').innerHTML = T.render(sum);

    // 단계 라벨
    document.getElementById('stageName').textContent = sum.stage.name;
    const seedEraName = (G.ERAS.find(e => e.key === sum.seedEra) || {}).name;
    document.getElementById('stageSub').textContent =
      seedEraName ? `${seedEraName}에서 시작된 나무` : '';

    // 성장 그래프
    const fill = document.getElementById('progressFill');
    const text = document.getElementById('progressText');
    if (sum.nextStage) {
      fill.style.width = (sum.progress * 100).toFixed(1) + '%';
      text.textContent =
        `${sum.nextStage.name}까지 ${fmtDuration(sum.remainSeconds)} 남았습니다`;
    } else {
      fill.style.width = '100%';
      text.textContent = '가장 큰 나무가 되었습니다. 이제부터는 잎과 꽃이 더 풍성해집니다.';
    }

    document.getElementById('guideLine').textContent = guideLine(sum);

    // 요약 숫자
    document.getElementById('statTime').textContent = fmtDuration(sum.totalSeconds);
    document.getElementById('statEras').textContent = sum.erasVisited;
    document.getElementById('statLeaves').textContent = sum.leaves;
    document.getElementById('statFlowers').textContent = sum.flowers;
    document.getElementById('statFruits').textContent = sum.fruits;

    // 시대별 발자취
    const eraList = document.getElementById('eraList');
    eraList.innerHTML = sum.branches.map(b => {
      const style = T.ERA_STYLE[b.key] || {};
      const pct = (b.ratio * 100).toFixed(0);
      return `<li class="namu-era${b.visited ? '' : ' is-unvisited'}">
        <span class="namu-era-dot" style="background:${style.leaf || '#666'}"></span>
        <span class="namu-era-name">${esc(b.name)}</span>
        <span class="namu-era-bar"><i style="width:${pct}%;background:${style.leaf || '#666'}"></i></span>
        <span class="namu-era-time">${b.visited ? fmtDuration(b.seconds) : '—'}</span>
      </li>`;
    }).join('');

    // 스크랩
    const data = G.getData();
    const scraps = (data.scraps || []).slice().reverse();
    document.getElementById('scrapCount').textContent = scraps.length ? `(${scraps.length})` : '';
    const list = document.getElementById('scrapList');
    const empty = document.getElementById('scrapEmpty');
    if (!scraps.length) {
      list.innerHTML = '';
      empty.hidden = false;
    } else {
      empty.hidden = true;
      const KIND = { card: '사건 카드', archive: '자료실', route: '루트', page: '페이지' };
      list.innerHTML = scraps.map(s => `<li class="namu-scrap">
        <a href="${esc(s.url)}" class="namu-scrap-link">
          <span class="namu-scrap-kind">${esc(KIND[s.kind] || '페이지')}</span>
          <span class="namu-scrap-title">${esc(s.title)}</span>
        </a>
        <button type="button" class="namu-scrap-del" data-url="${esc(s.url)}" aria-label="스크랩 삭제">×</button>
      </li>`).join('');
    }

    // 첫 방문일
    const fv = document.getElementById('firstVisitLine');
    fv.textContent = data.firstVisit ? `처음 오신 날: ${fmtDate(data.firstVisit)}` : '';
  }

  // ── 이벤트 ─────────────────────────────────────────────────
  document.addEventListener('click', function (e) {
    const del = e.target.closest('.namu-scrap-del');
    if (del) {
      G.removeScrap(del.dataset.url);
      render();
    }
  });

  // 기록 내보내기 — 로그인이 없는 동안 기기 이전 수단이 된다
  document.getElementById('exportBtn').addEventListener('click', function () {
    const blob = new Blob([JSON.stringify(G.getData(), null, 2)],
      { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const d = new Date();
    a.download = `atlas-namu-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  });

  // 기록 불러오기 — 병합 규칙은 growth.js의 merge()를 그대로 쓴다.
  // 나중에 계정으로 옮길 때도 같은 함수를 쓰므로, 여기서 미리 검증되는 셈이다.
  document.getElementById('importFile').addEventListener('change', function (e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function () {
      try {
        const incoming = JSON.parse(reader.result);
        const merged = G.merge(G.getData(), incoming);
        localStorage.setItem('atlas_growth_v1', JSON.stringify(merged));
        location.reload();
      } catch (err) {
        alert('파일을 읽지 못했습니다. ATLAS에서 내보낸 파일이 맞는지 확인해 주세요.');
      }
    };
    reader.readAsText(file);
  });

  document.getElementById('resetBtn').addEventListener('click', function () {
    if (!confirm('나무와 스크랩이 모두 사라집니다. 정말 처음부터 다시 시작할까요?')) return;
    G._reset();
    location.reload();
  });

  render();
  // 페이지를 열어둔 채로도 시간이 쌓이므로 주기적으로 갱신한다
  setInterval(render, 30000);
})();
