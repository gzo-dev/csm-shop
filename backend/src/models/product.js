'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    categoryId: DataTypes.INTEGER,
    subCategoryId: DataTypes.INTEGER,
    childCategoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    brand: DataTypes.STRING,
    unitSize: DataTypes.STRING,
    status: DataTypes.STRING,
    buyerPrice: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    discountPer: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    netPrice: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    sortDesc: DataTypes.TEXT,
    desc: DataTypes.TEXT,
    phoneNumber: DataTypes.TEXT,
    square: DataTypes.FLOAT,
    province: DataTypes.STRING,
    district: DataTypes.STRING,
    ward: DataTypes.STRING,
    provinceText: DataTypes.STRING,
    districtText: DataTypes.STRING,
    wardText: DataTypes.STRING,
    budget: DataTypes.FLOAT,
    typeRoom: DataTypes.STRING,
    interior: DataTypes.STRING,
    endow: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    product_id: DataTypes.STRING,
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    user_manager: {
      type: DataTypes.INTEGER,
    },
    rent: {
      type: DataTypes.BOOLEAN,
    },
    author_phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    meta_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    is_draft: {
      type: DataTypes.BOOLEAN,
      default: false
    }
  }, {});

  product.associate = function (models) {
    models.product.belongsTo(models.SubCategory, { foreignKey: 'subCategoryId' });
    models.product.hasMany(models.productphoto, { foreignKey: 'productId' });
    models.product.belongsTo(models.SubChildCategory, { foreignKey: 'childCategoryId' });
    models.product.hasMany(models.vendor_product, { foreignKey: 'productId' });
    models.product.hasMany(models.user_manager_product, { foreignKey: 'product_id' });
    models.product.belongsTo(models.user, { foreignKey: 'user_manager' });
  };

  return product;
};
