/* =====================================
DOTRIEF TRAVELS JAVASCRIPT
STAGE 2D
MENU + FLIGHT FORM
===================================== */


document.addEventListener("DOMContentLoaded", function(){



/* ==============================
MOBILE MENU
============================== */


const menuBtn = document.getElementById("menu-btn");

const navbar = document.getElementById("navbar");



if(menuBtn && navbar){


menuBtn.addEventListener("click", function(){


navbar.classList.toggle("active");



if(navbar.classList.contains("active")){


menuBtn.innerHTML = '<i class="fas fa-times"></i>';


}else{


menuBtn.innerHTML = '<i class="fas fa-bars"></i>';


/* ==============================
BACK TO TOP
============================== */

const backToTop = document.getElementById("backToTop");

if (backToTop) {

window.addEventListener("scroll", function () {

if (window.scrollY > 300) {
backToTop.style.display = "flex";
} else {
backToTop.style.display = "none";
}

});

backToTop.addEventListener("click", function () {

window.scrollTo({
top: 0,
behavior: "smooth"
});

});

}



/* ==============================
NEWSLETTER
============================== */

const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {

newsletterForm.addEventListener("submit", function(e){

e.preventDefault();

alert("Thank you for subscribing! Travel updates will be available soon.");

newsletterForm.reset();

});

}


}


});




// Close menu when link clicked

const navLinks = navbar.querySelectorAll("a");


navLinks.forEach(function(link){


link.addEventListener("click",function(){


navbar.classList.remove("active");


menuBtn.innerHTML = '<i class="fas fa-bars"></i>';


});


});


}





/* ==============================
FLIGHT BOOKING FORM
============================== */

const flightForm = document.getElementById("flightForm");

if (flightForm) {

flightForm.addEventListener("submit", function(e){

e.preventDefault();

const message = `✈️ New Flight Booking Request

Name: ${flightForm.name.value}

Email: ${flightForm.email.value}

Phone: ${flightForm.phone.value}

Passengers: ${flightForm.passengers.value}

Departure: ${flightForm.departure.value}

Destination: ${flightForm.destination.value}

Departure Date: ${flightForm.departure_date.value}

Return Date: ${flightForm.return_date.value}

Travel Class: ${flightForm.travel_class.value}

Additional Information:

${flightForm.notes.value}

-------------------------

Sent from Dotrief Travels Website`;

const whatsappURL =
"https://wa.me/2348144967586?text=" +
encodeURIComponent(message);

window.open(whatsappURL, "_blank");

});

}


/* ==============================
STICKY HEADER
============================== */

const header = document.querySelector(".header");

if(header){

window.addEventListener("scroll",function(){

if(window.scrollY > 40){

header.classList.add("scrolled");

}else{

header.classList.remove("scrolled");

}

});

}

/* ==============================
SCROLL REVEAL
============================== */

const revealElements = document.querySelectorAll(
"section, .service-card, .trust-box, .country-card, .why-card, .faq-item, .about-card"
);

revealElements.forEach(function(item){

item.classList.add("reveal");

});

function revealOnScroll(){

const reveals=document.querySelectorAll(".reveal");

reveals.forEach(function(item){

const windowHeight=window.innerHeight;

const revealTop=item.getBoundingClientRect().top;

const revealPoint=120;

if(revealTop < windowHeight-revealPoint){

item.classList.add("active");

}

});

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

});