import { Model } from 'sequelize';

export default class FriendRequest extends Model {
  static init(DB, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
          unique: true
        },
        person_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        friend_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        accepted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false
        }
      },
      {
        sequelize: DB,
        tableName: 'friend_request',
        updatedAt: 'updated_at',
        createdAt: 'created_at',
      }
    );
  }
  static async acceptRequest(fromID, toID) {
    const request = await FriendRequest.findOne({
      where: {
        person_id: fromID,
        friend_id: toID
      }
    });
    if (!request) {
      throw new Error('There are no friend requests between these two users');
    }
    await request.update({ accepted: true });
    await request.save();
    const DB = require('Database').default;
    await DB.Friendship.createRelationship(fromID, toID);
    await DB.Friendship.getUserRelationships(toID);
  }
  static async createFriendRequest(fromID, toID) {
    return await FriendRequest.create({
      person_id: fromID,
      friend_id: toID
    });
  }
  static async getUserFriendRequestsSentToUser(id) {
    return await FriendRequest.findAll({
      where: {
        friend_id: id
      }
    });
  }
  static async getUserFriendRequestsSentByUser(id) {
    return await FriendRequest.findAll({
      where: {
        person_id: id
      }
    });
  }
}