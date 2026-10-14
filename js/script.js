document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio loaded successfully!");

    // =====================================
    // 1. AUTOMATIC FOOTER YEAR
    // =====================================
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // =====================================
    // 2. BACK TO TOP
    // =====================================
    const topBtn = document.getElementById("topBtn");

    if (topBtn) {
        topBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // =====================================
    // 3. MOBILE NAVIGATION
    // Uses Bootstrap Collapse only
    // =====================================
    const navbar = document.getElementById("mainNavbar");
    const menuButton = document.querySelector(".navbar-toggler");
    const backdrop = document.getElementById("navbarBackdrop");

    let bsCollapse = null;

    if (navbar && menuButton && window.bootstrap) {
        bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbar, {
            toggle: false
        });

        // Close after selecting a navigation link
        navbar.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", () => {
                if (window.innerWidth < 992) {
                    bsCollapse.hide();
                }
            });
        });

        // Close when tapping outside the menu
        document.addEventListener("click", (event) => {
            const menuIsOpen = navbar.classList.contains("show");

            if (
                menuIsOpen &&
                !navbar.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {
                bsCollapse.hide();
            }
        });

        // Close when scrolling down
        let lastScrollY = window.scrollY;

        window.addEventListener("scroll", () => {
            const currentScrollY = window.scrollY;

            if (
                currentScrollY > lastScrollY &&
                currentScrollY > 80 &&
                navbar.classList.contains("show")
            ) {
                bsCollapse.hide();
            }

            lastScrollY = currentScrollY;
        }, { passive: true });

        // Keep backdrop synchronized if one exists
        if (backdrop) {
            navbar.addEventListener("hidden.bs.collapse", () => {
                backdrop.classList.remove("visible");
            });

            navbar.addEventListener("shown.bs.collapse", () => {
                backdrop.classList.add("visible");
            });
        }
    }

    // =====================================
    // 4. DARK MODE
    // =====================================
    const darkModeBtn = document.getElementById("darkModeBtn");

    function applyTheme(isDark) {
        document.body.classList.toggle("dark-mode", isDark);

        if (darkModeBtn) {
            darkModeBtn.textContent = isDark
                ? "☀️ Light Mode"
                : "🌙 Dark Mode";

            darkModeBtn.setAttribute("aria-pressed", String(isDark));
            darkModeBtn.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );
        }
    }

    // Restore saved preference
    const savedTheme = localStorage.getItem("portfolio-theme");
    applyTheme(savedTheme === "dark");

    if (darkModeBtn) {
        darkModeBtn.addEventListener("click", () => {
            const isDark = !document.body.classList.contains("dark-mode");

            applyTheme(isDark);

            localStorage.setItem(
                "portfolio-theme",
                isDark ? "dark" : "light"
            );
        });
    }

    // =====================================
    // 5. CONTACT FORM VALIDATION
    // =====================================
    // Does not interfere with your existing
    // email service or form submission.
    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", (event) => {
            const fullname = document.getElementById("fullname");
            const email = document.getElementById("email");
            const subject = document.getElementById("subject");
            const message = document.getElementById("message");

            if (
                !fullname?.value.trim() ||
                !email?.value.trim() ||
                !subject?.value.trim() ||
                !message?.value.trim()
            ) {
                event.preventDefault();
                alert("Please fill in all fields.");
            }
        });
    }
});