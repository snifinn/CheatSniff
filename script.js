"use strict";

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

// Подключить реальный магазин или контакт автора, когда он будет готов.
document.querySelector("#access-button").addEventListener("click", () => {
  const game = document.querySelector("#game-select").value;
  const message = document.querySelector("#access-message");
  message.textContent = game + ": доступ к каталогу и 14-дневному пробному периоду пока не подключён. Ссылка появится здесь после запуска.";
  message.hidden = false;
});
