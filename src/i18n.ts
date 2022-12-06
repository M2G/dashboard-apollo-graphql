import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'Add user': 'Add user',
    },
  },
  fr: {
    translation: {
      'Add user': 'Ajouter un utilisateur',
    },
  },
};

(i18n as any).use(initReactI18next).init({
  interpolation: {
    escapeValue: false,
  },
  keySeparator: false,
  lng: 'fr',
  resources,
});

export default i18n;
