/* eslint-disable */
import { JSX, Suspense, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import TopLineLoading from 'components/Loading/TopLineLoading';
import { PublicRoutes, PrivateRoutes } from 'routes/PublicRoutes';
import { AuthContext } from '../AuthContext';

/**
 * Top level application router
 *
 * @returns {Component}
 */

type Auth = {
  isAuth: boolean;
  userData: { id: number };
};

const Router = (): JSX.Element => {
  const { isAuth } = useContext(AuthContext) as Auth;
  const { userData } = useContext(AuthContext) as Auth;

  const userId = userData?.id;

  console.log('Router isAuth', isAuth);
  console.log('Router userId', userData);

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
};

export default Router;
