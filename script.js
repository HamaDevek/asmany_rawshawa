// Mobile menu functionality
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
const closeMenuButton = document.getElementById("close-menu");

function openMobileMenu() {
  mobileMenu.classList.add("active");
  mobileMenuOverlay.classList.add("active");
  document.body.classList.add("menu-open");
}

function closeMobileMenu() {
  mobileMenu.classList.remove("active");
  mobileMenuOverlay.classList.remove("active");
  document.body.classList.remove("menu-open");
}

mobileMenuButton.addEventListener("click", openMobileMenu);
closeMenuButton.addEventListener("click", closeMobileMenu);
mobileMenuOverlay.addEventListener("click", closeMobileMenu);

// Close mobile menu when clicking on menu links
const mobileMenuLinks = mobileMenu.querySelectorAll("a");
mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// Prevent menu from closing when clicking inside the menu
mobileMenu.addEventListener("click", function (e) {
  e.stopPropagation();
});

// Category filtering functionality
document.querySelectorAll(".category-tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    // Remove active class from all tabs
    document
      .querySelectorAll(".category-tab")
      .forEach((t) => t.classList.remove("active"));
    // Add active class to clicked tab
    this.classList.add("active");

    const category = this.getAttribute("data-category");
    const photoItems = document.querySelectorAll(".photo-item");

    photoItems.forEach((item) => {
      if (
        category === "all" ||
        item.getAttribute("data-category") === category
      ) {
        item.style.display = "inline-block";
        item.style.animation = "fadeInUp 0.6s ease-out";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Lightbox functionality
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxCategory = document.getElementById("lightbox-category");
const lightboxClose = document.getElementById("lightbox-close");

// Open lightbox when clicking on photos
document.querySelectorAll(".photo-item").forEach((item) => {
  item.addEventListener("click", function () {
    const img = this.querySelector("img");
    const title = this.querySelector(".photo-title").textContent;
    const category = this.querySelector(".category-badge").textContent;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxTitle.textContent = title;
    lightboxCategory.textContent = category;

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

// Close lightbox
function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto";
}

lightboxClose.addEventListener("click", closeLightbox);

// Close lightbox when clicking outside the image
lightbox.addEventListener("click", function (e) {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Close lightbox with escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && lightbox.classList.contains("active")) {
    closeLightbox();
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Form submission with professional handling
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  // Show professional confirmation
  alert(
    "Thank you for your professional inquiry. We will respond to your business request within 24 hours."
  );

  // Reset form
  this.reset();
});

// Enhanced scroll effects
let lastScrollY = window.scrollY;
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  const currentScrollY = window.scrollY;

  if (currentScrollY > 100) {
    header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.boxShadow = "none";
  }

  lastScrollY = currentScrollY;
});

// Initialize gallery with fade-in animation
document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.querySelector(".photo-grid");
  if (gallery) {
    gallery.classList.add("fade-in-up");
  }
});

// Professional animations for brand cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe brand cards for animation
document.querySelectorAll(".brand-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "all 0.6s ease";
  observer.observe(card);
});
