// ── src/components/projects/projects.js ──
// Renders project cards with filtering and tilt animation.

const ProjectsComponent = {
  currentFilter: 'all',

  init() {
    this.render('all');
    this.setupFilters();
  },

  render(filter) {
    const grid = document.getElementById('projects-grid');
    if (!grid || typeof PROJECTS === 'undefined') return;

    const filtered = filter === 'all'
      ? PROJECTS
      : PROJECTS.filter(p => p.category === filter);

    grid.innerHTML = filtered.map((p, i) => `
      <div class="project-card rounded-2xl border border-white/5 bg-surface-500/10 overflow-hidden group cursor-pointer"
           data-aos="fade-up" data-aos-delay="${i * 80}">
        <!-- Screenshot / Preview -->
        <div class="relative overflow-hidden bg-gradient-to-br ${p.gradient} aspect-[16/9] flex items-center justify-center">
          <img src="${p.image}" alt="${p.title}" loading="lazy"
               class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'" />
          <div class="absolute inset-0 hidden items-center justify-center flex-col gap-2">
            <div class="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl border border-white/10">📱</div>
            <span class="text-white/30 text-xs font-mono">screenshot.png</span>
          </div>
          <!-- Overlay links -->
          <div class="absolute inset-0 bg-surface-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener"
              class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-mono hover:bg-brand-500/20 hover:border-brand-400/50 transition-all duration-300"
              onclick="event.stopPropagation()">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              Code
            </a>` : ''}
            ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener"
              class="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500/20 border border-brand-400/30 text-brand-400 text-xs font-mono hover:bg-brand-500/40 transition-all duration-300"
              onclick="event.stopPropagation()">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              Live Demo
            </a>` : ''}
          </div>
          <!-- Year badge -->
          <div class="absolute top-3 right-3 px-2 py-1 rounded-lg bg-surface-900/60 backdrop-blur-sm text-white/40 text-xs font-mono">${p.year}</div>
        </div>

        <!-- Card Content -->
        <div class="p-6">
          <h3 class="font-display font-bold text-white text-base mb-2 group-hover:text-brand-400 transition-colors duration-300">${p.title}</h3>
          <p class="text-white/40 text-sm leading-relaxed mb-4">${p.description}</p>
          <div class="flex flex-wrap gap-2">
            ${p.tags.map(tag => `
              <span class="px-2 py-0.5 rounded-md bg-brand-100/5 border border-brand-500/20 text-brand-400 text-xs font-mono">${tag}</span>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');

    // Re-run AOS for new cards
    if (typeof AOS !== 'undefined') AOS.refresh();

    // Apply tilt after render
    if (typeof GSAPAnimations !== 'undefined') {
      setTimeout(() => GSAPAnimations.cardTilt('.project-card'), 100);
    }
  },

  setupFilters() {
    const filters = document.querySelectorAll('.filter-btn');
    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        this.currentFilter = filter;

        // Update active state
        filters.forEach(b => {
          b.classList.toggle('active', b === btn);
          b.classList.toggle('border-brand-400',    b === btn);
          b.classList.toggle('bg-brand-400/10',     b === btn);
          b.classList.toggle('text-brand-400',      b === btn);
          b.classList.toggle('border-white/10',     b !== btn);
          b.classList.toggle('text-white/40',       b !== btn);
        });

        // Animate out/in
        const grid = document.getElementById('projects-grid');
        if (grid && typeof gsap !== 'undefined') {
          gsap.to(grid, { opacity: 0, y: 10, duration: 0.2, onComplete: () => {
            this.render(filter);
            gsap.to(grid, { opacity: 1, y: 0, duration: 0.3 });
          }});
        } else {
          this.render(filter);
        }
      });
    });
  }
};
