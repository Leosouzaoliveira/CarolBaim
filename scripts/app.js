import {
  CLINIC_INFO,
  PROTOCOL_CATEGORIES,
  PROTOCOLS,
  RESULT_CATEGORIES,
  BEFORE_AFTER_RESULTS,
  GOOGLE_REVIEW_TOPICS,
  TESTIMONIALS,
  FAQ_ITEMS,
} from './protocols.js';

const WHATSAPP_BASE = `https://wa.me/${CLINIC_INFO.whatsappNumber}`;

function buildWhatsAppUrl(message) {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

/* ==========================================================================
   M3 Ripple Effect
   ========================================================================== */
function attachRipples(root = document) {
  root.addEventListener('pointerdown', (event) => {
    const target = event.target.closest('[data-ripple]');
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const wave = document.createElement('span');
    wave.className = 'm3-ripple-wave';
    wave.style.width = `${size}px`;
    wave.style.height = `${size}px`;
    wave.style.left = `${event.clientX - rect.left - size / 2}px`;
    wave.style.top = `${event.clientY - rect.top - size / 2}px`;
    target.appendChild(wave);
    wave.addEventListener('animationend', () => wave.remove(), { once: true });
  });
}

/* ==========================================================================
   M3 Snackbar Notification
   ========================================================================== */
let snackbarTimer = null;
function showSnackbar(message) {
  const snackbar = document.getElementById('m3-snackbar');
  const label = document.getElementById('m3-snackbar-text');
  if (!snackbar || !label) return;

  label.textContent = message;
  snackbar.classList.add('is-visible');
  clearTimeout(snackbarTimer);
  snackbarTimer = setTimeout(() => {
    snackbar.classList.remove('is-visible');
  }, 3200);
}

/* ==========================================================================
   Live São Paulo Clinic Hours Status
   ========================================================================== */
function getClinicLiveStatus() {
  const nowSP = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })
  );
  const day = nowSP.getDay();
  const minutesNow = nowSP.getHours() * 60 + nowSP.getMinutes();
  const todayInfo = CLINIC_INFO.hours.find((h) => h.dayIndex === day);

  if (todayInfo && todayInfo.open && todayInfo.close) {
    const [oh, om] = todayInfo.open.split(':').map(Number);
    const [ch, cm] = todayInfo.close.split(':').map(Number);
    const openMin = oh * 60 + om;
    const closeMin = ch * 60 + cm;

    if (minutesNow >= openMin && minutesNow < closeMin) {
      return {
        isOpen: true,
        text: `Aberto agora · Até ${todayInfo.close}`,
        todayIndex: day,
      };
    }
    if (minutesNow < openMin) {
      return {
        isOpen: false,
        text: `Abre hoje às ${todayInfo.open}`,
        todayIndex: day,
      };
    }
  }

  return {
    isOpen: false,
    text: 'Atendimento Ter–Sex (09h–19h) · Sáb (09h–18h)',
    todayIndex: day,
  };
}

function renderHoursAndStatus() {
  const status = getClinicLiveStatus();
  const statusDot = document.getElementById('hero-status-dot');
  const statusText = document.getElementById('hero-status-text');

  if (statusDot && statusText) {
    statusDot.classList.toggle('is-closed', !status.isOpen);
    statusText.textContent = status.text;
  }

  const hoursList = document.getElementById('clinic-hours-list');
  if (hoursList) {
    hoursList.innerHTML = CLINIC_INFO.hours
      .map(
        (h) => `
        <li class="${h.dayIndex === status.todayIndex ? 'is-today' : ''}">
          <span>${h.day}${h.dayIndex === status.todayIndex ? ' (Hoje)' : ''}</span>
          <span>${h.label}</span>
        </li>`
      )
      .join('');
  }
}

/* ==========================================================================
   GTC Clinic Inspired M3 Editorial Carousel Controller
   ========================================================================== */
const carouselControllers = {};

