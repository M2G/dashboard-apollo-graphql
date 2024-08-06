const STORAGE_KEY_ACCESS_TOKEN = 'accessToken';
const STORAGE_KEY_REFRESH_TOKEN = 'refreshToken';
const STORAGE_KEY_USER = 'user';

const setAccessTokenStorage = (authData: string) => {
  localStorage.setItem(STORAGE_KEY_ACCESS_TOKEN, authData);
};
const getAccessTokenStorage = () =>
  localStorage.getItem(STORAGE_KEY_ACCESS_TOKEN);
const clearAccessTokenStorage = () => {
  localStorage.removeItem(STORAGE_KEY_ACCESS_TOKEN);
};

const setRefreshTokenStorage = (authData: string) => {
  localStorage.setItem(STORAGE_KEY_REFRESH_TOKEN, authData);
};
const getRefreshTokenStorage = () =>
  localStorage.getItem(STORAGE_KEY_REFRESH_TOKEN);
const clearRefreshTokenStorage = () => {
  localStorage.removeItem(STORAGE_KEY_REFRESH_TOKEN);
};

const setUserStorage = (userData: any) => {
  localStorage.setItem(STORAGE_KEY_USER, userData);
};
const getUserStorage = () => localStorage.getItem(STORAGE_KEY_USER);
const clearUserStorage = () => {
  localStorage.removeItem(STORAGE_KEY_USER);
};

export {
  clearAccessTokenStorage,
  clearRefreshTokenStorage,
  clearUserStorage,
  getAccessTokenStorage,
  getRefreshTokenStorage,
  getUserStorage,
  setAccessTokenStorage,
  setRefreshTokenStorage,
  setUserStorage,
};
