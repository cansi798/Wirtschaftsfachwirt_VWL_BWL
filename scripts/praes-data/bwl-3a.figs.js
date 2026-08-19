window.addEventListener('load', () => {
  // FIG: Gründungsphasen-Kette (5 Stufen)
  const c1 = document.getElementById('fig-phasen');
  if (c1) {
    const svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg1.setAttribute('viewBox', '0 0 940 300');
    svg1.setAttribute('width', '940'); svg1.setAttribute('height', '300');
    c1.appendChild(svg1);
    makeRough(svg1, (rc, svg) => {
      const phasen = [
        { t: 'Geschäftsidee', s: 'Auslöser', c: '#FFE4E6', st: '#F97316' },
        { t: 'Orientierung', s: 'Selbstprüfung', c: '#FEF3C7', st: '#F59E0B' },
        { t: 'Konzeption', s: 'Businessplan', c: '#ECFEFF', st: '#0F766E' },
        { t: 'Umsetzung', s: 'Start & Formalitäten', c: '#FEF3C7', st: '#F59E0B' },
        { t: 'Festigung', s: 'Konsolidierung', c: '#ECFEFF', st: '#0F766E' }
      ];
      let x = 20;
      phasen.forEach((f, i) => {
        box(rc, svg, x, 100, 150, 100, f.c, f.st);
        text(svg, x + 75, 145, f.t, { bold: true, size: 16, color: f.st });
        text(svg, x + 75, 172, f.s, { size: 12, color: '#475569' });
        if (i < phasen.length - 1) arrow(rc, svg, x + 150, 150, x + 188, 150, '#0F766E');
        x += 188;
      });
      text(svg, 470, 50, 'Die fünf Phasen der Existenzgründung', { size: 18, bold: true, color: '#0F766E' });
      text(svg, 470, 250, 'Übungsband, Übung 46: Reihenfolge sicher können!', { size: 14, color: '#475569' });
    });
  }
});
