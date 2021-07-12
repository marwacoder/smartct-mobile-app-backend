'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TaxiBookings', {
      bookingId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      pickUpLocation: {
        type: Sequelize.STRING
      },
      dropOffLocation: {
        type: Sequelize.STRING
      },
      driverId: {
        type: Sequelize.STRING,
        references: {
          model: 'Drivers',
          key: 'driverId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('TaxiBookings');
  }
};