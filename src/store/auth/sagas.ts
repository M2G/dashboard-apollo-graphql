/* eslint-disable */
import {
  all,
  fork,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import {
  forgotPasswordService,
  userProfilService,
  updateUserProfilService,
  getUsersService,
  deleteUsersService,
  recoverPasswordService
} from './services';

import { AuthActionTypes } from './types';
import {
  authForgotPasswordError,
  authDeleteUserProfilSuccess,
  authDeleteUserProfilError,
  authGetUserProfilSuccess,
  authGetUserProfilError,
  authUpdateUserProfilSuccess,
  authUpdateUserProfilError,
  // authRequestErrorAction,
  authGetUsersProfilSuccess,
  authGetUsersProfilError,
  authRecoverPasswordSuccess,
  authRecoverPasswordError, authForgotPasswordSuccess,
} from './actions';
import { signoutUserAction } from 'store/signout/actions';
import { history } from 'index';
import Config from '../../constants';

export interface ResponseGenerator {
  config?:any,
  data?:any,
  headers?:any,
  request?:any,
  status?:number,
  statusText?:string
}

function* forgotPassword({ data }: any): any {
      try {
        const res: ResponseGenerator = yield call(forgotPasswordService, { ...data });

        yield put(authForgotPasswordSuccess({ ...res.data }));

    } catch (err: any) {

        if (err instanceof Error) {
          yield put(authForgotPasswordError({ ...(err.stack as any) }));
        }

        yield put(authForgotPasswordError("An unknown error occured."));
      }
}

function* recoverPassword({ data }: any): any {
    try {

      const res: ResponseGenerator = yield call(recoverPasswordService, { ...data });
      yield put(authRecoverPasswordSuccess({ ...res.data }));
      yield call(history?.replace, Config.ROUTER_PATH.HOME);

    } catch (err: any) {

      if (err instanceof Error) {
        yield put(authRecoverPasswordError({ ...(err.stack as any) }));
      }

      yield put(authRecoverPasswordError("An unknown error occured."));
    }
}

function* getUserProfil(params: { id: any }): any {
  try {

    const res: ResponseGenerator = yield call(userProfilService, params?.id);

    yield put(authGetUserProfilSuccess({ ...res.data }));

  } catch (err: any) {
    if (err?.response?.status === 401) {
    return yield put(signoutUserAction({  ...err.response.data.error }));
  }

    if (err instanceof Error) {
      return yield put(authGetUsersProfilError({ ...(err.stack as any) }));
    }

    yield put(authGetUserProfilError("An unknown error occured."));
  }
}

function* getUsersProfil(params: any): any {
  try {
  const search = params?.search ? params.search : '';
  const res = yield call(getUsersService, search);

  console.log('getUsersProfil getUsersProfil getUsersProfil', res)

    yield put(authGetUsersProfilSuccess({ search, ...res.data }));

  } catch (err: any) {

    console.log('err err err err err err err', err)

    if (err?.response?.status === 401) {
      return yield put(signoutUserAction({ ...err.response.data.error }));
    }

    if (err instanceof Error) {
      return yield put(authGetUsersProfilError({ ...(err.stack as any) }));
    }

    yield put(authGetUsersProfilError("An unknown error occured."));
  }
}

function* deleteUserProfil(params: any): any {
    try {
      yield call(deleteUsersService, params?.id);
      yield put(authDeleteUserProfilSuccess());
    } catch (err: any) {

      if (err?.response?.status === 401) {
        return yield put(signoutUserAction({ ...err.data.response.data.error }));
      }

      if (err instanceof Error) {
        yield put(authDeleteUserProfilError({ ...(err.stack as any) }));
      }

      yield put(authDeleteUserProfilError("An unknown error occured."));
    }
}

function* updateUserProfil({ data }: any): any {
  try {

    yield call(updateUserProfilService, { ...data });
    yield put(authUpdateUserProfilSuccess());

    } catch (err: any) {

      if (err?.response?.status === 401) {
        return yield put(signoutUserAction({ ...err.data.response.data.error }));
      }

      if (err instanceof Error) {
        yield put(authUpdateUserProfilError({ ...(err.stack as any) }));
      }

      yield put(authUpdateUserProfilError("An unknown error occured."));

  }

}

/*
function* updatePassword(api, action) {
  const { params } = action;

  const res = yield call(api.updatePassword, params);

  if (res.status && res.status.toString().indexOf('20') > -1) {
    const userData = yield select(AuthSelectors.getData);
    const newUserData = {
      ...userData.user,
      auth_token: res.data.token,
    };

    console.log('newUserData', newUserData);

    Config.GLOBAL_VAR.token = res?.data?.token;
    yield call(setAuthStorage, JSON.stringify(newUserData));
    yield put(AuthActions.updatePasswordSuccess(newUserData));
    // yield put(AuthActions.toggleDrawerPassword())
  } else if (res.status && res.status === 400) {
    const error = {
      message: [res.data.message],
    };

    yield put(signinUserError({ ...error, updatePassword: true }));
  } else {
    yield put(signinUserError({ ...res.data, updatePassword: true }));
  }
}
*/

function* watchRecoverPassword() {
  yield takeEvery(AuthActionTypes.AUTH_RECOVER_PASSWORD_REQUEST, recoverPassword);
}

function* watchForgotPassword() {
  yield takeEvery(AuthActionTypes.AUTH_FORGOT_PASSWORD_REQUEST, forgotPassword);
}

function* watchUser() {
  yield takeEvery(
    AuthActionTypes.AUTH_GET_USER_PROFIL_REQUEST as any,
    getUserProfil
  );
}

function* watchUsers() {
  yield takeEvery(
    AuthActionTypes.AUTH_GET_USERS_PROFIL_REQUEST as any,
    getUsersProfil
  );
}

function* watchUpdateUser() {
  yield takeEvery(
    AuthActionTypes.AUTH_UPDATE_USER_PROFIL_REQUEST as any,
    updateUserProfil
  );
}

function* watchDeleteUser() {
  yield takeEvery(
    AuthActionTypes.AUTH_DELETE_USER_PROFIL_REQUEST as any,
    deleteUserProfil
  );
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* authSaga() {
  yield all([
    fork(watchRecoverPassword),
    fork(watchForgotPassword),
    fork(watchUsers),
    fork(watchUser),
    fork(watchUpdateUser),
    fork(watchDeleteUser),
  ]);
}

export {
  authSaga,
  forgotPassword,
  recoverPassword,
  getUserProfil,
  getUsersProfil,
  deleteUserProfil,
  updateUserProfil,
}
