'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkoutExercise extends Model {
    static associate(models) {
      WorkoutExercise.belongsTo(models.WorkoutDay, { foreignKey: 'workout_day_id' });
      WorkoutExercise.belongsTo(models.Exercise, { foreignKey: 'exercise_id' });
    }
  }
  WorkoutExercise.init({
    workout_exercise_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    workout_day_id: DataTypes.INTEGER,
    exercise_id: DataTypes.INTEGER,
    sets: DataTypes.INTEGER,
    reps: DataTypes.STRING,
    rest: DataTypes.INTEGER,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'WorkoutExercise',
    tableName: 'WorkoutExercise',
    timestamps: true
  });
  return WorkoutExercise;
};