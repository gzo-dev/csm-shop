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

/* Start Listening service */
app.listen(PORT, function () {
  console.log("Server is running at PORT http://localhost:".concat(PORT));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZXF1aXJlIiwiX21vZGVscyIsIl9hcGkiLCJfY29uZmlnMiIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJfYXBwIiwiX3NjaGVkdWxlciIsIl9wYXRoIiwiX2NvcnMiLCJnbG9iYWwiLCJhcHBSb290IiwicGF0aCIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJQT1JUIiwiY29uZmlnIiwiYXBwIiwicG9ydCIsImFwcE1hbmFnZXIiLCJzZXR1cCIsInVzZSIsImNvcnMiLCJvcmlnaW4iLCJjcmVkZW50aWFscyIsIm9wdGlvbnMiLCJyZXN0Um91dGVyIiwiZXJyb3IiLCJyZXEiLCJyZXMiLCJuZXh0IiwiUmVxdWVzdEVycm9yIiwibWVzc2FnZSIsInN0YXR1cyIsImNvbnR5cGUiLCJoZWFkZXJzIiwianNvbiIsImluZGV4T2YiLCJlcnJvcnMiLCJlcnJvckxpc3QiLCJyZW5kZXIiLCJ0b1N0cmluZyIsImxheW91dCIsImRiIiwic2VxdWVsaXplIiwiYXV0aGVudGljYXRlIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJzY2hlZHVsZXIiLCJpbml0IiwiZXJyIiwibGlzdGVuIiwiY29uY2F0Il0sInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnZG90ZW52L2NvbmZpZyc7XHJcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi9tb2RlbHMnO1xyXG5pbXBvcnQgeyByZXN0Um91dGVyIH0gZnJvbSAnLi9hcGknO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcclxuaW1wb3J0IGFwcE1hbmFnZXIgZnJvbSAnLi9hcHAnO1xyXG4vLyBpbXBvcnQga3VlIGZyb20gJy4va3VlJztcclxuaW1wb3J0ICcuL2Vycm9ycyc7XHJcbmltcG9ydCBzY2hlZHVsZXIgZnJvbSAnLi9zY2hlZHVsZXInO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IGNvcnMgZnJvbSAnY29ycyc7XHJcblxyXG5nbG9iYWwuYXBwUm9vdCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUpO1xyXG5cclxuY29uc3QgUE9SVCA9IGNvbmZpZy5hcHAucG9ydDtcclxuY29uc3QgYXBwID0gYXBwTWFuYWdlci5zZXR1cChjb25maWcpO1xyXG4vKmNvcnMgaGFuZGxpbmcqL1xyXG5hcHAudXNlKGNvcnMoe1xyXG5cdG9yaWdpbjp0cnVlLFxyXG4gICAgY3JlZGVudGlhbHM6dHJ1ZVxyXG59KSk7XHJcbmFwcC5vcHRpb25zKCcqJywgY29ycygpKTtcclxuXHJcbi8qIFJvdXRlIGhhbmRsaW5nICovXHJcbmFwcC51c2UoJy9hcGknLCByZXN0Um91dGVyKTtcclxuLy8gYXBwLnVzZSgnLycsIHdlYlJvdXRlcik7XHJcblxyXG5hcHAudXNlKChlcnJvciwgcmVxLCByZXMsIG5leHQpID0+IHtcclxuXHRpZiAoIShlcnJvciBpbnN0YW5jZW9mIFJlcXVlc3RFcnJvcikpIHtcclxuXHRcdGVycm9yID0gbmV3IFJlcXVlc3RFcnJvcignU29tZSBFcnJvciBPY2N1cnJlZCcsIDUwMCwgZXJyb3IubWVzc2FnZSk7XHJcbiAgICB9XHJcblx0XHRlcnJvci5zdGF0dXMgPSBlcnJvci5zdGF0dXMgfHwgNTAwO1xyXG5cdHJlcy5zdGF0dXMoZXJyb3Iuc3RhdHVzKTtcclxuXHRsZXQgY29udHlwZSA9IHJlcS5oZWFkZXJzWydjb250ZW50LXR5cGUnXTtcclxuXHR2YXIganNvbiA9ICEoIWNvbnR5cGUgfHwgY29udHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi9qc29uJykgIT09IDApO1xyXG5cdGlmIChqc29uKSB7XHJcblx0XHRyZXR1cm4gcmVzLmpzb24oeyBlcnJvcnM6IGVycm9yLmVycm9yTGlzdCB9KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmVzLnJlbmRlcihlcnJvci5zdGF0dXMudG9TdHJpbmcoKSwge2xheW91dDogbnVsbH0pXHJcblx0fVxyXG59KTtcclxuXHJcbi8vIGt1ZS5pbml0KCk7XHJcbi8qIERhdGFiYXNlIENvbm5lY3Rpb24gKi9cclxuZGIuc2VxdWVsaXplLmF1dGhlbnRpY2F0ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG5cdGNvbnNvbGUubG9nKCdOaWNlISBEYXRhYmFzZSBsb29rcyBmaW5lJyk7XHJcblx0c2NoZWR1bGVyLmluaXQoKTtcclxufSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG5cdGNvbnNvbGUubG9nKGVyciwgXCJTb21ldGhpbmcgd2VudCB3cm9uZyB3aXRoIHRoZSBEYXRhYmFzZSBVcGRhdGUhXCIpXHJcbn0pO1xyXG5cclxuLyogU3RhcnQgTGlzdGVuaW5nIHNlcnZpY2UgKi9cclxuYXBwLmxpc3RlbihQT1JULCAoKSA9PiB7XHJcblx0Y29uc29sZS5sb2coYFNlcnZlciBpcyBydW5uaW5nIGF0IFBPUlQgaHR0cDovL2xvY2FsaG9zdDoke1BPUlR9YCk7XHJcbn0pOyJdLCJtYXBwaW5ncyI6Ijs7O0FBQUFBLE9BQUE7QUFDQSxJQUFBQyxPQUFBLEdBQUFELE9BQUE7QUFDQSxJQUFBRSxJQUFBLEdBQUFGLE9BQUE7QUFDQSxJQUFBRyxRQUFBLEdBQUFDLHNCQUFBLENBQUFKLE9BQUE7QUFDQSxJQUFBSyxJQUFBLEdBQUFELHNCQUFBLENBQUFKLE9BQUE7QUFFQUEsT0FBQTtBQUNBLElBQUFNLFVBQUEsR0FBQUYsc0JBQUEsQ0FBQUosT0FBQTtBQUNBLElBQUFPLEtBQUEsR0FBQUgsc0JBQUEsQ0FBQUosT0FBQTtBQUNBLElBQUFRLEtBQUEsR0FBQUosc0JBQUEsQ0FBQUosT0FBQTtBQUpBOztBQU1BUyxNQUFNLENBQUNDLE9BQU8sR0FBR0MsZ0JBQUksQ0FBQ0MsT0FBTyxDQUFDQyxTQUFTLENBQUM7QUFFeEMsSUFBTUMsSUFBSSxHQUFHQyxtQkFBTSxDQUFDQyxHQUFHLENBQUNDLElBQUk7QUFDNUIsSUFBTUQsR0FBRyxHQUFHRSxlQUFVLENBQUNDLEtBQUssQ0FBQ0osbUJBQU0sQ0FBQztBQUNwQztBQUNBQyxHQUFHLENBQUNJLEdBQUcsQ0FBQyxJQUFBQyxnQkFBSSxFQUFDO0VBQ1pDLE1BQU0sRUFBQyxJQUFJO0VBQ1JDLFdBQVcsRUFBQztBQUNoQixDQUFDLENBQUMsQ0FBQztBQUNIUCxHQUFHLENBQUNRLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBQUgsZ0JBQUksRUFBQyxDQUFDLENBQUM7O0FBRXhCO0FBQ0FMLEdBQUcsQ0FBQ0ksR0FBRyxDQUFDLE1BQU0sRUFBRUssZUFBVSxDQUFDO0FBQzNCOztBQUVBVCxHQUFHLENBQUNJLEdBQUcsQ0FBQyxVQUFDTSxLQUFLLEVBQUVDLEdBQUcsRUFBRUMsR0FBRyxFQUFFQyxJQUFJLEVBQUs7RUFDbEMsSUFBSSxFQUFFSCxLQUFLLFlBQVlJLFlBQVksQ0FBQyxFQUFFO0lBQ3JDSixLQUFLLEdBQUcsSUFBSUksWUFBWSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRUosS0FBSyxDQUFDSyxPQUFPLENBQUM7RUFDakU7RUFDRkwsS0FBSyxDQUFDTSxNQUFNLEdBQUdOLEtBQUssQ0FBQ00sTUFBTSxJQUFJLEdBQUc7RUFDbkNKLEdBQUcsQ0FBQ0ksTUFBTSxDQUFDTixLQUFLLENBQUNNLE1BQU0sQ0FBQztFQUN4QixJQUFJQyxPQUFPLEdBQUdOLEdBQUcsQ0FBQ08sT0FBTyxDQUFDLGNBQWMsQ0FBQztFQUN6QyxJQUFJQyxJQUFJLEdBQUcsRUFBRSxDQUFDRixPQUFPLElBQUlBLE9BQU8sQ0FBQ0csT0FBTyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQ25FLElBQUlELElBQUksRUFBRTtJQUNULE9BQU9QLEdBQUcsQ0FBQ08sSUFBSSxDQUFDO01BQUVFLE1BQU0sRUFBRVgsS0FBSyxDQUFDWTtJQUFVLENBQUMsQ0FBQztFQUM3QyxDQUFDLE1BQU07SUFDTlYsR0FBRyxDQUFDVyxNQUFNLENBQUNiLEtBQUssQ0FBQ00sTUFBTSxDQUFDUSxRQUFRLENBQUMsQ0FBQyxFQUFFO01BQUNDLE1BQU0sRUFBRTtJQUFJLENBQUMsQ0FBQztFQUNwRDtBQUNELENBQUMsQ0FBQzs7QUFFRjtBQUNBO0FBQ0FDLFVBQUUsQ0FBQ0MsU0FBUyxDQUFDQyxZQUFZLENBQUMsQ0FBQyxDQUFDQyxJQUFJLENBQUMsWUFBWTtFQUM1Q0MsT0FBTyxDQUFDQyxHQUFHLENBQUMsMkJBQTJCLENBQUM7RUFDeENDLHFCQUFTLENBQUNDLElBQUksQ0FBQyxDQUFDO0FBQ2pCLENBQUMsQ0FBQyxTQUFNLENBQUMsVUFBVUMsR0FBRyxFQUFFO0VBQ3ZCSixPQUFPLENBQUNDLEdBQUcsQ0FBQ0csR0FBRyxFQUFFLGdEQUFnRCxDQUFDO0FBQ25FLENBQUMsQ0FBQzs7QUFFRjtBQUNBbEMsR0FBRyxDQUFDbUMsTUFBTSxDQUFDckMsSUFBSSxFQUFFLFlBQU07RUFDdEJnQyxPQUFPLENBQUNDLEdBQUcsK0NBQUFLLE1BQUEsQ0FBK0N0QyxJQUFJLENBQUUsQ0FBQztBQUNsRSxDQUFDLENBQUMifQ==