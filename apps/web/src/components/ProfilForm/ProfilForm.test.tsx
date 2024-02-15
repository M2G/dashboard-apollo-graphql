/*eslint-disable*/
import {
  fireEvent,
  render,
  cleanup,
  screen,
  act,
} from '@testing-library/react';
import ProfilForm from './ProfilForm';
import { INITIAL_VALUES } from './constants';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: () => ['key'] }),
  t: () => jest.fn(),
}));

afterEach(cleanup);

describe('Profil Form Component', () => {
  describe('Submitting form', () => {
    let wrapper: any;
    let inputEmail: HTMLInputElement;
    let inputFirstName: HTMLInputElement;
    let inputLastName: HTMLInputElement;
    let inputSubmit: HTMLInputElement;
    const onSubmit = jest.fn();

    beforeEach(async () => {
      render(
        <MemoryRouter>
          <ProfilForm initialValues={INITIAL_VALUES} onSubmit={onSubmit} />
        </MemoryRouter>,
      );

      inputEmail = screen.getByTestId('email');
      inputFirstName = screen.getByTestId('first_name');
      inputLastName = screen.getByTestId('last_name');
      inputSubmit = screen.getByTestId('submit');

      fireEvent.change(inputEmail, { target: { value: 'testtest@gmail.com' } });
      fireEvent.change(inputFirstName, { target: { value: 'test' } });
      fireEvent.change(inputLastName, { target: { value: 'test' } });

      await act(() => {
        fireEvent.submit(inputSubmit);
      });
    });

    test('should display error validation', async () => {
      fireEvent.change(inputEmail, { target: { value: '' } });
      fireEvent.change(inputFirstName, { target: { value: '' } });
      fireEvent.change(inputLastName, { target: { value: '' } });

      await act(() => {
        fireEvent.submit(inputSubmit);
      });
    });

    test('should render', () => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toMatchObject({
        email: 'test@gmail.com',
        first_name: 'test',
        last_name: 'test',
      });
      /*
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test',
        first_name: 'test',
        last_name: 'test',
      });
      */
    });
  });
});
