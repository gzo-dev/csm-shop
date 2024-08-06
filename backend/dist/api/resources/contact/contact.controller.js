"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mailer = _interopRequireDefault(require("../../../mailer"));
var _models = require("../../../models");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  submit_contact: function submit_contact(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var _req$body, _req$body2;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _models.db.contact.create(_objectSpread(_objectSpread({}, req.body), {}, {
              type: (_req$body = req.body) !== null && _req$body !== void 0 && _req$body.type ? (_req$body2 = req.body) === null || _req$body2 === void 0 ? void 0 : _req$body2.type : "",
              product: req.body.product ? req.body.product : " "
            }));
            return _context.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  delete_contact: function delete_contact(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var contactId;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            contactId = req.body.contactId;
            _models.db.contact.destroy({
              where: {
                id: contactId
              }
            });
            return _context2.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 3:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  },
  reply_contact: function reply_contact(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var _req$body3, email, content, contactId, replyText, user_reply;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _req$body3 = req.body, email = _req$body3.email, content = _req$body3.content, contactId = _req$body3.contactId, replyText = _req$body3.replyText, user_reply = _req$body3.user_reply;
            _mailer["default"].replyContact(email, content).then(function () {
              _models.db.contact.update({
                status: "replied",
                reply_text: replyText,
                user_reply: user_reply
              }, {
                where: {
                  id: contactId
                }
              });
              return res.status(200).json({
                ok: true
              });
            })["catch"](function (e) {
              return res.status(200).json({
                ok: false
              });
            });
          case 2:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }))();
  },
  get_list_contact: function get_list_contact(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var contactList;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models.db.contact.findAll({
              order: [['createdAt', 'DESC']]
            });
          case 2:
            contactList = _context4.sent;
            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              data: contactList
            }));
          case 4:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbWFpbGVyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfbW9kZWxzIiwib3duS2V5cyIsIm9iamVjdCIsImVudW1lcmFibGVPbmx5Iiwia2V5cyIsIk9iamVjdCIsImdldE93blByb3BlcnR5U3ltYm9scyIsInN5bWJvbHMiLCJmaWx0ZXIiLCJzeW0iLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwicHVzaCIsImFwcGx5IiwiX29iamVjdFNwcmVhZCIsInRhcmdldCIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzb3VyY2UiLCJmb3JFYWNoIiwia2V5IiwiX2RlZmluZVByb3BlcnR5MiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiZGVmaW5lUHJvcGVydHkiLCJfZGVmYXVsdCIsInN1Ym1pdF9jb250YWN0IiwicmVxIiwicmVzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJfcmVxJGJvZHkiLCJfcmVxJGJvZHkyIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsImRiIiwiY29udGFjdCIsImNyZWF0ZSIsImJvZHkiLCJ0eXBlIiwicHJvZHVjdCIsImFicnVwdCIsInN0YXR1cyIsImpzb24iLCJvayIsInN0b3AiLCJkZWxldGVfY29udGFjdCIsIl9jYWxsZWUyIiwiY29udGFjdElkIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiZGVzdHJveSIsIndoZXJlIiwiaWQiLCJyZXBseV9jb250YWN0IiwiX2NhbGxlZTMiLCJfcmVxJGJvZHkzIiwiZW1haWwiLCJjb250ZW50IiwicmVwbHlUZXh0IiwidXNlcl9yZXBseSIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsIm1haWxlciIsInJlcGx5Q29udGFjdCIsInRoZW4iLCJ1cGRhdGUiLCJyZXBseV90ZXh0IiwiZSIsImdldF9saXN0X2NvbnRhY3QiLCJfY2FsbGVlNCIsImNvbnRhY3RMaXN0IiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwiZmluZEFsbCIsIm9yZGVyIiwic2VudCIsImRhdGEiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvY29udGFjdC9jb250YWN0LmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1haWxlciBmcm9tIFwiLi4vLi4vLi4vbWFpbGVyXCJcclxuaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGFzeW5jIHN1Ym1pdF9jb250YWN0KHJlcSwgcmVzKSB7XHJcbiAgICAgICAgZGIuY29udGFjdC5jcmVhdGUoe1xyXG4gICAgICAgICAgICAuLi5yZXEuYm9keSwgdHlwZTogcmVxLmJvZHk/LnR5cGUgPyByZXEuYm9keT8udHlwZSA6IFwiXCIsIHByb2R1Y3Q6IHJlcS5ib2R5LnByb2R1Y3QgPyByZXEuYm9keS5wcm9kdWN0IDogXCIgXCJcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe29rOiB0cnVlfSlcclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgZGVsZXRlX2NvbnRhY3QocmVxLCByZXMpIHtcclxuICAgICAgICBjb25zdCB7Y29udGFjdElkIH09IHJlcS5ib2R5XHJcbiAgICAgICAgZGIuY29udGFjdC5kZXN0cm95KHtcclxuICAgICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgICAgIGlkOiBjb250YWN0SWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtvazogdHJ1ZX0pXHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIHJlcGx5X2NvbnRhY3QocmVxLCByZXMpIHtcclxuICAgICAgICBjb25zdCB7ZW1haWwsIGNvbnRlbnQsIGNvbnRhY3RJZCwgcmVwbHlUZXh0LCB1c2VyX3JlcGx5fT0gcmVxLmJvZHlcclxuICAgICAgICBtYWlsZXIucmVwbHlDb250YWN0KGVtYWlsLCBjb250ZW50KVxyXG4gICAgICAgIC50aGVuKCgpPT4ge1xyXG4gICAgICAgICAgICBkYi5jb250YWN0LnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFwicmVwbGllZFwiLCBcclxuICAgICAgICAgICAgICAgIHJlcGx5X3RleHQ6IHJlcGx5VGV4dCxcclxuICAgICAgICAgICAgICAgIHVzZXJfcmVwbHlcclxuICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICB3aGVyZToge2lkOiBjb250YWN0SWR9XHJcbiAgICAgICAgICAgIH0sIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe29rOiB0cnVlfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe29rOiBmYWxzZX0pXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBhc3luYyBnZXRfbGlzdF9jb250YWN0KHJlcSwgcmVzKSB7XHJcbiAgICAgICAgY29uc3QgY29udGFjdExpc3Q9IGF3YWl0IGRiLmNvbnRhY3QuZmluZEFsbCh7XHJcbiAgICAgICAgICAgIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7b2s6IHRydWUsIGRhdGE6IGNvbnRhY3RMaXN0fSlcclxuXHJcbiAgICB9XHJcbn0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxPQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxPQUFBLEdBQUFELE9B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