// Page templates. Each route renders from data.js through charts.js; every
// figure on a page names its source and year in the text beside it.
import { AGE_BANDS, AGE_GROUPS, CITIES, ECONOMY, GEOGRAPHY, GDP_SERIES, HIGHLIGHTS_2025, KPIS, POP_SERIES, PREFECTURES, REGIONS, SMALLEST_PREFECTURES, SOURCES, TRADE_2024, VITAL, VITAL_2024 } from './data.js';
import { donut, groupedBars, hbars, lineChart, vbarChart } from './charts.js';
import { esc, fmt, signed, sourceNote } from './format.js';

function kpiCards() {
  return `<div class="kpis">${KPIS.map((k) => `<div class="kpi"><span class="kpi-label">${esc(k.label)}</span><span class="kpi-value">${esc(k.value)}</span><span class="kpi-change">${esc(k.change)}</span><span class="kpi-year">${esc(k.year)} · ${esc(k.source)}</span></div>`).join('')}</div>`;
}
function sectionHead(title, blurb) {
  return `<div class="section-head"><h2>${esc(title)}</h2><p>${esc(blurb)}</p></div>`;
}
function quickLinks() {
  return `<nav class="quick-links" aria-label="Browse by topic">
    <a href="#/population">Population &amp; age →</a><a href="#/economy">Economy &amp; trade →</a><a href="#/regions">Regions &amp; prefectures →</a><a href="#/living">Living in Japan →</a><a href="#/data">Full data tables →</a><a href="#/sources">Sources &amp; method →</a>
  </nav>`;
}

export function homeView() {
  const pop = lineChart({ labels: POP_SERIES.map((d) => String(d.year)), values: POP_SERIES.map((d) => d.pop), unit: 'm', height: 230 });
  const gdp = lineChart({ labels: GDP_SERIES.map((d) => String(d.year)), values: GDP_SERIES.map((d) => d.gdp), unit: '', color: '#b3402a', height: 230 });
  const age = donut({ parts: AGE_GROUPS.map((g) => ({ label: `${g.group} · ${fmt(g.pop, 2)}m`, share: g.share })), centre: '123.05m' });
  const topPref = hbars({ rows: PREFECTURES.slice(0, 8).map((p) => ({ label: p.name, value: p.pop, sub: `${signed(p.change)}%` })), valueFmt: (v) => `${fmt(v, 2)}m` });
  return `
  <section class="hero">
    <p class="eyebrow">Japan · 日本 · National statistics atlas · 2025 edition</p>
    <h1>Japan in Numbers</h1>
    <p class="lede">Every headline figure about Japan — population, economy, regions, work and daily life — checked against the official release that published it, with the source and year printed beside each number. Updated 27 November 2026.</p>
    ${quickLinks()}
  </section>
  ${kpiCards()}
  <section class="grid-2">
    <article class="card"><h2>Population peaked in 2008 — and has fallen every year since</h2>${pop}${sourceNote('Statistics Bureau, Population Census 1920–2025 (2025 preliminary). Millions of people.')}<p>Japan counted <b>123,049,524</b> residents on 1 October 2025 — <b>3.10 million fewer</b> than in 2020, the largest five-year fall since the census began. The peak was 128.06 million in 2010.</p></article>
    <article class="card"><h2>The economy: ¥609 trillion, growing barely at all</h2>${gdp}${sourceNote('Cabinet Office, System of National Accounts. Nominal GDP, trillion yen.')}<p>Nominal GDP reached <b>¥609.3 trillion</b> in 2024 ($4.02 trillion), but real growth was only <b>+0.1%</b>. In dollars Japan is now the world’s 4th-largest economy, behind Germany.</p></article>
  </section>
  <section class="grid-2">
    <article class="card"><h2>Who lives here: the oldest country on earth</h2>${age}${sourceNote('Statistics Bureau, Population Estimates, October 2024. 65+ share 29.3% — a record. Median age 49.4 years (UN, 2024).')}<p>More than one person in four is 65 or older, and children under 15 are only 11.1% of the population. The old-age dependency ratio has more than doubled since 1995, from 21% to 49%.</p></article>
    <article class="card"><h2>Where they live: 8 prefectures hold half the country</h2>${topPref}${sourceNote('Statistics Bureau, 2025 Census (preliminary), 1 October 2025. Millions; change since 2020.')}<p>Tokyo alone holds <b>11.6%</b> of Japan. Greater Tokyo — Tokyo, Kanagawa, Saitama and Chiba — holds 37.0 million people, 30.1% of the country. Only Tokyo grew between the 2020 and 2025 censuses.</p></article>
  </section>
  ${sectionHead('The latest year in six numbers', 'What the newest releases actually say — each one linked to its source on the Sources page.')}
  <div class="highlights">${HIGHLIGHTS_2025.map((h) => `<article class="highlight"><span class="hl-k">${esc(h.k)}</span><span class="hl-v">${esc(h.v)}</span><p>${esc(h.d)}</p></article>`).join('')}</div>
  <section class="card wide"><h2>How to use this atlas</h2><p>Start with <a href="#/population">Population</a> for the census, age structure and prefectures; <a href="#/economy">Economy</a> for GDP, trade, prices and jobs; <a href="#/regions">Regions</a> to compare any two prefectures; <a href="#/living">Living</a> for cities, health and the environment; and <a href="#/data">Data</a> for every table in full, downloadable as CSV. Nothing on this site is fetched from anywhere else — every figure is in its own files, so it works offline.</p></section>`;
}

