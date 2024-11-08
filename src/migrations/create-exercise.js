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
        type: Sequelize.STRING
      },
      video_female: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      step: {
        type: Sequelize.STRING
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
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Exercise');
  }
};
