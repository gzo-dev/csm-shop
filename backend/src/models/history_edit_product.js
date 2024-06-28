'use strict';
module.exports = (sequelize, DataTypes) => {
  const history_edit_product = sequelize.define('history_edit_product', {
    product_id: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    time_updated: DataTypes.INTEGER

  }, {});
  history_edit_product.associate = function(models) {
    // associations can be defined here
    models.history_edit_product.belongsTo(models.product, { foreignKey: 'product_id' });
    models.history_edit_product.belongsTo(models.user, { foreignKey: 'user_id' });

  };
  return history_edit_product;
};