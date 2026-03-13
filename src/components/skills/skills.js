// ── src/components/skills/skills.js ──
// Dynamically renders skill categories with animated progress bars.

const SkillsComponent = {
  init() {
    this.render();
  },

  render() {
    const container = document.getElementById('skills-container');
    if (!container || typeof SKILLS === 'undefined') return;

    container.innerHTML = SKILLS.map((cat, ci) => `
      <div data-aos="fade-up" data-aos-delay="${ci * 80}" class="skill-category">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-2xl">${cat.icon}</span>
          <h3 class="font-display font-bold text-white text-lg">${cat.category}</h3>
          <div class="flex-1 h-[1px] bg-white/5 ml-2"></div>
        </div>
        <div class="grid md:grid-cols-2 gap-6">
          ${cat.skills.map(skill => `
            <div class="skill-item group">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <span class="text-base">${skill.icon}</span>
                  <span class="text-white/80 text-sm font-display font-medium group-hover:text-white transition-colors">${skill.name}</span>
                </div>
                <span class="text-brand-400 text-xs font-mono font-bold">${skill.level}%</span>
              </div>
              <div class="skill-bar-bg">
                <div class="skill-bar-fill" data-level="${skill.level}"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }
};
