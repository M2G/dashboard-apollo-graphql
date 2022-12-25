/*eslint-disable*/
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    created_at: { type: GraphQLInt },
    modified_at: { type: GraphQLInt },
    password: { type: GraphQLString }
  }
});

const UsersType = new GraphQLObjectType({
  name: 'Users',
  fields: {
    results: {
      _id: { type: GraphQLString },
      first_name: { type: GraphQLString },
      last_name: { type: GraphQLString },
      email: { type: GraphQLString },
      created_at: { type: GraphQLInt },
      modified_at: { type: GraphQLInt },
      password: { type: GraphQLString }
    },
    pageInfo: {
      count: { type: GraphQLInt },
      pages: { type: GraphQLInt },
      next: { type: GraphQLInt },
      prev: { type: GraphQLInt }
    }
  }
});

const users = [
  {
    __typename: 'Users',
    results: [
      {
        __typename: 'User',
        _id: '632fc3747943271e582ff7c7',
        first_name: 'Smith',
        last_name: 'Jackson',
        email: 'smith.jackson@university.com',
        password: '$2a$10$zZwZ9FuuHQxjWQAQQFc6cOUj59UfUMZLp7/.pGQiyS3aBsYlKgXBe',
        created_at: 1658098622,
        modified_at: 1671941336,
        last_connected_at: 1671941336,
        deleted_at: 0
      },
      {
        __typename: 'User',
        _id: '632fc3747943271e582ff7c7',
        first_name: 'Oliver',
        last_name: 'Garcia',
        email: 'oliver.garcia@university.com',
        password: '$2a$10$zZwZ9FuuHQxjWQAQQFc6cOUj59UfUMZLp7/.pGQiyS3aBsYlKgXBe',
        created_at: 1658098356,
        modified_at: 1663988936,
        last_connected_at: 1663988936,
        deleted_at: 0
      }
    ],
    pageInfo: {
      __typename: 'PageInfo',
      count: 7,
      pages: 4,
      next: 2,
      prev: null
    }
  }
];

const dogData = [
  { id: '12', name: 'Buck', breed: 'bulldog' },
  { id: '2', name: 'Blueberry', breed: 'poodle' },
  { id: '3', name: 'Mozzarella', breed: 'corgi' }
];

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      args: {
        name: { type: GraphQLString }
      },
      resolve: (_, { ...args }) => {
        console.log('----------------', args);
        /*
        const findDogByName = dogData.find(
          (dog) => dog.name.toLowerCase() === name.toLowerCase(),
        );
        if (!name || !findDogByName) return dogData[0];
        return dogData.find(
          (dog) => dog.name.toLowerCase() === name.toLowerCase(),
        );*/
      }
    },
    users: {
      type: new GraphQLList(UsersType),
      resolve: () => users
    }

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
  }
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    deleteDog: {
      type: UserType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(_, { ...args }) {
        console.log('args args', args);

        /* const result = dogData.filter(
          (dog) => dog.name.toLowerCase() !== name.toLowerCase(),
        );
        return (dogData = result); */
        return null;
      }
    }
  }
});

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});
