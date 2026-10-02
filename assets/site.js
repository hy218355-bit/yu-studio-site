document.documentElement.classList.add("js");
// Progressive enhancement: all content and navigation work without JavaScript.
const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
function closeMenu(restoreFocus = false) {
  menu?.setAttribute("aria-expanded", "false");
  nav?.classList.remove("is-open");
  if (menu) menu.querySelector("span").textContent = "＋";
  if (restoreFocus) menu?.focus();
}
menu?.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("is-open", open);
  menu.querySelector("span").textContent = open ? "−" : "＋";
});
nav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu?.getAttribute("aria-expanded") === "true")
    closeMenu(true);
});
matchMedia("(min-width: 761px)").addEventListener("change", () => closeMenu());
const dialog = document.querySelector(".screen-dialog");
if (dialog) {
  const screens = Array.from(document.querySelectorAll(".screen-button"));
  let active = 0;
  function showScreen(index) {
    active = (index + screens.length) % screens.length;
    const source = screens[active].querySelector("img");
    const image = dialog.querySelector(".dialog-image");
    image.src = source.src;
    image.alt = source.alt;
    dialog.querySelector("#screen-caption").textContent = screens[active]
      .closest("figure")
      .querySelector("figcaption").textContent;
    dialog.querySelector(".screen-counter").textContent =
      `${screens.length}枚中 ${active + 1}枚目`;
  }
  screens.forEach((screen, index) =>
    screen.addEventListener("click", () => {
      showScreen(index);
      dialog.showModal();
    }),
  );
  dialog
    .querySelector(".dialog-close")
    .addEventListener("click", () => dialog.close());
  dialog
    .querySelector(".screen-prev")
    .addEventListener("click", () => showScreen(active - 1));
  dialog
    .querySelector(".screen-next")
    .addEventListener("click", () => showScreen(active + 1));
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      const controls = [...dialog.querySelectorAll("button")];
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      showScreen(active + (event.key === "ArrowRight" ? 1 : -1));
    }
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      )
        dialog.close();
    }
  });
}
