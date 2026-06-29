// ============================================
// ARUN SAREEN PHOTOGRAPHY — SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- PRELOADER ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hidden'), 500);
  });
  // fallback in case load event already fired
  setTimeout(() => preloader.classList.add('hidden'), 1800);

 /* ---------- HEADER ON SCROLL ---------- */
  const header = document.getElementById('siteHeader');
  let scrollScheduled = false;
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
    scrollScheduled = false;
  };
  window.addEventListener('scroll', () => {
    if (!scrollScheduled) {
      scrollScheduled = true;
      requestAnimationFrame(onScroll);
    }
  });
  onScroll();

 /* ---------- MOBILE NAV TOGGLE ---------- */
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
const navOverlay = document.getElementById('navOverlay');

if (navToggle && mainNav) {
  const closeNav = () => {
    navToggle.classList.remove('open');
    mainNav.classList.remove('open');
    if (navOverlay) navOverlay.classList.remove('show');
    document.body.style.overflow = '';
  };

  navToggle.addEventListener('click', () => {
    const isOpening = !mainNav.classList.contains('open');
    navToggle.classList.toggle('open');
    mainNav.classList.toggle('open');
    if (navOverlay) navOverlay.classList.toggle('show');
    document.body.style.overflow = isOpening ? 'hidden' : '';
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  if (navOverlay) {
    navOverlay.addEventListener('click', closeNav);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) closeNav();
  });
}

  /* ---------- HERO SLIDESHOW ---------- */
  const heroImgs = document.querySelectorAll('[data-hero]');
  let heroIndex = 0;
  if (heroImgs.length > 1) {
    setInterval(() => {
      heroImgs[heroIndex].classList.remove('active');
      heroIndex = (heroIndex + 1) % heroImgs.length;
      heroImgs[heroIndex].classList.add('active');
    }, 5500);
  }

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('[data-aos]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- GALLERY FILTER ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.cat === filter) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

  /* ---------- BEFORE / AFTER SLIDER ---------- */
  const baSlider = document.getElementById('baSlider');
  const baAfter = document.querySelector('.ba-after');
  const baDivider = document.getElementById('baDivider');
  if (baSlider) {
    const updateBA = (val) => {
      baAfter.style.clipPath = `inset(0 ${100 - val}% 0 0)`;
      baDivider.style.left = `${val}%`;
    };
    updateBA(baSlider.value);
    baSlider.addEventListener('input', (e) => updateBA(e.target.value));
  }

  /* ---------- FAQ ACCORDION (legacy design only — skips native <details> FAQs) ---------- */
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const q = item.querySelector('.faq-q');
  if (!q) return;   // <-- add this line
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    faqItems.forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

  /* ---------- CINEMATIC SHOWREEL ---------- */
  const showreelSection = document.querySelector('.showreel');
  const showreelVideo = document.getElementById('showreelVideo');
  const showreelPlay = document.getElementById('showreelPlay');
  if (showreelSection && showreelVideo && showreelPlay) {
    const playIcon = showreelPlay.querySelector('.play-icon i');
    let isPlayingWithSound = false;

    showreelPlay.addEventListener('click', () => {
      isPlayingWithSound = !isPlayingWithSound;
      if (isPlayingWithSound) {
        showreelVideo.muted = false;
        showreelVideo.play();
        showreelSection.classList.add('playing');
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        showreelPlay.setAttribute('aria-label', 'Pause showreel');
      } else {
        showreelVideo.muted = true;
        showreelSection.classList.remove('playing');
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        showreelPlay.setAttribute('aria-label', 'Play showreel with sound');
      }
    });

    // If the video ends, reset to the muted looping background state
    showreelVideo.addEventListener('ended', () => {
      isPlayingWithSound = false;
      showreelVideo.muted = true;
      showreelSection.classList.remove('playing');
      playIcon.classList.remove('fa-pause');
      playIcon.classList.add('fa-play');
    });
  }

  /* ---------- INQUIRY POPUP MODAL ---------- */
const inquiryModal = document.getElementById('inquiryModal');
if (inquiryModal) {
  const inquiryOverlay = document.getElementById('inquiryOverlay');
  const inquiryClose = document.getElementById('inquiryClose');
  const inquirySkip = document.getElementById('inquirySkip');

  const openModal = () => {
    inquiryModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    inquiryModal.classList.remove('show');
    document.body.style.overflow = '';
  };

  // Show 3s after page load
  setTimeout(openModal, 3000);

  // Show again every 2 minutes after closing
  let repeatTimer = null;

  const scheduleRepeat = () => {
    clearTimeout(repeatTimer);
    repeatTimer = setTimeout(() => {
      // Only reopen if user isn't already looking at it
      if (!inquiryModal.classList.contains('show')) {
        openModal();
      }
    }, 2 * 60 * 1000); // 2 minutes 
  };

  inquiryOverlay.addEventListener('click', () => { closeModal(); scheduleRepeat(); });
  inquiryClose.addEventListener('click', () => { closeModal(); scheduleRepeat(); });
  inquirySkip.addEventListener('click', () => { closeModal(); scheduleRepeat(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && inquiryModal.classList.contains('show')) {
      closeModal();
      scheduleRepeat();
    }
  });
}
  /* ---------- BOOKING FORM(S) ---------- */
  const handleFormSubmit = (form, successEl) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          successEl.textContent = "Thank you! Your inquiry has been received — we'll be in touch within 24 hours.";
          successEl.classList.remove('error');
          successEl.classList.add('show');
          form.reset();
          // If this was the popup form, close the modal shortly after success
          if (form.id === 'popupForm') {
            setTimeout(() => {
              const modal = document.getElementById('inquiryModal');
              if (modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
                try { sessionStorage.setItem('asp_inquiry_dismissed_v2', '1'); } catch (e) {}
              }
            }, 1800);
          }
        } else {
          throw new Error('Submission failed');
        }
      } catch (err) {
        successEl.textContent = "Something went wrong sending your inquiry. Please email us directly at hello@arunsareenphotography.com or use WhatsApp.";
        successEl.classList.add('show', 'error');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        setTimeout(() => successEl.classList.remove('show', 'error'), 8000);
      }
    });
  };

  const bookingForm = document.getElementById('bookingForm');
  const formSuccess = document.getElementById('formSuccess');
  if (bookingForm && formSuccess) handleFormSubmit(bookingForm, formSuccess);

  const popupForm = document.getElementById('popupForm');
  const popupFormSuccess = document.getElementById('popupFormSuccess');
  if (popupForm && popupFormSuccess) handleFormSubmit(popupForm, popupFormSuccess);
  /* ---------- INSTAGRAM MOBILE SLIDER ---------- */
