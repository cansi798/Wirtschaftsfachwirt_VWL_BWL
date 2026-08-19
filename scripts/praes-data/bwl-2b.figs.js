window.addEventListener('load', () => {
  // FIG: Wertschöpfungskette nach Porter
  const c3 = document.getElementById('fig-wertschoepfung');
  if (c3) {
    const svg3 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg3.setAttribute('viewBox', '0 0 900 360');
    svg3.setAttribute('width', '900'); svg3.setAttribute('height', '360');
    c3.appendChild(svg3);
    makeRough(svg3, (rc, svg) => {
      // Unterstützende Aktivitäten
      const support = ['Unternehmensinfrastruktur (ReWe, Finanzierung, Controlling)', 'Personalwirtschaft', 'Technologieentwicklung', 'Beschaffung'];
      let y = 30;
      support.forEach((s) => {
        box(rc, svg, 40, y, 700, 40, '#FEF3C7', '#F59E0B');
        text(svg, 390, y + 26, s, { size: 14, color: '#B45309', bold: true });
        y += 46;
      });
      text(svg, 810, 120, 'Gewinn-', { size: 14, bold: true, color: '#0F766E' });
      text(svg, 810, 140, 'spanne', { size: 14, bold: true, color: '#0F766E' });
      // Primäre Aktivitäten
      const primar = ['Eingangs-\nlogistik', 'Produktion', 'Ausgangs-\nlogistik', 'Marketing/\nVertrieb', 'Kunden-\ndienst'];
      let x = 40;
      primar.forEach((p, i) => {
        box(rc, svg, x, 230, 128, 80, '#ECFEFF', '#0F766E');
        const lines = p.split('\n');
        lines.forEach((l, j) => {
          text(svg, x + 64, 265 + j * 22 - (lines.length - 1) * 8, l, { bold: true, size: 14, color: '#0F766E' });
        });
        if (i < primar.length - 1) arrow(rc, svg, x + 128, 270, x + 140, 270, '#475569');
        x += 140;
      });
      text(svg, 390, 345, 'primäre Aktivitäten — unmittelbar wertschöpfend', { size: 14, color: '#475569' });
      arrow(rc, svg, 745, 270, 800, 270, '#0F766E');
    });
  }
});
