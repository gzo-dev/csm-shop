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
productRouter.route("/c").get(_product["default"].getProductListByCategoryClient);
productRouter.route("/c/c").get(_product["default"].getProductListByCategoryClientWeb);
productRouter.route("/s/h").get(_product["default"].getProductSuggestHotel);
productRouter.route("/s/a").get(_product["default"].getProductSuggestApartment);
productRouter.route("/sg").get(_product["default"].getProductSuggest2);
productRouter.route("/photo").get(_product["default"].getPhotoProduct);
productRouter.route('/add').post(_awsbucket["default"].single('photo'), _product["default"].addProduct);
productRouter.route('/getAllproduct').get(_product["default"].index);
productRouter.route('/c/s').get(_product["default"].getAllProductCategory);
productRouter.route('/getAllproductList').get(_product["default"].getAllProductList);
productRouter.route('/update').post(_awsbucket["default"].single('photo'), _product["default"].update);
productRouter.route('/getProductByCategory').get(_product["default"].getProductListByCategory);
productRouter.route('/filter').get(_product["default"].getProductListByFilter);
productRouter.route('/getProductById').get(_product["default"].getProductListById);
productRouter.route('/getWebProductById').get(_product["default"].getWebProductListById);
productRouter.route('/product-offer').post(_product["default"].addProductOffer);
productRouter.route('/getAllProductOffer').get(_product["default"].getProductOffer);
productRouter.route('/delete')["delete"](_product["default"].productDelete);
productRouter.route("/d/bulk").post(_product["default"].productDeleteBulk);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXhwcmVzcyIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX3Byb2R1Y3QiLCJfYXdzYnVja2V0IiwicHJvZHVjdFJvdXRlciIsImV4cHJlc3MiLCJSb3V0ZXIiLCJleHBvcnRzIiwicm91dGUiLCJnZXQiLCJwcm9kdWN0Q29udHJvbGxlciIsImdldFByb2R1Y3RMaXN0QnlJZCIsImdldFByb2R1Y3RMaXN0QnlDYXRlZ29yeUNsaWVudCIsImdldFByb2R1Y3RMaXN0QnlDYXRlZ29yeUNsaWVudFdlYiIsImdldFByb2R1Y3RTdWdnZXN0SG90ZWwiLCJnZXRQcm9kdWN0U3VnZ2VzdEFwYXJ0bWVudCIsImdldFByb2R1Y3RTdWdnZXN0MiIsImdldFBob3RvUHJvZHVjdCIsInBvc3QiLCJ1cGxvYWQiLCJzaW5nbGUiLCJhZGRQcm9kdWN0IiwiaW5kZXgiLCJnZXRBbGxQcm9kdWN0Q2F0ZWdvcnkiLCJnZXRBbGxQcm9kdWN0TGlzdCIsInVwZGF0ZSIsImdldFByb2R1Y3RMaXN0QnlDYXRlZ29yeSIsImdldFByb2R1Y3RMaXN0QnlGaWx0ZXIiLCJnZXRXZWJQcm9kdWN0TGlzdEJ5SWQiLCJhZGRQcm9kdWN0T2ZmZXIiLCJnZXRQcm9kdWN0T2ZmZXIiLCJwcm9kdWN0RGVsZXRlIiwicHJvZHVjdERlbGV0ZUJ1bGsiLCJwcm9kdWN0T2ZmZXJEZWxldGUiLCJhcnJheSIsIm11bHRpcGxlUGhvdG9VcGxvYWQiLCJnZXRBbGxQaG90byIsImRlbGV0ZVNsaWRlclBob3RvIiwiZ2V0U2l6ZVByb2R1Y3QiLCJnZXRBbGxHcm9jZXJyeVN0YXBsZXMiLCJnZXRQcm9kdWN0U3VnZ2VzdCIsImdldEFsbFByb2R1Y3RCeVNsdWciLCJHZXRBbGxCeUNhdGVnb3J5IiwiZ2V0UHJvZHVjdFN1YkNoaWxkQ2F0IiwiZ2V0RmlsdGVyYnlQcm9kdWN0Iiwic2VhcmNoUHJvZHVjdEJ5U3ViQ2F0IiwiYXdzUHJvZHVjdFBob3RvRGVsZXRlIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvcHJvZHVjdC9wcm9kdWN0LnJvdXRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBwcm9kdWN0Q29udHJvbGxlciBmcm9tICcuL3Byb2R1Y3QuY29udHJvbGxlcic7XG4vLyBpbXBvcnQgeyBzYW5pdGl6ZSB9IGZyb20gJy4uLy4uLy4uL21pZGRsZXdhcmUvc2FuaXRpemVyJztcbi8vIGltcG9ydCB7IGp3dFN0cmF0ZWd5IH0gZnJvbSAnLi4vLi4vLi4vbWlkZGxld2FyZS9zdHJhdGVneSc7XG5pbXBvcnQgdXBsb2FkIGZyb20gJy4uLy4uLy4uL2F3c2J1Y2tldCc7XG5cblxuZXhwb3J0IGNvbnN0IHByb2R1Y3RSb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5wcm9kdWN0Um91dGVyLnJvdXRlKFwiL2RcIikuZ2V0KHByb2R1Y3RDb250cm9sbGVyLmdldFByb2R1Y3RMaXN0QnlJZClcbnByb2R1Y3RSb3V0ZXIucm91dGUoXCIvY1wiKS5nZXQocHJvZHVjdENvbnRyb2xsZXIuZ2V0UHJvZHVjdExpc3RCeUNhdGVnb3J5Q2xpZW50KVxucHJvZHVjdFJvdXRlci5yb3V0ZShcIi9jL2NcIikuZ2V0KHByb2R1Y3RDb250cm9sbGVyLmdldFByb2R1Y3RMaXN0QnlDYXRlZ29yeUNsaWVudFdlYilcbnByb2R1Y3RSb3V0ZXIucm91dGUoXCIvcy9oXCIpLmdldChwcm9kdWN0Q29udHJvbGxlci5nZXRQcm9kdWN0U3VnZ2VzdEhvdGVsKVxucHJvZHVjdFJvdXRlci5yb3V0ZShcIi9zL2FcIikuZ2V0KHByb2R1Y3RDb250cm9sbGVyLmdldFByb2R1Y3RTdWdnZXN0QXBhcnRtZW50KVxucHJvZHVjdFJvdXRlci5yb3V0ZShcIi9zZ1wiKS5nZXQocHJvZHVjdENvbnRyb2xsZXIuZ2V0UHJvZHVjdFN1Z2dlc3QyKVxucHJvZHVjdFJvdXRlci5yb3V0ZShcIi9waG90b1wiKS5nZXQocHJvZHVjdENvbnRyb2xsZXIuZ2V0UGhvdG9Qcm9kdWN0KVxucHJvZHVjdFJvdXRlci5yb3V0ZSgnL2FkZCcpLnBvc3QodXBsb2FkLnNpbmdsZSgncGhvdG8nKSwgcHJvZHVjdENvbnRyb2xsZXIuYWRkUHJvZHVjdCk7XG5wcm9kdWN0Um91dGVyLnJvdXRlKCcvZ2V0QWxscHJvZHVjdCcpLmdldCggcHJvZHVjdENvbnRyb2xsZXIuaW5kZXgpO1xucHJvZHVjdFJvdXRlci5yb3V0ZSgnL2MvcycpLmdldCggcHJvZHVjdENvbnRyb2xsZXIuZ2V0QWxsUHJvZHVjdENhdGVnb3J5KTtcbnByb2R1Y3RSb3V0ZXIucm91dGUoJy9nZXRBbGxwcm9kdWN0TGlzdCcpLmdldCggcHJvZHVjdENvbnRyb2xsZXIuZ2V0QWxsUHJvZHVjdExpc3QpO1xucHJvZHVjdFJvdXRlci5yb3V0ZSgnL3VwZGF0ZScpLnBvc3QoIHVwbG9hZC5zaW5nbGUoJ3Bob3RvJyksIHByb2R1Y3RDb250cm9sbGVyLnVwZGF0ZSk7XG5wcm9kdWN0Um91dGVyLnJvdXRlKCcvZ2V0UHJvZHVjdEJ5Q2F0ZWdvcnknKS5nZXQoIHByb2R1Y3RDb250cm9sbGVyLmdldFByb2R1Y3RMaXN0QnlDYXRlZ29yeSk7XG5wcm9kdWN0Um91dGVyLnJvdXRlKCcvZmlsdGVyJykuZ2V0KCBwcm9kdWN0Q29udHJvbGxlci5nZXRQcm9kdWN0TGlzdEJ5RmlsdGVyKTtcbnByb2R1Y3RSb3V0ZXIucm91dGUoJy9nZXRQcm9kdWN0QnlJZCcpLmdldCggcHJvZHVjdENvbnRyb2xsZXIuZ2V0UHJvZHVjdExpc3RCeUlkKTtcbnByb2R1Y3RSb3V0ZXIucm91dGUoJy9nZXRXZWJQcm9kdWN0QnlJZCcpLmdldCggcHJvZHVjdENvbnRyb2xsZXIuZ2V0V2ViUHJvZHVjdExpc3RCeUlkKTtcbnByb2R1Y3RSb3V0ZXIucm91dGUoJy9wcm9kdWN0LW9mZmVyJykucG9zdCggcHJvZHVjdENvbnRyb2xsZXIuYWRkUHJvZHVjdE9mZmVyKTtcbnByb2R1Y3RSb3V0ZXIucm91dGUoJy9nZXRBbGxQcm9kdWN0T2ZmZXInKS5nZXQoIHByb2R1Y3RDb250cm9sbGVyLmdldFByb2R1Y3RPZmZlcik7XG5wcm9kdWN0Um91dGVyLnJvdXRlKCcvZGVsZXRlJykuZGVsZXRlKCBwcm9kdWN0Q29udHJvbGxlci5wcm9kdWN0RGVsZXRlKTtcbnByb2R1Y3RSb3V0ZXIucm91dGUoXCIvZC9idWxrXCIpLnBvc3QocHJvZHVjdENvbnRyb2xsZXIucHJvZHVjdERlbGV0ZUJ1bGspXG5wcm9kdWN0Um91dGVyLnJvdXRlKCcvZGVsZXRlT2ZmZXJCeUlkLzppZCcpLmdldCggcHJvZHVjdENvbnRyb2xsZXIucHJvZHVjdE9mZmVyRGVsZXRlKTtcbnByb2R1Y3RSb3V0ZXIucm91dGUoJy91cGxvYWQtaW1nJykucG9zdCh1cGxvYWQuYXJyYXkoJ2ZpbGUnLCAxMCksIHByb2R1Y3RDb250cm9sbGVyLm11bHRpcGxlUGhvdG9VcGxvYWQpO1xucHJvZHVjdFJvdXRlci5yb3V0ZSgnL2dldEFsbFBob3RvJykuZ2V0KCBwcm9kdWN0Q29udHJvbGxlci5nZXRBbGxQaG90byk7XG5wcm9kdWN0Um91dGVyLnJvdXRlKCcvc2xpZGVyLXBob3RvL2RlbGV0ZScpLmRlbGV0ZSggcHJvZHVjdENvbnRyb2xsZXIuZGVsZXRlU2xpZGVyUGhvdG8pO1xucHJvZHVjdFJvdXRlci5yb3V0ZShcIi9zaXplXCIpLmdldChwcm9kdWN0Q29udHJvbGxlci5nZXRTaXplUHJvZHVjdClcblxuLy9DYXRlZ29yeSBieSBwcm9kdWN0XG5wcm9kdWN0Um91dGVyLnJvdXRlKCcvZ2V0QWxsR3JvY2VyeVN0YXBsZScpLmdldCggcHJvZHVjdENvbnRyb2xsZXIuZ2V0QWxsR3JvY2VycnlTdGFwbGVzKTtcbnByb2R1Y3RSb3V0ZXIucm91dGUoJy9zdWdnZXN0JykuZ2V0KCBwcm9kdWN0Q29udHJvbGxlci5nZXRQcm9kdWN0U3VnZ2VzdCk7XG5wcm9kdWN0Um91dGVyLnJvdXRlKCcvbGlzdC86c2x1ZycpLmdldCggcHJvZHVjdENvbnRyb2xsZXIuZ2V0QWxsUHJvZHVjdEJ5U2x1Zyk7XG5wcm9kdWN0Um91dGVyLnJvdXRlKCcvZ2V0QWxsQnlDYXRlZ29yeScpLnBvc3QoIHByb2R1Y3RDb250cm9sbGVyLkdldEFsbEJ5Q2F0ZWdvcnkpO1xucHJvZHVjdFJvdXRlci5yb3V0ZSgnL2dldGFsbFByb2R1Y3RieVN1YkNoaWxkQ2F0JykucG9zdCggcHJvZHVjdENvbnRyb2xsZXIuZ2V0UHJvZHVjdFN1YkNoaWxkQ2F0KTtcblxuLy8gRmlsdGVyIHByb2R1Y3RcbnByb2R1Y3RSb3V0ZXIucm91dGUoJy9nY2F0YWxvZ3NlYXJjaC9yZXN1bHQnKS5nZXQoIHByb2R1Y3RDb250cm9sbGVyLmdldEZpbHRlcmJ5UHJvZHVjdCk7XG5cbi8vbmV3IGFwaVxucHJvZHVjdFJvdXRlci5yb3V0ZSgnL3NlYXJjaF9wcm9kdWN0JykucG9zdCggcHJvZHVjdENvbnRyb2xsZXIuc2VhcmNoUHJvZHVjdEJ5U3ViQ2F0KTtcblxuXG4vL2F3cyBpbWFnZSBkZWxldGVcbnByb2R1Y3RSb3V0ZXIucm91dGUoJy9hd3MvZGVsZXRlL3Bob3RvJykucG9zdCggcHJvZHVjdENvbnRyb2xsZXIuYXdzUHJvZHVjdFBob3RvRGVsZXRlKTtcblxuXG5cblxuXG5cblxuXG5cblxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBQUEsUUFBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUMsUUFBQSxHQUFBRixzQkFBQSxDQUFBQyxPQUFBO0FBR0EsSUFBQUUsVUFBQSxHQUFBSCxzQkFBQSxDQUFBQyxPQUFBO0FBRkE7QUFDQTs7QUFJTyxJQUFNRyxhQUFhLEdBQUdDLG1CQUFPLENBQUNDLE1BQU0sQ0FBQyxDQUFDO0FBQUNDLE9BQUEsQ0FBQUgsYUFBQSxHQUFBQSxhQUFBO0FBRTlDQSxhQUFhLENBQUNJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQ0MsR0FBRyxDQUFDQyxtQkFBaUIsQ0FBQ0Msa0JBQWtCLENBQUM7QUFDbkVQLGFBQWEsQ0FBQ0ksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDQyxHQUFHLENBQUNDLG1CQUFpQixDQUFDRSw4QkFBOEIsQ0FBQztBQUMvRVIsYUFBYSxDQUFDSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUNDLEdBQUcsQ0FBQ0MsbUJBQWlCLENBQUNHLGlDQUFpQyxDQUFDO0FBQ3BGVCxhQUFhLENBQUNJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQ0MsR0FBRyxDQUFDQyxtQkFBaUIsQ0FBQ0ksc0JBQXNCLENBQUM7QUFDekVWLGFBQWEsQ0FBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDQyxHQUFHLENBQUNDLG1CQUFpQixDQUFDSywwQkFBMEIsQ0FBQztBQUM3RVgsYUFBYSxDQUFDSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUNDLEdBQUcsQ0FBQ0MsbUJBQWlCLENBQUNNLGtCQUFrQixDQUFDO0FBQ3BFWixhQUFhLENBQUNJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQ0MsR0FBRyxDQUFDQyxtQkFBaUIsQ0FBQ08sZUFBZSxDQUFDO0FBQ3BFYixhQUFhLENBQUNJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQ1UsSUFBSSxDQUFDQyxxQkFBTSxDQUFDQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUVWLG1CQUFpQixDQUFDVyxVQUFVLENBQUM7QUFDdEZqQixhQUFhLENBQUNJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDQyxHQUFHLENBQUVDLG1CQUFpQixDQUFDWSxLQUFLLENBQUM7QUFDbkVsQixhQUFhLENBQUNJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQ0MsR0FBRyxDQUFFQyxtQkFBaUIsQ0FBQ2EscUJBQXFCLENBQUM7QUFDekVuQixhQUFhLENBQUNJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDQyxHQUFHLENBQUVDLG1CQUFpQixDQUFDYyxpQkFBaUIsQ0FBQztBQUNuRnBCLGFBQWEsQ0FBQ0ksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDVSxJQUFJLENBQUVDLHFCQUFNLENBQUNDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRVYsbUJBQWlCLENBQUNlLE1BQU0sQ0FBQztBQUN0RnJCLGFBQWEsQ0FBQ0ksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUNDLEdBQUcsQ0FBRUMsbUJBQWlCLENBQUNnQix3QkFBd0IsQ0FBQztBQUM3RnRCLGFBQWEsQ0FBQ0ksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDQyxHQUFHLENBQUVDLG1CQUFpQixDQUFDaUIsc0JBQXNCLENBQUM7QUFDN0V2QixhQUFhLENBQUNJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDQyxHQUFHLENBQUVDLG1CQUFpQixDQUFDQyxrQkFBa0IsQ0FBQztBQUNqRlAsYUFBYSxDQUFDSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQ0MsR0FBRyxDQUFFQyxtQkFBaUIsQ0FBQ2tCLHFCQUFxQixDQUFDO0FBQ3ZGeEIsYUFBYSxDQUFDSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQ1UsSUFBSSxDQUFFUixtQkFBaUIsQ0FBQ21CLGVBQWUsQ0FBQztBQUM5RXpCLGFBQWEsQ0FBQ0ksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUNDLEdBQUcsQ0FBRUMsbUJBQWlCLENBQUNvQixlQUFlLENBQUM7QUFDbEYxQixhQUFhLENBQUNJLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBTyxDQUFFRSxtQkFBaUIsQ0FBQ3FCLGFBQWEsQ0FBQztBQUN2RTNCLGFBQWEsQ0FBQ0ksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDVSxJQUFJLENBQUNSLG1CQUFpQixDQUFDc0IsaUJBQWlCLENBQUM7QUFDeEU1QixhQUFhLENBQUNJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDQyxHQUFHLENBQUVDLG1CQUFpQixDQUFDdUIsa0JBQWtCLENBQUM7QUFDdEY3QixhQUFhLENBQUNJLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQ1UsSUFBSSxDQUFDQyxxQkFBTSxDQUFDZSxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFeEIsbUJBQWlCLENBQUN5QixtQkFBbUIsQ0FBQztBQUN4Ry9CLGFBQWEsQ0FBQ0ksS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDQyxHQUFHLENBQUVDLG1CQUFpQixDQUFDMEIsV0FBVyxDQUFDO0FBQ3ZFaEMsYUFBYSxDQUFDSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsVUFBTyxDQUFFRSxtQkFBaUIsQ0FBQzJCLGlCQUFpQixDQUFDO0FBQ3hGakMsYUFBYSxDQUFDSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUNDLEdBQUcsQ0FBQ0MsbUJBQWlCLENBQUM0QixjQUFjLENBQUM7O0FBRWxFO0FBQ0FsQyxhQUFhLENBQUNJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDQyxHQUFHLENBQUVDLG1CQUFpQixDQUFDNkIscUJBQXFCLENBQUM7QUFDekZuQyxhQUFhLENBQUNJLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQ0MsR0FBRyxDQUFFQyxtQkFBaUIsQ0FBQzhCLGlCQUFpQixDQUFDO0FBQ3pFcEMsYUFBYSxDQUFDSSxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUNDLEdBQUcsQ0FBRUMsbUJBQWlCLENBQUMrQixtQkFBbUIsQ0FBQztBQUM5RXJDLGFBQWEsQ0FBQ0ksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUNVLElBQUksQ0FBRVIsbUJBQWlCLENBQUNnQyxnQkFBZ0IsQ0FBQztBQUNsRnRDLGFBQWEsQ0FBQ0ksS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUNVLElBQUksQ0FBRVIsbUJBQWlCLENBQUNpQyxxQkFBcUIsQ0FBQzs7QUFFakc7QUFDQXZDLGFBQWEsQ0FBQ0ksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUNDLEdBQUcsQ0FBRUMsbUJBQWlCLENBQUNrQyxrQkFBa0IsQ0FBQzs7QUFFeEY7QUFDQXhDLGFBQWEsQ0FBQ0ksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUNVLElBQUksQ0FBRVIsbUJBQWlCLENBQUNtQyxxQkFBcUIsQ0FBQzs7QUFHckY7QUFDQXpDLGFBQWEsQ0FBQ0ksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUNVLElBQUksQ0FBRVIsbUJBQWlCLENBQUNvQyxxQkFBcUIsQ0FBQyJ9