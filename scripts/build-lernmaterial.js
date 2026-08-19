#!/usr/bin/env node
/*
 * Baut Quiz-, Karteikarten-, Memory-, Wordle- und Hängemann-HTML aus Templates + Lektions-Daten.
 *   node scripts/build-lernmaterial.js            # alle Lektionen
 *   node scripts/build-lernmaterial.js vwl-1      # nur eine Lektion
 *
 * Datenquellen (jeweils <day_id>.json, z. B. vwl-1.json):
 *   scripts/quiz-data/          { day_id, lektion, thema, slug, kurs_label, questions: [{topic,q,options[4],a,e}] }
 *   scripts/karteikarten-data/  { day_id, lektion, thema, slug, cards: [{topic,front,back}] }   -> Karteikarten + Memory
 *   scripts/spiele-data/        { day_id, lektion, thema, slug, words: [{word,hint}] }          -> Wordle + Hängemann
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
};
const MIN_CARDS = 40, MIN_WORDS = 40, MIN_QUESTIONS = 20, MIN_PAIRS = 8;
const WORD_RE = /^[A-ZÄÖÜß]{4,14}$/;

const tpl = n => fs.readFileSync(path.join(__dirname, n), 'utf8');
const QUIZ_T = tpl('quiz-template.html'), KARTEI_T = tpl('karteikarten-template.html'),
      MEMORY_T = tpl('memory-template.html'), WORDLE_T = tpl('wordle-template.html'),
      HANGMAN_T = tpl('hangman-template.html');

const filter = process.argv[2];
let errors = 0, built = 0;

function listData(dir) {
  const d = path.join(__dirname, dir);
  if (!fs.existsSync(d)) return [];
  let files = fs.readdirSync(d).filter(f => f.endsWith('.json'));
  if (filter) files = files.filter(f => f === filter + '.json');
  return files.sort().map(f => ({ file: f, data: JSON.parse(fs.readFileSync(path.join(d, f), 'utf8')) }));
}
function outDir(day_id) {
  const rel = FOLDERS[day_id];
  if (!rel) throw new Error(`Unbekannte day_id: ${day_id}`);
  return path.join(ROOT, rel);
}
function fill(t, d, extra = {}) {
  let h = t.replaceAll('{{TAG}}', String(d.lektion)).replaceAll('{{THEMA}}', d.thema)
           .replaceAll('{{DAY_ID}}', d.day_id);
  for (const [k, v] of Object.entries(extra)) h = h.replaceAll(`{{${k}}}`, v);
  return h;
}

// --- Quiz ---
for (const { file, data: d } of listData('quiz-data')) {
  const p = [];
  if (!Array.isArray(d.questions) || d.questions.length < MIN_QUESTIONS) p.push(`nur ${(d.questions || []).length} Fragen (<${MIN_QUESTIONS})`);
  (d.questions || []).forEach((q, i) => {
    if (!q.q || !Array.isArray(q.options) || q.options.length !== 4) p.push(`Frage ${i}: q/options ungültig`);
    if (!(q.a >= 0 && q.a <= 3)) p.push(`Frage ${i}: a fehlt`);
    if (!q.e) p.push(`Frage ${i}: Erklärung e fehlt`);
    if (!q.topic) p.push(`Frage ${i}: topic fehlt`);
  });
  if (p.length) { console.error(`✗ quiz ${file}: ${p.slice(0, 4).join('; ')}`); errors++; continue; }
  const html = fill(QUIZ_T, d, {
    N_FRAGEN: String(d.questions.length),
    KURS_LABEL: d.kurs_label || '',
    QUESTIONS_JSON: JSON.stringify(d.questions, null, 0),
  });
  fs.writeFileSync(path.join(outDir(d.day_id), `Quiz_${d.slug}.html`), html, 'utf8');
  console.log(`✓ Quiz ${d.day_id}: ${d.questions.length} Fragen`); built++;
}

// --- Karteikarten + Memory ---
for (const { file, data: d } of listData('karteikarten-data')) {
  const p = [];
  if (!Array.isArray(d.cards) || d.cards.length < MIN_CARDS) p.push(`nur ${(d.cards || []).length} Karten (<${MIN_CARDS})`);
  const seen = new Set();
  (d.cards || []).forEach((c, i) => {
    if (!c.front || !c.back || !c.topic) p.push(`Karte ${i}: front/back/topic fehlt`);
    const k = (c.front || '').trim().toLowerCase();
    if (seen.has(k)) p.push(`Karte ${i}: Dublette`);
    seen.add(k);
  });
  if (p.length) { console.error(`✗ karteikarten ${file}: ${p.slice(0, 4).join('; ')}`); errors++; continue; }
  fs.writeFileSync(path.join(outDir(d.day_id), `Karteikarten_${d.slug}.html`),
    fill(KARTEI_T, d, { CARDS_JSON: JSON.stringify(d.cards, null, 0) }), 'utf8');
  const pairs = d.cards.map(c => ({ term: c.front, def: c.back })).filter(x => x.term && x.def).slice(0, 30);
  if (pairs.length < MIN_PAIRS) { console.error(`✗ memory ${file}: nur ${pairs.length} Paare`); errors++; continue; }
  fs.writeFileSync(path.join(outDir(d.day_id), `Memory_${d.slug}.html`),
    fill(MEMORY_T, d, { PAIRS_JSON: JSON.stringify(pairs, null, 0) }), 'utf8');
  console.log(`✓ Karteikarten+Memory ${d.day_id}: ${d.cards.length} Karten`); built++;
}

// --- Wordle + Hängemann ---
for (const { file, data: d } of listData('spiele-data')) {
  const p = [];
  if (!Array.isArray(d.words) || d.words.length < MIN_WORDS) p.push(`nur ${(d.words || []).length} Wörter (<${MIN_WORDS})`);
  const seen = new Set();
  (d.words || []).forEach((w, i) => {
    const W = (w.word || '').toUpperCase();
    if (!WORD_RE.test(W)) p.push(`Wort ${i} ungültig: "${w.word}"`);
    if (seen.has(W)) p.push(`Dublette: "${W}"`);
    seen.add(W);
    if (!w.hint || w.hint.trim().length < 5) p.push(`Wort ${i} ohne Hinweis`);
  });
  if (p.length) { console.error(`✗ spiele ${file}: ${p.slice(0, 4).join('; ')}`); errors++; continue; }
  const words = d.words.map(w => ({ word: w.word.toUpperCase(), hint: w.hint.trim() }));
  const json = JSON.stringify(words, null, 0);
  fs.writeFileSync(path.join(outDir(d.day_id), `Wordle_${d.slug}.html`), fill(WORDLE_T, d, { WORDS_JSON: json }), 'utf8');
  fs.writeFileSync(path.join(outDir(d.day_id), `Hangman_${d.slug}.html`), fill(HANGMAN_T, d, { WORDS_JSON: json }), 'utf8');
  console.log(`✓ Wordle+Hängemann ${d.day_id}: ${words.length} Wörter`); built++;
}

console.log(errors ? `\n❌ ${errors} Datei(en) mit Fehlern` : `\n✅ ${built} Materialpakete gebaut`);
process.exit(errors ? 1 : 0);
