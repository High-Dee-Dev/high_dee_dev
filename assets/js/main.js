/**
 * High Dee Dev — Portfolio JavaScript
 * Author: High Dee Dev
 * Version: 1.0.0
 *
 * Modules:
 *  1. Theme Toggle
 *  2. Navbar scroll behaviour
 *  3. Mobile nav
 *  4. Typewriter effect
 *  5. Scroll reveal animations
 *  6. Skill bar animations
 *  7. Project filtering
 *  8. Interactive terminal
 *  9. Contribution grid generator
 * 10. Contact form (AJAX)
 * 11. Custom cursor
 * 12. Back-to-top button
 * 13. Smooth active nav links
 */

'use strict';

/* ── DOM ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initMobileNav();
  initTypewriter();
  initScrollReveal();
  initSkillBars();
  initProjectFilter();
  initTerminal();
  initContributionGrid();
  initContactForm();
  initCursor();
  initBackToTop();
  initSmoothNav();
});

/* ================================================================
   1. THEME TOGGLE
   ================================================================ */
function initTheme() {
  const btn    = document.getElementById('theme-toggle');
  const knob   = btn ? btn.querySelector('.toggle-knob') : null;
  const stored = localStorage.getItem('hdd-theme') || 'dark';

  applyTheme(stored);

  if (btn) {
    btn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('hdd-theme', next);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (knob) knob.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
  }
}

/* ================================================================
   2. NAVBAR SCROLL BEHAVIOUR
   ================================================================ */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  const handler = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', handler, { passive: true });
  handler();
}

/* ================================================================
   3. MOBILE NAV
   ================================================================ */
function initMobileNav() {
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('nav-mobile');
  const closeBtn  = document.getElementById('nav-mobile-close');

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
  closeBtn && closeBtn.addEventListener('click', () => mobileNav.classList.remove('open'));

  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
  });

  mobileNav.style.zIndex = 9999;
}

/* ================================================================
   4. TYPEWRITER EFFECT
   ================================================================ */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'Full-Stack Web Developer',
    'Laravel Specialist',
    'UI / UX Enthusiast',
    'Problem Solver',
    'Open Source Contributor',
  ];

  let phrase = 0, char = 0, deleting = false;

  function tick() {
    const current = phrases[phrase];
    el.textContent = deleting ? current.slice(0, char--) : current.slice(0, char++);

    let delay = deleting ? 45 : 85;

    if (!deleting && char > current.length) {
      delay = 2200;
      deleting = true;
    } else if (deleting && char < 0) {
      deleting = false;
      phrase = (phrase + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(tick, delay);
  }

  tick();
}

/* ================================================================
   5. SCROLL REVEAL ANIMATIONS
   ================================================================ */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach(el => observer.observe(el));
}

/* ================================================================
   6. SKILL BAR ANIMATIONS
   ================================================================ */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.pct + '%';
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  bars.forEach(bar => observer.observe(bar));
}

/* ================================================================
   7. PROJECT FILTERING
   ================================================================ */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.project-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let visible = 0;

      cards.forEach(card => {
        const tags = card.dataset.tags || '';
        const show = filter === 'all' || tags.includes(filter);
        card.classList.toggle('hidden', !show);
        if (show) {
          visible++;
          // Stagger re-appear animation
          card.style.animationDelay = `${visible * 0.07}s`;
        }
      });
    });
  });
}

/* ================================================================
   8. INTERACTIVE TERMINAL
   ================================================================ */
