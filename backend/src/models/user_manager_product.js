"use strict";
module.exports = (sequelize, DataTypes) => {
  const user_manager_product = sequelize.define(
    "user_manager_product",
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Products",
          key: "id",
        },
      },
      user_manager: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      user_owner: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {}
  );
  user_manager_product.associate = function (models) {
    models.user_manager_product.belongsTo(models.user, {
      foreignKey: "user_manager",
      as: "managerUser", // Tên alias cho mối quan hệ
    });
    models.user_manager_product.belongsTo(models.user, {
      foreignKey: "user_owner",
      as: "userOwner", // Tên alias cho mối quan hệ
    });
    models.user_manager_product.belongsTo(models.product, {
      foreignKey: "product_id",
    });
  };

  return user_manager_product;
};
