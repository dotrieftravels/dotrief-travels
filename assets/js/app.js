document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     BURGER MENU FIX
  ========================= */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("show");
      hamburger.classList.toggle("active");
    });

    // close menu when clicking links
    document.querySelectorAll("#nav-menu a").forEach(link => {
      link.addEventListener("click", function () {
        navMenu.classList.remove("show");
        hamburger.classList.remove("active");
      });
    });
  }


  /* =========================
     DESTINATION BUTTONS FIX
  ========================= */
  document.querySelectorAll("[data-book-url]").forEach(btn => {
    btn.addEventListener("click", function () {
      const url = this.getAttribute("data-book-url");
      if (url) {
        window.open(url, "_blank");
      }
    });
  });


  /* =========================
     FLIGHT FORM → WHATSAPP FIX
  ========================= */
  const form = document.getElementById("flightForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = form.name.value;
      const email = form.email.value;
      const phone = form.phone.value;
      const departure = form.departure.value;
      const destination = form.destination.value;
      const departureDate = form.departure_date.value;
      const returnDate = form.return_date.value;
      const passengers = form.passengers.value;
      const travelClass = form.class.value;
      const notes = form.notes.value;

      const message =
`✈️ Flight Booking Request - Dotrief Travels

Name: ${name}
Email: ${email}
Phone: ${phone}
From: ${departure}
To: ${destination}
Departure Date: ${departureDate}
Return Date: ${returnDate}
Passengers: ${passengers}
Class: ${travelClass}
Notes: ${notes}`;

      const whatsappURL = `https://wa.me/2348144967586?text=${encodeURIComponent(message)}`;

      window.open(whatsappURL, "_blank");
    });
  }

});
