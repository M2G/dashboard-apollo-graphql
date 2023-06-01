import type { JSX, Key } from 'react';
import {
  useGetConcertsQuery,
  GetConcertsQuery,
} from 'modules/graphql/generated';
import TopLineLoading from 'components/Loading/TopLineLoading';
import NoData from 'components/NoData';
import InfiniteScroll from 'components/Core/InfiniteScroll';
import './index.scss';

function Home(): JSX.Element | null {
  const { data, loading, fetchMore } = useGetConcertsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      afterCursor: null,
      filters: '',
      first: 5,
    },
  });

  if (loading) return <TopLineLoading />;

  if (!data?.concerts?.edges) return <NoData />;

  const concerts = data.concerts?.edges;
  console.log('data data data', data);
  console.log('data data data', concerts);

  const chunk = (arr: any[] | string | null, size: number) =>
    arr?.length &&
    size &&
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr?.slice(i * size, i * size + size),
    );

  console.log('arr arr arr', chunk(concerts, 4));

  return (
    <div className="o-zone c-home">
      <div className="o-grid">
        <InfiniteScroll
          loading={loading}
          onLoadMore={() => {
            console.log(':::::::::::::');

            fetchMore({
              variables: {
                afterCursor: null,
                filters: '',
                first: 5,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                const newEdges = fetchMoreResult.concerts.edges;
                const { pageInfo } = fetchMoreResult.concerts;

                return newEdges?.length
                  ? {
                      allNews: {
                        __typename: previousResult.concerts.__typename,
                        edges: [
                          ...(previousResult.concerts.edges as any),
                          ...newEdges,
                        ],
                        pageInfo,
                      },
                    }
                  : previousResult;
              },
            });
          }}
        >
          {(chunk(concerts, 4) || [])?.map(
            (concert: { node: any }[], index: Key | null | undefined) => (
              <div key={index} className="o-grid__row">
                {concert?.map(
                  ({ node }) => (
                    console.log('item item item', node),
                    (
                      <div
                        key={node?.concert_id}
                        className="o-col--one-quarter--large o-col--half--medium"
                      >
                        <div className="o-cell--one">
                          <div className="card">
                            <div className="card-body">
                              <h5 className="card-title">
                                {node?.display_name}
                              </h5>
                              <p className="card-text">{node?.city}</p>
                              <a
                                href={node?.uri || ''}
                                className="btn btn-light"
                              >
                                Go somewhere
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
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
