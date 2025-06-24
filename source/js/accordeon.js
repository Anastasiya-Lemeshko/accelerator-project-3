import { debounce } from './utils.js';

const openVisibleAccordeonContent = () => {
  const accordeonVisibleContent = document.querySelectorAll('.accordeon__item--active div');

  accordeonVisibleContent.forEach((element) => {
    element.style.maxHeight = `${element.scrollHeight }px`;
  });
};

const setAccordeonToggles = () => {
  const accordeonList = document.querySelectorAll('.accordeon');
  const accordeonItem = document.querySelector('.accordeon__item');
  const accordeonTitles = [];

  let activeClass = [...accordeonItem.classList].filter((item) => item.includes('__item') && !item.includes('--active') && !item.includes('accordeon'));
  activeClass += '--active';

  accordeonList.forEach((item) => {
    accordeonTitles.push(...item.querySelectorAll('.accordeon__item button'));
  });

  accordeonTitles.forEach((accordeonTitle) => {
    accordeonTitle.addEventListener('click', () => {
      const currentItem = accordeonTitle.closest('.accordeon__item');
      const currentContent = currentItem.querySelector('div');

      if (currentItem.classList.contains('accordeon__item--default-visible')) {
        currentItem.classList.remove('accordeon__item--default-visible');
      }

      currentItem.classList.toggle('accordeon__item--active');
      currentItem.classList.toggle(activeClass);

      if (currentItem.classList.contains('accordeon__item--active')) {
        currentContent.style.maxHeight = `${currentContent.scrollHeight }px`;
      } else {
        currentContent.style.maxHeight = null;
      }
    });
  });
};

const debouncedOpenVisibleAccordeonContent = debounce(openVisibleAccordeonContent, 20);

window.addEventListener('resize', debouncedOpenVisibleAccordeonContent);

export { openVisibleAccordeonContent, setAccordeonToggles };
