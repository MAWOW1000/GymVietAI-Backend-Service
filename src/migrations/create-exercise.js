'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Exercise', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      video_male: {
        type: Sequelize.TEXT
      },
      video_female: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      description_vi: {
        type: Sequelize.TEXT
      },
      link_description: {
        type: Sequelize.TEXT
      },
      step: {
        type: Sequelize.TEXT
      },
      step_vi: {
        type: Sequelize.TEXT
      },
      group_muscle_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'GroupMuscle',
          key: 'id'
        }
      },
      equipment_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Equipment',
          key: 'id'
        }
      },
      difficulty_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Difficulty',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Exercise');
  }
};
