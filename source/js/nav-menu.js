const nav = document.querySelector('.nav');
const navButtons = nav.querySelectorAll('.nav__button');
const navSubLinks = nav.querySelectorAll('.nav__sub-link');

navSubLinks.forEach((subLink) => {
  subLink.setAttribute('tabindex', '-1');
});

const openSubMenu = (item) => {
  const subLinks = item.querySelectorAll('.nav__sub-link');
  const menuGroup = item.querySelector('.nav__sub-list');

  item.classList.add('nav__item--open');
  menuGroup.style.maxHeight = `${menuGroup.scrollHeight}px`;

  subLinks.forEach((subLink) => {
    subLink.setAttribute('tabindex', '0');
  });
};

const closeSubMenu = (item) => {
  const subLinks = item.querySelectorAll('.nav__sub-link');
  const menuGroup = item.querySelector('.nav__sub-list');

  item.classList.remove('nav__item--open');
  menuGroup.style.maxHeight = null;

  subLinks.forEach((subLink) => {
    subLink.setAttribute('tabindex', '-1');
  });
};

const onNavSubButtonClick = (evt) => {
  const currentItem = evt.target.closest('.nav__item');

  if (currentItem.classList.contains('nav__item--open')) {
    closeSubMenu(currentItem);
  } else {
    openSubMenu(currentItem);
  }
};

const setNavToggles = () => {
  navButtons.forEach((button) => {
    button.addEventListener('click', onNavSubButtonClick);
  });
};

const removeNavToggles = () => {
  navButtons.forEach((button) => {
    button.removeEventListener('click', onNavSubButtonClick);
  });
};

export { closeSubMenu, setNavToggles, removeNavToggles };
