import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const convertToPng = (req, res, next) => {
    if (req.file) {
        const originalPath = req.file.path;
        const pngPath = path.join('uploads', path.basename(originalPath, path.extname(originalPath)) + '.png');

        sharp(originalPath)
            .toFormat('png')
            .toFile(pngPath, (err, info) => {
                if (err) {
                    return next(err);
                }
                // Xóa tệp gốc nếu cần
                fs.unlink(originalPath, (err) => {
                    if (err) {
                        return next(err);
                    }
                    // Cập nhật req.file để sử dụng ảnh PNG
                    req.file.path = pngPath;
                    req.file.filename = path.basename(pngPath);
                    next();
                });
            });
    } else {
        next();
    }
};

export default convertToPng