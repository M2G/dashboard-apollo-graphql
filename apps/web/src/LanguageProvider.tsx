import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useTranslation } from 'react-i18next';

// @see https://github.com/hcoz/react-context-multilang/blob/master/src/containers/Language.js
export const LanguageContext = createContext({
  userLanguage: 'en',
});

export const useLanguage = () => useContext(LanguageContext);
export enum languageOptions {
  en = 'en',
  fr = 'fr',
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const defaultLanguage = window.localStorage.getItem('rcml-lang');
  const [userLanguage, setUserLanguage] = useState(defaultLanguage || 'en');

  const provider = {
    userLanguage,
    userLanguageChange: (selected: number | string) => {
      const newLanguage = languageOptions[selected] ? selected : 'en';
      setUserLanguage(newLanguage);
      window.localStorage.setItem('rcml-lang', newLanguage);
    },
  };

  useEffect(() => {
    i18n.changeLanguage(userLanguage);
  }, [i18n, userLanguage]);

  const value = useMemo(() => provider, [provider]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
