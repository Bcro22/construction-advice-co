(() => {
  const menuBtn = document.querySelector('[data-menu]');
  const nav = document.querySelector('[data-nav]');
  if (menuBtn && nav) menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
  document.querySelectorAll('[data-nav] a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));

  document.querySelectorAll('[data-char-limit]').forEach(field => {
    const max = Number(field.dataset.charLimit || 250);
    const counter = document.querySelector(`[data-counter-for="${field.id}"]`);
    const update = () => {
      if (field.value.length > max) field.value = field.value.slice(0,max);
      if (counter) counter.textContent = `${field.value.length} / ${max}`;
    };
    field.addEventListener('input', update); update();
  });

  const cfg = window.CAC_CONFIG || {};
  document.querySelectorAll('[data-config-link]').forEach(el => {
    const key = el.dataset.configLink;
    const url = cfg[key];
    if (url) {
      el.href = url;
      if (/^https?:\/\//.test(url)) el.rel = 'noopener';
    }
  });
})();
