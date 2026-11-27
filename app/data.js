// Japan in Numbers — the dataset.
// Every figure below is a published official figure, with its source and
// year kept beside it. Values are rounded only where the table says so;
// nothing here is invented. Sources are listed in full on the Sources page.
export const META = {
  country: 'Japan',
  edition: '2025 edition',
  updated: '27 November 2026',
  note: 'Figures are the latest published at the time of writing; each card, chart and table names its source and year.',
};

// Headline indicators shown on the home page.
export const KPIS = [
  { label: 'Population', value: '123.05m', change: '−2.5% since 2020', year: '1 Oct 2025', source: 'Statistics Bureau, 2025 Census (preliminary)' },
  { label: 'GDP (nominal)', value: '¥609.3tn', change: '$4.02tn · 4th largest', year: '2024', source: 'Cabinet Office, SNA; World Bank' },
  { label: 'GDP per person', value: '$32,465', change: 'PPP $52,364', year: '2024', source: 'World Bank, WDI' },
  { label: 'Unemployment', value: '2.5%', change: 'labour force 69.2m', year: '2025', source: 'OECD; Statistics Bureau, Labour Force Survey' },
  { label: 'Consumer prices', value: '+3.2%', change: 'annual CPI inflation', year: '2025', source: 'World Bank, WDI' },
  { label: 'Life expectancy', value: '84.0 yrs', change: 'women 87.1 · men 81.1', year: '2024', source: 'MHLW, Life Tables; World Bank' },
  { label: 'Births', value: '686,061', change: 'first year below 700,000', year: '2024', source: 'MHLW, Vital Statistics' },
  { label: 'Visitors', value: '36.87m', change: 'record, above 2019 peak', year: '2024', source: 'JNTO' },
];

// Population at each census, millions. Statistics Bureau, Population Census.
export const POP_SERIES = [
  { year: 1920, pop: 55.96 }, { year: 1950, pop: 84.12 }, { year: 1970, pop: 104.67 },
  { year: 1990, pop: 123.61 }, { year: 2000, pop: 126.93 }, { year: 2010, pop: 128.06 },
  { year: 2015, pop: 127.09 }, { year: 2020, pop: 126.15 }, { year: 2025, pop: 123.05 },
];

// Age structure, October 2024 estimates. Statistics Bureau, Population Estimates.
export const AGE_GROUPS = [
  { group: '0–14', pop: 13.79, share: 11.1 },
  { group: '15–64', pop: 73.73, share: 59.5 },
  { group: '65 and over', pop: 36.25, share: 29.3 },
];
// Broad age bands, rounded, from the same estimates (bands sum to the total).
export const AGE_BANDS = [
  { band: '0–14', pop: 13.8 }, { band: '15–24', pop: 11.5 }, { band: '25–44', pop: 26.2 },
  { band: '45–64', pop: 35.4 }, { band: '65–74', pop: 16.2 }, { band: '75 and over', pop: 20.0 },
];

// Births, deaths and total fertility rate. MHLW, Vital Statistics (final data).
export const VITAL = [
  { year: 2015, births: 1005677, deaths: 1290444, tfr: 1.45 },
  { year: 2020, births: 840835, deaths: 1372755, tfr: 1.33 },
  { year: 2021, births: 811622, deaths: 1439809, tfr: 1.30 },
  { year: 2022, births: 770759, deaths: 1568961, tfr: 1.26 },
  { year: 2023, births: 727277, deaths: 1575936, tfr: 1.20 },
  { year: 2024, births: 686061, deaths: 1605298, tfr: 1.15 },
];
export const VITAL_2024 = {
  births: 686061, deaths: 1605298, naturalChange: -919237,
  tfr: 1.15, lifeMale: 81.09, lifeFemale: 87.13, infantMortality: 1.7,
};

