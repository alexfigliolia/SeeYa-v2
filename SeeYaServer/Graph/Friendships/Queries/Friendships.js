
import { GraphQLEnumType, GraphQLInt, GraphQLString } from 'graphql';
import { connectionArgs, connectionDefinitions, connectionFromPromisedArray } from 'graphql-relay';
import DB from 'Database';
import FriendshipType from 'Graph/Friendships/Type';

const { connectionType: FriendshipConnection } = connectionDefinitions({
  nodeType: FriendshipType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      description: "The total number of a user's friends",
      resolve: connection => {
        // TODO - get total count
        // console.log(connection);
        return connection.totalCount;
      }
    }
  })
});

export default {
  type: FriendshipConnection,
  description: "Gets all of the user's friendships",
  args: {
    id: {
      type: GraphQLString,
      description: 'A user id',
      required: true
    },
    // orderby: {
    //   type: new GraphQLEnumType({
    //     name: 'orderby',
    //     values: {
    //       NAME: {
    //         value: 'name',
    //       },
    //       CREATED_AT: {
    //         value: 'created_at'
    //       },
    //       UPDATED_AT: {
    //         value: 'updated_at'
    //       }
    //     },
    //   }),
    //   description: 'A user attribute to sort by'
    // },
    // direction: {
    //   type: new GraphQLEnumType({
    //     name: 'direction',
    //     values: {
    //       ASC: {
    //         value: 'ASC',
    //       },
    //       DESC: {
    //         value: 'DESC',
    //       },
    //     },
    //   }),
    //   description: 'A direction to sort in'
    // },
    search: {
      type: GraphQLString,
      description: 'A name to search'
    },
    ...connectionArgs
  },
  resolve: (_, args) => connectionFromPromisedArray(
    DB.Friendship.listFriendships(args.id),
    args
  )
}