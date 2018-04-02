'use strict';

const tableName = 'user_temp_data';
const newTableName = 'user_restore_data';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameTable(tableName, newTableName);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameTable(newTableName, tableName);
  }
};
