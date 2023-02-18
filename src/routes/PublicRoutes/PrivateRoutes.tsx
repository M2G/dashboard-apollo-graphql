import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import ROUTER_PATH from 'constants/RouterPath';

const Home = lazy(() => import('containers/Home'));
const ChangePassword = lazy(() => import('containers/ChangePassword'));
const Profil = lazy(() => import('containers/Profil'));

function PrivateRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path={ROUTER_PATH.HOME} element={<Home />} />
      <Route path={ROUTER_PATH.PROFIL} element={<Profil />} />
      <Route path={ROUTER_PATH.CHANGE_PASSWORD} element={<ChangePassword />} />
      <Route path="*" element={<Navigate to={ROUTER_PATH.HOME} replace />} />
    </Routes>
  );
}

export default PrivateRoutes;
