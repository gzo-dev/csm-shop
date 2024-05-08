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
// import kue from './kue';

global.appRoot = _path["default"].resolve(__dirname);
var PORT = _config2["default"].app.port;
var app = _app["default"].setup(_config2["default"]);
var server = _http["default"].createServer(app);
// Khởi tạo Socket.IO server và chạy trên cùng một HTTP server
var io = new _socket.Server(server);
/*cors handling*/
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
server.listen(PORT, function () {
  console.log("Server is running at PORT http://localhost:".concat(PORT));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZXF1aXJlIiwiX21vZGVscyIsIl9hcGkiLCJfY29uZmlnMiIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJfYXBwIiwiX3NjaGVkdWxlciIsIl9wYXRoIiwiX2NvcnMiLCJfaHR0cCIsIl9zb2NrZXQiLCJnbG9iYWwiLCJhcHBSb290IiwicGF0aCIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJQT1JUIiwiY29uZmlnIiwiYXBwIiwicG9ydCIsImFwcE1hbmFnZXIiLCJzZXR1cCIsInNlcnZlciIsImh0dHAiLCJjcmVhdGVTZXJ2ZXIiLCJpbyIsIlNlcnZlciIsInVzZSIsImNvcnMiLCJvcmlnaW4iLCJjcmVkZW50aWFscyIsIm9wdGlvbnMiLCJyZXN0Um91dGVyIiwib24iLCJzb2NrZXQiLCJjb25zb2xlIiwibG9nIiwiY29uY2F0IiwiaWQiLCJkYXRhIiwiZW1pdCIsIl9yZWYiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsInJvb21JZCIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJqb2luIiwic3RvcCIsIl94IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfcmVmMiIsIl9jYWxsZWUyIiwidG8iLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJfeDIiLCJlcnJvciIsInJlcSIsInJlcyIsIlJlcXVlc3RFcnJvciIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJjb250eXBlIiwiaGVhZGVycyIsImpzb24iLCJpbmRleE9mIiwiZXJyb3JzIiwiZXJyb3JMaXN0IiwicmVuZGVyIiwidG9TdHJpbmciLCJsYXlvdXQiLCJkYiIsInNlcXVlbGl6ZSIsImF1dGhlbnRpY2F0ZSIsInRoZW4iLCJzY2hlZHVsZXIiLCJpbml0IiwiZXJyIiwibGlzdGVuIl0sInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcImRvdGVudi9jb25maWdcIjtcbmltcG9ydCB7IGRiIH0gZnJvbSBcIi4vbW9kZWxzXCI7XG5pbXBvcnQgeyByZXN0Um91dGVyIH0gZnJvbSBcIi4vYXBpXCI7XG5pbXBvcnQgY29uZmlnIGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IGFwcE1hbmFnZXIgZnJvbSBcIi4vYXBwXCI7XG4vLyBpbXBvcnQga3VlIGZyb20gJy4va3VlJztcbmltcG9ydCBcIi4vZXJyb3JzXCI7XG5pbXBvcnQgc2NoZWR1bGVyIGZyb20gXCIuL3NjaGVkdWxlclwiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCBjb3JzIGZyb20gXCJjb3JzXCI7XG5pbXBvcnQgaHR0cCBmcm9tIFwiaHR0cFwiO1xuaW1wb3J0IHsgU2VydmVyIH0gZnJvbSBcInNvY2tldC5pb1wiO1xuZ2xvYmFsLmFwcFJvb3QgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lKTtcblxuY29uc3QgUE9SVCA9IGNvbmZpZy5hcHAucG9ydDtcbmNvbnN0IGFwcCA9IGFwcE1hbmFnZXIuc2V0dXAoY29uZmlnKTtcbmNvbnN0IHNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFwcCk7XG4vLyBLaOG7n2kgdOG6oW8gU29ja2V0LklPIHNlcnZlciB2w6AgY2jhuqF5IHRyw6puIGPDuW5nIG3hu5l0IEhUVFAgc2VydmVyXG5jb25zdCBpbyA9IG5ldyBTZXJ2ZXIoc2VydmVyKTtcbi8qY29ycyBoYW5kbGluZyovXG5hcHAudXNlKFxuICBjb3JzKHtcbiAgICBvcmlnaW46IHRydWUsXG4gICAgY3JlZGVudGlhbHM6IHRydWUsXG4gIH0pXG4pO1xuYXBwLm9wdGlvbnMoXCIqXCIsIGNvcnMoKSk7XG5cbi8qIFJvdXRlIGhhbmRsaW5nICovXG5hcHAudXNlKFwiL2FwaVwiLCByZXN0Um91dGVyKTtcbi8vIGFwcC51c2UoJy8nLCB3ZWJSb3V0ZXIpO1xuXG5pby5vbihcImNvbm5lY3Rpb25cIiwgKHNvY2tldCkgPT4ge1xuICBjb25zb2xlLmxvZyhgTmV3IGNsaWVudCBjb25uZWN0ZWQ6ICR7c29ja2V0LmlkfWApO1xuXG4gIC8vIFjhu60gbMO9IGtoaSBuaOG6rW4gxJHGsOG7o2MgdGluIG5o4bqvbiB04burIGNsaWVudFxuICBzb2NrZXQub24oXCJtZXNzYWdlXCIsIChkYXRhKSA9PiB7XG4gICAgY29uc29sZS5sb2coYFJlY2VpdmVkIG1lc3NhZ2UgZnJvbSBjbGllbnQgJHtzb2NrZXQuaWR9OiAke2RhdGF9YCk7XG5cbiAgICAvLyBH4butaSB0aW4gbmjhuq9uIHRy4bqjIGzhuqFpIGNobyBjbGllbnRcbiAgICBzb2NrZXQuZW1pdChcInJlc3BvbnNlXCIsIFwiTWVzc2FnZSByZWNlaXZlZCFcIik7XG4gIH0pO1xuICBzb2NrZXQub24oXCJqb2luX3Jvb21cIiwgYXN5bmMgKGRhdGEpPT4ge1xuXHRjb25zdCB7cm9vbUlkIH09IGRhdGFcblx0c29ja2V0LmpvaW4ocm9vbUlkKVxuXHQvLyBjb25zdCBzb2NrZXRzID0gYXdhaXQgaW8uaW4ocm9vbUlkKS5mZXRjaFNvY2tldHMoKTtcblx0Ly8gY29uc29sZS5sb2coc29ja2V0cylcbiAgfSlcbiAgc29ja2V0Lm9uKFwiYmFja190b193ZWJcIiwgYXN5bmMgKGRhdGEpPT4ge1xuXHRjb25zdCB7cm9vbUlkLCB0b309IGRhdGFcblx0aW8udG8ocm9vbUlkKS5lbWl0KCd0b193ZWJzaXRlJywgZGF0YSk7XG4gIH0pXG5cbiAgLy8gWOG7rSBsw70ga2hpIGNsaWVudCBuZ+G6r3Qga+G6v3QgbuG7kWlcbiAgc29ja2V0Lm9uKFwiZGlzY29ubmVjdFwiLCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coYENsaWVudCBkaXNjb25uZWN0ZWQ6ICR7c29ja2V0LmlkfWApO1xuICB9KTtcbn0pO1xuXG5hcHAudXNlKChlcnJvciwgcmVxLCByZXMsIG5leHQpID0+IHtcbiAgaWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBSZXF1ZXN0RXJyb3IpKSB7XG4gICAgZXJyb3IgPSBuZXcgUmVxdWVzdEVycm9yKFwiU29tZSBFcnJvciBPY2N1cnJlZFwiLCA1MDAsIGVycm9yLm1lc3NhZ2UpO1xuICB9XG4gIGVycm9yLnN0YXR1cyA9IGVycm9yLnN0YXR1cyB8fCA1MDA7XG4gIHJlcy5zdGF0dXMoZXJyb3Iuc3RhdHVzKTtcbiAgbGV0IGNvbnR5cGUgPSByZXEuaGVhZGVyc1tcImNvbnRlbnQtdHlwZVwiXTtcbiAgdmFyIGpzb24gPSAhKCFjb250eXBlIHx8IGNvbnR5cGUuaW5kZXhPZihcImFwcGxpY2F0aW9uL2pzb25cIikgIT09IDApO1xuICBpZiAoanNvbikge1xuICAgIHJldHVybiByZXMuanNvbih7IGVycm9yczogZXJyb3IuZXJyb3JMaXN0IH0pO1xuICB9IGVsc2Uge1xuICAgIHJlcy5yZW5kZXIoZXJyb3Iuc3RhdHVzLnRvU3RyaW5nKCksIHsgbGF5b3V0OiBudWxsIH0pO1xuICB9XG59KTtcblxuLy8ga3VlLmluaXQoKTtcbi8qIERhdGFiYXNlIENvbm5lY3Rpb24gKi9cbmRiLnNlcXVlbGl6ZVxuICAuYXV0aGVudGljYXRlKClcbiAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKFwiTmljZSEgRGF0YWJhc2UgbG9va3MgZmluZVwiKTtcbiAgICBzY2hlZHVsZXIuaW5pdCgpO1xuICB9KVxuICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgIGNvbnNvbGUubG9nKGVyciwgXCJTb21ldGhpbmcgd2VudCB3cm9uZyB3aXRoIHRoZSBEYXRhYmFzZSBVcGRhdGUhXCIpO1xuICB9KTtcblxuLyogU3RhcnQgTGlzdGVuaW5nIHNlcnZpY2UgKi9cbnNlcnZlci5saXN0ZW4oUE9SVCwgKCkgPT4ge1xuICBjb25zb2xlLmxvZyhgU2VydmVyIGlzIHJ1bm5pbmcgYXQgUE9SVCBodHRwOi8vbG9jYWxob3N0OiR7UE9SVH1gKTtcbn0pO1xuIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBQSxPQUFBO0FBQ0EsSUFBQUMsT0FBQSxHQUFBRCxPQUFBO0FBQ0EsSUFBQUUsSUFBQSxHQUFBRixPQUFBO0FBQ0EsSUFBQUcsUUFBQSxHQUFBQyxzQkFBQSxDQUFBSixPQUFBO0FBQ0EsSUFBQUssSUFBQSxHQUFBRCxzQkFBQSxDQUFBSixPQUFBO0FBRUFBLE9BQUE7QUFDQSxJQUFBTSxVQUFBLEdBQUFGLHNCQUFBLENBQUFKLE9BQUE7QUFDQSxJQUFBTyxLQUFBLEdBQUFILHNCQUFBLENBQUFKLE9BQUE7QUFDQSxJQUFBUSxLQUFBLEdBQUFKLHNCQUFBLENBQUFKLE9BQUE7QUFDQSxJQUFBUyxLQUFBLEdBQUFMLHNCQUFBLENBQUFKLE9BQUE7QUFDQSxJQUFBVSxPQUFBLEdBQUFWLE9BQUE7QUFOQTs7QUFPQVcsTUFBTSxDQUFDQyxPQUFPLEdBQUdDLGdCQUFJLENBQUNDLE9BQU8sQ0FBQ0MsU0FBUyxDQUFDO0FBRXhDLElBQU1DLElBQUksR0FBR0MsbUJBQU0sQ0FBQ0MsR0FBRyxDQUFDQyxJQUFJO0FBQzVCLElBQU1ELEdBQUcsR0FBR0UsZUFBVSxDQUFDQyxLQUFLLENBQUNKLG1CQUFNLENBQUM7QUFDcEMsSUFBTUssTUFBTSxHQUFHQyxnQkFBSSxDQUFDQyxZQUFZLENBQUNOLEdBQUcsQ0FBQztBQUNyQztBQUNBLElBQU1PLEVBQUUsR0FBRyxJQUFJQyxjQUFNLENBQUNKLE1BQU0sQ0FBQztBQUM3QjtBQUNBSixHQUFHLENBQUNTLEdBQUcsQ0FDTCxJQUFBQyxnQkFBSSxFQUFDO0VBQ0hDLE1BQU0sRUFBRSxJQUFJO0VBQ1pDLFdBQVcsRUFBRTtBQUNmLENBQUMsQ0FDSCxDQUFDO0FBQ0RaLEdBQUcsQ0FBQ2EsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFBSCxnQkFBSSxFQUFDLENBQUMsQ0FBQzs7QUFFeEI7QUFDQVYsR0FBRyxDQUFDUyxHQUFHLENBQUMsTUFBTSxFQUFFSyxlQUFVLENBQUM7QUFDM0I7O0FBRUFQLEVBQUUsQ0FBQ1EsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFDQyxNQUFNLEVBQUs7RUFDOUJDLE9BQU8sQ0FBQ0MsR0FBRywwQkFBQUMsTUFBQSxDQUEwQkgsTUFBTSxDQUFDSSxFQUFFLENBQUUsQ0FBQzs7RUFFakQ7RUFDQUosTUFBTSxDQUFDRCxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQUNNLElBQUksRUFBSztJQUM3QkosT0FBTyxDQUFDQyxHQUFHLGlDQUFBQyxNQUFBLENBQWlDSCxNQUFNLENBQUNJLEVBQUUsUUFBQUQsTUFBQSxDQUFLRSxJQUFJLENBQUUsQ0FBQzs7SUFFakU7SUFDQUwsTUFBTSxDQUFDTSxJQUFJLENBQUMsVUFBVSxFQUFFLG1CQUFtQixDQUFDO0VBQzlDLENBQUMsQ0FBQztFQUNGTixNQUFNLENBQUNELEVBQUUsQ0FBQyxXQUFXO0lBQUEsSUFBQVEsSUFBQSxPQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLENBQUUsU0FBQUMsUUFBT04sSUFBSTtNQUFBLElBQUFPLE1BQUE7TUFBQSxPQUFBSCxZQUFBLFlBQUFJLElBQUEsVUFBQUMsU0FBQUMsUUFBQTtRQUFBLGtCQUFBQSxRQUFBLENBQUFDLElBQUEsR0FBQUQsUUFBQSxDQUFBRSxJQUFBO1VBQUE7WUFDNUJMLE1BQU0sR0FBSVAsSUFBSSxDQUFkTyxNQUFNO1lBQ2JaLE1BQU0sQ0FBQ2tCLElBQUksQ0FBQ04sTUFBTSxDQUFDO1lBQ25CO1lBQ0E7VUFBQTtVQUFBO1lBQUEsT0FBQUcsUUFBQSxDQUFBSSxJQUFBO1FBQUE7TUFBQSxHQUFBUixPQUFBO0lBQUEsQ0FDRTtJQUFBLGlCQUFBUyxFQUFBO01BQUEsT0FBQWIsSUFBQSxDQUFBYyxLQUFBLE9BQUFDLFNBQUE7SUFBQTtFQUFBLElBQUM7RUFDRnRCLE1BQU0sQ0FBQ0QsRUFBRSxDQUFDLGFBQWE7SUFBQSxJQUFBd0IsS0FBQSxPQUFBZixrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLENBQUUsU0FBQWMsU0FBT25CLElBQUk7TUFBQSxJQUFBTyxNQUFBLEVBQUFhLEVBQUE7TUFBQSxPQUFBaEIsWUFBQSxZQUFBSSxJQUFBLFVBQUFhLFVBQUFDLFNBQUE7UUFBQSxrQkFBQUEsU0FBQSxDQUFBWCxJQUFBLEdBQUFXLFNBQUEsQ0FBQVYsSUFBQTtVQUFBO1lBQzlCTCxNQUFNLEdBQU9QLElBQUksQ0FBakJPLE1BQU0sRUFBRWEsRUFBRSxHQUFHcEIsSUFBSSxDQUFUb0IsRUFBRTtZQUNqQmxDLEVBQUUsQ0FBQ2tDLEVBQUUsQ0FBQ2IsTUFBTSxDQUFDLENBQUNOLElBQUksQ0FBQyxZQUFZLEVBQUVELElBQUksQ0FBQztVQUFDO1VBQUE7WUFBQSxPQUFBc0IsU0FBQSxDQUFBUixJQUFBO1FBQUE7TUFBQSxHQUFBSyxRQUFBO0lBQUEsQ0FDckM7SUFBQSxpQkFBQUksR0FBQTtNQUFBLE9BQUFMLEtBQUEsQ0FBQUYsS0FBQSxPQUFBQyxTQUFBO0lBQUE7RUFBQSxJQUFDOztFQUVGO0VBQ0F0QixNQUFNLENBQUNELEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBTTtJQUM1QkUsT0FBTyxDQUFDQyxHQUFHLHlCQUFBQyxNQUFBLENBQXlCSCxNQUFNLENBQUNJLEVBQUUsQ0FBRSxDQUFDO0VBQ2xELENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGcEIsR0FBRyxDQUFDUyxHQUFHLENBQUMsVUFBQ29DLEtBQUssRUFBRUMsR0FBRyxFQUFFQyxHQUFHLEVBQUVkLElBQUksRUFBSztFQUNqQyxJQUFJLEVBQUVZLEtBQUssWUFBWUcsWUFBWSxDQUFDLEVBQUU7SUFDcENILEtBQUssR0FBRyxJQUFJRyxZQUFZLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFSCxLQUFLLENBQUNJLE9BQU8sQ0FBQztFQUNyRTtFQUNBSixLQUFLLENBQUNLLE1BQU0sR0FBR0wsS0FBSyxDQUFDSyxNQUFNLElBQUksR0FBRztFQUNsQ0gsR0FBRyxDQUFDRyxNQUFNLENBQUNMLEtBQUssQ0FBQ0ssTUFBTSxDQUFDO0VBQ3hCLElBQUlDLE9BQU8sR0FBR0wsR0FBRyxDQUFDTSxPQUFPLENBQUMsY0FBYyxDQUFDO0VBQ3pDLElBQUlDLElBQUksR0FBRyxFQUFFLENBQUNGLE9BQU8sSUFBSUEsT0FBTyxDQUFDRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDbkUsSUFBSUQsSUFBSSxFQUFFO0lBQ1IsT0FBT04sR0FBRyxDQUFDTSxJQUFJLENBQUM7TUFBRUUsTUFBTSxFQUFFVixLQUFLLENBQUNXO0lBQVUsQ0FBQyxDQUFDO0VBQzlDLENBQUMsTUFBTTtJQUNMVCxHQUFHLENBQUNVLE1BQU0sQ0FBQ1osS0FBSyxDQUFDSyxNQUFNLENBQUNRLFFBQVEsQ0FBQyxDQUFDLEVBQUU7TUFBRUMsTUFBTSxFQUFFO0lBQUssQ0FBQyxDQUFDO0VBQ3ZEO0FBQ0YsQ0FBQyxDQUFDOztBQUVGO0FBQ0E7QUFDQUMsVUFBRSxDQUFDQyxTQUFTLENBQ1RDLFlBQVksQ0FBQyxDQUFDLENBQ2RDLElBQUksQ0FBQyxZQUFZO0VBQ2hCOUMsT0FBTyxDQUFDQyxHQUFHLENBQUMsMkJBQTJCLENBQUM7RUFDeEM4QyxxQkFBUyxDQUFDQyxJQUFJLENBQUMsQ0FBQztBQUNsQixDQUFDLENBQUMsU0FDSSxDQUFDLFVBQVVDLEdBQUcsRUFBRTtFQUNwQmpELE9BQU8sQ0FBQ0MsR0FBRyxDQUFDZ0QsR0FBRyxFQUFFLGdEQUFnRCxDQUFDO0FBQ3BFLENBQUMsQ0FBQzs7QUFFSjtBQUNBOUQsTUFBTSxDQUFDK0QsTUFBTSxDQUFDckUsSUFBSSxFQUFFLFlBQU07RUFDeEJtQixPQUFPLENBQUNDLEdBQUcsK0NBQUFDLE1BQUEsQ0FBK0NyQixJQUFJLENBQUUsQ0FBQztBQUNuRSxDQUFDLENBQUMifQ==