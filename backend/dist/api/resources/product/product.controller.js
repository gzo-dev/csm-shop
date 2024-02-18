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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _require = require("sequelize"),
  Op = _require.Op,
  Sequelize = _require.Sequelize;
// import { queue } from '../../../kue';
var _default = {
  /* Add user api start here................................*/getPhotoProduct: function getPhotoProduct(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var productId;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
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
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  addProduct: function addProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var _req$body, categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, sortDesc, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice, image, size, newaddimage, phoneNumber, province, district, ward, square, provinceText, districtText, wardText, budget, typeRoom, interior;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, categoryId = _req$body.categoryId, subCategoryId = _req$body.subCategoryId, childCategoryId = _req$body.childCategoryId, name = _req$body.name, slug = _req$body.slug, brand = _req$body.brand, status = _req$body.status, unitSize = _req$body.unitSize, sortDesc = _req$body.sortDesc, desc = _req$body.desc, buyerPrice = _req$body.buyerPrice, price = _req$body.price, qty = _req$body.qty, discount = _req$body.discount, discountPer = _req$body.discountPer, total = _req$body.total, netPrice = _req$body.netPrice, image = _req$body.image, size = _req$body.size, newaddimage = _req$body.newaddimage, phoneNumber = _req$body.phoneNumber, province = _req$body.province, district = _req$body.district, ward = _req$body.ward, square = _req$body.square, provinceText = _req$body.provinceText, districtText = _req$body.districtText, wardText = _req$body.wardText, budget = _req$body.budget, typeRoom = _req$body.typeRoom, interior = _req$body.interior;
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
              photo: req.file ? req.file.path : "",
              phoneNumber: phoneNumber,
              province: province,
              district: district,
              ward: ward,
              provinceText: provinceText ? provinceText : "",
              districtText: districtText ? districtText : "",
              wardText: wardText ? wardText : "",
              square: square ? square : 0,
              budget: budget ? budget : 0,
              typeRoom: typeRoom ? typeRoom : "",
              interior: interior ? interior : ""
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
                    productId: product.dataValues.id
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
            _context2.next = 8;
            break;
          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).json(_context2.t0));
          case 8:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 5]]);
    }))();
  },
  index: function index(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var _req$query, supplierId, categoryId, subCategoryId;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
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
            _context3.next = 8;
            break;
          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3["catch"](0);
            throw new RequestError("Error");
          case 8:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 5]]);
    }))();
  },
  getAllProductList: function getAllProductList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
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
            _context4.next = 7;
            break;
          case 4:
            _context4.prev = 4;
            _context4.t0 = _context4["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 4]]);
    }))();
  },
  update: function update(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var _req$body2, productId, categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice, images, size, newaddimage, phoneNumber, typeRoom, interior;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$body2 = req.body, productId = _req$body2.productId, categoryId = _req$body2.categoryId, subCategoryId = _req$body2.subCategoryId, childCategoryId = _req$body2.childCategoryId, name = _req$body2.name, slug = _req$body2.slug, brand = _req$body2.brand, status = _req$body2.status, unitSize = _req$body2.unitSize, desc = _req$body2.desc, buyerPrice = _req$body2.buyerPrice, price = _req$body2.price, qty = _req$body2.qty, discount = _req$body2.discount, discountPer = _req$body2.discountPer, total = _req$body2.total, netPrice = _req$body2.netPrice, images = _req$body2.images, size = _req$body2.size, newaddimage = _req$body2.newaddimage, phoneNumber = _req$body2.phoneNumber, typeRoom = _req$body2.typeRoom, interior = _req$body2.interior;
            _models.db.product.findOne({
              where: {
                id: productId
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
                  photo: req.file ? req.file.location : product.photo,
                  phoneNumber: phoneNumber,
                  typeRoom: typeRoom,
                  interior: interior
                }, {
                  where: {
                    id: productId
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
                    productId: productId
                  });
                });
              }
              if (size) {
                _models.db.productsize.destroy({
                  where: {
                    productId: productId
                  }
                });
                _models.db.productsize.bulkCreate(JSON.parse(size).map(function (_ref) {
                  var size = _ref.size,
                    amount = _ref.amount;
                  return {
                    size: size,
                    amount: amount,
                    productId: productId
                  };
                }));
              }
              if (images) {
                _models.db.productphoto.destroy({
                  where: {
                    productId: productId
                  }
                });
                _models.db.productphoto.bulkCreate(JSON.parse(images).map(function (item) {
                  return _objectSpread(_objectSpread({}, item), {}, {
                    productId: productId
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
            _context5.next = 8;
            break;
          case 5:
            _context5.prev = 5;
            _context5.t0 = _context5["catch"](0);
            throw new RequestError("Error");
          case 8:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 5]]);
    }))();
  },
  getProductListByCategory: function getProductListByCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _models.db.product.findAll({
              order: [["DESC"]],
              where: {
                categoryId: req.query.categoryId,
                subCategoryId: req.query.subCategoryId
              },
              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }]
            }).then(function (list) {
              res.status(200).json({
                success: true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context6.next = 7;
            break;
          case 4:
            _context6.prev = 4;
            _context6.t0 = _context6["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 4]]);
    }))();
  },
  getProductSuggestHotel: function getProductSuggestHotel(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _models.db.product.findAll({
              order: [["DESC"]],
              where: {
                categoryId: 12
                // subCategoryId: req.query.subCategoryId,
              },

              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }],
              limit: 4
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
  getProductSuggestApartment: function getProductSuggestApartment(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _models.db.product.findAll({
              order: [["DESC"]],
              where: {
                categoryId: 13
                // subCategoryId: req.query.subCategoryId,
              },

              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }],
              limit: 4
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
  getProductListById: function getProductListById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
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
            _context9.next = 7;
            break;
          case 4:
            _context9.prev = 4;
            _context9.t0 = _context9["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 4]]);
    }))();
  },
  getWebProductListById: function getWebProductListById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var size;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return _models.db.productsize.findAll({
              where: {
                productId: req.query.id
              }
            });
          case 3:
            size = _context10.sent;
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
            _context10.next = 10;
            break;
          case 7:
            _context10.prev = 7;
            _context10.t0 = _context10["catch"](0);
            throw new RequestError("Error");
          case 10:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 7]]);
    }))();
  },
  addProductOffer: function addProductOffer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      var _req$body3, productId, qty, discount_per, discount_price, total, net_price;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _req$body3 = req.body, productId = _req$body3.productId, qty = _req$body3.qty, discount_per = _req$body3.discount_per, discount_price = _req$body3.discount_price, total = _req$body3.total, net_price = _req$body3.net_price;
            _models.db.ProductOffer.findOne({
              where: {
                id: productId
              }
            }).then(function (list) {
              if (!list) {
                return _models.db.ProductOffer.create({
                  productId: productId,
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
            _context11.next = 8;
            break;
          case 5:
            _context11.prev = 5;
            _context11.t0 = _context11["catch"](0);
            throw new RequestError("Error");
          case 8:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[0, 5]]);
    }))();
  },
  getProductOffer: function getProductOffer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
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
  searchProductBySubCat: function searchProductBySubCat(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
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
            _context13.next = 7;
            break;
          case 4:
            _context13.prev = 4;
            _context13.t0 = _context13["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context13.stop();
        }
      }, _callee13, null, [[0, 4]]);
    }))();
  },
  productDelete: function productDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
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
            return _context14.stop();
        }
      }, _callee14);
    }))();
  },
  productOfferDelete: function productOfferDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
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
            return _context15.stop();
        }
      }, _callee15);
    }))();
  },
  multiplePhotoUpload: function multiplePhotoUpload(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      var attachmentEntries, productId, i;
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
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
            return _context16.stop();
        }
      }, _callee16);
    }))();
  },
  getAllPhoto: function getAllPhoto(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
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
            _context17.next = 7;
            break;
          case 4:
            _context17.prev = 4;
            _context17.t0 = _context17["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context17.stop();
        }
      }, _callee17, null, [[0, 4]]);
    }))();
  },
  deleteSliderPhoto: function deleteSliderPhoto(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
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
            return _context18.stop();
        }
      }, _callee18);
    }))();
  },
  //All GroceryStample product
  // edit to sale product
  getAllGrocerryStaples: function getAllGrocerryStaples(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) switch (_context19.prev = _context19.next) {
          case 0:
            _context19.prev = 0;
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
  getAllProductBySlug: function getAllProductBySlug(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
          case 0:
            _context20.prev = 0;
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
            _context20.next = 7;
            break;
          case 4:
            _context20.prev = 4;
            _context20.t0 = _context20["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context20.stop();
        }
      }, _callee20, null, [[0, 4]]);
    }))();
  },
  // filter product
  getFilterbyProduct: function getFilterbyProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
      var search;
      return _regenerator["default"].wrap(function _callee21$(_context21) {
        while (1) switch (_context21.prev = _context21.next) {
          case 0:
            _context21.prev = 0;
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
            _context21.next = 9;
            break;
          case 6:
            _context21.prev = 6;
            _context21.t0 = _context21["catch"](0);
            throw new RequestError("Error");
          case 9:
          case "end":
            return _context21.stop();
        }
      }, _callee21, null, [[0, 6]]);
    }))();
  },
  GetAllByCategory: function GetAllByCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
      return _regenerator["default"].wrap(function _callee22$(_context22) {
        while (1) switch (_context22.prev = _context22.next) {
          case 0:
            _context22.prev = 0;
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
            _context22.next = 7;
            break;
          case 4:
            _context22.prev = 4;
            _context22.t0 = _context22["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context22.stop();
        }
      }, _callee22, null, [[0, 4]]);
    }))();
  },
  // aws image delete
  awsProductPhotoDelete: function awsProductPhotoDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
      var _req$body4, id, imgUrl;
      return _regenerator["default"].wrap(function _callee23$(_context23) {
        while (1) switch (_context23.prev = _context23.next) {
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
            return _context23.stop();
        }
      }, _callee23);
    }))();
  },
  getProductSubChildCat: function getProductSubChildCat(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24() {
      var _req$body5, subCategoryId, childCategoryId;
      return _regenerator["default"].wrap(function _callee24$(_context24) {
        while (1) switch (_context24.prev = _context24.next) {
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
            return _context24.stop();
        }
      }, _callee24);
    }))();
  },
  getProductSuggest: function getProductSuggest(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25() {
      return _regenerator["default"].wrap(function _callee25$(_context25) {
        while (1) switch (_context25.prev = _context25.next) {
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
            return _context25.stop();
        }
      }, _callee25);
    }))();
  },
  getSizeProduct: function getSizeProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26() {
      var productId;
      return _regenerator["default"].wrap(function _callee26$(_context26) {
        while (1) switch (_context26.prev = _context26.next) {
          case 0:
            try {
              productId = req.query.productId;
              _models.db.productsize.findAll({
                where: {
                  productId: productId
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
            return _context26.stop();
        }
      }, _callee26);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiX3JlcXVpcmUiLCJPcCIsIlNlcXVlbGl6ZSIsIl9kZWZhdWx0IiwiZ2V0UGhvdG9Qcm9kdWN0IiwicmVxIiwicmVzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJwcm9kdWN0SWQiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwicXVlcnkiLCJkYiIsInByb2R1Y3RwaG90byIsImZpbmRBbGwiLCJ3aGVyZSIsInRoZW4iLCJwcm9kdWN0Iiwic3RhdHVzIiwianNvbiIsIm9rIiwiZGF0YSIsInN0b3AiLCJhZGRQcm9kdWN0IiwiX2NhbGxlZTIiLCJfcmVxJGJvZHkiLCJjYXRlZ29yeUlkIiwic3ViQ2F0ZWdvcnlJZCIsImNoaWxkQ2F0ZWdvcnlJZCIsIm5hbWUiLCJzbHVnIiwiYnJhbmQiLCJ1bml0U2l6ZSIsInNvcnREZXNjIiwiZGVzYyIsImJ1eWVyUHJpY2UiLCJwcmljZSIsInF0eSIsImRpc2NvdW50IiwiZGlzY291bnRQZXIiLCJ0b3RhbCIsIm5ldFByaWNlIiwiaW1hZ2UiLCJzaXplIiwibmV3YWRkaW1hZ2UiLCJwaG9uZU51bWJlciIsInByb3ZpbmNlIiwiZGlzdHJpY3QiLCJ3YXJkIiwic3F1YXJlIiwicHJvdmluY2VUZXh0IiwiZGlzdHJpY3RUZXh0Iiwid2FyZFRleHQiLCJidWRnZXQiLCJ0eXBlUm9vbSIsImludGVyaW9yIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiYm9keSIsImNyZWF0ZSIsInBhcnNlSW50IiwicGhvdG8iLCJmaWxlIiwicGF0aCIsIl9KU09OJHBhcnNlIiwiX0pTT04kcGFyc2UzIiwiSlNPTiIsInBhcnNlIiwibWFwIiwiaXRlbSIsImltZ1VybCIsImRhdGFWYWx1ZXMiLCJpZCIsIl9KU09OJHBhcnNlMiIsImltYWdlVXJsIiwicHJvZHVjdHNpemUiLCJhbW91bnQiLCJzdWNjZXNzIiwibXNnIiwiZXJyIiwiY29uc29sZSIsImxvZyIsInQwIiwiYWJydXB0IiwiaW5kZXgiLCJfY2FsbGVlMyIsIl9yZXEkcXVlcnkiLCJzdXBwbGllcklkIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwib3JkZXIiLCJSZXF1ZXN0RXJyb3IiLCJnZXRBbGxQcm9kdWN0TGlzdCIsIl9jYWxsZWU0IiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwiaW5jbHVkZSIsIm1vZGVsIiwiU3ViQ2F0ZWdvcnkiLCJhdHRyaWJ1dGVzIiwiY2F0ZWdvcnkiLCJ1cGRhdGUiLCJfY2FsbGVlNSIsIl9yZXEkYm9keTIiLCJpbWFnZXMiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJmaW5kT25lIiwibG9jYXRpb24iLCJwIiwiX0pTT04kcGFyc2U0IiwiZGVzdHJveSIsImJ1bGtDcmVhdGUiLCJfcmVmIiwiZ2V0UHJvZHVjdExpc3RCeUNhdGVnb3J5IiwiX2NhbGxlZTYiLCJfY2FsbGVlNiQiLCJfY29udGV4dDYiLCJsaXN0IiwiZ2V0UHJvZHVjdFN1Z2dlc3RIb3RlbCIsIl9jYWxsZWU3IiwiX2NhbGxlZTckIiwiX2NvbnRleHQ3IiwibGltaXQiLCJnZXRQcm9kdWN0U3VnZ2VzdEFwYXJ0bWVudCIsIl9jYWxsZWU4IiwiX2NhbGxlZTgkIiwiX2NvbnRleHQ4IiwiZ2V0UHJvZHVjdExpc3RCeUlkIiwiX2NhbGxlZTkiLCJfY2FsbGVlOSQiLCJfY29udGV4dDkiLCJnZXRXZWJQcm9kdWN0TGlzdEJ5SWQiLCJfY2FsbGVlMTAiLCJfY2FsbGVlMTAkIiwiX2NvbnRleHQxMCIsInNlbnQiLCJkYXRhc2l6ZSIsImFkZFByb2R1Y3RPZmZlciIsIl9jYWxsZWUxMSIsIl9yZXEkYm9keTMiLCJkaXNjb3VudF9wZXIiLCJkaXNjb3VudF9wcmljZSIsIm5ldF9wcmljZSIsIl9jYWxsZWUxMSQiLCJfY29udGV4dDExIiwiUHJvZHVjdE9mZmVyIiwiZ2V0UHJvZHVjdE9mZmVyIiwiX2NhbGxlZTEyIiwiX2NhbGxlZTEyJCIsIl9jb250ZXh0MTIiLCJzZWFyY2hQcm9kdWN0QnlTdWJDYXQiLCJfY2FsbGVlMTMiLCJfY2FsbGVlMTMkIiwiX2NvbnRleHQxMyIsInN1Yl9uYW1lIiwic3ViQ2F0Iiwic3RyaW5naWZ5IiwicHJvZHVjdERlbGV0ZSIsIl9jYWxsZWUxNCIsIl9jYWxsZWUxNCQiLCJfY29udGV4dDE0IiwicmUiLCJwcm9kdWN0T2ZmZXJEZWxldGUiLCJfY2FsbGVlMTUiLCJfY2FsbGVlMTUkIiwiX2NvbnRleHQxNSIsInBhcmFtcyIsIm11bHRpcGxlUGhvdG9VcGxvYWQiLCJfY2FsbGVlMTYiLCJhdHRhY2htZW50RW50cmllcyIsIl9jYWxsZWUxNiQiLCJfY29udGV4dDE2IiwiZmlsZXMiLCJmaWxlbmFtZSIsIm1pbWUiLCJtaW1ldHlwZSIsInIiLCJlcnJvciIsImVycm9ycyIsImdldEFsbFBob3RvIiwiX2NhbGxlZTE3IiwiX2NhbGxlZTE3JCIsIl9jb250ZXh0MTciLCJkZWxldGVTbGlkZXJQaG90byIsIl9jYWxsZWUxOCIsIl9jYWxsZWUxOCQiLCJfY29udGV4dDE4IiwiZ2V0QWxsR3JvY2VycnlTdGFwbGVzIiwiX2NhbGxlZTE5IiwiX2NhbGxlZTE5JCIsIl9jb250ZXh0MTkiLCJnZXRBbGxQcm9kdWN0QnlTbHVnIiwiX2NhbGxlZTIwIiwiX2NhbGxlZTIwJCIsIl9jb250ZXh0MjAiLCJnZXRGaWx0ZXJieVByb2R1Y3QiLCJfY2FsbGVlMjEiLCJzZWFyY2giLCJfY2FsbGVlMjEkIiwiX2NvbnRleHQyMSIsInJlcXVpcmVkIiwib3IiLCJsaWtlIiwiR2V0QWxsQnlDYXRlZ29yeSIsIl9jYWxsZWUyMiIsIl9jYWxsZWUyMiQiLCJfY29udGV4dDIyIiwiU3ViQ2hpbGRDYXRlZ29yeSIsImF3c1Byb2R1Y3RQaG90b0RlbGV0ZSIsIl9jYWxsZWUyMyIsIl9yZXEkYm9keTQiLCJfY2FsbGVlMjMkIiwiX2NvbnRleHQyMyIsImdldFByb2R1Y3RTdWJDaGlsZENhdCIsIl9jYWxsZWUyNCIsIl9yZXEkYm9keTUiLCJfY2FsbGVlMjQkIiwiX2NvbnRleHQyNCIsImdldFByb2R1Y3RTdWdnZXN0IiwiX2NhbGxlZTI1IiwiX2NhbGxlZTI1JCIsIl9jb250ZXh0MjUiLCJsaXRlcmFsIiwiZ2V0U2l6ZVByb2R1Y3QiLCJfY2FsbGVlMjYiLCJfY2FsbGVlMjYkIiwiX2NvbnRleHQyNiIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy9wcm9kdWN0L3Byb2R1Y3QuY29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkYiB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHNcIjtcbmNvbnN0IHsgT3AsIFNlcXVlbGl6ZSB9ID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTtcbi8vIGltcG9ydCB7IHF1ZXVlIH0gZnJvbSAnLi4vLi4vLi4va3VlJztcbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyogQWRkIHVzZXIgYXBpIHN0YXJ0IGhlcmUuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiovXG4gIGFzeW5jIGdldFBob3RvUHJvZHVjdChyZXEsIHJlcykge1xuICAgIGNvbnN0IHsgcHJvZHVjdElkIH0gPSByZXEucXVlcnk7XG4gICAgZGIucHJvZHVjdHBob3RvXG4gICAgICAuZmluZEFsbCh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgcHJvZHVjdElkLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgfSk7XG4gIH0sXG4gIGFzeW5jIGFkZFByb2R1Y3QocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBjYXRlZ29yeUlkLFxuICAgICAgICBzdWJDYXRlZ29yeUlkLFxuICAgICAgICBjaGlsZENhdGVnb3J5SWQsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIHNsdWcsXG4gICAgICAgIGJyYW5kLFxuICAgICAgICBzdGF0dXMsXG4gICAgICAgIHVuaXRTaXplLFxuICAgICAgICBzb3J0RGVzYyxcbiAgICAgICAgZGVzYyxcbiAgICAgICAgYnV5ZXJQcmljZSxcbiAgICAgICAgcHJpY2UsXG4gICAgICAgIHF0eSxcbiAgICAgICAgZGlzY291bnQsXG4gICAgICAgIGRpc2NvdW50UGVyLFxuICAgICAgICB0b3RhbCxcbiAgICAgICAgbmV0UHJpY2UsXG4gICAgICAgIGltYWdlLFxuICAgICAgICBzaXplLFxuICAgICAgICBuZXdhZGRpbWFnZSxcbiAgICAgICAgcGhvbmVOdW1iZXIsXG4gICAgICAgIHByb3ZpbmNlLCBcbiAgICAgICAgZGlzdHJpY3QsXG4gICAgICAgIHdhcmQsXG4gICAgICAgIHNxdWFyZSxcbiAgICAgICAgcHJvdmluY2VUZXh0LFxuICAgICAgICBkaXN0cmljdFRleHQsXG4gICAgICAgIHdhcmRUZXh0LFxuICAgICAgICBidWRnZXQsXG4gICAgICAgIHR5cGVSb29tLFxuICAgICAgICBpbnRlcmlvclxuICAgICAgfSA9IHJlcS5ib2R5O1xuXG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5jcmVhdGUoe1xuICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQsXG4gICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCB8fCAwLFxuICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgc2x1Zzogc2x1ZyxcbiAgICAgICAgICBzdGF0dXM6IHBhcnNlSW50KHN0YXR1cykgPyBcImFjdGl2ZVwiIDogXCJpbmFjdGl2ZVwiLFxuICAgICAgICAgIGJyYW5kOiBicmFuZCxcbiAgICAgICAgICB1bml0U2l6ZTogdW5pdFNpemUsXG4gICAgICAgICAgc29ydERlc2M6IHNvcnREZXNjLFxuICAgICAgICAgIGRlc2M6IGRlc2MsXG4gICAgICAgICAgYnV5ZXJQcmljZTogYnV5ZXJQcmljZSxcbiAgICAgICAgICBwcmljZTogcHJpY2UsXG4gICAgICAgICAgcXR5OiBxdHksXG4gICAgICAgICAgZGlzY291bnQ6IGRpc2NvdW50LFxuICAgICAgICAgIGRpc2NvdW50UGVyOiBkaXNjb3VudFBlcixcbiAgICAgICAgICB0b3RhbDogdG90YWwsXG4gICAgICAgICAgbmV0UHJpY2U6IG5ldFByaWNlLFxuICAgICAgICAgIHBob3RvOiByZXEuZmlsZSA/IHJlcS5maWxlLnBhdGggOiBcIlwiLFxuICAgICAgICAgIHBob25lTnVtYmVyOiBwaG9uZU51bWJlcixcbiAgICAgICAgICBwcm92aW5jZTogcHJvdmluY2UsXG4gICAgICAgICAgZGlzdHJpY3Q6IGRpc3RyaWN0LFxuICAgICAgICAgIHdhcmQ6IHdhcmQsXG4gICAgICAgICAgcHJvdmluY2VUZXh0OiBwcm92aW5jZVRleHQgPyBwcm92aW5jZVRleHQgOiBcIlwiLFxuICAgICAgICAgIGRpc3RyaWN0VGV4dDogZGlzdHJpY3RUZXh0ID8gZGlzdHJpY3RUZXh0IDogXCJcIixcbiAgICAgICAgICB3YXJkVGV4dDogd2FyZFRleHQgPyB3YXJkVGV4dCA6IFwiXCIsXG4gICAgICAgICAgc3F1YXJlOiBzcXVhcmUgPyBzcXVhcmUgOiAwLFxuICAgICAgICAgIGJ1ZGdldDogYnVkZ2V0ID8gYnVkZ2V0IDogMCxcbiAgICAgICAgICB0eXBlUm9vbTogdHlwZVJvb20gPyB0eXBlUm9vbSA6IFwiXCIsXG4gICAgICAgICAgaW50ZXJpb3I6IGludGVyaW9yID8gaW50ZXJpb3IgOiBcIlwiXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgSlNPTi5wYXJzZShpbWFnZSk/Lm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5jcmVhdGUoe1xuICAgICAgICAgICAgICBpbWdVcmw6IGl0ZW0/LnBhdGgsXG4gICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdC5kYXRhVmFsdWVzLmlkLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChuZXdhZGRpbWFnZSkge1xuICAgICAgICAgICAgSlNPTi5wYXJzZShuZXdhZGRpbWFnZSk/Lm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgaW1nVXJsOiBpdGVtPy5pbWFnZVVybCxcbiAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3QuZGF0YVZhbHVlcy5pZCxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIEpTT04ucGFyc2Uoc2l6ZSk/Lm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICAgIGRiLnByb2R1Y3RzaXplLmNyZWF0ZSh7XG4gICAgICAgICAgICAgIHNpemU6IGl0ZW0/LnNpemUsXG4gICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdC5kYXRhVmFsdWVzLmlkLFxuICAgICAgICAgICAgICBhbW91bnQ6IGl0ZW0/LmFtb3VudCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXNcbiAgICAgICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAgICAgLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IGluc2VydGVkIHByb2R1Y3RcIiB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKGVycik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGluZGV4KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgc3VwcGxpZXJJZCwgY2F0ZWdvcnlJZCwgc3ViQ2F0ZWdvcnlJZCB9ID0gcmVxLnF1ZXJ5O1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgc3VwcGxpZXJJZDogc3VwcGxpZXJJZCxcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQsXG4gICAgICAgICAgICBzdWJDYXRlZ29yeUlkOiBzdWJDYXRlZ29yeUlkLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldEFsbFByb2R1Y3RMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBtb2RlbDogZGIuU3ViQ2F0ZWdvcnksXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic3ViX25hbWVcIl0sXG4gICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5jYXRlZ29yeSwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyB1cGRhdGUocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBwcm9kdWN0SWQsXG4gICAgICAgIGNhdGVnb3J5SWQsXG4gICAgICAgIHN1YkNhdGVnb3J5SWQsXG4gICAgICAgIGNoaWxkQ2F0ZWdvcnlJZCxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgc2x1ZyxcbiAgICAgICAgYnJhbmQsXG4gICAgICAgIHN0YXR1cyxcbiAgICAgICAgdW5pdFNpemUsXG4gICAgICAgIGRlc2MsXG4gICAgICAgIGJ1eWVyUHJpY2UsXG4gICAgICAgIHByaWNlLFxuICAgICAgICBxdHksXG4gICAgICAgIGRpc2NvdW50LFxuICAgICAgICBkaXNjb3VudFBlcixcbiAgICAgICAgdG90YWwsXG4gICAgICAgIG5ldFByaWNlLFxuICAgICAgICBpbWFnZXMsXG4gICAgICAgIHNpemUsXG4gICAgICAgIG5ld2FkZGltYWdlLFxuICAgICAgICBwaG9uZU51bWJlcixcbiAgICAgICAgdHlwZVJvb20sXG4gICAgICAgIGludGVyaW9yXG4gICAgICB9ID0gcmVxLmJvZHk7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9IH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgaWYgKHByb2R1Y3QpIHtcbiAgICAgICAgICAgIHJldHVybiBkYi5wcm9kdWN0LnVwZGF0ZShcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQgPyBjYXRlZ29yeUlkIDogcHJvZHVjdC5jYXRlZ29yeUlkLFxuICAgICAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IHN1YkNhdGVnb3J5SWRcbiAgICAgICAgICAgICAgICAgID8gc3ViQ2F0ZWdvcnlJZFxuICAgICAgICAgICAgICAgICAgOiBwcm9kdWN0LnN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWRcbiAgICAgICAgICAgICAgICAgID8gY2hpbGRDYXRlZ29yeUlkXG4gICAgICAgICAgICAgICAgICA6IHByb2R1Y3QuY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgc2x1Zzogc2x1ZyxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHBhcnNlSW50KHN0YXR1cykgPyBcImFjdGl2ZVwiIDogXCJpbmFjdGl2ZVwiLFxuICAgICAgICAgICAgICAgIGJyYW5kOiBicmFuZCxcbiAgICAgICAgICAgICAgICB1bml0U2l6ZTogdW5pdFNpemUsXG4gICAgICAgICAgICAgICAgZGVzYzogZGVzYyxcbiAgICAgICAgICAgICAgICBidXllclByaWNlOiBidXllclByaWNlLFxuICAgICAgICAgICAgICAgIHByaWNlOiBwcmljZSxcbiAgICAgICAgICAgICAgICBxdHk6IHF0eSxcbiAgICAgICAgICAgICAgICBkaXNjb3VudDogZGlzY291bnQsXG4gICAgICAgICAgICAgICAgZGlzY291bnRQZXI6IGRpc2NvdW50UGVyLFxuICAgICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICAgICAgICBuZXRQcmljZTogbmV0UHJpY2UsXG4gICAgICAgICAgICAgICAgcGhvdG86IHJlcS5maWxlID8gcmVxLmZpbGUubG9jYXRpb24gOiBwcm9kdWN0LnBob3RvLFxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiBwaG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICB0eXBlUm9vbSxcbiAgICAgICAgICAgICAgICBpbnRlcmlvclxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7IHdoZXJlOiB7IGlkOiBwcm9kdWN0SWQgfSB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiTm90IEZvdW5kIFByb2R1Y3RcIiwgNDA5KTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHApID0+IHtcbiAgICAgICAgICBpZiAobmV3YWRkaW1hZ2UpIHtcbiAgICAgICAgICAgIEpTT04ucGFyc2UobmV3YWRkaW1hZ2UpPy5tYXAoKGl0ZW0pID0+XG4gICAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIGltZ1VybDogaXRlbT8uaW1hZ2VVcmwsXG4gICAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWQsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2l6ZSkge1xuICAgICAgICAgICAgZGIucHJvZHVjdHNpemUuZGVzdHJveSh7XG4gICAgICAgICAgICAgIHdoZXJlOiB7IHByb2R1Y3RJZCB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkYi5wcm9kdWN0c2l6ZS5idWxrQ3JlYXRlKFxuICAgICAgICAgICAgICBKU09OLnBhcnNlKHNpemUpLm1hcCgoeyBzaXplLCBhbW91bnQgfSkgPT4gKHtcbiAgICAgICAgICAgICAgICBzaXplLFxuICAgICAgICAgICAgICAgIGFtb3VudCxcbiAgICAgICAgICAgICAgICBwcm9kdWN0SWQsXG4gICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGltYWdlcykge1xuICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmRlc3Ryb3koe1xuICAgICAgICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQ6IHByb2R1Y3RJZCB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uYnVsa0NyZWF0ZShcbiAgICAgICAgICAgICAgSlNPTi5wYXJzZShpbWFnZXMpLm1hcCgoaXRlbSkgPT4gKHsgLi4uaXRlbSwgcHJvZHVjdElkIH0pKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtc2c6IFwiVXBkYXRlZCBTdWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0UHJvZHVjdExpc3RCeUNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiREVTQ1wiXV0sXG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IHJlcS5xdWVyeS5jYXRlZ29yeUlkLFxuICAgICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogcmVxLnF1ZXJ5LnN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RTdWdnZXN0SG90ZWwocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgb3JkZXI6IFtbXCJERVNDXCJdXSxcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgY2F0ZWdvcnlJZDogMTIsXG4gICAgICAgICAgICAvLyBzdWJDYXRlZ29yeUlkOiByZXEucXVlcnkuc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgIGxpbWl0OiA0XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRQcm9kdWN0U3VnZ2VzdEFwYXJ0bWVudChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcIkRFU0NcIl1dLFxuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBjYXRlZ29yeUlkOiAxMyxcbiAgICAgICAgICAgIC8vIHN1YkNhdGVnb3J5SWQ6IHJlcS5xdWVyeS5zdWJDYXRlZ29yeUlkLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgICAgbGltaXQ6IDRcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RMaXN0QnlJZChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBpZDogcmVxLnF1ZXJ5LmlkIH0sXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZ2V0V2ViUHJvZHVjdExpc3RCeUlkKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNpemUgPSBhd2FpdCBkYi5wcm9kdWN0c2l6ZS5maW5kQWxsKHtcbiAgICAgICAgd2hlcmU6IHsgcHJvZHVjdElkOiByZXEucXVlcnkuaWQgfSxcbiAgICAgIH0pO1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZE9uZSh7XG4gICAgICAgICAgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeS5pZCB9LFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0LCBkYXRhc2l6ZTogc2l6ZSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgYWRkUHJvZHVjdE9mZmVyKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcHJvZHVjdElkLCBxdHksIGRpc2NvdW50X3BlciwgZGlzY291bnRfcHJpY2UsIHRvdGFsLCBuZXRfcHJpY2UgfSA9XG4gICAgICAgIHJlcS5ib2R5O1xuICAgICAgZGIuUHJvZHVjdE9mZmVyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0gfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICBpZiAoIWxpc3QpIHtcbiAgICAgICAgICAgIHJldHVybiBkYi5Qcm9kdWN0T2ZmZXIuY3JlYXRlKHtcbiAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWQsXG4gICAgICAgICAgICAgIGltYWdlOiByZXEuZmlsZSA/IHJlcS5maWxlLmxvY2F0aW9uIDogXCJcIixcbiAgICAgICAgICAgICAgcXR5OiBxdHksXG4gICAgICAgICAgICAgIGRpc2NvdW50X3BlcjogZGlzY291bnRfcGVyLFxuICAgICAgICAgICAgICBkaXNjb3VudF9wcmljZTogZGlzY291bnRfcHJpY2UsXG4gICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICAgICAgbmV0X3ByaWNlOiBuZXRfcHJpY2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGRiLlByb2R1Y3RPZmZlci51cGRhdGUoXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBxdHk6IHF0eSxcbiAgICAgICAgICAgICAgICBkaXNjb3VudF9wZXI6IGRpc2NvdW50X3BlcixcbiAgICAgICAgICAgICAgICBkaXNjb3VudF9wcmljZTogZGlzY291bnRfcHJpY2UsXG4gICAgICAgICAgICAgICAgdG90YWw6IHRvdGFsLFxuICAgICAgICAgICAgICAgIG5ldF9wcmljZTogbmV0X3ByaWNlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7IHdoZXJlOiB7IGlkOiBsaXN0LmlkIH0gfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwKSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZ2V0UHJvZHVjdE9mZmVyKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLlByb2R1Y3RPZmZlci5maW5kQWxsKHtcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1vZGVsOiBkYi5wcm9kdWN0LFxuICAgICAgICAgICAgYXR0cmlidXRlczogW1xuICAgICAgICAgICAgICBcImlkXCIsXG4gICAgICAgICAgICAgIFwiY2F0ZWdvcnlJZFwiLFxuICAgICAgICAgICAgICBcInByaWNlXCIsXG4gICAgICAgICAgICAgIFwiaXRlbV9uYW1lXCIsXG4gICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIixcbiAgICAgICAgICAgICAgXCJicmFuZFwiLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5jYXRlZ29yeSwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBzZWFyY2hQcm9kdWN0QnlTdWJDYXQocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7IHN1Yl9uYW1lOiByZXEuYm9keS5zdWJDYXQgfSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiBkYi5wcm9kdWN0LmZpbmRBbGwoe1xuICAgICAgICAgICAgICB3aGVyZTogeyBzdWJDYXRlZ29yeUlkOiBkYXRhLmlkIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobGlzdCkpO1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIHByb2R1Y3REZWxldGUocmVxLCByZXMsIG5leHQpIHtcbiAgICBkYi5wcm9kdWN0XG4gICAgICAuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucXVlcnkuaWQpIH0gfSlcbiAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgIGlmIChwcm9kdWN0KSB7XG4gICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3QuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiBwcm9kdWN0LmlkIH0gfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIlByb2R1Y3QgaXMgbm90IGZvdW5kXCIpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChyZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6IFwiZGVsZXRlZCBQcm9kdWN0IFNlY2Nlc3NmdWxseVwiIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICAgIH0pO1xuICB9LFxuXG4gIGFzeW5jIHByb2R1Y3RPZmZlckRlbGV0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgIGRiLlByb2R1Y3RPZmZlci5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5wYXJhbXMuaWQpIH0gfSlcbiAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgIGlmIChwcm9kdWN0KSB7XG4gICAgICAgICAgcmV0dXJuIGRiLlByb2R1Y3RPZmZlci5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3QuaWQgfSB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiUHJvZHVjdCBpcyBub3QgZm91bmRcIik7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHJlKSA9PiB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogXCJkZWxldGVkIFByb2R1Y3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgICAgfSk7XG4gIH0sXG5cbiAgYXN5bmMgbXVsdGlwbGVQaG90b1VwbG9hZChyZXEsIHJlcywgbmV4dCkge1xuICAgIGxldCBhdHRhY2htZW50RW50cmllcyA9IFtdO1xuICAgIHZhciBwcm9kdWN0SWQgPSByZXEuYm9keS5wcm9kdWN0SWQ7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXEuZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF0dGFjaG1lbnRFbnRyaWVzLnB1c2goe1xuICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcbiAgICAgICAgbmFtZTogcmVxLmZpbGVzW2ldLmZpbGVuYW1lLFxuICAgICAgICBtaW1lOiByZXEuZmlsZXNbaV0ubWltZXR5cGUsXG4gICAgICAgIGltZ1VybDogcmVxLmZpbGVzW2ldLnBhdGgsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBkYi5wcm9kdWN0XG4gICAgICAuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7IGlkOiBwcm9kdWN0SWQgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbigocikgPT4ge1xuICAgICAgICBpZiAocikge1xuICAgICAgICAgIC8vIHJldHVybiBxdWV1ZS5jcmVhdGUoJ2ltZy11cGxvYWQnLCB7XG4gICAgICAgICAgLy8gICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxuICAgICAgICAgIC8vICAgICBwcm9kdWN0TmFtZTogci5pdGVtX25hbWUsXG4gICAgICAgICAgLy8gICAgIGF0dGFjaG1lbnRFbnRyaWVzOiBhdHRhY2htZW50RW50cmllcyxcbiAgICAgICAgICAvLyB9KS5zYXZlKCk7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXEuZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5jcmVhdGUoeyAuLi5hdHRhY2htZW50RW50cmllc1tpXSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAudGhlbigocikgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHJlcS5maWxlcyB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcnM6IFtcIkVycm9yIGluc2VydCBwaG90b1wiXSB9KTtcbiAgICAgIH0pO1xuICB9LFxuXG4gIGFzeW5jIGdldEFsbFBob3RvKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCIsIFwiYnJhbmRcIl0sXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGRlbGV0ZVNsaWRlclBob3RvKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgZGIucHJvZHVjdHBob3RvXG4gICAgICAuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucXVlcnkuaWQpIH0gfSlcbiAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgIGlmIChwcm9kdWN0KSB7XG4gICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3RwaG90by5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeS5pZCB9IH0pO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJQcm9kdWN0IGlzIG5vdCBmb3VuZFwiKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigocmUpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgICB9KTtcbiAgfSxcbiAgLy9BbGwgR3JvY2VyeVN0YW1wbGUgcHJvZHVjdFxuICAvLyBlZGl0IHRvIHNhbGUgcHJvZHVjdFxuICBhc3luYyBnZXRBbGxHcm9jZXJyeVN0YXBsZXMocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgLy8gYXR0cmlidXRlczogW1wiaWRcIiwgXCJzbHVnXCJdLFxuICAgICAgICAgIC8vIHdoZXJlOiB7IGRpc2NvdW50OiAnZ3JvY2VyeS1zdGFwbGUnIH0sXG4gICAgICAgICAgb3JkZXI6IFtbXCJkaXNjb3VudFBlclwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgIGxpbWl0OiA4LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB8fCBbXSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBnZXRBbGxQcm9kdWN0QnlTbHVnKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLmNhdGVnb3J5XG4gICAgICAgIC5maW5kT25lKHtcbiAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiXSxcbiAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG1vZGVsOiBkYi5wcm9kdWN0LFxuICAgICAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICAgICAgeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBmaWx0ZXIgcHJvZHVjdFxuXG4gIGFzeW5jIGdldEZpbHRlcmJ5UHJvZHVjdChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgc2VhcmNoID0gXCIlJVwiO1xuICAgICAgaWYgKHJlcS5xdWVyeS5zZWFyY2gpIHtcbiAgICAgICAgc2VhcmNoID0gXCIlXCIgKyByZXEucXVlcnkuc2VhcmNoICsgXCIlXCI7XG4gICAgICB9XG4gICAgICBkYi5TdWJDYXRlZ29yeS5maW5kQWxsKHtcbiAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJzdWJfbmFtZVwiXSxcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1vZGVsOiBkYi5wcm9kdWN0LFxuICAgICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgW09wLm9yXTogW1xuICAgICAgICAgICAgICAgIHsgbmFtZTogeyBbT3AubGlrZV06IHNlYXJjaCB9LCBzbHVnOiB7IFtPcC5saWtlXTogc2VhcmNoIH0gfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pXG5cbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgR2V0QWxsQnlDYXRlZ29yeShyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5TdWJDYXRlZ29yeS5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHsgc3ViX25hbWU6IHJlcS5ib2R5Lm5hbWUgfSxcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1vZGVsOiBkYi5TdWJDaGlsZENhdGVnb3J5LFxuICAgICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbW9kZWw6IGRiLnByb2R1Y3QsXG4gICAgICAgICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICAgICAgICB7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIC8vIGF3cyBpbWFnZSBkZWxldGVcbiAgYXN5bmMgYXdzUHJvZHVjdFBob3RvRGVsZXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQsIGltZ1VybCB9ID0gcmVxLmJvZHk7XG4gICAgICAvLyBkYi5wcm9kdWN0cGhvdG8uZGVzdHJveSh7d2hlcmU6IHtpbWdVcmwsIGlkfX0pXG4gICAgICAvLyBkZWxldGVGaWxlRnJvbVMzKGltZ1VybClcblxuICAgICAgZGIucHJvZHVjdHBob3RvXG4gICAgICAgIC5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IGlkIH0gfSlcblxuICAgICAgICAudGhlbigoc3VjY2VzcykgPT4ge1xuICAgICAgICAgIHJlc1xuICAgICAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgICAgICAuanNvbih7XG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgIG1zZzogXCJTdWNjZXNzZmxseSBkZWxldGVkIGltYWdlIGZyb20gczMgQnVja2V0XCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBuZXh0KGVycik7XG4gICAgICAvLyByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzpmYWxzZSwgbXNnOiBlcnJ9KVxuICAgIH1cbiAgfSxcblxuICBhc3luYyBnZXRQcm9kdWN0U3ViQ2hpbGRDYXQocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBzdWJDYXRlZ29yeUlkLCBjaGlsZENhdGVnb3J5SWQgfSA9IHJlcS5ib2R5O1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGNoaWxkQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBuZXh0KGVycik7XG4gICAgICAvLyByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzpmYWxzZSwgbXNnOiBlcnJ9KVxuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0UHJvZHVjdFN1Z2dlc3QocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgLy8gY29uc3R7IHN1YkNhdGVnb3J5SWQsIGNoaWxkQ2F0ZWdvcnlJZCB9ID0gcmVxLmJvZHk7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICAvLyB3aGVyZTogeyBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCwgc3ViQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkIH0sXG4gICAgICAgICAgb3JkZXI6IFNlcXVlbGl6ZS5saXRlcmFsKFwiUkFORCgpXCIpLFxuICAgICAgICAgIGxpbWl0OiA4LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBuZXh0KGVycik7XG4gICAgICAvLyByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzpmYWxzZSwgbXNnOiBlcnJ9KVxuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0U2l6ZVByb2R1Y3QocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBwcm9kdWN0SWQgfSA9IHJlcS5xdWVyeTtcbiAgICAgIGRiLnByb2R1Y3RzaXplXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV4dChlcnIpO1xuICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgbXNnOiBlcnIgfSk7XG4gICAgfVxuICB9LFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUFBLE9BQUEsR0FBQUMsT0FBQTtBQUFxQyxTQUFBQyxRQUFBQyxNQUFBLEVBQUFDLGNBQUEsUUFBQUMsSUFBQSxHQUFBQyxNQUFBLENBQUFELElBQUEsQ0FBQUYsTUFBQSxPQUFBRyxNQUFBLENBQUFDLHFCQUFBLFFBQUFDLE9BQUEsR0FBQUYsTUFBQSxDQUFBQyxxQkFBQSxDQUFBSixNQUFBLEdBQUFDLGNBQUEsS0FBQUksT0FBQSxHQUFBQSxPQUFBLENBQUFDLE1BQUEsV0FBQUMsR0FBQSxXQUFBSixNQUFBLENBQUFLLHdCQUFBLENBQUFSLE1BQUEsRUFBQU8sR0FBQSxFQUFBRSxVQUFBLE9BQUFQLElBQUEsQ0FBQVEsSUFBQSxDQUFBQyxLQUFBLENBQUFULElBQUEsRUFBQUcsT0FBQSxZQUFBSCxJQUFBO0FBQUEsU0FBQVUsY0FBQUMsTUFBQSxhQUFBQyxDQUFBLE1BQUFBLENBQUEsR0FBQUMs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