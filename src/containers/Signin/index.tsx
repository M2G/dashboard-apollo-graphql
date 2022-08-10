import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import Signin from './Signin';

function SigninPage() {
  const { activateAuth }: any = useContext(AuthContext);
  return <Signin activateAuth={activateAuth} />;
}

export default SigninPage;
