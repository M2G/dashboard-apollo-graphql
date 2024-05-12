import type { JSX, Key } from 'react';

import InfiniteScroll from '@/components/Core/InfiniteScroll';
import TopLineLoading from '@/components/Loading/TopLineLoading';
import NoData from '@/components/NoData';
import ConcertList from '@/containers/Concert/ConcertList';
import { useGetConcertsLazyQuery } from '@/modules/graphql/generated';
import { DebouncedFunc, debounce } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Field } from 'ui';
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

  return (
    <div className="o-zone c-home !pl-[280px]">
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
                    <ConcertList
                      key={`${index}_${concertIdx}_${node?.concert_id}`}
                      node={node}
                    />
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
