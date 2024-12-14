const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Food = sequelize.define('nutrition_foods', {
    food_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    food_name: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
}, {
    tableName: 'nutrition_foods',
    timestamps: false
});

module.exports = Food;
