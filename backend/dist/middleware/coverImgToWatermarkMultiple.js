"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addWatermarkMiddlewareMultiple = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jimp = _interopRequireDefault(require("jimp"));
var _path = _interopRequireDefault(require("path"));
var _uuid = require("uuid");
var _sharp = _interopRequireDefault(require("sharp"));
var _fs = _interopRequireDefault(require("fs"));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var serverHost = "http://localhost:4001";
var logoPath = _path["default"].join(__dirname, "..", "/logo.png");
var outputFilename = _path["default"].join(__dirname, "../../", "watermark");

// Middleware để thêm watermark vào các ảnh
var addWatermarkMiddlewareMultiple = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var processedFiles, _iterator, _step, file, uploadedImage, _yield$Promise$all, _yield$Promise$all2, image, logo, imageWidth, imageHeight, desiredLogoWidth, desiredLogoHeight, logoX, logoY, uuid, outputImagePath, text, textColor, finalOutputImagePath;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(!req.files || req.files.length === 0)) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return", res.status(400).send({
            error: "No files uploaded."
          }));
        case 2:
          _context.prev = 2;
          // Lưu trữ các đường dẫn ảnh đã xử lý
          processedFiles = [];
          _iterator = _createForOfIteratorHelper(req.files);
          _context.prev = 5;
          _iterator.s();
        case 7:
          if ((_step = _iterator.n()).done) {
            _context.next = 42;
            break;
          }
          file = _step.value;
          uploadedImage = _path["default"].join(__dirname, "../../", file.path); // Đọc ảnh gốc và logo bằng Jimp
          _context.next = 12;
          return Promise.all([_jimp["default"].read(uploadedImage), _jimp["default"].read(logoPath)]);
        case 12:
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
          _context.next = 29;
          return image.writeAsync(outputImagePath);
        case 29:
          // Thêm văn bản có màu vào ảnh bằng Sharp
          text = "MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN";
          textColor = "#e60123";
          _context.next = 33;
          return addTextToImage(outputImagePath, outputImagePath, text, textColor, "30%", imageWidth, imageHeight);
        case 33:
          _context.next = 35;
          return addTextToImage(outputImagePath, outputImagePath, text, textColor, "70%", imageWidth, imageHeight);
        case 35:
          finalOutputImagePath = _path["default"].join(outputFilename, "".concat(uuid, ".jpg"));
          _context.next = 38;
          return (0, _sharp["default"])(outputImagePath).jpeg({
            quality: 95
          }).resize({
            fit: "inside",
            width: 720
          }).toFile(finalOutputImagePath);
        case 38:
          _fs["default"].unlinkSync(outputImagePath);

          // Thêm đường dẫn ảnh đã xử lý vào danh sách
          processedFiles.push({
            path: "./watermark/".concat(uuid, ".jpg")
          });
        case 40:
          _context.next = 7;
          break;
        case 42:
          _context.next = 47;
          break;
        case 44:
          _context.prev = 44;
          _context.t0 = _context["catch"](5);
          _iterator.e(_context.t0);
        case 47:
          _context.prev = 47;
          _iterator.f();
          return _context.finish(47);
        case 50:
          // Cập nhật danh sách các đường dẫn ảnh đã xử lý vào request
          // console.log("processedFiles", processedFiles)
          req.files = processedFiles;

          // Tiếp tục xử lý request
          next();
          _context.next = 58;
          break;
        case 54:
          _context.prev = 54;
          _context.t1 = _context["catch"](2);
          console.error("Error:", _context.t1);
          res.status(500).send({
            error: "An error occurred while adding watermark to images."
          });
        case 58:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 54], [5, 44, 47, 50]]);
  }));
  return function addWatermarkMiddlewareMultiple(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

// Hàm thêm văn bản có màu vào ảnh bằng Sharp
exports.addWatermarkMiddlewareMultiple = addWatermarkMiddlewareMultiple;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfamltcCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX3BhdGgiLCJfdXVpZCIsIl9zaGFycCIsIl9mcyIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwibyIsImFsbG93QXJyYXlMaWtlIiwiaXQiLCJTeW1ib2wiLCJpdGVyYXRvciIsIkFycmF5IiwiaXNBcnJheSIsIl91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSIsImxlbmd0aCIsImkiLCJGIiwicyIsIm4iLCJkb25lIiwidmFsdWUiLCJlIiwiX2UiLCJmIiwiVHlwZUVycm9yIiwibm9ybWFsQ29tcGxldGlvbiIsImRpZEVyciIsImVyciIsImNhbGwiLCJzdGVwIiwibmV4dCIsIl9lMiIsIm1pbkxlbiIsIl9hcnJheUxpa2VUb0FycmF5IiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJzbGljZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsImZyb20iLCJ0ZXN0IiwiYXJyIiwibGVuIiwiYXJyMiIsInNlcnZlckhvc3QiLCJsb2dvUGF0aCIsInBhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwib3V0cHV0RmlsZW5hbWUiLCJhZGRXYXRlcm1hcmtNaWRkbGV3YXJlTXVsdGlwbGUiLCJfcmVmIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJyZXEiLCJyZXMiLCJwcm9jZXNzZWRGaWxlcyIsIl9pdGVyYXRvciIsIl9zdGVwIiwiZmlsZSIsInVwbG9hZGVkSW1hZ2UiLCJfeWllbGQkUHJvbWlzZSRhbGwiLCJfeWllbGQkUHJvbWlzZSRhbGwyIiwiaW1hZ2UiLCJsb2dvIiwiaW1hZ2VXaWR0aCIsImltYWdlSGVpZ2h0IiwiZGVzaXJlZExvZ29XaWR0aCIsImRlc2lyZWRMb2dvSGVpZ2h0IiwibG9nb1giLCJsb2dvWSIsInV1aWQiLCJvdXRwdXRJbWFnZVBhdGgiLCJ0ZXh0IiwidGV4dENvbG9yIiwiZmluYWxPdXRwdXRJbWFnZVBhdGgiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJmaWxlcyIsImFicnVwdCIsInN0YXR1cyIsInNlbmQiLCJlcnJvciIsIlByb21pc2UiLCJhbGwiLCJKaW1wIiwicmVhZCIsInNlbnQiLCJfc2xpY2VkVG9BcnJheTIiLCJnZXRXaWR0aCIsImdldEhlaWdodCIsIkFVVE8iLCJyZXNpemUiLCJvcGFjaXR5IiwiY29tcG9zaXRlIiwibW9kZSIsIkJMRU5EX1NDUkVFTiIsIm9wYWNpdHlTb3VyY2UiLCJvcGFjaXR5RGVzdCIsInY0IiwiY29uY2F0Iiwid3JpdGVBc3luYyIsImFkZFRleHRUb0ltYWdlIiwic2hhcnAiLCJqcGVnIiwicXVhbGl0eSIsImZpdCIsIndpZHRoIiwidG9GaWxlIiwiZnMiLCJ1bmxpbmtTeW5jIiwicHVzaCIsInQwIiwiZmluaXNoIiwidDEiLCJjb25zb2xlIiwic3RvcCIsIl94IiwiX3gyIiwiX3gzIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJleHBvcnRzIiwiX3g0IiwiX3g1IiwiX3g2IiwiX3g3IiwiX3g4IiwiX3g5IiwiX3gxMCIsIl9hZGRUZXh0VG9JbWFnZSIsIl9jYWxsZWUyIiwiaW5wdXRJbWFnZVBhdGgiLCJ5IiwidGVtcE91dHB1dFBhdGgiLCJ0ZXh0TGF5ZXIiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJCdWZmZXIiLCJpbnB1dCIsImJsZW5kIiwicHJvbWlzZXMiLCJ1bmxpbmsiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvbWlkZGxld2FyZS9jb3ZlckltZ1RvV2F0ZXJtYXJrTXVsdGlwbGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEppbXAgZnJvbSBcImppbXBcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgdjQgfSBmcm9tIFwidXVpZFwiO1xyXG5pbXBvcnQgc2hhcnAgZnJvbSBcInNoYXJwXCI7XHJcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcclxuXHJcbmNvbnN0IHNlcnZlckhvc3QgPSBgaHR0cDovL2xvY2FsaG9zdDo0MDAxYDtcclxuY29uc3QgbG9nb1BhdGggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uXCIsIFwiL2xvZ28ucG5nXCIpO1xyXG5jb25zdCBvdXRwdXRGaWxlbmFtZSA9IHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vLi4vXCIsIFwid2F0ZXJtYXJrXCIpO1xyXG5cclxuLy8gTWlkZGxld2FyZSDEkeG7gyB0aMOqbSB3YXRlcm1hcmsgdsOgbyBjw6FjIOG6o25oXHJcbmV4cG9ydCBjb25zdCBhZGRXYXRlcm1hcmtNaWRkbGV3YXJlTXVsdGlwbGUgPSBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICBpZiAoIXJlcS5maWxlcyB8fCByZXEuZmlsZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBlcnJvcjogXCJObyBmaWxlcyB1cGxvYWRlZC5cIiB9KTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICAvLyBMxrB1IHRy4buvIGPDoWMgxJHGsOG7nW5nIGThuqtuIOG6o25oIMSRw6MgeOG7rSBsw71cclxuICAgIGNvbnN0IHByb2Nlc3NlZEZpbGVzID0gW107XHJcblxyXG4gICAgZm9yIChjb25zdCBmaWxlIG9mIHJlcS5maWxlcykge1xyXG5cclxuICAgICAgY29uc3QgdXBsb2FkZWRJbWFnZSA9IHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vLi4vXCIsIGZpbGUucGF0aCk7XHJcblxyXG4gICAgICAvLyDEkOG7jWMg4bqjbmggZ+G7kWMgdsOgIGxvZ28gYuG6sW5nIEppbXBcclxuICAgICAgY29uc3QgW2ltYWdlLCBsb2dvXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgICBKaW1wLnJlYWQodXBsb2FkZWRJbWFnZSksXHJcbiAgICAgICAgSmltcC5yZWFkKGxvZ29QYXRoKSxcclxuICAgICAgXSk7XHJcblxyXG4gICAgICBjb25zdCBpbWFnZVdpZHRoID0gaW1hZ2UuZ2V0V2lkdGgoKTtcclxuICAgICAgY29uc3QgaW1hZ2VIZWlnaHQgPSBpbWFnZS5nZXRIZWlnaHQoKTtcclxuXHJcbiAgICAgIC8vIFJlc2l6ZSBsb2dvIGLhurFuZyBKaW1wXHJcbiAgICAgIGNvbnN0IGRlc2lyZWRMb2dvV2lkdGggPSAyNTA7XHJcbiAgICAgIGNvbnN0IGRlc2lyZWRMb2dvSGVpZ2h0ID0gSmltcC5BVVRPO1xyXG4gICAgICBsb2dvLnJlc2l6ZShkZXNpcmVkTG9nb1dpZHRoLCBkZXNpcmVkTG9nb0hlaWdodCk7XHJcblxyXG4gICAgICBjb25zdCBsb2dvWCA9IDUwO1xyXG4gICAgICBjb25zdCBsb2dvWSA9IDUwO1xyXG4gICAgICBsb2dvLm9wYWNpdHkoMSk7XHJcblxyXG4gICAgICAvLyBDaMOobiBsb2dvIHbDoG8g4bqjbmggduG7m2kgaGnhu4d1IOG7qW5nIGLhurFuZyBKaW1wXHJcbiAgICAgIGltYWdlLmNvbXBvc2l0ZShsb2dvLCBsb2dvWCwgbG9nb1ksIFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBtb2RlOiBKaW1wLkJMRU5EX1NDUkVFTixcclxuICAgICAgICAgIG9wYWNpdHlTb3VyY2U6IDAuMSxcclxuICAgICAgICAgIG9wYWNpdHlEZXN0OiAwLjEsXHJcbiAgICAgICAgfSxcclxuICAgICAgXSk7XHJcblxyXG4gICAgICAvLyBMxrB1IOG6o25oIMSRw6MgdGjDqm0gd2F0ZXJtYXJrIGLhurFuZyBKaW1wXHJcbiAgICAgIGNvbnN0IHV1aWQgPSB2NCgpO1xyXG4gICAgICBjb25zdCBvdXRwdXRJbWFnZVBhdGggPSBwYXRoLmpvaW4ob3V0cHV0RmlsZW5hbWUsIGAke3V1aWR9LnBuZ2ApO1xyXG4gICAgICBhd2FpdCBpbWFnZS53cml0ZUFzeW5jKG91dHB1dEltYWdlUGF0aCk7XHJcblxyXG4gICAgICAvLyBUaMOqbSB2xINuIGLhuqNuIGPDsyBtw6B1IHbDoG8g4bqjbmggYuG6sW5nIFNoYXJwXHJcbiAgICAgIGNvbnN0IHRleHQgPVxyXG4gICAgICAgIFwiTUlOSEtIQU5HR1JPVVAuVk4gTUlOSEtIQU5HR1JPVVAuVk4gTUlOSEtIQU5HR1JPVVAuVk4gTUlOSEtIQU5HR1JPVVAuVk4gTUlOSEtIQU5HR1JPVVAuVk4gTUlOSEtIQU5HR1JPVVAuVk4gTUlOSEtIQU5HR1JPVVAuVk4gTUlOSEtIQU5HR1JPVVAuVk4gTUlOSEtIQU5HR1JPVVAuVk4gTUlOSEtIQU5HR1JPVVAuVk5cIjtcclxuICAgICAgY29uc3QgdGV4dENvbG9yID0gXCIjZTYwMTIzXCI7XHJcblxyXG4gICAgICBhd2FpdCBhZGRUZXh0VG9JbWFnZShcclxuICAgICAgICBvdXRwdXRJbWFnZVBhdGgsXHJcbiAgICAgICAgb3V0cHV0SW1hZ2VQYXRoLFxyXG4gICAgICAgIHRleHQsXHJcbiAgICAgICAgdGV4dENvbG9yLFxyXG4gICAgICAgIFwiMzAlXCIsXHJcbiAgICAgICAgaW1hZ2VXaWR0aCxcclxuICAgICAgICBpbWFnZUhlaWdodFxyXG4gICAgICApO1xyXG5cclxuICAgICAgYXdhaXQgYWRkVGV4dFRvSW1hZ2UoXHJcbiAgICAgICAgb3V0cHV0SW1hZ2VQYXRoLFxyXG4gICAgICAgIG91dHB1dEltYWdlUGF0aCxcclxuICAgICAgICB0ZXh0LFxyXG4gICAgICAgIHRleHRDb2xvcixcclxuICAgICAgICBcIjcwJVwiLFxyXG4gICAgICAgIGltYWdlV2lkdGgsXHJcbiAgICAgICAgaW1hZ2VIZWlnaHRcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGNvbnN0IGZpbmFsT3V0cHV0SW1hZ2VQYXRoID0gcGF0aC5qb2luKG91dHB1dEZpbGVuYW1lLCBgJHt1dWlkfS5qcGdgKTtcclxuXHJcbiAgICAgIGF3YWl0IHNoYXJwKG91dHB1dEltYWdlUGF0aClcclxuICAgICAgICAuanBlZyh7IHF1YWxpdHk6IDk1IH0pXHJcbiAgICAgICAgLnJlc2l6ZSh7IGZpdDogXCJpbnNpZGVcIiwgd2lkdGg6IDcyMCB9KVxyXG4gICAgICAgIC50b0ZpbGUoZmluYWxPdXRwdXRJbWFnZVBhdGgpO1xyXG5cclxuICAgICAgZnMudW5saW5rU3luYyhvdXRwdXRJbWFnZVBhdGgpO1xyXG5cclxuICAgICAgLy8gVGjDqm0gxJHGsOG7nW5nIGThuqtuIOG6o25oIMSRw6MgeOG7rSBsw70gdsOgbyBkYW5oIHPDoWNoXHJcbiAgICAgIHByb2Nlc3NlZEZpbGVzLnB1c2goeyBwYXRoOiBgLi93YXRlcm1hcmsvJHt1dWlkfS5qcGdgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEPhuq1wIG5o4bqtdCBkYW5oIHPDoWNoIGPDoWMgxJHGsOG7nW5nIGThuqtuIOG6o25oIMSRw6MgeOG7rSBsw70gdsOgbyByZXF1ZXN0XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcInByb2Nlc3NlZEZpbGVzXCIsIHByb2Nlc3NlZEZpbGVzKVxyXG4gICAgcmVxLmZpbGVzID0gcHJvY2Vzc2VkRmlsZXM7XHJcblxyXG4gICAgLy8gVGnhur9wIHThu6VjIHjhu60gbMO9IHJlcXVlc3RcclxuICAgIG5leHQoKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yOlwiLCBlcnJvcik7XHJcbiAgICByZXMuc3RhdHVzKDUwMCkuc2VuZCh7XHJcbiAgICAgIGVycm9yOiBcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGFkZGluZyB3YXRlcm1hcmsgdG8gaW1hZ2VzLlwiLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gSMOgbSB0aMOqbSB2xINuIGLhuqNuIGPDsyBtw6B1IHbDoG8g4bqjbmggYuG6sW5nIFNoYXJwXHJcbmFzeW5jIGZ1bmN0aW9uIGFkZFRleHRUb0ltYWdlKFxyXG4gIGlucHV0SW1hZ2VQYXRoLFxyXG4gIG91dHB1dEltYWdlUGF0aCxcclxuICB0ZXh0LFxyXG4gIHRleHRDb2xvcixcclxuICB5LFxyXG4gIGltYWdlV2lkdGgsXHJcbiAgaW1hZ2VIZWlnaHRcclxuKSB7XHJcbiAgdHJ5IHtcclxuICAgIC8vIFThuqFvIG3hu5l0IGLhuqNuIHNhbyBj4bunYSDhuqNuaCDEkeG7gyB0csOhbmggbOG7l2kgXCJDYW5ub3QgdXNlIHNhbWUgZmlsZSBmb3IgaW5wdXQgYW5kIG91dHB1dFwiXHJcbiAgICBjb25zdCB0ZW1wT3V0cHV0UGF0aCA9IHBhdGguam9pbihvdXRwdXRGaWxlbmFtZSwgYCR7djQoKX0ucG5nYCk7XHJcblxyXG4gICAgLy8gxJDhu41jIOG6o25oIMSR4bqndSB2w6BvIGLhurFuZyBTaGFycFxyXG4gICAgY29uc3QgaW1hZ2UgPSBzaGFycChpbnB1dEltYWdlUGF0aCk7XHJcblxyXG4gICAgLy8gVOG6oW8gbOG7m3AgdsSDbiBi4bqjbiBt4bubaSB24bubaSBtw6B1IHPhuq9jIHTDuXkgY2jhu4luaFxyXG4gICAgY29uc3QgdGV4dExheWVyID0gQnVmZmVyLmZyb20oXHJcbiAgICAgIGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIiR7aW1hZ2VXaWR0aH1cIiBoZWlnaHQ9XCIke2ltYWdlSGVpZ2h0fVwiPlxyXG4gICAgICAgICAgPHRleHQgeD1cIjBcIiB5PVwiJHt5fVwiIGRvbWluYW50LWJhc2VsaW5lPVwibWlkZGxlXCIgdGV4dC1hbmNob3I9XCJtaWRkbGVcIiBmb250LWZhbWlseT1cIkFyaWFsXCIgZm9udC1zaXplPVwiNjBcIiBmaWxsPVwiJHt0ZXh0Q29sb3J9XCIgZm9udC13ZWlnaHQ9XCJib2xkXCIgb3BhY2l0eT1cIjAuMTVcIj5cclxuICAgICAgICAgICAgICAke3RleHR9XHJcbiAgICAgICAgICA8L3RleHQ+XHJcbiAgICAgIDwvc3ZnPlxyXG4gICAgICBgXHJcbiAgICApO1xyXG5cclxuICAgIC8vIEdow6lwIGzhu5twIHbEg24gYuG6o24gdsOgbyDhuqNuaCBi4bqxbmcgU2hhcnBcclxuICAgIGltYWdlLmNvbXBvc2l0ZShbeyBpbnB1dDogdGV4dExheWVyLCBibGVuZDogXCJvdmVyXCIgfV0pO1xyXG5cclxuICAgIC8vIEzGsHUg4bqjbmggxJHDoyB44butIGzDvSB2w6BvIHThu4dwIHThuqFtIHRo4budaVxyXG4gICAgYXdhaXQgaW1hZ2UudG9GaWxlKHRlbXBPdXRwdXRQYXRoKTtcclxuXHJcbiAgICAvLyBTYW8gY2jDqXAg4bqjbmggdOG7qyB04buHcCB04bqhbSB0aOG7nWkgc2FuZyB04buHcCDEkeG6p3UgcmFcclxuICAgIGF3YWl0IHNoYXJwKHRlbXBPdXRwdXRQYXRoKS50b0ZpbGUob3V0cHV0SW1hZ2VQYXRoKTtcclxuXHJcbiAgICAvLyBYw7NhIHThu4dwIHThuqFtIHRo4budaSBzYXUga2hpIGhvw6BuIHRow6BuaFxyXG4gICAgYXdhaXQgZnMucHJvbWlzZXMudW5saW5rKHRlbXBPdXRwdXRQYXRoKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGFkZGluZyB0ZXh0IHRvIGltYWdlIHdpdGggU2hhcnA6XCIsIGVycm9yKTtcclxuICAgIHRocm93IGVycm9yO1xyXG4gIH1cclxufVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxLQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxLQUFBLEdBQUFGLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBRSxLQUFBLEdBQUFGLE9BQUE7QUFDQSxJQUFBRyxNQUFBLEdBQUFKLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBSSxHQUFBLEdBQUFMLHNCQUFBLENBQUFDLE9BQUE7QUFBb0IsU0FBQUssMkJBQUFDLENBQUEsRUFBQUMsY0FBQSxRQUFBQyxFQUFBLFVBQUFDLE1BQUEsb0JBQUFILENBQUEsQ0FBQUcsTUFBQSxDQUFBQyxRQUFBLEtBQUFKLENBQUEscUJBQUFFLEVBQUEsUUFBQUcsS0FBQSxDQUFBQyxPQUFBLENBQUFOLENBQUEsTUFBQUUsRUFBQSxHQUFBSywyQkFBQSxDQUFBUCxDQUFBLE1BQUFDLGNBQUEsSUFBQUQsQ0FBQSxXQUFBQSxDQUFBLENBQUFRLE1BQUEscUJBQUFOLEVBQUEsRUFBQUYsQ0FBQSxHQUFBRSxFQUFBLE1BQUFPLENBQUEsVUFBQUMsQ0FB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