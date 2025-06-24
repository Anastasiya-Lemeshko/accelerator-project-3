import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { Scrollbar } from 'swiper/modules';
import { addActiveView } from './add-active-view';

const programs = document.querySelector('.programs');

let programsSwiper = null;

const initProgramsSwiper = () => {
  programsSwiper = new Swiper('.programs__swiper', {
    modules: [Navigation, Scrollbar],
    direction: 'horizontal',
    slideActiveClass: 'programs__slide--active',
    slidesPerView: 1,
    spaceBetween: 20,
    allowTouchMove: true,

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      321: {
        slidesPerView: 'auto',
        spaceBetween: 20,
      },

      768: {
        slidesPerView: 'auto',
        spaceBetween: 30,
      },

      1440: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
    },

    scrollbar: {
      el: '.programs__scrollbar',
      draggable: true,
      dragClass: 'programs__scrollbar-drag',
    },

    navigation: {
      nextEl: '.programs__button--next',
      prevEl: '.programs__button--prev',
    },
  });
};

const setActiveProgramsView = () => {
  if (programsSwiper) {
    const programsLinks = programs.querySelectorAll('a');

    const addProgramsActiveStyles = (element) => {
      element.classList.add('programs-card__link--active');
    };

    const removeProgramsActiveStyles = (element) => {
      element.classList.remove('programs-card__link--active');
    };

    const addProgramsHoverStyles = (element) => {
      element.classList.add('programs-card__link--hover');
    };

    const removeProgramsHoverStyles = (element) => {
      element.classList.remove('programs-card__link--hover');
    };

    addActiveView(programsLinks, addProgramsActiveStyles, removeProgramsActiveStyles, addProgramsHoverStyles, removeProgramsHoverStyles);
  }
};

export { initProgramsSwiper, setActiveProgramsView };
