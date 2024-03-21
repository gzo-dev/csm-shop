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
  addTicket: function addTicket(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _models.db.ticket.create(_objectSpread(_objectSpread({}, req.body), {}, {
              slug: "",
              time_created: new Date().toString(),
              discount: 0,
              photo: req.body.image,
              tour_id: generateCode(),
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
  updateTicket: function updateTicket(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _models.db.ticket.update(_objectSpread({}, req.body), {
              where: {
                ticket_id: req.body.ticket_id
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
  getListTicket: function getListTicket(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var tourList;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _models.db.ticket.findAll({
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
  getListSuggestTicket: function getListSuggestTicket(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var tourList;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models.db.ticket.findAll({
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
  getListTicketCategory: function getListTicketCategory(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var tourList;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _models.db.ticket.findAll({
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
  getTicketDetail: function getTicketDetail(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var tourList;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _models.db.ticket.findAll({
              where: {
                tour_id: req.query.id
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
  deleteTicket: function deleteTicket(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var tour_id;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            tour_id = req.body.tour_id;
            _models.db.ticket.destroy({
              where: {
                tour_id: tour_id
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiZ2VuZXJhdGVDb2RlIiwibGV0dGVycyIsIm51bWJlcnMiLCJjb2RlIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiX2RlZmF1bHQiLCJhZGRUaWNrZXQiLCJyZXEiLCJyZXMiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJkYiIsInRpY2tldCIsImNyZWF0ZSIsImJvZHkiLCJzbHVnIiwidGltZV9jcmVhdGVkIiwiRGF0ZSIsInRvU3RyaW5nIiwiZGlzY291bnQiLCJwaG90byIsImltYWdlIiwidG91cl9pZCIsImNvbnRlbnQiLCJkZXNjIiwiYWJydXB0Iiwic3RhdHVzIiwianNvbiIsIm9rIiwidDAiLCJjb25zb2xlIiwibG9nIiwic3RvcCIsInVwZGF0ZVRpY2tldCIsIl9jYWxsZWUyIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwidXBkYXRlIiwid2hlcmUiLCJ0aWNrZXRfaWQiLCJnZXRMaXN0VGlja2V0IiwiX2NhbGxlZTMiLCJ0b3VyTGlzdCIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsImZpbmRBbGwiLCJvcmRlciIsInNlbnQiLCJkYXRhIiwiZ2V0TGlzdFN1Z2dlc3RUaWNrZXQiLCJfY2FsbGVlNCIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsImxpbWl0Iiwic3VjY2VzcyIsImdldExpc3RUaWNrZXRDYXRlZ29yeSIsIl9jYWxsZWU1IiwiX2NhbGxlZTUkIiwiX2NvbnRleHQ1IiwidHlwZSIsInF1ZXJ5IiwiZ2V0VGlja2V0RGV0YWlsIiwiX2NhbGxlZTYiLCJfY2FsbGVlNiQiLCJfY29udGV4dDYiLCJpZCIsImRlbGV0ZVRpY2tldCIsIl9jYWxsZWU3IiwiX2NhbGxlZTckIiwiX2NvbnRleHQ3IiwiZGVzdHJveSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy90aWNrZXQvdGlja2V0LmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzXCJcblxuXG5mdW5jdGlvbiBnZW5lcmF0ZUNvZGUoKSB7XG4gICAgY29uc3QgbGV0dGVycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWic7XG4gICAgY29uc3QgbnVtYmVycyA9ICcwMTIzNDU2Nzg5JztcblxuICAgIGxldCBjb2RlID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBjb2RlICs9IGxldHRlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxldHRlcnMubGVuZ3RoKSk7XG4gICAgfVxuXG4gICAgY29kZSArPSAnLSc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICBpZiAoaSA9PT0gMikge1xuICAgICAgICAgICAgY29kZSArPSAnLSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2RlICs9IGxldHRlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxldHRlcnMubGVuZ3RoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb2RlICs9ICctJztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgIGlmIChpID09PSAzKSB7XG4gICAgICAgICAgICBjb2RlICs9ICctJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvZGUgKz0gbnVtYmVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbnVtYmVycy5sZW5ndGgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvZGUgKz0gJy0nO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgY29kZSArPSBsZXR0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZXR0ZXJzLmxlbmd0aCkpO1xuICAgIH1cblxuICAgIHJldHVybiBjb2RlO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhc3luYyBhZGRUaWNrZXQocmVxLCByZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IGRiLnRpY2tldC5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIC4uLnJlcS5ib2R5LCBzbHVnOiBcIlwiLCB0aW1lX2NyZWF0ZWQ6IG5ldyBEYXRlKCkudG9TdHJpbmcoKSwgZGlzY291bnQ6IDAsIHBob3RvOiByZXEuYm9keS5pbWFnZSwgdG91cl9pZDogZ2VuZXJhdGVDb2RlKCksIGNvbnRlbnQ6IHJlcS5ib2R5LmNvbnRlbnQsIGRlc2M6IHJlcS5ib2R5LmRlc2NcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlIH0pXG5cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgb2s6IGZhbHNlIH0pXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIHVwZGF0ZVRpY2tldChyZXEsIHJlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgZGIudGlja2V0LnVwZGF0ZShcbiAgICAgICAgICAgICAgICB7IC4uLnJlcS5ib2R5IH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGlja2V0X2lkOiByZXEuYm9keS50aWNrZXRfaWRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSB9KVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBvazogZmFsc2UgfSlcbiAgICAgICAgfVxuICAgIH1cbiAgICAsXG5cbiAgICBhc3luYyBnZXRMaXN0VGlja2V0KHJlcSwgcmVzKSB7XG4gICAgICAgIGNvbnN0IHRvdXJMaXN0ID0gYXdhaXQgZGIudGlja2V0LmZpbmRBbGwoe1xuICAgICAgICAgICAgb3JkZXI6IFtbJ2NyZWF0ZWRBdCcsICdERVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogdG91ckxpc3QgfSlcbiAgICB9LFxuICAgIGFzeW5jIGdldExpc3RTdWdnZXN0VGlja2V0KHJlcSwgcmVzKSB7XG4gICAgICAgIGNvbnN0IHRvdXJMaXN0ID0gYXdhaXQgZGIudGlja2V0LmZpbmRBbGwoe1xuICAgICAgICAgICAgbGltaXQ6IDQsXG4gICAgICAgICAgICBvcmRlcjogW1xuICAgICAgICAgICAgICAgIFtcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogdG91ckxpc3QgfSk7XG4gICAgfSxcbiAgICBhc3luYyBnZXRMaXN0VGlja2V0Q2F0ZWdvcnkocmVxLCByZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHRvdXJMaXN0ID0gYXdhaXQgZGIudGlja2V0LmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHJlcS5xdWVyeS50eXBlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcmRlcjogW1xuICAgICAgICAgICAgICAgICAgICBbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlLCBkYXRhOiB0b3VyTGlzdCB9KVxuXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG9rOiBmYWxzZSB9KVxuICAgICAgICB9XG4gICAgfSxcbiAgICBhc3luYyBnZXRUaWNrZXREZXRhaWwocmVxLCByZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHRvdXJMaXN0ID0gYXdhaXQgZGIudGlja2V0LmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgIHRvdXJfaWQ6IHJlcS5xdWVyeS5pZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogdG91ckxpc3QgfSlcblxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBvazogZmFsc2UgfSlcbiAgICAgICAgfVxuICAgIH1cbiAgICAsXG4gICAgYXN5bmMgZGVsZXRlVGlja2V0KHJlcSwgcmVzKSB7XG4gICAgICAgIGNvbnN0IHsgdG91cl9pZCB9ID0gcmVxLmJvZHlcbiAgICAgICAgZGIudGlja2V0LmRlc3Ryb3koe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICB0b3VyX2lkOiB0b3VyX2lkXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlIH0pXG4gICAgfSxcblxuXG59Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBQUEsT0FBQSxHQUFBQyxPQUFBO0FBQW9DLFNBQUFDLFFBQUFDLE1BQUEsRUFBQUMsY0FBQSxRQUFBQyxJQUFBLEdBQUFDLE1BQUEsQ0FBQUQsSUFBQSxDQUFBRixNQUFBLE9BQUFHLE1BQUEsQ0FBQUMscUJBQUEsUUFBQUMsT0FBQSxHQUFBRixNQUFBLENBQUFDLHFCQUFBLENBQUFKLE1BQUEsR0FBQUMsY0FBQSxLQUFBSSxPQUFBLEdBQUFBLE9BQUEsQ0FBQUMsTUFBQSxXQUFBQyxHQUFBLFdBQUFKLE1BQUEsQ0FBQUssd0JBQUEsQ0FBQVIsTUFBQSxFQUFBTyxHQUFBLEVBQUFFLFVBQUEsT0FBQVAsSUFBQSxDQUFBUSxJQUFBLENBQUFDLEtBQUEsQ0FBQVQsSUFBQSxFQUFBRyxPQUFBLFlBQUFILElBQUE7QUFBQSxTQUFBVSxjQUFBQyxNQUFBLGFBQUFDLENBQUEsTUFBQUEsQ0FBQSxHQUFBQyxTQUFBLENBQUFDLE1BQUEsRUFBQUYsQ0FBQSxVQUFBRyxNQUFBLFdBQUFGLFNBQUEsQ0FBQUQsQ0FBQSxJQUFBQyxTQUFBLENBQUFELENBQUEs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