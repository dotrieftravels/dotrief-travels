/* =====================================================
   Dotrief Travels - app.js
   Clean Professional JavaScript
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     1. HAMBURGER MENU (Mobile Navigation)
     ===================================================== */

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburger && navMenu) {

    // Open / Close Menu
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("show");

      // Accessibility
      const expanded =
        hamburger.getAttribute("aria-expanded") === "true";

      hamburger.setAttribute(
        "aria-expanded",
        !expanded
      );
    });

    // Close menu after clicking a link
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("show");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      const isClickInside =
        navMenu.contains(event.target) ||
        hamburger.contains(event.target);

      if (!isClickInside) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("show");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* =====================================================
     2. FLIGHT FORM → WHATSAPP REDIRECT
     ===================================================== */

  const flightForm = document.getElementById("flightForm");

  if (flightForm) {

    flightForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const message = `
✈️ New Flight Request (Dotrief Travels)

👤 Name: ${this.name.value}
📧 Email: ${this.email.value}
📱 Phone: ${this.phone.value}

🛫 Departure City: ${this.departure.value}
🛬 Destination City: ${this.destination.value}

📅 Departure Date: ${this.departure_date.value}
📅 Return Date: ${this.return_date.value || "Not specified"}

👥 Passengers: ${this.passengers.value}
💺 Travel Class: ${this.class.value}

📝 Additional Notes:
${this.notes.value || "No extra notes"}
      `;

      const whatsappURL =
        `https://wa.me/2348144967586?text=${encodeURIComponent(message)}`;

      window.open(whatsappURL, "_blank");

      // Optional reset after submission
      flightForm.reset();
    });
  }

  /* =====================================================
     3. DESTINATION BOOK BUTTONS
     ===================================================== */

  const destinationButtons =
    document.querySelectorAll("[data-book-url]");

  destinationButtons.forEach(button => {

    button.addEventListener("click", () => {

      const bookingURL =
        button.getAttribute("data-book-url");

      if (bookingURL) {
        window.open(bookingURL, "_blank");
      }
    });
  });

  /* =====================================================
     4. SMOOTH SCROLL FOR NAVIGATION
     ===================================================== */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

      const targetId =
        this.getAttribute("href");

      const target =
        document.querySelector(targetId);

      if (target) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

});
