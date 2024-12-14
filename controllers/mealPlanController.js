const { getMealPlanData, createMealPlan, getLatestMealPlan } = require('../services/mealPlanService');

const getMealPlan = async (req, res) => {
    try {
        const mealPlanData = await getLatestMealPlan();
        res.json(mealPlanData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createNewMealPlan = async (req, res) => {
    try {
        const planData = req.body;
        const planId = await createMealPlan(planData);
        res.status(201).json({ plan_id: planId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getMealPlan,
    createNewMealPlan
};
