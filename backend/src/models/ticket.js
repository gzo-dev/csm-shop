'use strict';
module.exports = (sequelize, DataTypes) => {
  const ticket = sequelize.define('ticket', {
    ticket_id: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    price: DataTypes.INTEGER,
    children_price: DataTypes.INTEGER,
    departureText: DataTypes.STRING,
    discountPer: DataTypes.INTEGER,
    destinationText: DataTypes.STRING,
    agent_price: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    sortDesc: DataTypes.TEXT,
    desc: DataTypes.TEXT,
    time_created: DataTypes.STRING,
    type: DataTypes.INTEGER,    
    content: DataTypes.TEXT,
    kindof: DataTypes.INTEGER,
    user_manager: DataTypes.INTEGER,
    car: DataTypes.STRING,
    buffe: DataTypes.STRING,
    departure: DataTypes.INTEGER,
    destination: DataTypes.INTEGER,
    province: DataTypes.STRING,
    district: DataTypes.STRING,
    ward: DataTypes.STRING,
    provinceText: DataTypes.STRING,
    districtText: DataTypes.STRING,
    wardText: DataTypes.STRING, 
    bonus: DataTypes.STRING
  }, {});
  return ticket;
};