#!/usr/bin/env node
/*
 * Baut Lernbereich_<slug>.html (offene Aufgaben mit Lösungshinweisen) aus Template + Daten.
 *   node scripts/build-lernbereich.js           # alle
 *   node scripts/build-lernbereich.js vwl-1     # nur eine Lektion
 *
 * Datenschema scripts/lernbereich-data/<day_id>.json:
 *   { day_id, lektion, thema, slug, kurs_label, tasks: [ { topic, frage, loesung, punkte?, hinweis? } ] }
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
  'vwl-pt': 'VWL/Pruefungstraining',
  'bwl-pt': 'BWL/Pruefungstraining',
};
const MIN_TASKS = 10;

const TEMPLATE = fs.readFileSync(path.join(__dirname, 'lernbereich-template.html'), 'utf8');
const DATA_DIR = path.join(__dirname, 'lernbereich-data');
const filter = process.argv[2];

let files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
if (filter) files = files.filter(f => f === filter + '.json');
if (!files.length) { console.error('Keine Lernbereich-Daten gefunden.'); process.exit(1); }

let errors = 0;
for (const file of files.sort()) {
  const d = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
  const p = [];
  if (!FOLDERS[d.day_id]) p.push(`unbekannte day_id ${d.day_id}`);
  if (!Array.isArray(d.tasks) || d.tasks.length < MIN_TASKS) p.push(`nur ${(d.tasks || []).length} Aufgaben (<${MIN_TASKS})`);
  (d.tasks || []).forEach((t, i) => {
    if (!t.topic || !t.frage || !t.loesung) p.push(`Aufgabe ${i}: topic/frage/loesung fehlt`);
  });
  if (p.length) { console.error(`✗ ${file}: ${p.slice(0, 4).join('; ')}`); errors++; continue; }

  const html = TEMPLATE
    .replaceAll('{{PILL}}', d.pill || `Lektion ${d.lektion} · Lernbereich`)
    .replaceAll('{{TITEL_PREFIX}}', d.titel_prefix || 'Lernbereich')
    .replaceAll('{{THEMA}}', d.thema)
    .replaceAll('{{DAY_ID}}', d.day_id)
    .replaceAll('{{KURS_LABEL}}', d.kurs_label || '')
    .replace('{{TASKS_JSON}}', JSON.stringify(d.tasks, null, 0));
  const out = path.join(ROOT, FOLDERS[d.day_id], `${d.datei_prefix || 'Lernbereich'}_${d.slug}.html`);
  fs.writeFileSync(out, html, 'utf8');
  console.log(`✓ Lernbereich ${d.day_id}: ${d.tasks.length} Aufgaben -> ${path.basename(out)}`);
}
console.log(errors ? `\n❌ ${errors} Fehler` : '\n✅ Alle Lernbereiche gebaut');
process.exit(errors ? 1 : 0);
