window.addEventListener('load', () => {
  // FIG: Konzern — Mutter, Töchter, Beherrschungsvertrag
  const c2 = document.getElementById('fig-konzern');
  if (c2) {
    const svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg2.setAttribute('viewBox', '0 0 900 340');
    svg2.setAttribute('width', '900'); svg2.setAttribute('height', '340');
    c2.appendChild(svg2);
    makeRough(svg2, (rc, svg) => {
      // Mutter
      box(rc, svg, 330, 30, 240, 80, '#FEF3C7', '#F59E0B');
      text(svg, 450, 62, 'Muttergesellschaft (AG)', { bold: true, size: 16, color: '#B45309' });
      text(svg, 450, 88, 'einheitliche Leitung · Holding möglich', { size: 12, color: '#475569' });
      // Töchter
      const toechter = [
        { x: 60, t: 'Tochter 1 GmbH' },
        { x: 340, t: 'Tochter 2 GmbH' },
        { x: 620, t: 'Tochter 3 AG' }
      ];
      toechter.forEach(tt => {
        box(rc, svg, tt.x, 210, 220, 80, '#ECFEFF', '#0F766E');
        text(svg, tt.x + 110, 244, tt.t, { bold: true, size: 15, color: '#0F766E' });
        text(svg, tt.x + 110, 268, 'rechtlich selbstständig', { size: 12, color: '#475569' });
      });
      // Pfeile Mutter -> Töchter
      arrow(rc, svg, 380, 110, 170, 210, '#F59E0B');
      arrow(rc, svg, 450, 110, 450, 210, '#F59E0B');
      arrow(rc, svg, 520, 110, 730, 210, '#F59E0B');
      text(svg, 250, 150, 'Mehrheitsbeteiligung', { size: 13, bold: true, color: '#B45309' });
      text(svg, 590, 175, 'Beherrschungsvertrag', { size: 13, bold: true, color: '#B45309' });
      text(svg, 450, 165, 'Weisungen', { size: 12, color: '#475569' });
      text(svg, 450, 320, 'wirtschaftliche Selbstständigkeit der Töchter: verloren', { size: 14, bold: true, color: '#EF4444' });
    });
  }

  // FIG: Richtungen — horizontal / vertikal / diagonal (Übung 56)
  const c3 = document.getElementById('fig-richtungen');
  if (c3) {
    const svg3 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg3.setAttribute('viewBox', '0 0 900 380');
    svg3.setAttribute('width', '900'); svg3.setAttribute('height', '380');
    c3.appendChild(svg3);
    makeRough(svg3, (rc, svg) => {
      // vertikale Kette links
      box(rc, svg, 60, 20, 250, 60, '#ECFEFF', '#0F766E');
      text(svg, 185, 55, 'Spülmaschinenhersteller', { bold: true, size: 14, color: '#0F766E' });
      box(rc, svg, 60, 160, 250, 60, '#FEF3C7', '#F59E0B');
      text(svg, 185, 195, 'Großküchenhersteller', { bold: true, size: 15, color: '#B45309' });
      box(rc, svg, 60, 300, 250, 60, '#ECFEFF', '#0F766E');
      text(svg, 185, 335, 'Kantinenbetreiber', { bold: true, size: 14, color: '#0F766E' });
      arrow(rc, svg, 185, 80, 185, 160, '#0F766E');
      arrow(rc, svg, 185, 220, 185, 300, '#0F766E');
      text(svg, 275, 120, 'vertikal (vorgelagert)', { size: 12, bold: true, color: '#0F766E' });
      text(svg, 280, 260, 'vertikal (nachgelagert)', { size: 12, bold: true, color: '#0F766E' });
      // horizontal rechts
      box(rc, svg, 590, 160, 260, 60, '#FEF3C7', '#F59E0B');
      text(svg, 720, 188, 'anderer', { bold: true, size: 13, color: '#B45309' });
      text(svg, 720, 206, 'Großküchenhersteller', { bold: true, size: 13, color: '#B45309' });
      arrow(rc, svg, 310, 190, 590, 190, '#F59E0B');
      text(svg, 450, 175, 'horizontal', { size: 14, bold: true, color: '#B45309' });
      // diagonal
      box(rc, svg, 590, 300, 260, 60, '#FFE4E6', '#EF4444');
      text(svg, 720, 335, 'Geschäftsbank', { bold: true, size: 14, color: '#EF4444' });
      arrow(rc, svg, 310, 210, 590, 315, '#EF4444');
      text(svg, 460, 285, 'diagonal (branchenfremd)', { size: 13, bold: true, color: '#EF4444' });
    });
  }
});
