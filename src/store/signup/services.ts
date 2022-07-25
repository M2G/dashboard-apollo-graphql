/* eslint-disable */
import api from 'api';

function signupUserService(params: any) {
  return api.post('/auth/register', params);
}

export default signupUserService;
