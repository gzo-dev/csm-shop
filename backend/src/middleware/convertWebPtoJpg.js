const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');


// Middleware để chuyển đổi WebP sang JPEG
const convertWebPToJpeg = async (req, res, next) => {
  try {
    console.log("req.file.mimetype", req.file.mimetype)
    if (!req.file) {
      return next();
    }

    const file = req.file;
    const originalName = file.originalname;
    const filePath = file.path;
    
    // Kiểm tra nếu file là định dạng webp
    if (path.extname(originalName).toLowerCase() === '.webp') {
      const buffer = fs.readFileSync(filePath);
      // Sử dụng sharp để chuyển đổi định dạng
      const jpegBuffer = await sharp(buffer).png().toBuffer();
      
      // Cập nhật lại file trong request
      req.file.buffer = jpegBuffer;
      req.file.originalname = originalName.replace(/\.webp$/, '.png');
      req.file.mimetype = 'image/jpeg';
      req.file.path= req.file.path
    }

    next();
  } catch (error) {
    console.error('Error in converting image:', error);
    res.status(500).send('Error in converting image');
  }
};

export default convertWebPToJpeg