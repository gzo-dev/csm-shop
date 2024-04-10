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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfc2VxdWVsaXplIiwicmVxdWlyZSIsIl9tb2RlbHMiLCJvd25LZXlzIiwib2JqZWN0IiwiZW51bWVyYWJsZU9ubHkiLCJrZXlzIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwic3ltYm9scyIsImZpbHRlciIsInN5bSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJwdXNoIiwiYXBwbHkiLCJfb2JqZWN0U3ByZWFkIiwidGFyZ2V0IiwiaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInNvdXJjZSIsImZvckVhY2giLCJrZXkiLCJfZGVmaW5lUHJvcGVydHkyIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsImRlZmluZVByb3BlcnRpZXMiLCJkZWZpbmVQcm9wZXJ0eSIsIl9kZWZhdWx0Iiwic2VhcmNoUHJvZHVjdCIsInJlcSIsInJlcyIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwiZGF0YSIsInR5cGVCb29raW5nIiwicmVhbEVzdGF0ZVR5cGUiLCJwcm92aW5jZSIsImRpc3RyaWN0Iiwid2FyZCIsImJ1ZGdldCIsInN1YkNhdGVnb3J5SWQiLCJtaW5CdWRnZXQiLCJtYXhCdWRnZXQiLCJkZXBhcnR1cmVQb2ludCIsImRlc3RpbmF0aW9uUG9pbnQiLCJ0eXBlIiwicGFnZSIsIndoZXJlQ29uZGl0aW9ucyIsInJlc3VsdCIsIl9yZXN1bHQiLCJjb3VudCIsIl93aGVyZUNvbmRpdGlvbnMiLCJfcmVzdWx0MiRyb3dzIiwiX3Jlc3VsdDIiLCJfcmVzdWx0MyRyb3dzIiwiX3Jlc3VsdDMiLCJfd2hlcmVDb25kaXRpb25zMiIsIl9yZXN1bHQ0JHJvd3MiLCJfcmVzdWx0NCIsIl9yZXN1bHQ1JHJvd3MiLCJfcmVzdWx0NSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJxdWVyeSIsInBhcnNlSW50IiwiY2F0ZWdvcnlJZCIsImRiIiwicHJvZHVjdCIsImZpbmRBbmRDb3VudEFsbCIsIndoZXJlIiwicHJpY2UiLCJPcCIsImJldHdlZW4iLCJpbmNsdWRlIiwibW9kZWwiLCJwcm9kdWN0cGhvdG8iLCJhdHRyaWJ1dGVzIiwib3JkZXIiLCJzZW50IiwiYWJydXB0Iiwic3RhdHVzIiwianNvbiIsInJvd3MiLCJzdWNjZXNzIiwidG9TdHJpbmciLCJkZXBhcnR1cmUiLCJkZXN0aW5hdGlvbiIsInRvdXIiLCJzdG9wIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL3NlYXJjaC9zZWFyY2guY29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcCB9IGZyb20gXCJzZXF1ZWxpemVcIlxuaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzXCJcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFzeW5jIHNlYXJjaFByb2R1Y3QocmVxLCByZXMpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHJlcS5xdWVyeVxuICAgICAgICBjb25zdCB7IHR5cGVCb29raW5nLCByZWFsRXN0YXRlVHlwZSwgcHJvdmluY2UsIGRpc3RyaWN0LCB3YXJkLCBidWRnZXQsIHN1YkNhdGVnb3J5SWQsIG1pbkJ1ZGdldCwgbWF4QnVkZ2V0LCBkZXBhcnR1cmVQb2ludCwgZGVzdGluYXRpb25Qb2ludCwgdHlwZSwgcGFnZSB9ID0gZGF0YVxuICAgICAgICBpZiAocGFyc2VJbnQodHlwZUJvb2tpbmcpID09IDEpIHtcbiAgICAgICAgICAgIGxldCB3aGVyZUNvbmRpdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlJZDogMTNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZWFsRXN0YXRlVHlwZSkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5zdWJDYXRlZ29yeUlkID0gcmVhbEVzdGF0ZVR5cGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJzZUludChwcm92aW5jZSkgPiAwKSB7XG4gICAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnByb3ZpbmNlID0gcHJvdmluY2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkaXN0cmljdCkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5kaXN0cmljdCA9IGRpc3RyaWN0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAod2FyZCkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy53YXJkID0gd2FyZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJ1ZGdldCkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5idWRnZXQgPSBidWRnZXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdWJDYXRlZ29yeUlkKSB7XG4gICAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnN1YkNhdGVnb3J5SWQ9IHN1YkNhdGVnb3J5SWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtaW5CdWRnZXQgJiYgbWF4QnVkZ2V0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGIucHJvZHVjdFxuICAgICAgICAgICAgICAgICAgICAuZmluZEFuZENvdW50QWxsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ud2hlcmVDb25kaXRpb25zLCBwcmljZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbT3AuYmV0d2Vlbl06IFttaW5CdWRnZXQsIG1heEJ1ZGdldF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgZGF0YTogcmVzdWx0Py5yb3dzLCBjb3VudDogcmVzdWx0Py5jb3VudCwgc3VjY2VzczogdHJ1ZSB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGIucHJvZHVjdFxuICAgICAgICAgICAgICAgICAgICAuZmluZEFuZENvdW50QWxsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoZXJlOiB3aGVyZUNvbmRpdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBjb25zdCBjb3VudCA9IGF3YWl0IGRiLnByb2R1Y3RcbiAgICAgICAgICAgICAgICAgICAgLmNvdW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoZXJlOiB3aGVyZUNvbmRpdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgZGF0YTogcmVzdWx0Py5yb3dzLCBjb3VudDogY291bnQsIHN1Y2Nlc3M6IHRydWUgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIC8vIFxuICAgICAgICBpZiAocGFyc2VJbnQodHlwZUJvb2tpbmcpID09IDIpIHtcbiAgICAgICAgICAgIGxldCB3aGVyZUNvbmRpdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlJZDogMTJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZWFsRXN0YXRlVHlwZSkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5zdWJDYXRlZ29yeUlkID0gcmVhbEVzdGF0ZVR5cGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm92aW5jZSkge1xuICAgICAgICAgICAgICAgIC8vIHdoZXJlQ29uZGl0aW9ucy5wcm92aW5jZT0gcHJvdmluY2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkaXN0cmljdCkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5kaXN0cmljdCA9IGRpc3RyaWN0LnRvU3RyaW5nKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh3YXJkKSB7XG4gICAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLndhcmQgPSB3YXJkLnRvU3RyaW5nKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChidWRnZXQpIHtcbiAgICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuYnVkZ2V0ID0gYnVkZ2V0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3ViQ2F0ZWdvcnlJZCkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5zdWJDYXRlZ29yeUlkID0gcGFyc2VJbnQoc3ViQ2F0ZWdvcnlJZClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1pbkJ1ZGdldCAmJiBtYXhCdWRnZXQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkYi5wcm9kdWN0XG4gICAgICAgICAgICAgICAgICAgIC5maW5kQW5kQ291bnRBbGwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi53aGVyZUNvbmRpdGlvbnMsIHByaWNlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtPcC5iZXR3ZWVuXTogW21pbkJ1ZGdldCwgbWF4QnVkZ2V0XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBkYXRhOiByZXN1bHQ/LnJvd3MsIGNvdW50OiByZXN1bHQ/LnJvd3M/Lmxlbmd0aCwgc3VjY2VzczogdHJ1ZSB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGIucHJvZHVjdFxuICAgICAgICAgICAgICAgICAgICAuZmluZEFuZENvdW50QWxsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoZXJlOiB3aGVyZUNvbmRpdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IGRhdGE6IHJlc3VsdD8ucm93cywgY291bnQ6IHJlc3VsdD8ucm93cz8ubGVuZ3RoLCBzdWNjZXNzOiB0cnVlIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcnNlSW50KHR5cGVCb29raW5nKSA9PT0gMykge1xuICAgICAgICAgICAgbGV0IHdoZXJlQ29uZGl0aW9ucyA9IHtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRlcGFydHVyZVBvaW50KSB7XG4gICAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLmRlcGFydHVyZSA9IGRlcGFydHVyZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGVzdGluYXRpb25Qb2ludCkge1xuICAgICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnR5cGUgPSBwYXJzZUludCh0eXBlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1pbkJ1ZGdldCAmJiBtYXhCdWRnZXQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkYi50b3VyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kQW5kQ291bnRBbGwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi53aGVyZUNvbmRpdGlvbnMsIHByaWNlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtPcC5iZXR3ZWVuXTogW21pbkJ1ZGdldCwgbWF4QnVkZ2V0XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgZGF0YTogcmVzdWx0Py5yb3dzLCBjb3VudDogcmVzdWx0Py5yb3dzPy5sZW5ndGgsIHN1Y2Nlc3M6IHRydWUgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiLnRvdXJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmRBbmRDb3VudEFsbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZTogd2hlcmVDb25kaXRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgZGF0YTogcmVzdWx0Py5yb3dzLCBjb3VudDogcmVzdWx0Py5yb3dzPy5sZW5ndGgsIHN1Y2Nlc3M6IHRydWUgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJzZUludCh0eXBlQm9va2luZykgPT09IDQpIHtcblxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKFtdKVxuICAgICAgICB9XG4gICAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBQUEsVUFBQSxHQUFBQyxPQUFBO0FBQ0EsSUFBQUMsT0FBQSxHQUFBRCxPQUFBO0FBQW9DLFNBQUFFLFFBQUFDLE1BQUEsRUFBQUMsY0FBQSxRQUFBQyxJQUFBLEdBQUFDLE1BQUEsQ0FBQUQsSUFBQSxDQUFBRixNQUFBLE9BQUFHLE1BQUEsQ0FBQUMscUJBQUEsUUFBQUMsT0FBQSxHQUFBRixNQUFBLENBQUFDLHFCQUFBLENBQUFKLE1BQUEsR0FBQUMsY0FBQSxLQUFBSSxPQUFBLEdBQUFBLE9BQUEsQ0FBQUMsTUFBQSxXQUFBQyxHQUFBLFdBQUFKLE1BQUEsQ0FBQUssd0JBQUEsQ0FBQVIsTUFBQSxFQUFBTyxHQUFBLEVBQUFFLFVBQUEsT0FBQVAsSUFBQSxDQUFBUSxJQUFBLENBQUFDLEtBQUEsQ0FBQVQsSUFBQSxFQUFBRyxPQUFBLFlBQUFILElBQUE7QUFBQSxTQUFBVSxjQUFBQyxNQUFBLGFBQUFDLENBQUEsTUFBQUEsQ0FBQSxHQUFBQyxTQUFBLENBQUFDLE1BQUEsRUFBQUYsQ0FBQSxVQUFBRyxNQUFBLFdBQUFGLFNBQUEsQ0FBQUQsQ0FBQSxJQUFBQyxTQUFBLENBQUFELENBQUEsUUFBQUEsQ0FBQSxPQUFBZixPQUFBLENBQUFJLE1BQUEsQ0FBQWMsTUFBQSxPQUFBQyxPQUFBLFdBQUFDLEdBQUEsUUFBQUMsZ0JBQUEsYUFBQVAsTUFBQSxFQUFBTSxHQUFBLEVBQUFGLE1BQUEsQ0FBQUUsR0FBQSxTQUFBaEIsTUFBQSxDQUFBa0IseUJBQUEsR0FBQWxCLE1BQUEsQ0FBQW1CLGdCQUFBLENBQUFULE1BQUEsRUFBQVYsTUFBQSxDQUFBa0IseUJBQUEsQ0FBQUosTUFBQSxLQUFBbEIsT0FBQSxDQUFBSSxNQUFBLENBQUFjLE1BQUEsR0FB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