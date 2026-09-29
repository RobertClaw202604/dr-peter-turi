/* ============================================================
   app.js — language switching, mobile nav, scroll reveal
   ============================================================ */
(function () {
  'use strict';

  var DEFAULT_LANG = 'en';
  var SUPPORTED = ['en', 'de', 'fr'];

  function detectLang() {
    try {
      var saved = localStorage.getItem('turi-lang');
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
      var nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
      return SUPPORTED.indexOf(nav) !== -1 ? nav : DEFAULT_LANG;
    } catch (e) {
      return DEFAULT_LANG;
    }
  }

  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;
    var dict = (window.I18N && window.I18N[lang]) || {};
    var fallback = (window.I18N && window.I18N[DEFAULT_LANG]) || {};

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = dict[key] != null ? dict[key] : fallback[key];
      if (val == null) return;
      // Preserve nested markup-free replacement (safe: our strings are plain / entity-escaped)
      el.innerHTML = val;
    });

    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-lang', lang);

    document.querySelectorAll('.lang-switch button').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-set-lang') === lang);
    });

    try { localStorage.setItem('turi-lang', lang); } catch (e) { /* ignore */ }
  }

  // ---- language buttons ----
  document.querySelectorAll('.lang-switch button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(btn.getAttribute('data-set-lang'));
    });
  });

  // ---- mobile nav ----
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- active section highlight ----
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.main-nav a'));
  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id;
        navLinks.forEach(function (l) {
          l.style.color = l.getAttribute('href') === '#' + id ? 'var(--gold)' : '';
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }

  // ---- scroll reveal ----
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var revealables = document.querySelectorAll(
      '.exp-card, .timeline li, .pub-col, .section-head, .callout, .hero-card'
    );
    revealables.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
    });
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.style.opacity = '1';
          en.target.style.transform = 'translateY(0)';
          ro.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    revealables.forEach(function (el) { ro.observe(el); });
  }

  // ---- init ----
  applyLang(detectLang());
})();
