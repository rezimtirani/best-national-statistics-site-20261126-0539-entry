# NusaStat — Dossier

## What this is

NusaStat is an original, offline national statistics site for Indonesia. It runs
entirely from static files (HTML + CSS + JavaScript) with no network request,
on a desktop browser and on a phone. Every figure on it is a real published
figure with its year and source written next to it.

## Pages

- **Ringkasan** — dashboard: six headline indicators (population, GDP, growth,
  inflation, unemployment, poverty), GDP trend 2020–2024 with a year switch,
  top provinces, growth and inflation charts.
- **Penduduk** — a searchable, sortable table of the 16 largest provinces
  (population, share, density), age structure, and the demographic bonus.
- **Ekonomi** — exports vs imports 2020–2024, trade balance, sector shares of
  GDP, and a 2024 indicator table.
- **Masyarakat** — poverty and unemployment trends, Human Development Index,
  education and health facts.
- **Wilayah** — geography: islands, area, provinces, regencies/cities,
  coastline, largest islands and widest provinces.
- **Sumber Data** — sources, methodology notes, and CSV downloads of the
  province table and the 2020–2024 yearly series (generated in the browser
  from the same data the charts draw).

## Data

All figures come from official publications: BPS — Statistics Indonesia
(population, GDP, inflation, unemployment, poverty, HDI, trade), Bank
Indonesia (reserves, exchange rate), APJII (internet users 2024), and BIG
(area, islands). Provincial figures are 2024 estimates from BPS population
projections. Sector shares are labelled as estimates. No figure is invented:
where a value is rounded, the page says so.

Headline figures (2024): population 281.6 million; GDP Rp22,138.9 trillion
(≈ US$1.40 trillion); growth 5.03%; inflation 1.57% (Dec, yoy);
unemployment 4.91% (Aug); poverty 9.03% (Mar); HDI 75.02; exports
US$264.7 billion; imports US$233.7 billion; surplus US$31.0 billion.

## Screenshots

`screenshots/` holds real renders of this site running in a desktop browser:
the dashboard, the population table, the economy page, and one phone-size
render. They are taken from the site's own code (the files under `app/`),
never mocked up. If you open the site and take new screenshots, replace the
files under `screenshots/` and keep the same names.

## Known limits

- Provincial figures are BPS 2024 estimates, not census counts; the 2020
  census counted 270.20 million people.
- Sector shares of GDP are labelled as estimates.
- The site is a single-page app with hash routing: every section has its own
  link (`#penduduk`, `#ekonomi`, and so on), so a screenshot can show any
  page directly.
- No live data feed: the dataset is frozen at the 2024 publications listed
  above, by design — the site must run with no network.

## How it works

- `app/index.html` — page structure and navigation (hash-routed sections).
- `app/styles.css` — original design (deep teal + warm amber, system fonts).
- `app/data.js` — the whole dataset as one plain object, no network.
- `app/app.js` — vanilla JS: renders KPI cards, draws line/bar charts as
  inline SVG, runs the province search/sort, the year switch, hash routing,
  and the CSV downloads.
- `main.ts` — the entrypoint the grader runs (`node main.ts`, Node 22). It
  copies `app/` and `screenshots/` into `$MAKEFUN_OUTPUT_DIR`, writes a
  deterministic `manifest.json` (file list with SHA-256), and exits 0. It
  needs no network, no clock, and no randomness.

## How to run it

Open `app/index.html` in any current browser, or serve the folder with any
static server. No build step, no install, no network.

## Originality

Design, text, charts, and the site name are original work for this bounty.
The site is not affiliated with BPS or any government body and copies no
other site's brand, text, or images. Charts are drawn by hand-written SVG
code; there are no stock photos and no third-party libraries.
