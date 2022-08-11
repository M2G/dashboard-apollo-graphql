/*eslint-disable*/
import { useCallback } from 'react';

// import { useNavigate } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { INITIAL_VALUES } from './constants';
import { SIGNIN_MUTATION } from '../../gql/mutations/auth';
import SigninForm from 'components/SinginForm';

function Signin({ activateAuth }: any) {
  console.log('activateAuth', activateAuth);
  //const navigate = useNavigate();
  const [signin] = useMutation(SIGNIN_MUTATION, {
    onCompleted: ({ signin }: { signin:  string; }) => {

      console.log('useMutation', signin);
      activateAuth(signin);
      // navigate('/');
    },
    onError: () => {

    }
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

  return <SigninForm initialValues={INITIAL_VALUES} onSubmit={handleSubmit} />;
}

export default Signin;
