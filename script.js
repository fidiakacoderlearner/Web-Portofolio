// AOS Initialization
AOS.init({
    duration: 800,
    once: true,
    easing: "ease-out-cubic",
    offset: 80,
});

// Mobile Navbar Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        navLinks.classList.toggle("active");
    });

    // Close mobile menu when clicking nav link
    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}

// Back to Top Button
const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 320) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });
}

// Close mobile nav on outside click
document.addEventListener("click", (e) => {
    if (
        navLinks &&
        hamburger &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target) &&
        navLinks.classList.contains("active")
    ) {
        navLinks.classList.remove("active");
    }
});

// Set current year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offset = target.getBoundingClientRect().top + window.scrollY - 90;
            window.scrollTo({
                top: offset,
                behavior: "smooth",
            });
        }
    });
});

// Back to top: smooth scroll to top when link points to "#"
if (backToTop && backToTop.getAttribute("href") === "#") {
    backToTop.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ===== Lightbox (zoom gambar) =====
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox ? lightbox.querySelector(".lightbox-img") : null;
const lightboxClose = lightbox ? lightbox.querySelector(".lightbox-close") : null;

function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
}

function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    lightboxImg.src = "";
    lightboxImg.alt = "";
}

if (lightbox) {
    document.querySelectorAll(".zoom-trigger").forEach((trigger) => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const img = trigger.querySelector("img");
            if (img) openLightbox(img.currentSrc || img.src, img.alt);
        });
    });

    // Kartu sertifikat: klik di area mana saja pada kartu untuk membuka preview
    document.querySelectorAll(".achievement-card").forEach((card) => {
        card.addEventListener("click", () => {
            const img =
                card.querySelector(".zoom-trigger img") || card.querySelector("img");
            if (img) openLightbox(img.currentSrc || img.src, img.alt);
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }

    // Klik area gelap (bukan gambar) untuk menutup
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Tombol Esc untuk menutup
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.classList.contains("open")) {
            closeLightbox();
        }
    });
}
