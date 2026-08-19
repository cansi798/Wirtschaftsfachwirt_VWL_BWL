window.addEventListener('load', () => {
  // FIG: Die drei Säulen des GWB
  const c1 = document.getElementById('fig-gwb');
  if (c1) {
    const svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg1.setAttribute('viewBox', '0 0 900 330');
    svg1.setAttribute('width', '900'); svg1.setAttribute('height', '330');
    c1.appendChild(svg1);
    makeRough(svg1, (rc, svg) => {
      // Dach
      box(rc, svg, 90, 40, 720, 60, '#ECFEFF', '#0F766E');
      text(svg, 450, 78, 'GWB — Gesetz gegen Wettbewerbsbeschränkungen', { bold: true, size: 20, color: '#0F766E' });
      const saeulen = [
        { t: 'Kartellverbot', s: '§ 1 GWB', d: 'Preis-, Submissions-, Gebiets-, Quotenkartelle', c: '#ECFEFF', st: '#0F766E' },
        { t: 'Missbrauchsaufsicht', s: '§§ 19 ff. GWB', d: 'Ausbeutung / Behinderung (Dumping)', c: '#FEF3C7', st: '#F59E0B' },
        { t: 'Fusionskontrolle', s: '§ 35 GWB', d: 'Anzeigepflicht, Untersagung, Ministererlaubnis', c: '#FFE4E6', st: '#F97316' }
      ];
      let x = 90;
      saeulen.forEach((f) => {
        box(rc, svg, x, 130, 220, 130, f.c, f.st);
        text(svg, x + 110, 165, f.t, { bold: true, size: 17, color: f.st });
        text(svg, x + 110, 192, f.s, { bold: true, size: 14, color: '#475569' });
        text(svg, x + 110, 222, f.d, { size: 11.5, color: '#475569' });
        arrow(rc, svg, x + 110, 130, x + 110, 100, f.st);
        x += 250;
      });
      text(svg, 450, 300, 'Aufsicht: Bundeskartellamt · EU: Kommission, Art. 101 AEUV, FKVO', { size: 15, bold: true, color: '#475569' });
    });
  }

  // FIG: Mindestpreis und Höchstpreis im Preis-Mengen-Diagramm
  const c2 = document.getElementById('fig-preiseingriffe');
  if (c2) {
    const svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg2.setAttribute('viewBox', '0 0 900 420');
    svg2.setAttribute('width', '900'); svg2.setAttribute('height', '420');
    c2.appendChild(svg2);
    makeRough(svg2, (rc, svg) => {
      const drawMarket = (ox, title, mode) => {
        const oy = 360, w = 330, h = 280;
        // Achsen
        arrow(rc, svg, ox, oy, ox, oy - h - 15, '#0F172A');
        arrow(rc, svg, ox, oy, ox + w + 15, oy, '#0F172A');
        text(svg, ox + 20, oy - h - 20, 'Preis (p)', { size: 13, bold: true });
        text(svg, ox + w - 10, oy + 25, 'Menge (x)', { size: 13, bold: true });
        text(svg, ox + w / 2, 45, title, { size: 17, bold: true, color: mode === 'min' ? '#0F766E' : '#F97316' });
        // Kurven
        svg.appendChild(rc.line(ox + 30, oy - h + 20, ox + w - 30, oy - 30, { roughness: 1.3, stroke: '#EF4444', strokeWidth: 2 }));
        text(svg, ox + w - 18, oy - 42, 'N', { size: 15, bold: true, color: '#EF4444' });
        svg.appendChild(rc.line(ox + 30, oy - 30, ox + w - 30, oy - h + 20, { roughness: 1.3, stroke: '#0F766E', strokeWidth: 2 }));
        text(svg, ox + w - 18, oy - h + 12, 'A', { size: 15, bold: true, color: '#0F766E' });
        // Gleichgewicht
        const gx = ox + w / 2, gy = oy - h / 2 - 5;
        svg.appendChild(rc.line(ox, gy, gx, gy, { roughness: 0.8, stroke: '#94A3B8', strokeWidth: 1, strokeLineDash: [5, 5] }));
        svg.appendChild(rc.line(gx, gy, gx, oy, { roughness: 0.8, stroke: '#94A3B8', strokeWidth: 1, strokeLineDash: [5, 5] }));
        text(svg, ox - 18, gy + 4, 'p₀', { size: 14, bold: true, color: '#475569' });
        text(svg, gx, oy + 20, 'x₀', { size: 14, bold: true, color: '#475569' });
        // Eingriffspreis
        const py = mode === 'min' ? gy - 60 : gy + 60;
        svg.appendChild(rc.line(ox, py, ox + w, py, { roughness: 1, stroke: '#F59E0B', strokeWidth: 2.4 }));
        text(svg, ox - 18, py + 4, 'p̄', { size: 15, bold: true, color: '#F59E0B' });
        if (mode === 'min') {
          text(svg, ox + w / 2, py - 14, 'Mindestpreis (über p₀)', { size: 13, bold: true, color: '#F59E0B' });
          text(svg, ox + w / 2, oy - 8, 'Angebotsüberschuss: xₙ < x₀ < xₐ', { size: 12.5, color: '#475569' });
        } else {
          text(svg, ox + w / 2, py + 22, 'Höchstpreis (unter p₀)', { size: 13, bold: true, color: '#F59E0B' });
          text(svg, ox + w / 2, oy - h + 40, 'Nachfrageüberschuss: xₐ < x₀ < xₙ', { size: 12.5, color: '#475569' });
        }
      };
      drawMarket(70, 'Mindestpreis — Schutz der Anbieter', 'min');
      drawMarket(510, 'Höchstpreis — Schutz der Nachfrager', 'max');
    });
  }

  // FIG: Magisches Viereck
  const c3 = document.getElementById('fig-viereck');
  if (c3) {
    const svg3 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg3.setAttribute('viewBox', '0 0 900 400');
    svg3.setAttribute('width', '900'); svg3.setAttribute('height', '400');
    c3.appendChild(svg3);
    makeRough(svg3, (rc, svg) => {
      const cx = 450, cy = 205;
      const ecken = [
        { x: cx, y: 55, t: 'Preisniveaustabilität', s: 'Inflationsrate < 2 %', c: '#ECFEFF', st: '#0F766E' },
        { x: cx + 300, y: cy, t: 'Hoher Beschäftigungsstand', s: 'Arbeitslosenquote 3–4 %', c: '#FEF3C7', st: '#F59E0B' },
        { x: cx, y: 355, t: 'Stetiges, angemessenes Wachstum', s: 'reales BIP ø +2 % p. a.', c: '#FFE4E6', st: '#F97316' },
        { x: cx - 300, y: cy, t: 'Außenwirtschaftl. Gleichgewicht', s: 'Außenbeitrag +1–2 % des BIP', c: '#ECFEFF', st: '#0F766E' }
      ];
      // Rautenlinien
      for (let i = 0; i < 4; i++) {
        const a = ecken[i], b = ecken[(i + 1) % 4];
        svg.appendChild(rc.line(a.x, a.y, b.x, b.y, { roughness: 1.4, stroke: '#94A3B8', strokeWidth: 1.6, strokeLineDash: [7, 6] }));
      }
      ecken.forEach((e) => {
        box(rc, svg, e.x - 125, e.y - 32, 250, 64, e.c, e.st);
        text(svg, e.x, e.y - 6, e.t, { bold: true, size: 13.5, color: e.st });
        text(svg, e.x, e.y + 16, e.s, { size: 12, color: '#475569' });
      });
      text(svg, cx, cy - 12, 'Magisches', { bold: true, size: 19, color: '#0F766E' });
      text(svg, cx, cy + 14, 'Viereck (§ 1 StabG)', { bold: true, size: 19, color: '#0F766E' });
    });
  }
});
