'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Exercise.belongsTo(models.GroupMuscle, { foreignKey: 'group_muscle_id' })
      Exercise.belongsTo(models.Equipment, { foreignKey: 'equipment_id' })
      Exercise.belongsTo(models.Difficulty, { foreignKey: 'difficulty_id' })
    }
  };
  Exercise.init({
    name: DataTypes.STRING,
    video_male: DataTypes.STRING,
    video_female: DataTypes.STRING,
    description: DataTypes.STRING,
    description_vi: DataTypes.STRING,
    step: DataTypes.STRING,
    step_vi: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Exercise',
  });
  return Exercise;
};