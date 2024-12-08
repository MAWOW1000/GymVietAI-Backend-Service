'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Create UUID generation function
        await queryInterface.sequelize.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        `);

        await queryInterface.createTable('WorkoutPlan', {
            workout_plan_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('uuid_generate_v4()') // Use UUID generation function
            },
            bmi_level_id: {
                type: Sequelize.INTEGER
            },
            workout_week_id: {
                type: Sequelize.INTEGER
            },
            consideration_id: {
                type: Sequelize.INTEGER
            },
            training_split: {
                type: Sequelize.STRING,
                allowNull: false
            },
            training_split_vi: {
                type: Sequelize.STRING,
                allowNull: false
            },
            goal: {
                type: Sequelize.STRING,
                allowNull: false
            },
            goal_vi: {
                type: Sequelize.STRING,
                allowNull: false
            },
            training_level: {
                type: Sequelize.STRING,
                allowNull: false
            },
            training_level_vi: {
                type: Sequelize.STRING,
                allowNull: false
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
        await queryInterface.dropTable('WorkoutPlan', { schema: 'public' });
        // Optionally, drop the UUID generation function if no longer needed
        await queryInterface.sequelize.query(`
            DROP EXTENSION IF EXISTS "uuid-ossp";
        `);
    }
};