'use strict';
module.exports = function(sequelize, DataTypes) {
  var Beever = sequelize.define('Beever', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Beever;
};