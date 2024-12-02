'use strict';
const fs = require('fs');
const csv = require('csv-parser');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const exercises = [];

        // Read the CSV file
        fs.createReadStream("./_Exercise__202412012333.csv") // Update the path to your CSV file
            .pipe(csv())
            .on('data', (row) => {
                console.log('Row data:', row); // Log each row
                exercises.push({
                    id: row.id, // UUID
                    name: row.name,
                    video_male: row.video_male,
                    video_female: row.video_female,
                    description: row.description,
                    description_vi: row.description_vi,
                    link_description: row.link_description,
                    step: row.step,
                    step_vi: row.step_vi,
                    group_muscle_id: row.group_muscle_id,
                    equipment_id: row.equipment_id,
                    difficulty_id: row.difficulty_id,
                    createdAt: new Date(row.createdAt),
                    updatedAt: new Date(row.updatedAt),
                });
            })
            .on('end', async () => {
                console.log('Exercises to insert:', exercises); // Log the exercises array
                if (exercises.length > 0) {
                    await queryInterface.bulkInsert('Exercise', exercises, {});
                } else {
                    console.log('No exercises to insert.');
                }
            });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Exercise', null, {});
    }
}; 