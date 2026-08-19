window.addEventListener('load', () => {
  // FIG: Bindungsintensität Kooperation -> Konzentration (Treppe)
  const c1 = document.getElementById('fig-koopkonz');
  if (c1) {
    const svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg1.setAttribute('viewBox', '0 0 900 260');
    svg1.setAttribute('width', '900'); svg1.setAttribute('height', '260');
    c1.appendChild(svg1);
    makeRough(svg1, (rc, svg) => {
      const stufen = [
        { t: 'ARGE / Konsortium', s: 'befristet, Projekt', c: '#ECFEFF', st: '#0F766E', y: 150 },
        { t: 'IG / Allianz / JV', s: 'dauerhaft, Teilbereiche', c: '#ECFEFF', st: '#0F766E', y: 120 },
        { t: 'Kartell', s: 'Absprache — verboten!', c: '#FFE4E6', st: '#F97316', y: 90 },
        { t: 'Konzern', s: 'einheitliche Leitung', c: '#FEF3C7', st: '#F59E0B', y: 60 },
        { t: 'Fusion / Trust', s: 'Verschmelzung', c: '#FFE4E6', st: '#EF4444', y: 30 }
      ];
      let x = 30;
      stufen.forEach(f => {
        box(rc, svg, x, f.y, 160, 74, f.c, f.st);
        text(svg, x + 80, f.y + 32, f.t, { bold: true, size: 14, color: f.st });
        text(svg, x + 80, f.y + 54, f.s, { size: 11, color: '#475569' });
        x += 172;
      });
      arrow(rc, svg, 40, 245, 860, 245, '#0F172A');
      text(svg, 250, 240, 'Kooperation — Selbstständigkeit bleibt', { size: 13, bold: true, color: '#0F766E' });
      text(svg, 700, 240, 'Konzentration — Selbstständigkeit geht verloren', { size: 13, bold: true, color: '#EF4444' });
      text(svg, 450, 15, 'Bindungsintensität nimmt zu →', { size: 15, bold: true, color: '#0F172A' });
    });
  }
});