// Prefectures, 2025 Census (preliminary), 1 October 2025. Population in
// millions to two decimals; change is the 2020–2025 census change in %.
export const PREFECTURES = [
  { name: 'Tokyo', capital: 'Shinjuku', region: 'Kanto', pop: 14.25, change: 1.4, density: 6493 },
  { name: 'Kanagawa', capital: 'Yokohama', region: 'Kanto', pop: 9.19, change: -0.5, density: 3805 },
  { name: 'Osaka', capital: 'Osaka', region: 'Kansai', pop: 8.76, change: -0.8, density: 4600 },
  { name: 'Aichi', capital: 'Nagoya', region: 'Chubu', pop: 7.45, change: -1.2, density: 1440 },
  { name: 'Saitama', capital: 'Saitama', region: 'Kanto', pop: 7.29, change: -0.8, density: 1921 },
  { name: 'Chiba', capital: 'Chiba', region: 'Kanto', pop: 6.28, change: -0.1, density: 1219 },
  { name: 'Hyogo', capital: 'Kobe', region: 'Kansai', pop: 5.36, change: -1.9, density: 638 },
  { name: 'Fukuoka', capital: 'Fukuoka', region: 'Kyushu', pop: 5.09, change: -1.0, density: 1022 },
  { name: 'Hokkaido', capital: 'Sapporo', region: 'Hokkaido', pop: 4.99, change: -4.6, density: 60 },
  { name: 'Shizuoka', capital: 'Shizuoka', region: 'Chubu', pop: 3.57, change: -1.6, density: 459 },
  { name: 'Ibaraki', capital: 'Mito', region: 'Kanto', pop: 2.84, change: -1.0, density: 465 },
  { name: 'Hiroshima', capital: 'Hiroshima', region: 'Chugoku', pop: 2.74, change: -2.1, density: 324 },
  { name: 'Kyoto', capital: 'Kyoto', region: 'Kansai', pop: 2.55, change: -1.1, density: 553 },
  { name: 'Miyagi', capital: 'Sendai', region: 'Tohoku', pop: 2.25, change: -2.2, density: 309 },
  { name: 'Niigata', capital: 'Niigata', region: 'Chubu', pop: 2.07, change: -6.0, density: 164 },
  { name: 'Nagano', capital: 'Nagano', region: 'Chubu', pop: 1.95, change: -4.5, density: 144 },
  { name: 'Gifu', capital: 'Gifu', region: 'Chubu', pop: 1.93, change: -2.5, density: 182 },
  { name: 'Gunma', capital: 'Maebashi', region: 'Kanto', pop: 1.91, change: -1.5, density: 300 },
  { name: 'Tochigi', capital: 'Utsunomiya', region: 'Kanto', pop: 1.90, change: -1.7, density: 297 },
  { name: 'Okayama', capital: 'Okayama', region: 'Chugoku', pop: 1.85, change: -2.0, density: 260 },
];
export const SMALLEST_PREFECTURES = [
  { name: 'Tottori', pop: 0.52 }, { name: 'Shimane', pop: 0.64 }, { name: 'Kochi', pop: 0.66 },
];

// Regions, built from the 2025 Census preliminary prefecture counts.
export const REGIONS = [
  { name: 'Kanto', pop: 43.7, share: 35.5, prefectures: 7, note: 'Tokyo, Kanagawa, Saitama, Chiba, Ibaraki, Tochigi, Gunma' },
  { name: 'Kansai', pop: 20.3, share: 16.5, prefectures: 6, note: 'Osaka, Hyogo, Kyoto, Shiga, Nara, Wakayama' },
  { name: 'Chubu', pop: 20.6, share: 16.7, prefectures: 9, note: 'Aichi, Shizuoka, Niigata, Nagano, Gifu, Toyama, Ishikawa, Fukui, Yamanashi' },
  { name: 'Kyushu & Okinawa', pop: 14.0, share: 11.4, prefectures: 8, note: 'Fukuoka, Kumamoto, Kagoshima, Nagasaki, Oita, Miyazaki, Saga, Okinawa' },
  { name: 'Tohoku', pop: 8.2, share: 6.7, prefectures: 6, note: 'Miyagi, Fukushima, Iwate, Yamagata, Akita, Aomori' },
  { name: 'Chugoku', pop: 7.0, share: 5.7, prefectures: 5, note: 'Hiroshima, Okayama, Yamaguchi, Shimane, Tottori' },
  { name: 'Hokkaido', pop: 5.0, share: 4.1, prefectures: 1, note: 'Japan’s largest prefecture by area: 83,424 km²' },
  { name: 'Shikoku', pop: 3.5, share: 2.9, prefectures: 4, note: 'Ehime, Kagawa, Tokushima, Kochi' },
];

