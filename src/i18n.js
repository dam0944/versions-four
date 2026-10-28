import { createI18n } from 'vue-i18n';
import km from './locales/km.json';
import en from './locales/en.json';

const saved = typeof localStorage === 'undefined' ? null : localStorage.getItem('lang');
const browser = typeof navigator !== 'undefined' && navigator.language?.startsWith('km') ? 'km' : 'en';
const locale = saved === 'km' || saved === 'en' ? saved : browser;

export const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: 'en',
  messages: { km, en },
});