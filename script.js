const layers = document.querySelectorAll("[data-parallax]");

function parallax() {
  const scrollY = window.scrollY;

  layers.forEach((layer) => {
    const speed = Number(layer.dataset.speed) || 0;

    layer.style.transform =
      `translate3d(0, ${scrollY * speed}px, 0)`;
  });
}

window.addEventListener("scroll", parallax, {
  passive: true
});

parallax();
