import api from 'api';
import signupUserService from './services';

jest.mock('api');
const mockedAxios: any = api as jest.Mocked<typeof api>;

describe('signupUserService', () => {
  const data = {
    data: {
      email: 'test@test.com',
      password: 'test',
    },
  };

  it('fetches successfully data from an API', async () => {
    mockedAxios.post.mockImplementationOnce(async () => Promise.resolve(data.data));

    const result = await signupUserService(data.data);

    // then
    expect(mockedAxios.post).toHaveBeenCalledWith(`/auth/register`, data.data);
    expect(result).toEqual(data.data);
  });

  it('fetches erroneously data from an API', async () => {
    const message = "Network Error";
    mockedAxios.mockRejectedValueOnce(async () => Promise.reject(new Error(message)));

    // when
    const result = await signupUserService(data.data);

    // then
    expect(mockedAxios.post).toHaveBeenCalledWith(`/auth/register`, data.data);
    expect(result).toEqual(undefined);
  });
});
