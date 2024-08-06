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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfamltcCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiYWRkV2F0ZXJtYXJrQW5kU2F2ZSIsIl9yZWYiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsIm9yaWdpbmFsSW1hZ2VQYXRoIiwibG9nb1BhdGgiLCJvdXRwdXRGaWxlbmFtZSIsIl95aWVsZCRQcm9taXNlJGFsbCIsIl95aWVsZCRQcm9taXNlJGFsbDIiLCJpbWFnZSIsImxvZ28iLCJkZXNpcmVkTG9nb1dpZHRoIiwiZGVzaXJlZExvZ29IZWlnaHQiLCJsb2dvWCIsImxvZ29ZIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsIlByb21pc2UiLCJhbGwiLCJKaW1wIiwicmVhZCIsInNlbnQiLCJfc2xpY2VkVG9BcnJheTIiLCJBVVRPIiwicmVzaXplIiwiYml0bWFwIiwid2lkdGgiLCJjb21wb3NpdGUiLCJtb2RlIiwiQkxFTkRfU0NSRUVOIiwib3BhY2l0eVNvdXJjZSIsIm9wYWNpdHlEZXN0Iiwid3JpdGVBc3luYyIsImNvbnNvbGUiLCJsb2ciLCJ0MCIsImVycm9yIiwic3RvcCIsIl94IiwiX3gyIiwiX3gzIiwiYXBwbHkiLCJhcmd1bWVudHMiXSwic291cmNlcyI6WyIuLi9zcmMvc2NyaXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBKaW1wIGZyb20gXCJqaW1wXCI7XHJcblxyXG4vLyBjb25zdCBPUklHSU5BTF9JTUFHRSA9IF9fZGlybmFtZSArIFwiL2NhdS1yb25nLWRhLW5hbmcuanBlZ1wiO1xyXG4vLyBjb25zdCBMT0dPID0gX19kaXJuYW1lICsgXCIvUmVhY3QtaWNvbi5zdmcucG5nXCI7XHJcbi8vIGNvbnN0IEZJTEVOQU1FID0gXCJjcmVhdGUtcHJvamVjdC1sYXJhdmVsNV84LXVzaW5nLWNvbXBvc2VyLTAxLmpwZ1wiO1xyXG5cclxuY29uc3QgYWRkV2F0ZXJtYXJrQW5kU2F2ZSA9IGFzeW5jIChvcmlnaW5hbEltYWdlUGF0aCwgbG9nb1BhdGgsIG91dHB1dEZpbGVuYW1lKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IFtpbWFnZSwgbG9nb10gPSBhd2FpdCBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgIEppbXAucmVhZChvcmlnaW5hbEltYWdlUGF0aCksXHJcbiAgICAgICAgICAgIEppbXAucmVhZChsb2dvUGF0aClcclxuICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgLy8gUmVzaXplIGxvZ29cclxuICAgICAgICBjb25zdCBkZXNpcmVkTG9nb1dpZHRoID0gMTAwOyAvLyDEkOG7mSBy4buZbmcgbW9uZyBtdeG7kW4gY+G7p2EgbG9nbyAoxJHGoW4gduG7iyBwaXhlbClcclxuICAgICAgICBjb25zdCBkZXNpcmVkTG9nb0hlaWdodCA9IEppbXAuQVVUTzsgLy8gxJDhu4MgdOG7sSDEkeG7mW5nIHTDrW5oIHRvw6FuIGNoaeG7gXUgY2FvIGThu7FhIHRyw6puIHThu7cgbOG7hyBj4bunYSBow6xuaCDhuqNuaFxyXG4gICAgICAgIGxvZ28ucmVzaXplKGRlc2lyZWRMb2dvV2lkdGgsIGRlc2lyZWRMb2dvSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgLy8gVMOtbmggdG/DoW4gduG7iyB0csOtIGPhu6dhIGxvZ28gKOG7nyB0csOqbiBjw7luZyBiw6puIHBo4bqjaSlcclxuICAgICAgICBjb25zdCBsb2dvWCA9IGltYWdlLmJpdG1hcC53aWR0aCAtIGxvZ28uYml0bWFwLndpZHRoIC0gMTA7IC8vIMSQ4buZIGzhu4djaCB04burIG3DqXAgcGjhuqNpIGPhu6dhIGjDrG5oIOG6o25oXHJcbiAgICAgICAgY29uc3QgbG9nb1kgPSAxMDsgLy8gxJDhu5kgbOG7h2NoIHThu6sgbcOpcCB0csOqbiBj4bunYSBow6xuaCDhuqNuaFxyXG5cclxuICAgICAgICAvLyBDb21wb3NpdGUgaW1hZ2UgdsOgIGxvZ29cclxuICAgICAgICBhd2FpdCBpbWFnZS5jb21wb3NpdGUobG9nbywgbG9nb1gsIGxvZ29ZLCBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1vZGU6IEppbXAuQkxFTkRfU0NSRUVOLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eVNvdXJjZTogMC4xLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eURlc3Q6IDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF0pO1xyXG5cclxuICAgICAgICAvLyBMxrB1IOG6o25oIMSRw6MgxJHGsOG7o2MgY2jDqG4gbG9nb1xyXG4gICAgICAgIGF3YWl0IGltYWdlLndyaXRlQXN5bmMob3V0cHV0RmlsZW5hbWUpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkltYWdlIHdpdGggd2F0ZXJtYXJrIHNhdmVkIHN1Y2Nlc3NmdWxseSFcIik7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgfVxyXG59OyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBQUEsS0FBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBRUE7QUFDQTtBQUNBO0FBRUEsSUFBTUMsbUJBQW1CO0VBQUEsSUFBQUMsSUFBQSxPQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLENBQUcsU0FBQUMsUUFBT0MsaUJBQWlCLEVBQUVDLFFBQVEsRUFBRUMsY0FBYztJQUFBLElBQUFDLGtCQUFBLEVBQUFDLG1CQUFBLEVBQUFDLEtBQUEsRUFBQUMsSUFBQSxFQUFBQyxnQkFBQSxFQUFBQyxpQkFBQSxFQUFBQyxLQUFBLEVBQUFDLEtBQUE7SUFBQSxPQUFBYixZQUFBLFlBQUFjLElBQUEsVUFBQUMsU0FBQUMsUUFBQTtNQUFBLGtCQUFBQSxRQUFBLENBQUFDLElBQUEsR0FBQUQsUUFBQSxDQUFBRSxJQUFBO1FBQUE7VUFBQUYsUUFBQSxDQUFBQyxJQUFBO1VBQUFELFFBQUEsQ0FBQUUsSUFBQTtVQUFBLE9BRTFDQyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxDQUNwQ0MsZ0JBQUksQ0FBQ0MsSUFBSSxDQUFDbkIsaUJBQWlCLENBQUMsRUFDNUJrQixnQkFBSSxDQUFDQyxJQUFJLENBQUNsQixRQUFRLENBQUMsQ0FDdEIsQ0FBQztRQUFBO1VBQUFFLGtCQUFBLEdBQUFVLFFBQUEsQ0FBQU8sSUFBQTtVQUFBaEIsbUJBQUEsT0FBQWlCLGVBQUEsYUFBQWxCLGtCQUFBO1VBSEtFLEtBQUssR0FBQUQsbUJBQUE7VUFBRUUsSUFBSSxHQUFBRixtQkFBQTtVQUtsQjtVQUNNRyxnQkFBZ0IsR0FBRyxHQUFHLEVBQUU7VUFDeEJDLGlCQUFpQixHQUFHVSxnQkFBSSxDQUFDSSxJQUFJLEVBQUU7VUFDckNoQixJQUFJLENBQUNpQixNQUFNLENBQUNoQixnQkFBZ0IsRUFBRUMsaUJBQWlCLENBQUM7O1VBRWhEO1VBQ01DLEtBQUssR0FBR0osS0FBSyxDQUFDbUIsTUFBTSxDQUFDQyxLQUFLLEdBQUduQixJQUFJLENBQUNrQixNQUFNLENBQUNDLEtBQUssR0FBRyxFQUFFLEVBQUU7VUFDckRmLEtBQUssR0FBRyxFQUFFLEVBQUU7VUFFbEI7VUFBQUcsUUFBQSxDQUFBRSxJQUFBO1VBQUEsT0FDTVYsS0FBSyxDQUFDcUIsU0FBUyxDQUFDcEIsSUFBSSxFQUFFRyxLQUFLLEVBQUVDLEtBQUssRUFBRSxDQUN0QztZQUNJaUIsSUFBSSxFQUFFVCxnQkFBSSxDQUFDVSxZQUFZO1lBQ3ZCQyxhQUFhLEVBQUUsR0FBRztZQUNsQkMsV0FBVyxFQUFFO1VBQ2pCLENBQUMsQ0FDSixDQUFDO1FBQUE7VUFBQWpCLFFBQUEsQ0FBQUUsSUFBQTtVQUFBLE9BR0lWLEtBQUssQ0FBQzBCLFVBQVUsQ0FBQzdCLGNBQWMsQ0FBQztRQUFBO1VBRXRDOEIsT0FBTyxDQUFDQyxHQUFHLENBQUMsMENBQTBDLENBQUM7VUFBQ3BCLFFBQUEsQ0FBQUUsSUFBQTtVQUFBO1FBQUE7VUFBQUYsUUFBQSxDQUFBQyxJQUFBO1VBQUFELFFBQUEsQ0FBQXFCLEVBQUEsR0FBQXJCLFFBQUE7VUFFeERtQixPQUFPLENBQUNHLEtBQUssQ0FBQyxRQUFRLEVBQUF0QixRQUFBLENBQUFxQixFQUFPLENBQUM7UUFBQztRQUFBO1VBQUEsT0FBQXJCLFFBQUEsQ0FBQXVCLElBQUE7TUFBQTtJQUFBLEdBQUFyQyxPQUFBO0VBQUEsQ0FFdEM7RUFBQSxnQkFoQ0tMLG1CQUFtQkEsQ0FBQTJDLEVBQUEsRUFBQUMsR0FBQSxFQUFBQyxHQUFBO0lBQUEsT0FBQTVDLElBQUEsQ0FBQTZDLEtBQUEsT0FBQUMsU0FBQTtFQUFBO0FBQUEsR0FnQ3hCIn0=