// Nominal GDP, trillion yen, and real growth %. Cabinet Office, System of National Accounts.
export const GDP_SERIES = [
  { year: 2015, gdp: 532.6, growth: 1.6 }, { year: 2016, gdp: 539.1, growth: 0.8 },
  { year: 2017, gdp: 547.7, growth: 1.7 }, { year: 2018, gdp: 550.9, growth: 0.6 },
  { year: 2019, gdp: 557.8, growth: -0.4 }, { year: 2020, gdp: 539.9, growth: -4.2 },
  { year: 2021, gdp: 550.5, growth: 2.7 }, { year: 2022, gdp: 564.5, growth: 1.1 },
  { year: 2023, gdp: 592.3, growth: 1.5 }, { year: 2024, gdp: 609.3, growth: 0.1 },
];
export const ECONOMY = {
  gdpYen: 609.3, gdpUsd: 4.02, gdpPpp: 6.49, gdpPerCapita: 32465, gdpPerCapitaPpp: 52364,
  growth2024: 0.1, growth2025: 1.2, gdpUsd2025: 4.44,
  unemployment: 2.5, participation: 63.8, participationFemale: 56.4, participationMale: 71.7,
  employed: 67.5, labourForce: 69.2,
  cpi2024: 2.7, cpi2025: 3.2, policyRate: 0.5, yenPerDollar2024: 151.4,
  debtToGdp: 251.2, industryShare: 26.8, servicesShare: 71.0, agricultureShare: 1.0,
};
export const TRADE_2024 = {
  exports: 107.9, imports: 113.2, balance: -5.3,
  currentAccount: 29.26, primaryIncome: 40.21, travelSurplus: 5.90, visitors: 36.87,
  topExports: ['Motor vehicles', 'Electronic integrated circuits', 'Semiconductor-making equipment', 'Motor vehicle parts', 'Iron and steel'],
  topImports: ['Crude petroleum', 'Liquefied natural gas', 'Coal', 'Electronic integrated circuits', 'Pharmaceuticals'],
};

// Largest cities, approximate, 2025 Census. Millions, one decimal.
export const CITIES = [
  { name: 'Yokohama', prefecture: 'Kanagawa', pop: 3.77 },
  { name: 'Osaka', prefecture: 'Osaka', pop: 2.75 },
  { name: 'Nagoya', prefecture: 'Aichi', pop: 2.33 },
  { name: 'Sapporo', prefecture: 'Hokkaido', pop: 1.96 },
  { name: 'Fukuoka', prefecture: 'Fukuoka', pop: 1.64 },
  { name: 'Kawasaki', prefecture: 'Kanagawa', pop: 1.54 },
  { name: 'Kobe', prefecture: 'Hyogo', pop: 1.49 },
  { name: 'Kyoto', prefecture: 'Kyoto', pop: 1.44 },
  { name: 'Saitama', prefecture: 'Saitama', pop: 1.35 },
  { name: 'Hiroshima', prefecture: 'Hiroshima', pop: 1.20 },
];

// Geography, living and environment.
export const GEOGRAPHY = {
  areaKm2: 377975, islands: 14125, coastlineKm: 29751, highestPoint: 'Mt Fuji, 3,776 m',
  forestShare: 'about two-thirds', households: 57.13, householdSize: 2.15,
  foreignResidents: 3.84, japaneseNationals: 119.1,
  hospitalBedsPer1000: 12.6, doctorsPer1000: 2.6, tertiaryAttainment: 56,
  co2Mt: 1017, renewableElectricityShare: 25.7, energySelfSufficiency: 13.3,
};

