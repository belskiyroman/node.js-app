'use strict';

const tableName = 'reset_password';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(tableName, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        foreignKey: true
      },
      reset_token: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      exp: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  }
};
