// ==============================
// Portfolio JavaScript
// ==============================

// Welcome Message
document.addEventListener("DOMContentLoaded",function(){

    console.log("Portfolio Loaded");

});
// ==============================
// Contact Form Validation
// ==============================

const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let fullname = document.getElementById("fullname").value.trim();
        let email = document.getElementById("email").value.trim();
        let subject = document.getElementById("subject").value.trim();
        let message = document.getElementById("message").value.trim();

        if (
            fullname === "" ||
            email === "" ||
            subject === "" ||
            message === ""
        ) {
            alert("Please fill in all fields.");
            return;
        }

        alert("Thank you, " + fullname + "! Your message has been sent successfully.");

        form.reset();
    });
}

// ==============================
// Automatic Footer Year
// ==============================

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}

// ==============================
// Back To Top Button
// ==============================

const topBtn = document.getElementById("topBtn");

if (topBtn) {
    topBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// ==============================
// Dark Mode Toggle
// ==============================

const darkBtn = document.getElementById("darkModeBtn");

if (darkBtn) {
    darkBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });
}

// ==============================
// Smooth Scrolling for Navigation
// ==============================

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});    