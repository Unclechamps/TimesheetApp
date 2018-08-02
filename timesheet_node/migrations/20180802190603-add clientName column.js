'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Projects',
      'clientName',
      {
        type: Sequelize.STRING,
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Projects',
      'clientName',
    )
  }
};
