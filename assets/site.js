document.documentElement.classList.add("js");
// Screenshot links remain usable when JavaScript is disabled.
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
    screen.addEventListener("click", (event) => {
      event.preventDefault();
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
