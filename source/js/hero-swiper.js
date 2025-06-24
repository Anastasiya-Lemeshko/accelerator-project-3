import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import {
  setSlidesTabIndex,
  debounce
} from './utils.js';
import { SLIDES_COUNT } from './constants.js';
import { addActiveView } from './add-active-view';

const hero = document.querySelector('.hero');
const heroPagination = hero.querySelector('.hero__swiper-pagination');
const heroBulletsContainers = hero.querySelectorAll('.hero__bullets-wrapper');
let heroSwiper = null;

const movePagination = (swiper) => {
  const activeSlide = swiper.slides[swiper.activeIndex];
  const bulletsWrapper = activeSlide.querySelector('.hero__bullets-wrapper');

  if (heroPagination && !bulletsWrapper.contains(heroPagination)) {
    bulletsWrapper.appendChild(heroPagination);
  }
};

const initHeroSwiper = () => {
  heroSwiper = new Swiper('.hero__swiper', {
    modules: [Pagination],
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    speed: 500,
    autoHeight: true,
    slideActiveClass: 'hero__slide--active',
    allowTouchMove: true,

    breakpoints: {
      320: {
        speed: 500,
        allowTouchMove: true,
      },

      768: {
        speed: 700,
        allowTouchMove: true,
      },

      1440: {
        allowTouchMove: false,
        speed: 800,
      }
    },

    pagination: {
      el: '.hero__swiper-pagination',
      bulletElement: 'button',
      bulletClass: 'hero__pagination-bullet',
      bulletActiveClass: 'hero__pagination-bullet--active',
      clickable: true,
      renderBullet: function (index, className) {
        return `<button type="button" class="${className}"><span class="visually-hidden">Слайд ${index + 1}</span></button>`;
      },
    },

    on: {
      init: function () {
        movePagination(this);
      },
      slideChange: function () {
        movePagination(this);
        setSlidesTabIndex(this, SLIDES_COUNT.hero);
      },
    },
  });
};

const setBulletsContainerSize = () => {
  heroBulletsContainers.forEach((container) => {
    container.style.minWidth = `${heroPagination.offsetWidth}px`;
    container.style.minHeight = `${heroPagination.offsetHeight}px`;
  });
};

const setActiveHeroView = () => {
  if (heroSwiper) {
    const heroLinks = hero.querySelectorAll('a');

    const addHeroActiveStyles = (element) => {
      element.classList.add('hero__link--active');
    };

    const removeHeroActiveStyles = (element) => {
      element.classList.remove('hero__link--active');
    };

    const addHeroHoverStyles = (element) => {
      element.classList.add('hero__link--hover');
    };

    const removeHeroHoverStyles = (element) => {
      element.classList.remove('hero__link--hover');
    };

    addActiveView(heroLinks, addHeroActiveStyles, removeHeroActiveStyles, addHeroHoverStyles, removeHeroHoverStyles);
  }
};

const focusActiveSlide = () => {
  const bullets = hero.querySelectorAll('.hero__pagination-bullet');

  bullets.forEach((bullet) => {
    bullet.addEventListener('click', () => {
      setTimeout(() => {
        const activeBullet = hero.querySelector('.hero__pagination-bullet--active');
        activeBullet.classList.add('hero__pagination-bullet--focus');
        activeBullet.focus();
      }, 1000);
    });

    bullet.addEventListener('focusout', () => {
      if (bullet.classList.contains('hero__pagination-bullet--focus')) {
        bullet.classList.remove('hero__pagination-bullet--focus');
      }
    });
  });
};

const debouncedSetBulletsContainerSize = debounce(setBulletsContainerSize, 50);

window.addEventListener('resize', debouncedSetBulletsContainerSize);

export { initHeroSwiper, setBulletsContainerSize, setActiveHeroView, focusActiveSlide };
