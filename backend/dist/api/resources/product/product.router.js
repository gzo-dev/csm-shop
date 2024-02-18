"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _product = _interopRequireDefault(require("./product.controller"));
var _awsbucket = _interopRequireDefault(require("../../../awsbucket"));
// import { sanitize } from '../../../middleware/sanitizer';
// import { jwtStrategy } from '../../../middleware/strategy';

var productRouter = _express["default"].Router();
exports.productRouter = productRouter;
productRouter.route("/d").get(_product["default"].getProductListById);
productRouter.route("/c").get(_product["default"].getProductListByCategory);
productRouter.route("/s/h").get(_product["default"].getProductSuggestHotel);
productRouter.route("/s/a").get(_product["default"].getProductSuggestApartment);
productRouter.route("/photo").get(_product["default"].getPhotoProduct);
productRouter.route('/add').post(_awsbucket["default"].single('photo'), _product["default"].addProduct);
productRouter.route('/getAllproduct').get(_product["default"].index);
productRouter.route('/getAllproductList').get(_product["default"].getAllProductList);
productRouter.route('/update').post(_awsbucket["default"].single('photo'), _product["default"].update);
productRouter.route('/getProductByCategory').get(_product["default"].getProductListByCategory);
productRouter.route('/getProductById').get(_product["default"].getProductListById);
productRouter.route('/getWebProductById').get(_product["default"].getWebProductListById);
productRouter.route('/product-offer').post(_product["default"].addProductOffer);
productRouter.route('/getAllProductOffer').get(_product["default"].getProductOffer);
productRouter.route('/delete')["delete"](_product["default"].productDelete);
productRouter.route('/deleteOfferById/:id').get(_product["default"].productOfferDelete);
productRouter.route('/upload-img').post(_awsbucket["default"].array('file', 10), _product["default"].multiplePhotoUpload);
productRouter.route('/getAllPhoto').get(_product["default"].getAllPhoto);
productRouter.route('/slider-photo/delete')["delete"](_product["default"].deleteSliderPhoto);
productRouter.route("/size").get(_product["default"].getSizeProduct);

//Category by product
productRouter.route('/getAllGroceryStaple').get(_product["default"].getAllGrocerryStaples);
productRouter.route('/suggest').get(_product["default"].getProductSuggest);
productRouter.route('/list/:slug').get(_product["default"].getAllProductBySlug);
productRouter.route('/getAllByCategory').post(_product["default"].GetAllByCategory);
productRouter.route('/getallProductbySubChildCat').post(_product["default"].getProductSubChildCat);

// Filter product
productRouter.route('/gcatalogsearch/result').get(_product["default"].getFilterbyProduct);

//new api
productRouter.route('/search_product').post(_product["default"].searchProductBySubCat);

