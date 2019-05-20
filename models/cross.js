'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cross = sequelize.define('Cross', {
    athleteId: DataTypes.INTEGER,
    time: DataTypes.DATE,
    event: DataTypes.STRING
  }, {});
  Cross.associate = function(models) {
    // associations can be defined here
  };
  return Cross;
};
