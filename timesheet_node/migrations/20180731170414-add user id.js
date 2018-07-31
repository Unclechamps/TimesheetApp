'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Clients',
      'userID',
      {
        type: Sequelize.INTEGER,
        references: {
          model : 'Users',
          key : 'id'
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Clients',
      'userID',
    )
  }
};
