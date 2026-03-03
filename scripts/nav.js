(function () {
  function initNav() {
    var links = document.querySelectorAll('.nav-link');
    var current = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

    links.forEach(function (link) {
      var href = (link.getAttribute('href') || '').toLowerCase();
      var isActive = href === current;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    var toggle = document.querySelector('.mobile-nav-toggle');
    var navLinks = document.querySelector('.nav-links');
    if (toggle && navLinks) {
      toggle.addEventListener('click', function () {
        var isOpen = navLinks.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initNav);
})();
