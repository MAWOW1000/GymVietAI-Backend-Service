'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('WorkoutDay', {
            workout_day_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            day_of_week: {
                type: Sequelize.STRING,
                allowNull: false
            },
            day_of_week_vi: {
                type: Sequelize.STRING,
                allowNull: false
            },
            workout_plan_id: {
                type: Sequelize.UUID,
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
        await queryInterface.dropTable('WorkoutDay', { schema: 'public' });
    }
};