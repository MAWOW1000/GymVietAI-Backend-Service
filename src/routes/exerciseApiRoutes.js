import express from 'express'
const router = express.Router();
import exerciseController from '../controller/exerciseController'
// api/v1/exercise

router.get("/", (req, res) => {
    return res.status(200).json({ Hi: "Hello world" })
})

router.post("/options", exerciseController.getListExercise)
router.get("/equipments", exerciseController.getListEquipment)
router.get("/group-muscles", exerciseController.getListGroupMuscle)

export default router;