function syncCarouselUI(prefix) {
  const ctrl = carouselControllers[prefix];
  if (!ctrl) return;
  const { track, prevBtn, nextBtn, counterEl, progressEl, dotsEl } = ctrl;
  const cards = Array.from(track.children);
  const total = cards.length;
  if (!total) return;

  const firstCard = cards[0];
  const step = firstCard ? firstCard.offsetWidth + 20 : 340;
  const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
  const rawIdx = step > 0 ? Math.round(track.scrollLeft / step) : 0;
  const activeIdx = Math.min(total - 1, Math.max(0, rawIdx));

  const pad2 = (n) => String(n).padStart(2, '0');
  if (counterEl) {
    counterEl.textContent = `${pad2(activeIdx + 1)} / ${pad2(total)}`;
  }

  if (prevBtn) {
    prevBtn.disabled = track.scrollLeft <= 6;
  }
  if (nextBtn) {
    nextBtn.disabled = maxScroll <= 6 || track.scrollLeft >= maxScroll - 6;
  }

  if (progressEl) {
    const ratio = maxScroll > 6 ? Math.min(1, Math.max(0, track.scrollLeft / maxScroll)) : 1;
    const minW = Math.max(16, Math.round(100 / total));
    const widthPct = minW + ratio * (100 - minW);
    progressEl.style.width = `${widthPct}%`;
  }

  if (dotsEl) {
    if (dotsEl.children.length !== total) {
      dotsEl.innerHTML = cards
        .map(
          (_, i) => `
          <button
            type="button"
            class="cb-carousel__dot ${i === activeIdx ? 'is-active' : ''}"
            aria-label="Ir para o item ${i + 1}"
            data-index="${i}"
          ></button>`
        )
        .join('');
      dotsEl.querySelectorAll('.cb-carousel__dot').forEach((dot) => {
        dot.addEventListener('click', () => {
          const idx = Number(dot.dataset.index);
          const targetCard = cards[idx];
          if (targetCard) {
            track.scrollTo({ left: targetCard.offsetLeft - track.offsetLeft, behavior: 'smooth' });
          }
        });
      });
    } else {
      Array.from(dotsEl.children).forEach((dot, i) => {
        dot.classList.toggle('is-active', i === activeIdx);
      });
    }
  }
}

function initCarouselController(prefix, trackId) {
  const track = document.getElementById(trackId);
  if (!track) return;
  const prevBtn = document.getElementById(`${prefix}-prev`);
  const nextBtn = document.getElementById(`${prefix}-next`);
  const counterEl = document.getElementById(`${prefix}-counter`);
  const progressEl = document.getElementById(`${prefix}-progress`);
  const dotsEl = document.getElementById(`${prefix}-dots`);

  carouselControllers[prefix] = {
    track,
    prevBtn,
    nextBtn,
    counterEl,
    progressEl,
    dotsEl,
    wasDragged: false,
  };

  const scrollByCard = (dir) => {
    const first = track.children[0];
    const step = first ? first.offsetWidth + 20 : 340;
    track.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  prevBtn?.addEventListener('click', () => scrollByCard(-1));
  nextBtn?.addEventListener('click', () => scrollByCard(1));

  track.addEventListener('scroll', () => syncCarouselUI(prefix), { passive: true });
  window.addEventListener('resize', () => syncCarouselUI(prefix), { passive: true });

  // Desktop mouse drag-to-scroll support
  let isDown = false;
  let startX = 0;
  let startScrollLeft = 0;

  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    isDown = true;
    carouselControllers[prefix].wasDragged = false;
    startX = e.pageX;
    startScrollLeft = track.scrollLeft;
    track.style.scrollSnapType = 'none';
    track.style.scrollBehavior = 'auto';
  });

  window.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    const dx = e.pageX - startX;
    if (Math.abs(dx) > 8) {
      carouselControllers[prefix].wasDragged = true;
    }
    track.scrollLeft = startScrollLeft - dx;
  });

  window.addEventListener('pointerup', () => {
    if (!isDown) return;
    isDown = false;
    track.style.scrollSnapType = 'x mandatory';
    track.style.scrollBehavior = 'smooth';
    setTimeout(() => {
      if (carouselControllers[prefix]) {
        carouselControllers[prefix].wasDragged = false;
      }
    }, 60);
  });

  syncCarouselUI(prefix);
}