export function populationView() {
  const births = groupedBars({ labels: VITAL.map((d) => String(d.year)), a: VITAL.map((d) => d.births), b: VITAL.map((d) => d.deaths), aLabel: 'Births', bLabel: 'Deaths' });
  const tfr = lineChart({ labels: VITAL.map((d) => String(d.year)), values: VITAL.map((d) => d.tfr), color: '#b3402a', min: 1.0, max: 1.6, height: 200 });
  const bands = hbars({ rows: AGE_BANDS.map((b) => ({ label: b.band, value: b.pop })), valueFmt: (v) => `${fmt(v, 1)}m`, color: '#2f5d8a' });
  const rows = PREFECTURES.map((p, i) => `<tr><td>${i + 1}</td><td><a href="#/regions">${esc(p.name)}</a></td><td>${esc(p.capital)}</td><td>${esc(p.region)}</td><td class="num">${fmt(p.pop, 2)}</td><td class="num">${signed(p.change)}%</td><td class="num">${fmt(p.density)}</td></tr>`).join('');
  return `
  <section class="hero slim"><p class="eyebrow">Population &amp; age</p><h1>123 million people, shrinking and ageing</h1><p class="lede">The 2025 Census counted 123,049,524 residents — down 3.10 million in five years. Births have fallen for nine straight years while deaths set post-war records.</p>${quickLinks()}</section>
  <div class="kpis">${[
    ['Population, 1 Oct 2025', '123.05m', '−3.10m since 2020', 'Statistics Bureau, 2025 Census (preliminary)'],
    ['Aged 65+', '36.25m · 29.3%', 'record share', 'Statistics Bureau, Population Estimates, Sep 2024'],
    ['Children 0–14', '13.79m · 11.1%', 'fewer every year', 'Statistics Bureau, Population Estimates, Oct 2024'],
    ['Births 2024', '686,061', 'first year under 700,000', 'MHLW, Vital Statistics 2024'],
    ['Deaths 2024', '1,605,298', 'post-war high', 'MHLW, Vital Statistics 2024'],
    ['Natural change 2024', '−919,237', 'births minus deaths', 'MHLW, Vital Statistics 2024'],
  ].map(([l, v, c, y]) => `<div class="kpi"><span class="kpi-label">${esc(l)}</span><span class="kpi-value">${esc(v)}</span><span class="kpi-change">${esc(c)}</span><span class="kpi-year">${esc(y)}</span></div>`).join('')}</div>
  <section class="grid-2">
    <article class="card"><h2>Births fall, deaths rise — the gap widens every year</h2>${births}${sourceNote('MHLW, Vital Statistics. Births and deaths per year; labels in thousands.')}<p>In 2024 there were <b>919,237 more deaths than births</b>. Births have fallen every year since 2015; deaths have risen in all but one of those years.</p></article>
    <article class="card"><h2>Fertility: 1.15 children per woman</h2>${tfr}${sourceNote('MHLW, Vital Statistics. Total fertility rate, children per woman.')}<p>The total fertility rate fell to <b>1.15 in 2024</b>, the lowest since records began — far below the 2.1 needed for a generation to replace itself. It was 1.45 as recently as 2015.</p><p>Life expectancy still rises: <b>81.09 years for men and 87.13 for women</b> in 2024 (MHLW Life Tables), among the longest in the world.</p></article>
  </section>
  <section class="grid-2">
    <article class="card"><h2>Age bands: the bulge is 45–64</h2>${bands}${sourceNote('Statistics Bureau, Population Estimates, October 2024. Rounded bands, millions.')}<p>The largest band is 45–64 (35.4m). People 75 and over (20.0m) now outnumber children under 15 (13.8m) by almost half as many again.</p></article>
    <article class="card"><h2>Households keep splitting</h2><p class="big-stat">57.13m <span>households</span></p><p>Households rose by 1.29 million between the 2020 and 2025 censuses even as population fell — the average household is now <b>2.15 people</b>. Foreign residents reached a record <b>3.84 million</b> (2025 Census, final tabulation), up 39.8% in five years, while Japanese nationals fell 3.5% to 119.1 million.</p>${sourceNote('Statistics Bureau, 2025 Census preliminary and final tabulations.')}</article>
  </section>
  ${sectionHead('The 20 largest prefectures', '2025 Census (preliminary), 1 October 2025. Population in millions; change since the 2020 Census; density per km². Click a column heading on the Regions page to sort the full table.')}
  <div class="table-wrap"><table class="data-table"><thead><tr><th>#</th><th>Prefecture</th><th>Capital</th><th>Region</th><th class="num">Population (m)</th><th class="num">Change 2020–25</th><th class="num">Density /km²</th></tr></thead><tbody>${rows}</tbody></table></div>
  <p class="source">Smallest prefectures: ${SMALLEST_PREFECTURES.map((p) => `${esc(p.name)} ${fmt(p.pop, 2)}m`).join(' · ')}. Source: Statistics Bureau, 2025 Census (preliminary).</p>`;
}

