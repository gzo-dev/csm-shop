"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _fs = _interopRequireDefault(require("fs"));
var _sharp = _interopRequireDefault(require("sharp"));
var _path = _interopRequireDefault(require("path"));
var _models = require("../../../models");
var _sequelize = require("sequelize");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var _default = {
  uploadImage: function uploadImage(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var uploadDir, imagePath, imageBuffer, compressedImageBuffer, imageUrl;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (req.file) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return", res.status(400).send("No file uploaded."));
          case 2:
            uploadDir = _path["default"].join("x_image_blog"); // Đường dẫn tuyệt đối của ảnh đã upload
            imagePath = _path["default"].join(uploadDir, req.file.filename);
            _context.prev = 4;
            _context.next = 7;
            return (0, _sharp["default"])(imagePath).toBuffer();
          case 7:
            imageBuffer = _context.sent;
            _context.next = 10;
            return (0, _sharp["default"])(imageBuffer).webp({
              quality: 65,
              force: true
            }).resize({
              fit: "inside",
              width: 1280
            }).toBuffer();
          case 10:
            compressedImageBuffer = _context.sent;
            // Ghi ảnh nén ra file
            _fs["default"].writeFileSync(imagePath, compressedImageBuffer);

            // Trả về URL của ảnh đã được upload
            imageUrl = "".concat(req.protocol, "://").concat(req.get("host"), "/x_image_blog/").concat(req.file.filename);
            res.json({
              imageUrl: imageUrl
            });
            _context.next = 20;
            break;
          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](4);
            console.error("Error compressing image:", _context.t0);
            return _context.abrupt("return", res.status(500).send("Error compressing image."));
          case 20:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[4, 16]]);
    }))();
  },
  changeHost: function changeHost(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var productPhotos, _iterator, _step, productPhoto, oldPath, newPath;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _models.db.product.findAll();
          case 3:
            productPhotos = _context2.sent;
            console.log(productPhotos.length);
            _iterator = _createForOfIteratorHelper(productPhotos);
            _context2.prev = 6;
            _iterator.s();
          case 8:
            if ((_step = _iterator.n()).done) {
              _context2.next = 19;
              break;
            }
            productPhoto = _step.value;
            oldPath = productPhoto.photo;
            if (!oldPath) {
              _context2.next = 17;
              break;
            }
            // Thay thế miền cũ bằng miền mới
            newPath = oldPath.replace("trouytin.online:8443", "api.minhkhanggroup.vn"); // Cập nhật đường dẫn mới vào cơ sở dữ liệu
            productPhoto.photo = newPath;
            _context2.next = 16;
            return productPhoto.save();
          case 16:
            console.log("\u0110\xE3 c\u1EADp nh\u1EADt id ".concat(productPhoto.id, " t\u1EEB ").concat(oldPath, " sang ").concat(newPath));
            // return res.json({ ok: true });
          case 17:
            _context2.next = 8;
            break;
          case 19:
            _context2.next = 24;
            break;
          case 21:
            _context2.prev = 21;
            _context2.t0 = _context2["catch"](6);
            _iterator.e(_context2.t0);
          case 24:
            _context2.prev = 24;
            _iterator.f();
            return _context2.finish(24);
          case 27:
            _context2.next = 33;
            break;
          case 29:
            _context2.prev = 29;
            _context2.t1 = _context2["catch"](0);
            console.log(_context2.t1);
            return _context2.abrupt("return", res.json({
              ok: false
            }));
          case 33:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 29], [6, 21, 24, 27]]);
    }))();
  },
  changeMimeType: function changeMimeType(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var convertPngToJpg, inputFolder, outputFolder;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            // Hàm để chuyển đổi ảnh từ PNG sang JPG
            convertPngToJpg = /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(inputPath, outputPath) {
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.prev = 0;
                      _context3.next = 3;
                      return (0, _sharp["default"])(inputPath).jpeg({
                        quality: 80,
                        force: true
                      }) // Chuyển đổi sang JPG với chất lượng 80%
                      .resize({
                        fit: "inside",
                        width: 720
                      }).toFile(outputPath);
                    case 3:
                      console.log("\u0110\xE3 chuy\u1EC3n \u0111\u1ED5i: ".concat(inputPath, " -> ").concat(outputPath));
                      _context3.next = 9;
                      break;
                    case 6:
                      _context3.prev = 6;
                      _context3.t0 = _context3["catch"](0);
                      console.error("L\u1ED7i khi chuy\u1EC3n \u0111\u1ED5i ".concat(inputPath, ":"), _context3.t0);
                    case 9:
                    case "end":
                      return _context3.stop();
                  }
                }, _callee3, null, [[0, 6]]);
              }));
              return function convertPngToJpg(_x, _x2) {
                return _ref.apply(this, arguments);
              };
            }(); // Đọc tất cả các tệp trong thư mục nguồn
            inputFolder = _path["default"].join("watermark");
            outputFolder = _path["default"].join("watermark_jpg");
            _fs["default"].readdir(inputFolder, function (err, files) {
              if (err) {
                return console.error("Lỗi khi đọc thư mục:", err);
              }

              // Duyệt qua từng tệp và chuyển đổi nếu là tệp PNG
              files.forEach(function (file) {
                var inputPath = _path["default"].join(inputFolder, file);
                var outputPath = _path["default"].join(outputFolder, file.replace(".png", ".jpg"));

                // Kiểm tra xem tệp có phải là PNG không
                if (_path["default"].extname(file).toLowerCase() === ".png") {
                  convertPngToJpg(inputPath, outputPath);
                }
              });
            });
            _context4.next = 11;
            break;
          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            return _context4.abrupt("return", res.json({
              ok: false
            }));
          case 11:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 7]]);
    }))();
  },
  changeMimeTypeDb: function changeMimeTypeDb(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var productPhotos, _iterator2, _step2, productPhoto, oldPath, newPath;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _models.db.productphoto.findAll({
              where: {
                imgUrl: (0, _defineProperty2["default"])({}, _sequelize.Sequelize.Op.like, "%api.minhkhanggroup.vn%.png")
              }
            });
          case 3:
            productPhotos = _context5.sent;
            _iterator2 = _createForOfIteratorHelper(productPhotos);
            _context5.prev = 5;
            _iterator2.s();
          case 7:
            if ((_step2 = _iterator2.n()).done) {
              _context5.next = 17;
              break;
            }
            productPhoto = _step2.value;
            oldPath = productPhoto.imgUrl; // Thay thế đuôi '.png' bằng '.jpg'
            newPath = oldPath.replace(".png", ".jpg"); // Cập nhật đường dẫn mới vào cơ sở dữ liệu
            productPhoto.imgUrl = newPath;
            _context5.next = 14;
            return productPhoto.save();
          case 14:
            console.log("\u0110\xE3 c\u1EADp nh\u1EADt id ".concat(productPhoto.id, " t\u1EEB ").concat(oldPath, " sang ").concat(newPath));
          case 15:
            _context5.next = 7;
            break;
          case 17:
            _context5.next = 22;
            break;
          case 19:
            _context5.prev = 19;
            _context5.t0 = _context5["catch"](5);
            _iterator2.e(_context5.t0);
          case 22:
            _context5.prev = 22;
            _iterator2.f();
            return _context5.finish(22);
          case 25:
            _context5.next = 30;
            break;
          case 27:
            _context5.prev = 27;
            _context5.t1 = _context5["catch"](0);
            console.error("Đã xảy ra lỗi:", _context5.t1);
          case 30:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 27], [5, 19, 22, 25]]);
    }))();
  },
  changeMimeTypeDb1: function changeMimeTypeDb1(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var productPhotos, _iterator3, _step3, productPhoto, oldPath, newPath;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _models.db.product.findAll({
              where: {
                photo: (0, _defineProperty2["default"])({}, _sequelize.Sequelize.Op.like, "%api.minhkhanggroup.vn%.png")
              }
            });
          case 3:
            productPhotos = _context6.sent;
            _iterator3 = _createForOfIteratorHelper(productPhotos);
            _context6.prev = 5;
            _iterator3.s();
          case 7:
            if ((_step3 = _iterator3.n()).done) {
              _context6.next = 17;
              break;
            }
            productPhoto = _step3.value;
            oldPath = productPhoto.photo; // Thay thế đuôi '.png' bằng '.jpg'
            newPath = oldPath.replace(".png", ".jpg"); // Cập nhật đường dẫn mới vào cơ sở dữ liệu
            productPhoto.photo = newPath;
            _context6.next = 14;
            return productPhoto.save();
          case 14:
            console.log("\u0110\xE3 c\u1EADp nh\u1EADt id ".concat(productPhoto.id, " t\u1EEB ").concat(oldPath, " sang ").concat(newPath));
          case 15:
            _context6.next = 7;
            break;
          case 17:
            _context6.next = 22;
            break;
          case 19:
            _context6.prev = 19;
            _context6.t0 = _context6["catch"](5);
            _iterator3.e(_context6.t0);
          case 22:
            _context6.prev = 22;
            _iterator3.f();
            return _context6.finish(22);
          case 25:
            _context6.next = 30;
            break;
          case 27:
            _context6.prev = 27;
            _context6.t1 = _context6["catch"](0);
            console.error("Đã xảy ra lỗi:", _context6.t1);
          case 30:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 27], [5, 19, 22, 25]]);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZnMiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9zaGFycCIsIl9wYXRoIiwiX21vZGVscyIsIl9zZXF1ZWxpemUiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIm8iLCJhbGxvd0FycmF5TGlrZSIsIml0IiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJBcnJheSIsImlzQXJyYXkiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJsZW5ndGgiLCJpIiwiRiIsInMiLCJuIiwiZG9uZSIsInZhbHVlIiwiZSIsIl9lIiwiZiIsIlR5cGVFcnJvciIsIm5vcm1hbENvbXBsZXRpb24iLCJkaWRFcnIiLCJlcnIiLCJjYWxsIiwic3RlcCIsIm5leHQiLCJfZTIiLCJtaW5MZW4iLCJfYXJyYXlMaWtlVG9BcnJheSIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJmcm9tIiwidGVzdCIsImFyciIsImxlbiIsImFycjIiLCJfZGVmYXVsdCIsInVwbG9hZEltYWdlIiwicmVxIiwicmVzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJ1cGxvYWREaXIiLCJpbWFnZVBhdGgiLCJpbWFnZUJ1ZmZlciIsImNvbXByZXNzZWRJbWFnZUJ1ZmZlciIsImltYWdlVXJsIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwiZmlsZSIsImFicnVwdCIsInN0YXR1cyIsInNlbmQiLCJwYXRoIiwiam9pbiIsImZpbGVuYW1lIiwic2hhcnAiLCJ0b0J1ZmZlciIsInNlbnQiLCJ3ZWJwIiwicXVhbGl0eSIsImZvcmNlIiwicmVzaXplIiwiZml0Iiwid2lkdGgiLCJmcyIsIndyaXRlRmlsZVN5bmMiLCJjb25jYXQiLCJwcm90b2NvbCIsImdldCIsImpzb24iLCJ0MCIsImNvbnNvbGUiLCJlcnJvciIsInN0b3AiLCJjaGFuZ2VIb3N0IiwiX2NhbGxlZTIiLCJwcm9kdWN0UGhvdG9zIiwiX2l0ZXJhdG9yIiwiX3N0ZXAiLCJwcm9kdWN0UGhvdG8iLCJvbGRQYXRoIiwibmV3UGF0aCIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsImRiIiwicHJvZHVjdCIsImZpbmRBbGwiLCJsb2ciLCJwaG90byIsInJlcGxhY2UiLCJzYXZlIiwiaWQiLCJmaW5pc2giLCJ0MSIsIm9rIiwiY2hhbmdlTWltZVR5cGUiLCJfY2FsbGVlNCIsImNvbnZlcnRQbmdUb0pwZyIsImlucHV0Rm9sZGVyIiwib3V0cHV0Rm9sZGVyIiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwiX3JlZiIsIl9jYWxsZWUzIiwiaW5wdXRQYXRoIiwib3V0cHV0UGF0aCIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsImpwZWciLCJ0b0ZpbGUiLCJfeCIsIl94MiIsImFwcGx5IiwiYXJndW1lbnRzIiwicmVhZGRpciIsImZpbGVzIiwiZm9yRWFjaCIsImV4dG5hbWUiLCJ0b0xvd2VyQ2FzZSIsImNoYW5nZU1pbWVUeXBlRGIiLCJfY2FsbGVlNSIsIl9pdGVyYXRvcjIiLCJfc3RlcDIiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJwcm9kdWN0cGhvdG8iLCJ3aGVyZSIsImltZ1VybCIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJTZXF1ZWxpemUiLCJPcCIsImxpa2UiLCJjaGFuZ2VNaW1lVHlwZURiMSIsIl9jYWxsZWU2IiwiX2l0ZXJhdG9yMyIsIl9zdGVwMyIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy91cGxvYWQvdXBsb2FkLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgc2hhcnAgZnJvbSBcInNoYXJwXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IGRiIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVsc1wiO1xyXG5pbXBvcnQgeyBTZXF1ZWxpemUgfSBmcm9tIFwic2VxdWVsaXplXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgYXN5bmMgdXBsb2FkSW1hZ2UocmVxLCByZXMpIHtcclxuICAgIGlmICghcmVxLmZpbGUpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKFwiTm8gZmlsZSB1cGxvYWRlZC5cIik7XHJcbiAgICB9XHJcbiAgICBjb25zdCB1cGxvYWREaXIgPSBwYXRoLmpvaW4oXCJ4X2ltYWdlX2Jsb2dcIik7XHJcbiAgICAvLyDEkMaw4budbmcgZOG6q24gdHV54buHdCDEkeG7kWkgY+G7p2Eg4bqjbmggxJHDoyB1cGxvYWRcclxuICAgIGNvbnN0IGltYWdlUGF0aCA9IHBhdGguam9pbih1cGxvYWREaXIsIHJlcS5maWxlLmZpbGVuYW1lKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAvLyDEkOG7jWMg4bqjbmggdsOgbyBi4bqxbmcgdGjGsCB2aeG7h24gc2hhcnBcclxuICAgICAgY29uc3QgaW1hZ2VCdWZmZXIgPSBhd2FpdCBzaGFycChpbWFnZVBhdGgpLnRvQnVmZmVyKCk7XHJcblxyXG4gICAgICAvLyBOw6luIOG6o25oIHbhu5tpIGNo4bqldCBsxrDhu6NuZyA3MCUgdsOgIGR1bmcgbMaw4bujbmcgdOG7kWkgxJFhIDEwMGtiXHJcbiAgICAgIGNvbnN0IGNvbXByZXNzZWRJbWFnZUJ1ZmZlciA9IGF3YWl0IHNoYXJwKGltYWdlQnVmZmVyKVxyXG4gICAgICAgIC53ZWJwKHsgcXVhbGl0eTogNjUsIGZvcmNlOiB0cnVlIH0pXHJcbiAgICAgICAgLnJlc2l6ZSh7IGZpdDogXCJpbnNpZGVcIiwgd2lkdGg6IDEyODAgfSlcclxuICAgICAgICAudG9CdWZmZXIoKTtcclxuXHJcbiAgICAgIC8vIEdoaSDhuqNuaCBuw6luIHJhIGZpbGVcclxuICAgICAgZnMud3JpdGVGaWxlU3luYyhpbWFnZVBhdGgsIGNvbXByZXNzZWRJbWFnZUJ1ZmZlcik7XHJcblxyXG4gICAgICAvLyBUcuG6oyB24buBIFVSTCBj4bunYSDhuqNuaCDEkcOjIMSRxrDhu6NjIHVwbG9hZFxyXG4gICAgICBjb25zdCBpbWFnZVVybCA9IGAke3JlcS5wcm90b2NvbH06Ly8ke3JlcS5nZXQoXCJob3N0XCIpfS94X2ltYWdlX2Jsb2cvJHtcclxuICAgICAgICByZXEuZmlsZS5maWxlbmFtZVxyXG4gICAgICB9YDtcclxuICAgICAgcmVzLmpzb24oeyBpbWFnZVVybDogaW1hZ2VVcmwgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgY29tcHJlc3NpbmcgaW1hZ2U6XCIsIGVycm9yKTtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5zZW5kKFwiRXJyb3IgY29tcHJlc3NpbmcgaW1hZ2UuXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXN5bmMgY2hhbmdlSG9zdChyZXEsIHJlcykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gS+G6v3QgbuG7kWkgxJHhur9uIGPGoSBz4bufIGThu68gbGnhu4d1XHJcbiAgICAgIGNvbnN0IHByb2R1Y3RQaG90b3MgPSBhd2FpdCBkYi5wcm9kdWN0LmZpbmRBbGwoKTtcclxuICAgICAgY29uc29sZS5sb2cocHJvZHVjdFBob3Rvcy5sZW5ndGgpO1xyXG4gICAgICBmb3IgKGxldCBwcm9kdWN0UGhvdG8gb2YgcHJvZHVjdFBob3Rvcykge1xyXG4gICAgICAgIGNvbnN0IG9sZFBhdGggPSBwcm9kdWN0UGhvdG8ucGhvdG87XHJcbiAgICAgICAgaWYgKG9sZFBhdGgpIHtcclxuICAgICAgICAgIC8vIFRoYXkgdGjhur8gbWnhu4FuIGPFqSBi4bqxbmcgbWnhu4FuIG3hu5tpXHJcbiAgICAgICAgICBjb25zdCBuZXdQYXRoID0gb2xkUGF0aC5yZXBsYWNlKFxyXG4gICAgICAgICAgICBcInRyb3V5dGluLm9ubGluZTo4NDQzXCIsXHJcbiAgICAgICAgICAgIFwiYXBpLm1pbmhraGFuZ2dyb3VwLnZuXCJcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgLy8gQ+G6rXAgbmjhuq10IMSRxrDhu51uZyBk4bqrbiBt4bubaSB2w6BvIGPGoSBz4bufIGThu68gbGnhu4d1XHJcbiAgICAgICAgICBwcm9kdWN0UGhvdG8ucGhvdG8gPSBuZXdQYXRoO1xyXG4gICAgICAgICAgYXdhaXQgcHJvZHVjdFBob3RvLnNhdmUoKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICBgxJDDoyBj4bqtcCBuaOG6rXQgaWQgJHtwcm9kdWN0UGhvdG8uaWR9IHThu6sgJHtvbGRQYXRofSBzYW5nICR7bmV3UGF0aH1gXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgLy8gcmV0dXJuIHJlcy5qc29uKHsgb2s6IHRydWUgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgcmV0dXJuIHJlcy5qc29uKHsgb2s6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXN5bmMgY2hhbmdlTWltZVR5cGUocmVxLCByZXMpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGlucHV0Rm9sZGVyID0gcGF0aC5qb2luKFwid2F0ZXJtYXJrXCIpO1xyXG4gICAgICBjb25zdCBvdXRwdXRGb2xkZXIgPSBwYXRoLmpvaW4oXCJ3YXRlcm1hcmtfanBnXCIpO1xyXG4gICAgICAvLyBIw6BtIMSR4buDIGNodXnhu4NuIMSR4buVaSDhuqNuaCB04burIFBORyBzYW5nIEpQR1xyXG4gICAgICBhc3luYyBmdW5jdGlvbiBjb252ZXJ0UG5nVG9KcGcoaW5wdXRQYXRoLCBvdXRwdXRQYXRoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGF3YWl0IHNoYXJwKGlucHV0UGF0aClcclxuICAgICAgICAgICAgLmpwZWcoeyBxdWFsaXR5OiA4MCwgZm9yY2U6IHRydWUgfSkgLy8gQ2h1eeG7g24gxJHhu5VpIHNhbmcgSlBHIHbhu5tpIGNo4bqldCBsxrDhu6NuZyA4MCVcclxuICAgICAgICAgICAgLnJlc2l6ZSh7IGZpdDogXCJpbnNpZGVcIiwgd2lkdGg6IDcyMCB9KVxyXG4gICAgICAgICAgICAudG9GaWxlKG91dHB1dFBhdGgpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coYMSQw6MgY2h1eeG7g24gxJHhu5VpOiAke2lucHV0UGF0aH0gLT4gJHtvdXRwdXRQYXRofWApO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihgTOG7l2kga2hpIGNodXnhu4NuIMSR4buVaSAke2lucHV0UGF0aH06YCwgZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIMSQ4buNYyB04bqldCBj4bqjIGPDoWMgdOG7h3AgdHJvbmcgdGjGsCBt4bulYyBuZ3Xhu5NuXHJcbiAgICAgIGZzLnJlYWRkaXIoaW5wdXRGb2xkZXIsIChlcnIsIGZpbGVzKSA9PiB7XHJcbiAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoXCJM4buXaSBraGkgxJHhu41jIHRoxrAgbeG7pWM6XCIsIGVycik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEdXnhu4d0IHF1YSB04burbmcgdOG7h3AgdsOgIGNodXnhu4NuIMSR4buVaSBu4bq/dSBsw6AgdOG7h3AgUE5HXHJcbiAgICAgICAgZmlsZXMuZm9yRWFjaCgoZmlsZSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaW5wdXRQYXRoID0gcGF0aC5qb2luKGlucHV0Rm9sZGVyLCBmaWxlKTtcclxuICAgICAgICAgIGNvbnN0IG91dHB1dFBhdGggPSBwYXRoLmpvaW4oXHJcbiAgICAgICAgICAgIG91dHB1dEZvbGRlcixcclxuICAgICAgICAgICAgZmlsZS5yZXBsYWNlKFwiLnBuZ1wiLCBcIi5qcGdcIilcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgLy8gS2nhu4NtIHRyYSB4ZW0gdOG7h3AgY8OzIHBo4bqjaSBsw6AgUE5HIGtow7RuZ1xyXG4gICAgICAgICAgaWYgKHBhdGguZXh0bmFtZShmaWxlKS50b0xvd2VyQ2FzZSgpID09PSBcIi5wbmdcIikge1xyXG4gICAgICAgICAgICBjb252ZXJ0UG5nVG9KcGcoaW5wdXRQYXRoLCBvdXRwdXRQYXRoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgcmV0dXJuIHJlcy5qc29uKHsgb2s6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXN5bmMgY2hhbmdlTWltZVR5cGVEYihyZXEsIHJlcykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gS+G6v3QgbuG7kWkgxJHhur9uIGPGoSBz4bufIGThu68gbGnhu4d1XHJcblxyXG4gICAgICAvLyBUcnV5IHbhuqVuIMSR4buDIGzhuqV5IHThuqV0IGPhuqMgY8OhYyBi4bqjbiBnaGkgY8OzIG1p4buBbiAnYXBpLm1pbmhraGFuZ2dyb3VwLnZuJyB2w6AgxJF1w7RpICcucG5nJ1xyXG4gICAgICBjb25zdCBwcm9kdWN0UGhvdG9zID0gYXdhaXQgZGIucHJvZHVjdHBob3RvLmZpbmRBbGwoe1xyXG4gICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICBpbWdVcmw6IHtcclxuICAgICAgICAgICAgW1NlcXVlbGl6ZS5PcC5saWtlXTogXCIlYXBpLm1pbmhraGFuZ2dyb3VwLnZuJS5wbmdcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBmb3IgKGxldCBwcm9kdWN0UGhvdG8gb2YgcHJvZHVjdFBob3Rvcykge1xyXG4gICAgICAgIGNvbnN0IG9sZFBhdGggPSBwcm9kdWN0UGhvdG8uaW1nVXJsO1xyXG5cclxuICAgICAgICAvLyBUaGF5IHRo4bq/IMSRdcO0aSAnLnBuZycgYuG6sW5nICcuanBnJ1xyXG4gICAgICAgIGNvbnN0IG5ld1BhdGggPSBvbGRQYXRoLnJlcGxhY2UoXCIucG5nXCIsIFwiLmpwZ1wiKTtcclxuXHJcbiAgICAgICAgLy8gQ+G6rXAgbmjhuq10IMSRxrDhu51uZyBk4bqrbiBt4bubaSB2w6BvIGPGoSBz4bufIGThu68gbGnhu4d1XHJcbiAgICAgICAgcHJvZHVjdFBob3RvLmltZ1VybCA9IG5ld1BhdGg7XHJcbiAgICAgICAgYXdhaXQgcHJvZHVjdFBob3RvLnNhdmUoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgIGDEkMOjIGPhuq1wIG5o4bqtdCBpZCAke3Byb2R1Y3RQaG90by5pZH0gdOG7qyAke29sZFBhdGh9IHNhbmcgJHtuZXdQYXRofWBcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIsSQw6MgeOG6o3kgcmEgbOG7l2k6XCIsIGVycik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyBjaGFuZ2VNaW1lVHlwZURiMShyZXEsIHJlcykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gS+G6v3QgbuG7kWkgxJHhur9uIGPGoSBz4bufIGThu68gbGnhu4d1XHJcblxyXG4gICAgICAvLyBUcnV5IHbhuqVuIMSR4buDIGzhuqV5IHThuqV0IGPhuqMgY8OhYyBi4bqjbiBnaGkgY8OzIG1p4buBbiAnYXBpLm1pbmhraGFuZ2dyb3VwLnZuJyB2w6AgxJF1w7RpICcucG5nJ1xyXG4gICAgICBjb25zdCBwcm9kdWN0UGhvdG9zID0gYXdhaXQgZGIucHJvZHVjdC5maW5kQWxsKHtcclxuICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgcGhvdG86IHtcclxuICAgICAgICAgICAgW1NlcXVlbGl6ZS5PcC5saWtlXTogXCIlYXBpLm1pbmhraGFuZ2dyb3VwLnZuJS5wbmdcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBmb3IgKGxldCBwcm9kdWN0UGhvdG8gb2YgcHJvZHVjdFBob3Rvcykge1xyXG4gICAgICAgIGNvbnN0IG9sZFBhdGggPSBwcm9kdWN0UGhvdG8ucGhvdG87XHJcblxyXG4gICAgICAgIC8vIFRoYXkgdGjhur8gxJF1w7RpICcucG5nJyBi4bqxbmcgJy5qcGcnXHJcbiAgICAgICAgY29uc3QgbmV3UGF0aCA9IG9sZFBhdGgucmVwbGFjZShcIi5wbmdcIiwgXCIuanBnXCIpO1xyXG5cclxuICAgICAgICAvLyBD4bqtcCBuaOG6rXQgxJHGsOG7nW5nIGThuqtuIG3hu5tpIHbDoG8gY8ahIHPhu58gZOG7ryBsaeG7h3VcclxuICAgICAgICBwcm9kdWN0UGhvdG8ucGhvdG8gPSBuZXdQYXRoO1xyXG4gICAgICAgIGF3YWl0IHByb2R1Y3RQaG90by5zYXZlKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICBgxJDDoyBj4bqtcCBuaOG6rXQgaWQgJHtwcm9kdWN0UGhvdG8uaWR9IHThu6sgJHtvbGRQYXRofSBzYW5nICR7bmV3UGF0aH1gXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCLEkMOjIHjhuqN5IHJhIGzhu5dpOlwiLCBlcnIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbn07XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUFBLEdBQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFDLE1BQUEsR0FBQUYsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFFLEtBQUEsR0FBQUgsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFHLE9BQUEsR0FBQUgsT0FBQTtBQUNBLElBQUFJLFVBQUEsR0FBQUosT0FBQTtBQUFzQyxTQUFBSywyQkFBQUMsQ0FBQSxFQUFBQyxjQUFBLFFBQUFDLEVBQUEsVUFBQUMsTUFBQSxvQkFBQUgsQ0FBQSxDQUFBRyxNQUFBLENBQUFDLFFBQUEsS0FBQUosQ0FBQSxxQkFBQUUsRUFBQSxRQUFBRyxLQUFBLENBQUFDLE9BQUEsQ0FBQU4sQ0FBQSxNQUFBRSxFQUFBLEdBQUFLLDJCQUFBLENBQUFQLENBQUEsTUFBQUMsY0FBQSxJQUFBRCxDQUFBLFdBQUFBLENBQUEsQ0FBQVEsTUFBQSxxQkFBQU4sRUFBQSxFQUFBRixDQUFBLEdBQUFFLEVBQUEsTUFBQU8sQ0FBQSxVQUFBQyxDQUFBLFlBQUFBLEVBQUEsZUFBQUMsQ0FBQSxFQUFBRCxDQUFBLEVBQUFFLENBQUEsV0FBQUEsRUFBQSxRQUFBSCxDQUFBLElBQUFULENBQUEsQ0FBQVEsTUFBQSxXQUFBSyxJQUFBLG1CQUFBQSxJQUFBLFNBQUFDLEtBQUEsRUFBQWQsQ0FBQSxDQUFBUyxDQUFBLFVBQUFNLENBQUEsV0FBQUEsRUFBQUMsRUFBQSxVQUFBQSxFQUFBLEtBQUFDLENBQUEsRUFBQVAsQ0FBQSxnQkFBQVEsU0FBQSxpSkFBQUMsZ0JBQUEsU0FBQUMsTUFBQSxVQUFBQyxHQUFBLFdBQUFWLENBQUEsV0FBQUEsRUFBQSxJQUFBVCxFQUFBLEdBQUFBLEVBQUEsQ0FBQW9CLElBQUEsQ0FBQXRCLENBQUEsTUFBQVksQ0FBQSxXQUFBQSxFQUFBLFFBQUFXLElBQUEsR0FBQXJCLEVBQUEsQ0FBQXNCLElBQUEsSUFBQUwsZ0JBQUEsR0FBQUksSUFBQSxDQUFBVixJQUFBLFNBQUFVLElBQUEsS0FBQVIsQ0FBQSxXQUFBQSxFQUFBVSxHQUFBLElBQUFMLE1BQUEsU0FBQUMsR0FBQSxHQUFBSSxHQUFBLEtBQUFSLENBQUEsV0FBQUEsRUFBQSxlQUFBRSxnQkFBQSxJQUFBakIsRUFBQSxvQkFBQUEsRUFBQSw4QkFBQWtCLE1BQUEsUUFBQUMsR0FBQTtBQUFBLFNBQUFkLDRCQUFBUCxDQUFBLEVBQUEwQixNQUFBLFNBQUExQixDQUFBLHFCQUFBQSxDQUFBLHNCQUFBMkIsaUJBQUEsQ0FBQTNCLENBQUEsRUFBQTBCLE1BQUEsT0FBQWQsQ0FBQSxHQUFBZ0IsTUFBQSxDQUFBQyxTQUFBLENBQUFDLFFBQUEsQ0FBQVIsSUFBQSxDQUFBdEIsQ0FBQSxFQUFBK0IsS0FBQSxhQUFBbkIsQ0FBQSxpQkFBQVosQ0FBQSxDQUFBZ0MsV0FBQSxFQUFBcEIsQ0FBQSxHQUFBWixDQUFBLENBQUFnQyxXQUFBLENBQUFDLElBQUEsTUFBQXJCLENBQUEsY0FBQUEsQ0FBQSxtQkFBQVAsS0FBQSxDQUFBNkIsSUFBQSxDQUFBbEMsQ0FBQSxPQUFBWSxDQUFBLCtEQUFBdUIsSUFBQSxDQUFBdkIsQ0FBQSxVQUFBZSxpQkFBQSxDQUFBM0IsQ0FBQSxFQUFBMEIsTUFBQTtBQUFBLFNBQUFDLGtCQUFBUyxHQUFBLEVBQUFDLEdBQUEsUUFBQUEsR0FBQSxZQUFBQSxHQUFBLEdBQUFELEdBQUEsQ0FBQTVCLE1BQUEsRUFBQTZCLEdBQUEsR0FBQUQsR0FBQSxDQUFBNUIsTUFBQSxXQUFBQyxDQUFBLE1BQUE2QixJQUFBLE9BQUFqQyxLQUFBLENBQUFnQyxHQUFBLEdBQUE1QixDQUFBLEdBQUE0QixHQUFBLEVBQUE1QixDQUFBLElBQUE2QixJQUFBLENBQUE3QixDQUFBLElBQUEyQixHQUFBLENBQUEzQixDQUFBLFVBQUE2QixJQUFBO0FBQUEsSUFBQUMsUUFBQSxHQUV2QjtFQUNQQyxXQUFXLFdBQUFBLFlBQUNDLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBQUEsV0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBQyxRQUFBO01BQUEsSUFBQUMsU0FBQSxFQUFBQyxTQUFBLEVBQUFDLFdBQUEsRUFBQUMscUJBQUEsRUFBQUMsUUFBQTtNQUFBLE9BQUFQLFlBQUEsWUFBQVEsSUFBQSxVQUFBQyxTQUFBQyxRQUFBO1FBQUEsa0JBQUFBLFFBQUEsQ0FBQUMsSUFBQSxHQUFBRCxRQUFBLENBQUE5QixJQUFBO1VBQUE7WUFBQSxJQUNyQmlCLEdBQUcsQ0FBQ2UsSUFBSTtjQUFBRixRQUFBLENBQUE5QixJQUFBO2NBQUE7WUFBQTtZQUFBLE9BQUE4QixRQUFBLENBQUFHLE1BQUEsV0FDSmYsR0FBRyxDQUFDZ0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUMsbUJBQW1CLENBQUM7VUFBQTtZQUU1Q1osU0FBUyxHQUFHYSxnQkFBSSxDQUFDQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQzNDO1lBQ01iLFNBQVMsR0FBR1ksZ0JBQUksQ0FBQ0MsSUFBSSxDQUFDZCxTQUFTLEVBQUVOLEdBQUcsQ0FBQ2UsSUFBSSxDQUFDTSxRQUFRLENBQUM7WUFBQVIsUUFBQSxDQUFBQyxJQUFBO1lBQUFELFFBQUEsQ0FBQTlCLElBQUE7WUFBQSxPQUk3QixJQUFBdUMsaUJBQUssRUFBQ2YsU0FBUyxDQUFDLENBQUNnQixRQUFRLENBQUMsQ0FBQztVQUFBO1lBQS9DZixXQUFXLEdBQUFLLFFBQUEsQ0FBQVcsSUFBQTtZQUFBWCxRQUFBLENBQUE5QixJQUFBO1lBQUEsT0FHbUIsSUFBQXVDLGlCQUFLLEVBQUNkLFdBQVcsQ0FBQyxDQUNuRGlCLElBQUksQ0FBQztjQUFFQyxPQUFPLEVBQUUsRUFBRTtjQUFFQyxLQUFLLEVBQUU7WUFBSyxDQUFDLENBQUMsQ0FDbENDLE1BQU0sQ0FBQztjQUFFQyxHQUFHLEVBQUUsUUFBUTtjQUFFQyxLQUFLLEVBQUU7WUFBSyxDQUFDLENBQUMsQ0FDdENQLFFBQVEsQ0FBQyxDQUFDO1VBQUE7WUFIUGQscUJBQXFCLEdBQUFJLFFBQUEsQ0FBQVcsSUFBQTtZQUszQjtZQUNBTyxjQUFFLENBQUNDLGFBQWEsQ0FBQ3pCLFNBQVMsRUFBRUUscUJBQXFCLENBQUM7O1lBRWxEO1lBQ01DLFFBQVEsTUFBQXVCLE1BQUEsQ0FBTWpDLEdBQUcsQ0FBQ2tDLFFBQVEsU0FBQUQsTUFBQSxDQUFNakMsR0FBRyxDQUFDbUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxvQkFBQUYsTUFBQSxDQUNuRGpDLEdBQUcsQ0FBQ2UsSUFBSSxDQUFDTSxRQUFRO1lBRW5CcEIsR0FBRyxDQUFDbUMsSUFBSSxDQUFDO2NBQUUxQixRQUFRLEVBQUVBO1lBQVMsQ0FBQyxDQUFDO1lBQUNHLFFBQUEsQ0FBQTlCLElBQUE7WUFBQTtVQUFBO1lBQUE4QixRQUFBLENBQUFDLElBQUE7WUFBQUQsUUFBQSxDQUFBd0IsRUFBQSxHQUFBeEIsUUFBQTtZQUVqQ3lCLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDLDBCQUEwQixFQUFBMUIsUUFBQSxDQUFBd0IsRUFBTyxDQUFDO1lBQUMsT0FBQXhCLFFBQUEsQ0FBQUcsTUFBQSxXQUMxQ2YsR0FBRyxDQUFDZ0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUMsMEJBQTBCLENBQUM7VUFBQTtVQUFBO1lBQUEsT0FBQUwsUUFBQSxDQUFBMkIsSUFBQTtRQUFBO01BQUEsR0FBQW5DLE9BQUE7SUFBQTtFQUUzRCxDQUFDO0VBQ0tvQyxVQUFVLFdBQUFBLFdBQUN6QyxHQUFHLEVBQUVDLEdBQUcsRUFBRTtJQUFBLFdBQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQXNDLFNBQUE7TUFBQSxJQUFBQyxhQUFBLEVBQUFDLFNBQUEsRUFBQUMsS0FBQSxFQUFBQyxZQUFBLEVBQUFDLE9BQUEsRUFBQUMsT0FBQTtNQUFBLE9BQUE3QyxZQUFBLFlBQUFRLElBQUEsVUFBQXNDLFVBQUFDLFNBQUE7UUFBQSxrQkFBQUEsU0FBQSxDQUFBcEMsSUFBQSxHQUFBb0MsU0FBQSxDQUFBbkUsSUFBQTtVQUFBO1lBQUFtRSxTQUFBLENBQUFwQyxJQUFBO1lBQUFvQyxTQUFBLENBQUFuRSxJQUFBO1lBQUEsT0FHS29FLFVBQUUsQ0FBQ0MsT0FBTyxDQUFDQyxPQUFPLENBQUMsQ0FBQztVQUFBO1lBQTFDVixhQUFhLEdBQUFPLFNBQUEsQ0FBQTFCLElBQUE7WUFDbkJjLE9BQU8sQ0FBQ2dCLEdBQUcsQ0FBQ1gsYUFBYSxDQUFDNUUsTUFBTSxDQUFDO1lBQUM2RSxTQUFBLEdBQUF0RiwwQkFBQSxDQUNUcUYsYUFBYTtZQUFBTyxTQUFBLENBQUFwQyxJQUFBO1lBQUE4QixTQUFBLENBQUExRSxDQUFBO1VBQUE7WUFBQSxLQUFBMkUsS0FBQSxHQUFBRCxTQUFBLENBQUF6RSxDQUFBLElBQUFDLElBQUE7Y0FBQThFLFNBQUEsQ0FBQW5FLElBQUE7Y0FBQTtZQUFBO1lBQTdCK0QsWUFBWSxHQUFBRCxLQUFBLENBQUF4RSxLQUFBO1lBQ2IwRSxPQUFPLEdBQUdELFlBQVksQ0FBQ1MsS0FBSztZQUFBLEtBQzlCUixPQUFPO2NBQUFHLFNBQUEsQ0FBQW5FLElBQUE7Y0FBQTtZQUFBO1lBQ1Q7WUFDTWlFLE9BQU8sR0FBR0QsT0FBTyxDQUFDUyxPQUFPLENBQzdCLHNCQUFzQixFQUN0Qix1QkFDRixDQUFDLEVBRUQ7WUFDQVYsWUFBWSxDQUFDUyxLQUFLLEdBQUdQLE9BQU87WUFBQ0UsU0FBQSxDQUFBbkUsSUFBQTtZQUFBLE9BQ3ZCK0QsWUFBWSxDQUFDVyxJQUFJLENBQUMsQ0FBQztVQUFBO1lBQ3pCbkIsT0FBTyxDQUFDZ0IsR0FBRyxxQ0FBQXJCLE1BQUEsQ0FDU2EsWUFBWSxDQUFDWSxFQUFFLGVBQUF6QixNQUFBLENBQU9jLE9BQU8sWUFBQWQsTUFBQSxDQUFTZSxPQUFPLENBQ2pFLENBQUM7WUFDRDtVQUFBO1lBQUFFLFNBQUEsQ0FBQW5FLElBQUE7WUFBQTtVQUFBO1lBQUFtRSxTQUFBLENBQUFuRSxJQUFBO1lBQUE7VUFBQTtZQUFBbUUsU0FBQSxDQUFBcEMsSUFBQTtZQUFBb0MsU0FBQSxDQUFBYixFQUFBLEdBQUFhLFNBQUE7WUFBQU4sU0FBQSxDQUFBdEUsQ0FBQSxDQUFBNEUsU0FBQSxDQUFBYixFQUFBO1VBQUE7WUFBQWEsU0FBQSxDQUFBcEMsSUFBQTtZQUFBOEIsU0FBQSxDQUFBcEUsQ0FBQTtZQUFBLE9BQUEwRSxTQUFBLENBQUFTLE1BQUE7VUFBQTtZQUFBVCxTQUFBLENBQUFuRSxJQUFBO1lBQUE7VUFBQTtZQUFBbUUsU0FBQSxDQUFBcEMsSUFBQTtZQUFBb0MsU0FBQSxDQUFBVSxFQUFBLEdBQUFWLFNBQUE7WUFJSlosT0FBTyxDQUFDZ0IsR0FBRyxDQUFBSixTQUFBLENBQUFVLEVBQUksQ0FBQztZQUFDLE9BQUFWLFNBQUEsQ0FBQWxDLE1BQUEsV0FDVmYsR0FBRyxDQUFDbUMsSUFBSSxDQUFDO2NBQUV5QixFQUFFLEVBQUU7WUFBTSxDQUFDLENBQUM7VUFBQTtVQUFBO1lBQUEsT0FBQVgsU0FBQSxDQUFBVixJQUFBO1FBQUE7TUFBQSxHQUFBRSxRQUFBO0lBQUE7RUFFbEMsQ0FBQztFQUNLb0IsY0FBYyxXQUFBQSxlQUFDOUQsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUEyRCxTQUFBO01BQUEsSUFBQUMsZUFBQSxFQUFBQyxXQUFBLEVBQUFDLFlBQUE7TUFBQSxPQUFBL0QsWUFBQSxZQUFBUSxJQUFBLFVBQUF3RCxVQUFBQyxTQUFBO1FBQUEsa0JBQUFBLFNBQUEsQ0FBQXRELElBQUEsR0FBQXNELFNBQUEsQ0FBQXJGLElBQUE7VUFBQTtZQUFBcUYsU0FBQSxDQUFBdEQsSUFBQTtZQUkzQjtZQUNla0QsZUFBZTtjQUFBLElBQUFLLElBQUEsT0FBQW5FLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsQ0FBOUIsU0FBQWtFLFNBQStCQyxTQUFTLEVBQUVDLFVBQVU7Z0JBQUEsT0FBQXJFLFlBQUEsWUFBQVEsSUFBQSxVQUFBOEQsVUFBQUMsU0FBQTtrQkFBQSxrQkFBQUEsU0FBQSxDQUFBNUQsSUFBQSxHQUFBNEQsU0FBQSxDQUFBM0YsSUFBQTtvQkFBQTtzQkFBQTJGLFNBQUEsQ0FBQTVELElBQUE7c0JBQUE0RCxTQUFBLENBQUEzRixJQUFBO3NCQUFBLE9BRTFDLElBQUF1QyxpQkFBSyxFQUFDaUQsU0FBUyxDQUFDLENBQ25CSSxJQUFJLENBQUM7d0JBQUVqRCxPQUFPLEVBQUUsRUFBRTt3QkFBRUMsS0FBSyxFQUFFO3NCQUFLLENBQUMsQ0FBQyxDQUFDO3NCQUFBLENBQ25DQyxNQUFNLENBQUM7d0JBQUVDLEdBQUcsRUFBRSxRQUFRO3dCQUFFQyxLQUFLLEVBQUU7c0JBQUksQ0FBQyxDQUFDLENBQ3JDOEMsTUFBTSxDQUFDSixVQUFVLENBQUM7b0JBQUE7c0JBQ3JCbEMsT0FBTyxDQUFDZ0IsR0FBRywwQ0FBQXJCLE1BQUEsQ0FBbUJzQyxTQUFTLFVBQUF0QyxNQUFBLENBQU91QyxVQUFVLENBQUUsQ0FBQztzQkFBQ0UsU0FBQSxDQUFBM0YsSUFBQTtzQkFBQTtvQkFBQTtzQkFBQTJGLFNBQUEsQ0FBQTVELElBQUE7c0JBQUE0RCxTQUFBLENBQUFyQyxFQUFBLEdBQUFxQyxTQUFBO3NCQUU1RHBDLE9BQU8sQ0FBQ0MsS0FBSywyQ0FBQU4sTUFBQSxDQUF1QnNDLFNBQVMsUUFBQUcsU0FBQSxDQUFBckMsRUFBUSxDQUFDO29CQUFDO29CQUFBO3NCQUFBLE9BQUFxQyxTQUFBLENBQUFsQyxJQUFBO2tCQUFBO2dCQUFBLEdBQUE4QixRQUFBO2NBQUEsQ0FFMUQ7Y0FBQSxnQkFWY04sZUFBZUEsQ0FBQWEsRUFBQSxFQUFBQyxHQUFBO2dCQUFBLE9BQUFULElBQUEsQ0FBQVUsS0FBQSxPQUFBQyxTQUFBO2NBQUE7WUFBQSxLQVk5QjtZQWZNZixXQUFXLEdBQUc5QyxnQkFBSSxDQUFDQyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ3BDOEMsWUFBWSxHQUFHL0MsZ0JBQUksQ0FBQ0MsSUFBSSxDQUFDLGVBQWUsQ0FBQztZQWUvQ1csY0FBRSxDQUFDa0QsT0FBTyxDQUFDaEIsV0FBVyxFQUFFLFVBQUNyRixHQUFHLEVBQUVzRyxLQUFLLEVBQUs7Y0FDdEMsSUFBSXRHLEdBQUcsRUFBRTtnQkFDUCxPQUFPMEQsT0FBTyxDQUFDQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUzRCxHQUFHLENBQUM7Y0FDbkQ7O2NBRUE7Y0FDQXNHLEtBQUssQ0FBQ0MsT0FBTyxDQUFDLFVBQUNwRSxJQUFJLEVBQUs7Z0JBQ3RCLElBQU13RCxTQUFTLEdBQUdwRCxnQkFBSSxDQUFDQyxJQUFJLENBQUM2QyxXQUFXLEVBQUVsRCxJQUFJLENBQUM7Z0JBQzlDLElBQU15RCxVQUFVLEdBQUdyRCxnQkFBSSxDQUFDQyxJQUFJLENBQzFCOEMsWUFBWSxFQUNabkQsSUFBSSxDQUFDeUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQzdCLENBQUM7O2dCQUVEO2dCQUNBLElBQUlyQyxnQkFBSSxDQUFDaUUsT0FBTyxDQUFDckUsSUFBSSxDQUFDLENBQUNzRSxXQUFXLENBQUMsQ0FBQyxLQUFLLE1BQU0sRUFBRTtrQkFDL0NyQixlQUFlLENBQUNPLFNBQVMsRUFBRUMsVUFBVSxDQUFDO2dCQUN4QztjQUNGLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQztZQUFDSixTQUFBLENBQUFyRixJQUFBO1lBQUE7VUFBQTtZQUFBcUYsU0FBQSxDQUFBdEQsSUFBQTtZQUFBc0QsU0FBQSxDQUFBL0IsRUFBQSxHQUFBK0IsU0FBQTtZQUVIOUIsT0FBTyxDQUFDZ0IsR0FBRyxDQUFBYyxTQUFBLENBQUEvQixFQUFJLENBQUM7WUFBQyxPQUFBK0IsU0FBQSxDQUFBcEQsTUFBQSxXQUNWZixHQUFHLENBQUNtQyxJQUFJLENBQUM7Y0FBRXlCLEVBQUUsRUFBRTtZQUFNLENBQUMsQ0FBQztVQUFBO1VBQUE7WUFBQSxPQUFBTyxTQUFBLENBQUE1QixJQUFBO1FBQUE7TUFBQSxHQUFBdUIsUUFBQTtJQUFBO0VBRWxDLENBQUM7RUFDS3VCLGdCQUFnQixXQUFBQSxpQkFBQ3RGLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBQUEsV0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBbUYsU0FBQTtNQUFBLElBQUE1QyxhQUFBLEVBQUE2QyxVQUFBLEVBQUFDLE1BQUEsRUFBQTNDLFlBQUEsRUFBQUMsT0FBQSxFQUFBQyxPQUFBO01BQUEsT0FBQTdDLFlBQUEsWUFBQVEsSUFBQSxVQUFBK0UsVUFBQUMsU0FBQTtRQUFBLGtCQUFBQSxTQUFBLENBQUE3RSxJQUFBLEdBQUE2RSxTQUFBLENBQUE1RyxJQUFBO1VBQUE7WUFBQTRHLFNBQUEsQ0FBQTdFLElBQUE7WUFBQTZFLFNBQUEsQ0FBQTVHLElBQUE7WUFBQSxPQUtEb0UsVUFBRSxDQUFDeUMsWUFBWSxDQUFDdkMsT0FBTyxDQUFDO2NBQ2xEd0MsS0FBSyxFQUFFO2dCQUNMQyxNQUFNLE1BQUFDLGdCQUFBLGlCQUNIQyxvQkFBUyxDQUFDQyxFQUFFLENBQUNDLElBQUksRUFBRyw2QkFBNkI7Y0FFdEQ7WUFDRixDQUFDLENBQUM7VUFBQTtZQU5JdkQsYUFBYSxHQUFBZ0QsU0FBQSxDQUFBbkUsSUFBQTtZQUFBZ0UsVUFBQSxHQUFBbEksMEJBQUEsQ0FRTXFGLGFBQWE7WUFBQWdELFNBQUEsQ0FBQTdFLElBQUE7WUFBQTBFLFVBQUEsQ0FBQXRILENBQUE7VUFBQTtZQUFBLEtBQUF1SCxNQUFBLEdBQUFELFVBQUEsQ0FBQXJILENBQUEsSUFBQUMsSUFBQTtjQUFBdUgsU0FBQSxDQUFBNUcsSUFBQTtjQUFBO1lBQUE7WUFBN0IrRCxZQUFZLEdBQUEyQyxNQUFBLENBQUFwSCxLQUFBO1lBQ2IwRSxPQUFPLEdBQUdELFlBQVksQ0FBQ2dELE1BQU0sRUFFbkM7WUFDTTlDLE9BQU8sR0FBR0QsT0FBTyxDQUFDUyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUUvQztZQUNBVixZQUFZLENBQUNnRCxNQUFNLEdBQUc5QyxPQUFPO1lBQUMyQyxTQUFBLENBQUE1RyxJQUFBO1lBQUEsT0FDeEIrRCxZQUFZLENBQUNXLElBQUksQ0FBQyxDQUFDO1VBQUE7WUFDekJuQixPQUFPLENBQUNnQixHQUFHLHFDQUFBckIsTUFBQSxDQUNTYSxZQUFZLENBQUNZLEVBQUUsZUFBQXpCLE1BQUEsQ0FBT2MsT0FBTyxZQUFBZCxNQUFBLENBQVNlLE9BQU8sQ0FDakUsQ0FBQztVQUFDO1lBQUEyQyxTQUFBLENBQUE1RyxJQUFBO1lBQUE7VUFBQTtZQUFBNEcsU0FBQSxDQUFBNUcsSUFBQTtZQUFBO1VBQUE7WUFBQTRHLFNBQUEsQ0FBQTdFLElBQUE7WUFBQTZFLFNBQUEsQ0FBQXRELEVBQUEsR0FBQXNELFNBQUE7WUFBQUgsVUFBQSxDQUFBbEgsQ0FBQSxDQUFBcUgsU0FBQSxDQUFBdEQsRUFBQTtVQUFBO1lBQUFzRCxTQUFBLENBQUE3RSxJQUFBO1lBQUEwRSxVQUFBLENBQUFoSCxDQUFBO1lBQUEsT0FBQW1ILFNBQUEsQ0FBQWhDLE1BQUE7VUFBQTtZQUFBZ0MsU0FBQSxDQUFBNUcsSUFBQTtZQUFBO1VBQUE7WUFBQTRHLFNBQUEsQ0FBQTdFLElBQUE7WUFBQTZFLFNBQUEsQ0FBQS9CLEVBQUEsR0FBQStCLFNBQUE7WUFHSnJELE9BQU8sQ0FBQ0MsS0FBSyxDQUFDLGdCQUFnQixFQUFBb0QsU0FBQSxDQUFBL0IsRUFBSyxDQUFDO1VBQUM7VUFBQTtZQUFBLE9BQUErQixTQUFBLENBQUFuRCxJQUFBO1FBQUE7TUFBQSxHQUFBK0MsUUFBQTtJQUFBO0VBRXpDLENBQUM7RUFDS1ksaUJBQWlCLFdBQUFBLGtCQUFDbkcsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUFnRyxTQUFBO01BQUEsSUFBQXpELGFBQUEsRUFBQTBELFVBQUEsRUFBQUMsTUFBQSxFQUFBeEQsWUFBQSxFQUFBQyxPQUFBLEVBQUFDLE9BQUE7TUFBQSxPQUFBN0MsWUFBQSxZQUFBUSxJQUFBLFVBQUE0RixVQUFBQyxTQUFBO1FBQUEsa0JBQUFBLFNBQUEsQ0FBQTFGLElBQUEsR0FBQTBGLFNBQUEsQ0FBQXpILElBQUE7VUFBQTtZQUFBeUgsU0FBQSxDQUFBMUYsSUFBQTtZQUFBMEYsU0FBQSxDQUFBekgsSUFBQTtZQUFBLE9BS0ZvRSxVQUFFLENBQUNDLE9BQU8sQ0FBQ0MsT0FBTyxDQUFDO2NBQzdDd0MsS0FBSyxFQUFFO2dCQUNMdEMsS0FBSyxNQUFBd0MsZ0JBQUEsaUJBQ0ZDLG9CQUFTLENBQUNDLEVBQUUsQ0FBQ0MsSUFBSSxFQUFHLDZCQUE2QjtjQUV0RDtZQUNGLENBQUMsQ0FBQztVQUFBO1lBTkl2RCxhQUFhLEdBQUE2RCxTQUFBLENBQUFoRixJQUFBO1lBQUE2RSxVQUFBLEdBQUEvSSwwQkFBQSxDQVFNcUYsYUFBYTtZQUFBNkQsU0FBQSxDQUFBMUYsSUFBQTtZQUFBdUYsVUFBQSxDQUFBbkksQ0FBQTtVQUFBO1lBQUEsS0FBQW9JLE1BQUEsR0FBQUQsVUFBQSxDQUFBbEksQ0FBQSxJQUFBQyxJQUFBO2NBQUFvSSxTQUFBLENBQUF6SCxJQUFBO2NBQUE7WUFBQTtZQUE3QitELFlBQVksR0FBQXdELE1BQUEsQ0FBQWpJLEtBQUE7WUFDYjBFLE9BQU8sR0FBR0QsWUFBWSxDQUFDUyxLQUFLLEVBRWxDO1lBQ01QLE9BQU8sR0FBR0QsT0FBTyxDQUFDUyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUUvQztZQUNBVixZQUFZLENBQUNTLEtBQUssR0FBR1AsT0FBTztZQUFDd0QsU0FBQSxDQUFBekgsSUFBQTtZQUFBLE9BQ3ZCK0QsWUFBWSxDQUFDVyxJQUFJLENBQUMsQ0FBQztVQUFBO1lBQ3pCbkIsT0FBTyxDQUFDZ0IsR0FBRyxxQ0FBQXJCLE1BQUEsQ0FDU2EsWUFBWSxDQUFDWSxFQUFFLGVBQUF6QixNQUFBLENBQU9jLE9BQU8sWUFBQWQsTUFBQSxDQUFTZSxPQUFPLENBQ2pFLENBQUM7VUFBQztZQUFBd0QsU0FBQSxDQUFBekgsSUFBQTtZQUFBO1VBQUE7WUFBQXlILFNBQUEsQ0FBQXpILElBQUE7WUFBQTtVQUFBO1lBQUF5SCxTQUFBLENBQUExRixJQUFBO1lBQUEwRixTQUFBLENBQUFuRSxFQUFBLEdBQUFtRSxTQUFBO1lBQUFILFVBQUEsQ0FBQS9ILENBQUEsQ0FBQWtJLFNBQUEsQ0FBQW5FLEVBQUE7VUFBQTtZQUFBbUUsU0FBQSxDQUFBMUYsSUFBQTtZQUFBdUYsVUFBQSxDQUFBN0gsQ0FBQTtZQUFBLE9BQUFnSSxTQUFBLENBQUE3QyxNQUFBO1VBQUE7WUFBQTZDLFNBQUEsQ0FBQXpILElBQUE7WUFBQTtVQUFBO1lBQUF5SCxTQUFBLENBQUExRixJQUFBO1lBQUEwRixTQUFBLENBQUE1QyxFQUFBLEdBQUE0QyxTQUFBO1lBR0psRSxPQUFPLENBQUNDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBQWlFLFNBQUEsQ0FBQTVDLEVBQUssQ0FBQztVQUFDO1VBQUE7WUFBQSxPQUFBNEMsU0FBQSxDQUFBaEUsSUFBQTtRQUFBO01BQUEsR0FBQTRELFFBQUE7SUFBQTtFQUV6QztBQUNGLENBQUM7QUFBQUssT0FBQSxjQUFBM0csUUFBQSJ9