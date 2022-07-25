/*eslint-disable*/
import api from 'api';

const signinService = async (params: any) =>
  await api.post('/auth/authenticate', params);

export default signinService;