/* ==========================================================================
   M3 Filter Chips & Protocols Carousel
   ========================================================================== */
let activeCategory = 'all';

function renderFilterChips() {
  const container = document.getElementById('protocol-chips');
  if (!container) return;

  container.innerHTML = PROTOCOL_CATEGORIES.map(
    (cat) => `
    <button
      type="button"
      class="m3-filter-chip ${cat.id === activeCategory ? 'is-selected' : ''}"
      data-category="${cat.id}"
      data-ripple
      aria-pressed="${cat.id === activeCategory}"
    >
      <span class="material-symbols-rounded chip-check" aria-hidden="true">check</span>
      <span class="material-symbols-rounded chip-icon" aria-hidden="true">${cat.icon}</span>
      <span>${cat.label}</span>
    </button>
  `
  ).join('');

  container.querySelectorAll('.m3-filter-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.category;
      container.querySelectorAll('.m3-filter-chip').forEach((chip) => {
        const isSelected = chip.dataset.category === activeCategory;
        chip.classList.toggle('is-selected', isSelected);
        chip.setAttribute('aria-pressed', String(isSelected));
      });
      const targetLeft = btn.offsetLeft - container.clientWidth / 2 + btn.offsetWidth / 2;
      container.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
      renderProtocolsGrid();
    });
  });
}

function renderProtocolsGrid() {
  const grid = document.getElementById('protocols-grid');
  if (!grid) return;

  const filtered =
    activeCategory === 'all'
      ? PROTOCOLS
      : PROTOCOLS.filter((p) => p.category === activeCategory);

  grid.innerHTML = filtered
    .map(
      (protocol) => `
      <article
        class="protocol-card"
        tabindex="0"
        role="button"
        aria-label="Ver detalhes do protocolo ${protocol.title}"
        data-protocol-id="${protocol.id}"
        data-ripple
      >
        <div class="protocol-card__media">
          <img src="${protocol.image}" alt="${protocol.title} na Clínica Carolina Baim" loading="lazy" />
          <span class="protocol-card__badge">${protocol.badge}</span>
          <button
            type="button"
            class="card-zoom-btn"
            data-zoom-protocol="${protocol.id}"
            aria-label="Ampliar foto de ${protocol.title} em alta resolução"
            title="Ver imagem inteira em alta resolução"
          >
            <span class="material-symbols-rounded" style="font-size:18px" aria-hidden="true">zoom_in</span>
          </button>
        </div>
        <div class="protocol-card__body">
          <span class="protocol-card__eyebrow">${protocol.eyebrow}</span>
          <h3 class="protocol-card__title">${protocol.title}</h3>
          <p class="protocol-card__desc">${protocol.shortDesc}</p>
          <div class="protocol-card__meta">
            <span>
              <span class="material-symbols-rounded" style="font-size:15px" aria-hidden="true">schedule</span>
              ${protocol.duration}
            </span>
            <span>
              <span class="material-symbols-rounded" style="font-size:15px" aria-hidden="true">healing</span>
              ${protocol.recovery}
            </span>
          </div>
          <div class="protocol-card__footer">
            <span>Explorar protocolo</span>
            <span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
          </div>
        </div>
      </article>
    `
    )
    .join('');

  grid.querySelectorAll('.protocol-card').forEach((card) => {
    const zoomBtn = card.querySelector('.card-zoom-btn');
    zoomBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (carouselControllers.protocols?.wasDragged) return;
      const protocol = PROTOCOLS.find((p) => p.id === card.dataset.protocolId);
      if (!protocol) return;
      openImageLightbox({
        image: protocol.image,
        badge: protocol.eyebrow,
        title: protocol.title,
        subtitle: `${protocol.duration} · Recuperação: ${protocol.recovery}`,
        protocolId: protocol.id,
        whatsappText: protocol.whatsappText,
      });
    });

    const open = (e) => {
      if (e?.target?.closest('.card-zoom-btn')) return;
      if (carouselControllers.protocols?.wasDragged) return;
      openProtocolDialog(card.dataset.protocolId);
    };
    card.addEventListener('click', open);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(e);
      }
    });
  });

  grid.scrollTo({ left: 0, behavior: 'smooth' });
  const dotsEl = document.getElementById('protocols-dots');
  if (dotsEl) dotsEl.innerHTML = '';
  requestAnimationFrame(() => syncCarouselUI('protocols'));
}

