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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiZ2VuZXJhdGVDb2RlIiwibGV0dGVycyIsIm51bWJlcnMiLCJjb2RlIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiX2RlZmF1bHQiLCJhZGRUaWNrZXQiLCJyZXEiLCJyZXMiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJkYiIsInRpY2tldCIsImNyZWF0ZSIsImJvZHkiLCJzbHVnIiwidGltZV9jcmVhdGVkIiwiRGF0ZSIsInRvU3RyaW5nIiwiZGlzY291bnQiLCJwaG90byIsImltYWdlIiwiY29udGVudCIsImRlc2MiLCJhYnJ1cHQiLCJzdGF0dXMiLCJqc29uIiwib2siLCJ0MCIsImNvbnNvbGUiLCJsb2ciLCJzdG9wIiwidXBkYXRlVGlja2V0IiwiX2NhbGxlZTIiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJ1cGRhdGUiLCJ3aGVyZSIsImlkIiwiZ2V0TGlzdFRpY2tldCIsIl9jYWxsZWUzIiwidGlja2V0TGlzdCIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsImZpbmRBbGwiLCJvcmRlciIsInNlbnQiLCJkYXRhIiwiZ2V0TGlzdFN1Z2dlc3RUaWNrZXQiLCJfY2FsbGVlNCIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsImxpbWl0Iiwic3VjY2VzcyIsImdldExpc3RUaWNrZXRDYXRlZ29yeSIsIl9jYWxsZWU1IiwiX2NhbGxlZTUkIiwiX2NvbnRleHQ1IiwidHlwZSIsInF1ZXJ5IiwiZ2V0VGlja2V0RGV0YWlsIiwiX2NhbGxlZTYiLCJfY2FsbGVlNiQiLCJfY29udGV4dDYiLCJkZWxldGVUaWNrZXQiLCJfY2FsbGVlNyIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsImRlc3Ryb3kiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvdGlja2V0L3RpY2tldC5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVsc1wiXHJcblxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVDb2RlKCkge1xyXG4gICAgY29uc3QgbGV0dGVycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWic7XHJcbiAgICBjb25zdCBudW1iZXJzID0gJzAxMjM0NTY3ODknO1xyXG5cclxuICAgIGxldCBjb2RlID0gJyc7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICBjb2RlICs9IGxldHRlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxldHRlcnMubGVuZ3RoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29kZSArPSAnLSc7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICBpZiAoaSA9PT0gMikge1xyXG4gICAgICAgICAgICBjb2RlICs9ICctJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb2RlICs9IGxldHRlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxldHRlcnMubGVuZ3RoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvZGUgKz0gJy0nO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGkgPT09IDMpIHtcclxuICAgICAgICAgICAgY29kZSArPSAnLSc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29kZSArPSBudW1iZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBudW1iZXJzLmxlbmd0aCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb2RlICs9ICctJztcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgIGNvZGUgKz0gbGV0dGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGV0dGVycy5sZW5ndGgpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY29kZTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGFzeW5jIGFkZFRpY2tldChyZXEsIHJlcykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGRiLnRpY2tldC5jcmVhdGUoe1xyXG4gICAgICAgICAgICAgICAgLi4ucmVxLmJvZHksIHNsdWc6IFwiXCIsIHRpbWVfY3JlYXRlZDogbmV3IERhdGUoKS50b1N0cmluZygpLCBkaXNjb3VudDogMCwgcGhvdG86IHJlcS5ib2R5LmltYWdlLCBjb250ZW50OiByZXEuYm9keS5jb250ZW50LCBkZXNjOiByZXEuYm9keS5kZXNjXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSB9KVxyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgb2s6IGZhbHNlIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIHVwZGF0ZVRpY2tldChyZXEsIHJlcykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGRiLnRpY2tldC51cGRhdGUoXHJcbiAgICAgICAgICAgICAgICB7IC4uLnJlcS5ib2R5IH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcS5ib2R5LmlkXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSB9KVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBvazogZmFsc2UgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAsXHJcblxyXG4gICAgYXN5bmMgZ2V0TGlzdFRpY2tldChyZXEsIHJlcykge1xyXG4gICAgICAgIGNvbnN0IHRpY2tldExpc3QgPSBhd2FpdCBkYi50aWNrZXQuZmluZEFsbCh7XHJcbiAgICAgICAgICAgIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlLCBkYXRhOiB0aWNrZXRMaXN0IH0pXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZ2V0TGlzdFN1Z2dlc3RUaWNrZXQocmVxLCByZXMpIHtcclxuICAgICAgICBjb25zdCB0aWNrZXRMaXN0ID0gYXdhaXQgZGIudGlja2V0LmZpbmRBbGwoe1xyXG4gICAgICAgICAgICBsaW1pdDogNCxcclxuICAgICAgICAgICAgb3JkZXI6IFtcclxuICAgICAgICAgICAgICAgIFtcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogdGlja2V0TGlzdCB9KTtcclxuICAgIH0sXHJcbiAgICBhc3luYyBnZXRMaXN0VGlja2V0Q2F0ZWdvcnkocmVxLCByZXMpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB0aWNrZXRMaXN0ID0gYXdhaXQgZGIudGlja2V0LmZpbmRBbGwoe1xyXG4gICAgICAgICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiByZXEucXVlcnkudHlwZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9yZGVyOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogdGlja2V0TGlzdCB9KVxyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgb2s6IGZhbHNlIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGdldFRpY2tldERldGFpbChyZXEsIHJlcykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpY2tldExpc3QgPSBhd2FpdCBkYi50aWNrZXQuZmluZEFsbCh7XHJcbiAgICAgICAgICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiByZXEucXVlcnkuaWRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIGRhdGE6IHRpY2tldExpc3QgfSlcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG9rOiBmYWxzZSB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICxcclxuICAgIGFzeW5jIGRlbGV0ZVRpY2tldChyZXEsIHJlcykge1xyXG4gICAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5ib2R5XHJcbiAgICAgICAgZGIudGlja2V0LmRlc3Ryb3koe1xyXG4gICAgICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICAgICAgaWQ6IGlkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlIH0pXHJcbiAgICB9LFxyXG5cclxuXHJcbn0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxPQUFBLEdBQUFDLE9BQUE7QUFBb0MsU0FBQUMsUUFBQUMsTUFBQSxFQUFBQyxjQUFBLFFBQUFDLElBQUEsR0FBQUMsTUFBQSxDQUFBRCxJQUFBLENBQUFGLE1BQUEsT0FBQUcsTUFBQSxDQUFBQyxxQkFBQSxRQUFBQyxPQUFBLEdBQUFGLE1BQUEsQ0FBQUMscUJBQUEsQ0FBQUosTUFBQSxHQUFBQyxjQUFBLEtBQUFJLE9BQUEsR0FBQUEsT0FBQSxDQUFBQyxNQUFBLFdBQUFDLEdBQUEsV0FBQUosTUFBQSxDQUFBSyx3QkFBQSxDQUFBUixNQUFBLEVBQUFPLEdBQUEsRUFBQUUs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