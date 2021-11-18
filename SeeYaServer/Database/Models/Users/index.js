import { Model } from 'sequelize';
import Bcrypt from 'bcrypt';
import TrigramSearch from 'Database/Search/Trigram';

export default class User extends Model {
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
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: {
              msg: 'Email address is invalid',
            }
          }
        },
        verified: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING
        }
      },
      {
        sequelize: DB,
        freezeTableName: true,
        tableName: 'users',
        updatedAt: 'updated_at',
        createdAt: 'created_at',
        hooks: {
          beforeCreate: async user => {
            if (user.password) {
              const salt = await Bcrypt.genSaltSync(10, 'a');
              user.password = Bcrypt.hashSync(user.password, salt);
            }
          },
          beforeUpdate: async user => {
            if (user.password) {
              const salt = await Bcrypt.genSaltSync(10, 'a');
              user.password = Bcrypt.hashSync(user.password, salt);
            }
          },
        },
        indexes: [
          {
            // for TrigramSearch
            name: 'name_trigram',
            concurrently: true,
            using: 'GIN',
            fields: [DB.literal('name gin_trgm_ops')],
          },
        ],
      }
    );
  }
  static associate(DB) {
    User.belongsToMany(DB.User, {
      as: 'friends',
      foreignKey: {
        name: 'user_id',
        allowNull: false
      },
      through: DB.Friendship
    });
    User.belongsToMany(DB.User, {
      as: 'userFriends',
      foreignKey: {
        name: 'friend_id',
        allowNull: false
      },
      through: DB.Friendship
    });
    User.hasMany(DB.UserImage, {
      as: 'images',
      onDelete: 'cascade',
      hooks: true,
      constraints: false,
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      }
    });
  }
  validPassword(password) {
    return Bcrypt.compareSync(password, this.password);
  }
  async updateImage(image) {
    await this.update({ image });
    return await this.save();
  }
  static validatePassword(password) {
    const regex = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const { length } = password;
    if (length < 6 || length > 16) {
      return { valid: false, message: 'Your password must be between 6 and 16 characters' };
    }
    if (!regex.test(password)) {
      return { valid: false, message: 'Your password should contain at least one number' };
    }
    return { valid: true };
  }
  static validateName(name) {
    return (
      typeof name === 'string' &&
      name.length >= 4 &&
      name.indexOf(' ') !== -1
    );
  }
  static validateImage(url) {
    return (
      typeof url === 'string' &&
      true
    );
  }
  static async getUserByID(id) {
    return await User.findByPk(id);
  }
  static async listUsers(searchArgs) {
    const config = TrigramSearch({
      targetColumn: 'name',
      searchArgs
    });
    return User.findAll(config);
  }
  static async getUserByEmail(email) {
    return await User.findOne({ where: { email } });
  }
  static async getUserFriends(searchArgs) {
    const config = TrigramSearch({
      targetColumn: 'name',
      searchArgs
    });
    try {
      const user = await User.findOne({
        where: { id: searchArgs.user_id },
        include: {
          model: User,
          as: 'friends',
          config
        }
      })
      if (!user) {
        throw new Error('User not found!');
      }
      return user.friends;
    } catch (error) {
      throw new Error(error);
    }
  }
}