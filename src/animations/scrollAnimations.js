// ── src/animations/scrollAnimations.js ──
// AOS initialization + GSAP ScrollTrigger based animations.

const ScrollAnimations = {
  init() {
    this.initAOS();
    this.initSkillBars();
    this.initCounters();
    this.initTyping();
  },

  initAOS() {
    if (typeof AOS === 'undefined') return;
    AOS.init({
      duration:   700,
      easing:     'ease-out-cubic',
      once:       true,
      offset:     80,
      delay:      0,
    });
  },

  initSkillBars() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll('.skill-bar-fill');
          fills.forEach(fill => {
            const level = fill.dataset.level || 0;
            setTimeout(() => { fill.style.width = level + '%'; }, 200);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) observer.observe(skillsSection);
  },

  initCounters() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('[data-counter]');
          counters.forEach(el => {
            const end    = parseInt(el.dataset.counter, 10);
            const suffix = el.dataset.suffix || '';
            Helpers.animateCounter(el, end, 2000, suffix);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    const statsSection = document.getElementById('stats');
    if (statsSection) observer.observe(statsSection);
  },

  initTyping() {
    const el = document.getElementById('typing-text');
    if (!el) return;

    const phrases = [
      'Cross-platform apps',
      'Pixel-perfect UIs',
      'clean Architectures',
      'Firebase as Backends',
    ];

    let phraseIdx = 0;
    let charIdx   = 0;
    let deleting  = false;
    let paused    = false;

    function type() {
      if (paused) { setTimeout(type, 1400); paused = false; return; }
      const phrase = phrases[phraseIdx];

      if (deleting) {
        el.textContent = phrase.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting  = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          setTimeout(type, 400);
          return;
        }
        setTimeout(type, 40);
      } else {
        el.textContent = phrase.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === phrase.length) {
          deleting = true;
          paused   = true;
          setTimeout(type, 100);
          return;
        }
        setTimeout(type, 60 + Math.random() * 40);
      }
    }

    setTimeout(type, 1500);
  }
};
