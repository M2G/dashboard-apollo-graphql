import { MockedProvider, MockLink } from '@apollo/client/testing';
import { ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

export function MyMockedProvider(props: { [x: string]: any; mocks: any }) {
  const { mocks, ...otherProps } = props;

  const mockLink = new MockLink(mocks);
  const errorLoggingLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors?.length) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  const link = ApolloLink.from([errorLoggingLink, mockLink]);

  // eslint-disable-next-line
  return <MockedProvider {...otherProps} link={link} />;
}

export default MyMockedProvider;
