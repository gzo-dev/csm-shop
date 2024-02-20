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
      var _req$body2, productId, categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice, images, size, newaddimage, phoneNumber, typeRoom, interior, square;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$body2 = req.body, productId = _req$body2.productId, categoryId = _req$body2.categoryId, subCategoryId = _req$body2.subCategoryId, childCategoryId = _req$body2.childCategoryId, name = _req$body2.name, slug = _req$body2.slug, brand = _req$body2.brand, status = _req$body2.status, unitSize = _req$body2.unitSize, desc = _req$body2.desc, buyerPrice = _req$body2.buyerPrice, price = _req$body2.price, qty = _req$body2.qty, discount = _req$body2.discount, discountPer = _req$body2.discountPer, total = _req$body2.total, netPrice = _req$body2.netPrice, images = _req$body2.images, size = _req$body2.size, newaddimage = _req$body2.newaddimage, phoneNumber = _req$body2.phoneNumber, typeRoom = _req$body2.typeRoom, interior = _req$body2.interior, square = _req$body2.square;
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
                  interior: interior,
                  square: square ? square : 0
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiX3JlcXVpcmUiLCJPcCIsIlNlcXVlbGl6ZSIsIl9kZWZhdWx0IiwiZ2V0UGhvdG9Qcm9kdWN0IiwicmVxIiwicmVzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJwcm9kdWN0SWQiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwicXVlcnkiLCJkYiIsInByb2R1Y3RwaG90byIsImZpbmRBbGwiLCJ3aGVyZSIsInRoZW4iLCJwcm9kdWN0Iiwic3RhdHVzIiwianNvbiIsIm9rIiwiZGF0YSIsInN0b3AiLCJhZGRQcm9kdWN0IiwiX2NhbGxlZTIiLCJfcmVxJGJvZHkiLCJjYXRlZ29yeUlkIiwic3ViQ2F0ZWdvcnlJZCIsImNoaWxkQ2F0ZWdvcnlJZCIsIm5hbWUiLCJzbHVnIiwiYnJhbmQiLCJ1bml0U2l6ZSIsInNvcnREZXNjIiwiZGVzYyIsImJ1eWVyUHJpY2UiLCJwcmljZSIsInF0eSIsImRpc2NvdW50IiwiZGlzY291bnRQZXIiLCJ0b3RhbCIsIm5ldFByaWNlIiwiaW1hZ2UiLCJzaXplIiwibmV3YWRkaW1hZ2UiLCJwaG9uZU51bWJlciIsInByb3ZpbmNlIiwiZGlzdHJpY3QiLCJ3YXJkIiwic3F1YXJlIiwicHJvdmluY2VUZXh0IiwiZGlzdHJpY3RUZXh0Iiwid2FyZFRleHQiLCJidWRnZXQiLCJ0eXBlUm9vbSIsImludGVyaW9yIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiYm9keSIsImNyZWF0ZSIsInBhcnNlSW50IiwicGhvdG8iLCJmaWxlIiwicGF0aCIsIl9KU09OJHBhcnNlIiwiX0pTT04kcGFyc2UzIiwiSlNPTiIsInBhcnNlIiwibWFwIiwiaXRlbSIsImltZ1VybCIsImRhdGFWYWx1ZXMiLCJpZCIsIl9KU09OJHBhcnNlMiIsImltYWdlVXJsIiwicHJvZHVjdHNpemUiLCJhbW91bnQiLCJzdWNjZXNzIiwibXNnIiwiZXJyIiwiY29uc29sZSIsImxvZyIsInQwIiwiYWJydXB0IiwiaW5kZXgiLCJfY2FsbGVlMyIsIl9yZXEkcXVlcnkiLCJzdXBwbGllcklkIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwib3JkZXIiLCJSZXF1ZXN0RXJyb3IiLCJnZXRBbGxQcm9kdWN0TGlzdCIsIl9jYWxsZWU0IiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwiaW5jbHVkZSIsIm1vZGVsIiwiU3ViQ2F0ZWdvcnkiLCJhdHRyaWJ1dGVzIiwiY2F0ZWdvcnkiLCJ1cGRhdGUiLCJfY2FsbGVlNSIsIl9yZXEkYm9keTIiLCJpbWFnZXMiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJmaW5kT25lIiwibG9jYXRpb24iLCJwIiwiX0pTT04kcGFyc2U0IiwiZGVzdHJveSIsImJ1bGtDcmVhdGUiLCJfcmVmIiwiZ2V0UHJvZHVjdExpc3RCeUNhdGVnb3J5IiwiX2NhbGxlZTYiLCJfY2FsbGVlNiQiLCJfY29udGV4dDYiLCJsaXN0IiwiZ2V0UHJvZHVjdFN1Z2dlc3RIb3RlbCIsIl9jYWxsZWU3IiwiX2NhbGxlZTckIiwiX2NvbnRleHQ3IiwibGltaXQiLCJnZXRQcm9kdWN0U3VnZ2VzdEFwYXJ0bWVudCIsIl9jYWxsZWU4IiwiX2NhbGxlZTgkIiwiX2NvbnRleHQ4IiwiZ2V0UHJvZHVjdExpc3RCeUlkIiwiX2NhbGxlZTkiLCJfY2FsbGVlOSQiLCJfY29udGV4dDkiLCJnZXRXZWJQcm9kdWN0TGlzdEJ5SWQiLCJfY2FsbGVlMTAiLCJfY2FsbGVlMTAkIiwiX2NvbnRleHQxMCIsInNlbnQiLCJkYXRhc2l6ZSIsImFkZFByb2R1Y3RPZmZlciIsIl9jYWxsZWUxMSIsIl9yZXEkYm9keTMiLCJkaXNjb3VudF9wZXIiLCJkaXNjb3VudF9wcmljZSIsIm5ldF9wcmljZSIsIl9jYWxsZWUxMSQiLCJfY29udGV4dDExIiwiUHJvZHVjdE9mZmVyIiwiZ2V0UHJvZHVjdE9mZmVyIiwiX2NhbGxlZTEyIiwiX2NhbGxlZTEyJCIsIl9jb250ZXh0MTIiLCJzZWFyY2hQcm9kdWN0QnlTdWJDYXQiLCJfY2FsbGVlMTMiLCJfY2FsbGVlMTMkIiwiX2NvbnRleHQxMyIsInN1Yl9uYW1lIiwic3ViQ2F0Iiwic3RyaW5naWZ5IiwicHJvZHVjdERlbGV0ZSIsIl9jYWxsZWUxNCIsIl9jYWxsZWUxNCQiLCJfY29udGV4dDE0IiwicmUiLCJwcm9kdWN0T2ZmZXJEZWxldGUiLCJfY2FsbGVlMTUiLCJfY2FsbGVlMTUkIiwiX2NvbnRleHQxNSIsInBhcmFtcyIsIm11bHRpcGxlUGhvdG9VcGxvYWQiLCJfY2FsbGVlMTYiLCJhdHRhY2htZW50RW50cmllcyIsIl9jYWxsZWUxNiQiLCJfY29udGV4dDE2IiwiZmlsZXMiLCJmaWxlbmFtZSIsIm1pbWUiLCJtaW1ldHlwZSIsInIiLCJlcnJvciIsImVycm9ycyIsImdldEFsbFBob3RvIiwiX2NhbGxlZTE3IiwiX2NhbGxlZTE3JCIsIl9jb250ZXh0MTciLCJkZWxldGVTbGlkZXJQaG90byIsIl9jYWxsZWUxOCIsIl9jYWxsZWUxOCQiLCJfY29udGV4dDE4IiwiZ2V0QWxsR3JvY2VycnlTdGFwbGVzIiwiX2NhbGxlZTE5IiwiX2NhbGxlZTE5JCIsIl9jb250ZXh0MTkiLCJnZXRBbGxQcm9kdWN0QnlTbHVnIiwiX2NhbGxlZTIwIiwiX2NhbGxlZTIwJCIsIl9jb250ZXh0MjAiLCJnZXRGaWx0ZXJieVByb2R1Y3QiLCJfY2FsbGVlMjEiLCJzZWFyY2giLCJfY2FsbGVlMjEkIiwiX2NvbnRleHQyMSIsInJlcXVpcmVkIiwib3IiLCJsaWtlIiwiR2V0QWxsQnlDYXRlZ29yeSIsIl9jYWxsZWUyMiIsIl9jYWxsZWUyMiQiLCJfY29udGV4dDIyIiwiU3ViQ2hpbGRDYXRlZ29yeSIsImF3c1Byb2R1Y3RQaG90b0RlbGV0ZSIsIl9jYWxsZWUyMyIsIl9yZXEkYm9keTQiLCJfY2FsbGVlMjMkIiwiX2NvbnRleHQyMyIsImdldFByb2R1Y3RTdWJDaGlsZENhdCIsIl9jYWxsZWUyNCIsIl9yZXEkYm9keTUiLCJfY2FsbGVlMjQkIiwiX2NvbnRleHQyNCIsImdldFByb2R1Y3RTdWdnZXN0IiwiX2NhbGxlZTI1IiwiX2NhbGxlZTI1JCIsIl9jb250ZXh0MjUiLCJsaXRlcmFsIiwiZ2V0U2l6ZVByb2R1Y3QiLCJfY2FsbGVlMjYiLCJfY2FsbGVlMjYkIiwiX2NvbnRleHQyNiIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy9wcm9kdWN0L3Byb2R1Y3QuY29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkYiB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHNcIjtcbmNvbnN0IHsgT3AsIFNlcXVlbGl6ZSB9ID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTtcbi8vIGltcG9ydCB7IHF1ZXVlIH0gZnJvbSAnLi4vLi4vLi4va3VlJztcbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyogQWRkIHVzZXIgYXBpIHN0YXJ0IGhlcmUuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiovXG4gIGFzeW5jIGdldFBob3RvUHJvZHVjdChyZXEsIHJlcykge1xuICAgIGNvbnN0IHsgcHJvZHVjdElkIH0gPSByZXEucXVlcnk7XG4gICAgZGIucHJvZHVjdHBob3RvXG4gICAgICAuZmluZEFsbCh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgcHJvZHVjdElkLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgfSk7XG4gIH0sXG4gIGFzeW5jIGFkZFByb2R1Y3QocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBjYXRlZ29yeUlkLFxuICAgICAgICBzdWJDYXRlZ29yeUlkLFxuICAgICAgICBjaGlsZENhdGVnb3J5SWQsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIHNsdWcsXG4gICAgICAgIGJyYW5kLFxuICAgICAgICBzdGF0dXMsXG4gICAgICAgIHVuaXRTaXplLFxuICAgICAgICBzb3J0RGVzYyxcbiAgICAgICAgZGVzYyxcbiAgICAgICAgYnV5ZXJQcmljZSxcbiAgICAgICAgcHJpY2UsXG4gICAgICAgIHF0eSxcbiAgICAgICAgZGlzY291bnQsXG4gICAgICAgIGRpc2NvdW50UGVyLFxuICAgICAgICB0b3RhbCxcbiAgICAgICAgbmV0UHJpY2UsXG4gICAgICAgIGltYWdlLFxuICAgICAgICBzaXplLFxuICAgICAgICBuZXdhZGRpbWFnZSxcbiAgICAgICAgcGhvbmVOdW1iZXIsXG4gICAgICAgIHByb3ZpbmNlLCBcbiAgICAgICAgZGlzdHJpY3QsXG4gICAgICAgIHdhcmQsXG4gICAgICAgIHNxdWFyZSxcbiAgICAgICAgcHJvdmluY2VUZXh0LFxuICAgICAgICBkaXN0cmljdFRleHQsXG4gICAgICAgIHdhcmRUZXh0LFxuICAgICAgICBidWRnZXQsXG4gICAgICAgIHR5cGVSb29tLFxuICAgICAgICBpbnRlcmlvcixcbiAgICAgIH0gPSByZXEuYm9keTtcblxuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuY3JlYXRlKHtcbiAgICAgICAgICBjYXRlZ29yeUlkOiBjYXRlZ29yeUlkLFxuICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IHN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWQgfHwgMCxcbiAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgIHNsdWc6IHNsdWcsXG4gICAgICAgICAgc3RhdHVzOiBwYXJzZUludChzdGF0dXMpID8gXCJhY3RpdmVcIiA6IFwiaW5hY3RpdmVcIixcbiAgICAgICAgICBicmFuZDogYnJhbmQsXG4gICAgICAgICAgdW5pdFNpemU6IHVuaXRTaXplLFxuICAgICAgICAgIHNvcnREZXNjOiBzb3J0RGVzYyxcbiAgICAgICAgICBkZXNjOiBkZXNjLFxuICAgICAgICAgIGJ1eWVyUHJpY2U6IGJ1eWVyUHJpY2UsXG4gICAgICAgICAgcHJpY2U6IHByaWNlLFxuICAgICAgICAgIHF0eTogcXR5LFxuICAgICAgICAgIGRpc2NvdW50OiBkaXNjb3VudCxcbiAgICAgICAgICBkaXNjb3VudFBlcjogZGlzY291bnRQZXIsXG4gICAgICAgICAgdG90YWw6IHRvdGFsLFxuICAgICAgICAgIG5ldFByaWNlOiBuZXRQcmljZSxcbiAgICAgICAgICBwaG90bzogcmVxLmZpbGUgPyByZXEuZmlsZS5wYXRoIDogXCJcIixcbiAgICAgICAgICBwaG9uZU51bWJlcjogcGhvbmVOdW1iZXIsXG4gICAgICAgICAgcHJvdmluY2U6IHByb3ZpbmNlLFxuICAgICAgICAgIGRpc3RyaWN0OiBkaXN0cmljdCxcbiAgICAgICAgICB3YXJkOiB3YXJkLFxuICAgICAgICAgIHByb3ZpbmNlVGV4dDogcHJvdmluY2VUZXh0ID8gcHJvdmluY2VUZXh0IDogXCJcIixcbiAgICAgICAgICBkaXN0cmljdFRleHQ6IGRpc3RyaWN0VGV4dCA/IGRpc3RyaWN0VGV4dCA6IFwiXCIsXG4gICAgICAgICAgd2FyZFRleHQ6IHdhcmRUZXh0ID8gd2FyZFRleHQgOiBcIlwiLFxuICAgICAgICAgIHNxdWFyZTogc3F1YXJlID8gc3F1YXJlIDogMCxcbiAgICAgICAgICBidWRnZXQ6IGJ1ZGdldCA/IGJ1ZGdldCA6IDAsXG4gICAgICAgICAgdHlwZVJvb206IHR5cGVSb29tID8gdHlwZVJvb20gOiBcIlwiLFxuICAgICAgICAgIGludGVyaW9yOiBpbnRlcmlvciA/IGludGVyaW9yIDogXCJcIlxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIEpTT04ucGFyc2UoaW1hZ2UpPy5tYXAoKGl0ZW0pID0+XG4gICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHtcbiAgICAgICAgICAgICAgaW1nVXJsOiBpdGVtPy5wYXRoLFxuICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3QuZGF0YVZhbHVlcy5pZCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAobmV3YWRkaW1hZ2UpIHtcbiAgICAgICAgICAgIEpTT04ucGFyc2UobmV3YWRkaW1hZ2UpPy5tYXAoKGl0ZW0pID0+XG4gICAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIGltZ1VybDogaXRlbT8uaW1hZ2VVcmwsXG4gICAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0LmRhdGFWYWx1ZXMuaWQsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBKU09OLnBhcnNlKHNpemUpPy5tYXAoKGl0ZW0pID0+XG4gICAgICAgICAgICBkYi5wcm9kdWN0c2l6ZS5jcmVhdGUoe1xuICAgICAgICAgICAgICBzaXplOiBpdGVtPy5zaXplLFxuICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3QuZGF0YVZhbHVlcy5pZCxcbiAgICAgICAgICAgICAgYW1vdW50OiBpdGVtPy5hbW91bnQsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgICAgcmVzXG4gICAgICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgICAgIC5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlN1Y2Nlc3NmdWxseSBpbnNlcnRlZCBwcm9kdWN0XCIgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbihlcnIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBpbmRleChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHN1cHBsaWVySWQsIGNhdGVnb3J5SWQsIHN1YkNhdGVnb3J5SWQgfSA9IHJlcS5xdWVyeTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIHN1cHBsaWVySWQ6IHN1cHBsaWVySWQsXG4gICAgICAgICAgICBjYXRlZ29yeUlkOiBjYXRlZ29yeUlkLFxuICAgICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBnZXRBbGxQcm9kdWN0TGlzdChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbW9kZWw6IGRiLlN1YkNhdGVnb3J5LFxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcInN1Yl9uYW1lXCJdLFxuICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuY2F0ZWdvcnksIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSB9XSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgdXBkYXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgcHJvZHVjdElkLFxuICAgICAgICBjYXRlZ29yeUlkLFxuICAgICAgICBzdWJDYXRlZ29yeUlkLFxuICAgICAgICBjaGlsZENhdGVnb3J5SWQsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIHNsdWcsXG4gICAgICAgIGJyYW5kLFxuICAgICAgICBzdGF0dXMsXG4gICAgICAgIHVuaXRTaXplLFxuICAgICAgICBkZXNjLFxuICAgICAgICBidXllclByaWNlLFxuICAgICAgICBwcmljZSxcbiAgICAgICAgcXR5LFxuICAgICAgICBkaXNjb3VudCxcbiAgICAgICAgZGlzY291bnRQZXIsXG4gICAgICAgIHRvdGFsLFxuICAgICAgICBuZXRQcmljZSxcbiAgICAgICAgaW1hZ2VzLFxuICAgICAgICBzaXplLFxuICAgICAgICBuZXdhZGRpbWFnZSxcbiAgICAgICAgcGhvbmVOdW1iZXIsXG4gICAgICAgIHR5cGVSb29tLFxuICAgICAgICBpbnRlcmlvcixcbiAgICAgICAgc3F1YXJlXG4gICAgICB9ID0gcmVxLmJvZHk7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9IH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgaWYgKHByb2R1Y3QpIHtcbiAgICAgICAgICAgIHJldHVybiBkYi5wcm9kdWN0LnVwZGF0ZShcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQgPyBjYXRlZ29yeUlkIDogcHJvZHVjdC5jYXRlZ29yeUlkLFxuICAgICAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IHN1YkNhdGVnb3J5SWRcbiAgICAgICAgICAgICAgICAgID8gc3ViQ2F0ZWdvcnlJZFxuICAgICAgICAgICAgICAgICAgOiBwcm9kdWN0LnN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWRcbiAgICAgICAgICAgICAgICAgID8gY2hpbGRDYXRlZ29yeUlkXG4gICAgICAgICAgICAgICAgICA6IHByb2R1Y3QuY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgc2x1Zzogc2x1ZyxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHBhcnNlSW50KHN0YXR1cykgPyBcImFjdGl2ZVwiIDogXCJpbmFjdGl2ZVwiLFxuICAgICAgICAgICAgICAgIGJyYW5kOiBicmFuZCxcbiAgICAgICAgICAgICAgICB1bml0U2l6ZTogdW5pdFNpemUsXG4gICAgICAgICAgICAgICAgZGVzYzogZGVzYyxcbiAgICAgICAgICAgICAgICBidXllclByaWNlOiBidXllclByaWNlLFxuICAgICAgICAgICAgICAgIHByaWNlOiBwcmljZSxcbiAgICAgICAgICAgICAgICBxdHk6IHF0eSxcbiAgICAgICAgICAgICAgICBkaXNjb3VudDogZGlzY291bnQsXG4gICAgICAgICAgICAgICAgZGlzY291bnRQZXI6IGRpc2NvdW50UGVyLFxuICAgICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICAgICAgICBuZXRQcmljZTogbmV0UHJpY2UsXG4gICAgICAgICAgICAgICAgcGhvdG86IHJlcS5maWxlID8gcmVxLmZpbGUubG9jYXRpb24gOiBwcm9kdWN0LnBob3RvLFxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiBwaG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICB0eXBlUm9vbSxcbiAgICAgICAgICAgICAgICBpbnRlcmlvcixcbiAgICAgICAgICAgICAgICBzcXVhcmU6IHNxdWFyZSA/IHNxdWFyZSA6IDBcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0gfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIk5vdCBGb3VuZCBQcm9kdWN0XCIsIDQwOSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwKSA9PiB7XG4gICAgICAgICAgaWYgKG5ld2FkZGltYWdlKSB7XG4gICAgICAgICAgICBKU09OLnBhcnNlKG5ld2FkZGltYWdlKT8ubWFwKChpdGVtKSA9PlxuICAgICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBpbWdVcmw6IGl0ZW0/LmltYWdlVXJsLFxuICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNpemUpIHtcbiAgICAgICAgICAgIGRiLnByb2R1Y3RzaXplLmRlc3Ryb3koe1xuICAgICAgICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGIucHJvZHVjdHNpemUuYnVsa0NyZWF0ZShcbiAgICAgICAgICAgICAgSlNPTi5wYXJzZShzaXplKS5tYXAoKHsgc2l6ZSwgYW1vdW50IH0pID0+ICh7XG4gICAgICAgICAgICAgICAgc2l6ZSxcbiAgICAgICAgICAgICAgICBhbW91bnQsXG4gICAgICAgICAgICAgICAgcHJvZHVjdElkLFxuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpbWFnZXMpIHtcbiAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5kZXN0cm95KHtcbiAgICAgICAgICAgICAgd2hlcmU6IHsgcHJvZHVjdElkOiBwcm9kdWN0SWQgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmJ1bGtDcmVhdGUoXG4gICAgICAgICAgICAgIEpTT04ucGFyc2UoaW1hZ2VzKS5tYXAoKGl0ZW0pID0+ICh7IC4uLml0ZW0sIHByb2R1Y3RJZCB9KSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlVwZGF0ZWQgU3VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RMaXN0QnlDYXRlZ29yeShyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcIkRFU0NcIl1dLFxuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBjYXRlZ29yeUlkOiByZXEucXVlcnkuY2F0ZWdvcnlJZCxcbiAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IHJlcS5xdWVyeS5zdWJDYXRlZ29yeUlkLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRQcm9kdWN0U3VnZ2VzdEhvdGVsKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiREVTQ1wiXV0sXG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IDEyLFxuICAgICAgICAgICAgLy8gc3ViQ2F0ZWdvcnlJZDogcmVxLnF1ZXJ5LnN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICBsaW1pdDogNFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0UHJvZHVjdFN1Z2dlc3RBcGFydG1lbnQocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgb3JkZXI6IFtbXCJERVNDXCJdXSxcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgY2F0ZWdvcnlJZDogMTMsXG4gICAgICAgICAgICAvLyBzdWJDYXRlZ29yeUlkOiByZXEucXVlcnkuc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgIGxpbWl0OiA0XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRQcm9kdWN0TGlzdEJ5SWQocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeS5pZCB9LFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldFdlYlByb2R1Y3RMaXN0QnlJZChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzaXplID0gYXdhaXQgZGIucHJvZHVjdHNpemUuZmluZEFsbCh7XG4gICAgICAgIHdoZXJlOiB7IHByb2R1Y3RJZDogcmVxLnF1ZXJ5LmlkIH0sXG4gICAgICB9KTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRPbmUoe1xuICAgICAgICAgIHdoZXJlOiB7IGlkOiByZXEucXVlcnkuaWQgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCwgZGF0YXNpemU6IHNpemUgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGFkZFByb2R1Y3RPZmZlcihyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHByb2R1Y3RJZCwgcXR5LCBkaXNjb3VudF9wZXIsIGRpc2NvdW50X3ByaWNlLCB0b3RhbCwgbmV0X3ByaWNlIH0gPVxuICAgICAgICByZXEuYm9keTtcbiAgICAgIGRiLlByb2R1Y3RPZmZlci5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9IH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgaWYgKCFsaXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gZGIuUHJvZHVjdE9mZmVyLmNyZWF0ZSh7XG4gICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxuICAgICAgICAgICAgICBpbWFnZTogcmVxLmZpbGUgPyByZXEuZmlsZS5sb2NhdGlvbiA6IFwiXCIsXG4gICAgICAgICAgICAgIHF0eTogcXR5LFxuICAgICAgICAgICAgICBkaXNjb3VudF9wZXI6IGRpc2NvdW50X3BlcixcbiAgICAgICAgICAgICAgZGlzY291bnRfcHJpY2U6IGRpc2NvdW50X3ByaWNlLFxuICAgICAgICAgICAgICB0b3RhbDogdG90YWwsXG4gICAgICAgICAgICAgIG5ldF9wcmljZTogbmV0X3ByaWNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBkYi5Qcm9kdWN0T2ZmZXIudXBkYXRlKFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcXR5OiBxdHksXG4gICAgICAgICAgICAgICAgZGlzY291bnRfcGVyOiBkaXNjb3VudF9wZXIsXG4gICAgICAgICAgICAgICAgZGlzY291bnRfcHJpY2U6IGRpc2NvdW50X3ByaWNlLFxuICAgICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICAgICAgICBuZXRfcHJpY2U6IG5ldF9wcmljZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB3aGVyZTogeyBpZDogbGlzdC5pZCB9IH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlN1Y2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldFByb2R1Y3RPZmZlcihyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5Qcm9kdWN0T2ZmZXIuZmluZEFsbCh7XG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgICAgICAgICAgXCJpZFwiLFxuICAgICAgICAgICAgICBcImNhdGVnb3J5SWRcIixcbiAgICAgICAgICAgICAgXCJwcmljZVwiLFxuICAgICAgICAgICAgICBcIml0ZW1fbmFtZVwiLFxuICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIsXG4gICAgICAgICAgICAgIFwiYnJhbmRcIixcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuY2F0ZWdvcnksIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSB9XSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgc2VhcmNoUHJvZHVjdEJ5U3ViQ2F0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoe1xuICAgICAgICB3aGVyZTogeyBzdWJfbmFtZTogcmVxLmJvZHkuc3ViQ2F0IH0sXG4gICAgICB9KVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdC5maW5kQWxsKHtcbiAgICAgICAgICAgICAgd2hlcmU6IHsgc3ViQ2F0ZWdvcnlJZDogZGF0YS5pZCB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGxpc3QpKTtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBwcm9kdWN0RGVsZXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgZGIucHJvZHVjdFxuICAgICAgLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocmVxLnF1ZXJ5LmlkKSB9IH0pXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICAgIHJldHVybiBkYi5wcm9kdWN0LmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcHJvZHVjdC5pZCB9IH0pO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJQcm9kdWN0IGlzIG5vdCBmb3VuZFwiKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigocmUpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgICB9KTtcbiAgfSxcblxuICBhc3luYyBwcm9kdWN0T2ZmZXJEZWxldGUocmVxLCByZXMsIG5leHQpIHtcbiAgICBkYi5Qcm9kdWN0T2ZmZXIuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucGFyYW1zLmlkKSB9IH0pXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICAgIHJldHVybiBkYi5Qcm9kdWN0T2ZmZXIuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiBwcm9kdWN0LmlkIH0gfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIlByb2R1Y3QgaXMgbm90IGZvdW5kXCIpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChyZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6IFwiZGVsZXRlZCBQcm9kdWN0IFNlY2Nlc3NmdWxseVwiIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICAgIH0pO1xuICB9LFxuXG4gIGFzeW5jIG11bHRpcGxlUGhvdG9VcGxvYWQocmVxLCByZXMsIG5leHQpIHtcbiAgICBsZXQgYXR0YWNobWVudEVudHJpZXMgPSBbXTtcbiAgICB2YXIgcHJvZHVjdElkID0gcmVxLmJvZHkucHJvZHVjdElkO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVxLmZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRhY2htZW50RW50cmllcy5wdXNoKHtcbiAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWQsXG4gICAgICAgIG5hbWU6IHJlcS5maWxlc1tpXS5maWxlbmFtZSxcbiAgICAgICAgbWltZTogcmVxLmZpbGVzW2ldLm1pbWV0eXBlLFxuICAgICAgICBpbWdVcmw6IHJlcS5maWxlc1tpXS5wYXRoLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGIucHJvZHVjdFxuICAgICAgLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4oKHIpID0+IHtcbiAgICAgICAgaWYgKHIpIHtcbiAgICAgICAgICAvLyByZXR1cm4gcXVldWUuY3JlYXRlKCdpbWctdXBsb2FkJywge1xuICAgICAgICAgIC8vICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcbiAgICAgICAgICAvLyAgICAgcHJvZHVjdE5hbWU6IHIuaXRlbV9uYW1lLFxuICAgICAgICAgIC8vICAgICBhdHRhY2htZW50RW50cmllczogYXR0YWNobWVudEVudHJpZXMsXG4gICAgICAgICAgLy8gfSkuc2F2ZSgpO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVxLmZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHsgLi4uYXR0YWNobWVudEVudHJpZXNbaV0gfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHIpID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiByZXEuZmlsZXMgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3JzOiBbXCJFcnJvciBpbnNlcnQgcGhvdG9cIl0gfSk7XG4gICAgICB9KTtcbiAgfSxcblxuICBhc3luYyBnZXRBbGxQaG90byhyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiLCBcImJyYW5kXCJdLFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBkZWxldGVTbGlkZXJQaG90byhyZXEsIHJlcywgbmV4dCkge1xuICAgIGRiLnByb2R1Y3RwaG90b1xuICAgICAgLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocmVxLnF1ZXJ5LmlkKSB9IH0pXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICAgIHJldHVybiBkYi5wcm9kdWN0cGhvdG8uZGVzdHJveSh7IHdoZXJlOiB7IGlkOiByZXEucXVlcnkuaWQgfSB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiUHJvZHVjdCBpcyBub3QgZm91bmRcIik7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHJlKSA9PiB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogXCJkZWxldGVkIFByb2R1Y3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgICAgfSk7XG4gIH0sXG4gIC8vQWxsIEdyb2NlcnlTdGFtcGxlIHByb2R1Y3RcbiAgLy8gZWRpdCB0byBzYWxlIHByb2R1Y3RcbiAgYXN5bmMgZ2V0QWxsR3JvY2VycnlTdGFwbGVzKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIC8vIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic2x1Z1wiXSxcbiAgICAgICAgICAvLyB3aGVyZTogeyBkaXNjb3VudDogJ2dyb2Nlcnktc3RhcGxlJyB9LFxuICAgICAgICAgIG9yZGVyOiBbW1wiZGlzY291bnRQZXJcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICBsaW1pdDogOCxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfHwgW10gfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZ2V0QWxsUHJvZHVjdEJ5U2x1ZyhyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5jYXRlZ29yeVxuICAgICAgICAuZmluZE9uZSh7XG4gICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIl0sXG4gICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcbiAgICAgICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAgICAgIHsgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gZmlsdGVyIHByb2R1Y3RcblxuICBhc3luYyBnZXRGaWx0ZXJieVByb2R1Y3QocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHNlYXJjaCA9IFwiJSVcIjtcbiAgICAgIGlmIChyZXEucXVlcnkuc2VhcmNoKSB7XG4gICAgICAgIHNlYXJjaCA9IFwiJVwiICsgcmVxLnF1ZXJ5LnNlYXJjaCArIFwiJVwiO1xuICAgICAgfVxuICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZEFsbCh7XG4gICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic3ViX25hbWVcIl0sXG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcbiAgICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgIFtPcC5vcl06IFtcbiAgICAgICAgICAgICAgICB7IG5hbWU6IHsgW09wLmxpa2VdOiBzZWFyY2ggfSwgc2x1ZzogeyBbT3AubGlrZV06IHNlYXJjaCB9IH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KVxuXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIEdldEFsbEJ5Q2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7IHN1Yl9uYW1lOiByZXEuYm9keS5uYW1lIH0sXG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtb2RlbDogZGIuU3ViQ2hpbGRDYXRlZ29yeSxcbiAgICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1vZGVsOiBkYi5wcm9kdWN0LFxuICAgICAgICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAgICAgICAgeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBhd3MgaW1hZ2UgZGVsZXRlXG4gIGFzeW5jIGF3c1Byb2R1Y3RQaG90b0RlbGV0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkLCBpbWdVcmwgfSA9IHJlcS5ib2R5O1xuICAgICAgLy8gZGIucHJvZHVjdHBob3RvLmRlc3Ryb3koe3doZXJlOiB7aW1nVXJsLCBpZH19KVxuICAgICAgLy8gZGVsZXRlRmlsZUZyb21TMyhpbWdVcmwpXG5cbiAgICAgIGRiLnByb2R1Y3RwaG90b1xuICAgICAgICAuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiBpZCB9IH0pXG5cbiAgICAgICAgLnRoZW4oKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgICByZXNcbiAgICAgICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAgICAgLmpzb24oe1xuICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgICBtc2c6IFwiU3VjY2Vzc2ZsbHkgZGVsZXRlZCBpbWFnZSBmcm9tIHMzIEJ1Y2tldFwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV4dChlcnIpO1xuICAgICAgLy8gcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6ZmFsc2UsIG1zZzogZXJyfSlcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZ2V0UHJvZHVjdFN1YkNoaWxkQ2F0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgc3ViQ2F0ZWdvcnlJZCwgY2hpbGRDYXRlZ29yeUlkIH0gPSByZXEuYm9keTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCxcbiAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV4dChlcnIpO1xuICAgICAgLy8gcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6ZmFsc2UsIG1zZzogZXJyfSlcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RTdWdnZXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIGNvbnN0eyBzdWJDYXRlZ29yeUlkLCBjaGlsZENhdGVnb3J5SWQgfSA9IHJlcS5ib2R5O1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgLy8gd2hlcmU6IHsgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWQsIHN1YkNhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCB9LFxuICAgICAgICAgIG9yZGVyOiBTZXF1ZWxpemUubGl0ZXJhbChcIlJBTkQoKVwiKSxcbiAgICAgICAgICBsaW1pdDogOCxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV4dChlcnIpO1xuICAgICAgLy8gcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6ZmFsc2UsIG1zZzogZXJyfSlcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFNpemVQcm9kdWN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcHJvZHVjdElkIH0gPSByZXEucXVlcnk7XG4gICAgICBkYi5wcm9kdWN0c2l6ZVxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgcHJvZHVjdElkIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIG5leHQoZXJyKTtcbiAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1zZzogZXJyIH0pO1xuICAgIH1cbiAgfSxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxPQUFBLEdBQUFDLE9BQUE7QUFBcUMsU0FBQUMsUUFBQUMsTUFBQSxFQUFBQyxjQUFBLFFBQUFDLElBQUEsR0FBQUMsTUFBQSxDQUFBRCxJQUFBLENBQUFGLE1BQUEsT0FBQUcsTUFBQSxDQUFBQyxxQkFBQSxRQUFBQyxPQUFBLEdBQUFGLE1BQUEsQ0FBQUMscUJBQUEsQ0FBQUosTUFBQSxHQUFBQyxjQUFBLEtBQUFJLE9BQUEsR0FBQUEsT0FBQSxDQUFBQyxNQUFBLFdBQUFDLEdBQUEsV0FBQUosTUFBQSxDQUFBSyx3QkFBQSxDQUFBUixNQUFBLEVBQUFPLEdBQUEsRUFBQUUsVUFBQSxPQUFBUCxJQUFBLENBQUFRLElBQUEsQ0FBQUMsS0FBQSxDQUFBVCxJQUFBLEVBQUFHLE9B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