'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class WorkoutDay extends Model {
        static associate(models) {
            WorkoutDay.belongsTo(models.WorkoutPlan, { foreignKey: 'workout_plan_id' });
            WorkoutDay.hasMany(models.WorkoutExercise, { foreignKey: 'workout_day_id' });
        }
    }
    WorkoutDay.init({
        workout_day_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        workout_plan_id: {
            type: DataTypes.UUID,
            references: {
                model: 'WorkoutPlan',
                key: 'workout_plan_id'
            }
        },
        workout_week_id: DataTypes.INTEGER,
        day_of_week: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        day_of_week_vi: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'WorkoutDay',
        tableName: 'WorkoutDay',
        timestamps: true
    });
    return WorkoutDay;
};