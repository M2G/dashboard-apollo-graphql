import type { ReactNode, JSX } from 'react';
import { createContext, useState, useMemo } from 'react';

import jwt_decode from 'jwt-decode';
import {
  clearAuthStorage,
  clearUserStorage,
  getAuthStorage,
  getUserStorage,
  setAuthStorage,
  setUserStorage,
} from './services/storage';

export const AuthContext = createContext({});

interface AuthContextProps {
  children: ReactNode;
}

function Provider({ children }: AuthContextProps): JSX.Element {
  const [isAuth, setIsAuth] = useState<boolean | string | null>(() =>
    getAuthStorage(),
  );
  const [userData, setUserData] = useState<boolean | string | null>(() =>
    getUserStorage(),
  );

  const value = {
    isAuth,
    userData: userData ? JSON.parse(userData) : null,
    activateAuth: (token: string) => {
      const decodedToken: {
        email: string;
        id: number;
      } = jwt_decode(token) || {};

      const user = {
        email: decodedToken.email,
        id: decodedToken.id,
      };
      setUserStorage(JSON.stringify(user));
      setUserData(JSON.stringify(user));
      setAuthStorage(token);
      setIsAuth(true);
    },
    removeAuth: () => {
      setIsAuth(false);
      setUserStorage(null);
      clearUserStorage();
      clearAuthStorage();
    },
  };

  const authValue = useMemo(() => value, [value]);

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export default { Consumer: AuthContext.Consumer, Provider };
