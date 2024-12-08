'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ImportantConsiderations extends Model {
        static associate(models) {
            ImportantConsiderations.belongsTo(models.WorkoutPlan, { foreignKey: 'workout_plan_id' });
        }
    }
    ImportantConsiderations.init({
        consideration_id: {
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
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description_vi: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'ImportantConsiderations',
        tableName: 'ImportantConsiderations',
        timestamps: true
    });
    return ImportantConsiderations;
};