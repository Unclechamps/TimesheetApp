'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn(
          'Projects',
          'clientID',
          {
            type: Sequelize.STRING,
            references: {
              model: 'Clients',
              key: 'id',
              onDelete: 'cascade'
            }
          }
        )

      },

      down: (queryInterface, Sequelize) => {

        return queryInterface.changeColumn (
          'Projects',
          'clientID',
          {
            type: Sequelize.STRING,
            references: {
              model: 'Clients',
              key: 'id',
              onDelete: 'cascade'
            }
          }
        )
      }
    };
