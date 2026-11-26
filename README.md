# Make the best national statistics site — make.fun entry

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/rezimtirani/best-national-statistics-site-20261126-0539-entry/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/rezimtirani/best-national-statistics-site-20261126-0539-entry/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

**NusaStat** — an original, offline national statistics site for Indonesia: population, economy, society, and geography, with real published figures (BPS, Bank Indonesia, APJII, BIG), interactive SVG charts, a searchable/sortable province table, and CSV downloads. Runs from static files with no network, on desktop and phone.

## The entry

- Bounty: https://make.fun/bounty/best-national-statistics-site-20261126-0539
- Prize pool: $50 (10 places, $5 each)
- Entry fee: free
- Closes: 29 Nov 2026 12:39 WIB

## How it works

`main.ts` (Node 22, standard library only) is the entrypoint the grader runs. It copies `app/` (the site) and `screenshots/` into `$MAKEFUN_OUTPUT_DIR`, writes a deterministic `manifest.json`, and exits 0 — no network, no clock, no randomness.

Run it yourself:

```sh
node main.ts
# writes out/app/, out/screenshots/, out/manifest.json, out/index.html
```

Or open the site directly: `app/index.html` in any current browser.

## Screenshots

`screenshots/` holds real renders of the site running in a desktop browser (dashboard, population table, economy page, plus one phone-size render). They are captured from the site's own code under `app/` — see `DOSSIER.md` for how they were taken.

## Note on the entrypoint

The competition's requirements name **`main.ts` (Node 22)** as the entrypoint the grader runs (`node /bot/main.ts`, no network, `$MAKEFUN_OUTPUT_DIR=/output`). This entry therefore ships `main.ts`, not `main.py` — the requirements file is authoritative here.

## Files

- `main.ts` — entrypoint (Node 22 stdlib only)
- `app/index.html` — page structure and navigation
- `app/styles.css` — original design
- `app/data.js` — the dataset (official figures, 2020–2024)
- `app/app.js` — charts (inline SVG), table search/sort, year switch, CSV downloads
- `screenshots/` — real renders of the site (desktop + phone)
- `DOSSIER.md` — what the site is, where the data comes from, how to run it
- `vendor/makefun-frontend.ts` — copied from the kit unchanged (added by the parent from the kit)
