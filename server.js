const express = require('express');
const sequelize = require('./config/database');
require('dotenv').config();

// Import models
const Food = require('./models/Food');
const { Meal, MealFood } = require('./models/Meal');
const DailyPlan = require('./models/DailyPlan');
const { MealPlan, Allergen, DietaryRestriction } = require('./models/MealPlan');

// Import routes
const mealPlanRoutes = require('./routes/mealPlanRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', mealPlanRoutes);

// Test database connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        
        // Sync all models with database
        await sequelize.sync({ alter: true });
        console.log('Database models synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
