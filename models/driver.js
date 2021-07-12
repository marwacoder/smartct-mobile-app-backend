'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Driver.init({
    driverId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    driverName: DataTypes.STRING,
    gender: DataTypes.STRING,
    maritalStatus: DataTypes.ENUM,
    phoneNumber: DataTypes.STRING,
    emailAddress: DataTypes.STRING,
    licenceNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Driver',
  });
  return Driver;
};