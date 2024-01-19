import * as PropTypes from 'prop-types';
import * as React from 'react';
import TopLineLoading from './TopLineLoading';

export interface LoadingNS {
  isLoading: boolean;
}

const Loading: React.FC<LoadingNS> = ({ isLoading }: boolean | any) => {
  if (!isLoading) return null;

  return <TopLineLoading />;
};

Loading.displayName = 'Loading';

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loading;
