# Japan in Numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Erica-Chan/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Erica-Chan/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

An independent national statistics atlas for Japan — population, economy,
regions, work and daily life — built as plain static files that run offline
in a desktop browser or on a phone.

Every figure is a published official figure with its source and year printed
beside it: the 2025 Census (123.05 million people), MHLW Vital Statistics
(686,061 births, fertility 1.15 in 2024), the Cabinet Office SNA (¥609.3
trillion GDP in 2024), the Ministry of Finance trade statistics, JNTO visitor
arrivals, and the World Bank / IMF / OECD series that complete the picture.

## The site

- `#/` Overview — headline indicators, population and GDP charts, age
  structure, top prefectures, the latest year in six numbers
- `#/population` — census series, births and deaths, fertility, age bands,
  the 20 largest prefectures
- `#/economy` — GDP and growth, trade, prices, jobs, government debt
- `#/regions` — regions, a searchable and sortable prefecture table, and a
  compare-two-prefectures tool
- `#/living` — cities, geography, health, energy and foreign residents
- `#/data` — every table in full, each downloadable as CSV
- `#/sources` — every source, and the method

Charts are hand-drawn SVG from the data in `app/data.js` — no chart library,
no network request, nothing fetched from another origin.

## Run it

```sh
node serve.ts        # serves app/ on http://localhost:8080
```

## Hand it in

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` to the output directory and
writes `dossier.json` with the kit's vendored `vendor/makefun-frontend.ts`.

## Screenshots

Real renders of the site in Chromium (Playwright), taken by
`work/shoot.py`: the home page, population page and economy page at
1280×800, and the home page at 390×844 (phone).

---

<sub>Entered on [make.fun](https://make.fun/?ref=96p1ekwa&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
