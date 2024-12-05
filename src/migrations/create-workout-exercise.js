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
                references: {
                    model: 'WorkoutDay',
                    key: 'workout_day_id'
                }
            },
            exercise_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Exercise',
                    key: 'exercise_id'
                }
            },
            sets: {
                type: Sequelize.INTEGER
            },
            reps: {
                type: Sequelize.STRING
            },
            rest: {
                type: Sequelize.INTEGER
            },
            notes: {
                type: Sequelize.TEXT
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
        await queryInterface.dropTable('WorkoutExercise');
    }
};