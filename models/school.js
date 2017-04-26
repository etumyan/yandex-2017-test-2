'use strict';

module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define('School', {
    name: DataTypes.STRING,
    studentNumber: DataTypes.INTEGER,
  });

  return School;
};
