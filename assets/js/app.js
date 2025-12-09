/* assets/js/app.js
   Polished consolidated JavaScript for Dotrief Travels
   - Consolidates duplicate listeners
   - Sets up Travelstart iframe safely (keeps your affiliate params)
   - Handles hamburger open/close (off-canvas)
   - Handles iframe height messages
   - Tracks Book Now clicks and iframe view with gtag
   - Adds destination button redirect logic (use data-book-url attribute)
   Author: Polished by ChatGPT (you can edit labels/IDs if needed)
*/

(function () {
  'use strict';

  // Wait until DOM is ready
  document.addEventListener('DOMContentLoaded', function () {

    /* -------------------------
       NAV (Hamburger + off-canvas)
       ------------------------- */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    // defensive guards
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('show');    // controls CSS .nav-menu.show { right:0 }
        hamburger.classList.toggle('active'); // toggles animation to X
      });

      // close menu when clicking a link (improves UX)
      navMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          navMenu.classList.remove('show');
          hamburger.classList.remove('active');
        });
      });
    }

    /* -------------------------
       TRAVELSTART IFRAME SETUP
       ------------------------- */
    const iframeId = 'travelstartIframe';
    const iframe = document.getElementById(iframeId);

    if (iframe) {
      // Build URL (keep your affiliate params exactly as before)
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

      // Set src (keeps your affiliate)
      iframe.setAttribute('src', newIframeUrl);

      // Remove the inline 100vh / 100vw behavior so the page scrolls normally:
      // (if you want larger iframe on desktop change minHeight below)
      iframe.style.width = '100%';
      iframe.style.minHeight = '700px'; // comfortable desktop view, user can scroll page
      iframe.style.height = 'auto';
      iframe.style.border = 'none';

      // Hide spinner on ready/load
      const hideSpinner = () => {
        const spin = document.querySelector('.spin');
        if (spin) spin.style.display = 'none';
      };

      iframe.addEventListener('load', hideSpinner);
      // If jQuery ready handlers elsewhere expect this, keep a defensive call:
      if (window.jQuery) {
        window.jQuery(iframe).on('load', hideSpinner);
      }
    }

    /* -------------------------
       IFRAME: listen for postMessage height (Travelstart)
       ------------------------- */
    window.addEventListener('message', function (e) {
      try {
        // Travelstart sends structured messages like [ 'setHeight', heightValue ]
        const data = e.data;
        if (!Array.isArray(data)) return;
        const eventName = data[0];
        const value = data[1];
        if (eventName === 'setHeight' && iframe) {
          // apply height but limit to reasonable max to avoid giant iframe
          const safeHeight = Math.min(Number(value) || 0, 2500);
          if (safeHeight > 0) {
            iframe.style.minHeight = safeHeight + 'px';
          }
        }
      } catch (err) {
        // don't break page on unexpected postMessage
        console.warn('iframe message handler error', err);
      }
    }, false);

    /* -------------------------
       GTag: record iframe viewed (IntersectionObserver)
       ------------------------- */
    if (window.gtag && iframe) {
      const observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting === true) {
          try {
            gtag('event', 'iframe_viewed', {
              'event_category': 'Booking',
              'event_label': 'Travelstart iframe loaded'
            });
          } catch (e) {
            // ignore analytics errors
          }
          // We only need to fire once
          observer.unobserve(entries[0].target);
        }
      }, { threshold: [0] });

      observer.observe(iframe);
    }

    /* -------------------------
       Book Now / Destination Buttons
       - Destination buttons can have data-book-url="https://forms.gle/xxx"
       - We also keep the #bookFlight button tracking
       ------------------------- */
    // existing Book Now primary button
    const bookBtn = document.getElementById('bookFlight');
    if (bookBtn) {
      bookBtn.addEventListener('click', function (e) {
        // small GA event
        if (window.gtag) {
          try {
            gtag('event', 'iframe_click', {
              'event_category': 'Booking',
              'event_label': 'User clicked Book Now button'
            });
          } catch (err) { /* ignore */ }
        }
        // optionally scroll to booking iframe so desktop users see it instantly
        if (iframe) {
          iframe.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    // generic destination buttons (use data attribute in HTML)
    document.querySelectorAll('[data-book-url]').forEach(btn => {
      btn.addEventListener('click', function (ev) {
        const url = btn.getAttribute('data-book-url');
        if (!url) return;
        // open in new tab (safer for users)
        window.open(url, '_blank');
      });
    });

    /* -------------------------
       Small helpers / cleanup
       ------------------------- */
    // Remove any accidental duplicated listeners attached to window before (best-effort)
    // (We can't remove anonymous listeners, but consolidating now is big improvement.)

  }); // DOMContentLoaded
})();
