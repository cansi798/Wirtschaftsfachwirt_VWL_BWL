"""Baut das Gesamtskript eines Kursbereichs (VWL oder BWL) als PDF.

Aufbau:
  Teil A  Lehrtext   — die Handouts aller Lektionen, automatisch übernommen
                        (Überschriften eine Ebene tiefer, Titelblock/TOC entfernt)
  Teil B  Übungsaufgaben auf IHK-Niveau   — <KURS>/Gesamtskript/aufgaben-l<N>.tex
  Teil C  Lösungen                        — <KURS>/Gesamtskript/loesungen-l<N>.tex

Aufruf:
  python scripts/build_gesamtskript.py vwl
  python scripts/build_gesamtskript.py bwl
"""

import re, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_tex import build, ROOT

KURSE = {
    "vwl": {
        "dir": "VWL", "rahmenplan": "1.1 Volkswirtschaftliche Grundlagen",
        "titel": "Volkswirtschaftslehre", "zeitraum": "19.08.2026 -- 26.09.2026",
        "lektionen": [
            (1, "Grundbegriffe \\& Preisbildung am Markt", "Mi, 19.08.2026"),
            (2, "Wettbewerbspolitik, Staatseingriffe \\& VGR", "Sa, 12.09.2026"),
            (3, "Konjunktur, Wirtschaftspolitik \\& Außenwirtschaft", "Sa, 26.09.2026"),
        ],
    },
    "bwl": {
        "dir": "BWL",
        "rahmenplan": "1.2 Betriebliche Funktionen \\textperiodcentered{} 1.3 Existenzgründung \\& Rechtsformen \\textperiodcentered{} 1.4 Unternehmenszusammenschlüsse",
        "titel": "Betriebswirtschaftslehre", "zeitraum": "24.10.2026 -- 27.02.2027",
        "lektionen": [
            (1, "Betriebliche Funktionen I: Produktion, Logistik \\& Marketing", "Sa, 24.10.2026"),
            (2, "Betriebliche Funktionen II: Rechnungswesen, Finanzierung, Controlling \\& Personal", "Sa, 07.11.2026"),
            (3, "Existenzgründung \\& Unternehmensrechtsformen", "Sa, 14.11.2026"),
            (4, "Unternehmenszusammenschlüsse", "Sa, 27.02.2027"),
        ],
    },
}


def skip_braced(text, i):
    """Index direkt hinter der geschweiften Gruppe, die bei text[i] == '{' beginnt."""
    depth = 0
    for j in range(i, len(text)):
        if text[j] == "{":
            depth += 1
        elif text[j] == "}":
            depth -= 1
            if depth == 0:
                return j + 1
    raise ValueError("unbalancierte Klammern")


def handout_body(path: Path):
    """Liefert (Zusatz-Präambelzeilen, Dokumentkörper mit herabgestuften Überschriften)."""
    t = path.read_text(encoding="utf-8")
    pre, rest = t.split("\\begin{document}", 1)
    body = rest.rsplit("\\end{document}", 1)[0]
    extra = [l for l in pre.splitlines() if l.startswith("\\definecolor")]

    # \handouttitel{..}{..}{..}{..} entfernen (Argumente können per % umbrochen sein)
    i = body.find("\\handouttitel")
    if i >= 0:
        j = i + len("\\handouttitel")
        for _ in range(4):
            j = body.index("{", j)
            j = skip_braced(body, j)
        body = body[:i] + body[j:]

    body = re.sub(r"\\tableofcontents\s*(\\vspace\{[^}]*\}\s*\\hrule\s*\\vspace\{[^}]*\})?", "", body)
    body = re.sub(r"\\subsection(\*?)\{", r"\\subsubsection\1{", body)
    body = re.sub(r"\\section(\*?)\{", r"\\subsection\1{", body)
    return extra, body.strip()


def lektion_dir(kurs_dir: Path, num: int) -> Path:
    # Es gibt leere Alt-Ordner verschobener Termine — den mit Handouts nehmen
    for d in sorted(kurs_dir.glob(f"Lektion-{num}_*")):
        if list(d.glob("Handout_*.tex")):
            return d
    raise FileNotFoundError(f"Keine Handouts für Lektion {num} in {kurs_dir}")


def teil(buchstabe, titel, untertitel):
    return f"""
\\clearpage
\\addcontentsline{{toc}}{{part}}{{Teil {buchstabe}\\quad {titel}}}
\\vspace*{{5cm}}
{{\\bfwlabelfont\\color{{bfwPrimary}}TEIL {buchstabe}\\par}}
\\vspace{{0.5em}}
{{\\Huge\\bfseries\\color{{bfwPrimaryDark}}{titel}\\par}}
\\vspace{{0.6em}}
{{\\color{{bfwPrimary}}\\rule{{\\linewidth}}{{2pt}}}}\\par
\\vspace{{0.6em}}
{{\\large\\color{{bfwInkSoft}}{untertitel}\\par}}
\\clearpage
"""


