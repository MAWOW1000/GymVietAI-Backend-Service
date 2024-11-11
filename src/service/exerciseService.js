import { includes } from 'lodash';
import db from '../models/index'
import { raw } from 'body-parser';
import { where } from 'sequelize/lib/sequelize';
const { Op } = require('sequelize');
const getExercise = async (field) => {
    let user = {};
    user = await db.User.findOne({
        where: { id: id },
    })
    return user.get({ plain: true });
}

// const getExerciseByOptions = async (group_muscle_id, difficulty_id, equipment_id) => {
//     try {
//         let exercise = [];
//         let whereClause = {};
//         if (group_muscle_id) {
//             whereClause.group_muscle_id = group_muscle_id;
//         }
//         if (difficulty_id) {
//             whereClause.difficulty_id = difficulty_id;
//         }
//         if (equipment_id) {
//             whereClause.equipment_id = equipment_id;
//         }
//         exercise = await db.Exercise.findAll({
//             where: whereClause,
//             attributes: ['name', 'step', 'video_male', 'video_female', 'description'],
//             include: [
//                 {
//                     association: 'GroupMuscle',
//                     attributes: ["name"],
//                 },
//                 {
//                     association: 'Equipment',
//                     attributes: ["name"],
//                 },
//                 {
//                     association: 'Difficulty',
//                     attributes: ["name"],
//                 },
//             ],
//             raw: true
//         })
//         if (exercise) {
//             return {
//                 EC: 0,
//                 EM: 'Find Exercise Success',
//                 DT: exercise
//             }
//         }
//         else {
//             return {
//                 EC: 1,
//                 EM: 'Find Exercise Fail',
//                 DT: []
//             }
//         }
//     } catch (e) {
//         return {
//             EC: -1,
//             EM: 'Error From Service',
//             DT: []
//         }
//     }
// }

const getExerciseByOptions = async (groupMuscle, difficulty, equipment) => {
    try {
        let exercise = []
        const whereClause = {};

        if (groupMuscle && groupMuscle !== 'null') { // Check for null and string "null"
            whereClause['$GroupMuscle.name$'] = { [Op.iLike]: groupMuscle };
        }
        if (difficulty && difficulty !== 'null') { // Check for null and string "null"
            whereClause['$Difficulty.name$'] = { [Op.iLike]: difficulty };
        }
        if (equipment && equipment !== 'null') { // Check for null and string "null"
            whereClause['$Equipment.name$'] = { [Op.iLike]: equipment };
        }
        exercise = await db.Exercise.findAll({
            where: whereClause,
            attributes: ['name', 'step', 'video_male', 'video_female', 'description', 'link_description'],
            include: [
                {
                    association: 'GroupMuscle',
                    attributes: ["name"],
                    required: (groupMuscle && groupMuscle !== 'null') // Only required if groupMuscle is provided and not null
                },
                {
                    association: 'Equipment',
                    attributes: ["name", "icon"],
                    required: (equipment && equipment !== 'null')  // Only required if equipment is provided and not null
                },
                {
                    association: 'Difficulty',
                    attributes: ["name"],
                    required: (difficulty && difficulty !== 'null') // Only required if difficulty is provided and not null
                },
            ],
            limit: 3,
            raw: true
        });


        if (exercise) { // Check if any exercises were found using length
            return {
                EC: 0,
                EM: 'Find Exercise Success',
                DT: exercise
            };
        } else {
            return {
                EC: 1,
                EM: 'Find Exercise Fail',
                DT: []
            };
        }
    } catch (e) {
        console.error(e); // Log the error for debugging
        return {
            EC: -1,
            EM: 'Error From Service',
            DT: []
        };
    }
};

const getExerciseByOptionsPagination = async (groupMuscle, difficulty, equipment, limit, page) => {
    try {
        const whereClause = {};

        if (groupMuscle && groupMuscle !== 'null') { // Check for null and string "null"
            whereClause['$GroupMuscle.name$'] = { [Op.iLike]: groupMuscle };
        }
        if (difficulty && difficulty !== 'null') { // Check for null and string "null"
            whereClause['$Difficulty.name$'] = { [Op.iLike]: difficulty };
        }
        if (equipment && equipment !== 'null') { // Check for null and string "null"
            whereClause['$Equipment.name$'] = { [Op.iLike]: equipment };
        }
        const { count, rows } = await db.Exercise.findAndCountAll({
            where: whereClause,
            attributes: ['name', 'step', 'video_male', 'video_female', 'description', 'link_description'],
            include: [
                {
                    association: 'GroupMuscle',
                    attributes: ["name"],
                    required: (groupMuscle && groupMuscle !== 'null') // Only required if groupMuscle is provided and not null
                },
                {
                    association: 'Equipment',
                    attributes: ["name", "icon"],
                    required: (equipment && equipment !== 'null')  // Only required if equipment is provided and not null
                },
                {
                    association: 'Difficulty',
                    attributes: ["name"],
                    required: (difficulty && difficulty !== 'null') // Only required if difficulty is provided and not null
                },
            ],
            limit: limit,
            offset: ((page - 1) * limit + 1),
            raw: true
        });


        if (count > 0) { // Check if any exercises were found using length
            return {
                EC: 0,
                EM: 'Find Exercise Success',
                DT: { "Total page": Math.floor(count / limit), "exercise": rows, "Total exercise": count }
            };
        } else {
            return {
                EC: 1,
                EM: 'Find Exercise Fail',
                DT: {}
            };
        }
    } catch (e) {
        console.error(e); // Log the error for debugging
        return {
            EC: -1,
            EM: 'Error From Service',
            DT: []
        };
    }
};


