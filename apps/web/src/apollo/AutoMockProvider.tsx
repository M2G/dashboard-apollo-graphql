import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { buildClientSchema, printSchema } from 'graphql/utilities';
import { makeExecutableSchema } from '@graphql-tools/schema';
import type { IMocks } from '@graphql-tools/mock';
import { addMocksToSchema } from '@graphql-tools/mock';

import introspectionResult from '@/modules/graphql/introspection.gen';
import introspectionQueryResultData from '@/modules/graphql/introspection.gen.json';

/**
 * **AutoMockProvider** can be used instead of **MockProvider** to avoid having to define queries and their exact results
 *
 * https://www.apollographql.com/docs/react/api/react-testing/#mockedprovider
 *
 * (inspired by https://github.com/leighhalliday/apollo-generating-types)
 *
 * @example
 *
 * const mockResolvers = {
 * 	URL: () => 'https://blu',
 * 	Artist: () => ({id: '1'}),
 * };
 *
 * const wrapper = mount(
 * 	<AutoMockProvider mockResolvers={mockResolvers}>
 * 		<Artist />
 * 	</AutoMockProvider>
 * );
 */
/* eslint-disable-next-line jsdoc/require-param */
const AutoMockProvider: React.FunctionComponent<
  React.PropsWithChildren<{
    children: React.ReactNode;
    mockResolvers?: IMocks;
  }>
> = ({ children, mockResolvers }) => {
  // In memory normalized cache
  const cache = new InMemoryCache({
    possibleTypes: introspectionResult.possibleTypes,
  });

  // Convert JSON schema into Schema Definition Language
  const schemaSDL = printSchema(
    buildClientSchema({
      __schema: introspectionQueryResultData.__schema as any,
    }),
  );

  // Make schema executable
  let schema = makeExecutableSchema({
    resolverValidationOptions: {
      requireResolversForResolveType: 'ignore',
    },
    typeDefs: schemaSDL,
  });

  // Apply mock resolvers to executable schema
  schema = addMocksToSchema({ mocks: mockResolvers, schema });

  // Define ApolloClient
  const client = new ApolloClient({
    cache,
    link: new SchemaLink({ schema }),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default AutoMockProvider;
