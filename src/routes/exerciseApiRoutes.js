import express from 'express'
const router = express.Router();
import exerciseController from '../controller/exerciseController'
import { verifyTokenWithCookies } from '../middleware/authMiddleware'
// api/v1/exercise

router.get("/", (req, res) => {
    return res.status(200).json({ Hi: "Hello world" })
})

router.post("/options", exerciseController.getListExercise)
router.post("/options-multiple-choice", exerciseController.getListExerciseMultipleChoice)
router.post("/options-pagination", exerciseController.getListExercisePagination)

router.get("/number-of-exercise", exerciseController.getNumberOfExercise)
router.get("/equipments", exerciseController.getListEquipment)
router.get("/group-muscles", exerciseController.getListGroupMuscle)

//Call to AI server
router.post("/create-exercise", verifyTokenWithCookies ,exerciseController.postCreateExercise)

export default router;
