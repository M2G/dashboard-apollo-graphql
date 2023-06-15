import type { JSX, Key } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import type { GetConcertsQuery } from 'modules/graphql/generated';
import { useGetConcertsLazyQuery } from 'modules/graphql/generated';

import InfiniteScroll from 'components/Core/InfiniteScroll';
import Input from 'components/Core/Input';
import TopLineLoading from 'components/Loading/TopLineLoading';
import NoData from 'components/NoData';
import chunk from './helpers';
import './index.scss';

function Home(): JSX.Element {
  const [term, setTerm] = useState('');
  const [getConcerts, { data, fetchMore, loading }] = useGetConcertsLazyQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  async function getData(): Promise<void> {
    await getConcerts({
      variables: {
        afterCursor: null,
        filters: '',
        first: 20,
      },
    });
  }

  const debouncedSearch = useRef(
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
    getData();
  }, []);

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

  if (loading) return <TopLineLoading />;

  if (!concerts) return <NoData />;

  return (
    <div className="o-zone c-home">
      <div className="o-grid">
        <Input
          aria-label="Search"
          className="form-control c-search-input"
          id="floatingInput"
          name="search"
          onChange={handleChange}
          placeholder="Search"
          type="search"
          value={term}
        />
        <InfiniteScroll
          hasMore={pageInfo?.hasNextPage}
          loading={loading}
          onLoadMore={loadMore}
        >
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
                  <div
                    className="o-col--one-quarter--large o-col--half--medium"
                    key={`${index}_${concertIdx}_${node?.concert_id}`}
                  >
                    <div className="o-cell--one">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">{node?.display_name}</h5>
                          <p className="card-text">{node?.city}</p>
                          <a className="btn btn-light" href={node?.uri || ''}>
                            Go somewhere
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Home;
