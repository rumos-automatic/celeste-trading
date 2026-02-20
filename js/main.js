// Celeste Trading - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {

  // ==========================================
  // Language Switcher (Japanese, English, Chinese)
  // ==========================================
  const langButtons = document.querySelectorAll('.lang-switch button');
  let currentLang = localStorage.getItem('language') || 'ja';

  // Initialize language
  setLanguage(currentLang);

  langButtons.forEach(button => {
    button.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      setLanguage(lang);
      localStorage.setItem('language', lang);
    });
  });

  function setLanguage(lang) {
    currentLang = lang;

    // Update button states
    langButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      }
    });

    // Update all translatable elements
    const elements = document.querySelectorAll('[data-ja]');
    elements.forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else if (el.tagName === 'OPTION') {
          el.textContent = text;
        } else {
          el.innerHTML = text;
        }
      }
    });

    // Update html lang attribute
    document.documentElement.lang = lang;
  }

  // ==========================================
  // Mobile Menu Toggle
  // ==========================================
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav') && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });

  // ==========================================
  // Header Scroll Effect
  // ==========================================
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
  });

  // ==========================================
  // Hero Slideshow
  // ==========================================
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    let currentSlide = 0;
    setInterval(() => {
      heroSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
    }, 5000);
  }

  // ==========================================
  // Smooth Scroll for Anchor Links
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ==========================================
  // Fade In Animation on Scroll
  // ==========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements
  document.querySelectorAll('.feature-card, .service-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });

  // ==========================================
  // Form Handling (Contact Page)
  // ==========================================
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // Form validation is handled by HTML5 required attributes
      // You can add additional validation here if needed

      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      const sendingText = { ja: '送信中...', en: 'Sending...', zh: '发送中...' };
      submitBtn.innerHTML = sendingText[currentLang] || '送信中...';
      submitBtn.disabled = true;

      // Re-enable button after form submission (in case of error)
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 5000);
    });
  }

  // ==========================================
  // Stats Counter Animation
  // ==========================================
  const stats = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;

    stats.forEach(stat => {
      const text = stat.getAttribute(`data-${currentLang}`) || stat.textContent;
      stat.textContent = text;
    });

    statsAnimated = true;
  }

  // Trigger stats animation when in view
  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
  }

});
