import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import JWT from 'jsonwebtoken';
import UserType from 'Graph/Users/Type';
import DB from 'Database';

export default mutationWithClientMutationId({
  name: 'CreateAccount',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: "A user's name",
    },
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
    },
    error: {
      type: GraphQLString,
    },
    token: {
      type: GraphQLString
    }
  },
  mutateAndGetPayload: async ({ name, email, password }) => {
    const { valid, message } = DB.User.validatePassword(password);
    if (!valid) {
      return {
        user: null,
        error: message,
        token: null
      }
    }
    if (await DB.User.getUserByEmail(email)) {
      return {
        user: null,
        error: 'This user already exists. Please login',
        token: null
      }
    }
    try {
      const user = await DB.User.create({
        name,
        email,
        password,
      });
      const payload = user.toJSON();
      return {
        error: null,
        user: payload,
        token: JWT.sign(payload, process.env.JWT)
      }
    } catch (error) {
      return {
        user: null,
        error: error.message || 'Something went wrong on our end. Please try again',
        token: null
      }
    }
  }
});