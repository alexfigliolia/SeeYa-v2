import { GraphQLID, GraphQLNonNull } from 'graphql';
import FriendshipType from 'Graph/Friendships/Type';
import DB from 'Database';

export default {
  type: FriendshipType,
  description: 'Gets friendship by id',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The id of the friendship'
    }
  },
  resolve: async (_, args) => {
    try {
      return await DB.Friendship.getFriendshipByID(args.id);
    } catch (error) {
      throw new Error(error);
    }
  }
}