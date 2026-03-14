// ── src/components/stats/stats.js ──
// Animated statistics counters section.

const StatsComponent = {
  stats: [
    { label: "Years Experience", value: 2.0,  suffix: "+",   icon: "🗓️" },
    { label: "Apps Shipped",     value: 10, suffix: "+",   icon: "📱" },
    { label: "Happy Clients",    value: 10, suffix: "+",   icon: "🤝" },
    { label: "App Ratings",    value: 4.5,  suffix: "+",  icon: "⬇️" },
  ],

  init() {
    this.render();
  },

  render() {
    const grid = document.getElementById('stats-grid');
    if (!grid) return;

    grid.innerHTML = this.stats.map((s, i) => `
      <div class="stat-card text-center p-8 rounded-2xl border border-white/5 bg-surface-800/30 hover:border-brand-400/20 transition-all duration-500"
           data-aos="fade-up" data-aos-delay="${i * 80}">
        <div class="text-3xl mb-3">${s.icon}</div>
        <p class="text-4xl lg:text-5xl font-display font-bold text-brand-400 mb-2"
           data-counter="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</p>
        <p class="text-white/40 font-mono text-sm">${s.label}</p>
      </div>
    `).join('');
  }
};
