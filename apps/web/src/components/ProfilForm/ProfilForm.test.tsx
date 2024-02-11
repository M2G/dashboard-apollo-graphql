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
    let floatingEmail: HTMLInputElement;
    let floatingFirstName: HTMLInputElement;
    let floatingLastName: HTMLInputElement;
    let floatingSubmit: HTMLInputElement;
    const onSubmit = jest.fn();

    beforeEach(async () => {
      render(
        <MemoryRouter>
          <ProfilForm initialValues={INITIAL_VALUES} onSubmit={onSubmit} />
        </MemoryRouter>,
      );

      floatingEmail = screen.getByTestId('email');
      floatingFirstName = screen.getByTestId('first_name');
      floatingLastName = screen.getByTestId('last_name');
      floatingSubmit = screen.getByTestId('submit');

      fireEvent.change(floatingEmail, { target: { value: 'test' } });
      fireEvent.change(floatingFirstName, { target: { value: 'test' } });
      fireEvent.change(floatingLastName, { target: { value: 'test' } });

      await act(() => {
        fireEvent.submit(floatingSubmit);
      });
    });

    test('should display error validatiob', async () => {
      fireEvent.change(floatingEmail, { target: { value: '' } });
      fireEvent.change(floatingFirstName, { target: { value: '' } });
      fireEvent.change(floatingLastName, { target: { value: '' } });

      await act(() => {
        fireEvent.submit(floatingSubmit);
      });
    });

    test('should render', () => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toMatchObject({
        email: 'test',
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
