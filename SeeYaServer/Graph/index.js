import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { NodeField } from 'Graph/Interfaces';
import { UserQueries, UserMutations } from 'Graph/Users';
import { FriendshipQueries, FriendshipMutations } from 'Graph/Friendships';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'The root query',
  fields: {
    node: NodeField,
    ...UserQueries,
    ...FriendshipQueries
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'The root mutation',
  fields: {
    ...UserMutations,
    ...FriendshipMutations
  }
})

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});