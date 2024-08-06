"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
require("dotenv/config");
var _models = require("./models");
var _api = require("./api");
var _config2 = _interopRequireDefault(require("./config"));
var _app = _interopRequireDefault(require("./app"));
require("./errors");
var _scheduler = _interopRequireDefault(require("./scheduler"));
var _path = _interopRequireDefault(require("path"));
var _cors = _interopRequireDefault(require("cors"));
var _http = _interopRequireDefault(require("http"));
var _socket = require("socket.io");
var _expressRateLimit = require("express-rate-limit");
// import kue from './kue';

global.appRoot = _path["default"].resolve(__dirname);
var PORT = _config2["default"].app.port;
var app = _app["default"].setup(_config2["default"]);
var server = _http["default"].createServer(app);
// Khởi tạo Socket.IO server và chạy trên cùng một HTTP server
var io = new _socket.Server(server);
/*cors handling*/
var limiter = (0, _expressRateLimit.rateLimit)({
  windowMs: 1 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: "Bạn đã gửi quá nhiều yêu cầu, Vui lòng thử lại sau vài phút"
});
app.use(limiter);
app.use((0, _cors["default"])({
  origin: true,
  credentials: true
}));
app.options("*", (0, _cors["default"])());

/* Route handling */
app.use("/api", _api.restRouter);
// app.use('/', webRouter);

