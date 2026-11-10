# Solar Year Clock

Single-page prototype: a 24-hour solar dial with a one-day-per-step year slider.

- `index.html` — the whole app (no build step).
- `cities.tsv` — on-device city search data: every GeoNames place with 1,000+ people
  (135,233 rows) with its IANA time zone. Loaded the first time the location picker opens.
- `build-cities.js` — regenerates `cities.tsv`:

```sh
npm install all-the-cities@3.1.0 geo-tz@8.1.11
node build-cities.js cities.tsv
```

Serve the folder over HTTP (e.g. `python3 -m http.server`); browsers block `fetch()` of
`cities.tsv` from a `file://` page, which leaves only the built-in city list.

City data © GeoNames (CC BY 4.0), via the `all-the-cities` package; time zones from
`geo-tz` (timezone-boundary-builder, ODbL).
