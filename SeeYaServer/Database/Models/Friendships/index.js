import { Model } from 'sequelize';

export default class Friendship extends Model {
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
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
        friend_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
        blocked: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        }
      },
      {
        sequelize: DB,
        tableName: 'friendships',
        updatedAt: 'updated_at',
        createdAt: 'created_at',
      }
    );
  }
  static associate(DB) {
    Friendship.belongsTo(DB.User, {
      foreignKey: {
        name: 'user_id',
        allowNull: false
      },
      constraints: false
    });
  }
  static async getFriendshipByID(id) {
    return Friendship.findByPk(id);
  }
  static async listFriendships(id) {
    return Friendship.findAll({
      where: {
        user_id: id
      }
    });
  }
  static async createFriendship(fromID, toID) {
    await Friendship.create({
      user_id: toID,
      friend_id: fromID
    });
    return await Friendship.create({
      user_id: fromID,
      friend_id: toID
    });
  }
}