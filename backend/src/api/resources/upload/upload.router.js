import express from "express"
import uploadController from "./upload.controller";
const multer = require('multer');

export const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'x_image_blog/') // Thư mục lưu trữ tệp đã tải lên
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Giữ nguyên tên của tệp
    }
});
const upload = multer({ storage: storage });

uploadRouter.route("/").post(upload.single("image"), uploadController.uploadImage)