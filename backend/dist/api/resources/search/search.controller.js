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
      var data, typeBooking, realEstateType, province, district, ward, budget, subCategoryId, minBudget, maxBudget, departurePoint, destinationPoint, type, whereConditions, result, _result, _whereConditions, _result2, _result3, _whereConditions2, _result4, _result5;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            data = req.query;
            typeBooking = data.typeBooking, realEstateType = data.realEstateType, province = data.province, district = data.district, ward = data.ward, budget = data.budget, subCategoryId = data.subCategoryId, minBudget = data.minBudget, maxBudget = data.maxBudget, departurePoint = data.departurePoint, destinationPoint = data.destinationPoint, type = data.type;
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
            if (parseInt(province) > 0) {
              whereConditions.province = province;
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
            if (!(parseInt(typeBooking) === 3)) {
              _context.next = 55;
              break;
            }
            _whereConditions2 = {};
            if (departurePoint) {
              _whereConditions2.departure = departurePoint;
            }
            if (destinationPoint) {
              _whereConditions2.destination = destinationPoint;
            }
            if (type) {
              _whereConditions2.type = parseInt(type);
            }
            if (!(minBudget && maxBudget)) {
              _context.next = 51;
              break;
            }
            _context.next = 47;
            return _models.db.tour.findAll({
              where: _objectSpread(_objectSpread({}, _whereConditions2), {}, {
                price: (0, _defineProperty2["default"])({}, _sequelize.Op.between, [minBudget, maxBudget])
              })
            });
          case 47:
            _result4 = _context.sent;
            return _context.abrupt("return", res.status(200).json(_result4));
          case 51:
            _context.next = 53;
            return _models.db.tour.findAll({
              where: _whereConditions2
            });
          case 53:
            _result5 = _context.sent;
            return _context.abrupt("return", res.status(200).json(_result5));
          case 55:
            if (parseInt(typeBooking) === 4) {}
          case 56:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfc2VxdWVsaXplIiwicmVxdWlyZSIsIl9tb2RlbHMiLCJvd25LZXlzIiwib2JqZWN0IiwiZW51bWVyYWJsZU9ubHkiLCJrZXlzIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwic3ltYm9scyIsImZpbHRlciIsInN5bSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJwdXNoIiwiYXBwbHkiLCJfb2JqZWN0U3ByZWFkIiwidGFyZ2V0IiwiaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInNvdXJjZSIsImZvckVhY2giLCJrZXkiLCJfZGVmaW5lUHJvcGVydHkyIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsImRlZmluZVByb3BlcnRpZXMiLCJkZWZpbmVQcm9wZXJ0eSIsIl9kZWZhdWx0Iiwic2VhcmNoUHJvZHVjdCIsInJlcSIsInJlcyIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwiZGF0YSIsInR5cGVCb29raW5nIiwicmVhbEVzdGF0ZVR5cGUiLCJwcm92aW5jZSIsImRpc3RyaWN0Iiwid2FyZCIsImJ1ZGdldCIsInN1YkNhdGVnb3J5SWQiLCJtaW5CdWRnZXQiLCJtYXhCdWRnZXQiLCJkZXBhcnR1cmVQb2ludCIsImRlc3RpbmF0aW9uUG9pbnQiLCJ0eXBlIiwid2hlcmVDb25kaXRpb25zIiwicmVzdWx0IiwiX3Jlc3VsdCIsIl93aGVyZUNvbmRpdGlvbnMiLCJfcmVzdWx0MiIsIl9yZXN1bHQzIiwiX3doZXJlQ29uZGl0aW9uczIiLCJfcmVzdWx0NCIsIl9yZXN1bHQ1Iiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsInF1ZXJ5IiwicGFyc2VJbnQiLCJjYXRlZ29yeUlkIiwiZGIiLCJwcm9kdWN0IiwiZmluZEFsbCIsIndoZXJlIiwicHJpY2UiLCJPcCIsImJldHdlZW4iLCJpbmNsdWRlIiwibW9kZWwiLCJwcm9kdWN0cGhvdG8iLCJhdHRyaWJ1dGVzIiwic2VudCIsImFicnVwdCIsInN0YXR1cyIsImpzb24iLCJ0b1N0cmluZyIsImRlcGFydHVyZSIsImRlc3RpbmF0aW9uIiwidG91ciIsInN0b3AiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvc2VhcmNoL3NlYXJjaC5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wIH0gZnJvbSBcInNlcXVlbGl6ZVwiXG5pbXBvcnQgeyBkYiB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHNcIlxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYXN5bmMgc2VhcmNoUHJvZHVjdChyZXEsIHJlcykge1xuICAgICAgICBjb25zdCBkYXRhID0gcmVxLnF1ZXJ5XG4gICAgICAgIGNvbnN0IHsgdHlwZUJvb2tpbmcsIHJlYWxFc3RhdGVUeXBlLCBwcm92aW5jZSwgZGlzdHJpY3QsIHdhcmQsIGJ1ZGdldCwgc3ViQ2F0ZWdvcnlJZCwgbWluQnVkZ2V0LCBtYXhCdWRnZXQsIGRlcGFydHVyZVBvaW50LCBkZXN0aW5hdGlvblBvaW50LCB0eXBlIH0gPSBkYXRhXG4gICAgICAgIGlmIChwYXJzZUludCh0eXBlQm9va2luZykgPT0gMSkge1xuICAgICAgICAgICAgbGV0IHdoZXJlQ29uZGl0aW9ucz0ge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IDEzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihyZWFsRXN0YXRlVHlwZSkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5zdWJDYXRlZ29yeUlkPSByZWFsRXN0YXRlVHlwZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYocGFyc2VJbnQocHJvdmluY2UpID4gMCkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5wcm92aW5jZT0gcHJvdmluY2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGRpc3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLmRpc3RyaWN0PSBkaXN0cmljdFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYod2FyZCkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy53YXJkPSB3YXJkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihidWRnZXQpIHtcbiAgICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuYnVkZ2V0PSBidWRnZXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKG1pbkJ1ZGdldCAmJiBtYXhCdWRnZXQgKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0PSBhd2FpdCBkYi5wcm9kdWN0XG4gICAgICAgICAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgICAgICB3aGVyZTogey4uLndoZXJlQ29uZGl0aW9ucywgcHJpY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtPcC5iZXR3ZWVuXTogW21pbkJ1ZGdldCwgbWF4QnVkZ2V0XVxuICAgICAgICAgICAgICAgICAgICB9fSxcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24ocmVzdWx0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0PSBhd2FpdCBkYi5wcm9kdWN0XG4gICAgICAgICAgICAgICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoZXJlOiB3aGVyZUNvbmRpdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24ocmVzdWx0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgLy8gXG4gICAgICAgIGlmIChwYXJzZUludCh0eXBlQm9va2luZykgPT0gMikge1xuICAgICAgICAgICAgbGV0IHdoZXJlQ29uZGl0aW9ucz0ge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IDEyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihyZWFsRXN0YXRlVHlwZSkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5zdWJDYXRlZ29yeUlkPSByZWFsRXN0YXRlVHlwZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYocHJvdmluY2UpIHtcbiAgICAgICAgICAgICAgICAvLyB3aGVyZUNvbmRpdGlvbnMucHJvdmluY2U9IHByb3ZpbmNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihkaXN0cmljdCkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5kaXN0cmljdD0gZGlzdHJpY3QudG9TdHJpbmcoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYod2FyZCkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy53YXJkPSB3YXJkLnRvU3RyaW5nKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGJ1ZGdldCkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5idWRnZXQ9IGJ1ZGdldFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoc3ViQ2F0ZWdvcnlJZCkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5zdWJDYXRlZ29yeUlkPSBwYXJzZUludChzdWJDYXRlZ29yeUlkKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihtaW5CdWRnZXQgJiYgbWF4QnVkZ2V0ICkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdD0gYXdhaXQgZGIucHJvZHVjdFxuICAgICAgICAgICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsuLi53aGVyZUNvbmRpdGlvbnMsIHByaWNlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBbT3AuYmV0d2Vlbl06IFttaW5CdWRnZXQsIG1heEJ1ZGdldF1cbiAgICAgICAgICAgICAgICAgICAgfX0sXG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc3VsdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdD0gYXdhaXQgZGIucHJvZHVjdFxuICAgICAgICAgICAgICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZTogd2hlcmVDb25kaXRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc3VsdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyc2VJbnQodHlwZUJvb2tpbmcpID09PSAzKSB7XG4gICAgICAgICAgICBsZXQgd2hlcmVDb25kaXRpb25zPSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihkZXBhcnR1cmVQb2ludCkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5kZXBhcnR1cmU9IGRlcGFydHVyZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihkZXN0aW5hdGlvblBvaW50KSB7XG4gICAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLmRlc3RpbmF0aW9uPSBkZXN0aW5hdGlvblBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0eXBlKSB7XG4gICAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnR5cGU9IHBhcnNlSW50KHR5cGUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihtaW5CdWRnZXQgJiYgbWF4QnVkZ2V0ICkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdD0gYXdhaXQgZGIudG91clxuICAgICAgICAgICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsuLi53aGVyZUNvbmRpdGlvbnMsIHByaWNlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBbT3AuYmV0d2Vlbl06IFttaW5CdWRnZXQsIG1heEJ1ZGdldF1cbiAgICAgICAgICAgICAgICAgICAgfX0sXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24ocmVzdWx0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0PSBhd2FpdCBkYi50b3VyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoZXJlOiB3aGVyZUNvbmRpdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc3VsdClcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJzZUludCh0eXBlQm9va2luZykgPT09IDQpIHtcblxuICAgICAgICB9XG4gICAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBQUEsVUFBQSxHQUFBQyxPQUFBO0FBQ0EsSUFBQUMsT0FBQSxHQUFBRCxPQUFBO0FBQW9DLFNBQUFFLFFBQUFDLE1BQUEsRUFBQUMsY0FBQSxRQUFBQyxJQUFBLEdBQUFDLE1BQUEsQ0FBQUQsSUFBQSxDQUFBRixNQUFBLE9BQUFHLE1BQUEsQ0FBQUMscUJBQUEsUUFBQUMsT0FBQSxHQUFBRixNQUFBLENBQUFDLHFCQUFBLENBQUFKLE1BQUEsR0FBQUMsY0FBQSxLQUFBSSxPQUFBLEdBQUFBLE9BQUEsQ0FBQUMsTUFBQSxXQUFBQyxHQUFBLFdBQUFKLE1BQUEsQ0FBQUssd0JBQUEsQ0FBQVIsTUFBQSxFQUFBTyxHQUFBLEVBQUFFLFVBQUEsT0FBQVAsSUFBQSxDQUFBUSxJQUFBLENBQUFDLEtBQUEsQ0FBQVQsSUFBQSxFQUFBRyxPQUFBLFlBQUFILElBQUE7QUFBQSxTQUFBVSxjQUFBQyxNQUFBLGFBQUFDLENBQUEsTUFBQUEsQ0FBQSxHQUFBQyxTQUFBLENBQUFDLE1BQUEsRUFBQUYsQ0FBQSxVQUFBRyxNQUFBLFdBQUFGLFNBQUEsQ0FBQUQsQ0FBQSxJQUFBQyxTQUFBLENBQUFELENBQUEsUUFBQUEsQ0FBQSxPQUFBZixPQUFBLENBQUFJLE1BQUEsQ0FBQWMsTUFBQSxPQUFBQyxPQUFBLFdBQUFDLEdBQUEsUUFBQUMsZ0JBQUEsYUFBQVAsTUFBQSxFQUFBTSxHQUFBLEVBQUFGLE1BQUEsQ0FBQUUsR0FBQSxTQUFBaEIsTUFBQSxDQUFBa0IseUJBQUEsR0FBQWxCLE1BQUEsQ0FBQW1CLGdCQUFBLENBQUFULE1BQUEsRUFBQVYsTUFBQSxDQUFBa0IseUJBQUEsQ0FBQUosTUFBQSxLQUFBbEIsT0FBQSxDQUFBSSxNQUFBLENBQUFjLE1BQUEsR0FBQUMsT0FBQSxXQUFBQyxHQUFBLElBQUFoQixNQUFBLENBQUFvQixjQUFBLENBQUFWLE1BQUEsRUFBQU0sR0FBQSxFQUFBaEIsTUFBQSxDQUFBSyx3QkFBQSxDQUFBUyxNQUFBLEVBQUFFLEdBQUEsaUJBQUFOLE1BQUE7QUFBQSxJQUFBVyxRQUFBLEdBRXJCO0VBQ0xDLGFBQWEsV0FBQUEsY0FBQ0MsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUFDLFFBQUE7TUFBQSxJQUFBQyxJQUFBLEVBQUFDLFdBQUEsRUFBQUMsY0FBQSxFQUFBQyxRQUFBLEVBQUFDLFFBQUEsRUFBQUMsSUFBQSxFQUFBQyxNQUFBLEVBQUFDLGFBQUEsRUFBQUMsU0FBQSxFQUFBQyxTQUFBLEVBQUFDLGNBQUEsRUFBQUMsZ0JBQUEsRUFBQUMsSUFBQSxFQUFBQyxlQUFBLEVBQUFDLE1BQUEsRUFBQUMsT0FBQSxFQUFBQyxnQkFBQSxFQUFBQyxRQUFBLEVBQUFDLFFBQUEsRUFBQUMsaUJBQUEsRUFBQUMsUUFBQSxFQUFBQyxRQUFBO01BQUEsT0FBQXhCLFlBQUEsWUFBQXlCLElBQUEsVUFBQUMsU0FBQUMsUUFBQTtRQUFBLGtCQUFBQSxRQUFBLENBQUFDLElBQUEsR0FBQUQsUUFBQSxDQUFBRSxJQUFBO1VBQUE7WUFDcEIxQixJQUFJLEdBQUdOLEdBQUcsQ0FBQ2lDLEtBQUs7WUFDZDFCLFdBQVcsR0FBb0lELElBQUksQ0FBbkpDLFdBQVcsRUFBRUMsY0FBYyxHQUFvSEYsSUFBSSxDQUF0SUUsY0FBYyxFQUFFQyxRQUFRLEdBQTBHSCxJQUFJLENBQXRIRyxRQUFRLEVBQUVDLFFBQVEsR0FBZ0dKLElBQUksQ0FBNUdJLFFBQVEsRUFBRUMsSUFBSSxHQUEwRkwsSUFBSSxDQUFsR0ssSUFBSSxFQUFFQyxNQUFNLEdBQWtGTixJQUFJLENBQTVGTSxNQUFNLEVBQUVDLGFBQWEsR0FBbUVQLElBQUksQ0FBcEZPLGFBQWEsRUFBRUMsU0FBUyxHQUF3RFIsSUFBSSxDQUFyRVEsU0FBUyxFQUFFQyxTQUFTLEdBQTZDVCxJQUFJLENBQTFEUyxTQUFTLEVBQUVDLGNBQWMsR0FBNkJWLElBQUksQ0FBL0NVLGNBQWMsRUFBRUMsZ0JBQWdCLEdBQVdYLElBQUksQ0FBL0JXLGdCQUFnQixFQUFFQyxJQUFJLEdBQUtaLElBQUksQ0FBYlksSUFBSTtZQUFBLE1BQzlJZ0IsUUFBUSxDQUFDM0IsV0FBVyxDQUFDLElBQUksQ0FBQztjQUFBdUIsUUFBQSxDQUFBRSxJQUFBO2NBQUE7WUFBQTtZQUN0QmIsZUFBZSxHQUFFO2NBQ2pCZ0IsVUFBVSxFQUFFO1lBQ2hCLENBQUM7WUFDRCxJQUFHM0IsY0FBYyxFQUFFO2NBQ2ZXLGVBQWUsQ0FBQ04sYUFBYSxHQUFFTCxjQUFjO1lBQ2pEO1lBQ0EsSUFBRzBCLFFBQVEsQ0FBQ3pCLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtjQUN2QlUsZUFBZSxDQUFDVixRQUFRLEdBQUVBLFFBQVE7WUFDdEM7WUFDQSxJQUFHQyxRQUFRLEVBQUU7Y0FDVFMsZUFBZSxDQUFDVCxRQUFRLEdBQUVBLFFBQVE7WUFDdEM7WUFDQSxJQUFHQyxJQUFJLEVBQUU7Y0FDTFEsZUFBZSxDQUFDUixJQUFJLEdBQUVBLElBQUk7WUFDOUI7WUFDQSxJQUFHQyxNQUFNLEVBQUU7Y0FDUE8sZUFBZSxDQUFDUCxNQUFNLEdBQUVBLE1BQU07WUFDbEM7WUFBQyxNQUNFRSxTQUFTLElBQUlDLFNBQVM7Y0FBQWUsUUFBQSxDQUFBRSxJQUFBO2NBQUE7WUFBQTtZQUFBRixRQUFBLENBQUFFLElBQUE7WUFBQSxPQUNESSxVQUFFLENBQUNDLE9BQU8sQ0FDN0JDLE9BQU8sQ0FBQztjQUNMQyxLQUFLLEVBQUFyRCxhQUFBLENBQUFBLGFBQUEsS0FBTWlDLGVBQWU7Z0JBQUVxQixLQUFLLE1BQUE5QyxnQkFBQSxpQkFDNUIrQyxhQUFFLENBQUNDLE9BQU8sRUFBRyxDQUFDNUIsU0FBUyxFQUFFQyxTQUFTLENBQUM7Y0FDdkMsRUFBQztjQUNGNEIsT0FBTyxFQUFFLENBQUM7Z0JBQUVDLEtBQUssRUFBRVIsVUFBRSxDQUFDUyxZQUFZO2dCQUFFQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUTtjQUFFLENBQUM7WUFDdEUsQ0FBQyxDQUFDO1VBQUE7WUFOSTFCLE1BQU0sR0FBQVUsUUFBQSxDQUFBaUIsSUFBQTtZQUFBLE9BQUFqQixRQUFBLENBQUFrQixNQUFBLFdBT0wvQyxHQUFHLENBQUNnRCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQzlCLE1BQU0sQ0FBQztVQUFBO1lBQUFVLFFBQUEsQ0FBQUUsSUFBQTtZQUFBLE9BR2ZJLFVBQUUsQ0FBQ0MsT0FBTyxDQUN6QkMsT0FBTyxDQUFDO2NBQ0xDLEtBQUssRUFBRXBCLGVBQWU7Y0FDdEJ3QixPQUFPLEVBQUUsQ0FBQztnQkFBRUMsS0FBSyxFQUFFUixVQUFFLENBQUNTLFlBQVk7Z0JBQUVDLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxRQUFRO2NBQUUsQ0FBQztZQUN0RSxDQUFDLENBQUM7VUFBQTtZQUpBMUIsT0FBTSxHQUFBVSxRQUFBLENBQUFpQixJQUFBO1lBQUEsT0FBQWpCLFFBQUEsQ0FBQWtCLE1BQUEsV0FLTC9DLEdBQUcsQ0FBQ2dELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDOUIsT0FBTSxDQUFDO1VBQUE7WUFBQSxNQUt2Q2MsUUFBUSxDQUFDM0IsV0FBVyxDQUFDLElBQUksQ0FBQztjQUFBdUIsUUFBQSxDQUFBRSxJQUFBO2NBQUE7WUFBQTtZQUN0QmIsZ0JBQWUsR0FBRTtjQUNqQmdCLFVBQVUsRUFBRTtZQUNoQixDQUFDO1lBQ0QsSUFBRzNCLGNBQWMsRUFBRTtjQUNmVyxnQkFBZSxDQUFDTixhQUFhLEdBQUVMLGNBQWM7WUFDakQ7WUFDQSxJQUFHQyxRQUFRLEVBQUU7Y0FDVDtZQUFBO1lBRUosSUFBR0MsUUFBUSxFQUFFO2NBQ1RTLGdCQUFlLENBQUNULFFBQVEsR0FBRUEsUUFBUSxDQUFDeUMsUUFBUSxDQUFDLENBQUM7WUFDakQ7WUFDQSxJQUFHeEMsSUFBSSxFQUFFO2NBQ0xRLGdCQUFlLENBQUNSLElBQUksR0FBRUEsSUFBSSxDQUFDd0MsUUFBUSxDQUFDLENBQUM7WUFDekM7WUFDQSxJQUFHdkMsTUFBTSxFQUFFO2NBQ1BPLGdCQUFlLENBQUNQLE1BQU0sR0FBRUEsTUFBTTtZQUNsQztZQUNBLElBQUdDLGFBQWEsRUFBRTtjQUNkTSxnQkFBZSxDQUFDTixhQUFhLEdBQUVxQixRQUFRLENBQUNyQixhQUFhLENBQUM7WUFDMUQ7WUFBQyxNQUVFQyxTQUFTLElBQUlDLFNBQVM7Y0FBQWUsUUFBQSxDQUFBRSxJQUFBO2NBQUE7WUFBQTtZQUFBRixRQUFBLENBQUFFLElBQUE7WUFBQSxPQUNESSxVQUFFLENBQUNDLE9BQU8sQ0FDN0JDLE9BQU8sQ0FBQztjQUNMQyxLQUFLLEVBQUFyRCxhQUFBLENBQUFBLGFBQUEsS0FBTWlDLGdCQUFlO2dCQUFFcUIsS0FBSyxNQUFBOUMsZ0JBQUEsaUJBQzVCK0MsYUFBRSxDQUFDQyxPQUFPLEVBQUcsQ0FBQzVCLFNBQVMsRUFBRUMsU0FBUyxDQUFDO2NBQ3ZDLEVBQUM7Y0FDRjRCLE9BQU8sRUFBRSxDQUFDO2dCQUFFQyxLQUFLLEVBQUVSLFVBQUUsQ0FBQ1MsWUFBWTtnQkFBRUMsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLFFBQVE7Y0FBRSxDQUFDO1lBQ3RFLENBQUMsQ0FBQztVQUFBO1lBTkkxQixRQUFNLEdBQUFVLFFBQUEsQ0FBQWlCLElBQUE7WUFBQSxPQUFBakIsUUFBQSxDQUFBa0IsTUFBQSxXQU9ML0MsR0FBRyxDQUFDZ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM5QixRQUFNLENBQUM7VUFBQTtZQUFBVSxRQUFBLENBQUFFLElBQUE7WUFBQSxPQUdmSSxVQUFFLENBQUNDLE9BQU8sQ0FDekJDLE9BQU8sQ0FBQztjQUNMQyxLQUFLLEVBQUVwQixnQkFBZTtjQUN0QndCLE9BQU8sRUFBRSxDQUFDO2dCQUFFQyxLQUFLLEVBQUVSLFVBQUUsQ0FBQ1MsWUFBWTtnQkFBRUMsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLFFBQVE7Y0FBRSxDQUFDO1lBQ3RFLENBQUMsQ0FBQztVQUFBO1lBSkExQixRQUFNLEdBQUFVLFFBQUEsQ0FBQWlCLElBQUE7WUFBQSxPQUFBakIsUUFBQSxDQUFBa0IsTUFBQSxXQUtML0MsR0FBRyxDQUFDZ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM5QixRQUFNLENBQUM7VUFBQTtZQUFBLE1BR3ZDYyxRQUFRLENBQUMzQixXQUFXLENBQUMsS0FBSyxDQUFDO2NBQUF1QixRQUFBLENBQUFFLElBQUE7Y0FBQTtZQUFBO1lBQ3ZCYixpQkFBZSxHQUFFLENBRXJCLENBQUM7WUFDRCxJQUFHSCxjQUFjLEVBQUU7Y0FDZkcsaUJBQWUsQ0FBQ2lDLFNBQVMsR0FBRXBDLGNBQWM7WUFDN0M7WUFDQSxJQUFHQyxnQkFBZ0IsRUFBRTtjQUNqQkUsaUJBQWUsQ0FBQ2tDLFdBQVcsR0FBRXBDLGdCQUFnQjtZQUNqRDtZQUNBLElBQUdDLElBQUksRUFBRTtjQUNMQyxpQkFBZSxDQUFDRCxJQUFJLEdBQUVnQixRQUFRLENBQUNoQixJQUFJLENBQUM7WUFDeEM7WUFBQyxNQUNFSixTQUFTLElBQUlDLFNBQVM7Y0FBQWUsUUFBQSxDQUFBRSxJQUFBO2NBQUE7WUFBQTtZQUFBRixRQUFBLENBQUFFLElBQUE7WUFBQSxPQUNESSxVQUFFLENBQUNrQixJQUFJLENBQzFCaEIsT0FBTyxDQUFDO2NBQ0xDLEtBQUssRUFBQXJELGFBQUEsQ0FBQUEsYUFBQSxLQUFNaUMsaUJBQWU7Z0JBQUVxQixLQUFLLE1BQUE5QyxnQkFBQSxpQkFDNUIrQyxhQUFFLENBQUNDLE9BQU8sRUFBRyxDQUFDNUIsU0FBUyxFQUFFQyxTQUFTLENBQUM7Y0FDdkM7WUFDTCxDQUFDLENBQUM7VUFBQTtZQUxJSyxRQUFNLEdBQUFVLFFBQUEsQ0FBQWlCLElBQUE7WUFBQSxPQUFBakIsUUFBQSxDQUFBa0IsTUFBQSxXQU1ML0MsR0FBRyxDQUFDZ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM5QixRQUFNLENBQUM7VUFBQTtZQUFBVSxRQUFBLENBQUFFLElBQUE7WUFBQSxPQUdmSSxVQUFFLENBQUNrQixJQUFJLENBQ3RCaEIsT0FBTyxDQUFDO2NBQ0xDLEtBQUssRUFBRXBCO1lBQ1gsQ0FBQyxDQUFDO1VBQUE7WUFIQUMsUUFBTSxHQUFBVSxRQUFBLENBQUFpQixJQUFBO1lBQUEsT0FBQWpCLFFBQUEsQ0FBQWtCLE1BQUEsV0FJTC9DLEdBQUcsQ0FBQ2dELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDOUIsUUFBTSxDQUFDO1VBQUE7WUFJM0MsSUFBSWMsUUFBUSxDQUFDM0IsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBRWpDO1VBQUM7VUFBQTtZQUFBLE9BQUF1QixRQUFBLENBQUF5QixJQUFBO1FBQUE7TUFBQSxHQUFBbEQsT0FBQTtJQUFBO0VBQ0w7QUFDSixDQUFDO0FBQUFtRCxPQUFBLGNBQUExRCxRQUFBIn0=