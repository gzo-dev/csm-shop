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
  var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var numbers = '0123456789';
  var code = '';
  for (var i = 0; i < 3; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  code += '-';
  for (var _i = 0; _i < 5; _i++) {
    if (_i === 2) {
      code += '-';
    } else {
      code += letters.charAt(Math.floor(Math.random() * letters.length));
    }
  }
  code += '-';
  for (var _i2 = 0; _i2 < 5; _i2++) {
    if (_i2 === 3) {
      code += '-';
    } else {
      code += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
  }
  code += '-';
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
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _models.db.tour.update(_objectSpread(_objectSpread({}, req.body), {}, {
              tour_id: req.body.tour_id
            }), {
              where: {
                id: req.body.id
              }
            });
          case 3:
            return _context2.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(500).json({
              ok: false
            }));
          case 10:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 6]]);
    }))();
  },
  getListTour: function getListTour(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var tourList;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _models.db.tour.findAll({
              order: [['createdAt', 'DESC']]
            });
          case 2:
            tourList = _context3.sent;
            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              data: tourList
            }));
          case 4:
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
              order: [["createdAt", "DESC"]]
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
  deleteTour: function deleteTour(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var id;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            id = req.body.id;
            _models.db.tour.destroy({
              where: {
                id: id
              }
            });
            return _context7.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 3:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiZ2VuZXJhdGVDb2RlIiwibGV0dGVycyIsIm51bWJlcnMiLCJjb2RlIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiX2RlZmF1bHQiLCJhZGRUb3VyIiwicmVxIiwicmVzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwiZGIiLCJ0b3VyIiwiY3JlYXRlIiwiYm9keSIsInNsdWciLCJ0aW1lX2NyZWF0ZWQiLCJEYXRlIiwidG9TdHJpbmciLCJkaXNjb3VudCIsInBob3RvIiwiaW1hZ2UiLCJjb250ZW50IiwiZGVzYyIsImFicnVwdCIsInN0YXR1cyIsImpzb24iLCJvayIsInQwIiwiY29uc29sZSIsImxvZyIsInN0b3AiLCJ1cGRhdGVUb3VyIiwiX2NhbGxlZTIiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJ1cGRhdGUiLCJ0b3VyX2lkIiwid2hlcmUiLCJpZCIsImdldExpc3RUb3VyIiwiX2NhbGxlZTMiLCJ0b3VyTGlzdCIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsImZpbmRBbGwiLCJvcmRlciIsInNlbnQiLCJkYXRhIiwiZ2V0TGlzdFN1Z2dlc3RUb3VyIiwiX2NhbGxlZTQiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJsaW1pdCIsInN1Y2Nlc3MiLCJnZXRMaXN0VG91ckNhdGVnb3J5IiwiX2NhbGxlZTUiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJ0eXBlIiwicXVlcnkiLCJnZXRUb3VyRGV0YWlsIiwiX2NhbGxlZTYiLCJfY2FsbGVlNiQiLCJfY29udGV4dDYiLCJkZWxldGVUb3VyIiwiX2NhbGxlZTciLCJfY2FsbGVlNyQiLCJfY29udGV4dDciLCJkZXN0cm95IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL3RvdXIvdG91ci5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVsc1wiXG5cblxuZnVuY3Rpb24gZ2VuZXJhdGVDb2RlKCkge1xuICAgIGNvbnN0IGxldHRlcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonO1xuICAgIGNvbnN0IG51bWJlcnMgPSAnMDEyMzQ1Njc4OSc7XG5cbiAgICBsZXQgY29kZSA9ICcnO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgY29kZSArPSBsZXR0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZXR0ZXJzLmxlbmd0aCkpO1xuICAgIH1cblxuICAgIGNvZGUgKz0gJy0nO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgaWYgKGkgPT09IDIpIHtcbiAgICAgICAgICAgIGNvZGUgKz0gJy0nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29kZSArPSBsZXR0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZXR0ZXJzLmxlbmd0aCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29kZSArPSAnLSc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICBpZiAoaSA9PT0gMykge1xuICAgICAgICAgICAgY29kZSArPSAnLSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2RlICs9IG51bWJlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG51bWJlcnMubGVuZ3RoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb2RlICs9ICctJztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgIGNvZGUgKz0gbGV0dGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGV0dGVycy5sZW5ndGgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29kZTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYXN5bmMgYWRkVG91cihyZXEsIHJlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgZGIudG91ci5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIC4uLnJlcS5ib2R5LCBzbHVnOiBcIlwiLCB0aW1lX2NyZWF0ZWQ6IG5ldyBEYXRlKCkudG9TdHJpbmcoKSwgZGlzY291bnQ6IDAsIHBob3RvOiByZXEuYm9keS5pbWFnZSwgY29udGVudDogcmVxLmJvZHkuY29udGVudCwgZGVzYzogcmVxLmJvZHkuZGVzY1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUgfSlcblxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBvazogZmFsc2UgfSlcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYXN5bmMgdXBkYXRlVG91cihyZXEsIHJlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgZGIudG91ci51cGRhdGUoXG4gICAgICAgICAgICAgICAgeyAuLi5yZXEuYm9keSwgdG91cl9pZDogcmVxLmJvZHkudG91cl9pZCB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiByZXEuYm9keS5pZFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlIH0pXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG9rOiBmYWxzZSB9KVxuICAgICAgICB9XG4gICAgfVxuICAgICxcblxuICAgIGFzeW5jIGdldExpc3RUb3VyKHJlcSwgcmVzKSB7XG4gICAgICAgIGNvbnN0IHRvdXJMaXN0ID0gYXdhaXQgZGIudG91ci5maW5kQWxsKHtcbiAgICAgICAgICAgIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIGRhdGE6IHRvdXJMaXN0IH0pXG4gICAgfSxcbiAgICBhc3luYyBnZXRMaXN0U3VnZ2VzdFRvdXIocmVxLCByZXMpIHtcbiAgICAgICAgY29uc3QgdG91ckxpc3QgPSBhd2FpdCBkYi50b3VyLmZpbmRBbGwoe1xuICAgICAgICAgICAgbGltaXQ6IDQsXG4gICAgICAgICAgICBvcmRlcjogW1xuICAgICAgICAgICAgICAgIFtcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogdG91ckxpc3QgfSk7XG4gICAgfSxcbiAgICBhc3luYyBnZXRMaXN0VG91ckNhdGVnb3J5KHJlcSwgcmVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB0b3VyTGlzdCA9IGF3YWl0IGRiLnRvdXIuZmluZEFsbCh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogcmVxLnF1ZXJ5LnR5cGVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9yZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFtcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIGRhdGE6IHRvdXJMaXN0IH0pXG5cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgb2s6IGZhbHNlIH0pXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIGdldFRvdXJEZXRhaWwocmVxLCByZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHRvdXJMaXN0ID0gYXdhaXQgZGIudG91ci5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICBpZDogcmVxLnF1ZXJ5LmlkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlLCBkYXRhOiB0b3VyTGlzdCB9KVxuXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG9rOiBmYWxzZSB9KVxuICAgICAgICB9XG4gICAgfVxuICAgICxcbiAgICBhc3luYyBkZWxldGVUb3VyKHJlcSwgcmVzKSB7XG4gICAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5ib2R5XG4gICAgICAgIGRiLnRvdXIuZGVzdHJveSh7XG4gICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgIGlkOiBpZFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSB9KVxuICAgIH0sXG5cblxufSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUFBLE9BQUEsR0FBQUMsT0FBQTtBQUFvQyxTQUFBQyxRQUFBQyxNQUFBLEVBQUFDLGNBQUEsUUFBQUMsSUFBQSxHQUFBQyxNQUFBLENBQUFELElBQUEsQ0FBQUYsTUFBQSxPQUFBRyxNQUFBLENBQUFDLHFCQUFBLFFBQUFDLE9BQUEsR0FBQUYsTUFBQSxDQUFBQyxxQkFBQSxDQUFBSixNQUFBLEdBQUFDLGNBQUEsS0FBQUksT0FBQSxHQUFBQSxPQUFBLENBQUFDLE1BQUEsV0FBQUMsR0FBQSxXQUFBSixNQUFBLENBQUFLLHdCQUFBLENBQUFSLE1BQUEsRUFBQU8sR0FBQSxFQUFBRSxVQUFBLE9BQUFQLElBQUEsQ0FBQVEsSUFBQSxDQUFBQyxLQUFBLENBQUFULElBQUEsRUFBQUcsT0FBQSxZQUFBSCxJQUFBO0FBQUEsU0FBQVUsY0FBQUMsTUFBQSxhQUFBQyxDQUFBLE1BQUFBLENBQUEsR0FBQUMsU0FBQSxDQUFBQyxNQUFBLEVBQUFGLENBQUEsVUFBQUcsTUFBQSxXQUFBRixTQUFBLENBQUFELENBQUEsSUFBQUMsU0FBQSxDQUFBRCxDQUFBLFFBQUFBLENBQUEsT0FBQWYsT0FBQSxDQUFBSSxNQUFBLENBQUFjLE1BQUEsT0FBQUMsT0FBQSxXQUFBQyxHQUFBLFFBQUFDLGdCQUFBLGFBQUFQLE1BQUEsRUFB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