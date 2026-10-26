'use strict';
(() => {
  const form = document.querySelector('#waitlist-form');
  if (!form || !window.fetch || !window.FormData || !window.AbortController) return;
  const submit = form.querySelector('button[type="submit"]');
  const label = submit.querySelector('.submit-label');
  const status = document.querySelector('#waitlist-status');
  const success = document.querySelector('#waitlist-success');
  let sending = false;

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    sending = true;
    submit.disabled = true;
    label.textContent = '登録しています…';
    form.setAttribute('aria-busy', 'true');
    status.hidden = true;
    status.textContent = '';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      const body = new FormData(form);
      const params = new URLSearchParams(window.location.search);
      const local = ['localhost', '127.0.0.1', '::1', '[::1]'].includes(window.location.hostname);
      const email = String(body.get('email') || '').trim();
      const knownTest = ['focus-mate-test@example.com', 'focus-mate-production-test@example.com'].includes(email.toLowerCase());
      body.set('email', email);
      // Kept only in Formspree, so QA rows can be excluded from valid registrations.
      body.set('measurement_mode', local || params.get('qa') === '1' || knownTest ? 'qa' : 'live');
      const response = await fetch(form.action, {
        method: 'POST',
        body,
        headers: { Accept: 'application/json' },
        signal: controller.signal
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data || data.ok === false || data.errors?.length) {
        const error = new Error('Submission rejected');
        error.status = response.status;
        throw error;
      }
      // A success message is shown only after the server accepts the registration.
      form.reset();
      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch (error) {
      status.textContent = error.name === 'AbortError'
        ? '通信に時間がかかっています。時間をおいて再度お試しいただくか、Gmailからお問い合わせください。'
        : error.status === 429
          ? '送信が混み合っています。少し時間をおいて、もう一度お試しください。'
          : '登録を確認できませんでした。入力内容と通信環境をご確認のうえ、再度お試しください。うまくいかない場合はGmailからお問い合わせいただけます。';
      status.hidden = false;
    } finally {
      clearTimeout(timeout);
      sending = false;
      submit.disabled = false;
      label.textContent = '案内を受け取る';
      form.removeAttribute('aria-busy');
    }
  });
})();