io.on("connection", function (socket) {
  console.log("New client connected: ".concat(socket.id));

  // Xử lý khi nhận được tin nhắn từ client
  socket.on("message", function (data) {
    console.log("Received message from client ".concat(socket.id, ": ").concat(data));

    // Gửi tin nhắn trả lại cho client
    socket.emit("response", "Message received!");
  });
  socket.on("join_room", /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
      var roomId;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            roomId = data.roomId;
            socket.join(roomId);
            // const sockets = await io.in(roomId).fetchSockets();
            // console.log(sockets)
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  socket.on("back_to_web", /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
      var roomId, to;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            roomId = data.roomId, to = data.to;
            io.to(roomId).emit('to_website', data);
          case 2:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());

  // Xử lý khi client ngắt kết nối
  socket.on("disconnect", function () {
    console.log("Client disconnected: ".concat(socket.id));
  });
});
app.use(function (error, req, res, next) {
  if (!(error instanceof RequestError)) {
    error = new RequestError("Some Error Occurred", 500, error.message);
  }
  error.status = error.status || 500;
  res.status(error.status);
  var contype = req.headers["content-type"];
  var json = !(!contype || contype.indexOf("application/json") !== 0);
  if (json) {
    return res.json({
      errors: error.errorList
    });
  } else {
    res.render(error.status.toString(), {
      layout: null
    });
  }
});

// kue.init();
/* Database Connection */
_models.db.sequelize.authenticate().then(function () {
  console.log("Nice! Database looks fine");
  _scheduler["default"].init();
})["catch"](function (err) {
  console.log(err, "Something went wrong with the Database Update!");
});

/* Start Listening service */
server.listen(4001, function () {
  console.log("Server is running at PORT http://localhost:".concat(4001));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZXF1aXJlIiwiX21vZGVscyIsIl9hcGkiLCJfY29uZmlnMiIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJfYXBwIiwiX3NjaGVkdWxlciIsIl9wYXRoIiwiX2NvcnMiLCJfaHR0cCIsIl9zb2NrZXQiLCJfZXhwcmVzc1JhdGVMaW1pdCIsImdsb2JhbCIsImFwcFJvb3QiLCJwYXRoIiwicmVzb2x2ZSIsIl9fZGlybmFtZSIsIlBPUlQiLCJjb25maWciLCJhcHAiLCJwb3J0IiwiYXBwTWFuYWdlciIsInNldHVwIiwic2VydmVyIiwiaHR0cCIsImNyZWF0ZVNlcnZlciIsImlvIiwiU2VydmVyIiwibGltaXRlciIsInJhdGVMaW1pdCIsIndpbmRvd01zIiwibGltaXQiLCJzdGFuZGFyZEhlYWRlcnMiLCJsZWdhY3lIZWFkZXJzIiwibWVzc2FnZSIsInVzZSIsImNvcnMiLCJvcmlnaW4iLCJjcmVkZW50aWFscyIsIm9wdGlvbnMiLCJyZXN0Um91dGVyIiwib24iLCJzb2NrZXQiLCJjb25zb2xlIiwibG9nIiwiY29uY2F0IiwiaWQiLCJkYXRhIiwiZW1pdCIsIl9yZWYiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsInJvb21JZCIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJqb2luIiwic3RvcCIsIl94IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfcmVmMiIsIl9jYWxsZWUyIiwidG8iLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJfeDIiLCJlcnJvciIsInJlcSIsInJlcyIsIlJlcXVlc3RFcnJvciIsInN0YXR1cyIsImNvbnR5cGUiLCJoZWFkZXJzIiwianNvbiIsImluZGV4T2YiLCJlcnJvcnMiLCJlcnJvckxpc3QiLCJyZW5kZXIiLCJ0b1N0cmluZyIsImxheW91dCIsImRiIiwic2VxdWVsaXplIiwiYXV0aGVudGljYXRlIiwidGhlbiIsInNjaGVkdWxlciIsImluaXQiLCJlcnIiLCJsaXN0ZW4iXSwic291cmNlcyI6WyIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiZG90ZW52L2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBkYiB9IGZyb20gXCIuL21vZGVsc1wiO1xyXG5pbXBvcnQgeyByZXN0Um91dGVyIH0gZnJvbSBcIi4vYXBpXCI7XHJcbmltcG9ydCBjb25maWcgZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCBhcHBNYW5hZ2VyIGZyb20gXCIuL2FwcFwiO1xyXG4vLyBpbXBvcnQga3VlIGZyb20gJy4va3VlJztcclxuaW1wb3J0IFwiLi9lcnJvcnNcIjtcclxuaW1wb3J0IHNjaGVkdWxlciBmcm9tIFwiLi9zY2hlZHVsZXJcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IGNvcnMgZnJvbSBcImNvcnNcIjtcclxuaW1wb3J0IGh0dHAgZnJvbSBcImh0dHBcIjtcclxuaW1wb3J0IHsgU2VydmVyIH0gZnJvbSBcInNvY2tldC5pb1wiO1xyXG5pbXBvcnQgeyByYXRlTGltaXQgfSBmcm9tICdleHByZXNzLXJhdGUtbGltaXQnXHJcbmdsb2JhbC5hcHBSb290ID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSk7XHJcblxyXG5jb25zdCBQT1JUID0gY29uZmlnLmFwcC5wb3J0O1xyXG5jb25zdCBhcHAgPSBhcHBNYW5hZ2VyLnNldHVwKGNvbmZpZyk7XHJcbmNvbnN0IHNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFwcCk7XHJcbi8vIEto4bufaSB04bqhbyBTb2NrZXQuSU8gc2VydmVyIHbDoCBjaOG6oXkgdHLDqm4gY8O5bmcgbeG7mXQgSFRUUCBzZXJ2ZXJcclxuY29uc3QgaW8gPSBuZXcgU2VydmVyKHNlcnZlcik7XHJcbi8qY29ycyBoYW5kbGluZyovXHJcbmNvbnN0IGxpbWl0ZXIgPSByYXRlTGltaXQoe1xyXG5cdHdpbmRvd01zOiAxICogNjAgKiAxMDAwLFxyXG5cdGxpbWl0OiAxMDAsIFxyXG5cdHN0YW5kYXJkSGVhZGVyczogJ2RyYWZ0LTcnLCBcclxuXHRsZWdhY3lIZWFkZXJzOiBmYWxzZSwgXHJcbiAgbWVzc2FnZTogXCJC4bqhbiDEkcOjIGfhu61pIHF1w6Egbmhp4buBdSB5w6p1IGPhuqd1LCBWdWkgbMOybmcgdGjhu60gbOG6oWkgc2F1IHbDoGkgcGjDunRcIlxyXG59KVxyXG5cclxuYXBwLnVzZShsaW1pdGVyKVxyXG5cclxuYXBwLnVzZShcclxuICBjb3JzKHtcclxuICAgIG9yaWdpbjogdHJ1ZSxcclxuICAgIGNyZWRlbnRpYWxzOiB0cnVlLFxyXG4gIH0pXHJcbik7XHJcbmFwcC5vcHRpb25zKFwiKlwiLCBjb3JzKCkpO1xyXG5cclxuLyogUm91dGUgaGFuZGxpbmcgKi9cclxuYXBwLnVzZShcIi9hcGlcIiwgcmVzdFJvdXRlcik7XHJcbi8vIGFwcC51c2UoJy8nLCB3ZWJSb3V0ZXIpO1xyXG5cclxuaW8ub24oXCJjb25uZWN0aW9uXCIsIChzb2NrZXQpID0+IHtcclxuICBjb25zb2xlLmxvZyhgTmV3IGNsaWVudCBjb25uZWN0ZWQ6ICR7c29ja2V0LmlkfWApO1xyXG5cclxuICAvLyBY4butIGzDvSBraGkgbmjhuq1uIMSRxrDhu6NjIHRpbiBuaOG6r24gdOG7qyBjbGllbnRcclxuICBzb2NrZXQub24oXCJtZXNzYWdlXCIsIChkYXRhKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhgUmVjZWl2ZWQgbWVzc2FnZSBmcm9tIGNsaWVudCAke3NvY2tldC5pZH06ICR7ZGF0YX1gKTtcclxuXHJcbiAgICAvLyBH4butaSB0aW4gbmjhuq9uIHRy4bqjIGzhuqFpIGNobyBjbGllbnRcclxuICAgIHNvY2tldC5lbWl0KFwicmVzcG9uc2VcIiwgXCJNZXNzYWdlIHJlY2VpdmVkIVwiKTtcclxuICB9KTtcclxuICBzb2NrZXQub24oXCJqb2luX3Jvb21cIiwgYXN5bmMgKGRhdGEpPT4ge1xyXG5cdGNvbnN0IHtyb29tSWQgfT0gZGF0YVxyXG5cdHNvY2tldC5qb2luKHJvb21JZClcclxuXHQvLyBjb25zdCBzb2NrZXRzID0gYXdhaXQgaW8uaW4ocm9vbUlkKS5mZXRjaFNvY2tldHMoKTtcclxuXHQvLyBjb25zb2xlLmxvZyhzb2NrZXRzKVxyXG4gIH0pXHJcbiAgc29ja2V0Lm9uKFwiYmFja190b193ZWJcIiwgYXN5bmMgKGRhdGEpPT4ge1xyXG5cdGNvbnN0IHtyb29tSWQsIHRvfT0gZGF0YVxyXG5cdGlvLnRvKHJvb21JZCkuZW1pdCgndG9fd2Vic2l0ZScsIGRhdGEpO1xyXG4gIH0pXHJcblxyXG4gIC8vIFjhu60gbMO9IGtoaSBjbGllbnQgbmfhuq90IGvhur90IG7hu5FpXHJcbiAgc29ja2V0Lm9uKFwiZGlzY29ubmVjdFwiLCAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhgQ2xpZW50IGRpc2Nvbm5lY3RlZDogJHtzb2NrZXQuaWR9YCk7XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuYXBwLnVzZSgoZXJyb3IsIHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcbiAgaWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBSZXF1ZXN0RXJyb3IpKSB7XHJcbiAgICBlcnJvciA9IG5ldyBSZXF1ZXN0RXJyb3IoXCJTb21lIEVycm9yIE9jY3VycmVkXCIsIDUwMCwgZXJyb3IubWVzc2FnZSk7XHJcbiAgfVxyXG4gIGVycm9yLnN0YXR1cyA9IGVycm9yLnN0YXR1cyB8fCA1MDA7XHJcbiAgcmVzLnN0YXR1cyhlcnJvci5zdGF0dXMpO1xyXG4gIGxldCBjb250eXBlID0gcmVxLmhlYWRlcnNbXCJjb250ZW50LXR5cGVcIl07XHJcbiAgdmFyIGpzb24gPSAhKCFjb250eXBlIHx8IGNvbnR5cGUuaW5kZXhPZihcImFwcGxpY2F0aW9uL2pzb25cIikgIT09IDApO1xyXG4gIGlmIChqc29uKSB7XHJcbiAgICByZXR1cm4gcmVzLmpzb24oeyBlcnJvcnM6IGVycm9yLmVycm9yTGlzdCB9KTsgICBcclxuICB9IGVsc2Uge1xyXG4gICAgcmVzLnJlbmRlcihlcnJvci5zdGF0dXMudG9TdHJpbmcoKSwgeyBsYXlvdXQ6IG51bGwgfSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vIGt1ZS5pbml0KCk7XHJcbi8qIERhdGFiYXNlIENvbm5lY3Rpb24gKi9cclxuZGIuc2VxdWVsaXplXHJcbiAgLmF1dGhlbnRpY2F0ZSgpIFxyXG4gIC50aGVuKGZ1bmN0aW9uICgpIHsgXHJcbiAgICBjb25zb2xlLmxvZyhcIk5pY2UhIERhdGFiYXNlIGxvb2tzIGZpbmVcIik7XHJcbiAgICBzY2hlZHVsZXIuaW5pdCgpO1xyXG4gIH0pXHJcbiAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgIGNvbnNvbGUubG9nKGVyciwgXCJTb21ldGhpbmcgd2VudCB3cm9uZyB3aXRoIHRoZSBEYXRhYmFzZSBVcGRhdGUhXCIpO1xyXG4gIH0pO1xyXG5cclxuLyogU3RhcnQgTGlzdGVuaW5nIHNlcnZpY2UgKi9cclxuc2VydmVyLmxpc3Rlbig0MDAxLCAoKSA9PiB7XHJcbiAgY29uc29sZS5sb2coYFNlcnZlciBpcyBydW5uaW5nIGF0IFBPUlQgaHR0cDovL2xvY2FsaG9zdDokezQwMDF9YCk7XHJcbn0pO1xyXG4iXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUFBLE9BQUE7QUFDQSxJQUFBQyxPQUFBLEdBQUFELE9BQUE7QUFDQSxJQUFBRSxJQUFBLEdBQUFGLE9BQUE7QUFDQSxJQUFBRyxRQUFBLEdBQUFDLHNCQUFBLENBQUFKLE9BQUE7QUFDQSxJQUFBSyxJQUFBLEdBQUFELHNCQUFBLENBQUFKLE9BQUE7QUFFQUEsT0FBQTtBQUNBLElBQUFNLFVBQUEsR0FBQUYsc0JBQUEsQ0FBQUosT0FBQTtBQUNBLElBQUFPLEtBQUEsR0FBQUgsc0JBQUEsQ0FBQUosT0FBQTtBQUNBLElBQUFRLEtBQUEsR0FBQUosc0JBQUEsQ0FBQUosT0FBQTtBQUNBLElBQUFTLEtBQUEsR0FBQUwsc0JBQUEsQ0FBQUosT0FBQTtBQUNBLElBQUFVLE9BQUEsR0FBQVYsT0FBQTtBQUNBLElBQUFXLGlCQUFBLEdBQUFYLE9BQUE7QUFQQTs7QUFRQVksTUFBTSxDQUFDQyxPQUFPLEdBQUdD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