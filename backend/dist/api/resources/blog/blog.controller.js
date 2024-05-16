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
  addBlog: function addBlog(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _models.db.blog.create(_objectSpread(_objectSpread({}, req.body), {}, {
              slug: "",
              time_created: new Date().toString(),
              discount: 0,
              photo: req.body.image,
              content: req.body.content,
              desc: req.body.desc
            }));
            return _context.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(500).json({
              ok: false
            }));
          case 9:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 5]]);
    }))();
  },
  updateBlog: function updateBlog(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _models.db.blog.update(_objectSpread({}, req.body), {
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
  getListBlog: function getListBlog(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var blogList;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _models.db.blog.findAll({
              order: [['createdAt', 'DESC']]
            });
          case 2:
            blogList = _context3.sent;
            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              data: blogList
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
      var blogList;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models.db.blog.findAll({
              limit: 4
            });
          case 2:
            blogList = _context4.sent;
            return _context4.abrupt("return", res.status(200).json({
              success: true,
              data: blogList
            }));
          case 4:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }))();
  },
  getListBlogCategory: function getListBlogCategory(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var blogList;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _models.db.blog.findAll({
              where: {
                type: req.query.type
              }
            });
          case 3:
            blogList = _context5.sent;
            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              data: blogList
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
  getBlogDetail: function getBlogDetail(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var blogList;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _models.db.blog.findAll({
              where: {
                id: req.query.id
              }
            });
          case 3:
            blogList = _context6.sent;
            return _context6.abrupt("return", res.status(200).json({
              ok: true,
              data: blogList
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
            _models.db.blog.destroy({
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
  },
  getListBlogAdmin: function getListBlogAdmin(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var blogList;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _models.db.blog.findAll({
              order: [['createdAt', 'DESC']],
              attributes: {
                exclude: ['content']
              }
            });
          case 2:
            blogList = _context8.sent;
            return _context8.abrupt("return", res.status(200).json({
              ok: true,
              data: blogList
            }));
          case 4:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiZ2VuZXJhdGVDb2RlIiwibGV0dGVycyIsIm51bWJlcnMiLCJjb2RlIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiX2RlZmF1bHQiLCJhZGRCbG9nIiwicmVxIiwicmVzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwiZGIiLCJibG9nIiwiY3JlYXRlIiwiYm9keSIsInNsdWciLCJ0aW1lX2NyZWF0ZWQiLCJEYXRlIiwidG9TdHJpbmciLCJkaXNjb3VudCIsInBob3RvIiwiaW1hZ2UiLCJjb250ZW50IiwiZGVzYyIsImFicnVwdCIsInN0YXR1cyIsImpzb24iLCJvayIsInQwIiwiY29uc29sZSIsImxvZyIsInN0b3AiLCJ1cGRhdGVCbG9nIiwiX2NhbGxlZTIiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJ1cGRhdGUiLCJ3aGVyZSIsImlkIiwiZ2V0TGlzdEJsb2ciLCJfY2FsbGVlMyIsImJsb2dMaXN0IiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiZmluZEFsbCIsIm9yZGVyIiwic2VudCIsImRhdGEiLCJnZXRMaXN0U3VnZ2VzdFRvdXIiLCJfY2FsbGVlNCIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsImxpbWl0Iiwic3VjY2VzcyIsImdldExpc3RCbG9nQ2F0ZWdvcnkiLCJfY2FsbGVlNSIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsInR5cGUiLCJxdWVyeSIsImdldEJsb2dEZXRhaWwiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImRlbGV0ZVRvdXIiLCJfY2FsbGVlNyIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsImRlc3Ryb3kiLCJnZXRMaXN0QmxvZ0FkbWluIiwiX2NhbGxlZTgiLCJfY2FsbGVlOCQiLCJfY29udGV4dDgiLCJhdHRyaWJ1dGVzIiwiZXhjbHVkZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy9ibG9nL2Jsb2cuY29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkYiB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHNcIlxuXG5cbmZ1bmN0aW9uIGdlbmVyYXRlQ29kZSgpIHtcbiAgICBjb25zdCBsZXR0ZXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJztcbiAgICBjb25zdCBudW1iZXJzID0gJzAxMjM0NTY3ODknO1xuICBcbiAgICBsZXQgY29kZSA9ICcnO1xuICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgY29kZSArPSBsZXR0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZXR0ZXJzLmxlbmd0aCkpO1xuICAgIH1cbiAgXG4gICAgY29kZSArPSAnLSc7XG4gIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICBpZiAoaSA9PT0gMikge1xuICAgICAgICBjb2RlICs9ICctJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvZGUgKz0gbGV0dGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGV0dGVycy5sZW5ndGgpKTtcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGNvZGUgKz0gJy0nO1xuICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgaWYgKGkgPT09IDMpIHtcbiAgICAgICAgY29kZSArPSAnLSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2RlICs9IG51bWJlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG51bWJlcnMubGVuZ3RoKSk7XG4gICAgICB9XG4gICAgfVxuICBcbiAgICBjb2RlICs9ICctJztcbiAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgIGNvZGUgKz0gbGV0dGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGV0dGVycy5sZW5ndGgpKTtcbiAgICB9XG4gIFxuICAgIHJldHVybiBjb2RlO1xuICB9XG5cbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYXN5bmMgYWRkQmxvZyhyZXEsIHJlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGIuYmxvZy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIC4uLnJlcS5ib2R5LCBzbHVnOiBcIlwiLCB0aW1lX2NyZWF0ZWQ6IG5ldyBEYXRlKCkudG9TdHJpbmcoKSwgZGlzY291bnQ6IDAsIHBob3RvOiByZXEuYm9keS5pbWFnZSwgY29udGVudDogcmVxLmJvZHkuY29udGVudCwgZGVzYzogcmVxLmJvZHkuZGVzY1xuICAgICAgICAgICAgfSlcbiAgICBcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlIH0pXG4gICAgICAgICAgICBcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtvazogZmFsc2V9KVxuICAgICAgICB9XG4gICAgfSxcbiAgICBhc3luYyB1cGRhdGVCbG9nKHJlcSwgcmVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBkYi5ibG9nLnVwZGF0ZShcbiAgICAgICAgICAgICAgICB7IC4uLnJlcS5ib2R5IH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcS5ib2R5LmlkXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUgfSlcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgb2s6IGZhbHNlIH0pXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgZ2V0TGlzdEJsb2cocmVxLCByZXMpIHtcbiAgICAgICAgY29uc3QgYmxvZ0xpc3QgPSBhd2FpdCBkYi5ibG9nLmZpbmRBbGwoe1xuICAgICAgICAgICAgb3JkZXI6IFtbJ2NyZWF0ZWRBdCcsICdERVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogYmxvZ0xpc3QgfSlcbiAgICB9LFxuICAgIGFzeW5jIGdldExpc3RTdWdnZXN0VG91cihyZXEsIHJlcykge1xuICAgICAgICBjb25zdCBibG9nTGlzdD0gYXdhaXQgZGIuYmxvZy5maW5kQWxsKHtcbiAgICAgICAgICAgIGxpbWl0OiA0XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGJsb2dMaXN0IH0pO1xuICAgIH0sXG4gICAgYXN5bmMgZ2V0TGlzdEJsb2dDYXRlZ29yeShyZXEsIHJlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgYmxvZ0xpc3Q9IGF3YWl0IGRiLmJsb2cuZmluZEFsbCh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogcmVxLnF1ZXJ5LnR5cGVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtvazogdHJ1ZSwgZGF0YTogYmxvZ0xpc3R9KVxuICAgICAgICAgICAgXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7b2s6IGZhbHNlfSlcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0QmxvZ0RldGFpbChyZXEsIHJlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgYmxvZ0xpc3Q9IGF3YWl0IGRiLmJsb2cuZmluZEFsbCh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcS5xdWVyeS5pZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe29rOiB0cnVlLCBkYXRhOiBibG9nTGlzdH0pXG4gICAgICAgICAgICBcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtvazogZmFsc2V9KVxuICAgICAgICB9XG4gICAgfVxuICAgICxcbiAgICBhc3luYyBkZWxldGVUb3VyKHJlcSwgcmVzKSB7XG4gICAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5ib2R5XG4gICAgICAgIGRiLmJsb2cuZGVzdHJveSh7XG4gICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgIGlkOiBpZFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSB9KVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0TGlzdEJsb2dBZG1pbihyZXEsIHJlcykge1xuICAgICAgICBjb25zdCBibG9nTGlzdCA9IGF3YWl0IGRiLmJsb2cuZmluZEFsbCh7XG4gICAgICAgICAgICBvcmRlcjogW1snY3JlYXRlZEF0JywgJ0RFU0MnXV0sXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB7ZXhjbHVkZTogWydjb250ZW50J119LFxuXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlLCBkYXRhOiBibG9nTGlzdCB9KVxuICAgIH0sXG5cbn0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxPQUFBLEdBQUFDLE9BQUE7QUFBb0MsU0FBQUMsUUFBQUMsTUFBQSxFQUFBQyxjQUFBLFFBQUFDLElBQUEsR0FBQUMsTUFBQSxDQUFBRCxJQUFBLENBQUFGLE1BQUEsT0FBQUcsTUFBQSxDQUFBQyxxQkFBQSxRQUFBQyxPQUFBLEdBQUFGLE1BQUEsQ0FBQUMscUJBQUEsQ0FBQUosTUFBQSxHQUFBQyxjQUFBLEtBQUFJLE9BQUEsR0FBQUEsT0FBQSxDQUFBQyxNQUFBLFdBQUFDLEdBQUEsV0FBQUosTUFBQSxDQUFBSyx3QkFBQSxDQUFBUixNQUFBLEVBQUFPLEdBQUEsRUFBQUUsVUFBQSxPQUFBUCxJQUFBLENBQUFRLElBQUEsQ0FBQUMsS0FBQSxDQUFBVCxJQUFBLEVBQUFHLE9BQUEsWUFBQUgsSUFBQTtBQUFBLFNBQUFVLGNBQUFDLE1BQUEsYUFBQUMsQ0FBQSxNQUFBQSxDQUFBLEdBQUFDLFNBQUEsQ0FBQUMsTUFBQSxFQUFBRixDQUFBLFVBQUFH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