"""Kompiliert ein oder alle LaTeX-Dokumente im Repo zu PDF.

Nutzt xelatex (wegen fontspec) und setzt TEXINPUTS so, dass
templates/bfw-style.tex aufgelöst wird.

Aufruf:
  python3 scripts/build_tex.py                    # baut alle .tex unter VWL/ und BWL/
  python3 scripts/build_tex.py path/to/file.tex   # baut nur diese Datei
"""

import os, sys, subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TEMPLATES = ROOT / "templates"
KURS_DIRS = [ROOT / "VWL", ROOT / "BWL"]


def build(tex_file: Path, engine: str = "xelatex") -> bool:
    tex_file = tex_file.resolve()
    workdir = tex_file.parent
    print(f"  bauen: {tex_file.relative_to(ROOT)}")

    env = os.environ.copy()
    sep = ";" if os.name == "nt" else ":"
    env["TEXINPUTS"] = f".{sep}{TEMPLATES}{sep}{env.get('TEXINPUTS', '')}"

    # Zwei Läufe für Inhaltsverzeichnis/Refs
    for run in (1, 2):
        result = subprocess.run(
            [engine, "-interaction=nonstopmode", "-halt-on-error", tex_file.name],
            cwd=str(workdir), env=env, capture_output=True, text=True
        )
        if result.returncode != 0:
            print(f"  FEHLER (run {run}):")
            for line in result.stdout.splitlines()[-30:]:
                print("   ", line)
            return False

    # Hilfsdateien aufräumen
    for ext in (".aux", ".log", ".out", ".toc"):
        p = workdir / (tex_file.stem + ext)
        if p.exists():
            p.unlink()
    return True


def main():
    if len(sys.argv) > 1:
        files = [Path(sys.argv[1])]
    else:
        files = sorted(f for d in KURS_DIRS if d.is_dir() for f in d.rglob("*.tex"))
    if not files:
        print("Keine .tex-Dateien gefunden.")
        return 1
    failed = [f for f in files if not build(f)]
    print(f"\n{'❌ ' + str(len(failed)) + ' Fehler' if failed else '✅ Alle PDFs gebaut'}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
