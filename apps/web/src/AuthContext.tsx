import type { Context, JSX, ReactNode } from 'react';

import { createContext, useContext, useMemo, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import {
  setRefreshTokenStorage,
  // clearAuthStorage,
  clearUserStorage,
  getAccessTokenStorage,
  getUserStorage,
  setAccessTokenStorage,
  setUserStorage,
} from '@/services/storage';

type AuthContextType = {
  activateAuth: (token: string) => void;
  isAuth: boolean | null | string;
  removeAuth: () => void;
  userData: {
    email: string;
    id: number;
  } | null;
};

//@see https://twitter.com/gregberge_/status/1750111230554153450/photo/1
// keep context private
export const AuthContext: Context<AuthContextType | undefined> = createContext<
  AuthContextType | undefined
>(undefined);

// export a consumer and throw if default value
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

interface AuthContextProps {
  children: ReactNode;
}
// export a provider
function Provider({ children }: AuthContextProps): JSX.Element {
  const [isAuth, setIsAuth] = useState<boolean | null | string>(() =>
    getAccessTokenStorage(),
  );

  const [userData, setUserData] = useState<boolean | null | string>(() =>
    getUserStorage(),
  );

  const value = {
    activateAuth: (auth) => {
      const decodedToken: {
        email: string;
        id: number;
      } = jwtDecode(auth.accessToken) || {};

      const user = {
        email: decodedToken.email,
        id: decodedToken.id,
      };
      setUserStorage(JSON.stringify(user));
      setUserData(JSON.stringify(user));
      setAccessTokenStorage(auth.accessToken);
      setRefreshTokenStorage(auth.refreshToken);
      setIsAuth(true);
    },
    isAuth,
    removeAuth: () => {
      setIsAuth(false);
      setUserStorage(null);
      clearUserStorage();
      // clearAuthStorage();
    },
    userData: userData ? JSON.parse(userData as string) : null,
  };

  const authValue = useMemo(() => value, [value]);

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export default { Consumer: AuthContext.Consumer, Provider };
