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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiZ2VuZXJhdGVDb2RlIiwibGV0dGVycyIsIm51bWJlcnMiLCJjb2RlIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiX2RlZmF1bHQiLCJhZGRUb3VyIiwicmVxIiwicmVzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwiZGIiLCJ0b3VyIiwiY3JlYXRlIiwiYm9keSIsInNsdWciLCJ0aW1lX2NyZWF0ZWQiLCJEYXRlIiwidG9TdHJpbmciLCJkaXNjb3VudCIsInBob3RvIiwiaW1hZ2UiLCJjb250ZW50IiwiZGVzYyIsImFicnVwdCIsInN0YXR1cyIsImpzb24iLCJvayIsInQwIiwiY29uc29sZSIsImxvZyIsInN0b3AiLCJ1cGRhdGVUb3VyIiwiX2NhbGxlZTIiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJ1cGRhdGUiLCJ0b3VyX2lkIiwid2hlcmUiLCJpZCIsImdldExpc3RUb3VyIiwiX2NhbGxlZTMiLCJ0b3VyTGlzdCIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsImZpbmRBbGwiLCJvcmRlciIsImF0dHJpYnV0ZXMiLCJleGNsdWRlIiwic2VudCIsImRhdGEiLCJnZXRMaXN0U3VnZ2VzdFRvdXIiLCJfY2FsbGVlNCIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsImxpbWl0Iiwic3VjY2VzcyIsImdldExpc3RUb3VyQ2F0ZWdvcnkiLCJfY2FsbGVlNSIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsInR5cGUiLCJxdWVyeSIsImdldFRvdXJEZXRhaWwiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImRlbGV0ZVRvdXIiLCJfY2FsbGVlNyIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsImRlc3Ryb3kiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvdG91ci90b3VyLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzXCJcblxuXG5mdW5jdGlvbiBnZW5lcmF0ZUNvZGUoKSB7XG4gICAgY29uc3QgbGV0dGVycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWic7XG4gICAgY29uc3QgbnVtYmVycyA9ICcwMTIzNDU2Nzg5JztcblxuICAgIGxldCBjb2RlID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBjb2RlICs9IGxldHRlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxldHRlcnMubGVuZ3RoKSk7XG4gICAgfVxuXG4gICAgY29kZSArPSAnLSc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICBpZiAoaSA9PT0gMikge1xuICAgICAgICAgICAgY29kZSArPSAnLSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2RlICs9IGxldHRlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxldHRlcnMubGVuZ3RoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb2RlICs9ICctJztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgIGlmIChpID09PSAzKSB7XG4gICAgICAgICAgICBjb2RlICs9ICctJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvZGUgKz0gbnVtYmVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbnVtYmVycy5sZW5ndGgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvZGUgKz0gJy0nO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgY29kZSArPSBsZXR0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZXR0ZXJzLmxlbmd0aCkpO1xuICAgIH1cblxuICAgIHJldHVybiBjb2RlO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhc3luYyBhZGRUb3VyKHJlcSwgcmVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBkYi50b3VyLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgLi4ucmVxLmJvZHksIHNsdWc6IFwiXCIsIHRpbWVfY3JlYXRlZDogbmV3IERhdGUoKS50b1N0cmluZygpLCBkaXNjb3VudDogMCwgcGhvdG86IHJlcS5ib2R5LmltYWdlLCBjb250ZW50OiByZXEuYm9keS5jb250ZW50LCBkZXNjOiByZXEuYm9keS5kZXNjXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSB9KVxuXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG9rOiBmYWxzZSB9KVxuICAgICAgICB9XG4gICAgfSxcbiAgICBhc3luYyB1cGRhdGVUb3VyKHJlcSwgcmVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBkYi50b3VyLnVwZGF0ZShcbiAgICAgICAgICAgICAgICB7IC4uLnJlcS5ib2R5LCB0b3VyX2lkOiByZXEuYm9keS50b3VyX2lkIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcS5ib2R5LmlkXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUgfSlcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgb2s6IGZhbHNlIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgLFxuXG4gICAgYXN5bmMgZ2V0TGlzdFRvdXIocmVxLCByZXMpIHtcbiAgICAgICAgY29uc3QgdG91ckxpc3QgPSBhd2FpdCBkYi50b3VyLmZpbmRBbGwoe1xuICAgICAgICAgICAgb3JkZXI6IFtbJ2NyZWF0ZWRBdCcsICdERVNDJ11dLFxuICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGU6IFsnY29udGVudCddIC8vIFRoYXkgJ2ZpZWxkMScsICdmaWVsZDInIGLhurFuZyBjw6FjIHRyxrDhu51uZyBi4bqhbiBtdeG7kW4gbG/huqFpIGLhu49cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIGRhdGE6IHRvdXJMaXN0IH0pXG4gICAgfSxcbiAgICBhc3luYyBnZXRMaXN0U3VnZ2VzdFRvdXIocmVxLCByZXMpIHtcbiAgICAgICAgY29uc3QgdG91ckxpc3QgPSBhd2FpdCBkYi50b3VyLmZpbmRBbGwoe1xuICAgICAgICAgICAgbGltaXQ6IDQsXG4gICAgICAgICAgICBvcmRlcjogW1xuICAgICAgICAgICAgICAgIFtcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgZXhjbHVkZTogWydjb250ZW50J10gLy8gVGhheSAnZmllbGQxJywgJ2ZpZWxkMicgYuG6sW5nIGPDoWMgdHLGsOG7nW5nIGLhuqFuIG114buRbiBsb+G6oWkgYuG7j1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiB0b3VyTGlzdCB9KTtcbiAgICB9LFxuICAgIGFzeW5jIGdldExpc3RUb3VyQ2F0ZWdvcnkocmVxLCByZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHRvdXJMaXN0ID0gYXdhaXQgZGIudG91ci5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiByZXEucXVlcnkudHlwZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3JkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogdG91ckxpc3QgfSlcblxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBvazogZmFsc2UgfSlcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0VG91ckRldGFpbChyZXEsIHJlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdG91ckxpc3QgPSBhd2FpdCBkYi50b3VyLmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiByZXEucXVlcnkuaWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIGRhdGE6IHRvdXJMaXN0IH0pXG5cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgb2s6IGZhbHNlIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgLFxuICAgIGFzeW5jIGRlbGV0ZVRvdXIocmVxLCByZXMpIHtcbiAgICAgICAgY29uc3QgeyBpZCB9ID0gcmVxLmJvZHlcbiAgICAgICAgZGIudG91ci5kZXN0cm95KHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgaWQ6IGlkXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlIH0pXG4gICAgfSxcblxuXG59Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBQUEsT0FBQSxHQUFBQyxPQUFBO0FBQW9DLFNBQUFDLFFBQUFDLE1BQUEsRUFBQUMsY0FBQSxRQUFBQyxJQUFBLEdBQUFDLE1BQUEsQ0FBQUQsSUFBQSxDQUFBRixNQUFBLE9BQUFHLE1BQUEsQ0FBQUMscUJBQUEsUUFBQUMsT0FBQSxHQUFBRixNQUFBLENBQUFDLHFCQUFBLENBQUFKLE1BQUEsR0FBQUMsY0FBQSxLQUFBSSxPQUFBLEdBQUFBLE9BQUEsQ0FBQUMsTUFBQSxXQUFBQyxHQUFBLFdBQUFKLE1BQUEsQ0FB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