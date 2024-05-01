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
      var uploadedImage, _yield$Promise$all, _yield$Promise$all2, image, logo, desiredLogoWidth, desiredLogoHeight, logoX, logoY, uuid, outputImagePath, text, textColor;
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
            // Resize logo bằng Jimp
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
            _context.next = 19;
            return image.writeAsync(outputImagePath);
          case 19:
            // Thêm văn bản có màu vào ảnh bằng Sharp
            text = "Minh Khang Group Minh Khang Group Minh Khang Group Minh Khang Group Minh Khang Group Minh Khang Group Minh Khang Group Minh Khang Group";
            textColor = "#F37335"; // Màu xanh dương
            _context.next = 23;
            return addTextToImage(outputImagePath, outputImagePath, text, textColor, "30%");
          case 23:
            _context.next = 25;
            return addTextToImage(outputImagePath, outputImagePath, text, textColor, "70%");
          case 25:
            return _context.abrupt("return", res.status(200).send({
              file_path: "".concat(serverHost, "/").concat(uuid, ".png")
            }));
          case 28:
            _context.prev = 28;
            _context.t0 = _context["catch"](1);
            console.error("Error:", _context.t0);
            res.status(500).send({
              error: "An error occurred while adding watermark to image."
            });
          case 32:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[1, 28]]);
    }))();
  }
}; // Hàm thêm văn bản có màu vào ảnh bằng Sharp
exports["default"] = _default;
function addTextToImage(_x, _x2, _x3, _x4, _x5) {
  return _addTextToImage.apply(this, arguments);
}
function _addTextToImage() {
  _addTextToImage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(inputImagePath, outputImagePath, text, textColor, y) {
    var tempOutputPath, image, textLayer;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          // Tạo một bản sao của ảnh để tránh lỗi "Cannot use same file for input and output"
          tempOutputPath = _path["default"].join(outputFilename, "".concat((0, _uuid.v4)(), ".png")); // Đọc ảnh đầu vào bằng Sharp
          image = (0, _sharp["default"])(inputImagePath); // Tạo lớp văn bản mới với màu sắc tùy chỉnh
          textLayer = Buffer.from("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"800\" height=\"600\">\n         <text x=\"50%\" y=\"".concat(y, "\" dominant-baseline=\"middle\" text-anchor=\"middle\" font-family=\"Arial\" font-size=\"30\" fill=\"").concat(textColor, "\">\n           ").concat(text, "\n         </text>\n       </svg>")); // Ghép lớp văn bản vào ảnh bằng Sharp
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfamltcCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX3BhdGgiLCJfdXVpZCIsIl9zaGFycCIsIl9mcyIsInNlcnZlckhvc3QiLCJsb2dvUGF0aCIsInBhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwib3V0cHV0RmlsZW5hbWUiLCJfZGVmYXVsdCIsImFkZFdhdGVyTWFyayIsInJlcSIsInJlcyIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwidXBsb2FkZWRJbWFnZSIsIl95aWVsZCRQcm9taXNlJGFsbCIsIl95aWVsZCRQcm9taXNlJGFsbDIiLCJpbWFnZSIsImxvZ28iLCJkZXNpcmVkTG9nb1dpZHRoIiwiZGVzaXJlZExvZ29IZWlnaHQiLCJsb2dvWCIsImxvZ29ZIiwidXVpZCIsIm91dHB1dEltYWdlUGF0aCIsInRleHQiLCJ0ZXh0Q29sb3IiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwiZmlsZSIsIlByb21pc2UiLCJhbGwiLCJKaW1wIiwicmVhZCIsInNlbnQiLCJfc2xpY2VkVG9BcnJheTIiLCJBVVRPIiwicmVzaXplIiwib3BhY2l0eSIsImNvbXBvc2l0ZSIsIm1vZGUiLCJCTEVORF9TQ1JFRU4iLCJvcGFjaXR5U291cmNlIiwib3BhY2l0eURlc3QiLCJ2NCIsImNvbmNhdCIsIndyaXRlQXN5bmMiLCJhZGRUZXh0VG9JbWFnZSIsImFicnVwdCIsInN0YXR1cyIsInNlbmQiLCJmaWxlX3BhdGgiLCJ0MCIsImNvbnNvbGUiLCJlcnJvciIsInN0b3AiLCJleHBvcnRzIiwiX3giLCJfeDIiLCJfeDMiLCJfeDQiLCJfeDUiLCJfYWRkVGV4dFRvSW1hZ2UiLCJhcHBseSIsImFyZ3VtZW50cyIsIl9jYWxsZWUyIiwiaW5wdXRJbWFnZVBhdGgiLCJ5IiwidGVtcE91dHB1dFBhdGgiLCJ0ZXh0TGF5ZXIiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJzaGFycCIsIkJ1ZmZlciIsImZyb20iLCJpbnB1dCIsImJsZW5kIiwidG9GaWxlIiwiZnMiLCJwcm9taXNlcyIsInVubGluayJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL3dhdGVybWFyay93YXRlci5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBKaW1wIGZyb20gXCJqaW1wXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IHY0IH0gZnJvbSBcInV1aWRcIjtcclxuaW1wb3J0IHNoYXJwIGZyb20gXCJzaGFycFwiOyAvLyBJbXBvcnQgdGjGsCB2aeG7h24gU2hhcnBcclxuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xyXG5jb25zdCBzZXJ2ZXJIb3N0ID0gYGh0dHBzOi8vdHJvdXl0aW4ub25saW5lOjg0NDNgO1xyXG5jb25zdCBsb2dvUGF0aCA9IHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vLi4vLi5cIiwgXCIvbG9nby5wbmdcIik7XHJcbmNvbnN0IG91dHB1dEZpbGVuYW1lID0gcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi8uLi8uLi8uLi9cIiwgXCJ3YXRlcm1hcmtcIik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgYXN5bmMgYWRkV2F0ZXJNYXJrKHJlcSwgcmVzKSB7XHJcbiAgICBjb25zdCB1cGxvYWRlZEltYWdlID0gcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi8uLi8uLi8uLi9cIiwgcmVxLmZpbGUucGF0aCk7XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyDEkOG7jWMg4bqjbmggZ+G7kWMgdsOgIGxvZ28gYuG6sW5nIEppbXBcclxuICAgICAgY29uc3QgW2ltYWdlLCBsb2dvXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgICBKaW1wLnJlYWQodXBsb2FkZWRJbWFnZSksXHJcbiAgICAgICAgSmltcC5yZWFkKGxvZ29QYXRoKSxcclxuICAgICAgXSk7XHJcblxyXG4gICAgICAvLyBSZXNpemUgbG9nbyBi4bqxbmcgSmltcFxyXG4gICAgICBjb25zdCBkZXNpcmVkTG9nb1dpZHRoID0gMjUwO1xyXG4gICAgICBjb25zdCBkZXNpcmVkTG9nb0hlaWdodCA9IEppbXAuQVVUTztcclxuICAgICAgbG9nby5yZXNpemUoZGVzaXJlZExvZ29XaWR0aCwgZGVzaXJlZExvZ29IZWlnaHQpO1xyXG5cclxuICAgICAgY29uc3QgbG9nb1ggPSA1MDtcclxuICAgICAgY29uc3QgbG9nb1kgPSA1MDtcclxuICAgICAgbG9nby5vcGFjaXR5KDEpO1xyXG5cclxuICAgICAgLy8gQ2jDqG4gbG9nbyB2w6BvIOG6o25oIHbhu5tpIGhp4buHdSDhu6luZyBi4bqxbmcgSmltcFxyXG4gICAgICBpbWFnZS5jb21wb3NpdGUobG9nbywgbG9nb1gsIGxvZ29ZLCBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbW9kZTogSmltcC5CTEVORF9TQ1JFRU4sXHJcbiAgICAgICAgICBvcGFjaXR5U291cmNlOiAwLjEsXHJcbiAgICAgICAgICBvcGFjaXR5RGVzdDogMC4xLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0pO1xyXG5cclxuICAgICAgLy8gTMawdSDhuqNuaCDEkcOjIHRow6ptIHdhdGVybWFyayBi4bqxbmcgSmltcFxyXG4gICAgICBjb25zdCB1dWlkID0gdjQoKTtcclxuICAgICAgY29uc3Qgb3V0cHV0SW1hZ2VQYXRoID0gcGF0aC5qb2luKG91dHB1dEZpbGVuYW1lLCBgJHt1dWlkfS5wbmdgKTtcclxuICAgICAgYXdhaXQgaW1hZ2Uud3JpdGVBc3luYyhvdXRwdXRJbWFnZVBhdGgpO1xyXG5cclxuICAgICAgLy8gVGjDqm0gdsSDbiBi4bqjbiBjw7MgbcOgdSB2w6BvIOG6o25oIGLhurFuZyBTaGFycFxyXG4gICAgICBjb25zdCB0ZXh0ID1cclxuICAgICAgICBcIk1pbmggS2hhbmcgR3JvdXAgTWluaCBLaGFuZyBHcm91cCBNaW5oIEtoYW5nIEdyb3VwIE1pbmggS2hhbmcgR3JvdXAgTWluaCBLaGFuZyBHcm91cCBNaW5oIEtoYW5nIEdyb3VwIE1pbmggS2hhbmcgR3JvdXAgTWluaCBLaGFuZyBHcm91cFwiO1xyXG4gICAgICBjb25zdCB0ZXh0Q29sb3IgPSBcIiNGMzczMzVcIjsgLy8gTcOgdSB4YW5oIGTGsMahbmdcclxuICAgICAgYXdhaXQgYWRkVGV4dFRvSW1hZ2UoXHJcbiAgICAgICAgb3V0cHV0SW1hZ2VQYXRoLFxyXG4gICAgICAgIG91dHB1dEltYWdlUGF0aCxcclxuICAgICAgICB0ZXh0LFxyXG4gICAgICAgIHRleHRDb2xvcixcclxuICAgICAgICBcIjMwJVwiXHJcbiAgICAgICk7XHJcbiAgICAgIGF3YWl0IGFkZFRleHRUb0ltYWdlKFxyXG4gICAgICAgIG91dHB1dEltYWdlUGF0aCxcclxuICAgICAgICBvdXRwdXRJbWFnZVBhdGgsXHJcbiAgICAgICAgdGV4dCxcclxuICAgICAgICB0ZXh0Q29sb3IsXHJcbiAgICAgICAgXCI3MCVcIlxyXG4gICAgICApO1xyXG5cclxuICAgICAgLy8gVHLhuqMgduG7gSDEkcaw4budbmcgZOG6q24g4bqjbmggxJHDoyB44butIGzDvVxyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQoeyBmaWxlX3BhdGg6IGAke3NlcnZlckhvc3R9LyR7dXVpZH0ucG5nYCB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgICByZXNcclxuICAgICAgICAuc3RhdHVzKDUwMClcclxuICAgICAgICAuc2VuZCh7IGVycm9yOiBcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGFkZGluZyB3YXRlcm1hcmsgdG8gaW1hZ2UuXCIgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxufTtcclxuXHJcbi8vIEjDoG0gdGjDqm0gdsSDbiBi4bqjbiBjw7MgbcOgdSB2w6BvIOG6o25oIGLhurFuZyBTaGFycFxyXG5hc3luYyBmdW5jdGlvbiBhZGRUZXh0VG9JbWFnZShcclxuICBpbnB1dEltYWdlUGF0aCxcclxuICBvdXRwdXRJbWFnZVBhdGgsXHJcbiAgdGV4dCxcclxuICB0ZXh0Q29sb3IsXHJcbiAgeVxyXG4pIHtcclxuICB0cnkge1xyXG4gICAgLy8gVOG6oW8gbeG7mXQgYuG6o24gc2FvIGPhu6dhIOG6o25oIMSR4buDIHRyw6FuaCBs4buXaSBcIkNhbm5vdCB1c2Ugc2FtZSBmaWxlIGZvciBpbnB1dCBhbmQgb3V0cHV0XCJcclxuICAgIGNvbnN0IHRlbXBPdXRwdXRQYXRoID0gcGF0aC5qb2luKG91dHB1dEZpbGVuYW1lLCBgJHt2NCgpfS5wbmdgKTtcclxuXHJcbiAgICAvLyDEkOG7jWMg4bqjbmggxJHhuqd1IHbDoG8gYuG6sW5nIFNoYXJwXHJcbiAgICBjb25zdCBpbWFnZSA9IHNoYXJwKGlucHV0SW1hZ2VQYXRoKTtcclxuXHJcbiAgICAvLyBU4bqhbyBs4bubcCB2xINuIGLhuqNuIG3hu5tpIHbhu5tpIG3DoHUgc+G6r2MgdMO5eSBjaOG7iW5oXHJcbiAgICBjb25zdCB0ZXh0TGF5ZXIgPSBCdWZmZXIuZnJvbShcclxuICAgICAgYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiODAwXCIgaGVpZ2h0PVwiNjAwXCI+XHJcbiAgICAgICAgIDx0ZXh0IHg9XCI1MCVcIiB5PVwiJHt5fVwiIGRvbWluYW50LWJhc2VsaW5lPVwibWlkZGxlXCIgdGV4dC1hbmNob3I9XCJtaWRkbGVcIiBmb250LWZhbWlseT1cIkFyaWFsXCIgZm9udC1zaXplPVwiMzBcIiBmaWxsPVwiJHt0ZXh0Q29sb3J9XCI+XHJcbiAgICAgICAgICAgJHt0ZXh0fVxyXG4gICAgICAgICA8L3RleHQ+XHJcbiAgICAgICA8L3N2Zz5gXHJcbiAgICApO1xyXG5cclxuICAgIC8vIEdow6lwIGzhu5twIHbEg24gYuG6o24gdsOgbyDhuqNuaCBi4bqxbmcgU2hhcnBcclxuICAgIGF3YWl0IGltYWdlLmNvbXBvc2l0ZShbeyBpbnB1dDogdGV4dExheWVyLCBibGVuZDogXCJvdmVyXCIgfV0pO1xyXG5cclxuICAgIC8vIEzGsHUg4bqjbmggxJHDoyB44butIGzDvSB2w6BvIHThu4dwIHThuqFtIHRo4budaVxyXG4gICAgYXdhaXQgaW1hZ2UudG9GaWxlKHRlbXBPdXRwdXRQYXRoKTtcclxuXHJcbiAgICAvLyBTYW8gY2jDqXAg4bqjbmggdOG7qyB04buHcCB04bqhbSB0aOG7nWkgc2FuZyB04buHcCDEkeG6p3UgcmFcclxuICAgIGF3YWl0IHNoYXJwKHRlbXBPdXRwdXRQYXRoKS50b0ZpbGUob3V0cHV0SW1hZ2VQYXRoKTtcclxuXHJcbiAgICAvLyBYw7NhIHThu4dwIHThuqFtIHRo4budaSBzYXUga2hpIGhvw6BuIHRow6BuaFxyXG4gICAgYXdhaXQgZnMucHJvbWlzZXMudW5saW5rKHRlbXBPdXRwdXRQYXRoKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGFkZGluZyB0ZXh0IHRvIGltYWdlIHdpdGggU2hhcnA6XCIsIGVycm9yKTtcclxuICAgIHRocm93IGVycm9yO1xyXG4gIH1cclxufVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxLQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxLQUFBLEdBQUFGLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBRSxLQUFBLEdBQUFGLE9BQUE7QUFDQSxJQUFBRyxNQUFBLEdBQUFKLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBSSxHQUFBLEdBQUFMLHNCQUFBLENBQUFDLE9BQUE7QUFEMkI7O0FBRTNCLElBQU1LLFVBQVUsaUNBQWlDO0FBQ2pELElBQU1DLFFBQVEsR0FBR0MsZ0JBQUksQ0FBQ0MsSUFBSSxDQUFDQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQztBQUM5RCxJQUFNQyxjQUFjLEdBQUdILGdCQUFJLENBQUNDLElBQUksQ0FBQ0MsU0FBUyxFQUFFLGNBQWMsRUFBRSxXQUFXLENBQUM7QUFBQyxJQUFBRSxRQUFBLEdBRTFEO0VBQ1BDLFlBQVksV0FBQUEsYUFBQ0MsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUFDLFFBQUE7TUFBQSxJQUFBQyxhQUFBLEVBQUFDLGtCQUFBLEVBQUFDLG1CQUFBLEVBQUFDLEtBQUEsRUFBQUMsSUFBQSxFQUFBQyxnQkFBQSxFQUFBQyxpQkFBQSxFQUFBQyxLQUFBLEVBQUFDLEtBQUEsRUFBQUMsSUFBQSxFQUFBQyxlQUFBLEVBQUFDLElBQUEsRUFBQUMsU0FBQTtNQUFBLE9BQUFmLFlBQUEsWUFBQWdCLElBQUEsVUFBQUMsU0FBQUMsUUFBQTtRQUFBLGtCQUFBQSxRQUFBLENBQUFDLElBQUEsR0FBQUQsUUFBQSxDQUFBRSxJQUFBO1VBQUE7WUFDckJqQixhQUFhLEdBQUdaLGdCQUFJLENBQUNDLElBQUksQ0FBQ0MsU0FBUyxFQUFFLGNBQWMsRUFBRUksR0FBRyxDQUFDd0IsSUFBSSxDQUFDOUIsSUFBSSxDQUFDO1lBQUEyQixRQUFBLENBQUFDLElBQUE7WUFBQUQsUUFBQSxDQUFBRSxJQUFBO1lBQUEsT0FHM0NFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLENBQ3RDQyxnQkFBSSxDQUFDQyxJQUFJLENBQUN0QixhQUFhLENBQUMsRUFDeEJxQixnQkFBSSxDQUFDQyxJQUFJLENBQUNuQyxRQUFRLENBQUMsQ0FDcEIsQ0FBQztVQUFBO1lBQUFjLGtCQUFBLEdBQUFjLFFBQUEsQ0FBQVEsSUFBQTtZQUFBckIsbUJBQUEsT0FBQXNCLGVBQUEsYUFBQXZCLGtCQUFBO1lBSEtFLEtBQUssR0FBQUQsbUJBQUE7WUFBRUUsSUFBSSxHQUFBRixtQkFBQTtZQUtsQjtZQUNNRyxnQkFBZ0IsR0FBRyxHQUFHO1lBQ3RCQyxpQkFBaUIsR0FBR2UsZ0JBQUksQ0FBQ0ksSUFBSTtZQUNuQ3JCLElBQUksQ0FBQ3NCLE1BQU0sQ0FBQ3JCLGdCQUFnQixFQUFFQyxpQkFBaUIsQ0FBQztZQUUxQ0MsS0FBSyxHQUFHLEVBQUU7WUFDVkMsS0FBSyxHQUFHLEVBQUU7WUFDaEJKLElBQUksQ0FBQ3VCLE9BQU8sQ0FBQyxDQUFDLENBQUM7O1lBRWY7WUFDQXhCLEtBQUssQ0FBQ3lCLFNBQVMsQ0FBQ3hCLElBQUksRUFBRUcsS0FBSyxFQUFFQyxLQUFLLEVBQUUsQ0FDbEM7Y0FDRXFCLElBQUksRUFBRVIsZ0JBQUksQ0FBQ1MsWUFBWTtjQUN2QkMsYUFBYSxFQUFFLEdBQUc7Y0FDbEJDLFdBQVcsRUFBRTtZQUNmLENBQUMsQ0FDRixDQUFDOztZQUVGO1lBQ012QixJQUFJLEdBQUcsSUFBQXdCLFFBQUUsRUFBQyxDQUFDO1lBQ1h2QixlQUFlLEdBQUd0QixnQkFBSSxDQUFDQyxJQUFJLENBQUNFLGNBQWMsS0FBQTJDLE1BQUEsQ0FBS3pCLElBQUksU0FBTSxDQUFDO1lBQUFNLFFBQUEsQ0FBQUUsSUFBQTtZQUFBLE9BQzFEZCxLQUFLLENBQUNnQyxVQUFVLENBQUN6QixlQUFlLENBQUM7VUFBQTtZQUV2QztZQUNNQyxJQUFJLEdBQ1IseUlBQXlJO1lBQ3JJQyxTQUFTLEdBQUcsU0FBUyxFQUFFO1lBQUFHLFFBQUEsQ0FBQUUsSUFBQTtZQUFBLE9BQ3ZCbUIsY0FBYyxDQUNsQjFCLGVBQWUsRUFDZkEsZUFBZSxFQUNmQyxJQUFJLEVBQ0pDLFNBQVMsRUFDVCxLQUNGLENBQUM7VUFBQTtZQUFBRyxRQUFBLENBQUFFLElBQUE7WUFBQSxPQUNLbUIsY0FBYyxDQUNsQjFCLGVBQWUsRUFDZkEsZUFBZSxFQUNmQyxJQUFJLEVBQ0pDLFNBQVMsRUFDVCxLQUNGLENBQUM7VUFBQTtZQUFBLE9BQUFHLFFBQUEsQ0FBQXNCLE1BQUEsV0FHTTFDLEdBQUcsQ0FBQzJDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2NBQUVDLFNBQVMsS0FBQU4sTUFBQSxDQUFLaEQsVUFBVSxPQUFBZ0QsTUFBQSxDQUFJekIsSUFBSTtZQUFPLENBQUMsQ0FBQztVQUFBO1lBQUFNLFFBQUEsQ0FBQUMsSUFBQTtZQUFBRCxRQUFBLENBQUEwQixFQUFBLEdBQUExQixRQUFBO1lBRXZFMkIsT0FBTyxDQUFDQyxLQUFLLENBQUMsUUFBUSxFQUFBNUIsUUFBQSxDQUFBMEIsRUFBTyxDQUFDO1lBQzlCOUMsR0FBRyxDQUNBMkMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUNYQyxJQUFJLENBQUM7Y0FBRUksS0FBSyxFQUFFO1lBQXFELENBQUMsQ0FBQztVQUFDO1VBQUE7WUFBQSxPQUFBNUIsUUFBQSxDQUFBNkIsSUFBQTtRQUFBO01BQUEsR0FBQTdDLE9BQUE7SUFBQTtFQUU3RTtBQUNGLENBQUMsRUFFRDtBQUFBOEMsT0FBQSxjQUFBckQsUUFBQTtBQUFBLFNBQ2U0QyxjQUFjQSxDQUFBVSxFQUFBLEVBQUFDLEdBQUEsRUFBQUMsR0FBQSxFQUFBQyxHQUFBLEVBQUFDLEdBQUE7RUFBQSxPQUFBQyxlQUFBLENBQUFDLEtBQUEsT0FBQUMsU0FBQTtBQUFBO0FBQUEsU0FBQUYsZ0JBQUE7RUFBQUEsZUFBQSxPQUFBdkQsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxDQUE3QixTQUFBd0QsU0FDRUMsY0FBYyxFQUNkN0MsZUFBZSxFQUNmQyxJQUFJLEVBQ0pDLFNBQVMsRUFDVDRDLENBQUM7SUFBQSxJQUFBQyxjQUFBLEVBQUF0RCxLQUFBLEVBQUF1RCxTQUFBO0lBQUEsT0FBQTdELFlBQUEsWUFBQWdCLElBQUEsVUFBQThDLFVBQUFDLFNBQUE7TUFBQSxrQkFBQUEsU0FBQSxDQUFBNUMsSUFBQSxHQUFBNEMsU0FBQSxDQUFBM0MsSUFBQTtRQUFBO1VBQUEyQyxTQUFBLENBQUE1QyxJQUFBO1VBR0M7VUFDTXlDLGNBQWMsR0FBR3JFLGdCQUFJLENBQUNDLElBQUksQ0FBQ0UsY0FBYyxLQUFBMkMsTUFBQSxDQUFLLElBQUFELFFBQUUsRUFBQyxDQUFDLFNBQU0sQ0FBQyxFQUUvRDtVQUNNOUIsS0FBSyxHQUFHLElBQUEwRCxpQkFBSyxFQUFDTixjQUFjLENBQUMsRUFFbkM7VUFDTUcsU0FBUyxHQUFHSSxNQUFNLENBQUNDLElBQUksMEdBQUE3QixNQUFBLENBRUxzQixDQUFDLDJHQUFBdEIsTUFBQSxDQUE4RnRCLFNBQVMsc0JBQUFzQixNQUFBLENBQ3ZIdkIsSUFBSSxzQ0FHYixDQUFDLEVBRUQ7VUFBQWlELFNBQUEsQ0FBQTNDLElBQUE7VUFBQSxPQUNNZCxLQUFLLENBQUN5QixTQUFTLENBQUMsQ0FBQztZQUFFb0MsS0FBSyxFQUFFTixTQUFTO1lBQUVPLEtBQUssRUFBRTtVQUFPLENBQUMsQ0FBQyxDQUFDO1FBQUE7VUFBQUwsU0FBQSxDQUFBM0MsSUFBQTtVQUFBLE9BR3REZCxLQUFLLENBQUMrRCxNQUFNLENBQUNULGNBQWMsQ0FBQztRQUFBO1VBQUFHLFNBQUEsQ0FBQTNDLElBQUE7VUFBQSxPQUc1QixJQUFBNEMsaUJBQUssRUFBQ0osY0FBYyxDQUFDLENBQUNTLE1BQU0sQ0FBQ3hELGVBQWUsQ0FBQztRQUFBO1VBQUFrRCxTQUFBLENBQUEzQyxJQUFBO1VBQUEsT0FHN0NrRCxjQUFFLENBQUNDLFFBQVEsQ0FBQ0MsTUFBTSxDQUFDWixjQUFjLENBQUM7UUFBQTtVQUFBRyxTQUFBLENBQUEzQyxJQUFBO1VBQUE7UUFBQTtVQUFBMkMsU0FBQSxDQUFBNUMsSUFBQTtVQUFBNEMsU0FBQSxDQUFBbkIsRUFBQSxHQUFBbUIsU0FBQTtVQUV4Q2xCLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDLHdDQUF3QyxFQUFBaUIsU0FBQSxDQUFBbkIsRUFBTyxDQUFDO1VBQUMsTUFBQW1CLFNBQUEsQ0FBQW5CLEVBQUE7UUFBQTtRQUFBO1VBQUEsT0FBQW1CLFNBQUEsQ0FBQWhCLElBQUE7TUFBQTtJQUFBLEdBQUFVLFFBQUE7RUFBQSxDQUdsRTtFQUFBLE9BQUFILGVBQUEsQ0FBQUMsS0FBQSxPQUFBQyxTQUFBO0FBQUEifQ==