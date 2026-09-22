/* =========================================================
   HIMUR GLOBAL HUB
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const navLinks = [...document.querySelectorAll(".main-nav a")];
  const revealItems = document.querySelectorAll(".reveal");
  const counters = document.querySelectorAll("[data-count]");
  const newsletter = document.querySelector(".newsletter");

  // 1. Loader
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hide"), 450);
  });

  // 2. Mobile navigation
  menuToggle?.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  // 3. Scroll reveal
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => revealObserver.observe(item));

  // 4. Number counters
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = Number(el.dataset.count);
      const prefix = el.dataset.prefix || "";
      const duration = 1500;
      const start = performance.now();

      function animate(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(target * eased);

        el.textContent = prefix + value + (target === 4500 ? "+" : target === 150 ? "+" : target === 48 ? "B+" : target === 4 ? "M+" : target === 30 ? "+" : "");
        if (progress < 1) requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // 5. Active navigation based on current section
  const sections = document.querySelectorAll("main section[id]");
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${id}`));
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach(section => sectionObserver.observe(section));

  // 6. Newsletter demo
  newsletter?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = newsletter.querySelector("input");
    if (!input.value.trim()) {
      input.focus();
      return;
    }
    alert("Thank you. Newsletter integration will be connected during backend development.");
    input.value = "";
  });

  // 7. Language button — UI demo
  document.querySelector(".language-btn")?.addEventListener("click", () => {
    alert("Language selector UI is ready. Real multilingual translation will be connected to the backend/API later.");
  });
});
