"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jimp = _interopRequireDefault(require("jimp"));
var _path = _interopRequireDefault(require("path"));
var _uuid = require("uuid");
var serverHost = "https://trouytin.online:8443";
var logoPath = _path["default"].join(__dirname, "../../..", "/logo.png");
var outputFilename = _path["default"].join(__dirname, "../../../../", "watermark");
var _default = {
  addWaterMark: function addWaterMark(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var uploadedImage, _yield$Promise$all, _yield$Promise$all2, image, logo, desiredLogoWidth, desiredLogoHeight, logoWidth, logoX, logoY, uuid;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            // const {  outputFilename } = req.body;
            uploadedImage = _path["default"].join(__dirname, "../../../../", req.file.path);
            _context.prev = 1;
            _context.next = 4;
            return Promise.all([_jimp["default"].read(uploadedImage), _jimp["default"].read(logoPath)]);
          case 4:
            _yield$Promise$all = _context.sent;
            _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 2);
            image = _yield$Promise$all2[0];
            logo = _yield$Promise$all2[1];
            // Resize logo
            desiredLogoWidth = 250;
            desiredLogoHeight = 250;
            logo.resize(desiredLogoWidth, desiredLogoHeight);
            logoWidth = 250; // Đặt kích thước mới của logo ở đây
            logoX = image.bitmap.width - logoWidth - 50;
            logoY = 50;
            logo.opacity(0.4);
            image.composite(logo, logoX, logoY, [{
              mode: _jimp["default"].BLEND_SCREEN,
              opacitySource: 0.1,
              opacityDest: 0.1
            }]);
            uuid = (0, _uuid.v4)();
            _context.next = 19;
            return image.writeAsync(_path["default"].join(outputFilename, "/", uuid + ".png"));
          case 19:
            return _context.abrupt("return", res.status(200).send({
              file_path: serverHost + "/" + uuid + ".png"
            }));
          case 22:
            _context.prev = 22;
            _context.t0 = _context["catch"](1);
            console.error("Error:", _context.t0);
            res.status(500).send({
              error: "An error occurred while adding watermark to image."
            });
          case 26:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[1, 22]]);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfamltcCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX3BhdGgiLCJfdXVpZCIsInNlcnZlckhvc3QiLCJsb2dvUGF0aCIsInBhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwib3V0cHV0RmlsZW5hbWUiLCJfZGVmYXVsdCIsImFkZFdhdGVyTWFyayIsInJlcSIsInJlcyIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwidXBsb2FkZWRJbWFnZSIsIl95aWVsZCRQcm9taXNlJGFsbCIsIl95aWVsZCRQcm9taXNlJGFsbDIiLCJpbWFnZSIsImxvZ28iLCJkZXNpcmVkTG9nb1dpZHRoIiwiZGVzaXJlZExvZ29IZWlnaHQiLCJsb2dvV2lkdGgiLCJsb2dvWCIsImxvZ29ZIiwidXVpZCIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJmaWxlIiwiUHJvbWlzZSIsImFsbCIsIkppbXAiLCJyZWFkIiwic2VudCIsIl9zbGljZWRUb0FycmF5MiIsInJlc2l6ZSIsImJpdG1hcCIsIndpZHRoIiwib3BhY2l0eSIsImNvbXBvc2l0ZSIsIm1vZGUiLCJCTEVORF9TQ1JFRU4iLCJvcGFjaXR5U291cmNlIiwib3BhY2l0eURlc3QiLCJ2NCIsIndyaXRlQXN5bmMiLCJhYnJ1cHQiLCJzdGF0dXMiLCJzZW5kIiwiZmlsZV9wYXRoIiwidDAiLCJjb25zb2xlIiwiZXJyb3IiLCJzdG9wIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL3dhdGVybWFyay93YXRlci5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBKaW1wIGZyb20gXCJqaW1wXCJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCJcbmltcG9ydCB7IHY0IH0gZnJvbSBcInV1aWRcIjtcblxuY29uc3Qgc2VydmVySG9zdCA9IGBodHRwczovL3Ryb3V5dGluLm9ubGluZTo4NDQzYDtcbmNvbnN0IGxvZ29QYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi8uLi8uLlwiLCBcIi9sb2dvLnBuZ1wiKTtcbmNvbnN0IG91dHB1dEZpbGVuYW1lPSBwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uLy4uLy4uLy4uL1wiLCBcIndhdGVybWFya1wiKVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFzeW5jIGFkZFdhdGVyTWFyayhyZXEsIHJlcykge1xuICAgIC8vIGNvbnN0IHsgIG91dHB1dEZpbGVuYW1lIH0gPSByZXEuYm9keTtcbiAgICBjb25zdCB1cGxvYWRlZEltYWdlID0gcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi8uLi8uLi8uLi9cIiwgcmVxLmZpbGUucGF0aCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IFtpbWFnZSwgbG9nb10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIEppbXAucmVhZCh1cGxvYWRlZEltYWdlKSxcbiAgICAgICAgSmltcC5yZWFkKGxvZ29QYXRoKSxcbiAgICAgIF0pO1xuXG4gICAgICAvLyBSZXNpemUgbG9nb1xuICAgICAgY29uc3QgZGVzaXJlZExvZ29XaWR0aCA9IDI1MDtcbiAgICAgIGNvbnN0IGRlc2lyZWRMb2dvSGVpZ2h0ID0gMjUwO1xuICAgICAgbG9nby5yZXNpemUoZGVzaXJlZExvZ29XaWR0aCwgZGVzaXJlZExvZ29IZWlnaHQpO1xuICAgICAgY29uc3QgbG9nb1dpZHRoID0gMjUwOyAvLyDEkOG6t3Qga8OtY2ggdGjGsOG7m2MgbeG7m2kgY+G7p2EgbG9nbyDhu58gxJHDonlcblxuICAgICAgY29uc3QgbG9nb1ggPSBpbWFnZS5iaXRtYXAud2lkdGggLSBsb2dvV2lkdGggLSA1MDtcbiAgICAgIGNvbnN0IGxvZ29ZID0gNTA7XG4gICAgICBsb2dvLm9wYWNpdHkoMC40KVxuICAgICAgaW1hZ2UuY29tcG9zaXRlKGxvZ28sIGxvZ29YLCBsb2dvWSwgW1xuICAgICAgICB7XG4gICAgICAgICAgbW9kZTogSmltcC5CTEVORF9TQ1JFRU4sXG4gICAgICAgICAgb3BhY2l0eVNvdXJjZTogMC4xLFxuICAgICAgICAgIG9wYWNpdHlEZXN0OiAwLjEsXG4gICAgICAgIH0sXG4gICAgICBdKTtcbiAgICAgIGNvbnN0IHV1aWQ9IHY0KClcbiAgICAgIGF3YWl0IGltYWdlLndyaXRlQXN5bmMocGF0aC5qb2luKG91dHB1dEZpbGVuYW1lLCBcIi9cIiwgdXVpZCArIFwiLnBuZ1wiKSk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQoeyBmaWxlX3BhdGg6IChzZXJ2ZXJIb3N0ICsgXCIvXCIgKyB1dWlkICsgXCIucG5nXCIpIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3I6XCIsIGVycm9yKTtcbiAgICAgIHJlc1xuICAgICAgICAuc3RhdHVzKDUwMClcbiAgICAgICAgLnNlbmQoeyBlcnJvcjogXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBhZGRpbmcgd2F0ZXJtYXJrIHRvIGltYWdlLlwiIH0pO1xuICAgIH1cbiAgfSxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxLQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxLQUFBLEdBQUFGLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBRSxLQUFBLEdBQUFGLE9BQUE7QUFFQSxJQUFNRyxVQUFVLGlDQUFpQztBQUNqRCxJQUFNQyxRQUFRLEdBQUdDLGdCQUFJLENBQUNDLElBQUksQ0FBQ0MsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUM7QUFDOUQsSUFBTUMsY0FBYyxHQUFFSCxnQkFBSSxDQUFDQyxJQUFJLENBQUNDLFNBQVMsRUFBRSxjQUFjLEVBQUUsV0FBVyxDQUFDO0FBQUEsSUFBQUUsUUFBQSxHQUV4RDtFQUNQQyxZQUFZLFdBQUFBLGFBQUNDLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBQUEsV0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEs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