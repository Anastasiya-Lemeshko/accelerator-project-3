import { isBackspaceKey } from './utils.js';
import {
  ERROR_TEXT,
  FIELD_STANDARD
} from './constants.js';
import { closeModal } from './modal.js';

const forms = document.querySelectorAll('form');

const inputValidate = (field) => {
  const input = field.querySelector('.field__input');
  const value = input.value.trim();

  if (value === '') {
    field.classList.add('field--error');
    input.setCustomValidity(ERROR_TEXT.empty);
    return false;
  }

  if (FIELD_STANDARD[input.name] && !FIELD_STANDARD[input.name].test(value)) {
    field.classList.add('field--error');
    input.setCustomValidity(ERROR_TEXT[input.name] || ERROR_TEXT.default);
    return false;
  }

  input.setCustomValidity('');
  return true;
};

const selectValidate = (field) => {
  const select = field.querySelector('select');

  if (select.value === '') {
    field.classList.add('field--error');
    select.setCustomValidity(ERROR_TEXT.select);
    return false;
  }

  select.setCustomValidity('');
  return true;
};

const checkboxValidate = (field) => {
  const checkbox = field.querySelector('input');

  if (!checkbox.checked) {
    field.classList.add('control--error');
    checkbox.setCustomValidity(ERROR_TEXT.checkbox);
    return false;
  }

  checkbox.setCustomValidity('');
  return true;
};

const setFormValidate = () => {
  forms.forEach((form) => {
    const formFields = form.querySelectorAll('.form-field');

    const validateForm = () => {
      const formIsValid = [];

      formFields.forEach((field) => {
        if (field.classList.contains('control')) {
          formIsValid.push(checkboxValidate(field));
        } else if (field.classList.contains('select')) {
          formIsValid.push(selectValidate(field));
        } else {
          formIsValid.push(inputValidate(field));
        }
      });

      return !formIsValid.includes(false);
    };

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const formIsValid = validateForm();

      if (formIsValid) {
        if (form.classList.contains('modal__form')) {
          closeModal();
          setTimeout(() => {
            form.submit();
            form.reset();
          }, 50);
        } else {
          form.submit();
          form.reset();
        }
      } else {
        form.reportValidity();
      }
    });

    formFields.forEach((field) => {

      if (field.classList.contains('control')) {
        const checkbox = field.querySelector('input');
        checkbox.addEventListener('change', () => {
          field.classList.remove('control--error');
        });
      } else if (field.classList.contains('select')) {
        const selectButton = field.querySelector('.select__button');
        selectButton.addEventListener('click', () => {
          field.classList.remove('field--error');
        });
      } else {
        const input = field.querySelector('.field__input');
        input.addEventListener('input', () => {
          input.setCustomValidity(' ');
          field.classList.remove('field--error');
          input.blur();
          input.focus();
        });
      }
    });
  });
};

const formatPhone = () => {
  forms.forEach((form) => {
    const phoneInput = form.querySelector('input[type="tel"]');

    phoneInput.addEventListener('input', () => {
      let input = phoneInput.value.replace(/\D/g, '');
      let formattedValue = '';

      if (input.length > 0) {
        formattedValue = '+7';

        if (input.length > 1) {
          formattedValue += ` (${input.substring(1, 4)}`;
        }

        if (input.length >= 4) {
          formattedValue += `)-${input.substring(4, 7)}`;
        }

        if (input.length >= 7) {
          formattedValue += `-${input.substring(7, 9)}`;
        }

        if (input.length >= 9) {
          formattedValue += `-${input.substring(9, 11)}`;
        }

        if (input.length > 11) {
          input = input.substring(0, 11);
          formattedValue = `+7 (${input.substring(1, 4)})-${input.substring(4, 7)}-${input.substring(7, 9)}-${input.substring(9, 11)}`;
        }
      }

      phoneInput.value = formattedValue;
    });

    phoneInput.addEventListener('keydown', (evt) => {
      if (isBackspaceKey(evt)) {
        const value = phoneInput.value;
        const selectionStart = phoneInput.selectionStart;

        if (selectionStart > 0) {
          const charBeforeCursor = value[selectionStart - 1];

          if (['-', '(', ')', ' '].includes(charBeforeCursor)) {
            phoneInput.value = value.substring(0, selectionStart - 1) + value.substring(selectionStart);
            evt.preventDefault();
            phoneInput.selectionStart = selectionStart - 1;
            phoneInput.selectionEnd = selectionStart - 1;
          }
        }
      }
    });
  });
};

const formatName = () => {
  forms.forEach((form) => {
    const nameInput = form.querySelector('input[name="name"]');

    nameInput.addEventListener('input', () => {
      nameInput.value = nameInput.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, '');
    });
  });
};

export { setFormValidate, formatPhone, formatName };
