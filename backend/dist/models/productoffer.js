'use strict';

module.exports = function (sequelize, DataTypes) {
  var ProductOffer = sequelize.define('ProductOffer', {
    productId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    discount_per: DataTypes.STRING,
    discount_price: DataTypes.FLOAT,
    qty: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
    net_price: DataTypes.FLOAT
  }, {});
  ProductOffer.associate = function (models) {
    // associations can be defined here
    models.ProductOffer.belongsTo(models.product, {
      foreignKey: 'productId'
    });
  };
  return ProductOffer;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic2VxdWVsaXplIiwiRGF0YVR5cGVzIiwiUHJvZHVjdE9mZmVyIiwiZGVmaW5lIiwicHJvZHVjdElkIiwiSU5URUdFUiIsImltYWdlIiwiU1RSSU5HIiwiZGlzY291bnRfcGVyIiwiZGlzY291bnRfcHJpY2UiLCJGTE9BVCIsInF0eSIsInRvdGFsIiwibmV0X3ByaWNlIiwiYXNzb2NpYXRlIiwibW9kZWxzIiwiYmVsb25nc1RvIiwicHJvZHVjdCIsImZvcmVpZ25LZXkiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL3Byb2R1Y3RvZmZlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIERhdGFUeXBlcykgPT4ge1xuICBjb25zdCBQcm9kdWN0T2ZmZXIgPSBzZXF1ZWxpemUuZGVmaW5lKCdQcm9kdWN0T2ZmZXInLCB7XG4gICAgcHJvZHVjdElkOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICBpbWFnZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICBkaXNjb3VudF9wZXI6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgZGlzY291bnRfcHJpY2U6IERhdGFUeXBlcy5GTE9BVCxcbiAgICBxdHk6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgIHRvdGFsOiBEYXRhVHlwZXMuRkxPQVQsXG4gICAgbmV0X3ByaWNlOiBEYXRhVHlwZXMuRkxPQVRcbiAgfSwge30pO1xuICBQcm9kdWN0T2ZmZXIuYXNzb2NpYXRlID0gZnVuY3Rpb24obW9kZWxzKSB7XG4gICAgLy8gYXNzb2NpYXRpb25zIGNhbiBiZSBkZWZpbmVkIGhlcmVcbiAgICBtb2RlbHMuUHJvZHVjdE9mZmVyLmJlbG9uZ3NUbyhtb2RlbHMucHJvZHVjdCwgeyBmb3JlaWduS2V5OiAncHJvZHVjdElkJyB9KTtcblxuICB9O1xuICByZXR1cm4gUHJvZHVjdE9mZmVyO1xufTsiXSwibWFwcGluZ3MiOiJBQUFBLFlBQVk7O0FBQ1pBLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHLFVBQUNDLFNBQVMsRUFBRUMsU0FBUyxFQUFLO0VBQ3pDLElBQU1DLFlBQVksR0FBR0YsU0FBUyxDQUFDRyxNQUFNLENBQUMsY0FBYyxFQUFFO0lBQ3BEQyxTQUFTLEVBQUVILFNBQVMsQ0FBQ0ksT0FBTztJQUM1QkMsS0FBSyxFQUFFTCxTQUFTLENBQUNNLE1BQU07SUFDdkJDLFlBQVksRUFBRVAsU0FBUyxDQUFDTSxNQUFNO0lBQzlCRSxjQUFjLEVBQUVSLFNBQVMsQ0FBQ1MsS0FBSztJQUMvQkMsR0FBRyxFQUFFVixTQUFTLENBQUNJLE9BQU87SUFDdEJPLEtBQUssRUFBRVgsU0FBUyxDQUFDUyxLQUFLO0lBQ3RCRyxTQUFTLEVBQUVaLFNBQVMsQ0FBQ1M7RUFDdkIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ05SLFlBQVksQ0FBQ1ksU0FBUyxHQUFHLFVBQVNDLE1BQU0sRUFBRTtJQUN4QztJQUNBQSxNQUFNLENBQUNiLFlBQVksQ0FBQ2MsU0FBUyxDQUFDRCxNQUFNLENBQUNFLE9BQU8sRUFBRTtNQUFFQyxVQUFVLEVBQUU7SUFBWSxDQUFDLENBQUM7RUFFNUUsQ0FBQztFQUNELE9BQU9oQixZQUFZO0FBQ3JCLENBQUMifQ==