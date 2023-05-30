import type { JSX } from 'react';
import {
  useGetConcertsQuery,
  GetConcertsQuery,
} from 'modules/graphql/generated';
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

  const concerts = data.concerts?.edges;
  console.log('data data data', data);
  console.log('data data data', concerts);
  return (
    <div className="o-zone c-home">
      <div className="o-grid">
        <div className="o-grid__row">
          {concerts?.map(({ node }) => (
            <div className="o-col--one-quarter--large o-col--half--medium">
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
