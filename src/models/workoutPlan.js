'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class WorkoutPlan extends Model {
        static associate(models) {
            WorkoutPlan.belongsTo(models.BmiLevel, { foreignKey: 'bmi_level_id' });
            WorkoutPlan.hasMany(models.WorkoutDay, { foreignKey: 'workout_plan_id' });
            WorkoutPlan.hasMany(models.ImportantConsiderations, { foreignKey: 'workout_plan_id' });
        }
    }
    WorkoutPlan.init({
        workout_plan_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        bmi_level_id: DataTypes.INTEGER,
        training_split: DataTypes.STRING,
        goal: DataTypes.STRING,
        training_level: DataTypes.STRING,
        important_considerations: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'WorkoutPlan',
        tableName: 'WorkoutPlan',
        timestamps: true
    });
    return WorkoutPlan;
};