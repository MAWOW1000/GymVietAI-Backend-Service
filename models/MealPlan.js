const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const DailyPlan = require('./DailyPlan');

const MealPlan = sequelize.define('nutrition_plan_metadata', {
    plan_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    generated_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    calories_target: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    protein_target: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    carbs_target: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    fat_target: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'nutrition_plan_metadata',
    timestamps: false
});

const Allergen = sequelize.define('nutrition_allergens', {
    allergen_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    plan_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    allergen_name: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
}, {
    tableName: 'nutrition_allergens',
    timestamps: false
});

const DietaryRestriction = sequelize.define('nutrition_dietary_restrictions', {
    restriction_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    plan_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    restriction_name: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
}, {
    tableName: 'nutrition_dietary_restrictions',
    timestamps: false
});

// Define relationships
MealPlan.hasMany(DailyPlan, {
    foreignKey: 'plan_id',
    as: 'nutrition_daily_plans'
});

DailyPlan.belongsTo(MealPlan, {
    foreignKey: 'plan_id'
});

MealPlan.hasMany(Allergen, {
    foreignKey: 'plan_id',
    as: 'nutrition_allergens'
});

Allergen.belongsTo(MealPlan, {
    foreignKey: 'plan_id'
});

MealPlan.hasMany(DietaryRestriction, {
    foreignKey: 'plan_id',
    as: 'nutrition_dietary_restrictions'
});

DietaryRestriction.belongsTo(MealPlan, {
    foreignKey: 'plan_id'
});

module.exports = { MealPlan, Allergen, DietaryRestriction };
