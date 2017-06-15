'use strict';
module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define('Vote', {
    answer: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Vote.belongsTo(models.Beever);
      }
    }
  });

  // sequelize.sync({
  //   force: true,
  // });
  return Vote;
};