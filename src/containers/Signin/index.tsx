/*eslint-disable*/
import { useState } from 'react';
import {gql, useMutation} from "@apollo/client";
import {useNavigate} from 'react-router-dom';
// import { signinUserAction } from 'store/signin/actions';
import { INITIAL_VALUES } from './constants';
import SigninView from './Signin';

export const AUTH_TOKEN = 'AUTH_TOKEN';
export const LINKS_PER_PAGE = 5;

const LOGIN_MUTATION = gql`
    mutation LoginMutation(
        $email: String!
        $password: String!
    ) {
        login(email: $email, password: $password) {
            token
        }
    }
`;

function Signin() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const [signin] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ login }: { login: { token: string }}) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      navigate('/');
    },
    variables: {
      email: formState.email,
      password: formState.password,
    },
  });

  console.log('signin', signin);

  return <SigninView initialValues={INITIAL_VALUES} onSubmit={setFormState} />;
}

export default Signin;
