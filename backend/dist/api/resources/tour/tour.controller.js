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
              order: [["createdAt", "DESC"]],
              attributes: {
                exclude: ['content'] // Thay 'field1', 'field2' bằng các trường bạn muốn loại bỏ
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiZ2VuZXJhdGVDb2RlIiwibGV0dGVycyIsIm51bWJlcnMiLCJjb2RlIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiX2RlZmF1bHQiLCJhZGRUb3VyIiwicmVxIiwicmVzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwiZGIiLCJ0b3VyIiwiY3JlYXRlIiwiYm9keSIsInNsdWciLCJ0aW1lX2NyZWF0ZWQiLCJEYXRlIiwidG9TdHJpbmciLCJkaXNjb3VudCIsInBob3RvIiwiaW1hZ2UiLCJjb250ZW50IiwiZGVzYyIsImFicnVwdCIsInN0YXR1cyIsImpzb24iLCJvayIsInQwIiwiY29uc29sZSIsImxvZyIsInN0b3AiLCJ1cGRhdGVUb3VyIiwiX2NhbGxlZTIiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJ1cGRhdGUiLCJ0b3VyX2lkIiwid2hlcmUiLCJpZCIsImdldExpc3RUb3VyIiwiX2NhbGxlZTMiLCJ0b3VyTGlzdCIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsImZpbmRBbGwiLCJvcmRlciIsInNlbnQiLCJkYXRhIiwiZ2V0TGlzdFN1Z2dlc3RUb3VyIiwiX2NhbGxlZTQiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJsaW1pdCIsImF0dHJpYnV0ZXMiLCJleGNsdWRlIiwic3VjY2VzcyIsImdldExpc3RUb3VyQ2F0ZWdvcnkiLCJfY2FsbGVlNSIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsInR5cGUiLCJxdWVyeSIsImdldFRvdXJEZXRhaWwiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImRlbGV0ZVRvdXIiLCJfY2FsbGVlNyIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsImRlc3Ryb3kiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvdG91ci90b3VyLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzXCJcblxuXG5mdW5jdGlvbiBnZW5lcmF0ZUNvZGUoKSB7XG4gICAgY29uc3QgbGV0dGVycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWic7XG4gICAgY29uc3QgbnVtYmVycyA9ICcwMTIzNDU2Nzg5JztcblxuICAgIGxldCBjb2RlID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBjb2RlICs9IGxldHRlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxldHRlcnMubGVuZ3RoKSk7XG4gICAgfVxuXG4gICAgY29kZSArPSAnLSc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICBpZiAoaSA9PT0gMikge1xuICAgICAgICAgICAgY29kZSArPSAnLSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2RlICs9IGxldHRlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxldHRlcnMubGVuZ3RoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb2RlICs9ICctJztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgIGlmIChpID09PSAzKSB7XG4gICAgICAgICAgICBjb2RlICs9ICctJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvZGUgKz0gbnVtYmVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbnVtYmVycy5sZW5ndGgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvZGUgKz0gJy0nO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgY29kZSArPSBsZXR0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZXR0ZXJzLmxlbmd0aCkpO1xuICAgIH1cblxuICAgIHJldHVybiBjb2RlO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhc3luYyBhZGRUb3VyKHJlcSwgcmVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBkYi50b3VyLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgLi4ucmVxLmJvZHksIHNsdWc6IFwiXCIsIHRpbWVfY3JlYXRlZDogbmV3IERhdGUoKS50b1N0cmluZygpLCBkaXNjb3VudDogMCwgcGhvdG86IHJlcS5ib2R5LmltYWdlLCBjb250ZW50OiByZXEuYm9keS5jb250ZW50LCBkZXNjOiByZXEuYm9keS5kZXNjXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSB9KVxuXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG9rOiBmYWxzZSB9KVxuICAgICAgICB9XG4gICAgfSxcbiAgICBhc3luYyB1cGRhdGVUb3VyKHJlcSwgcmVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBkYi50b3VyLnVwZGF0ZShcbiAgICAgICAgICAgICAgICB7IC4uLnJlcS5ib2R5LCB0b3VyX2lkOiByZXEuYm9keS50b3VyX2lkIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcS5ib2R5LmlkXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUgfSlcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgb2s6IGZhbHNlIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgLFxuXG4gICAgYXN5bmMgZ2V0TGlzdFRvdXIocmVxLCByZXMpIHtcbiAgICAgICAgY29uc3QgdG91ckxpc3QgPSBhd2FpdCBkYi50b3VyLmZpbmRBbGwoe1xuICAgICAgICAgICAgb3JkZXI6IFtbJ2NyZWF0ZWRBdCcsICdERVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogdG91ckxpc3QgfSlcbiAgICB9LFxuICAgIGFzeW5jIGdldExpc3RTdWdnZXN0VG91cihyZXEsIHJlcykge1xuICAgICAgICBjb25zdCB0b3VyTGlzdCA9IGF3YWl0IGRiLnRvdXIuZmluZEFsbCh7XG4gICAgICAgICAgICBsaW1pdDogNCxcbiAgICAgICAgICAgIG9yZGVyOiBbXG4gICAgICAgICAgICAgICAgW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICBleGNsdWRlOiBbJ2NvbnRlbnQnXSAvLyBUaGF5ICdmaWVsZDEnLCAnZmllbGQyJyBi4bqxbmcgY8OhYyB0csaw4budbmcgYuG6oW4gbXXhu5FuIGxv4bqhaSBi4buPXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHRvdXJMaXN0IH0pO1xuICAgIH0sXG4gICAgYXN5bmMgZ2V0TGlzdFRvdXJDYXRlZ29yeShyZXEsIHJlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdG91ckxpc3QgPSBhd2FpdCBkYi50b3VyLmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHJlcS5xdWVyeS50eXBlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcmRlcjogW1xuICAgICAgICAgICAgICAgICAgICBbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlLCBkYXRhOiB0b3VyTGlzdCB9KVxuXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG9rOiBmYWxzZSB9KVxuICAgICAgICB9XG4gICAgfSxcbiAgICBhc3luYyBnZXRUb3VyRGV0YWlsKHJlcSwgcmVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB0b3VyTGlzdCA9IGF3YWl0IGRiLnRvdXIuZmluZEFsbCh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcS5xdWVyeS5pZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogdG91ckxpc3QgfSlcblxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBvazogZmFsc2UgfSlcbiAgICAgICAgfVxuICAgIH1cbiAgICAsXG4gICAgYXN5bmMgZGVsZXRlVG91cihyZXEsIHJlcykge1xuICAgICAgICBjb25zdCB7IGlkIH0gPSByZXEuYm9keVxuICAgICAgICBkYi50b3VyLmRlc3Ryb3koe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICBpZDogaWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUgfSlcbiAgICB9LFxuXG5cbn0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxPQUFBLEdBQUFDLE9BQUE7QUFBb0MsU0FBQUMsUUFBQUMsTUFBQSxFQUFBQyxjQUFBLFFBQUFDLElBQUEsR0FBQUMsTUFBQSxDQUFBRCxJQUFBLENBQUFGLE1BQUEsT0FBQUcsTUFBQSxDQUFBQyxxQkFBQSxRQUFBQyxPQUFBLEdBQUFGLE1BQUEsQ0FBQUMscUJBQUEsQ0FBQUosTUFBQSxHQUFBQyxjQUFBLEtBQUFJLE9BQUEsR0FBQUEsT0FBQSxDQUFBQyxNQUFBLFdBQUFDLEdBQUEsV0FBQUosTUFBQSxDQUFBSyx3QkFBQSxDQUFBUixNQUFBLEVBQUFPLEdBQUEsRUFBQUUsVUFBQSxPQUFBUCxJQUFBLENBQUFRLElBQUEsQ0FBQUMsS0FBQSxDQUFBVCxJQUFBLEVBQUFHLE9BQUEsWUFBQUgsSUFBQTtBQUFBLFNBQUFVLGNBQUFDLE1BQUEsYUFBQUMsQ0FBQSxNQUFBQSxDQUFBLEdB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