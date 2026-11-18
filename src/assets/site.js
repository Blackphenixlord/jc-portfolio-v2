/* Joshua Collado: site behaviour. Everything here is an enhancement; every
   page reads and works without it. Contact details come from the page
   itself (data attributes rendered from site.js), never from this file. */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const root = document.documentElement;
  const BASE = ($('link[rel="home"]')?.getAttribute('href') || '/').replace(/\/?$/, '/');
  const go = (href) => (/^https?:/.test(href) ? href : BASE + href.replace(/^\//, ''));
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch {} },
  };

  /* Toast: one line, one at a time, announced politely. */
  const toastEl = $('.toast');
  let toastTimer;
  const toast = (msg) => {
    if (!toastEl) return;
    toastEl.textContent = msg;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toastEl.textContent = ''; }, 3200);
  };

  /* Copy, with a fallback for browsers that block the clipboard. */
  const copy = async (text, done = 'Copied') => {
    try {
      await navigator.clipboard.writeText(text);
      toast(done);
    } catch {
      window.prompt('Press Ctrl+C to copy:', text);
    }
  };
  const contactAddress = () => $('[data-contact]')?.dataset.contact || '';
  $$('[data-copy]').forEach((b) => b.addEventListener('click', () => copy(b.dataset.copy, 'Email address copied')));

  /* Mobile menu */
  const menuBtn = $('.menu-btn');
  const nav = $('#site-nav');
  menuBtn?.addEventListener('click', () => {
    const open = menuBtn.getAttribute('aria-expanded') !== 'true';
    menuBtn.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav?.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.focus();
    }
  });

  /* Theme: system → light → dark → system */
  const themeLabel = $$('[data-theme-label]');
  const showTheme = () => themeLabel.forEach((el) => (el.textContent = root.dataset.theme || 'system'));
  const cycleTheme = () => {
    const next = { undefined: 'light', light: 'dark', dark: undefined }[root.dataset.theme];
    if (next) root.dataset.theme = next; else delete root.dataset.theme;
    store.set('theme', next ?? null);
    showTheme();
    toast(`Theme: ${next || 'system'}`);
  };
  showTheme();
  $$('[data-toggle-theme]').forEach((b) => b.addEventListener('click', cycleTheme));

  /* Dyslexia mode */
  const dysBtns = $$('[data-toggle-dys]');
  const showDys = () => dysBtns.forEach((b) => b.setAttribute('aria-pressed', String(root.classList.contains('dys'))));
  const toggleDys = () => {
    const on = root.classList.toggle('dys');
    store.set('dys', on ? '1' : null);
    showDys();
    toast(on ? 'Dyslexia mode on' : 'Dyslexia mode off');
  };
  showDys();
  dysBtns.forEach((b) => b.addEventListener('click', toggleDys));

  /* Print */
  $$('[data-print]').forEach((b) => b.addEventListener('click', () => window.print()));
  if (new URLSearchParams(location.search).get('print') === '1' && $('[data-print]')) {
    window.addEventListener('load', () => setTimeout(() => window.print(), 300));
  }

  /* Ctrl+K search */
  const dlg = $('#cmdk');
  const input = $('#cmdk-q');
  const list = $('#cmdk-list');
  const empty = dlg ? $('.empty', dlg) : null;
  let items = [];
  try { items = JSON.parse($('#cmdk-data')?.textContent || '[]'); } catch {}
  let shown = [];
  let active = 0;
  const actions = {
    'print-resume': () => (location.href = go('/resume/?print=1')),
    'copy-email': () => copy(contactAddress(), 'Email address copied'),
    theme: cycleTheme,
    dys: toggleDys,
    rick: () => (location.href = go('/rick/')),
  };
  const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const mark = () => {
    $$('li', list).forEach((li, i) => li.setAttribute('aria-selected', String(i === active)));
    const el = $(`#cmdk-${active}`);
    el?.scrollIntoView({ block: 'nearest' });
    if (el) input.setAttribute('aria-activedescendant', el.id); else input.removeAttribute('aria-activedescendant');
  };
  const run = (it) => {
    dlg.close();
    if (it.act) actions[it.act]?.();
    else if (it.ext) window.open(it.href, '_blank', 'noopener');
    else location.href = go(it.href);
  };
  const render = () => {
    const q = norm(input.value.trim());
    shown = !q
      ? items
      : items.filter((it) => q.split(/\s+/).every((w) => norm(`${it.t} ${it.g} ${it.k || ''}`).includes(w)));
    if (/^rick ?roll$/.test(q)) shown = [{ t: 'Never gonna give you up', g: 'You asked for it', act: 'rick' }];
    active = Math.min(active, Math.max(shown.length - 1, 0));
    list.innerHTML = '';
    shown.forEach((it, i) => {
      const li = document.createElement('li');
      li.id = `cmdk-${i}`;
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', String(i === active));
      const t = document.createElement('span');
      t.textContent = it.t;
      const g = document.createElement('span');
      g.className = 'grp';
      g.textContent = it.g;
      li.append(t, g);
      li.addEventListener('click', () => run(it));
      li.addEventListener('mousemove', () => { if (active !== i) { active = i; mark(); } });
      list.append(li);
    });
    empty.hidden = shown.length > 0;
    mark();
  };
  const openSearch = () => {
    if (!dlg || dlg.open) return;
    input.value = '';
    active = 0;
    render();
    dlg.showModal();
    input.focus();
  };
  $$('[data-open-search]').forEach((b) => b.addEventListener('click', openSearch));
  input?.addEventListener('input', () => { active = 0; render(); });
  input?.addEventListener('keydown', (e) => {
    const n = Math.max(shown.length, 1);
    if (e.key === 'ArrowDown') { e.preventDefault(); active = (active + 1) % n; mark(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); active = (active - 1 + n) % n; mark(); }
    else if (e.key === 'Enter') { e.preventDefault(); if (shown[active]) run(shown[active]); }
  });
  dlg?.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(); }
  });
  if (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) {
    $$('.search-btn kbd').forEach((el) => (el.textContent = '⌘ K'));
  }

  /* Work filter. State lives in the URL (?d=ai) so Back and shared links work. */
  const table = $('[data-filter-table]');
  const filter = $('[data-filter]');
  if (table && filter) {
    filter.hidden = false;
    const status = $('[data-filter-status]');
    const emptyMsg = $('[data-filter-empty]');
    const labels = Object.fromEntries($$('button', filter).map((b) => [b.dataset.cat, b.textContent]));
    const apply = (cat, push) => {
      if (!labels[cat]) cat = 'all';
      $$('button', filter).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cat === cat)));
      let n = 0;
      $$('tbody tr:not([data-divider])', table).forEach((tr) => {
        const hit = cat === 'all' || tr.dataset.cats.split(' ').includes(cat);
        tr.hidden = !hit;
        if (hit) n++;
      });
      const divider = $('[data-divider]', table);
      if (divider) divider.hidden = !$$('tbody tr.short', table).some((tr) => !tr.hidden);
      emptyMsg.hidden = n > 0;
      table.hidden = n === 0;
      status.textContent = `${n} project${n === 1 ? '' : 's'} shown${cat === 'all' ? '' : ` in ${labels[cat]}`}`;
      if (push) {
        const u = new URL(location.href);
        if (cat === 'all') u.searchParams.delete('d'); else u.searchParams.set('d', cat);
        history.pushState({ cat }, '', u);
      }
    };
    $$('button', filter).forEach((b) => b.addEventListener('click', () => apply(b.dataset.cat, true)));
    $('[data-cat-reset]')?.addEventListener('click', () => { apply('all', true); $('button', filter).focus(); });
    window.addEventListener('popstate', () => apply(new URLSearchParams(location.search).get('d') || 'all', false));
    apply(new URLSearchParams(location.search).get('d') || 'all', false);
  }

  /* Contact form. Validates on submit, then rechecks a field as it's fixed. */
  const form = $('#contact-form');
  if (form) {
    const statusBox = $('.form-status', form);
    const compose = $('#compose');
    const fields = {
      name: { el: $('#f-name'), err: $('#e-name'), check: (v) => (v ? '' : 'Enter your name.') },
      email: {
        el: $('#f-email'), err: $('#e-email'),
        check: (v) => (!v ? 'Enter your email address.' : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'That email address doesn’t look right. It needs an @ and a domain, like you@example.com.'),
      },
      message: {
        el: $('#f-message'), err: $('#e-message'),
        check: (v) => (!v ? 'Write a message.' : v.length < 10 ? 'Add a little more detail: at least 10 characters.' : ''),
      },
    };
    const validate = (f) => {
      const msg = f.check(f.el.value.trim());
      f.err.textContent = msg;
      f.el.setAttribute('aria-invalid', String(Boolean(msg)));
      return !msg;
    };
    Object.values(fields).forEach((f) =>
      f.el.addEventListener('input', () => { if (f.el.getAttribute('aria-invalid') === 'true') validate(f); })
    );
    const say = (msg, kind = 'ok') => { statusBox.dataset.kind = kind; statusBox.textContent = msg; };
    const message = () => {
      const v = (n) => form.elements[n].value.trim();
      return { subject: v('subject') || `Message from ${v('name')}`, body: `${v('message')}\n\n${v('name')}\n${v('email')}` };
    };
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (form.elements.website.value) return; // a bot filled the hidden field
      const bad = Object.values(fields).filter((f) => !validate(f));
      if (bad.length) {
        say(`Fix ${bad.length === 1 ? 'the highlighted field' : `the ${bad.length} highlighted fields`} and send again.`, 'error');
        statusBox.focus();
        return;
      }
      const m = message();
      const { endpoint, key } = form.dataset;
      const to = contactAddress();
      if (!endpoint && !key) {
        $('#compose-text').textContent = `To: ${to}\nSubject: ${m.subject}\n\n${m.body}`;
        const send = $('#compose-send');
        send.href = `${send.getAttribute('href')}?subject=${encodeURIComponent(m.subject)}&body=${encodeURIComponent(m.body)}`;
        form.hidden = true;
        compose.hidden = false;
        compose.focus();
        return;
      }
      const btn = $('button[type="submit"]', form);
      btn.disabled = true;
      btn.textContent = 'Sending…';
      try {
        const data = Object.fromEntries(new FormData(form));
        const res = await fetch(key ? 'https://api.web3forms.com/submit' : endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(key ? { access_key: key, ...data, subject: m.subject } : data),
        });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        say('Message sent. I usually reply within 24 to 48 hours.');
      } catch {
        say('That didn’t go through. Your message is still here: try again, or use the email address on this page.', 'error');
      } finally {
        btn.disabled = false;
        btn.textContent = 'Send message';
        statusBox.focus();
      }
    });
    $('#compose-copy')?.addEventListener('click', () => copy($('#compose-text').textContent, 'Message copied'));
    $('#compose-edit')?.addEventListener('click', () => { compose.hidden = true; form.hidden = false; $('#f-message').focus(); });
  }

  /* Hidden things */
  const konami = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
  let step = 0;
  document.addEventListener('keydown', (e) => {
    if (e.target.closest?.('input, textarea')) return;
    const key = e.key.toLowerCase();
    step = key === konami[step] ? step + 1 : key === konami[0] ? 1 : 0;
    if (step === konami.length) {
      step = 0;
      root.dataset.theme = 'dark';
      showTheme();
      toast('Blueprint mode. Change it back under Reading settings.');
    }
  });
  const eggLogo = $('[data-egg-logo]');
  let clicks = 0;
  let clickTimer;
  eggLogo?.addEventListener('click', () => {
    clicks++;
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => (clicks = 0), 1500);
    if (clicks === 5 && !$('.stamp')) {
      const s = document.createElement('span');
      s.className = 'stamp';
      s.textContent = 'Approved';
      s.setAttribute('aria-hidden', 'true');
      eggLogo.closest('.tb').append(s);
      toast('Drawing approved.');
    }
  });
})();
