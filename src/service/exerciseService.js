import { includes } from 'lodash';
import db from '../models/index';
import { raw } from 'body-parser';
import { where } from 'sequelize/lib/sequelize';
const { Op } = require('sequelize');

const getExercise = async (field) => {
    let user = {};
    user = await db.User.findOne({
        where: { id: id },
    });
    return user.get({ plain: true });
};

const getExerciseByOptions = async (groupMuscle, difficulty, equipment) => {
    try {
        let exercise = [];
        const whereClause = {};

        if (groupMuscle && groupMuscle !== 'null') {
            whereClause['$GroupMuscle.name$'] = { [Op.iLike]: groupMuscle };
        }
        if (difficulty && difficulty !== 'null') {
            whereClause['$Difficulty.name$'] = { [Op.iLike]: difficulty };
        }
        if (equipment && equipment !== 'null') {
            whereClause['$Equipment.name$'] = { [Op.iLike]: equipment };
        }
        exercise = await db.Exercise.findAll({
            where: whereClause,
            attributes: ['name', 'step', 'step_vi', 'video_male', 'video_female', 'description', 'description_vi', 'link_description'],
            include: [
                {
                    model: db.GroupMuscle,
                    attributes: ["name"],
                    required: (groupMuscle && groupMuscle !== 'null')
                },
                {
                    model: db.Equipment,
                    attributes: ["name", "icon"],
                    required: (equipment && equipment !== 'null')
                },
                {
                    model: db.Difficulty,
                    attributes: ["name"],
                    required: (difficulty && difficulty !== 'null')
                },
            ],
            limit: 3,
            raw: true
        });

        if (exercise.length > 0) {
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
        console.error(e);
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

        if (groupMuscle && groupMuscle !== 'null') {
            whereClause['$GroupMuscle.name$'] = { [Op.iLike]: groupMuscle };
        }
        if (difficulty && difficulty !== 'null') {
            whereClause['$Difficulty.name$'] = { [Op.iLike]: difficulty };
        }
        if (equipment && equipment !== 'null') {
            whereClause['$Equipment.name$'] = { [Op.iLike]: equipment };
        }
        const { count, rows } = await db.Exercise.findAndCountAll({
            where: whereClause,
            attributes: ['name', 'step', 'step_vi', 'video_male', 'video_female', 'description', 'description_vi', 'link_description'],
            include: [
                {
                    model: db.GroupMuscle,
                    attributes: ["name"],
                    required: (groupMuscle && groupMuscle !== 'null')
                },
                {
                    model: db.Equipment,
                    attributes: ["name", "icon"],
                    required: (equipment && equipment !== 'null')
                },
                {
                    model: db.Difficulty,
                    attributes: ["name"],
                    required: (difficulty && difficulty !== 'null')
                },
            ],
            limit: limit,
            offset: (page - 1) * limit,
            raw: true
        });

        if (count > 0) {
            return {
                EC: 0,
                EM: 'Find Exercise Success',
                DT: { "Total page": Math.ceil(count / limit), "exercise": rows, "Total exercise": count }
            };
        } else {
            return {
                EC: 1,
                EM: 'Find Exercise Fail',
                DT: {}
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

const getExerciseByMultipleOptions = async (groupMuscle, difficulty, equipment, limit, page) => {
    try {
        const whereClause = {};
        console.log(groupMuscle, difficulty, equipment);

        if (groupMuscle && groupMuscle !== 'null') {
            whereClause['$GroupMuscle.name$'] = { [Op.in]: Array.isArray(groupMuscle) ? groupMuscle : [groupMuscle] };
        }
        if (difficulty && difficulty !== 'null') {
            whereClause['$Difficulty.name$'] = { [Op.in]: Array.isArray(difficulty) ? difficulty : [difficulty] };
        }
        if (equipment && equipment !== 'null') {
            whereClause['$Equipment.name$'] = { [Op.in]: Array.isArray(equipment) ? equipment : [equipment] };
        }

        const { count, rows } = await db.Exercise.findAndCountAll({
            where: whereClause,
            attributes: ['name', 'step', 'step_vi', 'video_male', 'video_female', 'description', 'description_vi', 'link_description'],
            include: [
                {
                    model: db.GroupMuscle,
                    attributes: ["name"],
                },
                {
                    model: db.Equipment,
                    attributes: ["name", "icon"],
                },
                {
                    model: db.Difficulty,
                    attributes: ["name"],
                },
            ],
            limit: limit,
            offset: (page - 1) * limit,
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
                EC: 1,
                EM: 'Find Exercise Fail',
                DT: []
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
        let equipment = [];

        equipment = await db.Equipment.findAll({
            attributes: ['name', 'icon'],
        });

        if (equipment.length > 0) {
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
        console.error(e);
        return {
            EC: -1,
            EM: 'Error From Service',
            DT: []
        };
    }
};

const getGroupMuscleAll = async () => {
    try {
        let groupMuscle = [];

        groupMuscle = await db.GroupMuscle.findAll({
            attributes: ['name'],
        });

        if (groupMuscle.length > 0) {
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
        console.error(e);
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

        if (count > 0) {
            return {
                EC: 0,
                EM: 'Find Exercise Success',
                DT: count
            };
        } else {
            return {
                EC: 1,
                EM: 'Find Exercise Fail',
                DT: 0
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

module.exports = {
    getExercise, getExerciseByOptions, getEquipmentAll, getGroupMuscleAll, getExerciseByOptionsPagination, getExerciseAll, getExerciseByMultipleOptions,
};