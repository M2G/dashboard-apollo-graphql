/**
 * ProtectedRoutes
 */

import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ children }: any): JSX.Element {
  const { auth } = useSelector((state: any) => ({
    ...state,
    auth: state.auth_global,
  }));
  const location = useLocation();

  console.log('auth auth auth auth auth auth', auth);

  if (!auth?.isAuthenticated) return <Navigate to="/signin" state={{ from: location }} replace />;

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PrivateRoute;
