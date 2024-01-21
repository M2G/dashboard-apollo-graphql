import type { Context, JSX, ReactNode } from 'react';

import { createContext, useContext, useMemo, useState } from 'react';
import {
  clearAuthStorage,
  clearUserStorage,
  getAuthStorage,
  getUserStorage,
  setAuthStorage,
  setUserStorage,
} from '@/services/storage';

import { jwtDecode } from 'jwt-decode';

export const AuthContext: Context<NonNullable<unknown>> = createContext({});

export const useAuth = () => useContext(AuthContext);

interface AuthContextProps {
  children: ReactNode;
}

function Provider({ children }: AuthContextProps): JSX.Element {
  const [isAuth, setIsAuth] = useState<boolean | null | string>(() =>
    getAuthStorage(),
  );
  const [userData, setUserData] = useState<boolean | null | string>(() =>
    getUserStorage(),
  );

  const value = {
    activateAuth: (token: string) => {
      const decodedToken: {
        email: string;
        id: number;
      } = jwtDecode(token) || {};

      const user = {
        email: decodedToken.email,
        id: decodedToken.id,
      };
      setUserStorage(JSON.stringify(user));
      setUserData(JSON.stringify(user));
      setAuthStorage(token);
      setIsAuth(true);
    },
    isAuth,
    removeAuth: () => {
      setIsAuth(false);
      setUserStorage(null);
      clearUserStorage();
      clearAuthStorage();
    },
    userData: userData ? JSON.parse(userData as string) : null,
  };

  const authValue = useMemo(() => value, [value]);

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export default { Consumer: AuthContext.Consumer, Provider };
