"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addWatermarkMiddleware = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jimp = _interopRequireDefault(require("jimp"));
var _path = _interopRequireDefault(require("path"));
var _uuid = require("uuid");
var _sharp = _interopRequireDefault(require("sharp"));
var _fs = _interopRequireDefault(require("fs"));
var serverHost = "http://localhost:4001";
var logoPath = _path["default"].join(__dirname, "..", "/logo.png");
var outputFilename = _path["default"].join(__dirname, "../../", "watermark");

// Middleware để thêm watermark vào ảnh
var addWatermarkMiddleware = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var uploadedImage, _yield$Promise$all, _yield$Promise$all2, image, logo, imageWidth, imageHeight, desiredLogoWidth, desiredLogoHeight, logoX, logoY, uuid, outputImagePath, text, textColor, finalOutputImagePath;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          if (!req.file) {
            next();
          }
          uploadedImage = _path["default"].join(__dirname, "../../", req.file.path);
          console.log("uploadedImage", uploadedImage);
          // Đọc ảnh gốc và logo bằng Jimp
          _context.next = 6;
          return Promise.all([_jimp["default"].read(uploadedImage), _jimp["default"].read(logoPath)]);
        case 6:
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
          _context.next = 23;
          return image.writeAsync(outputImagePath);
        case 23:
          // Thêm văn bản có màu vào ảnh bằng Sharp
          text = "MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN";
          textColor = "#e60123";
          _context.next = 27;
          return addTextToImage(outputImagePath, outputImagePath, text, textColor, "30%", imageWidth, imageHeight);
        case 27:
          _context.next = 29;
          return addTextToImage(outputImagePath, outputImagePath, text, textColor, "70%", imageWidth, imageHeight);
        case 29:
          finalOutputImagePath = _path["default"].join(outputFilename, "".concat(uuid, ".jpg"));
          _context.next = 32;
          return (0, _sharp["default"])(outputImagePath).jpeg({
            quality: 95
          }).resize({
            fit: "inside",
            width: 720
          }).toFile(finalOutputImagePath);
        case 32:
          _fs["default"].unlinkSync(outputImagePath);

          // Cập nhật đường dẫn ảnh đã xử lý vào request để sử dụng trong các middleware hoặc handler khác
          req.file = {
            path: "./watermark/".concat(uuid, ".jpg")
          };

          // Tiếp tục xử lý request
          next();
          _context.next = 41;
          break;
        case 37:
          _context.prev = 37;
          _context.t0 = _context["catch"](0);
          console.error("Error:", _context.t0);
          res.status(500).send({
            error: "An error occurred while adding watermark to image."
          });
        case 41:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 37]]);
  }));
  return function addWatermarkMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

