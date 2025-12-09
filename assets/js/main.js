// =======================
// HAMBURGER MENU TOGGLE
// =======================
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        mobileMenu.classList.toggle("active");
    });

    // Close mobile menu when any link is clicked
    document.querySelectorAll(".mobile-menu a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            mobileMenu.classList.remove("active");
        });
    });
}


// =======================
// SMOOTH SCROLL FOR LINKS
// =======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});


// =======================================
// TRAVELSTART IFRAME – SCROLL FIX
// Prevents double scroll + improves UX
// =======================================
const travelstartFrame = document.getElementById("travelstart-iframe");

if (travelstartFrame) {
    travelstartFrame.addEventListener("load", () => {
        // Force iframe height reset after load (improves desktop experience)
        setTimeout(() => {
            travelstartFrame.style.height = "1200px";
        }, 800);
    });
}


// =======================================
// TRAVELSTART WIDGET RELOAD BUTTON
// (For users who want to refresh the search results)
// =======================================
const reloadBtn = document.getElementById("reload-widget");

if (reloadBtn && travelstartFrame) {
    reloadBtn.addEventListener("click", () => {
        const oldSrc = travelstartFrame.src;
        travelstartFrame.src = "";
        setTimeout(() => {
            travelstartFrame.src = oldSrc;
        }, 300);
    });
}
