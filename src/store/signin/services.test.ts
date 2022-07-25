import api from 'api';
import signinService from './services';

jest.mock('api');
const mockedAxios: any = api as jest.Mocked<typeof api>;

describe('signinService', () => {
  const data = {
    data: {
      email: 'test',
      password: 'test',
    },
  };

  it('fetches successfully data from an API', async () => {
    mockedAxios.post.mockImplementationOnce(async () => Promise.resolve(data.data));

    const result = await signinService(data.data);

    // then
    expect(mockedAxios.post).toHaveBeenCalledWith(`/auth/authenticate`, data.data);
    expect(result).toEqual(data.data);
  });

  it('fetches erroneously data from an API', async () => {
    const message = "Network Error";
    mockedAxios.mockRejectedValueOnce(async () => Promise.reject(new Error(message)));

    // when
    const result = await signinService(data.data);

    // then
    expect(mockedAxios.post).toHaveBeenCalledWith(`/auth/authenticate`, data.data);
    expect(result).toEqual(undefined);
  });
});
