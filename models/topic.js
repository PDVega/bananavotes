'use strict';
module.exports = function(sequelize, DataTypes) {
  var Topic = sequelize.define('Topic', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Topic;
};