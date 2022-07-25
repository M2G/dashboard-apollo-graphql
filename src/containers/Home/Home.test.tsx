/* eslint-disable */
import Home from './Home';
import { render, screen } from '../../test-utils/test-utils';

describe('Home Container', () => {
  describe("Submitting form", () => {
    let wrapper: any;

    const date = Math.floor(Date.now() / 1000);

    const data = [
      {
        "_id": "6237a814d7d983d4e78228c3",
        "created_at": date,
        "email": "oliver.garcia@university.com",
        "first_name": "Oliver",
        "last_name": "Garcia",
        "modified_at": date
      }];

    const initialState = { auth: { data, loading: false }, auth_global: {}, signup: {}, signin: {}, signout: {} };
    const options: any = { initialState };

    wrapper = render(<Home />, options);

    test('should render', () => {
      expect(screen.getAllByText('First name')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Last name')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Email')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Created at')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Modified at')[0]).toBeInTheDocument();

      expect(wrapper.container?.querySelector('#user__row__test__6237a814d7d983d4e78228c3')).toBeInTheDocument();
      expect(wrapper.container?.querySelector('#user__row__test__6237a814d7d983d4e78228c3__edit')).toBeInTheDocument();
      expect(wrapper.container?.querySelector('#user__row__test__6237a814d7d983d4e78228c3__delete')).toBeInTheDocument();

      expect(screen.getByText('Oliver')).toBeInTheDocument();
      expect(screen.getByText('Garcia')).toBeInTheDocument();
      expect(screen.getByText('oliver.garcia@university.com')).toBeInTheDocument();
      // expect(screen.getByText(new Date(date * 1000).toLocaleDateString())).toBeInTheDocument();
      expect(screen.getAllByText(new Date(date * 1000).toLocaleDateString())[0]).toBeInTheDocument();
    });
  });
});
