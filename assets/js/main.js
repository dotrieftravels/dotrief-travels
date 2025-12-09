/* assets/js/app.js
   Consolidated JS:
   - Handles hamburger menu
   - Sets up Travelstart iframe with affiliate params
   - Spinner hide on load
   - Listens for postMessage setHeight from Travelstart
   - Tracks clicks with gtag (defensive)
   - Destination button open (uses data-book-url)
*/

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ---- NAV: hamburger / off-canvas ---- */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
      hamburger.addEventListener('click', function () {
        const expanded = hamburger.classList.toggle('active');
        navMenu.classList.toggle('show');
        // accessibility
        hamburger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        navMenu.setAttribute('aria-hidden', expanded ? 'false' : 'true');
      });

      // close on link click
      navMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          navMenu.classList.remove('show');
          hamburger.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
          navMenu.setAttribute('aria-hidden', 'true');
        });
      });
    }

    /* ---- TRAVELSTART IFRAME SETUP ---- */
    const iframeId = 'travelstartIframe';
    const iframe = document.getElementById(iframeId);

    if (iframe) {
      // Build URL - keep your affiliate values exactly as provided
      const iframeUrlBase = 'https://www.travelstart.com.ng';
      const affId = '219440';
      const iframeParams = [
        'affId=' + affId,
        'utm_source=affiliate',
        'utm_medium=' + affId,
        'isiframe=true',
        'iframeVersion=11',
        'host=' + encodeURIComponent(window.location.href.split('?')[0])
      ];
      const newIframeUrl = iframeUrlBase + '/?search=false&' + iframeParams.join('&');

      // set src
      iframe.setAttribute('src', newIframeUrl);

      // sensible default sizing (JS will update size when travelstart sends height)
      iframe.style.width = '100%';
      iframe.style.minHeight = '700px';
      iframe.style.height = 'auto';
      iframe.style.border = 'none';

      // spinner hide handlers
      const hideSpinner = function () {
        const spin = document.querySelector('.spin');
        if (spin) { spin.style.display = 'none'; }
      };

      iframe.addEventListener('load', hideSpinner);
      // defensive jQuery hook if any left on page
      if (window.jQuery) {
        window.jQuery(iframe).on('load', hideSpinner);
      }
    }

    /* ---- IFRAME postMessage handler (Travelstart sends ['setHeight', height]) ---- */
    window.addEventListener('message', function (e) {
      try {
        const data = e.data;
        if (!Array.isArray(data)) return;
        const eventName = data[0];
        const value = data[1];
        if (eventName === 'setHeight' && iframe) {
          const safeHeight = Math.min(Number(value) || 0, 2500);
          if (safeHeight > 0) {
            iframe.style.minHeight = safeHeight + 'px';
          }
        }
      } catch (err) {
        // Don't break the page if unexpected message
        console.warn('iframe message handler error', err);
      }
    }, false);

    /* ---- IntersectionObserver to track iframe viewed (gtag) ---- */
    if (window.gtag && iframe) {
      try {
        const observer = new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting === true) {
            try {
              gtag('event', 'iframe_viewed', {
                'event_category': 'Booking',
                'event_label': 'Travelstart iframe loaded'
              });
            } catch (e) { /* ignore */ }
            observer.unobserve(entries[0].target);
          }
        }, { threshold: [0] });
        observer.observe(iframe);
      } catch (err) {
        // ignore observer issues on old browsers
      }
    }

    /* ---- Book Now button (scroll to iframe & GA) ---- */
    const bookBtn = document.getElementById('bookFlight');
    if (bookBtn && iframe) {
      bookBtn.addEventListener('click', function () {
        try {
          if (window.gtag) {
            gtag('event', 'iframe_click', {
              'event_category': 'Booking',
              'event_label': 'User clicked Book Now button'
            });
          }
        } catch (e) { /* ignore analytics errors */ }
        // scroll user to iframe for desktop UX
        iframe.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    /* ---- Destination buttons: open form in new tab (data-book-url attribute) ---- */
    document.querySelectorAll('[data-book-url]').forEach(btn => {
      btn.addEventListener('click', function (ev) {
        const url = btn.getAttribute('data-book-url');
        if (!url) return;
        // open the booking form in a new tab to preserve the site
        window.open(url, '_blank', 'noopener');
        // optional GA event
        try {
          if (window.gtag) {
            gtag('event', 'dest_book_click', {
              'event_category': 'Destination',
              'event_label': url
            });
          }
        } catch (e) { /* ignore */ }
      });
    });

    /* ---- University select behavior (display chosen) ---- */
    const select = document.getElementById('university-select');
    const output = document.getElementById('selected-university');
    if (select && output) {
      select.addEventListener('change', function () {
        if (this.value) output.textContent = "You selected: " + this.value;
        else output.textContent = "";
      });
    }

    /* final small safety cleanup: hide spinner if still visible after 5s */
    setTimeout(function () {
      const spin = document.querySelector('.spin');
      if (spin) spin.style.display = 'none';
    }, 5000);

  }); // DOMContentLoaded
})();
