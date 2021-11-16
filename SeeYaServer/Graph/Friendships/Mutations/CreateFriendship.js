import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import FriendshipType from 'Graph/Friendships/Type';
import DB from 'Database';

export default mutationWithClientMutationId({
  name: 'CreateFriendship',
  inputFields: {
    user_id: {
      type: new GraphQLNonNull(GraphQLString),
      description: "A user's id"
    },
    friend_id: {
      type: new GraphQLNonNull(GraphQLString),
      description: "A different user's id",
    }
  },
  outputFields: {
    friendship: {
      type: FriendshipType,
      resolve: payload => {
        console.log('FRIENDSHIP PAYLOAD', payload);
        return payload;
      }
    },
  },
  mutateAndGetPayload: async ({ user_id, friend_id }) => {
    try {
      return await DB.Friendship.createFriendship(user_id, friend_id);
    } catch (error) {
      throw new Error(error);
    }
  }
});