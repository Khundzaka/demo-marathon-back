'use strict';
module.exports = (sequelize, DataTypes) => {
  const Athlete = sequelize.define('Athlete', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    number: DataTypes.INTEGER
  }, {});
  Athlete.associate = function(models) {
    // associations can be defined here
  };
  return Athlete;
};