'use strict';
module.exports = (sequelize, DataTypes) => {
  const contact = sequelize.define('contact', {
    name: DataTypes.STRING,
    date_send: DataTypes.STRING,
    content: DataTypes.STRING,
    email: DataTypes.STRING,
    status: DataTypes.STRING,
    reply_text: DataTypes.STRING
  }, {});
  return contact;
};