function initTerminal() {
  const body  = document.getElementById('terminal-body');
  const input = document.getElementById('terminal-input');
  const clearBtn = document.getElementById('terminal-clear');
  if (!body || !input) return;

  const commands = {
    help: () => [
      { text: 'Available commands:', cls: 'highlight' },
      { text: '' },
      { text: '  help         Show this list', cls: '' },
      { text: '  whoami       About High Dee Dev', cls: '' },
      { text: '  skills       List tech skills', cls: '' },
      { text: '  projects     Featured projects', cls: '' },
      { text: '  experience   Work experience', cls: '' },
      { text: '  contact      Get in touch', cls: '' },
      { text: '  philosophy   Development philosophy', cls: '' },
      { text: '  clear        Clear terminal', cls: '' },
      { text: '' },
      { text: 'Tip: Try typing any command!', cls: 'amber' },
    ],

    whoami: () => [
      { text: '┌──────────────────────────────────────┐', cls: 'highlight' },
      { text: '│ &nbsp; &nbsp; &nbsp; &nbsp; HIGH DEE DEV &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;│', cls: 'highlight' },
      { text: '└──────────────────────────────────────┘', cls: 'highlight' },
      { text: '' },
      { text: 'Role       : Full-Stack Web Developer', cls: '' },
      { text: 'Experience : 4+ years', cls: '' },
      { text: 'Focus      : Practical, scalable web solutions', cls: '' },
      { text: 'Location   : Available Remotely <i class="fa-solid fa-globe"></i>', cls: '' },
      { text: 'Status     : Open to opportunities', cls: 'success' },
    ],

    skills: () => [
      { text: 'Technical Skills', cls: 'highlight' },
      { text: '' },
      { text: '[ Frontend ]', cls: 'amber' },
      { text: '  HTML5 ████████████████████ 95%', cls: '' },
      { text: '  CSS3  ████████████████████ 92%', cls: '' },
      { text: '  JS    ██████████████████   88%', cls: '' },
      { text: '  Bootstrap ████████████████ 90%', cls: '' },
      { text: '  Ajax  ██████████████████   85%', cls: '' },
      { text: '' },
      { text: '[ Backend ]', cls: 'amber' },
      { text: '  PHP      ██████████████████ 87%', cls: '' },
      { text: '  Laravel  ████████████████   90%', cls: '' },
      { text: '' },
      { text: '[ Database ]', cls: 'amber' },
      { text: '  MySQL  █████████████████    83%', cls: '' },
      { text: '' },
      { text: '[ Tools ]', cls: 'amber' },
      { text: '  Git / GitHub ████████████   88%', cls: '' },
    ],

    projects: () => [
      { text: 'Featured Projects', cls: 'highlight' },
      { text: '' },
      { text: '01. Smart Inventory System', cls: 'amber' },
      { text: '    Laravel · MySQL · Ajax · Bootstrap', cls: '' },
      { text: '    Real-time inventory management with role-based access', cls: '' },
      { text: '' },
      { text: '02. Task Flow App', cls: 'amber' },
      { text: '    PHP · JavaScript · MySQL · CSS3', cls: '' },
      { text: '    Collaborative task management platform', cls: '' },
      { text: '' },
      { text: '03. E-Commerce Storefront', cls: 'amber' },
      { text: '    Laravel · MySQL · Bootstrap · Ajax', cls: '' },
      { text: '    Full-featured online store with payment integration', cls: '' },
      { text: '' },
      { text: 'Run `contact` to discuss a project!', cls: 'success' },
    ],

    experience: () => [
      { text: 'Work Experience', cls: 'highlight' },
      { text: '' },
      { text: '2020 – Present  · Full-Stack Web Developer', cls: 'amber' },
      { text: '  → Built 15+ web applications from scratch', cls: '' },
      { text: '  → Delivered Laravel + MySQL backend systems', cls: '' },
      { text: '  → Integrated third-party APIs & payment gateways', cls: '' },
      { text: '  → Mentored junior developers', cls: '' },
      { text: '' },
      { text: 'Total: 4+ years of hands-on experience', cls: 'success' },
    ],

    contact: () => [
      { text: 'Contact Information', cls: 'highlight' },
      { text: '' },
      { text: '  GitHub   : github.com/High-Dee-Dev/', cls: '' },
      { text: '  LinkedIn : linkedin.com/in/highdeedev', cls: '' },
      { text: '  Email    : high.dee.dev@gmail.com', cls: '' },
      { text: '' },
      { text: 'Or scroll down to the Contact section!', cls: 'success' },
    ],

    philosophy: () => [
      { text: '"Write code that solves problems,', cls: 'highlight' },
      { text: ' not code that impresses compilers."', cls: 'highlight' },
      { text: '' },
      { text: '  → Clean, readable, maintainable code always wins', cls: '' },
      { text: '  → Ship fast, iterate often', cls: '' },
      { text: '  → Performance is a feature', cls: '' },
      { text: '  → Security is never an afterthought', cls: '' },
      { text: '  → Document as you build', cls: '' },
    ],

    clear: () => { body.innerHTML = ''; printWelcome(); return []; },
  };

  /* Print welcome message on load */
  printWelcome();

  function printWelcome() {
    printLines([
      { text: '██╗░░██╗██╗░██████╗░██╗░░██╗██████╗░███████╗███████╗██████╗░███████╗██╗░░░██╗', cls: 'highlight' },
      { text: '██║░░██║██║██╔════╝░██║░░██║██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██║░░░██║', cls: 'highlight' },
      { text: '███████║██║██║░░██╗░███████║██║░░██║█████╗░░█████╗░░██║░░██║█████╗░░██║░░░██║', cls: 'highlight' },
      { text: '██╔══██║██║██║░░╚██╗██╔══██║██║░░██║██╔══╝░░██╔══╝░░██║░░██║██╔══╝░░╚██╗░██╔╝', cls: 'highlight' },
      { text: '██║░░██║██║╚██████╔╝██║░░██║██████╔╝███████╗███████╗██████╔╝███████╗░╚████╔╝░', cls: 'highlight' },
      { text: '╚═╝░░╚═╝╚═╝░╚═════╝░╚═╝░░╚═╝╚═════╝░╚══════╝╚══════╝╚═════╝░╚══════╝░░╚═══╝░░', cls: 'highlight' },
      { text: '' },
      { text: 'Welcome to the interactive terminal! Type `help` to explore.', cls: 'success' },
      { text: '' },
    ]);
  }

  function printLines(lines) {
    lines.forEach(({ text, cls }) => {
      if (text === '') { const b = document.createElement('div'); b.className = 't-blank'; body.appendChild(b); return; }
      const div = document.createElement('div');
      div.className = 't-output' + (cls ? ' ' + cls : '');
      div.innerHTML = text;
      body.appendChild(div);
    });
    body.scrollTop = body.scrollHeight;
  }

  function printPromptLine(cmd) {
    const div = document.createElement('div');
    div.className = 't-line';
    div.innerHTML = `<span class="t-prompt"><span class="t-at">visitor</span>@<span class="t-at">HighDeeDev</span><span class="t-path"> ~ $</span></span> ${escapeHtml(cmd)}`;
    body.appendChild(div);
  }

  function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  /* Handle input */
  input.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const cmd = input.value.trim().toLowerCase();
    input.value = '';
    if (!cmd) return;

    printPromptLine(cmd);

    const handler = commands[cmd];
    if (handler) {
      const lines = handler();
      if (lines && lines.length) printLines(lines);
    } else {
      printLines([
        { text: `command not found: ${cmd}. Type 'help' for available commands.`, cls: 'error' },
      ]);
    }
    body.scrollTop = body.scrollHeight;
  });

  /* Clear button */
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      body.innerHTML = '';
      printWelcome();
    });
  }

  /* Focus on click */
  document.getElementById('terminal-window') &&
    document.getElementById('terminal-window').addEventListener('click', () => input.focus());
}

