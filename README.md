# Wirtschaftsfachwirt — Lernplattform VWL & BWL

Kurs- und Materialorganisation für den Qualifikationsbereich **1. Volks- und Betriebswirtschaft**
(Wirtschaftsbezogene Qualifikationen, Rahmenplan DIHK).

🌐 **Live über GitHub Pages:** https://cansi798.github.io/Wirtschaftsfachwirt_VWL_BWL/
(Zugangscodes: `vwl` für den VWL-Kursbereich, `bwl` für den BWL-Kursbereich)

## Kurs

**Dozent:** Can Siebert · **Format:** Online-Unterricht · **Zeitraum:** 19.08.2026 – 27.02.2027 · **Umfang:** 40 UE in 7 Terminen

| Lektion | Datum | Thema | Rahmenplan |
|---------|-------|-------|------------|
| VWL 1 | Mi 19.08.2026, 18:00–21:15 | Grundbegriffe & Preisbildung am Markt | 1.1.1 |
| VWL 2 | Sa 22.08.2026, 08:15–13:15 | Wettbewerbspolitik, Staatseingriffe & VGR | 1.1.1–1.1.3 |
| VWL 3 | Sa 29.08.2026, 08:15–13:15 | Konjunktur, Wirtschaftspolitik & Außenwirtschaft | 1.1.3–1.1.4 |
| BWL 1 | Sa 05.09.2026, 08:15–13:15 | Betriebliche Funktionen I: Produktion, Logistik, Marketing | 1.2.1 |
| BWL 2 | Sa 12.09.2026, 08:15–13:15 | Betriebliche Funktionen II: ReWe, Finanzierung, Controlling, Personal | 1.2.1–1.2.2 |
| BWL 3 | Sa 26.09.2026, 08:15–13:15 | Existenzgründung & Unternehmensrechtsformen | 1.3 |
| BWL 4 | Sa 27.02.2027, 08:15–13:15 | Unternehmenszusammenschlüsse | 1.4 |

## Material pro Lektion

- `Tagesplan_<Thema>.md` — Ablaufplan mit Zeitblöcken
- `Handout_<Thema>.pdf` (+ `.tex`) — ausführliches Skript
- `Praesentation_<Thema>.html` — Foliensatz für den Unterricht
- `Quiz_<Thema>.html` — Multiple-Choice-Quiz zur Selbstkontrolle
- `Karteikarten_<Thema>.html` — Leitner-System
- `Wordle_/Hangman_/Memory_<Thema>.html` — Lernspiele
- `Aufgabenheft_<Thema>.pdf` (+ `.tex`, `Aufgaben_<Thema>.md`) — Übungsaufgaben mit Musterlösungen
- `Grundlagen_/Uebungen_<Thema>.pdf` — Literatur-Auszüge (_aus Urheberrechtsgründen nicht im Repo_)

## Struktur

```
.
├── index.html            Kursauswahl mit Zugangscode-Gate (vwl / bwl)
├── kurs-vwl.html         Dashboard VWL (3 Lektionen)
├── kurs-bwl.html         Dashboard BWL (4 Lektionen)
├── VWL/Lektion-N_…/      Material pro VWL-Lektion
├── BWL/Lektion-N_…/      Material pro BWL-Lektion
├── templates/            Gemeinsame LaTeX-/CSS-Styles
└── scripts/              Build-Skripte + Daten (Quiz, Karteikarten, Spiele)
```

## Bauen

```bash
node scripts/build-lernmaterial.js       # Quiz, Karteikarten, Memory, Wordle, Hängemann aus JSON-Daten
python3 scripts/build_tex.py             # Handouts & Aufgabenhefte (xelatex)
bash scripts/split_literatur.sh          # Literatur-Auszüge splitten (lokal, nicht im Repo)
```

## Hinweise

- Verlagsmaterial (Text-/Übungsband-Auszüge) wird über `.gitignore` ausgeschlossen.
- Der BWL-Textband liegt noch nicht vor — `Grundlagen_*.pdf` für BWL folgen.
- Video-Aufzeichnungen und Podcasts werden nach den Terminen ergänzt (`medien`-Block in den Dashboards).
