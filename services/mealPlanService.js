const { MealPlan, Allergen, DietaryRestriction } = require('../models/MealPlan');
const DailyPlan = require('../models/DailyPlan');
const { Meal, MealFood } = require('../models/Meal');
const Food = require('../models/Food');
const sequelize = require('../config/database');

const formatMealFood = (mealFood) => {
    return {
        food_name: mealFood.nutrition_food.food_name,
        portion_grams: parseFloat(mealFood.portion_grams),
        calories: parseFloat(mealFood.calories),
        protein: parseFloat(mealFood.protein),
        carbs: parseFloat(mealFood.carbs),
        fat: parseFloat(mealFood.fat)
    };
};

const formatMeal = (meal) => {
    return {
        meal_type: meal.meal_type,
        foods: meal.nutrition_meal_foods.map(formatMealFood),
        total_calories: parseFloat(meal.total_calories),
        total_protein: parseFloat(meal.total_protein),
        total_carbs: parseFloat(meal.total_carbs),
        total_fat: parseFloat(meal.total_fat)
    };
};

const formatDailyPlan = (dailyPlan) => {
    const meals = {};
    
    if (dailyPlan.nutrition_meals) {
        dailyPlan.nutrition_meals.forEach(meal => {
            meals[meal.meal_type] = formatMeal(meal);
        });
    }

    return {
        date: dailyPlan.date,
        meals: meals,
        daily_totals: {
            calories: parseFloat(dailyPlan.total_calories),
            protein: parseFloat(dailyPlan.total_protein),
            carbs: parseFloat(dailyPlan.total_carbs),
            fat: parseFloat(dailyPlan.total_fat)
        }
    };
};

const getMealPlanData = async (planId) => {
    const mealPlan = await MealPlan.findByPk(planId, {
        include: [
            {
                model: Allergen,
                as: 'nutrition_allergens',
                attributes: ['allergen_name']
            },
            {
                model: DietaryRestriction,
                as: 'nutrition_dietary_restrictions',
                attributes: ['restriction_name']
            },
            {
                model: DailyPlan,
                as: 'nutrition_daily_plans',
                include: [{
                    model: Meal,
                    as: 'nutrition_meals',
                    include: [{
                        model: MealFood,
                        as: 'nutrition_meal_foods',
                        include: [{
                            model: Food,
                            as: 'nutrition_food'
                        }]
                    }]
                }]
            }
        ]
    });

    if (!mealPlan) {
        throw new Error('Meal plan not found');
    }

    return formatMealPlanResponse(mealPlan);
};

const getLatestMealPlan = async () => {
    const mealPlan = await MealPlan.findOne({
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Allergen,
                as: 'nutrition_allergens',
                attributes: ['allergen_name']
            },
            {
                model: DietaryRestriction,
                as: 'nutrition_dietary_restrictions',
                attributes: ['restriction_name']
            },
            {
                model: DailyPlan,
                as: 'nutrition_daily_plans',
                include: [{
                    model: Meal,
                    as: 'nutrition_meals',
                    include: [{
                        model: MealFood,
                        as: 'nutrition_meal_foods',
                        include: [{
                            model: Food,
                            as: 'nutrition_food'
                        }]
                    }]
                }]
            }
        ]
    });

    if (!mealPlan) {
        throw new Error('No meal plans found');
    }

    return formatMealPlanResponse(mealPlan);
};

const formatMealPlanResponse = (mealPlan) => {
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dailyPlans = {};

    if (mealPlan.nutrition_daily_plans && mealPlan.nutrition_daily_plans.length > 0) {
        mealPlan.nutrition_daily_plans.forEach((dailyPlan, index) => {
            if (index < weekDays.length) {
                dailyPlans[weekDays[index]] = formatDailyPlan(dailyPlan);
            }
        });
    }

    return {
        plan_metadata: {
            generated_at: mealPlan.generated_at,
            start_date: mealPlan.start_date,
            end_date: mealPlan.end_date,
            dietary_restrictions: mealPlan.nutrition_dietary_restrictions ? mealPlan.nutrition_dietary_restrictions.map(r => r.restriction_name) : [],
            allergens: mealPlan.nutrition_allergens ? mealPlan.nutrition_allergens.map(a => a.allergen_name) : [],
            macro_targets: {
                calories: mealPlan.calories_target,
                protein: mealPlan.protein_target,
                carbs: mealPlan.carbs_target,
                fat: mealPlan.fat_target
            }
        },
        daily_plans: dailyPlans
    };
};

const createMealPlan = async (planData) => {
    const transaction = await sequelize.transaction();

    try {
        // Create meal plan
        const mealPlan = await MealPlan.create({
            generated_at: new Date(),
            start_date: planData.start_date,
            end_date: planData.end_date,
            calories_target: planData.macro_targets.calories,
            protein_target: planData.macro_targets.protein,
            carbs_target: planData.macro_targets.carbs,
            fat_target: planData.macro_targets.fat,
            created_at: new Date()
        }, { transaction });

        // Create allergens
        if (planData.allergens && planData.allergens.length > 0) {
            await Promise.all(planData.allergens.map(allergen => 
                Allergen.create({
                    plan_id: mealPlan.plan_id,
                    allergen_name: allergen
                }, { transaction })
            ));
        }

        // Create dietary restrictions
        if (planData.dietary_restrictions && planData.dietary_restrictions.length > 0) {
            await Promise.all(planData.dietary_restrictions.map(restriction => 
                DietaryRestriction.create({
                    plan_id: mealPlan.plan_id,
                    restriction_name: restriction
                }, { transaction })
            ));
        }

        // Create daily plans
        for (const [day, dailyPlanData] of Object.entries(planData.daily_plans)) {
            const dailyPlan = await DailyPlan.create({
                plan_id: mealPlan.plan_id,
                date: dailyPlanData.date,
                total_calories: dailyPlanData.daily_totals.calories,
                total_protein: dailyPlanData.daily_totals.protein,
                total_carbs: dailyPlanData.daily_totals.carbs,
                total_fat: dailyPlanData.daily_totals.fat
            }, { transaction });

            // Create meals for each daily plan
            for (const [mealType, mealData] of Object.entries(dailyPlanData.meals)) {
                if (mealData) {
                    const meal = await Meal.create({
                        daily_plan_id: dailyPlan.daily_plan_id,
                        meal_type: mealType,
                        total_calories: mealData.total_calories,
                        total_protein: mealData.total_protein,
                        total_carbs: mealData.total_carbs,
                        total_fat: mealData.total_fat
                    }, { transaction });

                    // Create or find foods and create meal_foods
                    for (const foodData of mealData.foods) {
                        let food = await Food.findOne({ 
                            where: { food_name: foodData.food_name }
                        });

                        if (!food) {
                            food = await Food.create({
                                food_name: foodData.food_name
                            }, { transaction });
                        }

                        await MealFood.create({
                            meal_id: meal.meal_id,
                            food_id: food.food_id,
                            portion_grams: foodData.portion_grams,
                            calories: foodData.calories,
                            protein: foodData.protein,
                            carbs: foodData.carbs,
                            fat: foodData.fat
                        }, { transaction });
                    }
                }
            }
        }

        await transaction.commit();
        return mealPlan.plan_id;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

module.exports = {
    getMealPlanData,
    createMealPlan,
    getLatestMealPlan
};
