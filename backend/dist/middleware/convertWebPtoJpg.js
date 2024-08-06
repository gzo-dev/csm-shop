"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var express = require('express');
var multer = require('multer');
var sharp = require('sharp');
var fs = require('fs');
var path = require('path');

// Middleware để chuyển đổi WebP sang JPEG
var convertWebPToJpeg = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var file, originalName, filePath, buffer, jpegBuffer;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log(req.file);
          if (req.file) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", next());
        case 4:
          file = req.file;
          originalName = file.originalname;
          filePath = file.path; // Kiểm tra nếu file là định dạng webp
          if (!(path.extname(originalName).toLowerCase() === '.webp')) {
            _context.next = 16;
            break;
          }
          buffer = fs.readFileSync(filePath); // Sử dụng sharp để chuyển đổi định dạng
          _context.next = 11;
          return sharp(buffer).jpeg().toBuffer();
        case 11:
          jpegBuffer = _context.sent;
          // Cập nhật lại file trong request
          req.file.buffer = jpegBuffer;
          req.file.originalname = originalName.replace(/\.webp$/, '.jpg');
          req.file.mimetype = 'image/jpeg';
          req.file.path = req.file.path;
        case 16:
          next();
          _context.next = 23;
          break;
        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          console.error('Error in converting image:', _context.t0);
          res.status(500).send('Error in converting image');
        case 23:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 19]]);
  }));
  return function convertWebPToJpeg(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var _default = convertWebPToJpeg;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJleHByZXNzIiwicmVxdWlyZSIsIm11bHRlciIsInNoYXJwIiwiZnMiLCJwYXRoIiwiY29udmVydFdlYlBUb0pwZWciLCJfcmVmIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJyZXEiLCJyZXMiLCJuZXh0IiwiZmlsZSIsIm9yaWdpbmFsTmFtZSIsImZpbGVQYXRoIiwiYnVmZmVyIiwianBlZ0J1ZmZlciIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsImNvbnNvbGUiLCJsb2ciLCJhYnJ1cHQiLCJvcmlnaW5hbG5hbWUiLCJleHRuYW1lIiwidG9Mb3dlckNhc2UiLCJyZWFkRmlsZVN5bmMiLCJqcGVnIiwidG9CdWZmZXIiLCJzZW50IiwicmVwbGFjZSIsIm1pbWV0eXBlIiwidDAiLCJlcnJvciIsInN0YXR1cyIsInNlbmQiLCJzdG9wIiwiX3giLCJfeDIiLCJfeDMiLCJhcHBseSIsImFyZ3VtZW50cyIsIl9kZWZhdWx0IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlL2NvbnZlcnRXZWJQdG9KcGcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcclxuY29uc3QgbXVsdGVyID0gcmVxdWlyZSgnbXVsdGVyJyk7XHJcbmNvbnN0IHNoYXJwID0gcmVxdWlyZSgnc2hhcnAnKTtcclxuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xyXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xyXG5cclxuXHJcbi8vIE1pZGRsZXdhcmUgxJHhu4MgY2h1eeG7g24gxJHhu5VpIFdlYlAgc2FuZyBKUEVHXHJcbmNvbnN0IGNvbnZlcnRXZWJQVG9KcGVnID0gYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnNvbGUubG9nKHJlcS5maWxlKVxyXG4gICAgaWYgKCFyZXEuZmlsZSkge1xyXG4gICAgICByZXR1cm4gbmV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZpbGUgPSByZXEuZmlsZTtcclxuICAgIGNvbnN0IG9yaWdpbmFsTmFtZSA9IGZpbGUub3JpZ2luYWxuYW1lO1xyXG4gICAgY29uc3QgZmlsZVBhdGggPSBmaWxlLnBhdGg7XHJcbiAgICBcclxuICAgIC8vIEtp4buDbSB0cmEgbuG6v3UgZmlsZSBsw6AgxJHhu4tuaCBk4bqhbmcgd2VicFxyXG4gICAgaWYgKHBhdGguZXh0bmFtZShvcmlnaW5hbE5hbWUpLnRvTG93ZXJDYXNlKCkgPT09ICcud2VicCcpIHtcclxuICAgICAgY29uc3QgYnVmZmVyID0gZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoKTtcclxuICAgICAgLy8gU+G7rSBk4bulbmcgc2hhcnAgxJHhu4MgY2h1eeG7g24gxJHhu5VpIMSR4buLbmggZOG6oW5nXHJcbiAgICAgIGNvbnN0IGpwZWdCdWZmZXIgPSBhd2FpdCBzaGFycChidWZmZXIpLmpwZWcoKS50b0J1ZmZlcigpO1xyXG4gICAgICBcclxuICAgICAgLy8gQ+G6rXAgbmjhuq10IGzhuqFpIGZpbGUgdHJvbmcgcmVxdWVzdFxyXG4gICAgICByZXEuZmlsZS5idWZmZXIgPSBqcGVnQnVmZmVyO1xyXG4gICAgICByZXEuZmlsZS5vcmlnaW5hbG5hbWUgPSBvcmlnaW5hbE5hbWUucmVwbGFjZSgvXFwud2VicCQvLCAnLmpwZycpO1xyXG4gICAgICByZXEuZmlsZS5taW1ldHlwZSA9ICdpbWFnZS9qcGVnJztcclxuICAgICAgcmVxLmZpbGUucGF0aD0gcmVxLmZpbGUucGF0aFxyXG4gICAgfVxyXG5cclxuICAgIG5leHQoKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgaW4gY29udmVydGluZyBpbWFnZTonLCBlcnJvcik7XHJcbiAgICByZXMuc3RhdHVzKDUwMCkuc2VuZCgnRXJyb3IgaW4gY29udmVydGluZyBpbWFnZScpO1xyXG4g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