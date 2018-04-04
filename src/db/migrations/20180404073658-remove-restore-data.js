'use strict';

const tableName = 'user_restore_data';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(tableName, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, { id: Sequelize.INTEGER });
  }
};