export function economyView() {
  const gdp = lineChart({ labels: GDP_SERIES.map((d) => String(d.year)), values: GDP_SERIES.map((d) => d.gdp), unit: '', color: '#2f5d8a', height: 230 });
  const growth = vbarChart({ labels: GDP_SERIES.map((d) => String(d.year)), values: GDP_SERIES.map((d) => d.growth) });
  const industry = donut({ parts: [
    { label: 'Services', share: ECONOMY.servicesShare },
    { label: 'Industry', share: ECONOMY.industryShare },
    { label: 'Agriculture, forestry & fishing', share: ECONOMY.agricultureShare },
    { label: 'Taxes less subsidies', share: 1.2 },
  ], centre: '¥609tn' });
  return `
  <section class="hero slim"><p class="eyebrow">Economy &amp; trade</p><h1>A ¥609 trillion economy that barely grows</h1><p class="lede">Nominal GDP hit ¥609.3 trillion in 2024, but real growth was +0.1%. Jobs are plentiful and prices are rising — the two facts that define Japan’s economy today.</p>${quickLinks()}</section>
  <div class="kpis">${[
    ['Nominal GDP 2024', '¥609.3tn', '$4.02tn · world #4', 'Cabinet Office, SNA; World Bank'],
    ['GDP 2025', '$4.44tn', 'real growth +1.2%', 'World Bank, WDI'],
    ['GDP per person', '$32,465', 'PPP $52,364', 'World Bank, WDI 2024'],
    ['Unemployment', '2.5%', 'labour force 69.2m', 'OECD / Labour Force Survey 2025'],
    ['CPI inflation', '+3.2%', '2024: +2.7%', 'World Bank, WDI 2025'],
    ['Government debt', '251.2% of GDP', 'highest in the world', 'IMF, WEO 2024'],
    ['Policy rate', '0.5%', 'Bank of Japan, since Jan 2025', 'Bank of Japan'],
    ['Yen per dollar', '¥151.4', '2024 average', 'Ministry of Finance'],
  ].map(([l, v, c, y]) => `<div class="kpi"><span class="kpi-label">${esc(l)}</span><span class="kpi-value">${esc(v)}</span><span class="kpi-change">${esc(c)}</span><span class="kpi-year">${esc(y)}</span></div>`).join('')}</div>
  <section class="grid-2">
    <article class="card"><h2>Nominal GDP, 2015–2024</h2>${gdp}${sourceNote('Cabinet Office, System of National Accounts. Trillion yen.')}<p>In yen terms the economy is a third bigger than in 2015. In dollars it is smaller — the weak yen cut the dollar value from $4.44tn in 2015 to $4.02tn in 2024, even as yen GDP rose.</p></article>
    <article class="card"><h2>Real growth: one good year in ten</h2>${growth}${sourceNote('Cabinet Office, SNA. Real GDP growth, % per year.')}<p>Growth averaged under 1% a year across the decade. The pandemic year 2020 (−4.2%) was followed by a 2021 rebound (+2.7%); 2024 managed only +0.1% as consumption stayed weak.</p></article>
  </section>
  <section class="grid-2">
    <article class="card"><h2>What Japan makes and sells</h2>${industry}${sourceNote('World Bank, WDI 2024. Shares of GDP; industry 26.8%, services about 71%.')}<p>Top goods exports in 2024: <b>${TRADE_2024.topExports.join(' · ')}</b>. Top imports: <b>${TRADE_2024.topImports.join(' · ')}</b>. Motor vehicles alone are about 14% of goods exports.</p></article>
    <article class="card"><h2>Trade: a deficit, a record surplus</h2>
      <table class="data-table"><tbody>
      <tr><th>Goods exports, 2024</th><td class="num">¥${fmt(TRADE_2024.exports, 1)}tn</td><td>record high</td></tr>
      <tr><th>Goods imports, 2024</th><td class="num">¥${fmt(TRADE_2024.imports, 1)}tn</td><td>energy-led</td></tr>
      <tr><th>Goods balance</th><td class="num">¥${fmt(TRADE_2024.balance, 1)}tn</td><td>4th straight annual deficit</td></tr>
      <tr><th>Current account</th><td class="num">+¥${fmt(TRADE_2024.currentAccount, 2)}tn</td><td>record; primary income +¥${fmt(TRADE_2024.primaryIncome, 2)}tn</td></tr>
      <tr><th>Travel surplus</th><td class="num">+¥${fmt(TRADE_2024.travelSurplus, 2)}tn</td><td>${fmt(TRADE_2024.visitors, 2)}m visitors</td></tr>
      </tbody></table>
      ${sourceNote('Ministry of Finance, Trade Statistics and Balance of Payments, 2024 (customs basis for goods).')}
      <p>Japan runs a goods deficit but a large current-account surplus, because earnings on its vast overseas investments — ¥40.21tn in 2024 — outweigh it.</p></article>
  </section>
  <section class="card wide"><h2>Work: 2.5% unemployed, 63.8% in the labour force</h2><p><b>${fmt(ECONOMY.employed, 1)} million people</b> were employed in 2025 out of a labour force of ${fmt(ECONOMY.labourForce, 1)} million. Participation is <b>${fmt(ECONOMY.participationFemale, 1)}% for women and ${fmt(ECONOMY.participationMale, 1)}% for men</b> (ages 15+, World Bank 2025) — women’s employment hit a record 55.1% in 2025 (OECD). The jobs-to-applicants ratio stood at about 1.22, and firms report the tightest labour shortages in decades.</p>${sourceNote('Statistics Bureau, Labour Force Survey; OECD Employment Outlook 2025; World Bank WDI.')}</section>`;
}

