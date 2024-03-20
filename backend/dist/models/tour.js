'use strict';

module.exports = function (sequelize, DataTypes) {
  var tour = sequelize.define('tour', {
    name: DataTypes.STRING,
    tour_id: DataTypes.STRING,
    slug: DataTypes.STRING,
    status: DataTypes.STRING,
    departure: DataTypes.INTEGER,
    departureText: DataTypes.STRING,
    destination: DataTypes.INTEGER,
    destinationText: DataTypes.STRING,
    discountPer: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    sortDesc: DataTypes.TEXT,
    desc: DataTypes.TEXT,
    time_created: DataTypes.STRING,
    type: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    kindof: DataTypes.INTEGER,
    children_price: DataTypes.INTEGER,
    agent_price: DataTypes.INTEGER
  }, {});
  return tour;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic2VxdWVsaXplIiwiRGF0YVR5cGVzIiwidG91ciIsImRlZmluZSIsIm5hbWUiLCJTVFJJTkciLCJ0b3VyX2lkIiwic2x1ZyIsInN0YXR1cyIsImRlcGFydHVyZSIsIklOVEVHRVIiLCJkZXBhcnR1cmVUZXh0IiwiZGVzdGluYXRpb24iLCJkZXN0aW5hdGlvblRleHQiLCJkaXNjb3VudFBlciIsImRpc2NvdW50IiwicGhvdG8iLCJzb3J0RGVzYyIsIlRFWFQiLCJkZXNjIiwidGltZV9jcmVhdGVkIiwidHlwZSIsImNvbnRlbnQiLCJwcmljZSIsImtpbmRvZiIsImNoaWxkcmVuX3ByaWNlIiwiYWdlbnRfcHJpY2UiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL3RvdXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCBEYXRhVHlwZXMpID0+IHtcbiAgY29uc3QgdG91ciA9IHNlcXVlbGl6ZS5kZWZpbmUoJ3RvdXInLCB7XG4gICAgbmFtZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICB0b3VyX2lkOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIHNsdWc6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgc3RhdHVzOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGRlcGFydHVyZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgZGVwYXJ0dXJlVGV4dDogRGF0YVR5cGVzLlNUUklORyxcbiAgICBkZXN0aW5hdGlvbjogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgZGVzdGluYXRpb25UZXh0OiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGRpc2NvdW50UGVyOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICBkaXNjb3VudDogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgcGhvdG86IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgc29ydERlc2M6IERhdGFUeXBlcy5URVhULFxuICAgIGRlc2M6IERhdGFUeXBlcy5URVhULFxuICAgIHRpbWVfY3JlYXRlZDogRGF0YVR5cGVzLlNUUklORyxcbiAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICBjb250ZW50OiBEYXRhVHlwZXMuVEVYVCxcbiAgICBwcmljZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAga2luZG9mOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICBjaGlsZHJlbl9wcmljZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgYWdlbnRfcHJpY2U6IERhdGFUeXBlcy5JTlRFR0VSXG4gIH0sIHt9KTtcbiAgcmV0dXJuIHRvdXI7XG59OyJdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWTs7QUFDWkEsTUFBTSxDQUFDQyxPQUFPLEdBQUcsVUFBQ0MsU0FBUyxFQUFFQyxTQUFTLEVBQUs7RUFDekMsSUFBTUMsSUFBSSxHQUFHRixTQUFTLENBQUNHLE1BQU0sQ0FBQyxNQUFNLEVBQUU7SUFDcENDLElBQUksRUFBRUgsU0FBUyxDQUFDSSxNQUFNO0lBQ3RCQyxPQUFPLEVBQUVMLFNBQVMsQ0FBQ0ksTUFBTTtJQUN6QkUsSUFBSSxFQUFFTixTQUFTLENBQUNJLE1BQU07SUFDdEJHLE1BQU0sRUFBRVAsU0FBUyxDQUFDSSxNQUFNO0lBQ3hCSSxTQUFTLEVBQUVSLFNBQVMsQ0FBQ1MsT0FBTztJQUM1QkMsYUFBYSxFQUFFVixTQUFTLENBQUNJLE1BQU07SUFDL0JPLFdBQVcsRUFBRVgsU0FBUyxDQUFDUyxPQUFPO0lBQzlCRyxlQUFlLEVBQUVaLFNBQVMsQ0FBQ0ksTUFBTTtJQUNqQ1MsV0FBVyxFQUFFYixTQUFTLENBQUNTLE9BQU87SUFDOUJLLFFBQVEsRUFBRWQsU0FBUyxDQUFDUyxPQUFPO0lBQzNCTSxLQUFLLEVBQUVmLFNBQVMsQ0FBQ0ksTUFBTTtJQUN2QlksUUFBUSxFQUFFaEIsU0FBUyxDQUFDaUIsSUFBSTtJQUN4QkMsSUFBSSxFQUFFbEIsU0FBUyxDQUFDaUIsSUFBSTtJQUNwQkUsWUFBWSxFQUFFbkIsU0FBUyxDQUFDSSxNQUFNO0lBQzlCZ0IsSUFBSSxFQUFFcEIsU0FBUyxDQUFDUyxPQUFPO0lBQ3ZCWSxPQUFPLEVBQUVyQixTQUFTLENBQUNpQixJQUFJO0lBQ3ZCSyxLQUFLLEVBQUV0QixTQUFTLENBQUNTLE9BQU87SUFDeEJjLE1BQU0sRUFBRXZCLFNBQVMsQ0FBQ1MsT0FBTztJQUN6QmUsY0FBYyxFQUFFeEIsU0FBUyxDQUFDUyxPQUFPO0lBQ2pDZ0IsV0FBVyxFQUFFekIsU0FBUyxDQUFDUztFQUN6QixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDTixPQUFPUixJQUFJO0FBQ2IsQ0FBQyJ9