/* ==========================================================================
   M3 Modal Dialog for Protocol Details
   ========================================================================== */
let activeDialogProtocolId = null;
let activeLightboxProtocolId = null;

function openProtocolDialog(protocolId) {
  const protocol = PROTOCOLS.find((p) => p.id === protocolId);
  const backdrop = document.getElementById('protocol-dialog-backdrop');
  if (!protocol || !backdrop) return;

  activeDialogProtocolId = protocol.id;
  document.getElementById('dialog-img').src = protocol.image;
  document.getElementById('dialog-img').alt = protocol.title;
  document.getElementById('dialog-eyebrow').textContent = protocol.eyebrow;
  document.getElementById('dialog-title').textContent = protocol.title;
  document.getElementById('dialog-approach').textContent = protocol.approach;
  document.getElementById('dialog-duration').textContent = protocol.duration;
  document.getElementById('dialog-recovery').textContent = protocol.recovery;
  document.getElementById('dialog-comfort').textContent = protocol.comfort;

  const list = document.getElementById('dialog-indications');
  list.innerHTML = protocol.indications
    .map(
      (item) => `
      <li>
        <span class="material-symbols-rounded" aria-hidden="true">check_circle</span>
        <span>${item}</span>
      </li>
    `
    )
    .join('');

  const waBtn = document.getElementById('dialog-whatsapp-btn');
  waBtn.href = buildWhatsAppUrl(protocol.whatsappText);

  backdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  document.getElementById('dialog-close-btn').focus();
}

function closeProtocolDialog() {
  const backdrop = document.getElementById('protocol-dialog-backdrop');
  if (!backdrop) return;
  backdrop.classList.remove('is-open');
  document.body.style.overflow = '';
}

function openImageLightbox({ image, badge, title, subtitle, protocolId, whatsappText }) {
  const backdrop = document.getElementById('lightbox-backdrop');
  if (!backdrop) return;

  activeLightboxProtocolId = protocolId || null;
  const imgEl = document.getElementById('lightbox-img');
  imgEl.src = image;
  imgEl.alt = title;
  document.getElementById('lightbox-badge').textContent = badge || 'VISUALIZAÇÃO EM ALTA';
  document.getElementById('lightbox-title').textContent = title || '';
  document.getElementById('lightbox-sub').textContent = subtitle || '';
  document.getElementById('lightbox-whatsapp-btn').href = buildWhatsAppUrl(
    whatsappText || `Olá! Gostaria de saber mais sobre ${title}.`
  );

  backdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  document.getElementById('lightbox-close-btn').focus();
}

function closeImageLightbox() {
  const backdrop = document.getElementById('lightbox-backdrop');
  if (!backdrop) return;
  backdrop.classList.remove('is-open');
  if (!document.getElementById('protocol-dialog-backdrop')?.classList.contains('is-open')) {
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   Resultados Reais — Antes & Depois (M3 Filter Chips + Cards)
   ========================================================================== */
let activeResultCategory = 'all';

function renderResultChips() {
  const container = document.getElementById('result-chips');
  if (!container) return;

  container.innerHTML = RESULT_CATEGORIES.map(
    (cat) => `
    <button
      type="button"
      class="m3-filter-chip ${cat.id === activeResultCategory ? 'is-selected' : ''}"
      data-res-category="${cat.id}"
      data-ripple
      aria-pressed="${cat.id === activeResultCategory}"
    >
      <span class="material-symbols-rounded chip-check" aria-hidden="true">check</span>
      <span class="material-symbols-rounded chip-icon" aria-hidden="true">${cat.icon}</span>
      <span>${cat.label}</span>
    </button>
  `
  ).join('');

  container.querySelectorAll('.m3-filter-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeResultCategory = btn.dataset.resCategory;
      container.querySelectorAll('.m3-filter-chip').forEach((chip) => {
        const isSelected = chip.dataset.resCategory === activeResultCategory;
        chip.classList.toggle('is-selected', isSelected);
        chip.setAttribute('aria-pressed', String(isSelected));
      });
      const targetLeft = btn.offsetLeft - container.clientWidth / 2 + btn.offsetWidth / 2;
      container.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
      renderResultsGrid();
    });
  });
}

