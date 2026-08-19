#!/usr/bin/env node
/*
 * Baut Praesentation_<slug>.html aus Shell-Template + Folien-Datei.
 *   node scripts/build-praesentation.js           # alle
 *   node scripts/build-praesentation.js vwl-1     # nur eine Lektion
 *
 * Quellen:
 *   scripts/praes-data/<day_id>.slides.html   Folien (<section class="slide">…, erste mit "active cover")
 *   scripts/praes-data/<day_id>.figs.js       optional: Rough.js-Figuren (window-load-Block)
 *   Metadaten (lektion, thema, slug) kommen aus scripts/karteikarten-data/<day_id>.json
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FOLDERS = {
  'vwl-1': 'VWL/Lektion-1_19.08._Grundbegriffe-und-Preisbildung',
  'vwl-2': 'VWL/Lektion-2_22.08._Wettbewerb-Staatseingriffe-VGR',
  'vwl-3': 'VWL/Lektion-3_29.08._Konjunktur-Wirtschaftspolitik-Aussenwirtschaft',
  'bwl-1': 'BWL/Lektion-1_05.09._Betriebliche-Funktionen-I',
  'bwl-2': 'BWL/Lektion-2_12.09._Betriebliche-Funktionen-II',
  'bwl-3': 'BWL/Lektion-3_26.09._Existenzgruendung-und-Rechtsformen',
  'bwl-4': 'BWL/Lektion-4_27.02._Unternehmenszusammenschluesse',
  // Session-Teile (a = Teil 1, b = Teil 2) der 6-UE-Lektionen — gleiche Ordner
  'vwl-2a': 'VWL/Lektion-2_22.08._Wettbewerb-Staatseingriffe-VGR',
  'vwl-2b': 'VWL/Lektion-2_22.08._Wettbewerb-Staatseingriffe-VGR',
  'vwl-3a': 'VWL/Lektion-3_29.08._Konjunktur-Wirtschaftspolitik-Aussenwirtschaft',
  'vwl-3b': 'VWL/Lektion-3_29.08._Konjunktur-Wirtschaftspolitik-Aussenwirtschaft',
  'bwl-1a': 'BWL/Lektion-1_05.09._Betriebliche-Funktionen-I',
  'bwl-1b': 'BWL/Lektion-1_05.09._Betriebliche-Funktionen-I',
  'bwl-2a': 'BWL/Lektion-2_12.09._Betriebliche-Funktionen-II',
  'bwl-2b': 'BWL/Lektion-2_12.09._Betriebliche-Funktionen-II',
  'bwl-3a': 'BWL/Lektion-3_26.09._Existenzgruendung-und-Rechtsformen',
  'bwl-3b': 'BWL/Lektion-3_26.09._Existenzgruendung-und-Rechtsformen',
  'bwl-4a': 'BWL/Lektion-4_27.02._Unternehmenszusammenschluesse',
  'bwl-4b': 'BWL/Lektion-4_27.02._Unternehmenszusammenschluesse',
};

const SHELL = fs.readFileSync(path.join(__dirname, 'praesentation-shell.html'), 'utf8');
const DATA_DIR = path.join(__dirname, 'praes-data');
const filter = process.argv[2];

let files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.slides.html'));
if (filter) files = files.filter(f => f === filter + '.slides.html');
if (!files.length) { console.error('Keine Folien-Dateien gefunden.'); process.exit(1); }

let errors = 0;
for (const file of files.sort()) {
  const dayId = file.replace('.slides.html', '');
  let metaPath = path.join(__dirname, 'karteikarten-data', dayId + '.json');
  if (!fs.existsSync(metaPath)) metaPath = path.join(DATA_DIR, dayId + '.meta.json');
  if (!fs.existsSync(metaPath)) { console.error(`✗ ${dayId}: Metadaten fehlen (${metaPath})`); errors++; continue; }
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  const slides = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
  const figsPath = path.join(DATA_DIR, dayId + '.figs.js');
  const figs = fs.existsSync(figsPath) ? fs.readFileSync(figsPath, 'utf8') : '';
  const nSlides = (slides.match(/<section class="slide/g) || []).length;
  if (nSlides < 10) { console.error(`✗ ${dayId}: nur ${nSlides} Folien (<10)`); errors++; continue; }
  if (!slides.includes('slide active cover')) { console.error(`✗ ${dayId}: Deckblatt (slide active cover) fehlt`); errors++; continue; }

  const html = SHELL
    .replaceAll('{{TITLE}}', `Präsentation Lektion ${meta.lektion} — ${meta.thema}`)
    .replace('{{SLIDES}}', slides)
    .replace('{{FIGURES_JS}}', figs);
  const out = path.join(ROOT, FOLDERS[dayId], `Praesentation_${meta.slug}.html`);
  fs.writeFileSync(out, html, 'utf8');
  console.log(`✓ Präsentation ${dayId}: ${nSlides} Folien -> ${path.basename(out)}`);
}
console.log(errors ? `\n❌ ${errors} Fehler` : '\n✅ Alle Präsentationen gebaut');
process.exit(errors ? 1 : 0);