def main():
    key = (sys.argv[1] if len(sys.argv) > 1 else "").lower()
    if key not in KURSE:
        print("Aufruf: python scripts/build_gesamtskript.py vwl|bwl")
        return 1
    k = KURSE[key]
    kurs_dir = ROOT / k["dir"]
    out_dir = kurs_dir / "Gesamtskript"
    kuerzel = k["dir"]

    extra, teil_a, teil_b, teil_c = [], [], [], []
    for num, thema, datum in k["lektionen"]:
        d = lektion_dir(kurs_dir, num)
        teil_a.append(f"\\clearpage\n\\section{{Lektion {num}: {thema}}}\n")
        handouts = sorted(d.glob("Handout_*.tex"))
        for h in handouts:
            x, body = handout_body(h)
            extra += [l for l in x if l not in extra]
            m = re.search(r"Teil-(\d)", h.stem)
            if m and len(handouts) > 1:
                teil_a.append(f"\\par\\medskip{{\\bfwlabelfont\\color{{bfwPrimary}}SESSION {m.group(1)}\\par}}\\smallskip\n")
            teil_a.append(body + "\n")

        for prefix, sammel, titel in (("aufgaben", teil_b, "Aufgaben zu Lektion"),
                                      ("loesungen", teil_c, "Lösungen zu Lektion")):
            frag = out_dir / f"{prefix}-l{num}.tex"
            if not frag.exists():
                print(f"  fehlt: {frag.relative_to(ROOT)}")
                return 1
            sammel.append(f"\\clearpage\n\\section*{{{titel} {num}: {thema}}}\n"
                          f"\\addcontentsline{{toc}}{{section}}{{{titel} {num}: {thema}}}\n"
                          f"\\input{{{frag.name}}}\n")

    tex = f"""\\documentclass[11pt, a4paper]{{article}}
% GENERIERT von scripts/build_gesamtskript.py — nicht von Hand bearbeiten.
% Lehrtext kommt aus den Handouts, Aufgaben/Lösungen aus aufgaben-l*.tex / loesungen-l*.tex.
\\input{{bfw-style.tex}}
{chr(10).join(extra)}
\\kopfzeile{{Gesamtskript {kuerzel}}}
\\setcounter{{tocdepth}}{{2}}

\\begin{{document}}
\\thispagestyle{{empty}}
\\vspace*{{3cm}}
{{\\bfwlabelfont\\color{{bfwPrimary}}WIRTSCHAFTSFACHWIRT (IHK) \\,\\textperiodcentered\\, GESAMTSKRIPT\\par}}
\\vspace{{0.8em}}
{{\\fontsize{{34}}{{40}}\\selectfont\\bfseries\\color{{bfwPrimaryDark}}{k["titel"]}\\par}}
\\vspace{{0.8em}}
{{\\Large\\color{{bfwInkSoft}}Lehrtext, Übungsaufgaben auf IHK-Niveau und Musterlösungen\\par}}
\\vspace{{1.2em}}
{{\\color{{bfwPrimary}}\\rule{{\\linewidth}}{{2pt}}}}\\par
\\vspace{{0.8em}}
{{\\small\\color{{bfwInkSoft}}Rahmenplan: {k["rahmenplan"]}\\par
Kurszeitraum: {k["zeitraum"]} \\,\\textperiodcentered\\, Dozent: Can Siebert\\par}}
\\vfill
\\begin{{merksatz}}[title={{\\bfseries So arbeiten Sie mit diesem Skript}}]
\\textbf{{Teil A}} fasst den gesamten Lehrstoff aller Lektionen zusammen.
\\textbf{{Teil B}} enthält neue Übungsaufgaben im Stil der IHK-Prüfung --- bearbeiten Sie sie
schriftlich und unter Zeitdruck (Richtwert: etwa eine Minute pro Punkt).
Vergleichen Sie erst danach mit den Musterlösungen in \\textbf{{Teil C}}.
\\end{{merksatz}}
\\clearpage
\\tableofcontents
{teil("A", "Lehrtext", "Der gesamte Stoff aller Lektionen im Zusammenhang")}
{"".join(teil_a)}
{teil("B", "Übungsaufgaben", "Neue Aufgaben auf IHK-Niveau --- erst selbst lösen, dann in Teil C vergleichen")}
{"".join(teil_b)}
{teil("C", "Lösungen", "Musterlösungen mit Punktverteilung und Rechenwegen")}
{"".join(teil_c)}
\\end{{document}}
"""
    out = out_dir / f"Skript_{kuerzel}_Gesamt.tex"
    out.write_text(tex, encoding="utf-8")
    print(f"OK {out.relative_to(ROOT)} geschrieben")
    return 0 if build(out, runs=3) else 1


if __name__ == "__main__":
    sys.exit(main())
