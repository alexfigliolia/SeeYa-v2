import { Model } from 'sequelize';

export default class UserImage extends Model {
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
            model: 'users',
            key: 'id'
          }
        },
        url: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      },
      {
        sequelize: DB,
        tableName: 'user_images',
        updatedAt: 'updated_at',
        createdAt: 'created_at',
      }
    );
  }
  static associate(DB) {
    UserImage.belongsTo(DB.User, {
      as: 'images',
      foreignKey: {
        name: 'user_id',
        allowNull: false
      },
      constraints: false
    });
  }
  static async getUserImages(id) {
    return UserImage.findAll({
      where: {
        user_id: id
      }
    });
  }
  static async createUserImage(userID, url) {
    return UserImage.create({
      url,
      user_id: userID
    });
  }
}