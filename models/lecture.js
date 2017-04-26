'use strict';

const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Lecture = sequelize.define('Lecture', {
    name: DataTypes.STRING,
    reader: DataTypes.STRING,
    startDate: {
      type: DataTypes.DATE,
      get: function() {
        return moment(this.getDataValue('startDate')).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    endDate: {
      type: DataTypes.DATE,
      get: function() {
        return moment(this.getDataValue('endDate')).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        Lecture.belongsTo(models.Room);
        Lecture.belongsToMany(models.School, { through: 'LectureSchools' });
      }
    }
  });

  return Lecture;
};