// Hàm thêm văn bản có màu vào ảnh bằng Sharp
exports.addWatermarkMiddleware = addWatermarkMiddleware;
function addTextToImage(_x4, _x5, _x6, _x7, _x8, _x9, _x10) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfamltcCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX3BhdGgiLCJfdXVpZCIsIl9zaGFycCIsIl9mcyIsInNlcnZlckhvc3QiLCJsb2dvUGF0aCIsInBhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwib3V0cHV0RmlsZW5hbWUiLCJhZGRXYXRlcm1hcmtNaWRkbGV3YXJlIiwiX3JlZiIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwicmVxIiwicmVzIiwibmV4dCIsInVwbG9hZGVkSW1hZ2UiLCJfeWllbGQkUHJvbWlzZSRhbGwiLCJfeWllbGQkUHJvbWlzZSRhbGwyIiwiaW1hZ2UiLCJsb2dvIiwiaW1hZ2VXaWR0aCIsImltYWdlSGVpZ2h0IiwiZGVzaXJlZExvZ29XaWR0aCIsImRlc2lyZWRMb2dvSGVpZ2h0IiwibG9nb1giLCJsb2dvWSIsInV1aWQiLCJvdXRwdXRJbWFnZVBhdGgiLCJ0ZXh0IiwidGV4dENvbG9yIiwiZmluYWxPdXRwdXRJbWFnZVBhdGgiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJmaWxlIiwiY29uc29sZSIsImxvZyIsIlByb21pc2UiLCJhbGwiLCJKaW1wIiwicmVhZCIsInNlbnQiLCJfc2xpY2VkVG9BcnJheTIiLCJnZXRXaWR0aCIsImdldEhlaWdodCIsIkFVVE8iLCJyZXNpemUiLCJvcGFjaXR5IiwiY29tcG9zaXRlIiwibW9kZSIsIkJMRU5EX1NDUkVFTiIsIm9wYWNpdHlTb3VyY2UiLCJvcGFjaXR5RGVzdCIsInY0IiwiY29uY2F0Iiwid3JpdGVBc3luYyIsImFkZFRleHRUb0ltYWdlIiwic2hhcnAiLCJqcGVnIiwicXVhbGl0eSIsImZpdCIsIndpZHRoIiwidG9GaWxlIiwiZnMiLCJ1bmxpbmtTeW5jIiwidDAiLCJlcnJvciIsInN0YXR1cyIsInNlbmQiLCJzdG9wIiwiX3giLCJfeDIiLCJfeDMiLCJhcHBseSIsImFyZ3VtZW50cyIsImV4cG9ydHMiLCJfeDQiLCJfeDUiLCJfeDYiLCJfeDciLCJfeDgiLCJfeDkiLCJfeDEwIiwiX2FkZFRleHRUb0ltYWdlIiwiX2NhbGxlZTIiLCJpbnB1dEltYWdlUGF0aCIsInkiLCJ0ZW1wT3V0cHV0UGF0aCIsInRleHRMYXllciIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsIkJ1ZmZlciIsImZyb20iLCJpbnB1dCIsImJsZW5kIiwicHJvbWlzZXMiLCJ1bmxpbmsiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvbWlkZGxld2FyZS9jb3ZlckltZ1RvV2F0ZXJtYXJrLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBKaW1wIGZyb20gXCJqaW1wXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IHY0IH0gZnJvbSBcInV1aWRcIjtcclxuaW1wb3J0IHNoYXJwIGZyb20gXCJzaGFycFwiO1xyXG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XHJcblxyXG5jb25zdCBzZXJ2ZXJIb3N0ID0gYGh0dHA6Ly9sb2NhbGhvc3Q6NDAwMWA7XHJcbmNvbnN0IGxvZ29QYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLlwiLCBcIi9sb2dvLnBuZ1wiKTtcclxuY29uc3Qgb3V0cHV0RmlsZW5hbWUgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uLy4uL1wiLCBcIndhdGVybWFya1wiKTtcclxuXHJcbi8vIE1pZGRsZXdhcmUgxJHhu4MgdGjDqm0gd2F0ZXJtYXJrIHbDoG8g4bqjbmhcclxuZXhwb3J0IGNvbnN0IGFkZFdhdGVybWFya01pZGRsZXdhcmUgPSBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICB0cnkge1xyXG4gICAgaWYoIXJlcS5maWxlKSB7XHJcbiAgICAgIG5leHQoKVxyXG4gICAgfVxyXG4gICAgY29uc3QgdXBsb2FkZWRJbWFnZSA9IHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vLi4vXCIsIHJlcS5maWxlLnBhdGgpO1xyXG4gICAgY29uc29sZS5sb2coXCJ1cGxvYWRlZEltYWdlXCIsIHVwbG9hZGVkSW1hZ2UpXHJcbiAgICAvLyDEkOG7jWMg4bqjbmggZ+G7kWMgdsOgIGxvZ28gYuG6sW5nIEppbXBcclxuICAgIGNvbnN0IFtpbWFnZSwgbG9nb10gPSBhd2FpdCBQcm9taXNlLmFsbChbXHJcbiAgICAgIEppbXAucmVhZCh1cGxvYWRlZEltYWdlKSxcclxuICAgICAgSmltcC5yZWFkKGxvZ29QYXRoKSxcclxuICAgIF0pO1xyXG5cclxuICAgIGNvbnN0IGltYWdlV2lkdGggPSBpbWFnZS5nZXRXaWR0aCgpO1xyXG4gICAgY29uc3QgaW1hZ2VIZWlnaHQgPSBpbWFnZS5nZXRIZWlnaHQoKTtcclxuXHJcbiAgICAvLyBSZXNpemUgbG9nbyBi4bqxbmcgSmltcFxyXG4gICAgY29uc3QgZGVzaXJlZExvZ29XaWR0aCA9IDI1MDtcclxuICAgIGNvbnN0IGRlc2lyZWRMb2dvSGVpZ2h0ID0gSmltcC5BVVRPO1xyXG4gICAgbG9nby5yZXNpemUoZGVzaXJlZExvZ29XaWR0aCwgZGVzaXJlZExvZ29IZWlnaHQpO1xyXG5cclxuICAgIGNvbnN0IGxvZ29YID0gNTA7XHJcbiAgICBjb25zdCBsb2dvWSA9IDUwO1xyXG4gICAgbG9nby5vcGFjaXR5KDEpO1xyXG5cclxuICAgIC8vIENow6huIGxvZ28gdsOgbyDhuqNuaCB24bubaSBoaeG7h3Ug4bupbmcgYuG6sW5nIEppbXBcclxuICAgIGltYWdlLmNvbXBvc2l0ZShsb2dvLCBsb2dvWCwgbG9nb1ksIFtcclxuICAgICAge1xyXG4gICAgICAgIG1vZGU6IEppbXAuQkxFTkRfU0NSRUVOLFxyXG4gICAgICAgIG9wYWNpdHlTb3VyY2U6IDAuMSxcclxuICAgICAgICBvcGFjaXR5RGVzdDogMC4xLFxyXG4gICAgICB9LFxyXG4gICAgXSk7XHJcblxyXG4gICAgLy8gTMawdSDhuqNuaCDEkcOjIHRow6ptIHdhdGVybWFyayBi4bqxbmcgSmltcFxyXG4gICAgY29uc3QgdXVpZCA9IHY0KCk7XHJcbiAgICBjb25zdCBvdXRwdXRJbWFnZVBhdGggPSBwYXRoLmpvaW4ob3V0cHV0RmlsZW5hbWUsIGAke3V1aWR9LnBuZ2ApO1xyXG4gICAgYXdhaXQgaW1hZ2Uud3JpdGVBc3luYyhvdXRwdXRJbWFnZVBhdGgpO1xyXG5cclxuICAgIC8vIFRow6ptIHbEg24gYuG6o24gY8OzIG3DoHUgdsOgbyDhuqNuaCBi4bqxbmcgU2hhcnBcclxuICAgIGNvbnN0IHRleHQgPVxyXG4gICAgICBcIk1JTkhLSEFOR0dST1VQLlZOIE1JTkhLSEFOR0dST1VQLlZOIE1JTkhLSEFOR0dST1VQLlZOIE1JTkhLSEFOR0dST1VQLlZOIE1JTkhLSEFOR0dST1VQLlZOIE1JTkhLSEFOR0dST1VQLlZOIE1JTkhLSEFOR0dST1VQLlZOIE1JTkhLSEFOR0dST1VQLlZOIE1JTkhLSEFOR0dST1VQLlZOIE1JTkhLSEFOR0dST1VQLlZOXCI7XHJcbiAgICBjb25zdCB0ZXh0Q29sb3IgPSBcIiNlNjAxMjNcIjtcclxuXHJcbiAgICBhd2FpdCBhZGRUZXh0VG9JbWFnZShcclxuICAgICAgb3V0cHV0SW1hZ2VQYXRoLFxyXG4gICAgICBvdXRwdXRJbWFnZVBhdGgsXHJcbiAgICAgIHRleHQsXHJcbiAgICAgIHRleHRDb2xvcixcclxuICAgICAgXCIzMCVcIixcclxuICAgICAgaW1hZ2VXaWR0aCxcclxuICAgICAgaW1hZ2VIZWlnaHRcclxuICAgICk7XHJcblxyXG4gICAgYXdhaXQgYWRkVGV4dFRvSW1hZ2UoXHJcbiAgICAgIG91dHB1dEltYWdlUGF0aCxcclxuICAgICAgb3V0cHV0SW1hZ2VQYXRoLFxyXG4gICAgICB0ZXh0LFxyXG4gICAgICB0ZXh0Q29sb3IsXHJcbiAgICAgIFwiNzAlXCIsXHJcbiAgICAgIGltYWdlV2lkdGgsXHJcbiAgICAgIGltYWdlSGVpZ2h0XHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGZpbmFsT3V0cHV0SW1hZ2VQYXRoID0gcGF0aC5qb2luKG91dHB1dEZpbGVuYW1lLCBgJHt1dWlkfS5qcGdgKTtcclxuXHJcbiAgICBhd2FpdCBzaGFycChvdXRwdXRJbWFnZVBhdGgpXHJcbiAgICAgIC5qcGVnKHsgcXVhbGl0eTogOTUgfSlcclxuICAgICAgLnJlc2l6ZSh7IGZpdDogXCJpbnNpZGVcIiwgd2lkdGg6IDcyMCB9KVxyXG4gICAgICAudG9GaWxlKGZpbmFsT3V0cHV0SW1hZ2VQYXRoKTtcclxuXHJcbiAgICBmcy51bmxpbmtTeW5jKG91dHB1dEltYWdlUGF0aCk7XHJcblxyXG4gICAgLy8gQ+G6rXAgbmjhuq10IMSRxrDhu51uZyBk4bqrbiDhuqNuaCDEkcOjIHjhu60gbMO9IHbDoG8gcmVxdWVzdCDEkeG7gyBz4butIGThu6VuZyB0cm9uZyBjw6FjIG1pZGRsZXdhcmUgaG/hurdjIGhhbmRsZXIga2jDoWNcclxuICAgIHJlcS5maWxlID0ge3BhdGg6IGAuL3dhdGVybWFyay8ke3V1aWR9LmpwZ2B9O1xyXG5cclxuICAgIC8vIFRp4bq/cCB04bulYyB44butIGzDvSByZXF1ZXN0XHJcbiAgICBuZXh0KCk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgcmVzLnN0YXR1cyg1MDApLnNlbmQoe1xyXG4gICAgICBlcnJvcjogXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBhZGRpbmcgd2F0ZXJtYXJrIHRvIGltYWdlLlwiLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gSMOgbSB0aMOqbSB2xINuIGLhuqNuIGPDsyBtw6B1IHbDoG8g4bqjbmggYuG6sW5nIFNoYXJwXHJcbmFzeW5jIGZ1bmN0aW9uIGFkZFRleHRUb0ltYWdlKFxyXG4gIGlucHV0SW1hZ2VQYXRoLFxyXG4gIG91dHB1dEltYWdlUGF0aCxcclxuICB0ZXh0LFxyXG4gIHRleHRDb2xvcixcclxuICB5LFxyXG4gIGltYWdlV2lkdGgsXHJcbiAgaW1hZ2VIZWlnaHRcclxuKSB7XHJcbiAgdHJ5IHtcclxuICAgIC8vIFThuqFvIG3hu5l0IGLhuqNuIHNhbyBj4bunYSDhuqNuaCDEkeG7gyB0csOhbmggbOG7l2kgXCJDYW5ub3QgdXNlIHNhbWUgZmlsZSBmb3IgaW5wdXQgYW5kIG91dHB1dFwiXHJcbiAgICBjb25zdCB0ZW1wT3V0cHV0UGF0aCA9IHBhdGguam9pbihvdXRwdXRGaWxlbmFtZSwgYCR7djQoKX0ucG5nYCk7XHJcblxyXG4gICAgLy8gxJDhu41jIOG6o25oIMSR4bqndSB2w6BvIGLhurFuZyBTaGFycFxyXG4gICAgY29uc3QgaW1hZ2UgPSBzaGFycChpbnB1dEltYWdlUGF0aCk7XHJcblxyXG4gICAgLy8gVOG6oW8gbOG7m3AgdsSDbiBi4bqjbiBt4bubaSB24bubaSBtw6B1IHPhuq9jIHTDuXkgY2jhu4luaFxyXG4gICAgY29uc3QgdGV4dExheWVyID0gQnVmZmVyLmZyb20oXHJcbiAgICAgIGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIiR7aW1hZ2VXaWR0aH1cIiBoZWlnaHQ9XCIke2ltYWdlSGVpZ2h0fVwiPlxyXG4gICAgICAgICAgPHRleHQgeD1cIjBcIiB5PVwiJHt5fVwiIGRvbWluYW50LWJhc2VsaW5lPVwibWlkZGxlXCIgdGV4dC1hbmNob3I9XCJtaWRkbGVcIiBmb250LWZhbWlseT1cIkFyaWFsXCIgZm9udC1zaXplPVwiNjBcIiBmaWxsPVwiJHt0ZXh0Q29sb3J9XCIgZm9udC13ZWlnaHQ9XCJib2xkXCIgb3BhY2l0eT1cIjAuMTVcIj5cclxuICAgICAgICAgICAgICAke3RleHR9XHJcbiAgICAgICAgICA8L3RleHQ+XHJcbiAgICAgIDwvc3ZnPlxyXG4gICAgICBgXHJcbiAgICApO1xyXG5cclxuICAgIC8vIEdow6lwIGzhu5twIHbEg24gYuG6o24gdsOgbyDhuqNuaCBi4bqxbmcgU2hhcnBcclxuICAgIGltYWdlLmNvbXBvc2l0ZShbeyBpbnB1dDogdGV4dExheWVyLCBibGVuZDogXCJvdmVyXCIgfV0pO1xyXG5cclxuICAgIC8vIEzGsHUg4bqjbmggxJHDoyB44butIGzDvSB2w6BvIHThu4dwIHThuqFtIHRo4budaVxyXG4gICAgYXdhaXQgaW1hZ2UudG9GaWxlKHRlbXBPdXRwdXRQYXRoKTtcclxuXHJcbiAgICAvLyBTYW8gY2jDqXAg4bqjbmggdOG7qyB04buHcCB04bqhbSB0aOG7nWkgc2FuZyB04buHcCDEkeG6p3UgcmFcclxuICAgIGF3YWl0IHNoYXJwKHRlbXBPdXRwdXRQYXRoKS50b0ZpbGUob3V0cHV0SW1hZ2VQYXRoKTtcclxuXHJcbiAgICAvLyBYw7NhIHThu4dwIHThuqFtIHRo4budaSBzYXUga2hpIGhvw6BuIHRow6BuaFxyXG4gICAgYXdhaXQgZnMucHJvbWlzZXMudW5saW5rKHRlbXBPdXRwdXRQYXRoKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGFkZGluZyB0ZXh0IHRvIGltYWdlIHdpdGggU2hhcnA6XCIsIGVycm9yKTtcclxuICAgIHRocm93IGVycm9yO1xyXG4gIH1cclxufVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxLQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxLQUFBLEdBQUFGLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBRSxLQUFBLEdBQUFGLE9BQUE7QUFDQSxJQUFBRyxNQUFBLEdBQUFKLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBSSxHQUFBLEdBQUFMLHNCQUFBLENBQUFDLE9BQUE7QUFFQSxJQUFNSyxVQUFVLDBCQUEwQjtBQUMxQyxJQUFNQyxRQUFRLEdBQUdDLGdCQUFJLENBQUNDLElBQUksQ0FBQ0MsU0FBUyxFQUFFLElBQUksRUFBRSxXQUFXLENBQUM7QUFDeEQsSUFBTUMsY0FBYyxHQUFHSCxnQkFBSSxDQUFDQyxJQUFJLENBQUNDLFNBQVMsRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFDOztBQUVsRTtBQUNPLElBQU1FLHNCQUFzQjtFQUFBLElBQUFDLElBQUEsT0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxDQUFHLFNBQUFDLFFB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