function renderResultsGrid() {
  const grid = document.getElementById('results-grid');
  if (!grid) return;

  const filtered =
    activeResultCategory === 'all'
      ? BEFORE_AFTER_RESULTS
      : BEFORE_AFTER_RESULTS.filter((r) => r.category === activeResultCategory);

  const protocolMap = {
    labios: 'labios-naturais',
    botox: 'toxina-preventiva',
    olheiras: 'tratamento-olheiras',
  };

  grid.innerHTML = filtered
    .map(
      (item) => `
      <article
        class="result-card"
        tabindex="0"
        role="button"
        aria-label="Ampliar caso clínico ${item.title}"
        data-result-id="${item.id}"
        data-ripple
      >
        <div class="result-card__media">
          <img src="${item.image}" alt="Antes e depois: ${item.title} - Dra. Carolina Baim" loading="lazy" />
          <span class="protocol-card__badge">${item.badge}</span>
          <button
            type="button"
            class="result-card__zoom"
            data-zoom-result="${item.id}"
            aria-label="Ampliar imagem de ${item.title} em alta resolução"
            title="Ver imagem inteira em alta resolução"
          >
            <span class="material-symbols-rounded" style="font-size:18px" aria-hidden="true">zoom_in</span>
          </button>
        </div>
        <div class="result-card__body">
          <h3 class="result-card__title">${item.title}</h3>
          <p class="result-card__sub">${item.subtitle}</p>
          <div class="protocol-card__footer" style="margin-top:6px;">
            <span>Ver sobre o procedimento</span>
            <span class="material-symbols-rounded" style="font-size:18px" aria-hidden="true">arrow_forward</span>
          </div>
        </div>
      </article>
    `
    )
    .join('');

  grid.querySelectorAll('.result-card').forEach((card) => {
    const item = BEFORE_AFTER_RESULTS.find((r) => r.id === card.dataset.resultId);
    const mappedId = item ? protocolMap[item.category] || 'labios-naturais' : 'labios-naturais';
    const mappedProtocol = PROTOCOLS.find((p) => p.id === mappedId);

    const zoomBtn = card.querySelector('.result-card__zoom');
    zoomBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (carouselControllers.results?.wasDragged || !item) return;
      openImageLightbox({
        image: item.image,
        badge: `ANTES & DEPOIS · ${item.badge.toUpperCase()}`,
        title: item.title,
        subtitle: item.subtitle,
        protocolId: mappedId,
        whatsappText: mappedProtocol?.whatsappText,
      });
    });

    const openDetails = (e) => {
      if (e?.target?.closest('.result-card__zoom')) return;
      if (carouselControllers.results?.wasDragged || !item) return;
      openProtocolDialog(mappedId);
    };
    card.addEventListener('click', openDetails);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDetails(e);
      }
    });
  });

  grid.scrollTo({ left: 0, behavior: 'smooth' });
  const dotsEl = document.getElementById('results-dots');
  if (dotsEl) dotsEl.innerHTML = '';
  requestAnimationFrame(() => syncCarouselUI('results'));
}

/* ==========================================================================
   M3 Segmented Tabs (Specialist Section)
   ========================================================================== */
function initSegmentedTabs() {
  const buttons = document.querySelectorAll('.m3-segmented__btn');
  const panels = document.querySelectorAll('.tab-panel');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      buttons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });
      panels.forEach((panel) => {
        panel.classList.toggle('is-active', panel.id === `tab-${target}`);
      });
    });
  });
}

