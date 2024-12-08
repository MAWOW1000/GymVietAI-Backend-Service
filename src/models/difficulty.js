'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Difficulty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Difficulty.hasMany(models.Exercise, { foreignKey: 'difficulty_id' });
        }
    }
    Difficulty.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        name_vi: DataTypes.STRING,
        desciption: DataTypes.STRING,
        desciption_vi: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Difficulty',
        tableName: 'Difficulty',
        timestamps: true
    });
    return Difficulty;
};