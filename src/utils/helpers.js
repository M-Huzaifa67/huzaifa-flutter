// ── src/utils/helpers.js ──
// Shared utility functions used across components.

const Helpers = {
  /**
   * Animate a counter from 0 to target value.
   * @param {HTMLElement} el  - The element to update
   * @param {number}      end - Target number
   * @param {number}      duration - ms
   * @param {string}      suffix - e.g. "+" or "K+"
   */
  animateCounter(el, end, duration = 2000, suffix = '') {
    let start = 0;
    const step = (end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { start = end; clearInterval(timer); }
      el.textContent = Math.floor(start).toLocaleString() + suffix;
    }, 16);
  },

  /**
   * Lazy-load images with IntersectionObserver.
   */
  lazyLoadImages() {
    const imgs = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const img = e.target;
            if (img.dataset.src) { img.src = img.dataset.src; }
            img.classList.add('loaded');
            obs.unobserve(img);
          }
        });
      }, { rootMargin: '200px' });
      imgs.forEach(img => obs.observe(img));
    }
  },

  /**
   * Debounce a function call.
   */
  debounce(fn, delay = 200) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },

  /**
   * Sanitize HTML string to prevent XSS.
   */
  sanitize(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  /**
   * Validate email address.
   */
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  /**
   * Smooth scroll to element.
   */
  scrollTo(selector) {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
