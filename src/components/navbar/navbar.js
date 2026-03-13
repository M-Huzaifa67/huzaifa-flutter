// ── src/components/navbar/navbar.js ──
// Handles mobile menu toggle and active nav link highlighting.

const NavbarComponent = {
  init() {
    this.setupMobileMenu();
    this.setupActiveLinks();
    this.setupSmoothScroll();
  },

  setupMobileMenu() {
    const btn  = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
      const isOpen = !menu.classList.contains('hidden');
      menu.classList.toggle('hidden', isOpen);
      btn.classList.toggle('open', !isOpen);
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
        btn.classList.remove('open');
      });
    });
  },

  setupActiveLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(l => {
            l.classList.toggle(
              'text-brand-400',
              l.getAttribute('href') === '#' + entry.target.id
            );
            l.classList.toggle(
              'text-white/60',
              l.getAttribute('href') !== '#' + entry.target.id
            );
          });
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));
  },

  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
};
