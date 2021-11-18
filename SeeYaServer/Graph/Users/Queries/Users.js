
import { GraphQLEnumType, GraphQLInt, GraphQLString } from 'graphql';
import { connectionArgs, connectionDefinitions, connectionFromPromisedArray } from 'graphql-relay';
import DB from 'Database';
import UserType from 'Graph/Users/Type';

const { connectionType: UserConnection } = connectionDefinitions({
  nodeType: UserType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      description: 'The total number of users',
      resolve: connection => {
        // TODO - get total count
        // console.log(connection);
        return connection.totalCount;
      }
    }
  })
});

export default {
  type: UserConnection,
  description: 'Gets the full list of users',
  args: {
    orderby: {
      type: new GraphQLEnumType({
        name: 'orderby',
        values: {
          NAME: {
            value: 'name',
          },
          CREATED_AT: {
            value: 'created_at'
          },
          UPDATED_AT: {
            value: 'updated_at'
          }
        },
      }),
      description: 'A user attribute to sort by'
    },
    direction: {
      type: new GraphQLEnumType({
        name: 'direction',
        values: {
          ASC: {
            value: 'ASC',
          },
          DESC: {
            value: 'DESC',
          },
        },
      }),
      description: 'A direction to sort in'
    },
    search: {
      type: GraphQLString,
      description: 'A name to search'
    },
    user_id: {
      type: GraphQLString,
      description: 'If provided will return the friends of this user'
    },
    ...connectionArgs
  },
  resolve: (_, args) => connectionFromPromisedArray(
    args.user_id ? DB.User.getUserFriends(args) : DB.User.listUsers(args),
    args
  )
}