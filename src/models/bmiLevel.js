'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BmiLevel extends Model {
        static associate(models) {
            BmiLevel.hasMany(models.WorkoutPlan, { foreignKey: 'bmi_level_id' });
        }
    }
    BmiLevel.init({
        bmi_level_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        modelName: 'BmiLevel',
        tableName: 'BmiLevel',
        timestamps: true
    });
    return BmiLevel;
};