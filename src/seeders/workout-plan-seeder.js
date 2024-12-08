'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            // Read JSON file first
            const jsonPath = path.join(__dirname, 'plan_1.json');
            if (!fs.existsSync(jsonPath)) {
                throw new Error(`plan_1.json not found at ${jsonPath}`);
            }

            const planData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

            // Insert BMI levels first
            const bmiLevels = [
                {
                    id: 1,
                    name: 'Underweight',
                    range_from: 0,
                    range_to: 18.5,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 2,
                    name: 'Normal weight',
                    range_from: 18.5,
                    range_to: 24.9,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 3,
                    name: 'Overweight',
                    range_from: 25.0,
                    range_to: 29.9,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 4,
                    name: 'Obese',
                    range_from: 30.0,
                    range_to: 100,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ];

            await queryInterface.bulkInsert('BmiLevel', bmiLevels);

            // Insert workout plans
            const workoutPlans = [];
            for (let i = 1; i <= 2; i++) {
                const plan = planData[`workout_plan_${i}`];
                workoutPlans.push({
                    bmi_level_id: planData.bmi_level,
                    training_split: plan.training_split,
                    goal: plan.goal,
                    training_level: plan.training_level,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            }

            const insertedPlans = await queryInterface.bulkInsert('WorkoutPlan', workoutPlans, { returning: true });

            // Insert workout days and exercises
            for (let planIndex = 0; planIndex < insertedPlans.length; planIndex++) {
                const planId = insertedPlans[planIndex].workout_plan_id;
                const plan = planData[`workout_plan_${planIndex + 1}`];

                // Insert days
                for (let dayIndex = 0; dayIndex < plan.days.length; dayIndex++) {
                    const day = plan.days[dayIndex];
                    const workoutDay = await queryInterface.bulkInsert('WorkoutDay', [{
                        workout_plan_id: planId,
                        day_of_week: dayIndex + 1,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }], { returning: true });

                    // Insert exercises for each day
                    const exercises = day.exercises.map(exercise => ({
                        workout_day_id: workoutDay[0].workout_day_id,
                        exercise_name: exercise.exercise_name || null,
                        sets: exercise.sets || null,
                        reps: exercise.reps || null,
                        rest: exercise.rest || null,
                        notes: exercise.notes || null,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }));

                    if (exercises.length > 0) {
                        await queryInterface.bulkInsert('WorkoutExercise', exercises);
                    }
                }

                // Insert important considerations
                const considerations = plan.important_considerations.map(consideration => ({
                    workout_plan_id: planId,
                    description: consideration,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }));

                await queryInterface.bulkInsert('ImportantConsiderations', considerations);
            }
        } catch (error) {
            console.error('Error in workout plan seeder:', error);
            throw error;
        }
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('WorkoutPlan', null, {});
        await queryInterface.bulkDelete('WorkoutDay', null, {});
        await queryInterface.bulkDelete('WorkoutExercise', null, {});
        await queryInterface.bulkDelete('ImportantConsiderations', null, {});
        await queryInterface.bulkDelete('BmiLevel', null, {});
    }
};