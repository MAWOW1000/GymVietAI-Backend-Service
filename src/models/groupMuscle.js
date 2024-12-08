'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GroupMuscle extends Model {
        static associate(models) {
            GroupMuscle.hasMany(models.Exercise, { foreignKey: 'group_muscle_id' });
        }
    }
    GroupMuscle.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name_vi: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'GroupMuscle',
        tableName: 'GroupMuscle',
        timestamps: true
    });
    return GroupMuscle;
};