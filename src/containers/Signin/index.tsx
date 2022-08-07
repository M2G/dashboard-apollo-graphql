/*eslint-disable*/
import { useCallback } from 'react';
import { gql, useMutation } from "@apollo/client";
// import { useNavigate } from 'react-router-dom';
import { INITIAL_VALUES } from './constants';
import SigninView from './Signin';
//import { setAuthStorage } from 'services/storage';

const SIGNIN_MUTATION = gql`
    mutation signin(
        $email: String!
        $password: String!
    ) {
        signin(input: { email: $email, password: $password })
    }
`;

function Signin({ activateAuth }) {
  //const navigate = useNavigate();
  const [signin] = useMutation(SIGNIN_MUTATION, {
    onCompleted: ({ login }: { login:  string; }) => {

      console.log('useMutation', login);
      activateAuth(login);
      //setAuthStorage(login);
      //navigate('/');
    },
    onError: () => {

    }
  });

  const onSubmit = useCallback(async (formData: any) => {
    await signin(
      {
        variables: {
        email: formData.email,
        password: formData.password,
    }});
  }, []);

  return <SigninView initialValues={INITIAL_VALUES} onSubmit={onSubmit} />;
}

export default Signin;
