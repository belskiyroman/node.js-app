/**
 * @module User
 */

const { ValidationError } = require('sequelize');
const { getHash, generateHash } = require('../../utilities/crypto.utility');
const { STRONG_PASSWORD } = require('../../constants');

const expired = (value) => {
  if (new Date(value) < new Date()) {
    throw new ValidationError('token expired')
  }
};

const confirmationToken = async () => ({
  token: await generateHash(),
  expire: Date.now() + process.env.CONFIRMATION_TOKEN_TTL * 1000,
});

/**
 * @param {sequelize} sequelize
 * @param {DataTypes} DataTypes
 * @returns {Model}
 */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      field: 'first_name',
      type: DataTypes.STRING
    },
    lastName: {
      field: 'last_name',
      type: DataTypes.STRING
    },
    emailConfirmed: {
      field: 'email_confirmed',
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    email: {
      field: 'email',
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Account with this email is already registered.\nIf you are the owner of this account, please log in with your email and password.'
      },
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Incorrect email format',
        },
      },
    },
    passwordHash: {
      field: 'password_hash',
      type: DataTypes.STRING,
    },
    password: {
      field: 'password',
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        is: {
          args: STRONG_PASSWORD,
          msg: 'must have one large letter, one small and one number',
        },
        len: {
          args: [6, 100],
          msg: 'must be 6 to 100 characters in length',
        },
        notEmpty: {
          args: true,
          msg: 'the password is required'
        },
      },
      set (val) {
        this.setDataValue('password', val);
        this.setDataValue('passwordHash', this.getHash(val));
      }
    },
    currentLogin: {
      type: DataTypes.VIRTUAL
    },
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
    },
  }, {
    underscoredAll: true,
    underscored: true,
    indexes: [{
      unique: true,
      fields: ['email'],
    }]
  });

  User.associate = function (models) {
    User.hasMany(models.UserLogin, {
      as: {
        singular: 'UserLogin',
        plural: 'AllUserLogin',
      },
      onDelete: 'CASCADE',
    });
  };

  User.prototype.createResetToken = async function () {
    const { token, expire } = await confirmationToken();
    this.setDataValue('resetToken', token);
    this.setDataValue('resetTokenExp', expire);
    return token;
  };

  User.prototype.setNewPassword = function () {
    this.setDataValue('resetToken', null);
    this.setDataValue('resetTokenExp', null);
    return this;
  };

  User.prototype.createEmailToken = async function () {
    const { token, expire } = await confirmationToken();
    this.setDataValue('emailToken', token);
    this.setDataValue('emailTokenExp', expire);
    return token;
  };

  User.prototype.confirmEmail = function () {
    this.setDataValue('emailToken', null);
    this.setDataValue('emailTokenExp', null);
    this.setDataValue('emailConfirmed', true);
    return this;
  };

  User.prototype.getHash = function (val) {
    return getHash(process.env.SECRET + val);
  };

  User.prototype.comparePassword = function (val) {
    return this.getDataValue('passwordHash') === this.getHash(val);
  };

  return User;
};
