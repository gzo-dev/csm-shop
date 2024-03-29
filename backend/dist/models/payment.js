'use strict';

module.exports = function (sequelize, DataTypes) {
  var payment = sequelize.define('payment', {
    custId: DataTypes.INTEGER,
    amount: DataTypes.DOUBLE,
    status: DataTypes.STRING,
    method: DataTypes.STRING,
    currency: DataTypes.STRING,
    orderCreationId: DataTypes.STRING,
    razorpayPaymentId: DataTypes.STRING,
    razorpayOrderId: DataTypes.STRING
  }, {});
  payment.associate = function (models) {
    // associations can be defined here
    models.payment.belongsTo(models.customer, {
      foreignKey: 'custId'
    });
  };
  return payment;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic2VxdWVsaXplIiwiRGF0YVR5cGVzIiwicGF5bWVudCIsImRlZmluZSIsImN1c3RJZCIsIklOVEVHRVIiLCJhbW91bnQiLCJET1VCTEUiLCJzdGF0dXMiLCJTVFJJTkciLCJtZXRob2QiLCJjdXJyZW5jeSIsIm9yZGVyQ3JlYXRpb25JZCIsInJhem9ycGF5UGF5bWVudElkIiwicmF6b3JwYXlPcmRlcklkIiwiYXNzb2NpYXRlIiwibW9kZWxzIiwiYmVsb25nc1RvIiwiY3VzdG9tZXIiLCJmb3JlaWduS2V5Il0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9wYXltZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgRGF0YVR5cGVzKSA9PiB7XG4gIGNvbnN0IHBheW1lbnQgPSBzZXF1ZWxpemUuZGVmaW5lKCdwYXltZW50Jywge1xuICAgIGN1c3RJZDogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgYW1vdW50OiBEYXRhVHlwZXMuRE9VQkxFLFxuICAgIHN0YXR1czogRGF0YVR5cGVzLlNUUklORyxcbiAgICBtZXRob2Q6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgY3VycmVuY3k6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgb3JkZXJDcmVhdGlvbklkOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIHJhem9ycGF5UGF5bWVudElkOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIHJhem9ycGF5T3JkZXJJZDogRGF0YVR5cGVzLlNUUklOR1xuICB9LCB7fSk7XG4gIHBheW1lbnQuYXNzb2NpYXRlID0gZnVuY3Rpb24obW9kZWxzKSB7XG4gICAgLy8gYXNzb2NpYXRpb25zIGNhbiBiZSBkZWZpbmVkIGhlcmVcbiAgICBtb2RlbHMucGF5bWVudC5iZWxvbmdzVG8obW9kZWxzLmN1c3RvbWVyLCB7IGZvcmVpZ25LZXk6ICdjdXN0SWQnIH0pOyAgXG5cbiAgfTtcbiAgcmV0dXJuIHBheW1lbnQ7XG59OyJdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWTs7QUFDWkEsTUFBTSxDQUFDQyxPQUFPLEdBQUcsVUFBQ0MsU0FBUyxFQUFFQyxTQUFTLEVBQUs7RUFDekMsSUFBTUMsT0FBTyxHQUFHRixTQUFTLENBQUNHLE1BQU0sQ0FBQyxTQUFTLEVBQUU7SUFDMUNDLE1BQU0sRUFBRUgsU0FBUyxDQUFDSSxPQUFPO0lBQ3pCQyxNQUFNLEVBQUVMLFNBQVMsQ0FBQ00sTUFBTTtJQUN4QkMsTUFBTSxFQUFFUCxTQUFTLENBQUNRLE1BQU07SUFDeEJDLE1BQU0sRUFBRVQsU0FBUyxDQUFDUSxNQUFNO0lBQ3hCRSxRQUFRLEVBQUVWLFNBQVMsQ0FBQ1EsTUFBTTtJQUMxQkcsZUFBZSxFQUFFWCxTQUFTLENBQUNRLE1BQU07SUFDakNJLGlCQUFpQixFQUFFWixTQUFTLENBQUNRLE1BQU07SUFDbkNLLGVBQWUsRUFBRWIsU0FBUyxDQUFDUTtFQUM3QixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDTlAsT0FBTyxDQUFDYSxTQUFTLEdBQUcsVUFBU0MsTUFBTSxFQUFFO0lBQ25DO0lBQ0FBLE1BQU0sQ0FBQ2QsT0FBTyxDQUFDZSxTQUFTLENBQUNELE1BQU0sQ0FBQ0UsUUFBUSxFQUFFO01BQUVDLFVBQVUsRUFBRTtJQUFTLENBQUMsQ0FBQztFQUVyRSxDQUFDO0VBQ0QsT0FBT2pCLE9BQU87QUFDaEIsQ0FBQyJ9