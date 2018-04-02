/**
 * @module UserRestoreData
 */

const { generateHash } = require('../../utilities/crypto.utility');
/**
 * @param {Sequelize} sequelize
 * @param {DataTypes} DataTypes
 * @returns {Model}
 */
module.exports = (sequelize, DataTypes) => {
  const expired = (value) => {
    if (new Date(value) < new Date()) {
      throw new sequelize.Sequelize.ValidationError('token expired')
    }
  };

  const confirmationToken = async () => ({
    token: await generateHash(),
    expire: Date.now() + process.env.CONFIRMATION_TOKEN_TTL * 1000,
  });

  const UserRestoreData = sequelize.define('UserRestoreData', {
    resetToken: {
      field: 'reset_token',
      type: DataTypes.TEXT,
    },
    resetTokenExp: {
      field: 'reset_token_exp',
      type: DataTypes.DATE,
      validate: { expired }
    },
    emailToken: {
      field: 'email_token',
      type: DataTypes.TEXT,
    },
    emailTokenExp: {
      field: 'email_token_exp',
      type: DataTypes.DATE,
      validate: { expired }
    }
  }, {
    tableName: 'user_restore_data',
    updatedAt: false,
    createdAt: false,
    underscoredAll: true,
    underscored: true
  });

  UserRestoreData.associate = function (models) {
    UserRestoreData.belongsTo(models.User);
  };

  UserRestoreData.prototype.createResetToken = async function () {
    const { token, expire } = await confirmationToken();
    this.setDataValue('resetToken', token);
    this.setDataValue('resetTokenExp', expire);
    return token;
  };

  UserRestoreData.prototype.createEmailToken = async function () {
    const { token, expire } = await confirmationToken();
    this.setDataValue('emailToken', token);
    this.setDataValue('emailTokenExp', expire);
    return token;
  };

  return UserRestoreData;
};
