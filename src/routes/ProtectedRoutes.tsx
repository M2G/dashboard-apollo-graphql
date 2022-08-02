/**
 * ProtectedRoutes
 */

// import { useSelector } from 'react-redux';
// import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ children }: any): JSX.Element {
  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PrivateRoute;
