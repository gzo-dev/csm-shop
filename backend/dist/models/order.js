'use strict';

module.exports = function (sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    custId: DataTypes.INTEGER,
    number: DataTypes.STRING,
    paymentmethod: DataTypes.STRING,
    deliverydate: DataTypes.DATE,
    grandtotal: DataTypes.INTEGER,
    status: DataTypes.ENUM('processing', 'shipping', 'delieverd', 'cancel'),
    voucherId: DataTypes.INTEGER,
    deliveryFee: DataTypes.INTEGER,
    reason: DataTypes.STRING
  }, {});
  Order.associate = function (models) {
    // associations can be defined here
    models.Order.hasMany(models.Address, {
      foreignKey: 'orderId'
    });
    models.Order.hasMany(models.Cart, {
      foreignKey: 'orderId'
    });

    // models.Order.hasMany(models.payment, { foreignKey: 'orderCreationId' });  
  };

  return Order;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic2VxdWVsaXplIiwiRGF0YVR5cGVzIiwiT3JkZXIiLCJkZWZpbmUiLCJjdXN0SWQiLCJJTlRFR0VSIiwibnVtYmVyIiwiU1RSSU5HIiwicGF5bWVudG1ldGhvZCIsImRlbGl2ZXJ5ZGF0ZSIsIkRBVEUiLCJncmFuZHRvdGFsIiwic3RhdHVzIiwiRU5VTSIsInZvdWNoZXJJZCIsImRlbGl2ZXJ5RmVlIiwicmVhc29uIiwiYXNzb2NpYXRlIiwibW9kZWxzIiwiaGFzTWFueSIsIkFkZHJlc3MiLCJmb3JlaWduS2V5IiwiQ2FydCJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvb3JkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCBEYXRhVHlwZXMpID0+IHtcbiAgY29uc3QgT3JkZXIgPSBzZXF1ZWxpemUuZGVmaW5lKCdPcmRlcicsIHtcbiAgICBjdXN0SWQ6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgIG51bWJlcjogRGF0YVR5cGVzLlNUUklORyxcbiAgICBwYXltZW50bWV0aG9kOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGRlbGl2ZXJ5ZGF0ZTogRGF0YVR5cGVzLkRBVEUsXG4gICAgZ3JhbmR0b3RhbDogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgc3RhdHVzOiBEYXRhVHlwZXMuRU5VTSgncHJvY2Vzc2luZycsJ3NoaXBwaW5nJywnZGVsaWV2ZXJkJywnY2FuY2VsJyksXG4gICAgdm91Y2hlcklkOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICBkZWxpdmVyeUZlZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgcmVhc29uOiBEYXRhVHlwZXMuU1RSSU5HXG4gIH0sIHt9KTtcbiAgT3JkZXIuYXNzb2NpYXRlID0gZnVuY3Rpb24obW9kZWxzKSB7XG4gICAgLy8gYXNzb2NpYXRpb25zIGNhbiBiZSBkZWZpbmVkIGhlcmVcbiAgICBtb2RlbHMuT3JkZXIuaGFzTWFueShtb2RlbHMuQWRkcmVzcywgeyBmb3JlaWduS2V5OiAnb3JkZXJJZCcgfSk7XG4gICAgbW9kZWxzLk9yZGVyLmhhc01hbnkobW9kZWxzLkNhcnQsIHsgZm9yZWlnbktleTogJ29yZGVySWQnIH0pO1xuXG4gICAgLy8gbW9kZWxzLk9yZGVyLmhhc01hbnkobW9kZWxzLnBheW1lbnQsIHsgZm9yZWlnbktleTogJ29yZGVyQ3JlYXRpb25JZCcgfSk7ICBcblxuICB9O1xuICByZXR1cm4gT3JkZXI7XG59OyJdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWTs7QUFDWkEsTUFBTSxDQUFDQyxPQUFPLEdBQUcsVUFBQ0MsU0FBUyxFQUFFQyxTQUFTLEVBQUs7RUFDekMsSUFBTUMsS0FBSyxHQUFHRixTQUFTLENBQUNHLE1BQU0sQ0FBQyxPQUFPLEVBQUU7SUFDdENDLE1BQU0sRUFBRUgsU0FBUyxDQUFDSSxPQUFPO0lBQ3pCQyxNQUFNLEVBQUVMLFNBQVMsQ0FBQ00sTUFBTTtJQUN4QkMsYUFBYSxFQUFFUCxTQUFTLENBQUNNLE1BQU07SUFDL0JFLFlBQVksRUFBRVIsU0FBUyxDQUFDUyxJQUFJO0lBQzVCQyxVQUFVLEVBQUVWLFNBQVMsQ0FBQ0ksT0FBTztJQUM3Qk8sTUFBTSxFQUFFWCxTQUFTLENBQUNZLElBQUksQ0FBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLFdBQVcsRUFBQyxRQUFRLENBQUM7SUFDcEVDLFNBQVMsRUFBRWIsU0FBUyxDQUFDSSxPQUFPO0lBQzVCVSxXQUFXLEVBQUVkLFNBQVMsQ0FBQ0ksT0FBTztJQUM5QlcsTUFBTSxFQUFFZixTQUFTLENBQUNNO0VBQ3BCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNOTCxLQUFLLENBQUNlLFNBQVMsR0FBRyxVQUFTQyxNQUFNLEVBQUU7SUFDakM7SUFDQUEsTUFBTSxDQUFDaEIsS0FBSyxDQUFDaUIsT0FBTyxDQUFDRCxNQUFNLENBQUNFLE9BQU8sRUFBRTtNQUFFQyxVQUFVLEVBQUU7SUFBVSxDQUFDLENBQUM7SUFDL0RILE1BQU0sQ0FBQ2hCLEtBQUssQ0FBQ2lCLE9BQU8sQ0FBQ0QsTUFBTSxDQUFDSSxJQUFJLEVBQUU7TUFBRUQsVUFBVSxFQUFFO0lBQVUsQ0FBQyxDQUFDOztJQUU1RDtFQUVGLENBQUM7O0VBQ0QsT0FBT25CLEtBQUs7QUFDZCxDQUFDIn0=