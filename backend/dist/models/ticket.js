'use strict';

module.exports = function (sequelize, DataTypes) {
  var ticket = sequelize.define('ticket', {
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
    wardText: DataTypes.STRING
  }, {});
  return ticket;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic2VxdWVsaXplIiwiRGF0YVR5cGVzIiwidGlja2V0IiwiZGVmaW5lIiwidGlja2V0X2lkIiwiU1RSSU5HIiwibmFtZSIsImFkZHJlc3MiLCJwcmljZSIsIklOVEVHRVIiLCJjaGlsZHJlbl9wcmljZSIsImRlcGFydHVyZVRleHQiLCJkaXNjb3VudFBlciIsImRlc3RpbmF0aW9uVGV4dCIsImFnZW50X3ByaWNlIiwicGhvdG8iLCJzb3J0RGVzYyIsIlRFWFQiLCJkZXNjIiwidGltZV9jcmVhdGVkIiwidHlwZSIsImNvbnRlbnQiLCJraW5kb2YiLCJ1c2VyX21hbmFnZXIiLCJjYXIiLCJidWZmZSIsImRlcGFydHVyZSIsImRlc3RpbmF0aW9uIiwicHJvdmluY2UiLCJkaXN0cmljdCIsIndhcmQiLCJwcm92aW5jZVRleHQiLCJkaXN0cmljdFRleHQiLCJ3YXJkVGV4dCJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvdGlja2V0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgRGF0YVR5cGVzKSA9PiB7XG4gIGNvbnN0IHRpY2tldCA9IHNlcXVlbGl6ZS5kZWZpbmUoJ3RpY2tldCcsIHtcbiAgICB0aWNrZXRfaWQ6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgbmFtZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICBhZGRyZXNzOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIHByaWNlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICBjaGlsZHJlbl9wcmljZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgZGVwYXJ0dXJlVGV4dDogRGF0YVR5cGVzLlNUUklORyxcbiAgICBkaXNjb3VudFBlcjogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgZGVzdGluYXRpb25UZXh0OiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGFnZW50X3ByaWNlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICBwaG90bzogRGF0YVR5cGVzLlNUUklORyxcbiAgICBzb3J0RGVzYzogRGF0YVR5cGVzLlRFWFQsXG4gICAgZGVzYzogRGF0YVR5cGVzLlRFWFQsXG4gICAgdGltZV9jcmVhdGVkOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLCAgICBcbiAgICBjb250ZW50OiBEYXRhVHlwZXMuVEVYVCxcbiAgICBraW5kb2Y6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgIHVzZXJfbWFuYWdlcjogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgY2FyOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGJ1ZmZlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGRlcGFydHVyZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgZGVzdGluYXRpb246IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgIHByb3ZpbmNlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGRpc3RyaWN0OiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIHdhcmQ6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgcHJvdmluY2VUZXh0OiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGRpc3RyaWN0VGV4dDogRGF0YVR5cGVzLlNUUklORyxcbiAgICB3YXJkVGV4dDogRGF0YVR5cGVzLlNUUklOR1xuICB9LCB7fSk7XG4gIHJldHVybiB0aWNrZXQ7XG59OyJdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWTs7QUFDWkEsTUFBTSxDQUFDQyxPQUFPLEdBQUcsVUFBQ0MsU0FBUyxFQUFFQyxTQUFTLEVBQUs7RUFDekMsSUFBTUMsTUFBTSxHQUFHRixTQUFTLENBQUNHLE1BQU0sQ0FBQyxRQUFRLEVBQUU7SUFDeENDLFNBQVMsRUFBRUgsU0FBUyxDQUFDSSxNQUFNO0lBQzNCQyxJQUFJLEVBQUVMLFNBQVMsQ0FBQ0ksTUFBTTtJQUN0QkUsT0FBTyxFQUFFTixTQUFTLENBQUNJLE1BQU07SUFDekJHLEtBQUssRUFBRVAsU0FBUyxDQUFDUSxPQUFPO0lBQ3hCQyxjQUFjLEVBQUVULFNBQVMsQ0FBQ1EsT0FBTztJQUNqQ0UsYUFBYSxFQUFFVixTQUFTLENBQUNJLE1BQU07SUFDL0JPLFdBQVcsRUFBRVgsU0FBUyxDQUFDUSxPQUFPO0lBQzlCSSxlQUFlLEVBQUVaLFNBQVMsQ0FBQ0ksTUFBTTtJQUNqQ1MsV0FBVyxFQUFFYixTQUFTLENBQUNRLE9BQU87SUFDOUJNLEtBQUssRUFBRWQsU0FBUyxDQUFDSSxNQUFNO0lBQ3ZCVyxRQUFRLEVBQUVmLFNBQVMsQ0FBQ2dCLElBQUk7SUFDeEJDLElBQUksRUFBRWpCLFNBQVMsQ0FBQ2dCLElBQUk7SUFDcEJFLFlBQVksRUFBRWxCLFNBQVMsQ0FBQ0ksTUFBTTtJQUM5QmUsSUFBSSxFQUFFbkIsU0FBUyxDQUFDUSxPQUFPO0lBQ3ZCWSxPQUFPLEVBQUVwQixTQUFTLENBQUNnQixJQUFJO0lBQ3ZCSyxNQUFNLEVBQUVyQixTQUFTLENBQUNRLE9BQU87SUFDekJjLFlBQVksRUFBRXRCLFNBQVMsQ0FBQ1EsT0FBTztJQUMvQmUsR0FBRyxFQUFFdkIsU0FBUyxDQUFDSSxNQUFNO0lBQ3JCb0IsS0FBSyxFQUFFeEIsU0FBUyxDQUFDSSxNQUFNO0lBQ3ZCcUIsU0FBUyxFQUFFekIsU0FBUyxDQUFDUSxPQUFPO0lBQzVCa0IsV0FBVyxFQUFFMUIsU0FBUyxDQUFDUSxPQUFPO0lBQzlCbUIsUUFBUSxFQUFFM0IsU0FBUyxDQUFDSSxNQUFNO0lBQzFCd0IsUUFBUSxFQUFFNUIsU0FBUyxDQUFDSSxNQUFNO0lBQzFCeUIsSUFBSSxFQUFFN0IsU0FBUyxDQUFDSSxNQUFNO0lBQ3RCMEIsWUFBWSxFQUFFOUIsU0FBUyxDQUFDSSxNQUFNO0lBQzlCMkIsWUFBWSxFQUFFL0IsU0FBUyxDQUFDSSxNQUFNO0lBQzlCNEIsUUFBUSxFQUFFaEMsU0FBUyxDQUFDSTtFQUN0QixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDTixPQUFPSCxNQUFNO0FBQ2YsQ0FBQyJ9