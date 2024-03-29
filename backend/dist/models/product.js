'use strict';

module.exports = function (sequelize, DataTypes) {
  var product = sequelize.define('product', {
    categoryId: DataTypes.INTEGER,
    subCategoryId: DataTypes.INTEGER,
    childCategoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    brand: DataTypes.STRING,
    unitSize: DataTypes.STRING,
    status: DataTypes.STRING,
    buyerPrice: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    discountPer: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    netPrice: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    sortDesc: DataTypes.TEXT,
    desc: DataTypes.TEXT,
    phoneNumber: DataTypes.TEXT,
    square: DataTypes.FLOAT,
    province: DataTypes.STRING,
    district: DataTypes.STRING,
    ward: DataTypes.STRING,
    provinceText: DataTypes.STRING,
    districtText: DataTypes.STRING,
    wardText: DataTypes.STRING,
    budget: DataTypes.FLOAT,
    typeRoom: DataTypes.STRING,
    interior: DataTypes.STRING,
    endow: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    product_id: DataTypes.STRING,
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    user_manager: {
      type: DataTypes.INTEGER
    },
    rent: {
      type: DataTypes.BOOLEAN
    },
    author_phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {});
  product.associate = function (models) {
    // associations can be defined here
    models.product.belongsTo(models.SubCategory, {
      foreignKey: 'subCategoryId'
    });
    models.product.hasMany(models.productphoto, {
      foreignKey: 'productId'
    });
    models.product.belongsTo(models.SubChildCategory, {
      foreignKey: 'childCategoryId'
    });
    models.product.hasMany(models.vendor_product, {
      foreignKey: 'productId'
    });
    models.product.belongsTo(models.user, {
      foreignKey: 'user_manager'
    });
  };
  return product;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic2VxdWVsaXplIiwiRGF0YVR5cGVzIiwicHJvZHVjdCIsImRlZmluZSIsImNhdGVnb3J5SWQiLCJJTlRFR0VSIiwic3ViQ2F0ZWdvcnlJZCIsImNoaWxkQ2F0ZWdvcnlJZCIsIm5hbWUiLCJTVFJJTkciLCJzbHVnIiwiYnJhbmQiLCJ1bml0U2l6ZSIsInN0YXR1cyIsImJ1eWVyUHJpY2UiLCJwcmljZSIsInF0eSIsImRpc2NvdW50UGVyIiwiZGlzY291bnQiLCJ0b3RhbCIsIm5ldFByaWNlIiwicGhvdG8iLCJzb3J0RGVzYyIsIlRFWFQiLCJkZXNjIiwicGhvbmVOdW1iZXIiLCJzcXVhcmUiLCJGTE9BVCIsInByb3ZpbmNlIiwiZGlzdHJpY3QiLCJ3YXJkIiwicHJvdmluY2VUZXh0IiwiZGlzdHJpY3RUZXh0Iiwid2FyZFRleHQiLCJidWRnZXQiLCJ0eXBlUm9vbSIsImludGVyaW9yIiwiZW5kb3ciLCJyYXRpbmciLCJwcm9kdWN0X2lkIiwibm90ZSIsInR5cGUiLCJhbGxvd051bGwiLCJ1c2VyX21hbmFnZXIiLCJyZW50IiwiQk9PTEVBTiIsImF1dGhvcl9waG9uZSIsImFkZHJlc3MiLCJhc3NvY2lhdGUiLCJtb2RlbHMiLCJiZWxvbmdzVG8iLCJTdWJDYXRlZ29yeSIsImZvcmVpZ25LZXkiLCJoYXNNYW55IiwicHJvZHVjdHBob3RvIiwiU3ViQ2hpbGRDYXRlZ29yeSIsInZlbmRvcl9wcm9kdWN0IiwidXNlciJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvcHJvZHVjdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIERhdGFUeXBlcykgPT4ge1xuICBjb25zdCBwcm9kdWN0ID0gc2VxdWVsaXplLmRlZmluZSgncHJvZHVjdCcsIHtcbiAgICBjYXRlZ29yeUlkOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICBzdWJDYXRlZ29yeUlkOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICBjaGlsZENhdGVnb3J5SWQ6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgIG5hbWU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgc2x1ZzogRGF0YVR5cGVzLlNUUklORyxcbiAgICBicmFuZDogRGF0YVR5cGVzLlNUUklORyxcbiAgICB1bml0U2l6ZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICBzdGF0dXM6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgYnV5ZXJQcmljZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgcHJpY2U6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgIHF0eTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgZGlzY291bnRQZXI6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgIGRpc2NvdW50OiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICB0b3RhbDogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgbmV0UHJpY2U6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgIHBob3RvOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIHNvcnREZXNjOiBEYXRhVHlwZXMuVEVYVCxcbiAgICBkZXNjOiBEYXRhVHlwZXMuVEVYVCxcbiAgICBwaG9uZU51bWJlcjogRGF0YVR5cGVzLlRFWFQsXG4gICAgc3F1YXJlOiBEYXRhVHlwZXMuRkxPQVQsXG4gICAgcHJvdmluY2U6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgZGlzdHJpY3Q6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgd2FyZDogRGF0YVR5cGVzLlNUUklORyxcbiAgICBwcm92aW5jZVRleHQ6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgZGlzdHJpY3RUZXh0OiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIHdhcmRUZXh0OiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGJ1ZGdldDogRGF0YVR5cGVzLkZMT0FULFxuICAgIHR5cGVSb29tOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGludGVyaW9yOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGVuZG93OiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICByYXRpbmc6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgIHByb2R1Y3RfaWQ6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgbm90ZToge1xuICAgICAgdHlwZTogRGF0YVR5cGVzLlRFWFQsXG4gICAgICBhbGxvd051bGw6IHRydWVcbiAgICB9LFxuICAgIHVzZXJfbWFuYWdlcjoge1xuICAgICAgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgfSxcbiAgICByZW50OiB7XG4gICAgICB0eXBlOiBEYXRhVHlwZXMuQk9PTEVBTixcbiAgICB9LFxuICAgIGF1dGhvcl9waG9uZToge1xuICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgIGFsbG93TnVsbDogdHJ1ZVxuICAgIH0sXG4gICAgYWRkcmVzczoge1xuICAgICAgdHlwZTogRGF0YVR5cGVzLlRFWFQsXG4gICAgICBhbGxvd051bGw6IHRydWVcbiAgICB9XG4gIH0sIHt9KTtcblxuICBwcm9kdWN0LmFzc29jaWF0ZSA9IGZ1bmN0aW9uIChtb2RlbHMpIHtcbiAgICAvLyBhc3NvY2lhdGlvbnMgY2FuIGJlIGRlZmluZWQgaGVyZVxuICAgIG1vZGVscy5wcm9kdWN0LmJlbG9uZ3NUbyhtb2RlbHMuU3ViQ2F0ZWdvcnksIHsgZm9yZWlnbktleTogJ3N1YkNhdGVnb3J5SWQnIH0pO1xuICAgIG1vZGVscy5wcm9kdWN0Lmhhc01hbnkobW9kZWxzLnByb2R1Y3RwaG90bywgeyBmb3JlaWduS2V5OiAncHJvZHVjdElkJyB9KTtcbiAgICBtb2RlbHMucHJvZHVjdC5iZWxvbmdzVG8obW9kZWxzLlN1YkNoaWxkQ2F0ZWdvcnksIHsgZm9yZWlnbktleTogJ2NoaWxkQ2F0ZWdvcnlJZCcgfSk7XG4gICAgbW9kZWxzLnByb2R1Y3QuaGFzTWFueShtb2RlbHMudmVuZG9yX3Byb2R1Y3QsIHsgZm9yZWlnbktleTogJ3Byb2R1Y3RJZCcgfSk7XG4gICAgbW9kZWxzLnByb2R1Y3QuYmVsb25nc1RvKG1vZGVscy51c2VyLCB7IGZvcmVpZ25LZXk6ICd1c2VyX21hbmFnZXInIH0pO1xuICB9O1xuICByZXR1cm4gcHJvZHVjdDtcbn07Il0sIm1hcHBpbmdzIjoiQUFBQSxZQUFZOztBQUNaQSxNQUFNLENBQUNDLE9BQU8sR0FBRyxVQUFDQyxTQUFTLEVBQUVDLFNBQVMsRUFBSztFQUN6QyxJQUFNQyxPQUFPLEdBQUdGLFNBQVMsQ0FBQ0csTUFBTSxDQUFDLFNBQVMsRUFBRTtJQUMxQ0MsVUFBVSxFQUFFSCxTQUFTLENBQUNJLE9BQU87SUFDN0JDLGFBQWEsRUFBRUwsU0FBUyxDQUFDSSxPQUFPO0lBQ2hDRSxlQUFlLEVBQUVOLFNBQVMsQ0FBQ0ksT0FBTztJQUNsQ0csSUFBSSxFQUFFUCxTQUFTLENBQUNRLE1BQU07SUFDdEJDLElBQUksRUFBRVQsU0FBUyxDQUFDUSxNQUFNO0lBQ3RCRSxLQUFLLEVBQUVWLFNBQVMsQ0FBQ1EsTUFBTTtJQUN2QkcsUUFBUSxFQUFFWCxTQUFTLENBQUNRLE1BQU07SUFDMUJJLE1BQU0sRUFBRVosU0FBUyxDQUFDUSxNQUFNO0lBQ3hCSyxVQUFVLEVBQUViLFNBQVMsQ0FBQ0ksT0FBTztJQUM3QlUsS0FBSyxFQUFFZCxTQUFTLENBQUNJLE9BQU87SUFDeEJXLEdBQUcsRUFBRWYsU0FBUyxDQUFDSSxPQUFPO0lBQ3RCWSxXQUFXLEVBQUVoQixTQUFTLENBQUNJLE9BQU87SUFDOUJhLFFBQVEsRUFBRWpCLFNBQVMsQ0FBQ0ksT0FBTztJQUMzQmMsS0FBSyxFQUFFbEIsU0FBUyxDQUFDSSxPQUFPO0lBQ3hCZSxRQUFRLEVBQUVuQixTQUFTLENBQUNJLE9BQU87SUFDM0JnQixLQUFLLEVBQUVwQixTQUFTLENBQUNRLE1BQU07SUFDdkJhLFFBQVEsRUFBRXJCLFNBQVMsQ0FBQ3NCLElBQUk7SUFDeEJDLElBQUksRUFBRXZCLFNBQVMsQ0FBQ3NCLElBQUk7SUFDcEJFLFdBQVcsRUFBRXhCLFNBQVMsQ0FBQ3NCLElBQUk7SUFDM0JHLE1BQU0sRUFBRXpCLFNBQVMsQ0FBQzBCLEtBQUs7SUFDdkJDLFFBQVEsRUFBRTNCLFNBQVMsQ0FBQ1EsTUFBTTtJQUMxQm9CLFFBQVEsRUFBRTVCLFNBQVMsQ0FBQ1EsTUFBTTtJQUMxQnFCLElBQUksRUFBRTdCLFNBQVMsQ0FBQ1EsTUFBTTtJQUN0QnNCLFlBQVksRUFBRTlCLFNBQVMsQ0FBQ1EsTUFBTTtJQUM5QnVCLFlBQVksRUFBRS9CLFNBQVMsQ0FBQ1EsTUFBTTtJQUM5QndCLFFBQVEsRUFBRWhDLFNBQVMsQ0FBQ1EsTUFBTTtJQUMxQnlCLE1BQU0sRUFBRWpDLFNBQVMsQ0FBQzBCLEtBQUs7SUFDdkJRLFFBQVEsRUFBRWxDLFNBQVMsQ0FBQ1EsTUFBTTtJQUMxQjJCLFFBQVEsRUFBRW5DLFNBQVMsQ0FBQ1EsTUFBTTtJQUMxQjRCLEtBQUssRUFBRXBDLFNBQVMsQ0FBQ0ksT0FBTztJQUN4QmlDLE1BQU0sRUFBRXJDLFNBQVMsQ0FBQ0ksT0FBTztJQUN6QmtDLFVBQVUsRUFBRXRDLFNBQVMsQ0FBQ1EsTUFBTTtJQUM1QitCLElBQUksRUFBRTtNQUNKQyxJQUFJLEVBQUV4QyxTQUFTLENBQUNzQixJQUFJO01BQ3BCbUIsU0FBUyxFQUFFO0lBQ2IsQ0FBQztJQUNEQyxZQUFZLEVBQUU7TUFDWkYsSUFBSSxFQUFFeEMsU0FBUyxDQUFDSTtJQUNsQixDQUFDO0lBQ0R1QyxJQUFJLEVBQUU7TUFDSkgsSUFBSSxFQUFFeEMsU0FBUyxDQUFDNEM7SUFDbEIsQ0FBQztJQUNEQyxZQUFZLEVBQUU7TUFDWkwsSUFBSSxFQUFFeEMsU0FBUyxDQUFDUSxNQUFNO01BQ3RCaUMsU0FBUyxFQUFFO0lBQ2IsQ0FBQztJQUNESyxPQUFPLEVBQUU7TUFDUE4sSUFBSSxFQUFFeEMsU0FBUyxDQUFDc0IsSUFBSTtNQUNwQm1CLFNBQVMsRUFBRTtJQUNiO0VBQ0YsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBRU54QyxPQUFPLENBQUM4QyxTQUFTLEdBQUcsVUFBVUMsTUFBTSxFQUFFO0lBQ3BDO0lBQ0FBLE1BQU0sQ0FBQy9DLE9BQU8sQ0FBQ2dELFNBQVMsQ0FBQ0QsTUFBTSxDQUFDRSxXQUFXLEVBQUU7TUFBRUMsVUFBVSxFQUFFO0lBQWdCLENBQUMsQ0FBQztJQUM3RUgsTUFBTSxDQUFDL0MsT0FBTyxDQUFDbUQsT0FBTyxDQUFDSixNQUFNLENBQUNLLFlBQVksRUFBRTtNQUFFRixVQUFVLEVBQUU7SUFBWSxDQUFDLENBQUM7SUFDeEVILE1BQU0sQ0FBQy9DLE9BQU8sQ0FBQ2dELFNBQVMsQ0FBQ0QsTUFBTSxDQUFDTSxnQkFBZ0IsRUFBRTtNQUFFSCxVQUFVLEVBQUU7SUFBa0IsQ0FBQyxDQUFDO0lBQ3BGSCxNQUFNLENBQUMvQyxPQUFPLENBQUNtRCxPQUFPLENBQUNKLE1BQU0sQ0FBQ08sY0FBYyxFQUFFO01BQUVKLFVBQVUsRUFBRTtJQUFZLENBQUMsQ0FBQztJQUMxRUgsTUFBTSxDQUFDL0MsT0FBTyxDQUFDZ0QsU0FBUyxDQUFDRCxNQUFNLENBQUNRLElBQUksRUFBRTtNQUFFTCxVQUFVLEVBQUU7SUFBZSxDQUFDLENBQUM7RUFDdkUsQ0FBQztFQUNELE9BQU9sRCxPQUFPO0FBQ2hCLENBQUMifQ==