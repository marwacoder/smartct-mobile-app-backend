'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaxiBookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TaxiBookings.init({
    bookingId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    pickUpLocation: DataTypes.STRING,
    dropOffLocation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TaxiBookings',
  });
  return TaxiBookings;
};