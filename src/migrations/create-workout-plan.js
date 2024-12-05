'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('WorkoutPlan', {
            workout_plan_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            bmi_level_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'BmiLevel',
                    key: 'bmi_level_id'
                }
            },
            training_split: {
                type: Sequelize.STRING
            },
            goal: {
                type: Sequelize.STRING
            },
            training_level: {
                type: Sequelize.STRING
            },
            important_considerations: {
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
        await queryInterface.dropTable('WorkoutPlan');
    }
};