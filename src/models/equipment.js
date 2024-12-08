'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Equipment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Equipment.hasMany(models.Exercise, { foreignKey: 'equipment_id' });
        }
    }
    Equipment.init({
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
        },
        icon: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Equipment',
        tableName: 'Equipment',
        timestamps: true
    });
    return Equipment;
};