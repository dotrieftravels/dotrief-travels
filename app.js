/* app.js - cleaned script
   - sets iframe src with your affiliate params (preserved)
   - listens for postMessage from travelstart to set iframe height
   - handles hamburger menu toggle and accessibility attributes
   - tracks clicks/iframe view (keeps your gtag usage)
*/

/* === Travelstart iframe setup (affiliate params preserved) */
(function() {
  var travelstartIframeId = 'travelstartIframe';
  var iframeUrl = 'https://www.travelstart.com.ng';
  var affId = '219440';
  var iframe = document.getElementById(travelstartIframeId);
  if (!iframe) return;

  var iframeParams = [
    'affId=' + affId,
    'utm_source=affiliate',
    'utm_medium=' + affId,
    'isiframe=true',
    'iframeVersion=11',
    'host=' + encodeURIComponent(window.location.href.split('?')[0])
  ];
  var newIframeUrl = iframeUrl + ('/?search=false') + '&' + iframeParams.join('&');
  iframe.setAttribute('src', newIframeUrl);

  // Hide spinner when iframe loads
  iframe.addEventListener('load', function() {
    var sp = document.querySelector('.spin');
    if (sp) sp.style.display = 'none';
  });

  // If travelstart posts setHeight message, adjust iframe height
  window.addEventListener('message', function(e) {
    try {
      var eventName = e.data && e.data[0];
      var data = e.data && e.data[1];
      if (eventName === 'setHeight' && data && iframe) {
        // Trust positive numeric heights only
        var h = parseInt(data, 10);
        if (!isNaN(h) && h > 100) {
          iframe.style.height = h + 'px';
        }
      }
    } catch (err) {
      // ignore malformed messages
      console.warn('iframe message parse error', err);
    }
  }, false);

  // Intersection observer to send gtag event when iframe is in view
  try {
    const observer = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting === true && window.gtag) {
        gtag('event', 'iframe_viewed', {
          'event_category': 'Booking',
          'event_label': 'Travelstart iframe loaded'
        });
      }
    }, { threshold: [0] });

    observer.observe(iframe);
  } catch (e) {
    // IntersectionObserver might not be available in old browsers - safe fallback
  }
})();

/* === Hamburger / mobile nav toggling === */
(function() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('show');
    hamburger.classList.toggle('active', isOpen);

    // accessibility attributes
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    navMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  });

  // close menu if a nav item is clicked (mobile)
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navMenu.classList.remove('show');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      navMenu.setAttribute('aria-hidden', 'true');
    });
  });

  // allow ESC to close mobile menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('show')) {
      navMenu.classList.remove('show');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      navMenu.setAttribute('aria-hidden', 'true');
    }
  });
})();

/* === Track Book Now button clicks (keeps your original analytics call) === */
(function() {
  const bookBtn = document.getElementById("bookFlight");
  if (bookBtn && window.gtag) {
    bookBtn.addEventListener("click", function() {
      gtag('event', 'iframe_click', {
        'event_category': 'Booking',
        'event_label': 'User clicked Book Now button'
      });
    });
  }
})();

/* === University select display === */
(function() {
  const select = document.getElementById('university-select');
  const output = document.getElementById('selected-university');
  if (select && output) {
    select.addEventListener('change', function() {
      if (this.value) output.textContent = "You selected: " + this.value;
      else output.textContent = "";
    });
  }
})();

