/* eslint-disable */
import { Suspense, lazy, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import ROUTER_PATH from '../constants/RouterPath';

const Home = lazy(() => import('containers/Home'));
const Signin = lazy(() => import('containers/Signin'));
const Signup = lazy(() => import('containers/Signup'));
const ForgotPassword = lazy(() => import('containers/ForgotPassword'));
const ResetPassword = lazy(() => import('containers/ResetPassword'));

import TopLineLoading from 'components/Loading/TopLineLoading';
import { AuthContext } from '../AuthContext';

/**
 * Top level application router
 *
 * @returns {Component}
 */

const Router = () => {
  const { isAuth } = useContext(AuthContext);
  const { userData } = useContext(AuthContext);

  console.log('isAuth userData', {
    isAuth,
    userData,
  })

  return (
    <main>
      <Suspense fallback={<TopLineLoading />}>
        <Routes>
          <Route
            path={ROUTER_PATH.RESET_PASSWORD}
            element={<ResetPassword />}
          />
          <Route
            path={ROUTER_PATH.FORGOT_PASSWORD}
            element={<ForgotPassword />}
          />
          <Route
            path={ROUTER_PATH.SIGNIN}
            element={<Signin />}
          />
          {!isAuth && <Route
            path={ROUTER_PATH.SIGNUP}
            element={<Signup />}
          />}

          {isAuth && <Redirect from={ROUTER_PATH.SIGNIN} to='/' />}
          {isAuth && <Redirect from={ROUTER_PATH.SIGNUP} to='/' />}

          {isAuth && userData?._id &&
            <Route
              path={ROUTER_PATH.HOME}
              element={<Home />}
            />}
        </Routes>
      </Suspense>
    </main>
  );
}

export default Router;
