// ── src/utils/theme.js ──
// Handles dark/light mode toggling with localStorage persistence.

(function ThemeModule() {
  const STORAGE_KEY = 'portfolio-theme';
  const html = document.documentElement;
  const sunIcon  = document.getElementById('icon-sun');
  const moonIcon = document.getElementById('icon-moon');

  function applyTheme(theme) {
    if (theme === 'light') {
      html.classList.remove('dark');
      html.classList.add('light');
      if (sunIcon)  sunIcon.classList.remove('hidden');
      if (moonIcon) moonIcon.classList.add('hidden');
    } else {
      html.classList.remove('light');
      html.classList.add('dark');
      if (sunIcon)  sunIcon.classList.add('hidden');
      if (moonIcon) moonIcon.classList.remove('hidden');
    }
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function getPreferred() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark';
  }

  // Init
  applyTheme(getPreferred());

  // Toggle button
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // Expose globally
  window.ThemeModule = { applyTheme, getPreferred };
})();
