'use strict';

module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    name: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    description: DataTypes.TEXT
  });

  return Room;
};
