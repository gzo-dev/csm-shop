import express from "express"
import waterController from "./water.controller";
import convertWebPToJpeg from "../../../middleware/convertWebPtoJpg";
import convertToPng from "../../../middleware/convertToPng";
const multer = require('multer');

export const watermakRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Thư mục lưu trữ tệp đã tải lên
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Giữ nguyên tên của tệp
    }
});
const upload = multer({ storage: storage });

watermakRouter.route("/").post(upload.single("file"), convertToPng , waterController.addWaterMark)