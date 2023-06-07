import type { JSX, Key } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { useGetConcertsQuery } from 'modules/graphql/generated';
import TopLineLoading from 'components/Loading/TopLineLoading';
import NoData from 'components/NoData';
import InfiniteScroll from 'components/Core/InfiniteScroll';
import './index.scss';

function Home(): JSX.Element {
  const [term, setTerm] = useState('');
  const { data, loading, fetchMore } = useGetConcertsQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: {
      afterCursor: null,
      filters: '',
      first: 20,
    },
  });

  const debouncedSearch = useRef(
    debounce((criteria) => {
      // onSearchTerm(criteria);
      console.log('criteria criteria criteria', criteria);
    }, 400),
  ).current;

  useEffect(
    () => () => {
      debouncedSearch.cancel();
    },
    [debouncedSearch],
  );

  function handleChange({ target: { value = '' } }: any) {
    debouncedSearch(value);
    setTerm(value);
  }

  const pageInfo = data?.concerts.pageInfo;

  const loadMore = useCallback(() => {
    console.log('loadMore loadMore loadMore');

    if (!pageInfo?.hasNextPage) return;

    fetchMore({
      variables: {
        afterCursor: pageInfo?.endCursor,
        filters: '',
        first: 4,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.concerts.edges;
        // console.log('fetchMoreResult', fetchMoreResult);
        // console.log('newEdges', newEdges);

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
    });
  }, [fetchMore, pageInfo?.endCursor, pageInfo?.hasNextPage]);

  if (loading) return <TopLineLoading />;

  if (!data?.concerts?.edges) return <NoData />;

  const concerts = data?.concerts?.edges;

  // console.log('data data data', data);
  // console.log('data data data', concerts);

  const chunk = (arr: any[] | string | null, size: number) =>
    arr?.length &&
    size &&
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr?.slice(i * size, i * size + size),
    );

  // input text filter
  return (
    <div className="o-zone c-home">
      <div className="o-grid">
        <input
          id="floatingInput"
          name="search"
          className="form-control c-search-input"
          type="search"
          aria-label="Search"
          placeholder="Search"
          onChange={handleChange}
          value={term}
        />
        <InfiniteScroll loading={loading} onLoadMore={loadMore}>
          {(chunk(concerts, 4) || [])?.map(
            (concert, index: Key | null | undefined) => (
              <div key={index} className="o-grid__row">
                {concert?.map(
                  ({ node }: { node: any }[], concertIdx: number) => (
                    <div
                      key={`${index}_${concertIdx}_${node?.concert_id}`}
                      className="o-col--one-quarter--large o-col--half--medium"
                    >
                      <div className="o-cell--one">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">{node?.display_name}</h5>
                            <p className="card-text">{node?.city}</p>
                            <a href={node?.uri || ''} className="btn btn-light">
                              Go somewhere
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            ),
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Home;