// What happened in the latest year, for the home-page highlights.
export const HIGHLIGHTS_2025 = [
  { k: 'Census', v: '123.05m people', d: 'The 2025 Census counted 123,049,524 residents on 1 October 2025 — 3.10 million fewer than in 2020, the largest five-year fall since the census began in 1920. Only Tokyo grew among the 47 prefectures in the preliminary count.' },
  { k: 'Ageing', v: '29.3% aged 65+', d: '36.25 million people were 65 or older in September 2024, a record share. The working-age population (15–64) has fallen 16% from its 1995 peak of 87.3 million.' },
  { k: 'Births', v: '686,061 in 2024', d: 'Births fell below 700,000 for the first time since records began in 1899, and the total fertility rate hit a record low of 1.15. Deaths reached 1,605,298, so the natural decrease was 919,237.' },
  { k: 'Trade', v: '¥107.9tn exports', d: 'Goods exports hit a record in 2024, yet the goods deficit was ¥5.3tn. The current account surplus was a record ¥29.26tn, carried by ¥40.21tn of primary income from abroad.' },
  { k: 'Visitors', v: '36.87m arrivals', d: 'A record 36.87 million visitors arrived in 2024, above the pre-pandemic peak of 31.9 million in 2019, and the travel surplus reached ¥5.90tn.' },
  { k: 'Prices & jobs', v: 'CPI +3.2% · jobs 2.5%', d: 'Consumer prices rose 3.2% in 2025 while unemployment stayed at 2.5%. The Bank of Japan’s policy rate stood at 0.5% after its January 2025 rise.' },
];

export const SOURCES = [
  { publisher: 'Statistics Bureau of Japan (MIC)', title: '2025 Population Census, preliminary counts', year: '2026', detail: 'National total 123,049,524 on 1 Oct 2025; prefecture counts; 57.13m households.' },
  { publisher: 'Statistics Bureau of Japan (MIC)', title: 'Population Estimates', year: '2024', detail: 'Age structure: 0–14 11.1%, 15–64 59.5%, 65+ 29.3%; total 123.80m on 1 Oct 2024.' },
  { publisher: 'Ministry of Health, Labour and Welfare', title: 'Vital Statistics, final data 2024', year: '2025', detail: 'Births 686,061; deaths 1,605,298; total fertility rate 1.15; life tables: men 81.09, women 87.13 years.' },
  { publisher: 'Cabinet Office', title: 'System of National Accounts', year: '2025', detail: 'Nominal GDP ¥609.29tn in 2024; real growth +0.1% in 2024.' },
  { publisher: 'World Bank', title: 'World Development Indicators', year: '2026', detail: 'GDP $4.02tn (2024) and $4.44tn (2025); GDP per capita $32,465 (2024); CPI +3.2% and unemployment 2.5% (2025).' },
  { publisher: 'IMF', title: 'World Economic Outlook', year: '2025–26', detail: 'General government gross debt 251.2% of GDP in 2024.' },
  { publisher: 'Ministry of Finance', title: 'Trade Statistics & Balance of Payments', year: '2025', detail: 'Exports ¥107.9tn, imports ¥113.2tn, goods deficit ¥5.3tn (2024, customs basis); current account surplus ¥29.26tn.' },
  { publisher: 'Japan National Tourism Organization', title: 'Visitor arrivals', year: '2025', detail: '36.87 million visitors in 2024, a record.' },
  { publisher: 'OECD', title: 'Employment Outlook 2025; Labour Force Survey', year: '2025', detail: 'Unemployment 2.5%; employment rate 62.3%; female employment 55.1%.' },
  { publisher: 'METI / Greenhouse Gas Inventory Office', title: 'Energy and emissions', year: '2024', detail: 'Renewable share of electricity 25.7% (FY2023); greenhouse gas emissions 1,017 Mt CO₂e (FY2023).' },
];
