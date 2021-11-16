import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import JWT from 'jsonwebtoken';
import UserType from 'Graph/Users/Type';
import DB from 'Database';

export default mutationWithClientMutationId({
  name: 'Login',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: "A user's login email address"
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: "A user's plain text password"
    }
  },
  outputFields: {
    user: {
      type: UserType,
      description: 'The user object'
    },
    token: {
      type: GraphQLString,
      description: 'A JWT'
    },
    error: {
      type: GraphQLString,
      description: 'An error message if any'
    }
  },
  mutateAndGetPayload: async ({ email, password }) => {
    const user = await DB.User.getUserByEmail(email);
    if (!user) {
      return {
        user: null,
        token: null,
        error: 'This email does not exist. Please create an account'
      }
    }
    if (!user.validPassword(password)) {
      return {
        user: null,
        token: null,
        error: 'The password entered is incorrect'
      }
    }
    const payload = user.toJSON();
    return {
      error: null,
      user: payload,
      token: JWT.sign(payload, process.env.JWT)
    }
  }
});