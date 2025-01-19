export const defaultLocale = 'en';

export const timeZone = 'Europe/Amsterdam';

export const locales = [defaultLocale, 'zh', 'ru'] as const;

export const localesMap = [
  { key: 'en', title: 'English' },
  { key: 'zh', title: '中文' },
  { key: 'ru', title: 'Русский' },
];
