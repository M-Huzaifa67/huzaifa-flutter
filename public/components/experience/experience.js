// ── src/components/experience/experience.js ──
// Renders the vertical timeline from EXPERIENCE data.

const ExperienceComponent = {
  init() {
    this.render();
  },

  render() {
    const container = document.getElementById('experience-timeline');
    if (!container || typeof EXPERIENCE === 'undefined') return;

    container.innerHTML = `
      <div class="relative pl-10 space-y-6">
        <!-- Vertical line -->
        <div class="absolute left-[19px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-brand-400/40 via-brand-400/20 to-transparent rounded-full"></div>

        ${EXPERIENCE.map((exp, i) => `
          <div class="timeline-item relative" data-aos="fade-up" data-aos-delay="${i * 100}">
            <!-- Dot -->
            <div class="timeline-dot absolute -left-[29px] top-2"></div>

            <!-- Card -->
            <div class="p-6 rounded-2xl border border-white/5 bg-surface-500/10 hover:border-brand-400/20 hover:bg-surface-800/30 transition-all duration-500 group">
              <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    ${exp.logo}
                  </div>
                  <div>
                    <h3 class="font-display font-bold text-white text-base leading-tight">${exp.role}</h3>
                    <p class="text-brand-400 font-mono text-sm mt-0.5">${exp.company}</p>
                  </div>
                </div>
                <div class="flex flex-col items-start sm:items-end gap-1 flex-shrink-0">
                  <span class="text-white/30 text-xs font-mono">${exp.period}</span>
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded-md bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-mono">${exp.duration}</span>
                    <span class="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/40 text-xs font-mono">${exp.type}</span>
                  </div>
                </div>
              </div>

              <p class="text-white/50 text-sm leading-relaxed mb-4">${exp.description}</p>

              <!-- Highlights -->
              <ul class="space-y-1.5 mb-4">
                ${exp.highlights.map(h => `
                  <li class="flex items-start gap-2 text-white/40 text-xs">
                    <span class="text-brand-400 mt-0.5">▸</span>
                    <span>${h}</span>
                  </li>
                `).join('')}
              </ul>

              <!-- Tech Tags -->
              <div class="flex flex-wrap gap-2">
                ${exp.tech.map(t => `
                  <span class="px-2 py-0.5 rounded-md bg-surface-700/50 border border-white/5 text-white/40 text-xs font-mono hover:text-brand-400 hover:border-brand-400/20 transition-colors">${t}</span>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
};
