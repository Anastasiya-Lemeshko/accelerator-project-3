import {
  TABLET_WIDTH,
  DESKTOP_WIDTH,
  NEWS_SPACE_BETWEEN,
  SLIDES_COUNT,
  PREVIOUS_BULLETS_COUNT,
} from './constants.js';
import { isTabKey } from './utils.js';

const news = document.querySelector('.news');
const newsSwiperContainer = news.querySelector('.news__swiper-container');
const newsPagination = news.querySelector('.news__swiper-pagination');
const newsButtons = news.querySelectorAll('.news__button');

const setSlideHeight = () => {
  const allSlides = news.querySelectorAll('.news__slide');

  const topSlides = [];
  const bottomSlides = [];
  const topSlidesHeight = [];
  const bottomSlidesHeight = [];

  if (!DESKTOP_WIDTH.matches) {
    allSlides.forEach((slide, index) => {

      let isTopSlide = (index % SLIDES_COUNT.news.mobile === 0);

      if (TABLET_WIDTH.matches) {
        isTopSlide = (index % SLIDES_COUNT.news.tablet === 0 || index % SLIDES_COUNT.news.tablet === 1);
      }

      slide.style.maxHeight = '';

      if (isTopSlide) {
        topSlides.push(slide);
        topSlidesHeight.push(slide.scrollHeight);
      } else {
        bottomSlides.push(slide);
        bottomSlidesHeight.push(slide.scrollHeight);
      }
    });
  }

  const maxTopHeight = Math.max(...topSlidesHeight) - 2;
  const maxBottomHeight = Math.max(...bottomSlidesHeight) - 2;

  setTimeout(() => {
    topSlides.forEach((slide) => {
      slide.style.maxHeight = `${maxTopHeight}px`;
      slide.style.height = `${maxTopHeight}px`;
      slide.style.display = 'flex';
    });

    bottomSlides.forEach((slide) => {
      slide.style.maxHeight = `${maxBottomHeight}px`;
      slide.style.height = `${maxBottomHeight}px`;
      slide.style.display = 'flex';
    });
  }, 50);

  if (DESKTOP_WIDTH.matches) {
    newsSwiperContainer.style.height = `${maxTopHeight + maxBottomHeight + NEWS_SPACE_BETWEEN.desktop}px`;
  } else if (TABLET_WIDTH.matches) {
    newsSwiperContainer.style.height = `${maxTopHeight + maxBottomHeight + NEWS_SPACE_BETWEEN.tablet}px`;
  } else {
    newsSwiperContainer.style.height = `${maxTopHeight + maxBottomHeight + NEWS_SPACE_BETWEEN.mobile}px`;
  }
};

const checkVisibleSlides = () => {
  if (DESKTOP_WIDTH.matches) {
    return SLIDES_COUNT.news.desktop;
  } else if (TABLET_WIDTH.matches) {
    return SLIDES_COUNT.news.tablet;
  }
  return SLIDES_COUNT.news.mobile;
};

const onNavButtonClick = (evt) => {
  const bullets = news.querySelectorAll('.news__pagination-bullet');
  const bulletsArray = Array.from(bullets);
  const activeBullet = newsPagination.querySelector('.news__pagination-bullet--active');
  const indexActiveBullet = bulletsArray.indexOf(activeBullet);
  const bulletWidth = activeBullet.offsetWidth;
  const bulletGap = parseInt(getComputedStyle(newsPagination).gap, 10);

  let sideIndex = PREVIOUS_BULLETS_COUNT - 1;

  if (evt.target.classList.contains('news__button--prev')) {
    sideIndex = PREVIOUS_BULLETS_COUNT;
  }

  if (evt.target.classList.contains('news__button--next') && indexActiveBullet > sideIndex && indexActiveBullet < bullets.length - 2) {
    newsPagination.style.transform = `translateX(${(bulletWidth + bulletGap) * -1 * (indexActiveBullet - PREVIOUS_BULLETS_COUNT + 1)}px)`;
  }

  if (evt.target.classList.contains('news__button--prev') && indexActiveBullet > sideIndex && indexActiveBullet < bullets.length) {
    newsPagination.style.transform = `translateX(${(bulletWidth + bulletGap) * -1 * (indexActiveBullet - PREVIOUS_BULLETS_COUNT - 1)}px)`;
  }
};

