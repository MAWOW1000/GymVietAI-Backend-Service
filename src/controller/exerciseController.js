import exerciseService from '../service/exerciseService'
import axios from 'axios';

const getListExercise = async (req, res) => {
    try {
        const { groupMuscle, difficulty, equipment } = req.body;
        const result = await exerciseService.getExerciseByOptions(groupMuscle, difficulty, equipment)
        return res.status(200).json({
            EC: result.EC,
            EM: result.EM,
            DT: result.DT
        })
    } catch (err) {
        return res.status(500).json({
            EC: -1,
            EM: "Internal Server Error",
            DT: ""
        })
    }
}

const getListExerciseMultipleChoice = async (req, res) => {
    try {
        const { groupMuscle, difficulty, equipment, limit, page } = req.body;
        const result = await exerciseService.getExerciseByMultipleOptions(groupMuscle, difficulty, equipment, +limit, +page)
        return res.status(200).json({
            EC: result.EC,
            EM: result.EM,
            DT: result.DT
        })
    } catch (err) {
        return res.status(500).json({
            EC: -1,
            EM: "Internal Server Error",
            DT: ""
        })
    }
}

const getListEquipment = async (req, res) => {
    try {
        const result = await exerciseService.getEquipmentAll()
        return res.status(200).json({
            EC: result.EC,
            EM: result.EM,
            DT: result.DT
        })
    } catch (err) {
        return res.status(500).json({
            EC: -1,
            EM: "Internal Server Error",
            DT: ""
        })
    }
}

const getListGroupMuscle = async (req, res) => {
    try {
        const result = await exerciseService.getGroupMuscleAll()
        return res.status(200).json({
            EC: result.EC,
            EM: result.EM,
            DT: result.DT
        })
    } catch (err) {
        return res.status(500).json({
            EC: -1,
            EM: "Internal Server Error",
            DT: ""
        })
    }
}

const getListExercisePagination = async (req, res) => {
    try {
        const { groupMuscle, difficulty, equipment, limit, page } = req.body;
        const result = await exerciseService.getExerciseByOptionsPagination(groupMuscle, difficulty, equipment, +limit, +page)
        return res.status(200).json({
            EC: result.EC,
            EM: result.EM,
            DT: result.DT
        })
    } catch (err) {
        return res.status(500).json({
            EC: -1,
            EM: "Internal Server Error",
            DT: ""
        })
    }
}

const getNumberOfExercise = async (req, res) => {
    try {
        const result = await exerciseService.getExerciseAll()
        return res.status(200).json({
            EC: result.EC,
            EM: result.EM,
            DT: result.DT
        })
    } catch (err) {
        return res.status(500).json({
            EC: -1,
            EM: "Internal Server Error",
            DT: ""
        })
    }
}

const postCreateExercise = async (req, res) => {
    try {
        let { Gender, Weight, Height, Age, continent } = req.body;

        // Convert to numbers if possible
        Weight = Number(Weight);
        Height = Number(Height);
        Age = Number(Age);

        // Basic input validation
        if (!Gender || isNaN(Weight) || isNaN(Height) || isNaN(Age) || !continent) {
            return res.status(400).json({
                EC: -1,
                EM: "Missing required fields or invalid number inputs",
                DT: ""
            });
        }

        // Call the AI server API
        const bmi_result = await axios.post('http://127.0.0.1:5001/api/workout-plan', {
            Gender,
            Weight,
            Height,
            Age,
            continent,
        });

        if (bmi_result.data.EC !== 0) {
            return res.status(400).json({
                EC: bmi_result.data.EC,
                EM: bmi_result.data.EM,
                DT: ""
            });
        }
        const result = await exerciseService.getWorkoutPlan(bmi_result.data.DT[0]);

        if (result.EC === 0) {
            return res.status(200).json({
                EC: result.EC,
                EM: result.EM,
                DT: result.DT
            })
        }
        else if(result.EC === 1) {
            return res.status(400).json({
                EC: result.EC,
                EM: result.EM,
                DT: result.DT
            });
        }
        else{
            return res.status(500).json({
                EC: result.EC,
                EM: result.EM,
                DT: result.DT
            });
        }
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({
            EC: -1,
            EM: "Internal Server Error",
            DT: ""
        });
    }
}

module.exports = {
    getListExercise, getListEquipment, getListGroupMuscle, getListExercisePagination, getNumberOfExercise, getListExerciseMultipleChoice,
    postCreateExercise,
}