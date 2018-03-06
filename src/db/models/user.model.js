/**
 * @module User
 * @type {User}
 */

const getHash = require('../../utilities/user.utility').getHash
const STRONG_PASSWORD = require('../../constants/regexp.const').STRONG_PASSWORD

/**
 * @param sequelize {sequelize}
 * @param DataTypes {DataTypes}
 * @returns {User}
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
      allowNull: false,
    },
    password: {
      field: 'password',
      type: DataTypes.VIRTUAL,
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
    }
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
      onDelete: 'CASCADE',
    });
  };

  User.prototype.getHash = function (val) {
    return getHash(process.env.SECRET + val);
  }

  User.prototype.comparePassword = function (val) {
    return this.getDataValue('passwordHash') === this.getHash(val);
  };

  return User;
};
