'use strict';
module.exports = (sequelize, DataTypes) => {
  var Project = sequelize.define('Project', {
    projectName: DataTypes.STRING,
    projectDesc: DataTypes.STRING,
    budgetedHours: DataTypes.INTEGER,
    rate: DataTypes.INTEGER,
    actualHours: DataTypes.REAL(4,2),
    userID: DataTypes.INTEGER,
    clientID: DataTypes.INTEGER,
    clientName : DataTypes.STRING,
    ETC : DataTypes.REAL(4,2),
    Status : DataTypes.STRING,
    totalBill : DataTypes.REAL(4,2) 
  }, {});
  Project.associate = function(models) {
    Project.belongsTo(models.Client, {as:'Client', foreignKey:'id'})
  };
  return Project;
};
