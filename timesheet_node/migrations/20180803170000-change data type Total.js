'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn(
          'Projects',
          'totalBill',
          {
            type: 'INTEGER USING CAST("totalBill" as INTEGER)'
          }
        )

      },

      down: (queryInterface, Sequelize) => {

        return queryInterface.changeColumn (
          'Projects',
          'totalBill',
          {
            type : Sequelize.STRING
          }
        )
      }
    };
