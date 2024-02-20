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
      var data, typeBooking, realEstateType, province, district, ward, budget, subCategoryId, minBudget, maxBudget, departurePoint, destinationPoint, type, page, pageOffset, whereConditions, result, _result, count, _whereConditions, _result2$rows, _result2, _result3$rows, _result3, _whereConditions2, _result4$rows, _result4, _result5$rows, _result5;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            data = req.query;
            typeBooking = data.typeBooking, realEstateType = data.realEstateType, province = data.province, district = data.district, ward = data.ward, budget = data.budget, subCategoryId = data.subCategoryId, minBudget = data.minBudget, maxBudget = data.maxBudget, departurePoint = data.departurePoint, destinationPoint = data.destinationPoint, type = data.type, page = data.page;
            if (!(parseInt(typeBooking) == 1)) {
              _context.next = 24;
              break;
            }
            if (parseInt(page) > 1) {
              pageOffset = parseInt(page);
            } else {
              pageOffset = 0;
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
              order: [["createdAt", "DESC"]],
              limit: 9,
              offset: pageOffset
            });
          case 13:
            result = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              data: result === null || result === void 0 ? void 0 : result.rows,
              count: result === null || result === void 0 ? void 0 : result.count
            }));
          case 17:
            _context.next = 19;
            return _models.db.product.findAndCountAll({
              where: whereConditions,
              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }],
              order: [["createdAt", "DESC"]],
              limit: 9,
              offset: pageOffset
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
              count: count
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
              count: _result2 === null || _result2 === void 0 ? void 0 : (_result2$rows = _result2.rows) === null || _result2$rows === void 0 ? void 0 : _result2$rows.length
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
              count: _result3 === null || _result3 === void 0 ? void 0 : (_result3$rows = _result3.rows) === null || _result3$rows === void 0 ? void 0 : _result3$rows.length
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
              order: [["createdAt", "DESC"]]
            });
          case 51:
            _result4 = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              data: _result4 === null || _result4 === void 0 ? void 0 : _result4.rows,
              count: _result4 === null || _result4 === void 0 ? void 0 : (_result4$rows = _result4.rows) === null || _result4$rows === void 0 ? void 0 : _result4$rows.length
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
              count: _result5 === null || _result5 === void 0 ? void 0 : (_result5$rows = _result5.rows) === null || _result5$rows === void 0 ? void 0 : _result5$rows.length
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfc2VxdWVsaXplIiwicmVxdWlyZSIsIl9tb2RlbHMiLCJvd25LZXlzIiwib2JqZWN0IiwiZW51bWVyYWJsZU9ubHkiLCJrZXlzIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwic3ltYm9scyIsImZpbHRlciIsInN5bSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJwdXNoIiwiYXBwbHkiLCJfb2JqZWN0U3ByZWFkIiwidGFyZ2V0IiwiaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInNvdXJjZSIsImZvckVhY2giLCJrZXkiLCJfZGVmaW5lUHJvcGVydHkyIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsImRlZmluZVByb3BlcnRpZXMiLCJkZWZpbmVQcm9wZXJ0eSIsIl9kZWZhdWx0Iiwic2VhcmNoUHJvZHVjdCIsInJlcSIsInJlcyIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwiZGF0YSIsInR5cGVCb29raW5nIiwicmVhbEVzdGF0ZVR5cGUiLCJwcm92aW5jZSIsImRpc3RyaWN0Iiwid2FyZCIsImJ1ZGdldCIsInN1YkNhdGVnb3J5SWQiLCJtaW5CdWRnZXQiLCJtYXhCdWRnZXQiLCJkZXBhcnR1cmVQb2ludCIsImRlc3RpbmF0aW9uUG9pbnQiLCJ0eXBlIiwicGFnZSIsInBhZ2VPZmZzZXQiLCJ3aGVyZUNvbmRpdGlvbnMiLCJyZXN1bHQiLCJfcmVzdWx0IiwiY291bnQiLCJfd2hlcmVDb25kaXRpb25zIiwiX3Jlc3VsdDIkcm93cyIsIl9yZXN1bHQyIiwiX3Jlc3VsdDMkcm93cyIsIl9yZXN1bHQzIiwiX3doZXJlQ29uZGl0aW9uczIiLCJfcmVzdWx0NCRyb3dzIiwiX3Jlc3VsdDQiLCJfcmVzdWx0NSRyb3dzIiwiX3Jlc3VsdDUiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwicXVlcnkiLCJwYXJzZUludCIsImNhdGVnb3J5SWQiLCJkYiIsInByb2R1Y3QiLCJmaW5kQW5kQ291bnRBbGwiLCJ3aGVyZSIsInByaWNlIiwiT3AiLCJiZXR3ZWVuIiwiaW5jbHVkZSIsIm1vZGVsIiwicHJvZHVjdHBob3RvIiwiYXR0cmlidXRlcyIsIm9yZGVyIiwibGltaXQiLCJvZmZzZXQiLCJzZW50IiwiYWJydXB0Iiwic3RhdHVzIiwianNvbiIsInJvd3MiLCJ0b1N0cmluZyIsImRlcGFydHVyZSIsImRlc3RpbmF0aW9uIiwidG91ciIsInN0b3AiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvc2VhcmNoL3NlYXJjaC5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wIH0gZnJvbSBcInNlcXVlbGl6ZVwiXG5pbXBvcnQgeyBkYiB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHNcIlxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYXN5bmMgc2VhcmNoUHJvZHVjdChyZXEsIHJlcykge1xuICAgICAgICBjb25zdCBkYXRhID0gcmVxLnF1ZXJ5XG4gICAgICAgIGNvbnN0IHsgdHlwZUJvb2tpbmcsIHJlYWxFc3RhdGVUeXBlLCBwcm92aW5jZSwgZGlzdHJpY3QsIHdhcmQsIGJ1ZGdldCwgc3ViQ2F0ZWdvcnlJZCwgbWluQnVkZ2V0LCBtYXhCdWRnZXQsIGRlcGFydHVyZVBvaW50LCBkZXN0aW5hdGlvblBvaW50LCB0eXBlLCBwYWdlIH0gPSBkYXRhXG4gICAgICAgIGlmIChwYXJzZUludCh0eXBlQm9va2luZykgPT0gMSkge1xuICAgICAgICAgICAgbGV0IHBhZ2VPZmZzZXRcbiAgICAgICAgICAgIGlmIChwYXJzZUludChwYWdlKSA+IDEpIHtcbiAgICAgICAgICAgICAgICBwYWdlT2Zmc2V0ID0gcGFyc2VJbnQocGFnZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhZ2VPZmZzZXQgPSAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgd2hlcmVDb25kaXRpb25zID0ge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IDEzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVhbEVzdGF0ZVR5cGUpIHtcbiAgICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuc3ViQ2F0ZWdvcnlJZCA9IHJlYWxFc3RhdGVUeXBlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGFyc2VJbnQocHJvdmluY2UpID4gMCkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5wcm92aW5jZSA9IHByb3ZpbmNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGlzdHJpY3QpIHtcbiAgICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuZGlzdHJpY3QgPSBkaXN0cmljdFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHdhcmQpIHtcbiAgICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMud2FyZCA9IHdhcmRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChidWRnZXQpIHtcbiAgICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuYnVkZ2V0ID0gYnVkZ2V0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWluQnVkZ2V0ICYmIG1heEJ1ZGdldCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiLnByb2R1Y3RcbiAgICAgICAgICAgICAgICAgICAgLmZpbmRBbmRDb3VudEFsbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLndoZXJlQ29uZGl0aW9ucywgcHJpY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW09wLmJldHdlZW5dOiBbbWluQnVkZ2V0LCBtYXhCdWRnZXRdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IDksXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IHBhZ2VPZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBkYXRhOiByZXN1bHQ/LnJvd3MsIGNvdW50OiByZXN1bHQ/LmNvdW50IH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkYi5wcm9kdWN0XG4gICAgICAgICAgICAgICAgICAgIC5maW5kQW5kQ291bnRBbGwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHdoZXJlQ29uZGl0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IDksXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IHBhZ2VPZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBjb25zdCBjb3VudCA9IGF3YWl0IGRiLnByb2R1Y3RcbiAgICAgICAgICAgICAgICAgICAgLmNvdW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoZXJlOiB3aGVyZUNvbmRpdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgZGF0YTogcmVzdWx0Py5yb3dzLCBjb3VudDogY291bnQgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIC8vIFxuICAgICAgICBpZiAocGFyc2VJbnQodHlwZUJvb2tpbmcpID09IDIpIHtcbiAgICAgICAgICAgIGxldCB3aGVyZUNvbmRpdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlJZDogMTJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZWFsRXN0YXRlVHlwZSkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5zdWJDYXRlZ29yeUlkID0gcmVhbEVzdGF0ZVR5cGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm92aW5jZSkge1xuICAgICAgICAgICAgICAgIC8vIHdoZXJlQ29uZGl0aW9ucy5wcm92aW5jZT0gcHJvdmluY2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkaXN0cmljdCkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5kaXN0cmljdCA9IGRpc3RyaWN0LnRvU3RyaW5nKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh3YXJkKSB7XG4gICAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLndhcmQgPSB3YXJkLnRvU3RyaW5nKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChidWRnZXQpIHtcbiAgICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuYnVkZ2V0ID0gYnVkZ2V0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3ViQ2F0ZWdvcnlJZCkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5zdWJDYXRlZ29yeUlkID0gcGFyc2VJbnQoc3ViQ2F0ZWdvcnlJZClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1pbkJ1ZGdldCAmJiBtYXhCdWRnZXQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkYi5wcm9kdWN0XG4gICAgICAgICAgICAgICAgICAgIC5maW5kQW5kQ291bnRBbGwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi53aGVyZUNvbmRpdGlvbnMsIHByaWNlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtPcC5iZXR3ZWVuXTogW21pbkJ1ZGdldCwgbWF4QnVkZ2V0XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBkYXRhOiByZXN1bHQ/LnJvd3MsIGNvdW50OiByZXN1bHQ/LnJvd3M/Lmxlbmd0aCB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGIucHJvZHVjdFxuICAgICAgICAgICAgICAgICAgICAuZmluZEFuZENvdW50QWxsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoZXJlOiB3aGVyZUNvbmRpdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IGRhdGE6IHJlc3VsdD8ucm93cywgY291bnQ6IHJlc3VsdD8ucm93cz8ubGVuZ3RoIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcnNlSW50KHR5cGVCb29raW5nKSA9PT0gMykge1xuICAgICAgICAgICAgbGV0IHdoZXJlQ29uZGl0aW9ucyA9IHtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRlcGFydHVyZVBvaW50KSB7XG4gICAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLmRlcGFydHVyZSA9IGRlcGFydHVyZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGVzdGluYXRpb25Qb2ludCkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnR5cGUgPSBwYXJzZUludCh0eXBlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1pbkJ1ZGdldCAmJiBtYXhCdWRnZXQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkYi50b3VyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kQW5kQ291bnRBbGwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi53aGVyZUNvbmRpdGlvbnMsIHByaWNlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtPcC5iZXR3ZWVuXTogW21pbkJ1ZGdldCwgbWF4QnVkZ2V0XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgZGF0YTogcmVzdWx0Py5yb3dzLCBjb3VudDogcmVzdWx0Py5yb3dzPy5sZW5ndGggfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiLnRvdXJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmRBbmRDb3VudEFsbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZTogd2hlcmVDb25kaXRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgZGF0YTogcmVzdWx0Py5yb3dzLCBjb3VudDogcmVzdWx0Py5yb3dzPy5sZW5ndGggfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJzZUludCh0eXBlQm9va2luZykgPT09IDQpIHtcblxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKFtdKVxuICAgICAgICB9XG4gICAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBQUEsVUFBQSxHQUFBQyxPQUFBO0FBQ0EsSUFBQUMsT0FBQSxHQUFBRCxPQUFBO0FBQW9DLFNBQUFFLFFBQUFDLE1BQUEsRUFBQUMsY0FBQSxRQUFBQyxJQUFBLEdBQUFDLE1BQUEsQ0FBQUQsSUFBQSxDQUFBRixNQUFBLE9BQUFHLE1BQUEsQ0FBQUMscUJBQUEsUUFBQUMsT0FBQSxHQUFBRixNQUFBLENBQUFDLHFCQUFBLENBQUFKLE1BQUEsR0FBQUMsY0FBQSxLQUFBSSxPQUFBLEdBQUFBLE9BQUEsQ0FBQUMsTUFBQSxXQUFBQyxHQUFBLFdBQUFKLE1BQUEsQ0FBQUssd0JBQUEsQ0FBQVIsTUFBQSxFQUFBTyxHQUFBLEVBQUFFLFVBQUEsT0FBQVAsSUFBQSxDQUFBUSxJQUFBLENBQUFDLEtBQUEsQ0FBQVQsSUFBQSxFQUFBRyxPQUFBLFlBQUFILElBQUE7QUFBQSxTQUFBVSxjQUFBQyxNQUFBLGFBQUFDLENBQUEsTUFBQUEsQ0FBQSxHQUFBQyxTQUFBLENBQUFDLE1BQUEsRUFBQUYsQ0FBQSxVQUFBRyxNQUFBLFdBQUFGLFNBQUEsQ0FBQUQsQ0FBQSxJQUFBQyxTQUFBLENBQUFELENBQUEsUUFBQUEsQ0FBQSxPQUFBZixPQUFBLENBQUFJLE1BQUEsQ0FBQWMsTUFBQSxPQUFBQyxPQUFBLFdBQUFDLEdBQUEsUUFBQUMsZ0JBQUEsYUFBQVAs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