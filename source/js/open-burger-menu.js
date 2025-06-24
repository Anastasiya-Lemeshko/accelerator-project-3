import { closeSubMenu, removeNavToggles, setNavToggles } from './nav-menu.js';
import { isEscapeKey, getScrollWidth } from './utils.js';
export { closeSubMenu, setNavToggles, removeNavToggles } from './nav-menu.js';

const header = document.querySelector('.header-inner');
const nav = header.querySelector('.nav');
const burgerMenu = nav.querySelector('.nav__burger');
const navLinks = nav.querySelectorAll('.nav__link');
const navButtons = nav.querySelectorAll('.nav__button');
const subMenuItems = nav.querySelectorAll('.nav__item--sub-menu');

let scrollSize = 0;

const removeTabIndex = () => {
  navLinks.forEach((link) => {
    link.setAttribute('tabindex', '-1');
  });
  navButtons.forEach((button) => {
    button.setAttribute('tabindex', '-1');
  });
};

const setTabIndex = () => {
  navLinks.forEach((link) => {
    link.setAttribute('tabindex', '0');
  });
  navButtons.forEach((button) => {
    button.setAttribute('tabindex', '0');
  });
};

removeTabIndex();

const openMobileMenu = () => {
  header.classList.add('header-inner--menu-opened');
  nav.classList.add('nav--menu-opened');
  burgerMenu.classList.add('button--secondary');
  document.body.classList.add('page__scroll-lock');
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
  nav.addEventListener('focusout', onNavFocusOut);
  setTabIndex();
  setNavToggles();

  scrollSize = getScrollWidth();
  document.body.style.paddingRight = `${scrollSize}px`;
};

const closeMobileMenu = () => {
  header.classList.remove('header-inner--menu-opened');
  nav.classList.remove('nav--menu-opened');
  burgerMenu.classList.remove('button--secondary');
  document.body.classList.remove('page__scroll-lock');
  document.body.style.paddingRight = 0;
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
  nav.removeEventListener('focusout', onNavFocusOut);
  removeTabIndex();
  removeNavToggles();

  subMenuItems.forEach((item) => {
    closeSubMenu(item);
  });
};

const toggleBurgerMenu = () => {
  burgerMenu.addEventListener('click', () => {
    if (nav.classList.contains('nav--menu-opened')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMobileMenu();
  }
}

function onNavFocusOut(evt) {
  if (evt.relatedTarget === null || !nav.contains(evt.relatedTarget)) {
    closeMobileMenu();
  }
}

function onDocumentClick(evt) {
  if (!nav.contains(evt.target)) {
    closeMobileMenu();
  }
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    closeMobileMenu();
  });
});

export { toggleBurgerMenu };
