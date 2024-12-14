const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { Meal } = require('./Meal');

const DailyPlan = sequelize.define('nutrition_daily_plans', {
    daily_plan_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    plan_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
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
    tableName: 'nutrition_daily_plans',
    timestamps: false
});

// Define relationships
DailyPlan.hasMany(Meal, {
    foreignKey: 'daily_plan_id',
    as: 'nutrition_meals'
});

Meal.belongsTo(DailyPlan, {
    foreignKey: 'daily_plan_id'
});

module.exports = DailyPlan;
