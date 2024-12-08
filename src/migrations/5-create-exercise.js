'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create UUID generation function
    await queryInterface.sequelize.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);

    await queryInterface.createTable('Exercise', {
      exercise_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()') // Use UUID generation function
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name_vi: {
        type: Sequelize.STRING,
        allowNull: false
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
        type: Sequelize.INTEGER
      },
      equipment_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      difficulty_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    }, { schema: 'public' });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Exercise', { schema: 'public' });
    // Optionally, drop the UUID generation function if no longer needed
    await queryInterface.sequelize.query(`
      DROP EXTENSION IF EXISTS "uuid-ossp";
    `);
  }
};
