import Swiper from 'swiper';
import { Grid, Navigation, Pagination } from 'swiper/modules';
import { DESKTOP_WIDTH, NEWS_SPACE_BETWEEN } from './constants.js';
import { addActiveView } from './add-active-view.js';
import {
  setSlidesTabIndex,
  debounce
} from './utils.js';
import {
  setSlideHeight,
  checkVisibleSlides,
  bulletUpdate,
} from './news-swiper-settings.js';

const news = document.querySelector('.news');
const newsSwiperWrapper = news.querySelector('.news__swiper');
const newsSwiperContainer = news.querySelector('.news__swiper-container');
const newsTabList = news.querySelector('.news__tablinks');

let newsSwiper = null;

const mixSlides = (slides) => {
  const slidesArray = Array.from(slides);

  if (!slides || slides.length < 3 || !DESKTOP_WIDTH.matches) {
    return slidesArray;
  }

  const modifiedSlides = [];
  const emptySlides = [];
  let uniteSlide = null;
  let isSecondPush = true;

  for (let i = 0; i < slidesArray.length; i++) {
    if (i % 3 === 0) {
      modifiedSlides.push(slidesArray[i]);
    }

    if (i % 3 === 1) {
      uniteSlide = slidesArray[i];
      isSecondPush = true;
    }

    if (i % 3 === 2) {
      const newsCard = slidesArray[i].querySelector('div');
      const newsCardCopy = newsCard.cloneNode(true);
      uniteSlide.appendChild(newsCardCopy);
      modifiedSlides.push(uniteSlide);
      emptySlides.push(slidesArray[i]);
      isSecondPush = false;
    }
  }

  if (isSecondPush) {
    modifiedSlides.push(uniteSlide);
  }

  emptySlides.forEach((slide) => {
    slide.remove();
  });

  return modifiedSlides;
};

const initNewsSwiper = () => {
  newsSwiper = new Swiper('.news__swiper', {
    modules: [Grid, Navigation, Pagination],
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: NEWS_SPACE_BETWEEN.mobile,
    speed: 500,
    slideActiveClass: 'news__slide--active',
    allowTouchMove: true,

    breakpoints: {
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: NEWS_SPACE_BETWEEN.tablet,
        grid: {
          rows: 2,
          fill: 'row',
        },
        allowTouchMove: true,
      },

      1440: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: NEWS_SPACE_BETWEEN.desktop,
        grid: {
          rows: 1,
        },
        allowTouchMove: false,
      },
    },

    grid: {
      rows: 2,
      fill: 'column',
    },

    navigation: {
      nextEl: '.news__button--next',
      prevEl: '.news__button--prev',
    },

    pagination: {
      el: '.news__swiper-pagination',
      bulletElement: 'button',
      bulletClass: 'news__pagination-bullet',
      bulletActiveClass: 'news__pagination-bullet--active',
      clickable: true,
      renderBullet: function (index, className) {
        return `<button type="button" class="${className}">${index + 1}<span class="visually-hidden">Слайд ${index + 1}</span></button>`;
      },
    },

    on: {
      init: function () {
        setSlideHeight();
        const numberOfVisibleSlides = checkVisibleSlides();
        setSlidesTabIndex(this, numberOfVisibleSlides);
        bulletUpdate();
      },
      slideChange: function () {
        const numberOfVisibleSlides = checkVisibleSlides();
        setSlidesTabIndex(this, numberOfVisibleSlides);
      }
    }
  });
};

const setActiveNewsView = () => {
  if (newsSwiper) {
    const newsLinks = news.querySelectorAll('a');

    const addNewsActiveStyles = (element) => {
      element.classList.add('news__card-link--active');
    };

    const removeNewsActiveStyles = (element) => {
      element.classList.remove('news__card-link--active');
    };

    const addNewsHoverStyles = (element) => {
      element.classList.add('news__card-link--hover');
    };

    const removeNewsHoverStyles = (element) => {
      element.classList.remove('news__card-link--hover');
    };

    setTimeout(() => {
      addActiveView(newsLinks, addNewsActiveStyles, removeNewsActiveStyles, addNewsHoverStyles, removeNewsHoverStyles);
    }, 100);
  }
};

const destroyNewsSwiper = () => {
  if (newsSwiper) {
    newsSwiper.destroy();
    newsSwiper = null;
  }
};

const updateSwiper = () => {
  destroyNewsSwiper();
  initNewsSwiper();
};

const showMessage = (swiperHeight, container) => {
  const messageWrapper = document.createElement('div');
  const message = document.createElement('p');
  messageWrapper.classList.add('news__message-wrapper');
  messageWrapper.style.height = `${swiperHeight}px`;
  message.textContent = 'Пока нет новостей';
  message.classList.add('news__message');
  messageWrapper.appendChild(message);
  container.appendChild(messageWrapper);
};

const onTabClick = (evt) => {
  let topic = 'common';
  const currentTab = newsTabList.querySelector('.news__tablink--active');

  if (evt) {
    if (evt.target === currentTab || evt.target.tagName === 'UL') {
      return;
    }

    const activeTab = evt.target;
    topic = activeTab.dataset.question;
    currentTab.classList.remove('news__tablink--active');
    activeTab.classList.add('news__tablink--active');
  }

  const message = news.querySelector('.news__message-wrapper');
  let visibleSlides = [];

  const previosSwiper = newsSwiperWrapper.querySelector('.news__swiper-container');
  const originalSwiper = newsSwiperContainer.cloneNode(true);
  const swiperHeight = previosSwiper.scrollHeight;

  newsSwiperWrapper.removeChild(previosSwiper);
  newsSwiperWrapper.prepend(originalSwiper);

  const currentSlider = newsSwiperWrapper.querySelector('.news__swiper-container');
  const currentSlides = newsSwiperWrapper.querySelectorAll('.news__slide');

  destroyNewsSwiper();

  if (message) {
    message.remove();
  }

  currentSlides.forEach((slide) => {
    if (slide.dataset.topic === topic || topic === 'common') {
      visibleSlides.push(slide);
    }
  });

  currentSlides.forEach((slide) => {
    slide.remove();
  });

  visibleSlides = mixSlides(visibleSlides);

  if (!visibleSlides.length) {
    showMessage(swiperHeight, originalSwiper);
  } else if (visibleSlides.length % 2 === 0 && DESKTOP_WIDTH.matches) {
    visibleSlides[visibleSlides.length - 1].classList.add('news__slide--last');
  } else if (visibleSlides.length % 2 !== 0 && DESKTOP_WIDTH.matches) {
    const lastSlide = document.createElement('li');
    lastSlide.classList.add('news__slide', 'swiper-slide');
    lastSlide.setAttribute('aria-hidden', 'true');
    visibleSlides.push(lastSlide);
  }

  visibleSlides.forEach((slide) => {
    currentSlider.appendChild(slide);
  });

  initNewsSwiper();
};

newsTabList.addEventListener('click', onTabClick);

const debouncedUpdateSwiper = debounce(updateSwiper, 50);

window.addEventListener('resize', debouncedUpdateSwiper);

export { initNewsSwiper, setActiveNewsView, onTabClick };
