import express from 'express';
import productController from './product.controller';
// import { sanitize } from '../../../middleware/sanitizer';
// import { jwtStrategy } from '../../../middleware/strategy';
import upload, { compressAndConvertToJpg, compressAndConvertToJpgSingle } from '../../../awsbucket';
import authenticateJWT from '../../../middleware/verify_token';
import waterController from '../watermark/water.controller';
import convertWebPToJpeg from '../../../middleware/convertWebPtoJpg';
import { addWatermarkMiddleware } from '../../../middleware/coverImgToWatermark';
import { addWatermarkMiddlewareMultiple } from '../../../middleware/coverImgToWatermarkMultiple';
import checkFileExist from '../../../middleware/checkFileExist';


export const productRouter = express.Router();

productRouter.route("/d").get(productController.getProductListById)
productRouter.route("/c").get(productController.getProductListByCategoryClient)
productRouter.route("/c/c").get(productController.getProductListByCategoryClientWeb)
productRouter.route("/s/h").get(productController.getProductSuggestHotel)
productRouter.route("/s/a").get(productController.getProductSuggestApartment)
productRouter.route("/sg").get(productController.getProductSuggest2)
productRouter.route("/photo").get(productController.getPhotoProduct)
productRouter.route('/add').post(upload.single('photo'), convertWebPToJpeg, addWatermarkMiddleware, compressAndConvertToJpgSingle, authenticateJWT, productController.addProduct);
productRouter.route('/update').post( upload.single('photo'), compressAndConvertToJpgSingle, authenticateJWT, productController.update);
// productRouter.route('/getAllproduct').get( productController.index);
productRouter.route('/getAllproductList').get( productController.getAllProductList);
productRouter.route('/c/s').get( productController.getAllProductCategory);
productRouter.route('/filter').get( productController.getProductListByFilter);
productRouter.route('/getProductByCategory').get( productController.getProductListByCategory);
productRouter.route('/getProductById').get( productController.getProductListById);
productRouter.route('/user/manage').get( productController.getProductUserManage);
productRouter.route('/getWebProductById').get( productController.getWebProductListById);
productRouter.route('/product-offer').post( productController.addProductOffer);
productRouter.route('/getAllProductOffer').get( productController.getProductOffer);
productRouter.route('/delete').delete(authenticateJWT, productController.productDelete);
productRouter.route("/d/bulk").post(productController.productDeleteBulk)
productRouter.route('/deleteOfferById/:id').get( productController.productOfferDelete);
productRouter.route('/upload-img').post(upload.array('file', 10), checkFileExist, addWatermarkMiddlewareMultiple, compressAndConvertToJpg, productController.multiplePhotoUpload);
productRouter.route('/getAllPhoto').get( productController.getAllPhoto);
productRouter.route('/slider-photo/delete').delete( productController.deleteSliderPhoto);
productRouter.route("/size").get(productController.getSizeProduct)

//Category by product
productRouter.route('/getAllGroceryStaple').get( productController.getAllGrocerryStaples);
productRouter.route('/suggest').get( productController.getProductSuggest);
productRouter.route('/list/:slug').get( productController.getAllProductBySlug);
productRouter.route('/getAllByCategory').post( productController.GetAllByCategory);
productRouter.route('/getallProductbySubChildCat').post( productController.getProductSubChildCat);

// Filter product
productRouter.route('/gcatalogsearch/result').get( productController.getFilterbyProduct);

//new api
productRouter.route('/search_product').post( productController.searchProductBySubCat);


//aws image delete
productRouter.route('/aws/delete/photo').post( productController.awsProductPhotoDelete);

productRouter.route("/history/edit").get(authenticateJWT, productController.getHistoryEditProduct)
productRouter.route("/manage/by/user").get(authenticateJWT, productController.getProductManageByUser)

productRouter.route("/serverside/d").get(productController.getProductListByIdMeta)
