import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import UserType from 'Graph/Users/Type';
import GraphQLAuthentication from 'Middleware/GraphQLAuthentication';
import DB from 'Database';

export default mutationWithClientMutationId({
  name: 'UpdateUser',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The user ID'
    },
    name: {
      type: GraphQLString,
      description: "A optional user's name",
    },
    image: {
      type: GraphQLString,
      description: "A optional user's image url",
    }
  },
  outputFields: {
    user: {
      type: UserType,
    },
    error: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async ({ id, name, image }, { req }) => {
    await GraphQLAuthentication(req);
    if (!name && !image) {
      return {
        user: null,
        error: 'An update of some kind is required',
      };
    }
    const nameValid = DB.User.validateName(name);
    if (!!name && !nameValid) {
      return {
        user: null,
        error: 'Your full name is required',
      };
    }
    const imageValid = DB.User.validateImage(image);
    if (!!image && !imageValid) {
      return {
        user: null,
        error: 'The image url is invalid',
      };
    }
    try {
      const user = await DB.User.getUserByID(id);
      if (!user) {
        return {
          user: null,
          error: 'This user was not found in our system',
        };
      }
      if (!!name && nameValid) {
        user.name = name;
      }
      if (!!image && imageValid) {
        user.image = image;
        await DB.UserImage.createUserImage(user.id, image);
      }
      const updatedUser = await user.save();
      return {
        user: updatedUser.toJSON(),
        error: null
      }
    } catch (error) {
      return {
        user: null,
        error: error.message || 'Something went wrong on our end. Please try again',
      }
    }
  }
});