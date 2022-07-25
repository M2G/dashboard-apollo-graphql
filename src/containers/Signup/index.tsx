import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { signupUserAction } from 'store/signup/actions';
import { INITIAL_VALUES } from './constants';
import SignupView from './Signup';

function Signin() {
  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (e: any) => dispatch(signupUserAction(e)),
    [dispatch],
  );

  return <SignupView initialValues={INITIAL_VALUES} onSubmit={onSubmit} />;
}

export default Signin;
