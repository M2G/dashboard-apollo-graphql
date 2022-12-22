import { ApolloClient, InMemoryCache } from '@apollo/client';
import link from './link';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default apolloClient;
