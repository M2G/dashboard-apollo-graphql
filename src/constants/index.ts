import { getAuthStorage } from 'services/storage';
import ROUTER_PATH from './RouterPath';

const authData = getAuthStorage();

// const token = authData ? JSON.parse(authData).auth_token : '';

const token = authData ?? '';

export default {
  GLOBAL_VAR: {
    token,
  },
  ROUTER_PATH,
};
