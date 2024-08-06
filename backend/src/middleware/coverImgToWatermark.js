import Jimp from "jimp";
import path from "path";
import { v4 } from "uuid";
import sharp from "sharp";
import fs from "fs";

const serverHost = `https://api.minhkhanggroup.vn`;
const logoPath = path.join(__dirname, "..", "/logo.png");
const outputFilename = path.join(__dirname, "../../", "watermark");

// Middleware để thêm watermark vào ảnh
export const addWatermarkMiddleware = async (req, res, next) => {
  try {
    if(!req.file) {
      next()
    }
    const uploadedImage = path.join(__dirname, "../../", req.file.path);
    console.log("uploadedImage", uploadedImage)
    // Đọc ảnh gốc và logo bằng Jimp
    const [image, logo] = await Promise.all([
      Jimp.read(uploadedImage),
      Jimp.read(logoPath),
    ]);

    const imageWidth = image.getWidth();
    const imageHeight = image.getHeight();

    // Resize logo bằng Jimp
    const desiredLogoWidth = 250;
    const desiredLogoHeight = Jimp.AUTO;
    logo.resize(desiredLogoWidth, desiredLogoHeight);

    const logoX = 50;
    const logoY = 50;
    logo.opacity(1);

    // Chèn logo vào ảnh với hiệu ứng bằng Jimp
    image.composite(logo, logoX, logoY, [
      {
        mode: Jimp.BLEND_SCREEN,
        opacitySource: 0.1,
        opacityDest: 0.1,
      },
    ]);

    // Lưu ảnh đã thêm watermark bằng Jimp
    const uuid = v4();
    const outputImagePath = path.join(outputFilename, `${uuid}.png`);
    await image.writeAsync(outputImagePath);

    // Thêm văn bản có màu vào ảnh bằng Sharp
    const text =
      "MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN MINHKHANGGROUP.VN";
    const textColor = "#e60123";

    await addTextToImage(
      outputImagePath,
      outputImagePath,
      text,
      textColor,
      "30%",
      imageWidth,
      imageHeight
    );

    await addTextToImage(
      outputImagePath,
      outputImagePath,
      text,
      textColor,
      "70%",
      imageWidth,
      imageHeight
    );

    const finalOutputImagePath = path.join(outputFilename, `${uuid}.jpg`);

    await sharp(outputImagePath)
      .jpeg({ quality: 95 })
      .resize({ fit: "inside", width: 720 })
      .toFile(finalOutputImagePath);

    fs.unlinkSync(outputImagePath);

    // Cập nhật đường dẫn ảnh đã xử lý vào request để sử dụng trong các middleware hoặc handler khác
    req.file = {path: `./watermark/${uuid}.jpg`};

    // Tiếp tục xử lý request
    next();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({
      error: "An error occurred while adding watermark to image.",
    });
  }
};

// Hàm thêm văn bản có màu vào ảnh bằng Sharp
async function addTextToImage(
  inputImagePath,
  outputImagePath,
  text,
  textColor,
  y,
  imageWidth,
  imageHeight
) {
  try {
    // Tạo một bản sao của ảnh để tránh lỗi "Cannot use same file for input and output"
    const tempOutputPath = path.join(outputFilename, `${v4()}.png`);

    // Đọc ảnh đầu vào bằng Sharp
    const image = sharp(inputImagePath);

    // Tạo lớp văn bản mới với màu sắc tùy chỉnh
    const textLayer = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${imageWidth}" height="${imageHeight}">
          <text x="0" y="${y}" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="60" fill="${textColor}" font-weight="bold" opacity="0.15">
              ${text}
          </text>
      </svg>
      `
    );

    // Ghép lớp văn bản vào ảnh bằng Sharp
    image.composite([{ input: textLayer, blend: "over" }]);

    // Lưu ảnh đã xử lý vào tệp tạm thời
    await image.toFile(tempOutputPath);

    // Sao chép ảnh từ tệp tạm thời sang tệp đầu ra
    await sharp(tempOutputPath).toFile(outputImagePath);

    // Xóa tệp tạm thời sau khi hoàn thành
    await fs.promises.unlink(tempOutputPath);
  } catch (error) {
    console.error("Error adding text to image with Sharp:", error);
    throw error;
  }
}
