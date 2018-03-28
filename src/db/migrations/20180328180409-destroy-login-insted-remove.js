'use strict';

const tableName = 'user_login';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(tableName, 'owner_id');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(tableName, 'owner_id', {
      type: Sequelize.INTEGER,
      foreignKey: true
    });
  }
};
