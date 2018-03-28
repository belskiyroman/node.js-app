'use strict';

const tableName = 'users';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      last_name: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });

    await queryInterface.addConstraint(tableName, ['email'], {
      type: 'unique',
      name: 'unique_user_email',
    });

    return queryInterface.addIndex(tableName, {
      fields: ['email'],
      unique: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(tableName, {});
  }
};
