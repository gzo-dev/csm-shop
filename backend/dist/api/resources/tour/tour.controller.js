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
              order: [['createdAt', 'DESC']],
              attributes: {
                exclude: ['content'] // Thay 'field1', 'field2' bằng các trường bạn muốn loại bỏ
              }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiZ2VuZXJhdGVDb2RlIiwibGV0dGVycyIsIm51bWJlcnMiLCJjb2RlIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiX2RlZmF1bHQiLCJhZGRUb3VyIiwicmVxIiwicmVzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwiZGIiLCJ0b3VyIiwiY3JlYXRlIiwiYm9keSIsInNsdWciLCJ0aW1lX2NyZWF0ZWQiLCJEYXRlIiwidG9TdHJpbmciLCJkaXNjb3VudCIsInBob3RvIiwiaW1hZ2UiLCJjb250ZW50IiwiZGVzYyIsImFicnVwdCIsInN0YXR1cyIsImpzb24iLCJvayIsInQwIiwiY29uc29sZSIsImxvZyIsInN0b3AiLCJ1cGRhdGVUb3VyIiwiX2NhbGxlZTIiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJ1cGRhdGUiLCJ0b3VyX2lkIiwid2hlcmUiLCJpZCIsImdldExpc3RUb3VyIiwiX2NhbGxlZTMiLCJ0b3VyTGlzdCIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsImZpbmRBbGwiLCJvcmRlciIsImF0dHJpYnV0ZXMiLCJleGNsdWRlIiwic2VudCIsImRhdGEiLCJnZXRMaXN0U3VnZ2VzdFRvdXIiLCJfY2FsbGVlNCIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsImxpbWl0Iiwic3VjY2VzcyIsImdldExpc3RUb3VyQ2F0ZWdvcnkiLCJfY2FsbGVlNSIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsInR5cGUiLCJxdWVyeSIsImdldFRvdXJEZXRhaWwiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImRlbGV0ZVRvdXIiLCJfY2FsbGVlNyIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsImRlc3Ryb3kiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvdG91ci90b3VyLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzXCJcclxuXHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZUNvZGUoKSB7XHJcbiAgICBjb25zdCBsZXR0ZXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJztcclxuICAgIGNvbnN0IG51bWJlcnMgPSAnMDEyMzQ1Njc4OSc7XHJcblxyXG4gICAgbGV0IGNvZGUgPSAnJztcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgIGNvZGUgKz0gbGV0dGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGV0dGVycy5sZW5ndGgpKTtcclxuICAgIH1cclxuXHJcbiAgICBjb2RlICs9ICctJztcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgIGlmIChpID09PSAyKSB7XHJcbiAgICAgICAgICAgIGNvZGUgKz0gJy0nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvZGUgKz0gbGV0dGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGV0dGVycy5sZW5ndGgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29kZSArPSAnLSc7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICBpZiAoaSA9PT0gMykge1xyXG4gICAgICAgICAgICBjb2RlICs9ICctJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb2RlICs9IG51bWJlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG51bWJlcnMubGVuZ3RoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvZGUgKz0gJy0nO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgY29kZSArPSBsZXR0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZXR0ZXJzLmxlbmd0aCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb2RlO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgYXN5bmMgYWRkVG91cihyZXEsIHJlcykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGRiLnRvdXIuY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgIC4uLnJlcS5ib2R5LCBzbHVnOiBcIlwiLCB0aW1lX2NyZWF0ZWQ6IG5ldyBEYXRlKCkudG9TdHJpbmcoKSwgZGlzY291bnQ6IDAsIHBob3RvOiByZXEuYm9keS5pbWFnZSwgY29udGVudDogcmVxLmJvZHkuY29udGVudCwgZGVzYzogcmVxLmJvZHkuZGVzY1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUgfSlcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG9rOiBmYWxzZSB9KVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyB1cGRhdGVUb3VyKHJlcSwgcmVzKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgZGIudG91ci51cGRhdGUoXHJcbiAgICAgICAgICAgICAgICB7IC4uLnJlcS5ib2R5LCB0b3VyX2lkOiByZXEuYm9keS50b3VyX2lkIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcS5ib2R5LmlkXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSB9KVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBvazogZmFsc2UgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAsXHJcblxyXG4gICAgYXN5bmMgZ2V0TGlzdFRvdXIocmVxLCByZXMpIHtcclxuICAgICAgICBjb25zdCB0b3VyTGlzdCA9IGF3YWl0IGRiLnRvdXIuZmluZEFsbCh7XHJcbiAgICAgICAgICAgIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSxcclxuICAgICAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgICAgICAgZXhjbHVkZTogWydjb250ZW50J10gLy8gVGhheSAnZmllbGQxJywgJ2ZpZWxkMicgYuG6sW5nIGPDoWMgdHLGsOG7nW5nIGLhuqFuIG114buRbiBsb+G6oWkgYuG7j1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogdG91ckxpc3QgfSlcclxuICAgIH0sXHJcbiAgICBhc3luYyBnZXRMaXN0U3VnZ2VzdFRvdXIocmVxLCByZXMpIHtcclxuICAgICAgICBjb25zdCB0b3VyTGlzdCA9IGF3YWl0IGRiLnRvdXIuZmluZEFsbCh7XHJcbiAgICAgICAgICAgIGxpbWl0OiA0LFxyXG4gICAgICAgICAgICBvcmRlcjogW1xyXG4gICAgICAgICAgICAgICAgW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgICAgICAgICBleGNsdWRlOiBbJ2NvbnRlbnQnXSAvLyBUaGF5ICdmaWVsZDEnLCAnZmllbGQyJyBi4bqxbmcgY8OhYyB0csaw4budbmcgYuG6oW4gbXXhu5FuIGxv4bqhaSBi4buPXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHRvdXJMaXN0IH0pO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIGdldExpc3RUb3VyQ2F0ZWdvcnkocmVxLCByZXMpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB0b3VyTGlzdCA9IGF3YWl0IGRiLnRvdXIuZmluZEFsbCh7XHJcbiAgICAgICAgICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHJlcS5xdWVyeS50eXBlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb3JkZXI6IFtcclxuICAgICAgICAgICAgICAgICAgICBbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlLCBkYXRhOiB0b3VyTGlzdCB9KVxyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgb2s6IGZhbHNlIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGdldFRvdXJEZXRhaWwocmVxLCByZXMpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB0b3VyTGlzdCA9IGF3YWl0IGRiLnRvdXIuZmluZEFsbCh7XHJcbiAgICAgICAgICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiByZXEucXVlcnkuaWRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIGRhdGE6IHRvdXJMaXN0IH0pXHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBvazogZmFsc2UgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAsXHJcbiAgICBhc3luYyBkZWxldGVUb3VyKHJlcSwgcmVzKSB7XHJcbiAgICAgICAgY29uc3QgeyBpZCB9ID0gcmVxLmJvZHlcclxuICAgICAgICBkYi50b3VyLmRlc3Ryb3koe1xyXG4gICAgICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICAgICAgaWQ6IGlkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlIH0pXHJcbiAgICB9LFxy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