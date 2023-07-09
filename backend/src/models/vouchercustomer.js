'use strict';
module.exports = (sequelize, DataTypes) => {
  const vouchercustomer = sequelize.define('vouchercustomer', {
    date_start : DataTypes.STRING,
    date_end: DataTypes.STRING,
    amount_voucher: DataTypes.INTEGER
  }, {});
  vouchercustomer.associate = function(models) {
    // associations can be defined here
    models.vouchercustomer.belongsTo(models.customer, { foreignKey: 'id' });
    models.vouchercustomer.belongsTo(models.voucher, { foreignKey: 'id' });

  };
  return vouchercustomer;
};