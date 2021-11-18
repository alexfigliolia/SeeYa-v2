import Sequelize, { DataTypes } from 'sequelize';
import FS from 'fs';
import path from 'path';
import Config from 'Database/config/config';
import Logger from 'Logger';

const DB = {};

Logger.log(['blue', 'bold'], '\n» Initializeing ORM');

let sequelize;
if (process.env.NODE_ENV === 'development') {
  sequelize = new Sequelize('seeya', 'alexfigliolia', 'figliolia', {
    host: 'localhost',
    port: 5431,
    dialect: 'postgres',
    logging: false
  });
} else {
  sequelize = new Sequelize(process.env.DB_URL);
}

const Directory = FS.readdirSync(__dirname + '/Models');
const { length } = Directory;
for (let i = 0; i < length; i++) {
  const item = Directory[i];
  if (item.indexOf('.') === -1) {
    const ModelFiles = FS.readdirSync(__dirname + `/Models/${item}`);
    const { length: Models } = ModelFiles;
    for (let j = 0; j < Models; j++) {
      const file = ModelFiles[j];
      if (file === 'index.js') {
        const Model = require(path.join(__dirname, `/Models/${item}/index.js`)).default.init(sequelize, DataTypes);
        DB[Model.name] = Model;
      }
    }
  }
}

Logger.log(['blue', 'bold'], '\n   » Attaching models');

Object.keys(DB).forEach(modelName => {
  if (DB[modelName].associate) {
    DB[modelName].associate(DB);
  }
});

Logger.log(['blue', 'bold'], '\n   » Creating associations');

DB.sequelize = sequelize;
DB.Sequelize = Sequelize;

(async () => {
  try {
    await DB.sequelize.authenticate();
    Logger.log(['blue', 'bold'], '\n» Database connection verified!\n');
    try {
      Logger.log(['blue', 'bold'], '   » Looking for Trigram extension\n');
      const [TG] = await DB.sequelize.query("SELECT * FROM pg_extension WHERE extname='pg_trgm';");
      if (!TG.length) {
        throw new Error('Missing trigram extension');
      }
      Logger.log(['blue', 'bold'], '\n   » Trigram extension found!\n');
    } catch (error) {
      Logger.log(['blue', 'bold'], "   » Trigram extension doesn't exist. Attempting to install\n");
      try {
        await DB.sequelize.query('CREATE EXTENSION pg_trgm;')
        Logger.log(['blue', 'bold'], '\n   » Trigrams installed!\n');
      } catch (error) {
        Logger.log(['red', 'bold'], '\n   » Failed to install trigrams!\n');
        throw new Error(error);
      }
    }
    Logger.log(['blue', 'bold'], '   » Initializing tables\n');
    try {
      Logger.log(['blue', 'bold'], '      » Syncing Users\n');
      await DB.User.sync({ logging: console.log });
    } catch (error) {
      Logger.log(['red', 'bold'], '\n   » User table setup failed\n');
      console.log(error);
      throw new Error(error);
    }
    try {
      Logger.log(['blue', 'bold'], '\n      » Syncing Friendships\n');
      await DB.Friendship.sync({ logging: console.log });
    } catch (error) {
      Logger.log(['red', 'bold'], '\n   » Friendship table setup failed\n');
      console.log(error);
      throw new Error(error);
    }
    try {
      Logger.log(['blue', 'bold'], '\n      » Syncing User Images\n');
      await DB.UserImage.sync({ logging: console.log });
    } catch (error) {
      Logger.log(['red', 'bold'], '\n   » User image table setup failed\n');
      console.log(error);
      throw new Error(error);
    }
    Logger.log(['blue', 'bold'], '\n   » Tables are good!\n');
    Logger.log(['magenta', 'bold'], '\nOff to the races! 🎉 \n');
  } catch (error) {
    Logger.log(['red', 'bold'], '\n   » Database setup failed. Crapping pants\n');
    throw new Error(error);
  }
})();

export default DB;