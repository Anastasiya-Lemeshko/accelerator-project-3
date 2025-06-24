import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { Scrollbar } from 'swiper/modules';
import { debounce } from './utils.js';

let reviewsSwiper = null;

const initReviewsSwiper = () => {
  reviewsSwiper = new Swiper('.reviews__swiper', {
    modules: [Navigation, Scrollbar],
    direction: 'horizontal',
    slideActiveClass: 'reviews__slide--active',
    slidesPerView: 1,
    allowTouchMove: true,
    autoHeight: true,

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
        autoHeight: true,
      },

      768: {
        slidesPerView: 'auto',
        spaceBetween: 30,
        autoHeight: false,
      },

      1440: {
        slidesPerView: 2,
        spaceBetween: 32,
        autoHeight: false,
      },
    },

    scrollbar: {
      el: '.reviews__scrollbar',
      draggable: true,
      dragClass: 'reviews__scrollbar-drag',
    },

    navigation: {
      nextEl: '.reviews__button--next',
      prevEl: '.reviews__button--prev',
    },
  });
};

const destroyReviewsSwiper = () => {
  if (reviewsSwiper) {
    reviewsSwiper.destroy();
    reviewsSwiper = null;
  }
};

const updateAutoHeight = () => {
  destroyReviewsSwiper();
  initReviewsSwiper();
};

const debouncedUpdateAutoHeight = debounce(updateAutoHeight, 50);

window.addEventListener('resize', debouncedUpdateAutoHeight);

export { initReviewsSwiper };