export function regionsView() {
  const regionBars = hbars({ rows: REGIONS.map((r) => ({ label: r.name, value: r.pop, sub: `${fmt(r.share, 1)}%` })), valueFmt: (v) => `${fmt(v, 1)}m`, color: '#2e7d6b' });
  const options = PREFECTURES.map((p) => `<option value="${esc(p.name)}">${esc(p.name)} — ${fmt(p.pop, 2)}m</option>`).join('');
  return `
  <section class="hero slim"><p class="eyebrow">Regions &amp; prefectures</p><h1>47 prefectures, 8 regions — one very uneven map</h1><p class="lede">Kanto holds 35.5% of Japan; Shikoku holds 2.9%. Search the table, sort any column, or compare two prefectures head to head.</p>${quickLinks()}</section>
  <section class="grid-2">
    <article class="card"><h2>Population by region</h2>${regionBars}${sourceNote('Built from Statistics Bureau, 2025 Census (preliminary) prefecture counts. Millions; share of national total.')}<p>Hokkaido is the largest prefecture by area (83,424 km², a fifth of Japan) but holds only 4.1% of its people. Tokyo, the smallest by area among the big prefectures, holds 11.6%.</p></article>
    <article class="card"><h2>Compare two prefectures</h2>
      <div class="compare"><label>First <select id="cmp-a">${options}</select></label><label>Second <select id="cmp-b">${options.replace('value="Kanagawa"', 'value="Kanagawa" selected')}</select></label><button id="cmp-go" type="button">Compare</button></div>
      <div id="cmp-out" aria-live="polite"><p>Pick two prefectures and press Compare — or change either list and the table updates.</p></div>
      <p class="source">Figures: 2025 Census (preliminary). Density is people per km².</p></article>
  </section>
  ${sectionHead('All 20 largest prefectures — search and sort', 'Type to filter by name, capital or region. Click a column heading to sort.')}
  <div class="toolbar"><input id="pref-search" type="search" placeholder="Search prefectures — try “kanto” or “yoko”…" aria-label="Search prefectures"><span id="pref-count" class="count"></span></div>
  <div class="table-wrap"><table class="data-table sortable" id="pref-table"><thead><tr><th data-sort="rank">#</th><th data-sort="name">Prefecture</th><th data-sort="capital">Capital</th><th data-sort="region">Region</th><th data-sort="pop" class="num">Population (m)</th><th data-sort="change" class="num">Change 2020–25</th><th data-sort="density" class="num">Density /km²</th></tr></thead><tbody>
  ${PREFECTURES.map((p, i) => `<tr><td>${i + 1}</td><td>${esc(p.name)}</td><td>${esc(p.capital)}</td><td>${esc(p.region)}</td><td class="num">${fmt(p.pop, 2)}</td><td class="num">${signed(p.change)}%</td><td class="num">${fmt(p.density)}</td></tr>`).join('')}
  </tbody></table></div>
  <div class="region-cards">${REGIONS.map((r) => `<article class="region-card"><h3>${esc(r.name)}</h3><p class="big-stat">${fmt(r.pop, 1)}m <span>${fmt(r.share, 1)}% of Japan</span></p><p>${esc(r.note)}</p><p class="source">${r.prefectures} prefecture${r.prefectures > 1 ? 's' : ''}</p></article>`).join('')}</div>`;
}

