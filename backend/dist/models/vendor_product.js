'use strict';

module.exports = function (sequelize, DataTypes) {
  var vendor_product = sequelize.define('vendor_product', {
    supplierId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    unitSize: DataTypes.INTEGER
  }, {});
  vendor_product.associate = function (models) {
    // associations can be defined here
    models.vendor_product.belongsTo(models.product, {
      foreignKey: 'productId'
    });
    models.vendor_product.belongsTo(models.vendor, {
      foreignKey: 'supplierId'
    });
  };
  return vendor_product;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic2VxdWVsaXplIiwiRGF0YVR5cGVzIiwidmVuZG9yX3Byb2R1Y3QiLCJkZWZpbmUiLCJzdXBwbGllcklkIiwiSU5URUdFUiIsInByb2R1Y3RJZCIsInByaWNlIiwidW5pdFNpemUiLCJhc3NvY2lhdGUiLCJtb2RlbHMiLCJiZWxvbmdzVG8iLCJwcm9kdWN0IiwiZm9yZWlnbktleSIsInZlbmRvciJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvdmVuZG9yX3Byb2R1Y3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCBEYXRhVHlwZXMpID0+IHtcbiAgY29uc3QgdmVuZG9yX3Byb2R1Y3QgPSBzZXF1ZWxpemUuZGVmaW5lKCd2ZW5kb3JfcHJvZHVjdCcsIHtcbiAgICBzdXBwbGllcklkOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICBwcm9kdWN0SWQ6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgIHByaWNlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICB1bml0U2l6ZTogRGF0YVR5cGVzLklOVEVHRVJcbiAgICAgXG4gIH0sIHt9KTtcbiAgdmVuZG9yX3Byb2R1Y3QuYXNzb2NpYXRlID0gZnVuY3Rpb24obW9kZWxzKSB7XG4gICAgLy8gYXNzb2NpYXRpb25zIGNhbiBiZSBkZWZpbmVkIGhlcmVcbiAgICBtb2RlbHMudmVuZG9yX3Byb2R1Y3QuYmVsb25nc1RvKG1vZGVscy5wcm9kdWN0LCB7IGZvcmVpZ25LZXk6ICdwcm9kdWN0SWQnIH0pO1xuICAgIG1vZGVscy52ZW5kb3JfcHJvZHVjdC5iZWxvbmdzVG8obW9kZWxzLnZlbmRvciwgeyBmb3JlaWduS2V5OiAnc3VwcGxpZXJJZCcgfSk7ICBcblxuICB9O1xuICByZXR1cm4gdmVuZG9yX3Byb2R1Y3Q7XG59OyJdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWTs7QUFDWkEsTUFBTSxDQUFDQyxPQUFPLEdBQUcsVUFBQ0MsU0FBUyxFQUFFQyxTQUFTLEVBQUs7RUFDekMsSUFBTUMsY0FBYyxHQUFHRixTQUFTLENBQUNHLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRTtJQUN4REMsVUFBVSxFQUFFSCxTQUFTLENBQUNJLE9BQU87SUFDN0JDLFNBQVMsRUFBRUwsU0FBUyxDQUFDSSxPQUFPO0lBQzVCRSxLQUFLLEVBQUVOLFNBQVMsQ0FBQ0ksT0FBTztJQUN4QkcsUUFBUSxFQUFFUCxTQUFTLENBQUNJO0VBRXRCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNOSCxjQUFjLENBQUNPLFNBQVMsR0FBRyxVQUFTQyxNQUFNLEVBQUU7SUFDMUM7SUFDQUEsTUFBTSxDQUFDUixjQUFjLENBQUNTLFNBQVMsQ0FBQ0QsTUFBTSxDQUFDRSxPQUFPLEVBQUU7TUFBRUMsVUFBVSxFQUFFO0lBQVksQ0FBQyxDQUFDO0lBQzVFSCxNQUFNLENBQUNSLGNBQWMsQ0FBQ1MsU0FBUyxDQUFDRCxNQUFNLENBQUNJLE1BQU0sRUFBRTtNQUFFRCxVQUFVLEVBQUU7SUFBYSxDQUFDLENBQUM7RUFFOUUsQ0FBQztFQUNELE9BQU9YLGNBQWM7QUFDdkIsQ0FBQyJ9