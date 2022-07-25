/* eslint-disable */
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import ROUTER_PATH from '../constants/RouterPath';

import PrivateRoute from '../routes/ProtectedRoutes';

const Home = lazy(() => import('containers/Home'));
const Signin = lazy(() => import('containers/Signin'));
const Signup = lazy(() => import('containers/Signup'));
const ForgotPassword = lazy(() => import('containers/ForgotPassword'));
const ResetPassword = lazy(() => import('containers/ResetPassword'));

import TopLineLoading from 'components/Loading/TopLineLoading';

/**
 * Top level application router
 *
 * @returns {Component}
 */
const Router = () => (
  <main>
    <Routes>
      <Route
        path={ROUTER_PATH.RESET_PASSWORD}
        element={
          <Suspense fallback={<TopLineLoading />}>
            <ResetPassword />
          </Suspense>
        }
      />
      <Route
        path={ROUTER_PATH.FORGOT_PASSWORD}
        element={
          <Suspense fallback={<TopLineLoading />}>
            <ForgotPassword />
          </Suspense>
        }
      />
      <Route
        path={ROUTER_PATH.SIGNIN}
        element={
          <Suspense fallback={<TopLineLoading />}>
            <Signin />
          </Suspense>
        }
      />
      <Route
        path={ROUTER_PATH.SIGNUP}
        element={
          <Suspense fallback={<TopLineLoading />}>
            <Signup />
          </Suspense>
        }
      />
      <Route
        path={ROUTER_PATH.HOME}
        element={
          <Suspense fallback={<TopLineLoading />}>
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          </Suspense>
        }
      />
    </Routes>
  </main>
);

export default Router;
