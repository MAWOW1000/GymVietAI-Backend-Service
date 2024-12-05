'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ImportantConsiderations', {
            consideration_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            workout_plan_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'WorkoutPlan',
                    key: 'workout_plan_id'
                }
            },
            description: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('ImportantConsiderations');
    }
};