/* ================================================================
   9. CONTRIBUTION GRID
   ================================================================ */
function initContributionGrid() {
  const grid = document.getElementById('contribution-grid');
  if (!grid) return;

  /* Seeded pseudo-random contribution data for 52 weeks × 7 days */
  const total = 52 * 7;
  const weights = [0, 0, 0, 0, 1, 1, 1, 2, 2, 3, 4]; // distribution

  for (let i = 0; i < total; i++) {
    const day = document.createElement('div');
    day.className = 'contrib-day';
    // Create realistic-looking activity clusters
    const seed = Math.sin(i * 9301 + 49297) * 0.5 + 0.5;
    const level = Math.floor(seed * weights.length) < weights.length
      ? weights[Math.floor(seed * weights.length)]
      : 0;
    if (level > 0) day.setAttribute('data-level', level);
    day.title = `${level * 2 + Math.floor(seed * 3)} contributions`;
    grid.appendChild(day);
  }
}

/* ================================================================
   10. CONTACT FORM (AJAX)
   ================================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('.form-submit');
    const original = btn.textContent;

    /* Loading state */
    btn.textContent = 'Preparing Email...';
    btn.disabled = true;

    /* Collect data */
    const name = form.querySelector('[name="name"]').value;
    const email = form.querySelector('[name="email"]').value;
    const subject = form.querySelector('[name="subject"]').value;
    const message = form.querySelector('[name="message"]').value;

    /* Build email body */
    const body =
`Name: ${name}
Email: ${email}

Message:
${message}`;

    /* Encode for URL */
    const mailtoLink =
`mailto:high.dee.dev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    /* Open email client */
    window.location.href = mailtoLink;

    form.reset();

    btn.textContent = original;
    btn.disabled = false;

    if (typeof showToast === 'function') {
      showToast('Opening your email client...', 'success');
    }
  });
}

/* Show toast notification */
function showToast(msg, type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span class="toast-icon">${type === 'success' ? '✓' : '✕'}</span> ${msg}`;
  toast.className = `toast ${type}`;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* ================================================================
   11. CUSTOM CURSOR DOT
   ================================================================ */
function initCursor() {
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(dot);

  document.addEventListener('mousemove', e => {
    dot.style.left = e.clientX + 'px';
    dot.style.top  = e.clientY + 'px';
  });
}

/* ================================================================
   12. BACK TO TOP
   ================================================================ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ================================================================
   13. SMOOTH ACTIVE NAV LINKS
   ================================================================ */
function initSmoothNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navLinks.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );

  sections.forEach(s => observer.observe(s));
}
