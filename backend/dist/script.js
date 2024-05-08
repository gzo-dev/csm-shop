"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jimp = _interopRequireDefault(require("jimp"));
// const ORIGINAL_IMAGE = __dirname + "/cau-rong-da-nang.jpeg";
// const LOGO = __dirname + "/React-icon.svg.png";
// const FILENAME = "create-project-laravel5_8-using-composer-01.jpg";
var addWatermarkAndSave = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(originalImagePath, logoPath, outputFilename) {
    var _yield$Promise$all, _yield$Promise$all2, image, logo, desiredLogoWidth, desiredLogoHeight, logoX, logoY;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Promise.all([_jimp["default"].read(originalImagePath), _jimp["default"].read(logoPath)]);
        case 3:
          _yield$Promise$all = _context.sent;
          _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 2);
          image = _yield$Promise$all2[0];
          logo = _yield$Promise$all2[1];
          // Resize logo
          desiredLogoWidth = 100; // Độ rộng mong muốn của logo (đơn vị pixel)
          desiredLogoHeight = _jimp["default"].AUTO; // Để tự động tính toán chiều cao dựa trên tỷ lệ của hình ảnh
          logo.resize(desiredLogoWidth, desiredLogoHeight);

          // Tính toán vị trí của logo (ở trên cùng bên phải)
          logoX = image.bitmap.width - logo.bitmap.width - 10; // Độ lệch từ mép phải của hình ảnh
          logoY = 10; // Độ lệch từ mép trên của hình ảnh
          // Composite image và logo
          _context.next = 14;
          return image.composite(logo, logoX, logoY, [{
            mode: _jimp["default"].BLEND_SCREEN,
            opacitySource: 0.1,
            opacityDest: 1
          }]);
        case 14:
          _context.next = 16;
          return image.writeAsync(outputFilename);
        case 16:
          console.log("Image with watermark saved successfully!");
          _context.next = 22;
          break;
        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          console.error("Error:", _context.t0);
        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 19]]);
  }));
  return function addWatermarkAndSave(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfamltcCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiYWRkV2F0ZXJtYXJrQW5kU2F2ZSIsIl9yZWYiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsIm9yaWdpbmFsSW1hZ2VQYXRoIiwibG9nb1BhdGgiLCJvdXRwdXRGaWxlbmFtZSIsIl95aWVsZCRQcm9taXNlJGFsbCIsIl95aWVsZCRQcm9taXNlJGFsbDIiLCJpbWFnZSIsImxvZ28iLCJkZXNpcmVkTG9nb1dpZHRoIiwiZGVzaXJlZExvZ29IZWlnaHQiLCJsb2dvWCIsImxvZ29ZIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsIlByb21pc2UiLCJhbGwiLCJKaW1wIiwicmVhZCIsInNlbnQiLCJfc2xpY2VkVG9BcnJheTIiLCJBVVRPIiwicmVzaXplIiwiYml0bWFwIiwid2lkdGgiLCJjb21wb3NpdGUiLCJtb2RlIiwiQkxFTkRfU0NSRUVOIiwib3BhY2l0eVNvdXJjZSIsIm9wYWNpdHlEZXN0Iiwid3JpdGVBc3luYyIsImNvbnNvbGUiLCJsb2ciLCJ0MCIsImVycm9yIiwic3RvcCIsIl94IiwiX3gyIiwiX3gzIiwiYXBwbHkiLCJhcmd1bWVudHMiXSwic291cmNlcyI6WyIuLi9zcmMvc2NyaXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBKaW1wIGZyb20gXCJqaW1wXCI7XG5cbi8vIGNvbnN0IE9SSUdJTkFMX0lNQUdFID0gX19kaXJuYW1lICsgXCIvY2F1LXJvbmctZGEtbmFuZy5qcGVnXCI7XG4vLyBjb25zdCBMT0dPID0gX19kaXJuYW1lICsgXCIvUmVhY3QtaWNvbi5zdmcucG5nXCI7XG4vLyBjb25zdCBGSUxFTkFNRSA9IFwiY3JlYXRlLXByb2plY3QtbGFyYXZlbDVfOC11c2luZy1jb21wb3Nlci0wMS5qcGdcIjtcblxuY29uc3QgYWRkV2F0ZXJtYXJrQW5kU2F2ZSA9IGFzeW5jIChvcmlnaW5hbEltYWdlUGF0aCwgbG9nb1BhdGgsIG91dHB1dEZpbGVuYW1lKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgW2ltYWdlLCBsb2dvXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIEppbXAucmVhZChvcmlnaW5hbEltYWdlUGF0aCksXG4gICAgICAgICAgICBKaW1wLnJlYWQobG9nb1BhdGgpXG4gICAgICAgIF0pO1xuXG4gICAgICAgIC8vIFJlc2l6ZSBsb2dvXG4gICAgICAgIGNvbnN0IGRlc2lyZWRMb2dvV2lkdGggPSAxMDA7IC8vIMSQ4buZIHLhu5luZyBtb25nIG114buRbiBj4bunYSBsb2dvICjEkcahbiB24buLIHBpeGVsKVxuICAgICAgICBjb25zdCBkZXNpcmVkTG9nb0hlaWdodCA9IEppbXAuQVVUTzsgLy8gxJDhu4MgdOG7sSDEkeG7mW5nIHTDrW5oIHRvw6FuIGNoaeG7gXUgY2FvIGThu7FhIHRyw6puIHThu7cgbOG7hyBj4bunYSBow6xuaCDhuqNuaFxuICAgICAgICBsb2dvLnJlc2l6ZShkZXNpcmVkTG9nb1dpZHRoLCBkZXNpcmVkTG9nb0hlaWdodCk7XG5cbiAgICAgICAgLy8gVMOtbmggdG/DoW4gduG7iyB0csOtIGPhu6dhIGxvZ28gKOG7nyB0csOqbiBjw7luZyBiw6puIHBo4bqjaSlcbiAgICAgICAgY29uc3QgbG9nb1ggPSBpbWFnZS5iaXRtYXAud2lkdGggLSBsb2dvLmJpdG1hcC53aWR0aCAtIDEwOyAvLyDEkOG7mSBs4buHY2ggdOG7qyBtw6lwIHBo4bqjaSBj4bunYSBow6xuaCDhuqNuaFxuICAgICAgICBjb25zdCBsb2dvWSA9IDEwOyAvLyDEkOG7mSBs4buHY2ggdOG7qyBtw6lwIHRyw6puIGPhu6dhIGjDrG5oIOG6o25oXG5cbiAgICAgICAgLy8gQ29tcG9zaXRlIGltYWdlIHbDoCBsb2dvXG4gICAgICAgIGF3YWl0IGltYWdlLmNvbXBvc2l0ZShsb2dvLCBsb2dvWCwgbG9nb1ksIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtb2RlOiBKaW1wLkJMRU5EX1NDUkVFTixcbiAgICAgICAgICAgICAgICBvcGFjaXR5U291cmNlOiAwLjEsXG4gICAgICAgICAgICAgICAgb3BhY2l0eURlc3Q6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSk7XG5cbiAgICAgICAgLy8gTMawdSDhuqNuaCDEkcOjIMSRxrDhu6NjIGNow6huIGxvZ29cbiAgICAgICAgYXdhaXQgaW1hZ2Uud3JpdGVBc3luYyhvdXRwdXRGaWxlbmFtZSk7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJJbWFnZSB3aXRoIHdhdGVybWFyayBzYXZlZCBzdWNjZXNzZnVsbHkhXCIpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjpcIiwgZXJyb3IpO1xuICAgIH1cbn07Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFBQSxLQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFFQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQyxtQkFBbUI7RUFBQSxJQUFBQyxJQUFBLE9BQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsQ0FBRyxTQUFBQyxRQUFPQyxpQkFBaUIsRUFBRUMsUUFBUSxFQUFFQyxjQUFjO0lBQUEsSUFBQUMsa0JBQUEsRUFBQUMsbUJBQUEsRUFBQUMsS0FBQSxFQUFBQyxJQUFBLEVBQUFDLGdCQUFBLEVBQUFDLGlCQUFBLEVBQUFDLEtBQUEsRUFBQUMsS0FBQTtJQUFBLE9BQUFiLFlBQUEsWUFBQWMsSUFBQSxVQUFBQyxTQUFBQyxRQUFBO01BQUEsa0JBQUFBLFFBQUEsQ0FBQUMsSUFBQSxHQUFBRCxRQUFBLENBQUFFLElBQUE7UUFBQTtVQUFBRixRQUFBLENBQUFDLElBQUE7VUFBQUQsUUFBQSxDQUFBRSxJQUFBO1VBQUEsT0FFMUNDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLENBQ3BDQyxnQkFBSSxDQUFDQyxJQUFJLENBQUNuQixpQkFBaUIsQ0FBQyxFQUM1QmtCLGdCQUFJLENBQUNDLElBQUksQ0FBQ2xCLFFBQVEsQ0FBQyxDQUN0QixDQUFDO1FBQUE7VUFBQUUsa0JBQUEsR0FBQVUsUUFBQSxDQUFBTyxJQUFBO1VBQUFoQixtQkFBQSxPQUFBaUIsZUFBQSxhQUFBbEIsa0JBQUE7VUFIS0UsS0FBSyxHQUFBRCxtQkFBQTtVQUFFRSxJQUFJLEdBQUFGLG1CQUFBO1VBS2xCO1VBQ01HLGdCQUFnQixHQUFHLEdBQUcsRUFBRTtVQUN4QkMsaUJBQWlCLEdBQUdVLGdCQUFJLENBQUNJLElBQUksRUFBRTtVQUNyQ2hCLElBQUksQ0FBQ2lCLE1BQU0sQ0FBQ2hCLGdCQUFnQixFQUFFQyxpQkFBaUIsQ0FBQzs7VUFFaEQ7VUFDTUMsS0FBSyxHQUFHSixLQUFLLENBQUNtQixNQUFNLENBQUNDLEtBQUssR0FBR25CLElBQUksQ0FBQ2tCLE1BQU0sQ0FBQ0MsS0FBSyxHQUFHLEVBQUUsRUFBRTtVQUNyRGYsS0FBSyxHQUFHLEVBQUUsRUFBRTtVQUVsQjtVQUFBRyxRQUFBLENBQUFFLElBQUE7VUFBQSxPQUNNVixLQUFLLENBQUNxQixTQUFTLENBQUNwQixJQUFJLEVBQUVHLEtBQUssRUFBRUMsS0FBSyxFQUFFLENBQ3RDO1lBQ0lpQixJQUFJLEVBQUVULGdCQUFJLENBQUNVLFlBQVk7WUFDdkJDLGFBQWEsRUFBRSxHQUFHO1lBQ2xCQyxXQUFXLEVBQUU7VUFDakIsQ0FBQyxDQUNKLENBQUM7UUFBQTtVQUFBakIsUUFBQSxDQUFBRSxJQUFBO1VBQUEsT0FHSVYsS0FBSyxDQUFDMEIsVUFBVSxDQUFDN0IsY0FBYyxDQUFDO1FBQUE7VUFFdEM4QixPQUFPLENBQUNDLEdBQUcsQ0FBQywwQ0FBMEMsQ0FBQztVQUFDcEIsUUFBQSxDQUFBRSxJQUFBO1VBQUE7UUFBQTtVQUFBRixRQUFBLENBQUFDLElBQUE7VUFBQUQsUUFBQSxDQUFBcUIsRUFBQSxHQUFBckIsUUFBQTtVQUV4RG1CLE9BQU8sQ0FBQ0csS0FBSyxDQUFDLFFBQVEsRUFBQXRCLFFBQUEsQ0FBQXFCLEVBQU8sQ0FBQztRQUFDO1FBQUE7VUFBQSxPQUFBckIsUUFBQSxDQUFBdUIsSUFBQTtNQUFBO0lBQUEsR0FBQXJDLE9BQUE7RUFBQSxDQUV0QztFQUFBLGdCQWhDS0wsbUJBQW1CQSxDQUFBMkMsRUFBQSxFQUFBQyxHQUFBLEVBQUFDLEdBQUE7SUFBQSxPQUFBNUMsSUFBQSxDQUFBNkMsS0FBQSxPQUFBQyxTQUFBO0VBQUE7QUFBQSxHQWdDeEIifQ==