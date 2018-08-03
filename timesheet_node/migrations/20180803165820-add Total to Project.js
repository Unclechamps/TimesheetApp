'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Projects',
      'totalBill',
      {
        type: Sequelize.STRING,
      }
    )
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn(
        'Projects',
        'totalBill',
        {
          type: Sequelize.STRING,
        }
      )
  }
};
