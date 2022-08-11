/*eslint-disable*/
import { createContext, useState } from 'react';

import jwt_decode from "jwt-decode";
import {
  clearAuthStorage,
  clearUserStorage,
  getAuthStorage,
  getUserStorage,
  setAuthStorage,
  setUserStorage,
} from './services/storage';

export const AuthContext = createContext<Record<any, any>>({});

function Provider({ children }: any) {
  const [isAuth, setIsAuth] = useState<any>(() => getAuthStorage());
  const [userData, setUserData] = useState(() => getUserStorage());

  const value = {
    isAuth,
    userData,
    activateAuth: (token: any) => {
      console.log('token token token', token)

      const decodedToken: any = jwt_decode(token) || {};

      const userData = {
        email: decodedToken.email,
        _id: decodedToken._id,
      };
      setUserStorage(JSON.stringify(userData));
      setUserData(JSON.stringify(userData));
      setAuthStorage(token);
      setIsAuth(true);
    },
    removeAuth: () => {
      setIsAuth(false);
      setUserStorage(JSON.stringify({}));
      clearUserStorage();
      clearAuthStorage();
    },
  };

  console.log('AuthContext value', value)

  return <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
}

export default { Provider, Consumer: AuthContext.Consumer };
