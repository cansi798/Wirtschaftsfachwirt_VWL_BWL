window.addEventListener('load', () => {
  // FIG: Rechtsformen-Baum (Personen- vs. Kapitalgesellschaften)
  const c2 = document.getElementById('fig-rechtsformen');
  if (c2) {
    const svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg2.setAttribute('viewBox', '0 0 940 420');
    svg2.setAttribute('width', '940'); svg2.setAttribute('height', '420');
    c2.appendChild(svg2);
    makeRough(svg2, (rc, svg) => {
      // Wurzel
      box(rc, svg, 370, 20, 200, 54, '#ECFEFF', '#0F766E');
      text(svg, 470, 52, 'Rechtsformen', { bold: true, size: 18, color: '#0F766E' });
      // Ebene 2
      const ebene2 = [
        { t: 'Einzelunternehmen', x: 30, w: 190, c: '#FEF3C7', st: '#F59E0B' },
        { t: 'Personengesellschaften', x: 250, w: 220, c: '#FEF3C7', st: '#F59E0B' },
        { t: 'Kapitalgesellschaften', x: 500, w: 210, c: '#FFE4E6', st: '#F97316' },
        { t: 'Misch- / Sonderformen', x: 740, w: 190, c: '#FFE4E6', st: '#F97316' }
      ];
      ebene2.forEach(n => {
        box(rc, svg, n.x, 140, n.w, 50, n.c, n.st);
        text(svg, n.x + n.w / 2, 170, n.t, { bold: true, size: 14, color: n.st });
        arrow(rc, svg, 470, 74, n.x + n.w / 2, 138, '#94A3B8');
      });
      // Ebene 3 (Beispiele)
      const ebene3 = [
        { t: 'e. K.', s: 'unbeschränkte Haftung', x: 30, w: 190 },
        { t: 'GbR · OHG · KG · PartG', s: 'mind. 1 Vollhafter, kein Mindestkapital', x: 250, w: 220 },
        { t: 'GmbH · UG · AG', s: 'juristische Personen, Mindestkapital', x: 500, w: 210 },
        { t: 'GmbH & Co. KG · eG', s: 'Kombination / Förderprinzip', x: 740, w: 190 }
      ];
      ebene3.forEach((n, i) => {
        box(rc, svg, n.x, 250, n.w, 78, '#F8FAFC', '#475569');
        text(svg, n.x + n.w / 2, 282, n.t, { bold: true, size: 14, color: '#0F172A' });
        text(svg, n.x + n.w / 2, 308, n.s, { size: 11, color: '#475569' });
        arrow(rc, svg, ebene2[i].x + ebene2[i].w / 2, 190, n.x + n.w / 2, 248, '#94A3B8');
      });
      text(svg, 470, 385, 'Vergleichskriterien: Haftung · Geschäftsführung · Vertretung · Kapital · Gewinn · Firma · Publizität', { size: 14, bold: true, color: '#0F766E' });
    });
  }
});
