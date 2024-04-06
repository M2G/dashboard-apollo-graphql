import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/AuthContext';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

jest.mock('@/AuthContext', () => ({
  useAuth: jest.fn(),
  __esModule: true,
  default: React.createContext(),
}));

const tSpy = (_: any, parameters: string) => {
  if (parameters) {
    return parameters;
  }
  jest.fn((str) => str);
};

const changeLanguageSpy = jest.fn((lng: string) => new Promise(() => {}));
const useTranslationSpy = useTranslation as jest.Mock;
const useAuthSpy = useAuth as jest.Mock;

useTranslationSpy.mockReturnValue({
  i18n: {
    changeLanguage: changeLanguageSpy,
    language: 'en',
  },
  t: tSpy,
});

useAuthSpy.mockReturnValue({
  userData: {
    id: 1,
  },
  activateAuth: jest.fn(),
});
