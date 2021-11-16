import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import JWT from 'jsonwebtoken';
import UserType from 'Graph/Users/Type';
import DB from 'Database';

export default mutationWithClientMutationId({
  name: 'CheckAuthStatus',
  inputFields: {
    token: {
      type: new GraphQLNonNull(GraphQLString),
      description: "A user's JWT"
    },
  },
  outputFields: {
    user: {
      type: UserType,
    },
    token: {
      type: GraphQLString
    },
    error: {
      type: GraphQLString
    }
  },
  mutateAndGetPayload: async ({ token }) => {
    if (!token) {
      return {
        user: null,
        token: null,
        error: 'LOGIN'
      }
    }
    try {
      const payload = JWT.verify(token, process.env.JWT);
      const user = await DB.User.getUserByID(payload.id);
      if (!user) {
        return {
          user: null,
          token: null,
          error: 'LOGIN'
        }
      }
      return {
        user: user.toJSON(),
        token,
        error: null
      }
    } catch (error) {
      return {
        user: null,
        token: null,
        error: 'LOGIN'
      }
    }
  }
});