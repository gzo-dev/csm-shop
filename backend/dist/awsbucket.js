"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compressAndConvertToJpg = compressAndConvertToJpg;
exports.compressAndConvertToJpgSingle = compressAndConvertToJpgSingle;
exports["default"] = void 0;
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
function compressAndConvertToJpg(req, res, next) {
  if (!req.files || req.files.length === 0) {
    // Kiểm tra nếu không có tệp tin nào được tải lên
    return next();
  }
  var processedFiles = [];

  // Khai báo một biến đếm để theo dõi số lượng tệp tin đã xử lý
  var processedCount = 0;

  // Lặp qua mỗi tệp tin trong mảng req.files
  var _loop = function _loop(i) {
    var filePath = req.files[i].path;
    console.log(req.files[i]);

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
  };
  for (var i = 0; i < req.files.length; i++) {
    _loop(i);
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbXVsdGVyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfcGF0aCIsIl9zaGFycCIsIl9mcyIsInN0b3JhZ2UiLCJtdWx0ZXIiLCJkaXNrU3RvcmFnZSIsImRlc3RpbmF0aW9uIiwicmVxIiwiZmlsZSIsImNiIiwicGF0aCIsImpvaW4iLCJmaWxlbmFtZSIsInVuaXF1ZVN1ZmZpeCIsIkRhdGUiLCJub3ciLCJNYXRoIiwicm91bmQiLCJyYW5kb20iLCJmaWVsZG5hbWUiLCJleHRuYW1lIiwib3JpZ2luYWxuYW1lIiwidXBsb2FkIiwiY29tcHJlc3NBbmRDb252ZXJ0VG9KcGciLCJyZXMiLCJuZXh0IiwiZmlsZXMiLCJsZW5ndGgiLCJwcm9jZXNzZWRGaWxlcyIsInByb2Nlc3NlZENvdW50IiwiX2xvb3AiLCJpIiwiZmlsZVBhdGgiLCJjb25zb2xlIiwibG9nIiwiZmlsZU5hbWUiLCJmcyIsInJlYWRGaWxlIiwiZXJyIiwiZGF0YSIsInNoYXJwIiwianBlZyIsInF1YWxpdHkiLCJ0b0ZpbGUiLCJpbmZvIiwiY29tcHJlc3NBbmRDb252ZXJ0VG9KcGdTaW5nbGUiLCJyZXNpemUiLCJmaXQiLCJ3aWR0aCIsInByb3RvY29sIiwiZ2V0IiwiX2RlZmF1bHQiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vc3JjL2F3c2J1Y2tldC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbXVsdGVyIGZyb20gXCJtdWx0ZXJcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHNoYXJwIGZyb20gXCJzaGFycFwiO1xyXG5pbXBvcnQgZnMgZnJvbSBcImZzXCJcclxuXHJcbi8vIFRoaeG6v3QgbOG6rXAgbMawdSB0cuG7ryDEkeG7i2EgcGjGsMahbmdcclxuY29uc3Qgc3RvcmFnZSA9IG11bHRlci5kaXNrU3RvcmFnZSh7XHJcbiAgZGVzdGluYXRpb246IGZ1bmN0aW9uIChyZXEsIGZpbGUsIGNiKSB7XHJcbiAgICAvLyDEkMaw4budbmcgZOG6q24gxJHhur9uIHRoxrAgbeG7pWMgbMawdSB0cuG7r1xyXG4gICAgY2IobnVsbCwgcGF0aC5qb2luKFwidXBsb2FkX2F2YXRhcl9wcm9kdWN0XCIpKTtcclxuICB9LFxyXG4gIGZpbGVuYW1lOiBmdW5jdGlvbiAocmVxLCBmaWxlLCBjYikge1xyXG4gICAgLy8gVOG6oW8gdMOqbiB04buHcCBt4bubaSAoY8OzIHRo4buDIHTDuXkgY2jhu4luaCB0w7l5IHRoZW8gbmh1IGPhuqd1KVxyXG4gICAgY29uc3QgdW5pcXVlU3VmZml4ID0gRGF0ZS5ub3coKSArIFwiLVwiICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMWU5KTtcclxuICAgIGNiKFxyXG4gICAgICBudWxsLFxyXG4gICAgICBmaWxlLmZpZWxkbmFtZSArIFwiLVwiICsgdW5pcXVlU3VmZml4ICsgcGF0aC5leHRuYW1lKGZpbGUub3JpZ2luYWxuYW1lKVxyXG4gICAgKTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vIFRoaeG6v3QgbOG6rXAgbWlkZGxld2FyZSB1cGxvYWRcclxuY29uc3QgdXBsb2FkID0gbXVsdGVyKHsgc3RvcmFnZTogc3RvcmFnZSB9KTtcclxuXHJcbi8vIE1pZGRsZXdhcmUgxJHhu4MgbsOpbiDhuqNuaCB2w6AgY2h1eeG7g24gxJHhu5VpIHNhbmcgSlBHXHJcbmZ1bmN0aW9uIGNvbXByZXNzQW5kQ29udmVydFRvSnBnKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgaWYgKCFyZXEuZmlsZXMgfHwgcmVxLmZpbGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgLy8gS2nhu4NtIHRyYSBu4bq/dSBraMO0bmcgY8OzIHThu4dwIHRpbiBuw6BvIMSRxrDhu6NjIHThuqNpIGzDqm5cclxuICAgIHJldHVybiBuZXh0KCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBwcm9jZXNzZWRGaWxlcyA9IFtdO1xyXG5cclxuICAvLyBLaGFpIGLDoW8gbeG7mXQgYmnhur9uIMSR4bq/bSDEkeG7gyB0aGVvIGTDtWkgc+G7kSBsxrDhu6NuZyB04buHcCB0aW4gxJHDoyB44butIGzDvVxyXG4gIGxldCBwcm9jZXNzZWRDb3VudCA9IDA7XHJcblxyXG4gIC8vIEzhurdwIHF1YSBt4buXaSB04buHcCB0aW4gdHJvbmcgbeG6o25nIHJlcS5maWxlc1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmVxLmZpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBmaWxlUGF0aCA9IHJlcS5maWxlc1tpXS5wYXRoO1xyXG4gICAgY29uc29sZS5sb2cocmVxLmZpbGVzW2ldKTtcclxuXHJcbiAgICAvLyBU4bqhbyB0w6puIHThu4dwIHRpbiBt4bubaVxyXG4gICAgY29uc3QgZmlsZU5hbWUgPVxyXG4gICAgICBEYXRlLm5vdygpICsgXCItXCIgKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxZTkpICsgXCIuanBnXCI7XHJcblxyXG4gICAgLy8gxJDhu41jIG7hu5lpIGR1bmcgY+G7p2EgdOG7h3AgdGluIHThu6sgxJHGsOG7nW5nIGThuqtuXHJcbiAgICBmcy5yZWFkRmlsZShmaWxlUGF0aCwgKGVyciwgZGF0YSkgPT4ge1xyXG4gICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgLy8gWOG7rSBsw70gbOG7l2kga2hpIGtow7RuZyB0aOG7gyDEkeG7jWMgdOG7h3AgdGluXHJcbiAgICAgICAgcmV0dXJuIG5leHQoZXJyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gU+G7rSBk4bulbmcgU2hhcnAgxJHhu4MgbsOpbiDhuqNuaCB2w6AgY2h1eeG7g24gxJHhu5VpIHNhbmcgxJHhu4tuaCBk4bqhbmcgSlBHXHJcbiAgICAgIHNoYXJwKGRhdGEpXHJcbiAgICAgICAgLmpwZWcoeyBxdWFsaXR5OiA4MCB9KSAvLyBUaGnhur90IGzhuq1wIGNo4bqldCBsxrDhu6NuZyBKUEVHXHJcbiAgICAgICAgLnRvRmlsZShwYXRoLmpvaW4oXCJ1cGxvYWRfYXZhdGFyX3Byb2R1Y3RcIiwgZmlsZU5hbWUpLCAoZXJyLCBpbmZvKSA9PiB7XHJcbiAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXh0KGVycik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyBUxINuZyBiaeG6v24gxJHhur9tXHJcbiAgICAgICAgICBwcm9jZXNzZWRDb3VudCsrO1xyXG4gICAgICAgICAgLy8gS2nhu4NtIHRyYSB4ZW0gxJHDoyB44butIGzDvSBo4bq/dCB04bqldCBj4bqjIGPDoWMgdOG7h3AgdGluIGNoxrBhLCBu4bq/dSDEkcOjIHjhu60gbMO9IGjhur90IHRow6wgZ+G7jWkgaMOgbSBuZXh0XHJcbiAgICAgICAgICBpZiAocHJvY2Vzc2VkQ291bnQgPT09IHJlcS5maWxlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmVxLmZpbGVzW2ldLmZpbGVuYW1lID0gZmlsZU5hbWU7XHJcbiAgICAgICAgICAgIHJlcS5maWxlc1tpXS5wYXRoID0gZmlsZU5hbWU7XHJcbiAgICAgICAgICAgIG5leHQoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY29tcHJlc3NBbmRDb252ZXJ0VG9KcGdTaW5nbGUocmVxLCByZXMsIG5leHQpIHtcclxuICBpZiAoIXJlcS5maWxlKSB7XHJcbiAgICAvLyBLaeG7g20gdHJhIG7hur91IGtow7RuZyBjw7MgdOG7h3AgdGluIG7DoG8gxJHGsOG7o2MgdOG6o2kgbMOqblxyXG4gICAgcmV0dXJuIG5leHQoKTtcclxuICB9XHJcblxyXG4gIC8vIEzhuqV5IMSRxrDhu51uZyBk4bqrbiDEkeG6v24gdOG7h3AgdGluXHJcbiAgY29uc3QgZmlsZVBhdGggPSByZXEuZmlsZS5wYXRoO1xyXG5cclxuICAvLyBU4bqhbyB0w6puIHThu4dwIHRpbiBt4bubaVxyXG4gIGNvbnN0IGZpbGVOYW1lID1cclxuICAgIERhdGUubm93KCkgKyBcIi1cIiArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDFlOSkgKyBcIi5qcGdcIjtcclxuXHJcbiAgLy8gxJDhu41jIG7hu5lpIGR1bmcgY+G7p2EgdOG7h3AgdGluIHThu6sgxJHGsOG7nW5nIGThuqtuXHJcbiAgZnMucmVhZEZpbGUoZmlsZVBhdGgsIChlcnIsIGRhdGEpID0+IHtcclxuICAgIGlmIChlcnIpIHtcclxuICAgICAgLy8gWOG7rSBsw70gbOG7l2kga2hpIGtow7RuZyB0aOG7gyDEkeG7jWMgdOG7h3AgdGluXHJcbiAgICAgIHJldHVybiBuZXh0KGVycik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU+G7rSBk4bulbmcgU2hhcnAgxJHhu4MgbsOpbiDhuqNuaCB2w6AgY2h1eeG7g24gxJHhu5VpIHNhbmcgxJHhu4tuaCBk4bqhbmcgSlBHXHJcbiAgICBzaGFycChkYXRhKVxyXG4gICAgICAuanBlZyh7IHF1YWxpdHk6IDgwIH0pIC8vIFRoaeG6v3QgbOG6rXAgY2jhuqV0IGzGsOG7o25nIEpQRUdcclxuICAgICAgLnJlc2l6ZSh7IGZpdDogXCJpbnNpZGVcIiwgd2lkdGg6IDcyMCB9KVxyXG4gICAgICAudG9GaWxlKHBhdGguam9pbihcInVwbG9hZF9hdmF0YXJfcHJvZHVjdFwiLCBmaWxlTmFtZSksIChlcnIsIGluZm8pID0+IHtcclxuICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICByZXR1cm4gbmV4dChlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBHw6FuIHTDqm4gdOG7h3AgdGluIG3hu5tpIHbDoCDEkcaw4budbmcgZOG6q24gY2hvIHJlcS5maWxlXHJcbiAgICAgICAgcmVxLmZpbGUuZmlsZW5hbWUgPSBmaWxlTmFtZTtcclxuICAgICAgICByZXEuZmlsZS5wYXRoID0gcmVxLnByb3RvY29sICsgXCI6Ly9cIiArIHJlcS5nZXQoXCJob3N0XCIpICsgXCIvXCIgKyBmaWxlTmFtZTtcclxuICAgICAgICAvLyBH4buNaSBow6BtIG5leHQgxJHhu4MgdGnhur9wIHThu6VjIG1pZGRsZXdhcmUgdGnhur9wIHRoZW9cclxuICAgICAgICBuZXh0KCk7XHJcbiAgICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB1cGxvYWQ7XHJcbmV4cG9ydCB7IGNvbXByZXNzQW5kQ29udmVydFRvSnBnLCBjb21wcmVzc0FuZENvbnZlcnRUb0pwZ1NpbmdsZSB9O1xyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLElBQUFBLE9BQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFDLEtBQUEsR0FBQUYsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFFLE1BQUEsR0FBQUgsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFHLEdBQUEsR0FBQUosc0JBQUEsQ0FBQUMsT0FBQTtBQUVBO0FBQ0EsSUFBTUksT0FBTyxHQUFHQyxrQkFBTSxDQUFDQyxXQUFXLENBQUM7RUFDakNDLFdBQVcsRUFBRSxTQUFBQSxZQUFVQyxHQUFHLEVBQUVDLElBQUksRUFBRUMsRUFBRSxFQUFFO0lBQ3BDO0lBQ0FBLEVBQUUsQ0FBQyxJQUFJLEVBQUVDLGdCQUFJLENBQUNDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0VBQzlDLENBQUM7RUFDREMsUUFBUSxFQUFFLFNBQUFBLFNBQVVMLEdBQUcsRUFBRUMsSUFBSSxFQUFFQyxFQUFFLEVBQUU7SUFDakM7SUFDQSxJQUFNSSxZQUFZLEdBQUdDLElBQUksQ0FBQ0MsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ3ZFVCxFQUFFLENBQ0EsSUFBSSxFQUNKRCxJQUFJLENBQUNXLFNBQVMsR0FBRyxHQUFHLEdBQUdOLFlBQVksR0FBR0gsZ0JBQUksQ0FBQ1UsT0FBTyxDQUFDWixJQUFJLENBQUNhLFlBQVksQ0FDdEUsQ0FBQztFQUNIO0FBQ0YsQ0FBQyxDQUFDOztBQUVGO0FBQ0EsSUFBTUMsTUFBTSxHQUFHLElBQUFsQixrQkFBTSxFQUFDO0VBQUVELE9BQU8s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