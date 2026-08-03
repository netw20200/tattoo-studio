/* =========================================================
   TATTOO STUDIO
   PARALLAX + REVEAL ANIMATIONS
   ========================================================= */

const bgOne = document.querySelector('.background-photo--one');
const bgTwo = document.querySelector('.background-photo--two');

const cards = document.querySelectorAll('.content-card');

const revealSections = document.querySelectorAll('.reveal-section');


/* =========================================================
   PARALLAX
   ========================================================= */

let ticking = false;

function updateParallax() {

  const scrollY = window.scrollY;

  /*
    Фон движется медленнее контента.

    Это и создаёт ощущение глубины.
  */

  if (bgOne) {

    const moveOne = scrollY * 0.16;

    bgOne.style.transform =
      `translate3d(0, ${moveOne}px, 0) scale(1.06)`;
  }


  if (bgTwo) {

    /*
      Второе фото движется немного иначе,
      чтобы между двумя слоями появился объём.
    */

    const moveTwo = (scrollY - window.innerHeight * .7) * 0.10;

    bgTwo.style.transform =
      `translate3d(0, ${moveTwo}px, 0) scale(1.06)`;

    /*
      Плавно переводим первый фон во второй.
    */

    const transitionStart = window.innerHeight * .55;

    const transitionEnd = window.innerHeight * 1.25;

    const progress =
      (scrollY - transitionStart) /
      (transitionEnd - transitionStart);

    const opacity =
      Math.max(0, Math.min(1, progress));

    bgTwo.style.opacity = opacity;
  }


  /*
    Первые три карточки получают
    очень лёгкое дополнительное движение.

    Оно небольшое специально,
    чтобы не было ощущения дёрганья.
  */

  cards.forEach((card, index) => {

    const rect = card.getBoundingClientRect();

    const center =
      rect.top + rect.height / 2;

    const viewportCenter =
      window.innerHeight / 2;

    const distance =
      center - viewportCenter;

    let strength = 0;

    if (index === 0) {
      strength = 0.025;
    }

    if (index === 1) {
      strength = 0.04;
    }

    if (index === 2) {
      strength = 0.055;
    }

    const movement =
      distance * strength;

    card.style.transform =
      `translate3d(0, ${movement}px, 0)`;
  }


  ticking = false;
}


function requestParallax() {

  if (!ticking) {

    window.requestAnimationFrame(updateParallax);

    ticking = true;
  }
}


window.addEventListener(
  'scroll',
  requestParallax,
  { passive: true }
);

window.addEventListener(
  'resize',
  requestParallax
);

updateParallax();


/* =========================================================
   04 / 05 REVEAL
   ========================================================= */

const revealObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add('is-visible');

        }

      });

    },

    {
      threshold: 0.18,

      rootMargin: '0px 0px -8% 0px'
    }

  );


revealSections.forEach((section) => {

  revealObserver.observe(section);

});
