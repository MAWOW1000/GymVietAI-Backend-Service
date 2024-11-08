import exerciseService from '../service/exerciseService'
// const getListExercise = async (req, res) => {
//     try {
//         const { group_muscle_id, difficulty_id, equipment_id } = req.body;
//         const result = await exerciseService.getExerciseByOptions(group_muscle_id, difficulty_id, equipment_id)
//         return res.status(200).json({
//             EC: result.EC,
//             EM: result.EM,
//             DT: result.DT
//         })
//     } catch (err) {
//         return res.status(500).json({
//             EC: -1,
//             EM: "Internal Server Error",
//             DT: ""
//         })
//     }
// }

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
module.exports = {
    getListExercise, getListEquipment, getListGroupMuscle
}