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
              order: [["createdAt", "DESC"]],
              attributes: {
                exclude: ["content"]
              }
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
              order: [["createdAt", "DESC"]],
              attributes: {
                exclude: ['content']
              }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiZ2VuZXJhdGVDb2RlIiwibGV0dGVycyIsIm51bWJlcnMiLCJjb2RlIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiX2RlZmF1bHQiLCJhZGRUaWNrZXQiLCJyZXEiLCJyZXMiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJkYiIsInRpY2tldCIsImNyZWF0ZSIsImJvZHkiLCJzbHVnIiwidGltZV9jcmVhdGVkIiwiRGF0ZSIsInRvU3RyaW5nIiwiZGlzY291bnQiLCJwaG90byIsImltYWdlIiwiY29udGVudCIsImRlc2MiLCJhYnJ1cHQiLCJzdGF0dXMiLCJqc29uIiwib2siLCJ0MCIsImNvbnNvbGUiLCJsb2ciLCJzdG9wIiwidXBkYXRlVGlja2V0IiwiX2NhbGxlZTIiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJ1cGRhdGUiLCJ3aGVyZSIsImlkIiwiZ2V0TGlzdFRpY2tldCIsIl9jYWxsZWUzIiwidGlja2V0TGlzdCIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsImZpbmRBbGwiLCJvcmRlciIsImF0dHJpYnV0ZXMiLCJleGNsdWRlIiwic2VudCIsImRhdGEiLCJnZXRMaXN0U3VnZ2VzdFRpY2tldCIsIl9jYWxsZWU0IiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwibGltaXQiLCJzdWNjZXNzIiwiZ2V0TGlzdFRpY2tldENhdGVnb3J5IiwiX2NhbGxlZTUiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJ0eXBlIiwicXVlcnkiLCJnZXRUaWNrZXREZXRhaWwiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImRlbGV0ZVRpY2tldCIsIl9jYWxsZWU3IiwiX2NhbGxlZTckIiwiX2NvbnRleHQ3IiwiZGVzdHJveSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy90aWNrZXQvdGlja2V0LmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzXCI7XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZUNvZGUoKSB7XHJcbiAgY29uc3QgbGV0dGVycyA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpcIjtcclxuICBjb25zdCBudW1iZXJzID0gXCIwMTIzNDU2Nzg5XCI7XHJcblxyXG4gIGxldCBjb2RlID0gXCJcIjtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgIGNvZGUgKz0gbGV0dGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGV0dGVycy5sZW5ndGgpKTtcclxuICB9XHJcblxyXG4gIGNvZGUgKz0gXCItXCI7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICBpZiAoaSA9PT0gMikge1xyXG4gICAgICBjb2RlICs9IFwiLVwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29kZSArPSBsZXR0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZXR0ZXJzLmxlbmd0aCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29kZSArPSBcIi1cIjtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgIGlmIChpID09PSAzKSB7XHJcbiAgICAgIGNvZGUgKz0gXCItXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb2RlICs9IG51bWJlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG51bWJlcnMubGVuZ3RoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb2RlICs9IFwiLVwiO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgY29kZSArPSBsZXR0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZXR0ZXJzLmxlbmd0aCkpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGNvZGU7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBhc3luYyBhZGRUaWNrZXQocmVxLCByZXMpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IGRiLnRpY2tldC5jcmVhdGUoe1xyXG4gICAgICAgIC4uLnJlcS5ib2R5LFxyXG4gICAgICAgIHNsdWc6IFwiXCIsXHJcbiAgICAgICAgdGltZV9jcmVhdGVkOiBuZXcgRGF0ZSgpLnRvU3RyaW5nKCksXHJcbiAgICAgICAgZGlzY291bnQ6IDAsXHJcbiAgICAgICAgcGhvdG86IHJlcS5ib2R5LmltYWdlLFxyXG4gICAgICAgIGNvbnRlbnQ6IHJlcS5ib2R5LmNvbnRlbnQsXHJcbiAgICAgICAgZGVzYzogcmVxLmJvZHkuZGVzYyxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgb2s6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXN5bmMgdXBkYXRlVGlja2V0KHJlcSwgcmVzKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCBkYi50aWNrZXQudXBkYXRlKFxyXG4gICAgICAgIHsgLi4ucmVxLmJvZHkgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICBpZDogcmVxLmJvZHkuaWQsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG9rOiBmYWxzZSB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFzeW5jIGdldExpc3RUaWNrZXQocmVxLCByZXMpIHtcclxuICAgIGNvbnN0IHRpY2tldExpc3QgPSBhd2FpdCBkYi50aWNrZXQuZmluZEFsbCh7XHJcbiAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXHJcbiAgICAgIGF0dHJpYnV0ZXM6IHsgZXhjbHVkZTogW1wiY29udGVudFwiXSB9LFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogdGlja2V0TGlzdCB9KTtcclxuICB9LFxyXG4gIGFzeW5jIGdldExpc3RTdWdnZXN0VGlja2V0KHJlcSwgcmVzKSB7XHJcbiAgICBjb25zdCB0aWNrZXRMaXN0ID0gYXdhaXQgZGIudGlja2V0LmZpbmRBbGwoe1xyXG4gICAgICBsaW1pdDogNCxcclxuICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogdGlja2V0TGlzdCB9KTtcclxuICB9LFxyXG4gIGFzeW5jIGdldExpc3RUaWNrZXRDYXRlZ29yeShyZXEsIHJlcykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgdGlja2V0TGlzdCA9IGF3YWl0IGRiLnRpY2tldC5maW5kQWxsKHtcclxuICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgdHlwZTogcmVxLnF1ZXJ5LnR5cGUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtleGNsdWRlOiBbJ2NvbnRlbnQnXX1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlLCBkYXRhOiB0aWNrZXRMaXN0IH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBvazogZmFsc2UgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyBnZXRUaWNrZXREZXRhaWwocmVxLCByZXMpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHRpY2tldExpc3QgPSBhd2FpdCBkYi50aWNrZXQuZmluZEFsbCh7XHJcbiAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgIGlkOiByZXEucXVlcnkuaWQsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlLCBkYXRhOiB0aWNrZXRMaXN0IH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBvazogZmFsc2UgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyBkZWxldGVUaWNrZXQocmVxLCByZXMpIHtcclxuICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5ib2R5O1xyXG4gICAgZGIudGlja2V0LmRlc3Ryb3koe1xyXG4gICAgICB3aGVyZToge1xyXG4gICAgICAgIGlkOiBpZCxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUgfSk7XHJcbiAgfSxcclxufTtcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBQUEsT0FBQSxHQUFBQyxPQUFBO0FBQXFDLFNBQUFDLFFBQUFDLE1BQUEsRUFBQUMsY0FBQSxRQUFBQyxJQUFBLEdBQUFDLE1BQUEsQ0FBQUQsSUFBQSxDQUFBRixNQUFBLE9BQUFHLE1BQUEsQ0FBQUMscUJBQUEsUUFBQUMsT0FBQSxHQUFBRixNQUFBLENBQUFDLHFCQUFBLENBQUFKLE1BQUEsR0FBQUMsY0FBQSxLQUFBSSxPQUFBLEdBQUFBLE9BQUEsQ0FBQUMsTUFBQSxXQUFBQyxHQUFBLFdBQUFKLE1BQUEsQ0FBQUssd0JBQUEsQ0FBQVIsTUFBQSxFQUFBTyxHQUFBLEVBQUFFLFVBQUEsT0FBQVAsSUFBQSxDQUFBUSxJQUFBLENBQUFDLEtBQUEsQ0FBQVQsSUFBQSxFQUFBRyxPQUFBLFlBQUFILElBQUE7QUFBQSxTQUFBVSxjQUFBQyxNQUFBLGFBQUFDLENBQUEsTUFBQUEsQ0FBQSxHQUFBQyxTQUFBLENBQUFDLE1BQUEsRUFBQUYsQ0FBQSxVQUFBRyxNQUFBLFdBQUFGLFNBQUEsQ0FBQUQsQ0FBQSxJQUFBQyxTQUFBLENBQUFELENBQUEsUUFBQUEsQ0FBQSxPQUFBZixPQUFBLENBQUFJLE1BQUEsQ0FBQWMsTUFBQSxPQUFBQyxPQUFBLFdBQUFDLEdBQUEsUUFBQUMsZ0JBQUEsYUFBQVAsTUFBQSxFQUFBTSxHQUFBLEVBQUFGLE1BQUEsQ0FBQUUsR0FBQSxTQUFBaEIsTUFBQSxDQUFBa0IseUJBQUEsR0FBQWxCLE1BQUEsQ0FBQW1CLGdCQUFBLENBQUFULE1BQUEsRUFBQVYsTUFBQSxDQUFBa0IseUJBQUEsQ0FBQUosTUFBQSxLQUFBbEIsT0FBQSxDQUFBSSxNQUFBLENBQUFjLE1BQUEsR0FBQUMsT0FBQSxXQUFBQyxHQUFBLElBQUFoQixNQUFBLENBQUFvQixjQUFBLENBQUFWLE1BQUEsRUFBQU0sR0FBQSxFQUFBaEIsTUFBQSxDQUFBSyx3QkFBQSxDQUFBUyxNQUFBLEVBQUFFLEdBQUEsaUJBQUFOLE1BQUE7QUFFckMsU0FBU1csWUFBWUEsQ0FBQSxFQUFHO0VBQ3RCLElBQU1DLE9BQU8sR0FBRyw0QkFBNEI7RUFDNUMsSUFBTUMsT0FBTyxHQUFHLFlBQVk7RUFFNUIsSUFBSUMsSUFBSSxHQUFHLEVBQUU7RUFFYixLQUFLLElBQUliLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsRUFBRSxFQUFFO0lBQzFCYSxJQUFJLElBQUlGLE9BQU8sQ0FBQ0csTUFBTSxDQUFDQyxJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFDRSxNQUFNLENBQUMsQ0FBQyxHQUFHTixPQUFPLENBQUNULE1BQU0sQ0FBQyxDQUFDO0VBQ3BFO0VBRUFXLElBQUksSUFBSSxHQUFHO0VBRVgsS0FBSyxJQUFJYixFQUFDLEdBQUcsQ0FBQyxFQUFFQSxFQUFDLEdBQUcsQ0FBQyxFQUFFQSxFQUFDLEVBQUUsRUFBRTtJQUMxQixJQUFJQSxFQUFDLEtBQUssQ0FBQyxFQUFFO01BQ1hhLElBQUksSUFBSSxHQUFHO0lBQ2IsQ0FBQyxNQUFNO01BQ0xBLElBQUksSUFBSUYsT0FBTyxDQUFDRyxNQUFNLENBQUNDLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEdBQUdOLE9BQU8sQ0FBQ1QsTUFBTSxDQUFDLENBQUM7SUFDcEU7RUFDRjtFQUVBVyxJQUFJLElBQUksR0FBRztFQUVYLEtBQUssSUFBSWIsR0FBQyxHQUFHLENBQUMsRUFBRUEsR0FBQyxHQUFHLENBQUMsRUFBRUEsR0FBQyxFQUFFLEVBQUU7SUFDMUIsSUFBSUEsR0FBQyxLQUFLLENBQUMsRUFBRTtNQUNYYSxJQUFJLElBQUksR0FBRztJQUNiLENBQUMsTUFBTTtNQUNMQSxJQUFJLElBQUlELE9BQU8sQ0FBQ0UsTUFBTSxDQUFDQyxJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFDRSxNQUFNLENBQUMsQ0FBQyxHQUFHTCxPQUFPLENBQUNWLE1BQU0sQ0FBQyxDQUFDO0lBQ3BFO0VBQ0Y7RUFFQVcsSUFBSSxJQUFJLEdBQUc7RUFFWCxLQUFLLElBQUliLEdBQUMsR0FBRyxDQUFDLEVBQUVBLEdBQUMsR0FBRyxDQUFDLEVBQUVBLEdBQUMsRUFBRSxFQUFFO0lBQzFCYSxJQUFJLElBQUlGLE9BQU8sQ0FBQ0csTUFBTSxDQUFDQyxJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFDRSxNQUFNLENBQUMsQ0FBQyxHQUFHTixPQUFPLENBQUNULE1BQU0sQ0FBQyxDQUFDO0VBQ3BFO0VBRUEsT0FBT1csSUFBSTtBQUNiO0FBQUMsSUFBQUssUUFBQSxHQUVjO0VBQ1BDLFNBQVMsV0FBQUEsVUFBQ0MsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUFDLFFBQUE7TUFBQSxPQUFBRixZQUFBLFlBQUFHLElBQUEsVUFBQUMsU0FBQUMsUUFBQTtRQUFBLGtCQUFBQSxRQUFBLENBQUFDLElBQUEsR0FBQUQsUUFBQSxDQUFBRSxJQUFBO1VBQUE7WUFBQUYsUUFBQSxDQUFBQyxJQUFBO1lBQUFELFFBQUEsQ0FBQUUsSUFBQTtZQUFBLE9BRWhCQyxVQUFFLENBQUNDLE1BQU0sQ0FBQ0MsTUFBTSxDQUFBbkMsYUFBQSxDQUFBQSxhQUFBLEtBQ2pCc0IsR0FBRyxDQUFDYyxJQUFJO2NBQ1hDLElBQUksRUFBRSxFQUFFO2NBQ1JDLFlBQVksRUFBRSxJQUFJQyxJQUFJLENBQUMsQ0FBQyxDQUFDQyxRQUFRLENBQUMsQ0FBQztjQUNuQ0MsUUFBUSxFQUFFLENBQUM7Y0FDWEMsS0FBSyxFQUFFcEIsR0FBRyxDQUFDYyxJQUFJLENBQUNPLEtBQUs7Y0FDckJDLE9BQU8sRUFBRXRCLEdBQUcsQ0FBQ2MsSUFBSSxDQUFDUSxPQUFPO2NBQ3pCQyxJQUFJLEVBQUV2QixHQUFHLENBQUNjLElBQUksQ0FBQ1M7WUFBSSxFQUNwQixDQUFDO1VBQUE7WUFBQSxPQUFBZixRQUFBLENBQUFnQixNQUFBLFdBRUt2QixHQUFHLENBQUN3QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztjQUFFQyxFQUFFLEVBQUU7WUFBSyxDQUFDLENBQUM7VUFBQTtZQUFBbkIsUUFBQSxDQUFBQyxJQUFBO1lBQUFELFFBQUEsQ0FBQW9CLEVBQUEsR0FBQXBCLFFBQUE7WUFFekNxQixPQUFPLENBQUNDLEdBQUcsQ0FBQXRCLFFBQUEsQ0FBQW9CLEVBQU0sQ0FBQztZQUFDLE9BQUFwQixRQUFBLENBQUFnQixNQUFBLFdBQ1p2QixHQUFHLENBQUN3QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztjQUFFQyxFQUFFLEVBQUU7WUFBTSxDQUFDLENBQUM7VUFBQTtVQUFBO1lBQUEsT0FBQW5CLFFBQUEsQ0FBQXVCLElBQUE7UUFBQTtNQUFBLEdBQUExQixPQUFBO0lBQUE7RUFFOUMsQ0FBQztFQUNLMkIsWUFBWSxXQUFBQSxhQUFDaEMsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUE2QixTQUFBO01BQUEsT0FBQTlCLFlBQUEsWUFBQUcsSUFBQSxVQUFBNEIsVUFBQUMsU0FBQTtRQUFBLGtCQUFBQSxTQUFBLENBQUExQixJQUFBLEdBQUEwQixTQUFBLENBQUF6QixJQUFBO1VBQUE7WUFBQXlCLFNBQUEsQ0FBQTFCLElBQUE7WUFBQTBCLFNBQUEsQ0FBQXpCLElBQUE7WUFBQSxPQUVuQkMsVUFBRSxDQUFDQyxNQUFNLENBQUN3QixNQUFNLENBQUExRCxhQUFBLEtBQ2ZzQixHQUFHLENBQUNjLElBQUksR0FDYjtjQUNFdUIsS0FBSyxFQUFFO2dCQUNMQyxFQUFFLEVBQUV0QyxHQUFHLENBQUNjLElBQUksQ0FBQ3dCO2NBQ2Y7WUFDRixDQUNGLENBQUM7VUFBQTtZQUFBLE9BQUFILFNBQUEsQ0FBQVgsTUFBQSxXQUNNdkIsR0FBRyxDQUFDd0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Y0FBRUMsRUFBRSxFQUFFO1lBQUssQ0FBQyxDQUFDO1VBQUE7WUFBQVEsU0FBQSxDQUFBMUIsSUFBQTtZQUFBMEIsU0FBQSxDQUFBUCxFQUFBLEdBQUFPLFNBQUE7WUFFekNOLE9BQU8sQ0FBQ0MsR0FBRyxDQUFBSyxTQUFBLENBQUFQLEVBQU0sQ0FBQztZQUFDLE9BQUFPLFNBQUEsQ0FBQVgsTUFBQSxXQUNadkIsR0FBRyxDQUFDd0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Y0FBRUMsRUFBRSxFQUFFO1lBQU0sQ0FBQyxDQUFDO1VBQUE7VUFBQTtZQUFBLE9BQUFRLFNBQUEsQ0FBQUosSUFBQTtRQUFBO01BQUEsR0FBQUUsUUFBQTtJQUFBO0VBRTlDLENBQUM7RUFDS00sYUFBYSxXQUFBQSxjQUFDdkMsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUFvQyxTQUFBO01BQUEsSUFBQUMsVUFBQTtNQUFBLE9BQUF0QyxZQUFBLFlBQUFHLElBQUEsVUFBQW9DLFVBQUFDLFNBQUE7UUFBQSxrQkFBQUEsU0FBQSxDQUFBbEMsSUFBQSxHQUFBa0MsU0FBQSxDQUFBakMsSUFBQTtVQUFBO1lBQUFpQyxTQUFBLENBQUFqQyxJQUFBO1lBQUEsT0FDSEMsVUFBRSxDQUFDQyxNQUFNLENBQUNnQyxPQUFPLENBQUM7Y0FDekNDLEtBQUssRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2NBQzlCQyxVQUFVLEVBQUU7Z0JBQUVDLE9BQU8sRUFBRSxDQUFDLFNBQVM7Y0FBRTtZQUNyQyxDQUFDLENBQUM7VUFBQTtZQUhJTixVQUFVLEdBQUFFLFNBQUEsQ0FBQUssSUFBQTtZQUFBLE9BQUFMLFNBQUEsQ0FBQW5CLE1BQUEsV0FJVHZCLEdBQUcsQ0FBQ3dCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2NBQUVDLEVBQUUsRUFBRSxJQUFJO2NBQUVzQixJQUFJLEVBQUVSO1lBQVcsQ0FBQyxDQUFDO1VBQUE7VUFBQTtZQUFBLE9BQUFFLFNBQUEsQ0FBQVosSUFBQTtRQUFBO01BQUEsR0FBQVMsUUFBQTtJQUFBO0VBQzdELENBQUM7RUFDS1Usb0JBQW9CLFdBQUFBLHFCQUFDbEQsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUErQyxTQUFBO01BQUEsSUFBQVYsVUFBQTtNQUFBLE9BQUF0QyxZQUFBLFlBQUFHLElBQUEsVUFBQThDLFVBQUFDLFNBQUE7UUFBQSxrQkFBQUEsU0FBQSxDQUFBNUMsSUFBQSxHQUFBNEMsU0FBQSxDQUFBM0MsSUFBQTtVQUFBO1lBQUEyQyxTQUFBLENBQUEzQyxJQUFBO1lBQUEsT0FDVkMsVUFBRSxDQUFDQyxNQUFNLENBQUNnQyxPQUFPLENBQUM7Y0FDekNVLEtBQUssRUFBRSxDQUFDO2NBQ1JULEtBQUssRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQztZQUMvQixDQUFDLENBQUM7VUFBQTtZQUhJSixVQUFVLEdBQUFZLFNBQUEsQ0FBQUwsSUFBQTtZQUFBLE9BQUFLLFNBQUEsQ0FBQTdCLE1BQUEsV0FJVHZCLEdBQUcsQ0FBQ3dCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2NBQUU2QixPQUFPLEVBQUUsSUFBSTtjQUFFTixJQUFJLEVBQUVSO1lBQVcsQ0FBQyxDQUFDO1VBQUE7VUFBQTtZQUFBLE9BQUFZLFNBQUEsQ0FBQXRCLElBQUE7UUFBQTtNQUFBLEdBQUFvQixRQUFBO0lBQUE7RUFDbEUsQ0FBQztFQUNLSyxxQkFBcUIsV0FBQUEsc0JBQUN4RCxHQUFHLEVBQUVDLEdBQUcsRUFBRTtJQUFBLFdBQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQXFELFNBQUE7TUFBQSxJQUFBaEIsVUFBQTtNQUFBLE9BQUF0QyxZQUFBLFlBQUFHLElBQUEsVUFBQW9ELFVBQUFDLFNBQUE7UUFBQSxrQkFBQUEsU0FBQSxDQUFBbEQsSUFBQSxHQUFBa0QsU0FBQSxDQUFBakQsSUFBQTtVQUFBO1lBQUFpRCxTQUFBLENBQUFsRCxJQUFBO1lBQUFrRCxTQUFBLENBQUFqRCxJQUFBO1lBQUEsT0FFVEMsVUFBRSxDQUFDQyxNQUFNLENBQUNnQyxPQUFPLENBQUM7Y0FDekNQLEtBQUssRUFBRTtnQkFDTHVCLElBQUksRUFBRTVELEdBQUcsQ0FBQzZELEtBQUssQ0FBQ0Q7Y0FDbEIsQ0FBQztjQUNEZixLQUFLLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztjQUM5QkMsVUFBVSxFQUFFO2dCQUFDQyxPQUFPLEVBQUUsQ0FBQyxTQUFTO2NBQUM7WUFDbkMsQ0FBQyxDQUFDO1VBQUE7WUFOSU4sVUFBVSxHQUFBa0IsU0FBQSxDQUFBWCxJQUFBO1lBQUEsT0FBQVcsU0FBQSxDQUFBbkMsTUFBQSxXQU9UdkIsR0FBRyxDQUFDd0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Y0FBRUMsRUFBRSxFQUFFLElBQUk7Y0FBRXNCLElBQUksRUFBRVI7WUFBVyxDQUFDLENBQUM7VUFBQTtZQUFBa0IsU0FBQSxDQUFBbEQsSUFBQTtZQUFBa0QsU0FBQSxDQUFBL0IsRUFBQSxHQUFBK0IsU0FBQTtZQUUzRDlCLE9BQU8sQ0FBQ0MsR0FBRyxDQUFBNkIsU0FBQSxDQUFBL0IsRUFBTSxDQUFDO1lBQUMsT0FBQStCLFNBQUEsQ0FBQW5DLE1BQUEsV0FDWnZCLEdBQUcsQ0FBQ3dCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2NBQUVDLEVBQUUsRUFBRTtZQUFNLENBQUMsQ0FBQztVQUFBO1VBQUE7WUFBQSxPQUFBZ0MsU0FBQSxDQUFBNUIsSUFBQTtRQUFBO01BQUEsR0FBQTBCLFFBQUE7SUFBQTtFQUU5QyxDQUFDO0VBQ0tLLGVBQWUsV0FBQUEsZ0JBQUM5RCxHQUFHLEVBQUVDLEdBQUcsRUFBRTtJQUFBLFdBQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQTJELFNBQUE7TUFBQSxJQUFBdEIsVUFBQTtNQUFBLE9BQUF0QyxZQUFBLFlBQUFHLElBQUEsVUFBQTBELFVBQUFDLFNBQUE7UUFBQSxrQkFBQUEsU0FBQSxDQUFBeEQsSUFBQSxHQUFBd0QsU0FBQSxDQUFBdkQsSUFBQTtVQUFBO1lBQUF1RCxTQUFBLENBQUF4RCxJQUFBO1lBQUF3RCxTQUFBLENBQUF2RCxJQUFBO1lBQUEsT0FFSEMsVUFBRSxDQUFDQyxNQUFNLENBQUNnQyxPQUFPLENBQUM7Y0FDekNQLEtBQUssRUFBRTtnQkFDTEMsRUFBRSxFQUFFdEMsR0FBRyxDQUFDNkQsS0FBSyxDQUFDdkI7Y0FDaEI7WUFDRixDQUFDLENBQUM7VUFBQTtZQUpJRyxVQUFVLEdBQUF3QixTQUFBLENBQUFqQixJQUFBO1lBQUEsT0FBQWlCLFNBQUEsQ0FBQXpDLE1BQUEsV0FLVHZCLEdBQUcsQ0FBQ3dCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2NBQUVDLEVBQUUsRUFBRSxJQUFJO2NBQUVzQixJQUFJLEVBQUVSO1lBQVcsQ0FBQyxDQUFDO1VBQUE7WUFBQXdCLFNBQUEsQ0FBQXhELElBQUE7WUFBQXdELFNBQUEsQ0FBQXJDLEVBQUEsR0FBQXFDLFNBQUE7WUFFM0RwQyxPQUFPLENBQUNDLEdBQUcsQ0FBQW1DLFNBQUEsQ0FBQXJDLEVBQU0sQ0FBQztZQUFDLE9BQUFxQyxTQUFBLENBQUF6QyxNQUFBLFdBQ1p2QixHQUFHLENBQUN3QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztjQUFFQyxFQUFFLEVBQUU7WUFBTSxDQUFDLENBQUM7VUFBQTtVQUFBO1lBQUEsT0FBQXNDLFNBQUEsQ0FBQWxDLElBQUE7UUFBQTtNQUFBLEdBQUFnQyxRQUFBO0lBQUE7RUFFOUMsQ0FBQztFQUNLRyxZQUFZLFdBQUFBLGFBQUNsRSxHQUFHLEVBQUVDLEdBQUcsRUFBRTtJQUFBLFdBQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQStELFNBQUE7TUFBQSxJQUFBN0IsRUFBQTtNQUFBLE9BQUFuQyxZQUFBLFlBQUFHLElBQUEsVUFBQThELFVBQUFDLFNBQUE7UUFBQSxrQkFBQUEsU0FBQSxDQUFBNUQsSUFBQSxHQUFBNEQsU0FBQSxDQUFBM0QsSUFBQTtVQUFBO1lBQ25CNEIsRUFBRSxHQUFLdEMsR0FBRyxDQUFDYyxJQUFJLENBQWZ3QixFQUFFO1lBQ1YzQixVQUFFLENBQUNDLE1BQU0sQ0FBQzBELE9BQU8sQ0FBQztjQUNoQmpDLEtBQUssRUFBRTtnQkFDTEMsRUFBRSxFQUFFQTtjQUNOO1lBQ0YsQ0FBQyxDQUFDO1lBQUMsT0FBQStCLFNBQUEsQ0FBQTdDLE1BQUEsV0FDSXZCLEdBQUcsQ0FBQ3dCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2NBQUVDLEVBQUUsRUFBRTtZQUFLLENBQUMsQ0FBQztVQUFBO1VBQUE7WUFBQSxPQUFBMEMsU0FBQSxDQUFBdEMsSUFBQTtRQUFBO01BQUEsR0FBQW9DLFFBQUE7SUFBQTtFQUMzQztBQUNGLENBQUM7QUFBQUksT0FBQSxjQUFBekUsUUFBQSJ9