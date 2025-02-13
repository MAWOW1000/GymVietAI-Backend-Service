'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Add foreign key relationships
        await queryInterface.addConstraint('WorkoutPlan', {
            fields: ['bmi_level_id'],
            type: 'foreign key',
            name: 'fk_workoutplan_bmilevel',
            references: {
                table: 'BmiLevel',
                field: 'bmi_level_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        await queryInterface.addConstraint('WorkoutDay', {
            fields: ['workout_plan_id'],
            type: 'foreign key',
            name: 'fk_workoutday_workoutplan',
            references: {
                table: 'WorkoutPlan',
                field: 'workout_plan_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        await queryInterface.addConstraint('WorkoutExercise', {
            fields: ['workout_day_id'],
            type: 'foreign key',
            name: 'fk_workoutexercise_workoutday',
            references: {
                table: 'WorkoutDay',
                field: 'workout_day_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        await queryInterface.addConstraint('WorkoutExercise', {
            fields: ['exercise_id'],
            type: 'foreign key',
            name: 'fk_workoutexercise_exercise',
            references: {
                table: 'Exercise',
                field: 'exercise_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        await queryInterface.addConstraint('Exercise', {
            fields: ['group_muscle_id'],
            type: 'foreign key',
            name: 'fk_exercise_groupmuscle',
            references: {
                table: 'GroupMuscle',
                field: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        await queryInterface.addConstraint('Exercise', {
            fields: ['equipment_id'],
            type: 'foreign key',
            name: 'fk_exercise_equipment',
            references: {
                table: 'Equipment',
                field: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        await queryInterface.addConstraint('Exercise', {
            fields: ['difficulty_id'],
            type: 'foreign key',
            name: 'fk_exercise_difficulty',
            references: {
                table: 'Difficulty',
                field: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        await queryInterface.addConstraint('ImportantConsiderations', {
            fields: ['workout_plan_id'],
            type: 'foreign key',
            name: 'fk_ImportantConsiderations_workoutplan',
            references: {
                table: 'WorkoutPlan',
                field: 'workout_plan_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
    },
    down: async (queryInterface, Sequelize) => {
        // Remove foreign key relationships
        await queryInterface.removeConstraint('WorkoutPlan', 'fk_workoutplan_bmilevel');
        await queryInterface.removeConstraint('WorkoutDay', 'fk_workoutday_workoutplan');
        await queryInterface.removeConstraint('WorkoutExercise', 'fk_workoutexercise_workoutday');
        await queryInterface.removeConstraint('WorkoutExercise', 'fk_workoutexercise_exercise');
        await queryInterface.removeConstraint('Exercise', 'fk_exercise_groupmuscle');
        await queryInterface.removeConstraint('Exercise', 'fk_exercise_equipment');
        await queryInterface.removeConstraint('Exercise', 'fk_exercise_difficulty');
        await queryInterface.removeConstraint('ImportantConsiderations', 'fk_ImportantConsiderations_workoutplan');
    }
};