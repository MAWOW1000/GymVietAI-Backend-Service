const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Food = require('./Food');

const Meal = sequelize.define('nutrition_meals', {
    meal_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    daily_plan_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    meal_type: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    total_calories: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    total_protein: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    total_carbs: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    total_fat: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    }
}, {
    tableName: 'nutrition_meals',
    timestamps: false
});

const MealFood = sequelize.define('nutrition_meal_foods', {
    meal_food_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    meal_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    food_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    portion_grams: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    calories: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    protein: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    carbs: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    fat: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    }
}, {
    tableName: 'nutrition_meal_foods',
    timestamps: false
});

// Define relationships
Meal.belongsToMany(Food, { 
    through: MealFood,
    foreignKey: 'meal_id',
    otherKey: 'food_id',
    as: 'foods'
});

Food.belongsToMany(Meal, {
    through: MealFood,
    foreignKey: 'food_id',
    otherKey: 'meal_id',
    as: 'meals'
});

// Add hasMany relationship for MealFood
Meal.hasMany(MealFood, {
    foreignKey: 'meal_id',
    as: 'nutrition_meal_foods'
});

MealFood.belongsTo(Meal, {
    foreignKey: 'meal_id'
});

MealFood.belongsTo(Food, {
    foreignKey: 'food_id',
    as: 'nutrition_food'
});

module.exports = { Meal, MealFood };
