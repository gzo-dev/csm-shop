"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
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
      hidden: DataTypes.INTEGER,
      is_deleted: DataTypes.BOOLEAN,
      user_manager: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
      otp: DataTypes.STRING
    },
    {}
  );
  user.associate = function (models) {
    models.user.belongsTo(models.user, {
      foreignKey: "user_manager",
      as: "userManager", // Tên alias cho mối quan hệ
    });
    models.user.hasMany(models.user_manager_product, {
      foreignKey: "user_manager",
      as: "managerUser",
    });
    models.user.hasMany(models.product, {
      foreignKey: "user_manager",
    });
  };

  return user;
};
