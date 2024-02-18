"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _sequelize = require("sequelize");
var _models = require("../../../models");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  searchProduct: function searchProduct(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var data, typeBooking, realEstateType, province, district, ward, budget, subCategoryId, minBudget, maxBudget, whereConditions, result, _result, _whereConditions, _result2, _result3;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            data = req.query;
            typeBooking = data.typeBooking, realEstateType = data.realEstateType, province = data.province, district = data.district, ward = data.ward, budget = data.budget, subCategoryId = data.subCategoryId, minBudget = data.minBudget, maxBudget = data.maxBudget;
            if (!(parseInt(typeBooking) == 1)) {
              _context.next = 20;
              break;
            }
            whereConditions = {
              categoryId: 13
            };
            if (realEstateType) {
              whereConditions.subCategoryId = realEstateType;
            }
            if (province) {
              // whereConditions.province= province
            }
            if (district) {
              whereConditions.district = district;
            }
            if (ward) {
              whereConditions.ward = ward;
            }
            if (budget) {
              whereConditions.budget = budget;
            }
            if (!(minBudget && maxBudget)) {
              _context.next = 16;
              break;
            }
            _context.next = 12;
            return _models.db.product.findAll({
              where: _objectSpread(_objectSpread({}, whereConditions), {}, {
                price: (0, _defineProperty2["default"])({}, _sequelize.Op.between, [minBudget, maxBudget])
              }),
              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }]
            });
          case 12:
            result = _context.sent;
            return _context.abrupt("return", res.status(200).json(result));
          case 16:
            _context.next = 18;
            return _models.db.product.findAll({
              where: whereConditions,
              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }]
            });
          case 18:
            _result = _context.sent;
            return _context.abrupt("return", res.status(200).json(_result));
          case 20:
            if (!(parseInt(typeBooking) == 2)) {
              _context.next = 39;
              break;
            }
            _whereConditions = {
              categoryId: 12
            };
            if (realEstateType) {
              _whereConditions.subCategoryId = realEstateType;
            }
            if (province) {
              // whereConditions.province= province
            }
            if (district) {
              _whereConditions.district = district.toString();
            }
            if (ward) {
              _whereConditions.ward = ward.toString();
            }
            if (budget) {
              _whereConditions.budget = budget;
            }
            if (subCategoryId) {
              _whereConditions.subCategoryId = parseInt(subCategoryId);
            }
            if (!(minBudget && maxBudget)) {
              _context.next = 35;
              break;
            }
            _context.next = 31;
            return _models.db.product.findAll({
              where: _objectSpread(_objectSpread({}, _whereConditions), {}, {
                price: (0, _defineProperty2["default"])({}, _sequelize.Op.between, [minBudget, maxBudget])
              }),
              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }]
            });
          case 31:
            _result2 = _context.sent;
            return _context.abrupt("return", res.status(200).json(_result2));
          case 35:
            _context.next = 37;
            return _models.db.product.findAll({
              where: _whereConditions,
              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }]
            });
          case 37:
            _result3 = _context.sent;
            return _context.abrupt("return", res.status(200).json(_result3));
          case 39:
            if (parseInt(typeBooking) === 3) {}
            if (parseInt(typeBooking) === 4) {}
          case 41:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfc2VxdWVsaXplIiwicmVxdWlyZSIsIl9tb2RlbHMiLCJvd25LZXlzIiwib2JqZWN0IiwiZW51bWVyYWJsZU9ubHkiLCJrZXlzIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwic3ltYm9scyIsImZpbHRlciIsInN5bSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJwdXNoIiwiYXBwbHkiLCJfb2JqZWN0U3ByZWFkIiwidGFyZ2V0IiwiaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInNvdXJjZSIsImZvckVhY2giLCJrZXkiLCJfZGVmaW5lUHJvcGVydHkyIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsImRlZmluZVByb3BlcnRpZXMiLCJkZWZpbmVQcm9wZXJ0eSIsIl9kZWZhdWx0Iiwic2VhcmNoUHJvZHVjdCIsInJlcSIsInJlcyIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwiZGF0YSIsInR5cGVCb29raW5nIiwicmVhbEVzdGF0ZVR5cGUiLCJwcm92aW5jZSIsImRpc3RyaWN0Iiwid2FyZCIsImJ1ZGdldCIsInN1YkNhdGVnb3J5SWQiLCJtaW5CdWRnZXQiLCJtYXhCdWRnZXQiLCJ3aGVyZUNvbmRpdGlvbnMiLCJyZXN1bHQiLCJfcmVzdWx0IiwiX3doZXJlQ29uZGl0aW9ucyIsIl9yZXN1bHQyIiwiX3Jlc3VsdDMiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwicXVlcnkiLCJwYXJzZUludCIsImNhdGVnb3J5SWQiLCJkYiIsInByb2R1Y3QiLCJmaW5kQWxsIiwid2hlcmUiLCJwcmljZSIsIk9wIiwiYmV0d2VlbiIsImluY2x1ZGUiLCJtb2RlbCIsInByb2R1Y3RwaG90byIsImF0dHJpYnV0ZXMiLCJzZW50IiwiYWJydXB0Iiwic3RhdHVzIiwianNvbiIsInRvU3RyaW5nIiwic3RvcCIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy9zZWFyY2gvc2VhcmNoLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3AgfSBmcm9tIFwic2VxdWVsaXplXCJcbmltcG9ydCB7IGRiIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVsc1wiXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhc3luYyBzZWFyY2hQcm9kdWN0KHJlcSwgcmVzKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSByZXEucXVlcnlcbiAgICAgICAgY29uc3QgeyB0eXBlQm9va2luZywgcmVhbEVzdGF0ZVR5cGUsIHByb3ZpbmNlLCBkaXN0cmljdCwgd2FyZCwgYnVkZ2V0LCBzdWJDYXRlZ29yeUlkLCBtaW5CdWRnZXQsIG1heEJ1ZGdldCB9ID0gZGF0YVxuICAgICAgICBpZiAocGFyc2VJbnQodHlwZUJvb2tpbmcpID09IDEpIHtcbiAgICAgICAgICAgIGxldCB3aGVyZUNvbmRpdGlvbnM9IHtcbiAgICAgICAgICAgICAgICBjYXRlZ29yeUlkOiAxM1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYocmVhbEVzdGF0ZVR5cGUpIHtcbiAgICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuc3ViQ2F0ZWdvcnlJZD0gcmVhbEVzdGF0ZVR5cGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHByb3ZpbmNlKSB7XG4gICAgICAgICAgICAgICAgLy8gd2hlcmVDb25kaXRpb25zLnByb3ZpbmNlPSBwcm92aW5jZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoZGlzdHJpY3QpIHtcbiAgICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuZGlzdHJpY3Q9IGRpc3RyaWN0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih3YXJkKSB7XG4gICAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLndhcmQ9IHdhcmRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGJ1ZGdldCkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5idWRnZXQ9IGJ1ZGdldFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYobWluQnVkZ2V0ICYmIG1heEJ1ZGdldCApIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQ9IGF3YWl0IGRiLnByb2R1Y3RcbiAgICAgICAgICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7Li4ud2hlcmVDb25kaXRpb25zLCBwcmljZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgW09wLmJldHdlZW5dOiBbbWluQnVkZ2V0LCBtYXhCdWRnZXRdXG4gICAgICAgICAgICAgICAgICAgIH19LFxuICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbihyZXN1bHQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQ9IGF3YWl0IGRiLnByb2R1Y3RcbiAgICAgICAgICAgICAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHdoZXJlQ29uZGl0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbihyZXN1bHQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICAvLyBcbiAgICAgICAgaWYgKHBhcnNlSW50KHR5cGVCb29raW5nKSA9PSAyKSB7XG4gICAgICAgICAgICBsZXQgd2hlcmVDb25kaXRpb25zPSB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlJZDogMTJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHJlYWxFc3RhdGVUeXBlKSB7XG4gICAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnN1YkNhdGVnb3J5SWQ9IHJlYWxFc3RhdGVUeXBlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihwcm92aW5jZSkge1xuICAgICAgICAgICAgICAgIC8vIHdoZXJlQ29uZGl0aW9ucy5wcm92aW5jZT0gcHJvdmluY2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGRpc3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLmRpc3RyaWN0PSBkaXN0cmljdC50b1N0cmluZygpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih3YXJkKSB7XG4gICAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLndhcmQ9IHdhcmQudG9TdHJpbmcoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoYnVkZ2V0KSB7XG4gICAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLmJ1ZGdldD0gYnVkZ2V0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihzdWJDYXRlZ29yeUlkKSB7XG4gICAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnN1YkNhdGVnb3J5SWQ9IHBhcnNlSW50KHN1YkNhdGVnb3J5SWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihtaW5CdWRnZXQgJiYgbWF4QnVkZ2V0ICkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdD0gYXdhaXQgZGIucHJvZHVjdFxuICAgICAgICAgICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsuLi53aGVyZUNvbmRpdGlvbnMsIHByaWNlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBbT3AuYmV0d2Vlbl06IFttaW5CdWRnZXQsIG1heEJ1ZGdldF1cbiAgICAgICAgICAgICAgICAgICAgfX0sXG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc3VsdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdD0gYXdhaXQgZGIucHJvZHVjdFxuICAgICAgICAgICAgICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZTogd2hlcmVDb25kaXRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc3VsdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyc2VJbnQodHlwZUJvb2tpbmcpID09PSAzKSB7XG5cbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyc2VJbnQodHlwZUJvb2tpbmcpID09PSA0KSB7XG5cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUFBLFVBQUEsR0FBQUMsT0FBQTtBQUNBLElBQUFDLE9BQUEsR0FBQUQsT0FBQTtBQUFvQyxTQUFBRSxRQUFBQyxNQUFBLEVBQUFDLGNBQUEsUUFBQUMsSUFBQSxHQUFBQyxNQUFBLENBQUFELElBQUEsQ0FBQUYsTUFBQSxPQUFBRyxNQUFBLENBQUFDLHFCQUFBLFFBQUFDLE9BQUEsR0FBQUYsTUFBQSxDQUFBQyxxQkFBQSxDQUFBSixNQUFBLEdBQUFDLGNBQUEsS0FBQUksT0FBQSxHQUFBQSxPQUFBLENBQUFDLE1BQUEsV0FBQUMsR0FBQSxXQUFBSixNQUFBLENBQUFLLHdCQUFBLENBQUFSLE1BQUEsRUFBQU8sR0FBQSxFQUFBRSxVQUFBLE9BQUFQLElBQUEsQ0FBQVEsSUFBQSxDQUFBQyxLQUFBLENBQUFULElBQUEsRUFBQUcsT0FBQSxZQUFBSCxJQUFBO0FBQUEsU0FBQVUsY0FBQUMsTUFBQSxhQUFBQyxDQUFBLE1BQUFBLENBQUEsR0FBQUMsU0FBQSxDQUFBQyxNQUFBLEVBQUFGLENBQUEsVUFBQUcsTUFBQSxXQUFBRixTQUFBLENBQUFELENBQUEsSUFBQUMsU0FBQSxDQUFBRCxDQUFBLFFBQUFBLENBQUEsT0FBQWYsT0FBQSxDQUFBSSxNQUFBLENBQUFjLE1BQUEsT0FBQUMsT0FBQSxXQUFBQyxHQUFBLFFBQUFDLGdCQUFBLGFBQUFQLE1BQUEsRUFBQU0sR0FBQSxFQUFBRixNQUFBLENBQUFFLEdBQUEsU0FBQWhCLE1BQUEsQ0FBQWtCLHlCQUFBLEdBQUFsQixNQUFBLENBQUFtQixnQkFBQSxDQUFBVCxNQUFBLEVBQUFWLE1BQUEsQ0FBQWtCLHlCQUFBLENBQUFKLE1BQUEsS0FBQWxCLE9BQUEsQ0FBQUksTUFBQSxDQUFBYyxNQUFBLEdBQUFDLE9BQUEsV0FBQUMsR0FBQSxJQUFBaEIsTUFBQSxDQUFBb0IsY0FBQSxDQUFBVixNQUFBLEVBQUFNLEdBQUEsRUFBQWhCLE1BQUEsQ0FBQUssd0JBQUEsQ0FBQVMsTUFBQSxFQUFBRSxHQUFBLGlCQUFBTixNQUFBO0FBQUEsSUFBQVcsUUFBQSxHQUVyQjtFQUNMQyxhQUFhLFdBQUFBLGNBQUNDLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBQUEsV0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBQyxRQUFBO01BQUEsSUFBQUMsSUFBQSxFQUFBQyxXQUFBLEVBQUFDLGNBQUEsRUFBQUMsUUFBQSxFQUFBQyxRQUFBLEVBQUFDLElBQUEsRUFBQUMsTUFBQSxFQUFBQyxhQUFBLEVBQUFDLFNBQUEsRUFBQUMsU0FBQSxFQUFBQyxlQUFBLEVBQUFDLE1BQUEsRUFBQUMsT0FBQSxFQUFBQyxnQkFBQSxFQUFBQyxRQUFBLEVBQUFDLFFBQUE7TUFBQSxPQUFBbEIsWUFBQSxZQUFBbUIsSUFBQSxVQUFBQyxTQUFBQyxRQUFBO1FBQUEsa0JBQUFBLFFBQUEsQ0FBQUMsSUFBQSxHQUFBRCxRQUFBLENBQUFFLElBQUE7VUFBQTtZQUNwQnBCLElBQUksR0FBR04sR0FBRyxDQUFDMkIsS0FBSztZQUNkcEIsV0FBVyxHQUE0RkQsSUFBSSxDQUEzR0MsV0FBVyxFQUFFQyxjQUFjLEdBQTRFRixJQUFJLENBQTlGRSxjQUFjLEVBQUVDLFFBQVEsR0FBa0VILElBQUksQ0FBOUVHLFFBQVEsRUFBRUMsUUFBUSxHQUF3REosSUFBSSxDQUFwRUksUUFBUSxFQUFFQyxJQUFJLEdBQWtETCxJQUFJLENBQTFESyxJQUFJLEVBQUVDLE1BQU0sR0FBMENOLElBQUksQ0FBcERNLE1BQU0sRUFBRUMsYUFBYSxHQUEyQlAsSUFBSSxDQUE1Q08sYUFBYSxFQUFFQyxTQUFTLEdBQWdCUixJQUFJLENBQTdCUSxTQUFTLEVBQUVDLFNBQVMsR0FBS1QsSUFBSSxDQUFsQlMsU0FBUztZQUFBLE1BQ3RHYSxRQUFRLENBQUNyQixXQUFXLENBQUMsSUFBSSxDQUFDO2NBQUFpQixRQUFBLENBQUFFLElBQUE7Y0FBQTtZQUFBO1lBQ3RCVixlQUFlLEdBQUU7Y0FDakJhLFVBQVUsRUFBRTtZQUNoQixDQUFDO1lBQ0QsSUFBR3JCLGNBQWMsRUFBRTtjQUNmUSxlQUFlLENBQUNILGFBQWEsR0FBRUwsY0FBYztZQUNqRDtZQUNBLElBQUdDLFFBQVEsRUFBRTtjQUNUO1lBQUE7WUFFSixJQUFHQyxRQUFRLEVBQUU7Y0FDVE0sZUFBZSxDQUFDTixRQUFRLEdBQUVBLFFBQVE7WUFDdEM7WUFDQSxJQUFHQyxJQUFJLEVBQUU7Y0FDTEssZUFBZSxDQUFDTCxJQUFJLEdBQUVBLElBQUk7WUFDOUI7WUFDQSxJQUFHQyxNQUFNLEVBQUU7Y0FDUEksZUFBZSxDQUFDSixNQUFNLEdBQUVBLE1BQU07WUFDbEM7WUFBQyxNQUNFRSxTQUFTLElBQUlDLFNBQVM7Y0FBQVMsUUFBQSxDQUFBRSxJQUFBO2NBQUE7WUFBQTtZQUFBRixRQUFBLENBQUFFLElBQUE7WUFBQSxPQUNESSxVQUFFLENBQUNDLE9BQU8sQ0FDN0JDLE9BQU8sQ0FBQztjQUNMQyxLQUFLLEVBQUEvQyxhQUFBLENBQUFBLGFBQUEsS0FBTThCLGVBQWU7Z0JBQUVrQixLQUFLLE1BQUF4QyxnQkFBQSxpQkFDNUJ5QyxhQUFFLENBQUNDLE9BQU8sRUFBRyxDQUFDdEIsU0FBUyxFQUFFQyxTQUFTLENBQUM7Y0FDdkMsRUFBQztjQUNGc0IsT0FBTyxFQUFFLENBQUM7Z0JBQUVDLEtBQUssRUFBRVIsVUFBRSxDQUFDUyxZQUFZO2dCQUFFQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUTtjQUFFLENBQUM7WUFDdEUsQ0FBQyxDQUFDO1VBQUE7WUFOSXZCLE1BQU0sR0FBQU8sUUFBQSxDQUFBaUIsSUFBQTtZQUFBLE9BQUFqQixRQUFBLENBQUFrQixNQUFBLFdBT0x6QyxHQUFHLENBQUMwQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQzNCLE1BQU0sQ0FBQztVQUFBO1lBQUFPLFFBQUEsQ0FBQUUsSUFBQTtZQUFBLE9BR2ZJLFVBQUUsQ0FBQ0MsT0FBTyxDQUN6QkMsT0FBTyxDQUFDO2NBQ0xDLEtBQUssRUFBRWpCLGVBQWU7Y0FDdEJxQixPQUFPLEVBQUUsQ0FBQztnQkFBRUMsS0FBSyxFQUFFUixVQUFFLENBQUNTLFlBQVk7Z0JBQUVDLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxRQUFRO2NBQUUsQ0FBQztZQUN0RSxDQUFDLENBQUM7VUFBQTtZQUpBdkIsT0FBTSxHQUFBTyxRQUFBLENBQUFpQixJQUFBO1lBQUEsT0FBQWpCLFFBQUEsQ0FBQWtCLE1BQUEsV0FLTHpDLEdBQUcsQ0FBQzBDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDM0IsT0FBTSxDQUFDO1VBQUE7WUFBQSxNQUt2Q1csUUFBUSxDQUFDckIsV0FBVyxDQUFDLElBQUksQ0FBQztjQUFBaUIsUUFBQSxDQUFBRSxJQUFBO2NBQUE7WUFBQTtZQUN0QlYsZ0JBQWUsR0FBRTtjQUNqQmEsVUFBVSxFQUFFO1lBQ2hCLENBQUM7WUFDRCxJQUFHckIsY0FBYyxFQUFFO2NBQ2ZRLGdCQUFlLENBQUNILGFBQWEsR0FBRUwsY0FBYztZQUNqRDtZQUNBLElBQUdDLFFBQVEsRUFBRTtjQUNUO1lBQUE7WUFFSixJQUFHQyxRQUFRLEVBQUU7Y0FDVE0sZ0JBQWUsQ0FBQ04sUUFBUSxHQUFFQSxRQUFRLENBQUNtQyxRQUFRLENBQUMsQ0FBQztZQUNqRDtZQUNBLElBQUdsQyxJQUFJLEVBQUU7Y0FDTEssZ0JBQWUsQ0FBQ0wsSUFBSSxHQUFFQSxJQUFJLENBQUNrQyxRQUFRLENBQUMsQ0FBQztZQUN6QztZQUNBLElBQUdqQyxNQUFNLEVBQUU7Y0FDUEksZ0JBQWUsQ0FBQ0osTUFBTSxHQUFFQSxNQUFNO1lBQ2xDO1lBQ0EsSUFBR0MsYUFBYSxFQUFFO2NBQ2RHLGdCQUFlLENBQUNILGFBQWEsR0FBRWUsUUFBUSxDQUFDZixhQUFhLENBQUM7WUFDMUQ7WUFBQyxNQUNFQyxTQUFTLElBQUlDLFNBQVM7Y0FBQVMsUUFBQSxDQUFBRSxJQUFBO2NBQUE7WUFBQTtZQUFBRixRQUFBLENBQUFFLElBQUE7WUFBQSxPQUNESSxVQUFFLENBQUNDLE9BQU8sQ0FDN0JDLE9BQU8sQ0FBQztjQUNMQyxLQUFLLEVBQUEvQyxhQUFBLENBQUFBLGFBQUEsS0FBTThCLGdCQUFlO2dCQUFFa0IsS0FBSyxNQUFBeEMsZ0JBQUEsaUJBQzVCeUMsYUFBRSxDQUFDQyxPQUFPLEVBQUcsQ0FBQ3RCLFNBQVMsRUFBRUMsU0FBUyxDQUFDO2NBQ3ZDLEVBQUM7Y0FDRnNCLE9BQU8sRUFBRSxDQUFDO2dCQUFFQyxLQUFLLEVBQUVSLFVBQUUsQ0FBQ1MsWUFBWTtnQkFBRUMsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLFFBQVE7Y0FBRSxDQUFDO1lBQ3RFLENBQUMsQ0FBQztVQUFBO1lBTkl2QixRQUFNLEdBQUFPLFFBQUEsQ0FBQWlCLElBQUE7WUFBQSxPQUFBakIsUUFBQSxDQUFBa0IsTUFBQSxXQU9MekMsR0FBRyxDQUFDMEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUMzQixRQUFNLENBQUM7VUFBQTtZQUFBTyxRQUFBLENBQUFFLElBQUE7WUFBQSxPQUdmSSxVQUFFLENBQUNDLE9BQU8sQ0FDekJDLE9BQU8sQ0FBQztjQUNMQyxLQUFLLEVBQUVqQixnQkFBZTtjQUN0QnFCLE9BQU8sRUFBRSxDQUFDO2dCQUFFQyxLQUFLLEVBQUVSLFVBQUUsQ0FBQ1MsWUFBWTtnQkFBRUMsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLFFBQVE7Y0FBRSxDQUFDO1lBQ3RFLENBQUMsQ0FBQztVQUFBO1lBSkF2QixRQUFNLEdBQUFPLFFBQUEsQ0FBQWlCLElBQUE7WUFBQSxPQUFBakIsUUFBQSxDQUFBa0IsTUFBQSxXQUtMekMsR0FBRyxDQUFDMEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUMzQixRQUFNLENBQUM7VUFBQTtZQUczQyxJQUFJVyxRQUFRLENBQUNyQixXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FFakM7WUFDQSxJQUFJcUIsUUFBUSxDQUFDckIsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBRWpDO1VBQUM7VUFBQTtZQUFBLE9BQUFpQixRQUFBLENBQUFzQixJQUFBO1FBQUE7TUFBQSxHQUFBekMsT0FBQTtJQUFBO0VBQ0w7QUFDSixDQUFDO0FBQUEwQyxPQUFBLGNBQUFqRCxRQUFBIn0=