const onPaginationFocusout = (evt) => {
  if (evt.relatedTarget === null || !newsPagination.contains(evt.relatedTarget)) {
    newsPagination.style.transform = 'translateX(0)';
  }
};

const bulletUpdate = () => {
  const swiperContainer = news.querySelector('.news__swiper-container');
  const bullets = news.querySelectorAll('.news__pagination-bullet');
  const bulletsArray = Array.from(bullets);

  newsPagination.style.transform = 'translateX(0)';

  newsButtons.forEach((button) => {
    button.addEventListener('click', onNavButtonClick);
  });

  newsPagination.addEventListener('keydown', (evt) => {
    const activeBullet = document.activeElement;
    const indexActiveBullet = bulletsArray.indexOf(activeBullet);
    const bulletWidth = activeBullet.offsetWidth;
    const bulletGap = parseInt(getComputedStyle(newsPagination).gap, 10);

    if (isTabKey(evt) && indexActiveBullet > 1 && indexActiveBullet < bullets.length - 2) {
      newsPagination.style.transform = `translateX(${(bulletWidth + bulletGap) * -1 * (indexActiveBullet + 1 - PREVIOUS_BULLETS_COUNT)}px)`;
    }

    if (isTabKey(evt) && evt.shiftKey) {
      if (indexActiveBullet > 2 && indexActiveBullet < bullets.length) {
        newsPagination.style.transform = `translateX(${(bulletWidth + bulletGap) * -1 * (indexActiveBullet - 1 - PREVIOUS_BULLETS_COUNT)}px)`;
      } else if (indexActiveBullet <= 2) {
        newsPagination.style.transform = 'translateX(0)';
      }
    }
  });

  newsPagination.addEventListener('focusout', onPaginationFocusout);

  let startX = 0;

  swiperContainer.addEventListener('touchstart', (evt) => {
    startX = evt.touches[0].clientX;
  });

  swiperContainer.addEventListener('touchend', (evt) => {
    const endX = evt.changedTouches[0].clientX;
    const deltaX = endX - startX;

    const activeBullet = newsPagination.querySelector('.news__pagination-bullet--active');
    const indexActiveBullet = bulletsArray.indexOf(activeBullet);
    const bulletWidth = activeBullet.offsetWidth;
    const bulletGap = parseInt(getComputedStyle(newsPagination).gap, 10);

    if (deltaX <= 0 && indexActiveBullet > 1 && indexActiveBullet < bullets.length - 2) {
      newsPagination.style.transform = `translateX(${(bulletWidth + bulletGap) * -1 * (indexActiveBullet + 1 - PREVIOUS_BULLETS_COUNT)}px)`;
    }

    if (deltaX > 0 && indexActiveBullet > 2 && indexActiveBullet < bullets.length - 1) {
      newsPagination.style.transform = `translateX(${(bulletWidth + bulletGap) * -1 * (indexActiveBullet - 1 - PREVIOUS_BULLETS_COUNT)}px)`;
    }
  });

  bullets.forEach((bullet) => {
    bullet.addEventListener('click', (evt) => {
      const indexClickedButton = bulletsArray.indexOf(evt.target);
      const bulletWidth = evt.target.offsetWidth;
      const bulletGap = parseInt(getComputedStyle(newsPagination).gap, 10);

      if (indexClickedButton > PREVIOUS_BULLETS_COUNT && indexClickedButton !== bullets.length - 1) {
        newsPagination.style.transform = `translateX(${(bulletWidth + bulletGap) * -1 * (indexClickedButton - PREVIOUS_BULLETS_COUNT)}px)`;
      }

      if (indexClickedButton <= PREVIOUS_BULLETS_COUNT) {
        newsPagination.style.transform = 'translateX(0)';
      }
    });
  });
};

export {
  setSlideHeight,
  checkVisibleSlides,
  bulletUpdate,
};
