window.addEventListener('load', () => {
  // FIG: Drei Rechnungen der VGR
  const c1 = document.getElementById('fig-vgr');
  if (c1) {
    const svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg1.setAttribute('viewBox', '0 0 900 340');
    svg1.setAttribute('width', '900'); svg1.setAttribute('height', '340');
    c1.appendChild(svg1);
    makeRough(svg1, (rc, svg) => {
      const rechnungen = [
        { t: 'Entstehungsrechnung', s: 'Wo entstanden?', d1: 'Bruttowertschöpfung', d2: '+ Gütersteuern − Gütersubventionen', c: '#ECFEFF', st: '#0F766E' },
        { t: 'Verwendungsrechnung', s: 'Wofür verwendet?', d1: 'Konsum (privat + Staat)', d2: '+ Bruttoinvestitionen + Außenbeitrag', c: '#FEF3C7', st: '#F59E0B' },
        { t: 'Verteilungsrechnung', s: 'An wen verteilt?', d1: 'Arbeitnehmerentgelt + Untern.-/', d2: 'Vermögenseinkommen = Volkseinkommen', c: '#FFE4E6', st: '#F97316' }
      ];
      let x = 60;
      rechnungen.forEach((f) => {
        box(rc, svg, x, 50, 250, 140, f.c, f.st);
        text(svg, x + 125, 85, f.t, { bold: true, size: 16, color: f.st });
        text(svg, x + 125, 112, f.s, { bold: true, size: 13, color: '#475569' });
        text(svg, x + 125, 142, f.d1, { size: 11.5, color: '#475569' });
        text(svg, x + 125, 160, f.d2, { size: 11.5, color: '#475569' });
        arrow(rc, svg, x + 125, 190, x + 125, 235, f.st);
        x += 270;
      });
      box(rc, svg, 300, 240, 300, 60, '#ECFEFF', '#0F766E');
      text(svg, 450, 276, 'BIP — ein Ergebnis', { bold: true, size: 20, color: '#0F766E' });
      text(svg, 450, 325, 'Alle drei Rechnungen führen zum gleichen Bruttoinlandsprodukt (ESVG 2010)', { size: 14, bold: true, color: '#475569' });
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
