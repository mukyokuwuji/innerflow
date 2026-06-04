document.addEventListener('DOMContentLoaded', function() {

  // --- Mobile Nav Toggle ---
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
    });
  }

  // --- Nav scroll behavior ---
  var nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // --- Scroll Reveal ---
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(function(el) {
      observer.observe(el);
    });
  }

  // --- Back to Top ---
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
  }

  // --- Copy Email ---
  var copyBtns = document.querySelectorAll('.copy-email-btn');
  copyBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var email = this.getAttribute('data-email');
      var feedback = this.nextElementSibling;
      navigator.clipboard.writeText(email).then(function() {
        feedback.classList.add('visible');
        setTimeout(function() {
          feedback.classList.remove('visible');
        }, 2000);
      });
    });
  });

// --- Schedule Manager (Vietnam time UTC+7) ---
  function updateSchedule() {
    var now = new Date();
    var vietnam = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
    var cards = document.querySelectorAll('.session-card[data-start]');
    var foundUpcoming = false;

    cards.forEach(function(card) {
      var start = new Date(card.getAttribute('data-start') + ':00');
      var end = new Date(card.getAttribute('data-end') + ':00');
      var fiveAfterStart = new Date(start.getTime() + 5 * 60000);

      if (vietnam >= end) {
        var prev = card.previousElementSibling;
        card.remove();
        if (prev && prev.classList.contains('day-header')) {
          var next = prev.nextElementSibling;
          if (!next || next.classList.contains('day-header') || !next.classList.contains('session-card')) {
            prev.remove();
          }
        }
        return;
      }

      if (!foundUpcoming && vietnam < fiveAfterStart) {
        card.classList.add('upcoming');
        if (!card.querySelector('.next-label')) {
          var label = document.createElement('span');
          label.className = 'next-label';
          label.textContent = 'NEXT';
          card.insertBefore(label, card.firstChild);
        }
        foundUpcoming = true;
      } else {
        card.classList.remove('upcoming');
        var oldLabel = card.querySelector('.next-label');
        if (oldLabel) oldLabel.remove();
      }
    });
  }

  updateSchedule();
  setInterval(updateSchedule, 30000);

});