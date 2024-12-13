'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ImportantConsiderations', {
            consideration_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            workout_plan_id: {
                type: Sequelize.UUID
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description_vi: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            }
        }, { schema: 'public' });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('ImportantConsiderations', { schema: 'public' });
    }
};