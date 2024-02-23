import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../en.json';
import fr from '../fr.json';

const resources = {
  en: en,
  fr: fr,
};

// @see https://github.com/i18next/react-i18next/blob/master/example/react/src/i18n.js
(i18n as any).use(initReactI18next).init({
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  // keySeparator: false,
  lng: 'en',
  resources,
  //ns: ['en'],
  //defaultNS: 'en',
});

export default i18n;
