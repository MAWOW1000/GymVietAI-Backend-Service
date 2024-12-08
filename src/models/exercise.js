'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Exercise.belongsTo(models.GroupMuscle, { foreignKey: 'group_muscle_id' });
      Exercise.belongsTo(models.Equipment, { foreignKey: 'equipment_id' });
      Exercise.belongsTo(models.Difficulty, { foreignKey: 'difficulty_id' });
    }
  }
  Exercise.init({
    exercise_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name_vi: {
      type: DataTypes.STRING,
      allowNull: false
    },
    video_male: DataTypes.TEXT,
    video_female: DataTypes.TEXT,
    description: DataTypes.TEXT,
    description_vi: DataTypes.TEXT,
    link_description: DataTypes.TEXT,
    step: DataTypes.TEXT,
    step_vi: DataTypes.TEXT,
    group_muscle_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    equipment_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    difficulty_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Exercise',
    tableName: 'Exercise',
    timestamps: true
  });
  return Exercise;
};