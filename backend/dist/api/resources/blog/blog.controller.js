"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _sequelize = require("sequelize");
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
      var _req$query;
      var type, whereCondition, blogList;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            type = (_req$query = req.query) === null || _req$query === void 0 ? void 0 : _req$query.type;
            whereCondition = {};
            if (type) {
              whereCondition.type = type;
            }
            _context3.next = 5;
            return _models.db.blog.findAll({
              where: whereCondition,
              order: [["createdAt", "DESC"]],
              attributes: {
                exclude: ["content"]
              }
            });
          case 5:
            blogList = _context3.sent;
            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              data: blogList
            }));
          case 7:
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
              },
              attributes: {
                exclude: ["content"]
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
  getDetailBlogCategory: function getDetailBlogCategory(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var _blogList, blogList;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            if (!(req.query.type == 15)) {
              _context6.next = 6;
              break;
            }
            _context6.next = 4;
            return _models.db.blog.findAll({
              where: {
                type: (0, _defineProperty2["default"])({}, _sequelize.Op.or, [5, 14])
              },
              attributes: {
                exclude: ["content"]
              }
            });
          case 4:
            _blogList = _context6.sent;
            return _context6.abrupt("return", res.status(200).json({
              ok: true,
              data: _blogList
            }));
          case 6:
            _context6.next = 8;
            return _models.db.blog.findAll({
              where: {
                type: req.query.type
              }
              // attributes: {exclude: ['content']}
            });
          case 8:
            blogList = _context6.sent;
            return _context6.abrupt("return", res.status(200).json({
              ok: true,
              data: blogList
            }));
          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            return _context6.abrupt("return", res.status(500).json({
              ok: false
            }));
          case 16:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 12]]);
    }))();
  },
  getBlogDetail: function getBlogDetail(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var blogList;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _models.db.blog.findAll({
              where: {
                id: req.query.id
              },
              include: [{
                model: _models.db.user,
                attributes: ["id", "firstName", "lastName"],
                required: false
              }]
            });
          case 3:
            blogList = _context7.sent;
            return _context7.abrupt("return", res.status(200).json({
              ok: true,
              data: blogList
            }));
          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            return _context7.abrupt("return", res.status(500).json({
              ok: false
            }));
          case 11:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 7]]);
    }))();
  },
  deleteTour: function deleteTour(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var id;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            id = req.body.id;
            _models.db.blog.destroy({
              where: {
                id: id
              }
            });
            return _context8.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 3:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }))();
  },
  getListBlogAdmin: function getListBlogAdmin(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var _req$query2;
      var type, whereCondition, blogList;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            type = (_req$query2 = req.query) === null || _req$query2 === void 0 ? void 0 : _req$query2.type;
            whereCondition = {};
            if (type) {
              whereCondition.type = type;
            }
            _context9.next = 5;
            return _models.db.blog.findAll({
              where: whereCondition,
              order: [["createdAt", "DESC"]],
              attributes: {
                exclude: ["content"]
              },
              include: [{
                model: _models.db.user,
                attributes: ["id", "firstName", "lastName"],
                required: false
              }]
            });
          case 5:
            blogList = _context9.sent;
            return _context9.abrupt("return", res.status(200).json({
              ok: true,
              data: blogList
            }));
          case 7:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfc2VxdWVsaXplIiwicmVxdWlyZSIsIl9tb2RlbHMiLCJvd25LZXlzIiwib2JqZWN0IiwiZW51bWVyYWJsZU9ubHkiLCJrZXlzIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwic3ltYm9scyIsImZpbHRlciIsInN5bSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJwdXNoIiwiYXBwbHkiLCJfb2JqZWN0U3ByZWFkIiwidGFyZ2V0IiwiaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInNvdXJjZSIsImZvckVhY2giLCJrZXkiLCJfZGVmaW5lUHJvcGVydHkyIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsImRlZmluZVByb3BlcnRpZXMiLCJkZWZpbmVQcm9wZXJ0eSIsImdlbmVyYXRlQ29kZSIsImxldHRlcnMiLCJudW1iZXJzIiwiY29kZSIsImNoYXJBdCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIl9kZWZhdWx0IiwiYWRkQmxvZyIsInJlcSIsInJlcyIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsImRiIiwiYmxvZyIsImNyZWF0ZSIsImJvZHkiLCJzbHVnIiwidGltZV9jcmVhdGVkIiwiRGF0ZSIsInRvU3RyaW5nIiwiZGlzY291bnQiLCJwaG90byIsImltYWdlIiwiY29udGVudCIsImRlc2MiLCJhYnJ1cHQiLCJzdGF0dXMiLCJqc29uIiwib2siLCJ0MCIsImNvbnNvbGUiLCJsb2ciLCJzdG9wIiwidXBkYXRlQmxvZyIsIl9jYWxsZWUyIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwidXBkYXRlIiwid2hlcmUiLCJpZCIsImdldExpc3RCbG9nIiwiX2NhbGxlZTMiLCJfcmVxJHF1ZXJ5IiwidHlwZSIsIndoZXJlQ29uZGl0aW9uIiwiYmxvZ0xpc3QiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJxdWVyeSIsImZpbmRBbGwiLCJvcmRlciIsImF0dHJpYnV0ZXMiLCJleGNsdWRlIiwic2VudCIsImRhdGEiLCJnZXRMaXN0U3VnZ2VzdFRvdXIiLCJfY2FsbGVlNCIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsImxpbWl0Iiwic3VjY2VzcyIsImdldExpc3RCbG9nQ2F0ZWdvcnkiLCJfY2FsbGVlNSIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsImdldERldGFpbEJsb2dDYXRlZ29yeSIsIl9jYWxsZWU2IiwiX2Jsb2dMaXN0IiwiX2NhbGxlZTYkIiwiX2NvbnRleHQ2IiwiT3AiLCJvciIsImdldEJsb2dEZXRhaWwiLCJfY2FsbGVlNyIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsImluY2x1ZGUiLCJtb2RlbCIsInVzZXIiLCJyZXF1aXJlZCIsImRlbGV0ZVRvdXIiLCJfY2FsbGVlOCIsIl9jYWxsZWU4JCIsIl9jb250ZXh0OCIsImRlc3Ryb3kiLCJnZXRMaXN0QmxvZ0FkbWluIiwiX2NhbGxlZTkiLCJfcmVxJHF1ZXJ5MiIsIl9jYWxsZWU5JCIsIl9jb250ZXh0OSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy9ibG9nL2Jsb2cuY29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcCB9IGZyb20gXCJzZXF1ZWxpemVcIjtcclxuaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzXCI7XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZUNvZGUoKSB7XHJcbiAgY29uc3QgbGV0dGVycyA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpcIjtcclxuICBjb25zdCBudW1iZXJzID0gXCIwMTIzNDU2Nzg5XCI7XHJcblxyXG4gIGxldCBjb2RlID0gXCJcIjtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgIGNvZGUgKz0gbGV0dGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGV0dGVycy5sZW5ndGgpKTtcclxuICB9XHJcblxyXG4gIGNvZGUgKz0gXCItXCI7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICBpZiAoaSA9PT0gMikge1xyXG4gICAgICBjb2RlICs9IFwiLVwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29kZSArPSBsZXR0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZXR0ZXJzLmxlbmd0aCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29kZSArPSBcIi1cIjtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgIGlmIChpID09PSAzKSB7XHJcbiAgICAgIGNvZGUgKz0gXCItXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb2RlICs9IG51bWJlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG51bWJlcnMubGVuZ3RoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb2RlICs9IFwiLVwiO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgY29kZSArPSBsZXR0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZXR0ZXJzLmxlbmd0aCkpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGNvZGU7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBhc3luYyBhZGRCbG9nKHJlcSwgcmVzKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBkYi5ibG9nLmNyZWF0ZSh7XHJcbiAgICAgICAgLi4ucmVxLmJvZHksXHJcbiAgICAgICAgc2x1ZzogXCJcIixcclxuICAgICAgICB0aW1lX2NyZWF0ZWQ6IG5ldyBEYXRlKCkudG9TdHJpbmcoKSxcclxuICAgICAgICBkaXNjb3VudDogMCxcclxuICAgICAgICBwaG90bzogcmVxLmJvZHkuaW1hZ2UsXHJcbiAgICAgICAgY29udGVudDogcmVxLmJvZHkuY29udGVudCxcclxuICAgICAgICBkZXNjOiByZXEuYm9keS5kZXNjLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBvazogZmFsc2UgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyB1cGRhdGVCbG9nKHJlcSwgcmVzKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCBkYi5ibG9nLnVwZGF0ZShcclxuICAgICAgICB7IC4uLnJlcS5ib2R5IH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgaWQ6IHJlcS5ib2R5LmlkLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBvazogZmFsc2UgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgZ2V0TGlzdEJsb2cocmVxLCByZXMpIHtcclxuICAgIGNvbnN0IHR5cGUgPSByZXEucXVlcnk/LnR5cGU7XHJcbiAgICBjb25zdCB3aGVyZUNvbmRpdGlvbiA9IHt9O1xyXG4gICAgaWYgKHR5cGUpIHtcclxuICAgICAgd2hlcmVDb25kaXRpb24udHlwZSA9IHR5cGU7XHJcbiAgfVxyXG4gICAgY29uc3QgYmxvZ0xpc3QgPSBhd2FpdCBkYi5ibG9nLmZpbmRBbGwoe1xyXG4gICAgICB3aGVyZTogd2hlcmVDb25kaXRpb24sXHJcbiAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXHJcbiAgICAgIGF0dHJpYnV0ZXM6IHsgZXhjbHVkZTogW1wiY29udGVudFwiXSB9LFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogYmxvZ0xpc3QgfSk7XHJcbiAgfSxcclxuICBhc3luYyBnZXRMaXN0U3VnZ2VzdFRvdXIocmVxLCByZXMpIHtcclxuICAgIGNvbnN0IGJsb2dMaXN0ID0gYXdhaXQgZGIuYmxvZy5maW5kQWxsKHtcclxuICAgICAgbGltaXQ6IDQsXHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGJsb2dMaXN0IH0pO1xyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0TGlzdEJsb2dDYXRlZ29yeShyZXEsIHJlcykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgYmxvZ0xpc3QgPSBhd2FpdCBkYi5ibG9nLmZpbmRBbGwoe1xyXG4gICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICB0eXBlOiByZXEucXVlcnkudHlwZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF0dHJpYnV0ZXM6IHsgZXhjbHVkZTogW1wiY29udGVudFwiXSB9LFxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIGRhdGE6IGJsb2dMaXN0IH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBvazogZmFsc2UgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyBnZXREZXRhaWxCbG9nQ2F0ZWdvcnkocmVxLCByZXMpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmIChyZXEucXVlcnkudHlwZSA9PSAxNSkge1xyXG4gICAgICAgIGNvbnN0IGJsb2dMaXN0ID0gYXdhaXQgZGIuYmxvZy5maW5kQWxsKHtcclxuICAgICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IHtcclxuICAgICAgICAgICAgICBbT3Aub3JdOiBbNSwgMTRdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGF0dHJpYnV0ZXM6IHsgZXhjbHVkZTogW1wiY29udGVudFwiXSB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlLCBkYXRhOiBibG9nTGlzdCB9KTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBibG9nTGlzdCA9IGF3YWl0IGRiLmJsb2cuZmluZEFsbCh7XHJcbiAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgIHR5cGU6IHJlcS5xdWVyeS50eXBlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gYXR0cmlidXRlczoge2V4Y2x1ZGU6IFsnY29udGVudCddfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIGRhdGE6IGJsb2dMaXN0IH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBvazogZmFsc2UgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyBnZXRCbG9nRGV0YWlsKHJlcSwgcmVzKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBibG9nTGlzdCA9IGF3YWl0IGRiLmJsb2cuZmluZEFsbCh7XHJcbiAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgIGlkOiByZXEucXVlcnkuaWQsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZGVsOiBkYi51c2VyLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImZpcnN0TmFtZVwiLCBcImxhc3ROYW1lXCJdLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogYmxvZ0xpc3QgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG9rOiBmYWxzZSB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFzeW5jIGRlbGV0ZVRvdXIocmVxLCByZXMpIHtcclxuICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5ib2R5O1xyXG4gICAgZGIuYmxvZy5kZXN0cm95KHtcclxuICAgICAgd2hlcmU6IHtcclxuICAgICAgICBpZDogaWQsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlIH0pO1xyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0TGlzdEJsb2dBZG1pbihyZXEsIHJlcykge1xyXG4gICAgY29uc3QgdHlwZT0gcmVxLnF1ZXJ5Py50eXBlXHJcbiAgICBjb25zdCB3aGVyZUNvbmRpdGlvbiA9IHt9O1xyXG4gICAgaWYgKHR5cGUpIHtcclxuICAgICAgICB3aGVyZUNvbmRpdGlvbi50eXBlID0gdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBibG9nTGlzdCA9IGF3YWl0IGRiLmJsb2cuZmluZEFsbCh7XHJcbiAgICAgIHdoZXJlOiB3aGVyZUNvbmRpdGlvbixcclxuICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcclxuICAgICAgYXR0cmlidXRlczogeyBleGNsdWRlOiBbXCJjb250ZW50XCJdIH0sXHJcbiAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBtb2RlbDogZGIudXNlcixcclxuICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiZmlyc3ROYW1lXCIsIFwibGFzdE5hbWVcIl0sXHJcbiAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIGRhdGE6IGJsb2dMaXN0IH0pO1xyXG4gIH0sXHJcbn07XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUFBLFVBQUEsR0FBQUMsT0FBQTtBQUNBLElBQUFDLE9BQUEsR0FBQUQsT0FBQTtBQUFxQyxTQUFBRSxRQUFBQyxNQUFBLEVBQUFDLGNBQUEsUUFBQUMsSUFBQSxHQUFBQyxNQUFBLENBQUFELElBQUEsQ0FBQUYsTUFBQSxPQUFBRyxNQUFBLENBQUFDLHFCQUFBLFFBQUFDLE9BQUEsR0FBQUYsTUFBQSxDQUFBQyxxQkFBQSxDQUFBSixNQUFBLEdBQUFDLGNBQUEsS0FBQUksT0FBQSxHQUFBQSxPQUFBLENBQUFDLE1BQUEsV0FBQUMsR0FBQSxXQUFBSixNQUFBLENBQUFLLHdCQUFBLENBQUFSLE1BQUEsRUFBQU8sR0FBQSxFQUFBRSxVQUFBLE9BQUFQLElBQUEsQ0FBQVEsSUFBQSxDQUFBQyxLQUFBLENBQUFULElBQUEsRUFBQUcsT0FBQSxZQUFBSCxJQUFBO0FBQUEsU0FBQVUsY0FBQUMsTUFBQSxhQUFBQyxDQUFBLE1BQUFBLENBQUEsR0FBQUMsU0FBQSxDQUFBQyxNQUFBLEVBQUFGLENBQUEsVUFBQUcsTUFBQSxXQUFBRixTQUFBLENBQUFELENBQUEsSUFBQUMsU0FBQSxDQUFBRCxDQUFBLFFBQUFBLENBQUEsT0FBQWYsT0FBQSxDQUFBSSxNQUFBLENBQUFjLE1BQUEsT0FBQUMsT0FBQSxXQUFBQyxHQUFB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