/* ==========================================================================
   Reviews & Testimonials
   ========================================================================== */
function renderReviews() {
  const topicsWrap = document.getElementById('review-topics');
  if (topicsWrap) {
    topicsWrap.innerHTML = GOOGLE_REVIEW_TOPICS.map(
      (topic) => `
      <span class="topic-chip">
        <span class="material-symbols-rounded" style="font-size:17px;color:var(--md-sys-color-primary)" aria-hidden="true">${topic.icon}</span>
        <span>${topic.label}</span>
        <small>· ${topic.count}</small>
      </span>
    `
    ).join('');
  }

  const grid = document.getElementById('testimonials-grid');
  if (grid) {
    grid.innerHTML = TESTIMONIALS.map(
      (item) => `
      <article class="testimonial-card" data-reveal>
        <div>
          <div class="testimonial-card__stars" aria-label="Avaliação 5 de 5 estrelas">
            ${'<span class="material-symbols-rounded filled" style="font-size:18px" aria-hidden="true">star</span>'.repeat(item.rating)}
          </div>
          <p class="testimonial-card__quote" style="margin-top:12px;">“${item.quote}”</p>
        </div>
        <div class="testimonial-card__author">
          <strong>${item.author}</strong>
          <span>${item.context}</span>
        </div>
      </article>
    `
    ).join('');
  }
}

/* ==========================================================================
   M3 FAQ Accordion
   ========================================================================== */
