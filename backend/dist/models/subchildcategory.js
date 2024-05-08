'use strict';

module.exports = function (sequelize, DataTypes) {
  var SubChildCategory = sequelize.define('SubChildCategory', {
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    subcategoryId: DataTypes.INTEGER
  }, {});
  SubChildCategory.associate = function (models) {
    // associations can be defined here
    models.SubChildCategory.belongsTo(models.category, {
      foreignKey: 'categoryId'
    });
    models.SubChildCategory.belongsTo(models.SubCategory, {
      foreignKey: 'subcategoryId'
    });
    models.SubChildCategory.hasMany(models.product, {
      foreignKey: 'childCategoryId'
    });
  };
  return SubChildCategory;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic2VxdWVsaXplIiwiRGF0YVR5cGVzIiwiU3ViQ2hpbGRDYXRlZ29yeSIsImRlZmluZSIsIm5hbWUiLCJTVFJJTkciLCJjYXRlZ29yeUlkIiwiSU5URUdFUiIsInN1YmNhdGVnb3J5SWQiLCJhc3NvY2lhdGUiLCJtb2RlbHMiLCJiZWxvbmdzVG8iLCJjYXRlZ29yeSIsImZvcmVpZ25LZXkiLCJTdWJDYXRlZ29yeSIsImhhc01hbnkiLCJwcm9kdWN0Il0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9zdWJjaGlsZGNhdGVnb3J5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgRGF0YVR5cGVzKSA9PiB7XG4gIGNvbnN0IFN1YkNoaWxkQ2F0ZWdvcnkgPSBzZXF1ZWxpemUuZGVmaW5lKCdTdWJDaGlsZENhdGVnb3J5Jywge1xuICAgIG5hbWU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgY2F0ZWdvcnlJZDogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgc3ViY2F0ZWdvcnlJZDogRGF0YVR5cGVzLklOVEVHRVJcbiAgfSwge30pO1xuICBTdWJDaGlsZENhdGVnb3J5LmFzc29jaWF0ZSA9IGZ1bmN0aW9uKG1vZGVscykge1xuICAgIC8vIGFzc29jaWF0aW9ucyBjYW4gYmUgZGVmaW5lZCBoZXJlXG4gICAgbW9kZWxzLlN1YkNoaWxkQ2F0ZWdvcnkuYmVsb25nc1RvKG1vZGVscy5jYXRlZ29yeSwgeyBmb3JlaWduS2V5OiAnY2F0ZWdvcnlJZCcgfSk7XG4gICAgbW9kZWxzLlN1YkNoaWxkQ2F0ZWdvcnkuYmVsb25nc1RvKG1vZGVscy5TdWJDYXRlZ29yeSwgeyBmb3JlaWduS2V5OiAnc3ViY2F0ZWdvcnlJZCcgfSk7XG4gICAgbW9kZWxzLlN1YkNoaWxkQ2F0ZWdvcnkuaGFzTWFueShtb2RlbHMucHJvZHVjdCwgeyBmb3JlaWduS2V5OiAnY2hpbGRDYXRlZ29yeUlkJyB9KTtcblxuICB9O1xuICByZXR1cm4gU3ViQ2hpbGRDYXRlZ29yeTtcbn07Il0sIm1hcHBpbmdzIjoiQUFBQSxZQUFZOztBQUNaQSxNQUFNLENBQUNDLE9BQU8sR0FBRyxVQUFDQyxTQUFTLEVBQUVDLFNBQVMsRUFBSztFQUN6QyxJQUFNQyxnQkFBZ0IsR0FBR0YsU0FBUyxDQUFDRyxNQUFNLENBQUMsa0JBQWtCLEVBQUU7SUFDNURDLElBQUksRUFBRUgsU0FBUyxDQUFDSSxNQUFNO0lBQ3RCQyxVQUFVLEVBQUVMLFNBQVMsQ0FBQ00sT0FBTztJQUM3QkMsYUFBYSxFQUFFUCxTQUFTLENBQUNNO0VBQzNCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNOTCxnQkFBZ0IsQ0FBQ08sU0FBUyxHQUFHLFVBQVNDLE1BQU0sRUFBRTtJQUM1QztJQUNBQSxNQUFNLENBQUNSLGdCQUFnQixDQUFDUyxTQUFTLENBQUNELE1BQU0sQ0FBQ0UsUUFBUSxFQUFFO01BQUVDLFVBQVUsRUFBRTtJQUFhLENBQUMsQ0FBQztJQUNoRkgsTUFBTSxDQUFDUixnQkFBZ0IsQ0FBQ1MsU0FBUyxDQUFDRCxNQUFNLENBQUNJLFdBQVcsRUFBRTtNQUFFRCxVQUFVLEVBQUU7SUFBZ0IsQ0FBQyxDQUFDO0lBQ3RGSCxNQUFNLENBQUNSLGdCQUFnQixDQUFDYSxPQUFPLENBQUNMLE1BQU0sQ0FBQ00sT0FBTyxFQUFFO01BQUVILFVBQVUsRUFBRTtJQUFrQixDQUFDLENBQUM7RUFFcEYsQ0FBQztFQUNELE9BQU9YLGdCQUFnQjtBQUN6QixDQUFDIn0=