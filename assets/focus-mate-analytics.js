'use strict';
(() => {
  // Only this public LP is measured. No form values or identifiers are passed.
  const current = document.currentScript;
  const params = new URLSearchParams(window.location.search);
  const production = window.location.hostname === 'yu-studio-site.hy218355.workers.dev';
  const qa = params.get('qa') === '1';
  const excluded = qa || params.get('analytics') === 'off';
  const token = current?.dataset.siteToken;
  const state = document.documentElement.dataset;
  state.measurementMode = !production ? 'local' : qa ? 'qa' : excluded ? 'off' : 'live';
  if (!production || excluded || !/^[a-f0-9]{32}$/.test(token || '')) return;
  // Honor the browser's own tracking/privacy preference.
  if (navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true) {
    state.measurementMode = 'privacy';
    return;
  }
  if (document.querySelector('script[data-cf-beacon]')) return;
  const beacon = document.createElement('script');
  beacon.type = 'module';
  beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  // Hash navigation and character/story selection must not inflate page views.
  beacon.setAttribute('data-cf-beacon', JSON.stringify({ token, spa: false }));
  document.head.appendChild(beacon);
})();
