import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { NodeInterface } from 'Graph/Interfaces';

export default new GraphQLObjectType({
  name: 'friendship',
  description: 'A relationship between two users',
  fields: {
    id: globalIdField('Friendship', friendship => friendship.id),
    user_id: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The originating user",
    },
    friend_id: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The originating user's friend",
    },
    blocked: {
      type: GraphQLBoolean,
      description: "Whether this user has blocked his friend"
    }
  },
  interfaces: [NodeInterface]
});

