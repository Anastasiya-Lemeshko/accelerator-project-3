export const TABLET_WIDTH = window.matchMedia('(min-width: 768px)');
export const DESKTOP_WIDTH = window.matchMedia('(min-width: 1440px)');

export const NEWS_SPACE_BETWEEN = {
  'mobile': 20,
  'tablet': 30,
  'desktop': 32
};

export const SLIDES_COUNT = {
  'hero': 1,
  'news': {
    'mobile': 2,
    'tablet': 4,
    'desktop': 2
  },
};

export const NEWS_SLIDES_COUNT = {
  'mobile': 2,
  'tablet': 4,
  'desktop': 3
};

export const PREVIOUS_BULLETS_COUNT = 2;

export const ERROR_TEXT = {
  'empty': 'Это обязательное поле.',
  'phone': 'Номер телефона должен содержать не менее 11 цифр.',
  'name': 'Имя может содержать только буквы, пробелы и дефис.',
  'select': 'Выберите один пункт из списка.',
  'checkbox': 'Это обязательный пункт',
  'default': 'Неверный формат данных',
};

export const FIELD_STANDARD = {
  'phone': /(.*\d.*){11}/,
  'name': /^[a-zа-яё\s-]+$/i,
};
