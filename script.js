const heroBg = document.querySelector('.hero-bg');
const workBg = document.querySelector('.work-bg');
const workCard = document.querySelector('.work-card--black');

function parallax() {
  const y = window.scrollY;

  // Движение первого фонового изображения
  if (heroBg) {
    heroBg.style.transform =
      `translateY(${Math.min(y * 0.12, 80)}px) scale(1.05)`;
  }

  // Движение второго изображения
  if (workBg && workCard) {
    const rect = workCard.getBoundingClientRect();
    const progress = Math.max(
      0,
      Math.min(1, -rect.top / window.innerHeight)
    );

    workBg.style.transform =
      `translateY(${progress * 55 - 25}px) scale(1.08)`;
  }

  // Наезд блока 03 — WORKS
  if (workCard) {
    const rect = workCard.getBoundingClientRect();

    const progress = Math.max(
      0,
      Math.min(1, (window.innerHeight - rect.top) / window.innerHeight)
    );

    workCard.style.transform =
      `translateY(${(1 - progress) * 18}vh)`;
  }
}

window.addEventListener('scroll', parallax, { passive: true });
parallax();
