import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { signinUserAction } from 'store/signin/actions';
import { INITIAL_VALUES } from './constants';
import SigninView from './Signin';

function Signin() {
  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (e: any) => dispatch(signinUserAction(e)),
    [dispatch],
  );

  return <SigninView initialValues={INITIAL_VALUES} onSubmit={onSubmit} />;
}

export default Signin;
