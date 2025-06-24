import {
  isEscapeKey,
  isTabKey,
  getScrollWidth
} from './utils.js';

const aboutButton = document.querySelector('.about__button');
const modal = document.querySelector('.modal');
const modalContainer = modal.querySelector('.modal__container');
const modalCloseButton = modal.querySelector('.modal__close-button');
const modalSelect = modal.querySelector('.modal__item--select');

const focusableElements = Array.from(modal.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'));
const firstFocusableElement = focusableElements[0];
const lastFocusableElement = focusableElements[focusableElements.length - 1];

let scrollSize = 0;

const openModal = () => {
  modal.classList.remove('modal--close');
  modalCloseButton.addEventListener('click', onModalCloseButtonClick);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('page__scroll-lock');
  modalCloseButton.focus();
  modal.addEventListener('keydown', loopFocus);

  scrollSize = getScrollWidth();
  document.body.style.paddingRight = `${scrollSize}px`;

};

const closeModal = () => {
  modal.classList.add('modal--close');
  document.body.classList.remove('page__scroll-lock');
  document.body.style.paddingRight = 0;
  modalCloseButton.removeEventListener('click', onModalCloseButtonClick);
  modal.removeEventListener('keydown', loopFocus);
  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  aboutButton.focus();
};

const toggleModal = () => {
  aboutButton.addEventListener('click', () => {
    openModal();
  });
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (!modalSelect.classList.contains('select--open')) {
      closeModal();
    }
  }
}

function onModalCloseButtonClick() {
  closeModal();
}

function onDocumentClick(evt) {
  if ((document.activeElement !== aboutButton) && (document.activeElement !== modalCloseButton) && !modalSelect.contains(document.activeElement) && !modalContainer.contains(evt.target)) {
    closeModal();
  }
}

function loopFocus(evt) {
  if (!isTabKey(evt)) {
    return;
  }

  if (isTabKey(evt) && evt.shiftKey && document.activeElement === firstFocusableElement) {
    evt.preventDefault();
    lastFocusableElement.focus();
  } else if (isTabKey(evt) && !evt.shiftKey && document.activeElement === lastFocusableElement) {
    evt.preventDefault();
    firstFocusableElement.focus();
  }
}

export { toggleModal, closeModal };
