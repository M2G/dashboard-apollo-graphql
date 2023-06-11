import type { JSX, Key } from 'react';

import InfiniteScroll from 'components/Core/InfiniteScroll';
import Input from 'components/Core/Input';
import TopLineLoading from 'components/Loading/TopLineLoading';
import NoData from 'components/NoData';
import { debounce } from 'lodash';
import { useGetConcertsLazyQuery } from 'modules/graphql/generated';
import { useCallback, useEffect, useRef, useState } from 'react';

import './index.scss';

const chunk = (arr: any[] | string | null, size: number) =>
  arr?.length &&
  size &&
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr?.slice(i * size, i * size + size),
  );

function Home(): JSX.Element {
  const [term, setTerm] = useState('');
  const [getConcerts, { data, fetchMore, loading }] = useGetConcertsLazyQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  async function getData() {
    await getConcerts({
      variables: {
        afterCursor: null,
        filters: '',
        first: 20,
      },
    });
  }

  useEffect(() => {
    getData();
  }, []);

  const debouncedSearch = useRef(
    debounce(async (filters) => {
      await getConcerts({
        variables: {
          afterCursor: null,
          filters,
          first: 20,
        },
      });
    }, 400),
  ).current;

  useEffect(
    () => () => {
      debouncedSearch.cancel();
    },
    [debouncedSearch],
  );

  function handleChange({ target: { value = '' } }: any): void {
    debouncedSearch(value);
    setTerm(value);
  }

  const pageInfo = data?.concerts.pageInfo;
  const concerts = data?.concerts?.edges;

  const loadMore = useCallback(async (): Promise<void> => {
    await fetchMore({
      skip: !pageInfo?.hasNextPage,
      updateQuery: (previousResult, { fetchMoreResult }) => {
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
              {concert?.map(({ node }: { node: any }[], concertIdx: number) => (
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
              ))}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Home;
