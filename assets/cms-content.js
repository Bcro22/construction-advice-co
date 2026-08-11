(() => {
  const CONTENT_URL = '/content/site.json';

  const get = (obj, path) => {
    if (!path) return undefined;
    return path.split('.').reduce((acc, part) => {
      if (acc == null) return undefined;
      const key = /^\d+$/.test(part) ? Number(part) : part;
      return acc[key];
    }, obj);
  };

  const setText = (el, value) => {
    if (el && value !== undefined && value !== null) el.textContent = value;
  };

  const setHref = (el, value) => {
    if (el && value) {
      el.setAttribute('href', value);
      if (/^https?:\/\//i.test(value)) el.setAttribute('rel', 'noopener');
    }
  };

  const serviceData = (content, key) => {
    if (key === 'freeQuestion') return content.servicesPage?.freeQuestion;
    return content.home?.services?.[key];
  };

  function applyGeneric(content) {
    document.querySelectorAll('[data-cms]').forEach(el => {
      setText(el, get(content, el.dataset.cms));
    });

    document.querySelectorAll('[data-cms-text]').forEach(el => {
      setText(el, get(content, el.dataset.cmsText));
    });

    document.querySelectorAll('[data-cms-href]').forEach(el => {
      setHref(el, get(content, el.dataset.cmsHref));
    });

    document.querySelectorAll('[data-cms-email]').forEach(el => {
      const value = get(content, el.dataset.cmsEmail);
      if (value) {
        el.textContent = value;
        el.href = `mailto:${value}`;
      }
    });

    document.querySelectorAll('[data-cms-tail]').forEach(el => {
      const value = get(content, el.dataset.cmsTail);
      if (value == null) return;
      const strong = el.querySelector('strong');
      if (strong) {
        const strongClone = strong.cloneNode(true);
        el.replaceChildren(strongClone, document.createTextNode(` ${value}`));
      } else {
        el.textContent = value;
      }
    });
  }

  function applyIntegrationLinks(content) {
    const links = content.global?.integrations || {};
    document.querySelectorAll('[data-config-link]').forEach(el => {
      const value = links[el.dataset.configLink];
      if (value) setHref(el, value);
    });
  }

  function applySpecialHtml(content) {
    const heroTitle = document.querySelector('[data-cms-html="home.hero.title"]');
    if (heroTitle) {
      const h = content.home?.hero;
      if (h) heroTitle.innerHTML = `${escapeHtml(h.title1 || '')}<br><span>${escapeHtml(h.title2 || '')}</span>`;
    }

    const expTitle = document.querySelector('[data-cms-html="home.experience.title"]');
    if (expTitle) {
      const e = content.home?.experience;
      if (e) expTitle.innerHTML = `${escapeHtml(e.title1 || '')} <span>${escapeHtml(e.title2 || '')}</span>`;
    }
  }

  function applyVisibility(content) {
    const visibility = content.home?.visibility || {};
    document.querySelectorAll('[data-cms-section]').forEach(section => {
      const key = section.dataset.cmsSection;
      section.hidden = visibility[key] === false;
    });
  }

  function applyServices(content) {
    document.querySelectorAll('[data-service-key]').forEach(block => {
      const key = block.dataset.serviceKey;
      const service = serviceData(content, key);
      if (!service) return;

      block.querySelectorAll('[data-service-field]').forEach(el => {
        const field = el.dataset.serviceField;
        setText(el, service[field]);
      });

      block.querySelectorAll('[data-service-field-text]').forEach(el => {
        setText(el, service[el.dataset.serviceFieldText]);
      });

      block.querySelectorAll('[data-service-field-href]').forEach(el => {
        setHref(el, service[el.dataset.serviceFieldHref]);
      });

      block.querySelectorAll('[data-service-bullet]').forEach(el => {
        const index = Number(el.dataset.serviceBullet);
        setText(el, service.bullets?.[index]);
      });

      const badge = block.querySelector('[data-service-field="badge"]');
      if (badge) badge.style.display = service.badge ? '' : 'none';
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  async function init() {
    try {
      const response = await fetch(`${CONTENT_URL}?v=${Date.now()}`, { cache: 'no-store' });
      if (!response.ok) return;
      const content = await response.json();
      window.CAC_CONTENT = content;
      applyGeneric(content);
      applySpecialHtml(content);
      applyServices(content);
      applyVisibility(content);
      applyIntegrationLinks(content);
    } catch (error) {
      console.warn('CMS content could not be loaded. Falling back to built-in page content.', error);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