export function livingView() {
  const cities = hbars({ rows: CITIES.map((c) => ({ label: c.name, value: c.pop })), valueFmt: (v) => `${fmt(v, 2)}m`, color: '#7a5a9e' });
  return `
  <section class="hero slim"><p class="eyebrow">Living in Japan</p><h1>Cities, health, and the land itself</h1><p class="lede">Japan is one of the world’s most urban countries — and one of its healthiest and most forested. The numbers behind daily life.</p>${quickLinks()}</section>
  <section class="grid-2">
    <article class="card"><h2>The biggest cities</h2>${cities}${sourceNote('Approximate, 2025 Census. Millions; Yokohama is Japan’s largest municipality after Tokyo’s 23 wards (9.7m).')}<p>Greater Tokyo’s 37.0 million people make it the world’s largest metropolitan area. The 23 special wards of Tokyo alone hold about 9.7 million.</p></article>
    <article class="card"><h2>The land</h2>
      <table class="data-table"><tbody>
      <tr><th>Land area</th><td class="num">${fmt(GEOGRAPHY.areaKm2)} km²</td><td>about the size of Germany</td></tr>
      <tr><th>Islands</th><td class="num">${fmt(GEOGRAPHY.islands)}</td><td>Geospatial Information Authority, 2023 recount</td></tr>
      <tr><th>Coastline</th><td class="num">${fmt(GEOGRAPHY.coastlineKm)} km</td><td>no point is far from the sea</td></tr>
      <tr><th>Highest point</th><td class="num">${esc(GEOGRAPHY.highestPoint)}</td><td>an active volcano, last erupted 1707</td></tr>
      <tr><th>Forest cover</th><td class="num">${esc(GEOGRAPHY.forestShare)}</td><td>among the highest in the OECD</td></tr>
      <tr><th>Households</th><td class="num">${fmt(GEOGRAPHY.households, 2)}m</td><td>average ${fmt(GEOGRAPHY.householdSize, 2)} people</td></tr>
      </tbody></table>
      ${sourceNote('Statistics Bureau, 2025 Census; Geospatial Information Authority of Japan.')}</article>
  </section>
  <div class="kpis">${[
    ['Life expectancy', '84.0 yrs', 'women 87.1 · men 81.1', 'MHLW Life Tables 2024'],
    ['Infant mortality', '1.7 per 1,000', 'among the lowest worldwide', 'MHLW, Vital Statistics 2024'],
    ['Hospital beds', '12.6 per 1,000', 'highest in the OECD', 'OECD Health Statistics 2022'],
    ['Doctors', '2.6 per 1,000', 'below the OECD average', 'OECD Health Statistics 2022'],
    ['Tertiary education', '56% of 25–64s', 'hold a tertiary qualification', 'OECD Education at a Glance 2023'],
    ['Visitors 2024', '36.87m', 'record arrivals', 'JNTO'],
  ].map(([l, v, c, y]) => `<div class="kpi"><span class="kpi-label">${esc(l)}</span><span class="kpi-value">${esc(v)}</span><span class="kpi-change">${esc(c)}</span><span class="kpi-year">${esc(y)}</span></div>`).join('')}</div>
  <section class="grid-2">
    <article class="card"><h2>Energy &amp; climate</h2><p class="big-stat">${fmt(GEOGRAPHY.co2Mt)} Mt <span>greenhouse gases, FY2023</span></p><p>Japan emitted <b>1,017 million tonnes of CO₂ equivalent in FY2023</b>, down from its 2013 peak. Renewables supplied <b>${fmt(GEOGRAPHY.renewableElectricityShare, 1)}% of electricity</b> in FY2023, and energy self-sufficiency — how much energy Japan produces itself — was only <b>${fmt(GEOGRAPHY.energySelfSufficiency, 1)}%</b>, one of the lowest in the OECD: almost all oil, gas and coal is imported.</p>${sourceNote('Greenhouse Gas Inventory Office; METI, energy statistics, FY2023.')}</article>
    <article class="card"><h2>Foreign residents: a record 3.84 million</h2><p class="big-stat">3.84m <span>foreign residents, Oct 2025</span></p><p>Foreign residents rose <b>39.8%</b> in five years to 3.84 million — 3.1% of the population. Foreign workers reached 2.30 million at the end of October 2024, also a record, up 12.4% in a year. The largest groups are from China, Viet Nam and South Korea.</p>${sourceNote('Statistics Bureau, 2025 Census final tabulation; MHLW, foreign employment, Oct 2024.')}</article>
  </section>`;
}

