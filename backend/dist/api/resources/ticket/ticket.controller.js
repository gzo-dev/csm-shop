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
  getListTicket: function getListTicket(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var ticketList;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _models.db.ticket.findAll({
              order: [["createdAt", "DESC"]]
            });
          case 2:
            ticketList = _context3.sent;
            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              data: ticketList
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
      var ticketList;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models.db.ticket.findAll({
              limit: 4,
              order: [["createdAt", "DESC"]]
            });
          case 2:
            ticketList = _context4.sent;
            return _context4.abrupt("return", res.status(200).json({
              success: true,
              data: ticketList
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
      var ticketList;
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
            ticketList = _context5.sent;
            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              data: ticketList
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
      var ticketList;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _models.db.ticket.findAll({
              where: {
                id: req.query.id
              }
            });
          case 3:
            ticketList = _context6.sent;
            return _context6.abrupt("return", res.status(200).json({
              ok: true,
              data: ticketList
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
      var id;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            id = req.body.id;
            _models.db.ticket.destroy({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiZ2VuZXJhdGVDb2RlIiwibGV0dGVycyIsIm51bWJlcnMiLCJjb2RlIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiX2RlZmF1bHQiLCJhZGRUaWNrZXQiLCJyZXEiLCJyZXMiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJkYiIsInRpY2tldCIsImNyZWF0ZSIsImJvZHkiLCJzbHVnIiwidGltZV9jcmVhdGVkIiwiRGF0ZSIsInRvU3RyaW5nIiwiZGlzY291bnQiLCJwaG90byIsImltYWdlIiwiY29udGVudCIsImRlc2MiLCJhYnJ1cHQiLCJzdGF0dXMiLCJqc29uIiwib2siLCJ0MCIsImNvbnNvbGUiLCJsb2ciLCJzdG9wIiwidXBkYXRlVGlja2V0IiwiX2NhbGxlZTIiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJ1cGRhdGUiLCJ3aGVyZSIsImlkIiwiZ2V0TGlzdFRpY2tldCIsIl9jYWxsZWUzIiwidGlja2V0TGlzdCIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsImZpbmRBbGwiLCJvcmRlciIsInNlbnQiLCJkYXRhIiwiZ2V0TGlzdFN1Z2dlc3RUaWNrZXQiLCJfY2FsbGVlNCIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsImxpbWl0Iiwic3VjY2VzcyIsImdldExpc3RUaWNrZXRDYXRlZ29yeSIsIl9jYWxsZWU1IiwiX2NhbGxlZTUkIiwiX2NvbnRleHQ1IiwidHlwZSIsInF1ZXJ5IiwiZ2V0VGlja2V0RGV0YWlsIiwiX2NhbGxlZTYiLCJfY2FsbGVlNiQiLCJfY29udGV4dDYiLCJkZWxldGVUaWNrZXQiLCJfY2FsbGVlNyIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsImRlc3Ryb3kiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvdGlja2V0L3RpY2tldC5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVsc1wiO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZUNvZGUoKSB7XG4gIGNvbnN0IGxldHRlcnMgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXCI7XG4gIGNvbnN0IG51bWJlcnMgPSBcIjAxMjM0NTY3ODlcIjtcblxuICBsZXQgY29kZSA9IFwiXCI7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICBjb2RlICs9IGxldHRlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxldHRlcnMubGVuZ3RoKSk7XG4gIH1cblxuICBjb2RlICs9IFwiLVwiO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgaWYgKGkgPT09IDIpIHtcbiAgICAgIGNvZGUgKz0gXCItXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvZGUgKz0gbGV0dGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGV0dGVycy5sZW5ndGgpKTtcbiAgICB9XG4gIH1cblxuICBjb2RlICs9IFwiLVwiO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgaWYgKGkgPT09IDMpIHtcbiAgICAgIGNvZGUgKz0gXCItXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvZGUgKz0gbnVtYmVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbnVtYmVycy5sZW5ndGgpKTtcbiAgICB9XG4gIH1cblxuICBjb2RlICs9IFwiLVwiO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgY29kZSArPSBsZXR0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZXR0ZXJzLmxlbmd0aCkpO1xuICB9XG5cbiAgcmV0dXJuIGNvZGU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYXN5bmMgYWRkVGlja2V0KHJlcSwgcmVzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGRiLnRpY2tldC5jcmVhdGUoe1xuICAgICAgICAuLi5yZXEuYm9keSxcbiAgICAgICAgc2x1ZzogXCJcIixcbiAgICAgICAgdGltZV9jcmVhdGVkOiBuZXcgRGF0ZSgpLnRvU3RyaW5nKCksXG4gICAgICAgIGRpc2NvdW50OiAwLFxuICAgICAgICBwaG90bzogcmVxLmJvZHkuaW1hZ2UsXG4gICAgICAgIGNvbnRlbnQ6IHJlcS5ib2R5LmNvbnRlbnQsXG4gICAgICAgIGRlc2M6IHJlcS5ib2R5LmRlc2MsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG9rOiBmYWxzZSB9KTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIHVwZGF0ZVRpY2tldChyZXEsIHJlcykge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBkYi50aWNrZXQudXBkYXRlKFxuICAgICAgICB7IC4uLnJlcS5ib2R5IH0sXG4gICAgICAgIHtcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgaWQ6IHJlcS5ib2R5LmlkLFxuICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgb2s6IGZhbHNlIH0pO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0TGlzdFRpY2tldChyZXEsIHJlcykge1xuICAgIGNvbnN0IHRpY2tldExpc3QgPSBhd2FpdCBkYi50aWNrZXQuZmluZEFsbCh7XG4gICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgIH0pO1xuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlLCBkYXRhOiB0aWNrZXRMaXN0IH0pO1xuICB9LFxuICBhc3luYyBnZXRMaXN0U3VnZ2VzdFRpY2tldChyZXEsIHJlcykge1xuICAgIGNvbnN0IHRpY2tldExpc3QgPSBhd2FpdCBkYi50aWNrZXQuZmluZEFsbCh7XG4gICAgICBsaW1pdDogNCxcbiAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogdGlja2V0TGlzdCB9KTtcbiAgfSxcbiAgYXN5bmMgZ2V0TGlzdFRpY2tldENhdGVnb3J5KHJlcSwgcmVzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHRpY2tldExpc3QgPSBhd2FpdCBkYi50aWNrZXQuZmluZEFsbCh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgdHlwZTogcmVxLnF1ZXJ5LnR5cGUsXG4gICAgICAgIH0sXG4gICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlLCBkYXRhOiB0aWNrZXRMaXN0IH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBvazogZmFsc2UgfSk7XG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRUaWNrZXREZXRhaWwocmVxLCByZXMpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdGlja2V0TGlzdCA9IGF3YWl0IGRiLnRpY2tldC5maW5kQWxsKHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICBpZDogcmVxLnF1ZXJ5LmlkLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogdGlja2V0TGlzdCB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgb2s6IGZhbHNlIH0pO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgZGVsZXRlVGlja2V0KHJlcSwgcmVzKSB7XG4gICAgY29uc3QgeyBpZCB9ID0gcmVxLmJvZHk7XG4gICAgZGIudGlja2V0LmRlc3Ryb3koe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSB9KTtcbiAgfSxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxPQUFBLEdBQUFDLE9BQUE7QUFBcUMsU0FBQUMsUUFBQUMsTUFBQSxFQUFBQyxjQUFBLFFBQUFDLElBQUEsR0FBQUMsTUFBQSxDQUFBRCxJQUFBLENBQUFGLE1BQUEsT0FBQUcsTUFBQSxDQUFB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