"use strict";

function startTypewriter(element, text, delay = 42) {
  let index = 0;
  element.textContent = "";
  const typeNext = () => {
    if (index < text.length) {
      element.textContent += text[index++];
      window.setTimeout(typeNext, delay);
    }
  };
  typeNext();
}
const typewriter = document.querySelector(".typewriter-text");
if (typewriter) startTypewriter(typewriter, typewriter.textContent.trim());

const revealItems = document.querySelectorAll(".game-card, .feature-card");
revealItems.forEach((item, index) => {
  item.style.setProperty("--reveal-delay", `${(index % 6 + 1) * 0.1}s`);
  item.classList.add("reveal-item");
});
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
revealItems.forEach((item) => revealObserver.observe(item));

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Открыть меню");
  navigation.classList.remove("is-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
  navigation.classList.toggle("is-open", isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".header")) closeMenu();
});
window.matchMedia("(min-width: 761px)").addEventListener("change", closeMenu);

document.querySelector("#year").textContent = new Date().getFullYear();

