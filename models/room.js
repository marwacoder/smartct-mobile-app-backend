'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Room.init({
    roomId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    roomName: DataTypes.STRING,
    roomNumber: DataTypes.INTEGER,
    capacity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    smoke: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    photo: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: ['Available', 'Reserved', 'Occupied']
    }
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};