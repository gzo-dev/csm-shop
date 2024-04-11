'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: DataTypes.STRING,
    verify: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    device1: DataTypes.STRING,
    device2: DataTypes.STRING,
    note: DataTypes.STRING,
    avatar: DataTypes.STRING,
    user_id: DataTypes.STRING,
    status: DataTypes.INTEGER,
    user_manager: DataTypes.INTEGER 
      
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    // models.user.hasOne(models.SubCategory, { foreignKey: 'subCategoryId' });
  };
  return user;
};