/*eslint-disable*/
import { useCallback } from 'react';
import { useMutation } from "@apollo/client";
import { INITIAL_VALUES } from './constants';
import { SIGNIN_MUTATION } from 'gql/mutations/auth';
import SiginForm from 'components/SigninForm';
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';


function Signin() {
  const { activateAuth }: any = useContext(AuthContext);
  const [signin] = useMutation(SIGNIN_MUTATION, {
    onCompleted: ({ signin }: { signin:  string; }) => activateAuth(signin)
  });

  const handleSubmit = useCallback(async (formData: any) => {
    await signin(
      {
        variables: {
          email: formData.email,
          password: formData.password,
        }
      }
    );
  }, []);

  return <SiginForm initialValues={INITIAL_VALUES} onSubmit={handleSubmit} />;
}

export default Signin;
