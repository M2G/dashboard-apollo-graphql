import type { JSX } from 'react';
import { useGetConcertsQuery } from 'modules/graphql/generated';
import TopLineLoading from 'components/Loading/TopLineLoading';
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

  if (!data) return null;

  console.log('data data data', data);
  console.log('data data data', data.concerts.edges[0].node);
  return (
    <div className="o-zone c-home">
      <div className="o-grid">
        <div className="o-grid__row">
          <div className="o-col--one-quarter--large o-col--half--medium">
            <div className="o-cell--one">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card&apos;s content.
                  </p>
                  <a href="#test" className="btn btn-light">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
