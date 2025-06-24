import { isTabKey } from './utils';

const footer = document.querySelector('.footer');
const footerElements = Array.from(footer.children);
const links = [];
let isInFooter = false;

const getGridAreaInfo = (element) => {
  const gridArea = window.getComputedStyle(element).getPropertyValue('grid-area');
  const values = gridArea.split('/').map((value) => parseInt(value.trim(), 10));

  if (values.length !== 4 || values.some(isNaN)) {
    return { rowStart: NaN, columnStart: NaN };
  }

  return {
    rowStart: values[0],
    columnStart: values[1],
  };
};

footerElements.sort((a, b) => {
  const areaA = getGridAreaInfo(a);
  const areaB = getGridAreaInfo(b);

  const rowA = areaA.rowStart;
  const rowB = areaB.rowStart;
  const colA = areaA.columnStart;
  const colB = areaB.columnStart;

  if (rowA !== rowB) {
    return rowA - rowB;
  } else {
    return colA - colB;
  }
});

footerElements.forEach((element) => {
  links.push(...Array.from(element.querySelectorAll('a, button')));
});

const checkFooterFocus = () => {
  footer.addEventListener('keydown', (evt) => {
    if (isTabKey(evt) && evt.shiftKey && document.activeElement === links[0]) {
      links[0].setAttribute('tabindex', '0');
    }
  });

  footer.addEventListener('focusin', () => {
    if (!isInFooter) {
      links.forEach((link, index) => {
        link.setAttribute('tabindex', `${index + 1}`);
      });
      isInFooter = true;
    }
  });

  footer.addEventListener('focusout', (evt) => {
    if (evt.relatedTarget === null || !footer.contains(evt.relatedTarget)) {
      links.forEach((link) => {
        link.setAttribute('tabindex', '0');
      });
      isInFooter = false;
    }
  });
};

export { checkFooterFocus };
