import {
  graphql,
  print,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from 'graphql';
import { ApolloLink, Observable } from '@apollo/client';

const DogType2 = new GraphQLObjectType({
  name: "Dog",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    breed: { type: GraphQLString }
  }
});

const DogType = new GraphQLObjectType({
  name: 'Users',
  fields: {
    results: {
      _id: { type: GraphQLString },
      first_name: { type: GraphQLString },
      last_name: { type: GraphQLString },
      email: { type: GraphQLString },
      created_at: { type: GraphQLInt },
      modified_at: { type: GraphQLInt },
      password: { type: GraphQLString },
    },
    pageInfo: {
      count: { type: GraphQLInt },
      pages: { type: GraphQLInt },
      next: { type: GraphQLInt },
      prev: { type: GraphQLInt },
    },

    /*
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    breed: { type: GraphQLString },

     */
  },
});

const users = [
  {
    // __typename: "Users",
    results: [
      {
        // __typename: "User",
        _id: '632fc3747943271e582ff7c7',
        first_name: 'Federic',
        last_name: 'Delavier',
        email: 'federic.delavier@university.com',
        created_at: 1664074612,
        modified_at: 1667014561,
        password: '$2b$10$hQoG8E..vnfh0gZeDgt/b.1nfMwRB4UtfCBjAmmaLxkaxabkjxAqq',
      },
    ],
    pageInfo: {
      // __typename: "PageInfo",
      count: 7,
      pages: 4,
      next: 2,
      prev: null,
    },
  },
];

let dogData = [
  { id: "12", name: "Buck", breed: "bulldog" },
  { id: "2", name: "Blueberry", breed: "poodle" },
  { id: "3", name: "Mozzarella", breed: "corgi" }
];

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    dogs: {
      type: GraphQLList(DogType2),
      resolve: () => {
        return dogData;
      }
    },
    dog: {
      type: DogType,
      args: {
        name: { type: GraphQLString }
      },
      resolve: (_, { name }) => {
        const findDogByName = dogData.find(
          (dog) => dog.name.toLowerCase() === name.toLowerCase()
        );
        if (!name || !findDogByName) return dogData[0];
        return dogData.find(
          (dog) => dog.name.toLowerCase() === name.toLowerCase()
        );
      }
    },
    users: {
      type: GraphQLList(DogType),
      resolve: () => {
        return users;
      },
    },

    /*
    dog: {
      type: DogType,
      args: {
        name: { type: GraphQLString },
      },
      resolve: (_, { name }) => {
        const findDogByName = dogData.find(
          (dog) => dog.name.toLowerCase() === name.toLowerCase(),
        );
        if (!name || !findDogByName) return dogData[0];
        return dogData.find(
          (dog) => dog.name.toLowerCase() === name.toLowerCase(),
        );
      },
    },
    */
  },
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    deleteDog: {
      type: DogType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(_, { ...args }) {
        console.log('args args', args);

        /* const result = dogData.filter(
          (dog) => dog.name.toLowerCase() !== name.toLowerCase(),
        );
        return (dogData = result); */
        return null;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: QueryType,

  // mutation: MutationType

});

async function delay(wait) {
  return new Promise((resolve) => setTimeout(resolve, wait));
}

export const link = new ApolloLink(
  (operation) =>
    new Observable(async (observer) => {
      const { query, operationName, variables } = operation;

      console.log('operation operation', operation);

      await delay(300);
      try {
        const result = await graphql({
          schema,
          source: print(query),
          variableValues: variables,
          operationName,
        });
        observer.next(result);
        observer.complete();
      } catch (err) {
        observer.error(err);
      }
    }),
);
