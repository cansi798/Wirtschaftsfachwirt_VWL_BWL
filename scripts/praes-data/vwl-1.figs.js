window.addEventListener('load', () => {
  // FIG: Bedürfnis -> Bedarf -> Nachfrage (Trichter/Kette)
  const c1 = document.getElementById('fig-beduerfnis');
  if (c1) {
    const svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg1.setAttribute('viewBox', '0 0 900 300');
    svg1.setAttribute('width', '900'); svg1.setAttribute('height', '300');
    c1.appendChild(svg1);
    makeRough(svg1, (rc, svg) => {
      const stufen = [
        { t: 'Bedürfnis', s: 'empfundener Mangel', c: '#FFE4E6', st: '#F97316' },
        { t: 'Bedarf', s: 'mit Kaufkraft ausgestattet', c: '#FEF3C7', st: '#F59E0B' },
        { t: 'Nachfrage', s: 'am Markt wirksam', c: '#ECFEFF', st: '#0F766E' }
      ];
      let x = 40;
      stufen.forEach((f, i) => {
        box(rc, svg, x, 90, 220, 110, f.c, f.st);
        text(svg, x + 110, 140, f.t, { bold: true, size: 20, color: f.st });
        text(svg, x + 110, 170, f.s, { size: 14, color: '#475569' });
        if (i < stufen.length - 1) arrow(rc, svg, x + 220, 145, x + 290, 145, '#0F766E');
        x += 290;
      });
      text(svg, 450, 45, 'Nur kaufkräftige, am Markt wirksame Wünsche werden zur Nachfrage', { size: 18, bold: true, color: '#0F766E' });
      text(svg, 450, 250, 'unbegrenzt  ⟶  begrenzt durch Einkommen  ⟶  marktwirksam', { size: 14, color: '#475569' });
    });
  }

  // FIG: Preisbildung — Angebots- und Nachfragekurve mit Gleichgewicht
  const c2 = document.getElementById('fig-preisbildung');
  if (c2) {
    const svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg2.setAttribute('viewBox', '0 0 900 420');
    svg2.setAttribute('width', '900'); svg2.setAttribute('height', '420');
    c2.appendChild(svg2);
    makeRough(svg2, (rc, svg) => {
      const ox = 130, oy = 360, w = 560, h = 300;
      // Achsen
      arrow(rc, svg, ox, oy, ox, oy - h - 20, '#0F172A');
      arrow(rc, svg, ox, oy, ox + w + 20, oy, '#0F172A');
      text(svg, ox - 60, oy - h - 10, 'Preis (p)', { size: 16, bold: true, anchor: 'start' });
      text(svg, ox + w - 20, oy + 30, 'Menge (x)', { size: 16, bold: true });
      // Nachfragekurve (fallend)
      svg.appendChild(rc.line(ox + 40, oy - h + 20, ox + w - 40, oy - 40, { roughness: 1.4, stroke: '#EF4444', strokeWidth: 2.2 }));
      text(svg, ox + w - 20, oy - 55, 'N', { size: 18, bold: true, color: '#EF4444' });
      // Angebotskurve (steigend)
      svg.appendChild(rc.line(ox + 40, oy - 40, ox + w - 40, oy - h + 20, { roughness: 1.4, stroke: '#0F766E', strokeWidth: 2.2 }));
      text(svg, ox + w - 20, oy - h + 10, 'A', { size: 18, bold: true, color: '#0F766E' });
      // Gleichgewicht (Schnittpunkt in der Mitte)
      const gx = ox + w / 2, gy = oy - h / 2 - 10;
      svg.appendChild(rc.circle(gx, gy, 16, { roughness: 1.2, stroke: '#F59E0B', strokeWidth: 2.4, fill: '#FEF3C7', fillStyle: 'solid' }));
      // Hilfslinien
      svg.appendChild(rc.line(ox, gy, gx, gy, { roughness: 0.8, stroke: '#94A3B8', strokeWidth: 1.2, strokeLineDash: [6, 6] }));
      svg.appendChild(rc.line(gx, gy, gx, oy, { roughness: 0.8, stroke: '#94A3B8', strokeWidth: 1.2, strokeLineDash: [6, 6] }));
      text(svg, ox - 30, gy + 5, 'p*', { size: 17, bold: true, color: '#F59E0B' });
      text(svg, gx, oy + 25, 'x*', { size: 17, bold: true, color: '#F59E0B' });
      // Überschuss-Beschriftungen
      text(svg, gx, oy - h + 5, 'Angebotsüberschuss (Preis zu hoch → Preissenkung)', { size: 14, color: '#475569' });
      text(svg, gx, oy - 15, 'Nachfrageüberschuss (Preis zu niedrig → Preiserhöhung)', { size: 14, color: '#475569' });
      text(svg, gx + 120, gy - 25, 'Marktgleichgewicht', { size: 15, bold: true, color: '#F59E0B' });
    });
  }
});
