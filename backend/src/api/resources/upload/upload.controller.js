import fs from "fs"
import sharp from "sharp";
import path from "path"

export default {
  async uploadImage(req, res) {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
      const uploadDir = path.join('x_image_blog');
      // Đường dẫn tuyệt đối của ảnh đã upload
      const imagePath = path.join(uploadDir, req.file.filename);
    
      try {
        // Đọc ảnh vào bằng thư viện sharp
        const imageBuffer = await sharp(imagePath).toBuffer();
        
        // Nén ảnh với chất lượng 70% và dung lượng tối đa 100kb
        const compressedImageBuffer = await sharp(imageBuffer).webp({ quality: 65, force: true }).resize({ fit: 'inside', width: 1280 }).toBuffer();
        
        // Ghi ảnh nén ra file
        fs.writeFileSync(imagePath, compressedImageBuffer);
    
        // Trả về URL của ảnh đã được upload
        const imageUrl = `${req.protocol}://${req.get('host')}/x_image_blog/${req.file.filename}`;
        res.json({ imageUrl: imageUrl });
      } catch (error) {
        console.error('Error compressing image:', error);
        return res.status(500).send('Error compressing image.');
      }
  },
};
