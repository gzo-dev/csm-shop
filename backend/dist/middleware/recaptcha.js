"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var axios = require('axios');
var recaptchaMiddleware = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var recaptchaToken, secretKey, response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          recaptchaToken = req.body.recaptchaToken;
          console.log(recaptchaToken);
          if (recaptchaToken) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: 'reCAPTCHA token is missing'
          }));
        case 4:
          _context.prev = 4;
          secretKey = process.env.GOOGLE_RECAPTCHA_SECRET_KEY;
          _context.next = 8;
          return axios.post("https://www.google.com/recaptcha/api/siteverify?secret=".concat(secretKey, "&response=").concat(recaptchaToken));
        case 8:
          response = _context.sent;
          console.log(response.data);
          if (response.data.success) {
            _context.next = 12;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: 'Invalid reCAPTCHA'
          }));
        case 12:
          next();
          _context.next = 18;
          break;
        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](4);
          return _context.abrupt("return", res.status(500).json({
            error: 'Internal server error'
          }));
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 15]]);
  }));
  return function recaptchaMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = recaptchaMiddleware;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJheGlvcyIsInJlcXVpcmUiLCJyZWNhcHRjaGFNaWRkbGV3YXJlIiwiX3JlZiIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwicmVxIiwicmVzIiwibmV4dCIsInJlY2FwdGNoYVRva2VuIiwic2VjcmV0S2V5IiwicmVzcG9uc2UiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJib2R5IiwiY29uc29sZSIsImxvZyIsImFicnVwdCIsInN0YXR1cyIsImpzb24iLCJlcnJvciIsInByb2Nlc3MiLCJlbnYiLCJHT09HTEVfUkVDQVBUQ0hBX1NFQ1JFVF9LRVkiLCJwb3N0IiwiY29uY2F0Iiwic2VudCIsImRhdGEiLCJzdWNjZXNzIiwidDAiLCJzdG9wIiwiX3giLCJfeDIiLCJfeDMiLCJhcHBseSIsImFyZ3VtZW50cyIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvbWlkZGxld2FyZS9yZWNhcHRjaGEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpO1xyXG5cclxuY29uc3QgcmVjYXB0Y2hhTWlkZGxld2FyZSA9IGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gIGNvbnN0IHsgcmVjYXB0Y2hhVG9rZW4gfSA9IHJlcS5ib2R5O1xyXG4gICAgY29uc29sZS5sb2cocmVjYXB0Y2hhVG9rZW4gICAgKVxyXG4gIGlmICghcmVjYXB0Y2hhVG9rZW4pIHtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAncmVDQVBUQ0hBIHRva2VuIGlzIG1pc3NpbmcnIH0pO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHNlY3JldEtleSA9IHByb2Nlc3MuZW52LkdPT0dMRV9SRUNBUFRDSEFfU0VDUkVUX0tFWTtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MucG9zdChcclxuICAgICAgYGh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vcmVjYXB0Y2hhL2FwaS9zaXRldmVyaWZ5P3NlY3JldD0ke3NlY3JldEtleX0mcmVzcG9uc2U9JHtyZWNhcHRjaGFUb2tlbn1gXHJcbiAgICApO1xyXG4gICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSlcclxuICAgIGlmICghcmVzcG9uc2UuZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnSW52YWxpZCByZUNBUFRDSEEnIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5leHQoKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6ICdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVjYXB0Y2hhTWlkZGxld2FyZTtcclxuIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQU1BLEtBQUssR0FBR0MsT0FBTyxDQUFDLE9BQU8sQ0FBQztBQUU5QixJQUFNQyxtQkFBbUI7RUFBQSxJQUFBQyxJQUFBLE9BQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsQ0FBRyxTQUFBQyxRQUFPQyxHQUFHLEVBQUVDLEdBQUcsRUFBRUMsSUFBSTtJQUFBLElBQUFDLGNBQUEsRUFBQUMsU0FBQSxFQUFBQyxRQUFBO0lBQUEsT0FBQVIsWUFBQSxZQUFBUyxJQUFBLFVBQUFDLFNBQUFDLFFBQUE7TUFBQSxrQkFBQUEsUUFBQSxDQUFBQyxJQUFBLEdBQUFELFFBQUEsQ0FBQU4sSUFBQTtRQUFBO1VBQ3ZDQyxjQUFjLEdBQUtILEdBQUcsQ0FBQ1UsSUFBSSxDQUEzQlAsY0FBYztVQUNwQlEsT0FBTyxDQUFDQyxHQUFHLENBQUNULGNBQWtCLENBQUM7VUFBQSxJQUM1QkEsY0FBYztZQUFBSyxRQUFBLENBQUFOLElBQUE7WUFBQTtVQUFBO1VBQUEsT0FBQU0sUUFBQSxDQUFBSyxNQUFBLFdBQ1ZaLEdBQUcsQ0FBQ2EsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFBRUMsS0FBSyxFQUFFO1VBQTZCLENBQUMsQ0FBQztRQUFBO1VBQUFSLFFBQUEsQ0FBQUMsSUFBQTtVQUk5REwsU0FBUyxHQUFHYSxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsMkJBQTJCO1VBQUFYLFFBQUEsQ0FBQU4sSUFBQTtVQUFBLE9BQ2xDVixLQUFLLENBQUM0QixJQUFJLDJEQUFBQyxNQUFBLENBQzJCakIsU0FBUyxnQkFBQWlCLE1BQUEsQ0FBYWxCLGNBQWMsQ0FDaEcsQ0FBQztRQUFBO1VBRktFLFFBQVEsR0FBQUcsUUFBQSxDQUFBYyxJQUFBO1VBR2RYLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDUCxRQUFRLENBQUNrQixJQUFJLENBQUM7VUFBQSxJQUNyQmxCLFFBQVEsQ0FBQ2tCLElBQUksQ0FBQ0MsT0FBTztZQUFBaEIsUUFBQSxDQUFBTixJQUFBO1lBQUE7VUFBQTtVQUFBLE9BQUFNLFFBQUEsQ0FBQUssTUFBQSxXQUNqQlosR0FBRyxDQUFDYSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztZQUFFQyxLQUFLLEVBQUU7VUFBb0IsQ0FBQyxDQUFDO1FBQUE7VUFHN0RkLElBQUksQ0FBQyxDQUFDO1VBQUNNLFFBQUEsQ0FBQU4sSUFBQTtVQUFBO1FBQUE7VUFBQU0sUUFBQSxDQUFBQyxJQUFBO1VBQUFELFFBQUEsQ0FBQWlCLEVBQUEsR0FBQWpCLFFBQUE7VUFBQSxPQUFBQSxRQUFBLENBQUFLLE1BQUEsV0FFQVosR0FBRyxDQUFDYSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztZQUFFQyxLQUFLLEVBQUU7VUFBd0IsQ0FBQyxDQUFDO1FBQUE7UUFBQTtVQUFBLE9BQUFSLFFBQUEsQ0FBQWtCLElBQUE7TUFBQTtJQUFBLEdBQUEzQixPQUFBO0VBQUEsQ0FFbEU7RUFBQSxnQkFyQktMLG1CQUFtQkEsQ0FBQWlDLEVBQUEsRUFBQUMsR0FBQSxFQUFBQyxHQUFBO0lBQUEsT0FBQWxDLElBQUEsQ0FBQW1DLEtBQUEsT0FBQUMsU0FBQTtFQUFBO0FBQUEsR0FxQnhCO0FBRURDLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHdkMsbUJBQW1CIn0=