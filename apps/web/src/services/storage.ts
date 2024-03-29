const STORAGE_KEY_AUTH = 'auth';
const STORAGE_KEY_USER = 'user';

const setAuthStorage = (authData: string) => {
  localStorage.setItem(STORAGE_KEY_AUTH, authData);
};
const getAuthStorage = () => localStorage.getItem(STORAGE_KEY_AUTH);
const clearAuthStorage = () => {
  localStorage.removeItem(STORAGE_KEY_AUTH);
};

const setUserStorage = (userData: any) => {
  localStorage.setItem(STORAGE_KEY_USER, userData);
};
const getUserStorage = () => localStorage.getItem(STORAGE_KEY_USER);
const clearUserStorage = () => {
  localStorage.removeItem(STORAGE_KEY_USER);
};

export {
  clearAuthStorage,
  clearUserStorage,
  getAuthStorage,
  getUserStorage,
  setAuthStorage,
  setUserStorage,
};
