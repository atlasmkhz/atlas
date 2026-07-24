const { JSDOM } = require('jsdom');
const fs = require('fs');
const P = '/home/claude/work/atlas';

const dom = new JSDOM(fs.readFileSync(P + '/index.html', 'utf8'), {
  url: 'https://atlas.mkhz.kr/index.html',
  pretendToBeVisual: true,
});
const { window } = dom;
global.window = window;
global.document = window.document;
global.localStorage = window.localStorage;
global.location = window.location;

// 실제 스크립트를 순서대로 실행
const errs = [];
['js/growth.js', 'js/library.js', 'js/namuBadge.js', 'js/tutorial.js'].forEach(f => {
  try {
    window.eval(fs.readFileSync(P + '/' + f, 'utf8'));
    console.log('OK   ' + f);
  } catch (e) {
    console.log('FAIL ' + f + ' -> ' + e.message);
    errs.push(f);
  }
});

console.log('\nAtlasGrowth:', typeof window.AtlasGrowth);
console.log('openTutorial:', typeof window.openTutorial);

// DOMContentLoaded 발생시키기
window.document.dispatchEvent(new window.Event('DOMContentLoaded', {bubbles:true}));

setTimeout(() => {
  const g = window.AtlasGrowth;
  if (g) console.log('tutorialSeen:', g.getData().tutorialSeen);
  // 튜토리얼 강제 실행
  if (window.openTutorial) {
    window.openTutorial();
    const root = window.document.querySelector('.tut-root');
    console.log('\ntut-root 생성:', !!root);
    console.log('open 클래스:', root && root.classList.contains('open'));
    const title = window.document.getElementById('tutTitle');
    console.log('제목:', title && title.textContent);
    const dots = window.document.getElementById('tutDots');
    console.log('단계 수:', dots && dots.children.length);
  }
}, 100);
