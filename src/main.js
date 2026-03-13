// ── src/main.js ──
// Application entry point — initializes all modules in correct order.

(function App() {
  'use strict';

  function bootstrap() {
    // 1. Render data-driven components first (populate DOM)
    StatsComponent.init();
    SkillsComponent.init();
    ProjectsComponent.init();
    ExperienceComponent.init();
    HeroComponent.init();
    FooterComponent.init();

    // 2. Interactive components
    NavbarComponent.init();
    ContactComponent.init();

    // 3. Animations (after DOM is ready)
    GSAPAnimations.init();
    ScrollAnimations.init();

    // 4. Lenis smooth scroll
    initLenis();

    // 5. Lazy load images
    Helpers.lazyLoadImages();
  }

  function initLenis() {
    if (typeof Lenis === 'undefined') return;
    const lenis = new Lenis({
      duration:  1.2,
      easing:    t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth:    true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Integrate with GSAP ScrollTrigger if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(time => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }

  // DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
