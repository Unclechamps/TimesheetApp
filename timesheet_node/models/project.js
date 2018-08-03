'use strict';
module.exports = (sequelize, DataTypes) => {
  var Project = sequelize.define('Project', {
    projectName: DataTypes.STRING,
    projectDesc: DataTypes.STRING,
    budgetedHours: DataTypes.INTEGER,
    rate: DataTypes.INTEGER,
    actualHours: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    clientID: DataTypes.INTEGER,
    clientName : DataTypes.STRING,
    ETC : DataTypes.INTEGER,
    Status : DataTypes.STRING,
    totalBill : DataTypes.INTEGER
  }, {});
  Project.associate = function(models) {
    Project.belongsTo(models.Client, {as:'Client', foreignKey:'id'})
  };
  return Project;
};
