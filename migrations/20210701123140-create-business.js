'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Businesses', {
      businessId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      businessName: {
        type: Sequelize.STRING
      },
      typeofBusiness: {
        type: Sequelize.ENUM,
        values: ['Airline', 'Hotel', 'Restaurant', "Taxi", 'Logistic', 'Bus', 'Event', 'Train','Apartment']
      },
      location: {
        type: Sequelize.STRING
      },
      cordinate: {
        type: Sequelize.JSON
      },
      description: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Businesses');
  }
};