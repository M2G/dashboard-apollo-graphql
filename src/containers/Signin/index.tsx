import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import Signin from './Signin';

export function Login() {
  const { activateAuth }: any = useContext(AuthContext);
  return <Signin activateAuth={activateAuth} />;
}
