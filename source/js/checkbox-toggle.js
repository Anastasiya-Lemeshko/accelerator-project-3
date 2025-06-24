const allCheckbox = document.querySelectorAll('input[type="checkbox"]');

const toggleCheckbox = () => {
  allCheckbox.forEach((checkbox) => {
    checkbox.addEventListener('keydown', (evt) => {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        const control = evt.target.closest('.control');

        if (checkbox.checked) {
          checkbox.checked = false;
        } else {
          checkbox.checked = true;
          control.classList.remove('control--error');
        }
      }
    });
  });
};

export { toggleCheckbox };
