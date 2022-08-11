import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import Signin from './Signin';

function SigninPage() {
  console.log('AuthContext AuthContext', AuthContext);
  const { activateAuth }: any = useContext(AuthContext);
  console.log('SigninPage SigninPage', activateAuth);
  return <Signin activateAuth={activateAuth} />;
}

export default SigninPage;
