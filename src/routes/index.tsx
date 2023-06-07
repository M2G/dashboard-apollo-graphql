import type { JSX } from 'react';
import { Suspense, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import TopLineLoading from 'components/Loading/TopLineLoading';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import { AuthContext } from '../AuthContext';

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
            <Route path="/*" element={<PrivateRoutes />} />
          ) : (
            <Route path="/*" element={<PublicRoutes />} />
          )}
        </Routes>
      </Suspense>
    </main>
  );
}

export default Router;
