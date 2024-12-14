const express = require('express');
const router = express.Router();
const { getMealPlan, createNewMealPlan } = require('../controllers/mealPlanController');

// Get latest meal plan
router.get('/meal-plan', getMealPlan);

// Create new meal plan
router.post('/meal-plan', createNewMealPlan);

module.exports = router;
