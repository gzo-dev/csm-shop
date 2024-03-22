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
      var ticketList;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _models.db.ticket.findAll({
              order: [['createdAt', 'DESC']]
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
                ticket_id: req.query.id
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiZ2VuZXJhdGVDb2RlIiwibGV0dGVycyIsIm51bWJlcnMiLCJjb2RlIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiX2RlZmF1bHQiLCJhZGRUaWNrZXQiLCJyZXEiLCJyZXMiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJkYiIsInRpY2tldCIsImNyZWF0ZSIsImJvZHkiLCJzbHVnIiwidGltZV9jcmVhdGVkIiwiRGF0ZSIsInRvU3RyaW5nIiwiZGlzY291bnQiLCJwaG90byIsImltYWdlIiwiY29udGVudCIsImRlc2MiLCJhYnJ1cHQiLCJzdGF0dXMiLCJqc29uIiwib2siLCJ0MCIsImNvbnNvbGUiLCJsb2ciLCJzdG9wIiwidXBkYXRlVGlja2V0IiwiX2NhbGxlZTIiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJ1cGRhdGUiLCJ3aGVyZSIsInRpY2tldF9pZCIsImdldExpc3RUaWNrZXQiLCJfY2FsbGVlMyIsInRpY2tldExpc3QiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJmaW5kQWxsIiwib3JkZXIiLCJzZW50IiwiZGF0YSIsImdldExpc3RTdWdnZXN0VGlja2V0IiwiX2NhbGxlZTQiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJsaW1pdCIsInN1Y2Nlc3MiLCJnZXRMaXN0VGlja2V0Q2F0ZWdvcnkiLCJfY2FsbGVlNSIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsInR5cGUiLCJxdWVyeSIsImdldFRpY2tldERldGFpbCIsIl9jYWxsZWU2IiwiX2NhbGxlZTYkIiwiX2NvbnRleHQ2IiwiaWQiLCJkZWxldGVUaWNrZXQiLCJfY2FsbGVlNyIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsImRlc3Ryb3kiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvdGlja2V0L3RpY2tldC5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVsc1wiXG5cblxuZnVuY3Rpb24gZ2VuZXJhdGVDb2RlKCkge1xuICAgIGNvbnN0IGxldHRlcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonO1xuICAgIGNvbnN0IG51bWJlcnMgPSAnMDEyMzQ1Njc4OSc7XG5cbiAgICBsZXQgY29kZSA9ICcnO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgY29kZSArPSBsZXR0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZXR0ZXJzLmxlbmd0aCkpO1xuICAgIH1cblxuICAgIGNvZGUgKz0gJy0nO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgaWYgKGkgPT09IDIpIHtcbiAgICAgICAgICAgIGNvZGUgKz0gJy0nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29kZSArPSBsZXR0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZXR0ZXJzLmxlbmd0aCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29kZSArPSAnLSc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICBpZiAoaSA9PT0gMykge1xuICAgICAgICAgICAgY29kZSArPSAnLSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2RlICs9IG51bWJlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG51bWJlcnMubGVuZ3RoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb2RlICs9ICctJztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgIGNvZGUgKz0gbGV0dGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGV0dGVycy5sZW5ndGgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29kZTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYXN5bmMgYWRkVGlja2V0KHJlcSwgcmVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBkYi50aWNrZXQuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAuLi5yZXEuYm9keSwgc2x1ZzogXCJcIiwgdGltZV9jcmVhdGVkOiBuZXcgRGF0ZSgpLnRvU3RyaW5nKCksIGRpc2NvdW50OiAwLCBwaG90bzogcmVxLmJvZHkuaW1hZ2UsIGNvbnRlbnQ6IHJlcS5ib2R5LmNvbnRlbnQsIGRlc2M6IHJlcS5ib2R5LmRlc2NcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlIH0pXG5cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgb2s6IGZhbHNlIH0pXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIHVwZGF0ZVRpY2tldChyZXEsIHJlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgZGIudGlja2V0LnVwZGF0ZShcbiAgICAgICAgICAgICAgICB7IC4uLnJlcS5ib2R5IH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGlja2V0X2lkOiByZXEuYm9keS50aWNrZXRfaWRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSB9KVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBvazogZmFsc2UgfSlcbiAgICAgICAgfVxuICAgIH1cbiAgICAsXG5cbiAgICBhc3luYyBnZXRMaXN0VGlja2V0KHJlcSwgcmVzKSB7XG4gICAgICAgIGNvbnN0IHRpY2tldExpc3QgPSBhd2FpdCBkYi50aWNrZXQuZmluZEFsbCh7XG4gICAgICAgICAgICBvcmRlcjogW1snY3JlYXRlZEF0JywgJ0RFU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlLCBkYXRhOiB0aWNrZXRMaXN0IH0pXG4gICAgfSxcbiAgICBhc3luYyBnZXRMaXN0U3VnZ2VzdFRpY2tldChyZXEsIHJlcykge1xuICAgICAgICBjb25zdCB0aWNrZXRMaXN0ID0gYXdhaXQgZGIudGlja2V0LmZpbmRBbGwoe1xuICAgICAgICAgICAgbGltaXQ6IDQsXG4gICAgICAgICAgICBvcmRlcjogW1xuICAgICAgICAgICAgICAgIFtcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogdGlja2V0TGlzdCB9KTtcbiAgICB9LFxuICAgIGFzeW5jIGdldExpc3RUaWNrZXRDYXRlZ29yeShyZXEsIHJlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdGlja2V0TGlzdCA9IGF3YWl0IGRiLnRpY2tldC5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiByZXEucXVlcnkudHlwZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3JkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogdGlja2V0TGlzdCB9KVxuXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG9rOiBmYWxzZSB9KVxuICAgICAgICB9XG4gICAgfSxcbiAgICBhc3luYyBnZXRUaWNrZXREZXRhaWwocmVxLCByZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHRpY2tldExpc3QgPSBhd2FpdCBkYi50aWNrZXQuZmluZEFsbCh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgdGlja2V0X2lkOiByZXEucXVlcnkuaWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIGRhdGE6IHRpY2tldExpc3QgfSlcblxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBvazogZmFsc2UgfSlcbiAgICAgICAgfVxuICAgIH1cbiAgICAsXG4gICAgYXN5bmMgZGVsZXRlVGlja2V0KHJlcSwgcmVzKSB7XG4gICAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5ib2R5XG4gICAgICAgIGRiLnRpY2tldC5kZXN0cm95KHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgaWQ6IGlkXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlIH0pXG4gICAgfSxcblxuXG59Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBQUEsT0FBQSxHQUFBQyxPQUFBO0FBQW9DLFNBQUFDLFFBQUFDLE1BQUEsRUFBQUMsY0FBQSxRQUFBQyxJQUFBLEdBQUFDLE1BQUEsQ0FBQUQsSUFBQSxDQUFBRixNQUFBLE9BQUFHLE1BQUEsQ0FBQUMscUJBQUEsUUFBQUMsT0FBQSxHQUFBRixNQUFBLENBQUFDLHFCQUFBLENBQUFKLE1BQUEsR0FBQUMsY0FBQSxLQUFBSSxPQUFBLEdBQUFBLE9BQUEsQ0FBQUMsTUFBQSxXQUFBQyxHQUFBLFdBQUFKLE1BQUEsQ0FBQUssd0JBQUEsQ0FBQVIsTUFBQSxFQUFBTyxHQUFBLEVBQUFFLFVBQUEsT0FBQVAsSUFBQSxDQUFBUSxJQUFBLENBQUFDLEtBQUEsQ0FBQVQsSUFBQSxFQUFBRyxPQUFBLFlBQUFILElBQUE7QUFBQSxTQUFBVSxjQUFBQyxNQUFBLGFBQUFDLENBQUEsTUFBQUEsQ0FBQSxHQUFBQyxTQUFBLENBQUFDLE1BQUEsRUFBQUYsQ0FBQSxVQUFBRyxNQUFBLFdBQUFGLFNBQUEsQ0FBQUQsQ0FBQSxJQUFBQyxTQUFBLENBQUFELENBQUEsUUFBQUEsQ0FBQSxPQUFBZixPQUFBLENBQUFJLE1B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