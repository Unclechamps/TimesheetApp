'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn(
          'Projects',
          'actualHours',
          {
            type: Sequelize.DOUBLE(10,2)
          }
        )

      },

      down: (queryInterface, Sequelize) => {

        return queryInterface.removeColumn (
          'Projects',
          'actualHours',
        )
      }
    };
