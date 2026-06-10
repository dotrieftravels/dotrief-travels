document.addEventListener("DOMContentLoaded", function () {

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {

    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("show");
      hamburger.classList.toggle("active");
    });

    document.querySelectorAll("#nav-menu a").forEach(link => {
      link.addEventListener("click", function () {
        navMenu.classList.remove("show");
        hamburger.classList.remove("active");
      });
    });

    document.addEventListener("click", function (e) {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove("show");
        hamburger.classList.remove("active");
      }
    });

  }

});
