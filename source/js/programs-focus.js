import { TABLET_WIDTH } from './constants';
import {
  isTabKey,
  debounce
} from './utils';

const programs = document.querySelector('.programs');
const buttonNext = programs.querySelector('.programs__button--next');
const programsLinks = programs.querySelectorAll('.programs-card__link');
const programsButton = programs.querySelector('.programs__link');
let fromMobileWidth = false;

const onProgramsKeydown = (evt) => {
  if (isTabKey(evt) && !evt.shiftKey && document.activeElement === programsLinks[0]) {
    buttonNext.setAttribute('tabindex', `${programsLinks.length}`);
    programsButton.setAttribute('tabindex', `${programsLinks.length + 1}`);
    programsLinks.forEach((link, index) => {
      link.setAttribute('tabindex', `${index + 1}`);
    });
  }

  if (isTabKey(evt) && evt.shiftKey && document.activeElement === programsLinks[programsLinks.length - 1]) {
    buttonNext.setAttribute('tabindex', '0');
    programsButton.setAttribute('tabindex', '0');
    programsLinks.forEach((link) => {
      link.setAttribute('tabindex', '0');
    });
  }
};

const onProgramsButtonFocus = () => {
  programsButton.setAttribute('tabindex', '0');
};

const onProgramsFocusOut = (evt) => {
  if (evt.relatedTarget === null || !programs.contains(evt.relatedTarget)) {
    buttonNext.setAttribute('tabindex', '-1');
    programsButton.setAttribute('tabindex', '-1');
    programsLinks.forEach((link) => {
      link.setAttribute('tabindex', '0');
    });
  }
};

const setProgramsFocus = () => {
  if (TABLET_WIDTH.matches && fromMobileWidth) {
    buttonNext.setAttribute('tabindex', '0');
    programsButton.setAttribute('tabindex', '0');

    programs.removeEventListener('keydown', onProgramsKeydown);
    programsButton.removeEventListener('focus', onProgramsButtonFocus);
    programs.removeEventListener('focusout', onProgramsFocusOut);
    fromMobileWidth = false;
  }

  if (!TABLET_WIDTH.matches && !fromMobileWidth) {
    buttonNext.setAttribute('tabindex', '-1');
    programsButton.setAttribute('tabindex', '-1');
    fromMobileWidth = true;

    programs.addEventListener('keydown', onProgramsKeydown);
    programsButton.addEventListener('focus', onProgramsButtonFocus);
    programs.addEventListener('focusout', onProgramsFocusOut);
  }
};

const debouncedSetProgramsFocus = debounce(setProgramsFocus, 50);

window.addEventListener('resize', debouncedSetProgramsFocus);

export { setProgramsFocus };
