/* eslint-disable */
import {
  fireEvent,
  render,
  cleanup,
  screen,
  act,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import Concert from './Concert';
import { GetConcertsDocument } from '@/modules/graphql/generated';
import AuthContext from '@/AuthContext';
import { GraphQLError } from 'graphql';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Concert Container', () => {
  describe('Concert success', () => {
    afterEach(cleanup);
    beforeEach(() => {
      const mocks = [
        {
          delay: 10,
          request: {
            query: GetConcertsDocument,
            variables: {
              afterCursor: null,
              filters: '',
              first: 20,
            },
          },
          result: {
            data: {
              concerts: {
                totalCount: 24,
                edges: [
                  {
                    node: {
                      concert_id: 41170526,
                      type: 'Concert',
                      uri: 'https://www.songkick.com/concerts/41170526-guy2bezbar-at-le-point-fort-daubervilliers',
                      display_name:
                        'Kalash at Le point fort daubervilliers (June 08, 2024)',
                      status: 'ok',
                      popularity: '0.052765',
                      datetime: '2024-11-16T20:00:00-0800',
                      city: 'Paris, France',
                      lng: 48.9106183,
                      lat: 2.4041042,
                      artist: {
                        artist_id: 11,
                        uri: 'https://www.songkick.com/artists/616082-kalash',
                        display_name: 'Kalash',
                        __typename: 'Artist',
                      },
                      __typename: 'Concert',
                    },
                    cursor: 'NDExNzA1MjY=',
                    __typename: 'Edge',
                  },
                ],
                pageInfo: {
                  startCursor: 'NDExNzA1MjY=',
                  endCursor: 'NDA3Mjg1ODg=',
                  hasNextPage: true,
                  hasPrevPage: false,
                  __typename: 'PageInfo',
                },
                __typename: 'Concerts',
              },
            },
          },
        },
      ];

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <AuthContext.Provider>
            <MemoryRouter initialEntries={['/concert']}>
              <Concert />
            </MemoryRouter>
          </AuthContext.Provider>
        </MockedProvider>,
      );
    });

    it('should success concert', async () => {
      expect(await screen.findByTestId('infinite-scroll')).toBeInTheDocument();
      expect(await screen.findByText('search')).toBeInTheDocument();
      expect(
        await screen.findByText(
          'Kalash at Le point fort daubervilliers (June 08, 2024)',
        ),
      ).toBeInTheDocument();
      expect(await screen.findByText('Paris, France')).toBeInTheDocument();
      expect(await screen.findByText('Go somewhere')).toBeInTheDocument();

      screen.debug();
    });
  });
  describe('Concert success but empty', () => {
    afterEach(cleanup);
    beforeEach(() => {
      const mocks = [
        {
          delay: 10,
          request: {
            query: GetConcertsDocument,
            variables: {
              afterCursor: null,
              filters: '',
              first: 20,
            },
          },
          result: {
            data: {
              concerts: {
                totalCount: 0,
                edges: [],
                pageInfo: {
                  startCursor: 'NDExNzA1MjY=',
                  endCursor: 'NDA3Mjg1ODg=',
                  hasNextPage: false,
                  hasPrevPage: false,
                  __typename: 'PageInfo',
                },
                __typename: 'Concerts',
              },
            },
          },
        },
      ];

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <AuthContext.Provider>
            <MemoryRouter initialEntries={['/concert']}>
              <Concert />
            </MemoryRouter>
          </AuthContext.Provider>
        </MockedProvider>,
      );
    });

    it('should success concert but empty', async () => {
      expect(await screen.findByText('No data')).toBeInTheDocument();

      screen.debug();
    });
  });
  describe('Concert fail', () => {
    afterEach(cleanup);
    beforeEach(() => {
      const mocks = [
        {
          delay: 10,
          request: {
            query: GetConcertsDocument,
            variables: {
              afterCursor: null,
              filters: '',
              first: 20,
            },
          },
          result: {
            data: {
              concerts: {
                totalCount: 0,
                edges: [],
                pageInfo: {
                  startCursor: 'NDExNzA1MjY=',
                  endCursor: 'NDA3Mjg1ODg=',
                  hasNextPage: false,
                  hasPrevPage: false,
                  __typename: 'PageInfo',
                },
                __typename: 'Concerts',
              },
            },
          },
        },
      ];

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <AuthContext.Provider>
            <MemoryRouter initialEntries={['/concert']}>
              <Concert />
            </MemoryRouter>
          </AuthContext.Provider>
        </MockedProvider>,
      );
    });

    it('should fail concert', async () => {
      expect(await screen.findByText('No data')).toBeInTheDocument();

      screen.debug();
    });
  });
});

// An error has occurred during your request