const instaMarquee = document.getElementById('instaMarquee');
if (instaMarquee) {
  let mobileSliderActive = false;
  let currentSlide = 0;
  let mobileInterval = null;
  let mobileSlides = [];

  const initMobileSlider = () => {
    // Only use the first set (first 8 slides), ignore the duplicates
    const allSlides = instaMarquee.querySelectorAll('.insta-slide');
    mobileSlides = Array.from(allSlides).slice(0, allSlides.length / 2);

    // Hide duplicate set on mobile
    Array.from(allSlides).slice(allSlides.length / 2).forEach(s => {
      s.style.display = 'none';
    });

    currentSlide = 0;
    instaMarquee.style.transform = `translateX(0)`;

    mobileInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % mobileSlides.length;
      instaMarquee.style.transform = `translateX(-${currentSlide * 100}%)`;
    }, 3000);

    mobileSliderActive = true;
  };

  const destroyMobileSlider = () => {
    clearInterval(mobileInterval);
    mobileInterval = null;
    mobileSliderActive = false;

    const allSlides = instaMarquee.querySelectorAll('.insta-slide');
    Array.from(allSlides).slice(allSlides.length / 2).forEach(s => {
      s.style.display = '';
    });

    instaMarquee.style.transform = '';
    currentSlide = 0;
  };

  const mediaQuery = window.matchMedia('(max-width: 860px)');

  const handleBreakpoint = (e) => {
    if (e.matches && !mobileSliderActive) {
      initMobileSlider();
    } else if (!e.matches && mobileSliderActive) {
      destroyMobileSlider();
    }
  };

  mediaQuery.addEventListener('change', handleBreakpoint);
  handleBreakpoint(mediaQuery);
}
/* ---------- PORTFOLIO LIMIT (4 photos, all screen sizes) ---------- */
const galleryGrid = document.getElementById('galleryGrid');
const isFullPortfolioPage = !!document.querySelector('.portfolio-page');
if (galleryGrid && !isFullPortfolioPage) {
  // Create the "View Full Portfolio" button (shown on every screen size now)
  const portfolioMobileBtn = document.createElement('a');
  portfolioMobileBtn.href = 'portfolio.html';
  portfolioMobileBtn.className = 'btn btn-gold portfolio-mobile-btn';
  portfolioMobileBtn.textContent = 'View Full Portfolio';
  galleryGrid.parentElement.insertBefore(portfolioMobileBtn, galleryGrid.nextSibling);

  // Always show only the first 4 items — desktop and mobile alike
  const allItems = Array.from(galleryGrid.querySelectorAll('.gallery-item'));
  allItems.forEach((item, i) => {
    item.style.display = i < 4 ? '' : 'none';
  });
  portfolioMobileBtn.style.display = 'inline-flex';
}
/* ---------- SERVICES MOBILE SHOW MORE ---------- */
const servicesGrid = document.querySelector('.services-grid');
if (servicesGrid) {
  const serviceCards = Array.from(servicesGrid.querySelectorAll('.service-card'));

  // Create show more button
  const showMoreBtn = document.createElement('button');
  showMoreBtn.className = 'services-show-more';
  showMoreBtn.textContent = 'Show More Services';
  servicesGrid.parentElement.appendChild(showMoreBtn);

  let expanded = false;

  const applyMobileServices = (isMobile) => {
    if (isMobile) {
      serviceCards.forEach((card, i) => {
        card.style.display = i < 4 ? '' : (expanded ? '' : 'none');
      });
      showMoreBtn.style.display = '';
    } else {
      serviceCards.forEach(card => card.style.display = '');
      showMoreBtn.style.display = 'none';
      expanded = false;
    }
  };

  showMoreBtn.addEventListener('click', () => {
    expanded = !expanded;
    serviceCards.forEach((card, i) => {
      if (i >= 4) card.style.display = expanded ? '' : 'none';
    });
    showMoreBtn.textContent = expanded ? 'Show Less' : 'Show More Services';
  });

  const servicesMQ = window.matchMedia('(max-width: 860px)');
  servicesMQ.addEventListener('change', (e) => applyMobileServices(e.matches));
  applyMobileServices(servicesMQ.matches);
}
/* ---------- TESTIMONIALS MOBILE GLASS SWIPER ---------- */
const tmsStack = document.getElementById('tmsStack');
const tmsDots = document.getElementById('tmsDots');
if (tmsStack && tmsDots) {
  const cards = Array.from(tmsStack.querySelectorAll('.tms-card'));
  const total = cards.length;
  let current = 0;

  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'tms-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    tmsDots.appendChild(dot);
  });

  const updateDots = () => {
    tmsDots.querySelectorAll('.tms-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  };

  const goTo = (index) => {
    current = ((index % total) + total) % total;
    cards.forEach((card, i) => {
      const pos = ((i - current) + total) % total;
      card.setAttribute('data-pos', pos);
    });
    updateDots();
  };

  // Auto-advance every 4s — only while this section is on screen
  let autoTimer = null;
  const startAuto = () => { autoTimer = setInterval(() => goTo(current + 1), 4000); };
  const stopAuto = () => { clearInterval(autoTimer); autoTimer = null; };
  const resetTimer = () => { stopAuto(); startAuto(); };

  // Drag / swipe on top card
  let dragStartX = null;
  let dragStartY = null;
  let isDragging = false;

  const getTopCard = () => tmsStack.querySelector('.tms-card[data-pos="0"]');

  const onDragStart = (x, y) => {
    dragStartX = x;
    dragStartY = y;
    isDragging = true;
  };

  const onDragEnd = (x) => {
    if (!isDragging) return;
    isDragging = false;
    const diff = dragStartX - x;
    if (Math.abs(diff) > 40) {
      diff > 0 ? goTo(current + 1) : goTo(current - 1);
      resetTimer();
    }
  };

  // Mouse
  tmsStack.addEventListener('mousedown', (e) => onDragStart(e.clientX, e.clientY));
  window.addEventListener('mouseup', (e) => onDragEnd(e.clientX));

 // Touch
  tmsStack.addEventListener('touchstart', (e) => {
    onDragStart(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  tmsStack.addEventListener('touchend', (e) => {
    onDragEnd(e.changedTouches[0].clientX);
  });

  /* ---------- PAUSE TESTIMONIALS WHEN OFF-SCREEN ---------- */
  const testimonialsSection = document.getElementById('testimonials');
  const columnsWrap = document.querySelector('.testimonials-columns-wrap');
  if (testimonialsSection) {
    const testimonialsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (columnsWrap) columnsWrap.classList.toggle('paused', !entry.isIntersecting);
        entry.isIntersecting ? startAuto() : stopAuto();
      });
    }, { threshold: 0.1 });
    testimonialsObserver.observe(testimonialsSection);
  }
}
});
