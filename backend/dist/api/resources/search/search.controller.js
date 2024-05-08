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
var _moment = _interopRequireDefault(require("moment"));
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
                exclude: ["content"]
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
  },
  searchProductText: function searchProductText(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var _req$query, search, id, subid, _req$query$page, page, _req$query$pageSize, pageSize, searchTextValid, whereConditions, _yield$db$product$fin, count, filteredList, totalPages;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _req$query = req.query, search = _req$query.search, id = _req$query.id, subid = _req$query.subid, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$pageSize = _req$query.pageSize, pageSize = _req$query$pageSize === void 0 ? 10 : _req$query$pageSize;
            if (search === undefined || search == null) {
              searchTextValid = "";
            } else {
              searchTextValid = search;
            }
            whereConditions = (0, _defineProperty2["default"])({
              categoryId: id,
              subCategoryId: subid
            }, _sequelize.Op.or, [{
              product_id: (0, _defineProperty2["default"])({}, _sequelize.Op.substring, searchTextValid)
            }, {
              name: (0, _defineProperty2["default"])({}, _sequelize.Op.substring, searchTextValid)
            }, {
              address: (0, _defineProperty2["default"])({}, _sequelize.Op.substring, searchTextValid)
            }, {
              wardText: (0, _defineProperty2["default"])({}, _sequelize.Op.substring, searchTextValid)
            }, {
              districtText: (0, _defineProperty2["default"])({}, _sequelize.Op.substring, searchTextValid)
            }, {
              provinceText: (0, _defineProperty2["default"])({}, _sequelize.Op.substring, searchTextValid)
            }, {
              price: (0, _defineProperty2["default"])({}, _sequelize.Op.substring, searchTextValid)
            }, {
              updatedAt: (0, _defineProperty2["default"])({}, _sequelize.Op.substring, (0, _moment["default"])(searchTextValid, "DD-MM-YYYY HH:mm:ss"))
            }, {
              createdAt: (0, _defineProperty2["default"])({}, _sequelize.Op.substring, (0, _moment["default"])(searchTextValid, "DD-MM-YYYY HH:mm:ss"))
            }, {
              "$user.firstName$": (0, _defineProperty2["default"])({}, _sequelize.Op.substring, searchTextValid)
            }]);
            _context2.prev = 3;
            _context2.next = 6;
            return _models.db.product.findAndCountAll({
              where: whereConditions,
              order: [["DESC"]],
              include: [{
                model: _models.db.user,
                attributes: ["id", "firstName", "lastName"]
              }],
              limit: pageSize,
              offset: (page - 1) * pageSize
            });
          case 6:
            _yield$db$product$fin = _context2.sent;
            count = _yield$db$product$fin.count;
            filteredList = _yield$db$product$fin.rows;
            // Tính toán tổng số trang dựa trên số lượng dữ liệu và kích thước trang
            totalPages = Math.ceil(count / pageSize); // Trả về kết quả với thông tin phân trang
            res.status(200).json({
              success: true,
              data: filteredList,
              pagination: {
                currentPage: parseInt(page),
                pageSize: parseInt(pageSize),
                totalItems: count,
                totalPages: totalPages
              }
            });
            _context2.next = 17;
            break;
          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](3);
            console.error("Error searching products:", _context2.t0);
            res.status(500).json({
              success: false,
              error: "Internal Server Error"
            });
          case 17:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[3, 13]]);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfc2VxdWVsaXplIiwicmVxdWlyZSIsIl9tb2RlbHMiLCJfbW9tZW50IiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiX2RlZmF1bHQiLCJzZWFyY2hQcm9kdWN0IiwicmVxIiwicmVzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJkYXRhIiwidHlwZUJvb2tpbmciLCJyZWFsRXN0YXRlVHlwZSIsInByb3ZpbmNlIiwiZGlzdHJpY3QiLCJ3YXJkIiwiYnVkZ2V0Iiwic3ViQ2F0ZWdvcnlJZCIsIm1pbkJ1ZGdldCIsIm1heEJ1ZGdldCIsImRlcGFydHVyZVBvaW50IiwiZGVzdGluYXRpb25Qb2ludCIsInR5cGUiLCJwYWdlIiwid2hlcmVDb25kaXRpb25zIiwicmVzdWx0IiwiX3Jlc3VsdCIsImNvdW50IiwiX3doZXJlQ29uZGl0aW9ucyIsIl9yZXN1bHQyJHJvd3MiLCJfcmVzdWx0MiIsIl9yZXN1bHQzJHJvd3MiLCJfcmVzdWx0MyIsIl93aGVyZUNvbmRpdGlvbnMyIiwiX3Jlc3VsdDQkcm93cyIsIl9yZXN1bHQ0IiwiX3Jlc3VsdDUkcm93cyIsIl9yZXN1bHQ1Iiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsInF1ZXJ5IiwicGFyc2VJbnQiLCJjYXRlZ29yeUlkIiwiZGIiLCJwcm9kdWN0IiwiZmluZEFuZENvdW50QWxsIiwid2hlcmUiLCJwcmljZSIsIk9wIiwiYmV0d2VlbiIsImluY2x1ZGUiLCJtb2RlbCIsInByb2R1Y3RwaG90byIsImF0dHJpYnV0ZXMiLCJvcmRlciIsInNlbnQiLCJhYnJ1cHQiLCJzdGF0dXMiLCJqc29uIiwicm93cyIsInN1Y2Nlc3MiLCJ0b1N0cmluZyIsImRlcGFydHVyZSIsImRlc3RpbmF0aW9uIiwidG91ciIsImV4Y2x1ZGUiLCJzdG9wIiwic2VhcmNoUHJvZHVjdFRleHQiLCJfY2FsbGVlMiIsIl9yZXEkcXVlcnkiLCJzZWFyY2giLCJpZCIsInN1YmlkIiwiX3JlcSRxdWVyeSRwYWdlIiwiX3JlcSRxdWVyeSRwYWdlU2l6ZSIsInBhZ2VTaXplIiwic2VhcmNoVGV4dFZhbGlkIiwiX3lpZWxkJGRiJHByb2R1Y3QkZmluIiwiZmlsdGVyZWRMaXN0IiwidG90YWxQYWdlcyIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsInVuZGVmaW5lZCIsIm9yIiwicHJvZHVjdF9pZCIsInN1YnN0cmluZyIsIm5hbWUiLCJhZGRyZXNzIiwid2FyZFRleHQiLCJkaXN0cmljdFRleHQiLCJwcm92aW5jZVRleHQiLCJ1cGRhdGVkQXQiLCJtb21lbnQiLCJjcmVhdGVkQXQiLCJ1c2VyIiwibGltaXQiLCJvZmZzZXQiLCJNYXRoIiwiY2VpbCIsInBhZ2luYXRpb24iLCJjdXJyZW50UGFnZSIsInRvdGFsSXRlbXMiLCJ0MCIsImNvbnNvbGUiLCJlcnJvciIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy9zZWFyY2gvc2VhcmNoLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3AgfSBmcm9tIFwic2VxdWVsaXplXCI7XG5pbXBvcnQgeyBkYiB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHNcIjtcbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFzeW5jIHNlYXJjaFByb2R1Y3QocmVxLCByZXMpIHtcbiAgICBjb25zdCBkYXRhID0gcmVxLnF1ZXJ5O1xuICAgIGNvbnN0IHtcbiAgICAgIHR5cGVCb29raW5nLFxuICAgICAgcmVhbEVzdGF0ZVR5cGUsXG4gICAgICBwcm92aW5jZSxcbiAgICAgIGRpc3RyaWN0LFxuICAgICAgd2FyZCxcbiAgICAgIGJ1ZGdldCxcbiAgICAgIHN1YkNhdGVnb3J5SWQsXG4gICAgICBtaW5CdWRnZXQsXG4gICAgICBtYXhCdWRnZXQsXG4gICAgICBkZXBhcnR1cmVQb2ludCxcbiAgICAgIGRlc3RpbmF0aW9uUG9pbnQsXG4gICAgICB0eXBlLFxuICAgICAgcGFnZSxcbiAgICB9ID0gZGF0YTtcbiAgICBpZiAocGFyc2VJbnQodHlwZUJvb2tpbmcpID09IDEpIHtcbiAgICAgIGxldCB3aGVyZUNvbmRpdGlvbnMgPSB7XG4gICAgICAgIGNhdGVnb3J5SWQ6IDEzLFxuICAgICAgfTtcbiAgICAgIGlmIChyZWFsRXN0YXRlVHlwZSkge1xuICAgICAgICB3aGVyZUNvbmRpdGlvbnMuc3ViQ2F0ZWdvcnlJZCA9IHJlYWxFc3RhdGVUeXBlO1xuICAgICAgfVxuICAgICAgaWYgKHBhcnNlSW50KHByb3ZpbmNlKSA+IDApIHtcbiAgICAgICAgd2hlcmVDb25kaXRpb25zLnByb3ZpbmNlID0gcHJvdmluY2U7XG4gICAgICB9XG4gICAgICBpZiAoZGlzdHJpY3QpIHtcbiAgICAgICAgd2hlcmVDb25kaXRpb25zLmRpc3RyaWN0ID0gZGlzdHJpY3Q7XG4gICAgICB9XG4gICAgICBpZiAod2FyZCkge1xuICAgICAgICB3aGVyZUNvbmRpdGlvbnMud2FyZCA9IHdhcmQ7XG4gICAgICB9XG4gICAgICBpZiAoYnVkZ2V0KSB7XG4gICAgICAgIHdoZXJlQ29uZGl0aW9ucy5idWRnZXQgPSBidWRnZXQ7XG4gICAgICB9XG4gICAgICBpZiAoc3ViQ2F0ZWdvcnlJZCkge1xuICAgICAgICB3aGVyZUNvbmRpdGlvbnMuc3ViQ2F0ZWdvcnlJZCA9IHN1YkNhdGVnb3J5SWQ7XG4gICAgICB9XG4gICAgICBpZiAobWluQnVkZ2V0ICYmIG1heEJ1ZGdldCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkYi5wcm9kdWN0LmZpbmRBbmRDb3VudEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIC4uLndoZXJlQ29uZGl0aW9ucyxcbiAgICAgICAgICAgIHByaWNlOiB7XG4gICAgICAgICAgICAgIFtPcC5iZXR3ZWVuXTogW21pbkJ1ZGdldCwgbWF4QnVkZ2V0XSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAgIC5qc29uKHsgZGF0YTogcmVzdWx0Py5yb3dzLCBjb3VudDogcmVzdWx0Py5jb3VudCwgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiLnByb2R1Y3QuZmluZEFuZENvdW50QWxsKHtcbiAgICAgICAgICB3aGVyZTogd2hlcmVDb25kaXRpb25zLFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBjb3VudCA9IGF3YWl0IGRiLnByb2R1Y3QuY291bnQoe1xuICAgICAgICAgIHdoZXJlOiB3aGVyZUNvbmRpdGlvbnMsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgICAgLmpzb24oeyBkYXRhOiByZXN1bHQ/LnJvd3MsIGNvdW50OiBjb3VudCwgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy9cbiAgICBpZiAocGFyc2VJbnQodHlwZUJvb2tpbmcpID09IDIpIHtcbiAgICAgIGxldCB3aGVyZUNvbmRpdGlvbnMgPSB7XG4gICAgICAgIGNhdGVnb3J5SWQ6IDEyLFxuICAgICAgfTtcbiAgICAgIGlmIChyZWFsRXN0YXRlVHlwZSkge1xuICAgICAgICB3aGVyZUNvbmRpdGlvbnMuc3ViQ2F0ZWdvcnlJZCA9IHJlYWxFc3RhdGVUeXBlO1xuICAgICAgfVxuICAgICAgaWYgKHByb3ZpbmNlKSB7XG4gICAgICAgIC8vIHdoZXJlQ29uZGl0aW9ucy5wcm92aW5jZT0gcHJvdmluY2VcbiAgICAgIH1cbiAgICAgIGlmIChkaXN0cmljdCkge1xuICAgICAgICB3aGVyZUNvbmRpdGlvbnMuZGlzdHJpY3QgPSBkaXN0cmljdC50b1N0cmluZygpO1xuICAgICAgfVxuICAgICAgaWYgKHdhcmQpIHtcbiAgICAgICAgd2hlcmVDb25kaXRpb25zLndhcmQgPSB3YXJkLnRvU3RyaW5nKCk7XG4gICAgICB9XG4gICAgICBpZiAoYnVkZ2V0KSB7XG4gICAgICAgIHdoZXJlQ29uZGl0aW9ucy5idWRnZXQgPSBidWRnZXQ7XG4gICAgICB9XG4gICAgICBpZiAoc3ViQ2F0ZWdvcnlJZCkge1xuICAgICAgICB3aGVyZUNvbmRpdGlvbnMuc3ViQ2F0ZWdvcnlJZCA9IHBhcnNlSW50KHN1YkNhdGVnb3J5SWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAobWluQnVkZ2V0ICYmIG1heEJ1ZGdldCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkYi5wcm9kdWN0LmZpbmRBbmRDb3VudEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIC4uLndoZXJlQ29uZGl0aW9ucyxcbiAgICAgICAgICAgIHByaWNlOiB7XG4gICAgICAgICAgICAgIFtPcC5iZXR3ZWVuXTogW21pbkJ1ZGdldCwgbWF4QnVkZ2V0XSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICBkYXRhOiByZXN1bHQ/LnJvd3MsXG4gICAgICAgICAgY291bnQ6IHJlc3VsdD8ucm93cz8ubGVuZ3RoLFxuICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGIucHJvZHVjdC5maW5kQW5kQ291bnRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB3aGVyZUNvbmRpdGlvbnMsXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgICAgZGF0YTogcmVzdWx0Py5yb3dzLFxuICAgICAgICAgIGNvdW50OiByZXN1bHQ/LnJvd3M/Lmxlbmd0aCxcbiAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBhcnNlSW50KHR5cGVCb29raW5nKSA9PT0gMykge1xuICAgICAgbGV0IHdoZXJlQ29uZGl0aW9ucyA9IHt9O1xuICAgICAgaWYgKGRlcGFydHVyZVBvaW50KSB7XG4gICAgICAgIHdoZXJlQ29uZGl0aW9ucy5kZXBhcnR1cmUgPSBkZXBhcnR1cmVQb2ludDtcbiAgICAgIH1cbiAgICAgIGlmIChkZXN0aW5hdGlvblBvaW50KSB7XG4gICAgICAgIHdoZXJlQ29uZGl0aW9ucy5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uUG9pbnQ7XG4gICAgICB9XG4gICAgICBpZiAodHlwZSkge1xuICAgICAgICB3aGVyZUNvbmRpdGlvbnMudHlwZSA9IHBhcnNlSW50KHR5cGUpO1xuICAgICAgfVxuICAgICAgaWYgKG1pbkJ1ZGdldCAmJiBtYXhCdWRnZXQpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGIudG91ci5maW5kQW5kQ291bnRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAuLi53aGVyZUNvbmRpdGlvbnMsXG4gICAgICAgICAgICBwcmljZToge1xuICAgICAgICAgICAgICBbT3AuYmV0d2Vlbl06IFttaW5CdWRnZXQsIG1heEJ1ZGdldF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7IGV4Y2x1ZGU6IFtcImNvbnRlbnRcIl0gfSxcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICBkYXRhOiByZXN1bHQ/LnJvd3MsXG4gICAgICAgICAgY291bnQ6IHJlc3VsdD8ucm93cz8ubGVuZ3RoLFxuICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGIudG91ci5maW5kQW5kQ291bnRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB3aGVyZUNvbmRpdGlvbnMsXG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgICAgZGF0YTogcmVzdWx0Py5yb3dzLFxuICAgICAgICAgIGNvdW50OiByZXN1bHQ/LnJvd3M/Lmxlbmd0aCxcbiAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBhcnNlSW50KHR5cGVCb29raW5nKSA9PT0gNCkge1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oW10pO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBzZWFyY2hQcm9kdWN0VGV4dChyZXEsIHJlcykge1xuICAgIGNvbnN0IHsgc2VhcmNoLCBpZCwgc3ViaWQsIHBhZ2UgPSAxLCBwYWdlU2l6ZSA9IDEwIH0gPSByZXEucXVlcnk7XG4gICAgbGV0IHNlYXJjaFRleHRWYWxpZFxuICAgIGlmKHNlYXJjaD09PSB1bmRlZmluZWQgfHwgc2VhcmNoPT0gbnVsbCkge1xuICAgICAgICBzZWFyY2hUZXh0VmFsaWQ9IFwiXCJcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHNlYXJjaFRleHRWYWxpZD0gc2VhcmNoXG4gICAgfVxuICAgIGNvbnN0IHdoZXJlQ29uZGl0aW9ucyA9IHtcbiAgICAgIGNhdGVnb3J5SWQ6IGlkLFxuICAgICAgc3ViQ2F0ZWdvcnlJZDogc3ViaWQsXG4gICAgICBbT3Aub3JdOiBbXG4gICAgICAgIHsgcHJvZHVjdF9pZDogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dFZhbGlkIH0gfSxcbiAgICAgICAgeyBuYW1lOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0VmFsaWQgfSB9LFxuICAgICAgICB7IGFkZHJlc3M6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHRWYWxpZCB9IH0sXG4gICAgICAgIHsgd2FyZFRleHQ6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHRWYWxpZCB9IH0sXG4gICAgICAgIHsgZGlzdHJpY3RUZXh0OiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0VmFsaWQgfSB9LFxuICAgICAgICB7IHByb3ZpbmNlVGV4dDogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dFZhbGlkIH0gfSxcbiAgICAgICAgeyBwcmljZTogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dFZhbGlkIH0gfSxcbiAgICAgICAge1xuICAgICAgICAgIHVwZGF0ZWRBdDoge1xuICAgICAgICAgICAgW09wLnN1YnN0cmluZ106IG1vbWVudChzZWFyY2hUZXh0VmFsaWQsIFwiREQtTU0tWVlZWSBISDptbTpzc1wiKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgY3JlYXRlZEF0OiB7XG4gICAgICAgICAgICBbT3Auc3Vic3RyaW5nXTogbW9tZW50KHNlYXJjaFRleHRWYWxpZCwgXCJERC1NTS1ZWVlZIEhIOm1tOnNzXCIpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHsgXCIkdXNlci5maXJzdE5hbWUkXCI6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHRWYWxpZCB9IH0sXG4gICAgICBdLFxuICAgIH07XG5cbiAgICB0cnkge1xuICAgICAgLy8gVGjhu7FjIGhp4buHbiB0cnV5IHbhuqVuIGThu68gbGnhu4d1IHbhu5tpIFNlcXVlbGl6ZVxuICAgICAgY29uc3QgeyBjb3VudCwgcm93czogZmlsdGVyZWRMaXN0IH0gPSBhd2FpdCBkYi5wcm9kdWN0LmZpbmRBbmRDb3VudEFsbCh7XG4gICAgICAgIHdoZXJlOiB3aGVyZUNvbmRpdGlvbnMsXG4gICAgICAgIG9yZGVyOiBbW1wiREVTQ1wiXV0sXG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtb2RlbDogZGIudXNlcixcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiZmlyc3ROYW1lXCIsIFwibGFzdE5hbWVcIl0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgbGltaXQ6IHBhZ2VTaXplLFxuICAgICAgICBvZmZzZXQ6IChwYWdlIC0gMSkgKiBwYWdlU2l6ZSxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBUw61uaCB0b8OhbiB04buVbmcgc+G7kSB0cmFuZyBk4buxYSB0csOqbiBz4buRIGzGsOG7o25nIGThu68gbGnhu4d1IHbDoCBrw61jaCB0aMaw4bubYyB0cmFuZ1xuICAgICAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbChjb3VudCAvIHBhZ2VTaXplKTtcblxuICAgICAgLy8gVHLhuqMgduG7gSBr4bq/dCBxdeG6oyB24bubaSB0aMO0bmcgdGluIHBow6JuIHRyYW5nXG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIGRhdGE6IGZpbHRlcmVkTGlzdCxcbiAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgIGN1cnJlbnRQYWdlOiBwYXJzZUludChwYWdlKSxcbiAgICAgICAgICBwYWdlU2l6ZTogcGFyc2VJbnQocGFnZVNpemUpLFxuICAgICAgICAgIHRvdGFsSXRlbXM6IGNvdW50LFxuICAgICAgICAgIHRvdGFsUGFnZXM6IHRvdGFsUGFnZXMsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNlYXJjaGluZyBwcm9kdWN0czpcIiwgZXJyb3IpO1xuICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIgfSk7XG4gICAgfVxuICB9LFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUFBLFVBQUEsR0FBQUMsT0FBQTtBQUNBLElBQUFDLE9BQUEsR0FBQUQsT0FBQTtBQUNBLElBQUFFLE9BQUEsR0FBQUMsc0JBQUEsQ0FBQUgsT0FBQTtBQUE0QixTQUFBSSxRQUFBQyxNQUFBLEVBQUFDLGNBQUEsUUFBQUMsSUFBQSxHQUFBQyxNQUFBLENBQUFELElBQUEsQ0FBQUYsTUFBQSxPQUFBRyxNQUFBLENBQUFDLHFCQUFBLFFBQUFDLE9BQUEsR0FBQUYsTUFBQSxDQUFBQyxxQkFBQSxDQUFBSixNQUFBLEdBQUFDLGNBQUEsS0FBQUksT0FBQSxHQUFBQSxPQUFBLENBQUFDLE1BQUEsV0FBQUMsR0FBQSxXQUFBSixNQUFBLENBQUFLLHdCQUFBLENBQUFSLE1BQUEsRUFBQU8sR0FBQSxFQUFBRSxVQUFBLE9BQUFQLElBQUEsQ0FBQVEsSUFBQSxDQUFBQyxLQUFBLENBQUFULElBQUEsRUFBQUcsT0FBQSxZQUFBSCxJQUFBO0FBQUEsU0FBQVUsY0FBQUMsTUFBQSxhQUFBQyxDQUFBLE1BQUFBLENBQUEsR0FBQUMsU0FBQSxDQUFBQyxNQUFBLEVBQUFGLENBQUEsVUFBQUcsTUFBQSxXQUFBRixTQUFBLENBQUFELENBQUEsSUFBQUMsU0FBQSxDQUFBRCxDQUFBLFFBQUFBLENBQUEsT0FBQWYsT0FBQSxDQUFBSSxNQUFBLENBQUFjLE1BQUEsT0FBQUMsT0FBQSxXQUFBQyxHQUFBLFFBQUFDLGdCQUFBLGFBQUFQLE1BQUEsRUFBQU0sR0FBQSxFQUFBRixNQUFBLENBQUFFLEdBQUEsU0FBQWhCLE1BQUEsQ0FBQWtCLHlCQUFBLEdBQUFsQixNQUFBLENBQUFtQixnQkFBQSxDQUFBVCxNQUFBLEVBQUFWLE1BQUEsQ0FBQWtCLHlCQUFBLENBQUFKLE1BQUEsS0FBQWxCLE9BQUEsQ0FBQUksTUFBQSxDQUFBYyxNQUFBLEdBQUFDLE9BQUEsV0FBQUMsR0FBQSxJQUFBaEIsTUFBQSxDQUFBb0IsY0FBQSxDQUFBVixNQUFBLEVBQUFNLEdBQUEsRUFBQWhCLE1BQUEsQ0FBQUssd0JBQUEsQ0FBQVMsTUFBQSxFQUFBRSxHQUFBLGlCQUFBTixNQUFBO0FBQUEsSUFBQVcsUUFBQSxHQUViO0VBQ1BDLGFBQWEsV0FBQUEsY0FBQ0MsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUFDLFFBQUE7TUFBQSxJQUFBQyxJQUFBLEVBQUFDLFdBQUEsRUFBQUMsY0FBQSxFQUFBQyxRQUFBLEVBQUFDLFFBQUEsRUFBQUMsSUFBQSxFQUFBQyxNQUFBLEVBQUFDLGFBQUEsRUFBQUMsU0FBQSxFQUFBQyxTQUFBLEVBQUFDLGNBQUEsRUFBQUMsZ0JBQUEsRUFBQUMsSUFBQSxFQUFBQyxJQUFBLEVBQUFDLGVBQUEsRUFBQUMsTUFBQSxFQUFBQyxPQUFBLEVBQUFDLEtBQUEsRUFBQUMsZ0JBQUEsRUFBQUMsYUFBQSxFQUFBQyxRQUFBLEVBQUFDLGFBQUEsRUFBQUMsUUFBQSxFQUFBQyxpQkFBQSxFQUFBQyxhQUFBLEVBQUFDLFFBQUEsRUFBQUMsYUFBQSxFQUFBQyxRQUFBO01BQUEsT0FBQTlCLFlBQUEsWUFBQStCLElBQUEsVUFBQUMsU0FBQUMsUUFBQTtRQUFBLGtCQUFBQSxRQUFBLENBQUFDLElBQUEsR0FBQUQsUUFBQSxDQUFBRSxJQUFBO1VBQUE7WUFDdEJoQyxJQUFJLEdBQUdOLEdBQUcsQ0FBQ3VDLEtBQUs7WUFFcEJoQyxXQUFXLEdBYVRELElBQUksQ0FiTkMsV0FBVyxFQUNYQyxjQUFjLEdBWVpGLElBQUksQ0FaTkUsY0FBYyxFQUNkQyxRQUFRLEdBV05ILElBQUksQ0FYTkcsUUFBUSxFQUNSQyxRQUFRLEdBVU5KLElBQUksQ0FWTkksUUFBUSxFQUNSQyxJQUFJLEdBU0ZMLElBQUksQ0FUTkssSUFBSSxFQUNKQyxNQUFNLEdBUUpOLElBQUksQ0FSTk0sTUFBTSxFQUNOQyxhQUFhLEdBT1hQLElBQUksQ0FQTk8sYUFBYSxFQUNiQyxTQUFTLEdBTVBSLElBQUksQ0FOTlEsU0FBUyxFQUNUQyxTQUFTLEdBS1BULElBQUksQ0FMTlMsU0FBUyxFQUNUQyxjQUFjLEdBSVpWLElBQUksQ0FKTlUsY0FBYyxFQUNkQyxnQkFBZ0IsR0FHZFgsSUFBSSxDQUhOVyxnQkFBZ0IsRUFDaEJDLElBQUksR0FFRlosSUFBSSxDQUZOWSxJQUFJLEVBQ0pDLElBQUksR0FDRmIsSUFBSSxDQUROYSxJQUFJO1lBQUEsTUFFRnFCLFFBQVEsQ0FBQ2pDLFdBQVcsQ0FBQyxJQUFJLENBQUM7Y0FBQTZCLFFBQUEsQ0FBQUUsSUFBQTtjQUFBO1lBQUE7WUFDeEJsQixlQUFlLEdBQUc7Y0FDcEJxQixVQUFVLEVBQUU7WUFDZCxDQUFDO1lBQ0QsSUFBSWpDLGNBQWMsRUFBRTtjQUNsQlksZUFBZSxDQUFDUCxhQUFhLEdBQUdMLGNBQWM7WUFDaEQ7WUFDQSxJQUFJZ0MsUUFBUSxDQUFDL0IsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2NBQzFCVyxlQUFlLENBQUNYLFFBQVEsR0FBR0EsUUFBUTtZQUNyQztZQUNBLElBQUlDLFFBQVEsRUFBRTtjQUNaVSxlQUFlLENBQUNWLFFBQVEsR0FBR0EsUUFBUTtZQUNyQztZQUNBLElBQUlDLElBQUksRUFBRTtjQUNSUyxlQUFlLENBQUNULElBQUksR0FBR0EsSUFBSTtZQUM3QjtZQUNBLElBQUlDLE1BQU0sRUFBRTtjQUNWUSxlQUFlLENBQUNSLE1BQU0sR0FBR0EsTUFBTTtZQUNqQztZQUNBLElBQUlDLGFBQWEsRUFBRTtjQUNqQk8sZUFBZSxDQUFDUCxhQUFhLEdBQUdBLGFBQWE7WUFDL0M7WUFBQyxNQUNHQyxTQUFTLElBQUlDLFNBQVM7Y0FBQXFCLFFBQUEsQ0FBQUUsSUFBQTtjQUFBO1lBQUE7WUFBQUYsUUFBQSxDQUFBRSxJQUFBO1lBQUEsT0FDSEksVUFBRSxDQUFDQyxPQUFPLENBQUNDLGVBQWUsQ0FBQztjQUM5Q0MsS0FBSyxFQUFBM0QsYUFBQSxDQUFBQSxhQUFBLEtBQ0FrQyxlQUFlO2dCQUNsQjBCLEtBQUssTUFBQXBELGdCQUFBLGlCQUNGcUQsYUFBRSxDQUFDQyxPQUFPLEVBQUcsQ0FBQ2xDLFNBQVMsRUFBRUMsU0FBUyxDQUFDO2NBQ3JDLEVBQ0Y7Y0FDRGtDLE9BQU8sRUFBRSxDQUFDO2dCQUFFQyxLQUFLLEVBQUVSLFVBQUUsQ0FBQ1MsWUFBWTtnQkFBRUMsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLFFBQVE7Y0FBRSxDQUFDLENBQUM7Y0FDbkVDLEtBQUssRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQztZQUMvQixDQUFDLENBQUM7VUFBQTtZQVRJaEMsTUFBTSxHQUFBZSxRQUFBLENBQUFrQixJQUFBO1lBQUEsT0FBQWxCLFFBQUEsQ0FBQW1CLE1BQUEsV0FVTHRELEdBQUcsQ0FDUHVELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FDWEMsSUFBSSxDQUFDO2NBQUVuRCxJQUFJLEVBQUVlLE1BQU0sYUFBTkEsTUFBTSx1QkFBTkEsTUFBTSxDQUFFcUMsSUFBSTtjQUFFbkMsS0FBSyxFQUFFRixNQUFNLGFBQU5BLE1BQU0sdUJBQU5BLE1BQU0sQ0FBRUUsS0FBSztjQUFFb0MsT0FBTyxFQUFFO1lBQUssQ0FBQyxDQUFDO1VBQUE7WUFBQXZCLFFBQUEsQ0FBQUUsSUFBQTtZQUFBLE9BRS9DSSxVQUFFLENBQUNDLE9BQU8sQ0FBQ0MsZUFBZSxDQUFDO2NBQzlDQyxLQUFLLEVBQUV6QixlQUFlO2NBQ3RCNkIsT0FBTyxFQUFFLENBQUM7Z0JBQUVDLEtBQUssRUFBRVIsVUFBRSxDQUFDUyxZQUFZO2dCQUFFQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUTtjQUFFLENBQUMsQ0FBQztjQUNuRUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDO1lBQy9CLENBQUMsQ0FBQztVQUFBO1lBSkloQyxPQUFNLEdBQUFlLFFBQUEsQ0FBQWtCLElBQUE7WUFBQWxCLFFBQUEsQ0FBQUUsSUFBQTtZQUFBLE9BS1FJLFVBQUUsQ0FBQ0MsT0FBTyxDQUFDcEIsS0FBSyxDQUFDO2NBQ25Dc0IsS0FBSyxFQUFFekI7WUFDVCxDQUFDLENBQUM7VUFBQTtZQUZJRyxLQUFLLEdBQUFhLFFBQUEsQ0FBQWtCLElBQUE7WUFBQSxPQUFBbEIsUUFBQSxDQUFBbUIsTUFBQSxXQUdKdEQsR0FBRyxDQUNQdUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUNYQyxJQUFJLENBQUM7Y0FBRW5ELElBQUksRUFBRWUsT0FBTSxhQUFOQSxPQUFNLHVCQUFOQSxPQUFNLENBQUVxQyxJQUFJO2NBQUVuQyxLQUFLLEVBQUVBLEtBQUs7Y0FBRW9DLE9BQU8sRUFBRTtZQUFLLENBQUMsQ0FBQztVQUFBO1lBQUEsTUFJNURuQixRQUFRLENBQUNqQyxXQUFXLENBQUMsSUFBSSxDQUFDO2NBQUE2QixRQUFBLENBQUFFLElBQUE7Y0FBQTtZQUFBO1lBQ3hCbEIsZ0JBQWUsR0FBRztjQUNwQnFCLFVBQVUsRUFBRTtZQUNkLENBQUM7WUFDRCxJQUFJakMsY0FBYyxFQUFFO2NBQ2xCWSxnQkFBZSxDQUFDUCxhQUFhLEdBQUdMLGNBQWM7WUFDaEQ7WUFDQSxJQUFJQyxRQUFRLEVBQUU7Y0FDWjtZQUFBO1lBRUYsSUFBSUMsUUFBUSxFQUFFO2NBQ1pVLGdCQUFlLENBQUNWLFFBQVEsR0FBR0EsUUFBUSxDQUFDa0QsUUFBUSxDQUFDLENBQUM7WUFDaEQ7WUFDQSxJQUFJakQsSUFBSSxFQUFFO2NBQ1JTLGdCQUFlLENBQUNULElBQUksR0FBR0EsSUFBSSxDQUFDaUQsUUFBUSxDQUFDLENBQUM7WUFDeEM7WUFDQSxJQUFJaEQsTUFBTSxFQUFFO2NBQ1ZRLGdCQUFlLENBQUNSLE1BQU0sR0FBR0EsTUFBTTtZQUNqQztZQUNBLElBQUlDLGFBQWEsRUFBRTtjQUNqQk8sZ0JBQWUsQ0FBQ1AsYUFBYSxHQUFHMkIsUUFBUSxDQUFDM0IsYUFBYSxDQUFDO1lBQ3pEO1lBQUMsTUFFR0MsU0FBUyxJQUFJQyxTQUFTO2NBQUFxQixRQUFBLENBQUFFLElBQUE7Y0FBQTtZQUFBO1lBQUFGLFFBQUEsQ0FBQUUsSUFBQTtZQUFBLE9BQ0hJLFVBQUUsQ0FBQ0MsT0FBTyxDQUFDQyxlQUFlLENBQUM7Y0FDOUNDLEtBQUssRUFBQTNELGFBQUEsQ0FBQUEsYUFBQSxLQUNBa0MsZ0JBQWU7Z0JBQ2xCMEIsS0FBSyxNQUFBcEQsZ0JBQUEsaUJBQ0ZxRCxhQUFFLENBQUNDLE9BQU8sRUFBRyxDQUFDbEMsU0FBUyxFQUFFQyxTQUFTLENBQUM7Y0FDckMsRUFDRjtjQUNEc0MsS0FBSyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7Y0FDOUJKLE9BQU8sRUFBRSxDQUFDO2dCQUFFQyxLQUFLLEVBQUVSLFVBQUUsQ0FBQ1MsWUFBWTtnQkFBRUMsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLFFBQVE7Y0FBRSxDQUFDO1lBQ3BFLENBQUMsQ0FBQztVQUFBO1lBVEkvQixRQUFNLEdBQUFlLFFBQUEsQ0FBQWtCLElBQUE7WUFBQSxPQUFBbEIsUUFBQSxDQUFBbUIsTUFBQSxXQVVMdEQsR0FBRyxDQUFDdUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Y0FDMUJuRCxJQUFJLEVBQUVlLFFBQU0sYUFBTkEsUUFBTSx1QkFBTkEsUUFBTSxDQUFFcUMsSUFBSTtjQUNsQm5DLEtBQUssRUFBRUYsUUFBTSxhQUFOQSxRQUFNLHdCQUFBSSxhQUFBLEdBQU5KLFFBQU0sQ0FBRXFDLElBQUksY0FBQWpDLGFBQUEsdUJBQVpBLGFBQUEsQ0FBY25DLE1BQU07Y0FDM0JxRSxPQUFPLEVBQUU7WUFDWCxDQUFDLENBQUM7VUFBQTtZQUFBdkIsUUFBQSxDQUFBRSxJQUFBO1lBQUEsT0FFbUJJLFVBQUUsQ0FBQ0MsT0FBTyxDQUFDQyxlQUFlLENBQUM7Y0FDOUNDLEtBQUssRUFBRXpCLGdCQUFlO2NBQ3RCNkIsT0FBTyxFQUFFLENBQUM7Z0JBQUVDLEtBQUssRUFBRVIsVUFBRSxDQUFDUyxZQUFZO2dCQUFFQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUTtjQUFFLENBQUMsQ0FBQztjQUNuRUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDO1lBQy9CLENBQUMsQ0FBQztVQUFBO1lBSkloQyxRQUFNLEdBQUFlLFFBQUEsQ0FBQWtCLElBQUE7WUFBQSxPQUFBbEIsUUFBQSxDQUFBbUIsTUFBQSxXQUtMdEQsR0FBRyxDQUFDdUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Y0FDMUJuRCxJQUFJLEVBQUVlLFFBQU0sYUFBTkEsUUFBTSx1QkFBTkEsUUFBTSxDQUFFcUMsSUFBSTtjQUNsQm5DLEtBQUssRUFBRUYsUUFBTSxhQUFOQSxRQUFNLHdCQUFBTSxhQUFBLEdBQU5OLFFBQU0sQ0FBRXFDLElBQUksY0FBQS9CLGFBQUEsdUJBQVpBLGFBQUEsQ0FBY3JDLE1BQU07Y0FDM0JxRSxPQUFPLEVBQUU7WUFDWCxDQUFDLENBQUM7VUFBQTtZQUFBLE1BR0ZuQixRQUFRLENBQUNqQyxXQUFXLENBQUMsS0FBSyxDQUFDO2NBQUE2QixRQUFBLENBQUFFLElBQUE7Y0FBQTtZQUFBO1lBQ3pCbEIsaUJBQWUsR0FBRyxDQUFDLENBQUM7WUFDeEIsSUFBSUosY0FBYyxFQUFFO2NBQ2xCSSxpQkFBZSxDQUFDeUMsU0FBUyxHQUFHN0MsY0FBYztZQUM1QztZQUNBLElBQUlDLGdCQUFnQixFQUFFO2NBQ3BCRyxpQkFBZSxDQUFDMEMsV0FBVyxHQUFHN0MsZ0JBQWdCO1lBQ2hEO1lBQ0EsSUFBSUMsSUFBSSxFQUFFO2NBQ1JFLGlCQUFlLENBQUNGLElBQUksR0FBR3NCLFFBQVEsQ0FBQ3RCLElBQUksQ0FBQztZQUN2QztZQUFDLE1BQ0dKLFNBQVMsSUFBSUMsU0FBUztjQUFBcUIsUUFBQSxDQUFBRSxJQUFBO2NBQUE7WUFBQTtZQUFBRixRQUFBLENBQUFFLElBQUE7WUFBQSxPQUNISSxVQUFFLENBQUNxQixJQUFJLENBQUNuQixlQUFlLENBQUM7Y0FDM0NDLEtBQUssRUFBQTNELGFBQUEsQ0FBQUEsYUFBQSxLQUNBa0MsaUJBQWU7Z0JBQ2xCMEIsS0FBSyxNQUFBcEQsZ0JBQUEsaUJBQ0ZxRCxhQUFFLENBQUNDLE9BQU8sRUFBRyxDQUFDbEMsU0FBUyxFQUFFQyxTQUFTLENBQUM7Y0FDckMsRUFDRjtjQUVEcUMsVUFBVSxFQUFFO2dCQUFFWSxPQUFPLEVBQUUsQ0FBQyxTQUFTO2NBQUUsQ0FBQztjQUNwQ1gsS0FBSyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDO1lBQy9CLENBQUMsQ0FBQztVQUFBO1lBVkloQyxRQUFNLEdBQUFlLFFBQUEsQ0FBQWtCLElBQUE7WUFBQSxPQUFBbEIsUUFBQSxDQUFBbUIsTUFBQSxXQVdMdEQsR0FBRyxDQUFDdUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Y0FDMUJuRCxJQUFJLEVBQUVlLFFBQU0sYUFBTkEsUUFBTSx1QkFBTkEsUUFBTSxDQUFFcUMsSUFBSTtjQUNsQm5DLEtBQUssRUFBRUYsUUFBTSxhQUFOQSxRQUFNLHdCQUFBUyxhQUFBLEdBQU5ULFFBQU0sQ0FBRXFDLElBQUksY0FBQTVCLGFBQUEsdUJBQVpBLGFBQUEsQ0FBY3hDLE1BQU07Y0FDM0JxRSxPQUFPLEVBQUU7WUFDWCxDQUFDLENBQUM7VUFBQTtZQUFBdkIsUUFBQSxDQUFBRSxJQUFBO1lBQUEsT0FFbUJJLFVBQUUsQ0FBQ3FCLElBQUksQ0FBQ25CLGVBQWUsQ0FBQztjQUMzQ0MsS0FBSyxFQUFFekIsaUJBQWU7Y0FDdEJpQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUM7WUFDL0IsQ0FBQyxDQUFDO1VBQUE7WUFISWhDLFFBQU0sR0FBQWUsUUFBQSxDQUFBa0IsSUFBQTtZQUFBLE9BQUFsQixRQUFBLENBQUFtQixNQUFBLFdBSUx0RCxHQUFHLENBQUN1RCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztjQUMxQm5ELElBQUksRUFBRWUsUUFBTSxhQUFOQSxRQUFNLHVCQUFOQSxRQUFNLENBQUVxQyxJQUFJO2NBQ2xCbkMsS0FBSyxFQUFFRixRQUFNLGFBQU5BLFFBQU0sd0JBQUFXLGFBQUEsR0FBTlgsUUFBTSxDQUFFcUMsSUFBSSxjQUFBMUIsYUFBQSx1QkFBWkEsYUFBQSxDQUFjMUMsTUFBTTtjQUMzQnFFLE9BQU8sRUFBRTtZQUNYLENBQUMsQ0FBQztVQUFBO1lBQUEsTUFHRm5CLFFBQVEsQ0FBQ2pDLFdBQVcsQ0FBQyxLQUFLLENBQUM7Y0FBQTZCLFFBQUEsQ0FBQUUsSUFBQTtjQUFBO1lBQUE7WUFBQUYsUUFBQSxDQUFBRSxJQUFBO1lBQUE7VUFBQTtZQUFBLE9BQUFGLFFBQUEsQ0FBQW1CLE1BQUEsV0FFdEJ0RCxHQUFHLENBQUN1RCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQyxFQUFFLENBQUM7VUFBQTtVQUFBO1lBQUEsT0FBQXJCLFFBQUEsQ0FBQTZCLElBQUE7UUFBQTtNQUFBLEdBQUE1RCxPQUFBO0lBQUE7RUFFbkMsQ0FBQztFQUVLNkQsaUJBQWlCLFdBQUFBLGtCQUFDbEUsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUErRCxTQUFBO01BQUEsSUFBQUMsVUFBQSxFQUFBQyxNQUFBLEVBQUFDLEVBQUEsRUFBQUMsS0FBQSxFQUFBQyxlQUFBLEVBQUFyRCxJQUFBLEVBQUFzRCxtQkFBQSxFQUFBQyxRQUFBLEVBQUFDLGVBQUEsRUFBQXZELGVBQUEsRUFBQXdELHFCQUFBLEVBQUFyRCxLQUFBLEVBQUFzRCxZQUFBLEVBQUFDLFVBQUE7TUFBQSxPQUFBM0UsWUFBQSxZQUFBK0IsSUFBQSxVQUFBNkMsVUFBQUMsU0FBQTtRQUFBLGtCQUFBQSxTQUFBLENBQUEzQyxJQUFBLEdBQUEyQyxTQUFBLENBQUExQyxJQUFBO1VBQUE7WUFBQThCLFVBQUEsR0FDdUJwRSxHQUFHLENBQUN1QyxLQUFLLEVBQXhEOEIsTUFBTSxHQUFBRCxVQUFBLENBQU5DLE1BQU0sRUFBRUMsRUFBRSxHQUFBRixVQUFBLENBQUZFLEVBQUUsRUFBRUMsS0FBSyxHQUFBSCxVQUFBLENBQUxHLEtBQUssRUFBQUMsZUFBQSxHQUFBSixVQUFBLENBQUVqRCxJQUFJLEVBQUpBLElBQUksR0FBQXFELGVBQUEsY0FBRyxDQUFDLEdBQUFBLGVBQUEsRUFBQUMsbUJBQUEsR0FBQUwsVUFBQSxDQUFFTSxRQUFRLEVBQVJBLFFBQVEsR0FBQUQsbUJBQUEsY0FBRyxFQUFFLEdBQUFBLG1CQUFBO1lBRWxELElBQUdKLE1BQU0sS0FBSVksU0FBUyxJQUFJWixNQUFNLElBQUcsSUFBSSxFQUFFO2NBQ3JDTSxlQUFlLEdBQUUsRUFBRTtZQUN2QixDQUFDLE1BQ0k7Y0FDREEsZUFBZSxHQUFFTixNQUFNO1lBQzNCO1lBQ01qRCxlQUFlLE9BQUExQixnQkFBQTtjQUNuQitDLFVBQVUsRUFBRTZCLEVBQUU7Y0FDZHpELGFBQWEsRUFBRTBEO1lBQUssR0FDbkJ4QixhQUFFLENBQUNtQyxFQUFFLEVBQUcsQ0FDUDtjQUFFQyxVQUFVLE1BQUF6RixnQkFBQSxpQkFBS3FELGFBQUUsQ0FBQ3FDLFNBQVMsRUFBR1QsZUFBZTtZQUFHLENBQUMsRUFDbkQ7Y0FBRVUsSUFBSSxNQUFBM0YsZ0JBQUEsaUJBQUtxRCxhQUFFLENBQUNxQyxTQUFTLEVBQUdULGVBQWU7WUFBRyxDQUFDLEVBQzdDO2NBQUVXLE9BQU8sTUFBQTVGLGdCQUFBLGlCQUFLcUQsYUFBRSxDQUFDcUMsU0FBUyxFQUFHVCxlQUFlO1lBQUcsQ0FBQyxFQUNoRDtjQUFFWSxRQUFRLE1BQUE3RixnQkFBQSxpQkFBS3FELGFBQUUsQ0FBQ3FDLFNBQVMsRUFBR1QsZUFBZTtZQUFHLENBQUMsRUFDakQ7Y0FBRWEsWUFBWSxNQUFBOUYsZ0JBQUEsaUJBQUtxRCxhQUFFLENBQUNxQyxTQUFTLEVBQUdULGVBQWU7WUFBRyxDQUFDLEVBQ3JEO2NBQUVjLFlBQVksTUFBQS9GLGdCQUFBLGlCQUFLcUQsYUFBRSxDQUFDcUMsU0FBUyxFQUFHVCxlQUFlO1lBQUcsQ0FBQyxFQUNyRDtjQUFFN0IsS0FBSyxNQUFBcEQsZ0JBQUEsaUJBQUtxRCxhQUFFLENBQUNxQyxTQUFTLEVBQUdULGVBQWU7WUFBRyxDQUFDLEVBQzlDO2NBQ0VlLFNBQVMsTUFBQWhHLGdCQUFBLGlCQUNOcUQsYUFBRSxDQUFDcUMsU0FBUyxFQUFHLElBQUFPLGtCQUFNLEVBQUNoQixlQUFlLEVBQUUscUJBQXFCLENBQUM7WUFFbEUsQ0FBQyxFQUNEO2NBQ0VpQixTQUFTLE1BQUFsRyxnQkFBQSxpQkFDTnFELGFBQUUsQ0FBQ3FDLFNBQVMsRUFBRyxJQUFBTyxrQkFBTSxFQUFDaEIsZUFBZSxFQUFFLHFCQUFxQixDQUFDO1lBRWxFLENBQUMsRUFDRDtjQUFFLGtCQUFrQixNQUFBakYsZ0JBQUEsaUJBQUtxRCxhQUFFLENBQUNxQyxTQUFTLEVBQUdULGVBQWU7WUFBRyxDQUFDLENBQzVEO1lBQUFLLFNBQUEsQ0FBQTNDLElBQUE7WUFBQTJDLFNBQUEsQ0FBQTFDLElBQUE7WUFBQSxPQUsyQ0ksVUFBRSxDQUFDQyxPQUFPLENBQUNDLGVBQWUsQ0FBQztjQUNyRUMsS0FBSyxFQUFFekIsZUFBZTtjQUN0QmlDLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Y0FDakJKLE9BQU8sRUFBRSxDQUNQO2dCQUNFQyxLQUFLLEVBQUVSLFVBQUUsQ0FBQ21ELElBQUk7Z0JBQ2R6QyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLFVBQVU7Y0FDNUMsQ0FBQyxDQUNGO2NBQ0QwQyxLQUFLLEVBQUVwQixRQUFRO2NBQ2ZxQixNQUFNLEVBQUUsQ0FBQzVFLElBQUksR0FBRyxDQUFDLElBQUl1RDtZQUN2QixDQUFDLENBQUM7VUFBQTtZQUFBRSxxQkFBQSxHQUFBSSxTQUFBLENBQUExQixJQUFBO1lBWE0vQixLQUFLLEdBQUFxRCxxQkFBQSxDQUFMckQsS0FBSztZQUFRc0QsWUFBWSxHQUFBRCxxQkFBQSxDQUFsQmxCLElBQUk7WUFhbkI7WUFDTW9CLFVBQVUsR0FBR2tCLElBQUksQ0FBQ0MsSUFBSSxDQUFDMUUsS0FBSyxHQUFHbUQsUUFBUSxDQUFDLEVBRTlDO1lBQ0F6RSxHQUFHLENBQUN1RCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztjQUNuQkUsT0FBTyxFQUFFLElBQUk7Y0FDYnJELElBQUksRUFBRXVFLFlBQVk7Y0FDbEJxQixVQUFVLEVBQUU7Z0JBQ1ZDLFdBQVcsRUFBRTNELFFBQVEsQ0FBQ3JCLElBQUksQ0FBQztnQkFDM0J1RCxRQUFRLEVBQUVsQyxRQUFRLENBQUNrQyxRQUFRLENBQUM7Z0JBQzVCMEIsVUFBVSxFQUFFN0UsS0FBSztnQkFDakJ1RCxVQUFVLEVBQUVBO2NBQ2Q7WUFDRixDQUFDLENBQUM7WUFBQ0UsU0FBQSxDQUFBMUMsSUFBQTtZQUFBO1VBQUE7WUFBQTBDLFNBQUEsQ0FBQTNDLElBQUE7WUFBQTJDLFNBQUEsQ0FBQXFCLEVBQUEsR0FBQXJCLFNBQUE7WUFFSHNCLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDLDJCQUEyQixFQUFBdkIsU0FBQSxDQUFBcUIsRUFBTyxDQUFDO1lBQ2pEcEcsR0FBRyxDQUFDdUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Y0FBRUUsT0FBTyxFQUFFLEtBQUs7Y0FBRTRDLEtBQUssRUFBRTtZQUF3QixDQUFDLENBQUM7VUFBQztVQUFBO1lBQUEsT0FBQXZCLFNBQUEsQ0FBQWYsSUFBQTtRQUFBO01BQUEsR0FBQUUsUUFBQTtJQUFBO0VBRTdFO0FBQ0YsQ0FBQztBQUFBcUMsT0FBQSxjQUFBMUcsUUFBQSJ9