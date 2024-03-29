"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vendorRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _vendor = _interopRequireDefault(require("./vendor.controller"));
// import multer from 'multer';
// import path from 'path';

// import { sanitize } from '../../../middleware/sanitizer';
// import { jwtStrategy } from '../../../middleware/strategy';
// import { validateBody, schemas } from '../../../middleware/validator';
// var attachmentDir = path.join(path.dirname(require.main.filename), 'public', 'images','product')

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, attachmentDir)
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + path.extname(file.originalname))
//     }
//   })
// var uploadAttachment = multer({ storage: storage, limits:{ fileSize: 10485760 }})

var vendorRouter = _express["default"].Router();
// vendorRouter.route('/create').post(validateBody(schemas.vendorDetails),vendorController.index);
exports.vendorRouter = vendorRouter;
vendorRouter.route('/create').post(_vendor["default"].index);
vendorRouter.route('/list').get(_vendor["default"].getAllvendor);
vendorRouter.route('/product-list').get(_vendor["default"].getAllVendorProduct);
vendorRouter.route('/product/getAllProductById').post(_vendor["default"].getProductByVendor);
vendorRouter.route('/update').post(_vendor["default"].vendorUpdate);
vendorRouter.route('/delete')["delete"](_vendor["default"].vendorDelete);
vendorRouter.route('/product-delete').post(_vendor["default"].vendorProductDelete);
vendorRouter.route('/product-add').post(_vendor["default"].vendorAddProduct);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXhwcmVzcyIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX3ZlbmRvciIsInZlbmRvclJvdXRlciIsImV4cHJlc3MiLCJSb3V0ZXIiLCJleHBvcnRzIiwicm91dGUiLCJwb3N0IiwidmVuZG9yQ29udHJvbGxlciIsImluZGV4IiwiZ2V0IiwiZ2V0QWxsdmVuZG9yIiwiZ2V0QWxsVmVuZG9yUHJvZHVjdCIsImdldFByb2R1Y3RCeVZlbmRvciIsInZlbmRvclVwZGF0ZSIsInZlbmRvckRlbGV0ZSIsInZlbmRvclByb2R1Y3REZWxldGUiLCJ2ZW5kb3JBZGRQcm9kdWN0Il0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvdmVuZG9yL3ZlbmRvci5yb3V0ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG4vLyBpbXBvcnQgbXVsdGVyIGZyb20gJ211bHRlcic7XG4vLyBpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB2ZW5kb3JDb250cm9sbGVyIGZyb20gJy4vdmVuZG9yLmNvbnRyb2xsZXInO1xuLy8gaW1wb3J0IHsgc2FuaXRpemUgfSBmcm9tICcuLi8uLi8uLi9taWRkbGV3YXJlL3Nhbml0aXplcic7XG4vLyBpbXBvcnQgeyBqd3RTdHJhdGVneSB9IGZyb20gJy4uLy4uLy4uL21pZGRsZXdhcmUvc3RyYXRlZ3knO1xuLy8gaW1wb3J0IHsgdmFsaWRhdGVCb2R5LCBzY2hlbWFzIH0gZnJvbSAnLi4vLi4vLi4vbWlkZGxld2FyZS92YWxpZGF0b3InO1xuLy8gdmFyIGF0dGFjaG1lbnREaXIgPSBwYXRoLmpvaW4ocGF0aC5kaXJuYW1lKHJlcXVpcmUubWFpbi5maWxlbmFtZSksICdwdWJsaWMnLCAnaW1hZ2VzJywncHJvZHVjdCcpXG5cbi8vIHZhciBzdG9yYWdlID0gbXVsdGVyLmRpc2tTdG9yYWdlKHtcbi8vICAgICBkZXN0aW5hdGlvbjogZnVuY3Rpb24gKHJlcSwgZmlsZSwgY2IpIHtcbi8vICAgICAgIGNiKG51bGwsIGF0dGFjaG1lbnREaXIpXG4vLyAgICAgfSxcbi8vICAgICBmaWxlbmFtZTogZnVuY3Rpb24gKHJlcSwgZmlsZSwgY2IpIHtcbi8vICAgICAgIGNiKG51bGwsIERhdGUubm93KCkgKyBwYXRoLmV4dG5hbWUoZmlsZS5vcmlnaW5hbG5hbWUpKVxuLy8gICAgIH1cbi8vICAgfSlcbi8vIHZhciB1cGxvYWRBdHRhY2htZW50ID0gbXVsdGVyKHsgc3RvcmFnZTogc3RvcmFnZSwgbGltaXRzOnsgZmlsZVNpemU6IDEwNDg1NzYwIH19KVxuXG5cbmV4cG9ydCBjb25zdCB2ZW5kb3JSb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuLy8gdmVuZG9yUm91dGVyLnJvdXRlKCcvY3JlYXRlJykucG9zdCh2YWxpZGF0ZUJvZHkoc2NoZW1hcy52ZW5kb3JEZXRhaWxzKSx2ZW5kb3JDb250cm9sbGVyLmluZGV4KTtcbnZlbmRvclJvdXRlci5yb3V0ZSgnL2NyZWF0ZScpLnBvc3QoIHZlbmRvckNvbnRyb2xsZXIuaW5kZXgpO1xudmVuZG9yUm91dGVyLnJvdXRlKCcvbGlzdCcpLmdldCggdmVuZG9yQ29udHJvbGxlci5nZXRBbGx2ZW5kb3IpO1xudmVuZG9yUm91dGVyLnJvdXRlKCcvcHJvZHVjdC1saXN0JykuZ2V0KHZlbmRvckNvbnRyb2xsZXIuZ2V0QWxsVmVuZG9yUHJvZHVjdCk7XG52ZW5kb3JSb3V0ZXIucm91dGUoJy9wcm9kdWN0L2dldEFsbFByb2R1Y3RCeUlkJykucG9zdCh2ZW5kb3JDb250cm9sbGVyLmdldFByb2R1Y3RCeVZlbmRvcik7XG52ZW5kb3JSb3V0ZXIucm91dGUoJy91cGRhdGUnKS5wb3N0KHZlbmRvckNvbnRyb2xsZXIudmVuZG9yVXBkYXRlKTtcbnZlbmRvclJvdXRlci5yb3V0ZSgnL2RlbGV0ZScpLmRlbGV0ZSh2ZW5kb3JDb250cm9sbGVyLnZlbmRvckRlbGV0ZSk7XG52ZW5kb3JSb3V0ZXIucm91dGUoJy9wcm9kdWN0LWRlbGV0ZScpLnBvc3QodmVuZG9yQ29udHJvbGxlci52ZW5kb3JQcm9kdWN0RGVsZXRlKTtcbnZlbmRvclJvdXRlci5yb3V0ZSgnL3Byb2R1Y3QtYWRkJykucG9zdCh2ZW5kb3JDb250cm9sbGVyLnZlbmRvckFkZFByb2R1Y3QpO1xuXG5cblxuXG5cblxuXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFBQSxRQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFHQSxJQUFBQyxPQUFBLEdBQUFGLHNCQUFBLENBQUFDLE9BQUE7QUFGQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHTyxJQUFNRSxZQUFZLEdBQUdDLG1CQUFPLENBQUNDLE1BQU0sQ0FBQyxDQUFDO0FBQzVDO0FBQUFDLE9BQUEsQ0FBQUgsWUFBQSxHQUFBQSxZQUFBO0FBQ0FBLFlBQVksQ0FBQ0ksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDQyxJQUFJLENBQUVDLGtCQUFnQixDQUFDQyxLQUFLLENBQUM7QUFDM0RQLFlBQVksQ0FBQ0ksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDSSxHQUFHLENBQUVGLGtCQUFnQixDQUFDRyxZQUFZLENBQUM7QUFDL0RULFlBQVksQ0FBQ0ksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDSSxHQUFHLENBQUNGLGtCQUFnQixDQUFDSSxtQkFBbUIsQ0FBQztBQUM3RVYsWUFBWSxDQUFDSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQ0MsSUFBSSxDQUFDQyxrQkFBZ0IsQ0FBQ0ssa0JBQWtCLENBQUM7QUFDMUZYLFlBQVksQ0FBQ0ksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDQyxJQUFJLENBQUNDLGtCQUFnQixDQUFDTSxZQUFZLENBQUM7QUFDakVaLFlBQVksQ0FBQ0ksS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFPLENBQUNFLGtCQUFnQixDQUFDTyxZQUFZLENBQUM7QUFDbkViLFlBQVksQ0FBQ0ksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUNDLElBQUksQ0FBQ0Msa0JBQWdCLENBQUNRLG1CQUFtQixDQUFDO0FBQ2hGZCxZQUFZLENBQUNJLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQ0MsSUFBSSxDQUFDQyxrQkFBZ0IsQ0FBQ1MsZ0JBQWdCLENBQUMifQ==