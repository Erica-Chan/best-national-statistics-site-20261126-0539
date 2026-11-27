// Controls that make the site interactive: prefecture search, column
// sorting, the two-prefecture comparison and CSV downloads. All of it runs
// locally on the data already in the page — no network, no server.
import { PREFECTURES, POP_SERIES, VITAL, GDP_SERIES } from './data.js';
import { fmt, signed } from './format.js';

function downloadCsv(filename, rows) {
  const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const CSV_TABLES = {
  pop: { file: 'japan-population-census.csv', rows: [['Year', 'Population (millions)'], ...POP_SERIES.map((d) => [d.year, d.pop])] },
  vital: { file: 'japan-births-deaths.csv', rows: [['Year', 'Births', 'Deaths', 'Total fertility rate'], ...VITAL.map((d) => [d.year, d.births, d.deaths, d.tfr])] },
  gdp: { file: 'japan-gdp.csv', rows: [['Year', 'Nominal GDP (trillion yen)', 'Real growth (%)'], ...GDP_SERIES.map((d) => [d.year, d.gdp, d.growth])] },
  pref: { file: 'japan-prefectures-2025.csv', rows: [['Prefecture', 'Capital', 'Region', 'Population (millions)', 'Change 2020-25 (%)', 'Density per km2'], ...PREFECTURES.map((p) => [p.name, p.capital, p.region, p.pop, p.change, p.density])] },
};

function compareTable(a, b) {
  const row = (label, va, vb) => `<tr><th>${label}</th><td class="num">${va}</td><td class="num">${vb}</td></tr>`;
  const bigger = a.pop > b.pop ? a.name : b.name;
  return `<table class="data-table"><thead><tr><th></th><th class="num">${a.name}</th><th class="num">${b.name}</th></tr></thead><tbody>
  ${row('Population, 2025 (m)', fmt(a.pop, 2), fmt(b.pop, 2))}
  ${row('Change 2020–25', `${signed(a.change)}%`, `${signed(b.change)}%`)}
  ${row('Capital', a.capital, b.capital)}
  ${row('Region', a.region, b.region)}
  ${row('Density /km²', fmt(a.density), fmt(b.density))}
  </tbody></table><p><b>${bigger}</b> is the larger of the two — ${fmt(Math.max(a.pop, b.pop) / Math.min(a.pop, b.pop), 1)}× the other’s population.</p>`;
}

export function bindControls() {
  // Prefecture search filter.
  const search = document.getElementById('pref-search');
  const table = document.getElementById('pref-table');
  if (search && table) {
    const count = document.getElementById('pref-count');
    const apply = () => {
      const q = search.value.trim().toLowerCase();
      let shown = 0;
      table.querySelectorAll('tbody tr').forEach((tr) => {
        const hit = !q || tr.textContent.toLowerCase().includes(q);
        tr.style.display = hit ? '' : 'none';
        if (hit) shown += 1;
      });
      if (count) count.textContent = `${shown} of ${PREFECTURES.length} prefectures`;
    };
    search.addEventListener('input', apply);
    apply();
  }
  // Column sorting on the prefecture table.
  if (table) {
    const keys = ['rank', 'name', 'capital', 'region', 'pop', 'change', 'density'];
    table.querySelectorAll('th[data-sort]').forEach((th) => {
      th.style.cursor = 'pointer';
      th.addEventListener('click', () => {
        const key = th.dataset.sort;
        const idx = keys.indexOf(key);
        const dir = th.dataset.dir === 'asc' ? -1 : 1;
        table.querySelectorAll('th').forEach((h) => delete h.dataset.dir);
        th.dataset.dir = dir === 1 ? 'asc' : 'desc';
        const rows = [...table.querySelectorAll('tbody tr')];
        rows.sort((r1, r2) => {
          const c1 = r1.children[idx].textContent.trim();
          const c2 = r2.children[idx].textContent.trim();
          const n1 = parseFloat(c1.replace(/[^0-9.\-]/g, ''));
          const n2 = parseFloat(c2.replace(/[^0-9.\-]/g, ''));
          if (!Number.isNaN(n1) && !Number.isNaN(n2)) return (n1 - n2) * dir;
          return c1.localeCompare(c2) * dir;
        });
        const tbody = table.querySelector('tbody');
        rows.forEach((r) => tbody.appendChild(r));
      });
    });
  }
  // Prefecture comparison.
  const aSel = document.getElementById('cmp-a');
  const bSel = document.getElementById('cmp-b');
  const out = document.getElementById('cmp-out');
  if (aSel && bSel && out) {
    const run = () => {
      const a = PREFECTURES.find((p) => p.name === aSel.value);
      const b = PREFECTURES.find((p) => p.name === bSel.value);
      out.innerHTML = a && b ? compareTable(a, b) : '<p>Pick two prefectures.</p>';
    };
    aSel.addEventListener('change', run);
    bSel.addEventListener('change', run);
    const go = document.getElementById('cmp-go');
    if (go) go.addEventListener('click', run);
    run();
  }
  // CSV downloads.
  document.querySelectorAll('[data-csv]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const spec = CSV_TABLES[btn.dataset.csv];
      if (spec) downloadCsv(spec.file, spec.rows);
    });
  });
}
