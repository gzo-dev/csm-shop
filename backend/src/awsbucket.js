import multer from "multer";
import path from "path";
import sharp from "sharp";
import fs from "fs"

// Thiết lập lưu trữ địa phương
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Đường dẫn đến thư mục lưu trữ
    cb(null, path.join("upload_avatar_product"));
  },
  filename: function (req, file, cb) {
    // Tạo tên tệp mới (có thể tùy chỉnh tùy theo nhu cầu)
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Thiết lập middleware upload
const upload = multer({ storage: storage });


// Middleware để nén ảnh và chuyển đổi sang JPG
async function compressAndConvertToJpg(req, res, next) {
  if (!req.files || req.files.length === 0) {
    // Kiểm tra nếu không có tệp tin nào được tải lên
    return next(); // Thêm return để ngăn chặn việc thực hiện mã sau đó
  }

  try {
    const processedFiles = [];

    // Lặp qua mỗi tệp tin trong mảng req.files
    for (let i = 0; i < req.files.length; i++) {
      const filePath = req.files[i].path;
      // Tạo tên tệp tin mới
      const fileName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg";
      const outputFilePath = path.join("upload_avatar_product", fileName);

      // Sử dụng Sharp để nén ảnh và chuyển đổi sang định dạng JPG
      await sharp(filePath)
        .jpeg({ quality: 90 }) // Thiết lập chất lượng JPEG
        .toFile(outputFilePath);

      // Cập nhật thông tin tệp tin đã xử lý
      processedFiles.push({
        ...req.files[i],
        filename: fileName,
        path: outputFilePath,
      });
    }

    // Cập nhật req.files với thông tin các tệp tin đã được xử lý
    req.files = processedFiles;

    // Tiếp tục xử lý request
    next();
  } catch (err) {
    console.error("Error processing images:", err);
    next(err); // Gọi next với lỗi nếu có lỗi xảy ra
  }
}


function compressAndConvertToJpgSingle(req, res, next) {
  if (!req.file) {
    // Kiểm tra nếu không có tệp tin nào được tải lên
    return next();
  }

  // Lấy đường dẫn đến tệp tin
  const filePath = req.file.path;

  // Tạo tên tệp tin mới
  const fileName =
    Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg";

  // Đọc nội dung của tệp tin từ đường dẫn
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Xử lý lỗi khi không thể đọc tệp tin
      return next(err);
    }

    // Sử dụng Sharp để nén ảnh và chuyển đổi sang định dạng JPG
    sharp(data)
      .jpeg({ quality: 80 }) // Thiết lập chất lượng JPEG
      .resize({ fit: "inside", width: 720 })
      .toFile(path.join("upload_avatar_product", fileName), (err, info) => {
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

export default upload;
export { compressAndConvertToJpg, compressAndConvertToJpgSingle };
