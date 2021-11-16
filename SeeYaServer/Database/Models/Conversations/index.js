import { Model } from 'sequelize';

export default class Converation extends Model {
  static init(DB, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
          unique: true
        }
      },
      {
        sequelize: DB,
        tableName: 'conversation',
        updatedAt: 'updated_at',
        createdAt: 'created_at',
      }
    );
  }
  // static async getUserRelationships(id) {
  //   return await Friendship.findAll({
  //     where: {
  //       [Op.or]: [
  //         { person_id: id },
  //         { friend_id: id }
  //       ]
  //     }
  //   });
  // }
  // static async createFriendship(fromID, toID) {
  //   return Friendship.create({
  //     person_id: fromID,
  //     friend_id: toID
  //   });
  // }
}