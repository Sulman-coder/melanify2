/* Optional enhancements. All page content lives in the HTML. */
(() => {
  'use strict';
  document.body.classList.add('is-enhanced');
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Navigation and native dropdowns.
  const menu = $('.menu-toggle');
  const nav = $('#main-nav');
  const closeMenu = () => {
    menu?.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('is-open');
  };
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  $$('.nav-group').forEach(group => group.addEventListener('toggle', () => {
    if (group.open) $$('.nav-group').forEach(other => { if (other !== group) other.open = false; });
  }));
  document.addEventListener('click', event => {
    if (!event.target.closest('.nav-group')) $$('.nav-group').forEach(group => { group.open = false; });
    if (!event.target.closest('.site-header')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    $$('.nav-group').forEach(group => { group.open = false; });
    const wasOpen = menu?.getAttribute('aria-expanded') === 'true';
    closeMenu();
    if (wasOpen) menu.focus();
  });

  // Switch between the six panels already present in index.html.
  const tabs = $$('.pathway-tab');
  const panels = $$('.pathway-panel');
  function selectStage(index, focus = false) {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (focus) tabs[index].focus();
  }
  if (tabs.length) {
    $('.pathway-tabs').setAttribute('role', 'tablist');
    tabs.forEach((tab, index) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', panels[index].id);
      panels[index].setAttribute('role', 'tabpanel');
      panels[index].setAttribute('aria-labelledby', tab.id);
      panels[index].tabIndex = 0;
      tab.addEventListener('click', event => { event.preventDefault(); selectStage(index); });
      tab.addEventListener('keydown', event => {
        const next = { ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1 }[event.key];
        if (next !== undefined) { event.preventDefault(); selectStage(next, true); }
      });
    });
    selectStage(0);
  }

  // Details elements also work when JavaScript is disabled.
  const cycles = $$('.cycle-block');
  const cycleToggle = $('.cycle-toggle');
  const syncCycles = () => {
    if (!cycleToggle) return;
    const allOpen = cycles.every(cycle => cycle.open);
    cycleToggle.setAttribute('aria-expanded', String(allOpen));
    cycleToggle.textContent = allOpen ? 'Collapse all cycles' : 'Expand all cycles';
  };
  cycleToggle?.addEventListener('click', () => {
    const open = cycleToggle.getAttribute('aria-expanded') !== 'true';
    cycles.forEach(cycle => { cycle.open = open; });
    syncCycles();
  });
  cycles.forEach(cycle => cycle.addEventListener('toggle', syncCycles));
  function openAnchor() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    const stage = panels.indexOf(target);
    if (stage >= 0) selectStage(stage);
    let parent = target.closest('details');
    while (parent) { parent.open = true; parent = parent.parentElement.closest('details'); }
    target.classList.remove('reveal-pending');
    target.scrollIntoView({ block: 'start' });
  }
  window.addEventListener('hashchange', openAnchor);
  if (location.hash) requestAnimationFrame(openAnchor);

  // Reveal below-the-fold sections once, without hiding content by default.
  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.remove('reveal-pending'); reveal.unobserve(entry.target); }
    }), { threshold: 0.08 });
    $$('[data-reveal]').forEach(el => {
      if (!motion.matches && el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add('reveal-pending');
        reveal.observe(el);
      }
    });
    const links = $$('.toc a');
    const contents = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) links.forEach(link => {
        const active = link.hash === '#' + entry.target.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
      });
    }), { rootMargin: '-100px 0px -65% 0px' });
    links.forEach(link => { const target = document.getElementById(link.hash.slice(1)); if (target) contents.observe(target); });
  }

  // One animation frame handles the reading bar and gentle ocean parallax.
  const progress = $('.reading-progress');
  const ocean = $('[data-parallax]');
  let scheduled = false;
  function updateScroll() {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    const fraction = available > 0 ? Math.max(0, Math.min(1, window.scrollY / available)) : 0;
    if (progress) progress.style.transform = `scaleX(${fraction})`;
    $('.site-header')?.classList.toggle('is-scrolled', window.scrollY > 24);
    if (ocean) {
      const bounds = ocean.parentElement.getBoundingClientRect();
      const offset = motion.matches ? 0 : Math.max(-24, Math.min(24, (window.innerHeight / 2 - bounds.top - bounds.height / 2) * 0.06));
      ocean.style.setProperty('--parallax-offset', `${offset}px`);
    }
    scheduled = false;
  }
  function scheduleScroll() { if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } }
  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', scheduleScroll);
  window.addEventListener('load', scheduleScroll);
  motion.addEventListener('change', () => {
    if (motion.matches) $$('.reveal-pending').forEach(el => el.classList.remove('reveal-pending'));
    scheduleScroll();
  });
  updateScroll();

  // Without dialog support, figures open as ordinary image links.
  const dialog = $('.figure-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    $$('.figure-open').forEach(link => link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      dialog.querySelector('img').src = link.dataset.image;
      dialog.querySelector('img').alt = link.dataset.alt;
      dialog.showModal();
    }));
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  }
})();
