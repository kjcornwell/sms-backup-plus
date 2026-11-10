// Builds solar-clock/cities.tsv: GeoNames cities (pop >= 1000) + IANA time zone per city.
const cities = require('all-the-cities');
const { find } = require('geo-tz');
const fs = require('fs');
const tzIndex = new Map(), tzList = [];
const rows = [];
let missing = 0;
const t0 = Date.now();
for (const c of cities) {
  const [lon, lat] = c.loc.coordinates;
  let tz = (find(lat, lon) || [])[0];
  if (!tz) { missing++; continue; }
  if (!tzIndex.has(tz)) { tzIndex.set(tz, tzList.length); tzList.push(tz); }
  const name = c.name.replace(/[\t\n]/g, ' ');
  rows.push([name, c.country, c.adminCode || '', lat.toFixed(3), lon.toFixed(3), c.population.toString(36), tzIndex.get(tz).toString(36)].join('\t'));
}
// biggest first, so a scan can stop early once enough strong matches are found
rows.sort((a, b) => parseInt(b.split('\t')[5], 36) - parseInt(a.split('\t')[5], 36));
fs.writeFileSync(process.argv[2], tzList.join('|') + '\n' + rows.join('\n') + '\n');
console.log(`cities ${rows.length}, missing tz ${missing}, zones ${tzList.length}, ${(Date.now() - t0) / 1000}s`);
