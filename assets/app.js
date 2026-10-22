// Mobile nav
const burger = document.querySelector('.burger');
const nav = document.querySelector('nav.main');
if (burger) burger.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

// German is the main language (content/*.json). English overrides live in content/en/*.json.
// Contact data (email, social links, portrait) and clients are shared and kept in the German files.
const LANG = document.documentElement.dataset.lang || 'de';
const EN = LANG === 'en';
const ALL = EN ? 'All' : 'Alle';
const get = p => fetch(p).then(r => r.json());
const load = async name => {
  const base = await get(`/content/${name}.json`);
  if (!EN) return base;
  const en = await get(`/content/en/${name}.json`);
  return name === 'site' ? { ...base, ...en } : en;
};

// Site-wide text (name, email, socials)
load('site').then(s => {
  document.querySelectorAll('[data-site]').forEach(el => {
    const v = s[el.dataset.site];
    if (v == null) return;
    if (el.dataset.attr) el.setAttribute(el.dataset.attr, (el.dataset.prefix || '') + v);
    else el.textContent = v;
  });
  const img = document.querySelector('[data-portrait]');
  if (img && s.portrait) { img.innerHTML = `<img src="${esc(s.portrait)}" alt="${EN ? 'Portrait of' : 'Porträt von'} ${esc(s.name)}">`; }
  const mq = document.querySelector('[data-marquee]');
  if (mq && s.marquee) { const items = s.marquee.map(t => `<span>${esc(t)}</span>`).join(''); mq.innerHTML = items + items; }
  const st = document.querySelector('[data-stats]');
  if (st && s.stats) st.innerHTML = s.stats.map(x => `<div class="stat"><strong>${esc(x.value)}</strong><span>${esc(x.label)}</span></div>`).join('');
});

// Services, political communication, process
const svc = document.querySelector('[data-services]');
const pol = document.querySelectorAll('[data-political]');
const steps = document.querySelector('[data-steps]');
if (svc || pol.length || steps) load('services').then(d => {
  if (svc) svc.innerHTML = d.services.map((s, i) => `
    <div class="card tint-${(i % 3) + 1}">
      <div class="num">0${i + 1}</div><h3>${esc(s.title)}</h3><p>${esc(s.description)}</p>
      <ul>${(s.includes || []).map(x => `<li>${esc(x)}</li>`).join('')}</ul>
    </div>`).join('');
  pol.forEach(el => {
    const p = d.political;
    el.innerHTML = `
      <div class="pol-grid">
        <div>
          <span class="eyebrow">${esc(p.title)}</span>
          <h2>${esc(p.headline)}</h2>
          <p class="lead">${esc(p.description)}</p>
          <div class="pills">${(p.audience || []).map(x => `<span>${esc(x)}</span>`).join('')}</div>
          ${el.dataset.cta ? `<div class="row"><a class="btn" href="${esc(el.dataset.cta)}">${esc(el.dataset.ctaLabel || '')}</a></div>` : ''}
        </div>
        <ul class="pol-list">${(p.includes || []).map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      </div>`;
  });
  if (steps) steps.innerHTML = d.process.map((p, i) => `<div class="card"><div class="num">${i + 1}</div><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p></div>`).join('');
});

// Clients (shared between languages)
const cl = document.querySelector('[data-clients]');
if (cl) get('/content/clients.json').then(d => {
  cl.innerHTML = d.clients.map(c => {
    const inner = c.logo ? `<img src="${esc(c.logo)}" alt="${esc(c.name)}" loading="lazy">` : `<span>${esc(c.name)}</span>`;
    return c.link ? `<a class="client" href="${esc(c.link)}" target="_blank" rel="noopener">${inner}</a>` : `<div class="client">${inner}</div>`;
  }).join('');
});

// CV
const tl = document.querySelector('[data-cv]');
if (tl) load('cv').then(d => {
  const block = items => items.map(x => `<div class="item"><div class="when">${esc(x.when)}</div><h3>${esc(x.title)}</h3><div class="org">${esc(x.org)}</div><p>${esc(x.description)}</p></div>`).join('');
  tl.innerHTML = block(d.experience);
  const ed = document.querySelector('[data-edu]'); if (ed) ed.innerHTML = block(d.education);
  const sk = document.querySelector('[data-skills]'); if (sk) sk.innerHTML = d.skills.map(s => `<span>${esc(s)}</span>`).join('');
  const lg = document.querySelector('[data-languages]'); if (lg) lg.innerHTML = d.languages.map(s => `<span>${esc(s)}</span>`).join('');
});

// Portfolio
const grid = document.querySelector('[data-work]');
if (grid) load('portfolio').then(d => {
  const cats = [ALL, ...new Set(d.items.map(i => i.category))];
  const f = document.querySelector('[data-filters]');
  const draw = cat => {
    grid.innerHTML = d.items.filter(i => cat === ALL || i.category === cat).map(i => `
      <article><div class="thumb">${i.image ? `<img src="${esc(i.image)}" alt="${esc(i.title)}" loading="lazy">` : esc(i.client)}</div>
      <div class="body"><span class="tag">${esc(i.category)}</span><h3>${esc(i.title)}</h3>
      <div style="color:var(--muted);font-size:.9rem">${esc(i.client)} · ${esc(i.year)}</div>
      <p>${esc(i.description)}</p>${i.result ? `<p class="result">→ ${esc(i.result)}</p>` : ''}
      ${i.link ? `<a class="more" href="${esc(i.link)}" target="_blank" rel="noopener">${EN ? 'View work' : 'Arbeit ansehen'} ↗</a>` : ''}</div></article>`).join('');
  };
  f.innerHTML = cats.map((c, n) => `<button class="chip${n ? '' : ' on'}" data-cat="${esc(c)}">${esc(c)}</button>`).join('');
  f.addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    f.querySelectorAll('.chip').forEach(x => x.classList.toggle('on', x === b));
    draw(b.dataset.cat);
  });
  draw(ALL);
});
