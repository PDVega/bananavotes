'use strict';
module.exports = function(sequelize, DataTypes) {
  var Topic = sequelize.define('Topic', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Topic.hasMany(models.Vote);
        Topic.belongsTo(models.Beever);
      }
    }
  });
  return Topic;
};