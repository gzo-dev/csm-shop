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
      var data, typeBooking, realEstateType, province, district, ward, budget, subCategoryId, minBudget, maxBudget, departurePoint, destinationPoint, type, page, whereConditions, result, _result, count, _whereConditions, _result2$rows, _result2, _result3$rows, _result3, _whereConditions2, _result4$rows, _result4, _result5$rows, _result5;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            data = req.query;
            typeBooking = data.typeBooking, realEstateType = data.realEstateType, province = data.province, district = data.district, ward = data.ward, budget = data.budget, subCategoryId = data.subCategoryId, minBudget = data.minBudget, maxBudget = data.maxBudget, departurePoint = data.departurePoint, destinationPoint = data.destinationPoint, type = data.type, page = data.page;
            if (!(parseInt(typeBooking) == 1)) {
              _context.next = 24;
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
            if (subCategoryId) {
              whereConditions.subCategoryId = subCategoryId;
            }
            if (!(minBudget && maxBudget)) {
              _context.next = 17;
              break;
            }
            _context.next = 13;
            return _models.db.product.findAndCountAll({
              where: _objectSpread(_objectSpread({}, whereConditions), {}, {
                price: (0, _defineProperty2["default"])({}, _sequelize.Op.between, [minBudget, maxBudget])
              }),
              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }],
              order: [["createdAt", "DESC"]]
            });
          case 13:
            result = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              data: result === null || result === void 0 ? void 0 : result.rows,
              count: result === null || result === void 0 ? void 0 : result.count,
              success: true
            }));
          case 17:
            _context.next = 19;
            return _models.db.product.findAndCountAll({
              where: whereConditions,
              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }],
              order: [["createdAt", "DESC"]]
            });
          case 19:
            _result = _context.sent;
            _context.next = 22;
            return _models.db.product.count({
              where: whereConditions
            });
          case 22:
            count = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              data: _result === null || _result === void 0 ? void 0 : _result.rows,
              count: count,
              success: true
            }));
          case 24:
            if (!(parseInt(typeBooking) == 2)) {
              _context.next = 43;
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
              _context.next = 39;
              break;
            }
            _context.next = 35;
            return _models.db.product.findAndCountAll({
              where: _objectSpread(_objectSpread({}, _whereConditions), {}, {
                price: (0, _defineProperty2["default"])({}, _sequelize.Op.between, [minBudget, maxBudget])
              }),
              order: [["createdAt", "DESC"]],
              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }]
            });
          case 35:
            _result2 = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              data: _result2 === null || _result2 === void 0 ? void 0 : _result2.rows,
              count: _result2 === null || _result2 === void 0 ? void 0 : (_result2$rows = _result2.rows) === null || _result2$rows === void 0 ? void 0 : _result2$rows.length,
              success: true
            }));
          case 39:
            _context.next = 41;
            return _models.db.product.findAndCountAll({
              where: _whereConditions,
              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }],
              order: [["createdAt", "DESC"]]
            });
          case 41:
            _result3 = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              data: _result3 === null || _result3 === void 0 ? void 0 : _result3.rows,
              count: _result3 === null || _result3 === void 0 ? void 0 : (_result3$rows = _result3.rows) === null || _result3$rows === void 0 ? void 0 : _result3$rows.length,
              success: true
            }));
          case 43:
            if (!(parseInt(typeBooking) === 3)) {
              _context.next = 59;
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
              _context.next = 55;
              break;
            }
            _context.next = 51;
            return _models.db.tour.findAndCountAll({
              where: _objectSpread(_objectSpread({}, _whereConditions2), {}, {
                price: (0, _defineProperty2["default"])({}, _sequelize.Op.between, [minBudget, maxBudget])
              }),
              attributes: {
                exclude: ['content']
              },
              order: [["createdAt", "DESC"]]
            });
          case 51:
            _result4 = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              data: _result4 === null || _result4 === void 0 ? void 0 : _result4.rows,
              count: _result4 === null || _result4 === void 0 ? void 0 : (_result4$rows = _result4.rows) === null || _result4$rows === void 0 ? void 0 : _result4$rows.length,
              success: true
            }));
          case 55:
            _context.next = 57;
            return _models.db.tour.findAndCountAll({
              where: _whereConditions2,
              order: [["createdAt", "DESC"]]
            });
          case 57:
            _result5 = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              data: _result5 === null || _result5 === void 0 ? void 0 : _result5.rows,
              count: _result5 === null || _result5 === void 0 ? void 0 : (_result5$rows = _result5.rows) === null || _result5$rows === void 0 ? void 0 : _result5$rows.length,
              success: true
            }));
          case 59:
            if (!(parseInt(typeBooking) === 4)) {
              _context.next = 62;
              break;
            }
            _context.next = 63;
            break;
          case 62:
            return _context.abrupt("return", res.status(200).json([]));
          case 63:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfc2VxdWVsaXplIiwicmVxdWlyZSIsIl9tb2RlbHMiLCJvd25LZXlzIiwib2JqZWN0IiwiZW51bWVyYWJsZU9ubHkiLCJrZXlzIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwic3ltYm9scyIsImZpbHRlciIsInN5bSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJwdXNoIiwiYXBwbHkiLCJfb2JqZWN0U3ByZWFkIiwidGFyZ2V0IiwiaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInNvdXJjZSIsImZvckVhY2giLCJrZXkiLCJfZGVmaW5lUHJvcGVydHkyIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsImRlZmluZVByb3BlcnRpZXMiLCJkZWZpbmVQcm9wZXJ0eSIsIl9kZWZhdWx0Iiwic2VhcmNoUHJvZHVjdCIsInJlcSIsInJlcyIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwiZGF0YSIsInR5cGVCb29raW5nIiwicmVhbEVzdGF0ZVR5cGUiLCJwcm92aW5jZSIsImRpc3RyaWN0Iiwid2FyZCIsImJ1ZGdldCIsInN1YkNhdGVnb3J5SWQiLCJtaW5CdWRnZXQiLCJtYXhCdWRnZXQiLCJkZXBhcnR1cmVQb2ludCIsImRlc3RpbmF0aW9uUG9pbnQiLCJ0eXBlIiwicGFnZSIsIndoZXJlQ29uZGl0aW9ucyIsInJlc3VsdCIsIl9yZXN1bHQiLCJjb3VudCIsIl93aGVyZUNvbmRpdGlvbnMiLCJfcmVzdWx0MiRyb3dzIiwiX3Jlc3VsdDIiLCJfcmVzdWx0MyRyb3dzIiwiX3Jlc3VsdDMiLCJfd2hlcmVDb25kaXRpb25zMiIsIl9yZXN1bHQ0JHJvd3MiLCJfcmVzdWx0NCIsIl9yZXN1bHQ1JHJvd3MiLCJfcmVzdWx0NSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJxdWVyeSIsInBhcnNlSW50IiwiY2F0ZWdvcnlJZCIsImRiIiwicHJvZHVjdCIsImZpbmRBbmRDb3VudEFsbCIsIndoZXJlIiwicHJpY2UiLCJPcCIsImJldHdlZW4iLCJpbmNsdWRlIiwibW9kZWwiLCJwcm9kdWN0cGhvdG8iLCJhdHRyaWJ1dGVzIiwib3JkZXIiLCJzZW50IiwiYWJydXB0Iiwic3RhdHVzIiwianNvbiIsInJvd3MiLCJzdWNjZXNzIiwidG9TdHJpbmciLCJkZXBhcnR1cmUiLCJkZXN0aW5hdGlvbiIsInRvdXIiLCJleGNsdWRlIiwic3RvcCIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy9zZWFyY2gvc2VhcmNoLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3AgfSBmcm9tIFwic2VxdWVsaXplXCJcbmltcG9ydCB7IGRiIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVsc1wiXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhc3luYyBzZWFyY2hQcm9kdWN0KHJlcSwgcmVzKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSByZXEucXVlcnlcbiAgICAgICAgY29uc3QgeyB0eXBlQm9va2luZywgcmVhbEVzdGF0ZVR5cGUsIHByb3ZpbmNlLCBkaXN0cmljdCwgd2FyZCwgYnVkZ2V0LCBzdWJDYXRlZ29yeUlkLCBtaW5CdWRnZXQsIG1heEJ1ZGdldCwgZGVwYXJ0dXJlUG9pbnQsIGRlc3RpbmF0aW9uUG9pbnQsIHR5cGUsIHBhZ2UgfSA9IGRhdGFcbiAgICAgICAgaWYgKHBhcnNlSW50KHR5cGVCb29raW5nKSA9PSAxKSB7XG4gICAgICAgICAgICBsZXQgd2hlcmVDb25kaXRpb25zID0ge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IDEzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVhbEVzdGF0ZVR5cGUpIHtcbiAgICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuc3ViQ2F0ZWdvcnlJZCA9IHJlYWxFc3RhdGVUeXBlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGFyc2VJbnQocHJvdmluY2UpID4gMCkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5wcm92aW5jZSA9IHByb3ZpbmNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGlzdHJpY3QpIHtcbiAgICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuZGlzdHJpY3QgPSBkaXN0cmljdFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHdhcmQpIHtcbiAgICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMud2FyZCA9IHdhcmRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChidWRnZXQpIHtcbiAgICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuYnVkZ2V0ID0gYnVkZ2V0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3ViQ2F0ZWdvcnlJZCkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5zdWJDYXRlZ29yeUlkPSBzdWJDYXRlZ29yeUlkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWluQnVkZ2V0ICYmIG1heEJ1ZGdldCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiLnByb2R1Y3RcbiAgICAgICAgICAgICAgICAgICAgLmZpbmRBbmRDb3VudEFsbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLndoZXJlQ29uZGl0aW9ucywgcHJpY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW09wLmJldHdlZW5dOiBbbWluQnVkZ2V0LCBtYXhCdWRnZXRdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IGRhdGE6IHJlc3VsdD8ucm93cywgY291bnQ6IHJlc3VsdD8uY291bnQsIHN1Y2Nlc3M6IHRydWUgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiLnByb2R1Y3RcbiAgICAgICAgICAgICAgICAgICAgLmZpbmRBbmRDb3VudEFsbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZTogd2hlcmVDb25kaXRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgY29uc3QgY291bnQgPSBhd2FpdCBkYi5wcm9kdWN0XG4gICAgICAgICAgICAgICAgICAgIC5jb3VudCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZTogd2hlcmVDb25kaXRpb25zLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IGRhdGE6IHJlc3VsdD8ucm93cywgY291bnQ6IGNvdW50LCBzdWNjZXNzOiB0cnVlIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICAvLyBcbiAgICAgICAgaWYgKHBhcnNlSW50KHR5cGVCb29raW5nKSA9PSAyKSB7XG4gICAgICAgICAgICBsZXQgd2hlcmVDb25kaXRpb25zID0ge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IDEyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVhbEVzdGF0ZVR5cGUpIHtcbiAgICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuc3ViQ2F0ZWdvcnlJZCA9IHJlYWxFc3RhdGVUeXBlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJvdmluY2UpIHtcbiAgICAgICAgICAgICAgICAvLyB3aGVyZUNvbmRpdGlvbnMucHJvdmluY2U9IHByb3ZpbmNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGlzdHJpY3QpIHtcbiAgICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuZGlzdHJpY3QgPSBkaXN0cmljdC50b1N0cmluZygpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAod2FyZCkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy53YXJkID0gd2FyZC50b1N0cmluZygpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYnVkZ2V0KSB7XG4gICAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLmJ1ZGdldCA9IGJ1ZGdldFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN1YkNhdGVnb3J5SWQpIHtcbiAgICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuc3ViQ2F0ZWdvcnlJZCA9IHBhcnNlSW50KHN1YkNhdGVnb3J5SWQpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtaW5CdWRnZXQgJiYgbWF4QnVkZ2V0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGIucHJvZHVjdFxuICAgICAgICAgICAgICAgICAgICAuZmluZEFuZENvdW50QWxsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ud2hlcmVDb25kaXRpb25zLCBwcmljZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbT3AuYmV0d2Vlbl06IFttaW5CdWRnZXQsIG1heEJ1ZGdldF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgZGF0YTogcmVzdWx0Py5yb3dzLCBjb3VudDogcmVzdWx0Py5yb3dzPy5sZW5ndGgsIHN1Y2Nlc3M6IHRydWUgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiLnByb2R1Y3RcbiAgICAgICAgICAgICAgICAgICAgLmZpbmRBbmRDb3VudEFsbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZTogd2hlcmVDb25kaXRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBkYXRhOiByZXN1bHQ/LnJvd3MsIGNvdW50OiByZXN1bHQ/LnJvd3M/Lmxlbmd0aCwgc3VjY2VzczogdHJ1ZSB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJzZUludCh0eXBlQm9va2luZykgPT09IDMpIHtcbiAgICAgICAgICAgIGxldCB3aGVyZUNvbmRpdGlvbnMgPSB7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZXBhcnR1cmVQb2ludCkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5kZXBhcnR1cmUgPSBkZXBhcnR1cmVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRlc3RpbmF0aW9uUG9pbnQpIHtcbiAgICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvblBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZSkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy50eXBlID0gcGFyc2VJbnQodHlwZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtaW5CdWRnZXQgJiYgbWF4QnVkZ2V0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGIudG91clxuICAgICAgICAgICAgICAgICAgICAuZmluZEFuZENvdW50QWxsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ud2hlcmVDb25kaXRpb25zLCBwcmljZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbT3AuYmV0d2Vlbl06IFttaW5CdWRnZXQsIG1heEJ1ZGdldF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczoge2V4Y2x1ZGU6IFsnY29udGVudCddfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBkYXRhOiByZXN1bHQ/LnJvd3MsIGNvdW50OiByZXN1bHQ/LnJvd3M/Lmxlbmd0aCwgc3VjY2VzczogdHJ1ZSB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGIudG91clxuICAgICAgICAgICAgICAgICAgICAuZmluZEFuZENvdW50QWxsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoZXJlOiB3aGVyZUNvbmRpdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBkYXRhOiByZXN1bHQ/LnJvd3MsIGNvdW50OiByZXN1bHQ/LnJvd3M/Lmxlbmd0aCwgc3VjY2VzczogdHJ1ZSB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcnNlSW50KHR5cGVCb29raW5nKSA9PT0gNCkge1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oW10pXG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxVQUFBLEdBQUFDLE9BQUE7QUFDQSxJQUFBQyxPQUFBLEdBQUFELE9BQUE7QUFBb0MsU0FBQUUsUUFBQUMsTUFBQSxFQUFBQyxjQUFBLFFBQUFDLElBQUEsR0FBQUMsTUFBQSxDQUFBRCxJQUFBLENBQUFGLE1BQUEsT0FBQUcsTUFBQSxDQUFBQyxxQkFBQSxRQUFBQyxPQUFBLEdBQUFGLE1BQUEsQ0FBQUMscUJBQUEsQ0FBQUosTUFBQSxHQUFBQyxjQUFBLEtBQUFJLE9BQUEsR0FBQUEsT0FBQSxDQUFBQyxNQUFBLFdBQUFDLEdBQUEsV0FBQUosTUFBQSxDQUFBSyx3QkFBQSxDQUFBUixNQUFBLEVBQUFPLEdBQUEsRUFBQUUsVUFBQSxPQUFBUCxJQUFBLENBQUFRLElBQUEsQ0FBQUMsS0FBQSxDQUFBVCxJQUFBLEVBQUFHLE9BQUEsWUFBQUgsSUFBQTtBQUFBLFNBQUFVLGNBQUFDLE1BQUEsYUFBQUMsQ0FBQSxNQUFBQSxDQUFBLEdBQUFDLFNBQUEsQ0FBQUMsTUFBQSxFQUFBRixDQUFBLFVBQUFHLE1BQUEsV0FBQUYsU0FBQSxDQUFBRCxDQUFBLElBQUFDLFNBQUEsQ0FBQUQsQ0FBQSxRQUFBQSxDQUFBLE9BQUFmLE9BQUEsQ0FBQUksTUFBQSxDQUFBYyxNQUFBLE9BQUFDLE9BQUEsV0FBQUMsR0FBQSxRQUFBQyxnQkFBQSxhQUFBUCxNQUFBLEVBQUFNLEdBQUEsRUFBQUYsTUFBQSxDQUFBRSxHQUFBLFNBQUFoQixNQUFBLENBQUFrQix5QkFBQSxHQUFBbEIsTUFBQSxDQUFBbUIsZ0JBQUEsQ0FBQVQsTUFBQSxFQUFBVixNQUFBLENBQUFrQix5QkFBQSxDQUFBSixNQUFBLEtBQUFsQixPQUFBLENBQUFJLE1BQUEsQ0FBQWMsTUFBQSxHQUFBQyxPQUFBLFdBQUFDLEdBQUEsSUFBQWhCLE1BQUEsQ0FBQW9CLGNBQUEsQ0FBQVYsTUFBQSxFQUFBTSxHQUFBLEVBQUFoQixNQUFBLENBQUFLLHdCQUFBLENBQUFTLE1BQUEsRUFBQUUsR0FBQSxpQkFBQU4sTUFBQTtBQUFBLElBQUFXLFFBQUEsR0FFckI7RUFDTEMsYUFBYSxXQUFBQSxjQUFDQyxHQUFHLEVBQUVDLEdBQUcsRUFBRTtJQUFBLFdBQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQUMsUUFBQTtNQUFBLElBQUFDLElBQUEsRUFBQUMsV0FBQSxFQUFBQyxjQUFBLEVBQUFDLFFBQUEsRUFBQUMsUUFBQSxFQUFBQyxJQUFBLEVBQUFDLE1BQUEsRUFBQUMsYUFBQSxFQUFBQyxTQUFBLEVBQUFDLFNBQUEsRUFBQUMsY0FBQSxFQUFBQyxnQkFBQSxFQUFBQyxJQUFBLEVBQUFDLElBQUEsRUFBQUMsZUFBQSxFQUFBQyxNQUFBLEVBQUFDLE9BQUEsRUFBQUMsS0FBQSxFQUFBQyxnQkFBQSxFQUFBQyxhQUFBLEVBQUFDLFFBQUEsRUFBQUMsYUFBQSxFQUFBQyxRQUFBLEVBQUFDLGlCQUFBLEVBQUFDLGFBQUEsRUFBQUMsUUFBQSxFQUFBQyxhQUFBLEVBQUFDLFFBQUE7TUFBQSxPQUFBOUIsWUFBQSxZQUFBK0IsSUFBQSxVQUFBQyxTQUFBQyxRQUFBO1FBQUEsa0JBQUFBLFFBQUEsQ0FBQUMsSUFBQSxHQUFBRCxRQUFBLENBQUFFLElBQUE7VUFBQTtZQUNwQmhDLElBQUksR0FBR04sR0FBRyxDQUFDdUMsS0FBSztZQUNkaEMsV0FBVyxHQUEwSUQsSUFBSSxDQUF6SkMsV0FBVyxFQUFFQyxjQUFjLEdBQTBIRixJQUFJLENBQTVJRSxjQUFjLEVBQUVDLFFBQVEsR0FBZ0hILElBQUksQ0FBNUhHLFFBQVEsRUFBRUMsUUFBUSxHQUFzR0osSUFBSSxDQUFsSEksUUFBUSxFQUFFQyxJQUFJLEdBQWdHTCxJQUFJLENBQXhHSyxJQUFJLEVBQUVDLE1BQU0sR0FBd0ZOLElBQUksQ0FBbEdNLE1BQU0sRUFBRUMsYUFBYSxHQUF5RVAsSUFBSSxDQUExRk8sYUFBYSxFQUFFQyxTQUFTLEdBQThEUixJQUFJLENBQTNFUSxTQUFTLEVBQUVDLFNBQVMsR0FBbURULElBQUksQ0FBaEVTLFNBQVMsRUFBRUMsY0FBYyxHQUFtQ1YsSUFBSSxDQUFyRFUsY0FBYyxFQUFFQyxnQkFBZ0IsR0FBaUJYLElBQUksQ0FBckNXLGdCQUFnQixFQUFFQyxJQUFJLEdBQVdaLElBQUksQ0FBbkJZLElBQUksRUFBRUMsSUFBSSxHQUFLYixJQUFJLENBQWJhLElBQUk7WUFBQSxNQUNwSnFCLFFBQVEsQ0FBQ2pDLFdBQVcsQ0FBQyxJQUFJLENBQUM7Y0FBQTZCLFFBQUEsQ0FBQUUsSUFBQTtjQUFBO1lBQUE7WUFDdEJsQixlQUFlLEdBQUc7Y0FDbEJxQixVQUFVLEVBQUU7WUFDaEIsQ0FBQztZQUNELElBQUlqQyxjQUFjLEVBQUU7Y0FDaEJZLGVBQWUsQ0FBQ1AsYUFBYSxHQUFHTCxjQUFjO1lBQ2xEO1lBQ0EsSUFBSWdDLFFBQVEsQ0FBQy9CLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtjQUN4QlcsZUFBZSxDQUFDWCxRQUFRLEdBQUdBLFFBQVE7WUFDdkM7WUFDQSxJQUFJQyxRQUFRLEVBQUU7Y0FDVlUsZUFBZSxDQUFDVixRQUFRLEdBQUdBLFFBQVE7WUFDdkM7WUFDQSxJQUFJQyxJQUFJLEVBQUU7Y0FDTlMsZUFBZSxDQUFDVCxJQUFJLEdBQUdBLElBQUk7WUFDL0I7WUFDQSxJQUFJQyxNQUFNLEVBQUU7Y0FDUlEsZUFBZSxDQUFDUixNQUFNLEdBQUdBLE1BQU07WUFDbkM7WUFDQSxJQUFJQyxhQUFhLEVBQUU7Y0FDZk8sZUFBZSxDQUFDUCxhQUFhLEdBQUVBLGFBQWE7WUFDaEQ7WUFBQyxNQUNHQyxTQUFTLElBQUlDLFNBQVM7Y0FBQXFCLFFBQUEsQ0FBQUUsSUFBQTtjQUFBO1lBQUE7WUFBQUYsUUFBQSxDQUFBRSxJQUFBO1lBQUEsT0FDREksVUFBRSxDQUFDQyxPQUFPLENBQzFCQyxlQUFlLENBQUM7Y0FDYkMsS0FBSyxFQUFBM0QsYUFBQSxDQUFBQSxhQUFBLEtBQ0VrQyxlQUFlO2dCQUFFMEIsS0FBSyxNQUFBcEQsZ0JBQUEsaUJBQ3BCcUQsYUFBRSxDQUFDQyxPQUFPLEVBQUcsQ0FBQ2xDLFNBQVMsRUFBRUMsU0FBUyxDQUFDO2NBQ3ZDLEVBQ0o7Y0FDRGtDLE9BQU8sRUFBRSxDQUFDO2dCQUFFQyxLQUFLLEVBQUVSLFVBQUUsQ0FBQ1MsWUFBWTtnQkFBRUMsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLFFBQVE7Y0FBRSxDQUFDLENBQUM7Y0FDbkVDLEtBQUssRUFBRSxDQUNILENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQztZQUU3QixDQUFDLENBQUM7VUFBQTtZQVhBaEMsTUFBTSxHQUFBZSxRQUFBLENBQUFrQixJQUFBO1lBQUEsT0FBQWxCLFFBQUEsQ0FBQW1CLE1BQUEsV0FZTHRELEdBQUcsQ0FBQ3VELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2NBQUVuRCxJQUFJLEVBQUVlLE1BQU0sYUFBTkEsTUFBTSx1QkFBTkEsTUFBTSxDQUFFcUMsSUFBSTtjQUFFbkMsS0FBSyxFQUFFRixNQUFNLGFBQU5BLE1BQU0sdUJBQU5BLE1BQU0sQ0FBRUUsS0FBSztjQUFFb0MsT0FBTyxFQUFFO1lBQUssQ0FBQyxDQUFDO1VBQUE7WUFBQXZCLFFBQUEsQ0FBQUUsSUFBQTtZQUFBLE9BR25FSSxVQUFFLENBQUNDLE9BQU8sQ0FDMUJDLGVBQWUsQ0FBQztjQUNiQyxLQUFLLEVBQUV6QixlQUFlO2NBQ3RCNkIsT0FBTyxFQUFFLENBQUM7Z0JBQUVDLEtBQUssRUFBRVIsVUFBRSxDQUFDUyxZQUFZO2dCQUFFQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUTtjQUFFLENBQUMsQ0FBQztjQUNuRUMsS0FBSyxFQUFFLENBQ0gsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDO1lBRTdCLENBQUMsQ0FBQztVQUFBO1lBUEFoQyxPQUFNLEdBQUFlLFFBQUEsQ0FBQWtCLElBQUE7WUFBQWxCLFFBQUEsQ0FBQUUsSUFBQTtZQUFBLE9BUVFJLFVBQUUsQ0FBQ0MsT0FBTyxDQUN6QnBCLEtBQUssQ0FBQztjQUNIc0IsS0FBSyxFQUFFekI7WUFDWCxDQUFDLENBQUM7VUFBQTtZQUhBRyxLQUFLLEdBQUFhLFFBQUEsQ0FBQWtCLElBQUE7WUFBQSxPQUFBbEIsUUFBQSxDQUFBbUIsTUFBQSxXQUlKdEQsR0FBRyxDQUFDdUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Y0FBRW5ELElBQUksRUFBRWUsT0FBTSxhQUFOQSxPQUFNLHVCQUFOQSxPQUFNLENBQUVxQyxJQUFJO2NBQUVuQyxLQUFLLEVBQUVBLEtBQUs7Y0FBRW9DLE9BQU8sRUFBRTtZQUFLLENBQUMsQ0FBQztVQUFBO1lBQUEsTUFLcEZuQixRQUFRLENBQUNqQyxXQUFXLENBQUMsSUFBSSxDQUFDO2NBQUE2QixRQUFBLENBQUFFLElBQUE7Y0FBQTtZQUFBO1lBQ3RCbEIsZ0JBQWUsR0FBRztjQUNsQnFCLFVBQVUsRUFBRTtZQUNoQixDQUFDO1lBQ0QsSUFBSWpDLGNBQWMsRUFBRTtjQUNoQlksZ0JBQWUsQ0FBQ1AsYUFBYSxHQUFHTCxjQUFjO1lBQ2xEO1lBQ0EsSUFBSUMsUUFBUSxFQUFFO2NBQ1Y7WUFBQTtZQUVKLElBQUlDLFFBQVEsRUFBRTtjQUNWVSxnQkFBZSxDQUFDVixRQUFRLEdBQUdBLFFBQVEsQ0FBQ2tELFFBQVEsQ0FBQyxDQUFDO1lBQ2xEO1lBQ0EsSUFBSWpELElBQUksRUFBRTtjQUNOUyxnQkFBZSxDQUFDVCxJQUFJLEdBQUdBLElBQUksQ0FBQ2lELFFBQVEsQ0FBQyxDQUFDO1lBQzFDO1lBQ0EsSUFBSWhELE1BQU0sRUFBRTtjQUNSUSxnQkFBZSxDQUFDUixNQUFNLEdBQUdBLE1BQU07WUFDbkM7WUFDQSxJQUFJQyxhQUFhLEVBQUU7Y0FDZk8sZ0JBQWUsQ0FBQ1AsYUFBYSxHQUFHMkIsUUFBUSxDQUFDM0IsYUFBYSxDQUFDO1lBQzNEO1lBQUMsTUFFR0MsU0FBUyxJQUFJQyxTQUFTO2NBQUFxQixRQUFBLENBQUFFLElBQUE7Y0FBQTtZQUFBO1lBQUFGLFFBQUEsQ0FBQUUsSUFBQTtZQUFBLE9BQ0RJLFVBQUUsQ0FBQ0MsT0FBTyxDQUMxQkMsZUFBZSxDQUFDO2NBQ2JDLEtBQUssRUFBQTNELGFBQUEsQ0FBQUEsYUFBQSxLQUNFa0MsZ0JBQWU7Z0JBQUUwQixLQUFLLE1BQUFwRCxnQkFBQSxpQkFDcEJxRCxhQUFFLENBQUNDLE9BQU8sRUFBRyxDQUFDbEMsU0FBUyxFQUFFQyxTQUFTLENBQUM7Y0FDdkMsRUFDSjtjQUNEc0MsS0FBSyxFQUFFLENBQ0gsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQ3hCO2NBQ0RKLE9BQU8sRUFBRSxDQUFDO2dCQUFFQyxLQUFLLEVBQUVSLFVBQUUsQ0FBQ1MsWUFBWTtnQkFBRUMsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLFFBQVE7Y0FBRSxDQUFDO1lBQ3RFLENBQUMsQ0FBQztVQUFBO1lBWEEvQixRQUFNLEdBQUFlLFFBQUEsQ0FBQWtCLElBQUE7WUFBQSxPQUFBbEIsUUFBQSxDQUFBbUIsTUFBQSxXQVlMdEQsR0FBRyxDQUFDdUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Y0FBRW5ELElBQUksRUFBRWUsUUFBTSxhQUFOQSxRQUFNLHVCQUFOQSxRQUFNLENBQUVxQyxJQUFJO2NBQUVuQyxLQUFLLEVBQUVGLFFBQU0sYUFBTkEsUUFBTSx3QkFBQUksYUFBQSxHQUFOSixRQUFNLENBQUVxQyxJQUFJLGNBQUFqQyxhQUFBLHVCQUFaQSxhQUFBLENBQWNuQyxNQUFNO2NBQUVxRSxPQUFPLEVBQUU7WUFBSyxDQUFDLENBQUM7VUFBQTtZQUFBdkIsUUFBQSxDQUFBRSxJQUFBO1lBQUEsT0FHMUVJLFVBQUUsQ0FBQ0MsT0FBTyxDQUMxQkMsZUFBZSxDQUFDO2NBQ2JDLEtBQUssRUFBRXpCLGdCQUFlO2NBQ3RCNkIsT0FBTyxFQUFFLENBQUM7Z0JBQUVDLEtBQUssRUFBRVIsVUFBRSxDQUFDUyxZQUFZO2dCQUFFQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUTtjQUFFLENBQUMsQ0FBQztjQUNuRUMsS0FBSyxFQUFFLENBQ0gsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDO1lBRTdCLENBQUMsQ0FBQztVQUFBO1lBUEFoQyxRQUFNLEdBQUFlLFFBQUEsQ0FBQWtCLElBQUE7WUFBQSxPQUFBbEIsUUFBQSxDQUFBbUIsTUFBQSxXQVFMdEQsR0FBRyxDQUFDdUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Y0FBRW5ELElBQUksRUFBRWUsUUFBTSxhQUFOQSxRQUFNLHVCQUFOQSxRQUFNLENBQUVxQyxJQUFJO2NBQUVuQyxLQUFLLEVBQUVGLFFBQU0sYUFBTkEsUUFBTSx3QkFBQU0sYUFBQSxHQUFOTixRQUFNLENBQUVxQyxJQUFJLGNBQUEvQixhQUFBLHVCQUFaQSxhQUFBLENBQWNyQyxNQUFNO2NBQUVxRSxPQUFPLEVBQUU7WUFBSyxDQUFDLENBQUM7VUFBQTtZQUFBLE1BR25HbkIsUUFBUSxDQUFDakMsV0FBVyxDQUFDLEtBQUssQ0FBQztjQUFBNkIsUUFBQSxDQUFBRSxJQUFBO2NBQUE7WUFBQTtZQUN2QmxCLGlCQUFlLEdBQUcsQ0FFdEIsQ0FBQztZQUNELElBQUlKLGNBQWMsRUFBRTtjQUNoQkksaUJBQWUsQ0FBQ3lDLFNBQVMsR0FBRzdDLGNBQWM7WUFDOUM7WUFDQSxJQUFJQyxnQkFBZ0IsRUFBRTtjQUNsQkcsaUJBQWUsQ0FBQzBDLFdBQVcsR0FBRzdDLGdCQUFnQjtZQUNsRDtZQUNBLElBQUlDLElBQUksRUFBRTtjQUNORSxpQkFBZSxDQUFDRixJQUFJLEdBQUdzQixRQUFRLENBQUN0QixJQUFJLENBQUM7WUFDekM7WUFBQyxNQUNHSixTQUFTLElBQUlDLFNBQVM7Y0FBQXFCLFFBQUEsQ0FBQUUsSUFBQTtjQUFBO1lBQUE7WUFBQUYsUUFBQSxDQUFBRSxJQUFBO1lBQUEsT0FDREksVUFBRSxDQUFDcUIsSUFBSSxDQUN2Qm5CLGVBQWUsQ0FBQztjQUNiQyxLQUFLLEVBQUEzRCxhQUFBLENBQUFBLGFBQUEsS0FDRWtDLGlCQUFlO2dCQUFFMEIsS0FBSyxNQUFBcEQsZ0JBQUEsaUJBQ3BCcUQsYUFBRSxDQUFDQyxPQUFPLEVBQUcsQ0FBQ2xDLFNBQVMsRUFBRUMsU0FBUyxDQUFDO2NBQ3ZDLEVBQ0o7Y0FDRHFDLFVBQVUsRUFBRTtnQkFBQ1ksT0FBTyxFQUFFLENBQUMsU0FBUztjQUFDLENBQUM7Y0FDbENYLEtBQUssRUFBRSxDQUNILENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQztZQUU3QixDQUFDLENBQUM7VUFBQTtZQVhBaEMsUUFBTSxHQUFBZSxRQUFBLENBQUFrQixJQUFBO1lBQUEsT0FBQWxCLFFBQUEsQ0FBQW1CLE1BQUEsV0FZTHRELEdBQUcsQ0FBQ3VELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2NBQUVuRCxJQUFJLEVBQUVlLFFBQU0sYUFBTkEsUUFBTSx1QkFBTkEsUUFBTSxDQUFFcUMsSUFBSTtjQUFFbkMsS0FBSyxFQUFFRixRQUFNLGFBQU5BLFFBQU0sd0JBQUFTLGFBQUEsR0FBTlQsUUFBTSxDQUFFcUMsSUFBSSxjQUFBNUIsYUFBQSx1QkFBWkEsYUFBQSxDQUFjeEMsTUFBTTtjQUFFcUUsT0FBTyxFQUFFO1lBQUssQ0FBQyxDQUFDO1VBQUE7WUFBQXZCLFFBQUEsQ0FBQUUsSUFBQTtZQUFBLE9BRzFFSSxVQUFFLENBQUNxQixJQUFJLENBQ3ZCbkIsZUFBZSxDQUFDO2NBQ2JDLEtBQUssRUFBRXpCLGlCQUFlO2NBQ3RCaUMsS0FBSyxFQUFFLENBQ0gsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDO1lBRTdCLENBQUMsQ0FBQztVQUFBO1lBTkFoQyxRQUFNLEdBQUFlLFFBQUEsQ0FBQWtCLElBQUE7WUFBQSxPQUFBbEIsUUFBQSxDQUFBbUIsTUFBQSxXQU9MdEQsR0FBRyxDQUFDdUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Y0FBRW5ELElBQUksRUFBRWUsUUFBTSxhQUFOQSxRQUFNLHVCQUFOQSxRQUFNLENBQUVxQyxJQUFJO2NBQUVuQyxLQUFLLEVBQUVGLFFBQU0sYUFBTkEsUUFBTSx3QkFBQVcsYUFBQSxHQUFOWCxRQUFNLENBQUVxQyxJQUFJLGNBQUExQixhQUFBLHVCQUFaQSxhQUFBLENBQWMxQyxNQUFNO2NBQUVxRSxPQUFPLEVBQUU7WUFBSyxDQUFDLENBQUM7VUFBQTtZQUFBLE1BSW5HbkIsUUFBUSxDQUFDakMsV0FBVyxDQUFDLEtBQUssQ0FBQztjQUFBNkIsUUFBQSxDQUFBRSxJQUFBO2NBQUE7WUFBQTtZQUFBRixRQUFBLENBQUFFLElBQUE7WUFBQTtVQUFBO1lBQUEsT0FBQUYsUUFBQSxDQUFBbUIsTUFBQSxXQUlwQnRELEdBQUcsQ0FBQ3VELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLEVBQUUsQ0FBQztVQUFBO1VBQUE7WUFBQSxPQUFBckIsUUFBQSxDQUFBNkIsSUFBQTtRQUFBO01BQUEsR0FBQTVELE9BQUE7SUFBQTtFQUV2QztBQUNKLENBQUM7QUFBQTZELE9BQUEsY0FBQXBFLFFBQUEifQ==