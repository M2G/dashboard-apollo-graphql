import type { JSX } from 'react';
import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ROUTER_PATH from '@/constants/RouterPath';

const Home = lazy(() => import('@/containers/Home'));
const Users = lazy(() => import('@/containers/Users'));
const ChangePassword = lazy(() => import('@/containers/ChangePassword'));
const Profil = lazy(() => import('@/containers/Profil'));

function PrivateRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path={ROUTER_PATH.HOME} element={<Home />} />
      <Route path={ROUTER_PATH.USERS} element={<Users />} />
      <Route path={ROUTER_PATH.PROFIL} element={<Profil />} />
      <Route path={ROUTER_PATH.CHANGE_PASSWORD} element={<ChangePassword />} />
      <Route path="*" element={<Navigate to={ROUTER_PATH.HOME} replace />} />
    </Routes>
  );
}

export default PrivateRoutes;
