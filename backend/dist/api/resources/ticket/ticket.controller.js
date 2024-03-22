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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiZ2VuZXJhdGVDb2RlIiwibGV0dGVycyIsIm51bWJlcnMiLCJjb2RlIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiX2RlZmF1bHQiLCJhZGRUaWNrZXQiLCJyZXEiLCJyZXMiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJkYiIsInRpY2tldCIsImNyZWF0ZSIsImJvZHkiLCJzbHVnIiwidGltZV9jcmVhdGVkIiwiRGF0ZSIsInRvU3RyaW5nIiwiZGlzY291bnQiLCJwaG90byIsImltYWdlIiwiY29udGVudCIsImRlc2MiLCJhYnJ1cHQiLCJzdGF0dXMiLCJqc29uIiwib2siLCJ0MCIsImNvbnNvbGUiLCJsb2ciLCJzdG9wIiwidXBkYXRlVGlja2V0IiwiX2NhbGxlZTIiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJ1cGRhdGUiLCJ3aGVyZSIsInRpY2tldF9pZCIsImdldExpc3RUaWNrZXQiLCJfY2FsbGVlMyIsInRpY2tldExpc3QiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJmaW5kQWxsIiwib3JkZXIiLCJzZW50IiwiZGF0YSIsImdldExpc3RTdWdnZXN0VGlja2V0IiwiX2NhbGxlZTQiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJsaW1pdCIsInN1Y2Nlc3MiLCJnZXRMaXN0VGlja2V0Q2F0ZWdvcnkiLCJfY2FsbGVlNSIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsInR5cGUiLCJxdWVyeSIsImdldFRpY2tldERldGFpbCIsIl9jYWxsZWU2IiwiX2NhbGxlZTYkIiwiX2NvbnRleHQ2IiwiaWQiLCJkZWxldGVUaWNrZXQiLCJfY2FsbGVlNyIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsImRlc3Ryb3kiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvdGlja2V0L3RpY2tldC5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVsc1wiXG5cblxuZnVuY3Rpb24gZ2VuZXJhdGVDb2RlKCkge1xuICAgIGNvbnN0IGxldHRlcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonO1xuICAgIGNvbnN0IG51bWJlcnMgPSAnMDEyMzQ1Njc4OSc7XG5cbiAgICBsZXQgY29kZSA9ICcnO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgY29kZSArPSBsZXR0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZXR0ZXJzLmxlbmd0aCkpO1xuICAgIH1cblxuICAgIGNvZGUgKz0gJy0nO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgaWYgKGkgPT09IDIpIHtcbiAgICAgICAgICAgIGNvZGUgKz0gJy0nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29kZSArPSBsZXR0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZXR0ZXJzLmxlbmd0aCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29kZSArPSAnLSc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICBpZiAoaSA9PT0gMykge1xuICAgICAgICAgICAgY29kZSArPSAnLSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2RlICs9IG51bWJlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG51bWJlcnMubGVuZ3RoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb2RlICs9ICctJztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgIGNvZGUgKz0gbGV0dGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGV0dGVycy5sZW5ndGgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29kZTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYXN5bmMgYWRkVGlja2V0KHJlcSwgcmVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBkYi50aWNrZXQuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAuLi5yZXEuYm9keSwgc2x1ZzogXCJcIiwgdGltZV9jcmVhdGVkOiBuZXcgRGF0ZSgpLnRvU3RyaW5nKCksIGRpc2NvdW50OiAwLCBwaG90bzogcmVxLmJvZHkuaW1hZ2UsIGNvbnRlbnQ6IHJlcS5ib2R5LmNvbnRlbnQsIGRlc2M6IHJlcS5ib2R5LmRlc2NcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlIH0pXG5cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgb2s6IGZhbHNlIH0pXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIHVwZGF0ZVRpY2tldChyZXEsIHJlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgZGIudGlja2V0LnVwZGF0ZShcbiAgICAgICAgICAgICAgICB7IC4uLnJlcS5ib2R5IH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGlja2V0X2lkOiByZXEuYm9keS50aWNrZXRfaWRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSB9KVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBvazogZmFsc2UgfSlcbiAgICAgICAgfVxuICAgIH1cbiAgICAsXG5cbiAgICBhc3luYyBnZXRMaXN0VGlja2V0KHJlcSwgcmVzKSB7XG4gICAgICAgIGNvbnN0IHRpY2tldExpc3QgPSBhd2FpdCBkYi50aWNrZXQuZmluZEFsbCh7XG4gICAgICAgICAgICBvcmRlcjogW1snY3JlYXRlZEF0JywgJ0RFU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlLCBkYXRhOiB0aWNrZXRMaXN0IH0pXG4gICAgfSxcbiAgICBhc3luYyBnZXRMaXN0U3VnZ2VzdFRpY2tldChyZXEsIHJlcykge1xuICAgICAgICBjb25zdCB0aWNrZXRMaXN0ID0gYXdhaXQgZGIudGlja2V0LmZpbmRBbGwoe1xuICAgICAgICAgICAgbGltaXQ6IDQsXG4gICAgICAgICAgICBvcmRlcjogW1xuICAgICAgICAgICAgICAgIFtcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogdGlja2V0TGlzdCB9KTtcbiAgICB9LFxuICAgIGFzeW5jIGdldExpc3RUaWNrZXRDYXRlZ29yeShyZXEsIHJlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdGlja2V0TGlzdCA9IGF3YWl0IGRiLnRpY2tldC5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiByZXEucXVlcnkudHlwZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3JkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogdGlja2V0TGlzdCB9KVxuXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG9rOiBmYWxzZSB9KVxuICAgICAgICB9XG4gICAgfSxcbiAgICBhc3luYyBnZXRUaWNrZXREZXRhaWwocmVxLCByZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHRpY2tldExpc3QgPSBhd2FpdCBkYi50aWNrZXQuZmluZEFsbCh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcS5xdWVyeS5pZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogdGlja2V0TGlzdCB9KVxuXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG9rOiBmYWxzZSB9KVxuICAgICAgICB9XG4gICAgfVxuICAgICxcbiAgICBhc3luYyBkZWxldGVUaWNrZXQocmVxLCByZXMpIHtcbiAgICAgICAgY29uc3QgeyBpZCB9ID0gcmVxLmJvZHlcbiAgICAgICAgZGIudGlja2V0LmRlc3Ryb3koe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICBpZDogaWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUgfSlcbiAgICB9LFxuXG5cbn0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxPQUFBLEdBQUFDLE9BQUE7QUFBb0MsU0FBQUMsUUFBQUMsTUFBQSxFQUFBQyxjQUFBLFFBQUFDLElBQUEsR0FBQUMsTUFBQSxDQUFBRCxJQUFBLENBQUFGLE1BQUEsT0FBQUcsTUFBQSxDQUFBQyxxQkFBQSxRQUFBQyxPQUFBLEdBQUFGLE1BQUEsQ0FBQUMscUJBQUEsQ0FBQUosTUFBQSxHQUFBQyxjQUFBLEtBQUFJLE9BQUEsR0FBQUEsT0FBQSxDQUFBQyxNQUFBLFdBQUFDLEdBQUEsV0FBQUosTUFBQSxDQUFBSyx3QkFBQSxDQUFBUixNQUFBLEVBQUFPLEdBQUEsRUFBQUUsVUFBQSxPQUFBUCxJQUFBLENBQUFRLElBQUEsQ0FBQUMsS0FBQSxDQUFBVCxJQUFBLEVBQUFHLE9BQUEsWUFBQUgsSUFBQTtBQUFBLFNBQUFVLGNBQUFDLE1BQUEsYUFBQUMsQ0FBQSxNQUFBQSxDQUFBLEdBQUFDLFNBQUEsQ0FBQUMsTUFBQSxFQUFBRixDQUFBLFVBQUFHLE1BQUEsV0FBQUYsU0FBQSxDQUFBRCxDQUFBLElBQUFDLFNBQUEsQ0FBQUQsQ0FBQSxRQUFBQSxDQUFBLE9BQUFmLE9BQUEsQ0FBQUksTUFBQSxDQUFB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