// ── src/components/footer/footer.js ──
// Sets current year in footer.

const FooterComponent = {
  init() {
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }
};
