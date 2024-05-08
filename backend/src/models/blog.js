'use strict';
module.exports = (sequelize, DataTypes) => {
  const blog = sequelize.define('blog', {
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    discountPer: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    desc: DataTypes.TEXT,
    time_created: DataTypes.STRING,
    type: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    author: DataTypes.STRING, 
    user_author: DataTypes.INTEGER
  }, {});
  blog.associate = function(models) {
    // associations can be defined here
    models.user.hasOne(models.blog, { foreignKey: 'user_author' });
  };
  return blog;
};