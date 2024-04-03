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
            desiredLogoHeight = _jimp["default"].AUTO;
            logo.resize(desiredLogoWidth, desiredLogoHeight);
            logoWidth = 250; // Đặt kích thước mới của logo ở đây
            logoX = 50;
            logoY = 50;
            logo.opacity(1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfamltcCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX3BhdGgiLCJfdXVpZCIsInNlcnZlckhvc3QiLCJsb2dvUGF0aCIsInBhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwib3V0cHV0RmlsZW5hbWUiLCJfZGVmYXVsdCIsImFkZFdhdGVyTWFyayIsInJlcSIsInJlcyIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwidXBsb2FkZWRJbWFnZSIsIl95aWVsZCRQcm9taXNlJGFsbCIsIl95aWVsZCRQcm9taXNlJGFsbDIiLCJpbWFnZSIsImxvZ28iLCJkZXNpcmVkTG9nb1dpZHRoIiwiZGVzaXJlZExvZ29IZWlnaHQiLCJsb2dvV2lkdGgiLCJsb2dvWCIsImxvZ29ZIiwidXVpZCIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJmaWxlIiwiUHJvbWlzZSIsImFsbCIsIkppbXAiLCJyZWFkIiwic2VudCIsIl9zbGljZWRUb0FycmF5MiIsIkFVVE8iLCJyZXNpemUiLCJvcGFjaXR5IiwiY29tcG9zaXRlIiwibW9kZSIsIkJMRU5EX1NDUkVFTiIsIm9wYWNpdHlTb3VyY2UiLCJvcGFjaXR5RGVzdCIsInY0Iiwid3JpdGVBc3luYyIsImFicnVwdCIsInN0YXR1cyIsInNlbmQiLCJmaWxlX3BhdGgiLCJ0MCIsImNvbnNvbGUiLCJlcnJvciIsInN0b3AiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvd2F0ZXJtYXJrL3dhdGVyLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEppbXAgZnJvbSBcImppbXBcIlxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIlxuaW1wb3J0IHsgdjQgfSBmcm9tIFwidXVpZFwiO1xuXG5jb25zdCBzZXJ2ZXJIb3N0ID0gYGh0dHBzOi8vdHJvdXl0aW4ub25saW5lOjg0NDNgO1xuY29uc3QgbG9nb1BhdGggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uLy4uLy4uXCIsIFwiL2xvZ28ucG5nXCIpO1xuY29uc3Qgb3V0cHV0RmlsZW5hbWU9IHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vLi4vLi4vLi4vXCIsIFwid2F0ZXJtYXJrXCIpXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYXN5bmMgYWRkV2F0ZXJNYXJrKHJlcSwgcmVzKSB7XG4gICAgLy8gY29uc3QgeyAgb3V0cHV0RmlsZW5hbWUgfSA9IHJlcS5ib2R5O1xuICAgIGNvbnN0IHVwbG9hZGVkSW1hZ2UgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uLy4uLy4uLy4uL1wiLCByZXEuZmlsZS5wYXRoKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgW2ltYWdlLCBsb2dvXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgSmltcC5yZWFkKHVwbG9hZGVkSW1hZ2UpLFxuICAgICAgICBKaW1wLnJlYWQobG9nb1BhdGgpLFxuICAgICAgXSk7XG5cbiAgICAgIC8vIFJlc2l6ZSBsb2dvXG4gICAgICBjb25zdCBkZXNpcmVkTG9nb1dpZHRoID0gMjUwO1xuICAgICAgY29uc3QgZGVzaXJlZExvZ29IZWlnaHQgPSBKaW1wLkFVVE87XG4gICAgICBsb2dvLnJlc2l6ZShkZXNpcmVkTG9nb1dpZHRoLCBkZXNpcmVkTG9nb0hlaWdodCk7XG4gICAgICBjb25zdCBsb2dvV2lkdGggPSAyNTA7IC8vIMSQ4bq3dCBrw61jaCB0aMaw4bubYyBt4bubaSBj4bunYSBsb2dvIOG7nyDEkcOieVxuXG4gICAgICBjb25zdCBsb2dvWCA9IDUwO1xuICAgICAgY29uc3QgbG9nb1kgPSA1MDtcbiAgICAgIGxvZ28ub3BhY2l0eSgxKVxuICAgICAgaW1hZ2UuY29tcG9zaXRlKGxvZ28sIGxvZ29YLCBsb2dvWSwgW1xuICAgICAgICB7XG4gICAgICAgICAgbW9kZTogSmltcC5CTEVORF9TQ1JFRU4sXG4gICAgICAgICAgb3BhY2l0eVNvdXJjZTogMC4xLFxuICAgICAgICAgIG9wYWNpdHlEZXN0OiAwLjEsXG4gICAgICAgIH0sXG4gICAgICBdKTtcbiAgICAgIGNvbnN0IHV1aWQ9IHY0KClcbiAgICAgIGF3YWl0IGltYWdlLndyaXRlQXN5bmMocGF0aC5qb2luKG91dHB1dEZpbGVuYW1lLCBcIi9cIiwgdXVpZCArIFwiLnBuZ1wiKSk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQoeyBmaWxlX3BhdGg6IChzZXJ2ZXJIb3N0ICsgXCIvXCIgKyB1dWlkICsgXCIucG5nXCIpIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3I6XCIsIGVycm9yKTtcbiAgICAgIHJlc1xuICAgICAgICAuc3RhdHVzKDUwMClcbiAgICAgICAgLnNlbmQoeyBlcnJvcjogXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBhZGRpbmcgd2F0ZXJtYXJrIHRvIGltYWdlLlwiIH0pO1xuICAgIH1cbiAgfSxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxLQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxLQUFBLEdBQUFGLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBRSxLQUFBLEdBQUFGLE9BQUE7QUFFQSxJQUFNRyxVQUFVLGlDQUFpQztBQUNqRCxJQUFNQyxRQUFRLEdBQUdDLGdCQUFJLENBQUNDLElBQUksQ0FBQ0MsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUM7QUFDOUQsSUFBTUMsY0FBYyxHQUFFSCxnQkFBSSxDQUFDQyxJQUFJLENBQUNDLFNBQVMsRUFBRSxjQUFjLEVBQUUsV0FBVyxDQUFDO0FBQUEsSUFBQUUsUUFBQSxHQUV4RDtFQUNQQyxZQUFZLFdBQUFBLGFBQUNDLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBQUEsV0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBQyxRQUFBO01BQUEsSUFBQUMsYUFBQSxF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