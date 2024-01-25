"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
require("dotenv/config");
var _models = require("./models");
var _api = require("./api");
var _config2 = _interopRequireDefault(require("./config"));
var _app = _interopRequireDefault(require("./app"));
require("./errors");
var _scheduler = _interopRequireDefault(require("./scheduler"));
var _path = _interopRequireDefault(require("path"));
var _cors = _interopRequireDefault(require("cors"));
var _cronjob = _interopRequireDefault(require("./cronjob"));
// import kue from './kue';

global.appRoot = _path["default"].resolve(__dirname);
var PORT = _config2["default"].app.port;
var app = _app["default"].setup(_config2["default"]);

/*cors handling*/
app.use((0, _cors["default"])({
  origin: true,
  credentials: true
}));
app.options('*', (0, _cors["default"])());

/* Route handling */
app.use('/api', _api.restRouter);
// app.use('/', webRouter);

app.use(function (error, req, res, next) {
  if (!(error instanceof RequestError)) {
    error = new RequestError('Some Error Occurred', 500, error.message);
  }
  error.status = error.status || 500;
  res.status(error.status);
  var contype = req.headers['content-type'];
  var json = !(!contype || contype.indexOf('application/json') !== 0);
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
  console.log('Nice! Database looks fine');
  _scheduler["default"].init();
})["catch"](function (err) {
  console.log(err, "Something went wrong with the Database Update!");
});
_cronjob["default"].start();

