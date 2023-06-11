import type { JSX } from 'react';

import { Suspense, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import TopLineLoading from 'components/Loading/TopLineLoading';
import { AuthContext } from '../AuthContext';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

/**
 * Top level application router
 *
 * @returns {Component}
 */

interface Auth {
  isAuth: boolean;
  userData: { id: number };
}

function Router(): JSX.Element {
  const { isAuth } = useContext(AuthContext) as Auth;
  const { userData } = useContext(AuthContext) as Auth;

  const userId = userData?.id;

  return (
    <main>
      <Suspense fallback={<TopLineLoading />}>
        <Routes>
          {isAuth && userId ? (
            <Route element={<PrivateRoutes />} path="/*" />
          ) : (
            <Route element={<PublicRoutes />} path="/*" />
          )}
        </Routes>
      </Suspense>
    </main>
  );
}

export default Router;