export function dataView() {
  const popRows = POP_SERIES.map((d) => `<tr><td>${d.year}</td><td class="num">${fmt(d.pop, 2)}</td></tr>`).join('');
  const vitalRows = VITAL.map((d) => `<tr><td>${d.year}</td><td class="num">${fmt(d.births)}</td><td class="num">${fmt(d.deaths)}</td><td class="num">${fmt(d.tfr, 2)}</td></tr>`).join('');
  const gdpRows = GDP_SERIES.map((d) => `<tr><td>${d.year}</td><td class="num">${fmt(d.gdp, 1)}</td><td class="num">${signed(d.growth)}%</td></tr>`).join('');
  return `
  <section class="hero slim"><p class="eyebrow">Full data tables</p><h1>Every table, downloadable</h1><p class="lede">The figures behind every chart on this site, in full. Use the Download CSV buttons to take any table with you — the file is made in your browser from the same data the page shows.</p>${quickLinks()}</section>
  <section class="grid-2">
    <article class="card"><h2>Population at each census <button class="csv-btn" type="button" data-csv="pop">Download CSV</button></h2><div class="table-wrap"><table class="data-table"><thead><tr><th>Year</th><th class="num">Population (m)</th></tr></thead><tbody>${popRows}</tbody></table></div>${sourceNote('Statistics Bureau, Population Census 1920–2025 (2025 preliminary).')}</article>
    <article class="card"><h2>Births, deaths &amp; fertility <button class="csv-btn" type="button" data-csv="vital">Download CSV</button></h2><div class="table-wrap"><table class="data-table"><thead><tr><th>Year</th><th class="num">Births</th><th class="num">Deaths</th><th class="num">TFR</th></tr></thead><tbody>${vitalRows}</tbody></table></div>${sourceNote('MHLW, Vital Statistics (final data). TFR = children per woman.')}</article>
    <article class="card"><h2>GDP &amp; growth <button class="csv-btn" type="button" data-csv="gdp">Download CSV</button></h2><div class="table-wrap"><table class="data-table"><thead><tr><th>Year</th><th class="num">Nominal GDP (¥tn)</th><th class="num">Real growth</th></tr></thead><tbody>${gdpRows}</tbody></table></div>${sourceNote('Cabinet Office, System of National Accounts.')}</article>
    <article class="card"><h2>Prefectures, 2025 <button class="csv-btn" type="button" data-csv="pref">Download CSV</button></h2><div class="table-wrap"><table class="data-table"><thead><tr><th>Prefecture</th><th class="num">Population (m)</th><th class="num">Change</th></tr></thead><tbody>${PREFECTURES.map((p) => `<tr><td>${esc(p.name)}</td><td class="num">${fmt(p.pop, 2)}</td><td class="num">${signed(p.change)}%</td></tr>`).join('')}</tbody></table></div>${sourceNote('Statistics Bureau, 2025 Census (preliminary), 1 Oct 2025.')}</article>
  </section>
  <section class="card wide"><h2>About these tables</h2><p>Figures are reproduced as published; where a source rounds, we round the same way. Census figures for 2025 are preliminary and may be revised in the final tabulation — the site will be updated when they are. Years are the reference year of the figure, not the year it was published.</p></section>`;
}

