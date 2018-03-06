'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
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

    await queryInterface.addConstraint('users', ['email'], {
      type: 'unique',
      name: 'unique_user_email',
    });

    return queryInterface.addIndex('users', {
      fields: ['email'],
      unique: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users', {});
  }
};
