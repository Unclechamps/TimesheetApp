'use strict';
module.exports = (sequelize, DataTypes) => {
  var Client = sequelize.define('Client', {
    clientName: DataTypes.STRING,
    contactName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    userID : DataTypes.INTEGER
  }, {});
  Client.associate = function(models) {
    // associations can be defined here
    Client.belongsTo(models.User, {as:'User', foreignKey:'id'})
    Client.hasMany(models.Project, {as:'Project', foreignKey:'id'})
  };
  return Client;
};
