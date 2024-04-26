/* eslint-disable */
import {
  fireEvent,
  render,
  cleanup,
  screen,
  act,
} from '@testing-library/react';

import ConcertList from './ConcertList';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Concert Container', () => {
  describe('Concert success', () => {
    afterEach(cleanup);
    beforeEach(() => {
      const node = {
        __typename: 'Concert',
        concert_id: 40724533,
        type: 'Concert',
        uri: 'https://www.exemple.com',
        display_name: 'Test at Accor Arena (December 05, 2024)',
        status: 'ok',
        popularity: '0.052765',
        datetime: '2024-12-05T20:00:00-0800',
        city: 'Paris, France',
        lng: 48.9106183,
        lat: 2.4041042,
        artist: {
          __typename: 'Artist',
          artist_id: 20,
          uri: 'https://www.exemple.com',
          display_name: 'Kekra',
        },
      };

      render(<ConcertList node={node} />);
    });

    it('should success concert', async () => {
      expect(
        screen.getByText('Test at Accor Arena (December 05, 2024)'),
      ).toBeInTheDocument();
      expect(screen.getByText('Paris, France')).toBeInTheDocument();
      expect(screen.getByText('Go somewhere')).toBeInTheDocument();
      screen.debug();
    });
  });
});
