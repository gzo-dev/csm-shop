const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Middleware để chuyển đổi WebP sang JPEG
const convertWebPToJpeg = async (req, res, next) => {
  try {
    // Kiểm tra nếu req.file không tồn tại
    if (!req.file) {
      console.log('File không tồn tại trong request.');
      return next();
    }


    const file = req.file;
    const originalName = file.originalname;
    const filePath = file.path;

    // Kiểm tra nếu file là định dạng webp
    if (path.extname(originalName).toLowerCase() === '.webp') {
      const buffer = fs.readFileSync(filePath);
      // Sử dụng sharp để chuyển đổi định dạng
      const jpegBuffer = await sharp(buffer).jpeg().toBuffer();

      // Cập nhật lại file trong request
      req.file.buffer = jpegBuffer;
      req.file.originalname = originalName.replace(/\.webp$/, '.jpg');
      req.file.mimetype = 'image/jpeg';
    }

    next();
  } catch (error) {
    console.error('Error in converting image:', error);
    res.status(500).send('Error in converting image');
  }
};

module.exports = convertWebPToJpeg;