function renderFaq() {
  const list = document.getElementById('faq-list');
  if (!list) return;

  list.innerHTML = FAQ_ITEMS.map(
    (item, idx) => `
    <div class="faq-item ${idx === 0 ? 'is-open' : ''}">
      <button
        type="button"
        class="faq-trigger"
        aria-expanded="${idx === 0 ? 'true' : 'false'}"
        data-ripple
      >
        <span>${item.question}</span>
        <span class="material-symbols-rounded" aria-hidden="true">expand_more</span>
      </button>
      <div class="faq-content">
        <div class="faq-content__inner">
          <p>${item.answer}</p>
        </div>
      </div>
    </div>
  `
  ).join('');

  list.querySelectorAll('.faq-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const willOpen = !item.classList.contains('is-open');
      list.querySelectorAll('.faq-item').forEach((el) => {
        el.classList.remove('is-open');
        el.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
      });
      if (willOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   Pre-Booking Form -> WhatsApp
   ========================================================================== */
function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  let selectedPeriod = 'Manhã (09h–12h)';
  form.querySelectorAll('.choice-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      form.querySelectorAll('.choice-pill').forEach((p) => p.classList.remove('is-selected'));
      pill.classList.add('is-selected');
      selectedPeriod = pill.dataset.period;
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('patient-name').value.trim();
    const interest = document.getElementById('patient-interest').value;
    const notes = document.getElementById('patient-notes').value.trim();

    if (!name) {
      document.getElementById('patient-name').focus();
      showSnackbar('Por favor, informe seu nome para personalizar o atendimento.');
      return;
    }

    const message = [
      `Olá, Dra. Carolina Baim! Meu nome é ${name}.`,
      `Gostaria de agendar uma avaliação para: ${interest}.`,
      `Preferência de horário: ${selectedPeriod}.`,
      notes ? `Observação: ${notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    showSnackbar('Abrindo WhatsApp oficial da Clínica Carolina Baim...');
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  });
}

/* ==========================================================================
   Theme Switcher, Scroll Effects, Drawer & Copy Helpers
   ========================================================================== */
function initThemeToggle() {
  // Always enforce luminous light clinic palette on mobile and desktop
  document.documentElement.setAttribute('data-theme', 'light');
  try {
    localStorage.removeItem('cb-theme');
  } catch {
    // ignore storage errors
  }
}

function initScrollAndDrawer() {
  const appBar = document.getElementById('top-app-bar');
  const fab = document.getElementById('m3-fab');

  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      appBar?.classList.toggle('is-scrolled', y > 16);
      fab?.classList.toggle('is-compact', y > 420);
    },
    { passive: true }
  );

  // Mobile Drawer
  const openBtn = document.getElementById('open-drawer-btn');
  const closeBtn = document.getElementById('close-drawer-btn');
  const backdrop = document.getElementById('nav-drawer-backdrop');
  const drawer = document.getElementById('nav-drawer');

  const setDrawer = (open) => {
    backdrop?.classList.toggle('is-open', open);
    drawer?.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  openBtn?.addEventListener('click', () => setDrawer(true));
  closeBtn?.addEventListener('click', () => setDrawer(false));
  backdrop?.addEventListener('click', () => setDrawer(false));
  drawer?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setDrawer(false));
  });

  // Scroll Reveal Observer (fail-safe on scroll, hash jumps, and tall blocks)
  const revealEls = Array.from(document.querySelectorAll('[data-reveal]'));
  const revealVisible = () => {
    const triggerBottom = window.innerHeight + 80;
    revealEls.forEach((el) => {
      if (el.classList.contains('is-revealed')) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= triggerBottom) {
        el.classList.add('is-revealed');
      }
    });
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: '80px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
    window.addEventListener('scroll', revealVisible, { passive: true });
    window.addEventListener('hashchange', () => setTimeout(revealVisible, 60));
    revealVisible();
  } else {
    revealEls.forEach((el) => el.classList.add('is-revealed'));
  }
}

function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
        showSnackbar(`Copiado: ${text}`);
      } catch {
        showSnackbar(text);
      }
    });
  });
}

function initDialogListeners() {
  const backdrop = document.getElementById('protocol-dialog-backdrop');
  const closeBtn = document.getElementById('dialog-close-btn');
  const cancelBtn = document.getElementById('dialog-cancel-btn');
  const dialogZoomBtn = document.getElementById('dialog-zoom-btn');
  const dialogImg = document.getElementById('dialog-img');

  closeBtn?.addEventListener('click', closeProtocolDialog);
  cancelBtn?.addEventListener('click', closeProtocolDialog);
  backdrop?.addEventListener('click', (e) => {
    if (e.target === backdrop) closeProtocolDialog();
  });

  const zoomFromDialog = () => {
    const protocol = PROTOCOLS.find((p) => p.id === activeDialogProtocolId);
    if (!protocol) return;
    openImageLightbox({
      image: dialogImg?.src || protocol.image,
      badge: protocol.eyebrow,
      title: protocol.title,
      subtitle: `${protocol.duration} · Recuperação: ${protocol.recovery}`,
      protocolId: protocol.id,
      whatsappText: protocol.whatsappText,
    });
  };
  dialogZoomBtn?.addEventListener('click', zoomFromDialog);
  dialogImg?.addEventListener('click', zoomFromDialog);

  // Lightbox listeners
  const lbBackdrop = document.getElementById('lightbox-backdrop');
  const lbCloseBtn = document.getElementById('lightbox-close-btn');
  const lbDetailsBtn = document.getElementById('lightbox-details-btn');

  lbCloseBtn?.addEventListener('click', closeImageLightbox);
  lbBackdrop?.addEventListener('click', (e) => {
    if (e.target === lbBackdrop) closeImageLightbox();
  });
  lbDetailsBtn?.addEventListener('click', () => {
    const targetId = activeLightboxProtocolId || 'lavieen-glass-skin';
    closeImageLightbox();
    openProtocolDialog(targetId);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lbBackdrop?.classList.contains('is-open')) {
        closeImageLightbox();
      } else {
        closeProtocolDialog();
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  attachRipples();
  renderHoursAndStatus();
  initCarouselController('protocols', 'protocols-grid');
  initCarouselController('results', 'results-grid');
  renderFilterChips();
  renderProtocolsGrid();
  renderResultChips();
  renderResultsGrid();
  initSegmentedTabs();
  renderReviews();
  renderFaq();
  initBookingForm();
  initThemeToggle();
  initScrollAndDrawer();
  initCopyButtons();
  initDialogListeners();

  // Trigger reveal for newly rendered testimonial cards
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
      el.classList.add('is-revealed');
    }
  });
});
