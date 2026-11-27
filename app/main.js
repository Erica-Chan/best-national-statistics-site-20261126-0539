// Router: hash routes, one page per topic, rendered from views.js.
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.
import { bindControls } from './controls.js';
import { dataView, economyView, homeView, livingView, missingView, populationView, regionsView, sourcesView } from './views.js';

const app = document.getElementById('app');
const NAV = [
  ['#/', 'Overview'], ['#/population', 'Population'], ['#/economy', 'Economy'],
  ['#/regions', 'Regions'], ['#/living', 'Living'], ['#/data', 'Data'], ['#/sources', 'Sources'],
];
const ROUTES = {
  '/': homeView, '/population': populationView, '/economy': economyView,
  '/regions': regionsView, '/living': livingView, '/data': dataView, '/sources': sourcesView,
};

function navHtml(active) {
  return `<nav class="topnav" aria-label="Sections">${NAV.map(([href, label]) => `<a href="${href}"${href === active ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</nav>`;
}

function render() {
  window.__shotReady = false;
  const path = location.hash.replace(/^#/, '') || '/';
  const view = ROUTES[path] || missingView;
  const title = NAV.find(([href]) => href === `#${path}`)?.[1] || 'Japan in Numbers';
  document.title = path === '/' ? 'Japan in Numbers — population, economy, regions' : `${title} | Japan in Numbers`;
  app.innerHTML = navHtml(`#${path}`) + view();
  bindControls();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
render();