/* Start Listening service */
app.listen(PORT, function () {
  console.log("Server is running at PORT http://localhost:".concat(PORT));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZXF1aXJlIiwiX21vZGVscyIsIl9hcGkiLCJfY29uZmlnMiIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJfYXBwIiwiX3NjaGVkdWxlciIsIl9wYXRoIiwiX2NvcnMiLCJfY3JvbmpvYiIsImdsb2JhbCIsImFwcFJvb3QiLCJwYXRoIiwicmVzb2x2ZSIsIl9fZGlybmFtZSIsIlBPUlQiLCJjb25maWciLCJhcHAiLCJwb3J0IiwiYXBwTWFuYWdlciIsInNldHVwIiwidXNlIiwiY29ycyIsIm9yaWdpbiIsImNyZWRlbnRpYWxzIiwib3B0aW9ucyIsInJlc3RSb3V0ZXIiLCJlcnJvciIsInJlcSIsInJlcyIsIm5leHQiLCJSZXF1ZXN0RXJyb3IiLCJtZXNzYWdlIiwic3RhdHVzIiwiY29udHlwZSIsImhlYWRlcnMiLCJqc29uIiwiaW5kZXhPZiIsImVycm9ycyIsImVycm9yTGlzdCIsInJlbmRlciIsInRvU3RyaW5nIiwibGF5b3V0IiwiZGIiLCJzZXF1ZWxpemUiLCJhdXRoZW50aWNhdGUiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsInNjaGVkdWxlciIsImluaXQiLCJlcnIiLCJjaGVja0V4cGlyZWRWb3VjaGVycyIsInN0YXJ0IiwibGlzdGVuIiwiY29uY2F0Il0sInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnZG90ZW52L2NvbmZpZyc7XG5pbXBvcnQgeyBkYiB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IHJlc3RSb3V0ZXIgfSBmcm9tICcuL2FwaSc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcbmltcG9ydCBhcHBNYW5hZ2VyIGZyb20gJy4vYXBwJztcbi8vIGltcG9ydCBrdWUgZnJvbSAnLi9rdWUnO1xuaW1wb3J0ICcuL2Vycm9ycyc7XG5pbXBvcnQgc2NoZWR1bGVyIGZyb20gJy4vc2NoZWR1bGVyJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGNvcnMgZnJvbSAnY29ycyc7XG5pbXBvcnQgY2hlY2tFeHBpcmVkVm91Y2hlcnMgZnJvbSAnLi9jcm9uam9iJztcbmdsb2JhbC5hcHBSb290ID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSk7XG5cbmNvbnN0IFBPUlQgPSBjb25maWcuYXBwLnBvcnQ7XG5jb25zdCBhcHAgPSBhcHBNYW5hZ2VyLnNldHVwKGNvbmZpZyk7XG5cbi8qY29ycyBoYW5kbGluZyovXG5hcHAudXNlKGNvcnMoe1xuXHRvcmlnaW46dHJ1ZSxcbiAgICBjcmVkZW50aWFsczp0cnVlXG59KSk7XG5hcHAub3B0aW9ucygnKicsIGNvcnMoKSk7XG5cbi8qIFJvdXRlIGhhbmRsaW5nICovXG5hcHAudXNlKCcvYXBpJywgcmVzdFJvdXRlcik7XG4vLyBhcHAudXNlKCcvJywgd2ViUm91dGVyKTtcblxuYXBwLnVzZSgoZXJyb3IsIHJlcSwgcmVzLCBuZXh0KSA9PiB7XG5cdGlmICghKGVycm9yIGluc3RhbmNlb2YgUmVxdWVzdEVycm9yKSkge1xuXHRcdGVycm9yID0gbmV3IFJlcXVlc3RFcnJvcignU29tZSBFcnJvciBPY2N1cnJlZCcsIDUwMCwgZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuXHRcdGVycm9yLnN0YXR1cyA9IGVycm9yLnN0YXR1cyB8fCA1MDA7XG5cdHJlcy5zdGF0dXMoZXJyb3Iuc3RhdHVzKTtcblx0bGV0IGNvbnR5cGUgPSByZXEuaGVhZGVyc1snY29udGVudC10eXBlJ107XG5cdHZhciBqc29uID0gISghY29udHlwZSB8fCBjb250eXBlLmluZGV4T2YoJ2FwcGxpY2F0aW9uL2pzb24nKSAhPT0gMCk7XG5cdGlmIChqc29uKSB7XG5cdFx0cmV0dXJuIHJlcy5qc29uKHsgZXJyb3JzOiBlcnJvci5lcnJvckxpc3QgfSk7XG5cdH0gZWxzZSB7XG5cdFx0cmVzLnJlbmRlcihlcnJvci5zdGF0dXMudG9TdHJpbmcoKSwge2xheW91dDogbnVsbH0pXG5cdH1cbn0pO1xuXG4vLyBrdWUuaW5pdCgpO1xuLyogRGF0YWJhc2UgQ29ubmVjdGlvbiAqL1xuZGIuc2VxdWVsaXplLmF1dGhlbnRpY2F0ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRjb25zb2xlLmxvZygnTmljZSEgRGF0YWJhc2UgbG9va3MgZmluZScpO1xuXHRzY2hlZHVsZXIuaW5pdCgpO1xufSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuXHRjb25zb2xlLmxvZyhlcnIsIFwiU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2l0aCB0aGUgRGF0YWJhc2UgVXBkYXRlIVwiKVxufSk7XG5cbmNoZWNrRXhwaXJlZFZvdWNoZXJzLnN0YXJ0KClcblxuLyogU3RhcnQgTGlzdGVuaW5nIHNlcnZpY2UgKi9cbmFwcC5saXN0ZW4oUE9SVCwgKCkgPT4ge1xuXHRjb25zb2xlLmxvZyhgU2VydmVyIGlzIHJ1bm5pbmcgYXQgUE9SVCBodHRwOi8vbG9jYWxob3N0OiR7UE9SVH1gKTtcbn0pOyJdLCJtYXBwaW5ncyI6Ijs7O0FBQUFBLE9BQUE7QUFDQSxJQUFBQyxPQUFBLEdBQUFELE9BQUE7QUFDQSxJQUFBRSxJQUFBLEdBQUFGLE9BQUE7QUFDQSxJQUFBRyxRQUFBLEdBQUFDLHNCQUFBLENBQUFKLE9BQUE7QUFDQSxJQUFBSyxJQUFBLEdBQUFELHNCQUFBLENBQUFKLE9BQUE7QUFFQUEsT0FBQTtBQUNBLElBQUFNLFVBQUEsR0FBQUYsc0JBQUEsQ0FBQUosT0FBQTtBQUNBLElBQUFPLEtBQUEsR0FBQUgsc0JBQUEsQ0FBQUosT0FBQTtBQUNBLElBQUFRLEtBQUEsR0FBQUosc0JBQUEsQ0FBQUosT0FBQTtBQUNBLElBQUFTLFFBQUEsR0FBQUwsc0JBQUEsQ0FBQUosT0FBQTtBQUxBOztBQU1BVSxNQUFNLENBQUNDLE9BQU8sR0FBR0MsZ0JBQUksQ0FBQ0MsT0FBTyxDQUFDQyxTQUFTLENBQUM7QUFFeEMsSUFBTUMsSUFBSSxHQUFHQyxtQkFBTSxDQUFDQyxHQUFHLENBQUNDLElBQUk7QUFDNUIsSUFBTUQsR0FBRyxHQUFHRSxlQUFVLENBQUNDLEtBQUssQ0FBQ0osbUJBQU0sQ0FBQzs7QUFFcEM7QUFDQUMsR0FBRyxDQUFDSSxHQUFHLENBQUMsSUFBQUMsZ0JBQUksRUFBQztFQUNaQyxNQUFNLEVBQUMsSUFBSTtFQUNSQyxXQUFXLEVBQUM7QUFDaEIsQ0FBQyxDQUFDLENBQUM7QUFDSFAsR0FBRyxDQUFDUSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUFILGdCQUFJLEVBQUMsQ0FBQyxDQUFDOztBQUV4QjtBQUNBTCxHQUFHLENBQUNJLEdBQUcsQ0FBQyxNQUFNLEVBQUVLLGVBQVUsQ0FBQztBQUMzQjs7QUFFQVQsR0FBRyxDQUFDSSxHQUFHLENBQUMsVUFBQ00sS0FBSyxFQUFFQyxHQUFHLEVBQUVDLEdBQUcsRUFBRUMsSUFBSSxFQUFLO0VBQ2xDLElBQUksRUFBRUgsS0FBSyxZQUFZSSxZQUFZLENBQUMsRUFBRTtJQUNyQ0osS0FBSyxHQUFHLElBQUlJLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEVBQUVKLEtBQUssQ0FBQ0ssT0FBTyxDQUFDO0VBQ2pFO0VBQ0ZMLEtBQUssQ0FBQ00sTUFBTSxHQUFHTixLQUFLLENBQUNNLE1BQU0sSUFBSSxHQUFHO0VBQ25DSixHQUFHLENBQUNJLE1BQU0sQ0FBQ04sS0FBSyxDQUFDTSxNQUFNLENBQUM7RUFDeEIsSUFBSUMsT0FBTyxHQUFHTixHQUFHLENBQUNPLE9BQU8sQ0FBQyxjQUFjLENBQUM7RUFDekMsSUFBSUMsSUFBSSxHQUFHLEVBQUUsQ0FBQ0YsT0FBTyxJQUFJQSxPQUFPLENBQUNHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUNuRSxJQUFJRCxJQUFJLEVBQUU7SUFDVCxPQUFPUCxHQUFHLENBQUNPLElBQUksQ0FBQztNQUFFRSxNQUFNLEVBQUVYLEtBQUssQ0FBQ1k7SUFBVSxDQUFDLENBQUM7RUFDN0MsQ0FBQyxNQUFNO0lBQ05WLEdBQUcsQ0FBQ1csTUFBTSxDQUFDYixLQUFLLENBQUNNLE1BQU0sQ0FBQ1EsUUFBUSxDQUFDLENBQUMsRUFBRTtNQUFDQyxNQUFNLEVBQUU7SUFBSSxDQUFDLENBQUM7RUFDcEQ7QUFDRCxDQUFDLENBQUM7O0FBRUY7QUFDQTtBQUNBQyxVQUFFLENBQUNDLFNBQVMsQ0FBQ0MsWUFBWSxDQUFDLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLFlBQVk7RUFDNUNDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLDJCQUEyQixDQUFDO0VBQ3hDQyxxQkFBUyxDQUFDQyxJQUFJLENBQUMsQ0FBQztBQUNqQixDQUFDLENBQUMsU0FBTSxDQUFDLFVBQVVDLEdBQUcsRUFBRTtFQUN2QkosT0FBTyxDQUFDQyxHQUFHLENBQUNHLEdBQUcsRUFBRSxnREFBZ0QsQ0FBQztBQUNuRSxDQUFDLENBQUM7QUFFRkMsbUJBQW9CLENBQUNDLEtBQUssQ0FBQyxDQUFDOztBQUU1QjtBQUNBcEMsR0FBRyxDQUFDcUMsTUFBTSxDQUFDdkMsSUFBSSxFQUFFLFlBQU07RUFDdEJnQyxPQUFPLENBQUNDLEdBQUcsK0NBQUFPLE1BQUEsQ0FBK0N4QyxJQUFJLENBQUUsQ0FBQztBQUNsRSxDQUFDLENBQUMifQ==