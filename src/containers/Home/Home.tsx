import type { JSX } from 'react';
import { useGetConcertsQuery } from 'modules/graphql/generated';

function Home(): JSX.Element {
  const { data } = useGetConcertsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      afterCursor: null,
      filters: '',
      first: 5,
    },
  });

  console.log('data data data', data);
  return (
    <div className="o-grid">
      <div className="o-grid__row">
        <div className="o-col">
          <div>ok</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
