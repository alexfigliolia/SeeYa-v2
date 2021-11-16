import { nodeDefinitions, fromGlobalId } from 'graphql-relay';
import DB from 'Database';

const { nodeInterface, nodeField } = nodeDefinitions(
  globalID => {
    const { type, id } = fromGlobalId(globalID);
    const map = {
      User: id => {
        return DB.User.getUserByID(id);
      },
      Friendship: id => {
        return DB.Friendship.getFriendshipByID(id);
      }
    }
    return map[type](id);
  },
  obj => {
    if ('password' in obj) return 'user';
    if ('blocked' in obj) return 'friendship';
    return null;
  }
)

export const NodeInterface = nodeInterface;
export const NodeField = nodeField;