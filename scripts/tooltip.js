/** Sets up a tooltip for gallery images */
export function setupGalleryTooltip() {
  const tooltip = document.querySelector(".tooltip");
  const gallery = document.querySelector(".gallery-grid");

  document.addEventListener("mousemove", (e) => {
    tooltip.style.left = `${e.pageX + 15}px`;
    tooltip.style.top = `${e.pageY + 15}px`;
  });

  gallery.addEventListener(
    "mouseenter",
    (e) => {
      const img = e.target.closest("img");
      if (!img || !img.dataset.description) return;
      if (img.src.includes("square"))
        img.src = img.src.replace("square", "medium");
      tooltip.textContent = img.dataset.description;
      tooltip.style.display = "block";
    },
    true,
  ); // use capture so mouseenter bubbles properly

  gallery.addEventListener(
    "mouseleave",
    (e) => {
      const img = e.target.closest("img");
      if (!img) return;
      tooltip.style.display = "none";
    },
    true,
  );
}
