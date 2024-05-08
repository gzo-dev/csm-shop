"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _multer = _interopRequireDefault(require("multer"));
var _cloudinary = _interopRequireDefault(require("cloudinary"));
var _multerStorageCloudinary = require("multer-storage-cloudinary");
// import config from "./config";

var cloudinary = _cloudinary["default"].v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
var storage = new _multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "uploads",
  // Thay đổi tên thư mục đích cho lưu trữ tệp tin
  allowedFormats: ["jpg", "jpeg", "png"],
  transformation: [{
    width: 500,
    height: 500,
    crop: "limit"
  }]
});
var upload = (0, _multer["default"])({
  storage: storage
});
module.exports = upload;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbXVsdGVyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfY2xvdWRpbmFyeSIsIl9tdWx0ZXJTdG9yYWdlQ2xvdWRpbmFyeSIsImNsb3VkaW5hcnkiLCJjbG91ZGluYXJ5QSIsInYyIiwiY29uZmlnIiwiY2xvdWRfbmFtZSIsInByb2Nlc3MiLCJlbnYiLCJDTE9VRElOQVJZX0NMT1VEX05BTUUiLCJhcGlfa2V5IiwiQ0xPVURJTkFSWV9BUElfS0VZIiwiYXBpX3NlY3JldCIsIkNMT1VESU5BUllfQVBJX1NFQ1JFVCIsInN0b3JhZ2UiLCJDbG91ZGluYXJ5U3RvcmFnZSIsImZvbGRlciIsImFsbG93ZWRGb3JtYXRzIiwidHJhbnNmb3JtYXRpb24iLCJ3aWR0aCIsImhlaWdodCIsImNyb3AiLCJ1cGxvYWQiLCJtdWx0ZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vc3JjL2F3c2J1Y2tldC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgY29uZmlnIGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IG11bHRlciBmcm9tIFwibXVsdGVyXCI7XG5pbXBvcnQgY2xvdWRpbmFyeUEgZnJvbSBcImNsb3VkaW5hcnlcIjtcbmltcG9ydCB7IENsb3VkaW5hcnlTdG9yYWdlIH0gZnJvbSBcIm11bHRlci1zdG9yYWdlLWNsb3VkaW5hcnlcIjtcbmNvbnN0IGNsb3VkaW5hcnkgPSBjbG91ZGluYXJ5QS52MjtcblxuY2xvdWRpbmFyeS5jb25maWcoe1xuICBjbG91ZF9uYW1lOiBwcm9jZXNzLmVudi5DTE9VRElOQVJZX0NMT1VEX05BTUUsXG4gIGFwaV9rZXk6IHByb2Nlc3MuZW52LkNMT1VESU5BUllfQVBJX0tFWSxcbiAgYXBpX3NlY3JldDogcHJvY2Vzcy5lbnYuQ0xPVURJTkFSWV9BUElfU0VDUkVULFxufSk7XG5cbmNvbnN0IHN0b3JhZ2UgPSBuZXcgQ2xvdWRpbmFyeVN0b3JhZ2Uoe1xuICBjbG91ZGluYXJ5OiBjbG91ZGluYXJ5LFxuICBmb2xkZXI6IFwidXBsb2Fkc1wiLCAvLyBUaGF5IMSR4buVaSB0w6puIHRoxrAgbeG7pWMgxJHDrWNoIGNobyBsxrB1IHRy4buvIHThu4dwIHRpblxuICBhbGxvd2VkRm9ybWF0czogW1wianBnXCIsIFwianBlZ1wiLCBcInBuZ1wiXSxcbiAgdHJhbnNmb3JtYXRpb246IFt7IHdpZHRoOiA1MDAsIGhlaWdodDogNTAwLCBjcm9wOiBcImxpbWl0XCIgfV0sXG59KTtcblxuY29uc3QgdXBsb2FkID0gbXVsdGVyKHsgc3RvcmFnZTogc3RvcmFnZSB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSB1cGxvYWQ7XG4iXSwibWFwcGluZ3MiOiI7OztBQUNBLElBQUFBLE9BQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFDLFdBQUEsR0FBQUYsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFFLHdCQUFBLEdBQUFGLE9BQUE7QUFIQTs7QUFJQSxJQUFNRyxVQUFVLEdBQUdDLHNCQUFXLENBQUNDLEVBQUU7QUFFakNGLFVBQVUsQ0FBQ0csTUFBTSxDQUFDO0VBQ2hCQyxVQUFVLEVBQUVDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxxQkFBcUI7RUFDN0NDLE9BQU8sRUFBRUgsT0FBTyxDQUFDQyxHQUFHLENBQUNHLGtCQUFrQjtFQUN2Q0MsVUFBVSxFQUFFTCxPQUFPLENBQUNDLEdBQUcsQ0FBQ0s7QUFDMUIsQ0FBQyxDQUFDO0FBRUYsSUFBTUMsT0FBTyxHQUFHLElBQUlDLDBDQUFpQixDQUFDO0VBQ3BDYixVQUFVLEVBQUVBLFVBQVU7RUFDdEJjLE1BQU0sRUFBRSxTQUFTO0VBQUU7RUFDbkJDLGNBQWMsRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDO0VBQ3RDQyxjQUFjLEVBQUUsQ0FBQztJQUFFQyxLQUFLLEVBQUUsR0FBRztJQUFFQyxNQUFNLEVBQUUsR0FBRztJQUFFQyxJQUFJLEVBQUU7RUFBUSxDQUFDO0FBQzdELENBQUMsQ0FBQztBQUVGLElBQU1DLE1BQU0sR0FBRyxJQUFBQyxrQkFBTSxFQUFDO0VBQUVULE9BQU8sRUFBRUE7QUFBUSxDQUFDLENBQUM7QUFFM0NVLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHSCxNQUFNIn0=