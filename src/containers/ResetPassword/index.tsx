/*eslint-disable*/
import { useCallback } from 'react';
// import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
// import { authRecoverPasswordAction } from "store/auth/actions";
import { INITIAL_VALUES } from './constants';
import ResetPasswordView from './ResetPassword';

function ResetPassword() {
  let { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  if (!searchParams.has('token')) return;
  const token = searchParams.get('token');


  const onSubmit = useCallback((e: any) => {
      console.log('dispatch', { ...e, token });
      // dispatch(authRecoverPasswordAction({ ...e, token }));
  }, []);

  return (
    <ResetPasswordView initialValues={INITIAL_VALUES} onSubmit={onSubmit} />
  );
}

export default ResetPassword;
