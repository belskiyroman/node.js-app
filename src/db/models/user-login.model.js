/**
 *
 * @module UserLogin
 * @type {UserLogin}
 */

const tokenCreate = require('../../utilities/token.utility').tokenCreate;
const tokenDecode = require('../../utilities/token.utility').tokenDecode;

/**
 * @param sequelize {sequelize}
 * @param DataTypes {DataTypes}
 * @returns {UserLogin}
 */
module.exports = (sequelize, DataTypes) => {
  const UserLogin = sequelize.define('UserLogin', {
    ownerId: {
      field: 'owner_id',
      type: DataTypes.INTEGER,
    },
    token: {
      field: 'token',
      type: DataTypes.TEXT,
      unique: true,
    },
    exp: {
      type: DataTypes.DATE,
    }
  }, {
    tableName: 'user_login',
    updatedAt: false,
    underscoredAll: true,
    underscored: true
  });

  UserLogin.associate = function (models) {
    UserLogin.belongsTo(models.User)
  };

  UserLogin.hook('beforeCreate', async (instance) => {
    const user = await instance.getUser();
    const userId = user.getDataValue('id');
    const token = tokenCreate({
      id: userId,
      email: user.getDataValue('email'),
    });
    instance.setDataValue('token', token);
    instance.setDataValue('ownerId', userId);
    instance.setDataValue('exp', tokenDecode(token).exp * 1000);
  });

  return UserLogin;
};
