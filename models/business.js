'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Business extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Business.init({
    businessId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    businessName: DataTypes.STRING,
    typeofBusiness: {
      type: DataTypes.ENUM,
      values: ['Airline', 'Hotel', 'Restaurant', "Taxi", 'Logistic', 'Bus', 'Event', 'Train']
    },
    location: DataTypes.STRING,
    cordinate: DataTypes.JSON,
    description: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Business',
  });
  return Business;
};