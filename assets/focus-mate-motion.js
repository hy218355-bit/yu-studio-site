'use strict';
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  const toggle = document.querySelector('.motion-toggle');
  toggle.hidden = false;
  let userPaused = false;
  const runningAnimations = new Set();
  const canMove = () => !reducedMotion.matches && !userPaused;

  function syncMotion() {
    root.classList.toggle('motion-paused', !canMove());
    toggle.disabled = reducedMotion.matches;
    toggle.setAttribute('aria-pressed', String(!canMove()));
    const label = reducedMotion.matches ? '端末の設定に合わせて動きを停止中' : userPaused ? '動きを再開する' : '動きを止める';
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
    if (!canMove()) runningAnimations.forEach(animation => animation.cancel());
  }
  toggle.addEventListener('click', () => { userPaused = !userPaused; syncMotion(); });
  reducedMotion.addEventListener('change', syncMotion);
  document.addEventListener('visibilitychange', () => root.classList.toggle('page-idle', document.hidden));
  syncMotion();

  function enter(element, distance = 10) {
    if (!element || !canMove() || typeof element.animate !== 'function') return;
    element.getAnimations().forEach(animation => animation.cancel());
    const animation = element.animate([
      { opacity: .35, translate: `0 ${distance}px` },
      { opacity: 1, translate: '0 0' }
    ], { duration: 440, easing: 'cubic-bezier(.2,.75,.25,1)' });
    runningAnimations.add(animation);
    const clear = () => runningAnimations.delete(animation);
    animation.onfinish = clear;
    animation.oncancel = clear;
  }

  // Enhance an already usable page; content stays visible without JavaScript.
  if ('IntersectionObserver' in window) {
    const revealSelector = '.section-label,.memory-copy,.memory-demo,.intro-grid,.experience-item,.companion-heading,.mate-image,.mate-details,.wardrobe-copy>h2,.wardrobe-lead,.item-collage,.wardrobe-visuals>figure,.screens-grid>figure,.faq-heading,.faq-list>details,.early-access>h2';
    const reveals = [...document.querySelectorAll(revealSelector)];
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: '0px 0px -24px 0px' });
    reveals.forEach(element => {
      element.classList.add('reveal');
      if (element.getBoundingClientRect().top < innerHeight) element.classList.add('is-visible');
      revealObserver.observe(element);
    });
    root.classList.add('motion-ready');

    // Decorative motion runs only while its section is on screen.
    const sceneObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      entry.target.classList.toggle('scene-active', entry.isIntersecting);
    }));
    document.querySelectorAll('.hero-a,.memory-section,.companion-section,.wardrobe-section,.early-access').forEach(element => sceneObserver.observe(element));

    const links = [...document.querySelectorAll('.header nav a')];
    const activeSections = new Map();
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? activeSections.set(entry.target.id, entry.boundingClientRect.top) : activeSections.delete(entry.target.id));
      const active = [...activeSections].sort((a, b) => Math.abs(a[1]) - Math.abs(b[1]))[0]?.[0];
      links.forEach(link => {
        if (link.hash === `#${active}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-18% 0px -42% 0px' });
    links.forEach(link => { const section = document.querySelector(link.hash); if (section) navObserver.observe(section); });
  }

  // Native button semantics and existing selection handlers remain in charge.
  let selectedMate = document.querySelector('.companion-stage').dataset.mate;
  let portraitVersion = 0;
  document.querySelectorAll('[data-mate-select]').forEach(button => button.addEventListener('click', () => {
    if (selectedMate === button.dataset.mateSelect) return;
    selectedMate = button.dataset.mateSelect;
    const version = ++portraitVersion;
    const image = document.querySelector('#mate-portrait');
    const show = () => { if (version === portraitVersion) enter(image, 14); };
    if (image.complete) show(); else image.addEventListener('load', show, { once: true });
    enter(document.querySelector('.mate-copy'), 9);
  }));
  let selectedStory = document.querySelector('[data-story][aria-pressed="true"]').dataset.story;
  document.querySelectorAll('[data-story]').forEach(button => button.addEventListener('click', () => {
    if (selectedStory === button.dataset.story) return;
    selectedStory = button.dataset.story;
    enter(document.querySelector('.story-content'), 7);
  }));

  const progress = document.querySelector('.reading-progress');
  let scheduled = false;
  function updateProgress() {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.scale = `${max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0} 1`;
    root.classList.toggle('has-scrolled', scrollY > 24);
    scheduled = false;
  }
  function requestProgress() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateProgress); }
  }
  addEventListener('scroll', requestProgress, { passive: true });
  addEventListener('resize', requestProgress, { passive: true });
  if ('ResizeObserver' in window) new ResizeObserver(requestProgress).observe(document.body);
  updateProgress();
})();
