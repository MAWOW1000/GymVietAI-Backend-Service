'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('WorkoutExercise', {
            workout_exercise_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            workout_day_id: {
                type: Sequelize.INTEGER,
            },
            exercise_id: {
                type: Sequelize.UUID
            },
            sets: {
                type: Sequelize.INTEGER,
            },
            reps: {
                type: Sequelize.STRING,
            },
            rest: {
                type: Sequelize.INTEGER,
            },
            notes: {
                type: Sequelize.TEXT
            },
            notes_vi: {
                type: Sequelize.TEXT
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
        await queryInterface.dropTable('WorkoutExercise', { schema: 'public' });
    }
};