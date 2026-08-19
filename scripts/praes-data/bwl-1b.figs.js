window.addEventListener('load', () => {
  // FIG: Produktlebenszyklus (Umsatzkurve mit fünf Phasen)
  const c1 = document.getElementById('fig-lebenszyklus');
  if (c1) {
    const svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg1.setAttribute('viewBox', '0 0 900 360');
    svg1.setAttribute('width', '900'); svg1.setAttribute('height', '360');
    c1.appendChild(svg1);
    makeRough(svg1, (rc, svg) => {
      const x0 = 70, y0 = 290, x1 = 860, yTop = 60;
      // Achsen
      arrow(rc, svg, x0, y0, x1, y0, '#475569');
      arrow(rc, svg, x0, y0, x0, yTop - 15, '#475569');
      text(svg, 845, 315, 'Zeit', { size: 13, color: '#475569' });
      text(svg, 70, 35, 'Umsatz', { size: 13, color: '#475569' });
      // Umsatzkurve: Einführung flach, Wachstum steil, Reife flacher, Maximum in der Sättigung, dann Rückgang
      const pts = [
        [x0, y0 - 5], [150, 270], [230, 245], [310, 180], [390, 125],
        [470, 100], [550, 88], [630, 82], [700, 95], [770, 150], [840, 235]
      ];
      svg.appendChild(rc.curve(pts, { roughness: 1.4, stroke: '#0F766E', strokeWidth: 2.6 }));
      // Phasengrenzen und Beschriftung
      const phasen = [
        { t: 'Einführung', s: 'meist Verluste', xa: 70, xe: 240 },
        { t: 'Wachstum', s: 'Umsatz steigt steil', xa: 240, xe: 420 },
        { t: 'Reife', s: 'Zuwachs flacht ab', xa: 420, xe: 580 },
        { t: 'Sättigung', s: 'Umsatzmaximum', xa: 580, xe: 720 },
        { t: 'Degeneration', s: 'Rückgang', xa: 720, xe: 860 }
      ];
      phasen.forEach((p, i) => {
        if (i > 0) svg.appendChild(rc.line(p.xa, y0, p.xa, yTop, { roughness: 1.2, stroke: '#94A3B8', strokeWidth: 1, strokeLineDash: [6, 6] }));
        const mx = (p.xa + p.xe) / 2;
        text(svg, mx, y0 + 25, p.t, { bold: true, size: 13.5, color: '#0F766E' });
        text(svg, mx, y0 + 44, p.s, { size: 11.5, color: '#475569' });
      });
      // Markierung Umsatzmaximum
      svg.appendChild(rc.circle(630, 82, 14, { roughness: 1.2, stroke: '#F59E0B', strokeWidth: 2 }));
      text(svg, 630, 60, 'Maximum', { size: 12, bold: true, color: '#B45309' });
    });
  }

  // FIG: Break-even-Diagramm (Erlöse vs. Gesamtkosten, Gewinnschwelle)
  const c2 = document.getElementById('fig-breakeven');
  if (c2) {
    const svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg2.setAttribute('viewBox', '0 0 900 360');
    svg2.setAttribute('width', '900'); svg2.setAttribute('height', '360');
    c2.appendChild(svg2);
    makeRough(svg2, (rc, svg) => {
      const x0 = 80, y0 = 300, x1 = 850, yTop = 45;
      // Achsen
      arrow(rc, svg, x0, y0, x1, y0, '#475569');
      arrow(rc, svg, x0, y0, x0, yTop, '#475569');
      text(svg, 810, 325, 'Menge (Stück)', { size: 13, color: '#475569' });
      text(svg, 80, 28, '€', { size: 14, bold: true, color: '#475569' });
      // Fixkosten (horizontal)
      svg.appendChild(rc.line(x0, 220, 820, 220, { roughness: 1.3, stroke: '#94A3B8', strokeWidth: 1.6, strokeLineDash: [8, 6] }));
      text(svg, 180, 205, 'Fixkosten', { size: 13, color: '#475569' });
      // Gesamtkosten (fix + variabel): startet bei Fixkosten
      svg.appendChild(rc.line(x0, 220, 820, 105, { roughness: 1.3, stroke: '#F97316', strokeWidth: 2.4 }));
      text(svg, 760, 90, 'Gesamtkosten', { size: 13.5, bold: true, color: '#C2410C' });
      // Erlöse: startet im Ursprung, steiler
      svg.appendChild(rc.line(x0, y0, 820, 55, { roughness: 1.3, stroke: '#0F766E', strokeWidth: 2.4 }));
      text(svg, 762, 42, 'Erlöse', { size: 13.5, bold: true, color: '#0F766E' });
      // Schnittpunkt (Break-even) — Schnitt der beiden Geraden bei ca. x = 500, y = 155
      const bx = 500, by = 155;
      svg.appendChild(rc.circle(bx, by, 16, { roughness: 1.4, stroke: '#F59E0B', strokeWidth: 2.4 }));
      svg.appendChild(rc.line(bx, by, bx, y0, { roughness: 1.2, stroke: '#F59E0B', strokeWidth: 1.4, strokeLineDash: [6, 6] }));
      box(rc, svg, bx - 105, by - 62, 210, 34, '#FEF3C7', '#F59E0B');
      text(svg, bx, by - 40, 'Gewinnschwelle: Gewinn = 0', { size: 12.5, bold: true, color: '#B45309' });
      text(svg, bx, y0 + 25, 'Break-even-Menge', { size: 12.5, bold: true, color: '#B45309' });
      // Zonen
      text(svg, 300, 130, 'Verlustzone', { size: 13, color: '#C2410C' });
      text(svg, 690, 170, 'Gewinnzone', { size: 13, color: '#0F766E' });
    });
  }
});
