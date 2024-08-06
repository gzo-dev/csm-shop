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

var serverHost = "https://api.minhkhanggroup.vn";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfamltcCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX3BhdGgiLCJfdXVpZCIsIl9zaGFycCIsIl9mcyIsInNlcnZlckhvc3QiLCJsb2dvUGF0aCIsInBhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwib3V0cHV0RmlsZW5hbWUiLCJfZGVmYXVsdCIsImFkZFdhdGVyTWFyayIsInJlcSIsInJlcyIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwidXBsb2FkZWRJbWFnZSIsIl95aWVsZCRQcm9taXNlJGFsbCIsIl95aWVsZCRQcm9taXNlJGFsbDIiLCJpbWFnZSIsImxvZ28iLCJpbWFnZVdpZHRoIiwiaW1hZ2VIZWlnaHQiLCJkZXNpcmVkTG9nb1dpZHRoIiwiZGVzaXJlZExvZ29IZWlnaHQiLCJsb2dvWCIsImxvZ29ZIiwidXVpZCIsIm91dHB1dEltYWdlUGF0aCIsInRleHQiLCJ0ZXh0Q29sb3IiLCJmaW5hbE91dHB1dEltYWdlUGF0aCIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJmaWxlIiwiUHJvbWlzZSIsImFsbCIsIkppbXAiLCJyZWFkIiwic2VudCIsIl9zbGljZWRUb0FycmF5MiIsImdldFdpZHRoIiwiZ2V0SGVpZ2h0IiwiQVVUTyIsInJlc2l6ZSIsIm9wYWNpdHkiLCJjb21wb3NpdGUiLCJtb2RlIiwiQkxFTkRfU0NSRUVOIiwib3BhY2l0eVNvdXJjZSIsIm9wYWNpdHlEZXN0IiwidjQiLCJjb25jYXQiLCJ3cml0ZUFzeW5jIiwiYWRkVGV4dFRvSW1hZ2UiLCJzaGFycCIsImpwZWciLCJxdWFsaXR5IiwiZml0Iiwid2lkdGgiLCJ0b0ZpbGUiLCJmcyIsInVubGlua1N5bmMiLCJhYnJ1cHQiLCJzdGF0dXMiLCJzZW5kIiwiZmlsZV9wYXRoIiwidDAiLCJjb25zb2xlIiwiZXJyb3IiLCJzdG9wIiwiZXhwb3J0cyIsIl94IiwiX3gyIiwiX3gzIiwiX3g0IiwiX3g1IiwiX3g2IiwiX3g3IiwiX2FkZFRleHRUb0ltYWdlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfY2FsbGVlMiIsImlucHV0SW1hZ2VQYXRoIiwieSIsInRlbXBPdXRwdXRQYXRoIiwidGV4dExheWVyIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiQnVmZmVyIiwiZnJvbSIsImlucHV0IiwiYmxlbmQiLCJwcm9taXNlcyIsInVubGluayJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL3dhdGVybWFyay93YXRlci5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBKaW1wIGZyb20gXCJqaW1wXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IHY0IH0gZnJvbSBcInV1aWRcIjtcclxuaW1wb3J0IHNoYXJwIGZyb20gXCJzaGFycFwiOyAvLyBJbXBvcnQgdGjGsCB2aeG7h24gU2hhcnBcclxuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xyXG5jb25zdCBzZXJ2ZXJIb3N0ID0gYGh0dHBzOi8vYXBpLm1pbmhraGFuZ2dyb3VwLnZuYDtcclxuY29uc3QgbG9nb1BhdGggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uLy4uLy4uXCIsIFwiL2xvZ28ucG5nXCIpO1xyXG5jb25zdCBvdXRwdXRGaWxlbmFtZSA9IHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vLi4vLi4vLi4vXCIsIFwid2F0ZXJtYXJrXCIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGFzeW5jIGFkZFdhdGVyTWFyayhyZXEsIHJlcykge1xyXG4gICAgY29uc3QgdXBsb2FkZWRJbWFnZSA9IHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vLi4vLi4vLi4vXCIsIHJlcS5maWxlLnBhdGgpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gxJDhu41jIOG6o25oIGfhu5FjIHbDoCBsb2dvIGLhurFuZyBKaW1wXHJcbiAgICAgIGNvbnN0IFtpbWFnZSwgbG9nb10gPSBhd2FpdCBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgSmltcC5yZWFkKHVwbG9hZGVkSW1hZ2UpLFxyXG4gICAgICAgIEppbXAucmVhZChsb2dvUGF0aCksXHJcbiAgICAgIF0pO1xyXG4gICAgICBjb25zdCBpbWFnZVdpZHRoID0gaW1hZ2UuZ2V0V2lkdGgoKTtcclxuICAgICAgY29uc3QgaW1hZ2VIZWlnaHQgPSBpbWFnZS5nZXRIZWlnaHQoKTtcclxuICAgICAgLy8gUmVzaXplIGxvZ28gYuG6sW5nIEppbXBcclxuICAgICAgY29uc3QgZGVzaXJlZExvZ29XaWR0aCA9IDI1MDtcclxuICAgICAgY29uc3QgZGVzaXJlZExvZ29IZWlnaHQgPSBKaW1wLkFVVE87XHJcbiAgICAgIGxvZ28ucmVzaXplKGRlc2lyZWRMb2dvV2lkdGgsIGRlc2lyZWRMb2dvSGVpZ2h0KTtcclxuXHJcbiAgICAgIGNvbnN0IGxvZ29YID0gNTA7XHJcbiAgICAgIGNvbnN0IGxvZ29ZID0gNTA7XHJcbiAgICAgIGxvZ28ub3BhY2l0eSgxKTtcclxuXHJcbiAgICAgIC8vIENow6huIGxvZ28gdsOgbyDhuqNuaCB24bubaSBoaeG7h3Ug4bupbmcgYuG6sW5nIEppbXBcclxuICAgICAgaW1hZ2UuY29tcG9zaXRlKGxvZ28sIGxvZ29YLCBsb2dvWSwgW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIG1vZGU6IEppbXAuQkxFTkRfU0NSRUVOLFxyXG4gICAgICAgICAgb3BhY2l0eVNvdXJjZTogMC4xLFxyXG4gICAgICAgICAgb3BhY2l0eURlc3Q6IDAuMSxcclxuICAgICAgICB9LFxyXG4gICAgICBdKTtcclxuXHJcbiAgICAgIC8vIEzGsHUg4bqjbmggxJHDoyB0aMOqbSB3YXRlcm1hcmsgYuG6sW5nIEppbXBcclxuICAgICAgY29uc3QgdXVpZCA9IHY0KCk7XHJcbiAgICAgIGNvbnN0IG91dHB1dEltYWdlUGF0aCA9IHBhdGguam9pbihvdXRwdXRGaWxlbmFtZSwgYCR7dXVpZH0ucG5nYCk7XHJcbiAgICAgIGF3YWl0IGltYWdlLndyaXRlQXN5bmMob3V0cHV0SW1hZ2VQYXRoKTtcclxuXHJcbiAgICAgIC8vIFRow6ptIHbEg24gYuG6o24gY8OzIG3DoHUgdsOgbyDhuqNuaCBi4bqxbmcgU2hhcnBcclxuICAgICAgY29uc3QgdGV4dCA9XHJcbiAgICAgICAgXCJNSU5IS0hBTkdHUk9VUC5WTiBNSU5IS0hBTkdHUk9VUC5WTiBNSU5IS0hBTkdHUk9VUC5WTiBNSU5IS0hBTkdHUk9VUC5WTiBNSU5IS0hBTkdHUk9VUC5WTiBNSU5IS0hBTkdHUk9VUC5WTiBNSU5IS0hBTkdHUk9VUC5WTiBNSU5IS0hBTkdHUk9VUC5WTiBNSU5IS0hBTkdHUk9VUC5WTiBNSU5IS0hBTkdHUk9VUC5WTlwiO1xyXG4gICAgICBjb25zdCB0ZXh0Q29sb3IgPSBcIiNlNjAxMjNcIjtcclxuICAgICAgYXdhaXQgYWRkVGV4dFRvSW1hZ2UoXHJcbiAgICAgICAgb3V0cHV0SW1hZ2VQYXRoLFxyXG4gICAgICAgIG91dHB1dEltYWdlUGF0aCxcclxuICAgICAgICB0ZXh0LFxyXG4gICAgICAgIHRleHRDb2xvcixcclxuICAgICAgICBcIjMwJVwiLFxyXG4gICAgICAgIGltYWdlV2lkdGgsXHJcbiAgICAgICAgaW1hZ2VIZWlnaHRcclxuICAgICAgKTtcclxuICAgICAgYXdhaXQgYWRkVGV4dFRvSW1hZ2UoXHJcbiAgICAgICAgb3V0cHV0SW1hZ2VQYXRoLFxyXG4gICAgICAgIG91dHB1dEltYWdlUGF0aCxcclxuICAgICAgICB0ZXh0LFxyXG4gICAgICAgIHRleHRDb2xvcixcclxuICAgICAgICBcIjcwJVwiLFxyXG4gICAgICAgIGltYWdlV2lkdGgsXHJcbiAgICAgICAgaW1hZ2VIZWlnaHRcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgZmluYWxPdXRwdXRJbWFnZVBhdGggPSBwYXRoLmpvaW4ob3V0cHV0RmlsZW5hbWUsIGAke3V1aWR9LmpwZ2ApO1xyXG4gICAgICBhd2FpdCBzaGFycChvdXRwdXRJbWFnZVBhdGgpXHJcbiAgICAgICAgLmpwZWcoeyBxdWFsaXR5OiA3MCB9KVxyXG4gICAgICAgIC5yZXNpemUoe2ZpdDogXCJpbnNpZGVcIiwgd2lkdGg6IDcyMH0pXHJcbiAgICAgICAgLnRvRmlsZShmaW5hbE91dHB1dEltYWdlUGF0aCk7XHJcbiAgICAgIGZzLnVubGlua1N5bmMob3V0cHV0SW1hZ2VQYXRoKTtcclxuICAgICAgLy8gVHLhuqMgduG7gSDEkcaw4budbmcgZOG6q24g4bqjbmggxJHDoyB44butIGzDvVxyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQoeyBmaWxlX3BhdGg6IGAke3NlcnZlckhvc3R9LyR7dXVpZH0uanBnYCB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgICByZXNcclxuICAgICAgICAuc3RhdHVzKDUwMClcclxuICAgICAgICAuc2VuZCh7IGVycm9yOiBcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGFkZGluZyB3YXRlcm1hcmsgdG8gaW1hZ2UuXCIgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxufTtcclxuXHJcbi8vIEjDoG0gdGjDqm0gdsSDbiBi4bqjbiBjw7MgbcOgdSB2w6BvIOG6o25oIGLhurFuZyBTaGFycFxyXG5hc3luYyBmdW5jdGlvbiBhZGRUZXh0VG9JbWFnZShcclxuICBpbnB1dEltYWdlUGF0aCxcclxuICBvdXRwdXRJbWFnZVBhdGgsXHJcbiAgdGV4dCxcclxuICB0ZXh0Q29sb3IsXHJcbiAgeSxcclxuICBpbWFnZVdpZHRoLFxyXG4gIGltYWdlSGVpZ2h0XHJcbikge1xyXG4gIHRyeSB7XHJcbiAgICAvLyBU4bqhbyBt4buZdCBi4bqjbiBzYW8gY+G7p2Eg4bqjbmggxJHhu4MgdHLDoW5oIGzhu5dpIFwiQ2Fubm90IHVzZSBzYW1lIGZpbGUgZm9yIGlucHV0IGFuZCBvdXRwdXRcIlxyXG4gICAgY29uc3QgdGVtcE91dHB1dFBhdGggPSBwYXRoLmpvaW4ob3V0cHV0RmlsZW5hbWUsIGAke3Y0KCl9LnBuZ2ApO1xyXG5cclxuICAgIC8vIMSQ4buNYyDhuqNuaCDEkeG6p3UgdsOgbyBi4bqxbmcgU2hhcnBcclxuICAgIGNvbnN0IGltYWdlID0gc2hhcnAoaW5wdXRJbWFnZVBhdGgpO1xyXG5cclxuICAgIC8vIFThuqFvIGzhu5twIHbEg24gYuG6o24gbeG7m2kgduG7m2kgbcOgdSBz4bqvYyB0w7l5IGNo4buJbmhcclxuICAgIGNvbnN0IHRleHRMYXllciA9IEJ1ZmZlci5mcm9tKFxyXG4gICAgICBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIke2ltYWdlV2lkdGh9XCIgaGVpZ2h0PVwiJHtpbWFnZUhlaWdodH1cIj5cclxuICAgICAgICAgIDx0ZXh0IHg9XCIwXCIgeT1cIiR7eX1cIiBkb21pbmFudC1iYXNlbGluZT1cIm1pZGRsZVwiIHRleHQtYW5jaG9yPVwibWlkZGxlXCIgZm9udC1mYW1pbHk9XCJBcmlhbFwiIGZvbnQtc2l6ZT1cIjYwXCIgZmlsbD1cIiR7dGV4dENvbG9yfVwiIGZvbnQtd2VpZ2h0PVwiYm9sZFwiIG9wYWNpdHk9XCIwLjE1XCI+XHJcbiAgICAgICAgICAgICAgJHt0ZXh0fVxyXG4gICAgICAgICAgPC90ZXh0PlxyXG4gICAgICA8L3N2Zz5cclxuICAgICAgYFxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBHaMOpcCBs4bubcCB2xINuIGLhuqNuIHbDoG8g4bqjbmggYuG6sW5nIFNoYXJwXHJcbiAgICBpbWFnZS5jb21wb3NpdGUoW3sgaW5wdXQ6IHRleHRMYXllciwgYmxlbmQ6IFwib3ZlclwiIH1dKTtcclxuXHJcbiAgICAvLyBMxrB1IOG6o25oIMSRw6MgeOG7rSBsw70gdsOgbyB04buHcCB04bqhbSB0aOG7nWlcclxuICAgIGF3YWl0IGltYWdlLnRvRmlsZSh0ZW1wT3V0cHV0UGF0aCk7XHJcblxyXG4gICAgLy8gU2FvIGNow6lwIOG6o25oIHThu6sgdOG7h3AgdOG6oW0gdGjhu51pIHNhbmcgdOG7h3AgxJHhuqd1IHJhXHJcbiAgICBhd2FpdCBzaGFycCh0ZW1wT3V0cHV0UGF0aCkudG9GaWxlKG91dHB1dEltYWdlUGF0aCk7XHJcbiAgICAvLyBYw7NhIHThu4dwIHThuqFtIHRo4budaSBzYXUga2hpIGhvw6BuIHRow6BuaFxyXG4gICAgYXdhaXQgZnMucHJvbWlzZXMudW5saW5rKHRlbXBPdXRwdXRQYXRoKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGFkZGluZyB0ZXh0IHRvIGltYWdlIHdpdGggU2hhcnA6XCIsIGVycm9yKTtcclxuICAgIHRocm93IGVycm9yO1xyXG4gIH1cclxufVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxLQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxLQUFBLEdBQUFGLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBRSxLQUFBLEdBQUFGLE9BQUE7QUFDQSxJQUFBRyxNQUFBLEdBQUFKLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBSSxHQUFBLEdBQUFMLHNCQUFBLENBQUFDLE9BQUE7QUFEMkI7O0FBRTNCLElBQU1LLFVBQVUsa0NBQWtDO0FBQ2xELElBQU1DLFFBQVEsR0FBR0MsZ0JBQUksQ0FBQ0MsSUFBSSxDQUFDQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQztBQUM5RCxJQUFNQyxjQUFjLEdBQUdILGdCQUFJLENBQUNDLElBQUksQ0FBQ0MsU0FBUyxFQUFFLGNBQWMsRUFBRSxXQUFXLENBQUM7QUFBQyxJQUFBRSxRQUFBLEdBRTFEO0VBQ1BDLFlBQVksV0FBQUEsYUFBQ0MsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUFDLFFBQUE7TUFBQSxJQUFBQyxhQUFBLEVBQUFDLGtCQUFBLEVBQUFDLG1CQUFBLEVBQUFDLEtBQUEsRUFBQUMsSUFBQSxFQUFBQyxVQUFBLEVBQUFDLFdBQUEsRUFBQUMsZ0JBQUEsRUFBQUMsaUJBQUEsRUFBQUMsS0FBQSxFQUFBQyxLQUFBLEVBQUFDLElBQUEsRUFBQUMsZUFBQSxFQUFBQyxJQUFBLEVBQUFDLFNBQUEsRUFBQUMsb0JBQUE7TUFBQSxPQUFBbEIsWUFBQSxZQUFBbUIsSUFBQSxVQUFBQyxTQUFBQyxRQUFBO1FBQUEsa0JBQUFBLFFBQUEsQ0FBQUMsSUFBQSxHQUFBRCxRQUFBLENBQUFFLElBQUE7VUFBQTtZQUNyQnBCLGFBQWEsR0FBR1osZ0JBQUksQ0FBQ0MsSUFBSSxDQUFDQyxTQUFTLEVBQUUsY0FBYyxFQUFFSSxHQUFHLENBQUMyQixJQUFJLENBQUNqQyxJQUFJLENBQUM7WUFBQThCLFFBQUEsQ0FBQUMsSUFBQTtZQUFBRCxRQUFBLENBQUFFLElBQUE7WUFBQSxPQUczQ0UsT0FBTyxDQUFDQyxHQUFHLENBQUMsQ0FDdENDLGdCQUFJLENBQUNDLElBQUksQ0FBQ3pCLGFBQWEsQ0FBQyxFQUN4QndCLGdCQUFJLENBQUNDLElBQUksQ0FBQ3RDLFFBQVEsQ0FBQyxDQUNwQixDQUFDO1VBQUE7WUFBQWMsa0JBQUEsR0FBQWlCLFFBQUEsQ0FBQVEsSUFBQTtZQUFBeEIsbUJBQUEsT0FBQXlCLGVBQUEsYUFBQTFCLGtCQUFBO1lBSEtFLEtBQUssR0FBQUQsbUJBQUE7WUFBRUUsSUFBSSxHQUFBRixtQkFBQTtZQUlaRyxVQUFVLEdBQUdGLEtBQUssQ0FBQ3lCLFFBQVEsQ0FBQyxDQUFDO1lBQzdCdEIsV0FBVyxHQUFHSCxLQUFLLENBQUMwQixTQUFTLENBQUMsQ0FBQyxFQUNyQztZQUNNdEIsZ0JBQWdCLEdBQUcsR0FBRztZQUN0QkMsaUJBQWlCLEdBQUdnQixnQkFBSSxDQUFDTSxJQUFJO1lBQ25DMUIsSUFBSSxDQUFDMkIsTUFBTSxDQUFDeEIsZ0JBQWdCLEVBQUVDLGlCQUFpQixDQUFDO1lBRTFDQyxLQUFLLEdBQUcsRUFBRTtZQUNWQyxLQUFLLEdBQUcsRUFBRTtZQUNoQk4sSUFBSSxDQUFDNEIsT0FBTyxDQUFDLENBQUMsQ0FBQzs7WUFFZjtZQUNBN0IsS0FBSyxDQUFDOEIsU0FBUyxDQUFDN0IsSUFBSSxFQUFFSyxLQUFLLEVBQUVDLEtBQUssRUFBRSxDQUNsQztjQUNFd0IsSUFBSSxFQUFFVixnQkFBSSxDQUFDVyxZQUFZO2NBQ3ZCQyxhQUFhLEVBQUUsR0FBRztjQUNsQkMsV0FBVyxFQUFFO1lBQ2YsQ0FBQyxDQUNGLENBQUM7O1lBRUY7WUFDTTFCLElBQUksR0FBRyxJQUFBMkIsUUFBRSxFQUFDLENBQUM7WUFDWDFCLGVBQWUsR0FBR3hCLGdCQUFJLENBQUNDLElBQUksQ0FBQ0UsY0FBYyxLQUFBZ0QsTUFBQSxDQUFLNUIsSUFBSSxTQUFNLENBQUM7WUFBQU8sUUFBQSxDQUFBRSxJQUFBO1lBQUEsT0FDMURqQixLQUFLLENBQUNxQyxVQUFVLENBQUM1QixlQUFlLENBQUM7VUFBQTtZQUV2QztZQUNNQyxJQUFJLEdBQ1IscUxBQXFMO1lBQ2pMQyxTQUFTLEdBQUcsU0FBUztZQUFBSSxRQUFBLENBQUFFLElBQUE7WUFBQSxPQUNyQnFCLGNBQWMsQ0FDbEI3QixlQUFlLEVBQ2ZBLGVBQWUsRUFDZkMsSUFBSSxFQUNKQyxTQUFTLEVBQ1QsS0FBSyxFQUNMVCxVQUFVLEVBQ1ZDLFdBQ0YsQ0FBQztVQUFBO1lBQUFZLFFBQUEsQ0FBQUUsSUFBQTtZQUFBLE9BQ0txQixjQUFjLENBQ2xCN0IsZUFBZSxFQUNmQSxlQUFlLEVBQ2ZDLElBQUksRUFDSkMsU0FBUyxFQUNULEtBQUssRUFDTFQsVUFBVSxFQUNWQyxXQUNGLENBQUM7VUFBQTtZQUNLUyxvQkFBb0IsR0FBRzNCLGdCQUFJLENBQUNDLElBQUksQ0FBQ0UsY0FBYyxLQUFBZ0QsTUFBQSxDQUFLNUIsSUFBSSxTQUFNLENBQUM7WUFBQU8sUUFBQSxDQUFBRSxJQUFBO1lBQUEsT0FDL0QsSUFBQXNCLGlCQUFLLEVBQUM5QixlQUFlLENBQUMsQ0FDekIrQixJQUFJLENBQUM7Y0FBRUMsT0FBTyxFQUFFO1lBQUcsQ0FBQyxDQUFDLENBQ3JCYixNQUFNLENBQUM7Y0FBQ2MsR0FBRyxFQUFFLFFBQVE7Y0FBRUMsS0FBSyxFQUFFO1lBQUcsQ0FBQyxDQUFDLENBQ25DQyxNQUFNLENBQUNoQyxvQkFBb0IsQ0FBQztVQUFBO1lBQy9CaUMsY0FBRSxDQUFDQyxVQUFVLENBQUNyQyxlQUFlLENBQUM7WUFDOUI7WUFBQSxPQUFBTSxRQUFBLENBQUFnQyxNQUFBLFdBQ092RCxHQUFHLENBQUN3RCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztjQUFFQyxTQUFTLEtBQUFkLE1BQUEsQ0FBS3JELFVBQVUsT0FBQXFELE1BQUEsQ0FBSTVCLElBQUk7WUFBTyxDQUFDLENBQUM7VUFBQTtZQUFBTyxRQUFBLENBQUFDLElBQUE7WUFBQUQsUUFBQSxDQUFBb0MsRUFBQSxHQUFBcEMsUUFBQTtZQUV2RXFDLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDLFFBQVEsRUFBQXRDLFFBQUEsQ0FBQW9DLEVBQU8sQ0FBQztZQUM5QjNELEdBQUcsQ0FDQXdELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FDWEMsSUFBSSxDQUFDO2NBQUVJLEtBQUssRUFBRTtZQUFxRCxDQUFDLENBQUM7VUFBQztVQUFBO1lBQUEsT0FBQXRDLFFBQUEsQ0FBQXVDLElBQUE7UUFBQTtNQUFBLEdBQUExRCxPQUFBO0lBQUE7RUFFN0U7QUFDRixDQUFDLEVBRUQ7QUFBQTJELE9BQUEsY0FBQWxFLFFBQUE7QUFBQSxTQUNlaUQsY0FBY0EsQ0FBQWtCLEVBQUEsRUFBQUMsR0FBQSxFQUFBQyxHQUFBLEVBQUFDLEdBQUEsRUFBQUMsR0FBQSxFQUFBQyxHQUFBLEVBQUFDLEdBQUE7RUFBQSxPQUFBQyxlQUFBLENBQUFDLEtBQUEsT0FBQUMsU0FBQTtBQUFBO0FBQUEsU0FBQUYsZ0JBQUE7RUFBQUEsZUFBQSxPQUFBdEUsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxDQUE3QixTQUFBdUUsU0FDRUMsY0FBYyxFQUNkMUQsZUFBZSxFQUNmQyxJQUFJLEVBQ0pDLFNBQVMsRUFDVHlELENBQUMsRUFDRGxFLFVBQVUsRUFDVkMsV0FBVztJQUFBLElBQUFrRSxjQUFBLEVBQUFyRSxLQUFBLEVBQUFzRSxTQUFBO0lBQUEsT0FBQTVFLFlBQUEsWUFBQW1CLElBQUEsVUFBQTBELFVBQUFDLFNBQUE7TUFBQSxrQkFBQUEsU0FBQSxDQUFBeEQsSUFBQSxHQUFBd0QsU0FBQSxDQUFBdkQsSUFBQTtRQUFBO1VBQUF1RCxTQUFBLENBQUF4RCxJQUFBO1VBR1Q7VUFDTXFELGNBQWMsR0FBR3BGLGdCQUFJLENBQUNDLElBQUksQ0FBQ0UsY0FBYyxLQUFBZ0QsTUFBQSxDQUFLLElBQUFELFFBQUUsRUFBQyxDQUFDLFNBQU0sQ0FBQyxFQUUvRDtVQUNNbkMsS0FBSyxHQUFHLElBQUF1QyxpQkFBSyxFQUFDNEIsY0FBYyxDQUFDLEVBRW5DO1VBQ01HLFNBQVMsR0FBR0csTUFBTSxDQUFDQyxJQUFJLHNEQUFBdEMsTUFBQSxDQUN1QmxDLFVBQVUsa0JBQUFrQyxNQUFBLENBQWFqQyxXQUFXLHVDQUFBaUMsTUFBQSxDQUMvRGdDLENBQUMsMkdBQUFoQyxNQUFBLENBQThGekIsU0FBUywrREFBQXlCLE1BQUEsQ0FDbkgxQixJQUFJLDhDQUloQixDQUFDLEVBRUQ7VUFDQVYsS0FBSyxDQUFDOEIsU0FBUyxDQUFDLENBQUM7WUFBRTZDLEtBQUssRUFBRUwsU0FBUztZQUFFTSxLQUFLLEVBQUU7VUFBTyxDQUFDLENBQUMsQ0FBQzs7VUFFdEQ7VUFBQUosU0FBQSxDQUFBdkQsSUFBQTtVQUFBLE9BQ01qQixLQUFLLENBQUM0QyxNQUFNLENBQUN5QixjQUFjLENBQUM7UUFBQTtVQUFBRyxTQUFBLENBQUF2RCxJQUFBO1VBQUEsT0FHNUIsSUFBQXNCLGlCQUFLLEVBQUM4QixjQUFjLENBQUMsQ0FBQ3pCLE1BQU0sQ0FBQ25DLGVBQWUsQ0FBQztRQUFBO1VBQUErRCxTQUFBLENBQUF2RCxJQUFBO1VBQUEsT0FFN0M0QixjQUFFLENBQUNnQyxRQUFRLENBQUNDLE1BQU0sQ0FBQ1QsY0FBYyxDQUFDO1FBQUE7VUFBQUcsU0FBQSxDQUFBdkQsSUFBQTtVQUFBO1FBQUE7VUFBQXVELFNBQUEsQ0FBQXhELElBQUE7VUFBQXdELFNBQUEsQ0FBQXJCLEVBQUEsR0FBQXFCLFNBQUE7VUFFeENwQixPQUFPLENBQUNDLEtBQUssQ0FBQyx3Q0FBd0MsRUFBQW1CLFNBQUEsQ0FBQXJCLEVBQU8sQ0FBQztVQUFDLE1BQUFxQixTQUFBLENBQUFyQixFQUFBO1FBQUE7UUFBQTtVQUFBLE9BQUFxQixTQUFBLENBQUFsQixJQUFBO01BQUE7SUFBQSxHQUFBWSxRQUFBO0VBQUEsQ0FHbEU7RUFBQSxPQUFBSCxlQUFBLENBQUFDLEtBQUEsT0FBQUMsU0FBQTtBQUFBIn0=