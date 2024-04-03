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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfamltcCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX3BhdGgiLCJfdXVpZCIsInNlcnZlckhvc3QiLCJsb2dvUGF0aCIsInBhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwib3V0cHV0RmlsZW5hbWUiLCJfZGVmYXVsdCIsImFkZFdhdGVyTWFyayIsInJlcSIsInJlcyIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwidXBsb2FkZWRJbWFnZSIsIl95aWVsZCRQcm9taXNlJGFsbCIsIl95aWVsZCRQcm9taXNlJGFsbDIiLCJpbWFnZSIsImxvZ28iLCJkZXNpcmVkTG9nb1dpZHRoIiwiZGVzaXJlZExvZ29IZWlnaHQiLCJsb2dvV2lkdGgiLCJsb2dvWCIsImxvZ29ZIiwidXVpZCIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJmaWxlIiwiUHJvbWlzZSIsImFsbCIsIkppbXAiLCJyZWFkIiwic2VudCIsIl9zbGljZWRUb0FycmF5MiIsInJlc2l6ZSIsIm9wYWNpdHkiLCJjb21wb3NpdGUiLCJtb2RlIiwiQkxFTkRfU0NSRUVOIiwib3BhY2l0eVNvdXJjZSIsIm9wYWNpdHlEZXN0IiwidjQiLCJ3cml0ZUFzeW5jIiwiYWJydXB0Iiwic3RhdHVzIiwic2VuZCIsImZpbGVfcGF0aCIsInQwIiwiY29uc29sZSIsImVycm9yIiwic3RvcCIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy93YXRlcm1hcmsvd2F0ZXIuY29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSmltcCBmcm9tIFwiamltcFwiXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiXG5pbXBvcnQgeyB2NCB9IGZyb20gXCJ1dWlkXCI7XG5cbmNvbnN0IHNlcnZlckhvc3QgPSBgaHR0cHM6Ly90cm91eXRpbi5vbmxpbmU6ODQ0M2A7XG5jb25zdCBsb2dvUGF0aCA9IHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vLi4vLi5cIiwgXCIvbG9nby5wbmdcIik7XG5jb25zdCBvdXRwdXRGaWxlbmFtZT0gcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi8uLi8uLi8uLi9cIiwgXCJ3YXRlcm1hcmtcIilcblxuZXhwb3J0IGRlZmF1bHQge1xuICBhc3luYyBhZGRXYXRlck1hcmsocmVxLCByZXMpIHtcbiAgICAvLyBjb25zdCB7ICBvdXRwdXRGaWxlbmFtZSB9ID0gcmVxLmJvZHk7XG4gICAgY29uc3QgdXBsb2FkZWRJbWFnZSA9IHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vLi4vLi4vLi4vXCIsIHJlcS5maWxlLnBhdGgpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBbaW1hZ2UsIGxvZ29dID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBKaW1wLnJlYWQodXBsb2FkZWRJbWFnZSksXG4gICAgICAgIEppbXAucmVhZChsb2dvUGF0aCksXG4gICAgICBdKTtcblxuICAgICAgLy8gUmVzaXplIGxvZ29cbiAgICAgIGNvbnN0IGRlc2lyZWRMb2dvV2lkdGggPSAyNTA7XG4gICAgICBjb25zdCBkZXNpcmVkTG9nb0hlaWdodCA9IDI1MDtcbiAgICAgIGxvZ28ucmVzaXplKGRlc2lyZWRMb2dvV2lkdGgsIGRlc2lyZWRMb2dvSGVpZ2h0KTtcbiAgICAgIGNvbnN0IGxvZ29XaWR0aCA9IDI1MDsgLy8gxJDhurd0IGvDrWNoIHRoxrDhu5tjIG3hu5tpIGPhu6dhIGxvZ28g4bufIMSRw6J5XG5cbiAgICAgIGNvbnN0IGxvZ29YID0gNTA7XG4gICAgICBjb25zdCBsb2dvWSA9IDUwO1xuICAgICAgbG9nby5vcGFjaXR5KDEpXG4gICAgICBpbWFnZS5jb21wb3NpdGUobG9nbywgbG9nb1gsIGxvZ29ZLCBbXG4gICAgICAgIHtcbiAgICAgICAgICBtb2RlOiBKaW1wLkJMRU5EX1NDUkVFTixcbiAgICAgICAgICBvcGFjaXR5U291cmNlOiAwLjEsXG4gICAgICAgICAgb3BhY2l0eURlc3Q6IDAuMSxcbiAgICAgICAgfSxcbiAgICAgIF0pO1xuICAgICAgY29uc3QgdXVpZD0gdjQoKVxuICAgICAgYXdhaXQgaW1hZ2Uud3JpdGVBc3luYyhwYXRoLmpvaW4ob3V0cHV0RmlsZW5hbWUsIFwiL1wiLCB1dWlkICsgXCIucG5nXCIpKTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZCh7IGZpbGVfcGF0aDogKHNlcnZlckhvc3QgKyBcIi9cIiArIHV1aWQgKyBcIi5wbmdcIikgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgcmVzXG4gICAgICAgIC5zdGF0dXMoNTAwKVxuICAgICAgICAuc2VuZCh7IGVycm9yOiBcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGFkZGluZyB3YXRlcm1hcmsgdG8gaW1hZ2UuXCIgfSk7XG4gICAgfVxuICB9LFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUFBLEtBQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFDLEtBQUEsR0FBQUYsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFFLEtBQUEsR0FBQUYsT0FBQTtBQUVBLElBQU1HLFVBQVUsaUNBQWlDO0FBQ2pELElBQU1DLFFBQVEsR0FBR0MsZ0JBQUksQ0FBQ0MsSUFBSSxDQUFDQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQztBQUM5RCxJQUFNQyxjQUFjLEdBQUVILGdCQUFJLENBQUNDLElBQUksQ0FBQ0MsU0FBUyxFQUFFLGNBQWMsRUFBRSxXQUFXLENBQUM7QUFBQSxJQUFBRSxRQUFBLEdBRXhEO0VBQ1BDLFlBQVksV0FBQUEsYUFBQ0MsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUFDLFFBQUE7TUFBQSxJQUFBQyxhQUFBLEVBQUFDLGtCQUFBLEVB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