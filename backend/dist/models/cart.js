'use strict';

module.exports = function (sequelize, DataTypes) {
  var Cart = sequelize.define('Cart', {
    productId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    orderId: DataTypes.INTEGER,
    addressId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    discount: DataTypes.INTEGER
  }, {});
  Cart.associate = function (models) {
    // associations can be defined here
    models.Cart.belongsTo(models.Address, {
      foreignKey: 'addressId'
    });
    models.Cart.belongsTo(models.Order, {
      foreignKey: 'orderId'
    });
  };
  return Cart;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic2VxdWVsaXplIiwiRGF0YVR5cGVzIiwiQ2FydCIsImRlZmluZSIsInByb2R1Y3RJZCIsIklOVEVHRVIiLCJuYW1lIiwiU1RSSU5HIiwib3JkZXJJZCIsImFkZHJlc3NJZCIsInByaWNlIiwidG90YWwiLCJxdHkiLCJwaG90byIsImRpc2NvdW50IiwiYXNzb2NpYXRlIiwibW9kZWxzIiwiYmVsb25nc1RvIiwiQWRkcmVzcyIsImZvcmVpZ25LZXkiLCJPcmRlciJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvY2FydC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIERhdGFUeXBlcykgPT4ge1xuICBjb25zdCBDYXJ0ID0gc2VxdWVsaXplLmRlZmluZSgnQ2FydCcsIHtcbiAgICBwcm9kdWN0SWQ6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgIG5hbWU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgb3JkZXJJZDogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgYWRkcmVzc0lkOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICBwcmljZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgdG90YWw6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgIHF0eTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgcGhvdG86IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgZGlzY291bnQ6IERhdGFUeXBlcy5JTlRFR0VSXG4gIH0sIHt9KTtcbiAgQ2FydC5hc3NvY2lhdGUgPSBmdW5jdGlvbihtb2RlbHMpIHtcbiAgICAvLyBhc3NvY2lhdGlvbnMgY2FuIGJlIGRlZmluZWQgaGVyZVxuICAgIG1vZGVscy5DYXJ0LmJlbG9uZ3NUbyhtb2RlbHMuQWRkcmVzcywgeyBmb3JlaWduS2V5OiAnYWRkcmVzc0lkJyB9KTsgIFxuICAgIG1vZGVscy5DYXJ0LmJlbG9uZ3NUbyhtb2RlbHMuT3JkZXIsIHsgZm9yZWlnbktleTogJ29yZGVySWQnIH0pO1xuICB9O1xuICByZXR1cm4gQ2FydDtcbn07Il0sIm1hcHBpbmdzIjoiQUFBQSxZQUFZOztBQUNaQSxNQUFNLENBQUNDLE9BQU8sR0FBRyxVQUFDQyxTQUFTLEVBQUVDLFNBQVMsRUFBSztFQUN6QyxJQUFNQyxJQUFJLEdBQUdGLFNBQVMsQ0FBQ0csTUFBTSxDQUFDLE1BQU0sRUFBRTtJQUNwQ0MsU0FBUyxFQUFFSCxTQUFTLENBQUNJLE9BQU87SUFDNUJDLElBQUksRUFBRUwsU0FBUyxDQUFDTSxNQUFNO0lBQ3RCQyxPQUFPLEVBQUVQLFNBQVMsQ0FBQ0ksT0FBTztJQUMxQkksU0FBUyxFQUFFUixTQUFTLENBQUNJLE9BQU87SUFDNUJLLEtBQUssRUFBRVQsU0FBUyxDQUFDSSxPQUFPO0lBQ3hCTSxLQUFLLEVBQUVWLFNBQVMsQ0FBQ0ksT0FBTztJQUN4Qk8sR0FBRyxFQUFFWCxTQUFTLENBQUNJLE9BQU87SUFDdEJRLEtBQUssRUFBRVosU0FBUyxDQUFDTSxNQUFNO0lBQ3ZCTyxRQUFRLEVBQUViLFNBQVMsQ0FBQ0k7RUFDdEIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ05ILElBQUksQ0FBQ2EsU0FBUyxHQUFHLFVBQVNDLE1BQU0sRUFBRTtJQUNoQztJQUNBQSxNQUFNLENBQUNkLElBQUksQ0FBQ2UsU0FBUyxDQUFDRCxNQUFNLENBQUNFLE9BQU8sRUFBRTtNQUFFQyxVQUFVLEVBQUU7SUFBWSxDQUFDLENBQUM7SUFDbEVILE1BQU0sQ0FBQ2QsSUFBSSxDQUFDZSxTQUFTLENBQUNELE1BQU0sQ0FBQ0ksS0FBSyxFQUFFO01BQUVELFVBQVUsRUFBRTtJQUFVLENBQUMsQ0FBQztFQUNoRSxDQUFDO0VBQ0QsT0FBT2pCLElBQUk7QUFDYixDQUFDIn0=