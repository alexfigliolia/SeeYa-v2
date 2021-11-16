import { GraphQLID, GraphQLNonNull } from 'graphql';
import UserType from 'Graph/Users/Type';
import DB from 'Database';

export default {
  type: UserType,
  description: 'Gets a user given an id',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The id of the user'
    }
  },
  resolve: async (_, args) => {
    try {
      return await DB.User.getUserByID(args.id);
    } catch (error) {
      throw new Error(error);
    }
  }
}