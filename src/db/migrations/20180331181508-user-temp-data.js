'use strict';

const tableName = 'user_temp_data';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        foreignKey: true,
        allowNull: false,
      },
      reset_token: {
        type: Sequelize.TEXT,
      },
      reset_token_exp: {
        type: Sequelize.DATE,
      },
      email_token: {
        type: Sequelize.TEXT,
      },
      email_token_exp: {
        type: Sequelize.DATE,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(tableName, {});
  }
};
