"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compressAndConvertToJpg = compressAndConvertToJpg;
exports.compressAndConvertToJpgSingle = compressAndConvertToJpgSingle;
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var _sharp = _interopRequireDefault(require("sharp"));
var _fs = _interopRequireDefault(require("fs"));
// Thiết lập lưu trữ địa phương
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    // Đường dẫn đến thư mục lưu trữ
    cb(null, _path["default"].join("upload_avatar_product"));
  },
  filename: function filename(req, file, cb) {
    // Tạo tên tệp mới (có thể tùy chỉnh tùy theo nhu cầu)
    var uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + _path["default"].extname(file.originalname));
  }
});

// Thiết lập middleware upload
var upload = (0, _multer["default"])({
  storage: storage
});

// Middleware để nén ảnh và chuyển đổi sang JPG
function compressAndConvertToJpg(_x, _x2, _x3) {
  return _compressAndConvertToJpg.apply(this, arguments);
}
function _compressAndConvertToJpg() {
  _compressAndConvertToJpg = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var processedFiles, processedCount, _loop, i;
    return _regenerator["default"].wrap(function _callee$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!(!req.files || req.files.length === 0)) {
            _context2.next = 2;
            break;
          }
          return _context2.abrupt("return", next());
        case 2:
          processedFiles = []; // Khai báo một biến đếm để theo dõi số lượng tệp tin đã xử lý
          processedCount = 0; // Lặp qua mỗi tệp tin trong mảng req.files
          _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop(i) {
            var filePath, fileName;
            return _regenerator["default"].wrap(function _loop$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  filePath = req.files[i].path; // Tạo tên tệp tin mới
                  fileName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg"; // Đọc nội dung của tệp tin từ đường dẫn
                  _fs["default"].readFile(filePath, function (err, data) {
                    if (err) {
                      // Xử lý lỗi khi không thể đọc tệp tin
                      return next(err);
                    }

                    // Sử dụng Sharp để nén ảnh và chuyển đổi sang định dạng JPG
                    (0, _sharp["default"])(data).png({
                      quality: 90
                    }) // Thiết lập chất lượng JPEG
                    .toFile(_path["default"].join("upload_avatar_product", fileName), function (err, info) {
                      if (err) {
                        return next(err);
                      }
                      // Tăng biến đếm
                      processedCount++;
                      // Kiểm tra xem đã xử lý hết tất cả các tệp tin chưa, nếu đã xử lý hết thì gọi hàm next
                      if (processedCount === req.files.length) {
                        req.files[i].filename = fileName;
                        req.files[i].path = fileName;
                        next();
                      }
                    });
                  });
                case 3:
                case "end":
                  return _context.stop();
              }
            }, _loop);
          });
          i = 0;
        case 6:
          if (!(i < req.files.length)) {
            _context2.next = 11;
            break;
          }
          return _context2.delegateYield(_loop(i), "t0", 8);
        case 8:
          i++;
          _context2.next = 6;
          break;
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee);
  }));
  return _compressAndConvertToJpg.apply(this, arguments);
}
function compressAndConvertToJpgSingle(req, res, next) {
  if (!req.file) {
    // Kiểm tra nếu không có tệp tin nào được tải lên
    return next();
  }

  // Lấy đường dẫn đến tệp tin
  var filePath = req.file.path;

  // Tạo tên tệp tin mới
  var fileName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg";

  // Đọc nội dung của tệp tin từ đường dẫn
  _fs["default"].readFile(filePath, function (err, data) {
    if (err) {
      // Xử lý lỗi khi không thể đọc tệp tin
      return next(err);
    }

    // Sử dụng Sharp để nén ảnh và chuyển đổi sang định dạng JPG
    (0, _sharp["default"])(data).jpeg({
      quality: 80
    }) // Thiết lập chất lượng JPEG
    .resize({
      fit: "inside",
      width: 720
    }).toFile(_path["default"].join("upload_avatar_product", fileName), function (err, info) {
      if (err) {
        return next(err);
      }
      // Gán tên tệp tin mới và đường dẫn cho req.file
      req.file.filename = fileName;
      req.file.path = req.protocol + "://" + req.get("host") + "/" + fileName;
      // Gọi hàm next để tiếp tục middleware tiếp theo
      next();
    });
  });
}
var _default = upload;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbXVsdGVyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfcGF0aCIsIl9zaGFycCIsIl9mcyIsInN0b3JhZ2UiLCJtdWx0ZXIiLCJkaXNrU3RvcmFnZSIsImRlc3RpbmF0aW9uIiwicmVxIiwiZmlsZSIsImNiIiwicGF0aCIsImpvaW4iLCJmaWxlbmFtZSIsInVuaXF1ZVN1ZmZpeCIsIkRhdGUiLCJub3ciLCJNYXRoIiwicm91bmQiLCJyYW5kb20iLCJmaWVsZG5hbWUiLCJleHRuYW1lIiwib3JpZ2luYWxuYW1lIiwidXBsb2FkIiwiY29tcHJlc3NBbmRDb252ZXJ0VG9KcGciLCJfeCIsIl94MiIsIl94MyIsIl9jb21wcmVzc0FuZENvbnZlcnRUb0pwZyIsImFwcGx5IiwiYXJndW1lbnRzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJyZXMiLCJuZXh0IiwicHJvY2Vzc2VkRmlsZXMiLCJwcm9jZXNzZWRDb3VudCIsIl9sb29wIiwiaSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0MiIsInByZXYiLCJmaWxlcyIsImxlbmd0aCIsImFicnVwdCIsImZpbGVQYXRoIiwiZmlsZU5hbWUiLCJfbG9vcCQiLCJfY29udGV4dCIsImZzIiwicmVhZEZpbGUiLCJlcnIiLCJkYXRhIiwic2hhcnAiLCJwbmciLCJxdWFsaXR5IiwidG9GaWxlIiwiaW5mbyIsInN0b3AiLCJkZWxlZ2F0ZVlpZWxkIiwiY29tcHJlc3NBbmRDb252ZXJ0VG9KcGdTaW5nbGUiLCJqcGVnIiwicmVzaXplIiwiZml0Iiwid2lkdGgiLCJwcm90b2NvbCIsImdldCIsIl9kZWZhdWx0IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uL3NyYy9hd3NidWNrZXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG11bHRlciBmcm9tIFwibXVsdGVyXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCBzaGFycCBmcm9tIFwic2hhcnBcIjtcclxuaW1wb3J0IGZzIGZyb20gXCJmc1wiXHJcblxyXG4vLyBUaGnhur90IGzhuq1wIGzGsHUgdHLhu68gxJHhu4thIHBoxrDGoW5nXHJcbmNvbnN0IHN0b3JhZ2UgPSBtdWx0ZXIuZGlza1N0b3JhZ2Uoe1xyXG4gIGRlc3RpbmF0aW9uOiBmdW5jdGlvbiAocmVxLCBmaWxlLCBjYikge1xyXG4gICAgLy8gxJDGsOG7nW5nIGThuqtuIMSR4bq/biB0aMawIG3hu6VjIGzGsHUgdHLhu69cclxuICAgIGNiKG51bGwsIHBhdGguam9pbihcInVwbG9hZF9hdmF0YXJfcHJvZHVjdFwiKSk7XHJcbiAgfSxcclxuICBmaWxlbmFtZTogZnVuY3Rpb24gKHJlcSwgZmlsZSwgY2IpIHtcclxuICAgIC8vIFThuqFvIHTDqm4gdOG7h3AgbeG7m2kgKGPDsyB0aOG7gyB0w7l5IGNo4buJbmggdMO5eSB0aGVvIG5odSBj4bqndSlcclxuICAgIGNvbnN0IHVuaXF1ZVN1ZmZpeCA9IERhdGUubm93KCkgKyBcIi1cIiArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDFlOSk7XHJcbiAgICBjYihcclxuICAgICAgbnVsbCxcclxuICAgICAgZmlsZS5maWVsZG5hbWUgKyBcIi1cIiArIHVuaXF1ZVN1ZmZpeCArIHBhdGguZXh0bmFtZShmaWxlLm9yaWdpbmFsbmFtZSlcclxuICAgICk7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLyBUaGnhur90IGzhuq1wIG1pZGRsZXdhcmUgdXBsb2FkXHJcbmNvbnN0IHVwbG9hZCA9IG11bHRlcih7IHN0b3JhZ2U6IHN0b3JhZ2UgfSk7XHJcblxyXG4vLyBNaWRkbGV3YXJlIMSR4buDIG7DqW4g4bqjbmggdsOgIGNodXnhu4NuIMSR4buVaSBzYW5nIEpQR1xyXG5hc3luYyBmdW5jdGlvbiBjb21wcmVzc0FuZENvbnZlcnRUb0pwZyhyZXEsIHJlcywgbmV4dCkge1xyXG4gIGlmICghcmVxLmZpbGVzIHx8IHJlcS5maWxlcy5sZW5ndGggPT09IDApIHtcclxuICAgIC8vIEtp4buDbSB0cmEgbuG6v3Uga2jDtG5nIGPDsyB04buHcCB0aW4gbsOgbyDEkcaw4bujYyB04bqjaSBsw6puXHJcbiAgICByZXR1cm4gbmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcHJvY2Vzc2VkRmlsZXMgPSBbXTtcclxuXHJcbiAgLy8gS2hhaSBiw6FvIG3hu5l0IGJp4bq/biDEkeG6v20gxJHhu4MgdGhlbyBkw7VpIHPhu5EgbMaw4bujbmcgdOG7h3AgdGluIMSRw6MgeOG7rSBsw71cclxuICBsZXQgcHJvY2Vzc2VkQ291bnQgPSAwO1xyXG5cclxuICAvLyBM4bq3cCBxdWEgbeG7l2kgdOG7h3AgdGluIHRyb25nIG3huqNuZyByZXEuZmlsZXNcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHJlcS5maWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgZmlsZVBhdGggPSByZXEuZmlsZXNbaV0ucGF0aDtcclxuICAgIC8vIFThuqFvIHTDqm4gdOG7h3AgdGluIG3hu5tpXHJcbiAgICBjb25zdCBmaWxlTmFtZSA9XHJcbiAgICAgIERhdGUubm93KCkgKyBcIi1cIiArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDFlOSkgKyBcIi5qcGdcIjtcclxuXHJcbiAgICAvLyDEkOG7jWMgbuG7mWkgZHVuZyBj4bunYSB04buHcCB0aW4gdOG7qyDEkcaw4budbmcgZOG6q25cclxuICAgIGZzLnJlYWRGaWxlKGZpbGVQYXRoLCAoZXJyLCBkYXRhKSA9PiB7XHJcbiAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAvLyBY4butIGzDvSBs4buXaSBraGkga2jDtG5nIHRo4buDIMSR4buNYyB04buHcCB0aW5cclxuICAgICAgICByZXR1cm4gbmV4dChlcnIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBT4butIGThu6VuZyBTaGFycCDEkeG7gyBuw6luIOG6o25oIHbDoCBjaHV54buDbiDEkeG7lWkgc2FuZyDEkeG7i25oIGThuqFuZyBKUEdcclxuICAgICAgc2hhcnAoZGF0YSlcclxuICAgICAgICAucG5nKHsgcXVhbGl0eTogOTAgfSkgLy8gVGhp4bq/dCBs4bqtcCBjaOG6pXQgbMaw4bujbmcgSlBFR1xyXG4gICAgICAgIC50b0ZpbGUocGF0aC5qb2luKFwidXBsb2FkX2F2YXRhcl9wcm9kdWN0XCIsIGZpbGVOYW1lKSwgKGVyciwgaW5mbykgPT4ge1xyXG4gICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV4dChlcnIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8gVMSDbmcgYmnhur9uIMSR4bq/bVxyXG4gICAgICAgICAgcHJvY2Vzc2VkQ291bnQrKztcclxuICAgICAgICAgIC8vIEtp4buDbSB0cmEgeGVtIMSRw6MgeOG7rSBsw70gaOG6v3QgdOG6pXQgY+G6oyBjw6FjIHThu4dwIHRpbiBjaMawYSwgbuG6v3UgxJHDoyB44butIGzDvSBo4bq/dCB0aMOsIGfhu41pIGjDoG0gbmV4dFxyXG4gICAgICAgICAgaWYgKHByb2Nlc3NlZENvdW50ID09PSByZXEuZmlsZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJlcS5maWxlc1tpXS5maWxlbmFtZSA9IGZpbGVOYW1lO1xyXG4gICAgICAgICAgICByZXEuZmlsZXNbaV0ucGF0aCA9IGZpbGVOYW1lO1xyXG4gICAgICAgICAgICBuZXh0KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXByZXNzQW5kQ29udmVydFRvSnBnU2luZ2xlKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgaWYgKCFyZXEuZmlsZSkge1xyXG4gICAgLy8gS2nhu4NtIHRyYSBu4bq/dSBraMO0bmcgY8OzIHThu4dwIHRpbiBuw6BvIMSRxrDhu6NjIHThuqNpIGzDqm5cclxuICAgIHJldHVybiBuZXh0KCk7XHJcbiAgfVxyXG5cclxuICAvLyBM4bqleSDEkcaw4budbmcgZOG6q24gxJHhur9uIHThu4dwIHRpblxyXG4gIGNvbnN0IGZpbGVQYXRoID0gcmVxLmZpbGUucGF0aDtcclxuXHJcbiAgLy8gVOG6oW8gdMOqbiB04buHcCB0aW4gbeG7m2lcclxuICBjb25zdCBmaWxlTmFtZSA9XHJcbiAgICBEYXRlLm5vdygpICsgXCItXCIgKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxZTkpICsgXCIuanBnXCI7XHJcblxyXG4gIC8vIMSQ4buNYyBu4buZaSBkdW5nIGPhu6dhIHThu4dwIHRpbiB04burIMSRxrDhu51uZyBk4bqrblxyXG4gIGZzLnJlYWRGaWxlKGZpbGVQYXRoLCAoZXJyLCBkYXRhKSA9PiB7XHJcbiAgICBpZiAoZXJyKSB7XHJcbiAgICAgIC8vIFjhu60gbMO9IGzhu5dpIGtoaSBraMO0bmcgdGjhu4MgxJHhu41jIHThu4dwIHRpblxyXG4gICAgICByZXR1cm4gbmV4dChlcnIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFPhu60gZOG7pW5nIFNoYXJwIMSR4buDIG7DqW4g4bqjbmggdsOgIGNodXnhu4NuIMSR4buVaSBzYW5nIMSR4buLbmggZOG6oW5nIEpQR1xyXG4gICAgc2hhcnAoZGF0YSlcclxuICAgICAgLmpwZWcoeyBxdWFsaXR5OiA4MCB9KSAvLyBUaGnhur90IGzhuq1wIGNo4bqldCBsxrDhu6NuZyBKUEVHXHJcbiAgICAgIC5yZXNpemUoeyBmaXQ6IFwiaW5zaWRlXCIsIHdpZHRoOiA3MjAgfSlcclxuICAgICAgLnRvRmlsZShwYXRoLmpvaW4oXCJ1cGxvYWRfYXZhdGFyX3Byb2R1Y3RcIiwgZmlsZU5hbWUpLCAoZXJyLCBpbmZvKSA9PiB7XHJcbiAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgcmV0dXJuIG5leHQoZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gR8OhbiB0w6puIHThu4dwIHRpbiBt4bubaSB2w6AgxJHGsOG7nW5nIGThuqtuIGNobyByZXEuZmlsZVxyXG4gICAgICAgIHJlcS5maWxlLmZpbGVuYW1lID0gZmlsZU5hbWU7XHJcbiAgICAgICAgcmVxLmZpbGUucGF0aCA9IHJlcS5wcm90b2NvbCArIFwiOi8vXCIgKyByZXEuZ2V0KFwiaG9zdFwiKSArIFwiL1wiICsgZmlsZU5hbWU7XHJcbiAgICAgICAgLy8gR+G7jWkgaMOgbSBuZXh0IMSR4buDIHRp4bq/cCB04bulYyBtaWRkbGV3YXJlIHRp4bq/cCB0aGVvXHJcbiAgICAgICAgbmV4dCgpO1xyXG4gICAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXBsb2FkO1xyXG5leHBvcnQgeyBjb21wcmVzc0FuZENvbnZlcnRUb0pwZywgY29tcHJlc3NBbmRDb252ZXJ0VG9KcGdTaW5nbGUgfTtcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLElBQUFBLE9BQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFDLEtBQUEsR0FBQUYsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFFLE1BQUEsR0FBQUgsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFHLEdBQUEsR0FBQUosc0JBQUEsQ0FBQUMsT0FBQTtBQUVBO0FBQ0EsSUFBTUksT0FBTyxHQUFHQyxrQkFBTSxDQUFDQyxXQUFXLENBQUM7RUFDakNDLFdBQVcsRUFBRSxTQUFBQSxZQUFVQyxHQUFHLEVBQUVDLElBQUksRUFBRUMsRUFBRSxFQUFFO0lBQ3BDO0lBQ0FBLEVBQUUsQ0FBQyxJQUFJLEVBQUVDLGdCQUFJLENBQUNDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0VBQzlDLENBQUM7RUFDREMsUUFBUSxFQUFFLFNBQUFBLFNBQVVMLEdBQUcsRUFBRUMsSUFBSSxFQUFFQyxFQUFFLEVBQUU7SUFDakM7SUFDQSxJQUFNSSxZQUFZLEdBQUdDLElBQUksQ0FBQ0MsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ3ZFVCxFQUFFLENBQ0EsSUFBSSxFQUNKRCxJQUFJ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