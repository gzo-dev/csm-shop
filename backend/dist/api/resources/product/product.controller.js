"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _models = require("../../../models");
var _config = _interopRequireDefault(require("../../../config"));
var _awsSdk = _interopRequireDefault(require("aws-sdk"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _require = require("sequelize"),
  Op = _require.Op,
  Sequelize = _require.Sequelize;
// import { queue } from '../../../kue';

var s3 = new _awsSdk["default"].S3({
  accessKeyId: _config["default"].app.AWS_ACCESS_KEY,
  secretAccessKey: _config["default"].app.AWS_SECRET_KEY
});
var deleteFileFromS3 = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(imgUrl) {
    var lastItem, params;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          try {
            lastItem = imgUrl.substring(imgUrl.lastIndexOf("/") + 1);
            params = {
              Bucket: "photoabhi",
              Key: lastItem
            };
            s3.deleteObject(params, function (error, data) {
              if (error) {
                console.log(error, error.stack);
              }
              return data;
            });
          } catch (error) {
            assert.isNotOk(error, "Promise error");
            done();
          }
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function deleteFileFromS3(_x) {
    return _ref.apply(this, arguments);
  };
}();
var _default = {
  /* Add user api start here................................*/getPhotoProduct: function getPhotoProduct(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var productId;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            productId = req.query.productId;
            _models.db.productphoto.findAll({
              where: {
                productId: productId
              }
            }).then(function (product) {
              return res.status(200).json({
                ok: true,
                data: product
              });
            });
          case 2:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  },
  addProduct: function addProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var _req$body, categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, sortDesc, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice, image, size, newaddimage;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body = req.body, categoryId = _req$body.categoryId, subCategoryId = _req$body.subCategoryId, childCategoryId = _req$body.childCategoryId, name = _req$body.name, slug = _req$body.slug, brand = _req$body.brand, status = _req$body.status, unitSize = _req$body.unitSize, sortDesc = _req$body.sortDesc, desc = _req$body.desc, buyerPrice = _req$body.buyerPrice, price = _req$body.price, qty = _req$body.qty, discount = _req$body.discount, discountPer = _req$body.discountPer, total = _req$body.total, netPrice = _req$body.netPrice, image = _req$body.image, size = _req$body.size, newaddimage = _req$body.newaddimage;
            _models.db.product.create({
              categoryId: categoryId,
              subCategoryId: subCategoryId,
              childCategoryId: childCategoryId || 0,
              name: name,
              slug: slug,
              status: parseInt(status) ? "active" : "inactive",
              brand: brand,
              unitSize: unitSize,
              sortDesc: sortDesc,
              desc: desc,
              buyerPrice: buyerPrice,
              price: price,
              qty: qty,
              discount: discount,
              discountPer: discountPer,
              total: total,
              netPrice: netPrice,
              photo: req.file ? req.file.path : ""
            }).then(function (product) {
              var _JSON$parse, _JSON$parse3;
              (_JSON$parse = JSON.parse(image)) === null || _JSON$parse === void 0 ? void 0 : _JSON$parse.map(function (item) {
                return _models.db.productphoto.create({
                  imgUrl: item === null || item === void 0 ? void 0 : item.path,
                  productId: product.dataValues.id
                });
              });
              if (newaddimage) {
                var _JSON$parse2;
                (_JSON$parse2 = JSON.parse(newaddimage)) === null || _JSON$parse2 === void 0 ? void 0 : _JSON$parse2.map(function (item) {
                  return _models.db.productphoto.create({
                    imgUrl: item === null || item === void 0 ? void 0 : item.imageUrl,
                    productId: productId
                  });
                });
              }
              (_JSON$parse3 = JSON.parse(size)) === null || _JSON$parse3 === void 0 ? void 0 : _JSON$parse3.map(function (item) {
                return _models.db.productsize.create({
                  size: item === null || item === void 0 ? void 0 : item.size,
                  productId: product.dataValues.id,
                  amount: item === null || item === void 0 ? void 0 : item.amount
                });
              });
              res.status(200).json({
                success: true,
                msg: "Successfully inserted product"
              });
            })["catch"](function (err) {
              console.log(err);
              next(err);
            });
            _context3.next = 8;
            break;
          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(500).json(_context3.t0));
          case 8:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 5]]);
    }))();
  },
  index: function index(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var _req$query, supplierId, categoryId, subCategoryId;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$query = req.query, supplierId = _req$query.supplierId, categoryId = _req$query.categoryId, subCategoryId = _req$query.subCategoryId;
            _models.db.product.findAll({
              order: [["createdAt", "DESC"]],
              where: {
                supplierId: supplierId,
                categoryId: categoryId,
                subCategoryId: subCategoryId
              }
            }).then(function (product) {
              res.status(200).json({
                success: true,
                product: product
              });
            })["catch"](function (err) {
              next(err);
            });
            _context4.next = 8;
            break;
          case 5:
            _context4.prev = 5;
            _context4.t0 = _context4["catch"](0);
            throw new RequestError("Error");
          case 8:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 5]]);
    }))();
  },
  getAllProductList: function getAllProductList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _models.db.product.findAll({
              order: [["createdAt", "DESC"]],
              include: [{
                model: _models.db.SubCategory,
                attributes: ["id", "sub_name"],
                include: [{
                  model: _models.db.category,
                  attributes: ["id", "name"]
                }]
              }]
            }).then(function (product) {
              res.status(200).json({
                success: true,
                product: product
              });
            })["catch"](function (err) {
              next(err);
            });
            _context5.next = 7;
            break;
          case 4:
            _context5.prev = 4;
            _context5.t0 = _context5["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 4]]);
    }))();
  },
  update: function update(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var _req$body2, _productId, categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice, images, size, newaddimage;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _req$body2 = req.body, _productId = _req$body2.productId, categoryId = _req$body2.categoryId, subCategoryId = _req$body2.subCategoryId, childCategoryId = _req$body2.childCategoryId, name = _req$body2.name, slug = _req$body2.slug, brand = _req$body2.brand, status = _req$body2.status, unitSize = _req$body2.unitSize, desc = _req$body2.desc, buyerPrice = _req$body2.buyerPrice, price = _req$body2.price, qty = _req$body2.qty, discount = _req$body2.discount, discountPer = _req$body2.discountPer, total = _req$body2.total, netPrice = _req$body2.netPrice, images = _req$body2.images, size = _req$body2.size, newaddimage = _req$body2.newaddimage;
            _models.db.product.findOne({
              where: {
                id: _productId
              }
            }).then(function (product) {
              if (product) {
                return _models.db.product.update({
                  categoryId: categoryId ? categoryId : product.categoryId,
                  subCategoryId: subCategoryId ? subCategoryId : product.subCategoryId,
                  childCategoryId: childCategoryId ? childCategoryId : product.childCategoryId,
                  name: name,
                  slug: slug,
                  status: parseInt(status) ? "active" : "inactive",
                  brand: brand,
                  unitSize: unitSize,
                  desc: desc,
                  buyerPrice: buyerPrice,
                  price: price,
                  qty: qty,
                  discount: discount,
                  discountPer: discountPer,
                  total: total,
                  netPrice: netPrice,
                  photo: req.file ? req.file.location : product.photo
                }, {
                  where: {
                    id: _productId
                  }
                });
              }
              throw new RequestError("Not Found Product", 409);
            }).then(function (p) {
              if (newaddimage) {
                var _JSON$parse4;
                (_JSON$parse4 = JSON.parse(newaddimage)) === null || _JSON$parse4 === void 0 ? void 0 : _JSON$parse4.map(function (item) {
                  return _models.db.productphoto.create({
                    imgUrl: item === null || item === void 0 ? void 0 : item.imageUrl,
                    productId: _productId
                  });
                });
              }
              if (size) {
                _models.db.productsize.destroy({
                  where: {
                    productId: _productId
                  }
                });
                _models.db.productsize.bulkCreate(JSON.parse(size).map(function (_ref2) {
                  var size = _ref2.size,
                    amount = _ref2.amount;
                  return {
                    size: size,
                    amount: amount,
                    productId: _productId
                  };
                }));
              }
              if (images) {
                _models.db.productphoto.destroy({
                  where: {
                    productId: _productId
                  }
                });
                _models.db.productphoto.bulkCreate(JSON.parse(images).map(function (item) {
                  return _objectSpread(_objectSpread({}, item), {}, {
                    productId: _productId
                  });
                }));
              }
              res.status(200).json({
                success: true,
                msg: "Updated Successfully"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context6.next = 8;
            break;
          case 5:
            _context6.prev = 5;
            _context6.t0 = _context6["catch"](0);
            throw new RequestError("Error");
          case 8:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 5]]);
    }))();
  },
  getProductListByCategory: function getProductListByCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _models.db.product.findAll({
              order: [["createdAt", "DESC"]],
              where: {
                categoryId: req.query.categoryId,
                subCategoryId: req.query.subCategoryId
              }
            }).then(function (list) {
              res.status(200).json({
                success: true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context7.next = 7;
            break;
          case 4:
            _context7.prev = 4;
            _context7.t0 = _context7["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 4]]);
    }))();
  },
  getProductListById: function getProductListById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _models.db.product.findAll({
              where: {
                id: req.query.id
              },
              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }],
              order: [["createdAt", "DESC"]]
            }).then(function (list) {
              res.status(200).json({
                success: true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context8.next = 7;
            break;
          case 4:
            _context8.prev = 4;
            _context8.t0 = _context8["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 4]]);
    }))();
  },
  getWebProductListById: function getWebProductListById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var size;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _models.db.productsize.findAll({
              where: {
                productId: req.query.id
              }
            });
          case 3:
            size = _context9.sent;
            _models.db.product.findOne({
              where: {
                id: req.query.id
              },
              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }],
              order: [["createdAt", "DESC"]]
            }).then(function (list) {
              res.status(200).json({
                success: true,
                data: list,
                datasize: size
              });
            })["catch"](function (err) {
              next(err);
            });
            _context9.next = 10;
            break;
          case 7:
            _context9.prev = 7;
            _context9.t0 = _context9["catch"](0);
            throw new RequestError("Error");
          case 10:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 7]]);
    }))();
  },
  addProductOffer: function addProductOffer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var _req$body3, _productId2, qty, discount_per, discount_price, total, net_price;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _req$body3 = req.body, _productId2 = _req$body3.productId, qty = _req$body3.qty, discount_per = _req$body3.discount_per, discount_price = _req$body3.discount_price, total = _req$body3.total, net_price = _req$body3.net_price;
            _models.db.ProductOffer.findOne({
              where: {
                id: _productId2
              }
            }).then(function (list) {
              if (!list) {
                return _models.db.ProductOffer.create({
                  productId: _productId2,
                  image: req.file ? req.file.location : "",
                  qty: qty,
                  discount_per: discount_per,
                  discount_price: discount_price,
                  total: total,
                  net_price: net_price
                });
              } else {
                return _models.db.ProductOffer.update({
                  qty: qty,
                  discount_per: discount_per,
                  discount_price: discount_price,
                  total: total,
                  net_price: net_price
                }, {
                  where: {
                    id: list.id
                  }
                });
              }
            }).then(function (p) {
              res.status(200).json({
                success: true,
                msg: "Successfully"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context10.next = 8;
            break;
          case 5:
            _context10.prev = 5;
            _context10.t0 = _context10["catch"](0);
            throw new RequestError("Error");
          case 8:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 5]]);
    }))();
  },
  getProductOffer: function getProductOffer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _models.db.ProductOffer.findAll({
              include: [{
                model: _models.db.product,
                attributes: ["id", "categoryId", "price", "item_name", "description", "brand"],
                include: [{
                  model: _models.db.category,
                  attributes: ["id", "name"]
                }]
              }]
            }).then(function (list) {
              res.status(200).json({
                success: true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context11.next = 7;
            break;
          case 4:
            _context11.prev = 4;
            _context11.t0 = _context11["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[0, 4]]);
    }))();
  },
  searchProductBySubCat: function searchProductBySubCat(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _models.db.SubCategory.findOne({
              where: {
                sub_name: req.body.subCat
              }
            }).then(function (data) {
              if (data) {
                return _models.db.product.findAll({
                  where: {
                    subCategoryId: data.id
                  }
                });
              }
            }).then(function (list) {
              console.log(JSON.stringify(list));
              res.status(200).json({
                success: true,
                data: list
              });
            });
            _context12.next = 7;
            break;
          case 4:
            _context12.prev = 4;
            _context12.t0 = _context12["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context12.stop();
        }
      }, _callee12, null, [[0, 4]]);
    }))();
  },
  productDelete: function productDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _models.db.product.findOne({
              where: {
                id: parseInt(req.query.id)
              }
            }).then(function (product) {
              if (product) {
                return _models.db.product.destroy({
                  where: {
                    id: product.id
                  }
                });
              }
              throw new RequestError("Product is not found");
            }).then(function (re) {
              return res.status(200).json({
                status: "deleted Product Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
          case 1:
          case "end":
            return _context13.stop();
        }
      }, _callee13);
    }))();
  },
  productOfferDelete: function productOfferDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            _models.db.ProductOffer.findOne({
              where: {
                id: parseInt(req.params.id)
              }
            }).then(function (product) {
              if (product) {
                return _models.db.ProductOffer.destroy({
                  where: {
                    id: product.id
                  }
                });
              }
              throw new RequestError("Product is not found");
            }).then(function (re) {
              return res.status(200).json({
                status: "deleted Product Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
          case 1:
          case "end":
            return _context14.stop();
        }
      }, _callee14);
    }))();
  },
  multiplePhotoUpload: function multiplePhotoUpload(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
      var attachmentEntries, productId, i;
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            attachmentEntries = [];
            productId = req.body.productId;
            for (i = 0; i < req.files.length; i++) {
              attachmentEntries.push({
                productId: productId,
                name: req.files[i].filename,
                mime: req.files[i].mimetype,
                imgUrl: req.files[i].path
              });
            }
            _models.db.product.findOne({
              where: {
                id: productId
              }
            }).then(function (r) {
              if (r) {
                // return queue.create('img-upload', {
                //     productId: productId,
                //     productName: r.item_name,
                //     attachmentEntries: attachmentEntries,
                // }).save();
                for (var i = 0; i < req.files.length; i++) {
                  _models.db.productphoto.create(_objectSpread({}, attachmentEntries[i]));
                }
              }
            }).then(function (r) {
              res.status(200).json({
                success: true,
                data: req.files
              });
            })["catch"](function (error) {
              console.log(error);
              res.status(500).json({
                errors: ["Error insert photo"]
              });
            });
          case 4:
          case "end":
            return _context15.stop();
        }
      }, _callee15);
    }))();
  },
  getAllPhoto: function getAllPhoto(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            _models.db.product.findAll({
              order: [["createdAt", "DESC"]],
              attributes: ["id", "name", "brand"],
              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }]
            }).then(function (data) {
              res.status(200).json({
                success: true,
                data: data
              });
            })["catch"](function (err) {
              next(err);
            });
            _context16.next = 7;
            break;
          case 4:
            _context16.prev = 4;
            _context16.t0 = _context16["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context16.stop();
        }
      }, _callee16, null, [[0, 4]]);
    }))();
  },
  deleteSliderPhoto: function deleteSliderPhoto(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            _models.db.productphoto.findOne({
              where: {
                id: parseInt(req.query.id)
              }
            }).then(function (product) {
              if (product) {
                return _models.db.productphoto.destroy({
                  where: {
                    id: req.query.id
                  }
                });
              }
              throw new RequestError("Product is not found");
            }).then(function (re) {
              return res.status(200).json({
                status: "deleted Product Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
          case 1:
          case "end":
            return _context17.stop();
        }
      }, _callee17);
    }))();
  },
  //All GroceryStample product
  // edit to sale product
  getAllGrocerryStaples: function getAllGrocerryStaples(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            _models.db.product.findAll({
              // attributes: ["id", "slug"],
              // where: { discount: 'grocery-staple' },
              order: [["discountPer", "DESC"]],
              limit: 8
            }).then(function (product) {
              res.status(200).json({
                success: true,
                data: product || []
              });
            })["catch"](function (err) {
              next(err);
            });
            _context18.next = 7;
            break;
          case 4:
            _context18.prev = 4;
            _context18.t0 = _context18["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context18.stop();
        }
      }, _callee18, null, [[0, 4]]);
    }))();
  },
  getAllProductBySlug: function getAllProductBySlug(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) switch (_context19.prev = _context19.next) {
          case 0:
            _context19.prev = 0;
            _models.db.category.findOne({
              attributes: ["id"],
              include: [{
                model: _models.db.product,
                order: [["createdAt", "DESC"]],
                include: [{
                  model: _models.db.productphoto,
                  attributes: ["id", "imgUrl"]
                }]
              }]
            }).then(function (product) {
              res.status(200).json({
                success: true,
                data: product
              });
            })["catch"](function (err) {
              next(err);
            });
            _context19.next = 7;
            break;
          case 4:
            _context19.prev = 4;
            _context19.t0 = _context19["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context19.stop();
        }
      }, _callee19, null, [[0, 4]]);
    }))();
  },
  // filter product
  getFilterbyProduct: function getFilterbyProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
      var search;
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
          case 0:
            _context20.prev = 0;
            search = "%%";
            if (req.query.search) {
              search = "%" + req.query.search + "%";
            }
            _models.db.SubCategory.findAll({
              attributes: ["id", "sub_name"],
              include: [{
                model: _models.db.product,
                order: [["createdAt", "DESC"]],
                required: true,
                where: (0, _defineProperty2["default"])({}, Op.or, [{
                  name: (0, _defineProperty2["default"])({}, Op.like, search),
                  slug: (0, _defineProperty2["default"])({}, Op.like, search)
                }])
              }]
            }).then(function (product) {
              res.status(200).json({
                success: true,
                data: product
              });
            })["catch"](function (err) {
              next(err);
            });
            _context20.next = 9;
            break;
          case 6:
            _context20.prev = 6;
            _context20.t0 = _context20["catch"](0);
            throw new RequestError("Error");
          case 9:
          case "end":
            return _context20.stop();
        }
      }, _callee20, null, [[0, 6]]);
    }))();
  },
  GetAllByCategory: function GetAllByCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
      return _regenerator["default"].wrap(function _callee21$(_context21) {
        while (1) switch (_context21.prev = _context21.next) {
          case 0:
            _context21.prev = 0;
            _models.db.SubCategory.findOne({
              where: {
                sub_name: req.body.name
              },
              include: [{
                model: _models.db.SubChildCategory,
                include: [{
                  model: _models.db.product,
                  order: [["createdAt", "DESC"]],
                  include: [{
                    model: _models.db.productphoto,
                    attributes: ["id", "imgUrl"]
                  }]
                }]
              }]
            }).then(function (product) {
              res.status(200).json({
                success: true,
                data: product
              });
            })["catch"](function (err) {
              next(err);
            });
            _context21.next = 7;
            break;
          case 4:
            _context21.prev = 4;
            _context21.t0 = _context21["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context21.stop();
        }
      }, _callee21, null, [[0, 4]]);
    }))();
  },
  // aws image delete
  awsProductPhotoDelete: function awsProductPhotoDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
      var _req$body4, id, imgUrl;
      return _regenerator["default"].wrap(function _callee22$(_context22) {
        while (1) switch (_context22.prev = _context22.next) {
          case 0:
            try {
              _req$body4 = req.body, id = _req$body4.id, imgUrl = _req$body4.imgUrl; // db.productphoto.destroy({where: {imgUrl, id}})
              // deleteFileFromS3(imgUrl)
              _models.db.productphoto.destroy({
                where: {
                  id: id
                }
              }).then(function (success) {
                res.status(200).json({
                  success: true,
                  msg: "Successflly deleted image from s3 Bucket"
                });
              });
            } catch (err) {
              next(err);
              // res.status(500).json({ 'success':false, msg: err})
            }
          case 1:
          case "end":
            return _context22.stop();
        }
      }, _callee22);
    }))();
  },
  getProductSubChildCat: function getProductSubChildCat(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
      var _req$body5, subCategoryId, childCategoryId;
      return _regenerator["default"].wrap(function _callee23$(_context23) {
        while (1) switch (_context23.prev = _context23.next) {
          case 0:
            try {
              _req$body5 = req.body, subCategoryId = _req$body5.subCategoryId, childCategoryId = _req$body5.childCategoryId;
              _models.db.product.findAll({
                where: {
                  childCategoryId: childCategoryId,
                  subCategoryId: childCategoryId
                }
              }).then(function (product) {
                res.status(200).json({
                  success: true,
                  data: product
                });
              })["catch"](function (err) {
                next(err);
              });
            } catch (err) {
              next(err);
              // res.status(500).json({ 'success':false, msg: err})
            }
          case 1:
          case "end":
            return _context23.stop();
        }
      }, _callee23);
    }))();
  },
  getProductSuggest: function getProductSuggest(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24() {
      return _regenerator["default"].wrap(function _callee24$(_context24) {
        while (1) switch (_context24.prev = _context24.next) {
          case 0:
            try {
              // const{ subCategoryId, childCategoryId } = req.body;
              _models.db.product.findAll({
                // where: { childCategoryId: childCategoryId, subCategoryId: childCategoryId },
                order: Sequelize.literal("RAND()"),
                limit: 8
              }).then(function (product) {
                res.status(200).json({
                  success: true,
                  data: product
                });
              })["catch"](function (err) {
                console.log(err);
                next(err);
              });
            } catch (err) {
              next(err);
              // res.status(500).json({ 'success':false, msg: err})
            }
          case 1:
          case "end":
            return _context24.stop();
        }
      }, _callee24);
    }))();
  },
  getSizeProduct: function getSizeProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25() {
      var _productId3;
      return _regenerator["default"].wrap(function _callee25$(_context25) {
        while (1) switch (_context25.prev = _context25.next) {
          case 0:
            try {
              _productId3 = req.query.productId;
              _models.db.productsize.findAll({
                where: {
                  productId: _productId3
                }
              }).then(function (product) {
                res.status(200).json({
                  success: true,
                  data: product
                });
              })["catch"](function (err) {
                console.log(err);
                next(err);
              });
            } catch (err) {
              next(err);
              res.status(500).json({
                success: false,
                msg: err
              });
            }
          case 1:
          case "end":
            return _context25.stop();
        }
      }, _callee25);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9jb25maWciLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX2F3c1NkayIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiX3JlcXVpcmUiLCJPcCIsIlNlcXVlbGl6ZSIsInMzIiwiQVdTIiwiUzMiLCJhY2Nlc3NLZXlJZCIsImNvbmZpZyIsImFwcCIsIkFXU19BQ0NFU1NfS0VZIiwic2VjcmV0QWNjZXNzS2V5IiwiQVdTX1NFQ1JFVF9LRVkiLCJkZWxldGVGaWxlRnJvbVMzIiwiX3JlZiIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwiaW1nVXJsIiwibGFzdEl0ZW0iLCJwYXJhbXMiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0Iiwic3Vic3RyaW5nIiwibGFzdEluZGV4T2YiLCJCdWNrZXQiLCJLZXkiLCJkZWxldGVPYmplY3QiLCJlcnJvciIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwic3RhY2siLCJhc3NlcnQiLCJpc05vdE9rIiwiZG9uZSIsInN0b3AiLCJfeCIsIl9kZWZhdWx0IiwiZ2V0UGhvdG9Qcm9kdWN0IiwicmVxIiwicmVzIiwiX2NhbGxlZTIiLCJwcm9kdWN0SWQiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJxdWVyeSIsImRiIiwicHJvZHVjdHBob3RvIiwiZmluZEFsbCIsIndoZXJlIiwidGhlbiIsInByb2R1Y3QiLCJzdGF0dXMiLCJqc29uIiwib2siLCJhZGRQcm9kdWN0IiwiX2NhbGxlZTMiLCJfcmVxJGJvZHkiLCJjYXRlZ29yeUlkIiwic3ViQ2F0ZWdvcnlJZCIsImNoaWxkQ2F0ZWdvcnlJZCIsIm5hbWUiLCJzbHVnIiwiYnJhbmQiLCJ1bml0U2l6ZSIsInNvcnREZXNjIiwiZGVzYyIsImJ1eWVyUHJpY2UiLCJwcmljZSIsInF0eSIsImRpc2NvdW50IiwiZGlzY291bnRQZXIiLCJ0b3RhbCIsIm5ldFByaWNlIiwiaW1hZ2UiLCJzaXplIiwibmV3YWRkaW1hZ2UiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJib2R5IiwiY3JlYXRlIiwicGFyc2VJbnQiLCJwaG90byIsImZpbGUiLCJwYXRoIiwiX0pTT04kcGFyc2UiLCJfSlNPTiRwYXJzZTMiLCJKU09OIiwicGFyc2UiLCJtYXAiLCJpdGVtIiwiZGF0YVZhbHVlcyIsImlkIiwiX0pTT04kcGFyc2UyIiwiaW1hZ2VVcmwiLCJwcm9kdWN0c2l6ZSIsImFtb3VudCIsInN1Y2Nlc3MiLCJtc2ciLCJlcnIiLCJ0MCIsImFicnVwdCIsImluZGV4IiwiX2NhbGxlZTQiLCJfcmVxJHF1ZXJ5Iiwic3VwcGxpZXJJZCIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsIm9yZGVyIiwiUmVxdWVzdEVycm9yIiwiZ2V0QWxsUHJvZHVjdExpc3QiLCJfY2FsbGVlNSIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsImluY2x1ZGUiLCJtb2RlbCIsIlN1YkNhdGVnb3J5IiwiYXR0cmlidXRlcyIsImNhdGVnb3J5IiwidXBkYXRlIiwiX2NhbGxlZTYiLCJfcmVxJGJvZHkyIiwiX3Byb2R1Y3RJZCIsImltYWdlcyIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImZpbmRPbmUiLCJsb2NhdGlvbiIsInAiLCJfSlNPTiRwYXJzZTQiLCJkZXN0cm95IiwiYnVsa0NyZWF0ZSIsIl9yZWYyIiwiZ2V0UHJvZHVjdExpc3RCeUNhdGVnb3J5IiwiX2NhbGxlZTciLCJfY2FsbGVlNyQiLCJfY29udGV4dDciLCJsaXN0IiwiZ2V0UHJvZHVjdExpc3RCeUlkIiwiX2NhbGxlZTgiLCJfY2FsbGVlOCQiLCJfY29udGV4dDgiLCJnZXRXZWJQcm9kdWN0TGlzdEJ5SWQiLCJfY2FsbGVlOSIsIl9jYWxsZWU5JCIsIl9jb250ZXh0OSIsInNlbnQiLCJkYXRhc2l6ZSIsImFkZFByb2R1Y3RPZmZlciIsIl9jYWxsZWUxMCIsIl9yZXEkYm9keTMiLCJfcHJvZHVjdElkMiIsImRpc2NvdW50X3BlciIsImRpc2NvdW50X3ByaWNlIiwibmV0X3ByaWNlIiwiX2NhbGxlZTEwJCIsIl9jb250ZXh0MTAiLCJQcm9kdWN0T2ZmZXIiLCJnZXRQcm9kdWN0T2ZmZXIiLCJfY2FsbGVlMTEiLCJfY2FsbGVlMTEkIiwiX2NvbnRleHQxMSIsInNlYXJjaFByb2R1Y3RCeVN1YkNhdCIsIl9jYWxsZWUxMiIsIl9jYWxsZWUxMiQiLCJfY29udGV4dDEyIiwic3ViX25hbWUiLCJzdWJDYXQiLCJzdHJpbmdpZnkiLCJwcm9kdWN0RGVsZXRlIiwiX2NhbGxlZTEzIiwiX2NhbGxlZTEzJCIsIl9jb250ZXh0MTMiLCJyZSIsInByb2R1Y3RPZmZlckRlbGV0ZSIsIl9jYWxsZWUxNCIsIl9jYWxsZWUxNCQiLCJfY29udGV4dDE0IiwibXVsdGlwbGVQaG90b1VwbG9hZCIsIl9jYWxsZWUxNSIsImF0dGFjaG1lbnRFbnRyaWVzIiwiX2NhbGxlZTE1JCIsIl9jb250ZXh0MTUiLCJmaWxlcyIsImZpbGVuYW1lIiwibWltZSIsIm1pbWV0eXBlIiwiciIsImVycm9ycyIsImdldEFsbFBob3RvIiwiX2NhbGxlZTE2IiwiX2NhbGxlZTE2JCIsIl9jb250ZXh0MTYiLCJkZWxldGVTbGlkZXJQaG90byIsIl9jYWxsZWUxNyIsIl9jYWxsZWUxNyQiLCJfY29udGV4dDE3IiwiZ2V0QWxsR3JvY2VycnlTdGFwbGVzIiwiX2NhbGxlZTE4IiwiX2NhbGxlZTE4JCIsIl9jb250ZXh0MTgiLCJsaW1pdCIsImdldEFsbFByb2R1Y3RCeVNsdWciLCJfY2FsbGVlMTkiLCJfY2FsbGVlMTkkIiwiX2NvbnRleHQxOSIsImdldEZpbHRlcmJ5UHJvZHVjdCIsIl9jYWxsZWUyMCIsInNlYXJjaCIsIl9jYWxsZWUyMCQiLCJfY29udGV4dDIwIiwicmVxdWlyZWQiLCJvciIsImxpa2UiLCJHZXRBbGxCeUNhdGVnb3J5IiwiX2NhbGxlZTIxIiwiX2NhbGxlZTIxJCIsIl9jb250ZXh0MjEiLCJTdWJDaGlsZENhdGVnb3J5IiwiYXdzUHJvZHVjdFBob3RvRGVsZXRlIiwiX2NhbGxlZTIyIiwiX3JlcSRib2R5NCIsIl9jYWxsZWUyMiQiLCJfY29udGV4dDIyIiwiZ2V0UHJvZHVjdFN1YkNoaWxkQ2F0IiwiX2NhbGxlZTIzIiwiX3JlcSRib2R5NSIsIl9jYWxsZWUyMyQiLCJfY29udGV4dDIzIiwiZ2V0UHJvZHVjdFN1Z2dlc3QiLCJfY2FsbGVlMjQiLCJfY2FsbGVlMjQkIiwiX2NvbnRleHQyNCIsImxpdGVyYWwiLCJnZXRTaXplUHJvZHVjdCIsIl9jYWxsZWUyNSIsIl9wcm9kdWN0SWQzIiwiX2NhbGxlZTI1JCIsIl9jb250ZXh0MjUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvcHJvZHVjdC9wcm9kdWN0LmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzXCI7XG5jb25zdCB7IE9wLCBTZXF1ZWxpemUgfSA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7XG4vLyBpbXBvcnQgeyBxdWV1ZSB9IGZyb20gJy4uLy4uLy4uL2t1ZSc7XG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi8uLi8uLi9jb25maWdcIjtcbmltcG9ydCBBV1MgZnJvbSBcImF3cy1zZGtcIjtcblxuY29uc3QgczMgPSBuZXcgQVdTLlMzKHtcbiAgYWNjZXNzS2V5SWQ6IGNvbmZpZy5hcHAuQVdTX0FDQ0VTU19LRVksXG4gIHNlY3JldEFjY2Vzc0tleTogY29uZmlnLmFwcC5BV1NfU0VDUkVUX0tFWSxcbn0pO1xuXG52YXIgZGVsZXRlRmlsZUZyb21TMyA9IGFzeW5jIChpbWdVcmwpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBsYXN0SXRlbSA9IGltZ1VybC5zdWJzdHJpbmcoaW1nVXJsLmxhc3RJbmRleE9mKFwiL1wiKSArIDEpO1xuICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICBCdWNrZXQ6IFwicGhvdG9hYmhpXCIsXG4gICAgICBLZXk6IGxhc3RJdGVtLFxuICAgIH07XG4gICAgczMuZGVsZXRlT2JqZWN0KHBhcmFtcywgKGVycm9yLCBkYXRhKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IsIGVycm9yLnN0YWNrKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGFzc2VydC5pc05vdE9rKGVycm9yLCBcIlByb21pc2UgZXJyb3JcIik7XG4gICAgZG9uZSgpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8qIEFkZCB1c2VyIGFwaSBzdGFydCBoZXJlLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4qL1xuICBhc3luYyBnZXRQaG90b1Byb2R1Y3QocmVxLCByZXMpIHtcbiAgICBjb25zdCB7IHByb2R1Y3RJZCB9ID0gcmVxLnF1ZXJ5O1xuICAgIGRiLnByb2R1Y3RwaG90b1xuICAgICAgLmZpbmRBbGwoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIHByb2R1Y3RJZCxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgIH0pO1xuICB9LFxuICBhc3luYyBhZGRQcm9kdWN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY2F0ZWdvcnlJZCxcbiAgICAgICAgc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICBuYW1lLFxuICAgICAgICBzbHVnLFxuICAgICAgICBicmFuZCxcbiAgICAgICAgc3RhdHVzLFxuICAgICAgICB1bml0U2l6ZSxcbiAgICAgICAgc29ydERlc2MsXG4gICAgICAgIGRlc2MsXG4gICAgICAgIGJ1eWVyUHJpY2UsXG4gICAgICAgIHByaWNlLFxuICAgICAgICBxdHksXG4gICAgICAgIGRpc2NvdW50LFxuICAgICAgICBkaXNjb3VudFBlcixcbiAgICAgICAgdG90YWwsXG4gICAgICAgIG5ldFByaWNlLFxuICAgICAgICBpbWFnZSxcbiAgICAgICAgc2l6ZSxcbiAgICAgICAgbmV3YWRkaW1hZ2UsXG4gICAgICB9ID0gcmVxLmJvZHk7XG5cbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmNyZWF0ZSh7XG4gICAgICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnlJZCxcbiAgICAgICAgICBzdWJDYXRlZ29yeUlkOiBzdWJDYXRlZ29yeUlkLFxuICAgICAgICAgIGNoaWxkQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkIHx8IDAsXG4gICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICBzbHVnOiBzbHVnLFxuICAgICAgICAgIHN0YXR1czogcGFyc2VJbnQoc3RhdHVzKSA/IFwiYWN0aXZlXCIgOiBcImluYWN0aXZlXCIsXG4gICAgICAgICAgYnJhbmQ6IGJyYW5kLFxuICAgICAgICAgIHVuaXRTaXplOiB1bml0U2l6ZSxcbiAgICAgICAgICBzb3J0RGVzYzogc29ydERlc2MsXG4gICAgICAgICAgZGVzYzogZGVzYyxcbiAgICAgICAgICBidXllclByaWNlOiBidXllclByaWNlLFxuICAgICAgICAgIHByaWNlOiBwcmljZSxcbiAgICAgICAgICBxdHk6IHF0eSxcbiAgICAgICAgICBkaXNjb3VudDogZGlzY291bnQsXG4gICAgICAgICAgZGlzY291bnRQZXI6IGRpc2NvdW50UGVyLFxuICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICBuZXRQcmljZTogbmV0UHJpY2UsXG4gICAgICAgICAgcGhvdG86IHJlcS5maWxlID8gcmVxLmZpbGUucGF0aCA6IFwiXCIsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgSlNPTi5wYXJzZShpbWFnZSk/Lm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5jcmVhdGUoe1xuICAgICAgICAgICAgICBpbWdVcmw6IGl0ZW0/LnBhdGgsXG4gICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdC5kYXRhVmFsdWVzLmlkLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChuZXdhZGRpbWFnZSkge1xuICAgICAgICAgICAgSlNPTi5wYXJzZShuZXdhZGRpbWFnZSk/Lm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgaW1nVXJsOiBpdGVtPy5pbWFnZVVybCxcbiAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIEpTT04ucGFyc2Uoc2l6ZSk/Lm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICAgIGRiLnByb2R1Y3RzaXplLmNyZWF0ZSh7XG4gICAgICAgICAgICAgIHNpemU6IGl0ZW0/LnNpemUsXG4gICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdC5kYXRhVmFsdWVzLmlkLFxuICAgICAgICAgICAgICBhbW91bnQ6IGl0ZW0/LmFtb3VudCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXNcbiAgICAgICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAgICAgLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IGluc2VydGVkIHByb2R1Y3RcIiB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKGVycik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGluZGV4KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgc3VwcGxpZXJJZCwgY2F0ZWdvcnlJZCwgc3ViQ2F0ZWdvcnlJZCB9ID0gcmVxLnF1ZXJ5O1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgc3VwcGxpZXJJZDogc3VwcGxpZXJJZCxcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQsXG4gICAgICAgICAgICBzdWJDYXRlZ29yeUlkOiBzdWJDYXRlZ29yeUlkLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldEFsbFByb2R1Y3RMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBtb2RlbDogZGIuU3ViQ2F0ZWdvcnksXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic3ViX25hbWVcIl0sXG4gICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5jYXRlZ29yeSwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyB1cGRhdGUocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBwcm9kdWN0SWQsXG4gICAgICAgIGNhdGVnb3J5SWQsXG4gICAgICAgIHN1YkNhdGVnb3J5SWQsXG4gICAgICAgIGNoaWxkQ2F0ZWdvcnlJZCxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgc2x1ZyxcbiAgICAgICAgYnJhbmQsXG4gICAgICAgIHN0YXR1cyxcbiAgICAgICAgdW5pdFNpemUsXG4gICAgICAgIGRlc2MsXG4gICAgICAgIGJ1eWVyUHJpY2UsXG4gICAgICAgIHByaWNlLFxuICAgICAgICBxdHksXG4gICAgICAgIGRpc2NvdW50LFxuICAgICAgICBkaXNjb3VudFBlcixcbiAgICAgICAgdG90YWwsXG4gICAgICAgIG5ldFByaWNlLFxuICAgICAgICBpbWFnZXMsXG4gICAgICAgIHNpemUsXG4gICAgICAgIG5ld2FkZGltYWdlLFxuICAgICAgfSA9IHJlcS5ib2R5O1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwcm9kdWN0SWQgfSB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIGlmIChwcm9kdWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdC51cGRhdGUoXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjYXRlZ29yeUlkOiBjYXRlZ29yeUlkID8gY2F0ZWdvcnlJZCA6IHByb2R1Y3QuY2F0ZWdvcnlJZCxcbiAgICAgICAgICAgICAgICBzdWJDYXRlZ29yeUlkOiBzdWJDYXRlZ29yeUlkXG4gICAgICAgICAgICAgICAgICA/IHN1YkNhdGVnb3J5SWRcbiAgICAgICAgICAgICAgICAgIDogcHJvZHVjdC5zdWJDYXRlZ29yeUlkLFxuICAgICAgICAgICAgICAgIGNoaWxkQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkXG4gICAgICAgICAgICAgICAgICA/IGNoaWxkQ2F0ZWdvcnlJZFxuICAgICAgICAgICAgICAgICAgOiBwcm9kdWN0LmNoaWxkQ2F0ZWdvcnlJZCxcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICAgIHNsdWc6IHNsdWcsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBwYXJzZUludChzdGF0dXMpID8gXCJhY3RpdmVcIiA6IFwiaW5hY3RpdmVcIixcbiAgICAgICAgICAgICAgICBicmFuZDogYnJhbmQsXG4gICAgICAgICAgICAgICAgdW5pdFNpemU6IHVuaXRTaXplLFxuICAgICAgICAgICAgICAgIGRlc2M6IGRlc2MsXG4gICAgICAgICAgICAgICAgYnV5ZXJQcmljZTogYnV5ZXJQcmljZSxcbiAgICAgICAgICAgICAgICBwcmljZTogcHJpY2UsXG4gICAgICAgICAgICAgICAgcXR5OiBxdHksXG4gICAgICAgICAgICAgICAgZGlzY291bnQ6IGRpc2NvdW50LFxuICAgICAgICAgICAgICAgIGRpc2NvdW50UGVyOiBkaXNjb3VudFBlcixcbiAgICAgICAgICAgICAgICB0b3RhbDogdG90YWwsXG4gICAgICAgICAgICAgICAgbmV0UHJpY2U6IG5ldFByaWNlLFxuICAgICAgICAgICAgICAgIHBob3RvOiByZXEuZmlsZSA/IHJlcS5maWxlLmxvY2F0aW9uIDogcHJvZHVjdC5waG90byxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0gfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIk5vdCBGb3VuZCBQcm9kdWN0XCIsIDQwOSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwKSA9PiB7XG4gICAgICAgICAgaWYgKG5ld2FkZGltYWdlKSB7XG4gICAgICAgICAgICBKU09OLnBhcnNlKG5ld2FkZGltYWdlKT8ubWFwKChpdGVtKSA9PlxuICAgICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBpbWdVcmw6IGl0ZW0/LmltYWdlVXJsLFxuICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNpemUpIHtcbiAgICAgICAgICAgIGRiLnByb2R1Y3RzaXplLmRlc3Ryb3koe1xuICAgICAgICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGIucHJvZHVjdHNpemUuYnVsa0NyZWF0ZShcbiAgICAgICAgICAgICAgSlNPTi5wYXJzZShzaXplKS5tYXAoKHsgc2l6ZSwgYW1vdW50IH0pID0+ICh7XG4gICAgICAgICAgICAgICAgc2l6ZSxcbiAgICAgICAgICAgICAgICBhbW91bnQsXG4gICAgICAgICAgICAgICAgcHJvZHVjdElkLFxuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpbWFnZXMpIHtcbiAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5kZXN0cm95KHtcbiAgICAgICAgICAgICAgd2hlcmU6IHsgcHJvZHVjdElkOiBwcm9kdWN0SWQgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmJ1bGtDcmVhdGUoXG4gICAgICAgICAgICAgIEpTT04ucGFyc2UoaW1hZ2VzKS5tYXAoKGl0ZW0pID0+ICh7IC4uLml0ZW0sIHByb2R1Y3RJZCB9KSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlVwZGF0ZWQgU3VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RMaXN0QnlDYXRlZ29yeShyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBjYXRlZ29yeUlkOiByZXEucXVlcnkuY2F0ZWdvcnlJZCxcbiAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IHJlcS5xdWVyeS5zdWJDYXRlZ29yeUlkLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRQcm9kdWN0TGlzdEJ5SWQocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeS5pZCB9LFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldFdlYlByb2R1Y3RMaXN0QnlJZChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzaXplID0gYXdhaXQgZGIucHJvZHVjdHNpemUuZmluZEFsbCh7XG4gICAgICAgIHdoZXJlOiB7IHByb2R1Y3RJZDogcmVxLnF1ZXJ5LmlkIH0sXG4gICAgICB9KTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRPbmUoe1xuICAgICAgICAgIHdoZXJlOiB7IGlkOiByZXEucXVlcnkuaWQgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCwgZGF0YXNpemU6IHNpemUgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGFkZFByb2R1Y3RPZmZlcihyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHByb2R1Y3RJZCwgcXR5LCBkaXNjb3VudF9wZXIsIGRpc2NvdW50X3ByaWNlLCB0b3RhbCwgbmV0X3ByaWNlIH0gPVxuICAgICAgICByZXEuYm9keTtcbiAgICAgIGRiLlByb2R1Y3RPZmZlci5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9IH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgaWYgKCFsaXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gZGIuUHJvZHVjdE9mZmVyLmNyZWF0ZSh7XG4gICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxuICAgICAgICAgICAgICBpbWFnZTogcmVxLmZpbGUgPyByZXEuZmlsZS5sb2NhdGlvbiA6IFwiXCIsXG4gICAgICAgICAgICAgIHF0eTogcXR5LFxuICAgICAgICAgICAgICBkaXNjb3VudF9wZXI6IGRpc2NvdW50X3BlcixcbiAgICAgICAgICAgICAgZGlzY291bnRfcHJpY2U6IGRpc2NvdW50X3ByaWNlLFxuICAgICAgICAgICAgICB0b3RhbDogdG90YWwsXG4gICAgICAgICAgICAgIG5ldF9wcmljZTogbmV0X3ByaWNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBkYi5Qcm9kdWN0T2ZmZXIudXBkYXRlKFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcXR5OiBxdHksXG4gICAgICAgICAgICAgICAgZGlzY291bnRfcGVyOiBkaXNjb3VudF9wZXIsXG4gICAgICAgICAgICAgICAgZGlzY291bnRfcHJpY2U6IGRpc2NvdW50X3ByaWNlLFxuICAgICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICAgICAgICBuZXRfcHJpY2U6IG5ldF9wcmljZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB3aGVyZTogeyBpZDogbGlzdC5pZCB9IH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlN1Y2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldFByb2R1Y3RPZmZlcihyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5Qcm9kdWN0T2ZmZXIuZmluZEFsbCh7XG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgICAgICAgICAgXCJpZFwiLFxuICAgICAgICAgICAgICBcImNhdGVnb3J5SWRcIixcbiAgICAgICAgICAgICAgXCJwcmljZVwiLFxuICAgICAgICAgICAgICBcIml0ZW1fbmFtZVwiLFxuICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIsXG4gICAgICAgICAgICAgIFwiYnJhbmRcIixcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuY2F0ZWdvcnksIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSB9XSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgc2VhcmNoUHJvZHVjdEJ5U3ViQ2F0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoe1xuICAgICAgICB3aGVyZTogeyBzdWJfbmFtZTogcmVxLmJvZHkuc3ViQ2F0IH0sXG4gICAgICB9KVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdC5maW5kQWxsKHtcbiAgICAgICAgICAgICAgd2hlcmU6IHsgc3ViQ2F0ZWdvcnlJZDogZGF0YS5pZCB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGxpc3QpKTtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBwcm9kdWN0RGVsZXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgZGIucHJvZHVjdFxuICAgICAgLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocmVxLnF1ZXJ5LmlkKSB9IH0pXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICAgIHJldHVybiBkYi5wcm9kdWN0LmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcHJvZHVjdC5pZCB9IH0pO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJQcm9kdWN0IGlzIG5vdCBmb3VuZFwiKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigocmUpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgICB9KTtcbiAgfSxcblxuICBhc3luYyBwcm9kdWN0T2ZmZXJEZWxldGUocmVxLCByZXMsIG5leHQpIHtcbiAgICBkYi5Qcm9kdWN0T2ZmZXIuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucGFyYW1zLmlkKSB9IH0pXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICAgIHJldHVybiBkYi5Qcm9kdWN0T2ZmZXIuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiBwcm9kdWN0LmlkIH0gfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIlByb2R1Y3QgaXMgbm90IGZvdW5kXCIpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChyZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6IFwiZGVsZXRlZCBQcm9kdWN0IFNlY2Nlc3NmdWxseVwiIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICAgIH0pO1xuICB9LFxuXG4gIGFzeW5jIG11bHRpcGxlUGhvdG9VcGxvYWQocmVxLCByZXMsIG5leHQpIHtcbiAgICBsZXQgYXR0YWNobWVudEVudHJpZXMgPSBbXTtcbiAgICB2YXIgcHJvZHVjdElkID0gcmVxLmJvZHkucHJvZHVjdElkO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVxLmZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRhY2htZW50RW50cmllcy5wdXNoKHtcbiAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWQsXG4gICAgICAgIG5hbWU6IHJlcS5maWxlc1tpXS5maWxlbmFtZSxcbiAgICAgICAgbWltZTogcmVxLmZpbGVzW2ldLm1pbWV0eXBlLFxuICAgICAgICBpbWdVcmw6IHJlcS5maWxlc1tpXS5wYXRoLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGIucHJvZHVjdFxuICAgICAgLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4oKHIpID0+IHtcbiAgICAgICAgaWYgKHIpIHtcbiAgICAgICAgICAvLyByZXR1cm4gcXVldWUuY3JlYXRlKCdpbWctdXBsb2FkJywge1xuICAgICAgICAgIC8vICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcbiAgICAgICAgICAvLyAgICAgcHJvZHVjdE5hbWU6IHIuaXRlbV9uYW1lLFxuICAgICAgICAgIC8vICAgICBhdHRhY2htZW50RW50cmllczogYXR0YWNobWVudEVudHJpZXMsXG4gICAgICAgICAgLy8gfSkuc2F2ZSgpO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVxLmZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHsgLi4uYXR0YWNobWVudEVudHJpZXNbaV0gfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHIpID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiByZXEuZmlsZXMgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3JzOiBbXCJFcnJvciBpbnNlcnQgcGhvdG9cIl0gfSk7XG4gICAgICB9KTtcbiAgfSxcblxuICBhc3luYyBnZXRBbGxQaG90byhyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiLCBcImJyYW5kXCJdLFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBkZWxldGVTbGlkZXJQaG90byhyZXEsIHJlcywgbmV4dCkge1xuICAgIGRiLnByb2R1Y3RwaG90b1xuICAgICAgLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocmVxLnF1ZXJ5LmlkKSB9IH0pXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICAgIHJldHVybiBkYi5wcm9kdWN0cGhvdG8uZGVzdHJveSh7IHdoZXJlOiB7IGlkOiByZXEucXVlcnkuaWQgfSB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiUHJvZHVjdCBpcyBub3QgZm91bmRcIik7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHJlKSA9PiB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogXCJkZWxldGVkIFByb2R1Y3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgICAgfSk7XG4gIH0sXG4gIC8vQWxsIEdyb2NlcnlTdGFtcGxlIHByb2R1Y3RcbiAgLy8gZWRpdCB0byBzYWxlIHByb2R1Y3RcbiAgYXN5bmMgZ2V0QWxsR3JvY2VycnlTdGFwbGVzKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIC8vIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic2x1Z1wiXSxcbiAgICAgICAgICAvLyB3aGVyZTogeyBkaXNjb3VudDogJ2dyb2Nlcnktc3RhcGxlJyB9LFxuICAgICAgICAgIG9yZGVyOiBbW1wiZGlzY291bnRQZXJcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICBsaW1pdDogOCxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfHwgW10gfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZ2V0QWxsUHJvZHVjdEJ5U2x1ZyhyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5jYXRlZ29yeVxuICAgICAgICAuZmluZE9uZSh7XG4gICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIl0sXG4gICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcbiAgICAgICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAgICAgIHsgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gZmlsdGVyIHByb2R1Y3RcblxuICBhc3luYyBnZXRGaWx0ZXJieVByb2R1Y3QocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHNlYXJjaCA9IFwiJSVcIjtcbiAgICAgIGlmIChyZXEucXVlcnkuc2VhcmNoKSB7XG4gICAgICAgIHNlYXJjaCA9IFwiJVwiICsgcmVxLnF1ZXJ5LnNlYXJjaCArIFwiJVwiO1xuICAgICAgfVxuICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZEFsbCh7XG4gICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic3ViX25hbWVcIl0sXG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcbiAgICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgIFtPcC5vcl06IFtcbiAgICAgICAgICAgICAgICB7IG5hbWU6IHsgW09wLmxpa2VdOiBzZWFyY2ggfSwgc2x1ZzogeyBbT3AubGlrZV06IHNlYXJjaCB9IH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KVxuXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIEdldEFsbEJ5Q2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7IHN1Yl9uYW1lOiByZXEuYm9keS5uYW1lIH0sXG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtb2RlbDogZGIuU3ViQ2hpbGRDYXRlZ29yeSxcbiAgICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1vZGVsOiBkYi5wcm9kdWN0LFxuICAgICAgICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAgICAgICAgeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBhd3MgaW1hZ2UgZGVsZXRlXG4gIGFzeW5jIGF3c1Byb2R1Y3RQaG90b0RlbGV0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkLCBpbWdVcmwgfSA9IHJlcS5ib2R5O1xuICAgICAgLy8gZGIucHJvZHVjdHBob3RvLmRlc3Ryb3koe3doZXJlOiB7aW1nVXJsLCBpZH19KVxuICAgICAgLy8gZGVsZXRlRmlsZUZyb21TMyhpbWdVcmwpXG5cbiAgICAgIGRiLnByb2R1Y3RwaG90b1xuICAgICAgICAuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiBpZCB9IH0pXG5cbiAgICAgICAgLnRoZW4oKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgICByZXNcbiAgICAgICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAgICAgLmpzb24oe1xuICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgICBtc2c6IFwiU3VjY2Vzc2ZsbHkgZGVsZXRlZCBpbWFnZSBmcm9tIHMzIEJ1Y2tldFwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV4dChlcnIpO1xuICAgICAgLy8gcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6ZmFsc2UsIG1zZzogZXJyfSlcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZ2V0UHJvZHVjdFN1YkNoaWxkQ2F0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgc3ViQ2F0ZWdvcnlJZCwgY2hpbGRDYXRlZ29yeUlkIH0gPSByZXEuYm9keTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCxcbiAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV4dChlcnIpO1xuICAgICAgLy8gcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6ZmFsc2UsIG1zZzogZXJyfSlcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RTdWdnZXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIGNvbnN0eyBzdWJDYXRlZ29yeUlkLCBjaGlsZENhdGVnb3J5SWQgfSA9IHJlcS5ib2R5O1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgLy8gd2hlcmU6IHsgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWQsIHN1YkNhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCB9LFxuICAgICAgICAgIG9yZGVyOiBTZXF1ZWxpemUubGl0ZXJhbChcIlJBTkQoKVwiKSxcbiAgICAgICAgICBsaW1pdDogOCxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV4dChlcnIpO1xuICAgICAgLy8gcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6ZmFsc2UsIG1zZzogZXJyfSlcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFNpemVQcm9kdWN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcHJvZHVjdElkIH0gPSByZXEucXVlcnk7XG4gICAgICBkYi5wcm9kdWN0c2l6ZVxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgcHJvZHVjdElkIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIG5leHQoZXJyKTtcbiAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1zZzogZXJyIH0pO1xuICAgIH1cbiAgfSxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFB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