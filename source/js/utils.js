const isEscapeKey = (evt) => evt.key === 'Escape';
const isBackspaceKey = (evt) => evt.key === 'Backspace';
const isArrowDownKey = (evt) => evt.key === 'ArrowDown';
const isArrowUpKey = (evt) => evt.key === 'ArrowUp';
const isEnterKey = (evt) => evt.key === 'Enter';
const isTabKey = (evt) => evt.key === 'Tab';

const getScrollWidth = () => {
  const div = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  document.body.append(div);

  const scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();

  return scrollWidth;
};

const findActiveSlides = (index, activeIndex, numberOfActiveSlides) => {
  for (let i = 0; i < numberOfActiveSlides; i++) {
    if (index === activeIndex + i) {
      return true;
    }
  }
  return false;
};

const setSlidesTabIndex = (swiper, countVisibleSlides) => {
  swiper.slides.forEach((slide, index) => {

    const isActive = findActiveSlides(index, swiper.activeIndex, countVisibleSlides);
    slide.querySelectorAll('a, button, input, textarea, select, [tabindex]')
      .forEach((el) => {
        el.tabIndex = isActive ? 0 : -1;
      });
  });
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  isEscapeKey,
  isBackspaceKey,
  isArrowDownKey,
  isArrowUpKey,
  isEnterKey,
  isTabKey,
  getScrollWidth,
  setSlidesTabIndex,
  debounce
};
