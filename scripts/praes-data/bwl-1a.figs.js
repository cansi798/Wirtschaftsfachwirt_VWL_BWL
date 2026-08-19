window.addEventListener('load', () => {
  // FIG: Wertschöpfungskette Beschaffung -> Produktion -> Absatz mit Querschnittsfunktionen
  const c1 = document.getElementById('fig-wertschoepfung');
  if (c1) {
    const svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg1.setAttribute('viewBox', '0 0 900 330');
    svg1.setAttribute('width', '900'); svg1.setAttribute('height', '330');
    c1.appendChild(svg1);
    makeRough(svg1, (rc, svg) => {
      const stufen = [
        { t: 'Beschaffung', s: 'Material, Betriebsmittel', c: '#ECFEFF', st: '#0F766E' },
        { t: 'Produktion', s: 'Faktorkombination', c: '#FEF3C7', st: '#F59E0B' },
        { t: 'Absatz / Marketing', s: 'marktliche Verwertung', c: '#FFE4E6', st: '#F97316' }
      ];
      let x = 40;
      stufen.forEach((f, i) => {
        box(rc, svg, x, 60, 230, 100, f.c, f.st);
        text(svg, x + 115, 105, f.t, { bold: true, size: 19, color: f.st });
        text(svg, x + 115, 132, f.s, { size: 13, color: '#475569' });
        if (i < stufen.length - 1) arrow(rc, svg, x + 230, 110, x + 295, 110, '#0F766E');
        x += 295;
      });
      text(svg, 450, 35, 'Wertschöpfungsprozess (funktionale Gliederung)', { size: 18, bold: true, color: '#0F766E' });
      // Querschnittsfunktion Logistik
      box(rc, svg, 40, 190, 820, 46, '#ECFEFF', '#0EA5A4');
      text(svg, 450, 218, 'Logistik — Querschnittsfunktion: Güter-, Informations- und Wertefluss (6 R)', { size: 15, bold: true, color: '#0F766E' });
      // Unterstützungsfunktionen
      box(rc, svg, 40, 252, 820, 46, '#F8FAFC', '#475569');
      text(svg, 450, 280, 'Rechnungswesen · Finanzierung/Investition · Personal · Controlling (→ Lektion 2)', { size: 15, color: '#475569' });
    });
  }

  // FIG: Produktionsfaktoren nach Gutenberg (Baum)
  const c2 = document.getElementById('fig-faktoren');
  if (c2) {
    const svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg2.setAttribute('viewBox', '0 0 900 400');
    svg2.setAttribute('width', '900'); svg2.setAttribute('height', '400');
    c2.appendChild(svg2);
    makeRough(svg2, (rc, svg) => {
      // Wurzel
      box(rc, svg, 290, 20, 320, 54, '#ECFEFF', '#0F766E');
      text(svg, 450, 52, 'Produktionsfaktoren (BWL)', { bold: true, size: 18, color: '#0F766E' });
      // Ebene 2
      box(rc, svg, 80, 120, 440, 50, '#FEF3C7', '#F59E0B');
      text(svg, 300, 150, 'Elementarfaktoren', { bold: true, size: 17, color: '#B45309' });
      box(rc, svg, 590, 120, 270, 50, '#FFE4E6', '#F97316');
      text(svg, 725, 143, 'Dispositiver Faktor', { bold: true, size: 16, color: '#C2410C' });
      text(svg, 725, 162, 'Planung · Organisation · Kontrolle', { size: 12, color: '#475569' });
      svg.appendChild(rc.line(380, 74, 300, 120, { roughness: 1.2, stroke: '#475569', strokeWidth: 1.5 }));
      svg.appendChild(rc.line(520, 74, 725, 120, { roughness: 1.2, stroke: '#475569', strokeWidth: 1.5 }));
      // Ebene 3: Elementarfaktoren
      const elems = [
        { t: 'ausführende Arbeit', s: 'Montieren, Bedienen', x: 40 },
        { t: 'Betriebsmittel', s: 'Maschinen: gebraucht', x: 240 },
        { t: 'Werkstoffe', s: 'Roh-/Hilfs-/Betriebsstoffe', x: 440 }
      ];
      elems.forEach(e => {
        box(rc, svg, e.x, 230, 180, 64, '#F8FAFC', '#0EA5A4');
        text(svg, e.x + 90, 258, e.t, { bold: true, size: 14, color: '#0F766E' });
        text(svg, e.x + 90, 280, e.s, { size: 11.5, color: '#475569' });
        svg.appendChild(rc.line(300, 170, e.x + 90, 230, { roughness: 1.2, stroke: '#94A3B8', strokeWidth: 1.2 }));
      });
      // Werkstoff-Arten
      text(svg, 530, 330, 'Rohstoffe = Hauptbestandteil · Hilfsstoffe = untergeordnet · Betriebsstoffe = verbraucht', { size: 13, color: '#475569' });
      svg.appendChild(rc.line(530, 294, 530, 315, { roughness: 1.2, stroke: '#94A3B8', strokeWidth: 1.2 }));
      // Hinweis VWL
      text(svg, 725, 250, 'Nicht verwechseln:', { size: 13, bold: true, color: '#C2410C' });
      text(svg, 725, 272, 'VWL = Arbeit, Boden, Kapital', { size: 13, color: '#475569' });
    });
  }

  // FIG: Supply Chain rund um den Kunden
  const c3 = document.getElementById('fig-scm');
  if (c3) {
    const svg3 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg3.setAttribute('viewBox', '0 0 900 360');
    svg3.setAttribute('width', '900'); svg3.setAttribute('height', '360');
    c3.appendChild(svg3);
    makeRough(svg3, (rc, svg) => {
      const cx = 450, cy = 185, rx = 330, ry = 130;
      svg.appendChild(rc.ellipse(cx, cy, rx * 2, ry * 2, { roughness: 1.6, stroke: '#0EA5A4', strokeWidth: 1.8 }));
      // Kunde in der Mitte
      box(rc, svg, cx - 80, cy - 28, 160, 56, '#FEF3C7', '#F59E0B');
      text(svg, cx, cy + 6, 'Kunde', { bold: true, size: 19, color: '#B45309' });
      // Partner auf der Ellipse
      const partner = [
        { t: 'Originalhersteller', a: -90 },
        { t: 'Wiederverkäufer', a: -25 },
        { t: 'Logistikdienstleister', a: 55 },
        { t: 'Lieferant', a: 125 },
        { t: 'Zwischenhändler', a: 205 }
      ];
      partner.forEach(p => {
        const rad = p.a * Math.PI / 180;
        const px = cx + rx * Math.cos(rad), py = cy + ry * Math.sin(rad);
        box(rc, svg, px - 92, py - 24, 184, 48, '#ECFEFF', '#0F766E');
        text(svg, px, py + 5, p.t, { bold: true, size: 14, color: '#0F766E' });
      });
      text(svg, 450, 348, 'SCM: Güter-, Informations- und Geldflüsse der gesamten Kette aufeinander abstimmen', { size: 14, color: '#475569' });
    });
  }
});
