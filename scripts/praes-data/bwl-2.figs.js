window.addEventListener('load', () => {
  // FIG: Die vier Teilgebiete des Rechnungswesens (intern vs. extern)
  const c1 = document.getElementById('fig-rewe');
  if (c1) {
    const svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg1.setAttribute('viewBox', '0 0 900 380');
    svg1.setAttribute('width', '900'); svg1.setAttribute('height', '380');
    c1.appendChild(svg1);
    makeRough(svg1, (rc, svg) => {
      // Wurzel
      box(rc, svg, 330, 30, 240, 60, '#ECFEFF', '#0F766E');
      text(svg, 450, 66, 'Rechnungswesen', { bold: true, size: 20, color: '#0F766E' });
      const felder = [
        { t: 'Buchführung', s1: 'Zeitraumrechnung', s2: 'Jahresabschluss', c: '#FEF3C7', st: '#F59E0B' },
        { t: 'KLR', s1: 'Betriebsabrechnung', s2: 'Kalkulation', c: '#ECFEFF', st: '#0F766E' },
        { t: 'Statistik', s1: 'Vergleichs-', s2: 'rechnung', c: '#ECFEFF', st: '#0F766E' },
        { t: 'Planungsrechnung', s1: 'Vorschau-', s2: 'rechnung', c: '#ECFEFF', st: '#0F766E' }
      ];
      let x = 40;
      felder.forEach((f) => {
        arrow(rc, svg, 450, 90, x + 100, 150, '#475569');
        box(rc, svg, x, 150, 200, 110, f.c, f.st);
        text(svg, x + 100, 185, f.t, { bold: true, size: 16, color: f.st });
        text(svg, x + 100, 212, f.s1, { size: 13, color: '#475569' });
        text(svg, x + 100, 232, f.s2, { size: 13, color: '#475569' });
        x += 210;
      });
      // Klammern extern / intern
      svg.appendChild(rc.line(40, 290, 240, 290, { roughness: 1.2, stroke: '#F59E0B', strokeWidth: 2.4 }));
      text(svg, 140, 320, 'externes ReWe', { bold: true, size: 16, color: '#F59E0B' });
      text(svg, 140, 345, 'gesetzlich (HGB, AO)', { size: 13, color: '#475569' });
      svg.appendChild(rc.line(250, 290, 860, 290, { roughness: 1.2, stroke: '#0F766E', strokeWidth: 2.4 }));
      text(svg, 555, 320, 'internes ReWe', { bold: true, size: 16, color: '#0F766E' });
      text(svg, 555, 345, 'freiwillig, für die Unternehmensführung', { size: 13, color: '#475569' });
    });
  }

  // FIG: Finanzierungsarten — Matrix außen/innen x Eigen-/Fremdkapital
  const c2 = document.getElementById('fig-finanzierung');
  if (c2) {
    const svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg2.setAttribute('viewBox', '0 0 900 420');
    svg2.setAttribute('width', '900'); svg2.setAttribute('height', '420');
    c2.appendChild(svg2);
    makeRough(svg2, (rc, svg) => {
      // Spaltenköpfe
      text(svg, 350, 40, 'Außenfinanzierung', { bold: true, size: 18, color: '#0F172A' });
      text(svg, 350, 60, '(Mittel von außen)', { size: 13, color: '#475569' });
      text(svg, 670, 40, 'Innenfinanzierung', { bold: true, size: 18, color: '#0F172A' });
      text(svg, 670, 60, '(Mittel bleiben im Betrieb)', { size: 13, color: '#475569' });
      // Zeilenköpfe
      text(svg, 90, 140, 'Eigenkapital', { bold: true, size: 17, color: '#0F766E' });
      text(svg, 90, 280, 'Fremdkapital', { bold: true, size: 17, color: '#F59E0B' });
      // Quadranten
      box(rc, svg, 200, 85, 300, 110, '#ECFEFF', '#0F766E');
      text(svg, 350, 120, 'Einlagen / Beteiligung', { bold: true, size: 16, color: '#0F766E' });
      text(svg, 350, 145, 'neuer Gesellschafter,', { size: 13, color: '#475569' });
      text(svg, 350, 165, 'Aktienemission, Venture Capital', { size: 13, color: '#475569' });
      box(rc, svg, 520, 85, 300, 110, '#ECFEFF', '#0F766E');
      text(svg, 670, 120, 'Selbstfinanzierung', { bold: true, size: 16, color: '#0F766E' });
      text(svg, 670, 145, 'Gewinne einbehalten:', { size: 13, color: '#475569' });
      text(svg, 670, 165, 'Rücklagen, stille Reserven', { size: 13, color: '#475569' });
      box(rc, svg, 200, 225, 300, 110, '#FEF3C7', '#F59E0B');
      text(svg, 350, 260, 'Kreditfinanzierung', { bold: true, size: 16, color: '#B45309' });
      text(svg, 350, 285, 'Darlehen, Lieferantenkredit,', { size: 13, color: '#475569' });
      text(svg, 350, 305, 'Anleihen · Leasing, Factoring', { size: 13, color: '#475569' });
      box(rc, svg, 520, 225, 300, 110, '#FEF3C7', '#F59E0B');
      text(svg, 670, 260, 'Rückstellungen', { bold: true, size: 16, color: '#B45309' });
      text(svg, 670, 285, 'z. B. Pensionsrückstellungen', { size: 13, color: '#475569' });
      text(svg, 670, 305, '(bis zur Fälligkeit verfügbar)', { size: 13, color: '#475569' });
      // Kapitalfreisetzung
      box(rc, svg, 200, 355, 620, 50, '#FFE4E6', '#F97316');
      text(svg, 510, 386, 'Kapitalfreisetzung (Innenfinanzierung): Abschreibungsgegenwerte, Vermögensverkauf', { bold: true, size: 14, color: '#C2410C' });
    });
  }

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