export function sourcesView() {
  return `
  <section class="hero slim"><p class="eyebrow">Sources &amp; method</p><h1>Where every number comes from</h1><p class="lede">A statistics site is only as good as its sources. Every figure on this site traces to one of the publications below; no figure is estimated by us except where the text says “rounded bands” or “approximate”.</p>${quickLinks()}</section>
  <div class="table-wrap"><table class="data-table"><thead><tr><th>Publisher</th><th>Publication</th><th>Year</th><th>What we took from it</th></tr></thead><tbody>
  ${SOURCES.map((s) => `<tr><td>${esc(s.publisher)}</td><td>${esc(s.title)}</td><td>${esc(s.year)}</td><td>${esc(s.detail)}</td></tr>`).join('')}
  </tbody></table></div>
  <section class="grid-2">
    <article class="card"><h2>Method</h2><p>We use the latest final release where one exists, and preliminary census counts where the final tabulation is not yet published — and we say which. Prefecture populations are shown to two decimals in millions because the preliminary counts support that precision; city populations are shown to one decimal and marked approximate. Region totals are our sums of the published prefecture counts. Growth rates are the publisher’s own; we never annualise or re-base a series.</p></article>
    <article class="card"><h2>About this atlas</h2><p><b>Japan in Numbers</b> is an independent atlas, not affiliated with the Statistics Bureau of Japan or any government body. Its design, text and charts are original. It runs entirely from its own files: no network request is made, so the figures you see are the figures shipped with the site, and it works offline on a desktop or a phone.</p><p>Edition: ${'2025 edition'} · Updated 27 November 2026 · Country: Japan (日本) · Capital: Tokyo · Currency: yen (¥) · Time zone: JST (UTC+9).</p></article>
  </section>`;
}

export function missingView() {
  return `<section class="hero slim"><h1>Page not found</h1><p class="lede">There is no page at this address. Try one of these:</p>${quickLinks()}</section>`;
}
