'use strict';

const tableName = 'users';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(tableName, 'reset_token', { type: Sequelize.TEXT });
    await queryInterface.addColumn(tableName, 'reset_token_exp', { type: Sequelize.DATE });
    await queryInterface.addColumn(tableName, 'email_token', { type: Sequelize.TEXT });
    await queryInterface.addColumn(tableName, 'email_token_exp', { type: Sequelize.DATE });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(tableName, 'reset_token', {});
    await queryInterface.addColumn(tableName, 'reset_token_exp', {});
    await queryInterface.addColumn(tableName, 'email_token', {});
    await queryInterface.addColumn(tableName, 'email_token_exp', {});
  }
};
