import {
  isEscapeKey,
  isArrowDownKey,
  isArrowUpKey,
  isEnterKey,
} from './utils.js';

const selects = document.querySelectorAll('.select');

const renderCustomSelect = () => {
  selects.forEach((select) => {
    const selectButton = select.querySelector('.select__button');
    const originalSelect = select.querySelector('.select__original');
    const customSelect = document.createElement('div');

    const createCustomSelect = () => {
      customSelect.classList.add('select__list');

      Array.from(originalSelect.options).forEach((option) => {
        const optionItem = document.createElement('button');
        optionItem.classList.add('select__item');
        optionItem.setAttribute('type', 'button');
        optionItem.setAttribute('tabindex', '-1');
        optionItem.textContent = option.textContent;
        optionItem.dataset.value = option.value;
        customSelect.appendChild(optionItem);
      });

      const options = customSelect.querySelectorAll('.select__item');
      if (options[0].dataset.value === '') {
        options[0].style.padding = '0';
        options[0].style.minHeight = '0';
        options[0].style.maxHeight = '0';
        options[0].setAttribute('aria-label', 'Выберите значение');
        options[1].classList.add('select__item--first');
      }

      select.appendChild(customSelect);

      originalSelect.classList.add('visually-hidden');
      originalSelect.setAttribute('tabindex', '-1');
      customSelect.setAttribute('tabindex', '-1');
    };

    const setTabIndex = () => {
      const options = customSelect.querySelectorAll('.select__item');

      if (select.classList.contains('select--open')) {
        options.forEach((option) => {
          option.setAttribute('tabindex', '0');
        });

        options[0].focus();
        options[0].setAttribute('tabindex', '-1');
        customSelect.addEventListener('focusout', onSelectFocusOut);
      } else {
        options.forEach((option) => {
          option.setAttribute('tabindex', '-1');
        });

        customSelect.removeEventListener('focusout', onSelectFocusOut);
      }
    };

    const openSelect = () => {
      select.classList.add('select--open');
      setTabIndex();
      customSelect.addEventListener('click', onSelectOptionClick);
      document.addEventListener('keydown', onSelectKeydown);
      document.addEventListener('click', onDocumentClick);
    };

    const closeSelect = () => {
      select.classList.remove('select--open');
      setTabIndex();

      selectButton.focus();
      customSelect.removeEventListener('click', onSelectOptionClick);
      document.removeEventListener('keydown', onSelectKeydown);
      document.removeEventListener('click', onDocumentClick);
    };

    const chooseOption = (option) => {
      const selectedValue = option.dataset.value;
      const selectedText = option.textContent;

      selectButton.textContent = selectedText;
      originalSelect.value = selectedValue;
      originalSelect.dispatchEvent(new Event('change'));
      closeSelect();
    };

    const toggleSelect = () => {
      selectButton.addEventListener('click', () => {
        if (select.classList.contains('select--open')) {
          closeSelect();
        } else {
          openSelect();
        }
      });
    };

    function onSelectKeydown(evt) {
      const open = select.classList.contains('select--open');
      const options = Array.from(customSelect.querySelectorAll('button'));
      const currentIndex = options.indexOf(document.activeElement);

      if (!open) {
        return;
      }

      if (isArrowDownKey(evt)) {
        evt.preventDefault();

        if (currentIndex < options.length - 1) {
          options[currentIndex + 1].focus();
        } else {
          options[0].focus();
        }
        return;
      }

      if (isArrowUpKey(evt)) {
        evt.preventDefault();

        if (currentIndex > 0) {
          options[currentIndex - 1].focus();
        } else {
          options[options.length - 1].focus();
        }
        return;
      }

      if (isEnterKey(evt)) {
        evt.preventDefault();

        if (currentIndex > 0) {
          chooseOption(options[currentIndex]);
        }
        return;
      }

      if (isEscapeKey(evt)) {
        closeSelect();
      }

    }

    function onSelectOptionClick(evt) {
      if (evt.target.tagName === 'BUTTON') {
        chooseOption(evt.target);
      }
    }

    function onDocumentClick(evt) {
      if (!select.contains(evt.target)) {
        closeSelect();
      }
    }

    function onSelectFocusOut(evt) {
      if (evt.relatedTarget === null || !select.contains(evt.relatedTarget)) {
        closeSelect();
      }
    }

    originalSelect.addEventListener('keydown', (evt) => {
      if (evt.key === 'Enter') {
        if (document.activeElement === originalSelect) {
          openSelect();
          select.classList.remove('field--error');

        }
      }
    });

    createCustomSelect();
    toggleSelect();
  });
};

export { renderCustomSelect };
