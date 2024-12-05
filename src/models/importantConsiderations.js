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
        workout_plan_id: DataTypes.INTEGER,
        description: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'ImportantConsiderations',
        tableName: 'ImportantConsiderations',
        timestamps: true
    });
    return ImportantConsiderations;
};