const getExerciseByMultipleOptions = async (groupMuscle, difficulty, equipment, limit, page) => {
    try {
        const whereClause = {};
        console.log(groupMuscle, difficulty, equipment)
        // Ensure arrays for the where clause:
        if (groupMuscle && groupMuscle !== 'null') {
            // groupMuscle = JSON.parse(groupMuscle)
            whereClause['$GroupMuscle.name$'] = { [Op.in]: Array.isArray(groupMuscle) ? groupMuscle : [groupMuscle] };
        }
        if (difficulty && difficulty !== 'null') {
            // difficulty = JSON.parse(difficulty)
            whereClause['$Difficulty.name$'] = { [Op.in]: Array.isArray(difficulty) ? difficulty : [difficulty] };
        }
        if (equipment && equipment !== 'null') {
            // equipment = JSON.parse(equipment)
            whereClause['$Equipment.name$'] = { [Op.in]: Array.isArray(equipment) ? equipment : [equipment] };
        }


        const { count, rows } = await db.Exercise.findAndCountAll({
            where: whereClause,
            attributes: ['name', 'step', 'video_male', 'video_female', 'description', 'link_description'],
            include: [
                {
                    model: db.GroupMuscle, // Use model instead of association
                    attributes: ["name"],
                },
                {
                    model: db.Equipment, // Use model instead of association
                    attributes: ["name", "icon"],
                },
                {
                    model: db.Difficulty, // Use model instead of association
                    attributes: ["name"],
                },
            ],
            limit: limit,
            offset: (page - 1) * limit, // Correct offset calculation
            raw: true,
        });

        if (count > 0) {
            return {
                EC: 0,
                EM: 'Find Exercise Success',
                DT: { "Total page": Math.ceil(count / limit), "exercise": rows, "Total exercise": count }
            };
        } else {
            return {
                EC: 1, // Consider using a more informative EC like 404 (Not Found) if no exercises match
                EM: 'Find Exercise Fail', // Or "No exercises found matching criteria"
                DT: [] // Return an empty array if no results
            };
        }
    } catch (e) {
        console.error(e);
        return {
            EC: -1,
            EM: 'Error From Service',
            DT: []
        };
    }
};

const getEquipmentAll = async () => {
    try {
        let equipment = []

        equipment = await db.Equipment.findAll({
            attributes: ['name', 'icon'],
        });

        if (equipment) { // Check if any equipments were found
            return {
                EC: 0,
                EM: 'Find Equipment Success',
                DT: equipment
            };
        } else {
            return {
                EC: 1,
                EM: 'Find Equipment Fail',
                DT: []
            };
        }
    } catch (e) {
        console.error(e); // Log the error for debugging
        return {
            EC: -1,
            EM: 'Error From Service',
            DT: []
        };
    }
};


const getGroupMuscleAll = async () => {
    try {
        let groupMuscle = []

        groupMuscle = await db.GroupMuscle.findAll({
            attributes: ['name'],
        });

        if (groupMuscle) { // Check if any groupMuscles were found
            return {
                EC: 0,
                EM: 'Find Group Muscle Success',
                DT: groupMuscle
            };
        } else {
            return {
                EC: 1,
                EM: 'Find Group Muscle Fail',
                DT: []
            };
        }
    } catch (e) {
        console.error(e); // Log the error for debugging
        return {
            EC: -1,
            EM: 'Error From Service',
            DT: []
        };
    }
};

const getExerciseAll = async () => {
    try {

        const { count, rows } = await db.Exercise.findAndCountAll({ attributes: ['name'] });

        if (count > 0) { // Check if any groupMuscles were found
            return {
                EC: 0,
                EM: 'Find Group Muscle Success',
                DT: count
            };
        } else {
            return {
                EC: 1,
                EM: 'Find Group Muscle Fail',
                DT: 0
            };
        }
    } catch (e) {
        console.error(e); // Log the error for debugging
        return {
            EC: -1,
            EM: 'Error From Service',
            DT: []
        };
    }
}
module.exports = {
    getExercise, getExerciseByOptions, getEquipmentAll, getGroupMuscleAll, getExerciseByOptionsPagination, getExerciseAll, getExerciseByMultipleOptions
}