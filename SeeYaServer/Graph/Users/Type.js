import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { NodeInterface } from 'Graph/Interfaces';

export default new GraphQLObjectType({
  name: 'user',
  description: 'A see ya user',
  fields: {
    id: globalIdField('User', user => user.id),
    serverID: {
      type: GraphQLString,
      description: 'The id corresponding to the postgres table',
      resolve: user => {
        if ('dataValues' in user) {
          return user.dataValues.id;
        }
        return user.id;
      }
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: "A user's name",
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: "A user's login email address"
    },
    verified: {
      type: GraphQLBoolean,
      description: "A user's verification status"
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: "A user's encrypted password"
    },
    image: {
      type: GraphQLString,
      description: 'A profile photo'
    },
    created_at: {
      type: GraphQLString,
      description: "The date of the user's creation"
    },
    updated_at: {
      type: GraphQLString,
      description: "The last time the user was updated"
    }
  },
  interfaces: [NodeInterface]
});

