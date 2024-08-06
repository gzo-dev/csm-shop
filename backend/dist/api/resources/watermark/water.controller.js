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
var _sharp = _interopRequireDefault(require("sharp"));
var _fs = _interopRequireDefault(require("fs"));
// Import thư viện Sharp

var serverHost = "http://localhost:4001";
var logoPath = _path["default"].join(__dirname, "../../..", "/logo.png");
var outputFilename = _path["default"].join(__dirname, "../../../../", "watermark");
var _default = {
  addWaterMark: function addWaterMark(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var uploadedImage, _yield$Promise$all, _yield$Promise$all2, image, logo, imageWidth, imageHeight, desiredLogoWidth, desiredLogoHeight, logoX, logoY, uuid, outputImagePath, text, textColor, finalOutputImagePath;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            uploadedImage = _path["default"].join(__dirname, "../../../../", req.file.path);
            _context.prev = 1;
            _context.next = 4;
            return Promise.all([_jimp["default"].read(uploadedImage), _jimp["default"].read(logoPath)]);
          case 4:
            _yield$Promise$all = _context.sent;
            _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 2);
            image = _yield$Promise$all2[0];
            logo = _yield$Promise$all2[1];
            imageWidth = image.getWidth();
            imageHeight = image.getHeight(); // Resize logo bằng Jimp
            desiredLogoWidth = 250;
            desiredLogoHeight = _jimp["default"].AUTO;
            logo.resize(desiredLogoWidth, desiredLogoHeight);
            logoX = 50;
            logoY = 50;
            logo.opacity(1);

            // Chèn logo vào ảnh với hiệu ứng bằng Jimp
            image.composite(logo, logoX, logoY, [{
              mode: _jimp["default"].BLEND_SCREEN,
              opacitySource: 0.1,
              opacityDest: 0.1
            }]);

            // Lưu ảnh đã thêm watermark bằng Jimp
            uuid = (0, _uuid.v4)();
            outputImagePath = _path["default"].join(outputFilename, "".concat(uuid, ".png"));
            _context.next = 21;
            return image.writeAsync(outputImagePath);
          case 21:
            // Thêm văn bản có màu vào ảnh bằng Sharp
            text = "MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN";
            textColor = "#e60123";
            _context.next = 25;
            return addTextToImage(outputImagePath, outputImagePath, text, textColor, "30%", imageWidth, imageHeight);
          case 25:
            _context.next = 27;
            return addTextToImage(outputImagePath, outputImagePath, text, textColor, "70%", imageWidth, imageHeight);
          case 27:
            finalOutputImagePath = _path["default"].join(outputFilename, "".concat(uuid, ".jpg"));
            _context.next = 30;
            return (0, _sharp["default"])(outputImagePath).jpeg({
              quality: 70
            }).resize({
              fit: "inside",
              width: 720
            }).toFile(finalOutputImagePath);
          case 30:
            _fs["default"].unlinkSync(outputImagePath);
            // Trả về đường dẫn ảnh đã xử lý
            return _context.abrupt("return", res.status(200).send({
              file_path: "".concat(serverHost, "/").concat(uuid, ".jpg")
            }));
          case 34:
            _context.prev = 34;
            _context.t0 = _context["catch"](1);
            console.error("Error:", _context.t0);
            res.status(500).send({
              error: "An error occurred while adding watermark to image."
            });
          case 38:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[1, 34]]);
    }))();
  }
}; // Hàm thêm văn bản có màu vào ảnh bằng Sharp
exports["default"] = _default;
function addTextToImage(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
  return _addTextToImage.apply(this, arguments);
}
function _addTextToImage() {
  _addTextToImage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(inputImagePath, outputImagePath, text, textColor, y, imageWidth, imageHeight) {
    var tempOutputPath, image, textLayer;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          // Tạo một bản sao của ảnh để tránh lỗi "Cannot use same file for input and output"
          tempOutputPath = _path["default"].join(outputFilename, "".concat((0, _uuid.v4)(), ".png")); // Đọc ảnh đầu vào bằng Sharp
          image = (0, _sharp["default"])(inputImagePath); // Tạo lớp văn bản mới với màu sắc tùy chỉnh
          textLayer = Buffer.from("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"".concat(imageWidth, "\" height=\"").concat(imageHeight, "\">\n          <text x=\"0\" y=\"").concat(y, "\" dominant-baseline=\"middle\" text-anchor=\"middle\" font-family=\"Arial\" font-size=\"60\" fill=\"").concat(textColor, "\" font-weight=\"bold\" opacity=\"0.15\">\n              ").concat(text, "\n          </text>\n      </svg>\n      ")); // Ghép lớp văn bản vào ảnh bằng Sharp
          image.composite([{
            input: textLayer,
            blend: "over"
          }]);

          // Lưu ảnh đã xử lý vào tệp tạm thời
          _context2.next = 7;
          return image.toFile(tempOutputPath);
        case 7:
          _context2.next = 9;
          return (0, _sharp["default"])(tempOutputPath).toFile(outputImagePath);
        case 9:
          _context2.next = 11;
          return _fs["default"].promises.unlink(tempOutputPath);
        case 11:
          _context2.next = 17;
          break;
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          console.error("Error adding text to image with Sharp:", _context2.t0);
          throw _context2.t0;
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 13]]);
  }));
  return _addTextToImage.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfamltcCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX3BhdGgiLCJfdXVpZCIsIl9zaGFycCIsIl9mcyIsInNlcnZlckhvc3QiLCJsb2dvUGF0aCIsInBhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwib3V0cHV0RmlsZW5hbWUiLCJfZGVmYXVsdCIsImFkZFdhdGVyTWFyayIsInJlcSIsInJlcyIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwidXBsb2FkZWRJbWFnZSIsIl95aWVsZCRQcm9taXNlJGFsbCIsIl95aWVsZCRQcm9taXNlJGFsbDIiLCJpbWFnZSIsImxvZ28iLCJpbWFnZVdpZHRoIiwiaW1hZ2VIZWlnaHQiLCJkZXNpcmVkTG9nb1dpZHRoIiwiZGVzaXJlZExvZ29IZWlnaHQiLCJsb2dvWCIsImxvZ29ZIiwidXVpZCIsIm91dHB1dEltYWdlUGF0aCIsInRleHQiLCJ0ZXh0Q29sb3IiLCJmaW5hbE91dHB1dEltYWdlUGF0aCIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJmaWxlIiwiUHJvbWlzZSIsImFsbCIsIkppbXAiLCJyZWFkIiwic2VudCIsIl9zbGljZWRUb0FycmF5MiIsImdldFdpZHRoIiwiZ2V0SGVpZ2h0IiwiQVVUTyIsInJlc2l6ZSIsIm9wYWNpdHkiLCJjb21wb3NpdGUiLCJtb2RlIiwiQkxFTkRfU0NSRUVOIiwib3BhY2l0eVNvdXJjZSIsIm9wYWNpdHlEZXN0IiwidjQiLCJjb25jYXQiLCJ3cml0ZUFzeW5jIiwiYWRkVGV4dFRvSW1hZ2UiLCJzaGFycCIsImpwZWciLCJxdWFsaXR5IiwiZml0Iiwid2lkdGgiLCJ0b0ZpbGUiLCJmcyIsInVubGlua1N5bmMiLCJhYnJ1cHQiLCJzdGF0dXMiLCJzZW5kIiwiZmlsZV9wYXRoIiwidDAiLCJjb25zb2xlIiwiZXJyb3IiLCJzdG9wIiwiZXhwb3J0cyIsIl94IiwiX3gyIiwiX3gzIiwiX3g0IiwiX3g1IiwiX3g2IiwiX3g3IiwiX2FkZFRleHRUb0ltYWdlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfY2FsbGVlMiIsImlucHV0SW1hZ2VQYXRoIiwieSIsInRlbXBPdXRwdXRQYXRoIiwidGV4dExheWVyIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiQnVmZmVyIiwiZnJvbSIsImlucHV0IiwiYmxlbmQiLCJwcm9taXNlcyIsInVubGluayJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL3dhdGVybWFyay93YXRlci5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBKaW1wIGZyb20gXCJqaW1wXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IHY0IH0gZnJvbSBcInV1aWRcIjtcclxuaW1wb3J0IHNoYXJwIGZyb20gXCJzaGFycFwiOyAvLyBJbXBvcnQgdGjGsCB2aeG7h24gU2hhcnBcclxuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xyXG5jb25zdCBzZXJ2ZXJIb3N0ID0gYGh0dHA6Ly9sb2NhbGhvc3Q6NDAwMWA7XHJcbmNvbnN0IGxvZ29QYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi8uLi8uLlwiLCBcIi9sb2dvLnBuZ1wiKTtcclxuY29uc3Qgb3V0cHV0RmlsZW5hbWUgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uLy4uLy4uLy4uL1wiLCBcIndhdGVybWFya1wiKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBhc3luYyBhZGRXYXRlck1hcmsocmVxLCByZXMpIHtcclxuICAgIGNvbnN0IHVwbG9hZGVkSW1hZ2UgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uLy4uLy4uLy4uL1wiLCByZXEuZmlsZS5wYXRoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIC8vIMSQ4buNYyDhuqNuaCBn4buRYyB2w6AgbG9nbyBi4bqxbmcgSmltcFxyXG4gICAgICBjb25zdCBbaW1hZ2UsIGxvZ29dID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgIEppbXAucmVhZCh1cGxvYWRlZEltYWdlKSxcclxuICAgICAgICBKaW1wLnJlYWQobG9nb1BhdGgpLFxyXG4gICAgICBdKTtcclxuICAgICAgY29uc3QgaW1hZ2VXaWR0aCA9IGltYWdlLmdldFdpZHRoKCk7XHJcbiAgICAgIGNvbnN0IGltYWdlSGVpZ2h0ID0gaW1hZ2UuZ2V0SGVpZ2h0KCk7XHJcbiAgICAgIC8vIFJlc2l6ZSBsb2dvIGLhurFuZyBKaW1wXHJcbiAgICAgIGNvbnN0IGRlc2lyZWRMb2dvV2lkdGggPSAyNTA7XHJcbiAgICAgIGNvbnN0IGRlc2lyZWRMb2dvSGVpZ2h0ID0gSmltcC5BVVRPO1xyXG4gICAgICBsb2dvLnJlc2l6ZShkZXNpcmVkTG9nb1dpZHRoLCBkZXNpcmVkTG9nb0hlaWdodCk7XHJcblxyXG4gICAgICBjb25zdCBsb2dvWCA9IDUwO1xyXG4gICAgICBjb25zdCBsb2dvWSA9IDUwO1xyXG4gICAgICBsb2dvLm9wYWNpdHkoMSk7XHJcblxyXG4gICAgICAvLyBDaMOobiBsb2dvIHbDoG8g4bqjbmggduG7m2kgaGnhu4d1IOG7qW5nIGLhurFuZyBKaW1wXHJcbiAgICAgIGltYWdlLmNvbXBvc2l0ZShsb2dvLCBsb2dvWCwgbG9nb1ksIFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBtb2RlOiBKaW1wLkJMRU5EX1NDUkVFTixcclxuICAgICAgICAgIG9wYWNpdHlTb3VyY2U6IDAuMSxcclxuICAgICAgICAgIG9wYWNpdHlEZXN0OiAwLjEsXHJcbiAgICAgICAgfSxcclxuICAgICAgXSk7XHJcblxyXG4gICAgICAvLyBMxrB1IOG6o25oIMSRw6MgdGjDqm0gd2F0ZXJtYXJrIGLhurFuZyBKaW1wXHJcbiAgICAgIGNvbnN0IHV1aWQgPSB2NCgpO1xyXG4gICAgICBjb25zdCBvdXRwdXRJbWFnZVBhdGggPSBwYXRoLmpvaW4ob3V0cHV0RmlsZW5hbWUsIGAke3V1aWR9LnBuZ2ApO1xyXG4gICAgICBhd2FpdCBpbWFnZS53cml0ZUFzeW5jKG91dHB1dEltYWdlUGF0aCk7XHJcblxyXG4gICAgICAvLyBUaMOqbSB2xINuIGLhuqNuIGPDsyBtw6B1IHbDoG8g4bqjbmggYuG6sW5nIFNoYXJwXHJcbiAgICAgIGNvbnN0IHRleHQgPVxyXG4gICAgICAgIFwiTUlOSEtIQU5HR1JPVVAuVk4gTUlOSEtIQU5HR1JPVVAuVk4gTUlOSEtIQU5HR1JPVVAuVk4gTUlOSEtIQU5HR1JPVVAuVk4gTUlOSEtIQU5HR1JPVVAuVk4gTUlOSEtIQU5HR1JPVVAuVk4gTUlOSEtIQU5HR1JPVVAuVk4gTUlOSEtIQU5HR1JPVVAuVk4gTUlOSEtIQU5HR1JPVVAuVk4gTUlOSEtIQU5HR1JPVVAuVk5cIjtcclxuICAgICAgY29uc3QgdGV4dENvbG9yID0gXCIjZTYwMTIzXCI7XHJcbiAgICAgIGF3YWl0IGFkZFRleHRUb0ltYWdlKFxyXG4gICAgICAgIG91dHB1dEltYWdlUGF0aCxcclxuICAgICAgICBvdXRwdXRJbWFnZVBhdGgsXHJcbiAgICAgICAgdGV4dCxcclxuICAgICAgICB0ZXh0Q29sb3IsXHJcbiAgICAgICAgXCIzMCVcIixcclxuICAgICAgICBpbWFnZVdpZHRoLFxyXG4gICAgICAgIGltYWdlSGVpZ2h0XHJcbiAgICAgICk7XHJcbiAgICAgIGF3YWl0IGFkZFRleHRUb0ltYWdlKFxyXG4gICAgICAgIG91dHB1dEltYWdlUGF0aCxcclxuICAgICAgICBvdXRwdXRJbWFnZVBhdGgsXHJcbiAgICAgICAgdGV4dCxcclxuICAgICAgICB0ZXh0Q29sb3IsXHJcbiAgICAgICAgXCI3MCVcIixcclxuICAgICAgICBpbWFnZVdpZHRoLFxyXG4gICAgICAgIGltYWdlSGVpZ2h0XHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IGZpbmFsT3V0cHV0SW1hZ2VQYXRoID0gcGF0aC5qb2luKG91dHB1dEZpbGVuYW1lLCBgJHt1dWlkfS5qcGdgKTtcclxuICAgICAgYXdhaXQgc2hhcnAob3V0cHV0SW1hZ2VQYXRoKVxyXG4gICAgICAgIC5qcGVnKHsgcXVhbGl0eTogNzAgfSlcclxuICAgICAgICAucmVzaXplKHtmaXQ6IFwiaW5zaWRlXCIsIHdpZHRoOiA3MjB9KVxyXG4gICAgICAgIC50b0ZpbGUoZmluYWxPdXRwdXRJbWFnZVBhdGgpO1xyXG4gICAgICBmcy51bmxpbmtTeW5jKG91dHB1dEltYWdlUGF0aCk7XHJcbiAgICAgIC8vIFRy4bqjIHbhu4EgxJHGsOG7nW5nIGThuqtuIOG6o25oIMSRw6MgeOG7rSBsw71cclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHsgZmlsZV9wYXRoOiBgJHtzZXJ2ZXJIb3N0fS8ke3V1aWR9LmpwZ2AgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3I6XCIsIGVycm9yKTtcclxuICAgICAgcmVzXHJcbiAgICAgICAgLnN0YXR1cyg1MDApXHJcbiAgICAgICAgLnNlbmQoeyBlcnJvcjogXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBhZGRpbmcgd2F0ZXJtYXJrIHRvIGltYWdlLlwiIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbn07XHJcblxyXG4vLyBIw6BtIHRow6ptIHbEg24gYuG6o24gY8OzIG3DoHUgdsOgbyDhuqNuaCBi4bqxbmcgU2hhcnBcclxuYXN5bmMgZnVuY3Rpb24gYWRkVGV4dFRvSW1hZ2UoXHJcbiAgaW5wdXRJbWFnZVBhdGgsXHJcbiAgb3V0cHV0SW1hZ2VQYXRoLFxyXG4gIHRleHQsXHJcbiAgdGV4dENvbG9yLFxyXG4gIHksXHJcbiAgaW1hZ2VXaWR0aCxcclxuICBpbWFnZUhlaWdodFxyXG4pIHtcclxuICB0cnkge1xyXG4gICAgLy8gVOG6oW8gbeG7mXQgYuG6o24gc2FvIGPhu6dhIOG6o25oIMSR4buDIHRyw6FuaCBs4buXaSBcIkNhbm5vdCB1c2Ugc2FtZSBmaWxlIGZvciBpbnB1dCBhbmQgb3V0cHV0XCJcclxuICAgIGNvbnN0IHRlbXBPdXRwdXRQYXRoID0gcGF0aC5qb2luKG91dHB1dEZpbGVuYW1lLCBgJHt2NCgpfS5wbmdgKTtcclxuXHJcbiAgICAvLyDEkOG7jWMg4bqjbmggxJHhuqd1IHbDoG8gYuG6sW5nIFNoYXJwXHJcbiAgICBjb25zdCBpbWFnZSA9IHNoYXJwKGlucHV0SW1hZ2VQYXRoKTtcclxuXHJcbiAgICAvLyBU4bqhbyBs4bubcCB2xINuIGLhuqNuIG3hu5tpIHbhu5tpIG3DoHUgc+G6r2MgdMO5eSBjaOG7iW5oXHJcbiAgICBjb25zdCB0ZXh0TGF5ZXIgPSBCdWZmZXIuZnJvbShcclxuICAgICAgYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiJHtpbWFnZVdpZHRofVwiIGhlaWdodD1cIiR7aW1hZ2VIZWlnaHR9XCI+XHJcbiAgICAgICAgICA8dGV4dCB4PVwiMFwiIHk9XCIke3l9XCIgZG9taW5hbnQtYmFzZWxpbmU9XCJtaWRkbGVcIiB0ZXh0LWFuY2hvcj1cIm1pZGRsZVwiIGZvbnQtZmFtaWx5PVwiQXJpYWxcIiBmb250LXNpemU9XCI2MFwiIGZpbGw9XCIke3RleHRDb2xvcn1cIiBmb250LXdlaWdodD1cImJvbGRcIiBvcGFjaXR5PVwiMC4xNVwiPlxyXG4gICAgICAgICAgICAgICR7dGV4dH1cclxuICAgICAgICAgIDwvdGV4dD5cclxuICAgICAgPC9zdmc+XHJcbiAgICAgIGBcclxuICAgICk7XHJcblxyXG4gICAgLy8gR2jDqXAgbOG7m3AgdsSDbiBi4bqjbiB2w6BvIOG6o25oIGLhurFuZyBTaGFycFxyXG4gICAgaW1hZ2UuY29tcG9zaXRlKFt7IGlucHV0OiB0ZXh0TGF5ZXIsIGJsZW5kOiBcIm92ZXJcIiB9XSk7XHJcblxyXG4gICAgLy8gTMawdSDhuqNuaCDEkcOjIHjhu60gbMO9IHbDoG8gdOG7h3AgdOG6oW0gdGjhu51pXHJcbiAgICBhd2FpdCBpbWFnZS50b0ZpbGUodGVtcE91dHB1dFBhdGgpO1xyXG5cclxuICAgIC8vIFNhbyBjaMOpcCDhuqNuaCB04burIHThu4dwIHThuqFtIHRo4budaSBzYW5nIHThu4dwIMSR4bqndSByYVxyXG4gICAgYXdhaXQgc2hhcnAodGVtcE91dHB1dFBhdGgpLnRvRmlsZShvdXRwdXRJbWFnZVBhdGgpO1xyXG4gICAgLy8gWMOzYSB04buHcCB04bqhbSB0aOG7nWkgc2F1IGtoaSBob8OgbiB0aMOgbmhcclxuICAgIGF3YWl0IGZzLnByb21pc2VzLnVubGluayh0ZW1wT3V0cHV0UGF0aCk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBhZGRpbmcgdGV4dCB0byBpbWFnZSB3aXRoIFNoYXJwOlwiLCBlcnJvcik7XHJcbiAgICB0aHJvdyBlcnJvcjtcclxuICB9XHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBQUEsS0FBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUMsS0FBQSxHQUFBRixzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUUsS0FBQSxHQUFBRixPQUFBO0FBQ0EsSUFBQUcsTUFBQSxHQUFBSixzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUksR0FBQSxHQUFBTCxzQkFBQSxDQUFBQyxPQUFBO0FBRDJCOztBQUUzQixJQUFNSyxVQUFVLDBCQUEwQjtBQUMxQyxJQUFNQyxRQUFRLEdBQUdDLGdCQUFJLENBQUNDLElBQUksQ0FBQ0MsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUM7QUFDOUQsSUFBTUMsY0FBYyxHQUFHSCxnQkFBSSxDQUFDQyxJQUFJLENBQUNDLFNBQVMsRUFBRSxjQUFjLEVBQUUsV0FBVyxDQUFDO0FBQUMsSUFBQUUsUUFBQSxHQUUxRDtFQUNQQyxZQUFZLFdBQUFBLGFBQUNDLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBQUEsV0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBQyxRQUFBO01BQUEsSUFBQUMsYUFBQSxFQUFBQyxrQkFBQSxFQUFBQyxtQkFBQSxFQUFBQyxLQUFBLEVBQUFDLElBQUEsRUFBQUMsVUFBQSxFQUFBQyxXQUFBLEVBQUFD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