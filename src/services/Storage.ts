/* eslint-disable */
const STORAGE_KEY_AUTH = 'auth';

const setAuthStorage = (authData: string) =>
  localStorage.setItem(STORAGE_KEY_AUTH, authData);
const getAuthStorage = () => localStorage.getItem(STORAGE_KEY_AUTH);
const clearAuthStorage = () => localStorage.removeItem(STORAGE_KEY_AUTH);


export {
  setAuthStorage,
  getAuthStorage,
  clearAuthStorage,
};
