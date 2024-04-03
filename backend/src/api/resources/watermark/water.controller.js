import Jimp from "jimp"
import path from "path"
import { v4 } from "uuid";

const serverHost = `https://trouytin.online:8443`;
const logoPath = path.join(__dirname, "../../..", "/logo.png");
const outputFilename= path.join(__dirname, "../../../../", "watermark")

export default {
  async addWaterMark(req, res) {
    // const {  outputFilename } = req.body;
    const uploadedImage = path.join(__dirname, "../../../../", req.file.path);
    try {
      const [image, logo] = await Promise.all([
        Jimp.read(uploadedImage),
        Jimp.read(logoPath),
      ]);

      // Resize logo
      const desiredLogoWidth = 250;
      const desiredLogoHeight = 250;
      logo.resize(desiredLogoWidth, desiredLogoHeight);
      const logoWidth = 250; // Đặt kích thước mới của logo ở đây

      const logoX = image.bitmap.width - logoWidth - 50;
      const logoY = 50;
      logo.opacity(0.4)
      image.composite(logo, logoX, logoY, [
        {
          mode: Jimp.BLEND_SCREEN,
          opacitySource: 0.1,
          opacityDest: 0.1,
        },
      ]);
      const uuid= v4()
      await image.writeAsync(path.join(outputFilename, "/", uuid + ".png"));
      return res.status(200).send({ file_path: (serverHost + "/" + uuid + ".png") });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .send({ error: "An error occurred while adding watermark to image." });
    }
  },
};
