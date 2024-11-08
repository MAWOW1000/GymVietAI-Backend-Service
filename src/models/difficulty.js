'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Difficulty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Difficulty.hasMany(models.Exercise, { sourceKey: 'id' });
        }
    };
    Difficulty.init({
        name: DataTypes.STRING,
        desciption: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Difficulty',
    });
    return Difficulty;
};