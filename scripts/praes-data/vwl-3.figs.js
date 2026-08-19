window.addEventListener('load', () => {
  // FIG: Konjunkturzyklus — Wellenlinie mit vier Phasen um den Wachstumstrend
  const c1 = document.getElementById('fig-konjunktur');
  if (c1) {
    const svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg1.setAttribute('viewBox', '0 0 900 400');
    svg1.setAttribute('width', '900'); svg1.setAttribute('height', '400');
    c1.appendChild(svg1);
    makeRough(svg1, (rc, svg) => {
      const ox = 70, oy = 340, w = 780, h = 280;
      // Achsen
      arrow(rc, svg, ox, oy, ox, oy - h, '#0F172A');
      arrow(rc, svg, ox, oy, ox + w, oy, '#0F172A');
      text(svg, ox + 55, oy - h + 8, 'BIP / Aktivität', { size: 15, bold: true });
      text(svg, ox + w - 40, oy + 28, 'Zeit', { size: 15, bold: true });
      // Wachstumstrend (gestrichelte Gerade, leicht steigend)
      svg.appendChild(rc.line(ox, oy - 90, ox + w - 30, oy - 190, {
        roughness: 0.8, stroke: '#94A3B8', strokeWidth: 1.6, strokeLineDash: [8, 8]
      }));
      text(svg, ox + w - 90, oy - 205, 'Trend', { size: 14, color: '#94A3B8', bold: true });
      // Konjunkturwelle um den Trend (Pfad mit zwei vollen Wellen)
      const wave = 'M ' + ox + ' ' + (oy - 60) +
        ' C ' + (ox + 90) + ' ' + (oy - 60) + ', ' + (ox + 120) + ' ' + (oy - 220) + ', ' + (ox + 195) + ' ' + (oy - 225) +
        ' C ' + (ox + 270) + ' ' + (oy - 230) + ', ' + (ox + 300) + ' ' + (oy - 70) + ', ' + (ox + 375) + ' ' + (oy - 75) +
        ' C ' + (ox + 450) + ' ' + (oy - 80) + ', ' + (ox + 480) + ' ' + (oy - 260) + ', ' + (ox + 555) + ' ' + (oy - 265) +
        ' C ' + (ox + 630) + ' ' + (oy - 270) + ', ' + (ox + 660) + ' ' + (oy - 110) + ', ' + (ox + 735) + ' ' + (oy - 120);
      svg.appendChild(rc.path(wave, { roughness: 1.3, stroke: '#0F766E', strokeWidth: 2.6 }));
      // Phasenbeschriftung
      text(svg, ox + 110, oy - 150, 'Aufschwung', { size: 15, bold: true, color: '#10B981' });
      text(svg, ox + 110, oy - 130, '(Expansion)', { size: 12, color: '#475569' });
      text(svg, ox + 195, oy - 255, 'Boom', { size: 15, bold: true, color: '#F59E0B' });
      text(svg, ox + 195, oy - 238, '(Hochkonjunktur)', { size: 12, color: '#475569' });
      text(svg, ox + 300, oy - 160, 'Abschwung', { size: 15, bold: true, color: '#F97316' });
      text(svg, ox + 300, oy - 142, '(Rezession)', { size: 12, color: '#475569' });
      text(svg, ox + 375, oy - 40, 'Tief', { size: 15, bold: true, color: '#EF4444' });
      text(svg, ox + 375, oy - 22, '(Depression)', { size: 12, color: '#475569' });
      text(svg, ox + 480, oy - 200, 'neuer Aufschwung', { size: 13, bold: true, color: '#10B981' });
      // Markierungspunkte an Hoch- und Tiefpunkt
      svg.appendChild(rc.circle(ox + 195, oy - 225, 12, { roughness: 1, stroke: '#F59E0B', strokeWidth: 2, fill: '#FEF3C7', fillStyle: 'solid' }));
      svg.appendChild(rc.circle(ox + 375, oy - 75, 12, { roughness: 1, stroke: '#EF4444', strokeWidth: 2, fill: '#FFE4E6', fillStyle: 'solid' }));
      text(svg, ox + 390, oy - h + 30, 'Ein Zyklus = Aufschwung → Boom → Rezession → Depression', { size: 14, color: '#475569' });
    });
  }

  // FIG: EZB-Transmissionskette — Leitzinserhöhung bis Inflationsdämpfung
  const c2 = document.getElementById('fig-transmission');
  if (c2) {
    const svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg2.setAttribute('viewBox', '0 0 940 420');
    svg2.setAttribute('width', '940'); svg2.setAttribute('height', '420');
    c2.appendChild(svg2);
    makeRough(svg2, (rc, svg) => {
      // Obere Reihe: 3 Schritte
      const reihe1 = [
        { t: 'EZB erhöht', s: 'die Leitzinsen', c: '#FFE4E6', st: '#EF4444' },
        { t: 'Refinanzierung', s: 'der Banken wird teurer', c: '#FEF3C7', st: '#F59E0B' },
        { t: 'Kreditzinsen', s: 'steigen, Sparneigung steigt', c: '#FEF3C7', st: '#F59E0B' }
      ];
      let x = 30;
      reihe1.forEach((f, i) => {
        box(rc, svg, x, 40, 250, 90, f.c, f.st);
        text(svg, x + 125, 78, f.t, { bold: true, size: 18, color: f.st });
        text(svg, x + 125, 104, f.s, { size: 13, color: '#475569' });
        if (i < reihe1.length - 1) arrow(rc, svg, x + 250, 85, x + 305, 85, '#0F766E');
        x += 305;
      });
      // Verbindung nach unten
      arrow(rc, svg, 795, 130, 795, 175, '#0F766E');
      // Untere Reihe: 3 Schritte (von rechts nach links gelesen? Nein — links nach rechts, Pfeil zurück)
      const reihe2 = [
        { t: 'Kreditnachfrage sinkt', s: 'Unternehmen und Haushalte', c: '#ECFEFF', st: '#0F766E' },
        { t: 'Investitionen und', s: 'Konsum gehen zurück', c: '#ECFEFF', st: '#0F766E' },
        { t: 'Gesamtnachfrage sinkt', s: 'Konjunktur wird gedämpft', c: '#ECFEFF', st: '#0F766E' }
      ];
      x = 640;
      reihe2.forEach((f, i) => {
        box(rc, svg, x, 175, 250, 90, f.c, f.st);
        text(svg, x + 125, 212, f.t, { bold: true, size: 17, color: f.st });
        text(svg, x + 125, 238, f.s, { size: 13, color: '#475569' });
        if (i < reihe2.length - 1) arrow(rc, svg, x, 220, x - 55, 220, '#0F766E');
        x -= 305;
      });
      // Verbindung zum Ziel
      arrow(rc, svg, 155, 265, 155, 310, '#0F766E');
      // Zielbox
      box(rc, svg, 30, 310, 860, 80, '#ECFDF5', '#10B981');
      text(svg, 460, 344, 'Ziel erreicht: Preisanstieg wird verringert — Inflation bekämpft', { bold: true, size: 19, color: '#10B981' });
      text(svg, 460, 372, 'Nebenwirkung: Rückgang von Wachstum und Beschäftigung möglich (restriktive Geldpolitik)', { size: 13, color: '#475569' });
    });
  }
});
