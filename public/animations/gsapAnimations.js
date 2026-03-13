// ── src/animations/gsapAnimations.js ──
// Hero entrance animations and reusable GSAP sequences.

const GSAPAnimations = {
  init() {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    this.heroEntrance();
    this.scrollProgress();
    this.cursorEffect();
    this.navbarScroll();
  },

  heroEntrance() {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.to('#hero-badge', {
      opacity: 1, y: 0,
      duration: 0.6, ease: 'power3.out'
    })
    .to('#hero-title', {
      opacity: 1, y: 0,
      duration: 0.7, ease: 'power3.out'
    }, '-=0.3')
    .to('#hero-typing', {
      opacity: 1, y: 0,
      duration: 0.5, ease: 'power3.out'
    }, '-=0.4')
    .to('#hero-desc', {
      opacity: 1, y: 0,
      duration: 0.6, ease: 'power3.out'
    }, '-=0.4')
    .to('#hero-ctas', {
      opacity: 1, y: 0,
      duration: 0.6, ease: 'power3.out'
    }, '-=0.3')
    .to('#hero-socials', {
      opacity: 1, y: 0,
      duration: 0.5, ease: 'power3.out'
    }, '-=0.3')
    .to('#hero-image-wrap', {
      opacity: 1, x: 0,
      duration: 0.8, ease: 'power3.out'
    }, '-=0.7');

    // Set initial states
    gsap.set(['#hero-badge','#hero-title','#hero-typing','#hero-desc','#hero-ctas','#hero-socials'], { y: 30 });
    gsap.set('#hero-image-wrap', { x: 50 });
  },

  scrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const scrollTop    = window.scrollY;
      const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
      const pct          = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width    = pct + '%';
    }, { passive: true });
  },

  cursorEffect() {
    const cursor   = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    // Smooth follower
    (function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top  = followerY + 'px';
      requestAnimationFrame(animateFollower);
    })();

    // Scale on hover
    const hoverables = document.querySelectorAll('a, button, [data-hover]');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  },

  navbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    const onScroll = Helpers.debounce(() => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, 10);
    window.addEventListener('scroll', onScroll, { passive: true });
  },

  // Card tilt effect — call on project cards after render
  cardTilt(selector) {
    const cards = document.querySelectorAll(selector);
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect   = card.getBoundingClientRect();
        const x      = e.clientX - rect.left;
        const y      = e.clientY - rect.top;
        const cx     = rect.width / 2;
        const cy     = rect.height / 2;
        const rotateX = ((y - cy) / cy) * -6;
        const rotateY = ((x - cx) / cx) *  6;
        gsap.to(card, {
          rotateX, rotateY,
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 800
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0, rotateY: 0,
          duration: 0.6, ease: 'elastic.out(1, 0.5)'
        });
      });
    });
  }
};
