"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _models = require("../../../models");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function generateCode() {
  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var numbers = "0123456789";
  var code = "";
  for (var i = 0; i < 3; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  code += "-";
  for (var _i = 0; _i < 5; _i++) {
    if (_i === 2) {
      code += "-";
    } else {
      code += letters.charAt(Math.floor(Math.random() * letters.length));
    }
  }
  code += "-";
  for (var _i2 = 0; _i2 < 5; _i2++) {
    if (_i2 === 3) {
      code += "-";
    } else {
      code += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
  }
  code += "-";
  for (var _i3 = 0; _i3 < 4; _i3++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return code;
}
var _default = {
  addTour: function addTour(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _models.db.tour.create(_objectSpread(_objectSpread({}, req.body), {}, {
              slug: "",
              time_created: new Date().toString(),
              discount: 0,
              photo: req.body.image,
              content: req.body.content,
              desc: req.body.desc
            }));
          case 3:
            return _context.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(500).json({
              ok: false
            }));
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 6]]);
    }))();
  },
  updateTour: function updateTour(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var uid;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            uid = req.user.uid;
            _context2.next = 4;
            return _models.db.tour.update(_objectSpread(_objectSpread({}, req.body), {}, {
              tour_id: req.body.tour_id
            }), {
              where: {
                id: req.body.id
              }
            });
          case 4:
            _context2.next = 6;
            return _models.db.history_edit_tour.create({
              tour_id: req.body.id,
              user_id: uid,
              time_updated: new Date().toString()
            });
          case 6:
            return _context2.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(500).json({
              ok: false
            }));
          case 13:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 9]]);
    }))();
  },
  getListTour: function getListTour(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var _req$query;
      var type, _req$query2, province, ward, district, whereCondition, tourList;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            type = (_req$query = req.query) === null || _req$query === void 0 ? void 0 : _req$query.type;
            _req$query2 = req.query, province = _req$query2.province, ward = _req$query2.ward, district = _req$query2.district; // Tạo đối tượng where condition, nếu có type thì thêm vào
            whereCondition = {};
            if (type) {
              whereCondition.type = type;
            }
            if (province) {
              whereCondition.destination = province;
            }
            // if (district) {
            //   whereCondition.district= district
            // }
            // if (ward) {
            //   whereCondition.ward= ward
            // }
            _context3.next = 7;
            return _models.db.tour.findAll({
              order: [["createdAt", "DESC"]],
              where: whereCondition,
              attributes: {
                exclude: ["content"] // Thay 'field1', 'field2' bằng các trường bạn muốn loại bỏ
              }
            });
          case 7:
            tourList = _context3.sent;
            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              data: tourList
            }));
          case 9:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }))();
  },
  getListSuggestTour: function getListSuggestTour(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var tourList;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models.db.tour.findAll({
              limit: 4,
              order: [["createdAt", "DESC"]],
              attributes: {
                exclude: ["content"] // Thay 'field1', 'field2' bằng các trường bạn muốn loại bỏ
              }
            });
          case 2:
            tourList = _context4.sent;
            return _context4.abrupt("return", res.status(200).json({
              success: true,
              data: tourList
            }));
          case 4:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }))();
  },
  getListTourCategory: function getListTourCategory(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var tourList;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _models.db.tour.findAll({
              where: {
                type: req.query.type
              },
              order: [["createdAt", "DESC"]]
            });
          case 3:
            tourList = _context5.sent;
            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              data: tourList
            }));
          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            return _context5.abrupt("return", res.status(500).json({
              ok: false
            }));
          case 11:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 7]]);
    }))();
  },
  getTourDetail: function getTourDetail(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var tourList;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _models.db.tour.findAll({
              where: {
                id: req.query.id
              }
            });
          case 3:
            tourList = _context6.sent;
            return _context6.abrupt("return", res.status(200).json({
              ok: true,
              data: tourList
            }));
          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            return _context6.abrupt("return", res.status(500).json({
              ok: false
            }));
          case 11:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 7]]);
    }))();
  },
  getTourDetailClient: function getTourDetailClient(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var tourList;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _models.db.tour.findOne({
              where: {
                id: req.query.id
              }
            });
          case 3:
            tourList = _context7.sent;
            return _context7.abrupt("return", res.status(200).json({
              ok: true,
              data: [tourList]
            }));
          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            return _context7.abrupt("return", res.status(500).json({
              ok: false
            }));
          case 11:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 7]]);
    }))();
  },
  deleteTour: function deleteTour(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var id;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            id = req.body.id;
            _models.db.tour.destroy({
              where: {
                id: id
              }
            });
            return _context8.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 3:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }))();
  },
  getHistoryEditProduct: function getHistoryEditProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var tour_id, rows;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            tour_id = req.query.tour_id;
            _context9.next = 4;
            return _models.db.history_edit_tour.findAll({
              where: {
                tour_id: tour_id
              },
              order: [["time_updated", "DESC"]],
              include: [{
                model: _models.db.user,
                required: false
              }]
            });
          case 4:
            rows = _context9.sent;
            return _context9.abrupt("return", res.status(200).json({
              data: rows,
              ok: true
            }));
          case 8:
            _context9.prev = 8;
            _context9.t0 = _context9["catch"](0);
            console.log(_context9.t0);
            return _context9.abrupt("return", res.status(500).json({
              ok: false
            }));
          case 12:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 8]]);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiZ2VuZXJhdGVDb2RlIiwibGV0dGVycyIsIm51bWJlcnMiLCJjb2RlIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiX2RlZmF1bHQiLCJhZGRUb3VyIiwicmVxIiwicmVzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwiZGIiLCJ0b3VyIiwiY3JlYXRlIiwiYm9keSIsInNsdWciLCJ0aW1lX2NyZWF0ZWQiLCJEYXRlIiwidG9TdHJpbmciLCJkaXNjb3VudCIsInBob3RvIiwiaW1hZ2UiLCJjb250ZW50IiwiZGVzYyIsImFicnVwdCIsInN0YXR1cyIsImpzb24iLCJvayIsInQwIiwiY29uc29sZSIsImxvZyIsInN0b3AiLCJ1cGRhdGVUb3VyIiwiX2NhbGxlZTIiLCJ1aWQiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJ1c2VyIiwidXBkYXRlIiwidG91cl9pZCIsIndoZXJlIiwiaWQiLCJoaXN0b3J5X2VkaXRfdG91ciIsInVzZXJfaWQiLCJ0aW1lX3VwZGF0ZWQiLCJnZXRMaXN0VG91ciIsIl9jYWxsZWUzIiwiX3JlcSRxdWVyeSIsInR5cGUiLCJfcmVxJHF1ZXJ5MiIsInByb3ZpbmNlIiwid2FyZCIsImRpc3RyaWN0Iiwid2hlcmVDb25kaXRpb24iLCJ0b3VyTGlzdCIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsInF1ZXJ5IiwiZGVzdGluYXRpb24iLCJmaW5kQWxsIiwib3JkZXIiLCJhdHRyaWJ1dGVzIiwiZXhjbHVkZSIsInNlbnQiLCJkYXRhIiwiZ2V0TGlzdFN1Z2dlc3RUb3VyIiwiX2NhbGxlZTQiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJsaW1pdCIsInN1Y2Nlc3MiLCJnZXRMaXN0VG91ckNhdGVnb3J5IiwiX2NhbGxlZTUiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJnZXRUb3VyRGV0YWlsIiwiX2NhbGxlZTYiLCJfY2FsbGVlNiQiLCJfY29udGV4dDYiLCJnZXRUb3VyRGV0YWlsQ2xpZW50IiwiX2NhbGxlZTciLCJfY2FsbGVlNyQiLCJfY29udGV4dDciLCJmaW5kT25lIiwiZGVsZXRlVG91ciIsIl9jYWxsZWU4IiwiX2NhbGxlZTgkIiwiX2NvbnRleHQ4IiwiZGVzdHJveSIsImdldEhpc3RvcnlFZGl0UHJvZHVjdCIsIl9jYWxsZWU5Iiwicm93cyIsIl9jYWxsZWU5JCIsIl9jb250ZXh0OSIsImluY2x1ZGUiLCJtb2RlbCIsInJlcXVpcmVkIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL3RvdXIvdG91ci5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVsc1wiO1xyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVDb2RlKCkge1xyXG4gIGNvbnN0IGxldHRlcnMgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXCI7XHJcbiAgY29uc3QgbnVtYmVycyA9IFwiMDEyMzQ1Njc4OVwiO1xyXG5cclxuICBsZXQgY29kZSA9IFwiXCI7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICBjb2RlICs9IGxldHRlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxldHRlcnMubGVuZ3RoKSk7XHJcbiAgfVxyXG5cclxuICBjb2RlICs9IFwiLVwiO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgaWYgKGkgPT09IDIpIHtcclxuICAgICAgY29kZSArPSBcIi1cIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvZGUgKz0gbGV0dGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGV0dGVycy5sZW5ndGgpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvZGUgKz0gXCItXCI7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICBpZiAoaSA9PT0gMykge1xyXG4gICAgICBjb2RlICs9IFwiLVwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29kZSArPSBudW1iZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBudW1iZXJzLmxlbmd0aCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29kZSArPSBcIi1cIjtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgIGNvZGUgKz0gbGV0dGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGV0dGVycy5sZW5ndGgpKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBjb2RlO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgYXN5bmMgYWRkVG91cihyZXEsIHJlcykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgZGIudG91ci5jcmVhdGUoe1xyXG4gICAgICAgIC4uLnJlcS5ib2R5LFxyXG4gICAgICAgIHNsdWc6IFwiXCIsXHJcbiAgICAgICAgdGltZV9jcmVhdGVkOiBuZXcgRGF0ZSgpLnRvU3RyaW5nKCksXHJcbiAgICAgICAgZGlzY291bnQ6IDAsXHJcbiAgICAgICAgcGhvdG86IHJlcS5ib2R5LmltYWdlLFxyXG4gICAgICAgIGNvbnRlbnQ6IHJlcS5ib2R5LmNvbnRlbnQsXHJcbiAgICAgICAgZGVzYzogcmVxLmJvZHkuZGVzYyxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgb2s6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXN5bmMgdXBkYXRlVG91cihyZXEsIHJlcykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyB1aWQgfSA9IHJlcS51c2VyO1xyXG5cclxuICAgICAgYXdhaXQgZGIudG91ci51cGRhdGUoXHJcbiAgICAgICAgeyAuLi5yZXEuYm9keSwgdG91cl9pZDogcmVxLmJvZHkudG91cl9pZCB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICAgIGlkOiByZXEuYm9keS5pZCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgICBhd2FpdCBkYi5oaXN0b3J5X2VkaXRfdG91ci5jcmVhdGUoe1xyXG4gICAgICAgIHRvdXJfaWQ6IHJlcS5ib2R5LmlkLFxyXG4gICAgICAgIHVzZXJfaWQ6IHVpZCxcclxuICAgICAgICB0aW1lX3VwZGF0ZWQ6IG5ldyBEYXRlKCkudG9TdHJpbmcoKSxcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBvazogZmFsc2UgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyBnZXRMaXN0VG91cihyZXEsIHJlcykge1xyXG4gICAgY29uc3QgdHlwZSA9IHJlcS5xdWVyeT8udHlwZTtcclxuICAgIGNvbnN0IHsgcHJvdmluY2UsIHdhcmQsIGRpc3RyaWN0IH0gPSByZXEucXVlcnk7XHJcblxyXG4gICAgLy8gVOG6oW8gxJHhu5FpIHTGsOG7o25nIHdoZXJlIGNvbmRpdGlvbiwgbuG6v3UgY8OzIHR5cGUgdGjDrCB0aMOqbSB2w6BvXHJcbiAgICBjb25zdCB3aGVyZUNvbmRpdGlvbiA9IHt9O1xyXG4gICAgaWYgKHR5cGUpIHtcclxuICAgICAgd2hlcmVDb25kaXRpb24udHlwZSA9IHR5cGU7XHJcbiAgICB9XHJcbiAgICBpZiAocHJvdmluY2UpIHtcclxuICAgICAgd2hlcmVDb25kaXRpb24uZGVzdGluYXRpb24gPSBwcm92aW5jZTtcclxuICAgIH1cclxuICAgIC8vIGlmIChkaXN0cmljdCkge1xyXG4gICAgLy8gICB3aGVyZUNvbmRpdGlvbi5kaXN0cmljdD0gZGlzdHJpY3RcclxuICAgIC8vIH1cclxuICAgIC8vIGlmICh3YXJkKSB7XHJcbiAgICAvLyAgIHdoZXJlQ29uZGl0aW9uLndhcmQ9IHdhcmRcclxuICAgIC8vIH1cclxuXHJcbiAgICBjb25zdCB0b3VyTGlzdCA9IGF3YWl0IGRiLnRvdXIuZmluZEFsbCh7XHJcbiAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXHJcbiAgICAgIHdoZXJlOiB3aGVyZUNvbmRpdGlvbixcclxuICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgIGV4Y2x1ZGU6IFtcImNvbnRlbnRcIl0sIC8vIFRoYXkgJ2ZpZWxkMScsICdmaWVsZDInIGLhurFuZyBjw6FjIHRyxrDhu51uZyBi4bqhbiBtdeG7kW4gbG/huqFpIGLhu49cclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIGRhdGE6IHRvdXJMaXN0IH0pO1xyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0TGlzdFN1Z2dlc3RUb3VyKHJlcSwgcmVzKSB7XHJcbiAgICBjb25zdCB0b3VyTGlzdCA9IGF3YWl0IGRiLnRvdXIuZmluZEFsbCh7XHJcbiAgICAgIGxpbWl0OiA0LFxyXG4gICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgZXhjbHVkZTogW1wiY29udGVudFwiXSwgLy8gVGhheSAnZmllbGQxJywgJ2ZpZWxkMicgYuG6sW5nIGPDoWMgdHLGsOG7nW5nIGLhuqFuIG114buRbiBsb+G6oWkgYuG7j1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiB0b3VyTGlzdCB9KTtcclxuICB9LFxyXG4gIGFzeW5jIGdldExpc3RUb3VyQ2F0ZWdvcnkocmVxLCByZXMpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHRvdXJMaXN0ID0gYXdhaXQgZGIudG91ci5maW5kQWxsKHtcclxuICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgdHlwZTogcmVxLnF1ZXJ5LnR5cGUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIGRhdGE6IHRvdXJMaXN0IH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBvazogZmFsc2UgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyBnZXRUb3VyRGV0YWlsKHJlcSwgcmVzKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB0b3VyTGlzdCA9IGF3YWl0IGRiLnRvdXIuZmluZEFsbCh7XHJcbiAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgIGlkOiByZXEucXVlcnkuaWQsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlLCBkYXRhOiB0b3VyTGlzdCB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgb2s6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0VG91ckRldGFpbENsaWVudChyZXEsIHJlcykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgdG91ckxpc3QgPSBhd2FpdCBkYi50b3VyLmZpbmRPbmUoe1xyXG4gICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICBpZDogcmVxLnF1ZXJ5LmlkLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogW3RvdXJMaXN0XSB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgb2s6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXN5bmMgZGVsZXRlVG91cihyZXEsIHJlcykge1xyXG4gICAgY29uc3QgeyBpZCB9ID0gcmVxLmJvZHk7XHJcbiAgICBkYi50b3VyLmRlc3Ryb3koe1xyXG4gICAgICB3aGVyZToge1xyXG4gICAgICAgIGlkOiBpZCxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUgfSk7XHJcbiAgfSxcclxuICBhc3luYyBnZXRIaXN0b3J5RWRpdFByb2R1Y3QocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgdG91cl9pZCB9ID0gcmVxLnF1ZXJ5O1xyXG4gICAgICBjb25zdCByb3dzID0gYXdhaXQgZGIuaGlzdG9yeV9lZGl0X3RvdXIuZmluZEFsbCh7XHJcbiAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgIHRvdXJfaWQ6IHRvdXJfaWRcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9yZGVyOiBbW1widGltZV91cGRhdGVkXCIsIFwiREVTQ1wiXV0sXHJcbiAgICAgICAgaW5jbHVkZTogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbDogZGIudXNlcixcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgZGF0YTogcm93cywgb2s6IHRydWUgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG9rOiBmYWxzZSB9KTtcclxuICAgIH1cclxuICB9LFxyXG59O1xyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxPQUFBLEdBQUFDLE9BQUE7QUFBcUMsU0FBQUMsUUFBQUMsTUFBQSxFQUFBQyxjQUFBLFFBQUFDLElBQUEsR0FBQUMsTUFBQSxDQUFBRCxJQUFBLENBQUFGLE1BQUEsT0FBQUcsTUFBQSxDQUFBQyxxQkFBQSxRQUFBQyxPQUFBLEdBQUFGLE1BQUEsQ0FBQUMscUJBQUEsQ0FBQUosTUFBQSxHQUFBQyxjQUFBLEtBQUFJLE9BQUEsR0FBQUEsT0FBQSxDQUFBQyxNQUFBLFdBQUFDLEdBQUEsV0FBQUosTUFBQSxDQUFB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