import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
    },
  },
  fr: {
    translation: {
      "Welcome to React": "Bienvenue à React et react-i18next",
    },
  },
};

(i18n as any).use(initReactI18next)
  .init({
    interpolation: {
      escapeValue: false,
    },
    keySeparator: false,
    lng: "en",
    resources,
  });

export default i18n;
