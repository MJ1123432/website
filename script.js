document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  // SVG Icons for Light and Dark modes
  const moonIcon =
    '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
  const sunIcon =
    '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';

  // 1. Initialize Theme on Page Load
  const currentTheme = localStorage.getItem("resq-theme");
  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.innerHTML = sunIcon;
  }

  // 2. Handle Theme Toggle Clicks
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    let theme = "light";

    if (document.body.classList.contains("dark-mode")) {
      theme = "dark";
      themeIcon.innerHTML = sunIcon; // Switch to Sun
    } else {
      themeIcon.innerHTML = moonIcon; // Switch to Moon
    }

    // Save preference for next time
    localStorage.setItem("resq-theme", theme);
  });

  // 3. Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.style.padding = "0.8rem 0";
    } else {
      navbar.style.padding = "0";
    }
  });

  // 4. Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // 5. Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll(".fade-up");
  fadeElements.forEach((el) => observer.observe(el));
});
