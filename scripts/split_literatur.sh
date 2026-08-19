#!/usr/bin/env bash
# Splittet die Verlags-PDFs (lokal, NICHT im Repo) in Lektions-Auszüge.
# Quelle: /media/sf_Wirtschaftsfachwirt/  ·  Ziel: Lektionsordner (per .gitignore ausgeschlossen)
#
# Seitenbereiche (PDF-Seiten, kartiert am 19.08.2026):
#   VWL_Textband.pdf  (73 S., Buchseite = PDF-Seite - 2)
#     Kap 1 Markt/Preis/Wettbewerb: 3-19 · Kap 2 VGR: 20-29 · Kap 3 Konjunktur: 30-58
#     Kap 4 Außenwirtschaft: 57-66 · Lösungshinweise: 67-73
#   VWL Ubungsband.pdf (20 S.): Kap 1: 1-4 · Kap 2: 5 · Kap 3: 6-10 · Kap 4: 11 · Lösungen: 12-20
#   BWL Ubungsband.pdf (50 S.): Funktionen: 1-20 · Existenzgründung/Rechtsformen: 21-28
#     Zusammenschlüsse: 29-38 · Lösungen: 39-50
set -euo pipefail

SRC="${1:-/media/sf_Wirtschaftsfachwirt}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VT="$SRC/VWL_Textband.pdf"
VU="$SRC/VWL Ubungsband.pdf"
BU="$SRC/BWL Ubungsband.pdf"

split() { # split <quelle> <bereiche> <ziel>
  qpdf --empty --pages "$1" "$2" -- "$3" && echo "✓ $(basename "$3") ($2)"
}

# --- VWL Lektion 1: Grundbegriffe & Preisbildung (Textband Kap 1.1, Übungen Kap 1) ---
L1="$ROOT/VWL/Lektion-1_19.08._Grundbegriffe-und-Preisbildung"
split "$VT" "1-13,67-73" "$L1/Grundlagen_Grundbegriffe-und-Preisbildung.pdf"
split "$VU" "1-4,12-20"  "$L1/Uebungen_Grundbegriffe-und-Preisbildung.pdf"

# --- VWL Lektion 2: Wettbewerb, Staatseingriffe & VGR (Kap 1.2-1.3, Kap 2, Kap 3.1) ---
L2="$ROOT/VWL/Lektion-2_22.08._Wettbewerb-Staatseingriffe-VGR"
split "$VT" "14-42,67-73" "$L2/Grundlagen_Wettbewerb-Staatseingriffe-VGR.pdf"
split "$VU" "1-7,12-20"   "$L2/Uebungen_Wettbewerb-Staatseingriffe-VGR.pdf"

# --- VWL Lektion 3: Konjunktur, Wirtschaftspolitik & Außenwirtschaft (Kap 3.2, Kap 4) ---
L3="$ROOT/VWL/Lektion-3_29.08._Konjunktur-Wirtschaftspolitik-Aussenwirtschaft"
split "$VT" "41-73" "$L3/Grundlagen_Konjunktur-Wirtschaftspolitik-Aussenwirtschaft.pdf"
split "$VU" "6-20"  "$L3/Uebungen_Konjunktur-Wirtschaftspolitik-Aussenwirtschaft.pdf"

# --- BWL Lektion 1: Betriebliche Funktionen I (Produktion, Logistik, Marketing) ---
B1="$ROOT/BWL/Lektion-1_05.09._Betriebliche-Funktionen-I"
split "$BU" "1-19,39-50" "$B1/Uebungen_Betriebliche-Funktionen-I.pdf"

# --- BWL Lektion 2: Betriebliche Funktionen II (ReWe, Finanzierung, Controlling, Personal) ---
B2="$ROOT/BWL/Lektion-2_12.09._Betriebliche-Funktionen-II"
split "$BU" "13-20,39-50" "$B2/Uebungen_Betriebliche-Funktionen-II.pdf"

# --- BWL Lektion 3: Existenzgründung & Rechtsformen ---
B3="$ROOT/BWL/Lektion-3_26.09._Existenzgruendung-und-Rechtsformen"
split "$BU" "21-28,39-50" "$B3/Uebungen_Existenzgruendung-und-Rechtsformen.pdf"

# --- BWL Lektion 4: Unternehmenszusammenschlüsse ---
B4="$ROOT/BWL/Lektion-4_27.02._Unternehmenszusammenschluesse"
split "$BU" "29-50" "$B4/Uebungen_Unternehmenszusammenschluesse.pdf"

# Hinweis: BWL-Textband liegt noch nicht vor — Grundlagen_*.pdf für BWL folgen,
# sobald das Textband da ist (dann hier ergänzen).
echo "Fertig."