//aws image delete
productRouter.route('/aws/delete/photo').post(_product["default"].awsProductPhotoDelete);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXhwcmVzcyIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX3Byb2R1Y3QiLCJfYXdzYnVja2V0IiwicHJvZHVjdFJvdXRlciIsImV4cHJlc3MiLCJSb3V0ZXIiLCJleHBvcnRzIiwicm91dGUiLCJnZXQiLCJwcm9kdWN0Q29udHJvbGxlciIsImdldFByb2R1Y3RMaXN0QnlJZCIsImdldFByb2R1Y3RMaXN0QnlDYXRlZ29yeSIsImdldFByb2R1Y3RTdWdnZXN0SG90ZWwiLCJnZXRQcm9kdWN0U3VnZ2VzdEFwYXJ0bWVudCIsImdldFBob3RvUHJvZHVjdCIsInBvc3QiLCJ1cGxvYWQiLCJzaW5nbGUiLCJhZGRQcm9kdWN0IiwiaW5kZXgiLCJnZXRBbGxQcm9kdWN0TGlzdCIsInVwZGF0ZSIsImdldFdlYlByb2R1Y3RMaXN0QnlJZCIsImFkZFByb2R1Y3RPZmZlciIsImdldFByb2R1Y3RPZmZlciIsInByb2R1Y3REZWxldGUiLCJwcm9kdWN0T2ZmZXJEZWxldGUiLCJhcnJheSIsIm11bHRpcGxlUGhvdG9VcGxvYWQiLCJnZXRBbGxQaG90byIsImRlbGV0ZVNsaWRlclBob3RvIiwiZ2V0U2l6ZVByb2R1Y3QiLCJnZXRBbGxHcm9jZXJyeVN0YXBsZXMiLCJnZXRQcm9kdWN0U3VnZ2VzdCIsImdldEFsbFByb2R1Y3RCeVNsdWciLCJHZXRBbGxCeUNhdGVnb3J5IiwiZ2V0UHJvZHVjdFN1YkNoaWxkQ2F0IiwiZ2V0RmlsdGVyYnlQcm9kdWN0Iiwic2VhcmNoUHJvZHVjdEJ5U3ViQ2F0IiwiYXdzUHJvZHVjdFBob3RvRGVsZXRlIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvcHJvZHVjdC9wcm9kdWN0LnJvdXRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBwcm9kdWN0Q29udHJvbGxlciBmcm9tICcuL3Byb2R1Y3QuY29udHJvbGxlcic7XG4vLyBpbXBvcnQgeyBzYW5pdGl6ZSB9IGZyb20gJy4uLy4uLy4uL21pZGRsZXdhcmUvc2FuaXRpemVyJztcbi8vIGltcG9ydCB7IGp3dFN0cmF0ZWd5IH0gZnJvbSAnLi4vLi4vLi4vbWlkZGxld2FyZS9zdHJhdGVneSc7XG5pbXBvcnQgdXBsb2FkIGZyb20gJy4uLy4uLy4uL2F3c2J1Y2tldCc7XG5cblxuZXhwb3J0IGNvbnN0IHByb2R1Y3RSb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5wcm9kdWN0Um91dGVyLnJvdXRlKFwiL2RcIikuZ2V0KHByb2R1Y3RDb250cm9sbGVyLmdldFByb2R1Y3RMaXN0QnlJZClcbnByb2R1Y3RSb3V0ZXIucm91dGUoXCIvY1wiKS5nZXQocHJvZHVjdENvbnRyb2xsZXIuZ2V0UHJvZHVjdExpc3RCeUNhdGVnb3J5KVxucHJvZHVjdFJvdXRlci5yb3V0ZShcIi9zL2hcIikuZ2V0KHByb2R1Y3RDb250cm9sbGVyLmdldFByb2R1Y3RTdWdnZXN0SG90ZWwpXG5wcm9kdWN0Um91dGVyLnJvdXRlKFwiL3MvYVwiKS5nZXQocHJvZHVjdENvbnRyb2xsZXIuZ2V0UHJvZHVjdFN1Z2dlc3RBcGFydG1lbnQpXG5wcm9kdWN0Um91dGVyLnJvdXRlKFwiL3Bob3RvXCIpLmdldChwcm9kdWN0Q29udHJvbGxlci5nZXRQaG90b1Byb2R1Y3QpXG5wcm9kdWN0Um91dGVyLnJvdXRlKCcvYWRkJykucG9zdCh1cGxvYWQuc2luZ2xlKCdwaG90bycpLCBwcm9kdWN0Q29udHJvbGxlci5hZGRQcm9kdWN0KTtcbnByb2R1Y3RSb3V0ZXIucm91dGUoJy9nZXRBbGxwcm9kdWN0JykuZ2V0KCBwcm9kdWN0Q29udHJvbGxlci5pbmRleCk7XG5wcm9kdWN0Um91dGVyLnJvdXRlKCcvZ2V0QWxscHJvZHVjdExpc3QnKS5nZXQoIHByb2R1Y3RDb250cm9sbGVyLmdldEFsbFByb2R1Y3RMaXN0KTtcbnByb2R1Y3RSb3V0ZXIucm91dGUoJy91cGRhdGUnKS5wb3N0KCB1cGxvYWQuc2luZ2xlKCdwaG90bycpLCBwcm9kdWN0Q29udHJvbGxlci51cGRhdGUpO1xucHJvZHVjdFJvdXRlci5yb3V0ZSgnL2dldFByb2R1Y3RCeUNhdGVnb3J5JykuZ2V0KCBwcm9kdWN0Q29udHJvbGxlci5nZXRQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkpO1xucHJvZHVjdFJvdXRlci5yb3V0ZSgnL2dldFByb2R1Y3RCeUlkJykuZ2V0KCBwcm9kdWN0Q29udHJvbGxlci5nZXRQcm9kdWN0TGlzdEJ5SWQpO1xucHJvZHVjdFJvdXRlci5yb3V0ZSgnL2dldFdlYlByb2R1Y3RCeUlkJykuZ2V0KCBwcm9kdWN0Q29udHJvbGxlci5nZXRXZWJQcm9kdWN0TGlzdEJ5SWQpO1xucHJvZHVjdFJvdXRlci5yb3V0ZSgnL3Byb2R1Y3Qtb2ZmZXInKS5wb3N0KCBwcm9kdWN0Q29udHJvbGxlci5hZGRQcm9kdWN0T2ZmZXIpO1xucHJvZHVjdFJvdXRlci5yb3V0ZSgnL2dldEFsbFByb2R1Y3RPZmZlcicpLmdldCggcHJvZHVjdENvbnRyb2xsZXIuZ2V0UHJvZHVjdE9mZmVyKTtcbnByb2R1Y3RSb3V0ZXIucm91dGUoJy9kZWxldGUnKS5kZWxldGUoIHByb2R1Y3RDb250cm9sbGVyLnByb2R1Y3REZWxldGUpO1xucHJvZHVjdFJvdXRlci5yb3V0ZSgnL2RlbGV0ZU9mZmVyQnlJZC86aWQnKS5nZXQoIHByb2R1Y3RDb250cm9sbGVyLnByb2R1Y3RPZmZlckRlbGV0ZSk7XG5wcm9kdWN0Um91dGVyLnJvdXRlKCcvdXBsb2FkLWltZycpLnBvc3QodXBsb2FkLmFycmF5KCdmaWxlJywgMTApLCBwcm9kdWN0Q29udHJvbGxlci5tdWx0aXBsZVBob3RvVXBsb2FkKTtcbnByb2R1Y3RSb3V0ZXIucm91dGUoJy9nZXRBbGxQaG90bycpLmdldCggcHJvZHVjdENvbnRyb2xsZXIuZ2V0QWxsUGhvdG8pO1xucHJvZHVjdFJvdXRlci5yb3V0ZSgnL3NsaWRlci1waG90by9kZWxldGUnKS5kZWxldGUoIHByb2R1Y3RDb250cm9sbGVyLmRlbGV0ZVNsaWRlclBob3RvKTtcbnByb2R1Y3RSb3V0ZXIucm91dGUoXCIvc2l6ZVwiKS5nZXQocHJvZHVjdENvbnRyb2xsZXIuZ2V0U2l6ZVByb2R1Y3QpXG5cbi8vQ2F0ZWdvcnkgYnkgcHJvZHVjdFxucHJvZHVjdFJvdXRlci5yb3V0ZSgnL2dldEFsbEdyb2NlcnlTdGFwbGUnKS5nZXQoIHByb2R1Y3RDb250cm9sbGVyLmdldEFsbEdyb2NlcnJ5U3RhcGxlcyk7XG5wcm9kdWN0Um91dGVyLnJvdXRlKCcvc3VnZ2VzdCcpLmdldCggcHJvZHVjdENvbnRyb2xsZXIuZ2V0UHJvZHVjdFN1Z2dlc3QpO1xucHJvZHVjdFJvdXRlci5yb3V0ZSgnL2xpc3QvOnNsdWcnKS5nZXQoIHByb2R1Y3RDb250cm9sbGVyLmdldEFsbFByb2R1Y3RCeVNsdWcpO1xucHJvZHVjdFJvdXRlci5yb3V0ZSgnL2dldEFsbEJ5Q2F0ZWdvcnknKS5wb3N0KCBwcm9kdWN0Q29udHJvbGxlci5HZXRBbGxCeUNhdGVnb3J5KTtcbnByb2R1Y3RSb3V0ZXIucm91dGUoJy9nZXRhbGxQcm9kdWN0YnlTdWJDaGlsZENhdCcpLnBvc3QoIHByb2R1Y3RDb250cm9sbGVyLmdldFByb2R1Y3RTdWJDaGlsZENhdCk7XG5cbi8vIEZpbHRlciBwcm9kdWN0XG5wcm9kdWN0Um91dGVyLnJvdXRlKCcvZ2NhdGFsb2dzZWFyY2gvcmVzdWx0JykuZ2V0KCBwcm9kdWN0Q29udHJvbGxlci5nZXRGaWx0ZXJieVByb2R1Y3QpO1xuXG4vL25ldyBhcGlcbnByb2R1Y3RSb3V0ZXIucm91dGUoJy9zZWFyY2hfcHJvZHVjdCcpLnBvc3QoIHByb2R1Y3RDb250cm9sbGVyLnNlYXJjaFByb2R1Y3RCeVN1YkNhdCk7XG5cblxuLy9hd3MgaW1hZ2UgZGVsZXRlXG5wcm9kdWN0Um91dGVyLnJvdXRlKCcvYXdzL2RlbGV0ZS9waG90bycpLnBvc3QoIHByb2R1Y3RDb250cm9sbGVyLmF3c1Byb2R1Y3RQaG90b0RlbGV0ZSk7XG5cblxuXG5cblxuXG5cblxuXG5cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7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