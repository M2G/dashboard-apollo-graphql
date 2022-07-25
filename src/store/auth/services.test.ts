import api from 'api';
import {
  forgotPasswordService,
  recoverPasswordService,
  getUsersService,
  createUserProfilService,
  userProfilService,
  updateUserProfilService,
  deleteUsersService,
} from './services';

jest.mock('api');
const mockedAxios: any = api as jest.Mocked<typeof api>;

describe('forgotPasswordService', () => {
  const data = {
    data: {
      email: 'test@test.com',
    },
  };

  it('fetches successfully data from an API', async () => {
    mockedAxios.post.mockImplementationOnce(async () => Promise.resolve(data.data));

    const result = await forgotPasswordService(data.data);

    // then
    expect(mockedAxios.post).toHaveBeenCalledWith("/auth/forgot-password", data.data);
    expect(result).toEqual(data.data);
  });

  it('fetches erroneously data from an API', async () => {
    const message = "Network Error";
    mockedAxios.mockRejectedValueOnce(async () => Promise.reject(new Error(message)));

    // when
    const result = await forgotPasswordService(data.data);

    // then
    expect(api.post).toHaveBeenCalledWith("/auth/forgot-password", data.data);
    expect(result).toEqual(undefined);
  });
});
describe('recoverPasswordService', () => {
  const data = {
    data: {
      new_password: 'test',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im0ucGllcnJlbG91aXNAaG90bWFpbC5mciIsInBhc3N3b3JkIjoiJDJiJDEwJEh6bGVCYlQ5dVlkMmNVZnlXZWlOMmVoYUg3aGtUbHlXWWFFYy5qWG13WDJtZHNxM2JkV00uIiwiaWF0IjoxNjU1MDgxMTA3LCJleHAiOjE2NTUwODQ3MDcsImF1ZCI6W10sInN1YiI6Im0ucGllcnJlbG91aXNAaG90bWFpbC5mciJ9.HEntwrdjY4jxGpHSVfDC2-RzK6pYT6aD2HNGxyb5Qzo',
      verify_password: 'test',
    },
  };

  it('fetches successfully data from an API', async () => {
    mockedAxios.post.mockImplementationOnce(async () => Promise.resolve(data.data));

    const result = await recoverPasswordService(data.data);

    // then
    expect(mockedAxios.post).toHaveBeenCalledWith("/auth/reset-password", data.data);
    expect(result).toEqual(data.data);
  });

  it('fetches erroneously data from an API', async () => {
    const message = "Network Error";
    mockedAxios.mockRejectedValueOnce(async () => Promise.reject(new Error(message)));

    // when
    const result = await recoverPasswordService(data.data);

    // then
    expect(mockedAxios.post).toHaveBeenCalledWith("/auth/reset-password", data.data);
    expect(result).toEqual(undefined);
  });
});
describe('userProfilService', () => {
  const data = {
      id: '6296a5676ebd83dd427a609b',
  };

  it('fetches successfully data from an API', async () => {
    mockedAxios.get.mockImplementationOnce(async () => Promise.resolve(data.id));

    const result = await userProfilService(data.id);

    // then
    expect(mockedAxios.get).toHaveBeenCalledWith(`/users/${data.id}`);
    expect(result).toEqual(data.id);
  });

  it('fetches erroneously data from an API', async () => {
    const message = "Network Error";
    mockedAxios.mockRejectedValueOnce(async () => Promise.reject(new Error(message)));

    // when
    const result = await userProfilService(data.id);

    // then
    expect(mockedAxios.get).toHaveBeenCalledWith(`/users/${data.id}`);
    expect(result).toEqual(undefined);
  });
});
describe('createUserProfilService', () => {
  const data = {
    data: {
      first_name: "test",
      last_name: "test",
      username: "test",
    },
  };

  it('fetches successfully data from an API', async () => {
    mockedAxios.post.mockImplementationOnce(async () => Promise.resolve(data.data));

    const result = await createUserProfilService(data.data);

    // then
    expect(mockedAxios.post).toHaveBeenCalledWith("/users", data.data);
    expect(result).toEqual(data.data);
  });

  it('fetches erroneously data from an API', async () => {
    const message = "Network Error";
    mockedAxios.mockRejectedValueOnce(async () => Promise.reject(new Error(message)));

    // when
    const result = await createUserProfilService(data.data);

    // then
    expect(mockedAxios.post).toHaveBeenCalledWith("/users", data.data);
    expect(result).toEqual(undefined);
  });
});
describe('updateUserProfilService', () => {
  const data = {
    data: {
      first_name: "test",
      last_name: "test",
      username: "test",
    },
    id: '6296a5676ebd83dd427a609b',
  };

  it('fetches successfully data from an API', async () => {
    mockedAxios.put.mockImplementationOnce(async () => Promise.resolve(data.data));

    const result = await updateUserProfilService({
      _id: data.id,
      ...data.data,
    });

    // then
    expect(mockedAxios.put).toHaveBeenCalledWith(`/auth/users/${data.id}`, data.data);
    expect(result).toEqual(data.data);
  });

  it('fetches erroneously data from an API', async () => {
    const message = "Network Error";
    mockedAxios.mockRejectedValueOnce(async () => Promise.reject(new Error(message)));

    // when
    const result = await updateUserProfilService({
      _id: data.id,
      ...data.data,
    });

    // then
    expect(mockedAxios.put).toHaveBeenCalledWith(`/auth/users/${data.id}`, data.data);
    expect(result).toEqual(undefined);
  });
});
describe('getUsersService', () => {
  it('fetches successfully data from an API', async () => {
    const users = {
        _id: "62a2983ea7a81caa9a40c6e3",
        created_at: "2022-06-10T01:02:54.882Z",
        email: "m.pierrelouis@hotmail.fr",
        password: "$2b$10$SBPtg7lhZG2MjeVKjNJkjOk7jEdb9FGjCDviQxyG2p0fSsujRyw6a",
      };

    mockedAxios.get.mockImplementationOnce(async () => Promise.resolve(users));

    const result = await getUsersService(undefined);

    // then
    expect(mockedAxios.get).toHaveBeenCalledWith("/auth/users");
    expect(result).toEqual(users);
  });

  it('fetches erroneously data from an API', async () => {
    const message = "Network Error";
    mockedAxios.mockRejectedValueOnce(async () => Promise.reject(new Error(message)));

    // when
    const result = await getUsersService(undefined);

    // then
    expect(mockedAxios.get).toHaveBeenCalledWith("/auth/users");
    expect(result).toEqual(undefined);
  });
});
describe('deleteUsersService', () => {
  const data = {
    id: '6296a5676ebd83dd427a609b',
  };

  it('fetches successfully data from an API', async () => {
    mockedAxios.delete.mockImplementationOnce(async () => Promise.resolve(data.id));

    const result = await deleteUsersService(data.id);

    // then
    expect(mockedAxios.delete).toHaveBeenCalledWith(`/auth/users/${data.id}`);
    expect(result).toEqual(data.id);
  });

  it('fetches erroneously data from an API', async () => {
    const message = "Network Error";
    mockedAxios.mockRejectedValueOnce(async () => Promise.reject(new Error(message)));

    // when
    const result = await deleteUsersService(data.id);

    // then
    expect(mockedAxios.delete).toHaveBeenCalledWith(`/auth/users/${data.id}`);
    expect(result).toEqual(undefined);
  });
});
