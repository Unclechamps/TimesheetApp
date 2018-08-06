'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Projects',
      'Status',
      {
        type: Sequelize.STRING,
      }
    )
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn(
        'Projects',
        'Status',
        {
          type: Sequelize.STRING,
        }
      )
  }
};
