/* ============================================================
   CHALÉS MONTANHA SERRANA — main.js v1.0 | Jul 2026
   ============================================================ */

(function () {
  'use strict';

  /* ── SCROLL REVEAL ─────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: mostrar tudo
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ── HEADER — sombra ao rolar ─────────────────────────── */
  const header = document.getElementById('header');
  function updateHeader() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ── MENU MOBILE ──────────────────────────────────────── */
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav  = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');

  function openMenu() {
    mobileNav.style.display = 'flex';
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileNav.style.display = 'none';
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (menuToggle && mobileNav && mobileClose) {
    menuToggle.addEventListener('click', openMenu);
    mobileClose.addEventListener('click', closeMenu);

    // Fechar ao clicar em um link do menu mobile
    mobileNav.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.style.display === 'flex') {
        closeMenu();
      }
    });
  }

  /* ── SMOOTH SCROLL para âncoras ───────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const headerH = header ? header.offsetHeight : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── WHATSAPP FLOAT — esconder em mobile com barra ────── */
  const waFloat = document.querySelector('.wa-float');
  function checkWaFloat() {
    if (!waFloat) return;
    // Esconde o float em telas pequenas (a barra mobile já tem o link)
    if (window.innerWidth <= 768) {
      waFloat.style.display = 'none';
    } else {
      waFloat.style.display = 'flex';
    }
  }
  window.addEventListener('resize', checkWaFloat, { passive: true });
  checkWaFloat();

  /* ── GALERIA / CARROSSEL — O CHALÉ ─────────────────────── */
  const galleryTrack = document.getElementById('chaleGalleryTrack');
  if (galleryTrack) {
    const slides = Array.from(galleryTrack.querySelectorAll('.chale-slide'));
    const dots = Array.from(document.querySelectorAll('.chale-gallery-dot'));
    const prevBtn = document.getElementById('chaleGalleryPrev');
    const nextBtn = document.getElementById('chaleGalleryNext');
    let current = 0;
    let autoplayTimer = null;

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('is-active', i === current));
      dots.forEach((d, i) => {
        d.classList.toggle('is-active', i === current);
        d.setAttribute('aria-selected', i === current ? 'true' : 'false');
      });
    }
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }
    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(next, 5000);
    }
    function stopAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        goTo(parseInt(dot.dataset.index, 10));
        startAutoplay();
      });
    });

    startAutoplay();
  }

})();
