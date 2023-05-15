import type { JSX } from 'react';
import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ROUTER_PATH from 'constants/RouterPath';

const Signin = lazy(async () => import('containers/Signin'));
const Signup = lazy(async () => import('containers/Signup'));
const ForgotPassword = lazy(async () => import('containers/ForgotPassword'));
const ResetPassword = lazy(async () => import('containers/ResetPassword'));

function PublicRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path={ROUTER_PATH.RESET_PASSWORD} element={<ResetPassword />} />
      <Route path={ROUTER_PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTER_PATH.SIGNUP} element={<Signup />} />
      <Route path={ROUTER_PATH.SIGNIN} element={<Signin />} />
      <Route path="*" element={<Navigate to={ROUTER_PATH.SIGNIN} replace />} />
    </Routes>
  );
}

export default PublicRoutes;
