import type { JSX, Key } from 'react';

import InfiniteScroll from '@/components/Core/InfiniteScroll';
import TopLineLoading from '@/components/Loading/TopLineLoading';
import NoData from '@/components/NoData';
import { useGetConcertsLazyQuery } from '@/modules/graphql/generated';
import { DebouncedFunc, debounce } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Card, Field } from 'ui';
import type { GetConcertsQuery } from '@/modules/graphql/generated';

import chunk from './helpers';
import './index.scss';

function Home(): JSX.Element {
  const [term, setTerm] = useState('');
  const [getConcerts, { data, fetchMore, loading }] = useGetConcertsLazyQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  const debouncedSearch: DebouncedFunc<(arg0: string) => void> = useRef(
    debounce(async (filters: string): Promise<void> => {
      await getConcerts({
        variables: {
          afterCursor: null,
          filters,
          first: 20,
        },
      });
    }, 400),
  ).current;

  useEffect((): void => {
    getConcerts({
      variables: {
        afterCursor: null,
        filters: '',
        first: 20,
      },
    });
  }, [getConcerts]);

  useEffect(
    () => (): void => {
      debouncedSearch.cancel();
    },
    [debouncedSearch],
  );

  function handleChange({
    target: { value = '' },
  }: {
    target: { value: string };
  }): void {
    debouncedSearch(value);
    setTerm(value);
  }

  const constList = data?.concerts;
  const pageInfo = constList?.pageInfo;
  const concerts = constList?.edges;

  console.log('loading', loading);
  console.log('concerts', concerts?.length);

  const loadMore = useCallback(async (): Promise<void> => {
    await fetchMore({
      skip: !pageInfo?.hasNextPage,
      updateQuery: (previousResult: GetConcertsQuery, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.concerts.edges;
        return newEdges?.length
          ? {
              concerts: {
                __typename: previousResult.concerts.__typename,
                edges: [...(previousResult.concerts.edges as any), ...newEdges],
                pageInfo: fetchMoreResult.concerts.pageInfo,
                totalCount: fetchMoreResult.concerts.totalCount,
              },
            }
          : previousResult;
      },
      variables: {
        afterCursor: pageInfo?.endCursor,
        filters: '',
        first: 4,
      },
    });
  }, [fetchMore, pageInfo?.endCursor, pageInfo?.hasNextPage]);

  // if (loading) return <TopLineLoading />;

  return (
    <div className="o-zone c-home">
      <div className="o-grid">
        <form>
          <Field
            aria-label="Search"
            id="floatingInput"
            label="search"
            name="search"
            onChange={handleChange}
            type="search"
            value={term}
          />
        </form>
        {loading && <TopLineLoading />}
        {concerts?.length > 0 ? (
          <InfiniteScroll
            hasMore={pageInfo?.hasNextPage}
            loading={loading}
            onLoadMore={loadMore}>
            {(chunk(concerts, 4) || [])?.map((concert, index: Key) => (
              <div className="o-grid__row" key={index}>
                {concert?.map(
                  (
                    {
                      node,
                    }: {
                      node: {
                        city: string;
                        concert_id: string;
                        display_name: string;
                        uri: string;
                      };
                    }[],
                    concertIdx: number,
                  ) => (
                    <Card key={`${index}_${concertIdx}_${node?.concert_id}`}>
                      <div className="o-cell--one">
                        <div className="flex flex-col h-[200px]">
                          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {node?.display_name}
                          </h5>
                          <p className="mb-3 font-normal text-dark dark:text-white grow">
                            {node?.city}
                          </p>
                          <a
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            href={node?.uri || ''}>
                            Go somewhere
                            <svg
                              aria-hidden="true"
                              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                              fill="none"
                              viewBox="0 0 14 10"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </Card>
                  ),
                )}
              </div>
            ))}
          </InfiniteScroll>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
}

export default Home;
