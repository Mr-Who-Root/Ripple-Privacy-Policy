/**
 * Ripple sites — theme toggle, footer year, and (on the privacy policy) the TOC
 * scrollspy and the copy-email button. Every part is optional, so the same file
 * works on both sites.
 * Theme follows the system (like the app's Auto theme) until the visitor picks one;
 * the choice is shared by both sites through the same storage key.
 */
document.addEventListener('DOMContentLoaded', () => {
  const KEY = 'ripple_theme';

  const year = document.getElementById('currentYear');
  if (year) year.textContent = new Date().getFullYear();

  // ---- Theme toggle ----
  const toggle = document.getElementById('themeToggle');
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function storedTheme() {
    try {
      const t = localStorage.getItem(KEY);
      return t === 'light' || t === 'dark' ? t : null;
    } catch (e) {
      return null;
    }
  }

  function currentTheme() {
    return storedTheme() || (darkQuery.matches ? 'dark' : 'light');
  }

  function renderToggle(theme) {
    if (!toggle) return;
    toggle.innerHTML = theme === 'light'
      ? '<i class="fa-solid fa-moon" aria-hidden="true"></i>'
      : '<i class="fa-solid fa-sun" aria-hidden="true"></i>';
    toggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
  }

  renderToggle(currentTheme());
  if (darkQuery.addEventListener) {
    darkQuery.addEventListener('change', () => {
      if (!storedTheme()) renderToggle(currentTheme());
    });
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      renderToggle(next);
    });
  }

  // ---- Copy email (privacy policy) ----
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyLabel = document.getElementById('copyFeedback');
  if (copyBtn && copyLabel) {
    const email = copyBtn.getAttribute('data-email');
    const done = () => {
      copyLabel.textContent = 'Copied!';
      setTimeout(() => { copyLabel.textContent = 'Copy'; }, 2000);
    };
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(email);
        done();
      } catch (e) {
        const ta = document.createElement('textarea');
        ta.value = email;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (err) {}
        document.body.removeChild(ta);
      }
    });
  }

  // ---- Scrollspy for the policy's table of contents ----
  const tocLinks = document.querySelectorAll('.toc-link');
  const sections = document.querySelectorAll('.policy-section');
  if (tocLinks.length && sections.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        tocLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      });
    }, { rootMargin: '-100px 0px -60% 0px', threshold: 0 });
    sections.forEach((s) => observer.observe(s));
  }
});
