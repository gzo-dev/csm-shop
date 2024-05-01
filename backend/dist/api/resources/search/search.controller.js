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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfc2VxdWVsaXplIiwicmVxdWlyZSIsIl9tb2RlbHMiLCJvd25LZXlzIiwib2JqZWN0IiwiZW51bWVyYWJsZU9ubHkiLCJrZXlzIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwic3ltYm9scyIsImZpbHRlciIsInN5bSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJwdXNoIiwiYXBwbHkiLCJfb2JqZWN0U3ByZWFkIiwidGFyZ2V0IiwiaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInNvdXJjZSIsImZvckVhY2giLCJrZXkiLCJfZGVmaW5lUHJvcGVydHkyIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsImRlZmluZVByb3BlcnRpZXMiLCJkZWZpbmVQcm9wZXJ0eSIsIl9kZWZhdWx0Iiwic2VhcmNoUHJvZHVjdCIsInJlcSIsInJlcyIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwiZGF0YSIsInR5cGVCb29raW5nIiwicmVhbEVzdGF0ZVR5cGUiLCJwcm92aW5jZSIsImRpc3RyaWN0Iiwid2FyZCIsImJ1ZGdldCIsInN1YkNhdGVnb3J5SWQiLCJtaW5CdWRnZXQiLCJtYXhCdWRnZXQiLCJkZXBhcnR1cmVQb2ludCIsImRlc3RpbmF0aW9uUG9pbnQiLCJ0eXBlIiwicGFnZSIsIndoZXJlQ29uZGl0aW9ucyIsInJlc3VsdCIsIl9yZXN1bHQiLCJjb3VudCIsIl93aGVyZUNvbmRpdGlvbnMiLCJfcmVzdWx0MiRyb3dzIiwiX3Jlc3VsdDIiLCJfcmVzdWx0MyRyb3dzIiwiX3Jlc3VsdDMiLCJfd2hlcmVDb25kaXRpb25zMiIsIl9yZXN1bHQ0JHJvd3MiLCJfcmVzdWx0NCIsIl9yZXN1bHQ1JHJvd3MiLCJfcmVzdWx0NSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJxdWVyeSIsInBhcnNlSW50IiwiY2F0ZWdvcnlJZCIsImRiIiwicHJvZHVjdCIsImZpbmRBbmRDb3VudEFsbCIsIndoZXJlIiwicHJpY2UiLCJPcCIsImJldHdlZW4iLCJpbmNsdWRlIiwibW9kZWwiLCJwcm9kdWN0cGhvdG8iLCJhdHRyaWJ1dGVzIiwib3JkZXIiLCJzZW50IiwiYWJydXB0Iiwic3RhdHVzIiwianNvbiIsInJvd3MiLCJzdWNjZXNzIiwidG9TdHJpbmciLCJkZXBhcnR1cmUiLCJkZXN0aW5hdGlvbiIsInRvdXIiLCJleGNsdWRlIiwic3RvcCIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy9zZWFyY2gvc2VhcmNoLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3AgfSBmcm9tIFwic2VxdWVsaXplXCJcclxuaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGFzeW5jIHNlYXJjaFByb2R1Y3QocmVxLCByZXMpIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gcmVxLnF1ZXJ5XHJcbiAgICAgICAgY29uc3QgeyB0eXBlQm9va2luZywgcmVhbEVzdGF0ZVR5cGUsIHByb3ZpbmNlLCBkaXN0cmljdCwgd2FyZCwgYnVkZ2V0LCBzdWJDYXRlZ29yeUlkLCBtaW5CdWRnZXQsIG1heEJ1ZGdldCwgZGVwYXJ0dXJlUG9pbnQsIGRlc3RpbmF0aW9uUG9pbnQsIHR5cGUsIHBhZ2UgfSA9IGRhdGFcclxuICAgICAgICBpZiAocGFyc2VJbnQodHlwZUJvb2tpbmcpID09IDEpIHtcclxuICAgICAgICAgICAgbGV0IHdoZXJlQ29uZGl0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IDEzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJlYWxFc3RhdGVUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuc3ViQ2F0ZWdvcnlJZCA9IHJlYWxFc3RhdGVUeXBlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhcnNlSW50KHByb3ZpbmNlKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5wcm92aW5jZSA9IHByb3ZpbmNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRpc3RyaWN0KSB7XHJcbiAgICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuZGlzdHJpY3QgPSBkaXN0cmljdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh3YXJkKSB7XHJcbiAgICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMud2FyZCA9IHdhcmRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYnVkZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuYnVkZ2V0ID0gYnVkZ2V0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHN1YkNhdGVnb3J5SWQpIHtcclxuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5zdWJDYXRlZ29yeUlkPSBzdWJDYXRlZ29yeUlkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1pbkJ1ZGdldCAmJiBtYXhCdWRnZXQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiLnByb2R1Y3RcclxuICAgICAgICAgICAgICAgICAgICAuZmluZEFuZENvdW50QWxsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLndoZXJlQ29uZGl0aW9ucywgcHJpY2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbT3AuYmV0d2Vlbl06IFttaW5CdWRnZXQsIG1heEJ1ZGdldF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IGRhdGE6IHJlc3VsdD8ucm93cywgY291bnQ6IHJlc3VsdD8uY291bnQsIHN1Y2Nlc3M6IHRydWUgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiLnByb2R1Y3RcclxuICAgICAgICAgICAgICAgICAgICAuZmluZEFuZENvdW50QWxsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHdoZXJlQ29uZGl0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgZGIucHJvZHVjdFxyXG4gICAgICAgICAgICAgICAgICAgIC5jb3VudCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoZXJlOiB3aGVyZUNvbmRpdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IGRhdGE6IHJlc3VsdD8ucm93cywgY291bnQ6IGNvdW50LCBzdWNjZXNzOiB0cnVlIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFxyXG4gICAgICAgIGlmIChwYXJzZUludCh0eXBlQm9va2luZykgPT0gMikge1xyXG4gICAgICAgICAgICBsZXQgd2hlcmVDb25kaXRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlJZDogMTJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmVhbEVzdGF0ZVR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5zdWJDYXRlZ29yeUlkID0gcmVhbEVzdGF0ZVR5cGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJvdmluY2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIHdoZXJlQ29uZGl0aW9ucy5wcm92aW5jZT0gcHJvdmluY2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGlzdHJpY3QpIHtcclxuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5kaXN0cmljdCA9IGRpc3RyaWN0LnRvU3RyaW5nKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAod2FyZCkge1xyXG4gICAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLndhcmQgPSB3YXJkLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYnVkZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuYnVkZ2V0ID0gYnVkZ2V0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHN1YkNhdGVnb3J5SWQpIHtcclxuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5zdWJDYXRlZ29yeUlkID0gcGFyc2VJbnQoc3ViQ2F0ZWdvcnlJZClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG1pbkJ1ZGdldCAmJiBtYXhCdWRnZXQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiLnByb2R1Y3RcclxuICAgICAgICAgICAgICAgICAgICAuZmluZEFuZENvdW50QWxsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLndoZXJlQ29uZGl0aW9ucywgcHJpY2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbT3AuYmV0d2Vlbl06IFttaW5CdWRnZXQsIG1heEJ1ZGdldF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IGRhdGE6IHJlc3VsdD8ucm93cywgY291bnQ6IHJlc3VsdD8ucm93cz8ubGVuZ3RoLCBzdWNjZXNzOiB0cnVlIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkYi5wcm9kdWN0XHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmRBbmRDb3VudEFsbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoZXJlOiB3aGVyZUNvbmRpdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IGRhdGE6IHJlc3VsdD8ucm93cywgY291bnQ6IHJlc3VsdD8ucm93cz8ubGVuZ3RoLCBzdWNjZXNzOiB0cnVlIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhcnNlSW50KHR5cGVCb29raW5nKSA9PT0gMykge1xyXG4gICAgICAgICAgICBsZXQgd2hlcmVDb25kaXRpb25zID0ge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGVwYXJ0dXJlUG9pbnQpIHtcclxuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5kZXBhcnR1cmUgPSBkZXBhcnR1cmVQb2ludFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkZXN0aW5hdGlvblBvaW50KSB7XHJcbiAgICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvblBvaW50XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy50eXBlID0gcGFyc2VJbnQodHlwZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWluQnVkZ2V0ICYmIG1heEJ1ZGdldCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGIudG91clxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kQW5kQ291bnRBbGwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ud2hlcmVDb25kaXRpb25zLCBwcmljZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtPcC5iZXR3ZWVuXTogW21pbkJ1ZGdldCwgbWF4QnVkZ2V0XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7ZXhjbHVkZTogWydjb250ZW50J119LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBkYXRhOiByZXN1bHQ/LnJvd3MsIGNvdW50OiByZXN1bHQ/LnJvd3M/Lmxlbmd0aCwgc3VjY2VzczogdHJ1ZSB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGIudG91clxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kQW5kQ291bnRBbGwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZTogd2hlcmVDb25kaXRpb25zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IGRhdGE6IHJlc3VsdD8ucm93cywgY291bnQ6IHJlc3VsdD8ucm93cz8ubGVuZ3RoLCBzdWNjZXNzOiB0cnVlIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXJzZUludCh0eXBlQm9va2luZykgPT09IDQpIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oW10pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUFBLFVBQUEsR0FBQUMsT0FBQTtBQUNBLElBQUFDLE9BQUEsR0FBQUQsT0FBQTtBQUFvQyxTQUFBRSxRQUFBQyxNQUFBLEVBQUFDLGNBQUEsUUFBQUMsSUFBQSxHQUFBQyxNQUFBLENBQUFELElBQUEsQ0FBQUYsTUFBQSxPQUFBRyxNQUFBLENBQUFDLHFCQUFBLFFBQUFDLE9BQUEsR0FBQUYsTUFBQSxDQUFBQyxxQkFBQSxDQUFBSixNQUFBLEdBQUFDLGNBQUEsS0FBQUksT0FBQSxHQUFBQSxPQUFBLENBQUFDLE1BQUEsV0FBQUMsR0FBQSxXQUFBSixNQUFBLENBQUFLLHdCQUFBLENBQUFSLE1BQUEsRUFBQU8sR0FBQSxFQUFBRSxVQUFBLE9BQUFQLElBQUEsQ0FBQVEsSUFBQSxDQUFBQyxLQUFBLENBQUFULElBQUEsRUFBQUcsT0FBQSxZQUFBSCxJ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