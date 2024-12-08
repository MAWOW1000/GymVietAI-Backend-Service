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
    exercise_id: {
      type: DataTypes.UUID,
      references: {
        model: 'Exercise',
        key: 'exercise_id'
      }
    },
    sets: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reps: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rest: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    notes: DataTypes.TEXT,
    notes_vi: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'WorkoutExercise',
    tableName: 'WorkoutExercise',
    timestamps: true
  });
  return WorkoutExercise;
};