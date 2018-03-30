/**
 * @module UserResetPassword
 */

const generateHash = require('../../utilities/crypto.utility').generateHash;

/**
 * @param {Sequelize} sequelize
 * @param {DataTypes} DataTypes
 * @returns {Model}
 */
module.exports = (sequelize, DataTypes) => {
  const UserResetPassword = sequelize.define('UserResetPassword', {
    resetToken: {
      field: 'reset_token',
      type: DataTypes.TEXT,
    },
    exp: {
      type: DataTypes.DATE,
      validate: {
        expired (value) {
          if (new Date(value) < new Date()) {
            throw new sequelize.Sequelize.ValidationError('Reset token expired.')
          }
        },
      }
    }
  }, {
    tableName: 'reset_password',
    updatedAt: false,
    underscoredAll: true,
    underscored: true
  });

  UserResetPassword.associate = function (models) {
    UserResetPassword.belongsTo(models.User)
  };

  UserResetPassword.hook('beforeCreate', async (instance) => {
    const resetToken = await generateHash();
    const expire = Date.now() + process.env.RESET_TOKEN_TTL * 1000;
    instance.setDataValue('resetToken', resetToken);
    instance.setDataValue('exp', expire);
  });

  return UserResetPassword;
};
