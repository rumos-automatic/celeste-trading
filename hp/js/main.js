// Celeste Trading - redesign scripts (language switch, header, menu, reveal)
(function () {
  // Language switch: elements carry data-ja / data-en / data-zh / data-ko
  var btns = document.querySelectorAll('.lang-switch button');
  function setLang(lang) {
    btns.forEach(function (b) { b.classList.toggle('active', b.dataset.lang === lang); });
    document.querySelectorAll('[data-ja]').forEach(function (el) {
      var t = el.getAttribute('data-' + lang);
      if (!t) return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = t;
      else el.innerHTML = t;
    });
    document.documentElement.lang = lang;
  }
  var saved = 'ja';
  try { saved = localStorage.getItem('language') || 'ja'; } catch (e) {}
  setLang(saved);
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      setLang(b.dataset.lang);
      try { localStorage.setItem('language', b.dataset.lang); } catch (e) {}
    });
  });

  // Header turns solid after the hero
  var header = document.querySelector('.header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 80); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var links = document.querySelector('.nav-links');
  toggle.addEventListener('click', function () {
    links.classList.toggle('active');
    toggle.classList.toggle('active');
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('active');
      toggle.classList.remove('active');
    });
  });

  // Fade in on scroll
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('on'); });
  }

  // Contact form: show sending state
  var form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', function () {
      var btn = form.querySelector('button[type="submit"]');
      var label = { ja: '送信中...', en: 'Sending...', zh: '发送中...', ko: '전송 중...' };
      btn.textContent = label[document.documentElement.lang] || label.ja;
      btn.disabled = true;
    });
  }
})();
