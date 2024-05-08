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

var serverHost = "https://trouytin.online:8443";
var logoPath = _path["default"].join(__dirname, "../../..", "/logo.png");
var outputFilename = _path["default"].join(__dirname, "../../../../", "watermark");
var _default = {
  addWaterMark: function addWaterMark(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var uploadedImage, _yield$Promise$all, _yield$Promise$all2, image, logo, imageWidth, imageHeight, desiredLogoWidth, desiredLogoHeight, logoX, logoY, uuid, outputImagePath, text, textColor;
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
            text = "Minhkhanggroup.vn Minhkhanggroup.vn Minhkhanggroup.vn Minhkhanggroup.vn Minhkhanggroup.vn Minhkhanggroup.vn Minhkhanggroup.vn Minhkhanggroup.vn Minhkhanggroup.vn Minhkhanggroup.vn";
            textColor = "#e60123";
            _context.next = 25;
            return addTextToImage(outputImagePath, outputImagePath, text, textColor, "30%", imageWidth, imageHeight);
          case 25:
            _context.next = 27;
            return addTextToImage(outputImagePath, outputImagePath, text, textColor, "70%", imageWidth, imageHeight);
          case 27:
            return _context.abrupt("return", res.status(200).send({
              file_path: "".concat(serverHost, "/").concat(uuid, ".png")
            }));
          case 30:
            _context.prev = 30;
            _context.t0 = _context["catch"](1);
            console.error("Error:", _context.t0);
            res.status(500).send({
              error: "An error occurred while adding watermark to image."
            });
          case 34:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[1, 30]]);
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
          _context2.next = 6;
          return image.composite([{
            input: textLayer,
            blend: "over"
          }]);
        case 6:
          _context2.next = 8;
          return image.toFile(tempOutputPath);
        case 8:
          _context2.next = 10;
          return (0, _sharp["default"])(tempOutputPath).toFile(outputImagePath);
        case 10:
          _context2.next = 12;
          return _fs["default"].promises.unlink(tempOutputPath);
        case 12:
          _context2.next = 18;
          break;
        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          console.error("Error adding text to image with Sharp:", _context2.t0);
          throw _context2.t0;
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 14]]);
  }));
  return _addTextToImage.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfamltcCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX3BhdGgiLCJfdXVpZCIsIl9zaGFycCIsIl9mcyIsInNlcnZlckhvc3QiLCJsb2dvUGF0aCIsInBhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwib3V0cHV0RmlsZW5hbWUiLCJfZGVmYXVsdCIsImFkZFdhdGVyTWFyayIsInJlcSIsInJlcyIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwidXBsb2FkZWRJbWFnZSIsIl95aWVsZCRQcm9taXNlJGFsbCIsIl95aWVsZCRQcm9taXNlJGFsbDIiLCJpbWFnZSIsImxvZ28iLCJpbWFnZVdpZHRoIiwiaW1hZ2VIZWlnaHQiLCJkZXNpcmVkTG9nb1dpZHRoIiwiZGVzaXJlZExvZ29IZWlnaHQiLCJsb2dvWCIsImxvZ29ZIiwidXVpZCIsIm91dHB1dEltYWdlUGF0aCIsInRleHQiLCJ0ZXh0Q29sb3IiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwiZmlsZSIsIlByb21pc2UiLCJhbGwiLCJKaW1wIiwicmVhZCIsInNlbnQiLCJfc2xpY2VkVG9BcnJheTIiLCJnZXRXaWR0aCIsImdldEhlaWdodCIsIkFVVE8iLCJyZXNpemUiLCJvcGFjaXR5IiwiY29tcG9zaXRlIiwibW9kZSIsIkJMRU5EX1NDUkVFTiIsIm9wYWNpdHlTb3VyY2UiLCJvcGFjaXR5RGVzdCIsInY0IiwiY29uY2F0Iiwid3JpdGVBc3luYyIsImFkZFRleHRUb0ltYWdlIiwiYWJydXB0Iiwic3RhdHVzIiwic2VuZCIsImZpbGVfcGF0aCIsInQwIiwiY29uc29sZSIsImVycm9yIiwic3RvcCIsImV4cG9ydHMiLCJfeCIsIl94MiIsIl94MyIsIl94NCIsIl94NSIsIl94NiIsIl94NyIsIl9hZGRUZXh0VG9JbWFnZSIsImFwcGx5IiwiYXJndW1lbnRzIiwiX2NhbGxlZTIiLCJpbnB1dEltYWdlUGF0aCIsInkiLCJ0ZW1wT3V0cHV0UGF0aCIsInRleHRMYXllciIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsInNoYXJwIiwiQnVmZmVyIiwiZnJvbSIsImlucHV0IiwiYmxlbmQiLCJ0b0ZpbGUiLCJmcyIsInByb21pc2VzIiwidW5saW5rIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvd2F0ZXJtYXJrL3dhdGVyLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEppbXAgZnJvbSBcImppbXBcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyB2NCB9IGZyb20gXCJ1dWlkXCI7XG5pbXBvcnQgc2hhcnAgZnJvbSBcInNoYXJwXCI7IC8vIEltcG9ydCB0aMawIHZp4buHbiBTaGFycFxuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuY29uc3Qgc2VydmVySG9zdCA9IGBodHRwczovL3Ryb3V5dGluLm9ubGluZTo4NDQzYDtcbmNvbnN0IGxvZ29QYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi8uLi8uLlwiLCBcIi9sb2dvLnBuZ1wiKTtcbmNvbnN0IG91dHB1dEZpbGVuYW1lID0gcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi8uLi8uLi8uLi9cIiwgXCJ3YXRlcm1hcmtcIik7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYXN5bmMgYWRkV2F0ZXJNYXJrKHJlcSwgcmVzKSB7XG4gICAgY29uc3QgdXBsb2FkZWRJbWFnZSA9IHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vLi4vLi4vLi4vXCIsIHJlcS5maWxlLnBhdGgpO1xuICAgIHRyeSB7XG4gICAgICAvLyDEkOG7jWMg4bqjbmggZ+G7kWMgdsOgIGxvZ28gYuG6sW5nIEppbXBcbiAgICAgIGNvbnN0IFtpbWFnZSwgbG9nb10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIEppbXAucmVhZCh1cGxvYWRlZEltYWdlKSxcbiAgICAgICAgSmltcC5yZWFkKGxvZ29QYXRoKSxcbiAgICAgIF0pO1xuICAgICAgY29uc3QgaW1hZ2VXaWR0aCA9IGltYWdlLmdldFdpZHRoKCk7XG4gICAgICBjb25zdCBpbWFnZUhlaWdodCA9IGltYWdlLmdldEhlaWdodCgpO1xuICAgICAgLy8gUmVzaXplIGxvZ28gYuG6sW5nIEppbXBcbiAgICAgIGNvbnN0IGRlc2lyZWRMb2dvV2lkdGggPSAyNTA7XG4gICAgICBjb25zdCBkZXNpcmVkTG9nb0hlaWdodCA9IEppbXAuQVVUTztcbiAgICAgIGxvZ28ucmVzaXplKGRlc2lyZWRMb2dvV2lkdGgsIGRlc2lyZWRMb2dvSGVpZ2h0KTtcblxuICAgICAgY29uc3QgbG9nb1ggPSA1MDtcbiAgICAgIGNvbnN0IGxvZ29ZID0gNTA7XG4gICAgICBsb2dvLm9wYWNpdHkoMSk7XG5cbiAgICAgIC8vIENow6huIGxvZ28gdsOgbyDhuqNuaCB24bubaSBoaeG7h3Ug4bupbmcgYuG6sW5nIEppbXBcbiAgICAgIGltYWdlLmNvbXBvc2l0ZShsb2dvLCBsb2dvWCwgbG9nb1ksIFtcbiAgICAgICAge1xuICAgICAgICAgIG1vZGU6IEppbXAuQkxFTkRfU0NSRUVOLFxuICAgICAgICAgIG9wYWNpdHlTb3VyY2U6IDAuMSxcbiAgICAgICAgICBvcGFjaXR5RGVzdDogMC4xLFxuICAgICAgICB9LFxuICAgICAgXSk7XG5cbiAgICAgIC8vIEzGsHUg4bqjbmggxJHDoyB0aMOqbSB3YXRlcm1hcmsgYuG6sW5nIEppbXBcbiAgICAgIGNvbnN0IHV1aWQgPSB2NCgpO1xuICAgICAgY29uc3Qgb3V0cHV0SW1hZ2VQYXRoID0gcGF0aC5qb2luKG91dHB1dEZpbGVuYW1lLCBgJHt1dWlkfS5wbmdgKTtcbiAgICAgIGF3YWl0IGltYWdlLndyaXRlQXN5bmMob3V0cHV0SW1hZ2VQYXRoKTtcblxuICAgICAgLy8gVGjDqm0gdsSDbiBi4bqjbiBjw7MgbcOgdSB2w6BvIOG6o25oIGLhurFuZyBTaGFycFxuICAgICAgY29uc3QgdGV4dCA9XG4gICAgICAgIFwiTWluaGtoYW5nZ3JvdXAudm4gTWluaGtoYW5nZ3JvdXAudm4gTWluaGtoYW5nZ3JvdXAudm4gTWluaGtoYW5nZ3JvdXAudm4gTWluaGtoYW5nZ3JvdXAudm4gTWluaGtoYW5nZ3JvdXAudm4gTWluaGtoYW5nZ3JvdXAudm4gTWluaGtoYW5nZ3JvdXAudm4gTWluaGtoYW5nZ3JvdXAudm4gTWluaGtoYW5nZ3JvdXAudm5cIjtcbiAgICAgIGNvbnN0IHRleHRDb2xvciA9IFwiI2U2MDEyM1wiO1xuICAgICAgYXdhaXQgYWRkVGV4dFRvSW1hZ2UoXG4gICAgICAgIG91dHB1dEltYWdlUGF0aCxcbiAgICAgICAgb3V0cHV0SW1hZ2VQYXRoLFxuICAgICAgICB0ZXh0LFxuICAgICAgICB0ZXh0Q29sb3IsXG4gICAgICAgIFwiMzAlXCIsXG4gICAgICAgIGltYWdlV2lkdGgsXG4gICAgICAgIGltYWdlSGVpZ2h0XG4gICAgICApO1xuICAgICAgYXdhaXQgYWRkVGV4dFRvSW1hZ2UoXG4gICAgICAgIG91dHB1dEltYWdlUGF0aCxcbiAgICAgICAgb3V0cHV0SW1hZ2VQYXRoLFxuICAgICAgICB0ZXh0LFxuICAgICAgICB0ZXh0Q29sb3IsXG4gICAgICAgIFwiNzAlXCIsXG4gICAgICAgIGltYWdlV2lkdGgsXG4gICAgICAgIGltYWdlSGVpZ2h0XG4gICAgICApO1xuXG4gICAgICAvLyBUcuG6oyB24buBIMSRxrDhu51uZyBk4bqrbiDhuqNuaCDEkcOjIHjhu60gbMO9XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQoeyBmaWxlX3BhdGg6IGAke3NlcnZlckhvc3R9LyR7dXVpZH0ucG5nYCB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yOlwiLCBlcnJvcik7XG4gICAgICByZXNcbiAgICAgICAgLnN0YXR1cyg1MDApXG4gICAgICAgIC5zZW5kKHsgZXJyb3I6IFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgYWRkaW5nIHdhdGVybWFyayB0byBpbWFnZS5cIiB9KTtcbiAgICB9XG4gIH0sXG59O1xuXG4vLyBIw6BtIHRow6ptIHbEg24gYuG6o24gY8OzIG3DoHUgdsOgbyDhuqNuaCBi4bqxbmcgU2hhcnBcbmFzeW5jIGZ1bmN0aW9uIGFkZFRleHRUb0ltYWdlKFxuICBpbnB1dEltYWdlUGF0aCxcbiAgb3V0cHV0SW1hZ2VQYXRoLFxuICB0ZXh0LFxuICB0ZXh0Q29sb3IsXG4gIHksXG4gIGltYWdlV2lkdGgsXG4gIGltYWdlSGVpZ2h0XG4pIHtcbiAgdHJ5IHtcbiAgICAvLyBU4bqhbyBt4buZdCBi4bqjbiBzYW8gY+G7p2Eg4bqjbmggxJHhu4MgdHLDoW5oIGzhu5dpIFwiQ2Fubm90IHVzZSBzYW1lIGZpbGUgZm9yIGlucHV0IGFuZCBvdXRwdXRcIlxuICAgIGNvbnN0IHRlbXBPdXRwdXRQYXRoID0gcGF0aC5qb2luKG91dHB1dEZpbGVuYW1lLCBgJHt2NCgpfS5wbmdgKTtcblxuICAgIC8vIMSQ4buNYyDhuqNuaCDEkeG6p3UgdsOgbyBi4bqxbmcgU2hhcnBcbiAgICBjb25zdCBpbWFnZSA9IHNoYXJwKGlucHV0SW1hZ2VQYXRoKTtcblxuICAgIC8vIFThuqFvIGzhu5twIHbEg24gYuG6o24gbeG7m2kgduG7m2kgbcOgdSBz4bqvYyB0w7l5IGNo4buJbmhcbiAgICBjb25zdCB0ZXh0TGF5ZXIgPSBCdWZmZXIuZnJvbShcbiAgICAgIGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIiR7aW1hZ2VXaWR0aH1cIiBoZWlnaHQ9XCIke2ltYWdlSGVpZ2h0fVwiPlxuICAgICAgICAgIDx0ZXh0IHg9XCIwXCIgeT1cIiR7eX1cIiBkb21pbmFudC1iYXNlbGluZT1cIm1pZGRsZVwiIHRleHQtYW5jaG9yPVwibWlkZGxlXCIgZm9udC1mYW1pbHk9XCJBcmlhbFwiIGZvbnQtc2l6ZT1cIjYwXCIgZmlsbD1cIiR7dGV4dENvbG9yfVwiIGZvbnQtd2VpZ2h0PVwiYm9sZFwiIG9wYWNpdHk9XCIwLjE1XCI+XG4gICAgICAgICAgICAgICR7dGV4dH1cbiAgICAgICAgICA8L3RleHQ+XG4gICAgICA8L3N2Zz5cbiAgICAgIGBcbiAgICApO1xuXG4gICAgLy8gR2jDqXAgbOG7m3AgdsSDbiBi4bqjbiB2w6BvIOG6o25oIGLhurFuZyBTaGFycFxuICAgIGF3YWl0IGltYWdlLmNvbXBvc2l0ZShbeyBpbnB1dDogdGV4dExheWVyLCBibGVuZDogXCJvdmVyXCIgfV0pO1xuXG4gICAgLy8gTMawdSDhuqNuaCDEkcOjIHjhu60gbMO9IHbDoG8gdOG7h3AgdOG6oW0gdGjhu51pXG4gICAgYXdhaXQgaW1hZ2UudG9GaWxlKHRlbXBPdXRwdXRQYXRoKTtcblxuICAgIC8vIFNhbyBjaMOpcCDhuqNuaCB04burIHThu4dwIHThuqFtIHRo4budaSBzYW5nIHThu4dwIMSR4bqndSByYVxuICAgIGF3YWl0IHNoYXJwKHRlbXBPdXRwdXRQYXRoKS50b0ZpbGUob3V0cHV0SW1hZ2VQYXRoKTtcblxuICAgIC8vIFjDs2EgdOG7h3AgdOG6oW0gdGjhu51pIHNhdSBraGkgaG/DoG4gdGjDoG5oXG4gICAgYXdhaXQgZnMucHJvbWlzZXMudW5saW5rKHRlbXBPdXRwdXRQYXRoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYWRkaW5nIHRleHQgdG8gaW1hZ2Ugd2l0aCBTaGFycDpcIiwgZXJyb3IpO1xuICAgIHRocm93IGVycm9yO1xuICB9XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxLQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxLQUFBLEdBQUFGLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBRSxLQUFBLEdBQUFGLE9BQUE7QUFDQSxJQUFBRyxNQUFBLEdBQUFKLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBSSxHQUFBLEdBQUFMLHNCQUFBLENBQUFDLE9BQUE7QUFEMkI7O0FBRTNCLElBQU1LLFVBQVUsaUNBQWlDO0FBQ2pELElBQU1DLFFBQVEsR0FBR0MsZ0JBQUks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