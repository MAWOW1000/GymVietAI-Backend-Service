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
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        bmi_level_id: DataTypes.INTEGER,
        workout_week_id: DataTypes.INTEGER,
        consideration_id: DataTypes.INTEGER,
        training_split: {
            type: DataTypes.STRING,
            allowNull: false
        },
        training_split_vi: {
            type: DataTypes.STRING,
            allowNull: false
        },
        goal: {
            type: DataTypes.STRING,
            allowNull: false
        },
        goal_vi: {
            type: DataTypes.STRING,
            allowNull: false
        },
        training_level: {
            type: DataTypes.STRING,
            allowNull: false
        },
        training_level_vi: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'WorkoutPlan',
        tableName: 'WorkoutPlan',
        timestamps: true
    });
    return WorkoutPlan;
};