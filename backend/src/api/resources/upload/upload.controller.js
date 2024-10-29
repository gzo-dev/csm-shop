import fs from "fs";
import sharp from "sharp";
import path from "path";
import { db } from "../../../models";
import { Sequelize } from "sequelize";

export default {
  async uploadImage(req, res) {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const uploadDir = path.join("x_image_blog");
    // Đường dẫn tuyệt đối của ảnh đã upload
    const imagePath = path.join(uploadDir, req.file.filename);

    try {
      // Đọc ảnh vào bằng thư viện sharp
      const imageBuffer = await sharp(imagePath).toBuffer();

      // Nén ảnh với chất lượng 70% và dung lượng tối đa 100kb
      const compressedImageBuffer = await sharp(imageBuffer)
        .webp({ quality: 85, force: true })
        .resize({ fit: "inside", width: 1280 })
        .toBuffer();

      // Ghi ảnh nén ra file
      fs.writeFileSync(imagePath, compressedImageBuffer);

      // Trả về URL của ảnh đã được upload
      const imageUrl = `${req.protocol}://${req.get("host")}/x_image_blog/${
        req.file.filename
      }`;
      res.json({ imageUrl: imageUrl, file_path: imageUrl });
    } catch (error) {
      console.error("Error compressing image:", error);
      return res.status(500).send("Error compressing image.");
    }
  },
  async changeHost(req, res) {
    try {
      // Kết nối đến cơ sở dữ liệu
      const productPhotos = await db.product.findAll();
      console.log(productPhotos.length);
      for (let productPhoto of productPhotos) {
        const oldPath = productPhoto.photo;
        if (oldPath) {
          // Thay thế miền cũ bằng miền mới
          const newPath = oldPath.replace(
            "https://api.gzomedia.net/uploads/",
            "https://api.minhkhanggroup.vn/oldfile/"
          );

          // Cập nhật đường dẫn mới vào cơ sở dữ liệu
          productPhoto.photo = newPath;
          await productPhoto.save();
          console.log(
            `Đã cập nhật id ${productPhoto.id} từ ${oldPath} sang ${newPath}`
          );
          // return res.json({ ok: true });
        }
      }
    } catch (err) {
      console.log(err);
      return res.json({ ok: false });
    }
  },
  async changeMimeType(req, res) {
    try {
      const inputFolder = path.join("watermark");
      const outputFolder = path.join("watermark_jpg");
      // Hàm để chuyển đổi ảnh từ PNG sang JPG
      async function convertPngToJpg(inputPath, outputPath) {
        try {
          await sharp(inputPath)
            .jpeg({ quality: 80, force: true }) // Chuyển đổi sang JPG với chất lượng 80%
            .resize({ fit: "inside", width: 720 })
            .toFile(outputPath);
          console.log(`Đã chuyển đổi: ${inputPath} -> ${outputPath}`);
        } catch (err) {
          console.error(`Lỗi khi chuyển đổi ${inputPath}:`, err);
        }
      }

      // Đọc tất cả các tệp trong thư mục nguồn
      fs.readdir(inputFolder, (err, files) => {
        if (err) {
          return console.error("Lỗi khi đọc thư mục:", err);
        }

        // Duyệt qua từng tệp và chuyển đổi nếu là tệp PNG
        files.forEach((file) => {
          const inputPath = path.join(inputFolder, file);
          const outputPath = path.join(
            outputFolder,
            file.replace(".png", ".jpg")
          );

          // Kiểm tra xem tệp có phải là PNG không
          if (path.extname(file).toLowerCase() === ".png") {
            convertPngToJpg(inputPath, outputPath);
          }
        });
      });
    } catch (err) {
      console.log(err);
      return res.json({ ok: false });
    }
  },
  async changeMimeTypeDb(req, res) {
    try {
      // Kết nối đến cơ sở dữ liệu

      // Truy vấn để lấy tất cả các bản ghi có miền 'api.minhkhanggroup.vn' và đuôi '.png'
      const productPhotos = await db.productphoto.findAll({
        where: {
          imgUrl: {
            [Sequelize.Op.like]: "%api.minhkhanggroup.vn%.png",
          },
        },
      });

      for (let productPhoto of productPhotos) {
        const oldPath = productPhoto.imgUrl;

        // Thay thế đuôi '.png' bằng '.jpg'
        const newPath = oldPath.replace(".png", ".jpg");

        // Cập nhật đường dẫn mới vào cơ sở dữ liệu
        productPhoto.imgUrl = newPath;
        await productPhoto.save();
        console.log(
          `Đã cập nhật id ${productPhoto.id} từ ${oldPath} sang ${newPath}`
        );
      }
    } catch (err) {
      console.error("Đã xảy ra lỗi:", err);
    }
  },
  async changeMimeTypeDb1(req, res) {
    try {
      // Kết nối đến cơ sở dữ liệu

      // Truy vấn để lấy tất cả các bản ghi có miền 'api.minhkhanggroup.vn' và đuôi '.png'
      const productPhotos = await db.product.findAll({
        where: {
          photo: {
            [Sequelize.Op.like]: "%api.minhkhanggroup.vn%.png",
          },
        },
      });

      for (let productPhoto of productPhotos) {
        const oldPath = productPhoto.photo;

        // Thay thế đuôi '.png' bằng '.jpg'
        const newPath = oldPath.replace(".png", ".jpg");

        // Cập nhật đường dẫn mới vào cơ sở dữ liệu
        productPhoto.photo = newPath;
        await productPhoto.save();
        console.log(
          `Đã cập nhật id ${productPhoto.id} từ ${oldPath} sang ${newPath}`
        );
      }
    } catch (err) {
      console.error("Đã xảy ra lỗi:", err);
    }
  },
};
