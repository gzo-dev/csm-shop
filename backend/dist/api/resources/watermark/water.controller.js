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
      var uploadedImage, _yield$Promise$all, _yield$Promise$all2, image, logo, desiredLogoWidth, desiredLogoHeight, logoX, logoY, uuid;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            // const {  outputFilename } = req.body;
            uploadedImage = _path["default"].join(__dirname, "../../../../", req.file.path);
            console.log(uploadedImage);
            _context.prev = 2;
            _context.next = 5;
            return Promise.all([_jimp["default"].read(uploadedImage), _jimp["default"].read(logoPath)]);
          case 5:
            _yield$Promise$all = _context.sent;
            _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 2);
            image = _yield$Promise$all2[0];
            logo = _yield$Promise$all2[1];
            // Resize logo
            desiredLogoWidth = 500;
            desiredLogoHeight = 500;
            logo.resize(desiredLogoWidth, desiredLogoHeight);
            logoX = image.bitmap.width - logo.bitmap.width - 50;
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
            _context.t0 = _context["catch"](2);
            console.error("Error:", _context.t0);
            res.status(500).send({
              error: "An error occurred while adding watermark to image."
            });
          case 26:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[2, 22]]);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfamltcCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX3BhdGgiLCJfdXVpZCIsInNlcnZlckhvc3QiLCJsb2dvUGF0aCIsInBhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwib3V0cHV0RmlsZW5hbWUiLCJfZGVmYXVsdCIsImFkZFdhdGVyTWFyayIsInJlcSIsInJlcyIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwidXBsb2FkZWRJbWFnZSIsIl95aWVsZCRQcm9taXNlJGFsbCIsIl95aWVsZCRQcm9taXNlJGFsbDIiLCJpbWFnZSIsImxvZ28iLCJkZXNpcmVkTG9nb1dpZHRoIiwiZGVzaXJlZExvZ29IZWlnaHQiLCJsb2dvWCIsImxvZ29ZIiwidXVpZCIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJmaWxlIiwiY29uc29sZSIsImxvZyIsIlByb21pc2UiLCJhbGwiLCJKaW1wIiwicmVhZCIsInNlbnQiLCJfc2xpY2VkVG9BcnJheTIiLCJyZXNpemUiLCJiaXRtYXAiLCJ3aWR0aCIsIm9wYWNpdHkiLCJjb21wb3NpdGUiLCJtb2RlIiwiQkxFTkRfU0NSRUVOIiwib3BhY2l0eVNvdXJjZSIsIm9wYWNpdHlEZXN0IiwidjQiLCJ3cml0ZUFzeW5jIiwiYWJydXB0Iiwic3RhdHVzIiwic2VuZCIsImZpbGVfcGF0aCIsInQwIiwiZXJyb3IiLCJzdG9wIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL3dhdGVybWFyay93YXRlci5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBKaW1wIGZyb20gXCJqaW1wXCJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCJcbmltcG9ydCB7IHY0IH0gZnJvbSBcInV1aWRcIjtcblxuY29uc3Qgc2VydmVySG9zdCA9IGBodHRwczovL3Ryb3V5dGluLm9ubGluZTo4NDQzYDtcbmNvbnN0IGxvZ29QYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi8uLi8uLlwiLCBcIi9sb2dvLnBuZ1wiKTtcbmNvbnN0IG91dHB1dEZpbGVuYW1lPSBwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uLy4uLy4uLy4uL1wiLCBcIndhdGVybWFya1wiKVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFzeW5jIGFkZFdhdGVyTWFyayhyZXEsIHJlcykge1xuICAgIC8vIGNvbnN0IHsgIG91dHB1dEZpbGVuYW1lIH0gPSByZXEuYm9keTtcbiAgICBjb25zdCB1cGxvYWRlZEltYWdlID0gcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi8uLi8uLi8uLi9cIiwgcmVxLmZpbGUucGF0aCk7XG4gICAgY29uc29sZS5sb2codXBsb2FkZWRJbWFnZSlcbiAgICB0cnkge1xuICAgICAgY29uc3QgW2ltYWdlLCBsb2dvXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgSmltcC5yZWFkKHVwbG9hZGVkSW1hZ2UpLFxuICAgICAgICBKaW1wLnJlYWQobG9nb1BhdGgpLFxuICAgICAgXSk7XG5cbiAgICAgIC8vIFJlc2l6ZSBsb2dvXG4gICAgICBjb25zdCBkZXNpcmVkTG9nb1dpZHRoID0gNTAwO1xuICAgICAgY29uc3QgZGVzaXJlZExvZ29IZWlnaHQgPSA1MDA7XG4gICAgICBsb2dvLnJlc2l6ZShkZXNpcmVkTG9nb1dpZHRoLCBkZXNpcmVkTG9nb0hlaWdodCk7XG5cbiAgICAgIGNvbnN0IGxvZ29YID0gaW1hZ2UuYml0bWFwLndpZHRoIC0gbG9nby5iaXRtYXAud2lkdGggLSA1MDtcbiAgICAgIGNvbnN0IGxvZ29ZID0gNTA7XG4gICAgICBsb2dvLm9wYWNpdHkoMC40KVxuICAgICAgaW1hZ2UuY29tcG9zaXRlKGxvZ28sIGxvZ29YLCBsb2dvWSwgW1xuICAgICAgICB7XG4gICAgICAgICAgbW9kZTogSmltcC5CTEVORF9TQ1JFRU4sXG4gICAgICAgICAgb3BhY2l0eVNvdXJjZTogMC4xLFxuICAgICAgICAgIG9wYWNpdHlEZXN0OiAwLjEsXG4gICAgICAgIH0sXG4gICAgICBdKTtcbiAgICAgIGNvbnN0IHV1aWQ9IHY0KClcbiAgICAgIGF3YWl0IGltYWdlLndyaXRlQXN5bmMocGF0aC5qb2luKG91dHB1dEZpbGVuYW1lLCBcIi9cIiwgdXVpZCArIFwiLnBuZ1wiKSk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQoeyBmaWxlX3BhdGg6IChzZXJ2ZXJIb3N0ICsgXCIvXCIgKyB1dWlkICsgXCIucG5nXCIpIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3I6XCIsIGVycm9yKTtcbiAgICAgIHJlc1xuICAgICAgICAuc3RhdHVzKDUwMClcbiAgICAgICAgLnNlbmQoeyBlcnJvcjogXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBhZGRpbmcgd2F0ZXJtYXJrIHRvIGltYWdlLlwiIH0pO1xuICAgIH1cbiAgfSxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxLQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxLQUFBLEdBQUFGLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBRSxLQUFBLEdBQUFGLE9BQUE7QUFFQSxJQUFNRyxVQUFVLGlDQUFpQztBQUNqRCxJQUFNQyxRQUFRLEdBQUdDLGdCQUFJLENBQUNDLElBQUksQ0FBQ0MsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUM7QUFDOUQsSUFBTUMsY0FBYyxHQUFFSCxnQkFBSSxDQUFDQyxJQUFJLENBQUNDLFNBQVMsRUFBRSxjQUFjLEVBQUUsV0FBVyxDQUFDO0FBQUEsSUFBQUUsUUFBQSxHQUV4RDtFQUNQQyxZQUFZLFdBQUFBLGFBQUNDLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBQUEsV0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBQyxRQUFBO01BQUEsSUFBQUMsYUFBQSxFQUFBQyxrQkFB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